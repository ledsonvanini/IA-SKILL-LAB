"use client";

import { X, Plus, Minus, Trash2, MessageCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { getProductById } from "@/mocks/data";
import { Button } from "@/components/ui";

export function CartSidebar() {
  const { items, totalItems, totalPrice, isOpen, closeCart, updateQuantity, removeItem, clearCart } =
    useCart();

  const formatBRL = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] transition-opacity"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          Carrinho-Sidebar fixed top-0 right-0 z-[70]
          h-full w-full max-w-md
          bg-[var(--surface)] border-l border-[var(--border)]
          flex flex-col
          transform transition-transform duration-[var(--duration-normal)] ease-[var(--ease-out-expo)]
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
        aria-label="Carrinho de compras"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
          <h3 className="text-lg font-bold">
            Carrinho{" "}
            <span className="text-sm font-normal text-[var(--muted)]">
              ({totalItems} {totalItems === 1 ? "item" : "itens"})
            </span>
          </h3>
          <button
            onClick={closeCart}
            className="p-1 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            aria-label="Fechar carrinho"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-[var(--muted)] gap-3">
              <span className="text-4xl">🛒</span>
              <p className="text-sm">Seu carrinho está vazio</p>
            </div>
          ) : (
            items.map((item) => {
              const product = getProductById(item.productId);
              if (!product) return null;
              return (
                <div
                  key={item.productId}
                  className="Item-Carrinho flex gap-3 p-3 rounded-lg border border-[var(--border)] bg-[var(--surface)]"
                >
                  <div className="w-16 h-16 rounded-lg bg-zinc-100 dark:bg-zinc-800 overflow-hidden flex-shrink-0">
                    <div className="w-full h-full bg-[var(--color-primary-light)] flex items-center justify-center text-[var(--color-primary)] text-xs font-bold">
                      {product.name.slice(0, 3)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{product.name}</p>
                    <p className="text-xs text-[var(--muted)]">{product.unit}</p>
                    <p className="text-sm font-bold text-[var(--color-primary)] mt-1">
                      {formatBRL(item.unitPrice)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-[var(--muted)] hover:text-[var(--color-danger)] transition-colors"
                      aria-label={`Remover ${product.name}`}
                    >
                      <Trash2 size={14} />
                    </button>
                    <div className="flex items-center gap-1 border border-[var(--border)] rounded-md">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        className="p-1 hover:bg-[var(--color-primary-light)] transition-colors rounded-l-md"
                        aria-label="Diminuir quantidade"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-2 text-xs font-bold min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        className="p-1 hover:bg-[var(--color-primary-light)] transition-colors rounded-r-md"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-[var(--border)] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--muted)]">Total</span>
              <span className="text-xl font-black text-[var(--color-primary)]">
                {formatBRL(totalPrice)}
              </span>
            </div>
            <Button variant="whatsapp" size="lg" className="w-full">
              <MessageCircle size={18} />
              Finalizar via WhatsApp
            </Button>
            <button
              onClick={clearCart}
              className="w-full text-xs text-[var(--muted)] hover:text-[var(--color-danger)] transition-colors"
            >
              Limpar carrinho
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
