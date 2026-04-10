"use client";

import { useState } from "react";

const PHOTOS: { id: string; src: string; caption?: string }[] = [
  { id: "1", src: "/carta/fotocarta1.png" },
  { id: "2", src: "/carta/fotocarta2.png" },
];

export default function CartaPostNLPage() {
  const [opened, setOpened] = useState(false);
  const [viewingPhoto, setViewingPhoto] = useState<string | null>(null);

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at center, #1a1812 0%, #0e0c08 60%, #050402 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: 30, fontFamily: "'Inter','Segoe UI',sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes envelopeOpen {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(2deg) scale(1.02); }
          100% { transform: rotate(0deg) scale(1); }
        }
      `}</style>

      {/* Photo viewer modal */}
      {viewingPhoto && (
        <div onClick={() => setViewingPhoto(null)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 9999,
          display: "flex", alignItems: "center", justifyContent: "center", padding: 20, cursor: "pointer",
          animation: "fadeIn 0.3s ease-out",
        }}>
          <img src={viewingPhoto} alt="Foto" style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain", borderRadius: 4, boxShadow: "0 8px 40px rgba(0,0,0,0.8)" }}/>
          <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", fontSize: 12, color: "#666", fontFamily: "Arial,sans-serif" }}>
            Click para cerrar
          </div>
        </div>
      )}

      {/* === CLOSED ENVELOPE === */}
      {!opened && (
        <div
          onClick={() => setOpened(true)}
          style={{
            width: 620, maxWidth: "94vw", height: 380,
            background: "linear-gradient(180deg, #f5f0e0 0%, #e8e0c8 100%)",
            borderRadius: 4,
            boxShadow: "0 20px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.4)",
            position: "relative", cursor: "pointer",
            transition: "transform 0.3s",
            overflow: "hidden",
            border: "1px solid #d8d0b8",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02) rotate(-0.5deg)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) rotate(0deg)"; }}
        >
          {/* GO Postal logo */}
          <div style={{
            position: "absolute", top: 24, left: 30,
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <div style={{
              background: "#c8262c", color: "#fff",
              padding: "8px 14px", borderRadius: 3,
              fontFamily: "Arial,sans-serif", fontWeight: 900, fontSize: 22,
              letterSpacing: -0.5,
              boxShadow: "0 2px 4px rgba(0,0,0,0.25)",
            }}>
              GO
            </div>
            <div style={{
              fontFamily: "Arial,sans-serif", fontWeight: 800, fontSize: 20,
              color: "#1a4a8a", letterSpacing: 0,
            }}>
              POSTAL
            </div>
          </div>

          {/* Stamp */}
          <div style={{
            position: "absolute", top: 24, right: 30,
            width: 92, height: 104,
            background: "linear-gradient(135deg, #fff 0%, #f0e8d8 100%)",
            border: "2px dashed #d8c8a8",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            transform: "rotate(3deg)",
            padding: 6,
          }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#c8262c", fontFamily: "Arial,sans-serif" }}>$3</div>
            <div style={{ fontSize: 9, color: "#1a4a8a", fontWeight: 700, marginTop: 6, fontFamily: "Arial,sans-serif", textAlign: "center", lineHeight: 1.3 }}>SAN ANDREAS<br/>POSTAL SVC</div>
            <div style={{ fontSize: 8, color: "#666", fontFamily: "Arial,sans-serif", marginTop: 4 }}>2026</div>
          </div>

          {/* Sender area (anonymous) */}
          <div style={{
            position: "absolute", top: 150, left: 30,
            fontSize: 11, color: "#888", fontFamily: "Arial,sans-serif",
          }}>
            <div style={{ textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4, fontSize: 10 }}>Remitente</div>
            <div style={{ color: "#bbb", fontStyle: "italic" }}>— Sin datos —</div>
          </div>

          {/* Address area */}
          <div style={{
            position: "absolute", top: 200, left: 30, right: 30,
            background: "#fff", padding: "16px 22px",
            borderRadius: 2,
            boxShadow: "0 3px 10px rgba(0,0,0,0.18)",
            border: "1px solid #ddd",
          }}>
            <div style={{ fontSize: 10, color: "#888", textTransform: "uppercase", letterSpacing: 1.2, fontFamily: "Arial,sans-serif", marginBottom: 6 }}>Destinatario</div>
            <div style={{ fontSize: 17, color: "#1a1a1a", fontFamily: "Arial,sans-serif", fontWeight: 700 }}>Theodore Ocasio</div>
            <div style={{ fontSize: 13, color: "#444", fontFamily: "Arial,sans-serif", marginTop: 4 }}>Apartado de correos privado</div>
            <div style={{ fontSize: 13, color: "#444", fontFamily: "Arial,sans-serif" }}>Los Santos, San Andreas</div>
          </div>

          {/* Mailbox origin badge */}
          <div style={{
            position: "absolute", bottom: 18, left: 30,
            fontSize: 11, color: "#888", fontFamily: "Arial,sans-serif",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <span style={{ fontSize: 14 }}>📮</span>
            <span>Depositada en buzon publico &middot; Origen no registrado</span>
          </div>

          {/* Postmark */}
          <div style={{
            position: "absolute", bottom: 18, right: 30,
            width: 80, height: 80, borderRadius: "50%",
            border: "2px solid rgba(26,74,138,0.4)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            transform: "rotate(-12deg)",
            color: "rgba(26,74,138,0.55)",
            fontFamily: "Arial,sans-serif",
          }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1 }}>LOS SANTOS</div>
            <div style={{ fontSize: 16, fontWeight: 700, margin: "3px 0" }}>04</div>
            <div style={{ fontSize: 9, letterSpacing: 1 }}>2026</div>
          </div>
        </div>
      )}

      {/* Click hint outside */}
      {!opened && (
        <div style={{
          marginTop: 16, fontSize: 12, color: "#665544", letterSpacing: 0.5,
          fontFamily: "Arial,sans-serif",
        }}>
          Click en el sobre para abrir
        </div>
      )}

      {/* === OPENED: just photos === */}
      {opened && (
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 50, justifyContent: "center",
          padding: "20px 0 40px",
          animation: "slideUp 0.6s ease-out",
        }}>
          {PHOTOS.map((photo, idx) => {
            const rotation = idx === 0 ? -4 : 3.5;
            return (
              <div
                key={photo.id}
                onClick={() => setViewingPhoto(photo.src)}
                style={{
                  position: "relative",
                  background: "#fdfaf2",
                  padding: "20px 20px 70px 20px",
                  boxShadow: "0 12px 36px rgba(0,0,0,0.6), 0 4px 10px rgba(0,0,0,0.4)",
                  cursor: "pointer",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  transform: `rotate(${rotation}deg)`,
                  width: 320,
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "scale(1.04) rotate(0deg)";
                  e.currentTarget.style.boxShadow = "0 18px 50px rgba(0,0,0,0.75), 0 6px 14px rgba(0,0,0,0.5)";
                  e.currentTarget.style.zIndex = "10";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = `rotate(${rotation}deg)`;
                  e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,0.6), 0 4px 10px rgba(0,0,0,0.4)";
                  e.currentTarget.style.zIndex = "1";
                }}
              >
                {/* Tape on top */}
                <div style={{
                  position: "absolute", top: -10, left: "50%", transform: "translateX(-50%) rotate(-2deg)",
                  width: 90, height: 24,
                  background: "linear-gradient(180deg, rgba(255,255,200,0.7) 0%, rgba(255,255,180,0.5) 100%)",
                  border: "1px solid rgba(200,180,100,0.3)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                }}/>

                {/* Photo image */}
                <div style={{
                  width: "100%",
                  aspectRatio: "1",
                  background: "#1a1a1a",
                  overflow: "hidden",
                  position: "relative",
                }}>
                  <img
                    src={photo.src}
                    alt={photo.caption || "Foto"}
                    style={{
                      width: "100%", height: "100%", objectFit: "cover",
                      filter: "contrast(1.05) saturate(0.92)",
                    }}
                  />
                  {/* Print grain overlay */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(135deg, rgba(255,200,150,0.04) 0%, transparent 50%, rgba(100,80,40,0.05) 100%)",
                    pointerEvents: "none",
                  }}/>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Close letter button */}
      {opened && (
        <button
          onClick={() => setOpened(false)}
          style={{
            marginTop: 24, padding: "8px 18px",
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 6, color: "#aaa", fontSize: 12, cursor: "pointer",
            fontFamily: "Arial,sans-serif", letterSpacing: 0.5,
          }}
        >
          Cerrar carta
        </button>
      )}
    </div>
  );
}
