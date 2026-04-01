"use client";

import { useState } from "react";

const VALID_USER = "4827163";
const VALID_PASS = "perroNegro_33!";

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
    price: 104250.00,
    change24h: 2.34,
    color: "#f7931a",
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    icon: "Ξ",
    amount: 312.4471,
    price: 6841.20,
    change24h: -1.12,
    color: "#627eea",
  },
  {
    id: "maze",
    name: "MazeCoin",
    symbol: "MZC",
    icon: "◆",
    amount: 84200,
    price: 3.17,
    change24h: 14.82,
    color: "#00d4aa",
  },
];

const TRANSACTIONS = [
  { id: "t1", type: "buy", asset: "MZC", amount: 30000, value: 95100.00, date: "18/11/2025" },
  { id: "t2", type: "sell", asset: "ETH", amount: 15.0000, value: 102618.00, date: "03/09/2025" },
  { id: "t3", type: "buy", asset: "ETH", amount: 50.0000, value: 342060.00, date: "21/06/2025" },
  { id: "t4", type: "buy", asset: "MZC", amount: 54200, value: 171814.00, date: "14/03/2025" },
  { id: "t5", type: "buy", asset: "BTC", amount: 10.0000, value: 1042500.00, date: "02/11/2024" },
  { id: "t6", type: "buy", asset: "BTC", amount: 2.5000, value: 260625.00, date: "19/07/2024" },
  { id: "t7", type: "buy", asset: "BTC", amount: 35.3213, value: 3682148.25, date: "08/02/2024" },
  { id: "t8", type: "buy", asset: "ETH", amount: 277.4471, value: 1898033.77, date: "08/02/2024" },
];

function formatMoney(n: number): string {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function WalletPage() {
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showInvest, setShowInvest] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [seedWords, setSeedWords] = useState(Array(12).fill(""));
  const [withdrawError, setWithdrawError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (user.trim() === VALID_USER && pass === VALID_PASS) {
      setAuthed(true);
      setLoginError("");
    } else {
      setLoginError("ID o contrasena incorrectos.");
    }
  }

  function handleWithdraw(e: React.FormEvent) {
    e.preventDefault();
    setWithdrawError("Error de verificacion: las palabras introducidas no coinciden con la seed phrase de esta wallet. Intentos restantes: 2");
  }

  const totalValue = PORTFOLIO.reduce((sum, c) => sum + c.amount * c.price, 0);

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

              <button type="submit" style={{
                width: "100%", padding: "12px", background: "linear-gradient(135deg, #00d4aa, #00a886)",
                border: "none", borderRadius: 8, color: "#0b0e17", fontSize: 15,
                fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
              }}>
                Acceder
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
        <div onClick={() => { setShowWithdraw(false); setWithdrawError(""); setSeedWords(Array(12).fill("")); }} style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(0,0,0,0.7)", zIndex: 9999,
          display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: "#111827", border: "1px solid #1f2937", borderRadius: 12,
            padding: 28, maxWidth: 520, width: "100%", maxHeight: "90vh", overflowY: "auto",
          }}>
            <h3 style={{ fontSize: 18, color: "#fff", marginBottom: 4 }}>Retirar fondos</h3>
            <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 20, lineHeight: 1.6 }}>
              Para autorizar la retirada, introduce las 12 palabras de tu frase semilla (seed phrase) en el orden correcto.
            </p>

            <form onSubmit={handleWithdraw}>
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20,
              }}>
                {seedWords.map((word, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 12, color: "#4b5563", fontFamily: "monospace", width: 20, textAlign: "right", flexShrink: 0 }}>
                      {i + 1}.
                    </span>
                    <input
                      type="text"
                      value={word}
                      onChange={(e) => {
                        const updated = [...seedWords];
                        updated[i] = e.target.value;
                        setSeedWords(updated);
                      }}
                      style={{
                        width: "100%", padding: "8px 10px", background: "#0b0e17",
                        border: "1px solid #374151", borderRadius: 6, color: "#fff",
                        fontSize: 14, outline: "none", boxSizing: "border-box",
                        fontFamily: "monospace",
                      }}
                    />
                  </div>
                ))}
              </div>

              {withdrawError && (
                <div style={{
                  background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
                  borderRadius: 8, padding: "12px 14px", marginBottom: 16,
                  fontSize: 13, color: "#ef4444", lineHeight: 1.5,
                }}>
                  {withdrawError}
                </div>
              )}

              <div style={{ display: "flex", gap: 10 }}>
                <button type="button" onClick={() => { setShowWithdraw(false); setWithdrawError(""); setSeedWords(Array(12).fill("")); }} style={{
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
            {formatMoney(totalValue)}
          </div>
          <div style={{ fontSize: 14, color: "#00d4aa", marginTop: 4 }}>
            +$127,432.18 (1.72%) hoy
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
            <button onClick={() => setShowWithdraw(true)} style={{
              flex: 1, padding: "12px", background: "transparent",
              border: "1px solid #374151", borderRadius: 10, color: "#fff", fontSize: 15,
              fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
            }}>
              Retirar
            </button>
          </div>
        </div>

        {/* Portfolio */}
        <h3 style={{ fontSize: 16, color: "#9ca3af", fontWeight: 600, marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>
          Activos
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {PORTFOLIO.map((c) => {
            const value = c.amount * c.price;
            const pct = (value / totalValue) * 100;
            return (
              <div key={c.id} style={{
                background: "#111827", border: "1px solid #1f2937", borderRadius: 12,
                padding: "18px 20px", display: "flex", alignItems: "center", gap: 16,
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
