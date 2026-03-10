"use client";

import { useState } from "react";
import { Plus, Trash, Ticket, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui";

interface CouponMock {
  id: string;
  code: string;
  discount: string;
  validUntil: string;
  isActive: boolean;
  type: "global" | "private";
}

const INITIAL_COUPONS: CouponMock[] = [
  { id: "1", code: "META10", discount: "10%", validUntil: "31/12/2026", isActive: true, type: "global" },
  { id: "2", code: "FRETEGRATIS", discount: "Frete Grátis", validUntil: "30/06/2026", isActive: true, type: "global" },
  { id: "3", code: "BEMVINDO", discount: "R$ 20", validUntil: "Sem validade", isActive: true, type: "global" },
];

export default function CouponsConfigPage() {
  const [coupons, setCoupons] = useState(INITIAL_COUPONS);
  const [newCode, setNewCode] = useState("");
  const [newDiscount, setNewDiscount] = useState("");

  const handleAdd = () => {
    if (!newCode || !newDiscount) return;
    const isEditing = false; // logic placeholder
    setCoupons([{
      id: Math.random().toString(),
      code: newCode.toUpperCase(),
      discount: newDiscount,
      validUntil: "Personalizado",
      isActive: true,
      type: "global",
    }, ...coupons]);
    setNewCode("");
    setNewDiscount("");
  };

  const handleRemove = (id: string) => {
    setCoupons((prev) => prev.filter(c => c.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-[var(--foreground)] tracking-tight flex items-center gap-3">
          <Ticket className="text-purple-500" />
          Gestão de Cupons
        </h1>
        <p className="text-[var(--muted)] mt-1">
          Crie e gerencie os cupons que ficarão visíveis para todos os clientes no cabeçalho do site.
        </p>
      </div>

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-4">Criar Novo Cupom Global</h2>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-[var(--muted)] mb-1 block">Código (Ex: VERAO20)</label>
            <input
              type="text"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg px-4 py-2.5 outline-none focus:border-purple-500 transition-colors uppercase"
              placeholder="CÓDIGO"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-[var(--muted)] mb-1 block">Desconto (Ex: 15% ou R$ 50)</label>
            <input
              type="text"
              value={newDiscount}
              onChange={(e) => setNewDiscount(e.target.value)}
              className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg px-4 py-2.5 outline-none focus:border-purple-500 transition-colors"
              placeholder="Valor do desconto"
            />
          </div>
          <div className="sm:col-span-1 flex items-end">
            <Button onClick={handleAdd} className="w-full bg-purple-600 hover:bg-purple-700 shadow-purple-500/20 shadow-lg text-white font-bold h-[46px]">
              <Plus size={18} className="mr-2" /> Criar
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-[var(--border)] bg-[var(--background)] flex justify-between items-center">
          <h3 className="font-bold text-[var(--muted)]">Cupons Ativos ({coupons.length})</h3>
        </div>
        <div className="divide-y divide-[var(--border)]">
          {coupons.map((coupon) => (
            <div key={coupon.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:bg-[var(--background)] transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex flex-col items-center justify-center text-[var(--muted)] group-hover:bg-[var(--background)] transition-colors">
                  <span className="text-[10px] font-bold uppercase tracking-wider"><Ticket size={20} className="text-purple-500" /></span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-lg tracking-tight">{coupon.code}</h4>
                    {coupon.isActive && <CheckCircle2 size={16} className="text-emerald-500" />}
                  </div>
                  <p className="text-[var(--muted)] text-sm">Oferece: <span className="font-bold text-[var(--foreground)]">{coupon.discount}</span> &bull; Validade: {coupon.validUntil}</p>
                </div>
              </div>

              <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30" onClick={() => handleRemove(coupon.id)}>
                <Trash size={18} />
                <span className="sm:hidden ml-2">Remover</span>
              </Button>
            </div>
          ))}

          {coupons.length === 0 && (
            <div className="p-12 text-center text-[var(--muted)]">
              <Ticket size={48} className="mx-auto mb-4 opacity-50" />
              <p>Nenhum cupom ativo no momento.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
