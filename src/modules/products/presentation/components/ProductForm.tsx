"use client";

import { useRouter } from "next/navigation";
import { ProductForm as Form } from "./product-form";
import type { ProductFormData } from "./product-form/schema";

interface ProductFormProps {
  initialData?: Partial<ProductFormData>;
}

export function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();

  const handleSubmit = (data: ProductFormData) => {
    console.log("Saving product...", data);
    // Mock save delay
    setTimeout(() => {
      router.push("/admin/produtos");
    }, 1000);
  };

  return (
    <Form.Root defaultValues={initialData} onSubmit={handleSubmit}>
      <Form.Actions />

      <div className="Corpo-do-Formulário grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="Coluna-Principal lg:col-span-2 space-y-8">
          <Form.BasicInfo />
          <Form.Pricing />
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          <Form.Media />
          <Form.Organization />
        </div>
      </div>
    </Form.Root>
  );
}
