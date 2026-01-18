// --- CONFIGURACIÓN DE COLORES ---
// Cada fase define los 3 colores (Arriba, Medio, Abajo)
const dayCycle = [
    { time: 0,    name: "Midnight",  colors: ["#020111", "#191970", "#000000"] },
    { time: 300,  name: "Dawn",      colors: ["#2c3e50", "#fd746c", "#ff9068"] },
    { time: 480,  name: "Morning",   colors: ["#2193b0", "#6dd5ed", "#e2e2e2"] },
    { time: 720,  name: "Midday",    colors: ["#1c92d2", "#f2fcfe", "#1c92d2"] },
    { time: 960,  name: "Afternoon", colors: ["#4facfe", "#00f2fe", "#fdfbfb"] },
    { time: 1080, name: "Sunset",    colors: ["#e65245", "#e43a15", "#f093fb"] },
    { time: 1260, name: "Dusk",      colors: ["#0f2027", "#203a43", "#2c5364"] },
    { time: 1380, name: "Night",     colors: ["#050505", "#0b1026", "#1c1c1c"] },
    { time: 1440, name: "Midnight",  colors: ["#020111", "#191970", "#000000"] } // Ciclo completo
];

// Función para mezclar dos colores Hexadecimales
function lerpColor(c1, c2, f) {
    const r1 = parseInt(c1.substring(1, 3), 16);
    const g1 = parseInt(c1.substring(3, 5), 16);
    const b1 = parseInt(c1.substring(5, 7), 16);

    const r2 = parseInt(c2.substring(1, 3), 16);
    const g2 = parseInt(c2.substring(3, 5), 16);
    const b2 = parseInt(c2.substring(5, 7), 16);

    const r = Math.round(r1 + (r2 - r1) * f);
    const g = Math.round(g1 + (g2 - g1) * f);
    const b = Math.round(b1 + (b2 - b1) * f);

    return `rgb(${r}, ${g}, ${b})`;
}

function updateSky() {
    const now = new Date();
    const totalMinutes = now.getHours() * 60 + now.getMinutes();
    const seconds = now.getSeconds();
    const preciseMinutes = totalMinutes + (seconds / 60);

    document.getElementById('clock').innerText = now.toLocaleTimeString();

    // Encontrar entre qué dos fases estamos
    let start, end;
    for (let i = 0; i < dayCycle.length - 1; i++) {
        if (preciseMinutes >= dayCycle[i].time && preciseMinutes <= dayCycle[i + 1].time) {
            start = dayCycle[i];
            end = dayCycle[i + 1];
            break;
        }
    }

    // Calcular factor de mezcla (0 a 1)
    const factor = (preciseMinutes - start.time) / (end.time - start.time);

    // Interpolar los 3 colores del degradado
    const cTop = lerpColor(start.colors[0], end.colors[0], factor);
    const cMid = lerpColor(start.colors[1], end.colors[1], factor);
    const cBot = lerpColor(start.colors[2], end.colors[2], factor);

    document.getElementById('sky-layer').style.background = 
        `linear-gradient(180deg, ${cTop} 0%, ${cMid} 50%, ${cBot} 100%)`;

    document.getElementById('phase-tag').innerText = start.name;

    // Control de estrellas: solo visibles de noche
    const hour = now.getHours();
    const isDark = (hour >= 20 || hour <= 5);
    document.getElementById('stars-container').style.opacity = isDark ? "0.6" : "0";
}

// Estrellas fijas
function createStars() {
    const container = document.getElementById('stars-container');
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2 + 1;
        star.style.width = star.style.height = `${size}px`;
        star.style.top = Math.random() * 100 + "vh";
        star.style.left = Math.random() * 100 + "vw";
        star.style.setProperty('--t', (2 + Math.random() * 4) + "s");
        container.appendChild(star);
    }
}

// Hojas con viento
function createLeaf() {
    const container = document.getElementById('leaf-container');
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    
    // Estación actual
    const month = new Date().getMonth();
    let color = "#fff"; // Invierno (Enero)
    let season = "WINTER";
    if (month >= 2 && month <= 4) { color = "#a8e6cf"; season = "SPRING"; }
    else if (month >= 5 && month <= 7) { color = "#dcedc1"; season = "SUMMER"; }
    else if (month >= 8 && month <= 10) { color = "#ffd3b6"; season = "AUTUMN"; }

    document.getElementById('season-tag').innerText = season;

    leaf.style.background = color;
    leaf.style.left = Math.random() * 100 + "vw";
    
    const wind = (Math.random() - 0.5) * 600; // Viento aleatorio
    const duration = 10 + Math.random() * 10;
    
    leaf.style.setProperty('--w', `${wind}px`);
    leaf.style.animationDuration = `${duration}s`;
    
    container.appendChild(leaf);
    setTimeout(() => leaf.remove(), duration * 1000);
}

// Inicializar
createStars();
updateSky();
setInterval(updateSky, 1000); // Actualización suave cada segundo
setInterval(createLeaf, 700);

document.getElementById('exit-btn').onclick = () => window.location.href = "index.html";
