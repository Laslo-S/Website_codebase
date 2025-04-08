document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('interactive-hero-background');
    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error("Could not get 2D context");
        return;
    }

    let mouse = { x: undefined, y: undefined };
    let animationFrameId;
    let gridPoints = [];

    // -- Configuration (from interactive-background.txt) --
    const config = {
        spacing: 65, // Increased spacing for performance
        pointSize: 1.4, // Reduced point size
        maxLineDistance: 95, // Increased again to restore connection density
        baseColorHex: "#22D3EE", // Cyan-500 equivalent base color for points/lines
        hoverColorHex: "#FFFFFF", // Color to shift towards on hover
        baseLineOpacity: 0.15, // Reduced base line opacity
        hoverLineOpacityBoost: 3.00, // Reduced opacity boost on hover
        mouseRadius: 250, // Increased radius of mouse influence
        waveAmplitude: 7.5, // Amplitude of the subtle background wave
        waveFrequency1: 1.005,
        waveFrequency2: 1.07,
        waveSpeed: 0.01,
        randomOffset: 15, // Max random offset for initial point positions
        mouseUpwardForce: 0.8, // How strongly points move up near mouse (adjust for subtlety)
        mouseHorizontalForce: 0.1, // Slight push away horizontally
        returnToBaseSpeed: 0.07, // Slightly faster return
        colorTransitionSpeed: 0.1, // How quickly color returns to base
    };
    // -------------------

    // Helper function: Clamp
    const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

    // Helper function: Lerp Color
    function lerpColor(hexColorA, hexColorB, amount) {
        amount = clamp(amount, 0, 1);
        const colorA = parseInt(hexColorA.slice(1), 16);
        const colorB = parseInt(hexColorB.slice(1), 16);
        const rA = (colorA >> 16) & 255, gA = (colorA >> 8) & 255, bA = colorA & 255;
        const rB = (colorB >> 16) & 255, gB = (colorB >> 8) & 255, bB = colorB & 255;
        const r = Math.round(rA + (rB - rA) * amount);
        const g = Math.round(gA + (gB - gA) * amount);
        const b = Math.round(bA + (bB - bA) * amount);
        return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).padStart(6, '0')}`;
    }

    // Helper function: Hex to RGBA
    function hexToRgba(hex, alpha) {
        alpha = clamp(alpha, 0, 1);
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    // Grid Point Class
    class GridPoint {
        constructor(x, y) {
            const offsetX = (Math.random() - 0.5) * 2 * config.randomOffset;
            const offsetY = (Math.random() - 0.5) * 2 * config.randomOffset;
            this.baseX = x + offsetX;
            this.baseY = y + offsetY;
            this.x = this.baseX;
            this.y = this.baseY;
            this.targetX = this.baseX;
            this.targetY = this.baseY;
            this.currentSize = config.pointSize;
            this.targetSize = config.pointSize;
            this.currentColorHex = config.baseColorHex;
            this.targetColorHex = config.baseColorHex;
            this.angle1 = Math.random() * Math.PI * 2;
            this.angle2 = Math.random() * Math.PI * 2;
        }

        update(time, mousePos) {
            this.x += (this.targetX - this.x) * config.returnToBaseSpeed;
            this.y += (this.targetY - this.y) * config.returnToBaseSpeed;
            this.currentColorHex = lerpColor(this.currentColorHex, this.targetColorHex, config.colorTransitionSpeed);
            this.currentSize += (this.targetSize - this.currentSize) * config.colorTransitionSpeed;

            this.angle1 += config.waveSpeed;
            this.angle2 += config.waveSpeed * 0.7;
            const waveY = (Math.sin(this.angle1 + this.baseX * config.waveFrequency1) + Math.sin(this.angle2 + this.baseY * config.waveFrequency2)) * config.waveAmplitude * 0.5;

            let targetWaveY = this.baseY + waveY;
            let targetWaveX = this.baseX;
            let targetColor = config.baseColorHex;
            let targetSize = config.pointSize;

            if (mousePos.x !== undefined && mousePos.y !== undefined) {
                const dx = mousePos.x - this.x;
                const dy = mousePos.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < config.mouseRadius) {
                    const force = Math.pow(1 - distance / config.mouseRadius, 2);
                    targetWaveY -= force * config.mouseUpwardForce * 50;
                    const directionX = dx / (distance || 1); // Avoid division by zero
                    targetWaveX -= directionX * force * config.mouseHorizontalForce * 50;
                    targetColor = lerpColor(config.baseColorHex, config.hoverColorHex, force * 0.5);
                    targetSize = config.pointSize + force * 1.0;
                }
            }
            this.targetX = targetWaveX;
            this.targetY = targetWaveY;
            this.targetColorHex = targetColor;
            this.targetSize = targetSize;
        }

        draw(ctx) {
            ctx.fillStyle = hexToRgba(this.currentColorHex, 0.4);
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.currentSize, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    function initGrid() {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        ctx.imageSmoothingEnabled = true;

        gridPoints = [];
        const spacing = config.spacing;
        const cols = Math.floor(canvas.width / dpr / spacing) + 4;
        const rows = Math.floor(canvas.height / dpr / spacing) + 4;
        const xOffset = -spacing * 1.5;
        const yOffset = -spacing * 1.5;

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                gridPoints.push(new GridPoint(x * spacing + xOffset, y * spacing + yOffset));
            }
        }
    }

    function connectPoints() {
        const points = gridPoints;
        const maxDistanceSq = config.maxLineDistance * config.maxLineDistance;
        const whiteHexNum = parseInt(config.hoverColorHex.slice(1), 16);
        const baseHexNum = parseInt(config.baseColorHex.slice(1), 16);
        const colorDiffRange = Math.abs(whiteHexNum - baseHexNum + 1); // Avoid div by zero

        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                const p1 = points[i];
                const p2 = points[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distanceSq = dx * dx + dy * dy;

                if (distanceSq < maxDistanceSq) {
                    const distance = Math.sqrt(distanceSq);
                    const opacityFactor = 1 - distance / config.maxLineDistance; // Renamed from opacity

                    const c1HexNum = parseInt(p1.currentColorHex.slice(1), 16);
                    const c2HexNum = parseInt(p2.currentColorHex.slice(1), 16);

                    const progress1 = Math.abs(c1HexNum - baseHexNum) / colorDiffRange;
                    const progress2 = Math.abs(c2HexNum - baseHexNum) / colorDiffRange;
                    const avgProgress = (progress1 + progress2) / 2;

                    const lineColorHex = lerpColor(config.baseColorHex, config.hoverColorHex, avgProgress * 0.8);
                    const finalOpacity = config.baseLineOpacity + opacityFactor * config.hoverLineOpacityBoost * avgProgress;

                    ctx.strokeStyle = hexToRgba(lineColorHex, finalOpacity);
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1)); // Use logical canvas size for clearRect
        const time = performance.now() * 0.001;

        for (let i = 0; i < gridPoints.length; i++) {
            gridPoints[i].update(time, mouse);
            gridPoints[i].draw(ctx);
        }
        connectPoints();
        animationFrameId = requestAnimationFrame(animate);
    }

    // Event Listeners
    const handleResize = () => initGrid();
    const handleMouseMove = (event) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
    };
    const handleMouseLeave = () => {
        mouse.x = undefined;
        mouse.y = undefined;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove); // Now attached to window
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Initial setup and start animation
    initGrid();
    animate();

    // Basic Cleanup (Consider more robust cleanup if needed)
    // This might run too early if navigating away using client-side routing
    // A more complex setup might be needed for SPA-like behavior
    window.addEventListener('beforeunload', () => {
         window.removeEventListener('resize', handleResize);
         window.removeEventListener('mousemove', handleMouseMove); // Remove listener from window
         canvas.removeEventListener('mouseleave', handleMouseLeave);
         if (animationFrameId) {
             cancelAnimationFrame(animationFrameId);
         }
    });
}); 