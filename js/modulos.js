/* Aula 503 — registro de módulos.
   Cada módulo es un grupo de archivos que se carga en este orden. Para agregar una materia,
   un juego o un simulador: crea sus archivos y agrega una entrada aquí (ver docs/MODULOS.md).
   - esencial: si falla al cargar, la app no puede arrancar.
   - version: súbela cuando cambies el módulo; aparece en Ajustes → Módulos. */
window.AULA_MODULOS = [
  { id: 'plataforma', nombre: 'Plataforma (guardado, copias, actualizaciones)', version: '1.0', esencial: true,
    archivos: ['config.js', 'version.js', 'js/plataforma.js'] },
  { id: 'temarios', nombre: 'Temarios y lecturas: Redes, IA, Ing. de Software', version: '8.0', esencial: true,
    archivos: ['data/redes.js', 'data/ia.js', 'data/ingsoft.js', 'data/extra.js', 'data/facil-redes.js', 'data/facil-ia.js', 'data/facil-ingsoft.js'] },
  { id: 'glosario', nombre: 'Diccionario', version: '5.0', esencial: true,
    archivos: ['js/glosario.js'] },
  { id: 'sim-redes', nombre: 'Simulador de redes y consola Cisco', version: '5.0', esencial: true,
    archivos: ['js/netsim.js', 'js/cli.js', 'js/netview.js'] },
  { id: 'labs-ia', nombre: 'Laboratorios de IA', version: '5.0', esencial: true,
    archivos: ['js/ialabs.js'] },
  { id: 'labs-is', nombre: 'Laboratorios de Ingeniería de Software', version: '5.0', esencial: true,
    archivos: ['js/islabs.js'] },
  { id: 'camino', nombre: 'Camino: Redes, Tu salón, IA y Software desde cero', version: '6.0', esencial: true,
    archivos: ['js/lecciones.js', 'js/lecciones-unsij.js', 'js/lecciones-is.js'] },
  { id: 'academia', nombre: 'Academia Web: Fundamentos, React y Vue', version: '8.0', esencial: false,
    archivos: [
      'vendor/codemirror/codemirror.min.js',
      'vendor/codemirror/mode/javascript/javascript.min.js', 'vendor/codemirror/mode/xml/xml.min.js',
      'vendor/codemirror/mode/css/css.min.js', 'vendor/codemirror/mode/htmlmixed/htmlmixed.min.js',
      'vendor/codemirror/mode/jsx/jsx.min.js', 'vendor/codemirror/addon/hint/show-hint.min.js',
      'vendor/codemirror/addon/hint/javascript-hint.min.js', 'vendor/codemirror/addon/hint/css-hint.min.js',
      'vendor/codemirror/addon/hint/xml-hint.min.js', 'vendor/codemirror/addon/hint/html-hint.min.js',
      'vendor/codemirror/addon/hint/anyword-hint.min.js', 'vendor/codemirror/addon/edit/closebrackets.min.js',
      'vendor/codemirror/addon/edit/closetag.min.js', 'vendor/acorn/acorn.min.js',
      'js/web/cm-css.js', 'js/web/estilos-web.js', 'js/web/sandbox.js', 'js/web/codelab.js',
      'js/web/curso-fundamentos.js', 'js/web/curso-react.js', 'js/web/curso-vue.js', 'js/web/academia.js'
    ],
    // No se cargan al arrancar: el laboratorio los pide cuando la lección los necesita.
    diferidos: ['vendor/babel/babel.min.js', 'vendor/react/react.development.js', 'vendor/react/react-dom.development.js', 'vendor/vue/vue.global.js'] },
  { id: 'horario', nombre: 'Horario y tarjeta «Hoy»', version: '1.0', esencial: false,
    archivos: ['js/horario.js'] },
  { id: 'notas', nombre: 'Calificaciones', version: '1.0', esencial: false,
    archivos: ['js/calificaciones.js'] },
  { id: 'ajustes', nombre: 'Ajustes', version: '1.0', esencial: false,
    archivos: ['js/ajustes.js'] },
  { id: 'app', nombre: 'Aplicación (navegación y motor de lecciones)', version: '9.0', esencial: true,
    archivos: ['js/app.js'] }
];
