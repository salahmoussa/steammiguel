"use client";

import { useState, useEffect, useCallback } from "react";

type PhoneState = "off" | "nobattery" | "charging" | "charged" | "lockscreen" | "home" | "photos";

const CORRECT_PIN = "1051";
const CACHE_KEY = "sm_phone_charged";
const CHARGER_KEY = "sm_charger_found";
const PAPER_KEY = "sm_paper_read";

const APPS = [
  { id: "phone", name: "Telefono", icon: "📞", color: "#22c55e" },
  { id: "messages", name: "Mensajes", icon: "💬", color: "#3b82f6" },
  { id: "camera", name: "Camara", icon: "📷", color: "#6b7280" },
  { id: "photos", name: "Fotos", icon: "🖼️", color: "#f59e0b", action: true },
  { id: "maps", name: "Mapas", icon: "🗺️", color: "#10b981" },
  { id: "weather", name: "Tiempo", icon: "⛅", color: "#06b6d4" },
  { id: "notes", name: "Notas", icon: "📝", color: "#eab308" },
  { id: "calculator", name: "Calc", icon: "🔢", color: "#8b5cf6" },
  { id: "clock", name: "Reloj", icon: "🕐", color: "#f43f5e" },
  { id: "settings", name: "Ajustes", icon: "⚙️", color: "#6b7280" },
  { id: "browser", name: "Internet", icon: "🌐", color: "#2563eb" },
  { id: "music", name: "Musica", icon: "🎵", color: "#ec4899" },
];

const PHOTOS = [
  { id: "p1", placeholder: true },
  { id: "p2", placeholder: true },
  { id: "p3", placeholder: true },
  { id: "p4", placeholder: true },
  { id: "p5", placeholder: true },
  { id: "p6", placeholder: true },
];

export function Phone({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [state, setState] = useState<PhoneState>("off");
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [chargePercent, setChargePercent] = useState(0);
  const [showAppError, setShowAppError] = useState<string | null>(null);
  const [bootAnim, setBootAnim] = useState(false);
  const [hasCharger, setHasCharger] = useState(false);
  const [hasPaper, setHasPaper] = useState(false);
  const [showSubconscious, setShowSubconscious] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached === "true") setState("lockscreen");
      setHasCharger(localStorage.getItem(CHARGER_KEY) === "true");
      setHasPaper(localStorage.getItem(PAPER_KEY) === "true");
    }
    // Poll for changes from the toolbox
    const interval = setInterval(() => {
      if (typeof window !== "undefined") {
        setHasCharger(localStorage.getItem(CHARGER_KEY) === "true");
        setHasPaper(localStorage.getItem(PAPER_KEY) === "true");
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Charging animation
  useEffect(() => {
    if (state !== "charging") return;
    setChargePercent(0);
    const interval = setInterval(() => {
      setChargePercent(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          localStorage.setItem(CACHE_KEY, "true");
          setTimeout(() => setState("charged"), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [state]);

  // After charged, go to lockscreen
  useEffect(() => {
    if (state === "charged") {
      setTimeout(() => setState("lockscreen"), 800);
    }
  }, [state]);

  const handlePinPress = useCallback((digit: string) => {
    setPinError(false);
    const paperRead = localStorage.getItem(PAPER_KEY) === "true";
    const newPin = pin + digit;
    if (newPin.length <= 4) {
      setPin(newPin);
      if (newPin.length === 4) {
        if (!paperRead) {
          // Haven't read the paper yet — subconscious block
          setShowSubconscious(true);
          setTimeout(() => { setPin(""); setShowSubconscious(false); }, 2500);
        } else if (newPin === CORRECT_PIN) {
          setBootAnim(true);
          setTimeout(() => {
            setState("home");
            setBootAnim(false);
          }, 600);
        } else {
          setPinError(true);
          setTimeout(() => { setPin(""); setPinError(false); }, 800);
        }
      }
    }
  }, [pin]);

  const handlePinDelete = useCallback(() => {
    setPin(prev => prev.slice(0, -1));
    setPinError(false);
  }, []);

  const handleAppClick = useCallback((appId: string) => {
    if (appId === "photos") {
      setState("photos");
    } else {
      setShowAppError(appId);
      setTimeout(() => setShowAppError(null), 1500);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "fadeIn 0.2s ease-out",
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }
        @keyframes bootFlash { 0%{opacity:0} 50%{opacity:1} 100%{opacity:0} }
        @keyframes pulseCharge { 0%,100%{opacity:0.6} 50%{opacity:1} }
      `}</style>

      {/* Phone frame */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: 280, height: 560,
          background: "#111",
          borderRadius: 32,
          border: "3px solid #333",
          boxShadow: "0 10px 50px rgba(0,0,0,0.8), inset 0 0 1px rgba(255,255,255,0.1)",
          position: "relative",
          overflow: "hidden",
          display: "flex", flexDirection: "column",
        }}
      >
        {/* Notch */}
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: 100, height: 24, background: "#111", borderRadius: "0 0 16px 16px", zIndex: 50,
        }}>
          <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 8, height: 8, borderRadius: "50%", background: "#222", border: "1px solid #333" }} />
        </div>

        {/* Screen area */}
        <div style={{
          flex: 1, margin: 8, borderRadius: 24, overflow: "hidden",
          background: "#000", position: "relative",
        }}>

          {/* === OFF STATE === */}
          {state === "off" && (
            <div
              onClick={() => setState("nobattery")}
              style={{
                width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <div style={{ color: "#333", fontSize: 12, fontFamily: "Arial,sans-serif" }}>Toca la pantalla</div>
            </div>
          )}

          {/* === NO BATTERY === */}
          {state === "nobattery" && (
            <div style={{
              width: "100%", height: "100%", display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 16,
            }}>
              {/* Battery icon empty */}
              <div style={{ position: "relative", width: 48, height: 80 }}>
                <div style={{
                  width: 48, height: 72, border: "3px solid #ef4444", borderRadius: 6,
                  position: "absolute", bottom: 0,
                }} />
                <div style={{
                  position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                  width: 20, height: 10, background: "#ef4444", borderRadius: "3px 3px 0 0",
                }} />
                {/* X mark */}
                <div style={{ position: "absolute", top: 30, left: "50%", transform: "translateX(-50%)", fontSize: 20, color: "#ef4444", fontWeight: "bold" }}>✕</div>
              </div>
              <div style={{ color: "#ef4444", fontSize: 13, fontFamily: "Arial,sans-serif" }}>Sin bateria</div>
              {hasCharger ? (
                <button
                  onClick={() => setState("charging")}
                  style={{
                    marginTop: 8, padding: "10px 24px",
                    background: "linear-gradient(135deg, #22c55e, #16a34a)",
                    border: "none", borderRadius: 20, color: "#fff",
                    fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Arial,sans-serif",
                  }}
                >
                  🔌 Cargar movil
                </button>
              ) : (
                <div style={{ marginTop: 12, textAlign: "center" }}>
                  <div style={{
                    padding: "10px 24px", background: "#222", border: "1px solid #333",
                    borderRadius: 20, color: "#666", fontSize: 12, fontFamily: "Arial,sans-serif",
                  }}>
                    🔌 Necesito un cargador...
                  </div>
                  <div style={{ marginTop: 10, fontSize: 11, color: "#555", fontStyle: "italic", fontFamily: "Arial,sans-serif", lineHeight: 1.5 }}>
                    A lo mejor esta en la caja de herramientas
                  </div>
                </div>
              )}
            </div>
          )}

          {/* === CHARGING === */}
          {(state === "charging" || state === "charged") && (
            <div style={{
              width: "100%", height: "100%", display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 12,
            }}>
              <div style={{ position: "relative", width: 48, height: 80 }}>
                <div style={{
                  width: 48, height: 72, border: "3px solid #22c55e", borderRadius: 6,
                  position: "absolute", bottom: 0, overflow: "hidden",
                }}>
                  {/* Fill level */}
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    height: `${chargePercent}%`,
                    background: "linear-gradient(180deg, #4ade80, #22c55e)",
                    transition: "height 0.1s linear",
                  }} />
                </div>
                <div style={{
                  position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                  width: 20, height: 10, background: "#22c55e", borderRadius: "3px 3px 0 0",
                }} />
                {/* Lightning bolt */}
                <div style={{
                  position: "absolute", top: 28, left: "50%", transform: "translateX(-50%)",
                  fontSize: 18, color: "#fff", zIndex: 2,
                  animation: "pulseCharge 1.5s ease-in-out infinite",
                }}>⚡</div>
              </div>
              <div style={{ color: "#22c55e", fontSize: 24, fontFamily: "monospace", fontWeight: "bold" }}>
                {chargePercent}%
              </div>
              <div style={{ color: "#666", fontSize: 11, fontFamily: "Arial,sans-serif" }}>
                {state === "charged" ? "Carga completa" : "Cargando..."}
              </div>
            </div>
          )}

          {/* === LOCK SCREEN === */}
          {state === "lockscreen" && (
            <div style={{
              width: "100%", height: "100%",
              background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
              display: "flex", flexDirection: "column", alignItems: "center",
              paddingTop: 50,
            }}>
              {/* Time */}
              <div style={{ fontSize: 48, fontWeight: 200, color: "#fff", fontFamily: "Arial,sans-serif", letterSpacing: -2 }}>
                {new Date().getHours().toString().padStart(2,"0")}:{new Date().getMinutes().toString().padStart(2,"0")}
              </div>
              <div style={{ fontSize: 13, color: "#94a3b8", fontFamily: "Arial,sans-serif", marginTop: 4 }}>
                Introduce el codigo
              </div>

              {/* PIN dots */}
              <div style={{ display: "flex", gap: 14, marginTop: 28, animation: pinError ? "shake 0.3s" : "none" }}>
                {[0,1,2,3].map(i => (
                  <div key={i} style={{
                    width: 14, height: 14, borderRadius: "50%",
                    background: i < pin.length ? (pinError ? "#ef4444" : "#fff") : "transparent",
                    border: `2px solid ${pinError ? "#ef4444" : i < pin.length ? "#fff" : "#475569"}`,
                    transition: "all 0.15s",
                  }} />
                ))}
              </div>

              {/* Numpad */}
              <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, width: 210 }}>
                {[1,2,3,4,5,6,7,8,9].map(n => (
                  <button key={n} onClick={() => handlePinPress(n.toString())} style={{
                    width: 60, height: 60, borderRadius: "50%",
                    background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
                    color: "#fff", fontSize: 24, fontWeight: 300, cursor: "pointer",
                    fontFamily: "Arial,sans-serif", display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.15s",
                  }}
                  onMouseDown={e => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
                  onMouseUp={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                  >
                    {n}
                  </button>
                ))}
                <div />
                <button onClick={() => handlePinPress("0")} style={{
                  width: 60, height: 60, borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
                  color: "#fff", fontSize: 24, fontWeight: 300, cursor: "pointer",
                  fontFamily: "Arial,sans-serif", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  0
                </button>
                <button onClick={handlePinDelete} style={{
                  width: 60, height: 60, borderRadius: "50%",
                  background: "transparent", border: "none",
                  color: "#94a3b8", fontSize: 14, cursor: "pointer",
                  fontFamily: "Arial,sans-serif", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  Borrar
                </button>
              </div>

              {/* Subconscious modal */}
              {showSubconscious && (
                <div style={{
                  position: "absolute", inset: 0, background: "rgba(0,0,0,0.9)", zIndex: 20,
                  display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
                }}>
                  <div style={{
                    fontSize: 14, color: "#94a3b8", fontFamily: "Arial,sans-serif",
                    textAlign: "center", lineHeight: 1.8, fontStyle: "italic",
                  }}>
                    <div style={{ color: "#22c55e", fontSize: 12, marginBottom: 8, fontStyle: "normal", letterSpacing: 2 }}>/subconsciente</div>
                    Esto no me va a llevar a ningun lado, de momento...
                  </div>
                </div>
              )}

              {/* Boot animation overlay */}
              {bootAnim && (
                <div style={{
                  position: "absolute", inset: 0, background: "#000", zIndex: 10,
                  animation: "bootFlash 0.6s ease-out",
                }} />
              )}
            </div>
          )}

          {/* === HOME SCREEN === */}
          {state === "home" && (
            <div style={{
              width: "100%", height: "100%",
              background: "linear-gradient(180deg, #0c0a20 0%, #1a1040 50%, #0c0a20 100%)",
              padding: "36px 14px 20px",
              display: "flex", flexDirection: "column",
            }}>
              {/* Status bar */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 6px", marginBottom: 16 }}>
                <span style={{ fontSize: 11, color: "#94a3b8", fontFamily: "Arial,sans-serif" }}>iFruit</span>
                <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                  <span style={{ fontSize: 10, color: "#94a3b8" }}>4G</span>
                  <span style={{ fontSize: 10, color: "#22c55e" }}>100%</span>
                  <span style={{ fontSize: 11 }}>🔋</span>
                </div>
              </div>

              {/* App grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, flex: 1, alignContent: "start" }}>
                {APPS.map(app => (
                  <div
                    key={app.id}
                    onClick={() => handleAppClick(app.id)}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }}
                  >
                    <div style={{
                      width: 48, height: 48, borderRadius: 12,
                      background: `linear-gradient(135deg, ${app.color}40, ${app.color}20)`,
                      border: `1px solid ${app.color}30`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 22, transition: "transform 0.15s",
                      position: "relative",
                    }}
                    onMouseDown={e => (e.currentTarget.style.transform = "scale(0.9)")}
                    onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      {app.icon}
                      {/* Notification dot on photos */}
                      {app.id === "photos" && (
                        <div style={{
                          position: "absolute", top: -3, right: -3,
                          width: 16, height: 16, borderRadius: "50%",
                          background: "#ef4444", border: "2px solid #0c0a20",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 9, color: "#fff", fontWeight: "bold",
                        }}>6</div>
                      )}
                    </div>
                    <span style={{ fontSize: 9, color: "#94a3b8", fontFamily: "Arial,sans-serif", textAlign: "center" }}>
                      {app.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Dock */}
              <div style={{
                display: "flex", justifyContent: "center", gap: 20, padding: "10px 0",
                borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: "auto",
              }}>
                {["📞","💬","📷","🎵"].map((icon, i) => (
                  <div key={i} onClick={() => setShowAppError("dock")} style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20, cursor: "pointer",
                  }}>{icon}</div>
                ))}
              </div>

              {/* App error toast */}
              {showAppError && (
                <div style={{
                  position: "absolute", bottom: 80, left: "50%", transform: "translateX(-50%)",
                  background: "rgba(30,30,30,0.95)", border: "1px solid #333",
                  borderRadius: 10, padding: "8px 16px",
                  fontSize: 11, color: "#999", fontFamily: "Arial,sans-serif",
                  whiteSpace: "nowrap",
                }}>
                  Memoria insuficiente (RAM al 98%)
                </div>
              )}
            </div>
          )}

          {/* === PHOTOS === */}
          {state === "photos" && (
            <div style={{
              width: "100%", height: "100%",
              background: "#0a0a0a",
              display: "flex", flexDirection: "column",
            }}>
              {/* Header */}
              <div style={{
                padding: "36px 14px 10px", display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <button
                  onClick={() => setState("home")}
                  style={{ background: "none", border: "none", color: "#3b82f6", fontSize: 13, cursor: "pointer", fontFamily: "Arial,sans-serif" }}
                >
                  ← Atras
                </button>
                <span style={{ fontSize: 14, color: "#fff", fontWeight: 600, fontFamily: "Arial,sans-serif" }}>Fotos</span>
                <div style={{ width: 40 }} />
              </div>

              {/* Photos grid */}
              <div style={{ padding: "8px 10px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3, flex: 1, alignContent: "start" }}>
                {PHOTOS.map((photo) => (
                  <div
                    key={photo.id}
                    style={{
                      aspectRatio: "1", background: "#1a1a1a", borderRadius: 4,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ fontSize: 24, opacity: 0.3 }}>📷</span>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: "center", padding: "10px 0", fontSize: 11, color: "#555", fontFamily: "Arial,sans-serif" }}>
                6 fotos
              </div>
            </div>
          )}

        </div>

        {/* Home button */}
        <div style={{
          height: 24, display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: 6,
        }}>
          <div
            onClick={() => { if (state === "photos") setState("home"); }}
            style={{
              width: 100, height: 4, borderRadius: 2, background: "#444",
              cursor: state === "photos" ? "pointer" : "default",
            }}
          />
        </div>
      </div>
    </div>
  );
}
