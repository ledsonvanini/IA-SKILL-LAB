"use client";

import { Heart, ShoppingCart } from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";
import { useCart } from "@/contexts/CartContext";
import { formatBRL } from "@/lib/format";
import { getProductById, getCategoryById } from "@/mocks/data";
import { Countdown } from "./Countdown";
import type { Promotion } from "@/mocks/types";

interface CompactOfferCardProps {
  promo: Promotion;
}

export function CompactOfferCard({ promo }: CompactOfferCardProps) {
  const product = getProductById(promo.productId);
  const category = product ? getCategoryById(product.categoryId) : null;
  const { addItem } = useCart();

  if (!product) return null;

  return (
    <Card
      hover
      className="Card-Oferta flex flex-col hover:border-[var(--color-primary)]/30"
    >
      <Card.Image
        src={promo.imageUrl}
        alt={product.name}
        aspectRatio="square"
        badge={
          <Badge variant="offer" className="rounded-md text-[10px] px-2 py-0.5">
            -{promo.discountPercent}%
          </Badge>
        }
      />

      <Card.Body className="flex flex-col flex-1">
        <p className="text-[9px] text-[var(--muted)] uppercase font-bold tracking-wider">
          {category?.name}
        </p>
        <h3 className="font-bold text-sm text-[var(--foreground)] mb-1 line-clamp-2 leading-tight flex-1">
          {product.name}
        </h3>

        {/* Dates */}
        <div className="flex items-center justify-between mb-2 text-[9px] text-[var(--muted)]">
          <span>
            Até{" "}
            <strong>
              {new Date(promo.endDate).toLocaleDateString("pt-BR")}
            </strong>
          </span>
          <Countdown endDate={promo.endDate} />
        </div>

        {/* Price */}
        <Card.Price from={promo.originalPrice} to={promo.promoPrice} unit={product.unit} />

        {/* Likes + CTA */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1 text-[10px] text-[var(--muted)]">
            <Heart size={10} />
            <span>{promo.likes}</span>
          </div>
          <Button
            variant="primary"
            size="sm"
            className="text-[10px] px-3"
            onClick={() =>
              addItem({
                productId: product.id,
                promotionId: promo.id,
                unitPrice: promo.promoPrice,
              })
            }
          >
            <ShoppingCart size={12} />
            Adicionar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
