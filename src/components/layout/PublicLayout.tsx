"use client";

import { useState, type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { UnitsPopover } from "@/components/shared/UnitsPopover";
import { CouponPopover } from "@/components/shared/CouponPopover";
import { WorkWithUsPopover } from "@/components/shared/WorkWithUsPopover";

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const [showUnits, setShowUnits] = useState(false);
  const [showCoupons, setShowCoupons] = useState(false);
  const [showWorkWithUs, setShowWorkWithUs] = useState(false);

  return (
    <div className="Página-Pública relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header onShowCoupons={() => setShowCoupons(true)} />

      <main className="Conteúdo-Principal flex-grow pb-16 md:pb-0">
        {children}
      </main>

      <Footer
        onShowUnits={() => setShowUnits(true)}
        onShowWorkWithUs={() => setShowWorkWithUs(true)}
      />

      <BottomNav onShowCoupons={() => setShowCoupons(true)} />

      {/* Popovers */}
      <UnitsPopover isOpen={showUnits} onClose={() => setShowUnits(false)} />
      <CouponPopover
        isOpen={showCoupons}
        onClose={() => setShowCoupons(false)}
      />
      <WorkWithUsPopover
        isOpen={showWorkWithUs}
        onClose={() => setShowWorkWithUs(false)}
      />
    </div>
  );
}
