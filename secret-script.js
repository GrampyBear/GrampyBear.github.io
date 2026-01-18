const body = document.body;
const flashlight = document.getElementById('flashlight');
const chain = document.querySelector('.pull-chain');

// Movimiento de linterna (Efecto túnel)
document.addEventListener('mousemove', (e) => {
    flashlight.style.setProperty('--x', e.clientX + 'px');
    flashlight.style.setProperty('--y', e.clientY + 'px');
});

// Interruptor de Luz (80% Visibilidad)
chain.addEventListener('click', () => {
    body.classList.toggle('light-on');
    
    // Efecto físico de la cuerda
    chain.style.transform = 'translateY(25px)';
    setTimeout(() => {
        chain.style.transform = 'translateY(0)';
    }, 150);
});

// Botón de salida
document.getElementById('exit-btn').addEventListener('click', () => {
    // Redirección directa al home
    window.location.href = "index.html";
});

// Atajo de teclado: ESC para salir rápido
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        window.location.href = "index.html";
    }
});
