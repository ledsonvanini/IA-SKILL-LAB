"use client";

import { useAuth } from "@/contexts/AuthContext";
import { ManagerView } from "@/modules/offer-submission/presentation/components/ManagerView";
import { AgencyView } from "@/modules/offer-submission/presentation/components/AgencyView";

export default function OfertasPage() {
  const { user } = useAuth();

  if (!user) return null;

  return user.role === "manager" ? <ManagerView /> : <AgencyView />;
}
