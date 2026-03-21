"use client";

import { useRef, useCallback, useState, type KeyboardEvent, type ClipboardEvent } from "react";
import { Trash2, Plus } from "lucide-react";
import type { OfferRow, OfferColumnConfig, OfferType } from "@/mocks/types/offer-submission";
import { formatBRL } from "@/lib/format";

interface OfferTabGridProps {
  type: OfferType;
  rows: OfferRow[];
  columns: OfferColumnConfig[];
  readOnly?: boolean;
  onUpdateRow: (rowId: string, field: keyof OfferRow, value: string | number | null) => void;
  onAddRow: () => void;
  onRemoveRow: (rowId: string) => void;
  onPaste: (startIndex: number, tsv: string) => void;
}

export function OfferTabGrid({
  rows,
  columns,
  readOnly = false,
  onUpdateRow,
  onAddRow,
  onRemoveRow,
  onPaste,
}: OfferTabGridProps) {
  const tableRef = useRef<HTMLTableElement>(null);

  // Resize logic
  const [colWidths, setColWidths] = useState<Record<string, number>>({});
  const resizingCol = useRef<string | null>(null);
  const startX = useRef<number>(0);
  const startWidth = useRef<number>(0);

  const startResize = (e: React.MouseEvent, key: string, thRef: HTMLTableCellElement | null) => {
    if (!thRef) return;
    e.preventDefault();
    resizingCol.current = key;
    startX.current = e.clientX;
    startWidth.current = thRef.getBoundingClientRect().width;

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!resizingCol.current) return;
      const newWidth = Math.max(60, startWidth.current + (moveEvent.clientX - startX.current));
      setColWidths((prev) => ({ ...prev, [resizingCol.current!]: newWidth }));
    };

    const onMouseUp = () => {
      resizingCol.current = null;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
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
            <th className="px-3 py-2.5 text-left text-xs font-semibold text-[var(--muted)] w-8">#</th>
            {columns.map((col) => {
              const customWidth = colWidths[col.key as string];
              return (
                <th
                  key={col.key as string}
                  style={customWidth ? { minWidth: customWidth, width: customWidth, maxWidth: customWidth } : {}}
                  className={`relative px-3 py-2.5 text-left text-xs font-semibold text-[var(--muted)] ${customWidth ? "" : (col.width ?? "")}`}
                >
                  {col.label}
                  <div
                    onMouseDown={(e) => startResize(e, col.key as string, e.currentTarget.parentElement as HTMLTableCellElement)}
                    className="absolute right-0 top-0 bottom-0 w-[5px] cursor-col-resize hover:bg-[var(--color-primary)] active:bg-[var(--color-primary)] transition-colors z-10"
                    title="Arrastar para redimensionar"
                  />
                </th>
              );
            })}
            {!readOnly && <th className="w-8" />}
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-[var(--border)]">
          {rows.map((row, rowIndex) => (
            <tr
              key={row.id}
              className="group hover:bg-[var(--color-primary-light)]/20 transition-colors"
            >
              <td className="px-3 py-1.5 text-xs text-[var(--muted)] text-center select-none">
                {rowIndex + 1}
              </td>

              {columns.map((col, colIndex) => (
                <td key={col.key} className="px-1.5 py-1">
                  {readOnly ? (
                    <span className="px-2 py-1.5 block text-sm">
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
                        Célula-Planilha w-full px-2 py-1.5 rounded
                        bg-transparent text-sm text-[var(--foreground)]
                        placeholder:text-[var(--muted)]/50
                        border border-transparent
                        focus:outline-none focus:border-[var(--color-primary)]/60
                        focus:bg-[var(--color-primary-light)]/30
                        transition-colors
                        ${col.key !== "descricao" ? "text-center" : ""}
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

      {/* Add row button */}
      {!readOnly && (
        <div className="p-2 border-t border-[var(--border)]">
          <button
            type="button"
            onClick={onAddRow}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[var(--muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] rounded-lg transition-colors"
          >
            <Plus size={14} />
            Adicionar linha
          </button>
        </div>
      )}
    </div>
  );
}
