"use client";

import { useState, useEffect, useCallback } from "react";

const VALID_CODE = "DSG-7741-BX";

const VEHICLE_DATA = {
  expediente: "EXP-2015-00347",
  fechaIngreso: "17/06/2015",
  fechaLimite: "17/07/2015",
  estado: "PLAZO DE RECLAMACION EXPIRADO",
  diasRestantes: 0,
  vehiculo: {
    marca: "Vapid",
    modelo: "Stanier",
    ano: 2012,
    color: "Azul Oscuro Metalizado",
    matricula: "LSC-2P19",
    vin: "2VPST83K12L009741",
    motor: "4.6L V8",
    transmision: "Automatica 4 velocidades",
    kilometraje: "89.214 km",
    combustible: "Gasolina",
    ultimaItv: "03/02/2015 - APTA",
    seguro: "LSPD Fleet Insurance - Poliza institucional #GOV-PD-4412 (Vehiculo personal de agente, cobertura departamental)",
  },
  ubicacionRecogida: "Carretera comarcal PR-847, km 3.1, cuneta lado derecho — Caguas, Puerto Rico",
  motivoIngreso: "Vehiculo localizado abandonado en cuneta. Reportado por Policia de Puerto Rico (caso PR-2015-08831) el 15/06/2015. Vinculado a investigacion criminal activa (expediente LSPD #CR-2015-04471). Trasladado a deposito judicial por orden de la fiscalia. Liberado a deposito municipal tras cierre del caso el 23/09/2015. Sin reclamacion posterior del titular.",
  estadoFisico: {
    exterior: "Sin danos exteriores significativos. Pintura en buen estado general. Polvo acumulado consistente con abandono prolongado. Matricula trasera ligeramente doblada. Faro delantero derecho con condensacion interior.",
    interior: "Asientos delanteros en posicion normal. Tapiceria trasera con manchas oscuras (catalogadas como prueba, muestras extraidas — ver informe forense adjunto al caso). Olor quimico persistente. Maletero con marcas de roce y arañazos profundos en la chapa interior.",
    mecanico: "Motor en buen estado. Bateria descargada (sustituida para traslado). Deposito de combustible al 30%. Aceite en nivel correcto. Neumaticos en buen estado con desgaste normal. Vehiculo operativo.",
  },
  valorTasacion: "$8.200",
  deudaGrua: "$200",
  deudaEstancia: "$300 (30 dias x $10/dia)",
  deudaTotal: "$500",
  objetosEncontrados: [
    {
      id: "obj1",
      nombre: "Documentacion del vehiculo y placa policial",
      tipo: "documento",
      descripcion: "Permiso de circulacion a nombre del LSPD (vehiculo asignado). Tarjeta de asignacion personal al Agente James R. Whitfield, placa #4471. Ficha tecnica. Tarjeta ITV. Todo dentro de una funda de cuero negro con escudo del LSPD en guantera. Incluye tarjeta de identificacion del departamento (foto del agente, fecha de emision 12/08/2013).",
      destacado: true,
    },
    {
      id: "obj2",
      nombre: "Informe parcial de investigacion (carpeta manila)",
      tipo: "documento",
      descripcion: "Carpeta manila tamano folio con la inscripcion manuscrita \"CASO OCASIO - CONFIDENCIAL\" encontrada debajo del asiento del copiloto. Contiene documentos parciales de una investigacion del LSPD. Varias paginas parecen haber sido arrancadas. Las paginas restantes incluyen nombres, direcciones y relaciones entre miembros de una organizacion criminal con vinculos entre Los Santos y Puerto Rico. El nombre \"R. Ocasio\" aparece mencionado tres veces como \"contacto periferico / no objetivo\".",
      destacado: true,
    },
    {
      id: "obj3",
      nombre: "Libreta de anotaciones del agente",
      tipo: "documento",
      descripcion: "Libreta pequeña de espiral, tapas negras, encontrada en el bolsillo de la puerta del conductor. Contiene anotaciones manuscritas del agente Whitfield. Incluye matriculas, horarios de vigilancia, nombres en clave y observaciones de campo. La ultima entrada esta fechada el 14/06/2015 a las 19:40h: \"Reunion confirmada en el taller. Caguas. 22:00h. Llevar micro.\" Las paginas finales de la libreta han sido arrancadas.",
      destacado: true,
    },
    {
      id: "obj4",
      nombre: "Nota manuscrita (contenido no catalogado)",
      tipo: "documento",
      descripcion: "Trozo de papel arrancado, encontrado oculto dentro de una ranura en la parte inferior del reposabrazos central (no visible a simple vista, localizado durante el desmontaje para inspeccion). Contiene anotaciones manuscritas de naturaleza desconocida. No se ha podido determinar su relacion con el caso.",
      destacado: true,
    },
    {
      id: "obj5",
      nombre: "Radio portatil (apagada)",
      tipo: "objeto",
      descripcion: "Radio Motorola modelo policial, canal configurado en frecuencia encriptada del LSPD (no operativa fuera de rango). Bateria agotada. Encontrada en el hueco del reposabrazos central, debajo de la nota manuscrita.",
    },
    {
      id: "obj6",
      nombre: "Grabadora de voz digital",
      tipo: "objeto",
      descripcion: "Grabadora Olympus VN-541PC. Encontrada en la guantera, detras de la documentacion. Bateria agotada. Sin tarjeta de memoria (la ranura esta vacia, la tapa del compartimento esta abierta). Se desconoce si fue retirada como prueba o si fue sustraida.",
    },
    {
      id: "obj7",
      nombre: "Vaso de cafe (desechable)",
      tipo: "objeto",
      descripcion: "Vaso de carton de Bean Machine Coffee con tapa. Vacio, restos secos de cafe. Encontrado en el portavasos del conductor.",
    },
    {
      id: "obj8",
      nombre: "Llaves sueltas (3 unidades)",
      tipo: "objeto",
      descripcion: "Tres llaves en un llavero con chapa metalica grabada \"J.W.\". Una llave de vehiculo (no corresponde a este coche), una de cerradura domestica y una pequeña que parece de taquilla o cajon. Encontradas debajo del asiento del conductor.",
    },
    {
      id: "obj9",
      nombre: "Paquete de cigarrillos (Redwood)",
      tipo: "objeto",
      descripcion: "Cajetilla de Redwood Cigarettes medio vacia (7 cigarrillos restantes). Encontrada en el bolsillo lateral de la puerta del conductor junto a un mechero desechable azul.",
    },
    {
      id: "obj10",
      nombre: "Fotografia impresa",
      tipo: "objeto",
      descripcion: "Fotografia en papel de 10x15cm bastante desgastada. Muestra a un hombre de unos 40 anos (posiblemente el agente Whitfield) junto a una mujer y dos ninos pequenos en lo que parece ser un jardin. Escrito en el reverso con boligrafo: \"Siempre volvere a casa. - J\". Encontrada enganchada en el parasol del conductor con una goma elastica.",
    },
  ],
};

export default function DesguacePage() {
  const [step, setStep] = useState<"form" | "loading" | "panel">("form");
  const [terminalLines, setTerminalLines] = useState<number>(0);
  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [telefono, setTelefono] = useState("");
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");
  const [expandedObj, setExpandedObj] = useState<string | null>(null);
  const [openDoc, setOpenDoc] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  const openDocument = useCallback((id: string) => {
    setOpenDoc(id);
    setClosing(false);
    // Small delay so the DOM renders first, then trigger entrance animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setModalVisible(true);
      });
    });
  }, []);

  const closeDocument = useCallback(() => {
    setClosing(true);
    setModalVisible(false);
    setTimeout(() => {
      setOpenDoc(null);
      setClosing(false);
    }, 250);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre.trim() || !dni.trim() || !telefono.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (codigo.trim().toUpperCase() !== VALID_CODE) {
      setError("Codigo de expediente no valido. Verifique el codigo proporcionado.");
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
              Introduzca sus datos personales y el codigo de expediente proporcionado en la notificacion.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, color: "#8a8a9a", marginBottom: 4, fontWeight: 600 }}>
                  Nombre completo
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Nombre y apellidos"
                  style={{
                    width: "100%", padding: "10px 12px", background: "#0f1a30", border: "1px solid #2a2a4e",
                    borderRadius: 3, color: "#fff", fontSize: 15, outline: "none", boxSizing: "border-box",
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, color: "#8a8a9a", marginBottom: 4, fontWeight: 600 }}>
                  DNI / ID de San Andreas
                </label>
                <input
                  type="text"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  placeholder="Ej: SA-1234567-X"
                  style={{
                    width: "100%", padding: "10px 12px", background: "#0f1a30", border: "1px solid #2a2a4e",
                    borderRadius: 3, color: "#fff", fontSize: 15, outline: "none", boxSizing: "border-box",
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, color: "#8a8a9a", marginBottom: 4, fontWeight: 600 }}>
                  Telefono de contacto
                </label>
                <input
                  type="text"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="Ej: 555-0147"
                  style={{
                    width: "100%", padding: "10px 12px", background: "#0f1a30", border: "1px solid #2a2a4e",
                    borderRadius: 3, color: "#fff", fontSize: 15, outline: "none", boxSizing: "border-box",
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 13, color: "#e94560", marginBottom: 4, fontWeight: 600 }}>
                  Codigo de expediente
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
            Si no dispone de su codigo de expediente, acuda presencialmente a las oficinas del deposito en Elysian Island, Dock St. 14.
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
      { text: "> Expediente EXP-2015-00347 localizado.", bright: false },
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
          background: "#3a0a0a", border: "1px solid #e94560", borderRadius: 4,
          padding: "14px 18px", marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <div style={{ fontSize: 12, color: "#e94560", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Estado del expediente</div>
            <div style={{ fontSize: 18, color: "#ff6b81", fontWeight: "bold", marginTop: 2 }}>PLAZO DE RECLAMACION EXPIRADO</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, color: "#8a8a9a" }}>Fecha limite</div>
            <div style={{ fontSize: 16, color: "#e94560", fontWeight: "bold", fontFamily: "monospace" }}>{v.fechaLimite}</div>
          </div>
        </div>

        {/* Datos del vehiculo */}
        <Section title="Datos del vehiculo">
          <Row label="Marca / Modelo" value={`${v.vehiculo.marca} ${v.vehiculo.modelo} (${v.vehiculo.ano})`} />
          <Row label="Color" value={v.vehiculo.color} />
          <Row label="Matricula" value={v.vehiculo.matricula} mono />
          <Row label="N. de bastidor (VIN)" value={v.vehiculo.vin} mono />
          <Row label="Motor" value={v.vehiculo.motor} />
          <Row label="Transmision" value={v.vehiculo.transmision} />
          <Row label="Kilometraje" value={v.vehiculo.kilometraje} />
          <Row label="Combustible" value={v.vehiculo.combustible} />
          <Row label="Ultima ITV" value={v.vehiculo.ultimaItv} />
          <Row label="Seguro" value={v.vehiculo.seguro} />
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

        {/* Document modals */}
        {openDoc && (
          <div
            onClick={closeDocument}
            style={{
              position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
              background: "rgba(0,0,0,0.85)", zIndex: 9999,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: 20,
              opacity: modalVisible && !closing ? 1 : 0,
              transition: closing ? "opacity 250ms ease-in" : "opacity 200ms ease-out",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative", maxHeight: "90vh", overflowY: "auto",
                transform: modalVisible && !closing
                  ? "scale(1) rotate(-0.4deg) translateY(0)"
                  : "scale(0.85) rotate(-4deg) translateY(30px)",
                opacity: modalVisible && !closing ? 1 : 0,
                transition: closing
                  ? "transform 250ms ease-in, opacity 250ms ease-in"
                  : "transform 350ms ease-out, opacity 350ms ease-out",
              }}
            >
              {/* Close button */}
              <button
                onClick={closeDocument}
                style={{
                  position: "absolute", top: -12, right: -12, width: 32, height: 32,
                  borderRadius: "50%", background: "#e94560", border: "none", color: "#fff",
                  fontSize: 16, cursor: "pointer", fontWeight: "bold", zIndex: 10,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >X</button>

              {/* Evidence tape */}
              <div style={{
                position: "absolute",
                top: 18,
                right: -32,
                width: 160,
                textAlign: "center",
                background: "rgba(198, 40, 40, 0.88)",
                color: "#fff",
                fontSize: 10,
                fontWeight: "bold",
                fontFamily: "Arial, sans-serif",
                textTransform: "uppercase",
                letterSpacing: 2,
                padding: "5px 0",
                transform: "rotate(45deg)",
                transformOrigin: "center",
                zIndex: 20,
                pointerEvents: "none",
                boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
              }}>
                PRUEBA MATERIAL
              </div>

              {openDoc === "obj1" && <DocPermiso />}
              {openDoc === "obj2" && <DocCompraventa />}
              {openDoc === "obj3" && <DocSeguro />}
              {openDoc === "obj4" && <DocCarta />}
            </div>
          </div>
        )}

        {/* Objetos encontrados */}
        <div style={{
          background: "#16213e", border: "1px solid #1a1a3e", borderRadius: 4,
          padding: 20, marginBottom: 20,
        }}>
          <h3 style={{ fontSize: 16, color: "#e94560", marginBottom: 4, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
            Objetos encontrados en el vehiculo
          </h3>
          <p style={{ fontSize: 13, color: "#6a6a7a", marginBottom: 16 }}>
            Inventario realizado durante la inspeccion y limpieza del vehiculo previo a su puesta a disposicion. Los objetos marcados pueden ser reclamados presentando identificacion en el deposito.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {v.objetosEncontrados.map((obj) => {
              const isDoc = obj.tipo === "documento";
              const isWalletNote = obj.id === "obj4";
              return (
                <div
                  key={obj.id}
                  style={{
                    background: isWalletNote ? "#1a1508" : isDoc ? "#1a1030" : "#0f1a30",
                    border: `1px solid ${isWalletNote ? "#8a7a2a" : isDoc ? "#6a4aaa" : "#2a2a4e"}`,
                    borderRadius: 3,
                    overflow: "hidden",
                    ...(isWalletNote ? { boxShadow: "0 0 12px rgba(200,170,50,0.08)" } : {}),
                  }}
                >
                  <button
                    onClick={() => isDoc ? openDocument(obj.id) : setExpandedObj(expandedObj === obj.id ? null : obj.id)}
                    style={{
                      width: "100%", padding: "12px 14px", background: "none", border: "none",
                      color: "#fff", fontSize: 15, textAlign: "left", cursor: "pointer",
                      fontFamily: "inherit", display: "flex", alignItems: "center", gap: 10,
                    }}
                  >
                    <span style={{
                      fontSize: 11, fontWeight: "bold", padding: "2px 6px", borderRadius: 2,
                      background: isWalletNote ? "#8a7a2a" : isDoc ? "#e94560" : "#2a4a6e",
                      color: "#fff", flexShrink: 0, textTransform: "uppercase", letterSpacing: 0.5,
                    }}>
                      {isWalletNote ? "???" : isDoc ? "DOC" : "OBJ"}
                    </span>
                    <span style={{ flex: 1 }}>{obj.nombre}</span>
                    <span style={{ color: isWalletNote ? "#c8b040" : "#6a6a7a", fontSize: 13 }}>
                      {isDoc ? "📄 Ver documento" : (expandedObj === obj.id ? "▲" : "▼")}
                    </span>
                  </button>

                  {!isDoc && expandedObj === obj.id && (
                    <div style={{
                      padding: "0 14px 14px", fontSize: 14, color: "#a0a0b0",
                      lineHeight: 1.7, whiteSpace: "pre-wrap",
                      borderTop: "1px solid #2a2a4e", paddingTop: 12,
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

/* ========== PAPER BASE STYLES ========== */
const paperBase: React.CSSProperties = {
  background: "#f5f0e8",
  width: 520,
  maxWidth: "90vw",
  padding: "40px 44px",
  position: "relative",
  fontFamily: "'Times New Roman', 'Georgia', serif",
  color: "#1a1a1a",
  boxShadow: "0 4px 30px rgba(0,0,0,0.5), inset 0 0 80px rgba(139,119,80,0.12)",
  transform: "rotate(-0.4deg)",
  lineHeight: 1.5,
};

const paperStain: React.CSSProperties = {
  position: "absolute",
  borderRadius: "50%",
  background: "radial-gradient(ellipse, rgba(139,110,60,0.1) 0%, transparent 70%)",
  pointerEvents: "none",
};

const stampStyle: React.CSSProperties = {
  border: "3px solid #c62828",
  borderRadius: 4,
  color: "#c62828",
  padding: "4px 10px",
  fontWeight: "bold",
  fontSize: 12,
  fontFamily: "Arial, sans-serif",
  textTransform: "uppercase",
  letterSpacing: 2,
  display: "inline-block",
  transform: "rotate(-8deg)",
  opacity: 0.7,
};

/* ========== DOC 1: Documentacion policial del vehiculo ========== */
function DocPermiso() {
  return (
    <div style={paperBase}>
      {/* Coffee stain */}
      <div style={{ ...paperStain, width: 90, height: 90, top: 20, right: 30 }} />
      {/* Fold line */}
      <div style={{ position: "absolute", top: 0, left: "50%", width: 1, height: "100%", background: "rgba(0,0,0,0.04)", pointerEvents: "none" }} />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 24, borderBottom: "2px solid #1a1a1a", paddingBottom: 16 }}>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#555", fontFamily: "Arial, sans-serif" }}>
          Los Santos Police Department
        </div>
        <div style={{ fontSize: 20, fontWeight: "bold", marginTop: 4, letterSpacing: 1 }}>
          TARJETA DE ASIGNACION DE VEHICULO
        </div>
        <div style={{ fontSize: 11, color: "#666", fontFamily: "Arial, sans-serif", marginTop: 2 }}>
          Division de Flota y Logistica &bull; Documento interno
        </div>
      </div>

      {/* Data grid */}
      <div style={{ fontSize: 14 }}>
        <DocField label="AGENTE ASIGNADO" value="WHITFIELD, JAMES R." />
        <DocField label="PLACA" value="#4471" mono />
        <DocField label="RANGO" value="DETECTIVE - Division de Crimen Organizado" />
        <DocField label="FECHA ASIGNACION" value="12/08/2013" />
        <div style={{ height: 12 }} />
        <DocField label="MARCA" value="VAPID" />
        <DocField label="MODELO" value="STANIER" />
        <DocField label="BASTIDOR (VIN)" value="2VPST83K12L009741" mono />
        <DocField label="MATRICULA" value="LSC-2P19" mono />
        <DocField label="AÑO" value="2012" />
        <DocField label="COLOR" value="AZUL OSCURO METALIZADO" />
        <DocField label="COMBUSTIBLE" value="GASOLINA" />
        <DocField label="MOTOR" value="4.6L V8 — 250 CV" />
        <DocField label="USO AUTORIZADO" value="Personal / Operativo encubierto" />
        <DocField label="COBERTURA" value="LSPD Fleet Insurance — Poliza #GOV-PD-4412" />
      </div>

      {/* Stamp */}
      <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div style={{ fontSize: 11, color: "#888", fontFamily: "Arial, sans-serif" }}>Expedido en Los Santos</div>
          <div style={{ fontSize: 11, color: "#888", fontFamily: "Arial, sans-serif" }}>Fecha: 12/08/2013</div>
        </div>
        <div style={stampStyle}>LSPD</div>
      </div>

      {/* Crease marks */}
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "100%", background: "linear-gradient(135deg, transparent 48%, rgba(0,0,0,0.015) 49%, rgba(0,0,0,0.015) 51%, transparent 52%)", pointerEvents: "none" }} />
    </div>
  );
}

/* ========== DOC 2: Informe parcial de investigacion ========== */
function DocCompraventa() {
  return (
    <div style={{ ...paperBase, transform: "rotate(0.3deg)" }}>
      {/* Stain bottom left */}
      <div style={{ ...paperStain, width: 70, height: 60, bottom: 40, left: 20 }} />

      {/* "Confidential" diagonal watermark */}
      <div style={{
        position: "absolute", top: "40%", left: "10%", fontSize: 64, fontWeight: "bold",
        color: "rgba(200,0,0,0.06)", transform: "rotate(-35deg)", fontFamily: "Arial, sans-serif",
        letterSpacing: 8, pointerEvents: "none", whiteSpace: "nowrap",
      }}>CONFIDENCIAL</div>

      <div style={{ textAlign: "center", marginBottom: 20, borderBottom: "2px solid #1a1a1a", paddingBottom: 14 }}>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#555", fontFamily: "Arial, sans-serif" }}>
          Los Santos Police Department — Division de Crimen Organizado
        </div>
        <div style={{ fontSize: 18, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1, marginTop: 4 }}>
          Informe de Investigacion
        </div>
        <div style={{ fontSize: 12, color: "#666", marginTop: 2, fontFamily: "Arial, sans-serif" }}>
          Caso #CR-2015-04471 &bull; CLASIFICADO
        </div>
      </div>

      <div style={{ fontSize: 14, lineHeight: 1.8, textAlign: "justify" }}>
        <div style={{ fontFamily: "Arial, sans-serif", fontSize: 12, color: "#555", marginBottom: 12 }}>
          Agente responsable: Det. James R. Whitfield (#4471)<br />
          Fecha de apertura: 03/01/2015<br />
          Estado: ACTIVO — Infiltracion fase 3
        </div>

        <p style={{ marginTop: 8 }}>
          <b>SUJETO PRINCIPAL:</b> Organizacion criminal con base operativa entre Los Santos (SA) y Caguas (Puerto Rico).
          Actividades documentadas: trafico de armas, blanqueo de capitales, extorsion.
        </p>

        <p style={{ marginTop: 12 }}>
          <b>CONTACTOS IDENTIFICADOS:</b>
        </p>

        <p style={{ marginTop: 8, fontFamily: "monospace", fontSize: 13, lineHeight: 2 }}>
          — V. MARQUEZ ............ lider operativo LS<br />
          — D. SANTOS ............. enlace Puerto Rico<br />
          — [PAGINA ARRANCADA]<br />
          — [PAGINA ARRANCADA]<br />
          — R. OCASIO ............. contacto periferico / no objetivo
        </p>

        <p style={{ marginTop: 12 }}>
          <b>NOTA DEL AGENTE (05/06/2015):</b>
        </p>
        <p style={{ marginTop: 4, fontStyle: "italic", color: "#333" }}>
          &quot;Ocasio es mecanico, trabaja para ellos por necesidad. Le llevan coches para reparar y modificar.
          No tiene acceso a la estructura interna ni a informacion sensible. No es objetivo de la investigacion.
          Repito: R. Ocasio NO es objetivo. Es un trabajador con problemas economicos que acepta encargos
          sin preguntar. No representa amenaza.&quot;
        </p>

        <p style={{ marginTop: 16 }}>
          <b>ULTIMA ENTRADA (14/06/2015):</b>
        </p>
        <p style={{ marginTop: 4, fontStyle: "italic", color: "#333" }}>
          &quot;Reunion confirmada para esta noche en el taller de Ocasio. Caguas. 22:00h.
          Santos estara presente. Posibilidad de grabacion directa. Llevar micro.
          Si esto sale bien, tenemos suficiente para las ordenes de arresto.&quot;
        </p>

        <div style={{ marginTop: 20, fontSize: 12, color: "#999", fontFamily: "Arial, sans-serif", borderTop: "1px solid #ccc", paddingTop: 10 }}>
          NOTA: Las paginas 4 a 7 del informe original no se encontraron en la carpeta.
          Se desconoce si fueron retiradas como prueba procesal o si fueron sustraidas.
          <br />Paginas restantes: 1, 2, 3, 8 (esta).
        </div>
      </div>
    </div>
  );
}

/* ========== DOC 3: Libreta de anotaciones del agente ========== */
function DocSeguro() {
  return (
    <div style={{
      ...paperBase,
      background: "#1a1a1a",
      width: 400,
      padding: "36px 40px",
      transform: "rotate(-0.5deg)",
      fontFamily: "'Segoe Script', 'Comic Sans MS', cursive",
      color: "#c8c8d0",
      boxShadow: "0 4px 30px rgba(0,0,0,0.6), inset 0 0 60px rgba(0,0,0,0.3)",
    }}>
      {/* Spiral binding dots */}
      <div style={{ position: "absolute", top: 0, left: 16, display: "flex", flexDirection: "column", gap: 18, paddingTop: 20, pointerEvents: "none" }}>
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#333", border: "1px solid #444" }} />
        ))}
      </div>

      <div style={{ marginLeft: 16, fontSize: 16, lineHeight: 2.2 }}>
        <div style={{ borderBottom: "1px solid #333", paddingBottom: 8, marginBottom: 12, fontSize: 13, fontFamily: "Arial, sans-serif", color: "#666" }}>
          Libreta de campo — J. Whitfield
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: "#666", fontFamily: "Arial, sans-serif" }}>02/06/2015</div>
          <div>Vigilancia en muelle de Caguas.</div>
          <div>Santos recoge paquete 23:10h.</div>
          <div>Matricula furgoneta: <span style={{ fontFamily: "monospace", color: "#e0e0e0" }}>PR-B4471</span></div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: "#666", fontFamily: "Arial, sans-serif" }}>07/06/2015</div>
          <div>Taller de Ocasio. Dejaron un</div>
          <div>Bravado negro. Ocasio trabaja,</div>
          <div>no pregunta. Buen hombre,</div>
          <div>mala suerte.</div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: "#666", fontFamily: "Arial, sans-serif" }}>10/06/2015</div>
          <div>Confirmo: contacto en LSPD.</div>
          <div>Alguien filtra info desde</div>
          <div>dentro. No se de quien fiarme.</div>
          <div style={{ color: "#e94560", fontStyle: "italic" }}>Cuidado.</div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: "#666", fontFamily: "Arial, sans-serif" }}>11/06/2015</div>
          <div>Transferencia a MV confirmada.</div>
          <div>MazeVault — verificar fondos.</div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: "#666", fontFamily: "Arial, sans-serif" }}>12/06/2015</div>
          <div>Handler no contesta. 3er dia.</div>
          <div>He llamado a asuntos internos.</div>
          <div>Dicen que &quot;no consta&quot;.</div>
          <div style={{ color: "#e94560" }}>Que coño esta pasando?</div>
        </div>

        <div>
          <div style={{ fontSize: 12, color: "#666", fontFamily: "Arial, sans-serif" }}>14/06/2015 — 19:40h</div>
          <div>Reunion confirmada en el taller.</div>
          <div>Caguas. 22:00h. Santos estara.</div>
          <div>Llevar micro.</div>
          <div style={{ marginTop: 8, color: "#e94560", fontWeight: "bold" }}>
            Si sale bien, los tenemos.
          </div>
        </div>

        {/* Torn pages indicator */}
        <div style={{ marginTop: 20, borderTop: "1px dashed #444", paddingTop: 10, fontSize: 12, fontFamily: "Arial, sans-serif", color: "#555", fontStyle: "italic" }}>
          [Las siguientes paginas han sido arrancadas]
        </div>
      </div>
    </div>
  );
}

/* ========== DOC 4: Nota con credenciales ========== */
function DocCarta() {
  return (
    <div style={{
      background: "linear-gradient(165deg, #f7f3ea 0%, #efe8da 100%)",
      width: 360,
      maxWidth: "90vw",
      padding: "32px 36px",
      position: "relative",
      fontFamily: "'Segoe Script', 'Comic Sans MS', 'Bradley Hand', cursive",
      color: "#1a1a2e",
      boxShadow: "0 4px 30px rgba(0,0,0,0.5), inset 0 0 60px rgba(139,119,80,0.1)",
      transform: "rotate(1.2deg)",
      lineHeight: 1.5,
      /* Torn edge effect top */
      borderTop: "3px solid transparent",
      borderImage: "repeating-linear-gradient(90deg, #efe8da 0px, #efe8da 4px, transparent 4px, transparent 8px) 3",
    }}>
      {/* Wrinkle / fold */}
      <div style={{ position: "absolute", top: "45%", left: 0, width: "100%", height: 2, background: "rgba(120,100,60,0.1)", pointerEvents: "none" }} />

      {/* Coffee ring */}
      <div style={{
        position: "absolute", top: 8, right: 14, width: 55, height: 55, borderRadius: "50%",
        border: "2px solid rgba(120,80,30,0.1)", pointerEvents: "none",
      }} />

      <div style={{ fontSize: 18, color: "#2a2a4a", lineHeight: 2.2 }}>
        <div>Wallet :</div>
        <div style={{
          fontFamily: "monospace", fontSize: 14, color: "#1a1a3a", marginTop: 4, marginBottom: 14,
          background: "rgba(0,0,0,0.03)", padding: "4px 8px", borderRadius: 2,
          letterSpacing: 0.5, wordBreak: "break-all",
        }}>
          itssmiikey.vercel.app/wallet
        </div>

        <div>User :</div>
        <div style={{
          fontFamily: "monospace", fontSize: 15, color: "#1a1a3a", marginTop: 4, marginBottom: 14,
          background: "rgba(0,0,0,0.03)", padding: "4px 8px", borderRadius: 2,
        }}>
          4827163
        </div>

        <div>Pass :</div>
        <div style={{
          fontFamily: "monospace", fontSize: 15, color: "#1a1a3a", marginTop: 4,
          background: "rgba(0,0,0,0.03)", padding: "4px 8px", borderRadius: 2,
          letterSpacing: 1,
        }}>
          perroNegro_33!
        </div>
      </div>

      {/* Ink smear */}
      <div style={{
        position: "absolute", bottom: 18, right: 24, width: 30, height: 6,
        background: "rgba(30,30,80,0.06)", borderRadius: 3, transform: "rotate(-15deg)", pointerEvents: "none",
      }} />

      {/* Faded overlay */}
      <div style={{
        position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
        background: "linear-gradient(180deg, rgba(255,255,240,0.06) 0%, rgba(200,180,140,0.04) 100%)",
        pointerEvents: "none",
      }} />
    </div>
  );
}

/* ========== Helper for insurance doc ========== */
function DocFieldAlt({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 2 }}>
      <span style={{ width: 150, flexShrink: 0, color: "#555", fontWeight: 600 }}>{label}:</span>
      <span style={{ color: "#111" }}>{value}</span>
    </div>
  );
}

/* ========== Helper for permiso doc ========== */
function DocField({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 4, fontSize: 14 }}>
      <span style={{ width: 180, flexShrink: 0, color: "#555", fontSize: 11, fontFamily: "Arial, sans-serif", textTransform: "uppercase", letterSpacing: 0.5, paddingTop: 2 }}>{label}</span>
      <span style={{ color: "#111", fontWeight: 500, fontFamily: mono ? "monospace" : "inherit", borderBottom: "1px solid #ccc", flex: 1, paddingBottom: 2 }}>{value}</span>
    </div>
  );
}
