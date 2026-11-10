/* Aula 503 — vista interactiva del simulador de redes.
   Dibuja la red en SVG, deja conectar cables, configurar equipos y ver viajar
   cada trama paso a paso. Usa NetSim (motor) y Consola (CLI del switch). */
(function (root) {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const W = 900, H = 520;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const h = (tag, attrs, html) => { const e = document.createElement(tag); if (attrs) Object.keys(attrs).forEach(k => k === 'class' ? (e.className = attrs[k]) : e.setAttribute(k, attrs[k])); if (html != null) e.innerHTML = html; return e; };
  const s = (tag, attrs) => { const e = document.createElementNS(NS, tag); if (attrs) Object.keys(attrs).forEach(k => e.setAttribute(k, attrs[k])); return e; };
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const reduceMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const T = (k, t) => (root.T ? root.T(k, t) : t);
  const DESCRIP = {
    pc: 'Una computadora. Aquí <b>empiezan y terminan</b> los mensajes (es un «dispositivo final»).',
    laptop: 'Una laptop. Igual que una PC: aquí empiezan y terminan los mensajes.',
    server: 'Un servidor: una computadora que <b>atiende a las demás</b> (páginas web, archivos).',
    switch: 'Un ' + T('switch', 'switch') + ': une equipos de la <b>misma red</b>. Como el repartidor de un edificio, apunta en su libreta en qué puerto está cada quien.',
    router: 'Un ' + T('router', 'router') + ': une <b>redes distintas</b>. Como la oficina de correos entre dos colonias.'
  };
  // Preferencia del alumno: explicación sencilla (por defecto) o técnica
  let modoSimple = true;
  try { modoSimple = localStorage.getItem('aula503.simple') !== '0'; } catch (e) { /* sin almacenamiento */ }
  // Partir una IP en «colonia» (red) y «casa» (equipo) según la máscara
  function anatomia(ip, mask) {
    if (!ip || !/^\d+\.\d+\.\d+\.\d+$/.test(ip)) return '';
    const n = { '255.0.0.0': 1, '255.255.0.0': 2, '255.255.255.0': 3 }[mask || '255.255.255.0'];
    if (!n) return '';
    const p = ip.split('.');
    return '<div class="ip-anat"><span class="mono"><span class="m-red">' + p.slice(0, n).join('.') + '</span>.<span class="m-host">' + p.slice(n).join('.') + '</span></span><small><span class="m-red">colonia (red)</span> · <span class="m-host">número de casa (equipo)</span></small></div>';
  }
  const ETIQUETA = { pc: 'PC', laptop: 'Laptop', server: 'Servidor', switch: 'Switch', router: 'Router', ap: 'Access point', nube: 'Internet' };
  DESCRIP.ap = 'Un <b>access point</b> (punto de acceso): da <b>Wi-Fi</b>. Por dentro funciona como un switch, pero sin cables: une a los equipos inalámbricos con la red del salón.';
  DESCRIP.nube = '<b>Internet</b>: todas las redes del mundo. Aquí lo representamos con un servidor de Google (8.8.8.8).';
  const tipoVisible = d => d.icono || d.tipo;

  /* ---------- Íconos de equipos (dibujados centrados en 0,0) ---------- */
  function icono(tipo) {
    const g = s('g', { class: 'ico ico-' + tipo });
    const add = (t, a) => g.appendChild(s(t, a));
    if (tipo === 'pc') {
      add('rect', { x: -24, y: -22, width: 48, height: 32, rx: 4, class: 'ico-cuerpo' });
      add('rect', { x: -19, y: -17, width: 38, height: 22, rx: 2, class: 'ico-pantalla' });
      add('path', { d: 'M-6 10 L-8 18 H8 L6 10 Z', class: 'ico-cuerpo' });
      add('rect', { x: -14, y: 17, width: 28, height: 4, rx: 2, class: 'ico-cuerpo' });
    } else if (tipo === 'laptop') {
      add('rect', { x: -20, y: -20, width: 40, height: 27, rx: 3, class: 'ico-cuerpo' });
      add('rect', { x: -16, y: -16, width: 32, height: 19, rx: 1.5, class: 'ico-pantalla' });
      add('path', { d: 'M-27 9 H27 L23 16 H-23 Z', class: 'ico-cuerpo' });
    } else if (tipo === 'server') {
      add('rect', { x: -16, y: -26, width: 32, height: 50, rx: 4, class: 'ico-cuerpo' });
      [-17, -6, 5].forEach(y => { add('rect', { x: -11, y, width: 22, height: 7, rx: 1.5, class: 'ico-pantalla' }); add('circle', { cx: 7, cy: y + 3.5, r: 1.6, class: 'ico-led' }); });
    } else if (tipo === 'switch') {
      add('rect', { x: -34, y: -14, width: 68, height: 28, rx: 5, class: 'ico-cuerpo' });
      for (let i = 0; i < 8; i++) add('rect', { x: -28 + i * 7, y: 3, width: 5, height: 5, rx: 1, class: 'ico-puerto' });
      add('path', { d: 'M-14 -6 H14 M10 -9 L14 -6 L10 -3 M-10 -3 L-14 0 L-10 3 M-14 0 H14', class: 'ico-trazo' });
    } else if (tipo === 'ap') {
      add('rect', { x: -26, y: -4, width: 52, height: 18, rx: 6, class: 'ico-cuerpo' });
      add('circle', { cx: 0, cy: 5, r: 2.5, class: 'ico-led' });
      add('path', { d: 'M-9 -10 A12 12 0 0 1 9 -10 M-15 -16 A20 20 0 0 1 15 -16 M-21 -22 A28 28 0 0 1 21 -22', class: 'ico-trazo' });
    } else if (tipo === 'nube') {
      add('path', { d: 'M-22 14 H22 A12 12 0 0 0 20 -9 A16 16 0 0 0 -10 -14 A12 12 0 0 0 -24 2 A8 8 0 0 0 -22 14 Z', class: 'ico-cuerpo' });
    } else if (tipo === 'router') {
      add('ellipse', { cx: 0, cy: 8, rx: 28, ry: 10, class: 'ico-cuerpo' });
      add('rect', { x: -28, y: -8, width: 56, height: 16, class: 'ico-cuerpo ico-sinborde' });
      add('ellipse', { cx: 0, cy: -8, rx: 28, ry: 10, class: 'ico-tapa' });
      add('path', { d: 'M-15 -8 H-4 M-8 -11 L-4 -8 L-8 -5 M15 -8 H4 M8 -11 L4 -8 L8 -5', class: 'ico-trazo' });
      add('path', { d: 'M-28 -8 V8 M28 -8 V8', class: 'ico-linea' });
    }
    return g;
  }

  /* =================================================================== */
  function NetView(opts) {
    const o = Object.assign({ herramientas: ['mover', 'cable', 'borrar', 'pc', 'switch', 'router', 'server'], editable: true, consola: true, alCambiar: () => {}, alto: 420 }, opts || {});
    const red = o.red;
    let herramienta = 'mover';
    let seleccion = null;     // id de equipo
    let cableDesde = null;    // id de equipo
    let animando = false, pausado = false, pasoAPaso = !!o.pasoAPaso, velocidad = 1, saltar = false;
    let continuar = null;     // resolver del modo paso a paso
    let tramaVista = null;    // trama abierta en el inspector
    const consolas = {};      // consola por switch

    /* ----- Estructura ----- */
    const el = h('div', { class: 'sim' });
    const barra = h('div', { class: 'sim-barra', role: 'toolbar', 'aria-label': 'Herramientas del simulador' });
    const cuerpo = h('div', { class: 'sim-cuerpo' });
    const lienzoWrap = h('div', { class: 'sim-lienzo' });
    const svg = s('svg', { viewBox: '0 0 ' + W + ' ' + H, class: 'sim-svg', role: 'img', 'aria-label': 'Diagrama de la red' });
    const capaGrid = s('g'), capaLinks = s('g'), capaDevs = s('g'), capaPaquetes = s('g'), capaGuia = s('g');
    const defs = s('defs');
    const patron = s('pattern', { id: 'cuad' + Math.random().toString(36).slice(2, 7), width: 30, height: 30, patternUnits: 'userSpaceOnUse' });
    patron.appendChild(s('path', { d: 'M30 0 H0 V30', class: 'sim-cuad' }));
    defs.appendChild(patron);
    svg.appendChild(defs);
    capaGrid.appendChild(s('rect', { x: -3000, y: -3000, width: 9000, height: 9000, fill: 'url(#' + patron.id + ')' }));
    let vb = { x: 0, y: 0, w: W, h: H };
    // Acerca la vista a los equipos para que se vean grandes aun en pantallas chicas
    function encuadrar() {
      if (!red.devs.length) { vb = { x: 0, y: 0, w: W, h: H }; }
      else {
        const xs = red.devs.map(d => d.x), ys = red.devs.map(d => d.y);
        let x0 = Math.min(...xs) - 95, x1 = Math.max(...xs) + 95, y0 = Math.min(...ys) - 75, y1 = Math.max(...ys) + 100;
        let w = Math.max(x1 - x0, 520), hh = Math.max(y1 - y0, 280);
        if (hh < w * 0.42) hh = w * 0.42;
        const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
        vb = { x: cx - w / 2, y: cy - hh / 2, w, h: hh };
      }
      svg.setAttribute('viewBox', [vb.x, vb.y, vb.w, vb.h].map(Math.round).join(' '));
    }
    [capaGrid, capaLinks, capaDevs, capaPaquetes, capaGuia].forEach(c => svg.appendChild(c));
    const narrador = h('div', { class: 'sim-narrador', 'aria-live': 'polite' });
    narrador.innerHTML = '<span class="sim-narr-ico">●</span><span>' + (o.textoInicial || 'Toca un equipo para ver sus datos. Para enviar un mensaje, abre una PC y usa <b>Enviar ping</b>.') + '</span>';
    const controlesAnim = h('div', { class: 'sim-anim', hidden: '' });
    lienzoWrap.append(svg, narrador, controlesAnim);
    const panel = h('aside', { class: 'sim-panel' });
    cuerpo.append(lienzoWrap, panel);
    const registroBox = h('details', { class: 'sim-registro' });
    registroBox.innerHTML = '<summary>Bitácora: repasa paso por paso lo que pasó</summary><ol class="sim-log"></ol>';
    const log = registroBox.querySelector('ol');
    let notasLog = [];
    const lineaLog = n => h('li', { class: 'log-' + n.tipo }, '<b>' + esc(n.dev ? (red.dev(n.dev) || {}).nombre || n.dev : '') + '</b> ' + esc(modoSimple ? n.simple : n.texto));
    function repintarLog() { log.innerHTML = ''; notasLog.forEach(n => log.appendChild(lineaLog(n))); }
    el.append(barra, cuerpo, registroBox);

    /* ----- Barra de herramientas ----- */
    const HERR = {
      mover: ['Mover', 'Arrastra equipos y tócalos para ver sus datos'],
      cable: ['Cable', 'Toca un equipo y luego otro para unirlos'],
      borrar: ['Borrar', 'Toca un equipo o un cable para quitarlo'],
      pc: ['+ PC', 'Agrega una computadora'], laptop: ['+ Laptop', 'Agrega una laptop'], server: ['+ Servidor', 'Agrega un servidor'],
      switch: ['+ Switch', 'Agrega un switch'], router: ['+ Router', 'Agrega un router']
    };
    function pintarBarra() {
      barra.innerHTML = '';
      const modos = h('div', { class: 'seg' });
      ['mover', 'cable', 'borrar'].filter(k => o.herramientas.includes(k)).forEach(k => {
        const b = h('button', { type: 'button', class: 'seg-b' + (herramienta === k ? ' on' : ''), title: HERR[k][1], 'aria-pressed': herramienta === k }, HERR[k][0]);
        b.onclick = () => { herramienta = k; cableDesde = null; capaGuia.innerHTML = ''; pintarBarra(); pintar(); };
        modos.appendChild(b);
      });
      if (modos.children.length > 1) barra.appendChild(modos);
      const agregar = ['pc', 'laptop', 'server', 'switch', 'router'].filter(k => o.herramientas.includes(k));
      if (agregar.length) {
        const g = h('div', { class: 'sim-agregar' });
        agregar.forEach(k => {
          const b = h('button', { type: 'button', class: 'chip', title: HERR[k][1] }, HERR[k][0]);
          b.onclick = () => {
            const n = red.devs.length;
            const d = red.agregar(k, vb.x + 110 + (n * 137) % Math.max(200, vb.w - 220), vb.y + 90 + (n * 71) % Math.max(120, vb.h - 200));
            seleccion = d.id; herramienta = 'mover';
            encuadrar(); pintarBarra(); pintar(); verPanel();
            o.alCambiar({ tipo: 'agregar', dev: d.id });
          };
          g.appendChild(b);
        });
        barra.appendChild(g);
      }
      const der = h('div', { class: 'sim-der' });
      const ms = h('div', { class: 'seg seg-mini', role: 'group', 'aria-label': 'Tipo de explicación' });
      [[true, 'Explicación sencilla'], [false, 'Técnica']].forEach(([v, t]) => {
        const b = h('button', { type: 'button', class: 'seg-b' + (modoSimple === v ? ' on' : ''), 'aria-pressed': modoSimple === v }, t);
        b.onclick = () => { modoSimple = v; try { localStorage.setItem('aula503.simple', v ? '1' : '0'); } catch (e) { /* nada */ } pintarBarra(); verPanel(); repintarLog(); };
        ms.appendChild(b);
      });
      der.appendChild(ms);
      const pp = h('label', { class: 'switchito' }, '<input type="checkbox" ' + (pasoAPaso ? 'checked' : '') + '> <span>Paso a paso</span>');
      pp.querySelector('input').onchange = e => { pasoAPaso = e.target.checked; };
      const vel = h('button', { type: 'button', class: 'chip', title: 'Velocidad de la animación' }, velocidad === 1 ? 'Velocidad 1×' : velocidad === 2 ? 'Velocidad 2×' : 'Velocidad ½×');
      vel.onclick = () => { velocidad = velocidad === 1 ? 2 : velocidad === 2 ? 0.5 : 1; pintarBarra(); };
      der.append(pp, vel);
      barra.appendChild(der);
    }

    /* ----- Coordenadas ----- */
    function puntoSvg(ev) {
      const pt = svg.createSVGPoint();
      pt.x = ev.clientX; pt.y = ev.clientY;
      const m = svg.getScreenCTM();
      return m ? pt.matrixTransform(m.inverse()) : { x: 0, y: 0 };
    }

    /* ----- Dibujo ----- */
    function ipVisible(d) {
      if (d.tipo === 'switch') return d.svi.ip && d.svi.up ? d.svi.ip : '';
      if (d.tipo === 'router') return d.ifaces.filter(f => f.ip).map(f => f.ip).join(' · ');
      return d.ifaces[0].ip;
    }
    function pintar() {
      capaLinks.innerHTML = '';
      capaDevs.innerHTML = '';
      red.links.forEach(l => {
        const a = red.dev(l.a), b = red.dev(l.b);
        const fa = a.ifaces.find(f => f.n === l.pa), fb = b.ifaces.find(f => f.n === l.pb);
        const g = s('g', { class: 'enlace' + (herramienta === 'borrar' ? ' borrable' : '') });
        const ln = s('line', { x1: a.x, y1: a.y, x2: b.x, y2: b.y, class: 'cable' + (a.icono === 'ap' || b.icono === 'ap' ? ' inalambrico' : '') });
        const hit = s('line', { x1: a.x, y1: a.y, x2: b.x, y2: b.y, class: 'cable-hit' });
        g.append(ln, hit);
        const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy) || 1;
        const ux = dx / len, uy = dy / len;
        const ends = [[a, fa, 1], [b, fb, -1]];
        ends.forEach(([d, f, sg]) => {
          // el LED va justo fuera de la caja del equipo (abajo deja lugar al nombre y la IP)
          const vx = ux * sg, vy = uy * sg;
          const hw = 50, hh = vy > 0 ? 80 : 42;
          const off = Math.min(Math.abs(vx) > 0.01 ? hw / Math.abs(vx) : 1e9, Math.abs(vy) > 0.01 ? hh / Math.abs(vy) : 1e9) + 4;
          const px = d.x + vx * off, py = d.y + vy * off;
          const apagado = f.apagado;
          g.appendChild(s('circle', { cx: px, cy: py, r: 4.5, class: 'led ' + (apagado ? 'led-apagado' : 'led-ok') }));
          const vertical = Math.abs(vy) > 0.7;
          const t = s('text', { x: px + (vertical ? 24 : vx * 16), y: py + (vertical ? vy * 12 + 4 : -9), class: 'puerto-txt', 'text-anchor': 'middle' });
          t.textContent = f.n;
          g.appendChild(t);
        });
        hit.addEventListener('click', ev => {
          ev.stopPropagation();
          if (herramienta === 'borrar' && !(a.fijo && b.fijo && o.cablesFijos)) { red.desconectar(l.id); pintar(); verPanel(); o.alCambiar({ tipo: 'desconectar' }); }
        });
        capaLinks.appendChild(g);
      });
      red.devs.forEach(d => {
        const g = s('g', { class: 'equipo' + (seleccion === d.id ? ' sel' : '') + (cableDesde === d.id ? ' origen' : ''), transform: 'translate(' + d.x + ' ' + d.y + ')', tabindex: 0, role: 'button', 'aria-label': ETIQUETA[tipoVisible(d)] + ' ' + d.nombre });
        g.appendChild(s('rect', { x: -44, y: -36, width: 88, height: 72, rx: 14, class: 'equipo-fondo' }));
        g.appendChild(icono(tipoVisible(d)));
        const n = s('text', { x: 0, y: 52, class: 'equipo-nombre', 'text-anchor': 'middle' });
        n.textContent = d.tipo === 'switch' ? d.cfg.hostname === 'Switch' ? d.nombre : d.cfg.hostname : d.nombre;
        g.appendChild(n);
        const ip = ipVisible(d);
        const t = s('text', { x: 0, y: 67, class: 'equipo-ip' + (ip ? '' : ' vacia'), 'text-anchor': 'middle' });
        t.textContent = ip || (d.tipo === 'switch' ? '' : 'sin IP');
        g.appendChild(t);
        conectarEventos(g, d);
        capaDevs.appendChild(g);
      });
    }

    function conectarEventos(g, d) {
      let arrastre = null;
      g.addEventListener('pointerdown', ev => {
        if (animando && herramienta !== 'mover') return;
        if (herramienta === 'mover' && !d.fijo) {
          const p = puntoSvg(ev);
          arrastre = { dx: d.x - p.x, dy: d.y - p.y, movio: false };
          try { g.setPointerCapture(ev.pointerId); } catch (e) { /* puntero sintético */ }
        }
      });
      g.addEventListener('pointermove', ev => {
        if (!arrastre) return;
        const p = puntoSvg(ev);
        const nx = Math.max(vb.x + 50, Math.min(vb.x + vb.w - 50, p.x + arrastre.dx)), ny = Math.max(vb.y + 45, Math.min(vb.y + vb.h - 70, p.y + arrastre.dy));
        if (Math.abs(nx - d.x) + Math.abs(ny - d.y) > 2) arrastre.movio = true;
        d.x = nx; d.y = ny;
        pintar();
      });
      g.addEventListener('pointerup', () => {
        if (arrastre && arrastre.movio) { arrastre = null; o.alCambiar({ tipo: 'mover' }); return; }
        arrastre = null;
        tocar(d);
      });
      g.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); tocar(d); } });
    }

    function tocar(d) {
      if (herramienta === 'cable') {
        if (!cableDesde) { cableDesde = d.id; decir('Ahora toca el otro equipo que quieres conectar a <b>' + esc(d.nombre) + '</b>.'); pintar(); return; }
        if (cableDesde === d.id) { cableDesde = null; capaGuia.innerHTML = ''; pintar(); return; }
        const r = red.conectar(cableDesde, d.id);
        if (typeof r === 'string') decir(esc(r), 'error');
        else {
          const a = red.dev(r.a), b = red.dev(r.b);
          decir('Cable conectado: <b>' + esc(a.nombre) + '</b> (' + r.pa + ') ↔ <b>' + esc(b.nombre) + '</b> (' + r.pb + '). Las luces verdes indican que hay enlace.', 'ok');
          o.alCambiar({ tipo: 'conectar', a: r.a, b: r.b });
        }
        cableDesde = null; capaGuia.innerHTML = '';
        pintar();
        return;
      }
      if (herramienta === 'borrar') {
        if (d.fijo) { decir(esc(d.nombre) + ' es parte de esta misión y no se puede borrar.', 'error'); return; }
        red.quitar(d.id); if (seleccion === d.id) seleccion = null;
        pintar(); verPanel(); o.alCambiar({ tipo: 'quitar' });
        return;
      }
      seleccion = d.id;
      pintar();
      verPanel();
      o.alCambiar({ tipo: 'seleccion', dev: d.id });
    }

    svg.addEventListener('pointermove', ev => {
      if (herramienta !== 'cable' || !cableDesde) return;
      const a = red.dev(cableDesde); const p = puntoSvg(ev);
      capaGuia.innerHTML = '';
      capaGuia.appendChild(s('line', { x1: a.x, y1: a.y, x2: p.x, y2: p.y, class: 'cable-guia' }));
    });
    svg.addEventListener('click', ev => { if (ev.target === svg || ev.target.parentNode === capaGrid) { if (herramienta === 'mover') { seleccion = null; pintar(); verPanel(); } } });

    function decir(html, tipo) {
      narrador.className = 'sim-narrador' + (tipo ? ' ' + tipo : '');
      narrador.innerHTML = '<span class="sim-narr-ico">●</span><span>' + html + '</span>';
    }

    /* ----- Panel del equipo ----- */
    function campo(id, etiqueta, valor, ayuda, ph) {
      return '<label class="campo" for="' + id + '"><span>' + etiqueta + (ayuda ? ' <i class="ayuda" title="' + esc(ayuda) + '">?</i>' : '') + '</span><input id="' + id + '" class="mono" value="' + esc(valor) + '" placeholder="' + esc(ph || '') + '" autocomplete="off" spellcheck="false"' + (o.editable ? '' : ' readonly') + '></label>';
    }
    const nombreIp = ip => { const x = red.buscarPorIp(ip); return x ? x.nombre : ''; };
    const nombreMac = mac => { const x = red.devs.find(z => z.mac === mac || z.ifaces.some(f => f.mac === mac)); return x ? x.nombre : ''; };
    function tablaArp(d) {
      const k = Object.keys(d.arp);
      return '<div class="mini-tabla"><div class="mt-tit">' + (modoSimple ? 'Agenda de gafetes ' : 'Tabla ARP ') + T('tablaArp', '?') + '</div>' +
        (k.length ? k.map(ip => modoSimple
          ? '<div class="mt-fila"><span>Ya conoce el gafete de <b>' + esc(nombreIp(ip) || ip) + '</b></span><span class="mono">' + d.arp[ip].slice(-8) + '</span></div>'
          : '<div class="mt-fila mono"><span>' + ip + '</span><span>' + d.arp[ip] + '</span></div>').join('')
          : '<div class="mt-vacia">Vacía. ' + (modoSimple ? 'Aquí apunta el gafete (MAC) de cada equipo al que ya le preguntó.' : 'Se llena cuando el equipo usa ARP.') + '</div>') + '</div>';
    }
    function verPanel() {
      panel.innerHTML = '';
      const d = seleccion && red.dev(seleccion);
      if (!d) {
        panel.innerHTML = '<div class="panel-vacio"><b>Toca un equipo</b><p>Verás qué es, su dirección y desde ahí puedes mandar mensajes.</p>' + leyenda() + '</div>';
        return;
      }
      const cab = h('div', { class: 'panel-cab' });
      cab.innerHTML = '<div class="panel-tipo">' + ETIQUETA[tipoVisible(d)] + '</div><div class="panel-nombre">' + esc(d.tipo === 'switch' && d.cfg.hostname !== 'Switch' ? d.cfg.hostname : d.nombre) + '</div><p class="panel-desc">' + (d.nota ? d.nota + ' ' : '') + DESCRIP[tipoVisible(d)] + '</p>';
      panel.appendChild(cab);
      if (NetSim.esHost(d)) panelHost(d);
      else if (d.tipo === 'switch') panelSwitch(d);
      else panelRouter(d);
    }
    function leyenda() {
      return '<div class="leyenda"><div class="ley-tit">Colores de los sobres</div>' +
        '<div><span class="pq-muestra arp"></span> Amarillo: pregunta «¿quién tiene esta dirección?» (' + T('arp', 'ARP') + ')</div>' +
        '<div><span class="pq-muestra icmp"></span> Azul: «¿me escuchas?» (' + T('ping', 'ping') + ' de ida)</div>' +
        '<div><span class="pq-muestra reply"></span> Verde: «¡sí te escucho!» (respuesta)</div>' +
        '<p class="nota-chica">Toca un sobre mientras viaja para ver qué lleva adentro.</p></div>';
    }
    function panelHost(d) {
      const f = d.ifaces[0];
      const box = h('div', { class: 'panel-sec' });
      box.innerHTML = campo('ip-' + d.id, 'Su dirección ' + T('ip', '(IP)'), f.ip, '', '192.168.1.10') +
        '<div class="ip-anat-box">' + (anatomia(f.ip, f.mask) || '<small class="malo">Sin dirección no puede mandar ni recibir mensajes.</small>') + '</div>' +
        campo('mask-' + d.id, 'Máscara ' + T('mascara', '?'), f.mask, '', '255.255.255.0') +
        campo('gw-' + d.id, 'Puerta de salida ' + T('gateway', '(gateway)'), d.gw, '', '192.168.1.1') +
        '<div class="dato"><span>Gafete ' + T('mac', '(MAC)') + '</span><b class="mono">' + f.mac + '</b></div>' +
        '<div class="dato"><span>Cable</span><b>' + (f.link ? 'conectado a ' + esc(red.otroExtremo(d, f).dev.nombre) : '<span class="malo">sin cable</span>') + '</b></div>';
      panel.appendChild(box);
      if (o.editable) {
        const ip = box.querySelector('#ip-' + d.id), mk = box.querySelector('#mask-' + d.id), gw = box.querySelector('#gw-' + d.id);
        const aplicar = () => {
          f.ip = ip.value.trim(); f.mask = mk.value.trim(); d.gw = gw.value.trim();
          if (f.ip && !mk.value.trim() && NetSim.ipValida(f.ip)) { f.mask = '255.255.255.0'; mk.value = f.mask; }
          [ip, gw].forEach(x => x.classList.toggle('mal', !!x.value.trim() && !NetSim.ipValida(x.value.trim())));
          const an = box.querySelector('.ip-anat-box');
          if (an) an.innerHTML = anatomia(f.ip, f.mask) || (f.ip ? '<small class="malo">Así no es una dirección válida: son 4 números del 0 al 255 con puntos.</small>' : '<small class="malo">Sin dirección no puede mandar ni recibir mensajes.</small>');
          mk.classList.toggle('mal', !!mk.value.trim() && !NetSim.mascaraValida(mk.value.trim()));
          d.arp = {};
          pintar();
          o.alCambiar({ tipo: 'config', dev: d.id });
        };
        [ip, mk, gw].forEach(x => x.addEventListener('change', aplicar));
      }
      panel.appendChild(cajaPing(d));
      const arp = h('div', { class: 'panel-sec' }, tablaArp(d));
      panel.appendChild(arp);
    }
    function cajaPing(d) {
      const destinos = [];
      red.devs.forEach(x => { if (x !== d) red.ipsDe(x).forEach(ip => destinos.push([ip, x.nombre])); });
      const box = h('div', { class: 'panel-sec ping-box' });
      box.innerHTML = '<div class="ping-tit">Mandar un ' + T('ping', 'ping') + ' («¿me escuchas?») a…</div>' +
        '<div class="ping-fila"><input class="mono" list="dl-' + d.id + '" id="pd-' + d.id + '" placeholder="IP de destino" value="' + esc(destinos[0] ? destinos[0][0] : '') + '" autocomplete="off"><datalist id="dl-' + d.id + '">' + destinos.map(x => '<option value="' + x[0] + '">' + esc(x[1]) + '</option>').join('') + '</datalist>' +
        '<button type="button" class="btn btn-primario">Enviar</button></div>' +
        (destinos.length ? '<div class="ping-sug">' + destinos.slice(0, 8).map(x => '<button type="button" class="chip mini" data-ip="' + x[0] + '">' + esc(x[1]) + (destinos.filter(y => y[1] === x[1]).length > 1 ? ' · ' + x[0] : '') + '</button>').join('') + '</div>' : '');
      const input = box.querySelector('input');
      box.querySelectorAll('[data-ip]').forEach(b => b.onclick = () => { input.value = b.dataset.ip; });
      box.querySelector('.btn').onclick = () => lanzarPing(d.id, input.value.trim());
      return box;
    }
    function panelSwitch(d) {
      const box = h('div', { class: 'panel-sec' });
      const filas = Object.keys(d.tablaMac);
      box.innerHTML = '<div class="mini-tabla"><div class="mt-tit">' + (modoSimple ? 'Su libreta ' : 'Tabla de direcciones MAC ') + T('tablaMac', '?') + '</div>' +
        (filas.length ? filas.map(m => modoSimple
          ? '<div class="mt-fila"><span><b>' + esc(nombreMac(m) || m) + '</b> está en el puerto</span><span class="mono">' + d.tablaMac[m] + '</span></div>'
          : '<div class="mt-fila mono"><span>' + m + '</span><span>' + d.tablaMac[m] + '</span></div>').join('') : '<div class="mt-vacia">Vacía. ' + (modoSimple ? 'Cuando pasen mensajes, apuntará en qué puerto está cada equipo.' : 'El switch aprende cuando pasan tramas por él.') + '</div>') + '</div>' +
        '<div class="dato"><span>Su IP ' + T('svi', '?') + '</span><b class="mono">' + (d.svi.ip ? d.svi.ip + (d.svi.up ? '' : ' (apagada)') : 'ninguna') + '</b></div>' +
        '<div class="dato"><span>Puertos usados</span><b>' + d.ifaces.filter(f => f.link).map(f => { const x = red.otroExtremo(d, f); return f.n + '→' + esc(x.dev.nombre); }).join(', ') + '</b></div>';
      panel.appendChild(box);
      const bt = h('div', { class: 'panel-sec acciones' });
      if (o.consola && !d.icono) {
        const b = h('button', { type: 'button', class: 'btn btn-primario' }, 'Abrir consola (CLI)');
        b.onclick = () => abrirConsola(d);
        bt.appendChild(b);
      }
      const lim = h('button', { type: 'button', class: 'btn' }, 'Borrar su tabla MAC');
      lim.onclick = () => { d.tablaMac = {}; verPanel(); };
      bt.appendChild(lim);
      panel.appendChild(bt);
      if (d.svi.ip && d.svi.up) panel.appendChild(cajaPing(d));
    }
    function panelRouter(d) {
      const box = h('div', { class: 'panel-sec' });
      box.innerHTML = '<p class="nota-chica">Cada interfaz del router pertenece a una red distinta. Escribe la IP que tendrá el router en cada red; esa IP será la puerta de enlace de las PC de esa red.</p>' +
        d.ifaces.map(f => {
          const otro = f.link ? red.otroExtremo(d, f).dev.nombre : null;
          return '<fieldset class="iface"><legend>' + f.n + (otro ? ' → ' + esc(otro) : ' <span class="malo">sin cable</span>') + '</legend>' + campo('rip-' + d.id + f.n, 'IP', f.ip, '', '192.168.1.1') + campo('rmk-' + d.id + f.n, 'Máscara', f.mask, '', '255.255.255.0') + '</fieldset>';
        }).join('');
      panel.appendChild(box);
      if (o.editable) d.ifaces.forEach(f => {
        const ip = box.querySelector('[id="rip-' + d.id + f.n + '"]'), mk = box.querySelector('[id="rmk-' + d.id + f.n + '"]');
        const aplicar = () => { f.ip = ip.value.trim(); f.mask = mk.value.trim() || (f.ip ? '255.255.255.0' : ''); mk.value = f.mask; d.arp = {}; pintar(); o.alCambiar({ tipo: 'config', dev: d.id }); };
        ip.addEventListener('change', aplicar); mk.addEventListener('change', aplicar);
      });
      panel.appendChild(h('div', { class: 'panel-sec' }, tablaArp(d)));
      panel.appendChild(cajaPing(d));
    }

    /* ----- Consola del switch ----- */
    function abrirConsola(d) {
      if (!consolas[d.id]) consolas[d.id] = new root.Consola(d, red, () => { pintar(); o.alCambiar({ tipo: 'cli', dev: d.id, registro: consolas[d.id].registro, cfg: d.cfg }); });
      const k = consolas[d.id];
      const term = h('div', { class: 'terminal', role: 'dialog', 'aria-label': 'Consola de ' + d.nombre });
      term.innerHTML = '<div class="term-cab"><span>Consola · ' + esc(d.nombre) + '</span><button type="button" class="term-cerrar" aria-label="Cerrar consola">Cerrar</button></div><pre class="term-salida"></pre><div class="term-linea"><span class="term-prompt"></span><input class="term-in" aria-label="Comando" autocomplete="off" autocapitalize="off" spellcheck="false"></div><div class="term-ayuda">Escribe <b>?</b> para ver los comandos disponibles. Puedes abreviar: <code>en</code>, <code>conf t</code>, <code>sh run</code>.</div>';
      const out = term.querySelector('.term-salida'), inp = term.querySelector('.term-in'), pr = term.querySelector('.term-prompt');
      const escribir = lineas => { lineas.forEach(l => { out.textContent += l + '\n'; }); out.scrollTop = out.scrollHeight; };
      if (!k.iniciada) { k.iniciada = true; escribir(['', 'Press RETURN to get started.', '']); k.esperando = 'return'; }
      else escribir(k.textoPrevio || []);
      const refrescar = () => { pr.textContent = k.prompt(); inp.type = k.esperando === 'login' || k.esperando === 'enable' ? 'password' : 'text'; };
      refrescar();
      let hi = -1;
      inp.addEventListener('keydown', ev => {
        if (ev.key === 'Enter') {
          const v = inp.value;
          const mostrado = (k.esperando === 'login' || k.esperando === 'enable') ? '' : v;
          out.textContent += k.prompt() + mostrado + '\n';
          escribir(k.ejecutar(v));
          inp.value = ''; hi = -1;
          refrescar();
          k.textoPrevio = out.textContent.split('\n').slice(-60);
          o.alCambiar({ tipo: 'cli', dev: d.id, registro: k.registro, cfg: d.cfg, linea: v });
        } else if (ev.key === 'ArrowUp') {
          if (k.historial.length) { hi = hi < 0 ? k.historial.length - 1 : Math.max(0, hi - 1); inp.value = k.historial[hi]; ev.preventDefault(); }
        } else if (ev.key === 'ArrowDown') {
          if (hi >= 0) { hi++; inp.value = hi < k.historial.length ? k.historial[hi] : ''; if (hi >= k.historial.length) hi = -1; ev.preventDefault(); }
        }
      });
      term.querySelector('.term-cerrar').onclick = () => { term.remove(); verPanel(); };
      term.addEventListener('click', () => inp.focus());
      panel.innerHTML = '';
      panel.appendChild(term);
      setTimeout(() => inp.focus(), 30);
    }

    /* ----- Ping animado ----- */
    function posPaquete(t) {
      const a = red.dev(t.de), b = red.dev(t.a);
      return { ax: a.x, ay: a.y, bx: b.x, by: b.y };
    }
    function clasePaquete(tr) { return tr.tipo === 'ARP' ? 'arp' : tr.ip.icmp === 'reply' ? 'reply' : 'icmp'; }

    async function lanzarPing(origenId, ip) {
      if (animando) return;
      if (!ip) { decir('Escribe la IP del equipo al que quieres enviar el ping.', 'error'); return; }
      const tablasAntes = {};
      red.devs.forEach(d => { tablasAntes[d.id] = { arp: Object.assign({}, d.arp), mac: Object.assign({}, d.tablaMac) }; });
      const ponerTablas = t => red.devs.forEach(d => { if (t[d.id]) { d.arp = Object.assign({}, t[d.id].arp); d.tablaMac = Object.assign({}, t[d.id].mac); } });
      const res = red.ping(origenId, ip);
      const tablasDespues = res.pasos.length ? res.pasos[res.pasos.length - 1].tablas : null;
      if (tablasDespues) ponerTablas(tablasAntes);
      if (!res.pasos.length) { decir(esc(res.fallo), 'error'); o.alCambiar({ tipo: 'ping', res }); return; }
      if (seleccion !== origenId) { seleccion = origenId; verPanel(); }
      animando = true; saltar = false;
      log.innerHTML = ''; notasLog = [];
      registroBox.open = false;
      const mostrarSaltar = () => {
        controlesAnim.hidden = false;
        controlesAnim.innerHTML = '';
        const b = h('button', { type: 'button', class: 'btn' }, 'Saltar animación');
        b.onclick = () => { saltar = true; controlesAnim.hidden = true; };
        controlesAnim.appendChild(b);
      };
      if (!pasoAPaso) mostrarSaltar();
      for (let i = 0; i < res.pasos.length; i++) {
        const paso = res.pasos[i];
        if (paso.tx.length && !saltar) await animarTx(paso.tx);
        if (paso.tablas) ponerTablas(paso.tablas);
        paso.notas.forEach(n => { notasLog.push(n); log.appendChild(lineaLog(n)); });
        const importantes = paso.notas.filter(n => n.tipo !== 'ignora');
        const mostrar = importantes.length ? importantes : paso.notas;
        if (mostrar.length) decir(mostrar.map(n => esc(modoSimple ? n.simple : n.texto)).join('<br>'), mostrar.some(n => n.tipo === 'error') ? 'error' : mostrar.some(n => n.tipo === 'ok') ? 'ok' : null);
        pintar(); if (seleccion) refrescarTablas();
        if (saltar) continue;
        if (pasoAPaso && i < res.pasos.length - 1) { await esperarSiguiente(); if (!pasoAPaso && !saltar) mostrarSaltar(); }
        else await sleep((reduceMotion() ? 200 : 600) / velocidad);
      }
      if (tablasDespues) ponerTablas(tablasDespues);
      animando = false;
      controlesAnim.hidden = true;
      const dest = nombreIp(ip) || ip;
      if (res.ok) decir('<b>¡Funcionó!</b> ' + esc(red.dev(origenId).nombre) + ' y ' + esc(dest) + ' se pueden comunicar. Abre la bitácora de abajo para repasar cada paso.', 'ok');
      else decir('<b>No llegó.</b> ' + esc(modoSimple ? res.falloSimple || res.fallo : res.fallo), 'error');
      o.alCambiar({ tipo: 'ping', res });
    }
    function refrescarTablas() {
      const d = red.dev(seleccion);
      if (!d || panel.querySelector('.terminal')) return;
      const sec = panel.querySelectorAll('.mini-tabla');
      if (!sec.length) return;
      if (d.tipo === 'switch') { verPanel(); return; }
      sec[sec.length - 1].outerHTML = tablaArp(d);
    }
    function esperarSiguiente() {
      controlesAnim.hidden = false;
      controlesAnim.innerHTML = '';
      const b = h('button', { type: 'button', class: 'btn btn-primario' }, 'Siguiente paso →');
      const t = h('button', { type: 'button', class: 'btn' }, 'Ver todo seguido');
      controlesAnim.append(b, t);
      setTimeout(() => b.focus(), 20);
      return new Promise(r => { b.onclick = () => { controlesAnim.hidden = true; r(); }; t.onclick = () => { pasoAPaso = false; pintarBarra(); controlesAnim.hidden = true; r(); }; });
    }
    function animarTx(txs) {
      return new Promise(resolve => {
        const dur = (reduceMotion() ? 250 : 800) / velocidad;
        const paquetes = txs.map(t => {
          const g = s('g', { class: 'paquete ' + clasePaquete(t.trama), tabindex: 0, role: 'button', 'aria-label': 'Ver el contenido de esta trama' });
          g.appendChild(s('rect', { x: -15, y: -10, width: 30, height: 20, rx: 4 }));
          g.appendChild(s('path', { d: 'M-15 -9 L0 2 L15 -9', class: 'sobre' }));
          const ver = ev => { ev.stopPropagation(); abrirInspector(t.trama, t); };
          g.addEventListener('click', ver);
          g.addEventListener('keydown', ev => { if (ev.key === 'Enter') ver(ev); });
          capaPaquetes.appendChild(g);
          return { g, p: posPaquete(t) };
        });
        const t0 = performance.now();
        let acumuladoPausa = 0, inicioPausa = null, listo = false;
        const terminar = () => { if (listo) return; listo = true; paquetes.forEach(x => x.g.remove()); resolve(); };
        // Si la pestaña está oculta, el navegador detiene la animación: no dejamos la red «congelada»
        let guardia = setTimeout(function revisar() { if (pausado) { guardia = setTimeout(revisar, 500); return; } terminar(); }, dur * 2 + 800);
        function cuadro(now) {
          if (listo) return;
          if (saltar) { clearTimeout(guardia); terminar(); return; }
          if (pausado) { if (inicioPausa === null) inicioPausa = now; requestAnimationFrame(cuadro); return; }
          if (inicioPausa !== null) { acumuladoPausa += now - inicioPausa; inicioPausa = null; }
          const k = Math.min(1, (now - t0 - acumuladoPausa) / dur);
          const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
          paquetes.forEach(({ g, p }) => g.setAttribute('transform', 'translate(' + (p.ax + (p.bx - p.ax) * e) + ' ' + (p.ay + (p.by - p.ay) * e) + ')'));
          if (k < 1) requestAnimationFrame(cuadro);
          else { clearTimeout(guardia); terminar(); }
        }
        requestAnimationFrame(cuadro);
      });
    }

    /* ----- Inspector de tramas (como un Wireshark muy simple) ----- */
    function abrirInspector(tr, t) {
      pausado = true;
      tramaVista = tr;
      const de = red.dev(t.de), a = red.dev(t.a);
      const caja = h('div', { class: 'inspector', role: 'dialog', 'aria-label': 'Contenido de la trama' });
      let interior;
      const deQ = (nombre, num) => '<b>' + esc(nombre || '?') + '</b><small class="mono">' + num + '</small>';
      const macQ = mac => mac === NetSim.BROADCAST ? '<b>¡Todos!</b><small class="mono">' + mac + '</small>' : deQ(nombreMac(mac), mac);
      const ipQ = ip => deQ(nombreIp(ip), ip);
      if (tr.tipo === 'ARP') {
        interior = '<div class="capa capa3 arp"><div class="capa-tit">Lo que dice adentro <small>' + T('arp', 'ARP') + '</small></div>' +
          (tr.arp.op === 'request' ? '<p>«¿Quién tiene la dirección <b class="mono">' + tr.arp.ipBuscada + '</b>? Contéstale a <b>' + esc(nombreIp(tr.arp.ipEmisor)) + '</b>»</p><p class="nota-chica">(Esa dirección es de ' + esc(nombreIp(tr.arp.ipBuscada) || 'nadie') + ').</p>' : '<p>«Yo tengo la dirección <b class="mono">' + tr.arp.ipEmisor + '</b>. Soy <b>' + esc(nombreIp(tr.arp.ipEmisor)) + '</b> y este es mi gafete (MAC): <b class="mono">' + tr.arp.macEmisor + '</b>»</p>') + '</div>';
      } else {
        interior = '<div class="capa capa3"><div class="capa-tit">Sobre de adentro <small>' + T('paquete', 'paquete IP') + ' · nunca cambia</small></div>' +
          '<div class="campos"><div><span>De (origen final)</span>' + ipQ(tr.ip.src) + '</div><div><span>Para (destino final)</span>' + ipQ(tr.ip.dst) + '</div><div><span>Vidas ' + T('ttl', '(TTL)') + '</span><b class="mono">' + tr.ip.ttl + '</b></div></div>' +
          '<div class="capa capa4"><div class="capa-tit">El mensaje</div><p>' + (tr.ip.icmp === 'request' ? '«¿Me escuchas?» (ping de ida)' : '«¡Sí, te escucho!» (respuesta del ping)') + '</p></div></div>';
      }
      caja.innerHTML = '<div class="insp-cab"><b>¿Qué lleva este sobre?</b><button type="button" class="btn">Seguir</button></div>' +
        '<p class="insp-ruta">Viaja por el cable de <b>' + esc(de.nombre) + '</b> a <b>' + esc(a.nombre) + '</b></p>' +
        '<div class="capa capa2"><div class="capa-tit">Sobre de afuera <small>' + T('trama', 'trama Ethernet') + ' · se cambia en cada router</small></div>' +
        '<div class="campos"><div><span>Para (gafete MAC)</span>' + macQ(tr.dst) + '</div><div><span>De (gafete MAC)</span>' + macQ(tr.src) + '</div></div>' + interior + '</div>' +
        '<p class="insp-nota">Fíjate: el sobre de afuera dice a quién se entrega <b>en este tramo</b>; el de adentro dice el <b>destino final</b>. Por eso es «un sobre dentro de otro» (' + T('encapsular', 'encapsulamiento') + ').</p>';
      caja.querySelector('.btn').onclick = () => { caja.remove(); pausado = false; };
      lienzoWrap.appendChild(caja);
      o.alCambiar({ tipo: 'inspeccion', trama: tr });
    }

    pintarBarra();
    encuadrar();
    pintar();
    verPanel();
    return {
      el, red,
      repintar: () => { pintar(); verPanel(); },
      seleccionar: id => { seleccion = id; pintar(); verPanel(); },
      decir,
      ping: lanzarPing,
      consola: id => { const d = red.dev(id); if (d) { seleccion = id; pintar(); abrirConsola(d); } },
      ocupado: () => animando
    };
  }

  root.NetView = NetView;
})(window);
