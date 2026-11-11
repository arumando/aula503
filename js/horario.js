/* Aula 503 — módulo «Horario».
   Horario oficial del grupo 503 (semestre 26-27 A, UNSIJ), tomado del PDF «HORARIO FINAL LI - IDSSI SEMESTRE A-3-3».
   Ofrece: la vista completa (por día y de la semana) y la tarjeta «Hoy» del inicio.
   Para cambiar el horario, edita solo los datos de arriba (DIAS, AULAS y MATERIAS). */
(function (root) {
  'use strict';

  const GRUPO = { grupo: '503', semestre: '26-27 A', escuela: 'Universidad de la Sierra Juárez' };

  const MATERIAS = {
    pdm:    { nombre: 'Programación de dispositivos móviles', corto: 'Móviles',    profe: 'M.M.I. Juan Gabriel Ruiz Ruiz',       hue: 150 },
    is:     { nombre: 'Ingeniería de Software I',             corto: 'Ing. Soft.', profe: 'M.C. Laura López Núñez',              hue: 268 },
    ia:     { nombre: 'Fundamentos de IA',                    corto: 'IA',         profe: 'M.E. Magdiel Pascual García Juárez',  hue: 18 },
    redes:  { nombre: 'Redes I',                              corto: 'Redes',      profe: 'Dr. Florentino Méndez Gijón',         hue: 214 },
    so:     { nombre: 'Fundamentos de Sistemas Operativos',   corto: 'Sist. Op.',  profe: 'M.I.S. Celiflora Díaz Jiménez',       hue: 188 },
    ingles: { nombre: 'Inglés',                               corto: 'Inglés',     profe: '',                                    hue: 96 },
    web:    { nombre: 'Tecnologías Web I',                    corto: 'Web I',      profe: 'M.M.I. Juan Gabriel Ruiz Ruiz',       hue: 38 },
    emp:    { nombre: 'Emprendimiento e Innovación',          corto: 'Emprend.',   profe: '',                                    hue: 332 },
    act:    { nombre: 'Actividad Complementaria',             corto: 'Act. Compl.', profe: '',                                   hue: 220 }
  };

  /* DIAS[día 1-5][hora de inicio] = materia. Cada celda dura una hora (8 = de 8:00 a 9:00). La hora 13 es el receso. */
  const DIAS = {
    1: { 8: 'pdm', 9: 'is',    10: 'is',    11: 'so', 12: 'ingles', 14: 'web', 15: 'emp' },
    2: { 8: 'pdm', 9: 'ia',    10: 'ia',    11: 'so', 12: 'ingles', 14: 'web', 15: 'emp' },
    3: { 8: 'pdm', 9: 'redes', 10: 'redes', 11: 'so', 12: 'ingles', 14: 'web', 15: 'act' },
    4: { 8: 'pdm', 9: 'redes', 10: 'redes', 11: 'so', 12: 'ingles', 14: 'web', 15: 'emp' },
    5: { 8: 'ia',  9: 'ia',    10: 'is',    11: 'is', 12: 'ingles', 14: 'web' }
  };
  const AULAS = { 8: 'LR/LIA', 9: 'LR/LIA', 10: 'LR/LIA', 11: 'LR', 12: 'E', 14: 'LR', 15: 'B4' };
  const RECESO = { ini: 13, fin: 14 };
  const NOMBRE_DIA = { 1: 'Lunes', 2: 'Martes', 3: 'Miércoles', 4: 'Jueves', 5: 'Viernes' };
  const CORTO_DIA = { 1: 'Lun', 2: 'Mar', 3: 'Mié', 4: 'Jue', 5: 'Vie' };

  const hh = n => n + ':00';
  const color = m => 'hsl(' + MATERIAS[m].hue + ' 62% 46%)';

  /* Une horas seguidas de la misma materia y el mismo salón: Lunes IS 9-11 es un solo bloque */
  function bloques(dia) {
    const d = DIAS[dia] || {}, out = [];
    Object.keys(d).map(Number).sort((a, b) => a - b).forEach(h => {
      const u = out[out.length - 1];
      if (u && u.materia === d[h] && u.fin === h && u.aula === AULAS[h]) u.fin = h + 1;
      else out.push({ materia: d[h], ini: h, fin: h + 1, aula: AULAS[h] || '' });
    });
    return out;
  }

  /* Qué clase hay ahora y cuál sigue (con la hora del dispositivo) */
  function estadoAhora(fecha) {
    const f = fecha || new Date(), dia = f.getDay(), min = f.getHours() * 60 + f.getMinutes();
    const hoy = dia >= 1 && dia <= 5 ? bloques(dia) : [];
    const actual = hoy.find(b => min >= b.ini * 60 && min < b.fin * 60) || null;
    const sigue = hoy.find(b => b.ini * 60 > min) || null;
    const receso = dia >= 1 && dia <= 5 && min >= RECESO.ini * 60 && min < RECESO.fin * 60;
    // Si hoy ya no hay más clases: la primera del siguiente día de clases
    let proxDia = null, proxBloque = null;
    if (!actual && !sigue) {
      for (let i = 1; i <= 7; i++) { const d = ((dia + i - 1) % 7) + 1; if (d >= 1 && d <= 5) { proxDia = d; proxBloque = bloques(d)[0]; break; } }
    }
    return { dia, hoy, actual, sigue, receso, proxDia, proxBloque, esDiaDeClases: dia >= 1 && dia <= 5 };
  }

  /* ---------- Estilos (con los colores del tema de la app) ---------- */
  const CSS = `
.hr-chips{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px}
.hr-chips .chip{flex:1 1 0;min-width:0;text-align:center;padding:.45em .2em;position:relative}
.hr-chips .chip.hoy::after{content:'';position:absolute;top:4px;right:6px;width:6px;height:6px;border-radius:50%;background:var(--accent)}
.hr-lista{display:grid;gap:8px}
.hr-bloque{display:grid;grid-template-columns:54px minmax(0,1fr) auto;gap:10px;align-items:center;background:color-mix(in srgb,var(--mc) 13%,var(--surface));border:1.5px solid color-mix(in srgb,var(--mc) 40%,var(--line));border-left:6px solid var(--mc);border-radius:14px;padding:10px 12px}
.hr-bloque.ahora{border-color:var(--mc);box-shadow:0 0 0 2px color-mix(in srgb,var(--mc) 35%,transparent)}
.hr-hora{display:grid;line-height:1.15;font-variant-numeric:tabular-nums;text-align:center}
.hr-hora b{font:800 1.05rem var(--f-display)}.hr-hora span{color:var(--muted);font-size:.8rem}
.hr-info h3{font-size:1rem;line-height:1.2}
.hr-info p{color:var(--muted);font-size:.85rem;margin-top:2px;overflow-wrap:anywhere}
.hr-pildora{font:800 .7rem var(--f-ui);text-transform:uppercase;letter-spacing:.06em;background:var(--mc);color:#fff;border-radius:999px;padding:.2em .7em;white-space:nowrap}
.hr-receso{text-align:center;color:var(--muted);font-size:.85rem;padding:6px;border:1.5px dashed var(--line);border-radius:12px}
.hr-libre{background:var(--surface);border:1.5px dashed var(--line);border-radius:14px;padding:18px;text-align:center;color:var(--muted)}
.hr-sem{display:grid;grid-template-columns:30px repeat(5,minmax(0,1fr));grid-auto-rows:minmax(42px,auto);gap:3px;margin-top:6px}
.hr-sem>*{border-radius:9px;display:grid;place-items:center;text-align:center;font-size:.72rem;line-height:1.1;padding:2px}
.hr-cab{font-weight:800;color:var(--muted);font-size:.74rem;min-height:0;padding:4px 0}
.hr-cab.hoy{color:var(--accent)}
.hr-h{color:var(--muted);font-variant-numeric:tabular-nums;font-size:.72rem}
.hr-c{background:color-mix(in srgb,var(--mc) 20%,var(--surface));border:1.5px solid color-mix(in srgb,var(--mc) 55%,var(--line));font-weight:700;color:var(--fg);cursor:pointer;font-family:inherit}
.hr-c.hoy{border-color:var(--mc);box-shadow:inset 0 0 0 1px var(--mc)}
.hr-c.sel{background:color-mix(in srgb,var(--mc) 38%,var(--surface))}
.hr-rec{grid-column:2/-1;color:var(--muted);background:var(--surface-2);letter-spacing:.3em;font-size:.68rem;text-transform:uppercase;min-height:0}
.hr-profes{display:grid;gap:6px;margin-top:8px}
.hr-profes>div{display:grid;grid-template-columns:12px minmax(0,1fr);gap:8px;align-items:start;font-size:.9rem}
.hr-profes i{width:12px;height:12px;border-radius:4px;background:var(--mc);margin-top:5px}
.hr-profes span{color:var(--muted);display:block;font-size:.85rem}
.hoy-card{background:var(--surface);border:1.5px solid var(--line);border-radius:18px;padding:14px 16px;display:grid;gap:10px;margin-bottom:16px}
.hoy-card h2{font-size:1.1rem}
.hoy-fecha{color:var(--muted);font-size:.88rem}
.hoy-ahora{display:grid;grid-template-columns:auto minmax(0,1fr);gap:10px;align-items:center;background:color-mix(in srgb,var(--mc) 14%,var(--surface));border:1.5px solid color-mix(in srgb,var(--mc) 45%,var(--line));border-left:6px solid var(--mc);border-radius:12px;padding:8px 12px}
.hoy-ahora b{display:block;line-height:1.2}.hoy-ahora span{color:var(--muted);font-size:.85rem}
.hoy-fila{display:flex;gap:6px;flex-wrap:wrap}
.hoy-mini{font-size:.76rem;font-weight:700;border-radius:8px;padding:.2em .55em;background:color-mix(in srgb,var(--mc) 18%,var(--surface));border:1.5px solid color-mix(in srgb,var(--mc) 50%,var(--line))}
.hoy-mini.pasada{opacity:.5}
.hoy-tareas{display:grid;gap:4px;border-top:1px solid var(--line);padding-top:8px}
.hoy-tarea{display:flex;justify-content:space-between;gap:10px;font-size:.9rem}
.hoy-tarea span:first-child{min-width:0;overflow-wrap:anywhere}.hoy-tarea span:last-child{color:var(--muted);white-space:nowrap}
.hoy-tarea .urgente{color:var(--mal)}
.hoy-enlaces{display:flex;gap:14px;flex-wrap:wrap;font-weight:700;font-size:.9rem}
`;
  (function () { const s = document.createElement('style'); s.setAttribute('data-modulo', 'horario'); s.textContent = CSS; document.head.appendChild(s); })();

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const h = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const tema = m => ({ '--mc': color(m) });
  const poner = (el, vars) => { Object.keys(vars).forEach(k => el.style.setProperty(k, vars[k])); return el; };

  /* ---------- Vista completa ---------- */
  function pintar(v) {
    const ahora = estadoAhora();
    let sel = ahora.esDiaDeClases ? ahora.dia : 1;
    const cuerpo = h('div');
    const chips = h('div', 'hr-chips');
    chips.setAttribute('role', 'group'); chips.setAttribute('aria-label', 'Día de la semana');
    const lista = h('div', 'hr-lista');
    const semana = h('div');

    function pintarChips() {
      chips.innerHTML = '';
      [1, 2, 3, 4, 5].forEach(d => {
        const b = h('button', 'chip' + (sel === d ? ' on' : '') + (ahora.dia === d ? ' hoy' : ''), CORTO_DIA[d]);
        b.type = 'button'; b.setAttribute('aria-pressed', sel === d);
        if (ahora.dia === d) b.setAttribute('aria-label', NOMBRE_DIA[d] + ' (hoy)');
        b.onclick = () => { sel = d; pintarTodo(); };
        chips.appendChild(b);
      });
    }
    function pintarLista() {
      lista.innerHTML = '';
      const bl = bloques(sel);
      let receso = false;
      const marcarReceso = () => { if (!receso) { receso = true; lista.appendChild(h('div', 'hr-receso', hh(RECESO.ini) + ' – ' + hh(RECESO.fin) + ' · Receso')); } };
      bl.forEach(b => {
        if (b.ini >= RECESO.fin) marcarReceso();
        const m = MATERIAS[b.materia];
        const enCurso = ahora.dia === sel && ahora.actual && ahora.actual.ini === b.ini;
        const art = poner(h('article', 'hr-bloque' + (enCurso ? ' ahora' : '')), tema(b.materia));
        art.innerHTML = '<div class="hr-hora"><b>' + hh(b.ini) + '</b><span>' + hh(b.fin) + '</span></div>' +
          '<div class="hr-info"><h3>' + esc(m.nombre) + '</h3><p>' + (b.aula ? 'Aula ' + esc(b.aula) : '') + (m.profe ? (b.aula ? ' · ' : '') + esc(m.profe) : '') + '</p></div>' +
          (enCurso ? '<span class="hr-pildora">Ahora</span>' : '');
        lista.appendChild(art);
      });
      if (!bl.some(b => b.ini >= RECESO.fin)) marcarReceso();
    }
    function pintarSemana() {
      semana.innerHTML = '';
      const g = h('div', 'hr-sem');
      g.setAttribute('role', 'table'); g.setAttribute('aria-label', 'Horario de la semana');
      const celda = (cls, txt, fila, col, span) => { const e = h('div', cls, txt); e.style.gridRow = fila + (span > 1 ? ' / span ' + span : ''); e.style.gridColumn = col; return e; };
      g.appendChild(celda('', '', 1, 1));
      [1, 2, 3, 4, 5].forEach(d => g.appendChild(celda('hr-cab' + (ahora.dia === d ? ' hoy' : ''), CORTO_DIA[d], 1, d + 1)));
      for (let hora = 8; hora <= 15; hora++) g.appendChild(celda('hr-h', hora, hora - 6, 1));
      const rec = celda('hr-rec', 'Receso', RECESO.ini - 6, 2); rec.style.gridColumn = '2 / -1'; g.appendChild(rec);
      [1, 2, 3, 4, 5].forEach(d => bloques(d).forEach(b => {
        const e = poner(celda('hr-c' + (ahora.dia === d ? ' hoy' : '') + (sel === d ? ' sel' : ''), esc(MATERIAS[b.materia].corto), b.ini - 6, d + 1, b.fin - b.ini), tema(b.materia));
        e.setAttribute('role', 'button'); e.tabIndex = 0;
        e.setAttribute('aria-label', NOMBRE_DIA[d] + ' ' + hh(b.ini) + ' a ' + hh(b.fin) + ': ' + MATERIAS[b.materia].nombre);
        const ir = () => { sel = d; pintarTodo(); chips.scrollIntoView({ block: 'center', behavior: 'smooth' }); };
        e.onclick = ir; e.onkeydown = ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); ir(); } };
        g.appendChild(e);
      }));
      semana.append(h('h2', null, 'Toda la semana'), g);
      const prof = h('div', 'hr-profes');
      Object.keys(MATERIAS).filter(k => k !== 'act').forEach(k => { const m = MATERIAS[k]; prof.appendChild(poner(h('div', null, '<i></i><div>' + esc(m.nombre) + (m.profe ? '<span>' + esc(m.profe) + '</span>' : '') + '</div>'), tema(k))); });
      semana.append(h('h2', null, 'Materias y profesores'), prof);
      semana.firstChild.style.cssText = 'font-size:1.1rem;margin:22px 0 4px';
      semana.lastChild.previousSibling.style.cssText = 'font-size:1.1rem;margin:22px 0 4px';
    }
    function pintarTodo() { pintarChips(); pintarLista(); pintarSemana(); }

    v.appendChild(h('div', 'vista-tit', '<h1>Mi horario</h1><p>Grupo ' + GRUPO.grupo + ' · semestre ' + GRUPO.semestre + '. Toca un día o una clase de la semana.</p>'));
    cuerpo.append(chips, lista, semana);
    v.appendChild(cuerpo);
    if (!ahora.esDiaDeClases) lista.before(h('div', 'hr-libre', 'Hoy no hay clases. Aquí está el lunes; toca otro día para verlo.'));
    pintarTodo();
  }

  /* ---------- Tarjeta «Hoy» del inicio ---------- */
  function tarjetaHoy(v, Aula) {
    const ahora = estadoAhora(), f = new Date();
    const card = h('section', 'hoy-card');
    card.setAttribute('aria-label', 'Hoy');
    let fecha = f.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' });
    fecha = fecha.charAt(0).toUpperCase() + fecha.slice(1);
    card.appendChild(h('div', null, '<h2>Hoy</h2><div class="hoy-fecha">' + esc(fecha) + '</div>'));
    const linea = (b, etiqueta, extra) => {
      const m = MATERIAS[b.materia];
      const el = poner(h('div', 'hoy-ahora'), tema(b.materia));
      el.innerHTML = '<span class="hr-pildora">' + etiqueta + '</span><div><b>' + esc(m.nombre) + '</b><span>' + extra + (b.aula ? ' · Aula ' + esc(b.aula) : '') + '</span></div>';
      return el;
    };
    if (ahora.actual) {
      card.appendChild(linea(ahora.actual, 'Ahora', 'hasta las ' + hh(ahora.actual.fin)));
      if (ahora.sigue && ahora.sigue.ini === ahora.actual.fin) card.appendChild(linea(ahora.sigue, 'Sigue', 'a las ' + hh(ahora.sigue.ini)));
    } else if (ahora.sigue) {
      card.appendChild(linea(ahora.sigue, ahora.receso ? 'Después del receso' : 'Sigue', 'a las ' + hh(ahora.sigue.ini)));
    } else if (ahora.esDiaDeClases) {
      card.appendChild(h('p', null, 'Ya terminaron tus clases de hoy.'));
    } else {
      card.appendChild(h('p', null, 'Hoy no hay clases.'));
    }
    if (!ahora.actual && !ahora.sigue && ahora.proxBloque) {
      const m = MATERIAS[ahora.proxBloque.materia];
      card.appendChild(h('p', 'hoy-fecha', 'Próxima clase: ' + NOMBRE_DIA[ahora.proxDia].toLowerCase() + ' a las ' + hh(ahora.proxBloque.ini) + ', ' + esc(m.nombre) + '.'));
    }
    if (ahora.hoy.length) {
      const fila = h('div', 'hoy-fila');
      const min = f.getHours() * 60 + f.getMinutes();
      ahora.hoy.forEach(b => fila.appendChild(poner(h('span', 'hoy-mini' + (b.fin * 60 <= min ? ' pasada' : ''), hh(b.ini).replace(':00', '') + ' ' + esc(MATERIAS[b.materia].corto)), tema(b.materia))));
      card.appendChild(fila);
    }
    const tareas = (Aula && Aula.tareas ? Aula.tareas() : []).filter(t => !Aula.tareaHecha(t.id) && new Date(t.vence).getTime() > Date.now()).slice(0, 3);
    if (tareas.length) {
      const box = h('div', 'hoy-tareas');
      box.appendChild(h('b', null, 'Por entregar'));
      tareas.forEach(t => { const fa = Aula.faltan(t.vence); box.appendChild(h('div', 'hoy-tarea', '<span>' + esc(t.titulo) + '</span><span class="' + (fa.dias <= 1 ? 'urgente' : '') + '">' + esc(fa.texto) + '</span>')); });
      card.appendChild(box);
    }
    card.appendChild(h('div', 'hoy-enlaces', '<a href="#tareas-horario">Ver horario</a><a href="#tareas-tareas">Ver tareas</a>'));
    return card;
  }

  root.AULA_HORARIO = { pintar, estadoAhora, bloques, materias: MATERIAS, dias: DIAS };
  root.AULA_INICIO = root.AULA_INICIO || [];
  root.AULA_INICIO.push(tarjetaHoy);
})(window);
