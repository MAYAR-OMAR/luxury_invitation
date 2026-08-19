document.addEventListener('DOMContentLoaded', function() {

    console.log("System Initialized!");



    const videoGate = document.getElementById('video-gate-container');

    const gateVideo = document.getElementById('gate-video');

    const mainContent = document.getElementById('main-content');

    const secondVideo = document.getElementById('second-video');

    const bgMusic = document.getElementById('bg-music');



    let isStarted = false;



    if (!videoGate || !gateVideo || !mainContent) {

        console.error("Critical elements missing from HTML!");

        return;

    }



    // 1. Click Entrance -> Start Music & Entrance Video

    videoGate.addEventListener('click', function() {

        if (isStarted) return;

        isStarted = true;



        if (bgMusic) {

            bgMusic.play().catch(err => console.log('Audio error:', err));

        }



        gateVideo.play().catch(err => console.log('Video error:', err));

    });



    // 2. Entrance Video Ends -> Reveal First Page & Start Typewriter

    gateVideo.addEventListener('ended', function() {

        videoGate.style.display = 'none';

        videoGate.classList.add('hidden');



        mainContent.classList.remove('hidden');

        document.body.style.overflow = 'auto';



        if (secondVideo) {

            secondVideo.play().catch(err => console.log('Second video error:', err));

        }



        // Trigger Typewriter effect line by line

        startTypewriter();

    });



    // TYPEWRITER LOGIC

    function startTypewriter() {

        const elements = document.querySelectorAll('.typewriter-text');

       

        elements.forEach((element, index) => {

            const textToType = element.getAttribute('data-text');

            element.textContent = ''; // Ensure clean slate

           

            // Stagger typing sequence per element

            setTimeout(() => {

                typeCharacter(element, textToType, 0);

            }, index * 700);

        });

    }



    function typeCharacter(element, text, i) {

        if (i < text.length) {

            element.textContent += text.charAt(i);

            setTimeout(() => typeCharacter(element, text, i + 1), 50); // Speed: 50ms per letter

        } else {

            element.classList.add('finished');

        }

    }

});



// Target Date: May 23, 2027 00:00:00

const targetDate = new Date('May 23, 2027 00:00:00').getTime();



function updateCountdown() {

    const now = new Date().getTime();

    const difference = targetDate - now;



    if (difference > 0) {

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));

        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        const seconds = Math.floor((difference % (1000 * 60)) / 1000);



        document.getElementById('days').textContent = days < 10 ? '0' + days : days;

        document.getElementById('hours').textContent = hours < 10 ? '0' + hours : hours;

        document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;

        document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : seconds;

    } else {

        document.querySelector('.countdown-container').innerHTML = "<h3>The Big Day Has Arrived!</h3>";

    }

}



// Update timer every second

setInterval(updateCountdown, 1000);

updateCountdown(); // Run immediately on load 
window.addEventListener('DOMContentLoaded', () => {
  // كود إخفاء شاشة التحميل هنا
  document.getElementById('preloader').style.display = 'none';
});

window.addEventListener('load', () => {
  const loader = document.querySelector('.loader-or-overlay');
  if (loader) {
    loader.style.display = 'none';
  }
});