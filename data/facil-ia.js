/* Explicaciones desde cero: Fundamentos de IA */
window.AULA = window.AULA || { materias: [], juegos: [] };
AULA.facil = AULA.facil || {};
AULA.intro = AULA.intro || {};
AULA.intro.ia = 'La inteligencia artificial (IA) es lograr que una computadora haga cosas que normalmente requieren pensar: reconocer una cara, entender lo que escribes, recomendarte una canción o jugar ajedrez. En esta materia vas a ver de dónde salió la IA, cómo "aprende" una máquina con ejemplos, qué es un agente inteligente y para qué se usa en la vida real. No necesitas saber matemáticas avanzadas para empezar.';
Object.assign(AULA.facil, {
'ia:1.1': `Tu cerebro está hecho de **neuronas**: células pequeñitas que se pasan mensajes eléctricos entre ellas. Tienes unos **86 mil millones**.

Imagina una neurona como una persona en un grupo de WhatsApp: recibe mensajes de muchos amigos (por las **dendritas**), los junta y, si son suficientes o muy importantes, ella también manda un mensaje (por el **axón**). Si no, se queda callada.

La conexión entre dos neuronas se llama **sinapsis**. Cuando aprendes algo, algunas conexiones se hacen más fuertes, como un camino en el monte que se marca más de tanto pasar por él. Un científico llamado Hebb lo resumió así: *las neuronas que se activan juntas, se conectan*.

Los científicos copiaron esa idea para crear la **neurona artificial**: recibe números, a cada uno le da una importancia llamada **peso**, los suma y decide si "se activa". En 1958 Frank Rosenblatt construyó la primera que aprendía sola: el **perceptrón**.`,

'ia:1.2': `La IA tiene casi 80 años de historia, con épocas de mucha emoción y épocas en que casi nadie creía en ella.

- **1950**: Alan Turing, un matemático inglés, se pregunta si una máquina puede pensar.
- **1956**: en una reunión en la universidad de **Dartmouth** (Estados Unidos) se inventa el nombre "inteligencia artificial".
- **1958**: aparece el perceptrón, la primera neurona artificial que aprende.
- **Años 70 y 80**: la gente se decepciona porque las máquinas no cumplían lo prometido. A esas épocas se les llama **inviernos de la IA**. Uno empezó cuando Minsky y Papert mostraron que el perceptrón tenía límites.
- **1997**: la computadora **Deep Blue** le gana al campeón mundial de ajedrez.
- **2012**: una red llamada AlexNet aprende a reconocer imágenes muchísimo mejor que antes.
- **2017**: se inventa el **Transformer**, la idea que hace funcionar a ChatGPT y a Claude.

Lo que hizo posible la IA de hoy fue juntar tres cosas: muchísimos datos, computadoras potentes y mejores ideas.`,

'ia:1.3': `¿Cómo sabemos si una máquina es inteligente? Turing propuso un juego en 1950.

Imagina que chateas con dos "personas" que no ves. Una es humana y la otra es una computadora. Tú eres el **interrogador**: puedes preguntarles lo que quieras. Si al final no puedes adivinar cuál es la máquina, la máquina **pasa la prueba**. A esto se le llama **test de Turing** o juego de imitación.

Pero hay una crítica famosa: la **habitación china** de John Searle. Imagina a alguien que no sabe chino, encerrado con un libro de instrucciones que le dice qué símbolos contestar a cada mensaje. Desde afuera parece que entiende chino, pero en realidad solo sigue reglas. Searle dice que así puede ser una máquina: **contesta bien sin entender**.

Ya conoces un test de Turing al revés: el **CAPTCHA**, esas imágenes de "selecciona los semáforos" donde una máquina revisa si tú eres humano.`,

'ia:1.4': `La IA no es una sola cosa, son varias "habilidades" que se pueden dar a una máquina:

- **Visión por computadora**: que la máquina "vea" y entienda fotos o video. Ej.: tu celular que reconoce tu cara.
- **Procesamiento de lenguaje natural**: que entienda y escriba como las personas. Ej.: un traductor o un chatbot.
- **Robótica**: máquinas que se mueven y hacen tareas en el mundo real.
- **Sistemas de recomendación**: Netflix o Spotify sugiriéndote qué ver o escuchar.

Algo importante: toda la IA que existe hoy es **IA estrecha** (también llamada débil). Significa que es muy buena en **una sola cosa**, pero nada más. La calculadora de ajedrez no sabe manejar un coche. Una IA que pudiera hacer de todo como un humano se llamaría **IA general**, y todavía no existe.`,

'ia:1.5': `Como la IA toma decisiones que afectan a personas, hay que pensar si lo hace de forma justa.

**Sesgo**: la IA aprende de datos del pasado. Si esos datos eran injustos, la IA **repite la injusticia**. Por ejemplo, si una empresa casi solo contrataba hombres, una IA entrenada con esos datos aprenderá a preferir hombres.

**Privacidad**: para aprender, la IA usa información de personas, que se debe cuidar.

**Caja negra**: muchas IA no pueden explicar por qué decidieron algo. La **explicabilidad** busca que sí puedan explicarlo, sobre todo si te niegan una beca o un crédito.

**¿Quién es responsable?** Si un auto sin conductor choca, ¿la culpa es del fabricante, del programador o del dueño?

Por eso ya hay reglas. La Unión Europea aprobó una **Ley de IA** que clasifica cada sistema según qué tan **riesgoso** es: mientras más riesgo, más reglas.`,

'ia:2.1': `La lógica es una forma de escribir ideas con símbolos para que una máquina pueda razonar.

Una **proposición** es una frase que es **verdadera (V) o falsa (F)**: "Hoy llueve". Se pueden unir:
- **y** (∧): "llueve y hace frío" es V solo si las dos lo son.
- **o** (∨): "llueve o hace frío" es V si al menos una lo es.
- **no** (¬): cambia V por F.
- **si… entonces** (→): "si llueve, entonces me mojo".

Truco del "si… entonces": **solo es falso cuando lo primero pasa y lo segundo no**. Si llovió y no te mojaste, la frase era falsa. En cualquier otro caso es verdadera.

**Modus ponens**: si sabes "si llueve, me mojo" y sabes que "llueve", concluyes "me mojo".

La **lógica de primer orden** permite hablar de cosas y de "todos" o "algunos":
- ∀ significa **"para todos"**.
- ∃ significa **"existe al menos uno"**. "Algún alumno programa en Python" se escribe ∃x (Alumno(x) ∧ Python(x)).`,

'ia:2.2': `Para que una computadora "sepa" cosas, hay que guardarle el conocimiento de forma ordenada. Un sistema así tiene dos partes:

- La **base de conocimiento**: los datos y reglas que sabe. Como su cuaderno.
- El **motor de inferencia**: la parte que **razona** con esas reglas para sacar conclusiones nuevas. Como tu cerebro leyendo el cuaderno.

Formas de guardar conocimiento:
- **Reglas**: SI tiene fiebre Y tos ENTONCES puede ser gripa.
- **Redes semánticas**: un dibujo de ideas conectadas: "canario → es un → ave → tiene → alas". De ahí se deduce que el canario tiene alas. A eso se le llama **herencia**.
- **Marcos**: fichas con datos, como una credencial: nombre, edad, carrera.

Y dos formas de razonar:
- **Hacia adelante**: de los datos a la conclusión, como un detective que junta pistas.
- **Hacia atrás**: empiezas con una idea y buscas pruebas, como cuando sospechas de alguien y buscas qué lo confirma.`,

'ia:2.3': `"Aprendizaje automático" significa que la máquina aprende con **ejemplos** en lugar de que le escribamos todas las reglas.

En el aprendizaje **supervisado**, cada ejemplo trae su **respuesta correcta** (su etiqueta). Es como estudiar con una guía que ya tiene las respuestas: ves mil fotos con la etiqueta "perro" o "gato", y aprendes a distinguirlos.

Hay dos tipos de preguntas:
- **Clasificación**: la respuesta es una **categoría**. ¿Es spam o no?
- **Regresión**: la respuesta es un **número**. ¿Cuánto costará esta casa?

Para saber si de verdad aprendió, se le hace un "examen" con ejemplos que **nunca vio**: el **conjunto de prueba**.

Cuidado con el **sobreajuste**: cuando la máquina se aprende de memoria los ejemplos pero falla con los nuevos. Como el alumno que memorizó el examen del año pasado y reprueba el nuevo. Si saca 99% con lo que ya vio y 60% en el examen nuevo, está sobreajustada.`,

'ia:2.4': `Poner la respuesta correcta a miles de ejemplos (etiquetar) cuesta mucho tiempo y dinero. Imagina etiquetar 50 000 fotos de animales una por una.

El aprendizaje **semi-supervisado** es un punto medio: usa **pocos ejemplos con respuesta** y **muchos sin respuesta**.

¿Cómo? Con un truco llamado **pseudo-etiquetado**:
1. La máquina aprende con los pocos ejemplos etiquetados.
2. Intenta adivinar los que no tienen etiqueta.
3. Las adivinanzas de las que está **muy segura** las usa como si fueran respuestas correctas (por eso se llaman "pseudo" etiquetas: falsas etiquetas).
4. Vuelve a aprender y repite.

Es como estudiar con un compañero: resuelves los ejercicios que sí sabes, y con eso te animas con los demás.

El riesgo: si al principio adivina mal y se lo cree, **refuerza sus propios errores**.`,

'ia:2.5': `En el aprendizaje **no supervisado** los ejemplos **no traen respuesta**. La máquina debe encontrar sola los patrones.

Imagina que te dan una caja con 200 calcetines revueltos y nadie te dice cómo acomodarlos. Tú solo los juntas por color o tamaño. Eso es **agrupamiento** (clustering).

El método más famoso se llama **k-means**:
1. Decides cuántos grupos quieres (eso es la **k**).
2. Pones k "centros" al azar.
3. Cada dato se va con el centro más cercano.
4. Cada centro se mueve al **promedio** de su grupo.
5. Repites hasta que los centros ya no se muevan.

Otros usos:
- **Reducir datos**: resumir muchas columnas en pocas para poder graficarlas (se llama **PCA**).
- **Detectar cosas raras**: un movimiento de tu tarjeta que no se parece a nada de lo que haces normalmente.`,

'ia:2.6': `El aprendizaje **por refuerzo** es como entrenar a un perrito: si hace algo bien le das un premio, si lo hace mal, no. Nadie le explica la respuesta; aprende **probando**.

Las piezas tienen nombre:
- **Agente**: quien aprende (el perrito, un robot, un programa que juega).
- **Entorno**: el mundo donde actúa.
- **Estado**: la situación en ese momento.
- **Acción**: lo que decide hacer.
- **Recompensa**: el premio o castigo (un número).
- **Política**: su **estrategia**, lo que aprendió a hacer en cada situación.

Un dilema: ¿hago lo que ya sé que funciona (**explotar**) o pruebo algo nuevo que podría ser mejor (**explorar**)? Como pedir siempre tu comida favorita o probar algo del menú. Una solución es explorar de vez en cuando al azar.

Así aprendió **AlphaGo** a jugar Go mejor que cualquier humano: jugando millones de partidas contra sí mismo.`,

'ia:2.7': `En el aprendizaje **auto-supervisado**, la máquina **se inventa sus propias preguntas** a partir de los datos, sin que nadie etiquete nada.

¿Cómo? **Tapando una parte** del dato y pidiéndose adivinarla:
- Le muestras "La capital de Oaxaca es ___" y tiene que adivinar la palabra que sigue.
- Le tapas una palabra en medio: "El [___] ladra" → perro.

Como el texto original ya trae la respuesta, **las etiquetas salen del mismo dato**. Y como en internet hay muchísimo texto, la máquina puede practicar con miles de millones de ejemplos.

Así se entrenan los modelos tipo **ChatGPT o Claude**: primero aprenden a **predecir la siguiente palabra** leyendo muchísimo. Después se les da un **ajuste fino**: un entrenamiento extra, más corto, con ejemplos etiquetados para que aprendan a ayudar y seguir instrucciones.`,

'ia:2.8': `Normalmente una IA se entrena **una vez** con todos los datos y listo. Eso se llama aprendizaje **por lotes**.

En el aprendizaje **en línea** (on-line), la IA **sigue aprendiendo poco a poco** conforme llegan datos nuevos, como tú que vas aprendiendo cada día.

¿Para qué? Porque **el mundo cambia**. Los que mandan spam inventan trucos nuevos cada semana; si el filtro no se actualiza, deja de servir. A ese cambio se le llama **deriva de concepto**: lo que la IA aprendió ya no coincide con la realidad.

En la librería scikit-learn, la instrucción para aprender poquito a poquito se llama **partial_fit** ("ajuste parcial").

Riesgos:
- **Olvido catastrófico**: aprende lo nuevo y se le olvida lo viejo.
- Alguien malintencionado podría mandarle datos falsos a propósito para "enseñarle" mal.`,

'ia:3.1': `Un **agente** es algo que **percibe** lo que pasa a su alrededor y **actúa** en consecuencia.

- Percibe con **sensores**: como tus ojos y oídos.
- Actúa con **actuadores**: como tus manos y piernas.

Ejemplos:
- Una **aspiradora robot** percibe con sensores de choque y de suciedad, y actúa con sus ruedas y cepillos.
- Un **termostato** percibe la temperatura con un termómetro y actúa prendiendo o apagando la calefacción.
- Un **bot de Telegram** percibe los mensajes que le llegan y actúa mandando respuestas.

Un agente **racional** es el que elige la acción que **probablemente** le dará el mejor resultado con lo que sabe. No es perfecto ni adivina el futuro: decide lo mejor posible con la información que tiene.

El código que decide qué hacer se llama **programa del agente**.`,

'ia:3.2': `Todo agente de software es un programa, pero **no todo programa es un agente**.

Una **calculadora** es un programa normal: tú le das números, te da el resultado y se queda quieta esperando.

Un agente tiene "iniciativa propia". Tiene cuatro rasgos:
1. **Autonomía**: funciona solo, sin que alguien le diga cada paso.
2. **Reactividad**: se da cuenta cuando algo cambia y responde a tiempo.
3. **Proactividad**: toma la iniciativa para lograr una meta.
4. **Habilidad social**: se comunica con personas u otros agentes.

Ejemplo: un **asistente que agenda reuniones** revisa tu calendario por su cuenta, nota que alguien canceló, propone otro horario y se pone de acuerdo con los demás. Eso es un agente.

Un antivirus que vigila todo el tiempo y bloquea amenazas también se parece a un agente. Un compilador (que traduce código) no: solo hace su trabajo cuando lo ejecutas.`,

'ia:3.3': `Un agente tiene dos partes:
- La **arquitectura**: el "cuerpo" donde vive (una computadora, un robot, un celular).
- El **programa**: el "cerebro", el código que decide qué hacer.

**Agente = arquitectura + programa.**

Antes de construir un agente se llena una tablita llamada **REAS** (en inglés PEAS):
- **R**endimiento: ¿cómo sabremos si lo hace bien?
- **E**ntorno: ¿dónde trabaja?
- **A**ctuadores: ¿con qué actúa?
- **S**ensores: ¿con qué percibe?

Ejemplo, un taxi sin conductor:
- Rendimiento: llegar seguro, rápido y sin multas.
- Entorno: calles, tráfico, peatones.
- Actuadores: volante, acelerador, freno.
- Sensores: cámaras, GPS y **LIDAR** (un sensor que mide distancias con láser).

Todo agente funciona en un ciclo: **percibir → pensar → actuar**, una y otra vez.`,

'ia:3.4': `El comportamiento de un agente es **lo que hace** ante lo que percibe. Queremos que sea **racional**.

Racional **no significa perfecto**. Un agente racional elige lo que **probablemente** saldrá mejor, con lo que sabe en ese momento. Si cruzas la calle después de mirar a los dos lados y de repente te cae una maceta, tu decisión fue racional: no podías saberlo.

Lo que sí debe hacer un buen agente:
- **Buscar información** antes de actuar (mirar antes de cruzar).
- **Aprender** de la experiencia.
- Ser **autónomo**: depender más de lo que aprende que de lo que le programaron.

Un error común es medir mal su trabajo. Si a una aspiradora la premias por "polvo recogido", podría **tirar polvo para volverlo a recoger**. Hay que medir el resultado que quieres (el piso limpio), no la acción.`,

'ia:3.5': `Hay cinco tipos de agentes, del más sencillo al más listo:

1. **Reflejo simple**: reacciona a lo que ve **ahora** con reglas de "si pasa esto, haz aquello". No tiene memoria. Ej.: un termostato.
2. **Reflejo basado en modelo**: además **recuerda** cosas que ya no ve (tiene un "mapa" del mundo). Ej.: una aspiradora que guarda el mapa de tu casa.
3. **Basado en objetivos**: tiene una **meta** y planea cómo llegar. Ej.: el GPS que busca cómo llevarte a tu destino.
4. **Basado en utilidad**: no solo quiere llegar, sino elegir **la mejor manera** (la más rápida, barata o cómoda). A eso que mide "qué tan bueno" es cada opción se le llama **utilidad**.
5. **Que aprende**: mejora con la experiencia. Tiene un "crítico" que le dice qué tan bien va y un **generador de problemas** que le propone probar cosas nuevas. Ej.: Netflix, que mejora sus recomendaciones con lo que ves.`,

'ia:3.6': `El **ambiente** es el lugar donde trabaja el agente. No todos son igual de difíciles. Se describen con pares de opuestos:

- **Observable o no**: ¿el agente ve todo? En ajedrez sí. En póker **no**, porque no ves las cartas de los demás (parcialmente observable).
- **Determinista o con azar** (estocástico): ¿siempre pasa lo mismo al hacer algo? Con dados, no.
- **Episódico o secuencial**: ¿cada decisión es independiente? Revisar piezas una por una es **episódico**. En ajedrez cada jugada afecta a las siguientes: es **secuencial**.
- **Estático o dinámico**: ¿el mundo cambia mientras piensas? Un crucigrama no cambia. **Conducir sí**: es dinámico.
- **Discreto o continuo**: casillas contadas o valores infinitos como la velocidad.
- **Un agente o varios**.

El ambiente más difícil es como manejar un taxi en la ciudad: no ves todo, hay azar, todo cambia y hay muchos otros conductores.`,

'ia:4.1': `**Clasificar** es poner una etiqueta o categoría: ¿este correo es spam o no? ¿esta foto es de perro o de gato?

- **Binaria**: solo dos opciones (sí/no).
- **Multiclase**: varias opciones, pero solo una correcta (qué número es, del 0 al 9).
- **Multietiqueta**: puede llevar varias etiquetas a la vez (una canción puede ser rock **y** romántica).

Para saber si un clasificador funciona no basta con contar aciertos. Hay dos errores distintos:
- **Falso positivo**: dijo "sí" y era "no" (marcó como spam un correo de tu mamá).
- **Falso negativo**: dijo "no" y era "sí" (dejó pasar un spam).

Y dos medidas:
- **Precisión**: de todo lo que dijo "sí", ¿cuánto era cierto? Se calcula **aciertos positivos / todo lo que dijo positivo**.
- **Recall** (exhaustividad): de todos los "sí" reales, ¿cuántos encontró?

En medicina el falso negativo suele ser peor: no detectar a un enfermo es grave.`,

'ia:4.2': `La **regresión** sirve para predecir un **número**: cuánto costará una casa, qué temperatura hará mañana o qué calificación sacarás según tus horas de estudio.

La más sencilla es la **regresión lineal**: busca la **línea recta** que mejor pasa entre los puntos. Si graficas horas de estudio contra calificación, la línea te dice "por cada hora extra, subes tanto".

¿Cómo sabemos si predice bien? Medimos el **error**, la diferencia entre lo que predijo y lo real:
- **MAE**: el promedio de los errores (sin importar si se pasó o le faltó).
- **MSE**: el promedio de los errores **elevados al cuadrado**. Al elevar al cuadrado, los errores grandes pesan muchísimo más.

Una trampa de nombres: la **regresión logística** **no** es regresión. Aunque se llama así, se usa para **clasificar** (decir sí o no).`,

'ia:4.3': `El **procesamiento de lenguaje natural** (PLN) es la parte de la IA que entiende y escribe como las personas. Lo usas cuando hablas con un asistente de voz o usas un traductor.

Como las computadoras solo entienden números, primero hay que preparar el texto:
1. **Tokenizar**: partir el texto en pedacitos (palabras). "Hola mundo" → [Hola, mundo].
2. Quitar palabras que no aportan mucho, como "el", "de", "y".
3. Llevar cada palabra a su forma base: "corriendo" → "correr".

Luego cada palabra se convierte en números. Las técnicas modernas, llamadas **Transformers**, son muy listas porque entienden cada palabra **según las palabras que la rodean**: saben que "banco" no es lo mismo en "fui al banco por dinero" que en "me senté en el banco".

Algunas tareas de PLN: saber si un comentario es positivo o negativo, traducir, resumir, y **NER**: encontrar nombres de personas, lugares y empresas dentro de un texto.`,

'ia:4.4': `Algunas IA no solo reconocen cosas: **crean cosas nuevas**. Se llaman **modelos generativos**. Hacen imágenes, texto, música o voces.

Las ideas principales:
- **GAN**: dos redes que compiten. Una es un **falsificador** (el generador) que hace imágenes falsas. La otra es un **detective** (el discriminador) que intenta descubrir cuáles son falsas. Compiten tanto que las falsificaciones terminan pareciendo reales.
- **Modelos de difusión**: empiezan con una imagen llena de "ruido" (como la estática de una tele vieja) y la van **limpiando paso a paso** hasta que aparece una imagen. Así funcionan muchos generadores de imágenes.
- Los chatbots generan texto **una palabra a la vez**.

Un uso muy práctico es el **aumento de datos**: si tienes pocas fotos para entrenar, las giras, recortas o aclaras para tener "más" ejemplos.

El riesgo: los **deepfakes**, videos o audios falsos de personas reales.`,

'ia:5.1': `En las tiendas en línea (Amazon, Mercado Libre) la IA está en todos lados.

Lo más conocido son las **recomendaciones**:
- **Filtrado colaborativo**: "personas parecidas a ti también compraron esto". Se fija en lo que hacen usuarios con gustos parecidos.
- **Basado en contenido**: si compraste un libro de terror, te recomienda otros libros de terror.

Tienen un problema llamado **arranque en frío**: cuando llega un usuario nuevo o un producto nuevo, todavía **no hay historial** para recomendarle nada.

Otros usos:
- **Detectar fraudes**: si de repente tu tarjeta compra algo muy raro en otro país, la IA lo nota porque no se parece a tus compras normales.
- **Precios que cambian** según la demanda.
- **Chatbots** que contestan dudas de clientes.
- Calcular cuánto se va a vender para tener inventario.`,

'ia:5.2': `La IA también ayuda a cuidar la naturaleza. Ixtlán de Juárez es famoso por cuidar su bosque en comunidad, y la IA podría ayudar justo en eso.

- **Vigilar bosques desde el espacio**: con fotos de **satélites**, la IA detecta dónde se están cortando árboles o dónde hay plagas.
- **Incendios**: cámaras y satélites detectan humo temprano.
- **Animales**: las **cámaras trampa** toman fotos cuando algo se mueve, y la IA reconoce qué especie aparece. También hay IA que reconoce aves por su canto.
- **Clima y agua**: predecir sequías, lluvias o cuánto regar un cultivo.

Pero ojo: la IA también **contamina**. Entrenar modelos grandes gasta muchísima **electricidad y agua** (para enfriar las computadoras). Usar modelos pequeños cuando se puede también es cuidar el ambiente.`,

'ia:5.3': `En la escuela la IA puede ser como un tutor personal.

- **Tutores inteligentes**: programas que se dan cuenta de qué sabes y qué no, y te dan ejercicios a tu medida.
- **Aprendizaje adaptativo**: si fallas mucho en un tema, te pone más práctica ahí; si ya lo dominas, avanza. Esta aula hace algo parecido con las tarjetas de repaso.
- **Calificar automáticamente** ejercicios.
- **Detectar a tiempo** a estudiantes que podrían dejar la escuela, para apoyarlos.
- **Traducir**: por ejemplo a lenguas como el zapoteco o el mixe. Es difícil porque **hay muy pocos textos digitales** en esas lenguas para que la IA aprenda.

Riesgos: que la IA haga tu tarea y no aprendas nada, el plagio, y el cuidado de los datos de los alumnos.

La mejor forma de usarla: pídele que **te explique y te haga preguntas**, no que te dé las respuestas.`,

'ia:5.4': `Un **robot** es un agente con cuerpo: percibe el mundo real con sensores y se mueve con motores.

Un robot inteligente hace cuatro cosas:
1. **Percibir**: cámaras, sensores de distancia como el **LIDAR** (mide con láser), sensores de movimiento.
2. **Saber dónde está**: con algo llamado **SLAM**, que significa construir un mapa del lugar **y al mismo tiempo** ubicarse dentro de él. Como cuando llegas a una casa nueva y vas aprendiendo dónde está cada cuarto.
3. **Planear**: decidir el camino.
4. **Moverse** con precisión.

Muchos robots aprenden primero en un **simulador** (un videojuego del mundo real), porque ahí pueden caerse mil veces sin romperse. Luego se pasa lo aprendido al robot real. Esto se llama **sim-to-real** ("de la simulación a lo real").

Para programar robots se usa mucho **ROS**, un conjunto de herramientas, y para prototipos placas baratas como Arduino o Raspberry Pi.`,

'ia:6.1': `Para programar IA casi todo el mundo usa el lenguaje **Python**. Lo bueno es que no hay que hacer todo desde cero: existen **librerías**, que son paquetes de código ya hecho que puedes usar.

Las más importantes, en el orden en que conviene aprenderlas:
- **NumPy**: hacer cuentas con muchos números a la vez.
- **pandas**: manejar **tablas de datos**, como un Excel desde código. Sirve para leer y limpiar archivos CSV.
- **Matplotlib**: hacer gráficas.
- **scikit-learn**: tiene listos los métodos de aprendizaje automático "clásicos": clasificar, agrupar, medir resultados.
- **Keras / TensorFlow** y **PyTorch**: para construir **redes neuronales**. Keras es la forma más sencilla de usar TensorFlow.
- **OpenCV**: para trabajar con imágenes y video.

No tienes que aprenderlas todas al mismo tiempo. Empieza por pandas y scikit-learn.`,

'ia:6.2': `Entrenar una IA significa hacer **millones de multiplicaciones**. Por eso el tipo de computadora importa mucho.

- **CPU**: el procesador normal. Es como un chef muy hábil, pero uno solo: hace las cosas de una en una.
- **GPU**: la tarjeta de video. Es como **mil cocineros** haciendo tareas sencillas **al mismo tiempo**. Por eso entrena IA muchísimo más rápido. Las GPU de NVIDIA usan una tecnología llamada **CUDA**.
- La memoria de la GPU se llama **VRAM**. Si el modelo no cabe en ella, no se puede entrenar ahí. Por eso tu profesor pide tarjetas de 12 GB.
- **TPU** y **NPU**: chips hechos especialmente para IA (en la nube o en celulares).

Dos momentos distintos:
- **Entrenar**: cuando la IA aprende. Es lo pesado.
- **Usar el modelo** ya entrenado (se llama **inferencia**). Es mucho más ligero y puede hacerse hasta en un celular, sobre todo si se "comprime" el modelo (se llama **cuantización**).`,

'ia:6.3': `¿Dónde se escribe el código de IA? Hay herramientas pensadas para eso.

- **Jupyter Notebook**: un documento donde mezclas **código, texto y gráficas**. Escribes un pedacito de código, lo ejecutas y ves el resultado justo abajo. Ideal para experimentar.
- **Google Colab**: es Jupyter pero **en internet**, gratis y sin instalar nada. Además te presta una **GPU** por un rato. Es la mejor opción para empezar si tu computadora no es muy potente. Solo necesitas una cuenta de Google.
- **VS Code**: un editor de código para proyectos más grandes.

Un consejo importante: cada proyecto debe tener su propio **ambiente virtual** (venv). Es como una caja separada con sus propias librerías, para que un proyecto no descomponga a otro.

Y para que tus resultados salgan iguales cada vez que corras tu código, se fija la "semilla" del azar con **random_state**.`
});
