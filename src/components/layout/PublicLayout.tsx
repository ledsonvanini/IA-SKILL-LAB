"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Sun, Moon, Type, Flame } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useFontControl } from "@/contexts/FontControlContext";
import { useCart } from "@/contexts/CartContext";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface PublicLayoutProps {
  children: ReactNode;
}

interface NavLink {
  href: string;
  label: string;
  icon?: LucideIcon;
}

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/categorias", label: "Categorias" },
  { href: "/ofertas", label: "Ofertas da Semana", icon: Flame },
  { href: "/unidades", label: "Unidades" },
];


export function PublicLayout({ children }: PublicLayoutProps) {
  const pathname = usePathname();
  const { resolvedTheme, toggleTheme } = useTheme();
  const { cycleFontSize, label } = useFontControl();
  const { totalItems, toggleCart } = useCart();

  return (
    <div className="Página-Pública relative flex min-h-screen w-full flex-col overflow-x-hidden">
      {/* ── Header ── */}
      <header className="Header-Público sticky top-0 z-50 w-full bg-[var(--surface)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo + Nav */}
            <div className="flex items-center gap-8">
              <Link
                href="/"
                className="flex items-center gap-2 text-[var(--color-primary)]"
                aria-label="META21 - Página inicial"
              >
                <span className="w-8 h-8 bg-[var(--color-primary)] rounded-lg flex items-center justify-center text-white text-sm font-black">
                  M
                </span>
                <h2 className="text-xl font-black tracking-tight uppercase">
                  Meta21
                </h2>
              </Link>

              <nav
                className="hidden md:flex items-center gap-6"
                aria-label="Navegação principal"
              >
                {NAV_LINKS.map(({ href, label: linkLabel, icon: Icon }) => {
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={`flex items-center gap-1 text-sm font-semibold transition-colors ${
                        isActive
                          ? "text-[var(--color-primary)]"
                          : "text-[var(--muted)] hover:text-[var(--color-primary)]"
                      }`}
                    >
                      {Icon && <Icon size={14} />}
                      {linkLabel}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Search (desktop) */}
            <div className="flex-1 max-w-md mx-8 hidden lg:block">
              <div className="relative">
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-[var(--border)] rounded-lg bg-zinc-50 dark:bg-zinc-800 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] text-sm placeholder:text-[var(--muted)]"
                  placeholder="O que você procura hoje?"
                  type="text"
                  aria-label="Buscar produtos"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={cycleFontSize}
                className="p-2 text-[var(--muted)] hover:text-[var(--color-primary)] transition-colors rounded-lg hidden sm:flex items-center gap-1 text-xs font-bold"
                title={`Tamanho da fonte: ${label}`}
                aria-label={`Alterar tamanho da fonte. Atual: ${label}`}
              >
                <Type size={14} />
                {label}
              </button>

              <button
                onClick={toggleTheme}
                className="p-2 text-[var(--muted)] hover:text-[var(--color-primary)] transition-colors"
                title={
                  resolvedTheme === "light" ? "Modo escuro" : "Modo claro"
                }
                aria-label={`Alternar para modo ${resolvedTheme === "light" ? "escuro" : "claro"}`}
              >
                {resolvedTheme === "light" ? (
                  <Moon size={20} />
                ) : (
                  <Sun size={20} />
                )}
              </button>

              <button
                onClick={toggleCart}
                className="p-2 text-[var(--muted)] hover:text-[var(--color-primary)] transition-colors relative"
                aria-label="Carrinho de compras"
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-primary)] text-[10px] font-bold text-white">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </button>

              <button
                className="p-2 text-[var(--muted)] hover:text-[var(--color-primary)] transition-colors"
                aria-label="Minha conta"
              >
                <User size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="Conteúdo-Principal flex-grow">{children}</main>

      {/* ── Footer ── */}
      <footer className="Rodapé bg-zinc-900 text-zinc-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 text-[var(--color-primary)] mb-4">
                <span className="w-8 h-8 bg-[var(--color-primary)] rounded-lg flex items-center justify-center text-white text-sm font-black">
                  M
                </span>
                <h2 className="text-xl font-black tracking-tight text-white uppercase">
                  Meta21
                </h2>
              </div>
              <p className="text-sm leading-relaxed">
                O melhor do seu dia a dia está aqui. Qualidade, preço justo e o
                atendimento que você merece.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Institucional</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[var(--color-primary)] transition-colors"
                  >
                    Sobre o Meta21
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[var(--color-primary)] transition-colors"
                  >
                    Nossas Lojas
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[var(--color-primary)] transition-colors"
                  >
                    Trabalhe Conosco
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Suporte</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[var(--color-primary)] transition-colors"
                  >
                    Atendimento ao Cliente
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[var(--color-primary)] transition-colors"
                  >
                    Política de Privacidade
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Contato</h4>
              <p className="text-sm mb-2">(11) 98765-4321</p>
              <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                WhatsApp
              </span>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-800 text-center text-xs">
            <p>© 2026 META21 Supermercados. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* ── Bottom Nav Mobile (PWA-ready) ── */}
      <nav
        className="BottomNav-Mobile fixed bottom-0 left-0 right-0 z-50 bg-[var(--surface)] border-t border-[var(--border)] md:hidden"
        aria-label="Navegação mobile"
      >
        <div className="flex items-center justify-around h-14">
          {NAV_LINKS.slice(0, 4).map(({ href, label: linkLabel, icon: Icon }) => {
            const isActive = pathname === href;
            const NavIcon = Icon ?? Flame;
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
                <NavIcon size={18} />
                {linkLabel}
              </Link>
            );
          })}
          <Link
            href="/minha-conta"
            className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold py-1 ${
              pathname === "/minha-conta"
                ? "text-[var(--color-primary)]"
                : "text-[var(--muted)]"
            }`}
          >
            <User size={18} />
            Conta
          </Link>
        </div>
      </nav>
    </div>
  );
}
