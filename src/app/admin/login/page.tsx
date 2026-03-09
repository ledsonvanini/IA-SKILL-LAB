"use client";

import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Tag, Shield, Store, User } from "lucide-react";
import { Button } from "@/components/ui";

export default function AdminLoginPage() {
  const { loginAs, isAuthenticated, user } = useAuth();

  // Se já estiver logado, não precisa re-logar
  if (isAuthenticated && (user?.role === "admin" || user?.role === "manager")) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-4">
        <p className="mb-4">Você já está autenticado como <strong>{user.name}</strong>.</p>
        <Button onClick={() => loginAs(user.role)}>Ir para Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-4">
      <div className="mb-8 flex flex-col items-center">
        <div className="bg-[var(--color-primary)] p-3 rounded-2xl mb-4 shadow-lg shadow-red-500/20">
          <Tag size={40} className="text-white" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-[var(--foreground)]">
          META21 Admin
        </h1>
        <p className="text-[var(--muted)] mt-2">
          Acesso exclusivo para colaboradores
        </p>
      </div>

      <div className="w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 md:p-8 shadow-xl">
        <h2 className="text-xl font-bold mb-6 text-center border-b border-[var(--border)] pb-4">
          Simulador de Acesso (Mock)
        </h2>
        
        <div className="space-y-4">
          {/* Admin Agência */}
          <button
            onClick={() => loginAs("admin")}
            className="w-full flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-colors text-left group"
          >
            <div className="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 p-3 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Shield size={24} />
            </div>
            <div>
              <p className="font-bold text-[var(--foreground)]">Paula (Agência)</p>
              <p className="text-sm text-[var(--muted)]">Admin Global — Acesso Total</p>
            </div>
          </button>

          {/* Gerente Unidade */}
          <button
            onClick={() => loginAs("manager")}
            className="w-full flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-colors text-left group"
          >
            <div className="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 p-3 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Store size={24} />
            </div>
            <div>
              <p className="font-bold text-[var(--foreground)]">Roberto (Gerente)</p>
              <p className="text-sm text-[var(--muted)]">Acesso restrito à unidade Centro</p>
            </div>
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border)] text-center text-sm text-[var(--muted)]">
          <p>Deseja acessar como cliente?</p>
          <button onClick={() => loginAs("customer")} className="flex items-center gap-2 justify-center w-full mt-3 text-[var(--color-primary)] hover:underline">
            <User size={16} /> Entrar na Área do Cliente
          </button>
        </div>
      </div>
    </div>
  );
}
