        // Initialize Lucide Icons
        lucide.createIcons();

        // 1. Initialize Lenis for Smooth Scrolling
        const lenis = new Lenis({
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

        // Sync GSAP with Lenis
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        // 2. Initial Entrance Animations (Text)
        window.addEventListener('DOMContentLoaded', () => {
            const textContent = document.getElementById('hero-text-content');
            setTimeout(() => {
                textContent.classList.add('reveal-active');
                document.querySelectorAll('.reveal-up').forEach(el => {
                    el.classList.add('reveal-active');
                });
            }, 100);
        });

        // 3. Scroll-Driven Video Playback Logic
        gsap.registerPlugin(ScrollTrigger);

        // 4. Scroll-Driven Fade & Blur using GSAP
        const heroText = document.getElementById('hero-text-content');
        const scrollIndicator = document.getElementById('hero-scroll-indicator');

        gsap.to([heroText, scrollIndicator], {
            scrollTrigger: {
                trigger: "#hero-scroll-container",
                start: "top top",
                end: "top -30%",
                scrub: true
            },
            opacity: 0,
            y: -40,
            filter: "blur(15px)",
            ease: "none"
        });

        // 5. Canvas Image Sequence Scrubbing (High Performance iOS/Mobile Fix)
        const canvas = document.getElementById('hero-canvas');
        const context = canvas.getContext('2d');
        
        const frameCount = 192;
        const currentFrame = index => `media/webp/sequence/${(index + 1).toString().padStart(4, '0')}.webp`;

        const images = [];
        const imageSeq = { frame: 0 };

        // Preload frames
        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            images.push(img);
        }

        // Initialize canvas sizing on first frame load
        images[0].onload = () => {
            canvas.width = images[0].naturalWidth;
            canvas.height = images[0].naturalHeight;
            renderCanvasFrame();
        };

        // Render function
        function renderCanvasFrame() {
            if (images[imageSeq.frame] && images[imageSeq.frame].complete) {
                // Ensure canvas sizing is correct just in case
                if(canvas.width === 300) { // Default HTML width
                    canvas.width = images[0].naturalWidth;
                    canvas.height = images[0].naturalHeight;
                }
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(images[imageSeq.frame], 0, 0, canvas.width, canvas.height);
            }
        }

        // Bind sequence to ScrollTrigger
        gsap.to(imageSeq, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                trigger: "#hero-scroll-container",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5 // Smoothing factor
            },
            onUpdate: renderCanvasFrame
        });

        // 5. Initialize SwiperJS for Third Fold Visual Proof
        window.addEventListener('DOMContentLoaded', () => {
            const swiper = new Swiper('.swiper-stacked-cards', {
                effect: 'cards',
                grabCursor: true,
                cardsEffect: {
                    slideShadows: false, // Custom CSS shadows are used instead
                    perSlideOffset: 12, // Apple-style subtle depth
                    perSlideRotate: 2, // Very slight rotation for realism
                },
                resistanceRatio: 0.6, // Bouncy feel when dragged past limit
                speed: 600, // Buttery smooth transitions
            });
        });

        // 6. Cinematic Entrance for Third Fold
        window.addEventListener('DOMContentLoaded', () => {
            const tl3 = gsap.timeline({
                scrollTrigger: {
                    trigger: "#third-fold",
                    start: "top 65%", // Trigger when top of section reaches 65% of viewport
                    toggleActions: "play none none reverse" // Rewind if scrolling up for replayability
                }
            });

            // Sequence (Mobile First mentality): Carousel -> Tag -> Title -> Subhead -> Benefits
            tl3.to('.anim-3-carousel', { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" })
                .to('.anim-3-tag', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.8")
                .to('.anim-3-title', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.6")
                .to('.anim-3-sub', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.8")
                .to('.anim-3-benefit', { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.15 }, "-=0.5");
        });

        // 7. Cinematic Entrance for Fourth Fold
        window.addEventListener('DOMContentLoaded', () => {
            const tl4 = gsap.timeline({
                scrollTrigger: {
                    trigger: "#fourth-fold",
                    start: "top 65%",
                    toggleActions: "play none none reverse"
                }
            });

            // Sequence: Image -> Tag -> Title -> Subhead -> Blocks -> Final
            tl4.to('.anim-4-image', { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" })
                .to('.anim-4-tag', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.8")
                .to('.anim-4-title', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.6")
                .to('.anim-4-sub', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.7")
                .to('.anim-4-block', { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.15 }, "-=0.5")
                .to('.anim-4-final', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.3");
        });

        // 8. Cinematic Entrance for Fifth Fold (Pricing)
        window.addEventListener('DOMContentLoaded', () => {
            const tl5 = gsap.timeline({
                scrollTrigger: {
                    trigger: "#fifth-fold",
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            });

            const isDesktop = window.innerWidth >= 768;

            tl5.to('.anim-5-tag', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" })
                .to('.anim-5-title', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.6")
                .to('.anim-5-sub', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.7")
                .to('.anim-5-card', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.2 }, "-=0.4")
                .to('.anim-5-card-main', {
                    scale: isDesktop ? 1.05 : 1,
                    opacity: 1,
                    duration: 1,
                    ease: "elastic.out(1, 0.75)"
                }, isDesktop ? "-=0.7" : "-=1.0")
                .to('.anim-5-trust', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.8");

            // 9. Stacked Carousel Testimonials Loop
            const tCards = document.querySelectorAll('.t-stack-card');
            if (tCards.length > 0) {
                let currentStatus = [1, 2, 3, 4, 5, 6];
                setInterval(() => {
                    // shift statuses
                    currentStatus.unshift(currentStatus.pop());
                    tCards.forEach((c, i) => {
                        // clear existing s-* classes matching exactly s-1, s-2, etc
                        c.className = c.className.replace(/\bs-\d\b/g, '').trim();
                        // add new class
                        c.classList.add(`s-${currentStatus[i]}`);
                    });
                }, 4000);
            }

            // 10. Sixth Fold GSAP Animation
            const tl6 = gsap.timeline({
                scrollTrigger: {
                    trigger: "#sixth-fold",
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            });

            tl6.to('.anim-6-tag', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" })
                .to('.anim-6-title', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.6")
                .to('.anim-6-sub', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.7")
                .to('.anim-6-carousel', { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.2)" }, "-=0.5")
                .to('.anim-6-faq', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.1 }, "-=0.6");
                
            // 11. Seventh Fold GSAP Animation (The Closer)
            const tl7 = gsap.timeline({
                scrollTrigger: {
                    trigger: "#seventh-fold",
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });

            tl7.to('.anim-7-tag', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" })
               .to('.anim-7-title', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.6")
               .to('.anim-7-sub', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.7")
               .to('.anim-7-card', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.2 }, "-=0.4")
               .to('.anim-7-final', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.5")
               .to('.anim-7-btn', { y: 0, scale: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.75)" }, "-=0.6")
               .to('.anim-7-trust', { opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.8");

            // 11.5 Eighth Fold GSAP Animation (Risk Reversal)
            const tl8 = gsap.timeline({
                scrollTrigger: {
                    trigger: "#eighth-fold",
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            });

            tl8.to('.anim-8-tag', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" })
               .to('.anim-8-title', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.6")
               .to('.anim-8-sub', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.7")
               .to('.anim-8-visual', { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }, "-=0.5")
               .to('.anim-8-feature', { x: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.15 }, "-=0.8")
               .to('.anim-8-final', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.6")
               .to('.anim-8-btn', { y: 0, scale: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.75)" }, "-=0.5");
        });

        // FAQ Accordion Toggle
        function toggleFaq(button) {
            const content = button.nextElementSibling;
            const iconWrapper = button.querySelector('.faq-icon');
            const parentItem = button.parentElement;

            // Close all others
            document.querySelectorAll('#faq-accordion .faq-content').forEach(el => {
                if (el !== content) {
                    el.style.height = '0px';
                    el.previousElementSibling.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
                    el.previousElementSibling.querySelector('.faq-icon').classList.remove('bg-smile-purple-main', 'text-white');
                    el.previousElementSibling.querySelector('.faq-icon').classList.add('bg-stone-100', 'text-smile-purple-main');
                    el.parentElement.classList.remove('border-smile-purple-main/40', 'shadow-md');
                    el.parentElement.classList.add('border-stone-200');
                }
            });

            if (content.style.height && content.style.height !== '0px') {
                content.style.height = '0px';
                iconWrapper.style.transform = 'rotate(0deg)';
                iconWrapper.classList.remove('bg-smile-purple-main', 'text-white');
                iconWrapper.classList.add('bg-stone-100', 'text-smile-purple-main');
                parentItem.classList.remove('border-smile-purple-main/40', 'shadow-md');
                parentItem.classList.add('border-stone-200');
            } else {
                content.style.height = content.scrollHeight + 'px';
                iconWrapper.style.transform = 'rotate(45deg)';
                iconWrapper.classList.remove('bg-stone-100', 'text-smile-purple-main');
                iconWrapper.classList.add('bg-smile-purple-main', 'text-white');
                parentItem.classList.remove('border-stone-200');
                parentItem.classList.add('border-smile-purple-main/40', 'shadow-md');
            }
        }

        // 12. Smooth Scroll to Offer
        function scrollToOffer() {
            const offerSection = document.getElementById('fifth-fold');
            if (offerSection) {
                lenis.scrollTo(offerSection, { offset: -50 }); // Leaves breathing room at the top
                
                // Add dynamic pulse highlight to the 3-box central card when it lands
                setTimeout(() => {
                    const mainCard = document.querySelector('.anim-5-card-main');
                    if (mainCard) {
                        gsap.to(mainCard, { 
                            scale: window.innerWidth >= 768 ? 1.08 : 1.03, 
                            boxShadow: "0 0 80px rgba(123, 63, 199, 0.5)",
                            borderColor: "rgba(123, 63, 199, 1)",
                            duration: 0.4, 
                            yoyo: true, 
                            repeat: 3, 
                            ease: "power2.inOut",
                            clearProps: "all" // Clears GSAP overrides when done to restore default hover stats
                        });
                    }
                }, 1100); // Trigger right after scroll duration ends
            }
        }

        // 12.5 Cinematic Scroll Functions for Hero Buttons
        // Custom easing curve: Starts luxuriously slow to showcase the Hero video scrub, 
        // glides smoothly through the middle, and lands softly. (easeInOutQuart)
        const cinematicEase = (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

        function scrollToOfferCinema() {
            const offerSection = document.getElementById('fifth-fold');
            if (offerSection) {
                // Prolonged 2.8s duration with custom quart easing for a guided narrative feel
                lenis.scrollTo(offerSection, { 
                    offset: -50, 
                    duration: 2.8,
                    easing: cinematicEase 
                }); 
                
                // Highlight offer card on arrival
                setTimeout(() => {
                    const mainCard = document.querySelector('.anim-5-card-main');
                    if (mainCard) {
                        gsap.to(mainCard, { 
                            scale: window.innerWidth >= 768 ? 1.08 : 1.03, 
                            boxShadow: "0 0 80px rgba(123, 63, 199, 0.5)",
                            borderColor: "rgba(123, 63, 199, 1)",
                            duration: 0.4, 
                            yoyo: true, 
                            repeat: 3, 
                            ease: "power2.inOut",
                            clearProps: "all"
                        });
                    }
                }, 2900); // Trigger just after the 2.8s scroll ends
            }
        }

        function scrollToHowItWorks() {
            const howItWorksSection = document.getElementById('second-fold');
            if (howItWorksSection) {
                // 1.8s duration for the immediate next section, slow enough to appreciate the video exit
                lenis.scrollTo(howItWorksSection, { 
                    offset: 0, 
                    duration: 1.8,
                    easing: cinematicEase 
                });
            }
        }

        // 13. IP Geolocation for Offer Fold
        window.addEventListener('DOMContentLoaded', () => {
            const geoBadge = document.getElementById('geo-badge');
            const geoText = document.getElementById('geo-badge-text');

            if (geoBadge && geoText) {
                // Fetch location silently (IP-based Geolocation)
                fetch('https://ipapi.co/json/')
                    .then(response => response.json())
                    .then(data => {
                        if (data && data.city) {
                            geoText.textContent = `Oferta disponível para ${data.city}`;
                        } else {
                            geoText.textContent = "Oferta liberada hoje";
                        }
                    })
                    .catch(() => {
                        // Fallback on error, AdBlock, or strict firewall constraints
                        geoText.textContent = "Oferta liberada hoje";
                    });

                // Attach to a standalone ScrollTrigger to reveal precisely when Offer title appears
                gsap.to(geoBadge, {
                    scrollTrigger: {
                        trigger: "#fifth-fold",
                        start: "top 70%",
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out"
                });
            }
        });

        // 13.5 Unified Smooth Scroll for Footer Anchors
        function smoothScrollTo(targetSelector) {
            const section = document.querySelector(targetSelector);
            if (section) {
                // Prolonged sweep to provide maximum visual absorption of the entire stack.
                lenis.scrollTo(section, {
                    offset: targetSelector === '#fifth-fold' ? -50 : 0,
                    duration: 3,
                    easing: cinematicEase
                });
                
                // If it's the offer target, piggy-back the highlight animation
                if (targetSelector === '#fifth-fold') {
                    setTimeout(() => {
                        const mainCard = document.querySelector('.anim-5-card-main');
                        if (mainCard) {
                            gsap.to(mainCard, { 
                                scale: window.innerWidth >= 768 ? 1.08 : 1.03, 
                                boxShadow: "0 0 80px rgba(123, 63, 199, 0.5)",
                                borderColor: "rgba(123, 63, 199, 1)",
                                duration: 0.4, 
                                yoyo: true, 
                                repeat: 3, 
                                ease: "power2.inOut",
                                clearProps: "all"
                            });
                        }
                    }, 3100); 
                }
            }
        }

        // 14. Ninth Fold GSAP Animation (Footer)
        window.addEventListener('DOMContentLoaded', () => {
            const tl9 = gsap.timeline({
                scrollTrigger: {
                    trigger: "#site-footer",
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });

            tl9.to('.anim-9-item', { y: 0, opacity: 1, duration: 1, ease: "power2.out", stagger: 0.15 });
        });

        // == REAL-TIME ACTIVITY INDICATORS ==
        (function() {
            // 1. Live Activity Badge 
            const liveBadge = document.getElementById('live-activity-badge');
            const liveBadgeText = document.getElementById('live-activity-text');
            const messagesWithNum = [
                "🔥 {X} pessoas olhando essa oferta agora",
                "👀 {X} pessoas acessaram essa página recentemente",
                "⚡ {X} pessoas escolhendo um kit agora"
            ];
            const messagesNoNum = [
                "📦 Vários pedidos realizados hoje",
                "🟣 Alta procura nas últimas horas",
                "🚀 Oferta com muita saída hoje",
                "✅ Esse kit está entre os mais escolhidos hoje"
            ];
            
            let lastMessageIndex = -1;
            let wasNumList = false;
            let currentX = Math.floor(Math.random() * (97 - 38 + 1)) + 38;

            function runBadgeCycle() {
                if(!liveBadge || !liveBadgeText) return;
                
                const hideDuration = Math.random() * (18000 - 8000) + 8000;
                
                setTimeout(() => {
                    const useNum = !wasNumList; // alternate when possible
                    let newMsg = "";
                    
                    if (useNum) {
                        let shift = Math.floor(Math.random() * 11) - 5; 
                        currentX += shift;
                        if(currentX < 38) currentX = 38;
                        if(currentX > 97) currentX = 97;

                        let idx;
                        do { idx = Math.floor(Math.random() * messagesWithNum.length); } 
                        while (wasNumList && idx === lastMessageIndex);
                        
                        lastMessageIndex = idx;
                        wasNumList = true;
                        newMsg = messagesWithNum[idx].replace("{X}", currentX);
                    } else {
                        let idx;
                        do { idx = Math.floor(Math.random() * messagesNoNum.length); } 
                        while (!wasNumList && idx === lastMessageIndex);
                        
                        lastMessageIndex = idx;
                        wasNumList = false;
                        newMsg = messagesNoNum[idx];
                    }
                    
                    liveBadgeText.textContent = newMsg;
                    
                    const badgeIcon = liveBadge.querySelector('span.flex');
                    if (badgeIcon) {
                        badgeIcon.style.display = (Math.random() < 0.3) ? 'none' : 'flex';
                    }

                    let translateYValue = 0;
                    if (Math.random() < 0.2) {
                        translateYValue = Math.random() > 0.5 ? -4 : 4;
                    }
                    
                    liveBadge.style.transition = "opacity 0.8s ease, transform 0.8s ease";
                    liveBadge.style.opacity = "1";
                    liveBadge.style.transform = `translateY(${translateYValue}px)`;
                    
                    const showDuration = Math.random() * (7000 - 4000) + 4000;
                    
                    setTimeout(() => {
                        liveBadge.style.opacity = "0";
                        liveBadge.style.transform = "translateY(12px)";
                        
                        runBadgeCycle();
                    }, showDuration);
                    
                }, hideDuration);
            }

            if(liveBadge && liveBadgeText) {
                liveBadgeText.textContent = ""; 
                liveBadge.style.transition = "opacity 0.8s ease, transform 0.8s ease";
                liveBadge.style.opacity = "0";
                liveBadge.style.transform = "translateY(12px)";
                runBadgeCycle();
            }

            // 2. Recent Activity Popup
            const toast = document.getElementById('recent-activity-toast');
            const toastNameCity = document.getElementById('toast-name-city');
            const toastAction = document.getElementById('toast-action');
            
            const names = ["Juliana", "Camila", "Rafael", "Lucas", "Bruna", "Patrícia", "Diego", "Fernanda", "Gustavo", "Amanda", "Renata", "Felipe"];
            const cities = ["São Paulo", "Campinas", "Curitiba", "Belo Horizonte", "Goiânia", "Recife", "Salvador", "Porto Alegre", "Brasília", "Guarulhos"];
            const actions = [
                "acabou de garantir o kit de 3 caixas",
                "escolheu a oferta mais vendida",
                "aproveitou o frete grátis"
            ];
            
            function showToast() {
                if(!toast || !toastNameCity || !toastAction) return;
                
                const name = names[Math.floor(Math.random() * names.length)];
                const city = cities[Math.floor(Math.random() * cities.length)];
                const action = actions[Math.floor(Math.random() * actions.length)];
                
                toastNameCity.textContent = `${name} de ${city}`;
                toastAction.textContent = action;
                
                toast.classList.remove("translate-y-12", "opacity-0");
                toast.classList.add("translate-y-0", "opacity-100");
                
                setTimeout(() => {
                    toast.classList.remove("translate-y-0", "opacity-100");
                    toast.classList.add("translate-y-12", "opacity-0");
                }, 6000);
            }
            
            function loopToast() {
                setTimeout(() => {
                    showToast();
                    loopToast();
                }, Math.random() * (35000 - 18000) + 18000);
            }

            setTimeout(() => {
                showToast();
                loopToast();
            }, 10000);
        })();
document.addEventListener('DOMContentLoaded', function() {
    var timerEl = document.getElementById('countdown-timer-kit3');
    if(timerEl) {
        var time = 15 * 60;
        setInterval(function() {
            var m = Math.floor(time / 60);
            var s = time % 60;
            timerEl.textContent = "00:" + (m < 10 ? '0'+m : m) + ":" + (s < 10 ? '0'+s : s);
            if(time > 0) time--;
        }, 1000);
    }
});
(function () {
  var BUTTONS = [
    { selector: 'a[href*="5PDXSVTPR2"]', itemId: 'kit-1', itemName: 'SmileShift V34', itemVariant: '1 caixa', value: 79.90, currency: 'BRL' },
    { selector: 'a[href*="B1YG7DCUYY"]', itemId: 'kit-3', itemName: 'SmileShift V34', itemVariant: '3 caixas', value: 109.90, currency: 'BRL' },
    { selector: 'a[href*="BY4OD9QM9A"]', itemId: 'kit-5', itemName: 'SmileShift V34', itemVariant: '5 caixas', value: 149.90, currency: 'BRL' }
  ];

  function generateEventId() {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 9)).toUpperCase();
  }

  function attachTracking(btn, config) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var href = btn.getAttribute('href');
      var eid  = generateEventId();

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ ecommerce: null }); // clear previous ecommerce object
      window.dataLayer.push({
        event: 'begin_checkout',
        event_id: eid,
        ecommerce: {
          currency: config.currency,
          value: config.value,
          items: [
            {
              item_id: config.itemId,
              item_name: config.itemName,
              item_variant: config.itemVariant,
              price: config.value,
              quantity: 1
            }
          ]
        }
      });

      // Allow GTM to process, then navigate
      setTimeout(function () { window.location.href = href; }, 300);
    });
  }

  function init() {
    BUTTONS.forEach(function (cfg) {
      document.querySelectorAll(cfg.selector).forEach(function (el) {
        attachTracking(el, cfg);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
