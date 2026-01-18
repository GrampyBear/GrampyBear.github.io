const sky = document.getElementById('sky-background');
const infoLabel = document.getElementById('info-label');
const timeDisplay = document.getElementById('time-display');
const moon = document.getElementById('moon');

// Definición de colores simplificada para evitar errores de cálculo
const schedule = [
    { h: 0,  c: ["#020111", "#191970", "#000000"], label: "Midnight" },
    { h: 5,  c: ["#2c3e50", "#fd746c", "#ff9068"], label: "Dawn" },
    { h: 8,  c: ["#2193b0", "#6dd5ed", "#ffffff"], label: "Morning" },
    { h: 12, c: ["#1c92d2", "#f2fcfe", "#1c92d2"], label: "Midday" },
    { h: 16, c: ["#4facfe", "#00f2fe", "#fdfbfb"], label: "Afternoon" },
    { h: 18, c: ["#e65245", "#e43a15", "#f093fb"], label: "Sunset" },
    { h: 20, c: ["#0f2027", "#203a43", "#2c5364"], label: "Dusk" },
    { h: 22, c: ["#050505", "#0b1026", "#1c1c1c"], label: "Night" }
];

function updateAtmosphere() {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    
    // Reloj
    timeDisplay.innerText = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false});

    // Buscar el estado actual basado en la hora
    let state = schedule[schedule.length - 1]; // Por defecto la última (noche)
    for (let i = 0; i < schedule.length; i++) {
        if (h >= schedule[i].h) {
            state = schedule[i];
        }
    }

    // Aplicar el degradado
    sky.style.background = `linear-gradient(180deg, ${state.c[0]} 0%, ${state.c[1]} 50%, ${state.c[2]} 100%)`;
    
    // Noche: Estrellas y Luna
    const isDark = (h >= 20 || h <= 5);
    document.getElementById('stars-container').style.opacity = isDark ? "1" : "0";
    moon.style.opacity = isDark ? "0.8" : "0";

    // Info Estacional
    const months = ["Winter", "Winter", "Spring", "Spring", "Spring", "Summer", "Summer", "Summer", "Autumn", "Autumn", "Autumn", "Winter"];
    infoLabel.innerText = `${state.label.toUpperCase()} — ${months[now.getMonth()].toUpperCase()}`;
}

// Crear Estrellas
function initStars() {
    const container = document.getElementById('stars-container');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = star.style.height = Math.random() * 3 + 'px';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.animationDelay = Math.random() * 3 + 's';
        container.appendChild(star);
    }
}

// Hojas Dinámicas
function createLeaf() {
    const container = document.getElementById('leaf-container');
    const leaf = document.createElement('div');
    const month = new Date().getMonth();
    
    // Color según estación
    let color = "#ffffff"; // Invierno
    if (month >= 2 && month <= 4) color = "#a3d9a5"; // Primavera
    if (month >= 5 && month <= 7) color = "#32a852"; // Verano
    if (month >= 8 && month <= 10) color = "#d97a1a"; // Otoño

    leaf.className = 'leaf';
    leaf.style.background = color;
    leaf.style.left = Math.random() * 100 + "vw";
    
    const duration = 7 + Math.random() * 8;
    const wind = (Math.random() - 0.5) * 400; // Izquierda o Derecha al azar
    
    leaf.style.width = leaf.style.height = (8 + Math.random() * 10) + "px";
    leaf.style.animationDuration = duration + "s";
    leaf.style.setProperty('--wind', `${wind}px`);

    container.appendChild(leaf);
    setTimeout(() => leaf.remove(), duration * 1000);
}

// Iniciar
initStars();
updateAtmosphere();
setInterval(updateAtmosphere, 1000); // Check cada segundo por si cambia la hora
setInterval(createLeaf, 500); // Hoja cada medio segundo

document.getElementById('exit-btn').onclick = () => window.location.href = "index.html";
