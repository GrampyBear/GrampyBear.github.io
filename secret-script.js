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
    "This pig is getting so fat",
    "I need more food!"
];

const milestones = [
    "Initial HTML5 boilerplate setup.",
    "Defining section#home class architecture.",
    "Implementing centered-content container.",
    "Styling h1.brand-title with custom spacing.",
    "Converting subtitle to H3 for hierarchy.",
    "Adding 'Digital Artist' to profile data.",
    "Adding 'Storyteller' to profile data.",
    "Adding 'Comics Creator' to profile data.",
    "Configuring manual padding-top for page.",
    "Configuring manual padding-bottom for page.",
    "Integrating welcome-phrase ID.",
    "Injecting 'Welcome to my winter corner' text.",
    "CSS margin-bottom adjustment for subtitle.",
    "Forcing line break after H3 element.",
    "Defining hero-box container properties.",
    "Fixing welcome-phrase font-size to 1rem.",
    "Adding italic style to welcome-phrase.",
    "Applying black hex code to main text.",
    "Setting up ::before pseudo-element for quotes.",
    "Setting up ::after pseudo-element for quotes.",
    "Aligning opening quotes to text level.",
    "Aligning closing quotes to text level.",
    "Adjusting quote font-family to serif.",
    "Lowering quote opacity to 0.5 for depth.",
    "Implementing welcomePhrases array in JS.",
    "Adding 'Enjoy the visit!' to random list.",
    "Adding 'It's snowing a lot' to random list.",
    "Adding 'Beautiful weather' to random list.",
    "Translating 'Welcome' to Japanese (ようこそ).",
    "Translating 'Monochrome canvas' to Japanese.",
    "Translating 'Love is Cruel' to Japanese.",
    "Translating 'Love is Cruel' to English.",
    "Adding 'Dragon and Bear' entry to logs.",
    "Adding 'Ink is fresh' warning to logs.",
    "Refining JS loop for random text injection.",
    "Linking Morgan PFP from GitHub main branch.",
    "Correcting raw.githubusercontent URL format.",
    "Styling .profile-pic with aspect-ratio 1/1.",
    "Applying object-fit cover to profile image.",
    "Adding border-radius 20px to image frame.",
    "Implementing click counter for secret trigger.",
    "Setting clickCount variable to zero.",
    "Adding click event listener to profile-pic.",
    "Implementing 1-second reset timer for clicks.",
    "Defining window.location.href for secret.html.",
    "First draft of secret.html structure.",
    "Setting up dark-room body class.",
    "Implementing radial-gradient flashlight.",
    "Linking e.clientX to flashlight X position.",
    "Linking e.clientY to flashlight Y position.",
    "Adding panic-button with window.close().",
    "Implementing Google redirect fallback.",
    "Creating secret-style.css file.",
    "Creating secret-script.js file.",
    "Drafting Feederism/Gainerism content base.",
    "Designing the pull-chain light switch.",
    "Adding CSS for .chain and .handle.",
    "Implementing .light-on class toggle.",
    "Adjusting ambient-light opacity to 0.8.",
    "Adding overhead-light radial gradient.",
    "Defining corkboard flex/grid layout.",
    "Writing definition: SSBBW.",
    "Writing definition: Immobility.",
    "Writing definition: Belly Stuffing.",
    "Writing definition: Gaining.",
    "Writing definition: Adipophilia.",
    "Writing definition: Blobbing.",
    "Writing personal note: Buttons straining.",
    "Writing personal note: Heavy steps.",
    "Writing personal note: Expansion fever.",
    "Writing Furry note: Dragon girth.",
    "Writing Furry note: Bear softness.",
    "Writing Furry note: Anthro weight.",
    "Writing Medical log: 10k calories.",
    "Writing Medical log: 400lbs milestone.",
    "Writing Medical log: BMI check.",
    "Writing Personal note: Human throne.",
    "Writing Personal note: Immobility goal.",
    "Creating 100-note archive distribution.",
    "Refining CSS for sticky-red notes.",
    "Refining CSS for sticky-blue notes.",
    "Refining CSS for sticky-yellow notes.",
    "Optimizing responsive grid for 100 notes.",
    "Adding rotation transforms to notes.",
    "Fixing z-index on note hover.",
    "Expanding SBHM data sector.",
    "Adding 'Health Issues' fetish notes.",
    "Writing CPAP machine atmospheric note.",
    "Writing mobility scooter log.",
    "Expanding furry species: Fat Dragons.",
    "Expanding furry species: Massive Bulls.",
    "Expanding furry species: Hyper Pigs.",
    "Adding 'Body Dysmorphia' reverse log.",
    "Adding 'Total Surrender' final note.",
    "Adding 'Eternity' expansion note.",
    "Requesting complete site overhaul.",
    "Changing secret room to Changelog mode.",
    "Switching background to pure black.",
    "Switching text to pure white.",
    "Setting accent color to red.",
    "Designing Iteration Log header.",
    "Designing binary code generator.",
    "Implementing random phrase generator.",
    "Generating Log V.001 to V.150.",
    "Mapping history to individual iterations.",
    "Finalizing binary 8-bit hex replacement.",
    "Finalizing 1-by-1 detailed entry list."
];

function generateBinary() {
    return Math.floor(Math.random() * 256).toString(2).padStart(8, '0');
}

function buildLogs() {
    topNote.innerText = `[LOG: ${obsessionPhrases[Math.floor(Math.random()*obsessionPhrases.length)]}] - ADIPOSE_INDEX: ${Math.floor(Math.random()*500)}`;

    let html = "";
    for (let i = 1; i <= 150; i++) {
        const bin = `${generateBinary()} ${generateBinary()}`;
        const phrase = obsessionPhrases[Math.floor(Math.random() * obsessionPhrases.length)];
        // Si no hay hito específico para el número, usa uno genérico de refinamiento
        const task = milestones[i-1] || "Redundancy check and mass stabilization protocol.";

        html += `
            <div class="log-entry">
                <span class="version-tag">V.${i.toString().padStart(3, '0')}</span>
                <span class="binary-code">[${bin}]</span>
                <span class="change-summary">${task}</span>
                <span class="author-note">// "${phrase}"</span>
            </div>
        `;
    }
    logStream.innerHTML = html;
}

document.getElementById('exit-btn').addEventListener('click', () => {
    window.location.href = "index.html";
});

window.onload = buildLogs;
