/* Aula 503 — el camino de aprendizaje (estilo Duolingo).
   Cada lección es una secuencia de pasos: explicar, hacer (misión) y comprobar. */
(function (root) {
  'use strict';
  const mask24 = '255.255.255.0';
  const T = root.T || ((k, t) => t);

  /* ======================= REDES ======================= */
  const redes = {
    id: 'redes', nombre: 'Redes desde cero', corto: 'Redes', color: 'redes',
    lema: 'Arma redes, conecta cables y mira viajar cada mensaje.',
    unidades: [
      {
        titulo: 'Tu primera red', desc: 'Conecta dos computadoras y manda tu primer mensaje.',
        lecciones: [
          {
            id: 'r1', titulo: '¿Qué es una red?', pasos: [
              { tipo: 'explica', titulo: 'Una red es como las calles de un pueblo', texto:
                '<p>Una <b>red</b> es un grupo de equipos conectados para compartir información. Piensa en Ixtlán: las casas están unidas por calles, y por esas calles viajan las cartas.</p>' +
                '<div class="tres"><div><b>Dispositivos finales</b><span>Las «casas»: PC, laptop, celular, servidor. Ahí empiezan y terminan los mensajes.</span></div><div><b>Dispositivos intermediarios</b><span>Los «cruceros y casetas»: switch y router. Llevan los mensajes a su destino.</span></div><div><b>Medios</b><span>Las «calles»: cable de cobre, fibra óptica o señal inalámbrica (Wi-Fi).</span></div></div>' },
              { tipo: 'descubre', titulo: 'Conoce a los personajes', texto: '<p>En el simulador vas a ver estos cuatro. Toca cada tarjeta.</p>', tarjetas: [
                { titulo: 'PC, laptop o servidor', icono: 'pc', html: 'Son las «casas». Aquí <b>empiezan y terminan</b> los mensajes: tú escribes en tu PC y el mensaje llega a otra PC. Se llaman <b>dispositivos finales</b>.' },
                { titulo: 'Cable', icono: 'cable', html: 'Es la «calle» por donde viajan los mensajes. En el simulador se ve como una línea entre dos equipos, con lucecitas verdes en las puntas cuando está bien conectado.' },
                { titulo: 'Switch', icono: 'switch', html: 'El <b>repartidor de un edificio</b>. Todas las computadoras de un salón se conectan a él, y él entrega cada mensaje solo a quien le toca.' },
                { titulo: 'Router', icono: 'router', html: 'La <b>oficina de correos entre dos colonias</b>. Une redes distintas: por ejemplo, la red de tu casa con Internet. El módem de tu casa tiene un router adentro.' }
              ] },
              { tipo: 'pregunta', texto: '¿Cuál de estos es un <b>dispositivo final</b>?', opciones: ['Un switch', 'Una laptop', 'Un router', 'Un cable de red'], correcta: 1,
                explica: 'La laptop es donde la persona crea o recibe la información. El switch y el router solo la transportan, y el cable es el medio.' },
              { tipo: 'mision', titulo: 'Conecta dos computadoras', texto:
                '<ol><li>Arriba del dibujo elige la herramienta <b>Cable</b>. Toca <b>PC1</b> y después <b>PC2</b>: aparece una línea entre las dos.</li><li>Regresa a <b>Mover</b> y toca <b>PC1</b>. A la derecha (o abajo, en celular) aparece su ficha.</li><li>En «Mandar un ping a…» elige <b>PC2</b> y presiona <b>Enviar</b>. Un ' + T('ping', 'ping') + ' es un mensajito de «¿me escuchas?».</li><li>Mira cómo viaja el sobre y lee abajo lo que va pasando.</li></ol><p class="nota-chica">No te preocupes por los números que ves debajo de cada PC: son su dirección, y la siguiente lección trata de eso.</p>',
                red: { devices: [{ tipo: 'pc', id: 'PC1', x: 230, y: 250, ip: '192.168.1.1', fijo: true }, { tipo: 'pc', id: 'PC2', x: 670, y: 250, ip: '192.168.1.2', fijo: true }] },
                herramientas: ['mover', 'cable'], editable: false,
                metas: [
                  { t: 'Conecta PC1 con PC2 usando un cable', ok: c => c.unidos('PC1', 'PC2') },
                  { t: 'Envía un ping de PC1 a PC2 y que llegue', ok: c => c.pingOk('PC1', 'PC2') }
                ] },
              { tipo: 'pregunta', texto: 'Un <b>ping</b> es…', opciones: ['Un virus que viaja por la red', 'Un mensaje de prueba: «¿me escuchas?», y el otro contesta', 'El nombre del cable azul', 'Una forma de apagar la computadora'], correcta: 1,
                explica: 'Ping manda un mensaje ICMP de «eco». Si el otro equipo contesta, sabemos que hay comunicación entre los dos.' }
            ]
          },
          {
            id: 'r2', titulo: 'La dirección IP', pasos: [
              { tipo: 'explica', titulo: 'Cada equipo necesita una dirección', texto:
                '<p>Para que una carta llegue, la casa necesita dirección: calle, número, colonia. Si no, el cartero no sabe a dónde llevarla.</p>' +
                '<p>En una red pasa lo mismo. Cada computadora tiene una dirección, y se llama <b>dirección IP</b> (de <i>Internet Protocol</i>). Se ve así:</p><div class="ejemplo mono">192.168.1.25</div>' +
                '<p>Parece un número raro, pero se lee fácil. Vamos por partes.</p>' },
              { tipo: 'descubre', titulo: 'Cómo se lee una dirección IP', texto: '<div class="ejemplo mono" style="font-size:1.35rem;text-align:center"><span class="m-red">192.168.1</span>.<span class="m-host">25</span></div>', tarjetas: [
                { titulo: 'Son 4 números', html: 'Separados por puntos: <b>192</b> · <b>168</b> · <b>1</b> · <b>25</b>. Cada uno va del <b>0 al 255</b>. Si ves un 300, está mal escrita.' },
                { titulo: '<span class="m-red">192.168.1</span> = la colonia', html: 'Los primeros números dicen <b>en qué red está</b>. Todas las computadoras de tu salón comparten esta parte, como los vecinos comparten colonia.' },
                { titulo: '<span class="m-host">25</span> = el número de casa', html: 'El último número dice <b>qué equipo es</b> dentro de esa red. No se puede repetir: dos casas con el mismo número confundirían al cartero.' },
                { titulo: '¿Y la «máscara» 255.255.255.0?', html: 'Es la regla que dice <b>cuántos números son la colonia</b>. <span class="mono">255.255.255.0</span> significa: «los 3 primeros son la colonia y el último es la casa». Casi siempre usarás esa.' }
              ] },
              { tipo: 'pregunta', texto: 'En la dirección <span class="mono">192.168.1.<b>40</b></span>, ¿cuál es el «número de casa» (el equipo)?', opciones: ['192', '168.1', '40', '255'], correcta: 2,
                explica: 'Con máscara 255.255.255.0, los 3 primeros números (192.168.1) son la colonia y el último (40) es el equipo.' },
              { tipo: 'pregunta', texto: '¿Cuál de estas es una dirección IP <b>válida</b>?', opciones: ['192.168.1.300', '192.168.1.25', '192.168.1', '10.0.0.0.1'], correcta: 1,
                explica: '192.168.1.300 tiene un número mayor que 255; 192.168.1 solo tiene 3 partes, y 10.0.0.0.1 tiene 5. Una IP siempre tiene 4 números entre 0 y 255.' },
              { tipo: 'mision', titulo: 'PC2 no tiene dirección', texto:
                '<p>Las PC ya están conectadas, pero <b>PC2 no tiene IP</b>.</p><ol><li>Prueba un ping desde PC1 a PC2: verás que no puede.</li><li>Toca <b>PC2</b> y escribe la IP <span class="mono">192.168.1.2</span> con máscara <span class="mono">255.255.255.0</span>.</li><li>Vuelve a enviar el ping desde PC1.</li></ol>',
                red: { devices: [{ tipo: 'pc', id: 'PC1', x: 230, y: 250, ip: '192.168.1.1', fijo: true }, { tipo: 'pc', id: 'PC2', x: 670, y: 250, fijo: true }], links: [['PC1', 'PC2']] },
                herramientas: ['mover'],
                metas: [
                  { t: 'Dale a PC2 una IP de la red 192.168.1.x', ok: c => c.mismaRed('PC1', 'PC2') && c.ip('PC2') !== c.ip('PC1') },
                  { t: 'Haz que el ping de PC1 a PC2 funcione', ok: c => c.pingOk('PC1', 'PC2') }
                ] },
              { tipo: 'pregunta', texto: '¿Qué pasa si dos equipos de la misma red tienen <b>la misma IP</b>?', opciones: ['Nada, funcionan más rápido', 'Hay un conflicto: la red no sabe a cuál entregar los mensajes', 'Se suman sus velocidades', 'Se apagan automáticamente'], correcta: 1,
                explica: 'Igual que dos casas con la misma dirección: el cartero no sabe a cuál dejarle la carta. Cada IP debe ser única dentro de su red.' }
            ]
          },
          {
            id: 'r3', titulo: 'El switch', pasos: [
              { tipo: 'explica', titulo: 'Un recepcionista que aprende', texto:
                '<p>Con dos PC basta un cable. ¿Y con 30 computadoras del laboratorio? No puedes unir cada una con todas. Para eso está el <b>switch</b>: todas se conectan a él.</p>' +
                '<p>El switch es como un <b>recepcionista</b>: anota en una libreta (su <b>tabla de direcciones MAC</b>) en qué puerto está cada equipo. La primera vez que no sabe dónde está alguien, <b>copia el mensaje por todos los puertos</b> (eso se llama <b>inundar</b>). Después ya lo manda directo.</p>' },
              { tipo: 'mision', titulo: 'Tres PC y un switch', texto:
                '<ol><li>Con la herramienta <b>Cable</b>, conecta PC1, PC2 y PC3 al switch.</li><li>Activa <b>Paso a paso</b> (arriba a la derecha) y manda un ping de <b>PC1 a PC3</b>. Observa cómo el switch inunda la primera pregunta.</li><li>Manda el mismo ping otra vez: ahora el switch ya sabe dónde está cada quien.</li></ol>',
                red: { devices: [{ tipo: 'switch', id: 'SW1', x: 450, y: 140, fijo: true }, { tipo: 'pc', id: 'PC1', x: 200, y: 360, ip: '192.168.1.1', fijo: true }, { tipo: 'pc', id: 'PC2', x: 450, y: 390, ip: '192.168.1.2', fijo: true }, { tipo: 'pc', id: 'PC3', x: 700, y: 360, ip: '192.168.1.3', fijo: true }] },
                herramientas: ['mover', 'cable'], editable: false, pasoAPaso: true,
                metas: [
                  { t: 'Conecta las tres PC al switch', ok: c => c.unidos('PC1', 'SW1') && c.unidos('PC2', 'SW1') && c.unidos('PC3', 'SW1') },
                  { t: 'Ping de PC1 a PC3 que funcione', ok: c => c.pingOk('PC1', 'PC3') },
                  { t: 'Repite el ping para ver al switch ya «enseñado»', ok: c => c.pingsOk('PC1', 'PC3') >= 2 }
                ] },
              { tipo: 'pregunta', texto: 'La primera vez, el switch no sabía en qué puerto estaba PC3. ¿Qué hizo?', opciones: ['Tiró el mensaje a la basura', 'Lo copió por todos sus puertos menos por donde llegó', 'Se lo regresó a PC1', 'Le preguntó al router'], correcta: 1,
                explica: 'Eso es la inundación. Cuando PC3 contestó, el switch anotó su MAC y su puerto; por eso el segundo ping fue directo.' },
              { tipo: 'pregunta', texto: '¿Qué guarda la <b>tabla de direcciones MAC</b> de un switch?', opciones: ['Las contraseñas de los usuarios', 'Qué MAC está conectada en cada puerto', 'Las páginas web visitadas', 'Las IP de Internet'], correcta: 1,
                explica: 'Cada vez que llega una trama, el switch mira la MAC de origen y anota: «esta MAC vive en este puerto».' }
            ]
          }
        ]
      },
      {
        titulo: 'Por dentro del mensaje', desc: 'Abre los «sobres»: MAC, IP y ARP.',
        lecciones: [
          {
            id: 'r4', titulo: 'MAC e IP: sobres dentro de sobres', pasos: [
              { tipo: 'descubre', titulo: '¿Qué es la MAC? El gafete de cada equipo', texto: '<p>Además de su dirección IP, cada equipo tiene otro número: la <b>MAC</b>. Toca las tarjetas.</p>', tarjetas: [
                { titulo: 'Viene de fábrica', html: 'La tarjeta de red (la pieza donde se conecta el cable o el Wi-Fi) trae grabado un número único desde que la fabricaron. Es como el <b>gafete</b> con tu nombre, o el número de serie de tu celular.' },
                { titulo: 'Se ve así', html: '<span class="mono">00:1A:2B:3C:4D:5E</span><br>Son 6 pares de números y letras (A a F). <b>No necesitas memorizarla</b>: los equipos la averiguan solos.' },
                { titulo: 'IP contra MAC', html: 'La <b>IP</b> es tu domicilio: cambia si te mudas a otra red. La <b>MAC</b> es tu gafete: siempre es la misma, estés donde estés.' },
                { titulo: '¿Para qué dos?', html: 'La <b>IP</b> dice a quién va el mensaje <b>al final</b>. La <b>MAC</b> dice quién lo recibe <b>en este tramo del camino</b>, como cuando una carta pasa de mano en mano hasta llegar.' }
              ] },
              { tipo: 'explica', titulo: 'Dos direcciones distintas', texto:
                '<p>Cada tarjeta de red trae de fábrica una <b>dirección MAC</b>: 6 pares de números en hexadecimal, como <span class="mono">00:1A:2B:3C:4D:5E</span>. Es como el número de tu INE: no cambia aunque te mudes.</p>' +
                '<p>La <b>IP</b> es como tu domicilio: depende de la red donde estés y se puede cambiar.</p>' +
                '<p>Un mensaje viaja como <b>sobres dentro de sobres</b> (encapsulamiento): el <b>paquete IP</b> (con las IP de origen y destino final) va dentro de una <b>trama Ethernet</b> (con las MAC de quien lo manda y de quien lo recibe en ese tramo).</p>' },
              { tipo: 'mision', titulo: 'Abre un sobre en pleno viaje', texto:
                '<p>Activa <b>Paso a paso</b>, manda un ping de <b>PC1 a PC2</b> y, mientras el sobre se mueve, <b>tócalo</b> para ver qué lleva adentro.</p>',
                red: { devices: [{ tipo: 'switch', id: 'SW1', x: 450, y: 150, fijo: true }, { tipo: 'pc', id: 'PC1', x: 230, y: 360, ip: '192.168.1.10', fijo: true }, { tipo: 'laptop', id: 'Laptop1', x: 450, y: 390, ip: '192.168.1.11', fijo: true }, { tipo: 'pc', id: 'PC2', x: 670, y: 360, ip: '192.168.1.12', fijo: true }], links: [['PC1', 'SW1'], ['Laptop1', 'SW1'], ['PC2', 'SW1']] },
                herramientas: ['mover'], editable: false, pasoAPaso: true,
                metas: [
                  { t: 'Envía un ping de PC1 a PC2', ok: c => c.pingOk('PC1', 'PC2') },
                  { t: 'Toca un sobre en movimiento para abrirlo', ok: c => c.hubo('inspeccion') }
                ] },
              { tipo: 'pregunta', texto: 'La MAC de destino <span class="mono">FF:FF:FF:FF:FF:FF</span> significa…', opciones: ['Que el mensaje está dañado', 'Que el mensaje es para todos los equipos de la red (difusión)', 'Que va hacia Internet', 'Que es para el router'], correcta: 1,
                explica: 'Es la dirección de difusión (broadcast): todos los equipos de la red local reciben esa trama.' },
              { tipo: 'pregunta', texto: '¿Cuál de las dos direcciones viene <b>grabada de fábrica</b> en la tarjeta de red?', opciones: ['La IP', 'La MAC', 'Las dos', 'Ninguna'], correcta: 1,
                explica: 'La MAC viene de fábrica (sus primeros 3 pares identifican al fabricante). La IP la asigna la red o la escribe el administrador.' }
            ]
          },
          {
            id: 'r5', titulo: 'ARP: ¿quién tiene esta IP?', pasos: [
              { tipo: 'explica', titulo: 'Sé su IP, pero no su MAC', texto:
                '<p>Para escribir el sobre, PC1 necesita el <b>gafete (MAC)</b> del destino, pero solo conoce su <b>dirección (IP)</b>. Es como saber que tu amigo vive en el depto 40, pero no conocerlo de vista. Entonces pregunta en voz alta a todos: <b>«¿Quién tiene la dirección 192.168.1.40?»</b>. Eso es ' + T('arp', 'ARP') + '.</p>' +
                '<p>Solo el dueño de esa IP contesta: «Soy yo, mi MAC es…». PC1 lo anota en su <b>tabla ARP</b> para no volver a preguntar.</p>' },
              { tipo: 'mision', titulo: 'Mira a ARP trabajar', texto:
                '<ol><li>Manda un ping de <b>PC1 a PC4</b>. El primer sobre amarillo es la pregunta ARP.</li><li>Toca <b>PC1</b> y revisa su <b>tabla ARP</b>: ya aparece la MAC de PC4.</li><li>Manda el ping otra vez: ya no hay pregunta ARP.</li></ol>',
                red: { devices: [{ tipo: 'switch', id: 'SW1', x: 450, y: 140, fijo: true }, { tipo: 'pc', id: 'PC1', x: 150, y: 360, ip: '192.168.1.10', fijo: true }, { tipo: 'pc', id: 'PC2', x: 350, y: 390, ip: '192.168.1.20', fijo: true }, { tipo: 'pc', id: 'PC3', x: 550, y: 390, ip: '192.168.1.30', fijo: true }, { tipo: 'pc', id: 'PC4', x: 750, y: 360, ip: '192.168.1.40', fijo: true }], links: [['PC1', 'SW1'], ['PC2', 'SW1'], ['PC3', 'SW1'], ['PC4', 'SW1']] },
                herramientas: ['mover'], editable: false,
                metas: [
                  { t: 'Ping de PC1 a PC4 que funcione', ok: c => c.pingOk('PC1', 'PC4') },
                  { t: 'PC1 tiene anotada la MAC de PC4 en su tabla ARP', ok: c => !!c.dev('PC1').arp['192.168.1.40'] },
                  { t: 'Repite el ping (ya sin ARP)', ok: c => c.pingsOk('PC1', 'PC4') >= 2 }
                ] },
              { tipo: 'pregunta', texto: '¿Por qué el segundo ping ya no hizo la pregunta ARP?', opciones: ['Porque el switch se apagó', 'Porque PC1 guardó la MAC de PC4 en su tabla ARP', 'Porque PC4 cambió de IP', 'Porque ARP solo funciona una vez al día'], correcta: 1,
                explica: 'La tabla ARP funciona como una libreta de contactos. En equipos reales, las entradas se borran solas después de unos minutos.' },
              { tipo: 'pregunta', texto: 'Las otras PC (PC2 y PC3) también recibieron la pregunta ARP. ¿Qué hicieron?', opciones: ['Contestaron todas', 'La ignoraron, porque la IP que se buscaba no era la suya', 'La reenviaron a Internet', 'Se desconectaron'], correcta: 1,
                explica: 'Todos escuchan la difusión, pero solo responde quien tiene la IP buscada.' }
            ]
          },
          {
            id: 'r6', titulo: '¿Estamos en la misma red?', pasos: [
              { tipo: 'explica', titulo: 'La máscara: tu colonia', texto:
                '<p>La <b>máscara de subred</b> dice qué parte de la IP es la <b>red</b> («la colonia») y qué parte es el <b>equipo</b> («la casa»).</p>' +
                '<div class="ejemplo mono"><span class="m-red">192.168.1</span>.<span class="m-host">25</span> &nbsp; con máscara 255.255.255.0</div>' +
                '<p>Con <span class="mono">255.255.255.0</span> los primeros 3 números son la red. Así, <span class="mono">192.168.1.25</span> y <span class="mono">192.168.1.80</span> están en la <b>misma red</b>, pero <span class="mono">192.168.2.5</span> está en <b>otra</b>. Equipos de redes distintas no se hablan directamente: necesitan un router.</p>' },
              { tipo: 'pregunta', texto: 'Con máscara 255.255.255.0, ¿están en la misma red <span class="mono">10.0.5.20</span> y <span class="mono">10.0.5.200</span>?', opciones: ['Sí, los dos están en la red 10.0.5', 'No, porque el último número es diferente', 'Solo si tienen la misma MAC', 'No se puede saber'], correcta: 0,
                explica: 'Los tres primeros números (10.0.5) son iguales: misma red. El último número solo identifica a cada equipo.' },
              { tipo: 'mision', titulo: 'Una PC mal configurada', texto:
                '<p>Manda un ping de <b>PC1 a PC3</b>. No funcionará: PC3 quedó en otra red por error. Arregla la IP de <b>PC3</b> para que quede en la red <span class="mono">192.168.1.x</span> sin repetir la de otro equipo, y prueba de nuevo.</p>',
                red: { devices: [{ tipo: 'switch', id: 'SW1', x: 450, y: 140, fijo: true }, { tipo: 'pc', id: 'PC1', x: 200, y: 360, ip: '192.168.1.10', fijo: true }, { tipo: 'pc', id: 'PC2', x: 450, y: 390, ip: '192.168.1.20', fijo: true }, { tipo: 'pc', id: 'PC3', x: 700, y: 360, ip: '192.168.2.30', fijo: true }], links: [['PC1', 'SW1'], ['PC2', 'SW1'], ['PC3', 'SW1']] },
                herramientas: ['mover'],
                metas: [
                  { t: 'PC3 está en la misma red que PC1, con una IP que nadie más usa', ok: c => c.mismaRed('PC1', 'PC3') && c.ipUnica('PC3') },
                  { t: 'Ping de PC1 a PC3 que funcione', ok: c => c.pingOk('PC1', 'PC3') }
                ] },
              { tipo: 'pregunta', texto: 'En una red con máscara 255.255.255.0, ¿cuántos equipos pueden tener IP?', opciones: ['10', '100', '254', '1000'], correcta: 2,
                explica: 'El último número va de 0 a 255 (256 valores), pero el .0 identifica a la red y el .255 es la difusión. Quedan 254 para equipos.' }
            ]
          }
        ]
      },
      {
        titulo: 'Conectar redes', desc: 'El router une colonias distintas.',
        lecciones: [
          {
            id: 'r7', titulo: 'El router y la puerta de enlace', pasos: [
              { tipo: 'explica', titulo: 'La caseta entre dos colonias', texto:
                '<p>Un <b>router</b> une <b>redes distintas</b>. Cada una de sus interfaces (puertos) está en una red diferente y tiene su propia IP.</p>' +
                '<p>Cuando una PC quiere hablar con otra red, le entrega el mensaje a su <b>puerta de enlace</b> (gateway): la IP del router en su propia red. Es como dejar la carta en la caseta de correos de tu colonia.</p>' +
                '<p>Dato importante (lo viste en tu práctica de Wireshark): en cada salto el router pone un <b>sobre Ethernet nuevo</b>, así que <b>las MAC cambian</b>, pero las <b>IP de origen y destino no cambian</b>.</p>' },
              { tipo: 'mision', titulo: 'Configura las puertas de enlace', texto:
                '<p>El router <b>R1</b> ya tiene sus IP: <span class="mono">192.168.1.1</span> hacia la red de la izquierda y <span class="mono">192.168.2.1</span> hacia la derecha. Pero las PC no saben que existe.</p><ol><li>Toca <b>PC1</b> y escribe su puerta de enlace.</li><li>Haz lo mismo en <b>PC2</b> (¡ojo, está en otra red!).</li><li>Manda un ping de PC1 a PC2 y abre un sobre antes y después del router.</li></ol>',
                red: { devices: [
                  { tipo: 'pc', id: 'PC1', x: 110, y: 330, ip: '192.168.1.10', fijo: true }, { tipo: 'switch', id: 'SW1', x: 270, y: 200, fijo: true },
                  { tipo: 'router', id: 'R1', x: 450, y: 110, fijo: true, ifs: { 'Gi0/0': { ip: '192.168.1.1' }, 'Gi0/1': { ip: '192.168.2.1' } } },
                  { tipo: 'switch', id: 'SW2', x: 630, y: 200, fijo: true }, { tipo: 'pc', id: 'PC2', x: 790, y: 330, ip: '192.168.2.10', fijo: true }],
                  links: [['PC1', 'SW1'], { a: 'SW1', pa: 'Gi0/1', b: 'R1', pb: 'Gi0/0' }, { a: 'R1', pa: 'Gi0/1', b: 'SW2', pb: 'Gi0/1' }, ['SW2', 'PC2']] },
                herramientas: ['mover'],
                metas: [
                  { t: 'PC1 tiene como puerta de enlace a R1 (192.168.1.1)', ok: c => c.gw('PC1') === '192.168.1.1' },
                  { t: 'PC2 tiene como puerta de enlace a R1 (192.168.2.1)', ok: c => c.gw('PC2') === '192.168.2.1' },
                  { t: 'Ping de PC1 a PC2 que cruce el router', ok: c => c.pingOk('PC1', 'PC2') }
                ] },
              { tipo: 'pregunta', texto: 'Cuando el paquete cruza el router, ¿qué cambia?', opciones: ['Cambian las IP de origen y destino', 'Cambian las MAC (sobre Ethernet nuevo); las IP siguen igual', 'No cambia nada', 'Se borra el mensaje y se escribe otro'], correcta: 1,
                explica: 'Las MAC solo sirven dentro de cada red. Por eso en Wireshark solo veías la MAC de tu router, nunca la del servidor de Google.' },
              { tipo: 'pregunta', texto: '¿Cuál es la puerta de enlace correcta para una PC con IP <span class="mono">192.168.2.10</span>?', opciones: ['192.168.1.1', '192.168.2.1', '192.168.2.10', '255.255.255.0'], correcta: 1,
                explica: 'La puerta de enlace siempre debe estar en la misma red que la PC: aquí, la IP del router en la red 192.168.2.x.' }
            ]
          },
          {
            id: 'r8', titulo: 'Detective de redes', pasos: [
              { tipo: 'explica', titulo: 'Tres fallas escondidas', texto:
                '<p>En el trabajo real, la mitad del tiempo se va en <b>encontrar fallas</b>. En esta red hay <b>tres errores</b>. Usa el ping y lee la explicación de cada fallo para encontrarlos.</p>' +
                '<p>Pista: revisa cables, que la IP esté en la red correcta y la puerta de enlace.</p>' },
              { tipo: 'mision', titulo: 'Repara la red', texto: '<p>Logra que <b>PC1</b> pueda hacer ping a <b>PC2</b>, <b>PC3</b> y <b>PC4</b>.</p>',
                red: { devices: [
                  { tipo: 'pc', id: 'PC1', x: 90, y: 200, ip: '192.168.1.10', gw: '192.168.1.1', fijo: true }, { tipo: 'pc', id: 'PC2', x: 90, y: 400, ip: '192.168.1.20', gw: '192.168.1.1', fijo: true },
                  { tipo: 'switch', id: 'SW1', x: 270, y: 300, fijo: true },
                  { tipo: 'router', id: 'R1', x: 450, y: 300, fijo: true, ifs: { 'Gi0/0': { ip: '192.168.1.1' }, 'Gi0/1': { ip: '192.168.2.1' } } },
                  { tipo: 'switch', id: 'SW2', x: 630, y: 300, fijo: true },
                  { tipo: 'pc', id: 'PC3', x: 810, y: 200, ip: '192.168.20.30', gw: '192.168.2.1', fijo: true }, { tipo: 'pc', id: 'PC4', x: 810, y: 400, ip: '192.168.2.40', gw: '192.168.2.254', fijo: true }],
                  links: [['PC1', 'SW1'], { a: 'SW1', pa: 'Gi0/1', b: 'R1', pb: 'Gi0/0' }, { a: 'R1', pa: 'Gi0/1', b: 'SW2', pb: 'Gi0/1' }, ['SW2', 'PC3'], ['SW2', 'PC4']] },
                herramientas: ['mover', 'cable', 'borrar'],
                metas: [
                  { t: 'PC1 llega a PC2', ok: c => c.pingOk('PC1', 'PC2') },
                  { t: 'PC1 llega a PC3', ok: c => c.pingOk('PC1', 'PC3') },
                  { t: 'PC1 llega a PC4', ok: c => c.pingOk('PC1', 'PC4') }
                ] },
              { tipo: 'pregunta', texto: 'Si una PC puede hacer ping a las de su red pero <b>no a otras redes</b>, lo primero que revisas es…', opciones: ['La puerta de enlace', 'El color del cable', 'La MAC', 'El nombre de la PC'], correcta: 0,
                explica: 'Si su red funciona pero no sale de ella, casi siempre falta la puerta de enlace o está mal escrita.' }
            ]
          }
        ]
      },
      {
        titulo: 'Configura un switch', desc: 'Los comandos de Packet Tracer, paso a paso (Tarea 2).',
        lecciones: [
          {
            id: 'r9', titulo: 'La consola del switch', pasos: [
              { tipo: 'explica', titulo: 'Hablarle al switch con comandos', texto:
                '<p>Los switches Cisco se configuran escribiendo comandos en una <b>consola</b> (CLI). Hay varios <b>modos</b>, como cuartos de una casa, cada uno con más permisos:</p>' +
                '<div class="modos"><div><code>Switch&gt;</code><b>Usuario</b><span>Solo puedes ver cosas básicas.</span></div><div><code>Switch#</code><b>Privilegiado</b><span>Ves toda la configuración. Entras con <code>enable</code>.</span></div><div><code>Switch(config)#</code><b>Configuración</b><span>Aquí cambias cosas. Entras con <code>configure terminal</code>.</span></div></div>' +
                '<p>Puedes abreviar: <code>en</code> = enable, <code>conf t</code> = configure terminal, <code>sh run</code> = show running-config. Escribe <code>?</code> para ver ayuda.</p>' },
              { tipo: 'pregunta', texto: '¿En qué modo estás si ves el prompt <code>S1#</code>?', opciones: ['Usuario', 'Privilegiado', 'Configuración global', 'Configuración de línea'], correcta: 1,
                explica: 'El símbolo # indica modo privilegiado. El > es modo usuario y (config)# es configuración.' },
              { tipo: 'mision', titulo: 'Ponle nombre al switch', texto:
                '<ol><li>Toca el switch y presiona <b>Abrir consola</b>. Presiona Enter para empezar.</li><li>Escribe <code>enable</code> y luego <code>configure terminal</code>.</li><li>Escribe <code>hostname S1</code>.</li><li>Sal con <code>end</code> y revisa todo con <code>show running-config</code>.</li></ol>',
                red: { devices: [{ tipo: 'pc', id: 'PC1', x: 250, y: 300, ip: '192.168.1.10', fijo: true }, { tipo: 'switch', id: 'SW1', x: 600, y: 300, fijo: true }], links: [['PC1', 'SW1']] },
                herramientas: ['mover'], abrirConsola: 'SW1',
                metas: [
                  { t: 'Entra a modo privilegiado (enable)', ok: c => c.cli('SW1', 'enable') },
                  { t: 'Entra a modo configuración (configure terminal)', ok: c => c.cli('SW1', 'configure terminal') },
                  { t: 'Cámbiale el nombre a S1', ok: c => c.cfg('SW1').hostname === 'S1' },
                  { t: 'Revisa la configuración (show running-config)', ok: c => c.cli('SW1', 'show running-config') }
                ] },
              { tipo: 'ordena', texto: 'Ordena los comandos para cambiarle el nombre a un switch:', items: ['enable', 'configure terminal', 'hostname S1', 'end'],
                explica: 'Primero subes de permisos (enable), luego entras a configuración (configure terminal), haces el cambio y sales (end).' }
            ]
          },
          {
            id: 'r10', titulo: 'Contraseñas y aviso', pasos: [
              { tipo: 'explica', titulo: 'Cerrar las puertas con llave', texto:
                '<p>Un switch sin contraseñas es como un salón sin llave. Estos son los comandos de seguridad básica:</p>' +
                '<div class="tabla-cmd"><div><code>line console 0</code> → <code>password cisco</code> → <code>login</code><span>Pide contraseña al conectarse por el cable de consola.</span></div><div><code>enable secret class</code><span>Pide contraseña para entrar al modo privilegiado. «secret» la guarda cifrada.</span></div><div><code>service password-encryption</code><span>Oculta las demás contraseñas en la configuración.</span></div><div><code>banner motd #Solo personal autorizado#</code><span>Mensaje de aviso al entrar.</span></div><div><code>copy running-config startup-config</code><span>Guarda todo para que no se borre al apagar.</span></div></div>' },
              { tipo: 'mision', titulo: 'Asegura a S1', texto: '<p>Abre la consola de <b>S1</b> y aplica la seguridad básica. Puedes usar las contraseñas <code>cisco</code> (consola) y <code>class</code> (enable), como en las prácticas de Cisco.</p>',
                red: { devices: [{ tipo: 'pc', id: 'PC1', x: 250, y: 300, ip: '192.168.1.10', fijo: true }, { tipo: 'switch', id: 'SW1', x: 600, y: 300, fijo: true, cfg: { hostname: 'S1' } }], links: [['PC1', 'SW1']] },
                herramientas: ['mover'], abrirConsola: 'SW1',
                metas: [
                  { t: 'Contraseña de consola con login (line console 0)', ok: c => !!c.cfg('SW1').conPassword && c.cfg('SW1').conLogin },
                  { t: 'Contraseña cifrada para enable (enable secret)', ok: c => !!c.cfg('SW1').enableSecret },
                  { t: 'Cifrado de contraseñas (service password-encryption)', ok: c => c.cfg('SW1').cifrar },
                  { t: 'Mensaje de aviso (banner motd)', ok: c => !!c.cfg('SW1').motd },
                  { t: 'Guarda la configuración (copy running-config startup-config)', ok: c => { const g = c.cfg('SW1').guardada; return !!(g && g.cfg.enableSecret && g.cfg.motd); } }
                ] },
              { tipo: 'pregunta', texto: '¿Qué diferencia hay entre <code>enable password</code> y <code>enable secret</code>?', opciones: ['Ninguna', 'enable secret guarda la contraseña cifrada; enable password la deja legible', 'enable password es más segura', 'enable secret solo sirve en routers'], correcta: 1,
                explica: 'Si están las dos, el switch usa la de enable secret. Por eso siempre se recomienda secret.' },
              { tipo: 'pregunta', texto: 'Si apagas el switch sin hacer <code>copy running-config startup-config</code>…', opciones: ['No pasa nada', 'Se pierden los cambios: la running-config vive en la RAM', 'El switch se descompone', 'Se guarda solo'], correcta: 1,
                explica: 'running-config está en memoria RAM (se borra al apagar). startup-config está en la NVRAM y es la que se carga al encender.' }
            ]
          },
          {
            id: 'r11', titulo: 'Dale una IP al switch', pasos: [
              { tipo: 'explica', titulo: 'La interfaz VLAN 1', texto:
                '<p>Un switch funciona sin IP: solo mira MAC. Pero para <b>administrarlo a distancia</b> (hacerle ping, entrar por Telnet o SSH) necesita una IP.</p>' +
                '<p>Esa IP no va en un puerto físico, sino en una interfaz virtual llamada <b>VLAN 1</b> (SVI):</p>' +
                '<div class="ejemplo mono">interface vlan 1<br>ip address 192.168.1.2 255.255.255.0<br>no shutdown</div>' +
                '<p><code>no shutdown</code> la enciende. ¡Sin ese comando la IP existe pero no responde!</p>' },
              { tipo: 'mision', titulo: 'Haz ping al switch', texto: '<p>Configura en <b>S1</b> la IP <span class="mono">192.168.1.2</span> con máscara <span class="mono">255.255.255.0</span>, enciéndela, haz ping desde <b>PC1</b> y guarda la configuración.</p>',
                red: { devices: [{ tipo: 'pc', id: 'PC1', x: 250, y: 300, ip: '192.168.1.10', fijo: true }, { tipo: 'switch', id: 'SW1', x: 600, y: 300, fijo: true, cfg: { hostname: 'S1' } }], links: [['PC1', 'SW1']] },
                herramientas: ['mover'], abrirConsola: 'SW1',
                metas: [
                  { t: 'S1 tiene la IP 192.168.1.2 en interface vlan 1', ok: c => c.dev('SW1').svi.ip === '192.168.1.2' },
                  { t: 'La interfaz está encendida (no shutdown)', ok: c => c.dev('SW1').svi.up },
                  { t: 'PC1 hace ping al switch', ok: c => c.pingOk('PC1', '192.168.1.2') },
                  { t: 'Guarda la configuración', ok: c => { const g = c.cfg('SW1').guardada; return !!(g && g.svi && g.svi.ip === '192.168.1.2'); } }
                ] },
              { tipo: 'pregunta', texto: '¿Qué comando <b>enciende</b> la interfaz VLAN 1?', opciones: ['shutdown', 'no shutdown', 'enable', 'ip address'], correcta: 1,
                explica: 'En Cisco, las interfaces se apagan con shutdown y se encienden con no shutdown.' }
            ]
          }
        ]
      },
      {
        titulo: 'Cables y medios', desc: 'La capa física: por dónde viajan los bits.',
        lecciones: [
          {
            id: 'r12', titulo: '¿Qué cable uso?', pasos: [
              { tipo: 'explica', titulo: 'Las calles de la red', texto:
                '<div class="tres"><div><b>Cobre (UTP)</b><span>Señales eléctricas. El más común en oficinas y escuelas. Hasta 100 m por tramo.</span></div><div><b>Fibra óptica</b><span>Pulsos de luz. Distancias largas y mucha velocidad; no le afecta la interferencia.</span></div><div><b>Inalámbrico</b><span>Ondas de radio (Wi-Fi). Cómodo, pero comparte el aire y tiene menos alcance.</span></div></div>' +
                '<p>Cables de cobre en Packet Tracer: <b>directo</b> (equipos distintos, como PC↔switch), <b>cruzado</b> (equipos iguales, como switch↔switch) y <b>consola</b> (el azul, para configurar un equipo desde una PC).</p>' },
              { tipo: 'pregunta', texto: 'Para conectar una <b>PC a un switch</b> se usa normalmente…', opciones: ['Cable cruzado', 'Cable directo', 'Cable de consola', 'Cable coaxial'], correcta: 1, explica: 'PC y switch son equipos de tipo distinto: cable directo.' },
              { tipo: 'pregunta', texto: 'Necesitas unir dos edificios a 2 km de distancia. ¿Qué medio eliges?', opciones: ['Cobre UTP', 'Fibra óptica', 'Cable de consola', 'Bluetooth'], correcta: 1, explica: 'El cobre llega a unos 100 m por tramo; la fibra alcanza kilómetros.' },
              { tipo: 'pregunta', texto: '¿Para qué sirve el cable de <b>consola</b>?', opciones: ['Para navegar en Internet', 'Para configurar un switch o router desde una PC', 'Para unir dos switches', 'Para cargar la laptop'], correcta: 1, explica: 'Con él entras a la CLI del equipo aunque todavía no tenga IP. Es lo que usaste en la práctica 1.0.5.' }
            ]
          }
        ]
      }
    ]
  };

  /* ======================= IA ======================= */
  const ia = {
    id: 'ia', nombre: 'IA desde cero', corto: 'IA', color: 'ia',
    lema: 'Mira a una máquina percibir, buscar y aprender.',
    unidades: [
      {
        titulo: '¿Qué es la IA?', desc: 'Qué sí es inteligencia artificial y qué no.',
        lecciones: [
          {
            id: 'i1', titulo: '¿Qué es la inteligencia artificial?', pasos: [
              { tipo: 'explica', titulo: 'Máquinas que hacen cosas «inteligentes»', texto:
                '<p>La <b>inteligencia artificial</b> estudia cómo hacer programas que realicen tareas que asociamos con la inteligencia: <b>percibir</b> (ver, oír), <b>razonar</b>, <b>aprender</b> de ejemplos y <b>decidir</b>.</p>' +
                '<p>No todo programa es IA. Una calculadora sigue pasos fijos: 2 + 2 siempre da 4. Un programa que <b>reconoce tu cara</b> en una foto tuvo que <b>aprender</b> de miles de ejemplos, porque nadie puede escribir una regla exacta para «esto es una cara».</p>' },
              { tipo: 'pregunta', texto: '¿Cuál de estos sistemas usa IA?', opciones: ['Una calculadora sumando', 'Un foco con temporizador', 'YouTube recomendándote videos según lo que ves', 'Un reloj despertador'], correcta: 2,
                explica: 'El recomendador aprende de tu historial y del de millones de personas para adivinar qué te gustará. Los demás siguen reglas fijas.' },
              { tipo: 'explica', titulo: 'Un poco de historia', texto:
                '<div class="linea-tiempo"><div><b>1950</b><span>Alan Turing propone su prueba: si no distingues a la máquina de una persona al platicar, ¿la máquina piensa?</span></div><div><b>1956</b><span>Conferencia de Dartmouth: nace el nombre «inteligencia artificial».</span></div><div><b>1997</b><span>Deep Blue de IBM le gana al campeón de ajedrez Garry Kasparov.</span></div><div><b>2012–hoy</b><span>Las redes neuronales profundas aprenden a ver, traducir y conversar.</span></div></div>' },
              { tipo: 'ordena', texto: 'Ordena del más antiguo al más reciente:', items: ['Prueba de Turing', 'Conferencia de Dartmouth', 'Deep Blue gana al ajedrez', 'Redes neuronales profundas'],
                explica: '1950, 1956, 1997 y de 2012 en adelante.' }
            ]
          }
        ]
      },
      {
        titulo: 'Agentes', desc: 'Programas que perciben y actúan.',
        lecciones: [
          {
            id: 'i2', titulo: 'Tu primer agente', pasos: [
              { tipo: 'explica', titulo: 'Percibir → decidir → actuar', texto:
                '<p>Un <b>agente</b> es algo que <b>percibe</b> su entorno con <b>sensores</b> y <b>actúa</b> sobre él con <b>actuadores</b>. Tú eres un agente: tus ojos son sensores y tus manos, actuadores.</p>' +
                '<p>Vamos a programar una <b>aspiradora robot</b>. Vive en un mundo de dos cuartos (A y B). Sus sensores le dicen dos cosas: <b>en qué cuarto está</b> y <b>si hay basura</b>. Sus acciones: aspirar, moverse a la izquierda o a la derecha.</p>' },
              { tipo: 'descubre', titulo: 'Así ve el mundo la aspiradora', texto: '<p>Antes de programarla, ponte en su lugar. Toca las tarjetas.</p>', tarjetas: [
                { titulo: 'Solo ve su cuarto', html: 'Está en el cuarto <b>A</b> (izquierda) o en el <b>B</b> (derecha). Sabe en cuál está y si hay basura <b>ahí</b>. El otro cuarto no lo ve.' },
                { titulo: 'Puede hacer 4 cosas', html: '<b>Aspirar</b>, <b>ir a la izquierda</b> (hacia A), <b>ir a la derecha</b> (hacia B) o <b>quedarse quieta</b>. Si ya está en B y le dices «derecha», choca con la pared.' },
                { titulo: 'Solo hay 4 cosas que puede ver', html: '«Estoy en A con basura», «estoy en A limpio», «estoy en B con basura» y «estoy en B limpio». Para cada una le escribes una ' + T('regla', 'regla') + '.' },
                { titulo: 'La trampa', html: 'Cuando su cuarto ya está limpio, <b>no sabe</b> si el otro está sucio. ¿Qué le conviene hacer para no dejar basura?' }
              ] },
              { tipo: 'lab', lab: 'aspiradora', titulo: 'Programa la aspiradora', texto: '<ol><li>En cada una de las 4 reglas, elige qué hace el robot.</li><li>Presiona <b>Probar en las 8 situaciones</b>.</li><li>Si alguna tarjeta sale roja, lee «¿Por qué falló?» y toca la tarjeta para ver al robot paso a paso.</li></ol>',
                metas: [{ t: 'Tu agente limpia todo en las 8 situaciones', ok: c => c.hubo('prueba', e => e.buenos === 8) }] },
              { tipo: 'pregunta', texto: 'En la aspiradora, «[A, sucio]» es…', opciones: ['Una acción', 'Una percepción: lo que el agente sabe del mundo en ese momento', 'Un actuador', 'Un error'], correcta: 1,
                explica: 'Es lo que los sensores le reportan. Con eso, la tabla de reglas decide la acción.' }
            ]
          },
          {
            id: 'i3', titulo: 'Agentes racionales y PEAS', pasos: [
              { tipo: 'explica', titulo: '¿Qué hace «bueno» a un agente?', texto:
                '<p>Un agente es <b>racional</b> si elige la acción que más le conviene según su <b>medida de desempeño</b> y lo que percibe. Tu aspiradora era racional si limpiaba todo moviéndose lo menos posible.</p>' +
                '<p>Para describir cualquier agente se usa <b>PEAS</b>:</p><div class="tres"><div><b>P</b>erformance (desempeño)<span>¿Cómo sabemos que lo hace bien?</span></div><div><b>E</b>nvironment (entorno)<span>¿Dónde vive?</span></div><div><b>A</b>ctuadores · <b>S</b>ensores<span>¿Con qué actúa? ¿Con qué percibe?</span></div></div>' },
              { tipo: 'pregunta', texto: 'Para un <b>taxi autónomo</b>, ¿cuál es un <b>sensor</b>?', opciones: ['El volante', 'La cámara y el GPS', 'Llegar rápido y seguro', 'La calle'], correcta: 1,
                explica: 'El volante es actuador, llegar rápido y seguro es la medida de desempeño y la calle es el entorno.' },
              { tipo: 'pregunta', texto: 'Tu aspiradora decidía solo con lo que percibía en ese instante, usando una tabla de reglas. Es un agente…', opciones: ['Reactivo simple', 'Que aprende', 'Basado en metas con mapa', 'Humano'], correcta: 0,
                explica: 'El agente reactivo simple aplica reglas «si percibo X → hago Y» sin memoria. Los más avanzados guardan un modelo del mundo, buscan metas o aprenden.' }
            ]
          }
        ]
      },
      {
        titulo: 'Buscar soluciones', desc: 'Cómo encuentra una IA el camino.',
        lecciones: [
          {
            id: 'i4', titulo: 'Búsqueda en anchura', pasos: [
              { tipo: 'explica', titulo: 'Resolver = buscar', texto:
                '<p>Muchos problemas de IA se resuelven <b>buscando</b>: hay un <b>estado inicial</b> (S), una <b>meta</b> (M) y <b>acciones</b> (moverse arriba, abajo, izquierda o derecha). Buscar es probar caminos hasta llegar.</p>' +
                '<p>La <b>búsqueda en anchura</b> explora como una mancha de agua: primero todo lo que está a 1 paso, luego a 2, luego a 3… Los colores te muestran lo que va pasando: <span class="tag-front">por explorar</span>, <span class="tag-vis">ya explorado</span> y <span class="tag-cam">camino final</span>.</p>' },
              { tipo: 'lab', lab: 'laberinto', algoritmos: ['bfs'], titulo: 'Mira a la anchura buscar', texto: '<p>Presiona <b>Buscar</b>. Luego pon unos muros y busca otra vez.</p>',
                metas: [{ t: 'Encuentra la meta con búsqueda en anchura', ok: c => c.hubo('busqueda', e => e.alg === 'bfs' && e.encontrado) }] },
              { tipo: 'pregunta', texto: 'La búsqueda en anchura guarda las casillas pendientes en una <b>fila</b>. Eso significa que…', opciones: ['Sale primero la última que entró', 'Sale primero la que entró primero, como la fila de las tortillas', 'Sale una al azar', 'Salen todas juntas'], correcta: 1,
                explica: 'Una fila (FIFO): el primero que llega es el primero que atienden. Por eso explora en «capas».' }
            ]
          },
          {
            id: 'i5', titulo: 'Profundidad contra anchura', pasos: [
              { tipo: 'explica', titulo: 'Meterse hasta el fondo', texto:
                '<p>La <b>búsqueda en profundidad</b> usa una <b>pila</b> (como platos apilados: sale el último que pusiste). Se mete por un camino hasta el fondo y solo regresa cuando choca.</p><p>Gasta poca memoria, pero puede encontrar un camino <b>larguísimo</b>.</p>' },
              { tipo: 'lab', lab: 'laberinto', algoritmos: ['bfs', 'dfs'], titulo: 'Compáralas', texto: '<p>Busca con <b>Anchura</b> y después con <b>Profundidad</b>. Compara los pasos del camino.</p>',
                metas: [
                  { t: 'Busca con anchura', ok: c => c.hubo('busqueda', e => e.alg === 'bfs' && e.encontrado) },
                  { t: 'Busca con profundidad', ok: c => c.hubo('busqueda', e => e.alg === 'dfs' && e.encontrado) }
                ] },
              { tipo: 'pregunta', texto: '¿Cuál de las dos garantiza encontrar el camino <b>más corto</b>?', opciones: ['Profundidad', 'Anchura', 'Las dos siempre', 'Ninguna'], correcta: 1,
                explica: 'Como la anchura explora por distancia (1 paso, 2 pasos…), el primer camino que encuentra es el más corto.' }
            ]
          },
          {
            id: 'i6', titulo: 'A*: buscar con una pista', pasos: [
              { tipo: 'explica', titulo: 'La heurística', texto:
                '<p>Una <b>heurística</b> es una pista para estimar qué tan cerca estás de la meta. Aquí usamos la <b>distancia Manhattan</b>: cuántas casillas faltan en horizontal más en vertical, ignorando los muros.</p>' +
                '<p><b>A*</b> elige siempre la casilla con menor <span class="mono">f = g + h</span>: <b>g</b> = pasos ya dados, <b>h</b> = distancia estimada que falta. Así explora menos sin perder el camino más corto.</p>' },
              { tipo: 'lab', lab: 'laberinto', algoritmos: ['bfs', 'astar'], titulo: 'Anchura contra A*', texto: '<p>Busca con las dos y compara cuántas casillas exploró cada una.</p>',
                metas: [
                  { t: 'Busca con anchura', ok: c => c.hubo('busqueda', e => e.alg === 'bfs' && e.encontrado) },
                  { t: 'Busca con A*', ok: c => c.hubo('busqueda', e => e.alg === 'astar' && e.encontrado) }
                ] },
              { tipo: 'pregunta', texto: 'En A*, la letra <b>h</b> representa…', opciones: ['Los pasos ya caminados', 'La estimación de lo que falta para llegar (heurística)', 'La hora', 'El número de muros'], correcta: 1,
                explica: 'g es lo recorrido y h lo que estima que falta. Si h nunca exagera la distancia real, A* encuentra el camino más corto.' }
            ]
          }
        ]
      },
      {
        titulo: 'Aprender de datos', desc: 'Una neurona artificial que aprende sola.',
        lecciones: [
          {
            id: 'i7', titulo: 'La neurona artificial', pasos: [
              { tipo: 'explica', titulo: 'Una calculadora que decide sí o no', texto:
                '<p>Imagina que un profe quiere adivinar quién va a aprobar sin aplicar el examen. Solo sabe dos cosas de cada alumno: <b>cuántas horas estudió</b> y <b>cuántas durmió</b>.</p>' +
                '<p>Una ' + T('neurona', 'neurona artificial') + ' hace eso con una cuenta muy sencilla:</p>' +
                '<div class="ejemplo">horas de estudio × <b>cuánto cuenta estudiar</b><br>+ horas de sueño × <b>cuánto cuenta dormir</b><br>+ <b>exigencia</b><br>= total. Si el total es <b>0 o más → «aprueba»</b>; si es negativo → «reprueba».</div>' +
                '<p>Los números «cuánto cuenta…» se llaman ' + T('peso', 'pesos') + ' y la «exigencia» se llama ' + T('sesgo', 'sesgo') + '. <b>Aprender</b> es encontrar los números correctos.</p>' },
              { tipo: 'descubre', titulo: 'Hagamos la cuenta con Ana', texto: '<p>Ana estudió <b>6 h</b> y durmió <b>5 h</b>. La neurona usa: estudiar cuenta <b>1</b>, dormir cuenta <b>0.5</b> y la exigencia es <b>−7.5</b>. Toca las tarjetas en orden.</p>', tarjetas: [
                { titulo: '1. Estudio', html: '6 horas × 1 = <b>6</b>' },
                { titulo: '2. Sueño', html: '5 horas × 0.5 = <b>2.5</b>' },
                { titulo: '3. Sumar con la exigencia', html: '6 + 2.5 − 7.5 = <b>1</b>' },
                { titulo: '4. Decidir', html: '1 es 0 o más, así que la neurona dice <b class="bueno">«Ana aprueba»</b>.' }
              ] },
              { tipo: 'lab', lab: 'neurona', entrenar: false, titulo: 'Ajusta la neurona a mano', texto: '<ol><li><b>Toca una bolita</b> de la gráfica: verás la cuenta de ese alumno.</li><li>Mueve los tres deslizadores y mira cómo se mueve la línea.</li><li>Meta: que la neurona acierte con los <b>20</b> alumnos (ninguna bolita con anillo). Si te atoras, usa <b>Dame una pista</b>.</li></ol>',
                metas: [{ t: 'Acierta los 20 alumnos', ok: c => c.hubo('precision', e => e.aciertos === e.total) }] },
              { tipo: 'pregunta', texto: 'Si el <b>peso del estudio</b> es grande y positivo, significa que…', opciones: ['Estudiar no importa', 'Estudiar empuja mucho hacia «aprueba»', 'Estudiar hace reprobar', 'La neurona está rota'], correcta: 1,
                explica: 'El peso es la importancia de esa entrada. Positivo empuja hacia «sí»; negativo, hacia «no».' }
            ]
          },
          {
            id: 'i8', titulo: 'La neurona aprende sola', pasos: [
              { tipo: 'explica', titulo: 'Aprender es corregir errores', texto:
                '<p>Ajustar pesos a mano es cansado. La neurona puede <b>aprender sola</b> con la regla del perceptrón:</p><ol><li>Toma un alumno donde se equivocó.</li><li>Mueve cada peso <b>un poquito</b> en la dirección que habría dado la respuesta correcta.</li><li>Repite hasta no equivocarse.</li></ol><p>Eso es <b>entrenar</b> un modelo: aprender de ejemplos con respuesta conocida (aprendizaje <b>supervisado</b>).</p>' },
              { tipo: 'lab', lab: 'neurona', entrenar: true, titulo: 'Entrénala', texto: '<ol><li>Presiona <b>Aprender de 1 error</b> varias veces. Lee qué alumno corrigió y mira cómo se mueve la línea.</li><li>Luego presiona <b>Que aprenda sola</b> y mira cómo se acomoda hasta acertar con todos.</li></ol>',
                metas: [{ t: 'Entrénala hasta acertar los 20 alumnos', ok: c => c.hubo('precision', e => e.entrenado && e.aciertos === e.total) }] },
              { tipo: 'pregunta', texto: '¿Qué es <b>entrenar</b> una neurona?', opciones: ['Escribirle reglas a mano', 'Ajustar sus pesos con ejemplos hasta que se equivoque lo menos posible', 'Conectarla a Internet', 'Darle más memoria'], correcta: 1,
                explica: 'El modelo aprende de los datos. Las redes neuronales grandes son millones de neuronas como esta, entrenadas igual pero con muchos más ejemplos.' }
            ]
          }
        ]
      }
    ]
  };

  root.CAMINO = { cursos: [redes, ia] };
})(window);
