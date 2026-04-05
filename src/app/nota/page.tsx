"use client";

export default function NotaPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse at center, #2a2620 0%, #151210 70%, #0a0907 100%)",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        fontFamily: "'Segoe Script', 'Comic Sans MS', 'Bradley Hand', cursive",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle vignette / dust */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 30% 20%, rgba(139,110,70,0.05) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(100,80,50,0.05) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      {/* /do text */}
      <div
        style={{
          position: "relative",
          width: 380,
          maxWidth: "92vw",
          transform: "rotate(-1.8deg)",
        }}
      >
        <div
          style={{
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            fontSize: 14,
            color: "#22c55e",
            marginBottom: 12,
            paddingLeft: 4,
            letterSpacing: 0.3,
          }}
        >
          /do La nota esta cortada, se ve que falta la parte de arriba.
        </div>

        {/* Torn/redacted words above the paper */}
        <div
          style={{
            fontFamily: "'Segoe Script', 'Comic Sans MS', cursive",
            fontSize: 18,
            lineHeight: "28px",
            color: "#1a1a2e",
            paddingLeft: 54,
            marginBottom: -8,
            position: "relative",
          }}
        >
          {/* Three illegible redacted words */}
          <span style={{
            display: "inline-block",
            background: "#1a1a1a",
            color: "transparent",
            borderRadius: 2,
            padding: "1px 18px",
            marginRight: 10,
            opacity: 0.7,
            transform: "rotate(-0.5deg)",
            textDecoration: "line-through",
            textDecorationColor: "#1a1a1a",
          }}>palabra</span>
          <span style={{
            display: "inline-block",
            background: "#1a1a1a",
            color: "transparent",
            borderRadius: 2,
            padding: "1px 28px",
            marginRight: 10,
            opacity: 0.6,
            transform: "rotate(0.3deg)",
            textDecoration: "line-through",
            textDecorationColor: "#1a1a1a",
          }}>segunda</span>
          <span style={{
            display: "inline-block",
            background: "#1a1a1a",
            color: "transparent",
            borderRadius: 2,
            padding: "1px 14px",
            opacity: 0.75,
            transform: "rotate(-0.8deg)",
            textDecoration: "line-through",
            textDecorationColor: "#1a1a1a",
          }}>tres</span>
        </div>
      </div>

      {/* Paper */}
      <div
        style={{
          position: "relative",
          width: 380,
          maxWidth: "92vw",
          background:
            "linear-gradient(175deg, #faf5e8 0%, #f3ecd8 50%, #ebe2c8 100%)",
          padding: "36px 38px 42px",
          color: "#1a1a2e",
          transform: "rotate(-1.8deg)",
          boxShadow:
            "0 8px 40px rgba(0,0,0,0.7), 0 2px 6px rgba(0,0,0,0.4), inset 0 0 60px rgba(139,119,80,0.12)",
          /* Torn top edge */
          clipPath:
            "polygon(0% 4%, 3% 0%, 8% 5%, 14% 1%, 19% 6%, 25% 2%, 32% 7%, 38% 3%, 44% 8%, 51% 3%, 57% 7%, 64% 2%, 70% 6%, 76% 1%, 82% 7%, 89% 3%, 95% 8%, 100% 4%, 100% 100%, 0% 100%)",
        }}
      >
        {/* Notebook red margin line */}
        <div
          style={{
            position: "absolute",
            left: 32,
            top: 24,
            bottom: 0,
            width: 1,
            background: "rgba(200,60,60,0.35)",
            pointerEvents: "none",
          }}
        />

        {/* Ruled lines */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "repeating-linear-gradient(180deg, transparent 0px, transparent 31px, rgba(60,80,140,0.12) 31px, rgba(60,80,140,0.12) 32px)",
            pointerEvents: "none",
          }}
        />

        {/* Punch holes (top) */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 14,
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "radial-gradient(circle, #1a1a1a 30%, transparent 31%)",
            boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)",
            pointerEvents: "none",
          }}
        />

        {/* Coffee ring stain top-right */}
        <div
          style={{
            position: "absolute",
            top: 18,
            right: 30,
            width: 60,
            height: 60,
            borderRadius: "50%",
            border: "2px solid rgba(120,80,30,0.12)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 22,
            right: 36,
            width: 48,
            height: 48,
            borderRadius: "50%",
            border: "1px solid rgba(120,80,30,0.08)",
            pointerEvents: "none",
          }}
        />

        {/* Water stain bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 20,
            width: 80,
            height: 60,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(100,100,120,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Fold crease diagonal */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(135deg, transparent 48%, rgba(0,0,0,0.03) 49%, rgba(0,0,0,0.03) 51%, transparent 52%)",
            pointerEvents: "none",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            paddingLeft: 16,
            fontSize: 19,
            lineHeight: "32px",
            color: "#1e1e3a",
          }}
        >
          <div style={{ fontSize: 14, color: "#6a5030", marginBottom: 8, fontStyle: "italic" }}>
            — Anotar esto antes de que se me olvide —
          </div>

          <div style={{ marginBottom: 14 }}>User :</div>
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 17,
              color: "#0f0f2a",
              marginTop: -24,
              marginBottom: 14,
              letterSpacing: 1,
              paddingLeft: 62,
            }}
          >
            4827163
          </div>

          <div style={{ marginBottom: 14 }}>Pass :</div>
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 17,
              color: "#0f0f2a",
              marginTop: -24,
              marginBottom: 14,
              letterSpacing: 1,
              paddingLeft: 62,
            }}
          >
            perroNegro_33!
          </div>

          <div style={{ marginTop: 24, fontSize: 15, color: "#4a3520", fontStyle: "italic", position: "relative" }}>
            no se lo digas
            <span style={{
              position: "absolute",
              bottom: -2,
              left: 0,
              width: "100%",
              height: 6,
              background: "rgba(30,30,80,0.08)",
              borderRadius: 3,
              pointerEvents: "none",
            }} />
          </div>
          <div style={{ fontSize: 15, color: "#4a3520", fontStyle: "italic" }}>
            a <span style={{ textDecoration: "line-through", color: "#2a2010" }}>nadi</span> nadie
          </div>
        </div>

        {/* Ink smear */}
        <div
          style={{
            position: "absolute",
            top: 90,
            right: 45,
            width: 40,
            height: 8,
            background: "rgba(30,30,80,0.09)",
            borderRadius: 4,
            transform: "rotate(-20deg)",
            pointerEvents: "none",
          }}
        />

        {/* Faded overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(255,255,240,0.04) 0%, rgba(180,160,120,0.06) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Torn bottom edge shadow */}
        <div
          style={{
            position: "absolute",
            bottom: -2,
            left: 0,
            right: 0,
            height: 8,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}
