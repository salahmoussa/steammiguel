"use client";

import { useState, useEffect } from "react";

const VALID_CODE = [2, 3, 8, 4];

export default function ContainerPage() {
  const [wheels, setWheels] = useState([0, 0, 0, 0]);
  const [unlocked, setUnlocked] = useState(false);
  const [shake, setShake] = useState(false);
  const [showNotebook, setShowNotebook] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

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

        {/* Unlocked state - dim the doors and show contents */}
        {unlocked && (
          <>
            {/* Dark overlay over the container doors */}
            <div style={{
              position: "absolute", inset: 0,
              background: "rgba(0,0,0,0.65)",
              animation: "fadeIn 0.6s ease-out",
              pointerEvents: "none",
            }}/>

            {/* Container interior label */}
            <div style={{
              position: "absolute", top: 40, left: "50%", transform: "translateX(-50%)",
              fontSize: 11, color: "#22c55e", letterSpacing: 3, fontFamily: "Arial,sans-serif",
              fontWeight: 700,
              animation: "fadeIn 0.8s ease-out",
              zIndex: 5,
            }}>
              CONTAINER ABIERTO · INVENTARIO
            </div>

            {/* Items inside the container */}
            <div style={{
              position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
              display: "flex", gap: 60, alignItems: "center", justifyContent: "center",
              zIndex: 5,
              animation: "fadeIn 1s ease-out",
            }}>

              {/* Notebook */}
              <div
                onClick={() => setShowNotebook(true)}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
              >
                {/* Leather notebook */}
                <div style={{
                  width: 110, height: 140,
                  background: "linear-gradient(135deg, #5a3a1a 0%, #4a2e10 50%, #3a2208 100%)",
                  borderRadius: "3px 8px 8px 3px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1), inset 2px 0 0 rgba(0,0,0,0.5)",
                  position: "relative",
                  border: "1px solid #2a1808",
                }}>
                  {/* Spine */}
                  <div style={{
                    position: "absolute", left: 0, top: 0, bottom: 0, width: 6,
                    background: "linear-gradient(90deg, #2a1808, #3a2208)",
                    borderRadius: "3px 0 0 3px",
                  }}/>
                  {/* Elastic band */}
                  <div style={{
                    position: "absolute", right: -2, top: 0, bottom: 0, width: 5,
                    background: "linear-gradient(90deg, #1a1a1a, #3a3a3a)",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.5)",
                  }}/>
                  {/* Embossed text */}
                  <div style={{
                    position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%) rotate(-90deg)",
                    fontSize: 9, color: "rgba(200,170,100,0.4)",
                    fontFamily: "'Times New Roman',serif", letterSpacing: 2, fontWeight: 700,
                    whiteSpace: "nowrap",
                  }}>
                    NOTAS
                  </div>
                  {/* Worn edges */}
                  <div style={{
                    position: "absolute", top: 4, right: 4, width: 12, height: 12,
                    background: "radial-gradient(circle, rgba(80,50,20,0.6) 0%, transparent 70%)",
                  }}/>
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: "Arial,sans-serif", letterSpacing: 0.5 }}>
                  Libreta
                </div>
              </div>

              {/* Police ID */}
              <div
                onClick={() => setShowBadge(true)}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
              >
                {/* ID card */}
                <div style={{
                  width: 130, height: 90,
                  background: "linear-gradient(135deg, #1a3a6a 0%, #0e2240 100%)",
                  borderRadius: 6,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.15)",
                  border: "1px solid #0a1a30",
                  position: "relative",
                  padding: 8,
                  fontFamily: "Arial,sans-serif",
                }}>
                  {/* Header bar */}
                  <div style={{
                    background: "rgba(0,0,0,0.4)",
                    padding: "2px 6px", borderRadius: 2,
                    fontSize: 7, color: "#c8a020", fontWeight: 900, letterSpacing: 0.5,
                    textAlign: "center",
                  }}>
                    LSPD · OFFICIAL
                  </div>
                  {/* Photo placeholder */}
                  <div style={{
                    width: 36, height: 44,
                    background: "linear-gradient(135deg, #4a5a6a, #2a3a4a)",
                    border: "1px solid #c8a020",
                    margin: "6px 0",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, color: "rgba(255,255,255,0.4)",
                  }}>👤</div>
                  {/* Lines */}
                  <div style={{
                    position: "absolute", top: 28, left: 50, right: 8,
                    fontSize: 6, color: "#aac4e0", lineHeight: 1.6,
                  }}>
                    <div style={{ color: "#c8a020" }}>NAME</div>
                    <div style={{ background: "rgba(255,255,255,0.15)", height: 5, marginBottom: 3 }}/>
                    <div style={{ color: "#c8a020" }}>BADGE #</div>
                    <div style={{ background: "rgba(255,255,255,0.15)", height: 5, marginBottom: 3 }}/>
                    <div style={{ color: "#c8a020" }}>DEPT</div>
                    <div style={{ background: "rgba(255,255,255,0.15)", height: 5 }}/>
                  </div>
                  {/* Bottom strip */}
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, height: 4,
                    background: "linear-gradient(90deg, #c8a020 0%, #8a6a08 100%)",
                  }}/>
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: "Arial,sans-serif", letterSpacing: 0.5 }}>
                  Identificacion
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Notebook modal */}
      {showNotebook && (
        <div
          onClick={() => setShowNotebook(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.92)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 9999, padding: 20,
            animation: "fadeIn 0.3s ease-out",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              backgroundColor: "#faf5e8",
              backgroundImage: "repeating-linear-gradient(180deg, transparent 0px, transparent 28px, rgba(60,80,140,0.18) 28px, rgba(60,80,140,0.18) 29px), linear-gradient(180deg, #faf5e8 0%, #f3ecd8 50%, #ebe2c8 100%)",
              padding: "40px 50px 50px 70px",
              width: 540,
              maxWidth: "94vw",
              maxHeight: "92vh",
              overflowY: "auto",
              boxShadow: "0 20px 60px rgba(0,0,0,0.9), inset 0 0 80px rgba(139,119,80,0.1)",
              position: "relative",
              fontFamily: "'Segoe Script','Comic Sans MS','Bradley Hand',cursive",
              color: "#1a1a2e",
              transform: "rotate(-0.4deg)",
            }}
          >
            {/* Spiral binding holes (left) */}
            <div style={{ position: "absolute", left: 14, top: 0, bottom: 0, display: "flex", flexDirection: "column", justifyContent: "space-around", paddingTop: 30, paddingBottom: 30 }}>
              {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#c8b890", border: "1px solid #a89868" }}/>
              ))}
            </div>

            {/* Red margin line */}
            <div style={{ position: "absolute", left: 50, top: 0, bottom: 0, width: 1, background: "rgba(200,60,60,0.25)", pointerEvents: "none" }}/>

            {/* Stains */}
            <div style={{ position: "absolute", top: 30, right: 30, width: 70, height: 60, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(139,110,60,0.1) 0%, transparent 70%)", pointerEvents: "none" }}/>
            <div style={{ position: "absolute", bottom: 60, left: 80, width: 50, height: 40, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(100,90,60,0.08) 0%, transparent 70%)", pointerEvents: "none" }}/>

            {/* Date header */}
            <div style={{ marginBottom: 18, fontSize: 13, color: "#5a5a7a", fontStyle: "italic" }}>
              5 de junio
            </div>

            {/* Content */}
            <div style={{ fontSize: 15, lineHeight: 1.85, textAlign: "justify" }}>
              <p style={{ marginBottom: 14 }}>
                Ayer fue un dia raro. No conseguia concentrarme en nada. Solo pensaba en cosas que ya no tienen vuelta atras.
              </p>
              <p style={{ marginBottom: 14 }}>
                Fui a comprar algo de comer al 24/7 de la esquina. El tipo del mostrador me miro raro. O eso me parecio. Lo mismo me lo estoy inventando todo.
              </p>
              <p style={{ marginBottom: 14 }}>
                Tengo la sensacion de que cada dia que pasa estoy mas cerca del final. No de manera dramatica, simplemente lo siento. Como cuando notas que algo malo va a ocurrir y no sabes el que.
              </p>
              <p style={{ marginBottom: 14 }}>
                Esta noche me acorde de mi madre. De cuando vivia con ella en la casa pequeña. Hace tantisimo tiempo de aquello que ya no se si lo recuerdo o me lo invento.
              </p>
              <p style={{ marginBottom: 22 }}>
                Recuerdo que de niño me daban miedo los pasillos largos. Sigo igual.
              </p>

              <p style={{ marginBottom: 14 }}>
                He vuelto a tener el sueño raro. El de la habitacion sin ventanas. Esta vez habia alguien sentado al fondo, y cuando me giraba para mirarlo me despertaba con un sobresalto genera<span style={{ fontWeight: 700 }}>L</span>.
              </p>
              <p style={{ marginBottom: 14 }}>
                Me he pasado toda la mañana mirando por la mirilla de la puerta. No habia nadie pero sentia que s<span style={{ fontWeight: 700 }}>I</span>.
              </p>
              <p style={{ marginBottom: 14 }}>
                He pasado por delante del club de golf donde solia ir antes de meterme en este lio. Sigue cerrado. Las pistas vacias, las banderas tiradas en el cesped. Ya no juega nadie al gol<span style={{ fontWeight: 700 }}>F</span>.
              </p>
              <p style={{ marginBottom: 18 }}>
                Manana intentare salir un rato. Aunque sea hasta el portal. Necesito airearme antes de que vuelva la noch<span style={{ fontWeight: 700 }}>E</span>.
              </p>
            </div>

            {/* Bottom signature */}
            <div style={{ textAlign: "right", marginTop: 10, fontSize: 14, color: "#5a5a7a", fontStyle: "italic" }}>
              — W.
            </div>
          </div>
        </div>
      )}

      {/* Police badge modal */}
      {showBadge && (
        <div
          onClick={() => setShowBadge(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.92)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 9999, padding: 20,
            animation: "fadeIn 0.3s ease-out",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: 380, height: 240,
              background: "linear-gradient(135deg, #1a3a6a 0%, #0e2240 100%)",
              borderRadius: 12,
              boxShadow: "0 20px 60px rgba(0,0,0,0.9), inset 0 2px 4px rgba(255,255,255,0.15)",
              border: "1px solid #c8a020",
              padding: "20px 24px",
              fontFamily: "Arial,sans-serif",
              color: "#fff",
              position: "relative",
            }}
          >
            {/* Header */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              borderBottom: "1px solid rgba(200,160,32,0.4)", paddingBottom: 8, marginBottom: 12,
            }}>
              <div>
                <div style={{ fontSize: 8, color: "#c8a020", letterSpacing: 1.5, fontWeight: 700 }}>
                  LOS SANTOS POLICE DEPARTMENT
                </div>
                <div style={{ fontSize: 6, color: "#aac4e0", letterSpacing: 1 }}>
                  OFFICIAL IDENTIFICATION CARD
                </div>
              </div>
              {/* LSPD badge icon */}
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: "radial-gradient(circle, #c8a020 30%, #8a6a08 70%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#0e2240", fontSize: 12, fontWeight: 900,
                border: "1px solid #c8a020",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4)",
              }}>★</div>
            </div>

            {/* Body */}
            <div style={{ display: "flex", gap: 14 }}>
              {/* Photo */}
              <div style={{
                width: 80, height: 100,
                background: "linear-gradient(135deg, #4a5a6a, #2a3a4a)",
                border: "2px solid #c8a020",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 36, color: "rgba(255,255,255,0.4)",
                flexShrink: 0,
              }}>👤</div>

              {/* Data */}
              <div style={{ flex: 1, fontSize: 10, lineHeight: 1.7 }}>
                <Field label="NOMBRE" value="JAMES R. WHITFIELD" />
                <Field label="PLACA #" value="4471" mono />
                <Field label="RANGO" value="DETECTIVE" />
                <Field label="DIVISION" value="CRIMEN ORGANIZADO" />
                <Field label="EXPEDICION" value="12/08/2013" mono />
                <Field label="CADUCIDAD" value="12/08/2018" mono />
              </div>
            </div>

            {/* Bottom strip */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: 8,
              background: "linear-gradient(90deg, #c8a020 0%, #8a6a08 50%, #c8a020 100%)",
              borderRadius: "0 0 12px 12px",
            }}/>

            {/* Watermark */}
            <div style={{
              position: "absolute", top: "50%", right: 30, transform: "translateY(-50%) rotate(-15deg)",
              fontSize: 32, color: "rgba(200,160,32,0.06)", fontWeight: 900,
              pointerEvents: "none",
            }}>LSPD</div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 6, marginBottom: 1 }}>
      <span style={{ color: "#c8a020", width: 70, flexShrink: 0, fontSize: 8, fontWeight: 700 }}>{label}</span>
      <span style={{ color: "#fff", fontFamily: mono ? "monospace" : "Arial,sans-serif" }}>{value}</span>
    </div>
  );
}
