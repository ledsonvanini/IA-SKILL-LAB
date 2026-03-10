"use client";

import { useState } from "react";
import { Plus, Download, FileText, FileSpreadsheet } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";
import {
  ProductFilter,
} from "@/modules/products/presentation/components/ProductFilter";
import {
  ProductTable,
  ProductRowData,
} from "@/modules/products/presentation/components/ProductTable";

const INITIAL_MOCK_DATA: ProductRowData[] = [
  {
    id: "PROD-001",
    sku: "MT-C01",
    name: "Contra Filé Bovino Resfriado",
    category: "Açougue",
    price: 45.90,
    stock: 120,
    status: "active",
  },
  {
    id: "PROD-002",
    sku: "LP-D02",
    name: "Detergente Líquido Ypê Maçã 500ml",
    category: "Limpeza",
    price: 2.49,
    stock: 0,
    status: "out_of_stock",
  },
  {
    id: "PROD-003",
    sku: "BD-C03",
    name: "Cerveja Heineken Long Neck 330ml",
    category: "Bebidas",
    price: 5.99,
    stock: 450,
    status: "active",
  },
  {
    id: "PROD-004",
    sku: "MT-P04",
    name: "Picanha Argentina Bovina Congelada",
    category: "Açougue",
    price: 89.90,
    stock: 15,
    status: "draft",
  },
  {
    id: "PROD-005",
    sku: "PD-P05",
    name: "Pão de Forma Tradicional Visconti 400g",
    category: "Padaria",
    price: 8.50,
    stock: 30,
    status: "active",
  },
];

export default function ProductsListPage() {
  const [data, setData] = useState<ProductRowData[]>(INITIAL_MOCK_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentStatus, setCurrentStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleArchive = (id: string) => {
    setData((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, status: "archived" } : product
      )
    );
  };

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((product) => product.id !== id));
  };

  const handleDuplicate = (id: string) => {
    const original = data.find((p) => p.id === id);
    if (!original) return;

    const duplicate: ProductRowData = {
      ...original,
      id: `PROD-${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`,
      sku: `${original.sku}-COPY`,
      name: `${original.name} (Cópia)`,
      status: "draft",
    };

    setData((prev) => [duplicate, ...prev]);
  };

  const filteredData = data.filter((product) => {
    const matchStr = `${product.name} ${product.sku} ${product.category}`.toLowerCase();
    const matchesSearch = matchStr.includes(searchTerm.toLowerCase());
    const matchesStatus = currentStatus === "all" || product.status === currentStatus;
    return matchesSearch && matchesStatus;
  });

  // Mock Pagination logic
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="Página-Produtos max-w-7xl mx-auto">
      {/* Header */}
      <div className="Cabeçalho-Produtos flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[var(--foreground)] tracking-tight">
            Produtos
          </h1>
          <p className="text-[var(--muted)] mt-1">
            Gerencie o catálogo de produtos, estoques e categorias da loja.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center bg-[var(--surface)] border border-[var(--border)] rounded-xl p-1">
            <Button variant="ghost" size="sm" className="gap-2 text-[var(--muted)] hover:text-blue-500 h-9 px-3">
              <FileText size={16} /> Relatório
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 text-[var(--muted)] hover:text-emerald-500 h-9 px-3">
              <FileSpreadsheet size={16} /> Importar Planilha
            </Button>
          </div>
          <Button variant="secondary" className="sm:hidden gap-2 px-3">
            <Download size={18} />
          </Button>
          <Link href="/admin/produtos/novo" passHref>
            <Button className="gap-2 shadow-sm shadow-[var(--color-primary)]/20">
              <Plus size={18} /> Novo Produto
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <ProductFilter
        currentStatus={currentStatus}
        onSearch={setSearchTerm}
        onStatusChange={setCurrentStatus}
      />

      {/* Table */}
      <ProductTable
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
