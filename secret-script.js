const body = document.body;
const flashlight = document.getElementById('flashlight');
const lightSwitch = document.getElementById('light-switch');

// Movimiento de linterna
document.addEventListener('mousemove', (e) => {
    flashlight.style.setProperty('--x', e.clientX + 'px');
    flashlight.style.setProperty('--y', e.clientY + 'px');
});

// Lógica del interruptor
lightSwitch.addEventListener('click', () => {
    body.classList.toggle('light-on');
    // Simular un pequeño tirón visual
    lightSwitch.style.transform = 'translateY(10px)';
    setTimeout(() => lightSwitch.style.transform = 'translateY(0)', 100);
});

// Botón de pánico mejorado
document.getElementById('exit-btn').addEventListener('click', () => {
    // Intenta cerrar la ventana
    window.close();
    // Si falla (por seguridad del navegador), redirige a algo inocuo
    setTimeout(() => {
        window.location.href = "https://www.google.com/search?q=winter+landscapes";
    }, 200);
});
