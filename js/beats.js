// js/beats.js

document.addEventListener("DOMContentLoaded", () => {
    // --- LÓGICA DO MENU HAMBÚRGUER ---
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            const bars = navToggle.querySelectorAll(".bar");
            // Animação dos ícones do menu hambúrguer
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
    
    // Elementos do Modal de Áudio
    const audioModal = document.getElementById("audio-modal");
    const audioModalTitle = document.getElementById("audio-modal-title");
    const audioModalClose = document.getElementById("audio-modal-close");
    const audioPlayer = document.getElementById("audio-player");

    // --- FUNÇÕES ---

    // Função para abrir o modal de áudio
    function openAudioModal(title, audioSrc) {
        if (!audioModal || !audioPlayer) return;
        if(audioModalTitle) audioModalTitle.textContent = title;
        audioPlayer.src = audioSrc;
        audioPlayer.load();
        audioPlayer.play().catch(e => console.error("Erro ao tocar áudio:", e));
        audioModal.style.display = "flex"; // Usar flex para centralizar
    }

    // Função para fechar o modal de áudio
    function closeAudioModal() {
        if (!audioModal || !audioPlayer) return;
        audioModal.style.display = "none";
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    }

    // Função para lidar com a compra
    function handlePurchase(beatTitle) {
        const encodedTitle = encodeURIComponent(beatTitle);
        window.open(`https://kirvano.com/checkout?beat=${encodedTitle}`, "_blank");
    }

    // Função para criar o card do beat
    function createBeatCard(beat) {
        // CORRIGIDO: Usa 'beat.price' e formata, em vez do inexistente 'beat.priceDisplay'
        const priceFormatted = `R$ ${beat.price.toFixed(2)}`;
        
        return `
            <div class="beat-card" data-id="${beat.id}">
                <div class="beat-image">
                    <img src="${beat.image}" alt="${beat.title}">
                    <div class="beat-overlay">
                        <button class="play-btn" data-title="${beat.title}" data-audio="${beat.audio}">
                            <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"></polygon></svg>
                        </button>
                    </div>
                    <span class="beat-genre">${beat.genre}</span>
                </div>
                <div class="beat-info">
                    <h3 class="beat-title">${beat.title}</h3>
                    <div class="beat-details">
                        <span class="beat-bpm">${beat.bpm} BPM</span>
                        <span class="beat-price">${priceFormatted}</span>
                    </div>
                    <div class="card-buttons">
                        <a href="pagina-beat.html?id=${beat.id}" class="btn btn-outline btn-sm">Detalhes</a>
                        <button class="buy-btn btn btn-primary btn-sm" data-title="${beat.title}">Comprar</button>
                    </div>
                </div>
            </div>
        `;
    }

    // Função para renderizar os beats em promoção
    const renderPromotionBeats = () => {
        if (!promotionGrid) return;
        const promotionBeats = allBeats.filter(beat => beat.onPromotion).slice(0, 3);
        promotionGrid.innerHTML = promotionBeats.map(createBeatCard).join('');
    };
    
    // Função principal para filtrar, ordenar e renderizar os beats
    function applyFiltersAndRender() {
        let filteredBeats = [...allBeats];

        // Filtros
        const searchTerm = searchInput.value.toLowerCase();
        const selectedGenre = genreFilter.value;
        const selectedVibe = vibeFilter.value;

        filteredBeats = allBeats.filter(beat => {
            const searchTermMatch = beat.title.toLowerCase().includes(searchTerm);
            const genreMatch = (selectedGenre === "all" || beat.genre === selectedGenre);
            // CORRIGIDO: Verifica se 'beat.vibe' existe antes de usar 'includes'
            const vibeMatch = (selectedVibe === "all" || (beat.vibe && beat.vibe.includes(selectedVibe)));
            return searchTermMatch && genreMatch && vibeMatch;
        });

        // Ordenação
        const sortBy = sortFilter.value;
        filteredBeats.sort((a, b) => {
            switch (sortBy) {
                // CORRIGIDO: Ordenação por data/ID
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

    // Função para renderizar o grid principal
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
    
    // Função para atualizar a contagem de resultados
    function updateResultsCount(filteredCount) {
        if (resultsCount) {
            resultsCount.textContent = `Mostrando ${filteredCount} de ${allBeats.length} beats`;
        }
    }

    // --- EVENT LISTENERS ---

    // Listeners dos filtros
    [searchInput, genreFilter, vibeFilter, sortFilter].forEach(element => {
        if (element) element.addEventListener("change", applyFiltersAndRender);
    });
    if(searchInput) searchInput.addEventListener("input", applyFiltersAndRender);


    // Listeners dos botões dentro dos cards (usando delegação de evento)
    document.addEventListener('click', (event) => {
        const playButton = event.target.closest('.play-btn');
        const buyButton = event.target.closest('.buy-btn');

        if (playButton) {
            event.preventDefault();
            // CORRIGIDO: Usa 'data-audio' para consistência
            const audioSrc = playButton.dataset.audio;
            const title = playButton.dataset.title;
            openAudioModal(title, audioSrc);
        } else if (buyButton) {
            event.preventDefault();
            const title = buyButton.dataset.title;
            handlePurchase(title);
        }
    });

    // Listeners do modal
    if (audioModalClose) audioModalClose.addEventListener("click", closeAudioModal);
    if (audioModal) audioModal.addEventListener("click", (e) => { if (e.target === audioModal) closeAudioModal(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && audioModal?.style.display === "flex") closeAudioModal(); });


    // --- CARGA INICIAL ---
    renderPromotionBeats();
    applyFiltersAndRender();
});