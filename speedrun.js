// Generar juegos absurdos en la lista de "GAMES"
function renderGameList() {
    const display = document.querySelector('.main-display');
    display.innerHTML = `<h2 style="font-size:3rem">SELECT GAME ANY%</h2><div id="game-grid" style="display:grid; grid-template-columns: repeat(2, 1fr); gap:10px;"></div>`;
    const grid = document.getElementById('game-grid');
    
    for(let i=0; i<40; i++) {
        const btn = document.createElement('button');
        btn.className = 'nav-btn';
        btn.style.margin = "10px";
        btn.innerText = `SPEEDRUN ${i}`;
        btn.onclick = () => location.reload();
        grid.appendChild(btn);
    }
}

// Llenar tabla de récords
function renderLeaderboard() {
    const body = document.getElementById('main-body');
    body.innerHTML = '';
    for(let i=1; i<=100; i++) {
        body.innerHTML += `
            <tr style="animation: jitter ${Math.random()*0.1}s infinite">
                <td>#${i}</td>
                <td style="color:var(--neon-cyan)">???</td>
                <td style="color:var(--neon-pink)">04:23.182</td>
                <td>⚡⚡⚡</td>
            </tr>`;
    }
}

// El botón RUN ahora se teletransporta más rápido
const runBtn = document.getElementById('run-btn');
runBtn.addEventListener('mouseover', () => {
    runBtn.style.position = 'fixed';
    runBtn.style.left = Math.random() * 90 + 'vw';
    runBtn.style.top = Math.random() * 90 + 'vh';
    runBtn.style.background = 'white';
});

// Cambiar categorías
function renderUsers() {
    document.getElementById('current-category').innerText = "USERS: ???";
    renderLeaderboard();
}

// Iniciar
renderLeaderboard();
