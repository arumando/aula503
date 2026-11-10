/* Ingeniería de Software I (IDSSI-55) — contenido de estudio */
window.AULA = window.AULA || { materias: [], juegos: [] };
AULA.materias.push({
  id: 'is', nombre: 'Ingeniería de Software I', corto: 'Ing. Software', clave: 'IDSSI-55', horas: 64,
  profe: 'M.C. Laura López Nuñez', color: 'is',
  objetivo: 'Aplicar métodos y técnicas para la obtención de requerimientos, análisis y diseño de un proyecto de software.',
  parciales: { 1: [1, 2], 2: [3], 3: [4] },
  evidencias: [
    'En la unidad 2 se hace énfasis en el Proceso Unificado o en Scrum.',
    'Desde la unidad 3 se plantea un proyecto de software que continúa en Ingeniería de Software II.',
    'En tu carpeta: "Unidad III Especificación de requerimientos" (págs. 132-161), la plantilla de casos de uso y los formatos FMR_005 del plan de pruebas.',
    'Para los diagramas UML tienes StarUML instalado.'
  ],
  unidades: [
  { n: 1, titulo: 'Introducción a la ingeniería de software', temas: [
    { id: '1.1', t: 'Definiciones de ingeniería de software',
      md: `### Definiciones clásicas
- **IEEE (Std 610.12)**: la aplicación de un enfoque **sistemático, disciplinado y cuantificable** al desarrollo, operación y mantenimiento del software.
- **Sommerville**: disciplina de la ingeniería que comprende **todos los aspectos de la producción de software**, desde la especificación hasta el mantenimiento.
- **Fritz Bauer (1968)**: el establecimiento y uso de principios de ingeniería para obtener software **económico**, **confiable** y que funcione **eficientemente** en máquinas reales.

### ¿Qué es software?
No es solo el código: incluye **programas, datos de configuración y documentación** (de usuario y de sistema).

### Ingeniería de software ≠ programar
| Programar | Ingeniería de software |
|---|---|
| Escribir código que funcione | Entender el problema, planear, diseñar, construir, probar y mantener |
| Trabajo individual frecuente | Trabajo en equipo con roles |
| Corto plazo | Ciclo de vida completo, años de mantenimiento |
| Se mide si corre | Se mide calidad, costo, tiempo y satisfacción del cliente |

### Capas de la ingeniería de software (Pressman)
De abajo hacia arriba: **enfoque de calidad** (la base) → **proceso** → **métodos** → **herramientas**.`,
      clave: ['Enfoque sistemático, disciplinado y cuantificable (IEEE)', 'Software = programas + datos + documentación', 'Capas: calidad, proceso, métodos, herramientas'],
      pr: { p: 'Explica con un ejemplo de un proyecto escolar qué hubiera cambiado si hubieras aplicado ingeniería de software y no solo programación.', r: 'Ej.: en un sistema de inventario se habrían levantado requerimientos con el usuario, hecho un diseño de base de datos antes de programar, probado con casos definidos y documentado; se habrían evitado cambios de último momento y errores en la entrega.' },
      q: [
        ['Según el IEEE, la ingeniería de software es un enfoque…', ['Artístico y libre', 'Sistemático, disciplinado y cuantificable', 'Solo de programación', 'Exclusivo de hardware'], 1, 'Definición IEEE 610.12.'],
        ['¿Qué incluye el software además del código?', ['Solo el ejecutable', 'Datos de configuración y documentación', 'El hardware', 'Nada más'], 1, 'Programas, datos y documentación.'],
        ['¿Cuál es la capa base de la ingeniería de software según Pressman?', ['Herramientas', 'Métodos', 'Enfoque de calidad', 'Proceso'], 2, 'Todo descansa en el compromiso con la calidad.']
      ],
      c: [['Ingeniería de software (IEEE)', 'Aplicación de un enfoque sistemático, disciplinado y cuantificable al desarrollo, operación y mantenimiento del software.'], ['Capas de Pressman', 'Calidad → proceso → métodos → herramientas.']] },

    { id: '1.2', t: 'Surgimiento, evolución y relación con otras disciplinas',
      md: `### La crisis del software
En los años 60 y 70 los proyectos de software **se retrasaban, costaban más de lo previsto, tenían muchos errores y eran difíciles de mantener**. En **1968**, en una conferencia de la **OTAN** en Garmisch (Alemania), se usó el término **"ingeniería de software"** para proponer tratar el software con la disciplina de las ingenierías.

### Evolución
| Época | Rasgo |
|---|---|
| 1950-60 | Programación artesanal, sin método |
| 1970s | Programación **estructurada**, modelo en **cascada** (Royce, 1970) |
| 1980s | CASE, métricas, **orientación a objetos** |
| 1990s | **UML** (1997), Proceso Unificado, CMM, internet |
| 2000s | **Manifiesto Ágil** (2001), Scrum, XP |
| 2010s | **DevOps**, integración y entrega continuas, nube, microservicios |
| 2020s | Desarrollo asistido por IA, plataformas low-code |

### Relación con otras disciplinas
- **Ciencias de la computación**: teoría, algoritmos, estructuras de datos.
- **Ingeniería de sistemas**: visión del sistema completo (hardware, software, personas, procesos).
- **Administración de proyectos**: planeación, costos, riesgos, personal.
- **Matemáticas y estadística**: métodos formales, métricas, estimación.
- **Psicología y diseño**: interacción humano-computadora, usabilidad.
- **Economía y derecho**: costos, licencias, propiedad intelectual, protección de datos.`,
      clave: ['Crisis del software', 'Conferencia OTAN 1968', 'Cascada (1970), UML (1997), Manifiesto Ágil (2001)', 'Relación con CC, sistemas, administración'],
      pr: { p: 'Busca un fracaso famoso de software (por ejemplo, Therac-25 o el cohete Ariane 5) y explica qué práctica de ingeniería de software lo habría evitado.', r: 'Ariane 5 (1996): reutilizaron código del Ariane 4 sin volver a validar los requerimientos para el nuevo rango de datos; un desbordamiento de conversión numérica destruyó el cohete. Una verificación de requerimientos y pruebas con datos reales del nuevo sistema lo habrían detectado.' },
      q: [
        ['¿En qué año y evento se popularizó el término "ingeniería de software"?', ['1956, Dartmouth', '1968, conferencia de la OTAN', '2001, Manifiesto Ágil', '1997, UML'], 1, 'Garmisch, Alemania.'],
        ['La "crisis del software" se refiere a…', ['Falta de computadoras', 'Proyectos retrasados, caros y con errores', 'La caída de internet', 'El fin de la programación'], 1, 'Motivó la disciplina.'],
        ['El Manifiesto Ágil se publicó en…', ['1970', '1990', '2001', '2010'], 2, 'Febrero de 2001.']
      ],
      c: [['Crisis del software', 'Problemas de costos, plazos y calidad en proyectos de software de los años 60-70.'], ['1968', 'Conferencia de la OTAN donde se impulsa el término ingeniería de software.']] },

    { id: '1.3', t: 'Características del software',
      md: `El software es distinto de los productos físicos:

1. **Se desarrolla, no se fabrica**: el costo está en el diseño y la ingeniería, no en la producción de copias (copiar cuesta casi nada).
2. **No se desgasta**, pero **se deteriora**: no hay desgaste físico, pero los **cambios** introducen errores y degradan la estructura.
3. **Muchos sistemas se construyen a medida**, aunque cada vez más se reutilizan componentes, librerías y frameworks.
4. **Es intangible y complejo**: no se puede ver ni tocar, lo que dificulta medir el avance.
5. **Es flexible**: se puede cambiar fácilmente… lo que tienta a cambiarlo sin control.

### Curvas de fallas
- **Hardware**: curva de "bañera": muchas fallas al inicio (defectos de fabricación), pocas en su vida útil y muchas al final (desgaste).
- **Software (idealizada)**: fallas altas al inicio, luego bajan y se mantienen planas.
- **Software (real)**: cada **cambio** provoca un pico de fallas; la tasa mínima va subiendo con el tiempo. Es la curva "de dientes de sierra".

### Dominios de aplicación (Pressman)
Software de sistemas, de aplicación, científico y de ingeniería, incrustado, de línea de productos, web y móvil, de inteligencia artificial.

### Leyes de Lehman (evolución)
Un sistema que se usa **debe cambiar continuamente** o se vuelve menos útil, y al cambiar su **complejidad aumenta** a menos que se trabaje para reducirla.`,
      clave: ['Se desarrolla, no se fabrica', 'No se desgasta, se deteriora por los cambios', 'Intangible y complejo', 'Curva de fallas real con picos por cambios'],
      pr: { p: 'Dibuja la curva de fallas del hardware y la del software real. Explica con tus palabras por qué la del software sube con el tiempo.', r: 'Cada mantenimiento introduce nuevos defectos antes de que se corrijan todos los anteriores, y la estructura se degrada; por eso la tasa base de fallas va aumentando.' },
      q: [
        ['El software…', ['Se desgasta como el hardware', 'No se desgasta pero se deteriora con los cambios', 'Nunca falla', 'Se fabrica en serie'], 1, 'Los cambios introducen errores.'],
        ['¿Dónde está el mayor costo del software?', ['En copiar los discos', 'En la ingeniería y el desarrollo', 'En el empaque', 'En la electricidad'], 1, 'Copiar es casi gratis.'],
        ['La curva de "bañera" describe las fallas de…', ['El software', 'El hardware', 'Los requerimientos', 'Los usuarios'], 1, 'Mortalidad infantil y desgaste.']
      ],
      c: [['Deterioro del software', 'Aumento de fallas y complejidad causado por los cambios, no por desgaste físico.'], ['Ley de Lehman', 'Un sistema en uso debe cambiar o perder utilidad; su complejidad crece si no se controla.']] },

    { id: '1.4', t: 'Factores de calidad: ISO/IEC 25000 (SQuaRE)',
      md: `La familia **ISO/IEC 25000**, conocida como **SQuaRE** (*Software product Quality Requirements and Evaluation*), da un marco para especificar y evaluar la calidad del software. Su modelo de calidad del producto está en la norma **ISO/IEC 25010**.

### Divisiones de SQuaRE
| Norma | Contenido |
|---|---|
| 2500n | Gestión de la calidad |
| **2501n** | **Modelo de calidad** (25010) |
| 2502n | Medición de la calidad |
| 2503n | Requisitos de calidad |
| 2504n | Evaluación de la calidad |

### Características de calidad del producto (ISO/IEC 25010:2011)
| Característica | Pregunta que responde |
|---|---|
| **Adecuación funcional** | ¿Hace lo que debe, completo y correcto? |
| **Eficiencia de desempeño** | ¿Responde rápido y usa bien los recursos? |
| **Compatibilidad** | ¿Convive e intercambia datos con otros sistemas? |
| **Usabilidad** | ¿Es fácil de aprender, usar y es accesible? |
| **Fiabilidad** | ¿Está disponible y tolera fallas? |
| **Seguridad** | ¿Protege la confidencialidad, integridad y la autenticidad? |
| **Mantenibilidad** | ¿Es fácil de modificar, analizar y probar? |
| **Portabilidad** | ¿Se adapta e instala en otros entornos? |

En la revisión **2023** se agregó la característica **Protección (safety)** y la usabilidad pasó a llamarse **capacidad de interacción**; la portabilidad se llama **flexibilidad**. Para el examen, las 8 de la versión 2011 son la referencia más usada.

### Calidad en uso
Efectividad, eficiencia, satisfacción, ausencia de riesgos y cobertura del contexto: cómo percibe la calidad el **usuario real**.

> Mnemotecnia de las 8: **"Ad-Ef-Co-Us-Fi-Se-Ma-Po"**.`,
      clave: ['SQuaRE = ISO/IEC 25000', 'Modelo de calidad en ISO/IEC 25010', '8 características del producto', 'Calidad en uso'],
      pr: { p: 'Para el sistema de inscripciones de tu universidad, escribe un requisito medible para 4 características de 25010.', r: 'Eficiencia: la página de inscripción carga en menos de 3 s con 500 usuarios simultáneos. Fiabilidad: disponibilidad de 99% en periodo de inscripciones. Usabilidad: un alumno nuevo completa la inscripción en menos de 5 minutos sin ayuda. Seguridad: solo el alumno autenticado puede ver su horario.' },
      q: [
        ['¿Qué norma de la familia SQuaRE define el modelo de calidad del producto?', ['ISO 9001', 'ISO/IEC 25010', 'ISO/IEC 29119', 'ISO 27001'], 1, 'División 2501n.'],
        ['"Fácil de modificar y probar" corresponde a…', ['Usabilidad', 'Mantenibilidad', 'Portabilidad', 'Compatibilidad'], 1, 'Incluye modularidad, analizabilidad, capacidad de prueba.'],
        ['¿Cuántas características tiene el modelo de producto en ISO/IEC 25010:2011?', ['6', '8', '10', '4'], 1, 'Adecuación funcional, eficiencia, compatibilidad, usabilidad, fiabilidad, seguridad, mantenibilidad, portabilidad.']
      ],
      c: [['SQuaRE', 'Software product Quality Requirements and Evaluation: familia ISO/IEC 25000.'], ['ISO/IEC 25010', 'Modelo de calidad: adecuación funcional, eficiencia, compatibilidad, usabilidad, fiabilidad, seguridad, mantenibilidad, portabilidad.'], ['Fiabilidad', 'Capacidad de funcionar sin fallas, estar disponible y recuperarse.']] },

    { id: '1.5', t: 'Definición y etapas del proceso de software',
      md: `Un **proceso de software** es un conjunto estructurado de **actividades** para desarrollar un producto de software. No es una receta rígida: se adapta al proyecto.

### Actividades fundamentales (Sommerville)
1. **Especificación**: definir qué debe hacer el sistema y sus restricciones.
2. **Diseño e implementación**: definir la estructura y construir el software.
3. **Validación**: comprobar que hace lo que el cliente quiere.
4. **Evolución**: modificarlo cuando cambian las necesidades.

### Marco genérico (Pressman)
**Comunicación → Planeación → Modelado (análisis y diseño) → Construcción (código y pruebas) → Despliegue**

### Actividades sombrilla (durante todo el proyecto)
Seguimiento y control del proyecto, administración del riesgo, aseguramiento de la calidad, revisiones técnicas, medición, **gestión de la configuración** (control de versiones), gestión de la reutilización y preparación de productos de trabajo.

### Elementos de un proceso
- **Actividades** y **tareas**.
- **Roles**: quién hace qué (analista, diseñador, programador, tester, líder).
- **Productos de trabajo** (artefactos): documento de requerimientos, diagramas, código, plan de pruebas.
- **Pre y poscondiciones**: qué debe existir antes y después de cada actividad.

### Ciclo de vida
Es la vida completa del software: desde la idea hasta su **retiro**. El **mantenimiento** suele ser la etapa más larga y costosa: correctivo (errores), adaptativo (nuevo entorno), perfectivo (mejoras) y preventivo.`,
      clave: ['Especificación, diseño e implementación, validación, evolución', 'Marco de Pressman: comunicación → despliegue', 'Actividades sombrilla', 'Mantenimiento: correctivo, adaptativo, perfectivo, preventivo'],
      pr: { p: 'Clasifica el tipo de mantenimiento: (a) corregir un cálculo de promedio, (b) adaptar la app a Android 15, (c) agregar exportación a PDF, (d) reestructurar código para que sea más fácil cambiarlo.', r: '(a) Correctivo. (b) Adaptativo. (c) Perfectivo. (d) Preventivo.' },
      q: [
        ['¿Cuál NO es una actividad fundamental según Sommerville?', ['Especificación', 'Validación', 'Evolución', 'Comercialización'], 3, 'Las cuatro son especificación, diseño e implementación, validación y evolución.'],
        ['La gestión de la configuración es una actividad…', ['De construcción', 'Sombrilla', 'De despliegue', 'Opcional'], 1, 'Ocurre durante todo el proceso.'],
        ['Adaptar un sistema a un nuevo sistema operativo es mantenimiento…', ['Correctivo', 'Adaptativo', 'Perfectivo', 'Preventivo'], 1, 'Cambio de entorno.']
      ],
      c: [['Proceso de software', 'Conjunto estructurado de actividades para desarrollar software.'], ['Actividades sombrilla', 'Actividades que acompañan todo el proceso: riesgos, calidad, configuración, medición.'], ['Mantenimiento perfectivo', 'Agregar o mejorar funciones a pedido del usuario.']] },

    { id: '1.6', t: 'Herramientas para el desarrollo de software',
      md: `Las herramientas **CASE** (*Computer-Aided Software Engineering*) apoyan las actividades del proceso.

| Categoría | Ejemplos |
|---|---|
| **Modelado UML** | **StarUML**, Visual Paradigm, draw.io, PlantUML, Enterprise Architect |
| **Diseño de interfaces / prototipos** | **Figma**, Balsamiq, Penpot |
| **Editores e IDEs** | VS Code, IntelliJ, Android Studio, Eclipse |
| **Control de versiones** | **Git**, GitHub, GitLab |
| **Gestión de proyecto y tareas** | Jira, Trello, GitHub Projects, Taiga |
| **Pruebas** | JUnit, pytest, Selenium, Postman |
| **Integración continua** | GitHub Actions, GitLab CI, Jenkins |
| **Documentación** | Markdown, Confluence, Notion |
| **Bases de datos** | MySQL Workbench, DBeaver, pgAdmin |

### Clasificación de CASE
- **Upper CASE** (alto nivel): planeación, requerimientos, análisis y diseño (StarUML).
- **Lower CASE** (bajo nivel): codificación, pruebas, depuración (IDE, frameworks de pruebas).
- **I-CASE** (integradas): cubren todo el ciclo.

### Git en 6 comandos
~~~bash
git init
git add .
git commit -m "Primer avance del proyecto"
git branch requerimientos
git switch requerimientos
git push origin requerimientos
~~~

> Ya tienes **StarUML** y **Figma** configurados: úsalos para los diagramas de la unidad 4 y el prototipo de la unidad 3.`,
      clave: ['CASE: Upper, Lower, I-CASE', 'Modelado: StarUML; prototipos: Figma', 'Git y GitHub', 'Gestión: Jira, Trello'],
      pr: { p: 'Crea un repositorio en GitHub para tu proyecto de la materia. Agrega una carpeta docs/ con el documento de requerimientos y una carpeta diagramas/ con los archivos .mdj de StarUML.', r: 'Estructura sugerida: README.md (descripción del proyecto), docs/requerimientos.md, diagramas/casos-de-uso.mdj, prototipo/ (enlace a Figma).' },
      q: [
        ['StarUML es una herramienta CASE de tipo…', ['Lower CASE', 'Upper CASE', 'Compilador', 'Sistema operativo'], 1, 'Apoya análisis y diseño.'],
        ['¿Para qué sirve Git?', ['Diseñar interfaces', 'Control de versiones', 'Probar APIs', 'Hacer diagramas'], 1, 'Registra cambios del código.'],
        ['Una herramienta para prototipos de interfaz es…', ['Figma', 'JUnit', 'Jenkins', 'MySQL'], 0, 'Diseño de UI.']
      ],
      c: [['CASE', 'Computer-Aided Software Engineering: herramientas que apoyan el proceso de software.'], ['Upper CASE', 'Herramientas para requerimientos, análisis y diseño.']] }
  ]},

  { n: 2, titulo: 'Modelos de procesos de software', temas: [
    { id: '2.1', t: 'Definición de modelo de proceso de software',
      md: `Un **modelo de proceso** es una **representación simplificada** de un proceso de software: describe **qué actividades** se hacen, **en qué orden**, qué **productos** se generan y qué **roles** participan.

### Para qué sirve
- Dar **orden** y previsibilidad al desarrollo.
- Facilitar la **planeación** y el seguimiento.
- Comunicar al equipo y al cliente cómo se trabajará.
- Mejorar el proceso con el tiempo.

### Dos grandes enfoques
| Dirigido por un plan | Ágil |
|---|---|
| Todas las actividades se planean por adelantado | La planeación es incremental |
| Se mide el avance contra el plan | Se mide el avance con software funcionando |
| Mucha documentación | Documentación suficiente |
| Cambios costosos | Cambios bienvenidos |
| Bueno para sistemas críticos, contratos fijos, equipos grandes | Bueno para requisitos cambiantes, equipos pequeños, cliente disponible |

En la práctica muchos proyectos **combinan** ambos enfoques.

### Familias de modelos que verás
Tradicionales (cascada, V), incrementales (incremental, DRA), evolutivos (prototipos, espiral, concurrente), Proceso Unificado, ágiles (XP, DSDM, Scrum) y formales.

### ¿Cómo elegir?
Considera: **claridad de los requerimientos**, **tamaño y experiencia del equipo**, **riesgo**, **criticidad** (¿pueden morir personas?), **disponibilidad del cliente** y **plazo**.`,
      clave: ['Representación simplificada del proceso', 'Dirigido por plan vs ágil', 'Criterios de elección'],
      pr: { p: 'Para tu proyecto de la materia, responde: ¿los requerimientos están claros? ¿qué tamaño tiene el equipo? ¿qué tan disponible está el cliente? Con eso propón un modelo.', r: 'Si los requerimientos no están del todo claros, el equipo es de 3-5 personas y el cliente (un profesor o una oficina de la universidad) puede revisar cada 2 semanas, Scrum o un modelo incremental es una buena opción.' },
      q: [
        ['Un modelo de proceso es…', ['Un lenguaje de programación', 'Una representación simplificada del proceso de software', 'Un tipo de base de datos', 'Un diagrama de clases'], 1, 'Describe actividades, orden, productos y roles.'],
        ['En los enfoques ágiles el avance se mide con…', ['El plan', 'Software funcionando', 'Horas trabajadas', 'Número de documentos'], 1, 'Principio del Manifiesto Ágil.'],
        ['Para un sistema crítico con requisitos estables conviene un enfoque…', ['Dirigido por plan', 'Sin proceso', 'Solo prototipos desechables', 'Hackathon'], 0, 'Requiere control y documentación.']
      ],
      c: [['Modelo de proceso', 'Representación simplificada de las actividades, su orden, productos y roles.'], ['Enfoque dirigido por plan', 'Todas las actividades se planean de antemano y el avance se mide contra el plan.']] },

    { id: '2.2', t: 'Modelos tradicionales: cascada y modelo en V', sub: ['2.2.1 Cascada', '2.2.2 Modelo en V'],
      md: `### Cascada (Royce, 1970)
Fases **secuenciales**; cada una empieza cuando termina la anterior y produce documentos que se aprueban.

**Requerimientos → Análisis → Diseño → Codificación → Pruebas → Implantación → Mantenimiento**

| Ventajas | Desventajas |
|---|---|
| Simple de entender y administrar | Los requerimientos deben estar claros desde el inicio |
| Mucha documentación | El cliente ve el producto hasta el final |
| Fases bien definidas | Los errores de requerimientos se descubren tarde y cuestan mucho |
| Bueno con requisitos estables | Rígido ante cambios |

**Cuándo usarlo**: requisitos bien entendidos y estables, proyectos cortos o sistemas donde el contrato fija todo (por ejemplo, migrar un sistema existente).

> Royce mismo advirtió en 1970 que la versión puramente secuencial era riesgosa y proponía retroalimentación entre fases.

### Modelo en V
Variante de cascada que **relaciona cada fase de desarrollo con un nivel de prueba**. El lado izquierdo baja (definición), el derecho sube (verificación).

~~~text
Requerimientos  ─────────────────►  Pruebas de aceptación
   Diseño del sistema  ───────►  Pruebas de sistema
      Diseño arquitectónico ──►  Pruebas de integración
         Diseño de módulos ─►  Pruebas unitarias
                   Codificación
~~~

- Las pruebas se **planean desde el inicio**: al escribir requerimientos ya se diseñan las pruebas de aceptación.
- Muy usado en sistemas **críticos** (automotriz, médico, aeronáutico).
- Comparte la rigidez de la cascada.`,
      clave: ['Cascada: fases secuenciales con documentos', 'Errores de requerimientos cuestan más al final', 'Modelo en V: cada fase ↔ un nivel de prueba', 'Pruebas planeadas desde el inicio'],
      pr: { p: 'Dibuja el modelo en V en StarUML o papel y anota qué documento produce cada fase del lado izquierdo y qué prueba la valida del lado derecho.', r: 'Requerimientos (ERS) ↔ pruebas de aceptación; diseño del sistema ↔ pruebas de sistema; arquitectura ↔ integración; diseño detallado de módulos ↔ unitarias.' },
      q: [
        ['Desventaja principal de la cascada:', ['Mucha flexibilidad', 'El cliente ve el producto hasta el final', 'No tiene documentación', 'Es muy caro de administrar'], 1, 'Los errores se descubren tarde.'],
        ['En el modelo en V, los requerimientos se validan con…', ['Pruebas unitarias', 'Pruebas de integración', 'Pruebas de aceptación', 'Revisiones de código'], 2, 'El cliente acepta lo que pidió.'],
        ['¿Quién publicó el artículo asociado al modelo en cascada en 1970?', ['Barry Boehm', 'Winston Royce', 'Ken Schwaber', 'Kent Beck'], 1, 'Winston W. Royce.']
      ],
      c: [['Cascada', 'Modelo secuencial: cada fase inicia al terminar la anterior.'], ['Modelo en V', 'Cascada que asocia cada fase de desarrollo con un nivel de prueba.']] },

    { id: '2.3', t: 'Modelos incrementales: incremental y DRA', sub: ['2.3.1 Modelo incremental', '2.3.2 DRA (Desarrollo Rápido de Aplicaciones)'],
      md: `### Modelo incremental
El sistema se entrega en **partes funcionales (incrementos)**. Cada incremento pasa por análisis, diseño, código y pruebas. El **primer incremento** es el **núcleo** con las funciones esenciales; los siguientes agregan funciones.

Ejemplo, sistema escolar:
1. Incremento 1: registro de alumnos y materias.
2. Incremento 2: calificaciones.
3. Incremento 3: reportes y estadísticas.
4. Incremento 4: app móvil.

| Ventajas | Desventajas |
|---|---|
| El cliente usa software funcional pronto | Requiere una buena arquitectura desde el inicio |
| Reduce el riesgo: los primeros incrementos son los más probados | Difícil definir incrementos si todo depende de todo |
| Se adapta a cambios entre incrementos | Puede degradar la estructura sin refactorización |
| Costo de cambios menor que en cascada | |

### DRA / RAD (Rapid Application Development)
Modelo incremental que busca **ciclos muy cortos** (típicamente **60 a 90 días**) usando **componentes reutilizables**, herramientas de generación de código y **varios equipos en paralelo**, cada uno con una función principal.

Fases (Pressman): comunicación → planeación → modelado (de negocio, de datos, de proceso) → construcción (reutilización y generación automática) → despliegue.

| Requisitos para DRA | Riesgos |
|---|---|
| Sistema que se pueda modularizar | Requiere muchas personas para varios equipos |
| Cliente y desarrolladores comprometidos con plazos cortos | Si no se puede modularizar, fracasa |
| Herramientas de desarrollo rápido | No es adecuado con alto riesgo técnico o alto desempeño |`,
      clave: ['Entregas por incrementos funcionales', 'Primer incremento = núcleo', 'DRA: ciclos de 60-90 días, equipos en paralelo, reutilización', 'DRA requiere modularidad'],
      pr: { p: 'Divide en 4 incrementos una app de pedidos para una cafetería de la universidad. Indica cuál es el núcleo y por qué.', r: 'Núcleo: catálogo y registro de pedidos (sin eso no hay valor). Luego: pagos/cuenta del alumno, notificación de pedido listo, historial y estadísticas para el administrador.' },
      q: [
        ['En el modelo incremental, el primer incremento suele ser…', ['La documentación', 'El núcleo con las funciones esenciales', 'Las pruebas', 'El diseño de la base de datos únicamente'], 1, 'Da valor desde el principio.'],
        ['El DRA busca ciclos de aproximadamente…', ['1 semana', '60 a 90 días', '2 años', '5 años'], 1, 'Desarrollo rápido.'],
        ['El DRA NO es adecuado cuando…', ['El sistema se puede modularizar', 'Hay alto riesgo técnico', 'Hay componentes reutilizables', 'El cliente participa'], 1, 'Necesita tecnología conocida.']
      ],
      c: [['Modelo incremental', 'Entrega el sistema en partes funcionales sucesivas.'], ['DRA (RAD)', 'Desarrollo rápido con ciclos cortos, reutilización y equipos en paralelo.']] },

    { id: '2.4', t: 'Modelos evolutivos: prototipos, espiral y concurrente', sub: ['2.4.1 Prototipos', '2.4.2 Espiral', '2.4.3 Desarrollo concurrente'],
      md: `Los modelos evolutivos son **iterativos**: el software crece y se refina en versiones cada vez más completas.

### Prototipos
Útil cuando **el cliente no sabe bien lo que quiere** o hay dudas técnicas.
1. Comunicación → 2. Plan rápido → 3. Diseño rápido → 4. Construcción del prototipo → 5. Retroalimentación del cliente → repetir.

- **Desechable**: se usa solo para aclarar requisitos y se tira.
- **Evolutivo**: se va mejorando hasta ser el producto final.

Riesgo: el cliente cree que el prototipo ya es el sistema terminado, o se mantienen malas decisiones técnicas tomadas "para salir rápido".

### Espiral (Boehm, 1986)
Combina prototipos con el control de la cascada y agrega el **análisis de riesgos**. Cada vuelta de la espiral tiene cuatro cuadrantes:
1. **Determinar objetivos**, alternativas y restricciones.
2. **Evaluar alternativas e identificar y reducir riesgos** (prototipos, simulaciones).
3. **Desarrollar y verificar** el siguiente nivel del producto.
4. **Planear** la siguiente vuelta.

Ideal para proyectos **grandes y de alto riesgo**. Requiere experiencia en gestión de riesgos.

### Desarrollo concurrente (ingeniería concurrente)
Las actividades (comunicación, modelado, construcción…) ocurren **al mismo tiempo** y cada una está en un **estado**: inactiva, en desarrollo, en espera de cambios, en revisión, terminada… Un **evento** (por ejemplo, un cambio en requisitos) mueve las actividades entre estados. Representa bien proyectos reales con varios equipos.`,
      clave: ['Prototipo desechable vs evolutivo', 'Espiral: objetivos, riesgos, desarrollo, planeación', 'Espiral = gestión de riesgos', 'Concurrente: actividades con estados y eventos'],
      pr: { p: 'Haz en Figma un prototipo de 3 pantallas para tu proyecto y muéstraselo a un compañero como "cliente". Anota 5 cambios que te pida. ¿Es un prototipo desechable o evolutivo?', r: 'Si el prototipo de Figma solo sirve para acordar requisitos y luego se programa desde cero, es desechable. Si fuera código que se sigue mejorando, sería evolutivo.' },
      q: [
        ['¿Qué modelo pone énfasis en el análisis de riesgos?', ['Cascada', 'Espiral', 'Incremental', 'DRA'], 1, 'Boehm, 1986.'],
        ['Los prototipos son útiles cuando…', ['Los requisitos están perfectamente claros', 'El cliente no sabe bien lo que quiere', 'No hay cliente', 'El sistema es muy pequeño'], 1, 'Ayudan a descubrir requisitos.'],
        ['En el modelo concurrente, las actividades cambian de estado por…', ['Eventos', 'Sorteo', 'El compilador', 'El hardware'], 0, 'Un evento dispara transiciones.']
      ],
      c: [['Prototipo desechable', 'Se construye para aclarar requisitos y luego se descarta.'], ['Modelo en espiral', 'Modelo evolutivo de Boehm guiado por el análisis de riesgos en cada vuelta.']] },

    { id: '2.5', t: 'Proceso Unificado (UP / RUP)',
      md: `El **Proceso Unificado** (Jacobson, Booch y Rumbaugh, 1999) está ligado a **UML**. Su versión comercial más conocida es **RUP** (Rational Unified Process).

### Características
- **Dirigido por casos de uso**: los casos de uso guían el análisis, diseño y pruebas.
- **Centrado en la arquitectura**: la arquitectura se define y estabiliza pronto.
- **Iterativo e incremental**: cada fase tiene iteraciones que producen versiones.

### Cuatro fases
| Fase | Objetivo | Hito al final |
|---|---|---|
| **Inicio (concepción)** | Visión del negocio, alcance, casos de uso principales, riesgos, viabilidad | Objetivos del ciclo de vida |
| **Elaboración** | Analizar el dominio, **arquitectura base** estable, plan del proyecto | Arquitectura del ciclo de vida |
| **Construcción** | Desarrollar la mayor parte del sistema en iteraciones | Capacidad operativa inicial (versión beta) |
| **Transición** | Entregar a los usuarios: pruebas beta, capacitación, corrección | Lanzamiento del producto |

### Disciplinas (flujos de trabajo)
Modelado de negocio, **requerimientos**, **análisis y diseño**, implementación, **pruebas**, despliegue; y de soporte: gestión de configuración y cambios, gestión del proyecto, entorno.

El famoso **diagrama de jorobas** de RUP muestra cómo el esfuerzo de cada disciplina sube y baja a lo largo de las fases: por ejemplo, requerimientos es alto en inicio y elaboración, e implementación es máxima en construcción.

### Las 6 buenas prácticas de RUP
Desarrollo iterativo, gestión de requisitos, arquitectura basada en componentes, **modelado visual (UML)**, verificación continua de la calidad y control de cambios.`,
      clave: ['Dirigido por casos de uso, centrado en arquitectura, iterativo', 'Fases: inicio, elaboración, construcción, transición', 'Disciplinas y diagrama de jorobas', 'Relación directa con UML'],
      pr: { p: 'Escribe para tu proyecto qué entregarías al final de las fases de inicio y de elaboración.', r: 'Inicio: documento de visión, lista de actores y casos de uso principales, riesgos, estimación inicial. Elaboración: modelo de casos de uso casi completo, diagrama de clases del dominio, arquitectura (MVC, despliegue), prototipo de la arquitectura, plan de iteraciones.' },
      q: [
        ['¿En qué fase del UP se estabiliza la arquitectura?', ['Inicio', 'Elaboración', 'Construcción', 'Transición'], 1, 'Termina con la arquitectura base.'],
        ['El Proceso Unificado es dirigido por…', ['Historias de usuario', 'Casos de uso', 'Sprints', 'Pruebas'], 1, 'Los casos de uso guían todo.'],
        ['La entrega del producto a los usuarios ocurre en la fase…', ['Elaboración', 'Construcción', 'Transición', 'Inicio'], 2, 'Incluye pruebas beta y capacitación.']
      ],
      c: [['Fases del UP', 'Inicio, Elaboración, Construcción, Transición.'], ['RUP', 'Rational Unified Process: implementación comercial del Proceso Unificado.']] },

    { id: '2.6', t: 'Modelos ágiles: principios, XP, DSDM y Scrum', sub: ['2.6.1 Principios de los modelos ágiles', '2.6.2 Programación extrema (XP)', '2.6.3 DSDM', '2.6.4 Scrum'],
      md: `### Manifiesto Ágil (2001)
Valoramos:
- **Individuos e interacciones** sobre procesos y herramientas.
- **Software funcionando** sobre documentación extensiva.
- **Colaboración con el cliente** sobre negociación de contratos.
- **Respuesta al cambio** sobre seguir un plan.

(Lo de la derecha también tiene valor, pero se valora más lo de la izquierda.) Además hay **12 principios**: entregar software funcional con frecuencia, aceptar cambios, trabajar con el cliente a diario, equipos motivados, comunicación cara a cara, ritmo sostenible, excelencia técnica, simplicidad, equipos auto-organizados y reflexión periódica.

### XP — Programación Extrema (Kent Beck)
Valores: comunicación, simplicidad, retroalimentación, valentía y respeto.
Prácticas: **historias de usuario**, entregas pequeñas, **programación en parejas**, **desarrollo guiado por pruebas (TDD)**, **refactorización**, integración continua, diseño simple, propiedad colectiva del código, cliente en el sitio, ritmo de 40 horas.

### DSDM — Método de Desarrollo de Sistemas Dinámicos
Marco ágil británico (1994) derivado de RAD. Ideas clave:
- **Time-boxing**: el tiempo y el costo son fijos; lo que varía es el alcance.
- Priorización **MoSCoW**: **M**ust have (debe), **S**hould have (debería), **C**ould have (podría), **W**on't have this time (no esta vez).
- Principio de Pareto: el 80% del valor se entrega con el 20% del esfuerzo.

### Scrum (Schwaber y Sutherland)
| Elemento | Descripción |
|---|---|
| **Roles** | **Product Owner** (prioriza el valor), **Scrum Master** (facilita y quita impedimentos), **Developers** (construyen) |
| **Eventos** | **Sprint** (1-4 semanas), **Sprint Planning**, **Daily Scrum** (15 min), **Sprint Review** (se muestra el incremento), **Sprint Retrospective** (se mejora el proceso) |
| **Artefactos** | **Product Backlog**, **Sprint Backlog**, **Incremento** |

En el Daily cada persona comenta qué avanzó, qué hará y qué le bloquea. El **Definition of Done** define cuándo algo está realmente terminado.`,
      clave: ['4 valores del Manifiesto Ágil', 'XP: parejas, TDD, refactorización, integración continua', 'DSDM: time-boxing y MoSCoW', 'Scrum: 3 roles, 5 eventos, 3 artefactos'],
      pr: { p: 'Organiza tu proyecto con Scrum: escribe 6 historias de usuario en formato "Como ___ quiero ___ para ___", priorízalas con MoSCoW y arma el backlog del primer sprint de 2 semanas.', r: 'Ej.: "Como alumno quiero ver mi horario para no faltar a clases" (Must). "Como alumno quiero recibir recordatorios" (Should). "Como profesor quiero exportar listas" (Could). "Modo oscuro" (Won\'t esta vez). El sprint 1 toma solo Musts que quepan en 2 semanas.' },
      q: [
        ['¿Qué rol de Scrum prioriza el Product Backlog?', ['Scrum Master', 'Product Owner', 'Developers', 'El cliente final siempre'], 1, 'Maximiza el valor del producto.'],
        ['La programación en parejas y el TDD son prácticas de…', ['DSDM', 'XP', 'Cascada', 'RUP'], 1, 'Programación extrema.'],
        ['En MoSCoW, la "C" significa…', ['Critical', 'Could have', 'Complete', 'Cost'], 1, 'Podría tener, si hay tiempo.']
      ],
      c: [['Daily Scrum', 'Reunión diaria de 15 minutos para sincronizar y detectar impedimentos.'], ['MoSCoW', 'Must, Should, Could, Won\'t: técnica de priorización de DSDM.'], ['TDD', 'Desarrollo guiado por pruebas: primero la prueba, luego el código.'], ['Sprint Retrospective', 'Evento donde el equipo analiza cómo mejorar su forma de trabajar.']] },

    { id: '2.7', t: 'Modelos formales',
      md: `Los **métodos formales** usan **notación matemática** (lógica, teoría de conjuntos) para **especificar, desarrollar y verificar** software.

### Idea
Si la especificación es matemática, se puede **demostrar** que el programa la cumple, eliminando ambigüedades e inconsistencias.

### Ejemplos de lenguajes y herramientas
- **Z** (notación de esquemas basada en teoría de conjuntos).
- **VDM** (Vienna Development Method).
- **Método B** y Event-B.
- **TLA+** (Leslie Lamport), usado en sistemas distribuidos.
- **Alloy**, **Coq**, **Isabelle**.
- **Model checking**: explorar automáticamente todos los estados posibles de un sistema.

### Modelo de sala limpia (cleanroom)
Desarrollado en IBM: especificación formal, desarrollo incremental, **verificación por demostración** en lugar de depuración y pruebas estadísticas de uso. Busca **cero defectos**.

| Ventajas | Desventajas |
|---|---|
| Elimina ambigüedad | Costoso y lento |
| Detecta errores antes de codificar | Requiere formación matemática |
| Ideal para sistemas críticos | Difícil comunicarse con el cliente |

### Dónde se usan
Aviónica (control de vuelo), ferrocarriles (el metro de París línea 14 usó el Método B), dispositivos médicos, protocolos criptográficos, sistemas en la nube (AWS usa TLA+).`,
      clave: ['Notación matemática para especificar y verificar', 'Z, VDM, B, TLA+', 'Sala limpia (cleanroom)', 'Sistemas críticos'],
      pr: { p: 'Especifica formalmente (con lógica de conjuntos) la operación "inscribir alumno a materia" con la precondición de que el cupo no esté lleno y el alumno no esté ya inscrito.', r: 'Pre: a ∉ inscritos(m) ∧ |inscritos(m)| < cupo(m). Post: inscritos\'(m) = inscritos(m) ∪ {a}.' },
      q: [
        ['Los métodos formales se basan en…', ['Intuición', 'Notación matemática', 'Prototipos visuales', 'Historias de usuario'], 1, 'Lógica y teoría de conjuntos.'],
        ['¿Dónde son más justificables los métodos formales?', ['Una página personal', 'Sistemas críticos como aviónica o dispositivos médicos', 'Un videojuego casual', 'Un blog'], 1, 'El costo se justifica por el riesgo.'],
        ['El modelo cleanroom busca…', ['Entregar rápido sin pruebas', 'Cero defectos mediante verificación formal', 'Solo prototipos', 'Programar en parejas'], 1, 'Prevenir defectos en lugar de depurar.']
      ],
      c: [['Método formal', 'Uso de matemáticas para especificar y verificar software.'], ['Cleanroom', 'Modelo de IBM que combina especificación formal y verificación para lograr cero defectos.']] },

    { id: '2.8', t: 'Otros modelos',
      md: `### Desarrollo basado en componentes (CBSE)
Construir el sistema **integrando componentes existentes** (librerías, servicios, COTS: productos comerciales listos). Reduce tiempo y costo; el reto es la compatibilidad y la dependencia de terceros.

### Orientado a aspectos (AOSD)
Separa los **intereses transversales** (seguridad, registro de eventos, transacciones) que afectan a muchos módulos en unidades llamadas **aspectos**.

### Kanban
Método ágil de flujo continuo nacido en Toyota. Un **tablero** con columnas (Por hacer → En progreso → En revisión → Hecho) y **límites de trabajo en curso (WIP)** para evitar cuellos de botella. No hay sprints.

### Lean software development
Principios de manufactura esbelta: eliminar desperdicio, aprender rápido, decidir lo más tarde posible, entregar rápido, empoderar al equipo, construir con calidad, ver el todo.

### DevOps
Une **desarrollo y operaciones**: automatización, **integración continua (CI)** y **entrega/despliegue continuo (CD)**, infraestructura como código y monitoreo. Ciclo: planear → codificar → construir → probar → liberar → desplegar → operar → monitorear.

### Proceso de software personal y en equipo (PSP / TSP)
De Watts Humphrey (SEI): el programador mide su tiempo, sus defectos y su tamaño de código para mejorar sus estimaciones y su calidad.

### Modelos de madurez
**CMMI** (niveles 1 a 5: inicial, gestionado, definido, cuantitativamente gestionado, en optimización) y en México **MoProSoft** (NMX-I-059-NYCE), pensado para empresas pequeñas.`,
      clave: ['Basado en componentes y COTS', 'Kanban: tablero y límites WIP', 'DevOps: CI/CD', 'PSP/TSP, CMMI y MoProSoft'],
      pr: { p: 'Arma un tablero Kanban (Trello o GitHub Projects) para tu proyecto con columnas Por hacer, En progreso (WIP = 3), En revisión y Hecho. Coloca ahí las tareas de la unidad 3.', r: 'Ejemplos de tarjetas: entrevistar al cliente, redactar requerimientos funcionales, diagrama de casos de uso, documentar 3 casos de uso, prototipo en Figma, plan de pruebas.' },
      q: [
        ['Kanban limita…', ['El número de sprints', 'El trabajo en curso (WIP)', 'El número de programadores', 'El presupuesto'], 1, 'Para evitar cuellos de botella.'],
        ['CI/CD es parte de…', ['Cascada', 'DevOps', 'Métodos formales', 'Modelo en V'], 1, 'Integración y entrega continuas.'],
        ['MoProSoft es un modelo de procesos creado en…', ['Estados Unidos', 'México', 'Japón', 'Alemania'], 1, 'Norma mexicana para empresas pequeñas.']
      ],
      c: [['WIP', 'Work In Progress: límite de tareas simultáneas en una columna Kanban.'], ['CMMI', 'Modelo de madurez de procesos con 5 niveles.'], ['DevOps', 'Cultura y prácticas que unen desarrollo y operaciones con automatización CI/CD.']] }
  ]},

  { n: 3, titulo: 'Especificación de requerimientos', temas: [
    { id: '3.1', t: 'Proceso de la ingeniería de requerimientos',
      md: `Un **requerimiento** es una descripción de **lo que el sistema debe hacer** (servicios) o de una **restricción** sobre cómo debe hacerlo.

La **ingeniería de requerimientos (IR)** es el proceso de descubrir, analizar, documentar, validar y administrar esos requerimientos.

### Actividades (Sommerville)
1. **Estudio de viabilidad**: ¿vale la pena hacerlo?
2. **Obtención y análisis** (elicitación): descubrir qué necesitan los stakeholders.
3. **Especificación**: escribirlos de forma clara (documento de requerimientos).
4. **Validación**: comprobar que son correctos, completos y que reflejan lo que el cliente quiere.

Y en paralelo, durante todo el proyecto: **administración de requerimientos** (control de cambios y trazabilidad).

### Es un proceso en espiral
No se hace una sola vez: en cada vuelta se profundiza (requisitos de negocio → de usuario → de sistema).

### ¿Por qué importa tanto?
- Muchos fracasos de proyectos se deben a requerimientos **incompletos, ambiguos o cambiantes**.
- Un error de requerimientos encontrado en producción puede costar **decenas de veces más** que corregirlo al escribirlo.

### Trazabilidad
Poder seguir cada requerimiento **hacia atrás** (¿quién lo pidió y por qué?) y **hacia adelante** (¿qué diseño, código y pruebas lo implementan?). Se documenta con una **matriz de trazabilidad**.

> Lectura de apoyo: el PDF "Unidad III Especificación de requerimientos" de tu carpeta (págs. 132-161).`,
      clave: ['Requerimiento: servicio o restricción', 'Viabilidad → obtención → especificación → validación', 'Administración de requerimientos', 'Trazabilidad'],
      pr: { p: 'Haz una matriz de trazabilidad para 3 requerimientos de tu proyecto con columnas: ID, requerimiento, quién lo pidió, caso de uso, prueba de aceptación.', r: 'Ej.: RF-01 | El alumno inicia sesión con matrícula y contraseña | Servicios escolares | CU-01 Iniciar sesión | CP-01 Acceso con credenciales válidas.' },
      q: [
        ['¿Qué actividad decide si vale la pena desarrollar el sistema?', ['Validación', 'Estudio de viabilidad', 'Especificación', 'Pruebas'], 1, 'Se hace al inicio.'],
        ['Seguir un requerimiento hasta su código y sus pruebas se llama…', ['Viabilidad', 'Trazabilidad', 'Negociación', 'Elicitación'], 1, 'Matriz de trazabilidad.'],
        ['Un error de requerimientos detectado en producción…', ['Cuesta lo mismo', 'Cuesta mucho más que si se corrige al inicio', 'No cuesta nada', 'Es imposible'], 1, 'Por eso la IR es crítica.']
      ],
      c: [['Ingeniería de requerimientos', 'Proceso de descubrir, analizar, documentar, validar y administrar requerimientos.'], ['Trazabilidad', 'Capacidad de vincular cada requerimiento con su origen, diseño, código y pruebas.']] },

    { id: '3.2', t: 'Estudio de viabilidad',
      md: `El **estudio de viabilidad** es un análisis corto al inicio que responde: **¿el sistema contribuye a los objetivos de la organización, se puede construir con la tecnología y el presupuesto disponibles, y se puede integrar con lo que ya existe?**

### Tipos de viabilidad
| Tipo | Pregunta |
|---|---|
| **Técnica** | ¿Existe la tecnología? ¿El equipo sabe usarla? |
| **Económica** | ¿Los beneficios superan los costos? (análisis costo-beneficio, retorno de inversión) |
| **Operativa** | ¿Los usuarios lo usarán? ¿Encaja con la forma de trabajar? |
| **Legal** | ¿Cumple leyes (protección de datos personales, licencias)? |
| **De tiempo (calendario)** | ¿Se puede terminar en el plazo requerido? |

### Preguntas típicas
- ¿Qué pasaría si **no** se construye el sistema?
- ¿Qué problemas tiene el proceso actual?
- ¿Cómo ayudará el sistema a la organización?
- ¿Qué información necesita y de dónde se obtiene?
- ¿Se puede integrar con otros sistemas?

### Resultado
Un **informe de viabilidad** que recomienda **seguir, modificar el alcance o cancelar** el proyecto.

### Análisis costo-beneficio simple
| Concepto | Monto |
|---|---|
| Costos de desarrollo | $80 000 |
| Costos anuales de operación | $10 000 |
| Ahorro anual estimado | $50 000 |
| **Recuperación de la inversión** | 80 000 / (50 000 − 10 000) = **2 años** |`,
      clave: ['Viabilidad técnica, económica, operativa, legal, de tiempo', 'Informe: seguir, ajustar o cancelar', 'Costo-beneficio y recuperación de la inversión'],
      pr: { p: 'Escribe un estudio de viabilidad de una página para tu proyecto con los 5 tipos de viabilidad y una recomendación final.', r: 'Técnica: el equipo conoce JavaScript y una base de datos; hay servidores disponibles. Económica: herramientas gratuitas y trabajo del equipo. Operativa: los usuarios ya usan el celular para todo. Legal: aviso de privacidad por manejar datos de alumnos. Tiempo: el núcleo cabe en el semestre. Recomendación: seguir con alcance reducido.' },
      q: [
        ['"¿Los usuarios realmente usarán el sistema?" es viabilidad…', ['Técnica', 'Económica', 'Operativa', 'Legal'], 2, 'Aceptación y encaje con la operación.'],
        ['Inversión $60 000, ahorro neto anual $20 000. ¿Recuperación?', ['1 año', '2 años', '3 años', '6 años'], 2, '60 000 / 20 000 = 3.'],
        ['El resultado del estudio de viabilidad es…', ['El código', 'Una recomendación de seguir, ajustar o cancelar', 'El plan de pruebas', 'El diagrama de clases'], 1, 'Informe de viabilidad.']
      ],
      c: [['Viabilidad operativa', 'Si el sistema encaja con la organización y será usado.'], ['Análisis costo-beneficio', 'Comparación de costos del sistema contra los beneficios esperados.']] },

    { id: '3.3', t: 'Obtención y análisis de requerimientos', sub: ['3.3.1 Requerimientos funcionales, no funcionales y de dominio', '3.3.2 Stakeholders', '3.3.3 Técnicas para la obtención de requerimientos'],
      md: `### Tipos de requerimientos
- **Funcionales (RF)**: servicios que el sistema debe proporcionar, cómo reacciona a entradas y cómo se comporta. *"El sistema permitirá al alumno descargar su boleta en PDF."*
- **No funcionales (RNF)**: **restricciones y propiedades** del sistema: rendimiento, seguridad, usabilidad, disponibilidad, plataforma, normas. *"La boleta se generará en menos de 2 segundos."*
  - De **producto** (rendimiento, fiabilidad, seguridad), **organizacionales** (lenguaje, proceso, entrega) y **externos** (legales, éticos, de interoperabilidad).
- **De dominio**: vienen del **área de aplicación** y reflejan sus reglas. *"La calificación mínima aprobatoria es 6.0 según el reglamento escolar."*

> Un RNF debe ser **medible**. "El sistema debe ser rápido" es malo; "responder en menos de 2 s con 200 usuarios concurrentes" es bueno.

### Stakeholders (interesados)
Toda persona u organización **afectada por el sistema o que influye en sus requerimientos**: usuarios finales, clientes que pagan, administradores, directivos, personal de soporte, reguladores, otros sistemas, el propio equipo de desarrollo. Se identifican con una **tabla de actores/interesados** (como la que trae tu plantilla de casos de uso).

### Técnicas de obtención
| Técnica | Cuándo usarla |
|---|---|
| **Entrevistas** (cerradas, abiertas) | Comprender necesidades de personas clave |
| **Cuestionarios / encuestas** | Muchos usuarios dispersos |
| **Observación / etnografía** | Entender cómo se trabaja realmente (lo que la gente no dice) |
| **Talleres / lluvia de ideas / JAD** | Reunir a varios stakeholders para acordar |
| **Análisis de documentos** | Formularios, reglamentos, sistemas actuales |
| **Prototipos** | Cuando el usuario no sabe expresar lo que quiere |
| **Escenarios e historias de usuario** | Describir interacciones concretas |
| **Casos de uso** | Modelar la interacción actor-sistema |

### Problemas típicos
Los stakeholders no saben lo que quieren, usan su propio vocabulario, tienen requisitos contradictorios, hay factores políticos y los requisitos cambian.`,
      clave: ['Funcionales: qué hace', 'No funcionales: restricciones medibles', 'De dominio: reglas del área', 'Stakeholders y técnicas: entrevistas, observación, talleres, prototipos'],
      pr: { p: 'Clasifica como RF, RNF o de dominio: (a) el sistema enviará un correo al registrar un pedido, (b) la app funcionará en Android 10 o superior, (c) un alumno no puede inscribir más de 8 materias por reglamento, (d) la contraseña se almacenará cifrada, (e) el administrador podrá dar de baja usuarios.', r: '(a) RF. (b) RNF. (c) De dominio. (d) RNF (seguridad). (e) RF.' },
      q: [
        ['"El sistema responderá en menos de 3 segundos" es un requerimiento…', ['Funcional', 'No funcional', 'De dominio', 'De usuario'], 1, 'Rendimiento.'],
        ['¿Qué técnica revela cómo se trabaja realmente, más allá de lo que la gente dice?', ['Cuestionario', 'Observación (etnografía)', 'Análisis de documentos', 'Lluvia de ideas'], 1, 'Se observa el trabajo real.'],
        ['Un stakeholder es…', ['Solo el programador', 'Cualquiera afectado por el sistema o que influye en sus requerimientos', 'Solo el cliente que paga', 'Un tipo de prueba'], 1, 'Incluye usuarios, clientes, reguladores, etc.']
      ],
      c: [['Requerimiento funcional', 'Describe un servicio o comportamiento del sistema.'], ['Requerimiento no funcional', 'Restricción o propiedad del sistema (rendimiento, seguridad, usabilidad); debe ser medible.'], ['Requerimiento de dominio', 'Requisito derivado de las reglas del área de aplicación.'], ['Stakeholder', 'Persona u organización afectada por el sistema o con influencia en sus requisitos.']] },

    { id: '3.4', t: 'Especificación de requerimientos', sub: ['3.4.1 Requerimientos de usuario y del sistema', '3.4.2 Especificación en lenguaje natural', '3.4.3 Prototipo rápido de los requerimientos', '3.4.4 Diagramas de casos de uso', '3.4.5 Documentación de casos de uso'],
      md: `### Requerimientos de usuario vs del sistema
- **De usuario**: lenguaje natural y diagramas sencillos; para clientes y usuarios. *"El alumno podrá consultar sus calificaciones."*
- **Del sistema**: descripciones detalladas de funciones, servicios y restricciones; para desarrolladores. *"RS-1.1 El sistema mostrará las calificaciones del periodo actual agrupadas por materia, con la calificación de cada parcial y el promedio redondeado a un decimal."*

### Lenguaje natural bien escrito
- Usa una plantilla: **ID – El sistema deberá + verbo + objeto + condición**.
- Usa **"deberá"** para obligatorios y **"podrá"** para deseables.
- Una idea por requerimiento. Evita palabras ambiguas: *rápido, fácil, amigable, etc., normalmente*.
- Incluye la **razón** y la **prioridad**.

### Prototipo rápido
Maquetas de pantallas (en papel o **Figma**) para validar con el usuario que entendiste lo que necesita. Barato de cambiar.

### Diagrama de casos de uso (UML)
- **Actor** (monigote): rol externo que interactúa (persona u otro sistema).
- **Caso de uso** (óvalo): funcionalidad que da un resultado de valor al actor. Nombre con **verbo en infinitivo**: *Registrar pedido*.
- **Límite del sistema** (rectángulo).
- Relaciones:
  - **Asociación**: línea actor–caso de uso.
  - **«include»**: el caso base **siempre** incluye a otro (flecha punteada del base al incluido). *Pagar «include» Validar tarjeta*.
  - **«extend»**: el caso extendido agrega comportamiento **opcional** al base en un punto de extensión (flecha punteada del que extiende al base). *Aplicar cupón «extend» Pagar*.
  - **Generalización**: herencia entre actores o casos de uso (flecha con triángulo hueco).

### Documentación de un caso de uso (formato de tu plantilla)
| Campo | Contenido |
|---|---|
| Nombre/ID | CU-03 Registrar pedido |
| Descripción | Objetivo del caso de uso |
| Requerimientos | RF que cubre |
| Actores | Cliente |
| **Precondiciones** | El cliente inició sesión |
| **Flujo normal** | Pasos numerados en dos columnas: Actor / Sistema |
| **Flujos alternos** | Excepciones (3a. Producto sin existencia…) |
| **Postcondiciones** | El pedido queda registrado con estado "pendiente" |
| Requerimientos especiales | RNF relacionados |
| Puntos de extensión | Dónde se conecta un «extend» |`,
      clave: ['Usuario (cliente) vs sistema (desarrollador)', 'Plantilla: El sistema deberá…; evitar ambigüedad', 'Actores, casos de uso, «include» vs «extend»', 'Plantilla: precondiciones, flujo normal, alternos, postcondiciones'],
      pr: { p: 'En StarUML dibuja el diagrama de casos de uso de tu proyecto (mínimo 2 actores, 6 casos de uso, 1 include y 1 extend). Luego documenta un caso con la plantilla de casos de uso de tu carpeta.', r: 'Revisa: todos los casos con verbo en infinitivo, actores fuera del límite del sistema, include apuntando al caso incluido, extend apuntando al caso base, y que el flujo normal alterne pasos del actor y del sistema.' },
      q: [
        ['En «include», el caso incluido se ejecuta…', ['Opcionalmente', 'Siempre que se ejecuta el caso base', 'Nunca', 'Solo si hay error'], 1, 'Comportamiento obligatorio compartido.'],
        ['¿Qué palabra es un indicio de ambigüedad en un requerimiento?', ['deberá', 'amigable', 'mostrará', 'registrará'], 1, '"Amigable" no se puede medir.'],
        ['Las precondiciones de un caso de uso describen…', ['El estado del sistema después', 'Lo que debe cumplirse antes de iniciar', 'Los errores', 'Los actores'], 1, 'Estado previo requerido.']
      ],
      c: [['«include»', 'El caso base siempre incorpora el comportamiento del caso incluido.'], ['«extend»', 'Comportamiento opcional que extiende a un caso base en un punto de extensión.'], ['Actor', 'Rol externo (persona o sistema) que interactúa con el sistema.'], ['Postcondición', 'Estado en que queda el sistema tras ejecutar el caso de uso.']] },

    { id: '3.5', t: 'Verificación y validación de requerimientos',
      md: `- **Validación**: ¿construimos el producto **correcto**? → ¿los requerimientos reflejan lo que el cliente realmente necesita?
- **Verificación**: ¿construimos el producto **correctamente**? → ¿la especificación es consistente, completa y cumple las normas?

(Barry Boehm: *validation: are we building the right product? verification: are we building the product right?*)

### Qué se revisa en los requerimientos
| Criterio | Pregunta |
|---|---|
| **Validez** | ¿Es lo que el usuario necesita? |
| **Consistencia** | ¿Hay requerimientos que se contradigan? |
| **Completitud** | ¿Están todas las funciones y restricciones? |
| **Realismo** | ¿Se pueden implementar con el presupuesto y la tecnología? |
| **Verificabilidad** | ¿Se puede escribir una prueba que lo compruebe? |
| **No ambigüedad** | ¿Admite una sola interpretación? |
| **Concisión** | ¿Está expresado sin palabras de más? |
| **Trazabilidad** | ¿Se conoce su origen? |

Los formatos de tu carpeta (FMR_005.3 Ejecución de casos de prueba) evalúan justamente **concisión, no contradicción y no ambigüedad** de cada requerimiento.

### Técnicas
- **Revisiones** e **inspecciones** formales con el equipo y el cliente (lectura sistemática con lista de verificación).
- **Prototipos**: el usuario prueba y confirma.
- **Generación de casos de prueba**: si no puedes escribir una prueba, el requerimiento está mal escrito.
- **Análisis de consistencia** automatizado (si la especificación es formal).`,
      clave: ['Validación: producto correcto', 'Verificación: producto hecho correctamente', 'Criterios: validez, consistencia, completitud, realismo, verificabilidad', 'Revisiones, prototipos, casos de prueba'],
      pr: { p: 'Revisa estos requerimientos y corrige: (a) "El sistema será rápido y fácil de usar". (b) "El usuario podrá eliminar pedidos" y "Ningún pedido se borrará del sistema". (c) "El sistema mostrará reportes, etc."', r: '(a) Ambiguo, no verificable → "El 90% de los usuarios completará un pedido en menos de 2 minutos; cada pantalla carga en menos de 2 s". (b) Contradicción → "El usuario podrá cancelar pedidos; el pedido cambia a estado cancelado y se conserva en el historial". (c) Incompleto → listar qué reportes exactamente.' },
      q: [
        ['"¿Estamos construyendo el producto correcto?" corresponde a…', ['Verificación', 'Validación', 'Implementación', 'Despliegue'], 1, 'Validación = lo que el cliente necesita.'],
        ['Dos requerimientos que se contradicen fallan en…', ['Completitud', 'Consistencia', 'Realismo', 'Trazabilidad'], 1, 'No deben contradecirse.'],
        ['Un requerimiento verificable es aquel que…', ['Está en inglés', 'Puede comprobarse con una prueba', 'Lo pide el jefe', 'Es corto'], 1, 'Medible y comprobable.']
      ],
      c: [['Validación', '¿Estamos construyendo el producto correcto?'], ['Verificación', '¿Estamos construyendo el producto correctamente?'], ['Inspección', 'Revisión formal y sistemática de un documento con lista de verificación.']] },

    { id: '3.6', t: 'Negociación de requerimientos',
      md: `Los stakeholders casi siempre piden **más de lo que se puede hacer** y a veces piden cosas **opuestas**. La negociación busca un acuerdo **ganar-ganar**.

### Pasos (Pressman, modelo Win-Win de Boehm)
1. **Identificar** a los stakeholders clave.
2. Determinar las **condiciones de victoria** de cada uno (qué necesita para sentirse satisfecho).
3. **Negociar** para conciliar esas condiciones en un conjunto de requisitos que todos acepten.

### Técnicas de priorización
- **MoSCoW**: debe, debería, podría, no esta vez.
- **Escala de 1 a 5** de valor y de costo; se calcula valor/costo.
- **Votación con puntos**: cada stakeholder reparte 100 puntos entre los requisitos.
- **Kano**: requisitos básicos (si faltan, molestan), de desempeño (más es mejor) y de **deleite** (sorprenden).

### Resolver conflictos
- Volver a los **objetivos del negocio**: ¿cuál requisito contribuye más?
- Buscar una **alternativa** que satisfaga ambas necesidades.
- **Dividir en fases**: lo indispensable ahora, lo demás en una versión posterior.
- Documentar las **decisiones y razones**.

### Ejemplo
Dirección quiere que el sistema guarde la ubicación de los alumnos en todo momento (control); los alumnos lo rechazan (privacidad). Acuerdo: registrar la ubicación **solo al pasar lista** dentro del campus, con aviso de privacidad y consentimiento.`,
      clave: ['Win-Win: condiciones de victoria', 'Priorización: MoSCoW, valor/costo, 100 puntos, Kano', 'Resolver conflictos con objetivos del negocio y fases'],
      pr: { p: 'Tu proyecto tiene 10 requisitos y solo da tiempo para 6. Usa la técnica de 100 puntos con 3 compañeros como stakeholders y decide cuáles entran.', r: 'Suma los puntos de cada requisito y ordénalos; los 6 con mayor puntaje entran. Si dos empatan, compara su costo: entra el de mejor relación valor/costo.' },
      q: [
        ['El modelo de negociación de Boehm se llama…', ['Win-Win', 'Lose-Lose', 'Top-Down', 'Kanban'], 0, 'Busca que todos ganen.'],
        ['En el modelo Kano, una función que sorprende y gusta pero no se esperaba es de…', ['Básica', 'Desempeño', 'Deleite', 'Dominio'], 2, 'Atractiva o de deleite.'],
        ['Una forma de resolver un conflicto de requisitos es…', ['Ignorar a un stakeholder', 'Dividir en fases o buscar una alternativa', 'Cancelar el proyecto siempre', 'Implementar ambos aunque se contradigan'], 1, 'Buscar acuerdo.']
      ],
      c: [['Condiciones de victoria', 'Lo que un stakeholder necesita para considerar exitoso el sistema.'], ['Modelo Kano', 'Clasifica requisitos en básicos, de desempeño y de deleite.']] },

    { id: '3.7', t: 'Documento de requerimientos (ERS)',
      md: `El **documento de requerimientos** o **Especificación de Requerimientos de Software (ERS / SRS)** es la declaración oficial de lo que deben implementar los desarrolladores. Estándar de referencia: **IEEE 830-1998**, sustituido por **ISO/IEC/IEEE 29148**.

### Estructura típica (IEEE 830)
1. **Introducción**
   1.1 Propósito · 1.2 Alcance · 1.3 Definiciones, acrónimos y abreviaturas · 1.4 Referencias · 1.5 Visión general del documento
2. **Descripción general**
   2.1 Perspectiva del producto · 2.2 Funciones del producto · 2.3 Características de los usuarios · 2.4 Restricciones · 2.5 Suposiciones y dependencias
3. **Requerimientos específicos**
   3.1 Interfaces externas (usuario, hardware, software, comunicaciones) · 3.2 Requerimientos funcionales · 3.3 Requerimientos de rendimiento · 3.4 Restricciones de diseño · 3.5 Atributos (fiabilidad, seguridad, mantenibilidad…) · 3.6 Otros
4. **Apéndices** e **índice**

Tu plantilla ("Esquema general del documento de requerimientos", de Adelaide Bianchini) sigue una estructura parecida: introducción, alcance, glosario, documentos relacionados, **descripción de casos de uso** (tabla de actores, tabla de casos de uso, diagramas y especificación de cada caso), requerimientos funcionales y no funcionales.

### Características de una buena ERS (IEEE 830)
**Correcta, no ambigua, completa, consistente, clasificada por importancia, verificable, modificable y trazable.**

### Quién la usa
Clientes (verifican que se entendió), gerentes (planean), desarrolladores (construyen), testers (diseñan pruebas), mantenimiento (entienden el sistema).

### Formato de cada requerimiento
| ID | Nombre | Descripción | Prioridad | Fuente | Estado |
|---|---|---|---|---|---|
| RF-04 | Consultar calificaciones | El sistema deberá mostrar al alumno… | Alta | Servicios escolares | Aprobado |`,
      clave: ['ERS / SRS', 'IEEE 830 → ISO/IEC/IEEE 29148', 'Estructura: introducción, descripción general, requerimientos específicos', 'Correcta, no ambigua, completa, consistente, verificable, trazable'],
      pr: { p: 'Arma el índice del documento de requerimientos de tu proyecto usando la plantilla de tu carpeta y llena la sección 1 (Introducción: propósito, alcance y glosario).', r: 'Propósito: para quién y para qué es el documento. Alcance: qué hará y qué NO hará el sistema. Glosario: términos del dominio y la sintaxis de IDs (RF-xx, RNF-xx, CU-xx).' },
      q: [
        ['¿Qué estándar clásico define la estructura de una ERS?', ['IEEE 830', 'ISO 9001', 'IEEE 802.3', 'ISO 25010'], 0, 'Hoy actualizado por ISO/IEC/IEEE 29148.'],
        ['¿En qué sección de la ERS van los requerimientos funcionales?', ['Introducción', 'Descripción general', 'Requerimientos específicos', 'Apéndices'], 2, 'Sección 3.'],
        ['¿Qué característica de la ERS permite cambiarla sin romper su estructura?', ['Modificable', 'Ambigua', 'Extensa', 'Secreta'], 0, 'Bien organizada y sin redundancia.']
      ],
      c: [['ERS / SRS', 'Especificación de Requerimientos de Software: documento oficial de lo que debe hacer el sistema.'], ['ISO/IEC/IEEE 29148', 'Norma actual de ingeniería de requerimientos que sustituye a IEEE 830.']] },

    { id: '3.8', t: 'Plan de pruebas', sub: ['3.8.1 Serie de estándares ISO/IEC/IEEE 29119', '3.8.2 Creación del plan de pruebas', '3.8.3 Diseño de casos de prueba de aceptación'],
      md: `### ISO/IEC/IEEE 29119 (pruebas de software)
| Parte | Contenido |
|---|---|
| **29119-1** | Conceptos y definiciones |
| **29119-2** | Procesos de prueba (organizacionales, de gestión y dinámicos) |
| **29119-3** | **Documentación de pruebas** (plantillas: plan, especificación de casos, informes) |
| **29119-4** | **Técnicas de prueba** (caja negra, caja blanca, basadas en experiencia) |
| 29119-5 | Pruebas dirigidas por palabras clave |

Sustituyó a estándares como **IEEE 829** (documentación de pruebas).

### Contenido de un plan de pruebas
Alcance (qué se prueba y **qué no**), estrategia y niveles de prueba, criterios de entrada/salida y de aceptación, recursos y roles, calendario, ambiente de pruebas, riesgos, entregables. Tu formato **FMR_005.1** pide: descripción general, alcance, estrategia, estimación de tiempo y recursos, historia de cambios y aprobaciones.

### Proceso con los formatos de tu carpeta
1. **FMR_005.1 Planeación**: qué requerimientos se probarán y cómo.
2. **FMR_005.2 Diseño de casos de prueba**: por requerimiento, características de evaluación y funcionalidades.
3. **FMR_005.3 Ejecución**: resultado de cada caso (concisión, no contradicción, no ambigüedad, comentarios, número de error).
4. **FMR_005.4 Informe final**: alcance, eventos, lecciones aprendidas, consolidado de reportes y aprobación.

### Casos de prueba de aceptación
Verifican que el sistema cumple los requerimientos **desde el punto de vista del usuario** (caja negra). Se derivan de los **casos de uso**: un caso de prueba por el flujo normal y uno por cada flujo alterno.

| Campo | Ejemplo |
|---|---|
| ID | CP-01 |
| Requerimiento / CU | RF-01 / CU-01 Iniciar sesión |
| Precondiciones | Usuario registrado y activo |
| Datos de entrada | Matrícula 2023001, contraseña válida |
| Pasos | 1. Abrir login 2. Capturar datos 3. Presionar Entrar |
| **Resultado esperado** | Se muestra el panel del alumno |
| Resultado obtenido | (al ejecutar) |
| Estado | Aprobado / Fallido |

### Técnicas de caja negra útiles
- **Partición de equivalencia**: dividir entradas en clases que se comportan igual (calificación válida 0-10, inválida <0, inválida >10).
- **Valores límite**: probar en los bordes (−0.1, 0, 10, 10.1).
- **Tablas de decisión** para reglas combinadas.`,
      clave: ['ISO/IEC/IEEE 29119 partes 1-5', 'Plan: alcance, estrategia, criterios, recursos, calendario', 'Formatos FMR_005.1 a .4', 'Casos de aceptación desde casos de uso; partición y valores límite'],
      pr: { p: 'Diseña 4 casos de prueba de aceptación para el caso de uso "Iniciar sesión": flujo normal, contraseña incorrecta, usuario inexistente y campos vacíos. Usa la tabla de la lección.', r: 'CP-01 credenciales válidas → panel. CP-02 contraseña incorrecta → mensaje "Usuario o contraseña incorrectos", sin revelar cuál falló. CP-03 usuario inexistente → mismo mensaje. CP-04 campos vacíos → validación "Campo obligatorio" y no se envía el formulario.' },
      q: [
        ['¿Qué parte de ISO/IEC/IEEE 29119 trata la documentación de pruebas?', ['Parte 1', 'Parte 2', 'Parte 3', 'Parte 4'], 2, 'Plantillas de plan, casos e informes.'],
        ['Las pruebas de aceptación se diseñan principalmente a partir de…', ['El código fuente', 'Los casos de uso y requerimientos', 'El diagrama de despliegue', 'La base de datos'], 1, 'Perspectiva del usuario.'],
        ['Si una calificación válida va de 0 a 10, ¿qué valores prueba el análisis de valores límite?', ['5 y 7', '-0.1, 0, 10 y 10.1', 'Solo 0', '100'], 1, 'Los bordes y justo fuera de ellos.']
      ],
      c: [['ISO/IEC/IEEE 29119', 'Serie de estándares internacionales de pruebas de software.'], ['Partición de equivalencia', 'Dividir las entradas en clases que el sistema trata igual y probar un valor por clase.'], ['Prueba de aceptación', 'Verifica que el sistema cumple los requisitos desde el punto de vista del usuario.']] }
  ]},

  { n: 4, titulo: 'Análisis y diseño', temas: [
    { id: '4.1', t: 'Definiciones de análisis y diseño de sistemas',
      md: `- **Análisis**: estudiar el **problema** y modelar **qué** debe hacer el sistema, en términos del dominio, sin decidir la tecnología. *Pregunta: ¿qué?*
- **Diseño**: decidir **cómo** se construirá la solución: arquitectura, componentes, interfaces, datos y algoritmos. *Pregunta: ¿cómo?*

| | Análisis | Diseño |
|---|---|---|
| Enfoque | Problema | Solución |
| Lenguaje | Del dominio (alumno, materia, boleta) | Técnico (controlador, repositorio, API) |
| Productos | Modelo de casos de uso, clases del dominio, DFD, diagramas de estados | Arquitectura, clases de la solución, diagramas de secuencia, despliegue, interfaz |
| Independiente de la tecnología | Sí | No |

### Dos grandes enfoques
- **Análisis estructurado**: ve el sistema como **procesos que transforman datos** (DFD, diccionario de datos, modelo entidad-relación).
- **Análisis orientado a objetos**: ve el sistema como **objetos que colaboran** (UML: clases, objetos, estados, secuencia).

### Principios de diseño (Pressman)
**Abstracción**, **arquitectura**, **patrones**, **separación de intereses**, **modularidad**, **ocultamiento de información**, **independencia funcional** (alta cohesión, bajo acoplamiento), **refinamiento**, **refactorización**.

### UML: 14 diagramas en dos grupos
- **Estructurales**: clases, objetos, componentes, despliegue, paquetes, estructura compuesta, perfiles, **artefactos** (dentro de despliegue).
- **De comportamiento**: casos de uso, actividades, **estados**, y de interacción: **secuencia**, **comunicación (colaboración)**, tiempos, vista general de interacción.`,
      clave: ['Análisis = qué; diseño = cómo', 'Estructurado (procesos y datos) vs orientado a objetos', 'Principios: abstracción, modularidad, ocultamiento', 'UML: estructurales y de comportamiento'],
      pr: { p: 'Toma un caso de uso de tu proyecto. Escribe 3 elementos del modelo de análisis y 3 del modelo de diseño que le correspondan.', r: 'CU Registrar pedido. Análisis: clases Cliente, Pedido, Producto; estados del pedido. Diseño: PedidoController, PedidoRepository con MySQL, endpoint POST /api/pedidos, pantalla de carrito.' },
      q: [
        ['El análisis responde principalmente a…', ['¿Cómo?', '¿Qué?', '¿Cuándo?', '¿Cuánto cuesta?'], 1, 'Qué debe hacer el sistema.'],
        ['¿Cuál es un diagrama UML de comportamiento?', ['Clases', 'Despliegue', 'Secuencia', 'Paquetes'], 2, 'Diagrama de interacción.'],
        ['El análisis estructurado modela el sistema como…', ['Objetos que colaboran', 'Procesos que transforman datos', 'Pantallas', 'Servidores'], 1, 'DFD y modelo de datos.']
      ],
      c: [['Análisis', 'Modelar qué debe hacer el sistema en términos del dominio.'], ['Diseño', 'Decidir cómo se construirá: arquitectura, componentes, datos, interfaces.']] },

    { id: '4.2', t: 'Análisis estructurado: DFD y modelado de datos', sub: ['4.2.1 Diagramas de flujo de datos', '4.2.2 Modelado de datos'],
      md: `### Diagrama de flujo de datos (DFD)
Muestra cómo **fluyen y se transforman los datos**. No muestra decisiones ni orden temporal (no es un diagrama de flujo de programa).

| Elemento | Símbolo (Yourdon/DeMarco) | Ejemplo |
|---|---|---|
| **Entidad externa** | Rectángulo | Alumno, Banco |
| **Proceso** | Círculo (burbuja) | 1.0 Registrar inscripción |
| **Flujo de datos** | Flecha con nombre | datos de inscripción |
| **Almacén de datos** | Dos líneas paralelas | D1 Alumnos |

**Niveles**
- **Nivel 0 o diagrama de contexto**: un solo proceso (todo el sistema) y las entidades externas.
- **Nivel 1**: los procesos principales.
- **Nivel 2+**: se descompone cada proceso. Debe haber **balanceo**: las entradas y salidas del proceso padre aparecen en su descomposición.

**Reglas**: los datos no pueden ir de entidad a entidad, de almacén a almacén, ni de entidad a almacén **sin pasar por un proceso**. Todo proceso tiene al menos una entrada y una salida.

### Modelado de datos: modelo entidad-relación (E-R)
- **Entidad**: objeto del que se guarda información (Alumno, Materia).
- **Atributo**: propiedad (matrícula, nombre). El **identificador** o clave primaria se subraya.
- **Relación**: asociación entre entidades (Alumno *cursa* Materia).
- **Cardinalidad**: 1:1, 1:N, N:M. Una relación **N:M** se convierte en una tabla intermedia (Inscripción con matrícula, clave de materia y calificación).

**Diccionario de datos**: define cada flujo, almacén y dato: *Alumno = matrícula + nombre + carrera + semestre*.`,
      clave: ['DFD: entidades, procesos, flujos, almacenes', 'Diagrama de contexto (nivel 0) y balanceo', 'Los datos siempre pasan por un proceso', 'Modelo E-R, cardinalidades, N:M → tabla intermedia'],
      pr: { p: 'Dibuja el diagrama de contexto y el DFD de nivel 1 del proceso de inscripción de tu universidad. Luego el modelo E-R con Alumno, Materia, Grupo y Profesor.', r: 'Contexto: Alumno ↔ [0 Sistema de inscripción] ↔ Servicios escolares; Profesor recibe lista. Nivel 1: 1.0 Validar alumno, 2.0 Seleccionar materias, 3.0 Registrar inscripción, 4.0 Generar horario; almacenes D1 Alumnos, D2 Grupos, D3 Inscripciones. E-R: Alumno N:M Grupo (vía Inscripción), Grupo N:1 Materia, Grupo N:1 Profesor.' },
      q: [
        ['En un DFD, el almacén de datos se representa con…', ['Un círculo', 'Dos líneas paralelas', 'Un rombo', 'Un monigote'], 1, 'Notación Yourdon/DeMarco.'],
        ['El diagrama de contexto contiene…', ['Todos los procesos detallados', 'Un solo proceso que representa todo el sistema', 'Solo almacenes', 'Clases'], 1, 'Nivel 0.'],
        ['Una relación muchos a muchos se implementa con…', ['Una sola tabla', 'Una tabla intermedia', 'Un atributo multivalor', 'Un DFD'], 1, 'Tabla de asociación con ambas claves.']
      ],
      c: [['DFD', 'Diagrama que muestra cómo fluyen y se transforman los datos entre entidades, procesos y almacenes.'], ['Balanceo de DFD', 'Las entradas y salidas de un proceso deben conservarse en su descomposición.'], ['Cardinalidad', 'Número de ocurrencias que participan en una relación (1:1, 1:N, N:M).']] },

    { id: '4.3', t: 'Análisis orientado a objetos', sub: ['4.3.1 Diagrama de clases del dominio', '4.3.2 Diagrama de objetos', '4.3.3 Diagramas de estados'],
      md: `### Diagrama de clases del dominio (modelo conceptual)
Representa los **conceptos del mundo real** y sus relaciones, **sin métodos ni detalles técnicos**. Una forma de encontrar clases: subraya los **sustantivos** en los casos de uso.

Elementos:
- **Clase**: rectángulo con nombre y atributos.
- **Asociación**: línea con nombre y **multiplicidad** en cada extremo: 1, 0..1, * (0 o más), 1..*.
- **Generalización** (herencia): triángulo hueco hacia la clase padre (Persona ← Alumno, Profesor).
- **Agregación** (rombo hueco): "tiene", las partes pueden existir solas (Grupo ◇— Alumno).
- **Composición** (rombo relleno): las partes **no existen sin el todo** (Pedido ◆— LíneaDePedido).

~~~text
Alumno 1 ──── cursa ──── * Inscripción * ──── 1 Grupo
Grupo  * ──── de   ──── 1 Materia
~~~

### Diagrama de objetos
Una **foto en un instante**: **instancias** concretas con valores. Sirve para validar el diagrama de clases con ejemplos.
Notación: nombre subrayado **objeto : Clase** → *ana : Alumno* con matrícula = "2023001".

### Diagrama de estados (máquina de estados)
Describe el **ciclo de vida de un objeto**: en qué estados puede estar y qué **eventos** lo hacen cambiar.
- **Estado** (rectángulo redondeado), **estado inicial** (círculo negro), **estado final** (círculo con anillo).
- **Transición**: flecha etiquetada **evento [condición] / acción**.

~~~text
● → Pendiente --pagar [pago aprobado] / generarFolio--> Pagado
Pagado --enviar--> Enviado --confirmarEntrega--> Entregado → ◉
Pendiente --cancelar--> Cancelado → ◉
~~~

Úsalo para objetos con comportamiento interesante: pedidos, solicitudes, tickets, cuentas.`,
      clave: ['Clases del dominio sin métodos; sustantivos de los casos de uso', 'Multiplicidad, herencia, agregación vs composición', 'Diagrama de objetos: instancias con valores', 'Estados: evento [condición] / acción'],
      pr: { p: 'En StarUML haz el diagrama de clases del dominio de tu proyecto (mínimo 6 clases, una herencia y una composición), un diagrama de objetos con 2 instancias por clase principal y el diagrama de estados de su objeto más importante.', r: 'Revisa que el diagrama de dominio no tenga métodos ni tipos técnicos (como List<String>), que cada asociación tenga multiplicidad y que cada transición del diagrama de estados tenga un evento.' },
      q: [
        ['El rombo relleno en UML representa…', ['Agregación', 'Composición', 'Herencia', 'Dependencia'], 1, 'La parte no existe sin el todo.'],
        ['Multiplicidad "1..*" significa…', ['Exactamente uno', 'Cero o uno', 'Uno o más', 'Ninguno'], 2, 'Al menos uno.'],
        ['En una transición "pagar [aprobado] / generarFolio", "[aprobado]" es…', ['El evento', 'La condición de guarda', 'La acción', 'El estado'], 1, 'evento [guarda] / acción.']
      ],
      c: [['Composición', 'Relación todo-parte fuerte: la parte se destruye con el todo (rombo relleno).'], ['Agregación', 'Relación todo-parte débil: la parte puede existir sola (rombo hueco).'], ['Diagrama de objetos', 'Instancias concretas y sus valores en un momento dado.'], ['Transición de estado', 'evento [condición] / acción.']] },

    { id: '4.4', t: 'Diseño arquitectónico', sub: ['4.4.1 Tipos de diseño arquitectónico', '4.4.2 Modelo MVC', '4.4.3 Diagramas de artefactos', '4.4.4 Diagramas de despliegue'],
      md: `La **arquitectura** es la estructura de alto nivel del sistema: sus **componentes**, sus **relaciones** y los principios que guían su diseño y evolución.

### Estilos arquitectónicos
| Estilo | Idea | Ejemplo |
|---|---|---|
| **Capas** | Cada capa usa solo a la de abajo (presentación → negocio → datos) | Aplicación web empresarial |
| **Cliente-servidor** | Clientes piden servicios a servidores | App móvil + API |
| **Repositorio** | Componentes comparten un almacén central de datos | IDE, sistemas de información |
| **Tubería y filtros** | Los datos pasan por filtros encadenados | Compiladores, procesamiento de imágenes |
| **MVC** | Separa datos, presentación y control | Frameworks web |
| **Microservicios** | Servicios pequeños e independientes que se comunican por red | Netflix, plataformas grandes |
| **Dirigida por eventos** | Componentes reaccionan a eventos publicados | Sistemas de mensajería, IoT |

### Modelo-Vista-Controlador (MVC)
- **Modelo**: datos y reglas de negocio. No sabe nada de la interfaz.
- **Vista**: presenta los datos al usuario.
- **Controlador**: recibe las acciones del usuario, actualiza el modelo y elige la vista.

Flujo: usuario → **Controlador** → **Modelo** (consulta/actualiza) → Controlador → **Vista** → usuario.
Ventajas: separación de intereses, varias vistas del mismo modelo, pruebas más fáciles, trabajo en paralelo. Frameworks: Laravel, Django (MTV), Spring MVC, ASP.NET MVC, Rails.

### Diagrama de artefactos
Un **artefacto** («artifact») es una pieza física de información producida por el desarrollo: archivo .jar, .apk, .war, script SQL, archivo de configuración, ejecutable. El diagrama muestra artefactos y cómo **manifiestan** (implementan) componentes o dependen entre sí.

### Diagrama de despliegue
Muestra el **hardware** y el **software de ejecución** donde se instalan los artefactos.
- **Nodo** (cubo 3D): «device» (servidor físico, teléfono) o «executionEnvironment» (JVM, Apache, Docker, MySQL).
- **Artefactos** dentro de los nodos.
- **Rutas de comunicación** entre nodos con el protocolo: HTTPS, TCP/IP, JDBC.

~~~text
[«device» Teléfono Android] --HTTPS--> [«device» Servidor Ubuntu
                                          «executionEnvironment» Nginx + Node
                                             «artifact» api.js ]
                                        --TCP 3306--> [«device» Servidor BD «executionEnvironment» MySQL]
~~~`,
      clave: ['Estilos: capas, cliente-servidor, repositorio, tubería y filtros, microservicios', 'MVC: modelo, vista, controlador', 'Artefacto = archivo físico (.jar, .apk, .sql)', 'Despliegue: nodos, artefactos, rutas con protocolo'],
      pr: { p: 'Dibuja en StarUML el diagrama de despliegue de tu proyecto (cliente, servidor de aplicación, servidor de base de datos) y explica en qué parte va cada elemento de MVC.', r: 'Vista: navegador o app móvil (y plantillas en el servidor si es render en servidor). Controlador y Modelo: en el servidor de aplicación. Los datos persistentes del Modelo: en el servidor de base de datos.' },
      q: [
        ['En MVC, ¿quién recibe las acciones del usuario?', ['El modelo', 'La vista', 'El controlador', 'La base de datos'], 2, 'Coordina modelo y vista.'],
        ['En un diagrama de despliegue, el cubo 3D representa…', ['Una clase', 'Un nodo', 'Un actor', 'Un estado'], 1, 'Hardware o entorno de ejecución.'],
        ['Un archivo .apk o .jar se modela como…', ['Actor', 'Artefacto', 'Caso de uso', 'Estado'], 1, 'Pieza física producida por el desarrollo.']
      ],
      c: [['MVC', 'Modelo (datos y reglas), Vista (presentación), Controlador (coordina las acciones del usuario).'], ['Nodo', 'Recurso computacional (dispositivo o entorno de ejecución) en un diagrama de despliegue.'], ['Arquitectura en capas', 'Organización en niveles donde cada capa usa los servicios de la inferior.']] },

    { id: '4.5', t: 'Diseño a nivel de componentes', sub: ['4.5.1 Modularidad, cohesión y acoplamiento', '4.5.2 Diagrama de paquetes', '4.5.3 Diagramas de clases de la solución', '4.5.4 Diagramas de secuencia', '4.5.5 Diagramas de colaboración', '4.5.6 Diagramas de actividades'],
      md: `### Modularidad, cohesión y acoplamiento
- **Modularidad**: dividir el sistema en **módulos** con nombre y responsabilidad propia.
- **Cohesión**: qué tan **relacionadas** están las responsabilidades **dentro** de un módulo. Queremos **alta cohesión** (un módulo hace una sola cosa bien). De mejor a peor: funcional, secuencial, comunicacional, procedimental, temporal, lógica, coincidental.
- **Acoplamiento**: qué tanto **depende** un módulo **de otros**. Queremos **bajo acoplamiento** (cambiar uno no rompe a los demás). De mejor a peor: por datos, por estampado, de control, externo, común, por contenido.

> Regla de oro: **alta cohesión, bajo acoplamiento**.

### Diagrama de paquetes
Agrupa elementos (clases, casos de uso) en **paquetes** (carpeta con pestaña) y muestra **dependencias** entre ellos (flecha punteada). Ejemplo: vista → controlador → modelo → acceso a datos. Evita dependencias **circulares**.

### Diagrama de clases de la solución (de diseño)
Evoluciona del modelo del dominio y agrega: **métodos**, **tipos de datos**, **visibilidad** (+ público, − privado, # protegido, ~ paquete), clases técnicas (controladores, repositorios, servicios), interfaces y dependencias.
~~~text
┌─────────────────────────┐
│ Pedido                  │
├─────────────────────────┤
│ - id: int               │
│ - fecha: Date           │
│ - estado: EstadoPedido  │
├─────────────────────────┤
│ + agregarLinea(p, cant) │
│ + calcularTotal(): float│
└─────────────────────────┘
~~~

### Diagrama de secuencia
Muestra la **interacción entre objetos ordenada en el tiempo** para un escenario (normalmente un caso de uso).
- **Líneas de vida** (verticales), **mensajes** (flechas horizontales; sólida = llamada, punteada = retorno), **barras de activación**.
- **Fragmentos combinados**: **alt** (alternativas, if-else), **opt** (opcional), **loop** (ciclo).

### Diagrama de comunicación (colaboración)
La **misma información** que el de secuencia, pero enfocada en **qué objetos se conectan**; los mensajes se **numeran** (1, 1.1, 2…) para indicar el orden.

### Diagrama de actividades
Modela **flujos de trabajo** o la lógica de un proceso o caso de uso.
- Nodo inicial (●), **acciones** (rectángulos redondeados), **decisión/fusión** (rombo) con **guardas** [condición], **fork/join** (barra gruesa) para paralelismo, nodo final (◉).
- **Carriles (swimlanes)** para indicar **quién** hace cada acción.`,
      clave: ['Alta cohesión, bajo acoplamiento', 'Paquetes y dependencias sin ciclos', 'Clases de diseño: métodos, tipos, visibilidad + − #', 'Secuencia (tiempo) vs comunicación (enlaces numerados)', 'Actividades: decisión, fork/join, carriles'],
      pr: { p: 'Para el caso de uso más importante de tu proyecto: haz en StarUML su diagrama de secuencia (Vista → Controlador → Modelo → Repositorio, con un fragmento alt para el error) y su diagrama de actividades con carriles para el usuario y el sistema.', r: 'Secuencia: el actor llama a la vista, la vista al controlador, el controlador valida y llama al modelo/repositorio; alt [datos válidos] guarda y responde éxito, [else] regresa mensaje de error. Actividades: carril Usuario (capturar datos, confirmar), carril Sistema (validar, rombo de decisión, guardar, notificar).' },
      q: [
        ['La meta de diseño ideal es…', ['Baja cohesión y alto acoplamiento', 'Alta cohesión y bajo acoplamiento', 'Alta cohesión y alto acoplamiento', 'Sin módulos'], 1, 'Módulos enfocados e independientes.'],
        ['En UML, el símbolo "−" antes de un atributo indica…', ['Público', 'Privado', 'Protegido', 'Estático'], 1, '+ público, − privado, # protegido.'],
        ['¿Qué fragmento del diagrama de secuencia representa un if-else?', ['loop', 'opt', 'alt', 'par'], 2, 'alt = alternativas.'],
        ['Para mostrar quién realiza cada acción en un diagrama de actividades se usan…', ['Paquetes', 'Carriles (swimlanes)', 'Líneas de vida', 'Nodos'], 1, 'Particiones por responsable.']
      ],
      c: [['Cohesión', 'Grado en que las responsabilidades de un módulo están relacionadas entre sí (se busca alta).'], ['Acoplamiento', 'Grado de dependencia entre módulos (se busca bajo).'], ['Fork / join', 'Barra que divide o une flujos paralelos en un diagrama de actividades.'], ['Diagrama de comunicación', 'Interacción centrada en los enlaces entre objetos, con mensajes numerados.']] },

    { id: '4.6', t: 'Diseño de la interfaz de usuario', sub: ['4.6.1 Proceso de diseño de la interfaz', '4.6.2 Ventajas de las interfaces gráficas', '4.6.3 Estilos primarios de interacción', '4.6.4 Estilos de presentación de la información', '4.6.5 Soporte al usuario', '4.6.6 Buenas prácticas', '4.6.7 Construcción del prototipo funcional', '4.6.8 Evaluación de la interfaz'],
      md: `### Proceso de diseño (centrado en el usuario)
1. **Análisis** de usuarios, tareas y entorno (¿quién?, ¿qué hace?, ¿dónde y con qué dispositivo?).
2. **Diseño** de la interfaz: flujo de pantallas, wireframes, estilo visual.
3. **Prototipado**: de baja fidelidad (papel) a alta fidelidad (Figma).
4. **Evaluación** con usuarios reales y **iteración**.

### Ventajas de las GUI
Fáciles de aprender, interacción directa (clic, arrastrar), varias ventanas, acceso rápido a cualquier punto, retroalimentación visual inmediata.

### Estilos primarios de interacción (Shneiderman)
| Estilo | Ventaja | Desventaja |
|---|---|---|
| **Manipulación directa** (arrastrar, tocar) | Intuitiva, rápida | Difícil de implementar |
| **Selección de menús** | No hay que memorizar comandos | Lenta para expertos |
| **Llenado de formularios** | Simple para captura de datos | Ocupa mucho espacio |
| **Lenguaje de comandos** (CLI) | Potente y flexible | Difícil de aprender |
| **Lenguaje natural** (voz, chat) | Accesible | Ambigüedad |

### Presentación de la información
- **Texto** cuando importa el valor exacto; **gráficas** cuando importan tendencias o comparaciones.
- Usa **color** con moderación y nunca como única señal (daltonismo).
- Agrupa información relacionada, alinea, usa jerarquía tipográfica.

### Soporte al usuario
Mensajes de error **claros y útiles** (qué pasó y cómo arreglarlo, sin culpar al usuario), ayuda en línea, tutoriales, documentación, validación en el momento.

### Buenas prácticas: las 10 heurísticas de Nielsen
1. Visibilidad del estado del sistema. 2. Coincidencia con el mundo real. 3. Control y libertad (deshacer). 4. Consistencia y estándares. 5. Prevención de errores. 6. Reconocer antes que recordar. 7. Flexibilidad y eficiencia. 8. Diseño estético y minimalista. 9. Ayudar a reconocer, diagnosticar y recuperarse de errores. 10. Ayuda y documentación.

Además: **accesibilidad** (contraste, tamaño de texto, teclado, lectores de pantalla — pautas WCAG) y diseño **responsivo**.

### Prototipo funcional
Prototipo interactivo en **Figma** (con enlaces entre pantallas) o una primera versión navegable en código (HTML/CSS) con datos simulados.

### Evaluación
- **Evaluación heurística**: expertos revisan contra las 10 heurísticas.
- **Pruebas de usabilidad**: usuarios reales hacen tareas mientras **piensan en voz alta**; se mide tiempo, errores y éxito.
- **Cuestionario SUS** (System Usability Scale): 10 preguntas, puntaje de 0 a 100 (más de 68 se considera por encima del promedio).`,
      clave: ['Proceso: análisis → diseño → prototipo → evaluación', 'Estilos: manipulación directa, menús, formularios, comandos, lenguaje natural', '10 heurísticas de Nielsen', 'Pruebas de usabilidad y SUS'],
      pr: { p: 'Haz en Figma el prototipo funcional de 4 pantallas de tu proyecto, conéctalas con interacciones y haz una prueba de usabilidad con 3 compañeros (una tarea cada uno). Anota tiempos, errores y 3 mejoras.', r: 'Ejemplo de hallazgos: el botón "Guardar" no se veía (heurística 1 y 8), el mensaje de error decía "Error 500" (heurística 9), no había forma de regresar sin perder datos (heurística 3).' },
      q: [
        ['Arrastrar un archivo a la papelera es un ejemplo de…', ['Lenguaje de comandos', 'Manipulación directa', 'Formulario', 'Lenguaje natural'], 1, 'Se actúa directamente sobre el objeto.'],
        ['"Mostrar una barra de progreso al subir un archivo" cumple la heurística de…', ['Consistencia', 'Visibilidad del estado del sistema', 'Minimalismo', 'Ayuda'], 1, 'El usuario sabe qué pasa.'],
        ['En una prueba de usabilidad, pedir al usuario que diga lo que piensa mientras usa el sistema es…', ['Pensar en voz alta', 'Evaluación heurística', 'Prueba unitaria', 'SUS'], 0, 'Think-aloud.']
      ],
      c: [['Heurísticas de Nielsen', '10 principios generales de usabilidad para evaluar interfaces.'], ['SUS', 'System Usability Scale: cuestionario de 10 preguntas con puntaje 0-100.'], ['Wireframe', 'Esquema de baja fidelidad de una pantalla, sin estilo visual final.']] }
  ]}
  ]
});
