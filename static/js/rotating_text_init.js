document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.rotating-text-wrapper');
    const span = document.getElementById('rotating-text-content');

    if (!wrapper || !span) {
        console.warn('Rotating text elements not found. Exiting script.');
        return;
    }

    // --- Configuration ---
    const pauseDuration = 2000; // ms between transitions
    const transitionFactor = 0.08; // Lower = slower/smoother interpolation (0 to 1)
    const loopSnapTransitionMs = 150; // Duration for the quick snap back to the start
    const normalTransitionTiming = 'ease-out'; // Timing function for normal steps

    // --- State Variables ---
    let items = []; // Now stores elements, not text
    let itemCount = 0;
    let singleLineHeight = 0;
    let animationFrameId = null;
    let currentItemIndex = 0;
    let targetY = 0;
    let currentY = 0;
    let lastSwitchTime = 0;
    let isLooping = false; // Flag to manage the loop reset transition

    // --- Functions ---

    /**
     * Calculates the height of a single line item (including padding) 
     * based on the first .rotating-item element.
     * Sets the wrapper height accordingly.
     */
    function setDimensions() {
        // Get item *elements* each time
        items = span.querySelectorAll('.rotating-item');
        itemCount = items.length;

        if (itemCount <= 1) {
            console.warn('Rotating text: Not enough items to rotate.');
            // Optionally hide the wrapper or show only the first item statically
            wrapper.style.height = 'auto'; // Let it show the single item
            wrapper.style.overflow = 'visible';
            return; // Exit if nothing to rotate
        }

        const firstItemElement = items[0];
        if (!firstItemElement) {
            console.error("Rotating text: Could not find the first .rotating-item element.");
            return;
        }

        // Temporarily allow overflow to measure full height of the *first item*
        const originalOverflow = wrapper.style.overflow;
        const originalHeight = wrapper.style.height;
        // No need to make wrapper visible, just measure the item directly
        // wrapper.style.overflow = 'visible';
        // wrapper.style.height = 'auto';

        // Force reflow might not be needed if measuring directly
        // span.offsetHeight; 

        // Calculate height based on the offsetHeight of the first padded item
        singleLineHeight = firstItemElement.offsetHeight;

        // Reset overflow and set calculated height
        wrapper.style.overflow = 'hidden'; // Set back to hidden

        if (singleLineHeight > 0) {
            wrapper.style.height = `${singleLineHeight}px`;
            console.log(`Rotating text: Calculated line height: ${singleLineHeight}px. Wrapper height set.`);

            // Start animation only if not already running and height is valid
            if (!animationFrameId) {
                lastSwitchTime = performance.now();
                // --- MODIFIED: Set initial state to show the LAST item ---
                currentItemIndex = itemCount - 1;
                currentY = -(itemCount - 1) * singleLineHeight;
                targetY = currentY;
                span.style.transform = `translateY(${currentY}px)`;
                span.style.transition = 'none'; // Ensure no initial transition
                animationFrameId = requestAnimationFrame(animateRotation);
            }
        } else {
            console.error("Rotating text: Could not calculate line height accurately from item.");
            wrapper.style.height = originalHeight; // Revert height if calculation failed
        }
    }

    /**
     * The main animation loop using requestAnimationFrame.
     * Handles switching items and interpolating the translateY position.
     */
    function animateRotation(now) {
        if (singleLineHeight <= 0) { // Wait for valid height
            animationFrameId = requestAnimationFrame(animateRotation);
            return;
        }

        const elapsedTime = now - lastSwitchTime;

        // --- Determine Target Position --- 
        // Check if it's time to switch to the next item (and not already handling the loop reset)
        if (!isLooping && elapsedTime > pauseDuration) {
            // --- MODIFIED: Decrement index --- 
            currentItemIndex--; 
            
            // --- MODIFIED: Check if loop reset needed (index < 0) --- 
            if (currentItemIndex < 0) { 
                isLooping = true; // Start the special loop reset process
                // Target the *visual* position of the LAST item again for the snap
                targetY = -(itemCount - 1) * singleLineHeight; 
                span.style.transition = `transform ${loopSnapTransitionMs}ms ${normalTransitionTiming}`;
            } else {
                // Target the next item normally - Use NEGATIVE value for upward scroll
                targetY = -currentItemIndex * singleLineHeight;
                lastSwitchTime = now; // Reset pause timer only for normal steps
                span.style.transition = `transform ${pauseDuration * transitionFactor}ms ${normalTransitionTiming}`;
            }
        }

        // --- Smooth Interpolation --- 
        // Only interpolate if not currently in the special loop reset state AND not already at target
        if (!isLooping && Math.abs(targetY - currentY) > 0.1) {
             currentY += (targetY - currentY) * transitionFactor;
        } else if (isLooping && Math.abs(targetY - currentY) > 0.1) {
            // During loop reset, let the quick CSS transition handle the movement visually
            // We just wait until the visual snap is likely complete before resetting internal state. 
            // Alternatively, use interpolation here too for a smoother (but possibly less 'snappy') loop.
            currentY += (targetY - currentY) * (transitionFactor * 4); // Faster interpolation during snap back
        } else {
            // Snap to target if very close
            currentY = targetY;
            
            // --- MODIFIED: Loop Reset Logic (for index < 0) --- 
            // If we just snapped to the target visually *during* the loop reset process
            if (isLooping && currentItemIndex < 0) {
                // Instantly reset internal state *after* the visual snap to show the LAST item
                span.style.transition = 'none'; // Disable transition for internal reset
                currentItemIndex = itemCount - 1; // Reset index to last item
                currentY = -(itemCount - 1) * singleLineHeight; // Reset Y to last item position
                targetY = currentY; // Target is also reset to last item position
                span.style.transform = `translateY(${currentY}px)`; // Apply reset instantly
                
                lastSwitchTime = performance.now(); // Reset pause timer for the last item's display
                isLooping = false; // End loop reset state
                
                // Restore normal transition for the next *actual* move
                // We apply it slightly later to ensure the instant reset takes effect
                requestAnimationFrame(() => { 
                     span.style.transition = `transform ${pauseDuration * transitionFactor}ms ${normalTransitionTiming}`;
                });
            }
        }

        // --- Apply Transform --- 
        // Avoid applying if already visually reset during loop handling
        if (!isLooping || currentItemIndex < itemCount) {
             span.style.transform = `translateY(${currentY}px)`;
        }

        // --- Continue Animation --- 
        animationFrameId = requestAnimationFrame(animateRotation);
    }

    // --- Initialization & Event Listeners ---

    // Initial calculation
    setDimensions();

    // Recalculate on resize (debounced)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            console.log("Rotating text: Resizing detected, recalculating dimensions...");
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null; // Allow animation to restart in setDimensions
            // Reset position visually before recalculating to avoid jumpiness
            if(span) span.style.transform = 'translateY(0px)'; 
            setDimensions();
        }, 250);
    });

}); 