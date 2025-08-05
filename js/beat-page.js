// js/beat-page.js

// --- FUNÇÃO PARA EMBARALHAR UM ARRAY (Fisher-Yates Shuffle) ---
// Usaremos isso para pegar beats aleatórios.
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
    }
    return array;
}

// Funções auxiliares globais para serem usadas também pelos cards de "beats relacionados"
function handlePurchase(beatTitle) {
    const encodedTitle = encodeURIComponent(beatTitle);
    window.open(`https://kirvano.com/checkout?beat=${encodedTitle}`, "_blank");
}

function createBeatCard(beat) {
    // Ao clicar num beat relacionado, a página precisa ser recarregada para pegar o novo ID
    return `
        <a href="pagina-beat.html?id=${beat.id}" class="beat-card-link" onclick="setTimeout(() => { window.location.reload() }, 100)">
            <div class="beat-card" data-id="${beat.id}">
                <div class="beat-image"><img src="${beat.image}" alt="${beat.title}"></div>
                <div class="beat-info">
                    <h3 class="beat-title">${beat.title}</h3>
                    <div class="beat-details"><span class="beat-bpm">${beat.bpm} BPM</span><span class="beat-price">${beat.priceDisplay}</span></div>
                </div>
            </div>
        </a>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof allBeats === 'undefined') {
        console.error("ERRO CRÍTICO: O arquivo data-beats.js não foi carregado ou está vazio.");
        document.body.innerHTML = '<h1 style="text-align: center; padding: 5rem; color: white;">Erro ao carregar dados dos beats.</h1>';
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const beatId = parseInt(params.get('id'));
    const beat = allBeats.find(b => b.id === beatId);
    
    if (!beat) {
        document.body.innerHTML = '<h1 style="text-align: center; padding: 5rem; color: white;">Beat não encontrado. Verifique o ID na URL.</h1>';
        return;
    }

    // --- Inicia o preenchimento da página ---
    populateBeatData(beat);

    function populateBeatData(beat) {
        document.title = `${beat.title} - Dj Smoke`;
        document.querySelector('.player-info .beat-title').textContent = beat.title;
        document.querySelector('.beat-genre').textContent = beat.genre;
        document.querySelector('.beat-bpm').textContent = `${beat.bpm} BPM`;
        document.querySelector('.beat-key').textContent = beat.key;
        
        const audioSource = document.querySelector('#audio-element source');
        audioSource.src = beat.preview;
        const audioElement = document.getElementById('audio-element');
        audioElement.load();

        document.querySelector('.beat-description-text').textContent = beat.description;
        document.querySelector('.specs-list').innerHTML = `
            <li><strong>BPM:</strong> ${beat.bpm}</li>
            <li><strong>Tonalidade:</strong> ${beat.key}</li>
            <li><strong>Gênero:</strong> ${beat.genre}</li>
        `;
        document.querySelector('.price-display .price').textContent = beat.priceDisplay;
        document.querySelector('.btn-purchase').onclick = () => handlePurchase(beat.title);

        const artworkImage = document.querySelector('.artwork-image');
        artworkImage.src = beat.image;
        artworkImage.alt = `Capa do beat ${beat.title}`;

        // --- LÓGICA ATUALIZADA PARA BEATS RELACIONADOS ALEATÓRIOS ---
        const relatedBeatsGrid = document.getElementById('related-beats-grid');
        // 1. Filtra para remover o beat atual da lista de possibilidades
        const otherBeats = allBeats.filter(b => b.id !== beat.id);
        // 2. Embaralha a lista filtrada
        const shuffledBeats = shuffleArray(otherBeats);
        // 3. Pega os 3 primeiros beats da lista embaralhada
        const randomRelatedBeats = shuffledBeats.slice(0, 3);
        // 4. Exibe os beats na página
        relatedBeatsGrid.innerHTML = randomRelatedBeats.map(b => createBeatCard(b)).join('');
    }

    // --- Lógica do Player de Áudio ---
    const audioElement = document.getElementById('audio-element');
    const playButton = document.getElementById('play-button');
    const playIcon = playButton.querySelector('.play-icon');
    const pauseIcon = playButton.querySelector('.pause-icon');
    const waveformProgress = document.getElementById('waveform-progress');
    const waveformContainer = document.querySelector('.waveform');
    const currentTimeDisplay = document.getElementById('current-time');
    const totalTimeDisplay = document.getElementById('total-time');

    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }

    function togglePlay() {
        if (audioElement.paused) {
            audioElement.play().catch(error => console.error("Erro ao tocar o áudio:", error));
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            audioElement.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    }

    playButton.addEventListener('click', togglePlay);
    document.querySelector('.artwork-play-btn')?.addEventListener('click', togglePlay);

    audioElement.addEventListener('timeupdate', () => {
        if (audioElement.duration) {
            waveformProgress.style.width = `${(audioElement.currentTime / audioElement.duration) * 100}%`;
            currentTimeDisplay.textContent = formatTime(audioElement.currentTime);
        }
    });

    audioElement.addEventListener('loadedmetadata', () => {
        totalTimeDisplay.textContent = formatTime(audioElement.duration);
    });

    waveformContainer.addEventListener('click', (event) => {
        if (audioElement.duration) {
            const containerWidth = waveformContainer.clientWidth;
            const clickX = event.offsetX;
            audioElement.currentTime = (clickX / containerWidth) * audioElement.duration;
        }
    });

    audioElement.addEventListener('ended', () => {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        audioElement.currentTime = 0;
    });
});