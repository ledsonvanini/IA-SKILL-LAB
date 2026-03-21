"use client";

interface OfferNotesSectionProps {
  notes: string;
  isLocked: boolean;
  onUpdateNotes: (notes: string) => void;
}

export function OfferNotesSection({
  notes,
  isLocked,
  onUpdateNotes,
}: OfferNotesSectionProps) {
  return (
    <div className="Seção-Observações bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 space-y-2 focus-within:ring-1 focus-within:ring-[var(--color-primary)]/30 transition-shadow">
      <label htmlFor="offer-notes" className="text-sm font-semibold text-[var(--foreground)]">
        Observações gerais
      </label>
      <textarea
        id="offer-notes"
        rows={3}
        value={notes}
        onChange={(e) => onUpdateNotes(e.target.value)}
        disabled={isLocked}
        placeholder="Ex: Confirmar disponibilidade de estoque antes de veicular..."
        className={`
          Campo-Notas w-full bg-[var(--background)] text-sm text-[var(--foreground)] 
          placeholder:text-[var(--muted)]/60 rounded-lg border border-[var(--border)] 
          p-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 
          resize-none transition-all
          ${isLocked ? "opacity-50 cursor-not-allowed" : "hover:border-[var(--color-primary)]/50"}
        `}
      />
    </div>
  );
}
