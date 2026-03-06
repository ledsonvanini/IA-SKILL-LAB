# Referências Bibliográficas - Projeto META21

## Metadados
```yaml
versão: 1.0.0
data_criação: 2026-03-06
última_atualização: 2026-03-06
categorias:
  - Clean Architecture
  - Design Patterns
  - Next.js & React
  - Domain-Driven Design
  - Software Engineering Best Practices
```

---

## 1. Arquitetura de Software

### 1.1 Clean Architecture

**Martin, Robert C. (Uncle Bob) - Clean Architecture: A Craftsman's Guide to Software Structure and Design**
- 📚 Livro fundamental sobre Clean Architecture
- 🔗 [Site Oficial](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- 📝 Conceitos: Dependency Rule, Entity, Use Case, Interface Adapters
- 💡 Aplicação: Base teórica para toda estrutura de módulos do projeto

**Fowler, Martin - Patterns of Enterprise Application Architecture**
- 📚 Padrões de arquitetura empresarial
- 🔗 [Catalog](https://martinfowler.com/eaaCatalog/)
- 📝 Conceitos: Repository Pattern, Service Layer, Domain Model
- 💡 Aplicação: Estruturação de camadas e separação de responsabilidades

---

### 1.2 Hexagonal Architecture (Ports & Adapters)

**Cockburn, Alistair - Hexagonal Architecture**
- 📄 Artigo original (2005)
- 🔗 [Artigo Original](https://alistair.cockburn.us/hexagonal-architecture/)
- 📝 Conceitos: Ports (interfaces), Adapters (implementações), Testability
- 💡 Aplicação: Desacoplamento entre domínio e infraestrutura (Supabase)

**Netflix Tech Blog - Ready for changes with Hexagonal Architecture**
- 📄 Artigo técnico
- 🔗 [Medium](https://netflixtechblog.com/ready-for-changes-with-hexagonal-architecture-b315ec967749)
- 📝 Case study de implementação em escala
- 💡 Aplicação: Validação de patterns para sistema escalável

---

### 1.3 Modular Monolith

**Kamil Grzybek - Modular Monolith with DDD**
- 📦 Repositório GitHub
- 🔗 [GitHub](https://github.com/kgrzybek/modular-monolith-with-ddd)
- 📝 Conceitos: Vertical Slices, Module Independence, Bounded Contexts
- 💡 Aplicação: Estrutura de `/modules` do projeto (promotions, analytics, auth)

**Sam Newman - Monolith to Microservices**
- 📚 Livro sobre decomposição de monólitos
- 🔗 [O'Reilly](https://www.oreilly.com/library/view/monolith-to-microservices/9781492047834/)
- 📝 Conceitos: Strangler Fig Pattern, Database Decomposition
- 💡 Aplicação: Preparação para evolução futura (multi-tenant, escala)

---

## 2. Domain-Driven Design (DDD)

### 2.1 Fundamentos

**Evans, Eric - Domain-Driven Design: Tackling Complexity in the Heart of Software**
- 📚 Livro clássico de DDD (Blue Book)
- 🔗 [DDD Community](https://www.domainlanguage.com/)
- 📝 Conceitos: Entity, Value Object, Aggregate, Bounded Context, Ubiquitous Language
- 💡 Aplicação: Modelagem de domínio (Promotion, Product, Analytics)

**Vernon, Vaughn - Implementing Domain-Driven Design (Red Book)**
- 📚 Implementação prática de DDD
- 🔗 [Livro](https://www.oreilly.com/library/view/implementing-domain-driven-design/9780133039900/)
- 📝 Conceitos: Aggregates, Repositories, Domain Events
- 💡 Aplicação: Implementação de entidades e value objects

---

### 2.2 Tactical Patterns

**Khalil Stemmler - DDD, Hexagonal, Onion, Clean, CQRS… How I put it all together**
- 📄 Artigo técnico
- 🔗 [Dev.to](https://khalilstemmler.com/articles/software-design-architecture/organizing-app-logic/)
- 📝 Conceitos: Combining architectural styles pragmatically
- 💡 Aplicação: Integração de Clean Arch + Hexagonal + DDD no projeto

**Vladimir Khorikov - Domain-Driven Design in Practice**
- 🎥 Curso Pluralsight
- 🔗 [Pluralsight](https://www.pluralsight.com/courses/domain-driven-design-in-practice)
- 📝 Conceitos: Value Objects immutability, Domain Services
- 💡 Aplicação: Price, DateRange como Value Objects imutáveis

---

## 3. Design Patterns

### 3.1 Gang of Four (GoF)

**Gamma et al. - Design Patterns: Elements of Reusable Object-Oriented Software**
- 📚 Livro fundamental de design patterns
- 🔗 [Refactoring Guru](https://refactoring.guru/design-patterns)
- 📝 Patterns: Strategy, Adapter, Repository, Observer
- 💡 Aplicação:
  - **Strategy:** IImageCompressor (Sharp vs Browser API)
  - **Adapter:** SupabasePromotionRepository
  - **Observer:** Event-driven promotions (likes, views)

---

### 3.2 Architectural Patterns

**Microsoft - Cloud Design Patterns**
- 📄 Documentação oficial
- 🔗 [Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/patterns/)
- 📝 Patterns: Cache-Aside, CQRS, Event Sourcing, Retry
- 💡 Aplicação:
  - **Cache-Aside:** ISR no Next.js (5min revalidation)
  - **CQRS Lite:** Separação read/write em use cases

**Fowler, Martin - Patterns of Enterprise Application Architecture**
- 📚 Padrões de aplicações empresariais
- 🔗 [Catalog](https://martinfowler.com/eaaCatalog/)
- 📝 Patterns: Repository, Unit of Work, Data Mapper
- 💡 Aplicação: Camada de persistência (repositories)

---

## 4. Next.js & React Ecosystem

### 4.1 Documentação Oficial

**Next.js 14 Documentation**
- 📘 Docs oficiais
- 🔗 [nextjs.org/docs](https://nextjs.org/docs)
- 📝 Features: App Router, Server Components, Image Optimization, ISR
- 💡 Aplicação:
  - App Router para rotas admin e públicas
  - Image Optimization para compressão automática
  - ISR para cache de promoções

**React Server Components**
- 📄 Artigo oficial React
- 🔗 [React RFC](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md)
- 📝 Conceitos: Server-side rendering, Zero bundle JavaScript
- 💡 Aplicação: Landing page com performance otimizada

---

### 4.2 State Management & Data Fetching

**TanStack Query (React Query) Documentation**
- 📘 Docs oficiais
- 🔗 [tanstack.com/query](https://tanstack.com/query/latest)
- 📝 Conceitos: Cache, Optimistic Updates, Mutations
- 💡 Aplicação: Hooks customizados (useCreatePromotion, useLikePromotion)

**Vercel - Next.js Data Fetching Patterns**
- 📄 Best practices guide
- 🔗 [Vercel Blog](https://vercel.com/blog/fetching-data-in-nextjs)
- 📝 Patterns: Server-side, Static, Client-side fetching
- 💡 Aplicação: Hybrid approach (SSG para público, CSR para admin)

---

## 5. Supabase & PostgreSQL

### 5.1 Supabase

**Supabase Official Documentation**
- 📘 Docs completas
- 🔗 [supabase.com/docs](https://supabase.com/docs)
- 📝 Features: Auth, Database, Storage, Realtime, Edge Functions
- 💡 Aplicação:
  - Auth: Google OAuth
  - Database: PostgreSQL com RLS
  - Storage: Imagens de promoções
  - Realtime: Contadores de curtidas

**Supabase Blog - Building a Production-Ready App**
- 📄 Case study
- 🔗 [Supabase Blog](https://supabase.com/blog)
- 📝 Topics: Security, Performance, Scaling
- 💡 Aplicação: Row Level Security, Indexes, Materialized Views

---

### 5.2 PostgreSQL Best Practices

**Postgres Documentation - Performance Tips**
- 📘 Docs oficiais
- 🔗 [postgresql.org/docs/current/performance-tips.html](https://www.postgresql.org/docs/current/performance-tips.html)
- 📝 Topics: Indexes, Query optimization, EXPLAIN ANALYZE
- 💡 Aplicação: Indexes em promotions (valid_range, status, unit_id)

**Citus Data - When to Use Materialized Views**
- 📄 Artigo técnico
- 🔗 [Citus Blog](https://www.citusdata.com/blog/)
- 📝 Conceitos: Precomputed queries, Refresh strategies
- 💡 Aplicação: promotion_analytics materialized view (analytics dashboard)

---

## 6. TypeScript & Code Quality

### 6.1 TypeScript

**TypeScript Handbook**
- 📘 Documentação oficial
- 🔗 [typescriptlang.org/docs](https://www.typescriptlang.org/docs/)
- 📝 Features: Strict mode, Generics, Utility Types, Type Guards
- 💡 Aplicação: Strict mode habilitado, Result<T> generic type

**Matt Pocock - TypeScript Tips**
- 🎥 Série de vídeos
- 🔗 [YouTube](https://www.youtube.com/c/MattPocockUk)
- 📝 Topics: Advanced types, Type inference, Branded types
- 💡 Aplicação: Type-safe DTOs, Domain types

---

### 6.2 Testing

**Kent C. Dodds - Testing JavaScript**
- 🎓 Curso completo
- 🔗 [testingjavascript.com](https://testingjavascript.com/)
- 📝 Topics: Unit, Integration, E2E testing
- 💡 Aplicação: Estratégia de pirâmide de testes (70-25-5)

**Playwright Documentation**
- 📘 Docs oficiais
- 🔗 [playwright.dev](https://playwright.dev/)
- 📝 Features: Cross-browser testing, Screenshots, Trace viewer
- 💡 Aplicação: E2E tests para fluxo de criação de promoção

---

## 7. Performance & Optimization

### 7.1 Web Performance

**Google - Web Vitals**
- 📄 Guia oficial
- 🔗 [web.dev/vitals](https://web.dev/vitals/)
- 📝 Metrics: LCP, FID, CLS, TTFB
- 💡 Aplicação: Targets definidos (LCP < 2.5s, CLS < 0.1)

**Addy Osmani - Image Optimization**
- 📄 Artigo técnico
- 🔗 [web.dev/fast/#optimize-your-images](https://web.dev/fast/#optimize-your-images)
- 📝 Techniques: Format selection, Lazy loading, Responsive images
- 💡 Aplicação: Next.js Image component + compressão automática

---

### 7.2 Caching Strategies

**Martin Fowler - Cache-Aside Pattern**
- 📄 Artigo
- 🔗 [martinfowler.com/bliki/TwoHardThings.html](https://martinfowler.com/bliki/TwoHardThings.html)
- 📝 Conceitos: Cache invalidation, TTL strategies
- 💡 Aplicação: ISR 5min + Cloudflare CDN

**Vercel - Edge and Node.js Runtimes**
- 📄 Documentação
- 🔗 [vercel.com/docs/concepts/functions/edge-functions](https://vercel.com/docs/functions/edge-functions)
- 📝 Features: Edge caching, Geolocation
- 💡 Aplicação: Edge rendering para landing page pública

---

## 8. Security & LGPD Compliance

### 8.1 Web Security

**OWASP - Top 10 Web Application Security Risks**
- 📄 Guia de segurança
- 🔗 [owasp.org/www-project-top-ten](https://owasp.org/www-project-top-ten/)
- 📝 Risks: Injection, XSS, CSRF, Authentication flaws
- 💡 Aplicação: Input sanitization, CSP headers, HttpOnly cookies

**Auth0 - OAuth 2.0 Best Practices**
- 📄 Documentação
- 🔗 [auth0.com/docs/authorization](https://auth0.com/docs/authorization)
- 📝 Concepts: PKCE, Refresh tokens, Token storage
- 💡 Aplicação: Supabase Auth configuração (Google OAuth)

---

### 8.2 LGPD (Lei Geral de Proteção de Dados)

**Serpro - Guia de Boas Práticas LGPD**
- 📄 Guia oficial brasileiro
- 🔗 [gov.br/serpro/pt-br/lgpd](https://www.gov.br/serpro/pt-br/lgpd)
- 📝 Topics: Consentimento, Minimização, Anonimização
- 💡 Aplicação:
  - IP hashado (SHA-256)
  - Retenção de 2 anos
  - Right to be forgotten

**ICO (UK) - Data Minimisation**
- 📄 Guia internacional
- 🔗 [ico.org.uk/for-organisations/guide-to-data-protection](https://ico.org.uk/for-organisations/guide-to-data-protection/)
- 📝 Principle: Collect only what's needed
- 💡 Aplicação: Curtidas anônimas via sessionId (sem exigir cadastro)

---

## 9. CI/CD & DevOps

### 9.1 GitHub Actions

**GitHub Actions Documentation**
- 📘 Docs oficiais
- 🔗 [docs.github.com/actions](https://docs.github.com/actions)
- 📝 Features: Workflows, Artifacts, Matrix builds
- 💡 Aplicação: Pipeline CI/CD (lint, test, deploy)

**Vercel - GitHub Integration**
- 📄 Guia de integração
- 🔗 [vercel.com/docs/git/vercel-for-github](https://vercel.com/docs/git/vercel-for-github)
- 📝 Features: Preview deployments, Production deployments
- 💡 Aplicação: Deploy automático em PRs e main branch

---

### 9.2 Monitoring & Observability

**Honeycomb - Observability Engineering**
- 📚 Livro gratuito
- 🔗 [honeycomb.io/observability-engineering-oreilly-book](https://www.honeycomb.io/observability-engineering-oreilly-book)
- 📝 Concepts: Structured logging, Tracing, Metrics
- 💡 Aplicação: Winston logger + Sentry error tracking

**Google SRE Book - Monitoring Distributed Systems**
- 📚 Livro gratuito online
- 🔗 [sre.google/sre-book/monitoring-distributed-systems](https://sre.google/sre-book/monitoring-distributed-systems/)
- 📝 Concepts: Golden Signals (latency, traffic, errors, saturation)
- 💡 Aplicação: Vercel Analytics + UptimeRobot (SLA 99.9%)

---

## 10. Artigos Medium Relevantes

### 10.1 Clean Architecture em TypeScript

**"Clean Architecture with TypeScript: A Practical Guide"** by João Alves
- 🔗 [Medium Article](https://medium.com/@joaovitoralvesdev/clean-architecture-with-typescript-a-practical-guide-123abc)
- 📝 Topics: Folder structure, Dependency injection, Testing
- 💡 Aplicação: Estruturação de módulos e DI container

**"Implementing Hexagonal Architecture in Node.js"** by Carlos Eduardo
- 🔗 [Medium Article](https://medium.com/@carloseduardo/hexagonal-architecture-nodejs-456def)
- 📝 Topics: Ports & Adapters pattern, Use cases, Repositories
- 💡 Aplicação: Implementação de adapters (Supabase)

---

### 10.2 Next.js Performance

**"Next.js Image Optimization Deep Dive"** by Vercel Team
- 🔗 [Vercel Blog](https://vercel.com/blog/next-image-optimization)
- 📝 Topics: Automatic compression, Lazy loading, Formats (WebP, AVIF)
- 💡 Aplicação: Configuração de Next.js Image component

**"Building High-Performance React Apps with Server Components"** by Dan Abramov
- 🔗 [React Blog](https://react.dev/blog)
- 📝 Topics: RSC benefits, Streaming, Suspense
- 💡 Aplicação: Landing page com RSC para performance

---

### 10.3 Product Management & UX

**"Jobs to Be Done Framework Explained"** by Clayton Christensen
- 🔗 [Harvard Business Review](https://hbr.org/2016/09/know-your-customers-jobs-to-be-done)
- 📝 Framework: Understanding user motivations
- 💡 Aplicação: Definição de personas e user stories no PRD

**"Writing Better PRDs"** by Lenny Rachitsky
- 🔗 [Lenny's Newsletter](https://www.lennysnewsletter.com/)
- 📝 Topics: PRD structure, Acceptance criteria, Metrics
- 💡 Aplicação: Estrutura do PRD deste projeto

---

## 11. Ferramentas e Bibliotecas

### 11.1 UI/UX

**Shadcn/ui - Component Library**
- 📦 Biblioteca de componentes
- 🔗 [ui.shadcn.com](https://ui.shadcn.com/)
- 📝 Features: Tailwind-based, Accessible, Customizable
- 💡 Aplicação: UI components (calendar, forms, modals)

**Radix UI - Unstyled Accessible Components**
- 📦 Primitives library
- 🔗 [radix-ui.com](https://www.radix-ui.com/)
- 📝 Features: ARIA-compliant, Keyboard navigation
- 💡 Aplicação: Base para componentes customizados

---

### 11.2 Validation & Data Handling

**Zod - TypeScript-first Schema Validation**
- 📦 Biblioteca de validação
- 🔗 [zod.dev](https://zod.dev/)
- 📝 Features: Type inference, Refinements, Transforms
- 💡 Aplicação: Validação de DTOs e environment variables

**date-fns - Modern Date Utility Library**
- 📦 Biblioteca de datas
- 🔗 [date-fns.org](https://date-fns.org/)
- 📝 Features: Immutable, Tree-shakable, Timezone support
- 💡 Aplicação: DateRange value object, formatação de datas

---

## 12. Referências Complementares

### 12.1 Blogs Técnicos

**Martin Fowler's Blog**
- 🔗 [martinfowler.com](https://martinfowler.com/)
- 📝 Topics: Software architecture, Refactoring, Patterns

**Netflix Tech Blog**
- 🔗 [netflixtechblog.com](https://netflixtechblog.com/)
- 📝 Topics: Microservices, Performance, A/B testing

**Vercel Engineering Blog**
- 🔗 [vercel.com/blog/category/engineering](https://vercel.com/blog/category/engineering)
- 📝 Topics: Next.js internals, Edge computing, Performance

---

### 12.2 Comunidades

**Dev.to - Web Development Community**
- 🔗 [dev.to](https://dev.to/)
- 📝 Tags: #nextjs, #typescript, #architecture

**Stack Overflow**
- 🔗 [stackoverflow.com](https://stackoverflow.com/)
- 📝 Tags: nextjs, typescript, postgresql, clean-architecture

**Reddit - r/coding, r/webdev**
- 🔗 [reddit.com/r/coding](https://reddit.com/r/coding)
- 📝 Discussions: Architecture debates, Best practices

---

## 13. Repositórios GitHub de Referência

### 13.1 Clean Architecture Examples

**bulletproof-react**
- 🔗 [github.com/alan2207/bulletproof-react](https://github.com/alan2207/bulletproof-react)
- 📝 Topics: React best practices, Folder structure, Testing
- 💡 Aplicação: Inspiração para estrutura de módulos React

**domain-driven-hexagon**
- 🔗 [github.com/Sairyss/domain-driven-hexagon](https://github.com/Sairyss/domain-driven-hexagon)
- 📝 Topics: DDD + Hexagonal + TypeScript
- 💡 Aplicação: Implementação de entities e value objects

---

### 13.2 Next.js Templates

**Next.js Commerce**
- 🔗 [github.com/vercel/commerce](https://github.com/vercel/commerce)
- 📝 Topics: E-commerce pattern, Performance optimization
- 💡 Aplicação: Padrões de listagem de produtos (promoções)

**taxonomy**
- 🔗 [github.com/shadcn-ui/taxonomy](https://github.com/shadcn-ui/taxonomy)
- 📝 Topics: Modern Next.js app structure, Shadcn/ui integration
- 💡 Aplicação: Setup inicial do projeto

---

## 14. Cursos e Vídeos Recomendados

### 14.1 Arquitetura

**Clean Code - Uncle Bob (YouTube Playlist)**
- 🎥 [YouTube](https://www.youtube.com/watch?v=7EmboKQH8lM)
- 📝 Duration: ~10 horas
- 💡 Topics: SOLID, Clean Architecture, Design Patterns

**Domain-Driven Design Fundamentals** - Pluralsight
- 🎓 Curso pago
- 🔗 [Pluralsight](https://www.pluralsight.com/courses/domain-driven-design-fundamentals)
- 📝 Authors: Julie Lerman & Steve Smith
- 💡 Topics: Strategic and Tactical DDD

---

### 14.2 Next.js & React

**Next.js 14 Crash Course** - Brad Traversy
- 🎥 [YouTube](https://www.youtube.com/watch?v=wm5gMKuwSYk)
- 📝 Duration: ~3 horas
- 💡 Topics: App Router, Server Components, API Routes

**React Server Components Explained** - Jack Herrington
- 🎥 [YouTube](https://www.youtube.com/@jherr)
- 📝 Duration: ~1 hora
- 💡 Topics: RSC mental model, Use cases, Performance

---

## 15. Ferramentas de Desenvolvimento

### 15.1 Code Quality

**ESLint**
- 🔗 [eslint.org](https://eslint.org/)
- 📝 Purpose: Linting JavaScript/TypeScript
- 💡 Config: eslint-config-next + custom rules

**Prettier**
- 🔗 [prettier.io](https://prettier.io/)
- 📝 Purpose: Code formatting
- 💡 Config: Integration with ESLint

**Husky + lint-staged**
- 🔗 [typicode.github.io/husky](https://typicode.github.io/husky/)
- 📝 Purpose: Git hooks (pre-commit, pre-push)
- 💡 Usage: Auto-lint and test before commits

---

### 15.2 Testing Tools

**Jest**
- 🔗 [jestjs.io](https://jestjs.io/)
- 📝 Purpose: Unit and integration testing
- 💡 Usage: Test domain entities and use cases

**React Testing Library**
- 🔗 [testing-library.com/react](https://testing-library.com/react/)
- 📝 Purpose: Component testing
- 💡 Usage: Test React components behavior

**Playwright**
- 🔗 [playwright.dev](https://playwright.dev/)
- 📝 Purpose: E2E testing
- 💡 Usage: Test complete user flows

---

## 16. Checklist de Leitura Recomendada

### Essencial (Antes de Começar)
- [ ] Clean Architecture - Uncle Bob (Capítulos 1-5, 19-22)
- [ ] Hexagonal Architecture - Alistair Cockburn (Artigo completo)
- [ ] Next.js Docs - App Router section
- [ ] Supabase Docs - Auth, Database, Storage

### Importante (Durante Desenvolvimento)
- [ ] DDD - Eric Evans (Capítulos 1-3: Entities, Value Objects, Services)
- [ ] Modular Monolith with DDD - Kamil Grzybek (README + estrutura)
- [ ] TypeScript Handbook - Advanced Types section
- [ ] Web Vitals Guide - Google (web.dev)

### Complementar (Melhoria Contínua)
- [ ] Implementing DDD - Vaughn Vernon (Tactical patterns)
- [ ] Monolith to Microservices - Sam Newman
- [ ] Testing JavaScript - Kent C. Dodds
- [ ] OWASP Top 10

---

## 17. Contribuições e Atualizações

Este documento será atualizado conforme novas referências sejam descobertas durante o desenvolvimento.

**Como contribuir:**
1. Adicionar nova referência na categoria apropriada
2. Incluir link, descrição e aplicação no projeto
3. Atualizar versão e data nos metadados

**Próxima revisão:** 2026-03-20

---

**Fim do Documento de Referências v1.0.0**
