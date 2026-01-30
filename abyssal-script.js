// Lista de imágenes para el Lightbox
const abyssalImages = [
    "https://raw.githubusercontent.com/GrampyBear/GrampyBear.github.io/e17f0fd90f5a0fefbd625d7233b495212e8bc206/abyssal/Sketch%20sheet.png",
    "https://raw.githubusercontent.com/GrampyBear/GrampyBear.github.io/e17f0fd90f5a0fefbd625d7233b495212e8bc206/abyssal/Sketch%20Comic%20Page.png",
    "https://raw.githubusercontent.com/GrampyBear/GrampyBear.github.io/e17f0fd90f5a0fefbd625d7233b495212e8bc206/abyssal/Sketch%20Comic%20Page%20again.png",
    "https://raw.githubusercontent.com/GrampyBear/GrampyBear.github.io/e17f0fd90f5a0fefbd625d7233b495212e8bc206/abyssal/Sketch%201.png",
    "https://raw.githubusercontent.com/GrampyBear/GrampyBear.github.io/e17f0fd90f5a0fefbd625d7233b495212e8bc206/abyssal/PFP.png"
];

let currentImgIndex = 0;

// Carrusel Automático en la tarjeta
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
    currentImgIndex = abyssalImages.indexOf(src);
    if (currentImgIndex === -1) currentImgIndex = 0;
    
    updateLightbox();
    document.getElementById('lightbox').style.display = 'flex';
}

function updateLightbox() {
    document.getElementById('lightbox-img').src = abyssalImages[currentImgIndex];
}

function changeLightboxImg(direction) {
    currentImgIndex += direction;
    if (currentImgIndex >= abyssalImages.length) currentImgIndex = 0;
    if (currentImgIndex < 0) currentImgIndex = abyssalImages.length - 1;
    updateLightbox();
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Cerrar Lightbox con la tecla Esc
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeLightbox();
    if (document.getElementById('lightbox').style.display === 'flex') {
        if (e.key === "ArrowRight") changeLightboxImg(1);
        if (e.key === "ArrowLeft") changeLightboxImg(-1);
    }
});

document.addEventListener('DOMContentLoaded', initCarousel);
