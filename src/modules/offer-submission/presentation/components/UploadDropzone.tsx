"use client";

import { useRef, useState, type DragEvent, type ChangeEvent } from "react";
import { UploadCloud, FileSpreadsheet, X } from "lucide-react";
import type { OfferRow, OfferType, OfferColumnConfig } from "@/mocks/types/offer-submission";
import { Button } from "@/components/ui";

interface UploadDropzoneProps {
  type: OfferType;
  columns: OfferColumnConfig[];
  onLoad: (rows: OfferRow[]) => void;
}

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

function tsvToRows(tsv: string, columns: OfferColumnConfig[], hasHeaderRow: boolean): OfferRow[] {
  const lines = tsv.trim().split("\n").filter(Boolean);
  const startLine = hasHeaderRow ? 1 : 0;

  return lines.slice(startLine).map((line) => {
    const cells = line.split("\t");
    const row: OfferRow = { id: generateId(), descricao: "", venda: null, promocao: null, limite: "" };
    columns.forEach((col, i) => {
      const val = cells[i]?.trim() ?? "";
      if (col.type === "currency") {
        const num = parseFloat(val.replace(",", ".").replace(/[^\d.]/g, ""));
        (row as unknown as Record<string, unknown>)[col.key] = isNaN(num) ? null : num;
      } else {
        (row as unknown as Record<string, unknown>)[col.key] = val;
      }
    });
    return row;
  }).filter((r) => r.descricao);
}

export function UploadDropzone({ columns, onLoad }: UploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<OfferRow[] | null>(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [hasHeaderRow, setHasHeaderRow] = useState(true);

  const processFile = async (file: File) => {
    setError("");
    const name = file.name;
    setFileName(name);

    if (name.endsWith(".csv")) {
      const text = await file.text();
      // Brazilian CSV uses ";" as separator — normalise to tabs
      const normalised = text.replace(/;/g, "\t");
      const rows = tsvToRows(normalised, columns, hasHeaderRow);
      if (!rows.length) { setError("Nenhuma linha válida encontrada no arquivo."); return; }
      setPreview(rows);
    } else if (name.endsWith(".xlsx") || name.endsWith(".xls")) {
      const XLSX = await import("xlsx");
      const buffer = await file.arrayBuffer();
      const wb = XLSX.read(buffer, { type: "array" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const tsv = XLSX.utils.sheet_to_csv(ws, { FS: "\t" });
      const rows = tsvToRows(tsv, columns, hasHeaderRow);
      if (!rows.length) { setError("Nenhuma linha válida encontrada na planilha."); return; }
      setPreview(rows);
    } else {
      setError("Formato inválido. Use .csv, .xlsx ou .xls");
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const confirmImport = () => {
    if (preview) {
      onLoad(preview);
      setPreview(null);
      setFileName("");
    }
  };

  const cancel = () => {
    setPreview(null);
    setFileName("");
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="Upload-Dropzone space-y-3">
      {/* Drop area */}
      {!preview && (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          className={`
            flex flex-col items-center justify-center gap-3 p-8 rounded-xl
            border-2 border-dashed cursor-pointer transition-colors
            ${isDragging
              ? "border-[var(--color-primary)] bg-[var(--color-primary-light)]"
              : "border-[var(--border)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-primary-light)]/30"
            }
          `}
          aria-label="Área de upload de arquivo"
        >
          <UploadCloud size={36} className="text-[var(--muted)]" strokeWidth={1.5} />
          <div className="text-center">
            <p className="text-sm font-semibold text-[var(--foreground)]">
              Arraste um arquivo ou clique para importar
            </p>
            <p className="text-xs text-[var(--muted)] mt-1">.csv (ponto-e-vírgula), .xlsx ou .xls</p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            className="hidden"
            onChange={handleChange}
          />
        </div>
      )}

      {/* Options */}
      {!preview && (
        <div className="flex items-center gap-2 px-1">
          <input
            type="checkbox"
            id="hasHeaderRow"
            checked={hasHeaderRow}
            onChange={(e) => setHasHeaderRow(e.target.checked)}
            className="w-4 h-4 rounded border-[var(--border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)] bg-[var(--surface)] cursor-pointer"
          />
          <label htmlFor="hasHeaderRow" className="text-sm font-medium text-[var(--foreground)] cursor-pointer select-none">
            Usar primeira linha como cabeçalho (ignorar)
          </label>
        </div>
      )}

      {error && (
        <p className="text-xs text-[var(--color-danger)] font-medium" role="alert">{error}</p>
      )}

      {/* Preview */}
      {preview && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
              <FileSpreadsheet size={16} className="text-[var(--color-primary)]" />
              {fileName} — <span className="text-[var(--muted)] font-normal">{preview.length} linhas detectadas</span>
            </div>
            <button
              type="button"
              onClick={cancel}
              className="text-[var(--muted)] hover:text-[var(--foreground)] p-1 rounded transition-colors"
              aria-label="Cancelar import"
            >
              <X size={16} />
            </button>
          </div>

          {/* Mini preview table */}
          <div className="overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--surface)] max-h-48">
            <table className="w-full text-xs">
              <thead className="bg-[var(--background)] sticky top-0">
                <tr>
                  {columns.map((col) => (
                    <th key={col.key} className="px-3 py-2 text-left font-semibold text-[var(--muted)]">
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {preview.slice(0, 8).map((row) => (
                  <tr key={row.id}>
                    {columns.map((col) => (
                      <td key={col.key} className="px-3 py-1.5 text-[var(--foreground)]">
                        {row[col.key] != null ? String(row[col.key]) : "—"}
                      </td>
                    ))}
                  </tr>
                ))}
                {preview.length > 8 && (
                  <tr>
                    <td colSpan={columns.length} className="px-3 py-1.5 text-[var(--muted)] text-center">
                      + {preview.length - 8} linhas adicionais
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" onClick={confirmImport}>
              Confirmar importação
            </Button>
            <Button size="sm" variant="ghost" onClick={cancel}>
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
