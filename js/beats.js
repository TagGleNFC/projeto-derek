// Beats page specific JavaScript
const allBeats = [
  {
    id: 1,
    title: "Dark Trap Vibes",
    genre: "Trap",
    bpm: 140,
    price: 29.99,
    priceDisplay: "$29.99",
    image: "/placeholder.svg?height=200&width=300&text=Dark+Trap+Beat",
    preview: "#",
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "Melodic Dreams",
    genre: "R&B",
    bpm: 85,
    price: 34.99,
    priceDisplay: "$34.99",
    image: "/placeholder.svg?height=200&width=300&text=R%26B+Beat",
    preview: "#",
    date: "2024-01-14",
  },
  {
    id: 3,
    title: "Hard Drill Energy",
    genre: "Drill",
    bpm: 150,
    price: 24.99,
    priceDisplay: "$24.99",
    image: "/placeholder.svg?height=200&width=300&text=Drill+Beat",
    preview: "#",
    date: "2024-01-13",
  },
  {
    id: 4,
    title: "Chill Lo-Fi Mood",
    genre: "Lo-Fi",
    bpm: 70,
    price: 19.99,
    priceDisplay: "$19.99",
    image: "/placeholder.svg?height=200&width=300&text=Lo-Fi+Beat",
    preview: "#",
    date: "2024-01-12",
  },
  {
    id: 5,
    title: "Boom Bap Classic",
    genre: "Hip-Hop",
    bpm: 90,
    price: 27.99,
    priceDisplay: "$27.99",
    image: "/placeholder.svg?height=200&width=300&text=Hip-Hop+Beat",
    preview: "#",
    date: "2024-01-11",
  },
  {
    id: 6,
    title: "Future Bass Drop",
    genre: "Electronic",
    bpm: 128,
    price: 32.99,
    priceDisplay: "$32.99",
    image: "/placeholder.svg?height=200&width=300&text=Electronic+Beat",
    preview: "#",
    date: "2024-01-10",
  },
  {
    id: 7,
    title: "Smooth Jazz Fusion",
    genre: "Jazz",
    bpm: 95,
    price: 39.99,
    priceDisplay: "$39.99",
    image: "/placeholder.svg?height=200&width=300&text=Jazz+Beat",
    preview: "#",
    date: "2024-01-09",
  },
  {
    id: 8,
    title: "Reggaeton Fire",
    genre: "Reggaeton",
    bpm: 95,
    price: 26.99,
    priceDisplay: "$26.99",
    image: "/placeholder.svg?height=200&width=300&text=Reggaeton+Beat",
    preview: "#",
    date: "2024-01-08",
  },
]

let filteredBeats = [...allBeats]

// DOM Elements
const searchInput = document.getElementById("search-input")
const genreFilter = document.getElementById("genre-filter")
const sortFilter = document.getElementById("sort-filter")
const beatsGrid = document.getElementById("beats-grid")
const resultsCount = document.getElementById("results-count")
const noResults = document.getElementById("no-results")

// Navigation Toggle (reuse from main.js)
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")

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
                    <span class="beat-price">${beat.priceDisplay}</span>
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

// Handle purchase
function handlePurchase(beatTitle) {
  const encodedTitle = encodeURIComponent(beatTitle)
  window.open(`https://kirvano.com/checkout?beat=${encodedTitle}`, "_blank")
}

// Filter and sort functions
function filterBeats() {
  const searchTerm = searchInput.value.toLowerCase()
  const selectedGenre = genreFilter.value

  filteredBeats = allBeats.filter((beat) => {
    const matchesSearch = beat.title.toLowerCase().includes(searchTerm) || beat.genre.toLowerCase().includes(searchTerm)
    const matchesGenre = selectedGenre === "all" || beat.genre === selectedGenre

    return matchesSearch && matchesGenre
  })

  sortBeats()
  renderBeats()
  updateResultsCount()
}

function sortBeats() {
  const sortBy = sortFilter.value

  filteredBeats.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date) - new Date(a.date)
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "bpm-low":
        return a.bpm - b.bpm
      case "bpm-high":
        return b.bpm - a.bpm
      default:
        return 0
    }
  })
}

function renderBeats() {
  if (!beatsGrid) return

  if (filteredBeats.length === 0) {
    beatsGrid.style.display = "none"
    if (noResults) noResults.style.display = "block"
  } else {
    beatsGrid.style.display = "grid"
    if (noResults) noResults.style.display = "none"
    beatsGrid.innerHTML = filteredBeats.map((beat) => createBeatCard(beat)).join("")

    // Animate cards
    const cards = beatsGrid.querySelectorAll(".beat-card")
    cards.forEach((card, index) => {
      card.style.opacity = "0"
      card.style.transform = "translateY(30px)"
      setTimeout(() => {
        card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
        card.style.opacity = "1"
        card.style.transform = "translateY(0)"
      }, index * 100)
    })
  }
}

function updateResultsCount() {
  if (resultsCount) {
    resultsCount.textContent = `Mostrando ${filteredBeats.length} de ${allBeats.length} beats`
  }
}

// Event listeners
if (searchInput) {
  searchInput.addEventListener("input", filterBeats)
}

if (genreFilter) {
  genreFilter.addEventListener("change", filterBeats)
}

if (sortFilter) {
  sortFilter.addEventListener("change", () => {
    sortBeats()
    renderBeats()
  })
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  filterBeats()

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
})
