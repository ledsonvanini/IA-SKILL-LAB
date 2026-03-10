"use client";

import { useAuth } from "@/contexts/AuthContext";
import { PublicLayout } from "@/components/layout";
import { LogOut, Package, User, MapPin, Save, Share2 } from "lucide-react";
import { Button } from "@/components/ui";
import Link from "next/link";

export default function CustomerProfilePage() {
  const { user, logout } = useAuth();

  return (
    <div className="Página-Perfil-Cliente">
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
                    <Button variant="secondary" className="justify-start gap-3 w-full text-[var(--muted)] hover:text-[var(--foreground)]">
                      <Package size={18} /> Histórico de Compras
                    </Button>
                  </Link>
                  <Link href="/area-do-cliente/perfil" passHref>
                     <Button variant="secondary" className="justify-start gap-3 w-full bg-[var(--color-primary-light)] text-[var(--color-primary)] border-[var(--color-primary)]/50">
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

            {/* Conteúdo Perfil */}
            <section className="Conteúdo-Perfil flex-1 space-y-8 w-full">
               
               <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 md:p-8 shadow-sm">
                 <div className="flex items-center gap-3 mb-8 pb-4 border-b border-[var(--border)]">
                   <User className="text-[var(--color-primary)]" size={28} />
                   <h1 className="text-2xl font-black">Dados Pessoais</h1>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5" htmlFor="name">Nome Completo</label>
                      <input
                        id="name"
                        type="text"
                        defaultValue={user?.name}
                        className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-all font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5" htmlFor="email">E-mail</label>
                      <input
                        id="email"
                        type="email"
                        defaultValue={user?.email}
                        className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-all font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5" htmlFor="cpf">CPF</label>
                      <input
                        id="cpf"
                        type="text"
                        placeholder="000.000.000-00"
                        className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-all font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5" htmlFor="phone">Telefone</label>
                      <input
                        id="phone"
                        type="text"
                        placeholder="(00) 00000-0000"
                        className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-all font-medium"
                      />
                    </div>
                    <div className="col-span-1 sm:col-span-2 pt-4">
                       <Button className="gap-2 px-8">
                         <Save size={18} /> Salvar Alterações
                       </Button>
                    </div>
                 </div>
               </div>

               {/* Endereços Salvos */}
               <div className="Seção-Endereços bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 md:p-8 shadow-sm">
                 <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border)]">
                    <div className="flex items-center gap-3">
                      <MapPin className="text-[var(--color-primary)]" size={28} />
                      <h2 className="text-xl font-black">Endereços Salvos</h2>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Endereço 1 */}
                    <div className="border border-[var(--border)] rounded-xl p-4 relative overflow-hidden group">
                       <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-primary)]"></div>
                       <h3 className="font-bold flex items-center gap-2 mb-1">
                          Casa <span className="bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs px-2 py-0.5 rounded-full">Padrão</span>
                       </h3>
                       <p className="text-sm text-[var(--muted)]">Rua Exemplo de Teste, 123</p>
                       <p className="text-sm text-[var(--muted)]">Apto 45 - São Paulo, SP</p>
                       <p className="text-sm text-[var(--muted)]">01001-000</p>
                    </div>

                    <button className="border-2 border-dashed border-[var(--border)] rounded-xl p-4 flex flex-col items-center justify-center text-[var(--muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-light)]/50 transition-all h-full min-h-[120px]">
                       <MapPin size={24} className="mb-2" />
                       <span className="font-bold text-sm">Adicionar Novo Endereço</span>
                    </button>
                 </div>
               </div>

            </section>

          </div>
        </main>
      </PublicLayout>
    </div>
  );
}
