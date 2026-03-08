"use client";

import { Flame, Clock, ArrowRight, ChevronRight, Timer } from "lucide-react";
import { PublicLayout } from "@/components/layout";
import { Badge } from "@/components/ui";
import { getWeeklyOffers, getActivePromotions } from "@/mocks/data";
import {
  FeaturedOfferCard,
  CompactOfferCard,
  Countdown,
} from "@/modules/promotions/presentation/components";

const HERO_BG =
  "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=1400&h=500&fit=crop&crop=center";

export default function OfertasPage() {
  const weeklyOffers = getWeeklyOffers();
  const allOffers = getActivePromotions();
  const endDate = weeklyOffers[0]?.endDate;

  return (
    <PublicLayout>
      {/* Hero com background */}
      <section className="Seção-Hero-Ofertas relative overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_BG}
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center sm:text-left">
          <Badge variant="offer" className="mb-3 text-xs px-3 py-1">
            <Flame size={12} className="mr-1" />
            Ofertas da Semana
          </Badge>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-2 drop-shadow-lg">
            Promoções Imperdíveis
          </h1>
          <p className="text-white/80 text-sm sm:text-base max-w-lg mb-4">
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

      {weeklyOffers.length > 0 && (
        <section className="Seção-Destaque-Scroll max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
                <Flame size={16} className="text-[var(--color-primary)]" />
                Ofertas em Destaque
              </h2>
              <span className="text-[var(--muted)] text-[10px] sm:text-xs flex items-center gap-1">
                Arraste
                <ArrowRight size={10} />
              </span>
            </div>
            <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
              {weeklyOffers.map((promo) => (
                <FeaturedOfferCard key={promo.id} promo={promo} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Todas as Ofertas — responsive: scroll horizontal no mobile, grid no desktop */}
      <section className="Seção-Grid-Ofertas max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-5">
          <h2 className="text-lg sm:text-xl font-bold">
            Todas as Ofertas Ativas
          </h2>
          <div className="flex justify-between items-center sm:gap-4 w-full sm:w-auto">
            {/* Global Countdown */}
            {endDate && (
              <div className="flex items-center gap-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-full px-3 py-1.5 text-xs font-medium shadow-sm">
                <span className="hidden sm:inline text-[var(--muted)]">Termina em:</span>
                <span className="sm:hidden text-[var(--muted)]">Expira em:</span>
                <Countdown endDate={endDate} />
              </div>
            )}
            {/* Hint de scroll — somente mobile */}
            <span className="sm:hidden text-[var(--muted)] text-xs flex items-center gap-1 animate-pulse ml-auto">
              Deslize
              <ChevronRight size={12} />
            </span>
          </div>
        </div>

        {/* Mobile: scroll horizontal | Desktop: grid */}
        <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0 sm:gap-3">
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
