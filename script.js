/**
 * KUMOJIISANKO - OFFICIAL SITE SCRIPT 2026
 */

// --- 1. CONFIGURACIÓN Y DATOS ---
const titles = ["Kumojiisanko", "くもじいさんこ"];
const welcomePhrases = [
    "Welcome to my winter corner.", "Enjoy the visit!", "It's snowing a lot, bundle up!",
    "Beautiful weather, isn't it?", "Make yourself at home in this cold season.",
    "Thanks for stopping by!", "ようこそ", "モノクロームのキャンバス？",
    "愛は残酷だ", "Winter is beautiful", "Watch out, the ink is still wet.",
    "A fat dragon and a fat bear", "Love is Cruel", "物語의 시작", "Im Fat hehe"
];

const favicons = [
    "https://raw.githubusercontent.com/GrampyBear/GrampyBear.github.io/8d9dcff52f43b28b0fc3a6139f9a305339bc1e51/Snowflake.png",
    "https://raw.githubusercontent.com/GrampyBear/GrampyBear.github.io/8d9dcff52f43b28b0fc3a6139f9a305339bc1e51/Cloud.png"
];

const commissionStatus = "open"; 

// Variables globales para la galería
let currentGallery = []; 
let currentIndex = 0;

// --- 2. NAVEGACIÓN ENTRE PÁGINAS (HASH ROUTING) ---
const handleRoute = () => {
    const hash = window.location.hash || '#home';
    const targetId = hash.substring(1);
    const currentPage = document.querySelector('.page.active');
    const nextPage = document.getElementById(targetId);

    if (!nextPage) {
        window.location.hash = '#home';
        return;
    }

    if (currentPage && currentPage !== nextPage) {
        currentPage.classList.add('fading-out');
        setTimeout(() => executePageSwitch(currentPage, nextPage), 500);
    } else {
        executePageSwitch(null, nextPage);
    }
};

const executePageSwitch = (oldPage, newPage) => {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => {
        p.classList.remove('active', 'fading-out');
        p.style.display = 'none';
    });
    newPage.style.display = 'block';
    setTimeout(() => newPage.classList.add('active'), 20);
    applyRandomElements();
    window.scrollTo(0, 0);
};

// --- 3. EFECTOS VISUALES Y ALEATORIEDAD ---
const createSnow = () => {
    const container = document.getElementById('snow-container');
    if (!container) return;
    const snowCount = window.innerWidth < 768 ? 40 : 110;
    container.innerHTML = ''; 
    for (let i = 0; i < snowCount; i++) {
        const flake = document.createElement('div');
        flake.className = 'snowflake';
        const size = Math.random() * 4 + 2 + 'px';
        flake.style.width = size;
        flake.style.height = size;
        flake.style.left = Math.random() * 100 + '%';
        flake.style.opacity = Math.random() * 0.8;
        flake.style.animationDuration = Math.random() * 5 + 5 + 's';
        flake.style.top = '-10px';
        container.appendChild(flake);
    }
};

const applyRandomElements = () => {
    const titleElem = document.getElementById('main-title');
    if (titleElem) titleElem.innerText = titles[Math.floor(Math.random() * titles.length)];
    
    const phraseElem = document.getElementById('welcome-phrase');
    if (phraseElem) phraseElem.innerText = welcomePhrases[Math.floor(Math.random() * welcomePhrases.length)];

    const favElem = document.getElementById('dynamic-favicon');
    if (favElem) favElem.href = favicons[Math.floor(Math.random() * favicons.length)];
};

// --- 4. SISTEMA DE COMISIONES (STATUS Y CARRUSEL) ---
function initCommissions() {
    const statusEl = document.getElementById('commission-status');
    if (statusEl) {
        statusEl.classList.remove('status-open', 'status-closed');
        if (commissionStatus.toLowerCase() === "open") {
            statusEl.innerText = "OPEN";
            statusEl.classList.add('status-open');
        } else {
            statusEl.innerText = "CLOSED";
            statusEl.classList.add('status-closed');
        }
    }
}

function moveCarousel(trackId, step) {
    const track = document.getElementById(trackId);
    if (!track) return;
    const images = track.getElementsByClassName('preview-img');
    let idx = 0;

    for (let i = 0; i < images.length; i++) {
        if (images[i].style.display !== 'none') {
            idx = i;
            images[i].style.display = 'none';
            break;
        }
    }

    let nextIndex = (idx + step + images.length) % images.length;
    images[nextIndex].style.display = 'block';
    images[nextIndex].style.width = '100%';
    images[nextIndex].style.height = '100%';
    images[nextIndex].style.objectFit = 'cover';
}

// --- 5. LIGHTBOX Y GALERÍA FILTRADA ---
function openLightbox(src, typeClass) {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    if (!lb || !img) return;

    // Filtrar galería por tipo (sketch, frame, etc.)
    const imagesOfType = document.querySelectorAll('.' + typeClass);
    currentGallery = Array.from(imagesOfType).map(i => i.src);
    currentIndex = currentGallery.indexOf(src);

    img.src = src;
    lb.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function changeLightboxImage(direction) {
    if (currentGallery.length <= 1) return;
    currentIndex = (currentIndex + direction + currentGallery.length) % currentGallery.length;
    document.getElementById('lightbox-img').src = currentGallery[currentIndex];
}

function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (lb) {
        lb.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// --- 6. EVENTOS Y LISTENERS ---
window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', () => {
    createSnow();
    handleRoute();
});

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(createSnow, 250);
});

document.addEventListener('DOMContentLoaded', initCommissions);

document.addEventListener('keydown', (e) => {
    const lb = document.getElementById('lightbox');
    if (lb && lb.style.display === 'flex') {
        if (e.key === "ArrowLeft") changeLightboxImage(-1);
        if (e.key === "ArrowRight") changeLightboxImage(1);
        if (e.key === "Escape") closeLightbox();
    }
});

// --- 7. SECRETO (5 CLICKS) ---
let clickCount = 0;
let clickTimer;
const profilePic = document.getElementById('secret-trigger');

if (profilePic) {
    profilePic.addEventListener('click', () => {
        clickCount++;
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => { clickCount = 0; }, 1000); 

        if (clickCount === 5) {
            window.location.href = 'secret.html'; 
        }
    });
}
