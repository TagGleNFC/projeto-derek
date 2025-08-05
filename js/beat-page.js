// js/beat-page.js

// Funções auxiliares globais para serem usadas também pelos cards de "beats relacionados"
function handlePurchase(beatTitle) {
    const encodedTitle = encodeURIComponent(beatTitle);
    window.open(`https://kirvano.com/checkout?beat=${encodedTitle}`, "_blank");
}

function createBeatCard(beat) {
    return `
        <a href="pagina-beat.html?id=${beat.id}" class="beat-card-link" onclick="window.location.reload()">
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
    // Garante que o array allBeats (de data-beats.js) foi carregado
    if (typeof allBeats === 'undefined') {
        console.error("Os dados dos beats (data-beats.js) não foram carregados.");
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const beatId = parseInt(params.get('id'));
    const beat = allBeats.find(b => b.id === beatId);
    
    // DEBUG: Verifique no console do navegador se o beat foi encontrado
    console.log("Beat encontrado:", beat); 

    if (!beat) {
        document.body.innerHTML = '<h1 style="text-align: center; padding: 5rem; color: white;">Beat não encontrado</h1>';
        return;
    }

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
        const purchaseButton = document.querySelector('.btn-purchase');
        purchaseButton.onclick = () => handlePurchase(beat.title);

        const artworkImage = document.querySelector('.artwork-image');
        artworkImage.src = beat.image;
        artworkImage.alt = `Capa do beat ${beat.title}`;

        const relatedBeatsGrid = document.getElementById('related-beats-grid');
        const relatedBeats = allBeats.filter(b => b.id !== beat.id && b.genre === beat.genre).slice(0, 3);
        relatedBeatsGrid.innerHTML = relatedBeats.map(b => createBeatCard(b)).join('');
    }

    populateBeatData(beat);

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
            audioElement.play();
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