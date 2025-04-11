// JavaScript for the hero section Lottie interaction indicator

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('lottie-hero-interact');
    const lottiePath = '/static/lottie/move_finger.json'; // UPDATED Path to the correct Lottie file

    if (container && typeof lottie !== 'undefined') {
        try {
            const anim = lottie.loadAnimation({
                container: container,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: lottiePath
            });
        } catch (error) {
            console.error('Error loading hero Lottie animation:', error);
            if (container) container.style.display = 'none'; // Hide container on error
        }
    } else {
        if (!container) {
            console.warn('Hero Lottie container #lottie-hero-interact not found.');
        }
        if (typeof lottie === 'undefined') {
            console.warn('Lottie library not loaded, cannot init hero interaction indicator.');
        }
    }
}); 