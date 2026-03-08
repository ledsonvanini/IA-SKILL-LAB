"use client";

import { Flame, Clock, ArrowRight } from "lucide-react";
import { PublicLayout } from "@/components/layout";
import { Badge } from "@/components/ui";
import { getWeeklyOffers, getActivePromotions } from "@/mocks/data";
import {
  FeaturedOfferCard,
  CompactOfferCard,
} from "@/modules/promotions/presentation/components";

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

      {/* Featured offers: horizontal scroll */}
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

      {/* All offers: compact grid */}
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
