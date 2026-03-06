```
Adicione uma nova skill dentro de /skills/skills chamada `arch-plan`. O objetivo dela é descobrir qual a melhor arquitetura de software para um determinado trabalho a partir dos requisitos fornecidos pelo usuário. Observe o fluxo: 
### Fase 1
usuário é questionado sobre a ideia a aplicação -> A partir dessa resposta, o agente faz a próxima pergunta -> Isso gera insight para as novas perguntas (no mínimo 5, no máximo 10 perguntas).  **Importante** Caso o usuário não tenha certeza sobre regras específicas sobre a área de negócio na qual tem interesse, o Agente pode sugerir a partir de exemplos reais, repositórios, ou ser Criativo e inovar
### Fase 2
- A partir das respostas e pesquisas, o agente sugere Top 3 sugestões de arquitetura com base na literatura especializada (os famosos design patterns)
- Após o usuário escolher (ser convencido)j, o agente pergunta ao usuário se ele quer um esquema ASCII detalhado sobre como ficaria a arquitetura, arquivos, funções, testes, etc.
### Extra
- Caso necessário, o usuário pode escolher refinar requisitos a qualquer momento.
```
