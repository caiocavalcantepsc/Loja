// Menu mobile
menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        menuToggle.querySelector('i').classList.remove('fa-times');
        menuToggle.querySelector('i').classList.add('fa-bars');
    });
});

// Smooth scroll para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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