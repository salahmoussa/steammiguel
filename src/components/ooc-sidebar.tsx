"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Inicio", desc: "Landing principal" },
  { href: "/desguace", label: "Desguace", desc: "Piezas y vehiculos" },
  { href: "/foro", label: "5chan", desc: "Foro anonimo" },
  { href: "/wallet", label: "Wallet", desc: "Movimientos bancarios" },
];

/**
 * Modal OOC — acceso rapido a todas las paginas disponibles.
 * NO debe verse en stream: oculto por defecto, sin boton visible.
 * Toggle solo por teclado: Ctrl+Shift+O. Cerrar: Esc o click fuera.
 */
export function OocSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "O" || e.key === "o")) {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Panel OOC"
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-lg border border-card-border bg-card text-foreground shadow-2xl">
        <div className="px-5 py-4 border-b border-card-border flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted">
              OOC · Fuera de personaje
            </div>
            <div className="text-sm font-semibold text-accent">
              Navegacion rapida
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-muted hover:text-foreground text-xs border border-card-border rounded px-2 py-1"
            aria-label="Cerrar"
          >
            ESC
          </button>
        </div>

        <div className="p-4 grid grid-cols-2 gap-3">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded-md border p-3 transition-colors ${
                  isActive
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-card-border hover:border-accent hover:bg-accent/5 text-foreground/90"
                }`}
              >
                <div className="text-sm font-semibold">{link.label}</div>
                <div className="text-[11px] text-muted mt-0.5">{link.desc}</div>
              </Link>
            );
          })}
        </div>

        <div className="px-5 py-2 border-t border-card-border text-[10px] text-muted text-center">
          Ctrl + Shift + O para abrir/cerrar
        </div>
      </div>
    </div>
  );
}
