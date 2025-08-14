// js/presets.js

document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA DO CARROSSEL (para index.html) ---
    const slides = document.querySelectorAll('.preset-slide');
    const prevBtn = document.getElementById('preset-prev');
    const nextBtn = document.getElementById('preset-next');
    
    // A lógica do carrossel só executa se encontrar os slides
    if (slides.length > 0 && prevBtn && nextBtn) {
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach((slide) => {
                slide.classList.remove('active');
                const video = slide.querySelector('video');
                const audio = slide.querySelector('audio');
                if (video) video.pause();
                if (audio) audio.pause();
            });
            slides[index].classList.add('active');
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
        
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // Lógica de Autoplay e Intersection Observer para os vídeos do carrossel
        const observerOptions = { threshold: 0.5 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target.closest('.preset-slide').classList.contains('active')) {
                    entry.target.play().catch(() => console.log("Autoplay do vídeo impedido."));
                } else {
                    entry.target.pause();
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.preset-content video').forEach(video => observer.observe(video));

        showSlide(currentSlide);
    }


    // --- LÓGICA DO CATÁLOGO DE PRESETS (para presets.html) ---
    const presetsGrid = document.getElementById("presets-grid");

    // O código abaixo só executa se encontrar o elemento 'presets-grid'
    if (presetsGrid) {
        if (typeof allPresets === 'undefined') {
            console.error("Os dados dos presets (data-presets.js) não foram carregados.");
            return;
        }

        const searchInput = document.getElementById("search-input");
        const sortFilter = document.getElementById("sort-filter");
        const resultsCount = document.getElementById("results-count");
        const noResults = document.getElementById("no-results");

        function createPresetCard(preset) {
            const priceFormatted = `R$ ${preset.price.toFixed(2)}`;
            return `
                <a href="pagina-preset.html?id=${preset.id}" class="beat-card-link">
                    <div class="beat-card" data-id="${preset.id}">
                        <div class="beat-image">
                            <img src="${preset.image}" alt="${preset.title}">
                            <div class="beat-overlay"></div>
                        </div>
                        <div class="beat-info">
                            <h3 class="beat-title">${preset.title}</h3>
                            <p class="beat-details" style="font-size: 0.9rem; color: #9ca3af; margin: 0.5rem 0;">${preset.highlightedSubtitle}</p>
                            <span class="beat-price">${priceFormatted}</span>
                        </div>
                    </div>
                </a>
            `;
        }

        function applyFiltersAndRender() {
            let filteredPresets = [...allPresets];
            const searchTerm = searchInput.value.toLowerCase();
            if (searchTerm) {
                filteredPresets = filteredPresets.filter(p => p.title.toLowerCase().includes(searchTerm));
            }

            const sortBy = sortFilter.value;
            filteredPresets.sort((a, b) => {
                switch (sortBy) {
                    case "newest": return b.id - a.id;
                    case "price-low": return a.price - b.price;
                    case "price-high": return b.price - a.price;
                    default: return 0;
                }
            });
            
            renderPresets(filteredPresets);
        }

        function renderPresets(presets) {
            const hasResults = presets.length > 0;
            presetsGrid.style.display = hasResults ? "grid" : "none";
            noResults.style.display = hasResults ? "none" : "block";
            
            if (hasResults) {
                presetsGrid.innerHTML = presets.map(createPresetCard).join("");
            }
            
            if (resultsCount) {
                resultsCount.textContent = `Mostrando ${presets.length} de ${allPresets.length} presets`;
            }
        }

        if (sortFilter) sortFilter.addEventListener("change", applyFiltersAndRender);
        if (searchInput) searchInput.addEventListener("input", applyFiltersAndRender);

        applyFiltersAndRender();
    }
    
    // --- LÓGICA DO MENU HAMBÚRGUER (para funcionar em ambas as páginas) ---
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }
});