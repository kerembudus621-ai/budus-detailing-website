// ==================== MOBILE MENU ==================== 
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.style.display = 'none';
            if (hamburger) hamburger.classList.remove('active');
        });
    });
});

// ==================== SMOOTH SCROLL ==================== 
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

// ==================== FORM HANDLING ==================== 
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = {
        name: this.querySelector('input[type="text"]').value,
        email: this.querySelector('input[type="email"]').value,
        message: this.querySelector('textarea').value
    };

    // Validate
    if (!data.name || !data.email || !data.message) {
        alert('Vul alle velden in alstublieft');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Voer een geldig email adres in');
        return;
    }

    // Show success message
    alert('Bedankt voor je bericht! We nemen snel contact op.');
    this.reset();
});

// ==================== SCROLL ANIMATIONS ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and items
document.querySelectorAll('.service-card, .price-card, .feature-item, .info-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ==================== ACTIVE NAV LINK ==================== 
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== COUNTER ANIMATION ==================== 
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// ==================== DARK MODE TOGGLE (Optional) ==================== 
// Uncomment if you want to add a dark mode toggle
/*
const toggleDarkMode = () => {
    document.body.classList.toggle('light-mode');
};

// Create toggle button
const darkModeBtn = document.createElement('button');
darkModeBtn.textContent = '🌙';
darkModeBtn.style.cssText = 'position: fixed; bottom: 20px; right: 20px; padding: 10px 15px; background: #0066ff; color: white; border: none; border-radius: 50px; cursor: pointer; z-index: 999;';
darkModeBtn.addEventListener('click', toggleDarkMode);
document.body.appendChild(darkModeBtn);
*/

// ==================== LOADING ANIMATION ==================== 
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ==================== PARALLAX EFFECT (Optional) ==================== 
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.hero-background');
    parallaxElements.forEach(el => {
        const scrollPosition = window.pageYOffset;
        el.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });
});

// ==================== MOUSE FOLLOW EFFECT ON BUTTONS ==================== 
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.setProperty('--x', x + 'px');
        button.style.setProperty('--y', y + 'px');
    });
});

// ==================== PRINT FUNCTION ==================== 
const printPriceList = () => {
    window.print();
};

// ==================== MOBILE RESPONSIVENESS CHECK ==================== 
const isMobile = () => window.innerWidth <= 768;

window.addEventListener('resize', () => {
    if (!isMobile()) {
        document.querySelector('.nav-menu').style.display = 'flex';
    }
});