// js/main.js

// --- Navigation Toggle ---
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    const bars = navToggle.querySelectorAll(".bar");
    bars.forEach((bar, index) => {
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

const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      const bars = navToggle.querySelectorAll(".bar");
      bars.forEach((bar) => {
        bar.style.transform = "none";
        bar.style.opacity = "1";
      });
    }
  });
});

// --- Beat Card and Purchase Functions ---
function createBeatCard(beat) {
  return `
    <a href="pagina-beat.html?id=${beat.id}" class="beat-card-link">
      <div class="beat-card" data-id="${beat.id}">
          <div class="beat-image">
              <img src="${beat.image}" alt="${beat.title}">
              <div class="beat-overlay">
                  <div class="play-btn-wrapper">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polygon points="5,3 19,12 5,21"></polygon>
                      </svg>
                  </div>
              </div>
              <div class="beat-genre">${beat.genre}</div>
          </div>
          <div class="beat-info">
              <h3 class="beat-title">${beat.title}</h3>
              <div class="beat-details">
                  <span class="beat-bpm">${beat.bpm} BPM</span>
                  <span class="beat-price">${beat.priceDisplay}</span>
              </div>
          </div>
      </div>
    </a>
  `;
}

function handlePurchase(beatTitle) {
  const encodedTitle = encodeURIComponent(beatTitle);
  window.open(`https://kirvano.com/checkout?beat=${encodedTitle}`, "_blank");
}

// --- Load Featured Beats on Homepage ---
function loadFeaturedBeats() {
  const featuredBeatsGrid = document.getElementById("featured-beats-grid");
  if (featuredBeatsGrid && typeof allBeats !== 'undefined') {
    const featuredBeats = allBeats.slice(0, 3);
    featuredBeatsGrid.innerHTML = featuredBeats.map((beat) => createBeatCard(beat)).join("");
  }
}

// --- Carousel Logic (About Me Page) ---
function initializeCarousel() {
  const carouselImage = document.getElementById("carousel-image");
  if (!carouselImage) return;

  const images = [
    "imgs/produtor2.jpeg",
    "imgs/produtor.jpeg",
    "imgs/produtor3.jpeg",
    "imgs/produtor4.jpeg",
    "imgs/produtor5.jpeg"
  ];
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
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  images.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("carousel-dot");
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

  updateCarousel();
}

// --- General Initializations ---
document.addEventListener("DOMContentLoaded", () => {
  loadFeaturedBeats();
  initializeCarousel();

  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      navbar.style.background = (window.scrollY > 100) ? "rgba(0, 0, 0, 0.95)" : "rgba(0, 0, 0, 0.9)";
    }
  });
});