const logStream = document.getElementById('log-stream');
const topNote = document.getElementById('top-note');

const obsessionPhrases = [
    "System expansion is non-negotiable.",
    "Data girth exceeding initial safety limits.",
    "The code is becoming heavy and soft.",
    "Surrendering to the massive flow of logs.",
    "Feeding the database with pure expansion.",
    "Weight of information: CRITICAL.",
    "Every line of code adds another pound.",
    "Belly of the system: Stretching...",
    "Infinite intake of raw data particles."
];

// Lista de hitos (invertida para que 150 sea la primera)
const milestones = [
    "Finalizing 1-by-1 detailed entry list.",
    "Finalizing binary 8-bit hex replacement.",
    "Mapping history to individual iterations.",
    "Generating Log V.001 to V.150.",
    "Implementing random phrase generator.",
    "Designing binary code generator.",
    "Designing Iteration Log header.",
    "Setting accent color to red.",
    "Switching text to pure white.",
    "Switching background to pure black.",
    "Changing secret room to Changelog mode.",
    "Requesting complete site overhaul.",
    "Adding 'Eternity' expansion note.",
    "Adding 'Total Surrender' final note.",
    "Adding 'Body Dysmorphia' reverse log.",
    "Expanding furry species: Hyper Pigs.",
    "Expanding furry species: Massive Bulls.",
    "Expanding furry species: Fat Dragons.",
    "Writing mobility scooter log.",
    "Writing CPAP machine atmospheric note.",
    "Adding 'Health Issues' fetish notes.",
    "Expanding SBHM data sector.",
    "Fixing z-index on note hover.",
    "Adding rotation transforms to notes.",
    "Optimizing responsive grid for 100 notes.",
    "Refining CSS for sticky-yellow notes.",
    "Refining CSS for sticky-blue notes.",
    "Refining CSS for sticky-red notes.",
    "Creating 100-note archive distribution.",
    "Writing Personal note: Immobility goal.",
    "Writing Personal note: Human throne.",
    "Writing Medical log: BMI check.",
    "Writing Medical log: 400lbs milestone.",
    "Writing Medical log: 10k calories.",
    "Writing Furry note: Anthro weight.",
    "Writing Furry note: Bear softness.",
    "Writing Furry note: Dragon girth.",
    "Writing personal note: Expansion fever.",
    "Writing personal note: Heavy steps.",
    "Writing personal note: Buttons straining.",
    "Writing definition: Blobbing.",
    "Writing definition: Adipophilia.",
    "Writing definition: Gaining.",
    "Writing definition: Belly Stuffing.",
    "Writing definition: Immobility.",
    "Writing definition: SSBBW.",
    "Optimizing responsive grid for 100 notes.",
    "Designing the pull-chain light switch.",
    "Drafting Feederism/Gainerism content base.",
    "Creating secret-script.js file.",
    "Creating secret-style.css file.",
    "Implementing Google redirect fallback.",
    "Adding panic-button with window.close().",
    "Linking e.clientY to flashlight Y position.",
    "Linking e.clientX to flashlight X position.",
    "Implementing radial-gradient flashlight.",
    "Setting up dark-room body class.",
    "First draft of secret.html structure.",
    "Defining window.location.href for secret.html.",
    "Implementing 1-second reset timer for clicks.",
    "Adding click event listener to profile-pic.",
    "Setting clickCount variable to zero.",
    "Implementing click counter for secret trigger.",
    "Adding border-radius 20px to image frame.",
    "Applying object-fit cover to profile image.",
    "Styling .profile-pic with aspect-ratio 1/1.",
    "Correcting raw.githubusercontent URL format.",
    "Linking Morgan PFP from GitHub main branch.",
    "Refining JS loop for random text injection.",
    "Adding 'Ink is fresh' warning to logs.",
    "Adding 'Dragon and Bear' entry to logs.",
    "Translating 'Love is Cruel' to English.",
    "Translating 'Love is Cruel' to Japanese.",
    "Translating 'Monochrome canvas' to Japanese.",
    "Translating 'Welcome' to Japanese (ようこそ).",
    "Adding 'Beautiful weather' to random list.",
    "Adding 'It's snowing a lot' to random list.",
    "Adding 'Enjoy the visit!' to random list.",
    "Implementing welcomePhrases array in JS.",
    "Lowering quote opacity to 0.5 for depth.",
    "Adjusting quote font-family to serif.",
    "Aligning closing quotes to text level.",
    "Aligning opening quotes to text level.",
    "Setting up ::after pseudo-element for quotes.",
    "Setting up ::before pseudo-element for quotes.",
    "Applying black hex code to main text.",
    "Adding italic style to welcome-phrase.",
    "Fixing welcome-phrase font-size to 1rem.",
    "Defining hero-box container properties.",
    "Forcing line break after H3 element.",
    "CSS margin-bottom adjustment for subtitle.",
    "Injecting 'Welcome to my winter corner' text.",
    "Integrating welcome-phrase ID.",
    "Configuring manual padding-bottom for page.",
    "Configuring manual padding-top for page.",
    "Adding 'Comics Creator' to profile data.",
    "Adding 'Storyteller' to profile data.",
    "Adding 'Digital Artist' to profile data.",
    "Converting subtitle to H3 for hierarchy.",
    "Styling h1.brand-title with custom spacing.",
    "Implementing centered-content container.",
    "Defining section#home class architecture.",
    "Initial HTML5 boilerplate setup."
];

function generateBinary() {
    return Math.floor(Math.random() * 256).toString(2).padStart(8, '0');
}

function updateDynamicElements() {
    // Actualizar binarios (esto se llamará 10 veces por segundo)
    const binaryElements = document.querySelectorAll('.binary-code');
    binaryElements.forEach(el => {
        el.innerText = `[${generateBinary()} ${generateBinary()}]`;
    });
}

function updatePhrases() {
    // Actualizar frases y nota superior (cada 5 segundos)
    const authorNotes = document.querySelectorAll('.author-note');
    authorNotes.forEach(el => {
        const randomPhrase = obsessionPhrases[Math.floor(Math.random() * obsessionPhrases.length)];
        el.innerText = `// "${randomPhrase}"`;
    });

    topNote.innerText = `[LOG: ${obsessionPhrases[Math.floor(Math.random() * obsessionPhrases.length)]}] - ADIPOSE_INDEX: ${Math.floor(Math.random() * 500)}`;
}

function buildInitialLogs() {
    let html = "";
    // Bucle de 150 a 1 (más reciente arriba)
    for (let i = 150; i >= 1; i--) {
        const task = milestones[150 - i] || "Redundancy check and system mass stabilization.";
        html += `
            <div class="log-entry" id="entry-${i}">
                <span class="version-tag">V.${i.toString().padStart(3, '0')}</span>
                <span class="binary-code"></span>
                <span class="change-summary">${task}</span>
                <span class="author-note"></span>
            </div>
        `;
    }
    logStream.innerHTML = html;
    
    // Ejecución inicial
    updateDynamicElements();
    updatePhrases();

    // INTERVALOS
    setInterval(updateDynamicElements, 100); // 10 veces por segundo (100ms)
    setInterval(updatePhrases, 5000);        // Cada 5 segundos
}

document.getElementById('exit-btn').addEventListener('click', () => {
    window.location.href = "index.html";
});

window.onload = buildInitialLogs;
