import { ProductForm } from "@/modules/products/presentation/components/ProductForm";

export const metadata = {
  title: "Editar Produto | Meta21 Admin",
  description: "Edição de um produto no painel administrativo.",
};

export default function EditProductPage({ params }: { params: { id: string } }) {
  // Em um cenário real, buscaríamos os dados do produto pelo ID e passaríamos pro form.
  return (
    <div className="max-w-5xl mx-auto">
      <ProductForm />
    </div>
  );
}
