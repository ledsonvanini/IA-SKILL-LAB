"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  User,
  Sun,
  Moon,
  Search,
  Home,
  Flame,
  Tag,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useCart } from "@/contexts/CartContext";
import { UnitsPopover } from "@/components/shared/UnitsPopover";
import { CouponPopover } from "@/components/shared/CouponPopover";
import { WorkWithUsPopover } from "@/components/shared/WorkWithUsPopover";
import type { ReactNode } from "react";

interface PublicLayoutProps {
  children: ReactNode;
}

const BOTTOM_NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/ofertas", label: "Ofertas", icon: Flame },
  { href: "/cupons", label: "Cupons", icon: Tag },
  { href: "/minha-conta", label: "Conta", icon: User },
];

export function PublicLayout({ children }: PublicLayoutProps) {
  const pathname = usePathname();
  const { resolvedTheme, toggleTheme } = useTheme();
  const { totalItems, toggleCart } = useCart();
  const [showUnits, setShowUnits] = useState(false);
  const [showCoupons, setShowCoupons] = useState(false);
  const [showWorkWithUs, setShowWorkWithUs] = useState(false);

  return (
    <div className="Página-Pública relative flex min-h-screen w-full flex-col overflow-x-hidden">
      {/* ── Header ── */}
      <header className="Header-Público sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-14 sm:h-16 gap-3 sm:gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-[var(--color-primary)] flex-shrink-0"
              aria-label="META21 - Página inicial"
            >
              <span className="w-9 h-9 bg-[var(--color-primary)] rounded-lg flex items-center justify-center text-white text-sm font-black shadow-sm">
                M
              </span>
              <h2 className="text-xl font-black tracking-tight uppercase hidden sm:block">
                Meta21
              </h2>
            </Link>

            {/* Search */}
            <div className="flex-1 min-w-0">
              <div className="relative group">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)] group-focus-within:text-[var(--color-primary)] transition-colors"
                />
                <input
                  className="block w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 focus:border-[var(--color-primary)] transition-all"
                  placeholder="Busque seus produtos aqui..."
                  type="text"
                  aria-label="Buscar produtos"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
              {/* Cupom */}
              <button
                onClick={() => setShowCoupons(true)}
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
                className="p-2 text-[var(--muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-colors rounded-lg"
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
                className="p-2 text-[var(--muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-colors rounded-lg relative"
                aria-label="Carrinho de compras"
              >
                <ShoppingCart size={18} />
                {totalItems > 0 && (
                  <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-primary)] text-[10px] font-bold text-white">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </button>

              {/* Conta */}
              <button
                className="p-2 text-[var(--muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-colors rounded-lg"
                aria-label="Minha conta"
              >
                <User size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="Conteúdo-Principal flex-grow pb-16 md:pb-0">
        {children}
      </main>

      {/* ── Footer ── */}
      <footer className="Rodapé border-t border-[var(--border)] bg-[var(--surface)] hidden md:block">
        <FooterContent
          onShowUnits={() => setShowUnits(true)}
          onShowWorkWithUs={() => setShowWorkWithUs(true)}
        />
      </footer>

      {/* ── Bottom Nav Mobile ── */}
      <nav
        className="BottomNav-Mobile fixed bottom-0 left-0 right-0 z-50 bg-[var(--surface)] border-t border-[var(--border)] md:hidden"
        aria-label="Navegação mobile"
      >
        <div className="flex items-center justify-around h-14">
          {BOTTOM_NAV.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            if (label === "Cupons") {
              return (
                <button
                  key="cupons"
                  onClick={() => setShowCoupons(true)}
                  className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold py-1 text-[var(--muted)]`}
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

      {/* Popovers */}
      <UnitsPopover isOpen={showUnits} onClose={() => setShowUnits(false)} />
      <CouponPopover
        isOpen={showCoupons}
        onClose={() => setShowCoupons(false)}
      />
      <WorkWithUsPopover
        isOpen={showWorkWithUs}
        onClose={() => setShowWorkWithUs(false)}
      />
    </div>
  );
}

/* ── Footer Content (extracted to keep file clean) ── */
import {
  Phone,
  Mail,
  Instagram,
  Facebook,
  ChevronRight,
  MessageCircle,
} from "lucide-react";

function FooterContent({
  onShowUnits,
  onShowWorkWithUs,
}: {
  onShowUnits: () => void;
  onShowWorkWithUs: () => void;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-4 gap-10">
        {/* Col 1 */}
        <div>
          <div className="flex items-center gap-2 text-[var(--color-primary)] mb-4">
            <span className="w-8 h-8 bg-[var(--color-primary)] rounded-lg flex items-center justify-center text-white text-sm font-black">
              M
            </span>
            <span className="text-lg font-black tracking-tight uppercase">
              Meta21
            </span>
          </div>
          <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">
            O melhor do seu dia a dia está aqui. Qualidade, preço justo e
            atendimento que você merece.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[var(--border)] text-[var(--muted)] flex items-center justify-center hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[var(--border)] text-[var(--muted)] flex items-center justify-center hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={16} />
            </a>
          </div>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider mb-4">
            Institucional
          </h4>
          <ul className="space-y-3 text-sm text-[var(--muted)]">
            <li>
              <Link
                href="#"
                className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-1"
              >
                <ChevronRight size={12} /> Sobre o Meta21
              </Link>
            </li>
            <li>
              <button
                onClick={onShowUnits}
                className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-1"
              >
                <ChevronRight size={12} /> Nossas Lojas
              </button>
            </li>
            <li>
              <button
                onClick={onShowWorkWithUs}
                className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-1"
              >
                <ChevronRight size={12} /> Trabalhe Conosco
              </button>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-1"
              >
                <ChevronRight size={12} /> Política de Privacidade
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider mb-4">
            Atendimento
          </h4>
          <ul className="space-y-3 text-sm text-[var(--muted)]">
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-[var(--color-primary)]" />
              (11) 3456-7890
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle
                size={14}
                className="text-[var(--color-primary)]"
              />
              <a
                href="https://wa.me/5511987654321?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20o%20Meta21."
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-primary)] transition-colors"
              >
                (11) 98765-4321
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-[var(--color-primary)]" />
              contato@meta21.com.br
            </li>
          </ul>
        </div>

        {/* Col 4 */}
        <div>
          <h4 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider mb-4">
            Receba Ofertas
          </h4>
          <p className="text-sm text-[var(--muted)] mb-4">
            Cadastre seu e-mail e receba as melhores promoções.
          </p>
          <div className="flex gap-2">
            <input
              className="flex-1 px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 focus:border-[var(--color-primary)]"
              placeholder="Seu e-mail"
              type="email"
              aria-label="E-mail para newsletter"
            />
            <button className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-bold hover:bg-[var(--color-primary-hover)] transition-colors">
              Enviar
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--muted)]">
        <p>© 2026 META21 Supermercados. Todos os direitos reservados.</p>
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="hover:text-[var(--color-primary)] transition-colors"
          >
            Termos de Uso
          </Link>
          <Link
            href="#"
            className="hover:text-[var(--color-primary)] transition-colors"
          >
            Privacidade
          </Link>
        </div>
      </div>
    </div>
  );
}
