/* Aula 503 — módulo «Ajustes»: avance, instalación, actualizaciones, copias de seguridad,
   sincronización, almacenamiento, tema y módulos instalados.
   Es un módulo normal: se registra en AULA_VISTAS y usa window.Aula y window.Plataforma,
   sin tocar js/app.js. Sirve de ejemplo para crear otros (docs/MODULOS.md). */
(function (root) {
  'use strict';
  const PF = root.Plataforma;
  if (!PF) return;
  const ICONO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.2"/><path d="M19.4 13.5a7.6 7.6 0 0 0 0-3l2-1.5-2-3.4-2.3.9a7.6 7.6 0 0 0-2.6-1.5L14 2.5h-4l-.5 2.5a7.6 7.6 0 0 0-2.6 1.5l-2.3-.9-2 3.4 2 1.5a7.6 7.6 0 0 0 0 3l-2 1.5 2 3.4 2.3-.9a7.6 7.6 0 0 0 2.6 1.5l.5 2.5h4l.5-2.5a7.6 7.6 0 0 0 2.6-1.5l2.3.9 2-3.4z"/></svg>';
  const K_TEMA = 'aula503.tema';

  const megas = n => n == null ? '—' : n < 1048576 ? Math.max(1, Math.round(n / 1024)) + ' KB' : (n / 1048576).toFixed(n < 10485760 ? 1 : 0) + ' MB';
  const fechaCorta = iso => { try { return new Date(iso).toLocaleString('es-MX', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }); } catch (e) { return iso; } };

  function pintar(v, arg, Aula) {
    const { h, esc } = Aula.util;
    const S = Aula.estado();
    const tarjeta = (titulo, html) => { const t = h('section', { class: 'tarjeta aj' }, '<h2>' + titulo + '</h2>' + (html || '')); v.appendChild(t); return t; };
    const boton = (txt, cls, fn) => { const b = h('button', { type: 'button', class: 'btn ' + (cls || '') }, txt); b.onclick = fn; return b; };
    const fila = (...nodos) => { const f = h('div', { class: 'aj-fila' }); nodos.forEach(n => f.appendChild(n)); return f; };
    const repintar = () => { if (location.hash.slice(1).split('-')[0] === 'ajustes') Aula.render(); };

    v.innerHTML = '<div class="vista-tit"><h1>Ajustes</h1><p>Tu avance, las copias de seguridad y las actualizaciones de la app.</p></div>';

    /* ----- Tu avance ----- */
    const p = Aula.progreso();
    const t1 = tarjeta('Tu avance',
      '<div class="aj-datos"><div><b>' + S.xp + '</b><span>XP en total</span></div><div><b>' + Aula.racha() + '</b><span>días seguidos</span></div>' +
      '<div><b>' + p.camino.hechas + '<small> de ' + p.camino.total + '</small></b><span>lecciones del Camino</span></div>' +
      '<div><b>' + p.web.hechas + '<small> de ' + p.web.total + '</small></b><span>lecciones de la Academia</span></div></div>' +
      '<p>Meta diaria: cuántos puntos quieres juntar cada día para mantener tu racha.</p>');
    const metas = h('div', { class: 'aj-fila', role: 'group', 'aria-label': 'Meta diaria' });
    [[10, 'Tranquila'], [20, 'Normal'], [30, 'Constante'], [50, 'Intensa']].forEach(([n, nombre]) => {
      const b = h('button', { type: 'button', class: 'chip' + (S.meta === n ? ' on' : ''), 'aria-pressed': S.meta === n }, n + ' XP · ' + nombre);
      b.onclick = () => { S.meta = n; Aula.guardar(); Aula.render(); };
      metas.appendChild(b);
    });
    t1.appendChild(metas);

    /* ----- Instalar ----- */
    if (!PF.entorno.instalada && !PF.entorno.nativa) {
      tarjeta('Instalar en tu ' + (PF.entorno.ios ? 'iPhone' : 'dispositivo'), PF.entorno.ios
        ? '<ol class="aj-pasos"><li>Abre esta página en <b>Safari</b>.</li><li>Toca el botón <b>Compartir</b> (el cuadro con una flecha hacia arriba).</li><li>Elige <b>Agregar a pantalla de inicio</b> y deja activado <b>Abrir como app web</b>.</li><li>Toca <b>Agregar</b>. El icono de Aula 503 aparece junto a tus otras apps.</li></ol><p>Ábrela siempre desde ese icono: así funciona a pantalla completa, sin internet, y tu avance queda guardado en la app.</p>'
        : '<p>En Chrome o Edge: abre el menú del navegador y elige <b>Instalar Aula 503</b> (o el icono de instalar en la barra de direcciones). Se abrirá en su propia ventana y funcionará sin internet.</p>');
    }

    /* ----- Actualizaciones ----- */
    const A = PF.actualizaciones;
    const t3 = tarjeta('Actualizaciones',
      '<p>Versión instalada: <b>' + esc(PF.version.version) + '</b>' + (PF.version.fecha ? ' · ' + esc(PF.version.fecha) : '') + (PF.version.compilacion ? ' <span class="mono aj-tenue">(' + esc(PF.version.compilacion) + ')</span>' : '') + '</p>');
    const estadoAct = h('p', { class: 'aj-estado', 'aria-live': 'polite' });
    const bBuscar = boton('Buscar actualización', '', async () => {
      bBuscar.disabled = true; estadoAct.textContent = 'Buscando…';
      const r = await A.buscar();
      bBuscar.disabled = false;
      if (r.hay) repintar(); else estadoAct.textContent = r.remota ? 'Tienes la versión más reciente.' : 'No se pudo consultar (¿sin internet?).';
    });
    if (!A.soportadas()) estadoAct.textContent = 'En esta vista las actualizaciones llegan al recargar la página.';
    else if (A.lista) {
      estadoAct.innerHTML = '<b class="bueno">Hay una versión nueva lista.</b> Tu avance se conserva.';
      t3.appendChild(estadoAct);
      t3.appendChild(fila(boton('Actualizar ahora', 'btn-primario', () => A.aplicar())));
    }
    if (!A.lista) { t3.appendChild(estadoAct); if (A.soportadas()) t3.appendChild(fila(bBuscar)); }
    if ((PF.version.novedades || []).length) t3.appendChild(h('details', { class: 'aj-det' }, '<summary>Novedades de esta versión</summary><ul>' + PF.version.novedades.map(n => '<li>' + esc(n) + '</li>').join('') + '</ul>'));

    /* ----- Copia de seguridad ----- */
    const t4 = tarjeta('Copia de seguridad', '<p>Tu avance se guarda solo en este dispositivo cada vez que haces algo. Un respaldo es un archivo con todo tu avance: guárdalo fuera del teléfono para no perderlo si lo cambias o se descompone.</p>');
    const estadoResp = h('p', { class: 'aj-estado', 'aria-live': 'polite' });
    const entrada = h('input', { type: 'file', accept: '.json,application/json,text/plain', hidden: '' });
    const importar = async (texto) => {
      try {
        const nuevo = PF.respaldo.leer(texto);
        const lecc = Object.keys(nuevo.lecciones || {}).length;
        if (!root.confirm('El respaldo tiene ' + (nuevo.xp || 0) + ' XP y ' + lecc + ' lecciones del Camino.\n\nSe va a COMBINAR con lo que tienes aquí (no se pierde avance de ninguno de los dos). ¿Continuar?')) return;
        await PF.copias.guardar(Aula.estado(), 'antes de importar');
        Aula.adoptar(PF.fusionar(Aula.estado(), nuevo));
        Aula.guardar();
        Aula.aviso('Respaldo importado.');
      } catch (e) { estadoResp.innerHTML = '<span class="malo">' + esc(e.message) + '</span>'; }
    };
    entrada.onchange = () => { const f = entrada.files[0]; if (f) f.text().then(importar); entrada.value = ''; };
    t4.appendChild(fila(
      boton('Guardar respaldo', 'btn-primario', async () => { const r = await PF.respaldo.exportar(Aula.estado()); estadoResp.textContent = r === 'cancelado' ? '' : r === 'compartido' ? 'Listo. Elige «Guardar en Archivos» o envíatelo.' : 'Se descargó el archivo de respaldo.'; }),
      boton('Importar archivo', '', () => entrada.click()),
      boton('Copiar como texto', '', async () => { try { await navigator.clipboard.writeText(PF.respaldo.texto(Aula.estado())); estadoResp.textContent = 'Copiado. Pégalo en una nota o mensaje para guardarlo.'; } catch (e) { estadoResp.textContent = 'No se pudo copiar; usa «Guardar respaldo».'; } }),
      boton('Pegar texto', '', () => { const t = root.prompt('Pega aquí el texto del respaldo:'); if (t) importar(t); })
    ));
    t4.append(entrada, estadoResp);
    const det = h('details', { class: 'aj-det' }, '<summary>Copias automáticas en este dispositivo</summary><p class="aj-tenue">La app guarda sola una copia por cada día que la usas (las últimas 14). Sirven para regresar a un día anterior.</p><div class="aj-copias">Cargando…</div>');
    t4.appendChild(det);
    PF.copias.lista().then(lista => {
      const caja = det.querySelector('.aj-copias');
      caja.innerHTML = lista.length ? '' : 'Todavía no hay copias.';
      lista.forEach(c => {
        const f = h('div', { class: 'aj-copia' }, '<span><b>' + esc(fechaCorta(c.fecha)) + '</b> · ' + c.xp + ' XP · ' + c.lecciones + ' lecciones' + (c.motivo !== 'diaria' ? ' <small>(' + esc(c.motivo) + ')</small>' : '') + '</span>');
        f.appendChild(boton('Restaurar', 'chip mini', async () => {
          if (!root.confirm('Tu avance actual se REEMPLAZA por el de esta copia (' + c.xp + ' XP). Antes se guarda una copia de lo que tienes ahora. ¿Continuar?')) return;
          const estado = await PF.copias.leer(c.clave);
          if (!estado) return;
          await PF.copias.guardar(Aula.estado(), 'antes de restaurar');
          Aula.adoptar(estado); Aula.guardar(); Aula.aviso('Copia restaurada.');
        }));
        caja.appendChild(f);
      });
    });

    /* ----- Sincronización ----- */
    const Y = PF.sync;
    const t5 = tarjeta('Sincronizar entre dispositivos');
    if (!Y.disponible()) {
      t5.appendChild(h('p', null, 'Todavía no hay un servidor de sincronización configurado, así que el avance de tu iPhone y el de tu computadora van por separado. Mientras tanto puedes pasar tu avance de uno a otro con <b>Guardar respaldo</b> e <b>Importar archivo</b>.'));
      t5.appendChild(h('p', { class: 'aj-tenue' }, 'Para activarla: publica el servidor de la carpeta <code>servidor/</code> y escribe su dirección en <code>config.js</code>.'));
    } else if (!Y.vinculado()) {
      t5.appendChild(h('p', null, 'Usa la misma <b>clave</b> en todos tus dispositivos para que compartan el avance. Quien tenga la clave puede ver y cambiar tu avance: no la publiques.'));
      const alta = h('input', { type: 'text', class: 'aj-in', placeholder: 'Código de invitación (si tu servidor lo pide)', autocapitalize: 'off', autocomplete: 'off' });
      const clave = h('input', { type: 'text', class: 'aj-in mono', placeholder: 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX', autocapitalize: 'characters', autocomplete: 'off', spellcheck: 'false' });
      const est = h('p', { class: 'aj-estado', 'aria-live': 'polite' });
      const vincular = async (c) => { est.textContent = 'Conectando…'; try { await Y.vincular(c, alta.value.trim()); Aula.aviso('Dispositivo vinculado.'); repintar(); } catch (e) { est.innerHTML = '<span class="malo">' + esc(e.message) + '</span>'; } };
      t5.append(h('h3', null, 'Es mi primer dispositivo'), alta, fila(boton('Crear clave nueva', 'btn-primario', () => vincular(Y.nuevaClave()))),
        h('h3', null, 'Ya tengo una clave'), clave, fila(boton('Vincular este dispositivo', '', () => vincular(clave.value))), est);
    } else {
      const TEXTO = { sincronizando: 'Sincronizando…', 'al-dia': 'Al día', 'sin-conexion': 'Sin conexión: se sincroniza al volver el internet', error: 'Error' };
      const c = Y.cfg().clave.replace(/(.{5})(?=.)/g, '$1-');
      t5.appendChild(h('p', null, 'Estado: <b>' + esc(TEXTO[Y.estado] || Y.estado) + '</b>' + (Y.detalle ? ' — ' + esc(Y.detalle) : '') + (Y.ultima ? ' · última vez ' + esc(fechaCorta(Y.ultima)) : '')));
      t5.appendChild(h('p', null, 'Tu clave (escríbela en tu otro dispositivo): <br><b class="mono aj-clave">' + esc(c) + '</b>'));
      t5.appendChild(fila(
        boton('Sincronizar ahora', 'btn-primario', async () => { await Y.ahora(); repintar(); }),
        boton('Copiar clave', '', () => navigator.clipboard.writeText(c).then(() => Aula.aviso('Clave copiada.'), () => {})),
        boton('Desvincular', 'btn-texto', () => { if (root.confirm('Este dispositivo dejará de sincronizarse. Tu avance se queda aquí. ¿Continuar?')) { Y.desvincular(); repintar(); } })
      ));
    }

    /* ----- Apariencia ----- */
    const t6 = tarjeta('Apariencia');
    const temaAct = localStorage.getItem(K_TEMA) || 'auto';
    const temas = h('div', { class: 'seg', role: 'group', 'aria-label': 'Tema' });
    [['auto', 'Automático'], ['light', 'Claro'], ['dark', 'Oscuro']].forEach(([k, n]) => {
      const b = h('button', { type: 'button', class: 'seg-b' + (temaAct === k ? ' on' : ''), 'aria-pressed': temaAct === k }, n);
      b.onclick = () => {
        if (k === 'auto') { localStorage.removeItem(K_TEMA); document.documentElement.removeAttribute('data-theme'); }
        else { localStorage.setItem(K_TEMA, k); document.documentElement.setAttribute('data-theme', k); }
        Aula.render();
      };
      temas.appendChild(b);
    });
    t6.appendChild(temas);

    /* ----- Almacenamiento ----- */
    const t7 = tarjeta('Almacenamiento', '<p class="aj-alm">Revisando…</p>');
    PF.almacen.estado().then(e => {
      const pEl = t7.querySelector('.aj-alm');
      pEl.innerHTML = 'La app ocupa <b>' + megas(e.usado) + '</b> en este dispositivo. ' +
        (e.persistente === true ? '<span class="bueno">Datos protegidos:</span> el sistema no los borra para liberar espacio.'
          : e.persistente === false ? 'Datos <b>sin proteger</b>: si el dispositivo se queda sin espacio o pasas mucho tiempo sin abrir la app, el sistema podría borrarlos.' + (PF.entorno.instalada ? '' : ' Instalar la app en la pantalla de inicio los protege.')
            : '');
      if (e.persistente === false) t7.appendChild(fila(boton('Proteger mis datos', '', async () => { const ok = await PF.almacen.proteger(); Aula.aviso(ok ? 'Datos protegidos.' : 'El navegador no lo permitió. Instala la app y haz un respaldo.'); repintar(); })));
    });

    /* ----- Módulos ----- */
    const mods = root.AULA_MODULOS || [];
    tarjeta('Módulos instalados', '<ul class="aj-mods">' + mods.map(m => '<li><span>' + esc(m.nombre) + '</span><span class="aj-tenue mono">v' + esc(m.version || '1') + ((root.AULA_CARGA || {})[m.id] === 'error' ? ' · <span class="malo">no cargó</span>' : '') + '</span></li>').join('') + '</ul>');
  }

  root.AULA_VISTAS = root.AULA_VISTAS || [];
  root.AULA_VISTAS.push({ id: 'ajustes', titulo: 'Ajustes', icono: ICONO, lugar: 'cabecera', punto: () => PF.actualizaciones.lista, pintar });
  PF.on('sync', () => { if (location.hash.slice(1).split('-')[0] === 'ajustes' && root.Aula && PF.sync.estado !== 'sincronizando') root.Aula.render(); });
})(window);
