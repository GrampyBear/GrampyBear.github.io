function showPage(pageId) {
    // 1. Buscamos todas las secciones con la clase 'page'
    const pages = document.querySelectorAll('.page');
    
    // 2. Las ocultamos todas
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // 3. Mostramos solo la que nos interesa
    const activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.classList.add('active');
        // Opcional: Volver al inicio del scroll al cambiar
        window.scrollTo(0, 0);
    }
}

// Inicializar la página en 'home' al cargar
document.addEventListener('DOMContentLoaded', () => {
    showPage('home');
});
