"use client";

import { useFormContext } from "react-hook-form";
import type { PromotionFormData } from "./schema";

export function PromotionFormStatus() {
    const { register, formState: { errors } } = useFormContext<PromotionFormData>();

    return (
        <div className="Seção-Status bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4">Status</h2>
            <div>
                <select
                    className={`w-full px-4 py-2.5 bg-[var(--surface)] border rounded-lg text-sm focus:ring-2 focus:ring-[var(--color-primary)]/50 appearance-none font-medium text-[var(--foreground)] ${errors.status ? "border-[var(--color-danger)]" : "border-[var(--border)]"}`}
                    {...register("status")}
                >
                    <option value="draft">Rascunho</option>
                    <option value="active">Ativo (Agendado se futuro)</option>
                </select>
                {errors.status && (
                    <p className="text-xs text-[var(--color-danger)] font-medium mt-1">{errors.status.message}</p>
                )}
                <p className="text-xs text-[var(--muted)] mt-2">
                    Promoções rascunho não entram em vigor, mesmo dentro da data.
                </p>
            </div>
        </div>
    );
}
