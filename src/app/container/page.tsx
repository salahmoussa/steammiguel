"use client";

import { useState, useEffect } from "react";

const VALID_CODE = [2, 3, 8, 4];

export default function ContainerPage() {
  const [wheels, setWheels] = useState([0, 0, 0, 0]);
  const [unlocked, setUnlocked] = useState(false);
  const [shake, setShake] = useState(false);

  function changeWheel(idx: number, delta: number) {
    if (unlocked) return;
    setWheels(prev => {
      const next = [...prev];
      next[idx] = (next[idx] + delta + 10) % 10;
      return next;
    });
  }

  // Auto-check when wheels change
  useEffect(() => {
    if (wheels.every((w, i) => w === VALID_CODE[i])) {
      setTimeout(() => setUnlocked(true), 400);
    }
  }, [wheels]);

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

        {/* PADLOCK with rotating wheels */}
        {!unlocked && (
          <div
            style={{
              position: "absolute", top: "50%", left: "50%",
              transform: `translate(-50%, calc(-50% + 6px))${shake ? "" : ""}`,
              zIndex: 5,
              animation: shake ? "shake 0.4s" : "none",
            }}
          >
            {/* Shackle (the U-shape on top) */}
            <div style={{
              width: 90, height: 38,
              border: "8px solid #b0b0b0",
              borderBottom: "none",
              borderRadius: "44px 44px 0 0",
              background: "transparent",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.5)",
              marginLeft: 24,
              position: "relative",
            }}>
              <div style={{
                position: "absolute", top: 6, left: 4, right: 4, height: 4,
                background: "linear-gradient(180deg, rgba(255,255,255,0.4), transparent)",
                borderRadius: "44px 44px 0 0",
              }} />
            </div>
            {/* Body with wheels */}
            <div style={{
              width: 140, height: 110,
              background: "linear-gradient(180deg, #fbbc04 0%, #f59e0b 50%, #c87810 100%)",
              borderRadius: 8,
              border: "2px solid #8a5a08",
              boxShadow: "0 8px 24px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.3)",
              position: "relative",
              marginTop: -2,
              padding: "14px 10px 10px",
            }}>
              {/* Brand */}
              <div style={{
                textAlign: "center", fontSize: 8, color: "#6a4a08",
                fontWeight: 900, letterSpacing: 1, marginBottom: 6,
              }}>
                MASTER LOCK
              </div>

              {/* 4 rotating wheels */}
              <div style={{
                display: "flex", gap: 6, justifyContent: "center",
                background: "#0a0805",
                padding: "6px 8px",
                borderRadius: 4,
                border: "1px solid #4a3008",
                boxShadow: "inset 0 2px 6px rgba(0,0,0,0.8)",
              }}>
                {wheels.map((w, idx) => (
                  <div key={idx} style={{
                    width: 22, height: 50,
                    background: "linear-gradient(180deg, #1a1a1a 0%, #3a3a3a 8%, #fff 35%, #fff 65%, #3a3a3a 92%, #1a1a1a 100%)",
                    borderRadius: 2,
                    border: "1px solid #2a2a2a",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: "inset 0 0 4px rgba(0,0,0,0.5)",
                  }}>
                    {/* Up arrow zone */}
                    <div
                      onClick={() => changeWheel(idx, -1)}
                      style={{
                        position: "absolute", top: 0, left: 0, right: 0, height: "30%",
                        cursor: "pointer", zIndex: 2,
                      }}
                    >
                      <div style={{
                        position: "absolute", top: 2, left: "50%", transform: "translateX(-50%)",
                        fontSize: 8, color: "rgba(0,0,0,0.4)",
                      }}>▲</div>
                    </div>
                    {/* Down arrow zone */}
                    <div
                      onClick={() => changeWheel(idx, 1)}
                      style={{
                        position: "absolute", bottom: 0, left: 0, right: 0, height: "30%",
                        cursor: "pointer", zIndex: 2,
                      }}
                    >
                      <div style={{
                        position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)",
                        fontSize: 8, color: "rgba(0,0,0,0.4)",
                      }}>▼</div>
                    </div>

                    {/* Number column - shows prev, current, next */}
                    <div style={{
                      position: "absolute", inset: 0,
                      display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center",
                      fontFamily: "'Courier New', monospace",
                      fontWeight: 900,
                    }}>
                      <div style={{ fontSize: 9, color: "rgba(0,0,0,0.3)", lineHeight: 1, marginBottom: 1 }}>
                        {(w + 9) % 10}
                      </div>
                      <div style={{
                        fontSize: 18, color: "#0a0805", lineHeight: 1,
                        textShadow: "0 1px 0 rgba(255,255,255,0.5)",
                      }}>
                        {w}
                      </div>
                      <div style={{ fontSize: 9, color: "rgba(0,0,0,0.3)", lineHeight: 1, marginTop: 1 }}>
                        {(w + 1) % 10}
                      </div>
                    </div>

                    {/* Center indicator notch */}
                    <div style={{
                      position: "absolute", top: "50%", left: -2, transform: "translateY(-50%)",
                      width: 0, height: 0,
                      borderTop: "3px solid transparent",
                      borderBottom: "3px solid transparent",
                      borderLeft: "3px solid #c8a020",
                      pointerEvents: "none",
                    }} />
                    <div style={{
                      position: "absolute", top: "50%", right: -2, transform: "translateY(-50%)",
                      width: 0, height: 0,
                      borderTop: "3px solid transparent",
                      borderBottom: "3px solid transparent",
                      borderRight: "3px solid #c8a020",
                      pointerEvents: "none",
                    }} />
                  </div>
                ))}
              </div>
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
    </div>
  );
}
