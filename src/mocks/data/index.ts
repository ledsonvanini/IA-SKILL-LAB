import type { Category, StoreUnit, Product, Promotion } from "../types";

/* ── Categorias ── */
export const CATEGORIES: Category[] = [
  { id: "cat-01", name: "Alimentos", slug: "alimentos", icon: "Wheat" },
  { id: "cat-02", name: "Carnes", slug: "carnes", icon: "Beef" },
  { id: "cat-03", name: "Hortifruti", slug: "hortifruti", icon: "Apple" },
  { id: "cat-04", name: "Bebidas", slug: "bebidas", icon: "Wine" },
  { id: "cat-05", name: "Laticínios", slug: "laticinios", icon: "Milk" },
  { id: "cat-06", name: "Limpeza", slug: "limpeza", icon: "SprayCan" },
  { id: "cat-07", name: "Higiene", slug: "higiene", icon: "Bath" },
  { id: "cat-08", name: "Padaria", slug: "padaria", icon: "Croissant" },
];

/* ── Unidade de Loja ── */
export const STORE_UNITS: StoreUnit[] = [
  {
    id: "unit-01",
    name: "META21 Centro",
    address: "Av. das Nações Unidas, 12901 - Brooklin Paulista, São Paulo - SP",
    phone: "(11) 3456-7890",
    whatsapp: "(11) 98765-4321",
    hours: {
      weekdays: "07h às 22h",
      weekends: "08h às 20h",
    },
    coordinates: { lat: -23.6015, lng: -46.6929 },
  },
];

/* ── Produtos ── */
export const PRODUCTS: Product[] = [
  {
    id: "prod-01",
    name: "Arroz Agulhinha Tipo 1 - 5kg",
    slug: "arroz-agulhinha-5kg",
    categoryId: "cat-01",
    description: "Arroz longo fino tipo 1, grão selecionado. Pacote de 5kg.",
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 26.5,
    sku: "ARR-001",
    inStock: true,
  },
  {
    id: "prod-02",
    name: "Picanha Bovina Resfriada",
    slug: "picanha-bovina",
    categoryId: "cat-02",
    description: "Picanha bovina resfriada de primeira qualidade.",
    imageUrl: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=400&h=400&fit=crop",
    unit: "kg",
    basePrice: 70.0,
    sku: "CAR-001",
    inStock: true,
  },
  {
    id: "prod-03",
    name: "Maçã Gala Importada",
    slug: "maca-gala",
    categoryId: "cat-03",
    description: "Maçãs gala importadas, frescas e selecionadas.",
    imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop",
    unit: "kg",
    basePrice: 9.9,
    sku: "HOR-001",
    inStock: true,
  },
  {
    id: "prod-04",
    name: "Cerveja Lager 350ml",
    slug: "cerveja-lager-350",
    categoryId: "cat-04",
    description: "Cerveja tipo Lager, lata 350ml.",
    imageUrl: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 5.6,
    sku: "BEB-001",
    inStock: true,
  },
  {
    id: "prod-05",
    name: "Detergente Líquido 500ml",
    slug: "detergente-500ml",
    categoryId: "cat-06",
    description: "Detergente líquido concentrado, frasco 500ml.",
    imageUrl: "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 2.5,
    sku: "LIM-001",
    inStock: true,
  },
  {
    id: "prod-06",
    name: "Leite Integral 1L",
    slug: "leite-integral-1l",
    categoryId: "cat-05",
    description: "Leite integral UHT, caixa 1 litro.",
    imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 5.5,
    sku: "LAT-001",
    inStock: true,
  },
  {
    id: "prod-07",
    name: "Banana Nanica",
    slug: "banana-nanica",
    categoryId: "cat-03",
    description: "Banana nanica fresca, preço por quilo.",
    imageUrl: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop",
    unit: "kg",
    basePrice: 6.5,
    sku: "HOR-002",
    inStock: true,
  },
  {
    id: "prod-08",
    name: "Suco de Laranja Integral 900ml",
    slug: "suco-laranja-900ml",
    categoryId: "cat-04",
    description: "Suco de laranja 100% integral, garrafa 900ml.",
    imageUrl: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 14.9,
    sku: "BEB-002",
    inStock: true,
  },
];

/* ── Promoções ── */
const now = new Date();
const weekStart = new Date(now);
weekStart.setDate(now.getDate() - now.getDay());
const weekEnd = new Date(weekStart);
weekEnd.setDate(weekStart.getDate() + 6);
weekEnd.setHours(23, 59, 59);

export const PROMOTIONS: Promotion[] = [
  {
    id: "promo-01",
    title: "Arroz com desconto especial",
    productId: "prod-01",
    storeUnitId: "unit-01",
    originalPrice: 26.5,
    promoPrice: 19.9,
    discountPercent: 25,
    startDate: weekStart.toISOString(),
    endDate: weekEnd.toISOString(),
    status: "published",
    likes: 142,
    views: 1580,
    isWeeklyOffer: true,
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
    createdAt: new Date(now.getTime() - 2 * 86400000).toISOString(),
  },
  {
    id: "promo-02",
    title: "Picanha bovina com preço especial",
    productId: "prod-02",
    storeUnitId: "unit-01",
    originalPrice: 70.0,
    promoPrice: 59.9,
    discountPercent: 15,
    startDate: weekStart.toISOString(),
    endDate: weekEnd.toISOString(),
    status: "published",
    likes: 287,
    views: 3200,
    isWeeklyOffer: true,
    imageUrl: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=400&h=400&fit=crop",
    createdAt: new Date(now.getTime() - 3 * 86400000).toISOString(),
  },
  {
    id: "promo-03",
    title: "Maçã gala importada em promoção",
    productId: "prod-03",
    storeUnitId: "unit-01",
    originalPrice: 9.9,
    promoPrice: 8.9,
    discountPercent: 10,
    startDate: weekStart.toISOString(),
    endDate: weekEnd.toISOString(),
    status: "published",
    likes: 56,
    views: 890,
    isWeeklyOffer: false,
    imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop",
    createdAt: new Date(now.getTime() - 1 * 86400000).toISOString(),
  },
  {
    id: "promo-04",
    title: "Cerveja lager por um preço incrível",
    productId: "prod-04",
    storeUnitId: "unit-01",
    originalPrice: 5.6,
    promoPrice: 4.5,
    discountPercent: 20,
    startDate: weekStart.toISOString(),
    endDate: weekEnd.toISOString(),
    status: "published",
    likes: 198,
    views: 2100,
    isWeeklyOffer: true,
    imageUrl: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=400&fit=crop",
    createdAt: new Date(now.getTime() - 4 * 86400000).toISOString(),
  },
  {
    id: "promo-05",
    title: "Detergente com 30% de desconto",
    productId: "prod-05",
    storeUnitId: "unit-01",
    originalPrice: 2.5,
    promoPrice: 1.75,
    discountPercent: 30,
    startDate: weekStart.toISOString(),
    endDate: weekEnd.toISOString(),
    status: "published",
    likes: 73,
    views: 950,
    isWeeklyOffer: false,
    imageUrl: "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=400&h=400&fit=crop",
    createdAt: new Date(now.getTime() - 5 * 86400000).toISOString(),
  },
  {
    id: "promo-06",
    title: "Leite integral com preço reduzido",
    productId: "prod-06",
    storeUnitId: "unit-01",
    originalPrice: 5.5,
    promoPrice: 4.84,
    discountPercent: 12,
    startDate: weekStart.toISOString(),
    endDate: weekEnd.toISOString(),
    status: "published",
    likes: 91,
    views: 1200,
    isWeeklyOffer: false,
    imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop",
    createdAt: new Date(now.getTime() - 2 * 86400000).toISOString(),
  },
  {
    id: "promo-07",
    title: "Banana nanica pela metade do preço",
    productId: "prod-07",
    storeUnitId: "unit-01",
    originalPrice: 6.5,
    promoPrice: 3.9,
    discountPercent: 40,
    startDate: weekStart.toISOString(),
    endDate: weekEnd.toISOString(),
    status: "published",
    likes: 215,
    views: 2800,
    isWeeklyOffer: true,
    imageUrl: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop",
    createdAt: new Date(now.getTime() - 1 * 86400000).toISOString(),
  },
  {
    id: "promo-08",
    title: "Suco de laranja integral em oferta",
    productId: "prod-08",
    storeUnitId: "unit-01",
    originalPrice: 14.9,
    promoPrice: 11.62,
    discountPercent: 22,
    startDate: weekStart.toISOString(),
    endDate: weekEnd.toISOString(),
    status: "published",
    likes: 64,
    views: 780,
    isWeeklyOffer: false,
    imageUrl: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=400&fit=crop",
    createdAt: new Date(now.getTime() - 3 * 86400000).toISOString(),
  },
];

/* ── Helpers ── */
export function getProductById(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

export function getCategoryById(id: string) {
  return CATEGORIES.find((c) => c.id === id);
}

export function getPromotionsByProduct(productId: string) {
  return PROMOTIONS.filter((p) => p.productId === productId && p.status === "published");
}

export function getWeeklyOffers() {
  return PROMOTIONS.filter((p) => p.isWeeklyOffer && p.status === "published");
}

export function getActivePromotions() {
  return PROMOTIONS.filter((p) => p.status === "published");
}
