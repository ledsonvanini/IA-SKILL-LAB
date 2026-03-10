"use client";

import { useFormContext } from "react-hook-form";
import type { PromotionFormData } from "./schema";
import { Input } from "@/components/ui";

export function PromotionFormValidity() {
    const { register, formState: { errors } } = useFormContext<PromotionFormData>();

    return (
        <div className="Seção-Vigência bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4">Vigência</h2>
            <div className="space-y-4">
                <Input
                    label="Início"
                    type="datetime-local"
                    {...register("startDate")}
                    error={errors.startDate?.message}
                />
                <Input
                    label="Fim"
                    type="datetime-local"
                    {...register("endDate")}
                    error={errors.endDate?.message}
                />
            </div>
        </div>
    );
}
