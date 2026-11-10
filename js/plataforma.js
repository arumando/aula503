/* Aula 503 — capa de plataforma.
   Todo lo que depende de DÓNDE corre la app vive aquí: almacenamiento, copias de seguridad,
   sincronización entre dispositivos, tareas, tutor y actualizaciones. El resto de la app
   (lecciones, simuladores, laboratorios) no sabe si está en una PWA, en Capacitor o en un artefacto.

   Expone window.Plataforma. Ver docs/ARQUITECTURA.md. */
(function (root) {
  'use strict';

  const CFG = Object.assign({ sync: '', tutor: '', tareas: 'datos/tareas.json' }, root.AULA_CONFIG || {});
  const VER = root.AULA_VERSION || { version: 'desarrollo', fecha: '', novedades: [] };

  /* ---------- Utilidades ---------- */
  const oyentes = {};
  const on = (ev, fn) => { (oyentes[ev] = oyentes[ev] || []).push(fn); };
  const emitir = (ev, d) => (oyentes[ev] || []).forEach(fn => { try { fn(d); } catch (e) { /* un oyente no tumba a los demás */ } });
  const ls = {
    leer(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    poner(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } },
    quitar(k) { try { localStorage.removeItem(k); } catch (e) { /* sin almacenamiento */ } }
  };
  const esObj = x => x && typeof x === 'object' && !Array.isArray(x);
  const estable = x => JSON.stringify(x, (k, v) => esObj(v) ? Object.keys(v).sort().reduce((o, c) => { o[c] = v[c]; return o; }, {}) : v);
  const iguales = (a, b) => estable(a) === estable(b);
  const hoyIso = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };

  /* ---------- Entorno ---------- */
  const ua = navigator.userAgent || '';
  const entorno = {
    ios: /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1),
    instalada: (root.matchMedia && root.matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true,
    nativa: !!(root.Capacitor && root.Capacitor.isNativePlatform && root.Capacitor.isNativePlatform()),
    artefacto: !!(root.claude && root.claude.use),
    // En iPhone solo Safari (y desde iOS 16.4 otros navegadores con el menú Compartir) puede agregar a la pantalla de inicio
    safari: /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(ua)
  };

  /* ---------- Almacenamiento: persistencia y espacio ---------- */
  const almacen = {
    async estado() {
      const r = { persistente: null, usado: null, cuota: null };
      try {
        if (navigator.storage && navigator.storage.persisted) r.persistente = await navigator.storage.persisted();
        if (navigator.storage && navigator.storage.estimate) { const e = await navigator.storage.estimate(); r.usado = e.usage; r.cuota = e.quota; }
      } catch (e) { /* navegador sin StorageManager */ }
      return r;
    },
    // Pide al navegador que no borre los datos por falta de espacio. Safari lo concede a las apps instaladas.
    async proteger() {
      try { return !!(navigator.storage && navigator.storage.persist && await navigator.storage.persist()); } catch (e) { return false; }
    }
  };

  /* ---------- Copias automáticas (IndexedDB) ----------
     Una copia por día de uso (las últimas 14) y una antes de cada importación o restauración.
     Protegen contra un error de la app o una importación equivocada, no contra perder el teléfono:
     para eso están el respaldo en archivo y la sincronización. */
  const MAX_COPIAS = 14;
  function bd() {
    return new Promise((ok, mal) => {
      const r = indexedDB.open('aula503', 1);
      r.onupgradeneeded = () => r.result.createObjectStore('copias');
      r.onsuccess = () => ok(r.result);
      r.onerror = () => mal(r.error);
    });
  }
  async function conAlmacen(modo, fn) {
    const d = await bd();
    return new Promise((ok, mal) => {
      const t = d.transaction('copias', modo);
      const pedido = fn(t.objectStore('copias'));
      t.oncomplete = () => { d.close(); ok(pedido && pedido.result); };
      t.onerror = t.onabort = () => { d.close(); mal(t.error); };
    });
  }
  const copias = {
    async guardar(estado, motivo) {
      const clave = motivo ? hoyIso() + ' ' + new Date().toTimeString().slice(0, 8) + ' ' + motivo : hoyIso();
      try {
        await conAlmacen('readwrite', s => s.put({ fecha: new Date().toISOString(), motivo: motivo || 'diaria', estado: JSON.parse(JSON.stringify(estado)) }, clave));
        const claves = await conAlmacen('readonly', s => s.getAllKeys());
        const sobran = claves.sort().slice(0, Math.max(0, claves.length - MAX_COPIAS));
        if (sobran.length) await conAlmacen('readwrite', s => { sobran.forEach(k => s.delete(k)); });
        return true;
      } catch (e) { return false; }
    },
    async lista() {
      try {
        const [claves, valores] = await Promise.all([conAlmacen('readonly', s => s.getAllKeys()), conAlmacen('readonly', s => s.getAll())]);
        return claves.map((clave, i) => ({ clave, fecha: valores[i].fecha, motivo: valores[i].motivo, xp: (valores[i].estado || {}).xp || 0, lecciones: Object.keys((valores[i].estado || {}).lecciones || {}).length }))
          .sort((a, b) => a.clave < b.clave ? 1 : -1);
      } catch (e) { return []; }
    },
    async leer(clave) {
      try { const c = await conAlmacen('readonly', s => s.get(clave)); return c ? c.estado : null; } catch (e) { return null; }
    }
  };
  let tCopia = null;
  function programarCopia(leer) { clearTimeout(tCopia); tCopia = setTimeout(() => copias.guardar(leer()), 5000); }

  /* ---------- Respaldo en archivo o texto ---------- */
  const respaldo = {
    armar(estado) { return { app: 'aula503', formato: 1, version: VER.version, fecha: new Date().toISOString(), estado }; },
    texto(estado) { return JSON.stringify(this.armar(estado)); },
    // Devuelve 'compartido', 'descargado' o 'cancelado'
    async exportar(estado) {
      const nombre = 'aula503-respaldo-' + hoyIso() + '.json';
      const txt = JSON.stringify(this.armar(estado), null, 1);
      // En el iPhone la hoja de Compartir permite «Guardar en Archivos», enviarlo por correo, AirDrop, etc.
      if (entorno.ios && navigator.canShare) {
        try {
          const archivo = new File([txt], nombre, { type: 'application/json' });
          if (navigator.canShare({ files: [archivo] })) { await navigator.share({ files: [archivo], title: 'Respaldo de Aula 503' }); return 'compartido'; }
        } catch (e) { if (e && e.name === 'AbortError') return 'cancelado'; }
      }
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([txt], { type: 'application/json' }));
      a.download = nombre;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
      return 'descargado';
    },
    // Acepta un respaldo de la app o el documento de progreso tal como estaba en el artefacto
    leer(texto) {
      let d;
      try { d = JSON.parse(String(texto).trim()); } catch (e) { throw new Error('Ese texto no es un respaldo de Aula 503 (no se pudo leer).'); }
      const estado = d && d.app === 'aula503' && esObj(d.estado) ? d.estado : d;
      if (!esObj(estado) || typeof estado.xp !== 'number' || !esObj(estado.lecciones)) throw new Error('El archivo no tiene el formato de un respaldo de Aula 503.');
      return estado;
    }
  };

  /* ---------- Fusión de dos copias del progreso ----------
     Regla: nunca se pierde avance. Números → el mayor; listas de lecciones, días y retos → la unión;
     textos → los del lado que se guardó más recientemente; ATOMICAS → enteras del lado más reciente. */
  const ATOMICAS = ['sandbox', 'curso', 'meta'];
  function fusionar(a, b) {
    const aNuevo = (a.mod || 0) >= (b.mod || 0);
    const mezclar = (x, y) => {
      if (esObj(x) && esObj(y)) { const o = {}; new Set(Object.keys(x).concat(Object.keys(y))).forEach(k => { o[k] = k in x ? (k in y ? mezclar(x[k], y[k]) : x[k]) : y[k]; }); return o; }
      if (typeof x === 'number' && typeof y === 'number') return Math.max(x, y);
      if (x === undefined || x === null) return y;
      if (y === undefined || y === null) return x;
      return aNuevo ? x : y;
    };
    const out = mezclar(a, b);
    const [nuevo, viejo] = aNuevo ? [a, b] : [b, a];
    ATOMICAS.forEach(k => { out[k] = nuevo[k] !== undefined && nuevo[k] !== null ? nuevo[k] : viejo[k]; });
    out.mod = Math.max(a.mod || 0, b.mod || 0);
    return out;
  }

  /* ---------- Sincronización entre dispositivos ----------
     Contrato del servidor (servidor/nucleo.mjs):
       GET  {sync}/v1/progreso   Authorization: Bearer <clave>            → 200 {rev, datos} | 404
       PUT  {sync}/v1/progreso   If-Match: <rev> (0 = crear), cuerpo {datos} → 200 {rev} | 412 (alguien escribió antes)
     La clave se genera en el dispositivo y es el único secreto: quien la tenga puede leer y escribir ese progreso. */
  const K_SYNC = 'aula503.sync';
  const sync = {
    estado: CFG.sync ? 'sin-vincular' : 'sin-servidor',   // sin-servidor | sin-vincular | sincronizando | al-dia | sin-conexion | error
    detalle: '', ultima: null, puente: null, enCurso: false, pendiente: false, t: null,
    cfg() { return ls.leer(K_SYNC) || {}; },
    disponible() { return !!CFG.sync; },
    vinculado() { return !!(CFG.sync && this.cfg().clave); },
    nuevaClave() {
      const abc = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';   // sin letras que se confunden (I, L, O, 0, 1)
      const b = crypto.getRandomValues(new Uint8Array(25));
      return Array.from(b, x => abc[x % abc.length]).join('').replace(/(.{5})(?=.)/g, '$1-');
    },
    normalizar(c) { return String(c || '').toUpperCase().replace(/[^A-Z0-9]/g, ''); },
    async vincular(clave, alta) {
      const c = this.normalizar(clave);
      if (c.length < 20) throw new Error('La clave debe tener 25 letras y números.');
      ls.poner(K_SYNC, { clave: c, alta: alta || '' });
      this.silencio = true;                 // sin avisos intermedios mientras se prueba la clave
      const ok = await this.ahora().finally(() => { this.silencio = false; });
      if (!ok) { const d = this.detalle; ls.quitar(K_SYNC); this.poner('sin-vincular'); throw new Error(d || 'No se pudo conectar con el servidor.'); }
      return true;
    },
    desvincular() { ls.quitar(K_SYNC); this.poner('sin-vincular'); },
    poner(estado, detalle) { this.estado = estado; this.detalle = detalle || ''; if (!this.silencio) emitir('sync', this); },
    programar(ms) { if (!this.vinculado()) return; clearTimeout(this.t); this.t = setTimeout(() => this.ahora(), ms === undefined ? 3000 : ms); },
    pedir(metodo, cuerpo, rev) {
      const c = this.cfg();
      const cab = { Authorization: 'Bearer ' + c.clave };
      if (cuerpo) { cab['Content-Type'] = 'application/json'; cab['If-Match'] = String(rev || 0); if (c.alta) cab['X-Aula-Alta'] = c.alta; }
      return fetch(CFG.sync.replace(/\/+$/, '') + '/v1/progreso', { method: metodo, headers: cab, body: cuerpo ? JSON.stringify(cuerpo) : undefined, cache: 'no-store' });
    },
    async ahora() {
      if (!this.vinculado() || !this.puente) return false;
      if (this.enCurso) { this.pendiente = true; return false; }
      this.enCurso = true;
      this.poner('sincronizando');
      let ok = false;
      try {
        for (let intento = 0; intento < 3 && !ok; intento++) {
          const r = await this.pedir('GET');
          let remoto = null, rev = 0;
          if (r.status === 200) { const j = await r.json(); remoto = j.datos; rev = j.rev; }
          else if (r.status !== 404) throw new Error(r.status === 401 || r.status === 403 ? 'El servidor rechazó la clave.' : 'El servidor respondió ' + r.status + '.');
          const local = this.puente.leer();
          const fusion = remoto ? fusionar(local, remoto) : local;
          if (remoto && !iguales(fusion, local)) this.puente.adoptar(fusion);
          if (remoto && iguales(fusion, remoto)) { ok = true; break; }
          const w = await this.pedir('PUT', { datos: fusion }, rev);
          if (w.status === 412) continue;                       // otro dispositivo escribió entre la lectura y la escritura: se repite
          if (w.status === 403) throw new Error('El servidor pide un código de invitación válido para crear una clave nueva.');
          if (!w.ok) throw new Error('El servidor respondió ' + w.status + ' al guardar.');
          ok = true;
        }
        if (!ok) throw new Error('Otro dispositivo está escribiendo; se intentará de nuevo.');
        this.ultima = new Date();
        this.poner('al-dia');
      } catch (e) {
        this.poner(e instanceof TypeError ? 'sin-conexion' : 'error', e instanceof TypeError ? 'Sin conexión con el servidor.' : e.message);
      } finally {
        this.enCurso = false;
        if (this.pendiente) { this.pendiente = false; this.programar(); }
      }
      return ok;
    }
  };

  /* ---------- Tareas (archivo que se actualiza desde el servidor, sin publicar una versión nueva) ---------- */
  async function tareas() {
    try {
      const r = await fetch(CFG.tareas, { cache: 'no-cache' });
      if (r.ok) { const lista = await r.json(); if (Array.isArray(lista)) { ls.poner('aula503.tareas', lista); return lista; } }
    } catch (e) { /* sin conexión: se usan las últimas que se bajaron */ }
    return ls.leer('aula503.tareas');
  }

  /* ---------- Tutor de IA ----------
     Devuelve false si no hay tutor en este entorno (la app muestra un mensaje). Lanza {code:'rate_limited'} si está saturado.
     Contrato previsto del servidor: POST {tutor} con {prompt} → texto que llega por partes. */
  async function tutor(prompt, alTexto) {
    if (entorno.artefacto) {
      const sample = await root.claude.use('sample').catch(() => null);
      if (!sample) return false;
      await sample(prompt, { cache: false, onText: ({ text }) => alTexto(text) });
      return true;
    }
    if (!CFG.tutor) return false;
    const r = await fetch(CFG.tutor, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + (sync.cfg().clave || '') }, body: JSON.stringify({ prompt }) });
    if (r.status === 429) throw Object.assign(new Error('ocupado'), { code: 'rate_limited' });
    if (!r.ok || !r.body) throw new Error('tutor ' + r.status);
    const lector = r.body.getReader(), dec = new TextDecoder();
    let texto = '';
    for (;;) { const { done, value } = await lector.read(); if (done) break; texto += dec.decode(value, { stream: true }); alTexto(texto); }
    return true;
  }

  /* ---------- Actualizaciones (service worker) ----------
     sw.js lo genera herramientas/construir.mjs con la lista de archivos y sus huellas. Cuando se publica
     una versión nueva, el navegador instala el sw nuevo en segundo plano (solo baja los archivos que
     cambiaron) y aquí avisamos para que la persona decida cuándo recargar. */
  const actualizaciones = {
    reg: null, lista: false, aplicando: false, ultimaBusqueda: 0, remota: null,
    soportadas() { return 'serviceWorker' in navigator && root.isSecureContext && !entorno.nativa && !entorno.artefacto; },
    async iniciar() {
      if (!this.soportadas()) return;
      try {
        const reg = this.reg = await navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' });
        const marcar = () => { this.lista = true; emitir('actualizacion', this); };
        const vigilar = w => { if (w) w.addEventListener('statechange', () => { if (w.state === 'installed' && navigator.serviceWorker.controller) marcar(); }); };
        if (reg.waiting && navigator.serviceWorker.controller) marcar();
        vigilar(reg.installing);
        reg.addEventListener('updatefound', () => vigilar(reg.installing));
        let recargando = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => { if (this.aplicando && !recargando) { recargando = true; location.reload(); } });
      } catch (e) { /* en desarrollo no hay sw.js: la app funciona igual, sin modo sin conexión */ }
    },
    // Pregunta al servidor si hay versión nueva. Devuelve {hay, remota}
    async buscar() {
      this.ultimaBusqueda = Date.now();
      try { const r = await fetch('version.json', { cache: 'no-store' }); if (r.ok) this.remota = await r.json(); } catch (e) { /* sin conexión */ }
      try { if (this.reg) await this.reg.update(); } catch (e) { /* sin conexión */ }
      const hay = this.lista || !!(this.remota && VER.compilacion && this.remota.compilacion !== VER.compilacion);
      emitir('actualizacion', this);
      return { hay, remota: this.remota };
    },
    aplicar() {
      this.aplicando = true;
      const w = this.reg && this.reg.waiting;
      if (w) w.postMessage('saltar'); else location.reload();
    },
    // true la primera vez que se abre una versión distinta a la última vista
    hayNovedades() { const visto = ls.leer('aula503.visto'); return !!visto && visto !== VER.version; },
    marcarVisto() { ls.poner('aula503.visto', VER.version); }
  };

  /* ---------- Arranque: enlaza la plataforma con el estado de la app ----------
     puente = { leer(): estado actual, adoptar(estado): reemplazarlo sin volver a disparar el guardado } */
  function iniciar(puente) {
    sync.puente = puente;
    actualizaciones.iniciar();
    if (!ls.leer('aula503.visto')) actualizaciones.marcarVisto();
    if (entorno.instalada) almacen.proteger();
    if (sync.vinculado()) sync.programar(600);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState !== 'visible') return;
      // El iPhone deja las apps web dormidas por días: al volver se revisa si hay versión nueva y se sincroniza
      if (Date.now() - actualizaciones.ultimaBusqueda > 30 * 60 * 1000) actualizaciones.buscar();
      sync.programar(800);
    });
    root.addEventListener('online', () => sync.programar(500));
  }
  // La app llama a esto en cada guardado
  function alGuardar(leer) { programarCopia(leer); sync.programar(); }

  root.Plataforma = { config: CFG, version: VER, entorno, on, almacen, copias, respaldo, fusionar, sync, tareas, tutor, actualizaciones, iniciar, alGuardar };
})(window);
