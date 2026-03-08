"use client";

import { useState } from "react";
import { X, Tag, Ticket, Copy, Check } from "lucide-react";
import { Badge, Button } from "@/components/ui";

interface CouponPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Coupon {
  code: string;
  label: string;
  discount: string;
  category: string;
  expiry: string;
}

const MOCK_COUPONS: Coupon[] = [
  {
    code: "ACOUGUE10",
    label: "Açougue",
    discount: "10% OFF",
    category: "Carnes e Açougue",
    expiry: "31/03/2026",
  },
  {
    code: "CERVEJA5",
    label: "Cervejas",
    discount: "R$ 5 OFF",
    category: "Cervejas acima de R$ 30",
    expiry: "15/04/2026",
  },
  {
    code: "TRABALHADOR",
    label: "#trabalhador",
    discount: "15% OFF",
    category: "Toda a loja — Dia do Trabalhador",
    expiry: "01/05/2026",
  },
  {
    code: "REFRI20",
    label: "Refrigerantes",
    discount: "20% OFF",
    category: "Refrigerantes 2L",
    expiry: "20/03/2026",
  },
  {
    code: "PADARIA8",
    label: "Padaria",
    discount: "R$ 8 OFF",
    category: "Pães e bolos acima de R$ 25",
    expiry: "10/04/2026",
  },
];

function CouponCard({ coupon }: { coupon: Coupon }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="Card-Cupom flex items-center gap-4 p-4 rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface)] hover:border-[var(--color-primary)]/60 transition-colors">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white">
        <Ticket size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-black text-sm text-[var(--color-primary)]">
            {coupon.discount}
          </span>
          <Badge variant="info" className="text-[9px] px-1.5 py-0">
            {coupon.label}
          </Badge>
        </div>
        <p className="text-xs text-[var(--muted)] truncate">{coupon.category}</p>
        <p className="text-[10px] text-[var(--muted)]">
          Até {coupon.expiry}
        </p>
      </div>
      <button
        onClick={handleCopy}
        className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs font-bold text-[var(--foreground)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
        title="Copiar código"
      >
        {copied ? (
          <>
            <Check size={12} /> Copiado
          </>
        ) : (
          <>
            <Copy size={12} /> {coupon.code}
          </>
        )}
      </button>
    </div>
  );
}

export function CouponPopover({ isOpen, onClose }: CouponPopoverProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="Popover-Cupons fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-[90] bg-[var(--surface)] rounded-2xl shadow-2xl border border-[var(--border)] sm:w-[480px] sm:max-h-[560px] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <Tag size={20} className="text-[var(--color-primary)]" />
            <h2 className="text-lg font-bold">Aplicar Cupons de Desconto</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors rounded-lg"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5 border-b border-[var(--border)]">
          <div className="flex gap-2">
            <input
              className="flex-1 px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 focus:border-[var(--color-primary)]"
              placeholder="Digite o código do cupom"
              type="text"
              aria-label="Código do cupom"
            />
            <Button variant="primary" size="md">
              Aplicar
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-styled p-5 space-y-3">
          <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider mb-2">
            Cupons disponíveis
          </p>
          {MOCK_COUPONS.map((c) => (
            <CouponCard key={c.code} coupon={c} />
          ))}
        </div>
      </div>
    </>
  );
}
