// ===== TYPING EFFECT =====
const typingText = document.querySelector('.typing-text');
const roles = [
    'Web Developer',
    'Freelancer',
    'UI/UX Designer',
    'Problem Solver'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500);
        return;
    }

    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
}

typeEffect();

// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    formStatus.textContent = '✅ Message sent! I\'ll get back to you soon.';
    formStatus.style.color = '#6c63ff';
    this.reset();

    setTimeout(() => {
        formStatus.textContent = '';
    }, 5000);
});

// ===== SKILL ANIMATION ON SCROLL =====
const skillBars = document.querySelectorAll('.skill-bar div');

function animateSkills() {
    skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (barPosition < screenHeight - 50) {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 200);
        }
    });
}

// Run on load and scroll
window.addEventListener('load', animateSkills);
window.addEventListener('scroll', animateSkills);

// ===== SMOOTH SCROLL FOR NAV =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.style.color = '#eee';
        if (item.getAttribute('href') === `#${current}`) {
            item.style.color = '#6c63ff';
        }
    });
});