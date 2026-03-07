# Módulo: Promoções

> Módulo principal do MVP — gerenciamento completo de promoções para a rede de supermercados.

## Responsabilidade

CRUD de promoções com timeline, curtidas anônimas, filtros por unidade/período e integração com catálogo de produtos.

## Estrutura

```
promotions/
├── domain/
│   ├── entities/         → Promotion, PromotionLike
│   └── value-objects/    → PromotionStatus, DateRange
├── application/
│   └── use-cases/        → Create, Update, Archive, List, GetById
├── infrastructure/
│   └── repositories/     → SupabasePromotionRepository (futuro)
├── presentation/
│   └── components/       → PromotionCard, PromotionForm, PromotionTimeline
└── __tests__/            → Testes co-localizados por camada
```

## Dependências

- `products` — Promoção referencia um produto do catálogo
- `auth` — Apenas admin pode criar/editar promoções
```

