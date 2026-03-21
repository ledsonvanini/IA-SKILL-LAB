import type {
  OfferSubmission,
  OfferRow,
} from "@/mocks/types/offer-submission";

/**
 * Generates a random alphanumeric ID for rows and submissions.
 */
export function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

/**
 * Returns an empty row structure with a new unique ID.
 */
export function createEmptyRow(): OfferRow {
  return { 
    id: generateId(), 
    descricao: "", 
    venda: null, 
    promocao: null, 
    limite: "" 
  };
}

/**
 * Returns an empty submission structure for initial state.
 */
export function createEmptySubmission(): OfferSubmission {
  return {
    id: generateId(),
    tabs: {},
    status: "draft",
    submittedAt: null,
    submittedBy: "",
    unitId: "",
    notes: "",
    receivedAt: null,
  };
}
