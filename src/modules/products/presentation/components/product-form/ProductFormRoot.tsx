"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductFormData } from "./schema";

interface ProductFormRootProps {
    children: React.ReactNode;
    defaultValues?: Partial<ProductFormData>;
    onSubmit: (data: ProductFormData) => void;
}

export function ProductFormRoot({ children, defaultValues, onSubmit }: ProductFormRootProps) {
    const methods = useForm<ProductFormData>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(productSchema) as any,
        defaultValues: {
            name: "",
            description: "",
            price: undefined,
            stock: undefined,
            sku: "",
            images: [],
            status: "active",
            categoryId: "",
            ...defaultValues,
        },
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="Formulário-Produto space-y-8 pb-12">
                {children}
            </form>
        </FormProvider>
    );
}
