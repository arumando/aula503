/* Academia Web · Fundamentos desde cero: lo mínimo para entender React y Vue.
   Formato de lección: { id, titulo, resumen, sencillo, tecnico, analogia, ejemplo:{archivos, notas}, reto:{texto, archivos?, metas, pistas, solucion}, quiz } */
(function (root) {
  root.CURSOS_WEB = root.CURSOS_WEB || [];
  root.CURSOS_WEB.push({
    id: 'base', nombre: 'Fundamentos desde cero', corto: 'Fundamentos', logo: '{ }', color: '#C98A0E', modo: 'web',
    lema: 'Qué es una página, lo mínimo de JavaScript y el DOM. La base de React y Vue.',
    niveles: [{ titulo: 'Principiante · Antes de React y Vue', lecciones: [

      { id: 'w-base-1', titulo: '¿Qué es una página web?', resumen: 'HTML, CSS y JavaScript: esqueleto, ropa y músculos.',
        sencillo: `<p>Toda página web está hecha con <b>tres lenguajes</b> que trabajan juntos:</p>
<ul><li><b>HTML</b> dice <i>qué hay</i>: un título, un párrafo, un botón. Se escribe con <b>etiquetas</b> como <code>&lt;h1&gt;Hola&lt;/h1&gt;</code>: una que abre y otra que cierra.</li>
<li><b>CSS</b> dice <i>cómo se ve</i>: colores, tamaños, espacios. Se escribe con <b>reglas</b>: «a todos los <code>h1</code> ponles color azul».</li>
<li><b>JavaScript</b> dice <i>qué hace</i>: cuando tocas el botón, cambia el texto.</li></ul>
<p>El navegador lee el HTML y lo convierte en un <b>árbol</b> de cajas, el <b>DOM</b>. Con JavaScript puedes buscar una caja del árbol y cambiarla.</p>`,
        tecnico: `<p><b>HTML</b> es un lenguaje de marcado: describe la estructura del documento con elementos (<code>&lt;etiqueta atributo="valor"&gt;contenido&lt;/etiqueta&gt;</code>). <b>CSS</b> es un lenguaje de hojas de estilo: cada regla tiene un <b>selector</b> (<code>h1</code>, <code>.clase</code>, <code>#id</code>) y declaraciones <code>propiedad: valor</code>. <b>JavaScript</b> es el lenguaje de programación del navegador.</p>
<p>El navegador parsea el HTML y construye el <b>DOM</b> (Document Object Model), un árbol de nodos que JavaScript manipula con la API del DOM: <code>document.querySelector()</code>, <code>.textContent</code>, <code>.classList</code>, <code>addEventListener()</code>.</p>`,
        analogia: '<b>Como una persona:</b> el HTML es el esqueleto (qué partes hay), el CSS es la ropa (cómo se ve) y JavaScript son los músculos (qué hace cuando le pides algo).',
        ejemplo: { archivos: [
          { nombre: 'index.html', codigo: `<h1>Hola, mundo</h1>
<p id="mensaje">Todavía no tocas el botón</p>
<button id="boton">Tócame</button>` },
          { nombre: 'estilos.css', codigo: `h1 {
  font-family: sans-serif;
}

button {
  padding: 8px 16px;
  border-radius: 8px;
}` },
          { nombre: 'app.js', codigo: `// 1. Buscamos las cajas del árbol (DOM)
const boton = document.querySelector('#boton');
const mensaje = document.querySelector('#mensaje');

// 2. Cuando hagan clic en el botón…
boton.addEventListener('click', () => {
  // 3. …cambiamos el texto del párrafo
  mensaje.textContent = '¡Me tocaste!';
});` }],
          notas: [
            { a: 'index.html', l: [1, 3], t: 'Tres <b>etiquetas</b>: un título <code>h1</code>, un párrafo <code>p</code> y un botón. El <code>id</code> es como su nombre propio para encontrarlas.' },
            { a: 'estilos.css', l: [1, 3], t: 'Una <b>regla CSS</b>: el selector <code>h1</code> dice a quién aplica y entre llaves van los estilos.' },
            { a: 'app.js', l: [2, 3], t: '<code>document.querySelector(\'#boton\')</code> busca en el árbol la etiqueta con id «boton». El <code>#</code> significa «id».' },
            { a: 'app.js', l: [6, 9], t: '<code>addEventListener(\'click\', …)</code>: «cuando pase un clic, ejecuta esto». Dentro cambiamos el texto con <code>textContent</code>.' }] },
        reto: { texto: 'Modifica el ejemplo: pon tu nombre en el título, dale un color al título con CSS y haz que el botón escriba otro mensaje.',
          metas: [
            { t: 'El título ya no dice «Hola, mundo»', ok: "aulaTexto('h1') && aulaTexto('h1') !== 'Hola, mundo'" },
            { t: 'El título tiene un color (regla <code>color</code> en CSS)', ok: "aulaEstilo('h1','color') !== 'rgb(27, 34, 38)'" },
            { t: 'Al tocar el botón aparece un mensaje distinto a «¡Me tocaste!»', ok: "(document.querySelector('#boton').click(), aulaTexto('#mensaje')) !== '¡Me tocaste!' && aulaTexto('#mensaje') !== 'Todavía no tocas el botón'" }],
          pistas: ['El texto del título está en <b>index.html</b>, entre <code>&lt;h1&gt;</code> y <code>&lt;/h1&gt;</code>.', 'En <b>estilos.css</b>, dentro de la regla <code>h1 { }</code>, agrega <code>color: tomato;</code>', 'En <b>app.js</b> cambia el texto que está entre comillas después de <code>textContent =</code>.'],
          solucion: [{ nombre: 'index.html', codigo: '<h1>Hola, soy Armando</h1>\n<p id="mensaje">Todavía no tocas el botón</p>\n<button id="boton">Tócame</button>' }, { nombre: 'estilos.css', codigo: 'h1 {\n  font-family: sans-serif;\n  color: tomato;\n}\n\nbutton {\n  padding: 8px 16px;\n  border-radius: 8px;\n}' }, { nombre: 'app.js', codigo: "const boton = document.querySelector('#boton');\nconst mensaje = document.querySelector('#mensaje');\n\nboton.addEventListener('click', () => {\n  mensaje.textContent = '¡Ya aprendí a usar el DOM!';\n});" }] },
        quiz: [
          { q: '¿Qué lenguaje decide de qué color es un título?', o: ['HTML', 'CSS', 'JavaScript'], a: 1, w: 'CSS es la apariencia.' },
          { q: '¿Qué es el DOM?', o: ['Un lenguaje nuevo', 'El árbol de elementos que el navegador arma con tu HTML', 'Un tipo de servidor'], a: 1, w: 'JavaScript cambia la página modificando ese árbol.' },
          { q: 'En <code>document.querySelector(\'#menu\')</code>, ¿qué significa el <code>#</code>?', o: ['Una clase', 'Un id', 'Un comentario'], a: 1, w: '# = id, . = clase.' }] },

      { id: 'w-base-2', titulo: 'JavaScript mínimo: variables, funciones y objetos', resumen: 'Las 5 ideas de JavaScript que React y Vue usan todo el tiempo.',
        sencillo: `<p><b>Variable</b>: una cajita con nombre donde guardas un dato. Usa <code>const</code> si no va a cambiar y <code>let</code> si sí.</p>
<pre>const nombre = 'Ana';   // texto (string)
let edad = 20;          // número
edad = 21;              // con let sí se puede cambiar</pre>
<p><b>Función</b>: una receta con nombre. Le das ingredientes (<b>parámetros</b>) y te regresa un resultado (<b>return</b>).</p>
<pre>function doble(n) {
  return n * 2;
}
doble(5);  // 10</pre>
<p><b>Función flecha</b>: la misma receta, escrita más corto. React la usa muchísimo: <code>const doble = (n) => n * 2;</code></p>
<p><b>Objeto</b>: una ficha con varios datos con nombre: <code>{ nombre: 'Ana', edad: 20 }</code>. Se lee con punto: <code>alumno.nombre</code>.</p>
<p><b>Template string</b>: texto con huecos para variables, entre comillas invertidas: <code>\`Hola, \${nombre}\`</code>.</p>`,
        tecnico: `<p><code>const</code> crea un enlace que no se puede reasignar (el objeto al que apunta sí puede mutar); <code>let</code> crea uno reasignable con alcance de bloque. Evita <code>var</code>.</p>
<p>Las funciones son valores de primera clase: se pueden guardar en variables, pasar como argumento (<i>callbacks</i>) y regresar desde otras funciones. Las <b>arrow functions</b> <code>(a) => expr</code> regresan la expresión implícitamente y no tienen su propio <code>this</code>.</p>
<p>Los objetos literales agrupan pares clave‑valor. La <b>desestructuración</b> <code>const { nombre, edad } = alumno</code> extrae propiedades a variables (así se reciben las props en React). Los <b>template literals</b> permiten interpolación con <code>\${expresión}</code>.</p>`,
        analogia: '<b>Variable</b> = un frasco con etiqueta. <b>Función</b> = una licuadora: metes ingredientes, sale un licuado. <b>Objeto</b> = la credencial de la escuela: nombre, matrícula, carrera en una sola tarjeta.',
        ejemplo: { archivos: [{ nombre: 'app.js', codigo: `// Variables
const nombre = 'Ana';
let edad = 20;
edad = edad + 1;

// Función normal
function saludo(persona) {
  return 'Hola, ' + persona;
}

// La misma idea con función flecha y template string
const saludo2 = (persona) => \`Hola, \${persona}\`;

// Objeto
const alumno = { nombre: 'Ana', edad: 21, carrera: 'Software' };

// Desestructuración: sacar datos del objeto
const { carrera } = alumno;

console.log(saludo(nombre));
console.log(saludo2(alumno.nombre), 'tiene', alumno.edad);
console.log('Carrera:', carrera);` }],
          notas: [
            { a: 'app.js', l: [2, 4], t: '<code>const</code> no cambia; <code>let</code> sí. En la línea 4 <code>edad</code> pasa de 20 a 21.' },
            { a: 'app.js', l: [7, 9], t: 'Una función recibe <code>persona</code> y <b>regresa</b> un texto. Sin <code>return</code> regresaría <code>undefined</code>.' },
            { a: 'app.js', l: [12, 12], t: 'Función flecha: <code>(persona) => …</code>. Lo que va después de la flecha es lo que regresa. <code>\${persona}</code> mete la variable en el texto.' },
            { a: 'app.js', l: [15, 18], t: 'Un objeto agrupa datos. <code>const { carrera } = alumno</code> saca la propiedad <code>carrera</code> a su propia variable. <b>Así reciben las props los componentes de React.</b>' }] },
        reto: { texto: 'Abre la pestaña <b>Consola</b> para ver lo que imprime. Luego escribe al final del archivo: una función <code>saludar(nombre)</code> que regrese <code>"Hola, " + nombre</code>, y un objeto <code>mascota</code> con <code>nombre</code> (texto) y <code>edad</code> (número).',
          metas: [
            { t: 'Existe la función <code>saludar</code>', ok: "typeof saludar === 'function'" },
            { t: '<code>saludar(\'Luis\')</code> regresa «Hola, Luis»', ok: "saludar('Luis') === 'Hola, Luis'" },
            { t: 'Existe el objeto <code>mascota</code> con <code>nombre</code> de texto y <code>edad</code> numérica', ok: "typeof mascota === 'object' && typeof mascota.nombre === 'string' && typeof mascota.edad === 'number'" }],
          pistas: ['Copia la forma de la función <code>saludo</code> pero cámbiale el nombre a <code>saludar</code>.', 'Cuidado con el espacio: <code>\'Hola, \' + nombre</code>.', 'El objeto: <code>const mascota = { nombre: \'Firulais\', edad: 3 };</code> (el número va sin comillas).'],
          solucion: [{ nombre: 'app.js', codigo: "function saludar(nombre) {\n  return 'Hola, ' + nombre;\n}\n\nconst mascota = { nombre: 'Firulais', edad: 3 };\n\nconsole.log(saludar('Luis'));\nconsole.log(mascota);" }] },
        quiz: [
          { q: '¿Cuál se puede reasignar después?', o: ['const', 'let'], a: 1, w: 'const no se reasigna.' },
          { q: '¿Qué regresa <code>((n) => n + 1)(4)</code>?', o: ['4', '5', 'undefined'], a: 1, w: 'La flecha regresa n + 1.' },
          { q: 'Con <code>const { edad } = { nombre: \'Ana\', edad: 20 }</code>, ¿cuánto vale <code>edad</code>?', o: ['"Ana"', '20', 'undefined'], a: 1, w: 'Desestructurar saca la propiedad con ese nombre.' }] },

      { id: 'w-base-3', titulo: 'Arreglos: map y filter', resumen: 'Listas de datos y cómo transformarlas. Así se dibujan listas en React y Vue.',
        sencillo: `<p>Un <b>arreglo</b> es una lista en orden: <code>['manzana', 'pera', 'uva']</code>. Cada elemento tiene una posición que empieza en 0.</p>
<p><b>map</b> recorre la lista y crea <b>otra lista del mismo tamaño</b>, transformando cada elemento. Como una máquina que a cada fruta le pone una etiqueta.</p>
<pre>[1, 2, 3].map(n => n * 10)   // [10, 20, 30]</pre>
<p><b>filter</b> crea una lista nueva <b>solo con los que pasan una prueba</b>. Como un colador.</p>
<pre>[5, 8, 2].filter(n => n > 4)  // [5, 8]</pre>
<p>Importante: <code>map</code> y <code>filter</code> <b>no cambian</b> la lista original; siempre te dan una nueva.</p>`,
        tecnico: `<p><code>Array.prototype.map(fn)</code> devuelve un nuevo arreglo con <code>fn(elemento, índice)</code> aplicado a cada elemento. <code>filter(fn)</code> devuelve los elementos para los que <code>fn</code> regresa un valor <i>truthy</i>. Ambos son <b>inmutables</b> respecto al original, a diferencia de <code>push</code>, <code>splice</code> o <code>sort</code>, que lo mutan.</p>
<p>En React, <code>lista.map(x => &lt;li&gt;…&lt;/li&gt;)</code> convierte datos en elementos de UI. La <b>sintaxis spread</b> <code>[...lista, nuevo]</code> crea un arreglo nuevo con un elemento extra sin mutar el original (patrón para actualizar estado).</p>`,
        analogia: '<b>map</b> = una fábrica de tortas: entran panes, salen tortas (mismo número). <b>filter</b> = el portero de una fiesta: solo pasan los que están en la lista.',
        ejemplo: { archivos: [{ nombre: 'app.js', codigo: `const alumnos = [
  { nombre: 'Ana', calificacion: 92 },
  { nombre: 'Luis', calificacion: 65 },
  { nombre: 'Iris', calificacion: 78 }
];

// map: de cada alumno sacamos solo su nombre
const nombres = alumnos.map(a => a.nombre);

// filter: solo los aprobados (70 o más)
const aprobados = alumnos.filter(a => a.calificacion >= 70);

// spread: lista nueva con un alumno más (sin tocar la original)
const conNuevo = [...alumnos, { nombre: 'Josafat', calificacion: 88 }];

console.log(nombres);
console.log(aprobados.length, 'aprobados');
console.log(alumnos.length, '→', conNuevo.length);` }],
          notas: [
            { a: 'app.js', l: [1, 5], t: 'Un arreglo de <b>objetos</b>: cada alumno es una ficha. Así suelen llegar los datos de un servidor.' },
            { a: 'app.js', l: [8, 8], t: '<code>map</code> recibe una función flecha: «de cada <code>a</code>, dame <code>a.nombre</code>». Resultado: <code>[\'Ana\', \'Luis\', \'Iris\']</code>.' },
            { a: 'app.js', l: [11, 11], t: '<code>filter</code> se queda con los que cumplen la condición. Luis (65) se queda fuera.' },
            { a: 'app.js', l: [14, 14], t: '<code>...alumnos</code> «desempaca» la lista dentro de una nueva. La original sigue con 3.' }] },
        reto: { texto: 'Con el arreglo <code>precios = [10, 20, 30]</code>: crea <code>dobles</code> con <code>map</code> (cada precio por 2) y <code>caros</code> con <code>filter</code> (solo los mayores a 15).',
          archivos: [{ nombre: 'app.js', codigo: "const precios = [10, 20, 30];\n\n// Escribe aquí dobles y caros\n\n\nconsole.log(dobles, caros);" }],
          metas: [
            { t: '<code>dobles</code> es <code>[20, 40, 60]</code>', ok: "JSON.stringify(dobles) === '[20,40,60]'" },
            { t: '<code>caros</code> es <code>[20, 30]</code>', ok: "JSON.stringify(caros) === '[20,30]'" },
            { t: '<code>precios</code> no cambió', ok: "JSON.stringify(precios) === '[10,20,30]'" }],
          pistas: ['<code>const dobles = precios.map(p => …);</code>', 'Para filter la flecha regresa verdadero o falso: <code>p => p > 15</code>', 'Solución casi completa: <code>const caros = precios.filter(p => p > 15);</code>'],
          solucion: [{ nombre: 'app.js', codigo: "const precios = [10, 20, 30];\n\nconst dobles = precios.map(p => p * 2);\nconst caros = precios.filter(p => p > 15);\n\nconsole.log(dobles, caros);" }] },
        quiz: [
          { q: '<code>[1,2,3].map(x => x + 1)</code> da…', o: ['[1,2,3]', '[2,3,4]', '6'], a: 1, w: 'Suma 1 a cada uno.' },
          { q: '¿Cuál NO cambia la lista original?', o: ['push', 'filter', 'splice'], a: 1, w: 'filter y map regresan una lista nueva.' },
          { q: '<code>[...a, 4]</code> con <code>a = [1,2]</code> da…', o: ['[1,2,4]', '[[1,2],4]', '[4,1,2]'], a: 0, w: 'Spread desempaca los elementos.' }] },

      { id: 'w-base-4', titulo: 'El DOM y por qué existen React y Vue', resumen: 'Imperativo contra declarativo: la gran idea de los frameworks.',
        sencillo: `<p>Con JavaScript puro, para que la pantalla cambie tienes que dar <b>cada paso a mano</b>: buscar el elemento, crear uno nuevo, ponerle texto, pegarlo… Si se te olvida un paso, la pantalla y tus datos dejan de coincidir. Eso se llama estilo <b>imperativo</b> (dar órdenes una por una).</p>
<p>React y Vue usan otra idea, el estilo <b>declarativo</b>: tú solo dices «<i>así debe verse la pantalla según estos datos</i>». Cuando cambian los datos, ellos actualizan la pantalla solos.</p>
<p>Además te dejan partir la página en <b>componentes</b>: piezas reutilizables, como bloques de LEGO (un botón, una tarjeta, un menú).</p>`,
        tecnico: `<p>Manipular el DOM a mano (<code>createElement</code>, <code>appendChild</code>, <code>textContent</code>) es <b>imperativo</b>: describes transiciones. El estado de la UI queda disperso en el DOM y es fácil que se desincronice de los datos.</p>
<p>React y Vue son <b>declarativos</b>: la UI es una función del estado (<code>UI = f(estado)</code>). React re‑ejecuta tus componentes y <b>reconcilia</b> un árbol virtual (Virtual DOM) para aplicar solo los cambios mínimos. Vue usa un sistema de <b>reactividad</b> basado en <i>proxies</i> que sabe qué partes dependen de qué datos y las vuelve a renderizar.</p>`,
        analogia: '<b>Imperativo</b> = darle indicaciones a un taxista: «a la derecha, dos cuadras, a la izquierda…». <b>Declarativo</b> = decirle «lléveme al zócalo» y que él encuentre el camino.',
        ejemplo: { archivos: [
          { nombre: 'index.html', codigo: `<h2>Lista de tareas (JavaScript puro)</h2>
<ul id="lista"></ul>
<button id="agregar">Agregar tarea</button>
<p id="total"></p>` },
          { nombre: 'app.js', codigo: `const tareas = ['Estudiar redes', 'Hacer el resumen'];
const lista = document.querySelector('#lista');
const total = document.querySelector('#total');

// Estilo imperativo: dibujar a mano, paso por paso
function dibujar() {
  lista.innerHTML = '';                 // 1. borrar todo
  tareas.forEach(t => {
    const li = document.createElement('li');  // 2. crear
    li.textContent = t;                 // 3. poner texto
    lista.appendChild(li);              // 4. pegar
  });
  total.textContent = tareas.length + ' tareas';  // 5. ¡no olvidar esto!
}

document.querySelector('#agregar').addEventListener('click', () => {
  tareas.push('Tarea ' + (tareas.length + 1));
  dibujar();   // 6. ¡y volver a dibujar!
});

dibujar();` }],
          notas: [
            { a: 'app.js', l: [6, 14], t: 'Para dibujar la lista damos <b>5 órdenes</b>. Abre <b>DOM y estilos</b> para ver cómo quedan los <code>&lt;li&gt;</code> dentro del <code>&lt;ul&gt;</code>.' },
            { a: 'app.js', l: [16, 19], t: 'Cada vez que cambian los datos hay que acordarse de llamar <code>dibujar()</code>. Si lo olvidas, la pantalla queda vieja. <b>Esto es lo que React y Vue hacen por ti.</b>' }] },
        reto: { texto: 'Prueba el problema: borra la línea <code>dibujar();</code> que está dentro del clic (línea 18) y toca «Agregar tarea». La lista no se actualiza aunque el arreglo sí cambió. Después agrega una función <code>quitarUltima()</code> que haga <code>tareas.pop()</code> y vuelva a dibujar.',
          metas: [
            { t: 'Existe <code>quitarUltima</code>', ok: "typeof quitarUltima === 'function'" },
            { t: '<code>quitarUltima()</code> quita un <code>&lt;li&gt;</code> de la pantalla', ok: "(()=>{const a=document.querySelectorAll('li').length; quitarUltima(); return document.querySelectorAll('li').length === a - 1 || a === 0})()" }],
          pistas: ['<code>function quitarUltima() { … }</code>', 'Dentro: <code>tareas.pop();</code> y luego <code>dibujar();</code>'],
          solucion: [{ nombre: 'app.js', codigo: "const tareas = ['Estudiar redes', 'Hacer el resumen'];\nconst lista = document.querySelector('#lista');\nconst total = document.querySelector('#total');\n\nfunction dibujar() {\n  lista.innerHTML = '';\n  tareas.forEach(t => {\n    const li = document.createElement('li');\n    li.textContent = t;\n    lista.appendChild(li);\n  });\n  total.textContent = tareas.length + ' tareas';\n}\n\nfunction quitarUltima() {\n  tareas.pop();\n  dibujar();\n}\n\ndocument.querySelector('#agregar').addEventListener('click', () => {\n  tareas.push('Tarea ' + (tareas.length + 1));\n  dibujar();\n});\n\ndibujar();" }] },
        quiz: [
          { q: '«Dime cómo debe verse según los datos y tú actualizas» es el estilo…', o: ['Imperativo', 'Declarativo'], a: 1, w: 'Así trabajan React y Vue.' },
          { q: '¿Qué es un componente?', o: ['Un archivo CSS', 'Una pieza reutilizable de la interfaz', 'Un servidor'], a: 1, w: 'Como bloques de LEGO.' }] }
    ] }]
  });
})(window);
