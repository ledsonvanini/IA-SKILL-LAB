"use client";

import { useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
}

export function RoleGuard({ children, allowedRoles, redirectTo = "/" }: RoleGuardProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || !user) {
        // Redireciona para o login específico dependendo da rota tentada
        if (pathname.startsWith("/admin")) {
          router.replace("/admin/login");
        } else {
          router.replace(redirectTo);
        }
      } else if (!allowedRoles.includes(user.role)) {
        // Usuário logado mas sem permissão
        router.replace("/");
      }
    }
  }, [isLoading, isAuthenticated, user, router, pathname, allowedRoles, redirectTo]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[var(--background)]">
        <Loader2 className="animate-spin text-[var(--color-primary)]" size={32} />
      </div>
    );
  }

  // Só renderiza os children se o usuário estiver autenticado e tiver a role correta
  if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
