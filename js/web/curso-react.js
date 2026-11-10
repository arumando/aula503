/* Academia Web · React desde cero. Sigue el capítulo «Describir la UI» de es.react.dev
   (con explicaciones propias) y agrega un adelanto de eventos y estado. */
(function (root) {
  root.CURSOS_WEB = root.CURSOS_WEB || [];
  root.CURSOS_WEB.push({
    id: 'react', nombre: 'React desde cero', corto: 'React', logo: '⚛', color: '#087EA4', modo: 'react',
    fuente: 'https://es.react.dev/learn/describing-the-ui',
    lema: 'Componentes, JSX, props, condiciones, listas y el árbol de tu interfaz.',
    niveles: [
      { titulo: 'Básico · Describir la UI', lecciones: [

        { id: 'w-r-1', titulo: 'Tu primer componente', resumen: 'Una función que regresa interfaz. Se escribe con mayúscula.',
          sencillo: `<p>Un <b>componente</b> es una <b>función de JavaScript que regresa un pedazo de pantalla</b>. Lo haces una vez y lo usas cuantas veces quieras, como una etiqueta de HTML inventada por ti: <code>&lt;Saludo /&gt;</code>.</p>
<p>Tres reglas:</p>
<ol><li>El nombre empieza con <b>mayúscula</b> (<code>Saludo</code>, no <code>saludo</code>). Así React distingue tus componentes de las etiquetas normales como <code>&lt;div&gt;</code>.</li>
<li>Regresa lo que se verá con <code>return</code>. Si ocupa varias líneas, va entre paréntesis.</li>
<li>Los componentes se definen <b>afuera</b>, en el nivel principal del archivo. Nunca un componente dentro de otro.</li></ol>
<p>Las etiquetas parecidas a HTML que van dentro del <code>return</code> se llaman <b>JSX</b> (las verás en dos lecciones).</p>`,
          tecnico: `<p>Un componente de React es una función que regresa <b>elementos de React</b> (normalmente escritos en JSX). Por convención y obligación del transformador de JSX, su identificador va en <b>PascalCase</b>: <code>&lt;saludo /&gt;</code> se interpretaría como una etiqueta HTML.</p>
<p>Un componente <b>padre</b> puede renderizar componentes <b>hijos</b> (<i>composición</i>). Definir componentes anidados dentro de otro es un antipatrón: se recrean en cada render y pierden su estado. <code>export default</code> marca el componente principal del archivo.</p>`,
          analogia: '<b>Un componente es un molde de galletas.</b> Lo diseñas una vez (la función) y cada vez que escribes <code>&lt;Saludo /&gt;</code> sale una galleta igual.',
          ejemplo: { archivos: [{ nombre: 'App.js', codigo: `// Un componente: función con mayúscula que regresa JSX
function Saludo() {
  return <p>👋 ¡Hola desde un componente!</p>;
}

// El componente principal usa a Saludo tres veces
export default function App() {
  return (
    <section>
      <h1>Mi primera app de React</h1>
      <Saludo />
      <Saludo />
      <Saludo />
    </section>
  );
}` }],
            notas: [
              { a: 'App.js', l: [2, 4], t: '<code>Saludo</code> es una función normal que <b>regresa</b> un párrafo. La mayúscula la convierte en componente.' },
              { a: 'App.js', l: [7, 16], t: '<code>App</code> es el componente <b>padre</b>. Usa <code>&lt;Saludo /&gt;</code> como si fuera una etiqueta. Abre la pestaña <b>Componentes</b>: verás <code>App</code> con tres hijos <code>Saludo</code>.' },
              { a: 'App.js', l: [8, 15], t: 'El <code>return</code> ocupa varias líneas, por eso va entre <b>paréntesis</b>. Sin ellos, JavaScript regresaría nada.' }] },
          reto: { texto: 'Crea un componente <code>Despedida</code> que regrese un párrafo que diga «Adiós», y úsalo <b>dos veces</b> dentro de <code>App</code>, debajo de los saludos.',
            metas: [
              { t: 'Existe el componente <code>Despedida</code> y se usa dos veces o más', ok: "aulaComp('Despedida').length >= 2" },
              { t: 'En la pantalla aparece «Adiós»', ok: "document.body.textContent.includes('Adiós')" },
              { t: 'Siguen los tres <code>Saludo</code>', ok: "aulaComp('Saludo').length === 3" }],
            pistas: ['Copia el componente <code>Saludo</code> completo y cámbiale el nombre y el texto.', 'Recuerda la mayúscula: <code>function Despedida() { … }</code>', 'Dentro de <code>&lt;section&gt;</code>, después de los saludos: <code>&lt;Despedida /&gt;</code> dos veces.'],
            solucion: [{ nombre: 'App.js', codigo: "function Saludo() {\n  return <p>👋 ¡Hola desde un componente!</p>;\n}\n\nfunction Despedida() {\n  return <p>Adiós 👋</p>;\n}\n\nexport default function App() {\n  return (\n    <section>\n      <h1>Mi primera app de React</h1>\n      <Saludo />\n      <Saludo />\n      <Saludo />\n      <Despedida />\n      <Despedida />\n    </section>\n  );\n}" }] },
          quiz: [
            { q: '¿Cuál es un nombre válido de componente?', o: ['tarjeta', 'Tarjeta', 'tarjeta-alumno'], a: 1, w: 'Siempre con mayúscula inicial.' },
            { q: '¿Qué regresa un componente?', o: ['Un número', 'Un pedazo de interfaz (JSX)', 'Una URL'], a: 1, w: 'Regresa lo que se va a ver.' },
            { q: '¿Dónde se define un componente?', o: ['Dentro de otro componente', 'En el nivel principal del archivo'], a: 1, w: 'Definirlo dentro de otro causa errores y lentitud.' }] },

        { id: 'w-r-2', titulo: 'Importar y exportar componentes', resumen: 'Repartir componentes en varios archivos.',
          sencillo: `<p>Cuando tienes muchos componentes, conviene ponerlos en <b>archivos separados</b>, como guardar cada herramienta en su cajón.</p>
<ul><li><b>export</b> = «este componente se puede usar desde otros archivos».</li>
<li><b>import</b> = «tráeme ese componente de aquel archivo».</li></ul>
<p>Hay dos formas:</p>
<ul><li><b>Por defecto</b> (<code>export default</code>): el principal del archivo; solo puede haber uno. Se importa <b>sin llaves</b> y con el nombre que quieras: <code>import Tarjeta from './Tarjeta.js'</code>.</li>
<li><b>Con nombre</b> (<code>export function Titulo</code>): puede haber varios. Se importan <b>con llaves</b> y con el mismo nombre: <code>import { Titulo } from './Tarjeta.js'</code>.</li></ul>`,
          tecnico: `<p>Los archivos son <b>módulos ES</b>. Un módulo tiene a lo sumo un <code>export default</code> y cualquier número de <b>exportaciones con nombre</b>. La importación por defecto puede renombrarse libremente; las nombradas deben coincidir (o renombrarse con <code>as</code>).</p>
<p>La ruta <code>'./Tarjeta.js'</code> es relativa al archivo actual. Una convención común: un componente principal por archivo con <code>export default</code>, y utilidades pequeñas como exportaciones nombradas.</p>
<p><i>En este laboratorio todos los archivos se juntan en uno al ejecutarse, pero escribe los import/export igual que en un proyecto real.</i></p>`,
          analogia: '<b>Default</b> = la tienda tiene un producto estrella y le dices «dame el de siempre». <b>Con nombre</b> = pides por nombre exacto: «dame el Titulo».',
          ejemplo: { archivos: [
            { nombre: 'App.js', codigo: `import Tarjeta from './Tarjeta.js';
import { Etiqueta } from './Tarjeta.js';

export default function App() {
  return (
    <main>
      <Etiqueta texto="Mis materias" />
      <Tarjeta />
    </main>
  );
}` },
            { nombre: 'Tarjeta.js', codigo: `// Exportación con nombre (puede haber varias)
export function Etiqueta({ texto }) {
  return <h2>🏷️ {texto}</h2>;
}

// Exportación por defecto (solo una por archivo)
export default function Tarjeta() {
  return (
    <div style={{ border: '1px solid #ccc', padding: 12, borderRadius: 8 }}>
      Fundamentos de IA · Redes I · Ingeniería de Software
    </div>
  );
}` }],
            notas: [
              { a: 'App.js', l: [1, 1], t: 'Importación <b>por defecto</b>: sin llaves. Trae lo que <code>Tarjeta.js</code> marcó con <code>export default</code>.' },
              { a: 'App.js', l: [2, 2], t: 'Importación <b>con nombre</b>: con llaves y el nombre exacto <code>Etiqueta</code>.' },
              { a: 'Tarjeta.js', l: [2, 4], t: '<code>export function</code> = exportación con nombre.' },
              { a: 'Tarjeta.js', l: [7, 13], t: '<code>export default</code> = el componente principal de este archivo.' }] },
          reto: { texto: 'En <b>Tarjeta.js</b> agrega otro componente exportado con nombre, <code>Pie</code>, que regrese <code>&lt;p&gt;Semestre 26-27 A&lt;/p&gt;</code>. Impórtalo en <b>App.js</b> con llaves y úsalo debajo de la tarjeta.',
            metas: [
              { t: 'Se usa el componente <code>Pie</code>', ok: "aulaComp('Pie').length >= 1" },
              { t: 'Aparece «Semestre 26-27 A»', ok: "document.body.textContent.includes('Semestre 26-27 A')" }],
            pistas: ['En Tarjeta.js: <code>export function Pie() { return &lt;p&gt;…&lt;/p&gt;; }</code>', 'En App.js puedes juntar las nombradas: <code>import { Etiqueta, Pie } from \'./Tarjeta.js\';</code>', 'Después de <code>&lt;Tarjeta /&gt;</code> escribe <code>&lt;Pie /&gt;</code>.'],
            solucion: [{ nombre: 'App.js', codigo: "import Tarjeta from './Tarjeta.js';\nimport { Etiqueta, Pie } from './Tarjeta.js';\n\nexport default function App() {\n  return (\n    <main>\n      <Etiqueta texto=\"Mis materias\" />\n      <Tarjeta />\n      <Pie />\n    </main>\n  );\n}" }, { nombre: 'Tarjeta.js', codigo: "export function Etiqueta({ texto }) {\n  return <h2>🏷️ {texto}</h2>;\n}\n\nexport function Pie() {\n  return <p>Semestre 26-27 A</p>;\n}\n\nexport default function Tarjeta() {\n  return (\n    <div style={{ border: '1px solid #ccc', padding: 12, borderRadius: 8 }}>\n      Fundamentos de IA · Redes I · Ingeniería de Software\n    </div>\n  );\n}" }] },
          quiz: [
            { q: '¿Cuántos <code>export default</code> puede tener un archivo?', o: ['Uno', 'Los que quieras'], a: 0, w: 'Solo uno; con nombre, varios.' },
            { q: '¿Cómo importas <code>export function Boton</code>?', o: ['import Boton from \'./B.js\'', 'import { Boton } from \'./B.js\''], a: 1, w: 'Las nombradas van con llaves.' }] },

        { id: 'w-r-3', titulo: 'Escribir marcado con JSX', resumen: 'Parece HTML, pero tiene 3 reglas propias.',
          sencillo: `<p><b>JSX</b> es la forma de escribir «HTML» dentro de JavaScript. Se parece mucho, pero es más estricto. Sus <b>3 reglas</b>:</p>
<ol><li><b>Un solo elemento raíz.</b> Si regresas varias cosas, envuélvelas en un <code>&lt;div&gt;</code> o en un <b>fragmento</b> <code>&lt;&gt;…&lt;/&gt;</code> (una caja invisible).</li>
<li><b>Cierra todas las etiquetas.</b> Hasta las que en HTML no se cierran: <code>&lt;br /&gt;</code>, <code>&lt;img /&gt;</code>, <code>&lt;input /&gt;</code>.</li>
<li><b>camelCase en casi todo.</b> <code>class</code> se escribe <code>className</code>; <code>onclick</code>, <code>onClick</code>; <code>font-size</code> en estilos, <code>fontSize</code>.</li></ol>
<p>Si algo falla, el laboratorio te marca la línea en rojo con el error en español.</p>`,
          tecnico: `<p>JSX es una extensión de sintaxis que un compilador (Babel) transforma en llamadas <code>React.createElement(tipo, props, ...hijos)</code>. Una función solo puede regresar un valor, por eso se requiere un único nodo raíz (o un <code>Fragment</code>, que no genera nodo en el DOM).</p>
<p>Los atributos JSX se convierten en claves de un objeto JavaScript: por eso usan camelCase y evitan palabras reservadas (<code>className</code>, <code>htmlFor</code>). Las excepciones son <code>aria-*</code> y <code>data-*</code>, que se escriben con guiones.</p>`,
          analogia: '<b>JSX es HTML con uniforme escolar:</b> se parece al de siempre, pero con reglas más estrictas (todo bien cerrado y nombres en camelCase).',
          ejemplo: { archivos: [{ nombre: 'App.js', codigo: `export default function Perfil() {
  return (
    <>
      <h1 className="titulo">José Armando</h1>
      <img
        src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><circle cx='40' cy='40' r='38' fill='%230A6C88'/></svg>"
        alt="Avatar"
      />
      <ul>
        <li>Ingeniería de Software</li>
        <li>Grupo 503<br />UNSIJ</li>
      </ul>
    </>
  );
}` }, { nombre: 'estilos.css', codigo: '.titulo {\n  color: #0a6c88;\n  font-family: sans-serif;\n}' }],
            notas: [
              { a: 'App.js', l: [3, 13], t: '<code>&lt;&gt; … &lt;/&gt;</code> es un <b>fragmento</b>: agrupa sin agregar una etiqueta extra. Míralo en <b>DOM y estilos</b>: no aparece ningún div.' },
              { a: 'App.js', l: [4, 4], t: '<code>className</code> en lugar de <code>class</code>, porque <code>class</code> es palabra reservada de JavaScript.' },
              { a: 'App.js', l: [5, 8], t: '<code>&lt;img … /&gt;</code> se cierra con <code>/&gt;</code>. En JSX todo se cierra.' }] },
          reto: { texto: 'Pulsa <b>Empezar reto</b>: el código trae 3 errores típicos de JSX. Arréglalos hasta que el resultado se vea sin errores.',
            archivos: [{ nombre: 'App.js', codigo: `export default function Lista() {
  return (
    <h1 class="titulo">Mis pendientes</h1>
    <ul>
      <li>Repasar props<br></li>
      <li>Estudiar Vue</li>
    </ul>
  );
}` }, { nombre: 'estilos.css', codigo: '.titulo {\n  color: #0a6c88;\n}' }],
            metas: [
              { t: 'No hay errores', ok: "document.querySelector('h1') !== null && document.querySelectorAll('li').length === 2" },
              { t: 'El título tiene la clase <code>titulo</code> (usa <code>className</code>)', ok: "document.querySelector('h1.titulo') !== null" }],
            pistas: ['Error 1: el <code>return</code> regresa dos cosas (<code>h1</code> y <code>ul</code>). Envuélvelas en <code>&lt;&gt;…&lt;/&gt;</code>.', 'Error 2: <code>&lt;br&gt;</code> debe ser <code>&lt;br /&gt;</code>.', 'Error 3: <code>class=</code> debe ser <code>className=</code>.'],
            solucion: [{ nombre: 'App.js', codigo: "export default function Lista() {\n  return (\n    <>\n      <h1 className=\"titulo\">Mis pendientes</h1>\n      <ul>\n        <li>Repasar props<br /></li>\n        <li>Estudiar Vue</li>\n      </ul>\n    </>\n  );\n}" }] },
          quiz: [
            { q: '¿Cómo se escribe el atributo class en JSX?', o: ['class', 'className', 'clase'], a: 1, w: 'className.' },
            { q: '¿Qué es <code>&lt;&gt;&lt;/&gt;</code>?', o: ['Un error', 'Un fragmento: agrupa sin agregar etiquetas', 'Un comentario'], a: 1, w: 'Fragmento.' },
            { q: '¿Cuál es correcto en JSX?', o: ['&lt;input&gt;', '&lt;input /&gt;'], a: 1, w: 'Todas las etiquetas se cierran.' }] },

        { id: 'w-r-4', titulo: 'JavaScript en JSX con llaves', resumen: 'Las llaves { } abren una ventana a JavaScript.',
          sencillo: `<p>Dentro del JSX, las <b>llaves <code>{ }</code></b> son una ventana: lo que pongas adentro es JavaScript y React muestra el resultado.</p>
<pre>const nombre = 'Ana';
&lt;h1&gt;Hola, {nombre}&lt;/h1&gt;        → Hola, Ana
&lt;p&gt;{2 + 3}&lt;/p&gt;                 → 5
&lt;p&gt;{nombre.toUpperCase()}&lt;/p&gt;  → ANA</pre>
<p>Se pueden usar en dos lugares: como <b>texto</b> entre etiquetas y como <b>valor de un atributo</b>: <code>src={foto}</code> (sin comillas).</p>
<p><b>Dobles llaves</b> <code>{{ }}</code>: no es nada especial. Son las llaves de JSX con un <b>objeto</b> adentro. Se usan para los estilos: <code>style={{ color: 'red', fontSize: 20 }}</code>.</p>`,
          tecnico: `<p>Las llaves en JSX aceptan cualquier <b>expresión</b> de JavaScript (algo que produce un valor), no enunciados como <code>if</code> o <code>for</code>. Sirven como hijos de un elemento o como valor de un atributo. Los atributos con comillas son literales de texto; con llaves se evalúan.</p>
<p>La prop <code>style</code> recibe un objeto con propiedades CSS en camelCase; los números se interpretan como <code>px</code> en las propiedades de longitud.</p>`,
          analogia: '<b>Las llaves son como el hueco de un formulario:</b> «Nombre: ____». React llena el hueco con el valor de la variable.',
          ejemplo: { archivos: [{ nombre: 'App.js', codigo: `const persona = {
  nombre: 'Ana Laura',
  materias: 6,
  tema: { fondo: '#0A6C88', texto: 'white' }
};

function hoy() {
  return new Date().toLocaleDateString('es-MX');
}

export default function Ficha() {
  return (
    <div style={{ background: persona.tema.fondo, color: persona.tema.texto, padding: 16, borderRadius: 12 }}>
      <h2>Ficha de {persona.nombre}</h2>
      <p>Materias: {persona.materias}</p>
      <p>Horas de estudio a la semana: {persona.materias * 3}</p>
      <p>Hoy es {hoy()}</p>
    </div>
  );
}` }],
            notas: [
              { a: 'App.js', l: [1, 5], t: 'Un objeto normal de JavaScript con los datos.' },
              { a: 'App.js', l: [13, 13], t: '<code>style={{ … }}</code>: las llaves de afuera abren JavaScript y las de adentro son el <b>objeto</b> de estilos.' },
              { a: 'App.js', l: [14, 17], t: 'Cada <code>{ }</code> se reemplaza por su valor: una propiedad, una cuenta (<code>6 * 3 = 18</code>) o lo que regresa una función.' }] },
          reto: { texto: 'Agrega dos constantes, <code>precio = 50</code> y <code>cantidad = 3</code>, y un párrafo con <code>id="total"</code> que muestre <b>Total: 150</b> calculándolo con llaves (no escribas el 150 a mano).',
            metas: [
              { t: 'Hay un párrafo <code>#total</code> que dice «Total: 150»', ok: "aulaTexto('#total') === 'Total: 150'" }],
            pistas: ['Fuera del componente: <code>const precio = 50;</code> y <code>const cantidad = 3;</code>', 'Dentro del div: <code>&lt;p id="total"&gt;Total: {…}&lt;/p&gt;</code>', 'Lo que va dentro de las llaves es <code>precio * cantidad</code>.'],
            solucion: [{ nombre: 'App.js', codigo: "const precio = 50;\nconst cantidad = 3;\n\nexport default function Ficha() {\n  return (\n    <div>\n      <p id=\"total\">Total: {precio * cantidad}</p>\n    </div>\n  );\n}" }] },
          quiz: [
            { q: '¿Qué muestra <code>&lt;p&gt;{10 / 2}&lt;/p&gt;</code>?', o: ['10 / 2', '5', '{10 / 2}'], a: 1, w: 'Lo de adentro se evalúa.' },
            { q: 'En <code>style={{ color: \'red\' }}</code> las llaves de adentro son…', o: ['Un objeto', 'Un error', 'Una función'], a: 0, w: 'Un objeto de estilos.' },
            { q: '¿Se puede escribir un <code>if</code> dentro de las llaves?', o: ['Sí', 'No, solo expresiones (algo que da un valor)'], a: 1, w: 'Para condiciones dentro de JSX se usa ? : o &&.' }] },

        { id: 'w-r-5', titulo: 'Pasar props a un componente', resumen: 'Cómo un padre le manda datos a su hijo.',
          sencillo: `<p>Las <b>props</b> son los datos que un componente <b>padre</b> le manda a un <b>hijo</b>, escritos como atributos: <code>&lt;Tarjeta nombre="Ana" edad={20} /&gt;</code>.</p>
<p>El hijo los recibe todos juntos en un objeto, y casi siempre se <b>desestructuran</b> en los paréntesis:</p>
<pre>function Tarjeta({ nombre, edad }) {
  return &lt;p&gt;{nombre} tiene {edad} años&lt;/p&gt;;
}</pre>
<ul><li><b>Texto fijo</b> con comillas: <code>nombre="Ana"</code>. <b>Cualquier otra cosa</b> con llaves: <code>edad={20}</code>, <code>datos={alumno}</code>.</li>
<li><b>Valor por defecto</b>: <code>function Avatar({ tamaño = 100 })</code> usa 100 si no te lo mandan.</li>
<li><b>children</b>: lo que pones <i>entre</i> las etiquetas, <code>&lt;Caja&gt;aquí&lt;/Caja&gt;</code>, llega como la prop <code>children</code>.</li>
<li>Las props son de <b>solo lectura</b>: el hijo no las cambia. Si deben cambiar, el padre manda unas nuevas.</li></ul>`,
          tecnico: `<p>Las props son el único argumento de la función componente: un objeto inmutable. La desestructuración en la firma (<code>{ nombre, edad = 18 }</code>) permite valores por defecto, que aplican cuando la prop es <code>undefined</code> (no cuando es <code>null</code>).</p>
<p>El contenido anidado se recibe en <code>props.children</code>, lo que permite componentes «contenedor». Para reenviar todas las props se puede usar spread: <code>&lt;Avatar {...props} /&gt;</code>. Los datos fluyen en <b>una sola dirección</b>: de padre a hijo.</p>`,
          analogia: '<b>Las props son la receta que el padre le da al hijo:</b> «haz una galleta de chocolate, tamaño grande». El hijo la hace, pero no puede cambiar la receta.',
          ejemplo: { archivos: [{ nombre: 'App.js', codigo: `// El hijo: recibe props desestructuradas, con un valor por defecto
function Tarjeta({ nombre, edad, carrera = 'Sin carrera' }) {
  return (
    <div className="tarjeta">
      <h3>{nombre}</h3>
      <p>{edad} años · {carrera}</p>
    </div>
  );
}

// children: lo que va entre las etiquetas
function Caja({ titulo, children }) {
  return (
    <section className="caja">
      <h2>{titulo}</h2>
      {children}
    </section>
  );
}

// El padre: le manda datos distintos a cada hijo
export default function App() {
  return (
    <Caja titulo="Equipo Firefox">
      <Tarjeta nombre="José Armando" edad={21} carrera="Software" />
      <Tarjeta nombre="Ana Laura" edad={20} />
    </Caja>
  );
}` }, { nombre: 'estilos.css', codigo: '.caja { font-family: sans-serif; }\n.tarjeta {\n  border: 1px solid #cdd;\n  border-radius: 10px;\n  padding: 8px 12px;\n  margin: 8px 0;\n}\n.tarjeta h3 { margin: 0; }' }],
            notas: [
              { a: 'App.js', l: [2, 2], t: 'El hijo recibe <code>{ nombre, edad, carrera }</code>. Si no le mandan <code>carrera</code>, vale «Sin carrera».' },
              { a: 'App.js', l: [12, 19], t: '<code>children</code> es todo lo que el padre puso <b>entre</b> <code>&lt;Caja&gt;</code> y <code>&lt;/Caja&gt;</code>: aquí, las dos tarjetas.' },
              { a: 'App.js', l: [25, 26], t: 'Cada <code>&lt;Tarjeta&gt;</code> recibe props distintas. Abre <b>Componentes</b> y toca cada Tarjeta para ver sus props. La segunda no recibe carrera.' }] },
          reto: { texto: 'Agrega una tercera <code>&lt;Tarjeta&gt;</code> con tu compañero o compañera: <code>nombre</code>, <code>edad</code> (número, con llaves) y <code>carrera="Redes"</code>. Después agrega al hijo la prop <code>grupo</code> con valor por defecto <code>503</code> y muéstrala.',
            metas: [
              { t: 'Hay 3 tarjetas', ok: "aulaComp('Tarjeta').length === 3" },
              { t: 'Una tarjeta recibe <code>carrera="Redes"</code>', ok: "aulaComp('Tarjeta').some(c => c.props.carrera && c.props.carrera.v === 'Redes')" },
              { t: 'La edad se manda como número', ok: "aulaComp('Tarjeta').every(c => c.props.edad && c.props.edad.t === 'number')" },
              { t: 'Se muestra el grupo 503', ok: "document.body.textContent.includes('503')" }],
            pistas: ['<code>&lt;Tarjeta nombre="Iris" edad={20} carrera="Redes" /&gt;</code>', 'En la firma del hijo: <code>{ nombre, edad, carrera = \'Sin carrera\', grupo = 503 }</code>', 'Y en el párrafo: <code>… · Grupo {grupo}</code>'],
            solucion: [{ nombre: 'App.js', codigo: "function Tarjeta({ nombre, edad, carrera = 'Sin carrera', grupo = 503 }) {\n  return (\n    <div className=\"tarjeta\">\n      <h3>{nombre}</h3>\n      <p>{edad} años · {carrera} · Grupo {grupo}</p>\n    </div>\n  );\n}\n\nfunction Caja({ titulo, children }) {\n  return (\n    <section className=\"caja\">\n      <h2>{titulo}</h2>\n      {children}\n    </section>\n  );\n}\n\nexport default function App() {\n  return (\n    <Caja titulo=\"Equipo Firefox\">\n      <Tarjeta nombre=\"José Armando\" edad={21} carrera=\"Software\" />\n      <Tarjeta nombre=\"Ana Laura\" edad={20} />\n      <Tarjeta nombre=\"Iris\" edad={20} carrera=\"Redes\" />\n    </Caja>\n  );\n}" }] },
          quiz: [
            { q: '¿Cómo mandas el número 20 como prop?', o: ['edad="20"', 'edad={20}'], a: 1, w: 'Con comillas sería texto.' },
            { q: 'Lo que escribes entre <code>&lt;Caja&gt;</code> y <code>&lt;/Caja&gt;</code> llega como…', o: ['props.texto', 'props.children', 'No llega'], a: 1, w: 'children.' },
            { q: '¿Un hijo puede modificar sus props?', o: ['Sí', 'No, son de solo lectura'], a: 1, w: 'El padre manda props nuevas.' }] },

        { id: 'w-r-6', titulo: 'Renderizado condicional', resumen: 'Mostrar una cosa u otra según una condición.',
          sencillo: `<p>A veces quieres mostrar algo <b>solo si</b> se cumple una condición. En React se hace con JavaScript normal. Hay 3 formas:</p>
<ol><li><b>if con return</b>, antes del JSX:
<pre>if (hecha) {
  return &lt;li&gt;{nombre} ✅&lt;/li&gt;;
}
return &lt;li&gt;{nombre}&lt;/li&gt;;</pre></li>
<li><b>Operador ternario</b> <code>condición ? A : B</code>, que se lee «¿se cumple? entonces A, si no B»:
<pre>&lt;li&gt;{hecha ? '✅ ' + nombre : nombre}&lt;/li&gt;</pre></li>
<li><b>&&</b>, que se lee «si se cumple, muestra esto; si no, nada»:
<pre>{hecha && &lt;span&gt;✅&lt;/span&gt;}</pre></li></ol>
<p>Para no mostrar nada, un componente puede regresar <code>null</code>.</p>`,
          tecnico: `<p>Como JSX es una expresión, se puede asignar a variables y usar en estructuras de control. Dentro del marcado se emplean el operador condicional <code>? :</code> y el cortocircuito lógico <code>&&</code>.</p>
<p><b>Cuidado con <code>&&</code> y números:</b> <code>{cantidad && &lt;p/&gt;}</code> con <code>cantidad = 0</code> renderiza un «0», porque <code>0 && x</code> evalúa a <code>0</code>. Usa <code>cantidad > 0 && …</code>. Regresar <code>null</code>, <code>false</code> o <code>undefined</code> no renderiza nada.</p>`,
          analogia: '<b>Es como el semáforo:</b> si está en verde (condición verdadera) pasas; si no, te quedas. El ternario es una bifurcación: un camino u otro.',
          ejemplo: { archivos: [{ nombre: 'App.js', codigo: `function Tarea({ nombre, hecha }) {
  return (
    <li className={hecha ? 'hecha' : ''}>
      {nombre} {hecha && '✅'}
    </li>
  );
}

function Aviso({ pendientes }) {
  if (pendientes === 0) {
    return <p>🎉 ¡Todo listo!</p>;
  }
  return <p>Te faltan {pendientes} tareas</p>;
}

export default function App() {
  return (
    <section>
      <h2>Mis tareas</h2>
      <ul>
        <Tarea nombre="Resumen de SO" hecha={true} />
        <Tarea nombre="Guía CCNA" hecha={false} />
        <Tarea nombre="Red neuronal" hecha={true} />
      </ul>
      <Aviso pendientes={1} />
    </section>
  );
}` }, { nombre: 'estilos.css', codigo: '.hecha { color: #888; text-decoration: line-through; }' }],
            notas: [
              { a: 'App.js', l: [3, 3], t: 'Ternario: si <code>hecha</code> es verdadero, la clase es «hecha»; si no, vacía.' },
              { a: 'App.js', l: [4, 4], t: '<code>{hecha && \'✅\'}</code>: la palomita solo aparece si la tarea está hecha.' },
              { a: 'App.js', l: [10, 13], t: '<code>if</code> con <code>return</code> temprano: si no hay pendientes, regresa otro JSX y lo de abajo ni se ejecuta.' }] },
          reto: { texto: 'Crea un componente <code>Calificacion({ puntos })</code> que muestre «Aprobado» si <code>puntos >= 70</code> y «Reprobado» si no. Úsalo dos veces en <code>App</code>: con <code>puntos={85}</code> y con <code>puntos={50}</code>.',
            metas: [
              { t: 'Se usa <code>Calificacion</code> dos veces', ok: "aulaComp('Calificacion').length >= 2" },
              { t: 'Aparece «Aprobado»', ok: "/\\bAprobado/.test(document.body.textContent)" },
              { t: 'Aparece «Reprobado»', ok: "document.body.textContent.includes('Reprobado')" }],
            pistas: ['<code>function Calificacion({ puntos }) { return &lt;p&gt;{…}&lt;/p&gt;; }</code>', 'Dentro de las llaves: <code>puntos >= 70 ? \'Aprobado\' : \'Reprobado\'</code>', 'En App: <code>&lt;Calificacion puntos={85} /&gt;</code> y <code>&lt;Calificacion puntos={50} /&gt;</code>'],
            solucion: [{ nombre: 'App.js', codigo: "function Calificacion({ puntos }) {\n  return <p>{puntos}: {puntos >= 70 ? 'Aprobado' : 'Reprobado'}</p>;\n}\n\nexport default function App() {\n  return (\n    <section>\n      <Calificacion puntos={85} />\n      <Calificacion puntos={50} />\n    </section>\n  );\n}" }] },
          quiz: [
            { q: '<code>{edad >= 18 ? \'Adulto\' : \'Menor\'}</code> con edad = 15 muestra…', o: ['Adulto', 'Menor'], a: 1, w: 'La condición es falsa → la segunda opción.' },
            { q: '<code>{0 && &lt;p&gt;Hola&lt;/p&gt;}</code> muestra…', o: ['Nada', 'Hola', 'Un 0'], a: 2, w: 'Cuidado: 0 se dibuja. Usa n > 0 && …' },
            { q: '¿Qué regresa un componente para no mostrar nada?', o: ['""', 'null', 'false o null (ambos sirven)'], a: 2, w: 'null es lo más común.' }] },

        { id: 'w-r-7', titulo: 'Renderizar listas', resumen: 'map para convertir datos en elementos, y por qué la key.',
          sencillo: `<p>Casi siempre los datos vienen en un <b>arreglo</b>. Para mostrarlos usas <code>map</code> (de Fundamentos), que convierte cada dato en un elemento:</p>
<pre>const frutas = ['🍎', '🍌', '🍇'];
&lt;ul&gt;{frutas.map(f => &lt;li key={f}&gt;{f}&lt;/li&gt;)}&lt;/ul&gt;</pre>
<p>Para mostrar <b>solo algunos</b>, primero los filtras con <code>filter</code> y luego haces <code>map</code>.</p>
<p><b>La key</b>: cada elemento de una lista necesita una <code>key</code> única, como su número de matrícula. Así React sabe cuál es cuál si la lista cambia de orden, se agrega o se borra algo. Usa un <b>id</b> de los datos, no la posición.</p>`,
          tecnico: `<p>Un arreglo de elementos JSX es un hijo válido. <code>key</code> es una prop especial (no llega al componente) que React usa en la <b>reconciliación</b> para asociar cada elemento con su versión anterior. Debe ser estable y única entre hermanos. El índice como key causa errores sutiles (estado mezclado) cuando la lista se reordena o se inserta al inicio.</p>
<p>Si un elemento de <code>map</code> regresa varios nodos, usa <code>&lt;Fragment key={…}&gt;</code> en lugar de <code>&lt;&gt;</code>, porque los fragmentos cortos no aceptan key.</p>`,
          analogia: '<b>La key es la matrícula del alumno.</b> Si cambian a los alumnos de lugar en el salón, la maestra sabe quién es quién por su matrícula, no por la banca donde están sentados.',
          ejemplo: { archivos: [{ nombre: 'App.js', codigo: `const alumnos = [
  { id: 1, nombre: 'Ana Laura', calificacion: 92 },
  { id: 2, nombre: 'Alexis', calificacion: 64 },
  { id: 3, nombre: 'Josafat', calificacion: 78 },
  { id: 4, nombre: 'Ailed', calificacion: 88 }
];

export default function Lista() {
  const aprobados = alumnos.filter(a => a.calificacion >= 70);
  return (
    <section>
      <h2>Todos</h2>
      <ul>
        {alumnos.map(a => (
          <li key={a.id}>{a.nombre}: {a.calificacion}</li>
        ))}
      </ul>
      <h2>Aprobados ({aprobados.length})</h2>
      <ol>
        {aprobados.map(a => <li key={a.id}>{a.nombre}</li>)}
      </ol>
    </section>
  );
}` }],
            notas: [
              { a: 'App.js', l: [1, 6], t: 'Los datos: un arreglo de objetos. Cada uno tiene un <code>id</code> único, perfecto para la key.' },
              { a: 'App.js', l: [9, 9], t: 'Antes del JSX filtramos con JavaScript normal.' },
              { a: 'App.js', l: [14, 16], t: '<code>map</code> convierte cada alumno en un <code>&lt;li&gt;</code>. La <code>key={a.id}</code> es su matrícula. Revisa <b>DOM y estilos</b>: hay 4 <code>li</code>.' }] },
          reto: { texto: 'Agrega el campo <code>carrera</code> a cada alumno y muestra, en una lista nueva con <code>id="redes"</code>, solo a los que tengan <code>carrera === \'Redes\'</code>. Pon «Redes» a exactamente 2 alumnos.',
            metas: [
              { t: 'Existe <code>&lt;ul id="redes"&gt;</code> con exactamente 2 elementos', ok: "document.querySelectorAll('#redes li').length === 2" },
              { t: 'Las listas originales siguen funcionando', ok: "document.querySelectorAll('li').length >= 6" }],
            pistas: ['A cada objeto: <code>{ id: 1, nombre: \'Ana Laura\', calificacion: 92, carrera: \'Redes\' }</code>', '<code>const deRedes = alumnos.filter(a => a.carrera === \'Redes\');</code>', '<code>&lt;ul id="redes"&gt;{deRedes.map(a => &lt;li key={a.id}&gt;{a.nombre}&lt;/li&gt;)}&lt;/ul&gt;</code>'],
            solucion: [{ nombre: 'App.js', codigo: "const alumnos = [\n  { id: 1, nombre: 'Ana Laura', calificacion: 92, carrera: 'Redes' },\n  { id: 2, nombre: 'Alexis', calificacion: 64, carrera: 'Software' },\n  { id: 3, nombre: 'Josafat', calificacion: 78, carrera: 'Redes' },\n  { id: 4, nombre: 'Ailed', calificacion: 88, carrera: 'Software' }\n];\n\nexport default function Lista() {\n  const aprobados = alumnos.filter(a => a.calificacion >= 70);\n  const deRedes = alumnos.filter(a => a.carrera === 'Redes');\n  return (\n    <section>\n      <ul>{alumnos.map(a => <li key={a.id}>{a.nombre}: {a.calificacion}</li>)}</ul>\n      <ol>{aprobados.map(a => <li key={a.id}>{a.nombre}</li>)}</ol>\n      <ul id=\"redes\">{deRedes.map(a => <li key={a.id}>{a.nombre}</li>)}</ul>\n    </section>\n  );\n}" }] },
          quiz: [
            { q: '¿Para qué sirve la <code>key</code>?', o: ['Para el estilo', 'Para que React identifique cada elemento de la lista', 'Para ordenar'], a: 1, w: 'Es su identificación.' },
            { q: '¿Cuál es la mejor key?', o: ['El índice del map', 'Un id único de los datos', 'Math.random()'], a: 1, w: 'Estable y única.' }] },

        { id: 'w-r-8', titulo: 'Mantener los componentes puros', resumen: 'Mismas props → misma pantalla. Sin sorpresas.',
          sencillo: `<p>Un componente <b>puro</b> es como una calculadora: si le das lo mismo, <b>siempre</b> te da lo mismo, y no anda cambiando cosas por fuera.</p>
<ul><li>✅ Con las mismas props, dibuja exactamente lo mismo.</li>
<li>❌ No modifica variables que existían antes de dibujarse (variables de afuera, objetos que recibe).</li></ul>
<p>¿Por qué importa? React puede dibujar un componente <b>varias veces</b>. En modo de desarrollo (<code>StrictMode</code>) lo dibuja <b>dos veces a propósito</b> para descubrir componentes impuros. Si el tuyo cambia una variable de afuera, el resultado sale mal.</p>
<p>Los cambios (sumar puntos, guardar algo) van en los <b>eventos</b> (cuando el usuario hace clic), no mientras se dibuja.</p>`,
          tecnico: `<p>React asume que los componentes son <b>funciones puras</b> respecto a sus entradas (props, estado y contexto): sin efectos secundarios durante el renderizado. Mutar variables externas o props durante el render rompe la idempotencia, y React puede renderizar varias veces, pausar o descartar un render (Concurrent Rendering).</p>
<p><code>&lt;StrictMode&gt;</code> invoca dos veces las funciones componente en desarrollo para hacer visibles estas impurezas. La <b>mutación local</b> (crear un arreglo dentro del componente y llenarlo) sí es válida. Los efectos secundarios van en manejadores de eventos o, como último recurso, en <code>useEffect</code>.</p>`,
          analogia: '<b>Una receta de cocina pura:</b> «2 tazas de harina + 1 huevo = 6 hotcakes». Siempre igual. Una receta impura sería «saca un huevo del refri del vecino»: cada vez que la usas, cambia algo afuera.',
          ejemplo: { archivos: [{ nombre: 'App.js', codigo: `import { StrictMode } from 'react';

// ❌ IMPURO: cambia una variable de afuera mientras se dibuja
let invitados = 0;
function Taza() {
  invitados = invitados + 1;
  return <h3>☕ Taza para el invitado #{invitados}</h3>;
}

function App() {
  return (
    <>
      <Taza />
      <Taza />
      <Taza />
    </>
  );
}

// StrictMode dibuja dos veces cada componente para atrapar este error
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);` }],
            notas: [
              { a: 'App.js', l: [4, 8], t: '<code>Taza</code> modifica <code>invitados</code>, que vive <b>afuera</b>. Por eso es impura.' },
              { a: 'App.js', l: [20, 24], t: '<code>StrictMode</code> dibuja dos veces cada taza: en vez de #1, #2, #3 verás #2, #4, #6. ¡El error queda a la vista!' }] },
          reto: { texto: 'Arréglalo: borra la variable <code>invitados</code> y haz que <code>Taza</code> reciba una prop <code>invitado</code>. En <code>App</code> usa <code>&lt;Taza invitado={1} /&gt;</code>, <code>{2}</code> y <code>{3}</code>. Deben salir #1, #2 y #3 aunque esté StrictMode.',
            metas: [
              { t: 'Aparecen #1, #2 y #3', ok: "['#1','#2','#3'].every(x => document.body.textContent.includes(x))" },
              { t: 'No aparecen #4 ni #6', ok: "!document.body.textContent.includes('#4') && !document.body.textContent.includes('#6')" },
              { t: '<code>Taza</code> recibe la prop <code>invitado</code>', ok: "aulaComp('Taza').length === 3 && aulaComp('Taza').every(c => c.props.invitado)" }],
            pistas: ['Cambia la firma: <code>function Taza({ invitado }) {</code>', 'Borra las líneas <code>let invitados = 0;</code> y <code>invitados = invitados + 1;</code>', 'En el JSX usa <code>#{invitado}</code>.'],
            solucion: [{ nombre: 'App.js', codigo: "import { StrictMode } from 'react';\n\nfunction Taza({ invitado }) {\n  return <h3>☕ Taza para el invitado #{invitado}</h3>;\n}\n\nfunction App() {\n  return (\n    <>\n      <Taza invitado={1} />\n      <Taza invitado={2} />\n      <Taza invitado={3} />\n    </>\n  );\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(\n  <StrictMode>\n    <App />\n  </StrictMode>\n);" }] },
          quiz: [
            { q: 'Un componente puro…', o: ['Cambia variables globales', 'Con las mismas props siempre muestra lo mismo', 'No puede recibir props'], a: 1, w: 'Misma entrada, misma salida.' },
            { q: '¿Por qué StrictMode dibuja dos veces?', o: ['Por un error de React', 'Para descubrir componentes impuros', 'Para ir más rápido'], a: 1, w: 'Solo en desarrollo.' },
            { q: '¿Dónde van los cambios como «sumar un punto»?', o: ['Mientras se dibuja', 'En los eventos (clics…)'], a: 1, w: 'Nunca durante el render.' }] },

        { id: 'w-r-9', titulo: 'Tu UI como un árbol', resumen: 'Padres, hijos y cómo React ve tu aplicación.',
          sencillo: `<p>Cuando un componente usa a otro, se forma un <b>árbol</b>, como un árbol genealógico: <code>App</code> es el abuelo, sus componentes son los hijos, los hijos de esos son los nietos…</p>
<ul><li>El <b>árbol de renderizado</b> muestra quién dibuja a quién. Es el que ves en la pestaña <b>Componentes</b>.</li>
<li>Los componentes de <b>arriba</b> (cerca de la raíz) afectan a todo lo de abajo: si se vuelven a dibujar, sus hijos también.</li>
<li>Los de <b>abajo</b> (las hojas) suelen ser pequeños: un botón, un ícono, un texto.</li></ul>
<p>También existe el <b>árbol de dependencias</b>: qué archivo importa a qué archivo. Sirve para saber qué código se necesita.</p>`,
          tecnico: `<p>React modela la UI como un <b>árbol de renderizado</b>: cada nodo es un componente y las aristas indican «A renderiza a B». Con renderizado condicional el árbol cambia entre renders. Los componentes cercanos a la raíz son de alto nivel (layout, estado compartido) y su re‑render se propaga a los descendientes.</p>
<p>El <b>árbol de dependencias de módulos</b> (imports) lo usan los <i>bundlers</i> para empaquetar la aplicación y detectar código que no se usa.</p>`,
          analogia: '<b>Como el organigrama de la universidad:</b> la rectoría (App) arriba; luego las carreras; luego los grupos; luego los alumnos. Una decisión de rectoría afecta a todos los de abajo.',
          ejemplo: { archivos: [{ nombre: 'App.js', codigo: `function Encabezado() {
  return <header><h1>UNSIJ · Grupo 503</h1></header>;
}

function Materia({ nombre, profe }) {
  return <li>{nombre} <small>({profe})</small></li>;
}

function ListaMaterias() {
  return (
    <ul>
      <Materia nombre="Redes I" profe="Dr. Méndez" />
      <Materia nombre="Fundamentos de SO" profe="M.C. Díaz" />
      <Materia nombre="Fundamentos de IA" profe="—" />
    </ul>
  );
}

function Pie() {
  return <footer>Semestre 26-27 A</footer>;
}

export default function App() {
  return (
    <>
      <Encabezado />
      <ListaMaterias />
      <Pie />
    </>
  );
}` }],
            notas: [
              { a: 'App.js', l: [23, 31], t: '<code>App</code> es la <b>raíz</b>: tiene 3 hijos (Encabezado, ListaMaterias, Pie).' },
              { a: 'App.js', l: [9, 17], t: '<code>ListaMaterias</code> tiene 3 hijos <code>Materia</code>: los <b>nietos</b> de App. Velo en la pestaña <b>Componentes</b>.' }] },
          reto: { texto: 'Agrega a <code>Pie</code> un hijo nuevo, <code>Contacto</code>, que muestre un correo. El árbol debe quedar App → Pie → Contacto.',
            metas: [
              { t: 'Existe <code>Contacto</code>', ok: "aulaComp('Contacto').length === 1" },
              { t: '<code>Contacto</code> es hijo de <code>Pie</code>', ok: "aulaComp('Pie')[0] && aulaComp('Pie')[0].h.some(x => x.n === 'Contacto')" }],
            pistas: ['Crea <code>function Contacto() { return &lt;p&gt;correo@unsij.edu.mx&lt;/p&gt;; }</code>', 'Dentro del <code>return</code> de <code>Pie</code> usa <code>&lt;Contacto /&gt;</code> (envuelve todo en <code>&lt;footer&gt;</code>).'],
            solucion: [{ nombre: 'App.js', codigo: "function Encabezado() {\n  return <header><h1>UNSIJ · Grupo 503</h1></header>;\n}\n\nfunction Contacto() {\n  return <p>grupo503@unsij.edu.mx</p>;\n}\n\nfunction Pie() {\n  return (\n    <footer>\n      Semestre 26-27 A\n      <Contacto />\n    </footer>\n  );\n}\n\nexport default function App() {\n  return (\n    <>\n      <Encabezado />\n      <Pie />\n    </>\n  );\n}" }] },
          quiz: [
            { q: 'En el árbol, ¿quién es la raíz normalmente?', o: ['El último componente', 'App', 'El CSS'], a: 1, w: 'App está hasta arriba.' },
            { q: 'Si un componente de arriba se vuelve a dibujar…', o: ['No pasa nada abajo', 'Sus hijos también se vuelven a dibujar'], a: 1, w: 'El cambio baja por el árbol.' }] }
      ] },
      { titulo: 'Intermedio · Adelanto: interactividad', lecciones: [

        { id: 'w-r-10', titulo: 'Eventos y estado con useState', resumen: 'La memoria de un componente y cómo responde a clics.',
          sencillo: `<p>Hasta ahora todo era fijo. Para que algo <b>cambie</b> con un clic necesitas dos cosas:</p>
<ol><li><b>Un evento</b>: <code>&lt;button onClick={sumar}&gt;</code> = «cuando hagan clic, ejecuta <code>sumar</code>». Va <b>sin paréntesis</b>: le pasas la función, no la ejecutas.</li>
<li><b>Estado</b>: la <b>memoria</b> del componente. Se crea con <code>useState</code>:
<pre>const [cuenta, setCuenta] = useState(0);</pre>
<code>cuenta</code> es el valor actual (empieza en 0) y <code>setCuenta</code> es la única forma de cambiarlo.</li></ol>
<p>Cuando llamas <code>setCuenta(cuenta + 1)</code>, React <b>vuelve a dibujar</b> el componente con el valor nuevo. En la pestaña <b>Componentes</b> lo verás parpadear en amarillo.</p>
<p>¿Por qué no una variable normal? Porque una variable normal se reinicia cada vez que el componente se dibuja, y además React no se entera de que cambió.</p>`,
          tecnico: `<p><code>useState(inicial)</code> es un <b>Hook</b> que regresa un par <code>[valor, setter]</code>. El setter <b>encola</b> un nuevo render; el valor dentro de esa ejecución no cambia (es una «foto» del render). Para actualizaciones basadas en el valor anterior usa la forma funcional: <code>setCuenta(c => c + 1)</code>.</p>
<p>Los Hooks solo se llaman en el nivel superior del componente (no dentro de if, for o funciones anidadas). Cada instancia del componente tiene su propio estado aislado. Los manejadores de eventos se pasan como referencia: <code>onClick={fn}</code>, no <code>onClick={fn()}</code>.</p>`,
          analogia: '<b>El estado es la libreta del mesero:</b> anota cuántos refrescos lleva la mesa. Cada vez que anota uno nuevo (setCuenta), vuelve a imprimir la cuenta (re‑render).',
          ejemplo: { archivos: [{ nombre: 'App.js', codigo: `import { useState } from 'react';

function Contador({ titulo }) {
  const [cuenta, setCuenta] = useState(0);

  function sumar() {
    setCuenta(cuenta + 1);
  }

  return (
    <div className="contador">
      <h3>{titulo}: {cuenta}</h3>
      <button onClick={sumar}>+1</button>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Contador titulo="Cafés" />
      <Contador titulo="Horas de estudio" />
    </>
  );
}` }, { nombre: 'estilos.css', codigo: '.contador { border: 1px solid #cdd; border-radius: 10px; padding: 8px 12px; margin: 8px 0; }\nbutton { padding: 6px 14px; margin-right: 6px; }' }],
            notas: [
              { a: 'App.js', l: [4, 4], t: '<code>useState(0)</code> crea la memoria. Toca «+1» y mira en <b>Componentes</b> cómo cambia <code>useState #1</code>.' },
              { a: 'App.js', l: [6, 8], t: 'La función que se ejecuta con el clic. <code>setCuenta</code> guarda el nuevo valor y pide redibujar.' },
              { a: 'App.js', l: [13, 13], t: '<code>onClick={sumar}</code> sin paréntesis: «cuando hagan clic, llama a sumar».' },
              { a: 'App.js', l: [21, 22], t: 'Dos contadores, <b>cada uno con su propia memoria</b>. Sumar en uno no cambia el otro.' }] },
          reto: { texto: 'Agrega dos botones al <code>Contador</code>: uno «−1», que reste, y uno «Reiniciar», que regrese a 0.',
            metas: [
              { t: 'Hay un botón «−1» o «-1»', ok: "[...document.querySelectorAll('button')].some(b => /[−-]1/.test(b.textContent))" },
              { t: 'Hay un botón «Reiniciar»', ok: "[...document.querySelectorAll('button')].some(b => /Reiniciar/i.test(b.textContent))" },
              { t: 'Cada Contador sigue teniendo su estado', ok: "aulaComp('Contador').length === 2 && aulaComp('Contador').every(c => c.estado.length >= 1)" }],
            pistas: ['Crea <code>function restar() { setCuenta(cuenta - 1); }</code>', 'Para reiniciar: <code>setCuenta(0)</code>. Puedes escribirlo directo: <code>onClick={() => setCuenta(0)}</code>', 'Los botones van junto al de +1.'],
            solucion: [{ nombre: 'App.js', codigo: "import { useState } from 'react';\n\nfunction Contador({ titulo }) {\n  const [cuenta, setCuenta] = useState(0);\n  return (\n    <div className=\"contador\">\n      <h3>{titulo}: {cuenta}</h3>\n      <button onClick={() => setCuenta(cuenta + 1)}>+1</button>\n      <button onClick={() => setCuenta(cuenta - 1)}>−1</button>\n      <button onClick={() => setCuenta(0)}>Reiniciar</button>\n    </div>\n  );\n}\n\nexport default function App() {\n  return (\n    <>\n      <Contador titulo=\"Cafés\" />\n      <Contador titulo=\"Horas de estudio\" />\n    </>\n  );\n}" }] },
          quiz: [
            { q: '¿Qué hace <code>setCuenta(5)</code>?', o: ['Nada', 'Guarda 5 y React vuelve a dibujar', 'Borra el componente'], a: 1, w: 'Cambiar el estado provoca un re‑render.' },
            { q: '¿Cuál es correcto?', o: ['onClick={sumar()}', 'onClick={sumar}'], a: 1, w: 'Con paréntesis se ejecutaría al dibujar.' },
            { q: 'Dos <code>&lt;Contador /&gt;</code>…', o: ['Comparten el mismo estado', 'Tiene cada uno su propio estado'], a: 1, w: 'El estado es local a cada instancia.' }] }
      ] }
    ]
  });
})(window);
