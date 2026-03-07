"use client";

import Link from "next/link";
import { ShoppingCart, Heart, Flame } from "lucide-react";
import { PublicLayout } from "@/components/layout";
import { Badge, Button } from "@/components/ui";
import { useCart } from "@/contexts/CartContext";
import {
  PROMOTIONS,
  PRODUCTS,
  CATEGORIES,
  STORE_UNITS,
  getCategoryById,
  getProductById,
  getWeeklyOffers,
} from "@/mocks/data";

function HeroBanner() {
  return (
    <section className="Seção-Hero max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="relative overflow-hidden rounded-2xl bg-zinc-900 h-[280px] sm:h-[350px] lg:h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-hover)] to-zinc-900 opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-8 sm:px-12">
          <span className="text-[var(--color-primary)] font-bold tracking-widest uppercase mb-2 text-xs sm:text-sm">
            Exclusivo Meta21
          </span>
          <h1 className="text-white text-3xl sm:text-5xl lg:text-6xl font-black leading-tight mb-3 sm:mb-4">
            Ofertas da
            <br />
            <span className="text-amber-400">Semana</span>
          </h1>
          <p className="text-zinc-200 text-sm sm:text-lg max-w-md mb-6 sm:mb-8">
            Economize até 50% em toda a loja. Qualidade garantida na sua mesa
            todos os dias.
          </p>
          <Link href="/ofertas">
            <Button variant="primary" size="lg" className="w-fit">
              <Flame size={18} />
              Ver Ofertas Agora
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

interface ProductCardProps {
  promotionId: string;
}

function ProductCard({ promotionId }: ProductCardProps) {
  const promo = PROMOTIONS.find((p) => p.id === promotionId);
  const { addItem } = useCart();

  if (!promo) return null;

  const product = getProductById(promo.productId);
  const category = product ? getCategoryById(product.categoryId) : null;

  if (!product) return null;

  const formatBRL = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      promotionId: promo.id,
      unitPrice: promo.promoPrice,
    });
  };

  return (
    <div className="Card-Produto bg-[var(--surface)] rounded-xl border border-[var(--border)] overflow-hidden group transition-shadow duration-300 hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <Badge
          variant="offer"
          className="absolute top-3 left-3 z-10 rounded-md"
        >
          -{promo.discountPercent}% OFF
        </Badge>
        {promo.isWeeklyOffer && (
          <Link
            href="/ofertas"
            className="absolute top-3 right-3 z-10"
            title="Ver na página de Ofertas da Semana"
          >
            <Badge variant="lastChance" className="rounded-md cursor-pointer">
              <Flame size={10} className="mr-1" />
              Ver Oferta
            </Badge>
          </Link>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={promo.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-[10px] text-[var(--muted)] uppercase font-bold tracking-wider">
          {category?.name}
        </p>
        <h3 className="font-bold text-[var(--foreground)] mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-[10px] text-[var(--muted)] mb-3 uppercase italic">
          Válido até{" "}
          {new Date(promo.endDate).toLocaleDateString("pt-BR")}
        </p>

        {/* Price */}
        <div className="flex flex-col mb-4">
          <span className="text-xs text-[var(--muted)] line-through">
            De: {formatBRL(promo.originalPrice)}
          </span>
          <span className="text-2xl font-black text-[var(--color-primary)] leading-none">
            {formatBRL(promo.promoPrice)}{" "}
            <span className="text-sm font-normal text-[var(--muted)]">
              {product.unit}
            </span>
          </span>
        </div>

        {/* Likes */}
        <div className="flex items-center gap-1 mb-3 text-xs text-[var(--muted)]">
          <Heart size={12} />
          <span>{promo.likes} curtidas</span>
        </div>

        {/* Add to cart */}
        <Button
          variant="secondary"
          size="md"
          className="Botão-Adicionar w-full hover:!bg-[var(--color-primary)] hover:!text-white"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={14} />
          Adicionar
        </Button>
      </div>
    </div>
  );
}

function StoreSection() {
  const unit = STORE_UNITS[0];
  return (
    <section className="Seção-Unidade bg-zinc-100 dark:bg-zinc-800/50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-black mb-8 sm:mb-12 flex items-center gap-3">
          🏪 Nossa Unidade
        </h2>
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div>
                <h4 className="font-bold text-lg mb-1">📍 Endereço</h4>
                <p className="text-[var(--muted)]">{unit.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div>
                <h4 className="font-bold text-lg mb-1">🕐 Horário</h4>
                <p className="text-[var(--muted)]">
                  Segunda a Sábado: {unit.hours.weekdays}
                  <br />
                  Domingos e Feriados: {unit.hours.weekends}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div>
                <h4 className="font-bold text-lg mb-1">💬 Fale Conosco</h4>
                <p className="text-[var(--muted)] flex items-center gap-2">
                  <span className="font-semibold">{unit.whatsapp}</span>
                  <Badge variant="success">WhatsApp</Badge>
                </p>
              </div>
            </div>
          </div>
          <div className="h-[250px] sm:h-[350px] rounded-2xl overflow-hidden shadow-xl border-4 border-[var(--surface)] bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
            <span className="text-[var(--muted)] text-sm">
              📍 Mapa — Google Maps (futuro)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const weeklyCount = getWeeklyOffers().length;

  return (
    <PublicLayout>
      <HeroBanner />

      {/* Categories */}
      <section className="Seção-Categorias max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/categorias/${cat.slug}`}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)] text-sm font-semibold hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Products Grid - Ofertas em Destaque */}
      <section className="Seção-Ofertas-Destaque max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Ofertas em Destaque
          </h2>
          <Link
            href="/ofertas"
            className="text-[var(--color-primary)] font-semibold text-sm hover:underline flex items-center gap-1"
          >
            <Flame size={14} />
            {weeklyCount} ofertas da semana
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {PROMOTIONS.slice(0, 4).map((promo) => (
            <ProductCard key={promo.id} promotionId={promo.id} />
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-3 sm:mt-6">
          {PROMOTIONS.slice(4).map((promo) => (
            <ProductCard key={promo.id} promotionId={promo.id} />
          ))}
        </div>
      </section>

      <StoreSection />
    </PublicLayout>
  );
}
