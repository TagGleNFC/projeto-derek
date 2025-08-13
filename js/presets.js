document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.preset-slide');
    const prevBtn = document.getElementById('preset-prev');
    const nextBtn = document.getElementById('preset-next');
    let currentSlide = 0;

    function showSlide(index) {
        // Oculta todos os slides e pausa seus players
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            
            // Pausa o vídeo de slides que não estão ativos
            const video = slide.querySelector('video');
            if (video) {
                video.pause();
            }

            // ADICIONADO: Pausa o áudio de slides que não estão ativos
            const audio = slide.querySelector('audio');
            if (audio) {
                audio.pause();
            }
        });
        
        // Mostra o slide desejado
        slides[index].classList.add('active');
        
        // Tenta dar play no vídeo do slide ativo (se estiver visível)
        const activeVideo = slides[index].querySelector('video');
        if (activeVideo) {
            // A lógica do Intersection Observer cuidará de dar o play
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // Função para dar play no vídeo, tratando possíveis erros
    function playVideo(video) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // Autoplay foi impedido, não fazemos nada.
                // O vídeo ficará com o poster aguardando interação.
                console.log("Autoplay do vídeo foi impedido pelo navegador.");
            });
        }
    }

    // Event Listeners para os botões de navegação do carrossel
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
    }

    // --- LÓGICA DE AUTOPLAY COM INTERSECTION OBSERVER ---

    // Opções para o observer: o vídeo aciona quando 50% dele estiver visível
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 
    };

    // Função que será chamada quando um vídeo entrar ou sair da tela
    function handleIntersection(entries, observer) {
      entries.forEach(entry => {
        const video = entry.target;
        const slideContainer = video.closest('.preset-slide');

        // Verifica se o vídeo está visível E se o slide dele está ativo
        if (entry.isIntersecting && slideContainer.classList.contains('active')) {
          playVideo(video);
        } else {
          video.pause();
        }
      });
    }

    // Cria o observer
    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Pede para o observer "observar" cada vídeo na seção de presets
    const videos = document.querySelectorAll('.preset-content video');
    videos.forEach(video => {
      observer.observe(video);
    });

    // Inicia o carrossel mostrando o primeiro slide
    if (slides.length > 0) {
        showSlide(currentSlide);
    }
});