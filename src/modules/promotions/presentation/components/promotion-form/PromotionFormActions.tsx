"use client";

import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { useFormContext } from "react-hook-form";

export function PromotionFormActions() {
    const { formState: { isSubmitting } } = useFormContext();

    return (
        <div className="Barra-de-Ações flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <Link href="/admin/promocoes">
                    <Button type="button" variant="ghost" className="px-2">
                        <ArrowLeft size={20} />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-xl md:text-2xl font-black text-[var(--foreground)] tracking-tight">
                        Nova Promoção
                    </h1>
                    <p className="text-sm text-[var(--muted)] mt-0.5">
                        Configure regras e mecânicas de desconto.
                    </p>
                </div>
            </div>
            <div className="flex gap-2">
                <Link href="/admin/promocoes" passHref>
                    <Button type="button" variant="secondary" className="px-6">Cancelar</Button>
                </Link>
                <Button type="submit" className="gap-2 px-6 shadow-sm shadow-[var(--color-primary)]/20" disabled={isSubmitting}>
                    {isSubmitting ? "Salvando..." : <><Save size={18} /> Criar Promoção</>}
                </Button>
            </div>
        </div>
    );
}
