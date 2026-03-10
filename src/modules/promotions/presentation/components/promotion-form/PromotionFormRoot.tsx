"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { promotionSchema, type PromotionFormData } from "./schema";

interface PromotionFormRootProps {
    children: React.ReactNode;
    defaultValues?: Partial<PromotionFormData>;
    onSubmit: (data: PromotionFormData) => void;
}

export function PromotionFormRoot({ children, defaultValues, onSubmit }: PromotionFormRootProps) {
    const methods = useForm<PromotionFormData>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(promotionSchema) as any,
        defaultValues: {
            name: "",
            description: "",
            promoTypes: ["percentage"],
            percentageValue: undefined,
            fixedValue: undefined,
            buyQty: undefined,
            payQty: undefined,
            minPurchase: undefined,
            startDate: "",
            endDate: "",
            status: "draft",
            ...defaultValues,
        },
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="Formulário-Promoção space-y-8 pb-12">
                {children}
            </form>
        </FormProvider>
    );
}
