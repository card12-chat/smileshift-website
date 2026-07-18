/**
 * SmileShift Countdown Timer
 */
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
