# Plano Arquitetural - Sistema de Gerenciamento de Promoções META21

## Metadados

```yaml
versão: 1.0.0
data_criação: 2026-03-06
última_atualização: 2026-03-09
status: Em Revisão
arquiteto: Equipe META21
stack_principal: Next.js 14 + Supabase + Tailwind CSS + React Hook Form + Zod
padrão_arquitetural: Clean Architecture + Modular Monolith + React Compound Components
visão_futura: White-label SaaS B2B + Progressive Web App (PWA)
```

## Sumário Executivo

Sistema modular de gerenciamento de promoções para rede de supermercados com 3 unidades, seguindo Clean Architecture para garantir manutenibilidade, testabilidade e escalabilidade. Foco em operação simplificada por agência de publicidade e analytics de engajamento de clientes.

**Decisões arquiteturais principais:**

- Vertical Slice Architecture para isolamento de módulos
- Hexagonal Architecture (Ports & Adapters) para desacoplamento de infraestrutura

### 📅 Importante: Timeline de Promoções (não é um calendário literal)

**Conceito:**  
O sistema gerencia promoções através de **períodos de validade** (data DE → data ATÉ), não é um calendário tradicional tipo Google Calendar com grid de dias.

**Visualizações por perfil:**

| Perfil | Visualização | Objetivo |
|--------|--------------|----------|
| **Admin/Gerente** | Timeline com histórico granular | Filtrar por ano/mês específico para auditoria, evidência jurídica e análise de campanhas passadas |
| **Cliente Final** | Lista de promoções ATIVAS | Ver apenas ofertas vigentes (válidas hoje), sem histórico ou navegação por datas |

**Componentes:**

- `PromotionTimeline.tsx`: Exibe promoções em ordem cronológica com agrupamento por período
- `PromotionHistoryFilter.tsx`: Filtros de período (ano/mês) exclusivos para admin
- `ActivePromotionsGrid.tsx`: Landing page pública mostrando apenas promoções onde `validFrom <= hoje <= validUntil`

## 1. Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                        │
│  ┌────────────────┐  ┌────────────────┐  ┌──────────────────┐  │
│  │   Next.js App  │  │  Admin UI      │  │  Public Landing  │  │
│  │   Router       │  │  (Timeline)    │  │  (Link único)    │  │
│  └────────────────┘  └────────────────┘  └──────────────────┘  │
└───────────────────────────────┬─────────────────────────────────┘
                                │
┌───────────────────────────────▼─────────────────────────────────┐
│                       APPLICATION LAYER                          │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Use Cases (Business Logic)                   │   │
│  │  • CreatePromotionUseCase                                │   │
│  │  • ListPromotionsUseCase                                 │   │
│  │  • RegisterLikeUseCase                                   │   │
│  │  • GenerateAnalyticsUseCase                              │   │
│  └──────────────────────────────────────────────────────────┘   │
└───────────────────────────────┬─────────────────────────────────┘
                                │
┌───────────────────────────────▼─────────────────────────────────┐
│                         DOMAIN LAYER                             │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │         Core Business Entities (Zero Dependencies)        │   │
│  │  • Promotion (Entity)                                    │   │
│  │  • Product (Value Object)                                │   │
│  │  • DateRange (Value Object)                             │   │
│  │  • EngagementMetrics (Entity)                           │   │
│  └──────────────────────────────────────────────────────────┘   │
└───────────────────────────────┬─────────────────────────────────┘
                                │
┌───────────────────────────────▼─────────────────────────────────┐
│                     INFRASTRUCTURE LAYER                         │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────┐     │
│  │  Supabase    │  │  Vercel      │  │  External APIs    │     │
│  │  Adapter     │  │  Blob Store  │  │  (Future: ERP)    │     │
│  └──────────────┘  └──────────────┘  └───────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Estrutura de Módulos (Vertical Slices)

```
src/
├── modules/
│   ├── promotions/                    # Módulo de Promoções
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   ├── Promotion.ts       # Entity principal
│   │   │   │   └── Product.ts         # Value Object
│   │   │   ├── value-objects/
│  PromotionTimeline.tsx               │
│  (Nova promoção visível na timeline) │
│   │   │   │   └── PromotionStatus.ts
│   │   │   └── repositories/
│   │   │       └── IPromotionRepository.ts  # Interface (Port)
│   │   ├── application/
│   │   │   ├── use-cases/
│   │   │   │   ├── CreatePromotionUseCase.ts
│   │   │   │   ├── UpdatePromotionUseCase.ts
│   │   │   │   ├── ListPromotionsUseCase.ts
│   │   │   │   ├── PublishPromotionUseCase.ts
│   │   │   │   └── ArchivePromotionUseCase.ts
│   │   │   ├── dtos/
│   │   │   │   ├── CreatePromotionDTO.ts
│   │   │   │   └── PromotionResponseDTO.ts
│   │   │   └── services/
│   │   │       └── PromotionValidationService.ts
│   │   │
│   │   ├── infrastructure/
│   │   │   ├── repositories/
│   │   │   │   └── SupabasePromotionRepository.ts  # Adapter
│   │   │   ├── storage/
│   │   │   │   ├── SupabaseImageStorage.ts
│   │   │   │   └── ImageCompressor.ts
│   │   │   └── events/
│   │   │       └── PromotionEventPublisher.ts
│   │   │
│   │   └── presentation/
│   │       ├── components/
│   │       │   ├── PromotionForm.tsx
│   │       │   ├── PromotionCard.tsx
│   │       │   ├── PromotionTimeline.tsx
│   │       │   └── PromotionHistoryFilter.tsx
│   │       ├── hooks/
│   │       │   ├── useCreatePromotion.ts
│   │       │   └── usePromotionList.ts
│   │       └── api/
│   │           └── promotion-routes.ts
│   │
│   ├── analytics/                     # Módulo de Analytics
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   ├── Like.ts
│   │   │   │   ├── View.ts
│   │   │   │   └── EngagementReport.ts
│   │   │   └── repositories/
│   │   │       └── IAnalyticsRepository.ts
│   │   │
│   │   ├── application/
│   │   │   ├── use-cases/
│   │   │   │   ├── RegisterLikeUseCase.ts
│   │   │   │   ├── RegisterViewUseCase.ts
│   │   │   │   ├── GenerateReportUseCase.ts
│   │   │   │   └── GetTopPromotionsUseCase.ts
│   │   │   └── services/
│   │   │       └── EngagementCalculator.ts
│   │   │
│   │   ├── infrastructure/
│   │   │   ├── repositories/
│   │   │   │   └── SupabaseAnalyticsRepository.ts
│   │   │   └── aggregations/
│   │   │       └── DailyEngagementAggregator.ts
│   │   │
│   │   └── presentation/
│   │       ├── components/
│   │       │   ├── EngagementDashboard.tsx
│   │       │   ├── TopPromotionsChart.tsx
│   │       │   └── LikeButton.tsx
│   │       └── hooks/
│   │           └── useEngagementMetrics.ts
│   │
│   ├── auth/                          # Módulo de Autenticação
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   ├── User.ts
│   │   │   │   └── Session.ts
│   │   │   └── repositories/
│   │   │       └── IAuthRepository.ts
│   │   │
│   │   ├── application/
│   │   │   ├── use-cases/
│   │   │   │   ├── SignInWithGoogleUseCase.ts
│   │   │   │   ├── SignOutUseCase.ts
│   │   │   │   └── GetCurrentUserUseCase.ts
│   │   │   └── guards/
│   │   │       ├── AdminGuard.ts
│   │   │       └── ModeratorGuard.ts
│   │   │
│   │   ├── infrastructure/
│   │   │   └── repositories/
│   │   │       └── SupabaseAuthRepository.ts
│   │   │
│   │   └── presentation/
│   │       ├── components/
│   │       │   ├── SignInButton.tsx
│   │       │   └── UserMenu.tsx
│   │       └── middleware/
│   │           └── auth-middleware.ts
│   │
│   ├── products/                      # Módulo de Produtos (CRUD Completo)
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   └── CatalogProduct.ts
│   │   │   └── repositories/
│   │   │       └── IProductRepository.ts
│   │   │
│   │   ├── application/
│   │   │   └── use-cases/
│   │   │       ├── CreateProductUseCase.ts
│   │   │       ├── UpdateProductUseCase.ts
│   │   │       ├── ListProductsUseCase.ts
│   │   │       ├── AutoRegisterProductUseCase.ts
│   │   │       ├── ImportProductsCsvUseCase.ts
│   │   │       └── SearchProductUseCase.ts
│   │   │
│   │   ├── infrastructure/
│   │   │   └── repositories/
│   │   │       └── SupabaseProductRepository.ts
│   │   │
│   │   └── presentation/
│   │       └── components/
│   │           ├── ProductTable.tsx
│   │           ├── ProductForm.tsx
│   │           ├── ProductAutocomplete.tsx
│   │           └── ProductBadge.tsx
│   │
│   └── ecommerce/                     # Módulo de E-commerce Simplificado (Fase 2)
│       ├── domain/
│       │   ├── entities/
│       │   │   ├── Cart.ts
│       │   │   ├── CartItem.ts
│       │   │   ├── Order.ts
│       │   │   └── Customer.ts
│       │   ├── value-objects/
│       │   │   ├── OrderStatus.ts
│       │   │   └── CartTotal.ts
│       │   └── repositories/
│       │       ├── ICartRepository.ts
│       │       ├── IOrderRepository.ts
│       │       └── ICustomerRepository.ts
│       │
│       ├── application/
│       │   └── use-cases/
│       │       ├── AddToCartUseCase.ts
│       │       ├── RemoveFromCartUseCase.ts
│       │       ├── UpdateCartItemUseCase.ts
│       │       ├── CreateOrderFromCartUseCase.ts
│       │       ├── ListOrdersUseCase.ts
│       │       ├── ReplicateOrderUseCase.ts
│       │       └── GetCustomerProfileUseCase.ts
│       │
│       ├── infrastructure/
│       │   └── repositories/
│       │       ├── SupabaseCartRepository.ts
│       │       ├── SupabaseOrderRepository.ts
│       │       └── SupabaseCustomerRepository.ts
│       │
│       └── presentation/
│           ├── components/
│           │   ├── CartSidebar.tsx
│           │   ├── CartItem.tsx
│           │   ├── ProductLightbox.tsx
│           │   ├── OrderHistory.tsx
│           │   └── CustomerProfile.tsx
│           └── hooks/
│               ├── useCart.ts
│               └── useOrders.ts
│
├── shared/                            # Código compartilhado
│   ├── kernel/
│   │   ├── Result.ts                  # Result monad (Success/Failure)
│   │   ├── DomainEvent.ts
│   │   ├── Entity.ts                  # Base Entity class
│   │   └── ValueObject.ts             # Base VO class
│   │
│   ├── infrastructure/
│   │   ├── database/
│   │   │   ├── supabase-client.ts
│   │   │   └── migrations/
│   │   ├── storage/
│   │   │   └── storage-client.ts
│   │   ├── logger/
│   │   │   └── winston-logger.ts
│   │   └── cache/
│   │       └── redis-cache.ts (futuro)
│   │
│   └── presentation/
│       ├── components/
│       │   ├── ui/                    # Shadcn/ui components
│       │   └── layouts/
│       └── hooks/
│           └── useToast.ts
│
├── app/                               # Next.js App Router (Thin Layer)
│   ├── (public)/
│   │   ├── page.tsx                   # Home page pública
│   │   ├── ofertas/
│   │   │   └── page.tsx               # Landing page de ofertas
│   │   ├── promocoes/
│   │   │   └── [id]/page.tsx
│   │   └── produtos/
│   │       └── [slug]/page.tsx         # Detalhe produto (Fase 2)
│   │
│   ├── (customer)/                    # Área do cliente (Fase 2)
│   │   ├── minha-conta/
│   │   │   └── page.tsx               # Perfil + Endereços
│   │   └── pedidos/
│   │       └── page.tsx               # Histórico de pedidos
│   │
│   ├── (admin)/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── ui-config/                 # Configuração de Vitrine Pública
│   │   │   ├── hero/page.tsx          # Gerenciar slideshow
│   │   │   ├── destaques/page.tsx     # Gerenciar destaques por categoria
│   │   │   └── cupons/page.tsx        # Gerenciar cupons globais
│   │   ├── promocoes/
│   │   │   ├── page.tsx
│   │   │   ├── nova/page.tsx
│   │   │   └── [id]/editar/page.tsx
│   │   ├── produtos/
│   │   │   ├── page.tsx               # Catálogo admin
│   │   │   └── novo/page.tsx
│   │   ├── analytics/
│   │   │   └── page.tsx
│   │   └── pedidos/                   # Gestão de pedidos admin (Fase 2)
│   │       └── page.tsx
│   │
│   ├── api/
│   │   ├── promotions/
│   │   │   └── route.ts
│   │   ├── products/
│   │   │   └── route.ts
│   │   ├── analytics/
│   │   │   └── route.ts
│   │   ├── cart/                          # Fase 2
│   │   │   └── route.ts
│   │   ├── orders/                        # Fase 2
│   │   │   └── route.ts
│   │   └── webhooks/
│   │       └── supabase/route.ts
│   │
│   ├── layout.tsx
│   └── global-error.tsx
│
├── config/
│   ├── env.ts                         # Validação de env vars (zod)
│   └── constants.ts
│
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/
```

---

## 3. Design Patterns Implementados

### 3.1 Hexagonal Architecture (Ports & Adapters)

**Objetivo:** Desacoplar lógica de negócio da infraestrutura.

**Implementação:**

```typescript
// Port (Interface no Domain)
// src/modules/promotions/domain/repositories/IPromotionRepository.ts
export interface IPromotionRepository {
  create(promotion: Promotion): Promise<Result<Promotion>>;
  findById(id: string): Promise<Result<Promotion>>;
  findByDateRange(start: Date, end: Date): Promise<Result<Promotion[]>>;
  update(promotion: Promotion): Promise<Result<void>>;
  delete(id: string): Promise<Result<void>>;
}

// Adapter (Implementação na Infrastructure)
// src/modules/promotions/infrastructure/repositories/SupabasePromotionRepository.ts
export class SupabasePromotionRepository implements IPromotionRepository {
  constructor(private supabase: SupabaseClient) {}
  
  async create(promotion: Promotion): Promise<Result<Promotion>> {
    try {
      const { data, error } = await this.supabase
        .from('promotions')
        .insert(this.toDatabase(promotion))
        .select()
        .single();
      
      if (error) return Result.failure(error.message);
      return Result.success(this.toDomain(data));
    } catch (e) {
      return Result.failure(e.message);
    }
  }
  
  // ... outras implementações
}
```

**Benefício:** Trocar Supabase por Prisma/Drizzle requer apenas reescrever o adapter.

---

### 3.2 Repository Pattern

**Objetivo:** Abstrair persistência de dados.

**Características:**

- Repositories sempre retornam entidades de domínio
- Mapeamento bidirecional (domain ↔ database)
- Queries complexas encapsuladas

---

### 3.3 CQRS Lite

**Objetivo:** Separar comandos (write) de consultas (read).

**Commands:**

```typescript
// src/modules/promotions/application/use-cases/CreatePromotionUseCase.ts
export class CreatePromotionUseCase {
  constructor(
    private promotionRepo: IPromotionRepository,
    private eventBus: IEventBus
  ) {}
  
  async execute(dto: CreatePromotionDTO): Promise<Result<Promotion>> {
    // Validação
    const validation = this.validate(dto);
    if (validation.isFailure) return validation;
    
    // Criar entidade
    const promotion = Promotion.create({
      title: dto.title,
      product: Product.create(dto.productName),
      priceRange: PriceRange.create(dto.priceFrom, dto.priceTo),
      dateRange: DateRange.create(dto.validFrom, dto.validUntil),
    });
    
    // Persistir
    const result = await this.promotionRepo.create(promotion);
    
    // Publicar evento
    if (result.isSuccess) {
      await this.eventBus.publish(new PromotionCreatedEvent(promotion));
    }
    
    return result;
  }
}
```

**Queries (otimizadas):**

```typescript
// src/modules/promotions/application/use-cases/ListPromotionsUseCase.ts
export class ListPromotionsUseCase {
  constructor(private promotionRepo: IPromotionRepository) {}
  
  async execute(filter: PromotionFilter): Promise<Result<PromotionDTO[]>> {
    // Query otimizada com cache
    const promotions = await this.promotionRepo.findByDateRange(
      filter.startDate,
      filter.endDate
    );
    
    // Mapeamento para DTO (apenas campos necessários)
    return promotions.map(p => this.toDTO(p));
  }
}
```

---

### 3.4 Dependency Injection

**Objetivo:** Inversão de controle para testabilidade.

**Implementação (DI Container):**

```typescript
// src/shared/infrastructure/di/container.ts
import { Container } from 'inversify';

const container = new Container();

// Bindings
container.bind<IPromotionRepository>(TYPES.PromotionRepository)
  .to(SupabasePromotionRepository);

container.bind<CreatePromotionUseCase>(TYPES.CreatePromotionUseCase)
  .to(CreatePromotionUseCase);

export { container };
```

**Uso em API Routes:**

```typescript
// app/api/promotions/route.ts
import { container } from '@/shared/infrastructure/di/container';

export async function POST(request: Request) {
  const useCase = container.get<CreatePromotionUseCase>(
    TYPES.CreatePromotionUseCase
  );
  
  const dto = await request.json();
  const result = await useCase.execute(dto);
  
  if (result.isFailure) {
    return Response.json({ error: result.error }, { status: 400 });
  }
  
  return Response.json(result.value, { status: 201 });
}
```

---

### 3.5 Result Pattern (Railway Oriented Programming)

**Objetivo:** Tratar erros de forma explícita e funcional.

```typescript
// src/shared/kernel/Result.ts
export class Result<T> {
  private constructor(
    public readonly isSuccess: boolean,
    public readonly value?: T,
    public readonly error?: string
  ) {}
  
  static success<U>(value: U): Result<U> {
    return new Result(true, value);
  }
  
  static failure<U>(error: string): Result<U> {
    return new Result(false, undefined, error);
  }
  
  get isFailure(): boolean {
    return !this.isSuccess;
  }
}
```

**Uso:**

```typescript
const result = await useCase.execute(dto);

if (result.isFailure) {
  console.error(result.error);
  return;
}

console.log(result.value); // Type-safe
```

---

### 3.6 Strategy Pattern (Image Compression)

**Objetivo:** Trocar algoritmo de compressão sem alterar use case.

```typescript
// src/modules/promotions/domain/services/IImageCompressor.ts
export interface IImageCompressor {
  compress(file: File, quality: number): Promise<Blob>;
}

// Implementações
export class SharpCompressor implements IImageCompressor { /* ... */ }
export class BrowserAPICompressor implements IImageCompressor { /* ... */ }

// Uso no Use Case
export class CreatePromotionUseCase {
  constructor(
    private repo: IPromotionRepository,
    private compressor: IImageCompressor // Strategy injetada
  ) {}
}
```

---

### 3.7 Formulários e Validação (React Hook Form + Zod + Compound Components)

**Objetivo:** Garantir a performance de renderização em formulários complexos, manter forte tipagem ponta-a-ponta e promover o reuso de códigoUI limpo sem "prop drilling".

**Implementação:**
Combina-se o `React Hook Form` para o controle de estado não controlado (uncontrolled state) e o `Zod` para a validação do esquema e tipagem. Formulários gigantescos (como os de produto e promoções) são particionados em pedaços usando o **React Compound Component Pattern**.

```tsx
// Exemplo de FormRoot provendo contexto
export function ProductFormRoot({ children }: { children: ReactNode }) {
  const methods = useForm<ProductFormData>({
    resolver: zodResolver(productSchema)
  });
  return <FormProvider {...methods}><form>{children}</form></FormProvider>;
}

// Subcomponentes consumindo o form via context
export function ProductFormBasicInfo() {
  const { register } = useFormContext<ProductFormData>();
  return <Input {...register("name")} />;
}
```

**Benefício:** Códigos extremamente limpos, fáceis de dar manutenção. Em vez de arquivos monstruosos com +300 linhas, temos múltiplos componentes menores, altamente escaláveis. Eliminam-se milhares de renderizações desnecessárias.

---

## 4. Modelo de Dados (Supabase Schema)

```sql
-- Tabela de Promoções
CREATE TABLE promotions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Produto (cadastro incremental)
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name VARCHAR(255) NOT NULL, -- Desnormalizado para performance
  
  -- Preços
  price_from DECIMAL(10,2) NOT NULL,
  price_to DECIMAL(10,2) NOT NULL,
  discount_percentage DECIMAL(5,2) GENERATED ALWAYS AS 
    (((price_from - price_to) / price_from) * 100) STORED,
  
  -- Validade (CRÍTICO PARA JURÍDICO)
  valid_from TIMESTAMP WITH TIME ZONE NOT NULL,
  valid_until TIMESTAMP WITH TIME ZONE NOT NULL,
  
  -- Imagens (array de URLs no Supabase Storage)
  images JSONB NOT NULL DEFAULT '[]', -- [{url, alt, order}]
  
  -- Status
  status VARCHAR(20) NOT NULL DEFAULT 'draft',
    CHECK (status IN ('draft', 'published', 'archived', 'expired')),
  is_featured BOOLEAN DEFAULT false,
  
  -- Metadados de auditoria
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  published_at TIMESTAMP WITH TIME ZONE,
  published_by UUID REFERENCES auth.users(id),
  
  -- Unidade (multi-unit support)
  unit_id UUID REFERENCES units(id),
  
  -- Indexes
  CONSTRAINT valid_date_range CHECK (valid_until > valid_from)
);

CREATE INDEX idx_promotions_valid_range ON promotions (valid_from, valid_until);
CREATE INDEX idx_promotions_status ON promotions (status);
CREATE INDEX idx_promotions_unit ON promotions (unit_id);

-- Tabela de Produtos (Cadastro Incremental)
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  normalized_name VARCHAR(255) NOT NULL, -- Para busca fuzzy
  category VARCHAR(100),
  
  -- Metadados
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  times_used INTEGER DEFAULT 0, -- Contador de uso em promoções
  
  -- Full-text search
  search_vector TSVECTOR GENERATED ALWAYS AS
    (to_tsvector('portuguese', name)) STORED
);

CREATE INDEX idx_products_search ON products USING gin(search_vector);
CREATE INDEX idx_products_normalized ON products (normalized_name);

-- Tabela de Analytics (Likes)
CREATE TABLE promotion_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  promotion_id UUID NOT NULL REFERENCES promotions(id) ON DELETE CASCADE,
  
  -- Identificação (anônimo ou autenticado)
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id VARCHAR(255), -- Para visitantes anônimos
  ip_hash VARCHAR(64), -- Hash do IP (LGPD compliance)
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraint para evitar likes duplicados
  UNIQUE(promotion_id, user_id),
  UNIQUE(promotion_id, session_id)
);

CREATE INDEX idx_likes_promotion ON promotion_likes (promotion_id);
CREATE INDEX idx_likes_created_at ON promotion_likes (created_at);

-- Tabela de Views (Page Views)
CREATE TABLE promotion_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  promotion_id UUID NOT NULL REFERENCES promotions(id) ON DELETE CASCADE,
  
  session_id VARCHAR(255),
  user_agent TEXT,
  referrer TEXT,
  
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_views_promotion ON promotion_views (promotion_id);
CREATE INDEX idx_views_date ON promotion_views (viewed_at);

-- Tabela de Unidades
CREATE TABLE units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  neighborhood VARCHAR(255),
  address TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- View materializada para Analytics (atualização diária)
CREATE MATERIALIZED VIEW promotion_analytics AS
SELECT 
  p.id AS promotion_id,
  p.title,
  p.product_name,
  COUNT(DISTINCT l.id) AS total_likes,
  COUNT(DISTINCT v.id) AS total_views,
  ROUND(
    COUNT(DISTINCT l.id)::DECIMAL / NULLIF(COUNT(DISTINCT v.id), 0) * 100,
    2
  ) AS engagement_rate,
  DATE(p.created_at) AS promotion_date
FROM promotions p
LEFT JOIN promotion_likes l ON p.id = l.promotion_id
LEFT JOIN promotion_views v ON p.id = v.promotion_id
GROUP BY p.id, p.title, p.product_name, p.created_at;

CREATE UNIQUE INDEX idx_analytics_promotion ON promotion_analytics (promotion_id);

-- Função para refresh automático (cron job)
CREATE OR REPLACE FUNCTION refresh_analytics()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY promotion_analytics;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TABELAS FASE 2: E-COMMERCE SIMPLIFICADO
-- ============================================

-- Tabela de Clientes
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  avatar_url TEXT,
  
  -- Endereço (simplificado)
  address_street TEXT,
  address_city VARCHAR(100),
  address_state VARCHAR(2),
  address_zip VARCHAR(10),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_customers_user ON customers (user_id);
CREATE INDEX idx_customers_email ON customers (email);

-- Tabela de Carrinhos
CREATE TABLE carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Identificação (anônimo ou logado)
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  session_id VARCHAR(255),
  
  status VARCHAR(20) NOT NULL DEFAULT 'active',
    CHECK (status IN ('active', 'abandoned', 'converted')),
  
  coupon_code VARCHAR(50),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT cart_owner CHECK (
    customer_id IS NOT NULL OR session_id IS NOT NULL
  )
);

CREATE INDEX idx_carts_customer ON carts (customer_id);
CREATE INDEX idx_carts_session ON carts (session_id);

-- Tabela de Itens do Carrinho
CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0 AND quantity <= 99),
  unit_price DECIMAL(10,2) NOT NULL,
  
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_cart_items_cart ON cart_items (cart_id);
CREATE UNIQUE INDEX idx_cart_items_unique ON cart_items (cart_id, product_id);

-- Tabela de Pedidos
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(20) NOT NULL UNIQUE, -- ex: #MT-8742
  
  customer_id UUID NOT NULL REFERENCES customers(id),
  unit_id UUID REFERENCES units(id),
  
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
    CHECK (status IN ('pending', 'confirmed', 'in_transit', 'delivered', 'cancelled')),
  
  subtotal DECIMAL(10,2) NOT NULL,
  discount DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  
  coupon_code VARCHAR(50),
  notes TEXT,
  
  -- Via WhatsApp
  whatsapp_sent BOOLEAN DEFAULT false,
  whatsapp_sent_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  delivered_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_orders_customer ON orders (customer_id);
CREATE INDEX idx_orders_status ON orders (status);
CREATE INDEX idx_orders_created ON orders (created_at);
CREATE INDEX idx_orders_number ON orders (order_number);

-- Tabela de Itens do Pedido
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  
  product_name VARCHAR(255) NOT NULL, -- Desnormalizado (snapshot do momento)
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) GENERATED ALWAYS AS (quantity * unit_price) STORED
);

CREATE INDEX idx_order_items_order ON order_items (order_id);
```

---

## 5. Fluxo de Dados (Sequência de Criação de Promoção)

```
┌─────────┐
│ Agência │
└────┬────┘
     │ 1. Preenche formulário (UI)
     ▼
┌──────────────────────────────────────┐
│  PromotionForm.tsx                   │
│  (Presentation Layer)                │
└────┬─────────────────────────────────┘
     │ 2. Chama hook useCreatePromotion
     ▼
┌──────────────────────────────────────┐
│  useCreatePromotion.ts               │
│  (Client-side Hook)                  │
└────┬─────────────────────────────────┘
     │ 3. POST /api/promotions
     ▼
┌──────────────────────────────────────┐
│  /app/api/promotions/route.ts        │
│  (API Route - Thin Layer)            │
└────┬─────────────────────────────────┘
     │ 4. Resolve CreatePromotionUseCase via DI
     ▼
┌──────────────────────────────────────┐
│  CreatePromotionUseCase              │
│  (Application Layer)                 │
│  • Valida DTO                        │
│  • Cria entidade Promotion           │
│  • Auto-registra Product             │
└────┬─────────────────────────────────┘
     │ 5. Persiste via Repository
     ▼
┌──────────────────────────────────────┐
│  SupabasePromotionRepository         │
│  (Infrastructure - Adapter)          │
│  • Mapeia entidade → SQL             │
│  • Insere no banco                   │
└────┬─────────────────────────────────┘
     │ 6. Retorna Result<Promotion>
     ▼
┌──────────────────────────────────────┐
│  CreatePromotionUseCase              │
│  • Comprime imagens (Strategy)       │
│  • Upload no Supabase Storage        │
│  • Publica evento (Event Bus)        │
└────┬─────────────────────────────────┘
     │ 7. Retorna sucesso
     ▼
┌──────────────────────────────────────┐
│  API Response (201 Created)          │
│  { promotion: {...}, imageUrls: [...] }│
└────┬─────────────────────────────────┘
     │ 8. UI atualiza (optimistic update)
     ▼
┌──────────────────────────────────────┐
│  PromotionCalendar.tsx               │
│  (Nova promoção visível)             │
└──────────────────────────────────────┘
```

---

## 6. Estratégia de Testes

### 6.1 Pirâmide de Testes

```
           ╱  ╲
          ╱    ╲
         ╱ E2E  ╲          5% (Criação completa de promoção)
        ╱────────╲
       ╱          ╲
      ╱Integration ╲       25% (Use cases + Repository)
     ╱──────────────╲
    ╱                ╲
   ╱      Unit        ╲    70% (Domain entities, Value Objects)
  ╱────────────────────╲
```

### 6.2 Unit Tests (Domain Layer)

**Exemplo:**

```typescript
// tests/unit/modules/promotions/domain/entities/Promotion.spec.ts
describe('Promotion Entity', () => {
  it('should create valid promotion', () => {
    const promotion = Promotion.create({
      title: 'Oferta Especial',
      product: Product.create('Arroz 5kg'),
      priceRange: PriceRange.create(25.90, 19.90),
      dateRange: DateRange.create(
        new Date('2026-03-10'),
        new Date('2026-03-17')
      ),
    });
    
    expect(promotion.isValid).toBe(true);
    expect(promotion.discountPercentage).toBeCloseTo(23.17);
  });
  
  it('should fail if invalid date range', () => {
    const result = DateRange.create(
      new Date('2026-03-17'),
      new Date('2026-03-10') // Fim antes do início
    );
    
    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('Data final deve ser posterior');
  });
});
```

### 6.3 Integration Tests (Use Cases)

```typescript
// tests/integration/modules/promotions/application/CreatePromotionUseCase.spec.ts
describe('CreatePromotionUseCase', () => {
  let useCase: CreatePromotionUseCase;
  let mockRepo: IPromotionRepository;
  
  beforeEach(() => {
    mockRepo = {
      create: jest.fn(),
      findById: jest.fn(),
      // ... outros métodos
    };
    
    useCase = new CreatePromotionUseCase(mockRepo, mockEventBus);
  });
  
  it('should create promotion and auto-register product', async () => {
    const dto = {
      title: 'Promoção Teste',
      productName: 'Produto Novo',
      priceFrom: 50,
      priceTo: 35,
      validFrom: '2026-03-15',
      validUntil: '2026-03-20',
    };
    
    mockRepo.create.mockResolvedValue(Result.success(mockPromotion));
    
    const result = await useCase.execute(dto);
    
    expect(result.isSuccess).toBe(true);
    expect(mockRepo.create).toHaveBeenCalledTimes(1);
    expect(mockEventBus.publish).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'PromotionCreated' })
    );
  });
});
```

### 6.4 E2E Tests (Playwright)

```typescript
// tests/e2e/promotions/create-promotion.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Criar Promoção', () => {
  test('deve criar promoção com sucesso', async ({ page }) => {
    await page.goto('/admin/promocoes/nova');
    
    // Preencher formulário
    await page.fill('[name="title"]', 'Oferta E2E');
    await page.fill('[name="productName"]', 'Produto Teste');
    await page.fill('[name="priceFrom"]', '100');
    await page.fill('[name="priceTo"]', '75');
    
    // Upload de imagem
    await page.setInputFiles('[name="images"]', 'tests/fixtures/product.jpg');
    
    // Definir validade
    await page.fill('[name="validFrom"]', '2026-04-01');
    await page.fill('[name="validUntil"]', '2026-04-07');
    
    // Submeter
    await page.click('button[type="submit"]');
    
    // Verificar redirecionamento
    await expect(page).toHaveURL(/\/admin\/promocoes\/\w+/);
    
    // Verificar toast de sucesso
    await expect(page.locator('[role="alert"]')).toContainText(
      'Promoção criada com sucesso'
    );
  });
});
```

---

## 7. Deployment & CI/CD

### 7.1 Pipeline GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Type check
        run: npm run type-check
      
      - name: Unit tests
        run: npm run test:unit
      
      - name: Integration tests
        run: npm run test:integration
      
      - name: E2E tests
        run: npm run test:e2e
  
  deploy-preview:
    needs: test
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
  
  deploy-production:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### 7.2 Environment Variables

```bash
# .env.local (development)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

NEXT_PUBLIC_APP_URL=http://localhost:3000

# Analytics
VERCEL_ANALYTICS_ID=xxx

# Feature Flags
FEATURE_FLAG_COMMENTS=false
FEATURE_FLAG_MULTI_UNIT=true
```

---

## 8. Performance & Observability

### 8.1 Caching Strategy

```typescript
// Edge caching para lista pública de promoções
export const revalidate = 300; // 5 minutos

// app/(public)/page.tsx
export default async function HomePage() {
  const promotions = await getActivePromotions();
  
  return <PromotionGrid promotions={promotions} />;
}
```

### 8.2 Monitoring

```typescript
// src/shared/infrastructure/observability/logger.ts
import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

// Uso em Use Cases
export class CreatePromotionUseCase {
  async execute(dto: CreatePromotionDTO) {
    logger.info('Creating promotion', { dto });
    
    try {
      const result = await this.repo.create(promotion);
      
      logger.info('Promotion created successfully', { 
        promotionId: result.value.id 
      });
      
      return result;
    } catch (error) {
      logger.error('Failed to create promotion', { error, dto });
      throw error;
    }
  }
}
```

### 8.3 Métricas de Sucesso

**KPIs Técnicos:**

- Time to First Byte (TTFB): < 600ms
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1
- Uptime: 99.9%

**KPIs de Negócio:**

- Tempo médio de criação de promoção: < 3 minutos
- Taxa de erro em uploads: < 1%
- Engagement rate (likes/views): baseline → tracking

---

## 9. Roadmap de Evolução

### Fase 1: MVP — Promoções & Analytics (Sprints 1-5)

- 🔐 Autenticação Google OAuth
- 📦 CRUD de Promoções (criar, editar, arquivar, listar)
- 🖼️ Upload e compressão de imagens
- 📋 Catálogo de Produtos admin (CRUD completo)
- 📅 Timeline de promoções com histórico por período
- 🏠 Home Page pública + Landing de Ofertas
- ❤️ Curtidas anônimas com contadores em tempo real
- 📊 Dashboard de Analytics (engagement, top produtos)
- 🏪 Multi-unidade (filtros por loja)

### Fase 2: E-commerce Simplificado (Sprints 6-8)

- 🔍 Detalhes do Produto (lightbox/modal)
- 🛒 Carrinho de compras (sidebar)
- 👤 Conta do Cliente (Minha Conta)
- 📝 Histórico de Pedidos
- 📩 Finalização via WhatsApp
- 🎟️ Sistema de cupons de desconto

### Fase 3: Otimização & Engajamento (Mês 5-6)

- 💬 Sistema de Comentários Moderados
- 🔍 Busca full-text de produtos
- 🎨 Editor visual de banners
- 📱 PWA (Progressive Web App)
- 📧 Relatórios semanais por email

### Fase 4: Escala (Mês 7+)

- 🏪 Multi-tenant (outras redes)
- 🔔 Notificações push
- 🤖 Sugestões automáticas de promoções (IA)
- 💳 Integração com pagamento online (Mercado Pago/Stripe)
- 🚚 Integração ERP/PDV

---

## 10. Referências de Implementação

**Repositórios Exemplo:**

- [Clean Architecture TS](https://github.com/stemmlerjs/ddd-forum)
- [Modular Monolith](https://github.com/kgrzybek/modular-monolith-with-ddd)
- [Next.js Commerce](https://github.com/vercel/commerce)

**Documentação Oficial:**

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Storage](https://supabase.com/docs/guides/storage)

---

## Apêndice A: Glossário

- **Entity:** Objeto com identidade única (ex: Promotion).
- **Value Object:** Objeto definido por seus atributos (ex: Price).
- **Use Case:** Fluxo de negócio isolado (ex: CreatePromotionUseCase).
- **Repository:** Abstração de persistência.
- **Adapter:** Implementação concreta de uma interface (port).
- **DTO:** Data Transfer Object (objeto de transporte de dados).

---

**Fim do Documento de Arquitetura v1.0.0**
