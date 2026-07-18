/**
 * SmileShift Offer Section Kit Selection and Dynamic Checkout Events
 */

// Kit Selection State Machine (Apple Store style)
window.kitData = {
    1: {
        title: "1 Caixa (Uso Inicial)",
        savings: "Frete Grátis para todo o Brasil",
        unitPrice: "R$ 69,90 por caixa",
        totalPrice: "R$ 69,90",
        checkoutUrl: "https://seguro.smileshift.co/r/5PDXSVTPR2"
    },
    3: {
        title: "3 Caixas (Kit Recomendado)",
        savings: "Economize R$ 116,80 (56% OFF)",
        unitPrice: "R$ 30,96 por caixa",
        totalPrice: "R$ 92,90",
        checkoutUrl: "https://seguro.smileshift.co/r/B1YG7DCUYY"
    },
    5: {
        title: "5 Caixas (Tratamento Premium)",
        savings: "Economize R$ 216,60 (62% OFF)",
        unitPrice: "R$ 26,58 por caixa",
        totalPrice: "R$ 132,90",
        checkoutUrl: "https://seguro.smileshift.co/r/BY4OD9QM9A"
    }
};

window.currentSelectedKit = 3;

window.changeSelectedKit = function(kitNumber) {
    if (kitNumber === window.currentSelectedKit) return;
    
    const summaryContainer = document.getElementById('kit-summary-container');
    const ctaButton = document.getElementById('cta-checkout-button');
    
    gsap.to(summaryContainer, {
        opacity: 0,
        y: -10,
        duration: 0.15,
        onComplete: () => {
            // Update active state class on cards
            document.querySelectorAll('.kit-selection-card').forEach(card => {
                card.classList.remove('border-smile-purple-main/60', 'shadow-md', 'shadow-smile-purple-main/5', 'bg-white');
                card.classList.add('border-stone-200', 'bg-white/40', 'shadow-sm');
                
                // Reset bullets
                const bullet = card.querySelector('.select-bullet');
                if (bullet) {
                    bullet.className = "select-bullet w-4 h-4 rounded-full border border-stone-300 flex items-center justify-center group-hover:border-smile-purple-main transition-colors";
                    bullet.innerHTML = "";
                }
            });
            
            const activeCard = document.getElementById(`kit-card-${kitNumber}`);
            if (activeCard) {
                activeCard.classList.remove('border-stone-200', 'bg-white/40', 'shadow-sm');
                activeCard.classList.add('border-smile-purple-main/60', 'shadow-md', 'shadow-smile-purple-main/5', 'bg-white');
                
                const bullet = activeCard.querySelector('.select-bullet');
                if (bullet) {
                    bullet.className = "select-bullet w-4 h-4 rounded-full border-2 border-smile-purple-main flex items-center justify-center bg-smile-purple-main shadow-[0_0_8px_rgba(90,44,140,0.4)]";
                    bullet.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-white"></span>';
                }
            }
            
            // Update Text Content
            const data = window.kitData[kitNumber];
            document.getElementById('active-kit-title').textContent = data.title;
            document.getElementById('active-kit-savings').textContent = data.savings;
            document.getElementById('active-kit-unit-price').textContent = data.unitPrice;
            document.getElementById('active-kit-total-price').textContent = data.totalPrice;
            
            // Update CTA button link
            ctaButton.setAttribute('href', data.checkoutUrl);
            
            // Animate price element in
            gsap.to(summaryContainer, {
                opacity: 1,
                y: 0,
                duration: 0.25,
                ease: "power2.out"
            });
            
            window.currentSelectedKit = kitNumber;
        }
    });
};

// GTM Begin Checkout Click Tracking
(function () {
  function getCheckoutConfig(href) {
    if (href.indexOf('5PDXSVTPR2') > -1) {
      return { itemId: 'kit-1', itemName: 'SmileShift V34', itemVariant: '1 caixa', value: 69.90, currency: 'BRL' };
    } else if (href.indexOf('B1YG7DCUYY') > -1) {
      return { itemId: 'kit-3', itemName: 'SmileShift V34', itemVariant: '3 caixas', value: 92.90, currency: 'BRL' };
    } else if (href.indexOf('BY4OD9QM9A') > -1) {
      return { itemId: 'kit-5', itemName: 'SmileShift V34', itemVariant: '5 caixas', value: 132.90, currency: 'BRL' };
    }
    return null;
  }

  function attachTracking(btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var href = btn.getAttribute('href');
      var config = getCheckoutConfig(href);
      if (!config) {
        window.location.href = href;
        return;
      }
      var eid = generateEventId();

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
    // Dynamic tracking attachment: select all checkout links dynamically
    document.querySelectorAll('a[href*="5PDXSVTPR2"], a[href*="B1YG7DCUYY"], a[href*="BY4OD9QM9A"]').forEach(function (el) {
      attachTracking(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
