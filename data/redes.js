/* Redes I (LI-52) — contenido de estudio */
window.AULA = window.AULA || { materias: [], juegos: [] };
AULA.materias.push({
  id: 'redes', nombre: 'Redes I', corto: 'Redes', clave: 'LI-52', horas: 80,
  profe: 'Dr. Florentino Méndez Gijón', color: 'redes',
  objetivo: 'Conocer el proceso de comunicación de datos y sus componentes para diseñar, implementar y mantener una red de área local.',
  parciales: { 1: [1, 2, 3, 4], 2: [5, 6], 3: [7, 8] },
  evidencias: [
    'Parcial 1: topología de la red de la UNSIJ en Packet Tracer (20%), cableado de los racks del laboratorio (40%), inventario de elementos de red (20%), examen (20%).',
    'Estudio independiente sugerido: curso CCNA Introducción a las redes en Netacad (netacad.com).',
    'Tienes el instalador de Cisco Packet Tracer en Descargas/Instaladores.'
  ],
  unidades: [
  { n: 1, titulo: 'Introducción a las redes', temas: [
    { id: '1.1', t: 'Antecedentes históricos', sub: ['1.1.1 Historia de las redes', '1.1.2 Importancia de las redes', '1.1.3 Redes de voz, de datos y convergentes'],
      md: `### Historia en pocos pasos
| Año | Hito |
|---|---|
| 1844 | Telégrafo de Morse: primera red de comunicación eléctrica a distancia |
| 1876 | Teléfono: red de voz por **conmutación de circuitos** |
| 1961-64 | Kleinrock y Baran proponen la **conmutación de paquetes** |
| 1969 | **ARPANET** conecta 4 nodos (UCLA, Stanford, UCSB, Utah) |
| 1973-74 | Cerf y Kahn diseñan **TCP/IP**; Metcalfe inventa **Ethernet** en Xerox PARC |
| 1983 | ARPANET adopta TCP/IP: nace Internet como red de redes. Aparece el DNS |
| 1989-91 | Tim Berners-Lee crea la **World Wide Web** en el CERN |
| 1997 | Estándar Wi-Fi IEEE 802.11 |
| 2010s | Nube, IoT, 4G/5G |

### Importancia
Las redes permiten **compartir recursos** (impresoras, archivos, internet), **comunicarse** (correo, mensajería, videollamadas), trabajar y estudiar a distancia, comercio electrónico y servicios en la nube.

### Redes de voz, de datos y convergentes
- **Red de voz tradicional**: telefonía, conmutación de circuitos; se reserva un canal fijo durante la llamada.
- **Red de datos**: conmutación de paquetes; los datos se dividen en paquetes que comparten los enlaces.
- **Red convergente**: una sola infraestructura IP para **voz, video y datos** (VoIP, streaming, aplicaciones). Requiere **calidad de servicio (QoS)** para priorizar la voz y el video, que no toleran retrasos.

### Características de una red confiable
**Tolerancia a fallas**, **escalabilidad**, **calidad de servicio** y **seguridad** (confidencialidad, integridad, disponibilidad).`,
      clave: ['ARPANET 1969', 'Conmutación de circuitos vs de paquetes', 'Red convergente y QoS', 'Tolerancia a fallas, escalabilidad, QoS, seguridad'],
      pr: { p: 'Explica con un ejemplo de tu casa o escuela por qué una red convergente necesita QoS.', r: 'Si alguien descarga un archivo grande mientras otro está en videollamada, sin QoS los paquetes de la llamada esperan detrás de la descarga y la llamada se corta. QoS prioriza la voz/video.' },
      q: [
        ['¿En qué año se conectaron los primeros nodos de ARPANET?', ['1958', '1969', '1983', '1991'], 1, 'En 1969 con 4 universidades.'],
        ['La telefonía tradicional usa…', ['Conmutación de paquetes', 'Conmutación de circuitos', 'Wi-Fi', 'TCP/IP'], 1, 'Reserva un circuito durante la llamada.'],
        ['Una red que transporta voz, video y datos sobre IP es…', ['Red de voz', 'Red convergente', 'Red punto a punto', 'Red WAN'], 1, 'Converge todos los servicios en una infraestructura.']
      ],
      c: [['Conmutación de paquetes', 'Los datos se dividen en paquetes que viajan de forma independiente compartiendo enlaces.'], ['QoS', 'Calidad de servicio: prioriza tráfico sensible al retardo como voz y video.'], ['ARPANET', 'Red precursora de Internet (1969).']] },

    { id: '1.2', t: 'Componentes de las redes', sub: ['1.2.1 Componentes físicos', '1.2.2 Sistemas operativos de red'],
      md: `### Tres grupos de componentes
1. **Dispositivos finales (hosts)**: origen o destino de los mensajes. PC, laptop, teléfono, servidor, impresora de red, cámara IP.
2. **Dispositivos intermediarios**: conectan hosts y dirigen el tráfico.
   - **Switch**: conecta dispositivos dentro de una LAN; reenvía por dirección **MAC** (capa 2).
   - **Router**: conecta redes distintas; reenvía por dirección **IP** (capa 3).
   - **Punto de acceso inalámbrico (AP)**: conecta dispositivos Wi-Fi a la red cableada.
   - **Firewall**: filtra tráfico según reglas de seguridad.
   - Hub (obsoleto): repite la señal a todos los puertos.
3. **Medios**: el camino del mensaje. Cobre (UTP), fibra óptica, inalámbrico.

### Representaciones
- **NIC** (tarjeta de interfaz de red): conecta el host al medio.
- **Puerto físico**: conector en el dispositivo.
- **Interfaz**: puerto especializado de un dispositivo de red (por ejemplo, la interfaz G0/0 de un router).

### Sistemas operativos de red
- **Cisco IOS**: sistema de routers y switches Cisco. Se configura por **CLI** (consola, SSH o Telnet).
- Servidores: **Windows Server**, **Linux** (Ubuntu Server, Debian, Rocky), antes Novell NetWare. Ofrecen DNS, DHCP, archivos, directorio (Active Directory / LDAP).
- Otros: Juniper Junos, MikroTik RouterOS, pfSense/OPNsense (firewall).

### Modos de Cisco IOS
~~~text
Switch>                  modo EXEC de usuario
Switch> enable
Switch#                  modo EXEC privilegiado
Switch# configure terminal
Switch(config)#          configuración global
Switch(config)# interface vlan 1
Switch(config-if)#       configuración de interfaz
~~~`,
      clave: ['Dispositivos finales, intermediarios y medios', 'Switch (MAC) vs router (IP)', 'NIC, puerto, interfaz', 'Cisco IOS y sus modos'],
      pr: { p: 'Para la evidencia de inventario: haz una tabla con 5 equipos de red que veas en la universidad (tipo, marca/modelo, función, capa OSI en la que trabaja). En Packet Tracer, coloca un router, un switch, un AP y 3 PCs.', r: 'Ejemplo de fila: Switch | Cisco Catalyst 2960 | conecta PCs del laboratorio | capa 2. Router | Cisco ISR 4321 | sale a internet y conecta VLANs | capa 3.' },
      q: [
        ['¿Qué dispositivo conecta redes distintas usando direcciones IP?', ['Switch', 'Router', 'Hub', 'NIC'], 1, 'El router trabaja en capa 3.'],
        ['Un switch reenvía tramas según…', ['La dirección IP', 'La dirección MAC', 'El nombre de dominio', 'El puerto TCP'], 1, 'Mantiene una tabla de direcciones MAC.'],
        ['¿Qué prompt indica el modo EXEC privilegiado en Cisco IOS?', ['Switch>', 'Switch#', 'Switch(config)#', 'Switch(config-if)#'], 1, 'Se entra con enable.']
      ],
      c: [['Dispositivo intermediario', 'Conecta hosts y dirige tráfico: switch, router, AP, firewall.'], ['NIC', 'Tarjeta de interfaz de red que conecta un host al medio.'], ['enable', 'Comando de IOS para pasar de EXEC usuario (>) a privilegiado (#).']] },

    { id: '1.3', t: 'Topologías y representaciones de red', sub: ['1.3.1 Topologías físicas', '1.3.2 Topologías lógicas'],
      md: `### Diagramas
- **Diagrama de topología física**: dónde están los equipos y cómo se cablean (edificios, racks, salones).
- **Diagrama de topología lógica**: cómo fluye la información: direcciones IP, VLANs, subredes, nombres de interfaces.

### Topologías físicas
| Topología | Descripción | Ventaja | Desventaja |
|---|---|---|---|
| **Bus** | Todos en un cable común | Barata | Un corte cae toda la red; colisiones |
| **Anillo** | Cada nodo conectado a dos vecinos | Acceso ordenado | Una falla puede romper el anillo |
| **Estrella** | Todos a un dispositivo central (switch) | Fácil de administrar; una falla de cable afecta solo a un host | El switch central es punto único de falla |
| **Estrella extendida / jerárquica** | Estrellas conectadas entre sí | Escalable | Más equipo |
| **Malla** | Cada nodo con varios o todos los demás | Muy tolerante a fallas | Cara: n(n−1)/2 enlaces en malla completa |
| **Híbrida** | Combinación | Flexible | Compleja |

La LAN moderna con Ethernet usa **estrella extendida**.

### Topología lógica
Describe cómo se **accede al medio** y cómo viajan las tramas, sin importar el cableado. Ejemplo clásico: una red con hub es físicamente estrella, pero lógicamente se comporta como **bus** (todos reciben todo). Con un switch, cada puerto es su propio dominio de colisión.

### Íconos estándar (Packet Tracer / Cisco)
Router: círculo con flechas. Switch: rectángulo con flechas. Nube: Internet o WAN. Rayo: enlace serial WAN.`,
      clave: ['Topología física vs lógica', 'Bus, anillo, estrella, malla', 'Estrella extendida en LAN modernas', 'Malla completa: n(n−1)/2 enlaces'],
      pr: { p: '¿Cuántos enlaces necesita una malla completa de 6 routers? Dibuja en Packet Tracer la topología de tu edificio como estrella extendida: 1 router, 1 switch núcleo y 3 switches de acceso.', r: 'n(n−1)/2 = 6·5/2 = 15 enlaces.' },
      q: [
        ['¿Qué topología física usan casi todas las LAN Ethernet actuales?', ['Bus', 'Anillo', 'Estrella extendida', 'Malla completa'], 2, 'Switches en jerarquía.'],
        ['El diagrama que muestra IPs y subredes es…', ['Físico', 'Lógico', 'Eléctrico', 'De Gantt'], 1, 'Topología lógica.'],
        ['Enlaces en una malla completa de 5 nodos:', ['5', '10', '20', '25'], 1, '5·4/2 = 10.']
      ],
      c: [['Topología física', 'Disposición real de equipos y cables.'], ['Topología lógica', 'Cómo fluyen los datos y se accede al medio; incluye direccionamiento.'], ['Malla completa', 'Cada nodo conectado con todos: n(n−1)/2 enlaces.']] }
  ]},

  { n: 2, titulo: 'Protocolos y modelos', temas: [
    { id: '2.1', t: 'Protocolos',
      md: `Un **protocolo** es un conjunto de **reglas** que gobiernan la comunicación. Igual que en una conversación humana, hay que acordar idioma, turnos y formato.

### Elementos de toda comunicación
Origen (emisor), destino (receptor) y canal (medio).

### Lo que definen los protocolos
- **Codificación** del mensaje (bits → señales).
- **Formato y encapsulamiento** (encabezados, campos).
- **Tamaño** del mensaje (segmentación).
- **Temporización**: control de flujo, tiempo de espera de respuesta, método de acceso.
- **Opciones de entrega**: **unicast** (uno a uno), **multicast** (uno a un grupo), **broadcast** (uno a todos).

### Funciones típicas
Direccionamiento, confiabilidad (entrega garantizada), control de flujo, secuenciación, detección de errores, interfaz con la aplicación.

### Suite de protocolos
Los protocolos trabajan en conjunto, apilados en capas. La suite dominante es **TCP/IP**:

| Capa | Protocolos |
|---|---|
| Aplicación | HTTP, HTTPS, DNS, DHCP, SMTP, POP3, IMAP, FTP, SSH |
| Transporte | TCP, UDP |
| Internet | IPv4, IPv6, ICMP, ARP* |
| Acceso a la red | Ethernet, Wi-Fi (802.11), PPP |

*ARP trabaja entre las capas de red y de enlace.

Otras suites históricas: AppleTalk, Novell IPX/SPX, OSI.`,
      clave: ['Protocolo = reglas de comunicación', 'Codificación, formato, tamaño, temporización', 'Unicast, multicast, broadcast', 'Suite TCP/IP'],
      pr: { p: 'Clasifica cada protocolo en su capa TCP/IP: DNS, TCP, IPv6, Ethernet, SSH, UDP, ICMP, Wi-Fi, HTTP.', r: 'Aplicación: DNS, SSH, HTTP. Transporte: TCP, UDP. Internet: IPv6, ICMP. Acceso a la red: Ethernet, Wi-Fi.' },
      q: [
        ['Enviar un mensaje a todos los hosts de la red es…', ['Unicast', 'Multicast', 'Broadcast', 'Anycast'], 2, 'Uno a todos.'],
        ['¿En qué capa de TCP/IP está UDP?', ['Aplicación', 'Transporte', 'Internet', 'Acceso a la red'], 1, 'Junto con TCP.'],
        ['El control de flujo forma parte de…', ['La codificación', 'La temporización', 'El formato', 'El direccionamiento'], 1, 'Regula la velocidad de envío.']
      ],
      c: [['Protocolo', 'Conjunto de reglas que gobiernan la comunicación entre dispositivos.'], ['Multicast', 'Envío de uno a un grupo de destinos suscritos.']] },

    { id: '2.2', t: 'Estándares abiertos y propietarios',
      md: `### Protocolos propietarios
Los controla una empresa; puede limitar su uso. Ejemplos históricos: AppleTalk (Apple), Novell IPX/SPX, **EIGRP** de Cisco (luego publicado parcialmente), CDP (Cisco Discovery Protocol).

### Estándares abiertos
Cualquiera puede implementarlos. Permiten **interoperabilidad** (equipos de distintas marcas funcionan juntos), competencia y menores costos. Ejemplos: TCP/IP, HTTP, Ethernet, Wi-Fi, OSPF.

### Organizaciones de estándares
| Organización | Qué hace |
|---|---|
| **IETF** (Internet Engineering Task Force) | Publica los **RFC** de los protocolos de Internet (IP, TCP, HTTP) |
| **IEEE** (Institute of Electrical and Electronics Engineers) | Estándares **802**: 802.3 Ethernet, 802.11 Wi-Fi, 802.1Q VLAN |
| **ISO** | Creó el modelo de referencia **OSI** |
| **ITU-T** | Telecomunicaciones: compresión de video, DSL |
| **TIA/EIA** | Cableado: **T568A/T568B**, cableado estructurado |
| **ICANN / IANA** | Asignación de direcciones IP, nombres de dominio y números de puerto |
| **ISOC** (Internet Society) | Promueve el desarrollo abierto de Internet |
| **IAB** | Supervisión arquitectónica de Internet |

> Ejemplo: RFC 791 define IPv4; RFC 8200 define IPv6.`,
      clave: ['Propietario vs abierto', 'Interoperabilidad', 'IETF → RFC; IEEE → 802', 'TIA/EIA → cableado; IANA → IPs y puertos'],
      pr: { p: 'Relaciona: (a) 802.11, (b) RFC 791, (c) T568B, (d) asignación de puertos bien conocidos.', r: '(a) IEEE, (b) IETF, (c) TIA/EIA, (d) IANA.' },
      q: [
        ['¿Qué organización publica los estándares 802 (Ethernet, Wi-Fi)?', ['IETF', 'IEEE', 'ISO', 'IANA'], 1, 'IEEE 802.3 y 802.11.'],
        ['Los RFC son publicados por…', ['IEEE', 'IETF', 'TIA/EIA', 'ITU-T'], 1, 'Request for Comments.'],
        ['Principal ventaja de los estándares abiertos:', ['Son más caros', 'Interoperabilidad entre fabricantes', 'Solo funcionan con Cisco', 'Son secretos'], 1, 'Equipos de distintas marcas se entienden.']
      ],
      c: [['RFC', 'Documento del IETF que define protocolos de Internet.'], ['TIA/EIA-568', 'Estándar de cableado de telecomunicaciones (T568A/B).']] },

    { id: '2.3', t: 'Modelo OSI',
      md: `El **modelo OSI** (ISO, 1984) es un modelo de **referencia** de 7 capas. Sirve para entender, enseñar y diagnosticar redes. Cada capa ofrece servicios a la de arriba.

| # | Capa | Función | PDU | Ejemplos |
|---|---|---|---|---|
| 7 | **Aplicación** | Servicios de red al usuario | Datos | HTTP, DNS, FTP, SMTP |
| 6 | **Presentación** | Formato, cifrado, compresión | Datos | JPEG, ASCII, TLS* |
| 5 | **Sesión** | Abre, mantiene y cierra diálogos | Datos | NetBIOS, RPC |
| 4 | **Transporte** | Segmenta, entrega extremo a extremo, confiabilidad | **Segmento** (TCP) / datagrama (UDP) | TCP, UDP |
| 3 | **Red** | Direccionamiento lógico y enrutamiento | **Paquete** | IP, ICMP, router |
| 2 | **Enlace de datos** | Acceso al medio, direccionamiento físico, detección de errores | **Trama** | Ethernet, MAC, switch |
| 1 | **Física** | Transmite bits como señales | **Bits** | Cables, conectores, hub |

### Mnemotecnias
- De abajo hacia arriba: **"Fíjate En Rápido Transporte Sin Pagar Ahí"** (Física, Enlace, Red, Transporte, Sesión, Presentación, Aplicación).
- En inglés de arriba abajo: *All People Seem To Need Data Processing*.

### ¿Para qué sirve en la práctica?
Para diagnosticar de abajo hacia arriba: ¿el cable está conectado (1)? ¿hay luz de enlace y MAC (2)? ¿tiene IP y responde ping (3)? ¿el puerto está abierto (4)? ¿la aplicación responde (7)?

*TLS se ubica a veces entre capas 4 y 7; el modelo OSI no siempre encaja perfecto con protocolos reales.`,
      clave: ['7 capas en orden', 'PDU: datos, segmento, paquete, trama, bits', 'Switch capa 2, router capa 3', 'Diagnóstico de abajo hacia arriba'],
      pr: { p: 'Una PC no abre una página web. Escribe una revisión de 5 pasos siguiendo OSI desde la capa 1.', r: '1) Cable/luz del puerto o conexión Wi-Fi. 2) Que la NIC tenga enlace. 3) ipconfig/ip a: IP, máscara, gateway; ping al gateway y a 8.8.8.8. 4) Que el puerto 443 no esté bloqueado. 7) Que DNS resuelva (nslookup) y el navegador funcione.' },
      q: [
        ['¿En qué capa OSI trabaja un router?', ['2', '3', '4', '7'], 1, 'Capa de red.'],
        ['La PDU de la capa de enlace de datos es…', ['Paquete', 'Segmento', 'Trama', 'Bit'], 2, 'Trama (frame).'],
        ['¿Qué capa se encarga de cifrado y formato de datos?', ['Sesión', 'Presentación', 'Transporte', 'Red'], 1, 'Capa 6.']
      ],
      c: [['Capa 4 OSI', 'Transporte: segmentación, puertos, confiabilidad (TCP/UDP). PDU: segmento.'], ['Capa 2 OSI', 'Enlace de datos: tramas, direcciones MAC, switches.'], ['Capa 6 OSI', 'Presentación: formato, cifrado, compresión.']] },

    { id: '2.4', t: 'Modelo TCP/IP',
      md: `El **modelo TCP/IP** es el modelo de **protocolo** que usa Internet. Tiene 4 capas (algunos autores usan 5, separando física y enlace).

| TCP/IP | Corresponde en OSI | Protocolos |
|---|---|---|
| **Aplicación** | 7, 6, 5 | HTTP, DNS, DHCP, SMTP, SSH, FTP |
| **Transporte** | 4 | TCP, UDP |
| **Internet** | 3 | IPv4, IPv6, ICMP |
| **Acceso a la red** | 2, 1 | Ethernet, Wi-Fi, PPP |

### Modelo de protocolo vs modelo de referencia
- **TCP/IP**: describe lo que realmente hace una suite de protocolos concreta.
- **OSI**: es una referencia genérica para entender y comparar; nadie implementa "la capa de sesión OSI" por separado.

### Diferencias clave
- TCP/IP junta aplicación, presentación y sesión en una sola capa.
- TCP/IP no define la capa física: deja eso a estándares como IEEE 802.3.
- OSI se diseñó antes de los protocolos; TCP/IP se describió a partir de protocolos que ya funcionaban.

### Recorrido de una página web
1. El navegador crea la petición **HTTP** (aplicación).
2. **TCP** la divide en segmentos con puerto destino 443 u 80 (transporte).
3. **IP** agrega direcciones IP origen y destino (internet).
4. **Ethernet** agrega MAC origen y destino y la convierte en señales (acceso a la red).`,
      clave: ['4 capas: aplicación, transporte, internet, acceso a la red', 'Equivalencias con OSI', 'Modelo de protocolo vs de referencia'],
      pr: { p: 'Dibuja ambos modelos lado a lado y conecta con flechas las capas equivalentes. Ubica en ellos: switch, router, HTTP, TCP, cable UTP.', r: 'Switch: OSI 2 / acceso a la red. Router: OSI 3 / internet. HTTP: OSI 7 / aplicación. TCP: OSI 4 / transporte. UTP: OSI 1 / acceso a la red.' },
      q: [
        ['¿Cuántas capas tiene el modelo TCP/IP (versión clásica)?', ['4', '5', '7', '3'], 0, 'Aplicación, transporte, internet, acceso a la red.'],
        ['La capa de aplicación de TCP/IP equivale en OSI a…', ['Solo la 7', 'Las capas 5, 6 y 7', 'Las capas 3 y 4', 'La capa 1'], 1, 'Junta sesión, presentación y aplicación.'],
        ['IP pertenece a la capa…', ['Transporte', 'Internet', 'Aplicación', 'Acceso a la red'], 1, 'Capa de internet (red en OSI).']
      ],
      c: [['Capa de Internet (TCP/IP)', 'Equivale a la capa de red OSI: IP, ICMP, enrutamiento.'], ['Modelo de referencia', 'Modelo genérico para entender redes (OSI), no una implementación.']] },

    { id: '2.5', t: 'Encapsulamiento de datos',
      md: `Cuando los datos bajan por las capas, **cada capa agrega su encabezado** (y la capa 2 agrega también un tráiler). Eso es el **encapsulamiento**. Al recibir, cada capa quita su encabezado: **desencapsulamiento**.

~~~text
Aplicación   [ Datos ]
Transporte   [ Enc. TCP | Datos ]                         → segmento
Red          [ Enc. IP | Enc. TCP | Datos ]               → paquete
Enlace       [ Enc. Eth | Enc. IP | Enc. TCP | Datos | FCS ] → trama
Física       0101101001010...                             → bits
~~~

### Direcciones en cada capa
| Capa | Dirección | ¿Cambia en el camino? |
|---|---|---|
| Transporte | **Puertos** origen y destino | No |
| Red | **IP** origen y destino | **No** (de extremo a extremo)* |
| Enlace | **MAC** origen y destino | **Sí**, en cada salto (cada router reescribe la trama) |

*Salvo que intervenga NAT.

### Segmentación y multiplexación
Los datos grandes se dividen en partes pequeñas. Así varios flujos (música, chat, descarga) pueden **intercalarse** en el mismo cable, y si un fragmento se pierde, solo se reenvía ese.

### Comunicarse con un host de otra red
La PC pone como **MAC destino la del gateway predeterminado** (el router), pero como **IP destino la del servidor final**. El router saca la trama, mira la IP, y arma una trama nueva hacia el siguiente salto.

> En Packet Tracer, el **modo Simulación** te deja abrir cada paquete y ver sus encabezados capa por capa. Úsalo con un ping.`,
      clave: ['Cada capa agrega encabezado', 'Segmento → paquete → trama → bits', 'IP no cambia; MAC cambia en cada salto', 'MAC destino = gateway si el host está en otra red'],
      pr: { p: 'PC1 (192.168.1.10) envía a un servidor 10.0.0.5 a través del router R1 (G0/0 = 192.168.1.1). En la trama que sale de PC1, ¿cuál es la IP destino y cuál la MAC destino?', r: 'IP destino: 10.0.0.5 (el servidor). MAC destino: la MAC de la interfaz G0/0 de R1 (el gateway), porque el servidor está en otra red.' },
      q: [
        ['¿Qué capa agrega un tráiler (FCS) además del encabezado?', ['Transporte', 'Red', 'Enlace de datos', 'Aplicación'], 2, 'La trama lleva FCS para detectar errores.'],
        ['Al pasar por un router, ¿qué direcciones se reescriben?', ['IP origen y destino', 'MAC origen y destino', 'Puertos', 'Ninguna'], 1, 'Cada salto arma una trama nueva.'],
        ['El orden correcto de PDU al encapsular es…', ['Trama, paquete, segmento', 'Datos, segmento, paquete, trama, bits', 'Bits, trama, paquete', 'Paquete, segmento, trama'], 1, 'De arriba hacia abajo.']
      ],
      c: [['Encapsulamiento', 'Proceso de agregar encabezados de cada capa al bajar por la pila.'], ['FCS', 'Frame Check Sequence: tráiler de la trama para detectar errores (CRC).']] }
  ]},

  { n: 3, titulo: 'Capa física', temas: [
    { id: '3.1', t: 'Propósito de la capa física',
      md: `La capa física **transporta bits** a través del medio. Toma la trama de la capa 2 y la convierte en **señales**:
- **Eléctricas** en cobre.
- **Pulsos de luz** en fibra óptica.
- **Ondas de radio / microondas** en inalámbrico.

En el destino hace lo contrario: convierte las señales en bits y entrega la trama a la capa de enlace.

### Lo que define
- **Componentes físicos**: cables, conectores, NIC, hardware.
- **Codificación**: cómo se representan 0s y 1s (por ejemplo, **Manchester**: una transición de bajo a alto es 1 y de alto a bajo es 0; **NRZ**; 4B/5B).
- **Señalización**: el método de representar la señal en el medio (niveles de voltaje, modulación).

### Quién la estandariza
Organizaciones de ingeniería eléctrica y comunicaciones: **IEEE**, **TIA/EIA**, **ISO**, **ITU-T**, **ANSI**, y reguladores nacionales (en México el **IFT** para el espectro).

> Para la capa física, la red no "sabe" de direcciones ni de mensajes: solo hay voltajes, luz o radio.`,
      clave: ['Convierte bits en señales', 'Cobre: eléctrica; fibra: luz; inalámbrico: radio', 'Codificación (Manchester, NRZ)', 'Estándares de hardware: IEEE, TIA/EIA, ISO, ITU'],
      pr: { p: 'Dibuja la codificación Manchester de los bits 1 0 1 1 0 (transición en medio de cada bit: subida = 1, bajada = 0, según la convención IEEE 802.3).', r: 'Para cada bit: 1 → empieza bajo y sube a la mitad; 0 → empieza alto y baja a la mitad. Entre dos bits iguales consecutivos aparece una transición extra en el borde.' },
      q: [
        ['La PDU de la capa física es…', ['Trama', 'Bits', 'Paquete', 'Segmento'], 1, 'Transmite bits como señales.'],
        ['En fibra óptica los bits viajan como…', ['Voltajes', 'Pulsos de luz', 'Ondas de sonido', 'Microondas'], 1, 'Luz por un núcleo de vidrio o plástico.'],
        ['¿Qué es la codificación en capa física?', ['Cifrar los datos', 'Representar 0s y 1s como patrones de señal', 'Comprimir archivos', 'Asignar IPs'], 1, 'Por ejemplo, Manchester.']
      ],
      c: [['Codificación Manchester', 'Cada bit se representa con una transición a mitad del intervalo de bit.'], ['Señalización', 'Forma de representar la señal en el medio (voltaje, luz, radio).']] },

    { id: '3.2', t: 'Características de la capa física',
      md: `### Ancho de banda y sus parientes
| Término | Significado |
|---|---|
| **Ancho de banda** | Capacidad **teórica** del medio para transportar datos (bps) |
| **Latencia** | Tiempo que tarda un dato en ir de un punto a otro, incluidos los retrasos |
| **Rendimiento (throughput)** | Transferencia **real** medida en un periodo; casi siempre menor al ancho de banda |
| **Capacidad útil (goodput)** | Datos **útiles** transferidos: throughput menos encabezados, retransmisiones y control |

Unidades: bps, Kbps, Mbps, Gbps, Tbps (1 Gbps = 1000 Mbps). Ojo: **bits** (b) vs **bytes** (B). 100 Mbps ≈ 12.5 MB/s.

### Factores que afectan el throughput
Cantidad y tipo de tráfico, número de dispositivos, latencia de cada salto, interferencias, el enlace más lento del camino (cuello de botella).

### Interferencias en cobre
- **EMI** (interferencia electromagnética) y **RFI** (radiofrecuencia): motores, lámparas fluorescentes, radios.
- **Diafonía (crosstalk)**: la señal de un par se "cuela" en el par vecino.
- **Atenuación**: la señal se debilita con la distancia.

Contramedidas: **trenzado** de pares (cancelación), **blindaje**, respetar la distancia máxima (100 m en UTP), usar fibra.`,
      clave: ['Ancho de banda vs throughput vs goodput', 'Latencia', 'bits vs bytes', 'EMI, RFI, diafonía, atenuación'],
      pr: { p: 'Tienes un enlace de 100 Mbps. ¿Cuánto tarda (idealmente) en descargarse un archivo de 750 MB? ¿Por qué en la práctica tarda más?', r: '750 MB × 8 = 6000 Mb; 6000 / 100 = 60 s. Tarda más por encabezados, retransmisiones, latencia, otros usuarios y el cuello de botella más lento del camino.' },
      q: [
        ['La transferencia real medida de datos se llama…', ['Ancho de banda', 'Throughput', 'Latencia', 'Atenuación'], 1, 'El rendimiento real.'],
        ['100 Mbps equivalen aproximadamente a…', ['100 MB/s', '12.5 MB/s', '800 MB/s', '1 GB/s'], 1, 'Dividir entre 8.'],
        ['La pérdida de fuerza de la señal con la distancia es…', ['Diafonía', 'Atenuación', 'EMI', 'Latencia'], 1, 'Por eso UTP se limita a 100 m.']
      ],
      c: [['Goodput', 'Datos útiles transferidos, sin contar encabezados ni retransmisiones.'], ['Diafonía', 'Interferencia de la señal de un par de cables sobre otro cercano.']] },

    { id: '3.3', t: 'Cableado UTP',
      md: `**UTP** (par trenzado sin blindaje) es el medio más usado en LAN. Tiene **4 pares** (8 hilos) trenzados; el trenzado cancela la EMI y la diafonía.

### Categorías
| Categoría | Velocidad típica | Frecuencia |
|---|---|---|
| Cat 5e | 1 Gbps | 100 MHz |
| Cat 6 | 1 Gbps (10 Gbps hasta ~55 m) | 250 MHz |
| Cat 6a | 10 Gbps a 100 m | 500 MHz |
| Cat 8 | 25/40 Gbps a 30 m (centros de datos) | 2000 MHz |

Distancia máxima de un enlace: **100 m** (90 m de cableado horizontal + 10 m de patch cords). Conector: **RJ-45**.

### Estándares de terminación (TIA/EIA-568)
| Pin | T568A | T568B |
|---|---|---|
| 1 | Blanco-verde | Blanco-naranja |
| 2 | Verde | Naranja |
| 3 | Blanco-naranja | Blanco-verde |
| 4 | Azul | Azul |
| 5 | Blanco-azul | Blanco-azul |
| 6 | Naranja | Verde |
| 7 | Blanco-café | Blanco-café |
| 8 | Café | Café |

Truco: T568A y T568B solo **intercambian el par verde y el naranja**.

### Tipos de cable
- **Directo** (straight-through): mismo estándar en ambos extremos (B-B). Conecta **dispositivos distintos**: PC-switch, switch-router.
- **Cruzado** (crossover): A en un extremo y B en el otro. Conecta **dispositivos iguales**: switch-switch, PC-PC, router-router, **PC-router**.
- **Consola (rollover)**: de la PC al puerto de consola del router/switch para configurarlo.

> Hoy casi todos los puertos tienen **Auto-MDIX** y detectan el tipo de cable, pero en el examen y en Packet Tracer sí importa.

STP/FTP: par trenzado **blindado**, para ambientes con mucha interferencia.`,
      clave: ['4 pares, RJ-45, máx. 100 m', 'Cat 5e, 6, 6a', 'T568A vs T568B (verde ↔ naranja)', 'Directo, cruzado, consola'],
      pr: { p: 'Para la práctica de ponchado: escribe de memoria el orden T568B. Luego indica qué cable usarías para: PC-switch, switch-switch, PC-router, router-switch.', r: 'T568B: BN, N, BV, A, BA, V, BC, C. PC-switch: directo. Switch-switch: cruzado. PC-router: cruzado. Router-switch: directo.' },
      q: [
        ['¿Cuál es la distancia máxima de un enlace UTP?', ['50 m', '100 m', '185 m', '500 m'], 1, '90 m horizontal + 10 m de parcheo.'],
        ['El pin 1 en T568B es…', ['Blanco-verde', 'Blanco-naranja', 'Azul', 'Café'], 1, 'B empieza con naranja.'],
        ['Para conectar una PC directamente a un router (sin Auto-MDIX) se usa cable…', ['Directo', 'Cruzado', 'Consola', 'Coaxial'], 1, 'PC y router son del mismo "lado" (transmiten por los mismos pines).']
      ],
      c: [['T568B', 'BN, N, BV, A, BA, V, BC, C.'], ['Cable cruzado', 'T568A en un extremo y T568B en el otro; une dispositivos similares.'], ['Auto-MDIX', 'Función del puerto que detecta y ajusta el tipo de cable automáticamente.']] },

    { id: '3.4', t: 'Cableado de fibra óptica',
      md: `La fibra transmite **pulsos de luz** por un núcleo de vidrio muy puro. Es **inmune a EMI/RFI**, alcanza distancias de kilómetros y ofrece anchos de banda muy altos.

### Partes
**Núcleo** (por donde viaja la luz) → **revestimiento** (refleja la luz hacia el núcleo por reflexión interna total) → **búfer** → **fibras de aramida** (Kevlar, resistencia) → **chaqueta**.

### Tipos
| | Monomodo (SMF) | Multimodo (MMF) |
|---|---|---|
| Núcleo | Pequeño (~9 µm) | Más grande (50 o 62.5 µm) |
| Fuente de luz | Láser | LED o láser VCSEL |
| Distancia | Decenas de km | Hasta ~550 m (10 Gbps) |
| Costo | Mayor | Menor |
| Uso | Backbone, enlaces entre edificios, ISP | Dentro de edificios, centros de datos |
| Color de chaqueta típico | Amarillo | Naranja o aqua |

### Conectores
**SC** (cuadrado, de empuje), **LC** (pequeño, muy usado en switches), **ST** (bayoneta, antiguo), **MPO** (múltiples fibras).

Normalmente se usan **dos fibras**: una para transmitir y otra para recibir (dúplex).

### Fibra vs cobre
| | UTP | Fibra |
|---|---|---|
| Distancia | 100 m | Kilómetros |
| Inmunidad a EMI | Baja | Total |
| Costo | Bajo | Alto |
| Instalación | Fácil | Requiere más cuidado y herramientas |
| Seguridad | Se puede intervenir | Muy difícil de intervenir |`,
      clave: ['Luz por un núcleo; inmune a EMI', 'Monomodo (láser, km) vs multimodo (LED, cientos de m)', 'Conectores SC, LC, ST', 'Fibra para backbone'],
      pr: { p: 'Debes unir dos edificios de la universidad separados 800 m. ¿Qué medio y tipo usarías? ¿Y para unir dos racks en el mismo cuarto?', r: '800 m: fibra monomodo (o multimodo OM4 si la velocidad es baja, pero monomodo es la opción segura). Mismo cuarto: UTP Cat 6a o fibra multimodo con conectores LC.' },
      q: [
        ['¿Qué fibra alcanza mayores distancias?', ['Multimodo', 'Monomodo', 'Ambas igual', 'Ninguna'], 1, 'Núcleo pequeño y láser.'],
        ['¿Por qué la fibra es inmune a la EMI?', ['Porque es más gruesa', 'Porque transmite luz, no electricidad', 'Porque tiene blindaje metálico', 'Porque usa RJ-45'], 1, 'No hay corriente que inducir.'],
        ['Conector pequeño muy usado en switches con módulos SFP:', ['RJ-45', 'LC', 'BNC', 'ST'], 1, 'Lucent Connector.']
      ],
      c: [['Fibra monomodo', 'Núcleo ~9 µm, láser, largas distancias.'], ['Fibra multimodo', 'Núcleo 50/62.5 µm, LED/VCSEL, distancias cortas, más barata.']] },

    { id: '3.5', t: 'Medios inalámbricos',
      md: `Los medios inalámbricos usan **ondas de radio o microondas**. Dan movilidad, pero tienen limitaciones.

### Limitaciones
- **Área de cobertura**: paredes, metal y concreto atenúan la señal.
- **Interferencia**: microondas, teléfonos inalámbricos, otras redes, luces fluorescentes.
- **Seguridad**: cualquiera en el rango puede intentar captar la señal; hay que cifrar (WPA2/WPA3).
- **Medio compartido**: solo uno transmite a la vez en un canal (half-duplex); más usuarios = menos velocidad por usuario.

### Estándares IEEE 802.11 (Wi-Fi)
| Estándar | Nombre comercial | Banda | Velocidad máx. teórica |
|---|---|---|---|
| 802.11n | Wi-Fi 4 | 2.4 y 5 GHz | 600 Mbps |
| 802.11ac | Wi-Fi 5 | 5 GHz | ~3.5 Gbps |
| 802.11ax | Wi-Fi 6 / 6E | 2.4, 5 (y 6 GHz en 6E) | ~9.6 Gbps |
| 802.11be | Wi-Fi 7 | 2.4, 5 y 6 GHz | ~46 Gbps |

- **2.4 GHz**: mayor alcance, atraviesa mejor paredes, pero más interferencia y solo 3 canales sin traslape (1, 6, 11).
- **5 GHz**: más velocidad y más canales, menor alcance.

### Otros estándares
**Bluetooth** (802.15, corto alcance), **WiMAX** (802.16), **Zigbee** (IoT de bajo consumo), redes celulares 4G/5G.

### Componentes de una WLAN
**AP o router inalámbrico**, **adaptadores NIC inalámbricos**, **SSID** (nombre de la red), controladores de WLAN en redes grandes.`,
      clave: ['Ondas de radio; medio compartido', 'Cobertura, interferencia, seguridad', '802.11n/ac/ax/be', '2.4 GHz (alcance) vs 5 GHz (velocidad)'],
      pr: { p: 'En Packet Tracer agrega un router inalámbrico, configura el SSID "Lab503" con WPA2-PSK y conecta una laptop (cámbiale la tarjeta por una inalámbrica). Verifica con ping.', r: 'En la laptop: apágala, quita el módulo Ethernet y pon WPC300N; enciéndela y en Desktop > PC Wireless conéctate al SSID con la clave. Luego ping al gateway.' },
      q: [
        ['¿Qué banda Wi-Fi tiene mayor alcance?', ['2.4 GHz', '5 GHz', '6 GHz', 'Todas igual'], 0, 'Frecuencias bajas atraviesan mejor obstáculos.'],
        ['Wi-Fi 6 corresponde a…', ['802.11n', '802.11ac', '802.11ax', '802.3'], 2, '802.11ax.'],
        ['Canales sin traslape en 2.4 GHz:', ['1, 2, 3', '1, 6, 11', '36, 40, 44', 'Todos'], 1, 'Solo 1, 6 y 11 en América.']
      ],
      c: [['SSID', 'Nombre que identifica una red inalámbrica.'], ['802.11ax', 'Wi-Fi 6.'], ['WPA3', 'Protocolo de seguridad inalámbrica más reciente.']] }
  ]},

  { n: 4, titulo: 'Capa de enlace de datos', temas: [
    { id: '4.1', t: 'Propósito de la capa de enlace de datos',
      md: `La capa 2 prepara los paquetes de capa 3 para viajar por el medio local y controla cómo se accede a él.

### Funciones
- **Encapsula** el paquete en una **trama**.
- **Direccionamiento físico**: direcciones **MAC** de origen y destino en la red local.
- **Control de acceso al medio**: decide quién transmite y cuándo.
- **Detección de errores**: el tráiler lleva un **FCS** (CRC). Si no coincide, la trama se descarta.

### Subcapas (IEEE 802)
| Subcapa | Función |
|---|---|
| **LLC** (Control de enlace lógico, 802.2) | Se comunica con la capa de red; identifica qué protocolo de capa 3 va dentro (IPv4, IPv6) |
| **MAC** (Control de acceso al medio) | Encapsulamiento, direccionamiento MAC y acceso al medio; implementada en hardware (NIC) |

### Salto a salto
La trama solo vive en **un enlace**. En cada router:
1. Recibe la trama y la desencapsula.
2. Lee el paquete IP y decide la ruta.
3. Encapsula el paquete en una **trama nueva** para el siguiente medio (que puede ser Ethernet, Wi-Fi o un enlace serial PPP).

Por eso la capa 2 permite que un mismo paquete IP atraviese **medios distintos** en su camino.`,
      clave: ['Tramas y direcciones MAC', 'Subcapas LLC y MAC', 'Detección de errores con FCS/CRC', 'La trama vive un solo enlace'],
      pr: { p: 'Un paquete va de una PC por Ethernet, luego por un enlace serial y luego por Wi-Fi. ¿Cuántas tramas diferentes se crean? ¿Cuántos paquetes IP?', r: 'Tres tramas distintas (Ethernet, PPP/HDLC, 802.11). Un solo paquete IP (mismas IPs de origen y destino; solo cambian campos como el TTL).' },
      q: [
        ['¿Qué subcapa identifica el protocolo de capa 3?', ['MAC', 'LLC', 'Física', 'Transporte'], 1, 'LLC (802.2).'],
        ['El FCS sirve para…', ['Cifrar la trama', 'Detectar errores', 'Asignar IP', 'Enrutar'], 1, 'Comprobación de redundancia cíclica.'],
        ['Al pasar por un router, la trama…', ['Se reenvía igual', 'Se descarta y se crea una nueva', 'Se convierte en segmento', 'Pierde su IP'], 1, 'Cada salto usa una trama nueva.']
      ],
      c: [['LLC', 'Subcapa superior de enlace: interfaz con la capa de red.'], ['Subcapa MAC', 'Subcapa inferior: direccionamiento físico y acceso al medio.']] },

    { id: '4.2', t: 'Topologías LAN y WAN',
      md: `### Topologías WAN
- **Punto a punto**: enlace permanente entre dos extremos. La más simple.
- **Hub and spoke (estrella)**: un sitio central (hub) con sucursales (spokes). Toda comunicación entre sucursales pasa por el centro.
- **Malla**: alta disponibilidad, cada sitio conectado con varios.

### Topologías LAN
- **Estrella / estrella extendida** con switches (Ethernet). La más común.
- **Bus** y **anillo**: históricas (Ethernet coaxial, Token Ring, FDDI).

### Dúplex
| Modo | Descripción | Ejemplo |
|---|---|---|
| **Half-duplex** | Transmiten ambos, pero **no al mismo tiempo** | Hub, Wi-Fi, walkie-talkie |
| **Full-duplex** | Transmiten y reciben **simultáneamente** | Switch moderno, teléfono |

> Una **discordancia de dúplex** (un extremo full y otro half) genera colisiones tardías y lentitud. Es un error clásico al configurar puertos manualmente.

### Métodos de acceso
- **Acceso por contienda** (los dispositivos compiten): CSMA/CD (Ethernet antiguo), CSMA/CA (Wi-Fi).
- **Acceso controlado** (cada quien en su turno): Token Ring, FDDI.`,
      clave: ['WAN: punto a punto, hub and spoke, malla', 'LAN: estrella extendida', 'Half vs full duplex', 'Contienda vs acceso controlado'],
      pr: { p: 'Una empresa tiene matriz en Oaxaca y 4 sucursales en la Sierra. ¿Qué topología WAN es más barata y cuál más resistente a fallas?', r: 'Más barata: hub and spoke (4 enlaces). Más resistente: malla completa (5·4/2 = 10 enlaces) o malla parcial como punto medio.' },
      q: [
        ['Un switch moderno opera normalmente en…', ['Half-duplex', 'Full-duplex', 'Simplex', 'Token'], 1, 'Envía y recibe al mismo tiempo.'],
        ['¿Qué método de acceso usa Wi-Fi?', ['CSMA/CD', 'CSMA/CA', 'Token passing', 'Ninguno'], 1, 'Evitación de colisiones.'],
        ['Topología WAN con un sitio central y sucursales:', ['Malla', 'Hub and spoke', 'Bus', 'Anillo'], 1, 'Estrella en WAN.']
      ],
      c: [['Full-duplex', 'Transmitir y recibir al mismo tiempo.'], ['Discordancia de dúplex', 'Un extremo en full y otro en half: provoca errores y lentitud.']] },

    { id: '4.3', t: 'Trama de enlace de datos',
      md: `Toda trama tiene tres partes: **encabezado**, **datos** (el paquete) y **tráiler**.

### Campos genéricos
- **Indicadores de inicio y fin** (delimitadores).
- **Direccionamiento**: nodo origen y destino en el medio.
- **Tipo**: protocolo de capa 3 que transporta.
- **Control**: servicios especiales (por ejemplo, QoS).
- **Datos**: el paquete de capa 3.
- **Detección de errores (FCS)** en el tráiler.

### Trama Ethernet II
| Campo | Tamaño |
|---|---|
| Preámbulo + delimitador de inicio (SFD) | 8 bytes |
| MAC destino | 6 bytes |
| MAC origen | 6 bytes |
| EtherType (0x0800 = IPv4, 0x86DD = IPv6, 0x0806 = ARP) | 2 bytes |
| Datos | 46 – 1500 bytes |
| FCS (CRC) | 4 bytes |

- Tamaño de trama: **64 a 1518 bytes** (sin contar el preámbulo).
- Menos de 64 bytes = **runt** (fragmento de colisión) → se descarta.
- Más de 1518 = **jumbo** o **baby giant** → se descarta si el equipo no lo soporta.
- **MTU** de Ethernet = 1500 bytes de datos.

### Otros protocolos de capa 2
Ethernet (LAN), 802.11 (WLAN), **PPP** y **HDLC** (enlaces seriales WAN), Frame Relay (antiguo).`,
      clave: ['Encabezado, datos, tráiler', 'Campos de Ethernet II', 'Trama mínima 64 B, máxima 1518 B', 'EtherType 0x0800 IPv4'],
      pr: { p: 'Si el paquete IP mide 20 bytes, ¿cuánto relleno (padding) agrega Ethernet para llegar al tamaño mínimo de datos?', r: 'El campo de datos mínimo es 46 bytes, así que agrega 26 bytes de relleno.' },
      q: [
        ['Tamaño mínimo de una trama Ethernet:', ['46 bytes', '64 bytes', '1500 bytes', '1518 bytes'], 1, '64 bytes desde MAC destino hasta FCS.'],
        ['EtherType 0x0800 indica…', ['IPv6', 'ARP', 'IPv4', 'VLAN'], 2, 'IPv4.'],
        ['Una trama menor a 64 bytes se llama…', ['Jumbo', 'Runt', 'Giant', 'Baby'], 1, 'Suele venir de una colisión.']
      ],
      c: [['MTU', 'Unidad máxima de transmisión: 1500 bytes de datos en Ethernet.'], ['EtherType', 'Campo de 2 bytes que indica el protocolo encapsulado (0x0800 IPv4, 0x86DD IPv6).']] },

    { id: '4.4', t: 'Método de control de acceso al medio',
      md: `Cuando varios dispositivos comparten un medio, necesitan reglas para no hablar al mismo tiempo.

### CSMA/CD (Detección de colisiones) — Ethernet half-duplex
1. **Escucha** el medio (Carrier Sense).
2. Si está libre, transmite.
3. Si detecta una **colisión**, envía una **señal de congestión (jam)**.
4. Espera un tiempo aleatorio (**backoff**) y vuelve a intentar.

Hoy casi no se usa: con switches en **full-duplex** no hay colisiones.

### CSMA/CA (Prevención de colisiones) — Wi-Fi
Las radios no pueden detectar colisiones mientras transmiten, así que las **evitan**:
1. Escucha el medio.
2. Si está libre, espera un tiempo y transmite (opcionalmente pide permiso con **RTS/CTS**).
3. El receptor responde con un **ACK**. Si no llega el ACK, se asume que hubo colisión y se retransmite.

### Dominios de colisión
- Un **hub** junta todos sus puertos en **un solo dominio de colisión**.
- Cada puerto de un **switch** es su **propio dominio de colisión**.
- Un **router** separa también **dominios de broadcast**.

| Dispositivo | Dominios de colisión | Dominios de broadcast |
|---|---|---|
| Hub de 8 puertos | 1 | 1 |
| Switch de 8 puertos | 8 | 1 |
| Router con 3 interfaces | 3 | 3 |`,
      clave: ['CSMA/CD: detectar, jam, backoff', 'CSMA/CA: evitar, ACK, RTS/CTS', 'Switch: un dominio de colisión por puerto', 'Router separa dominios de broadcast'],
      pr: { p: 'Un router tiene 2 interfaces: en una hay un switch con 10 PCs conectadas y en la otra un hub con 4 PCs. ¿Cuántos dominios de broadcast y de colisión hay?', r: 'Broadcast: 2 (uno por interfaz del router). Colisión: el switch aporta 11 (10 puertos de PCs + 1 puerto hacia el router) y el hub aporta 1 (todo el hub con sus 4 PCs y el enlace al router). Total: 12 dominios de colisión.' },
      q: [
        ['¿Qué método usa Wi-Fi para el acceso al medio?', ['CSMA/CD', 'CSMA/CA', 'Token passing', 'TDMA'], 1, 'Prevención de colisiones con ACK.'],
        ['Un switch de 12 puertos crea…', ['1 dominio de colisión', '12 dominios de colisión', '12 dominios de broadcast', 'Ningún dominio'], 1, 'Un dominio de colisión por puerto.'],
        ['¿Qué dispositivo divide dominios de broadcast?', ['Hub', 'Switch', 'Router', 'Repetidor'], 2, 'Los routers no reenvían broadcasts.']
      ],
      c: [['CSMA/CD', 'Escucha, transmite, detecta colisión, envía jam y espera aleatoriamente.'], ['Dominio de broadcast', 'Conjunto de dispositivos que reciben un broadcast; lo delimitan los routers.']] },

    { id: '4.5', t: 'Ethernet',
      md: `**Ethernet** (IEEE 802.3) es la tecnología LAN dominante. Opera en capas 1 y 2.

### Direcciones MAC
- 48 bits = **12 dígitos hexadecimales**: 00-60-2F-3A-07-BC
- Los primeros 24 bits son el **OUI** (identificador del fabricante, asignado por IEEE); los otros 24 los asigna el fabricante.
- **Unicast**: un destino. **Broadcast**: FF-FF-FF-FF-FF-FF. **Multicast IPv4**: empieza con 01-00-5E.

### Cómo aprende y reenvía un switch
El switch tiene una **tabla de direcciones MAC** (tabla CAM):
1. **Aprende**: anota la **MAC origen** de cada trama y el puerto por donde llegó.
2. **Reenvía**: busca la **MAC destino**.
   - Si la conoce → la envía solo por ese puerto (**filtrado**).
   - Si no la conoce (unicast desconocido) o es broadcast → la envía por **todos los puertos excepto el de entrada** (**inundación**).

### Métodos de reenvío
- **Store-and-forward**: recibe la trama completa y revisa el FCS antes de reenviar. Descarta tramas dañadas. Es el más común.
- **Cut-through**: reenvía en cuanto lee la MAC destino. Más rápido; no revisa errores. Variante **fragment-free**: espera los primeros 64 bytes.

### Velocidades
Ethernet (10 Mbps), Fast Ethernet (100 Mbps), Gigabit (1 Gbps), 10GbE, 25/40/100/400 GbE.

~~~text
Switch# show mac address-table
          Mac Address Table
Vlan    Mac Address       Type        Ports
   1    0060.2f3a.07bc    DYNAMIC     Fa0/1
   1    0001.6458.2a11    DYNAMIC     Fa0/2
~~~`,
      clave: ['MAC de 48 bits; OUI = fabricante', 'Switch aprende MAC origen y reenvía por MAC destino', 'Inundación de desconocidos y broadcast', 'Store-and-forward vs cut-through'],
      pr: { p: 'En Packet Tracer conecta 3 PCs a un switch. Antes de hacer ping, revisa show mac address-table (vacía). Haz ping de PC1 a PC3 y vuelve a revisarla. Explica qué aprendió el switch y por qué.', r: 'Aparecen las MAC de PC1 y PC3 (por el ARP y el ping de ida y vuelta). PC2 no aparece hasta que envíe algo, porque el switch aprende solo de la MAC origen de tramas que recibe.' },
      q: [
        ['¿Cuántos bits tiene una dirección MAC?', ['32', '48', '64', '128'], 1, '12 dígitos hexadecimales.'],
        ['Un switch aprende a partir de…', ['La MAC destino', 'La MAC origen', 'La IP destino', 'El puerto TCP'], 1, 'Registra quién envía y por qué puerto.'],
        ['¿Qué hace el switch con una trama cuyo destino no está en su tabla?', ['La descarta', 'La inunda por todos los puertos menos el de entrada', 'La envía al router', 'La regresa'], 1, 'Inundación de unicast desconocido.']
      ],
      c: [['OUI', 'Primeros 24 bits de la MAC; identifican al fabricante.'], ['Store-and-forward', 'El switch recibe toda la trama y verifica el FCS antes de reenviar.'], ['MAC broadcast', 'FF-FF-FF-FF-FF-FF.']] }
  ]},

  { n: 5, titulo: 'Capa de red', temas: [
    { id: '5.1', t: 'Sistemas de numeración binaria y hexadecimal',
      md: `Las direcciones IP y MAC se entienden en binario y hexadecimal. Es la base del subnetting.

### Binario → decimal
Cada posición de un octeto vale una potencia de 2:

| 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|---|---|---|---|---|---|---|---|
| 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |

11000000 = 128 + 64 = **192**

### Decimal → binario (método de restas)
Para 172: ¿cabe 128? sí (quedan 44) → 1. ¿64? no → 0. ¿32? sí (quedan 12) → 1. ¿16? no → 0. ¿8? sí (quedan 4) → 1. ¿4? sí (0) → 1. 2 y 1 → 0.
**172 = 10101100**

### Valores que debes memorizar (máscaras)
| Binario | Decimal |
|---|---|
| 10000000 | 128 |
| 11000000 | 192 |
| 11100000 | 224 |
| 11110000 | 240 |
| 11111000 | 248 |
| 11111100 | 252 |
| 11111110 | 254 |
| 11111111 | 255 |

### Hexadecimal
Base 16: 0-9 y A=10, B=11, C=12, D=13, E=14, F=15. **Cada dígito hex = 4 bits** (un *nibble*).
- 1010 1100 = A C → **0xAC** = 172
- Un octeto (8 bits) = 2 dígitos hex. Por eso una MAC de 48 bits tiene 12 dígitos y un grupo de IPv6 de 16 bits tiene 4.

> Practica en el juego **Binario Blaster** hasta hacerlo sin pensar.`,
      clave: ['Pesos 128-64-32-16-8-4-2-1', 'Método de restas', 'Valores de máscara 128…255', '1 dígito hex = 4 bits'],
      pr: { p: 'Convierte: (a) 10.1.200.3 a binario. (b) 11111111.11111111.11110000.00000000 a decimal. (c) 0xC8 a decimal y a binario.', r: '(a) 00001010.00000001.11001000.00000011. (b) 255.255.240.0. (c) 0xC8 = 12·16 + 8 = 200 = 11001000.' },
      q: [
        ['11100000 en decimal es…', ['192', '224', '240', '248'], 1, '128+64+32.'],
        ['¿Cuántos bits representa un dígito hexadecimal?', ['2', '4', '8', '16'], 1, 'Un nibble.'],
        ['0xFF en decimal es…', ['15', '255', '256', '1111'], 1, '15·16 + 15.']
      ],
      c: [['Pesos de un octeto', '128 64 32 16 8 4 2 1'], ['11111100', '252'], ['0xA0', '160 = 10100000']] },

    { id: '5.2', t: 'Resolución de direcciones: MAC, IP y ARP',
      md: `Un host conoce la **IP** del destino, pero para armar la trama necesita su **MAC**. **ARP** (Address Resolution Protocol) resuelve IPv4 → MAC.

### Dos direcciones, dos trabajos
- **IP (capa 3)**: lógica, jerárquica, extremo a extremo. Como la dirección postal.
- **MAC (capa 2)**: física, plana, solo dentro del enlace local. Como el nombre en el buzón.

### Funcionamiento de ARP
1. PC1 quiere enviar a 192.168.1.20 (misma red).
2. Revisa su **tabla ARP** (caché). Si no tiene la MAC…
3. Envía una **solicitud ARP** en **broadcast** (MAC destino FF-FF-FF-FF-FF-FF): "¿Quién tiene 192.168.1.20? Responda a 192.168.1.10".
4. Solo el dueño de esa IP responde con una **respuesta ARP unicast** con su MAC.
5. PC1 guarda la entrada en su caché (expira tras unos minutos).

Si el destino está en **otra red**, la PC hace ARP de la IP de su **gateway predeterminado**, no del destino final.

### Comandos
~~~text
Windows:  arp -a
Linux:    ip neigh
Cisco:    show ip arp
~~~

### Problemas
- **Exceso de broadcasts** en redes muy grandes.
- **Envenenamiento ARP (ARP spoofing)**: un atacante responde con su MAC para interceptar el tráfico (ataque de intermediario). Defensa: DAI (Dynamic ARP Inspection) en switches.

### En IPv6
ARP no existe. Se usa **ND (Neighbor Discovery)** con mensajes ICMPv6 **NS** (Neighbor Solicitation) y **NA** (Neighbor Advertisement), enviados a multicast en vez de broadcast.`,
      clave: ['IP lógica vs MAC física', 'ARP: solicitud broadcast, respuesta unicast', 'ARP al gateway si el destino es remoto', 'IPv6 usa ND (NS/NA)'],
      pr: { p: 'En Packet Tracer, modo Simulación, filtra solo ARP e ICMP. Haz ping de una PC a otra en la misma red y luego a una en otra red. Observa a quién se dirige el ARP en cada caso.', r: 'Misma red: el ARP pregunta por la IP del otro host. Otra red: el ARP pregunta por la IP del gateway (la interfaz del router).' },
      q: [
        ['La solicitud ARP se envía como…', ['Unicast', 'Broadcast', 'Multicast', 'Anycast'], 1, 'Se pregunta a todos en la red local.'],
        ['Si el destino está en otra red, el host hace ARP de…', ['La IP destino', 'Su gateway predeterminado', 'El DNS', 'Nadie'], 1, 'La trama va primero al router.'],
        ['En IPv6, ARP se reemplaza por…', ['DHCPv6', 'Neighbor Discovery', 'ICMPv4', 'RARP'], 1, 'Mensajes NS y NA de ICMPv6.']
      ],
      c: [['ARP', 'Protocolo que obtiene la MAC a partir de una IPv4 conocida.'], ['ARP spoofing', 'Respuestas ARP falsas para desviar tráfico al atacante.'], ['Neighbor Discovery', 'Equivalente de ARP en IPv6 (mensajes NS/NA).']] },

    { id: '5.3', t: 'Paquetes IPv4 e IPv6',
      md: `### Características de IP
- **Sin conexión**: no establece sesión antes de enviar.
- **Máximo esfuerzo (best effort)**: no garantiza la entrega; eso lo hace TCP si se necesita.
- **Independiente del medio**: funciona sobre cobre, fibra o radio.

### Encabezado IPv4 (20 bytes mínimo)
| Campo | Qué hace |
|---|---|
| Versión | 4 |
| Longitud del encabezado (IHL) | Tamaño del encabezado |
| DS (DSCP/ECN) | Prioridad para QoS |
| Longitud total | Paquete completo |
| Identificación, indicadores, desplazamiento | **Fragmentación** |
| **TTL** | Tiempo de vida: cada router le resta 1; en 0 se descarta (evita bucles) |
| **Protocolo** | Qué lleva: 1 = ICMP, 6 = TCP, 17 = UDP |
| Suma de comprobación del encabezado | Detecta errores en el encabezado |
| **IP origen** y **IP destino** | 32 bits cada una |

### Limitaciones de IPv4
Agotamiento de direcciones (2³² ≈ 4 300 millones), dependencia de **NAT**, encabezado complejo.

### Encabezado IPv6 (40 bytes fijos, más simple)
| Campo | Qué hace |
|---|---|
| Versión | 6 |
| Clase de tráfico | QoS |
| Etiqueta de flujo | Identifica flujos para trato uniforme |
| Longitud de carga útil | Datos |
| **Siguiente encabezado** | Equivale a "Protocolo" |
| **Límite de saltos** | Equivale al TTL |
| IP origen y destino | **128 bits** cada una |

IPv6 **elimina** la suma de comprobación y la fragmentación en los routers (solo el origen fragmenta). Espacio de direcciones: 2¹²⁸ ≈ 3.4 × 10³⁸.`,
      clave: ['IP: sin conexión, best effort', 'TTL y campo Protocolo', 'IPv4 20 B vs IPv6 40 B fijos', 'Límite de saltos = TTL; Siguiente encabezado = Protocolo'],
      pr: { p: 'Ejecuta traceroute (Linux) o tracert (Windows) a google.com. ¿Qué campo de IP aprovecha esta herramienta? ¿Cómo?', r: 'El TTL. Envía paquetes con TTL = 1, 2, 3…; cada router que lo deja en 0 responde con ICMP "Tiempo excedido", y así se descubre cada salto.' },
      q: [
        ['¿Qué pasa cuando el TTL llega a 0?', ['Se reenvía más rápido', 'El router descarta el paquete', 'Se convierte en IPv6', 'Se fragmenta'], 1, 'Y suele enviar un ICMP de tiempo excedido.'],
        ['El campo Protocolo con valor 6 indica…', ['ICMP', 'TCP', 'UDP', 'ARP'], 1, '6 = TCP, 17 = UDP, 1 = ICMP.'],
        ['Tamaño de una dirección IPv6:', ['32 bits', '48 bits', '64 bits', '128 bits'], 3, '128 bits.']
      ],
      c: [['TTL', 'Time To Live: contador que cada router reduce en 1; evita bucles infinitos.'], ['Best effort', 'IP entrega sin garantías; la confiabilidad la dan capas superiores.'], ['Límite de saltos', 'Campo de IPv6 equivalente al TTL.']] },

    { id: '5.4', t: 'Direccionamiento IPv4', sub: ['5.4.1 CIDR y VLSM'],
      md: `Una IPv4 tiene **32 bits** en 4 octetos. La **máscara** indica qué parte es **red** (bits en 1) y qué parte es **host** (bits en 0).

### Datos de una subred
Para 192.168.10.77/26:
- Máscara /26 = 255.255.255.**192** → bloque = 256 − 192 = **64**
- Subredes del último octeto: 0, 64, 128, 192 → 77 cae en la de **64**
- **Red**: 192.168.10.64
- **Primer host**: .65
- **Último host**: .126
- **Broadcast**: .127
- **Hosts útiles**: 2⁶ − 2 = **62**

> Fórmulas: hosts útiles = 2^h − 2 (h = bits de host). Subredes = 2^s (s = bits prestados).

### Direcciones privadas (RFC 1918)
10.0.0.0/8, 172.16.0.0/12 (172.16 – 172.31), 192.168.0.0/16. No se enrutan en Internet; salen con **NAT**.

### Especiales
127.0.0.0/8 loopback · 169.254.0.0/16 APIPA (link-local; aparece si no hubo DHCP) · 0.0.0.0 · 255.255.255.255 broadcast limitado.

### Clases (históricas)
A: 1-126 (/8) · B: 128-191 (/16) · C: 192-223 (/24) · D: 224-239 (multicast) · E: 240-255 (experimental).

### CIDR
Classless Inter-Domain Routing: se olvida de las clases y usa **prefijos** de cualquier longitud (/20, /27…). Permite **sumarizar** rutas: 192.168.0.0/24 a 192.168.3.0/24 se resumen como 192.168.0.0/22.

### VLSM (máscaras de longitud variable)
Asigna a cada subred **solo el tamaño que necesita**. Procedimiento:
1. Ordena las redes de **mayor a menor** número de hosts.
2. A cada una dale la máscara más pequeña que alcance (hosts + 2 ≤ 2^h).
3. Asigna los bloques de forma consecutiva.

Ejemplo con 192.168.1.0/24 y necesidades 100, 50, 20 hosts y 2 enlaces WAN:
| Red | Hosts | Prefijo | Rango |
|---|---|---|---|
| A | 100 | /25 (126) | 192.168.1.0 – .127 |
| B | 50 | /26 (62) | .128 – .191 |
| C | 20 | /27 (30) | .192 – .223 |
| WAN1 | 2 | /30 (2) | .224 – .227 |
| WAN2 | 2 | /30 (2) | .228 – .231 |`,
      clave: ['Red, primer host, último, broadcast', 'Hosts = 2^h − 2; bloque = 256 − máscara', 'Privadas RFC 1918', 'CIDR, sumarización y VLSM'],
      pr: { p: 'Calcula red, broadcast, rango y hosts de 172.16.45.200/21. Luego diseña VLSM para 10.10.0.0/24 con redes de 60, 28, 12 hosts y un enlace punto a punto.', r: '/21 → máscara 255.255.248.0, bloque 8 en el 3er octeto: 45 cae en 40–47. Red 172.16.40.0, broadcast 172.16.47.255, hosts .40.1 – .47.254, 2046 hosts. VLSM: 60 → /26 10.10.0.0-63; 28 → /27 .64-95; 12 → /28 .96-111; P2P → /30 .112-115.' },
      q: [
        ['Hosts útiles en una /27:', ['30', '32', '62', '14'], 0, '2⁵ − 2 = 30.'],
        ['¿Cuál es la red de 192.168.5.130/26?', ['192.168.5.0', '192.168.5.128', '192.168.5.64', '192.168.5.192'], 1, 'Bloques de 64: 128 – 191.'],
        ['¿Cuál NO es una dirección privada?', ['10.5.5.5', '172.20.1.1', '192.168.100.1', '172.32.1.1'], 3, '172.16–172.31 es el rango privado.']
      ],
      c: [['/26', '255.255.255.192 → bloques de 64, 62 hosts.'], ['/30', '255.255.255.252 → 2 hosts; para enlaces punto a punto.'], ['VLSM', 'Subredes de distinto tamaño dentro de la misma red, de mayor a menor.'], ['169.254.x.x', 'APIPA: el host no obtuvo IP por DHCP.']] },

    { id: '5.5', t: 'Direccionamiento IPv6',
      md: `### Formato
128 bits en **8 grupos (hextetos)** de 4 dígitos hexadecimales:
2001:0DB8:0000:1111:0000:0000:0000:0200

### Reglas para abreviar
1. **Omitir ceros a la izquierda** en cada hexteto: 0DB8 → DB8, 0200 → 200.
2. **Doble dos puntos (::)** reemplaza **una sola** secuencia continua de hextetos en cero (solo una vez por dirección).

2001:DB8:0:1111::200

### Tipos de direcciones
| Tipo | Prefijo | Uso |
|---|---|---|
| **Unicast global (GUA)** | 2000::/3 (empiezan con 2 o 3) | Enrutables en Internet |
| **Link-local (LLA)** | **FE80::/10** | Solo en el enlace local; todos los hosts IPv6 tienen una; el gateway se suele indicar con ella |
| **Local única** | FC00::/7 | Privadas (como RFC 1918) |
| **Multicast** | **FF00::/8** | FF02::1 todos los nodos; FF02::2 todos los routers |
| Loopback | ::1 | |
| No especificada | :: | |

IPv6 **no tiene broadcast**: usa multicast.

### Estructura de una GUA
**Prefijo de enrutamiento global** (asignado por el ISP, típicamente /48) + **ID de subred** (16 bits si el sitio es /48) + **ID de interfaz** (64 bits). Las LAN usan casi siempre **/64**.

### Cómo obtiene IP un host
- **Estática**.
- **SLAAC**: el router anuncia el prefijo (mensaje RA) y el host genera su ID de interfaz (con **EUI-64** a partir de su MAC, o aleatorio).
- **DHCPv6** con estado o sin estado.

### Configuración en Cisco
~~~text
R1(config)# ipv6 unicast-routing
R1(config)# interface g0/0
R1(config-if)# ipv6 address 2001:db8:acad:1::1/64
R1(config-if)# ipv6 address fe80::1 link-local
~~~`,
      clave: ['8 hextetos, 128 bits', 'Abreviar: ceros a la izquierda y :: una vez', 'GUA 2000::/3, LLA FE80::/10, multicast FF00::/8', 'Sin broadcast; LAN /64; SLAAC'],
      pr: { p: 'Abrevia al máximo: (a) 2001:0DB8:0000:0000:0000:00A0:0000:0001 (b) FE80:0000:0000:0000:0123:0000:0000:0001. Luego expande 2001:DB8::1.', r: '(a) 2001:DB8::A0:0:1. (b) FE80::123:0:0:1. Expandida: 2001:0DB8:0000:0000:0000:0000:0000:0001.' },
      q: [
        ['¿Cuántas veces se puede usar :: en una dirección?', ['Ilimitadas', 'Una', 'Dos', 'Ninguna'], 1, 'Si se usa dos veces sería ambiguo.'],
        ['Las direcciones link-local IPv6 empiezan con…', ['2001', 'FE80', 'FF02', 'FC00'], 1, 'FE80::/10.'],
        ['IPv6 reemplaza el broadcast con…', ['Unicast', 'Multicast', 'ARP', 'Nada'], 1, 'Por ejemplo FF02::1.']
      ],
      c: [['FE80::/10', 'Link-local: válida solo en el enlace.'], ['FF02::1', 'Multicast de todos los nodos IPv6 del enlace.'], ['SLAAC', 'Autoconfiguración sin estado: el host arma su IP con el prefijo que anuncia el router.']] },

    { id: '5.6', t: 'ICMP',
      md: `**ICMP** (Internet Control Message Protocol) envía mensajes de **control y error** sobre el procesamiento de paquetes IP. No hace que IP sea confiable: solo informa.

### Mensajes comunes (ICMPv4)
| Tipo | Mensaje | Lo usa |
|---|---|---|
| 8 | **Echo request** | ping |
| 0 | **Echo reply** | ping |
| 3 | **Destino inalcanzable** (red, host, puerto) | Router o host destino |
| 11 | **Tiempo excedido** (TTL = 0) | traceroute |
| 5 | Redirección | Router |

### ICMPv6 hace más
Además de lo anterior incluye **Neighbor Discovery**:
- **RS** (Router Solicitation) / **RA** (Router Advertisement): descubrir routers y prefijos (SLAAC).
- **NS** (Neighbor Solicitation) / **NA** (Neighbor Advertisement): resolver direcciones (reemplaza a ARP) y detectar duplicados (DAD).

### Herramientas
**ping**: prueba alcance y mide el tiempo de ida y vuelta.
~~~text
ping 127.0.0.1        ¿funciona TCP/IP en mi equipo?
ping 192.168.1.1      ¿llego a mi gateway?
ping 8.8.8.8          ¿llego a Internet?
ping google.com       ¿funciona el DNS?
~~~

**traceroute / tracert**: muestra cada salto hasta el destino usando TTL creciente y los mensajes "tiempo excedido".

Símbolos de ping en Cisco: **!** respuesta recibida · **.** tiempo agotado · **U** destino inalcanzable.

> El primer ping en Packet Tracer suele fallar uno o dos paquetes porque se está resolviendo ARP.`,
      clave: ['Mensajes de control y error', 'Echo request/reply (ping)', 'Tiempo excedido (traceroute)', 'ICMPv6: RS/RA y NS/NA'],
      pr: { p: 'Escribe la secuencia de 4 pings que harías para diagnosticar "no tengo internet" y qué concluyes si falla cada uno.', r: 'ping 127.0.0.1 falla → problema de pila TCP/IP local. ping al gateway falla → problema LAN (cable, IP, máscara, switch). ping 8.8.8.8 falla → problema en el router o ISP. ping google.com falla pero 8.8.8.8 funciona → problema de DNS.' },
      q: [
        ['ping usa los mensajes ICMP…', ['Tiempo excedido', 'Echo request y echo reply', 'Redirección', 'RA'], 1, 'Tipos 8 y 0.'],
        ['traceroute aprovecha los mensajes…', ['Echo reply', 'Tiempo excedido', 'RA', 'NS'], 1, 'Cada router responde cuando el TTL llega a 0.'],
        ['En la salida de ping de Cisco, "." significa…', ['Éxito', 'Tiempo de espera agotado', 'Destino inalcanzable', 'Error de sintaxis'], 1, '! = éxito, . = timeout, U = inalcanzable.']
      ],
      c: [['ICMP tipo 11', 'Tiempo excedido (TTL llegó a 0).'], ['RA', 'Router Advertisement (ICMPv6): el router anuncia prefijo y gateway.']] }
  ]},

  { n: 6, titulo: 'Capa de transporte', temas: [
    { id: '6.1', t: 'Transporte de datos',
      md: `La capa de transporte lleva los datos **de una aplicación a otra** entre hosts (comunicación lógica extremo a extremo).

### Responsabilidades
- **Seguimiento de conversaciones** individuales entre aplicaciones.
- **Segmentación** de los datos y **reensamblado** en el destino.
- **Identificación de aplicaciones** mediante **números de puerto**.
- **Multiplexación**: varias conversaciones intercaladas en la misma red.

### Dos protocolos
| | **TCP** | **UDP** |
|---|---|---|
| Conexión | Orientado a conexión (handshake) | Sin conexión |
| Confiabilidad | Acuse de recibo, retransmisión | No garantiza entrega |
| Orden | Entrega en orden | Puede llegar en desorden |
| Control de flujo | Sí (ventana) | No |
| Encabezado | 20 bytes | **8 bytes** |
| Velocidad | Más sobrecarga | Rápido, ligero |
| Usos | Web, correo, transferencia de archivos, SSH | Voz y video en vivo, DNS, DHCP, juegos, streaming en vivo |

### ¿Cuál elegir?
- Si **cada byte importa** (un archivo, una página) → **TCP**.
- Si **la rapidez importa más** que perder algo (una llamada: mejor perder un fragmento que oír con retraso) → **UDP**.

> La aplicación también puede agregar su propia confiabilidad sobre UDP. Así lo hace **QUIC**, la base de HTTP/3.`,
      clave: ['Comunicación entre aplicaciones', 'Segmentación y multiplexación', 'TCP confiable vs UDP rápido', 'Encabezado TCP 20 B, UDP 8 B'],
      pr: { p: 'Decide TCP o UDP y justifica: descargar un PDF, una videollamada de Meet, una consulta DNS, enviar un correo, un juego en línea de disparos.', r: 'PDF: TCP. Videollamada: UDP. DNS: UDP (TCP si la respuesta es grande). Correo: TCP. Juego de disparos: UDP (importa la latencia).' },
      q: [
        ['¿Qué protocolo es orientado a conexión?', ['UDP', 'TCP', 'IP', 'ICMP'], 1, 'Usa el saludo de tres vías.'],
        ['Tamaño del encabezado UDP:', ['8 bytes', '20 bytes', '40 bytes', '64 bytes'], 0, 'Solo puertos, longitud y checksum.'],
        ['Una llamada VoIP normalmente usa…', ['TCP', 'UDP', 'ARP', 'FTP'], 1, 'Prefiere baja latencia a retransmisiones.']
      ],
      c: [['Multiplexación', 'Intercalar segmentos de varias conversaciones en la misma red.'], ['UDP', 'Protocolo de transporte sin conexión, rápido y con encabezado de 8 bytes.']] },

    { id: '6.2', t: 'TCP: descripción general y operación',
      md: `### Funciones de TCP
Establecer sesión, entrega confiable (acuses de recibo y retransmisión), entrega en el mismo orden (números de secuencia) y control de flujo.

### Encabezado TCP (campos clave)
Puerto origen · Puerto destino · **Número de secuencia** · **Número de acuse (ACK)** · Longitud · **Bits de control** (URG, **ACK**, PSH, **RST**, **SYN**, **FIN**) · **Ventana** · Checksum · Urgente.

### Establecimiento: saludo de tres vías (3-way handshake)
~~~text
Cliente                          Servidor
   | ---- SYN (seq=100) ---------->  |
   | <--- SYN, ACK (seq=300, ack=101)|
   | ---- ACK (ack=301) ---------->  |
       conexión establecida
~~~

### Cierre: cuatro pasos
1. El cliente envía **FIN**.
2. El servidor responde **ACK**.
3. El servidor envía su **FIN**.
4. El cliente responde **ACK**.

**RST** aborta una conexión de golpe (por ejemplo, si el puerto está cerrado).

### Confiabilidad
- Cada byte se numera. El receptor responde con el **ACK** del **siguiente byte que espera**.
- Si el emisor no recibe ACK a tiempo, **retransmite**.
- El receptor **reordena** segmentos que llegan en desorden usando los números de secuencia.

### Ver conexiones
~~~text
netstat -an        (Windows / Linux)
ss -tan            (Linux moderno)
~~~
Estados comunes: LISTEN, SYN-SENT, ESTABLISHED, TIME-WAIT, CLOSE-WAIT.`,
      clave: ['Handshake: SYN → SYN-ACK → ACK', 'Cierre: FIN, ACK, FIN, ACK', 'Números de secuencia y ACK', 'RST aborta'],
      pr: { p: 'Un cliente envía SYN con seq = 5000. El servidor responde con seq = 9000. Escribe los valores seq y ack de los tres mensajes del handshake.', r: '1) SYN, seq=5000. 2) SYN+ACK, seq=9000, ack=5001. 3) ACK, seq=5001, ack=9001.' },
      q: [
        ['El primer mensaje del handshake TCP es…', ['ACK', 'SYN', 'FIN', 'RST'], 1, 'El cliente pide sincronizar.'],
        ['¿Cuántos mensajes se usan normalmente para cerrar una conexión TCP?', ['2', '3', '4', '1'], 2, 'FIN y ACK en cada sentido.'],
        ['El número de ACK indica…', ['El último byte recibido', 'El siguiente byte que se espera', 'El puerto', 'El tamaño de ventana'], 1, 'ACK = siguiente byte esperado.']
      ],
      c: [['3-way handshake', 'SYN → SYN+ACK → ACK.'], ['RST', 'Bit de control que reinicia o aborta una conexión TCP.'], ['Número de secuencia', 'Identifica la posición de los bytes para ordenar y confirmar.']] },

    { id: '6.3', t: 'UDP: descripción general y operación',
      md: `**UDP** (User Datagram Protocol) es un protocolo de **máximo esfuerzo**:
- Sin conexión: no hay handshake.
- Sin acuses de recibo ni retransmisiones.
- Sin control de flujo.
- No reordena: los **datagramas** pueden llegar en cualquier orden.

### Encabezado (8 bytes)
| Campo | Bytes |
|---|---|
| Puerto origen | 2 |
| Puerto destino | 2 |
| Longitud | 2 |
| Checksum | 2 |

### ¿Por qué usar algo "no confiable"?
- **Menos latencia**: no espera handshake ni ACKs.
- **Menos sobrecarga**: encabezado pequeño.
- **Tiempo real**: en voz y video, un dato que llega tarde ya no sirve.
- **Consultas de un solo mensaje**: DNS pregunta y recibe en un solo intercambio; si falla, la aplicación vuelve a preguntar.
- Permite **multicast y broadcast** (TCP no).

### Aplicaciones típicas
DNS (53), DHCP (67/68), TFTP (69), SNMP (161), NTP (123), VoIP (RTP), video en vivo, juegos en línea, QUIC/HTTP3 (443/UDP).

### Servidor y cliente UDP
El servidor escucha en un puerto conocido. El cliente elige un **puerto dinámico** aleatorio como origen. La respuesta invierte los puertos.`,
      clave: ['Sin conexión, sin ACK, sin orden', 'Encabezado de 8 bytes', 'Baja latencia: tiempo real', 'DNS, DHCP, TFTP, SNMP, VoIP'],
      pr: { p: 'Explica por qué TFTP (que usa UDP) necesita implementar sus propios acuses de recibo, y por qué DHCP no podría usar TCP al inicio.', r: 'TFTP transfiere archivos, así que necesita confiabilidad; como UDP no la da, la agrega a nivel de aplicación (bloques numerados y ACK). DHCP no puede usar TCP al inicio porque el cliente aún no tiene IP y debe enviar en broadcast, y TCP no admite broadcast.' },
      q: [
        ['¿Qué servicio usa UDP puerto 53?', ['HTTP', 'DNS', 'SSH', 'SMTP'], 1, 'DNS usa UDP 53 (y TCP 53 para respuestas grandes).'],
        ['UDP NO ofrece…', ['Puertos', 'Checksum', 'Retransmisión', 'Longitud'], 2, 'No retransmite.'],
        ['¿Por qué el video en vivo prefiere UDP?', ['Porque cifra', 'Porque un dato que llega tarde ya no sirve', 'Porque usa menos puertos', 'Porque es obligatorio'], 1, 'Retransmitir agrega retardo.']
      ],
      c: [['Datagrama', 'PDU de UDP.'], ['DHCP', 'Usa UDP 67 (servidor) y 68 (cliente).']] },

    { id: '6.4', t: 'Números de puerto',
      md: `Los **puertos** identifican la **aplicación** dentro de un host. Son números de **16 bits** (0 – 65 535).

### Rangos (IANA)
| Rango | Nombre | Uso |
|---|---|---|
| 0 – 1023 | **Bien conocidos** | Servicios estándar |
| 1024 – 49151 | **Registrados** | Aplicaciones específicas |
| 49152 – 65535 | **Dinámicos / privados** | Puertos de origen temporales de los clientes |

### Socket
**Socket = IP + puerto**. Un par de sockets identifica una conversación única:
192.168.1.5:**50123** ↔ 142.250.0.1:**443**

### Puertos que debes saber
| Puerto | Protocolo | Transporte |
|---|---|---|
| 20, 21 | FTP (datos, control) | TCP |
| 22 | SSH | TCP |
| 23 | Telnet | TCP |
| 25 | SMTP | TCP |
| 53 | DNS | UDP/TCP |
| 67, 68 | DHCP | UDP |
| 69 | TFTP | UDP |
| 80 | HTTP | TCP |
| 110 | POP3 | TCP |
| 143 | IMAP | TCP |
| 161 | SNMP | UDP |
| 443 | HTTPS | TCP (y UDP para HTTP/3) |
| 3389 | RDP (escritorio remoto) | TCP |

> Practica en el juego **Clasificar** con el set "Puerto → protocolo".`,
      clave: ['Puerto: 16 bits, identifica la aplicación', 'Bien conocidos 0-1023, registrados, dinámicos', 'Socket = IP + puerto', 'Puertos comunes'],
      pr: { p: 'Tu PC abre dos pestañas a la misma página HTTPS. ¿Cómo sabe tu PC a qué pestaña pertenece cada respuesta si la IP y el puerto del servidor son iguales?', r: 'Cada pestaña usa un puerto origen dinámico distinto (por ejemplo 50123 y 50124). El par de sockets completo es diferente, así que las respuestas se separan por el puerto destino de la respuesta.' },
      q: [
        ['¿Qué puerto usa SSH?', ['21', '22', '23', '25'], 1, 'SSH = 22, Telnet = 23.'],
        ['HTTPS usa el puerto…', ['80', '8080', '443', '445'], 2, '443.'],
        ['Un socket se forma con…', ['MAC + IP', 'IP + puerto', 'Puerto + protocolo', 'MAC + puerto'], 1, 'Identifica un extremo de la conversación.']
      ],
      c: [['Puertos bien conocidos', '0 a 1023.'], ['Socket', 'Combinación de IP y número de puerto.'], ['SMTP / POP3 / IMAP', '25 / 110 / 143.']] },

    { id: '6.5', t: 'Control de flujo',
      md: `El **control de flujo** evita que un emisor rápido **sature** a un receptor lento.

### Ventana deslizante (TCP)
- El receptor anuncia en cada segmento el **tamaño de ventana**: cuántos bytes puede recibir sin confirmar.
- El emisor puede enviar hasta ese tamaño **sin esperar ACK**.
- Conforme llegan ACKs, la ventana "se desliza" y permite enviar más.
- Si el búfer del receptor se llena, anuncia una ventana más pequeña o incluso **0** (pausa).

Ejemplo: ventana de 10 000 bytes y segmentos de 1 000 → el emisor puede mandar 10 segmentos seguidos antes de necesitar un ACK.

### MSS
**Maximum Segment Size**: la mayor cantidad de datos en un segmento TCP. En Ethernet suele ser **1460 bytes** (1500 MTU − 20 IP − 20 TCP). Se negocia en el handshake.

### Control de congestión (diferente al de flujo)
- **Flujo**: protege al **receptor**.
- **Congestión**: protege a la **red**.
Cuando TCP detecta pérdidas (síntoma de congestión), **reduce** su ritmo de envío y luego lo aumenta poco a poco (*slow start*, *congestion avoidance*).

### ACK acumulativo y retransmisión
Si llegan los bytes 1–3000 y faltan 3001–4000, el receptor sigue pidiendo ACK = 3001. Con **SACK** (acuse selectivo) puede avisar qué bloques posteriores sí llegaron para retransmitir solo lo faltante.`,
      clave: ['Ventana deslizante', 'Ventana anunciada por el receptor', 'MSS = 1460 en Ethernet', 'Flujo (receptor) vs congestión (red)'],
      pr: { p: 'Ventana = 4000 bytes, MSS = 1000. El emisor envía 4 segmentos; el receptor confirma los dos primeros. ¿Cuántos bytes más puede enviar en ese momento?', r: 'Confirmó 2000 bytes, así que la ventana se desliza 2000: puede enviar 2 segmentos más (2000 bytes), manteniendo 4000 bytes sin confirmar.' },
      q: [
        ['¿Quién anuncia el tamaño de ventana en TCP?', ['El emisor', 'El receptor', 'El router', 'El switch'], 1, 'Según el espacio en su búfer.'],
        ['MSS típico en Ethernet:', ['1500', '1460', '1518', '64'], 1, '1500 − 20 − 20.'],
        ['El control de congestión protege principalmente…', ['Al receptor', 'A la red', 'Al DNS', 'Al switch'], 1, 'Reduce el envío ante pérdidas.']
      ],
      c: [['Ventana deslizante', 'Cantidad de bytes que se pueden enviar sin esperar confirmación.'], ['MSS', 'Máximo de datos por segmento TCP (1460 B en Ethernet).']] }
  ]},

  { n: 7, titulo: 'Capa de aplicación', temas: [
    { id: '7.1', t: 'Aplicación, presentación y sesión',
      md: `En TCP/IP estas tres capas OSI se juntan en la **capa de aplicación**, la más cercana al usuario.

### Capa de aplicación (OSI 7)
Proporciona la **interfaz** entre las aplicaciones y la red. Ojo: el navegador no es la capa de aplicación; el **protocolo HTTP** que usa sí.

### Capa de presentación (OSI 6)
- **Formato** de los datos para que el destino los entienda (ASCII, UTF-8).
- **Compresión** (JPEG, PNG, MP3, MPEG).
- **Cifrado** (TLS/SSL se asocia a esta función).

### Capa de sesión (OSI 5)
- **Crea y mantiene diálogos** entre aplicaciones.
- Reinicia sesiones interrumpidas o inactivas.
- Ejemplos: NetBIOS, RPC, PPTP.

### Protocolos de la capa de aplicación TCP/IP
| Categoría | Protocolos |
|---|---|
| Sistema de nombres | DNS |
| Configuración de hosts | DHCP, SLAAC |
| Correo | SMTP, POP3, IMAP |
| Transferencia de archivos | FTP, SFTP, TFTP |
| Web | HTTP, HTTPS |
| Administración remota | SSH, Telnet, SNMP |`,
      clave: ['TCP/IP junta OSI 5, 6, 7', 'Presentación: formato, compresión, cifrado', 'Sesión: diálogos', 'Protocolos por categoría'],
      pr: { p: 'Clasifica cada función en sesión, presentación o aplicación: comprimir una imagen, mantener un diálogo de videollamada, enviar un correo con SMTP, convertir texto a UTF-8, cifrar con TLS.', r: 'Presentación: comprimir imagen, UTF-8, cifrar TLS. Sesión: mantener el diálogo. Aplicación: SMTP.' },
      q: [
        ['¿Qué capa OSI se encarga de la compresión y el cifrado?', ['Sesión', 'Presentación', 'Aplicación', 'Transporte'], 1, 'Capa 6.'],
        ['La capa de aplicación de TCP/IP incluye…', ['OSI 5, 6 y 7', 'Solo OSI 7', 'OSI 4 y 7', 'OSI 1 y 2'], 0, 'Las tres capas superiores.'],
        ['¿Cuál es un protocolo de configuración de hosts?', ['SMTP', 'DHCP', 'FTP', 'HTTP'], 1, 'Asigna IP automáticamente.']
      ],
      c: [['Capa de sesión', 'Crea, mantiene y reinicia diálogos entre aplicaciones.'], ['JPEG / MPEG', 'Formatos de compresión asociados a la capa de presentación.']] },

    { id: '7.2', t: 'Cliente-servidor y redes punto a punto (P2P)',
      md: `### Modelo cliente-servidor
- El **cliente** solicita; el **servidor** responde y almacena los recursos.
- Ejemplo: tu navegador (cliente) pide una página al servidor web.
- Ventajas: control centralizado, seguridad, respaldos.
- Desventaja: el servidor puede saturarse o ser punto único de falla.

### Redes punto a punto (P2P)
- No hay servidor dedicado: **cada equipo puede ser cliente y servidor** a la vez.
- Ejemplo: compartir una carpeta entre dos PCs de una casa.

| Ventajas P2P | Desventajas P2P |
|---|---|
| Fácil de montar | Sin administración centralizada |
| Barata, no requiere servidor | Menos segura |
| Adecuada para redes muy pequeñas | No escala bien |
| | Rendimiento afectado si un equipo hace ambos papeles |

### Aplicaciones P2P
Una **aplicación P2P** permite que un dispositivo actúe como cliente y servidor en la misma comunicación. Algunas son híbridas: usan un índice central para encontrar recursos y después transfieren directamente entre pares.
- **BitTorrent**: los archivos se descargan en pedazos de muchos pares (**seeders** y **peers**) a la vez.
- **Videollamadas** que conectan directamente a los participantes cuando es posible.
- **Blockchain** (redes de criptomonedas).

### Gnutella y BitTorrent
Protocolos P2P clásicos para compartir archivos. Hay que cuidar la legalidad y la seguridad del contenido.`,
      clave: ['Cliente solicita, servidor responde', 'P2P: cada equipo es cliente y servidor', 'Ventajas y desventajas de P2P', 'BitTorrent: piezas de muchos pares'],
      pr: { p: 'Compara para un laboratorio de 25 PCs: ¿red P2P o cliente-servidor? Da 3 razones.', r: 'Cliente-servidor: administración centralizada de usuarios y permisos, respaldos en un solo lugar, mejor seguridad y escalabilidad. P2P solo convendría para 2-5 equipos.' },
      q: [
        ['En una red P2P…', ['Siempre hay un servidor dedicado', 'Cada equipo puede ser cliente y servidor', 'Solo hay clientes', 'Se usa solo en WAN'], 1, 'Roles intercambiables.'],
        ['Desventaja de P2P:', ['Es cara', 'Falta de administración centralizada', 'Necesita servidor', 'No funciona en LAN'], 1, 'Cada equipo se administra por separado.'],
        ['BitTorrent es un ejemplo de…', ['Cliente-servidor puro', 'Aplicación P2P', 'Protocolo de enrutamiento', 'Servicio DHCP'], 1, 'Descarga piezas de muchos pares.']
      ],
      c: [['Cliente-servidor', 'Un servidor central ofrece recursos a clientes que los solicitan.'], ['P2P', 'Red sin servidor dedicado donde cada par comparte y consume recursos.']] },

    { id: '7.3', t: 'Protocolos web y de correo electrónico',
      md: `### Web: HTTP y HTTPS
**URL**: protocolo://servidor/ruta → https://www.unsij.edu.mx/index.html

**HTTP** (puerto 80) es un protocolo de **solicitud/respuesta**. Métodos principales:
| Método | Uso |
|---|---|
| **GET** | Pedir un recurso |
| **POST** | Enviar datos al servidor (formularios) |
| **PUT** | Subir o reemplazar un recurso |
| **DELETE** | Borrar un recurso |

Códigos de estado: **200** OK · **301/302** redirección · **404** no encontrado · **500** error del servidor · 403 prohibido.

**HTTPS** (puerto 443) = HTTP sobre **TLS**: cifra y autentica al servidor con certificados.

### Correo electrónico
| Protocolo | Puerto | Función |
|---|---|---|
| **SMTP** | 25 (587 para clientes) | **Enviar** correo y transferir entre servidores |
| **POP3** | 110 (995 seguro) | **Descargar** el correo al dispositivo y normalmente borrarlo del servidor |
| **IMAP** | 143 (993 seguro) | **Sincronizar**: el correo se queda en el servidor y se ve igual en todos los dispositivos |

### Flujo de un correo
1. Tu cliente envía el mensaje a tu servidor por **SMTP**.
2. Tu servidor consulta el **registro MX** del dominio destino en DNS.
3. Lo entrega por **SMTP** al servidor del destinatario.
4. El destinatario lo lee con **IMAP** o **POP3**.

> Hoy muchos usuarios usan correo web (Gmail): el navegador habla HTTPS con el servidor, y los servidores siguen usando SMTP entre ellos.`,
      clave: ['HTTP 80 / HTTPS 443 (TLS)', 'GET, POST, PUT, DELETE; códigos 200, 404, 500', 'SMTP envía; POP3 descarga; IMAP sincroniza', 'Registro MX'],
      pr: { p: 'En Packet Tracer, agrega un servidor, activa HTTP y edita index.html. Desde una PC abre el navegador web con la IP del servidor. Luego configura el servicio EMAIL y envía un correo entre dos PCs.', r: 'Servidor > Services > HTTP (On). PC > Desktop > Web Browser > http://IP. Para correo: Services > EMAIL, crea usuarios y dominio; en cada PC configura Email con el servidor SMTP/POP3 = IP del servidor.' },
      q: [
        ['¿Qué protocolo se usa para ENVIAR correo?', ['POP3', 'IMAP', 'SMTP', 'HTTP'], 2, 'Simple Mail Transfer Protocol.'],
        ['Si quieres ver tu correo igual en el celular y la laptop, usas…', ['POP3', 'IMAP', 'SMTP', 'FTP'], 1, 'IMAP mantiene el correo en el servidor.'],
        ['El código HTTP 404 significa…', ['Todo bien', 'No encontrado', 'Error del servidor', 'Redirección'], 1, 'Recurso inexistente.']
      ],
      c: [['IMAP', 'Protocolo de correo que sincroniza los mensajes y los deja en el servidor (143/993).'], ['HTTPS', 'HTTP cifrado con TLS, puerto 443.'], ['Registro MX', 'Registro DNS que indica el servidor de correo de un dominio.']] },

    { id: '7.4', t: 'Servicios de direccionamiento IP: DNS y DHCP',
      md: `### DNS (Domain Name System) — puerto 53
Traduce **nombres** (www.unsij.edu.mx) a **direcciones IP**.

**Jerarquía**: raíz (.) → dominios de nivel superior (**TLD**: .com, .mx, .edu) → dominios de segundo nivel (unsij.edu.mx) → hosts (www).

**Registros comunes**
| Registro | Contenido |
|---|---|
| **A** | Nombre → IPv4 |
| **AAAA** | Nombre → IPv6 |
| **NS** | Servidor de nombres autoritativo |
| **MX** | Servidor de correo |
| **CNAME** | Alias de otro nombre |

**Resolución**: el cliente pregunta a su servidor DNS; si no está en caché, ese servidor consulta a la raíz, al TLD y al servidor autoritativo, guarda la respuesta y la devuelve.
~~~text
nslookup www.unsij.edu.mx
ipconfig /displaydns     (ver caché en Windows)
~~~

### DHCP (Dynamic Host Configuration Protocol) — UDP 67/68
Asigna automáticamente **IP, máscara, gateway, DNS** y el tiempo de **arrendamiento** (lease).

**Proceso DORA**
1. **D**iscover: el cliente busca servidores (broadcast).
2. **O**ffer: el servidor ofrece una dirección.
3. **R**equest: el cliente pide formalmente la oferta (broadcast, para avisar a otros servidores).
4. **A**cknowledgment: el servidor confirma.

Si no hay respuesta, Windows se asigna una **APIPA** 169.254.x.x.

**DHCP en un router Cisco**
~~~text
R1(config)# ip dhcp excluded-address 192.168.10.1 192.168.10.10
R1(config)# ip dhcp pool LAB503
R1(dhcp-config)# network 192.168.10.0 255.255.255.0
R1(dhcp-config)# default-router 192.168.10.1
R1(dhcp-config)# dns-server 8.8.8.8
~~~
Si el servidor DHCP está en otra red, se usa **ip helper-address** en la interfaz del router para reenviar los broadcasts (DHCP relay).

En IPv6: **SLAAC** y **DHCPv6**.`,
      clave: ['DNS: nombre → IP; registros A, AAAA, MX, NS, CNAME', 'Jerarquía raíz → TLD → dominio', 'DHCP: DORA', 'Pool DHCP en Cisco y helper-address'],
      pr: { p: 'Configura en Packet Tracer un router como servidor DHCP para la red 192.168.20.0/24, excluyendo las primeras 10 direcciones. Pon 3 PCs en DHCP y verifica con ipconfig.', r: 'Usa los comandos de la lección cambiando la red. Las PCs deben recibir desde 192.168.20.11. Si salen 169.254.x.x, revisa que la interfaz del router esté encendida (no shutdown) y en la misma red.' },
      q: [
        ['¿Qué registro DNS asocia un nombre a una IPv6?', ['A', 'AAAA', 'MX', 'CNAME'], 1, 'Cuatro A para 128 bits.'],
        ['El orden de mensajes DHCP es…', ['Request, Offer, Discover, Ack', 'Discover, Offer, Request, Ack', 'Offer, Discover, Ack, Request', 'Discover, Request, Offer, Ack'], 1, 'DORA.'],
        ['Una PC con IP 169.254.10.5 indica que…', ['Todo funciona', 'No obtuvo respuesta de DHCP', 'Tiene IP pública', 'Es un servidor DNS'], 1, 'APIPA.']
      ],
      c: [['DORA', 'Discover, Offer, Request, Acknowledgment.'], ['ip helper-address', 'Reenvía broadcasts DHCP a un servidor en otra red (relay).'], ['CNAME', 'Registro DNS de alias.']] },

    { id: '7.5', t: 'Servicios de intercambio de archivos',
      md: `### FTP (File Transfer Protocol)
- Usa **TCP** y **dos conexiones**:
  - Puerto **21**: **control** (comandos como USER, PASS, LIST, RETR, STOR).
  - Puerto **20**: **datos** (en modo activo; en modo pasivo el servidor indica otro puerto).
- Transmite usuario y contraseña **sin cifrar**.
- Alternativas seguras: **SFTP** (sobre SSH, puerto 22) y **FTPS** (FTP sobre TLS).

### TFTP (Trivial FTP)
- **UDP 69**, muy simple, sin autenticación.
- Se usa para copiar **IOS y configuraciones** de routers y switches, y para arranque por red (PXE).

### SMB (Server Message Block)
- Protocolo de **compartición de archivos e impresoras** en redes Windows (carpetas compartidas, \\\\servidor\\carpeta).
- Puerto **TCP 445**.
- En Linux se implementa con **Samba**.
- A diferencia de FTP, permite **abrir y editar archivos remotos** como si fueran locales, no solo copiarlos.

### NFS
Equivalente en sistemas Unix/Linux para montar carpetas remotas.

### Comparación
| | FTP | TFTP | SMB |
|---|---|---|---|
| Transporte | TCP 20/21 | UDP 69 | TCP 445 |
| Autenticación | Sí (sin cifrar) | No | Sí |
| Uso típico | Subir archivos a un servidor web | Respaldar IOS/config | Carpetas compartidas en LAN |

~~~text
Router# copy running-config tftp:
Address or name of remote host []? 192.168.1.100
~~~`,
      clave: ['FTP: TCP 21 control y 20 datos', 'TFTP: UDP 69, sin autenticación', 'SMB: TCP 445, compartir en Windows/Samba', 'SFTP/FTPS seguros'],
      pr: { p: 'En Packet Tracer, activa el servicio FTP y TFTP en un servidor. Respalda la configuración de un router con copy running-config tftp: y verifica que aparezca el archivo en el servidor.', r: 'El archivo aparece en Services > TFTP del servidor con nombre como R1-confg. Asegúrate de que el router alcance la IP del servidor (ping).' },
      q: [
        ['¿Qué puerto usa FTP para los comandos de control?', ['20', '21', '22', '69'], 1, '21 control, 20 datos.'],
        ['Para respaldar la configuración de un router se usa comúnmente…', ['SMB', 'TFTP', 'POP3', 'HTTP'], 1, 'copy running-config tftp:'],
        ['El protocolo de carpetas compartidas de Windows es…', ['SMB', 'SNMP', 'SMTP', 'SSH'], 0, 'TCP 445.']
      ],
      c: [['TFTP', 'Transferencia de archivos trivial por UDP 69, sin autenticación.'], ['SMB', 'Compartición de archivos e impresoras en Windows (TCP 445); Samba en Linux.']] }
  ]},

  { n: 8, titulo: 'Diseño de una red LAN', temas: [
    { id: '8.1', t: 'Topología de una red LAN',
      md: `### Diseño jerárquico de tres capas (Cisco)
| Capa | Función | Equipo típico |
|---|---|---|
| **Núcleo (core)** | Transporte rápido entre bloques; alta disponibilidad | Switches multicapa de alto rendimiento |
| **Distribución** | Agrega la capa de acceso; enrutamiento entre VLANs, políticas, ACL | Switches capa 3 |
| **Acceso** | Conecta usuarios finales; PoE, seguridad de puerto | Switches capa 2 |

En redes pequeñas se usa un **núcleo colapsado**: núcleo y distribución en el mismo equipo (dos capas).

### Principios de diseño
- **Jerarquía**: facilita entender, crecer y aislar problemas.
- **Modularidad**: bloques repetibles (un edificio = un módulo).
- **Redundancia**: enlaces y equipos duplicados en núcleo/distribución (usando STP o EtherChannel).
- **Escalabilidad**: crecer sin rediseñar.
- **Seguridad**: segmentación en **VLANs** (alumnos, docentes, administración, invitados, cámaras).

### VLAN en un párrafo
Una VLAN divide un switch en varias redes lógicas: cada VLAN es un **dominio de broadcast** distinto y normalmente una **subred IP** distinta. Para comunicarse entre VLANs hace falta un router o switch capa 3 (**router-on-a-stick** o SVI).

~~~text
Switch(config)# vlan 10
Switch(config-vlan)# name ALUMNOS
Switch(config)# interface fa0/1
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 10
~~~`,
      clave: ['Núcleo, distribución, acceso', 'Núcleo colapsado', 'Jerarquía, modularidad, redundancia, escalabilidad', 'VLAN = dominio de broadcast'],
      pr: { p: 'Diseña en Packet Tracer la red de la UNSIJ (evidencia del parcial 1): un núcleo, distribución por edificio y acceso por laboratorio. Asigna VLANs para alumnos, docentes y administración.', r: 'Ejemplo: VLAN 10 Alumnos 172.16.10.0/24, VLAN 20 Docentes 172.16.20.0/24, VLAN 30 Administración 172.16.30.0/24, VLAN 99 Gestión. Enlaces entre switches en modo trunk.' },
      q: [
        ['¿Qué capa conecta directamente a los usuarios finales?', ['Núcleo', 'Distribución', 'Acceso', 'Aplicación'], 2, 'Switches de acceso.'],
        ['Un núcleo colapsado combina…', ['Acceso y distribución', 'Núcleo y distribución', 'Núcleo y acceso', 'Las tres'], 1, 'Diseño de dos capas.'],
        ['Cada VLAN es un…', ['Dominio de colisión', 'Dominio de broadcast', 'Cable', 'Puerto'], 1, 'Separa el broadcast.']
      ],
      c: [['Capa de distribución', 'Agrega la capa de acceso, aplica políticas y enruta entre VLANs.'], ['VLAN', 'Red lógica dentro de un switch; un dominio de broadcast separado.']] },

    { id: '8.2', t: 'Cableado estructurado',
      md: `El **cableado estructurado** es un sistema de cableado **estandarizado** (TIA/EIA-568, ISO/IEC 11801) que soporta voz, datos y video, y permite cambios sin recablear.

### Subsistemas
| Subsistema | Descripción |
|---|---|
| **Instalaciones de entrada** | Donde llegan los servicios del proveedor al edificio |
| **Cuarto de equipos (MDF)** | Equipos principales: núcleo, servidores, conexión al ISP |
| **Cuarto de telecomunicaciones (IDF)** | Uno por piso o área: switches de acceso y paneles de parcheo |
| **Cableado vertical (backbone)** | Une MDF con IDF; normalmente **fibra** |
| **Cableado horizontal** | Del IDF al área de trabajo: **UTP, máx. 90 m** |
| **Área de trabajo** | Toma de pared (jack RJ-45) + patch cord al equipo (≤ 10 m entre ambos extremos sumados con los del IDF) |

### Elementos del rack
**Panel de parcheo (patch panel)**, **organizadores** horizontales y verticales, switches, **patch cords** cortos, **PDU** (regleta de energía), **UPS**, bandeja para fibra (ODF).

### Buenas prácticas
- **Etiquetar** ambos extremos de cada cable (por ejemplo, P1-IDF2-024).
- Respetar el **radio de curvatura** (no doblar en ángulos cerrados) y no apretar con cinchos.
- Separar cables de datos de cables eléctricos.
- Usar **certificadores** o probadores para verificar cada nodo.
- Documentar con planos y una tabla de puertos.
- Colores por función de los patch cords (por ejemplo, azul datos, amarillo uplinks).

### Herramientas para la práctica de ponchado
Pinzas ponchadoras RJ-45, pelacables, herramienta de impacto (punch down) para el panel y los jacks, probador de continuidad.`,
      clave: ['Estándares TIA/EIA-568, ISO 11801', 'MDF, IDF, backbone, horizontal, área de trabajo', 'Horizontal máx. 90 m', 'Etiquetado y radio de curvatura'],
      pr: { p: 'Para el reporte fotográfico del cableado del laboratorio: identifica en el rack el patch panel, los switches, el organizador y la PDU. Haz una tabla de 10 puertos: número de panel, número de puerto del switch, nodo de la toma y VLAN.', r: 'Ejemplo de fila: Panel P01 → Switch Fa0/1 → Toma LR-01 → VLAN 10. Incluye foto antes y después del peinado.' },
      q: [
        ['Longitud máxima del cableado horizontal UTP:', ['50 m', '90 m', '100 m', '150 m'], 1, '90 m + 10 m de patch cords = 100 m.'],
        ['El cableado que une el MDF con los IDF se llama…', ['Horizontal', 'Vertical o backbone', 'Patch cord', 'Área de trabajo'], 1, 'Normalmente fibra.'],
        ['¿Qué elemento del rack recibe los cables horizontales?', ['UPS', 'Patch panel', 'PDU', 'Router'], 1, 'Desde ahí se parchea al switch.']
      ],
      c: [['MDF', 'Cuarto de distribución principal del edificio o campus.'], ['IDF', 'Cuarto de telecomunicaciones intermedio (por piso o área).'], ['Patch panel', 'Panel donde terminan los cables horizontales para parchearlos al switch.']] },

    { id: '8.3', t: 'Dispositivos y medios de una red LAN',
      md: `### Cómo elegir switches
| Criterio | Pregunta |
|---|---|
| Densidad de puertos | ¿Cuántos usuarios por IDF? (24 o 48 puertos) |
| Velocidad | Fast Ethernet, Gigabit, 10 G en uplinks |
| **PoE** (Power over Ethernet) | ¿Alimentará teléfonos IP, APs o cámaras? |
| Capa 2 o 3 | ¿Necesita enrutar entre VLANs? |
| Administrable | ¿Se configurarán VLANs, seguridad, SNMP? |
| Formato | Fijo, modular o apilable |
| Redundancia | Fuentes dobles, enlaces agregados |

### Routers
Conectan la LAN con otras redes e Internet. Criterios: interfaces (Gigabit, seriales, SFP), rendimiento, **NAT**, VPN, firewall integrado.

### Inalámbrico
**APs** autónomos para pocos puntos; **APs ligeros + controlador (WLC)** para campus con muchos APs y roaming.

### Medios: ¿qué cable va dónde?
| Lugar | Medio |
|---|---|
| Área de trabajo y horizontal | UTP Cat 6 / 6a |
| Entre IDF y MDF dentro de un edificio | Fibra multimodo o UTP si es corto |
| Entre edificios | **Fibra monomodo** (inmune a EMI y a diferencias de tierra eléctrica) |
| Zonas sin cable | Enlaces inalámbricos punto a punto |

### Seguridad física y energía
Racks con llave, cuartos ventilados, **UPS** para que la red siga funcionando ante cortes (frecuentes en la sierra), tierra física.`,
      clave: ['Criterios: puertos, velocidad, PoE, capa 2/3', 'Routers: NAT, VPN, interfaces', 'APs autónomos vs controlador', 'Fibra entre edificios; UTP en horizontal'],
      pr: { p: 'Un laboratorio tiene 30 PCs, 2 APs y 1 cámara IP. Elige el switch de acceso (puertos, PoE, velocidad) y justifica.', r: 'Un switch de 48 puertos Gigabit (30 PCs + 2 APs + cámara + crecimiento) con PoE+ al menos en algunos puertos para APs y cámara, administrable para VLANs, con 2 uplinks SFP de 10 G o Gigabit hacia distribución.' },
      q: [
        ['¿Qué permite alimentar un AP por el mismo cable de red?', ['VLAN', 'PoE', 'NAT', 'STP'], 1, 'Power over Ethernet.'],
        ['Medio recomendado entre edificios:', ['UTP Cat 5e', 'Fibra monomodo', 'Coaxial', 'Bluetooth'], 1, 'Distancia e inmunidad eléctrica.'],
        ['Un switch que enruta entre VLANs es…', ['Capa 2', 'Capa 3 (multicapa)', 'Hub', 'Repetidor'], 1, 'Switch multicapa.']
      ],
      c: [['PoE', 'Power over Ethernet: energía y datos por el mismo cable UTP.'], ['WLC', 'Controlador de LAN inalámbrica que administra muchos APs ligeros.']] },

    { id: '8.4', t: 'Fases de diseño e implementación de una red LAN',
      md: `Un ciclo clásico es **PPDIOO** (Cisco): Preparar, Planear, Diseñar, Implementar, Operar, Optimizar. Para tu proyecto puedes usar estas fases:

### 1. Análisis de requerimientos
- ¿Cuántos usuarios y dispositivos? ¿Crecimiento esperado?
- ¿Qué aplicaciones (video, VoIP, sistemas escolares)?
- ¿Presupuesto? ¿Restricciones del edificio?
- Levantamiento físico: planos, distancias, ubicación de racks y tomas.

### 2. Diseño lógico
- Topología jerárquica, VLANs, **plan de direccionamiento IP (VLSM)**, enrutamiento, seguridad, nombres de dispositivos.

### 3. Diseño físico
- Ubicación de MDF/IDF, rutas de cableado, tipo de medio, cantidad de nodos, lista de materiales y costos.

### 4. Implementación
- Instalación del cableado, montaje de equipos, configuración (hostname, contraseñas, VLANs, DHCP, enrutamiento).

### 5. Pruebas y verificación
- Certificación de cableado, ping y traceroute entre VLANs, pruebas de rendimiento, pruebas de falla de enlaces redundantes.

### 6. Documentación
- Diagramas físico y lógico, tabla de direccionamiento, tabla de puertos, respaldo de configuraciones, manual de operación.

### 7. Operación y mantenimiento
- Monitoreo (SNMP, por ejemplo con Zabbix o PRTG), actualizaciones, respaldos, atención a fallas.

### Tabla de direccionamiento (formato de entrega)
| Dispositivo | Interfaz | IP | Máscara | Gateway |
|---|---|---|---|---|
| R1 | G0/0.10 | 172.16.10.1 | 255.255.255.0 | N/A |
| S1 | VLAN 99 | 172.16.99.2 | 255.255.255.0 | 172.16.99.1 |
| PC-A | NIC | DHCP | | |`,
      clave: ['PPDIOO', 'Requerimientos → diseño lógico → diseño físico', 'Implementación y pruebas', 'Documentación: diagramas y tabla de direccionamiento'],
      pr: { p: 'Escribe el análisis de requerimientos (10 preguntas) que harías antes de diseñar la red de una biblioteca nueva.', r: 'Ej.: número de usuarios simultáneos, número de PCs fijas, Wi-Fi para visitantes, cámaras, impresoras, servicios que se usarán, ancho de banda del ISP, presupuesto, plano del edificio, requisitos de seguridad (red de invitados aislada).' },
      q: [
        ['¿Qué fase define el plan de direccionamiento y las VLANs?', ['Diseño físico', 'Diseño lógico', 'Implementación', 'Operación'], 1, 'Es parte de la lógica de la red.'],
        ['¿Qué documento resume IP, máscara y gateway de cada equipo?', ['Diagrama físico', 'Tabla de direccionamiento', 'Lista de materiales', 'Manual de usuario'], 1, 'Indispensable en cualquier entrega.'],
        ['La "O" final de PPDIOO significa…', ['Operar', 'Optimizar', 'Organizar', 'Ordenar'], 1, 'Preparar, Planear, Diseñar, Implementar, Operar, Optimizar.']
      ],
      c: [['PPDIOO', 'Preparar, Planear, Diseñar, Implementar, Operar, Optimizar.'], ['Diseño lógico', 'Topología, VLANs, direccionamiento, enrutamiento y seguridad.']] },

    { id: '8.5', t: 'Protocolos y aplicaciones de una red LAN',
      md: `Una LAN funcional combina protocolos de varias capas.

### Infraestructura
| Protocolo | Función |
|---|---|
| **Ethernet / 802.11** | Acceso al medio cableado e inalámbrico |
| **802.1Q** | Etiquetado de VLANs en enlaces troncales |
| **STP / RSTP** (802.1D / 802.1w) | Evita **bucles** de capa 2 cuando hay enlaces redundantes, bloqueando puertos |
| **EtherChannel / LACP** | Agrupa varios enlaces físicos en uno lógico |
| **IP** | Direccionamiento y enrutamiento |
| **Enrutamiento estático u OSPF** | Rutas entre subredes |
| **NAT/PAT** | Traduce IPs privadas a la pública para salir a Internet |

### Servicios de la LAN
**DHCP**, **DNS**, servidores de archivos (**SMB**), impresión, correo, web interna (intranet), **NTP** (hora sincronizada), autenticación centralizada (Active Directory/LDAP, RADIUS).

### Administración
- **SSH** para acceder a los equipos de forma segura (en lugar de Telnet).
- **SNMP** para monitorear.
- **Syslog** para registrar eventos.
- **CDP/LLDP** para descubrir equipos vecinos.

### Configuración básica de un switch (siempre igual)
~~~text
Switch> enable
Switch# configure terminal
Switch(config)# hostname S1
S1(config)# enable secret clase
S1(config)# line console 0
S1(config-line)# password cisco
S1(config-line)# login
S1(config)# service password-encryption
S1(config)# banner motd #Solo personal autorizado#
S1(config)# interface vlan 1
S1(config-if)# ip address 192.168.1.2 255.255.255.0
S1(config-if)# no shutdown
S1(config)# ip default-gateway 192.168.1.1
S1# copy running-config startup-config
~~~`,
      clave: ['802.1Q troncales, STP evita bucles', 'NAT/PAT para salir a Internet', 'Servicios: DHCP, DNS, SMB, NTP', 'Configuración básica: hostname, enable secret, consola, SVI, guardar'],
      pr: { p: 'Configura dos switches en Packet Tracer con la plantilla de la lección (hostname, contraseñas, banner, IP de gestión) y guarda la configuración. Comprueba con show running-config.', r: 'Revisa que las contraseñas aparezcan cifradas por service password-encryption y que tras reiniciar (reload) la configuración siga ahí gracias a copy running-config startup-config.' },
      q: [
        ['¿Qué protocolo evita bucles en redes con switches redundantes?', ['OSPF', 'STP', 'NAT', 'DHCP'], 1, 'Spanning Tree bloquea puertos redundantes.'],
        ['¿Qué estándar etiqueta tramas con el número de VLAN?', ['802.3', '802.11', '802.1Q', '802.1X'], 2, 'Enlaces troncales.'],
        ['Para acceder a un switch de forma segura por la red se usa…', ['Telnet', 'SSH', 'TFTP', 'HTTP'], 1, 'Telnet viaja sin cifrar.']
      ],
      c: [['STP', 'Spanning Tree Protocol: evita bucles en capa 2 bloqueando enlaces redundantes.'], ['PAT', 'NAT con sobrecarga: muchas IPs privadas comparten una pública usando puertos.'], ['copy run start', 'Guarda la configuración activa en la NVRAM.']] },

    { id: '8.6', t: 'Seguridad de una red LAN',
      md: `### Amenazas comunes
- **Acceso no autorizado** a equipos de red.
- **Malware** (virus, gusanos, ransomware).
- **Ataques de reconocimiento** (escaneo de puertos con nmap).
- **Ataques de acceso**: robo de contraseñas, fuerza bruta.
- **Denegación de servicio (DoS/DDoS)**.
- **Ataques de capa 2**: inundación de tabla MAC, ARP spoofing, servidores DHCP falsos, VLAN hopping.
- Amenazas **físicas**: robo de equipo, desconexión de cables, cortes de energía.

### La tríada CIA
**Confidencialidad** (solo quien debe ve la información), **Integridad** (no se altera), **Disponibilidad** (está cuando se necesita).

### Medidas en los dispositivos
~~~text
S1(config)# enable secret Cl4ve-Segura
S1(config)# security passwords min-length 10
S1(config)# ip domain-name unsij.lab
S1(config)# crypto key generate rsa modulus 2048
S1(config)# username admin secret Otra-Clave
S1(config)# line vty 0 15
S1(config-line)# transport input ssh
S1(config-line)# login local
S1(config-line)# exec-timeout 5
~~~
- Desactivar puertos sin uso (shutdown) y moverlos a una VLAN sin uso.
- **Port security**: limitar cuántas MAC se aprenden por puerto.
- **DHCP snooping** y **DAI** contra DHCP y ARP falsos.
- **ACL** para filtrar tráfico entre VLANs.
- Mantener el IOS actualizado y respaldar configuraciones.

### Medidas de red
**Firewall**, segmentación con VLANs (red de invitados aislada), **WPA3/WPA2-Enterprise** con 802.1X en Wi-Fi, **VPN** para acceso remoto, IDS/IPS, antivirus/EDR en los hosts, **respaldos** y **UPS**.

### Personas
Contraseñas robustas, capacitación contra **phishing**, políticas de uso aceptable.`,
      clave: ['Tríada CIA', 'Ataques de capa 2: MAC flooding, ARP spoofing, DHCP falso', 'SSH, enable secret, port security, puertos apagados', 'Firewall, VLANs, WPA3, VPN, respaldos'],
      pr: { p: 'Configura SSH en un switch de Packet Tracer con los comandos de la lección y conéctate desde una PC con ssh -l admin <IP>. Luego activa port security en Fa0/1 con máximo 1 MAC y modo shutdown.', r: 'Port security: interface fa0/1 → switchport mode access → switchport port-security → switchport port-security maximum 1 → switchport port-security violation shutdown → switchport port-security mac-address sticky.' },
      q: [
        ['¿Qué significa la "D" en la tríada CIA?', ['Datos', 'Disponibilidad', 'Detección', 'Dominio'], 1, 'Confidencialidad, Integridad, Disponibilidad.'],
        ['¿Qué limita el número de MAC aprendidas en un puerto?', ['ACL', 'Port security', 'STP', 'NAT'], 1, 'Evita conectar equipos no autorizados.'],
        ['¿Qué comando obliga a usar solo SSH en las líneas VTY?', ['transport input ssh', 'login ssh', 'enable ssh', 'ip ssh only'], 0, 'En line vty 0 15.']
      ],
      c: [['Port security', 'Restringe qué y cuántas MAC pueden usar un puerto de switch.'], ['DHCP snooping', 'Bloquea respuestas DHCP de puertos no confiables (servidores falsos).'], ['Tríada CIA', 'Confidencialidad, Integridad y Disponibilidad.']] }
  ]}
  ]
});
