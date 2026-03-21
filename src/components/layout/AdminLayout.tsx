"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Tag,
  PlusCircle,
  History,
  Package,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  SendHorizontal,
  CalendarDays,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useOfferStorage } from "@/modules/offer-submission/presentation/offer-submission/useOfferStorage";

interface AdminLayoutProps {
  children: ReactNode;
}

const SIDEBAR_ITEMS = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Promoções",
    href: "/admin/promocoes",
    icon: Tag,
    children: [
      { label: "Visão Geral", href: "/admin/promocoes", icon: Tag },
      { label: "Nova Promoção", href: "/admin/promocoes/nova", icon: PlusCircle },
      { label: "Histórico", href: "/admin/promocoes/historico", icon: History },
    ],
  },
  {
    label: "Envio de Ofertas",
    href: "/admin/ofertas",
    icon: SendHorizontal,
    children: [
      { label: "Painel Principal", href: "/admin/ofertas", icon: SendHorizontal },
      { label: "Plan. Semanal", href: "/admin/ofertas/programacao-semanal", icon: CalendarDays },
      { label: "Plan. Mensal", href: "/admin/ofertas/programacao-mensal", icon: CalendarDays },
    ],
  },
  {
    label: "Produtos",
    href: "/admin/produtos",
    icon: Package,
    children: [
      { label: "Relatório", href: "/admin/produtos", icon: Package },
      { label: "Novo Produto", href: "/admin/produtos/novo", icon: PlusCircle },
    ],
  },
  {
    label: "Análises",
    href: "/admin/analises",
    icon: BarChart3,
  },
] as const;

function SidebarAccordion({
  item,
  pathname,
  isActive,
  hasNotification,
  userRole,
}: {
  item: typeof SIDEBAR_ITEMS[number];
  pathname: string;
  isActive: (href: string) => boolean;
  hasNotification: boolean;
  userRole?: string;
}) {
  // Se estiver numa rota filha, começamos o accordion aberto
  const isChildActive = "children" in item && item.children.some((c) => isActive(c.href) || pathname === c.href);
  const [isOpen, setIsOpen] = useState(isChildActive);

  if (!("children" in item)) {
    return (
      <Link
        href={item.href}
        className={`
          flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
          transition-colors
          ${
            isActive(item.href)
              ? "bg-[var(--color-primary-light)] text-[var(--color-primary)] border-l-4 border-[var(--color-primary)]"
              : "text-[var(--muted)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)]"
          }
        `}
      >
        <item.icon size={18} />
        <span className="flex-1">{item.label}</span>
      </Link>
    );
  }

  // Notificação específica de envio de ofertas
  const showBadge = item.href === "/admin/ofertas" && hasNotification;

  return (
    <div className="space-y-1">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-sm font-medium
          transition-colors
          ${
            isChildActive && !isOpen
              ? "bg-[var(--color-primary-light)]/50 text-[var(--color-primary)]"
              : "text-[var(--muted)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)]"
          }
        `}
      >
        <div className="flex items-center gap-3">
          <item.icon size={18} />
          <span>{item.label}</span>
        </div>
        <div className="flex items-center gap-2">
          {showBadge && (
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[var(--color-primary)] text-white text-[10px] font-black">
              1
            </span>
          )}
          {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
      </button>

      {isOpen && (
        <div className="mt-1 space-y-1">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className={`
                block pl-11 py-2 text-xs font-medium rounded-lg
                transition-colors
                ${
                  pathname === child.href
                    ? "text-[var(--color-primary)] bg-[var(--color-primary-light)]/30"
                    : "text-[var(--muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-light)]/20"
                }
              `}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { resolvedTheme, toggleTheme } = useTheme();
  const { hasAgencyNotification, hasManagerNotification } = useOfferStorage();
  
  const hasAnyOfferNotification = 
    (user?.role === "admin" && hasAgencyNotification) || 
    (user?.role === "manager" && hasManagerNotification);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div className="Página-Admin flex h-screen overflow-hidden">
      {/* ── Overlay mobile ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`
          Sidebar-Admin fixed md:static inset-y-0 left-0 z-50
          w-64 flex flex-col
          bg-[var(--surface)] border-r border-[var(--border)]
          transform transition-transform duration-[var(--duration-normal)]
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="bg-[var(--color-primary)] p-2 rounded-lg">
              <Tag size={18} className="text-white" />
            </div>
            <h2 className="text-xl font-black tracking-tight text-[var(--color-primary)]">
              Meta21
            </h2>
          </Link>
          <button
            className="md:hidden text-[var(--muted)]"
            onClick={() => setSidebarOpen(false)}
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 space-y-1 mt-2 mb-4 overflow-y-auto" aria-label="Menu administrativo">
          {SIDEBAR_ITEMS.map((item) => (
            <SidebarAccordion
              key={item.href}
              item={item}
              pathname={pathname}
              isActive={isActive}
              hasNotification={hasAnyOfferNotification}
              userRole={user?.role}
            />
          ))}
        </nav>

        {/* Footer sidebar */}
        <div className="p-4 border-t border-[var(--border)] space-y-2">
          <Link
            href="/admin/configuracoes"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-[var(--muted)] hover:bg-[var(--color-primary-light)] transition-colors"
          >
            <Settings size={18} />
            Configurações
          </Link>
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-10 h-10 rounded-full bg-[var(--color-primary-light)] overflow-hidden flex items-center justify-center text-[var(--color-primary)] font-bold text-sm">
              {user?.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                user?.name?.charAt(0).toUpperCase() || "U"
              )}
            </div>
            <div className="flex flex-col flex-1 overflow-hidden">
              <span className="text-sm font-bold truncate">{user?.name}</span>
              <button onClick={logout} className="text-xs text-[var(--muted)] hover:text-red-500 text-left flex items-center gap-1 transition-colors">
                <LogOut size={10} />
                Sair do sistema
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="Conteúdo-Admin flex-1 flex flex-col overflow-y-auto">
        {/* Top Header */}
        <header className="Header-Admin flex items-center justify-between px-6 md:px-8 py-4 bg-[var(--surface)] border-b border-[var(--border)] sticky top-0 z-10 transition-colors">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              onClick={() => setSidebarOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu size={22} />
            </button>
            <h2 className="text-lg md:text-xl font-bold tracking-tight text-[var(--foreground)]">
              Painel Administrativo
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right border-r border-[var(--border)] pr-4">
              <span className="text-[var(--muted)] text-sm font-medium">
                Olá, <strong className="text-[var(--foreground)] font-bold">{user?.name?.split(" ")[0] || "Administrador"}</strong>
              </span>
            </div>
            {/* Theme Toggle */}
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
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 md:p-8 space-y-8">{children}</div>
      </main>
    </div>
  );
}
