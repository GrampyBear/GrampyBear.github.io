/**
 * KUMOJIISANKO - OFFICIAL SITE SCRIPT 2026
 */

const titles = ["Kumojiisanko", "くもじいさんこ"];
const welcomePhrases = [
    "Welcome to my winter corner.",
    "Enjoy the visit!",
    "It's snowing a lot, bundle up!",
    "Beautiful weather, isn't it?",
    "Make yourself at home in this cold season.",
    "Thanks for stopping by!",
    "ようこそ",
    "モノクロームのキャンバス？",
    "愛は残酷だ",
    "Winter is beautiful",
    "Watch out, the ink is still wet.",
    "A fat dragon and a fat bear",
    "Love is Cruel",
    "物語の始まり",
    "Im Fat hehe"
];

//64x64
const favicons = [
    "https://raw.githubusercontent.com/GrampyBear/GrampyBear.github.io/8d9dcff52f43b28b0fc3a6139f9a305339bc1e51/Snowflake.png",
    "https://raw.githubusercontent.com/GrampyBear/GrampyBear.github.io/8d9dcff52f43b28b0fc3a6139f9a305339bc1e51/Cloud.png"
];

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
        setTimeout(() => {
            executePageSwitch(currentPage, nextPage);
        }, 500);
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
    setTimeout(() => {
        newPage.classList.add('active');
    }, 20);
    applyRandomElements();
    window.scrollTo(0, 0);
};

const applyRandomElements = () => {
    const titleElem = document.getElementById('main-title');
    if (titleElem) titleElem.innerText = titles[Math.floor(Math.random() * titles.length)];
    
    const phraseElem = document.getElementById('welcome-phrase');
    if (phraseElem) phraseElem.innerText = welcomePhrases[Math.floor(Math.random() * welcomePhrases.length)];

    const favElem = document.getElementById('dynamic-favicon');
    if (favElem) favElem.href = favicons[Math.floor(Math.random() * favicons.length)];
};

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

// --- SISTEMA DE SECRETO (5 CLICKS) ---
let clickCount = 0;
let clickTimer;

const profilePic = document.getElementById('secret-trigger');

if (profilePic) {
    profilePic.addEventListener('click', () => {
        clickCount++;
        
        // Reinicia el contador si el usuario tarda mucho entre clics
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
            clickCount = 0;
        }, 1000); 

        // Al llegar a 5 clics...
        if (clickCount === 5) {
            // Cambia 'secreto.html' por el nombre exacto de tu archivo
            window.location.href = 'secret.html'; 
        }
    });
}



// --- CONFIGURACIÓN MANUAL DEL ARTISTA ---
const commissionStatus = "open"; // Cambia a "closed" cuando quieras
// ----------------------------

function initCommissions() {
    const statusEl = document.getElementById('commission-status');
    if (statusEl) {
        // Limpiamos clases previas para evitar conflictos
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

// Asegúrate de que el DOM esté listo
document.addEventListener('DOMContentLoaded', initCommissions);

// Función para abrir la imagen en grande
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    if (lightbox && lightboxImg) {
        lightboxImg.src = src;
        lightbox.style.display = 'flex';
        // Bloquear scroll del body al estar abierto
        document.body.style.overflow = 'hidden';
    }
}

// Función para cerrar el Lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        // Devolver scroll al body
        document.body.style.overflow = 'auto';
    }
}

// Cerrar con la tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeLightbox();
});

function moveCarousel(trackId, step) {
    const track = document.getElementById(trackId);
    const images = track.getElementsByClassName('preview-img');
    let currentIndex = 0;

    // Encontrar cuál imagen se está mostrando actualmente
    for (let i = 0; i < images.length; i++) {
        if (images[i].style.display !== 'none') {
            currentIndex = i;
            images[i].style.display = 'none';
            break;
        }
    }

    // Calcular el siguiente índice (infinito)
    let nextIndex = (currentIndex + step + images.length) % images.length;
    
    // Mostrar la nueva imagen
    images[nextIndex].style.display = 'block';
    // Asegurar que mantenga el ajuste de bordes
    images[nextIndex].style.width = '100%';
    images[nextIndex].style.height = '100%';
    images[nextIndex].style.objectFit = 'cover';
}
