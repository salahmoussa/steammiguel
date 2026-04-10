"use client";

export default function SCWPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#f0f3f6",
      color: "#1a1a1a",
      fontFamily: "Arial, Helvetica, sans-serif",
    }}>
      {/* Top bar */}
      <div style={{
        background: "#1a3a6a",
        color: "#fff",
        padding: "10px 40px",
        fontSize: 11,
        display: "flex",
        justifyContent: "space-between",
      }}>
        <div>+1 (213) 555-0247 · info@scw.ls</div>
        <div>HORARIO: L-V 07:00 - 19:00 · S 08:00 - 14:00</div>
      </div>

      {/* Header */}
      <div style={{
        background: "#fff",
        borderBottom: "3px solid #c8a020",
        padding: "20px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Logo */}
          <div style={{
            width: 50, height: 50,
            background: "linear-gradient(135deg, #2a4a7a 0%, #1a3a6a 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: 18, fontWeight: 900,
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}>SCW</div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#1a3a6a", letterSpacing: -0.5 }}>STONER CEMENT WORKS</div>
            <div style={{ fontSize: 10, color: "#666", letterSpacing: 1, marginTop: -2 }}>CEMENTO · ALMACENAJE · CONSTRUCCION · DESDE 1973</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 24, fontSize: 12, color: "#1a3a6a", fontWeight: 700 }}>
          <span style={{ cursor: "pointer" }}>INICIO</span>
          <span style={{ cursor: "pointer" }}>SERVICIOS</span>
          <span style={{ cursor: "pointer" }}>ALMACENAJE</span>
          <span style={{ cursor: "pointer" }}>UBICACIONES</span>
          <span style={{ cursor: "pointer" }}>CONTACTO</span>
        </div>
      </div>

      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #1a3a6a 0%, #2a4a7a 60%, #1a3a6a 100%)",
        color: "#fff",
        padding: "60px 40px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Industrial pattern overlay */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.06,
          backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 20px)",
          pointerEvents: "none",
        }}/>
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 11, color: "#c8a020", letterSpacing: 4, marginBottom: 16, fontWeight: 700 }}>
            CALIDAD INDUSTRIAL DESDE 1973
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 900, margin: 0, letterSpacing: -1 }}>
            CONSTRUIMOS LOS SANTOS
          </h1>
          <p style={{ fontSize: 14, color: "#aac4e0", marginTop: 12, maxWidth: 600, margin: "12px auto 0" }}>
            Stoner Cement Works lleva mas de 50 años suministrando cemento, hormigon y soluciones
            de almacenaje industrial a empresas y particulares de todo el condado.
          </p>
        </div>
      </div>

      {/* Services */}
      <div style={{ padding: "50px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20,
        }}>
          {[
            { icon: "🏗️", title: "CEMENTO Y HORMIGON", desc: "Mezclas industriales para grandes proyectos. Entrega en obra." },
            { icon: "📦", title: "ALMACENAJE INDUSTRIAL", desc: "Modulos de alquiler por meses. Tamaños desde 4m² hasta 50m²." },
            { icon: "🚚", title: "TRANSPORTE Y LOGISTICA", desc: "Flota propia de camiones para entregas en todo San Andreas." },
          ].map((s, i) => (
            <div key={i} style={{
              background: "#fff",
              border: "1px solid #d8e0e8",
              padding: 24,
              borderTop: "3px solid #c8a020",
            }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>{s.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 900, color: "#1a3a6a", letterSpacing: 0.5, marginBottom: 8 }}>{s.title}</div>
              <div style={{ fontSize: 12, color: "#555", lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Storage section */}
      <div style={{
        background: "#1a3a6a",
        color: "#fff",
        padding: "50px 40px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ fontSize: 11, color: "#c8a020", letterSpacing: 3, marginBottom: 8, fontWeight: 700 }}>SERVICIO DESTACADO</div>
          <h2 style={{ fontSize: 28, fontWeight: 900, margin: 0, marginBottom: 16, letterSpacing: -0.5 }}>
            ALMACENAJE INDUSTRIAL POR MODULOS
          </h2>
          <p style={{ fontSize: 13, color: "#aac4e0", lineHeight: 1.7, maxWidth: 700 }}>
            Alquilamos modulos de almacenaje industrial de diferentes tamaños en nuestro complejo de Murrieta Heights.
            Acceso 24/7 con tarjeta personal, vigilancia continua, climatizacion estandar e instalaciones electricas.
            Sin contratos largos. Pague mes a mes y cancele cuando quiera.
          </p>
          <div style={{
            marginTop: 24, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14,
          }}>
            {[
              { size: "S", area: "4 m²", price: "$120" },
              { size: "M", area: "12 m²", price: "$280" },
              { size: "L", area: "25 m²", price: "$520" },
              { size: "XL", area: "50 m²", price: "$890" },
            ].map((m, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(200,160,32,0.3)",
                padding: 16, textAlign: "center",
              }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#c8a020" }}>{m.size}</div>
                <div style={{ fontSize: 11, color: "#aac4e0", marginTop: 2 }}>{m.area}</div>
                <div style={{ fontSize: 14, color: "#fff", marginTop: 8, fontWeight: 700 }}>{m.price}<span style={{ fontSize: 9, color: "#aac4e0" }}>/mes</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Locations */}
      <div style={{ padding: "50px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ fontSize: 11, color: "#888", letterSpacing: 3, marginBottom: 8, fontWeight: 700 }}>NUESTRAS UBICACIONES</div>
        <h2 style={{ fontSize: 26, fontWeight: 900, color: "#1a3a6a", margin: 0, marginBottom: 24, letterSpacing: -0.5 }}>
          PRESENTES EN TODO SAN ANDREAS
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { name: "MURRIETA HEIGHTS", addr: "Industrial Plaza 14, Murrieta Heights, Los Santos", main: true, desc: "SEDE CENTRAL · Almacenaje 24/7" },
            { name: "LA MESA", addr: "Popular St. 88, La Mesa, Los Santos", main: false, desc: "Cemento y hormigon" },
            { name: "PALETO BAY", addr: "Cassidy Trail Rd 3, Paleto Bay", main: false, desc: "Cemento y hormigon" },
          ].map((loc, i) => (
            <div key={i} style={{
              background: loc.main ? "#fff" : "#f8fafc",
              border: `2px solid ${loc.main ? "#c8a020" : "#d8e0e8"}`,
              padding: 18,
              position: "relative",
            }}>
              {loc.main && (
                <div style={{
                  position: "absolute", top: -10, right: 12,
                  background: "#c8a020", color: "#fff",
                  fontSize: 9, fontWeight: 900, letterSpacing: 1,
                  padding: "3px 8px",
                }}>
                  PRINCIPAL
                </div>
              )}
              <div style={{ fontSize: 14, fontWeight: 900, color: "#1a3a6a" }}>{loc.name}</div>
              <div style={{ fontSize: 11, color: "#555", marginTop: 4, lineHeight: 1.5 }}>{loc.addr}</div>
              <div style={{ fontSize: 10, color: "#888", marginTop: 8, fontStyle: "italic" }}>{loc.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        background: "#0e2240",
        color: "#aac4e0",
        padding: "30px 40px",
        textAlign: "center",
        fontSize: 11,
        borderTop: "3px solid #c8a020",
      }}>
        STONER CEMENT WORKS · DESDE 1973 · LOS SANTOS, SAN ANDREAS<br />
        Todos los derechos reservados © 2026
      </div>
    </div>
  );
}
