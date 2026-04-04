/**
 * MOTOR NARRATIVO: "EL PESO DEL LINAJE"
 * Una experiencia de Gainerism, Feederism e Incesto Gay.
 */

const state = {
    role: "", 
    phase: 0, // 0: Inicio, 1: Crecimiento, 2: Obesidad, 3: Inmovilidad/Final
    weight: 90,
    arousal: 0,
    fullness: 0,
    isStuck: false, // Si el personaje ya no puede moverse
    history: []
};

const storyNodes = {
    // --- RUTA: SER EL PADRE (RECIBIR) ---
    padre: [
        { // Fase 0: Inicio
            desc: "La cocina huele a grasa y azúcar. Tu hijo, Morgan, te sirve un plato rebosante.",
            text: "Soy un hombre grande, un padre que siempre impuso respeto. Pero ver a mi hijo mirándome así, mientras empuja una montaña de panqueques con sirope hacia mí, me hace sentir... dócil. Mi camisa de oficina tira peligrosamente de los botones.",
            choices: [
                { text: "Comer todo para demostrar que 'puedes manejarlo'", weight: 5, arousal: 10, next: 1 },
                { text: "Dejar que él te desabroche el primer botón", weight: 2, arousal: 25, next: 1 }
            ]
        },
        { // Fase 1: Crecimiento
            desc: "Han pasado semanas. Tu vientre ahora descansa permanentemente sobre tus muslos.",
            text: "El 'gainerism' dejó de ser un experimento. Morgan ahora cocina para mí cinco veces al día. Siento cómo mi piel se estira, caliente y sensible. Hoy, él se sienta en mis rodillas —lo cual es difícil ahora— y me obliga a beber un batido espeso. 'Papá, te estás volviendo tan suave', susurra.",
            choices: [
                { text: "Aceptar el batido y pedir un segundo", weight: 8, arousal: 30, next: 2 },
                { text: "Gemir mientras él amasa tu barriga creciente", weight: 4, arousal: 50, next: 2 }
            ]
        },
        { // Fase 2: Obesidad Crítica
            desc: "Tu peso ha superado los 160kg. La movilidad es un recuerdo lejano.",
            text: "Mis piernas apenas sostienen mi volumen. Vivo en el sofá, vistiendo solo una bata que no cierra. Mi hijo se deleita en mi incapacidad. Me alimenta con una cuchara, como si fuera un bebé gigante. El deseo entre nosotros es tan denso como la grasa que me cubre.",
            choices: [
                { text: "Entregarte al 'Death Gainerism' (Comer hasta el límite)", weight: 15, arousal: 60, next: 3 },
                { text: "Pedirle que use un embudo (Feederism extremo)", weight: 20, arousal: 80, next: 3 }
            ]
        },
        { // Fase 3: El Final de la Carne
            desc: "Inamovible. Una montaña de placer y carne en el centro de la casa.",
            text: "Ya no hay vuelta atrás. Peso más de 250kg. Soy el fetiche viviente de mi hijo. Él vive para mantenerme lleno, para limpiar los pliegues de mi cuerpo inmenso. Soy su padre, su amante y su obra de arte. Mi corazón late pesado, celebrando cada caloría.",
            choices: [{ text: "REINICIAR LA TRANSFORMACIÓN", action: () => location.reload() }]
        }
    ],

    // --- RUTA: SER EL HIJO (ALIMENTAR) ---
    hijo: [
        { // Fase 0: El Plan
            desc: "Ves a tu padre sentado, aún mantiene esa figura de autoridad.",
            text: "Él no sabe lo que le espera. He estado añadiendo polvos hipercalóricos a sus comidas. Quiero ver ese abdomen de acero convertirse en una masa blanda y enorme. 'Cenemos, papá', le digo, mientras le sirvo una porción triple.",
            choices: [
                { text: "Elogiar su 'gran apetito'", weight: 4, arousal: 15, next: 1 },
                { text: "Tocar su abdomen 'por accidente'", weight: 1, arousal: 30, next: 1 }
            ]
        },
        { // Fase 1: La Dominación
            desc: "Papá está ganando peso rápidamente. Sus trajes ya no le quedan.",
            text: "Es excitante verlo jadear al subir las escaleras. Lo tengo justo donde quiero. Cada vez que come, lo hace con una culpa que me fascina. Se está convirtiendo en un 'gainer' por mi mano. Le obligo a comer postre tras postre mientras le llamo 'cerdito'.",
            choices: [
                { text: "Comprarle ropa tres tallas más grande", weight: 7, arousal: 40, next: 2 },
                { text: "Hacerle comer de tu mano directamente", weight: 5, arousal: 55, next: 2 }
            ]
        },
        { // Fase 2: El Dueño del Cuerpo
            desc: "Él ya no puede salir de casa. Depende de ti para todo.",
            text: "Mi padre es ahora una masa de carne sumisa. Su autoridad se hundió bajo capas de grasa. Me encanta verlo luchar por respirar mientras lo sigo cebando. El incesto es solo un ingrediente más en este festín de exceso físico.",
            choices: [
                { text: "Llevarlo al punto de no retorno (Inmovilidad)", weight: 20, arousal: 70, next: 3 },
                { text: "Celebrar su nuevo cuerpo con caricias prohibidas", weight: 10, arousal: 90, next: 3 }
            ]
        },
        { // Fase 3: La Obra Completa
            desc: "Has creado un dios de la glotonería.",
            text: "Mi padre es ahora una entidad puramente física que apenas puede hablar. Lo he convertido en lo que siempre deseé: un ser inmenso que solo existe para ser alimentado y adorado por mí. He ganado.",
            choices: [{ text: "REINICIAR LA TRANSFORMACIÓN", action: () => location.reload() }]
        }
    ]
};

function updateUI() {
    const currentData = storyNodes[state.role][state.phase];
    
    document.getElementById('subject-name').innerText = state.role.toUpperCase();
    document.getElementById('stat-weight').innerText = state.weight;
    document.getElementById('stat-capacity').innerText = state.arousal + "%";
    document.getElementById('stat-bond').innerText = state.phase + 1; // Representa el nivel de progreso

    document.getElementById('scene-description').innerText = currentData.desc;
    document.getElementById('scene-text').innerText = currentData.text;

    const container = document.getElementById('choices-grid');
    container.innerHTML = "";

    currentData.choices.forEach(c => {
        const btn = document.createElement('button');
        btn.className = "choice-btn";
        btn.innerText = c.text;
        btn.onclick = () => {
            if (c.action) {
                c.action();
            } else {
                state.weight += c.weight;
                state.arousal += c.arousal;
                state.phase = c.next;
                if (state.weight > 140) document.body.classList.add('heavy-mode');
                updateUI();
            }
        };
        container.appendChild(btn);
    });
}

function initRole(r) {
    state.role = r;
    state.weight = (r === "padre") ? 92 : 75;
    updateUI();
}

// Iniciar con la pantalla de selección del index.html original
window.onload = () => {
    // Si quieres que empiece directo, llama a initRole("padre") aquí.
};
