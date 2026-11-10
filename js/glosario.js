/* Aula 503 — diccionario de palabras técnicas, explicadas con cosas de la vida diaria.
   Cualquier elemento con data-g="clave" abre su explicación al tocarlo.
   Los signos «?» (.ayuda) con title o data-tip también se abren al tocarlos (sirve en celular). */
(function (root) {
  'use strict';
  const G = {
    /* ---------- Redes ---------- */
    red: { t: 'Red', c: 'redes', corto: 'Equipos conectados para compartir información.',
      largo: 'Como las calles de un pueblo: unen casas (computadoras) para que viajen cartas (mensajes) de una a otra. Tu casa con Wi-Fi ya es una red pequeña; Internet es una red de redes.' },
    ip: { t: 'Dirección IP', c: 'redes', corto: 'La dirección de un equipo dentro de una red.',
      largo: 'Como la dirección de una casa: dice <b>en qué colonia</b> (red) está y <b>qué número de casa</b> es. Son 4 números del 0 al 255 separados por puntos.',
      ej: '<span class="m-red">192.168.1</span>.<span class="m-host">10</span> → colonia <b>192.168.1</b>, casa <b>10</b>' },
    mac: { t: 'Dirección MAC (el «gafete»)', c: 'redes', corto: 'Número de fábrica de la tarjeta de red. No cambia.',
      largo: 'Como el número de serie de tu celular o el gafete con tu nombre: viene puesto de fábrica y es único. La IP puede cambiar si te mudas de red; la MAC no. Se escribe con 6 pares de números y letras (hexadecimal).',
      ej: '<span class="mono">00:1A:2B:3C:4D:5E</span> — no tienes que memorizarla; los equipos la averiguan solos.' },
    mascara: { t: 'Máscara de subred', c: 'redes', corto: 'Dice qué parte de la IP es la colonia y qué parte la casa.',
      largo: 'Es como una regla que tapa la parte de la «colonia». Con <span class="mono">255.255.255.0</span> los primeros 3 números son la colonia y el último es la casa. Casi siempre usarás esa.',
      ej: 'Con 255.255.255.0: <span class="mono">192.168.1.10</span> y <span class="mono">192.168.1.80</span> son vecinos; <span class="mono">192.168.2.5</span> vive en otra colonia.' },
    gateway: { t: 'Puerta de enlace (gateway)', c: 'redes', corto: 'El router al que le das lo que va a otra red.',
      largo: 'Como la caseta de salida de tu fraccionamiento: si la carta es para alguien de tu colonia, la llevas tú; si es para otra colonia, la dejas en la caseta y ellos la llevan. Se escribe la IP del router <b>en tu misma colonia</b>.' },
    ping: { t: 'Ping', c: 'redes', corto: 'Un mensaje de prueba: «¿me escuchas?».',
      largo: 'Como gritar «¡¿me oyes?!» y esperar que te contesten «¡sí!». Si llega la respuesta, los dos equipos se pueden comunicar. Por dentro usa un protocolo llamado ICMP.' },
    arp: { t: 'ARP', c: 'redes', corto: 'Preguntar en voz alta: «¿quién tiene esta dirección?».',
      largo: 'Para mandar un sobre en la red local necesitas el gafete (MAC) del otro, pero solo sabes su dirección (IP). Entonces preguntas a todos: «¿quién tiene la dirección 192.168.1.1?». Solo el dueño contesta con su gafete, y lo apuntas en tu agenda (tabla ARP).' },
    tablaArp: { t: 'Tabla ARP', c: 'redes', corto: 'La agenda de contactos del equipo.',
      largo: 'Una lista donde el equipo apunta «esta dirección IP → tiene este gafete MAC», para no volver a preguntar cada vez. Empieza vacía y se llena sola.' },
    switch: { t: 'Switch', c: 'redes', corto: 'Une equipos de la misma red y reparte los mensajes.',
      largo: 'Como el repartidor de un edificio: todos los departamentos (computadoras) se conectan a él con un cable. Tiene una libreta donde apunta en qué puerta (puerto) vive cada gafete (MAC), así entrega cada sobre solo a quien le toca.' },
    tablaMac: { t: 'Tabla de direcciones MAC', c: 'redes', corto: 'La libreta del switch.',
      largo: 'El switch apunta «el gafete tal está en mi puerto Fa0/3». La primera vez que no sabe dónde está alguien, copia el sobre por todos sus puertos; cuando ve la respuesta, ya lo apunta.' },
    router: { t: 'Router', c: 'redes', corto: 'Une redes distintas (colonias distintas).',
      largo: 'Como la oficina de correos entre dos colonias: recibe la carta, lee la dirección final y la manda por el camino correcto. Cada uno de sus puertos está en una colonia diferente y tiene su propia IP. El módem de tu casa tiene un router adentro.' },
    puerto: { t: 'Puerto (interfaz)', c: 'redes', corto: 'El agujero donde se conecta el cable.',
      largo: 'Cada switch y router tiene varios. Tienen nombres como <span class="mono">Fa0/1</span> (FastEthernet, el puerto 1) o <span class="mono">Gi0/1</span> (GigabitEthernet, más rápido).' },
    trama: { t: 'Trama (el sobre de afuera)', c: 'redes', corto: 'El sobre que viaja por el cable, con gafetes (MAC).',
      largo: 'Lleva escrito el gafete de quien lo manda y de quien lo recibe <b>en este tramo</b>. Cada vez que pasa por un router se cambia por un sobre nuevo.' },
    paquete: { t: 'Paquete IP (el sobre de adentro)', c: 'redes', corto: 'Lleva las direcciones IP del origen y destino final.',
      largo: 'Va dentro de la trama. Sus direcciones no cambian en todo el viaje: dicen de quién es el mensaje y para quién es al final.' },
    encapsular: { t: 'Encapsular', c: 'redes', corto: 'Meter un sobre dentro de otro.',
      largo: 'El mensaje va dentro de un paquete IP, y el paquete va dentro de una trama Ethernet. Como una carta en un sobre, dentro de una caja de paquetería.' },
    difusion: { t: 'Difusión (broadcast)', c: 'redes', corto: 'Un mensaje para todos.',
      largo: 'Como hablar con altavoz en la escuela: todos lo escuchan. Se manda al gafete especial <span class="mono">FF:FF:FF:FF:FF:FF</span>, que significa «a todos».' },
    ttl: { t: 'TTL', c: 'redes', corto: 'Vidas que le quedan al paquete.',
      largo: 'Cada router le resta 1. Si llega a 0, el paquete se tira. Así un mensaje perdido no da vueltas para siempre.' },
    cli: { t: 'Consola (CLI)', c: 'redes', corto: 'Configurar un equipo escribiendo comandos.',
      largo: 'Los switches y routers Cisco no tienen ventanas ni botones: les escribes órdenes de texto como <code>enable</code> o <code>hostname S1</code>. Es lo que haces en Packet Tracer.' },
    svi: { t: 'Interfaz VLAN 1', c: 'redes', corto: 'Donde se pone la IP de un switch.',
      largo: 'Un switch no necesita IP para repartir mensajes, pero sí para que tú lo administres a distancia. Esa IP va en una «interfaz virtual» llamada VLAN 1, y se enciende con <code>no shutdown</code>.' },

    dhcp: { t: 'DHCP', c: 'redes', corto: 'El que reparte las direcciones IP automáticamente.',
      largo: 'Como la recepción de un hotel que te asigna cuarto al llegar: cuando conectas tu PC, le pregunta al servidor DHCP «¿qué dirección me toca?» y él le «presta» una por un tiempo (en tu salón, 2 horas). Por eso nadie tuvo que escribir la IP a mano.' },
    dns: { t: 'DNS', c: 'redes', corto: 'La agenda que convierte nombres en direcciones IP.',
      largo: 'Tú escribes <i>google.com</i>, pero la red solo entiende números. El DNS busca el nombre y te dice su IP, como buscar a alguien en los contactos del celular. En tu salón el DNS es 172.25.0.1.' },
    firewall: { t: 'Firewall', c: 'redes', corto: 'El guardia que decide qué tráfico pasa.',
      largo: 'Como el vigilante de la entrada de la universidad: revisa lo que entra y sale y bloquea lo que no está permitido. Por eso en tu salón el <i>traceroute</i> no muestra el camino: el firewall lo bloquea.' },
    ap: { t: 'Access point (AP)', c: 'redes', corto: 'El aparato que da el Wi-Fi.',
      largo: 'Funciona como un switch pero por ondas de radio: los celulares y laptops se conectan a él sin cable, y él está conectado con cable al switch. En tu salón está en la pared, junto al pizarrón.' },
    ssid: { t: 'SSID', c: 'redes', corto: 'El nombre de la red Wi-Fi.',
      largo: 'Es el nombre que ves en tu celular al buscar redes. El de tu salón es <i>www.unsij.edu.mx-LabRedes</i>.' },
    vlan: { t: 'VLAN', c: 'redes', corto: 'Una red separada dentro del mismo switch.',
      largo: 'Como poner paredes invisibles en un edificio: aunque todos estén conectados al mismo switch, los de una VLAN no pueden hablar directo con los de otra. Es una posible razón de que el servidor Proxmox no conteste desde tu salón.' },
    lldp: { t: 'LLDP', c: 'redes', corto: 'Un mensaje en el que el switch dice «aquí estoy».',
      largo: 'El switch manda cada rato un mensajito por cada puerto con su identificación. Con el programa <code>lldpctl</code> en la laptop se leyó y así se supo que la toma 49 llega al puerto 17 del switch.' },
    cat6: { t: 'Cable Cat 6', c: 'redes', corto: 'El cable de red (UTP) del salón.',
      largo: 'Cable de cobre con 4 pares trenzados, para velocidades de hasta 1 Gb/s (1000 Mb/s) y más. En tu salón es marca Panduit y llega a tomas de pared y piso numeradas: los <b>nodos</b>.' },
    nodo: { t: 'Nodo (toma de red)', c: 'redes', corto: 'La toma de la pared donde conectas el cable.',
      largo: 'Como un enchufe, pero de red. Cada nodo tiene un número (13, 14, 15, 49…) y por dentro de la pared su cable llega hasta un puerto del switch del rack.' },
    rack: { t: 'Rack', c: 'redes', corto: 'El mueble metálico donde van switch y router.',
      largo: 'Un gabinete con rieles donde se atornillan los equipos de red. El de tu salón es marca Hubbell y tiene el switch Dell PowerConnect 6248.' },
    servidorVm: { t: 'Servidor y máquinas virtuales', c: 'redes', corto: 'Una computadora potente que corre varias «computadoras» adentro.',
      largo: 'El servidor Proxmox de tu salón ejecuta máquinas virtuales (VM): son como varias computadoras falsas dentro de una real, cada una con su propio sistema y su propia IP.' },
    /* ---------- IA ---------- */
    agente: { t: 'Agente', c: 'ia', corto: 'Algo que percibe y actúa.',
      largo: 'Percibe su entorno con <b>sensores</b> (ojos, cámaras) y actúa con <b>actuadores</b> (manos, ruedas). Una aspiradora robot, un videojuego que controla enemigos y tú mismo son agentes.' },
    percepcion: { t: 'Percepción', c: 'ia', corto: 'Lo que el agente sabe en este momento.',
      largo: 'Lo que le dicen sus sensores ahora. La aspiradora solo sabe dos cosas: en qué cuarto está y si ese cuarto está sucio. No ve el otro cuarto.' },
    regla: { t: 'Regla', c: 'ia', corto: '«Si pasa esto → haz aquello».',
      largo: 'Una instrucción que le das al agente. Con varias reglas armas su «cerebro»: una tabla que dice qué hacer en cada situación.' },
    busqueda: { t: 'Búsqueda', c: 'ia', corto: 'Probar caminos hasta llegar a la meta.',
      largo: 'Como buscar la salida de un laberinto: hay un inicio, una meta y pasos posibles. Cada algoritmo prueba los caminos en un orden diferente.' },
    heuristica: { t: 'Heurística', c: 'ia', corto: 'Una pista para saber si vas bien.',
      largo: 'Como «la meta está hacia abajo a la derecha, mejor voy para allá». No es perfecta (no ve los muros), pero ahorra mucho trabajo.' },
    neurona: { t: 'Neurona artificial', c: 'ia', corto: 'Una calculadora que decide sí o no.',
      largo: 'Toma datos (horas de estudio, horas de sueño), multiplica cada uno por su importancia (peso), suma todo y, si el total sale de 0 para arriba, dice «sí».' },
    peso: { t: 'Peso', c: 'ia', corto: 'Qué tanto importa un dato.',
      largo: 'Un número que multiplica a cada dato. Grande y positivo: ese dato empuja mucho hacia «sí». Negativo: empuja hacia «no». Cerca de 0: casi no importa.' },
    sesgo: { t: 'Sesgo', c: 'ia', corto: 'El punto de partida: qué tan exigente es.',
      largo: 'Un número que se suma al final. Muy negativo = neurona exigente (cuesta decir «sí»). Positivo = neurona barco. Mueve la línea sin girarla.' },
    entrenar: { t: 'Entrenar', c: 'ia', corto: 'Corregir los pesos con ejemplos.',
      largo: 'Le enseñas ejemplos con la respuesta correcta; cada vez que se equivoca, mueves un poquito sus pesos. Así «aprende» sola.' },

    /* ---------- Ingeniería de software ---------- */
    software: { t: 'Software', c: 'is', corto: 'Programas + datos + documentación.',
      largo: 'No es solo el código: también los datos que usa y los documentos que explican cómo funciona y cómo se usa.' },
    ingsoft: { t: 'Ingeniería de software', c: 'is', corto: 'Hacer software con método, no a lo loco.',
      largo: 'Como construir una casa: antes de poner ladrillos se habla con el dueño, se hacen planos, se construye por partes y se revisa. Así el software sale a tiempo, funciona y se puede arreglar después.' },
    requisito: { t: 'Requerimiento (requisito)', c: 'is', corto: 'Algo que el sistema debe hacer o cumplir.',
      largo: '<b>Funcional</b>: lo que hace («registrar un pedido»). <b>No funcional</b>: cómo debe ser («abrir en menos de 2 segundos», «funcionar en Android»).' },
    cliente: { t: 'Cliente / interesado', c: 'is', corto: 'Quien pide el software o lo va a usar.',
      largo: 'También se les dice <i>stakeholders</i>: el dueño del negocio, los usuarios, quien paga. Hay que escucharlos a todos.' },
    cascada: { t: 'Modelo en cascada', c: 'is', corto: 'Todo en orden, una etapa tras otra.',
      largo: 'Primero todos los requisitos, luego todo el diseño, luego todo el código, luego las pruebas. Como una cascada, el agua no regresa: cambiar algo al final cuesta mucho.' },
    agil: { t: 'Ágil', c: 'is', corto: 'Entregar en pedacitos y pedir opinión seguido.',
      largo: 'En vez de entregar todo al final, cada 1 a 4 semanas se entrega algo que ya funciona, el cliente lo prueba y se ajusta el plan. Scrum es el método ágil más usado.' },
    scrum: { t: 'Scrum', c: 'is', corto: 'Método ágil que trabaja en sprints.',
      largo: 'Roles: <b>Product Owner</b> (decide qué es más importante), <b>Scrum Master</b> (quita obstáculos) y el <b>equipo</b>. Se trabaja en sprints, con una junta diaria de 15 minutos.' },
    sprint: { t: 'Sprint', c: 'is', corto: 'Un ciclo corto de trabajo (1 a 4 semanas).',
      largo: 'Al empezar se eligen tareas que quepan en el tiempo; al terminar se enseña lo hecho al cliente y se platica qué mejorar.' },
    backlog: { t: 'Backlog', c: 'is', corto: 'La lista de pendientes ordenada por importancia.',
      largo: 'El <b>Product backlog</b> tiene todo lo que algún día se hará. El <b>Sprint backlog</b> es lo que el equipo se comprometió a hacer en este sprint.' },
    historia: { t: 'Historia de usuario', c: 'is', corto: '«Como ___ quiero ___ para ___».',
      largo: 'Una forma corta de escribir un requisito desde el punto de vista de quien lo usa. Ejemplo: «Como cliente quiero ver el menú para elegir qué pedir».' },
    casoUso: { t: 'Caso de uso', c: 'is', corto: 'Algo que un usuario hace con el sistema.',
      largo: 'Se dibuja como un óvalo con el nombre de la acción («Hacer pedido»). Los <b>actores</b> (monitos) son quienes lo usan.' },
    clase: { t: 'Clase y objeto', c: 'is', corto: 'Clase = molde. Objeto = lo que sale del molde.',
      largo: 'La clase <b>Pedido</b> dice qué datos tiene (atributos: fecha, total) y qué sabe hacer (métodos: calcularTotal). Cada pedido real («el pedido de Juan de hoy») es un objeto.' },
    calidad: { t: 'Calidad de software (ISO 25010)', c: 'is', corto: 'Qué hace «bueno» a un programa.',
      largo: 'La norma ISO/IEC 25010 (de la familia 25000) lista características: que haga lo que debe, que sea rápido, fácil de usar, confiable, seguro, fácil de cambiar y que funcione en distintos equipos.' }
  };

  let pop = null;
  function cerrar() { if (pop) { pop.remove(); pop = null; } }
  function mostrar(target, html) {
    cerrar();
    pop = document.createElement('div');
    pop.className = 'glo-pop';
    pop.setAttribute('role', 'dialog');
    pop.innerHTML = html + '<button type="button" class="glo-x" aria-label="Cerrar">×</button>';
    document.body.appendChild(pop);
    const r = target.getBoundingClientRect(), w = Math.min(340, window.innerWidth - 24);
    pop.style.width = w + 'px';
    let x = Math.max(12, Math.min(window.innerWidth - w - 12, r.left + r.width / 2 - w / 2));
    let y = r.bottom + 8;
    const alto = pop.offsetHeight;
    if (y + alto > window.innerHeight - 8 && r.top - alto - 8 > 8) y = r.top - alto - 8;
    pop.style.left = x + 'px'; pop.style.top = Math.max(8, y) + 'px';
    pop.querySelector('.glo-x').onclick = cerrar;
  }
  const ficha = k => { const e = G[k]; if (!e) return ''; return '<div class="glo-t">' + e.t + '</div><p class="glo-c">' + e.corto + '</p><p>' + e.largo + '</p>' + (e.ej ? '<p class="glo-ej">' + e.ej + '</p>' : ''); };
  document.addEventListener('click', ev => {
    const t = ev.target.closest && ev.target.closest('[data-g], .ayuda');
    if (!t) { if (pop && !pop.contains(ev.target)) cerrar(); return; }
    ev.preventDefault(); ev.stopPropagation();
    if (t.dataset.g && G[t.dataset.g]) return mostrar(t, ficha(t.dataset.g));
    const tip = t.dataset.tip || t.getAttribute('title');
    if (tip) { if (t.getAttribute('title')) { t.dataset.tip = tip; t.removeAttribute('title'); } mostrar(t, '<p>' + tip.replace(/</g, '&lt;') + '</p>'); }
  }, true);
  document.addEventListener('keydown', ev => {
    if (ev.key === 'Escape') cerrar();
    if ((ev.key === 'Enter' || ev.key === ' ') && ev.target.dataset && ev.target.dataset.g) { ev.preventDefault(); ev.target.click(); }
  });
  window.addEventListener('scroll', cerrar, true);
  // T('ip', 'IP') → palabra subrayada que abre su explicación
  const T = (k, txt) => '<button type="button" class="term' + (txt === '?' ? ' ayuda' : '') + '" data-g="' + k + '"' + (txt === '?' ? ' aria-label="¿Qué es ' + (G[k] ? G[k].t : k) + '?"' : '') + '>' + (txt || (G[k] ? G[k].t : k)) + '</button>';
  root.GLOSARIO = G;
  root.T = T;
})(window);
