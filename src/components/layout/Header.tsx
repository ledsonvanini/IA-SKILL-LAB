"use client";

import Link from "next/link";
import { ShoppingCart, Sun, Moon, Search, Tag } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useCart } from "@/contexts/CartContext";

interface HeaderProps {
  onShowCoupons: () => void;
}

export function Header({ onShowCoupons }: HeaderProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const { totalItems, toggleCart } = useCart();

  return (
    <header className="Header-Público sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center h-14 sm:h-16 gap-2 sm:gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-1.5 sm:gap-2 text-[var(--color-primary)] flex-shrink-0"
            aria-label="META21 - Página inicial"
          >
            <span className="w-8 h-8 sm:w-9 sm:h-9 bg-[var(--color-primary)] rounded-lg flex items-center justify-center text-white text-xs sm:text-sm font-black shadow-sm">
              M
            </span>
            <h2 className="text-lg sm:text-xl font-black tracking-tight uppercase hidden sm:block">
              Meta21
            </h2>
          </Link>

          {/* Search */}
          <div className="flex-1 min-w-0 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-[var(--muted)] pointer-events-none">
              <Search size={14} className="sm:hidden" />
              <Search size={16} className="hidden sm:block" />
            </div>
            <input
              placeholder="Buscar..."
              className="block w-full rounded-lg border border-[var(--border)]
                bg-[var(--surface)] text-[var(--foreground)] text-sm
                placeholder:text-[var(--muted)]
                transition-colors duration-[var(--duration-fast)]
                focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)]
                pl-9 sm:pl-10 pr-3 py-2"
              aria-label="Buscar produtos"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-0 sm:gap-1 flex-shrink-0">
            {/* Cupom */}
            <button
              onClick={onShowCoupons}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[var(--muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-colors rounded-lg"
              title="Cupons de Desconto"
              aria-label="Abrir cupons de desconto"
            >
              <Tag size={15} />
              <span className="hidden lg:inline">Cupons</span>
            </button>

            {/* Theme */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 text-[var(--muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-colors rounded-lg"
              title={
                resolvedTheme === "light" ? "Modo escuro" : "Modo claro"
              }
              aria-label={`Alternar para modo ${resolvedTheme === "light" ? "escuro" : "claro"}`}
            >
              {resolvedTheme === "light" ? (
                <Moon size={18} />
              ) : (
                <Sun size={18} />
              )}
            </button>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="p-1.5 sm:p-2 text-[var(--muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-colors rounded-lg relative"
              aria-label="Carrinho de compras"
            >
              <ShoppingCart size={18} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-primary)] text-[10px] font-bold text-white">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
