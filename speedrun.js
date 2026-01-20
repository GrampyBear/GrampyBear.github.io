document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('leaderboard-body');
    const totalRuns = 20;

    // Generar la lista de speedruns idénticos
    for (let i = 1; i <= totalRuns; i++) {
        const row = document.createElement('tr');
        
        // El primero es el de la canción, el resto son copias locas
        row.innerHTML = `
            <td>${i}st</td>
            <td style="color: #00ffff">???</td>
            <td style="font-weight: bold">4:23.00</td>
            <td>182 BPM AGO</td>
        `;
        
        tableBody.appendChild(row);
    }

    // Efecto visual: Glitch en el título cada cierto tiempo
    const title = document.querySelector('h1');
    setInterval(() => {
        title.style.transform = `translate(${Math.random()*5}px, ${Math.random()*5}px)`;
        setTimeout(() => {
            title.style.transform = 'translate(0,0)';
        }, 50);
    }, 100);

    console.log("SPEEDRUN.SPEED LOADED IN 0.0001ms");
});
