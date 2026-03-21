"use client";

import { useMemo, useState } from "react";
import { CheckCheck, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui";
import { OfferTypeTabs } from "./OfferTypeTabs";
import { OfferTabGrid } from "./OfferTabGrid";
import type { OfferType } from "@/mocks/types/offer-submission";
import { OFFER_COLUMNS, OFFER_TYPE_META, OFFER_TYPE_ORDER } from "@/mocks/types/offer-submission";
import { useOfferStorage } from "../offer-submission/useOfferStorage";

export function AgencyView() {
  const { submission, markAsReceived } = useOfferStorage();
  const [activeType, setActiveType] = useState<OfferType>("tv");

  const tab = submission.tabs[activeType];
  const columns = tab?.columns || OFFER_COLUMNS[activeType];
  const isSent = submission.status === "sent";
  const isReceived = submission.status === "received";
  const hasData = submission.status !== "draft" && Object.keys(submission.tabs).length > 0;

  // Calcular badges para agência ver as abas com dados
  const badges = useMemo(() => {
    const b: Partial<Record<OfferType, boolean>> = {};
    if (hasData) {
      OFFER_TYPE_ORDER.forEach((t) => {
        const tb = submission.tabs[t];
        if (tb && tb.rows.length > 0) {
          b[t] = tb.rows.some((r) => r.descricao?.trim().length > 0);
        } else {
          b[t] = false;
        }
      });
    }
    return b;
  }, [submission.tabs, hasData]);

  const submittedDate = submission.submittedAt
    ? new Date(submission.submittedAt).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="Tela-Agência space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Ofertas Recebidas</h1>
          <p className="text-sm text-[var(--muted)] mt-0.5">
            Visualize as ofertas enviadas pelo gerente e confirme o recebimento.
          </p>
        </div>
        {isSent && (
          <Button variant="primary" size="md" onClick={markAsReceived}>
            <CheckCheck size={16} />
            Marcar como Recebido
          </Button>
        )}
        {isReceived && (
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[var(--color-success-bg)] text-[var(--color-success)]">
            ✓ Recebido e confirmado
          </span>
        )}
      </div>

      {/* Meta Info Banner */}
      {hasData && submittedDate && (
        <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm">
          <div>
            <span className="text-[var(--muted)]">Enviado por </span>
            <strong className="text-[var(--foreground)]">{submission.submittedBy || "Gerente"}</strong>
          </div>
          <div>
            <span className="text-[var(--muted)]">em </span>
            <strong className="text-[var(--foreground)]">{submittedDate}</strong>
          </div>
          <div className={`ml-auto px-3 py-1 rounded-full text-xs font-bold ${
            isSent
              ? "bg-[var(--color-warning-bg)] text-[var(--color-warning)]"
              : "bg-[var(--color-success-bg)] text-[var(--color-success)]"
          }`}>
            {isSent ? "Aguardando confirmação" : "Recebido"}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!hasData && (
        <div className="flex flex-col items-center justify-center py-20 text-center text-[var(--muted)] gap-4">
          <ClipboardList size={48} strokeWidth={1.2} />
          <div>
            <p className="font-semibold">Nenhuma oferta recebida ainda</p>
            <p className="text-sm mt-1">Quando o gerente enviar as ofertas, elas aparecerão aqui.</p>
          </div>
        </div>
      )}

      {/* Content when there are offers */}
      {hasData && (
        <div className="space-y-4">
          {/* Type Tabs — only show tabs with data */}
          <OfferTypeTabs active={activeType} onChange={setActiveType} badges={badges} />

          {/* Tab period label */}
          {tab?.period && (
            <p className="text-sm font-semibold text-[var(--foreground)]">
              📅 Período:{" "}
              <span className="font-normal text-[var(--muted)]">{tab.period}</span>
            </p>
          )}

          {/* Grid — read only */}
          {tab ? (
            <OfferTabGrid
              type={activeType}
              rows={tab.rows}
              columns={columns}
              readOnly
              onUpdateRow={() => {}}
              onAddRow={() => {}}
              onRemoveRow={() => {}}
              onInsertRow={() => {}}
              onMoveRow={() => {}}
              onClearTab={() => {}}
              onPaste={() => {}}
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-[var(--muted)] border border-dashed border-[var(--border)] rounded-xl">
              <p className="text-sm">
                Nenhuma oferta cadastrada em{" "}
                <strong>{OFFER_TYPE_META[activeType].label}</strong>.
              </p>
            </div>
          )}

          {/* Notes */}
          {submission.notes && (
            <div className="Seção-Observações bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 space-y-1">
              <p className="text-sm font-semibold">Observações do gerente</p>
              <p className="text-sm text-[var(--muted)] whitespace-pre-wrap">{submission.notes}</p>
            </div>
          )}

          {/* Bottom confirm */}
          {isSent && (
            <div className="flex justify-end pb-4 pt-4">
              <Button variant="primary" size="md" onClick={markAsReceived}>
                <CheckCheck size={16} />
                Marcar como Recebido
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
