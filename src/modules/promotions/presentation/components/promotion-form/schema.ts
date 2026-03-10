import { z } from "zod";

export const promotionSchema = z.object({
    name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
    description: z.string().optional(),
    promoTypes: z.array(z.string()).min(1, "Selecione ao menos um tipo de promoção"),

    // Condicional / Optional values depending on promoTypes
    percentageValue: z.coerce.number().min(1).max(100).optional().or(z.literal("")),
    fixedValue: z.coerce.number().min(0.01).optional().or(z.literal("")),
    buyQty: z.coerce.number().min(2).optional().or(z.literal("")),
    payQty: z.coerce.number().min(1).optional().or(z.literal("")),

    minPurchase: z.coerce.number().min(0).optional().or(z.literal("")),

    startDate: z.string().nonempty("Data de início obrigatória"),
    endDate: z.string().nonempty("Data de fim obrigatória"),
    status: z.enum(["active", "draft"]).default("draft"),
});

export type PromotionFormData = z.infer<typeof promotionSchema>;
