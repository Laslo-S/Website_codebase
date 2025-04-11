// JavaScript for smooth scrolling on same-page anchor links 

document.addEventListener('DOMContentLoaded', () => {
    // --- Read Config --- 
    let scrollDuration = 750; // Default ms
    try {
        const rootStyles = window.getComputedStyle(document.documentElement);
        const durationStr = rootStyles.getPropertyValue('--smooth-scroll-duration').trim();
        scrollDuration = parseInt(durationStr) || scrollDuration;
        scrollDuration = Math.max(100, scrollDuration); // Ensure minimum duration
    } catch (error) {
        console.error("Error reading --smooth-scroll-duration:", error);
    }

    // --- Find eligible links --- 
    // Select links with href starting with # but not just # alone
    const scrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    // --- Animation Function --- 
    function smoothScrollTo(targetY, duration) {
        const startY = window.pageYOffset;
        const distance = targetY - startY;
        let startTime = null;

        function animationStep(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1); // Ensure progress doesn't exceed 1

            // Easing function (ease-in-out cubic)
            const ease = progress < 0.5 
                         ? 4 * progress * progress * progress 
                         : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            window.scrollTo(0, startY + distance * ease);

            if (timeElapsed < duration) {
                requestAnimationFrame(animationStep);
            }
        }

        requestAnimationFrame(animationStep);
    }

    // --- Attach Listeners --- 
    scrollLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            const targetId = href.substring(1); // Remove #
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                event.preventDefault(); // Prevent default jump

                // Calculate target position, considering potential fixed header (optional)
                // Basic calculation for now:
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                // Account for fixed header height if necessary (example)
                // const header = document.querySelector('header'); // Adjust selector if needed
                // const headerHeight = header ? header.offsetHeight : 0;
                // const finalTargetPosition = targetPosition - headerHeight;

                smoothScrollTo(targetPosition, scrollDuration);
            }
            // If targetElement not found, allow default behavior (might be external link)
        });
    });
}); 