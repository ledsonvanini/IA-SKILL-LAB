import type { Promotion } from "@/mocks/types";
import { getProductById } from "@/mocks/data";

/**
 * Gera URL amigável do Meta21 para compartilhar uma oferta.
 *
 * Padrão: /ofertas?meta={slug-do-produto}
 * Ex: /ofertas?meta=arroz-agulhinha-5kg
 */
export function getOfferShareUrl(promo: Promotion): string {
  const product = getProductById(promo.productId);
  const slug = product?.slug ?? promo.id;
  const base =
    typeof window !== "undefined" ? window.location.origin : "";
  return `${base}/ofertas?meta=${slug}`;
}

/**
 * Compartilha uma oferta usando Web Share API (mobile) ou clipboard (desktop).
 * Retorna true se o compartilhamento foi bem-sucedido.
 */
export async function shareOffer(promo: Promotion): Promise<boolean> {
  const product = getProductById(promo.productId);
  const url = getOfferShareUrl(promo);
  const title = `🔥 ${product?.name ?? promo.title} — ${promo.discountPercent}% OFF no Meta21!`;
  const text = `Encontrei esta oferta no Meta21! De R$ ${promo.originalPrice.toFixed(2)} por R$ ${promo.promoPrice.toFixed(2)}. Confira:`;

  /* Mobile — Web Share API */
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return true;
    } catch {
      /* Usuário cancelou ou erro — fallback */
    }
  }

  /* Desktop — Clipboard */
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch {
      /* Fallback legado */
    }
  }

  return false;
}
