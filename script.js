/**
 * Efecto de Nieve Dinámica
 */
function createSnow() {
    const container = document.getElementById('snow-container');
    const count = 50; // Número de copos

    for (let i = 0; i < count; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        
        // Atributos aleatorios
        const size = Math.random() * 4 + 2 + 'px';
        const left = Math.random() * 100 + '%';
        const duration = Math.random() * 5 + 5 + 's';
        const delay = Math.random() * 5 + 's';
        const opacity = Math.random();

        snowflake.style.width = size;
        snowflake.style.height = size;
        snowflake.style.left = left;
        snowflake.style.animationDuration = duration;
        snowflake.style.animationDelay = delay;
        snowflake.style.opacity = opacity;
        snowflake.style.top = '-10px';

        container.appendChild(snowflake);
    }
}

/**
 * Gestión de Navegación y Bloqueo de Scroll
 */
function handleNavigation() {
    const hash = window.location.hash || '#home';
    const targetId = hash.substring(1);
    const pages = document.querySelectorAll('.page');
    
    pages.forEach(page => page.classList.remove('active'));

    const activePage = document.getElementById(targetId);
    if (activePage) {
        activePage.classList.add('active');
        
        // Control del Scroll en el Body
        if (targetId === 'home') {
            document.body.classList.remove('lock-scroll');
            document.body.classList.add('allow-scroll');
        } else {
            document.body.classList.remove('allow-scroll');
            document.body.classList.add('lock-scroll');
            window.scrollTo(0, 0); // Resetear posición al bloquear
        }
    }
}

window.addEventListener('hashchange', handleNavigation);
window.addEventListener('DOMContentLoaded', () => {
    createSnow();
    handleNavigation();
});
