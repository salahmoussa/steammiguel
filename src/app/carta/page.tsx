import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notificacion oficial — DMV Los Santos",
};

export default function CartaPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse at top, #2a1f14 0%, #1a120a 45%, #0a0604 100%)",
        padding: "60px 20px 80px",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        position: "relative",
      }}
    >
      {/* Wood desk texture overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(92deg, rgba(0,0,0,0.08) 0 2px, transparent 2px 14px), repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 9px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Envelope peek behind letter */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -22,
            left: -28,
            right: -28,
            bottom: -18,
            background: "#d9c9a8",
            borderRadius: 2,
            transform: "rotate(-1.4deg)",
            boxShadow:
              "0 20px 50px rgba(0,0,0,0.55), 0 4px 10px rgba(0,0,0,0.4)",
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(120,80,40,0.08) 0 3px, transparent 3px 7px)",
          }}
        >
          {/* Stamp */}
          <div
            style={{
              position: "absolute",
              top: 14,
              right: 20,
              width: 78,
              height: 94,
              background: "#7a1e1e",
              border: "3px dashed #d9c9a8",
              padding: 4,
              transform: "rotate(4deg)",
              fontFamily: "'Courier New', monospace",
              color: "#f0e8d0",
              textAlign: "center",
              fontSize: 9,
              lineHeight: 1.3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            <div style={{ fontWeight: "bold", fontSize: 10 }}>SAN</div>
            <div style={{ fontWeight: "bold", fontSize: 10 }}>ANDREAS</div>
            <div style={{ fontSize: 22, margin: "4px 0", fontWeight: "bold" }}>
              $2
            </div>
            <div style={{ fontSize: 8 }}>CORREO</div>
            <div style={{ fontSize: 8 }}>OFICIAL</div>
          </div>

          {/* Postmark circle */}
          <div
            style={{
              position: "absolute",
              top: 28,
              right: 110,
              width: 86,
              height: 86,
              borderRadius: "50%",
              border: "2px solid rgba(40,20,10,0.55)",
              color: "rgba(40,20,10,0.55)",
              fontFamily: "'Courier New', monospace",
              fontSize: 9,
              fontWeight: "bold",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              transform: "rotate(-8deg)",
              letterSpacing: 1,
            }}
          >
            <div>LOS SANTOS</div>
            <div style={{ fontSize: 11, margin: "2px 0" }}>★</div>
            <div>05 ABR 2026</div>
            <div style={{ marginTop: 2 }}>DMV</div>
          </div>
        </div>

        {/* The letter */}
        <div
          style={{
            position: "relative",
            background:
              "linear-gradient(180deg, #f5efde 0%, #ece3c9 100%)",
            padding: "52px 56px 64px",
            boxShadow:
              "0 30px 80px rgba(0,0,0,0.6), 0 8px 20px rgba(0,0,0,0.5), inset 0 0 60px rgba(180,140,80,0.12)",
            color: "#2a2418",
            lineHeight: 1.75,
            fontSize: 15,
            transform: "rotate(0.4deg)",
            border: "1px solid rgba(120,90,50,0.25)",
          }}
        >
          {/* Red "URGENTE" stamp */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 34,
              right: 40,
              border: "3px solid #a52020",
              color: "#a52020",
              padding: "6px 14px",
              fontFamily: "'Courier New', monospace",
              fontWeight: "bold",
              fontSize: 16,
              letterSpacing: 3,
              transform: "rotate(12deg)",
              opacity: 0.82,
              background: "rgba(255,255,255,0.15)",
            }}
          >
            URGENTE
          </div>

          {/* Letterhead */}
          <div
            style={{
              textAlign: "center",
              paddingBottom: 18,
              marginBottom: 24,
              borderBottom: "2px solid #3a2f1a",
            }}
          >
            {/* Seal */}
            <div
              aria-hidden
              style={{
                width: 58,
                height: 58,
                borderRadius: "50%",
                border: "2px solid #3a2f1a",
                margin: "0 auto 10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Courier New', monospace",
                fontSize: 18,
                fontWeight: "bold",
                color: "#3a2f1a",
              }}
            >
              ★
            </div>
            <div
              style={{
                fontSize: 13,
                letterSpacing: 4,
                textTransform: "uppercase",
                fontWeight: "bold",
                marginBottom: 4,
              }}
            >
              Gobierno del Estado de San Andreas
            </div>
            <div style={{ fontSize: 15, fontStyle: "italic" }}>
              Deposito Municipal de Vehiculos
            </div>
            <div style={{ fontSize: 12, color: "#5a4a2a", marginTop: 2 }}>
              Distrito de Los Santos
            </div>
          </div>

          {/* Reference + date */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 13,
              marginBottom: 22,
              color: "#3a2f1a",
            }}
          >
            <div>
              <strong>Ref. Expediente:</strong> DSG-7741-BX
            </div>
            <div>Los Santos, a 05 de abril de 2026</div>
          </div>

          {/* Body */}
          <p style={{ marginBottom: 14 }}>Estimado/a heredero/a legal,</p>

          <p style={{ marginBottom: 14, textAlign: "justify" }}>
            Nos dirigimos a usted en relacion a un vehiculo retenido en
            nuestras instalaciones cuya titularidad figura a nombre de{" "}
            <strong>Carlos Ocasio</strong> (fallecido). El vehiculo contiene
            pertenencias personales pendientes de reclamacion por parte del
            heredero legal.
          </p>

          <p style={{ marginBottom: 14, textAlign: "justify" }}>
            De acuerdo con la legislacion vigente del Estado de San Andreas,
            dispone de un plazo de <strong>7 dias naturales</strong> desde la
            recepcion de este aviso para gestionar la reclamacion. Pasado dicho
            plazo, el vehiculo y todas las pertenencias seran destruidos o
            subastados sin posibilidad de reclamacion posterior.
          </p>

          <p style={{ marginBottom: 14 }}>
            Para consultar su expediente acceda al portal oficial con las
            siguientes credenciales:
          </p>

          {/* Credentials box */}
          <div
            style={{
              border: "1px dashed #6a5530",
              background: "rgba(255, 250, 230, 0.55)",
              padding: "14px 18px",
              margin: "6px 0 22px",
              fontFamily: "'Courier New', 'Courier', monospace",
              fontSize: 13.5,
              lineHeight: 1.9,
            }}
          >
            <div>
              <span style={{ color: "#5a4a2a" }}>Portal oficial:</span>{" "}
              <span style={{ fontWeight: "bold" }}>
                portal.dmv.sanandreas.gov/deposito
              </span>
            </div>
            <div>
              <span style={{ color: "#5a4a2a" }}>Numero de referencia:</span>{" "}
              <span style={{ fontWeight: "bold" }}>DSG-7741-BX</span>
            </div>
            <div>
              <span style={{ color: "#5a4a2a" }}>Clave de acceso:</span>{" "}
              <span style={{ fontWeight: "bold" }}>1744</span>
            </div>
          </div>

          <p style={{ marginBottom: 34 }}>Atentamente,</p>

          {/* Signature */}
          <div style={{ marginBottom: 6 }}>
            <div
              style={{
                fontFamily:
                  "'Segoe Script', 'Brush Script MT', 'Lucida Handwriting', cursive",
                fontSize: 26,
                color: "#1a2540",
                transform: "rotate(-2deg)",
                display: "inline-block",
                marginLeft: 10,
                marginBottom: -6,
              }}
            >
              M. Arellano
            </div>
            <div
              style={{
                borderTop: "1px solid #3a2f1a",
                paddingTop: 4,
                width: 260,
                fontSize: 12,
                color: "#3a2f1a",
              }}
            >
              <div style={{ fontWeight: "bold" }}>
                Departamento de Gestion de Bienes Retenidos
              </div>
              <div>Deposito Municipal de Vehiculos — Los Santos</div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              marginTop: 38,
              paddingTop: 12,
              borderTop: "1px solid rgba(58,47,26,0.35)",
              fontSize: 10,
              color: "#6a5530",
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            Este documento ha sido emitido por el Deposito Municipal de
            Vehiculos del Estado de San Andreas. Conserve este aviso hasta la
            resolucion del expediente.
          </div>
        </div>
      </div>
    </div>
  );
}
