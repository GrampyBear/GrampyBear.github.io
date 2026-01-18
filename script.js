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
    "Thanks for stopping by!"
];
const favicons = [
    "https://raw.githubusercontent.com/GrampyBear/GrampyBear.github.io/8d9dcff52f43b28b0fc3a6139f9a305339bc1e51/Snowflake.png",
    "https://raw.githubusercontent.com/GrampyBear/GrampyBear.github.io/8d9dcff52f43b28b0fc3a6139f9a305339bc1e51/Cloud.png"
];

// Generador de nieve
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

// Navegación con efecto Fade In / Out
const handleRoute = () => {
    const hash = window.location.hash || '#home';
    const targetId = hash.substring(1);
    const currentPage = document.querySelector('.page.active');
    const nextPage = document.getElementById(targetId);

    if (!nextPage) {
        window.location.hash = '#home';
        return;
    }

    // Si ya hay una página activa, hacemos el Fade Out antes de cambiar
    if (currentPage && currentPage !== nextPage) {
        currentPage.classList.add('fading-out');
        
        // Esperamos 500ms (tiempo de la transición CSS) para cambiar de página
        setTimeout(() => {
            executePageSwitch(currentPage, nextPage);
        }, 500);
    } else {
        // Primera carga o misma página
        executePageSwitch(null, nextPage);
    }
};

// Función interna para realizar el cambio físico de los elementos
const executePageSwitch = (oldPage, newPage) => {
    const pages = document.querySelectorAll('.page');
    
    // Limpieza total
    pages.forEach(p => {
        p.classList.remove('active', 'fading-out');
        p.style.display = 'none';
    });

    // Activar nueva página
    newPage.style.display = 'block';
    
    // Pequeño retardo para que el navegador procese el block antes del cambio de opacidad
    setTimeout(() => {
        newPage.classList.add('active');
    }, 20);

    // Aplicar elementos aleatorios y subir al inicio
    applyRandomElements();
    window.scrollTo(0, 0);
};

// Aplicar textos e icono aleatorio
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
