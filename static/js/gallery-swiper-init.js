// Global reference to the Swiper instance
let servicesSwiperInstance = null;

// Function to calculate and apply slide widths
function updateGallerySlideWidths() {
    const rootStyles = window.getComputedStyle(document.documentElement);
    
    // Read CSS Variables (handle potential errors and units)
    let slideHeightRem = parseFloat(rootStyles.getPropertyValue('--gallery-slide-height').trim() || '26');
    const variance = parseFloat(rootStyles.getPropertyValue('--gallery-aspect-ratio-variance').trim() || '0.5');
    const maxThreshold = parseFloat(rootStyles.getPropertyValue('--gallery-full-aspect-threshold').trim() || '1280');
    const minThreshold = parseFloat(rootStyles.getPropertyValue('--gallery-min-aspect-threshold').trim() || '320');

    // Convert rem to pixels for height (assuming 1rem = 16px, adjust if base font size differs)
    const baseFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
    const slideHeightPx = slideHeightRem * baseFontSize;

    // Calculate slide width bounds in pixels
    const minSlideWidthPx = slideHeightPx * (0.5625 + 1.2153 * variance);
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

    // Apply width to all slides
    const slides = document.querySelectorAll('.services-gallery-swiper .swiper-slide');
    slides.forEach(slide => {
        slide.style.width = `${targetSlideWidthPx}px`;
    });

    // Update Swiper instance if it exists
    if (servicesSwiperInstance) {
        servicesSwiperInstance.update();
        // console.log(`Updated Swiper - Viewport: ${currentViewportWidth}px, Factor: ${viewportFactor.toFixed(2)}, Width: ${targetSlideWidthPx.toFixed(0)}px`);
    }
}

// Throttled resize handler using requestAnimationFrame
let resizeTimeout;
function throttledUpdate() {
    window.requestAnimationFrame(updateGallerySlideWidths);
}

window.addEventListener('resize', () => {
    // Optional: Clear previous timeout if using debounce instead of RAF
    // clearTimeout(resizeTimeout);
    // resizeTimeout = setTimeout(updateGallerySlideWidths, 100); // Example debounce
    throttledUpdate(); // Use requestAnimationFrame for smoother updates
});

document.addEventListener('DOMContentLoaded', () => {
    // Initial width calculation
    updateGallerySlideWidths(); 

    // Initialize Swiper Gallery AFTER initial width calculation
    if (typeof Swiper !== 'undefined') {
        const computedStyle = window.getComputedStyle(document.documentElement);
        const spaceBetweenValue = parseInt(computedStyle.getPropertyValue('--gallery-slide-spacing').trim() || '10', 10);
        
        // Assign to global instance
        servicesSwiperInstance = new Swiper('.services-gallery-swiper', {
            loop: true,
            spaceBetween: spaceBetweenValue, // Use value from CSS variable
            grabCursor: true,
            slidesPerView: 'auto', // Essential for variable width slides
            loopedSlides: 8, 
        });
        console.log('Services gallery Swiper initialized with JS-driven width control.');
    } else {
        console.error('Swiper library not loaded before gallery-swiper-init.js.');
    }
}); 