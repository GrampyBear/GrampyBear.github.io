// Mover la "luz" con el mouse
document.addEventListener('mousemove', (e) => {
    const flashlight = document.getElementById('flashlight');
    flashlight.style.setProperty('--x', e.clientX + 'px');
    flashlight.style.setProperty('--y', e.clientY + 'px');
});

// Botón de pánico (Cerrar pestaña)
document.getElementById('exit-btn').addEventListener('click', () => {
    // Nota: Por seguridad, la mayoría de navegadores solo permiten 
    // cerrar pestañas con JS si fueron abiertas mediante un link previo.
    // De lo contrario, redirige a Google como "salida de emergencia".
    window.close();
    
    // Respaldo por si window.close() es bloqueado:
    setTimeout(() => {
        window.location.href = "https://www.google.com";
    }, 100);
});
