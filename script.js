/**
 * KUMOJIISANKO - OFFICIAL SITE SCRIPT 2026
 */

// 1. CONFIGURACIÓN
const titles = ["Kumojiisanko", "くもじいさんこ"];
const welcomePhrases = [
    "Welcome to my winter corner.",
    "Enjoy the visit!",
    "It's snowing a lot, bundle up!",
    "Beautiful weather, isn't it?",
    "Make yourself at home in this cold season.",
    "Thanks for stopping by!"
];
const favicons = [
    "https://raw.githubusercontent.com/GrampyBear/GrampyBear.github.io/8d9dcff52f43b28b0fc3a6139f9a305339bc1e51/Snowflake.png",
    "https://raw.githubusercontent.com/GrampyBear/GrampyBear.github.io/8d9dcff52f43b28b0fc3a6139f9a305339bc1e51/Cloud.png"
];

// 2. NIEVE
const createSnow = () => {
    const container = document.getElementById('snow-container');
    if (!container) return;
    const isMobile = window.innerWidth < 768;
    const snowCount = isMobile ? 45 : 110;
    container.innerHTML = ''; 

    for (let i = 0; i < snowCount; i++) {
        const flake = document.createElement('div');
        flake.className = 'snowflake';
        const size = Math.random() * 4 + 2 + 'px';
        flake.style.width = size;
        flake.style.height = size;
        flake.style.left = Math.random() * 100 + '%';
        flake.style.opacity = Math.random() * 0.8;
        flake.style.animationDuration = Math.random() * 6 + 4 + 's'; 
        flake.style.animationDelay = Math.random() * 8 + 's';
        flake.style.top = '-10px';
        container.appendChild(flake);
    }
};

// 3. ELEMENTOS ALEATORIOS
const applyRandomElements = () => {
    const titleElement = document.getElementById('main-title');
    if (titleElement) titleElement.innerText = titles[Math.floor(Math.random() * titles.length)];

    const phraseElement = document.getElementById('welcome-phrase');
    if (phraseElement) phraseElement.innerText = welcomePhrases[Math.floor(Math.random() * welcomePhrases.length)];

    const faviconElement = document.getElementById('dynamic-favicon');
    if (faviconElement) faviconElement.href = favicons[Math.floor(Math.random() * favicons.length)];
};

// 4. NAVEGACIÓN (Scroll Natural)
const handleRoute = () => {
    const hash = window.location.hash || '#home';
    const target = hash.substring(1);
    const pages = document.querySelectorAll('.page');
    
    pages.forEach(p => p.classList.remove('active'));

    const activePage = document.getElementById(target);
    if (activePage) {
        activePage.classList.add('active');
        applyRandomElements();
        
        // Al cambiar de sección, siempre volvemos arriba para ver el contenido
        window.scrollTo(0, 0);
    } else {
        window.location.hash = '#home';
    }
};

// 5. INICIALIZACIÓN
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
