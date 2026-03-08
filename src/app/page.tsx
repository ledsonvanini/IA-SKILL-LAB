"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Flame,
  Wheat,
  Beef,
  Apple,
  Wine,
  Milk,
  SprayCan,
  Sparkles,
  Croissant,
} from "lucide-react";
import { PublicLayout } from "@/components/layout";
import { Badge, Button } from "@/components/ui";
import { CategoryCarousel } from "@/components/shared/CategoryCarousel";
import { useTheme } from "@/contexts/ThemeContext";
import { CATEGORIES } from "@/mocks/data";
import type { LucideIcon } from "lucide-react";

/* ── Mapa de ícones Lucide por categoria ── */
const ICON_MAP: Record<string, LucideIcon> = {
  Wheat,
  Beef,
  Apple,
  Wine,
  Milk,
  SprayCan,
  Sparkles,
  Croissant,
};

/* Cores dinâmicas: light = branco, dark = colorido */
const LIGHT_COLORS = [
  "bg-white text-amber-600 shadow-sm hover:shadow-md",
  "bg-white text-red-600 shadow-sm hover:shadow-md",
  "bg-white text-green-600 shadow-sm hover:shadow-md",
  "bg-white text-purple-600 shadow-sm hover:shadow-md",
  "bg-white text-blue-600 shadow-sm hover:shadow-md",
  "bg-white text-cyan-600 shadow-sm hover:shadow-md",
  "bg-white text-pink-600 shadow-sm hover:shadow-md",
  "bg-white text-orange-600 shadow-sm hover:shadow-md",
];

const DARK_COLORS = [
  "text-amber-400 shadow-none",
  "text-red-400 shadow-none",
  "text-green-400 shadow-none",
  "text-purple-400 shadow-none",
  "text-blue-400 shadow-none",
  "text-cyan-400 shadow-none",
  "text-pink-400 shadow-none",
  "text-orange-400 shadow-none",
];

const DARK_BG = [
  "rgba(120, 53, 15, 0.25)",
  "rgba(127, 29, 29, 0.25)",
  "rgba(20, 83, 45, 0.25)",
  "rgba(59, 7, 100, 0.25)",
  "rgba(30, 58, 138, 0.25)",
  "rgba(22, 78, 99, 0.25)",
  "rgba(131, 24, 67, 0.25)",
  "rgba(124, 45, 18, 0.25)",
];

/* ── Banner Images (3 imagens com fade) ── */
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&h=500&fit=crop&crop=bottom",
  "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1400&h=500&fit=crop",
];

/* ── Hero Banner com slideshow fade ── */
function HeroBanner() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % HERO_IMAGES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="Seção-Hero relative overflow-hidden">
      <div className="relative h-[280px] sm:h-[380px] lg:h-[420px]">
        {/* Slideshow com transição fade */}
        {HERO_IMAGES.map((url, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={url}
            alt={`Promoção Meta21 ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
            style={{ opacity: i === current ? 1 : 0 }}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <Badge
            variant="offer"
            className="w-fit mb-3 text-xs px-3 py-1 rounded-md"
          >
            <Flame size={12} className="mr-1" />
            Exclusivo Meta21
          </Badge>
          <h1 className="text-white text-3xl sm:text-5xl lg:text-6xl font-black leading-tight mb-3">
            Ofertas da
            <br />
            <span className="text-amber-400">Semana</span>
          </h1>
          <p className="text-white/80 text-sm sm:text-lg max-w-md mb-6">
            Economize até 50% em toda a loja. Qualidade garantida na sua mesa
            todos os dias.
          </p>
          <Link href="/ofertas">
            <Button variant="primary" size="lg" className="w-fit shadow-xl">
              <Flame size={18} />
              Ver Ofertas Agora
            </Button>
          </Link>
        </div>

        {/* Dots indicator */}
        <div className="absolute bottom-4 right-8 flex gap-2">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "bg-white scale-110"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Imagem ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Categorias com ícones Lucide — links anchor ── */
function CategoriesSection() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <section className="Seção-Categorias max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <h2 className="text-lg sm:text-xl font-bold mb-6 text-center">
        Compre por Departamento
      </h2>
      <div className="flex flex-wrap justify-center gap-5 sm:gap-7">
        {CATEGORIES.map((cat, i) => {
          const Icon = ICON_MAP[cat.icon] ?? Wheat;
          const colorClass = isDark ? DARK_COLORS[i] : LIGHT_COLORS[i];
          return (
            <a
              key={cat.id}
              href={`#dept-${cat.slug}`}
              className="flex flex-col items-center gap-2.5 group"
            >
              <div
                className={`w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full flex items-center justify-center border border-[var(--border)] transition-all duration-300 group-hover:scale-110 group-hover:border-[var(--color-primary)] ${colorClass}`}
                style={isDark ? { backgroundColor: DARK_BG[i] } : undefined}
              >
                <Icon size={26} strokeWidth={1.8} />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[var(--foreground)] text-center leading-tight">
                {cat.name}
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

/* ── Seções por departamento ── */
const FEATURED_SECTIONS = [
  { categoryId: "cat-02", title: "Carnes" },
  { categoryId: "cat-04", title: "Bebidas" },
  { categoryId: "cat-03", title: "Hortifruti" },
  { categoryId: "cat-08", title: "Padaria" },
  { categoryId: "cat-01", title: "Alimentos" },
  { categoryId: "cat-05", title: "Laticínios" },
  { categoryId: "cat-07", title: "Higiene" },
  { categoryId: "cat-06", title: "Limpeza" },
];

/* ── Page ── */
export default function HomePage() {
  return (
    <PublicLayout>
      <HeroBanner />
      <CategoriesSection />

      {/* Divider de destaque */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="flex items-center gap-3 border-b border-[var(--border)] pb-4">
          <Flame
            size={22}
            className="text-[var(--color-primary)] flex-shrink-0"
          />
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Venha Economizar de Verdade
          </h2>
        </div>
      </div>

      {/* Category sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14 py-4 sm:py-6">
        {FEATURED_SECTIONS.map((sec, i) => (
          <CategoryCarousel
            key={sec.categoryId}
            categoryId={sec.categoryId}
            title={sec.title}
            bannerPosition={i % 2 === 0 ? "left" : "right"}
          />
        ))}
      </div>
    </PublicLayout>
  );
}
