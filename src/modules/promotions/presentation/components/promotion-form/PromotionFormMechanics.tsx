"use client";

import { useFormContext, useWatch } from "react-hook-form";
import type { PromotionFormData } from "./schema";
import { Input } from "@/components/ui";
import { Percent, Gift, Tag } from "lucide-react";

export function PromotionFormMechanics() {
    const { register, setValue, control, formState: { errors } } = useFormContext<PromotionFormData>();
    const promoTypes = useWatch({ control, name: "promoTypes" }) || [];

    const togglePromoType = (type: string) => {
        const next = new Set(promoTypes);
        if (next.has(type)) {
            if (next.size > 1) next.delete(type); // Impede que fique vazio
        } else {
            next.add(type);
        }
        setValue("promoTypes", Array.from(next), { shouldValidate: true, shouldDirty: true });
    };

    const hasPercentage = promoTypes.includes("percentage");
    const hasFixed = promoTypes.includes("fixed");
    const hasBxly = promoTypes.includes("bxly");

    return (
        <div className="Seção-Regras bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4">Mecânica da Promoção</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <button
                    type="button"
                    onClick={() => togglePromoType("percentage")}
                    className={`border rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all ${hasPercentage ? "border-[var(--color-primary)] bg-[var(--color-primary-light)] text-[var(--color-primary)] shadow-sm shadow-[var(--color-primary)]/20" : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--color-primary)]/50"}`}
                >
                    <Percent size={24} />
                    <span className="font-bold text-sm">Porcentagem</span>
                </button>
                <button
                    type="button"
                    onClick={() => togglePromoType("fixed")}
                    className={`border rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all ${hasFixed ? "border-[var(--color-primary)] bg-[var(--color-primary-light)] text-[var(--color-primary)] shadow-sm shadow-[var(--color-primary)]/20" : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--color-primary)]/50"}`}
                >
                    <Tag size={24} />
                    <span className="font-bold text-sm">Valor Fixo (R$)</span>
                </button>
                <button
                    type="button"
                    onClick={() => togglePromoType("bxly")}
                    className={`border rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all ${hasBxly ? "border-[var(--color-primary)] bg-[var(--color-primary-light)] text-[var(--color-primary)] shadow-sm shadow-[var(--color-primary)]/20" : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--color-primary)]/50"}`}
                >
                    <Gift size={24} />
                    <span className="font-bold text-sm text-center line-clamp-1">Leve X, Pague Y</span>
                </button>
            </div>

            <p className="text-xs text-[var(--muted)] mb-4 pb-4 border-b border-[var(--border)]">
                Você pode selecionar mais de uma mecânica para combiná-las (Ex: &quot;Leve 3 Pague 2&quot; + &quot;5% Off&quot;).
            </p>

            <div className="space-y-6">
                {hasPercentage && (
                    <Input
                        label="Valor do Desconto (%) *"
                        type="number"
                        min="1"
                        max="100"
                        placeholder="Ex: 15"
                        {...register("percentageValue")}
                        error={errors.percentageValue?.message}
                    />
                )}

                {hasFixed && (
                    <div className="relative">
                        <Input
                            label="Valor do Desconto (R$) *"
                            type="number"
                            step="0.01"
                            min="0.01"
                            placeholder="Ex: 20,00"
                            className="pl-10"
                            {...register("fixedValue")}
                            error={errors.fixedValue?.message}
                        />
                        <span className="absolute left-3 top-[34px] text-[var(--muted)] font-bold pointer-events-none">R$</span>
                    </div>
                )}

                {hasBxly && (
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Qtd. a Levar"
                            type="number"
                            min="2"
                            placeholder="Ex: 3"
                            {...register("buyQty")}
                            error={errors.buyQty?.message}
                        />
                        <Input
                            label="Qtd. Paga"
                            type="number"
                            min="1"
                            placeholder="Ex: 2"
                            {...register("payQty")}
                            error={errors.payQty?.message}
                        />
                    </div>
                )}

                <div className="pt-4 mt-4 border-t border-[var(--border)] relative">
                    <Input
                        label="Regra: Compras acima de (Opcional)"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0,00"
                        className="pl-10"
                        {...register("minPurchase")}
                        error={errors.minPurchase?.message}
                    />
                    <span className="absolute left-3 top-[51px] text-[var(--muted)] font-bold pointer-events-none">R$</span>
                </div>
            </div>
        </div>
    );
}
