AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

const starfield = document.getElementById('starfield');

for (let i = 0; i < 200; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.width = Math.random() * 3 + 'px';
    star.style.height = star.style.width;

    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';

    starfield.appendChild(star);
}

setInterval(() => {
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    shootingStar.style.left = Math.random() * 100 + '%';
    shootingStar.style.top = Math.random() * 50 + '%';

    starfield.appendChild(shootingStar);

    setTimeout(() => {
        shootingStar.remove();
    }, 2000);
}, 1500);

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const welcomeContent = document.querySelector('.welcome-content');
let ticking = false;
function updateWelcomeEffect() {
    const scrolled = window.scrollY;
    const maxScroll = window.innerHeight;
    const progress = Math.min(scrolled / maxScroll, 1);
    const scale = 1 + progress * 0.3;
    const blur = progress * 5;
    const opacity = 1 - progress * 1.2;

    welcomeContent.style.transform = `scale(${scale}) translateZ(0)`;
    welcomeContent.style.filter = `blur(${blur}px)`;
    welcomeContent.style.opacity = Math.max(opacity, 0);
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateWelcomeEffect);
        ticking = true;
    }
});

const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
const mobileOverlay = document.getElementById('mobileOverlay');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
});

mobileOverlay.addEventListener('click', () => {
    mobileToggle.classList.remove('active');
    navLinks.classList.remove('active');
    mobileOverlay.classList.remove('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
        mobileOverlay.classList.remove('active');
    });
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;
    const yourEmail = 'joey.diamond00@gmail.com';
    const subject = encodeURIComponent(`Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    window.location.href = `mailto:${yourEmail}?subject=${subject}&body=${body}`;

    alert('Your email client will open. Thank you for your message!');

    e.target.reset();
});