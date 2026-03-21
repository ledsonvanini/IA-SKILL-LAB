"use client";

import { useState } from "react";
import {
  Tag,
  ShoppingBag,
  TrendingUp,
  Ticket,
  Users,
  AlertCircle,
  X,
  Archive,
  CalendarClock
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui";

export default function AdminDashboardPage() {
  const [isRotateModalOpen, setRotateModalOpen] = useState(false);
  const [isSubmittingRotate, setIsSubmittingRotate] = useState(false);

  const handleActionRotate = (action: "archive" | "renew") => {
    setIsSubmittingRotate(true);
    setTimeout(() => {
      setIsSubmittingRotate(false);
      setRotateModalOpen(false);
      toast.success(action === "archive" ? "Ofertas arquivadas com sucesso." : "Ofertas renovadas por +7 dias.");
    }, 1500);
  };

  return (
    <>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Quick Actions / Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[var(--muted)] text-sm">Ofertas Ativas</h3>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Tag size={20} />
              </div>
            </div>
            <p className="text-3xl font-black text-[var(--foreground)]">124</p>
            <p className="text-xs text-emerald-500 font-medium flex items-center mt-2">
              <TrendingUp size={12} className="mr-1" /> +12% esta semana
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[var(--muted)] text-sm">Cupons Ativos</h3>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400">
                <Ticket size={20} />
              </div>
            </div>
            <p className="text-3xl font-black text-[var(--foreground)]">5</p>
            <p className="text-xs text-[var(--muted)] font-medium mt-2">
              1 próximo do vencimento
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[var(--muted)] text-sm">Vendas Hoje</h3>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <ShoppingBag size={20} />
              </div>
            </div>
            <p className="text-3xl font-black text-[var(--foreground)]">89</p>
            <p className="text-xs text-emerald-500 font-medium flex items-center mt-2">
              <TrendingUp size={12} className="mr-1" /> Maior que ontem
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[var(--muted)] text-sm">Novos Clientes</h3>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-orange-600 dark:text-orange-400">
                <Users size={20} />
              </div>
            </div>
            <p className="text-3xl font-black text-[var(--foreground)]">32</p>
            <p className="text-xs text-[var(--muted)] font-medium mt-2">
              Nas últimas 24h
            </p>
          </div>
        </div>

        {/* Atalhos Rápidos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Atualizações pendentes */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6 text-orange-500">
              <AlertCircle size={24} />
              <h2 className="text-xl font-bold text-[var(--foreground)]">Atenção Necessária</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start justify-between p-4 bg-[var(--surface)] border-l-4 border-orange-500 rounded-lg shadow-sm">
                <div>
                  <h4 className="font-bold text-[var(--foreground)]">Ofertas Expirando</h4>
                  <p className="text-sm text-[var(--muted)] mt-1">15 ofertas terminam hoje à meia-noite.</p>
                </div>
                <Button variant="secondary" size="sm" onClick={() => setRotateModalOpen(true)}>Rotacionar</Button>
              </div>

              <div className="flex items-start justify-between p-4 bg-[var(--surface)] border-l-4 border-blue-500 rounded-lg shadow-sm">
                <div>
                  <h4 className="font-bold text-[var(--foreground)]">Banner Principal</h4>
                  <p className="text-sm text-[var(--muted)] mt-1">O banner já passou do prazo ideal.</p>
                </div>
                <Link href="/admin/ui-config/hero" passHref>
                  <Button variant="secondary" size="sm">Atualizar</Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Links Úteis */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold mb-6">Acesso Rápido</h2>

            <div className="grid grid-cols-2 gap-4">
              <Link href="/admin/promocoes/nova" className="flex flex-col items-center justify-center p-6 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all group shadow-sm hover:shadow-md">
                <div className="w-12 h-12 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Tag size={28} className="text-[var(--color-primary)]" />
                </div>
                <span className="font-bold text-sm text-center text-[var(--foreground)] group-hover:text-[var(--color-primary)] transition-colors">Nova Oferta</span>
              </Link>

              <Link href="/admin/promocoes/criar-cupom" className="flex flex-col items-center justify-center p-6 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:border-purple-500 hover:text-purple-500 transition-all group shadow-sm hover:shadow-md">
                <div className="w-12 h-12 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Ticket size={28} className="text-purple-500 dark:text-purple-400" />
                </div>
                <span className="font-bold text-sm text-center text-[var(--foreground)] group-hover:text-purple-500 transition-colors">Criar Cupom</span>
              </Link>

              <Link href="/admin/produtos" className="col-span-2 flex flex-col sm:flex-row items-center justify-between p-5 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:border-emerald-500 transition-all shadow-sm hover:shadow-md group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <ShoppingBag size={24} className="text-emerald-500 dark:text-emerald-400" />
                  </div>
                  <div className="text-left">
                    <span className="font-bold block">Gerenciar Catálogo</span>
                    <span className="text-xs text-[var(--muted)] font-normal">Cadastre novos produtos no sistema base</span>
                  </div>
                </div>
                <div className="text-[var(--muted)] mt-4 sm:mt-0 opacity-50">&rarr;</div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE ROTACIONAR (OVERLAY) */}
      {isRotateModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[var(--surface)] border border-[var(--border)] w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-[var(--border)]">
              <h2 className="text-xl font-bold">Rotacionar Ofertas</h2>
              <button
                onClick={() => !isSubmittingRotate && setRotateModalOpen(false)}
                className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors disabled:opacity-50"
                disabled={isSubmittingRotate}
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex gap-4 items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
                  <AlertCircle size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Ação Necessária</h3>
                  <p className="text-[var(--muted)] text-sm">
                    Você possui <strong>15 ofertas</strong> que expiram à meia-noite de hoje. O que você deseja fazer com elas?
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  variant="outline"
                  className="h-auto py-3 justify-start text-left px-4 group"
                  onClick={() => handleActionRotate("archive")}
                  disabled={isSubmittingRotate}
                >
                  <Archive className="mr-4 text-[var(--muted)] group-hover:text-red-500 transition-colors" />
                  <div>
                    <span className="block font-bold">Arquivar Todas</span>
                    <span className="block text-xs text-[var(--muted)] font-normal">Sairão do ar à meia-noite</span>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto py-3 justify-start text-left px-4 group border-[var(--color-primary)]/50 hover:bg-[var(--color-primary)]/5"
                  onClick={() => handleActionRotate("renew")}
                  disabled={isSubmittingRotate}
                >
                  <CalendarClock className="mr-4 text-[var(--color-primary)]" />
                  <div>
                    <span className="block font-bold text-[var(--color-primary)]">Renovar Vigência (+7 dias)</span>
                    <span className="block text-xs text-[var(--muted)] font-normal text-[var(--foreground)]/70">Prolongar a oferta automaticamente</span>
                  </div>
                </Button>
              </div>
            </div>

            <div className="p-4 border-t border-[var(--border)] bg-[var(--background)] flex items-center justify-end">
              <Button
                variant="ghost"
                onClick={() => setRotateModalOpen(false)}
                disabled={isSubmittingRotate}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
