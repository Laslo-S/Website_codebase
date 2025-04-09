let isMouseOverGallery = false;
let relativeMouseX = 0.5; // Start in the middle
let currentScrollSpeed = 0; // Pixels per second (Treat as Velocity)
let currentTranslateX = 0; // NEW: Tracks the target translateX position
let lastTimestamp = 0;
let animationFrameId = null;

document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.querySelector('.css-gallery-container');
    const galleryTrack = document.querySelector('.css-gallery-track');
    const computedStyle = getComputedStyle(document.documentElement); // For reading CSS vars

    if (!galleryContainer || !galleryTrack) {
        console.error("CSS Gallery container or track not found!");
        return;
    }

    // --- Read Control Variables from CSS ---
    // Default values are fallbacks in case CSS vars are missing
    const idlePPS = parseFloat(computedStyle.getPropertyValue('--gallery-idle-scroll-pps').trim() || '30');
    const maxPPS = parseFloat(computedStyle.getPropertyValue('--gallery-mouse-max-pps').trim() || '600');
    const acceleration = parseFloat(computedStyle.getPropertyValue('--gallery-mouse-acceleration').trim() || '0.8');
    const damping = parseFloat(computedStyle.getPropertyValue('--gallery-mouse-damping').trim() || '0.92');
    const deadzonePercent = parseFloat(computedStyle.getPropertyValue('--gallery-mouse-deadzone-percent').trim() || '10');
    const deadzoneStart = (50 - deadzonePercent / 2) / 100;
    const deadzoneEnd = (50 + deadzonePercent / 2) / 100;
    const speedExponent = parseFloat(computedStyle.getPropertyValue('--gallery-mouse-speed-exponent').trim() || '1.5'); // Read exponent

    // console.log(`Gallery Controls: idlePPS=${idlePPS}, maxPPS=${maxPPS}, accel=${acceleration}, damping=${damping}, deadzone=${deadzoneStart.toFixed(2)}-${deadzoneEnd.toFixed(2)}`);

    // --- Function to calculate and apply slide widths (from gallery-swiper-init.js) ---
    function updateGalleryItemWidths() {
        const rootStyles = window.getComputedStyle(document.documentElement);

        // Read CSS Variables (handle potential errors and units)
        let slideHeightRem = parseFloat(rootStyles.getPropertyValue('--gallery-slide-height').trim() || '26');
        const variance = parseFloat(rootStyles.getPropertyValue('--gallery-aspect-ratio-variance').trim() || '0.35');
        const maxThreshold = parseFloat(rootStyles.getPropertyValue('--gallery-full-aspect-threshold').trim() || '4096'); // Adjusted default
        const minThreshold = parseFloat(rootStyles.getPropertyValue('--gallery-min-aspect-threshold').trim() || '320');

        // Convert rem to pixels for height (assuming 1rem = 16px, adjust if base font size differs)
        const baseFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
        const slideHeightPx = slideHeightRem * baseFontSize;

        // Calculate slide width bounds in pixels (using original formula)
        const minSlideWidthPx = slideHeightPx * (0.5625 + 1.2153 * variance); // Approx 9:16 to 16:9 based on variance
        const maxSlideWidthPx = slideHeightPx * (16 / 9);

        // Calculate viewport factor
        const currentViewportWidth = window.innerWidth;
        let viewportFactor = 0;
        // Avoid division by zero if thresholds are equal
        if (maxThreshold > minThreshold) {
            const rawFactor = (currentViewportWidth - minThreshold) / (maxThreshold - minThreshold);
            viewportFactor = Math.max(0, Math.min(1, rawFactor));
        } else if (currentViewportWidth >= maxThreshold) {
            viewportFactor = 1; // If thresholds are same, factor is 1 above threshold
        }

        // Calculate target width using interpolation
        const targetSlideWidthPx = minSlideWidthPx + (maxSlideWidthPx - minSlideWidthPx) * viewportFactor;

        // Apply width to all css-gallery-item elements
        const items = galleryTrack.querySelectorAll('.css-gallery-item'); // Target correct items
        items.forEach(item => {
            item.style.width = `${targetSlideWidthPx}px`;
        });

        // console.log(`Updated Item Widths - Viewport: ${currentViewportWidth}px, Factor: ${viewportFactor.toFixed(2)}, Width: ${targetSlideWidthPx.toFixed(0)}px`);

        // Return the calculated width for use in originalContentWidth calculation
        return targetSlideWidthPx;
    }

    // --- Duplicate items for seamless looping ---
    const originalItems = Array.from(galleryTrack.children);
    if (originalItems.length > 0) {
        originalItems.forEach(item => {
            const clone = item.cloneNode(true);
            galleryTrack.appendChild(clone);
        });
        // console.log(`Cloned ${originalItems.length} gallery items for looping.`);
    } else {
        console.warn("CSS Gallery track found, but it contains no items to duplicate.");
        return; // No items, no scrolling needed
    }

    // --- Calculate initial originalContentWidth AFTER applying initial widths ---
    // Needs recalculation on resize too! Declared with let.
    let originalContentWidth = 0; 
    function calculateOriginalContentWidth() {
        const currentItemWidth = parseFloat(galleryTrack.querySelector('.css-gallery-item')?.style.width || '0');
        const slideSpacingValue = parseFloat(computedStyle.getPropertyValue('--gallery-slide-spacing').trim().replace('px', '') || '10');
        if (originalItems.length > 0 && currentItemWidth > 0) {
             originalContentWidth = (currentItemWidth + slideSpacingValue) * originalItems.length;
             // console.log(`Recalculated originalContentWidth: ${originalContentWidth.toFixed(0)} (Item: ${currentItemWidth.toFixed(0)}, Space: ${slideSpacingValue}, Count: ${originalItems.length})`);
        } else {
            console.warn("Could not calculate originalContentWidth - items or width missing.");
            originalContentWidth = galleryTrack.scrollWidth / 2; // Fallback, might be inaccurate
        }
    }

    // --- Apply initial widths and calculate initial track boundary ---
    updateGalleryItemWidths();
    calculateOriginalContentWidth();

    // --- Hover Listeners ---
    galleryContainer.addEventListener('mouseenter', () => {
        isMouseOverGallery = true;
        // No need to interact with animationPlayState anymore
        // console.log("Gallery hover enter.");
        if (!animationFrameId) { // Start loop if not already running
            lastTimestamp = performance.now();
            animationFrameId = requestAnimationFrame(galleryJSScrollLoop);
        }
    });

    galleryContainer.addEventListener('mouseleave', () => {
        isMouseOverGallery = false;
        // console.log("Gallery hover leave.");
        // Loop continues for damping effect, no need to stop explicitly unless desired
    });

    // --- Mouse Move Listener ---
    galleryContainer.addEventListener('mousemove', (event) => {
        const rect = galleryContainer.getBoundingClientRect();
        relativeMouseX = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
        // console.log(`Mouse X: ${relativeMouseX.toFixed(2)}`); // Keep commented unless debugging
    });

    // --- JS Animation Loop for Mouse Control ---
    function galleryJSScrollLoop(timestamp) {
        const deltaTime = (timestamp - lastTimestamp) / 1000; // Seconds
        lastTimestamp = timestamp;

        let targetScrollSpeed = 0;

        // --- Calculate Target Speed and Update Physics (Always Run) ---
        if (isMouseOverGallery) {
            // --- Calculate Target Speed based on Mouse Position ---
            if (relativeMouseX < deadzoneStart) {
                // Left side - negative speed (scroll left)
                const linearIntensity = (deadzoneStart - relativeMouseX) / deadzoneStart; // 0 to 1
                const intensity = Math.pow(linearIntensity, speedExponent); // Apply exponent
                targetScrollSpeed = -intensity * maxPPS;
            } else if (relativeMouseX > deadzoneEnd) {
                // Right side - positive speed (scroll right)
                const linearIntensity = (relativeMouseX - deadzoneEnd) / (1 - deadzoneEnd); // 0 to 1
                const intensity = Math.pow(linearIntensity, speedExponent); // Apply exponent
                targetScrollSpeed = intensity * maxPPS;
            } else {
                // Inside deadzone - target is 0
                targetScrollSpeed = 0;
            }
            // --- Apply Acceleration ---
            currentScrollSpeed += (targetScrollSpeed - currentScrollSpeed) * acceleration * (deltaTime * 60); // Scale accel by frame rate
             // Limit speed to prevent extreme jumps if deltaTime is large
            currentScrollSpeed = Math.max(-maxPPS, Math.min(maxPPS, currentScrollSpeed));

        } else {
             // --- Apply Idle Scroll Speed when mouse is not over ---
             targetScrollSpeed = idlePPS; // Set target to idle speed (scrolling right)
             // Smoothly accelerate towards idle speed
             currentScrollSpeed += (targetScrollSpeed - currentScrollSpeed) * acceleration * (deltaTime * 60);
        }

        // --- Apply Damping (Friction) ---
        // Apply damping more strongly when not actively mouse-controlled OR when trying to stop (targetSpeed is 0)
        const isStopping = (isMouseOverGallery && targetScrollSpeed === 0);
        const applyStrongDamping = !isMouseOverGallery || isStopping;
        const dampingFactor = applyStrongDamping ? damping : 1; // Only damp if mouse is away or in deadzone
        currentScrollSpeed *= Math.pow(dampingFactor, deltaTime * 60); // Frame-rate independent damping


        // --- Simplified Snapping/Stopping Logic (for currentVelocityPPS) ---
        // Only apply stopping logic when mouse is OVER the gallery and in the deadzone.
        if (isMouseOverGallery && targetScrollSpeed === 0 && Math.abs(currentScrollSpeed) < 0.5) {
            currentScrollSpeed = 0; // Set velocity to 0
        }
        // Optional: Snap physics velocity if very close during idle, helps transition
        else if (!isMouseOverGallery && Math.abs(currentScrollSpeed - idlePPS) < 1.0) {
             currentScrollSpeed = idlePPS;
        }


        // --- Update Position Variable --- 
        const deltaX = currentScrollSpeed * deltaTime;
        currentTranslateX += deltaX;

        // --- Handle Looping using currentTranslateX ---
        // Loop boundary is the width of the original content
        if (originalContentWidth > 0) { // Avoid division by zero if width calculation failed
            // If scrolled past the end of the original content (moving right)
            if (currentTranslateX >= originalContentWidth) {
                currentTranslateX -= originalContentWidth;
            }
            // If scrolled past the beginning (moving left)
            else if (currentTranslateX < 0) {
                currentTranslateX += originalContentWidth;
            }
        } // else { console.warn("Looping skipped: originalContentWidth is zero."); }
        
        // --- Apply CSS Transform --- 
        // Use the internal variable, apply with negative sign for correct direction
        galleryTrack.style.transform = `translateX(${-currentTranslateX}px)`;
        
        // --- REMOVED scrollLeft update logic --- 
        /*
        const idleThreshold = 0.1; 
        const previousScrollLeft = galleryContainer.scrollLeft; 
        if (isMouseOverGallery) { ... } else { ... }
        */

        // --- REMOVED scrollLeft based looping --- 
        /*
        const currentScrollLeft = galleryContainer.scrollLeft; 
        if (currentScrollLeft >= originalContentWidth) { ... } else if (previousScrollLeft > 0 && currentScrollLeft <= 0 && currentScrollSpeed < 0) { ... }
        */

        // --- Request Next Frame ---
        animationFrameId = requestAnimationFrame(galleryJSScrollLoop);
    }

    // --- Initial Call to Start the Loop ---
    // console.log("Initializing CSS Gallery with JS Scroll Control.");
    lastTimestamp = performance.now();
    animationFrameId = requestAnimationFrame(galleryJSScrollLoop); // Start the loop immediately

    // --- Resize Listener --- 
    function throttledUpdate() {
        // Update widths first, then recalculate boundaries used for looping
        window.requestAnimationFrame(() => {
            updateGalleryItemWidths();
            calculateOriginalContentWidth(); // Ensure boundary is updated after width change
        });
    }
    window.addEventListener('resize', throttledUpdate);

    // Optional: Add window resize listener to recalculate originalContentWidth if needed

}); 