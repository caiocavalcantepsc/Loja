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

document.addEventListener('DOMContentLoaded', function() {
    // Sistema do Lightbox (simplificado - todas as galerias visíveis)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    
    let currentIndex = 0;
    let allGalleryImages = [];
    
    // Coletar TODAS as imagens de TODAS as galerias
    function collectAllImages() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        allGalleryImages = Array.from(galleryItems).map(item => item.querySelector('img').src);
    }
    
    // Inicializar coleta de imagens
    collectAllImages();
    
    // Abrir lightbox ao clicar em uma imagem
    document.addEventListener('click', function(e) {
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem) {
            // Encontrar o índice da imagem clicada entre todas as imagens
            const clickedImg = galleryItem.querySelector('img');
            currentIndex = allGalleryImages.indexOf(clickedImg.src);
            
            if (currentIndex !== -1) {
                updateLightbox();
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
    });
    
    // Fechar lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Navegação no lightbox
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        if (allGalleryImages.length > 0) {
            currentIndex = (currentIndex - 1 + allGalleryImages.length) % allGalleryImages.length;
            updateLightbox();
        }
    });
    
    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        if (allGalleryImages.length > 0) {
            currentIndex = (currentIndex + 1) % allGalleryImages.length;
            updateLightbox();
        }
    });
    
    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + allGalleryImages.length) % allGalleryImages.length;
            updateLightbox();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % allGalleryImages.length;
            updateLightbox();
        }
    });
    
    function updateLightbox() {
        if (allGalleryImages.length > 0 && currentIndex >= 0) {
            lightboxImg.src = allGalleryImages[currentIndex];
        }
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Scroll suave para a primeira galeria
    document.querySelector('.scroll-indicator').addEventListener('click', () => {
        const firstGallery = document.querySelector('.gallery-section');
        if (firstGallery) {
            window.scrollTo({
                top: firstGallery.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
    
    // Efeito de carregamento suave das imagens
    const imagesToLoad = document.querySelectorAll('.gallery-item img');
    imagesToLoad.forEach(img => {
        img.style.opacity = '0';
        img.addEventListener('load', function() {
            this.style.transition = 'opacity 0.5s ease';
            this.style.opacity = '1';
        });
        
        // Fallback para imagens que já podem estar carregadas
        if (img.complete) {
            img.style.transition = 'opacity 0.5s ease';
            img.style.opacity = '1';
        }
    });
    
    // Função para pré-carregar imagens
    function preloadImages() {
        allGalleryImages.forEach(src => {
            const tempImg = new Image();
            tempImg.src = src;
        });
    }
    
    // Pré-carregar imagens após um delay
    setTimeout(preloadImages, 1000);
    
    // Observar mudanças no DOM (caso imagens sejam adicionadas dinamicamente)
    const observer = new MutationObserver(function(mutations) {
        let shouldUpdate = false;
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                shouldUpdate = true;
            }
        });
        if (shouldUpdate) {
            collectAllImages();
        }
    });
    
    // Observar todas as galerias
    const gallerySections = document.querySelectorAll('.gallery-section');
    gallerySections.forEach(section => {
        observer.observe(section, { childList: true, subtree: true });
    });
});