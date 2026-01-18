/**
 * KUMOJIISANKO - OFFICIAL SITE SCRIPT 2026
 */

const titles = ["Kumojiisanko", "くもじいさんこ"];
const welcomePhrases = [
    "Welcome to my winter corner.",
    "Enjoy the visit!",
    "It's snowing a lot, bundle up!",
    "Beautiful weather, isn't it?",
    "Make yourself at home in this cold season.",
    "Thanks for stopping by!",
    "ようこそ",
    "モノクロームのキャンバス？",
    "愛は残酷だ",
    "Winter is beautiful",
    "Watch out, the ink is still wet.",
    "A fat dragon and a fat bear",
    "Love is Cruel",
    "物語の始まり",
    "Im Fat hehe"
];

//64x64
const favicons = [
    "https://raw.githubusercontent.com/GrampyBear/GrampyBear.github.io/8d9dcff52f43b28b0fc3a6139f9a305339bc1e51/Snowflake.png",
    "https://raw.githubusercontent.com/GrampyBear/GrampyBear.github.io/8d9dcff52f43b28b0fc3a6139f9a305339bc1e51/Cloud.png"
];

const createSnow = () => {
    const container = document.getElementById('snow-container');
    if (!container) return;
    const snowCount = window.innerWidth < 768 ? 40 : 110;
    container.innerHTML = ''; 
    for (let i = 0; i < snowCount; i++) {
        const flake = document.createElement('div');
        flake.className = 'snowflake';
        const size = Math.random() * 4 + 2 + 'px';
        flake.style.width = size;
        flake.style.height = size;
        flake.style.left = Math.random() * 100 + '%';
        flake.style.opacity = Math.random() * 0.8;
        flake.style.animationDuration = Math.random() * 5 + 5 + 's';
        flake.style.top = '-10px';
        container.appendChild(flake);
    }
};

const handleRoute = () => {
    const hash = window.location.hash || '#home';
    const targetId = hash.substring(1);
    const currentPage = document.querySelector('.page.active');
    const nextPage = document.getElementById(targetId);

    if (!nextPage) {
        window.location.hash = '#home';
        return;
    }

    if (currentPage && currentPage !== nextPage) {
        currentPage.classList.add('fading-out');
        setTimeout(() => {
            executePageSwitch(currentPage, nextPage);
        }, 500);
    } else {
        executePageSwitch(null, nextPage);
    }
};

const executePageSwitch = (oldPage, newPage) => {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => {
        p.classList.remove('active', 'fading-out');
        p.style.display = 'none';
    });
    newPage.style.display = 'block';
    setTimeout(() => {
        newPage.classList.add('active');
    }, 20);
    applyRandomElements();
    window.scrollTo(0, 0);
};

const applyRandomElements = () => {
    const titleElem = document.getElementById('main-title');
    if (titleElem) titleElem.innerText = titles[Math.floor(Math.random() * titles.length)];
    
    const phraseElem = document.getElementById('welcome-phrase');
    if (phraseElem) phraseElem.innerText = welcomePhrases[Math.floor(Math.random() * welcomePhrases.length)];

    const favElem = document.getElementById('dynamic-favicon');
    if (favElem) favElem.href = favicons[Math.floor(Math.random() * favicons.length)];
};

window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', () => {
    createSnow();
    handleRoute();
});

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(createSnow, 250);
});
