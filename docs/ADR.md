# SleepScene AI — Architecture Decision Records (ADR)

## Objetivo

Este documento registra as principais decisões do projeto SleepScene AI.

Uma decisão registrada neste documento é considerada congelada até que exista uma justificativa explícita para revisão.

O objetivo é evitar retrabalho, rediscussões recorrentes e perda de contexto ao longo da evolução do projeto.

---

# ADR-001

## Título

Experiência baseada em cenas

## Status

Accepted

## Data

2026-06-04

## Decisão

A unidade principal do domínio é a Scene.

A Story existe para organizar uma sequência coerente de cenas.

---

# ADR-002

## Título

Histórias com duração fixa

## Status

Accepted

## Data

2026-06-04

## Decisão

```text
5 minutos
5 cenas
1 minuto por cena
```

---

# ADR-003

## Título

Continuidade limitada por sessão

## Status

Accepted

## Data

2026-06-04

## Decisão

Uma StorySession pode conter no máximo 3 histórias.

A continuidade existe apenas dentro da sessão.

---

# ADR-004

## Título

Temporary Story Bible

## Status

Accepted

## Data

2026-06-04

## Decisão

Cada StorySession possui uma Temporary Story Bible contendo:

* protagonista;
* companion;
* estilo visual;
* estilo narrativo;
* contexto da aventura.

---

# ADR-005

## Título

Criança sempre protagonista

## Status

Accepted

## Data

2026-06-04

## Decisão

A criança cadastrada é sempre a protagonista da história.

---

# ADR-006

## Título

Companion temporário

## Status

Accepted

## Data

2026-06-04

## Decisão

O companion existe apenas dentro da StorySession.

Não existe persistência entre sessões.

---

# ADR-007

## Título

Interesses influenciam mas não limitam temas

## Status

Accepted

## Data

2026-06-04

## Decisão

Interesses influenciam a geração.

Temas continuam livres e independentes.

---

# ADR-008

## Título

Plataforma Mobile First

## Status

Accepted

## Data

2026-06-04

## Decisão

```text
Web
Mobile First
PWA Ready
```

---

# ADR-009

## Título

Geração assíncrona

## Status

Accepted

## Data

2026-06-04

## Decisão

Estados oficiais:

```text
pending
processing
completed
failed
```

---

# ADR-010

## Título

Tela de Preparação

## Status

Accepted

## Data

2026-06-04

## Decisão

Toda aventura passa pela Tela de Preparação antes do Player.

---

# ADR-011

## Título

Player imersivo

## Status

Accepted

## Data

2026-06-04

## Decisão

O Player opera em tela cheia.

A imagem é o elemento principal da experiência.

---

# ADR-012

## Título

Proporção visual padrão

## Status

Accepted

## Data

2026-06-04

## Decisão

```text
9:16
```

---

# ADR-013

## Título

Trilha sonora do MVP

## Status

Accepted

## Data

2026-06-04

## Decisão

Cada história possui uma trilha sonora.

Biblioteca inicial:

```text
3 trilhas
```

Seleção:

```text
Aleatória
```

---

# ADR-014

## Título

Sem música contextual no MVP

## Status

Accepted

## Data

2026-06-04

## Decisão

A música não depende do tema da história.

Trilhas temáticas ficam para V2.

---

# ADR-015

## Título

Stack tecnológica do MVP

## Status

Accepted

## Data

2026-06-04

## Decisão

```text
Frontend:
Next.js

Backend:
Next.js Server Actions

Database:
Supabase PostgreSQL

Storage:
Supabase Storage

AI:
OpenAI
```

---

# ADR-016

## Título

Contratos de IA em JSON válido

## Status

Accepted

## Data

2026-06-04

## Decisão

Toda comunicação entre componentes de IA deve utilizar JSON válido.

Todos os contratos devem possuir:

```json
{
  "schemaVersion": "1.0"
}
```

---

## Regras

* texto livre não é aceito como saída estrutural;
* contratos inválidos devem ser rejeitados;
* consumidores devem ignorar campos desconhecidos quando possível;
* Story deve conter exatamente 5 cenas.

---

# ADR-017

## Título

Story Generator gera cenas completas

## Status

Accepted

## Data

2026-06-04

## Decisão

O Story Generator gera a história completa já contendo as 5 cenas detalhadas.

Não existe Scene Generator no MVP.

Pipeline oficial:

```text
Story Request
↓
Story Bible Generator
↓
Story Generator
↓
Image Prompt Generator
↓
Narration Generator
```

---

## Regras

O Story Generator deve retornar:

```text
Título
Resumo
5 cenas completas
```

A lista de cenas deve possuir exatamente 5 elementos válidos.

---

# ADR-018

## Título

AI First Development

## Status

Accepted

## Data

2026-06-04

## Contexto

Foi considerada a utilização de mocks para acelerar o desenvolvimento inicial.

Após análise concluiu-se que os maiores riscos do produto estão na qualidade da geração por IA e não na interface ou persistência.

Validar o comportamento real da IA desde o início reduz retrabalho e aproxima o ambiente de desenvolvimento da realidade de produção.

---

## Decisão

O MVP será desenvolvido utilizando IA real desde as primeiras integrações.

Não serão implementados mocks para:

* Story Bible;
* Story;
* Imagens;
* Narração.

Os testes deverão utilizar os mesmos serviços de IA previstos para produção.

---

## Consequências

* validação precoce da qualidade da experiência;
* validação precoce dos custos reais;
* validação precoce dos tempos de geração;
* redução de retrabalho;
* aprendizado mais próximo da arquitetura final.

---

## Regras

Toda funcionalidade relacionada à geração narrativa deve ser construída utilizando integração real com OpenAI.

Mocks só poderão ser utilizados para testes unitários isolados ou cenários específicos de falha.

---

# Resumo das Decisões Congeladas

```text
5 cenas por história
1 minuto por cena
5 minutos por história

Máximo 3 histórias por sessão

Criança sempre protagonista

Temporary Story Bible

Player imersivo

Mobile First

PWA Ready

Imagens 9:16

3 trilhas sonoras fixas

Geração assíncrona

JSON obrigatório

Story Generator gera cenas completas

Sem Scene Generator no MVP

AI First Development
```
