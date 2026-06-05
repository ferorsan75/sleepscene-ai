# SleepScene AI — OpenAI Integration Document

## Objetivo

Este documento define como o SleepScene AI integra-se com os serviços da OpenAI durante o MVP.

O objetivo é padronizar:

* geração de texto;
* geração de imagens;
* geração de narração;
* validação de contratos;
* tratamento de erros;
* persistência de artefatos.

---

# Princípios

## Princípio 1

Toda geração utiliza IA real.

Conforme ADR-018, não serão utilizados mocks para geração de conteúdo.

---

## Princípio 2

Toda saída estruturada deve respeitar os contratos definidos em:

```text
AIContracts.md
```

---

## Princípio 3

Toda saída estruturada deve ser validada antes de persistência.

---

## Princípio 4

Falhas devem ser tratadas explicitamente.

Nenhum dado inválido deve ser armazenado.

---

# Serviços Utilizados

## Geração de Texto

Responsável por:

* Story Bible;
* Story;
* estrutura narrativa;
* prompts visuais;
* textos para TTS.

---

## Geração de Imagens

Responsável por:

* imagens das cenas.

---

## Text To Speech

Responsável por:

* narração das cenas.

---

# Arquitetura de Geração

```text
Story Request
↓
Story Bible Generation
↓
Story Generation
↓
Image Prompt Generation
↓
Image Generation
↓
Narration Generation
↓
TTS Generation
↓
Persistência
```

---

# Story Bible Generation

## Entrada

```text
Child Profile
+
Selected Theme
```

---

## Saída

```text
StoryBibleContract
```

---

## Validação

Antes de prosseguir:

```text
Validate JSON
Validate Contract
```

---

## Falha

Se inválido:

```text
Retry
```

---

# Story Generation

## Entrada

```text
StoryBibleContract
```

---

## Saída

```text
StoryContract
```

---

## Validações

Obrigatórias:

```text
JSON válido
5 cenas
Campos obrigatórios
```

---

## Falha

Se inválido:

```text
Retry
```

---

# Image Prompt Generation

## Entrada

```text
StoryBibleContract
+
Scene
```

---

## Saída

```text
ImagePromptContract
```

---

## Regras

Formato obrigatório:

```text
9:16
```

---

# Image Generation

## Entrada

```text
ImagePromptContract
```

---

## Saída

```text
Image File
```

---

## Regras

Todas as imagens devem:

* seguir proporção 9:16;
* ser apropriadas para crianças;
* manter consistência com a Story Bible.

---

## Persistência

Após geração:

```text
Supabase Storage
```

---

## Resultado

```text
imageUrl
```

---

# Narration Generation

## Entrada

```text
Scene
```

---

## Saída

```text
NarrationContract
```

---

## Objetivo

Produzir texto otimizado para leitura em voz alta.

---

# TTS Generation

## Entrada

```text
NarrationContract
```

---

## Saída

```text
Audio File
```

---

## Persistência

Após geração:

```text
Supabase Storage
```

---

## Resultado

```text
audioUrl
```

---

# Soundtrack Strategy

## MVP

A trilha sonora não é gerada por IA.

Biblioteca:

```text
3 trilhas
```

---

## Seleção

```text
Aleatória
```

---

## Armazenamento

```text
Supabase Storage
```

---

# Retry Policy

## Objetivo

Tratar falhas transitórias.

---

## Limite

```text
3 tentativas
```

---

## Aplicação

* Story Bible
* Story
* Image Prompt
* Image Generation
* Narration
* TTS

---

## Após Falha

```text
status = failed
```

---

# Timeout Policy

## Story Bible

```text
60 segundos
```

---

## Story

```text
60 segundos
```

---

## Imagem

```text
120 segundos
```

---

## TTS

```text
60 segundos
```

---

# Persistência

## Banco

```text
Supabase PostgreSQL
```

Persistir:

* StorySession;
* StoryRequest;
* Story;
* Scene;
* Soundtrack.

---

## Storage

```text
Supabase Storage
```

Persistir:

* imagens;
* narrações;
* trilhas sonoras.

---

# Logging

Registrar:

* início da geração;
* fim da geração;
* duração;
* falhas;
* retries.

---

# Segurança

## Backend Only

As chaves da OpenAI nunca devem ser expostas ao frontend.

---

## Fluxo

```text
Frontend
↓
Next.js Backend
↓
OpenAI
```

---

# Monitoramento Inicial

Métricas mínimas:

```text
Tempo Story Bible

Tempo Story

Tempo Imagem

Tempo TTS

Taxa de Falha

Taxa de Retry
```

---

# Evolução Planejada

Possíveis melhorias futuras:

```text
Modelos especializados

Trilhas contextuais

Character Bible

Visual References

Memória Persistente

Filas de processamento
```

---

# Decisão Principal

O MVP utiliza OpenAI real desde o primeiro dia de desenvolvimento.

Toda geração deve produzir contratos válidos, ser validada antes da persistência e gerar artefatos consistentes com a Story Bible.

A simplicidade operacional tem prioridade sobre otimizações prematuras.
