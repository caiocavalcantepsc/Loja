// Intersection Observer para animações de scroll
const myObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// script.js - JavaScript Completo para o Portfólio

document.addEventListener('DOMContentLoaded', function() {
    // ===== OBSERVADOR DE INTERSEÇÃO =====
    // Usa o observer configurado no início
    const elements = document.querySelectorAll('.hidden, .hidden-blurless');
    elements.forEach((element) => myObserver.observe(element));

    // ===== PRELOADER =====
    const preloader = document.querySelector('.preloader');
    
    if (preloader) {
        // Se já estiver carregado, remove o preloader imediatamente
        if (document.readyState === 'complete') {
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        } else {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    preloader.classList.add('fade-out');
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 500);
                }, 1000);
            });
        }
    }

    // ===== PARTICLES.JS BACKGROUND =====
    if (typeof particlesJS !== 'undefined') {
        try {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: "#00eaff" },
                    shape: { type: "circle" },
                    opacity: { value: 0.3, random: true },
                    size: { value: 3, random: true },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#00eaff",
                        opacity: 0.1,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "repulse" },
                        onclick: { enable: true, mode: "push" },
                        resize: true
                    }
                },
                retina_detect: true
            });
        } catch (error) {
            console.log('Particles.js não pôde ser inicializado:', error);
        }
    }

    // ===== MOBILE MENU TOGGLE =====
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Previne scroll quando menu está aberto
        });
    }
    
    if (navClose && navMenu) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restaura scroll
        });
    }
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active') && 
            !e.target.closest('#nav-menu') && 
            !e.target.closest('#nav-toggle')) {
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // ===== ACTIVE NAV LINK ON SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    
    function scrollActive() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href*="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink?.classList.add('active');
            } else {
                navLink?.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', scrollActive);
    
    // Chamar uma vez no carregamento para definir estado inicial
    scrollActive();

    // ===== BACK TO TOP BUTTON =====
    const backToTop = document.getElementById('back-to-top');
    
    if (backToTop) {
        function toggleBackToTop() {
            if (window.scrollY > 500) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        }
        
        window.addEventListener('scroll', toggleBackToTop);
        
        // Smooth scroll for back to top
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Chamar uma vez para estado inicial
        toggleBackToTop();
    }

    // ===== PROJECT FILTER =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (!isValid) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Get form data
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData);
            
            // Simulação de envio
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            const originalBg = submitBtn.style.background;
            
            submitBtn.innerHTML = '<i class="fas fa-check"></i><span>Mensagem Enviada!</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #00ff88, #00cc66)';
            submitBtn.disabled = true;
            
            // Reset form
            this.reset();
            
            // Revert button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = originalBg;
                submitBtn.disabled = false;
            }, 3000);
            
            // Log form data to console (for testing)
            console.log('Form submitted:', formValues);
        });
    }

    // ===== TYPING EFFECT FOR HERO =====
    const heroTitle = document.querySelector('.home-title .highlight');
    if (heroTitle) {
        const texts = ['sistemas funcionais', 'soluções práticas', 'código limpo', 'resultados reais'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;
        let typingSpeed = 100;
        
        function typeEffect() {
            const currentText = texts[textIndex];
            
            if (isPaused) {
                setTimeout(typeEffect, 1500);
                isPaused = false;
                return;
            }
            
            if (!isDeleting && charIndex <= currentText.length) {
                heroTitle.textContent = currentText.substring(0, charIndex);
                charIndex++;
                setTimeout(typeEffect, typingSpeed);
            } else if (isDeleting && charIndex >= 0) {
                heroTitle.textContent = currentText.substring(0, charIndex);
                charIndex--;
                setTimeout(typeEffect, typingSpeed / 2);
            } else {
                isDeleting = !isDeleting;
                
                if (!isDeleting) {
                    textIndex = (textIndex + 1) % texts.length;
                }
                
                isPaused = true;
                setTimeout(typeEffect, 500);
            }
        }
        
        // Start typing effect after a delay
        setTimeout(typeEffect, 1000);
    }

    // ===== SKILLS RADAR ANIMATION =====
    const skillPoints = document.querySelectorAll('.skill-point');
    skillPoints.forEach((point, index) => {
        point.style.animationDelay = `${index * 0.2}s`;
    });

    // ===== FORM INPUT ANIMATIONS =====
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        // Verificar se já tem valor (útil para recarregamentos)
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
        
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // ===== PARALLAX EFFECT =====
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-card');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.05 * (index + 1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // ===== SMOOTH SCROLL PARA LINKS INTERNOS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Ignora links vazios ou que não são para seções
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== DEBUG: Verificar se os elementos estão sendo observados =====
    console.log('Elementos observados:', elements.length);
});

// Função para detectar e corrigir erros comuns
window.addEventListener('error', function(e) {
    console.error('Erro detectado:', e.error);
    
    // Tenta recuperar funcionalidades críticas
    if (e.message.includes('particlesJS')) {
        console.log('Particles.js falhou, continuando sem efeitos de partículas');
    }
});

// Suporte para navegadores mais antigos
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
        return setTimeout(callback, 1000 / 60);
    };
}

// Polyfill para NodeList.forEach em IE
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function(callback, thisArg) {
        var i, len = this.length;
        for (i = 0; i < len; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}