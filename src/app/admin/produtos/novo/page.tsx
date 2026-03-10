import { ProductForm } from "@/modules/products/presentation/components/ProductForm";

export const metadata = {
  title: "Novo Produto | Meta21 Admin",
  description: "Cadastro de um novo produto no painel administrativo.",
};

export default function NewProductPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <ProductForm />
    </div>
  );
}
