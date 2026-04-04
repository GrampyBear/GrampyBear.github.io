const DSMS_CORE = (function() {
    // API CONFIG
    const NASA_LIB = 'https://images-api.nasa.gov/search';
    const SOLAR_API = 'https://api.le-systeme-solaire.net/rest/v1/bodies';
    const SOLAR_KEY = 'a17f2e1b-ffa8-404a-93b9-b0ec631432db';

    // UI ELEMENTS
    const logOut = document.getElementById('log-out');
    const mainView = document.getElementById('main-view');
    const celestialFeed = document.getElementById('celestial-feed');

    const writeLog = (msg) => {
        const time = new Date().toLocaleTimeString('en-US', { hour12: false });
        logOut.innerHTML += `[${time}] > ${msg}<br>`;
        logOut.scrollTop = logOut.scrollHeight;
    };

    // 1. FETCH CELESTIAL BODIES (Solar System OpenData)
    async function syncCelestialMetrics() {
        writeLog("init: solar_system_query...");
        try {
            // Buscamos planetas y cuerpos mayores
            const res = await fetch(`${SOLAR_API}?filter[]=isPlanet,eq,true`);
            const data = await res.json();
            
            let html = '';
            data.bodies.forEach(body => {
                html += `
                <div class="border-b border-slate-800 pb-1 cursor-pointer hover:bg-cyan-900/20 transition-all" 
                     onclick="DSMS_CORE.analyzeObject('${body.id}')">
                    <span class="text-cyan-400 font-bold">> ${body.englishName.toUpperCase()}</span>
                    <span class="text-[8px] text-slate-600 block italic">Dist_to_Sun: ${body.semimajorAxis.toLocaleString()} km</span>
                </div>`;
            });
            celestialFeed.innerHTML = html;
            writeLog("sync: solar_system_data_online");
        } catch (e) {
            writeLog("err: solar_api_link_lost");
        }
    }

    // 2. ANALYZE SPECIFIC OBJECT (Solar System OpenData)
    async function analyzeObject(id) {
        writeLog(`probe: scanning_body_${id}...`);
        try {
            const res = await fetch(`${SOLAR_API}/${id}`);
            const data = await res.json();

            // Update Metrics Panel
            document.getElementById('val-grav').innerText = `${data.gravity} m/s²`;
            document.getElementById('val-dens').innerText = `${data.density} g/cm³`;
            document.getElementById('val-moons').innerText = data.moons ? data.moons.length : '0';
            document.getElementById('val-temp').innerText = `${data.avgTemp} K`;

            // Trigger visual search in NASA library for this object
            fetchVisuals(data.englishName);
            writeLog(`data_locked: ${data.englishName}_telemetry_updated`);
        } catch (e) {
            writeLog("err: object_analysis_failed");
        }
    }

    // 3. FETCH VISUALS (NASA Image Library)
    async function fetchVisuals(query) {
        writeLog(`query: searching_visuals_${query}...`);
        try {
            const res = await fetch(`${NASA_LIB}?q=${query}&media_type=image`);
            const data = await res.json();
            const items = data.collection.items;

            if (items.length > 0) {
                const randomItem = items[Math.floor(Math.random() * Math.min(10, items.length))];
                const imgUrl = randomItem.links[0].href;
                const info = randomItem.data[0];

                mainView.innerHTML = `<img src="${imgUrl}" class="max-h-[450px] w-auto rounded object-contain z-10 shadow-2xl">`;
                document.getElementById('main-title').innerText = info.title;
                document.getElementById('main-desc').innerText = info.description;
                document.getElementById('data-id').innerText = `REF_ID: ${info.nasa_id}`;
                writeLog("vis_update: imagery_rendered");
            }
        } catch (e) {
            writeLog("err: imagery_fetch_error");
        }
    }

    // CLOCK
    setInterval(() => {
        document.getElementById('sys-clock').innerText = new Date().toLocaleString('en-US', { hour12: false });
    }, 1000);

    return {
        init: () => {
            writeLog("sys: booting_dsms_v6");
            syncCelestialMetrics();
            fetchVisuals('Nebula'); // Default view
        },
        analyzeObject: analyzeObject
    };
})();

// Initialize system
window.onload = () => DSMS_CORE.init();
