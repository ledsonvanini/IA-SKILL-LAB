/**
 * Tipos do módulo de Envio de Ofertas (Gerente ↔ Agência).
 */

export type OfferType =
  | "tv"
  | "radio"
  | "tabloid"
  | "hortifruti"
  | "frios"
  | "carnes"
  | "bebidas";

export type SubmissionStatus = "draft" | "sent" | "received";

/** Uma linha da grade de ofertas */
export interface OfferRow {
  id: string;
  descricao: string;
  venda?: number | null;      // Preço DE (R$)
  promocao?: number | null;   // Preço PROMOÇÃO (R$)
  /** Limite genérico: "05 QUILOS", "04 UNIDADES", "Qtd. por Spot: 3", etc. */
  limite?: string;
  // Index signature for dynamic column access
  [key: string]: string | number | null | undefined;
}

/** Configuração de coluna para cada tipo de oferta */
export interface OfferColumnConfig {
  key: keyof OfferRow;
  label: string;
  type: "text" | "currency" | "string";
  width?: string; // Tailwind width class, e.g. "w-16"
  placeholder?: string;
}

/** Mapa de colunas por tipo de oferta */
export const OFFER_COLUMNS: Record<OfferType, OfferColumnConfig[]> = {
  tv: [
    { key: "descricao", label: "Descrição do Produto", type: "text", placeholder: "Ex: ARROZ TIÃO 5KG" },
    { key: "venda",     label: "Venda (R$)",           type: "currency", width: "w-28", placeholder: "29,90" },
    { key: "promocao",  label: "Promoção (R$)",         type: "currency", width: "w-28", placeholder: "19,90" },
    { key: "limite",    label: "Qtd. por Spot",         type: "string",  width: "w-32", placeholder: "Ex: 2 produtos" },
  ],
  radio: [
    { key: "descricao", label: "Descrição do Produto", type: "text", placeholder: "Ex: LEITE INTEGRAL 1L" },
    { key: "venda",     label: "Venda (R$)",           type: "currency", width: "w-28", placeholder: "5,50" },
    { key: "promocao",  label: "Promoção (R$)",         type: "currency", width: "w-28", placeholder: "3,99" },
    { key: "limite",    label: "Qtd. por Spot",         type: "string",  width: "w-32", placeholder: "Ex: 3 produtos" },
  ],
  tabloid: [
    { key: "descricao", label: "Descrição do Produto", type: "text", placeholder: "Ex: FEIJÃO DONA BENTA 1KG" },
    { key: "venda",     label: "Venda (R$)",           type: "currency", width: "w-28", placeholder: "8,99" },
    { key: "promocao",  label: "Promoção (R$)",         type: "currency", width: "w-28", placeholder: "6,49" },
    { key: "limite",    label: "Limite",               type: "string",  width: "w-32", placeholder: "Ex: 03 UNIDADES" },
  ],
  hortifruti: [
    { key: "descricao", label: "Descrição do Produto", type: "text", placeholder: "Ex: BANANA NANICA KG" },
    { key: "venda",     label: "Venda (R$)",           type: "currency", width: "w-28", placeholder: "6,50" },
    { key: "promocao",  label: "Promoção (R$)",         type: "currency", width: "w-28", placeholder: "4,90" },
    { key: "limite",    label: "Limite",               type: "string",  width: "w-32", placeholder: "Ex: 05 QUILOS" },
  ],
  frios: [
    { key: "descricao", label: "Descrição do Produto", type: "text", placeholder: "Ex: QUEIJO MUSSARELA 200G" },
    { key: "venda",     label: "Venda (R$)",           type: "currency", width: "w-28", placeholder: "12,90" },
    { key: "promocao",  label: "Promoção (R$)",         type: "currency", width: "w-28", placeholder: "9,90" },
    { key: "limite",    label: "Limite",               type: "string",  width: "w-32", placeholder: "Ex: 02 UNIDADES" },
  ],
  carnes: [
    { key: "descricao", label: "Descrição do Produto", type: "text", placeholder: "Ex: PICANHA BOVINA KG" },
    { key: "venda",     label: "Venda (R$)",           type: "currency", width: "w-28", placeholder: "70,00" },
    { key: "promocao",  label: "Promoção (R$)",         type: "currency", width: "w-28", placeholder: "59,90" },
    { key: "limite",    label: "Limite",               type: "string",  width: "w-32", placeholder: "Ex: 05 QUILOS" },
  ],
  bebidas: [
    { key: "descricao", label: "Descrição do Produto", type: "text", placeholder: "Ex: CERVEJA LAGER 350ML" },
    { key: "venda",     label: "Venda (R$)",           type: "currency", width: "w-28", placeholder: "5,60" },
    { key: "promocao",  label: "Promoção (R$)",         type: "currency", width: "w-28", placeholder: "4,50" },
    { key: "limite",    label: "Limite",               type: "string",  width: "w-32", placeholder: "Ex: 12 UNIDADES" },
  ],
};

/** Labels e ícones para as tabs */
export const OFFER_TYPE_META: Record<OfferType, { label: string; icon: string }> = {
  tv:         { label: "TV",         icon: "Tv" },
  radio:      { label: "Rádio",      icon: "Radio" },
  tabloid:    { label: "Tabloide",   icon: "Newspaper" },
  hortifruti: { label: "Hortifruti", icon: "Leaf" },
  frios:      { label: "Frios",      icon: "Snowflake" },
  carnes:     { label: "Carnes",     icon: "Beef" },
  bebidas:    { label: "Bebidas",    icon: "Wine" },
};

export const OFFER_TYPE_ORDER: OfferType[] = [
  "tv", "radio", "tabloid", "hortifruti", "frios", "carnes", "bebidas",
];

/** Dados de uma aba de oferta */
export interface OfferTabData {
  type: OfferType;
  period: string;    // "25/03 a 27/03"
  columns: OfferColumnConfig[]; // <--- NEW (Dynamic columns)
  rows: OfferRow[];
}

/** Submission completa */
export interface OfferSubmission {
  id: string;
  tabs: Partial<Record<OfferType, OfferTabData>>;
  status: SubmissionStatus;
  submittedAt: string | null;
  submittedBy: string;
  unitId: string;
  notes?: string;
  receivedAt?: string | null;
}
