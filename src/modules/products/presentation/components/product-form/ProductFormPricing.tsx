"use client";

import { useFormContext } from "react-hook-form";
import type { ProductFormData } from "./schema";
import { Input } from "@/components/ui";

export function ProductFormPricing() {
    const { register, formState: { errors } } = useFormContext<ProductFormData>();

    return (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4">Preço e Estoque</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                    <Input
                        label="Preço de Venda (R$) *"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0,00"
                        className="pl-10" // Space for R$
                        {...register("price")}
                        error={errors.price?.message}
                    />
                    <span className="absolute left-3 top-[34px] text-[var(--muted)] font-bold pointer-events-none">R$</span>
                </div>

                <div className="relative">
                    <Input
                        label="Preço de Comparação (R$)"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0,00"
                        className="pl-10"
                        {...register("comparePrice")}
                        error={errors.comparePrice?.message}
                    />
                    <span className="absolute left-3 top-[34px] text-[var(--muted)] font-bold pointer-events-none">R$</span>
                    {!errors.comparePrice && (
                        <p className="text-xs text-[var(--muted)] mt-1.5 line-clamp-1">
                            Exibe o preço cortado (ex: <span className="line-through">R$ 100</span>).
                        </p>
                    )}
                </div>

                <Input
                    label="Quantidade em Estoque *"
                    type="number"
                    min="0"
                    placeholder="Ex: 50"
                    {...register("stock")}
                    error={errors.stock?.message}
                />

                <Input
                    label="SKU (Código Interno)"
                    placeholder="Ex: MT-001"
                    className="uppercase"
                    {...register("sku")}
                    error={errors.sku?.message}
                />
            </div>
        </div>
    );
}
