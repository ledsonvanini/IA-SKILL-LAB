import { Edit, Copy, Archive, CheckCircle, Clock, FileText, XCircle, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";

export type PromotionStatus = "active" | "scheduled" | "draft" | "archived";

export interface PromotionRowData {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: PromotionStatus;
  productCount: number;
}

interface PromotionTableProps {
  data: PromotionRowData[];
  onArchive: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete?: (id: string) => void;
  itemsPerPage?: number;
  currentPage?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  onItemsPerPageChange?: (limit: number) => void;
}

const statusConfig: Record<PromotionStatus, { label: string; icon: React.ElementType; colorClass: string }> = {
  active: { label: "Ativa", icon: CheckCircle, colorClass: "text-emerald-600 dark:text-emerald-400" },
  scheduled: { label: "Agendada", icon: Clock, colorClass: "text-blue-600 dark:text-blue-400" },
  draft: { label: "Rascunho", icon: FileText, colorClass: "text-gray-600 dark:text-gray-400" },
  archived: { label: "Arquivada", icon: Archive, colorClass: "text-red-600 dark:text-red-400" },
};

export function PromotionTable({
  data,
  onArchive,
  onDuplicate,
  onDelete,
  itemsPerPage = 10,
  currentPage = 1,
  totalItems = data.length,
  onPageChange,
  onItemsPerPageChange
}: PromotionTableProps) {
  if (data.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-[var(--surface)] border border-[var(--border)] rounded-2xl">
        <XCircle size={48} className="mx-auto text-[var(--muted)] mb-4 opacity-50" />
        <h3 className="text-lg font-bold">Nenhuma promoção encontrada</h3>
        <p className="text-[var(--muted)] text-sm mt-1">Tente ajustar os filtros de busca acima.</p>
      </div>
    );
  }

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--background)] border-b border-[var(--border)] text-[var(--muted)] text-sm">
              <th className="px-6 py-4 font-semibold">Nome da Promoção</th>
              <th className="px-6 py-4 font-semibold">Período</th>
              <th className="px-6 py-4 font-semibold">Produtos</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {data.map((promo) => {
              const StatusIcon = statusConfig[promo.status].icon;
              return (
                <tr key={promo.id} className="hover:bg-[var(--color-primary-light)]/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-[var(--foreground)]">{promo.name}</div>
                    <div className="text-xs text-[var(--muted)]">ID: {promo.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium">{promo.startDate}</div>
                    <div className="text-xs text-[var(--muted)]">até {promo.endDate}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-[var(--background)] border border-[var(--border)] text-xs font-bold">
                      {promo.productCount} iten(s)
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex justify-center items-center gap-1.5 px-2.5 py-1 min-w-[100px] rounded-full text-xs font-bold ${statusConfig[promo.status].colorClass}`}>
                      <StatusIcon size={14} />
                      {statusConfig[promo.status].label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/promocoes/${promo.id}/editar`}>
                        <Button variant="ghost" size="sm" className="px-2" title="Editar">
                          <Edit size={16} />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" className="px-2" title="Duplicar" onClick={() => onDuplicate(promo.id)}>
                        <Copy size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="px-2 hover:text-orange-500" title="Arquivar" onClick={() => onArchive(promo.id)}>
                        <Archive size={16} />
                      </Button>
                      {onDelete && (
                         <Button variant="ghost" size="sm" className="px-2 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30" title="Excluir" onClick={() => onDelete(promo.id)}>
                           <Trash2 size={16} />
                         </Button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalItems > 0 && (
         <div className="p-4 border-t border-[var(--border)] bg-[var(--background)] flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--muted)]">
            <div className="flex items-center gap-2">
               <span>Mostrar</span>
               <select 
                  className="bg-[var(--surface)] border border-[var(--border)] rounded px-2 py-1 outline-none focus:border-[var(--color-primary)] cursor-pointer"
                  value={itemsPerPage}
                  onChange={(e) => onItemsPerPageChange?.(Number(e.target.value))}
               >
                  <option value={10}>10</option>
                  <option value={30}>30</option>
                  <option value={50}>50</option>
               </select>
               <span>por página</span>
            </div>

            <div className="flex items-center gap-4">
               <span>Página {currentPage} de {totalPages || 1} ({totalItems} itens)</span>
               <div className="flex items-center gap-1">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="p-1 h-8 w-8" 
                    disabled={currentPage <= 1}
                    onClick={() => onPageChange?.(currentPage - 1)}
                  >
                     <ChevronLeft size={16} />
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="p-1 h-8 w-8" 
                    disabled={currentPage >= totalPages}
                    onClick={() => onPageChange?.(currentPage + 1)}
                  >
                     <ChevronRight size={16} />
                  </Button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}
