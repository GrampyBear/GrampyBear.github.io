/**
 * Control de navegación Kumojiisanko
 * Maneja el cambio de secciones basado en el Hash (#) de la URL
 */

function handleNavigation() {
    // Obtener el ID de la URL (ej: #fanbox), por defecto #home
    const hash = window.location.hash || '#home';
    const targetId = hash.substring(1); // Quitar el símbolo '#'

    // Seleccionar todas las páginas
    const pages = document.querySelectorAll('.page');
    
    // Ocultar todas las páginas
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Mostrar la página objetivo
    const activePage = document.getElementById(targetId);
    if (activePage) {
        activePage.classList.add('active');
    } else {
        // Si el hash es inválido, volver a home
        document.getElementById('home').classList.add('active');
    }
}

// Escuchar cambios en la URL (al presionar atrás/adelante o clics en anclas)
window.addEventListener('hashchange', handleNavigation);

// Ejecutar al cargar la página por primera vez
window.addEventListener('DOMContentLoaded', handleNavigation);
