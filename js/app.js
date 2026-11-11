/* Aula 503 — la aplicación: camino, lecciones, laboratorio, tareas y lecturas. */
(function () {
  'use strict';
  const A = window.AULA || { materias: [] };
  const CURSOS = window.CAMINO.cursos;
  const PF = window.Plataforma || null;                 // js/plataforma.js (no existe en la página suelta del artefacto)
  const EN_ARTEFACTO = !!(window.claude && window.claude.use);
  // Vistas que agregan los módulos: AULA_VISTAS.push({ id, titulo, icono, lugar: 'tabs' | 'cabecera', pintar(v, arg, Aula) })
  const VISTAS = window.AULA_VISTAS = window.AULA_VISTAS || [];
  const $ = (q, r = document) => r.querySelector(q);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const h = (tag, attrs, html) => { const e = document.createElement(tag); if (attrs) Object.keys(attrs).forEach(k => k === 'class' ? (e.className = attrs[k]) : e.setAttribute(k, attrs[k])); if (html != null) e.innerHTML = html; return e; };
  const barajar = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  /* ---------- Íconos ---------- */
  const I = {
    camino: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.5 19H15a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h6.5"/></svg>',
    lab: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="5" rx="1"/><rect x="2" y="17" width="6" height="5" rx="1"/><rect x="16" y="17" width="6" height="5" rx="1"/><path d="M12 7v5M5 17v-3h14v3"/></svg>',
    tareas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 11l2 2 4-4M9 17h6"/></svg>',
    libro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 21.5A2.5 2.5 0 0 1 6.5 19H20v3H6.5"/></svg>',
    agenda: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4M8 14h2M14 14h2M8 17.5h2"/></svg>',
    fuego: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c1 3.2-1.2 4.6-2.6 6.5C8 10.4 7 12 7 14.3A5 5 0 0 0 12 19.5a5 5 0 0 0 5-5.2c0-2.3-1.2-4-2.2-5.3.1 1.6-.6 2.7-1.6 3.1.5-3.3-.1-7.6-1.2-10.1z"/></svg>',
    rayo: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
    candado: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
    estrella: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z"/></svg>',
    jugar: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l10.5-6.5z"/></svg>',
    cerrar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    red: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="5" rx="1"/><rect x="14" y="16" width="7" height="5" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/><path d="M6.5 8v8M10 18.5h4M6.5 12h11v4"/></svg>',
    cerebro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="7" r="2"/><circle cx="5" cy="17" r="2"/><circle cx="12" cy="12" r="2.4"/><circle cx="19" cy="7" r="2"/><circle cx="19" cy="17" r="2"/><path d="M7 7.8l3 2.8M7 16.2l3-2.8M14.2 11l3-2.6M14.2 13l3 2.6"/></svg>',
    idioma: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11H9l-5 4z"/><path d="M9 13l3-6 3 6M10 11h4"/></svg>',
    escuela: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V10l7-5 7 5v11"/><path d="M9 21v-5h6v5M10 11h4"/></svg>',
    codigo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 8h18M9.5 12.5 7 15l2.5 2.5M14.5 12.5 17 15l-2.5 2.5"/></svg>',
    trofeo: '<svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="56" fill="var(--amber-soft)"/><path d="M38 30h44v14a22 22 0 0 1-44 0z" fill="var(--amber)"/><path d="M38 34H26a10 10 0 0 0 12 14M82 34h12a10 10 0 0 1-12 14" fill="none" stroke="var(--amber)" stroke-width="5"/><rect x="54" y="64" width="12" height="14" fill="var(--amber)"/><rect x="42" y="78" width="36" height="10" rx="3" fill="var(--fg)"/><path d="m60 36 3 6 6.5 1-4.8 4.5 1.2 6.5L60 51l-5.9 3 1.2-6.5-4.8-4.5 6.5-1z" fill="var(--surface)"/></svg>'
  };

  /* ---------- Markdown muy sencillo (para lecturas y tareas) ---------- */
  const inline = s => s.replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?![\w*])/g, '$1<em>$2</em>')
    .replace(/https?:\/\/[^\s<)\]]+/g, u => '<a href="' + u + '" target="_blank" rel="noopener">' + u.replace(/^https?:\/\//, '').split('/')[0] + ' ↗</a>');
  function md(src) {
    const L = String(src || '').replace(/\r/g, '').split('\n'), out = [];
    let i = 0;
    const fila = l => /^\s*\|.*\|\s*$/.test(l), lista = /^\s*([-*]|\d+\.)\s+/;
    while (i < L.length) {
      const l = L[i];
      if (/^\s*(~~~|```)/.test(l)) { const f = l.trim().slice(0, 3); const b = []; i++; while (i < L.length && !L[i].trim().startsWith(f)) b.push(L[i++]); i++; out.push('<pre class="code"><code>' + esc(b.join('\n')) + '</code></pre>'); continue; }
      if (!l.trim()) { i++; continue; }
      const hm = l.match(/^#{1,4}\s+(.*)$/);
      if (hm) { out.push('<h3>' + inline(esc(hm[1])) + '</h3>'); i++; continue; }
      if (fila(l)) {
        const rows = []; while (i < L.length && fila(L[i])) rows.push(L[i++]);
        const cel = r => r.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());
        let head = cel(rows[0]), body = rows.slice(1);
        if (body.length && /^[\s|:-]+$/.test(body[0])) body = body.slice(1); else { head = null; body = rows; }
        out.push('<div class="tbl"><table>' + (head ? '<thead><tr>' + head.map(c => '<th>' + inline(esc(c)) + '</th>').join('') + '</tr></thead>' : '') + '<tbody>' + body.map(r => '<tr>' + cel(r).map(c => '<td>' + inline(esc(c)) + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>');
        continue;
      }
      if (/^>\s?/.test(l)) { const b = []; while (i < L.length && /^>\s?/.test(L[i])) b.push(L[i++].replace(/^>\s?/, '')); out.push('<aside class="nota">' + inline(esc(b.join(' '))) + '</aside>'); continue; }
      if (lista.test(l)) {
        const ord = /^\s*\d+\./.test(l);
        const items = [];
        while (i < L.length && (lista.test(L[i]) || (/^\s{2,}\S/.test(L[i]) && items.length))) {
          if (lista.test(L[i]) && !/^\s{2,}/.test(L[i])) items.push(L[i].replace(lista, ''));
          else items[items.length - 1] += '<br>' + L[i].trim().replace(lista, '• ');
          i++;
        }
        out.push((ord ? '<ol>' : '<ul>') + items.map(t => '<li>' + inline(esc(t)).replace(/&lt;br&gt;/g, '<br>') + '</li>').join('') + (ord ? '</ol>' : '</ul>'));
        continue;
      }
      const b = [];
      while (i < L.length && L[i].trim() && !/^(#{1,4}\s|\s*\||>|\s*([-*]|\d+\.)\s+|\s*(~~~|```))/.test(L[i])) b.push(L[i++].trim());
      if (!b.length) b.push(L[i++].trim());
      out.push('<p>' + inline(esc(b.join(' '))) + '</p>');
    }
    return out.join('');
  }

  /* ---------- Estado y guardado ---------- */
  const KEY = 'aula503.v2';
  const base = () => ({ v: 2, xp: 0, dias: {}, lecciones: {}, curso: 'redes', sandbox: null, tareasHechas: {}, meta: 30, retos: {}, ingles: {}, web: {}, mod: 0 });
  let S = base();
  const unir = d => { const b = base(); if (!d || typeof d !== 'object') return b; Object.keys(b).forEach(k => { if (d[k] !== undefined) b[k] = (b[k] && typeof b[k] === 'object' && !Array.isArray(b[k]) && d[k] && typeof d[k] === 'object') ? Object.assign({}, b[k], d[k]) : d[k]; }); return b; };
  try { const raw = localStorage.getItem(KEY); if (raw) S = unir(JSON.parse(raw)); else { const viejo = JSON.parse(localStorage.getItem('aula503.v1') || 'null'); if (viejo) { S.xp = viejo.xp || 0; S.dias = viejo.dias || {}; S.tareasHechas = viejo.tareasHechas || {}; } } } catch (e) { /* sin almacenamiento */ }

  const sync = { ref: null, t: null, escribiendo: false, pendiente: false };
  function guardar() {
    S.mod = Date.now();
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignorar */ }
    if (PF && !EN_ARTEFACTO) PF.alGuardar(() => S);     // copia diaria + sincronización
    if (!sync.ref) return;
    clearTimeout(sync.t);
    sync.t = setTimeout(escribir, 1200);
  }
  async function escribir() {
    if (sync.escribiendo) { sync.pendiente = true; return; }
    sync.escribiendo = true;
    try { await sync.ref.set(JSON.parse(JSON.stringify(S))); } catch (e) { /* se queda local */ }
    finally { sync.escribiendo = false; if (sync.pendiente) { sync.pendiente = false; escribir(); } }
  }
  function adoptar(nuevo) {
    S = unir(nuevo);
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignorar */ }
    if (!lec) render(); else pintarTabs();
  }
  async function conectar() {
    if (PF && !EN_ARTEFACTO) {
      // App instalada o navegador: el progreso vive en el dispositivo y la plataforma lo respalda y sincroniza
      PF.iniciar({ leer: () => S, adoptar });
      PF.on('actualizacion', pintarTabs);
      PF.tareas().then(lista => {
        TAREAS = (lista || []).filter(t => t.titulo && t.vence).sort((a, b) => a.vence < b.vence ? -1 : 1);
        estadoTareas = lista ? 'lista' : 'sin';
        pintarTabs();
        const r = ruta();
        if (!lec && (r.v === 'tareas' || r.v === 'aprender')) render();
      });
      try {
        const d = PF.respaldo.diasDesdeUltimo(), hoyK = hoy();
        if (S.xp > 0 && (d === null || d > 7) && localStorage.getItem('aula503.avisoRespaldo') !== hoyK) { localStorage.setItem('aula503.avisoRespaldo', hoyK); setTimeout(() => aviso('Guarda un respaldo de tu avance: Ajustes → Copia de seguridad.'), 2500); }
      } catch (e) { /* sin almacenamiento */ }
      if (PF.actualizaciones.hayNovedades()) { aviso('Aula 503 se actualizó a la versión ' + PF.version.version + '. Mira las novedades en Ajustes.'); PF.actualizaciones.marcarVisto(); }
      return;
    }
    if (!window.claude || !window.claude.use) return;
    try {
      const [db, user] = await Promise.all([window.claude.use('db'), window.claude.use('user')]);
      if (db) escucharTareas(db);
      if (!db || !user) return;
      const uid = await user.id();
      if (!uid) return;
      sync.ref = db.doc('data/users/' + uid + '/aula2');
      const snap = await sync.ref.get();
      if (snap.exists) {
        const remoto = unir(snap.data());
        if (Object.keys(remoto.lecciones).length >= Object.keys(S.lecciones).length && remoto.xp >= S.xp) S = remoto;
      } else {
        try { const v1 = await db.doc('data/users/' + uid + '/aula').get(); if (v1.exists) { const d = v1.data(); if ((d.xp || 0) > S.xp) S.xp = d.xp; S.dias = Object.assign({}, d.dias || {}, S.dias); S.tareasHechas = Object.assign({}, d.tareasHechas || {}, S.tareasHechas); } } catch (e) { /* sin datos viejos */ }
      }
      guardar();
      render();
    } catch (e) { /* modo local */ }
  }

  /* ---------- Tareas de Moodle (las escribe Claude en la colección «tareas») ---------- */
  let TAREAS = [], estadoTareas = 'cargando';
  function escucharTareas(db) {
    try {
      db.collection('tareas').onSnapshot(snap => {
        TAREAS = snap.docs.map(d => Object.assign({}, d.data(), { id: d.id })).filter(t => t.titulo && t.vence).sort((a, b) => a.vence < b.vence ? -1 : 1);
        estadoTareas = 'lista';
        pintarTabs();
        const r = ruta();
        if (r.v === 'tareas' || r.v === 'aprender') render();
      }, () => { estadoTareas = 'sin'; });
    } catch (e) { estadoTareas = 'sin'; }
  }
  setTimeout(() => { if (estadoTareas === 'cargando') { estadoTareas = 'sin'; if (ruta().v === 'tareas') render(); } }, 12000);

  /* ---------- Racha, XP, meta diaria ---------- */
  const iso = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const hoy = () => iso(new Date());
  const diaAntes = (s, n) => { const [y, m, d] = s.split('-').map(Number); return iso(new Date(y, m - 1, d - n)); };
  function racha() {
    let d = hoy();
    if (!S.dias[d]) d = diaAntes(d, 1);
    let n = 0;
    while (S.dias[d]) { n++; d = diaAntes(d, 1); }
    return n;
  }
  const xpHoy = () => S.dias[hoy()] || 0;
  function sumarXp(n) { S.xp += n; S.dias[hoy()] = xpHoy() + n; guardar(); }
  function anillo(pct, cls) {
    const r = 15, c = 2 * Math.PI * r;
    return '<svg class="anillo ' + (cls || '') + '" viewBox="0 0 36 36" aria-hidden="true"><circle class="fondo" cx="18" cy="18" r="' + r + '"/><circle class="valor" cx="18" cy="18" r="' + r + '" stroke-dasharray="' + c + '" stroke-dashoffset="' + (c * (1 - Math.min(1, pct))) + '"/></svg>';
  }

  /* ---------- Progreso del camino ---------- */
  const todas = curso => curso.unidades.flatMap(u => u.lecciones);
  const hecha = id => !!S.lecciones[id];
  function siguiente(curso) { return todas(curso).find(l => !hecha(l.id)); }
  function desbloqueada(curso, id) {
    const l = todas(curso);
    const i = l.findIndex(x => x.id === id);
    return i === 0 || hecha(id) || (i > 0 && hecha(l[i - 1].id));
  }
  function buscarLeccion(id) {
    for (const c of CURSOS) for (const u of c.unidades) for (const l of u.lecciones) if (l.id === id) return { curso: c, unidad: u, leccion: l };
    return null;
  }

  /* ---------- Navegación ---------- */
  function ruta() {
    const hsh = (location.hash || '#aprender').slice(1);
    const [v, ...resto] = hsh.split('-');
    return { v: v || 'aprender', arg: resto.join('-') };
  }
  const TABS = [['aprender', 'Aprender', I.camino], ['academia', 'Academia Web', I.codigo], ['lab', 'Laboratorio', I.lab], ['tareas', 'Agenda', I.agenda], ['lecturas', 'Lecturas', I.libro]];
  function pendientes() { const ahora = Date.now(); return TAREAS.filter(t => !S.tareasHechas[t.id] && new Date(t.vence).getTime() > ahora).length; }
  VISTAS.filter(x => x.lugar === 'tabs').forEach(x => TABS.push([x.id, x.titulo, x.icono || I.estrella]));
  function pintarTabs() {
    const r = ruta();
    $('#tabs').innerHTML = TABS.map(([id, n, ic]) => '<a class="tab' + (r.v === id ? ' on' : '') + '" href="#' + id + '"' + (r.v === id ? ' aria-current="page"' : '') + '>' + ic + '<span>' + n + '</span>' + (id === 'tareas' && pendientes() ? '<span class="burbuja">' + pendientes() + '</span>' : '') + '</a>').join('');
    const rc = racha();
    $('#stats').innerHTML =
      '<div class="stat racha' + (rc ? '' : ' apagada') + '" title="Días seguidos aprendiendo">' + I.fuego + rc + '<span class="lbl"> días</span></div>' +
      '<div class="stat xp" title="Puntos de experiencia">' + I.rayo + S.xp + '<span class="lbl"> XP</span></div>' +
      '<div class="stat" title="Meta de hoy: ' + xpHoy() + ' de ' + S.meta + ' XP">' + anillo(xpHoy() / S.meta) + '</div>' +
      VISTAS.filter(x => x.lugar === 'cabecera').map(x => '<a class="stat boton-cab' + (r.v === x.id ? ' on' : '') + '" href="#' + x.id + '" aria-label="' + esc(x.titulo) + '" title="' + esc(x.titulo) + '">' + (x.icono || '') + (x.punto && x.punto() ? '<span class="punto" aria-label="hay novedades"></span>' : '') + '</a>').join('');
  }
  function render() {
    pintarTabs();
    const r = ruta(), v = $('#vista');
    v.innerHTML = '';
    if (vistaWeb && r.v !== 'academia') { vistaWeb.destruir(); vistaWeb = null; }
    const extra = VISTAS.find(x => x.id === r.v);
    if (extra) extra.pintar(v, r.arg, window.Aula);
    else if (r.v === 'academia') vistaAcademia(v, r.arg);
    else if (r.v === 'lab') vistaLab(v, r.arg || 'red');
    else if (r.v === 'tareas') vistaAgenda(v, r.arg);
    else if (r.v === 'lecturas') vistaLecturas(v, r.arg);
    else vistaCamino(v);
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', render);

  /* =================== ACADEMIA DE DESARROLLO WEB (js/web/) =================== */
  // El progreso vive en S.web = { lecciones: {id: {fecha, xp, veces}}, modo: 'sencillo'|'tecnico' }, dentro del mismo documento de la cuenta.
  let vistaWeb = null;
  function vistaAcademia(v, arg) {
    if (!window.Academia || !window.CodeLab) { v.innerHTML = '<div class="vista-tit"><h1>Academia Web</h1><p>No se pudo cargar el laboratorio. Revisa tu conexión y recarga la página.</p></div>'; return; }
    if (!S.web || typeof S.web !== 'object') S.web = {};
    if (!S.web.lecciones) S.web.lecciones = {};
    vistaWeb = Academia.montar(v, {
      progreso: () => S.web.lecciones,
      guardar: (id, d) => { S.web.lecciones[id] = d; guardar(); },
      sumarXp: n => { sumarXp(n); pintarTabs(); },
      modo: () => S.web.modo || 'sencillo',
      ponerModo: m => { S.web.modo = m; guardar(); },
      cursoInicial: () => S.web.curso || 'base',
      ir: r => { const c = /^\/(\w+)$/.exec(r); if (c) { S.web.curso = c[1]; guardar(); } location.hash = '#academia-' + r; },
      hayTutor,
      tutor: async (prompt, alTexto) => {
        try { return await pedirTutor(prompt, alTexto); }
        catch (e) { alTexto(e && e.code === 'rate_limited' ? 'El tutor está ocupado. Intenta en un minuto.' : 'No pude preguntarle al tutor.'); return true; }
      }
    });
    vistaWeb.pintar(arg || '');
  }

  /* =================== CAMINO =================== */
  const ZIG = ['0px', '56px', '84px', '56px', '0px', '-56px', '-84px', '-56px'];
  function vistaCamino(v) {
    const curso = CURSOS.find(c => c.id === S.curso) || CURSOS[0];
    const sig = siguiente(curso);
    const inicio = (window.AULA_INICIO || []).map(f => { try { return f(v, window.Aula); } catch (e) { return null; } }).filter(Boolean);
    v.innerHTML = '<div class="vista-tit"><h1>Aprende haciendo</h1><p>Cada lección te explica una idea con palabras sencillas, te pone a hacerlo en el simulador y luego te pregunta para ver si te quedó.</p></div>';
    // Lo primero que quieres hacer: seguir donde te quedaste
    const seg = h('section', { class: 'seguir c-' + curso.color, 'aria-label': 'Seguir aprendiendo' });
    const lt = todas(curso), hechasN = lt.filter(l => hecha(l.id)).length;
    if (sig) {
      seg.innerHTML = '<div class="seguir-txt"><span class="seguir-eti">Sigue donde te quedaste</span><b>' + esc(sig.titulo) + '</b><span>' + esc(curso.nombre) + ' · lección ' + (hechasN + 1) + ' de ' + lt.length + '</span></div>';
      const go = h('button', { type: 'button', class: 'btn btn-primario btn-grande' }, 'Continuar');
      go.onclick = () => abrirLeccion(sig.id);
      seg.appendChild(go);
    } else {
      seg.innerHTML = '<div class="seguir-txt"><span class="seguir-eti">¡Curso terminado!</span><b>' + esc(curso.nombre) + '</b><span>Elige otro curso aquí abajo o repasa las lecciones que quieras.</span></div>';
    }
    v.appendChild(seg);
    inicio.forEach(n => v.appendChild(n));
    // En el navegador del iPhone: invitación a instalar la app (una sola vez)
    if (PF && PF.entorno.ios && !PF.entorno.instalada && !PF.entorno.nativa && !localStorage.getItem('aula503.instala')) {
      const ins = h('div', { class: 'instala' }, '<p><b>Instala Aula 503 en tu iPhone.</b> Se abre a pantalla completa y funciona sin internet.</p>');
      const ver = h('a', { class: 'btn btn-primario', href: '#ajustes' }, 'Cómo');
      const no = h('button', { type: 'button', class: 'btn-texto', 'aria-label': 'Ocultar aviso' }, 'Ahora no');
      no.onclick = () => { try { localStorage.setItem('aula503.instala', '1'); } catch (e) { /* ignorar */ } ins.remove(); };
      ins.append(ver, no);
      v.appendChild(ins);
    }
    const cs = h('div', { class: 'cursos' });
    CURSOS.forEach(c => {
      const t = todas(c), n = t.filter(l => hecha(l.id)).length;
      const b = h('button', { type: 'button', class: 'curso c-' + c.color + (c === curso ? ' on' : ''), 'aria-pressed': c === curso },
        '<span class="c-ico">' + ({ ia: I.cerebro, is: I.codigo, unsij: I.escuela }[c.id] || I.red) + '</span><span class="c-txt"><h2>' + esc(c.nombre) + '</h2><p>' + esc(c.lema) + '</p><div class="barra-prog"><i style="width:' + Math.round(n / t.length * 100) + '%"></i></div></span>');
      b.onclick = () => { S.curso = c.id; guardar(); render(); };
      cs.appendChild(b);
    });
    v.appendChild(cs);
    const wrap = h('div', { class: 'camino-wrap c-' + curso.color });
    const col = h('div');
    let k = 0;
    curso.unidades.forEach((u, ui) => {
      const total = u.lecciones.length, listas = u.lecciones.filter(l => hecha(l.id)).length;
      const un = h('section', { class: 'unidad' });
      un.innerHTML = '<div class="unidad-cab"><div><small>Unidad ' + (ui + 1) + '</small><h2>' + esc(u.titulo) + '</h2><p>' + esc(u.desc) + '</p></div><span class="u-cuenta">' + listas + '/' + total + '</span></div>';
      const r = h('div', { class: 'ruta' });
      u.lecciones.forEach(l => {
        const est = hecha(l.id) ? 'hecho' : desbloqueada(curso, l.id) ? 'actual' : 'bloq';
        const n = h('div', { class: 'nodo ' + est });
        n.style.setProperty('--dx', ZIG[k++ % ZIG.length]);
        const perfecta = S.lecciones[l.id] && S.lecciones[l.id].perfecta;
        n.innerHTML = (est === 'actual' && sig && sig.id === l.id ? '<span class="globo">Empieza aquí</span>' : '') +
          '<button type="button" class="nodo-b" aria-label="' + esc(l.titulo) + (est === 'bloq' ? ' (bloqueada)' : '') + '">' + (est === 'hecho' ? (perfecta ? I.estrella : I.check) : est === 'bloq' ? I.candado : I.jugar) + '</button>' +
          '<span class="nodo-t">' + esc(l.titulo) + '</span>';
        n.querySelector('button').onclick = () => {
          if (est === 'bloq') { aviso('Termina la lección anterior para desbloquear esta.'); return; }
          abrirLeccion(l.id);
        };
        r.appendChild(n);
      });
      un.appendChild(r);
      col.appendChild(un);
    });
    wrap.appendChild(col);
    wrap.appendChild(lateral(curso, sig));
    v.appendChild(wrap);
  }
  function lateral(curso, sig) {
    const lat = h('aside', { class: 'lateral' });
    const pct = xpHoy() / S.meta;
    const t1 = h('div', { class: 'tarjeta' });
    t1.innerHTML = '<div class="meta-dia">' + anillo(pct) + '<div><h3>Meta de hoy</h3><p>' + Math.min(xpHoy(), S.meta) + ' de ' + S.meta + ' XP. ' + (pct >= 1 ? '¡Cumplida! Tu racha sigue viva.' : 'Cada lección da 10 XP, y 15 si no te equivocas.') + '</p></div></div>';
    lat.appendChild(t1);
    if (sig) {
      const t2 = h('div', { class: 'tarjeta' });
      t2.innerHTML = '<h3>Sigue con</h3><p>' + esc(sig.titulo) + '</p>';
      const b = h('button', { type: 'button', class: 'btn btn-primario' }, 'Continuar lección');
      b.onclick = () => abrirLeccion(sig.id);
      t2.appendChild(b);
      lat.appendChild(t2);
    } else {
      lat.appendChild(h('div', { class: 'tarjeta' }, '<h3>¡Terminaste este camino!</h3><p>Repite cualquier lección para practicar, o ve al Laboratorio a armar tus propias redes.</p>'));
    }
    const prox = TAREAS.filter(t => !S.tareasHechas[t.id] && new Date(t.vence).getTime() > Date.now()).slice(0, 4);
    if (prox.length) {
      const t3 = h('div', { class: 'tarjeta' });
      t3.innerHTML = '<h3>Tareas que vienen</h3>' + prox.map(t => { const f = faltan(t.vence); return '<div class="tarea-mini"><span>' + esc(t.titulo) + '</span><span class="' + (f.dias <= 1 ? 'urgente' : '') + '">' + f.texto + '</span></div>'; }).join('') + '<a href="#tareas">Ver todas</a>';
      lat.appendChild(t3);
    }
    return lat;
  }

  /* =================== LECCIÓN =================== */
  let lec = null;
  function abrirLeccion(id) {
    const info = buscarLeccion(id);
    if (!info) return;
    lec = { info, pasos: info.leccion.pasos.slice(), i: 0, errores: 0, saltos: 0, repetidas: new Set() };
    const capa = $('#capa-leccion');
    capa.innerHTML = '';
    const el = h('div', { class: 'leccion c-' + info.curso.color, role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Lección: ' + info.leccion.titulo });
    el.innerHTML = '<div class="lec-top"><button type="button" class="lec-cerrar" aria-label="Salir de la lección">' + I.cerrar + '</button><div class="lec-prog" role="progressbar" aria-label="Avance de la lección"><i style="width:0"></i></div></div><div class="lec-cuerpo"></div><div class="lec-pie"><div class="lec-pie-in"><div class="lec-pie-izq"></div><div class="lec-pie-der"></div></div></div>';
    el.querySelector('.lec-cerrar').onclick = cerrarLeccion;
    capa.appendChild(el);
    document.body.style.overflow = 'hidden';
    lec.el = el;
    pintarPaso();
  }
  function cerrarLeccion() { $('#capa-leccion').innerHTML = ''; document.body.style.overflow = ''; lec = null; render(); }
  document.addEventListener('keydown', ev => { if (ev.key === 'Escape' && lec && !document.activeElement.classList.contains('term-in')) cerrarLeccion(); });

  function pie(izqHtml, botones, clase) {
    const p = lec.el.querySelector('.lec-pie');
    p.className = 'lec-pie' + (clase ? ' ' + clase : '');
    p.querySelector('.lec-pie-izq').innerHTML = izqHtml || '';
    const der = p.querySelector('.lec-pie-der');
    der.innerHTML = '';
    botones.forEach(b => der.appendChild(b));
    return p;
  }
  function boton(txt, cls, fn) { const b = h('button', { type: 'button', class: 'btn btn-grande ' + (cls || '') }, txt); b.onclick = fn; return b; }
  function avanzar() { lec.i++; pintarPaso(); }

  function pintarPaso() {
    const cuerpo = lec.el.querySelector('.lec-cuerpo');
    cuerpo.scrollTop = 0;
    lec.el.querySelector('.lec-prog i').style.width = Math.round(lec.i / lec.pasos.length * 100) + '%';
    if (lec.i >= lec.pasos.length) return pintarFinal(cuerpo);
    const p = lec.pasos[lec.i];
    cuerpo.innerHTML = '';
    const paso = h('div', { class: 'lec-paso' + (p.tipo === 'mision' || p.tipo === 'lab' ? ' ancho' : '') });
    cuerpo.appendChild(paso);
    ({ explica: pasoExplica, descubre: pasoDescubre, pregunta: pasoPregunta, ordena: pasoOrdena, mision: pasoMision, lab: pasoLab })[p.tipo](paso, p);
  }

  const hayTutor = () => EN_ARTEFACTO || !!(PF && PF.config.tutor);
  function botonTutor(p, paso) {
    const b = h('button', { type: 'button', class: 'btn-texto' }, '<span class="larga">No entendí, explícamelo más fácil</span><span class="corta">No entendí</span>');
    b.onclick = () => preguntarTutor(p, paso, b);
    b.hidden = !hayTutor();     // sin tutor de IA conectado, el botón no se muestra (confunde)
    return b;
  }
  // Devuelve false si no hay tutor en este entorno
  async function pedirTutor(prompt, alTexto) {
    if (PF) return PF.tutor(prompt, alTexto);
    const sample = EN_ARTEFACTO ? await window.claude.use('sample').catch(() => null) : null;
    if (!sample) return false;
    await sample(prompt, { cache: false, onText: ({ text }) => alTexto(text) });
    return true;
  }
  async function preguntarTutor(p, paso, b) {
    let caja = paso.querySelector('.tutor');
    if (!caja) { caja = h('div', { class: 'tutor', 'aria-live': 'polite' }); paso.appendChild(caja); }
    b.disabled = true;
    caja.innerHTML = '<div class="tutor-tit">Tutor</div><p>Pensando…</p>';
    const tmp = document.createElement('div'); tmp.innerHTML = (p.titulo || '') + ' ' + (p.texto || '') + (p.opciones ? ' Opciones: ' + p.opciones.join(' | ') : '');
    const prompt = 'Eres un tutor paciente de una universidad en la Sierra Juárez de Oaxaca. El alumno está empezando desde cero (no conoce palabras técnicas como IP, MAC, protocolo, algoritmo o requerimiento; si usas una, explícala con una comparación) y no entendió este paso de una lección de "' + lec.info.curso.nombre + '". Explícalo en español de México, muy sencillo, con una analogía de la vida diaria y un ejemplo concreto. Si el paso tiene números (direcciones, pesos, cuentas), explica qué significa cada número. Máximo 140 palabras. No des la respuesta de la pregunta si la hay; ayúdale a razonarla. Formato: párrafos cortos, puedes usar **negritas**.\n\nPaso de la lección:\n' + tmp.textContent.slice(0, 1800);
    try {
      const hay = await pedirTutor(prompt, text => { caja.innerHTML = '<div class="tutor-tit">Tutor</div>' + md(text); });
      if (!hay) caja.innerHTML = '<div class="tutor-tit">Tutor</div><p>El tutor de IA todavía no está conectado en la app. Mientras tanto, toca las <b>palabras subrayadas</b> para ver su explicación o abre el Diccionario en Lecturas.</p>';
    } catch (e) {
      caja.innerHTML = '<div class="tutor-tit">Tutor</div><p>' + (e && e.code === 'rate_limited' ? 'El tutor está ocupado. Intenta en un minuto.' : 'No pude preguntarle al tutor. Intenta de nuevo.') + '</p>';
    } finally { b.disabled = false; }
  }

  function pasoExplica(paso, p) {
    paso.innerHTML = '<div class="lec-eti">Aprende</div><h2>' + p.titulo + '</h2><div class="texto">' + p.texto + '</div>';
    pie('', [boton('Continuar', 'btn-primario', avanzar)]);
    lec.el.querySelector('.lec-pie-izq').appendChild(botonTutor(p, paso));
  }

  // «Toca para descubrir»: tarjetas que se abren una por una
  function pasoDescubre(paso, p) {
    paso.innerHTML = '<div class="lec-eti">Descubre</div><h2>' + p.titulo + '</h2>' + (p.texto ? '<div class="texto">' + p.texto + '</div>' : '');
    const grid = h('div', { class: 'descubre' + (p.tarjetas.length % 2 === 0 && p.tarjetas.length % 3 !== 0 ? ' pares' : '') });
    const vistas = new Set();
    const cont = boton('Continuar', 'btn-primario', avanzar);
    const falta = h('span', { class: 'falta' });
    const actualizar = () => {
      const n = p.tarjetas.length - vistas.size;
      cont.disabled = n > 0;
      falta.textContent = n > 0 ? (n === 1 ? 'Te falta 1 tarjeta' : 'Te faltan ' + n + ' tarjetas') : '¡Listo!';
    };
    p.tarjetas.forEach((t, i) => {
      const c = h('button', { type: 'button', class: 'desc-carta', 'aria-expanded': 'false' }, '<span class="desc-n">' + (i + 1) + '</span><b class="desc-t">' + t.titulo + '</b><span class="desc-toca">Toca para ver</span><div class="desc-html">' + t.html + '</div>');
      c.onclick = ev => {
        if (ev.target.closest('[data-g]')) return;
        c.classList.add('abierta'); c.setAttribute('aria-expanded', 'true');
        vistas.add(i); actualizar();
      };
      grid.appendChild(c);
    });
    paso.appendChild(grid);
    pie('', [cont]);
    const izq = lec.el.querySelector('.lec-pie-izq');
    izq.append(falta, botonTutor(p, paso));
    actualizar();
  }

  function resultado(ok, explica, extra) {
    if (!ok && !lec.repetidas.has(lec.i)) { lec.errores++; }
    return pie('<div class="retro"><b>' + (ok ? '¡Correcto!' : 'Casi…') + '</b><span>' + (explica || '') + '</span></div>', [boton('Continuar', ok ? 'btn-ok' : 'btn-primario', () => {
      if (!ok && !lec.repetidas.has(lec.i)) { lec.repetidas.add(lec.pasos.length); lec.pasos.push(lec.pasos[lec.i]); }
      if (extra) extra();
      avanzar();
    })], ok ? 'ok' : 'mal');
  }

  function pasoPregunta(paso, p) {
    paso.innerHTML = '<div class="lec-eti">' + (lec.repetidas.has(lec.i) ? 'Otra oportunidad' : 'Pregunta') + '</div><h2>' + p.texto + '</h2>';
    const ops = h('div', { class: 'opciones', role: 'radiogroup' });
    let elegida = null;
    const orden = barajar(p.opciones.map((t, i) => i));
    const botones = orden.map((i, n) => {
      const b = h('button', { type: 'button', class: 'opcion', role: 'radio', 'aria-checked': 'false' }, '<span class="k">' + (n + 1) + '</span><span>' + p.opciones[i] + '</span>');
      b.onclick = () => { elegida = i; botones.forEach(x => { x.classList.toggle('sel', x === b); x.setAttribute('aria-checked', x === b); }); comprobar.disabled = false; };
      ops.appendChild(b);
      return b;
    });
    paso.appendChild(ops);
    const comprobar = boton('Comprobar', 'btn-primario', () => {
      const ok = elegida === p.correcta;
      botones.forEach((b, n) => { b.disabled = true; if (orden[n] === p.correcta) b.classList.add('correcta'); else if (orden[n] === elegida) b.classList.add('incorrecta'); });
      resultado(ok, p.explica);
    });
    comprobar.disabled = true;
    pie('', [comprobar]);
    lec.el.querySelector('.lec-pie-izq').appendChild(botonTutor(p, paso));
    const teclas = ev => { if (!lec || lec.pasos[lec.i] !== p) { document.removeEventListener('keydown', teclas); return; } const n = parseInt(ev.key, 10); if (n >= 1 && n <= botones.length && !botones[0].disabled) botones[n - 1].click(); };
    document.addEventListener('keydown', teclas);
  }

  function pasoOrdena(paso, p) {
    paso.innerHTML = '<div class="lec-eti">Ordena</div><h2>' + p.texto + '</h2><div class="ordena-resp" aria-label="Tu respuesta"></div><div class="ordena-banco" aria-label="Opciones"></div>';
    const resp = paso.querySelector('.ordena-resp'), banco = paso.querySelector('.ordena-banco');
    const elegidos = [];
    let mezcla = barajar(p.items);
    if (mezcla.join() === p.items.join()) mezcla = mezcla.slice().reverse();
    const pintar = () => {
      resp.innerHTML = ''; banco.innerHTML = '';
      elegidos.forEach((t, i) => { const c = h('button', { type: 'button', class: 'chip' }, esc(t)); c.onclick = () => { elegidos.splice(i, 1); pintar(); }; resp.appendChild(c); });
      mezcla.filter(t => !elegidos.includes(t)).forEach(t => { const c = h('button', { type: 'button', class: 'chip' }, esc(t)); c.onclick = () => { elegidos.push(t); pintar(); }; banco.appendChild(c); });
      comprobar.disabled = elegidos.length !== p.items.length;
    };
    const comprobar = boton('Comprobar', 'btn-primario', () => {
      const ok = elegidos.join('|') === p.items.join('|');
      resultado(ok, (ok ? '' : 'El orden correcto es: <b>' + p.items.map(esc).join(' → ') + '</b>. ') + (p.explica || ''));
    });
    pie('', [comprobar]);
    pintar();
  }

  function ctxMeta(red, eventos) {
    const ipDe = id => { const d = red && red.dev(id); if (!d) return ''; return NetSim.esHost(d) ? d.ifaces[0].ip : red.ipsDe(d)[0] || ''; };
    const maskDe = id => { const d = red && red.dev(id); return d && NetSim.esHost(d) ? d.ifaces[0].mask : ''; };
    const ipsObjetivo = to => { const d = red && red.dev(to); return d ? (d.tipo === 'switch' ? [d.svi.ip] : d.ifaces.map(f => f.ip).filter(Boolean)) : [to]; };
    const pingsOk = (from, to) => { const ips = ipsObjetivo(to); return eventos.filter(e => e.tipo === 'ping' && e.res.ok && e.res.origen === from && ips.includes(e.res.destino)).length; };
    return {
      red, eventos, dev: id => red.dev(id),
      unidos: (a, b) => red.unidos(a, b),
      ip: ipDe, gw: id => (red.dev(id) || {}).gw || '',
      mismaRed: (a, b) => NetSim.mismaRed(ipDe(a), ipDe(b), maskDe(a)) && NetSim.mismaRed(ipDe(b), ipDe(a), maskDe(b)),
      ipUnica: id => { const ip = ipDe(id); return !!ip && red.devs.filter(d => d.id !== id).every(d => !red.ipsDe(d).includes(ip)); },
      pingOk: (from, to) => pingsOk(from, to) > 0,
      pingsOk,
      cli: (dev, cmd) => eventos.some(e => e.tipo === 'cli' && e.dev === dev && e.registro && e.registro.has(cmd)),
      cfg: id => red.dev(id).cfg,
      hubo: (tipo, fn) => eventos.some(e => e.tipo === tipo && (!fn || fn(e)))
    };
  }
  function cajaMetas(p) {
    const box = h('div', { class: 'metas', 'aria-live': 'polite' });
    box.innerHTML = '<h3>Tu misión</h3>' + p.metas.map(m => '<div class="meta"><span class="ck"></span><span>' + m.t + '</span></div>').join('');
    return box;
  }
  function revisar(p, box, ctx, alTerminar) {
    let todas = true;
    p.metas.forEach((m, i) => {
      let ok = false;
      try { ok = !!m.ok(ctx); } catch (e) { ok = false; }
      const fila = box.querySelectorAll('.meta')[i];
      if (ok && !fila.classList.contains('ok')) { fila.classList.add('ok'); fila.querySelector('.ck').innerHTML = I.check; }
      if (!ok) { fila.classList.remove('ok'); fila.querySelector('.ck').innerHTML = ''; }
      todas = todas && ok;
    });
    if (todas) alTerminar();
  }
  function pieMision(p, paso) {
    const saltar = h('button', { type: 'button', class: 'btn-texto' }, '<span class="larga">Saltar misión</span><span class="corta">Saltar</span>');
    saltar.onclick = () => { lec.saltos++; avanzar(); };
    const cont = boton('Continuar', 'btn-primario', avanzar);
    cont.disabled = true;
    pie('', [cont]);
    const izq = lec.el.querySelector('.lec-pie-izq');
    izq.appendChild(saltar);
    izq.appendChild(botonTutor(p, paso));
    return cont;
  }
  function misionCumplida(cont) {
    if (!cont.disabled) return;
    cont.disabled = false;
    const p = lec.el.querySelector('.lec-pie');
    p.className = 'lec-pie ok';
    lec.el.querySelector('.lec-pie-izq').innerHTML = '<div class="retro"><b>¡Misión cumplida!</b><span>Lo hiciste tú mismo en el simulador.</span></div>';
    cont.className = 'btn btn-grande btn-ok';
    cont.focus();
  }

  function pasoMision(paso, p) {
    paso.innerHTML = '<div class="lec-eti">Hazlo tú</div><h2>' + p.titulo + '</h2>';
    const grid = h('div', { class: 'mision' });
    const eventos = [];
    const red = new NetSim.Red(p.red);
    const metas = cajaMetas(p);
    const cont = pieMision(p, paso);
    const ctx = ctxMeta(red, eventos);
    const vista = NetView({
      red, herramientas: p.herramientas || ['mover'], editable: p.editable !== false, pasoAPaso: !!p.pasoAPaso, consola: true,
      alCambiar: e => { eventos.push(e); revisar(p, metas, ctx, () => misionCumplida(cont)); }
    });
    const lado = h('div', { class: 'lado' });
    lado.appendChild(h('div', { class: 'instr' }, p.texto));
    lado.appendChild(metas);
    grid.append(vista.el, lado);
    paso.appendChild(grid);
    if (p.abrirConsola) vista.consola(p.abrirConsola);
    revisar(p, metas, ctx, () => misionCumplida(cont));
  }

  function pasoLab(paso, p) {
    paso.innerHTML = '<div class="lec-eti">Hazlo tú</div><h2>' + p.titulo + '</h2>';
    const grid = h('div', { class: 'mision' });
    const eventos = [];
    const metas = cajaMetas(p);
    const cont = pieMision(p, paso);
    const ctx = ctxMeta(null, eventos);
    const alCambiar = e => { eventos.push(e); revisar(p, metas, ctx, () => misionCumplida(cont)); };
    const lab = crearLab(p.lab, p, alCambiar);
    const lado = h('div', { class: 'lado' });
    lado.appendChild(h('div', { class: 'instr' }, p.texto));
    lado.appendChild(metas);
    grid.append(lab.el, lado);
    paso.appendChild(grid);
  }

  function crearLab(id, p, alCambiar) {
    p = p || {};
    if (id === 'aspiradora') return IALabs.Aspiradora({ alCambiar });
    if (id === 'laberinto') return IALabs.Laberinto(p.algoritmos ? { alCambiar, algoritmos: p.algoritmos } : { alCambiar });
    if (id === 'neurona') return IALabs.Neurona({ alCambiar, entrenar: p.entrenar !== false });
    if (id === 'clasifica') return ISLabs.Clasifica({ alCambiar, grupos: p.grupos, items: p.items, pregunta: p.pregunta, diagrama: p.diagrama });
    if (id === 'proyecto') return ISLabs.Proyecto({ alCambiar });
    if (id === 'sprint') return ISLabs.Sprint({ alCambiar });
    return { el: h('div', null, 'Laboratorio desconocido.') };
  }

  function pintarFinal(cuerpo) {
    const info = lec.info, id = info.leccion.id;
    const primera = !hecha(id);
    const perfecta = lec.errores === 0 && lec.saltos === 0;
    const xp = 10 + (perfecta ? 5 : 0);
    const rachaAntes = racha();
    sumarXp(xp);
    const previo = S.lecciones[id];
    S.lecciones[id] = { fecha: hoy(), perfecta: perfecta || !!(previo && previo.perfecta), veces: ((previo && previo.veces) || 0) + 1 };
    guardar();
    const rc = racha();
    const sig = siguiente(info.curso);
    cuerpo.innerHTML = '';
    const f = h('div', { class: 'lec-paso final' });
    f.innerHTML = I.trofeo.replace('<svg', '<svg class="trofeo"') +
      '<h2>' + (perfecta ? '¡Lección perfecta!' : '¡Lección completada!') + '</h2>' +
      '<p>' + esc(info.leccion.titulo) + (primera ? '' : ' · repaso') + '</p>' +
      '<div class="premios"><div class="premio xp"><b>+' + xp + '</b><span>XP</span></div><div class="premio racha"><b>' + rc + '</b><span>' + (rc > rachaAntes ? '¡racha +1!' : 'días de racha') + '</span></div><div class="premio perf"><b>' + (lec.errores ? lec.errores : '0') + '</b><span>errores</span></div></div>' +
      (xpHoy() >= S.meta && xpHoy() - xp < S.meta ? '<p class="bueno">Cumpliste tu meta de hoy.</p>' : '');
    cuerpo.appendChild(f);
    lec.el.querySelector('.lec-prog i').style.width = '100%';
    const botones = [];
    if (sig && sig.id !== id) botones.push(boton('Siguiente lección', 'btn-primario', () => abrirLeccion(sig.id)));
    botones.push(boton('Volver al camino', sig && sig.id !== id ? '' : 'btn-primario', cerrarLeccion));
    pie('', botones, 'ok');
    pintarTabs();
  }

  /* =================== LABORATORIO LIBRE =================== */
  const EJEMPLO = { devices: [
    { tipo: 'pc', id: 'PC1', x: 150, y: 140, ip: '192.168.1.10', gw: '192.168.1.1' }, { tipo: 'laptop', id: 'Laptop1', x: 150, y: 380, ip: '192.168.1.11', gw: '192.168.1.1' },
    { tipo: 'switch', id: 'SW1', x: 320, y: 260 }, { tipo: 'router', id: 'R1', x: 480, y: 260, ifs: { 'Gi0/0': { ip: '192.168.1.1' }, 'Gi0/1': { ip: '10.0.0.1' } } },
    { tipo: 'switch', id: 'SW2', x: 640, y: 260 }, { tipo: 'server', id: 'Servidor1', x: 800, y: 260, ip: '10.0.0.50', gw: '10.0.0.1' }],
    links: [['PC1', 'SW1'], ['Laptop1', 'SW1'], { a: 'SW1', pa: 'Gi0/1', b: 'R1', pb: 'Gi0/0' }, { a: 'R1', pa: 'Gi0/1', b: 'SW2', pb: 'Gi0/1' }, ['SW2', 'Servidor1']] };
  const despuesDe = (c, tipo1, fn2) => { const i = c.eventos.findIndex(e => e.tipo === tipo1); return i >= 0 && c.eventos.slice(i).some(fn2); };
  const pcNueva = c => c.red.devs.filter(d => (d.tipo === 'pc' || d.tipo === 'laptop') && d.id !== 'PC1' && d.id !== 'Laptop1');
  const LABS = [
    { id: 'salon', curso: 'redes', nombre: 'Tu salón (UNSIJ)', desc: 'La red real del Lab. Redes.',
      texto: 'Es la red <b>real</b> de tu salón: las PCs con sus nombres e IPs de verdad, el switch Dell 6248, el access point del Wi-Fi y el gateway del campus (172.25.0.1). Las líneas punteadas son Wi-Fi. Toca cada equipo para leer qué es.',
      retos: [
        { t: 'Toca el switch SW-Dell6248 y lee su ficha', ok: c => c.hubo('seleccion', e => e.dev === 'SW-Dell6248') },
        { t: 'Manda un ping de lrm11 a labredesu (dos PCs del salón)', ok: c => c.pingOk('lrm11', 'labredesu') },
        { t: 'Sal a Internet: ping de cualquier PC a Internet (8.8.8.8)', ok: c => c.hubo('ping', e => e.res.ok && e.res.destino === '8.8.8.8') },
        { t: 'Ping desde jenni, que va por Wi-Fi, a otra PC', ok: c => c.hubo('ping', e => e.res.ok && e.res.origen === 'jenni') },
        { t: 'Conecta lrm12 (cable sin señal) al switch y haz que llegue al gateway', ok: c => c.pingOk('lrm12', 'GW-UNSIJ') },
        { t: 'Intenta llegar al Proxmox (172.25.3.212) y lee por qué no se puede', ok: c => c.hubo('ping', e => e.res.destino === '172.25.3.212') }
      ] },
    { id: 'red', curso: 'redes', nombre: 'Arma tu red', desc: 'Conecta equipos y mira viajar los mensajes.',
      texto: 'Es una red de ejemplo con dos «colonias» (redes): a la izquierda la <b>192.168.1</b> (PC1 y Laptop1) y a la derecha la <b>10.0.0</b> (Servidor1). El router <b>R1</b> las une, como una oficina de correos entre dos colonias. Deja activada la <b>Explicación sencilla</b> para que todo se cuente con palabras, sin números raros.',
      retos: [
        { t: 'Toca la PC1 y mira su ficha: su dirección (IP) partida en colonia y número de casa', ok: c => c.hubo('seleccion', e => e.dev === 'PC1') },
        { t: 'Desde la ficha de PC1, manda un ping al Servidor1', ok: c => c.pingOk('PC1', 'Servidor1') },
        { t: 'Activa «Paso a paso», manda otro ping y toca un sobre para ver qué lleva', ok: c => c.hubo('inspeccion') },
        { t: 'Agrega una PC con «+ PC» y conéctala a SW1 con la herramienta Cable', ok: c => pcNueva(c).some(d => c.red.unidos(d.id, 'SW1')) },
        { t: 'Ponle a tu PC nueva la dirección 192.168.1.20 y la puerta de salida 192.168.1.1, y haz que llegue al Servidor1', ok: c => pcNueva(c).some(d => c.pingOk(d.id, 'Servidor1')) },
        { t: 'Descompón algo a propósito: borra la puerta de salida de PC1, manda el ping y lee qué falló', ok: c => c.hubo('ping', e => !e.res.ok && e.res.origen === 'PC1' && e.res.pasos.length > 0) }
      ] },
    { id: 'consola', curso: 'redes', nombre: 'Configura un switch', desc: 'Los comandos de Packet Tracer (Tarea 2).',
      texto: 'Igual que la práctica de Packet Tracer de tu Tarea 2: dos switches y dos PC. Toca un switch y presiona <b>Abrir consola (CLI)</b>. Si no te acuerdas de un comando, escribe <code>?</code> y te muestra la lista. Puedes abreviar: <code>en</code>, <code>conf t</code>.',
      retos: [
        { t: 'Abre la consola de SW1 y entra al modo privilegiado con enable', ok: c => c.cli('SW1', 'enable') },
        { t: 'Entra a configuración (configure terminal) y cámbiale el nombre: hostname S1', ok: c => c.cfg('SW1').hostname === 'S1' },
        { t: 'Ponle una contraseña cifrada: enable secret class', ok: c => !!c.cfg('SW1').enableSecret },
        { t: 'Dale una IP: interface vlan 1, ip address 192.168.1.253 255.255.255.0 y no shutdown', ok: c => !!c.dev('SW1').svi.ip && c.dev('SW1').svi.up },
        { t: 'Ponle IP a PC1 y PC2 (la misma colonia 192.168.1) y haz ping de una a la otra', ok: c => c.pingOk('PC1', 'PC2') },
        { t: 'Guarda todo: copy running-config startup-config', ok: c => !!(c.cfg('SW1').guardada || c.cfg('SW2').guardada) }
      ] },
    { id: 'aspiradora', curso: 'ia', nombre: 'Robot aspiradora', desc: 'Programa un agente con reglas.',
      texto: 'El robot solo ve su propio cuarto: sabe en cuál está y si hay basura ahí. Tú le das una regla para cada cosa que puede ver, y él la sigue sin pensar. Así funcionan los <b>agentes reactivos</b>.',
      retos: [
        { t: 'Elige las 4 reglas y presiona «Probar en las 8 situaciones»', ok: c => c.hubo('prueba') },
        { t: 'Toca una tarjeta de situación para ver al robot paso a paso', ok: c => c.hubo('ver') },
        { t: 'Logra que limpie en las 8 situaciones', ok: c => c.hubo('prueba', e => e.buenos === 8) },
        { t: 'Experimenta: pon «Quedarse quieto» en una regla de «limpio» y mira qué situación falla', ok: c => c.hubo('prueba', e => e.buenos < 8 && (e.reglas['A,limpio'] === 'nada' || e.reglas['B,limpio'] === 'nada')) }
      ] },
    { id: 'laberinto', curso: 'ia', nombre: 'Laberinto', desc: 'Así busca una IA el camino.',
      texto: '<b>S</b> es la salida y <b>M</b> la meta; los cuadros oscuros son muros. Cada forma de buscar revisa las casillas en un orden distinto, y los colores te muestran cuáles ya revisó. Compara cuántas casillas revisa cada una y qué tan largo sale el camino.',
      retos: [
        { t: 'Busca con Anchura', ok: c => c.hubo('busqueda', e => e.alg === 'bfs' && e.encontrado) },
        { t: 'Busca con Profundidad: ¿su camino es más largo o más corto?', ok: c => c.hubo('busqueda', e => e.alg === 'dfs' && e.encontrado) },
        { t: 'Busca con A*: ¿revisó más o menos casillas que Anchura?', ok: c => c.hubo('busqueda', e => e.alg === 'astar' && e.encontrado) },
        { t: 'Toca casillas para poner muros y busca otra vez', ok: c => despuesDe(c, 'muro', e => e.tipo === 'busqueda') },
        { t: 'Encierra la meta con muros: ¿qué pasa?', ok: c => c.hubo('busqueda', e => !e.encontrado) }
      ] },
    { id: 'neurona', curso: 'ia', nombre: 'Neurona', desc: 'Una calculadora que aprende.',
      texto: 'Cada bolita es un alumno. La neurona adivina quién aprueba con una cuenta: <b>horas × cuánto cuenta + exigencia</b>. Entrenarla es corregir esos números cada vez que se equivoca.',
      retos: [
        { t: 'Toca una bolita para ver la cuenta de ese alumno', ok: c => c.hubo('alumno') },
        { t: 'Presiona «Aprender de 1 error» y lee qué corrigió', ok: c => c.hubo('precision', e => e.entrenado) },
        { t: 'Deja que aprenda sola hasta acertar con los 20', ok: c => c.hubo('precision', e => e.entrenado && e.aciertos === e.total) },
        { t: 'Empieza con números al azar y vuelve a entrenarla: ¿termina con la misma línea?', ok: c => despuesDe(c, 'azar', e => e.tipo === 'precision' && e.entrenado && e.aciertos === e.total) }
      ] },
    { id: 'proyecto', curso: 'is', nombre: 'Cascada contra ágil', desc: 'El mismo proyecto, de dos formas.',
      texto: 'Doña Mari quiere una app de pedidos y tiene 12 semanas. Simula el proyecto con cada forma de trabajar y compara qué pasa cuando ella cambia de opinión.',
      retos: [
        { t: 'Simula el proyecto con cascada', ok: c => c.hubo('proyecto', e => e.modelo === 'cascada') },
        { t: 'Simula el proyecto con ágil y compara la tabla', ok: c => c.hubo('proyecto', e => e.modelo === 'agil') }
      ] },
    { id: 'sprint', curso: 'is', nombre: 'Sprint de Scrum', desc: 'Planea 2 semanas y míralas avanzar.',
      texto: 'Eliges qué tareas del backlog caben en un sprint de 2 semanas (el equipo alcanza 13 puntos) y luego ves el tablero y la gráfica de trabajo pendiente avanzar día por día.',
      retos: [
        { t: 'Planea un sprint que incluya lo más importante', ok: c => c.hubo('sprint', e => e.top) },
        { t: 'Pásate de 13 puntos a propósito y mira qué pasa', ok: c => c.hubo('sprint', e => e.puntos > 13) },
        { t: 'Sprint perfecto: en orden de importancia y sin dejar nada pendiente', ok: c => c.hubo('sprint', e => e.ok && e.enOrden) }
      ] }
  ];
  const NOMBRE_CURSO = { redes: 'Redes', ia: 'Inteligencia artificial', is: 'Ingeniería de software' };
  function vistaLab(v, cual) {
    const lab = LABS.find(l => l.id === cual) || LABS[0];
    v.innerHTML = '<div class="vista-tit"><h1>Laboratorio</h1><p>Aquí practicas libre, sin calificación. Cada laboratorio trae <b>retos guiados</b>: síguelos en orden y cada uno te da 5 XP la primera vez.</p></div>';
    const sel = h('div', { class: 'lab-elige' });
    ['redes', 'ia', 'is'].forEach(cid => {
      const g = h('div', { class: 'lab-grupo c-' + cid }, '<div class="lab-grupo-t">' + NOMBRE_CURSO[cid] + '</div>');
      LABS.filter(l => l.curso === cid).forEach(l => {
        const hechos = l.retos.filter((r, i) => S.retos[l.id + ':' + i]).length;
        g.appendChild(h('a', { class: 'lab-card' + (l === lab ? ' on' : ''), href: '#lab-' + l.id }, '<b>' + l.nombre + '</b><span>' + l.desc + '</span><small>' + hechos + ' de ' + l.retos.length + ' retos</small>'));
      });
      sel.appendChild(g);
    });
    v.appendChild(sel);

    const eventos = [];
    let red = null;
    const zona = h('div', { class: 'lab-zona' });
    const guia = h('aside', { class: 'guia c-' + lab.curso });
    let ctx;
    const revisarRetos = () => {
      let nuevos = 0;
      lab.retos.forEach((rt, i) => {
        const k = lab.id + ':' + i;
        let ok = false;
        try { ok = !!rt.ok(ctx); } catch (e) { ok = false; }
        if (ok && !S.retos[k]) { S.retos[k] = hoy(); nuevos++; }
      });
      if (nuevos) { sumarXp(5 * nuevos); aviso('¡Reto cumplido! +' + 5 * nuevos + ' XP'); pintarTabs(); }
      pintarGuia();
    };
    const alCambiar = e => { eventos.push(e); revisarRetos(); };
    function pintarGuia() {
      const sig = lab.retos.findIndex((r, i) => !S.retos[lab.id + ':' + i]);
      guia.innerHTML = '<h3>¿Qué estás viendo?</h3><p>' + lab.texto + '</p><h3>Retos</h3><ol class="retos">' +
        lab.retos.map((rt, i) => { const ok = S.retos[lab.id + ':' + i]; return '<li class="' + (ok ? 'ok' : i === sig ? 'sig' : '') + '"><span class="ck">' + (ok ? I.check : i + 1) + '</span><span>' + rt.t + '</span></li>'; }).join('') + '</ol>' +
        (sig < 0 ? '<p class="bueno">¡Completaste todos los retos de este laboratorio!</p>' : '');
      const cuenta = v.querySelector('.lab-card.on small');
      if (cuenta) cuenta.textContent = lab.retos.filter((r, i) => S.retos[lab.id + ':' + i]).length + ' de ' + lab.retos.length + ' retos';
    }
    if (lab.id === 'salon') {
      red = new NetSim.Red(window.UNSIJ.salon({ lrm12: true }));
      ctx = ctxMeta(red, eventos);
      zona.appendChild(NetView({ red, herramientas: ['mover', 'cable'], alto: 560, textoInicial: 'Esta es la red de tu salón. Empieza por el reto 1: toca el <b>switch</b>.', alCambiar }).el);
    } else if (lab.id === 'red') {
      try { red = new NetSim.Red(S.sandbox || EJEMPLO); } catch (e) { red = new NetSim.Red(EJEMPLO); }
      let t = null;
      ctx = ctxMeta(red, eventos);
      const vista = NetView({ red, herramientas: ['mover', 'cable', 'borrar', 'pc', 'laptop', 'server', 'switch', 'router'], alto: 560,
        textoInicial: 'Empieza por el reto 1: toca <b>PC1</b>.',
        alCambiar: e => { alCambiar(e); clearTimeout(t); t = setTimeout(() => { S.sandbox = red.toJSON(); guardar(); }, 800); } });
      zona.appendChild(vista.el);
      const r = h('div', { class: 'acciones' });
      r.appendChild(boton('Volver a la red de ejemplo', '', () => { S.sandbox = null; guardar(); render(); }));
      r.appendChild(boton('Empezar con la hoja en blanco', '', () => { S.sandbox = { devices: [], links: [] }; guardar(); render(); }));
      zona.appendChild(r);
    } else if (lab.id === 'consola') {
      red = new NetSim.Red({ devices: [{ tipo: 'pc', id: 'PC1', x: 170, y: 330 }, { tipo: 'switch', id: 'SW1', x: 330, y: 180 }, { tipo: 'switch', id: 'SW2', x: 570, y: 180 }, { tipo: 'pc', id: 'PC2', x: 730, y: 330 }], links: [['PC1', 'SW1'], { a: 'SW1', pa: 'Gi0/1', b: 'SW2', pb: 'Gi0/1' }, ['SW2', 'PC2']] });
      ctx = ctxMeta(red, eventos);
      zona.appendChild(NetView({ red, herramientas: ['mover'], alto: 460, textoInicial: 'Toca <b>SW1</b> y presiona <b>Abrir consola (CLI)</b>.', alCambiar }).el);
    } else {
      ctx = ctxMeta(null, eventos);
      zona.appendChild(crearLab(lab.id, {}, alCambiar).el);
    }
    const grid = h('div', { class: 'lab-layout' });
    grid.append(zona, guia);
    v.appendChild(grid);
    pintarGuia();
  }

  /* =================== TAREAS =================== */
  const NOMBRE_MATERIA = { redes: 'Redes I', ia: 'Fundamentos de IA', is: 'Ingeniería de Software I', so: 'Sistemas Operativos', pdm: 'Prog. de dispositivos móviles', web: 'Tecnologías Web', ingles: 'Inglés', emp: 'Emprendimiento' };
  function faltan(vence) {
    const ms = new Date(vence).getTime() - Date.now();
    const dias = Math.ceil(ms / 86400000);
    if (ms < 0) return { dias: -1, texto: 'Ya venció' };
    if (ms < 86400000) return { dias: 0, texto: 'Vence hoy' };
    return { dias, texto: dias === 1 ? 'Falta 1 día' : 'Faltan ' + dias + ' días' };
  }
  const fechaLarga = s => { try { return new Date(s).toLocaleString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit', timeZone: 'America/Mexico_City' }); } catch (e) { return s; } };
  // Agenda: horario de la semana y tareas, con un selector arriba
  function vistaAgenda(v, arg) {
    const hay = !!window.AULA_HORARIO;
    const modo = hay && arg !== 'tareas' ? 'horario' : 'tareas';
    if (hay) {
      const seg = h('div', { class: 'seg', role: 'group', 'aria-label': 'Agenda', style: 'margin-bottom:14px' });
      [['horario', 'Horario'], ['tareas', 'Tareas' + (pendientes() ? ' (' + pendientes() + ')' : '')]].forEach(([k, n]) => {
        const b = h('button', { type: 'button', class: 'seg-b' + (modo === k ? ' on' : ''), 'aria-pressed': modo === k }, n);
        b.onclick = () => { location.hash = '#tareas-' + k; };
        seg.appendChild(b);
      });
      v.appendChild(seg);
    }
    const cuerpo = h('div');
    v.appendChild(cuerpo);
    if (modo === 'horario') window.AULA_HORARIO.pintar(cuerpo, window.Aula);
    else vistaTareas(cuerpo);
  }
  function vistaTareas(v) {
    v.innerHTML = '<div class="vista-tit"><h1>Tus tareas</h1><p>Se actualizan desde tu calendario de Moodle UNSIJ. Marca las que ya entregaste.</p></div>';
    if (!TAREAS.length) {
      v.appendChild(h('div', { class: 'vacio' }, estadoTareas === 'cargando' ? 'Cargando tus tareas…' : 'Todavía no hay tareas en este dispositivo. Impórtalas desde Ajustes → Copia de seguridad → «Importar archivo», con tu paquete personal.'));
      return;
    }
    const ahora = Date.now();
    const grupos = [['Por entregar', t => !S.tareasHechas[t.id] && new Date(t.vence).getTime() >= ahora], ['Ya vencieron', t => !S.tareasHechas[t.id] && new Date(t.vence).getTime() < ahora], ['Entregadas', t => S.tareasHechas[t.id]]];
    grupos.forEach(([titulo, filtro]) => {
      const lista = TAREAS.filter(filtro);
      if (!lista.length) return;
      v.appendChild(h('h2', { style: 'font-size:1.2rem;margin:18px 0 10px' }, titulo + ' · ' + lista.length));
      const box = h('div', { class: 'tareas' });
      lista.forEach(t => {
        const f = faltan(t.vence);
        const hechaT = !!S.tareasHechas[t.id];
        const c = h('article', { class: 'tarea' + (hechaT ? ' hecha' : '') });
        c.innerHTML = '<div class="tarea-cab"><div><div class="curso-n">' + esc(NOMBRE_MATERIA[t.materia] || t.curso || '') + '</div><h3>' + esc(t.titulo) + '</h3><div class="curso-n">' + esc(fechaLarga(t.vence)) + '</div></div><span class="pildora ' + (hechaT ? 'ok' : f.dias < 0 ? '' : f.dias <= 1 ? 'urg' : f.dias <= 3 ? 'prox' : '') + '">' + (hechaT ? 'Entregada' : f.texto) + '</span></div>' +
          (t.resumen ? '<div class="md">' + md(t.resumen) + '</div>' : '') +
          (t.descripcion ? '<details><summary>Instrucciones completas del profesor</summary><pre>' + esc(t.descripcion) + '</pre></details>' : '');
        const chk = h('label', { class: 'check' }, '<input type="checkbox" ' + (hechaT ? 'checked' : '') + '> Ya la entregué');
        chk.querySelector('input').onchange = e => { if (e.target.checked) S.tareasHechas[t.id] = hoy(); else delete S.tareasHechas[t.id]; guardar(); render(); };
        c.appendChild(chk);
        box.appendChild(c);
      });
      v.appendChild(box);
    });
  }

  /* =================== LECTURAS =================== */
  function vistaLecturas(v, arg) {
    v.innerHTML = '<div class="vista-tit"><h1>Lecturas</h1><p>El temario completo de tus materias, primero explicado fácil y luego en su versión completa. ¿Se te olvidó qué significa una palabra? Abre el <b>Diccionario</b>.</p></div>';
    if (arg === 'dicc') return vistaDiccionario(v);
    if (!A.materias || !A.materias.length) { v.appendChild(h('div', { class: 'vacio' }, 'No se cargaron las lecturas.')); return; }
    const [mid, ...tid] = (arg || '').split('_');
    const mat = A.materias.find(m => m.id === mid) || A.materias.find(m => m.id === 'redes') || A.materias[0];
    const tema = mat.unidades.flatMap(u => u.temas).find(t => t.id === tid.join('_')) || mat.unidades[0].temas[0];
    const sel = h('div', { class: 'lab-tabs' });
    sel.appendChild(h('a', { class: 'chip', href: '#lecturas-dicc' }, 'Diccionario'));
    A.materias.forEach(m => sel.appendChild(h('a', { class: 'chip' + (m === mat ? ' on' : ''), href: '#lecturas-' + m.id }, esc(m.nombre))));
    v.appendChild(sel);
    const grid = h('div', { class: 'lecturas-grid' });
    const ind = h('nav', { class: 'indice', 'aria-label': 'Temas' });
    mat.unidades.forEach(u => {
      ind.appendChild(h('h4', null, 'Unidad ' + u.n + ' · ' + esc(u.titulo)));
      u.temas.forEach(t => ind.appendChild(h('a', { href: '#lecturas-' + mat.id + '_' + t.id, class: t === tema ? 'on' : '' }, t.id + ' ' + esc(t.t))));
    });
    const art = h('article', { class: 'lectura' });
    const facil = (A.facil || {})[mat.id + ':' + tema.id];
    art.innerHTML = '<div class="lec-eti">' + esc(mat.nombre) + ' · ' + tema.id + '</div><h2>' + esc(tema.t) + '</h2>' +
      (facil ? '<div class="facil"><div class="lec-eti">Explicado fácil</div>' + md(facil) + '</div>' : '') +
      '<details' + (facil ? '' : ' open') + '><summary style="cursor:pointer;font-weight:700">Versión completa</summary><div class="md" style="margin-top:10px">' + md(tema.md) + '</div></details>';
    grid.append(ind, art);
    v.appendChild(grid);
    const actual = ind.querySelector('a.on');
    if (actual) setTimeout(() => actual.scrollIntoView({ block: 'nearest' }), 30);
  }

  function vistaDiccionario(v) {
    const sel = h('div', { class: 'lab-tabs' });
    sel.appendChild(h('a', { class: 'chip on', href: '#lecturas-dicc' }, 'Diccionario'));
    (A.materias || []).forEach(m => sel.appendChild(h('a', { class: 'chip', href: '#lecturas-' + m.id }, esc(m.nombre))));
    v.appendChild(sel);
    const G = window.GLOSARIO || {};
    ['redes', 'ia', 'is'].forEach(c => {
      const ks = Object.keys(G).filter(k => G[k].c === c);
      if (!ks.length) return;
      v.appendChild(h('h2', { class: 'dicc-h' }, { redes: 'Redes', ia: 'Inteligencia artificial', is: 'Ingeniería de software' }[c]));
      const box = h('div', { class: 'dicc' });
      ks.forEach(k => { const e = G[k]; box.appendChild(h('article', { class: 'dicc-e' }, '<h3>' + e.t + '</h3><p class="glo-c">' + e.corto + '</p><p>' + e.largo + '</p>' + (e.ej ? '<p class="glo-ej">' + e.ej + '</p>' : ''))); });
      v.appendChild(box);
    });
  }

  /* ---------- Avisos ---------- */
  let tAviso = null;
  function aviso(txt) {
    let t = $('.toast');
    if (!t) { t = h('div', { class: 'toast', role: 'status' }); document.body.appendChild(t); }
    t.textContent = txt;
    clearTimeout(tAviso);
    tAviso = setTimeout(() => t.remove(), 2600);
  }

  if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) window.aulaDev = { abrir: abrirLeccion, ir: n => { lec.i = n; pintarPaso(); }, tareas: l => { TAREAS = l; estadoTareas = 'lista'; render(); } };
  // Reemplaza las tareas mostradas (las usa Ajustes al importar el paquete personal)
  function cargarTareas(lista) {
    TAREAS = (lista || []).filter(t => t && t.titulo && t.vence).sort((a, b) => a.vence < b.vence ? -1 : 1);
    estadoTareas = 'lista';
    pintarTabs();
  }
  /* Dibujos hechos con letras (capas OSI, tramas…): en el teléfono se achica la letra hasta que quepan completos,
     para no cortar el dibujo ni obligar a moverse de lado. El código normal se parte en renglones. */
  function ajustarCodigos() {
    if (window.innerWidth > 640) return;
    document.querySelectorAll('pre.code:not([data-fit]), .wa-texto pre:not([data-fit])').forEach(pre => {
      if (!pre.clientWidth) return;                       // dentro de un cuadro cerrado: se ajusta cuando se abra
      pre.dataset.fit = '1';
      if (!/ {3,}/.test(pre.textContent)) return;
      pre.style.whiteSpace = 'pre';
      let t = parseFloat(getComputedStyle(pre).fontSize);
      while (pre.scrollWidth > pre.clientWidth + 1 && t > 8.5) { t -= 0.5; pre.style.fontSize = t + 'px'; }
      if (pre.scrollWidth > pre.clientWidth + 1) { pre.style.whiteSpace = 'pre-wrap'; pre.style.fontSize = ''; }   // no cabe ni así: se parte en renglones
    });
  }
  let tFit = null;
  new MutationObserver(() => { clearTimeout(tFit); tFit = setTimeout(ajustarCodigos, 60); }).observe(document.body, { childList: true, subtree: true });
  document.addEventListener('toggle', () => setTimeout(ajustarCodigos, 30), true);

  // Lo que un módulo puede usar sin tocar este archivo (ver docs/MODULOS.md)
  window.Aula = {
    estado: () => S, guardar, adoptar, tareas: () => TAREAS, tareaHecha: id => !!S.tareasHechas[id], faltan, cargarTareas,
    render, aviso, sumarXp, racha, xpHoy, pintarTabs,
    ir: r => { location.hash = '#' + r; },
    util: { h, esc, md, iconos: I },
    cursos: CURSOS,
    progreso() {
      const camino = CURSOS.reduce((n, c) => n + todas(c).length, 0);
      const web = (window.CURSOS_WEB || []).reduce((n, c) => n + c.niveles.reduce((m, nv) => m + nv.lecciones.length, 0), 0);
      return { camino: { hechas: Object.keys(S.lecciones).length, total: camino }, web: { hechas: Object.keys((S.web && S.web.lecciones) || {}).length, total: web } };
    }
  };
  render();
  conectar();
})();
