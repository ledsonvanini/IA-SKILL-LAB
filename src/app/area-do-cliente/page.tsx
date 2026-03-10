"use client";

import { useAuth } from "@/contexts/AuthContext";
import { PublicLayout } from "@/components/layout";
import { LogOut, Package, Share2, History, User } from "lucide-react";
import { Button } from "@/components/ui";
import Link from "next/link";

export default function CustomerDashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="Página-Dashboard-Cliente">
      <PublicLayout>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            
            {/* Sidebar Cliente */}
            <aside className="Sidebar-Cliente w-full md:w-64 flex-shrink-0">
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 text-center shadow-sm">
                <div className="w-20 h-20 mx-auto bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center overflow-hidden mb-4 border-4 border-[var(--background)] shadow-lg">
                  {user?.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <User size={32} className="text-[var(--muted)]" />
                  )}
                </div>
                <h2 className="font-bold text-lg">{user?.name}</h2>
                <p className="text-[var(--muted)] text-sm mb-6">{user?.email}</p>

                <nav className="flex flex-col gap-2 text-left">
                  <Link href="/area-do-cliente" passHref>
                    <Button variant="secondary" className="justify-start gap-3 w-full bg-[var(--color-primary-light)] text-[var(--color-primary)] border-[var(--color-primary)]/50">
                      <Package size={18} /> Histórico de Compras
                    </Button>
                  </Link>
                  <Link href="/area-do-cliente/perfil" passHref>
                     <Button variant="secondary" className="justify-start gap-3 w-full text-[var(--muted)] hover:text-[var(--foreground)]">
                       <User size={18} /> Meu Perfil
                     </Button>
                  </Link>
                  <Button variant="secondary" className="justify-start gap-3 w-full text-[var(--muted)] hover:text-[var(--foreground)] mt-4">
                    <Share2 size={18} /> Ofertas Compartilhadas
                  </Button>
                  <Button variant="secondary" className="justify-start gap-3 w-full text-red-500 hover:text-red-600 hover:border-red-500/50" onClick={logout}>
                    <LogOut size={18} /> Sair
                  </Button>
                </nav>
              </div>
            </aside>

            {/* Conteúdo Cliente */}
            <section className="Conteúdo-Dashboard flex-1 space-y-8 w-full">
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-[var(--border)]">
                  <History className="text-[var(--color-primary)]" size={28} />
                  <h1 className="text-2xl font-black">Minhas Compras</h1>
                </div>

                {/* Empty State do Mock */}
                <div className="text-center py-16 px-4 bg-[var(--background)] rounded-2xl border border-dashed border-[var(--border)]">
                  <Package size={48} className="mx-auto text-[var(--muted)] mb-4" />
                  <h3 className="text-xl font-bold mb-2">Você ainda não tem compras</h3>
                  <p className="text-[var(--muted)] max-w-md mx-auto mb-6">
                    Assim que você aproveitar nossas ofertas, seu histórico de economia aparecerá aqui.
                  </p>
                  <Button>Ver Ofertas da Semana</Button>
                </div>
              </div>
            </section>

          </div>
        </main>
      </PublicLayout>
    </div>
  );
}
