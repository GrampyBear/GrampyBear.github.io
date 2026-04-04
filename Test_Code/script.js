const state = {
    role: "", 
    weight: 90,
    mobility: 100,
    bond: 0,
    chapter: 0,
    scene: "inicio"
};

const story = {
    // --- SELECCIÓN INICIAL ---
    "inicio": {
        desc: "El umbral de una transformación irreversible.",
        text: "La casa está en un silencio sepulcral, solo roto por el sonido de los cubiertos chocando contra la porcelana. El aire huele a mantequilla, azúcar tostada y una tensión familiar que ha cruzado la línea de lo aceptable. Al final de la mesa, el destino aguarda.",
        choices: [
            { text: "Encarnar al Padre (El Patriarca que cede)", next: "padre_cap1_intro" },
            { text: "Encarnar al Hijo (El Arquitecto del exceso)", next: "hijo_cap1_intro" }
        ]
    },

    // ==========================================
    // RUTA DEL PADRE: LA SATURACIÓN DEL PATRIARCA
    // ==========================================
    
    "padre_cap1_intro": {
        update: () => { state.role = "Padre"; state.weight = 95; },
        desc: "Capítulo 1: El Peso de la Autoridad.",
        text: "Siempre fui un hombre de orden. Un contador, un pilar. Pero mis camisas de talla XL ya no engañan a nadie. Mi hijo, Morgan, me mira desde el otro lado de la mesa. Ha preparado una cena que parece diseñada para un batallón. 'Papá, estás trabajando demasiado, necesitas recuperar fuerzas', dice con una sonrisa que oculta algo más oscuro.",
        choices: [
            { text: "Devorar la porción triple con orgullo", weight: 3, bond: 10, next: "padre_cap1_postre" },
            { text: "Dudar, sintiendo la presión de tu cinturón", weight: 1, bond: 5, next: "padre_cap1_duda" }
        ]
    },

    "padre_cap1_postre": {
        desc: "La primera grieta en la armadura.",
        text: "El tercer plato de estofado ha desaparecido. Siento mi abdomen empujar la mesa con una fuerza física que me asusta y me excita a la vez. Morgan se levanta y, sin decir palabra, se coloca detrás de mí. Siento sus manos en mis hombros... y luego bajando hacia mi vientre tenso. 'Te queda mucha capacidad, papá. No te detengas ahora'.",
        choices: [
            { text: "Permitir que te desabroche el pantalón", weight: 2, bond: 25, next: "padre_cap2_crecimiento" },
            { text: "Pedirle que traiga el pastel de chocolate", weight: 5, bond: 15, next: "padre_cap2_crecimiento" }
        ]
    },

    "padre_cap2_crecimiento": {
        update: () => { state.chapter = 2; state.mobility -= 20; },
        desc: "Capítulo 2: La Pérdida de la Forma.",
        text: "Ha pasado un mes. El mundo exterior ya no existe para mí. Mi peso ha escalado a los 135kg. Mis muslos rozan entre sí con cada paso agónico hacia el comedor. Morgan ha dejado de ser solo mi hijo; ahora es mi guardián. Él decide el menú, las horas de ingesta y el tamaño de mis túnicas. Hoy, me ha traído un batido de 4.000 calorías. Mi cuerpo lo desea con una desesperación animal.",
        choices: [
            { text: "Beber hasta que el estómago duela", weight: 8, mobility: -15, next: "padre_cap3_inmovilidad" },
            { text: "Rogar por un masaje en tu piel estirada", weight: 2, bond: 40, next: "padre_cap3_intimidad" }
        ]
    },

    "padre_cap3_inmovilidad": {
        update: () => { state.chapter = 3; state.mobility = 10; state.weight += 30; },
        desc: "Capítulo 3: El Altar de Carne.",
        text: "Peso 180kg. El sofá es ahora mi trono y mi prisión. No puedo levantarme sin que Morgan tire de mis brazos. Siento cómo mi autoridad de padre se ha disuelto en capas de grasa suave y caliente. Él se deleita en mi impotencia, alimentándome mientras me susurra lo hermoso que me veo siendo tan inmenso, tan dependiente, tan suyo.",
        choices: [
            { text: "Ruta Death Gainer: 'No pares de alimentarme'", weight: 50, mobility: -10, next: "final_death_gainer" },
            { text: "Ruta Amorosa: 'Soy tu gran cerdito, hijo'", weight: 20, bond: 100, next: "final_devocion" }
        ]
    },

    // ==========================================
    // RUTA DEL HIJO: EL ARTE DE LA CEBA
    // ==========================================

    "hijo_cap1_intro": {
        update: () => { state.role = "Hijo"; state.weight = 75; },
        desc: "Capítulo 1: El Control del Flujo.",
        text: "Ver a mi padre, el hombre que siempre me dio órdenes, sentarse a comer lo que YO preparé es un triunfo silencioso. He cargado su comida con grasas trans y azúcares ocultos. Quiero ver cuánto puede expandirse ese cuerpo de patriarca antes de que se rinda. 'Come más, papá. Te ves tan... imponente cuando te llenas'.",
        choices: [
            { text: "Obligarlo a limpiar el plato", bond: 15, next: "hijo_cap2_obsesion" },
            { text: "Acariciar su vientre mientras mastica", bond: 30, next: "hijo_cap2_obsesion" }
        ]
    },

    "hijo_cap2_obsesion": {
        update: () => { state.chapter = 2; state.bond += 20; },
        desc: "Capítulo 2: La Transformación del Ídolo.",
        text: "Papá ya no puede ocultar su barriga bajo la ropa normal. Ahora usa batas abiertas. Me encanta verlo jadear solo por masticar. Le he prohibido pesarse; solo yo tengo el control de sus números. El incesto ya no es un tabú, es la recompensa por su obediencia calórica.",
        choices: [
            { text: "Instalar un sistema de alimentación por sonda", bond: 50, next: "hijo_cap3_dios_carne" },
            { text: "Llevarlo a la cama para 'descansar' su peso", bond: 60, next: "hijo_cap3_dios_carne" }
        ]
    },

    // ==========================================
    // FINALES (Múltiples desenlaces)
    // ==========================================

    "final_death_gainer": {
        desc: "FINAL: El Punto de No Retorno.",
        text: "Has alcanzado los 300kg. Tu corazón lucha, pero tu mente está en éxtasis. Te has convertido en una montaña de carne que ya no puede hablar, solo recibir. Tu hijo te mira como a una deidad de la glotonería. Has ganado... o has desaparecido bajo tu propio peso.",
        choices: [{ text: "Volver a empezar", action: () => location.reload() }]
    },

    "final_devocion": {
        desc: "FINAL: El Vínculo Perfecto.",
        text: "La movilidad es nula, pero el amor es absoluto. Eres el padre más grande del mundo, y tu hijo es tu devoto servidor. En esta casa, el exceso es la única ley y tu cuerpo es el testamento de un deseo compartido sin límites.",
        choices: [{ text: "Volver a empezar", action: () => location.reload() }]
    }
};

function render() {
    const scene = story[state.scene];
    if (scene.update) scene.update();

    // Actualizar UI
    document.getElementById('subject-name').innerText = state.role || "---";
    document.getElementById('stat-weight').innerText = state.weight;
    document.getElementById('stat-capacity').innerText = state.mobility + "%";
    document.getElementById('stat-bond').innerText = state.bond + "%";
    
    document.getElementById('scene-description').innerText = scene.desc;
    document.getElementById('scene-text').innerText = scene.text;

    const grid = document.getElementById('choices-grid');
    grid.innerHTML = "";

    scene.choices.forEach(c => {
        const btn = document.createElement('button');
        btn.className = "choice-btn";
        btn.innerText = c.text;
        btn.onclick = () => {
            if (c.action) {
                c.action();
            } else {
                if(c.weight) state.weight += c.weight;
                if(c.mobility) state.mobility += c.mobility;
                if(c.bond) state.bond += c.bond;
                state.scene = c.next;
                render();
            }
        };
        grid.appendChild(btn);
    });

    // Efecto visual de "Gordura" en la pantalla
    if (state.weight > 150) document.body.style.transform = "scale(1.02)";
}

window.onload = render;
