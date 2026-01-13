document.addEventListener('DOMContentLoaded', () => {
    console.log("Kumojiisanko's website is ready!");
    
    // Animación simple al hacer scroll
    const cards = document.querySelectorAll('.card');
    window.addEventListener('scroll', () => {
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if(cardTop < window.innerHeight - 100) {
                card.style.opacity = '1';
            }
        });
    });
});
