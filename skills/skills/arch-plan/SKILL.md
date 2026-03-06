---
name: arch-plan
description: Discover the best software architecture for a project from user requirements through an adaptive interview, architecture research, and design pattern-based comparison. Use whenever the user asks how to architect a new system, choose between architecture styles, define modules, or plan a scalable maintainable codebase.
---

# Architecture Planning Skill

Defina a melhor arquitetura de software para um problema usando um fluxo estruturado em duas fases:
- Fase 1: entrevista adaptativa para descoberta de requisitos
- Fase 2: top 3 opções de arquitetura com recomendação e blueprint de implementação

Use esta skill quando o usuário estiver em dúvida sobre direção arquitetural, limites de stack, estratégia de escalabilidade ou estrutura do software.

## Core Principles

- Faça perguntas focadas que reduzam incerteza e revelem restrições.
- Construa cada próxima pergunta com base nas respostas anteriores.
- Mantenha a entrevista entre 5 e 10 perguntas.
- Se o usuário não souber regras de domínio, proponha alternativas realistas com exemplos reais, repositórios públicos e padrões práticos.
- Apresente opções arquiteturais com trade-offs explícitos e design patterns conhecidos.
- Permita refinamento de requisitos a qualquer momento e retorne ao ponto necessário do fluxo.

## Phase 1: Adaptive Discovery Interview

### Goal
Entender contexto de negócio, restrições técnicas, atributos de qualidade e realidade de entrega antes de propor arquitetura.

### Interview Rules

- Faça uma pergunta por vez.
- Após cada resposta, sintetize brevemente o aprendizado e faça a próxima melhor pergunta.
- Pare apenas após no mínimo 5 e no máximo 10 perguntas de alto valor.
- Prefira perguntas abertas no início e de fechamento de restrições depois.
- Registre premissas explicitamente.

### Mandatory Coverage Areas

Cubra estes temas ao longo da entrevista:

1. Objetivo do produto e usuários-alvo.
2. Casos de uso centrais e jornadas críticas.
3. Requisitos funcionais e integrações.
4. Requisitos não funcionais (performance, escalabilidade, confiabilidade, segurança, observabilidade).
5. Características dos dados (volume, consistência, retenção, privacidade, compliance).
6. Restrições da equipe (habilidades, tamanho, modelo de ownership, cadência de entrega).
7. Restrições de infraestrutura (cloud/on-prem, orçamento, geografia de latência).
8. Horizonte de evolução (MVP vs plataforma de longo prazo).
9. Expectativas de testes e qualidade.
10. Riscos conhecidos e desconhecidos.

### If User Is Unsure About Domain Rules

Quando o usuário estiver em dúvida, não bloqueie o progresso. Use uma ou mais técnicas:

- Ofereça 2 a 3 opções realistas de regras usadas em domínios similares.
- Referencie padrões conhecidos de sistemas comuns de produção.
- Sugira repositórios open-source ou arquiteturas comparáveis como inspiração.
- Proponha um default conservador e explique por que ele é seguro.
- Marque pontos incertos como hipóteses para validar depois.

## Phase 2: Architecture Options and Recommendation

### Goal
Produzir 3 candidatas de arquitetura fundamentadas em literatura e design patterns, e guiar o usuário até uma decisão.

### Output Structure

Sempre entregue:

1. Resumo executivo do contexto e restrições.
2. Top 3 opções de arquitetura.
3. Recomendação com justificativa.
4. Riscos da decisão e plano de mitigação.
5. Próximos passos de implementação.

### For Each Architecture Option

Para cada uma das 3 opções, inclua:

- Estilo arquitetural (por exemplo: monólito modular, microsserviços, event-driven, hexagonal, clean architecture, em camadas, serverless).
- Por que se encaixa neste contexto.
- Principais design patterns envolvidos (por exemplo: Adapter, Strategy, CQRS, Saga, Repository, Circuit Breaker, Outbox).
- Prós e contras.
- Riscos técnicos e organizacionais.
- Perfil de custo e complexidade.
- Horizonte ideal de uso (MVP, crescimento, escala enterprise).

### Recommendation Behavior

Após apresentar as 3 opções:

- Recomende uma opção de forma clara.
- Explique por que ela é superior neste contexto.
- Compare explicitamente com as outras duas.
- Peça confirmação da opção selecionada.

## Post-Decision Step: ASCII Blueprint Offer

Após o usuário escolher uma opção, pergunte:

"Você quer um blueprint ASCII detalhado da arquitetura mostrando módulos, pastas, arquivos-chave, funções centrais, estratégia de testes e fronteiras de integração?"

Se o usuário aceitar, gere um plano detalhado com:

- Diagrama ASCII de componentes em alto nível.
- Estrutura sugerida de pastas/arquivos.
- Interfaces centrais, services, repositories e adapters.
- Pirâmide de testes sugerida (unit, integration, e2e) com exemplos.
- Backlog inicial de implementação por marcos.

## Continuous Refinement Mode

O usuário pode refinar requisitos a qualquer momento. Se isso acontecer:

- Reconheça o que mudou.
- Recalcule premissas impactadas.
- Atualize as 3 opções de arquitetura se necessário.
- Preserve decisões estáveis e revise apenas partes afetadas.

## Communication Style

- Seja conciso, prático e orientado à decisão.
- Evite conselhos genéricos desconectados de restrições reais.
- Prefira trade-offs concretos a boas práticas abstratas.
- Quando houver incerteza, explicite e proponha passos de validação.

## Prompts de Teste (Ativação)

Use estes prompts para validar se a skill está sendo acionada corretamente:

1. "Quero construir uma plataforma SaaS de gestão de clínicas, mas não sei se começo com monólito modular ou microsserviços. Me ajude a decidir a arquitetura."
2. "Tenho uma ideia de app de delivery B2B, porém não sei as regras de negócio ainda. Faça perguntas e proponha arquiteturas possíveis com base em exemplos reais."
3. "Preciso de uma arquitetura para um produto com crescimento rápido, integração com ERPs e alto volume de dados. Quero 3 opções com prós e contras."
4. "Me convença da melhor arquitetura para meu MVP e depois monte um diagrama ASCII com módulos, arquivos e estratégia de testes."
5. "Vou refinando requisitos durante a conversa. Quero que você adapte a arquitetura sem reiniciar tudo do zero."

## Final Deliverable Template

Use este template nas recomendações finais:

```markdown
# Architecture Recommendation

## 1) Context Summary
- Objective:
- Main constraints:
- Key assumptions:

## 2) Top 3 Architecture Options
### Option A - [Name]
- Patterns:
- Strengths:
- Weaknesses:
- Risks:
- Fit horizon:

### Option B - [Name]
- Patterns:
- Strengths:
- Weaknesses:
- Risks:
- Fit horizon:

### Option C - [Name]
- Patterns:
- Strengths:
- Weaknesses:
- Risks:
- Fit horizon:

## 3) Recommended Option
- Choice:
- Why this is best now:
- Why not the others:

## 4) Implementation Starting Point
- Proposed modules:
- Data and integration strategy:
- Test strategy:
- First milestones:

## 5) Refinement Hooks
- What to validate next:
- What can change later without full redesign:
```
