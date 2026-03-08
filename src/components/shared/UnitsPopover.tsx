"use client";

import { useState } from "react";
import {
  X,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Navigation,
  Store,
} from "lucide-react";
import { STORE_UNITS } from "@/mocks/data";
import type { StoreUnit } from "@/mocks/types";

interface UnitsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

function getWhatsAppUrl(whatsapp: string) {
  const digits = whatsapp.replace(/\D/g, "");
  return `https://wa.me/55${digits}?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20o%20Meta21.`;
}

function getMapsUrl(unit: StoreUnit) {
  return `https://www.google.com/maps/search/?api=1&query=${unit.coordinates.lat},${unit.coordinates.lng}`;
}

export function UnitsPopover({ isOpen, onClose }: UnitsPopoverProps) {
  const [selected, setSelected] = useState<StoreUnit>(STORE_UNITS[0]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="Popover-Unidades fixed inset-6 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-[90] bg-[var(--surface)] rounded-2xl shadow-2xl border border-[var(--border)] sm:w-[760px] sm:max-h-[540px] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <Store size={20} className="text-[var(--color-primary)]" />
            <h2 className="text-lg font-bold">Nossas Unidades</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors rounded-lg"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body — 2 columns */}
        <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">
          {/* Left: store list */}
          <div className="sm:w-[260px] border-r border-[var(--border)] overflow-y-auto scrollbar-styled">
            {STORE_UNITS.map((unit) => (
              <button
                key={unit.id}
                onClick={() => setSelected(unit)}
                className={`w-full text-left px-5 py-4 border-b border-[var(--border)] transition-colors ${
                  selected.id === unit.id
                    ? "bg-[var(--color-primary-light)] border-l-4 border-l-[var(--color-primary)]"
                    : "hover:bg-[var(--color-primary-light)]/50"
                }`}
              >
                <h3 className="font-bold text-sm text-[var(--foreground)]">
                  {unit.name}
                </h3>
                <p className="text-xs text-[var(--muted)] mt-0.5 line-clamp-2">
                  {unit.address}
                </p>
              </button>
            ))}
          </div>

          {/* Right: selected store details */}
          <div className="flex-1 p-6 overflow-y-auto scrollbar-styled space-y-4">
            <h3 className="text-xl font-black text-[var(--foreground)]">
              {selected.name}
            </h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="text-[var(--color-primary)] flex-shrink-0 mt-0.5"
                />
                <p className="text-sm text-[var(--muted)]">
                  {selected.address}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone
                  size={16}
                  className="text-[var(--color-primary)] flex-shrink-0"
                />
                <p className="text-sm text-[var(--muted)]">{selected.phone}</p>
              </div>

              <div className="flex items-center gap-3">
                <MessageCircle
                  size={16}
                  className="text-[var(--color-primary)] flex-shrink-0"
                />
                <a
                  href={getWhatsAppUrl(selected.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--color-primary)] font-semibold hover:underline"
                >
                  {selected.whatsapp}
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Clock
                  size={16}
                  className="text-[var(--color-primary)] flex-shrink-0 mt-0.5"
                />
                <div className="text-sm text-[var(--muted)]">
                  <p>Seg–Sáb: {selected.hours.weekdays}</p>
                  <p>Dom/Feriado: {selected.hours.weekends}</p>
                </div>
              </div>
            </div>

            {/* Maps link */}
            <a
              href={getMapsUrl(selected)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[var(--color-primary)] text-white text-sm font-bold hover:bg-[var(--color-primary-hover)] transition-colors w-fit"
            >
              <Navigation size={16} />
              Como Chegar
            </a>

            {/* Embedded map */}
            <div className="h-[180px] rounded-xl overflow-hidden border border-[var(--border)]">
              <iframe
                src={`https://www.google.com/maps?q=${selected.coordinates.lat},${selected.coordinates.lng}&z=15&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title={`Mapa ${selected.name}`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
