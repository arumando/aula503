/* Aula 503 — camino de Ingeniería de Software I (desde cero).
   Hilo conductor: la app de pedidos de Doña Mari, la de los tamales de Ixtlán. */
(function (root) {
  'use strict';
  const T = root.T || ((k, t) => t);

  const is = {
    id: 'is', nombre: 'Software desde cero', corto: 'Software', color: 'is',
    lema: 'Cómo se planea, se pide y se diseña un programa de verdad.',
    unidades: [
      {
        titulo: '¿Qué es la ingeniería de software?', desc: 'Hacer software con método, no a lo loco.',
        lecciones: [
          {
            id: 's1', titulo: 'Programar no es lo mismo que hacer software', pasos: [
              { tipo: 'explica', titulo: 'Un banco contra una casa', texto:
                '<p>Si haces un <b>banco de madera</b> para ti, no necesitas planos: cortas, clavas y listo. Pero para construir una <b>casa</b> para otra familia necesitas platicar con ellos, hacer planos, calcular costos, coordinar a varios albañiles y revisar que todo quede bien.</p>' +
                '<p>Con los programas pasa igual. Un programita para tu tarea lo haces solo y rápido. Una app para un negocio, que usarán cientos de personas durante años, necesita <b>método</b>. Ese método es la ' + T('ingsoft', 'ingeniería de software') + '.</p>' +
                '<p>En este curso vamos a seguir un proyecto: <b>Doña Mari</b>, la de los tamales de Ixtlán, quiere una app para que sus clientes le hagan pedidos.</p>' },
              { tipo: 'descubre', titulo: 'El software es raro', texto: '<p>No se parece a otros productos. Toca cada tarjeta.</p>', tarjetas: [
                { titulo: 'No es solo código', html: 'El ' + T('software', 'software') + ' son los <b>programas</b>, los <b>datos</b> que usan y los <b>documentos</b> que explican cómo funciona y cómo se usa.' },
                { titulo: 'Se desarrolla, no se fabrica', html: 'Hacer una copia cuesta casi nada. Lo caro es <b>pensarlo y construirlo</b> la primera vez.' },
                { titulo: 'No se desgasta…', html: '…como un zapato. Pero sí se «echa a perder»: cada cambio mal hecho mete errores nuevos.' },
                { titulo: 'Siempre cambia', html: 'El cliente pide cosas nuevas, cambian las leyes, sale otro celular. Un buen software se hace pensando en que <b>lo van a modificar</b>.' }
              ] },
              { tipo: 'pregunta', texto: '¿Qué incluye el <b>software</b>?', opciones: ['Solo el código', 'Programas, datos y documentación', 'Solo la computadora', 'El Internet'], correcta: 1,
                explica: 'El manual de usuario, la base de datos y los diagramas también son parte del software.' },
              { tipo: 'pregunta', texto: 'En los años 60 y 70 muchos proyectos salían tarde, caros y llenos de fallas. A eso se le llamó…', opciones: ['La crisis del software', 'El virus del milenio', 'La nube', 'La era del hardware'], correcta: 0,
                explica: 'Por eso, en una conferencia de 1968 se propuso tratar el software como una ingeniería: con planes, métodos y control de calidad.' }
            ]
          },
          {
            id: 's2', titulo: 'Software de calidad', pasos: [
              { tipo: 'explica', titulo: '¿Qué hace «bueno» a un programa?', texto:
                '<p>No basta con que «funcione». Imagina que la app de Doña Mari sí toma pedidos, pero tarda un minuto en abrir y se cierra sola cada rato. Nadie la usaría.</p>' +
                '<p>Hay una norma internacional, la <b>ISO/IEC 25010</b> (de la familia ' + T('calidad', 'ISO 25000') + '), que dice qué revisar para saber si un software es de calidad.</p>' },
              { tipo: 'descubre', titulo: 'Las características de calidad', texto: '<p>Estas son las que más vas a escuchar. Toca cada una.</p>', tarjetas: [
                { titulo: 'Adecuación funcional', html: '<b>Hace lo que debe</b> y lo hace bien: calcula el total correcto, guarda el pedido.' },
                { titulo: 'Eficiencia', html: '<b>Rápido y sin desperdiciar</b>: abre pronto y no se acaba la batería.' },
                { titulo: 'Usabilidad', html: '<b>Fácil de usar</b>: hasta la abuelita encuentra dónde pagar.' },
                { titulo: 'Fiabilidad', html: '<b>No falla</b>: no se cierra sola ni pierde pedidos.' },
                { titulo: 'Seguridad', html: '<b>Cuida los datos</b>: nadie ajeno ve los teléfonos ni las contraseñas.' },
                { titulo: 'Mantenibilidad', html: '<b>Fácil de arreglar y cambiar</b> el día de mañana.' },
                { titulo: 'Portabilidad y compatibilidad', html: '<b>Funciona en otros equipos</b> (Android, iPhone, computadora) y <b>convive</b> con otros sistemas.' }
              ] },
              { tipo: 'lab', lab: 'clasifica', titulo: 'Las quejas de los clientes', texto: '<p>Los clientes de Doña Mari mandaron quejas. Para cada una, elige qué característica de calidad está fallando.</p>',
                pregunta: '¿Qué característica falla?',
                grupos: [{ id: 'u', nombre: 'Usabilidad', desc: 'fácil de usar' }, { id: 'f', nombre: 'Fiabilidad', desc: 'no falla' }, { id: 'e', nombre: 'Eficiencia', desc: 'rápido, sin gastar' }, { id: 's', nombre: 'Seguridad', desc: 'cuida los datos' }],
                items: [
                  { t: '«Mi abuelita no encuentra dónde se paga»', g: 'u', por: 'El problema es que es difícil de usar.' },
                  { t: '«La app se cierra sola cuando hay muchos pedidos»', g: 'f', por: 'Falla justo cuando más se necesita.' },
                  { t: '«Tarda 30 segundos en abrir el menú»', g: 'e', por: 'Funciona, pero lento.' },
                  { t: '«Cualquiera puede ver los teléfonos de los clientes»', g: 's', por: 'Los datos personales no están protegidos.' },
                  { t: '«Los botones son tan chiquitos que no les atino»', g: 'u', por: 'Es un problema de facilidad de uso.' },
                  { t: '«Si se va la luz, se pierde el pedido»', g: 'f', por: 'Un sistema fiable no pierde información.' },
                  { t: '«Me acaba la batería del celular»', g: 'e', por: 'Gasta recursos de más.' },
                  { t: '«Las contraseñas se guardan tal cual, sin cifrar»', g: 's', por: 'Si alguien entra, las ve todas.' }
                ],
                metas: [{ t: 'Clasifica todas las quejas', ok: c => c.hubo('clasifica') }] },
              { tipo: 'pregunta', texto: 'Un programa que es fácil de corregir y de cambiar tiene buena…', opciones: ['Portabilidad', 'Mantenibilidad', 'Usabilidad', 'Eficiencia'], correcta: 1,
                explica: 'Mantenibilidad: qué tan fácil es darle mantenimiento. Importa mucho porque el software vive años y siempre cambia.' }
            ]
          },
          {
            id: 's3', titulo: 'Las etapas para hacer software', pasos: [
              { tipo: 'explica', titulo: 'Las 5 actividades de siempre', texto:
                '<p>No importa qué método uses, casi todo proyecto pasa por estas actividades (así las llama el libro de Pressman):</p>' +
                '<div class="linea-tiempo"><div><b>1. Comunicación</b><span>Platicar con Doña Mari: ¿qué vende?, ¿quién va a usar la app?, ¿qué necesita?</span></div><div><b>2. Planeación</b><span>Cuánto va a tardar, cuánto va a costar, quién hace qué y qué podría salir mal.</span></div><div><b>3. Modelado</b><span>Hacer los «planos»: diagramas, dibujos de las pantallas, diseño de la base de datos.</span></div><div><b>4. Construcción</b><span>Programar y <b>probar</b> que funcione.</span></div><div><b>5. Despliegue</b><span>Entregar la app, instalarla y escuchar lo que opina el cliente.</span></div></div>' },
              { tipo: 'ordena', texto: 'Ordena las actividades del proceso de software:', items: ['Comunicación', 'Planeación', 'Modelado', 'Construcción', 'Despliegue'],
                explica: 'Primero entiendes qué quieren, luego planeas, diseñas, construyes (y pruebas) y entregas.' },
              { tipo: 'lab', lab: 'clasifica', titulo: '¿En qué etapa va cada cosa?', texto: '<p>El equipo de la app de Doña Mari anotó lo que hizo esta semana. Ponle a cada tarea su etapa.</p>',
                pregunta: '¿En qué etapa va?',
                grupos: [{ id: 'c', nombre: 'Comunicación' }, { id: 'p', nombre: 'Planeación' }, { id: 'm', nombre: 'Modelado' }, { id: 'k', nombre: 'Construcción' }, { id: 'd', nombre: 'Despliegue' }],
                items: [
                  { t: 'Preguntarle a Doña Mari qué tamales vende', g: 'c', por: 'Es entender lo que el cliente necesita.' },
                  { t: 'Calcular que el proyecto tardará 12 semanas', g: 'p', por: 'Tiempos y costos son planeación.' },
                  { t: 'Dibujar cómo se verá la pantalla del menú', g: 'm', por: 'Es hacer los «planos» antes de programar.' },
                  { t: 'Escribir el código del carrito de compras', g: 'k', por: 'Programar es construir.' },
                  { t: 'Probar que el total se calcule bien', g: 'k', por: 'Las pruebas son parte de la construcción.' },
                  { t: 'Instalar la app en el celular de Doña Mari', g: 'd', por: 'Entregar e instalar es desplegar.' },
                  { t: 'Hacer el diagrama de casos de uso', g: 'm', por: 'Los diagramas son modelado.' },
                  { t: 'Decidir cuánto se le va a cobrar', g: 'p', por: 'El presupuesto es parte de la planeación.' }
                ],
                metas: [{ t: 'Acomoda todas las tareas', ok: c => c.hubo('clasifica') }] },
              { tipo: 'pregunta', texto: '¿En qué actividad se averigua <b>qué necesita el cliente</b>?', opciones: ['Construcción', 'Comunicación', 'Despliegue', 'Ninguna, eso no importa'], correcta: 1,
                explica: 'Si te saltas la comunicación, puedes construir algo perfecto… que nadie pidió.' }
            ]
          }
        ]
      },
      {
        titulo: 'Formas de organizarse', desc: 'Cascada, ágil, Scrum y otros modelos.',
        lecciones: [
          {
            id: 's4', titulo: 'Cascada contra ágil', pasos: [
              { tipo: 'explica', titulo: 'Dos recetas para el mismo platillo', texto:
                '<p>Un <b>modelo de proceso</b> es la «receta» de cómo se organiza el equipo para hacer las 5 actividades.</p>' +
                '<div class="tres"><div><b>Cascada</b><span>Cada etapa se hace <b>completa y en orden</b>: todos los requisitos, luego todo el diseño, luego todo el código… Como el agua, no regresa. El cliente ve la app hasta el final.</span></div><div><b>Ágil</b><span>Se trabaja en vueltas cortas (sprints) de 1 a 4 semanas. En cada vuelta se entrega <b>un pedacito que ya funciona</b>, el cliente lo prueba y se ajusta el plan.</span></div></div>' },
              { tipo: 'lab', lab: 'proyecto', titulo: 'Mismo proyecto, dos formas', texto: '<ol><li>Con <b>Cascada</b> seleccionado, presiona <b>Simular el proyecto</b> y lee lo que pasa cada semana.</li><li>Cambia a <b>Ágil</b> y simula otra vez.</li><li>Compara la tabla del final.</li></ol>',
                metas: [
                  { t: 'Simula el proyecto con cascada', ok: c => c.hubo('proyecto', e => e.modelo === 'cascada') },
                  { t: 'Simula el proyecto con ágil', ok: c => c.hubo('proyecto', e => e.modelo === 'agil') }
                ] },
              { tipo: 'pregunta', texto: '¿Cuándo conviene usar <b>cascada</b>?', opciones: ['Cuando el cliente todavía no sabe bien lo que quiere', 'Cuando los requisitos están muy claros y casi no van a cambiar', 'Nunca', 'Siempre'], correcta: 1,
                explica: 'Cascada falla cuando hay cambios, porque regresar cuesta caro. Si las reglas son fijas (un elevador, una nómina), funciona bien.' },
              { tipo: 'pregunta', texto: 'En ágil, ¿cada cuándo ve avances el cliente?', opciones: ['Solo al final', 'Al terminar cada sprint (cada 1 a 4 semanas)', 'Nunca', 'Una vez al año'], correcta: 1,
                explica: 'Así los errores y los cambios se descubren temprano, cuando todavía es barato corregirlos.' }
            ]
          },
          {
            id: 's5', titulo: 'Otros modelos', pasos: [
              { tipo: 'descubre', titulo: 'La familia de modelos', texto: '<p>Además de cascada y ágil, tu temario menciona estos. Toca cada uno.</p>', tarjetas: [
                { titulo: 'Modelo en V', html: 'Es cascada, pero cada etapa tiene su <b>prueba gemela</b>: los requisitos se comprueban con pruebas de aceptación, el diseño con pruebas de integración, etc.' },
                { titulo: 'Incremental', html: 'Se entrega <b>por partes</b>: primero lo básico (ver menú y pedir), luego se agregan más cosas (pagos, avisos).' },
                { titulo: 'Prototipos', html: 'Se hace una <b>maqueta rápida</b> (dibujos o una app de mentiritas) para que el cliente diga «así sí» o «así no» antes de programar en serio.' },
                { titulo: 'Espiral', html: 'Se avanza en vueltas, y en cada vuelta se pregunta <b>«¿qué podría salir mal?»</b> (análisis de riesgos). Para proyectos grandes y peligrosos.' },
                { titulo: 'Proceso Unificado (RUP)', html: 'Cuatro fases: <b>inicio, elaboración, construcción y transición</b>. Usa mucho los diagramas UML y casos de uso.' },
                { titulo: 'Ágiles: XP y Scrum', html: '<b>XP</b> (Programación Extrema) se enfoca en buenas prácticas de código, como programar en parejas. <b>Scrum</b> se enfoca en organizar al equipo en sprints.' }
              ] },
              { tipo: 'lab', lab: 'clasifica', titulo: '¿Qué modelo le recomiendas?', texto: '<p>Llegaron varios clientes. Para cada proyecto, elige el modelo que mejor le queda.</p>',
                pregunta: '¿Qué modelo conviene?',
                grupos: [{ id: 'c', nombre: 'Cascada', desc: 'requisitos fijos' }, { id: 'p', nombre: 'Prototipos', desc: 'maqueta primero' }, { id: 'a', nombre: 'Ágil / Scrum', desc: 'entregas cortas' }, { id: 'e', nombre: 'Espiral', desc: 'mucho riesgo' }],
                items: [
                  { t: 'Un sistema de nómina con reglas de ley que no cambian', g: 'c', por: 'Los requisitos están claros desde el inicio.' },
                  { t: 'El cliente no sabe cómo quiere las pantallas', g: 'p', por: 'Una maqueta le ayuda a decidir antes de gastar en programar.' },
                  { t: 'Una empresa nueva que cambia de idea cada mes', g: 'a', por: 'Necesita adaptarse rápido a los cambios.' },
                  { t: 'El software de control de un cohete', g: 'e', por: 'Es caro y peligroso: hay que analizar los riesgos en cada vuelta.' },
                  { t: 'Una app que quiere salir pronto y mejorar cada 2 semanas', g: 'a', por: 'Entregas cortas y frecuentes son lo ágil.' },
                  { t: 'Software para un elevador con requisitos fijos', g: 'c', por: 'Lo que debe hacer un elevador no cambia a cada rato.' },
                  { t: 'Enseñar dibujos de la app a los usuarios antes de programar', g: 'p', por: 'Eso es justamente un prototipo.' },
                  { t: 'Un sistema de hospital donde un error sería grave', g: 'e', por: 'Mucho riesgo: conviene revisar qué puede salir mal en cada vuelta.' }
                ],
                metas: [{ t: 'Recomienda un modelo para cada proyecto', ok: c => c.hubo('clasifica') }] },
              { tipo: 'pregunta', texto: 'Un <b>prototipo</b> sirve sobre todo para…', opciones: ['Entregar el producto final', 'Que el cliente vea una maqueta y diga qué quiere antes de construir en serio', 'Probar la velocidad del Internet', 'Cobrar más'], correcta: 1,
                explica: 'Es más barato corregir un dibujo que un programa terminado.' }
            ]
          },
          {
            id: 's6', titulo: 'Scrum por dentro', pasos: [
              { tipo: 'descubre', titulo: 'Las piezas de Scrum', texto: '<p>' + T('scrum', 'Scrum') + ' tiene roles, eventos y listas. Toca cada tarjeta.</p>', tarjetas: [
                { titulo: 'Product Owner', html: 'Representa al cliente. <b>Decide qué es lo más importante</b> y ordena la lista de pendientes.' },
                { titulo: 'Scrum Master', html: 'Cuida que el equipo trabaje bien y <b>quita obstáculos</b> («no tenemos acceso al servidor» → él lo consigue).' },
                { titulo: 'Equipo de desarrollo', html: 'Las personas que diseñan, programan y prueban. Se organizan solas.' },
                { titulo: 'Product backlog', html: 'La <b>lista de pendientes</b> de todo el producto, ordenada de lo más importante a lo menos.' },
                { titulo: 'Sprint', html: 'Una vuelta de trabajo de 1 a 4 semanas. Al empezar se elige qué cabe; al terminar hay algo que ya funciona.' },
                { titulo: 'Junta diaria', html: '15 minutos, de pie: ¿qué hice ayer?, ¿qué haré hoy?, ¿qué me estorba?' },
                { titulo: 'Revisión y retrospectiva', html: 'Al final del sprint: se le enseña al cliente lo hecho (<b>revisión</b>) y el equipo platica qué mejorar (<b>retrospectiva</b>).' }
              ] },
              { tipo: 'lab', lab: 'sprint', titulo: 'Planea tu primer sprint', texto: '<ol><li>Toca las tareas del backlog para meterlas al sprint. No te pases de <b>13 puntos</b>.</li><li>Recuerda: lo de arriba es lo más importante.</li><li>Presiona <b>Empezar el sprint</b> y mira el tablero y la gráfica avanzar día por día.</li></ol>',
                metas: [
                  { t: 'Mete lo más importante: «Ver el menú» y «Hacer un pedido»', ok: c => c.hubo('sprint', e => e.top) },
                  { t: 'Termina el sprint sin dejar nada a medias', ok: c => c.hubo('sprint', e => e.top && e.faltan === 0) }
                ] },
              { tipo: 'pregunta', texto: '¿Quién decide qué es lo más importante del backlog?', opciones: ['El Scrum Master', 'El Product Owner', 'El programador más rápido', 'Nadie, se elige al azar'], correcta: 1,
                explica: 'El Product Owner habla con el cliente y ordena el backlog por valor para el negocio.' },
              { tipo: 'pregunta', texto: '¿Qué pasa si el equipo mete más trabajo del que alcanza a hacer en el sprint?', opciones: ['Nada, trabajan más horas y ya', 'Quedan tareas sin terminar, y en la retrospectiva ajustan para el siguiente sprint', 'El sprint se alarga lo que haga falta', 'Se cancela el proyecto'], correcta: 1,
                explica: 'En Scrum la duración del sprint no se estira. Por eso hay que conocer la capacidad (velocidad) del equipo.' }
            ]
          }
        ]
      },
      {
        titulo: 'Requerimientos', desc: 'Entender bien qué quiere el cliente.',
        lecciones: [
          {
            id: 's7', titulo: 'Funcionales y no funcionales', pasos: [
              { tipo: 'explica', titulo: 'Lo que hace y cómo debe ser', texto:
                '<p>Un ' + T('requisito', 'requerimiento') + ' es algo que el sistema debe hacer o cumplir. Hay dos tipos:</p>' +
                '<div class="tres"><div><b>Funcional</b><span><b>Lo que hace</b> el sistema. Casi siempre es un verbo: «registrar un pedido», «calcular el total», «enviar un aviso».</span></div><div><b>No funcional</b><span><b>Cómo debe ser</b>: rápido, seguro, fácil, en qué celulares funciona, a qué horas está disponible.</span></div></div>' +
                '<p>Truco: si puedes decir «la app <b>permite</b>…», suele ser funcional. Si dices «la app <b>debe ser</b>…», suele ser no funcional.</p>' },
              { tipo: 'lab', lab: 'clasifica', titulo: 'La lista de Doña Mari', texto: '<p>Esto es lo que Doña Mari pidió. Separa los requisitos funcionales de los no funcionales.</p>',
                pregunta: '¿Qué tipo de requisito es?',
                grupos: [{ id: 'f', nombre: 'Funcional', desc: 'lo que hace' }, { id: 'n', nombre: 'No funcional', desc: 'cómo debe ser' }],
                items: [
                  { t: 'Registrar un pedido', g: 'f', por: 'Es una acción del sistema.' },
                  { t: 'Mostrar el menú con precios', g: 'f', por: 'Es algo que la app hace.' },
                  { t: 'Abrir en menos de 2 segundos', g: 'n', por: 'Habla de qué tan rápida debe ser.' },
                  { t: 'Funcionar en Android y en iPhone', g: 'n', por: 'Es una condición de portabilidad.' },
                  { t: 'Avisar al cliente cuando su pedido esté listo', g: 'f', por: 'Es una acción.' },
                  { t: 'Estar disponible de 7 a 22 h todos los días', g: 'n', por: 'Es una condición de disponibilidad.' },
                  { t: 'Cancelar un pedido', g: 'f', por: 'Es una acción.' },
                  { t: 'Que una persona mayor la use sin ayuda', g: 'n', por: 'Es usabilidad: cómo debe ser.' },
                  { t: 'Guardar las contraseñas cifradas', g: 'n', por: 'Es una condición de seguridad.' },
                  { t: 'Calcular el total a pagar', g: 'f', por: 'Es una acción.' }
                ],
                metas: [{ t: 'Separa todos los requisitos', ok: c => c.hubo('clasifica') }] },
              { tipo: 'pregunta', texto: '«La app debe ser rápida» es un <b>mal</b> requisito porque…', opciones: ['Es funcional', 'No se puede comprobar: ¿qué tan rápida?', 'Es demasiado corto', 'Las apps no pueden ser rápidas'], correcta: 1,
                explica: 'Un buen requisito es medible: «debe mostrar el menú en menos de 2 segundos» sí se puede probar.' }
            ]
          },
          {
            id: 's8', titulo: 'Historias de usuario', pasos: [
              { tipo: 'explica', titulo: 'Como… quiero… para…', texto:
                '<p>En los métodos ágiles, los requisitos se escriben como ' + T('historia', 'historias de usuario') + ': frases cortas desde el punto de vista de quien usa la app.</p>' +
                '<div class="ejemplo"><b>Como</b> cliente <b>quiero</b> ver el menú con fotos <b>para</b> elegir qué pedir.</div>' +
                '<div class="tres"><div><b>Como…</b><span>¿Quién lo pide? (cliente, Doña Mari, repartidor)</span></div><div><b>quiero…</b><span>¿Qué quiere hacer?</span></div><div><b>para…</b><span>¿Para qué le sirve? Esto ayuda a decidir si es importante.</span></div></div>' +
                '<p>Cada historia lleva <b>criterios de aceptación</b>: cómo sabremos que ya quedó. Ejemplo: «se ven todos los tamales con su precio y su foto».</p>' },
              { tipo: 'ordena', texto: 'Arma la historia de usuario de Doña Mari:', items: ['Como Doña Mari', 'quiero ver los pedidos del día', 'para saber cuántos tamales preparar'],
                explica: 'Primero quién, luego qué, al final para qué.' },
              { tipo: 'lab', lab: 'clasifica', titulo: '¿Está bien escrita?', texto: '<p>El equipo escribió estas historias. Decide cuáles están completas y cuáles necesitan arreglo.</p>',
                pregunta: '¿Es una buena historia de usuario?',
                grupos: [{ id: 'b', nombre: 'Está bien', desc: 'quién, qué y para qué' }, { id: 'm', nombre: 'Le falta algo' }],
                items: [
                  { t: 'Como cliente quiero ver el menú para elegir qué pedir', g: 'b', por: 'Tiene quién, qué y para qué.' },
                  { t: 'Hacer la base de datos', g: 'm', por: 'Es una tarea técnica: no dice quién lo necesita ni para qué.' },
                  { t: 'Como repartidor quiero ver la dirección en el mapa para llegar más rápido', g: 'b', por: 'Completa.' },
                  { t: 'Que esté bonito', g: 'm', por: 'No dice quién, y «bonito» no se puede comprobar.' },
                  { t: 'Como cliente quiero pagar con tarjeta para no llevar efectivo', g: 'b', por: 'Completa.' },
                  { t: 'Como cliente quiero', g: 'm', por: 'Está incompleta: falta qué quiere y para qué.' }
                ],
                metas: [{ t: 'Revisa todas las historias', ok: c => c.hubo('clasifica') }] },
              { tipo: 'pregunta', texto: 'Los <b>criterios de aceptación</b> sirven para…', opciones: ['Saber cuándo una historia ya quedó terminada', 'Elegir el color de la app', 'Cobrarle al cliente', 'Nada, son opcionales'], correcta: 0,
                explica: 'Sin criterios, cada quien entiende «terminado» de forma distinta.' }
            ]
          },
          {
            id: 's9', titulo: 'Verificar, validar y probar', pasos: [
              { tipo: 'explica', titulo: 'Dos preguntas distintas', texto:
                '<div class="tres"><div><b>Verificación</b><span>«¿Lo estamos construyendo <b>bien</b>?» Revisar que el código y los documentos cumplan lo que se especificó.</span></div><div><b>Validación</b><span>«¿Estamos construyendo <b>lo que el cliente quiere</b>?» Que Doña Mari lo pruebe y diga si le sirve.</span></div></div>' +
                '<p>Todo esto se escribe en el <b>documento de requerimientos (ERS)</b> y en el <b>plan de pruebas</b>. Cada <b>caso de prueba</b> dice: datos de entrada, pasos y resultado esperado.</p>' +
                '<div class="ejemplo"><b>Caso de prueba:</b> pedir 3 tamales de $15.<br><b>Pasos:</b> elegir tamal, poner 3, presionar «Pedir».<br><b>Resultado esperado:</b> el total dice $45.</div>' },
              { tipo: 'lab', lab: 'clasifica', titulo: '¿Verificar o validar?', texto: '<p>Clasifica cada actividad.</p>',
                pregunta: '¿Es verificación o validación?',
                grupos: [{ id: 'v', nombre: 'Verificación', desc: '¿lo hacemos bien?' }, { id: 'a', nombre: 'Validación', desc: '¿es lo que quiere?' }],
                items: [
                  { t: 'Revisar que el código siga el diseño', g: 'v', por: 'Se compara contra lo especificado.' },
                  { t: 'Doña Mari prueba la app y dice si es lo que quería', g: 'a', por: 'El cliente confirma que le sirve.' },
                  { t: 'Comprobar que el total sume bien', g: 'v', por: 'Se revisa contra el requisito «calcular el total».' },
                  { t: 'Preguntar a clientes reales si entienden cómo pedir', g: 'a', por: 'Se valida con usuarios de verdad.' },
                  { t: 'Revisar que no haya requisitos contradictorios', g: 'v', por: 'Es revisar el documento.' },
                  { t: 'Enseñar la app al cliente al final del sprint', g: 'a', por: 'La revisión con el cliente es validación.' }
                ],
                metas: [{ t: 'Clasifica todas las actividades', ok: c => c.hubo('clasifica') }] },
              { tipo: 'pregunta', texto: 'Un buen caso de prueba incluye…', opciones: ['Solo el nombre de quien prueba', 'Datos de entrada, pasos y el resultado esperado', 'El código completo', 'La fecha de entrega'], correcta: 1,
                explica: 'Si no sabes qué resultado esperar, no puedes decir si la prueba pasó o falló.' }
            ]
          }
        ]
      },
      {
        titulo: 'Análisis y diseño', desc: 'Los planos del software: UML y arquitectura.',
        lecciones: [
          {
            id: 's10', titulo: 'Casos de uso', pasos: [
              { tipo: 'explica', titulo: '¿Quién hace qué con el sistema?', texto:
                '<p>Un ' + T('casoUso', 'diagrama de casos de uso') + ' (de UML) es un dibujo sencillo que muestra:</p>' +
                '<div class="tres"><div><b>Actores</b><span>Los monitos: quienes usan el sistema (cliente, Doña Mari, repartidor). También puede ser otro sistema, como el banco.</span></div><div><b>Casos de uso</b><span>Los óvalos: cada cosa que un actor hace con el sistema («Hacer pedido»).</span></div><div><b>El sistema</b><span>Un rectángulo que encierra los casos de uso. Los actores quedan afuera.</span></div></div>' },
              { tipo: 'lab', lab: 'clasifica', titulo: 'Arma el diagrama', texto: '<p>Para cada acción, elige qué actor la hace. Al terminar verás tu diagrama de casos de uso dibujado.</p>', diagrama: 'casos',
                pregunta: '¿Quién hace esto en la app?',
                grupos: [{ id: 'cli', nombre: 'Cliente' }, { id: 'mari', nombre: 'Doña Mari' }, { id: 'rep', nombre: 'Repartidor' }],
                items: [
                  { t: 'Ver el menú', g: 'cli', por: 'El cliente lo usa para elegir.' },
                  { t: 'Hacer un pedido', g: 'cli', por: 'El cliente pide.' },
                  { t: 'Pagar', g: 'cli', por: 'Quien compra, paga.' },
                  { t: 'Cambiar precios', g: 'mari', por: 'Solo la dueña puede cambiarlos.' },
                  { t: 'Ver pedidos del día', g: 'mari', por: 'Doña Mari los necesita para cocinar.' },
                  { t: 'Marcar pedido entregado', g: 'rep', por: 'Lo hace quien entrega.' },
                  { t: 'Ver dirección de entrega', g: 'rep', por: 'El repartidor necesita saber a dónde ir.' }
                ],
                metas: [{ t: 'Asigna cada caso de uso a su actor', ok: c => c.hubo('clasifica') }] },
              { tipo: 'pregunta', texto: 'En un diagrama de casos de uso, los <b>óvalos</b> representan…', opciones: ['A los usuarios', 'Las acciones que se pueden hacer con el sistema', 'Las tablas de la base de datos', 'Los errores'], correcta: 1,
                explica: 'Los monitos son los actores; los óvalos, los casos de uso.' }
            ]
          },
          {
            id: 's11', titulo: 'Clases y objetos', pasos: [
              { tipo: 'explica', titulo: 'El molde y las galletas', texto:
                '<p>En el análisis orientado a objetos, todo se piensa como «cosas» del mundo real. Una ' + T('clase', 'clase') + ' es como un <b>molde de galletas</b>; cada galleta que sale es un <b>objeto</b>.</p>' +
                '<div class="uml-clase"><div class="uml-n">Pedido</div><div class="uml-a">fecha<br>total<br>estado</div><div class="uml-m">calcularTotal()<br>cancelar()</div></div>' +
                '<p>Así se dibuja en UML: arriba el nombre, en medio los <b>atributos</b> (lo que el pedido <b>tiene</b> o sabe) y abajo los <b>métodos</b> (lo que <b>hace</b>). «El pedido de Juan del 18 de octubre» es un objeto de la clase Pedido.</p>' },
              { tipo: 'lab', lab: 'clasifica', titulo: '¿Atributo o método?', texto: '<p>Estamos diseñando las clases <b>Pedido</b> y <b>Tamal</b>. Separa lo que tienen de lo que hacen.</p>',
                pregunta: '¿Es algo que tiene o algo que hace?',
                grupos: [{ id: 'a', nombre: 'Atributo', desc: 'lo que tiene' }, { id: 'm', nombre: 'Método', desc: 'lo que hace' }],
                items: [
                  { t: 'sabor', g: 'a', por: 'Es un dato del tamal.' },
                  { t: 'precio', g: 'a', por: 'Es un dato.' },
                  { t: 'calcularTotal()', g: 'm', por: 'Es una acción (y lleva paréntesis).' },
                  { t: 'fecha', g: 'a', por: 'Es un dato del pedido.' },
                  { t: 'cancelar()', g: 'm', por: 'Es una acción.' },
                  { t: 'agregarTamal()', g: 'm', por: 'Es una acción.' },
                  { t: 'estado', g: 'a', por: 'Es un dato: pendiente, listo, entregado.' },
                  { t: 'avisarCliente()', g: 'm', por: 'Es una acción.' }
                ],
                metas: [{ t: 'Separa atributos y métodos', ok: c => c.hubo('clasifica') }] },
              { tipo: 'pregunta', texto: '«El pedido de Juan del 18 de octubre» es…', opciones: ['Una clase', 'Un objeto', 'Un método', 'Un actor'], correcta: 1,
                explica: 'Es un pedido concreto, hecho con el molde «Pedido». Por eso es un objeto.' }
            ]
          },
          {
            id: 's12', titulo: 'La arquitectura en capas', pasos: [
              { tipo: 'explica', titulo: 'Como un restaurante', texto:
                '<p>El <b>diseño arquitectónico</b> decide las grandes piezas del sistema. Una forma muy común es separar en <b>3 capas</b>, como un restaurante:</p>' +
                '<div class="tres"><div><b>Interfaz (presentación)</b><span>El <b>mesero</b>: lo que el usuario ve y toca. Pantallas y botones.</span></div><div><b>Lógica (negocio)</b><span>La <b>cocina</b>: las reglas. Calcular el total, revisar si hay tamales.</span></div><div><b>Datos</b><span>La <b>alacena</b>: donde se guarda todo. La base de datos.</span></div></div>' +
                '<p>Separarlas ayuda a la mantenibilidad: puedes cambiar el diseño de las pantallas sin tocar la cocina.</p>' },
              { tipo: 'lab', lab: 'clasifica', titulo: '¿En qué capa va?', texto: '<p>Acomoda cada pieza de la app de Doña Mari en su capa.</p>',
                pregunta: '¿En qué capa va?',
                grupos: [{ id: 'i', nombre: 'Interfaz', desc: 'el mesero' }, { id: 'l', nombre: 'Lógica', desc: 'la cocina' }, { id: 'd', nombre: 'Datos', desc: 'la alacena' }],
                items: [
                  { t: 'El botón «Pedir»', g: 'i', por: 'El usuario lo ve y lo toca.' },
                  { t: 'Calcular el total con descuento', g: 'l', por: 'Es una regla del negocio.' },
                  { t: 'La tabla de clientes guardada', g: 'd', por: 'Es información almacenada.' },
                  { t: 'La pantalla del menú', g: 'i', por: 'Es lo que se muestra.' },
                  { t: 'Revisar si quedan tamales de rajas', g: 'l', por: 'Es una regla: decide si se puede vender.' },
                  { t: 'El historial de pedidos guardado', g: 'd', por: 'Es información almacenada.' }
                ],
                metas: [{ t: 'Acomoda todas las piezas', ok: c => c.hubo('clasifica') }] },
              { tipo: 'pregunta', texto: 'Una buena <b>interfaz de usuario</b>…', opciones: ['Cambia de lugar los botones en cada pantalla para que sea divertida', 'Es consistente: los botones se ven y funcionan igual en todas las pantallas', 'Tiene la mayor cantidad posible de botones', 'Usa letras muy pequeñas para que quepa más'], correcta: 1,
                explica: 'La consistencia hace que el usuario aprenda una vez y ya no se pierda. Es uno de los principios del diseño de interfaces.' }
            ]
          }
        ]
      }
    ]
  };

  root.CAMINO.cursos.push(is);
})(window);
