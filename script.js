/**
 * KUMOJIISANKO - OFFICIAL SITE SCRIPT 2026
 * Features: Snow, Navigation, Random Texts, Dynamic Favicon.
 */

// 1. CONFIGURACIÓN DE DATOS ALEATORIOS
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

// 2. GENERADOR DE NIEVE (Editado para aumentar cantidad)
const createSnow = () => {
    const container = document.getElementById('snow-container');
    if (!container) return;
    
    const isMobile = window.innerWidth < 768;
    // Aumentamos: de 25 a 45 en móvil, y de 65 a 110 en PC
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
        
        // Aumentamos el rango de tiempo (de 4 a 10 segundos) para que no caigan todos al mismo tiempo
        flake.style.animationDuration = Math.random() * 6 + 4 + 's'; 
        flake.style.animationDelay = Math.random() * 8 + 's'; // Más retraso inicial para que aparezcan gradualmente
        flake.style.top = '-10px';
        
        container.appendChild(flake);
    }
};

// 3. APLICAR ELEMENTOS ALEATORIOS (Textos e Icono)
const applyRandomElements = () => {
    // Título principal (Romaji/Hiragana)
    const titleElement = document.getElementById('main-title');
    if (titleElement) {
        titleElement.innerText = titles[Math.floor(Math.random() * titles.length)];
    }

    // Frase de bienvenida
    const phraseElement = document.getElementById('welcome-phrase');
    if (phraseElement) {
        phraseElement.innerText = welcomePhrases[Math.floor(Math.random() * welcomePhrases.length)];
    }

    // Icono de la pestaña (Favicon)
    const faviconElement = document.getElementById('dynamic-favicon');
    if (faviconElement) {
        faviconElement.href = favicons[Math.floor(Math.random() * favicons.length)];
    }
};

// 4. CONTROLADOR DE NAVEGACIÓN Y RUTAS
const handleRoute = () => {
    const hash = window.location.hash || '#home';
    const target = hash.substring(1);
    const pages = document.querySelectorAll('.page');
    const body = document.body;

    // Desactivar todas las páginas
    pages.forEach(p => p.classList.remove('active'));

    const activePage = document.getElementById(target);
    if (activePage) {
        activePage.classList.add('active');
        
        // Ejecutar cambios aleatorios en cada navegación
        applyRandomElements();

        // Gestión de Scroll: Bloquear en estáticas, permitir en Home
        if (target === 'home') {
            body.className = 'allow-scroll';
        } else {
            // Solo bloqueamos scroll en PC para asegurar que en móvil nada se corte
            if (window.innerWidth > 768) {
                body.className = 'lock-scroll';
            } else {
                body.className = 'allow-scroll';
            }
            window.scrollTo(0, 0);
        }
    } else {
        // Si el link no existe, forzar regreso a home
        window.location.hash = '#home';
    }
};

// 5. INICIALIZACIÓN Y EVENTOS
window.addEventListener('hashchange', handleRoute);

window.addEventListener('load', () => {
    createSnow();
    handleRoute();
});

// Re-calcular nieve si el usuario cambia el tamaño de la ventana
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(createSnow, 250);
});
