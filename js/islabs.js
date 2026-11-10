/* Aula 503 — laboratorios de Ingeniería de Software.
   Clasifica (tarjetas a grupos), Proyecto (cascada contra ágil) y Sprint (Scrum con tablero). */
(function (root) {
  'use strict';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const h = (tag, attrs, html) => { const e = document.createElement(tag); if (attrs) Object.keys(attrs).forEach(k => k === 'class' ? (e.className = attrs[k]) : e.setAttribute(k, attrs[k])); if (html != null) e.innerHTML = html; return e; };
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const lento = () => !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const T = (k, t) => (root.T ? root.T(k, t) : t);
  const barajar = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  /* =================================================================
     1) CLASIFICA: aparece una tarjeta y la mandas a su grupo.
     Si te equivocas te dice por qué y la vuelve a poner al final.
     ================================================================= */
  function Clasifica(opts) {
    const o = Object.assign({ alCambiar: () => {}, grupos: [], items: [], pregunta: '¿A qué grupo pertenece?' }, opts || {});
    const el = h('div', { class: 'lab lab-clas' });
    let cola, colocados, errores, primeraVez;
    function iniciar() {
      cola = barajar(o.items.map((it, i) => i));
      colocados = {}; o.grupos.forEach(g => { colocados[g.id] = []; });
      errores = 0; primeraVez = new Set();
      pintar();
    }
    function pintar(retro) {
      const total = o.items.length, hechos = total - cola.length;
      el.innerHTML = '<div class="clas-prog"><span>' + hechos + ' de ' + total + '</span><div class="barra-prog"><i style="width:' + Math.round(hechos / total * 100) + '%"></i></div></div>';
      if (retro) el.appendChild(h('div', { class: 'clas-retro ' + (retro.ok ? 'ok' : 'mal'), role: 'status' }, retro.html));
      if (cola.length) {
        const it = o.items[cola[0]];
        const carta = h('div', { class: 'clas-carta' }, '<small>' + o.pregunta + '</small><p>' + it.t + '</p>');
        el.appendChild(carta);
        const bs = h('div', { class: 'clas-botones' });
        o.grupos.forEach(g => {
          const b = h('button', { type: 'button', class: 'clas-grupo-b' }, '<b>' + g.nombre + '</b>' + (g.desc ? '<small>' + g.desc + '</small>' : ''));
          b.onclick = () => elegir(g.id);
          bs.appendChild(b);
        });
        el.appendChild(bs);
      } else {
        el.appendChild(h('div', { class: 'clas-fin' }, '<b>' + (errores ? '¡Listo! Te equivocaste ' + errores + (errores === 1 ? ' vez' : ' veces') + ', pero ya quedó todo en su lugar.' : '¡Perfecto! Todo en su lugar a la primera.') + '</b>'));
        const otra = h('button', { type: 'button', class: 'btn' }, 'Volver a jugar');
        otra.onclick = iniciar;
        el.appendChild(otra);
        if (o.diagrama === 'casos') el.appendChild(diagramaCasos());
      }
      const cajas = h('div', { class: 'clas-cajas' });
      o.grupos.forEach(g => {
        const c = h('div', { class: 'clas-caja' }, '<div class="clas-caja-t">' + g.nombre + ' <span>' + colocados[g.id].length + '</span></div>' + colocados[g.id].map(i => '<div class="clas-item">' + o.items[i].t + '</div>').join(''));
        cajas.appendChild(c);
      });
      el.appendChild(cajas);
    }
    function elegir(gid) {
      const i = cola[0], it = o.items[i];
      const g = o.grupos.find(x => x.id === it.g);
      if (gid === it.g) {
        cola.shift(); colocados[gid].push(i);
        pintar({ ok: true, html: '<b>✓ Correcto: ' + g.nombre + '.</b> ' + (it.por || '') });
        if (!cola.length) o.alCambiar({ tipo: 'clasifica', errores, total: o.items.length });
      } else {
        errores++;
        cola.push(cola.shift());
        pintar({ ok: false, html: '<b>✗ No va en «' + o.grupos.find(x => x.id === gid).nombre + '», va en «' + g.nombre + '».</b> ' + (it.por || '') + ' <i>La volverás a ver al final.</i>' });
      }
    }
    // Dibuja un diagrama de casos de uso con lo que clasificó el alumno
    function diagramaCasos() {
      const W = 640, filas = Math.max(...o.grupos.map(g => colocados[g.id].length)) || 1;
      const alto = o.grupos.length * (filas * 46 + 30) + 40;
      let y = 30, svg = '<svg class="casos" viewBox="0 0 ' + W + ' ' + alto + '" role="img" aria-label="Diagrama de casos de uso"><rect x="230" y="10" width="390" height="' + (alto - 20) + '" rx="12" class="cu-sistema"/><text x="425" y="30" class="cu-sis-t">App de la tienda</text>';
      o.grupos.forEach(g => {
        const its = colocados[g.id], bloque = its.length * 46;
        const ay = y + bloque / 2 + 10;
        svg += '<g class="cu-actor" transform="translate(90 ' + ay + ')"><circle cy="-26" r="9"/><path d="M0 -17 V8 M-16 -6 H16 M0 8 L-12 26 M0 8 L12 26"/><text y="44">' + esc(g.nombre) + '</text></g>';
        its.forEach((i, k) => {
          const cy = y + 30 + k * 46;
          svg += '<line x1="108" y1="' + ay + '" x2="290" y2="' + cy + '" class="cu-linea"/><ellipse cx="425" cy="' + cy + '" rx="135" ry="19" class="cu-caso"/><text x="425" y="' + (cy + 5) + '" class="cu-caso-t">' + esc(o.items[i].t.replace(/<[^>]+>/g, '')) + '</text>';
        });
        y += bloque + 30;
      });
      return h('div', { class: 'casos-wrap' }, '<p><b>Así se ve como diagrama de casos de uso (UML):</b> los monitos son los <b>actores</b> y los óvalos, lo que cada uno hace con el sistema.</p>' + svg + '</svg>');
    }
    iniciar();
    return { el };
  }

  /* =================================================================
     2) PROYECTO: el mismo encargo con cascada y con ágil.
     ================================================================= */
  const PLANES = {
    cascada: {
      nombre: 'Cascada', semanas: 18,
      fases: [['Requisitos', 1, 2, 'req'], ['Diseño', 3, 4, 'dis'], ['Programar', 5, 9, 'cod'], ['Pruebas', 10, 11, 'pru'], ['Entrega', 12, 12, 'ent'], ['Rehacer', 13, 17, 'reh'], ['Entrega final', 18, 18, 'ent']],
      eventos: {
        1: 'Semanas 1-2: se escriben <b>todos</b> los requisitos de una vez. Doña Mari los firma.',
        3: 'Semanas 3-4: se diseña todo el sistema en papel.',
        5: 'Semana 5: empiezan a programar. Doña Mari no ve nada todavía.',
        6: '<b class="malo">Semana 6:</b> Doña Mari llama: «¿Y si también me piden por WhatsApp?». Pero los requisitos ya se cerraron. Se anota para «después».',
        10: 'Semanas 10-11: pruebas. Se encuentran errores que vienen desde el diseño.',
        12: '<b class="malo">Semana 12:</b> por fin Doña Mari ve la app. «El botón de pedir está muy escondido y falta lo de WhatsApp». Hay que regresar a requisitos y diseño.',
        13: 'Semanas 13-17: se rehace una parte. Cuesta caro porque hay que mover cosas que ya estaban construidas.',
        18: 'Semana 18: entrega final, 6 semanas tarde.'
      },
      vistas: 2, satisf: 'Regular: tardó y tuvo que pedir cambios al final.'
    },
    agil: {
      nombre: 'Ágil (Scrum, sprints de 2 semanas)', semanas: 12,
      fases: [['Sprint 1', 1, 2, 's1'], ['Sprint 2', 3, 4, 's2'], ['Sprint 3', 5, 6, 's1'], ['Sprint 4', 7, 8, 's2'], ['Sprint 5', 9, 10, 's1'], ['Sprint 6', 11, 12, 's2']],
      eventos: {
        1: 'Sprint 1: se hace lo más importante primero: <b>ver el menú</b>.',
        2: 'Semana 2 (revisión): Doña Mari lo prueba. «El botón de pedir está muy escondido». Se arregla en el siguiente sprint.',
        3: 'Sprint 2: <b>hacer un pedido</b> con el botón bien visible.',
        4: 'Semana 4 (revisión): Doña Mari ya puede tomar pedidos de prueba con su sobrina.',
        5: 'Sprint 3: <b>pagar al recoger</b> y avisar cuando está listo.',
        6: '<b class="bueno">Semana 6:</b> «¿Y si también me piden por WhatsApp?». Se agrega a la lista de pendientes (backlog) y el Product Owner lo sube de prioridad.',
        7: 'Sprint 4: <b>pedidos por WhatsApp</b>.',
        9: 'Sprint 5: pago con tarjeta.',
        11: 'Sprint 6: historial de pedidos. «Puntos de lealtad» queda para después: era lo menos importante.',
        12: 'Semana 12: se termina a tiempo. Doña Mari lleva semanas usando la app.'
      },
      vistas: 6, satisf: 'Alta: vio avances cada 2 semanas y sus cambios se tomaron en cuenta.'
    }
  };
  function Proyecto(opts) {
    const o = Object.assign({ alCambiar: () => {} }, opts || {});
    const el = h('div', { class: 'lab lab-proy' });
    const hechos = {};
    let modelo = 'cascada', corriendo = false, saltar = false;
    el.innerHTML = '<div class="como"><b>El encargo:</b> Doña Mari, la de los tamales de Ixtlán, quiere una app para que sus clientes le hagan pedidos. Tienen <b>12 semanas</b>. Elige cómo trabajará el equipo y mira qué pasa semana por semana.</div>' +
      '<div class="lab-controles"><div class="seg" role="group" aria-label="Forma de trabajar"></div><button type="button" class="btn btn-primario" data-a="sim">Simular el proyecto</button><button type="button" class="btn" data-a="saltar" hidden>Ver el final</button></div>' +
      '<p class="lab-ayuda"></p><div class="proy-linea" aria-hidden="true"></div><ol class="proy-log" aria-live="polite"></ol><div class="proy-res"></div>';
    const seg = el.querySelector('.seg'), ayuda = el.querySelector('.lab-ayuda'), linea = el.querySelector('.proy-linea'), log = el.querySelector('.proy-log'), resBox = el.querySelector('.proy-res');
    const AY = {
      cascada: T('cascada', 'Cascada') + ': cada etapa se hace completa y en orden (requisitos → diseño → programar → probar → entregar). El cliente ve el resultado hasta el final.',
      agil: T('agil', 'Ágil') + ': se trabaja en ' + T('sprint', 'sprints') + ' de 2 semanas. En cada uno se entrega algo que ya funciona y el cliente lo prueba.'
    };
    function pintarSeg() {
      seg.innerHTML = '';
      Object.keys(PLANES).forEach(k => {
        const b = h('button', { type: 'button', class: 'seg-b' + (modelo === k ? ' on' : ''), 'aria-pressed': modelo === k }, k === 'agil' ? 'Ágil' : 'Cascada');
        b.onclick = () => { if (corriendo) return; modelo = k; pintarSeg(); linea.innerHTML = ''; log.innerHTML = ''; };
        seg.appendChild(b);
      });
      ayuda.innerHTML = AY[modelo];
    }
    function grid(plan, hasta) {
      const n = 18;
      let html = '<div class="proy-sem">' + Array.from({ length: n }, (_, i) => '<span class="' + (i + 1 > 12 ? 'extra' : '') + '">' + (i + 1) + '</span>').join('') + '</div><div class="proy-barras">';
      plan.fases.forEach(([nom, a, b, c]) => {
        if (a > hasta) return;
        const fin = Math.min(b, hasta);
        html += '<div class="proy-barra f-' + c + '" style="grid-column:' + a + ' / ' + (fin + 1) + '">' + nom + '</div>';
      });
      return html + '<div class="proy-limite" style="grid-column:12 / 13" title="Fecha límite: semana 12"></div></div>';
    }
    async function simular() {
      if (corriendo) return;
      corriendo = true; saltar = false;
      const plan = PLANES[modelo];
      const bs = el.querySelector('[data-a="saltar"]'); bs.hidden = false;
      log.innerHTML = ''; resBox.innerHTML = '';
      for (let s = 1; s <= plan.semanas; s++) {
        linea.innerHTML = grid(plan, s);
        if (plan.eventos[s]) { log.appendChild(h('li', null, plan.eventos[s])); }
        if (!saltar) await sleep(lento() ? 650 : 60);
      }
      bs.hidden = true;
      hechos[modelo] = true;
      corriendo = false;
      const fila = k => { const p = PLANES[k]; return '<tr><th>' + (k === 'agil' ? 'Ágil' : 'Cascada') + '</th><td>' + p.semanas + ' semanas' + (p.semanas > 12 ? ' <span class="malo">(+' + (p.semanas - 12) + ')</span>' : ' <span class="bueno">(a tiempo)</span>') + '</td><td>' + p.vistas + '</td><td>' + p.satisf + '</td></tr>'; };
      resBox.innerHTML = '<div class="tbl"><table><thead><tr><th>Forma</th><th>Duración</th><th>Veces que el cliente vio la app</th><th>Cliente</th></tr></thead><tbody>' + Object.keys(hechos).map(fila).join('') + '</tbody></table></div>' +
        (hechos.cascada && hechos.agil ? '<p><b>¿Entonces cascada es mala?</b> No siempre. Funciona bien cuando los requisitos están muy claros y casi no van a cambiar (por ejemplo, el software de un elevador o una nómina con reglas fijas). Ágil brilla cuando el cliente todavía está descubriendo lo que quiere, como Doña Mari.</p>' : '<p class="nota-chica">Ahora simula con la otra forma de trabajar y compáralas.</p>');
      o.alCambiar({ tipo: 'proyecto', modelo });
    }
    el.querySelector('[data-a="sim"]').onclick = simular;
    el.querySelector('[data-a="saltar"]').onclick = () => { saltar = true; };
    pintarSeg();
    return { el };
  }

  /* =================================================================
     3) SPRINT: planear qué cabe en 2 semanas y verlo avanzar día a día.
     ================================================================= */
  const BACKLOG = [
    { t: 'Ver el menú', p: 3 }, { t: 'Hacer un pedido', p: 5 }, { t: 'Pagar al recoger', p: 2 }, { t: 'Avisar que el pedido está listo', p: 3 },
    { t: 'Pagar con tarjeta', p: 8 }, { t: 'Ver mis pedidos anteriores', p: 3 }, { t: 'Puntos de lealtad', p: 5 }, { t: 'Modo oscuro', p: 2 }
  ];
  const CAPACIDAD = 13, DIAS = 10;
  const RITMO = [0.6, 1.0, 1.3, 0.9, 1.4, 0.7, 1.2, 1.0, 1.1, 0.8]; // unos días se avanza más que otros (suma 10)
  function Sprint(opts) {
    const o = Object.assign({ alCambiar: () => {} }, opts || {});
    const el = h('div', { class: 'lab lab-sprint' });
    let elegidas = new Set(), corriendo = false;
    function planear() {
      const suma = [...elegidas].reduce((a, i) => a + BACKLOG[i].p, 0);
      el.innerHTML = '<div class="como"><b>Planeación del ' + T('sprint', 'sprint') + '.</b> Tu equipo puede terminar unos <b>' + CAPACIDAD + ' puntos</b> de trabajo en 2 semanas (los puntos miden qué tan grande es cada tarea). El ' + T('backlog', 'backlog') + ' ya viene ordenado por el Product Owner: <b>lo de arriba es lo más importante</b>. Toca las tareas que meterás a este sprint.</div>' +
        '<div class="sp-cap"><span>Comprometido: <b class="mono">' + suma + ' / ' + CAPACIDAD + '</b> puntos</span><div class="barra-prog' + (suma > CAPACIDAD ? ' pasada' : '') + '"><i style="width:' + Math.min(100, Math.round(suma / CAPACIDAD * 100)) + '%"></i></div></div>';
      const lista = h('div', { class: 'sp-backlog' });
      BACKLOG.forEach((it, i) => {
        const b = h('button', { type: 'button', class: 'sp-item' + (elegidas.has(i) ? ' on' : ''), 'aria-pressed': elegidas.has(i) }, '<span class="sp-n">' + (i + 1) + '</span><span>' + it.t + '</span><span class="sp-p">' + it.p + ' pts</span>');
        b.onclick = () => { if (elegidas.has(i)) elegidas.delete(i); else elegidas.add(i); planear(); };
        lista.appendChild(b);
      });
      el.appendChild(lista);
      const ir = h('button', { type: 'button', class: 'btn btn-primario' }, 'Empezar el sprint');
      ir.disabled = !elegidas.size;
      ir.onclick = correr;
      el.appendChild(ir);
      if (suma > CAPACIDAD) el.appendChild(h('p', { class: 'malo' }, 'Ojo: elegiste más de lo que el equipo alcanza a hacer. Puedes intentarlo y ver qué pasa…'));
    }
    async function correr() {
      if (corriendo) return;
      corriendo = true;
      const orden = [...elegidas].sort((a, b) => a - b);
      const total = orden.reduce((a, i) => a + BACKLOG[i].p, 0);
      const resta = orden.map(i => BACKLOG[i].p);
      const hechas = [];
      el.innerHTML = '<div class="sp-tablero"><div class="sp-col"><h4>Por hacer</h4><div data-c="0"></div></div><div class="sp-col"><h4>Haciendo</h4><div data-c="1"></div></div><div class="sp-col"><h4>Hecho</h4><div data-c="2"></div></div></div>' +
        '<div class="sp-abajo"><svg class="sp-burn" viewBox="0 0 320 180" role="img" aria-label="Gráfica de trabajo pendiente por día"></svg><div><div class="sp-dia"></div><p class="nota-chica">La gráfica se llama <b>burndown</b> («quemar» el trabajo): muestra cuántos puntos faltan cada día. La línea punteada es el ritmo ideal.</p></div></div><div class="sp-res"></div>';
      const cols = [0, 1, 2].map(c => el.querySelector('[data-c="' + c + '"]'));
      const burn = el.querySelector('.sp-burn'), diaBox = el.querySelector('.sp-dia'), res = el.querySelector('.sp-res');
      const puntos = [total];
      const tablero = () => {
        cols.forEach(c => { c.innerHTML = ''; });
        orden.forEach((i, k) => {
          const col = resta[k] <= 0 ? 2 : resta[k] < BACKLOG[i].p ? 1 : 0;
          cols[col].appendChild(h('div', { class: 'sp-tarjeta' }, BACKLOG[i].t + '<small>' + (col === 1 ? 'faltan ' + Math.ceil(resta[k] * 10) / 10 + ' pts' : BACKLOG[i].p + ' pts') + '</small>'));
        });
      };
      const grafica = () => {
        const maxY = Math.max(total, CAPACIDAD), X = d => 44 + d / DIAS * 262, Y = v => 150 - v / maxY * 130;
        let svg = '<line x1="44" y1="150" x2="306" y2="150" class="sp-eje"/><line x1="44" y1="20" x2="44" y2="150" class="sp-eje"/>';
        for (let d = 0; d <= DIAS; d += 2) svg += '<text x="' + X(d) + '" y="166" class="sp-txt">' + d + '</text>';
        svg += '<text x="306" y="178" class="sp-txt" style="text-anchor:end">días</text><text x="38" y="' + (Y(total) + 4) + '" class="sp-txt" style="text-anchor:end">' + total + '</text><text x="38" y="154" class="sp-txt" style="text-anchor:end">0</text><text x="306" y="' + (Y(total) + 4) + '" class="sp-txt" style="text-anchor:end">puntos que faltan</text>';
        svg += '<line x1="' + X(0) + '" y1="' + Y(total) + '" x2="' + X(DIAS) + '" y2="' + Y(0) + '" class="sp-ideal"/>';
        svg += '<polyline points="' + puntos.map((v, d) => X(d) + ',' + Y(v)).join(' ') + '" class="sp-real"/>';
        burn.innerHTML = svg;
      };
      tablero(); grafica();
      const charla = d => {
        const enCurso = orden.filter((i, k) => resta[k] > 0 && resta[k] < BACKLOG[i].p).map(i => BACKLOG[i].t);
        const sig = orden.find((i, k) => resta[k] > 0);
        return '<b>Día ' + d + ' · junta diaria (15 min):</b> ' + (hechas.length ? 'ya terminamos «' + hechas[hechas.length - 1] + '». ' : '') + (enCurso.length ? 'Hoy seguimos con «' + enCurso[0] + '».' : sig !== undefined ? 'Hoy empezamos «' + BACKLOG[sig].t + '».' : d < DIAS ? 'Ya no queda nada: ¡terminamos antes!' : 'Ya no queda nada: ¡justo a tiempo!');
      };
      for (let d = 1; d <= DIAS; d++) {
        let energia = CAPACIDAD / DIAS * RITMO[d - 1];
        for (let k = 0; k < orden.length && energia > 0.0001; k++) {
          if (resta[k] <= 0) continue;
          const usa = Math.min(energia, resta[k]);
          resta[k] = Math.round((resta[k] - usa) * 1000) / 1000; energia -= usa;
          if (resta[k] <= 0) hechas.push(BACKLOG[orden[k]].t);
        }
        puntos.push(Math.max(0, Math.round(resta.reduce((a, v) => a + Math.max(0, v), 0) * 10) / 10));
        tablero(); grafica();
        diaBox.innerHTML = charla(d);
        await sleep(lento() ? 700 : 80);
      }
      const faltan = orden.filter((i, k) => resta[k] > 0).map(i => BACKLOG[i].t);
      const saltadas = orden.length ? BACKLOG.map((x, i) => i).filter(i => i < orden[orden.length - 1] && !elegidas.has(i)) : [];
      const top = elegidas.has(0) && elegidas.has(1);
      const ok = !faltan.length && top;
      res.innerHTML = '<div class="tarjeta"><h3>Revisión del sprint (con Doña Mari)</h3>' +
        (faltan.length ? '<p class="malo">No alcanzó el tiempo: quedaron sin terminar «' + faltan.join('», «') + '». El equipo se comprometió a más de ' + CAPACIDAD + ' puntos. En la retrospectiva acuerdan elegir menos en el próximo sprint.</p>' : '<p class="bueno">El equipo terminó todo lo que prometió. Doña Mari prueba: ' + hechas.map(t => '«' + t + '»').join(', ') + '.</p>') +
        (!top ? '<p>El Product Owner no está contento: lo más importante era <b>«Ver el menú»</b> y <b>«Hacer un pedido»</b>; sin eso la app no sirve todavía.</p>' : saltadas.length ? '<p>Funciona, pero te saltaste «' + saltadas.map(i => BACKLOG[i].t).join('», «') + '», que era más importante que algo que sí elegiste. Lo ideal es tomar del backlog <b>de arriba hacia abajo</b>.</p>' : '<p>Además tomaste las tareas en el orden de importancia. ¡Así se planea un sprint!</p>') + '</div>';
      const otra = h('button', { type: 'button', class: 'btn' }, 'Planear otro sprint');
      otra.onclick = () => { elegidas = new Set(); planear(); };
      res.appendChild(otra);
      corriendo = false;
      o.alCambiar({ tipo: 'sprint', ok, faltan: faltan.length, top, enOrden: !saltadas.length, puntos: total });
    }
    planear();
    return { el };
  }

  root.ISLabs = { Clasifica, Proyecto, Sprint };
})(window);
