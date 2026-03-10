"use client";

import { useState } from "react";
import { ArrowLeft, MapPin, CreditCard, User, CheckCircle, ChevronRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";

type CheckoutStep = "identification" | "shipping" | "payment" | "success";

export default function CheckoutPage() {
  const [step, setStep] = useState<CheckoutStep>("identification");

  // Mocks globais para a UI
  const subtotal = 120.90;
  const shipping = 15.00;
  const total = subtotal + shipping;

  const renderIdentification = () => (
    <div className="Seção-Identificação animate-in fade-in space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
         <User className="text-[var(--color-primary)]" />
         Identificação
      </h2>
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
        <p className="text-sm text-[var(--muted)]">
          Como este é um ambiente de demonstração, preencha os dados fictícios abaixo.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div>
             <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5" htmlFor="name">Nome Completo</label>
             <input
               id="name"
               type="text"
               defaultValue="João da Silva"
               className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-all font-medium"
             />
           </div>
           <div>
             <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5" htmlFor="email">E-mail</label>
             <input
               id="email"
               type="email"
               defaultValue="joao@exemplo.com"
               className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-all font-medium"
             />
           </div>
           <div>
             <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5" htmlFor="cpf">CPF</label>
             <input
               id="cpf"
               type="text"
               defaultValue="000.000.000-00"
               className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-all font-medium"
             />
           </div>
           <div>
             <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5" htmlFor="phone">Telefone</label>
             <input
               id="phone"
               type="text"
               defaultValue="(11) 99999-9999"
               className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-all font-medium"
             />
           </div>
        </div>
        <div className="pt-4 flex justify-end border-t border-[var(--border)] mt-4">
           <Button onClick={() => setStep("shipping")} className="gap-2">
              Continuar para Entrega <ChevronRight size={16} />
           </Button>
        </div>
      </div>
    </div>
  );

  const renderShipping = () => (
    <div className="Seção-Entrega animate-in fade-in space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
         <MapPin className="text-[var(--color-primary)]" />
         Endereço de Entrega
      </h2>
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="md:col-span-1">
             <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5" htmlFor="cep">CEP</label>
             <input
               id="cep"
               type="text"
               defaultValue="01001-000"
               className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-all font-medium"
             />
           </div>
           <div className="md:col-span-2">
             <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5" htmlFor="address">Rua / Avenida</label>
             <input
               id="address"
               type="text"
               defaultValue="Praça da Sé"
               className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-all font-medium"
             />
           </div>
           <div>
             <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5" htmlFor="num">Número</label>
             <input
               id="num"
               type="text"
               defaultValue="123"
               className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-all font-medium"
             />
           </div>
           <div className="md:col-span-2">
             <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5" htmlFor="comp">Complemento (Opcional)</label>
             <input
               id="comp"
               type="text"
               placeholder="Apto, Bloco, etc."
               className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-all font-medium"
             />
           </div>
        </div>

        {/* Shipping Options */}
        <div className="mt-6 space-y-3">
           <label className="flex items-center justify-between p-4 bg-[var(--background)] border-2 border-[var(--color-primary)] rounded-xl cursor-pointer">
              <div className="flex items-center gap-3">
                 <input type="radio" name="shippingMethod" defaultChecked className="h-4 w-4 text-[var(--color-primary)]" />
                 <div>
                    <span className="block font-bold">Entrega Econômica</span>
                    <span className="text-xs text-[var(--muted)]">Até 3 dias úteis</span>
                 </div>
              </div>
              <span className="font-bold text-[var(--color-primary)]">R$ 15,00</span>
           </label>
           <label className="flex items-center justify-between p-4 bg-[var(--background)] border border-[var(--border)] rounded-xl cursor-pointer hover:border-[var(--color-primary)]/50 transition-colors">
              <div className="flex items-center gap-3">
                 <input type="radio" name="shippingMethod" className="h-4 w-4" />
                 <div>
                    <span className="block font-bold text-[var(--foreground)]">Entrega Expressa</span>
                    <span className="text-xs text-[var(--muted)]">Até 1 dia útil</span>
                 </div>
              </div>
              <span className="font-bold text-[var(--foreground)]">R$ 35,00</span>
           </label>
        </div>

        <div className="pt-4 flex justify-between border-t border-[var(--border)] mt-4">
           <Button variant="ghost" onClick={() => setStep("identification")}>Voltar</Button>
           <Button onClick={() => setStep("payment")} className="gap-2">
              Ir para Pagamento <ChevronRight size={16} />
           </Button>
        </div>
      </div>
    </div>
  );

  const renderPayment = () => (
    <div className="Seção-Pagamento animate-in fade-in space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
         <CreditCard className="text-[var(--color-primary)]" />
         Pagamento
      </h2>
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 space-y-6">
        
        {/* Payment Methods */}
        <div className="flex flex-col sm:flex-row gap-3">
           <label className="flex-1 flex flex-col items-center justify-center p-4 bg-[var(--color-primary-light)] border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-xl cursor-pointer text-center">
              <input type="radio" name="paymentMethod" className="sr-only" defaultChecked />
              <CreditCard size={24} className="mb-2" />
              <span className="font-bold text-sm">Cartão de Crédito</span>
           </label>
           <label className="flex-1 flex flex-col items-center justify-center p-4 bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--color-primary)]/50 rounded-xl cursor-pointer text-center transition-colors">
              <input type="radio" name="paymentMethod" className="sr-only" />
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-2" viewBox="0 0 512 512"><path fill="currentColor" d="M381.7 45.3L256 18.2L130.3 45.3v137.4h251.4zm0 188H130.3v278L256 538l125.7-27.2zm48 152.1V151H469v234.3zM43 151h39.3v234.3H43zM346.5 259.6h-58l-30 63.8l-30-63.8h-58l62.5 133h51z"/></svg>
              <span className="font-bold text-sm">Pix</span>
           </label>
        </div>

        {/* Credit Card Form Mock */}
        <div className="grid grid-cols-2 gap-4">
           <div className="col-span-2">
             <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5" htmlFor="cc-name">Nome no Cartão</label>
             <input
               id="cc-name"
               type="text"
               placeholder="JOAO DA SILVA"
               className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-all font-medium uppercase"
             />
           </div>
           <div className="col-span-2">
             <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5" htmlFor="cc-num">Número do Cartão</label>
             <input
               id="cc-num"
               type="text"
               placeholder="0000 0000 0000 0000"
               className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-all font-medium tracking-widest"
             />
           </div>
           <div>
             <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5" htmlFor="cc-val">Validade</label>
             <input
               id="cc-val"
               type="text"
               placeholder="MM/AA"
               className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-all font-medium"
             />
           </div>
           <div>
             <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5" htmlFor="cc-cvv">CVV</label>
             <input
               id="cc-cvv"
               type="text"
               placeholder="123"
               className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-all font-medium"
             />
           </div>
        </div>

        <div className="pt-4 flex justify-between border-t border-[var(--border)] mt-4">
           <Button variant="ghost" onClick={() => setStep("shipping")}>Voltar</Button>
           <Button onClick={() => setStep("success")} className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white border-0">
              <CheckCircle size={18} /> Finalizar Compra
           </Button>
        </div>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="Seção-Sucesso animate-in fade-in zoom-in-95 duration-500 max-w-lg mx-auto text-center py-12">
       <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={48} />
       </div>
       <h2 className="text-3xl font-black mb-4">Pedido Confirmado!</h2>
       <p className="text-[var(--muted)] mb-8">
          Seu pedido <strong>#MT21-8849</strong> foi realizado com sucesso. <br/>
          Você receberá um e-mail com os detalhes da compra.
       </p>
       <Link href="/area-do-cliente/pedidos">
          <Button className="w-full max-w-xs mx-auto text-base h-12">Acompanhar Pedido</Button>
       </Link>
    </div>
  );

  return (
    <div className="Página-Checkout min-h-screen bg-[var(--background)] pt-8 pb-24">
       <div className="max-w-6xl mx-auto px-4">
         
         <div className="Cabeçalho-Checkout mb-8 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
               <ArrowLeft size={20} /> Continuar Comprando
            </Link>
            <h1 className="text-xl font-black text-[var(--color-primary)] tracking-tight uppercase">
               Meta21
            </h1>
         </div>

         {step !== "success" ? (
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
               
               {/* Left Column (Forms) */}
               <div className="lg:col-span-2 space-y-6">
                  {/* Progress Line */}
                  <div className="flex items-center gap-2 text-sm font-bold mb-8">
                     <span className={`px-3 py-1 rounded-full ${step === "identification" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)]"}`}>1. Identificação</span>
                     <div className="flex-1 h-px bg-[var(--border)]"></div>
                     <span className={`px-3 py-1 rounded-full ${step === "shipping" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)]"}`}>2. Entrega</span>
                     <div className="flex-1 h-px bg-[var(--border)]"></div>
                     <span className={`px-3 py-1 rounded-full ${step === "payment" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)]"}`}>3. Pagamento</span>
                  </div>

                  {step === "identification" && renderIdentification()}
                  {step === "shipping" && renderShipping()}
                  {step === "payment" && renderPayment()}
               </div>

               {/* Right Column (Summary) */}
               <div className="Seção-Resumo lg:col-span-1 bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 sticky top-24">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-6 border-b border-[var(--border)] pb-4">
                     <ShoppingBag size={20} className="text-[var(--color-primary)]" /> Resumo do Pedido
                  </h3>
                  
                  {/* Mock Cart Items */}
                  <div className="space-y-4 mb-6">
                     <div className="flex gap-3">
                        <div className="w-16 h-16 bg-[var(--background)] rounded bg-cover bg-center border border-[var(--border)] flex-shrink-0" style={{ backgroundImage: "url('https://picsum.photos/seed/10/200/200')" }}></div>
                        <div className="flex-1 text-sm">
                           <h4 className="font-bold line-clamp-2">Picanha Fatiada Premium</h4>
                           <div className="text-[var(--muted)]">Qtd: 1</div>
                           <div className="font-bold text-[var(--color-primary)] mt-1">R$ 89,90</div>
                        </div>
                     </div>
                     <div className="flex gap-3">
                        <div className="w-16 h-16 bg-[var(--background)] rounded bg-cover bg-center border border-[var(--border)] flex-shrink-0" style={{ backgroundImage: "url('https://picsum.photos/seed/22/200/200')" }}></div>
                        <div className="flex-1 text-sm">
                           <h4 className="font-bold line-clamp-2">Cerveja Artesanal IPA</h4>
                           <div className="text-[var(--muted)]">Qtd: 2</div>
                           <div className="font-bold text-[var(--color-primary)] mt-1">R$ 31,00</div>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-3 text-sm border-t border-[var(--border)] pt-4">
                     <div className="flex justify-between text-[var(--muted)]">
                        <span>Subtotal (3 itens)</span>
                        <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                     </div>
                     <div className="flex justify-between text-[var(--muted)]">
                        <span>Frete</span>
                        <span>R$ {shipping.toFixed(2).replace('.', ',')}</span>
                     </div>
                     <div className="flex justify-between text-[var(--muted)]">
                        <span>Descontos</span>
                        <span className="text-emerald-500">- R$ 0,00</span>
                     </div>
                     <div className="flex justify-between font-black text-lg pt-2 border-t border-[var(--border)] !mt-4 text-[var(--foreground)]">
                        <span>Total</span>
                        <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                     </div>
                  </div>
               </div>

             </div>
         ) : (
             renderSuccess()
         )}
         
       </div>
    </div>
  );
}
