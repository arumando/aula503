/* Explicaciones desde cero: Ingeniería de Software I */
window.AULA = window.AULA || { materias: [], juegos: [] };
AULA.facil = AULA.facil || {};
AULA.intro = AULA.intro || {};
AULA.intro.is = 'Hacer un programa grande no es solo sentarse a programar. Primero hay que entender qué necesita la gente, ponerlo por escrito, planear cómo se va a construir y dibujarlo antes de escribir código, igual que un arquitecto hace planos antes de construir una casa. Esta materia te enseña esa parte: las formas de organizar un proyecto, cómo sacar y escribir los requerimientos, y cómo diseñar con diagramas. Durante el semestre vas a armar un proyecto real que continúa en Ingeniería de Software II.';
Object.assign(AULA.facil, {
'is:1.1': `**Programar** es escribir código que funcione. **La ingeniería de software** es todo lo que rodea a eso para que un programa grande salga bien: entender qué se necesita, planear, diseñar, programar, probar y darle mantenimiento por años.

Piénsalo así: cualquiera puede poner ladrillos, pero para construir un edificio necesitas un ingeniero, planos, presupuesto y un orden.

La definición oficial (del IEEE) dice que es aplicar un enfoque **sistemático** (con un método), **disciplinado** (con orden) y **cuantificable** (que se puede medir) al desarrollo de software.

Otra idea importante: el **software no es solo el código**. También incluye los **datos de configuración** y la **documentación** (los manuales).

Pressman, un autor famoso, dice que la ingeniería de software se apoya en cuatro capas. La base de todo es el **compromiso con la calidad**; encima van el proceso, los métodos y las herramientas.`,

'is:1.2': `En los años 60 y 70 los proyectos de software eran un desastre: se **tardaban más** de lo prometido, **costaban más** y salían **llenos de errores**. A eso se le llamó la **crisis del software**.

En **1968**, en una reunión de la **OTAN** en Alemania, se propuso tratar el software como se trata una ingeniería: con método y disciplina. Ahí se popularizó el nombre "ingeniería de software".

Desde entonces han ido apareciendo formas de trabajar:
- **1970**: el modelo en **cascada**, hacer todo por etapas, una tras otra.
- **1997**: **UML**, un "idioma" de dibujos para diseñar programas.
- **2001**: el **Manifiesto Ágil**, que propone trabajar en entregas pequeñas y aceptar cambios.
- Hoy: DevOps, la nube y programar con ayuda de IA.

La ingeniería de software se relaciona con otras áreas: computación, administración de proyectos, matemáticas y hasta psicología (para que los programas sean fáciles de usar).`,

'is:1.3': `El software es distinto a las cosas físicas:

- **Se desarrolla, no se fabrica.** Lo caro es crearlo. Una vez hecho, copiarlo cuesta casi nada.
- **No se desgasta, pero sí se deteriora.** Una silla se gasta con el uso. Un programa no, pero **cada vez que lo cambias** pueden aparecer errores nuevos y se vuelve más desordenado.
- **No se puede tocar**, así que es difícil ver cuánto falta para terminarlo.

Hay una gráfica famosa de fallas:
- El **hardware** sigue una curva de "**bañera**": falla mucho al principio (defectos de fábrica), poco a mitad de su vida y mucho al final (desgaste).
- El **software** idealmente fallaría mucho al principio y luego casi nada. Pero en la realidad, **cada cambio** provoca un "pico" de errores, y con el tiempo la cantidad base de errores va subiendo.

Por eso un programa que se usa necesita cambiar, pero esos cambios hay que hacerlos con cuidado.`,

'is:1.4': `¿Cómo sabemos si un programa es de buena calidad? La norma internacional **ISO/IEC 25010** (parte de una familia llamada **SQuaRE**) lo divide en **8 características**:

1. **Adecuación funcional**: ¿hace lo que tiene que hacer, completo y sin errores?
2. **Eficiencia**: ¿es rápido y no gasta recursos de más?
3. **Compatibilidad**: ¿funciona junto con otros programas?
4. **Usabilidad**: ¿es fácil de aprender y de usar?
5. **Fiabilidad**: ¿funciona sin fallar y se recupera si algo sale mal?
6. **Seguridad**: ¿protege los datos de quien no debe verlos?
7. **Mantenibilidad**: ¿es **fácil de modificar y de probar**?
8. **Portabilidad**: ¿se puede pasar a otra computadora o sistema?

Ejemplo con una app de la escuela: "carga en menos de 3 segundos" es eficiencia; "un alumno nuevo la aprende a usar en 5 minutos" es usabilidad; "solo tú puedes ver tus calificaciones" es seguridad.`,

'is:1.5': `Un **proceso de software** es el **orden de pasos** que sigue un equipo para hacer un programa. Como una receta, aunque se adapta a cada proyecto.

Según Sommerville, todo proceso tiene 4 actividades básicas:
1. **Especificación**: decidir **qué** debe hacer el programa.
2. **Diseño e implementación**: planearlo y programarlo.
3. **Validación**: comprobar que hace lo que el cliente quería.
4. **Evolución**: cambiarlo cuando cambian las necesidades.

Hay tareas que acompañan **todo** el proyecto de principio a fin. Se llaman **actividades sombrilla**: cuidar riesgos, revisar la calidad, medir el avance y llevar el control de versiones (gestión de la configuración).

Después de entregarlo viene el **mantenimiento**, que suele ser la etapa más larga. Hay cuatro tipos:
- **Correctivo**: arreglar errores.
- **Adaptativo**: ajustarlo a un **ambiente nuevo** (una nueva versión de Android, por ejemplo).
- **Perfectivo**: agregar mejoras que pide el usuario.
- **Preventivo**: ordenar el código para evitar problemas futuros.`,

'is:1.6': `Así como un carpintero usa martillo y serrucho, quien hace software usa herramientas. A las que ayudan en el proceso se les llama **herramientas CASE**.

Las que vas a usar:
- **StarUML**: para **dibujar diagramas** del programa antes de hacerlo. Ya lo tienes instalado. Como ayuda en las etapas de análisis y diseño, se le llama herramienta **Upper CASE** ("de alto nivel").
- **Figma**: para **dibujar las pantallas** de una app antes de programarla (prototipos).
- **Git**: guarda el historial de cambios de tu código, como un "control de versiones". Si algo se rompe, puedes regresar a una versión anterior. **GitHub** es la página donde se guardan esos proyectos en internet.
- **VS Code**: para escribir código.
- **Trello** o **Jira**: para organizar las tareas del equipo.

Las herramientas para programar y probar (más cerca del código) se llaman **Lower CASE**.`,

'is:2.1': `Un **modelo de proceso** es una **forma de organizar** cómo se va a hacer el software: qué pasos, en qué orden, qué se entrega y quién hace qué. Como elegir si vas a cocinar siguiendo la receta al pie de la letra o probando y ajustando sobre la marcha.

Hay dos grandes estilos:

**Dirigido por un plan**: todo se planea al inicio y se sigue el plan. Mucha documentación. Cambiar algo a medio camino es caro. Bueno cuando los requisitos están claros, o cuando un error es muy grave (sistemas de un hospital o de aviones).

**Ágil**: se planea poco a poco y se entrega en partes pequeñas. El avance se mide con **software que ya funciona**. Se aceptan cambios. Bueno cuando no está claro lo que se quiere y el cliente puede revisar seguido.

Para elegir, piensa en: ¿qué tan claro está lo que se quiere? ¿qué tan grande es el equipo? ¿qué tan grave sería un error? ¿el cliente puede revisar seguido?`,

'is:2.2': `**Cascada** (lo propuso Winston **Royce** en 1970): se hace todo **por etapas, una tras otra**, como el agua que cae de escalón en escalón y no regresa:

Requerimientos → Análisis → Diseño → Programación → Pruebas → Instalación → Mantenimiento

- Ventaja: es simple y ordenado.
- Desventaja principal: **el cliente ve el programa hasta el final**. Si entendiste mal algo al principio, lo descubres cuando ya está todo hecho y arreglarlo cuesta muchísimo.
- Sirve cuando los requisitos están muy claros y no van a cambiar.

**Modelo en V**: es como la cascada, pero cada etapa de planeación tiene su **prueba correspondiente**, formando una V:
- Los **requerimientos** se comprueban con las **pruebas de aceptación** (el cliente revisa que es lo que pidió).
- El diseño del sistema, con las pruebas de sistema.
- El diseño de cada pieza, con las pruebas unitarias.

La idea es planear las pruebas **desde el principio**.`,

'is:2.3': `**Modelo incremental**: en vez de entregar todo al final, se entrega el programa **por partes que ya funcionan**. Cada parte se llama **incremento**.

Ejemplo, una app de la cafetería:
1. Primera entrega: ver el menú y hacer pedidos (lo **esencial**, llamado el **núcleo**).
2. Segunda: pagar desde la app.
3. Tercera: avisar cuando el pedido está listo.

Ventaja: el cliente usa algo útil desde muy pronto y se pueden hacer cambios entre entregas.

**DRA** (Desarrollo Rápido de Aplicaciones): es un modelo incremental que busca hacer todo **muy rápido**, en ciclos de unos **60 a 90 días**. Para lograrlo:
- Reutiliza piezas ya hechas.
- Pone a **varios equipos a trabajar al mismo tiempo**, cada uno en una parte.

No funciona si el sistema no se puede dividir en partes, ni cuando se usa tecnología nueva y riesgosa.`,

'is:2.4': `Los modelos **evolutivos** hacen el programa en versiones que van **mejorando poco a poco**.

**Prototipos**: cuando el cliente **no sabe bien lo que quiere**, le haces una versión rápida (un borrador, a veces solo dibujos de pantallas) para que la vea y diga "esto sí, esto no". Con eso se aclaran los requisitos.
- **Desechable**: se usa para aclarar ideas y se tira.
- **Evolutivo**: se sigue mejorando hasta volverse el programa final.

**Espiral** (de Barry **Boehm**): el proyecto da vueltas, y en cada vuelta se hace lo mismo:
1. Decidir los objetivos.
2. **Analizar los riesgos**: ¿qué podría salir mal? ¿cómo lo evitamos?
3. Construir y probar.
4. Planear la siguiente vuelta.
Su gran aporte es **pensar en los riesgos** en cada vuelta. Sirve para proyectos grandes y riesgosos.

**Concurrente**: varias actividades pasan **al mismo tiempo**, y cada una tiene un estado (en espera, en desarrollo, terminada…). Un **evento**, como un cambio pedido por el cliente, hace que cambien de estado.`,

'is:2.5': `El **Proceso Unificado** (UP, y su versión comercial **RUP**) es una forma de trabajar muy ligada a los diagramas **UML**.

Tres ideas lo definen:
- Está **guiado por casos de uso**: las descripciones de lo que el usuario hace con el sistema guían todo el trabajo.
- Se centra en la **arquitectura** (la estructura general del programa).
- Es **iterativo**: se hace en vueltas cortas que van agregando partes.

Tiene **4 fases**:
1. **Inicio**: ¿qué queremos hacer y vale la pena?
2. **Elaboración**: entender bien el problema y **dejar lista la estructura base** del sistema (la arquitectura).
3. **Construcción**: programar la mayor parte.
4. **Transición**: **entregarlo a los usuarios**, hacer pruebas finales y capacitarlos.

Truco para recordar el orden: **I-E-C-T** ("Ir En Camión Temprano").`,

'is:2.6': `Las **metodologías ágiles** nacieron en 2001 con el **Manifiesto Ágil**. Valoran más:
- Las **personas** y su comunicación, que los procesos.
- El **software que funciona**, que la documentación larga.
- **Colaborar con el cliente**, que pelear contratos.
- **Adaptarse a los cambios**, que seguir un plan rígido.

**Scrum** es la más usada. Se trabaja en **sprints**: periodos de 1 a 4 semanas donde se termina algo usable.
- Roles: el **Product Owner** decide **qué es más importante** hacer (ordena la lista de pendientes); el **Scrum Master** ayuda al equipo y quita obstáculos; los **Developers** construyen.
- Reuniones: planear el sprint, una junta **diaria de 15 minutos** (Daily Scrum), mostrar lo hecho (Review) y platicar cómo mejorar (**Retrospectiva**).
- Listas: **Product Backlog** (todo lo pendiente) y Sprint Backlog (lo de este sprint).

**XP** (Programación Extrema): programar **en parejas** y escribir primero la prueba y luego el código (**TDD**).

**DSDM**: prioriza con **MoSCoW**: **M**ust (debe tener), **S**hould (debería), **C**ould (**podría**, si hay tiempo) y **W**on't (esta vez no).`,

'is:2.7': `Los **métodos formales** usan **matemáticas** para describir exactamente qué debe hacer un programa, y después **demostrar** que lo hace.

¿Por qué? Porque el español es ambiguo: "el sistema debe ser rápido" se puede entender de muchas formas. Una fórmula matemática solo se entiende de una.

Ejemplo sencillo de la idea: "solo puedes inscribirte si hay cupo" se escribe con símbolos como "inscritos < cupo".

Ventajas: eliminan dudas y encuentran errores antes de programar.
Desventajas: son **caros, lentos** y requieren saber bastantes matemáticas.

Por eso se usan sobre todo en **sistemas críticos**, donde un error puede costar vidas: aviones, trenes, aparatos médicos.

Un modelo relacionado es **sala limpia** (cleanroom), creado en IBM: busca **cero defectos** verificando el programa con matemáticas en vez de corregir errores después.`,

'is:2.8': `Otras formas de trabajar que conviene conocer:

- **Basado en componentes**: armar el programa juntando **piezas ya hechas**, como armar con LEGO.
- **Kanban**: un **tablero** con columnas (Por hacer → Haciendo → Hecho) y tarjetas que se mueven. La regla clave: **limitar cuántas tareas puede haber "haciéndose" al mismo tiempo** (límite **WIP**), para no empezar mil cosas y no terminar ninguna. Trello es un buen ejemplo.
- **DevOps**: unir a los que programan con los que mantienen los servidores, y **automatizar** las pruebas y la publicación del programa. A esto se le llama **CI/CD** (integración y entrega continua).
- **CMMI**: una escala de 5 niveles que mide qué tan madura y ordenada es una empresa para hacer software.
- **MoProSoft**: un modelo de procesos **creado en México** para empresas pequeñas de software.`,

'is:3.1': `Un **requerimiento** es algo que **el sistema debe hacer** o **una condición que debe cumplir**. Por ejemplo: "el alumno podrá ver sus calificaciones".

La **ingeniería de requerimientos** es el trabajo de **descubrir, escribir y revisar** esos requerimientos. Tiene 4 pasos:
1. **Estudio de viabilidad**: ¿vale la pena hacer el sistema?
2. **Obtención**: platicar con la gente para descubrir qué necesita.
3. **Especificación**: escribirlo de forma clara.
4. **Validación**: revisar que lo escrito es lo que de verdad necesitan.

¿Por qué importa tanto? Porque **un error en los requerimientos que se descubre cuando el programa ya está hecho cuesta muchísimo más** que corregirlo al principio. Es como darte cuenta de que la casa necesitaba tres cuartos cuando ya está construida.

**Trazabilidad**: poder seguir cada requerimiento desde quién lo pidió hasta qué parte del código y qué prueba lo cumplen. Se hace con una tabla llamada matriz de trazabilidad.

Tienes un PDF de apoyo en tu carpeta: "Unidad III Especificación de requerimientos".`,

'is:3.2': `Antes de construir un sistema hay que preguntarse: **¿vale la pena?** Eso es el **estudio de viabilidad**.

Se revisa desde varios ángulos:
- **Técnica**: ¿existe la tecnología y el equipo sabe usarla?
- **Económica**: ¿lo que se gana es más que lo que cuesta?
- **Operativa**: ¿**la gente sí lo va a usar**? ¿encaja con su forma de trabajar?
- **Legal**: ¿cumple las leyes, como la de datos personales?
- **De tiempo**: ¿se alcanza a terminar en el plazo?

Al final se entrega un informe que recomienda: **seguir, cambiar el plan o cancelar**.

Una cuenta sencilla de economía: si el sistema cuesta $60 000 y cada año ahorra $20 000, se recupera la inversión en 60 000 ÷ 20 000 = **3 años**.`,

'is:3.3': `Hay tres tipos de requerimientos:

- **Funcionales**: **lo que el sistema hace**. "El alumno podrá descargar su boleta." "El sistema enviará un correo al registrar un pedido."
- **No funcionales**: **cómo debe ser** el sistema: qué tan rápido, seguro o fácil de usar. "La página cargará en menos de **3 segundos**." Deben poder **medirse**: "rápido" no sirve; "menos de 3 segundos" sí.
- **De dominio**: reglas que vienen **del tema** del sistema. En un sistema escolar: "la calificación mínima aprobatoria es 6".

Un **stakeholder** (interesado) es **cualquier persona afectada por el sistema o que puede influir en él**: los usuarios, el cliente que paga, el director, los profesores, hasta el gobierno.

¿Cómo se descubren los requerimientos?
- **Entrevistas**: preguntarle directamente a la gente.
- **Cuestionarios**: para muchas personas.
- **Observación**: ver cómo trabajan de verdad, porque a veces la gente hace cosas que no menciona.
- **Prototipos**: mostrar dibujos de pantallas.`,

'is:3.4': `Una vez que sabes qué se necesita, hay que **escribirlo** bien.

**Reglas para escribir requerimientos**:
- Usa la forma: "El sistema **deberá** + acción". Ej.: "El sistema deberá mostrar las calificaciones del alumno."
- **Una idea** por requerimiento.
- Evita palabras que se prestan a dudas: "rápido", "**amigable**", "fácil", "etc.". No se pueden medir.

**Diagrama de casos de uso**: un dibujo sencillo de **quién usa el sistema y para qué**:
- **Actor** (monito): quien usa el sistema, como "Alumno".
- **Caso de uso** (óvalo): algo que hace, con verbo: "Consultar calificaciones".
- **«include»**: un caso **siempre** usa a otro. "Pagar" siempre incluye "Validar tarjeta".
- **«extend»**: un caso **a veces, opcionalmente**, agrega algo. "Aplicar cupón" extiende a "Pagar".

**Documentar un caso de uso** (tu plantilla de la carpeta): nombre, descripción, **precondiciones** (lo que **debe cumplirse antes** de empezar, como "haber iniciado sesión"), los pasos normales, qué pasa si algo falla y cómo queda todo al final (postcondiciones).`,

'is:3.5': `Antes de construir, hay que **revisar** que los requerimientos estén bien. Hay dos preguntas distintas:

- **Validación**: ¿estamos construyendo **el producto correcto**? O sea, ¿es lo que el cliente **realmente necesita**?
- **Verificación**: ¿estamos construyendo **el producto correctamente**? O sea, ¿está bien escrito y sin errores?

Truco: **validar = lo que quiere el cliente**; **verificar = que esté bien hecho**.

Qué se revisa en cada requerimiento:
- **Consistencia**: que no haya dos requerimientos que **se contradigan** ("se pueden borrar pedidos" y "nunca se borra un pedido").
- **Completitud**: que no falte nada.
- **Verificable**: que **se pueda comprobar con una prueba**. "Debe ser bonito" no se puede probar.
- **Sin ambigüedad**: que solo se entienda de una forma.

Cómo se revisa: leyéndolos en equipo con el cliente, mostrando prototipos o tratando de escribir una prueba para cada uno.`,

'is:3.6': `Casi siempre la gente **pide más de lo que se puede hacer** y a veces pide cosas **opuestas**. Por eso hay que **negociar**.

El modelo **Win-Win** ("ganar-ganar") de Boehm busca que **todos queden satisfechos**:
1. Identificar a las personas clave.
2. Averiguar qué necesita cada una para sentirse satisfecha.
3. Llegar a un acuerdo.

Formas de decidir qué va primero:
- **MoSCoW**: debe, debería, podría, esta vez no.
- **Repartir 100 puntos**: cada persona reparte 100 puntos entre los requerimientos; ganan los que más juntan.
- **Modelo Kano**: hay cosas **básicas** (si faltan, molestan), de **desempeño** (más es mejor) y de **deleite** (no las esperabas y te encantan).

Si hay un conflicto: volver a pensar en el objetivo principal, buscar una opción intermedia, o **dejar algo para una versión posterior**.`,

'is:3.7': `Todos los requerimientos se juntan en un documento oficial llamado **ERS** (Especificación de Requerimientos de Software), o **SRS** en inglés.

Es "el contrato" de lo que se va a construir: el cliente lo revisa para confirmar que lo entendieron, y los programadores lo usan para saber qué hacer.

La forma clásica de organizarlo viene del estándar **IEEE 830** (hoy actualizado como ISO/IEC/IEEE 29148):
1. **Introducción**: para qué es el documento, qué abarca el sistema, glosario de palabras.
2. **Descripción general**: qué hace el sistema a grandes rasgos y quiénes lo usarán.
3. **Requerimientos específicos**: aquí van **todos los requerimientos funcionales** y no funcionales, uno por uno.
4. Anexos.

Una buena ERS es: correcta, sin ambigüedades, completa, sin contradicciones, comprobable y **fácil de modificar**.

Tu plantilla de la carpeta sigue una estructura parecida.`,

'is:3.8': `Un **plan de pruebas** dice **qué se va a probar, cómo y cuándo**, para comprobar que el sistema hace lo que debe.

La norma internacional de pruebas es la **ISO/IEC/IEEE 29119**. Su **parte 3** trata de los **documentos** de prueba (plantillas).

Tus 4 formatos de la carpeta siguen el proceso en orden:
1. **Planeación** de la prueba.
2. **Diseño** de los casos de prueba.
3. **Ejecución** (hacer las pruebas y anotar resultados).
4. **Informe final**.

Un **caso de prueba de aceptación** revisa que el sistema cumple **desde el punto de vista del usuario**. Se sacan de los **casos de uso**. Tiene: qué se necesita antes, qué datos se meten, los pasos y el **resultado esperado**.

Un truco para probar: los **valores límite**. Si una calificación válida va de 0 a 10, prueba justo en las orillas: **-0.1, 0, 10 y 10.1**. Ahí es donde más se esconden los errores.`,

'is:4.1': `Dos palabras que vas a usar mucho:

- **Análisis**: entender **qué** debe hacer el sistema. Se habla con palabras del problema: alumno, materia, calificación.
- **Diseño**: decidir **cómo** se va a construir: qué partes tendrá, qué base de datos, qué pantallas.

Ejemplo con una casa: el análisis es "necesito 3 recámaras y un baño"; el diseño es el plano con medidas y materiales.

Hay dos formas de analizar:
- **Estructurada**: ve el sistema como **procesos que transforman datos**.
- **Orientada a objetos**: ve el sistema como **objetos que colaboran** (un Alumno, una Materia).

Para dibujar todo esto se usa **UML**, un "idioma de dibujos" con 14 tipos de diagramas en dos grupos:
- **Estructurales** (cómo está hecho): clases, objetos, paquetes, despliegue…
- **De comportamiento** (qué hace y en qué orden): casos de uso, actividades, estados y **secuencia**.`,

'is:4.2': `**Diagrama de flujo de datos (DFD)**: muestra **por dónde viaja la información** y dónde se transforma. Usa 4 figuras:
- **Rectángulo**: alguien de afuera que manda o recibe datos (Alumno).
- **Círculo**: un proceso que hace algo con los datos (Registrar inscripción).
- **Flecha**: los datos que se mueven.
- **Dos líneas paralelas**: un **almacén**, donde se guardan datos (lista de alumnos).

El dibujo más general se llama **diagrama de contexto**: todo el sistema como **un solo círculo**, con las personas de afuera a su alrededor. Luego se va detallando.

**Modelo entidad-relación**: el plano de la **base de datos**.
- **Entidad**: algo de lo que guardas datos (Alumno, Materia).
- **Atributo**: un dato (nombre, matrícula).
- **Relación**: cómo se conectan (un Alumno cursa Materias).

Cuando muchos alumnos llevan muchas materias (relación **muchos a muchos**), se crea una **tabla intermedia** (Inscripción) que conecta a las dos.`,

'is:4.3': `**Diagrama de clases**: muestra las "cosas" del sistema y cómo se relacionan. Cada clase es una cajita con su nombre y sus datos: Alumno (matrícula, nombre).

Las líneas entre clases llevan números que dicen **cuántos**: 1 (uno), 0..1 (cero o uno), * (muchos) y 1..* (**uno o más**).

Relaciones especiales:
- **Herencia** (flecha con triángulo): Alumno y Profesor "son" Personas.
- **Agregación** (rombo vacío): "tiene", pero las partes pueden existir solas. Un grupo tiene alumnos; si desaparece el grupo, los alumnos siguen existiendo.
- **Composición** (**rombo relleno**): las partes **no existen sin el todo**. Si borras un pedido, se borran sus renglones.

**Diagrama de objetos**: una "foto" con ejemplos reales: el alumno Ana con matrícula 2023001.

**Diagrama de estados**: las etapas por las que pasa algo. Un pedido: Pendiente → Pagado → Enviado → Entregado. En las flechas se escribe **evento [condición] / acción**. Lo que va entre corchetes es la **condición** que debe cumplirse.`,

'is:4.4': `La **arquitectura** es la estructura general del programa: sus partes grandes y cómo se conectan. Como el esqueleto.

Estilos comunes:
- **Capas**: cada capa solo habla con la de abajo (pantallas → reglas → base de datos).
- **Cliente-servidor**: una app pide y un servidor responde.
- **Microservicios**: muchos programas pequeños que trabajan juntos.

**MVC** (Modelo-Vista-Controlador) es el más usado en apps y páginas:
- **Modelo**: los datos y las reglas.
- **Vista**: lo que ves en la pantalla.
- **Controlador**: **recibe lo que haces** (un clic), le pide al modelo los datos y elige qué vista mostrar.
Es como un restaurante: la Vista es el menú y el plato, el **Controlador es el mesero** que toma tu pedido, y el Modelo es la cocina.

**Diagrama de despliegue**: muestra **en qué computadoras** se instala cada parte. Cada computadora o servidor se dibuja como un **cubo** (se llama **nodo**).

**Artefacto**: un archivo real que sale del desarrollo, como un **.apk** (app de Android) o un .jar.`,

'is:4.5': `Un buen diseño divide el programa en **módulos** (partes) y busca dos cosas:
- **Alta cohesión**: cada módulo hace **una sola cosa** y la hace bien.
- **Bajo acoplamiento**: los módulos **dependen poco** unos de otros, así que cambiar uno no descompone a los demás.

Regla de oro: **alta cohesión, bajo acoplamiento**.

Diagramas de esta etapa:
- **Paquetes**: carpetas que agrupan partes del programa.
- **Clases de diseño**: como el diagrama de clases, pero con más detalle. Usa símbolos para decir quién puede ver cada dato: **+ público** (todos) y **− privado** (solo la propia clase).
- **Secuencia**: quién le habla a quién y **en qué orden**, de arriba hacia abajo. Para mostrar un "si pasa esto haz aquello, si no lo otro" se usa un recuadro llamado **alt**.
- **Actividades**: como un diagrama de flujo de un proceso. Se divide en columnas llamadas **carriles** para mostrar **quién** hace cada paso (el usuario, el sistema).`,

'is:4.6': `La **interfaz** es todo lo que el usuario ve y toca: pantallas, botones, menús.

Se diseña así: entender a los usuarios → dibujar pantallas → hacer un **prototipo** (en Figma) → **probarlo con gente real** → mejorar.

Formas de interactuar:
- **Manipulación directa**: tocar o arrastrar las cosas, como **arrastrar un archivo a la papelera**.
- **Menús**: elegir de una lista.
- **Formularios**: llenar campos.
- **Comandos**: escribir instrucciones (como en la terminal).

Las **10 reglas de Nielsen** para una buena interfaz. Las más importantes:
- **Que siempre sepas qué está pasando**: por ejemplo, una barra de progreso al subir un archivo.
- Hablar con palabras del usuario, no técnicas.
- Poder **deshacer**.
- Mensajes de error claros que digan cómo arreglarlo.

Para evaluarla: se le pide a una persona que use la app mientras **dice en voz alta lo que piensa**, y se anota dónde se confunde.`
});
