"use client";

export default function TheRoyalePage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #0a0807 0%, #14100c 100%)",
      color: "#e8d8a8",
      fontFamily: "'Playfair Display', Georgia, serif",
    }}>
      {/* Top bar */}
      <div style={{
        borderBottom: "1px solid #2a2218",
        padding: "16px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(0,0,0,0.4)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            border: "2px solid #c8a058",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#c8a058", fontSize: 18, fontWeight: 700,
          }}>R</div>
          <div>
            <div style={{ fontSize: 22, color: "#c8a058", letterSpacing: 4, fontWeight: 600 }}>THE ROYALE</div>
            <div style={{ fontSize: 9, color: "#7a6a4a", letterSpacing: 3, marginTop: -2, fontFamily: "Arial,sans-serif" }}>HOTEL · LOS SANTOS</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 28, fontSize: 13, color: "#9a8a6a", fontFamily: "Arial,sans-serif", letterSpacing: 1 }}>
          <span style={{ cursor: "pointer" }}>HABITACIONES</span>
          <span style={{ cursor: "pointer" }}>RESTAURANTE</span>
          <span style={{ cursor: "pointer" }}>SPA</span>
          <span style={{ cursor: "pointer" }}>EVENTOS</span>
          <span style={{ cursor: "pointer", color: "#c8a058" }}>RESERVAR</span>
        </div>
      </div>

      {/* Hero */}
      <div style={{
        position: "relative",
        padding: "120px 40px 100px",
        textAlign: "center",
        background: "radial-gradient(ellipse at center, rgba(200,160,88,0.06) 0%, transparent 60%)",
      }}>
        <div style={{ fontSize: 11, color: "#c8a058", letterSpacing: 6, marginBottom: 24, fontFamily: "Arial,sans-serif" }}>
          ★ ★ ★ ★ ★
        </div>
        <h1 style={{ fontSize: 64, fontWeight: 300, letterSpacing: -1, margin: 0, color: "#f0e0b8", lineHeight: 1.1 }}>
          Donde Los Santos<br />se duerme.
        </h1>
        <p style={{ fontSize: 16, color: "#9a8a6a", marginTop: 24, maxWidth: 540, margin: "24d auto 0", fontStyle: "italic", lineHeight: 1.6, fontFamily: "Georgia,serif" }}>
          A pocos pasos de Vinewood Boulevard, The Royale es el ultimo refugio de elegancia
          en una ciudad que nunca duerme.
        </p>

        <button style={{
          marginTop: 40, padding: "14px 36px",
          background: "transparent",
          border: "1px solid #c8a058",
          color: "#c8a058",
          fontSize: 12, letterSpacing: 3,
          cursor: "pointer", fontFamily: "Arial,sans-serif",
        }}>
          RESERVAR HABITACION
        </button>
      </div>

      {/* Rooms section */}
      <div style={{ padding: "60px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <div style={{ fontSize: 11, color: "#7a6a4a", letterSpacing: 4, fontFamily: "Arial,sans-serif" }}>NUESTRAS HABITACIONES</div>
          <h2 style={{ fontSize: 36, fontWeight: 300, marginTop: 12, color: "#e8d8a8" }}>Suites de lujo</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {[
            { name: "Vinewood Suite", price: "$1.200", desc: "Vistas panoramicas a Vinewood Hills" },
            { name: "Penthouse Royale", price: "$3.500", desc: "Atico con jacuzzi y terraza privada" },
            { name: "Standard Premium", price: "$480", desc: "Confort y elegancia para una noche perfecta" },
          ].map((room, i) => (
            <div key={i} style={{
              background: "rgba(20,16,12,0.6)",
              border: "1px solid #2a2218",
              padding: 28,
            }}>
              <div style={{
                width: "100%", height: 140,
                background: "linear-gradient(135deg, #2a2218 0%, #1a1410 100%)",
                marginBottom: 20,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#3a3020", fontSize: 32,
              }}>🛏</div>
              <div style={{ fontSize: 18, color: "#e8d8a8", fontWeight: 500 }}>{room.name}</div>
              <div style={{ fontSize: 12, color: "#7a6a4a", marginTop: 6, marginBottom: 14, fontFamily: "Arial,sans-serif" }}>{room.desc}</div>
              <div style={{ fontSize: 20, color: "#c8a058", fontFamily: "Georgia,serif" }}>
                {room.price}<span style={{ fontSize: 11, color: "#7a6a4a", marginLeft: 4 }}>/noche</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hidden booking detail */}
      <div style={{
        background: "rgba(200,160,88,0.04)",
        borderTop: "1px solid #2a2218",
        borderBottom: "1px solid #2a2218",
        padding: "40px 40px",
        marginTop: 40,
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: "#7a6a4a", letterSpacing: 3, fontFamily: "Arial,sans-serif", marginBottom: 12 }}>
            CONSULTA TU RESERVA
          </div>
          <div style={{ fontSize: 13, color: "#9a8a6a", fontFamily: "Arial,sans-serif" }}>
            Para acceder a su reserva, introduzca el numero de confirmacion en nuestra recepcion virtual.
          </div>
          <div style={{
            marginTop: 24, display: "flex", gap: 10, justifyContent: "center",
          }}>
            <input
              type="text"
              placeholder="N° de reserva"
              style={{
                background: "rgba(0,0,0,0.4)",
                border: "1px solid #3a3020",
                color: "#c8a058", padding: "10px 16px",
                fontSize: 13, fontFamily: "monospace", letterSpacing: 1,
                minWidth: 240,
              }}
            />
            <button style={{
              background: "#c8a058", border: "none",
              color: "#0a0807", padding: "10px 24px",
              fontSize: 11, fontWeight: 700, letterSpacing: 2,
              cursor: "pointer", fontFamily: "Arial,sans-serif",
            }}>
              CONSULTAR
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: "center", padding: "30px 20px",
        fontSize: 11, color: "#4a4030", fontFamily: "Arial,sans-serif",
        letterSpacing: 1, lineHeight: 2,
      }}>
        THE ROYALE HOTEL &middot; 745 VINEWOOD BLVD &middot; LOS SANTOS, SA<br />
        +1 (213) 555-0188 &middot; reservas@theroyale.ls
        <br /><br />
        <span style={{ color: "#2a2218", fontSize: 9 }}>© 2026 THE ROYALE HOTEL — TODOS LOS DERECHOS RESERVADOS</span>
      </div>
    </div>
  );
}
