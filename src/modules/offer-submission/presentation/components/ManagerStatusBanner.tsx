"use client";

import { Bell, XCircle } from "lucide-react";
import type { OfferSubmission, OfferType } from "@/mocks/types/offer-submission";
import { OFFER_TYPE_META } from "@/mocks/types/offer-submission";

interface ManagerStatusBannerProps {
  submission: OfferSubmission;
  hasManagerNotification: boolean;
  onClearNotification: () => void;
}

export function ManagerStatusBanner({
  submission,
  hasManagerNotification,
  onClearNotification,
}: ManagerStatusBannerProps) {
  if (!hasManagerNotification || submission.status !== "received") {
    return null;
  }

  const receivedDateStr = submission.receivedAt
    ? new Date(submission.receivedAt).toLocaleTimeString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const submittedTabsList = Object.keys(submission.tabs)
    .map((k) => k as OfferType)
    .filter((k) => submission.tabs[k]?.rows.some((r) => r.descricao.trim()))
    .map((k) => OFFER_TYPE_META[k].label)
    .join(", ");

  return (
    <div className="Banner-Recebimento flex items-start sm:items-center justify-between gap-3 p-4 rounded-xl border border-[var(--color-success)] bg-[var(--color-success-bg)] shadow-sm animate-in fade-in slide-in-from-top-4">
      <div className="flex items-center gap-3 text-[var(--color-success)]">
        <Bell size={20} className="hidden sm:block" />
        <div className="text-sm font-semibold">
          <p>
            A agência confirmou o recebimento em <strong>{receivedDateStr}</strong>.
          </p>
          <p className="text-xs font-normal mt-0.5 opacity-90">
            Recebido: {submittedTabsList || "Sem dados enviados"}
          </p>
        </div>
      </div>
      <button
        onClick={onClearNotification}
        className="text-[var(--color-success)] hover:opacity-75 transition-opacity"
        aria-label="Dispensar notificação"
      >
        <XCircle size={18} />
      </button>
    </div>
  );
}
