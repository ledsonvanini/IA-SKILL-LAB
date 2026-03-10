"use client";

import { useState } from "react";
import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";
import {
  PromotionTable,
  PromotionRowData,
} from "@/modules/promotions/presentation/components/PromotionTable";

// Dados mocados de histórico (Status: archived)
const INITIAL_ARCHIVED_DATA: PromotionRowData[] = [
  {
    id: "PROMO-004",
    name: "Mês das Mães 2026",
    startDate: "01/05/2026",
    endDate: "31/05/2026",
    status: "archived",
    productCount: 350,
  },
  {
    id: "PROMO-005",
    name: "Páscoa Antecipada",
    startDate: "10/03/2026",
    endDate: "20/03/2026",
    status: "archived",
    productCount: 15,
  },
  {
    id: "PROMO-006",
    name: "Black Friday 2025",
    startDate: "28/11/2025",
    endDate: "30/11/2025",
    status: "archived",
    productCount: 1500,
  },
];

export default function PromotionHistoryPage() {
  const [data, setData] = useState<PromotionRowData[]>(INITIAL_ARCHIVED_DATA);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleDuplicate = (id: string) => {
    alert(`Promoção ${id} será duplicada e movida para os rascunhos em breve.`);
  };

  const handleArchive = (id: string) => {
    // Já está arquivada no histórico
  };

  // Mock Pagination
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="Página-Histórico-Promoções max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="Cabeçalho-Histórico flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Link href="/admin/promocoes">
            <Button type="button" variant="ghost" className="px-2">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-[var(--foreground)] tracking-tight flex items-center gap-2">
              <Clock size={24} className="text-[var(--muted)]" />
              Histórico de Promoções
            </h1>
            <p className="text-[var(--muted)] mt-1">
              Visualize todas as campanhas que já terminaram ou foram inativadas.
            </p>
          </div>
        </div>
      </div>

      {/* Tabela de Arquivadas */}
      <PromotionTable
        data={paginatedData}
        onArchive={handleArchive}
        onDuplicate={handleDuplicate}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        totalItems={data.length}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(limit) => {
           setItemsPerPage(limit);
           setCurrentPage(1);
        }}
      />
    </div>
  );
}
