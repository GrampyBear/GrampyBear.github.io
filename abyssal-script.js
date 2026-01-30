// Carrusel Automático
function initCarousel() {
    const images = document.querySelectorAll('.abyssal-img');
    let index = 0;

    if (images.length > 1) {
        setInterval(() => {
            images[index].style.display = 'none';
            index = (index + 1) % images.length;
            images[index].style.display = 'block';
        }, 3000);
    }
}

// Lógica de Lightbox
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    lightbox.style.display = 'flex';
    img.src = src;
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', initCarousel);
