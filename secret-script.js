const body = document.body;
const flashlight = document.getElementById('flashlight');
const pullChain = document.getElementById('light-switch');

// Seguimiento de linterna
document.addEventListener('mousemove', (e) => {
    flashlight.style.setProperty('--x', e.clientX + 'px');
    flashlight.style.setProperty('--y', e.clientY + 'px');
});

// Mecanismo de la luz cenital
pullChain.addEventListener('click', () => {
    body.classList.toggle('light-on');
    
    // Pequeño efecto visual de tirón
    pullChain.style.transform = 'translateY(15px)';
    setTimeout(() => {
        pullChain.style.transform = 'translateY(0)';
    }, 150);
});

// Cerrar habitación
document.getElementById('exit-btn').addEventListener('click', () => {
    window.location.href = "index.html"; // Regresa al sitio principal por seguridad
});
