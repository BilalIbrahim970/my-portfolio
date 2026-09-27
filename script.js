/* ============================================ */
/* PORTFOLIO - Muhammad Bilal Ibrahim           */
/* Complete JavaScript File                     */
/* ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Portfolio loaded successfully');

    /* ========================================== */
    /* 1. TYPING EFFECT (Hero Subtitle)           */
    /* ========================================== */
    const typedEl = document.getElementById('typed-text');
    const roles = [
        'Full Stack Developer',
        'Web Designer',
        'Video Editor',
        'Logo Designer',
        'SEO Specialist'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        if (!typedEl) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typedEl.textContent = currentRole.substring(0, charIndex--);
        } else {
            typedEl.textContent = currentRole.substring(0, charIndex++);
        }

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentRole.length + 1) {
            speed = 1800;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 400;
        }

        setTimeout(typeEffect, speed);
    }
    typeEffect();

    /* ========================================== */
    /* 2. HAMBURGER MENU                          */
    /* ========================================== */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navbarLinks');
    const navLinkItems = document.querySelectorAll('.nav-link');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isOpen = hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ========================================== */
    /* 3. NAVBAR SCROLL + ACTIVE LINK             */
    /* ========================================== */
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    const sections = document.querySelectorAll('section[id]');

    function onScroll() {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }

        const scrollPos = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinkItems.forEach(link => {
                    link.classList.toggle(
                        'active',
                        link.getAttribute('href') === `#${id}`
                    );
                });
            }
        });

        if (backToTop) {
            backToTop.classList.toggle('show', window.scrollY > 400);
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ========================================== */
    /* 4. SMOOTH SCROLL                           */
    /* ========================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#' || targetId.length < 2) return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = target.offsetTop - 75;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        });
    });

    /* ========================================== */
    /* 5. COUNTER ANIMATION (Stats)               */
    /* ========================================== */
    const counters = document.querySelectorAll('.stat-number');

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-count'), 10);
        const duration = 1500;
        const startTime = performance.now();

        function update(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target) + '+';

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target + '+';
            }
        }
        requestAnimationFrame(update);
    }

    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    /* ========================================== */
    /* 6. REVEAL ON SCROLL                        */
    /* ========================================== */
    const revealTargets = document.querySelectorAll(
        '.section-header, .about-content, .about-stats, .service-card, ' +
        '.skill-category, .project-card, .timeline-item, ' +
        '.contact-item, .contact-form-wrapper'
    );

    revealTargets.forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${(i % 6) * 60}ms`;
    });

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealTargets.forEach(el => revealObserver.observe(el));

    /* ========================================== */
    /* 7. CONTACT FORM → WHATSAPP                 */
    /* ========================================== */
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const messageField = document.getElementById('message');

            const name = nameField.value.trim();
            const email = emailField.value.trim();
            const message = messageField.value.trim();

            if (!name || !email || !message) {
                showToast('Please fill in all fields.', 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('Please enter a valid email address.', 'error');
                return;
            }

            const waNumber = '923211430121';
            const waMessage =
                `*📩 New Message from Portfolio*%0A%0A` +
                `*👤 Name:* ${encodeURIComponent(name)}%0A` +
                `*📧 Email:* ${encodeURIComponent(email)}%0A%0A` +
                `*💬 Message:*%0A${encodeURIComponent(message)}`;

            const waURL = `https://wa.me/${waNumber}?text=${waMessage}`;

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening WhatsApp...';
            submitBtn.disabled = true;

            showToast('Opening WhatsApp...', 'success');

            setTimeout(() => {
                window.open(waURL, '_blank');

                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 2000);
            }, 400);
        });
    }

    /* ========================================== */
    /* 8. TOAST NOTIFICATION                      */
    /* ========================================== */
    function showToast(message, type = 'success') {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(toast);

        requestAnimationFrame(() => toast.classList.add('show'));

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }

    /* ========================================== */
    /* 9. BACK TO TOP BUTTON                      */
    /* ========================================== */
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ========================================== */
    /* 10. FOOTER YEAR AUTO UPDATE                */
    /* ========================================== */
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

});