// js/beats.js

document.addEventListener("DOMContentLoaded", () => {
    // Garante que o array allBeats (de data-beats.js) foi carregado
    if (typeof allBeats === 'undefined') {
        console.error("Os dados dos beats (data-beats.js) não foram carregados.");
        return;
    }

    let filteredBeats = [...allBeats];

    // DOM Elements
    const searchInput = document.getElementById("search-input");
    const genreFilter = document.getElementById("genre-filter");
    const sortFilter = document.getElementById("sort-filter");
    const beatsGrid = document.getElementById("beats-grid");
    const resultsCount = document.getElementById("results-count");
    const noResults = document.getElementById("no-results");

    // --- Audio Modal Functions ---
    const audioModal = document.getElementById("audio-modal");
    const audioModalTitle = document.getElementById("audio-modal-title");
    const audioModalClose = document.getElementById("audio-modal-close");
    const audioPlayer = document.getElementById("audio-player");

    function openAudioModal(title, audioSrc) {
        if (audioModal && audioModalTitle && audioPlayer) {
            audioModalTitle.textContent = title;
            audioPlayer.src = audioSrc;
            audioModal.style.display = "block";
            document.body.style.overflow = "hidden";
        }
    }

    function closeAudioModal() {
        if (audioModal && audioPlayer) {
            audioModal.style.display = "none";
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
            document.body.style.overflow = "auto";
        }
    }

    if (audioModalClose) audioModalClose.addEventListener("click", closeAudioModal);
    if (audioModal) audioModal.addEventListener("click", (e) => { if (e.target === audioModal) closeAudioModal(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && audioModal?.style.display === "block") closeAudioModal(); });

    // --- Beat Card Creation (Versão com Botão de Detalhes) ---
    function createBeatCard(beat) {
        return `
            <div class="beat-card" data-id="${beat.id}">
                <div class="beat-image">
                    <img src="${beat.image}" alt="${beat.title}">
                    <div class="beat-overlay">
                        <button class="play-btn" onclick="openAudioModal('${beat.title}', '${beat.preview}')">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="5,3 19,12 5,21"></polygon>
                            </svg>
                        </button>
                    </div>
                    <div class="beat-genre">${beat.genre}</div>
                </div>
                <div class="beat-info">
                    <h3 class="beat-title">${beat.title}</h3>
                    <div class="beat-details">
                        <span class="beat-bpm">${beat.bpm} BPM</span>
                        <span class="beat-price">${beat.priceDisplay}</span>
                    </div>
                    <div class="card-buttons">
                        <a href="pagina-beat.html?id=${beat.id}" class="btn btn-outline btn-sm btn-details">Ver Detalhes</a>
                        <button class="buy-btn" onclick="handlePurchase('${beat.title}')">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="m2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                            </svg>
                            Comprar
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    // --- Global Functions needed by card buttons ---
    window.openAudioModal = openAudioModal;
    window.handlePurchase = (beatTitle) => {
        const encodedTitle = encodeURIComponent(beatTitle);
        window.open(`https://kirvano.com/checkout?beat=${encodedTitle}`, "_blank");
    };

    // --- Filter, Sort, and Render Logic ---
    function filterBeats() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedGenre = genreFilter.value;
        filteredBeats = allBeats.filter((beat) => 
            (beat.title.toLowerCase().includes(searchTerm) || beat.genre.toLowerCase().includes(searchTerm)) &&
            (selectedGenre === "all" || beat.genre === selectedGenre)
        );
        sortBeats();
        renderBeats();
        updateResultsCount();
    }

    function sortBeats() {
        const sortBy = sortFilter.value;
        filteredBeats.sort((a, b) => {
            switch (sortBy) {
                case "newest": return new Date(b.date) - new Date(a.date);
                case "price-low": return a.price - b.price;
                case "price-high": return b.price - a.price;
                case "bpm-low": return a.bpm - b.bpm;
                case "bpm-high": return b.bpm - a.bpm;
                default: return 0;
            }
        });
    }

    function renderBeats() {
        if (!beatsGrid) return;
        beatsGrid.style.display = filteredBeats.length === 0 ? "none" : "grid";
        if (noResults) noResults.style.display = filteredBeats.length === 0 ? "block" : "none";
        beatsGrid.innerHTML = filteredBeats.map(beat => createBeatCard(beat)).join("");
    }

    function updateResultsCount() {
        if (resultsCount) {
            resultsCount.textContent = `Mostrando ${filteredBeats.length} de ${allBeats.length} beats`;
        }
    }

    // --- Event Listeners ---
    if (searchInput) searchInput.addEventListener("input", filterBeats);
    if (genreFilter) genreFilter.addEventListener("change", filterBeats);
    if (sortFilter) sortFilter.addEventListener("change", () => {
        sortBeats();
        renderBeats();
    });

    // --- Initial Load ---
    filterBeats();
});