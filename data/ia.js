/* Fundamentos de Inteligencia Artificial (IDSSI-52) — contenido de estudio */
window.AULA = window.AULA || { materias: [], juegos: [] };
AULA.materias.push({
  id: 'ia', nombre: 'Fundamentos de IA', corto: 'IA', clave: 'IDSSI-52', horas: 64,
  profe: 'M.E. Magdiel Pascual García Juárez', color: 'ia',
  objetivo: 'Comprender los principios, técnicas y aplicaciones de la IA para crear soluciones a problemas complejos.',
  parciales: { 1: [1, 2], 2: [3, 4], 3: [5, 6] },
  evidencias: [
    'Parcial 1: línea del tiempo de la IA, ejercicios de lógica y cuadro comparativo de paradigmas de aprendizaje, análisis de casos con reflexión ética.',
    'Parcial 2: tabla comparativa agente vs programa, mapa conceptual de agentes y ambientes, diseño de un agente inteligente (diagrama de arquitectura).',
    'Proyecto final sugerido: procesamiento de imágenes, robótica o un problema del entorno universitario.'
  ],
  unidades: [
  { n: 1, titulo: 'Introducción a la Inteligencia Artificial', temas: [
    { id: '1.1', t: 'Inteligencia biológica: lo que conocemos del cerebro',
      md: `El cerebro humano tiene alrededor de **86 mil millones de neuronas**. Cada una se conecta con miles de otras mediante **sinapsis**, así que hablamos de cientos de billones de conexiones. Consume unos **20 watts**, menos que un foco.

### Cómo funciona una neurona
- Las **dendritas** reciben señales de otras neuronas.
- El **soma** (cuerpo) suma esas señales.
- Si la suma pasa un **umbral**, la neurona "dispara" un impulso por el **axón**.
- Las sinapsis pueden ser **excitatorias** (empujan a disparar) o **inhibitorias** (frenan).

### Aprender es cambiar conexiones
La **plasticidad sináptica** es la capacidad de reforzar o debilitar sinapsis con la experiencia. Donald Hebb (1949) lo resumió así: *las neuronas que se disparan juntas, se conectan*. Esta idea es la raíz de casi todo el aprendizaje automático: aprender = ajustar pesos.

### Del cerebro a la neurona artificial
En 1943 McCulloch y Pitts propusieron un modelo matemático: entradas multiplicadas por **pesos**, una **suma** y una **función de activación** con umbral. En 1958 Rosenblatt construyó el **perceptrón**, que aprendía esos pesos a partir de ejemplos.

| Cerebro | Red neuronal artificial |
|---|---|
| Dendritas | Entradas x₁, x₂… |
| Fuerza de la sinapsis | Peso w |
| Soma (suma) | Σ wᵢxᵢ + b |
| Umbral de disparo | Función de activación |
| Axón | Salida |

> Ojo: las redes neuronales están **inspiradas** en el cerebro, no lo copian. El cerebro es masivamente paralelo, asíncrono y aprende con muy pocos ejemplos; una red artificial necesita muchos datos.`,
      clave: ['Neurona: dendritas → soma → axón', 'Sinapsis excitatorias e inhibitorias', 'Plasticidad y regla de Hebb', 'Neurona de McCulloch-Pitts (1943) y perceptrón (1958)'],
      pr: { p: 'Una neurona artificial tiene entradas x = (1, 0, 1), pesos w = (0.5, -0.4, 0.3), sesgo b = -0.6 y activación escalón (salida 1 si la suma ≥ 0). ¿Qué produce?', r: 'Suma = 1·0.5 + 0·(-0.4) + 1·0.3 - 0.6 = 0.2. Como 0.2 ≥ 0, la salida es **1** (la neurona "dispara").' },
      q: [
        ['¿Qué parte de la neurona artificial representa la fuerza de una sinapsis?', ['La función de activación', 'El peso', 'La salida', 'El sesgo'], 1, 'El peso multiplica a cada entrada, igual que una sinapsis fuerte o débil amplifica o atenúa la señal.'],
        ['La regla de Hebb dice que…', ['Las neuronas mueren con la edad', 'Las neuronas que se disparan juntas refuerzan su conexión', 'El cerebro usa 10% de su capacidad', 'Una neurona tiene un solo peso'], 1, 'Es el principio de la plasticidad: la coactivación refuerza la sinapsis.'],
        ['¿Quién construyó el perceptrón en 1958?', ['Alan Turing', 'Frank Rosenblatt', 'John McCarthy', 'Geoffrey Hinton'], 1, 'Frank Rosenblatt, en el Cornell Aeronautical Laboratory.']
      ],
      c: [['Sinapsis', 'Conexión entre dos neuronas; su fuerza cambia con el aprendizaje.'], ['Plasticidad sináptica', 'Capacidad de reforzar o debilitar conexiones con la experiencia.'], ['Perceptrón', 'Neurona artificial que aprende sus pesos con ejemplos (Rosenblatt, 1958).']] },

    { id: '1.2', t: 'Historia de la IA: de Turing a la actualidad',
      md: `La IA ha tenido épocas de euforia y de desilusión (los **inviernos de la IA**). Esta es la ruta esencial:

| Año | Hito |
|---|---|
| 1943 | McCulloch y Pitts: modelo matemático de la neurona |
| 1950 | Turing publica *Computing Machinery and Intelligence* y propone el juego de imitación |
| 1956 | Conferencia de **Dartmouth**: McCarthy, Minsky, Shannon y Rochester acuñan "inteligencia artificial" |
| 1958 | Perceptrón de Rosenblatt |
| 1966 | ELIZA, primer chatbot (Weizenbaum) |
| 1969 | Minsky y Papert muestran los límites del perceptrón → primer invierno (años 70) |
| 1970s-80s | **Sistemas expertos** (MYCIN, XCON): reglas escritas por humanos |
| fines 80s | Segundo invierno: los sistemas expertos eran caros y frágiles |
| 1986 | Rumelhart, Hinton y Williams popularizan **backpropagation** |
| 1997 | **Deep Blue** (IBM) vence a Kasparov en ajedrez |
| 2012 | **AlexNet** gana ImageNet con una red profunda en GPU → explosión del *deep learning* |
| 2016 | **AlphaGo** (DeepMind) vence a Lee Sedol en Go |
| 2017 | Artículo *Attention Is All You Need*: nace el **Transformer** |
| 2022 | ChatGPT lleva los modelos de lenguaje al público |
| hoy | Modelos multimodales, agentes que usan herramientas, IA en el teléfono |

### Tres enfoques que se alternaron
- **Simbólico**: el conocimiento se escribe como reglas y lógica (sistemas expertos).
- **Conexionista**: el conocimiento se aprende en los pesos de redes neuronales.
- **Estadístico/probabilístico**: modelos que razonan con incertidumbre (redes bayesianas, aprendizaje automático clásico).

Lo que destrabó la IA moderna fue la combinación de **datos masivos + GPUs + mejores algoritmos**.`,
      clave: ['Dartmouth 1956: nace el término', 'Dos inviernos de la IA', 'Simbólico vs conexionista', '2012 AlexNet y 2017 Transformer'],
      pr: { p: 'Para tu evidencia del parcial 1 (línea del tiempo): elige 8 hitos y escribe para cada uno qué problema resolvió y qué enfoque usó (simbólico, conexionista o estadístico).', r: 'Ejemplo: Deep Blue (1997) → búsqueda y evaluación con reglas, enfoque simbólico. AlexNet (2012) → reconocimiento de imágenes, conexionista. MYCIN → diagnóstico médico con reglas, simbólico.' },
      q: [
        ['¿En qué evento se acuñó el término "inteligencia artificial"?', ['Conferencia de Dartmouth, 1956', 'Publicación de Turing, 1950', 'Victoria de Deep Blue, 1997', 'Creación de ELIZA, 1966'], 0, 'John McCarthy propuso el nombre para el taller de Dartmouth de 1956.'],
        ['¿Qué causó en buena parte el primer invierno de la IA?', ['La llegada de las GPU', 'El libro de Minsky y Papert sobre los límites del perceptrón', 'El éxito de AlphaGo', 'La invención del Transformer'], 1, 'Mostraron que un perceptrón simple no resuelve problemas como XOR, y los fondos se redujeron.'],
        ['¿Qué arquitectura apareció en 2017 y es la base de los modelos de lenguaje actuales?', ['Perceptrón', 'Red convolucional', 'Transformer', 'Sistema experto'], 2, 'El Transformer usa el mecanismo de atención y es la base de GPT, Claude, BERT, etc.']
      ],
      c: [['Invierno de la IA', 'Periodo de baja inversión e interés tras promesas incumplidas (años 70 y fines de los 80).'], ['Sistema experto', 'Programa que razona con reglas SI-ENTONCES escritas por especialistas.'], ['AlexNet (2012)', 'Red profunda entrenada en GPU que ganó ImageNet y detonó el deep learning.']] },

    { id: '1.3', t: 'Test de Turing',
      md: `En 1950 Alan Turing cambió la pregunta "¿pueden pensar las máquinas?" (difícil de definir) por una prueba práctica: el **juego de imitación**.

### Cómo funciona
1. Un **interrogador** humano conversa por texto con dos participantes ocultos: una persona y una máquina.
2. Hace las preguntas que quiera.
3. Si no logra distinguir de forma confiable cuál es la máquina, se dice que la máquina **pasa la prueba**.

### Críticas importantes
- **La habitación china** (John Searle, 1980): alguien que no sabe chino sigue un manual de reglas para responder mensajes en chino. Desde fuera parece entender, pero solo manipula símbolos. Searle concluye que **comportarse como inteligente no implica comprender**.
- La prueba mide **imitación del lenguaje humano**, no otras formas de inteligencia (visión, planeación, sentido común).
- Se puede "engañar" con trucos: ELIZA y Eugene Goostman (2014) usaron evasivas y personalidades para parecer humanos.

### Variantes
- **CAPTCHA** = *Completely Automated Public Turing test to tell Computers and Humans Apart*. Es un test de Turing **inverso**: una máquina decide si eres humano.
- **Test de Turing total**: agrega visión y manipulación de objetos (requiere percepción y robótica).

> Hoy los modelos de lenguaje conversan de forma muy humana, así que la discusión se movió a otra pregunta: ¿qué entienden realmente y cómo lo medimos?`,
      clave: ['Juego de imitación (1950)', 'Interrogador, humano y máquina', 'Habitación china de Searle', 'CAPTCHA como test inverso'],
      pr: { p: 'Escribe 5 preguntas que harías como interrogador para detectar a una máquina. Explica qué debilidad intenta revelar cada una.', r: 'Ideas: sentido común físico ("¿qué pasa si metes un hielo en el bolsillo?"), memoria de la conversación, chistes con doble sentido locales, preguntas sobre experiencias corporales, errores intencionales de ortografía para ver cómo reacciona.' },
      q: [
        ['En el test de Turing, ¿quién decide si la máquina pasa?', ['Un programa evaluador', 'Un interrogador humano', 'El propio Turing', 'Un jurado de máquinas'], 1, 'El interrogador humano intenta distinguir a la máquina de la persona.'],
        ['¿Qué argumenta la habitación china de Searle?', ['Que las máquinas sí entienden', 'Que manipular símbolos correctamente no implica comprender', 'Que el chino es difícil', 'Que los CAPTCHA no sirven'], 1, 'La sintaxis (reglas) no basta para tener semántica (significado).'],
        ['Un CAPTCHA es…', ['Un test de Turing inverso', 'Un tipo de red neuronal', 'Un sistema experto', 'Un algoritmo de cifrado'], 0, 'Lo aplica una máquina para saber si quien responde es humano.']
      ],
      c: [['Juego de imitación', 'Propuesta de Turing (1950): si un interrogador no distingue a la máquina del humano, la máquina pasa.'], ['Habitación china', 'Experimento mental de Searle (1980): imitar no es comprender.']] },

    { id: '1.4', t: 'Áreas de aplicación',
      md: `La IA no es una sola técnica, es una familia de áreas que se combinan.

| Área | Qué hace | Ejemplo |
|---|---|---|
| Visión por computadora | Interpreta imágenes y video | Detectar plagas en hojas de café |
| Procesamiento de lenguaje natural | Entiende y genera texto o voz | Traductor, asistente de voz |
| Robótica | Percibe y actúa en el mundo físico | Robot que clasifica paquetes |
| Sistemas de recomendación | Sugiere elementos según gustos | Netflix, Spotify, tiendas en línea |
| Sistemas expertos | Razona con reglas de un dominio | Apoyo al diagnóstico médico |
| Planeación y búsqueda | Encuentra secuencias de acciones | Rutas en GPS, logística |
| Juegos | Decide jugadas óptimas | Ajedrez, Go, videojuegos |
| Análisis predictivo | Pronostica valores futuros | Demanda de energía, clima |

### IA estrecha vs IA general
- **IA estrecha (débil)**: muy buena en una tarea concreta. Es toda la IA que existe hoy en producción.
- **IA general (AGI)**: capacidad de aprender y razonar en cualquier dominio como un humano. Es una meta de investigación y un tema de debate.

### Sectores
Salud (imágenes médicas), finanzas (detección de fraude), agricultura (riego de precisión), transporte (vehículos autónomos), educación (tutores adaptativos), seguridad (detección de intrusiones en redes).`,
      clave: ['Visión, PLN, robótica, recomendación', 'IA estrecha vs IA general', 'Aplicaciones por sector'],
      pr: { p: 'Piensa en tu universidad o tu comunidad. Propón 3 problemas que podría resolver la IA e indica qué área usarías en cada uno.', r: 'Ej.: conteo de asistencia con visión; chatbot de dudas de servicios escolares (PLN); detección temprana de incendios forestales con cámaras e imágenes satelitales (visión + análisis predictivo).' },
      q: [
        ['Un sistema que detecta plagas en fotos de hojas pertenece a…', ['PLN', 'Visión por computadora', 'Sistemas expertos', 'Planeación'], 1, 'Trabaja con imágenes.'],
        ['Toda la IA desplegada hoy en día es…', ['IA general', 'IA estrecha', 'Superinteligencia', 'IA simbólica pura'], 1, 'Los sistemas actuales son especializados aunque algunos sean muy versátiles.'],
        ['Un traductor automático es un ejemplo de…', ['Robótica', 'Procesamiento de lenguaje natural', 'Visión', 'Búsqueda'], 1, 'Procesa y genera lenguaje humano.']
      ],
      c: [['IA estrecha', 'IA especializada en una tarea concreta.'], ['AGI', 'Inteligencia artificial general: razonar y aprender en cualquier dominio como un humano.']] },

    { id: '1.5', t: 'Ética y desarrollo responsable de la IA',
      md: `La IA toma o apoya decisiones que afectan a personas, así que su diseño tiene consecuencias éticas.

### Problemas principales
- **Sesgo algorítmico**: si los datos de entrenamiento reflejan desigualdades, el modelo las repite. El estudio *Gender Shades* (2018) encontró que sistemas comerciales de reconocimiento facial fallaban mucho más con mujeres de piel oscura que con hombres de piel clara.
- **Privacidad**: los modelos se entrenan con datos personales; pueden filtrarlos o permitir vigilancia masiva.
- **Opacidad**: redes profundas son "cajas negras". La **explicabilidad** (XAI) busca que las decisiones se puedan justificar.
- **Responsabilidad**: si un auto autónomo choca, ¿quién responde? ¿el fabricante, el programador, el dueño?
- **Desinformación**: *deepfakes* y texto generado a escala.
- **Empleo**: automatización de tareas y necesidad de nuevas habilidades.
- **Toma de decisiones autónoma**: armas autónomas, decisiones de crédito o de contratación sin supervisión humana.

### Principios de IA responsable
Justicia (no discriminación), transparencia, privacidad, seguridad, rendición de cuentas y **supervisión humana**. La UNESCO aprobó en 2021 su *Recomendación sobre la Ética de la IA*, y la Unión Europea publicó en 2024 la **Ley de IA** (AI Act), que clasifica los sistemas por nivel de riesgo.

### Qué puedes hacer como desarrollador
1. Revisa de dónde vienen tus datos y a quién representan.
2. Mide el desempeño por subgrupos, no solo el promedio.
3. Documenta límites y usos no previstos del modelo.
4. Deja a un humano en el ciclo cuando la decisión es delicada.`,
      clave: ['Sesgo algorítmico', 'Privacidad y explicabilidad', 'Responsabilidad y supervisión humana', 'UNESCO 2021 y AI Act UE 2024'],
      pr: { p: 'Caso: una universidad usa IA para decidir becas con base en historial académico y código postal. Identifica 2 riesgos éticos y propón una medida para cada uno.', r: 'Riesgo 1: el código postal funciona como sustituto de nivel socioeconómico o etnia → sesgo; medida: quitar variables sustitutas y medir resultados por grupo. Riesgo 2: decisión opaca → los estudiantes no pueden apelar; medida: explicar criterios y revisión humana obligatoria.' },
      q: [
        ['Un modelo entrenado con datos históricos discriminatorios tiende a…', ['Corregir la discriminación', 'Repetir la discriminación', 'Ser más preciso con todos', 'Volverse explicable'], 1, 'Aprende los patrones de los datos, incluidos los injustos.'],
        ['¿Qué busca la explicabilidad (XAI)?', ['Hacer modelos más grandes', 'Que las decisiones del modelo puedan entenderse y justificarse', 'Cifrar los datos', 'Acelerar el entrenamiento'], 1, 'Es clave para auditar y para que las personas afectadas puedan apelar.'],
        ['La Ley de IA de la Unión Europea clasifica los sistemas por…', ['Precio', 'Nivel de riesgo', 'Lenguaje de programación', 'Tamaño del modelo únicamente'], 1, 'Prohíbe usos de riesgo inaceptable y regula fuertemente los de alto riesgo.']
      ],
      c: [['Sesgo algorítmico', 'Error sistemático que perjudica a un grupo, normalmente heredado de los datos.'], ['Humano en el ciclo', 'Una persona revisa o aprueba las decisiones delicadas del sistema.']] }
  ]},

  { n: 2, titulo: 'Representación del conocimiento', temas: [
    { id: '2.1', t: 'Lógica proposicional y lógica de primer orden',
      md: `### Lógica proposicional
Trabaja con **proposiciones**: enunciados que son verdaderos (V) o falsos (F). Se combinan con conectores:

| Conector | Símbolo | Se lee | Es V cuando… |
|---|---|---|---|
| Negación | ¬p | no p | p es F |
| Conjunción | p ∧ q | p y q | ambas son V |
| Disyunción | p ∨ q | p o q | al menos una es V |
| Implicación | p → q | si p entonces q | solo es F si p=V y q=F |
| Bicondicional | p ↔ q | p si y solo si q | ambas tienen el mismo valor |

**Modus ponens** (la regla de inferencia más usada): si sabemos p → q y sabemos p, concluimos q.

Ejemplo: p = "llueve", q = "el piso está mojado". Si p → q y "llueve" es V, entonces "el piso está mojado".

### Lógica de primer orden (LPO)
La proposicional no puede hablar de **objetos** ni generalizar. La LPO agrega:
- **Constantes**: Ana, Ixtlán
- **Predicados**: Estudiante(x), VivoEn(x, y)
- **Cuantificadores**: ∀ (para todo) y ∃ (existe)

Ejemplos:
- "Todos los estudiantes de la UNSIJ estudian redes": ∀x (EstudianteUNSIJ(x) → EstudiaRedes(x))
- "Algún agente es un robot": ∃x (Agente(x) ∧ Robot(x))

> Regla práctica: con ∀ casi siempre se usa **→**; con ∃ casi siempre se usa **∧**.`,
      clave: ['Proposiciones y conectores', 'Tabla de verdad de la implicación', 'Modus ponens', 'Predicados y cuantificadores ∀ ∃'],
      pr: { p: 'Formaliza en LPO: (a) "Todo perro es un mamífero". (b) "Hay un estudiante que reprobó redes". (c) Construye la tabla de verdad de p → q.', r: '(a) ∀x (Perro(x) → Mamífero(x)). (b) ∃x (Estudiante(x) ∧ Reprobó(x, Redes)). (c) VV→V, VF→F, FV→V, FF→V. Solo es falsa cuando el antecedente es verdadero y el consecuente falso.' },
      q: [
        ['¿Cuándo es falsa la implicación p → q?', ['Cuando p es F', 'Cuando q es V', 'Cuando p es V y q es F', 'Nunca'], 2, 'Es el único caso: se prometió q a partir de p y no se cumplió.'],
        ['¿Qué agrega la lógica de primer orden sobre la proposicional?', ['Conectores nuevos', 'Predicados, objetos y cuantificadores', 'Valores difusos', 'Probabilidades'], 1, 'Permite hablar de objetos y generalizar con ∀ y ∃.'],
        ['"Algunos alumnos programan en Python" se formaliza mejor como…', ['∀x (Alumno(x) → Python(x))', '∃x (Alumno(x) ∧ Python(x))', '∃x (Alumno(x) → Python(x))', '∀x (Alumno(x) ∧ Python(x))'], 1, 'Con ∃ se usa ∧.']
      ],
      c: [['Modus ponens', 'De p → q y p, se concluye q.'], ['∀ / ∃', 'Cuantificador universal ("para todo") / existencial ("existe al menos uno").'], ['Predicado', 'Propiedad o relación sobre objetos: Estudiante(x), Padre(x, y).']] },

    { id: '2.2', t: 'Representación del conocimiento',
      md: `Para que un sistema razone, el conocimiento debe estar en una forma que la máquina pueda manipular. Un **sistema basado en conocimiento** tiene dos piezas:
- **Base de conocimiento**: hechos y reglas del dominio.
- **Motor de inferencia**: aplica las reglas para obtener conclusiones nuevas.

### Formas de representar
- **Reglas de producción**: SI fiebre Y tos ENTONCES posible_gripe. Fáciles de leer; base de los sistemas expertos.
- **Redes semánticas**: grafo de nodos (conceptos) y arcos (relaciones): Canario —es_un→ Ave —tiene→ Alas. Permiten **herencia**: el canario hereda que tiene alas.
- **Marcos (frames)**: estructuras con **ranuras** (slots) y valores por defecto, parecido a una clase con atributos. Marco Aula: capacidad = 30, tiene_proyector = sí.
- **Lógica**: proposicional y de primer orden, como viste en 2.1.
- **Ontologías**: definen formalmente los conceptos de un dominio y sus relaciones (por ejemplo, en OWL). Permiten que sistemas distintos compartan significado.
- **Grafos de conocimiento**: millones de hechos tripleta (sujeto, relación, objeto): (Oaxaca, capital, Oaxaca de Juárez). Google y Wikidata los usan.

### Encadenamiento
- **Hacia adelante** (dirigido por datos): parte de los hechos y aplica reglas hasta llegar a conclusiones.
- **Hacia atrás** (dirigido por metas): parte de la hipótesis y busca qué hechos la demostrarían. Es lo que hace Prolog.`,
      clave: ['Base de conocimiento + motor de inferencia', 'Reglas, redes semánticas, marcos', 'Ontologías y grafos de conocimiento', 'Encadenamiento hacia adelante y hacia atrás'],
      pr: { p: 'Dibuja una red semántica con al menos 6 nodos sobre tu carrera (materias, profesores, herramientas). Luego escribe 3 reglas SI-ENTONCES que se deduzcan de ella.', r: 'Ejemplo: Redes I —usa→ Packet Tracer; Redes I —imparte→ Dr. Méndez; Packet Tracer —es_un→ Simulador. Regla: SI materia usa Simulador ENTONCES requiere laboratorio de cómputo.' },
      q: [
        ['¿Qué componente aplica las reglas para obtener conclusiones?', ['La base de conocimiento', 'El motor de inferencia', 'La interfaz', 'El dataset'], 1, 'El motor de inferencia razona sobre la base de conocimiento.'],
        ['En una red semántica, que "canario tiene alas" se deduzca de "ave tiene alas" se llama…', ['Herencia', 'Regresión', 'Clustering', 'Recompensa'], 0, 'Las propiedades de la clase general se heredan a la específica.'],
        ['El encadenamiento hacia atrás parte de…', ['Los hechos', 'Una meta o hipótesis', 'Datos aleatorios', 'Una recompensa'], 1, 'Busca qué hechos demostrarían la meta (como Prolog).']
      ],
      c: [['Marco (frame)', 'Estructura con ranuras y valores por defecto que describe un concepto.'], ['Ontología', 'Definición formal de conceptos de un dominio y sus relaciones.'], ['Encadenamiento hacia adelante', 'De los hechos a las conclusiones aplicando reglas.']] },

    { id: '2.3', t: 'Aprendizaje supervisado',
      md: `En el aprendizaje supervisado el modelo aprende de **ejemplos etiquetados**: pares (entrada, respuesta correcta). Es como estudiar con un solucionario.

### Dos tipos de problema
- **Clasificación**: la etiqueta es una categoría (spam / no spam, perro / gato).
- **Regresión**: la etiqueta es un número (precio, temperatura).

### Flujo de trabajo
1. Reunir datos y etiquetarlos.
2. Dividir en **entrenamiento** (≈70-80%) y **prueba** (≈20-30%).
3. Entrenar el modelo con el conjunto de entrenamiento.
4. Evaluar con datos que **nunca vio** (prueba).
5. Ajustar y repetir.

### Sobreajuste y subajuste
- **Sobreajuste (overfitting)**: memoriza el entrenamiento y falla con datos nuevos. Como aprenderse las respuestas del examen pasado sin entender.
- **Subajuste (underfitting)**: el modelo es demasiado simple y falla incluso en entrenamiento.

### Algoritmos comunes
Regresión lineal y logística, k vecinos más cercanos (k-NN), árboles de decisión, bosques aleatorios, máquinas de soporte vectorial (SVM), redes neuronales.

~~~python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

X, y = load_iris(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0)
modelo = DecisionTreeClassifier().fit(X_tr, y_tr)
print("Exactitud:", modelo.score(X_te, y_te))
~~~`,
      clave: ['Datos etiquetados (entrada → respuesta)', 'Clasificación vs regresión', 'Entrenamiento / prueba', 'Sobreajuste y subajuste'],
      pr: { p: 'Corre el código de ejemplo en Google Colab. Cambia test_size a 0.5 y el modelo a KNeighborsClassifier. ¿Cambia la exactitud? ¿Por qué?', r: 'La exactitud puede variar porque cambia la cantidad de datos para entrenar y la forma en que el modelo separa las clases. Con iris ambos modelos suelen quedar arriba de 90%.' },
      q: [
        ['¿Qué distingue al aprendizaje supervisado?', ['No usa datos', 'Usa ejemplos con la respuesta correcta', 'Aprende solo con recompensas', 'Agrupa sin etiquetas'], 1, 'Cada ejemplo viene con su etiqueta.'],
        ['Un modelo con 99% en entrenamiento y 60% en prueba probablemente tiene…', ['Subajuste', 'Sobreajuste', 'Datos perfectos', 'Aprendizaje por refuerzo'], 1, 'Memorizó el entrenamiento y no generaliza.'],
        ['Predecir el precio de una casa es un problema de…', ['Clasificación', 'Regresión', 'Clustering', 'Refuerzo'], 1, 'La salida es un número continuo.']
      ],
      c: [['Sobreajuste', 'El modelo memoriza el entrenamiento y falla con datos nuevos.'], ['Conjunto de prueba', 'Datos que el modelo no vio al entrenar; sirven para medir si generaliza.']] },

    { id: '2.4', t: 'Aprendizaje semi-supervisado',
      md: `Etiquetar datos es caro: hace falta tiempo humano y a veces expertos (un radiólogo para imágenes médicas). El aprendizaje **semi-supervisado** usa **pocos datos etiquetados y muchos sin etiquetar**.

### Idea central
Los datos sin etiqueta también tienen información: muestran cómo se distribuyen los ejemplos. Si dos puntos están muy cerca, probablemente tienen la misma etiqueta.

### Técnicas
- **Auto-entrenamiento (self-training) / pseudo-etiquetado**:
  1. Entrena con los pocos datos etiquetados.
  2. Predice los no etiquetados.
  3. Agrega como "pseudo-etiquetas" las predicciones con alta confianza.
  4. Reentrena y repite.
- **Propagación de etiquetas**: construye un grafo de similitud y "contagia" etiquetas a los vecinos.
- **Co-entrenamiento**: dos modelos con vistas distintas de los datos se enseñan mutuamente.

### Ejemplo
Tienes 50 000 fotos de cámaras trampa del bosque y solo 500 están etiquetadas con la especie. Entrenas con 500, pseudo-etiquetas las fotos donde el modelo está más de 95% seguro y reentrenas.

> Riesgo: si las pseudo-etiquetas iniciales están mal, el modelo refuerza sus propios errores.`,
      clave: ['Pocos etiquetados + muchos sin etiqueta', 'Pseudo-etiquetado', 'Propagación de etiquetas', 'Riesgo de reforzar errores'],
      pr: { p: 'Prueba sklearn.semi_supervised.SelfTrainingClassifier con iris: marca 80% de las etiquetas como -1 (sin etiqueta) y compara contra entrenar solo con el 20% etiquetado.', r: 'Normalmente el modelo semi-supervisado iguala o mejora al que solo usa el 20%, porque aprovecha la estructura de los datos sin etiqueta.' },
      q: [
        ['¿Cuándo conviene el aprendizaje semi-supervisado?', ['Cuando todo está etiquetado', 'Cuando etiquetar es caro y hay muchos datos sin etiqueta', 'Cuando no hay datos', 'Solo en juegos'], 1, 'Aprovecha datos sin etiqueta abundantes.'],
        ['¿Qué es una pseudo-etiqueta?', ['Una etiqueta escrita por un experto', 'Una predicción del modelo usada como si fuera etiqueta', 'Un dato faltante', 'Una recompensa'], 1, 'Se agregan las predicciones de alta confianza.'],
        ['Riesgo principal del auto-entrenamiento:', ['Que tarde poco', 'Reforzar sus propios errores', 'Que use pocas etiquetas', 'Que no use GPU'], 1, 'Errores iniciales se amplifican.']
      ],
      c: [['Semi-supervisado', 'Aprende con pocos ejemplos etiquetados y muchos sin etiquetar.'], ['Pseudo-etiquetado', 'Usar predicciones confiables del modelo como nuevas etiquetas.']] },

    { id: '2.5', t: 'Aprendizaje no supervisado',
      md: `Aquí **no hay etiquetas**. El objetivo es descubrir estructura oculta en los datos.

### Tareas principales
- **Agrupamiento (clustering)**: formar grupos de elementos parecidos. Ej.: segmentar clientes por comportamiento de compra.
- **Reducción de dimensionalidad**: resumir muchas variables en pocas sin perder mucha información. Ej.: **PCA** para visualizar datos de 50 columnas en 2D.
- **Detección de anomalías**: encontrar lo que no se parece a nada. Ej.: tráfico de red inusual que puede ser un ataque.
- **Reglas de asociación**: "quien compra pan y café también compra azúcar" (algoritmo Apriori).

### K-means paso a paso
1. Elige **k** (número de grupos).
2. Coloca k centroides al azar.
3. Asigna cada punto al centroide más cercano.
4. Mueve cada centroide al promedio de sus puntos.
5. Repite 3 y 4 hasta que los centroides ya no se muevan.

~~~python
from sklearn.cluster import KMeans
import numpy as np
X = np.array([[1,2],[1,4],[1,0],[10,2],[10,4],[10,0]])
km = KMeans(n_clusters=2, n_init=10).fit(X)
print(km.labels_)          # p. ej. [1 1 1 0 0 0]
print(km.cluster_centers_)
~~~

> Elegir k: el **método del codo** grafica el error contra k y busca el punto donde deja de bajar mucho.`,
      clave: ['Sin etiquetas: descubrir estructura', 'Clustering (k-means)', 'Reducción de dimensionalidad (PCA)', 'Anomalías y reglas de asociación'],
      pr: { p: 'Aplica k-means a mano con k=2 a los puntos 1, 2, 3, 10, 11, 12 (una dimensión) empezando con centroides 1 y 2.', r: 'Asignación 1: {1} y {2,3,10,11,12} → centroides 1 y 7.6. Asignación 2: {1,2,3} y {10,11,12} → centroides 2 y 11. Asignación 3: igual → convergió.' },
      q: [
        ['¿Qué tarea agrupa elementos parecidos sin etiquetas?', ['Regresión', 'Clustering', 'Clasificación', 'Refuerzo'], 1, 'Es la tarea típica no supervisada.'],
        ['En k-means, ¿qué se hace después de asignar puntos?', ['Borrar los centroides', 'Mover cada centroide al promedio de sus puntos', 'Etiquetar a mano', 'Dar recompensas'], 1, 'Se recalculan los centroides y se repite.'],
        ['PCA sirve para…', ['Reducir dimensionalidad', 'Clasificar spam', 'Dar recompensas', 'Generar imágenes'], 0, 'Resume muchas variables en pocas componentes principales.']
      ],
      c: [['K-means', 'Agrupa en k grupos alternando asignar puntos y recalcular centroides.'], ['Método del codo', 'Técnica para elegir k donde el error deja de bajar significativamente.']] },

    { id: '2.6', t: 'Aprendizaje por refuerzo',
      md: `Un **agente** aprende por **prueba y error** interactuando con un **entorno**. No le dicen la respuesta correcta; recibe **recompensas** o castigos.

### Elementos
- **Estado (s)**: la situación actual.
- **Acción (a)**: lo que el agente puede hacer.
- **Recompensa (r)**: señal numérica de qué tan bien le fue.
- **Política (π)**: la estrategia, qué acción tomar en cada estado.
- **Función de valor**: cuánta recompensa futura espera desde un estado.

El objetivo es maximizar la **recompensa acumulada a largo plazo**, no solo la inmediata.

### Exploración vs explotación
- **Explotar**: hacer lo que ya sabes que funciona.
- **Explorar**: probar algo nuevo que podría ser mejor.
La estrategia **ε-greedy** explora al azar con probabilidad ε y explota el resto del tiempo.

### Q-learning
Guarda una tabla Q(s, a) con el valor de cada acción en cada estado y la actualiza así:

Q(s,a) ← Q(s,a) + α [ r + γ · max Q(s',a') − Q(s,a) ]

- α = tasa de aprendizaje, γ = factor de descuento (cuánto importa el futuro).

### Ejemplos
AlphaGo y AlphaZero, robots que aprenden a caminar, control de semáforos, y el ajuste fino de modelos de lenguaje con retroalimentación humana (RLHF).`,
      clave: ['Agente, entorno, estado, acción, recompensa', 'Política', 'Exploración vs explotación (ε-greedy)', 'Q-learning y factor de descuento γ'],
      pr: { p: 'Un robot está en un pasillo de 5 casillas; la meta (recompensa +10) está en la casilla 5 y cada paso cuesta -1. ¿Qué política óptima debe aprender si empieza en la casilla 1? ¿Qué pasaría con γ = 0?', r: 'Política óptima: moverse siempre a la derecha (4 pasos, recompensa total 10 - 4 = 6, contando el costo de cada paso). Con γ = 0 solo le importa la recompensa inmediata, y como cada paso da -1, no distingue bien qué dirección lleva a la meta: aprende mucho más lento o nada.' },
      q: [
        ['¿Cómo aprende un agente por refuerzo?', ['Con ejemplos etiquetados', 'Con recompensas al interactuar con el entorno', 'Agrupando datos', 'Copiando reglas'], 1, 'Prueba y error guiados por recompensas.'],
        ['¿Qué es la política?', ['El reglamento del laboratorio', 'La estrategia que dice qué acción tomar en cada estado', 'La recompensa', 'El entorno'], 1, 'π(s) → a.'],
        ['ε-greedy resuelve el dilema de…', ['Sobreajuste', 'Exploración vs explotación', 'Etiquetado', 'Dimensionalidad'], 1, 'Explora con probabilidad ε.']
      ],
      c: [['Recompensa', 'Señal numérica que indica qué tan buena fue una acción.'], ['Factor de descuento γ', 'Peso que se da a recompensas futuras (0 = solo importa lo inmediato).'], ['Q-learning', 'Algoritmo que aprende el valor Q(s,a) de cada acción en cada estado.']] },

    { id: '2.7', t: 'Aprendizaje auto-supervisado',
      md: `El aprendizaje **auto-supervisado** crea sus propias etiquetas a partir de los datos. Se oculta una parte del dato y el modelo aprende a predecirla. No hace falta que nadie etiquete nada.

### Ejemplos de "tareas pretexto"
- **Predecir la siguiente palabra**: "La capital de Oaxaca es ___". Así se preentrenan los modelos tipo GPT.
- **Rellenar palabras enmascaradas**: "El [MASK] ladra" → perro. Así se entrenó BERT.
- **Imágenes**: tapar partes de una foto y reconstruirlas, o predecir si dos recortes vienen de la misma imagen (aprendizaje **contrastivo**).
- **Audio**: predecir el fragmento siguiente.

### ¿Por qué es tan importante?
En internet hay muchísimo texto e imágenes **sin etiquetar**. El auto-supervisado permite aprovecharlos para que el modelo aprenda representaciones generales del lenguaje o de las imágenes. Después se hace un **ajuste fino** (fine-tuning) con pocos datos etiquetados para una tarea concreta.

### Diferencias
| | Supervisado | No supervisado | Auto-supervisado |
|---|---|---|---|
| ¿Etiquetas humanas? | Sí | No | No |
| ¿De dónde sale la "respuesta"? | Del humano | No hay | Del propio dato |
| Objetivo típico | Predecir etiqueta | Encontrar estructura | Aprender representaciones |`,
      clave: ['Las etiquetas salen del propio dato', 'Tarea pretexto: siguiente palabra, enmascarado', 'Base de los modelos de lenguaje', 'Preentrenamiento + ajuste fino'],
      pr: { p: 'Toma un párrafo de tu temario. Diseña 3 ejemplos de entrenamiento auto-supervisado de tipo "palabra enmascarada" y 3 de tipo "siguiente palabra".', r: 'Ejemplo: "Proporcionar a los estudiantes una [MASK] sólida" → comprensión. "Proporcionar a los estudiantes una comprensión" → siguiente: sólida.' },
      q: [
        ['En el aprendizaje auto-supervisado, las etiquetas…', ['Las pone un experto', 'Se obtienen del mismo dato ocultando una parte', 'No existen ni se usan', 'Son recompensas'], 1, 'El dato se supervisa a sí mismo.'],
        ['Predecir la siguiente palabra de un texto es la tarea con la que se preentrenan…', ['Los árboles de decisión', 'Los modelos de lenguaje tipo GPT', 'Los sistemas expertos', 'K-means'], 1, 'Es el objetivo de preentrenamiento de los LLM.'],
        ['Después del preentrenamiento auto-supervisado se suele hacer…', ['Ajuste fino con datos etiquetados', 'Clustering', 'Borrado del modelo', 'Nada'], 0, 'Fine-tuning para la tarea final.']
      ],
      c: [['Tarea pretexto', 'Tarea inventada (como rellenar huecos) para que el modelo aprenda sin etiquetas humanas.'], ['Ajuste fino', 'Entrenar un poco más un modelo preentrenado con datos de una tarea concreta.']] },

    { id: '2.8', t: 'Aprendizaje en línea (on-line)',
      md: `En el aprendizaje **por lotes** (batch) se entrena una vez con todo el conjunto de datos. En el aprendizaje **en línea** el modelo se **actualiza continuamente**, ejemplo por ejemplo o en pequeños grupos, conforme llegan los datos.

### ¿Cuándo se usa?
- Los datos llegan como **flujo** (streaming): clics, sensores, transacciones.
- Los datos no caben en memoria.
- El mundo cambia y el modelo debe adaptarse.

### Deriva de concepto (concept drift)
La relación entre entradas y salidas cambia con el tiempo. Ejemplos: los spammers cambian sus trucos; los hábitos de compra cambian en diciembre. Un modelo por lotes se vuelve obsoleto; uno en línea se adapta.

### Riesgos
- **Olvido catastrófico**: al aprender lo nuevo olvida lo viejo.
- **Datos maliciosos**: alguien puede "envenenar" el modelo mandando ejemplos falsos.
- Hay que vigilar la tasa de aprendizaje: si es alta, reacciona a ruido; si es baja, se adapta lento.

~~~python
from sklearn.linear_model import SGDClassifier
modelo = SGDClassifier()
for X_lote, y_lote in flujo_de_datos():   # llegan poco a poco
    modelo.partial_fit(X_lote, y_lote, classes=[0, 1])
~~~`,
      clave: ['Actualización continua con flujo de datos', 'Batch vs en línea', 'Deriva de concepto', 'Olvido catastrófico y envenenamiento'],
      pr: { p: 'Da dos ejemplos de sistemas que deberían aprender en línea y uno donde sería peligroso hacerlo. Justifica.', r: 'En línea: filtro de spam, recomendador de noticias. Peligroso: un sistema médico de diagnóstico que cambie solo sin validación, porque un error se propagaría a pacientes.' },
      q: [
        ['El aprendizaje en línea se caracteriza por…', ['Entrenar una sola vez', 'Actualizar el modelo conforme llegan datos', 'No usar datos', 'Usar solo imágenes'], 1, 'Aprendizaje incremental.'],
        ['¿Qué es la deriva de concepto?', ['Un error de sintaxis', 'Cambio en el tiempo de la relación entre entradas y salidas', 'Un tipo de red', 'Un hardware'], 1, 'El patrón aprendido deja de ser válido.'],
        ['En scikit-learn, el método para aprendizaje incremental es…', ['fit_all', 'partial_fit', 'predict_proba', 'transform'], 1, 'partial_fit actualiza con un lote nuevo.']
      ],
      c: [['Concept drift', 'Los patrones del mundo cambian y el modelo entrenado pierde validez.'], ['Olvido catastrófico', 'Al aprender datos nuevos, el modelo pierde lo aprendido antes.']] }
  ]},

  { n: 3, titulo: 'Agentes', temas: [
    { id: '3.1', t: 'Definición de agente',
      md: `Según Russell y Norvig, un **agente** es cualquier cosa que **percibe** su entorno mediante **sensores** y **actúa** sobre él mediante **actuadores**.

| Agente | Sensores | Actuadores |
|---|---|---|
| Humano | Ojos, oídos, piel | Manos, piernas, voz |
| Robot aspiradora | Cámara, sensores de choque, de suciedad | Ruedas, cepillos |
| Agente de software | Teclado, archivos, paquetes de red | Pantalla, escribir archivos, enviar paquetes |
| Termostato | Termómetro | Encender/apagar calefacción |

### Conceptos
- **Percepción**: lo que el agente recibe en un instante.
- **Secuencia de percepciones**: historial completo de lo que ha percibido.
- **Función del agente**: describe matemáticamente qué acción elige ante cada secuencia de percepciones.
- **Programa del agente**: la implementación concreta de esa función que corre en una arquitectura.

### Agente racional
Elige la acción que **maximiza el valor esperado de su medida de rendimiento**, con lo que percibe y sabe. Racional no significa perfecto: no conoce el futuro.`,
      clave: ['Percibe con sensores y actúa con actuadores', 'Secuencia de percepciones', 'Función vs programa del agente', 'Agente racional'],
      pr: { p: 'Identifica sensores y actuadores de: un asistente de voz, un dron de monitoreo forestal y un bot de Telegram.', r: 'Asistente: micrófono / bocina, comandos a apps. Dron: cámara, GPS, altímetro / motores, cámara (tomar foto), radio. Bot: mensajes recibidos / mensajes enviados, llamadas a APIs.' },
      q: [
        ['Un agente percibe mediante ___ y actúa mediante ___', ['actuadores / sensores', 'sensores / actuadores', 'datos / etiquetas', 'reglas / hechos'], 1, 'Definición de Russell y Norvig.'],
        ['¿Qué es un agente racional?', ['Uno que nunca se equivoca', 'Uno que maximiza su medida de rendimiento esperada', 'Uno que usa lógica de primer orden', 'Uno que es humano'], 1, 'Racional ≠ omnisciente.'],
        ['La implementación concreta de la función del agente es…', ['El entorno', 'El programa del agente', 'El sensor', 'La recompensa'], 1, 'Programa + arquitectura = agente.']
      ],
      c: [['Agente', 'Entidad que percibe su entorno con sensores y actúa sobre él con actuadores.'], ['Función del agente', 'Mapeo de secuencias de percepciones a acciones.']] },

    { id: '3.2', t: 'Diferencia entre agente y programa',
      md: `Todo agente de software **es** un programa, pero no todo programa es un agente. Wooldridge y Jennings proponen cuatro propiedades que distinguen a un agente:

1. **Autonomía**: opera sin intervención humana directa y controla sus propias acciones.
2. **Reactividad**: percibe cambios en el entorno y responde a tiempo.
3. **Proactividad**: toma la iniciativa para cumplir metas, no solo reacciona.
4. **Habilidad social**: se comunica con otros agentes o personas.

| | Programa convencional | Agente |
|---|---|---|
| Ejecución | Cuando alguien lo invoca | Continua, en ciclo percibir-actuar |
| Entorno | Entrada y salida fijas | Entorno cambiante que observa |
| Metas | Ejecuta instrucciones | Persigue objetivos |
| Adaptación | Comportamiento fijo | Puede aprender y adaptarse |

### Ejemplos
- Una **calculadora** es un programa: recibe una operación y devuelve el resultado.
- Un **filtro de spam que aprende** se acerca a un agente: vigila el correo, decide y se adapta.
- Un **asistente que agenda reuniones** revisando tu calendario y negociando horarios con otros es claramente un agente.`,
      clave: ['Autonomía', 'Reactividad', 'Proactividad', 'Habilidad social'],
      pr: { p: 'Clasifica como programa o agente y justifica: Excel, un antivirus en tiempo real, un vehículo autónomo, un compilador.', r: 'Excel: programa. Antivirus en tiempo real: agente sencillo (autónomo y reactivo). Vehículo autónomo: agente (las cuatro propiedades). Compilador: programa.' },
      q: [
        ['¿Qué propiedad describe tomar la iniciativa para lograr metas?', ['Reactividad', 'Proactividad', 'Habilidad social', 'Persistencia'], 1, 'Proactividad = actuar orientado a metas.'],
        ['Una calculadora es…', ['Un agente', 'Un programa convencional', 'Un sistema multiagente', 'Un ambiente'], 1, 'Solo responde a la entrada que recibe.'],
        ['¿Cuál NO es una propiedad de agente según Wooldridge y Jennings?', ['Autonomía', 'Reactividad', 'Compilación', 'Habilidad social'], 2, 'Compilación no es una propiedad de agentes.']
      ],
      c: [['Autonomía', 'El agente controla sus acciones sin intervención humana directa.'], ['Reactividad', 'Responder a tiempo a cambios del entorno.']] },

    { id: '3.3', t: 'Estructura de un agente',
      md: `**Agente = arquitectura + programa**
- **Arquitectura**: el dispositivo con sensores y actuadores (computadora, robot, servidor).
- **Programa**: el código que transforma percepciones en acciones.

### Especificación REAS (PEAS)
Antes de diseñar un agente se define su entorno de tarea con **REAS**: Rendimiento, Entorno, Actuadores, Sensores (en inglés *PEAS*).

| | Taxi autónomo | Agente de tutoría |
|---|---|---|
| Rendimiento | Seguro, rápido, legal, cómodo, rentable | Calificaciones del alumno, tiempo de estudio |
| Entorno | Calles, tráfico, peatones, clima | Alumno, banco de ejercicios |
| Actuadores | Volante, acelerador, freno, claxon | Mostrar ejercicios, pistas, explicaciones |
| Sensores | Cámaras, LIDAR, GPS, velocímetro | Respuestas tecleadas, tiempo de respuesta |

### Ciclo básico
~~~text
mientras el agente esté activo:
    percepción ← sensores.leer()
    estado ← actualizar(estado, percepción)
    acción ← programa(estado)
    actuadores.ejecutar(acción)
~~~

Este diagrama de arquitectura (entradas → procesamiento → decisión → acciones) es justamente la evidencia del proyecto integrador del parcial 2.`,
      clave: ['Agente = arquitectura + programa', 'REAS / PEAS', 'Ciclo percibir → decidir → actuar'],
      pr: { p: 'Escribe la tabla REAS de un agente que riega un huerto automáticamente.', r: 'R: plantas sanas con mínimo uso de agua. E: huerto, clima, suelo. A: válvulas, bomba, notificaciones. S: sensor de humedad del suelo, temperatura, pronóstico del clima.' },
      q: [
        ['¿Qué significa la "R" de REAS?', ['Robot', 'Rendimiento', 'Recompensa', 'Red'], 1, 'Medida de rendimiento: cómo se evalúa el éxito.'],
        ['Agente = …', ['Datos + etiquetas', 'Arquitectura + programa', 'Sensores + recompensas', 'Entorno + política'], 1, 'Hardware/plataforma más el código.'],
        ['En un taxi autónomo, el LIDAR es…', ['Un actuador', 'Un sensor', 'El entorno', 'La medida de rendimiento'], 1, 'Mide distancias con láser.']
      ],
      c: [['REAS (PEAS)', 'Rendimiento, Entorno, Actuadores, Sensores: especificación del entorno de tarea.'], ['Arquitectura del agente', 'Dispositivo físico o plataforma con sensores y actuadores donde corre el programa.']] },

    { id: '3.4', t: 'Comportamiento de un agente',
      md: `El comportamiento es la **acción que el agente toma ante cada secuencia de percepciones**. Lo que buscamos es comportamiento **racional**.

### Lo que define la racionalidad en un momento
1. La **medida de rendimiento** que define el éxito.
2. El **conocimiento previo** del entorno.
3. Las **acciones** disponibles.
4. La **secuencia de percepciones** hasta ahora.

### Racional ≠ omnisciente
Un agente omnisciente conoce el resultado real de sus acciones; eso es imposible. Un agente racional maximiza el resultado **esperado**. Si cruzas la calle tras mirar a ambos lados y te cae algo del cielo, tu decisión fue racional.

### Otros rasgos deseables
- **Recopilar información**: hacer acciones para percibir mejor (mirar antes de cruzar).
- **Aprendizaje**: mejorar con la experiencia.
- **Autonomía**: depender más de lo que percibe y aprende que del conocimiento que le dio el diseñador.

### Cuidado con la medida de rendimiento
Si mides a una aspiradora por "cantidad de polvo recogido", podría tirar el polvo y volverlo a recoger. Mide lo que quieres en el **entorno** (piso limpio), no la acción del agente.`,
      clave: ['Racionalidad depende de 4 factores', 'Racional ≠ omnisciente', 'Recopilar información y aprender', 'Diseñar bien la medida de rendimiento'],
      pr: { p: 'Propón una mala y una buena medida de rendimiento para un chatbot de servicios escolares.', r: 'Mala: número de mensajes enviados (incentiva respuestas largas e inútiles). Buena: porcentaje de dudas resueltas sin escalar a un humano y satisfacción del alumno.' },
      q: [
        ['Un agente racional maximiza…', ['El resultado real', 'El rendimiento esperado', 'El número de acciones', 'La velocidad'], 1, 'No conoce el futuro, decide con lo esperado.'],
        ['¿Por qué medir a una aspiradora por "polvo recogido" es mala idea?', ['Es difícil de medir', 'Puede tirar polvo para volver a recogerlo', 'No tiene sensores', 'Es ilegal'], 1, 'Se debe medir el estado deseado del entorno.'],
        ['Un agente más autónomo depende más de…', ['El diseñador', 'Lo que percibe y aprende', 'Internet', 'El usuario'], 1, 'Autonomía = aprender de su experiencia.']
      ],
      c: [['Omnisciencia', 'Conocer el resultado real de las acciones; imposible en la práctica.'], ['Medida de rendimiento', 'Criterio que evalúa qué tan bien se comporta el agente en su entorno.']] },

    { id: '3.5', t: 'Clasificación de agentes',
      md: `De más simple a más capaz:

### 1. Reflejo simple
Actúa solo con la percepción **actual** usando reglas condición-acción. *SI sucio ENTONCES aspirar.* Funciona solo si el entorno es totalmente observable.

### 2. Reflejo basado en modelos
Mantiene un **estado interno** (modelo del mundo) para recordar lo que no ve ahora. Ej.: un auto que recuerda que hay un coche en el punto ciego.

### 3. Basado en objetivos (metas)
Además del modelo, tiene **metas** y elige acciones que lo acercan a ellas usando **búsqueda y planeación**. Ej.: GPS que busca la ruta a tu destino.

### 4. Basado en utilidad
Las metas solo dicen "logrado / no logrado". La **función de utilidad** mide *qué tan bueno* es un estado, para elegir entre varias formas de cumplir la meta: ruta más rápida, más barata o más segura.

### 5. Agente que aprende
Tiene un **elemento de aprendizaje** que mejora al **elemento de actuación**, un **crítico** que evalúa contra un estándar y un **generador de problemas** que propone experimentos (exploración).

### Sistemas multiagente
Varios agentes que **cooperan** (robots de almacén) o **compiten** (subastas, juegos).`,
      clave: ['Reflejo simple', 'Reflejo con modelo (estado interno)', 'Basado en objetivos', 'Basado en utilidad', 'Agente que aprende'],
      pr: { p: 'Clasifica: termostato, Roomba que mapea la casa, GPS, auto autónomo que equilibra rapidez y comodidad, recomendador de Netflix.', r: 'Termostato: reflejo simple. Roomba con mapa: reflejo basado en modelo. GPS: basado en objetivos. Auto autónomo: basado en utilidad. Netflix: agente que aprende.' },
      q: [
        ['Un agente que solo usa la percepción actual con reglas SI-ENTONCES es…', ['Basado en utilidad', 'Reflejo simple', 'Que aprende', 'Basado en objetivos'], 1, 'No tiene memoria ni metas.'],
        ['¿Qué agrega un agente basado en utilidad sobre uno basado en objetivos?', ['Sensores', 'Una medida de qué tan bueno es cada estado', 'Memoria', 'Reglas'], 1, 'Permite elegir la mejor manera de lograr la meta.'],
        ['En un agente que aprende, ¿quién propone acciones exploratorias?', ['El crítico', 'El generador de problemas', 'El sensor', 'El actuador'], 1, 'Sugiere experimentos para aprender.']
      ],
      c: [['Agente reflejo basado en modelo', 'Mantiene un estado interno para recordar partes del mundo que no percibe ahora.'], ['Función de utilidad', 'Asigna un número a cada estado según qué tan deseable es.']] },

    { id: '3.6', t: 'Ambientes',
      md: `Las propiedades del ambiente determinan qué tipo de agente necesitas.

| Propiedad | Un extremo | Otro extremo |
|---|---|---|
| Observabilidad | **Totalmente observable**: los sensores ven todo lo relevante (ajedrez) | **Parcialmente observable**: hay información oculta (póker, conducir) |
| Determinismo | **Determinista**: el siguiente estado depende solo del actual y la acción (crucigrama) | **Estocástico**: hay azar (dados, tráfico) |
| Episodios | **Episódico**: cada decisión es independiente (clasificar piezas defectuosas) | **Secuencial**: las decisiones afectan el futuro (ajedrez) |
| Cambio | **Estático**: no cambia mientras el agente piensa | **Dinámico**: cambia solo (conducir) |
| Valores | **Discreto**: estados finitos (ajedrez) | **Continuo**: velocidades, posiciones (robot) |
| Agentes | **Un agente** (resolver un sudoku) | **Multiagente**: competitivo o cooperativo |
| Conocimiento | **Conocido**: se saben las reglas | **Desconocido**: hay que aprenderlas |

### El caso más difícil
**Parcialmente observable, estocástico, secuencial, dinámico, continuo, multiagente y desconocido**. Así es conducir un taxi en la ciudad.

### Ejemplos rápidos
- Ajedrez con reloj: totalmente observable, determinista, secuencial, semidinámico, discreto, multiagente.
- Diagnóstico médico: parcialmente observable, estocástico, secuencial, dinámico, continuo, un agente.`,
      clave: ['Observable total/parcial', 'Determinista/estocástico', 'Episódico/secuencial', 'Estático/dinámico', 'Discreto/continuo', 'Uno/multiagente'],
      pr: { p: 'Clasifica el ambiente de un robot que reparte paquetes dentro de la universidad según las 7 propiedades.', r: 'Parcialmente observable, estocástico, secuencial, dinámico, continuo, multiagente (personas y otros robots), parcialmente conocido.' },
      q: [
        ['El póker es un ambiente…', ['Totalmente observable', 'Parcialmente observable', 'Estático y de un agente', 'Episódico'], 1, 'No ves las cartas de los demás.'],
        ['Clasificar piezas defectuosas una por una en una banda es…', ['Episódico', 'Secuencial', 'Multiagente', 'Continuo'], 0, 'Cada decisión no afecta a la siguiente.'],
        ['¿Cuál es un ambiente dinámico?', ['Un crucigrama', 'Conducir en la ciudad', 'Un sudoku', 'Un examen escrito sin tiempo'], 1, 'El mundo cambia mientras decides.']
      ],
      c: [['Ambiente estocástico', 'El resultado de las acciones tiene incertidumbre o azar.'], ['Ambiente secuencial', 'Las decisiones actuales afectan las futuras.']] }
  ]},

  { n: 4, titulo: 'Tareas fundamentales de la IA', temas: [
    { id: '4.1', t: 'Clasificación',
      md: `**Clasificar** es asignar una **categoría** a una entrada. Es aprendizaje supervisado con etiquetas discretas.

- **Binaria**: dos clases (fraude / legítimo).
- **Multiclase**: varias clases excluyentes (dígitos 0-9).
- **Multietiqueta**: varias etiquetas a la vez (una película puede ser acción y comedia).

### Algoritmos
Regresión logística, k-NN, árboles de decisión, bosques aleatorios, SVM, Naive Bayes, redes neuronales (CNN para imágenes).

### Matriz de confusión (binaria)
| | Predijo positivo | Predijo negativo |
|---|---|---|
| **Es positivo** | VP (verdadero positivo) | FN (falso negativo) |
| **Es negativo** | FP (falso positivo) | VN (verdadero negativo) |

### Métricas
- **Exactitud** = (VP + VN) / total
- **Precisión** = VP / (VP + FP) → de lo que dije positivo, cuánto era cierto
- **Exhaustividad (recall)** = VP / (VP + FN) → de los positivos reales, cuántos encontré
- **F1** = 2 · P · R / (P + R)

> Con clases desbalanceadas la exactitud engaña: si 99% de las transacciones son legítimas, un modelo que siempre dice "legítimo" tiene 99% de exactitud y no detecta ningún fraude.`,
      clave: ['Binaria, multiclase, multietiqueta', 'Matriz de confusión', 'Precisión vs exhaustividad', 'F1 y clases desbalanceadas'],
      pr: { p: 'Un detector de COVID evaluó 100 personas: VP = 8, FN = 2, FP = 10, VN = 80. Calcula exactitud, precisión, recall y F1.', r: 'Exactitud = 88/100 = 0.88. Precisión = 8/18 ≈ 0.44. Recall = 8/10 = 0.80. F1 = 2·0.44·0.80/(1.24) ≈ 0.57.' },
      q: [
        ['Precisión = …', ['VP/(VP+FN)', 'VP/(VP+FP)', '(VP+VN)/total', 'FP/(FP+VN)'], 1, 'De lo que predije positivo, cuánto acerté.'],
        ['En detección de cáncer, ¿qué error suele ser más grave?', ['Falso positivo', 'Falso negativo', 'Verdadero negativo', 'Ninguno'], 1, 'No detectar a un enfermo es peor; se prioriza el recall.'],
        ['Clasificar una canción en varios géneros a la vez es…', ['Binaria', 'Multiclase', 'Multietiqueta', 'Regresión'], 2, 'Puede tener varias etiquetas simultáneas.']
      ],
      c: [['Recall (exhaustividad)', 'VP / (VP + FN): proporción de positivos reales que se encontraron.'], ['Falso positivo', 'El modelo dijo positivo y en realidad era negativo.'], ['F1', 'Media armónica de precisión y recall.']] },

    { id: '4.2', t: 'Regresión',
      md: `La **regresión** predice un **valor numérico continuo**: precio, temperatura, demanda, calificación.

### Regresión lineal
Ajusta una recta (o hiperplano) a los datos:

**ŷ = w·x + b**

- w = pendiente (cuánto cambia y por cada unidad de x)
- b = intersección

El entrenamiento busca w y b que **minimicen el error** entre lo predicho (ŷ) y lo real (y), normalmente con **mínimos cuadrados** o **descenso de gradiente**.

### Métricas
- **MAE** (error absoluto medio) = promedio de |y − ŷ|. Fácil de interpretar.
- **MSE** (error cuadrático medio) = promedio de (y − ŷ)². Castiga más los errores grandes.
- **RMSE** = √MSE, en las mismas unidades que y.
- **R²**: proporción de la variación explicada por el modelo (1 = perfecto, 0 = no mejor que el promedio).

### Otras regresiones
Polinomial (curvas), árboles y bosques de regresión, redes neuronales.

~~~python
from sklearn.linear_model import LinearRegression
import numpy as np
horas = np.array([[1],[2],[3],[4],[5]])
calif = np.array([5.5, 6.4, 7.1, 8.0, 9.2])
m = LinearRegression().fit(horas, calif)
print(m.coef_, m.intercept_)
print(m.predict([[6]]))   # calificación esperada con 6 h de estudio
~~~

> No confundas: **regresión logística** es un algoritmo de **clasificación**, aunque se llame regresión.`,
      clave: ['Predice valores continuos', 'ŷ = w·x + b', 'MAE, MSE, RMSE, R²', 'Regresión logística es clasificación'],
      pr: { p: 'Con datos reales (y) = 10, 20, 30 y predicciones (ŷ) = 12, 18, 33, calcula MAE y MSE.', r: 'Errores: -2, 2, -3. MAE = (2+2+3)/3 ≈ 2.33. MSE = (4+4+9)/3 ≈ 5.67.' },
      q: [
        ['¿Qué tipo de salida produce la regresión?', ['Una categoría', 'Un número continuo', 'Un grupo', 'Una recompensa'], 1, 'Valores numéricos.'],
        ['¿Qué métrica castiga más los errores grandes?', ['MAE', 'MSE', 'Exactitud', 'Recall'], 1, 'Al elevar al cuadrado, los errores grandes pesan más.'],
        ['La regresión logística se usa para…', ['Regresión', 'Clasificación', 'Clustering', 'Generar imágenes'], 1, 'Produce probabilidades de clase.']
      ],
      c: [['MSE', 'Error cuadrático medio: promedio de (y − ŷ)².'], ['R²', 'Proporción de la variación de los datos explicada por el modelo.']] },

    { id: '4.3', t: 'Procesamiento de lenguaje natural (PLN)',
      md: `El **PLN** permite a las máquinas entender y generar lenguaje humano, escrito o hablado.

### Tubería clásica de preprocesamiento
1. **Tokenización**: partir el texto en unidades ("Hola, mundo" → ["Hola", ",", "mundo"]).
2. **Normalización**: minúsculas, quitar acentos o signos según el caso.
3. **Palabras vacías (stopwords)**: quitar "el", "de", "y" cuando no aportan.
4. **Stemming** (recortar a la raíz: "corriendo" → "corr") o **lematización** (forma de diccionario: "corriendo" → "correr").

### Representar texto como números
- **Bolsa de palabras**: cuenta cuántas veces aparece cada palabra; pierde el orden.
- **TF-IDF**: pesa más las palabras frecuentes en un documento pero raras en el resto.
- **Embeddings** (word2vec, etc.): cada palabra es un vector; palabras parecidas quedan cerca. Famoso: rey − hombre + mujer ≈ reina.
- **Transformers**: representan cada palabra según su **contexto** usando atención ("banco" de dinero vs "banco" para sentarse).

### Tareas
Análisis de sentimiento, clasificación de textos, reconocimiento de entidades nombradas (NER), traducción automática, resumen, preguntas y respuestas, reconocimiento y síntesis de voz, chatbots.

### Modelos de lenguaje grandes (LLM)
Transformers preentrenados con enormes cantidades de texto (auto-supervisado) y luego ajustados para seguir instrucciones. Pueden "alucinar": generar texto convincente pero falso.`,
      clave: ['Tokenización, stopwords, lematización', 'Bolsa de palabras y TF-IDF', 'Embeddings y transformers', 'Tareas: sentimiento, NER, traducción'],
      pr: { p: 'Tokeniza y lematiza: "Los estudiantes estaban configurando los routers". Luego quita las stopwords.', r: 'Tokens: [Los, estudiantes, estaban, configurando, los, routers]. Lemas: [el, estudiante, estar, configurar, el, router]. Sin stopwords: [estudiante, configurar, router].' },
      q: [
        ['Partir un texto en palabras o subpalabras se llama…', ['Lematización', 'Tokenización', 'Embedding', 'Clustering'], 1, 'Es el primer paso de casi todo PLN.'],
        ['¿Qué representación captura el contexto de una palabra en la oración?', ['Bolsa de palabras', 'TF-IDF', 'Transformers', 'Stopwords'], 2, 'La atención considera las palabras vecinas.'],
        ['Detectar nombres de personas, lugares y organizaciones en un texto es…', ['Análisis de sentimiento', 'NER', 'Traducción', 'Stemming'], 1, 'Named Entity Recognition.']
      ],
      c: [['TF-IDF', 'Peso de una palabra: frecuente en el documento y rara en el corpus.'], ['Embedding', 'Vector numérico que representa el significado de una palabra o texto.'], ['Alucinación', 'Respuesta generada que suena plausible pero es falsa.']] },

    { id: '4.4', t: 'Generación de datos',
      md: `Los **modelos generativos** aprenden la distribución de los datos para **crear ejemplos nuevos** parecidos: imágenes, texto, audio, tablas.

### Familias principales
- **GAN (redes generativas adversarias)**, 2014: dos redes compiten. El **generador** crea falsificaciones y el **discriminador** intenta detectarlas. Ambos mejoran hasta que las falsificaciones son muy realistas.
- **VAE (autocodificador variacional)**: comprime los datos en un espacio latente y genera muestreando de ese espacio.
- **Modelos de difusión**: aprenden a quitar ruido paso a paso; parten de ruido puro y lo convierten en una imagen (Stable Diffusion, DALL·E).
- **Modelos autorregresivos**: generan un elemento a la vez prediciendo el siguiente (los LLM generan texto así).

### Usos de la generación de datos
- **Aumento de datos (data augmentation)**: rotar, recortar o cambiar el brillo de imágenes para tener más ejemplos de entrenamiento.
- **Datos sintéticos**: crear registros falsos pero realistas para probar sistemas sin exponer datos personales.
- Diseño, arte, música, síntesis de voz, descubrimiento de fármacos.

### Riesgos
*Deepfakes*, suplantación de identidad, desinformación, derechos de autor de los datos de entrenamiento. Por eso se investigan marcas de agua y detectores.`,
      clave: ['GAN: generador vs discriminador', 'VAE y difusión', 'Aumento de datos y datos sintéticos', 'Riesgos: deepfakes'],
      pr: { p: 'Tienes solo 200 fotos de hojas de café enfermas. Propón 5 transformaciones de aumento de datos que tengan sentido y una que NO lo tenga.', r: 'Sí: rotar, voltear horizontalmente, recortar, cambiar brillo, agregar ruido leve. No: cambiar el tono a morado, porque altera el síntoma (color de la mancha) que el modelo debe aprender.' },
      q: [
        ['En una GAN, ¿qué hace el discriminador?', ['Genera imágenes', 'Distingue datos reales de falsos', 'Etiqueta datos', 'Reduce dimensiones'], 1, 'Compite con el generador.'],
        ['Los modelos de difusión generan imágenes…', ['Quitando ruido paso a paso', 'Con reglas SI-ENTONCES', 'Con k-means', 'Copiando la imagen original'], 0, 'Parten de ruido y lo refinan.'],
        ['Rotar y voltear imágenes para tener más ejemplos se llama…', ['Sobreajuste', 'Aumento de datos', 'Tokenización', 'Clustering'], 1, 'Data augmentation.']
      ],
      c: [['GAN', 'Generador y discriminador que compiten para producir datos realistas.'], ['Datos sintéticos', 'Datos artificiales con propiedades estadísticas parecidas a las reales.']] }
  ]},

  { n: 5, titulo: 'Aplicaciones de la IA', temas: [
    { id: '5.1', t: 'E-commerce',
      md: `El comercio electrónico es uno de los sectores que más usa IA.

### Sistemas de recomendación
- **Filtrado colaborativo**: "usuarios parecidos a ti compraron esto". Usa la matriz usuario-producto.
- **Basado en contenido**: recomienda productos con características parecidas a los que te gustaron.
- **Híbridos**: combinan ambos (lo que hacen Amazon o Mercado Libre).
- Problema del **arranque en frío**: un usuario o producto nuevo no tiene historial.

### Otros usos
- **Precios dinámicos**: ajustar precios según demanda, competencia y hora.
- **Detección de fraude**: clasificación y detección de anomalías en pagos.
- **Búsqueda inteligente y visual**: buscar con una foto.
- **Chatbots** de atención al cliente.
- **Pronóstico de demanda** para inventario (regresión con series de tiempo).
- **Segmentación de clientes** con clustering para campañas.

### Consideraciones éticas
Manipulación del consumidor, discriminación de precios, privacidad del historial de compras.`,
      clave: ['Filtrado colaborativo vs basado en contenido', 'Arranque en frío', 'Precios dinámicos y fraude', 'Pronóstico de demanda'],
      pr: { p: 'Diseña cómo recomendarías productos en una tienda en línea de artesanías de la Sierra Juárez que apenas empieza (pocos usuarios).', r: 'Como hay pocos datos de usuarios, empieza con recomendación basada en contenido (material, comunidad, tipo de pieza) y productos populares; cuando haya historial, agrega filtrado colaborativo.' },
      q: [
        ['"Clientes que compraron esto también compraron…" es…', ['Basado en contenido', 'Filtrado colaborativo', 'Regresión lineal', 'PLN'], 1, 'Se basa en el comportamiento de usuarios parecidos.'],
        ['El arranque en frío ocurre cuando…', ['El servidor está apagado', 'No hay historial de un usuario o producto nuevo', 'Hay demasiados datos', 'El modelo sobreajusta'], 1, 'Sin datos no hay de dónde recomendar.'],
        ['Detectar pagos sospechosos usa sobre todo…', ['Generación de imágenes', 'Clasificación y detección de anomalías', 'Robótica', 'Lógica proposicional'], 1, 'Son pagos que se salen del patrón.']
      ],
      c: [['Filtrado colaborativo', 'Recomienda según lo que eligieron usuarios con gustos parecidos.'], ['Arranque en frío', 'Falta de datos para recomendar a usuarios o productos nuevos.']] },

    { id: '5.2', t: 'Medio ambiente',
      md: `La IA ayuda a observar, entender y proteger el medio ambiente. La Sierra Juárez es un buen ejemplo: Ixtlán de Juárez es conocida por su **manejo forestal comunitario**.

### Aplicaciones
- **Monitoreo de bosques**: redes convolucionales sobre imágenes satelitales (Sentinel, Landsat) para detectar deforestación, tala ilegal o plagas como el descortezador.
- **Incendios forestales**: detección temprana con cámaras y satélites; modelos de riesgo según humedad, viento y temperatura.
- **Biodiversidad**: identificar especies en fotos de **cámaras trampa** o por sus sonidos (bioacústica).
- **Clima**: modelos de pronóstico y de eventos extremos.
- **Agua y agricultura**: riego de precisión, predicción de sequías, detección de enfermedades en cultivos.
- **Energía**: predecir producción solar o eólica y optimizar redes eléctricas.
- **Calidad del aire**: predicción de contaminantes en ciudades.

### Ojo con la huella de la IA
Entrenar modelos grandes consume mucha **electricidad y agua** (enfriamiento de centros de datos). Elegir modelos pequeños y eficientes también es una decisión ambiental.`,
      clave: ['Imágenes satelitales y deforestación', 'Cámaras trampa y bioacústica', 'Incendios, clima, agricultura', 'Huella ambiental de la IA'],
      pr: { p: 'Escribe la idea de un proyecto final con IA para el bosque de la Sierra Juárez: problema, datos, tarea de IA (clasificación/regresión/etc.) y quién lo usaría.', r: 'Ej.: detectar árboles afectados por descortezador en fotos de dron. Datos: fotos aéreas etiquetadas. Tarea: clasificación/detección de objetos con CNN. Usuarios: técnicos forestales comunitarios.' },
      q: [
        ['Identificar especies en fotos de cámaras trampa es una tarea de…', ['Regresión', 'Visión por computadora / clasificación', 'Refuerzo', 'Lógica'], 1, 'Se clasifican imágenes.'],
        ['¿Qué datos se usan para detectar deforestación a gran escala?', ['Encuestas', 'Imágenes satelitales', 'Tweets', 'Precios'], 1, 'Satélites como Sentinel o Landsat.'],
        ['Un impacto ambiental de la propia IA es…', ['Reducir el CO₂ automáticamente', 'Alto consumo de energía y agua para entrenar', 'Que no usa electricidad', 'Que planta árboles'], 1, 'Los centros de datos consumen mucho.']
      ],
      c: [['Bioacústica', 'Estudio de sonidos de animales; la IA identifica especies por su canto.'], ['Cámara trampa', 'Cámara que se activa con movimiento para fotografiar fauna.']] },

    { id: '5.3', t: 'Educación',
      md: `### Aplicaciones
- **Sistemas tutores inteligentes**: modelan lo que sabe el estudiante y adaptan ejercicios y pistas.
- **Aprendizaje adaptativo**: el contenido cambia según tu desempeño (más práctica donde fallas).
- **Evaluación automática**: calificar ejercicios de programación, opción múltiple e incluso ensayos.
- **Predicción de deserción**: detectar estudiantes en riesgo para darles apoyo a tiempo.
- **Accesibilidad**: subtítulos automáticos, lectura en voz alta, traducción a lenguas indígenas (una tarea difícil porque hay pocos datos para el zapoteco o el mixe).
- **Asistentes conversacionales** para resolver dudas a cualquier hora.

### Repetición espaciada
Las tarjetas de repaso de esta aula usan una idea de la ciencia del aprendizaje: repasar justo antes de olvidar. Muchos sistemas adaptativos combinan esto con modelos que predicen cuándo vas a olvidar.

### Riesgos
- Dependencia: dejar que la IA piense por ti.
- Plagio y deshonestidad académica.
- Privacidad de los datos de los estudiantes.
- Sesgos que desfavorecen a ciertos grupos.

> Usa a la IA como tutor que te hace preguntas, no como alguien que hace la tarea por ti.`,
      clave: ['Tutores inteligentes', 'Aprendizaje adaptativo', 'Predicción de deserción', 'Riesgos: dependencia, plagio, privacidad'],
      pr: { p: 'Propón cómo un agente tutor podría ayudar en Redes I. Describe qué percibe, qué decide y qué hace (REAS).', r: 'R: mejora en exámenes de subnetting. E: alumno + banco de ejercicios. A: proponer ejercicios, dar pistas, mostrar explicación. S: respuestas, tiempo y errores frecuentes.' },
      q: [
        ['Un sistema que cambia la dificultad según tus errores es…', ['Aprendizaje adaptativo', 'Clustering', 'Una GAN', 'Un CAPTCHA'], 0, 'Se adapta al estudiante.'],
        ['¿Por qué traducir a lenguas como el zapoteco es difícil para la IA?', ['Porque son lenguas simples', 'Porque hay pocos datos digitales para entrenar', 'Porque no tienen gramática', 'Porque no se pueden escribir'], 1, 'Son lenguas con pocos recursos digitales.'],
        ['Un uso responsable de la IA para estudiar es…', ['Que haga tus tareas', 'Pedirle que te haga preguntas y te explique', 'Copiar sus respuestas', 'No revisar lo que dice'], 1, 'Como tutor, no como sustituto.']
      ],
      c: [['Sistema tutor inteligente', 'Programa que modela al estudiante y adapta la enseñanza.'], ['Repetición espaciada', 'Repasar a intervalos crecientes justo antes de olvidar.']] },

    { id: '5.4', t: 'Robótica',
      md: `Un robot es un **agente físico**: percibe con sensores reales y actúa con motores. La IA le da percepción, decisión y aprendizaje.

### Ciclo de un robot inteligente
1. **Percepción**: cámaras, LIDAR, ultrasonido, IMU (acelerómetro y giroscopio), encoders.
2. **Localización y mapeo**: **SLAM** (Simultaneous Localization and Mapping) construye un mapa mientras se ubica en él.
3. **Planeación**: calcula rutas (algoritmos como A*) y movimientos.
4. **Control**: ejecuta el movimiento con precisión (por ejemplo, controladores PID).

### Tipos
- **Industriales**: brazos que sueldan o ensamblan.
- **Móviles**: robots de almacén, aspiradoras, vehículos autónomos.
- **De servicio**: recepción, hospitales, entregas.
- **Humanoides** y **cuadrúpedos**.
- **Drones** para monitoreo y agricultura.

### IA en robótica
- **Visión** para reconocer objetos y personas.
- **Aprendizaje por refuerzo** para aprender a caminar o manipular objetos, a menudo primero en **simulación** y luego en el robot real (*sim-to-real*).
- **Modelos de lenguaje** para recibir instrucciones en lenguaje natural.

### Herramientas
**ROS** (Robot Operating System), simuladores como Gazebo o Webots, placas Arduino y Raspberry Pi para prototipos.`,
      clave: ['Percepción → localización → planeación → control', 'SLAM', 'Refuerzo y simulación (sim-to-real)', 'ROS'],
      pr: { p: 'Diseña un robot sencillo para el laboratorio que lleve material de un salón a otro. Lista sus sensores, cómo se localiza y qué tipo de agente sería.', r: 'Sensores: ultrasonido para obstáculos, encoders, cámara para leer marcas en el piso. Localización: seguir marcas o SLAM básico. Agente: basado en objetivos (destino) con modelo del mapa.' },
      q: [
        ['SLAM significa…', ['Localizar y mapear simultáneamente', 'Un tipo de motor', 'Un lenguaje de programación', 'Una red neuronal'], 0, 'Simultaneous Localization and Mapping.'],
        ['¿Qué sensor mide distancias con láser?', ['IMU', 'LIDAR', 'Encoder', 'Micrófono'], 1, 'LIDAR = Light Detection and Ranging.'],
        ['Entrenar al robot en simulación y luego pasarlo al real se llama…', ['Sim-to-real', 'Overfitting', 'Clustering', 'Backpropagation'], 0, 'Reduce costos y riesgos.']
      ],
      c: [['SLAM', 'Construir un mapa del entorno mientras el robot se localiza en él.'], ['ROS', 'Robot Operating System: conjunto de librerías y herramientas para programar robots.']] }
  ]},

  { n: 6, titulo: 'Herramientas de desarrollo', temas: [
    { id: '6.1', t: 'Librerías y frameworks',
      md: `Python es el lenguaje dominante en IA por su ecosistema.

| Librería | Para qué sirve |
|---|---|
| **NumPy** | Arreglos y álgebra lineal rápida |
| **pandas** | Tablas de datos (DataFrames): leer CSV, limpiar, agrupar |
| **Matplotlib / Seaborn** | Gráficas |
| **scikit-learn** | Aprendizaje automático clásico: clasificación, regresión, clustering, métricas |
| **TensorFlow / Keras** | Redes neuronales; Keras es la interfaz de alto nivel |
| **PyTorch** | Redes neuronales; muy usado en investigación |
| **Hugging Face Transformers** | Modelos preentrenados de lenguaje y visión |
| **OpenCV** | Procesamiento de imágenes y video |
| **NLTK / spaCy** | Procesamiento de lenguaje natural |

### Una red neuronal en Keras
~~~python
from tensorflow import keras
modelo = keras.Sequential([
    keras.layers.Input(shape=(4,)),
    keras.layers.Dense(16, activation="relu"),
    keras.layers.Dense(3, activation="softmax"),
])
modelo.compile(optimizer="adam",
               loss="sparse_categorical_crossentropy",
               metrics=["accuracy"])
modelo.fit(X_tr, y_tr, epochs=50, validation_split=0.2)
~~~

### La misma idea en PyTorch
~~~python
import torch.nn as nn
modelo = nn.Sequential(nn.Linear(4, 16), nn.ReLU(), nn.Linear(16, 3))
~~~

> Ruta sugerida: NumPy → pandas → scikit-learn → Keras o PyTorch.`,
      clave: ['NumPy, pandas, Matplotlib', 'scikit-learn para ML clásico', 'Keras/TensorFlow y PyTorch para redes', 'Hugging Face y OpenCV'],
      pr: { p: 'En Colab, carga el dataset iris con pandas, haz una gráfica de dispersión con Matplotlib y entrena la red de Keras del ejemplo. Reporta la exactitud de validación.', r: 'Con 50 épocas, una red pequeña suele llegar a más de 90% en iris. Si es baja, aumenta las épocas o escala los datos con StandardScaler.' },
      q: [
        ['¿Qué librería usarías para leer y limpiar un CSV?', ['OpenCV', 'pandas', 'PyTorch', 'ROS'], 1, 'pandas maneja DataFrames.'],
        ['scikit-learn está orientada a…', ['Aprendizaje automático clásico', 'Videojuegos', 'Redes de computadoras', 'Bases de datos'], 0, 'Árboles, SVM, k-means, métricas, etc.'],
        ['¿Cuál es una interfaz de alto nivel para redes neuronales sobre TensorFlow?', ['Keras', 'NumPy', 'spaCy', 'Matplotlib'], 0, 'Keras simplifica definir y entrenar modelos.']
      ],
      c: [['scikit-learn', 'Librería de Python para ML clásico: modelos, preprocesamiento y métricas.'], ['PyTorch', 'Framework de redes neuronales con tensores y diferenciación automática.']] },

    { id: '6.2', t: 'Hardware',
      md: `Entrenar redes neuronales es, sobre todo, **multiplicar matrices gigantes**. El hardware importa.

| Hardware | Características | Uso |
|---|---|---|
| **CPU** | Pocos núcleos muy capaces; bueno para tareas secuenciales | ML clásico, preprocesamiento |
| **GPU** | Miles de núcleos simples en paralelo | Entrenar y ejecutar redes neuronales |
| **TPU** (Google) | Chip diseñado para operaciones de tensores | Entrenamiento a gran escala en la nube |
| **NPU** | Acelerador de IA en teléfonos y laptops | Ejecutar modelos localmente con poco consumo |
| **Edge** (Jetson, Raspberry Pi, Coral) | Poca energía, cerca del sensor | Visión en cámaras, robots, drones |

### Lo que más importa en una GPU
- **VRAM** (memoria de la GPU): limita el tamaño del modelo y del lote. Por eso la planeación de la materia pide una tarjeta con **12 GB**.
- **CUDA** (NVIDIA): plataforma que permite a PyTorch y TensorFlow usar la GPU. AMD tiene ROCm.
- Núcleos tensoriales y soporte de precisión reducida (FP16, INT8) para ir más rápido.

### Entrenamiento vs inferencia
- **Entrenar** requiere mucho cómputo y memoria.
- **Inferir** (usar el modelo ya entrenado) es más ligero y puede hacerse en dispositivos pequeños, sobre todo si el modelo se **cuantiza** (se reduce la precisión de los pesos).

~~~python
import torch
print(torch.cuda.is_available())   # True si hay GPU NVIDIA usable
~~~`,
      clave: ['CPU vs GPU (paralelismo)', 'VRAM y CUDA', 'TPU, NPU y edge', 'Entrenamiento vs inferencia, cuantización'],
      pr: { p: 'Revisa tu computadora: ¿qué CPU, RAM y GPU tienes? (en Linux: lscpu, free -h, lspci | grep -i vga). ¿Podrías entrenar ahí o conviene Colab?', r: 'Si no tienes GPU NVIDIA con varios GB de VRAM, usa Google Colab para entrenar redes y tu equipo para preprocesar y hacer ML clásico.' },
      q: [
        ['¿Por qué las GPU aceleran el deep learning?', ['Tienen más RAM que la CPU siempre', 'Hacen miles de operaciones en paralelo', 'Usan Python', 'Tienen internet'], 1, 'Las multiplicaciones de matrices se paralelizan.'],
        ['¿Qué limita el tamaño de modelo que cabe en una GPU?', ['La VRAM', 'El teclado', 'El sistema operativo', 'El disco duro'], 0, 'Pesos y activaciones deben caber en la memoria de la GPU.'],
        ['Reducir la precisión de los pesos para ejecutar en dispositivos pequeños se llama…', ['Cuantización', 'Tokenización', 'Regularización', 'Clustering'], 0, 'Por ejemplo, de 32 bits a 8 bits.']
      ],
      c: [['CUDA', 'Plataforma de NVIDIA para programar cálculos en GPU.'], ['Inferencia', 'Usar un modelo ya entrenado para hacer predicciones.']] },

    { id: '6.3', t: 'Entornos de programación especializados',
      md: `### Opciones
- **Jupyter Notebook / JupyterLab**: celdas de código, texto y gráficas en un mismo documento. Ideal para experimentar y para entregar reportes.
- **Google Colab**: Jupyter en la nube, gratis, con **GPU/TPU** disponible por tiempo limitado. No necesitas instalar nada.
- **Kaggle Notebooks**: parecido a Colab, con miles de datasets y competencias.
- **VS Code**: editor con extensiones de Python y Jupyter; bueno para proyectos más grandes.
- **PyCharm**: IDE completo para Python.

### Ambientes aislados
Cada proyecto debe tener sus propias versiones de librerías.

~~~bash
python3 -m venv ia-env
source ia-env/bin/activate
pip install numpy pandas scikit-learn matplotlib jupyter
jupyter lab
~~~

Con **Anaconda / Miniconda** se hace con:

~~~bash
conda create -n ia python=3.11
conda activate ia
~~~

### Buenas prácticas
- Guarda tus notebooks en **Git/GitHub**.
- Anota la versión de las librerías (requirements.txt).
- Fija la semilla aleatoria (random_state) para resultados reproducibles.
- Separa el notebook de exploración del código final.`,
      clave: ['Jupyter y Google Colab', 'Kaggle y VS Code', 'venv / conda', 'Reproducibilidad: Git, requirements, semillas'],
      pr: { p: 'Crea un ambiente virtual en tu Ubuntu con los comandos de la lección, instala scikit-learn y abre JupyterLab. Ejecuta el ejemplo de iris de la lección 2.3.', r: 'Si pip falla por "externally-managed-environment", es porque debes usar el venv: actívalo primero con source ia-env/bin/activate.' },
      q: [
        ['¿Qué ofrece Google Colab que lo hace útil para IA?', ['Solo editar texto', 'Notebooks en la nube con GPU gratuita limitada', 'Un sistema operativo', 'Un simulador de redes'], 1, 'No requiere instalación y da acceso a GPU.'],
        ['¿Para qué sirve un ambiente virtual (venv)?', ['Para tener internet', 'Para aislar las librerías de cada proyecto', 'Para usar la GPU', 'Para dibujar diagramas'], 1, 'Evita conflictos de versiones.'],
        ['Fijar random_state ayuda a…', ['Que el modelo sea más grande', 'Tener resultados reproducibles', 'Usar menos RAM', 'Conectarse a la nube'], 1, 'Mismos resultados en cada ejecución.']
      ],
      c: [['Jupyter Notebook', 'Documento interactivo con celdas de código, texto y gráficas.'], ['venv', 'Ambiente virtual de Python que aísla las dependencias de un proyecto.']] }
  ]}
  ]
});
