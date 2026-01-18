const sky = document.getElementById('sky-background');
const stateLabel = document.getElementById('state-label');
const timeDisplay = document.getElementById('time-display');

const timeStates = {
    midnight: { range: [0, 4], label: "MIDNIGHT", colors: ["#020111", "#191970", "#000000"] },
    dawn:     { range: [5, 6], label: "DAWN",     colors: ["#2c3e50", "#fd746c", "#ff9068"] },
    morning:  { range: [7, 10], label: "MORNING",  colors: ["#2193b0", "#6dd5ed", "#ffffff"] },
    midday:   { range: [11, 14], label: "MIDDAY",   colors: ["#1c92d2", "#f2fcfe", "#1c92d2"] },
    afternoon:{ range: [15, 17], label: "AFTERNOON",colors: ["#4facfe", "#00f2fe", "#fdfbfb"] },
    sunset:   { range: [18, 19], label: "SUNSET",   colors: ["#4b6cb7", "#182848", "#f093fb"] },
    dusk:     { range: [20, 21], label: "DUSK",     colors: ["#0f2027", "#203a43", "#2c5364"] },
    night:    { range: [22, 23], label: "NIGHT",    colors: ["#050505", "#0b1026", "#1c1c1c"] }
};

function updateSky() {
    const now = new Date();
    const hour = now.getHours();
    const min = now.getMinutes().toString().padStart(2, '0');
    timeDisplay.innerText = `${hour}:${min}`;

    let currentState;
    for (let key in timeStates) {
        const [start, end] = timeStates[key].range;
        if (hour >= start && hour <= end) {
            currentState = timeStates[key];
            break;
        }
    }

    // Aplicar degradado de 3 colores
    const c = currentState.colors;
    sky.style.background = `linear-gradient(180deg, ${c[0]} 0%, ${c[1]} 50%, ${c[2]} 100%)`;
    stateLabel.innerText = currentState.label;
}

// Generador de hojas con efecto de viento
function createLeaf() {
    const container = document.getElementById('leaf-container');
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    
    const startX = Math.random() * window.innerWidth;
    const duration = 5 + Math.random() * 5;
    const delay = Math.random() * 5;

    leaf.style.left = `${startX}px`;
    leaf.style.animationDuration = `${duration}s`;
    leaf.style.animationDelay = `${delay}s`;
    // Simular viento moviéndolas un poco de lado
    leaf.style.setProperty('--wind', `${Math.random() * 100 - 50}px`);

    container.appendChild(leaf);

    setTimeout(() => { leaf.remove(); }, (duration + delay) * 1000);
}

// Iniciar sistema
setInterval(updateSky, 1000);
setInterval(createLeaf, 300);
updateSky();

document.getElementById('exit-btn').addEventListener('click', () => {
    window.location.href = "index.html";
});
