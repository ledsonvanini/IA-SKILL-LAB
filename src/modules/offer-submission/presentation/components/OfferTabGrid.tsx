import { useRef, useCallback, useState, useEffect, type KeyboardEvent, type ClipboardEvent } from "react";
import { Trash2, Plus, ChevronUp, ChevronDown, ListX, ArrowUp, ArrowDown } from "lucide-react";
import type { OfferRow, OfferColumnConfig, OfferType } from "@/mocks/types/offer-submission";
import { formatBRL } from "@/lib/format";
import { Button } from "@/components/ui";

interface OfferTabGridProps {
  type: OfferType;
  rows: OfferRow[];
  columns: OfferColumnConfig[];
  readOnly?: boolean;
  onUpdateRow: (rowId: string, field: keyof OfferRow, value: string | number | null) => void;
  onAddRow: () => void;
  onRemoveRow: (rowId: string) => void;
  onInsertRow: (index: number) => void;
  onMoveRow: (index: number, direction: "up" | "down") => void;
  onClearTab: () => void;
  onPaste: (startIndex: number, tsv: string) => void;
  onRenameColumn?: (key: string, newLabel: string) => void;
}

export function OfferTabGrid({
  rows,
  columns,
  readOnly = false,
  onUpdateRow,
  onAddRow,
  onRemoveRow,
  onInsertRow,
  onMoveRow,
  onClearTab,
  onPaste,
  onRenameColumn,
  type,
}: OfferTabGridProps) {
  const tableRef = useRef<HTMLTableElement>(null);

  // Resize & Persistence logic
  const storageKey = `meta21:colwidths:${type}`;
  const [colWidths, setColWidths] = useState<Record<string, number>>(() => {
    try {
      if (typeof window !== "undefined") {
         const w = localStorage.getItem(storageKey);
         return w ? JSON.parse(w) : {};
      }
    } catch {}
    return {};
  });

  const resizingCol = useRef<string | null>(null);
  const startX = useRef<number>(0);
  const startWidth = useRef<number>(0);

  // Persist column widths whenever they settle
  const persistTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateColWidth = (newWidths: Record<string, number>) => {
    setColWidths(newWidths);
    if (persistTimeoutRef.current) clearTimeout(persistTimeoutRef.current);
    persistTimeoutRef.current = setTimeout(() => {
      localStorage.setItem(storageKey, JSON.stringify(newWidths));
    }, 500);
  };


  const startResize = (e: React.MouseEvent, key: string, thRef: HTMLTableCellElement | null) => {
    if (!thRef) return;
    e.preventDefault();
    resizingCol.current = key;
    startX.current = e.clientX;
    startWidth.current = thRef.getBoundingClientRect().width;

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!resizingCol.current) return;
      const newWidth = Math.max(60, startWidth.current + (moveEvent.clientX - startX.current));
      setColWidths((prev) => {
        const next = { ...prev, [resizingCol.current!]: newWidth };
        if (persistTimeoutRef.current) clearTimeout(persistTimeoutRef.current);
        persistTimeoutRef.current = setTimeout(() => {
          localStorage.setItem(storageKey, JSON.stringify(next));
        }, 300);
        return next;
      });
    };

    const onMouseUp = () => {
      resizingCol.current = null;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const resetWidth = (e: React.MouseEvent, key: string) => {
    e.stopPropagation();
    setColWidths((prev) => {
      const next = { ...prev };
      delete next[key];
      // Salvar imediatamente no next tick sem o timer p/ o delete ser rápido
      localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  };

  // Header Renaming Logic
  const [editingCol, setEditingCol] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const handleDoubleClickHeader = (colKey: string, currentLabel: string) => {
    if (readOnly) return;
    setEditingCol(colKey);
    setRenameValue(currentLabel);
  };

  const handleRenameSubmit = (colKey: string) => {
    if ((onRenameColumn as any) && renameValue.trim()) {
      (onRenameColumn as any)(colKey, renameValue.trim());
    }
    setEditingCol(null);
  };

  /** Navigate cells with Tab/Enter */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>, rowIndex: number, colIndex: number) => {
      if (!tableRef.current) return;
      const totalCols = columns.length;
      const totalRows = rows.length;

      let nextRow = rowIndex;
      let nextCol = colIndex;

      if (e.key === "Tab") {
        e.preventDefault();
        if (e.shiftKey) {
          nextCol = colIndex - 1;
          if (nextCol < 0) { nextCol = totalCols - 1; nextRow = rowIndex - 1; }
        } else {
          nextCol = colIndex + 1;
          if (nextCol >= totalCols) { nextCol = 0; nextRow = rowIndex + 1; }
        }
      } else if (e.key === "Enter") {
        e.preventDefault();
        nextRow = rowIndex + 1;
        nextCol = 0;
      } else {
        return;
      }

      if (nextRow >= totalRows || nextRow < 0) return;

      const inputs = tableRef.current.querySelectorAll<HTMLInputElement>(
        `tbody tr:nth-child(${nextRow + 1}) input`
      );
      inputs[nextCol]?.focus();
    },
    [columns.length, rows.length]
  );

  /** Capture Excel/Sheets paste (TSV format) */
  const handlePaste = useCallback(
    (e: ClipboardEvent<HTMLInputElement>, rowIndex: number) => {
      const text = e.clipboardData.getData("text/plain");
      if (text.includes("\t") || text.includes("\n")) {
        e.preventDefault();
        onPaste(rowIndex, text);
      }
    },
    [onPaste]
  );

  const parseValue = (col: OfferColumnConfig, raw: string): string | number | null => {
    if (col.type === "currency") {
      const num = parseFloat(raw.replace(",", ".").replace(/[^\d.]/g, ""));
      return isNaN(num) ? null : num;
    }
    return raw;
  };

  return (
    <div className="Grade-Oferta overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface)]">
      <table ref={tableRef} className="w-full text-sm border-collapse">
        {/* Header */}
        <thead>
          <tr className="bg-[var(--background)] border-b border-[var(--border)]">
            <th className="px-3 py-2.5 text-left text-xs font-semibold text-[var(--muted)] border-r border-[var(--border)] w-12">#</th>
            {columns.map((col) => {
              const customWidth = colWidths[col.key as string];
              return (
                <th
                  key={col.key as string}
                  style={customWidth ? { minWidth: customWidth, width: customWidth, maxWidth: customWidth } : {}}
                  className={`relative px-3 py-2.5 text-left text-xs font-semibold text-[var(--muted)] border-r border-[var(--border)] last:border-r-0 ${customWidth ? "" : (col.width ?? "")} group/th`}
                >
                  {editingCol === (col.key as string) ? (
                    <input
                      type="text"
                      className="w-full bg-[var(--background)] px-1 py-0.5 rounded outline-none border border-[var(--color-primary)] text-[var(--foreground)]"
                      value={renameValue}
                      onChange={(e) => setRenameValue(e.target.value)}
                      onBlur={() => handleRenameSubmit(col.key as string)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleRenameSubmit(col.key as string);
                        if (e.key === "Escape") setEditingCol(null);
                      }}
                      autoFocus
                    />
                  ) : (
                    <div
                      onDoubleClick={() => handleDoubleClickHeader(col.key as string, col.label)}
                      className={readOnly ? "" : "cursor-pointer hover:text-[var(--foreground)] transition-colors"}
                      title={readOnly ? undefined : "Duplo clique para renomear"}
                    >
                      {col.label}
                    </div>
                  )}
                  <div
                    onMouseDown={(e) => startResize(e, col.key as string, e.currentTarget.parentElement as HTMLTableCellElement)}
                    onDoubleClick={(e) => resetWidth(e, col.key as string)}
                    className="absolute right-0 top-0 bottom-0 w-[5px] cursor-col-resize hover:bg-[var(--color-primary)] active:bg-[var(--color-primary)] transition-colors z-10"
                    title="Arrastar para redimensionar"
                  />
                </th>
              );
            })}
            {!readOnly && <th className="w-8 border-l border-[var(--border)]" />}
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-[var(--border)]">
          {rows.map((row, rowIndex) => (
            <tr
              key={row.id}
              className="group hover:bg-[var(--color-primary-light)]/20 transition-colors"
            >
              <td className="relative px-2 py-1.5 text-[10px] text-[var(--muted)] text-center select-none border-r border-[var(--border)] group/num min-w-[48px]">
                <div className="group-hover/num:opacity-0 transition-opacity font-medium">
                  {rowIndex + 1}
                </div>
                {!readOnly && (
                  <div className="absolute inset-0 flex items-center justify-center gap-0.5 opacity-0 group-hover/num:opacity-100 transition-all bg-[var(--background)] px-1">
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
                        disabled={rowIndex === rows.length - 1}
                        className="p-0.5 hover:text-[var(--color-primary)] transition-colors disabled:opacity-30"
                        title="Descer linha"
                      >
                        <ChevronDown size={12} />
                      </button>
                    </div>
                  </div>
                )}
              </td>

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
                      value={
                        col.type === "currency"
                          ? (row[col.key] ?? "") as string
                          : (row[col.key] ?? "") as string
                      }
                      placeholder={col.placeholder}
                      onChange={(e) =>
                        onUpdateRow(row.id, col.key, parseValue(col, e.target.value))
                      }
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                      onPaste={(e) => handlePaste(e, rowIndex)}
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

              {!readOnly && (
                <td className="px-1.5 py-1">
                  <button
                    type="button"
                    onClick={() => onRemoveRow(row.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-[var(--muted)] hover:text-[var(--color-danger)] transition-all rounded"
                    aria-label="Remover linha"
                    tabIndex={-1}
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer Area */}
      {!readOnly && (
        <div className="flex items-center justify-between p-2 border-t border-[var(--border)]">
          <button
            type="button"
            onClick={onAddRow}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[var(--muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] rounded-lg transition-colors"
          >
            <Plus size={14} />
            Adicionar linha
          </button>
          
          <button
            type="button"
            onClick={onClearTab}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[var(--muted)] hover:text-[var(--color-danger)] hover:bg-red-500/10 rounded-lg transition-colors"
            title="Limpar todos os dados desta tabela"
          >
            <ListX size={14} />
            Limpar Tabela
          </button>
        </div>
      )}
    </div>
  );
}
