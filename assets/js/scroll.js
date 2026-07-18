/**
 * SmileShift Scroll Dynamics and Lenis Smooth Scrolling config
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lenis for Smooth Scrolling
    window.lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    window.lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        window.lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
});

// Cinematic scroll easing curve
const cinematicEase = (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

function smoothScrollTo(targetSelector) {
    const section = document.querySelector(targetSelector);
    if (section) {
        window.lenis.scrollTo(section, {
            offset: targetSelector === '#hero-offer' ? -50 : 0,
            duration: 2.2,
            easing: cinematicEase
        });
    }
}
