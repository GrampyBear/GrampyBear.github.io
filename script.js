const createSnow = () => {
    const container = document.getElementById('snow-container');
    const snowCount = window.innerWidth < 768 ? 25 : 65;
    container.innerHTML = '';

    for (let i = 0; i < snowCount; i++) {
        const flake = document.createElement('div');
        flake.className = 'snowflake';
        const size = Math.random() * 4 + 2 + 'px';
        flake.style.width = size;
        flake.style.height = size;
        flake.style.left = Math.random() * 100 + '%';
        flake.style.opacity = Math.random() * 0.8;
        flake.style.animationDuration = Math.random() * 3 + 4 + 's';
        flake.style.animationDelay = Math.random() * 5 + 's';
        flake.style.top = '-10px';
        container.appendChild(flake);
    }
};

const handleRoute = () => {
    const hash = window.location.hash || '#home';
    const target = hash.substring(1);
    const pages = document.querySelectorAll('.page');
    
    pages.forEach(p => p.classList.remove('active'));

    const activePage = document.getElementById(target);
    if (activePage) {
        activePage.classList.add('active');
        
        // Bloqueo de scroll inteligente
        if (target === 'home') {
            document.body.className = 'allow-scroll';
        } else {
            // Solo bloqueamos scroll en pantallas que no sean móviles pequeños
            if (window.innerWidth > 768) {
                document.body.className = 'lock-scroll';
            } else {
                document.body.className = 'allow-scroll';
            }
            window.scrollTo(0, 0);
        }
    }
};

window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', () => {
    createSnow();
    handleRoute();
});
window.addEventListener('resize', createSnow);
