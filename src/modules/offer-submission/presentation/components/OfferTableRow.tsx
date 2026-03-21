"use client";

import { Trash2, Plus, ChevronUp, ChevronDown } from "lucide-react";
import type { OfferRow, OfferColumnConfig } from "@/mocks/types/offer-submission";
import { formatBRL } from "@/lib/format";
import type { KeyboardEvent, ClipboardEvent } from "react";

interface OfferTableRowProps {
  row: OfferRow;
  rowIndex: number;
  columns: OfferColumnConfig[];
  readOnly: boolean;
  onUpdateRow: (rowId: string, field: keyof OfferRow, value: string | number | null) => void;
  onRemoveRow: (rowId: string) => void;
  onInsertRow: (index: number) => void;
  onMoveRow: (index: number, direction: "up" | "down") => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>, rowIndex: number, colIndex: number) => void;
  onPaste: (e: ClipboardEvent<HTMLInputElement>, rowIndex: number) => void;
  rowsCount: number;
}

export function OfferTableRow({
  row,
  rowIndex,
  columns,
  readOnly,
  onUpdateRow,
  onRemoveRow,
  onInsertRow,
  onMoveRow,
  onKeyDown,
  onPaste,
  rowsCount,
}: OfferTableRowProps) {
  
  const parseValue = (col: OfferColumnConfig, raw: string): string | number | null => {
    if (col.type === "currency") {
      const num = parseFloat(raw.replace(",", ".").replace(/[^\d.]/g, ""));
      return isNaN(num) ? null : num;
    }
    return raw;
  };

  return (
    <tr className="Linha-Oferta group hover:bg-[var(--color-primary-light)]/20 transition-colors">
      {/* Index and Actions */}
      <td className="relative px-2 py-1.5 text-[10px] text-[var(--muted)] text-center select-none border-r border-[var(--border)] group/num min-w-[48px]">
        <div className="group-hover/num:opacity-0 transition-opacity font-medium">
          {rowIndex + 1}
        </div>
        {!readOnly && (
          <div className="Ações-Linha absolute inset-0 flex items-center justify-center gap-0.5 opacity-0 group-hover/num:opacity-100 transition-all bg-[var(--background)] px-1">
            <button
              onClick={() => onInsertRow(rowIndex)}
              className="p-0.5 hover:text-[var(--color-primary)] transition-colors"
              title="Inserir acima"
            >
              <Plus size={12} />
            </button>
            <div className="flex flex-col">
              <button
                onClick={() => onMoveRow(rowIndex, "up")}
                disabled={rowIndex === 0}
                className="p-0.5 hover:text-[var(--color-primary)] transition-colors disabled:opacity-30"
                title="Subir linha"
              >
                <ChevronUp size={12} />
              </button>
              <button
                onClick={() => onMoveRow(rowIndex, "down")}
                disabled={rowIndex === rowsCount - 1}
                className="p-0.5 hover:text-[var(--color-primary)] transition-colors disabled:opacity-30"
                title="Descer linha"
              >
                <ChevronDown size={12} />
              </button>
            </div>
          </div>
        )}
      </td>

      {/* Dynamic Cells */}
      {columns.map((col, colIndex) => (
        <td key={col.key} className="px-1.5 py-1 border-r border-[var(--border)] last:border-r-0">
          {readOnly ? (
            <span className="px-3 py-1.5 block text-sm text-left">
              {col.type === "currency" && row[col.key] != null
                ? formatBRL(row[col.key] as number)
                : (row[col.key] as string) || "—"}
            </span>
          ) : (
            <input
              type={col.type === "currency" ? "number" : "text"}
              step={col.type === "currency" ? "0.01" : undefined}
              min={col.type === "currency" ? "0" : undefined}
              value={(row[col.key] ?? "") as string}
              placeholder={col.placeholder}
              onChange={(e) =>
                onUpdateRow(row.id, col.key, parseValue(col, e.target.value))
              }
              onKeyDown={(e) => onKeyDown(e, rowIndex, colIndex)}
              onPaste={(e) => onPaste(e, rowIndex)}
              className={`
                Célula-Planilha w-full px-3 py-1.5 rounded
                bg-transparent text-sm text-[var(--foreground)] text-left
                placeholder:text-[var(--muted)]/50
                border border-transparent
                focus:outline-none focus:border-[var(--color-primary)]/60
                focus:bg-[var(--color-primary-light)]/30
                transition-colors
              `}
            />
          )}
        </td>
      ))}

      {/* Delete Action */}
      {!readOnly && (
        <td className="px-1.5 py-1">
          <button
            type="button"
            onClick={() => onRemoveRow(row.id)}
            className="Botão-Remover opacity-0 group-hover:opacity-100 p-1 text-[var(--muted)] hover:text-[var(--color-danger)] transition-all rounded"
            aria-label="Remover linha"
            tabIndex={-1}
          >
            <Trash2 size={14} />
          </button>
        </td>
      )}
    </tr>
  );
}
