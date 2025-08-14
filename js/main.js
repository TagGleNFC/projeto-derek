// js/main.js

// --- Navigation Toggle ---
document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            const bars = navToggle.querySelectorAll(".bar");
            bars.forEach((bar, index) => {
                bar.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                if (navMenu.classList.contains("active")) {
                    if (index === 0) bar.style.transform = "rotate(45deg) translate(5px, 5px)";
                    if (index === 1) bar.style.opacity = "0";
                    if (index === 2) bar.style.transform = "rotate(-45deg) translate(7px, -6px)";
                } else {
                    bar.style.transform = "none";
                    bar.style.opacity = "1";
                }
            });
        });
    }

    loadFeaturedBeats();
    loadBeatKits();
    initializeCarousel();
    initializePresetsCarousel(); // A função será substituída abaixo

    window.addEventListener("scroll", () => {
        const navbar = document.querySelector(".navbar");
        if (navbar) {
            navbar.style.background = (window.scrollY > 100) ? "rgba(0, 0, 0, 0.95)" : "rgba(0, 0, 0, 0.9)";
        }
    });
});

// --- Funções de Criação de Cards e Compra ---
function createItemCard(item, page) {
    const priceFormatted = `R$ ${item.price.toFixed(2)}`;
    return `
      <a href="${page}?id=${item.id}" class="beat-card-link">
        <div class="beat-card" data-id="${item.id}">
            <div class="beat-image">
                <img src="${item.image}" alt="${item.title}">
                <div class="beat-overlay"></div>
                <div class="beat-genre">${item.genre || 'Kit'}</div>
            </div>
            <div class="beat-info">
                <h3 class="beat-title">${item.title}</h3>
                <div class="beat-details">
                    <span class="beat-bpm">${item.bpm ? item.bpm + ' BPM' : ''}</span>
                    <span class="beat-price">${priceFormatted}</span>
                </div>
            </div>
        </div>
      </a>
    `;
}

// --- Funções de Carregamento de Conteúdo ---
function loadFeaturedBeats() {
    const featuredBeatsGrid = document.getElementById("featured-beats-grid");
    if (featuredBeatsGrid && typeof allBeats !== 'undefined') {
        const featuredBeats = allBeats.slice(0, 4);
        featuredBeatsGrid.innerHTML = featuredBeats.map(beat => createItemCard(beat, 'pagina-beat.html')).join("");
    }
}

function loadBeatKits() {
    const beatKitsGrid = document.getElementById("beat-kits-grid");
    if (beatKitsGrid && typeof allBeatKits !== 'undefined') {
        const featuredKits = allBeatKits.slice(0, 4);
        beatKitsGrid.innerHTML = featuredKits.map(kit => createItemCard(kit, 'pagina-kit.html')).join("");
    }
}

// --- Lógicas de Carrossel ---

// NOVA FUNÇÃO PARA O CARROSSEL DE PRESETS COM WAVEFORM
function initializePresetsCarousel() {
    const carousel = document.getElementById("presets-carousel");
    if (!carousel) return;

    const slides = Array.from(carousel.querySelectorAll(".preset-slide"));
    const prevBtn = document.getElementById("preset-prev");
    const nextBtn = document.getElementById("preset-next");
    let currentIndex = 0;
    let wavesurfers = []; // Array para guardar as instâncias do WaveSurfer

    const iconPlay = '<svg viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px"><path d="M8 5v14l11-7z"></path></svg>';
    const iconPause = '<svg viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>';

    // Inicializa o WaveSurfer para cada slide
    slides.forEach((slide, index) => {
        const container = slide.querySelector('.waveform-container');
        const playBtn = slide.querySelector('.waveform-play-btn');
        const audioSrc = slide.dataset.audioSrc;

        if (container && playBtn && audioSrc) {
            const wavesurfer = WaveSurfer.create({
                container: container,
                waveColor: '#374151',
                progressColor: '#11479e',
                height: 50,
                barWidth: 2,
                barRadius: 2,
                responsive: true,
                cursorWidth: 0
            });

            wavesurfer.load(audioSrc);
            wavesurfers[index] = wavesurfer;

            playBtn.addEventListener('click', () => {
                wavesurfer.playPause();
            });

            wavesurfer.on('play', () => {
                playBtn.innerHTML = iconPause;
                playBtn.classList.add('playing');
            });

            wavesurfer.on('pause', () => {
                playBtn.innerHTML = iconPlay;
                playBtn.classList.remove('playing');
            });
             wavesurfer.on('finish', () => {
                playBtn.innerHTML = iconPlay;
                playBtn.classList.remove('playing');
            });
        }
    });

    function showSlide(index) {
        // Pausa todos os outros áudios antes de trocar o slide
        wavesurfers.forEach((ws, i) => {
            if (i !== index && ws.isPlaying()) {
                ws.pause();
            }
        });

        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        currentIndex = index;
    }

    prevBtn.addEventListener("click", () => {
        const newIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
        showSlide(newIndex);
    });

    nextBtn.addEventListener("click", () => {
        const newIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        showSlide(newIndex);
    });

    showSlide(currentIndex); // Mostra o slide inicial
}


function initializeCarousel() {
    const carouselImage = document.getElementById("carousel-image");
    if (!carouselImage) return;

    const images = ["imgs/produtor2.jpeg", "imgs/produtor.jpeg", "imgs/produtor3.jpeg", "imgs/produtor4.jpeg", "imgs/produtor5.jpeg"];
    let currentIndex = 0;
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const dotsContainer = document.getElementById("carousel-dots");

    function updateCarousel() {
        carouselImage.style.opacity = '0';
        setTimeout(() => {
            carouselImage.src = images[currentIndex];
            carouselImage.style.opacity = '1';
        }, 400);

        const dots = dotsContainer.querySelectorAll(".carousel-dot");
        dots.forEach((dot, index) => dot.classList.toggle("active", index === currentIndex));
    }

    images.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.classList.add("carousel-dot");
        if(index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
            currentIndex = index;
            updateCarousel();
        });
        dotsContainer.appendChild(dot);
    });

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        updateCarousel();
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });
}