import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-3.5rem)] flex flex-col">
      {/* Scanline / noise overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
        }}
      />

      {/* Radial glow behind hero */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/5 rounded-full blur-[160px]" />

      {/* Floating particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="pointer-events-none fixed rounded-full bg-accent/40"
          style={{
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            left: `${8 + (i * 7.5)}%`,
            animation: `float-particle ${14 + (i % 6) * 3}s linear infinite`,
            animationDelay: `${i * 1.2}s`,
          }}
        />
      ))}

      {/* ── Hero ── */}
      <section className="relative z-20 flex flex-col items-center justify-center pt-24 pb-16 px-4 text-center">
        {/* Decorative line */}
        <div className="w-12 h-px bg-accent/40 mb-8" />

        <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-none glitch-text">
          Itss<span className="text-accent">Miikey</span>
        </h1>

        <p className="mt-4 text-muted text-sm sm:text-base tracking-[0.25em] uppercase font-mono">
          Red privada de Los Santos
        </p>

        <p className="mt-2 text-muted/60 text-xs font-mono">
          Acceso restringido &middot; Canal cifrado &middot; Sin rastro
        </p>

        {/* Decorative line */}
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent mt-8" />
      </section>

      {/* ── Section cards ── */}
      <section className="relative z-20 flex-1 max-w-5xl w-full mx-auto px-4 pb-20">
        <div className="grid gap-5 sm:grid-cols-3">
          {/* 5chan */}
          <Link
            href="/foro"
            className="group relative border border-card-border bg-card/80 backdrop-blur-sm rounded-2xl p-6 hover:border-accent/40 transition-all duration-300 hover:shadow-[0_0_40px_-12px_rgba(34,197,94,0.15)] overflow-hidden fade-in-up fade-in-up-1"
          >
            {/* Corner glow on hover */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-accent/0 group-hover:bg-accent/10 rounded-full blur-2xl transition-all duration-500" />

            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">💬</span>
              <span className="text-[10px] font-mono text-muted bg-background/50 px-2 py-0.5 rounded-full border border-card-border">
                ACTIVO
              </span>
            </div>

            <h2 className="text-lg font-bold group-hover:text-accent transition-colors">
              5chan
            </h2>
            <p className="text-muted text-sm mt-1 leading-relaxed">
              Hilos de discusion, lore, historias y shitposting del servidor.
            </p>

            <div className="mt-4 pt-3 border-t border-card-border/50 flex items-center gap-3 text-[11px] font-mono text-muted/70">
              <span>◉ Anonimo</span>
              <span className="text-accent/50">|</span>
              <span>Sin moderacion</span>
            </div>
          </Link>

          {/* Desguace */}
          <Link
            href="/desguace"
            className="group relative border border-card-border bg-card/80 backdrop-blur-sm rounded-2xl p-6 hover:border-accent/40 transition-all duration-300 hover:shadow-[0_0_40px_-12px_rgba(34,197,94,0.15)] overflow-hidden fade-in-up fade-in-up-2"
          >
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-accent/0 group-hover:bg-accent/10 rounded-full blur-2xl transition-all duration-500" />

            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">🔧</span>
              <span className="text-[10px] font-mono text-muted bg-background/50 px-2 py-0.5 rounded-full border border-card-border">
                STOCK
              </span>
            </div>

            <h2 className="text-lg font-bold group-hover:text-accent transition-colors">
              Desguace
            </h2>
            <p className="text-muted text-sm mt-1 leading-relaxed">
              Inventario de piezas, vehiculos y materiales disponibles.
            </p>

            <div className="mt-4 pt-3 border-t border-card-border/50 flex items-center gap-3 text-[11px] font-mono text-muted/70">
              <span>◉ Catalogo</span>
              <span className="text-accent/50">|</span>
              <span>Precios en negro</span>
            </div>
          </Link>

          {/* Wallet */}
          <Link
            href="/wallet"
            className="group relative border border-card-border bg-card/80 backdrop-blur-sm rounded-2xl p-6 hover:border-accent/40 transition-all duration-300 hover:shadow-[0_0_40px_-12px_rgba(34,197,94,0.15)] overflow-hidden fade-in-up fade-in-up-3"
          >
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-accent/0 group-hover:bg-accent/10 rounded-full blur-2xl transition-all duration-500" />

            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">💰</span>
              <span className="text-[10px] font-mono text-muted bg-background/50 px-2 py-0.5 rounded-full border border-card-border">
                CIFRADO
              </span>
            </div>

            <h2 className="text-lg font-bold group-hover:text-accent transition-colors">
              Wallet
            </h2>
            <p className="text-muted text-sm mt-1 leading-relaxed">
              Balance de cuentas, transacciones y movimientos.
            </p>

            <div className="mt-4 pt-3 border-t border-card-border/50 flex items-center gap-3 text-[11px] font-mono text-muted/70">
              <span>◉ Offshore</span>
              <span className="text-accent/50">|</span>
              <span>Sin limites</span>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-20 border-t border-card-border/30 py-6 px-4 text-center">
        <p className="text-[11px] font-mono text-muted/40 tracking-wider">
          ESTE SISTEMA NO EXISTE &middot; LSPD NO TIENE JURISDICCION AQUI &middot;{" "}
          <span className="group/ip cursor-default">
            <span className="group-hover/ip:hidden">127.0.0.1</span>
            <span className="hidden group-hover/ip:inline text-accent/60">127.0.0.1:4471</span>
          </span>
        </p>
      </footer>
    </div>
  );
}
