"use client";

import { useState, useCallback, useRef } from "react";
import { PlusCircle, Trash2, ChevronLeft, ChevronRight, Send, FileUp, Table } from "lucide-react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui";
import { useAuth } from "@/contexts/AuthContext";
import { UploadDropzone } from "./UploadDropzone";
import type { OfferRow, OfferColumnConfig } from "@/mocks/types/offer-submission";

// ── Types ────────────────────────────────────────────────────────────────────

export type ProgramacaoType = "weekly" | "monthly";
export type WeekDay = "Terça a Quinta" | "Sexta a Segunda" | "Terça a Domingo" | "Segunda a Domingo";

export interface ProgramacaoRow {
  id: string;
  datas: string;          // "03, 04 e 05 de Março"
  diasSemana: WeekDay | string;
  material: string;       // Nome da campanha / material
  dataEntrega: string;    // "02 de Março"
}

export interface MonthSchedule {
  month: number;         // 1–12
  year: number;
  rows: ProgramacaoRow[];
  submittedAt: string | null;
  status: "draft" | "sent" | "received";
}

// ── Storage ──────────────────────────────────────────────────────────────────

function getStorageKey(type: ProgramacaoType) {
  return `@meta21:programacao_${type}`;
}

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

function emptyRow(): ProgramacaoRow {
  return { id: generateId(), datas: "", diasSemana: "", material: "", dataEntrega: "" };
}

function loadSchedule(type: ProgramacaoType, month: number, year: number): MonthSchedule {
  try {
    const raw = localStorage.getItem(`${getStorageKey(type)}_${year}_${month}`);
    if (raw) return JSON.parse(raw) as MonthSchedule;
  } catch { /* ignore */ }
  return { month, year, rows: [emptyRow(), emptyRow()], submittedAt: null, status: "draft" };
}

function saveSchedule(type: ProgramacaoType, schedule: MonthSchedule) {
  localStorage.setItem(
    `${getStorageKey(type)}_${schedule.year}_${schedule.month}`,
    JSON.stringify(schedule)
  );
}

// ── Constants ─────────────────────────────────────────────────────────────────

const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const DIAS_OPTIONS: string[] = [
  "Terça a Quinta",
  "Sexta a Segunda",
  "Terça a Domingo",
  "Segunda a Domingo",
  "Terça a Sábado",
];

const COLUMNS = [
  { key: "datas" as const,        label: "Datas de Viculação", width: "min-w-[200px]", type: "text" },
  { key: "diasSemana" as const,   label: "Dias da Semana",   width: "min-w-[180px]", type: "select" },
  { key: "material" as const,     label: "Título Material",  width: "min-w-[200px]", type: "text" },
  { key: "dataEntrega" as const,  label: "Data de Entrega",  width: "w-36",  type: "text" },
];

// ── Component ─────────────────────────────────────────────────────────────────

interface ProgramacaoViewProps {
  type: ProgramacaoType;
}

export function ProgramacaoView({ type }: ProgramacaoViewProps) {
  const { user } = useAuth();
  const isReadOnly = user?.role === "admin";

  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [schedule, setSchedule] = useState<MonthSchedule>(() => loadSchedule(type, now.getMonth() + 1, now.getFullYear()));
  const [inputMode, setInputMode] = useState<"grid" | "upload">("grid");

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

  // Navigate months
  const navigate = useCallback((delta: number) => {
    setMonth((prevM) => {
      setYear((prevY) => {
        let m = prevM + delta;
        let y = prevY;
        if (m > 12) { m = 1; y++; }
        if (m < 1)  { m = 12; y--; }
        setSchedule(loadSchedule(type, m, y));
        return y;
      });
      let m = prevM + delta;
      if (m > 12) m = 1;
      if (m < 1) m = 12;
      return m;
    });
  }, [type]);

  const updateField = useCallback(
    (id: string, field: keyof ProgramacaoRow, value: string | number) => {
      const updated = {
        ...schedule,
        rows: schedule.rows.map((r) => r.id === id ? { ...r, [field]: value } : r),
      };
      saveSchedule(type, updated);
      setSchedule(updated);
    },
    [schedule, type]
  );

  const addRow = useCallback(() => {
    const updated = { ...schedule, rows: [...schedule.rows, emptyRow()] };
    saveSchedule(type, updated);
    setSchedule(updated);
  }, [schedule, type]);

  const removeRow = useCallback((id: string) => {
    const rows = schedule.rows.filter((r) => r.id !== id);
    const updated = { ...schedule, rows: rows.length ? rows : [emptyRow()] };
    saveSchedule(type, updated);
    setSchedule(updated);
  }, [schedule, type]);

  const sendToAgency = useCallback(() => {
    const updated: MonthSchedule = {
      ...schedule,
      status: "sent",
      submittedAt: new Date().toISOString(),
    };
    saveSchedule(type, updated);
    setSchedule(updated);
    localStorage.setItem(`@meta21:programacao_notification_${type}`, "true");
    
    toast.success("Planejamento enviado para a Agência!");
  }, [schedule, type]);

  const markReceived = useCallback(() => {
    const updated: MonthSchedule = { ...schedule, status: "received" };
    saveSchedule(type, updated);
    setSchedule(updated);
    localStorage.removeItem(`@meta21:programacao_notification_${type}`);
    toast.success("Planejamento marcado como recebido.");
  }, [schedule, type]);

  const isSent = schedule.status === "sent";
  const isReceived = schedule.status === "received";
  const locked = isSent || isReadOnly;

  const title = type === "weekly" ? "Planejamento Semanal" : "Planejamento Mensal";

  return (
    <div className="Tela-Programação space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight">{title}</h1>
          <p className="text-sm text-[var(--muted)] mt-0.5">
            Planejamento de veiculação e limites de datas para a Agência.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {isReadOnly && isSent && (
            <Button size="sm" onClick={markReceived}>Marcar como Recebido</Button>
          )}
          {isReceived && (
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[var(--color-success-bg)] text-[var(--color-success)]">
              ✓ Recebido
            </span>
          )}
          {!isReadOnly && !locked && (
            <Button size="sm" onClick={sendToAgency}>
              <Send size={14} />
              Enviar para Agência
            </Button>
          )}
          {!isReadOnly && isSent && (
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[var(--color-warning-bg)] text-[var(--color-warning)]">
              ✓ Enviado — aguardando confirmação
            </span>
          )}
        </div>
      </div>

      {/* Month Navigator */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg border border-[var(--border)] hover:bg-[var(--color-primary-light)] text-[var(--muted)] hover:text-[var(--color-primary)] transition-colors"
          aria-label="Mês anterior"
        >
          <ChevronLeft size={18} />
        </button>
        <h2 className="text-lg font-bold min-w-[160px] text-center">
          {MONTH_NAMES[month - 1]} {year}
        </h2>
        <button
          type="button"
          onClick={() => navigate(1)}
          className="p-2 rounded-lg border border-[var(--border)] hover:bg-[var(--color-primary-light)] text-[var(--muted)] hover:text-[var(--color-primary)] transition-colors"
          aria-label="Próximo mês"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Input Mode Toggle */}
      {!locked && (
        <div className="flex items-center gap-1 p-1 bg-[var(--background)] rounded-lg w-fit border border-[var(--border)]">
          <button
            type="button"
            onClick={() => setInputMode("grid")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              inputMode === "grid"
                ? "bg-[var(--surface)] text-[var(--foreground)] shadow-sm"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            <Table size={13} />
            Grade
          </button>
          <button
            type="button"
            onClick={() => setInputMode("upload")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              inputMode === "upload"
                ? "bg-[var(--surface)] text-[var(--foreground)] shadow-sm"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            <FileUp size={13} />
            Importar arquivo
          </button>
        </div>
      )}

      {/* Upload Zone */}
      {!locked && inputMode === "upload" && (
        <UploadDropzone
          type={"tv" as const}
          columns={COLUMNS as OfferColumnConfig[]}
          onLoad={(uploadRows) => {
            const newRows: ProgramacaoRow[] = uploadRows.map(r => ({
              id: r.id,
              datas: String(r.datas || ""),
              diasSemana: String(r.diasSemana || "Terça a Quinta"),
              material: String(r.material || r.descricao || ""),
              dataEntrega: String(r.dataEntrega || "")
            }));
            const updated = { ...schedule, rows: newRows.length ? newRows : [emptyRow()] };
            saveSchedule(type, updated);
            setSchedule(updated);
            setInputMode("grid");
            toast.success("Dados importados com sucesso!");
          }}
        />
      )}

      {/* Legend Area if needed (Currently empty since removed) */}
      {(locked || inputMode === "grid") && (
        <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--muted)] min-h-[16px]">
        </div>
      )}

      {/* Table */}
      <div className="Tabela-Programação overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface)]">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[var(--background)] border-b border-[var(--border)]">
              {COLUMNS.map((col) => {
                const customWidth = colWidths[col.key as string];
                return (
                  <th
                    key={col.key as string}
                    style={customWidth ? { minWidth: customWidth, width: customWidth, maxWidth: customWidth } : {}}
                    className={`relative px-3 py-3 text-left text-xs font-semibold text-[var(--muted)] border-r border-[var(--border)] last:border-r-0 ${customWidth ? "" : col.width}`}
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
              {!locked && <th className="w-8 border-l border-[var(--border)]" />}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {schedule.rows.map((row, idx) => {
              return (
                <tr key={row.id} className="group transition-colors hover:bg-[var(--color-primary-light)]/20">
                  {COLUMNS.map((col) => (
                    <td key={col.key} className="px-1.5 py-1 border-r border-[var(--border)] last:border-r-0">
                      {locked ? (
                        <span className="px-2 py-1.5 block text-sm">
                          {String(row[col.key] ?? "—")}
                        </span>
                      ) : col.type === "select" ? (
                        <select
                          value={(row[col.key] as string) ?? ""}
                          onChange={(e) => updateField(row.id, col.key, e.target.value)}
                          className="Célula-Select w-full px-2 py-1.5 rounded bg-transparent text-sm text-[var(--foreground)] border border-transparent focus:outline-none focus:border-[var(--color-primary)]/60 focus:bg-[var(--color-primary-light)]/30 transition-colors cursor-pointer"
                        >
                          <option value="">Selecionar...</option>
                          {DIAS_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                          <option value={row.diasSemana && !DIAS_OPTIONS.includes(row.diasSemana as string) ? row.diasSemana as string : "__custom__"}>
                            Outro...
                          </option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={(row[col.key] as string) ?? ""}
                          onChange={(e) => updateField(row.id, col.key, e.target.value)}
                          placeholder={col.key === "material" ? "Ex: MARÇO TA BARATO META 21" : "DD/MM"}
                          className="Célula-Texto w-full px-2 py-1.5 rounded bg-transparent text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]/50 border border-transparent focus:outline-none focus:border-[var(--color-primary)]/60 focus:bg-[var(--color-primary-light)]/30 transition-colors"
                        />
                      )}
                    </td>
                  ))}
                  {!locked && (
                    <td className="px-1.5 py-1">
                      <button
                        type="button"
                        onClick={() => removeRow(row.id)}
                        tabIndex={-1}
                        className="opacity-0 group-hover:opacity-100 p-1 text-[var(--muted)] hover:text-[var(--color-danger)] transition-all rounded"
                        aria-label={`Remover linha ${idx + 1}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>

        {!locked && (
          <div className="p-2 border-t border-[var(--border)]">
            <button
              type="button"
              onClick={addRow}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[var(--muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] rounded-lg transition-colors"
            >
              <PlusCircle size={14} />
              Adicionar linha
            </button>
          </div>
        )}
      </div>

      {/* Auto-save note */}
      {!locked && (
        <p className="text-xs text-[var(--muted)] text-right">
          💾 Salvo automaticamente no navegador.
        </p>
      )}
    </div>
  );
}
