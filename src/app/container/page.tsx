"use client";

import { useState } from "react";

const VALID_CODE = "2384";

export default function ContainerPage() {
  const [showLockModal, setShowLockModal] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (code === VALID_CODE) {
      setUnlocked(true);
      setError(false);
      setShowLockModal(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 600);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0805",
      position: "relative",
      overflow: "hidden",
      fontFamily: "Arial, sans-serif",
    }}>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      {/* Container background fills entire screen */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, #1a3520 0%, #2d5a35 30%, #3a6e42 50%, #2d5a35 80%, #1a3520 100%)",
      }}>
        {/* Ribbed metal texture - vertical lines */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "repeating-linear-gradient(90deg, transparent 0, transparent 38px, rgba(0,0,0,0.3) 38px, rgba(0,0,0,0.3) 40px, transparent 40px, transparent 78px, rgba(255,255,255,0.04) 78px, rgba(255,255,255,0.04) 80px)",
          pointerEvents: "none",
        }} />

        {/* Horizontal rivets row top */}
        <div style={{
          position: "absolute", top: 30, left: 0, right: 0, height: 16,
          display: "flex", justifyContent: "space-around",
          pointerEvents: "none",
        }}>
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} style={{
              width: 12, height: 12, borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%, #4a5a3a 0%, #1a2510 70%)",
              boxShadow: "inset 0 1px 2px rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.4)",
            }} />
          ))}
        </div>

        {/* Horizontal rivets row bottom */}
        <div style={{
          position: "absolute", bottom: 30, left: 0, right: 0, height: 16,
          display: "flex", justifyContent: "space-around",
          pointerEvents: "none",
        }}>
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} style={{
              width: 12, height: 12, borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%, #4a5a3a 0%, #1a2510 70%)",
              boxShadow: "inset 0 1px 2px rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.4)",
            }} />
          ))}
        </div>

        {/* Rust/wear patches */}
        <div style={{
          position: "absolute", top: "20%", left: "10%", width: 120, height: 80,
          background: "radial-gradient(ellipse, rgba(80,40,15,0.25) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "25%", right: "15%", width: 140, height: 100,
          background: "radial-gradient(ellipse, rgba(60,30,10,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "55%", left: "30%", width: 80, height: 60,
          background: "radial-gradient(ellipse, rgba(80,40,15,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Container ID stencil */}
        <div style={{
          position: "absolute", top: 70, left: "10%",
          fontFamily: "'Courier New', monospace",
          fontSize: 22, fontWeight: 900,
          color: "rgba(255,255,255,0.25)",
          letterSpacing: 4,
          textShadow: "2px 2px 0 rgba(0,0,0,0.3)",
          pointerEvents: "none",
        }}>
          SCW · 2384 · 47
        </div>

        {/* Center vertical seam - the gap between two doors */}
        <div style={{
          position: "absolute", top: 0, bottom: 0, left: "50%", transform: "translateX(-50%)",
          width: 6,
          background: "linear-gradient(180deg, #000 0%, #050505 50%, #000 100%)",
          boxShadow: "0 0 12px rgba(0,0,0,0.8), inset 0 0 4px rgba(0,0,0,1)",
          pointerEvents: "none",
        }}>
          {/* Subtle inner shadow lines */}
          <div style={{
            position: "absolute", top: 0, bottom: 0, left: -3, width: 1,
            background: "rgba(0,0,0,0.6)",
          }} />
          <div style={{
            position: "absolute", top: 0, bottom: 0, right: -3, width: 1,
            background: "rgba(0,0,0,0.6)",
          }} />
        </div>

        {/* Locking bars (vertical metal rods on doors) */}
        <div style={{
          position: "absolute", top: 60, bottom: 60, left: "calc(50% - 60px)",
          width: 8,
          background: "linear-gradient(90deg, #1a1a1a 0%, #4a4a4a 50%, #1a1a1a 100%)",
          borderRadius: 2,
          boxShadow: "0 2px 6px rgba(0,0,0,0.6)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: 60, bottom: 60, left: "calc(50% + 52px)",
          width: 8,
          background: "linear-gradient(90deg, #1a1a1a 0%, #4a4a4a 50%, #1a1a1a 100%)",
          borderRadius: 2,
          boxShadow: "0 2px 6px rgba(0,0,0,0.6)",
          pointerEvents: "none",
        }} />

        {/* Locking handles (horizontal at lock mechanism height) */}
        <div style={{
          position: "absolute", top: "50%", left: "calc(50% - 75px)", transform: "translateY(-50%)",
          width: 30, height: 14,
          background: "linear-gradient(180deg, #6a6a6a 0%, #2a2a2a 100%)",
          borderRadius: 2,
          boxShadow: "0 2px 4px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "50%", left: "calc(50% + 45px)", transform: "translateY(-50%)",
          width: 30, height: 14,
          background: "linear-gradient(180deg, #6a6a6a 0%, #2a2a2a 100%)",
          borderRadius: 2,
          boxShadow: "0 2px 4px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2)",
          pointerEvents: "none",
        }} />

        {/* Lock latch plate - centered between handles */}
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: 90, height: 30,
          background: "linear-gradient(180deg, #5a5a5a 0%, #2a2a2a 100%)",
          border: "1px solid #1a1a1a",
          boxShadow: "0 4px 10px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.15)",
          pointerEvents: "none",
        }}>
          {/* Hasp eye */}
          <div style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            width: 14, height: 14, borderRadius: "50%",
            background: "#0a0a0a",
            border: "2px solid #4a4a4a",
            boxShadow: "inset 0 0 4px rgba(0,0,0,1)",
          }} />
        </div>

        {/* PADLOCK - clickable */}
        {!unlocked && (
          <div
            onClick={() => setShowLockModal(true)}
            style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, calc(-50% + 6px))",
              cursor: "pointer",
              transition: "transform 0.2s",
              zIndex: 5,
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translate(-50%, calc(-50% + 6px)) scale(1.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translate(-50%, calc(-50% + 6px)) scale(1)"; }}
          >
            {/* Shackle (the U-shape on top) */}
            <div style={{
              width: 50, height: 32,
              border: "6px solid #b0b0b0",
              borderBottom: "none",
              borderRadius: "30px 30px 0 0",
              background: "transparent",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.5)",
              marginLeft: 8,
              position: "relative",
            }}>
              {/* Shackle highlight */}
              <div style={{
                position: "absolute", top: 4, left: 2, right: 2, height: 4,
                background: "linear-gradient(180deg, rgba(255,255,255,0.4), transparent)",
                borderRadius: "30px 30px 0 0",
              }} />
            </div>
            {/* Body */}
            <div style={{
              width: 66, height: 56,
              background: "linear-gradient(180deg, #fbbc04 0%, #f59e0b 50%, #c87810 100%)",
              borderRadius: 6,
              border: "2px solid #8a5a08",
              boxShadow: "0 6px 16px rgba(0,0,0,0.7), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.3)",
              position: "relative",
              marginTop: -2,
            }}>
              {/* Keyhole */}
              <div style={{
                position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)",
                width: 14, height: 18,
                background: "#1a1a1a",
                borderRadius: "50% 50% 0 0",
                border: "1px solid #6a4a08",
              }}>
                <div style={{
                  position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)",
                  width: 4, height: 8,
                  background: "#1a1a1a",
                }} />
              </div>
              {/* Brand text */}
              <div style={{
                position: "absolute", bottom: 4, left: 0, right: 0,
                textAlign: "center",
                fontSize: 7, color: "#6a4a08", fontWeight: 900,
                letterSpacing: 0.5,
              }}>
                MASTER
              </div>
            </div>
            {/* Click hint */}
            <div style={{
              position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)",
              marginTop: 16, whiteSpace: "nowrap",
              fontSize: 11, color: "rgba(255,255,255,0.6)",
              textShadow: "0 1px 3px rgba(0,0,0,0.8)",
              fontFamily: "Arial,sans-serif",
              letterSpacing: 1,
            }}>
              Click para introducir el codigo
            </div>
          </div>
        )}

        {/* Unlocked state - placeholder */}
        {unlocked && (
          <div style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            zIndex: 5,
            background: "rgba(0,0,0,0.85)",
            border: "2px solid #22c55e",
            borderRadius: 12, padding: "30px 40px",
            textAlign: "center",
            animation: "fadeIn 0.4s ease-out",
          }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🔓</div>
            <div style={{ color: "#22c55e", fontSize: 18, fontWeight: 700, letterSpacing: 1 }}>
              CONTAINER ABIERTO
            </div>
            <div style={{ color: "#888", fontSize: 12, marginTop: 8 }}>
              Contenido pendiente...
            </div>
          </div>
        )}
      </div>

      {/* Lock combination modal */}
      {showLockModal && !unlocked && (
        <div
          onClick={() => { setShowLockModal(false); setCode(""); setError(false); }}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.85)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 9999, padding: 20,
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "linear-gradient(180deg, #1a1510 0%, #0a0805 100%)",
              border: "2px solid #5a4a20",
              borderRadius: 8,
              padding: "32px 36px",
              minWidth: 320,
              boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
              animation: error ? "shake 0.4s" : "none",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🔒</div>
              <div style={{ color: "#e8d8a8", fontSize: 16, fontWeight: 700, letterSpacing: 1 }}>
                CODIGO DE COMBINACION
              </div>
              <div style={{ color: "#7a6a4a", fontSize: 11, marginTop: 4 }}>
                Introduce los 4 digitos
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                inputMode="numeric"
                value={code}
                onChange={e => setCode(e.target.value.replace(/\D/g, "").slice(0, 4))}
                autoFocus
                placeholder="• • • •"
                style={{
                  width: "100%",
                  padding: "14px",
                  background: "#0a0805",
                  border: `2px solid ${error ? "#ef4444" : "#3a2a10"}`,
                  borderRadius: 6,
                  color: error ? "#ef4444" : "#e8d8a8",
                  fontSize: 28,
                  textAlign: "center",
                  letterSpacing: 12,
                  fontFamily: "monospace",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              {error && (
                <div style={{ color: "#ef4444", fontSize: 11, textAlign: "center", marginTop: 8, fontFamily: "Arial,sans-serif" }}>
                  Codigo incorrecto
                </div>
              )}
              <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                <button
                  type="button"
                  onClick={() => { setShowLockModal(false); setCode(""); setError(false); }}
                  style={{
                    flex: 1, padding: "10px",
                    background: "transparent",
                    border: "1px solid #3a2a10",
                    borderRadius: 4,
                    color: "#7a6a4a",
                    fontSize: 12, cursor: "pointer",
                    fontFamily: "Arial,sans-serif", letterSpacing: 1,
                  }}
                >
                  CANCELAR
                </button>
                <button
                  type="submit"
                  disabled={code.length !== 4}
                  style={{
                    flex: 1, padding: "10px",
                    background: code.length === 4 ? "#c8a020" : "#3a2a10",
                    border: "none",
                    borderRadius: 4,
                    color: code.length === 4 ? "#0a0805" : "#5a4a20",
                    fontSize: 12, fontWeight: 700, cursor: code.length === 4 ? "pointer" : "not-allowed",
                    fontFamily: "Arial,sans-serif", letterSpacing: 1,
                  }}
                >
                  ABRIR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
