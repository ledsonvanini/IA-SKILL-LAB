"use client";

import { TrendingUp, Users, DollarSign, ShoppingCart, ArrowUpRight, ArrowDownRight, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui";

const kpiData = [
  {
    title: "Vendas Totais",
    value: "R$ 124.500,00",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Pedidos Feitos",
    value: "1.245",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Novos Clientes",
    value: "389",
    change: "-2.4%",
    trend: "down",
    icon: Users,
  },
  {
    title: "Ticket Médio",
    value: "R$ 100,00",
    change: "+4.1%",
    trend: "up",
    icon: TrendingUp,
  },
];

export default function AnalyticsPage() {
  return (
    <div className="Página-Análises max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="Cabeçalho-Análises flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[var(--foreground)] tracking-tight">
            Análises e Métricas
          </h1>
          <p className="text-[var(--muted)] mt-1">
            Visão geral do desempenho de vendas e indicadores da loja.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="gap-2">
            <Filter size={18} /> Filtros
          </Button>
          <Button className="gap-2 shadow-sm shadow-[var(--color-primary)]/20">
            <Download size={18} /> Exportar Relatório
          </Button>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="Grid-KPIs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi, idx) => {
          const Icon = kpi.icon;
          const isUp = kpi.trend === "up";
          return (
            <div key={idx} className="Cartão-KPI bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 relative overflow-hidden group">
              <div className="flex items-center justify-between mb-4">
                 <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                 </div>
                 <div className={`flex items-center gap-1 text-sm font-bold ${isUp ? "text-emerald-500" : "text-red-500"}`}>
                    {isUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {kpi.change}
                 </div>
              </div>
              <h3 className="text-[var(--muted)] text-sm font-medium mb-1">{kpi.title}</h3>
              <div className="text-2xl font-black text-[var(--foreground)]">{kpi.value}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart Mock */}
        <div className="Gráfico-Principal lg:col-span-2 bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-8">
             <h2 className="text-lg font-bold">Vendas nos Últimos 7 Dias</h2>
             <select className="bg-[var(--background)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-sm outline-none">
                <option>Últimos 7 dias</option>
                <option>Últimos 30 dias</option>
                <option>Este Mês</option>
             </select>
          </div>
          
          {/* CSS Bar Chart Mock */}
          <div className="h-64 flex items-end gap-2 sm:gap-4 lg:gap-8 justify-between mt-auto border-b border-[var(--border)] pb-2 relative">
             {/* Y Axis Guides */}
             <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                <div className="border-t border-[var(--foreground)] w-full"></div>
                <div className="border-t border-[var(--foreground)] w-full"></div>
                <div className="border-t border-[var(--foreground)] w-full"></div>
                <div className="border-t border-[var(--foreground)] w-full"></div>
             </div>

             {[40, 70, 45, 90, 65, 80, 100].map((height, i) => (
                <div key={i} className="flex flex-col items-center flex-1 gap-2 group z-10">
                   {/* Hover Tooltip Mock */}
                   <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-[var(--foreground)] bg-[var(--background)] border border-[var(--border)] px-2 py-1 rounded shadow-sm mb-1">
                      R$ {(height * 150).toFixed(0)},00
                   </span>
                   <div 
                     className="w-full bg-[var(--color-primary-light)] group-hover:bg-[var(--color-primary)] transition-colors rounded-t-sm" 
                     style={{ height: `${height}%` }}
                   ></div>
                </div>
             ))}
          </div>
          <div className="flex justify-between text-xs text-[var(--muted)] font-medium pt-3 mt-1">
             <span>Seg</span>
             <span>Ter</span>
             <span>Qua</span>
             <span>Qui</span>
             <span>Sex</span>
             <span>Sáb</span>
             <span>Dom</span>
          </div>
        </div>

        {/* Top Selling Products Mock */}
        <div className="Lista-Mais-Vendidos bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-lg font-bold">Mais Vendidos</h2>
          </div>
          <div className="space-y-6">
             {[
               { name: "Picanha Argentina Resfriada", sales: 145, revenue: "R$ 13.035,50", img: "10" },
               { name: "Cerveja Heineken Long Neck", sales: 890, revenue: "R$ 5.331,10", img: "12" },
               { name: "Leite Integral Parmalat 1L", sales: 450, revenue: "R$ 2.695,50", img: "15" },
               { name: "Detergente Ypê Maçã", sales: 320, revenue: "R$ 796,80", img: "20" },
             ].map((item, i) => (
               <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--background)] border border-[var(--border)] bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url('https://picsum.photos/seed/${item.img}/100/100')` }}></div>
                  <div className="flex-1 min-w-0">
                     <h4 className="font-bold text-sm truncate text-[var(--foreground)]">{item.name}</h4>
                     <p className="text-xs text-[var(--muted)]">{item.sales} unidades vendidas</p>
                  </div>
                  <div className="font-bold text-sm text-[var(--color-primary)]">
                     {item.revenue}
                  </div>
               </div>
             ))}
          </div>
          <Button variant="ghost" className="w-full mt-6 text-[var(--color-primary)] mix-blend-luminosity">
             Ver Relatório Completo
          </Button>
        </div>

      </div>
    </div>
  );
}
