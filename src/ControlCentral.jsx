import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";

const exportToExcelCSV = (filename, headers, rows) => {
  const bom = "\uFEFF";
  const csvContent = bom + [
    headers.map(h => `"${h}"`).join(";"),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(";"))
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const INITIAL_DOCENTES = [
  { id: "d1", name: "Profe Laura", escuela: "Escuela IPEM 268", curso: "1° Año B", cursoId: "curso-268-1b", alumnosCount: 4 },
  { id: "d2", name: "Profe Carlos", escuela: "Colegio Manuel Belgrano", curso: "1° Año A", cursoId: "curso-mb-1a", alumnosCount: 3 },
  { id: "d3", name: "Profe Mariana", escuela: "IPEM 198 Martín Fierro", curso: "1° Año C", cursoId: "curso-198-1c", alumnosCount: 1 }
];

const INITIAL_UNLINKED = [
  { uuid: "u-101", nickname: "Nico_Space", escuela: "IPEM 268 (Sin grupo)", curso: "1° B", xp: 100, lastActive: "Hace instantes" },
  { uuid: "u-102", nickname: "Valen_2026", escuela: "Manuel Belgrano (Sin grupo)", curso: "1° A", xp: 250, lastActive: "Hace 5 min" },
  { uuid: "u-103", nickname: "Gabi_R", escuela: "IPEM 268 (Sin grupo)", curso: "1° B", xp: 0, lastActive: "Hace 10 min" }
];

const INITIAL_LINKED = [
  { uuid: "7a3b2c1d-4e5f-6a7b", nickname: "Martín G.", docenteId: "d1", escuela: "Escuela IPEM 268", curso: "1° Año B", xp: 750, badgeEarned: true, m1: "completado", m2: "completado", m3: "completado", m4: "completado" },
  { uuid: "8b4c3d2e-5f6a-7b8c", nickname: "Sofía V.", docenteId: "d1", escuela: "Escuela IPEM 268", curso: "1° Año B", xp: 250, badgeEarned: false, m1: "completado", m2: "en_curso", m3: "bloqueado", m4: "bloqueado" },
  { uuid: "9c5d4e3f-6a7b-8c9d", nickname: "Facundo S.", docenteId: "d1", escuela: "Escuela IPEM 268", curso: "1° Año B", xp: 450, badgeEarned: false, m1: "completado", m2: "completado", m3: "completado", m4: "bloqueado" },
  { uuid: "1d2e3f4a-5b6c-7d8e", nickname: "Valentina R.", docenteId: "d1", escuela: "Escuela IPEM 268", curso: "1° Año B", xp: 750, badgeEarned: true, m1: "completado", m2: "completado", m3: "completado", m4: "completado" },
  { uuid: "2e3f4a5b-6c7d-8e9f", nickname: "Tomás B.", docenteId: "d2", escuela: "Colegio Manuel Belgrano", curso: "1° Año A", xp: 100, badgeEarned: false, m1: "completado", m2: "bloqueado", m3: "bloqueado", m4: "bloqueado" },
  { uuid: "3f4a5b6c-7d8e-9f0a", nickname: "Camila O.", docenteId: "d2", escuela: "Colegio Manuel Belgrano", curso: "1° Año A", xp: 450, badgeEarned: false, m1: "completado", m2: "completado", m3: "completado", m4: "bloqueado" },
  { uuid: "4a5b6c7d-8e9f-0a1b", nickname: "Bautista L.", docenteId: "d2", escuela: "Colegio Manuel Belgrano", curso: "1° Año A", xp: 750, badgeEarned: true, m1: "completado", m2: "completado", m3: "completado", m4: "completado" },
  { uuid: "5b6c7d8e-9f0a-1b2c", nickname: "Delfina P.", docenteId: "d3", escuela: "IPEM 198 Martín Fierro", curso: "1° Año C", xp: 0, badgeEarned: false, m1: "bloqueado", m2: "bloqueado", m3: "bloqueado", m4: "bloqueado" }
];

export default function App() {
  const [docentes, setDocentes] = useState(INITIAL_DOCENTES);
  const [unlinked, setUnlinked] = useState(INITIAL_UNLINKED);
  const [linked, setLinked] = useState(INITIAL_LINKED);
  const [activeTab, setActiveTab] = useState("vincular");
  const [toast, setToast] = useState(null);
  const [selectedDocenteForAssign, setSelectedDocenteForAssign] = useState(INITIAL_DOCENTES[0]?.id || "");
  const [expandedDocenteId, setExpandedDocenteId] = useState(null);

  // Modal para alta de docente
  const [showAddDocenteModal, setShowDocenteModal] = useState(false);
  const [newDocenteName, setNewDocenteName] = useState("");
  const [newEscuela, setNewEscuela] = useState("");
  const [newCurso, setNewCurso] = useState("");

  // Telemetría en vivo desde Firebase
  const [liveLogs, setLiveLogs] = useState([]);

  // Escuchador Firestore
  useEffect(() => {
    let unsubscribe = () => {};
    try {
      const q = query(collection(db, "bitacora_alumnos"), orderBy("fecha", "desc"));
      unsubscribe = onSnapshot(q, (snapshot) => {
        const logs = [];
        snapshot.forEach((doc) => {
          logs.push({ id: doc.id, ...doc.data() });
        });
        setLiveLogs(logs);

        // Detectar nuevos alumnos flotantes no asignados en los logs
        if (logs.length > 0) {
          logs.forEach((log) => {
            if (log.alumno && !linked.some((s) => s.nickname.toLowerCase() === log.alumno.toLowerCase())) {
              setUnlinked((prev) => {
                if (prev.some((u) => u.nickname.toLowerCase() === log.alumno.toLowerCase())) return prev;
                return [
                  {
                    uuid: log.id || `u-${Date.now()}`,
                    nickname: log.alumno,
                    escuela: log.escuela || "Escuela Piloto",
                    curso: log.curso || "1° Año",
                    xp: log.xp || 150,
                    lastActive: "En vivo (Firestore)"
                  },
                  ...prev
                ];
              });
            }
          });
        }
      }, (err) => console.error("Firestore error:", err));
    } catch (e) {
      console.error("Firestore no disponible:", e);
    }
    return () => unsubscribe();
  }, [linked]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // Assignar alumno a un docente
  const handleAssignStudent = (studentUuid) => {
    const targetStudent = unlinked.find((s) => s.uuid === studentUuid);
    const targetDocente = docentes.find((d) => d.id === selectedDocenteForAssign);
    if (!targetStudent || !targetDocente) return;

    const newLinkedStudent = {
      uuid: targetStudent.uuid,
      nickname: targetStudent.nickname,
      docenteId: targetDocente.id,
      escuela: targetDocente.escuela,
      curso: targetDocente.curso,
      xp: targetStudent.xp,
      badgeEarned: targetStudent.xp >= 500,
      m1: "completado",
      m2: "en_curso",
      m3: "bloqueado",
      m4: "bloqueado"
    };

    setLinked((prev) => [newLinkedStudent, ...prev]);
    setUnlinked((prev) => prev.filter((s) => s.uuid !== studentUuid));
    setDocentes((prev) =>
      prev.map((d) => (d.id === targetDocente.id ? { ...d, alumnosCount: d.alumnosCount + 1 } : d))
    );

    showToast(`✅ Alumno "${targetStudent.nickname}" asignado a ${targetDocente.name} (${targetDocente.escuela}).`);
  };

  // Desvincular alumno
  const handleUnlinkStudent = (studentUuid, docenteName) => {
    const targetStudent = linked.find((s) => s.uuid === studentUuid);
    if (!targetStudent) return;

    setLinked((prev) => prev.filter((s) => s.uuid !== studentUuid));
    setUnlinked((prev) => [
      {
        uuid: targetStudent.uuid,
        nickname: targetStudent.nickname,
        escuela: targetStudent.escuela + " (Sin grupo)",
        curso: targetStudent.curso,
        xp: targetStudent.xp,
        lastActive: "Recientemente desvinculado"
      },
      ...prev
    ]);

    setDocentes((prev) =>
      prev.map((d) => (d.id === targetStudent.docenteId ? { ...d, alumnosCount: Math.max(0, d.alumnosCount - 1) } : d))
    );

    showToast(`ℹ️ "${targetStudent.nickname}" fue desvinculado de ${docenteName}.`);
  };

  // Crear nuevo docente
  const handleCreateDocente = (e) => {
    e.preventDefault();
    if (!newDocenteName || !newEscuela) return;

    const newDoc = {
      id: `d-${Date.now()}`,
      name: newDocenteName,
      escuela: newEscuela,
      curso: newCurso || "1° Año",
      cursoId: `curso-${Date.now().toString().slice(-4)}`,
      alumnosCount: 0
    };

    setDocentes((prev) => [...prev, newDoc]);
    setSelectedDocenteForAssign(newDoc.id);
    setShowDocenteModal(false);
    setNewDocenteName("");
    setNewEscuela("");
    setNewCurso("");

    showToast(`👩‍🏫 Docente "${newDoc.name}" habilitado/a para recibir alumnos.`);
  };

  // Exportar datos
  const handleExportData = () => {
    const headers = ["UUID Alumno", "Nickname", "Escuela", "Curso", "Docente Asignado", "Puntos XP", "Insignia"];
    const rows = linked.map((s) => {
      const doc = docentes.find((d) => d.id === s.docenteId);
      return [
        s.uuid,
        s.nickname,
        s.escuela,
        s.curso,
        doc ? doc.name : "Sin Asignar",
        s.xp,
        s.badgeEarned ? "Otorgada" : "En Progreso"
      ];
    });

    exportToExcelCSV("EduMision_Reporte_Control_Central_2026.csv", headers, rows);
    showToast("📊 Reporte CSV descargado con éxito.");
  };

  return (
    <div style={{ backgroundColor: "#030712", color: "#f8fafc", minHeight: "100vh", fontFamily: "sans-serif", padding: "20px" }}>
      {toast && (
        <div style={{ position: "fixed", bottom: "20px", right: "20px", backgroundColor: "#0284c7", color: "#fff", padding: "12px 20px", borderRadius: "10px", fontWeight: "bold", zIndex: 1000, boxShadow: "0 4px 12px rgba(0,0,0,0.4)" }}>
          {toast}
        </div>
      )}

      {/* ENCABEZADO CONTROL CENTRAL */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1e293b", paddingBottom: "16px", marginBottom: "20px" }}>
        <div>
          <h1 style={{ color: "#38bdf8", margin: 0, fontSize: "24px" }}>🏛️ EduMisión Córdoba · Panel de Control Central</h1>
          <p style={{ color: "#94a3b8", margin: "4px 0 0 0", fontSize: "13px" }}>Asignación de Alumnos, Gestión de Docentes y Monitoreo Provincial en Tiempo Real</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setShowDocenteModal(true)} style={{ backgroundColor: "#10b981", color: "#fff", border: "none", padding: "10px 16px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", fontSize: "13px" }}>
            ➕ Crear / Habilitar Docente
          </button>
          <button onClick={handleExportData} style={{ backgroundColor: "#8b5cf6", color: "#fff", border: "none", padding: "10px 16px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", fontSize: "13px" }}>
            📊 Exportar Reporte CSV
          </button>
        </div>
      </header>

      {/* PESTAÑAS PRINCIPALES */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => setActiveTab("vincular")} style={{ padding: "10px 20px", borderRadius: "8px", border: activeTab === "vincular" ? "2px solid #38bdf8" : "1px solid #1e293b", backgroundColor: activeTab === "vincular" ? "rgba(56, 189, 248, 0.15)" : "#0f172a", color: "#fff", fontWeight: "bold", cursor: "pointer" }}>
          🔗 Vincular y Asignar Alumnos ({unlinked.length} Flotantes)
        </button>
        <button onClick={() => setActiveTab("docentes")} style={{ padding: "10px 20px", borderRadius: "8px", border: activeTab === "docentes" ? "2px solid #38bdf8" : "1px solid #1e293b", backgroundColor: activeTab === "docentes" ? "rgba(56, 189, 248, 0.15)" : "#0f172a", color: "#fff", fontWeight: "bold", cursor: "pointer" }}>
          👩‍🏫 Docentes y Cursos ({docentes.length})
        </button>
        <button onClick={() => setActiveTab("telemetria")} style={{ padding: "10px 20px", borderRadius: "8px", border: activeTab === "telemetria" ? "2px solid #38bdf8" : "1px solid #1e293b", backgroundColor: activeTab === "telemetria" ? "rgba(56, 189, 248, 0.15)" : "#0f172a", color: "#fff", fontWeight: "bold", cursor: "pointer" }}>
          📡 Telemetría xAPI en Vivo ({liveLogs.length} Eventos)
        </button>
      </div>

      {/* CONTENIDO TAB 1: VINCULAR ALUMNOS */}
      {activeTab === "vincular" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          {/* COLUMNA IZQUIERDA: ALUMNOS SIN ASIGNAR */}
          <div style={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "12px", padding: "16px" }}>
            <h3 style={{ color: "#fb923c", margin: "0 0 10px 0", fontSize: "16px" }}>
              ⚡ Alumnos Ingresados / Flotantes ({unlinked.length})
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "12px", marginBottom: "15px" }}>
              Seleccioná un docente de la lista derecha y asignale los estudiantes que se registraron de forma libre.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "400px", overflowY: "auto" }}>
              {unlinked.length === 0 ? (
                <div style={{ color: "#64748b", fontStyle: "italic", textAlign: "center", padding: "20px" }}>
                  ¡No hay alumnos pendientes de asignación! Todos están vinculados.
                </div>
              ) : (
                unlinked.map((u) => (
                  <div key={u.uuid} style={{ backgroundColor: "#020617", border: "1px solid #334155", borderRadius: "8px", padding: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: "bold", color: "#f8fafc" }}>{u.nickname}</div>
                      <div style={{ color: "#94a3b8", fontSize: "12px" }}>{u.escuela} · {u.curso}</div>
                      <div style={{ color: "#38bdf8", fontSize: "11px" }}>{u.xp} XP • {u.lastActive}</div>
                    </div>
                    <button onClick={() => handleAssignStudent(u.uuid)} style={{ backgroundColor: "#0284c7", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}>
                      Asignar ➔
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* COLUMNA DERECHA: SELECTOR DE DOCENTE Y GRUPOS */}
          <div style={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "12px", padding: "16px" }}>
            <h3 style={{ color: "#38bdf8", margin: "0 0 10px 0", fontSize: "16px" }}>
              🎯 Docente Destino para Asignaciones
            </h3>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", color: "#cbd5e1", fontSize: "12px", marginBottom: "6px" }}>Seleccionar Docente / Curso Activo:</label>
              <select value={selectedDocenteForAssign} onChange={(e) => setSelectedDocenteForAssign(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #334155", backgroundColor: "#020617", color: "#fff", fontWeight: "bold" }}>
                {docentes.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} — {d.escuela} ({d.curso}) [{d.alumnosCount} Alumnos]
                  </option>
                ))}
              </select>
            </div>

            <h4 style={{ color: "#cbd5e1", fontSize: "14px", marginTop: "20px" }}>Alumnos Asignados Actualmente ({linked.length}):</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "300px", overflowY: "auto" }}>
              {linked.map((l) => {
                const doc = docentes.find((d) => d.id === l.docenteId);
                return (
                  <div key={l.uuid} style={{ backgroundColor: "#020617", border: "1px solid #1e293b", borderRadius: "6px", padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <strong style={{ color: "#f8fafc" }}>{l.nickname}</strong>
                      <span style={{ color: "#64748b", fontSize: "11px", marginLeft: "8px" }}>➔ {doc ? doc.name : "Docente"} ({l.escuela})</span>
                    </div>
                    <button onClick={() => handleUnlinkStudent(l.uuid, doc ? doc.name : "Docente")} style={{ backgroundColor: "transparent", color: "#ef4444", border: "1px solid #ef4444", borderRadius: "4px", padding: "2px 6px", cursor: "pointer", fontSize: "11px" }}>
                      Desvincular ✖
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* CONTENIDO TAB 2: DOCENTES */}
      {activeTab === "docentes" && (
        <div style={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "12px", padding: "20px" }}>
          <h3 style={{ color: "#38bdf8", marginTop: 0 }}>Listado de Docentes y Escuelas Registradas</h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #1e293b", color: "#64748b", textAlign: "left" }}>
                  <th style={{ padding: "10px" }}>Docente</th>
                  <th style={{ padding: "10px" }}>Escuela</th>
                  <th style={{ padding: "10px" }}>Curso</th>
                  <th style={{ padding: "10px" }}>Código Único</th>
                  <th style={{ padding: "10px" }}>Alumnos a Cargo</th>
                  <th style={{ padding: "10px" }}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {docentes.map((d) => (
                  <tr key={d.id} style={{ borderBottom: "1px solid #0f172a" }}>
                    <td style={{ padding: "10px", fontWeight: "bold" }}>{d.name}</td>
                    <td style={{ padding: "10px", color: "#cbd5e1" }}>{d.escuela}</td>
                    <td style={{ padding: "10px", color: "#38bdf8" }}>{d.curso}</td>
                    <td style={{ padding: "10px", fontFamily: "monospace", color: "#f59e0b" }}>{d.cursoId}</td>
                    <td style={{ padding: "10px" }}><span style={{ backgroundColor: "rgba(16, 185, 129, 0.15)", color: "#10b981", padding: "2px 8px", borderRadius: "4px", fontWeight: "bold" }}>{d.alumnosCount} Alumnos</span></td>
                    <td style={{ padding: "10px" }}>
                      <button onClick={() => setExpandedDocenteId(expandedDocenteId === d.id ? null : d.id)} style={{ backgroundColor: "#0284c7", color: "#fff", border: "none", padding: "4px 8px", borderRadius: "4px", cursor: "pointer", fontSize: "11px" }}>
                        {expandedDocenteId === d.id ? "Ocultar Alumnos" : "Ver Grupo"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CONTENIDO TAB 3: TELEMETRÍA EN VIVO */}
      {activeTab === "telemetria" && (
        <div style={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "12px", padding: "20px" }}>
          <h3 style={{ color: "#38bdf8", marginTop: 0, display: "flex", alignItems: "center", gap: "10px" }}>
            📡 Telemetría xAPI Provincial en Tiempo Real
            <span style={{ fontSize: "12px", backgroundColor: "#10b981", color: "#fff", padding: "2px 8px", borderRadius: "10px" }}>● FIREBASE FIRESTORE CONECTADO</span>
          </h3>
          <p style={{ color: "#94a3b8", fontSize: "13px" }}>Eventos de aprendizaje recibidos desde los celulares y computadoras de los alumnos:</p>

          <div style={{ backgroundColor: "#020617", border: "1px solid #1e293b", borderRadius: "8px", padding: "15px", maxHeight: "400px", overflowY: "auto", fontFamily: "monospace", fontSize: "12px" }}>
            {liveLogs.length === 0 ? (
              <div style={{ color: "#64748b", fontStyle: "italic" }}>Esperando primeros eventos de alumnos en tiempo real...</div>
            ) : (
              liveLogs.map((log) => (
                <div key={log.id} style={{ marginBottom: "8px", borderBottom: "1px dashed #1e293b", paddingBottom: "6px", display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ color: "#38bdf8", fontWeight: "bold" }}>[{log.alumno || "Alumno"}]</span> ({log.escuela || "Córdoba"}): <span style={{ color: "#f8fafc" }}>{log.evento}</span>
                  </div>
                  <span style={{ color: "#f59e0b" }}>{log.xp || 0} XP</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* MODAL CREAR DOCENTE */}
      {showAddDocenteModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.75)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#0f172a", border: "1px solid #38bdf8", borderRadius: "16px", padding: "25px", maxWidth: "450px", width: "100%" }}>
            <h3 style={{ color: "#38bdf8", marginTop: 0 }}>Habilitar Nuevo Docente / Escuela</h3>
            <form onSubmit={handleCreateDocente} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", marginBottom: "4px" }}>Nombre del Docente:</label>
                <input type="text" placeholder="Ej: Prof. María Eugenia" value={newDocenteName} onChange={(e) => setNewDocenteName(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #334155", backgroundColor: "#020617", color: "#fff" }} required />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", marginBottom: "4px" }}>Escuela / IPEM:</label>
                <input type="text" placeholder="Ej: IPEM 35 Ricardo Rojas" value={newEscuela} onChange={(e) => setNewEscuela(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #334155", backgroundColor: "#020617", color: "#fff" }} required />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", marginBottom: "4px" }}>Curso:</label>
                <input type="text" placeholder="Ej: 1° Año A" value={newCurso} onChange={(e) => setNewCurso(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #334155", backgroundColor: "#020617", color: "#fff" }} />
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button type="submit" style={{ flex: 1, padding: "10px", borderRadius: "8px", backgroundColor: "#10b981", color: "#fff", border: "none", fontWeight: "bold", cursor: "pointer" }}>
                  Habilitar
                </button>
                <button type="button" onClick={() => setShowDocenteModal(false)} style={{ padding: "10px 15px", borderRadius: "8px", backgroundColor: "transparent", color: "#94a3b8", border: "1px solid #334155", cursor: "pointer" }}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
