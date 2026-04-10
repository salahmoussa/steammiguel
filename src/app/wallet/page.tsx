"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const VALID_USER = "4827163";
const VALID_PASS = "perroNegro_33!";
const VALID_SEED_WORDS = ["canal", "benefactor"];

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  amount: number;
  price: number;
  change24h: number;
  color: string;
}

const PORTFOLIO: Crypto[] = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    icon: "₿",
    amount: 47.8213,
    price: 120450.00,
    change24h: 3.81,
    color: "#f7931a",
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    icon: "Ξ",
    amount: 312.4471,
    price: 7220.00,
    change24h: 2.47,
    color: "#627eea",
  },
  {
    id: "maze",
    name: "MazeCoin",
    symbol: "MZC",
    icon: "◆",
    amount: 84200,
    price: 6.30,
    change24h: 18.54,
    color: "#00d4aa",
  },
];

const TRANSACTIONS = [
  { id: "t1", type: "buy", asset: "MZC", amount: 30000, value: 95100.00, date: "12/11/2015" },
  { id: "t2", type: "sell", asset: "ETH", amount: 15.0000, value: 102618.00, date: "28/09/2015" },
  { id: "t3", type: "buy", asset: "ETH", amount: 50.0000, value: 342060.00, date: "14/08/2015" },
  { id: "t4", type: "buy", asset: "MZC", amount: 54200, value: 171814.00, date: "02/07/2015" },
  { id: "t5", type: "buy", asset: "BTC", amount: 10.0000, value: 1042500.00, date: "19/05/2015" },
  { id: "t6", type: "buy", asset: "BTC", amount: 2.5000, value: 260625.00, date: "08/04/2015" },
  { id: "t7", type: "buy", asset: "BTC", amount: 35.3213, value: 3682148.25, date: "15/02/2015" },
  { id: "t8", type: "buy", asset: "ETH", amount: 277.4471, value: 1898033.77, date: "15/02/2015" },
];

function formatMoney(n: number): string {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function WalletPage() {
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [showInvest, setShowInvest] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [seedWords, setSeedWords] = useState(Array(12).fill(""));
  const [seedStatus, setSeedStatus] = useState<Array<"idle"|"correct"|"wrong">>(Array(12).fill("idle"));
  const seedStatusRef = useRef<Array<"idle"|"correct"|"wrong">>(Array(12).fill("idle"));
  const seedTimers = useRef<Array<ReturnType<typeof setTimeout> | null>>(Array(12).fill(null));
  const attemptsRef = useRef(3);
  const [withdrawError, setWithdrawError] = useState("");
  const [withdrawAttempts, setWithdrawAttempts] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sm_withdraw_attempts");
      const val = saved ? parseInt(saved) : 3;
      attemptsRef.current = val;
      return val;
    }
    return 3;
  });

  // Dashboard reveal states
  const [dashboardReady, setDashboardReady] = useState(false);
  const [displayedBalance, setDisplayedBalance] = useState(0);
  const [balanceCountDone, setBalanceCountDone] = useState(false);
  const [visibleAssets, setVisibleAssets] = useState(0);
  const [showTransactions, setShowTransactions] = useState(false);
  const animFrameRef = useRef<number>(0);

  const totalValue = PORTFOLIO.reduce((sum, c) => sum + c.amount * c.price, 0);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (user.trim() === VALID_USER && pass === VALID_PASS) {
      setLoggingIn(true);
      setLoginError("");
      setTimeout(() => {
        setAuthed(true);
        setLoggingIn(false);
      }, 1200);
    } else {
      setLoginError("ID o contrasena incorrectos.");
    }
  }

  function handleSeedWordChange(index: number, value: string) {
    const updated = [...seedWords];
    updated[index] = value;
    setSeedWords(updated);

    // Reset status to idle while typing
    seedStatusRef.current[index] = "idle";
    setSeedStatus([...seedStatusRef.current]);

    // Clear previous timer
    if (seedTimers.current[index]) clearTimeout(seedTimers.current[index]!);

    // Validate after 1s cooldown
    if (value.trim().length > 0) {
      seedTimers.current[index] = setTimeout(() => {
        if (VALID_SEED_WORDS.includes(value.trim().toLowerCase())) {
          seedStatusRef.current[index] = "correct";
        } else {
          seedStatusRef.current[index] = "wrong";
          // Count as attempt using ref for fresh value
          const remaining = Math.max(0, attemptsRef.current - 1);
          attemptsRef.current = remaining;
          setWithdrawAttempts(remaining);
          localStorage.setItem("sm_withdraw_attempts", remaining.toString());
          if (remaining === 0) {
            setWithdrawError("");
          }
        }
        setSeedStatus([...seedStatusRef.current]);
      }, 1000);
    }
  }

  function handleWithdraw(e: React.FormEvent) {
    e.preventDefault();
    const correctCount = seedStatusRef.current.filter(s => s === "correct").length;
    if (correctCount < 12) {
      const remaining = Math.max(0, attemptsRef.current - 1);
      attemptsRef.current = remaining;
      setWithdrawAttempts(remaining);
      localStorage.setItem("sm_withdraw_attempts", remaining.toString());
      if (remaining === 0) {
        setWithdrawError("⛔ CUENTA BLOQUEADA: Se han agotado todos los intentos de verificacion. Esta cuenta ha sido bloqueada permanentemente. Se ha notificado al titular original. Direccion IP y marca de tiempo registrados.");
      } else {
        setWithdrawError(`Verificacion incompleta. ${correctCount}/12 palabras correctas.`);
      }
    }
  }

  // Dashboard mount: trigger balance count-up
  useEffect(() => {
    if (!authed) return;
    setDashboardReady(true);
  }, [authed]);

  // Balance count-up animation
  const easeOutExpo = useCallback((t: number) => 1 - Math.pow(2, -10 * t), []);

  useEffect(() => {
    if (!dashboardReady) return;
    const duration = 2000;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      setDisplayedBalance(totalValue * easedProgress);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayedBalance(totalValue);
        setBalanceCountDone(true);
      }
    }

    animFrameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [dashboardReady, totalValue, easeOutExpo]);

  // Staggered asset cards
  useEffect(() => {
    if (!dashboardReady) return;
    const timers = PORTFOLIO.map((_, i) =>
      setTimeout(() => setVisibleAssets((v) => Math.max(v, i + 1)), 200 * (i + 1))
    );
    return () => timers.forEach(clearTimeout);
  }, [dashboardReady]);

  // Transaction section fade-in
  useEffect(() => {
    if (!dashboardReady) return;
    const timer = setTimeout(() => setShowTransactions(true), 800);
    return () => clearTimeout(timer);
  }, [dashboardReady]);

  // ====== LOGIN ======
  if (!authed) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#0b0e17",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
      }}>
        <div style={{ width: 400, maxWidth: "90vw" }}>
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{
              width: 60, height: 60, borderRadius: "50%",
              background: "linear-gradient(135deg, #00d4aa, #00a886)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontSize: 28, color: "#0b0e17", fontWeight: "bold",
            }}>◆</div>
            <div style={{ fontSize: 24, fontWeight: "bold", color: "#fff", marginTop: 12 }}>
              Maze<span style={{ color: "#00d4aa" }}>Vault</span>
            </div>
            <div style={{ fontSize: 13, color: "#4a5568", marginTop: 4 }}>
              Secure Digital Asset Management
            </div>
          </div>

          {/* Login card */}
          <div style={{
            background: "#111827", border: "1px solid #1f2937", borderRadius: 12,
            padding: 28,
          }}>
            <h2 style={{ fontSize: 18, color: "#fff", marginBottom: 4, fontWeight: 600 }}>Acceder a tu wallet</h2>
            <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20 }}>Introduce tu ID de usuario y contrasena.</p>

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, color: "#9ca3af", marginBottom: 6, fontWeight: 500 }}>
                  ID de usuario
                </label>
                <input
                  type="text"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="Introduce tu ID"
                  style={{
                    width: "100%", padding: "12px 14px", background: "#0b0e17",
                    border: "1px solid #374151", borderRadius: 8, color: "#fff",
                    fontSize: 15, outline: "none", boxSizing: "border-box",
                    fontFamily: "monospace",
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 13, color: "#9ca3af", marginBottom: 6, fontWeight: 500 }}>
                  Contrasena
                </label>
                <input
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="••••••••••"
                  style={{
                    width: "100%", padding: "12px 14px", background: "#0b0e17",
                    border: "1px solid #374151", borderRadius: 8, color: "#fff",
                    fontSize: 15, outline: "none", boxSizing: "border-box",
                  }}
                  required
                />
              </div>

              {loginError && (
                <div style={{
                  background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
                  borderRadius: 8, padding: "10px 14px", marginBottom: 16,
                  fontSize: 14, color: "#ef4444",
                }}>
                  {loginError}
                </div>
              )}

              <button type="submit" disabled={loggingIn} style={{
                width: "100%", padding: "12px", background: "linear-gradient(135deg, #00d4aa, #00a886)",
                border: "none", borderRadius: 8, color: "#0b0e17", fontSize: 15,
                fontWeight: 700, cursor: loggingIn ? "default" : "pointer", fontFamily: "inherit",
                opacity: loggingIn ? 0.85 : 1,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}>
                {loggingIn && (
                  <span style={{
                    display: "inline-block", width: 16, height: 16,
                    border: "2px solid rgba(11,14,23,0.3)",
                    borderTopColor: "#0b0e17",
                    borderRadius: "50%",
                    animation: "mazevault-spin 0.6s linear infinite",
                  }} />
                )}
                {loggingIn ? "Verificando..." : "Acceder"}
                <style>{`@keyframes mazevault-spin { to { transform: rotate(360deg); } }`}</style>
              </button>
            </form>
          </div>

          <p style={{ fontSize: 11, color: "#374151", textAlign: "center", marginTop: 16 }}>
            MazeVault &copy; 2026 &bull; Todos los derechos reservados &bull; v4.2.1
          </p>
        </div>
      </div>
    );
  }

  // ====== DASHBOARD ======
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0b0e17",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      color: "#e5e7eb",
    }}>
      {/* Invest modal */}
      {showInvest && (
        <div onClick={() => setShowInvest(false)} style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(0,0,0,0.7)", zIndex: 9999,
          display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: "#111827", border: "1px solid #1f2937", borderRadius: 12,
            padding: 28, maxWidth: 420, width: "100%",
          }}>
            <h3 style={{ fontSize: 18, color: "#fff", marginBottom: 8 }}>Invertir mas</h3>
            <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 20, lineHeight: 1.6 }}>
              Los depositos directos estan temporalmente deshabilitados por mantenimiento de la red.
              Tiempo estimado de resolucion: 48-72h.
            </p>
            <div style={{
              background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.3)",
              borderRadius: 8, padding: "12px 14px", fontSize: 13, color: "#eab308", marginBottom: 20,
            }}>
              Para depositos urgentes, contacte con soporte: support@mazevault.sa
            </div>
            <button onClick={() => setShowInvest(false)} style={{
              width: "100%", padding: "10px", background: "#1f2937", border: "1px solid #374151",
              borderRadius: 8, color: "#fff", fontSize: 14, cursor: "pointer", fontFamily: "inherit",
            }}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Withdraw modal */}
      {showWithdraw && (
        <div onClick={() => { setShowWithdraw(false); setWithdrawError(""); setSeedWords(Array(12).fill("")); setSeedStatus(() => { const n = Array(12).fill("idle") as Array<"idle"|"correct"|"wrong">; seedStatusRef.current = n; return n; }); }} style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(0,0,0,0.7)", zIndex: 9999,
          display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: "#111827", border: "1px solid #1f2937", borderRadius: 12,
            padding: 28, maxWidth: 520, width: "100%", maxHeight: "90vh", overflowY: "auto",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, color: "#fff" }}>Retirar fondos</h3>
              {/* Visual attempts */}
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{
                    width: 10, height: 10, borderRadius: "50%",
                    background: i < withdrawAttempts ? "#ef4444" : "#1f2937",
                    border: `1px solid ${i < withdrawAttempts ? "#ef4444" : "#374151"}`,
                    transition: "all 0.3s",
                  }} />
                ))}
              </div>
            </div>
            <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 20, lineHeight: 1.6 }}>
              Introduce las 12 palabras de tu seed phrase. Cada palabra se verificara automaticamente.
            </p>

            <form onSubmit={handleWithdraw}>
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20,
              }}>
                {seedWords.map((word, i) => {
                  const status = seedStatus[i];
                  const borderColor = status === "correct" ? "#22c55e" : status === "wrong" ? "#ef4444" : "#374151";
                  const textColor = status === "correct" ? "#22c55e" : status === "wrong" ? "#ef4444" : "#fff";
                  return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 12, color: status === "correct" ? "#22c55e" : "#4b5563", fontFamily: "monospace", width: 20, textAlign: "right", flexShrink: 0 }}>
                      {i + 1}.
                    </span>
                    <input
                      type="text"
                      value={word}
                      onChange={(e) => handleSeedWordChange(i, e.target.value)}
                      disabled={status === "correct" || withdrawAttempts === 0}
                      style={{
                        width: "100%", padding: "8px 10px", background: status === "correct" ? "rgba(34,197,94,0.08)" : "#0b0e17",
                        border: `1px solid ${borderColor}`, borderRadius: 6, color: textColor,
                        fontSize: 14, outline: "none", boxSizing: "border-box",
                        fontFamily: "monospace",
                        transition: "border-color 0.3s, color 0.3s, background 0.3s",
                      }}
                    />
                  </div>
                  );
                })}
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button type="button" onClick={() => { setShowWithdraw(false); setWithdrawError(""); setSeedWords(Array(12).fill("")); setSeedStatus(() => { const n = Array(12).fill("idle") as Array<"idle"|"correct"|"wrong">; seedStatusRef.current = n; return n; }); }} style={{
                  flex: 1, padding: "10px", background: "#1f2937", border: "1px solid #374151",
                  borderRadius: 8, color: "#fff", fontSize: 14, cursor: "pointer", fontFamily: "inherit",
                }}>
                  Cancelar
                </button>
                <button type="submit" style={{
                  flex: 1, padding: "10px", background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  border: "none", borderRadius: 8, color: "#fff", fontSize: 14,
                  fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                }}>
                  Verificar y retirar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Top bar */}
      <div style={{
        background: "#111827", borderBottom: "1px solid #1f2937",
        padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "linear-gradient(135deg, #00d4aa, #00a886)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, color: "#0b0e17", fontWeight: "bold",
          }}>◆</div>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>
            Maze<span style={{ color: "#00d4aa" }}>Vault</span>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 13, color: "#6b7280" }}>ID: {VALID_USER}</span>
          <div style={{
            width: 8, height: 8, borderRadius: "50%", background: "#00d4aa",
          }} />
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "28px 20px" }}>

        {/* Total balance */}
        <div style={{
          background: "linear-gradient(135deg, #111827 0%, #1a2332 100%)",
          border: "1px solid #1f2937", borderRadius: 16, padding: "28px 32px", marginBottom: 24,
        }}>
          <div style={{ fontSize: 13, color: "#6b7280", fontWeight: 500 }}>Valor total del portfolio</div>
          <div style={{ fontSize: 38, fontWeight: 800, color: "#fff", marginTop: 4, fontFamily: "monospace" }}>
            {formatMoney(displayedBalance)}
          </div>
          <div style={{
            fontSize: 14, color: "#00d4aa", marginTop: 4,
            opacity: balanceCountDone ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}>
            +$214,891.40 (2.58%) hoy
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            <button onClick={() => setShowInvest(true)} style={{
              flex: 1, padding: "12px", background: "linear-gradient(135deg, #00d4aa, #00a886)",
              border: "none", borderRadius: 10, color: "#0b0e17", fontSize: 15,
              fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
            }}>
              Invertir mas
            </button>
            <button onClick={() => withdrawAttempts > 0 && setShowWithdraw(true)} style={{
              flex: 1, padding: "12px", background: "transparent",
              border: "1px solid #374151", borderRadius: 10,
              color: "#fff", fontSize: 15,
              fontWeight: 600, cursor: withdrawAttempts > 0 ? "pointer" : "not-allowed",
              fontFamily: "inherit", opacity: withdrawAttempts > 0 ? 1 : 0.3,
            }}>
              Retirar
            </button>
          </div>
        </div>

        {/* Security notice */}
        <div style={{
          background: "rgba(234,179,8,0.06)", border: "1px solid rgba(234,179,8,0.15)",
          borderRadius: 10, padding: "12px 16px", marginBottom: 20,
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <span style={{ fontSize: 16 }}>🔒</span>
          <div>
            <div style={{ fontSize: 13, color: "#eab308", fontWeight: 600 }}>
              Sesion monitoreada
            </div>
            <div style={{ fontSize: 12, color: "#92810e", lineHeight: 1.5 }}>
              Esta cuenta tiene activada la verificacion por seed phrase. Cualquier intento de retirada sera notificado al titular registrado. Ultimo acceso autorizado: 14/06/2015.
            </div>
          </div>
        </div>

        {/* Portfolio */}
        <h3 style={{ fontSize: 16, color: "#9ca3af", fontWeight: 600, marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>
          Activos
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {PORTFOLIO.map((c, index) => {
            const value = c.amount * c.price;
            const pct = (value / totalValue) * 100;
            const isVisible = index < visibleAssets;
            return (
              <div key={c.id} style={{
                background: "#111827", border: "1px solid #1f2937", borderRadius: 12,
                padding: "18px 20px", display: "flex", alignItems: "center", gap: 16,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.4s ease, transform 0.4s ease",
              }}>
                {/* Icon */}
                <div style={{
                  width: 48, height: 48, borderRadius: "50%", background: `${c.color}20`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, color: c.color, fontWeight: "bold", flexShrink: 0,
                  border: `2px solid ${c.color}40`,
                }}>
                  {c.icon}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <div>
                      <span style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{c.name}</span>
                      <span style={{ fontSize: 13, color: "#6b7280", marginLeft: 8 }}>{c.symbol}</span>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", fontFamily: "monospace" }}>
                        {formatMoney(value)}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 13 }}>
                    <span style={{ color: "#6b7280" }}>
                      {c.amount.toLocaleString("en-US", { maximumFractionDigits: 4 })} {c.symbol} &bull; {formatMoney(c.price)}/{c.symbol}
                    </span>
                    <span style={{ color: c.change24h >= 0 ? "#00d4aa" : "#ef4444" }}>
                      {c.change24h >= 0 ? "+" : ""}{c.change24h}%
                    </span>
                  </div>
                  {/* Portfolio bar */}
                  <div style={{ marginTop: 8, height: 4, background: "#1f2937", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: c.color, borderRadius: 2 }} />
                  </div>
                  <div style={{ fontSize: 11, color: "#4b5563", marginTop: 3 }}>{pct.toFixed(1)}% del portfolio</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transactions */}
        <div style={{
          opacity: showTransactions ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}>
        <h3 style={{ fontSize: 16, color: "#9ca3af", fontWeight: 600, marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>
          Historial de transacciones
        </h3>
        <div style={{
          background: "#111827", border: "1px solid #1f2937", borderRadius: 12,
          overflow: "hidden",
        }}>
          {TRANSACTIONS.map((tx, i) => (
            <div key={tx.id} style={{
              padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
              borderBottom: i < TRANSACTIONS.length - 1 ? "1px solid #1f2937" : "none",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: tx.type === "buy" ? "rgba(0,212,170,0.1)" : "rgba(239,68,68,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, color: tx.type === "buy" ? "#00d4aa" : "#ef4444",
                }}>
                  {tx.type === "buy" ? "↓" : "↑"}
                </div>
                <div>
                  <div style={{ fontSize: 14, color: "#fff", fontWeight: 500 }}>
                    {tx.type === "buy" ? "Compra" : "Venta"} {tx.asset}
                  </div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>{tx.date}</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 14, fontFamily: "monospace", color: tx.type === "buy" ? "#00d4aa" : "#ef4444", fontWeight: 500 }}>
                  {tx.type === "buy" ? "-" : "+"}{formatMoney(tx.value)}
                </div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>
                  {tx.amount.toLocaleString("en-US", { maximumFractionDigits: 4 })} {tx.asset}
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>

        {/* Footer */}
        <div style={{
          fontSize: 11, color: "#374151", textAlign: "center", marginTop: 24, paddingTop: 16,
          borderTop: "1px solid #1f2937", lineHeight: 1.6,
        }}>
          MazeVault &copy; 2026 &bull; Los precios se actualizan cada 60 segundos &bull; v4.2.1<br />
          Este servicio no esta regulado por ninguna autoridad financiera de San Andreas.
        </div>
      </div>
    </div>
  );
}
