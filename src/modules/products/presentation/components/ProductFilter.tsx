import { Search, Filter } from "lucide-react";

interface ProductFilterProps {
  onSearch: (term: string) => void;
  onStatusChange: (status: string) => void;
  currentStatus: string;
}

export function ProductFilter({
  onSearch,
  onStatusChange,
  currentStatus,
}: ProductFilterProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
        />
        <input
          type="text"
          placeholder="Buscar produto por nome, código ou categoria..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-sm focus:ring-2 focus:ring-[var(--color-primary)]/50 placeholder:text-[var(--muted)] transition-all"
        />
      </div>

      {/* Status Filter */}
      <div className="flex items-center gap-2">
        <div className="p-2 border border-[var(--border)] bg-[var(--background)] rounded-lg text-[var(--muted)]">
          <Filter size={18} />
        </div>
        <select
          value={currentStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="px-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-sm focus:ring-2 focus:ring-[var(--color-primary)]/50 appearance-none min-w-[150px] font-medium"
        >
          <option value="all">Todos os Status</option>
          <option value="active">Ativos</option>
          <option value="out_of_stock">Sem Estoque</option>
          <option value="draft">Rascunho</option>
          <option value="archived">Arquivados</option>
        </select>
      </div>
    </div>
  );
}
