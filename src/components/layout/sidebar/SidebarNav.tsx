"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useOfferStorage } from "@/modules/offer-submission/presentation/offer-submission/useOfferStorage";
import { SidebarItem } from "./SidebarItem";
import { SIDEBAR_ITEMS } from "./navigation-data";

export function SidebarNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { hasAgencyNotification, hasManagerNotification } = useOfferStorage();
  
  const hasAnyOfferNotification = 
    (user?.role === "admin" && hasAgencyNotification) || 
    (user?.role === "manager" && hasManagerNotification);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <nav 
      className="Sidebar-Navegação flex-1 px-4 space-y-1 mt-2 mb-4 overflow-y-auto" 
      aria-label="Menu administrativo"
    >
      {SIDEBAR_ITEMS.map((item) => (
        <SidebarItem
          key={item.href}
          item={item}
          pathname={pathname}
          isActive={isActive}
          hasNotification={hasAnyOfferNotification}
        />
      ))}
    </nav>
  );
}
