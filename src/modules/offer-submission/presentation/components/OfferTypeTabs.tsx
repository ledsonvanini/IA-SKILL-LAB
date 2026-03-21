"use client";

import {
  Tv,
  Radio,
  Newspaper,
  Leaf,
  Snowflake,
  Beef,
  Wine,
} from "lucide-react";
import type { OfferType } from "@/mocks/types/offer-submission";
import { OFFER_TYPE_META, OFFER_TYPE_ORDER } from "@/mocks/types/offer-submission";

const ICONS: Record<OfferType, React.ElementType> = {
  tv:         Tv,
  radio:      Radio,
  tabloid:    Newspaper,
  hortifruti: Leaf,
  frios:      Snowflake,
  carnes:     Beef,
  bebidas:    Wine,
};

interface OfferTypeTabsProps {
  active: OfferType;
  onChange: (type: OfferType) => void;
  badges?: Partial<Record<OfferType, boolean>>;
}

export function OfferTypeTabs({ active, onChange, badges = {} }: OfferTypeTabsProps) {
  return (
    <div className="Subtabs-Oferta flex items-center gap-1 overflow-x-auto scrollbar-hide pb-1">
      {OFFER_TYPE_ORDER.map((type) => {
        const meta = OFFER_TYPE_META[type];
        const Icon = ICONS[type];
        const isActive = type === active;
        const hasBadge = badges[type];

        return (
          <button
            key={type}
            type="button"
            onClick={() => onChange(type)}
            className={`
              relative flex items-center gap-2 px-4 py-2 rounded-lg
              text-sm font-semibold whitespace-nowrap
              transition-all duration-150
              ${isActive
                ? "bg-[var(--color-primary)] text-white shadow-sm"
                : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--color-primary-light)]"
              }
            `}
            aria-selected={isActive}
            role="tab"
          >
            <Icon size={15} />
            {meta.label}
            {hasBadge && (
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isActive ? 'bg-white' : 'bg-[var(--color-danger)]'}`} title="Contém ofertas informadas" />
            )}
          </button>
        );
      })}
    </div>
  );
}
