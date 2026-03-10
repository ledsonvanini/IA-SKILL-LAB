"use client";

import { useState } from "react";
import { TrendingUp, Users, DollarSign, ShoppingCart, ArrowUpRight, ArrowDownRight, Download, Filter, X, Search, Calendar } from "lucide-react";
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

const mockProducts = [
  { name: "Picanha Argentina Resfriada", category: "Carnes", sales: 145, revenue: "R$ 13.035,50", img: "10" },
  { name: "Cerveja Heineken Long Neck", category: "Bebidas", sales: 890, revenue: "R$ 5.331,10", img: "12" },
  { name: "Leite Integral Parmalat 1L", category: "Laticínios", sales: 450, revenue: "R$ 2.695,50", img: "15" },
  { name: "Detergente Ypê Maçã", category: "Limpeza", sales: 320, revenue: "R$ 796,80", img: "20" },
  { name: "Costela Bovina Ripão", category: "Carnes", sales: 110, revenue: "R$ 4.290,00", img: "22" },
  { name: "Refrigerante Coca-Cola 2L", category: "Bebidas", sales: 600, revenue: "R$ 4.800,00", img: "25" },
];

export default function AnalyticsPage() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  return (
    <>
      <div className="Página-Análises max-w-7xl mx-auto pb-12">
        {/* Header */}
        <div className="Cabeçalho-Análises flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-[var(--foreground)] tracking-tight">
              Análises e Métricas
            </h1>
            <p className="text-[var(--muted)] mt-1">
              Visão geral do desempenho de vendas e indicadores da loja.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant={isFiltersOpen ? "primary" : "secondary"}
              className="gap-2"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
              <Filter size={18} /> Filtros
            </Button>
            <Button className="gap-2 shadow-sm shadow-[var(--color-primary)]/20">
              <Download size={18} /> Exportar
            </Button>
          </div>
        </div>

        {/* Collapsible Filters */}
        {isFiltersOpen && (
          <div className="Painel-Filtros bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 mb-8 animate-in slide-in-from-top-4 fade-in duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Filtros Avançados</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-bold text-[var(--muted)] mb-1">Período</label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
                  <select className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg pl-9 pr-4 py-2 text-sm outline-none focus:border-[var(--color-primary)]">
                    <option>Últimos 7 dias</option>
                    <option>Últimos 30 dias</option>
                    <option>Este Mês</option>
                    <option>Mês Anterior</option>
                    <option>Personalizado...</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-[var(--muted)] mb-1">Unidade / Filial</label>
                <select className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg px-4 py-2 text-sm outline-none focus:border-[var(--color-primary)]">
                  <option>Todas as Unidades</option>
                  <option>Matriz - Centro</option>
                  <option>Filial 01 - Zona Sul</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-[var(--muted)] mb-1">Categoria de Produto</label>
                <select className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg px-4 py-2 text-sm outline-none focus:border-[var(--color-primary)]">
                  <option>Todas as Categorias</option>
                  <option>Carnes</option>
                  <option>Bebidas</option>
                  <option>Hortifrúti</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-[var(--border)]">
              <Button variant="ghost" onClick={() => setIsFiltersOpen(false)}>Cancelar</Button>
              <Button onClick={() => setIsFiltersOpen(false)}>Aplicar Filtros</Button>
            </div>
          </div>
        )}

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
              <span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span><span>Dom</span>
            </div>
          </div>

          {/* Top Selling Products Mock */}
          <div className="Lista-Mais-Vendidos bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Mais Vendidos</h2>
            </div>
            <div className="space-y-6 flex-1">
              {mockProducts.slice(0, 4).map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--background)] border border-[var(--border)] bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url('https://picsum.photos/seed/${item.img}/100/100')` }}></div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm truncate text-[var(--foreground)]">{item.name}</h4>
                    <p className="text-xs text-[var(--muted)]">{item.sales} und</p>
                  </div>
                  <div className="font-bold text-sm text-[var(--color-primary)]">
                    {item.revenue}
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              className="w-full mt-6 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] hover:bg-[var(--color-primary-light)]"
              onClick={() => setIsReportModalOpen(true)}
            >
              Ver Relatório Completo
            </Button>
          </div>

        </div>
      </div>

      {/* FULLSCREEN RELATÓRIO MODAL OVERLAY */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-[var(--background)] animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center justify-between p-4 px-6 border-b border-[var(--border)] bg-[var(--surface)]">
            <div>
              <h2 className="text-xl font-black">Relatório Completo de Vendas</h2>
              <p className="text-sm text-[var(--muted)]">Os 50 produtos mais vendidos no período.</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="secondary" className="gap-2">
                <Download size={18} /> CSV
              </Button>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--border)] transition-colors"
                title="Fechar Relatório"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-6 md:p-8">
            <div className="max-w-6xl mx-auto space-y-6">

              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
                  <input type="text" placeholder="Buscar no relatório..." className="w-full pl-10 pr-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg outline-none focus:border-[var(--color-primary)]" />
                </div>
              </div>

              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[var(--background)] text-[var(--muted)] text-sm">
                        <th className="p-4 font-bold min-w-[300px]">Produto</th>
                        <th className="p-4 font-bold">Categoria</th>
                        <th className="p-4 font-bold text-right">Qtd. Vendida</th>
                        <th className="p-4 font-bold text-right">Receita Bruja</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)] text-sm">
                      {mockProducts.concat(mockProducts).map((item, i) => (
                        <tr key={i} className="hover:bg-[var(--background)] transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-md bg-[var(--border)] bg-cover bg-center shrink-0" style={{ backgroundImage: `url('https://picsum.photos/seed/${item.img}${i}/100/100')` }}></div>
                              <span className="font-bold text-[var(--foreground)]">{item.name} {i > 5 && `(Var ${i})`}</span>
                            </div>
                          </td>
                          <td className="p-4 text-[var(--muted)]">{item.category}</td>
                          <td className="p-4 text-right font-medium">{item.sales - (i * 10 > 0 ? i * 10 : 0)}</td>
                          <td className="p-4 text-right font-bold text-[var(--color-primary)]">{item.revenue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 border-t border-[var(--border)] bg-[var(--background)] flex items-center justify-between text-sm text-[var(--muted)]">
                  <span>Mostrando 1 a 12 de 50 registros</span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>Anterior</Button>
                    <Button variant="outline" size="sm">Próximo</Button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
