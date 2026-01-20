const mainBody = document.getElementById('main-body');
const categoryList = document.getElementById('category-list');
const gameTitle = document.getElementById('current-game-name');
const sectionTitle = document.getElementById('current-category');

// 1. GENERAR CATEGORÍAS (Sidebar)
const categories = ["Any%", "100%", "Glitchless", "No-BPM Mode", "Camellia Skip", "TAS"];
categories.forEach(cat => {
    const li = document.createElement('li');
    li.innerText = `SPEEDRUN (${cat})`;
    li.onclick = () => {
        sectionTitle.innerText = li.innerText;
        renderLeaderboard();
    };
    categoryList.appendChild(li);
});

// 2. FUNCIÓN: MOSTRAR LISTA DE JUEGOS
function renderGameList() {
    const display = document.querySelector('.main-display');
    display.innerHTML = `<h2>SELECT A GAME</h2><div class="game-grid" id="game-grid"></div>`;
    const grid = document.getElementById('game-grid');
    
    for(let i=0; i<30; i++) {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `<div style="height:120px; background:#222; margin-bottom:10px; display:flex; align-items:center; justify-content:center">SPEED</div><strong>SPEEDRUN ${i}</strong>`;
        card.onclick = () => {
            gameTitle.innerText = `SPEEDRUN ${i}`;
            location.reload(); // Simula que entras al juego
        };
        grid.appendChild(card);
    }
}

// 3. FUNCIÓN: MOSTRAR LÍDERES (Por defecto)
function renderLeaderboard() {
    mainBody.innerHTML = '';
    for(let i=1; i<=50; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${i}</td>
            <td style="color: var(--neon-cyan)">???</td>
            <td style="font-weight:bold">4:23.00</td>
            <td>PC</td>
            <td style="color:#666">182 BPM AGO</td>
        `;
        mainBody.appendChild(row);
    }
}

// 4. MANTENER EL BOTÓN RUN LOCO
const runBtn = document.getElementById('run-btn');
runBtn.addEventListener('mouseover', () => {
    runBtn.style.position = 'absolute';
    runBtn.style.left = Math.random() * 80 + 'vw';
    runBtn.style.top = Math.random() * 80 + 'vh';
});

// 5. GLITCH LOGO
setInterval(() => {
    const logo = document.getElementById('main-logo');
    logo.style.textShadow = `${Math.random()*8}px ${Math.random()*8}px var(--neon-pink)`;
}, 60);

// Iniciar
renderLeaderboard();
