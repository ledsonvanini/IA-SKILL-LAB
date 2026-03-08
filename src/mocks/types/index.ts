/* ── Tipos base do domínio ──
   Servem como contrato entre mock data → futuro DB schema.
   Qualquer mudança aqui reflete diretamente nos componentes. */

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string; // nome do ícone Lucide
}

export interface StoreUnit {
  id: string;
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
  hours: {
    weekdays: string;
    weekends: string;
  };
  coordinates: { lat: number; lng: number };
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  description: string;
  imageUrl: string;
  unit: "un" | "kg" | "lt" | "pct" | "cx";
  basePrice: number;
  sku: string;
  inStock: boolean;
}

export type PromotionStatus = "draft" | "published" | "archived" | "expired";

export interface Promotion {
  id: string;
  title: string;
  productId: string;
  storeUnitId: string;
  originalPrice: number;
  promoPrice: number;
  discountPercent: number;
  startDate: string; // ISO 8601
  endDate: string;   // ISO 8601
  status: PromotionStatus;
  likes: number;
  views: number;
  isWeeklyOffer: boolean; // badge "Ver Oferta" → leva para /ofertas
  imageUrl: string;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  promotionId?: string;
  quantity: number;
  unitPrice: number;
}

export interface Cart {
  items: CartItem[];
  updatedAt: string;
}
