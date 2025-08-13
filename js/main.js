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
    initializePresetsCarousel();

    window.addEventListener("scroll", () => {
        const navbar = document.querySelector(".navbar");
        if (navbar) {
            navbar.style.background = (window.scrollY > 100) ? "rgba(0, 0, 0, 0.95)" : "rgba(0, 0, 0, 0.9)";
        }
    });
});

// --- Funções de Criação de Cards e Compra ---

// MODIFICADO: Função de criar card sem o botão de play e com preço corrigido.
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

function initializePresetsCarousel() {
    const presetsCarousel = document.getElementById("presets-carousel");
    if (presetsCarousel) {
        const slides = presetsCarousel.querySelectorAll(".preset-slide");
        const prevBtn = document.getElementById("preset-prev");
        const nextBtn = document.getElementById("preset-next");
        let currentIndex = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
        }

        prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
            showSlide(currentIndex);
        });

        nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
            showSlide(currentIndex);
        });

        showSlide(currentIndex);
    }
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