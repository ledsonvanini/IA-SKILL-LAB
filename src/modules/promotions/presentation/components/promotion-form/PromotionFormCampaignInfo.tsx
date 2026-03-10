"use client";

import { useFormContext } from "react-hook-form";
import type { PromotionFormData } from "./schema";
import { Input } from "@/components/ui";

export function PromotionFormCampaignInfo() {
    const { register, formState: { errors } } = useFormContext<PromotionFormData>();

    return (
        <div className="Seção-Informações bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4">Informações da Campanha</h2>
            <div className="space-y-4">
                <Input
                    label="Nome da Promoção *"
                    placeholder="Ex: Semana do Consumidor"
                    {...register("name")}
                    error={errors.name?.message}
                />

                <div>
                    <label className="block text-sm font-semibold text-[var(--foreground)] mb-1.5" htmlFor="description">
                        Descrição Interna
                    </label>
                    <textarea
                        id="description"
                        rows={2}
                        placeholder="Detalhes visíveis apenas no painel administrativo..."
                        className={`w-full px-4 py-3 bg-[var(--surface)] border rounded-lg text-sm focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] placeholder:text-[var(--muted)] transition-all resize-y ${errors.description ? "border-[var(--color-danger)]" : "border-[var(--border)]"}`}
                        {...register("description")}
                    />
                </div>
            </div>
        </div>
    );
}
