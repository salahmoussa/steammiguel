"use client";

import { useState, useEffect } from "react";

const VALID_CODE = "DSG-7741-BX";
const VALID_KEY = "1744";

const VEHICLE_DATA = {
  expediente: "DMV-2026-04471",
  fechaIngreso: "28/03/2026",
  fechaLimite: "20/04/2026",
  estado: "EN PLAZO DE RECLAMACION",
  diasRestantes: 14,
  vehiculo: {
    titular: "Hector Ocasio (fallecido)",
    marca: "Albany",
    modelo: "Emperor",
    ano: 2006,
    color: "Negro",
    matricula: "AK147REF",
  },
  ubicacionRecogida: "Los Santos",
  motivoIngreso: "Vehiculo localizado por la Policia de Los Santos y trasladado al deposito municipal. En espera de reclamacion por parte del heredero legal.",
  estadoFisico: {
    exterior: "Buen estado general. Polvo acumulado.",
    interior: "Limpio. Efectos personales del titular en el interior.",
    mecanico: "Operativo. Bateria sustituida para traslado.",
  },
  valorTasacion: "$6.500",
  deudaGrua: "$200",
  deudaEstancia: "$80 (8 dias x $10/dia)",
  deudaTotal: "$280",
  objetosEncontrados: [
    {
      id: "obj0",
      nombre: "Dispositivo electronico no identificado",
      descripcion: "Aparato electronico de pequeno tamano, sin marca visible ni numero de serie. No coincide con ningun modelo catalogado. Estado: apagado. Pendiente de analisis tecnico.",
      destacado: true,
    },
    {
      id: "obj1",
      nombre: "Cartera de piel",
      descripcion: "Cartera de piel marron con documentacion personal del titular.",
    },
    {
      id: "obj2",
      nombre: "Telefono movil",
      descripcion: "Telefono movil apagado. Sin bateria.",
    },
    {
      id: "obj3",
      nombre: "Juego de llaves",
      descripcion: "Llavero con varias llaves de uso domestico.",
    },
    {
      id: "obj4",
      nombre: "Gafas de sol",
      descripcion: "Gafas de sol con funda rigida en la guantera.",
    },
    {
      id: "obj5",
      nombre: "Chaqueta",
      descripcion: "Chaqueta de entretiempo doblada sobre el asiento del copiloto.",
    },
    {
      id: "obj6",
      nombre: "Paquete de tabaco",
      descripcion: "Cajetilla de tabaco en el bolsillo lateral de la puerta.",
    },
  ],
};

export default function DesguacePage() {
  const [step, setStep] = useState<"form" | "loading" | "panel">("form");
  const [terminalLines, setTerminalLines] = useState<number>(0);
  const [codigo, setCodigo] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [expandedObj, setExpandedObj] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!codigo.trim() || !clave.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (codigo.trim().toUpperCase() !== VALID_CODE || clave.trim() !== VALID_KEY) {
      setError("Numero de referencia o clave incorrectos. Verifique los datos proporcionados.");
      return;
    }
    setError("");
    setTerminalLines(0);
    setStep("loading");
  }

  useEffect(() => {
    if (step !== "loading") return;
    const delays = [0, 600, 1200, 1800, 2400];
    const timers: ReturnType<typeof setTimeout>[] = [];
    delays.forEach((delay, i) => {
      timers.push(setTimeout(() => setTerminalLines(i + 1), delay));
    });
    timers.push(setTimeout(() => setStep("panel"), 3200));
    return () => timers.forEach(clearTimeout);
  }, [step]);

  if (step === "form") {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#1a1a2e",
        color: "#c8c8d4",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #16213e 0%, #0f3460 100%)",
          borderBottom: "3px solid #e94560",
          padding: "20px 0",
          textAlign: "center",
        }}>
          <div style={{ fontSize: 14, color: "#e94560", fontWeight: "bold", letterSpacing: 2, textTransform: "uppercase" }}>
            Gobierno del Estado de San Andreas
          </div>
          <div style={{ fontSize: 28, fontWeight: "bold", color: "#fff", marginTop: 4 }}>
            Deposito Municipal de Vehiculos
          </div>
          <div style={{ fontSize: 13, color: "#8a8a9a", marginTop: 4 }}>
            Division de Vehiculos Abandonados y Decomisados &bull; Los Santos
          </div>
        </div>

        {/* Form */}
        <div style={{ maxWidth: 480, margin: "40px auto", padding: "0 20px" }}>
          <div style={{
            background: "#16213e",
            border: "1px solid #1a1a3e",
            borderRadius: 4,
            padding: 28,
          }}>
            <h2 style={{ fontSize: 18, color: "#fff", marginBottom: 4 }}>Consulta de expediente</h2>
            <p style={{ fontSize: 14, color: "#6a6a7a", marginBottom: 20 }}>
              Introduzca el numero de referencia y la clave proporcionados en la notificacion.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, color: "#e94560", marginBottom: 4, fontWeight: 600 }}>
                  Numero de referencia
                </label>
                <input
                  type="text"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  placeholder="Ej: DSG-XXXX-XX"
                  style={{
                    width: "100%", padding: "10px 12px", background: "#0f1a30", border: "1px solid #e94560",
                    borderRadius: 3, color: "#fff", fontSize: 15, outline: "none", boxSizing: "border-box",
                    fontFamily: "monospace", letterSpacing: 1,
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 13, color: "#e94560", marginBottom: 4, fontWeight: 600 }}>
                  Clave
                </label>
                <input
                  type="password"
                  value={clave}
                  onChange={(e) => setClave(e.target.value)}
                  placeholder="Clave de acceso"
                  style={{
                    width: "100%", padding: "10px 12px", background: "#0f1a30", border: "1px solid #e94560",
                    borderRadius: 3, color: "#fff", fontSize: 15, outline: "none", boxSizing: "border-box",
                    fontFamily: "monospace", letterSpacing: 1,
                  }}
                  required
                />
              </div>

              {error && (
                <div style={{
                  background: "#3a0a0a", border: "1px solid #e94560", borderRadius: 3,
                  padding: "10px 14px", marginBottom: 16, fontSize: 14, color: "#e94560",
                }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                style={{
                  width: "100%", padding: "12px", background: "#e94560", border: "none",
                  borderRadius: 3, color: "#fff", fontSize: 15, fontWeight: "bold",
                  cursor: "pointer", fontFamily: "inherit",
                }}
              >
                Consultar expediente
              </button>
            </form>
          </div>

          <p style={{ fontSize: 12, color: "#4a4a5a", textAlign: "center", marginTop: 16 }}>
            Si no dispone del numero de referencia o la clave, acuda presencialmente a las oficinas del deposito en Elysian Island, Dock St. 14.
            <br />Horario: Lunes a Viernes 08:00 - 15:00h.
          </p>
        </div>
      </div>
    );
  }

  if (step === "loading") {
    const lines = [
      { text: "> Conectando con servidor del Deposito Municipal...", bright: false },
      { text: "> Autenticando credenciales...", bright: false },
      { text: "> Expediente DMV-2026-04471 localizado.", bright: false },
      { text: "> Cargando registros del vehiculo...", bright: false },
      { text: "> ACCESO CONCEDIDO", bright: true },
    ];
    return (
      <div style={{
        minHeight: "100vh",
        background: "#0a0e1a",
        color: "#c8c8d4",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}>
        <style>{`@keyframes blink { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }`}</style>
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #16213e 0%, #0f3460 100%)",
          borderBottom: "3px solid #e94560",
          padding: "20px 0",
          textAlign: "center",
        }}>
          <div style={{ fontSize: 14, color: "#e94560", fontWeight: "bold", letterSpacing: 2, textTransform: "uppercase" }}>
            Gobierno del Estado de San Andreas
          </div>
          <div style={{ fontSize: 28, fontWeight: "bold", color: "#fff", marginTop: 4 }}>
            Deposito Municipal de Vehiculos
          </div>
          <div style={{ fontSize: 13, color: "#8a8a9a", marginTop: 4 }}>
            Division de Vehiculos Abandonados y Decomisados &bull; Los Santos
          </div>
        </div>

        {/* Terminal */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          minHeight: "calc(100vh - 100px)", padding: 20,
        }}>
          <div style={{
            background: "#0d1117",
            border: "1px solid #1a2a1a",
            borderRadius: 6,
            padding: "28px 32px",
            maxWidth: 560,
            width: "100%",
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: 15,
            lineHeight: 2,
            boxShadow: "0 0 40px rgba(0,255,0,0.05)",
          }}>
            {lines.slice(0, terminalLines).map((line, i) => (
              <div key={i} style={{
                color: line.bright ? "#00ff41" : "#4af04a",
                fontWeight: line.bright ? "bold" : "normal",
                fontSize: line.bright ? 16 : 15,
              }}>
                {line.text}
                {i === terminalLines - 1 && (
                  <span style={{
                    display: "inline-block",
                    width: 8,
                    height: 16,
                    background: line.bright ? "#00ff41" : "#4af04a",
                    marginLeft: 4,
                    verticalAlign: "middle",
                    animation: "blink 0.8s step-end infinite",
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Panel de vehiculo
  const v = VEHICLE_DATA;
  return (
    <div style={{
      minHeight: "100vh",
      background: "#1a1a2e",
      color: "#c8c8d4",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #16213e 0%, #0f3460 100%)",
        borderBottom: "3px solid #e94560",
        padding: "20px 0",
        textAlign: "center",
      }}>
        <div style={{ fontSize: 14, color: "#e94560", fontWeight: "bold", letterSpacing: 2, textTransform: "uppercase" }}>
          Gobierno del Estado de San Andreas
        </div>
        <div style={{ fontSize: 28, fontWeight: "bold", color: "#fff", marginTop: 4 }}>
          Deposito Municipal de Vehiculos
        </div>
        <div style={{ fontSize: 13, color: "#8a8a9a", marginTop: 4 }}>
          Expediente {v.expediente}
        </div>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "24px 20px" }}>

        {/* Status banner */}
        <div style={{
          background: "#0a2e1a", border: "1px solid #22c55e", borderRadius: 4,
          padding: "14px 18px", marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <div style={{ fontSize: 12, color: "#22c55e", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Estado del expediente</div>
            <div style={{ fontSize: 18, color: "#4ade80", fontWeight: "bold", marginTop: 2 }}>EN PLAZO DE RECLAMACION</div>
            <div style={{ fontSize: 12, color: "#86efac", marginTop: 2 }}>Quedan {v.diasRestantes} dias para reclamar el vehiculo</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, color: "#8a8a9a" }}>Fecha limite</div>
            <div style={{ fontSize: 16, color: "#4ade80", fontWeight: "bold", fontFamily: "monospace" }}>{v.fechaLimite}</div>
          </div>
        </div>

        {/* Datos del vehiculo */}
        <Section title="Datos del vehiculo">
          <Row label="Titular" value={v.vehiculo.titular} />
          <Row label="Marca / Modelo" value={`${v.vehiculo.marca} ${v.vehiculo.modelo} (${v.vehiculo.ano})`} />
          <Row label="Color" value={v.vehiculo.color} />
          <Row label="Matricula" value={v.vehiculo.matricula} mono />
        </Section>

        {/* Circunstancias */}
        <Section title="Circunstancias de ingreso">
          <Row label="Fecha de ingreso" value={v.fechaIngreso} />
          <Row label="Ubicacion de recogida" value={v.ubicacionRecogida} />
          <Row label="Motivo" value={v.motivoIngreso} />
        </Section>

        {/* Estado fisico */}
        <Section title="Informe de estado fisico">
          <Row label="Exterior" value={v.estadoFisico.exterior} />
          <Row label="Interior" value={v.estadoFisico.interior} />
          <Row label="Mecanica" value={v.estadoFisico.mecanico} />
        </Section>

        {/* Deudas */}
        <Section title="Liquidacion economica">
          <Row label="Valor de tasacion" value={v.valorTasacion} />
          <Row label="Servicio de grua" value={v.deudaGrua} />
          <Row label="Estancia en deposito" value={v.deudaEstancia} />
          <Row label="DEUDA TOTAL" value={v.deudaTotal} highlight />
        </Section>

        {/* Objetos encontrados */}
        <div style={{
          background: "#16213e", border: "1px solid #1a1a3e", borderRadius: 4,
          padding: 20, marginBottom: 20,
        }}>
          <h3 style={{ fontSize: 16, color: "#e94560", marginBottom: 4, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
            Objetos encontrados en el vehiculo
          </h3>
          <p style={{ fontSize: 13, color: "#6a6a7a", marginBottom: 16 }}>
            Inventario de efectos personales localizados en el interior del vehiculo. Pueden ser reclamados presentando identificacion en el deposito.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {v.objetosEncontrados.map((obj) => {
              const destacado = "destacado" in obj && obj.destacado;
              return (
                <div
                  key={obj.id}
                  style={{
                    background: destacado ? "#2a1010" : "#0f1a30",
                    border: destacado ? "1px solid #e94560" : "1px solid #2a2a4e",
                    borderRadius: 3,
                    overflow: "hidden",
                    ...(destacado ? { boxShadow: "0 0 18px rgba(233,69,96,0.25)" } : {}),
                  }}
                >
                  <button
                    onClick={() => setExpandedObj(expandedObj === obj.id ? null : obj.id)}
                    style={{
                      width: "100%", padding: "12px 14px", background: "none", border: "none",
                      color: "#fff", fontSize: 15, textAlign: "left", cursor: "pointer",
                      fontFamily: "inherit", display: "flex", alignItems: "center", gap: 10,
                    }}
                  >
                    <span style={{
                      fontSize: 11, fontWeight: "bold", padding: "2px 6px", borderRadius: 2,
                      background: destacado ? "#e94560" : "#2a4a6e",
                      color: "#fff", flexShrink: 0, textTransform: "uppercase", letterSpacing: 0.5,
                    }}>
                      {destacado ? "!" : "OBJ"}
                    </span>
                    <span style={{ flex: 1, fontWeight: destacado ? 600 : 400 }}>{obj.nombre}</span>
                    <span style={{ color: destacado ? "#e94560" : "#6a6a7a", fontSize: 13 }}>
                      {expandedObj === obj.id ? "▲" : "▼"}
                    </span>
                  </button>

                  {expandedObj === obj.id && (
                    <div style={{
                      padding: "0 14px 14px", fontSize: 14, color: destacado ? "#f0c0c8" : "#a0a0b0",
                      lineHeight: 1.7, whiteSpace: "pre-wrap",
                      borderTop: destacado ? "1px solid #e94560" : "1px solid #2a2a4e", paddingTop: 12,
                    }}>
                      {obj.descripcion}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer legal */}
        <div style={{
          fontSize: 12, color: "#4a4a5a", textAlign: "center",
          borderTop: "1px solid #2a2a4e", paddingTop: 16, marginTop: 8,
          lineHeight: 1.6,
        }}>
          Documento generado automaticamente por el sistema de gestion del Deposito Municipal de Vehiculos de Los Santos.
          <br />
          Para cualquier reclamacion, acuda a las oficinas del deposito en Elysian Island, Dock St. 14 con su identificacion.
          <br />
          Gobierno del Estado de San Andreas &bull; Departamento de Vehiculos a Motor
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "#16213e", border: "1px solid #1a1a3e", borderRadius: 4,
      padding: 20, marginBottom: 20,
    }}>
      <h3 style={{ fontSize: 16, color: "#e94560", marginBottom: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
        {title}
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {children}
      </div>
    </div>
  );
}

function Row({ label, value, mono, highlight }: { label: string; value: string; mono?: boolean; highlight?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 12, fontSize: 14 }}>
      <div style={{ width: 180, flexShrink: 0, color: "#6a6a7a", fontWeight: 600 }}>{label}</div>
      <div style={{
        flex: 1, color: highlight ? "#e94560" : "#d0d0e0",
        fontFamily: mono ? "monospace" : "inherit",
        fontWeight: highlight ? "bold" : "normal",
        fontSize: highlight ? 16 : 14,
        lineHeight: 1.5,
      }}>
        {value}
      </div>
    </div>
  );
}

