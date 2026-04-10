"use client";

import { useState, useEffect, useCallback } from "react";

type PhoneState = "off" | "nobattery" | "charging" | "charged" | "lockscreen" | "home" | "photos" | "notes" | "browser";

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
  { id: "notes", name: "Notas", icon: "📝", color: "#eab308", action: true },
  { id: "calculator", name: "Calc", icon: "🔢", color: "#8b5cf6" },
  { id: "clock", name: "Reloj", icon: "🕐", color: "#f43f5e" },
  { id: "settings", name: "Ajustes", icon: "⚙️", color: "#6b7280" },
  { id: "browser", name: "Internet", icon: "🌐", color: "#2563eb", action: true },
  { id: "music", name: "Musica", icon: "🎵", color: "#ec4899" },
];

const PHOTOS = [
  { id: "p1", placeholder: false, src: "/photos/foto1.png" },
];

export function Phone({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [state, setState] = useState<PhoneState>(() => {
    if (typeof window !== "undefined" && localStorage.getItem(CACHE_KEY) === "true") return "lockscreen";
    return "off";
  });
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [chargePercent, setChargePercent] = useState(0);
  const [showAppError, setShowAppError] = useState<string | null>(null);
  const [bootAnim, setBootAnim] = useState(false);
  const [hasCharger, setHasCharger] = useState(false);
  const [hasPaper, setHasPaper] = useState(false);
  const [showSubconscious, setShowSubconscious] = useState(false);
  const [subconsciousMsg, setSubconsciousMsg] = useState("");
  const [noteAnswers, setNoteAnswers] = useState(["", "", "", "", ""]);
  const [viewingPhoto, setViewingPhoto] = useState<string | null>(null);
  const [photosViewed, setPhotosViewed] = useState(false);
  const [showNotesBlock, setShowNotesBlock] = useState(false);
  const [browserSearchFocused, setBrowserSearchFocused] = useState(false);
  const [browserQuery, setBrowserQuery] = useState("");

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
          setSubconsciousMsg("No se la clave... deberia buscar mejor en la caja de herramientas, seguro que me dejo algo.");
          setShowSubconscious(true);
          setTimeout(() => { setPin(""); setShowSubconscious(false); }, 2500);
        } else if (newPin === CORRECT_PIN) {
          setBootAnim(true);
          setTimeout(() => {
            setState("home");
            setBootAnim(false);
          }, 600);
        } else {
          setSubconsciousMsg("A lo mejor esos numeros no son la clave del movil, que podria ser?");
          setShowSubconscious(true);
          setTimeout(() => { setPin(""); setShowSubconscious(false); }, 2500);
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
      setPhotosViewed(true);
      setState("photos");
    } else if (appId === "notes") {
      if (!photosViewed) {
        setShowNotesBlock(true);
        setTimeout(() => setShowNotesBlock(false), 3000);
      } else {
        setState("notes");
      }
    } else if (appId === "browser") {
      setState("browser");
    } else {
      setShowAppError(appId);
      setTimeout(() => setShowAppError(null), 1500);
    }
  }, [photosViewed]);

  if (!visible) return null;

  return (
    <>
    {/* Photo viewer - outside phone */}
    {viewingPhoto && (
      <div
        onClick={() => setViewingPhoto(null)}
        style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 99999,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", padding: 20,
        }}
      >
        <img
          src={viewingPhoto}
          alt="Foto"
          style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain", borderRadius: 4, boxShadow: "0 8px 40px rgba(0,0,0,0.8)" }}
        />
        <div style={{
          position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)",
          fontSize: 12, color: "#666", fontFamily: "Arial,sans-serif",
        }}>Click para cerrar</div>
      </div>
    )}

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
                <div style={{ marginTop: 16, textAlign: "center", padding: "0 20px" }}>
                  <div style={{ color: "#22c55e", fontSize: 11, letterSpacing: 2, marginBottom: 6, fontFamily: "Arial,sans-serif" }}>/subconsciente</div>
                  <div style={{ fontSize: 13, color: "#94a3b8", fontStyle: "italic", fontFamily: "Arial,sans-serif", lineHeight: 1.6 }}>
                    Necesito un cargador... a lo mejor esta en la caja de herramientas.
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
                    {subconsciousMsg}
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
                      background: app.action
                        ? `linear-gradient(135deg, ${app.color}80, ${app.color}40)`
                        : "rgba(255,255,255,0.06)",
                      border: app.action
                        ? `1px solid ${app.color}60`
                        : "1px solid rgba(255,255,255,0.08)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 22, transition: "transform 0.15s",
                      position: "relative",
                      opacity: app.action ? 1 : 0.5,
                    }}
                    onMouseDown={e => (e.currentTarget.style.transform = "scale(0.9)")}
                    onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      {app.icon}
                      {/* Notification badges */}
                      {app.id === "photos" && (
                        <div style={{
                          position: "absolute", top: -3, right: -3,
                          width: 16, height: 16, borderRadius: "50%",
                          background: "#ef4444", border: "2px solid #0c0a20",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 9, color: "#fff", fontWeight: "bold",
                        }}>1</div>
                      )}
                      {app.id === "notes" && (
                        <div style={{
                          position: "absolute", top: -3, right: -3,
                          width: 16, height: 16, borderRadius: "50%",
                          background: "#eab308", border: "2px solid #0c0a20",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 9, color: "#000", fontWeight: "bold",
                        }}>1</div>
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

              {/* Notes blocked - haven't seen photos yet */}
              {showNotesBlock && (
                <div style={{
                  position: "absolute", inset: 0, zIndex: 20,
                }}>
                  {/* Actual notes screen blurred behind */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "#faf5e8",
                    filter: "blur(4px)",
                    overflow: "hidden",
                  }}>
                    {/* Header */}
                    <div style={{ padding: "36px 14px 10px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e0d8c4" }}>
                      <span style={{ color: "#b08020", fontSize: 13, fontFamily: "Arial,sans-serif" }}>← Atras</span>
                      <span style={{ fontSize: 14, color: "#1a1a1a", fontWeight: 600, fontFamily: "Arial,sans-serif" }}>Notas</span>
                      <div style={{ width: 40 }} />
                    </div>
                    {/* Note content blurred */}
                    <div style={{
                      padding: "16px 18px",
                      fontFamily: "'Segoe Script','Comic Sans MS',cursive",
                      fontSize: 14, lineHeight: 2.2, color: "#1a1a2e",
                      backgroundImage: "repeating-linear-gradient(180deg, transparent 0px, transparent 27px, rgba(60,80,140,0.08) 27px, rgba(60,80,140,0.08) 28px)",
                    }}>
                      <div style={{ paddingLeft: 8 }}>
                        <p>Cada vez que venia aqui, me quedaba en silencio.</p>
                        <p>Miraba la ______ a lo lejos y pensaba que algo en ella me debia algo.</p>
                        <p>El ____ del rio siempre corria igual, sin prisa, sin culpa.</p>
                        <p>Al _____ las colinas parecian proteger todo.</p>
                        <p>Los _______ eran los unicos testigos.</p>
                        <p>Y la ___ de la tarde lo hacia todo parecer mas facil.</p>
                        <p style={{ marginTop: 8 }}>Ojala hubiera sido mas facil.</p>
                        <p style={{ textAlign: "right", fontSize: 18, color: "#1a2a5a" }}>H.</p>
                      </div>
                    </div>
                  </div>
                  {/* Subconscious overlay */}
                  <div style={{
                    position: "absolute", inset: 0, zIndex: 2,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(0,0,0,0.5)",
                  }}>
                    <div style={{
                      textAlign: "center",
                      background: "rgba(0,0,0,0.9)", borderRadius: 12, padding: "18px 22px",
                    }}>
                      <div style={{ color: "#22c55e", fontSize: 11, letterSpacing: 2, marginBottom: 6, fontFamily: "Arial,sans-serif" }}>/subconsciente</div>
                      <div style={{ fontSize: 13, color: "#94a3b8", fontStyle: "italic", fontFamily: "Arial,sans-serif", lineHeight: 1.6 }}>
                        No entiendo nada, deberia ver otra cosa primero?
                      </div>
                    </div>
                  </div>
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
                    onClick={() => !photo.placeholder && photo.src && setViewingPhoto(photo.src)}
                    style={{
                      aspectRatio: "1", background: "#1a1a1a", borderRadius: 4,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: photo.placeholder ? "default" : "pointer",
                      overflow: "hidden",
                    }}
                  >
                    {photo.placeholder ? (
                      <span style={{ fontSize: 24, opacity: 0.3 }}>📷</span>
                    ) : (
                      <img src={photo.src} alt="Foto" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    )}
                  </div>
                ))}
              </div>

              <div style={{ textAlign: "center", padding: "10px 0", fontSize: 11, color: "#555", fontFamily: "Arial,sans-serif" }}>
                {PHOTOS.filter(p => !p.placeholder).length} de {PHOTOS.length} fotos
              </div>
            </div>
          )}

          {/* === NOTES === */}
          {state === "notes" && (
            <div style={{
              width: "100%", height: "100%",
              background: "#faf5e8",
              display: "flex", flexDirection: "column",
              color: "#1a1a1a",
            }}>
              {/* Header */}
              <div style={{
                padding: "36px 14px 10px", display: "flex", alignItems: "center", justifyContent: "space-between",
                borderBottom: "1px solid #e0d8c4",
              }}>
                <button
                  onClick={() => setState("home")}
                  style={{ background: "none", border: "none", color: "#b08020", fontSize: 13, cursor: "pointer", fontFamily: "Arial,sans-serif" }}
                >
                  ← Atras
                </button>
                <span style={{ fontSize: 14, color: "#1a1a1a", fontWeight: 600, fontFamily: "Arial,sans-serif" }}>Notas</span>
                <div style={{ width: 40 }} />
              </div>

              {/* Note content */}
              <div style={{
                flex: 1, padding: "16px 18px", overflowY: "auto",
                fontFamily: "'Segoe Script','Comic Sans MS',cursive",
                fontSize: 14, lineHeight: 2.2,
                backgroundImage: "repeating-linear-gradient(180deg, transparent 0px, transparent 27px, rgba(60,80,140,0.08) 27px, rgba(60,80,140,0.08) 28px)",
              }}>
                {/* Red margin line */}
                <div style={{ position: "absolute", left: 44, top: 0, bottom: 0, width: 1, background: "rgba(200,60,60,0.2)", pointerEvents: "none" }} />

                <div style={{ paddingLeft: 8 }}>
                  <p style={{ marginBottom: 4 }}>
                    Cada vez que venia aqui, me quedaba en silencio.
                  </p>
                  <p style={{ marginBottom: 4 }}>
                    Miraba la{" "}
                    <NoteBlank
                      value={noteAnswers[0]}
                      onChange={v => { const a = [...noteAnswers]; a[0] = v; setNoteAnswers(a); }}
                      answer="CIUDAD"
                      hint="C_____"
                    />
                    {" "}a lo lejos y pensaba que algo en ella me debia algo.
                  </p>
                  <p style={{ marginBottom: 4 }}>
                    El{" "}
                    <NoteBlank
                      value={noteAnswers[1]}
                      onChange={v => { const a = [...noteAnswers]; a[1] = v; setNoteAnswers(a); }}
                      answer="AGUA"
                      hint="_G__"
                    />
                    {" "}del rio siempre corria igual, sin prisa, sin culpa.
                  </p>
                  <p style={{ marginBottom: 4 }}>
                    Al{" "}
                    <NoteBlank
                      value={noteAnswers[2]}
                      onChange={v => { const a = [...noteAnswers]; a[2] = v; setNoteAnswers(a); }}
                      answer="NORTE"
                      hint="__R__"
                    />
                    {" "}las colinas parecian proteger todo lo que habia debajo.
                  </p>
                  <p style={{ marginBottom: 4 }}>
                    Los{" "}
                    <NoteBlank
                      value={noteAnswers[3]}
                      onChange={v => { const a = [...noteAnswers]; a[3] = v; setNoteAnswers(a); }}
                      answer="ARBOLES"
                      hint="___O___"
                    />
                    {" "}eran los unicos testigos de las cosas que nunca dije.
                  </p>
                  <p style={{ marginBottom: 4 }}>
                    Y la{" "}
                    <NoteBlank
                      value={noteAnswers[4]}
                      onChange={v => { const a = [...noteAnswers]; a[4] = v; setNoteAnswers(a); }}
                      answer="LUZ"
                      hint="_U_"
                    />
                    {" "}de la tarde lo hacia todo parecer mas facil de lo que era.
                  </p>
                  <p style={{ marginTop: 8 }}>
                    Ojala hubiera sido mas facil.
                  </p>
                  <p style={{ textAlign: "right", marginTop: 12, fontSize: 18, color: "#1a2a5a" }}>
                    H.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* === BROWSER === */}
          {state === "browser" && (
            <div style={{
              width: "100%", height: "100%",
              background: "#fff",
              display: "flex", flexDirection: "column",
              color: "#1a1a1a",
            }}>
              {/* URL bar header */}
              <div style={{
                padding: "32px 12px 8px",
                background: "#f1f3f4",
                borderBottom: "1px solid #dadce0",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <button
                  onClick={() => { setState("home"); setBrowserSearchFocused(false); setBrowserQuery(""); }}
                  style={{ background: "none", border: "none", color: "#5f6368", fontSize: 18, cursor: "pointer", padding: 4 }}
                >
                  ←
                </button>
                <div style={{
                  flex: 1, background: "#fff", borderRadius: 16,
                  padding: "6px 12px", display: "flex", alignItems: "center", gap: 6,
                  border: "1px solid #dadce0",
                }}>
                  <span style={{ fontSize: 11, color: "#5f6368" }}>🔒</span>
                  <span style={{ fontSize: 10, color: "#5f6368", fontFamily: "Arial,sans-serif" }}>quack.com</span>
                </div>
              </div>

              {/* Browser body */}
              <div style={{
                flex: 1, padding: "30px 16px 16px",
                display: "flex", flexDirection: "column", alignItems: "center",
                position: "relative",
              }}>
                {/* Logo */}
                <div style={{
                  fontSize: 28, fontWeight: 800, marginBottom: 24,
                  fontFamily: "Arial,sans-serif",
                  color: "#1a1a1a",
                }}>
                  <span style={{ color: "#ea4335" }}>Q</span>
                  <span style={{ color: "#fbbc04" }}>u</span>
                  <span style={{ color: "#34a853" }}>a</span>
                  <span style={{ color: "#4285f4" }}>c</span>
                  <span style={{ color: "#ea4335" }}>k</span>
                </div>

                {/* Search bar */}
                <div style={{ width: "100%", position: "relative" }}>
                  <input
                    type="text"
                    value={browserQuery}
                    onChange={e => setBrowserQuery(e.target.value)}
                    onFocus={() => setBrowserSearchFocused(true)}
                    onBlur={() => setTimeout(() => setBrowserSearchFocused(false), 200)}
                    placeholder="Buscar en Quack..."
                    style={{
                      width: "100%", padding: "10px 14px",
                      background: "#fff",
                      border: "1px solid #dadce0",
                      borderRadius: browserSearchFocused ? "20px 20px 0 0" : 20,
                      borderBottom: browserSearchFocused ? "1px solid #e8eaed" : "1px solid #dadce0",
                      fontSize: 12, outline: "none", boxSizing: "border-box",
                      fontFamily: "Arial,sans-serif",
                      color: "#1a1a1a",
                      boxShadow: browserSearchFocused ? "0 1px 6px rgba(32,33,36,0.18)" : "none",
                    }}
                  />
                  {/* Search history dropdown */}
                  {browserSearchFocused && (
                    <div style={{
                      position: "absolute", top: "100%", left: 0, right: 0,
                      background: "#fff",
                      border: "1px solid #dadce0", borderTop: "none",
                      borderRadius: "0 0 20px 20px",
                      boxShadow: "0 4px 6px rgba(32,33,36,0.18)",
                      paddingBottom: 8,
                      maxHeight: 200,
                      overflowY: "auto",
                    }}>
                      <div style={{ fontSize: 9, color: "#70757a", padding: "6px 14px 4px", textTransform: "uppercase", letterSpacing: 0.5, fontFamily: "Arial,sans-serif" }}>
                        Recientes
                      </div>
                      {[
                        "reservar habitacion The Royale",
                      ].map((s, i) => (
                        <div
                          key={i}
                          onClick={() => { setBrowserQuery(s); setBrowserSearchFocused(false); }}
                          style={{
                            padding: "8px 14px",
                            fontSize: 12, color: "#202124", fontFamily: "Arial,sans-serif",
                            cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = "#f1f3f4"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                        >
                          <span style={{ fontSize: 11, color: "#70757a" }}>🕐</span>
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom hint */}
                <div style={{ marginTop: 30, fontSize: 10, color: "#9aa0a6", fontFamily: "Arial,sans-serif", textAlign: "center" }}>
                  Modo offline &middot; Mostrando historial guardado
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Home button */}
        <div style={{
          height: 24, display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: 6,
        }}>
          <div
            onClick={() => { if (state === "photos" || state === "notes" || state === "browser") setState("home"); }}
            style={{
              width: 100, height: 4, borderRadius: 2, background: "#444",
              cursor: (state === "photos" || state === "notes" || state === "browser") ? "pointer" : "default",
            }}
          />
        </div>
      </div>
    </div>
    </>
  );
}

/* ========== Note blank input component ========== */
function NoteBlank({ value, onChange, answer, hint }: {
  value: string;
  onChange: (v: string) => void;
  answer: string;
  hint: string;
}) {
  const isComplete = value.length > 0 && value.length === answer.length;
  const isCorrect = value.toUpperCase() === answer;

  if (isComplete && isCorrect) {
    return (
      <span style={{
        fontFamily: "'Segoe Script','Comic Sans MS',cursive",
        fontSize: 14, letterSpacing: 1,
        borderBottom: "2px solid #22c55e",
        padding: "0 4px",
      }}>
        <span style={{ color: "#22c55e", fontWeight: "bold" }}>{answer[0]}</span>
        <span style={{ color: "#1a1a2e" }}>{answer.slice(1).toLowerCase()}</span>
      </span>
    );
  }

  return (
    <span style={{ display: "inline-flex", alignItems: "center", verticalAlign: "baseline" }}>
      <span style={{ position: "relative", display: "inline-block" }}>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value.slice(0, answer.length))}
          placeholder={hint}
          maxLength={answer.length}
          style={{
            width: answer.length * 12 + 16,
            background: "transparent",
            border: "none",
            borderBottom: `2px ${isComplete ? "solid #ef4444" : "dashed #a09070"}`,
            color: isComplete ? "#ef4444" : "#1a1a2e",
            fontFamily: "'Segoe Script','Comic Sans MS',cursive",
            fontSize: 14,
            textAlign: "center",
            outline: "none",
            padding: "0 4px",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        />
      </span>
    </span>
  );
}
