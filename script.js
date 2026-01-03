AOS.init({
    duration: 800,
    once: true,
    offset: 50,
    disable: window.innerWidth < 768
});
const starfield = document.getElementById('starfield');
const starCount = window.innerWidth < 768 ? 50 : 100;
for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2 + 1;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    starfield.appendChild(star);
}
let shootingStarInterval;
let isTabActive = true;
function createShootingStar() {
    if (!isTabActive) return;
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    shootingStar.style.left = Math.random() * 100 + '%';
    shootingStar.style.top = Math.random() * 50 + '%';
    starfield.appendChild(shootingStar);

    setTimeout(() => shootingStar.remove(), 2000);
}
shootingStarInterval = setInterval(createShootingStar, 3000);
document.addEventListener('visibilitychange', () => {
    isTabActive = !document.hidden;
    if (!isTabActive) {
        clearInterval(shootingStarInterval);
    } else {
        shootingStarInterval = setInterval(createShootingStar, 3000);
    }
});
const navbar = document.getElementById('navbar');
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            scrollTimeout = null;
        }, 100);
    }
}, { passive: true });
const welcomeContent = document.querySelector('.welcome-content');
let ticking = false;
let lastScrollY = 0;
function updateWelcomeEffect() {
    const scrolled = window.scrollY;
    if (Math.abs(scrolled - lastScrollY) < 5) {
        ticking = false;
        return;
    }
    lastScrollY = scrolled;
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
}, { passive: true });
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
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: '100px'
});
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});
document.querySelectorAll('.project-image, .gallery-image').forEach(img => {
    imageObserver.observe(img);
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
window.addEventListener('load', () => {
    const splineViewer = document.querySelector('spline-viewer');
    if (splineViewer && window.innerWidth > 768) {
        setTimeout(() => {
            splineViewer.style.opacity = '1';
        }, 500);
    } else if (splineViewer) {
        splineViewer.remove();
    }
});