"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Flame, Tag, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface BottomNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const NAV_ITEMS: BottomNavItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/ofertas", label: "Ofertas", icon: Flame },
  { href: "/cupons", label: "Cupons", icon: Tag },
  { href: "/minha-conta", label: "Conta", icon: User },
];

interface BottomNavProps {
  onShowCoupons: () => void;
}

export function BottomNav({ onShowCoupons }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className="BottomNav-Mobile fixed bottom-0 left-0 right-0 z-50 bg-[var(--surface)] border-t border-[var(--border)] md:hidden"
      aria-label="Navegação mobile"
    >
      <div className="flex items-center justify-around h-14">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;

          if (label === "Cupons") {
            return (
              <button
                key="cupons"
                onClick={onShowCoupons}
                className="flex flex-col items-center gap-0.5 text-[10px] font-semibold py-1 text-[var(--muted)]"
              >
                <Icon size={18} />
                {label}
              </button>
            );
          }

          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold py-1 ${
                isActive
                  ? "text-[var(--color-primary)]"
                  : "text-[var(--muted)]"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
