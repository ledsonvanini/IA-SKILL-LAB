"use client";

import { Flame, Heart, Clock, ShoppingCart } from "lucide-react";
import { PublicLayout } from "@/components/layout";
import { Badge, Button } from "@/components/ui";
import { useCart } from "@/contexts/CartContext";
import { useEffect, useState } from "react";
import {
  getWeeklyOffers,
  getProductById,
  getCategoryById,
} from "@/mocks/data";
import type { Promotion } from "@/mocks/types";

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
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setIsUrgent(days === 0 && hours < 24);

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
    <div
      className={`flex items-center gap-1.5 text-xs font-bold ${
        isUrgent ? "text-amber-500 animate-pulse" : "text-[var(--muted)]"
      }`}
    >
      <Clock size={12} />
      <span>{timeLeft}</span>
      {isUrgent && <Badge variant="lastChance">Última chance!</Badge>}
    </div>
  );
}

function OfferCard({ promo }: { promo: Promotion }) {
  const product = getProductById(promo.productId);
  const category = product ? getCategoryById(product.categoryId) : null;
  const { addItem } = useCart();

  if (!product) return null;

  const formatBRL = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="Card-Oferta bg-[var(--surface)] rounded-xl border border-[var(--border)] overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <Badge
          variant="offer"
          className="absolute top-3 left-3 z-10 rounded-md text-sm px-3 py-1"
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

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <p className="text-[10px] text-[var(--muted)] uppercase font-bold tracking-wider">
              {category?.name}
            </p>
            <h3 className="text-lg font-bold">{product.name}</h3>
          </div>
          <Countdown endDate={promo.endDate} />
        </div>

        <p className="text-sm text-[var(--muted)] mb-4">{product.description}</p>

        {/* Dates */}
        <div className="flex items-center gap-3 mb-4 text-xs text-[var(--muted)]">
          <span>
            De{" "}
            <strong>
              {new Date(promo.startDate).toLocaleDateString("pt-BR")}
            </strong>
          </span>
          <span>→</span>
          <span>
            Até{" "}
            <strong>
              {new Date(promo.endDate).toLocaleDateString("pt-BR")}
            </strong>
          </span>
        </div>

        {/* Price + Actions */}
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-[var(--muted)] line-through">
              De: {formatBRL(promo.originalPrice)}
            </span>
            <span className="text-3xl font-black text-[var(--color-primary)] leading-none">
              {formatBRL(promo.promoPrice)}
              <span className="text-sm font-normal text-[var(--muted)] ml-1">
                {product.unit}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-[var(--muted)]">
              <Heart size={14} />
              <span>{promo.likes}</span>
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={() =>
                addItem({
                  productId: product.id,
                  promotionId: promo.id,
                  unitPrice: promo.promoPrice,
                })
              }
            >
              <ShoppingCart size={14} />
              Adicionar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OfertasPage() {
  const weeklyOffers = getWeeklyOffers();
  const endDate = weeklyOffers[0]?.endDate;

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="Seção-Hero-Ofertas bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)] py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="offer" className="mb-4 text-sm px-4 py-1.5">
            <Flame size={14} className="mr-1" />
            Ofertas da Semana
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-3">
            Promoções Imperdíveis
          </h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto mb-6">
            Ofertas exclusivas com período limitado. Aproveite antes que acabem!
          </p>
          {endDate && (
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold">
              <Clock size={16} />
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

      {/* Offers Grid */}
      <section className="Seção-Grid-Ofertas max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {weeklyOffers.map((promo) => (
            <OfferCard key={promo.id} promo={promo} />
          ))}
        </div>

        {weeklyOffers.length === 0 && (
          <div className="text-center py-16">
            <p className="text-2xl font-bold text-[var(--muted)]">
              😔 Nenhuma oferta ativa no momento
            </p>
            <p className="text-[var(--muted)] mt-2">
              Volte em breve para conferir nossas promoções!
            </p>
          </div>
        )}
      </section>
    </PublicLayout>
  );
}
