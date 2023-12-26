// Agregaremos el script para mostrar la hora y el momento del día

document.addEventListener("DOMContentLoaded", function () {
    // Esta función se ejecutará cuando el DOM esté completamente cargado

    function updateClock() {
        const timeOfDayElement = document.getElementById('time-of-day');
        const currentTimeElement = document.getElementById('current-time');
        const body = document.body;

        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        // Determinar el momento del día
        let timeOfDay;
        let gradientColors;
        
        if (hours >= 5 && hours < 7) {
            timeOfDay = 'Dawn';
            gradientColors = ['#f4e5cb', '#9dc3c1'];
        } else if (hours >= 7 && hours < 9) {
            timeOfDay = 'Sunrise';
            gradientColors = ['#f7d08a', '#f8d596', '#f9d5a3'];
        } else if (hours >= 9 && hours < 12) {
            timeOfDay = 'Morning';
            gradientColors = ['#a0ced9', '#87bdd8', '#6aa9cf'];
        } else if (hours >= 12 && hours < 15) {
            timeOfDay = 'Midday';
            gradientColors = ['#f2897b', '#f18b7f', '#f18d83'];
        } else if (hours >= 15 && hours < 18) {
            timeOfDay = 'Afternoon';
            gradientColors = ['#e07a5f', '#e28571', '#e39084'];
        } else if (hours >= 18 && hours < 20) {
            timeOfDay = 'Dusk';
            gradientColors = ['#e07a5f', '#e28571', '#e39084']; // Los colores son iguales a los del atardecer por ahora
        } else if (hours >= 20 && hours < 22) {
            timeOfDay = 'Night';
            gradientColors = ['#33334c', '#404066', '#4d4d80'];
        } else if (hours >= 22 || hours < 5) {
            timeOfDay = 'Midnight';
            gradientColors = ['#0a0a0a', '#262626', '#404040'];
        }

        // Actualizar elementos en la página
        timeOfDayElement.textContent = `Time of Day:\n${timeOfDay}`;
        currentTimeElement.textContent = `Current Time:\n${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;

        applyGradientBackground(body, gradientColors);

        // Actualizar cada segundo
        setTimeout(updateClock, 1000);
    }

    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    function applyGradientBackground(element, colors) {
        const gradientStyle = `linear-gradient(to bottom, ${colors[0]}, ${colors[1]})`;
        element.style.transition = 'background 10s linear';
        element.style.background = gradientStyle;
    }

    // Iniciar la actualización del reloj al cargar la página
    updateClock();
});
