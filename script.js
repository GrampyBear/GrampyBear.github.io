function showPage(pageId) {
    // Seleccionar todas las páginas
    const pages = document.querySelectorAll('.page');
    
    // Ocultar todas
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Mostrar la seleccionada
    const activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.classList.add('active');
    }
}

// Asegurar que carga la Home al inicio
window.onload = () => showPage('home');
