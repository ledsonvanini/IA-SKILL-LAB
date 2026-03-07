# Módulo: E-commerce Simplificado

> Fase 2 — Carrinho de compras, conta do cliente e pedidos com finalização via WhatsApp.

## Responsabilidade

Funcionalidades de e-commerce simplificado: carrinho sidebar, lightbox de produto, conta do cliente (Minha Conta), histórico de pedidos e finalização via WhatsApp/balcão.

## Estrutura

```
ecommerce/
├── domain/
│   ├── entities/         → Cart, CartItem, Order, OrderItem, Customer
│   └── value-objects/    → OrderStatus, OrderNumber
├── application/
│   └── use-cases/        → AddToCart, RemoveFromCart, PlaceOrder, ListOrders, GetCustomer
├── infrastructure/
│   └── repositories/     → SupabaseCartRepository, SupabaseOrderRepository (futuro)
├── presentation/
│   └── components/       → CartSidebar, CartItem, OrderHistory, CustomerProfile, ProductLightbox
└── __tests__/            → Testes co-localizados por camada
```

## Dependências

- `products` — Carrinho referencia produtos do catálogo
- `auth` — Cliente precisa de conta para pedidos e histórico

```

