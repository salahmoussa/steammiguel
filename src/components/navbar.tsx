"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/foro", label: "5chan" },
  { href: "/desguace", label: "Desguace" },
  { href: "/wallet", label: "Wallet" },
];

export function Navbar() {
  const pathname = usePathname();
  const isForo = pathname.startsWith("/foro");
  const isWallet = pathname.startsWith("/wallet");

  // Hide navbar on wallet (it has its own top bar)
  if (isWallet) return null;

  return (
    <nav
      className={`border-b sticky top-0 z-50 transition-colors duration-300 ${
        isForo
          ? "bg-[#F0E0D6] border-[#D9BFB7]"
          : "bg-card/80 backdrop-blur-sm border-card-border"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-6">
        <Link
          href="/"
          className={`font-bold text-lg tracking-tight transition-colors ${
            isForo ? "text-[#800000]" : "text-accent"
          }`}
        >
          SteamMiguel
        </Link>
        <div className="flex gap-4 text-sm">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative transition-colors py-1 ${
                  isForo
                    ? isActive
                      ? "text-[#800000] font-semibold"
                      : "text-[#800000]/60 hover:text-[#800000]"
                    : isActive
                    ? "text-accent"
                    : "text-muted hover:text-accent"
                }`}
              >
                {link.label}
                {/* Active indicator bar */}
                {isActive && (
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 rounded-full ${
                      isForo ? "bg-[#800000]" : "bg-accent"
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
