// dsms.js
const NASA_API = (function() {
    // Reemplaza 'DEMO_KEY' con tu API Key de api.nasa.gov
    const API_KEY = 'e2oiz3ndkMnUe1IsKmGbvKduWADLjXkB8DMTDlRI'; 
    const BASE_URL = 'https://api.nasa.gov';

    // --- UTILS ---
    function log(msg) {
        const consoleEl = document.getElementById('kernel-log');
        const time = new Date().toLocaleTimeString('en-US', { hour12: false });
        consoleEl.innerHTML += `[${time}] > ${msg}<br>`;
        consoleEl.scrollTop = consoleEl.scrollHeight;
    }

    function buildUrl(endpoint, params = {}) {
        const url = new URL(`${BASE_URL}${endpoint}`);
        url.searchParams.append('api_key', API_KEY);
        for (const key in params) {
            if (params[key] !== undefined && params[key] !== null) {
                url.searchParams.append(key, params[key]);
            }
        }
        return url.toString();
    }

    // --- CORE MODULES ---

    // 1. APOD (Astronomy Picture of the Day)
    // Variables soportadas según docs: date, start_date, end_date, count, thumbs
    async function loadAPOD(options = { thumbs: true }) {
        updateUIState('UNIT_01 // APOD_FEED', 'INITIALIZING DEEP SPACE SCAN...');
        try {
            const res = await fetch(buildUrl('/planetary/apod', options));
            const data = await res.json();
            
            // Si usamos 'count', devuelve un array. Si no, un objeto.
            const item = Array.isArray(data) ? data[0] : data; 

            const visual = item.media_type === 'video' 
                ? `<iframe src="${item.url}" class="w-full h-full border-0 absolute inset-0"></iframe>`
                : `<img src="${item.url}" class="max-h-[460px] w-auto rounded object-contain z-10 relative">`;
            
            renderMainDisplay(visual, item.title, item.explanation, `TS: ${item.date}`);
            renderTelemetry(`
                TYPE: ${item.media_type}<br>
                HD_AVAILABLE: ${item.hdurl ? 'TRUE' : 'FALSE'}<br>
                COPYRIGHT: ${item.copyright || 'PUBLIC_DOMAIN'}
            `);
            log("module_apod: sync_complete");
        } catch (e) { log("err_apod: connection_timeout"); }
    }

    // 2. EPIC (Earth Polychromatic Imaging Camera)
    // Variables: type (natural/enhanced), date
    async function loadEPIC(type = 'natural', date = null) {
        updateUIState('UNIT_01 // EPIC_SAT_L1', 'ALIGNING SATELLITE OPTICS...');
        try {
            const endpoint = date ? `/EPIC/api/${type}/date/${date}` : `/EPIC/api/${type}`;
            const res = await fetch(buildUrl(endpoint));
            const data = await res.json();
            const target = data[0];
            
            if(!target) throw new Error("No imagery");

            const dateStr = target.date.split(' ')[0].replace(/-/g, '/');
            const imgUrl = `${BASE_URL}/EPIC/archive/${type}/${dateStr}/png/${target.image}.png?api_key=${API_KEY}`;
            
            const visual = `<img src="${imgUrl}" class="max-h-[400px] w-auto rounded-full shadow-[0_0_50px_rgba(34,211,238,0.15)] z-10">`;
            
            renderMainDisplay(visual, "EARTH POLYCHROMATIC MONITOR", `Tracking Earth from L1 point. Image ID: ${target.image}`, `TS: ${target.date}`);
            renderTelemetry(`
                LAT: ${target.centroid_coordinates.lat}<br>
                LON: ${target.centroid_coordinates.lon}<br>
                DIST_TO_SUN: ${target.sun_j2000_position.x.toFixed(0)}<br>
                VER: ${target.version}
            `);
            log("module_epic: telemetry_locked");
        } catch (e) { log("err_epic: target_lost"); }
    }

    // 3. TechPort (NASA R&D Projects)
    // Variables: projectId, updatedSince
    async function loadTechPort() {
        updateUIState('UNIT_01 // TECHPORT_DB', 'QUERYING R&D DATABASES...');
        try {
            const res = await fetch(buildUrl('/techport/api/projects', { updatedSince: '2025-01-01' }));
            const data = await res.json();
            // Fetch specific project details for the first result
            const projRes = await fetch(buildUrl(`/techport/api/projects/${data.projects.projects[0].projectId}`));
            const projData = await projRes.json();
            const p = projData.project;

            const visual = `<div class="p-8 border border-cyan-900/50 bg-cyan-950/20 w-full h-full flex flex-col justify-center items-center text-center">
                <span class="text-4xl text-cyan-500 font-black tracking-widest">${p.acronym || 'N/A'}</span>
                <span class="text-cyan-700 mt-2">PROJECT_ID: ${p.projectId}</span>
            </div>`;

            renderMainDisplay(visual, p.title, p.description.replace(/<[^>]*>?/gm, ''), `STATUS: ${p.status}`);
            renderTelemetry(`
                START: ${p.startDateString}<br>
                END: ${p.endDateString}<br>
                LEAD_CENTER: ${p.leadCenter?.acronym || 'N/A'}
            `);
            log("module_techport: data_retrieved");
        } catch (e) { log("err_techport: db_access_denied"); }
    }

    // 4. NASA Image and Video Library
    // API independiente de base url, variables: q, media_type, year_start
    async function loadLibrarySearch(query = 'Nebula') {
        updateUIState('UNIT_01 // MEDIA_LIBRARY', `SEARCHING ARCHIVE: ${query}...`);
        try {
            const url = `https://images-api.nasa.gov/search?q=${query}&media_type=image`;
            const res = await fetch(url);
            const data = await res.json();
            const item = data.collection.items[0];

            const visual = `<img src="${item.links[0].href}" class="max-h-[460px] w-auto rounded object-cover z-10 border border-indigo-900/50">`;
            
            renderMainDisplay(visual, item.data[0].title, item.data[0].description, `CENTER: ${item.data[0].center}`);
            renderTelemetry(`
                NASA_ID: ${item.data[0].nasa_id}<br>
                CREATED: ${item.data[0].date_created.split('T')[0]}<br>
                ALBUM: ${item.data[0].album ? item.data[0].album[0] : 'N/A'}
            `);
            log("module_library: record_found");
        } catch (e) { log("err_library: query_failed"); }
    }

    // --- SIDEBAR MODULES (BACKGROUND TASKS) ---

    // 5. NeoWs (Near Earth Object Web Service)
    // Feed variables: start_date, end_date
    async function initNeoWs() {
        log("sys_task: init_radar_neows...");
        try {
            const today = new Date().toISOString().split('T')[0];
            const res = await fetch(buildUrl('/neo/rest/v1/feed', { start_date: today, end_date: today }));
            const data = await res.json();
            let html = '';
            data.near_earth_objects[today].slice(0, 5).forEach(ast => {
                const haz = ast.is_potentially_hazardous_asteroid ? '<span class="text-red-500 animate-pulse">[!]</span>' : '';
                html += `<div class="border-b border-cyan-900/20 pb-1 cursor-crosshair hover:bg-cyan-950/50" onclick="NASA_API.lookupNeo('${ast.id}')">
                    <span class="text-cyan-400 font-bold">${ast.name}</span> ${haz}<br>
                    <span class="text-slate-600">VEL: ${parseFloat(ast.close_approach_data[0].relative_velocity.kilometers_per_second).toFixed(2)} KM/S</span>
                </div>`;
            });
            document.getElementById('neo-feed').innerHTML = html;
        } catch (e) { log("err_neows: radar_offline"); }
    }

    // NeoWs Lookup variables: asteroid_id
    async function lookupNeo(id) {
        log(`sys_task: deep_scan_obj_${id}...`);
        try {
            const res = await fetch(buildUrl(`/neo/rest/v1/neo/${id}`));
            const data = await res.json();
            
            // Injecting specific NEO data into main display telemetry
            const tBox = document.getElementById('sys-telemetry');
            tBox.innerHTML = `
                <p class="text-red-500 font-bold mb-1 border-b border-slate-900 pb-1">TARGET_LOCKED</p>
                NAME: ${data.name}<br>
                MAGNITUDE: ${data.absolute_magnitude_h}<br>
                DIA_MAX: ${data.estimated_diameter.meters.estimated_diameter_max.toFixed(2)}m<br>
                ORBIT_CLASS: ${data.orbital_data.orbit_class.orbit_class_type}
            `;
            log("sys_task: target_data_rendered");
        } catch (e) { log("err_neows: lookup_failed"); }
    }

    // 6. DONKI & EONET (Space Weather & Earth Events combined)
    async function initThreatFeeds() {
        log("sys_task: fetching_threat_assessments...");
        try {
            let html = '';
            
            // DONKI (Coronal Mass Ejections) - Variables: startDate, endDate, type
            const donkiRes = await fetch(buildUrl('/DONKI/CME', { startDate: '2025-01-01' }));
            const donkiData = await donkiRes.json();
            if(donkiData && donkiData.length > 0) {
                html += `<div class="mb-2"><span class="text-orange-500 font-bold">SPACE_WX: CME DETECTED</span><br><span class="text-slate-500">${donkiData[0].note.substring(0,60)}...</span></div>`;
            }

            // EONET - Variables: limit, status
            const eonetRes = await fetch('https://eonet.gsfc.nasa.gov/api/v3/events?limit=3&status=open');
            const eonetData = await eonetRes.json();
            eonetData.events.forEach(ev => {
                html += `<div class="border-t border-red-900/20 pt-1 mt-1">
                    <span class="text-red-400 font-bold">EARTH_EV: ${ev.categories[0].title}</span><br>
                    <span class="text-slate-500">${ev.title}</span>
                </div>`;
            });

            document.getElementById('threat-feed').innerHTML = html;
        } catch (e) { log("err_threats: sensors_offline"); }
    }

    // 7. InSight (Mars Weather)
    // Variables: feedtype, ver
    async function initMars() {
        log("sys_task: ping_insight_lander...");
        try {
            const res = await fetch(buildUrl('/insight_weather/', { feedtype: 'json', ver: '1.0' }));
            const data = await res.json();
            const keys = data.sol_keys;
            if(keys.length > 0) {
                const lastSol = keys[keys.length - 1];
                document.getElementById('mars-sol').innerText = lastSol;
                document.getElementById('mars-temp').innerText = data[lastSol].AT ? `${data[lastSol].AT.av.toFixed(1)}°C` : 'N/A';
            }
        } catch (e) { log("err_mars: comm_link_severed"); }
    }

    // --- DOM HELPERS ---
    function updateUIState(moduleName, loaderText) {
        document.getElementById('sys-module-name').innerText = moduleName;
        document.getElementById('sys-display').innerHTML = `<div class="text-cyan-900 animate-pulse text-[10px] uppercase">${loaderText}</div>`;
        document.getElementById('sys-title').innerText = '';
        document.getElementById('sys-desc').innerText = '';
        document.getElementById('sys-timestamp').innerText = '';
    }

    function renderMainDisplay(visualHtml, title, desc, timestamp) {
        document.getElementById('sys-display').innerHTML = visualHtml;
        document.getElementById('sys-title').innerText = title || 'UNKNOWN_DATA_SET';
        document.getElementById('sys-desc').innerText = desc || 'No description available.';
        document.getElementById('sys-timestamp').innerText = timestamp || '';
    }

    function renderTelemetry(htmlStr) {
        document.getElementById('sys-telemetry').innerHTML = `<p class="text-slate-600 mb-1 border-b border-slate-900 pb-1 uppercase font-bold">Live_Telemetry</p>${htmlStr}`;
    }

    // --- PUBLIC API ---
    return {
        init: function() {
            log("sys_boot: DSMS_KERNEL_V5.0");
            initNeoWs();
            initThreatFeeds();
            initMars();
            this.executeCommand('APOD'); // Default load
        },
        executeCommand: function(cmd) {
            switch(cmd) {
                case 'APOD': loadAPOD({ thumbs: true }); break;
                case 'EPIC': loadEPIC('natural'); break;
                case 'TECHPORT': loadTechPort(); break;
                case 'LIBRARY': loadLibrarySearch('Galaxy'); break;
            }
        },
        lookupNeo: lookupNeo
    };

})();

// Boot the system when DOM is ready
window.onload = () => NASA_API.init();
