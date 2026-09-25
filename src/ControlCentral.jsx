import React, { useState } from "react";

const exportToExcelCSV = (filename, headers, rows) => {
  const bom = "\uFEFF";
  const csvContent = bom + [
    headers.map(h => `"${String(h).replace(/"/g, '""')}"`).join(";"),
    ...rows.map(row => row.map(cell => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(";"))
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
  { uuid: "u-101", nickname: "Nico_Space", edad: "13", curso: "1° B", escuela: "IPEM 268", xp: 100, lastActive: "16:42:10" },
  { uuid: "u-102", nickname: "Valen_2026", edad: "12", curso: "1° A", escuela: "Manuel Belgrano", xp: 250, lastActive: "16:40:05" },
  { uuid: "u-103", nickname: "Gabi_R", edad: "13", curso: "1° B", escuela: "IPEM 268", xp: 0, lastActive: "16:38:19" },
  { uuid: "u-104", nickname: "Lia_Star", edad: "12", curso: "1° C", escuela: "IPEM 198", xp: 450, lastActive: "16:35:00" }
];

const INITIAL_LINKED = [
  { uuid: "7a3b2c1d-4e5f-6a7b", nickname: "Martín G.", edad: "13", docenteId: "d1", escuela: "Escuela IPEM 268", curso: "1° Año B", xp: 750, badgeEarned: true, m1: "completado", m2: "completado", m3: "completado", m4: "completado", errores: 0, ayudas: 0 },
  { uuid: "8b4c3d2e-5f6a-7b8c", nickname: "Sofía V.", edad: "12", docenteId: "d1", escuela: "Escuela IPEM 268", curso: "1° Año B", xp: 250, badgeEarned: false, m1: "completado", m2: "en_curso", m3: "bloqueado", m4: "bloqueado", errores: 4, ayudas: 1 },
  { uuid: "9c5d4e3f-6a7b-8c9d", nickname: "Facundo S.", edad: "13", docenteId: "d1", escuela: "Escuela IPEM 268", curso: "1° Año B", xp: 450, badgeEarned: false, m1: "completado", m2: "completado", m3: "completado", m4: "bloqueado", errores: 3, ayudas: 2 },
  { uuid: "1d2e3f4a-5b6c-7d8e", nickname: "Valentina R.", edad: "13", docenteId: "d1", escuela: "Escuela IPEM 268", curso: "1° Año B", xp: 750, badgeEarned: true, m1: "completado", m2: "completado", m3: "completado", m4: "completado", errores: 0, ayudas: 0 },
  { uuid: "2e3f4a5b-6c7d-8e9f", nickname: "Tomás B.", edad: "12", docenteId: "d2", escuela: "Colegio Manuel Belgrano", curso: "1° Año A", xp: 100, badgeEarned: false, m1: "completado", m2: "bloqueado", m3: "bloqueado", m4: "bloqueado", errores: 2, ayudas: 2 },
  { uuid: "3f4a5b6c-7d8e-9f0a", nickname: "Camila O.", edad: "13", docenteId: "d2", escuela: "Colegio Manuel Belgrano", curso: "1° Año A", xp: 450, badgeEarned: false, m1: "completado", m2: "completado", m3: "completado", m4: "bloqueado", errores: 3, ayudas: 1 },
  { uuid: "4a5b6c7d-8e9f-0a1b", nickname: "Bautista L.", edad: "13", docenteId: "d2", escuela: "Colegio Manuel Belgrano", curso: "1° Año A", xp: 750, badgeEarned: true, m1: "completado", m2: "completado", m3: "completado", m4: "completado", errores: 2, ayudas: 2 },
  { uuid: "5b6c7d8e-9f0a-1b2c", nickname: "Delfina P.", edad: "12", docenteId: "d3", escuela: "IPEM 198 Martín Fierro", curso: "1° Año C", xp: 0, badgeEarned: false, m1: "bloqueado", m2: "bloqueado", m3: "bloqueado", m4: "bloqueado", errores: 0, ayudas: 0 }
];

export default function App() {
  const [docentes, setDocentes] = useState(INITIAL_DOCENTES);
  const [unlinked, setUnlinked] = useState(INITIAL_UNLINKED);
  const [linked, setLinked] = useState(INITIAL_LINKED);
  const [activeTab, setActiveTab] = useState("vincular");
  const [toast, setToast] = useState(null);
  const [selectedDocenteForAssign, setSelectedDocenteForAssign] = useState(INITIAL_DOCENTES[0]?.id || "");

  // Estado para ver alumnos de un docente desplegado
  const [expandedDocenteId, setExpandedDocenteId] = useState(null);

  // Modal para alta de docente
  const [showAddDocenteModal, setShowDocenteModal] = useState(false);
  const [newDocenteName, setNewDocenteName] = useState("");
  const [newEscuela, setNewEscuela] = useState("");
  const [newCurso, setNewCurso] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // 1. Vincular alumno a un docente
  const handleAssignStudent = (studentUuid) => {
    const targetStudent = unlinked.find((s) => s.uuid === studentUuid);
    const targetDocente = docentes.find((d) => d.id === selectedDocenteForAssign);
    if (!targetStudent || !targetDocente) return;

    const newLinkedStudent = {
      uuid: targetStudent.uuid,
      nickname: targetStudent.nickname,
      edad: targetStudent.edad,
      docenteId: targetDocente.id,
      escuela: targetDocente.escuela,
      curso: targetDocente.curso,
      xp: targetStudent.xp,
      badgeEarned: targetStudent.xp >= 500,
      m1: targetStudent.xp >= 100 ? "completado" : "en_curso",
      m2: "bloqueado",
      m3: "bloqueado",
      m4: "bloqueado",
      errores: 0,
      ayudas: 0
    };

    setLinked((prev) => [newLinkedStudent, ...prev]);
    setUnlinked((prev) => prev.filter((s) => s.uuid !== studentUuid));
    setDocentes((prev) =>
      prev.map((d) => (d.id === targetDocente.id ? { ...d, alumnosCount: d.alumnosCount + 1 } : d))
    );

    showToast(`✅ Alumno "${targetStudent.nickname}" vinculado a ${targetDocente.name} (${targetDocente.curso})`);
  };

  // 2. Desvincular alumno individual con X de la lista de un docente
  const handleUnlinkStudent = (studentUuid, docenteName) => {
    const student = linked.find((s) => s.uuid === studentUuid);
    if (!student) return;

    if (window.confirm(`¿Desvincular a "${student.nickname}" de ${docenteName}? Quedará libre para relocalizar.`)) {
      // Mover a unlinked
      const unlinkedStudent = {
        uuid: student.uuid,
        nickname: student.nickname,
        edad: student.edad,
        curso: student.curso,
        escuela: student.escuela,
        xp: student.xp,
        lastActive: new Date().toLocaleTimeString("es-AR")
      };

      setUnlinked((prev) => [unlinkedStudent, ...prev]);
      setLinked((prev) => prev.filter((s) => s.uuid !== studentUuid));
      setDocentes((prev) =>
        prev.map((d) => (d.id === student.docenteId ? { ...d, alumnosCount: Math.max(0, d.alumnosCount - 1) } : d))
      );

      showToast(`✖ Alumno "${student.nickname}" desvinculado. Disponible para relocalización.`);
    }
  };

  // 3. Dar de baja a un docente completo y relocalizar todos sus alumnos
  const handleRemoveDocente = (docenteId) => {
    const targetDocente = docentes.find((d) => d.id === docenteId);
    if (!targetDocente) return;

    const affectedStudents = linked.filter((s) => s.docenteId === docenteId);

    if (
      window.confirm(
        `¿Confirmás DAR DE BAJA a la docente ${targetDocente.name} (${targetDocente.escuela})?\n\nSus ${affectedStudents.length} alumnos quedarán libres en el sistema para ser relocalizados.`
      )
    ) {
      // Convertir todos los alumnos de esta docente a unlinked
      const newlyUnlinked = affectedStudents.map((s) => ({
        uuid: s.uuid,
        nickname: s.nickname,
        edad: s.edad,
        curso: s.curso,
        escuela: s.escuela,
        xp: s.xp,
        lastActive: new Date().toLocaleTimeString("es-AR")
      }));

      setUnlinked((prev) => [...newlyUnlinked, ...prev]);
      setLinked((prev) => prev.filter((s) => s.docenteId !== docenteId));
      setDocentes((prev) => prev.filter((d) => d.id !== docenteId));

      if (expandedDocenteId === docenteId) setExpandedDocenteId(null);
      if (selectedDocenteForAssign === docenteId) {
        const remaining = docentes.filter((d) => d.id !== docenteId);
        if (remaining.length > 0) setSelectedDocenteForAssign(remaining[0].id);
      }

      showToast(`🗑️ Docente ${targetDocente.name} dada de baja. ${affectedStudents.length} alumnos relocalizables.`);
    }
  };

  // 4. Alta de docente
  const handleAddDocenteSubmit = (e) => {
    e.preventDefault();
    if (!newDocenteName || !newEscuela) return;

    const newDoc = {
      id: `d-${Date.now()}`,
      name: newDocenteName,
      escuela: newEscuela,
      curso: newCurso || "1° Año",
      cursoId: `curso-${Date.now()}`,
      alumnosCount: 0
    };

    setDocentes((prev) => [...prev, newDoc]);
    setShowDocenteModal(false);
    setNewDocenteName("");
    setNewEscuela("");
    setNewCurso("");
    showToast(`👩‍🏫 Docente "${newDoc.name}" registrada en Control Central.`);
  };

  // 5. EXPORTACIONES EXCEL / CSV PARA EVALUACIÓN DEL PILOTO

  // a) Exportar Informe por Alumno (Insumo Evaluativo Individual)
  const handleExportByStudentReport = () => {
    const headers = [
      "UUID_ANONIMO",
      "NICKNAME",
      "EDAD",
      "ESCUELA",
      "CURSO",
      "DOCENTE_ID",
      "XP_TOTAL",
      "ESTADO_M1",
      "ESTADO_M2",
      "ESTADO_M3",
      "ESTADO_M4",
      "INSIGNIA_GANADA",
      "ERRORES_ACUMULADOS",
      "AYUDAS_SOLICITADAS"
    ];

    const rows = linked.map((s) => [
      s.uuid,
      s.nickname,
      s.edad,
      s.escuela,
      s.curso,
      s.docenteId,
      s.xp,
      s.m1 || "completado",
      s.m2 || "en_curso",
      s.m3 || "bloqueado",
      s.m4 || "bloqueado",
      s.badgeEarned ? "SI" : "NO",
      s.errores ?? 0,
      s.ayudas ?? 0
    ]);

    exportToExcelCSV(`EduMision_EvaluacionPiloto_PorAlumno_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
    showToast("📊 Informe por Alumno exportado a Excel/CSV.");
  };

  // b) Exportar Informe por Curso (Insumo Evaluativo Institucional)
  const handleExportByCourseReport = () => {
    const headers = [
      "ESCUELA",
      "CURSO",
      "DOCENTE_RESPONSABLE",
      "CANTIDAD_ALUMNOS",
      "ALUMNOS_ACTIVOS",
      "XP_PROMEDIO_CURSO",
      "COMPLETITUD_MISIONES_PCT",
      "INSIGNIAS_OTORGADAS",
      "ESTADO_PILOTO"
    ];

    const rows = docentes.map((d) => {
      const courseStudents = linked.filter((s) => s.docenteId === d.id);
      const activeCount = courseStudents.filter((s) => s.xp > 0).length;
      const totalXp = courseStudents.reduce((acc, s) => acc + s.xp, 0);
      const avgXp = courseStudents.length ? Math.round(totalXp / courseStudents.length) : 0;
      const badgesCount = courseStudents.filter((s) => s.badgeEarned).length;
      const completionPct = courseStudents.length ? Math.round((badgesCount / courseStudents.length) * 100) : 0;

      return [
        d.escuela,
        d.curso,
        d.name,
        d.alumnosCount,
        activeCount,
        avgXp,
        `${completionPct}%`,
        badgesCount,
        d.alumnosCount > 0 ? "EN_EJECUCION" : "PENDIENTE_INICIO"
      ];
    });

    exportToExcelCSV(`EduMision_EvaluacionPiloto_PorCurso_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
    showToast("🏛️ Informe por Curso exportado a Excel/CSV.");
  };

  return (
    <div style={styles.container}>
      {toast && <div style={styles.toastCard}>{toast}</div>}

      <header style={styles.header}>
        <div>
          <h1 style={styles.headerTitle}>EduMisión Córdoba — Control Central (CC)</h1>
          <p style={styles.headerSub}>Gestión Institucional de Matriz Provincial, Bajas y Evaluación del Piloto</p>
        </div>
        <span style={styles.rolePill}>🕹️ Operador de Control Central</span>
      </header>

      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <div style={styles.statVal}>{docentes.length}</div>
          <div style={styles.statLbl}>Docentes en Sistema</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statVal}>{linked.length}</div>
          <div style={styles.statLbl}>Alumnos Vinculados</div>
        </div>
        <div style={{ ...styles.statCard, borderLeft: "4px solid #fb923c" }}>
          <div style={{ ...styles.statVal, color: "#fb923c" }}>{unlinked.length}</div>
          <div style={styles.statLbl}>Autónomos por Vincular</div>
        </div>
      </div>

      <nav style={styles.tabNav}>
        <button onClick={() => setActiveTab("vincular")} style={activeTab === "vincular" ? styles.tabActive : styles.tabInactive}>
          🔗 Vinculación Territorial ({unlinked.length})
        </button>
        <button onClick={() => setActiveTab("docentes")} style={activeTab === "docentes" ? styles.tabActive : styles.tabInactive}>
          👩‍🏫 Padrón de Docentes y Bajas ({docentes.length})
        </button>
        <button onClick={() => setActiveTab("excel")} style={activeTab === "excel" ? styles.tabActive : styles.tabInactive}>
          📊 Informes Excel (Por Curso / Por Alumno)
        </button>
      </nav>

      {/* 🔗 PESTAÑA 1: VINCULACIÓN TERRITORIAL */}
      {activeTab === "vincular" && (
        <div style={styles.cardBox}>
          <div style={styles.assignSelectorBar}>
            <span style={{ fontSize: "13px", color: "#e2e8f0", fontWeight: "bold" }}>Docente Destino para Asignar:</span>
            <select
              value={selectedDocenteForAssign}
              onChange={(e) => setSelectedDocenteForAssign(e.target.value)}
              style={styles.selectInput}
            >
              {docentes.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} — {d.escuela} ({d.curso})
                </option>
              ))}
            </select>
          </div>

          <table style={styles.table}>
            <thead>
              <tr style={styles.thRow}>
                <th style={styles.th}>Nickname</th>
                <th style={styles.th}>UUID Anónimo</th>
                <th style={styles.th}>Escuela Declarada</th>
                <th style={styles.th}>Curso</th>
                <th style={styles.th}>XP</th>
                <th style={styles.th}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {unlinked.map((s) => (
                <tr key={s.uuid} style={styles.tr}>
                  <td style={{ ...styles.td, fontWeight: "bold", color: "#38bdf8" }}>{s.nickname}</td>
                  <td style={styles.td}><code>{s.uuid}</code></td>
                  <td style={styles.td}>{s.escuela}</td>
                  <td style={styles.td}>{s.curso}</td>
                  <td style={styles.td}><strong>{s.xp} XP</strong></td>
                  <td style={styles.td}>
                    <button onClick={() => handleAssignStudent(s.uuid)} style={styles.btnAssign}>
                      ➔ Vincular a Docente
                    </button>
                  </td>
                </tr>
              ))}
              {unlinked.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "20px", color: "#64748b" }}>
                    ✨ No hay alumnos pendientes de vinculación. Todos los registrados tienen docente asignado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* 👩‍🏫 PESTAÑA 2: PADRÓN DE DOCENTES, VER ALUMNOS Y BAJAS */}
      {activeTab === "docentes" && (
        <div style={styles.cardBox}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px", alignItems: "center" }}>
            <div>
              <h3 style={{ margin: 0, color: "#38bdf8" }}>Padrón de Docentes y Gestión de Bajas</h3>
              <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#94a3b8" }}>
                Hacé clic en una docente para ver su listado de alumnos y desvincular con [✖], o usá [Dar de Baja] para remover a la docente.
              </p>
            </div>
            <button onClick={() => setShowDocenteModal(true)} style={styles.btnPrimary}>
              ➕ Registrar Nueva Docente
            </button>
          </div>

          <table style={styles.table}>
            <thead>
              <tr style={styles.thRow}>
                <th style={styles.th}>Docente</th>
                <th style={styles.th}>Escuela</th>
                <th style={styles.th}>Curso</th>
                <th style={styles.th}>Alumnos Vinculados</th>
                <th style={styles.th}>Acciones de Control</th>
              </tr>
            </thead>
            <tbody>
              {docentes.map((d) => {
                const isExpanded = expandedDocenteId === d.id;
                const teacherStudents = linked.filter((s) => s.docenteId === d.id);

                return (
                  <React.Fragment key={d.id}>
                    <tr style={{ ...styles.tr, backgroundColor: isExpanded ? "rgba(56, 189, 248, 0.05)" : "transparent" }}>
                      <td style={{ ...styles.td, fontWeight: "bold", color: "#ffffff" }}>
                        {d.name}
                      </td>
                      <td style={styles.td}>{d.escuela}</td>
                      <td style={styles.td}>{d.curso}</td>
                      <td style={styles.td}>
                        <strong style={{ color: "#4ade80" }}>{d.alumnosCount} alumnos</strong>
                      </td>
                      <td style={{ ...styles.td, display: "flex", gap: "8px" }}>
                        <button
                          onClick={() => setExpandedDocenteId(isExpanded ? null : d.id)}
                          style={styles.btnExpand}
                        >
                          {isExpanded ? "▲ Ocultar Alumnos" : `👁️ Ver Listado (${teacherStudents.length})`}
                        </button>
                        <button
                          onClick={() => handleRemoveDocente(d.id)}
                          style={styles.btnDanger}
                          title="Dar de baja docente y liberar alumnos"
                        >
                          🗑️ Dar de Baja
                        </button>
                      </td>
                    </tr>

                    {/* LISTADO DESPLEGABLE DE ALUMNOS DEL DOCENTE CON BOTÓN X DE DESVINCULACIÓN */}
                    {isExpanded && (
                      <tr>
                        <td colSpan={5} style={styles.expandedCell}>
                          <div style={styles.expandedBox}>
                            <h4 style={styles.expandedTitle}>
                              📋 Listado de Alumnos asignados a {d.name} ({d.escuela} - {d.curso}):
                            </h4>

                            {teacherStudents.length > 0 ? (
                              <div style={styles.studentSubGrid}>
                                {teacherStudents.map((st) => (
                                  <div key={st.uuid} style={styles.studentSubCard}>
                                    <div>
                                      <span style={styles.studentNick}>{st.nickname}</span>
                                      <div style={styles.studentMeta}>
                                        UUID: <code>{st.uuid}</code> · <strong>{st.xp} XP</strong> {st.badgeEarned && "🏆"}
                                      </div>
                                    </div>
                                    <button
                                      onClick={() => handleUnlinkStudent(st.uuid, d.name)}
                                      style={styles.btnUnlinkX}
                                      title="Desvincular alumno con X (pasa a relocalización)"
                                    >
                                      ✖
                                    </button>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>
                                ⚠️ Esta docente no tiene alumnos vinculados actualmente.
                              </p>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* 📊 PESTAÑA 3: INFORMES EXCEL (POR CURSO Y POR ALUMNO) */}
      {activeTab === "excel" && (
        <div style={styles.cardBox}>
          <h3 style={{ margin: "0 0 8px 0", color: "#38bdf8" }}>Exportación de Informes de Evaluación del Piloto (.CSV / Excel)</h3>
          <p style={{ fontSize: "13px", color: "#cbd5e1", marginBottom: "20px", lineHeight: "1.5" }}>
            Descargá los insumos de datos requeridos para la evaluación del piloto de EduMisión Córdoba. Archivos codificados en UTF-8 nativo para Excel y LibreOffice.
          </p>

          <div style={styles.reportsGrid}>
            {/* INFORME POR ALUMNO */}
            <div style={styles.reportCard}>
              <div style={styles.reportIcon}>👤</div>
              <h4 style={styles.reportTitle}>1. Informe por Alumno (Individual)</h4>
              <p style={styles.reportDesc}>
                Detalle nominalizado por UUID anónimo. Incluye experiencia (XP), misiones completadas, insignias otorgadas, errores acumulados y ayudas solicitadas.
              </p>
              <button onClick={handleExportByStudentReport} style={styles.btnExportReport}>
                📊 Descargar Informe por Alumno (.CSV)
              </button>
            </div>

            {/* INFORME POR CURSO */}
            <div style={styles.reportCard}>
              <div style={styles.reportIcon}>🏛️</div>
              <h4 style={styles.reportTitle}>2. Informe por Curso (Institucional)</h4>
              <p style={styles.reportDesc}>
                Consolidado agrupado por Escuela y Curso. Incluye docente a cargo, alumnos activos, promedio de XP, porcentaje de completitud e insignias obtenidas.
              </p>
              <button onClick={handleExportByCourseReport} style={styles.btnExportReport}>
                🏛️ Descargar Informe por Curso (.CSV)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ALTA DOCENTE */}
      {showAddDocenteModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <h3 style={{ color: "#38bdf8", marginTop: 0 }}>👩‍🏫 Registrar Nueva Docente</h3>
            <form onSubmit={handleAddDocenteSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input
                placeholder="Nombre completo (ej: Profe Silvia)"
                value={newDocenteName}
                onChange={(e) => setNewDocenteName(e.target.value)}
                style={styles.modalInput}
                required
              />
              <input
                placeholder="Escuela (ej: IPEM 268)"
                value={newEscuela}
                onChange={(e) => setNewEscuela(e.target.value)}
                style={styles.modalInput}
                required
              />
              <input
                placeholder="Curso (ej: 1° Año A)"
                value={newCurso}
                onChange={(e) => setNewCurso(e.target.value)}
                style={styles.modalInput}
              />
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button type="submit" style={styles.btnPrimary}>Guardar</button>
                <button type="button" onClick={() => setShowDocenteModal(false)} style={styles.btnCancel}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1150px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    backgroundColor: "#030712",
    color: "#f3f4f6",
    minHeight: "100vh"
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
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #1e293b",
    paddingBottom: "12px",
    marginBottom: "20px"
  },
  headerTitle: {
    fontSize: "20px",
    margin: 0,
    color: "#38bdf8",
    fontWeight: "bold"
  },
  headerSub: {
    fontSize: "12px",
    color: "#64748b",
    margin: "4px 0 0 0"
  },
  rolePill: {
    backgroundColor: "rgba(56, 189, 248, 0.1)",
    border: "1px solid #38bdf8",
    color: "#38bdf8",
    fontSize: "11px",
    fontWeight: "bold",
    padding: "6px 12px",
    borderRadius: "20px"
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "20px"
  },
  statCard: {
    backgroundColor: "rgba(7, 12, 34, 0.75)",
    border: "1px solid #1e293b",
    padding: "16px",
    borderRadius: "10px"
  },
  statVal: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#38bdf8"
  },
  statLbl: {
    fontSize: "12px",
    color: "#94a3b8",
    marginTop: "4px"
  },
  tabNav: {
    display: "flex",
    gap: "8px",
    marginBottom: "16px"
  },
  tabActive: {
    padding: "10px 18px",
    backgroundColor: "#0284c7",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "13px",
    cursor: "pointer"
  },
  tabInactive: {
    padding: "10px 18px",
    backgroundColor: "#1e293b",
    color: "#94a3b8",
    border: "1px solid #334155",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "13px",
    cursor: "pointer"
  },
  cardBox: {
    backgroundColor: "rgba(7, 12, 34, 0.75)",
    border: "1px solid #1e293b",
    borderRadius: "12px",
    padding: "20px"
  },
  assignSelectorBar: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    backgroundColor: "#02040e",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #1e293b",
    marginBottom: "16px"
  },
  selectInput: {
    flex: 1,
    padding: "8px 12px",
    backgroundColor: "#0f172a",
    color: "#ffffff",
    border: "1px solid #334155",
    borderRadius: "6px",
    fontSize: "13px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  thRow: {
    borderBottom: "1px solid #1e293b",
    textAlign: "left"
  },
  th: {
    padding: "10px",
    fontSize: "11px",
    color: "#64748b",
    textTransform: "uppercase"
  },
  tr: {
    borderBottom: "1px solid #1e293b"
  },
  td: {
    padding: "10px",
    fontSize: "13px"
  },
  btnAssign: {
    padding: "6px 12px",
    backgroundColor: "#10b981",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    fontSize: "12px",
    cursor: "pointer"
  },
  btnExpand: {
    padding: "6px 12px",
    backgroundColor: "rgba(56, 189, 248, 0.15)",
    color: "#38bdf8",
    border: "1px solid #38bdf8",
    borderRadius: "6px",
    fontWeight: "bold",
    fontSize: "11px",
    cursor: "pointer"
  },
  btnDanger: {
    padding: "6px 12px",
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    color: "#ef4444",
    border: "1px solid #ef4444",
    borderRadius: "6px",
    fontWeight: "bold",
    fontSize: "11px",
    cursor: "pointer"
  },
  expandedCell: {
    padding: "12px",
    backgroundColor: "#02040e"
  },
  expandedBox: {
    backgroundColor: "#0f172a",
    border: "1px solid #334155",
    borderRadius: "8px",
    padding: "14px"
  },
  expandedTitle: {
    fontSize: "12px",
    color: "#38bdf8",
    margin: "0 0 10px 0"
  },
  studentSubGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "10px"
  },
  studentSubCard: {
    backgroundColor: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "6px",
    padding: "10px 12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  studentNick: {
    fontSize: "13px",
    fontWeight: "bold",
    color: "#ffffff"
  },
  studentMeta: {
    fontSize: "11px",
    color: "#94a3b8",
    marginTop: "2px"
  },
  btnUnlinkX: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    backgroundColor: "rgba(239, 68, 68, 0.2)",
    color: "#ef4444",
    border: "1px solid #ef4444",
    fontWeight: "bold",
    fontSize: "12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  reportsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px"
  },
  reportCard: {
    backgroundColor: "#02040e",
    border: "1px solid #1e293b",
    borderRadius: "10px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  reportIcon: {
    fontSize: "32px",
    marginBottom: "8px"
  },
  reportTitle: {
    fontSize: "15px",
    color: "#38bdf8",
    margin: "0 0 8px 0"
  },
  reportDesc: {
    fontSize: "12px",
    color: "#cbd5e1",
    lineHeight: "1.5",
    marginBottom: "16px",
    flex: 1
  },
  btnExportReport: {
    padding: "12px 18px",
    backgroundColor: "#10b981",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "13px",
    cursor: "pointer"
  },
  btnPrimary: {
    padding: "8px 16px",
    backgroundColor: "#0284c7",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    fontSize: "12px",
    cursor: "pointer"
  },
  modalOverlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10000
  },
  modalCard: {
    width: "380px",
    backgroundColor: "#0f172a",
    border: "2px solid #38bdf8",
    borderRadius: "12px",
    padding: "20px"
  },
  modalInput: {
    padding: "10px",
    backgroundColor: "#02040e",
    border: "1px solid #334155",
    borderRadius: "6px",
    color: "#ffffff",
    fontSize: "13px"
  },
  btnCancel: {
    padding: "8px 16px",
    backgroundColor: "transparent",
    color: "#94a3b8",
    border: "1px solid #334155",
    borderRadius: "6px",
    fontSize: "12px",
    cursor: "pointer"
  }
};
TargetFile: /workspace/scratch/app-control-central-v3.jsx
