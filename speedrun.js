const mainBody = document.getElementById('main-body');
const tableHead = document.getElementById('table-head');
const categoryList = document.getElementById('category-list');
const sectionTitle = document.getElementById('section-title');

function showSection(type) {
    mainBody.innerHTML = '';
    
    if (type === 'games') {
        sectionTitle.innerText = "SPEEDRUN GAMES";
        tableHead.innerHTML = `<tr><th>GAME ID</th><th>TITLE</th><th>RUNNERS</th></tr>`;
        for(let i=0; i<50; i++) {
            mainBody.innerHTML += `<tr><td>#${i}</td><td>SPEEDRUN</td><td>???</td></tr>`;
        }
    } else if (type === 'users') {
        sectionTitle.innerText = "VERIFIED USERS";
        tableHead.innerHTML = `<tr><th>RANK</th><th>USER</th><th>PB</th></tr>`;
        for(let i=0; i<50; i++) {
            mainBody.innerHTML += `<tr><td>#${i}</td><td>???</td><td>4:23</td></tr>`;
        }
    } else if (type === 'forums') {
        sectionTitle.innerText = "FORUM THREADS";
        tableHead.innerHTML = `<tr><th>TOPIC</th><th>AUTHOR</th></tr>`;
        const topics = ["HOW TO SPEEDRUN?", "SPEEDRUN IS DOWN?", "CAMILLIA 182 BPM BUG", "GLITCH IN SPEEDRUN"];
        for(let i=0; i<50; i++) {
            mainBody.innerHTML += `<tr><td>${topics[i%4]}</td><td>???</td></tr>`;
        }
    }
}

// Inicializar lista de categorías
for(let i=0; i<20; i++) {
    const li = document.createElement('li');
    li.innerText = `SPEEDRUN %${i}`;
    categoryList.appendChild(li);
}

// El botón RUN! huye
const runBtn = document.getElementById('run-btn');
runBtn.addEventListener('mouseover', () => {
    runBtn.style.position = 'absolute';
    runBtn.style.left = Math.random() * 80 + 'vw';
    runBtn.style.top = Math.random() * 80 + 'vh';
});

// Cargar por defecto
showSection('games');

// Glitch aleatorio en el logo
setInterval(() => {
    const logo = document.getElementById('main-logo');
    logo.style.textShadow = `${Math.random()*10}px ${Math.random()*10}px var(--neon-pink)`;
}, 50);
