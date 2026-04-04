const DSMS = {
    // Esta URL es un proxy directo que no requiere autenticación
    DATA_SOURCE: 'https://api.le-systeme-solaire.net/rest/v1/bodies?filter[]=isPlanet,eq,true',
    
    log(msg) {
        const logEl = document.getElementById('kernel-log');
        logEl.innerHTML += `> ${msg.toLowerCase()}<br>`;
        logEl.scrollTop = logEl.scrollHeight;
    },

    async init() {
        this.log("booting_dsms_v9...");
        try {
            const res = await fetch(this.DATA_SOURCE);
            const data = await res.json();
            this.planets = data.bodies.sort((a,b) => a.semimajorAxis - b.semimajorAxis);
            
            this.renderList();
            this.log("connection_stable: registry_loaded");
            
            // Cargar Mercurio por defecto
            this.showPlanet(this.planets[0].id);
        } catch (e) {
            this.log("critical_error: source_unreachable");
        }
        
        setInterval(() => {
            document.getElementById('clock').innerText = new Date().toLocaleTimeString();
        }, 1000);
    },

    renderList() {
        const list = document.getElementById('nav-list');
        list.innerHTML = '';
        this.planets.forEach(p => {
            const el = document.createElement('div');
            el.className = 'planet-item';
            el.innerText = `0${this.planets.indexOf(p) + 1}_${p.englishName.toUpperCase()}`;
            el.onclick = () => this.showPlanet(p.id);
            list.appendChild(el);
        });
    },

    showPlanet(id) {
        const p = this.planets.find(item => item.id === id);
        this.log(`focusing_target: ${p.englishName}`);

        // UI Updates
        document.getElementById('target-name').innerText = p.englishName;
        document.getElementById('target-name').classList.replace('text-slate-900', 'text-cyan-600');
        document.getElementById('target-coord').innerText = `RAD: ${Math.round(p.meanRadius)}km // GRAV: ${p.gravity}ms2`;
        document.getElementById('target-desc').innerText = 
            `Analysis: ${p.englishName} is a ${p.bodyType}. It has ${p.moons ? p.moons.length : 0} confirmed satellites. ` +
            `Orbiting at a distance of ${p.semimajorAxis.toLocaleString()} km from the star.`;

        const tel = document.getElementById('telemetry-box');
        tel.style.opacity = '1';
        tel.innerHTML = `
            <div class="border border-cyan-900/30 p-4">
                <span class="text-[8px] text-cyan-900 block mb-1">DENSITY</span>
                <span class="text-xl text-cyan-200">${p.density.toFixed(2)}</span>
            </div>
            <div class="border border-cyan-900/30 p-4">
                <span class="text-[8px] text-cyan-900 block mb-1">ESCAPE_VEL</span>
                <span class="text-xl text-cyan-200">${(p.escape / 1000).toFixed(1)}km/s</span>
            </div>
            <div class="border border-cyan-900/30 p-4">
                <span class="text-[8px] text-cyan-900 block mb-1">AXIS_TILT</span>
                <span class="text-xl text-cyan-200">${p.axialTilt}°</span>
            </div>
        `;
    }
};

window.onload = () => DSMS.init();
