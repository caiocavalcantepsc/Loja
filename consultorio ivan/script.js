// Configurações
const CURRENT_YEAR = new Date().getFullYear();
const WHATSAPP_NUMBER = '5511999999999';
const WHATSAPP_MESSAGE = 'Olá! Gostaria de agendar uma consulta.';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

// DOM Elements
const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const navMobile = document.getElementById('navMobile');
const navLinks = document.querySelectorAll('.nav-link');
const faqQuestions = document.querySelectorAll('.faq-question');
const currentYearElement = document.getElementById('currentYear');

// Funções Utilitárias
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Header Scroll Effect
window.addEventListener('scroll', debounce(() => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, 10));

// Menu Mobile Toggle
menuToggle.addEventListener('click', () => {
    navMobile.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (navMobile.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
            navMobile.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// FAQ Accordion
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isOpen = answer.classList.contains('open');
        
        // Close all other FAQ items
        faqQuestions.forEach(q => {
            const a = q.nextElementSibling;
            if (a !== answer) {
                a.classList.remove('open');
                q.classList.remove('active');
                q.querySelector('i').classList.remove('fa-chevron-up');
                q.querySelector('i').classList.add('fa-chevron-down');
            }
        });
        
        // Toggle current FAQ item
        if (!isOpen) {
            answer.classList.add('open');
            question.classList.add('active');
            question.querySelector('i').classList.remove('fa-chevron-down');
            question.querySelector('i').classList.add('fa-chevron-up');
        } else {
            answer.classList.remove('open');
            question.classList.remove('active');
            question.querySelector('i').classList.remove('fa-chevron-up');
            question.querySelector('i').classList.add('fa-chevron-down');
        }
    });
});

// Active Navigation on Scroll
function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', debounce(updateActiveNav, 10));

// Set current year in footer
if (currentYearElement) {
    currentYearElement.textContent = CURRENT_YEAR;
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// WhatsApp buttons handler
document.querySelectorAll('[href*="whatsapp"]').forEach(button => {
    button.addEventListener('click', function(e) {
        if (!this.getAttribute('target')) {
            e.preventDefault();
            window.open(WHATSAPP_URL, '_blank');
        }
    });
});

// Initialize animations on scroll
function initAnimations() {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    updateActiveNav();
    
    // Add loading class to body for initial animations
    document.body.classList.add('loaded');
});

// Handle window resize
window.addEventListener('resize', debounce(() => {
    if (window.innerWidth > 992 && navMobile.classList.contains('active')) {
        navMobile.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}, 250));