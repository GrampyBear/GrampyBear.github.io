function setupAbyssalCarousel() {
    const images = document.querySelectorAll('.abyssal-prev-img');
    let currentIndex = 0;

    if (images.length <= 1) return;

    setInterval(() => {
        images[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].style.display = 'block';
    }, 3000); // Cambia cada 3 segundos
}

document.addEventListener('DOMContentLoaded', setupAbyssalCarousel);

// Función para el Lightbox (asegúrate de tener el HTML del lightbox también)
function openLightbox(src, className) {
    // Aquí puedes copiar la lógica que ya usas en tu index.html
    console.log("Opening image: " + src);
}
