import React, { useState } from "react";

const styles = {
  alertBadge: {
    fontSize: "10px",
    backgroundColor: "#1e293b",
    color: "#cbd5e1",
    padding: "2px 6px",
    borderRadius: "4px"
  },
  alertBox: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid"
  },
  alertDesc: {
    fontSize: "11px",
    margin: "6px 0 0 0",
    lineHeight: "1.4",
    color: "#cbd5e1"
  },
  alertHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  alertTitleActive: {
    fontWeight: "bold",
    color: "#fb923c",
    fontSize: "12px"
  },
  alertTitleInactive: {
    color: "#64748b",
    fontSize: "12px"
  },
  alertsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  bannerBienvenidaInfo: {
    backgroundColor: "rgba(56, 189, 248, 0.1)",
    border: "1px solid #38bdf8",
    borderRadius: "8px",
    padding: "12px",
    fontSize: "12px",
    color: "#e2e8f0",
    lineHeight: "1.4",
    marginTop: "6px"
  },
  btnCancelDocente: {
    padding: "12px 20px",
    backgroundColor: "transparent",
    color: "#94a3b8",
    border: "1px solid #334155",
    borderRadius: "8px",
    fontSize: "12px",
    cursor: "pointer"
  },
  btnCloseModal: {
    background: "none",
    border: "none",
    fontSize: "22px",
    color: "#64748b",
    cursor: "pointer",
    padding: "0 4px"
  },
  btnPedagogicalPill: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "1px solid #38bdf8",
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    color: "#38bdf8",
    fontSize: "12px",
    fontWeight: "bold",
    cursor: "pointer"
  },
  btnPrimaryIngreso: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#10b981",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "13px",
    cursor: "pointer",
    marginTop: "10px"
  },
  btnSendToCiDi: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#8b5cf6",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "13px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px"
  },
  btnTableAction: {
    padding: "4px 10px",
    fontSize: "10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#1e3a8a",
    color: "#38bdf8",
    cursor: "pointer",
    fontWeight: "bold"
  },
  btnValoracionTop: {
    backgroundColor: "rgba(139, 92, 246, 0.2)",
    border: "1px solid #8b5cf6",
    color: "#c084fc",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "11px",
    fontWeight: "bold",
    cursor: "pointer"
  },
  cardBoxIngreso: {
    backgroundColor: "#0f172a",
    border: "2px solid #38bdf8",
    borderRadius: "14px",
    padding: "24px",
    maxWidth: "680px",
    margin: "30px auto"
  },
  cardSectionTitle: {
    fontSize: "13px",
    margin: "0 0 12px 0",
    color: "#38bdf8",
    textTransform: "uppercase"
  },
  dashboardCard: {
    backgroundColor: "rgba(7, 12, 34, 0.75)",
    borderRadius: "10px",
    padding: "16px",
    border: "1px solid #1e293b"
  },
  dashboardContainer: {
    maxWidth: "1150px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    backgroundColor: "#030712",
    color: "#f3f4f6",
    minHeight: "100vh"
  },
  dashboardGrid: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr",
    gap: "20px"
  },
  dashboardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #1e293b",
    paddingBottom: "12px",
    marginBottom: "16px"
  },
  dashboardSubtitle: {
    fontSize: "12px",
    margin: "4px 0 0 0",
    color: "#64748b"
  },
  dashboardTeacherControlsCard: {
    backgroundColor: "rgba(7, 12, 34, 0.75)",
    border: "2px solid #8b5cf6",
    borderRadius: "10px",
    padding: "16px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  dashboardTitle: {
    fontSize: "20px",
    margin: 0,
    color: "#38bdf8",
    fontWeight: "bold"
  },
  formGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },
  formInput: {
    padding: "10px",
    backgroundColor: "#02040e",
    border: "1px solid #334155",
    borderRadius: "6px",
    color: "#ffffff",
    fontSize: "13px"
  },
  formLabel: {
    fontSize: "12px",
    fontWeight: "bold",
    color: "#38bdf8"
  },
  formSelect: {
    padding: "10px",
    backgroundColor: "#02040e",
    border: "1px solid #334155",
    borderRadius: "6px",
    color: "#ffffff",
    fontSize: "13px"
  },
  formTextareaDocente: {
    padding: "10px",
    backgroundColor: "#02040e",
    border: "1px solid #334155",
    borderRadius: "6px",
    color: "#ffffff",
    fontSize: "14px"
  },
  instructions: {
    fontSize: "12px",
    color: "#94a3b8",
    lineHeight: "1.4",
    marginBottom: "12px"
  },
  kpiCard: {
    backgroundColor: "rgba(7, 12, 34, 0.75)",
    padding: "14px",
    borderRadius: "8px",
    border: "1px solid #1e293b"
  },
  kpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "20px"
  },
  kpiLabel: {
    fontSize: "10px",
    color: "#cbd5e1",
    margin: 0,
    fontWeight: "bold"
  },
  kpiSub: {
    fontSize: "10px",
    color: "#94a3b8",
    fontWeight: "600"
  },
  kpiValue: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "#ffffff",
    margin: "4px 0"
  },
  leftColumn: {},
  modalBody: {},
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottom: "1px solid #1e293b",
    paddingBottom: "12px",
    marginBottom: "16px"
  },
  pedagogicalBody: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "12px"
  },
  pedagogicalBox: {
    backgroundColor: "rgba(56, 189, 248, 0.08)",
    border: "1px solid rgba(56, 189, 248, 0.2)",
    borderRadius: "8px",
    padding: "12px",
    fontSize: "13px",
    color: "#e2e8f0",
    lineHeight: "1.5"
  },
  profileSection: {
    backgroundColor: "#02040e",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #1e293b",
    fontSize: "12px",
    marginBottom: "16px"
  },
  radioGroup: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap"
  },
  radioOptionDocente: {
    fontSize: "14px",
    color: "#cbd5e1",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px"
  },
  rightColumn: {},
  sentNotification: {
    marginTop: "12px",
    padding: "10px",
    backgroundColor: "rgba(16, 185, 129, 0.15)",
    border: "1px solid #10b981",
    borderRadius: "6px",
    color: "#4ade80",
    fontSize: "12px",
    fontWeight: "bold",
    textAlign: "center"
  },
  surveyLabelDocente: {
    fontSize: "15px",
    fontWeight: "bold",
    color: "#38bdf8",
    marginBottom: "6px",
    display: "block"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  tableHeaderRow: {
    borderBottom: "1px solid #1e293b",
    textAlign: "left"
  },
  td: {
    padding: "8px",
    fontSize: "12px"
  },
  teacherBadge: {
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "10px",
    fontWeight: "bold",
    backgroundColor: "rgba(56, 189, 248, 0.1)",
    color: "#38bdf8",
    border: "1px solid #38bdf8"
  },
  teacherDashboardInput: {
    flex: 1,
    padding: "10px 14px",
    backgroundColor: "#02040e",
    border: "1px solid #334155",
    borderRadius: "6px",
    color: "#cbd5e1",
    fontSize: "13px"
  },
  teacherDashboardSendBtn: {
    backgroundColor: "#8b5cf6",
    color: "#ffffff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    fontWeight: "bold",
    fontSize: "12px",
    cursor: "pointer"
  },
  th: {
    padding: "8px",
    fontSize: "10px",
    color: "#64748b",
    textTransform: "uppercase"
  },
  toastCard: {
    position: "fixed",
    top: "20px",
    right: "20px",
    backgroundColor: "#10b981",
    color: "#ffffff",
    padding: "12px 20px",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "13px",
    boxShadow: "0 0 20px rgba(16, 185, 129, 0.5)",
    zIndex: 10000
  },
  topModalCard: {
    width: "90%",
    maxWidth: "680px",
    backgroundColor: "#080d24",
    padding: "24px",
    boxSizing: "border-box",
    borderRadius: "14px",
    border: "2px solid #38bdf8",
    boxShadow: "0 0 35px rgba(56, 189, 248, 0.35)",
    color: "#cbd5e1"
  },
  topModalCardWide: {
    backgroundColor: "#0f172a",
    border: "2px solid #38bdf8",
    borderRadius: "14px",
    padding: "20px",
    maxWidth: "720px",
    width: "90%",
    boxShadow: "0 0 30px rgba(56, 189, 248, 0.2)",
    position: "relative"
  },
  topModalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #1e293b",
    paddingBottom: "10px",
    marginBottom: "10px"
  },
  topModalOverlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(2, 3, 8, 0.85)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: "20px",
    paddingBottom: "20px",
    zIndex: 3000,
    overflowY: "auto"
  },
  tr: {
    borderBottom: "1px solid #1e293b"
  }
};


// ==========================================
// 📚 FICHA PEDAGÓGICA Y OBJETIVOS DE MISIONES (POPUP DOCENTE)
// ==========================================
const MISSION_PEDAGOGICAL_INFO = {
  m1: {
    title: "Misión 1: Reserva de Agua Vital",
    subtitle: "Suma de Fracciones con Igual Denominador",
    action: "Luego de un simulacro paso a paso con EduBot (con la ecuación 1/5 + 2/5 = 3/5 visible), los alumnos operan de forma autónoma seleccionando la respuesta entre 6 opciones.",
    objectives: "Comprender la suma homogénea: cuando las partes de la unidad son iguales (mismo denominador), la base se conserva intacta y solo se suman los numeradores de arriba (1 + 2 = 3).",
    evidence: "Evidencia que el estudiante distingue el rol del numerador (partes) y del denominador (base) sin incurrir en el desvío común de sumar denominadores directo (ERR_DIRECT)."
  },
  m2: {
    title: "Misión 2: Mezcla de Combustible",
    subtitle: "Suma con Denominadores Múltiples Simples",
    action: "Luego de un simulador de numerador con denominador común prefijado (1/3 + 1/6 = ?/6), los alumnos resuelven sumas heterogéneas con resultados irreducibles.",
    objectives: "Identificar y calcular el menor común denominador (LCM) para unificar las bases de medición antes de sumar.",
    evidence: "Evidencia si el estudiante logra realizar la conversión previa de fracciones equivalentes o si tiende a sumar en línea recta numeradores y denominadores."
  },
  m3: {
    title: "Misión 3: Acople de Víveres y Raciones",
    subtitle: "Suma y Simplificación a Fracción Irreducible",
    action: "Luego de un simulador conceptual de simplificación (3/6 → 1/2), los alumnos resuelven sumas donde cada resultado exige simplificarse obligatoriamente.",
    objectives: "Dominar la simplificación dividiendo numerador y denominador por factores comunes hasta obtener la versión irreducible.",
    evidence: "Evidencia la capacidad de llevar una suma a su expresión matemática estándar irreducible sin detenerse en el resultado intermedio."
  },
  m4: {
    title: "Misión 4: Travesía Integrada de Despegue",
    subtitle: "Suma Triple + Simplificación + Comparación y Justificación",
    action: "Secuencia integradora en 3 partes sin simulacro pasivo: Parte 1 (Suma triple), Parte 2 (Simplificación), Parte 3 (Comparación de magnitudes y justificación científica).",
    objectives: "Integrar el corpus completo de saberes desarrollados en el módulo aplicando razonamiento crítico para argumentar decisiones sobre recursos.",
    evidence: "Evidencia la capacidad de razonamiento científico y argumentativo (Maestría / Intuición), permitiendo acreditar la insignia final de Fusión Estelar."
  }
};

const INITIAL_STUDENTS = [
  {
    id: 1, name: "Martín G.", shipName: "Halcón de las Sierras", uuid: "7a3b2c1d-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
    xp: 750, badgeEarned: true, interestRegistered: true, helpsRequested: 0, errorsCount: 0,
    justificationQuality: "Master",
    missions: {
      m1: { status: "completado", attempts: 1, helps: 0, errors: 0, lastErrorCode: null },
      m2: { status: "completado", attempts: 1, helps: 0, errors: 0, lastErrorCode: null },
      m3: { status: "completado", attempts: 1, helps: 0, errors: 0, lastErrorCode: null },
      m4: { status: "completado", attempts: 1, helps: 0, errors: 0, lastErrorCode: null }
    }
  },
  {
    id: 2, name: "Sofía V.", shipName: "Centella Alfa", uuid: "8b4c3d2e-5f6a-7b8c-9d0e-1f2a3b4c5d6e",
    xp: 250, badgeEarned: false, interestRegistered: true, helpsRequested: 1, errorsCount: 4,
    justificationQuality: null,
    missions: {
      m1: { status: "completado", attempts: 2, helps: 1, errors: 1, lastErrorCode: "ERR_DIRECT" },
      m2: { status: "en_curso", attempts: 3, helps: 0, errors: 3, lastErrorCode: "ERR_DIRECT" },
      m3: { status: "bloqueada", attempts: 0, helps: 0, errors: 0, lastErrorCode: null },
      m4: { status: "bloqueada", attempts: 0, helps: 0, errors: 0, lastErrorCode: null }
    }
  },
  {
    id: 3, name: "Facundo S.", shipName: "Meteoro Austral", uuid: "9c5d4e3f-6a7b-8c9d-0e1f-2a3b4c5d6e7f",
    xp: 450, badgeEarned: false, interestRegistered: false, helpsRequested: 2, errorsCount: 3,
    justificationQuality: null,
    missions: {
      m1: { status: "completado", attempts: 1, helps: 0, errors: 0, lastErrorCode: null },
      m2: { status: "completado", attempts: 2, helps: 1, errors: 1, lastErrorCode: "ERR_PARTIAL" },
      m3: { status: "completado", attempts: 3, helps: 1, errors: 2, lastErrorCode: "ERR_LCD" },
      m4: { status: "bloqueada", attempts: 0, helps: 0, errors: 0, lastErrorCode: null }
    }
  },
  {
    id: 4, name: "Valentina R.", shipName: "Cóndor Estelar", uuid: "1d2e3f4a-5b6c-7d8e-9f0a-1b2c3d4e5f6a",
    xp: 750, badgeEarned: true, interestRegistered: true, helpsRequested: 0, errorsCount: 0,
    justificationQuality: "Master",
    missions: {
      m1: { status: "completado", attempts: 1, helps: 0, errors: 0, lastErrorCode: null },
      m2: { status: "completado", attempts: 1, helps: 0, errors: 0, lastErrorCode: null },
      m3: { status: "completado", attempts: 1, helps: 0, errors: 0, lastErrorCode: null },
      m4: { status: "completado", attempts: 1, helps: 0, errors: 0, lastErrorCode: null }
    }
  },
  {
    id: 5, name: "Tomás B.", shipName: "Rayo Cba", uuid: "2e3f4a5b-6c7d-8e9f-0a1b-2c3d4e5f6a7b",
    xp: 100, badgeEarned: false, interestRegistered: false, helpsRequested: 2, errorsCount: 2,
    justificationQuality: null,
    missions: {
      m1: { status: "completado", attempts: 3, helps: 2, errors: 2, lastErrorCode: "ERR_PARTIAL" },
      m2: { status: "bloqueada", attempts: 0, helps: 0, errors: 0, lastErrorCode: null },
      m3: { status: "bloqueada", attempts: 0, helps: 0, errors: 0, lastErrorCode: null },
      m4: { status: "bloqueada", attempts: 0, helps: 0, errors: 0, lastErrorCode: null }
    }
  },
  {
    id: 6, name: "Camila O.", shipName: "Pampa Orbital", uuid: "3f4a5b6c-7d8e-9f0a-1b2c-3d4e5f6a7b8c",
    xp: 450, badgeEarned: false, interestRegistered: true, helpsRequested: 1, errorsCount: 3,
    justificationQuality: null,
    missions: {
      m1: { status: "completado", attempts: 1, helps: 0, errors: 0, lastErrorCode: null },
      m2: { status: "completado", attempts: 1, helps: 0, errors: 0, lastErrorCode: null },
      m3: { status: "completado", attempts: 4, helps: 1, errors: 3, lastErrorCode: "ERR_LCD" },
      m4: { status: "bloqueada", attempts: 0, helps: 0, errors: 0, lastErrorCode: null }
    }
  },
  {
    id: 7, name: "Bautista L.", shipName: "Vanguardia 1", uuid: "4a5b6c7d-8e9f-0a1b-2c3d-4e5f6a7b8c9d",
    xp: 750, badgeEarned: true, interestRegistered: true, helpsRequested: 2, errorsCount: 2,
    justificationQuality: "Intuitive",
    missions: {
      m1: { status: "completado", attempts: 2, helps: 1, errors: 1, lastErrorCode: "ERR_DIRECT" },
      m2: { status: "completado", attempts: 1, helps: 0, errors: 0, lastErrorCode: null },
      m3: { status: "completado", attempts: 2, helps: 1, errors: 1, lastErrorCode: "ERR_COMPARE" },
      m4: { status: "completado", attempts: 1, helps: 0, errors: 0, lastErrorCode: null }
    }
  },
  {
    id: 8, name: "Delfina P.", shipName: "Sonda Traslasierra", uuid: "5b6c7d8e-9f0a-1b2c-3d4e-5f6a7b8c9d0e",
    xp: 0, badgeEarned: false, interestRegistered: false, helpsRequested: 0, errorsCount: 0,
    justificationQuality: null,
    missions: {
      m1: { status: "bloqueada", attempts: 0, helps: 0, errors: 0, lastErrorCode: null },
      m2: { status: "bloqueada", attempts: 0, helps: 0, errors: 0, lastErrorCode: null },
      m3: { status: "bloqueada", attempts: 0, helps: 0, errors: 0, lastErrorCode: null },
      m4: { status: "bloqueada", attempts: 0, helps: 0, errors: 0, lastErrorCode: null }
    }
  }
];

const SYSTEM_EXPERT_ALERTS = {
  ERR_DIRECT: "🛠️ Propuesta para el aula presencial: dinámica de doblado de tiras de papel para visualizar por qué el denominador nunca se suma.",
  ERR_PARTIAL: "🍳 Actividad para el hogar: usen elementos divisibles en la mesa para representar la agregación de partes.",
  ERR_LCD: "🧩 Actividad para el hogar: repasen juntos las tablas de multiplicar de los denominadores antes de operar.",
  ERR_COMPARE: "🥤 Actividad para el hogar: sirvan agua en vasos de diferente diámetro para ilustrar la necesidad de una base común."
};

function renderMissionCell(student, mKey) {
  const mData = student.missions[mKey];
  const status = mData ? mData.status : "bloqueada";
  const helps = mData ? (mData.helps || 0) : 0;
  const errors = mData ? (mData.errors || 0) : 0;

  let bgColor = "rgba(30, 41, 59, 0.3)";
  let borderColor = "#1e293b";
  let textColor = "#cbd5e1";
  let hasActivity = status === "completado" || status === "en_curso" || (mData && mData.attempts > 0);

  if (status === "completado") {
    bgColor = "rgba(16, 185, 129, 0.15)";
    borderColor = "#10b981";
    textColor = "#4ade80";
  } else if (hasActivity) {
    bgColor = "rgba(251, 146, 60, 0.15)";
    borderColor = "#fb923c";
    textColor = "#fb923c";
  }

  if (!hasActivity) {
    return <span style={{ padding: "4px 8px", borderRadius: "4px", border: "1px dashed #1e293b", color: "#475569", fontSize: "11px" }}>—</span>;
  }

  return (
    <div style={{ padding: "4px 8px", borderRadius: "6px", border: `1px solid ${borderColor}`, backgroundColor: bgColor, color: textColor, display: "inline-flex", gap: "6px", fontSize: "11px", fontWeight: "bold" }}>
      <span>💡 {helps}</span>
      <span style={{ color: "#fb923c" }}>✖ {errors}</span>
    </div>
  );
}

function justificationLabelStyle(quality) {
  let color = "#cbd5e1";
  let bg = "rgba(148, 163, 184, 0.1)";
  if (quality === "Master" || quality === "Intuitive") {
    color = "#4ade80";
    bg = "rgba(16, 185, 129, 0.15)";
  }
  return { padding: "3px 8px", borderRadius: "4px", fontSize: "10px", fontWeight: "bold", backgroundColor: bg, color: color };
}

// ==========================================
// 📬 COMPONENTE MODAL DE ANÁLISIS (ARRIBA EN PANTALLA, NO AL COSTADO)
// ==========================================
function DrawerWithSendButton({ student, onClose }) {
  const [emailSent, setEmailSent] = useState(false);

  const getStudentPrimaryDesvio = (s) => {
    if (s.missions.m4.lastErrorCode) return s.missions.m4.lastErrorCode;
    if (s.missions.m3.lastErrorCode) return s.missions.m3.lastErrorCode;
    if (s.missions.m2.lastErrorCode) return s.missions.m2.lastErrorCode;
    if (s.missions.m1.lastErrorCode) return s.missions.m1.lastErrorCode;
    return null;
  };

  const primaryDesvio = getStudentPrimaryDesvio(student);
  let aulaAdvice = "";
  let padresAdvice = "";
  let performanceTitle = "Progreso Regular";
  let performanceColor = "#cbd5e1";

  if (student.badgeEarned) {
    if (student.errorsCount === 0) {
      performanceTitle = "Domina sin errores (Master Absoluto)";
      performanceColor = "#10b981";
      aulaAdvice = "El alumno ha alcanzado un dominio conceptual perfecto y sin cometer desvíos. No requiere intervención en clase; continúe motivándolo con desafíos avanzados.";
      padresAdvice = "¡Felicitaciones! Su hijo/a completó todos los desafíos de matemática con precisión absoluta y sin un solo error.";
    } else {
      performanceTitle = "Domina con errores (Dominio Resiliente)";
      performanceColor = "#10b981";
      aulaAdvice = "El alumno logró de forma resiliente consolidar el aprendizaje, superando los desvíos previos en la bitácora mediante el reintento.";
      padresAdvice = "Su hijo/a superó las misiones demostrando perseverancia y corrigiendo sus desvíos de forma resiliente.";
    }
  } else if (primaryDesvio) {
    performanceTitle = `Alerta de Desvío: ${primaryDesvio}`;
    performanceColor = "#fb923c";
    aulaAdvice = SYSTEM_EXPERT_ALERTS[primaryDesvio] || "Reforzar con guía personalizada en clase.";
    padresAdvice = "Acompañen a su hijo/a en casa revisando juntos el ejercicio con elementos físicos.";
  } else {
    aulaAdvice = "El alumno avanzó de forma regular dentro de la trayectoria de aprendizaje.";
    padresAdvice = "Acompañen el esfuerzo de su hijo/a en casa y anímenlo/a a seguir completando las misiones.";
  }

  const handleSendToParents = () => {
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 4000);
  };

  return (
    <div style={styles.topModalOverlay} onClick={onClose}>
      <div style={styles.topModalCard} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <div>
            <h2 style={{ margin: 0, color: "#38bdf8", fontSize: "18px" }}>Análisis de Trayectoria: {student.name}</h2>
            <span style={{ fontSize: "12px", color: "#94a3b8" }}>🚀 {student.shipName} · CUIL: {student.uuid.slice(0, 8)}...</span>
          </div>
          <button style={styles.btnCloseModal} onClick={onClose}>✕</button>
        </div>

        <div style={styles.modalBody}>
          <div style={styles.profileSection}>
            <p style={{ margin: "0 0 6px 0" }}>Desempeño Global: <strong style={{ color: performanceColor }}>{performanceTitle}</strong></p>
            <p style={{ margin: "0 0 6px 0" }}>Experiencia Acumulada: <strong>{student.xp} / 750 XP</strong></p>
            <p style={{ margin: "0" }}>Ayudas Solicitadas / Errores: 💡 <strong>{student.helpsRequested}</strong> | ✖ <strong style={{ color: "#fb923c" }}>{student.errorsCount}</strong></p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div style={{ borderLeft: "4px solid #10b981", backgroundColor: "rgba(16, 185, 129, 0.05)", padding: "12px", borderRadius: "6px" }}>
              <h4 style={{ margin: "0 0 6px 0", color: "#10b981", fontSize: "12px", textTransform: "uppercase" }}>👩‍🏫 Consejo para el Aula (Docente)</h4>
              <p style={{ fontSize: "12px", margin: 0, lineHeight: "1.5", color: "#cbd5e1" }}>{aulaAdvice}</p>
            </div>

            <div style={{ borderLeft: "4px solid #8b5cf6", backgroundColor: "rgba(139, 92, 246, 0.05)", padding: "12px", borderRadius: "6px" }}>
              <h4 style={{ margin: "0 0 6px 0", color: "#8b5cf6", fontSize: "12px", textTransform: "uppercase" }}>🏠 Consejo para la Familia (Hogar)</h4>
              <p style={{ fontSize: "12px", margin: 0, lineHeight: "1.5", color: "#cbd5e1" }}>{padresAdvice}</p>
            </div>
          </div>

          <button onClick={handleSendToParents} style={styles.btnSendToCiDi}>
            ✉️ Enviar consejos directo a la familia (Domicilio Electrónico CiDi)
          </button>

          {emailSent && (
            <div style={styles.sentNotification}>
              ✨ ¡Enviado! Los consejos pedagógicos fueron notificados al Domicilio Electrónico de los padres en Ciudadano Digital (CiDi).
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [faseDocente, setFaseDocente] = useState("ingreso"); // 'ingreso', 'panel', 'evaluacion'
  
  // Registro / Perfil Inicial Docente
  const [perfilDocente, setPerfilDocente] = useState({
    nombre: "Profe Laura",
    escuela: "Escuela IPEM 268",
    curso: "1° Año B"
  });

  // Cuestionario de Valoración de la Consola Docente
  const [encuestaDocente, setEncuestaDocente] = useState({
    valorPedagogico: "Muy valiosa",
    nivelDificultad: "Adecuada",
    contactoGrupal: "Muy útil",
    sintesisFamilias: "Alto valor para involucrar a los padres",
    sugerenciasMejora: ""
  });

  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [teacherMessage, setTeacherMessage] = useState("¡Buen viaje espacial, tripulantes! Lean con atención cada consigna.");
  const [inputMsg, setInputMsg] = useState(teacherMessage);
  const [pedagogicalPopup, setPedagogicalPopup] = useState(null); // 'm1', 'm2', 'm3', 'm4'
  const [toastMsg, setToastMsg] = useState(null);

  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.xp > 0).length;
  const badgesAwarded = students.filter((s) => s.badgeEarned).length;
  const partPercentage = Math.round((activeStudents / totalStudents) * 100);
  const badgePercentage = Math.round((badgesAwarded / totalStudents) * 100);

  const errorsCount = {
    ERR_DIRECT: students.filter((s) => s.missions.m1.lastErrorCode === "ERR_DIRECT" || s.missions.m2.lastErrorCode === "ERR_DIRECT").length,
    ERR_PARTIAL: students.filter((s) => s.missions.m2.lastErrorCode === "ERR_PARTIAL" || s.missions.m1.lastErrorCode === "ERR_PARTIAL").length,
    ERR_LCD: students.filter((s) => s.missions.m3.lastErrorCode === "ERR_LCD" || s.missions.m4.lastErrorCode === "ERR_LCD").length,
    ERR_COMPARE: students.filter((s) => s.missions.m4.lastErrorCode === "ERR_COMPARE").length
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleGuardarPerfilDocente = (e) => {
    e.preventDefault();
    if (!perfilDocente.nombre.trim() || !perfilDocente.escuela.trim()) {
      alert("Por favor completá tu nombre y escuela para ingresar.");
      return;
    }
    setFaseDocente("panel");
    showToast(`👩‍🏫 Bienvenida ${perfilDocente.nombre} a la Consola de Monitoreo (${perfilDocente.escuela})`);
  };

  const handleEnviarEncuestaDocente = (e) => {
    e.preventDefault();
    setFaseDocente("panel");
    showToast("✉️ ¡Gracias Profe! Tu valoración y sugerencias fueron enviadas con éxito a Control Central.");
  };

  const handleSendMessage = () => {
    setTeacherMessage(inputMsg);
    alert(`📢 Transmisión enviada a las cabinas de los alumnos:\n\n"${inputMsg}"`);
  };

  return (
    <div style={styles.dashboardContainer}>
      {toastMsg && <div style={styles.toastCard}>{toastMsg}</div>}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 1. FORMULARIO DE INGRESO Y BIENVENIDA DOCENTE             */}
      {/* ────────────────────────────────────────────────────────── */}
      {faseDocente === "ingreso" && (
        <div style={styles.cardBoxIngreso}>
          <div style={{ fontSize: "52px", marginBottom: "8px", textAlign: "center" }}>🪐</div>
          <h2 style={{ color: "#38bdf8", margin: "0 0 8px 0", textAlign: "center" }}>
            ¡Bienvenida/o a EduMisión Córdoba!
          </h2>
          <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: "1.5", marginBottom: "20px", textAlign: "center" }}>
            Muchas gracias por formar parte de esta experiencia. Este es un <strong>proyecto piloto experimental</strong> diseñado para poner a prueba nuevas formas de acompañar el aprendizaje de la matemática en el aula.
          </p>

          <form onSubmit={handleGuardarPerfilDocente} style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Nombre y Apellido del Docente:</label>
              <input
                type="text"
                placeholder="Ej: Profe Laura, Prof. Carlos Martínez"
                value={perfilDocente.nombre}
                onChange={(e) => setPerfilDocente({ ...perfilDocente, nombre: e.target.value })}
                style={styles.formInput}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Escuela Secundaria / IPEM:</label>
              <input
                type="text"
                placeholder="Ej: IPEM 268, Colegio Manuel Belgrano"
                value={perfilDocente.escuela}
                onChange={(e) => setPerfilDocente({ ...perfilDocente, escuela: e.target.value })}
                style={styles.formInput}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Curso / Año a Cargo:</label>
              <select
                value={perfilDocente.curso}
                onChange={(e) => setPerfilDocente({ ...perfilDocente, curso: e.target.value })}
                style={styles.formSelect}
              >
                <option value="1° Año A">1° Año A</option>
                <option value="1° Año B">1° Año B</option>
                <option value="1° Año C">1° Año C</option>
                <option value="2° Año">2° Año</option>
              </select>
            </div>

            <div style={styles.bannerBienvenidaInfo}>
              📢 <strong>¿Qué vas a poder ver y hacer en tu panel?</strong><br />
              <ul style={{ margin: "8px 0 8px 18px", padding: 0, fontSize: "13px", color: "#e2e8f0" }}>
                <li style={{ marginBottom: "6px" }}><strong>Monitorear el avance del grupo:</strong> Seguimiento visual del progreso de tus estudiantes en las 4 misiones de fracciones.</li>
                <li style={{ marginBottom: "6px" }}><strong>Diagnóstico automático de desvíos:</strong> Detección de patrones comunes (<em>como la suma directa de denominadores</em>) con alertas didácticas inmediatas, <strong>sin recargar tu trabajo diario</strong>, ofreciéndote una herramienta extra de apoyo para la clase.</li>
                <li style={{ marginBottom: "6px" }}><strong>Comunicación colectiva:</strong> Envío de consejos o consignas breves directamente a las pantallas de juego de tus alumnos.</li>
                <li style={{ marginBottom: "6px" }}><strong>Acompañamiento familiar:</strong> Generación automática de síntesis pedagógicas de desempeño para compartir con los padres a través de Ciudadano Digital (CiDi).</li>
              </ul>
              <div style={{ marginTop: "10px", fontSize: "12px", color: "#38bdf8", borderTop: "1px solid #334155", paddingTop: "8px" }}>
                📌 <em>Tu experiencia y opinión como docente son fundamentales para validar este prototipo. Te pedimos que, durante o al finalizar la prueba, nos dejes tus comentarios haciendo clic en el botón superior:</em> <strong>[ 📝 Valorar Consola y Sugerir Mejoras ]</strong>
              </div>
            </div>

            <button type="submit" style={styles.btnPrimaryIngreso}>
              🚀 INGRESAR A MI CONSOLA DOCENTE
            </button>
          </form>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {faseDocente === "panel" && (
        <>
          <header style={styles.dashboardHeader}>
            <div>
              <h1 style={styles.dashboardTitle}>Consola de Monitoreo Docente</h1>
              <p style={styles.dashboardSubtitle}>
                {perfilDocente.nombre} · {perfilDocente.escuela} ({perfilDocente.curso})
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <button
                onClick={() => setFaseDocente("evaluacion")}
                style={styles.btnValoracionTop}
              >
                📝 VALORAR CONSOLA Y SUGERIR MEJORAS
              </button>
              <span style={styles.teacherBadge}>👩‍🏫 DOCENTE AUTENTICADA</span>
            </div>
          </header>

          {/* FICHA POPUP PEDAGÓGICA Y OBJETIVOS SI SE HACE CLICK EN UNA MISIÓN */}
          {pedagogicalPopup && MISSION_PEDAGOGICAL_INFO[pedagogicalPopup] && (
            <div style={styles.topModalOverlay} onClick={() => setPedagogicalPopup(null)}>
              <div style={styles.topModalCardWide} onClick={(e) => e.stopPropagation()}>
                <div style={styles.topModalHeader}>
                  <h3 style={{ margin: 0, color: "#38bdf8", fontSize: "16px" }}>
                    ℹ️ Ficha Pedagógica: {MISSION_PEDAGOGICAL_INFO[pedagogicalPopup].title}
                  </h3>
                  <button style={styles.btnCloseModal} onClick={() => setPedagogicalPopup(null)}>×</button>
                </div>
                <div style={styles.pedagogicalBody}>
                  <p style={{ margin: "0 0 10px 0", fontSize: "13px", color: "#c084fc", fontWeight: "bold" }}>
                    Subtema: {MISSION_PEDAGOGICAL_INFO[pedagogicalPopup].subtitle}
                  </p>
                  <div style={styles.pedagogicalBox}>
                    <strong>🎮 Dinámica en Pantalla Alumno:</strong> {MISSION_PEDAGOGICAL_INFO[pedagogicalPopup].action}
                  </div>
                  <div style={styles.pedagogicalBox}>
                    <strong>🎯 Objetivo & Aprendizaje Buscado:</strong> {MISSION_PEDAGOGICAL_INFO[pedagogicalPopup].objectives}
                  </div>
                  <div style={styles.pedagogicalBox}>
                    <strong>📊 Evidencia de Conocimiento:</strong> {MISSION_PEDAGOGICAL_INFO[pedagogicalPopup].evidence}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div style={styles.kpiGrid}>
            <div style={{ ...styles.kpiCard, borderLeft: "4px solid #8b5cf6" }}>
              <p style={styles.kpiLabel}>🔵 % PARTICIPACIÓN</p>
              <p style={{ ...styles.kpiValue, color: "#c084fc" }}>{partPercentage}%</p>
              <div style={styles.kpiSub}>Evolución: 📈 Sem 1: 12% ➔ Sem 2: {partPercentage}%</div>
            </div>
            <div style={{ ...styles.kpiCard, borderLeft: "4px solid #10b981" }}>
              <p style={styles.kpiLabel}>🟢 % COMPLETITUD (EN VERDE)</p>
              <p style={{ ...styles.kpiValue, color: "#4ade80" }}>85%</p>
              <div style={styles.kpiSub}>Evolución: 📈 Sem 1: 5% ➔ Sem 2: 85%</div>
            </div>
            <div style={{ ...styles.kpiCard, borderLeft: "4px solid #10b981" }}>
              <p style={styles.kpiLabel}>🟢 % DOMINANTES (EN VERDE)</p>
              <p style={{ ...styles.kpiValue, color: "#4ade80" }}>{badgePercentage}%</p>
              <div style={styles.kpiSub}>Evolución: 📈 Sem 1: 0% ➔ Sem 2: {badgePercentage}%</div>
            </div>
          </div>

          <div style={styles.dashboardTeacherControlsCard}>
            <h3 style={{ ...styles.cardSectionTitle, color: "#c084fc", margin: 0 }}>📢 Enviar Consejos Colectivos a las Cabinas</h3>
            <p style={{ ...styles.instructions, margin: 0 }}>
              Escribí un aviso o sugerencia de aula. Aparecerá inmediatamente en las pantallas de todos los estudiantes.
            </p>
            <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Ej: ¡Tripulantes, recuerden usar lápiz y papel antes de responder!"
                style={styles.teacherDashboardInput}
              />
              <button onClick={handleSendMessage} style={styles.teacherDashboardSendBtn}>
                Transmitir Consejo
              </button>
            </div>
          </div>

          <div style={styles.dashboardGrid}>
            <div style={styles.leftColumn}>
              <div style={styles.dashboardCard}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <h3 style={{ ...styles.cardSectionTitle, margin: 0 }}>Listado General de Alumnos</h3>
                  <span style={{ fontSize: "11px", color: "#94a3b8" }}>
                    Tocá ℹ️ en cada misión para ver su ficha pedagógica
                  </span>
                </div>

                <table style={styles.table}>
                  <thead>
                    <tr style={styles.tableHeaderRow}>
                      <th style={styles.th}>Alumno (Nave)</th>
                      <th style={styles.th}>
                        <button onClick={() => setPedagogicalPopup("m1")} style={styles.btnPedagogicalPill}>
                          M1 (Agua) ℹ️
                        </button>
                      </th>
                      <th style={styles.th}>
                        <button onClick={() => setPedagogicalPopup("m2")} style={styles.btnPedagogicalPill}>
                          M2 (Combust.) ℹ️
                        </button>
                      </th>
                      <th style={styles.th}>
                        <button onClick={() => setPedagogicalPopup("m3")} style={styles.btnPedagogicalPill}>
                          M3 (Víveres) ℹ️
                        </button>
                      </th>
                      <th style={styles.th}>
                        <button onClick={() => setPedagogicalPopup("m4")} style={styles.btnPedagogicalPill}>
                          M4 (Despegue) ℹ️
                        </button>
                      </th>
                      <th style={styles.th}>Justif. M4</th>
                      <th style={styles.th}>Experiencia</th>
                      <th style={styles.th}>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} style={styles.tr}>
                        <td style={{ ...styles.td, fontWeight: "bold", color: "#ffffff" }}>
                          {student.name} <br />
                          <span style={{ fontSize: "10px", color: "#94a3b8" }}>🚀 {student.shipName}</span>
                        </td>
                        <td style={styles.td}>{renderMissionCell(student, "m1")}</td>
                        <td style={styles.td}>{renderMissionCell(student, "m2")}</td>
                        <td style={styles.td}>{renderMissionCell(student, "m3")}</td>
                        <td style={styles.td}>{renderMissionCell(student, "m4")}</td>
                        <td style={styles.td}>
                          {student.justificationQuality ? (
                            <span style={justificationLabelStyle(student.justificationQuality)}>
                              {student.justificationQuality === "Master" ? "🎓 CIENTÍFICA" : "🧠 INTUITIVA"}
                            </span>
                          ) : (
                            <span style={{ fontSize: "11px", color: "#64748b", fontWeight: "bold" }}>PENDIENTE</span>
                          )}
                        </td>
                        <td style={styles.td}>
                          <strong style={{ color: "#38bdf8" }}>{student.xp} XP</strong>
                        </td>
                        <td style={styles.td}>
                          <button onClick={() => setSelectedStudent(student)} style={styles.btnTableAction}>
                            Analizar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={styles.rightColumn}>
              <div style={styles.dashboardCard}>
                <h3 style={styles.cardSectionTitle}>Diagnóstico Colectivo (Sistema Experto)</h3>
                <p style={styles.instructions}>
                  El motor agrupa los desvíos detectados en el piloto para facilitar la intervención presencial del docente.
                </p>

                <div style={styles.alertsContainer}>
                  <div style={{
                    ...styles.alertBox,
                    borderColor: errorsCount.ERR_DIRECT > 0 ? "#fb923c" : "#1e293b",
                    backgroundColor: errorsCount.ERR_DIRECT > 0 ? "rgba(251,146,60,0.05)" : "transparent"
                  }}>
                    <div style={styles.alertHeader}>
                      <span style={errorsCount.ERR_DIRECT > 0 ? styles.alertTitleActive : styles.alertTitleInactive}>
                        ⚠ Suma Directa de Fracciones (ERR_DIRECT)
                      </span>
                      <span style={styles.alertBadge}>{errorsCount.ERR_DIRECT} Alumnos</span>
                    </div>
                    {errorsCount.ERR_DIRECT > 0 && (
                      <p style={styles.alertDesc}>{SYSTEM_EXPERT_ALERTS.ERR_DIRECT}</p>
                    )}
                  </div>

                  <div style={{
                    ...styles.alertBox,
                    borderColor: errorsCount.ERR_LCD > 0 ? "#fb923c" : "#1e293b",
                    backgroundColor: errorsCount.ERR_LCD > 0 ? "rgba(251,146,60,0.05)" : "transparent"
                  }}>
                    <div style={styles.alertHeader}>
                      <span style={errorsCount.ERR_LCD > 0 ? styles.alertTitleActive : styles.alertTitleInactive}>
                        🧩 Mínimo Común Denominador Incorrecto (ERR_LCD)
                      </span>
                      <span style={styles.alertBadge}>{errorsCount.ERR_LCD} Alumnos</span>
                    </div>
                    {errorsCount.ERR_LCD > 0 && (
                      <p style={styles.alertDesc}>{SYSTEM_EXPERT_ALERTS.ERR_LCD}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MODAL CENTRADO Y SUPERIOR DE ANÁLISIS INDIVIDUAL */}
          {selectedStudent && (
            <DrawerWithSendButton
              student={selectedStudent}
              onClose={() => setSelectedStudent(null)}
            />
          )}
        </>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 3. CUESTIONARIO FINAL DE VALORACIÓN Y EVALUACIÓN DOCENTE   */}
{/* 3. CUESTIONARIO FINAL DE VALORACIÓN Y EVALUACIÓN DOCENTE   */}
      {/* ────────────────────────────────────────────────────────── */}
      {faseDocente === "evaluacion" && (
        <div style={styles.cardBoxIngreso}>
          <div style={{ fontSize: "52px", marginBottom: "8px", textAlign: "center" }}>📝</div>
          <h2 style={{ color: "#38bdf8", margin: "0 0 8px 0", textAlign: "center" }}>
            Valoración Pedagógica del Piloto (Docente)
          </h2>
          <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: "1.5", marginBottom: "20px", textAlign: "center" }}>
            Tu retroalimentación nos ayuda a evaluar y perfeccionar la herramienta.
          </p>

          <form onSubmit={handleEnviarEncuestaDocente} style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.surveyLabelDocente}>
                1. Valor Pedagógico de las Misiones: ¿Cómo evaluás la propuesta de las 4 misiones para el abordaje de fracciones?
              </label>
              <div style={styles.radioGroup}>
                {["Muy valiosa", "Valiosa", "Poco valiosa", "No aporta al aula"].map((opt) => (
                  <label key={opt} style={styles.radioOptionDocente}>
                    <input
                      type="radio"
                      name="valorPedagogico"
                      value={opt}
                      checked={encuestaDocente.valorPedagogico === opt}
                      onChange={(e) => setEncuestaDocente({ ...encuestaDocente, valorPedagogico: e.target.value })}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.surveyLabelDocente}>
                2. Nivel de Dificultad: ¿Cómo percibiste la dificultad de los desafíos para el nivel de tus alumnos?
              </label>
              <div style={styles.radioGroup}>
                {["Adecuada", "Muy alta", "Muy baja", "Desigual según la misión"].map((opt) => (
                  <label key={opt} style={styles.radioOptionDocente}>
                    <input
                      type="radio"
                      name="nivelDificultad"
                      value={opt}
                      checked={encuestaDocente.nivelDificultad === opt}
                      onChange={(e) => setEncuestaDocente({ ...encuestaDocente, nivelDificultad: e.target.value })}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.surveyLabelDocente}>
                3. Contacto Grupal (Mensajes a Cabinas): ¿Qué tan útil te resultó la función de enviar avisos colectivos a las pantallas de los estudiantes?
              </label>
              <div style={styles.radioGroup}>
                {["Muy útil", "Útil", "Poco útil", "No la utilicé"].map((opt) => (
                  <label key={opt} style={styles.radioOptionDocente}>
                    <input
                      type="radio"
                      name="contactoGrupal"
                      value={opt}
                      checked={encuestaDocente.contactoGrupal === opt}
                      onChange={(e) => setEncuestaDocente({ ...encuestaDocente, contactoGrupal: e.target.value })}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.surveyLabelDocente}>
                4. Síntesis de Desempeño para Familias (vía CiDi): ¿Qué valor le encontrás a enviar informes automáticos con consejos lúdicos al hogar?
              </label>
              <div style={styles.radioGroup}>
                {["Alto valor para involucrar a los padres", "Moderado", "Escaso", "Prefiero comunicación tradicional"].map((opt) => (
                  <label key={opt} style={styles.radioOptionDocente}>
                    <input
                      type="radio"
                      name="sintesisFamilias"
                      value={opt}
                      checked={encuestaDocente.sintesisFamilias === opt}
                      onChange={(e) => setEncuestaDocente({ ...encuestaDocente, sintesisFamilias: e.target.value })}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.surveyLabelDocente}>
                5. Propuestas de Mejora: ¿Qué cambios, agregados o correcciones nos sugerís para que este panel sea aún más práctico en tu trabajo diario?
              </label>
              <textarea
                placeholder="Escribí aquí tus comentarios, ideas o sugerencias de mejora..."
                value={encuestaDocente.sugerenciasMejora}
                onChange={(e) => setEncuestaDocente({ ...encuestaDocente, sugerenciasMejora: e.target.value })}
                style={styles.formTextareaDocente}
                rows="4"
              />
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button type="submit" style={styles.btnPrimaryIngreso}>
                ✉️ ENVIAR VALORACIÓN A CONTROL CENTRAL
              </button>
              <button
                type="button"
                onClick={() => setFaseDocente("panel")}
                style={styles.btnCancelDocente}
              >
                Cancelar y Volver al Panel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

