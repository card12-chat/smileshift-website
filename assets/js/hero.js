/**
 * SmileShift Hero Section Entry Animations
 */
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        // GSAP smooth stagger reveal for hero offer contents
        gsap.from('#hero-offer h1, #hero-offer p, #hero-offer .inline-flex, #hero-offer .flex-wrap', {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out"
        });

        gsap.from('#hero-offer .lg\\:col-span-5', {
            scale: 0.95,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out"
        }, "-=1.0");

        gsap.from('.kit-selection-card', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.6");
    }, 100);
});
