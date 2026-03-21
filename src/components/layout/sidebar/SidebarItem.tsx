"use client";

import Link from "next/link";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import type { SidebarItemConfig } from "./navigation-data";

interface SidebarItemProps {
  item: SidebarItemConfig;
  pathname: string;
  isActive: (href: string) => boolean;
  hasNotification: boolean;
}

export function SidebarItem({
  item,
  pathname,
  isActive,
  hasNotification,
}: SidebarItemProps) {
  // Check if any child route is active to expand accordion
  const isChildActive = "children" in item && item.children.some((c) => 
    isActive(c.href) || pathname === c.href || pathname.startsWith(c.href)
  );
  const isParentActive = isActive(item.href);
  const [isOpen, setIsOpen] = useState(isChildActive || isParentActive);

  // Sync accordion expansion when navigating from external links
  useEffect(() => {
    if (isChildActive || isParentActive) {
      setIsOpen(true);
    }
  }, [isChildActive, isParentActive]);

  // If item doesn't have children, render a simple link
  if (!("children" in item)) {
    return (
      <Link
        href={item.href}
        className={`
          Menu-Link flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
          transition-colors
          ${
            isActive(item.href)
              ? "bg-[var(--color-primary-light)] text-[var(--color-primary)] border-l-4 border-[var(--color-primary)]"
              : "text-[var(--muted)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)]"
          }
        `}
      >
        <item.icon size={18} />
        <span className="flex-1">{item.label}</span>
      </Link>
    );
  }

  const showBadge = item.href === "/admin/planejamento" && hasNotification;

  return (
    <div className="Item-Accordion space-y-1">
      <div
        className={`
          Accordion-Header w-full flex items-center justify-between rounded-lg
          transition-colors
          ${
            isParentActive || isChildActive
              ? "bg-[var(--color-primary-light)]/50 text-[var(--color-primary)] border-l-4 border-[var(--color-primary)]"
              : "text-[var(--muted)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)] border-l-4 border-transparent"
          }
        `}
      >
        <Link 
          href={item.href}
          className="flex items-center gap-3 px-4 py-3 flex-1 text-sm font-medium"
        >
          <item.icon size={18} />
          <span>{item.label}</span>
        </Link>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
          }}
          className="px-4 py-3 flex items-center gap-2 text-[var(--muted)] hover:text-[var(--color-primary)] transition-colors"
          title="Expandir/Recolher"
        >
          {showBadge && (
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[var(--color-danger)] text-white text-[10px] font-black">
              !
            </span>
          )}
          {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {isOpen && (
        <div className="Accordion-Submmenu mt-1 space-y-1 animate-in slide-in-from-top-1 duration-200">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className={`
                Sublink block pl-11 py-2 text-xs font-medium rounded-lg
                transition-colors
                ${
                  pathname === child.href
                    ? "text-[var(--color-primary)] bg-[var(--color-primary-light)]/30"
                    : "text-[var(--muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-light)]/20"
                }
              `}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
