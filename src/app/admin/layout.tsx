"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { RoleGuard } from "@/components/middleware/RoleGuard";

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <RoleGuard allowedRoles={["admin", "manager"]} redirectTo="/admin/login">
      <AdminLayout>{children}</AdminLayout>
    </RoleGuard>
  );
}
