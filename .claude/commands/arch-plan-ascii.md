---
description: Planeja arquitetura de software com entrevista adaptativa e entrega obrigatória de blueprint ASCII detalhado (módulos, pastas, arquivos, funções, testes e integrações).
---

Use a skill `arch-plan` para conduzir este trabalho.

Siga este fluxo:
1. Faça a Fase 1 com perguntas adaptativas (min 5, max 10), uma por vez.
2. Se houver incerteza de regras de negócio, proponha opções realistas com exemplos de mercado, repositórios e alternativas criativas.
3. Faça a Fase 2 com top 3 arquiteturas, trade-offs e recomendação clara.
4. Conduza o usuário para escolher uma opção.
5. Gere obrigatoriamente um blueprint ASCII detalhado da opção escolhida com:
   - diagrama de componentes
   - estrutura de pastas e arquivos
   - funções e interfaces centrais
   - estratégia de testes (unit, integration, e2e)
   - fronteiras de integração e backlog inicial por marcos
6. Permita refinamento de requisitos a qualquer momento.

Contexto adicional do usuário:

$ARGUMENTS
