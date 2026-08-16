// Array con 24 momentos del día bien diferenciados (1 por cada hora)
const DAY_PHASES = [
    { startHour: 0,  title: "Medianoche Profunda", icon: "🌌", desc: "El silencio total envuelve la oscuridad.", gradient: "linear-gradient(135deg, #020208, #090a14, #121324)" },
    { startHour: 1,  title: "Hora del Misterio", icon: "🌙", desc: "Las estrellas brillan en lo más alto del firmamento.", gradient: "linear-gradient(135deg, #03030a, #0d0c1d, #171226)" },
    { startHour: 2,  title: "Madrugada Serena", icon: "🌠", desc: "La noche alcanza su punto de máxima calma.", gradient: "linear-gradient(135deg, #04030c, #100b21, #1b0f2e)" },
    { startHour: 3,  title: "Hora Bruja", icon: "✨", desc: "La frontera entre el sueño y la vigilia.", gradient: "linear-gradient(135deg, #050410, #130a24, #210c30)" },
    { startHour: 4,  title: "Penumbra Nocturna", icon: "🦉", desc: "Los primeros susurros del viento matutino.", gradient: "linear-gradient(135deg, #080618, #180d2e, #290e38)" },
    { startHour: 5,  title: "Primer Despertar", icon: "🕯️", desc: "La oscuridad comienza a perder su densidad.", gradient: "linear-gradient(135deg, #0d091f, #211038, #3b1142)" },
    { startHour: 6,  title: "Alba y Aurora", icon: "🌅", desc: "Destellos púrpuras y dorados en el horizonte.", gradient: "linear-gradient(135deg, #180b2b, #4a154b, #8c2d4f, #d96951)" },
    { startHour: 7,  title: "Amanecer Dorado", icon: "🌄", desc: "El sol emerge pintando el cielo de fuego dulce.", gradient: "linear-gradient(135deg, #2b1038, #7a2348, #e05347, #f7a35c)" },
    { startHour: 8,  title: "Sol Naciente", icon: "☀️", desc: "Luz fresca e inicio de las actividades diarias.", gradient: "linear-gradient(135deg, #3d1c47, #a83b54, #f27d52, #fcd077)" },
    { startHour: 9,  title: "Mañana Temprana", icon: "🌤️", desc: "El brillo matutino ilumina todo con claridad.", gradient: "linear-gradient(135deg, #1c3b5e, #3a6b8c, #72a5ba, #d4e8ed)" },
    { startHour: 10, title: "Mañana Plena", icon: "☕", desc: "La energía del día se encuentra en ascenso.", gradient: "linear-gradient(135deg, #1b4d75, #357ca8, #6bb3d6, #bde3f2)" },
    { startHour: 11, title: "Mediodía Cercano", icon: "🌤️", desc: "Las sombras se acortan bajo el sol radiante.", gradient: "linear-gradient(135deg, #165b8c, #2b8cb8, #5dc2e8, #cbebfa)" },
    { startHour: 12, title: "Zénit / Mediodía", icon: "🌞", desc: "El sol alcanza la cima máxima del cielo.", gradient: "linear-gradient(135deg, #0f6ba8, #229fd9, #59cdff, #e1f5ff)" },
    { startHour: 13, title: "Tarde Temprana", icon: "🌡️", desc: "Luz intensa y calor de primera hora de la tarde.", gradient: "linear-gradient(135deg, #18659c, #328ebf, #6dc2e3, #d2f0fb)" },
    { startHour: 14, title: "Hora de Sobremesa", icon: "🍃", desc: "Momento de pausa y calma vespertina.", gradient: "linear-gradient(135deg, #205e8f, #4182a8, #7eb8cd, #ded5be)" },
    { startHour: 15, title: "Plena Tarde", icon: "🕶️", desc: "El sol comienza su lento declive hacia el oeste.", gradient: "linear-gradient(135deg, #285482, #56779e, #a39b8b, #e6c594)" },
    { startHour: 16, title: "Tarde Dorada", icon: "🌾", desc: "Luz cálida y dorada bañando la superficie.", gradient: "linear-gradient(135deg, #2c436b, #6b617b, #c48375, #f5b373)" },
    { startHour: 17, title: "Atardecer / Ocaso", icon: "🌆", desc: "Los matices anaranjados y rojizos se apoderan del aire.", gradient: "linear-gradient(135deg, #282c57, #663d63, #b84c5f, #f28052)" },
    { startHour: 18, title: "Crepúsculo", icon: "🌇", desc: "El sol se oculta dejando un rastro violeta.", gradient: "linear-gradient(135deg, #1c1c42, #47264a, #85334d, #c9524d)" },
    { startHour: 19, title: "Hora Azul", icon: "🏙️", desc: "Transición mágica entre la luz diurna y la noche.", gradient: "linear-gradient(135deg, #101230, #241c40, #4c2548, #78354c)" },
    { startHour: 20, title: "Anochecer", icon: "🌃", desc: "Aparecen las primeras estrellas y luces urbanas.", gradient: "linear-gradient(135deg, #090a21, #15132b, #2d1836, #421b38)" },
    { startHour: 21, title: "Noche Primaveral", icon: "🌌", desc: "El manto nocturno cubre por completo la tierra.", gradient: "linear-gradient(135deg, #050617, #0e0e21, #1d142b)" },
    { startHour: 22, title: "Noche Cerrada", icon: "🌠", desc: "Hora de descanso y tranquilidad hogareña.", gradient: "linear-gradient(135deg, #030410, #09081a, #140d21)" },
    { startHour: 23, title: "Penúltima Hora", icon: "💤", desc: "El día se desvanece preparando el nuevo ciclo.", gradient: "linear-gradient(135deg, #02020a, #060512, #0d0817)" }
];

// Elementos DOM
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

let currentPhaseIndex = -1;

function updateClock() {
    const now = new Date();

    // Obtener horas, minutos y segundos formateados
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Actualizar dígitos cúbicos individuales
    elH1.textContent = hours[0];
    elH2.textContent = hours[1];
    elM1.textContent = minutes[0];
    elM2.textContent = minutes[1];
    elS1.textContent = seconds[0];
    elS2.textContent = seconds[1];

    // Formatear Fecha Local
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateText.textContent = now.toLocaleDateString('es-ES', options).toUpperCase();

    // Determinar la fase del día actual
    const currentHour = now.getHours();
    const phase = DAY_PHASES.find(p => p.startHour === currentHour) || DAY_PHASES[0];

    // Actualizar texto e icono del momento del día y degradado suave del fondo
    if (currentPhaseIndex !== currentHour) {
        currentPhaseIndex = currentHour;
        phaseIcon.textContent = phase.icon;
        phaseTitle.textContent = phase.title.toUpperCase();
        phaseDesc.textContent = phase.desc;
        
        // Cambio de degradado suave mediante CSS transition
        skyBg.style.background = phase.gradient;
    }
}

// Iniciar reloj
updateClock();
setInterval(updateClock, 1000);
