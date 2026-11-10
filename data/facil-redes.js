/* Explicaciones desde cero: Redes I */
window.AULA = window.AULA || { materias: [], juegos: [] };
AULA.facil = AULA.facil || {};
AULA.intro = AULA.intro || {};
AULA.intro.redes = 'Una red es un grupo de computadoras y aparatos conectados para compartir información, como el Wi-Fi de tu casa o internet. En esta materia vas a entender qué pasa, paso a paso, cuando mandas un mensaje o abres una página: por qué cables y aparatos viaja, cómo encuentra a dónde ir y qué reglas siguen las computadoras para entenderse. Al final podrás armar y configurar una red pequeña, primero en el simulador Packet Tracer.';
Object.assign(AULA.facil, {
'redes:1.1': `Una **red** es un conjunto de aparatos conectados para compartir información.

Un poquito de historia:
- Primero existió el **teléfono**. Al llamar, se apartaba un "camino" (un circuito) solo para tu llamada mientras hablabas. A eso se le llama **conmutación de circuitos**.
- Luego se inventó una idea mejor para las computadoras: partir la información en pedacitos llamados **paquetes**, que viajan por caminos compartidos y se juntan al llegar. Es la **conmutación de paquetes**, como mandar un libro en varios sobres.
- En **1969** se conectaron las primeras 4 computadoras de **ARPANET**, la red abuela de internet.

Hoy usamos **redes convergentes**: una sola red que lleva **voz, video y datos** al mismo tiempo (videollamadas, música, páginas web).

Para que la videollamada no se corte cuando alguien descarga algo pesado, la red da prioridad a la voz y al video. Eso se llama **QoS** (calidad de servicio).`,

'redes:1.2': `Una red tiene tres tipos de piezas:

1. **Dispositivos finales**: donde empieza o termina la información. Tu celular, tu laptop, una impresora.
2. **Dispositivos intermediarios**: los que conectan y dirigen el tráfico.
   - **Switch**: conecta los aparatos **dentro de un mismo lugar** (un salón, una casa). Los reconoce por su **dirección MAC**, que es como el número de serie de cada aparato.
   - **Router**: conecta **redes distintas** entre sí, por ejemplo tu casa con internet. Se guía por la **dirección IP**, que es como la dirección postal.
   - **Punto de acceso**: da Wi-Fi.
3. **Medios**: el "camino": cables de cobre, fibra óptica o señales inalámbricas.

Los routers y switches de la marca Cisco tienen su propio sistema llamado **IOS**. Se configuran escribiendo comandos. El símbolo al final te dice dónde estás:
- **Switch>** modo básico (solo mirar).
- **Switch#** modo privilegiado (se entra escribiendo **enable**).`,

'redes:1.3': `La **topología** es la forma en que están conectados los aparatos, como el plano de una red.

- **Bus**: todos colgados de un solo cable. Si se corta, se cae todo.
- **Anillo**: cada uno conectado a sus dos vecinos formando un círculo.
- **Estrella**: todos conectados a un aparato central (un switch). Si falla un cable, solo se desconecta ese aparato. **Es la que se usa hoy**, en su versión **estrella extendida**: varias estrellas unidas.
- **Malla**: cada uno conectado con todos los demás. Muy resistente, pero caro. Para saber cuántos cables necesitas: n × (n − 1) ÷ 2. Con 5 aparatos: 5 × 4 ÷ 2 = **10 cables**.

Hay dos tipos de dibujo de una red:
- **Físico**: dónde está cada aparato y por dónde pasan los cables.
- **Lógico**: cómo viaja la información, con las direcciones IP de cada aparato.`,

'redes:2.1': `Un **protocolo** es un conjunto de **reglas** para comunicarse. Así como en una plática acordamos hablar el mismo idioma y esperar nuestro turno, las computadoras también necesitan reglas.

Los protocolos definen cosas como:
- En qué **formato** va el mensaje.
- Qué **tamaño** puede tener.
- **Cuándo** y qué tan rápido mandar (a esto se le llama temporización; incluye el **control de flujo**, para no saturar al que recibe).

Hay tres formas de mandar un mensaje:
- **Unicast**: a una sola persona.
- **Multicast**: a un grupo.
- **Broadcast**: **a todos**, como hablar por el altavoz de la escuela.

Los protocolos trabajan en equipo, en "pisos". El conjunto que usa internet se llama **TCP/IP**. Por ejemplo, **HTTP** trae las páginas web, **TCP** y **UDP** se encargan del transporte, e **IP** pone las direcciones.`,

'redes:2.2': `Para que un celular Samsung pueda conectarse a un módem de cualquier marca, todos deben seguir las **mismas reglas**. Para eso existen los **estándares**.

- **Estándar abierto**: cualquiera puede usarlo. Gracias a eso, aparatos de distintas marcas se entienden. A eso se le llama **interoperabilidad**.
- **Protocolo propietario**: es de una sola empresa y ella decide quién lo usa.

Las organizaciones que hacen las reglas (no tienes que memorizarlas todas, pero estas salen en examen):
- **IEEE**: hace las reglas **802**. El cable de red (Ethernet) es **802.3** y el Wi-Fi es **802.11**.
- **IETF**: hace las reglas de internet. Las publica en documentos llamados **RFC**.
- **ISO**: creó el **modelo OSI**, que verás en el siguiente tema.
- **TIA/EIA**: reglas de **cableado**, como el orden de colores del cable de red.
- **IANA**: reparte las direcciones IP y los números de puerto.`,

'redes:2.3': `El **modelo OSI** divide la comunicación en **7 capas**, como un edificio de 7 pisos. Cada piso tiene un trabajo. Sirve para entender y para encontrar fallas.

De abajo hacia arriba:
1. **Física**: los cables y las señales. Aquí viajan **bits** (unos y ceros).
2. **Enlace de datos**: entrega dentro de la red local usando direcciones **MAC**. Aquí trabaja el **switch**. El paquete se llama **trama**.
3. **Red**: encuentra el camino entre redes usando direcciones **IP**. Aquí trabaja el **router**. Se llama **paquete**.
4. **Transporte**: parte los datos y cuida que lleguen completos (TCP y UDP). Se llama **segmento**.
5. **Sesión**: abre y cierra la "conversación".
6. **Presentación**: el formato, la **compresión** y el **cifrado** (que nadie más lo lea).
7. **Aplicación**: lo que usa el programa, como HTTP para páginas web.

Truco para memorizar de abajo hacia arriba: **"Fíjate En Rápido Transporte Sin Pagar Ahí"** (Física, Enlace, Red, Transporte, Sesión, Presentación, Aplicación).`,

'redes:2.4': `Además del modelo OSI hay otro, el **modelo TCP/IP**, que es **el que de verdad usa internet**. Es más corto: solo **4 capas**.

| TCP/IP | Equivale en OSI a |
|---|---|
| **Aplicación** | las capas 5, 6 y 7 juntas |
| **Transporte** | la 4 |
| **Internet** | la 3 (aquí vive **IP**) |
| **Acceso a la red** | la 1 y la 2 |

La diferencia: OSI es un modelo **para estudiar y comparar**; TCP/IP describe **lo que realmente funciona**.

Ejemplo, cuando abres una página web:
1. Tu navegador escribe la petición en **HTTP** (aplicación).
2. **TCP** la parte en pedazos (transporte).
3. **IP** le pone la dirección de origen y destino (internet).
4. El cable o el Wi-Fi la mandan (acceso a la red).`,

'redes:2.5': `Cuando mandas algo, cada capa le agrega su propia "etiqueta" con información, como meter una carta en un sobre, ese sobre en una caja y la caja en un camión. Eso se llama **encapsulamiento**.

Los nombres cambian en cada capa:
**Datos → Segmento → Paquete → Trama → Bits**

La capa de enlace, además de su etiqueta al principio, pone una al final llamada **FCS**: sirve para revisar que la trama no llegó dañada.

Algo muy importante:
- La **dirección IP** (la "dirección postal") **no cambia** en todo el viaje.
- La **dirección MAC** (a quién se lo entregas en este tramo) **cambia en cada router**, porque cada router arma una trama nueva para el siguiente tramo.

Es como un paquete de paquetería: la dirección final del destinatario no cambia, pero en cada sucursal se lo entregan a un repartidor distinto.

Al recibir, se hace al revés: se van quitando las etiquetas (desencapsulamiento).`,

'redes:3.1': `La **capa física** es la más básica: se encarga de **mover los bits** (unos y ceros) de un aparato a otro.

Los bits se convierten en señales según el medio:
- En **cable de cobre**: pulsos de **electricidad**.
- En **fibra óptica**: pulsos de **luz**.
- En **inalámbrico**: **ondas de radio**.

A la forma de representar un 1 y un 0 con señales se le llama **codificación**. Por ejemplo, en la codificación **Manchester** un 1 es "la señal sube a la mitad" y un 0 es "la señal baja a la mitad".

En esta capa no hay direcciones ni mensajes: solo electricidad, luz o radio. La unidad de esta capa son los **bits**.`,

'redes:3.2': `Algunas palabras que se usan para hablar de velocidad:

- **Ancho de banda**: lo **máximo** que podría pasar por un cable o conexión. Es como el ancho de una carretera.
- **Throughput** (rendimiento): lo que **realmente** pasa. Casi siempre es menos, como los coches que de verdad pasan en hora pico.
- **Latencia**: lo que **tarda** en llegar algo de un punto a otro.

Ojo con **bits y bytes**: un byte son 8 bits. Las compañías anuncian en **megabits** (Mb), pero los archivos se miden en **megabytes** (MB). 100 Mbps entre 8 son unos **12.5 MB por segundo**.

Problemas que tienen los cables de cobre:
- **Atenuación**: la señal se **debilita con la distancia**. Por eso el cable de red llega máximo a 100 metros.
- **Interferencia**: motores o lámparas meten "ruido".
- **Diafonía**: la señal de un par de cables se "cuela" en el de al lado.`,

'redes:3.3': `El cable de red normal se llama **UTP**. Por dentro tiene **8 hilos** de colores, trenzados de dos en dos (4 pares). El trenzado ayuda a evitar interferencias. En la punta lleva un conector llamado **RJ-45**. Puede medir **máximo 100 metros**.

Para "ponchar" el cable (ponerle el conector) hay un orden de colores. El más usado es **T568B**:
1. Blanco-naranja
2. Naranja
3. Blanco-verde
4. Azul
5. Blanco-azul
6. Verde
7. Blanco-café
8. Café

El otro orden, **T568A**, es igual pero **cambia el naranja por el verde**.

Tipos de cable:
- **Directo**: mismo orden en las dos puntas. Une **aparatos distintos**: PC con switch, switch con router.
- **Cruzado**: un extremo en A y otro en B. Une **aparatos parecidos**: switch con switch, PC con PC, y también PC con router.
- **Consola**: para configurar un router o switch desde tu computadora.`,

'redes:3.4': `La **fibra óptica** es un hilo de vidrio, más delgado que un cabello, por el que viaja **luz**.

Ventajas: llega **muy lejos** (kilómetros), es **muy rápida** y **no le afectan las interferencias eléctricas**, porque lleva luz, no electricidad.

Dos tipos:
- **Monomodo**: el centro es muy delgadito y usa **láser**. Llega **más lejos**: decenas de kilómetros. Suele tener cubierta amarilla.
- **Multimodo**: el centro es más grueso y usa luz LED. Llega a distancias más cortas (cientos de metros), pero es más barata.

Conectores comunes: **LC** (pequeñito, muy usado en switches), **SC** (cuadrado) y **ST** (redondo, antiguo).

Se usa para unir edificios o para el "tronco" principal de una red. Para conectar tu computadora, normalmente basta con cable UTP.`,

'redes:3.5': `Las redes **inalámbricas** usan **ondas de radio**. El ejemplo más conocido es el **Wi-Fi**.

Sus versiones tienen nombre técnico y comercial. La que más debes recordar: **Wi-Fi 6 = 802.11ax**.

El Wi-Fi usa dos "carriles" principales (bandas):
- **2.4 GHz**: llega **más lejos** y atraviesa mejor las paredes, pero es más lenta y tiene más interferencia. Solo tiene 3 canales que no se estorban: **1, 6 y 11**.
- **5 GHz**: **más rápida**, pero llega menos lejos.

Desventajas del inalámbrico:
- Las paredes y el metal debilitan la señal.
- Hay interferencias.
- Cualquiera cerca podría intentar conectarse, por eso se usa contraseña y cifrado (WPA2 o **WPA3**).

El nombre de una red Wi-Fi se llama **SSID**.`,

'redes:4.1': `La **capa de enlace de datos** (capa 2) se encarga de entregar la información **dentro de la misma red local**.

Hace cuatro cosas:
- Mete el paquete en una **trama**.
- Le pone las direcciones **MAC** de quien envía y de quien recibe.
- Decide **quién puede hablar y cuándo** en el cable.
- Revisa si llegó dañada con el **FCS**, que va al final de la trama. Si está dañada, la tira.

Tiene dos partes (subcapas):
- **LLC**: la de arriba. Le avisa a la capa de red qué tipo de paquete va dentro.
- **MAC**: la de abajo. Maneja las direcciones y el acceso al cable.

Algo clave: una trama solo sirve para **un tramo** del camino. Cuando llega a un router, el router **la desarma y arma una nueva** para el siguiente tramo, como cambiar de camión en cada terminal.`,

'redes:4.2': `La forma de conectar redes de larga distancia (WAN) puede ser:
- **Punto a punto**: un cable directo entre dos lugares.
- **Hub and spoke** (estrella): una oficina central y sucursales conectadas a ella.
- **Malla**: todas conectadas con varias.

En redes locales (LAN) hoy se usa la **estrella** con switches.

Una idea importante, el **dúplex**:
- **Half-duplex**: los dos pueden hablar, pero **no al mismo tiempo**. Como un walkie-talkie: "cambio". El Wi-Fi funciona así.
- **Full-duplex**: los dos hablan y escuchan **al mismo tiempo**, como en una llamada de teléfono. Así funcionan los switches modernos.

¿Cómo deciden quién habla? El Wi-Fi usa **CSMA/CA**: escucha antes de hablar y trata de **evitar** que dos hablen a la vez.`,

'redes:4.3': `Una **trama** es como un sobre con tres partes:
1. **Encabezado** (al principio): direcciones de quien manda y quien recibe, y qué tipo de contenido lleva.
2. **Datos**: el paquete que va adentro.
3. **Tráiler** (al final): el **FCS** para detectar errores.

En Ethernet (cable de red):
- La trama más pequeña permitida mide **64 bytes**. Si es más chica, se llama **runt** y se tira (normalmente es un pedazo roto).
- La más grande normal mide 1518 bytes.
- Dentro caben hasta **1500 bytes** de datos. A ese límite se le llama **MTU**.

Hay un campo llamado **EtherType** que dice qué va dentro. Por ejemplo, **0x0800 significa IPv4**.`,

'redes:4.4': `Cuando varios aparatos comparten un cable, si dos hablan al mismo tiempo sus señales chocan. A eso se le llama **colisión**.

**CSMA/CD** (el método del cable antiguo):
1. Escucha si el cable está libre.
2. Si está libre, habla.
3. Si hay choque, avisa a todos y espera un tiempo al azar antes de volver a intentar.

**CSMA/CA** (el método del **Wi-Fi**): en lugar de detectar choques, trata de **evitarlos**. Y quien recibe contesta "recibido" (ACK).

Dos ideas que salen mucho en examen:
- **Dominio de colisión**: el grupo de aparatos que podrían chocar entre sí. Un **switch** separa cada puerto en su propio dominio: un switch de 12 puertos = **12 dominios de colisión**.
- **Dominio de broadcast**: el grupo de aparatos que reciben un mensaje "para todos". Solo un **router** los separa.`,

'redes:4.5': `**Ethernet** es la tecnología del cable de red, la que usan casi todas las redes locales.

Cada aparato tiene una **dirección MAC**: un número de **48 bits** escrito en 12 caracteres, como 00-60-2F-3A-07-BC. Viene de fábrica. La primera mitad dice qué empresa lo fabricó.

¿Cómo sabe un switch a dónde mandar cada trama? Tiene una **tabla**, como una lista de asistencia:
1. **Aprende**: cuando le llega una trama, anota la **MAC de quien la mandó** y por qué puerto llegó.
2. **Reenvía**: busca la MAC del destino en su tabla y la manda solo por ese puerto.
3. Si **no conoce** al destino, la manda **por todos los puertos menos por donde llegó**, para asegurarse de que llegue.

La dirección para "todos" (broadcast) es FF-FF-FF-FF-FF-FF.`,

'redes:5.1': `Las computadoras cuentan con solo dos dígitos: **0 y 1**. Eso es el sistema **binario**. Lo necesitas para entender las direcciones IP.

Un grupo de 8 bits se llama **octeto**. Cada posición vale el doble que la de su derecha:

| 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |

Para leer un binario, **suma los valores donde hay un 1**:
11100000 → 128 + 64 + 32 = **224**

Para pasar un número a binario, ve restando de izquierda a derecha. Ejemplo con 200: ¿cabe 128? sí, quedan 72 → 1. ¿64? sí, quedan 8 → 1. ¿32? no → 0. ¿16? no → 0. ¿8? sí, queda 0 → 1. El resto 0. → **11001000**.

El sistema **hexadecimal** usa 16 símbolos: 0-9 y luego A=10, B=11, C=12, D=13, E=14, F=15. **Cada símbolo hexadecimal equivale a 4 bits.** Por eso **FF = 255**.

Practica en el juego Binario Blaster: es la mejor forma de que se te quede.`,

'redes:5.2': `Cada aparato tiene **dos direcciones**:
- **IP**: como tu **dirección postal**. Sirve para llegar desde cualquier parte del mundo.
- **MAC**: como tu **nombre** en el buzón. Sirve para la entrega final dentro de tu red.

Muchas veces tu computadora sabe la IP de a quién le quiere hablar, pero no su MAC. Para averiguarla usa **ARP**:
1. Grita a todos (**broadcast**): "¿Quién tiene la IP 192.168.1.20?".
2. Solo el dueño contesta: "Soy yo, mi MAC es tal".
3. Tu computadora lo anota para no volver a preguntar.

Si el destino está **en otra red** (por ejemplo, un servidor de Google), tu computadora no le pregunta a él: pregunta por la MAC de tu **router** (la "puerta de salida" o **gateway**), porque es a quien le debe entregar.

En la nueva versión, IPv6, no existe ARP: se usa algo llamado **Neighbor Discovery** (descubrimiento de vecinos).`,

'redes:5.3': `El protocolo **IP** es el que pone las direcciones a los paquetes y los hace viajar entre redes.

Es de "**mejor esfuerzo**": hace lo posible por entregar, pero **no garantiza** que llegue. Si se necesita garantía, de eso se encarga TCP.

Cada paquete IP lleva datos importantes, como:
- **IP de origen y de destino**.
- **TTL** (tiempo de vida): un contador que **baja 1 en cada router**. Si llega a 0, el paquete se tira. Así se evita que un paquete perdido dé vueltas para siempre.
- **Protocolo**: qué lleva adentro. **6 = TCP**, 17 = UDP, 1 = ICMP.

Hay dos versiones:
- **IPv4**: direcciones de **32 bits** (192.168.1.10). Ya casi se acabaron.
- **IPv6**: direcciones de **128 bits**, muchísimas más. Ahí el TTL se llama "límite de saltos".`,

'redes:5.4': `Una IP tiene dos partes: la de la **red** (como la colonia) y la del **aparato** o host (como el número de casa). La **máscara** dice dónde termina una y empieza la otra.

Se escribe así: **192.168.10.77/26**. El "/26" significa que los primeros 26 bits son de red.

**Receta para calcular una subred** (ejemplo /26):
1. Pasa el prefijo a máscara: /26 = 255.255.255.**192**.
2. Calcula el **bloque**: 256 − 192 = **64**. Las redes van de 64 en 64: 0, 64, 128, 192.
3. ¿En cuál cae el 77? En la del **64**. Esa es la **dirección de red**.
4. La siguiente red empieza en 128, así que el **broadcast** es la de antes: **127**.
5. Hosts útiles: del 65 al 126.

Cantidad de hosts: 2 elevado a los bits de host, **menos 2**. En /27 sobran 5 bits: 2⁵ − 2 = **30**.

Direcciones **privadas** (las de casas y escuelas): 10.x.x.x, de **172.16 a 172.31**, y 192.168.x.x. La 172.32.1.1, por ejemplo, ya no es privada.`,

'redes:5.5': `Como las direcciones IPv4 se acabaron, se creó **IPv6**: direcciones de **128 bits** escritas en 8 grupos de 4 caracteres hexadecimales:

2001:0DB8:0000:0000:0000:0000:0000:0001

Como son larguísimas, hay dos reglas para acortarlas:
1. Quitar los ceros a la izquierda de cada grupo: 0DB8 → DB8.
2. Cambiar **una sola** serie de grupos en cero por **::** (solo una vez, si no, no sabrías cuántos ceros iban en cada lado).

Resultado: **2001:DB8::1**

Tipos que debes reconocer:
- Empiezan con **2** o **3**: direcciones globales (de internet).
- Empiezan con **FE80**: **link-local**, solo funcionan en tu red local.
- Empiezan con **FF**: multicast (para grupos).

En IPv6 **no existe el broadcast**: se usa **multicast** en su lugar.`,

'redes:5.6': `**ICMP** es un protocolo que manda **mensajes de aviso y de error**, como "no pude llegar" o "se acabó el tiempo".

Lo usas con dos herramientas muy útiles:

**ping**: pregunta "¿estás ahí?" (echo request) y espera "sí, aquí estoy" (echo reply). Sirve para saber si llegas a otro aparato.

Para encontrar una falla de internet, haz los pings en este orden:
1. **ping 127.0.0.1**: ¿funciona la red en mi propia computadora?
2. **ping a mi router**: ¿llego a mi red?
3. **ping 8.8.8.8**: ¿llego a internet?
4. **ping google.com**: ¿funciona la traducción de nombres (DNS)?

**traceroute** (o tracert): muestra **cada router** por el que pasa tu paquete. Usa el aviso de "tiempo excedido" que mandan los routers cuando el TTL llega a 0.

En los equipos Cisco, al hacer ping: **!** = respondió, **.** = no contestó a tiempo.`,

'redes:6.1': `La **capa de transporte** lleva la información de **un programa** en tu computadora a **otro programa** en otra computadora. Por ejemplo, de tu navegador al servidor de una página.

Tiene dos protocolos:

**TCP**: el cuidadoso.
- Antes de mandar, "saluda" para abrir la conexión.
- Confirma que cada pedazo llegó y **reenvía lo que se pierde**.
- Entrega todo **en orden**.
- Se usa para páginas web, correo, descargar archivos.

**UDP**: el rápido.
- No saluda, no confirma, no reenvía.
- Es **más ligero**: su etiqueta mide solo **8 bytes**.
- Se usa cuando **la rapidez importa más** que perder un pedacito: **videollamadas**, juegos en línea, consultas DNS.

Piénsalo así: en una videollamada es mejor perder una fracción de segundo que escuchar todo con retraso.`,

'redes:6.2': `**TCP** abre una conexión antes de mandar datos con un "saludo de tres pasos" (**3-way handshake**). Es como empezar una llamada:

1. **SYN**: "¿Me escuchas?"
2. **SYN-ACK**: "Sí te escucho, ¿y tú a mí?"
3. **ACK**: "Sí, empecemos."

Para **cerrar**, se usan **4 mensajes**: cada lado dice "ya terminé" (**FIN**) y el otro contesta "enterado" (**ACK**).

¿Cómo sabe TCP que llegó todo? Numera cada byte. Quien recibe contesta con un **ACK** que dice **el número del siguiente byte que espera**. Si el que manda no recibe confirmación a tiempo, lo vuelve a mandar.

Si algo sale mal, se puede cortar la conexión de golpe con un mensaje **RST**.`,

'redes:6.3': `**UDP** es el protocolo de transporte **sencillo y rápido**:
- **No hay saludo**: manda de inmediato.
- **No confirma** si llegó.
- **No reenvía** lo que se pierde.
- **No ordena** los pedazos.

¿Por qué alguien querría algo así? Porque es **veloz**. En un **video en vivo**, si un pedacito llega tarde ya no sirve, así que no vale la pena reenviarlo.

Su etiqueta es muy pequeña, solo **8 bytes**: puerto de origen, puerto de destino, tamaño y una revisión de errores.

Servicios que usan UDP:
- **DNS** (puerto **53**): traducir nombres como google.com a IPs.
- **DHCP**: darte una IP automáticamente.
- Videollamadas, juegos en línea, transmisiones en vivo.`,

'redes:6.4': `Tu computadora tiene muchos programas usando la red al mismo tiempo: el navegador, WhatsApp, Spotify. ¿Cómo sabe a cuál le toca cada mensaje? Por el **número de puerto**.

Piensa en un edificio: la **IP** es la dirección del edificio y el **puerto** es el **número de departamento**.

La combinación **IP + puerto** se llama **socket**.

Puertos que debes aprender:
| Puerto | Servicio |
|---|---|
| 22 | **SSH** (control remoto seguro) |
| 23 | Telnet (control remoto inseguro) |
| 25 | SMTP (enviar correo) |
| 53 | DNS |
| 80 | HTTP (web) |
| 443 | **HTTPS** (web segura) |

Los puertos del 0 al 1023 se llaman **bien conocidos**, porque son de servicios famosos.`,

'redes:6.5': `El **control de flujo** evita que quien manda rápido **ahogue** a quien recibe lento. Como cuando le dictas a alguien: si vas muy rápido, te pide que esperes.

TCP lo hace con la **ventana deslizante**:
- **Quien recibe** le dice a quien manda: "puedes mandarme hasta tantos bytes sin esperar mi confirmación". Ese número es el **tamaño de ventana**.
- Conforme confirma lo que recibe, la ventana "avanza" y se puede mandar más.
- Si se llena, pide una ventana más chica o pausa.

Otro concepto: **MSS**, lo máximo de datos en un solo segmento. En Ethernet normalmente es **1460 bytes** (1500 del máximo menos 20 de la etiqueta IP y 20 de la de TCP).

No lo confundas con el **control de congestión**: ese protege **a la red** completa cuando hay mucho tráfico, no solo al que recibe.`,

'redes:7.1': `La **capa de aplicación** es la más cercana a ti: la que usan los programas.

En el modelo TCP/IP esta capa junta tres capas del modelo OSI:
- **Aplicación** (7): los servicios que usan los programas.
- **Presentación** (6): el **formato**, la **compresión** (como hacer más chica una foto en JPEG) y el **cifrado** (para que nadie más lo lea).
- **Sesión** (5): abrir, mantener y cerrar la conversación entre programas.

Protocolos de esta capa, por lo que hacen:
- **DNS**: traducir nombres a IPs.
- **DHCP**: darte una IP automáticamente.
- **SMTP, POP3, IMAP**: correo.
- **HTTP, HTTPS**: páginas web.
- **FTP**: pasar archivos.
- **SSH**: controlar otra computadora a distancia.`,

'redes:7.2': `Hay dos formas de organizar quién da y quién pide:

**Cliente-servidor**: hay un **servidor** que guarda las cosas y muchos **clientes** que piden. Cuando abres una página, tu navegador es el cliente y la computadora de la página es el servidor. Es ordenado, seguro y se puede administrar desde un lugar.

**P2P** (de igual a igual): **no hay servidor**. **Cada computadora puede pedir y dar** al mismo tiempo. Por ejemplo, compartir una carpeta entre dos laptops de tu casa.
- Ventajas: fácil y barato.
- Desventajas: **no hay control central**, es menos seguro y no funciona bien con muchos equipos.

Un ejemplo famoso de P2P es **BitTorrent**: descargas un archivo en pedacitos desde muchas personas a la vez, y tú también compartes los pedazos que ya tienes.`,

'redes:7.3': `**La web**
- **HTTP** (puerto 80) es el protocolo para pedir páginas web.
- **HTTPS** (puerto 443) es lo mismo pero **cifrado**: nadie en medio puede leer lo que mandas. Es el candadito del navegador.
- Cuando algo sale mal, el servidor contesta con un número. El famoso **404 significa "no encontrado"**. 200 significa "todo bien".

**El correo** usa tres protocolos distintos:
- **SMTP**: para **enviar** correos.
- **POP3**: **descarga** el correo a tu aparato y normalmente lo borra del servidor.
- **IMAP**: **deja el correo en el servidor** y lo sincroniza. Así lo ves igual en tu celular y en tu laptop.

Truco: **S**MTP = **S**alida (enviar). IMAP y POP3 = recibir.`,

'redes:7.4': `**DNS**: la agenda de contactos de internet
Las computadoras se buscan por IP (números), pero nosotros recordamos nombres como google.com. El **DNS traduce nombres a IPs**, como tu agenda traduce "Mamá" a un número de teléfono.

Tipos de registros: **A** guarda la IPv4 de un nombre; **AAAA** (cuatro A) guarda la **IPv6**; **MX** dice cuál es el servidor de correo.

**DHCP**: el que reparte IPs
Cuando conectas tu celular al Wi-Fi, no le escribes la IP a mano: **DHCP te la da automáticamente**. Lo hace en 4 pasos, que se recuerdan con la palabra **DORA**:
1. **D**iscover: "¿Hay algún servidor DHCP?"
2. **O**ffer: "Aquí estoy, te ofrezco esta IP."
3. **R**equest: "La quiero."
4. **A**cknowledge: "Listo, es tuya."

Si tu computadora tiene una IP que empieza con **169.254**, significa que **no consiguió IP por DHCP**.`,

'redes:7.5': `Formas de pasar archivos por la red:

**FTP**: el clásico para subir y bajar archivos de un servidor.
- Usa el puerto **21** para los comandos y el **20** para los datos.
- Problema: manda tu contraseña **sin cifrar**. Por eso hoy se prefiere SFTP.

**TFTP**: una versión muy simple, sin contraseña. Se usa sobre todo para **guardar la configuración de routers y switches** (hacer un respaldo).

**SMB**: lo que usa Windows para las **carpetas compartidas** en red (como cuando abres una carpeta de otra compu de la oficina). Usa el puerto 445. En Linux se llama Samba.

La diferencia con FTP: con SMB puedes **abrir y editar** un archivo que está en otra computadora como si estuviera en la tuya.`,

'redes:8.1': `Las redes grandes (como la de una universidad) se diseñan en **tres capas**, como un árbol:

- **Acceso**: donde se conectan **tus aparatos**. Son los switches de cada salón o laboratorio.
- **Distribución**: junta varios switches de acceso, por ejemplo los de un edificio, y aplica reglas.
- **Núcleo**: el "tronco" que une todo. Debe ser muy rápido.

En redes pequeñas se juntan núcleo y distribución en un solo equipo. A eso se le llama **núcleo colapsado**.

Otra idea clave: **VLAN**. Es dividir un mismo switch en varias redes **separadas**, como poner paredes invisibles. Por ejemplo, una VLAN para alumnos y otra para administración. Cada VLAN es su propio **dominio de broadcast**: los mensajes "para todos" de una VLAN no llegan a la otra.`,

'redes:8.2': `El **cableado estructurado** es instalar los cables de forma **ordenada y con reglas**, para que después sea fácil hacer cambios y encontrar fallas.

Las partes, de lo más grande a lo más pequeño:
- **Cuarto principal (MDF)**: donde están los equipos centrales y llega internet.
- **Cuartos de cada piso o área (IDF)**: con los switches de esa zona.
- **Cableado vertical** (backbone): une el cuarto principal con los de cada piso. Suele ser fibra.
- **Cableado horizontal**: del cuarto del piso hasta la toma de la pared. **Máximo 90 metros**.
- **Área de trabajo**: la toma de pared y el cable corto hasta tu computadora.

En el **rack** (el mueble metálico) los cables llegan a un **patch panel**, un panel con conectores numerados, y de ahí se conectan al switch con cables cortos.

Buenas costumbres: **etiquetar** cada cable en ambas puntas y no doblarlos de más.`,

'redes:8.3': `Para armar una red hay que elegir bien los aparatos y cables.

**Switches**: fíjate en:
- Cuántos **puertos** tiene (24 o 48).
- Qué tan rápido es.
- Si tiene **PoE**: esto permite **mandar electricidad por el mismo cable de red**, para alimentar teléfonos, cámaras o puntos de acceso Wi-Fi sin enchufe aparte.
- Si es de **capa 3**: puede hacer de router entre VLANs.

**Routers**: conectan tu red con internet.

**Cables, según el lugar**:
- De la pared a la computadora: **UTP** (cable normal).
- **Entre edificios**: **fibra monomodo**, porque llega lejos y no le afectan los problemas eléctricos.

Y algo muy útil en la sierra: un **UPS** (no-break) para que la red no se caiga con los apagones.`,

'redes:8.4': `Diseñar una red es como construir una casa: no empiezas poniendo ladrillos.

Pasos:
1. **Preguntar qué se necesita**: ¿cuántas personas? ¿qué van a usar? ¿cuánto dinero hay? Revisar los planos del edificio.
2. **Diseño lógico**: decidir las VLANs y las **direcciones IP** de cada parte.
3. **Diseño físico**: dónde va cada rack, por dónde pasan los cables, cuánto material se necesita.
4. **Instalar y configurar**.
5. **Probar** que todo funciona (ping entre todas las redes).
6. **Documentar**: hacer los diagramas y una **tabla de direccionamiento** (qué IP, máscara y gateway tiene cada aparato).
7. **Mantener**: vigilar y actualizar.

Cisco resume estos pasos en seis palabras: **Preparar, Planear, Diseñar, Implementar, Operar, Optimizar** (PPDIOO).`,

'redes:8.5': `Una red funciona gracias a muchos protocolos trabajando juntos. Los que más se usan en una red local:

- **STP**: si pones dos cables entre switches "por si uno falla", la información podría dar vueltas para siempre (un **bucle**). STP **evita los bucles** desactivando el cable de sobra hasta que se necesite.
- **802.1Q**: permite que un solo cable entre switches lleve **varias VLANs**, poniéndole a cada trama una etiqueta con su número de VLAN.
- **NAT/PAT**: permite que todas las computadoras de una casa salgan a internet usando **una sola IP pública**.
- **SSH**: para entrar a configurar un switch a distancia de forma **segura**. (Telnet hace lo mismo, pero sin cifrar.)

Configurar un switch Cisco siempre empieza parecido:
1. **enable** (entrar al modo privilegiado)
2. **configure terminal** (entrar a configurar)
3. **hostname S1** (ponerle nombre)
4. Poner contraseñas e IP.
5. **copy running-config startup-config** (**guardar**, para que no se pierda al apagarlo).`,

'redes:8.6': `La seguridad de una red busca tres cosas, que se recuerdan como la **tríada CIA**:
- **C**onfidencialidad: que solo quien debe pueda ver la información.
- **I**ntegridad: que nadie la cambie.
- **D**isponibilidad: que funcione cuando se necesita. (En inglés es la "A" de *Availability*.)

Amenazas comunes: virus, alguien adivinando contraseñas, alguien conectándose donde no debe, o ataques para tumbar un servicio.

Cómo proteger un switch o router:
- Poner **contraseñas fuertes**.
- Entrar a configurarlo solo por **SSH** (cifrado), nunca por Telnet. En Cisco se pone con el comando **transport input ssh**.
- **Apagar los puertos que no se usan**.
- **Port security**: limitar cuántos aparatos se pueden conectar en un puerto, para que nadie conecte su laptop al cable de la impresora.

Y para la red: firewall, contraseña WPA3 en el Wi-Fi, red separada para invitados y respaldos.`
});
