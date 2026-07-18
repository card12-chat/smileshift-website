/**
 * SmileShift IP Geolocation dynamics
 */
window.addEventListener('DOMContentLoaded', () => {
    const geoBadge = document.getElementById('geo-badge');
    const geoText = document.getElementById('geo-badge-text');

    if (geoBadge && geoText) {
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
                geoText.textContent = "Oferta liberada hoje";
            });
    }
});
