/* Aula 503 — módulo «Calificaciones».
   Cómo se calcula (según tu universidad):
     3 parciales juntos = 50 % de la calificación final  → se promedian y ese promedio vale la mitad
     ordinario          = el otro 50 %
     final = promedio de los 3 parciales × 0.5 + ordinario × 0.5
   Se guarda en S.notas = { min: 6, m: { redes: { p1, p2, p3, ord }, … } }, dentro del mismo avance
   (entra en copias, respaldo y sincronización). Es el único lugar que conoce la fórmula: cámbiala en calc(). */
(function (root) {
  'use strict';

  const MATERIAS = [
    ['redes', 'Redes I'], ['ia', 'Fundamentos de IA'], ['is', 'Ingeniería de Software I'], ['so', 'Fundamentos de Sistemas Operativos'],
    ['pdm', 'Programación de dispositivos móviles'], ['web', 'Tecnologías Web I'], ['ingles', 'Inglés'], ['emp', 'Emprendimiento e Innovación']
  ];
  const CAMPOS = [['p1', 'Parcial 1'], ['p2', 'Parcial 2'], ['p3', 'Parcial 3'], ['ord', 'Ordinario']];
  const PESO_PARCIALES = 0.5, PESO_ORDINARIO = 0.5;

  /* ---------- Cálculo (sin pantalla: se puede probar solo) ---------- */
  // Texto escrito → número 0–10, null si está vacío, NaN si no es válido
  function leer(v) {
    if (v === null || v === undefined) return null;
    const t = String(v).trim().replace(',', '.');
    if (!t) return null;
    if (!/^\d{1,2}(\.\d{0,2})?$/.test(t)) return NaN;
    const n = Number(t);
    return n >= 0 && n <= 10 ? n : NaN;
  }
  const redondear = n => Math.round(n * 100) / 100;
  const fmt = n => String(redondear(n));

  function calc(m, min) {
    m = m || {};
    const ps = ['p1', 'p2', 'p3'].map(k => leer(m[k])).filter(x => x !== null && !isNaN(x));
    const promParciales = ps.length ? ps.reduce((a, b) => a + b, 0) / ps.length : null;
    const ord = leer(m.ord);
    const ordOk = ord !== null && !isNaN(ord) ? ord : null;
    const completos = ps.length === 3;
    const final = promParciales !== null && ordOk !== null ? promParciales * PESO_PARCIALES + ordOk * PESO_ORDINARIO : null;
    // Lo que hace falta en el ordinario para llegar a una calificación meta
    const necesito = meta => promParciales === null ? null : (meta - promParciales * PESO_PARCIALES) / PESO_ORDINARIO;
    return { ps, promParciales, ord: ordOk, completos, final, provisional: final !== null && !completos, necesito, aprobada: final !== null ? final >= min - 1e-9 : null };
  }

  /* ---------- Estilos ---------- */
  const CSS = `
.nt-res-top{background:var(--surface);border:1.5px solid var(--line);border-radius:18px;padding:14px 16px;display:grid;gap:10px;margin-bottom:14px}
.nt-res-top h2{font-size:1.1rem}
.nt-datos{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
.nt-datos>div{background:var(--surface-2);border-radius:12px;padding:10px 12px;display:grid}
.nt-datos b{font:800 1.6rem var(--f-display);font-variant-numeric:tabular-nums}
.nt-datos span{color:var(--muted);font-size:.82rem}
.nt-min{display:flex;gap:8px;align-items:center;flex-wrap:wrap;font-size:.9rem;color:var(--muted)}
.nt-lista{display:grid;gap:12px}
.nt-card{background:color-mix(in srgb,var(--mc) 9%,var(--surface));border:1.5px solid color-mix(in srgb,var(--mc) 35%,var(--line));border-left:6px solid var(--mc);border-radius:16px;padding:12px 14px;display:grid;gap:10px;min-width:0}
.nt-cab{display:flex;justify-content:space-between;align-items:flex-start;gap:8px}
.nt-cab h3{font-size:1.02rem;line-height:1.2;min-width:0;overflow-wrap:anywhere}
.nt-estado{font:800 .7rem var(--f-ui);text-transform:uppercase;letter-spacing:.05em;border-radius:999px;padding:.25em .7em;white-space:nowrap;background:var(--surface-2);color:var(--muted);border:1.5px solid var(--line)}
.nt-estado:empty{display:none}
.nt-estado.ok{background:var(--ok-soft);color:var(--ok);border-color:var(--ok)}
.nt-estado.mal{background:var(--mal-soft);color:var(--mal);border-color:var(--mal)}
.nt-estado.ojo{background:var(--amber-soft);color:var(--amber);border-color:var(--amber)}
.nt-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px}
.nt-campo{display:grid;gap:3px;min-width:0}
.nt-campo span{font-size:.72rem;font-weight:700;color:var(--muted);white-space:nowrap}
.nt-campo input{width:100%;min-width:0;text-align:center;font-size:16px;font-weight:700;border:1.5px solid var(--line);border-radius:10px;padding:.55em .2em;background:var(--surface);color:var(--fg);font-variant-numeric:tabular-nums}
.nt-campo input:focus{border-color:var(--accent);outline:none}
.nt-campo input.mal{border-color:var(--mal);background:var(--mal-soft)}
.nt-campo.ord input{border-color:color-mix(in srgb,var(--mc) 60%,var(--line))}
.nt-res{display:grid;gap:3px;font-size:.92rem}
.nt-res .nt-final{font:800 1.15rem var(--f-display)}
.nt-res .nt-tenue{color:var(--muted);font-size:.85rem}
.nt-necesito{display:grid;gap:2px;background:var(--surface-2);border-radius:10px;padding:8px 10px;font-size:.88rem}
.nt-necesito b{font-variant-numeric:tabular-nums}
.nt-nota{color:var(--muted);font-size:.85rem;margin-top:12px}
`;
  (function () { const s = document.createElement('style'); s.setAttribute('data-modulo', 'calificaciones'); s.textContent = CSS; document.head.appendChild(s); })();

  /* ---------- Pantalla ---------- */
  function pintar(v, Aula) {
    const esc = Aula.util.esc;
    const h = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
    const S = Aula.estado();
    if (!S.notas || typeof S.notas !== 'object') S.notas = {};
    if (!S.notas.m || typeof S.notas.m !== 'object') S.notas.m = {};
    const minimo = () => (typeof S.notas.min === 'number' ? S.notas.min : 6);
    const hue = id => { const m = root.AULA_HORARIO && root.AULA_HORARIO.materias[id]; return m ? m.hue : 215; };

    const resumen = h('section', 'nt-res-top');
    const lista = h('div', 'nt-lista');
    v.appendChild(h('div', 'vista-tit', '<h1>Calificaciones</h1><p>Llénalo poco a poco, conforme te den tus calificaciones. Con lo que lleves te digo cuánto necesitas en el ordinario.</p>'));
    v.append(resumen, lista);
    v.appendChild(h('p', 'nt-nota', 'Final = promedio de los 3 parciales × 50 % + ordinario × 50 %. Se guarda solo en este dispositivo y viaja en tu respaldo. Si tu universidad redondea de otra forma, confirma tu calificación oficial con tu profesor.'));

    function pintarResumen() {
      const cs = MATERIAS.map(([id]) => calc(S.notas.m[id], minimo()));
      const completas = cs.filter(c => c.final !== null && c.completos);
      const conParciales = cs.filter(c => c.promParciales !== null);
      const aprobadas = completas.filter(c => c.aprobada).length;
      const prom = a => a.length ? fmt(a.reduce((x, y) => x + y, 0) / a.length) : '—';
      resumen.innerHTML = '<h2>Resumen</h2><div class="nt-datos">' +
        '<div><b>' + prom(conParciales.map(c => c.promParciales)) + '</b><span>promedio de parciales hasta ahora' + (conParciales.length ? ' (' + conParciales.length + ' de ' + MATERIAS.length + ' materias)' : '') + '</span></div>' +
        '<div><b>' + prom(completas.map(c => c.final)) + '</b><span>promedio de finales' + (completas.length ? ' · ' + aprobadas + ' de ' + completas.length + ' aprobadas' : ' (cuando tengas parciales y ordinario)') + '</span></div></div>';
      const min = h('div', 'nt-min', 'Calificación aprobatoria:');
      [6, 7, 8].forEach(n => {
        const b = h('button', 'chip' + (minimo() === n ? ' on' : ''), String(n)); b.type = 'button'; b.setAttribute('aria-pressed', minimo() === n);
        b.onclick = () => { S.notas.min = n; Aula.guardar(); pintarResumen(); lista.querySelectorAll('.nt-card').forEach(c => c._pintarRes()); };
        min.appendChild(b);
      });
      resumen.appendChild(min);
    }

    MATERIAS.forEach(([id, nombre]) => {
      const card = h('article', 'nt-card');
      card.style.setProperty('--mc', 'hsl(' + hue(id) + ' 62% 46%)');
      const estado = h('span', 'nt-estado', '');
      const cab = h('div', 'nt-cab'); cab.append(h('h3', null, esc(nombre)), estado);
      const grid = h('div', 'nt-grid');
      const res = h('div', 'nt-res'); res.setAttribute('aria-live', 'polite');
      const entradas = {};
      CAMPOS.forEach(([k, etq]) => {
        const lab = h('label', 'nt-campo' + (k === 'ord' ? ' ord' : ''), '<span>' + etq + '</span>');
        const inp = h('input'); inp.type = 'text'; inp.inputMode = 'decimal'; inp.autocomplete = 'off'; inp.maxLength = 5; inp.enterKeyHint = 'done';
        inp.placeholder = '—'; inp.setAttribute('aria-label', nombre + ', ' + etq);
        const g = S.notas.m[id] && S.notas.m[id][k];
        inp.value = g === null || g === undefined ? '' : String(g);
        inp.addEventListener('input', () => {
          const n = leer(inp.value);
          inp.classList.toggle('mal', isNaN(n));
          if (isNaN(n)) { res.innerHTML = '<span class="malo">Escribe un número del 0 al 10 (por ejemplo 8 o 8.5).</span>'; estado.textContent = ''; return; }
          const fila = S.notas.m[id] = S.notas.m[id] || {};
          if (n === null) delete fila[k]; else fila[k] = n;
          Aula.guardar(); pintarRes(); pintarResumen();
        });
        lab.appendChild(inp); grid.appendChild(lab); entradas[k] = inp;
      });
      function pintarRes() {
        const c = calc(S.notas.m[id], minimo());
        estado.className = 'nt-estado'; estado.textContent = '';
        let html = '';
        if (c.promParciales === null && c.ord === null) html = '<span class="nt-tenue">Escribe tus calificaciones para ver el resultado.</span>';
        else {
          if (c.promParciales !== null) html += '<span>Promedio de parciales' + (c.completos ? '' : ' (con ' + c.ps.length + ' de 3)') + ': <b>' + fmt(c.promParciales) + '</b> → aporta <b>' + fmt(c.promParciales * PESO_PARCIALES) + '</b> de 5</span>';
          if (c.final !== null) {
            html += '<span class="nt-final">Calificación final' + (c.provisional ? ' (provisional)' : '') + ': ' + fmt(c.final) + '</span>';
            estado.textContent = c.aprobada ? 'Aprobada' : 'Reprobada'; estado.classList.add(c.aprobada ? 'ok' : 'mal');
            if (c.provisional) html += '<span class="nt-tenue">Faltan parciales: este resultado puede cambiar.</span>';
          } else if (c.promParciales !== null) {
            const metas = [[minimo(), 'Para aprobar (' + minimo() + ')'], [8, 'Para sacar 8'], [9, 'Para sacar 9'], [10, 'Para sacar 10']].filter(([n], i, a) => i === 0 || n > minimo());
            const filas = metas.map(([n, etq]) => { const x = c.necesito(n); return '<span>' + etq + ': ' + (x > 10 ? '<b>ya no alcanza</b>' : 'saca al menos <b>' + fmt(Math.max(0, x)) + '</b> en el ordinario') + '</span>'; });
            html += '<div class="nt-necesito">' + filas.join('') + (c.completos ? '' : '<span class="nt-tenue">Con los parciales que llevas; cambia al capturar los demás.</span>') + '</div>';
            const x = c.necesito(minimo());
            estado.textContent = x > 10 ? 'Difícil' : 'En curso'; estado.classList.add(x > 10 ? 'mal' : 'ojo');
          }
        }
        res.innerHTML = html;
      }
      card._pintarRes = pintarRes;
      card.append(cab, grid, res); lista.appendChild(card); pintarRes();
    });
    pintarResumen();
  }

  root.AULA_NOTAS = { pintar, calc, leer, materias: MATERIAS };
})(window);
