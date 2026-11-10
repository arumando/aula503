/* Aula 503 · Academia de Desarrollo Web — vista de rutas y lecciones.
   Sirve igual dentro de Aula 503 y en la página aparte:
   Academia.montar(contenedor, { progreso(), guardar(id, datos), sumarXp(n), modo(), ponerModo(m), tutor(prompt, alTexto), ruta, ir(ruta) }) */
(function (root) {
  'use strict';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const h = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const btn = (txt, cls, fn) => { const b = h('button', 'btn ' + (cls || ''), txt); b.type = 'button'; b.onclick = fn; return b; };
  const todas = c => c.niveles.flatMap(n => n.lecciones);
  const buscar = id => { for (const c of root.CURSOS_WEB) for (const l of todas(c)) if (l.id === id) return { curso: c, leccion: l }; return null; };
  const md = txt => { const t = h('div'); t.innerHTML = txt; return t.textContent; };

  function montar(cont, api) {
    let labActual = null;
    const P = () => api.progreso() || {};
    function limpiar() { if (labActual) { labActual.destruir(); labActual = null; } cont.innerHTML = ''; }
    function pintar(ruta) {
      limpiar();
      const [, a, b] = (ruta || '').split('/');
      if (a === 'l' && b && buscar(b)) return leccion(buscar(b));
      return portada(a && root.CURSOS_WEB.find(c => c.id === a) ? a : (api.cursoInicial && api.cursoInicial()) || root.CURSOS_WEB[0].id);
    }

    /* ---------- Portada: rutas de aprendizaje ---------- */
    function portada(idCurso) {
      const pr = P();
      const w = h('div', 'wa');
      w.appendChild(h('div', 'wa-hero', '<h1>Academia de Desarrollo Web</h1><p>Aprende escribiendo código de verdad: cada lección tiene una explicación sencilla o técnica, un laboratorio donde cambias el código y ves el resultado al instante, un reto que se revisa solo y un repaso. Empieza por los Fundamentos si nunca has programado.</p>'));
      const rutas = h('div', 'wa-rutas');
      root.CURSOS_WEB.forEach(c => {
        const ls = todas(c), n = ls.filter(l => pr[l.id]).length;
        const r = h('button', 'wa-ruta', '<span class="wa-logo" style="background:' + c.color + '">' + esc(c.logo) + '</span><h2>' + esc(c.nombre) + '</h2><p>' + esc(c.lema) + '</p><div class="wa-barra" aria-label="' + n + ' de ' + ls.length + ' lecciones"><i style="width:' + Math.round(n / ls.length * 100) + '%"></i></div><small>' + n + ' de ' + ls.length + ' lecciones</small>');
        r.type = 'button'; r.setAttribute('aria-pressed', c.id === idCurso);
        r.onclick = () => api.ir('/' + c.id);
        rutas.appendChild(r);
      });
      w.appendChild(rutas);
      const c = root.CURSOS_WEB.find(x => x.id === idCurso);
      const niv = h('div', 'wa-niveles');
      niv.appendChild(h('div', '', '<h2 style="font-size:1.35rem">' + esc(c.nombre) + '</h2>' + (c.fuente ? '<p class="wa-migas">Sigue los temas de <a href="' + c.fuente + '" target="_blank" rel="noopener">la documentación oficial ↗</a>, explicados desde cero.</p>' : '')));
      let i = 0;
      c.niveles.forEach(nv => {
        const s = h('section', 'wa-nivel', '<h3>' + esc(nv.titulo) + '</h3>');
        const l = h('div', 'wa-lista');
        nv.lecciones.forEach(le => {
          i++;
          const it = h('button', 'wa-item' + (pr[le.id] ? ' hecha' : ''), '<span class="n">' + (pr[le.id] ? '✓' : i) + '</span><span><b>' + esc(le.titulo) + '</b><small>' + esc(le.resumen) + '</small></span>');
          it.type = 'button'; it.onclick = () => api.ir('/l/' + le.id);
          l.appendChild(it);
        });
        s.appendChild(l); niv.appendChild(s);
      });
      w.appendChild(niv);
      cont.appendChild(w);
    }

    /* ---------- Lección ---------- */
    function leccion({ curso, leccion: L }) {
      const lista = todas(curso), pos = lista.indexOf(L);
      const estado = { reto: false, vioSolucion: false, quiz: null, pistas: 0 };
      const w = h('article', 'wa-lec');
      const cab = h('div', 'wa-cab');
      const migas = h('div', 'wa-migas');
      const volver = h('button', '', '← ' + esc(curso.nombre)); volver.type = 'button'; volver.onclick = () => api.ir('/' + curso.id);
      migas.append(volver, document.createTextNode(' · Lección ' + (pos + 1) + ' de ' + lista.length));
      const modo = h('div', 'wa-modo'); modo.setAttribute('role', 'group'); modo.setAttribute('aria-label', 'Tipo de explicación');
      cab.append(migas, modo);
      w.appendChild(cab);
      w.appendChild(h('h1', '', esc(L.titulo)));

      // Explicación con dos modos
      const exp = h('section', 'wa-sec');
      const pintarExp = () => {
        const m = api.modo() || 'sencillo';
        modo.innerHTML = '';
        [['sencillo', 'Explicación sencilla'], ['tecnico', 'Técnica']].forEach(([k, t]) => { const b = h('button', '', t); b.type = 'button'; b.setAttribute('aria-pressed', m === k); b.onclick = () => { api.ponerModo(k); pintarExp(); }; modo.appendChild(b); });
        exp.innerHTML = '<span class="wa-eti">' + (m === 'tecnico' ? 'Explicación técnica' : 'Explicación sencilla') + '</span><div class="wa-texto">' + (m === 'tecnico' ? L.tecnico : L.sencillo) + '</div>' + (L.analogia && m !== 'tecnico' ? '<div class="wa-analogia">' + L.analogia + '</div>' : '');
      };
      pintarExp();
      w.appendChild(exp);

      // Laboratorio
      const sLab = h('section', 'wa-sec', '<span class="wa-eti">Laboratorio · cambia el código y mira qué pasa</span>');
      const lab = root.CodeLab({ modo: curso.modo, archivos: L.ejemplo.archivos.map(a => Object.assign({}, a)), mostrarNombre: curso.modo !== 'web' });
      labActual = lab;
      sLab.appendChild(lab.el);
      // Recorrido del código
      if (L.ejemplo.notas && L.ejemplo.notas.length) {
        const n = h('div', 'wa-notas', '<span class="wa-eti" style="margin-top:6px">Recorrido del código · toca un paso para marcar sus líneas</span>');
        L.ejemplo.notas.forEach(no => {
          const b = h('button', 'wa-nota', '<span class="l">' + esc(no.a || '') + ' ' + (no.l[0] === no.l[1] ? 'línea ' + no.l[0] : 'líneas ' + no.l[0] + '–' + no.l[1]) + '</span><span>' + no.t + '</span>');
          b.type = 'button';
          b.onclick = () => { n.querySelectorAll('.wa-nota').forEach(x => x.classList.toggle('on', x === b)); if (no.a) lab.irArchivo(no.a); lab.marcarLineas(no.l[0], no.l[1]); lab.el.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); };
          n.appendChild(b);
        });
        sLab.appendChild(n);
      }
      // Ayuda: ¿qué hace este código?
      const ayuda = h('div', 'wa-btns');
      const tutorBox = h('div');
      ayuda.appendChild(btn('🤔 ¿Qué hace este código?', '', async () => {
        tutorBox.className = 'wa-tutor'; tutorBox.textContent = 'Pensando…';
        const codigo = lab.archivos().map(a => '// ' + a.nombre + '\n' + a.codigo).join('\n\n');
        const prompt = 'Eres un tutor paciente de una universidad en Oaxaca. El alumno está aprendiendo ' + curso.nombre + ' desde cero, en el tema «' + L.titulo + '». Explícale en español de México, con palabras sencillas y una analogía cotidiana, qué hace este código línea por línea (agrupa las líneas parecidas) y por qué. Si hay un error, dile dónde está y cómo pensarlo, sin darle todo resuelto. Máximo 220 palabras. Usa **negritas** para los conceptos clave.\n\n' + codigo.slice(0, 5000);
        const ok = await api.tutor(prompt, t => { tutorBox.innerHTML = esc(t).replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\n/g, '<br>'); });
        if (!ok) tutorBox.innerHTML = 'El tutor no está disponible en esta vista. Mientras, usa el <b>Recorrido del código</b> de arriba: explica cada parte.';
      }));
      sLab.append(ayuda, tutorBox);
      w.appendChild(sLab);

      // Reto
      const sReto = h('section', 'wa-sec wa-reto', '<span class="wa-eti">Tu turno · reto</span><div class="wa-texto"><p>' + L.reto.texto + '</p></div>');
      const metas = h('div', 'wa-metas');
      L.reto.metas.forEach(m => metas.appendChild(h('div', 'wa-meta', '<span class="ck"></span><span>' + m.t + '</span>')));
      sReto.appendChild(metas);
      const resultado = h('div');
      const pistaBox = h('div', 'wa-notas');
      const bts = h('div', 'wa-btns');
      if (L.reto.archivos) bts.appendChild(btn('Empezar reto', '', () => { estado.empezado = true; lab.poner(L.reto.archivos); resultado.innerHTML = '<p class="wa-why">Se cargó el código del reto en el laboratorio.</p>'; }));
      bts.appendChild(btn('✔ Comprobar', 'btn-primario', comprobar));
      const bPista = btn('💡 Pista', '', () => { if (estado.pistas >= L.reto.pistas.length) return; pistaBox.appendChild(h('div', 'wa-pista', '<b>Pista ' + (estado.pistas + 1) + ':</b> ' + L.reto.pistas[estado.pistas])); estado.pistas++; if (estado.pistas >= L.reto.pistas.length) bPista.disabled = true; });
      bts.appendChild(bPista);
      bts.appendChild(btn('Ver solución', 'btn-texto', () => { estado.vioSolucion = true; lab.poner(L.reto.solucion); resultado.innerHTML = '<p class="wa-why">Se cargó la solución en el laboratorio. Léela, cámbiala y vuelve a comprobar. (Sin el bono de +5 XP del reto.)</p>'; }));
      sReto.append(bts, pistaBox, resultado);
      w.appendChild(sReto);
      async function comprobar() {
        if (L.reto.archivos && !estado.empezado && !estado.vioSolucion) { resultado.innerHTML = '<p class="wa-why">Este reto trae su propio código: primero pulsa <b>Empezar reto</b>.</p>'; return; }
        resultado.innerHTML = '<p class="wa-why">Revisando…</p>';
        const est = lab.estado();
        const res = est.errores.length ? L.reto.metas.map(() => false) : await lab.probar(L.reto.metas.map(m => m.ok));
        res.forEach((ok, i) => { const f = metas.children[i]; f.classList.toggle('ok', !!ok); f.querySelector('.ck').textContent = ok ? '✓' : ''; });
        const todo = res.every(Boolean);
        if (todo) { estado.reto = true; resultado.innerHTML = '<p><b style="color:var(--ok)">¡Reto cumplido!</b> ' + (estado.vioSolucion ? '' : '<span class="wa-xp">+5 XP de bono</span>') + '</p>'; revisarFin(); }
        else resultado.innerHTML = '<p class="wa-why">' + (est.errores.length ? 'Primero corrige el error que marca el laboratorio (pestaña Consola).' : 'Aún falta algo. Revisa las metas sin palomita o pide una pista.') + '</p>';
        // algunas pruebas tocan botones: dejamos el resultado como lo escribió el alumno
        setTimeout(() => lab.ejecutar(), 300);
      }

      // Repaso
      const sQuiz = h('section', 'wa-sec', '<span class="wa-eti">Repaso</span>');
      const qz = h('div', 'wa-quiz'); let respondidas = 0, buenas = 0;
      L.quiz.forEach((q, qi) => {
        const d = h('div', 'wa-q', '<h4>' + (qi + 1) + '. ' + q.q + '</h4>');
        const ops = h('div', 'wa-ops'); const why = h('p', 'wa-why');
        q.o.forEach((o, oi) => {
          const b = h('button', 'wa-op', o); b.type = 'button';
          b.onclick = () => {
            if (ops.dataset.listo) return; ops.dataset.listo = 1; respondidas++;
            const ok = oi === q.a; if (ok) buenas++;
            b.classList.add(ok ? 'ok' : 'mal'); if (!ok) ops.children[q.a].classList.add('ok');
            why.innerHTML = (ok ? '✅ ' : '❌ ') + q.w;
            if (respondidas === L.quiz.length) { estado.quiz = buenas === L.quiz.length; revisarFin(); }
          };
          ops.appendChild(b);
        });
        d.append(ops, why); qz.appendChild(d);
      });
      sQuiz.appendChild(qz); w.appendChild(sQuiz);

      // Fin
      const fin = h('section', 'wa-sec');
      const finTxt = h('div');
      const bFin = btn('Terminar lección', 'btn-primario btn-grande', terminar);
      const fila = h('div', 'wa-fin'); fila.append(finTxt, bFin);
      fin.appendChild(fila);
      w.appendChild(fin);
      function revisarFin() {
        const falta = [];
        if (!estado.reto && !estado.vioSolucion) falta.push('el reto');
        if (estado.quiz === null) falta.push('el repaso');
        finTxt.innerHTML = falta.length ? '<p class="wa-why">Para terminar te falta: ' + falta.join(' y ') + '.</p>' : '<p>¡Listo! Gana <span class="wa-xp">+' + xpDe() + ' XP</span>.</p>';
        bFin.disabled = falta.length > 0;
      }
      const xpDe = () => 10 + (estado.reto && !estado.vioSolucion ? 5 : 0) + (estado.quiz ? 5 : 0);
      function terminar() {
        const pr = P(), ya = pr[L.id], xp = xpDe();
        api.guardar(L.id, { fecha: new Date().toISOString().slice(0, 10), xp: Math.max(xp, ya ? ya.xp || 0 : 0), veces: ((ya && ya.veces) || 0) + 1 });
        api.sumarXp(ya ? Math.ceil(xp / 3) : xp);
        fin.innerHTML = '<div class="wa-fin"><div><h2>🏆 ¡Lección completada!</h2><p><span class="wa-xp">+' + (ya ? Math.ceil(xp / 3) + ' XP (repaso)' : xp + ' XP') + '</span></p></div></div>';
        const f = fin.querySelector('.wa-fin');
        const sig = lista[pos + 1];
        if (sig) f.appendChild(btn('Siguiente: ' + esc(sig.titulo) + ' →', 'btn-primario btn-grande', () => api.ir('/l/' + sig.id)));
        else f.appendChild(btn('Volver a ' + esc(curso.nombre), 'btn-primario btn-grande', () => api.ir('/' + curso.id)));
      }
      revisarFin();
      cont.appendChild(w);
    }

    return { pintar, destruir: limpiar };
  }

  root.Academia = { montar, buscar };
})(window);
