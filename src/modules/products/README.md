# Módulo: Produtos

> Catálogo CRUD completo de produtos do supermercado. Suporta cadastro incremental e importação via CSV.

## Responsabilidade

Gerenciamento de produtos com listagem, filtros, busca fuzzy, auto-registro via promoção e importação em lote via CSV.

## Estrutura

```
products/
├── domain/
│   ├── entities/         → Product
│   └── value-objects/    → ProductStatus, SKU, Category
├── application/
│   └── use-cases/        → Create, Update, List, Search, ImportCsv, AutoRegister
├── infrastructure/
│   └── repositories/     → SupabaseProductRepository (futuro)
├── presentation/
│   └── components/       → ProductTable, ProductForm, ProductCard, CsvImporter
└── __tests__/            → Testes co-localizados por camada
```

## Dependências

- `auth` — Apenas admin pode gerenciar o catálogo
```

