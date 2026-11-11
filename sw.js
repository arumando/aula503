/* Aula 503 — service worker. NO EDITAR dist/sw.js: lo genera herramientas/construir.mjs
   a partir de herramientas/sw.plantilla.js.

   Qué hace:
   - Guarda en el dispositivo todos los archivos de la app, para abrirla sin internet.
   - Cada archivo se guarda con su huella (los primeros 16 dígitos de su SHA-256). Al publicar una versión
     nueva solo se descargan los archivos cuya huella cambió, y se comprueba que llegaron completos.
   - La versión nueva queda «en espera» hasta que la persona toca «Actualizar» (o cierra la app). */
const VERSION = "9.1.0+3689435bab";
const ARCHIVOS = {
 "config.js": "bc557b6f4e36f113",
 "data/extra.js": "d8d20281397d2b36",
 "data/facil-ia.js": "da5b68865c1e9476",
 "data/facil-ingsoft.js": "d688eca1f5e6a25a",
 "data/facil-redes.js": "603deba06c93d675",
 "data/ia.js": "3225fa1c36b1df46",
 "data/ingsoft.js": "88bdfc4f3defe898",
 "data/redes.js": "622376f2abc8e356",
 "iconos/apple-touch-icon.png": "e3c77973de5d550b",
 "iconos/favicon.png": "32c9b944e6360daa",
 "iconos/icono-192.png": "f7e65b3930ba19b3",
 "iconos/icono-512.png": "429f55ba32194ebc",
 "iconos/icono-maskable-512.png": "ef4b90292afa6949",
 "img/plano_labredes.png": "6ee371780d8d9026",
 "index.html": "c9e9c58fd02a69fa",
 "js/ajustes.js": "d701033521e02334",
 "js/app.js": "dc007350bdc73b02",
 "js/arranque.js": "3f3b12bc4d3397be",
 "js/cli.js": "08e8f1a326f0deaa",
 "js/glosario.js": "b7dd88f69d30f59f",
 "js/horario.js": "5eb3f46dea84f038",
 "js/ialabs.js": "05d521a69d94a32b",
 "js/islabs.js": "c5a1717bb37cc01f",
 "js/lecciones-is.js": "d489cf53a412cba3",
 "js/lecciones-unsij.js": "3a0e1cfa2697f0cc",
 "js/lecciones.js": "092f378a349ab0b3",
 "js/modulos.js": "d48832c60ba6f801",
 "js/netsim.js": "4e28afe22ebd00ed",
 "js/netview.js": "c8b472654ce339a9",
 "js/plataforma.js": "05c79c5aba42e494",
 "js/web/academia.js": "8c31e599592e4927",
 "js/web/cm-css.js": "284400b38b5fd38e",
 "js/web/codelab.js": "4d5fe48c23b7b49a",
 "js/web/curso-fundamentos.js": "71d00af5d81a34c5",
 "js/web/curso-react.js": "e173f63f70a9f13c",
 "js/web/curso-vue.js": "d68bebc924fdab3f",
 "js/web/estilos-web.js": "8ca08de22dd20eb5",
 "js/web/sandbox.js": "1df935ecc95a11fb",
 "manifest.webmanifest": "68adaad654acc602",
 "vendor/acorn/acorn.min.js": "e40ac454808df477",
 "vendor/babel/babel.min.js": "d9e33722fdfba37e",
 "vendor/codemirror/addon/edit/closebrackets.min.js": "df4a87dd3b175b50",
 "vendor/codemirror/addon/edit/closetag.min.js": "54bafc863b576f5e",
 "vendor/codemirror/addon/hint/anyword-hint.min.js": "4409ec4e1bd3f2ed",
 "vendor/codemirror/addon/hint/css-hint.min.js": "6aad0537f5422854",
 "vendor/codemirror/addon/hint/html-hint.min.js": "09587a9c04f8fef4",
 "vendor/codemirror/addon/hint/javascript-hint.min.js": "b735bca88ce376f0",
 "vendor/codemirror/addon/hint/show-hint.min.js": "463814bdf21e4985",
 "vendor/codemirror/addon/hint/xml-hint.min.js": "a3abc33eabf3905f",
 "vendor/codemirror/codemirror.min.js": "f102bb61fb2ac45c",
 "vendor/codemirror/mode/css/css.min.js": "ee0ce00f346a6d7e",
 "vendor/codemirror/mode/htmlmixed/htmlmixed.min.js": "506e12c1fc68437c",
 "vendor/codemirror/mode/javascript/javascript.min.js": "99b46f351b4b1ce8",
 "vendor/codemirror/mode/jsx/jsx.min.js": "f72e29c340ad5114",
 "vendor/codemirror/mode/xml/xml.min.js": "1403f6fc04264c38",
 "vendor/fuentes/atkinson-hyperlegible-latin-2.woff2": "bc8825fd435d4aa8",
 "vendor/fuentes/atkinson-hyperlegible-latin-4.woff2": "d64ba838ef5472bb",
 "vendor/fuentes/atkinson-hyperlegible-latin-6.woff2": "140e2bd25a7315c8",
 "vendor/fuentes/atkinson-hyperlegible-latin-ext-2.woff2": "61eeb0eb8b881a84",
 "vendor/fuentes/atkinson-hyperlegible-latin-ext-3.woff2": "840ced16f975d8ab",
 "vendor/fuentes/atkinson-hyperlegible-latin-ext.woff2": "90d887d541fe6e91",
 "vendor/fuentes/bricolage-grotesque-latin-2.woff2": "a79fdb52d4a5c765",
 "vendor/fuentes/bricolage-grotesque-latin-ext.woff2": "776f6dcaf03636cd",
 "vendor/fuentes/fuentes.css": "88e3a183018ba6af",
 "vendor/fuentes/jetbrains-mono-latin-2.woff2": "83c005d49d8a6a50",
 "vendor/fuentes/jetbrains-mono-latin-ext.woff2": "db5ff4db83e58042",
 "vendor/react/react-dom.development.js": "f9044a5e9c39db8b",
 "vendor/react/react.development.js": "28348fef6cb0ed8b",
 "vendor/vue/vue.global.js": "774f70a27925b6b9",
 "version.js": "6a5411dd9bb55145"
};          // { 'js/app.js': 'huella', … }
const CACHE = 'aula503-archivos';
const DATOS = 'aula503-datos';
const BASE = new URL('./', self.location).pathname;
const clave = (ruta, h) => new URL(ruta + '?h=' + h, self.location).href;

async function huella(buf) {
  const d = new Uint8Array(await crypto.subtle.digest('SHA-256', buf));
  return Array.from(d.slice(0, 8), b => b.toString(16).padStart(2, '0')).join('');
}
async function bajar(cache, ruta, h) {
  const r = await fetch(new URL(ruta, self.location), { cache: 'no-cache' });
  if (!r.ok) throw new Error(ruta + ': ' + r.status);
  const buf = await r.arrayBuffer();
  // Si el servidor todavía reparte una mezcla de versiones, se cancela y se reintenta en la siguiente revisión
  if (await huella(buf) !== h) throw new Error(ruta + ': la huella no coincide');
  await cache.put(clave(ruta, h), new Response(buf, { headers: { 'Content-Type': r.headers.get('Content-Type') || 'application/octet-stream' } }));
}
async function instalar() {
  const cache = await caches.open(CACHE);
  const faltan = [];
  for (const [ruta, h] of Object.entries(ARCHIVOS)) if (!(await cache.match(clave(ruta, h)))) faltan.push([ruta, h]);
  let i = 0;
  const obrero = async () => { while (i < faltan.length) { const [ruta, h] = faltan[i++]; await bajar(cache, ruta, h); } };
  await Promise.all(Array.from({ length: 6 }, obrero));   // 6 descargas a la vez
}
async function limpiar() {
  const cache = await caches.open(CACHE);
  const vigentes = new Set(Object.entries(ARCHIVOS).map(([ruta, h]) => clave(ruta, h)));
  for (const pedido of await cache.keys()) if (!vigentes.has(pedido.url)) await cache.delete(pedido);
  await self.clients.claim();
}
self.addEventListener('install', e => e.waitUntil(instalar()));
self.addEventListener('activate', e => e.waitUntil(limpiar()));
self.addEventListener('message', e => { if (e.data === 'saltar') self.skipWaiting(); });

async function deCache(ruta, pedido) {
  const cache = await caches.open(CACHE);
  return (await cache.match(clave(ruta, ARCHIVOS[ruta]))) || fetch(pedido);
}
// Para datos que cambian sin publicar versión (tareas): primero la red; sin conexión, lo último que se bajó
async function redPrimero(pedido) {
  const cache = await caches.open(DATOS);
  const llave = pedido.url.split('?')[0];
  try {
    const r = await Promise.race([fetch(pedido, { cache: 'no-cache' }), new Promise((_, mal) => setTimeout(() => mal(new Error('tardó')), 6000))]);
    if (r.ok) await cache.put(llave, r.clone());
    return r;
  } catch (e) {
    return (await cache.match(llave)) || Response.error();
  }
}
self.addEventListener('fetch', e => {
  const pedido = e.request;
  if (pedido.method !== 'GET') return;
  const url = new URL(pedido.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(BASE)) return;
  let ruta = decodeURIComponent(url.pathname.slice(BASE.length)) || 'index.html';
  if (pedido.mode === 'navigate' && ruta !== 'index.html') return;
  if (ARCHIVOS[ruta]) e.respondWith(deCache(ruta, pedido));
  else if (ruta.startsWith('datos/')) e.respondWith(redPrimero(pedido));
});
