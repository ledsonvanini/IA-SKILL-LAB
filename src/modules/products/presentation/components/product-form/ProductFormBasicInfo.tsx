"use client";

import { useFormContext } from "react-hook-form";
import type { ProductFormData } from "./schema";
import { Input } from "@/components/ui";

export function ProductFormBasicInfo() {
    const { register, formState: { errors } } = useFormContext<ProductFormData>();

    return (
        <div className="Seção-Informações-Básicas bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4">Informações Básicas</h2>
            <div className="space-y-4">
                <Input
                    label="Nome do Produto *"
                    placeholder="Ex: Picanha Bovina Resfriada Fatiada"
                    {...register("name")}
                    error={errors.name?.message}
                />

                <div>
                    <label className="block text-sm font-semibold text-[var(--foreground)] mb-1.5" htmlFor="description">
                        Descrição do Produto
                    </label>
                    <textarea
                        id="description"
                        rows={4}
                        placeholder="Descreva detalhes, ingredientes, ou informações legais do produto..."
                        className={`w-full px-4 py-3 bg-[var(--surface)] border rounded-lg text-sm focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] placeholder:text-[var(--muted)] transition-all resize-y ${errors.description ? "border-[var(--color-danger)]" : "border-[var(--border)]"}`}
                        {...register("description")}
                    />
                    {errors.description && (
                        <p className="text-xs text-[var(--color-danger)] font-medium mt-1">{errors.description.message}</p>
                    )}
                    <p className="text-xs text-[var(--muted)] mt-1.5">
                        Uma boa descrição ajuda no SEO e na clareza para o cliente.
                    </p>
                </div>
            </div>
        </div>
    );
}
