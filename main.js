document.addEventListener('DOMContentLoaded', function() {
    console.log("System Initialized!");

    const videoGate = document.getElementById('video-gate-container');
    const gateVideo = document.getElementById('gate-video');
    const mainContent = document.getElementById('main-content');
    const secondVideo = document.getElementById('second-video');
    const bgMusic = document.getElementById('bg-music');

    let isStarted = false;

    // دالة تشغيل الصوت والفيديو
    function startGateVideo(e) {
        if (isStarted) return;
        isStarted = true;

        // 1. تشغيل الصوت فوراً (مع التعامل مع حماية الآيفون والأندرويد)
        if (bgMusic) {
            bgMusic.muted = false;
            bgMusic.play().then(() => {
                console.log("Audio started successfully on Mobile/PC!");
            }).catch(err => {
                console.log("Audio playback prevented:", err);
            });
        }

        // 2. تشغيل فيديو البوابة
        if (gateVideo) {
            gateVideo.play().catch(err => {
                console.log("Gate video error:", err);
                revealMainContent();
            });
        } else {
            revealMainContent();
        }
    }

    // ربط الضغطة/اللمسة على الموبايل والبوابة
    if (videoGate) {
        videoGate.addEventListener('touchstart', startGateVideo, { passive: true });
        videoGate.addEventListener('click', startGateVideo);
    }

    document.addEventListener('touchstart', startGateVideo, { once: true, passive: true });
    document.addEventListener('click', startGateVideo, { once: true });

    // لما فيديو البوابة يخلص -> افتح باقي الدعوة
    if (gateVideo) {
        gateVideo.addEventListener('ended', revealMainContent);
    }

    function revealMainContent() {
        if (videoGate) {
            videoGate.style.display = 'none';
        }

        if (mainContent) {
            mainContent.classList.remove('hidden');
        }

        document.body.style.overflow = 'auto';

        if (secondVideo) {
            secondVideo.play().catch(err => console.log('Second video error:', err));
        }

        startTypewriter();
    }

    // TYPEWRITER LOGIC
    function startTypewriter() {
        const elements = document.querySelectorAll('.typewriter-text');
        
        elements.forEach((element, index) => {
            const textToType = element.getAttribute('data-text');
            if (!textToType) return;
            
            element.textContent = '';
            
            setTimeout(() => {
                typeCharacter(element, textToType, 0);
            }, index * 700);
        });
    }

    function typeCharacter(element, text, i) {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            setTimeout(() => typeCharacter(element, text, i + 1), 50);
        } else {
            element.classList.add('finished');
        }
    }
});

// COUNTDOWN TIMER LOGIC
const targetDate = new Date('May 23, 2027 00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        daysEl.textContent = days < 10 ? '0' + days : days;
        hoursEl.textContent = hours < 10 ? '0' + hours : hours;
        minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
        secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
    } else {
        const container = document.querySelector('.countdown-container');
        if (container) container.innerHTML = "<h3>The Big Day Has Arrived!</h3>";
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();