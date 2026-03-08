"use client";

import { useState } from "react";
import { ShoppingCart, Share2, Check, Award } from "lucide-react";
import { Badge, Button, Card } from "@/components/ui";
import { useCart } from "@/contexts/CartContext";
import { formatBRL } from "@/lib/format";
import { getProductById, getCategoryById } from "@/mocks/data";
import { shareOffer } from "@/lib/share";
import type { Promotion } from "@/mocks/types";

interface FeaturedOfferCardProps {
  promo: Promotion;
}

export function FeaturedOfferCard({ promo }: FeaturedOfferCardProps) {
  const product = getProductById(promo.productId);
  const category = product ? getCategoryById(product.categoryId) : null;
  const { addItem } = useCart();
  const [shared, setShared] = useState(false);

  if (!product) return null;

  const handleShare = async () => {
    const ok = await shareOffer(promo);
    if (ok) {
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  const handleAdd = () =>
    addItem({
      productId: product.id,
      promotionId: promo.id,
      unitPrice: promo.promoPrice,
    });

  return (
    <Card
      hover
      className="Card-Oferta-Destaque flex-shrink-0 w-[180px] sm:w-[200px] snap-start"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[var(--background)] aspect-square">
        {/* Badge TOP */}
        {promo.isTopOffer && (
          <span className="absolute top-2 right-2 z-10 flex items-center gap-1 px-2 py-0.5 rounded-md bg-[var(--color-primary)] text-white text-[9px] font-bold shadow-sm">
            <Award size={10} />
            Destaque
          </span>
        )}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={promo.imageUrl}
          alt={product.name}
          className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Info — dentro do card */}
      <Card.Body className="p-3">
        <div className="flex items-center justify-between mb-0.5 gap-2">
          <p className="text-[9px] text-[var(--color-primary)] uppercase font-bold tracking-wider truncate">
            {category?.name}
          </p>
          <Badge
            variant="offer"
            className="rounded-md text-[9px] px-1.5 py-0 leading-tight flex-shrink-0"
          >
            -{promo.discountPercent}%
          </Badge>
        </div>
        <h3 className="font-bold text-xs text-[var(--foreground)] line-clamp-1 leading-tight mb-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-sm sm:text-base font-black text-[var(--color-primary)]">
            {formatBRL(promo.promoPrice)}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={handleShare}
              className="p-1 text-[var(--muted)] hover:text-[var(--color-primary)] transition-colors"
              title="Compartilhar"
              aria-label={`Compartilhar ${product.name}`}
            >
              {shared ? <Check size={12} className="text-green-500" /> : <Share2 size={12} />}
            </button>
            <button
              onClick={handleAdd}
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition-colors shadow-sm"
              aria-label={`Adicionar ${product.name} ao carrinho`}
            >
              <ShoppingCart size={12} />
            </button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
