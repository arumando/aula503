/* Aula 503 — arranque: carga los módulos de js/modulos.js en orden y quita la pantalla de inicio. */
(function () {
  'use strict';
  var modulos = window.AULA_MODULOS || [];
  var total = modulos.reduce(function (n, m) { return n + m.archivos.length; }, 0);
  var hechos = 0, fallo = null;
  var barra = document.querySelector('#arranque .arr-barra i');
  var nota = document.querySelector('#arranque .arr-nota');
  window.AULA_CARGA = {};   // id del módulo → 'ok' | 'error'

  function avance() {
    hechos++;
    if (barra) barra.style.width = Math.round(hechos / total * 100) + '%';
    if (hechos === total) terminar();
  }
  function terminar() {
    var a = document.getElementById('arranque');
    if (fallo) {
      if (nota) nota.innerHTML = 'No se pudo cargar <b>' + fallo.nombre + '</b>. Revisa tu conexión.<br><button type="button" class="btn btn-primario" onclick="location.reload()">Reintentar</button>';
      return;
    }
    if (a) { a.classList.add('fuera'); setTimeout(function () { a.remove(); }, 320); }
  }
  modulos.forEach(function (m) {
    window.AULA_CARGA[m.id] = 'ok';
    m.archivos.forEach(function (src) {
      var s = document.createElement('script');
      s.src = src;
      s.async = false;             // se descargan en paralelo y se ejecutan en este orden
      s.onload = avance;
      s.onerror = function () {
        window.AULA_CARGA[m.id] = 'error';
        if (m.esencial && !fallo) fallo = m;
        avance();
      };
      document.head.appendChild(s);
    });
  });
})();
