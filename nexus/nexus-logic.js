const cards = document.querySelectorAll('.card');
const body = document.body;

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (card.classList.contains('my-work')) {
            body.style.backgroundColor = "#0a121a"; // Tono frío
        } else {
            body.style.backgroundColor = "#1a0a0a"; // Tono cálido
        }
    });

    card.addEventListener('mouseleave', () => {
        body.style.backgroundColor = "#0d0d0d"; // Volver al neutro
    });
});
