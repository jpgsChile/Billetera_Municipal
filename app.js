const stages = [
  {
    id: "T0",
    rail: "Abrir ciclo",
    state: "ORDENANZA APROBADA",
    title: "La ordenanza crea el origen verificable",
    description: "El Concejo abre el ciclo PP 2027. La clave combina territorio, norma y año para impedir ciclos duplicados entre municipalidades.",
    actors: ["Concejo municipal", "Alcaldía"],
    decision: "Autorizar el ciclo 2210 · 001-2026-MPT · 2027",
    decisionNote: "La fecha del acto es 28 ene 2026; el ledger conserva por separado la fecha de registro.",
    evidence: [
      ["Ordenanza 001-2026-MPT", "ec76ae49…3359dc24"],
      ["Informe 043-2026-MPT/OGPP", "pendiente de huella"]
    ],
    guard: "G1 + G2 + G6",
    guardText: "Sin ordenanza no hay ciclo; la clave es única; todo acto conserva doble sello de tiempo.",
    alert: ["ALERTA DE VIGENCIA", "La fecha de publicación legal no está acreditada. El hecho se registra sin dictaminar su legalidad."],
    fn: "abrir_ciclo",
    event: "CICLO/T0",
    date: "28 ene 2026",
    ledger: 948201,
    hash: "8bf1a2d47c…8a0291"
  },
  {
    id: "T2–T3",
    rail: "Convocar",
    state: "ACREDITACIÓN CERRADA",
    title: "La convocatoria define quién puede participar",
    description: "El Equipo Técnico vincula la convocatoria y la lista pública de organizaciones acreditadas. Los DNI quedan fuera de la cadena.",
    actors: ["Alcaldía", "Equipo Técnico", "Secretaría General"],
    decision: "Cerrar el registro de agentes participantes",
    decisionNote: "Solo se anclan roles y una huella de la versión pública; los datos personales permanecen fuera de cadena.",
    evidence: [
      ["Convocatoria pública", "27d12ac0…ac451e"],
      ["Padrón público de agentes", "b8e95d41…24b200"]
    ],
    guard: "MINIMIZACIÓN DE DATOS",
    guardText: "La prueba de integridad viaja on-chain; identidades y documentos completos permanecen bajo custodia municipal.",
    fn: "transicion_ciclo",
    event: "CICLO/T3",
    date: "25 feb 2026",
    ledger: 948233,
    hash: "34cae2319f…77c125"
  },
  {
    id: "T4–T5",
    rail: "Decidir",
    state: "PROYECTO PRIORIZADO",
    title: "Los agentes priorizan con reglas visibles",
    description: "Explora la decisión entre tres proyectos. El contrato recalcula los 13 criterios (13–71 puntos) y deja evidencia de la preferencia de los agentes.",
    actors: ["Agentes participantes", "Equipo Técnico"],
    decision: "Registrar el resultado del taller",
    decisionNote: "La relación con el Plan de Desarrollo Concertado es excluyente; los empates requieren motivación.",
    evidence: [
      ["Matriz de 13 criterios", "5fb0dc71…e2284a"],
      ["Acta del taller", "se crea al confirmar"]
    ],
    guard: "G10 · PUNTAJE VERIFICABLE",
    guardText: "El total se recalcula con valores permitidos. Una divergencia del ranking queda alertada y motivada.",
    fn: "registrar_priorizacion",
    event: "PROYECTO/T5",
    date: "25 feb 2026",
    ledger: 948267,
    hash: "5aa2b13cd8…e2f701",
    interactive: "projects"
  },
  {
    id: "T6–T7",
    rail: "Formalizar",
    state: "FORMALIZADO",
    title: "El acuerdo emite una credencial del proyecto",
    description: "El Acta formaliza el resultado y crea un registro no transferible del proyecto. Luego se instala un Comité de Vigilancia con claves incompatibles con el CCLP.",
    actors: ["CCLP", "Agentes participantes", "Comité de Vigilancia"],
    decision: "Formalizar el acuerdo y emitir el registro",
    decisionNote: "No es una criptomoneda: representa el compromiso administrativo, su estado y sus pruebas.",
    evidence: [
      ["Acta de acuerdos", "a1184d03…c82f31"],
      ["Acta de instalación del Comité", "88b3e9a4…342cf5"]
    ],
    guard: "G8 + G9",
    guardText: "Las claves del Comité no pueden reutilizar las del CCLP. Quórum provisional: 3 de 4.",
    fn: "formalizar_y_emitir",
    event: "PROYECTO/T6",
    date: "25 feb 2026",
    ledger: 948292,
    hash: "9cf47c102a…51c8d3"
  },
  {
    id: "T8",
    rail: "Remitir",
    state: "REMITIDO AL MEF",
    title: "La remisión queda unida al mismo expediente",
    description: "Planeamiento registra la constancia del aplicativo MEF y el oficio a la DGPP. Si dos fuentes declaran fechas distintas, ninguna se borra.",
    actors: ["OGPP", "MEF–DGPP"],
    decision: "Anclar constancia de registro y remisión",
    decisionNote: "Las fechas contradictorias se conservan como evidencia; la conciliación genera una alerta, no una edición del pasado.",
    evidence: [
      ["Constancia del aplicativo MEF", "02bb822a…1fb905"],
      ["Oficio de remisión DGPP", "e7198a31…c812ae"]
    ],
    guard: "SERIE COMPLETA",
    guardText: "La transición exige un ciclo previamente formalizado y conserva todos los documentos fuente.",
    alert: ["FECHAS EN CONFLICTO", "Anexo 1: III semana de febrero · Convocatoria: 31 de marzo. Ambas fuentes quedan visibles."],
    fn: "transicion_ciclo",
    event: "CICLO/T8",
    date: "31 mar 2026",
    ledger: 948340,
    hash: "17e2130c4d…e4bb20"
  },
  {
    id: "T9",
    rail: "Incorporar",
    state: "INCORPORADO AL PIA",
    title: "El CUI conecta la decisión con la ejecución",
    description: "El Concejo incorpora el proyecto al PIA. El Código Único de Inversiones enlaza el compromiso ciudadano con los sistemas de presupuesto, contratación y obras.",
    actors: ["Concejo municipal", "OGPP"],
    decision: "Vincular CUI 2658941 e incorporar al PIA",
    decisionNote: "Desde aquí, la billetera lee hitos externos por CUI; no intenta reemplazar SIAF, SEACE o INFOBRAS.",
    evidence: [
      ["Acuerdo de Concejo / PIA", "ca0721d9…437880"],
      ["CUI 2658941", "clave de interoperabilidad"]
    ],
    guard: "G11 · CUI OBLIGATORIO",
    guardText: "Ningún proyecto puede pasar a incorporado sin Código Único de Inversiones.",
    fn: "vincular_cui",
    event: "PROYECTO/T9",
    date: "15 dic 2026",
    ledger: 948401,
    hash: "9b1cdea57c…6ee12b"
  },
  {
    id: "T10",
    rail: "Vigilar",
    state: "EN VIGILANCIA",
    title: "La ejecución se atesta, no se reescribe",
    description: "El Comité agrega su informe semestral y contrasta los avances externos. Ajusta el porcentaje para simular el estado observado.",
    actors: ["Comité de Vigilancia", "INFOBRAS", "SIAF"],
    decision: "Publicar atestación semestral",
    decisionNote: "La observación del Comité queda firmada junto con el porcentaje leído desde sistemas administrativos.",
    evidence: [
      ["Informe de vigilancia", "9a6d13f8…21a04d"],
      ["Lectura externa por CUI", "INFOBRAS + SIAF"]
    ],
    guard: "ATESTACIÓN 3 DE 4",
    guardText: "El informe no modifica el dato externo: lo referencia, lo fecha y agrega la posición del Comité.",
    fn: "atestar_avance",
    event: "PROYECTO/T10",
    date: "30 jun 2027",
    ledger: 948518,
    hash: "309fa7154b…0d887c",
    interactive: "progress"
  },
  {
    id: "T12–T13",
    rail: "Rendir",
    state: "CICLO CERRADO",
    title: "La rendición cierra el ciclo sin borrar su historia",
    description: "Alcaldía y Comité comparan lo priorizado, incorporado y ejecutado. El expediente conserva alertas, sustituciones y versiones para una auditoría posterior.",
    actors: ["Alcaldía", "Comité de Vigilancia", "Ciudadanía"],
    decision: "Registrar rendición y cerrar el ciclo",
    decisionNote: "El resultado final se verifica contra la ordenanza génesis, el acta, el CUI y las atestaciones intermedias.",
    evidence: [
      ["Informe de rendición", "a3ee9912…92c401"],
      ["Balance del ciclo 2027", "ff201ca8…e9c117"]
    ],
    guard: "G12 · RENDICIÓN CRUZADA",
    guardText: "El cierre conecta el ciclo siguiente y mantiene accesible toda la secuencia de decisiones.",
    fn: "cerrar_ciclo",
    event: "CICLO/T13",
    date: "28 feb 2028",
    ledger: 948702,
    hash: "c7ed81259e…9cc031"
  }
];

const projects = [
  { id: "agua", name: "Agua y saneamiento · Alto Tocache", score: 64, votes: 38, pdc: true },
  { id: "puente", name: "Puente vecinal · Santa Lucía", score: 58, votes: 29, pdc: true },
  { id: "parque", name: "Parque recreativo · Sector Norte", score: 51, votes: 21, pdc: true }
];

const state = {
  current: 0,
  committed: [],
  selectedProject: "agua",
  execution: 61
};

const rail = document.querySelector("#state-rail");
const decisionPanel = document.querySelector("#decision-panel");
const evidencePanel = document.querySelector("#evidence-panel");
const eventList = document.querySelector("#event-list");
const emptyLedger = document.querySelector("#empty-ledger");
const eventCount = document.querySelector("#event-count");
const progressLabel = document.querySelector("#progress-label");
const completion = document.querySelector("#completion");
const drawer = document.querySelector("#detail-drawer");

function initials(name) {
  return name.split(/[\s–-]+/).slice(0, 2).map(word => word[0]).join("").toUpperCase();
}

function renderRail() {
  rail.innerHTML = stages.map((stage, index) => {
    const done = state.committed.includes(index);
    const active = index === state.current && state.committed.length < stages.length;
    return `<button class="rail-step ${done ? "done" : ""} ${active ? "active" : ""}" data-stage="${index}">
      <small>${done ? "✓" : String(index + 1).padStart(2, "0")}</small>
      <strong>${stage.rail}</strong>
    </button>`;
  }).join("");
}

function actorMarkup(actors) {
  return actors.map(actor => `<span class="actor-chip"><i class="actor-avatar">${initials(actor)}</i>${actor}</span>`).join("");
}

function projectMarkup() {
  return `<div class="project-options" role="radiogroup" aria-label="Proyecto a priorizar">
    ${projects.map((project, index) => `<button class="project-option ${state.selectedProject === project.id ? "selected" : ""}" data-project="${project.id}" role="radio" aria-checked="${state.selectedProject === project.id}">
      <span class="project-rank">${index + 1}</span>
      <span><strong>${project.name}</strong><small>${project.votes} preferencias · cumple relación PDC</small></span>
      <span class="project-score"><b>${project.score}</b><span>puntos</span></span>
    </button>`).join("")}
  </div>
  ${state.selectedProject !== "agua" ? `<div class="warning-inline"><b>!</b><span>La selección no coincide con el mayor puntaje. Se añadirá una motivación firmada al Acta para que la divergencia quede auditable.</span></div>` : ""}`;
}

function progressMarkup() {
  return `<div class="execution-control">
    <div class="execution-head"><span>Avance observado</span><output id="execution-output">${state.execution}%</output></div>
    <input id="execution-range" type="range" min="0" max="100" value="${state.execution}" aria-label="Porcentaje de avance observado" />
  </div>`;
}

function renderDecision() {
  const stage = stages[state.current];
  const committed = state.committed.includes(state.current);
  let interactive = "";
  if (stage.interactive === "projects") interactive = projectMarkup();
  if (stage.interactive === "progress") interactive = progressMarkup();

  decisionPanel.innerHTML = `
    <div class="stage-meta">
      <span class="stage-number">HITO ${String(state.current + 1).padStart(2, "0")} · ${stage.id}</span>
      <span class="stage-state">${committed ? "REGISTRADO" : stage.state}</span>
    </div>
    <h3>${stage.title}</h3>
    <p class="stage-description">${stage.description}</p>
    <div class="actor-strip"><small>ACTORES</small>${actorMarkup(stage.actors)}</div>
    <div class="decision-content">
      <div class="decision-box">
        <small>DECISIÓN ADMINISTRATIVA</small>
        <strong>${stage.decision}</strong>
        <p>${stage.decisionNote}</p>
      </div>
      ${interactive}
    </div>
    <div class="decision-actions">
      <span class="function-tag">Contrato: <code>${stage.fn}()</code></span>
      <button class="button button-primary" id="commit-stage" ${committed ? "disabled" : ""}>
        ${committed ? "Registrado ✓" : state.current === stages.length - 1 ? "Cerrar ciclo →" : "Firmar y registrar →"}
      </button>
    </div>`;

  document.querySelector("#commit-stage")?.addEventListener("click", commitCurrentStage);
  document.querySelectorAll("[data-project]").forEach(button => {
    button.addEventListener("click", () => {
      state.selectedProject = button.dataset.project;
      renderDecision();
      renderEvidence();
    });
  });
  document.querySelector("#execution-range")?.addEventListener("input", event => {
    state.execution = Number(event.target.value);
    document.querySelector("#execution-output").textContent = `${state.execution}%`;
  });
}

function renderEvidence() {
  const stage = stages[state.current];
  const selected = projects.find(project => project.id === state.selectedProject);
  const contextual = stage.interactive === "projects" && state.selectedProject !== "agua"
    ? `<div class="alert-card"><strong>MOTIVACIÓN REQUERIDA</strong><p>Seleccionaste ${selected.name} (${selected.score} pts) por debajo del líder. La excepción se incorporará a la evidencia.</p></div>`
    : "";

  evidencePanel.innerHTML = `
    <div class="evidence-header">
      <span class="panel-overline">PRUEBA DOCUMENTAL</span>
      <h3>Evidencias del hito</h3>
      <p>El archivo permanece bajo custodia; la cadena conserva su huella, responsable y contexto.</p>
    </div>
    <div class="evidence-list">
      ${stage.evidence.map((item, index) => `<div class="evidence-item">
        <span class="evidence-icon">${index + 1}</span>
        <div><strong>${item[0]}</strong><code>${item[1]}</code></div>
      </div>`).join("")}
    </div>
    <div class="guard-card">
      <small>GUARDA DEL CONTRATO</small>
      <strong>${stage.guard}</strong>
      <p>${stage.guardText}</p>
    </div>
    ${stage.alert ? `<div class="alert-card"><strong>${stage.alert[0]}</strong><p>${stage.alert[1]}</p></div>` : ""}
    ${contextual}`;
}

function commitCurrentStage() {
  if (state.committed.includes(state.current)) return;
  const stage = stages[state.current];
  const selected = projects.find(project => project.id === state.selectedProject);
  state.committed.push(state.current);
  stage.runtime = {
    selectedProject: stage.interactive === "projects" ? selected.name : null,
    score: stage.interactive === "projects" ? selected.score : null,
    motivated: stage.interactive === "projects" && selected.id !== "agua",
    progress: stage.interactive === "progress" ? state.execution : null
  };
  renderAll();

  if (state.current < stages.length - 1) {
    setTimeout(() => {
      state.current += 1;
      renderAll();
    }, 320);
  } else {
    completion.hidden = false;
    completion.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

function renderLedger() {
  emptyLedger.hidden = state.committed.length > 0;
  eventCount.textContent = state.committed.length;
  progressLabel.textContent = `${state.committed.length} de ${stages.length} hitos registrados`;
  eventList.innerHTML = state.committed.slice().reverse().map(index => {
    const stage = stages[index];
    return `<li class="event-item">
      <time>Ledger ${stage.ledger} · ${stage.date}</time>
      <strong>${stage.event}</strong>
      <span>${stage.state}</span>
      <button class="event-detail" data-event-detail="${index}">Ver transacción</button>
    </li>`;
  }).join("");
  document.querySelectorAll("[data-event-detail]").forEach(button => {
    button.addEventListener("click", () => openTransaction(Number(button.dataset.eventDetail)));
  });
}

function renderAll() {
  renderRail();
  renderDecision();
  renderEvidence();
  renderLedger();
  completion.hidden = state.committed.length !== stages.length;
}

function rustFor(stage) {
  const snippets = {
    "abrir_ciclo": `pub fn abrir_ciclo(env: Env, id: CicloId,\n  hash_ordenanza: BytesN<32>, fecha_acto: u64) {\n  rol(&env, Rol::Concejo).require_auth();\n  if has_ciclo(&env, &id) { fail(CicloDuplicado); }\n  save_ciclo(&env, &id, Ciclo::nuevo(hash_ordenanza));\n  env.events().publish((symbol_short!("CICLO"), id), fecha_acto);\n}`,
    "registrar_priorizacion": `pub fn registrar_priorizacion(env: Env, id: CicloId,\n  proyecto: Proyecto, criterios: Vec<u32>, acta: BytesN<32>) {\n  rol(&env, Rol::EquipoTecnico).require_auth();\n  let total = validar_puntaje(&env, &criterios);\n  require!(proyecto.cumple_pdc);\n  save_decision(&env, id, proyecto, total, acta);\n}`,
    "formalizar_y_emitir": `pub fn formalizar_y_emitir(env: Env, id: CicloId,\n  proyecto: Proyecto, hash_acta: BytesN<32>) {\n  require_state(&env, &id, Estado::Priorizado);\n  rol(&env, Rol::Agentes).require_auth();\n  emitir_registro_no_transferible(&env, proyecto, hash_acta);\n}`,
    "vincular_cui": `pub fn vincular_cui(env: Env, proyecto_id: BytesN<32>, cui: u64) {\n  rol(&env, Rol::Concejo).require_auth();\n  require!(cui > 0, CuiObligatorio);\n  set_estado(&env, proyecto_id, Estado::IncorporadoPia);\n}`,
    "atestar_avance": `pub fn atestar_avance(env: Env, proyecto_id: BytesN<32>,\n  avance: u32, hash_informe: BytesN<32>) {\n  require_quorum(&env, Rol::Comite, 3);\n  require!(avance <= 100);\n  append_evidencia(&env, proyecto_id, avance, hash_informe);\n}`,
    "cerrar_ciclo": `pub fn cerrar_ciclo(env: Env, id: CicloId,\n  hash_rendicion: BytesN<32>) {\n  rol(&env, Rol::Alcaldia).require_auth();\n  require_ciclo_siguiente(&env, &id);\n  set_ciclo_estado(&env, id, Estado::Cerrado, hash_rendicion);\n}`,
    "transicion_ciclo": `pub fn transicion_ciclo(env: Env, id: CicloId,\n  siguiente: Estado, evidencia: BytesN<32>) {\n  require_actor_for(&env, &siguiente);\n  require_valid_transition(&env, &id, &siguiente);\n  append_transition(&env, id, siguiente, evidencia);\n}`
  };
  return snippets[stage.fn] || snippets.transicion_ciclo;
}

function openTransaction(index) {
  const stage = stages[index];
  const runtime = stage.runtime || {};
  document.querySelector("#drawer-eyebrow").textContent = `${stage.event} · LEDGER ${stage.ledger}`;
  document.querySelector("#drawer-title").textContent = stage.state;
  document.querySelector("#drawer-body").innerHTML = `
    <div class="detail-grid">
      <div><span>TRANSACCIÓN</span><strong>${stage.hash}</strong></div>
      <div><span>FUNCIÓN</span><strong>${stage.fn}()</strong></div>
      <div><span>FECHA DEL ACTO</span><strong>${stage.date}</strong></div>
      <div><span>FIRMAS / ROLES</span><strong>${stage.actors.join(" · ")}</strong></div>
      ${runtime.selectedProject ? `<div><span>PROYECTO</span><strong>${runtime.selectedProject}</strong></div><div><span>PUNTAJE</span><strong>${runtime.score}/71 ${runtime.motivated ? "· con motivación" : ""}</strong></div>` : ""}
      ${runtime.progress !== null && runtime.progress !== undefined ? `<div><span>AVANCE ATESTADO</span><strong>${runtime.progress}%</strong></div>` : ""}
    </div>
    <div class="code-card">
      <div class="code-card-head"><span>RUST · SOROBAN (BASE CONCEPTUAL)</span><span>${stage.guard}</span></div>
      <pre>${escapeHtml(rustFor(stage))}</pre>
    </div>`;
  drawer.showModal();
}

function openVerification() {
  document.querySelector("#drawer-eyebrow").textContent = "VERIFICADOR CIUDADANO";
  document.querySelector("#drawer-title").textContent = "Expediente íntegro";
  document.querySelector("#drawer-body").innerHTML = `
    <div class="verify-list">
      ${[
        ["Huella del PDF coincide", "Ordenanza 001-2026-MPT", "ec76…dc24"],
        ["Compromiso canónico coincide", "Carga pública recalculable", "ef397…b455"],
        ["El ciclo existe", "2210:001-2026-MPT:2027", "G1/G2"],
        ["La secuencia es completa", "8/8 hitos enlazados", "T0→T13"]
      ].map(row => `<div class="verify-row"><span class="verify-check">✓</span><div><strong>${row[0]}</strong><small>${row[1]}</small></div><code>${row[2]}</code></div>`).join("")}
    </div>
    <div class="code-card">
      <div class="code-card-head"><span>RESULTADO</span><span>VERIFICACIÓN LOCAL + ESTADO PERSISTENTE</span></div>
      <pre>4 verificaciones correctas\n0 alteraciones detectadas\n2 alertas administrativas preservadas\n\nLa integridad puede comprobarse sin confiar en esta interfaz.</pre>
    </div>`;
  drawer.showModal();
}

function openArchitecture() {
  document.querySelector("#drawer-eyebrow").textContent = "WEB3 TRUST-NATIVE";
  document.querySelector("#drawer-title").textContent = "Una capa de confianza, no otro silo";
  document.querySelector("#drawer-body").innerHTML = `
    <div class="architecture-detail">
      <div class="layer-card"><span class="layer-index">01</span><div><h3>Actores autorizan</h3><p>Concejo, Alcaldía, Equipo Técnico, agentes y Comité firman según su rol. La clave prueba autorización; no expone datos personales.</p></div></div>
      <div class="layer-card"><span class="layer-index">02</span><div><h3>Soroban conserva el estado común</h3><p>Ciclo, proyecto, transición, huella, tiempo y guarda forman un expediente verificable con reglas ejecutables.</p></div></div>
      <div class="layer-card"><span class="layer-index">03</span><div><h3>Los documentos siguen bajo custodia</h3><p>PDF, actas e informes no necesitan publicarse completos on-chain. La huella detecta cualquier cambio de un byte.</p></div></div>
      <div class="layer-card"><span class="layer-index">04</span><div><h3>El CUI conecta sistemas existentes</h3><p>MEF, SIAF, SEACE e INFOBRAS siguen cumpliendo su función. La billetera reúne sus hitos en una historia auditable.</p></div></div>
    </div>
    <div class="code-card">
      <div class="code-card-head"><span>MODELO DE DATOS</span><span>ESTADO MÍNIMO COMPARTIDO</span></div>
      <pre>struct CicloId { ubigeo, norma_genesis, anio_fiscal }\nstruct Sello { fecha_acto, ledger_registro, retroactivo }\nstruct Evidencia { sha256, actor_rol, base_legal }\nstruct Proyecto { ciclo_id, estado, cui, evidencias[] }</pre>
    </div>`;
  drawer.showModal();
}

function escapeHtml(value) {
  return value.replace(/[&<>"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char]));
}

function resetDemo(scroll = false) {
  state.current = 0;
  state.committed = [];
  state.selectedProject = "agua";
  state.execution = 61;
  stages.forEach(stage => delete stage.runtime);
  renderAll();
  if (scroll) document.querySelector("#recorrido").scrollIntoView({ behavior: "smooth" });
}

document.querySelector("#start-demo").addEventListener("click", () => resetDemo(true));
document.querySelector("#reset-demo").addEventListener("click", () => resetDemo(false));
document.querySelector("#verify-case").addEventListener("click", openVerification);
document.querySelectorAll("[data-open-architecture]").forEach(button => button.addEventListener("click", openArchitecture));
document.querySelectorAll("[data-close-dialog]").forEach(button => button.addEventListener("click", () => drawer.close()));
drawer.addEventListener("click", event => { if (event.target === drawer) drawer.close(); });
rail.addEventListener("click", event => {
  const button = event.target.closest("[data-stage]");
  if (!button) return;
  const index = Number(button.dataset.stage);
  if (index <= state.committed.length) {
    state.current = Math.min(index, stages.length - 1);
    renderAll();
  }
});

renderAll();
