/**
 * SmileShift Scroll triggered animations and Swiper configurations
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Entrance Animations (Text element styling reveals)
    document.querySelectorAll('.reveal-up').forEach(el => {
        el.classList.add('reveal-active');
    });

    // 2. Initialize SwiperJS for Third Fold Visual Proof
    const swiper = new Swiper('.swiper-stacked-cards', {
        effect: 'cards',
        grabCursor: true,
        cardsEffect: {
            slideShadows: false,
            perSlideOffset: 12,
            perSlideRotate: 2,
        },
        resistanceRatio: 0.6,
        speed: 600,
    });

    // 3. Cinematic Entrance for Third Fold (Testimonials grid)
    const tl3 = gsap.timeline({
        scrollTrigger: {
            trigger: "#third-fold",
            start: "top 65%",
            toggleActions: "play none none reverse"
        }
    });
    tl3.to('.anim-3-carousel', { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" })
        .to('.anim-3-tag', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.8")
        .to('.anim-3-title', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.6")
        .to('.anim-3-sub', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.8")
        .to('.anim-3-benefit', { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.15 }, "-=0.5");

    // 4. Cinematic Entrance for Fourth Fold (How it works)
    const tl4 = gsap.timeline({
        scrollTrigger: {
            trigger: "#fourth-fold",
            start: "top 65%",
            toggleActions: "play none none reverse"
        }
    });
    tl4.to('.anim-4-image', { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" })
        .to('.anim-4-tag', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.8")
        .to('.anim-4-title', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.6")
        .to('.anim-4-sub', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.7")
        .to('.anim-4-block', { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.15 }, "-=0.5")
        .to('.anim-4-final', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.3");

    // 5. Testimonials Stack Loop
    const tCards = document.querySelectorAll('.t-stack-card');
    if (tCards.length > 0) {
        let currentStatus = [1, 2, 3, 4, 5, 6];
        setInterval(() => {
            currentStatus.unshift(currentStatus.pop());
            tCards.forEach((c, i) => {
                c.className = c.className.replace(/\bs-\d\b/g, '').trim();
                c.classList.add(`s-${currentStatus[i]}`);
            });
        }, 4000);
    }

    // 6. Sixth Fold GSAP Animation
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

    // 7. Seventh Fold GSAP Animation (The Closer)
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
        .to('.anim-7-content', { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, "-=0.5");

    // 8. Eighth Fold GSAP Animation (Guarantee)
    const tl8 = gsap.timeline({
        scrollTrigger: {
            trigger: "#eighth-fold",
            start: "top 70%",
            toggleActions: "play none none reverse"
        }
    });
    tl8.to('.anim-8-badge', { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.5)" })
        .to('.anim-8-title', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.6")
        .to('.anim-8-sub', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.7")
        .to('.anim-8-feature', { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.15 }, "-=0.5");

    // 9. Ninth Fold GSAP Animation (Footer)
    const tl9 = gsap.timeline({
        scrollTrigger: {
            trigger: "#site-footer",
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });
    tl9.to('.anim-9-item', { y: 0, opacity: 1, duration: 1, ease: "power2.out", stagger: 0.15 });

    // == REAL-TIME ACTIVITY INDICATORS ==
    (function() {
        // Live Activity Indicator
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
                const useNum = !wasNumList;
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
                
                const showDuration = Math.random() * (7000 - 4000) + 4000;
                
                setTimeout(() => {
                    runBadgeCycle();
                }, showDuration);
                
            }, hideDuration);
        }

        if(liveBadge && liveBadgeText) {
            liveBadgeText.textContent = "🔥 87 pessoas olhando essa oferta agora"; // initial value
            runBadgeCycle();
        }

        // Recent Activity Popup Toast
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
});
