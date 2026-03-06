## LINKS
### SKILLS TOOLs Reference
- **Anthropic SKILLs** [https://github.com/anthropics/skills/tree/main/](https://github.com/anthropics/skills/tree/main/)


# 🧠 AI Specialist Knowledge Base: Skills, Workflows & Architecture
> **Versão:** 1.0 (Março/2026)  
> **Foco:** Interoperabilidade (MCP), Orquestração de Agentes e Clean Architecture.

---

## 🛠️ Seção 1: Top 10 Ferramentas/Repos para AI Skills & Workflows

Esta lista foca em ferramentas que implementam o **Model Context Protocol (MCP)** e o **AI SDK**, permitindo que a IA execute ações (Skills) de forma padronizada.

| Repositório | Mantenedor / Foco | Link para Consulta |
| :--- | :--- | :--- |
| **Vercel AI SDK** | Vercel (TS/JS) | [https://github.com/vercel/ai](https://github.com/vercel/ai) |
| **MCP Servers** | Anthropic (Protocolo) | [https://github.com/modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) |
| **LangGraph** | LangChain (Workflows) | [https://github.com/langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) |
| **PydanticAI** | Pydantic (Python) | [https://github.com/pydantic/pydantic-ai](https://github.com/pydantic/pydantic-ai) |
| **MCP Python SDK** | Anthropic (Core) | [https://github.com/modelcontextprotocol/python-sdk](https://github.com/modelcontextprotocol/python-sdk) |
| **CrewAI** | Multi-Agent Orchestration | [https://github.com/joaomdmoura/crewAI](https://github.com/joaomdmoura/crewAI) |
| **n8n AI** | n8n (Visual Workflows) | [https://github.com/n8n-io/n8n](https://github.com/n8n-io/n8n) |
| **Open WebUI** | Community (Universal) | [https://github.com/open-webui/open-webui](https://github.com/open-webui/open-webui) |
| **AutoGPT Forge** | Agentes Autônomos | [https://github.com/Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) |
| **LlamaIndex** | Data Skills / RAG | [https://github.com/run-llama/llama_index](https://github.com/run-llama/llama_index) |

---
### SKILLs Documentation
[https://antigravity.google/docs/skills](https://antigravity.google/docs/skills)
[https://platform.claude.com/docs/en/agents-and-tools/agent-skills/](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/)
[https://opencode.ai/docs/pt-br/skills/](https://opencode.ai/docs/pt-br/skills/)
[https://kiro.dev/docs/skills/](https://kiro.dev/docs/skills/)
[https://docs.langchain.com/oss/python/deepagents/skills](https://docs.langchain.com/oss/python/deepagents/skills)
[https://google.github.io/adk-docs/skills/](https://google.github.io/adk-docs/skills/)


---

## 🏛️ Seção 2: Referências para Arquitetura Limpa Profissional em IA

Para evitar que seu código se torne um "emaranhado de prompts", utilize estes padrões de design de software aplicados à IA.

### 1. Escolas de Base (Fundamentos)
* **Robert C. Martin (Uncle Bob):** *Clean Architecture* e *Clean Code*. A IA deve ser tratada como uma **Interface de Saída/Entrada**, nunca como o núcleo da aplicação.
* **Eric Evans:** *Domain-Driven Design (DDD)*. Use para definir os limites do que cada "Skill" pode fazer dentro de um contexto de negócio (Bounded Context).
* **Martin Fowler:** *Enterprise Integration Patterns*. Crucial para entender como orquestrar mensagens entre diferentes agentes e sistemas legados.

### 2. Design Patterns para IA (AI-Specific Patterns)
* **Adapter Pattern:** Fundamental para isolar APIs de LLMs (Anthropic vs OpenAI vs Gemini). Sua aplicação consome uma interface; o adaptador resolve qual modelo chamar.
* **Strategy Pattern:** Implemente para trocar a "estratégia de raciocínio" (ex: trocar um modelo caro por um local como Llama 3 para tarefas simples).
* **The Repository Pattern for Vectors:** Nunca exponha a complexidade do banco de vetores (Pinecone, Weaviate) diretamente na regra de negócio.
* **Observer Pattern:** Para monitorar o progresso de agentes em tempo real (Streaming de pensamentos/tokens).

---

### 🧐 Crítica Técnica: A Padronização MCP
Estamos saindo da era das "integrações manuais" para a era do **Model Context Protocol (MCP)**. O que Anthropic e Vercel estão fazendo é criar um "USB para IA". Se você não construir suas ferramentas seguindo esses protocolos, terá um alto custo de manutenção em 2026.

---
**Gerado por:** Especialista em IA