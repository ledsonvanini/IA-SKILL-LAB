"use client";

import { useState } from "react";
import { Save, Store, Truck, Bell, Shield } from "lucide-react";
import { Button } from "@/components/ui";

export default function SettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Configurações salvas com sucesso! (Mock)");
    }, 1000);
  };

  const tabs = [
    { id: "general", label: "Geral", icon: Store },
    { id: "delivery", label: "Entrega", icon: Truck },
    { id: "notifications", label: "Notificações", icon: Bell },
    { id: "security", label: "Segurança", icon: Shield },
  ];

  return (
    <div className="Página-Configurações max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="Cabeçalho-Configurações flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[var(--foreground)] tracking-tight">
            Configurações
          </h1>
          <p className="text-[var(--muted)] mt-1">
            Gerencie as preferências e parâmetros globais do sistema.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={handleSubmit} className="gap-2 shadow-sm shadow-[var(--color-primary)]/20" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : <><Save size={18} /> Salvar Alterações</>}
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="flex flex-col space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all
                    ${activeTab === tab.id 
                        ? "bg-[var(--color-primary)] text-white shadow-md shadow-[var(--color-primary)]/20" 
                        : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
                    }
                  `}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* General Settings */}
            {activeTab === "general" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold border-b border-[var(--border)] pb-4">Informações da Loja</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5" htmlFor="storeName">Nome da Loja</label>
                    <input
                      id="storeName"
                      type="text"
                      defaultValue="Meta21 Supermercados"
                      className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5" htmlFor="cnpj">CNPJ</label>
                    <input
                      id="cnpj"
                      type="text"
                      defaultValue="00.000.000/0001-00"
                      className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5" htmlFor="phone">Telefone / WhatsApp</label>
                    <input
                      id="phone"
                      type="text"
                      defaultValue="(11) 99999-9999"
                      className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] transition-all font-medium"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2 pt-4">
                    <label className="flex items-start gap-3 p-4 bg-[var(--background)] border border-[var(--border)] rounded-xl cursor-pointer hover:border-[var(--color-primary)]/50 transition-colors">
                      <div className="flex h-6 items-center">
                        <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[var(--foreground)]">Loja Aberta para Pedidos</span>
                        <span className="text-xs text-[var(--muted)] mt-1">Quando desativado, os clientes não poderão finalizar compras no checkout.</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Delivery Settings */}
            {activeTab === "delivery" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold border-b border-[var(--border)] pb-4">Logística e Frete</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5" htmlFor="taxaFrete">Taxa de Entrega Fixa (R$)</label>
                    <input
                      id="taxaFrete"
                      type="number"
                      step="0.01"
                      defaultValue="15.00"
                      className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5" htmlFor="freteGratis">Frete Grátis a partir de (R$)</label>
                    <input
                      id="freteGratis"
                      type="number"
                      step="0.01"
                      defaultValue="150.00"
                      className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] transition-all font-medium"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                 <div className="text-center py-12 text-[var(--muted)]">
                    Módulo de notificações será configurado após a integração com Supabase/Email.
                 </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                 <div className="text-center py-12 text-[var(--muted)]">
                    Configurações de segurança em breve.
                 </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
