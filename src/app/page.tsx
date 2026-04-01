import Link from "next/link";

const sections = [
  {
    href: "/foro",
    title: "5chan",
    description: "Hilos de discusion, lore, historias y shitposting del servidor.",
    icon: "💬",
  },
  {
    href: "/desguace",
    title: "Desguace",
    description: "Inventario de piezas, vehiculos y materiales disponibles.",
    icon: "🔧",
  },
  {
    href: "/wallet",
    title: "Wallet",
    description: "Balance de cuentas, transacciones y movimientos.",
    icon: "💰",
  },
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">
          Steam<span className="text-accent">Miguel</span>
        </h1>
        <p className="text-muted">Lore tracker del servidor de RolePlay</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="border border-card-border bg-card rounded-xl p-6 hover:border-accent/50 transition-colors group"
          >
            <span className="text-3xl">{s.icon}</span>
            <h2 className="text-lg font-semibold mt-3 group-hover:text-accent transition-colors">
              {s.title}
            </h2>
            <p className="text-muted text-sm mt-1">{s.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
