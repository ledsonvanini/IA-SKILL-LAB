"use client";

import { useState } from "react";
import { Heart, ShoppingCart, Share2, Check } from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";
import { useCart } from "@/contexts/CartContext";
import { getProductById, getCategoryById } from "@/mocks/data";
import { shareOffer } from "@/lib/share";
import type { Promotion } from "@/mocks/types";

interface CompactOfferCardProps {
  promo: Promotion;
}

export function CompactOfferCard({ promo }: CompactOfferCardProps) {
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

  return (
    <Card
      hover
      className="Card-Oferta flex flex-col hover:border-[var(--color-primary)]/30 flex-shrink-0 w-[240px] sm:w-auto sm:flex-shrink snap-start"
    >
      <Card.Image
        src={promo.imageUrl}
        alt={product.name}
        aspectRatio="video"
      />

      <Card.Body className="flex flex-col flex-1">
        <div className="flex items-center justify-between mb-1 gap-2">
          <p className="text-[9px] text-[var(--muted)] uppercase font-bold tracking-wider m-0 truncate">
            {category?.name}
          </p>
          <Badge
            variant="offer"
            className="rounded-md text-[9px] px-1.5 py-0 leading-tight flex-shrink-0"
          >
            -{promo.discountPercent}%
          </Badge>
        </div>
        <h3 className="font-bold text-sm text-[var(--foreground)] mb-1 line-clamp-2 leading-tight flex-1">
          {product.name}
        </h3>

        {/* Dates */}
        <div className="mb-2 text-[9px] text-[var(--muted)]">
          Até{" "}
          <strong>
            {new Date(promo.endDate).toLocaleDateString("pt-BR")}
          </strong>
        </div>

        {/* Price */}
        <Card.Price from={promo.originalPrice} to={promo.promoPrice} unit={product.unit} />

        {/* Actions */}
        <div className="flex items-center justify-between mt-3 gap-1">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-[10px] text-[var(--muted)]">
              <Heart size={10} />
              <span>{promo.likes}</span>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-[10px] text-[var(--muted)] hover:text-[var(--color-primary)] transition-colors"
              title="Compartilhar oferta"
              aria-label={`Compartilhar oferta de ${product.name}`}
            >
              {shared ? <Check size={10} className="text-green-500" /> : <Share2 size={10} />}
              <span className="hidden sm:inline">{shared ? "Copiado!" : "Enviar"}</span>
            </button>
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
