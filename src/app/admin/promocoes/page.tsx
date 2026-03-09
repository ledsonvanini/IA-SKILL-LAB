"use client";

import { useState } from "react";
import { Plus, Download, FileText, FileSpreadsheet } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";
import {
  PromotionHistoryFilter,
} from "@/modules/promotions/presentation/components/PromotionHistoryFilter";
import {
  PromotionTable,
  PromotionRowData,
} from "@/modules/promotions/presentation/components/PromotionTable";

const INITIAL_MOCK_DATA: PromotionRowData[] = [
  {
    id: "PROMO-001",
    name: "Semana da Carne",
    startDate: "10/06/2026",
    endDate: "17/06/2026",
    status: "active",
    productCount: 45,
  },
  {
    id: "PROMO-002",
    name: "Festival de Limpeza",
    startDate: "20/06/2026",
    endDate: "30/06/2026",
    status: "scheduled",
    productCount: 120,
  },
  {
    id: "PROMO-003",
    name: "Ofertas Relâmpago (Fim de Semana)",
    startDate: "13/06/2026",
    endDate: "14/06/2026",
    status: "draft",
    productCount: 15,
  },
  {
    id: "PROMO-004",
    name: "Mês das Mães 2026",
    startDate: "01/05/2026",
    endDate: "31/05/2026",
    status: "archived",
    productCount: 350,
  },
];

export default function PromotionsListPage() {
  const [data, setData] = useState<PromotionRowData[]>(INITIAL_MOCK_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentStatus, setCurrentStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleArchive = (id: string) => {
    setData((prev) =>
      prev.map((promo) =>
        promo.id === id ? { ...promo, status: "archived" } : promo
      )
    );
  };

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((promo) => promo.id !== id));
  };

  const handleDuplicate = (id: string) => {
    const original = data.find((p) => p.id === id);
    if (!original) return;
    
    const duplicate: PromotionRowData = {
      ...original,
      id: `PROMO-${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`,
      name: `${original.name} (Cópia)`,
      status: "draft",
    };
    
    setData((prev) => [duplicate, ...prev]);
  };

  const filteredData = data.filter((promo) => {
    const matchesSearch = promo.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = currentStatus === "all" || promo.status === currentStatus;
    return matchesSearch && matchesStatus;
  });

  // Mock Pagination logic
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[var(--foreground)] tracking-tight">
            Promoções
          </h1>
          <p className="text-[var(--muted)] mt-1">
            Gerencie todas as campanhas e ofertas ativas no sistema.
          </p>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center bg-[var(--surface)] border border-[var(--border)] rounded-xl p-1">
            <Button variant="ghost" size="sm" className="gap-2 text-[var(--muted)] hover:text-blue-500 h-9 px-3">
              <FileText size={16} /> PDF
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 text-[var(--muted)] hover:text-emerald-500 h-9 px-3">
              <FileSpreadsheet size={16} /> CSV
            </Button>
          </div>
           <Button variant="secondary" className="sm:hidden gap-2 px-3">
             <Download size={18} />
           </Button>
          <Link href="/admin/promocoes/nova" passHref>
            <Button className="gap-2 shadow-sm shadow-[var(--color-primary)]/20">
              <Plus size={18} /> Nova Promoção
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <PromotionHistoryFilter
        currentStatus={currentStatus}
        onSearch={setSearchTerm}
        onStatusChange={setCurrentStatus}
      />

      {/* Table */}
      <PromotionTable
        data={paginatedData}
        onArchive={handleArchive}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        totalItems={filteredData.length}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(limit) => {
           setItemsPerPage(limit);
           setCurrentPage(1); // Reset to first page
        }}
      />
    </div>
  );
}
