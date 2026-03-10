import { PromotionForm } from "@/modules/promotions/presentation/components/PromotionForm";

export const metadata = {
  title: "Nova Promoção | Meta21 Admin",
  description: "Criação de regras de desconto e campanhas promocionais.",
};

export default function NewPromotionPage() {
  return (
    <div className="Página-Nova-Promoção max-w-5xl mx-auto">
      <PromotionForm />
    </div>
  );
}
