/* Aula 503 — curso «Tu salón: Lab. Redes UNSIJ».
   Explica desde cero la red REAL del salón que se documentó y se armó en Packet Tracer
   (Lab_Redes_UNSIJ.pkt). Datos levantados del 12 al 19 de octubre de 2026. */
(function (root) {
  'use strict';
  const T = root.T || ((k, t) => t);
  const M16 = '255.255.0.0', GW = '172.25.0.1';

  // La red del salón en el simulador. Las IPs, nombres y equipos son los reales.
  function salon(op) {
    op = op || {};
    const pc = (id, x, y, ip, extra) => Object.assign({ tipo: 'pc', id, x, y, ip, mask: M16, gw: GW, fijo: true }, extra || {});
    const devices = [
      { tipo: 'router', id: 'GW-UNSIJ', x: 470, y: 60, fijo: true, nota: 'Representa el <b>gateway y firewall del campus</b> (172.25.0.1). En la vida real no está en tu salón, sino en el centro de datos de la universidad.', ifs: { 'Gi0/0': { ip: GW, mask: M16 }, 'Gi0/1': { ip: '8.8.8.1', mask: '255.255.255.0' } } },
      { tipo: 'server', id: 'Internet', icono: 'nube', x: 820, y: 60, ip: '8.8.8.8', mask: '255.255.255.0', gw: '8.8.8.1', fijo: true },
      { tipo: 'switch', id: 'SW-Dell6248', x: 470, y: 230, fijo: true, nota: 'Es el <b>Dell PowerConnect 6248</b> del rack Hubbell: 48 puertos de 1 Gb/s. Todos los cables de las PCs del salón llegan aquí.' },
      { tipo: 'switch', id: 'AP-LabRedes', icono: 'ap', x: 140, y: 230, fijo: true, nota: 'SSID <b>www.unsij.edu.mx-LabRedes</b>, WPA2, canal 6 (2.4 GHz). Está en la pared junto al pizarrón.' },
      pc('lrm11', 300, 410, '172.25.33.166', { nota: 'PC de Ailed. Por cable a 1000 Mb/s.' }),
      pc('hector', 440, 430, '172.25.33.130', { nota: 'PC de Mayte. Por cable a 1000 Mb/s.' }),
      pc('bartolome', 580, 430, '172.25.33.138', { nota: 'PC de Kevin. Por cable a 1000 Mb/s.' }),
      pc('labredesu', 720, 410, '172.25.33.172', { nota: 'PC de Ana. Por cable a 1000 Mb/s.' }),
      pc('jenni', 80, 410, '172.25.33.161', { nota: 'PC de Roberto. Su cable no tiene señal, así que se conecta por <b>Wi-Fi</b>.' }),
      { tipo: 'server', id: 'Proxmox', x: 830, y: 250, ip: '172.25.3.212', mask: M16, gw: GW, fijo: true, nota: 'Servidor <b>Proxmox «iddsi»</b> (la torre Dell junto al rack) con máquinas virtuales. Desde las PCs del salón <b>no contesta</b>: puede estar en otra VLAN, apagado o con otra IP. Por eso aquí está sin cable.' }
    ];
    if (op.lrm12) devices.push(pc('lrm12', 210, 470, '172.25.33.167', { nota: 'PC de Iris. Su cable no tiene señal (NO-CARRIER).' }));
    const links = [
      { a: 'SW-Dell6248', pa: 'Gi0/1', b: 'GW-UNSIJ', pb: 'Gi0/0' },
      { a: 'GW-UNSIJ', pa: 'Gi0/1', b: 'Internet' },
      { a: 'AP-LabRedes', pa: 'Gi0/1', b: 'SW-Dell6248', pb: 'Gi0/2' },
      ['lrm11', 'SW-Dell6248'], ['hector', 'SW-Dell6248'], ['bartolome', 'SW-Dell6248'], ['labredesu', 'SW-Dell6248'],
      ['jenni', 'AP-LabRedes']
    ];
    if (op.sinGw) devices.find(d => d.id === op.sinGw).gw = '';
    return { devices, links };
  }

  const curso = {
    id: 'unsij', nombre: 'Tu salón: Lab. Redes', corto: 'Lab. Redes', color: 'redes',
    lema: 'La red real de tu salón en la UNSIJ, explicada pieza por pieza.',
    unidades: [
      {
        titulo: 'Las piezas de tu salón', desc: 'Qué hay en el Lab. Redes y para qué sirve cada cosa.',
        lecciones: [
          {
            id: 'u1', titulo: '¿Qué hicimos en esta tarea?', pasos: [
              { tipo: 'explica', titulo: 'Documentar una red de verdad', texto:
                '<p>La tarea era <b>investigar cómo está conectada la red del salón Lab. Redes</b> y luego <b>copiarla en Packet Tracer</b> (el archivo <i>Lab_Redes_UNSIJ.pkt</i>).</p>' +
                '<p>Para eso se hicieron dos cosas: <b>observar</b> (fotos del rack, de las tomas de la pared, del access point) y <b>preguntarle a las computadoras</b> con comandos, que te dicen su dirección, su gateway y a qué switch están conectadas.</p>' +
                '<figure class="plano"><img src="img/plano_labredes.png" alt="Plano del salón Lab. Redes con pantalla, pizarrón, proyector y nodos de red en paredes y piso"><figcaption>El plano del salón que va de fondo en la vista física de Packet Tracer. Los cuadritos azules son los <b>nodos</b>: las tomas de red.</figcaption></figure>' },
              { tipo: 'descubre', titulo: 'Lo que hay en tu salón', texto: '<p>Toca cada tarjeta. Son los equipos reales que se encontraron.</p>', tarjetas: [
                { titulo: '17 PCs Dell', html: 'Modelo <b>Dell Pro Max Micro</b> con Ubuntu. Cada una tiene cable de red y también Wi-Fi. Son los «dispositivos finales».' },
                { titulo: 'El switch Dell 6248', html: 'En el ' + T('rack', 'rack') + ' Hubbell del fondo. Tiene <b>48 puertos</b> de 1 Gb/s. Todos los cables del salón llegan ahí: es el centro de la estrella.' },
                { titulo: 'Los cables y nodos', html: 'Cable ' + T('cat6', 'Cat 6') + ' Panduit dentro de la pared y el piso. Termina en ' + T('nodo', 'nodos') + ' numerados (13, 14, 15, 38, 49, 50…) donde se conecta cada PC.' },
                { titulo: 'El access point', html: 'En la pared junto al pizarrón. Da el ' + T('ap', 'Wi-Fi') + ' llamado <b>www.unsij.edu.mx-LabRedes</b>.' },
                { titulo: 'El gateway del campus', html: 'La dirección <b>172.25.0.1</b>. Es la «puerta de salida» de toda la universidad hacia Internet, con un ' + T('firewall', 'firewall') + '. No está en el salón.' },
                { titulo: 'El servidor Proxmox', html: 'Una torre Dell junto al rack que corre ' + T('servidorVm', 'máquinas virtuales') + '. Curiosamente, no contesta desde las PCs del salón.' },
                { titulo: 'Un router Cisco 2811', html: 'Está en el rack, pero <b>desconectado</b>: es equipo de práctica para las clases, no forma parte de la red que funciona.' }
              ] },
              { tipo: 'mision', titulo: 'Recorre tu salón en el simulador', texto:
                '<p>Esta es tu red. Toca cada equipo y lee su ficha a la derecha (o abajo, en celular).</p><ol><li>Toca el <b>switch SW-Dell6248</b>.</li><li>Toca el <b>access point</b> (el de las ondas de Wi-Fi). Las líneas punteadas son conexiones inalámbricas.</li><li>Toca el <b>GW-UNSIJ</b> (el gateway).</li><li>Toca la PC <b>lrm11</b>.</li></ol>',
                red: salon(), herramientas: ['mover'], editable: false,
                metas: [
                  { t: 'Toca el switch', ok: c => c.hubo('seleccion', e => e.dev === 'SW-Dell6248') },
                  { t: 'Toca el access point', ok: c => c.hubo('seleccion', e => e.dev === 'AP-LabRedes') },
                  { t: 'Toca el gateway', ok: c => c.hubo('seleccion', e => e.dev === 'GW-UNSIJ') },
                  { t: 'Toca la PC lrm11', ok: c => c.hubo('seleccion', e => e.dev === 'lrm11') }
                ] },
              { tipo: 'pregunta', texto: 'Todos los cables de las PCs llegan al mismo switch. ¿Cómo se llama esa forma de conectar?', opciones: ['Topología en anillo', 'Topología en estrella', 'Topología en bus', 'Topología en malla'], correcta: 1,
                explica: 'En <b>estrella</b>: un equipo en el centro (el switch) y todos conectados a él, como los rayos de una estrella. Si se daña un cable, solo esa PC se queda sin red.' },
              { tipo: 'pregunta', texto: '¿Qué equipo del rack está <b>desconectado</b> y es solo para practicar?', opciones: ['El switch Dell 6248', 'El router Cisco 2811', 'El access point', 'Las PCs'], correcta: 1,
                explica: 'El Cisco 2811 está en el rack pero sin cables de servicio. La red funciona con el switch Dell y el gateway del campus.' }
            ]
          },
          {
            id: 'u2', titulo: 'La dirección de tu PC', pasos: [
              { tipo: 'explica', titulo: 'Una colonia enorme: 172.25', texto:
                '<p>Ejemplo real: la PC <b>lrm11</b> tiene la dirección <b>172.25.33.166</b> con máscara <b>255.255.0.0</b>.</p>' +
                '<div class="ejemplo mono" style="font-size:1.25rem;text-align:center"><span class="m-red">172.25</span>.<span class="m-host">33.166</span></div>' +
                '<p>Aquí la máscara tiene <b>dos</b> 255, así que la «colonia» (la red) son los <b>dos primeros</b> números: <b>172.25</b>. Toda la UNSIJ está en esa misma colonia: el salón, otros edificios, el Wi-Fi. Por eso se escribe <b>172.25.0.0/16</b>.</p>' +
                '<p>El «número de casa» son los otros dos: <b>33.166</b>. En tu salón las PCs van de la <b>.33.130</b> a la <b>.33.172</b>.</p>' },
              { tipo: 'descubre', titulo: 'Los números de tu red', texto: '<p>Estos son los datos que comparten todas las PCs del salón.</p>', tarjetas: [
                { titulo: 'Red: 172.25.0.0/16', html: 'La colonia de toda la universidad. El <b>/16</b> significa que los primeros 16 bits (los dos primeros números) son la red. Caben ¡más de 65 mil equipos!' },
                { titulo: 'Máscara: 255.255.0.0', html: 'Es lo mismo que /16, escrito de otra forma. Dice: «los dos primeros números son la colonia».' },
                { titulo: 'Gateway: 172.25.0.1', html: 'La puerta de salida. Si el mensaje va fuera de la universidad (a Internet), la PC se lo entrega a esta dirección.' },
                { titulo: 'DNS: 172.25.0.1', html: 'La misma dirección también hace de ' + T('dns', 'DNS') + ': traduce nombres como <i>google.com</i> a su IP.' }
              ] },
              { tipo: 'pregunta', texto: 'Con máscara 255.255.0.0, ¿cuál es la «colonia» (red) de la dirección <span class="mono">172.25.33.166</span>?', opciones: ['172', '172.25', '172.25.33', '33.166'], correcta: 1,
                explica: 'Dos 255 en la máscara = los dos primeros números son la red: <b>172.25</b>.' },
              { tipo: 'mision', titulo: 'Dos PCs del salón hablando', texto:
                '<ol><li>Toca <b>lrm11</b> y mira cómo su dirección se parte en colonia y número de casa.</li><li>Mándale un ping a <b>labredesu</b> (la PC de Ana).</li><li>Fíjate: como están en la misma colonia, el mensaje <b>no pasa por el gateway</b>, solo por el switch.</li></ol>',
                red: salon(), herramientas: ['mover'], editable: false,
                metas: [
                  { t: 'Toca la PC lrm11', ok: c => c.hubo('seleccion', e => e.dev === 'lrm11') },
                  { t: 'Ping de lrm11 a labredesu que funcione', ok: c => c.pingOk('lrm11', 'labredesu') }
                ] },
              { tipo: 'pregunta', texto: 'Cuando lrm11 le hace ping a labredesu (las dos en 172.25.x.x), el mensaje…', opciones: ['Sale a Internet y regresa', 'Va directo por el switch, sin pasar por el gateway', 'Pasa por el servidor Proxmox', 'No puede llegar'], correcta: 1,
                explica: 'Mismo «colonia» = entrega directa a través del switch. El gateway solo se usa para salir de la red.' }
            ]
          },
          {
            id: 'u3', titulo: 'DHCP: nadie escribió las IPs', pasos: [
              { tipo: 'explica', titulo: 'Direcciones prestadas', texto:
                '<p>En tu salón nadie configuró las IPs a mano. Al encender, cada PC le pide una dirección a un servidor ' + T('dhcp', 'DHCP') + ' (que está en 172.25.0.1) y él se la <b>presta por 2 horas</b> (7200 segundos). Si la PC sigue encendida, la renueva.</p>' +
                '<p>Por eso las IPs del salón no van en orden (.130, .132, .134…): el DHCP las va dando según quién llega primero. Y por eso en Packet Tracer las PCs están en modo <b>DHCP</b>.</p>' },
              { tipo: 'ordena', texto: 'Ordena los 4 pasos de DHCP (se le dice «DORA»):', items: ['Discover: la PC grita «¿hay algún servidor DHCP?»', 'Offer: el servidor ofrece una IP', 'Request: la PC dice «sí, quiero esa»', 'Acknowledge: el servidor confirma y se la presta'],
                explica: 'D-O-R-A: Discover, Offer, Request, Acknowledge.' },
              { tipo: 'pregunta', texto: '¿Cuánto tiempo «presta» el DHCP de la UNSIJ cada dirección?', opciones: ['5 minutos', '2 horas', '1 semana', 'Para siempre'], correcta: 1,
                explica: 'El préstamo (lease) es de 7200 segundos = 2 horas.' },
              { tipo: 'pregunta', texto: 'Si dos PCs del salón tienen IPs que no van en orden (.130 y .166), es porque…', opciones: ['Alguien se equivocó al escribirlas', 'El DHCP las asigna según quién las pide primero', 'Están en redes distintas', 'Una está apagada'], correcta: 1,
                explica: 'El DHCP reparte las direcciones libres de su lista, no en el orden de los lugares del salón.' }
            ]
          },
          {
            id: 'u4', titulo: 'Salir a Internet', pasos: [
              { tipo: 'explica', titulo: 'El gateway y el firewall del campus', texto:
                '<p>Para ir a Internet, el mensaje tiene que <b>salir de la colonia 172.25</b>. Por eso la PC se lo da a su ' + T('gateway', 'puerta de enlace') + ': <b>172.25.0.1</b>. Esa dirección pertenece al equipo central de la universidad, que además es ' + T('firewall', 'firewall') + '.</p>' +
                '<p>Dato real de tu investigación: el comando <code>traceroute</code> (que muestra el camino de un mensaje) <b>no funciona</b> en la UNSIJ: el firewall lo bloquea. Por eso no se pudo ver qué hay después del gateway.</p>' },
              { tipo: 'mision', titulo: 'La PC que no sabía salir', texto:
                '<p>A la PC <b>lrm11</b> le borramos la puerta de enlace.</p><ol><li>Desde lrm11 manda un ping a <b>Internet</b> (8.8.8.8). Va a fallar: lee por qué.</li><li>Escribe en su ficha la puerta de enlace <span class="mono">172.25.0.1</span>.</li><li>Vuelve a mandar el ping a Internet.</li></ol>',
                red: salon({ sinGw: 'lrm11' }), herramientas: ['mover'],
                metas: [
                  { t: 'Intenta el ping a Internet sin gateway (y ve el error)', ok: c => c.hubo('ping', e => !e.res.ok && e.res.origen === 'lrm11') },
                  { t: 'Ponle a lrm11 la puerta de enlace 172.25.0.1', ok: c => c.gw('lrm11') === '172.25.0.1' },
                  { t: 'Ping de lrm11 a Internet que funcione', ok: c => c.pingOk('lrm11', 'Internet') }
                ] },
              { tipo: 'pregunta', texto: '¿Por qué <code>traceroute</code> no mostraba el camino hacia Internet en la UNSIJ?', opciones: ['Porque no hay Internet', 'Porque el firewall de la universidad lo bloquea', 'Porque el switch está apagado', 'Porque Ubuntu no tiene ese comando'], correcta: 1,
                explica: 'El firewall filtra esos mensajes. Internet sí funciona, pero el camino no se puede ver.' }
            ]
          }
        ]
      },
      {
        titulo: 'Cables, Wi-Fi y misterios', desc: 'Lo que se descubrió investigando.',
        lecciones: [
          {
            id: 'u5', titulo: 'Cables y nodos', pasos: [
              { tipo: 'explica', titulo: 'Del nodo de la pared al puerto del switch', texto:
                '<p>Cada PC se conecta con un cable corto a un ' + T('nodo', 'nodo') + ' de la pared o del piso. Por dentro, ese nodo tiene un cable ' + T('cat6', 'Cat 6') + ' que llega hasta un <b>puerto del switch</b>.</p>' +
                '<p>¿Cómo se supo cuál puerto? Con ' + T('lldp', 'LLDP') + ': la laptop conectada al <b>nodo 49</b> «escuchó» al switch decir que estaba en su <b>puerto 17</b> (Unit 1 Port 17).</p>' +
                '<p>Las PCs van a <b>1000 Mb/s</b> (1 Gb/s). Pero dos PCs, <b>jenni</b> y <b>lrm12</b>, tenían el cable <b>sin señal</b> (Ubuntu dice <i>NO-CARRIER</i>): se conectan por Wi-Fi.</p>' },
              { tipo: 'mision', titulo: 'Repara el cable de lrm12', texto:
                '<p>La PC <b>lrm12</b> (de Iris) tiene el cable sin señal.</p><ol><li>Intenta un ping de lrm12 al gateway (GW-UNSIJ): fallará.</li><li>Con la herramienta <b>Cable</b>, conéctala al switch.</li><li>Haz el ping otra vez.</li></ol>',
                red: salon({ lrm12: true }), herramientas: ['mover', 'cable'], editable: false,
                metas: [
                  { t: 'Conecta lrm12 al switch', ok: c => c.unidos('lrm12', 'SW-Dell6248') },
                  { t: 'Ping de lrm12 al gateway que funcione', ok: c => c.pingOk('lrm12', 'GW-UNSIJ') }
                ] },
              { tipo: 'pregunta', texto: 'Ubuntu muestra <b>NO-CARRIER</b> en la interfaz de red. Eso significa…', opciones: ['Que no tiene IP', 'Que el cable no tiene señal (no hay enlace físico)', 'Que el Wi-Fi está apagado', 'Que hay un virus'], correcta: 1,
                explica: 'NO-CARRIER = no hay «portadora»: el cable está desconectado, dañado o el nodo no está conectado al switch.' },
              { tipo: 'pregunta', texto: '¿Con qué protocolo se descubrió que el nodo 49 llega al puerto 17 del switch?', opciones: ['DHCP', 'LLDP', 'DNS', 'ARP'], correcta: 1,
                explica: 'LLDP: el switch anuncia por cada puerto quién es y en qué puerto estás.' }
            ]
          },
          {
            id: 'u6', titulo: 'El Wi-Fi y las redes «piratas»', pasos: [
              { tipo: 'explica', titulo: 'Wi-Fi oficial y hotspots', texto:
                '<p>El ' + T('ap', 'access point') + ' del salón da la red <b>www.unsij.edu.mx-LabRedes</b> (' + T('ssid', 'SSID') + '), con seguridad <b>WPA2</b>, en el <b>canal 6</b> de 2.4 GHz. Lo interesante: entrega direcciones de la <b>misma red 172.25.0.0/16</b>, o sea que Wi-Fi y cable son la misma colonia.</p>' +
                '<p>Pero muchas laptops de alumnos <b>no</b> usan ese Wi-Fi: se conectan a un <b>hotspot</b> (compartir Internet) de una laptop con Windows. Esos hotspots crean su propia red <b>192.168.137.0/24</b>: una segunda red informal dentro del salón.</p>' },
              { tipo: 'mision', titulo: 'Una PC por Wi-Fi', texto: '<p>La PC <b>jenni</b> no tiene cable con señal y va por Wi-Fi (la línea punteada). Mándale un ping desde jenni a <b>lrm11</b> y mira cómo el mensaje pasa por el access point y luego por el switch.</p>',
                red: salon(), herramientas: ['mover'], editable: false, pasoAPaso: true,
                metas: [{ t: 'Ping de jenni a lrm11 que funcione', ok: c => c.pingOk('jenni', 'lrm11') }] },
              { tipo: 'pregunta', texto: 'Una laptop conectada al hotspot de un compañero recibe la IP <span class="mono">192.168.137.25</span>. ¿Está en la red de la escuela 172.25?', opciones: ['Sí, es la misma', 'No, está en otra red (la del hotspot)'], correcta: 1,
                explica: 'Los primeros números son distintos: está en la red 192.168.137.0/24 que crea la laptop de Windows.' },
              { tipo: 'pregunta', texto: '¿Qué es el SSID?', opciones: ['La contraseña del Wi-Fi', 'El nombre de la red Wi-Fi', 'La velocidad del Wi-Fi', 'La IP del access point'], correcta: 1 }
            ]
          },
          {
            id: 'u7', titulo: 'El misterio del Proxmox', pasos: [
              { tipo: 'explica', titulo: 'Un servidor que no contesta', texto:
                '<p>Junto al rack hay una torre Dell con <b>Proxmox</b>, un programa para tener ' + T('servidorVm', 'máquinas virtuales') + '. Su página de administración estaba en <b>172.25.3.212:8006</b>.</p>' +
                '<p>Pero desde ninguna PC del salón contestó, ni siquiera a ARP. Posibles razones:</p><ol><li>Está en otra ' + T('vlan', 'VLAN') + ': una red separada aunque use el mismo switch.</li><li>Estaba apagado.</li><li>Le cambiaron la IP.</li></ol><p>En el simulador lo dejamos <b>sin cable</b> para representar que no se puede alcanzar.</p>' },
              { tipo: 'mision', titulo: 'Intenta llegar al Proxmox', texto: '<p>Desde <b>lrm11</b> manda un ping a <b>Proxmox</b> (172.25.3.212) y lee el mensaje de error.</p>',
                red: salon(), herramientas: ['mover'], editable: false,
                metas: [{ t: 'Intenta el ping a Proxmox', ok: c => c.hubo('ping', e => e.res.destino === '172.25.3.212') }] },
              { tipo: 'pregunta', texto: 'Una VLAN es…', opciones: ['Un cable más rápido', 'Una red separada dentro del mismo switch', 'Un tipo de Wi-Fi', 'Un virus de red'], correcta: 1,
                explica: 'Las VLAN dividen un switch en varias redes que no se hablan directamente, como paredes invisibles.' }
            ]
          },
          {
            id: 'u8', titulo: 'Cómo se investigó', pasos: [
              { tipo: 'explica', titulo: 'Preguntarle a la computadora', texto:
                '<p>Casi todos los datos salieron de comandos de Ubuntu (el script <i>levantamiento.sh</i> los corría todos en cada PC):</p>' +
                '<div class="tabla-cmd"><div><code>ip a</code><span>Muestra la IP, la máscara y la MAC de cada interfaz (cable y Wi-Fi).</span></div><div><code>ip route</code><span>Muestra el gateway (la ruta «default via 172.25.0.1»).</span></div><div><code>ping 172.25.0.1</code><span>Prueba si un equipo contesta.</span></div><div><code>ip neigh</code><span>La tabla ARP: qué MAC tiene cada IP conocida (así salió la MAC del gateway).</span></div><div><code>nmcli</code><span>Datos del Wi-Fi: SSID, canal, seguridad.</span></div><div><code>lldpctl</code><span>Escucha al switch por LLDP: a qué puerto estás conectado.</span></div><div><code>ethtool</code> / <code>ip link</code><span>Velocidad del cable (1000 Mb/s) o NO-CARRIER.</span></div></div>' },
              { tipo: 'pregunta', texto: '¿Qué comando muestra la dirección IP y la MAC de una PC con Ubuntu?', opciones: ['ip a', 'ping', 'lldpctl', 'nmcli'], correcta: 0 },
              { tipo: 'pregunta', texto: '¿Qué comando usarías para ver cuál es el gateway?', opciones: ['ip route', 'ip neigh', 'traceroute', 'ethtool'], correcta: 0,
                explica: 'La línea <i>default via 172.25.0.1</i> de <code>ip route</code> es el gateway.' },
              { tipo: 'pregunta', texto: 'En Packet Tracer, ¿qué muestra la vista <b>física</b>?', opciones: ['Las IPs de cada equipo', 'Dónde están los equipos: ciudad, edificio, salón y rack (con el plano de fondo)', 'Los comandos del switch', 'Solo los cables'], correcta: 1,
                explica: 'La vista <b>lógica</b> muestra cómo se conectan los equipos; la <b>física</b>, dónde están de verdad.' }
            ]
          },
          {
            id: 'u9', titulo: 'Prepárate para explicarlo', pasos: [
              { tipo: 'explica', titulo: 'Si el profe te pregunta…', texto:
                '<p>Resumen en una frase: <b>«El Lab. Redes tiene una red en estrella: 17 PCs Dell conectadas por cable Cat 6 a un switch Dell 6248 en el rack, más un access point para Wi-Fi. Todo está en la red del campus 172.25.0.0/16, las IPs las da un DHCP y se sale a Internet por el gateway y firewall 172.25.0.1.»</b></p>' },
              { tipo: 'pregunta', texto: '¿Cuál es la red (con su prefijo) del salón?', opciones: ['192.168.1.0/24', '172.25.0.0/16', '10.0.0.0/8', '192.168.137.0/24'], correcta: 1 },
              { tipo: 'pregunta', texto: '¿Qué equipo es el centro de la red del salón?', opciones: ['El router Cisco 2811', 'El switch Dell PowerConnect 6248', 'El servidor Proxmox', 'El proyector'], correcta: 1 },
              { tipo: 'pregunta', texto: '¿Quién le da la IP a cada PC?', opciones: ['El alumno la escribe', 'Un servidor DHCP (en 172.25.0.1)', 'El access point', 'El switch'], correcta: 1 },
              { tipo: 'pregunta', texto: '¿Qué tipo de cable usa el salón?', opciones: ['Coaxial', 'Fibra óptica', 'UTP Cat 6', 'Cable de consola'], correcta: 2 },
              { tipo: 'pregunta', texto: '¿Por qué jenni y lrm12 usan Wi-Fi?', opciones: ['Porque es más rápido', 'Porque su cable no tiene señal (NO-CARRIER)', 'Porque no tienen tarjeta de red', 'Porque están en otra VLAN'], correcta: 1 }
            ]
          }
        ]
      }
    ]
  };

  root.CAMINO.cursos.splice(1, 0, curso);
  root.UNSIJ = { salon };
})(window);
