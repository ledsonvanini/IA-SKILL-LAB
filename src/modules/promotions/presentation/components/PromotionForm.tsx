"use client";

import { useRouter } from "next/navigation";
import { PromotionForm as Form } from "./promotion-form";
import type { PromotionFormData } from "./promotion-form/schema";

interface PromotionFormProps {
  initialData?: Partial<PromotionFormData>;
}

export function PromotionForm({ initialData }: PromotionFormProps) {
  const router = useRouter();

  const handleSubmit = (data: PromotionFormData) => {
    console.log("Saving promotion...", data);
    setTimeout(() => {
      router.push("/admin/promocoes");
    }, 1000);
  };

  return (
    <Form.Root defaultValues={initialData} onSubmit={handleSubmit}>
      <Form.Actions />

      <div className="Corpo-do-Formulário grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="Coluna-Principal lg:col-span-2 space-y-8">
          <Form.CampaignInfo />
          <Form.Mechanics />
        </div>

        {/* Sidebar Column */}
        <div className="Coluna-Lateral space-y-8">
          <Form.Validity />
          <Form.Status />
        </div>
      </div>
    </Form.Root>
  );
}
