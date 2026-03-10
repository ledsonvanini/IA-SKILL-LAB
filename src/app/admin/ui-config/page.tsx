"use client";

import { useAuth } from "@/contexts/AuthContext";
import { MoveRight, Star, Image as ImageIcon, Ticket } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";

export default function UIConfigDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-[var(--foreground)] tracking-tight">
          Gerenciamento de Vitrine
        </h1>
        <p className="text-[var(--muted)] mt-1 max-w-2xl">
          Administre o visual da página inicial pública. Você pode configurar banners principais (Hero), definir as categorias em destaque e criar cupons globais para os clientes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Banner Principal */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-[var(--background)] border border-[var(--border)]">
            <ImageIcon size={24} className="text-[var(--foreground)]" />
          </div>
          <h2 className="text-lg font-bold mb-2">Banners Principais</h2>
          <p className="text-[var(--muted)] text-sm mb-8 flex-1">
            Configure o carrossel de imagens do topo da página inicial. Determine as imagens, link das campanhas e o tempo de transição.
          </p>
          <Link href="/admin/ui-config/hero" passHref>
            <Button variant="secondary" className="w-full gap-2 justify-between">
              Gerenciar Banners <MoveRight size={16} />
            </Button>
          </Link>
        </div>

        {/* Categorias em Destaque */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-[var(--background)] border border-[var(--border)]">
            <Star size={24} className="text-[var(--foreground)]" />
          </div>
          <h2 className="text-lg font-bold mb-2">Categorias em Destaque</h2>
          <p className="text-[var(--muted)] text-sm mb-8 flex-1">
            Selecione quais departamentos aparecerão como ícones de atalho rápido logo abaixo do banner principal.
          </p>
          <Link href="/admin/ui-config/destaques" passHref>
            <Button variant="secondary" className="w-full gap-2 justify-between">
              Ordenar Categorias <MoveRight size={16} />
            </Button>
          </Link>
        </div>

        {/* Cupons Globais */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-[var(--background)] border border-[var(--border)]">
            <Ticket size={24} className="text-[var(--foreground)]" />
          </div>
          <h2 className="text-lg font-bold mb-2">Cupons de Desconto</h2>
          <p className="text-[var(--muted)] text-sm mb-8 flex-1">
            Crie novos cupons de desconto, defina validade e veja os cupons ativos que são exibidos para todos os clientes.
          </p>
          <Link href="/admin/ui-config/cupons" passHref>
            <Button variant="secondary" className="w-full gap-2 justify-between">
              Ver Cupons <MoveRight size={16} />
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
