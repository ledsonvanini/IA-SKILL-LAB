import { ReactNode } from "react";
import { RoleGuard } from "@/components/middleware/RoleGuard";

export default function CustomerLayout({ children }: { children: ReactNode }) {
  // O CustomerLayout vai usar o PublicLayout por dentro ou o próprio Header
  // e o RoleGuard vai proteger a rota.
  return (
    <RoleGuard allowedRoles={["customer", "admin", "manager"]} redirectTo="/admin/login">
      <div className="min-h-screen bg-[var(--background)] flex flex-col">
        {/* Futuramente incluiremos o PublicLayout ou um Header específico na própria página cliente.
            Aqui nós queremos apenas proteger a página em si. */}
        {children}
      </div>
    </RoleGuard>
  );
}
