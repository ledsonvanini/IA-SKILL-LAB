/**
 * Constantes globais da aplicação META21.
 * Valores de configuração que NUNCA devem ficar hardcoded nos componentes.
 */

// Números de WhatsApp por unidade (formato: 55 + DDD + número, sem espaços)
export const WHATSAPP_NUMBERS = {
  "unit-01": "5511987654321", // META21 Centro
  "unit-02": "5511987654322", // META21 Pinheiros
  "unit-03": "5511987654323", // META21 Mooca
  default: "5511987654321",   // Fallback: unidade principal
} as const;

/** Gera a URL de finalização via WhatsApp com mensagem pré-formatada */
export function buildWhatsAppUrl(
  unitId: keyof typeof WHATSAPP_NUMBERS = "default",
  message = "Olá! Gostaria de finalizar meu pedido pelo Meta21."
): string {
  const number = WHATSAPP_NUMBERS[unitId] ?? WHATSAPP_NUMBERS.default;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
