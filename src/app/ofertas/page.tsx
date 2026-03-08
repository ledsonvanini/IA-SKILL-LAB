"use client";

import {
  Flame,
  Heart,
  Clock,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";
import { PublicLayout } from "@/components/layout";
import { Badge, Button } from "@/components/ui";
import { useCart } from "@/contexts/CartContext";
import { useEffect, useState } from "react";
import {
  getWeeklyOffers,
  getActivePromotions,
  getProductById,
  getCategoryById,
} from "@/mocks/data";
import type { Promotion } from "@/mocks/types";

/* ── Countdown ── */
function Countdown({ endDate }: { endDate: string }) {
  const [timeLeft, setTimeLeft] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const calculate = () => {
      const end = new Date(endDate).getTime();
      const now = Date.now();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft("Encerrada");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setIsUrgent(days === 0);

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else {
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold ${
        isUrgent ? "text-amber-500" : "text-[var(--muted)]"
      }`}
    >
      <Clock size={11} />
      {timeLeft}
      {isUrgent && (
        <Badge variant="lastChance" className="text-[8px] px-1.5 py-0">
          Última chance!
        </Badge>
      )}
    </span>
  );
}

/* ── Featured Card (horizontal scroll item, mais visual) ── */
function FeaturedOfferCard({ promo }: { promo: Promotion }) {
  const product = getProductById(promo.productId);
  const { addItem } = useCart();

  if (!product) return null;

  const formatBRL = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="Card-Oferta-Destaque flex-shrink-0 w-[280px] sm:w-[320px] bg-[var(--surface)] rounded-xl border border-[var(--border)] overflow-hidden group hover:shadow-lg transition-all snap-start">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Badge
          variant="offer"
          className="absolute top-2.5 left-2.5 z-10 rounded-md text-xs px-2.5 py-1"
        >
          -{promo.discountPercent}% OFF
        </Badge>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={promo.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-4">
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
      </div>
    </div>
  );
}

/* ── Compact Offer Card (grid) ── */
function CompactOfferCard({ promo }: { promo: Promotion }) {
  const product = getProductById(promo.productId);
  const category = product ? getCategoryById(product.categoryId) : null;
  const { addItem } = useCart();

  if (!product) return null;

  const formatBRL = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="Card-Oferta bg-[var(--surface)] rounded-xl border border-[var(--border)] overflow-hidden group hover:shadow-lg hover:border-[var(--color-primary)]/30 transition-all flex flex-col">
      <div className="relative aspect-square overflow-hidden">
        <Badge
          variant="offer"
          className="absolute top-2 left-2 z-10 rounded-md text-[10px] px-2 py-0.5"
        >
          -{promo.discountPercent}%
        </Badge>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={promo.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      <div className="p-3 flex flex-col flex-1">
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
        <div className="flex flex-col mb-3">
          <span className="text-[10px] text-[var(--muted)] line-through">
            De: {formatBRL(promo.originalPrice)}
          </span>
          <span className="text-lg font-black text-[var(--color-primary)] leading-none">
            {formatBRL(promo.promoPrice)}
            <span className="text-[10px] font-normal text-[var(--muted)] ml-1">
              /{product.unit}
            </span>
          </span>
        </div>

        {/* Likes + CTA */}
        <div className="flex items-center justify-between mt-auto">
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
      </div>
    </div>
  );
}

/* ── Page ── */
export default function OfertasPage() {
  const weeklyOffers = getWeeklyOffers();
  const allOffers = getActivePromotions();
  const endDate = weeklyOffers[0]?.endDate;

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="Seção-Hero-Ofertas bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="offer" className="mb-3 text-xs px-3 py-1">
            <Flame size={12} className="mr-1" />
            Ofertas da Semana
          </Badge>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-2">
            Promoções Imperdíveis
          </h1>
          <p className="text-white/80 text-sm sm:text-base max-w-lg mx-auto mb-4">
            Ofertas exclusivas com período limitado. Aproveite antes que acabem!
          </p>
          {endDate && (
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold">
              <Clock size={14} />
              Válidas até{" "}
              {new Date(endDate).toLocaleDateString("pt-BR", {
                weekday: "long",
                day: "2-digit",
                month: "long",
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Featured offers: horizontal scroll ── */}
      {weeklyOffers.length > 0 && (
        <section className="Seção-Destaque-Scroll max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
              <Flame size={18} className="text-[var(--color-primary)]" />
              Destaques da Semana
            </h2>
            <span className="text-[var(--muted)] text-xs flex items-center gap-1">
              Arraste para ver mais
              <ArrowRight size={12} />
            </span>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide snap-x snap-mandatory">
            {weeklyOffers.map((promo) => (
              <FeaturedOfferCard key={promo.id} promo={promo} />
            ))}
          </div>
        </section>
      )}

      {/* ── All offers: compact grid ── */}
      <section className="Seção-Grid-Ofertas max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <h2 className="text-lg sm:text-xl font-bold mb-5">
          Todas as Ofertas Ativas
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {allOffers.map((promo) => (
            <CompactOfferCard key={promo.id} promo={promo} />
          ))}
        </div>

        {allOffers.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl font-bold text-[var(--muted)]">
              Nenhuma oferta ativa no momento
            </p>
            <p className="text-[var(--muted)] mt-2 text-sm">
              Volte em breve para conferir nossas promoções!
            </p>
          </div>
        )}
      </section>
    </PublicLayout>
  );
}
