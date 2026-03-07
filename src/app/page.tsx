"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { useFontControl } from "@/contexts/FontControlContext";
import { Sun, Moon, Type } from "lucide-react";

export default function HomePage() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const { cycleFontSize, label } = useFontControl();

  return (
    <div className="Página-Home min-h-screen flex flex-col items-center justify-center gap-8 p-6">
      {/* Header com controles de acessibilidade */}
      <div className="Seção-Controles fixed top-4 right-4 flex items-center gap-2 z-50">
        <button
          onClick={cycleFontSize}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-sm font-semibold hover:bg-[var(--color-primary-light)] transition-colors"
          title={`Tamanho da fonte: ${label}`}
          aria-label={`Alterar tamanho da fonte. Atual: ${label}`}
        >
          <Type size={16} />
          <span>{label}</span>
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--color-primary-light)] transition-colors"
          title={resolvedTheme === "light" ? "Modo escuro" : "Modo claro"}
          aria-label={`Alternar para modo ${resolvedTheme === "light" ? "escuro" : "claro"}`}
        >
          {resolvedTheme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>

      {/* Hero */}
      <div className="Seção-Hero text-center space-y-4 max-w-lg">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-[var(--color-primary)] rounded-xl flex items-center justify-center">
            <span className="text-white text-2xl font-black">M</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight uppercase text-[var(--color-primary)]">
            Meta21
          </h1>
        </div>
        <p className="text-[var(--muted)] text-lg">
          Supermercados — Qualidade na sua mesa todos os dias
        </p>
      </div>

      {/* Status cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
        <div className="Card-Status p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
            Stack
          </p>
          <p className="text-lg font-bold mt-1">Next.js 16 + Tailwind 4.2</p>
        </div>
        <div className="Card-Status p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
            Fase
          </p>
          <p className="text-lg font-bold mt-1">Sprint 0 — Setup</p>
        </div>
        <div className="Card-Status p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
            Design System
          </p>
          <p className="text-lg font-bold mt-1 text-[var(--color-primary)]">
            ✓ Ativo
          </p>
        </div>
      </div>

      {/* Paleta de cores visual */}
      <div className="w-full max-w-2xl space-y-3">
        <p className="text-sm font-bold uppercase tracking-wider text-[var(--muted)]">
          Paleta de Cores
        </p>
        <div className="flex gap-2 flex-wrap">
          <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)]" title="Primary" />
          <div className="w-12 h-12 rounded-lg bg-[var(--color-success-bg)] border border-[var(--color-success)]" title="Success" />
          <div className="w-12 h-12 rounded-lg bg-[var(--color-info-bg)] border border-[var(--color-info)]" title="Info" />
          <div className="w-12 h-12 rounded-lg bg-[var(--color-warning-bg)] border border-[var(--color-warning)]" title="Warning" />
          <div className="w-12 h-12 rounded-lg bg-[var(--color-danger-bg)] border border-[var(--color-danger)]" title="Danger" />
          <div className="w-12 h-12 rounded-lg bg-[var(--color-whatsapp)]" title="WhatsApp" />
        </div>
      </div>

      <footer className="text-xs text-[var(--muted)] mt-4">
        © 2026 META21 Supermercados — Sprint 0: Setup & Design System
      </footer>
    </div>
  );
}
