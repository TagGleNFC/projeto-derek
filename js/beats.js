// js/beats.js

document.addEventListener("DOMContentLoaded", () => {
    // --- LÓGICA DO MENU HAMBÚRGUER ---
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

    // --- LÓGICA DA PÁGINA DE BEATS ---
    if (typeof allBeats === 'undefined') {
        console.error("Os dados dos beats (data-beats.js) não foram carregados.");
        return;
    }

    // Elementos do DOM
    const promotionGrid = document.getElementById('promotion-beats-grid');
    const beatsGrid = document.getElementById("beats-grid");
    const searchInput = document.getElementById("search-input");
    const genreFilter = document.getElementById("genre-filter");
    const vibeFilter = document.getElementById("vibe-filter");
    const sortFilter = document.getElementById("sort-filter");
    const resultsCount = document.getElementById("results-count");
    const noResults = document.getElementById("no-results");
    
    // --- FUNÇÕES ---

    function handlePurchase(beatTitle) {
        const encodedTitle = encodeURIComponent(beatTitle);
        window.open(`https://kirvano.com/checkout?beat=${encodedTitle}`, "_blank");
    }

    // MODIFICADO: Função de criar card sem o botão de play.
    function createBeatCard(beat) {
        const priceFormatted = `R$ ${beat.price.toFixed(2)}`;
        
        return `
            <a href="pagina-beat.html?id=${beat.id}" class="beat-card-link">
                <div class="beat-card" data-id="${beat.id}">
                    <div class="beat-image">
                        <img src="${beat.image}" alt="${beat.title}">
                        <div class="beat-overlay"></div>
                        <span class="beat-genre">${beat.genre}</span>
                    </div>
                    <div class="beat-info">
                        <h3 class="beat-title">${beat.title}</h3>
                        <div class="beat-details">
                            <span class="beat-bpm">${beat.bpm} BPM</span>
                            <span class="beat-price">${priceFormatted}</span>
                        </div>
                        <div class="card-buttons">
                            <span class="btn btn-outline btn-sm">Detalhes</span>
                            <button class="buy-btn btn btn-primary btn-sm" data-title="${beat.title}">Comprar</button>
                        </div>
                    </div>
                </div>
            </a>
        `;
    }

    const renderPromotionBeats = () => {
        if (!promotionGrid) return;
        const promotionBeats = allBeats.filter(beat => beat.onPromotion).slice(0, 3);
        promotionGrid.innerHTML = promotionBeats.map(createBeatCard).join('');
    };
    
    function applyFiltersAndRender() {
        let filteredBeats = [...allBeats];

        const searchTerm = searchInput.value.toLowerCase();
        const selectedGenre = genreFilter.value;
        const selectedVibe = vibeFilter.value;

        filteredBeats = allBeats.filter(beat => {
            const searchTermMatch = beat.title.toLowerCase().includes(searchTerm);
            const genreMatch = (selectedGenre === "all" || beat.genre === selectedGenre);
            const vibeMatch = (selectedVibe === "all" || (beat.vibe && beat.vibe.includes(selectedVibe)));
            return searchTermMatch && genreMatch && vibeMatch;
        });

        const sortBy = sortFilter.value;
        filteredBeats.sort((a, b) => {
            switch (sortBy) {
                case "newest": return b.id - a.id;
                case "price-low": return a.price - b.price;
                case "price-high": return b.price - a.price;
                case "bpm-low": return a.bpm - b.bpm;
                case "bpm-high": return b.bpm - a.bpm;
                default: return 0;
            }
        });
        
        renderBeats(filteredBeats);
    }

    function renderBeats(beats) {
        if (!beatsGrid || !noResults) return;
        
        const hasResults = beats.length > 0;
        beatsGrid.style.display = hasResults ? "grid" : "none";
        noResults.style.display = hasResults ? "none" : "block";
        
        if (hasResults) {
            beatsGrid.innerHTML = beats.map(createBeatCard).join("");
        }
        
        updateResultsCount(beats.length);
    }
    
    function updateResultsCount(filteredCount) {
        if (resultsCount) {
            resultsCount.textContent = `Mostrando ${filteredCount} de ${allBeats.length} beats`;
        }
    }

    // --- EVENT LISTENERS ---

    [searchInput, genreFilter, vibeFilter, sortFilter].forEach(element => {
        if (element) element.addEventListener("change", applyFiltersAndRender);
    });
    if(searchInput) searchInput.addEventListener("input", applyFiltersAndRender);

    // MODIFICADO: Listener de clique apenas para o botão de comprar.
    document.addEventListener('click', (event) => {
        const buyButton = event.target.closest('.buy-btn');

        if (buyButton) {
            event.preventDefault(); // Impede que o link do card seja ativado
            const title = buyButton.dataset.title;
            handlePurchase(title);
        }
    });

    // --- CARGA INICIAL ---
    renderPromotionBeats();
    applyFiltersAndRender();
});