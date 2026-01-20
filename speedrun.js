const mainBody = document.getElementById('main-body');
const categoryList = document.getElementById('category-list');
const gameTitle = document.getElementById('current-game-name');
const sectionTitle = document.getElementById('current-category');

// Generar Categorías Profesionales
const categories = ["Any%", "100%", "Glitchless", "182 BPM", "Camellia%", "No-Fails"];
categories.forEach(cat => {
    const li = document.createElement('li');
    li.innerHTML = `<span>⚡</span> ${cat}`;
    li.onclick = () => {
        sectionTitle.innerText = `CATEGORY: ${cat}`;
        renderLeaderboard();
    };
    categoryList.appendChild(li);
});

// Renderizar la lista de juegos como un catálogo real
function renderGameList() {
    const display = document.querySelector('.main-display');
    display.innerHTML = `<h2 style="color:var(--neon-pink)">DATABASE: SELECT SPEEDRUN</h2><div class="game-grid" id="game-grid" style="display:grid; grid-template-columns: repeat(3, 1fr); gap:15px;"></div>`;
    const grid = document.getElementById('game-grid');
    
    for(let i=0; i<15; i++) {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.style = "background:#111; border:1px solid var(--neon-cyan); padding:20px; cursor:pointer; text-align:center";
        card.innerHTML = `<div style="font-size:2rem">💿</div><b>SPEEDRUN VOL. ${i}</b>`;
        card.onclick = () => {
            gameTitle.innerText = `SPEEDRUN VOL. ${i}`;
            display.innerHTML = `<h2>Loading...</h2>`; // Efecto de carga
            setTimeout(() => location.reload(), 300);
        };
        grid.appendChild(card);
    }
}

function renderUsers() {
    sectionTitle.innerText = "TOP RUNNERS";
    mainBody.innerHTML = '';
    for(let i=0; i<30; i++) {
        mainBody.innerHTML += `<tr><td>#${i}</td><td style="color:var(--neon-pink)">??? [VERIFIED]</td><td>4:23</td><td>WORLD</td><td>TODAY</td></tr>`;
    }
}

function renderLeaderboard() {
    mainBody.innerHTML = '';
    for(let i=1; i<=25; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="color:var(--neon-cyan)">${i}</td>
            <td>???</td>
            <td style="color:var(--neon-pink); font-weight:bold">04:23.182</td>
            <td>CAMELLIA_OS</td>
            <td>01/01/2026</td>
        `;
        mainBody.appendChild(row);
    }
}

// Botón Run que huye (lo mantenemos porque es icónico)
const runBtn = document.getElementById('run-btn');
runBtn.addEventListener('mouseover', () => {
    runBtn.style.position = 'fixed';
    runBtn.style.left = Math.random() * 90 + 'vw';
    runBtn.style.top = Math.random() * 90 + 'vh';
    runBtn.style.zIndex = "1000";
});

// Glitch effect en el logo
setInterval(() => {
    const logo = document.getElementById('main-logo');
    logo.style.transform = `skew(${Math.random()*10 - 5}deg)`;
    if(Math.random() > 0.8) logo.style.filter = "invert(1)";
    else logo.style.filter = "none";
}, 100);

renderLeaderboard();
