/* Aula 503 · Academia Web — ejecución aislada del código de los estudiantes.
   El código nunca corre en la página de Aula 503: va a un <iframe sandbox="allow-scripts">
   sin allow-same-origin (origen opaco: no puede leer la página, el almacenamiento ni la cuenta).
   - Instrumentar(): agrega con acorn protección contra ciclos infinitos y, en modo paso a paso,
     llamadas que graban línea, variables, condiciones, llamadas y valores de retorno.
   - AGENTE: script que vive dentro del iframe y le cuenta a Aula 503 lo que pasa (consola, errores,
     eventos, DOM, estilos, pruebas) por postMessage.
   - Sandbox: lo usa el laboratorio para crear el iframe, mandarle código y escuchar mensajes. */
(function (root) {
  'use strict';

  const MAX_PASOS = 2500, MAX_MS = 1500;

  /* ---------------- Utilidades de AST ---------------- */
  function esNodo(x) { return x && typeof x.type === 'string'; }
  function hijos(n, fn) {
    for (const k in n) {
      if (k === 'type' || k === 'start' || k === 'end' || k === 'loc') continue;
      const v = n[k];
      if (Array.isArray(v)) v.forEach(x => esNodo(x) && fn(x, k));
      else if (esNodo(v)) fn(v, k);
    }
  }
  function nombresPatron(p, out) {
    if (!p) return out;
    if (p.type === 'Identifier') out.push(p.name);
    else if (p.type === 'ObjectPattern') p.properties.forEach(q => nombresPatron(q.type === 'RestElement' ? q.argument : q.value, out));
    else if (p.type === 'ArrayPattern') p.elements.forEach(e => nombresPatron(e, out));
    else if (p.type === 'AssignmentPattern') nombresPatron(p.left, out);
    else if (p.type === 'RestElement') nombresPatron(p.argument, out);
    return out;
  }
  const esFuncion = n => n.type === 'FunctionDeclaration' || n.type === 'FunctionExpression' || n.type === 'ArrowFunctionExpression';
  // var se eleva hasta la función; let/const/function/class se quedan en su bloque
  function varsElevadas(n, out) {
    hijos(n, c => {
      if (esFuncion(c)) return;
      if (c.type === 'VariableDeclaration' && c.kind === 'var') c.declarations.forEach(d => nombresPatron(d.id, out));
      varsElevadas(c, out);
    });
    return out;
  }
  function declaradasDirectas(lista, out) {
    lista.forEach(s => {
      if (s.type === 'VariableDeclaration' && s.kind !== 'var') s.declarations.forEach(d => nombresPatron(d.id, out));
      if ((s.type === 'FunctionDeclaration' || s.type === 'ClassDeclaration') && s.id) out.push(s.id.name);
    });
    return out;
  }
  const uniq = a => [...new Set(a)].filter(x => !x.startsWith('__') && !x.startsWith('aula'));

  /* Analiza sin ejecutar: devuelve { ast } o { error: {msg, linea, col} } */
  function analizar(src) {
    try { return { ast: root.acorn.parse(src, { ecmaVersion: 'latest', sourceType: 'script', locations: true }) }; }
    catch (e) { return { error: { msg: traducirError(e.message.replace(/\s*\(\d+:\d+\)$/, '')), linea: e.loc ? e.loc.line : 1, col: e.loc ? e.loc.column : 0 } }; }
  }
  // Errores de sintaxis más comunes, en español
  const TRAD = [
    [/^Unexpected token$/, 'Hay un símbolo que no esperaba aquí (revisa paréntesis, llaves, comas o comillas)'],
    [/^Unexpected character '(.)'/, 'El carácter «$1» no es válido aquí'],
    [/^Unterminated string constant/, 'Un texto (string) no se cerró: falta una comilla'],
    [/^Unterminated template/, 'Falta cerrar la comilla invertida ` del template'],
    [/^Identifier '(.+)' has already been declared/, 'La variable «$1» ya estaba declarada'],
    [/^Unexpected keyword '(.+)'/, 'La palabra «$1» no puede ir aquí'],
    [/^Unexpected reserved word/, 'Usaste una palabra reservada donde no se puede'],
    [/^'return' outside of function/, '«return» solo se puede usar dentro de una función'],
    [/^Assigning to rvalue/, 'No se le puede asignar un valor a eso (lo de la izquierda del = debe ser una variable)'],
    [/^Unexpected end of input|^Unexpected token \(\d+/, 'El código terminó antes de tiempo: probablemente falta cerrar una llave } o un paréntesis )'],
    [/^Missing semicolon/, 'Falta un punto y coma o un operador entre dos valores'],
    [/^Complex binding patterns require an initialization value/, 'Al desestructurar con const/let necesitas darle un valor con ='],
    [/^Const declarations require an initialization value|^Missing initializer in const declaration/, 'Una constante (const) necesita un valor desde el principio']
  ];
  function traducirError(m) {
    for (const [re, t] of TRAD) if (re.test(m)) return m.replace(re, t);
    return m;
  }

  /* ---------------- Instrumentación ---------------- */
  function instrumentar(src, opciones) {
    const traza = !!(opciones && opciones.traza);
    const r = analizar(src);
    if (r.error) return r;
    const ast = r.ast, ins = [];
    const pon = (pos, txt, pri) => ins.push({ pos, txt, pri });
    const pila = []; // scopes: arreglos de nombres
    const snap = () => {
      const nombres = uniq(pila.flat()).slice(-40);
      return '()=>({' + nombres.map(n => JSON.stringify(n) + ':__v(()=>' + n + ')').join(',') + '})';
    };
    const L = n => n.loc.start.line;

    function nombreFuncion(f, padre) {
      if (f.id) return f.id.name;
      if (padre) {
        if (padre.type === 'VariableDeclarator' && padre.id.type === 'Identifier') return padre.id.name;
        if ((padre.type === 'Property' || padre.type === 'MethodDefinition') && padre.key) return padre.key.name || padre.key.value || 'método';
        if (padre.type === 'AssignmentExpression' && padre.left.type === 'Identifier') return padre.left.name;
        if (padre.type === 'AssignmentExpression' && padre.left.type === 'MemberExpression' && padre.left.property) return padre.left.property.name || 'función';
      }
      return f.type === 'ArrowFunctionExpression' ? 'función flecha' : 'función anónima';
    }

    // Un enunciado dentro de una lista (programa, bloque, case)
    function enunciado(s) {
      if (!traza) return visitar(s);
      const t = s.type;
      if (t === 'FunctionDeclaration' || t === 'EmptyStatement') return visitar(s);
      if (t === 'ExpressionStatement' && s.directive) return;
      const controla = t === 'IfStatement' || t === 'WhileStatement' || t === 'DoWhileStatement' || (t === 'ForStatement' && s.test);
      if (!controla) pon(s.start, ';__S(' + L(s) + ',' + snap() + ');', 1);
      if (t === 'ExpressionStatement') { pon(s.expression.start, '__E((', 2); pon(s.expression.end, '))', 8); }
      if (t === 'VariableDeclaration') {
        const nom = []; s.declarations.forEach(d => nombresPatron(d.id, nom));
        pon(s.end, ';__A(' + L(s) + ',()=>({' + nom.map(n => JSON.stringify(n) + ':__v(()=>' + n + ')').join(',') + '}));', 1);
      }
      visitar(s);
    }
    // Cuerpo que no es bloque (if (x) algo;) → se envuelve en llaves
    function cuerpo(b, esCiclo) {
      if (b.type === 'BlockStatement') {
        if (esCiclo) pon(b.start + 1, '__G();', 0);
        return visitar(b);
      }
      pon(b.start, esCiclo ? '{__G();' : '{', 0);
      pon(b.end, '}', 9);
      pila.push([]);
      enunciado(b);
      pila.pop();
    }
    function condicion(test, linea) {
      if (!traza || !test) return visitar(test);
      pon(test.start, '__C(' + linea + ',' + snap() + ',(', 2);
      pon(test.end, '))', 8);
      visitar(test);
    }
    function funcion(f, padre) {
      const nom = nombreFuncion(f, padre);
      const params = []; f.params.forEach(p => nombresPatron(p, params));
      const internas = f.body.type === 'BlockStatement' ? declaradasDirectas(f.body.body, varsElevadas(f.body, [])) : [];
      pila.push(params.concat(internas, f.id && f.type === 'FunctionExpression' ? [f.id.name] : []));
      f.params.forEach(p => visitar(p));
      if (traza) {
        const args = '()=>({' + uniq(params).map(n => JSON.stringify(n) + ':__v(()=>' + n + ')').join(',') + '})';
        const ent = '__F(' + L(f) + ',' + JSON.stringify(nom) + ',' + args + ');try{';
        if (f.body.type === 'BlockStatement') {
          pon(f.body.start + 1, ent, 0);
          pon(f.body.end - 1, '}finally{__X()}', 9);
          f.body.body.forEach(enunciado);
        } else {
          // flecha con expresión: x => x * 2   (cuidado con paréntesis: () => ({...}))
          let ini = f.body.start, fin = f.body.end;
          const entre = src.slice(src.lastIndexOf('=>', ini) + 2, ini);
          if (entre.includes('(')) {
            ini = src.lastIndexOf('(', ini);
            let j = fin; let prof = 0;
            for (; j < src.length; j++) { const c = src[j]; if (c === '(') prof++; else if (c === ')') { if (prof === 0) { fin = j + 1; break; } prof--; } }
          }
          pon(ini, '{' + ent + 'return __Rt(' + L(f.body) + ',(', 0);
          pon(fin, '))}finally{__X()}}', 9);
          visitar(f.body);
        }
      } else {
        if (f.body.type === 'BlockStatement') visitar(f.body); else visitar(f.body);
      }
      pila.pop();
    }

    function visitar(n, padre) {
      if (!esNodo(n)) return;
      switch (n.type) {
        case 'Program':
          pila.push(declaradasDirectas(n.body, varsElevadas(n, [])));
          n.body.forEach(enunciado);
          return;
        case 'BlockStatement':
          pila.push(declaradasDirectas(n.body, []));
          n.body.forEach(enunciado);
          pila.pop();
          return;
        case 'SwitchCase':
          if (n.test) visitar(n.test);
          n.consequent.forEach(enunciado);
          return;
        case 'FunctionDeclaration': case 'FunctionExpression': case 'ArrowFunctionExpression':
          return funcion(n, padre);
        case 'IfStatement':
          condicion(n.test, L(n));
          cuerpo(n.consequent, false);
          if (n.alternate) cuerpo(n.alternate, false);
          return;
        case 'WhileStatement':
          condicion(n.test, L(n));
          cuerpo(n.body, true);
          return;
        case 'DoWhileStatement':
          cuerpo(n.body, true);
          condicion(n.test, L(n));
          return;
        case 'ForStatement': {
          const nom = n.init && n.init.type === 'VariableDeclaration' ? n.init.declarations.flatMap(d => nombresPatron(d.id, [])) : [];
          pila.push(nom);
          if (n.init) visitar(n.init);
          condicion(n.test, L(n));
          if (n.update) visitar(n.update);
          cuerpo(n.body, true);
          pila.pop();
          return;
        }
        case 'ForInStatement': case 'ForOfStatement': {
          const nom = n.left.type === 'VariableDeclaration' ? n.left.declarations.flatMap(d => nombresPatron(d.id, [])) : [];
          pila.push(nom);
          visitar(n.left); visitar(n.right);
          cuerpo(n.body, true);
          pila.pop();
          return;
        }
        case 'CatchClause':
          pila.push(nombresPatron(n.param, []));
          visitar(n.body);
          pila.pop();
          return;
        case 'ReturnStatement':
          if (traza) {
            if (n.argument) { pon(n.argument.start, '__Rt(' + L(n) + ',(', 2); pon(n.argument.end, '))', 8); }
            else pon(n.start + 6, ' __Rt(' + L(n) + ',undefined)', 2);
          }
          if (n.argument) visitar(n.argument, n);
          return;
        case 'LabeledStatement':
          return cuerpo(n.body, false);
        default:
          hijos(n, c => visitar(c, n));
      }
    }
    visitar(ast);

    // Al final del programa: valores de las variables globales para el inspector
    const globales = uniq(declaradasDirectas(ast.body, varsElevadas(ast, [])));
    const fin = '\n;__fin(()=>({' + globales.slice(0, 60).map(n => JSON.stringify(n) + ':__v(()=>' + n + ')').join(',') + '}));';

    ins.sort((a, b) => b.pos - a.pos || b.pri - a.pri);
    let out = src;
    ins.forEach(i => { out = out.slice(0, i.pos) + i.txt + out.slice(i.pos); });
    return { codigo: out + fin, ast, globales };
  }

  /* ---------------- Agente que corre DENTRO del iframe ---------------- */
  function AGENTE(CFG) {
    var P = function (m) { m.aula = 1; m.run = CFG.run; try { parent.postMessage(m, '*'); } catch (e) { } };
    var TDZ = { tdz: 1 };
    var ocultos = function (el) { return el && el.nodeType === 1 && el.hasAttribute('data-aula'); };
    function desc(el) {
      if (!el || el.nodeType !== 1) return el === window ? 'window' : el === document ? 'document' : String(el);
      var s = '<' + el.tagName.toLowerCase();
      if (el.id) s += ' id="' + el.id + '"';
      if (el.className && typeof el.className === 'string') s += ' class="' + el.className.trim() + '"';
      return s + '>';
    }
    function ser(v, d) {
      d = d || 0;
      try {
        if (v === TDZ) return { t: 'tdz' };
        if (v === undefined) return { t: 'undefined' };
        if (v === null) return { t: 'null' };
        var t = typeof v;
        if (t === 'number' || t === 'boolean') return { t: t, v: v };
        if (t === 'string') return { t: t, v: v.length > 300 ? v.slice(0, 300) + '…' : v };
        if (t === 'bigint') return { t: t, v: String(v) + 'n' };
        if (t === 'symbol') return { t: t, v: String(v) };
        if (t === 'function') return { t: 'function', v: v.name || 'anónima', clase: /^class\b/.test(Function.prototype.toString.call(v)) };
        if (v instanceof Element) return { t: 'elemento', v: desc(v) };
        if (v instanceof Node) return { t: 'nodo', v: v.nodeName };
        if (v instanceof Event) return { t: 'evento', v: v.type };
        if (v instanceof Error) return { t: 'error', v: v.name + ': ' + v.message };
        if (v instanceof Date) return { t: 'fecha', v: isNaN(v) ? 'Invalid Date' : v.toISOString() };
        if (v instanceof RegExp) return { t: 'regexp', v: String(v) };
        if (d > 2) return { t: Array.isArray(v) ? 'array' : 'object', v: '…' };
        if (Array.isArray(v)) return { t: 'array', n: v.length, items: v.slice(0, 25).map(function (x) { return ser(x, d + 1); }) };
        if (v instanceof Map) return { t: 'map', n: v.size, items: Array.from(v.entries()).slice(0, 20).map(function (e) { return [ser(e[0], d + 1), ser(e[1], d + 1)]; }) };
        if (v instanceof Set) return { t: 'set', n: v.size, items: Array.from(v).slice(0, 20).map(function (x) { return ser(x, d + 1); }) };
        if (v instanceof Promise) return { t: 'promesa', v: 'Promise' };
        var ks = Object.keys(v), o = {};
        ks.slice(0, 25).forEach(function (k) { o[k] = ser(v[k], d + 1); });
        var ctor = v.constructor && v.constructor !== Object ? v.constructor.name : '';
        return { t: 'object', n: ks.length, props: o, clase: ctor };
      } catch (e) { return { t: 'string', v: '[no se pudo leer]' }; }
    }
    function texto(v) {
      if (typeof v === 'string') return v;
      try { if (v instanceof Element) return desc(v); return JSON.stringify(v) === undefined ? String(v) : (typeof v === 'object' ? JSON.stringify(v) : String(v)); } catch (e) { return String(v); }
    }

    /* Consola */
    window.aulaConsola = [];
    ['log', 'info', 'warn', 'error', 'table', 'debug'].forEach(function (k) {
      var orig = console[k];
      console[k] = function () {
        var a = Array.prototype.slice.call(arguments);
        if (typeof a[0] === 'string' && /development build of Vue|Download the React DevTools|in-browser Babel/.test(a[0])) return;
        window.aulaConsola.push(a.map(texto).join(' '));
        P({ k: 'log', nivel: k, args: a.map(function (x) { return ser(x); }), paso: T.pasos.length });
        try { orig && orig.apply(console, a); } catch (e) { }
      };
    });
    window.aulaSalida = function () { return window.aulaConsola.join('\n'); };
    window.aulaTexto = function (sel) { var e = document.querySelector(sel); return e ? e.textContent.trim() : null; };
    window.aulaEstilo = function (sel, prop) { var e = document.querySelector(sel); return e ? getComputedStyle(e).getPropertyValue(prop).trim() : null; };

    /* Errores */
    function errorAmigable(msg) {
      var m;
      if ((m = /^(?:Uncaught )?ReferenceError: (\S+) is not defined/.exec(msg))) return '«' + m[1] + '» no existe: no la has declarado o está mal escrita (JavaScript distingue mayúsculas).';
      if ((m = /^(?:Uncaught )?TypeError: Cannot read properties of (null|undefined) \(reading '(.+)'\)/.exec(msg))) return 'Intentaste leer «.' + m[2] + '» de algo que es ' + m[1] + '. ' + (m[1] === 'null' ? '¿querySelector no encontró el elemento? Revisa el selector.' : '¿La variable tiene valor?');
      if ((m = /^(?:Uncaught )?TypeError: Cannot set properties of (null|undefined) \(setting '(.+)'\)/.exec(msg))) return 'Intentaste cambiar «.' + m[2] + '» de algo que es ' + m[1] + '. ¿El elemento existe en el HTML?';
      if ((m = /^(?:Uncaught )?TypeError: (\S+) is not a function/.exec(msg))) return '«' + m[1] + '» no es una función: revisa el nombre o si lleva paréntesis.';
      if ((m = /^(?:Uncaught )?TypeError: Assignment to constant variable/.exec(msg))) return 'Intentaste cambiar una constante (const). Si su valor va a cambiar, decláralo con let.';
      if ((m = /Maximum call stack size exceeded/.exec(msg))) return 'Una función se llamó a sí misma sin parar (recursión infinita).';
      return null;
    }
    function reportar(msg, linea) {
      var lin = linea && linea > CFG.offset ? linea - CFG.offset : null;
      if (/__LIMITE/.test(msg)) { P({ k: 'limite', msg: 'Se grabaron ' + CFG.max + ' pasos y se detuvo la grabación (¿un ciclo muy largo?).' }); return; }
      P({ k: 'error', msg: String(msg).replace(/^Uncaught /, ''), ayuda: errorAmigable(String(msg)), linea: lin });
    }
    window.addEventListener('error', function (e) { reportar(e.message, e.lineno); });
    window.addEventListener('unhandledrejection', function (e) { reportar('Promesa rechazada: ' + (e.reason && e.reason.message || e.reason), null); });

    /* alert / prompt / confirm no existen en la vista previa aislada: los simulamos */
    function aviso(txt) {
      var d = document.createElement('div');
      d.setAttribute('data-aula', '');
      d.style.cssText = 'position:fixed;left:50%;top:12px;transform:translateX(-50%);background:#1b2226;color:#fff;padding:10px 16px;border-radius:10px;font:14px system-ui;box-shadow:0 6px 20px #0004;z-index:2147483647;max-width:90%';
      d.textContent = txt;
      (document.body || document.documentElement).appendChild(d);
      setTimeout(function () { d.remove(); }, 2600);
    }
    window.alert = function (m) { aviso('alert: ' + texto(m)); P({ k: 'log', nivel: 'info', args: [{ t: 'string', v: 'alert(' + texto(m) + ')' }], paso: T.pasos.length }); };
    window.confirm = function (m) { aviso('confirm: ' + texto(m) + ' → true'); return true; };
    window.prompt = function (m, def) { var r = def != null ? String(def) : (CFG.respuestas && CFG.respuestas.length ? String(CFG.respuestas.shift()) : ''); aviso('prompt: ' + texto(m) + ' → "' + r + '"'); P({ k: 'log', nivel: 'info', args: [{ t: 'string', v: 'prompt("' + texto(m) + '") respondió "' + r + '"' }], paso: T.pasos.length }); return r; };

    /* Eventos: anotamos cada vez que se dispara uno que el estudiante escuchó */
    var ae = EventTarget.prototype.addEventListener, re = EventTarget.prototype.removeEventListener, mapa = new WeakMap();
    EventTarget.prototype.addEventListener = function (tipo, fn, op) {
      if (typeof fn !== 'function') return ae.call(this, tipo, fn, op);
      var self = this, w = mapa.get(fn);
      if (!w) { w = function (ev) { P({ k: 'evento', tipo: tipo, en: desc(self), paso: T.pasos.length }); return fn.apply(this, arguments); }; mapa.set(fn, w); }
      P({ k: 'escucha', tipo: tipo, en: desc(this) });
      return ae.call(this, tipo, w, op);
    };
    EventTarget.prototype.removeEventListener = function (tipo, fn, op) { return re.call(this, tipo, mapa.get(fn) || fn, op); };
    ['click', 'input', 'change', 'submit', 'keydown', 'mouseover'].forEach(function (t) {
      ae.call(document, t, function (ev) { var el = ev.target && ev.target.closest && ev.target.closest('[on' + t + ']'); if (el) P({ k: 'evento', tipo: t, en: desc(el) + ' (atributo on' + t + ')', paso: T.pasos.length }); }, true);
    });

    /* Grabación paso a paso */
    var T = { pasos: [], prof: 0, pila: [], html: null, env: 0 };
    var cuenta = 0, t0 = Date.now(), ultimo = Date.now();
    window.__G = function () {
      var ahora = Date.now();
      if (ahora - ultimo > 250) { t0 = ahora; cuenta = 0; } // nueva tarea (un clic, un setTimeout…)
      ultimo = ahora;
      if (++cuenta % 500 === 0 && ahora - t0 > CFG.ms) { cuenta = 0; t0 = ahora; throw new Error('⏱ El programa tardó más de ' + (CFG.ms / 1000) + ' s y se detuvo. ¿Un ciclo que nunca termina?'); }
    };
    window.__v = function (f) { try { return f(); } catch (e) { return TDZ; } };
    function foto(f) { var o = {}, r; try { r = f(); } catch (e) { r = {}; } for (var k in r) o[k] = ser(r[k]); return o; }
    var envio = null;
    function enviar() { if (envio) return; envio = setTimeout(function () { envio = null; if (T.env < T.pasos.length) { P({ k: 'traza', desde: T.env, pasos: T.pasos.slice(T.env) }); T.env = T.pasos.length; } }, 60); }
    function nuevo(paso) {
      if (T.pasos.length >= CFG.max) throw new Error('__LIMITE');
      paso.p = T.prof; paso.pila = T.pila.slice();
      if (document.body) { var h = document.body.innerHTML; if (h !== T.html) { paso.html = h; T.html = h; } }
      T.pasos.push(paso); enviar();
      return paso;
    }
    window.__S = function (l, f) { nuevo({ l: l, v: foto(f) }); };
    window.__C = function (l, f, val) { nuevo({ l: l, v: foto(f), cond: ser(val) }); return val; };
    window.__E = function (val) { for (var i = T.pasos.length - 1; i >= 0; i--) if (T.pasos[i].p === T.prof && T.pasos[i].res === undefined && !T.pasos[i].llamada && !T.pasos[i].ret) { T.pasos[i].res = ser(val); T.pasos[i].tiene = 1; break; } return val; };
    window.__A = function (l, f) { nuevo({ l: l, v: null, decl: foto(f) }); };
    window.__F = function (l, nom, args) { T.pila.push(nom); T.prof++; nuevo({ l: l, llamada: nom, args: foto(args) }); };
    window.__X = function () { T.pila.pop(); T.prof--; };
    window.__Rt = function (l, v) { nuevo({ l: l, ret: ser(v), de: T.pila[T.pila.length - 1] }); return v; };
    window.__fin = function (f) { T.fin = true; P({ k: 'vars', vars: foto(f) }); };

    /* Inspector: árbol DOM, estilos y resaltado */
    function arbol(el, ruta) {
      var nodos = [], i = 0;
      Array.prototype.forEach.call(el.childNodes, function (c) {
        if (c.nodeType === 3) { var t = c.textContent.replace(/\s+/g, ' ').trim(); if (t) nodos.push({ x: t.length > 80 ? t.slice(0, 80) + '…' : t }); return; }
        if (c.nodeType !== 1 || ocultos(c) || c.tagName === 'SCRIPT' && c.hasAttribute('data-aula')) return;
        var r = ruta.concat(i++);
        var atr = [];
        Array.prototype.forEach.call(c.attributes, function (a) { if (a.name !== 'id' && a.name !== 'class' && a.name !== 'style') atr.push([a.name, a.value.slice(0, 80)]); });
        var st = c.getAttribute('style');
        nodos.push({ e: c.tagName.toLowerCase(), id: c.id || '', c: c.className && typeof c.className === 'string' ? c.className.trim().split(/\s+/).filter(Boolean) : [], a: atr, s: st || '', r: r, h: arbol(c, r) });
      });
      return nodos;
    }
    function porRuta(r) {
      var el = document.body;
      for (var i = 0; i < r.length && el; i++) el = Array.prototype.filter.call(el.children, function (c) { return !ocultos(c) && !(c.tagName === 'SCRIPT' && c.hasAttribute('data-aula')); })[r[i]];
      return el;
    }
    var marco = null;
    function marcar(el) {
      if (!marco) { marco = document.createElement('div'); marco.setAttribute('data-aula', ''); marco.style.cssText = 'position:absolute;pointer-events:none;z-index:2147483646;outline:2px solid #0a6c88;background:rgba(10,108,136,.15);transition:all .15s'; }
      if (!el) { marco.remove(); return; }
      var b = el.getBoundingClientRect();
      marco.style.left = (b.left + scrollX) + 'px'; marco.style.top = (b.top + scrollY) + 'px'; marco.style.width = b.width + 'px'; marco.style.height = b.height + 'px';
      document.body.appendChild(marco);
      if (b.top < 0 || b.bottom > innerHeight) el.scrollIntoView({ block: 'center' });
    }
    function reglas(el) {
      var out = [];
      Array.prototype.forEach.call(document.styleSheets, function (ss) {
        var rs; try { rs = ss.cssRules; } catch (e) { return; }
        Array.prototype.forEach.call(rs || [], function (r) { try { if (r.selectorText && el.matches(r.selectorText)) out.push({ sel: r.selectorText, css: r.style.cssText }); } catch (e) { } });
      });
      if (el.getAttribute('style')) out.push({ sel: 'style="…" (en la etiqueta)', css: el.getAttribute('style') });
      return out;
    }
    var PROPS = ['display', 'position', 'top', 'left', 'width', 'height', 'color', 'background-color', 'font-size', 'font-weight', 'font-family', 'text-align', 'border', 'border-radius', 'flex-direction', 'justify-content', 'align-items', 'gap', 'grid-template-columns', 'opacity', 'box-shadow'];
    function inspeccionar(r) {
      var el = porRuta(r); if (!el) return null;
      var cs = getComputedStyle(el), b = el.getBoundingClientRect();
      var lados = function (p) { return ['top', 'right', 'bottom', 'left'].map(function (s) { return parseFloat(cs.getPropertyValue(p + '-' + s + (p === 'border' ? '-width' : ''))) || 0; }); };
      var est = {}; PROPS.forEach(function (p) { est[p] = cs.getPropertyValue(p); });
      marcar(el);
      return { r: r, tag: el.tagName.toLowerCase(), id: el.id, clases: Array.prototype.slice.call(el.classList), w: Math.round(b.width * 10) / 10, h: Math.round(b.height * 10) / 10, x: Math.round(b.left), y: Math.round(b.top), margin: lados('margin'), padding: lados('padding'), border: lados('border'), estilos: est, reglas: reglas(el), padre: el.parentElement && el.parentElement !== document.documentElement ? desc(el.parentElement) : null, hijos: el.children.length, texto: (el.textContent || '').trim().slice(0, 120) };
    }
    var avisoDom = null;
    function vigilar() {
      if (!document.body) return;
      new MutationObserver(function (ms) {
        if (ms.every(function (m) { return ocultos(m.target) || Array.prototype.every.call(m.addedNodes, ocultos) && Array.prototype.every.call(m.removedNodes, ocultos) && m.type === 'childList'; })) return;
        clearTimeout(avisoDom); avisoDom = setTimeout(function () { P({ k: 'domcambio' }); }, 120);
      }).observe(document.body, { subtree: true, childList: true, attributes: true, characterData: true });
    }
    window.addEventListener('message', function (e) {
      var d = e.data; if (!d || !d.aula) return;
      if (d.k === 'dom') P({ k: 'dom', arbol: document.body ? arbol(document.body, []) : [] });
      else if (d.k === 'inspect') P({ k: 'inspect', info: inspeccionar(d.r) });
      else if (d.k === 'marca') marcar(d.r ? porRuta(d.r) : null);
      else if (d.k === 'prueba') {
        var res = d.pruebas.map(function (x) { try { return !!(0, eval)(x); } catch (err) { return false; } });
        P({ k: 'prueba', res: res, id: d.id });
      }
      else if (d.k === 'eval') { var v; try { v = ser((0, eval)(d.expr)); } catch (err) { v = { t: 'error', v: String(err) }; } P({ k: 'evalres', v: v, id: d.id }); }
    });
    /* Árbol de componentes (React y Vue) */
    var ARBOL = [], cuentaRender = {}, envioArbol = null;
    function plano(ns, out) { ns.forEach(function (n) { out.push(n); plano(n.h || [], out); }); return out; }
    window.aulaComp = function (nombre) { return plano(ARBOL, []).filter(function (n) { return !nombre || n.n === nombre; }); };
    function publicarArbol() { clearTimeout(envioArbol); envioArbol = setTimeout(function () { P({ k: 'componentes', arbol: ARBOL }); }, 40); }
    function serProps(p) { var o = {}; if (!p) return o; Object.keys(p).forEach(function (k) { if (k === 'children') { var c = p.children; o.children = typeof c === 'string' || typeof c === 'number' ? ser(c) : { t: 'jsx', v: Array.isArray(c) ? c.length + ' hijos' : '<…/>' }; } else o[k] = ser(p[k]); }); return o; }

    if (CFG.modo === 'react') {
      var ganchos = function (f) {
        var out = [], s = f.memoizedState, i = 0;
        if (f.tag === 1) return f.memoizedState ? [{ tipo: 'this.state', v: ser(f.memoizedState) }] : [];
        while (s && i < 30) {
          if (s.queue && s.queue.dispatch) out.push({ tipo: 'useState', v: ser(s.memoizedState) });
          else if (s.memoizedState && typeof s.memoizedState === 'object' && 'create' in s.memoizedState && 'deps' in s.memoizedState) out.push({ tipo: 'useEffect', v: { t: 'string', v: s.memoizedState.deps ? 'deps: [' + s.memoizedState.deps.length + ']' : 'sin deps' } });
          else if (s.memoizedState && typeof s.memoizedState === 'object' && Object.keys(s.memoizedState).length === 1 && 'current' in s.memoizedState) out.push({ tipo: 'useRef', v: ser(s.memoizedState.current) });
          s = s.next; i++;
        }
        return out;
      };
      var nombreDe = function (t) { if (typeof t === 'function') return t.displayName || t.name || 'Anónimo'; if (t && typeof t === 'object') return t.displayName || (t.render && (t.render.displayName || t.render.name)) || (t.type && nombreDe(t.type)) || 'Componente'; return null; };
      var visitar = function (f, ruta) {
        var esComp = f.tag === 0 || f.tag === 1 || f.tag === 11 || f.tag === 14 || f.tag === 15;
        if (!esComp) return hijosF(f, ruta);
        var n = nombreDe(f.type), clave = ruta + '/' + n;
        var monto = !f.alternate, cambio = monto || f.memoizedProps !== f.alternate.memoizedProps || f.memoizedState !== f.alternate.memoizedState;
        if (cambio) cuentaRender[clave] = (cuentaRender[clave] || 0) + 1;
        return [{ n: n, props: serProps(f.memoizedProps), estado: ganchos(f), render: monto ? 'monta' : cambio ? 'actualiza' : '', veces: cuentaRender[clave] || 0, key: f.key, h: hijosF(f, clave) }];
      };
      var hijosF = function (f, ruta) { var out = [], c = f.child, i = 0; while (c) { out = out.concat(visitar(c, ruta + ':' + (i++))); c = c.sibling; } return out; };
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {
        renderers: new Map(), supportsFiber: true, isDisabled: false,
        inject: function (r) { var id = this.renderers.size + 1; this.renderers.set(id, r); return id; },
        onCommitFiberRoot: function (id, raiz) { try { ARBOL = hijosF(raiz.current, 'r'); publicarArbol(); } catch (e) { } },
        onCommitFiberUnmount: function () { }, onPostCommitFiberRoot: function () { }, onScheduleFiberRoot: function () { }, checkDCE: function () { }
      };
    }
    if (CFG.modo === 'vue') {
      var app = null, cambiados = {};
      var esFn = function (v) { return typeof v === 'function'; };
      var estadoVue = function (i) {
        var o = {}, ss = i.setupState || {};
        Object.keys(ss).forEach(function (k) { if (k[0] !== '_' && k[0] !== '$') o[k] = esFn(ss[k]) ? { t: 'function', v: k } : ser(ss[k]); });
        if (i.data) Object.keys(i.data).forEach(function (k) { o[k] = ser(i.data[k]); });
        return o;
      };
      var nodoVue = function (vn) {
        if (!vn) return [];
        if (vn.component) {
          var i = vn.component, t = i.type;
          var nom = t.name || t.__name || (i.parent ? 'Componente' : 'App');
          return [{ n: nom, uid: i.uid, props: serProps(i.props), estado: Object.entries(estadoVue(i)).map(function (e) { return { tipo: e[0], v: e[1] }; }), emite: t.emits ? (Array.isArray(t.emits) ? t.emits : Object.keys(t.emits)) : [], render: cambiados[i.uid] || '', veces: cuentaRender[i.uid] || 0, h: nodoVue(i.subTree) }];
        }
        if (Array.isArray(vn.children)) return vn.children.reduce(function (a, c) { return a.concat(nodoVue(c)); }, []);
        return [];
      };
      var reporte = null;
      var leer = function () { clearTimeout(reporte); reporte = setTimeout(function () { try { if (app && app._instance) { ARBOL = nodoVue(app._instance.vnode); publicarArbol(); } } catch (e) { } cambiados = {}; }, 30); };
      window.__aulaVue = function (a) {
        app = a;
        a.mixin({
          mounted: function () { var u = this.$.uid; cambiados[u] = 'monta'; cuentaRender[u] = (cuentaRender[u] || 0) + 1; leer(); },
          updated: function () { var u = this.$.uid; cambiados[u] = 'actualiza'; cuentaRender[u] = (cuentaRender[u] || 0) + 1; leer(); },
          unmounted: function () { leer(); }
        });
        a.config.warnHandler = function (msg, inst, traza) { P({ k: 'log', nivel: 'warn', args: [{ t: 'string', v: '[Vue] ' + msg }], paso: 0 }); };
        a.config.errorHandler = function (err) { reportar(String(err && err.message || err), null); };
      };
    }
    window.addEventListener('DOMContentLoaded', vigilar);
    window.addEventListener('load', function () { enviar(); setTimeout(function () { P({ k: 'listo', fin: !!T.fin }); }, 30); });
  }

  /* ---------------- Documento que se carga en el iframe ---------------- */
  const BASE_CSS = 'html{color-scheme:light}body{font-family:system-ui,-apple-system,"Segoe UI",sans-serif;margin:12px;line-height:1.5;color:#1b2226;background:#fff}';
  /* Librerías con versión fija. Si existe la carpeta vendor/ (la app instalada) se usan las copias locales,
     que además funcionan sin conexión; si no (página suelta en un artefacto), se piden a cdnjs. */
  const CDN = 'https://cdnjs.cloudflare.com/ajax/libs/';
  const LOCAL = !!root.AULA_MODULOS;
  const LIBS = LOCAL ? {
    react: ['vendor/react/react.development.js', 'vendor/react/react-dom.development.js'],
    vue: ['vendor/vue/vue.global.js']
  } : {
    react: [CDN + 'react/18.3.1/umd/react.development.js', CDN + 'react-dom/18.3.1/umd/react-dom.development.js'],
    vue: [CDN + 'vue/3.4.27/vue.global.js']
  };
  const BABEL = LOCAL ? 'vendor/babel/babel.min.js' : CDN + 'babel-standalone/7.24.7/babel.min.js';
  /* El iframe del laboratorio tiene un origen opaco: el service worker de la app no atiende sus descargas.
     Por eso el texto de cada librería local se baja aquí (pasa por la caché de la app) y se incrusta en el documento. */
  const textoLib = {};
  function prepararLibs(modo) {
    if (!LOCAL) return Promise.resolve();
    return Promise.all((LIBS[modo] || []).map(u => textoLib[u] !== undefined ? null :
      fetch(u).then(r => { if (!r.ok) throw new Error(r.status); return r.text(); }).then(t => {
        // Dentro de un <script> en línea, el navegador trata de forma especial «<!--», «<script» y «</script»
        // aunque estén dentro de un texto del código; \x3C es el mismo «<» para JavaScript y no confunde al HTML.
        textoLib[u] = t.replace(/<(?=!--|\/?script)/gi, '\\x3C');
      })));
  }
  let cargaBabel = null;
  function cargarBabel() {
    if (root.Babel) return Promise.resolve(root.Babel);
    if (!cargaBabel) cargaBabel = new Promise((ok, mal) => { const s = document.createElement('script'); s.src = BABEL; s.onload = () => ok(root.Babel); s.onerror = () => { cargaBabel = null; mal(new Error('No se pudo cargar Babel')); }; document.head.appendChild(s); });
    return cargaBabel;
  }
  /* JSX → JavaScript conservando los números de línea (para que los errores apunten bien) */
  function compilarJSX(src) {
    try { return { codigo: root.Babel.transform(src, { presets: [['react', { runtime: 'classic' }]], retainLines: true, filename: 'App.jsx', sourceType: 'script' }).code }; }
    catch (e) {
      const m = /\((\d+):(\d+)\)/.exec(e.message) || [];
      const msg = e.message.replace(/^.*?App\.jsx:\s*/, '').split('\n')[0].replace(/\s*\(\d+:\d+\)\s*$/, '');
      return { error: { msg: traducirError(msg.replace(/^Unexpected token, expected "(.+)"$/, 'Se esperaba «$1» aquí').replace(/^Adjacent JSX elements must be wrapped in an enclosing tag.*$/, 'Varios elementos JSX juntos deben ir dentro de un solo padre: envuélvelos en <div> o en <>…</>')
        .replace(/^Expected corresponding JSX closing tag for <(.+)>$/, 'Falta cerrar la etiqueta <$1> (o la cerraste con otro nombre)').replace(/^Unterminated JSX contents$/, 'Una etiqueta JSX no se cerró')), linea: +m[1] || 1, col: +m[2] || 0 } };
    }
  }
  let contadorRun = 0;
  function documento(o) {
    const run = ++contadorRun;
    const esc = s => String(s || '').replace(/<\/script/gi, '<\\/script');
    const cab = '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
      '<style data-aula>' + BASE_CSS + '</style>';
    let antesJs = cab + '<script data-aula>(' + AGENTE.toString() + ')(' + JSON.stringify({ run, modo: o.modo || 'web', max: MAX_PASOS, ms: MAX_MS, offset: 0, respuestas: o.respuestas || [] }) + ')<\/script>' +
      (LIBS[o.modo] || []).concat(o.librerias || []).map(u => textoLib[u] !== undefined ? '<script data-aula>' + textoLib[u] + '\n<\/script>' : '<script data-aula src="' + u + '"><\/script>').join('') +
      (o.modo === 'vue' ? '<script data-aula>if(window.Vue){var __c=Vue.createApp;Vue.createApp=function(){var a=__c.apply(this,arguments);window.__aulaVue&&__aulaVue(a);return a}}<\/script>' : '') +
      '<style>' + (o.css || '') + '</style></head><body>' + (o.html || '') + '\n<script data-aula>\n';
    // la línea donde empieza el JS del estudiante (para traducir números de línea de errores)
    const offset = antesJs.split('\n').length - 1;
    antesJs = antesJs.replace('"offset":0', '"offset":' + offset);
    return { run, srcdoc: antesJs + esc(o.js || '') + '\n<\/script></body></html>' };
  }

  /* ---------------- Controlador (lado de Aula 503) ---------------- */
  class Sandbox {
    constructor(contenedor, alMensaje) {
      this.cont = contenedor; this.alMensaje = alMensaje; this.frame = null; this.run = 0; this.esperas = new Map();
      this._oir = e => {
        const d = e.data;
        if (!d || !d.aula || !this.frame || e.source !== this.frame.contentWindow || d.run !== this.run) return;
        if ((d.k === 'prueba' || d.k === 'evalres') && this.esperas.has(d.id)) { this.esperas.get(d.id)(d); this.esperas.delete(d.id); return; }
        this.alMensaje(d);
      };
      window.addEventListener('message', this._oir);
    }
    /* o = { html, css, js, traza, librerias, respuestas }  → devuelve { ok, error?, globales? } */
    ejecutar(o) {
      let js = o.js || '', info = { ok: true, globales: [] };
      if (o.modo === 'react' && js.trim()) {
        const c = compilarJSX(js);
        if (c.error) return { ok: false, error: c.error };
        js = c.codigo;
      }
      if (js.trim() && !o.sinInstrumentar) {
        const r = instrumentar(js, { traza: o.traza });
        if (r.error) return { ok: false, error: r.error };
        js = r.codigo; info.globales = r.globales; info.ast = r.ast;
      }
      const d = documento({ html: o.html, css: o.css, js, modo: o.modo, librerias: o.librerias, respuestas: o.respuestas });
      this.run = d.run;
      const f = document.createElement('iframe');
      f.setAttribute('sandbox', 'allow-scripts allow-forms');
      f.setAttribute('title', 'Vista previa del código');
      f.className = 'cl-frame';
      f.srcdoc = d.srcdoc;
      if (this.frame) this.frame.replaceWith(f); else this.cont.appendChild(f);
      this.frame = f;
      return info;
    }
    pedir(k, extra) { if (this.frame && this.frame.contentWindow) this.frame.contentWindow.postMessage(Object.assign({ aula: 1, k }, extra || {}), '*'); }
    probar(pruebas) {
      return new Promise(res => {
        const id = Math.random().toString(36).slice(2);
        const t = setTimeout(() => { this.esperas.delete(id); res(pruebas.map(() => false)); }, 2500);
        this.esperas.set(id, d => { clearTimeout(t); res(d.res); });
        this.pedir('prueba', { pruebas, id });
      });
    }
    destruir() { window.removeEventListener('message', this._oir); if (this.frame) this.frame.remove(); this.frame = null; }
  }

  root.AulaSandbox = { Sandbox, instrumentar, analizar, traducirError, documento, cargarBabel, prepararLibs, compilarJSX };
})(window);
