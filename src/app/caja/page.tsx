"use client";

import { useState } from "react";

interface Tool {
  id: string;
  name: string;
  x: number;
  y: number;
  rotation: number;
  width: number;
  height: number;
  render: () => React.ReactNode;
}

const TOOLS: Tool[] = [
  {
    id: "wrench",
    name: "Llave inglesa",
    x: 15, y: 18, rotation: -25, width: 140, height: 38,
    render: () => (
      <div style={{ width: 140, height: 38, position: "relative" }}>
        {/* Handle */}
        <div style={{
          position: "absolute", left: 0, top: 10, width: 90, height: 18,
          background: "linear-gradient(180deg, #7a7a7a 0%, #555 40%, #666 60%, #4a4a4a 100%)",
          borderRadius: "3px 2px 2px 3px",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 4px rgba(0,0,0,0.5)",
        }}>
          {/* Grip lines */}
          {[20, 30, 40, 50, 60].map(l => (
            <div key={l} style={{ position: "absolute", left: l, top: 3, width: 1, height: 12, background: "rgba(0,0,0,0.2)" }} />
          ))}
        </div>
        {/* Jaw */}
        <div style={{
          position: "absolute", right: 0, top: 2, width: 48, height: 34,
          background: "linear-gradient(180deg, #888 0%, #666 50%, #555 100%)",
          borderRadius: "2px 8px 8px 2px",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 4px rgba(0,0,0,0.4)",
        }}>
          {/* Mouth */}
          <div style={{ position: "absolute", right: 6, top: 8, width: 14, height: 18, background: "#333", borderRadius: 2 }} />
          {/* Gear wheel */}
          <div style={{ position: "absolute", left: 8, top: 11, width: 12, height: 12, borderRadius: "50%", background: "radial-gradient(circle, #999 30%, #666 70%)", border: "1px solid #555" }} />
        </div>
      </div>
    ),
  },
  {
    id: "screwdriver",
    name: "Destornillador plano",
    x: 55, y: 22, rotation: 5, width: 150, height: 24,
    render: () => (
      <div style={{ width: 150, height: 24, position: "relative" }}>
        {/* Handle */}
        <div style={{
          position: "absolute", left: 0, top: 2, width: 60, height: 20,
          background: "linear-gradient(180deg, #e8a020 0%, #c8400a 40%, #b03808 100%)",
          borderRadius: "8px 4px 4px 8px",
          boxShadow: "inset 0 2px 0 rgba(255,255,255,0.25), 0 2px 4px rgba(0,0,0,0.4)",
        }}>
          {/* Grip ridges */}
          {[12, 22, 32, 42].map(l => (
            <div key={l} style={{ position: "absolute", left: l, top: 2, width: 4, height: 16, background: "rgba(0,0,0,0.15)", borderRadius: 2 }} />
          ))}
        </div>
        {/* Shaft */}
        <div style={{
          position: "absolute", left: 58, top: 8, width: 70, height: 8,
          background: "linear-gradient(180deg, #aaa 0%, #777 50%, #888 100%)",
          borderRadius: 1,
          boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
        }} />
        {/* Tip */}
        <div style={{
          position: "absolute", right: 0, top: 9, width: 22, height: 6,
          background: "linear-gradient(180deg, #999 0%, #666 100%)",
          borderRadius: "0 2px 2px 0",
        }} />
      </div>
    ),
  },
  {
    id: "pliers",
    name: "Alicates",
    x: 30, y: 55, rotation: 40, width: 130, height: 50,
    render: () => (
      <div style={{ width: 130, height: 50, position: "relative" }}>
        {/* Handle left */}
        <div style={{
          position: "absolute", left: 0, top: 28, width: 55, height: 18,
          background: "linear-gradient(180deg, #d44020 0%, #a02010 100%)",
          borderRadius: "8px 2px 2px 8px",
          transform: "rotate(5deg)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 3px rgba(0,0,0,0.4)",
        }} />
        {/* Handle right */}
        <div style={{
          position: "absolute", left: 0, top: 6, width: 55, height: 18,
          background: "linear-gradient(180deg, #d44020 0%, #a02010 100%)",
          borderRadius: "8px 2px 2px 8px",
          transform: "rotate(-5deg)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 3px rgba(0,0,0,0.4)",
        }} />
        {/* Pivot */}
        <div style={{
          position: "absolute", left: 50, top: 16, width: 18, height: 18,
          borderRadius: "50%", background: "radial-gradient(circle, #999 30%, #555 80%)",
          border: "2px solid #444",
          boxShadow: "0 1px 3px rgba(0,0,0,0.5)",
          zIndex: 2,
        }} />
        {/* Jaw top */}
        <div style={{
          position: "absolute", left: 64, top: 8, width: 60, height: 12,
          background: "linear-gradient(180deg, #888 0%, #666 100%)",
          borderRadius: "2px 4px 2px 2px",
          transform: "rotate(-3deg)",
        }}>
          {/* Teeth */}
          {[8, 18, 28, 38, 48].map(l => (
            <div key={l} style={{ position: "absolute", left: l, bottom: 0, width: 3, height: 4, background: "#444" }} />
          ))}
        </div>
        {/* Jaw bottom */}
        <div style={{
          position: "absolute", left: 64, top: 30, width: 60, height: 12,
          background: "linear-gradient(180deg, #777 0%, #555 100%)",
          borderRadius: "2px 2px 4px 2px",
          transform: "rotate(3deg)",
        }}>
          {[8, 18, 28, 38, 48].map(l => (
            <div key={l} style={{ position: "absolute", left: l, top: 0, width: 3, height: 4, background: "#444" }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "tape",
    name: "Cinta aislante",
    x: 68, y: 60, rotation: 0, width: 56, height: 56,
    render: () => (
      <div style={{ width: 56, height: 56, position: "relative" }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          background: "radial-gradient(circle, #333 28%, #111 30%, #222 32%, #111 80%, #1a1a1a 100%)",
          boxShadow: "inset 0 2px 4px rgba(255,255,255,0.1), 0 3px 6px rgba(0,0,0,0.5)",
        }}>
          {/* Inner hole */}
          <div style={{
            position: "absolute", top: 16, left: 16, width: 24, height: 24,
            borderRadius: "50%", background: "radial-gradient(circle, #444 0%, #2a2a2a 100%)",
            border: "1px solid #555",
          }} />
        </div>
      </div>
    ),
  },
  {
    id: "socketwrench",
    name: "Llave de tubo",
    x: 10, y: 65, rotation: -10, width: 120, height: 30,
    render: () => (
      <div style={{ width: 120, height: 30, position: "relative" }}>
        {/* Bar */}
        <div style={{
          position: "absolute", left: 0, top: 10, width: 100, height: 10,
          background: "linear-gradient(180deg, #999 0%, #666 50%, #777 100%)",
          borderRadius: 2,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 3px rgba(0,0,0,0.4)",
        }} />
        {/* Socket end */}
        <div style={{
          position: "absolute", right: 0, top: 3, width: 24, height: 24,
          background: "linear-gradient(135deg, #888 0%, #555 100%)",
          borderRadius: 3, transform: "rotate(45deg)",
          boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
        }}>
          <div style={{ position: "absolute", top: 6, left: 6, width: 12, height: 12, background: "#333", borderRadius: 2 }} />
        </div>
        {/* Handle knob */}
        <div style={{
          position: "absolute", left: -2, top: 5, width: 16, height: 20,
          background: "linear-gradient(180deg, #777 0%, #444 100%)",
          borderRadius: "6px 3px 3px 6px",
        }} />
      </div>
    ),
  },
];

export default function CajaPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [showPaper, setShowPaper] = useState(false);
  const [openingAnim, setOpeningAnim] = useState(false);

  function handleOpen() {
    if (isOpen) return;
    setOpeningAnim(true);
    setTimeout(() => {
      setIsOpen(true);
      setOpeningAnim(false);
    }, 600);
  }

  const selectedToolData = TOOLS.find(t => t.id === selectedTool);

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at center, #2a2218 0%, #1a1510 50%, #0d0a08 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      {/* Wood grain texture overlay */}
      <div style={{
        position: "fixed", inset: 0, opacity: 0.03, pointerEvents: "none",
        backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(139,110,70,0.3) 20px, rgba(139,110,70,0.3) 21px)",
      }} />

      {/* Tool zoom modal */}
      {selectedTool && selectedToolData && (
        <div
          onClick={() => setSelectedTool(null)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 9999,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              transform: "scale(3)",
              filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.8))",
              marginBottom: 60,
            }}
          >
            {selectedToolData.render()}
          </div>
          <div style={{ color: "#aaa", fontSize: 16, fontWeight: 500, transform: "translateY(-20px)" }}>
            {selectedToolData.name}
          </div>
          <div style={{ color: "#555", fontSize: 12, marginTop: 8 }}>Click para cerrar</div>
        </div>
      )}

      {/* Paper modal */}
      {showPaper && (
        <div
          onClick={() => setShowPaper(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 9999,
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "fadeIn 0.3s ease-out",
          }}
        >
          <style>{`
            @keyframes unfold {
              0% { transform: scale(0.3) rotate(-8deg); opacity: 0; }
              40% { transform: scale(0.7) rotate(-3deg); opacity: 1; }
              70% { transform: scale(1.05) rotate(0.5deg); }
              100% { transform: scale(1) rotate(-0.5deg); }
            }
          `}</style>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "linear-gradient(175deg, #f5f0e4 0%, #ede6d4 50%, #e4dcc8 100%)",
              width: 480, maxWidth: "90vw", padding: "40px 44px",
              position: "relative",
              fontFamily: "'Times New Roman', Georgia, serif",
              color: "#1a1a1a",
              boxShadow: "0 8px 40px rgba(0,0,0,0.6), inset 0 0 80px rgba(139,119,80,0.1)",
              animation: "unfold 0.6s ease-out forwards",
              lineHeight: 1.7,
            }}
          >
            {/* Fold creases */}
            <div style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: 1, background: "rgba(120,100,60,0.12)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: 0, left: "50%", width: 1, height: "100%", background: "rgba(120,100,60,0.12)", pointerEvents: "none" }} />

            {/* Stain */}
            <div style={{
              position: "absolute", top: 20, right: 30, width: 70, height: 60, borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(139,110,60,0.1) 0%, transparent 70%)", pointerEvents: "none",
            }} />

            <div style={{ fontSize: 14, lineHeight: 1.8, textAlign: "justify" }}>
              <p style={{ marginBottom: 14 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p style={{ marginBottom: 14 }}>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </div>

            {/* Close hint */}
            <div style={{ textAlign: "center", marginTop: 20, fontSize: 11, color: "#999", fontFamily: "Arial, sans-serif" }}>
              Click fuera para cerrar
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 10 }}>

        {/* Toolbox */}
        <div style={{ position: "relative", width: 420, maxWidth: "92vw" }}>

          {/* === CLOSED STATE === */}
          {!isOpen && (
            <div
              onClick={handleOpen}
              style={{
                cursor: "pointer",
                position: "relative",
                transition: "transform 0.2s",
              }}
            >
              {/* Box body */}
              <div style={{
                width: "100%", height: 120,
                background: "linear-gradient(180deg, #c62020 0%, #8a1515 60%, #6a0e0e 100%)",
                borderRadius: "4px 4px 6px 6px",
                boxShadow: "0 8px 30px rgba(0,0,0,0.6), inset 0 -4px 8px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.1)",
                position: "relative",
              }}>
                {/* Metal trim */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 6,
                  background: "linear-gradient(180deg, #999 0%, #666 100%)",
                  borderRadius: "4px 4px 0 0",
                }} />
                {/* Label plate */}
                <div style={{
                  position: "absolute", top: 30, left: "50%", transform: "translateX(-50%)",
                  background: "linear-gradient(180deg, #ddd 0%, #aaa 100%)",
                  padding: "4px 20px", borderRadius: 2,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
                  fontSize: 11, fontWeight: 700, color: "#333", letterSpacing: 2,
                  textTransform: "uppercase", fontFamily: "Arial, sans-serif",
                }}>
                  HERRAMIENTAS
                </div>
                {/* Corner rivets */}
                {[{ l: 12, t: 14 }, { r: 12, t: 14 }, { l: 12, b: 14 }, { r: 12, b: 14 }].map((pos, i) => (
                  <div key={i} style={{
                    position: "absolute", ...pos, width: 8, height: 8, borderRadius: "50%",
                    background: "radial-gradient(circle, #aaa 30%, #666 80%)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.4)",
                  }} />
                ))}
              </div>

              {/* Lid */}
              <div style={{
                position: "absolute", top: -50, left: -4, right: -4, height: 56,
                background: "linear-gradient(180deg, #dd2828 0%, #b01818 60%, #901010 100%)",
                borderRadius: "6px 6px 0 0",
                boxShadow: "0 -4px 15px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.15)",
                transformOrigin: "bottom center",
                transition: "transform 0.6s ease-in-out",
                transform: openingAnim ? "perspective(600px) rotateX(-95deg)" : "perspective(600px) rotateX(0deg)",
              }}>
                {/* Latch */}
                <div style={{
                  position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)",
                  width: 40, height: 16,
                  background: "linear-gradient(180deg, #ccc 0%, #888 100%)",
                  borderRadius: "3px 3px 0 0",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                }}>
                  <div style={{ position: "absolute", top: 4, left: "50%", transform: "translateX(-50%)", width: 8, height: 8, borderRadius: "50%", background: "#555", border: "1px solid #444" }} />
                </div>
                {/* Metal trim top */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 4,
                  background: "linear-gradient(180deg, #aaa 0%, #777 100%)",
                  borderRadius: "6px 6px 0 0",
                }} />
                {/* Handle */}
                <div style={{
                  position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                  width: 80, height: 18, borderRadius: "10px 10px 0 0",
                  background: "linear-gradient(180deg, #888 0%, #555 100%)",
                  boxShadow: "0 -2px 6px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.15)",
                }} />
              </div>

              <div style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "#665544", letterSpacing: 1 }}>
                {openingAnim ? "Abriendo..." : "Click para abrir"}
              </div>
            </div>
          )}

          {/* === OPEN STATE === */}
          {isOpen && (
            <div>
              {/* Lid (flipped back) */}
              <div style={{
                width: "calc(100% + 8px)", height: 36, marginLeft: -4,
                background: "linear-gradient(0deg, #dd2828 0%, #b01818 60%, #901010 100%)",
                borderRadius: "6px 6px 0 0",
                boxShadow: "0 -2px 8px rgba(0,0,0,0.2), inset 0 -2px 0 rgba(255,255,255,0.1)",
                marginBottom: 2,
                opacity: 0.6,
              }} />

              {/* Open box interior */}
              <div style={{
                width: "100%", height: 300, position: "relative",
                background: "linear-gradient(180deg, #2a2220 0%, #1e1a18 50%, #181412 100%)",
                border: "4px solid",
                borderImage: "linear-gradient(180deg, #c62020, #6a0e0e) 1",
                boxShadow: "0 8px 30px rgba(0,0,0,0.7), inset 0 4px 20px rgba(0,0,0,0.5)",
                borderRadius: "0 0 4px 4px",
                overflow: "hidden",
              }}>
                {/* Interior metal tray lines */}
                <div style={{ position: "absolute", top: "33%", left: 0, right: 0, height: 1, background: "rgba(255,255,255,0.03)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: "66%", left: 0, right: 0, height: 1, background: "rgba(255,255,255,0.03)", pointerEvents: "none" }} />

                {/* Tools */}
                {TOOLS.map(tool => (
                  <div
                    key={tool.id}
                    onClick={() => setSelectedTool(tool.id)}
                    style={{
                      position: "absolute",
                      left: `${tool.x}%`,
                      top: `${tool.y}%`,
                      transform: `rotate(${tool.rotation}deg)`,
                      cursor: "pointer",
                      transition: "filter 0.2s, transform 0.2s",
                      filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.6))",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.filter = "drop-shadow(0 4px 12px rgba(200,160,50,0.4)) brightness(1.15)"; e.currentTarget.style.transform = `rotate(${tool.rotation}deg) scale(1.08)`; }}
                    onMouseLeave={e => { e.currentTarget.style.filter = "drop-shadow(0 3px 6px rgba(0,0,0,0.6))"; e.currentTarget.style.transform = `rotate(${tool.rotation}deg) scale(1)`; }}
                  >
                    {tool.render()}
                  </div>
                ))}

                {/* Hidden paper at the bottom */}
                <div
                  onClick={() => setShowPaper(true)}
                  style={{
                    position: "absolute",
                    bottom: 8,
                    left: "50%",
                    transform: "translateX(-50%) rotate(2deg)",
                    width: 100,
                    height: 30,
                    background: "linear-gradient(175deg, #e8e0c8 0%, #d8d0b8 100%)",
                    borderRadius: 2,
                    cursor: "pointer",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
                    transition: "all 0.3s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(200,180,100,0.4)";
                    e.currentTarget.style.transform = "translateX(-50%) rotate(2deg) scale(1.1)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.5)";
                    e.currentTarget.style.transform = "translateX(-50%) rotate(2deg) scale(1)";
                  }}
                >
                  {/* Fold lines on paper */}
                  <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "rgba(120,100,60,0.15)", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", top: 0, left: "50%", width: 1, height: "100%", background: "rgba(120,100,60,0.15)", pointerEvents: "none" }} />
                  {/* Hint text */}
                  <span style={{
                    fontSize: 8, color: "#8a7a5a", fontFamily: "Arial, sans-serif",
                    letterSpacing: 0.5, textTransform: "uppercase", opacity: 0.7,
                  }}>
                    Papel doblado
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
