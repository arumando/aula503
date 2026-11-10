/* Aula 503 · Academia Web — Laboratorio de código.
   Editor (CodeMirror) + vista previa aislada (AulaSandbox) + inspector (componentes, DOM, estilos, consola).
   Modos: 'web' (HTML/CSS/JS), 'react' (archivos .js con JSX, import/export como en react.dev)
   y 'vue' (archivos .vue con <script setup>/<template>, como en vuejs.org).
   Uso: const lab = CodeLab({ modo, archivos:[{nombre, codigo}], alActualizar }) → { el, ejecutar, probar, archivos } */
(function (root) {
  'use strict';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const h = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

  // estilos de CodeMirror una sola vez
  function estilosCM() {
    if (document.getElementById('aula-cm-css') || !root.AULA_CM_CSS) return;
    const s = document.createElement('style'); s.id = 'aula-cm-css'; s.textContent = root.AULA_CM_CSS; document.head.appendChild(s);
  }

  /* ---------- Vista de valores (variables, props, estado) ---------- */
  function valorHTML(v, corto) {
    if (!v) return '<span class="v-u">undefined</span>';
    switch (v.t) {
      case 'string': return '<span class="v-s">"' + esc(v.v) + '"</span>';
      case 'number': return '<span class="v-n">' + v.v + '</span>';
      case 'boolean': return '<span class="v-b">' + v.v + '</span>';
      case 'undefined': return '<span class="v-u">undefined</span>';
      case 'null': return '<span class="v-u">null</span>';
      case 'tdz': return '<span class="v-u" title="Declarada más abajo: todavía no tiene valor">(aún sin valor)</span>';
      case 'function': return '<span class="v-f">ƒ ' + esc(v.v) + '()</span>';
      case 'elemento': return '<span class="v-e">' + esc(v.v) + '</span>';
      case 'jsx': return '<span class="v-e">' + esc(v.v) + '</span>';
      case 'array': return corto && v.items && v.items.length > 6 ? '<span class="v-a">Array(' + v.n + ')</span>' : '<span class="v-a">[' + (v.items || []).map(x => valorHTML(x, true)).join(', ') + (v.n > 25 ? ', …' : '') + ']</span>';
      case 'object': {
        if (v.v === '…') return '<span class="v-a">{…}</span>';
        const ks = Object.keys(v.props || {});
        if (corto && ks.length > 4) return '<span class="v-a">' + esc(v.clase || '') + '{' + ks.length + ' props}</span>';
        return '<span class="v-a">' + esc(v.clase ? v.clase + ' ' : '') + '{ ' + ks.map(k => '<span class="v-k">' + esc(k) + '</span>: ' + valorHTML(v.props[k], true)).join(', ') + ' }</span>';
      }
      default: return '<span class="v-o">' + esc(v.v != null ? v.v : v.t) + '</span>';
    }
  }
  const TIPO = { string: 'texto', number: 'número', boolean: 'booleano', undefined: 'undefined', null: 'null', function: 'función', array: 'arreglo', object: 'objeto', elemento: 'elemento HTML', tdz: '—' };

  /* ---------- Traducción de archivos al código que corre ---------- */
  // React: quita import/export (todo vive en un solo archivo dentro del iframe) y monta <App />
  function armarReact(archivos) {
    const principal = archivos.find(a => /^App\.(jsx?|tsx?)$/.test(a.nombre)) || archivos.find(a => /\.jsx?$/.test(a.nombre));
    const orden = archivos.filter(a => /\.jsx?$/.test(a.nombre) && a !== principal).concat(principal ? [principal] : []);
    const mapa = []; let js = '', linea = 1;
    // el componente que se monta es el «export default» del archivo principal (App.js)
    let raiz = 'App';
    if (principal) { const m = /export\s+default\s+(?:function|class)\s+([A-Z]\w*)/.exec(principal.codigo) || /export\s+default\s+([A-Z]\w*)\s*;?\s*$/m.exec(principal.codigo); if (m) raiz = m[1]; }
    orden.forEach(a => {
      let c = a.codigo
        .replace(/^\s*import\s+(?:(\w+)\s*,?\s*)?(?:\{([^}]*)\})?\s*from\s*['"]react(?:-dom(?:\/client)?)?['"];?/gm, (m, def, nom) => nom ? 'const {' + nom.replace(/\bas\b/g, ':') + '} = React;' : '')
        .replace(/^\s*import\s+[^;\n]*from\s*['"]\.\.?\/[^'"]+['"];?/gm, '')
        .replace(/^\s*import\s+['"][^'"]+\.css['"];?/gm, '')
        .replace(/^(\s*)export\s+default\s+(function|class)\b/gm, '$1$2')
        .replace(/^(\s*)export\s+default\s+(\w+)\s*;?\s*$/gm, '')
        .replace(/^(\s*)export\s+(const|let|var|function|class)\b/gm, '$1$2');
      mapa.push({ nombre: a.nombre, desde: linea, hasta: linea + c.split('\n').length - 1 });
      js += c + '\n'; linea += c.split('\n').length;
    });
    if (!/createRoot|ReactDOM\.render/.test(js) && new RegExp('\\bfunction\\s+' + raiz + '\\b|\\b(const|let)\\s+' + raiz + '\\b|\\bclass\\s+' + raiz + '\\b').test(js)) js += 'ReactDOM.createRoot(document.getElementById("root")).render(<' + raiz + ' />);\n';
    const css = archivos.filter(a => /\.css$/.test(a.nombre)).map(a => a.codigo).join('\n');
    const html = (archivos.find(a => /\.html$/.test(a.nombre)) || { codigo: '<div id="root"></div>' }).codigo;
    return { js, css, html, mapa };
  }
  // Vue: convierte cada .vue (script setup + template + style) en un objeto de componente
  function bloques(src) {
    const tomar = re => { const m = re.exec(src); return m ? { txt: m[2], linea: src.slice(0, m.index + m[0].indexOf(m[2])).split('\n').length } : null; };
    return { script: tomar(/<script(\s+setup)?[^>]*>([\s\S]*?)<\/script>/), template: tomar(/<template(\s[^>]*)?>([\s\S]*)<\/template>/), style: tomar(/<style(\s[^>]*)?>([\s\S]*?)<\/style>/) };
  }
  function componenteVue(nombre, src) {
    const b = bloques(src);
    let s = b.script ? b.script.txt : '';
    const importa = [], deVue = [];
    s = s.replace(/^\s*import\s*\{([^}]*)\}\s*from\s*['"]vue['"];?/gm, (m, n) => { n.split(',').forEach(x => { const p = x.trim().split(/\s+as\s+/); deVue.push((p[1] || p[0]).trim()); }); return 'const {' + n.replace(/\bas\b/g, ':') + '} = Vue;'; })
      .replace(/^\s*import\s+(\w+)\s+from\s*['"]\.\.?\/([^'"]+)\.vue['"];?/gm, (m, n) => { importa.push(n); return ''; })
      .replace(/^\s*import\s+[^;\n]*;?\s*$/gm, '');
    let props = null, emits = null;
    s = s.replace(/defineProps\s*\(/, () => { props = true; return '__defProps('; }).replace(/defineEmits\s*\(/, () => { emits = true; return '__defEmits('; });
    // nombres de nivel superior: lo que la plantilla puede usar
    let nombres = [];
    const r = root.AulaSandbox.analizar(s.replace(/__defProps\(/g, '(').replace(/__defEmits\(/g, '('));
    if (r.error) return { error: Object.assign({}, r.error, { linea: r.error.linea + (b.script ? b.script.linea - 1 : 0), archivo: nombre }) };
    r.ast.body.forEach(n => {
      if (n.type === 'VariableDeclaration') n.declarations.forEach(d => { if (d.id.type === 'Identifier') nombres.push(d.id.name); else if (d.id.type === 'ObjectPattern') d.id.properties.forEach(p => p.value && p.value.type === 'Identifier' && nombres.push(p.value.name)); });
      if ((n.type === 'FunctionDeclaration' || n.type === 'ClassDeclaration') && n.id) nombres.push(n.id.name);
    });
    nombres = nombres.concat(importa);
    const tpl = b.template ? b.template.txt.trim() : '<div></div>';
    const ret = nombres.filter(n => !n.startsWith('__') && !deVue.includes(n) && n !== 'props');
    if (nombres.includes('props')) ret.push('props');
    // defineProps(['a']) / defineProps({a: String}) → opción props; el valor se lee de __p
    let optProps = '', optEmits = '';
    if (props) { const m = /__defProps\(([\s\S]*?)\)\s*(;|\n|$)/.exec(s); if (m) { optProps = 'props: ' + (m[1].trim() || '[]') + ','; s = s.replace(m[0], '__p' + m[2]); } }
    if (emits) { const m = /__defEmits\(([\s\S]*?)\)\s*(;|\n|$)/.exec(s); if (m) { optEmits = 'emits: ' + (m[1].trim() || '[]') + ','; s = s.replace(m[0], '__emit' + m[2]); } }
    // en la plantilla, $emit('x') y emit('x') funcionan igual que en un .vue
    if (emits && !/\bconst\s+emit\b/.test(s)) s = 'const emit = __emit;' + s;
    if (emits && !ret.includes('emit')) ret.push('emit');
    const js = 'const ' + nombre + ' = { name: ' + JSON.stringify(nombre) + ', ' + optProps + optEmits +
      ' components: {' + importa.join(',') + '}, template: ' + JSON.stringify(tpl) + ',\n setup(__p, { emit: __emit }) {\n' + s + '\n;return {' + ret.join(', ') + '}; } };\n';
    return { js, css: b.style ? b.style.txt : '', lineaScript: b.script ? b.script.linea : 1, importa };
  }
  function armarVue(archivos) {
    const vues = archivos.filter(a => /\.vue$/.test(a.nombre));
    const comps = {}, errores = [];
    vues.forEach(a => { const n = a.nombre.replace(/\.vue$/, ''); const c = componenteVue(n, a.codigo); if (c.error) errores.push(c.error); comps[n] = c; });
    if (errores.length) return { error: errores[0] };
    // orden: dependencias primero
    const hechos = new Set(), orden = [];
    const poner = n => { if (hechos.has(n) || !comps[n]) return; hechos.add(n); comps[n].importa.forEach(poner); orden.push(n); };
    Object.keys(comps).forEach(poner);
    const principal = comps.App ? 'App' : orden[orden.length - 1];
    let js = orden.map(n => comps[n].js).join('\n');
    const extra = archivos.find(a => /\.js$/.test(a.nombre));
    if (extra) js = extra.codigo + '\n' + js;
    js += '\nVue.createApp(' + principal + ').mount("#app");\n';
    const css = orden.map(n => comps[n].css).join('\n') + archivos.filter(a => /\.css$/.test(a.nombre)).map(a => a.codigo).join('\n');
    const html = (archivos.find(a => /\.html$/.test(a.nombre)) || { codigo: '<div id="app"></div>' }).codigo;
    return { js, css, html };
  }
  function armarWeb(archivos) {
    const de = re => archivos.filter(a => re.test(a.nombre)).map(a => a.codigo).join('\n');
    return { html: de(/\.html$/), css: de(/\.css$/), js: de(/\.js$/) };
  }
  const MODO_CM = n => /\.html$/.test(n) ? 'htmlmixed' : /\.css$/.test(n) ? 'css' : /\.vue$/.test(n) ? 'htmlmixed' : /\.jsx?$/.test(n) ? 'jsx' : 'javascript';

  /* ---------- El laboratorio ---------- */
  function CodeLab(o) {
    estilosCM();
    o = Object.assign({ modo: 'web', archivos: [], auto: true }, o);
    const modo = o.modo;
    const originales = o.archivos.map(a => Object.assign({}, a));
    let archivos = o.archivos.map(a => Object.assign({}, a));
    let actual = 0, errores = [], logs = [], eventos = [], arbolComp = [], arbolDom = [], selDom = null, selComp = null, listo = false, temporizador = null;
    const cbs = [];

    const el = h('div', 'cl cl-' + modo);
    el.innerHTML =
      '<div class="cl-barra">' +
        '<div class="cl-archivos" role="tablist" aria-label="Archivos"></div>' +
        '<div class="cl-acciones">' +
          '<label class="cl-auto" title="Volver a ejecutar solo al escribir"><input type="checkbox" checked> En vivo</label>' +
          '<button type="button" class="cl-btn cl-run" title="Ejecutar (Ctrl+Enter)">▶ Ejecutar</button>' +
          '<button type="button" class="cl-btn cl-reset" title="Regresar al código original">↺ Reiniciar</button>' +
        '</div>' +
      '</div>' +
      '<div class="cl-cuerpo">' +
        '<div class="cl-editor"></div>' +
        '<div class="cl-div" role="separator" aria-orientation="vertical" aria-label="Cambiar tamaño de los paneles" tabindex="0"></div>' +
        '<div class="cl-salida">' +
          '<div class="cl-pest" role="tablist"></div>' +
          '<div class="cl-panel cl-p-res"><div class="cl-frame-wrap"></div><div class="cl-mini" aria-live="polite"></div></div>' +
          '<div class="cl-panel cl-p-comp" hidden></div>' +
          '<div class="cl-panel cl-p-dom" hidden></div>' +
          '<div class="cl-panel cl-p-con" hidden></div>' +
        '</div>' +
      '</div>';
    const $ = q => el.querySelector(q);
    const PEST = [['res', 'Resultado']].concat(modo === 'web' ? [] : [['comp', 'Componentes']], [['dom', 'DOM y estilos'], ['con', 'Consola']]);
    let pest = 'res';
    function pintarPest() {
      $('.cl-pest').innerHTML = PEST.map(([k, n]) => '<button type="button" role="tab" data-p="' + k + '" aria-selected="' + (k === pest) + '">' + n + (k === 'con' && errores.length ? ' <span class="cl-badge mal">' + errores.length + '</span>' : k === 'con' && logs.length ? ' <span class="cl-badge">' + logs.length + '</span>' : '') + '</button>').join('');
      PEST.forEach(([k]) => { $('.cl-p-' + k).hidden = k !== pest; });
      // en celular, «Resultado» y las pestañas también cambian entre código y salida
    }
    $('.cl-pest').addEventListener('click', e => { const b = e.target.closest('[data-p]'); if (!b) return; pest = b.dataset.p; pintarPest(); if (pest === 'dom') sb.pedir('dom'); if (pest === 'comp') pintarComp(); if (pest === 'con') pintarConsola(); });

    /* Editor */
    const cm = root.CodeMirror($('.cl-editor'), {
      lineNumbers: true, tabSize: 2, indentUnit: 2, lineWrapping: false, autoCloseBrackets: true, autoCloseTags: true,
      gutters: ['cl-gut-err', 'CodeMirror-linenumbers'], extraKeys: {
        'Ctrl-Space': 'autocomplete', 'Ctrl-Enter': () => ejecutar(), 'Cmd-Enter': () => ejecutar(),
        Tab: c => c.somethingSelected() ? c.indentSelection('add') : c.replaceSelection('  ')
      }
    });
    const docs = archivos.map(a => root.CodeMirror.Doc(a.codigo, MODO_CM(a.nombre)));
    cm.swapDoc(docs[0]);
    function pintarArchivos() {
      $('.cl-archivos').innerHTML = archivos.map((a, i) => '<button type="button" role="tab" aria-selected="' + (i === actual) + '" data-i="' + i + '">' + esc(a.nombre) + '</button>').join('');
      $('.cl-archivos').hidden = archivos.length < 2 && !o.mostrarNombre;
    }
    $('.cl-archivos').addEventListener('click', e => { const b = e.target.closest('[data-i]'); if (!b) return; actual = +b.dataset.i; cm.swapDoc(docs[actual]); pintarArchivos(); marcarErrores(); });
    pintarArchivos();
    // autocompletado al escribir
    cm.on('inputRead', (c, ch) => {
      if (!c.showHint || ch.origin !== '+input') return;
      const t = ch.text.join('');
      if (/^[\w$.<]$/.test(t)) c.showHint({ completeSingle: false, hint: sugerir });
    });
    function sugerir(c) {
      const n = archivos[actual].nombre, H = root.CodeMirror.hint;
      const cur = c.getCursor(), tok = c.getTokenAt(cur), inner = root.CodeMirror.innerMode(c.getMode(), tok.state).mode.name;
      let r = null;
      if (inner === 'css' && H.css) r = H.css(c);
      else if ((inner === 'xml' || inner === 'html') && H.html) r = H.html(c);
      else if (H.javascript) r = H.javascript(c, { globalScope: { console: console, document: document, Math: Math, JSON: JSON, Array: Array, Object: Object, React: { useState: 1, useEffect: 1, useRef: 1, useMemo: 1, Fragment: 1 }, Vue: { ref: 1, reactive: 1, computed: 1, watch: 1, onMounted: 1 } } });
      const pal = (H.anyword ? H.anyword(c) : null) || { list: [] };
      const extra = (modo === 'react' ? ['useState', 'useEffect', 'className', 'onClick', 'props', 'children', 'map', 'filter', 'return'] : modo === 'vue' ? ['ref', 'computed', 'watch', 'v-if', 'v-else', 'v-for', 'v-model', 'v-show', 'v-bind', 'v-on', ':key', '@click', 'defineProps', 'defineEmits', 'onMounted'] : ['console.log', 'document.querySelector', 'addEventListener', 'textContent', 'classList', 'function', 'const', 'let']);
      if (!r) r = { list: [], from: pal.from || cur, to: pal.to || cur };
      const palabra = tok.string.replace(/^[^\w$-]+/, '');
      const set = new Set((r.list || []).map(x => typeof x === 'string' ? x : x.text));
      if (palabra.length >= 1 && inner !== 'css') extra.concat(pal.list || []).forEach(w => { if (w.startsWith(palabra) && w !== palabra && !set.has(w)) { r.list.push(w); set.add(w); } });
      return r;
    }
    cm.on('change', () => {
      archivos[actual].codigo = cm.getValue();
      clearTimeout(temporizador);
      temporizador = setTimeout(() => { revisarSintaxis(); if ($('.cl-auto input').checked) ejecutar(); }, 700);
    });

    /* Errores en el editor */
    function marcarErrores() {
      cm.clearGutter('cl-gut-err');
      for (let i = 0; i < cm.lineCount(); i++) cm.removeLineClass(i, 'background', 'cl-linea-mal');
      errores.filter(e => e.linea && (e.archivo || archivos[0].nombre) === archivos[actual].nombre).forEach(e => {
        const l = Math.min(cm.lineCount(), e.linea) - 1;
        const m = h('span', 'cl-marca', '!'); m.title = e.msg;
        cm.setGutterMarker(l, 'cl-gut-err', m);
        cm.addLineClass(l, 'background', 'cl-linea-mal');
      });
    }
    function revisarSintaxis() { /* la revisión fuerte la hace ejecutar(); aquí solo limpiamos marcas viejas */ }

    /* Separador arrastrable */
    const div = $('.cl-div');
    div.addEventListener('pointerdown', ev => {
      ev.preventDefault(); div.setPointerCapture(ev.pointerId);
      const cuerpo = $('.cl-cuerpo'), vertical = getComputedStyle(cuerpo).flexDirection === 'column';
      const mover = e => {
        const r = cuerpo.getBoundingClientRect();
        const pct = vertical ? (e.clientY - r.top) / r.height : (e.clientX - r.left) / r.width;
        cuerpo.style.setProperty('--izq', Math.max(18, Math.min(82, pct * 100)) + '%');
        cm.refresh();
      };
      const soltar = () => { div.removeEventListener('pointermove', mover); div.removeEventListener('pointerup', soltar); };
      div.addEventListener('pointermove', mover); div.addEventListener('pointerup', soltar);
    });
    div.addEventListener('keydown', e => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
      const c = $('.cl-cuerpo'), v = parseFloat(c.style.getPropertyValue('--izq')) || 50;
      c.style.setProperty('--izq', Math.max(18, Math.min(82, v + (e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -4 : 4))) + '%'); cm.refresh(); e.preventDefault();
    });

    /* Sandbox */
    const sb = new root.AulaSandbox.Sandbox($('.cl-frame-wrap'), msg => {
      if (msg.k === 'log') { logs.push(msg); mini(); if (pest === 'con') pintarConsola(); pintarPest(); }
      else if (msg.k === 'error' || msg.k === 'limite') { errores.push({ msg: msg.msg, ayuda: msg.ayuda, linea: msg.linea != null ? mapearLinea(msg.linea) : null, archivo: msg.linea != null ? archivoDeLinea(msg.linea) : null }); marcarErrores(); mini(); pintarPest(); if (pest === 'con') pintarConsola(); avisar(); }
      else if (msg.k === 'evento') { eventos.push(msg); if (pest === 'con') pintarConsola(); avisar(); }
      else if (msg.k === 'componentes') { arbolComp = msg.arbol; if (pest === 'comp') pintarComp(); avisar(); }
      else if (msg.k === 'dom') { arbolDom = msg.arbol; pintarDom(); }
      else if (msg.k === 'inspect') pintarInspect(msg.info);
      else if (msg.k === 'domcambio') { if (pest === 'dom') sb.pedir('dom'); avisar(); }
      else if (msg.k === 'listo') { listo = true; setTimeout(avisar, modo === 'web' ? 50 : 250); if (pest === 'dom') sb.pedir('dom'); }
    });
    let mapa = null;
    const mapearLinea = l => { if (!mapa) return l; const m = mapa.find(x => l >= x.desde && l <= x.hasta); return m ? l - m.desde + 1 : l; };
    const archivoDeLinea = l => { if (!mapa) return archivos.find(a => /\.(js|jsx)$/.test(a.nombre)) ? archivos.find(a => /\.(js|jsx)$/.test(a.nombre)).nombre : null; const m = mapa.find(x => l >= x.desde && l <= x.hasta); return m ? m.nombre : null; };
    let avisoT = null;
    function avisar() { clearTimeout(avisoT); avisoT = setTimeout(() => cbs.forEach(f => f()), 120); }

    async function ejecutar() {
      archivos[actual].codigo = cm.getValue();
      errores = []; logs = []; eventos = []; arbolComp = []; selComp = null; listo = false; mapa = null;
      let prog;
      if (modo === 'react') {
        try { await root.AulaSandbox.cargarBabel(); } catch (e) { errores.push({ msg: 'No se pudo cargar el traductor de JSX (Babel). Revisa tu conexión.' }); mini(); return; }
        prog = armarReact(archivos); mapa = prog.mapa;
      } else if (modo === 'vue') prog = armarVue(archivos);
      else prog = armarWeb(archivos);
      if (root.AulaSandbox.prepararLibs) {
        try { await root.AulaSandbox.prepararLibs(modo); }
        catch (e) { errores.push({ msg: 'No se pudo cargar ' + (modo === 'vue' ? 'Vue' : 'React') + '. Abre la app con internet una vez para que se guarde en el dispositivo.' }); mini(); return; }
      }
      if (prog.error) { errores.push(prog.error); marcarErrores(); mini(); pintarPest(); avisar(); return; }
      const r = sb.ejecutar({ modo, html: prog.html, css: prog.css, js: prog.js, sinInstrumentar: modo === 'vue' ? false : false });
      if (!r.ok) {
        const e = r.error; errores.push({ msg: 'Error de sintaxis: ' + e.msg, linea: mapearLinea(e.linea), archivo: archivoDeLinea(e.linea) || archivos[actual].nombre });
      }
      marcarErrores(); mini(); pintarPest(); avisar();
    }

    /* Consola breve debajo del resultado */
    function mini() {
      const m = $('.cl-mini');
      if (errores.length) { const e = errores[errores.length - 1]; m.className = 'cl-mini mal'; m.innerHTML = '<b>Error' + (e.linea ? ' en ' + esc(e.archivo || '') + ' línea ' + e.linea : '') + ':</b> ' + esc(e.msg) + (e.ayuda ? '<div class="cl-ayuda">💡 ' + esc(e.ayuda) + '</div>' : ''); return; }
      if (logs.length) { const l = logs[logs.length - 1]; m.className = 'cl-mini'; m.innerHTML = '<span class="cl-mini-t">consola</span> ' + l.args.map(a => a.t === 'string' ? esc(a.v) : valorHTML(a, true)).join(' ') + (logs.length > 1 ? ' <span class="cl-mas">(+' + (logs.length - 1) + ')</span>' : ''); return; }
      m.className = 'cl-mini vacia'; m.innerHTML = '';
    }
    function pintarConsola() {
      const p = $('.cl-p-con');
      const filas = [];
      logs.forEach(l => filas.push('<div class="cl-log ' + l.nivel + '">' + l.args.map(a => a.t === 'string' ? esc(a.v) : valorHTML(a)).join(' ') + '</div>'));
      errores.forEach(e => filas.push('<div class="cl-log error"><b>' + (e.linea ? esc(e.archivo || '') + ' · línea ' + e.linea + ': ' : '') + '</b>' + esc(e.msg) + (e.ayuda ? '<div class="cl-ayuda">💡 ' + esc(e.ayuda) + '</div>' : '') + '</div>'));
      eventos.slice(-30).forEach(e => filas.push('<div class="cl-log evento">⚡ evento <b>' + esc(e.tipo) + '</b> en ' + esc(e.en) + '</div>'));
      p.innerHTML = filas.length ? filas.join('') : '<p class="cl-vacio">Aquí aparece lo que imprimas con <code>console.log()</code>, los errores y los eventos (clics, teclas…).</p>';
      p.innerHTML += '<form class="cl-eval"><span>›</span><input placeholder="Escribe una expresión y Enter (ej. document.title)" aria-label="Evaluar expresión"></form>';
      p.querySelector('.cl-eval').onsubmit = ev => {
        ev.preventDefault(); const inp = p.querySelector('input'), expr = inp.value.trim(); if (!expr) return;
        const id = Math.random().toString(36).slice(2);
        const oir = e => { if (e.data && e.data.aula && e.data.k === 'evalres' && e.data.id === id) { window.removeEventListener('message', oir); logs.push({ nivel: 'eval', args: [{ t: 'string', v: '› ' + expr + '  →  ' }, e.data.v] }); pintarConsola(); } };
        window.addEventListener('message', oir); sb.pedir('eval', { expr, id });
      };
    }

    /* Árbol de componentes */
    function pintarComp() {
      const p = $('.cl-p-comp');
      if (!arbolComp.length) { p.innerHTML = '<p class="cl-vacio">' + (errores.length ? 'Corrige el error para ver los componentes.' : 'Ejecuta el código para ver el árbol de componentes.') + '</p>'; return; }
      const nodo = (n, nivel) => '<li><button type="button" class="cl-cnode' + (n.render ? ' r-' + n.render : '') + (selComp && selComp.n === n.n && selComp.idx === n._i ? ' sel' : '') + '" data-ci="' + n._i + '"><span class="cl-cname">&lt;' + esc(n.n) + '&gt;</span>' +
        (Object.keys(n.props || {}).filter(k => k !== 'children').length ? '<span class="cl-cprops">' + Object.keys(n.props).filter(k => k !== 'children').map(k => esc(k) + '=' + valorHTML(n.props[k], true)).join(' ') + '</span>' : '') +
        (n.estado && n.estado.length ? '<span class="cl-cest" title="estado">' + n.estado.length + ' estado</span>' : '') +
        (n.veces ? '<span class="cl-cveces" title="Veces que se ha dibujado">' + n.veces + '×</span>' : '') + '</button>' +
        (n.h && n.h.length ? '<ul>' + n.h.map(x => nodo(x, nivel + 1)).join('') + '</ul>' : '') + '</li>';
      let i = 0; const todos = [];
      const num = ns => ns.forEach(n => { n._i = i++; todos.push(n); num(n.h || []); }); num(arbolComp);
      const sel = selComp ? todos.find(n => n._i === selComp.idx) : todos[0];
      p.innerHTML = '<div class="cl-comp-grid"><ul class="cl-ctree">' + arbolComp.map(n => nodo(n, 0)).join('') + '</ul><div class="cl-cdet"></div></div><p class="cl-leyenda"><i class="r-monta"></i> se acaba de crear <i class="r-actualiza"></i> se volvió a dibujar</p>';
      p.querySelectorAll('[data-ci]').forEach(b => b.onclick = () => { selComp = { n: todos[+b.dataset.ci].n, idx: +b.dataset.ci }; pintarComp(); });
      if (sel) detalleComp(sel, p.querySelector('.cl-cdet'));
    }
    function detalleComp(n, d) {
      const props = Object.keys(n.props || {});
      d.innerHTML = '<h4>&lt;' + esc(n.n) + '&gt;</h4>' +
        '<h5>Props <small>(lo que le manda su padre; solo lectura)</small></h5>' + (props.length ? '<table>' + props.map(k => '<tr><td>' + esc(k) + '</td><td>' + valorHTML(n.props[k]) + '</td><td class="cl-tipo">' + (TIPO[n.props[k].t] || n.props[k].t) + '</td></tr>').join('') + '</table>' : '<p class="cl-vacio">No recibe props.</p>') +
        '<h5>' + (modo === 'vue' ? 'Estado y funciones <small>(lo que devuelve setup)</small>' : 'Estado <small>(memoria propia del componente)</small>') + '</h5>' + (n.estado && n.estado.length ? '<table>' + n.estado.map((e, i) => '<tr><td>' + esc(modo === 'react' ? e.tipo + ' #' + (i + 1) : e.tipo) + '</td><td>' + valorHTML(e.v) + '</td></tr>').join('') + '</table>' : '<p class="cl-vacio">Sin estado.</p>') +
        (n.emite && n.emite.length ? '<h5>Eventos que emite</h5><p>' + n.emite.map(x => '<code>' + esc(x) + '</code>').join(' ') + '</p>' : '') +
        '<h5>Dibujado</h5><p>' + (n.veces || 0) + ' ' + (n.veces === 1 ? 'vez' : 'veces') + (n.render === 'actualiza' ? ' · <b>se acaba de volver a dibujar</b>' : '') + '</p>' +
        (n.h && n.h.length ? '<h5>Hijos</h5><p>' + n.h.map(x => '<code>&lt;' + esc(x.n) + '&gt;</code>').join(' ') + '</p>' : '');
    }

    /* DOM e inspector de estilos */
    function pintarDom() {
      const p = $('.cl-p-dom');
      const nodo = n => {
        if (n.x != null) return '<li class="cl-dtxt">"' + esc(n.x) + '"</li>';
        const ab = '<span class="t">&lt;' + n.e + '</span>' + (n.id ? ' <span class="a">id</span>=<span class="s">"' + esc(n.id) + '"</span>' : '') + (n.c.length ? ' <span class="a">class</span>=<span class="s">"' + esc(n.c.join(' ')) + '"</span>' : '') + n.a.map(([k, v]) => ' <span class="a">' + esc(k) + '</span>=<span class="s">"' + esc(v) + '"</span>').join('') + (n.s ? ' <span class="a">style</span>=<span class="s">"…"</span>' : '') + '<span class="t">&gt;</span>';
        return '<li><button type="button" class="cl-dnode' + (selDom && selDom.join() === n.r.join() ? ' sel' : '') + '" data-r="' + n.r.join('.') + '">' + ab + '</button>' + (n.h.length ? '<ul>' + n.h.map(nodo).join('') + '</ul>' : '') + '</li>';
      };
      p.innerHTML = '<div class="cl-dom-grid"><div><h5>Árbol DOM <small>(toca una etiqueta)</small></h5><ul class="cl-dtree"><li><span class="t">&lt;body&gt;</span><ul>' + arbolDom.map(nodo).join('') + '</ul></li></ul></div><div class="cl-insp">' + (selDom ? '' : '<p class="cl-vacio">Toca una etiqueta del árbol para ver sus atributos, su caja (margin, border, padding) y sus estilos. También se marca en el resultado.</p>') + '</div></div>';
      p.querySelectorAll('[data-r]').forEach(b => {
        b.onclick = () => { selDom = b.dataset.r.split('.').map(Number); sb.pedir('inspect', { r: selDom }); p.querySelectorAll('.cl-dnode').forEach(x => x.classList.toggle('sel', x === b)); };
        b.onmouseenter = () => sb.pedir('marca', { r: b.dataset.r.split('.').map(Number) });
      });
      if (selDom) sb.pedir('inspect', { r: selDom });
    }
    function pintarInspect(i) {
      const d = $('.cl-insp'); if (!d || !i) return;
      const L = a => a.map(x => Math.round(x)).join(' ');
      const caja = '<div class="cl-box"><div class="m"><span>margin</span><b class="t">' + i.margin[0] + '</b><b class="r">' + i.margin[1] + '</b><b class="b">' + i.margin[2] + '</b><b class="l">' + i.margin[3] + '</b>' +
        '<div class="bo"><span>border</span><b class="t">' + i.border[0] + '</b><b class="r">' + i.border[1] + '</b><b class="b">' + i.border[2] + '</b><b class="l">' + i.border[3] + '</b>' +
        '<div class="p"><span>padding</span><b class="t">' + i.padding[0] + '</b><b class="r">' + i.padding[1] + '</b><b class="b">' + i.padding[2] + '</b><b class="l">' + i.padding[3] + '</b>' +
        '<div class="c">' + i.w + ' × ' + i.h + '</div></div></div></div></div>';
      const est = Object.entries(i.estilos).filter(([k, v]) => v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px' && v !== 'rgba(0, 0, 0, 0)' && !(k === 'opacity' && v === '1'));
      const color = v => /^rgb/.test(v) ? '<i class="cl-sw" style="background:' + v + '"></i>' : '';
      d.innerHTML = '<h5>&lt;' + i.tag + '&gt;' + (i.id ? ' #' + esc(i.id) : '') + (i.clases.length ? ' .' + i.clases.map(esc).join('.') : '') + '</h5>' +
        '<p class="cl-rel">Padre: <code>' + esc(i.padre || 'body') + '</code> · Hijos: ' + i.hijos + ' · Posición: x ' + i.x + ', y ' + i.y + '</p>' + caja +
        '<h5>Reglas CSS que le aplican</h5>' + (i.reglas.length ? i.reglas.map(r => '<div class="cl-regla"><b>' + esc(r.sel) + '</b> { ' + esc(r.css) + ' }</div>').join('') : '<p class="cl-vacio">Ninguna regla tuya; usa los estilos por defecto del navegador.</p>') +
        '<h5>Estilos calculados</h5><table>' + est.map(([k, v]) => '<tr><td>' + k + '</td><td>' + color(v) + esc(v) + '</td></tr>').join('') + '</table>';
    }

    /* Botones */
    $('.cl-run').onclick = () => ejecutar();
    $('.cl-reset').onclick = () => {
      archivos = originales.map(a => Object.assign({}, a));
      archivos.forEach((a, i) => docs[i].setValue(a.codigo));
      ejecutar();
    };

    // primera ejecución cuando el editor ya está en la página
    setTimeout(() => { cm.refresh(); ejecutar(); pintarPest(); }, 0);

    return {
      el, cm, ejecutar,
      archivos: () => { archivos[actual].codigo = cm.getValue(); return archivos.map(a => Object.assign({}, a)); },
      poner(nuevos) { nuevos.forEach(n => { const i = archivos.findIndex(a => a.nombre === n.nombre); if (i >= 0) { archivos[i].codigo = n.codigo; docs[i].setValue(n.codigo); } }); ejecutar(); },
      marcarLineas(desde, hasta) { for (let l = 0; l < cm.lineCount(); l++) cm.removeLineClass(l, 'background', 'cl-linea-nota'); if (desde) for (let l = desde - 1; l < Math.min(hasta, cm.lineCount()); l++) cm.addLineClass(l, 'background', 'cl-linea-nota'); },
      irArchivo(nombre) { const i = archivos.findIndex(a => a.nombre === nombre); if (i >= 0) { actual = i; cm.swapDoc(docs[i]); pintarArchivos(); } },
      probar: pruebas => listo || errores.length ? sb.probar(pruebas) : Promise.resolve(pruebas.map(() => false)),
      estado: () => ({ errores: errores.slice(), logs: logs.slice(), componentes: arbolComp }),
      alActualizar: f => cbs.push(f),
      destruir: () => sb.destruir()
    };
  }

  root.CodeLab = CodeLab;
  root.CodeLab.valorHTML = valorHTML;
})(window);
