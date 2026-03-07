# Módulo: Analytics

> Dashboard de engajamento e métricas de promoções para o painel administrativo.

## Responsabilidade

KPIs de engajamento (curtidas, views, taxa de conversão), gráficos de tendência, ranking de promoções e exportação de relatórios.

## Estrutura

```
analytics/
├── domain/
│   └── entities/         → AnalyticsSnapshot, EngagementMetric
├── application/
│   └── use-cases/        → GetDashboardData, GetTopProducts, ExportReport
├── infrastructure/
│   └── repositories/     → SupabaseAnalyticsRepository (futuro)
├── presentation/
│   └── components/       → KpiCard, EngagementChart, TopProductsTable
└── __tests__/            → Testes co-localizados por camada
```

## Dependências

- `promotions` — Métricas baseadas em curtidas e visualizações de promoções
- `products` — Ranking de produtos mais promovidos
```

