document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card-group');

    // Store animation frame IDs, start times, and Lottie instances
    const animationStates = new Map(); // card -> { bobbingFrameId: null, bobbingStartTime: 0, lottieAnim: null }

    // --- Read Animation Config from CSS --- 
    // Do this once outside the loop for efficiency
    let initialBobDistance = 8; // Default px
    let decaySeconds = 1.5;   // Default seconds
    let frequency = 4;      // Default Hz (cycles per second)
    let pulseMinScale = 1.0;
    let pulseMaxScale = 1.08;
    let pulseFrequency = 0.75;
    let lottieArrowPath = '';
    try {
        const rootStyles = window.getComputedStyle(document.documentElement);
        const distStr = rootStyles.getPropertyValue('--service-icon-initial-bob-distance').trim().replace('px', '');
        initialBobDistance = parseFloat(distStr) || initialBobDistance;
        
        const decayStr = rootStyles.getPropertyValue('--service-icon-bob-decay-seconds').trim().replace('s', '');
        decaySeconds = parseFloat(decayStr) || decaySeconds;
        decaySeconds = Math.max(0.1, decaySeconds); // Avoid division by zero / instant decay

        const freqStr = rootStyles.getPropertyValue('--service-icon-bob-frequency').trim();
        frequency = parseFloat(freqStr) || frequency;
        frequency = Math.max(0.1, frequency); // Ensure positive frequency

        const minScaleStr = rootStyles.getPropertyValue('--learn-more-pulse-min-scale').trim();
        pulseMinScale = parseFloat(minScaleStr) || pulseMinScale;
        const maxScaleStr = rootStyles.getPropertyValue('--learn-more-pulse-max-scale').trim();
        pulseMaxScale = parseFloat(maxScaleStr) || pulseMaxScale;
        const pulseFreqStr = rootStyles.getPropertyValue('--learn-more-pulse-frequency').trim();
        pulseFrequency = parseFloat(pulseFreqStr) || pulseFrequency;
        pulseFrequency = Math.max(0.1, pulseFrequency); // Ensure positive frequency

        // Get Lottie path (Requires defining it, maybe in base template or via a data attribute?)
        // For now, assuming a global variable or direct path
        // BEST PRACTICE: Pass this via a data attribute on the card or script tag
        lottieArrowPath = '/static/lottie/Arrow01.json'; // Hardcoded for now
        if (!lottieArrowPath) {
            console.warn('Lottie arrow path not found.');
        }

        // console.log("Bobbing config:", { initialBobDistance, decaySeconds, frequency });
        // console.log("Pulse config:", { pulseMinScale, pulseMaxScale, pulseFrequency });

    } catch (error) {
        console.error("Error reading bobbing animation config from CSS:", error);
        console.error("Error reading animation config from CSS:", error); // Update error message if needed
    }
    // --- End Config Reading ---

    // --- Bobbing Animation Function --- 
    function animateBob(timestamp, card, icon) {
        let state = animationStates.get(card);
        // Check if state exists AND if the bobbing animation hasn't been cancelled
        if (!state || state.bobbingFrameId === null) return; 

        if (!state.bobbingStartTime) {
            state.bobbingStartTime = timestamp;
        }

        const elapsedTime = (timestamp - state.bobbingStartTime) / 1000; // Seconds
        const decayFactor = Math.max(0, 1 - (elapsedTime / decaySeconds));
        const currentBobDistance = initialBobDistance * decayFactor;

        if (currentBobDistance <= 0.01) {
            icon.style.transform = 'translateY(0px)';
            state.bobbingFrameId = null; // Mark as stopped
            state.bobbingStartTime = 0;
            // Don't delete state entirely here, pulse might still be running
            animationStates.set(card, state); 
            return; // Stop the animation
        }

        const angle = elapsedTime * frequency * 2 * Math.PI; 
        const verticalOffset = -currentBobDistance * Math.sin(angle);
        icon.style.transform = `translateY(${verticalOffset.toFixed(2)}px)`;

        // Request next frame and store ID
        state.bobbingFrameId = requestAnimationFrame((ts) => animateBob(ts, card, icon));
        animationStates.set(card, state); 
    }
    // --- End Bobbing Animation Function --- 

    serviceCards.forEach(card => {
        const icon = card.querySelector('.service-icon-image'); 
        const lottieContainer = card.querySelector('.lottie-learn-more-arrow'); 
        const learnMoreLink = card.querySelector('.learn-more-link'); // Find the link itself
        
        let lottieAnimInstance = null;

        // --- Initial Setup --- 
        // Load Lottie Animation (if container and path exist)
        if (lottieContainer && lottieArrowPath && typeof lottie !== 'undefined') {
            lottieAnimInstance = lottie.loadAnimation({
                container: lottieContainer,
                renderer: 'svg',
                loop: true, // Set loop to true
                autoplay: false,
                path: lottieArrowPath
            });
            lottieContainer.style.display = 'none'; // Ensure hidden initially by JS too
        } else {
             // Handle errors/warnings as before
             if (!lottieContainer) console.warn('Lottie container not found for a card.');
             if (!lottieArrowPath) console.warn('Lottie path missing, cannot load arrow animation.');
             if (typeof lottie === 'undefined') console.warn('Lottie library not loaded, cannot init arrow animation.');
        }
        // --- End Initial Setup ---

        // Store lottie instance in state map (can be done once here)
        let initialState = { bobbingFrameId: null, bobbingStartTime: 0, lottieAnim: lottieAnimInstance };
        animationStates.set(card, initialState);

        card.addEventListener('mouseenter', () => {
            card.classList.add('is-hovered');
            let state = animationStates.get(card); // Get existing state
            // REMOVED: Storing initial state here

            // --- Start Icon Bobbing --- 
            if (icon) {
                if (state.bobbingFrameId) cancelAnimationFrame(state.bobbingFrameId);
                state.bobbingStartTime = 0; 
                state.bobbingFrameId = requestAnimationFrame((ts) => animateBob(ts, card, icon));
            }

            // REMOVED: Play Lottie Animation on card hover
            
            animationStates.set(card, state); // Store updated bobbing state
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('is-hovered');
            let state = animationStates.get(card);
            if (!state) return; 

            // --- Stop Icon Bobbing --- 
            if (icon && state.bobbingFrameId) {
                cancelAnimationFrame(state.bobbingFrameId);
                state.bobbingFrameId = null;
                state.bobbingStartTime = 0;
                icon.style.transform = 'translateY(0px)';
            }
            
            // REMOVED: Stop Lottie Animation on card leave

            animationStates.set(card, state); // Store updated bobbing state
        });

        // --- ADDED: Event listeners specifically for the Learn More link --- 
        if (learnMoreLink && lottieContainer && lottieAnimInstance) {
            learnMoreLink.addEventListener('mouseenter', () => {
                lottieContainer.style.display = 'inline-block'; // Show container
                lottieAnimInstance.goToAndPlay(0, true); // Play animation from start
            });

            learnMoreLink.addEventListener('mouseleave', () => {
                lottieAnimInstance.stop(); // Stop animation
                lottieContainer.style.display = 'none'; // Hide container
            });
        }
        // --- End Learn More Link Listeners ---
    });
}); 