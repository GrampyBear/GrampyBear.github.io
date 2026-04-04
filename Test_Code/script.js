const state = {
    role: "Padre",
    weight: 95,
    waist: 92,
    mobility: 100,
    bond: 0,
    stage: 1,
    history: []
};

const storyData = {
    // ETAPA 1: EL DESPERTAR DEL APETITO
    stage1: {
        title: "Capítulo I: El Patriarca Quebrado",
        text: "Eres un hombre de 45 años, de hombros anchos y una autoridad que solía ser incuestionable. Pero hoy, mientras Morgan (tu hijo) desliza una bandeja de costillas glaseadas frente a ti, sientes que esa autoridad se disuelve. La camisa de tu oficina, una talla L que ya te queda pequeña, tira de tus hombros. Morgan apoya sus manos en el respaldo de tu silla. 'Papá, estás demasiado flaco. Necesitas volumen para imponer respeto'. Sus dedos rozan tu nuca mientras empiezas a comer.",
        choices: [
            { text: "Comer con desesperación hasta que el cinturón duela", weight: 4, waist: 3, bond: 10, next: "cena_progresion" },
            { text: "Pedirle a Morgan que te ayude con el postre", weight: 2, bond: 25, next: "postre_intimidad" }
        ]
    },

    "cena_progresion": {
        title: "La Expansión Inicial",
        text: "La grasa brilla en tus labios. Sientes tu abdomen expandirse contra la mesa de madera. Un pequeño 'pop' resuena: el primer ojal de tu camisa ha cedido bajo la presión de tu vientre creciente. Morgan suelta una carcajada oscura y te sirve un batido de chocolate espeso, cargado de nata y aceites. 'No te detengas, papá. Quiero ver cuánto puedes crecer antes de que la ropa se rinda'.",
        choices: [
            { text: "Beber el batido de un solo trago", weight: 6, waist: 4, next: "stage2_intro" },
            { text: "Dejar que Morgan amase tu barriga expuesta", bond: 40, weight: 1, next: "stage2_intro" }
        ]
    },

    // ETAPA 2: LA PÉRDIDA DE LA MOVILIDAD (Horas de contenido aquí)
    stage2: {
        title: "Capítulo II: Las Costuras Rotas",
        text: "Han pasado tres meses. Tu peso ha escalado a los 145kg. La movilidad es ahora un desafío doloroso y excitante. Tu cintura ha devorado tus pantalones de vestir; ahora solo vistes batas de seda que Morgan te compró. Cada vez que intentas levantarte, tus muslos masivos rozan entre sí, generando un calor abrasador. Morgan es ahora tu sombra. Él prepara 'bombas calóricas' de 8.000 calorías diarias.",
        choices: [
            { text: "Ruta Feederism: Comer desde su regazo", weight: 10, bond: 50, next: "feeder_intimo" },
            { text: "Ruta Gainer: Hacer ejercicios de expansión estomacal", weight: 15, waist: 10, next: "gainer_tecnico" }
        ]
    },

    // SISTEMA DE GENERACIÓN DE EVENTOS (Para alargar la duración)
    "gainer_tecnico": {
        title: "Ingeniería de la Carne",
        text: "Te has obsesionado con los números. Morgan mide tu cintura cada mañana. Hoy, la cinta métrica marca 130cm. Eres una montaña de suavidad. Morgan te obliga a comer mientras estás recostado, para que la gravedad ayude a que la comida baje más rápido. Sientes que tu corazón late con fuerza, cada latido es un tributo a la masa que has ganado por amor a tu hijo.",
        choices: [
            { text: "Aceptar el uso de un embudo (Saturación)", weight: 25, mobility: -30, next: "stage3_intro" },
            { text: "Pedirle que desgarre tu última prenda", bond: 70, next: "stage3_intro" }
        ]
    },

    // ETAPA 3: DEATH GAINERISM / INMOVILIDAD TOTAL
    stage3: {
        title: "Capítulo III: El Altar de la Inmovilidad",
        text: "Peso: 210kg. Tu cuerpo ha conquistado la habitación. Ya no puedes salir de la cama. Eres un monumento vivo de grasa, pliegues y deseo prohibido. Morgan vive para servirte, para limpiar los rincones de tu inmensidad y para asegurarse de que tu boca nunca esté vacía. Eres su padre, pero también eres su creación perfecta. El 'Death Gainerism' ya no es un miedo, es una meta.",
        choices: [
            { text: "Saturación Final: 'No dejes de alimentarme'", weight: 100, next: "final_extremo" },
            { text: "Devoción Absoluta: Ser su mascota inmensa", bond: 100, next: "final_amor" }
        ]
    },

    "final_extremo": {
        title: "FINAL: EL AGUJERO NEGRO DE LA CARNE",
        text: "Has alcanzado un peso incalculable. La luz del sol apenas entra en la habitación, pero no importa. Tu existencia se reduce al placer de la distensión extrema y al tacto de tu hijo alimentándote. Tu corazón da un último suspiro de gloria, hundiéndose bajo 400kg de pura devoción. Eres eterno en tu exceso.",
        choices: [{ text: "REINICIAR EL CICLO", action: () => location.reload() }]
    }
};

function updateUI() {
    const scene = storyData[state.scene] || storyData["stage" + state.stage];
    
    // Stats update
    document.getElementById('stat-weight').innerText = state.weight;
    document.getElementById('stat-waist').innerText = Math.round(state.waist);
    document.getElementById('stat-mobility').innerText = state.mobility;
    document.getElementById('stat-bond').innerText = state.bond;
    document.getElementById('stat-tension').innerText = state.waist > 120 ? "CRÍTICA" : "ALTA";

    document.getElementById('chapter-title').innerText = scene.title;
    document.getElementById('scene-text').innerText = scene.text;

    const container = document.getElementById('choices-container');
    container.innerHTML = "";

    scene.choices.forEach(c => {
        const btn = document.createElement('button');
        btn.className = "choice-btn";
        btn.innerText = c.text;
        btn.onclick = () => {
            if (c.action) return c.action();
            state.weight += (c.weight || 0);
            state.waist += (c.waist || (c.weight * 0.7 || 0));
            state.mobility += (c.mobility || 0);
            state.bond += (c.bond || 0);
            state.scene = c.next;
            
            // Lógica de avance de etapa
            if (state.weight > 130 && state.stage === 1) state.stage = 2;
            if (state.weight > 200 && state.stage === 2) state.stage = 3;
            
            if (state.weight > 150) document.body.classList.add('bloat-fx');
            
            updateUI();
        };
        container.appendChild(btn);
    });
}

state.scene = "stage1";
window.onload = updateUI;
