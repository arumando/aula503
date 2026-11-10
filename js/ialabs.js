/* Aula 503 — laboratorios interactivos de Inteligencia Artificial.
   Aspiradora (agentes), Laberinto (búsqueda) y Neurona (aprendizaje). */
(function (root) {
  'use strict';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const h = (tag, attrs, html) => { const e = document.createElement(tag); if (attrs) Object.keys(attrs).forEach(k => k === 'class' ? (e.className = attrs[k]) : e.setAttribute(k, attrs[k])); if (html != null) e.innerHTML = html; return e; };
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const lento = () => !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const css = v => getComputedStyle(document.documentElement).getPropertyValue(v).trim() || '#888';

  /* =================================================================
     1) EL AGENTE ASPIRADORA
     El mundo tiene dos cuartos (A y B). El agente percibe [dónde está, si
     hay basura] y decide una acción según la tabla de reglas que arma el
     alumno. Luego se prueba en las 8 situaciones posibles.
     ================================================================= */
  const PERCEPCIONES = [['A', 'sucio'], ['A', 'limpio'], ['B', 'sucio'], ['B', 'limpio']];
  const ACCIONES = { aspirar: 'Aspirar', izq: 'Ir a la izquierda (cuarto A)', der: 'Ir a la derecha (cuarto B)', nada: 'Quedarse quieto' };
  const ACC_CORTA = { aspirar: 'aspirar', izq: 'ir a la izquierda', der: 'ir a la derecha', nada: 'quedarse quieto' };
  const T = (k, t) => (root.T ? root.T(k, t) : t);

  function Aspiradora(opts) {
    const o = Object.assign({ alCambiar: () => {} }, opts || {});
    const reglas = Object.assign({ 'A,sucio': '', 'A,limpio': '', 'B,sucio': '', 'B,limpio': '' }, o.reglas || {});
    const el = h('div', { class: 'lab lab-asp' });
    el.innerHTML =
      '<div class="como"><b>Cómo funciona.</b> El robot vive en dos cuartos: <b>A</b> (izquierda) y <b>B</b> (derecha). Es medio cieguito: solo sabe <b>en qué cuarto está</b> y <b>si ese cuarto tiene basura</b>. El otro cuarto no lo ve. Tú le das 4 ' + T('regla', 'reglas') + ' y él las sigue al pie de la letra.</div>' +
      '<div class="asp-mundo" aria-label="Mundo de la aspiradora"><div class="asp-cuarto" data-c="A"><span class="asp-letra">A</span><div class="asp-basura"></div></div><div class="asp-cuarto" data-c="B"><span class="asp-letra">B</span><div class="asp-basura"></div></div><div class="asp-robot" aria-hidden="true"><svg viewBox="-20 -20 40 40"><circle r="17" class="asp-cuerpo"/><circle r="11" class="asp-tapa"/><circle cx="6" cy="-4" r="2.6" class="asp-ojo"/><path d="M-9 13 H9" class="asp-cepillo"/></svg></div></div>' +
      '<div class="asp-percibe" aria-live="polite"></div>' +
      '<div class="asp-reglas"><div class="asp-reglas-tit">El cerebro del robot: sus 4 reglas</div></div>' +
      '<div class="asp-botones"><button type="button" class="btn btn-primario" data-a="probar">Probar en las 8 situaciones</button></div>' +
      '<div class="asp-resultado" aria-live="polite"></div><ol class="asp-traza" hidden></ol>';
    const tabla = el.querySelector('.asp-reglas');
    PERCEPCIONES.forEach(([c, e]) => {
      const k = c + ',' + e;
      const fila = h('div', { class: 'asp-fila' });
      fila.innerHTML = '<span class="asp-perc"><span class="mini-mundo">' + miniCuarto(c, e) + '</span>Si estoy en el cuarto <b>' + c + '</b> y ' + (e === 'sucio' ? 'veo <b>basura</b>' : 'está <b>limpio</b>') + '</span><span class="asp-flecha">→</span>';
      const sel = h('select', { 'aria-label': 'Acción si estoy en ' + c + ' y está ' + e, id: 'asp-' + c + e });
      sel.innerHTML = '<option value="">Elige qué hace…</option>' + Object.keys(ACCIONES).map(a => '<option value="' + a + '"' + (reglas[k] === a ? ' selected' : '') + '>' + ACCIONES[a] + '</option>').join('');
      sel.onchange = () => { reglas[k] = sel.value; o.alCambiar({ tipo: 'reglas', reglas }); };
      fila.appendChild(sel);
      tabla.appendChild(fila);
    });
    function miniCuarto(c, e) { return '<i class="mc' + (e === 'sucio' ? ' sucio' : '') + '">' + c + '</i>'; }
    const robot = el.querySelector('.asp-robot');
    const percibe = el.querySelector('.asp-percibe');
    const resultado = el.querySelector('.asp-resultado');
    const traza = el.querySelector('.asp-traza');
    let corriendo = false;

    function pintar(m) {
      el.querySelectorAll('.asp-cuarto').forEach(q => q.classList.toggle('sucio', m.sucio[q.dataset.c]));
      robot.style.left = m.pos === 'A' ? '25%' : '75%';
    }
    const ve = m => '[' + m.pos + ', ' + (m.sucio[m.pos] ? 'basura' : 'limpio') + ']';
    function decidir(m) { return reglas[m.pos + ',' + (m.sucio[m.pos] ? 'sucio' : 'limpio')]; }
    function aplicar(m, acc) {
      const r = { pos: m.pos, sucio: Object.assign({}, m.sucio) };
      if (acc === 'aspirar') r.sucio[m.pos] = false;
      if (acc === 'izq') r.pos = 'A';
      if (acc === 'der') r.pos = 'B';
      return r;
    }
    function nota(m, acc) {
      if (acc === 'izq' && m.pos === 'A') return ' (ya estaba en A, el de la izquierda: choca con la pared y no se mueve)';
      if (acc === 'der' && m.pos === 'B') return ' (ya estaba en B, el de la derecha: choca con la pared y no se mueve)';
      if (acc === 'aspirar' && !m.sucio[m.pos]) return ' (pero no había nada que aspirar)';
      if (acc === 'aspirar') return ' y el cuarto ' + m.pos + ' queda limpio';
      return '';
    }
    function simular(inicio, pasos) {
      let m = inicio, puntos = 0;
      const tr = [];
      for (let i = 0; i < pasos; i++) {
        const acc = decidir(m);
        if (!acc) return { error: true, traza: tr, final: m };
        const antes = m;
        m = aplicar(m, acc);
        if (acc === 'aspirar' && antes.sucio[antes.pos]) puntos += 10;
        if ((acc === 'izq' || acc === 'der') && antes.pos !== m.pos) puntos -= 1;
        tr.push({ antes, acc, despues: m });
      }
      return { limpio: !m.sucio.A && !m.sucio.B, puntos, traza: tr, final: m };
    }
    const situaciones = [];
    ['A', 'B'].forEach(pos => [true, false].forEach(sa => [true, false].forEach(sb => situaciones.push({ pos, sucio: { A: sa, B: sb } }))));
    const describir = s0 => 'Robot en ' + s0.pos + ' · A ' + (s0.sucio.A ? 'sucio' : 'limpio') + ' · B ' + (s0.sucio.B ? 'sucio' : 'limpio');
    const dibujo = s0 => '<span class="mini-par">' + ['A', 'B'].map(c => '<i class="mc' + (s0.sucio[c] ? ' sucio' : '') + (s0.pos === c ? ' robot' : '') + '">' + c + '</i>').join('') + '</span>';

    // Explica en palabras por qué falló una situación
    function diagnostico(s0, r) {
      const f = r.final, otro = f.pos === 'A' ? 'B' : 'A';
      if (f.sucio[f.pos]) {
        const acc = reglas[f.pos + ',sucio'];
        return 'En «' + describir(s0) + '» el robot estaba en <b>' + f.pos + '</b> viendo basura, y tu regla dice <b>' + ACC_CORTA[acc] + '</b>. Así nunca la limpia. Revisa la regla <b>«Si estoy en ' + f.pos + ' y veo basura»</b>.';
      }
      const acc = reglas[f.pos + ',limpio'];
      return 'En «' + describir(s0) + '» el robot dejó limpio el cuarto <b>' + f.pos + '</b>, pero el cuarto <b>' + otro + '</b> sigue sucio y él no lo puede ver. Su regla <b>«Si estoy en ' + f.pos + ' y está limpio»</b> dice <b>' + ACC_CORTA[acc] + '</b>' + nota(f, acc) + ', así que nunca llega a ' + otro + '. ¿Hacia dónde queda ' + otro + ' desde ' + f.pos + '?';
    }

    async function mostrar(inicio) {
      corriendo = true;
      let m = inicio;
      traza.hidden = false; traza.innerHTML = '';
      pintar(m);
      percibe.innerHTML = 'Empieza: ' + describir(inicio) + '.';
      await sleep(lento() ? 700 : 150);
      for (let i = 0; i < 4; i++) {
        const acc = decidir(m);
        const li = h('li', null, 'Ve <b>' + ve(m) + '</b> → ' + (acc ? 'su regla dice <b>' + ACC_CORTA[acc] + '</b>' + nota(m, acc) + '.' : '<span class="malo">no tiene regla para esto</span>'));
        traza.appendChild(li);
        percibe.innerHTML = li.innerHTML;
        if (!acc) break;
        await sleep(lento() ? 900 : 200);
        m = aplicar(m, acc);
        pintar(m);
        await sleep(lento() ? 600 : 150);
      }
      traza.appendChild(h('li', { class: !m.sucio.A && !m.sucio.B ? 'bueno' : 'malo' }, !m.sucio.A && !m.sucio.B ? 'Al final: todo limpio.' : 'Al final: quedó basura en ' + ['A', 'B'].filter(c => m.sucio[c]).join(' y ') + '.'));
      corriendo = false;
      return m;
    }

    el.querySelector('[data-a="probar"]').onclick = async () => {
      if (corriendo) return;
      const falta = PERCEPCIONES.find(([c, e]) => !reglas[c + ',' + e]);
      if (falta) { resultado.innerHTML = '<p class="malo">Te falta elegir qué hace el robot «si está en ' + falta[0] + ' y ' + (falta[1] === 'sucio' ? 've basura' : 'está limpio') + '».</p>'; return; }
      const res = situaciones.map(s0 => simular(s0, 4));
      const buenos = res.filter(r => r.limpio).length;
      const puntos = res.reduce((a, r) => a + (r.puntos || 0), 0);
      const peor = res.findIndex(r => !r.limpio);
      resultado.innerHTML = '<p>Lo pusimos a prueba en todas las situaciones posibles: el robot puede empezar en A o en B, y cada cuarto puede estar sucio o limpio (2 × 2 × 2 = <b>8</b>). Tiene 4 movimientos en cada una. <b>Toca una tarjeta</b> para verla en acción.</p>' +
        '<p class="nota-chica">En cada tarjeta, ' + dibujo({ pos: 'A', sucio: { A: false, B: true } }) + ' el cuadro azul es donde <b>empieza</b> el robot y el puntito amarillo es <b>basura</b>.</p>' +
        '<div class="asp-grid">' + res.map((r, i) => '<button type="button" class="asp-caso ' + (r.limpio ? 'ok' : 'mal') + '" data-i="' + i + '">' + dibujo(situaciones[i]) + '<small>empieza en ' + situaciones[i].pos + '</small><b>' + (r.limpio ? '✓ todo limpio' : '✗ quedó basura') + '</b></button>').join('') + '</div>' +
        '<p><b>' + buenos + ' de 8</b> quedaron limpias.</p>' +
        (buenos === 8 ? '<p class="bueno">¡Tu robot funciona siempre! En IA se dice que es un agente <b>racional</b> en este mundo.</p>' : '<div class="asp-diag"><b>¿Por qué falló?</b> ' + diagnostico(situaciones[peor], res[peor]) + '</div>');
      resultado.querySelectorAll('.asp-caso').forEach(b => b.onclick = () => { if (!corriendo) { resultado.querySelectorAll('.asp-caso').forEach(x => x.classList.toggle('sel', x === b)); o.alCambiar({ tipo: 'ver' }); mostrar(situaciones[+b.dataset.i]); } });
      const cual = peor >= 0 ? peor : 0;
      resultado.querySelectorAll('.asp-caso')[cual].classList.add('sel');
      o.alCambiar({ tipo: 'prueba', buenos, puntos, reglas });
      await mostrar(situaciones[cual]);
    };
    pintar({ pos: 'A', sucio: { A: true, B: true } });
    percibe.innerHTML = 'Así empieza: el robot está en <b>A</b> y los dos cuartos tienen basura. Lo que él «ve» es solo <b>[A, basura]</b>.';
    return { el, reglas };
  }

  /* =================================================================
     2) LABERINTO: BÚSQUEDA EN ANCHURA, PROFUNDIDAD y A*
     ================================================================= */
  const MAPA = [
    '..............',
    '.####.#####.#.',
    '.#....#...#.#.',
    '.#.####.#.#.#.',
    '.#......#...#.',
    '.######.#####.',
    '......#.......',
    '.####.#.#####.',
    '.#....#.....#.'
  ];
  function Laberinto(opts) {
    const o = Object.assign({ alCambiar: () => {}, algoritmos: ['bfs', 'dfs', 'astar'], editable: true }, opts || {});
    const F = MAPA.length, C = MAPA[0].length;
    let muros = new Set();
    MAPA.forEach((r, y) => [...r].forEach((ch, x) => { if (ch === '#') muros.add(x + ',' + y); }));
    let inicio = [0, 0], meta = [C - 1, F - 1];
    let alg = o.algoritmos[0];
    let corriendo = false, cancelar = false;
    const NOMBRES = { bfs: 'Anchura (BFS)', dfs: 'Profundidad (DFS)', astar: 'A* (con pista)' };
    const AYUDA = {
      bfs: '<b>Anchura:</b> como una mancha de agua que se extiende. Revisa primero todas las casillas a 1 paso, luego a 2, luego a 3… Usa una <b>fila</b> (el primero que llega es el primero que atiende, como en las tortillas). Siempre encuentra el camino más corto.',
      dfs: '<b>Profundidad:</b> como alguien terco que se mete por un pasillo hasta el fondo y solo regresa cuando choca. Usa una <b>pila</b> (como platos: sale el último que pusiste). Puede encontrar caminos larguísimos.',
      astar: '<b>A*:</b> como anchura, pero con una ' + T('heuristica', 'pista') + ': prefiere las casillas que parecen más cerca de la meta (cuenta cuántas casillas faltan, sin fijarse en los muros). Revisa menos casillas y aun así encuentra el camino más corto.'
    };
    const el = h('div', { class: 'lab lab-lab' });
    el.innerHTML = '<div class="lab-controles"><div class="seg" role="group" aria-label="Algoritmo"></div><button type="button" class="btn btn-primario" data-a="buscar">Buscar</button><button type="button" class="btn" data-a="limpiar">Borrar rastro</button></div>' +
      '<p class="lab-ayuda"></p><div class="lab-leyenda"><span><i class="celda inicio">S</i> salida</span><span><i class="celda meta">M</i> meta</span><span><i class="celda muro"></i> muro</span><span><i class="celda frontera"></i> en la lista de pendientes</span><span><i class="celda visitada"></i> ya revisada</span><span><i class="celda camino"></i> camino encontrado</span></div><div class="lab-tablero" role="grid" aria-label="Laberinto"></div>' +
      '<div class="lab-stats" aria-live="polite"></div>' +
      (o.editable ? '<p class="nota-chica">Toca una casilla para poner o quitar un muro.</p>' : '');
    const seg = el.querySelector('.seg'), tablero = el.querySelector('.lab-tablero'), stats = el.querySelector('.lab-stats'), ayuda = el.querySelector('.lab-ayuda');
    tablero.style.gridTemplateColumns = 'repeat(' + C + ', 1fr)';
    const celdas = {};
    for (let y = 0; y < F; y++) for (let x = 0; x < C; x++) {
      const c = h('button', { type: 'button', class: 'celda', 'aria-label': 'Casilla ' + (x + 1) + ',' + (y + 1) });
      c.onclick = () => {
        if (corriendo || !o.editable) return;
        const k = x + ',' + y;
        if ((x === inicio[0] && y === inicio[1]) || (x === meta[0] && y === meta[1])) return;
        if (muros.has(k)) muros.delete(k); else muros.add(k);
        limpiarRastro(); pintarBase();
        o.alCambiar({ tipo: 'muro' });
      };
      celdas[x + ',' + y] = c;
      tablero.appendChild(c);
    }
    function pintarSeg() {
      seg.innerHTML = '';
      o.algoritmos.forEach(a => {
        const b = h('button', { type: 'button', class: 'seg-b' + (alg === a ? ' on' : ''), 'aria-pressed': alg === a }, NOMBRES[a]);
        b.onclick = () => { if (corriendo) return; alg = a; pintarSeg(); limpiarRastro(); };
        seg.appendChild(b);
      });
      ayuda.innerHTML = AYUDA[alg];
    }
    function pintarBase() {
      Object.keys(celdas).forEach(k => {
        const c = celdas[k];
        c.className = 'celda' + (muros.has(k) ? ' muro' : '');
        c.textContent = '';
      });
      celdas[inicio.join(',')].classList.add('inicio'); celdas[inicio.join(',')].textContent = 'S';
      celdas[meta.join(',')].classList.add('meta'); celdas[meta.join(',')].textContent = 'M';
    }
    function limpiarRastro() { cancelar = true; pintarBase(); stats.innerHTML = ''; }
    const vecinos = (x, y) => [[x + 1, y], [x, y + 1], [x - 1, y], [x, y - 1]].filter(([a, b]) => a >= 0 && b >= 0 && a < C && b < F && !muros.has(a + ',' + b));
    const dist = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);

    async function buscar() {
      if (corriendo) return;
      pintarBase();
      corriendo = true; cancelar = false;
      const k = p => p[0] + ',' + p[1];
      const padre = new Map([[k(inicio), null]]);
      const g = new Map([[k(inicio), 0]]);
      let frontera = [inicio];
      let explorados = 0, encontrado = false;
      const espera = lento() ? 45 : 0;
      while (frontera.length && !cancelar) {
        let actual;
        if (alg === 'bfs') actual = frontera.shift();
        else if (alg === 'dfs') actual = frontera.pop();
        else {
          let mejor = 0;
          frontera.forEach((p, i) => { const f1 = g.get(k(p)) + dist(p, meta), f2 = g.get(k(frontera[mejor])) + dist(frontera[mejor], meta); if (f1 < f2) mejor = i; });
          actual = frontera.splice(mejor, 1)[0];
        }
        explorados++;
        const ka = k(actual);
        if (ka !== k(inicio) && ka !== k(meta)) { celdas[ka].classList.remove('frontera'); celdas[ka].classList.add('visitada'); }
        if (ka === k(meta)) { encontrado = true; break; }
        for (const v of vecinos(actual[0], actual[1])) {
          const kv = k(v);
          if (padre.has(kv)) continue;
          padre.set(kv, actual);
          g.set(kv, g.get(ka) + 1);
          frontera.push(v);
          if (kv !== k(meta)) celdas[kv].classList.add('frontera');
        }
        stats.innerHTML = 'Casillas revisadas: <b>' + explorados + '</b> · Pendientes en la ' + (alg === 'dfs' ? 'pila' : alg === 'bfs' ? 'fila' : 'lista') + ': <b>' + frontera.length + '</b>';
        if (espera) await sleep(espera);
      }
      if (cancelar) { corriendo = false; return; }
      let largo = 0;
      if (encontrado) {
        let p = padre.get(k(meta));
        const camino = [];
        while (p && k(p) !== k(inicio)) { camino.unshift(p); p = padre.get(k(p)); }
        largo = camino.length + 1;
        for (const c of camino) { celdas[k(c)].classList.add('camino'); if (espera) await sleep(espera); }
      }
      stats.innerHTML = encontrado
        ? '<b>' + NOMBRES[alg] + '</b> revisó <b>' + explorados + '</b> casillas y encontró un camino de <b>' + largo + '</b> pasos.'
        : 'No hay camino: los muros encierran la meta.';
      corriendo = false;
      o.alCambiar({ tipo: 'busqueda', alg, explorados, largo, encontrado });
    }
    el.querySelector('[data-a="buscar"]').onclick = buscar;
    el.querySelector('[data-a="limpiar"]').onclick = limpiarRastro;
    pintarSeg(); pintarBase();
    return { el };
  }

  /* =================================================================
     3) LA NEURONA (perceptrón)
     ¿Aprueba el examen? Entradas: horas de estudio y horas de sueño.
     ================================================================= */
  const DATOS = [
    [1, 4, 0], [2, 6, 0], [3, 3, 0], [2, 8, 0], [4, 5, 0], [1, 7, 0], [3, 6, 0], [5, 2, 0], [4, 3, 0], [2, 2, 0],
    [6, 6, 1], [7, 4, 1], [8, 7, 1], [5, 8, 1], [9, 5, 1], [7, 8, 1], [6, 9, 1], [8, 3, 1], [9, 8, 1], [6, 5, 1]
  ];
  function Neurona(opts) {
    const o = Object.assign({ alCambiar: () => {}, w1: 0.5, w2: 0, b: -1, entrenar: true }, opts || {});
    let w1 = o.w1, w2 = o.w2, b = o.b;
    let resaltado = -1, elegido = -1;
    const el = h('div', { class: 'lab lab-neu' });
    el.innerHTML =
      '<div class="como"><b>La pregunta:</b> ¿este alumno aprobará el examen? La ' + T('neurona', 'neurona') + ' solo sabe dos datos de cada uno: <b>cuántas horas estudió</b> y <b>cuántas horas durmió</b>. Con eso hace una cuenta y contesta «aprueba» o «reprueba».</div>' +
      '<div class="neu-grid"><div class="neu-plano"><canvas width="440" height="380" aria-label="Plano con los alumnos: horas de estudio contra horas de sueño"></canvas>' +
      '<ul class="neu-como"><li><i class="pt ap"></i><i class="pt rep"></i> Cada bolita es un alumno real: <b>verde</b> aprobó, <b>roja</b> reprobó.</li><li>Más a la <b>derecha</b> = estudió más horas. Más <b>arriba</b> = durmió más horas.</li><li><i class="zona"></i> La <b>zona verde clarito</b> es donde la neurona dice «aprueba». La línea azul es la frontera.</li><li><i class="anillo-m"></i> Una bolita con <b>anillo</b> = la neurona se equivocó con ese alumno.</li></ul></div>' +
      '<div class="neu-lado"><div class="neu-prec" aria-live="polite"></div><div class="neu-cuenta" aria-live="polite"></div>' +
      '<div class="neu-sliders"></div>' +
      (o.entrenar ? '<div class="neu-botones"><button type="button" class="btn btn-primario" data-a="paso">Aprender de 1 error</button><button type="button" class="btn" data-a="todo">Que aprenda sola</button><button type="button" class="btn" data-a="rand">Empezar con números al azar</button></div>' : '<div class="neu-botones"><button type="button" class="btn" data-a="pista">Dame una pista</button></div>') +
      '<div class="neu-explica" aria-live="polite"></div>' +
      '<details class="neu-det"><summary>Ver la neurona como diagrama</summary><svg class="neu-diagrama" viewBox="0 0 300 170" aria-label="Diagrama de la neurona"></svg></details></div></div>';
    const canvas = el.querySelector('canvas'), ctx = canvas.getContext('2d');
    const diag = el.querySelector('.neu-diagrama'), sliders = el.querySelector('.neu-sliders'), prec = el.querySelector('.neu-prec'), explica = el.querySelector('.neu-explica'), cuenta = el.querySelector('.neu-cuenta');
    const fmt = n => { const v = Math.round(n * 100) / 100; return (v < 0 ? '−' : '') + Math.abs(v).toFixed(2); };
    const salida = (x1, x2) => (w1 * x1 + w2 * x2 + b >= 0 ? 1 : 0);
    function precision() { return DATOS.filter(([x1, x2, y]) => salida(x1, x2) === y).length; }

    function slider(id, nombre, ayuda, get, set, min, max) {
      const w = h('label', { class: 'neu-sl', for: id });
      w.innerHTML = '<span>' + nombre + ' <b class="mono"></b></span><small>' + ayuda + '</small><input type="range" id="' + id + '" min="' + min + '" max="' + max + '" step="0.05">';
      const r = w.querySelector('input'), v = w.querySelector('b');
      r.value = get(); v.textContent = fmt(get());
      r.oninput = () => { set(+r.value); v.textContent = fmt(get()); resaltado = -1; dibujar(); };
      r.onchange = () => o.alCambiar({ tipo: 'precision', aciertos: precision(), total: DATOS.length, manual: true });
      w.sync = () => { r.value = get(); v.textContent = fmt(get()); };
      return w;
    }
    const s1 = slider('w1', '¿Cuánto cuenta estudiar? ' + T('peso', '(peso)'), 'Más alto = estudiar empuja más hacia «aprueba».', () => w1, v => { w1 = v; }, -2, 2);
    const s2 = slider('w2', '¿Cuánto cuenta dormir? ' + T('peso', '(peso)'), 'Más alto = dormir empuja más hacia «aprueba». Negativo = dormir le resta.', () => w2, v => { w2 = v; }, -2, 2);
    const s3 = slider('b', 'Qué tan exigente es ' + T('sesgo', '(sesgo)'), 'Más negativo = más difícil decir «aprueba». Mueve la línea sin girarla.', () => b, v => { b = v; }, -12, 4);
    sliders.append(s1, s2, s3);
    const sync = () => [s1, s2, s3].forEach(x => x.sync());

    function aPx(x, y) { return [40 + x / 10 * 380, 340 - y / 10 * 320]; }
    function dibujar() {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const cAp = css('--ok'), cRep = css('--mal'), cTxt = css('--muted'), cLinea = css('--line'), cZona = css('--zona');
      ctx.fillStyle = cZona;
      for (let px = 40; px < 420; px += 6) for (let py = 20; py < 340; py += 6) {
        const x = (px - 40) / 380 * 10, y = (340 - py) / 320 * 10;
        if (salida(x, y)) ctx.fillRect(px, py, 6, 6);
      }
      ctx.strokeStyle = cLinea; ctx.lineWidth = 1; ctx.fillStyle = cTxt; ctx.font = '12px ' + css('--f-ui');
      for (let i = 0; i <= 10; i += 2) {
        const [x0] = aPx(i, 0), [, y1] = aPx(0, i);
        ctx.beginPath(); ctx.moveTo(x0, 20); ctx.lineTo(x0, 340); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(40, y1); ctx.lineTo(420, y1); ctx.stroke();
        ctx.fillText(String(i), x0 - 4, 356); ctx.fillText(String(i), 24, y1 + 4);
      }
      ctx.fillText('Horas de estudio →', 300, 374);
      ctx.save(); ctx.translate(12, 200); ctx.rotate(-Math.PI / 2); ctx.fillText('Horas de sueño →', 0, 0); ctx.restore();
      ctx.save();
      ctx.beginPath(); ctx.rect(40, 20, 380, 320); ctx.clip();
      ctx.strokeStyle = css('--accent'); ctx.lineWidth = 2.5;
      ctx.beginPath();
      if (Math.abs(w2) > 0.001) { const ya = -(b) / w2, yb = -(w1 * 10 + b) / w2; const [p, q] = aPx(0, ya), [r, t] = aPx(10, yb); ctx.moveTo(p, q); ctx.lineTo(r, t); }
      else if (Math.abs(w1) > 0.001) { const xa = -b / w1; const [p] = aPx(xa, 0); ctx.moveTo(p, 20); ctx.lineTo(p, 340); }
      ctx.stroke();
      ctx.restore();
      DATOS.forEach(([x, y, c], i) => {
        const [px, py] = aPx(x, y);
        ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.fillStyle = c ? cAp : cRep; ctx.fill();
        if (salida(x, y) !== c) { ctx.lineWidth = 2.5; ctx.strokeStyle = css('--fg'); ctx.beginPath(); ctx.arc(px, py, 11, 0, Math.PI * 2); ctx.stroke(); }
        if (i === resaltado || i === elegido) { ctx.lineWidth = 3; ctx.strokeStyle = css('--accent'); ctx.setLineDash(i === elegido ? [] : [4, 3]); ctx.beginPath(); ctx.arc(px, py, 16, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]); }
      });
      const ac = precision();
      prec.innerHTML = 'La neurona acierta con <b>' + ac + ' de ' + DATOS.length + '</b> alumnos.' + (ac === DATOS.length ? ' <span class="bueno">¡Los separa perfecto!</span>' : ' <span class="nota-chica">Meta: 20 de 20.</span>');
      pintarCuenta();
    }
    // La cuenta de la neurona para un alumno, en palabras
    function pintarCuenta() {
      if (elegido < 0) { cuenta.innerHTML = '<b>Toca una bolita</b> de la gráfica para ver la cuenta que hace la neurona con ese alumno.'; dibujarDiagrama([5, 5]); return; }
      const [x1, x2, y] = DATOS[elegido], z = w1 * x1 + w2 * x2 + b, dice = z >= 0 ? 1 : 0;
      cuenta.innerHTML = '<div class="cuenta-tit">La cuenta para este alumno</div>' +
        '<div class="cuenta-fila"><span>Estudió <b>' + x1 + ' h</b> × cuánto cuenta estudiar (' + fmt(w1) + ')</span><b class="mono">' + fmt(w1 * x1) + '</b></div>' +
        '<div class="cuenta-fila"><span>Durmió <b>' + x2 + ' h</b> × cuánto cuenta dormir (' + fmt(w2) + ')</span><b class="mono">' + fmt(w2 * x2) + '</b></div>' +
        '<div class="cuenta-fila"><span>Exigencia (sesgo)</span><b class="mono">' + fmt(b) + '</b></div>' +
        '<div class="cuenta-fila total"><span>Total</span><b class="mono">' + fmt(z) + '</b></div>' +
        '<p>' + (z >= 0 ? 'Como el total es <b>0 o más</b>, la neurona dice <b class="bueno">APRUEBA</b>.' : 'Como el total es <b>menor que 0</b>, la neurona dice <b class="malo">REPRUEBA</b>.') + ' En la vida real ese alumno <b>' + (y ? 'aprobó' : 'reprobó') + '</b>: ' + (dice === y ? '<span class="bueno">acertó ✓</span>' : '<span class="malo">se equivocó ✗</span>') + '</p>';
      dibujarDiagrama([x1, x2]);
    }
    function dibujarDiagrama(p) {
      const z = w1 * p[0] + w2 * p[1] + b, y = z >= 0 ? 1 : 0;
      diag.innerHTML =
        '<g class="nd-ent"><circle cx="30" cy="45" r="20"/><text x="30" y="49">' + p[0] + ' h</text><text class="nd-lab" x="30" y="80">estudio</text></g>' +
        '<g class="nd-ent"><circle cx="30" cy="125" r="20"/><text x="30" y="129">' + p[1] + ' h</text><text class="nd-lab" x="30" y="160">sueño</text></g>' +
        '<line x1="50" y1="48" x2="128" y2="80" class="nd-arista" style="stroke-width:' + (1 + Math.abs(w1) * 3) + '"/><text class="nd-peso" x="86" y="56">×' + fmt(w1) + '</text>' +
        '<line x1="50" y1="122" x2="128" y2="92" class="nd-arista" style="stroke-width:' + (1 + Math.abs(w2) * 3) + '"/><text class="nd-peso" x="86" y="124">×' + fmt(w2) + '</text>' +
        '<g class="nd-suma"><circle cx="150" cy="86" r="24"/><text x="150" y="91">Σ</text><text class="nd-lab" x="150" y="128">+ sesgo ' + fmt(b) + '</text></g>' +
        '<line x1="174" y1="86" x2="212" y2="86" class="nd-arista"/><text class="nd-peso" x="193" y="78">' + fmt(z) + '</text>' +
        '<g class="nd-sal ' + (y ? 'si' : 'no') + '"><rect x="212" y="66" width="80" height="40" rx="10"/><text x="252" y="91">' + (y ? 'Aprueba' : 'Reprueba') + '</text></g>';
    }
    canvas.addEventListener('click', ev => {
      const r = canvas.getBoundingClientRect();
      const px = (ev.clientX - r.left) / r.width * canvas.width, py = (ev.clientY - r.top) / r.height * canvas.height;
      let mejor = -1, dmin = 22;
      DATOS.forEach(([x, y], i) => { const [qx, qy] = aPx(x, y); const d = Math.hypot(qx - px, qy - py); if (d < dmin) { dmin = d; mejor = i; } });
      if (mejor < 0) return;
      elegido = mejor; dibujar();
      o.alCambiar({ tipo: 'alumno', i: mejor });
    });
    canvas.style.cursor = 'pointer';

    function paso() {
      const errores = DATOS.map((d, i) => [d, i]).filter(([[x1, x2, y]]) => salida(x1, x2) !== y);
      if (!errores.length) { explica.innerHTML = '<span class="bueno">Ya no se equivoca con nadie. ¡Terminó de aprender!</span>'; return false; }
      const [[x1, x2, y], i] = errores[Math.floor(Math.random() * errores.length)];
      const err = y ? 1 : -1, lr = 0.05, lrb = 0.5;
      const n1 = w1 + lr * err * x1, n2 = w2 + lr * err * x2, nb = b + lrb * err;
      explica.innerHTML = '<b>Se equivocó con un alumno</b> que estudió ' + x1 + ' h y durmió ' + x2 + ' h: dijo «' + (y ? 'reprueba' : 'aprueba') + '» pero en realidad <b>' + (y ? 'aprobó' : 'reprobó') + '</b>. ' +
        (y ? 'Era demasiado exigente con él, así que <b>sube</b> un poquito sus números' : 'Fue muy barco con él, así que <b>baja</b> un poquito sus números') + ': estudio ' + fmt(w1) + ' → ' + fmt(n1) + ', sueño ' + fmt(w2) + ' → ' + fmt(n2) + ', exigencia ' + fmt(b) + ' → ' + fmt(nb) + '. Mira cómo se mueve la línea.';
      w1 = n1; w2 = n2; b = nb; resaltado = i; elegido = i;
      sync(); dibujar();
      return true;
    }
    if (o.entrenar) {
      el.querySelector('[data-a="paso"]').onclick = () => { paso(); o.alCambiar({ tipo: 'precision', aciertos: precision(), total: DATOS.length, entrenado: true }); };
      el.querySelector('[data-a="todo"]').onclick = async e => {
        const bt = e.currentTarget; bt.disabled = true;
        for (let i = 0; i < 600 && paso(); i++) await sleep(lento() ? 160 : 0);
        bt.disabled = false;
        o.alCambiar({ tipo: 'precision', aciertos: precision(), total: DATOS.length, entrenado: true });
      };
      el.querySelector('[data-a="rand"]').onclick = () => { w1 = Math.round((Math.random() * 2 - 1) * 20) / 20; w2 = Math.round((Math.random() * 2 - 1) * 20) / 20; b = Math.round((Math.random() * 4 - 2) * 20) / 20; resaltado = -1; explica.textContent = ''; sync(); dibujar(); o.alCambiar({ tipo: 'azar' }); };
    } else {
      let pista = 0;
      const PISTAS = ['Primero sube «cuánto cuenta estudiar» hasta 1.00: estudiar es lo que más importa.', 'Ahora dale un poquito de importancia a dormir: ponlo cerca de 0.50.', 'Por último, hazla más exigente: baja el sesgo hasta cerca de −7.50. Ajusta poco a poco hasta acertar 20 de 20.'];
      el.querySelector('[data-a="pista"]').onclick = () => { explica.innerHTML = '<b>Pista ' + (pista + 1) + ' de 3:</b> ' + PISTAS[pista]; pista = Math.min(pista + 1, PISTAS.length - 1); };
    }
    dibujar();
    const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    if (mq && mq.addEventListener) mq.addEventListener('change', dibujar);
    new MutationObserver(dibujar).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return { el };
  }

  root.IALabs = { Aspiradora, Laberinto, Neurona, ACCIONES };
})(window);
