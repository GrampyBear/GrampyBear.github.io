const DSMS = (function() {
    const API_URL = 'https://api.le-systeme-solaire.net/rest/v1/bodies';
    const API_KEY = 'a17f2e1b-ffa8-404a-93b9-b0ec631432db';

    const log = (msg) => {
        const out = document.getElementById('kernel-log');
        out.innerHTML += `> ${msg}<br>`;
        out.scrollTop = out.scrollHeight;
    };

    // Función para renderizar los detalles técnicos en pantalla
    const renderSpecs = (data) => {
        const specs = document.getElementById('obj-specs');
        specs.style.opacity = '1';
        specs.innerHTML = `
            <div class="p-2 border border-cyan-900/30">
                <p class="text-slate-600 uppercase text-[8px]">Gravity</p>
                <p class="text-cyan-400 font-bold">${data.gravity || '0'} m/s²</p>
            </div>
            <div class="p-2 border border-cyan-900/30">
                <p class="text-slate-600 uppercase text-[8px]">Mean Radius</p>
                <p class="text-cyan-400 font-bold">${Math.round(data.meanRadius)} km</p>
            </div>
            <div class="p-2 border border-cyan-900/30">
                <p class="text-slate-600 uppercase text-[8px]">Escape Vel</p>
                <p class="text-cyan-400 font-bold">${(data.escape / 1000).toFixed(2)} km/s</p>
            </div>
            <div class="p-2 border border-cyan-900/30">
                <p class="text-slate-600 uppercase text-[8px]">Moons</p>
                <p class="text-cyan-400 font-bold">${data.moons ? data.moons.length : '0'}</p>
            </div>
        `;
    };

    return {
        // Carga inicial y filtrado
        async filter(type) {
            log(`query: filtering_registry_by_${type}...`);
            try {
                let filterParam = '';
                if(type === 'planet') filterParam = '?filter[]=isPlanet,eq,true';
                if(type === 'moon') filterParam = '?filter[]=aroundPlanet,neq,null';
                if(type === 'asteroid') filterParam = '?filter[]=isPlanet,eq,false&filter[]=aroundPlanet,eq,null';

                const res = await fetch(`${API_URL}${filterParam}`);
                const data = await res.json();
                
                let html = '';
                data.bodies.sort((a,b) => a.englishName.localeCompare(b.englishName)).slice(0, 50).forEach(body => {
                    html += `
                    <div class="p-1 border-b border-slate-900 hover:bg-cyan-900/20 cursor-pointer transition-all" 
                         onclick="DSMS.select('${body.id}')">
                        <span class="text-cyan-700">OBJ_</span>${body.englishName.toUpperCase()}
                    </div>`;
                });
                document.getElementById('registry-list').innerHTML = html;
                log(`sync: ${data.bodies.length}_objects_mapped`);
            } catch (e) { log("err: connection_failed"); }
        },

        // Selección de un cuerpo específico
        async select(id) {
            log(`uplink: targeting_${id}...`);
            try {
                const res = await fetch(`${API_URL}/${id}`);
                const data = await res.json();

                document.getElementById('obj-name').innerText = data.englishName.toUpperCase();
                document.getElementById('obj-name').classList.remove('opacity-20');
                document.getElementById('obj-title').innerText = `Analysis: ${data.englishName}`;
                document.getElementById('body-id').innerText = `ID: ${data.id.toUpperCase()}`;
                
                const desc = `Cuerpo celeste de tipo ${data.bodyType}. ` + 
                             (data.aroundPlanet ? `Orbita alrededor de ${data.aroundPlanet.planet.toUpperCase()}. ` : 'Orbita directamente al Sol. ') +
                             `Descubierto por ${data.discoveryDate || 'Unknown'}.`;
                
                document.getElementById('obj-desc').innerText = desc;
                
                renderSpecs(data);
                log("telemetry: data_packet_received");
            } catch (e) { log("err: fetch_failed"); }
        },

        init() {
            log("sys: dsms_v7_online");
            this.filter('planet');
            setInterval(() => {
                document.getElementById('clock').innerText = new Date().toLocaleTimeString('en-US', { hour12: false });
            }, 1000);
        }
    };
})();

window.onload = () => DSMS.init();
