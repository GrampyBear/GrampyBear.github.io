const sky = document.getElementById('sky-background');
const infoLabel = document.getElementById('info-label');
const timeDisplay = document.getElementById('time-display');
const starsCanvas = document.getElementById('stars-canvas');

// --- CONFIGURACIÓN DE COLORES POR HORA (3 colores por fase) ---
const schedule = [
    { h: 0,  c: ["#020111", "#191970", "#000000"], name: "Midnight" },
    { h: 5,  c: ["#2c3e50", "#fd746c", "#ff9068"], name: "Dawn" },
    { h: 8,  c: ["#2193b0", "#6dd5ed", "#ffffff"], name: "Morning" },
    { h: 12, c: ["#1c92d2", "#f2fcfe", "#1c92d2"], name: "Midday" },
    { h: 16, c: ["#4facfe", "#00f2fe", "#fdfbfb"], name: "Afternoon" },
    { h: 19, c: ["#4b6cb7", "#182848", "#f093fb"], name: "Sunset" },
    { h: 21, c: ["#0f2027", "#203a43", "#2c5364"], name: "Dusk" },
    { h: 23, c: ["#050505", "#0b1026", "#1c1c1c"], name: "Night" }
];

// --- SISTEMA ESTACIONAL ---
function getSeasonData() {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return { name: "SPRING", leafColor: "#a3d9a5" };
    if (month >= 5 && month <= 7) return { name: "SUMMER", leafColor: "#32a852" };
    if (month >= 8 && month <= 10) return { name: "AUTUMN", leafColor: "#d97a1a" };
    return { name: "WINTER", leafColor: "#ffffff" }; // Nieve en invierno
}

// --- UTILIDAD DE MEZCLA (Interpolación) ---
function lerpColor(a, b, amount) {
    const ah = parseInt(a.replace(/#/g, ''), 16),
          ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
          bh = parseInt(b.replace(/#/g, ''), 16),
          br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
          rr = ar + amount * (br - ar),
          rg = ag + amount * (bg - ag),
          rb = ab + amount * (bb - ab);
    return '#' + ((1 << 24) + (Math.round(rr) << 16) + (Math.round(rg) << 8) + Math.round(rb)).toString(16).slice(1);
}

function updateAtmosphere() {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const totalMin = h * 60 + m;
    
    timeDisplay.innerText = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    // Encontrar fases actual y siguiente
    let currentIdx = 0;
    for(let i=0; i<schedule.length; i++) {
        if (h >= schedule[i].h) currentIdx = i;
    }
    const nextIdx = (currentIdx + 1) % schedule.length;
    
    const curr = schedule[currentIdx];
    const next = schedule[nextIdx];

    // Calcular progreso entre fases
    const startMin = curr.h * 60;
    let endMin = next.h * 60;
    if (endMin <= startMin) endMin += 1440;
    const progress = (totalMin >= startMin) ? (totalMin - startMin) / (endMin - startMin) : (totalMin + 1440 - startMin) / (endMin - startMin);

    // Interpolar los 3 colores
    const color1 = lerpColor(curr.c[0], next.c[0], progress);
    const color2 = lerpColor(curr.c[1], next.c[1], progress);
    const color3 = lerpColor(curr.c[2], next.c[2], progress);

    sky.style.background = `linear-gradient(180deg, ${color1} 0%, ${color2} 50%, ${color3} 100%)`;
    
    // Visibilidad de estrellas
    starsCanvas.style.opacity = (h >= 20 || h <= 5) ? "1" : "0";
    
    const season = getSeasonData();
    infoLabel.innerText = `${curr.name.toUpperCase()} | ${season.name}`;
}

// --- SISTEMA DE ESTRELLAS ---
function drawStars() {
    const ctx = starsCanvas.getContext('2d');
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;
    for(let i=0; i<200; i++) {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(Math.random()*starsCanvas.width, Math.random()*starsCanvas.height, Math.random()*1.5, 0, Math.PI*2);
        ctx.fill();
    }
}

// --- GENERADOR DE HOJAS CON VIENTO ---
function createLeaf() {
    const container = document.getElementById('leaf-container');
    const leaf = document.createElement('div');
    const season = getSeasonData();
    
    leaf.className = 'leaf';
    leaf.style.background = season.leafColor;
    leaf.style.left = Math.random() * 100 + "vw";
    
    const duration = 8 + Math.random() * 7;
    const windDirection = Math.random() > 0.5 ? 200 : -200; // Izquierda o Derecha
    
    leaf.style.animationDuration = duration + "s";
    leaf.style.setProperty('--wind', windDirection + "px");
    leaf.style.width = leaf.style.height = (5 + Math.random() * 10) + "px";

    container.appendChild(leaf);
    setTimeout(() => leaf.remove(), duration * 1000);
}

// Inicialización
window.addEventListener('resize', drawStars);
drawStars();
updateAtmosphere();
setInterval(updateAtmosphere, 60000); // Actualiza cada minuto
setInterval(createLeaf, 600);

document.getElementById('exit-btn').onclick = () => window.location.href = "index.html";
