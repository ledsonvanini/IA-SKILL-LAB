"use client";

import { useState } from "react";
import { Tag, Ticket, Copy, Check } from "lucide-react";
import { Badge, Button, Input, Modal } from "@/components/ui";

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
    <div className="Card-Cupom flex items-center gap-3 p-3 rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface)] hover:border-[var(--color-primary)]/60 transition-colors">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white">
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
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Overlay onClose={onClose} />
      <Modal.Content size="md">
        <Modal.Header icon={<Tag size={20} />} onClose={onClose}>
          Aplicar Cupons de Desconto
        </Modal.Header>

        <div className="p-3 sm:p-5 border-b border-[var(--border)]">
          <div className="flex gap-2">
            <Input
              placeholder="Digite o código do cupom"
              aria-label="Código do cupom"
            />
            <Button variant="primary" size="md">
              Aplicar
            </Button>
          </div>
        </div>

        <Modal.Body className="space-y-3">
          <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider mb-2">
            Cupons disponíveis
          </p>
          {MOCK_COUPONS.map((c) => (
            <CouponCard key={c.code} coupon={c} />
          ))}
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
