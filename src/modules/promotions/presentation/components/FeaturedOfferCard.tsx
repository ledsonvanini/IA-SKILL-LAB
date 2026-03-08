"use client";

import { ShoppingCart } from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";
import { useCart } from "@/contexts/CartContext";
import { formatBRL } from "@/lib/format";
import { getProductById } from "@/mocks/data";
import { Countdown } from "./Countdown";
import type { Promotion } from "@/mocks/types";

interface FeaturedOfferCardProps {
  promo: Promotion;
}

export function FeaturedOfferCard({ promo }: FeaturedOfferCardProps) {
  const product = getProductById(promo.productId);
  const { addItem } = useCart();

  if (!product) return null;

  return (
    <Card
      hover
      className="Card-Oferta-Destaque flex-shrink-0 w-[280px] sm:w-[320px] snap-start"
    >
      <Card.Image
        src={promo.imageUrl}
        alt={product.name}
        aspectRatio="auto"
        className="aspect-[4/3]"
        badge={
          <Badge variant="offer" className="rounded-md text-xs px-2.5 py-1">
            -{promo.discountPercent}% OFF
          </Badge>
        }
      />
      <Card.Body>
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold text-sm line-clamp-1">{product.name}</h3>
          <Countdown endDate={promo.endDate} />
        </div>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-[10px] text-[var(--muted)] line-through">
            {formatBRL(promo.originalPrice)}
          </span>
          <span className="text-xl font-black text-[var(--color-primary)]">
            {formatBRL(promo.promoPrice)}
          </span>
        </div>
        <Button
          variant="primary"
          size="sm"
          className="w-full text-xs"
          onClick={() =>
            addItem({
              productId: product.id,
              promotionId: promo.id,
              unitPrice: promo.promoPrice,
            })
          }
        >
          <ShoppingCart size={13} />
          Adicionar ao Carrinho
        </Button>
      </Card.Body>
    </Card>
  );
}
