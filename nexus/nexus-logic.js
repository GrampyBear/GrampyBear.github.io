const cards = document.querySelectorAll('.card');
const body = document.body;

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (card.classList.contains('my-work')) {
            // Fondo para Hues of Heart (Verde Lima y Púrpura)
            body.style.backgroundColor = "#07000a"; 
            body.style.boxShadow = "inset 0 0 300px rgba(96, 0, 145, 0.5)";
        } else {
            // Fondo para Quantum Love Theory (Cian y Púrpura)
            body.style.backgroundColor = "#00050a";
            body.style.boxShadow = "inset 0 0 300px rgba(74, 20, 140, 0.5)";
        }
    });

    card.addEventListener('mouseleave', () => {
        // Volver al estado neutro
        body.style.backgroundColor = "#050505";
        body.style.boxShadow = "none";
    });
});
