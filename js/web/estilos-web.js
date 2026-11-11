/* Aula 503 · Academia Web — estilos del laboratorio y de las lecciones.
   Usan los mismos tokens de color de Aula 503 (--accent, --surface, --line…). */
(function () {
  if (document.getElementById('aula-web-css')) return;
  const css = `
.cl{--izq:52%;background:var(--surface);border:1.5px solid var(--line);border-radius:16px;overflow:hidden;display:flex;flex-direction:column;min-width:0;box-shadow:var(--sombra)}
.cl-barra{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:space-between;padding:6px 8px;border-bottom:1.5px solid var(--line);background:var(--surface-2)}
.cl-archivos{display:flex;gap:4px;flex-wrap:wrap;min-width:0}
.cl-archivos button,.cl-pest button{border:1.5px solid transparent;background:none;border-radius:9px;padding:.3em .7em;font:600 .82rem var(--f-mono);color:var(--muted);cursor:pointer}
.cl-archivos button[aria-selected=true]{background:var(--surface);border-color:var(--line);color:var(--fg)}
.cl-acciones{display:flex;gap:6px;align-items:center;flex-wrap:wrap}
.cl-btn{border:1.5px solid var(--line);background:var(--surface);border-radius:10px;padding:.35em .8em;font-weight:700;font-size:.88rem;cursor:pointer;box-shadow:0 2px 0 var(--line)}
.cl-btn:active{transform:translateY(1px);box-shadow:none}
.cl-run{background:var(--ok);border-color:var(--ok);color:#fff;box-shadow:0 2px 0 var(--ok-deep)}
.cl-auto{display:flex;gap:4px;align-items:center;font-size:.82rem;color:var(--muted);cursor:pointer}
.cl-cuerpo{display:flex;height:min(560px,75vh);min-height:340px}
.cl-editor{flex:0 0 var(--izq);min-width:0;display:flex;flex-direction:column}
.cl-editor .CodeMirror{height:100%;font:13.5px/1.55 var(--f-mono);background:var(--surface);color:var(--fg)}
.cl-div{flex:0 0 8px;cursor:col-resize;background:var(--surface-2);border-inline:1px solid var(--line);position:relative;touch-action:none}
.cl-div::after{content:"";position:absolute;inset:45% 2px;border-radius:2px;background:var(--line)}
.cl-div:hover,.cl-div:focus-visible{background:var(--accent-soft)}
.cl-salida{flex:1;min-width:0;display:flex;flex-direction:column;background:var(--surface)}
.cl-pest{display:flex;gap:2px;padding:4px 6px;border-bottom:1.5px solid var(--line);flex-wrap:wrap;flex:none}
.cl-pest button{font-family:var(--f-ui);font-size:.85rem;white-space:nowrap}
.cl-pest button[aria-selected=true]{color:var(--accent);background:var(--accent-soft)}
.cl-badge{background:var(--muted);color:var(--surface);border-radius:999px;font-size:.7rem;padding:0 .45em}
.cl-badge.mal{background:var(--mal);color:#fff}
.cl [hidden],.wa [hidden]{display:none!important}
.cl-panel{flex:1;min-height:0;overflow:auto;padding:10px;font-size:.9rem}
.cl-p-res{padding:0;display:flex;flex-direction:column;background:#fff}
.cl-frame-wrap{flex:1;min-height:0;display:flex}
.cl-frame{flex:1;border:0;width:100%;height:100%;background:#fff}
.cl-mini{flex:none;font:12.5px/1.5 var(--f-mono);padding:6px 10px;border-top:1.5px solid var(--line);background:var(--surface-2);color:var(--fg);max-height:38%;overflow:auto}
.cl-mini.vacia{display:none}
.cl-mini.mal{background:var(--mal-soft);color:var(--fg);border-top-color:var(--mal)}
.cl-mini-t{color:var(--muted);font-size:.75rem;text-transform:uppercase;letter-spacing:.05em}
.cl-mas{color:var(--muted)}
.cl-ayuda{font-family:var(--f-ui);margin-top:4px}
.cl-vacio{color:var(--muted);font-size:.88rem}
.cl-log{font:12.5px/1.5 var(--f-mono);padding:4px 6px;border-bottom:1px solid var(--line);white-space:pre-wrap;word-break:break-word}
.cl-log.error{background:var(--mal-soft)}.cl-log.warn{background:var(--amber-soft)}.cl-log.evento{color:var(--muted)}.cl-log.eval{color:var(--accent)}
.cl-eval{display:flex;gap:6px;align-items:center;margin-top:8px;font-family:var(--f-mono)}
.cl-eval input{flex:1;min-width:0;border:1.5px solid var(--line);border-radius:8px;padding:.3em .5em;background:var(--surface);font:12.5px var(--f-mono)}
.v-s{color:#0b7a3e}.v-n{color:#1d4fd2}.v-b{color:#a1309d}.v-u{color:var(--muted);font-style:italic}.v-f{color:#b05d00}.v-e{color:#0a6c88}.v-a{color:var(--fg)}.v-k{color:#7a4bc4}
@media (prefers-color-scheme:dark){:root:not([data-theme=light]) .v-s{color:#6fd39a}:root:not([data-theme=light]) .v-n{color:#7fb0ff}:root:not([data-theme=light]) .v-b{color:#e39ae0}:root:not([data-theme=light]) .v-f{color:#f2b56b}:root:not([data-theme=light]) .v-e{color:#5cc3de}:root:not([data-theme=light]) .v-k{color:#b9a2ff}}
:root[data-theme=dark] .v-s{color:#6fd39a}:root[data-theme=dark] .v-n{color:#7fb0ff}:root[data-theme=dark] .v-b{color:#e39ae0}:root[data-theme=dark] .v-f{color:#f2b56b}:root[data-theme=dark] .v-e{color:#5cc3de}:root[data-theme=dark] .v-k{color:#b9a2ff}
.cl-comp-grid,.cl-dom-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:12px}
.cl-ctree,.cl-ctree ul,.cl-dtree,.cl-dtree ul{list-style:none;margin:0;padding-left:16px;font:12.5px/1.6 var(--f-mono)}
.cl-ctree,.cl-dtree{padding-left:0}
.cl-ctree ul,.cl-dtree ul{border-left:1.5px dashed var(--line);margin-left:6px;padding-left:10px}
.cl-cnode,.cl-dnode{all:unset;cursor:pointer;display:inline-flex;flex-wrap:wrap;gap:6px;align-items:baseline;padding:2px 6px;border-radius:7px;border:1.5px solid transparent;max-width:100%;box-sizing:border-box}
.cl-cnode:hover,.cl-dnode:hover{background:var(--surface-2)}
.cl-cnode.sel,.cl-dnode.sel{border-color:var(--accent);background:var(--accent-soft)}
.cl-cname{color:var(--accent);font-weight:600}
.cl-cprops{color:var(--muted);font-size:.92em}
.cl-cest{background:var(--amber-soft);color:var(--fg);border-radius:6px;padding:0 5px;font-size:.85em}
.cl-cveces{color:var(--muted);font-size:.85em}
.cl-cnode.r-monta{animation:cl-monta 1.2s}.cl-cnode.r-actualiza{animation:cl-act 1.2s}
@keyframes cl-monta{0%{background:var(--ok-soft);box-shadow:0 0 0 3px var(--ok)}100%{box-shadow:0 0 0 0 transparent}}
@keyframes cl-act{0%{background:var(--amber-soft);box-shadow:0 0 0 3px var(--amber)}100%{box-shadow:0 0 0 0 transparent}}
.cl-leyenda{font-size:.8rem;color:var(--muted);margin-top:10px;display:flex;gap:12px;align-items:center;flex-wrap:wrap}
.cl-leyenda i{display:inline-block;width:12px;height:12px;border-radius:3px;margin-right:-6px}
.cl-leyenda .r-monta{background:var(--ok)}.cl-leyenda .r-actualiza{background:var(--amber)}
.cl-cdet h4,.cl-insp h5:first-child{font:600 1rem var(--f-mono);color:var(--accent);margin:0 0 6px}
.cl-cdet h5,.cl-insp h5,.cl-dom-grid h5{font:700 .78rem var(--f-ui);text-transform:uppercase;letter-spacing:.05em;color:var(--muted);margin:12px 0 4px}
.cl-cdet h5 small,.cl-dom-grid h5 small{text-transform:none;letter-spacing:0;font-weight:400}
.cl-cdet table,.cl-insp table{border-collapse:collapse;width:100%;font:12.5px/1.5 var(--f-mono)}
.cl-cdet td,.cl-insp td{border-bottom:1px solid var(--line);padding:3px 6px;vertical-align:top;word-break:break-word}
.cl-tipo{color:var(--muted);font-family:var(--f-ui);font-size:.8rem}
.cl-dtree .t{color:#8a3a8a}.cl-dtree .a{color:#b05d00}.cl-dtree .s{color:#0b7a3e}.cl-dtxt{color:var(--muted)}
.cl-rel{font-size:.82rem;color:var(--muted)}
.cl-regla{font:12px/1.5 var(--f-mono);background:var(--surface-2);border-radius:6px;padding:4px 6px;margin-bottom:4px;word-break:break-word}
.cl-sw{display:inline-block;width:11px;height:11px;border-radius:3px;border:1px solid var(--line);margin-right:5px;vertical-align:-1px}
.cl-box{font:11px var(--f-mono);text-align:center;margin:6px 0}
.cl-box>div,.cl-box div div{position:relative;padding:18px 26px;border:1px dashed #999;border-radius:4px}
.cl-box .m{background:#f9cc9d55}.cl-box .bo{background:#fddd9b88;border-style:solid}.cl-box .p{background:#c3d08b88}.cl-box .c{background:#8cb6c088;padding:8px;border:1px solid #6a99a5}
.cl-box span{position:absolute;left:4px;top:2px;color:var(--muted)}
.cl-box b{position:absolute;font-weight:400}.cl-box b.t{top:2px;left:50%}.cl-box b.b{bottom:2px;left:50%}.cl-box b.l{left:8px;top:50%}.cl-box b.r{right:8px;top:50%}
.cl-gut-err{width:14px}
.cl-marca{display:inline-block;width:13px;height:13px;border-radius:50%;background:var(--mal);color:#fff;font:700 10px/13px var(--f-ui);text-align:center;cursor:help}
.cl-linea-mal{background:color-mix(in srgb,var(--mal) 14%,transparent)}
.cl-linea-nota{background:color-mix(in srgb,var(--amber) 22%,transparent)}
.CodeMirror-gutters{background:var(--surface-2);border-right:1px solid var(--line)}
.CodeMirror-linenumber{color:var(--muted)}
.CodeMirror-cursor{border-left-color:var(--fg)}
.CodeMirror-selected{background:var(--accent-soft)!important}
.cm-s-default .cm-keyword{color:#a1309d}.cm-s-default .cm-def{color:#1d4fd2}.cm-s-default .cm-variable-2{color:#0a6c88}.cm-s-default .cm-string{color:#0b7a3e}.cm-s-default .cm-number{color:#1d4fd2}.cm-s-default .cm-comment{color:var(--muted)}.cm-s-default .cm-tag{color:#8a3a8a}.cm-s-default .cm-attribute{color:#b05d00}.cm-s-default .cm-property{color:#0a5a9e}.cm-s-default .cm-atom{color:#b05d00}
@media (prefers-color-scheme:dark){:root:not([data-theme=light]) .cm-s-default .cm-keyword{color:#e39ae0}:root:not([data-theme=light]) .cm-s-default .cm-def,:root:not([data-theme=light]) .cm-s-default .cm-number{color:#7fb0ff}:root:not([data-theme=light]) .cm-s-default .cm-string{color:#6fd39a}:root:not([data-theme=light]) .cm-s-default .cm-tag{color:#e39ae0}:root:not([data-theme=light]) .cm-s-default .cm-attribute,:root:not([data-theme=light]) .cm-s-default .cm-atom{color:#f2b56b}:root:not([data-theme=light]) .cm-s-default .cm-property,:root:not([data-theme=light]) .cm-s-default .cm-variable-2{color:#7cd4ea}:root:not([data-theme=light]) .cm-s-default .cm-variable{color:#e3ebf5}:root:not([data-theme=light]) .cm-s-default .cm-operator{color:#e3ebf5}:root:not([data-theme=light]) .cm-s-default .cm-bracket{color:#95a6bb}}
:root[data-theme=dark] .cm-s-default .cm-keyword{color:#e39ae0}:root[data-theme=dark] .cm-s-default .cm-string{color:#6fd39a}:root[data-theme=dark] .cm-s-default .cm-tag{color:#e39ae0}:root[data-theme=dark] .cm-s-default .cm-variable{color:#e3ebf5}
.CodeMirror-hints{font:13px var(--f-mono);border-radius:8px;border:1px solid var(--line);background:var(--surface);z-index:100}
.CodeMirror-hint{color:var(--fg)}
li.CodeMirror-hint-active{background:var(--accent);color:var(--accent-ink)}
@media (max-width:820px){
  .cl-cuerpo{flex-direction:column;height:auto}
  .cl-editor{flex:none;height:300px}
  .cl-div{flex:0 0 10px;cursor:row-resize}
  .cl-div::after{inset:3px 45%}
  .cl-salida{height:440px;flex:none}
  .cl-comp-grid,.cl-dom-grid{grid-template-columns:1fr}
}
/* ---------- Lecciones de la Academia ---------- */
.wa{display:grid;gap:18px}
.wa-hero{display:grid;gap:6px}
.wa-hero h1{font-size:clamp(1.6rem,4vw,2.3rem)}
.wa-hero p{color:var(--muted);max-width:66ch}
.wa-rutas{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:12px}
.wa-ruta{all:unset;box-sizing:border-box;cursor:pointer;display:grid;gap:8px;align-content:start;background:var(--surface);border:1.5px solid var(--line);border-radius:18px;padding:16px;box-shadow:0 3px 0 var(--line)}
.wa-ruta:hover{border-color:var(--accent)}
.wa-ruta[aria-pressed=true]{border-color:var(--accent);box-shadow:0 3px 0 var(--accent-deep);background:var(--accent-soft)}
.wa-ruta h2{font-size:1.15rem}
.wa-ruta p{color:var(--muted);font-size:.9rem}
.wa-logo{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;font:800 1rem var(--f-mono);color:#fff}
.wa-barra{height:8px;border-radius:99px;background:var(--line);overflow:hidden}.wa-barra i{display:block;height:100%;background:var(--ok);border-radius:99px}
.wa-niveles{display:grid;gap:14px}
.wa-nivel h3{font-size:1rem;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;font-family:var(--f-ui);margin-bottom:8px}
.wa-lista{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr));gap:10px}
.wa-item{all:unset;box-sizing:border-box;cursor:pointer;display:flex;gap:12px;align-items:center;background:var(--surface);border:1.5px solid var(--line);border-radius:14px;padding:12px 14px}
.wa-item:hover{border-color:var(--accent)}
.wa-item .n{flex:none;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;font:700 .85rem var(--f-mono);background:var(--surface-2);border:1.5px solid var(--line)}
.wa-item.hecha .n{background:var(--ok);border-color:var(--ok);color:#fff}
.wa-item b{display:block;line-height:1.25}
.wa-item small{color:var(--muted)}
.wa-lec{display:grid;grid-template-columns:minmax(0,1fr);gap:16px;min-width:0}
.wa-cab{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between}
.wa-migas{font-size:.88rem;color:var(--muted)}
.wa-migas button{all:unset;cursor:pointer;color:var(--accent);font-weight:700}
.wa-modo{display:inline-flex;border:1.5px solid var(--line);border-radius:999px;overflow:hidden;background:var(--surface)}
.wa-modo button{all:unset;cursor:pointer;padding:.35em .9em;font-weight:700;font-size:.88rem;color:var(--muted)}
.wa-modo button[aria-pressed=true]{background:var(--accent);color:var(--accent-ink)}
.wa-sec{background:var(--surface);border:1.5px solid var(--line);border-radius:18px;padding:18px;display:grid;gap:10px;min-width:0}
.wa-sec>h2{font-size:1.25rem}
.wa-eti{font:700 .75rem var(--f-ui);text-transform:uppercase;letter-spacing:.08em;color:var(--accent)}
.wa-texto{display:grid;gap:10px;max-width:72ch}
.wa-texto p,.wa-texto li{line-height:1.65}
.wa-texto ul,.wa-texto ol{margin:0;padding-left:1.3em;display:grid;gap:4px}
.wa-texto code,.wa-quiz code,.wa-notas code,.wa-reto code{font:.86em var(--f-mono);background:var(--surface-2);border:1px solid var(--line);border-radius:5px;padding:0 .3em}
.wa-texto pre{font:13px/1.55 var(--f-mono);background:var(--surface-2);border:1px solid var(--line);border-radius:10px;padding:10px 12px;overflow-x:auto;margin:0}
.wa-analogia{background:var(--amber-soft);border-left:4px solid var(--amber);border-radius:10px;padding:10px 14px}
.wa-analogia b:first-child{color:var(--amber)}
.wa-tabla{overflow-x:auto}@media(max-width:640px){.wa,.wa-hero,.wa-niveles,.wa-sec,.wa-texto,.wa-notas,.wa-reto,.wa-metas,.wa-quiz,.wa-ops{grid-template-columns:minmax(0,1fr)}.wa-nota{grid-template-columns:auto minmax(0,1fr)}.wa-texto{overflow-wrap:anywhere}.wa-tabla{overflow-x:visible}.wa-tabla td,.wa-tabla th{overflow-wrap:anywhere}.wa-texto pre{white-space:pre-wrap;overflow-wrap:anywhere;overflow-x:visible}}.wa-tabla table{border-collapse:collapse;font-size:.9rem;min-width:100%}.wa-tabla th,.wa-tabla td{border-bottom:1px solid var(--line);padding:6px 10px;text-align:left;vertical-align:top}.wa-tabla th{font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;color:var(--accent)}
.wa-notas{display:grid;gap:6px}
.wa-nota{all:unset;cursor:pointer;display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;padding:8px 10px;border-radius:10px;border:1.5px solid var(--line);background:var(--surface-2);font-size:.92rem;line-height:1.5}
.wa-nota:hover,.wa-nota.on{border-color:var(--amber);background:var(--amber-soft)}
.wa-nota .l{font:600 .78rem var(--f-mono);color:var(--muted);white-space:nowrap;padding-top:2px}
.wa-reto{display:grid;gap:10px}
.wa-metas{display:grid;gap:6px}
.wa-meta{display:flex;gap:8px;align-items:flex-start}
.wa-meta .ck{flex:none;width:22px;height:22px;border-radius:50%;border:2px solid var(--line);display:grid;place-items:center;color:#fff;font-size:.8rem;margin-top:1px}
.wa-meta.ok .ck{background:var(--ok);border-color:var(--ok)}
.wa-pista{background:var(--accent-soft);border-radius:10px;padding:8px 12px;font-size:.92rem}
.wa-btns{display:flex;flex-wrap:wrap;gap:8px}
.wa-quiz{display:grid;gap:14px}
.wa-q h4{font-family:var(--f-ui);font-size:1rem;margin-bottom:6px}
.wa-ops{display:grid;gap:6px}
.wa-op{all:unset;box-sizing:border-box;cursor:pointer;border:1.5px solid var(--line);border-radius:10px;padding:8px 12px;background:var(--surface)}
.wa-op:hover{border-color:var(--accent)}
.wa-op.ok{border-color:var(--ok);background:var(--ok-soft)}.wa-op.mal{border-color:var(--mal);background:var(--mal-soft)}
.wa-why{font-size:.9rem;color:var(--muted)}
.wa-fin{display:flex;flex-wrap:wrap;gap:10px;justify-content:space-between;align-items:center}
.wa-xp{font-weight:800;color:var(--amber)}
.wa-tutor{background:var(--surface-2);border:1.5px dashed var(--accent);border-radius:12px;padding:10px 14px;font-size:.93rem}
`;
  const s = document.createElement('style'); s.id = 'aula-web-css'; s.textContent = css; document.head.appendChild(s);
})();
