/**
 * SISTEMA DE NAVEGACIÓN Y EFECTOS INVERNALES - Kumojiisanko
 */

// 1. Configuración de la Nieve
function createSnow() {
    const container = document.getElementById('snow-container');
    if (!container) return;

    // Detectar si es móvil para optimizar rendimiento
    const isMobile = window.innerWidth < 768;
    const snowCount = isMobile ? 30 : 70; // Menos nieve en móviles

    // Limpiar nieve existente si se llama en un resize
    container.innerHTML = '';

    for (let i = 0; i < snowCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        
        // Atributos aleatorios para naturalidad
        const size = Math.random() * 4 + 2 + 'px';
        const leftPosition = Math.random() * 100 + '%';
        const fallDuration = Math.random() * 4 + 4 + 's'; // Velocidad de caída
        const fallDelay = Math.random() * 5 + 's';
        const opacity = Math.random() * 0.7 + 0.3;

        // Aplicar estilos
        snowflake.style.width = size;
        snowflake.style.height = size;
        snowflake.style.left = leftPosition;
        snowflake.style.opacity = opacity;
        snowflake.style.animationDuration = fallDuration;
        snowflake.style.animationDelay = fallDelay;
        
        // Posición inicial fuera de pantalla arriba
        snowflake.style.top = '-10px';

        container.appendChild(snowflake);
    }
}

// 2. Lógica de Navegación por Hash (#)
function handleNavigation() {
    // Obtener la página desde la URL (ej: #about), por defecto #home
    const hash = window.location.hash || '#home';
    const targetId = hash.substring(1); 
    
    const pages = document.querySelectorAll('.page');
    const body = document.body;

    // Ocultar todas las páginas
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Activar la página correspondiente
    const activePage = document.getElementById(targetId);
    
    if (activePage) {
        activePage.classList.add('active');

        // --- CONTROL DE SCROLL ---
        // Solo permitimos scroll en "Home". En "About" y "Fanbox" lo bloqueamos.
        if (targetId === 'home') {
            body.classList.remove('lock-scroll');
            body.classList.add('allow-scroll');
        } else {
            body.classList.remove('allow-scroll');
            body.classList.add('lock-scroll');
            // Resetear el scroll al inicio para que no se quede a medias al cambiar
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } else {
        // Redirigir a home si el hash es inválido
        window.location.hash = '#home';
    }
}

// 3. Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar nieve
    createSnow();
    
    // Iniciar navegación
    handleNavigation();
});

// 4. Listeners de Eventos
// Escuchar cuando el usuario cambia la URL (clics en menú o botones atrás/adelante)
window.addEventListener('hashchange', handleNavigation);

// Re-calcular nieve si se cambia el tamaño de la ventana (opcional)
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        createSnow();
    }, 250);
});

/**
 * Nota: Este script asume que en tu CSS existen las clases:
 * .snowflake { ... }
 * .page.active { display: flex; ... }
 * body.lock-scroll { overflow: hidden; }
 * body.allow-scroll { overflow-y: auto; }
 */
