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
    const normalTransitionTiming = 'ease-out'; // Timing function for normal steps

    // MODIFY: Use a fixed transition duration for clarity and predictability
    const normalTransitionDuration = 400; // Fixed 400ms transition (adjust as needed for visual feel)
    const normalTransitionSettings = `transform ${normalTransitionDuration}ms ${normalTransitionTiming}`;
    console.log(`Rotating text: Using fixed transition duration: ${normalTransitionDuration}ms`);

    // --- State Variables ---
    let items = []; // Now stores elements, not text
    let itemCount = 0;
    let singleLineHeight = 0;
    let animationFrameId = null;
    let currentItemIndex = 0; // Will be set properly in setDimensions
    let targetY = 0;
    let currentY = 0;
    let lastSwitchTime = 0;

    // --- Functions ---

    /**
     * Calculates the height of a single line item (including padding)
     * based on the first .rotating-item element.
     * Sets the wrapper height and INITIAL STATE for reversed scroll.
     */
    function setDimensions() {
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
            console.log(`Rotating text UP (Jump Fix): Calculated line height: ${singleLineHeight}px.`);

            // Start animation only if not already running and height is valid
            if (!animationFrameId) { // No isResetting check needed
                lastSwitchTime = performance.now();

                // --- MODIFIED: Start at LAST UNIQUE item (index itemCount - 2) --- //
                currentItemIndex = itemCount - 2; // e.g., index 4 if itemCount = 6
                currentY = -currentItemIndex * singleLineHeight; // e.g., -4h. Negative Y moves content UP, showing item towards bottom.
                targetY = currentY;
                span.style.transition = 'none'; // No transition for initial set
                span.style.transform = `translateY(${currentY}px)`;
                console.log(`Rotating text UP (Jump Fix): Initialized at index ${currentItemIndex}, Y=${currentY}px`);

                span.offsetHeight; // Force reflow after initial position set

                // Enable transitions and start the loop AFTER initial setup
                requestAnimationFrame(() => {
                    span.style.transition = normalTransitionSettings;
                    console.log("Rotating text UP (Jump Fix): Normal transitions enabled.");
                    animationFrameId = requestAnimationFrame(animateRotation);
                });
                 // --- /MODIFIED --- //
            }
        } else {
            console.error("Rotating text: Could not calculate line height accurately from item.");
            wrapper.style.height = originalHeight; // Revert height if calculation failed
        }
    }

    /**
     * Animation loop for REVERSED direction (UP scroll: text enters top, exits bottom).
     * Uses index decrementing and the "Jump -> Reflow -> Transition" loop mechanism.
     */
    function animateRotation(now) {
        // REMOVED isResetting check
        if (singleLineHeight <= 0) {
            // Prevent multiple RAF chains if height becomes 0 temporarily
            if (animationFrameId === null) { animationFrameId = requestAnimationFrame(animateRotation); }
            return;
        }

        const elapsedTime = now - lastSwitchTime;

        // Check if it's time to switch to the next item
        if (elapsedTime > pauseDuration) {
            // --- Update time immediately when starting the switch/loop logic --- //
            lastSwitchTime = now;
            console.log(`Switch triggered UP (Jump Fix). Elapsed: ${elapsedTime.toFixed(0)}ms. Current index: ${currentItemIndex}`);

            // --- Loop Logic: Check if we are currently showing Item 0 (index 0) --- //
            if (currentItemIndex === 0) {
                // Finished pausing on Item 0. Need to loop to Item N-1 (index itemCount - 2).
                console.log(`Looping UP (Jump Fix): Currently at index 0.`);

                // 1. INSTANT JUMP: Position span so duplicate Item 0 (index itemCount - 1) is shown
                const jumpY = -(itemCount - 1) * singleLineHeight; // Y pos of duplicate (e.g., -5h)
                console.log(`   Instant Jump to Y=${jumpY}px (showing duplicate 0)`);
                span.style.transition = 'none'; // NO transition for jump
                span.style.transform = `translateY(${jumpY}px)`;
                // currentY = jumpY; // Internal state update (optional)

                // ---> Force browser reflow AFTER applying jump style <--- //
                span.offsetHeight;

                // 2. PREPARE & START SMOOTH TRANSITION: Target Item N-1 (index itemCount - 2)
                // Set the target index state *before* starting the transition
                currentItemIndex = itemCount - 2; // Target index (e.g., 4)
                const targetY = -currentItemIndex * singleLineHeight; // Y pos of Item N-1 (e.g., -4h)
                console.log(`   Starting Transition to index ${currentItemIndex} at Y=${targetY}px`);

                // Apply transition settings *before* setting the target transform
                span.style.transition = normalTransitionSettings;
                // Now set the target transform to trigger the animation
                span.style.transform = `translateY(${targetY}px)`;
                currentY = targetY; // Update internal state tracker

                // The pause timer (lastSwitchTime) was already reset at the start of the if block.
                // The pause for Item N-1 will begin AFTER this transition completes.

            } else {
                // --- Normal Step (Index decreasing, Span moving down visually) --- //
                const nextVisualIndex = currentItemIndex - 1;
                currentItemIndex = nextVisualIndex; // Update index (e.g., 4 -> 3)
                const targetY = -currentItemIndex * singleLineHeight; // Calculate target Y (e.g., -3h)
                console.log(`Normal Step UP (Jump Fix): Transitioning to index ${currentItemIndex} at Y=${targetY}px`);

                // Ensure transition settings are applied (might be redundant but safe)
                span.style.transition = normalTransitionSettings;
                span.style.transform = `translateY(${targetY}px)`;
                currentY = targetY; // Update internal state tracker
            }
             // --- / Loop & Normal Step Logic --- //
        } // End time check

        // --- Continue Animation Loop --- //
        // REMOVED isResetting check
        animationFrameId = requestAnimationFrame(animateRotation);
    } // End of animateRotation

    // --- Initialization & Event Listeners ---

    // Initial calculation (which now sets the reversed start state)
    setDimensions();

    // Recalculate on resize (debounced)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            console.log("Rotating text: Resizing detected, recalculating dimensions...");
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
            // --- REMOVED isResetting = false; --- //
            // Reset position visually before recalculating
            if(span) {
                span.style.transition = 'none'; // Prevent animation during resize reset
                // --- MODIFIED: Reset transform consistent with new initial state if needed, --- //
                // --- but setDimensions will handle the correct initial positioning. -------- //
                // span.style.transform = 'translateY(0px)'; // Old reset
                 // We let setDimensions recalculate and apply the -(N-2)h transform
            }
            setDimensions(); // Restart the setup process
        }, 250);
    });

}); 