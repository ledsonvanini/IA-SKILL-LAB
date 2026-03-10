"use client";

import { useFormContext } from "react-hook-form";
import type { ProductFormData } from "./schema";
import { CATEGORIES } from "@/mocks/data";

export function ProductFormOrganization() {
    const { register, formState: { errors } } = useFormContext<ProductFormData>();

    return (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4">Organização</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-[var(--foreground)] mb-1.5" htmlFor="status">
                        Status
                    </label>
                    <select
                        id="status"
                        className="w-full px-4 py-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-sm focus:ring-2 focus:ring-[var(--color-primary)]/50 appearance-none font-medium text-[var(--foreground)]"
                        {...register("status")}
                    >
                        <option value="active">Ativo</option>
                        <option value="draft">Rascunho</option>
                        <option value="archived">Arquivado</option>
                    </select>
                    {errors.status && (
                        <p className="text-xs text-[var(--color-danger)] font-medium mt-1">{errors.status.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-[var(--foreground)] mb-1.5" htmlFor="categoryId">
                        Categoria
                    </label>
                    <select
                        id="categoryId"
                        className={`w-full px-4 py-2.5 bg-[var(--surface)] border rounded-lg text-sm focus:ring-2 focus:ring-[var(--color-primary)]/50 appearance-none font-medium text-[var(--foreground)] ${errors.categoryId ? "border-[var(--color-danger)]" : "border-[var(--border)]"}`}
                        {...register("categoryId")}
                    >
                        <option value="">Selecione...</option>
                        {CATEGORIES.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {errors.categoryId && (
                        <p className="text-xs text-[var(--color-danger)] font-medium mt-1">{errors.categoryId.message}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
