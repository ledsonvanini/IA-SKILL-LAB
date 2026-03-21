"use client";

import { useMemo, useState } from "react";
import { Send, RotateCcw, Save, FileUp, Table, Bell, XCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui";
import { OfferTypeTabs } from "./OfferTypeTabs";
import { OfferTabGrid } from "./OfferTabGrid";
import { UploadDropzone } from "./UploadDropzone";
import type { OfferType } from "@/mocks/types/offer-submission";
import { OFFER_COLUMNS, OFFER_TYPE_ORDER, OFFER_TYPE_META } from "@/mocks/types/offer-submission";
import { useOfferStorage } from "../offer-submission/useOfferStorage";
import { useAuth } from "@/contexts/AuthContext";

type InputMode = "grid" | "upload";

export function ManagerView() {
  const { user } = useAuth();
  const {
    submission,
    hasManagerNotification,
    clearManagerNotification,
    getTab,
    addRow,
    removeRow,
    insertRow,
    moveRow,
    clearTab,
    updateRow,
    pasteRows,
    loadRows,
    updatePeriod,
    updateNotes,
    sendToAgency,
    resetDraft,
    setColumns,
  } = useOfferStorage();

  const [activeType, setActiveType] = useState<OfferType>("tv");
  const [inputMode, setInputMode] = useState<InputMode>("grid");
 
  const tab = getTab(activeType);
  const columns = tab.columns || OFFER_COLUMNS[activeType];
  const isLocked = submission.status !== "draft";
  const isSent = submission.status === "sent" || submission.status === "received";

  const handleSend = () => {
    sendToAgency(user?.name ?? "Gerente", user?.unitId ?? "");
    toast.success("Ofertas enviadas com sucesso para a Agência!");
  };

  // Calcular badges (quais abas possuem dados preenchidos)
  const badges = useMemo(() => {
    const b: Partial<Record<OfferType, boolean>> = {};
    OFFER_TYPE_ORDER.forEach((t) => {
      const tb = submission.tabs[t];
      if (tb && tb.rows.length > 0) {
        // Checar se há ao menos 1 linha com descrição preenchida
        b[t] = tb.rows.some((r) => r.descricao?.trim().length > 0);
      } else {
        b[t] = false;
      }
    });
    return b;
  }, [submission.tabs]);

  const receivedDateStr = submission.receivedAt
    ? new Date(submission.receivedAt).toLocaleTimeString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className="Tela-Gerente space-y-6">
      {/* Receipt Notification Banner for Manager */}
      {hasManagerNotification && submission.status === "received" && (
        <div className="Banner-Recebimento flex items-start sm:items-center justify-between gap-3 p-4 rounded-xl border border-[var(--color-success)] bg-[var(--color-success-bg)] shadow-sm animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center gap-3 text-[var(--color-success)]">
            <Bell size={20} className="hidden sm:block" />
            <div className="text-sm font-semibold">
              <p>
                A agência confirmou o recebimento em <strong>{receivedDateStr}</strong>.
              </p>
              <p className="text-xs font-normal mt-0.5 opacity-90">
                Recebido: {Object.keys(submission.tabs)
                  .map(k => k as OfferType)
                  .filter(k => submission.tabs[k]?.rows.some(r => r.descricao.trim()))
                  .map(k => OFFER_TYPE_META[k].label)
                  .join(", ") || "Sem dados enviados"}
              </p>
            </div>
          </div>
          <button
            onClick={clearManagerNotification}
            className="text-[var(--color-success)] hover:opacity-75 transition-opacity"
            aria-label="Dispensar notificação"
          >
            <XCircle size={18} />
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Planejamento</h1>
          <p className="text-sm text-[var(--muted)] mt-0.5">
            Cadastre os produtos por tipo de mídia e envie para a Agência revisar.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {submission.status === "received" && !hasManagerNotification && (
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[var(--color-success-bg)] text-[var(--color-success)]">
              ✓ Recebido ({receivedDateStr})
            </span>
          )}
          {submission.status === "sent" && (
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[var(--color-success-bg)] text-[var(--color-success)]">
              ✓ Enviado para agência
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={resetDraft}
            title="Limpar tudo e começar um novo rascunho"
          >
            <RotateCcw size={14} />
            Novo rascunho
          </Button>
          {!isLocked && (
            <Button
              variant="primary"
              size="sm"
              onClick={handleSend}
            >
              <Send size={14} />
              Enviar para Agência
            </Button>
          )}
        </div>
      </div>

      {/* Period Input */}
      <div className="flex items-center gap-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
        <label htmlFor="period-input" className="text-sm font-semibold whitespace-nowrap">
          Período das Ofertas:
        </label>
        <input
          id="period-input"
          type="text"
          value={tab.period}
          onChange={(e) => updatePeriod(activeType, e.target.value)}
          placeholder="Ex: 25/03 a 27/03"
          disabled={isLocked}
          className="flex-1 bg-transparent text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]/60 border-b border-[var(--border)] focus:outline-none focus:border-[var(--color-primary)] pb-0.5 transition-colors disabled:opacity-50"
        />
      </div>

      {/* Type Tabs */}
      <OfferTypeTabs active={activeType} onChange={setActiveType} badges={badges} />

      {/* Input Mode Toggle */}
      {!isLocked && (
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
            Grade / Colar
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

      {/* Editing Area */}
      {!isLocked && inputMode === "grid" && (
        <div className="space-y-2">
          <p className="text-xs text-[var(--muted)]">
            💡 Dica: você pode <strong>copiar do Excel</strong> e colar diretamente nas células abaixo.
            Use <kbd className="px-1 py-0.5 rounded border border-[var(--border)] text-[10px]">Tab</kbd> para navegar entre colunas e{" "}
            <kbd className="px-1 py-0.5 rounded border border-[var(--border)] text-[10px]">Enter</kbd> para a próxima linha.
          </p>
          <OfferTabGrid
            type={activeType}
            rows={tab.rows}
            columns={columns}
            onUpdateRow={(rowId, field, value) => updateRow(activeType, rowId, field, value)}
            onAddRow={() => addRow(activeType)}
            onRemoveRow={(rowId) => removeRow(activeType, rowId)}
            onRenameColumn={(key, newLabel) => {
              const newCols = columns.map(c => 
                (c.key as string) === key ? { ...c, label: newLabel } : c
              );
              setColumns(activeType, newCols);
            }}
            onPaste={(startIndex, tsv) =>
              pasteRows(activeType, startIndex, tsv, columns.map((c) => c.key))
            }
            onInsertRow={(index) => insertRow(activeType, index)}
            onMoveRow={(index, dir) => moveRow(activeType, index, dir)}
            onClearTab={() => clearTab(activeType)}
          />
        </div>
      )}

      {!isLocked && inputMode === "upload" && (
        <UploadDropzone
          type={activeType}
          columns={columns}
          onLoad={(rows, newCols) => { loadRows(activeType, rows, newCols); setInputMode("grid"); }}
        />
      )}

      {/* Read-only view when sent */}
      {isLocked && (
        <OfferTabGrid
          type={activeType}
          rows={tab.rows}
          columns={columns}
          readOnly
          onUpdateRow={() => {}}
          onAddRow={() => {}}
          onRemoveRow={() => {}}
          onPaste={() => {}}
          onInsertRow={() => {}}
          onMoveRow={() => {}}
          onClearTab={() => {}}
        />
      )}

      {/* Notes */}
      <div className="Seção-Observações bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 space-y-2">
        <label htmlFor="offer-notes" className="text-sm font-semibold">
          Observações gerais
        </label>
        <textarea
          id="offer-notes"
          rows={3}
          value={submission.notes ?? ""}
          onChange={(e) => updateNotes(e.target.value)}
          disabled={isLocked}
          placeholder="Ex: Confirmar disponibilidade de estoque antes de veicular..."
          className="w-full bg-[var(--background)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]/60 rounded-lg border border-[var(--border)] p-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 resize-none transition-colors disabled:opacity-50"
        />
      </div>

      {/* Bottom Send */}
      {!isLocked && (
        <div className="flex justify-end gap-2 pb-4">
          <Button variant="secondary" size="md">
            <Save size={15} />
            Rascunho salvo automaticamente
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleSend}
          >
            <Send size={15} />
            Enviar para Agência
          </Button>
        </div>
      )}
    </div>
  );
}
