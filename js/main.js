// Navigation Toggle
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")

    // Animate hamburger
    const bars = navToggle.querySelectorAll(".bar")
    bars.forEach((bar, index) => {
      if (navMenu.classList.contains("active")) {
        if (index === 0) bar.style.transform = "rotate(45deg) translate(5px, 5px)"
        if (index === 1) bar.style.opacity = "0"
        if (index === 2) bar.style.transform = "rotate(-45deg) translate(7px, -6px)"
      } else {
        bar.style.transform = "none"
        bar.style.opacity = "1"
      }
    })
  })
}

// Close mobile menu when clicking on links
const navLinks = document.querySelectorAll(".nav-link")
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active")
      const bars = navToggle.querySelectorAll(".bar")
      bars.forEach((bar) => {
        bar.style.transform = "none"
        bar.style.opacity = "1"
      })
    }
  })
})

// Beats data
const beatsData = [
  {
    id: 1,
    title: "Dark Trap Vibes",
    genre: "Trap",
    bpm: 140,
    price: "$29.99",
    image: "/placeholder.svg?height=200&width=300&text=Dark+Trap+Beat",
    preview: "#",
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "Melodic Dreams",
    genre: "R&B",
    bpm: 85,
    price: "$34.99",
    image: "/placeholder.svg?height=200&width=300&text=R%26B+Beat",
    preview: "#",
    date: "2024-01-14",
  },
  {
    id: 3,
    title: "Hard Drill Energy",
    genre: "Drill",
    bpm: 150,
    price: "$24.99",
    image: "/placeholder.svg?height=200&width=300&text=Drill+Beat",
    preview: "#",
    date: "2024-01-13",
  },
  {
    id: 4,
    title: "Chill Lo-Fi Mood",
    genre: "Lo-Fi",
    bpm: 70,
    price: "$19.99",
    image: "/placeholder.svg?height=200&width=300&text=Lo-Fi+Beat",
    preview: "#",
    date: "2024-01-12",
  },
  {
    id: 5,
    title: "Boom Bap Classic",
    genre: "Hip-Hop",
    bpm: 90,
    price: "$27.99",
    image: "/placeholder.svg?height=200&width=300&text=Hip-Hop+Beat",
    preview: "#",
    date: "2024-01-11",
  },
  {
    id: 6,
    title: "Future Bass Drop",
    genre: "Electronic",
    bpm: 128,
    price: "$32.99",
    image: "/placeholder.svg?height=200&width=300&text=Electronic+Beat",
    preview: "#",
    date: "2024-01-10",
  },
  {
    id: 7,
    title: "Smooth Jazz Fusion",
    genre: "Jazz",
    bpm: 95,
    price: "$39.99",
    image: "/placeholder.svg?height=200&width=300&text=Jazz+Beat",
    preview: "#",
    date: "2024-01-09",
  },
  {
    id: 8,
    title: "Reggaeton Fire",
    genre: "Reggaeton",
    bpm: 95,
    price: "$26.99",
    image: "/placeholder.svg?height=200&width=300&text=Reggaeton+Beat",
    preview: "#",
    date: "2024-01-08",
  },
]

// Audio Modal Functions
const audioModal = document.getElementById("audio-modal")
const audioModalTitle = document.getElementById("audio-modal-title")
const audioModalClose = document.getElementById("audio-modal-close")
const audioPlayer = document.getElementById("audio-player")

function openAudioModal(title, audioSrc) {
  if (audioModal && audioModalTitle && audioPlayer) {
    audioModalTitle.textContent = title
    audioPlayer.src = audioSrc
    audioModal.style.display = "block"
    document.body.style.overflow = "hidden"
  }
}

function closeAudioModal() {
  if (audioModal && audioPlayer) {
    audioModal.style.display = "none"
    audioPlayer.pause()
    audioPlayer.currentTime = 0
    document.body.style.overflow = "auto"
  }
}

// Close modal events
if (audioModalClose) {
  audioModalClose.addEventListener("click", closeAudioModal)
}

if (audioModal) {
  audioModal.addEventListener("click", (e) => {
    if (e.target === audioModal) {
      closeAudioModal()
    }
  })
}

// Escape key to close modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && audioModal && audioModal.style.display === "block") {
    closeAudioModal()
  }
})

// Create beat card HTML
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
                    <span class="beat-price">${beat.price}</span>
                </div>
                <button class="buy-btn" onclick="handlePurchase('${beat.title}')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="8" cy="21" r="1"></circle>
                        <circle cx="19" cy="21" r="1"></circle>
                        <path d="m2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                    </svg>
                    Comprar Agora
                </button>
            </div>
        </div>
    `
}

// Handle purchase - redirect to external platform
function handlePurchase(beatTitle) {
  // Redirect to external platform (Kirvano, Shopify, etc.)
  const encodedTitle = encodeURIComponent(beatTitle)
  window.open(`https://kirvano.com/checkout?beat=${encodedTitle}`, "_blank")
}

// Load featured beats on homepage
function loadFeaturedBeats() {
  const featuredBeatsGrid = document.getElementById("featured-beats-grid")
  if (featuredBeatsGrid) {
    const featuredBeats = beatsData.slice(0, 4)
    featuredBeatsGrid.innerHTML = featuredBeats.map((beat) => createBeatCard(beat)).join("")
  }
}

// Initialize homepage
if (window.location.pathname === "/" || window.location.pathname.includes("index.html")) {
  document.addEventListener("DOMContentLoaded", loadFeaturedBeats)
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (navbar) {
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(0, 0, 0, 0.95)"
    } else {
      navbar.style.background = "rgba(0, 0, 0, 0.9)"
    }
  }
})

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".beat-card, .stat-item, .timeline-item")
  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})
// --- Lógica do Carrossel da Página Sobre Mim ---

document.addEventListener("DOMContentLoaded", () => {
  // Executa o código apenas se os elementos do carrossel existirem na página
  const carouselImage = document.getElementById("carousel-image");
  if (!carouselImage) {
    return; // Se não encontrar a imagem, para a execução e evita erros.
  }

  // **IMPORTANTE**: Coloque aqui os caminhos para as suas imagens
  const images = [
    "imgs/produtor2.jpeg", // Imagem 1
    "imgs/produtor.jpeg", // Imagem 2 (exemplo, troque o nome)
    "imgs/produtor3.jpeg",
    "imgs/produtor4.jpeg",
    "imgs/produtor5.jpeg"  // Imagem 3 (exemplo, troque o nome)
  ];

  let currentIndex = 0;

  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const dotsContainer = document.getElementById("carousel-dots");

  // Função para atualizar a imagem e os pontos
  function updateCarousel() {
    // Adiciona um efeito de fade out
    carouselImage.style.opacity = '0';

    setTimeout(() => {
      carouselImage.src = images[currentIndex];
      // Adiciona um efeito de fade in
      carouselImage.style.opacity = '1';
    }, 400); // Deve corresponder à duração da transição no CSS

    // Atualiza os pontos indicadores
    const dots = dotsContainer.querySelectorAll(".carousel-dot");
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  // Criar os pontos indicadores dinamicamente
  images.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("carousel-dot");
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateCarousel();
    });
    dotsContainer.appendChild(dot);
  });

  // Event Listeners para os botões
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
  });

  // Iniciar o carrossel
  updateCarousel();
});