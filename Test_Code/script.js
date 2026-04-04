const gameState = {
    weight: 95.0,
    tension: 0,
    bond: 0,
    currentNode: "inicio"
};

const storyNodes = {
    // --- NODO INICIAL ---
    "inicio": {
        chapter: "PRÓLOGO: EL ÚLTIMO CINTURÓN",
        text: "La cena transcurre en un silencio sepulcral. Tu hijo, Morgan, ha preparado un estofado de buey con una densidad casi cremosa. Sientes que tu abdomen presiona la mesa de madera con una insistencia nueva. Morgan te observa, su mirada se detiene en tu cuello, donde el botón de la camisa parece sufrir para contener tu respiración.",
        options: [
            { text: "Elogiar la comida y pedir una segunda ración", next: "ruta_comida_aceptada" },
            { text: "Intentar levantarte de la mesa para dar un paseo", next: "ruta_resistencia_fisica" },
            { text: "Aflojarte el cinturón frente a él", next: "ruta_intimidad_abierta" }
        ]
    },

    // --- RUTA A: ACEPTACIÓN ---
    "ruta_comida_aceptada": {
        chapter: "CAPÍTULO 1: LA RENDICIÓN",
        text: "Morgan sonríe. Es una sonrisa que no habías visto en él: cargada de una extraña posesividad. Trae una fuente rebosante y, para tu sorpresa, se coloca a tu lado. Empieza a alimentarte él mismo, llevando la cuchara a tu boca. Sientes que tu estómago se expande, estirando la piel de tu vientre hasta que la tela de tu camisa blanca se vuelve traslúcida.",
        update: () => { gameState.weight += 3.5; gameState.bond += 15; },
        options: [
            { text: "Dejar que Morgan desabroche tu camisa para 'darte aire'", next: "escena_torso_expuesto" },
            { text: "Seguir comiendo hasta que no puedas hablar", next: "escena_saturacion_temprana" }
        ]
    },

    // --- RUTA B: RESISTENCIA ---
    "ruta_resistencia_fisica": {
        chapter: "CAPÍTULO 1: EL PESO DE LA EDAD",
        text: "Empujas la silla hacia atrás para levantarte, pero un gemido de la madera te detiene. Tus muslos, ahora mucho más anchos de lo que recordabas, se han encajado entre los brazos de la silla. Morgan no se mueve para ayudarte. Se cruza de brazos, disfrutando de tu lucha contra tu propia masa.",
        update: () => { gameState.tension += 20; },
        options: [
            { text: "Pedirle ayuda a Morgan para salir de la silla", next: "escena_ayuda_humillante" },
            { text: "Hacer un esfuerzo supremo por liberarte", next: "escena_costuras_rotas" }
        ]
    },

    // --- ESCENAS DE DESARROLLO (Ejemplos de hacia dónde va la historia) ---
    "escena_costuras_rotas": {
        chapter: "EL MOMENTO DE LA RUPTURA",
        text: "Haces fuerza. Un sonido violento de tela desgarrándose llena la habitación. La costura trasera de tu pantalón de vestir ha cedido por completo, liberando la presión de tus glúteos masivos. Te quedas congelado, sintiendo el aire frío en tu piel expuesta. Morgan se levanta lentamente. 'Ya no hay ropa que te aguante, papá. ¿Por qué sigues luchando?'.",
        update: () => { gameState.weight += 1.0; gameState.bond += 10; },
        options: [
            { text: "Aceptar que Morgan te compre ropa 'especial' (Túnicas)", next: "ruta_tunicas" },
            { text: "Refugiarte en tu habitación avergonzado", next: "ruta_aislamiento" }
        ]
    },

    "escena_torso_expuesto": {
        chapter: "LA PIEL DEL PATRIARCA",
        text: "Morgan desabrocha los botones uno a uno. Tu abdomen se derrama hacia adelante, liberado de su prisión de nácar. Es una masa pálida, trémula, que sube y baja con tu respiración agitada. Morgan apoya sus manos calientes sobre tus costados, hundiendo los dedos en tu carne blanda. 'Eres tan grande, papá. Y vas a serlo mucho más'.",
        update: () => { gameState.weight += 2.0; gameState.bond += 30; },
        options: [
            { text: "Pedir el postre (Un batido de crema espesa)", next: "ruta_gainer_activo" },
            { text: "Acariciar la mano de tu hijo con gratitud oscura", next: "ruta_incesto_afectivo" }
        ]
    }
    
    // Aquí se expandirían los nodos hasta llegar a 50+ escenas diferentes...
};

function render() {
    const node = storyNodes[gameState.currentNode];
    
    // Actualizar HUD
    document.getElementById('weight').innerText = gameState.weight.toFixed(1);
    document.getElementById('chapter-name').innerText = node.chapter;
    document.getElementById('narrative-text').innerText = node.text;
    
    if (node.update) node.update();

    const optionsBox = document.getElementById('options-stack');
    optionsBox.innerHTML = "";

    node.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = "choice-btn";
        btn.innerText = opt.text;
        btn.onclick = () => {
            gameState.currentNode = opt.next;
            render();
        };
        optionsBox.appendChild(btn);
    });

    // Efecto visual: Si el peso es muy alto, la pantalla se oscurece
    if (gameState.weight > 150) {
        document.getElementById('visual-overlay').style.backgroundColor = "rgba(139, 0, 0, 0.1)";
    }
}

window.onload = render;
