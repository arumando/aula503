/* Aula 503 — motor del simulador de redes (sin DOM).
   Modelo sencillo pero fiel: tramas Ethernet, ARP, switches que aprenden MAC,
   routers con redes conectadas directamente y ping (ICMP). */
(function (root) {
  'use strict';

  const BROADCAST = 'FF:FF:FF:FF:FF:FF';
  const TIPOS = {
    pc: { nombre: 'PC', puertos: ['Fa0'] },
    laptop: { nombre: 'Laptop', puertos: ['Fa0'] },
    server: { nombre: 'Servidor', puertos: ['Fa0'] },
    switch: { nombre: 'SW', puertos: ['Fa0/1', 'Fa0/2', 'Fa0/3', 'Fa0/4', 'Fa0/5', 'Fa0/6', 'Fa0/7', 'Fa0/8', 'Gi0/1', 'Gi0/2'] },
    router: { nombre: 'R', puertos: ['Gi0/0', 'Gi0/1', 'Gi0/2'] }
  };
  const esHost = d => d.tipo === 'pc' || d.tipo === 'laptop' || d.tipo === 'server';

  /* ---------- Direcciones ---------- */
  function ipNum(ip) {
    const p = String(ip || '').trim().split('.');
    if (p.length !== 4) return null;
    let n = 0;
    for (const x of p) {
      if (!/^\d{1,3}$/.test(x) || +x > 255) return null;
      n = n * 256 + (+x);
    }
    return n;
  }
  const ipValida = ip => ipNum(ip) !== null;
  function mascaraValida(m) {
    const n = ipNum(m);
    if (n === null || n === 0) return false;
    const inv = (~n) >>> 0;
    return ((inv + 1) & inv) === 0; // unos seguidos de ceros
  }
  function prefijo(m) { const n = ipNum(m); let c = 0; for (let i = 31; i >= 0; i--) if ((n >>> i) & 1) c++; return c; }
  function red(ip, m) { return (ipNum(ip) & ipNum(m)) >>> 0; }
  function numIp(n) { return [n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.'); }
  function mismaRed(a, b, m) { return ipValida(a) && ipValida(b) && mascaraValida(m) && red(a, m) === red(b, m); }
  const redTexto = (ip, m) => numIp(red(ip, m)) + '/' + prefijo(m);

  let contadorMac = 0x10;
  function nuevaMac(semilla) {
    contadorMac++;
    const s = (semilla || 0) + contadorMac;
    const h = n => n.toString(16).toUpperCase().padStart(2, '0');
    return ['00', '1A', '2B', h((s * 37) & 255), h((s * 91 + 7) & 255), h(s & 255)].join(':');
  }

  /* ---------- La red ---------- */
  class Red {
    constructor(spec) {
      this.devs = [];
      this.links = [];
      this.sig = 1;
      if (spec) this.cargar(spec);
    }

    cargar(spec) {
      (spec.devices || []).forEach(d => this.agregar(d.tipo, d.x, d.y, d));
      (spec.links || []).forEach(l => {
        const r = Array.isArray(l) ? this.conectar(l[0], l[1], l[2], l[3]) : this.conectar(l.a, l.b, l.pa, l.pb);
        if (typeof r === 'string') console.warn('Enlace inicial:', r);
      });
    }

    nombreLibre(tipo) {
      const base = TIPOS[tipo].nombre;
      let i = 1;
      while (this.dev(base + i)) i++;
      return base + i;
    }

    agregar(tipo, x, y, extra) {
      extra = extra || {};
      const id = extra.id || this.nombreLibre(tipo);
      const d = {
        id, tipo, nombre: id, x: x || 100, y: y || 100,
        ifaces: TIPOS[tipo].puertos.map(n => ({ n, mac: tipo === 'switch' ? null : nuevaMac(this.sig++), ip: '', mask: '', link: null })),
        gw: extra.gw || '', arp: {}, tablaMac: {}
      };
      if (esHost(d)) {
        d.ifaces[0].ip = extra.ip || '';
        d.ifaces[0].mask = extra.mask || (extra.ip ? '255.255.255.0' : '');
      }
      if (tipo === 'router' && extra.ifs) {
        Object.keys(extra.ifs).forEach(n => {
          const f = d.ifaces.find(i => i.n === n);
          if (f) { f.ip = extra.ifs[n].ip || ''; f.mask = extra.ifs[n].mask || '255.255.255.0'; }
        });
      }
      if (tipo === 'switch') {
        d.mac = nuevaMac(this.sig++);
        d.svi = { ip: (extra.svi && extra.svi.ip) || '', mask: (extra.svi && extra.svi.mask) || '', up: !!(extra.svi && extra.svi.up) };
        d.cfg = Object.assign({ hostname: 'Switch', enableSecret: '', enablePassword: '', conPassword: '', conLogin: false, vtyPassword: '', vtyLogin: false, motd: '', cifrar: false, guardada: null }, extra.cfg || {});
        if (!extra.cfg || !extra.cfg.hostname) d.cfg.hostname = 'Switch';
        d.ifaces.forEach(f => { f.apagado = false; });
      }
      if (extra.fijo) d.fijo = true;
      if (extra.etiqueta) d.etiqueta = extra.etiqueta;
      if (extra.icono) d.icono = extra.icono;
      if (extra.nota) d.nota = extra.nota; // solo cambia el dibujo (ej. access point = switch inalámbrico)
      this.devs.push(d);
      return d;
    }

    dev(id) { return this.devs.find(d => d.id === id); }

    quitar(id) {
      this.links.filter(l => l.a === id || l.b === id).forEach(l => this.desconectar(l.id));
      this.devs = this.devs.filter(d => d.id !== id);
    }

    conectar(aId, bId, pa, pb) {
      const a = this.dev(aId), b = this.dev(bId);
      if (!a || !b) return 'No encontré uno de los equipos.';
      if (a === b) return 'Un cable necesita dos equipos distintos.';
      if (this.links.some(l => (l.a === aId && l.b === bId) || (l.a === bId && l.b === aId))) return a.nombre + ' y ' + b.nombre + ' ya están conectados.';
      const fa = pa ? a.ifaces.find(f => f.n === pa) : a.ifaces.find(f => !f.link);
      const fb = pb ? b.ifaces.find(f => f.n === pb) : b.ifaces.find(f => !f.link);
      if (!fa || fa.link) return a.nombre + ' ya no tiene puertos libres.';
      if (!fb || fb.link) return b.nombre + ' ya no tiene puertos libres.';
      const id = 'L' + (this.sig++);
      const l = { id, a: aId, pa: fa.n, b: bId, pb: fb.n };
      fa.link = id; fb.link = id;
      this.links.push(l);
      return l;
    }

    desconectar(linkId) {
      const l = this.links.find(x => x.id === linkId);
      if (!l) return;
      const fa = this.dev(l.a) && this.dev(l.a).ifaces.find(f => f.n === l.pa);
      const fb = this.dev(l.b) && this.dev(l.b).ifaces.find(f => f.n === l.pb);
      if (fa) fa.link = null;
      if (fb) fb.link = null;
      this.links = this.links.filter(x => x !== l);
    }

    unidos(aId, bId) { return this.links.some(l => (l.a === aId && l.b === bId) || (l.a === bId && l.b === aId)); }
    enlaces(id) { return this.links.filter(l => l.a === id || l.b === id); }

    otroExtremo(dev, iface) {
      const l = this.links.find(x => x.id === iface.link);
      if (!l) return null;
      const [oid, op] = l.a === dev.id && l.pa === iface.n ? [l.b, l.pb] : [l.a, l.pa];
      const o = this.dev(oid);
      return { dev: o, iface: o.ifaces.find(f => f.n === op), link: l };
    }

    /* Direcciones IP propias de un equipo (para saber si un paquete es para él) */
    ipsDe(d) {
      if (d.tipo === 'switch') return d.svi.ip && d.svi.up ? [d.svi.ip] : [];
      return d.ifaces.filter(f => f.ip).map(f => f.ip);
    }
    buscarPorIp(ip) { return this.devs.find(d => this.ipsDe(d).includes(ip)); }

    limpiarTablas() { this.devs.forEach(d => { d.arp = {}; d.tablaMac = {}; }); }

    toJSON() {
      return {
        devices: this.devs.map(d => {
          const o = { id: d.id, tipo: d.tipo, x: Math.round(d.x), y: Math.round(d.y) };
          if (d.icono) o.icono = d.icono;
          if (esHost(d)) { o.ip = d.ifaces[0].ip; o.mask = d.ifaces[0].mask; o.gw = d.gw; }
          if (d.tipo === 'router') { o.ifs = {}; d.ifaces.forEach(f => { if (f.ip) o.ifs[f.n] = { ip: f.ip, mask: f.mask }; }); }
          if (d.tipo === 'switch') { o.svi = Object.assign({}, d.svi); o.cfg = Object.assign({}, d.cfg); o.gw = d.gw; }
          return o;
        }),
        links: this.links.map(l => ({ a: l.a, pa: l.pa, b: l.b, pb: l.pb }))
      };
    }

    /* ---------- Simulación de un ping ----------
       Devuelve los pasos: en cada paso viajan varias tramas a la vez (por eso un
       switch puede "inundar") y los equipos van dejando notas en español. */
    ping(origenId, ipDestino) {
      const net = this;
      const o = this.dev(origenId);
      const pasos = [];
      let enVuelo = [];
      let notas = [];
      let exito = false, llegoA = null, fallo = null, falloSimple = null;
      const pendientes = new Map(); // dev.id -> [{nh, pkt, iface}]
      // Cada nota trae dos versiones: la técnica (con IP y MAC) y la sencilla (con nombres y analogías)
      const nota = (dev, texto, tipo, simple) => notas.push({ dev: dev && dev.id, texto, tipo: tipo || 'info', simple: simple || texto });
      // Foto de las tablas ARP y MAC después de cada paso, para que la vista las vaya llenando al ritmo de la animación
      const foto = () => { const t = {}; net.devs.forEach(d => { t[d.id] = { arp: Object.assign({}, d.arp), mac: Object.assign({}, d.tablaMac) }; }); return t; };
      const quienIp = ip => { const d = net.buscarPorIp(ip); return d ? d.nombre : 'la dirección ' + ip; };
      const quienMac = mac => { if (mac === BROADCAST) return 'todos'; const d = net.devs.find(x => x.mac === mac || x.ifaces.some(f => f.mac === mac)); return d ? d.nombre : 'un equipo desconocido'; };

      function enviarTrama(dev, iface, trama) {
        if (!iface.link) { nota(dev, 'El puerto ' + iface.n + ' de ' + dev.nombre + ' no tiene cable: la trama no puede salir.', 'error', dev.nombre + ' no tiene cable conectado ahí. El mensaje no tiene por dónde salir.'); return false; }
        if (iface.apagado) { nota(dev, 'El puerto ' + iface.n + ' está apagado.', 'error', 'Ese puerto de ' + dev.nombre + ' está apagado: el mensaje no puede salir.'); return false; }
        const otro = net.otroExtremo(dev, iface);
        enVuelo.push({ link: otro.link.id, de: dev.id, deIf: iface.n, a: otro.dev.id, aIf: otro.iface.n, trama });
        return true;
      }

      // Interfaz con IP de un host/switch/router que sirve para llegar a ipDest
      function salida(dev, ipDest) {
        if (dev.tipo === 'switch') return dev.svi.ip ? { ip: dev.svi.ip, mask: dev.svi.mask, mac: dev.mac, puerto: null, gw: dev.gw } : null;
        if (esHost(dev)) { const f = dev.ifaces[0]; return f.ip ? { ip: f.ip, mask: f.mask, mac: f.mac, iface: f, gw: dev.gw } : null; }
        const f = dev.ifaces.find(x => x.ip && mismaRed(x.ip, ipDest, x.mask));
        return f ? { ip: f.ip, mask: f.mask, mac: f.mac, iface: f, router: true } : null;
      }

      function enviarIp(dev, pkt) {
        const s = salida(dev, pkt.dst);
        if (!s) {
          if (dev.tipo === 'router') nota(dev, dev.nombre + ' no tiene ninguna interfaz en la red de ' + pkt.dst + ', así que no sabe por dónde mandarlo y lo descarta.', 'error', dev.nombre + ' no está conectado a la «colonia» de ' + quienIp(pkt.dst) + ', así que no sabe por dónde mandarlo y lo tira.');
          else nota(dev, dev.nombre + ' no tiene dirección IP. Sin dirección no puede enviar nada.', 'error', dev.nombre + ' no tiene dirección (IP). Es como una casa sin número: no puede mandar ni recibir cartas.');
          return false;
        }
        if (!mascaraValida(s.mask)) { nota(dev, 'La máscara de ' + dev.nombre + ' (' + (s.mask || 'vacía') + ') no es válida.', 'error', 'La máscara de ' + dev.nombre + ' está mal escrita, así que no sabe cuál es su colonia. Usa 255.255.255.0.'); return false; }
        let nh;
        if (mismaRed(s.ip, pkt.dst, s.mask)) {
          nh = pkt.dst;
          if (!s.router) nota(dev, dev.nombre + ' compara: ' + pkt.dst + ' está en su misma red (' + redTexto(s.ip, s.mask) + '), así que se lo puede mandar directo.', 'info', dev.nombre + ' revisa la dirección: ' + quienIp(pkt.dst) + ' vive en su misma «colonia» (red). Se lo puede llevar directo, sin pasar por un router.');
        } else {
          if (!s.gw) { nota(dev, pkt.dst + ' está en otra red y ' + dev.nombre + ' no tiene puerta de enlace (gateway). No sabe a quién pedirle que lo lleve.', 'error', quienIp(pkt.dst) + ' vive en otra «colonia» (otra red). ' + dev.nombre + ' necesita un router que lo lleve, pero no sabe cuál es: le falta la puerta de enlace.'); return false; }
          if (!mismaRed(s.ip, s.gw, s.mask)) { nota(dev, 'La puerta de enlace ' + s.gw + ' no está en la red de ' + dev.nombre + '. Así no la puede alcanzar.', 'error', 'La puerta de enlace de ' + dev.nombre + ' tiene una dirección de otra colonia. Debe ser la del router en SU misma red.'); return false; }
          nh = s.gw;
          nota(dev, pkt.dst + ' está en otra red. ' + dev.nombre + ' se lo entrega a su puerta de enlace ' + s.gw + '.', 'info', quienIp(pkt.dst) + ' vive en otra «colonia» (otra red). ' + dev.nombre + ' no puede llevárselo directo: se lo da a ' + quienIp(s.gw) + ', su puerta de salida (puerta de enlace).');
        }
        const salidaFisica = () => {
          if (dev.tipo !== 'switch') return s.iface;
          const p = dev.tablaMac[dev.arp[nh]];
          return p ? dev.ifaces.find(f => f.n === p) : null;
        };
        const macNh = dev.arp[nh];
        if (macNh) {
          const trama = { tipo: 'ICMP', src: s.mac, dst: macNh, ip: pkt };
          nota(dev, dev.nombre + ' ya conoce la MAC de ' + nh + ' (está en su tabla ARP): ' + macNh + '. Arma la trama y la envía.', 'info', dev.nombre + ' ya tiene apuntado el gafete (MAC) de ' + quienIp(nh) + '. Mete el mensaje en un sobre dirigido a ' + quienIp(nh) + ' y lo manda.');
          if (dev.tipo === 'switch') return inundarDesdeSwitch(dev, null, trama, true);
          return enviarTrama(dev, salidaFisica(), trama);
        }
        if (!pendientes.has(dev.id)) pendientes.set(dev.id, []);
        pendientes.get(dev.id).push({ nh, pkt });
        nota(dev, dev.nombre + ' no conoce la MAC de ' + nh + '. Primero pregunta a todos con ARP: «¿Quién tiene la IP ' + nh + '?»', 'arp', dev.nombre + ' sabe la dirección de ' + quienIp(nh) + ', pero no su gafete (MAC), y sin él no puede escribir el sobre. Pregunta en voz alta a todos: «¿quién tiene la dirección ' + nh + '?» (es ' + quienIp(nh) + ').');
        const arp = { tipo: 'ARP', src: s.mac, dst: BROADCAST, arp: { op: 'request', ipEmisor: s.ip, macEmisor: s.mac, ipBuscada: nh } };
        if (dev.tipo === 'switch') return inundarDesdeSwitch(dev, null, arp, true);
        return enviarTrama(dev, s.iface, arp);
      }

      // Un switch que origina o reenvía una trama
      function inundarDesdeSwitch(sw, entrada, trama, propia) {
        const conocido = trama.dst !== BROADCAST && sw.tablaMac[trama.dst];
        if (conocido) {
          if (conocido === entrada) { nota(sw, sw.nombre + ' ve que el destino está en el mismo puerto por el que llegó, así que no la reenvía.', 'info', sw.nombre + ' ve que el destinatario está del mismo lado de donde vino el mensaje. No lo reenvía.'); return true; }
          if (!propia) nota(sw, sw.nombre + ' busca ' + trama.dst + ' en su tabla de direcciones MAC: está en el puerto ' + conocido + '. La envía solo por ahí.', 'switch', sw.nombre + ' revisa su libreta: ' + quienMac(trama.dst) + ' está conectado en su puerto ' + conocido + '. Manda el sobre solo por ese cable.');
          return enviarTrama(sw, sw.ifaces.find(f => f.n === conocido), trama);
        }
        const salen = sw.ifaces.filter(f => f.link && f.n !== entrada && !f.apagado);
        if (!propia) {
          if (trama.dst === BROADCAST) nota(sw, 'Es una difusión (MAC FF:FF:FF:FF:FF:FF). ' + sw.nombre + ' la copia por todos sus puertos menos por donde llegó.', 'switch', 'Es una pregunta para todos. ' + sw.nombre + ' la copia por todos sus cables, menos por el que llegó.');
          else nota(sw, sw.nombre + ' todavía no sabe en qué puerto está ' + trama.dst + '. La copia por todos los demás puertos (inundación).', 'switch', sw.nombre + ' todavía no sabe por qué cable está ' + quienMac(trama.dst) + '. Para no fallar, lo copia por todos los demás cables.');
        }
        salen.forEach(f => enviarTrama(sw, f, trama));
        return true;
      }

      function recibirComoHost(dev, iface, trama) {
        const mias = dev.tipo === 'switch' ? (dev.svi.ip && dev.svi.up ? [{ ip: dev.svi.ip, mac: dev.mac }] : []) : dev.ifaces.filter(f => f.ip).map(f => ({ ip: f.ip, mac: f.mac, f }));
        const macPropia = dev.tipo === 'switch' ? dev.mac : iface.mac;
        if (trama.dst !== BROADCAST && trama.dst !== macPropia) {
          nota(dev, dev.nombre + ' revisa la MAC de destino: no es la suya. Ignora la trama.', 'ignora', dev.nombre + ' ve que el sobre no es para él. Lo ignora.');
          return;
        }
        if (trama.tipo === 'ARP') {
          const a = trama.arp;
          const propia = dev.tipo === 'router' ? mias.find(m => m.f === iface && m.ip === a.ipBuscada) : mias.find(m => m.ip === a.ipBuscada);
          if (a.op === 'request') {
            if (!propia) { nota(dev, dev.nombre + ' escucha la pregunta ARP, pero ' + a.ipBuscada + ' no es su IP. No contesta.', 'ignora', dev.nombre + ' oye la pregunta, pero esa no es su dirección. Se queda callado.'); return; }
            dev.arp[a.ipEmisor] = a.macEmisor;
            nota(dev, '¡' + a.ipBuscada + ' es la IP de ' + dev.nombre + '! Anota la MAC de quien preguntó y le contesta: «Soy yo, mi MAC es ' + propia.mac + '».', 'arp', '¡' + dev.nombre + ' reconoce su dirección! Le contesta solo a ' + quienIp(a.ipEmisor) + ': «Soy yo, este es mi gafete (MAC)». De paso apunta el gafete de ' + quienIp(a.ipEmisor) + '.');
            const resp = { tipo: 'ARP', src: propia.mac, dst: a.macEmisor, arp: { op: 'reply', ipEmisor: propia.ip, macEmisor: propia.mac, ipBuscada: a.ipEmisor } };
            if (dev.tipo === 'switch') inundarDesdeSwitch(dev, null, resp, true);
            else enviarTrama(dev, iface, resp);
          } else {
            dev.arp[a.ipEmisor] = a.macEmisor;
            nota(dev, dev.nombre + ' recibe la respuesta ARP y guarda en su tabla: ' + a.ipEmisor + ' → ' + a.macEmisor + '.', 'arp', dev.nombre + ' recibe la respuesta y apunta en su agenda (tabla ARP) el gafete de ' + quienIp(a.ipEmisor) + '. La próxima vez ya no tendrá que preguntar.');
            const pend = pendientes.get(dev.id) || [];
            const listos = pend.filter(p => p.nh === a.ipEmisor);
            pendientes.set(dev.id, pend.filter(p => p.nh !== a.ipEmisor));
            listos.forEach(p => enviarIp(dev, p.pkt));
          }
          return;
        }
        // ICMP
        const pkt = trama.ip;
        const esMio = mias.some(m => m.ip === pkt.dst);
        if (esMio) {
          if (pkt.icmp === 'request') {
            nota(dev, '¡El ping llegó a ' + dev.nombre + '! Contesta con un «eco» (Echo reply) hacia ' + pkt.src + '.', 'ok', '¡El mensaje llegó a ' + dev.nombre + '! Ahora contesta «¡sí te escucho!» de regreso a ' + quienIp(pkt.src) + '.');
            llegoA = dev.id;
            enviarIp(dev, { src: pkt.dst, dst: pkt.src, ttl: 64, icmp: 'reply' });
          } else if (dev.id === o.id) {
            nota(dev, dev.nombre + ' recibe la respuesta. ¡El ping funcionó!', 'ok', dev.nombre + ' recibe la respuesta. ¡Sí se pudieron comunicar!');
            exito = true;
          }
          return;
        }
        if (dev.tipo === 'router') {
          const ttl = pkt.ttl - 1;
          if (ttl <= 0) { nota(dev, 'Al paquete se le acabó el TTL y ' + dev.nombre + ' lo descarta.', 'error', 'El mensaje dio demasiadas vueltas y ' + dev.nombre + ' lo tira.'); return; }
          nota(dev, dev.nombre + ' recibe el paquete para ' + pkt.dst + '. Quita el «sobre» Ethernet, revisa la IP de destino y busca por qué interfaz sale.', 'router', dev.nombre + ' (el router) recibe el mensaje para ' + quienIp(pkt.dst) + '. Tira el sobre de afuera, lee la dirección final y decide por cuál de sus cables sale. Le pondrá un sobre nuevo.');
          enviarIp(dev, Object.assign({}, pkt, { ttl }));
          return;
        }
        nota(dev, dev.nombre + ' recibe un paquete que no es para su IP y lo descarta.', 'ignora', dev.nombre + ' recibe un mensaje que no es para él y lo tira.');
      }

      function recibir(t) {
        const dev = net.dev(t.a);
        const iface = dev.ifaces.find(f => f.n === t.aIf);
        const tr = t.trama;
        if (dev.tipo === 'switch') {
          const antes = dev.tablaMac[tr.src];
          dev.tablaMac[tr.src] = iface.n;
          if (antes !== iface.n) nota(dev, dev.nombre + ' aprende: la MAC ' + tr.src + ' está en su puerto ' + iface.n + '. La anota en su tabla.', 'switch', dev.nombre + ' apunta en su libreta: «' + quienMac(tr.src) + ' está conectado en mi puerto ' + iface.n + '».');
          const paraSvi = dev.svi.ip && dev.svi.up && (tr.dst === dev.mac || tr.dst === BROADCAST);
          if (tr.dst !== dev.mac) inundarDesdeSwitch(dev, iface.n, tr, false);
          if (paraSvi) recibirComoHost(dev, iface, tr);
          return;
        }
        recibirComoHost(dev, iface, tr);
      }

      // Validaciones previas, explicadas como lo haría un profe
      if (!o) return { ok: false, pasos, fallo: 'No existe el equipo de origen.' };
      if (!ipValida(ipDestino)) return { ok: false, pasos, fallo: 'La dirección de destino «' + ipDestino + '» no es una IP válida.' };
      const sO = salida(o, ipDestino) || (o.tipo !== 'router' ? null : o.ifaces.find(f => f.ip));
      if (!sO) return { ok: false, pasos, fallo: o.nombre + ' no tiene dirección IP. Dale una en su panel antes de enviar.' };
      if (o.tipo !== 'switch' && o.tipo !== 'router' && !o.ifaces[0].link) return { ok: false, pasos, fallo: o.nombre + ' no tiene cable conectado. Conéctalo a la red primero.' };

      if (this.ipsDe(o).includes(ipDestino)) return { ok: false, pasos, fallo: ipDestino + ' es la IP del propio ' + o.nombre + '. Elige la IP de otro equipo.' };
      notas = [];
      const ipO = sO.ip;
      nota(o, o.nombre + ' prepara un ping (ICMP Echo request) desde ' + ipO + ' hacia ' + ipDestino + '.', 'inicio', o.nombre + ' quiere saber si ' + quienIp(ipDestino) + ' le contesta. Prepara un ping: un mensajito de «¿me escuchas?».');
      if (o.tipo === 'router') {
        enviarIp(o, { src: ipO, dst: ipDestino, ttl: 64, icmp: 'request' });
      } else {
        enviarIp(o, { src: ipO, dst: ipDestino, ttl: 64, icmp: 'request' });
      }
      pasos.push({ tx: [], notas, tablas: foto() });

      let guardia = 0;
      while (enVuelo.length && guardia++ < 40) {
        const ahora = enVuelo;
        enVuelo = [];
        notas = [];
        ahora.forEach(recibir);
        pasos.push({ tx: ahora, notas, tablas: foto() });
        if (exito) break;
      }
      if (guardia >= 40) fallo = 'Las tramas dieron vueltas sin parar: hay un ciclo (bucle) en los cables entre switches. En una red real esto causa una «tormenta de difusión».';
      if (!exito && !fallo) {
        const errores = pasos.flatMap(p => p.notas).filter(n => n.tipo === 'error');
        const destino = this.buscarPorIp(ipDestino);
        const sviApagada = this.devs.find(d => d.tipo === 'switch' && d.svi.ip === ipDestino && !d.svi.up);
        if (errores.length) { fallo = errores[errores.length - 1].texto; falloSimple = errores[errores.length - 1].simple; }
        else if (sviApagada) fallo = sviApagada.nombre + ' tiene la IP ' + ipDestino + ', pero su interfaz VLAN 1 está apagada. En la consola falta el comando «no shutdown».';
        else if (!destino) fallo = 'Nadie en la red tiene la IP ' + ipDestino + '. Nadie contestó la pregunta ARP.';
        else if (llegoA) fallo = 'El ping llegó a ' + this.dev(llegoA).nombre + ', pero la respuesta no pudo regresar. Revisa la configuración de ' + this.dev(llegoA).nombre + '.';
        else fallo = destino.nombre + ' sí tiene la IP ' + ipDestino + ', pero el mensaje nunca le llegó. Revisa que haya cables formando un camino hasta él.';
      }
      return { ok: exito, pasos, fallo: exito ? null : fallo, falloSimple: exito ? null : (falloSimple || fallo), origen: o.id, destino: ipDestino, llegoA };
    }
  }

  const NetSim = { Red, TIPOS, BROADCAST, ipValida, mascaraValida, mismaRed, redTexto, prefijo, esHost };
  if (typeof module !== 'undefined' && module.exports) module.exports = NetSim;
  else root.NetSim = NetSim;
})(typeof window !== 'undefined' ? window : globalThis);
