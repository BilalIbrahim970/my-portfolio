// ============================================
// COUNTER ANIMATION - Stats Numbers
// ============================================

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let current = 0;
        const increment = Math.ceil(target / 50);
        let isAnimated = false;
        
        const updateCounter = () => {
            if (!isAnimated) return;
            current += increment;
            if (current >= target) {
                counter.textContent = target + '+';
                return;
            }
            counter.textContent = current + '+';
            requestAnimationFrame(updateCounter);
        };
        
        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isAnimated) {
                    isAnimated = true;
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(counter);
    });
}

// Run counters when page loads
document.addEventListener('DOMContentLoaded', function() {
    animateCounters();
});
// ============================================
// PORTFOLIO - Complete JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('🚀 Portfolio is loading...');
    
    // === 1. NAVBAR ELEMENTS ===
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navbarLinks');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    // === 2. HAMBURGER MENU ===
    hamburger.addEventListener('click', function() {
        const isOpen = this.classList.toggle('active');
        navLinks.classList.toggle('active');
        this.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    
    // Close menu on link click
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
    
    // === 3. ACTIVE NAV LINK ===
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    window.addEventListener('load', updateActiveLink);
    
    // === 4. NAVBAR SCROLL EFFECT ===
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    window.addEventListener('load', handleNavbarScroll);
    
    // === 5. THEME TOGGLE ===
    let isDarkMode = true;
    
    themeToggle.addEventListener('click', function() {
        isDarkMode = !isDarkMode;
        
        if (isDarkMode) {
            document.documentElement.style.setProperty('--bg-primary', '#0a0a0f');
            document.documentElement.style.setProperty('--bg-secondary', '#12121a');
            document.documentElement.style.setProperty('--text-primary', '#ffffff');
            document.documentElement.style.setProperty('--text-secondary', '#a0a0b8');
            document.documentElement.style.setProperty('--text-muted', '#6b6b85');
            document.documentElement.style.setProperty('--bg-card', 'rgba(255, 255, 255, 0.05)');
            document.documentElement.style.setProperty('--border-color', 'rgba(255, 255, 255, 0.08)');
            document.documentElement.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.4)');
            themeIcon.className = 'fas fa-moon';
            navbar.style.background = 'rgba(10, 10, 15, 0.7)';
        } else {
            document.documentElement.style.setProperty('--bg-primary', '#f8f9fa');
            document.documentElement.style.setProperty('--bg-secondary', '#ffffff');
            document.documentElement.style.setProperty('--text-primary', '#1a1a2e');
            document.documentElement.style.setProperty('--text-secondary', '#4a4a6a');
            document.documentElement.style.setProperty('--text-muted', '#6b6b85');
            document.documentElement.style.setProperty('--bg-card', 'rgba(0, 0, 0, 0.03)');
            document.documentElement.style.setProperty('--border-color', 'rgba(0, 0, 0, 0.08)');
            document.documentElement.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.1)');
            themeIcon.className = 'fas fa-sun';
            navbar.style.background = 'rgba(248, 249, 250, 0.85)';
        }
    });
    
    // === 6. CONTACT FORM ===
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                alert('Thank you for your message, ' + name + '! I will get back to you soon.');
                this.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
    
    // === 7. SMOOTH SCROLL ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    console.log('✅ Portfolio is fully functional!');
});