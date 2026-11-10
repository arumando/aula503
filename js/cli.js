/* Aula 503 — consola tipo Cisco IOS para los switches del simulador.
   Acepta abreviaturas (en, conf t, sh run…), igual que un switch real. */
(function (root) {
  'use strict';

  const ERR_INV = "% Invalid input detected at '^' marker.";
  const ERR_INC = '% Incomplete command.';

  function Consola(sw, red, alCambiar) {
    this.sw = sw;
    this.red = red;
    this.alCambiar = alCambiar || function () {};
    this.modo = 'user';          // user | priv | config | line | if
    this.linea = null;           // 'con' | 'vty'
    this.iface = null;           // 'vlan1' | nombre de puerto
    this.esperando = null;       // 'enable' | 'login' | 'return'
    this.intentos = 0;
    this.historial = [];
    this.registro = new Set();   // comandos usados (para las misiones)
  }

  Consola.prototype.prompt = function () {
    const h = this.sw.cfg.hostname;
    if (this.esperando === 'enable' || this.esperando === 'login') return 'Password: ';
    if (this.esperando === 'return') return '';
    return h + ({ user: '>', priv: '#', config: '(config)#', line: '(config-line)#', if: '(config-if)#' })[this.modo];
  };

  Consola.prototype.bienvenida = function () {
    const c = this.sw.cfg;
    const out = [];
    if (c.motd) out.push(c.motd, '');
    if (c.conLogin && c.conPassword) { this.esperando = 'login'; out.push('User Access Verification', ''); }
    return out;
  };

  // Empata palabras abreviadas contra una lista de comandos
  function empatar(tokens, comandos) {
    let candidatos = comandos.slice();
    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i].toLowerCase();
      const conPalabra = candidatos.filter(c => i < c.w.length);
      const conArgs = candidatos.filter(c => i >= c.w.length);
      if (!conPalabra.length) break;
      const iguales = conPalabra.filter(c => c.w[i] === t);
      const prefijo = conPalabra.filter(c => c.w[i].startsWith(t));
      const palabras = new Set(prefijo.map(c => c.w[i]));
      if (iguales.length) candidatos = iguales;
      else if (palabras.size === 1) candidatos = prefijo;
      else if (palabras.size > 1) return { error: '% Ambiguous command:  "' + tokens.slice(0, i + 1).join(' ') + '"' };
      else if (conArgs.length) { candidatos = conArgs; break; }
      else return { error: ERR_INV, pos: i };
    }
    const completos = candidatos.filter(c => tokens.length >= c.w.length);
    if (!completos.length) return { error: ERR_INC };
    completos.sort((a, b) => b.w.length - a.w.length);
    const c = completos[0];
    return { cmd: c, args: tokens.slice(c.w.length) };
  }

  Consola.prototype.comandos = function () {
    const self = this, sw = this.sw, c = sw.cfg;
    const cambio = () => { c.guardada = c.guardada; self.alCambiar(); };
    const comunes = [
      { w: ['end'], f: () => { self.modo = 'priv'; return []; }, en: ['config', 'line', 'if'] },
      { w: ['exit'], f: () => { if (self.modo === 'line' || self.modo === 'if') self.modo = 'config'; else if (self.modo === 'config') self.modo = 'priv'; return []; }, en: ['config', 'line', 'if'] },
      { w: ['do'], f: a => self.ejecutar(a.join(' '), true), en: ['config', 'line', 'if'] }
    ];
    const show = [
      { w: ['show', 'running-config'], f: () => self.runningConfig() },
      { w: ['show', 'startup-config'], f: () => c.guardada ? self.runningConfig(c.guardada) : ['startup-config is not present'] },
      { w: ['show', 'ip', 'interface', 'brief'], f: () => self.ipBrief() },
      { w: ['show', 'mac', 'address-table'], f: () => self.tablaMac() },
      { w: ['show', 'version'], f: () => ['Cisco IOS Software, C2960 Software (C2960-LANBASEK9-M), Version 15.0(2)SE4', 'Simulador del Aula 503', '', sw.cfg.hostname + ' uptime is 12 minutes'] }
    ];
    return {
      user: [
        { w: ['enable'], f: () => {
          const secreta = c.enableSecret || c.enablePassword;
          if (secreta) { self.esperando = 'enable'; self.intentos = 0; return []; }
          self.modo = 'priv'; return [];
        } },
        { w: ['ping'], f: a => self.ping(a) },
        { w: ['exit'], f: () => self.salir() },
        { w: ['logout'], f: () => self.salir() },
        ...show.filter(s => s.w[1] === 'version' || s.w[1] === 'ip')
      ],
      priv: [
        { w: ['configure', 'terminal'], f: () => { self.modo = 'config'; return ['Enter configuration commands, one per line.  End with CNTL/Z.']; } },
        { w: ['disable'], f: () => { self.modo = 'user'; return []; } },
        { w: ['exit'], f: () => self.salir() },
        { w: ['copy', 'running-config', 'startup-config'], f: () => {
          c.guardada = JSON.parse(JSON.stringify({ cfg: Object.assign({}, c, { guardada: null }), svi: sw.svi, gw: sw.gw }));
          cambio();
          return ['Destination filename [startup-config]? ', 'Building configuration...', '[OK]'];
        } },
        { w: ['write', 'memory'], f: () => self.ejecutar('copy running-config startup-config', true) },
        { w: ['write'], f: () => self.ejecutar('copy running-config startup-config', true) },
        { w: ['ping'], f: a => self.ping(a) },
        { w: ['clear', 'mac', 'address-table'], f: () => { sw.tablaMac = {}; cambio(); return []; } },
        ...show
      ],
      config: [
        { w: ['hostname'], n: 1, f: a => { c.hostname = a[0]; cambio(); return []; } },
        { w: ['enable', 'secret'], n: 1, f: a => { c.enableSecret = a.join(' '); cambio(); return []; } },
        { w: ['enable', 'password'], n: 1, f: a => { c.enablePassword = a.join(' '); cambio(); return []; } },
        { w: ['no', 'enable', 'secret'], f: () => { c.enableSecret = ''; cambio(); return []; } },
        { w: ['no', 'enable', 'password'], f: () => { c.enablePassword = ''; cambio(); return []; } },
        { w: ['service', 'password-encryption'], f: () => { c.cifrar = true; cambio(); return []; } },
        { w: ['no', 'service', 'password-encryption'], f: () => { c.cifrar = false; cambio(); return []; } },
        { w: ['banner', 'motd'], n: 1, f: a => {
          const t = a.join(' ');
          const d = t[0];
          const fin = t.indexOf(d, 1);
          if (fin < 0) return ['% Escribe el mensaje entre dos caracteres iguales, por ejemplo: banner motd #Solo personal autorizado#'];
          c.motd = t.slice(1, fin); cambio(); return [];
        } },
        { w: ['no', 'banner', 'motd'], f: () => { c.motd = ''; cambio(); return []; } },
        { w: ['line', 'console', '0'], f: () => { self.modo = 'line'; self.linea = 'con'; return []; } },
        { w: ['line', 'vty', '0', '15'], f: () => { self.modo = 'line'; self.linea = 'vty'; return []; } },
        { w: ['line', 'vty', '0', '4'], f: () => { self.modo = 'line'; self.linea = 'vty'; return []; } },
        { w: ['interface', 'vlan', '1'], f: () => { self.modo = 'if'; self.iface = 'vlan1'; return []; } },
        { w: ['interface'], n: 1, f: a => {
          const nombre = normalizarPuerto(a.join(''));
          if (/^vlan1$/i.test(a.join(''))) { self.modo = 'if'; self.iface = 'vlan1'; return []; }
          const p = sw.ifaces.find(f => f.n.toLowerCase() === (nombre || '').toLowerCase());
          if (!p) return [ERR_INV];
          self.modo = 'if'; self.iface = p.n; return [];
        } },
        { w: ['ip', 'default-gateway'], n: 1, f: a => { if (!NetSim.ipValida(a[0])) return [ERR_INV]; sw.gw = a[0]; cambio(); return []; } },
        { w: ['no', 'ip', 'default-gateway'], f: () => { sw.gw = ''; cambio(); return []; } },
        ...comunes.filter(x => x.en.includes('config'))
      ],
      line: [
        { w: ['password'], n: 1, f: a => { if (self.linea === 'con') c.conPassword = a.join(' '); else c.vtyPassword = a.join(' '); cambio(); return []; } },
        { w: ['login'], f: () => { if (self.linea === 'con') c.conLogin = true; else c.vtyLogin = true; cambio(); return []; } },
        { w: ['no', 'login'], f: () => { if (self.linea === 'con') c.conLogin = false; else c.vtyLogin = false; cambio(); return []; } },
        { w: ['no', 'password'], f: () => { if (self.linea === 'con') c.conPassword = ''; else c.vtyPassword = ''; cambio(); return []; } },
        ...comunes.filter(x => x.en.includes('line'))
      ],
      if: [
        { w: ['ip', 'address'], n: 2, f: a => {
          if (self.iface !== 'vlan1') return ['% IP addresses may not be configured on L2 links.'];
          if (!NetSim.ipValida(a[0]) || !NetSim.mascaraValida(a[1])) return [ERR_INV];
          sw.svi.ip = a[0]; sw.svi.mask = a[1]; sw.arp = {}; cambio(); return [];
        } },
        { w: ['no', 'ip', 'address'], f: () => { if (self.iface === 'vlan1') { sw.svi.ip = ''; sw.svi.mask = ''; cambio(); } return []; } },
        { w: ['no', 'shutdown'], f: () => {
          if (self.iface === 'vlan1') {
            const antes = sw.svi.up; sw.svi.up = true; cambio();
            return antes ? [] : ['%LINK-5-CHANGED: Interface Vlan1, changed state to up', '%LINEPROTO-5-UPDOWN: Line protocol on Interface Vlan1, changed state to up'];
          }
          const p = sw.ifaces.find(f => f.n === self.iface); p.apagado = false; cambio(); return [];
        } },
        { w: ['shutdown'], f: () => {
          if (self.iface === 'vlan1') { sw.svi.up = false; cambio(); return ['%LINK-5-CHANGED: Interface Vlan1, changed state to administratively down']; }
          const p = sw.ifaces.find(f => f.n === self.iface); p.apagado = true; cambio(); return ['%LINK-5-CHANGED: Interface ' + (p.n[0] === 'F' ? 'FastEthernet' : 'GigabitEthernet') + p.n.slice(2) + ', changed state to administratively down'];
        } },
        { w: ['description'], n: 1, f: () => [] },
        ...comunes.filter(x => x.en.includes('if'))
      ]
    };
  };

  function normalizarPuerto(t) {
    const m = String(t).toLowerCase().match(/^(f|fa|fas|fast|fastethernet|g|gi|gig|gigabitethernet)(\d+\/\d+)$/);
    if (!m) return null;
    return (m[1][0] === 'f' ? 'Fa' : 'Gi') + m[2];
  }

  Consola.prototype.ayuda = function () {
    const lista = this.comandos()[this.modo];
    const vistos = new Set();
    const out = [];
    lista.forEach(c => { const w = c.w[0]; if (!vistos.has(w)) { vistos.add(w); out.push('  ' + w); } });
    return out;
  };

  Consola.prototype.salir = function () {
    this.modo = 'user';
    this.esperando = 'return';
    return ['', this.sw.cfg.hostname + ' con0 is now available', '', '', 'Press RETURN to get started.'];
  };

  // Procesa una línea. Devuelve las líneas de salida.
  Consola.prototype.ejecutar = function (texto, interno) {
    const sw = this.sw, c = sw.cfg;
    if (this.esperando === 'return') { this.esperando = null; return this.bienvenida(); }
    if (this.esperando === 'login') {
      if (texto === c.conPassword) { this.esperando = null; this.registro.add('login-ok'); return []; }
      return ['% Login invalid', ''];
    }
    if (this.esperando === 'enable') {
      const ok = c.enableSecret ? texto === c.enableSecret : texto === c.enablePassword;
      if (ok) { this.esperando = null; this.modo = 'priv'; this.registro.add('enable-pass'); return []; }
      this.intentos++;
      if (this.intentos >= 3) { this.esperando = null; return ['% Bad secrets']; }
      return [];
    }
    let t = texto.trim();
    if (!t) return [];
    let filtro = null;
    const tubo = t.match(/^(.*?)\s*\|\s*(i|in|inc|incl|include|b|be|begin)\s+(.+)$/i);
    if (tubo) { t = tubo[1]; filtro = { tipo: tubo[2][0].toLowerCase(), texto: tubo[3].toLowerCase() }; }
    if (!interno) this.historial.push(t);
    if (t === '?' || t.endsWith(' ?')) return this.ayuda();
    const tokens = t.split(/\s+/);
    const lista = this.comandos()[this.modo];
    let r = empatar(tokens, lista);
    if (r.error && (this.modo === 'line' || this.modo === 'if')) {
      // Como en IOS: desde un submodo se pueden escribir comandos de configuración global
      const r2 = empatar(tokens, this.comandos().config);
      if (!r2.error && !['exit', 'end', 'do'].includes(r2.cmd.w[0])) { this.modo = 'config'; r = r2; }
    }
    if (r.error) {
      if (r.pos !== undefined) {
        const offset = this.prompt().length + tokens.slice(0, r.pos).join(' ').length + (r.pos ? 1 : 0);
        return [' '.repeat(Math.max(0, offset)) + '^', r.error];
      }
      return [r.error];
    }
    if (r.cmd.n && r.args.length < r.cmd.n) return [ERR_INC];
    this.registro.add(r.cmd.w.join(' '));
    let salida = r.cmd.f(r.args) || [];
    if (filtro && filtro.tipo === 'i') salida = salida.filter(l => l.toLowerCase().includes(filtro.texto));
    if (filtro && filtro.tipo === 'b') { const k = salida.findIndex(l => l.toLowerCase().includes(filtro.texto)); salida = k < 0 ? [] : salida.slice(k); }
    return salida;
  };

  Consola.prototype.ping = function (a) {
    if (!a[0]) return [ERR_INC];
    const sw = this.sw;
    if (!sw.svi.ip || !sw.svi.up) return ['% El switch no tiene una IP activa (interface vlan 1 → ip address → no shutdown).'];
    const r = this.red.ping(sw.id, a[0]);
    this.alCambiar();
    const out = ['Type escape sequence to abort.', 'Sending 5, 100-byte ICMP Echos to ' + a[0] + ', timeout is 2 seconds:'];
    out.push(r.ok ? '.!!!!' : '.....');
    out.push(r.ok ? 'Success rate is 80 percent (4/5), round-trip min/avg/max = 1/1/2 ms' : 'Success rate is 0 percent (0/5)');
    return out;
  };

  Consola.prototype.ipBrief = function () {
    const sw = this.sw;
    const fila = (n, ip, ok, st, pr) => (n.padEnd(23) + ip.padEnd(16) + ok.padEnd(4) + 'manual ' + st.padEnd(22) + pr);
    const out = ['Interface              IP-Address      OK? Method Status                Protocol'];
    sw.ifaces.forEach(f => {
      const st = f.apagado ? 'administratively down' : f.link ? 'up' : 'down';
      out.push(fila((f.n[0] === 'F' ? 'FastEthernet' : 'GigabitEthernet') + f.n.slice(2), 'unassigned', 'YES', st, f.link && !f.apagado ? 'up' : 'down'));
    });
    out.push(fila('Vlan1', sw.svi.ip || 'unassigned', 'YES', sw.svi.up ? 'up' : 'administratively down', sw.svi.up ? 'up' : 'down'));
    return out;
  };

  Consola.prototype.tablaMac = function () {
    const out = ['          Mac Address Table', '-------------------------------------------', '', 'Vlan    Mac Address       Type        Ports', '----    -----------       --------    -----'];
    Object.keys(this.sw.tablaMac).forEach(m => out.push('   1    ' + m.toLowerCase().replace(/:/g, '').replace(/(.{4})(?=.)/g, '$1.') + '    DYNAMIC     ' + this.sw.tablaMac[m]));
    if (out.length === 5) out.push('(vacía: el switch todavía no ha visto tramas)');
    return out;
  };

  function cifrado(p) { let h = 0; for (const ch of p) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return '0822455D0A16' + h.toString(16).toUpperCase(); }
  function hashSecret(p) { let h = 7; for (const ch of p) h = (h * 131 + ch.charCodeAt(0)) >>> 0; return '$1$mERr$' + h.toString(36) + 'Kq9.Xb1'; }

  Consola.prototype.runningConfig = function (copia) {
    const sw = this.sw;
    const c = copia ? copia.cfg : sw.cfg, svi = copia ? copia.svi : sw.svi, gw = copia ? copia.gw : sw.gw;
    const pw = p => c.cifrar ? '7 ' + cifrado(p) : p;
    const out = ['Building configuration...', '', 'Current configuration : 1182 bytes', '!', 'version 15.0', c.cifrar ? 'service password-encryption' : 'no service password-encryption', '!', 'hostname ' + c.hostname, '!'];
    if (c.enableSecret) out.push('enable secret 5 ' + hashSecret(c.enableSecret));
    if (c.enablePassword) out.push('enable password ' + pw(c.enablePassword));
    out.push('!');
    sw.ifaces.forEach(f => { out.push('interface ' + (f.n[0] === 'F' ? 'FastEthernet' : 'GigabitEthernet') + f.n.slice(2)); if (f.apagado) out.push(' shutdown'); out.push('!'); });
    out.push('interface Vlan1');
    out.push(svi.ip ? ' ip address ' + svi.ip + ' ' + svi.mask : ' no ip address');
    if (!svi.up) out.push(' shutdown');
    out.push('!');
    if (gw) out.push('ip default-gateway ' + gw, '!');
    if (c.motd) out.push('banner motd ^C' + c.motd + '^C', '!');
    out.push('line con 0');
    if (c.conPassword) out.push(' password ' + pw(c.conPassword));
    if (c.conLogin) out.push(' login');
    out.push('!', 'line vty 0 4');
    if (c.vtyPassword) out.push(' password ' + pw(c.vtyPassword));
    out.push(c.vtyLogin ? ' login' : ' login', '!', 'end');
    return out;
  };

  root.Consola = Consola;
  if (typeof module !== 'undefined' && module.exports) module.exports = Consola;
})(typeof window !== 'undefined' ? window : globalThis);
