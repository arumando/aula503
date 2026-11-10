/* Academia Web · Vue desde cero. Sigue «Essentials» de vuejs.org (con explicaciones propias),
   usando archivos .vue con <script setup>, igual que la documentación. */
(function (root) {
  root.CURSOS_WEB = root.CURSOS_WEB || [];
  const V = (script, template, style) => '<script setup>\n' + script.trim() + '\n</script>\n\n<template>\n' + template.trim() + '\n</template>' + (style ? '\n\n<style>\n' + style.trim() + '\n</style>' : '');
  root.CURSOS_WEB.push({
    id: 'vue', nombre: 'Vue desde cero', corto: 'Vue', logo: 'V', color: '#2F9C6F', modo: 'vue',
    fuente: 'https://vuejs.org/guide/essentials/application.html',
    lema: 'Plantillas, reactividad, computed, v-if, v-for, eventos, v-model, watchers y componentes.',
    niveles: [
      { titulo: 'Básico · Lo esencial', lecciones: [

        { id: 'w-v-1', titulo: 'Crear una aplicación', resumen: 'createApp, el componente raíz y mount.',
          sencillo: `<p>Toda app de Vue empieza igual:</p>
<pre>import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')</pre>
<ul><li><code>createApp(App)</code> crea la aplicación a partir de un componente principal, el <b>componente raíz</b> (App).</li>
<li><code>.mount('#app')</code> la «monta» dentro de la etiqueta <code>&lt;div id="app"&gt;</code> del HTML. Desde ahí Vue se encarga de esa parte de la página.</li></ul>
<p>Un archivo <code>.vue</code> tiene hasta 3 partes: <code>&lt;script setup&gt;</code> (los datos y la lógica), <code>&lt;template&gt;</code> (lo que se ve) y <code>&lt;style&gt;</code> (cómo se ve).</p>
<p><i>En este laboratorio el <code>createApp(App).mount('#app')</code> ya se hace solo; tú escribes los archivos .vue.</i></p>`,
          tecnico: `<p><code>createApp(componenteRaíz)</code> crea una <b>instancia de aplicación</b>. Antes de montarla se configura: <code>app.component()</code> registra componentes globales, <code>app.use()</code> instala plugins (router, Pinia) y <code>app.config.errorHandler</code> captura errores. <code>mount(selector)</code> renderiza el componente raíz dentro del contenedor y regresa la instancia del componente, no la app.</p>
<p>Un <b>SFC</b> (Single‑File Component, <code>.vue</code>) encapsula plantilla, lógica y estilos. <code>&lt;script setup&gt;</code> es azúcar sintáctico de la Composition API: todo lo declarado en el nivel superior queda disponible en la plantilla.</p>`,
          analogia: '<b>createApp es abrir una tienda</b> con su gerente (App). <b>mount</b> es decir en qué local de la calle se instala (#app).',
          ejemplo: { archivos: [{ nombre: 'App.vue', codigo: V(`const escuela = 'UNSIJ'
const grupo = 503`, `<main>
  <h1>Hola desde Vue 👋</h1>
  <p>Soy de la {{ escuela }}, grupo {{ grupo }}.</p>
</main>`, `h1 { color: #2f9c6f; font-family: sans-serif; }`) }],
            notas: [
              { a: 'App.vue', l: [1, 4], t: '<code>&lt;script setup&gt;</code>: las variables de aquí se pueden usar en la plantilla.' },
              { a: 'App.vue', l: [6, 11], t: '<code>&lt;template&gt;</code>: lo que se ve. <code>{{ escuela }}</code> muestra el valor de la variable.' },
              { a: 'App.vue', l: [13, 15], t: '<code>&lt;style&gt;</code>: el CSS del componente. En <b>Componentes</b> verás <code>App</code> como raíz.' }] },
          reto: { texto: 'Agrega en el script una constante <code>nombre</code> con tu nombre y muéstrala en un <code>&lt;p class="nombre"&gt;</code>.',
            metas: [{ t: 'Hay un <code>p.nombre</code> con texto', ok: "aulaTexto('.nombre') && aulaTexto('.nombre').length > 1" }, { t: '<code>nombre</code> es parte del estado de App', ok: "aulaComp('App')[0].estado.some(e => e.tipo === 'nombre')" }],
            pistas: ['<code>const nombre = \'Armando\'</code> dentro de <code>&lt;script setup&gt;</code>.', 'En la plantilla: <code>&lt;p class="nombre"&gt;{{ nombre }}&lt;/p&gt;</code>'],
            solucion: [{ nombre: 'App.vue', codigo: V(`const escuela = 'UNSIJ'\nconst grupo = 503\nconst nombre = 'José Armando'`, `<main>\n  <h1>Hola desde Vue 👋</h1>\n  <p>Soy de la {{ escuela }}, grupo {{ grupo }}.</p>\n  <p class="nombre">{{ nombre }}</p>\n</main>`) }] },
          quiz: [
            { q: '¿Qué hace <code>.mount(\'#app\')</code>?', o: ['Descarga Vue', 'Pone la app dentro del elemento con id app', 'Crea un componente'], a: 1, w: 'Dice dónde vive la app.' },
            { q: '¿Qué parte de un .vue tiene lo que se ve?', o: ['script', 'template', 'style'], a: 1, w: 'template.' }] },

        { id: 'w-v-2', titulo: 'Sintaxis de plantillas', resumen: '{{ }}, v-bind (:) y directivas.',
          sencillo: `<p>La plantilla es HTML con superpoderes:</p>
<ul><li><b>Interpolación</b> <code>{{ }}</code>: muestra un valor como texto. Adentro va JavaScript sencillo: <code>{{ precio * 2 }}</code>, <code>{{ ok ? 'Sí' : 'No' }}</code>.</li>
<li><b>v-bind</b>: para poner un valor en un <b>atributo</b>. <code>v-bind:href="enlace"</code>, o corto: <code>:href="enlace"</code>. Con <code>{{ }}</code> no funciona en atributos.</li>
<li><b>Atributos de sí o no</b>: <code>:disabled="bloqueado"</code> pone o quita el atributo según el valor.</li>
<li><b>Directivas</b>: atributos especiales que empiezan con <code>v-</code> (<code>v-if</code>, <code>v-for</code>, <code>v-on</code>…). Algunas llevan un <b>argumento</b> después de los dos puntos (<code>v-on:click</code>) y <b>modificadores</b> con punto (<code>@submit.prevent</code>).</li></ul>`,
          tecnico: `<p>Las plantillas de Vue son HTML válido que el compilador convierte en funciones de render optimizadas. Las interpolaciones con «mostachos» escapan HTML (para insertar HTML crudo existe <code>v-html</code>, con riesgo de XSS). Dentro de las plantillas solo se admiten <b>expresiones</b> individuales con acceso a una lista restringida de globales.</p>
<p><code>v-bind</code> enlaza atributos o props de forma reactiva; la abreviatura es <code>:</code> y, desde Vue 3.4, <code>:id</code> equivale a <code>:id="id"</code>. Los argumentos dinámicos (<code>:[nombre]="valor"</code>) y los modificadores (<code>.prevent</code>, <code>.stop</code>) extienden las directivas.</p>`,
          analogia: '<b>{{ }} es una ventanita de texto</b>; <b>: (v-bind) es un cable</b> que conecta un atributo con una variable: si la variable cambia, el atributo cambia.',
          ejemplo: { archivos: [{ nombre: 'App.vue', codigo: V(`const materia = 'Tecnologías Web'
const enlace = 'https://vuejs.org'
const horas = 4
const bloqueado = true
const resaltado = '<b>Esto viene como HTML</b>'`, `<h2>{{ materia }}</h2>
<p>Horas a la semana: {{ horas }} · al mes: {{ horas * 4 }}</p>
<p>{{ horas > 3 ? 'Materia pesada' : 'Materia ligera' }}</p>

<a :href="enlace" target="_blank">Documentación de Vue</a>
<p><button :disabled="bloqueado">Botón bloqueado</button></p>

<p v-html="resaltado"></p>`) }],
            notas: [
              { a: 'App.vue', l: [9, 11], t: '<code>{{ }}</code> acepta cuentas y el ternario. Todo es una sola expresión.' },
              { a: 'App.vue', l: [13, 13], t: '<code>:href="enlace"</code> conecta el atributo href con la variable. Revisa <b>DOM y estilos</b>: el <code>a</code> tiene el href real.' },
              { a: 'App.vue', l: [14, 14], t: '<code>:disabled="bloqueado"</code>: como es <code>true</code>, el botón queda deshabilitado.' },
              { a: 'App.vue', l: [16, 16], t: '<code>v-html</code> inserta HTML de verdad. Úsalo solo con contenido confiable.' }] },
          reto: { texto: 'Agrega una constante <code>foto</code> con el texto <code>"logo.png"</code> y una etiqueta <code>&lt;img&gt;</code> que la use en <code>src</code> con <b>v-bind</b>, y un <code>alt</code> fijo.',
            metas: [{ t: 'Hay una imagen con <code>src</code> que termina en logo.png', ok: "document.querySelector('img') && /logo\\.png$/.test(document.querySelector('img').getAttribute('src'))" }, { t: 'La imagen tiene <code>alt</code>', ok: "document.querySelector('img') && !!document.querySelector('img').getAttribute('alt')" }],
            pistas: ['En el script: <code>const foto = \'logo.png\'</code>', 'En la plantilla: <code>&lt;img :src="foto" alt="Logo"&gt;</code> (la imagen no existe; está bien que no se vea).'],
            solucion: [{ nombre: 'App.vue', codigo: V(`const foto = 'logo.png'`, `<img :src="foto" alt="Logo de la escuela">`) }] },
          quiz: [
            { q: '¿Cómo se pone una variable en el atributo <code>href</code>?', o: ['href="{{ enlace }}"', ':href="enlace"'], a: 1, w: 'Los mostachos no funcionan en atributos.' },
            { q: '<code>:</code> es la forma corta de…', o: ['v-on', 'v-bind', 'v-if'], a: 1, w: 'Y @ es la forma corta de v-on.' }] },

        { id: 'w-v-3', titulo: 'Reactividad: ref y reactive', resumen: 'Datos que, al cambiar, actualizan la pantalla solos.',
          sencillo: `<p>Si un dato va a <b>cambiar</b> y quieres que la pantalla se actualice sola, créalo con <code>ref</code>:</p>
<pre>const cuenta = ref(0)</pre>
<ul><li>En el <b>script</b> se lee y cambia con <code>.value</code>: <code>cuenta.value++</code></li>
<li>En la <b>plantilla</b> se usa <b>sin</b> .value: <code>{{ cuenta }}</code>. Vue lo «desenvuelve» por ti.</li></ul>
<p><code>reactive</code> sirve para <b>objetos</b> y no usa .value: <code>const estado = reactive({ cuenta: 0 })</code> → <code>estado.cuenta++</code>.</p>
<p>¿Por qué no una variable normal? Porque Vue no se entera cuando cambia. <code>ref</code> envuelve el dato en una «caja vigilada»: cuando alguien la cambia, Vue sabe qué partes de la pantalla usan ese dato y las vuelve a dibujar.</p>`,
          tecnico: `<p><code>ref()</code> regresa un objeto con una propiedad <code>.value</code> cuyos <i>getters/setters</i> registran dependencias (<i>track</i>) y disparan actualizaciones (<i>trigger</i>). Los refs de nivel superior se desenvuelven automáticamente en la plantilla. Un ref que contiene un objeto lo hace profundamente reactivo.</p>
<p><code>reactive()</code> regresa un <b>Proxy</b> del objeto. Limitaciones: solo acepta objetos, no se puede reemplazar el objeto completo y al desestructurarlo se pierde la reactividad. Por eso la documentación recomienda <code>ref</code> como API principal. Las actualizaciones del DOM se agrupan y se aplican en el siguiente <i>tick</i> (<code>nextTick()</code>).</p>`,
          analogia: '<b>ref es una caja con alarma:</b> cuando alguien cambia lo que hay adentro, suena y Vue corre a actualizar la pantalla.',
          ejemplo: { archivos: [{ nombre: 'App.vue', codigo: V(`import { ref, reactive } from 'vue'

const cuenta = ref(0)

function sumar() {
  cuenta.value++          // en el script: con .value
}

const alumno = reactive({ nombre: 'Ana', faltas: 0 })`, `<h2>Cafés de hoy: {{ cuenta }}</h2>
<button @click="sumar">+1 café</button>

<p>{{ alumno.nombre }} tiene {{ alumno.faltas }} faltas</p>
<button @click="alumno.faltas++">Poner falta</button>`) }],
            notas: [
              { a: 'App.vue', l: [4, 4], t: '<code>ref(0)</code> crea una caja reactiva con 0. En <b>Componentes</b> verás <code>cuenta</code> en el estado de App.' },
              { a: 'App.vue', l: [6, 8], t: 'En el script se usa <code>cuenta.value</code>. Toca el botón y mira cómo App se marca en amarillo (se volvió a dibujar).' },
              { a: 'App.vue', l: [10, 10], t: '<code>reactive</code> para un objeto completo: se usa sin .value.' },
              { a: 'App.vue', l: [14, 14], t: 'En la plantilla, <code>{{ cuenta }}</code> sin .value.' }] },
          reto: { texto: 'Agrega un <code>ref</code> llamado <code>pasos</code> que empiece en 0 y un botón «+2 pasos» que lo aumente de 2 en 2. Muéstralo en un <code>&lt;p id="pasos"&gt;</code>.',
            metas: [{ t: '<code>pasos</code> está en el estado', ok: "aulaComp('App')[0].estado.some(e => e.tipo === 'pasos')" }, { t: 'Al tocar «+2 pasos» el número sube 2', ok: "(()=>{const b=[...document.querySelectorAll('button')].find(x=>/\\+2/.test(x.textContent)); if(!b) return false; const a=parseInt(aulaTexto('#pasos').replace(/\\D+/g,''))||0; b.click(); const est=aulaComp('App')[0].estado.find(e=>e.tipo==='pasos'); return true})()" }],
            pistas: ['<code>const pasos = ref(0)</code>', 'En el botón: <code>@click="pasos += 2"</code> (en la plantilla no lleva .value).', '<code>&lt;p id="pasos"&gt;Pasos: {{ pasos }}&lt;/p&gt;</code>'],
            solucion: [{ nombre: 'App.vue', codigo: V(`import { ref } from 'vue'\nconst pasos = ref(0)`, `<p id="pasos">Pasos: {{ pasos }}</p>\n<button @click="pasos += 2">+2 pasos</button>`) }] },
          quiz: [
            { q: 'En el <b>script</b>, para cambiar <code>const x = ref(1)</code> escribes…', o: ['x = 2', 'x.value = 2'], a: 1, w: 'En el script siempre .value.' },
            { q: 'En la <b>plantilla</b> se escribe…', o: ['{{ x.value }}', '{{ x }}'], a: 1, w: 'Se desenvuelve solo.' },
            { q: '¿Qué pasa si cambias una variable normal (sin ref)?', o: ['La pantalla se actualiza', 'Vue no se entera y la pantalla no cambia'], a: 1, w: 'Por eso existe ref.' }] },

        { id: 'w-v-4', titulo: 'Propiedades computadas', resumen: 'Valores que se calculan solos a partir de otros.',
          sencillo: `<p>Una <b>computed</b> es un valor que se <b>calcula a partir de otros</b> y se actualiza solo cuando esos cambian.</p>
<pre>const precio = ref(50)
const cantidad = ref(3)
const total = computed(() => precio.value * cantidad.value)</pre>
<p>Si cambias <code>cantidad</code>, <code>total</code> se recalcula solo. En la plantilla se usa como cualquier dato: <code>{{ total }}</code>.</p>
<p><b>¿Por qué no una función?</b> Funcionaría, pero la computed <b>recuerda</b> su resultado (caché) y solo recalcula si cambian sus datos. Una función se ejecuta cada vez que la pantalla se dibuja.</p>
<p>Úsala para no poner lógica complicada dentro de la plantilla.</p>`,
          tecnico: `<p><code>computed(getter)</code> regresa un <i>ref</i> de solo lectura cuyo valor se <b>memoriza</b> según sus dependencias reactivas; se reevalúa de forma perezosa solo cuando alguna cambia. Un método en la plantilla, en cambio, se ejecuta en cada re‑render.</p>
<p>Los getters deben ser puros, sin efectos secundarios ni peticiones. Existen computadas escribibles con <code>{ get, set }</code>, pero son poco comunes. No mutes el valor computado: trátalo como una «foto» derivada.</p>`,
          analogia: '<b>Una computed es la celda de Excel con fórmula</b> (<code>=A1*B1</code>): cambias A1 y el total se actualiza solo, sin que lo vuelvas a escribir.',
          ejemplo: { archivos: [{ nombre: 'App.vue', codigo: V(`import { ref, computed } from 'vue'

const libros = ref(['Redes I', 'Sistemas Operativos', 'IA moderna'])

// Se recalcula solo cuando cambia «libros»
const mensaje = computed(() => libros.value.length > 0 ? 'Sí' : 'No')
const cuantos = computed(() => libros.value.length)

function agregar() {
  libros.value.push('Libro ' + (cuantos.value + 1))
}`, `<p>¿Tiene libros? <b>{{ mensaje }}</b> ({{ cuantos }})</p>
<button @click="agregar">Agregar libro</button>
<button @click="libros = []">Vaciar</button>`) }],
            notas: [
              { a: 'App.vue', l: [7, 8], t: 'Dos computadas que dependen de <code>libros</code>. En <b>Componentes</b> aparecen en el estado de App con su valor.' },
              { a: 'App.vue', l: [10, 12], t: 'Al agregar o vaciar, <code>mensaje</code> y <code>cuantos</code> se actualizan solas.' }] },
          reto: { texto: 'Crea <code>precio = ref(50)</code>, <code>cantidad = ref(3)</code> y una computed <code>total</code> que sea su multiplicación. Muéstrala en <code>&lt;p id="total"&gt;</code>.',
            metas: [{ t: '<code>total</code> vale 150', ok: "(aulaComp('App')[0].estado.find(e => e.tipo === 'total') || {v:{}}).v.v === 150" }, { t: 'Se muestra en #total', ok: "aulaTexto('#total') && aulaTexto('#total').includes('150')" }],
            pistas: ['Importa <code>computed</code>: <code>import { ref, computed } from \'vue\'</code>', '<code>const total = computed(() => precio.value * cantidad.value)</code>'],
            solucion: [{ nombre: 'App.vue', codigo: V(`import { ref, computed } from 'vue'\nconst precio = ref(50)\nconst cantidad = ref(3)\nconst total = computed(() => precio.value * cantidad.value)`, `<p id="total">Total: {{ total }}</p>\n<button @click="cantidad++">Una más</button>`) }] },
          quiz: [
            { q: '¿Cuándo se recalcula una computed?', o: ['Cada segundo', 'Cuando cambian los datos de los que depende', 'Nunca'], a: 1, w: 'Por eso es eficiente.' },
            { q: 'Diferencia con un método:', o: ['La computed guarda su resultado (caché)', 'Ninguna'], a: 0, w: 'El método se ejecuta en cada dibujado.' }] },

        { id: 'w-v-5', titulo: 'Clases y estilos dinámicos', resumen: ':class y :style según los datos.',
          sencillo: `<p>Con <code>:class</code> pones o quitas clases según una condición:</p>
<pre>&lt;div :class="{ activo: estaActivo, error: hayError }"&gt;</pre>
<p>Se lee: «pon la clase <code>activo</code> <b>si</b> <code>estaActivo</code> es verdadero». También acepta un arreglo: <code>:class="[claseA, claseB]"</code>.</p>
<p>Con <code>:style</code> pones estilos desde variables, en camelCase: <code>:style="{ color: miColor, fontSize: tamaño + 'px' }"</code>.</p>
<p>Puedes tener un <code>class</code> normal y un <code>:class</code> en la misma etiqueta; Vue los junta.</p>`,
          tecnico: `<p><code>:class</code> acepta un objeto (clave = clase, valor = booleano), un arreglo o una combinación, y se fusiona con el atributo <code>class</code> estático. Para lógica compleja conviene una computada que regrese el objeto de clases.</p>
<p><code>:style</code> acepta objetos con propiedades camelCase o kebab‑case entre comillas. Vue agrega prefijos de navegador automáticamente. En componentes con un solo elemento raíz, las clases que pasa el padre se agregan a ese elemento (<i>fallthrough</i>).</p>`,
          analogia: '<b>:class es como un interruptor de luces:</b> la clase se enciende o apaga según la condición.',
          ejemplo: { archivos: [{ nombre: 'App.vue', codigo: V(`import { ref } from 'vue'

const activo = ref(false)
const tamaño = ref(18)`, `<p :class="{ activo: activo }" :style="{ fontSize: tamaño + 'px' }" class="caja">
  {{ activo ? 'Encendido 💡' : 'Apagado' }}
</p>
<button @click="activo = !activo">Encender / apagar</button>
<button @click="tamaño += 4">Más grande</button>`, `.caja { padding: 12px; border-radius: 10px; border: 2px solid #ccc; transition: all .2s; }
.activo { background: #fff3c4; border-color: #e0a800; }`) }],
            notas: [
              { a: 'App.vue', l: [8, 8], t: '<code>:class="{ activo: activo }"</code>: la clase se pone solo si es verdadero. Inspecciona el <code>p</code> en <b>DOM y estilos</b> antes y después del clic.' },
              { a: 'App.vue', l: [8, 8], t: '<code>:style</code> con un objeto: el tamaño de letra sale de la variable.' }] },
          reto: { texto: 'Agrega un <code>ref</code> llamado <code>urgente</code> en <code>true</code> y un <code>&lt;p&gt;</code> que diga «Entrega mañana» con la clase <code>rojo</code> solo si <code>urgente</code> es verdadero. Define <code>.rojo { color: red; }</code> en el style.',
            metas: [{ t: 'Hay un elemento con clase <code>rojo</code>', ok: "!!document.querySelector('.rojo')" }, { t: 'Se ve de color rojo', ok: "aulaEstilo('.rojo','color') === 'rgb(255, 0, 0)'" }],
            pistas: ['<code>const urgente = ref(true)</code>', '<code>&lt;p :class="{ rojo: urgente }"&gt;Entrega mañana&lt;/p&gt;</code>', 'En <code>&lt;style&gt;</code>: <code>.rojo { color: red; }</code>'],
            solucion: [{ nombre: 'App.vue', codigo: V(`import { ref } from 'vue'\nconst urgente = ref(true)`, `<p :class="{ rojo: urgente }">Entrega mañana</p>\n<button @click="urgente = !urgente">Cambiar</button>`, `.rojo { color: red; }`) }] },
          quiz: [{ q: '<code>:class="{ ok: listo }"</code> con <code>listo = false</code>…', o: ['Pone la clase ok', 'No pone la clase ok'], a: 1, w: 'Solo si es verdadero.' }, { q: 'En <code>:style</code> se escribe…', o: ['font-size sin comillas', 'fontSize'], a: 1, w: 'camelCase (o \'font-size\' entre comillas).' }] },

        { id: 'w-v-6', titulo: 'Renderizado condicional', resumen: 'v-if, v-else-if, v-else y v-show.',
          sencillo: `<p>Es un <b>if dentro del HTML</b>:</p>
<pre>&lt;p v-if="calificacion >= 90"&gt;Excelente&lt;/p&gt;
&lt;p v-else-if="calificacion >= 70"&gt;Aprobado&lt;/p&gt;
&lt;p v-else&gt;Reprobado&lt;/p&gt;</pre>
<ul><li><code>v-else-if</code> y <code>v-else</code> van <b>justo después</b> del elemento con <code>v-if</code>, sin nada en medio.</li>
<li>Para mostrar o esconder <b>varios elementos juntos</b>, envuélvelos en <code>&lt;template v-if="…"&gt;</code>: es una caja invisible.</li></ul>
<p><b>v-if contra v-show:</b> <code>v-if</code> <b>quita</b> el elemento del HTML (como sacar el mueble del cuarto); <code>v-show</code> lo deja pero lo <b>oculta</b> con CSS (como taparlo con una sábana). Si algo se prende y apaga muy seguido, conviene <code>v-show</code>.</p>`,
          tecnico: `<p><code>v-if</code> es renderizado condicional «real»: destruye y recrea el elemento (y los componentes hijos, con sus <i>listeners</i> y estado) al alternar, y es perezoso (no renderiza nada mientras sea falso). <code>v-show</code> siempre renderiza y solo alterna <code>display: none</code>; no admite <code>v-else</code> ni funciona en <code>&lt;template&gt;</code>.</p>
<p>Regla práctica: <code>v-if</code> tiene mayor costo al alternar y <code>v-show</code> mayor costo inicial. No combines <code>v-if</code> y <code>v-for</code> en el mismo elemento: <code>v-if</code> tiene prioridad y no ve la variable del ciclo.</p>`,
          analogia: '<b>v-if</b> = sacar el mueble del cuarto. <b>v-show</b> = taparlo con una sábana: sigue ahí, pero no se ve.',
          ejemplo: { archivos: [{ nombre: 'App.vue', codigo: V(`import { ref } from 'vue'

const conectado = ref(true)
const calificacion = ref(85)
const menu = ref(false)`, `<p v-if="conectado">Bienvenido, Armando</p>
<p v-else>Inicia sesión</p>
<button @click="conectado = !conectado">Entrar / salir</button>

<h3>Calificación: <input type="number" v-model.number="calificacion" style="width:70px"></h3>
<p v-if="calificacion >= 90">⭐ Excelente</p>
<p v-else-if="calificacion >= 70">✅ Aprobado</p>
<p v-else>❌ Reprobado</p>

<button @click="menu = !menu">Menú</button>
<ul v-show="menu"><li>Perfil</li><li>Salir</li></ul>`) }],
            notas: [
              { a: 'App.vue', l: [9, 10], t: '<code>v-if</code> / <code>v-else</code>: uno u otro. Toca «Entrar / salir» y revisa el <b>DOM</b>: el párrafo de verdad desaparece.' },
              { a: 'App.vue', l: [14, 16], t: 'Cambia el número del input y la cadena if / else if / else elige qué mostrar.' },
              { a: 'App.vue', l: [19, 19], t: '<code>v-show</code>: en el DOM el <code>ul</code> siempre está, solo cambia su <code>display</code>. Compáralo.' }] },
          reto: { texto: 'Crea un <code>ref</code> <code>edad</code> en 17 y un párrafo con <code>id="acceso"</code> que diga «Puedes votar» si <code>edad >= 18</code> o «Aún no puedes votar» si no. Usa <code>v-if</code> / <code>v-else</code>.',
            metas: [{ t: 'Con 17 dice «Aún no puedes votar»', ok: "aulaTexto('#acceso') === 'Aún no puedes votar'" }, { t: '<code>edad</code> está en el estado', ok: "aulaComp('App')[0].estado.some(e => e.tipo === 'edad')" }],
            pistas: ['<code>const edad = ref(17)</code>', 'Los dos párrafos llevan <code>id="acceso"</code>; solo uno existe a la vez.', '<code>&lt;p v-if="edad >= 18" id="acceso"&gt;Puedes votar&lt;/p&gt;</code>'],
            solucion: [{ nombre: 'App.vue', codigo: V(`import { ref } from 'vue'\nconst edad = ref(17)`, `<p v-if="edad >= 18" id="acceso">Puedes votar</p>\n<p v-else id="acceso">Aún no puedes votar</p>\n<button @click="edad++">Cumplir años</button>`) }] },
          quiz: [
            { q: '¿Cuál quita el elemento del DOM?', o: ['v-if', 'v-show'], a: 0, w: 'v-show solo lo oculta.' },
            { q: '¿Dónde debe ir <code>v-else</code>?', o: ['En cualquier lugar', 'Justo después del elemento con v-if'], a: 1, w: 'Si hay algo en medio, falla.' },
            { q: 'Para un menú que se abre y cierra a cada rato conviene…', o: ['v-if', 'v-show'], a: 1, w: 'Alternar con v-show es más barato.' }] },

        { id: 'w-v-7', titulo: 'Renderizado de listas', resumen: 'v-for con :key.',
          sencillo: `<p><code>v-for</code> repite un elemento por cada dato de una lista:</p>
<pre>&lt;li v-for="alumno in alumnos" :key="alumno.id"&gt;
  {{ alumno.nombre }}
&lt;/li&gt;</pre>
<ul><li>Se lee «por cada <code>alumno</code> en <code>alumnos</code>».</li>
<li>Con posición: <code>v-for="(alumno, i) in alumnos"</code>, donde <code>i</code> empieza en 0.</li>
<li>También con números: <code>v-for="n in 5"</code> repite del 1 al 5.</li>
<li><b>:key</b> es la matrícula de cada elemento, para que Vue sepa cuál es cuál. Usa un id único.</li></ul>
<p>Para mostrar solo algunos, haz una <b>computed</b> que filtre. No pongas <code>v-if</code> y <code>v-for</code> en la misma etiqueta.</p>`,
          tecnico: `<p><code>v-for="item in items"</code> itera arreglos, objetos (<code>(valor, clave, índice) in objeto</code>) y rangos. <code>:key</code> permite que el algoritmo de <i>patching</i> reutilice y reordene nodos en vez de modificarlos en su lugar. Sin key, Vue aplica «in‑place patch», que falla con estado interno o inputs.</p>
<p>Vue detecta los métodos que mutan arreglos reactivos (<code>push</code>, <code>splice</code>, <code>sort</code>…). Para filtrar u ordenar sin mutar, usa una computada con <code>filter</code> o <code>toSorted</code>.</p>`,
          analogia: '<b>v-for es una fotocopiadora:</b> sacas una copia del molde por cada alumno de la lista, y cada copia lleva su matrícula (key).',
          ejemplo: { archivos: [{ nombre: 'App.vue', codigo: V(`import { ref, computed } from 'vue'

const alumnos = ref([
  { id: 1, nombre: 'Ana Laura', calificacion: 92 },
  { id: 2, nombre: 'Alexis', calificacion: 64 },
  { id: 3, nombre: 'Josafat', calificacion: 78 }
])
const aprobados = computed(() => alumnos.value.filter(a => a.calificacion >= 70))
let siguiente = 4
function agregar() {
  alumnos.value.push({ id: siguiente++, nombre: 'Nuevo ' + siguiente, calificacion: 70 })
}`, `<h3>Todos</h3>
<ol>
  <li v-for="(a, i) in alumnos" :key="a.id">#{{ i }} · {{ a.nombre }}: {{ a.calificacion }}</li>
</ol>
<h3>Aprobados ({{ aprobados.length }})</h3>
<ul>
  <li v-for="a in aprobados" :key="a.id">{{ a.nombre }}</li>
</ul>
<button @click="agregar">Agregar alumno</button>`) }],
            notas: [
              { a: 'App.vue', l: [9, 9], t: 'Una <b>computed</b> que filtra: así se evita mezclar v-if con v-for.' },
              { a: 'App.vue', l: [17, 17], t: '<code>v-for="(a, i) in alumnos"</code>: <code>a</code> es cada alumno e <code>i</code> su posición. <code>:key="a.id"</code> es su matrícula.' }] },
          reto: { texto: 'Crea un <code>ref</code> <code>materias</code> con 3 objetos <code>{ id, nombre }</code> y muéstralos con <code>v-for</code> dentro de <code>&lt;ul id="materias"&gt;</code>.',
            metas: [{ t: 'Hay 3 <code>li</code> en #materias', ok: "document.querySelectorAll('#materias li').length === 3" }, { t: '<code>materias</code> está en el estado', ok: "aulaComp('App')[0].estado.some(e => e.tipo === 'materias')" }],
            pistas: ['<code>const materias = ref([{ id: 1, nombre: \'Redes\' }, …])</code>', '<code>&lt;li v-for="m in materias" :key="m.id"&gt;{{ m.nombre }}&lt;/li&gt;</code>'],
            solucion: [{ nombre: 'App.vue', codigo: V(`import { ref } from 'vue'\nconst materias = ref([\n  { id: 1, nombre: 'Redes I' },\n  { id: 2, nombre: 'Fundamentos de IA' },\n  { id: 3, nombre: 'Tecnologías Web' }\n])`, `<ul id="materias">\n  <li v-for="m in materias" :key="m.id">{{ m.nombre }}</li>\n</ul>`) }] },
          quiz: [{ q: '<code>v-for="n in 3"</code> muestra…', o: ['0 1 2', '1 2 3'], a: 1, w: 'Los rangos empiezan en 1.' }, { q: '¿Se recomienda v-if y v-for en la misma etiqueta?', o: ['Sí', 'No: filtra con una computed'], a: 1, w: 'v-if se evalúa primero y no ve la variable del ciclo.' }] },

        { id: 'w-v-8', titulo: 'Manejo de eventos', resumen: 'v-on (@) para clics, teclas y formularios.',
          sencillo: `<p>Para reaccionar a lo que hace el usuario usas <code>v-on</code>, o corto <code>@</code>:</p>
<ul><li><b>Código directo</b>: <code>@click="cuenta++"</code></li>
<li><b>Una función</b>: <code>@click="saludar"</code> (Vue le pasa el evento)</li>
<li><b>Función con datos</b>: <code>@click="saludar('Ana')"</code>; si además quieres el evento, usa <code>$event</code>.</li></ul>
<p><b>Modificadores</b>, atajos con punto:</p>
<ul><li><code>@submit.prevent</code>: que el formulario no recargue la página.</li>
<li><code>@click.stop</code>: que el clic no «suba» al elemento padre.</li>
<li><code>@keyup.enter</code>: solo cuando presionen Enter.</li></ul>`,
          tecnico: `<p><code>v-on:evento="manejador"</code> acepta un manejador por referencia (método o función) o en línea (expresión). En la forma por referencia, Vue invoca la función con el objeto <code>Event</code> nativo; en línea, el evento está disponible como <code>$event</code>.</p>
<p>Los modificadores (<code>.stop</code>, <code>.prevent</code>, <code>.self</code>, <code>.capture</code>, <code>.once</code>, <code>.passive</code>) y los de tecla o ratón (<code>.enter</code>, <code>.esc</code>, <code>.ctrl</code>, <code>.left</code>) se encadenan y su orden importa.</p>`,
          analogia: '<b>@click es un timbre:</b> cuando lo tocan, suena la función que conectaste.',
          ejemplo: { archivos: [{ nombre: 'App.vue', codigo: V(`import { ref } from 'vue'

const cuenta = ref(0)
const mensaje = ref('')
const nota = ref('')

function saludar(nombre) {
  mensaje.value = 'Hola, ' + nombre
}
function guardar() {
  mensaje.value = 'Guardado: ' + nota.value
  nota.value = ''
}`, `<button @click="cuenta++">Clics: {{ cuenta }}</button>
<button @click="saludar('Ana')">Saludar a Ana</button>

<form @submit.prevent="guardar">
  <input v-model="nota" placeholder="Escribe y presiona Enter">
</form>
<p>{{ mensaje }}</p>`) }],
            notas: [
              { a: 'App.vue', l: [17, 17], t: '<code>@click="cuenta++"</code>: código directo. Mira los eventos en la pestaña <b>Consola</b>.' },
              { a: 'App.vue', l: [18, 18], t: 'Llamar una función con un argumento.' },
              { a: 'App.vue', l: [20, 22], t: '<code>@submit.prevent</code>: al presionar Enter se ejecuta <code>guardar</code> y la página no se recarga.' }] },
          reto: { texto: 'Agrega dos botones: «−1», que reste a <code>cuenta</code>, y «Reiniciar», que la ponga en 0.',
            metas: [{ t: 'Hay un botón −1', ok: "[...document.querySelectorAll('button')].some(b => /[−-]1/.test(b.textContent))" }, { t: 'Hay un botón Reiniciar que pone la cuenta en 0', ok: "(()=>{const bs=[...document.querySelectorAll('button')]; const r=bs.find(b=>/Reiniciar/i.test(b.textContent)); if(!r) return false; return true})()" }],
            pistas: ['<code>&lt;button @click="cuenta--"&gt;−1&lt;/button&gt;</code>', '<code>&lt;button @click="cuenta = 0"&gt;Reiniciar&lt;/button&gt;</code>'],
            solucion: [{ nombre: 'App.vue', codigo: V(`import { ref } from 'vue'\nconst cuenta = ref(0)`, `<p>Cuenta: {{ cuenta }}</p>\n<button @click="cuenta++">+1</button>\n<button @click="cuenta--">−1</button>\n<button @click="cuenta = 0">Reiniciar</button>`) }] },
          quiz: [{ q: '<code>@</code> es la forma corta de…', o: ['v-bind', 'v-on', 'v-model'], a: 1, w: 'v-on.' }, { q: '¿Qué hace <code>.prevent</code> en un submit?', o: ['Evita que la página se recargue', 'Borra el formulario'], a: 0, w: 'Llama a preventDefault().' }] },

        { id: 'w-v-9', titulo: 'Formularios con v-model', resumen: 'Conectar inputs con datos en ambos sentidos.',
          sencillo: `<p><code>v-model</code> conecta un campo de formulario con una variable <b>en los dos sentidos</b>: lo que escribes llega a la variable, y si la variable cambia, el campo cambia.</p>
<pre>const nombre = ref('Ana')
&lt;input v-model="nombre"&gt;
&lt;p&gt;Hola, {{ nombre }}&lt;/p&gt;</pre>
<ul><li><b>Checkbox</b>: guarda <code>true</code>/<code>false</code>; con un arreglo, guarda los marcados.</li>
<li><b>Radio</b> y <b>select</b>: guardan la opción elegida.</li>
<li>Modificadores: <code>.trim</code> quita espacios, <code>.number</code> lo convierte en número, <code>.lazy</code> actualiza al salir del campo.</li></ul>`,
          tecnico: `<p><code>v-model</code> es azúcar sintáctico: en un <code>&lt;input&gt;</code> de texto equivale a <code>:value="x" @input="x = $event.target.value"</code>. Según el elemento usa la propiedad y el evento adecuados (<code>checked</code>/<code>change</code> en checkbox y radio). Ignora los atributos <code>value</code>/<code>checked</code> iniciales: la fuente de verdad es el estado.</p>
<p>En componentes propios, <code>v-model</code> se traduce a la prop <code>modelValue</code> y al evento <code>update:modelValue</code>, simplificado con <code>defineModel()</code>.</p>`,
          analogia: '<b>v-model es un espejo:</b> lo que haces en el input se refleja en la variable y viceversa.',
          ejemplo: { archivos: [{ nombre: 'App.vue', codigo: V(`import { ref } from 'vue'

const nombre = ref('Ana')
const acepta = ref(false)
const materias = ref([])
const turno = ref('Matutino')
const edad = ref(20)`, `<p><input v-model.trim="nombre"> → Hola, <b>{{ nombre }}</b></p>
<p><label><input type="checkbox" v-model="acepta"> Acepto</label> → {{ acepta }}</p>
<p>
  <label><input type="checkbox" value="Redes" v-model="materias"> Redes</label>
  <label><input type="checkbox" value="IA" v-model="materias"> IA</label>
  → {{ materias }}
</p>
<p><select v-model="turno"><option>Matutino</option><option>Vespertino</option></select> → {{ turno }}</p>
<p><input type="number" v-model.number="edad"> → {{ typeof edad }} {{ edad }}</p>`) }],
            notas: [
              { a: 'App.vue', l: [11, 11], t: 'Escribe en el input: el saludo cambia al instante. <code>.trim</code> quita espacios de los lados.' },
              { a: 'App.vue', l: [13, 17], t: 'Varios checkbox con el mismo arreglo: guarda los marcados. Míralo en <b>Componentes</b>.' },
              { a: 'App.vue', l: [19, 19], t: '<code>.number</code>: guarda un número, no un texto.' }] },
          reto: { texto: 'Haz un formulario con <code>ciudad = ref(\'Ixtlán\')</code>, un input con <code>v-model</code> y un párrafo <code>id="saludo"</code> que diga «Vivo en Ixtlán» (con el valor de la variable).',
            metas: [{ t: 'El input tiene «Ixtlán»', ok: "document.querySelector('input') && document.querySelector('input').value === 'Ixtlán'" }, { t: '#saludo dice «Vivo en Ixtlán»', ok: "aulaTexto('#saludo') === 'Vivo en Ixtlán'" }],
            pistas: ['<code>const ciudad = ref(\'Ixtlán\')</code>', '<code>&lt;input v-model="ciudad"&gt;</code> y <code>&lt;p id="saludo"&gt;Vivo en {{ ciudad }}&lt;/p&gt;</code>'],
            solucion: [{ nombre: 'App.vue', codigo: V(`import { ref } from 'vue'\nconst ciudad = ref('Ixtlán')`, `<input v-model="ciudad">\n<p id="saludo">Vivo en {{ ciudad }}</p>`) }] },
          quiz: [{ q: 'v-model en un input de texto…', o: ['Solo muestra el valor', 'Conecta en ambos sentidos'], a: 1, w: 'Dos direcciones.' }, { q: '¿Qué modificador convierte a número?', o: ['.trim', '.number', '.lazy'], a: 1, w: '.number.' }] }
      ] },
      { titulo: 'Intermedio · Ciclo de vida, watchers y componentes', lecciones: [

        { id: 'w-v-10', titulo: 'Ciclo de vida', resumen: 'onMounted, onUpdated y onUnmounted.',
          sencillo: `<p>Un componente tiene una «vida»: <b>nace</b> (se crea y se pone en la pantalla), <b>cambia</b> (se actualiza) y <b>muere</b> (se quita). Vue te deja ejecutar código en esos momentos con los <b>ganchos del ciclo de vida</b>:</p>
<ul><li><code>onMounted(() => …)</code>: ya está en la pantalla. Aquí se piden datos a un servidor o se mide un elemento.</li>
<li><code>onUpdated(() => …)</code>: se acaba de volver a dibujar.</li>
<li><code>onUnmounted(() => …)</code>: se quitó. Aquí se limpian temporizadores.</li></ul>`,
          tecnico: `<p>Los ganchos se registran de forma síncrona durante <code>setup()</code>. El orden es: <code>setup</code> → <code>onBeforeMount</code> → <code>onMounted</code> (DOM disponible; los hijos se montan antes que el padre) → <code>onBeforeUpdate</code>/<code>onUpdated</code> en cada re‑render → <code>onBeforeUnmount</code>/<code>onUnmounted</code>. Libera en <code>onUnmounted</code> los recursos creados en <code>onMounted</code> (<code>setInterval</code>, <i>listeners</i>).</p>`,
          analogia: '<b>Como un inquilino:</b> onMounted = el día que llega y acomoda sus cosas; onUpdated = cuando reacomoda; onUnmounted = el día que se va y entrega las llaves (limpia).',
          ejemplo: { archivos: [{ nombre: 'App.vue', codigo: V(`import { ref, onMounted, onUpdated, onUnmounted } from 'vue'
import Reloj from './Reloj.vue'

const visible = ref(true)
onMounted(() => console.log('App: montado ✅'))
onUpdated(() => console.log('App: actualizado 🔁'))`, `<button @click="visible = !visible">{{ visible ? 'Quitar' : 'Poner' }} reloj</button>
<Reloj v-if="visible" />`) }, { nombre: 'Reloj.vue', codigo: V(`import { ref, onMounted, onUnmounted } from 'vue'

const segundos = ref(0)
let temporizador = null

onMounted(() => {
  console.log('Reloj: montado, arranco el temporizador')
  temporizador = setInterval(() => segundos.value++, 1000)
})
onUnmounted(() => {
  console.log('Reloj: desmontado, detengo el temporizador')
  clearInterval(temporizador)
})`, `<p>⏱️ {{ segundos }} s</p>`) }],
            notas: [
              { a: 'Reloj.vue', l: [7, 10], t: 'Al aparecer, el Reloj arranca un temporizador. Abre la <b>Consola</b>.' },
              { a: 'Reloj.vue', l: [11, 14], t: 'Al quitarlo con el botón, lo detiene. Si no, seguiría corriendo aunque no se vea.' }] },
          reto: { texto: 'En <b>App.vue</b>, cambia el mensaje de <code>onMounted</code> para que imprima exactamente «Montado».',
            metas: [{ t: 'La consola muestra «Montado»', ok: "aulaConsola.some(x => x.trim() === 'Montado')" }],
            pistas: ['<code>onMounted(() => console.log(\'Montado\'))</code>'],
            solucion: [{ nombre: 'App.vue', codigo: V(`import { ref, onMounted, onUpdated } from 'vue'\nimport Reloj from './Reloj.vue'\n\nconst visible = ref(true)\nonMounted(() => console.log('Montado'))\nonUpdated(() => console.log('App: actualizado 🔁'))`, `<button @click="visible = !visible">{{ visible ? 'Quitar' : 'Poner' }} reloj</button>\n<Reloj v-if="visible" />`) }] },
          quiz: [{ q: '¿Dónde arrancas un setInterval?', o: ['onMounted', 'onUnmounted'], a: 0, w: 'Y lo detienes en onUnmounted.' }, { q: '¿Qué pasa si no limpias el temporizador?', o: ['Nada', 'Sigue corriendo aunque el componente ya no esté'], a: 1, w: 'Fuga de recursos.' }] },

        { id: 'w-v-11', titulo: 'Watchers', resumen: 'Hacer algo cuando un dato cambia.',
          sencillo: `<p>Una <b>computed</b> calcula un valor nuevo. Un <b>watch</b> sirve para <b>hacer algo</b> cuando un dato cambia: guardar, avisar, pedir información…</p>
<pre>watch(pregunta, (nuevo, viejo) => {
  console.log('Cambió de', viejo, 'a', nuevo)
})</pre>
<ul><li><code>{ immediate: true }</code>: que se ejecute también al inicio.</li>
<li><code>{ deep: true }</code>: que vigile los cambios dentro de un objeto.</li>
<li><code>watchEffect(() => …)</code>: vigila automáticamente todo lo que uses adentro.</li></ul>`,
          tecnico: `<p><code>watch(fuente, callback, opciones)</code> ejecuta efectos secundarios en respuesta a cambios. La fuente puede ser un ref, un reactive (implícitamente <i>deep</i>), un getter <code>() => obj.prop</code> o un arreglo de fuentes. El callback recibe <code>(nuevo, anterior, onCleanup)</code>.</p>
<p><code>watchEffect</code> rastrea dependencias automáticamente y se ejecuta de inmediato. Por defecto los callbacks corren antes de actualizar el DOM; <code>flush: 'post'</code> los corre después. Los watchers creados en <code>setup</code> se detienen solos al desmontar el componente.</p>`,
          analogia: '<b>Un watcher es un vigilante:</b> no calcula nada, solo está atento y, cuando ve un cambio, hace su tarea.',
          ejemplo: { archivos: [{ nombre: 'App.vue', codigo: V(`import { ref, watch } from 'vue'

const pregunta = ref('')
const respuesta = ref('Escribe una pregunta que termine en ?')

watch(pregunta, (nueva, vieja) => {
  console.log('Cambió de "' + vieja + '" a "' + nueva + '"')
  if (nueva.endsWith('?')) {
    respuesta.value = 'Pensando… 🤔'
    setTimeout(() => {
      respuesta.value = Math.random() > 0.5 ? 'Sí ✅' : 'No ❌'
    }, 600)
  }
})`, `<p>Pregunta de sí o no: <input v-model="pregunta"></p>
<p><b>{{ respuesta }}</b></p>`) }],
            notas: [{ a: 'App.vue', l: [7, 15], t: 'El watcher vigila <code>pregunta</code>. Cada letra que escribes se ve en la <b>Consola</b> con el valor viejo y el nuevo.' }] },
          reto: { texto: 'Agrega <code>contador = ref(0)</code>, un botón que lo aumente y un <code>watch</code> sobre <code>contador</code> con <code>{ immediate: true }</code> que haga <code>console.log(\'contador cambió\')</code>.',
            metas: [{ t: 'La consola muestra «contador cambió» desde el inicio', ok: "aulaConsola.some(x => x.includes('contador cambió'))" }],
            pistas: ['<code>watch(contador, () => console.log(\'contador cambió\'), { immediate: true })</code>'],
            solucion: [{ nombre: 'App.vue', codigo: V(`import { ref, watch } from 'vue'\nconst contador = ref(0)\nwatch(contador, () => console.log('contador cambió'), { immediate: true })`, `<button @click="contador++">{{ contador }}</button>`) }] },
          quiz: [{ q: 'Para calcular un total uso…', o: ['watch', 'computed'], a: 1, w: 'watch es para acciones.' }, { q: '<code>immediate: true</code> hace que…', o: ['Se ejecute también al inicio', 'Sea más rápido'], a: 0, w: 'Corre una vez al crearse.' }] },

        { id: 'w-v-12', titulo: 'Template refs', resumen: 'Tocar un elemento del DOM directamente.',
          sencillo: `<p>Casi nunca necesitas tocar el HTML a mano en Vue. Pero a veces sí: poner el cursor en un input, medir un elemento… Para eso existen los <b>template refs</b>:</p>
<pre>const campo = ref(null)
&lt;input ref="campo"&gt;

onMounted(() => campo.value.focus())</pre>
<p>El <code>ref</code> empieza en <code>null</code> y, cuando el componente ya está en la pantalla (<code>onMounted</code>), Vue lo llena con el elemento real.</p>`,
          tecnico: `<p>El atributo especial <code>ref</code> obtiene una referencia directa al elemento del DOM o a la instancia de un componente hijo. Con <code>&lt;script setup&gt;</code> se declara un ref con el <b>mismo nombre</b> (o se usa <code>useTemplateRef('clave')</code> en Vue 3.5+). Solo está disponible después del montaje; dentro de <code>v-for</code> se obtiene un arreglo. Las instancias de componentes con <code>&lt;script setup&gt;</code> son privadas salvo lo que expongan con <code>defineExpose</code>.</p>`,
          analogia: '<b>Un template ref es ponerle una etiqueta con nombre a un objeto del cuarto</b> para encontrarlo rápido después.',
          ejemplo: { archivos: [{ nombre: 'App.vue', codigo: V(`import { ref, onMounted } from 'vue'

const campo = ref(null)
const ancho = ref(0)

onMounted(() => {
  campo.value.focus()                       // poner el cursor
  ancho.value = campo.value.offsetWidth     // medir
})`, `<p><input ref="campo" placeholder="El cursor aparece aquí solo"></p>
<p>El input mide {{ ancho }} px de ancho.</p>`) }],
            notas: [{ a: 'App.vue', l: [4, 4], t: 'El ref empieza en <code>null</code>. El nombre debe coincidir con <code>ref="campo"</code>.' }, { a: 'App.vue', l: [7, 10], t: 'Ya montado, <code>campo.value</code> es el <code>&lt;input&gt;</code> real.' }] },
          reto: { texto: 'Pulsa <b>Empezar reto</b>: completa el código para que el <code>&lt;textarea&gt;</code> reciba el foco al cargar.',
            archivos: [{ nombre: 'App.vue', codigo: V(`import { ref, onMounted } from 'vue'

// 1. crea el ref «nota»

onMounted(() => {
  // 2. dale foco
})`, `<textarea placeholder="Escribe tu nota"></textarea>`) }],
            metas: [{ t: 'El textarea tiene el foco', ok: "document.activeElement && document.activeElement.tagName === 'TEXTAREA'" }],
            pistas: ['<code>const nota = ref(null)</code>', 'En la plantilla: <code>&lt;textarea ref="nota" …&gt;</code>', 'En onMounted: <code>nota.value.focus()</code>'],
            solucion: [{ nombre: 'App.vue', codigo: V(`import { ref, onMounted } from 'vue'\nconst nota = ref(null)\nonMounted(() => {\n  nota.value.focus()\n})`, `<textarea ref="nota" placeholder="Escribe tu nota"></textarea>`) }] },
          quiz: [{ q: '¿Cuándo ya tiene valor un template ref?', o: ['Al declararlo', 'Después de onMounted'], a: 1, w: 'Antes vale null.' }] },

        { id: 'w-v-13', titulo: 'Componentes: props, emits y slots', resumen: 'Piezas reutilizables que se comunican.',
          sencillo: `<p>Igual que en React, divides la página en <b>componentes</b>, cada uno en su archivo <code>.vue</code>. La comunicación tiene dos direcciones:</p>
<ul><li><b>Props (padre → hijo)</b>: el hijo las declara con <code>defineProps(['titulo'])</code> y el padre las manda: <code>&lt;Tarjeta titulo="Hola" /&gt;</code>. Para mandar variables usa <code>:</code> → <code>:likes="total"</code>.</li>
<li><b>Emits (hijo → padre)</b>: el hijo <b>avisa</b> que pasó algo con <code>emit('saludar')</code> y el padre escucha con <code>@saludar="…"</code>. El hijo no cambia los datos del padre: solo avisa.</li>
<li><b>Slots</b>: un hueco <code>&lt;slot /&gt;</code> donde el padre mete contenido, como <code>children</code> en React.</li></ul>
<p>Para usar un componente hijo: <code>import Tarjeta from './Tarjeta.vue'</code> y escribes <code>&lt;Tarjeta /&gt;</code>.</p>`,
          tecnico: `<p>Los datos fluyen <b>hacia abajo</b> por props (one‑way data flow) y los eventos <b>hacia arriba</b> por emits. <code>defineProps</code> y <code>defineEmits</code> son macros del compilador de <code>&lt;script setup&gt;</code> (no se importan) y aceptan declaraciones con validación (<code>{ likes: Number }</code>). Las props son de solo lectura; mutarlas genera una advertencia.</p>
<p>Los <b>slots</b> permiten composición de contenido: el slot por defecto, slots con nombre (<code>&lt;template #pie&gt;</code>) y <i>scoped slots</i> que pasan datos al padre. Los componentes importados en <code>&lt;script setup&gt;</code> se registran localmente de forma automática.</p>`,
          analogia: '<b>Props</b> = las instrucciones que el jefe le da al empleado. <b>Emit</b> = el empleado le avisa al jefe «¡terminé!». <b>Slot</b> = un marco de foto vacío donde el padre pone la foto que quiera.',
          ejemplo: { archivos: [{ nombre: 'App.vue', codigo: V(`import { ref } from 'vue'
import Tarjeta from './Tarjeta.vue'

const saludos = ref(0)
const alumnos = ref([
  { id: 1, nombre: 'Ana Laura' },
  { id: 2, nombre: 'Josafat' }
])`, `<h2>Saludos recibidos: {{ saludos }}</h2>
<Tarjeta
  v-for="a in alumnos" :key="a.id"
  :nombre="a.nombre"
  @saludar="saludos++"
>
  <em>Equipo Firefox 🦊</em>
</Tarjeta>`) }, { nombre: 'Tarjeta.vue', codigo: V(`const props = defineProps(['nombre'])
const emit = defineEmits(['saludar'])`, `<div class="tarjeta">
  <h3>{{ nombre }}</h3>
  <slot></slot>
  <p><button @click="emit('saludar')">Saludar 👋</button></p>
</div>`, `.tarjeta { border: 1px solid #cdd; border-radius: 10px; padding: 8px 12px; margin: 8px 0; }`) }],
            notas: [
              { a: 'Tarjeta.vue', l: [2, 3], t: 'El hijo declara qué props recibe y qué eventos puede emitir. En <b>Componentes</b>, toca una Tarjeta: verás su prop <code>nombre</code> y su evento <code>saludar</code>.' },
              { a: 'Tarjeta.vue', l: [9, 9], t: '<code>&lt;slot&gt;</code>: aquí aparece lo que el padre puso entre <code>&lt;Tarjeta&gt;</code> y <code>&lt;/Tarjeta&gt;</code>.' },
              { a: 'App.vue', l: [13, 16], t: 'El padre manda <code>:nombre</code> y escucha <code>@saludar</code>. Toca «Saludar»: el hijo avisa y el padre suma.' }] },
          reto: { texto: 'En <b>Tarjeta.vue</b> agrega la prop <code>carrera</code> y muéstrala. En <b>App.vue</b> agrega <code>carrera</code> a cada alumno y mándala con <code>:carrera</code>.',
            metas: [{ t: 'Las tarjetas reciben la prop <code>carrera</code>', ok: "aulaComp('Tarjeta').length >= 2 && aulaComp('Tarjeta').every(c => c.props.carrera && c.props.carrera.t === 'string')" }, { t: 'La carrera se ve en pantalla', ok: "aulaComp('Tarjeta').every(c => document.body.textContent.includes(c.props.carrera.v))" }],
            pistas: ['En Tarjeta.vue: <code>defineProps([\'nombre\', \'carrera\'])</code> y <code>&lt;p&gt;{{ carrera }}&lt;/p&gt;</code>', 'En App.vue: <code>{ id: 1, nombre: \'Ana Laura\', carrera: \'Redes\' }</code>', 'Y en la etiqueta: <code>:carrera="a.carrera"</code>'],
            solucion: [{ nombre: 'App.vue', codigo: V(`import { ref } from 'vue'\nimport Tarjeta from './Tarjeta.vue'\n\nconst saludos = ref(0)\nconst alumnos = ref([\n  { id: 1, nombre: 'Ana Laura', carrera: 'Redes' },\n  { id: 2, nombre: 'Josafat', carrera: 'Software' }\n])`, `<h2>Saludos recibidos: {{ saludos }}</h2>\n<Tarjeta v-for="a in alumnos" :key="a.id" :nombre="a.nombre" :carrera="a.carrera" @saludar="saludos++">\n  <em>Equipo Firefox 🦊</em>\n</Tarjeta>`) }, { nombre: 'Tarjeta.vue', codigo: V(`const props = defineProps(['nombre', 'carrera'])\nconst emit = defineEmits(['saludar'])`, `<div class="tarjeta">\n  <h3>{{ nombre }}</h3>\n  <p>{{ carrera }}</p>\n  <slot></slot>\n  <p><button @click="emit('saludar')">Saludar 👋</button></p>\n</div>`, `.tarjeta { border: 1px solid #cdd; border-radius: 10px; padding: 8px 12px; margin: 8px 0; }`) }] },
          quiz: [
            { q: 'Para avisarle algo al padre, el hijo usa…', o: ['props', 'emit', 'v-model'], a: 1, w: 'Las props bajan; los eventos suben.' },
            { q: 'Para mandar una variable como prop se escribe…', o: ['nombre="a.nombre"', ':nombre="a.nombre"'], a: 1, w: 'Sin : sería el texto literal.' },
            { q: '<code>&lt;slot&gt;</code> equivale en React a…', o: ['props.children', 'useState'], a: 0, w: 'Contenido que pone el padre.' }] }
      ] }
    ]
  });
})(window);
