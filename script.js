// 24 Detailed Time-of-Day Phases
const DAY_PHASES = [
    { startHour: 0,  title: "Deep Midnight", icon: "🌌", desc: "Total silence wraps around the dark sky.", gradient: "linear-gradient(135deg, #020208, #090a14, #121324)" },
    { startHour: 1,  title: "Witching Hour", icon: "🌙", desc: "Stars shine bright at the peak of night.", gradient: "linear-gradient(135deg, #03030a, #0d0c1d, #171226)" },
    { startHour: 2,  title: "Silent Night", icon: "🌠", desc: "The quietest moment before the dawn.", gradient: "linear-gradient(135deg, #04030c, #100b21, #1b0f2e)" },
    { startHour: 3,  title: "Dead of Night", icon: "✨", desc: "The boundary between dreams and reality.", gradient: "linear-gradient(135deg, #050410, #130a24, #210c30)" },
    { startHour: 4,  title: "Pre-Dawn Gloom", icon: "🦉", desc: "The first cool breeze of the morning arrives.", gradient: "linear-gradient(135deg, #080618, #180d2e, #290e38)" },
    { startHour: 5,  title: "First Light", icon: "🕯️", desc: "Darkness slowly starts to yield its grip.", gradient: "linear-gradient(135deg, #0d091f, #211038, #3b1142)" },
    { startHour: 6,  title: "Dawn & Aurora", icon: "🌅", desc: "Purple and golden streaks touch the horizon.", gradient: "linear-gradient(135deg, #180b2b, #4a154b, #8c2d4f, #d96951)" },
    { startHour: 7,  title: "Golden Sunrise", icon: "🌄", desc: "The sun rises, painting the sky with warm colors.", gradient: "linear-gradient(135deg, #2b1038, #7a2348, #e05347, #f7a35c)" },
    { startHour: 8,  title: "Early Morning", icon: "☀️", desc: "Fresh light starts the brand new day.", gradient: "linear-gradient(135deg, #3d1c47, #a83b54, #f27d52, #fcd077)" },
    { startHour: 9,  title: "Morning Glow", icon: "🌤️", desc: "Bright sunlight fills the entire sky.", gradient: "linear-gradient(135deg, #1c3b5e, #3a6b8c, #72a5ba, #d4e8ed)" },
    { startHour: 10, title: "Mid-Morning", icon: "☕", desc: "The day's momentum reaches full speed.", gradient: "linear-gradient(135deg, #1b4d75, #357ca8, #6bb3d6, #bde3f2)" },
    { startHour: 11, title: "Approaching Noon", icon: "🌤️", desc: "Shadows shrink under the high sun.", gradient: "linear-gradient(135deg, #165b8c, #2b8cb8, #5dc2e8, #cbebfa)" },
    { startHour: 12, title: "Solar Zenith / Noon", icon: "🌞", desc: "The sun reaches its highest point in the sky.", gradient: "linear-gradient(135deg, #0f6ba8, #229fd9, #59cdff, #e1f5ff)" },
    { startHour: 13, title: "Early Afternoon", icon: "🌡️", desc: "Bright and warm sun of early afternoon.", gradient: "linear-gradient(135deg, #18659c, #328ebf, #6dc2e3, #d2f0fb)" },
    { startHour: 14, title: "Post-Lunch Calm", icon: "🍃", desc: "A gentle pause in the middle of the day.", gradient: "linear-gradient(135deg, #205e8f, #4182a8, #7eb8cd, #ded5be)" },
    { startHour: 15, title: "Mid-Afternoon", icon: "🕶️", desc: "The sun begins its gradual descent westward.", gradient: "linear-gradient(135deg, #285482, #56779e, #a39b8b, #e6c594)" },
    { startHour: 16, title: "Golden Hour", icon: "🌾", desc: "Soft, golden light bathes everything around.", gradient: "linear-gradient(135deg, #2c436b, #6b617b, #c48375, #f5b373)" },
    { startHour: 17, title: "Sunset Glow", icon: "🌆", desc: "Rich orange and red hues dominate the sky.", gradient: "linear-gradient(135deg, #282c57, #663d63, #b84c5f, #f28052)" },
    { startHour: 18, title: "Dusk Twilight", icon: "🌇", desc: "The sun disappears, leaving a trail of violet.", gradient: "linear-gradient(135deg, #1c1c42, #47264a, #85334d, #c9524d)" },
    { startHour: 19, title: "Blue Hour", icon: "🏙️", desc: "A magical transition from daylight to night.", gradient: "linear-gradient(135deg, #101230, #241c40, #4c2548, #78354c)" },
    { startHour: 20, title: "Nightfall", icon: "🌃", desc: "City lights turn on as stars emerge.", gradient: "linear-gradient(135deg, #090a21, #15132b, #2d1836, #421b38)" },
    { startHour: 21, title: "Early Night", icon: "🌌", desc: "Darkness completely settles over the city.", gradient: "linear-gradient(135deg, #050617, #0e0e21, #1d142b)" },
    { startHour: 22, title: "Late Night", icon: "🌠", desc: "Time for cozy rest and night calm.", gradient: "linear-gradient(135deg, #030410, #09081a, #140d21)" },
    { startHour: 23, title: "Final Hour", icon: "💤", desc: "The day fades away, preparing for a new cycle.", gradient: "linear-gradient(135deg, #02020a, #060512, #0d0817)" }
];

// Channel Profiles (Filters & Signal Labels)
const CHANNELS = [
    { num: 1, class: "mode-no-signal", signal: "⚠ NO SIGNAL" },
    { num: 2, class: "mode-green",     signal: "● GREEN MATRIX" },
    { num: 3, class: "mode-default",   signal: "● LIVE SIGNAL" },
    { num: 4, class: "mode-static",    signal: "⚡ STATIC NOISE" },
    { num: 5, class: "mode-bw",        signal: "● B&W RETRO" },
    { num: 6, class: "mode-amber",     signal: "● AMBER CRT" },
    { num: 7, class: "mode-offair",    signal: "✖ SEARCHING..." },
    { num: 8, class: "mode-magenta",   signal: "● CYBER VISION" }
];

// DOM Elements
const elH1 = document.getElementById('h1');
const elH2 = document.getElementById('h2');
const elM1 = document.getElementById('m1');
const elM2 = document.getElementById('m2');
const elS1 = document.getElementById('s1');
const elS2 = document.getElementById('s2');

const dateText = document.getElementById('date-text');
const phaseIcon = document.getElementById('phase-icon');
const phaseTitle = document.getElementById('phase-title');
const phaseDesc = document.getElementById('phase-desc');
const skyBg = document.getElementById('sky-bg');

const tvScreen = document.getElementById('tv-screen');
const powerBtn = document.getElementById('power-btn');
const knobTune = document.getElementById('knob-tune');
const knobVol = document.getElementById('knob-vol');
const chBadge = document.getElementById('ch-badge');
const signalText = document.getElementById('signal-text');

let currentPhaseIndex = -1;
let isTvOn = true;
let channelIndex = 2; // CH-03 default index
let tuneAngle = 0;
let volAngle = 0;

function updateClock() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    elH1.textContent = hours[0];
    elH2.textContent = hours[1];
    elM1.textContent = minutes[0];
    elM2.textContent = minutes[1];
    elS1.textContent = seconds[0];
    elS2.textContent = seconds[1];

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateText.textContent = now.toLocaleDateString('en-US', options).toUpperCase();

    const currentHour = now.getHours();
    const phase = DAY_PHASES.find(p => p.startHour === currentHour) || DAY_PHASES[0];

    if (currentPhaseIndex !== currentHour) {
        currentPhaseIndex = currentHour;
        phaseIcon.textContent = phase.icon;
        phaseTitle.textContent = phase.title.toUpperCase();
        phaseDesc.textContent = phase.desc;
        skyBg.style.background = phase.gradient;
    }
}

// Power Toggle (CRT Turn Off Animation)
powerBtn.addEventListener('click', () => {
    isTvOn = !isTvOn;

    if (isTvOn) {
        tvScreen.classList.remove('power-off');
        powerBtn.classList.remove('off');
    } else {
        tvScreen.classList.add('power-off');
        powerBtn.classList.add('off');
    }
});

// Channel Tuning & Interference
knobTune.addEventListener('click', () => {
    if (!isTvOn) return;

    // Rotate Knob 45 degrees
    tuneAngle = (tuneAngle + 45) % 360;
    knobTune.style.transform = `rotate(${tuneAngle}deg)`;

    // Change Channel Index
    channelIndex = (channelIndex + 1) % CHANNELS.length;
    const ch = CHANNELS[channelIndex];

    // Remove previous channel CSS classes
    CHANNELS.forEach(c => tvScreen.classList.remove(c.class));

    // Apply glitch effect & new channel styling
    tvScreen.classList.add('glitch');
    tvScreen.classList.add(ch.class);
    
    chBadge.textContent = `CH-${String(ch.num).padStart(2, '0')}`;
    signalText.textContent = ch.signal;

    setTimeout(() => {
        tvScreen.classList.remove('glitch');
    }, 250);
});

// Volume Knob Rotate
knobVol.addEventListener('click', () => {
    volAngle = (volAngle + 30) % 360;
    knobVol.style.transform = `rotate(${volAngle}deg)`;
});

// Init
updateClock();
setInterval(updateClock, 1000);
