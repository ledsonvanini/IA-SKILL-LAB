import { z } from "zod";

export const productSchema = z.object({
    name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
    description: z.string().optional(),
    price: z.coerce.number().min(0.01, "Preço inválido"),
    comparePrice: z.coerce.number().optional(),
    stock: z.coerce.number().int().min(0, "Estoque inválido"),
    sku: z.string().optional(),
    images: z.array(z.string()).max(4, "Máximo de 4 imagens").default([]),
    status: z.enum(["active", "draft", "archived"]).default("active"),
    categoryId: z.string().nonempty("Categoria é obrigatória"),
});

export type ProductFormData = z.infer<typeof productSchema>;
