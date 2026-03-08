"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { Card, Button } from "@/components/ui";
import { useCart } from "@/contexts/CartContext";
import { formatBRL } from "@/lib/format";
import {
  getProductsByCategory,
  getPromotionForProduct,
  getCategoryById,
  CATEGORY_BANNERS,
} from "@/mocks/data";

interface CategoryCarouselProps {
  categoryId: string;
  title: string;
  bannerPosition: "left" | "right";
}

/** Largura base do card para calcular scroll distance */
const CARD_WIDTH_BASE = 200;

export function CategoryCarousel({
  categoryId,
  title,
  bannerPosition,
}: CategoryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const { addItem } = useCart();

  const products = getProductsByCategory(categoryId);
  const category = getCategoryById(categoryId);
  const bannerUrl = CATEGORY_BANNERS[categoryId];

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const timer = setTimeout(checkScroll, 200);
    const el = scrollRef.current;
    el?.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      clearTimeout(timer);
      el?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir === "left" ? -CARD_WIDTH_BASE : CARD_WIDTH_BASE,
      behavior: "smooth",
    });
  };

  return (
    <section
      id={`dept-${category?.slug}`}
      className={`Seção-Departamento-${category?.name}`}
    >
      <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
        <span className="w-1 h-6 bg-[var(--color-primary)] rounded-full" />
        Especial {title}
      </h2>

      <div
        className={`flex gap-3 ${bannerPosition === "right" ? "flex-row-reverse" : ""}`}
      >
        {/* Vertical banner */}
        <div className="hidden md:flex flex-shrink-0 w-[200px] lg:w-[220px] rounded-xl overflow-hidden relative group/banner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bannerUrl}
            alt={`Especial ${category?.name}`}
            className="absolute inset-0 w-full h-full object-cover group-hover/banner:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">
              Especial
            </span>
            <h3 className="text-white text-xl font-black leading-tight">
              {category?.name}
            </h3>
          </div>
        </div>

        {/* Carousel area */}
        <div className="flex-1 min-w-0 relative">
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-[var(--surface)] border border-[var(--border)] shadow-lg flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft size={18} />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-[var(--surface)] border border-[var(--border)] shadow-lg flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-colors"
              aria-label="Próximo"
            >
              <ChevronRight size={18} />
            </button>
          )}

          {/* Product cards using Card compound */}
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth py-1"
          >
            {products.map((product) => {
              const promo = getPromotionForProduct(product.id);
              const price = promo ? promo.promoPrice : product.basePrice;
              const originalPrice = promo ? promo.originalPrice : undefined;

              return (
                <Card
                  key={product.id}
                  hover
                  className="Card-Produto-Carousel flex-shrink-0 w-[170px] sm:w-[190px] lg:w-[200px] flex flex-col hover:border-[var(--color-primary)]/20"
                >
                  <Card.Image
                    src={product.imageUrl}
                    alt={product.name}
                    aspectRatio="square"
                  />
                  <Card.Body className="flex flex-col flex-1">
                    <h4 className="text-sm font-semibold text-[var(--foreground)] line-clamp-2 leading-snug mb-2 min-h-[2.6em]">
                      {product.name}
                    </h4>
                    <div className="mt-auto">
                      <Card.Price
                        from={originalPrice}
                        to={price}
                      />
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-full text-xs mt-3"
                        onClick={() =>
                          addItem({
                            productId: product.id,
                            promotionId: promo?.id,
                            unitPrice: price,
                          })
                        }
                      >
                        <ShoppingCart size={13} />
                        Comprar
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
