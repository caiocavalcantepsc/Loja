const myObserver = new IntersectionObserver((entries)=> {
    //Itersection é um valor booleano, ou seja quando vc está numa parte da tela é true e quando não está é false
    //com isso essa primeira variável fica vendo em qual parte da tela vc está
    entries.forEach((entry)=> {
        //Essa parte pega os elementos observados
        if(entry.isIntersecting){
            //se ele estiver na sua tela  classe show criada no css
            //será ativada
            entry.target.classList.add('show')
        } else {
            //no momento em que você rola e tal elemento sai da área de visão da tela
            //a classe show é removida, e a classe padrão setada lá que é a hidden 
            //passa a ser usada
            entry.target.classList.remove('show')
        }
    })
})

const elements = document.querySelectorAll('.hidden, .hidden-blurless')
//isso seleciona todos os elementos escondidos 
elements.forEach((element) => myObserver.observe(element))
//e fica vigiando eles

// Atualizar ano no footer
document.getElementById('year').textContent = new Date().getFullYear();

// Animações de scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

// Observar elementos com classe hidden
document.querySelectorAll('.hidden, .reveal-left').forEach(el => {
    observer.observe(el);
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuBtn.innerHTML = nav.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Fechar menu ao clicar em link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Smooth scroll para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Preloader (opcional)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Efeito de digitação no hero (opcional)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Iniciar após 500ms
    setTimeout(typeWriter, 500);
}

// Contador animado
const stats = document.querySelectorAll('.stat-card h3');
stats.forEach(stat => {
    const target = parseInt(stat.textContent.replace('+', ''));
    const increment = target / 100;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
        }}, 20);
});