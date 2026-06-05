# SleepScene AI — AI Contracts Document

## Objetivo

Este documento define os contratos de dados trocados entre os componentes de geração do SleepScene AI.

Todos os contratos representam regras de negócio.

Eles não dependem de modelos específicos de IA.

---

# Princípios

## Princípio 1

Toda saída estruturada deve ser JSON válido.

---

## Princípio 2

Todo contrato deve possuir:

```json
{
  "schemaVersion": "1.0"
}
```

---

## Princípio 3

Contratos inválidos devem ser rejeitados.

Não é permitido utilizar parsing baseado em texto livre.

---

## Princípio 4

Consumidores devem ignorar campos desconhecidos sempre que possível.

---

## Princípio 5

Toda história possui exatamente 5 cenas.

Não existe quantidade variável de cenas no MVP.

---

# Pipeline Oficial

```text
Story Request
↓
StoryBibleContract
↓
StoryContract
↓
ImagePromptContract
↓
NarrationContract
```

---

# Contract 1 — StoryBibleContract

## Responsabilidade

Representar o contexto narrativo da StorySession.

---

## Estrutura

```json
{
  "schemaVersion": "1.0",

  "protagonist": {
    "name": "",
    "age": 0,
    "description": ""
  },

  "companion": {
    "name": "",
    "description": "",
    "role": ""
  },

  "theme": "",

  "visualStyle": "",

  "narrativeStyle": "",

  "locations": [
    {
      "name": "",
      "description": ""
    }
  ]
}
```

---

## Campos Obrigatórios

```text
schemaVersion
protagonist
theme
visualStyle
narrativeStyle
```

---

## Validações

```text
protagonist.name não vazio
theme não vazio
visualStyle não vazio
narrativeStyle não vazio
```

---

# Contract 2 — StoryContract

## Responsabilidade

Representar uma história completa.

Este é o contrato central do pipeline.

---

## Estrutura

```json
{
  "schemaVersion": "1.0",

  "title": "",

  "summary": "",

  "durationSeconds": 300,

  "scenes": [
    {
      "sceneNumber": 1,
      "title": "",
      "narrativeText": "",
      "durationSeconds": 60
    }
  ]
}
```

---

## Estrutura da Cena

Cada elemento da coleção `scenes` deve possuir:

```json
{
  "sceneNumber": 1,
  "title": "",
  "narrativeText": "",
  "durationSeconds": 60
}
```

---

## Regras

A lista `scenes` deve conter:

```text
Exatamente 5 elementos
```

---

## Regras da Cena

sceneNumber:

```text
1 a 5
```

---

durationSeconds:

```text
45 a 75
```

---

## Campos Obrigatórios

```text
schemaVersion
title
summary
durationSeconds
scenes
```

---

## Validações

```text
title não vazio
summary não vazio
durationSeconds = 300
scenes.length = 5
```

---

## Validação de Cada Cena

```text
sceneNumber entre 1 e 5
title não vazio
narrativeText não vazio
durationSeconds entre 45 e 75
```

---

# Contract 3 — ImagePromptContract

## Responsabilidade

Representar o prompt utilizado para geração visual.

---

## Estrutura

```json
{
  "schemaVersion": "1.0",

  "sceneNumber": 1,

  "aspectRatio": "9:16",

  "visualStyle": "",

  "prompt": ""
}
```

---

## Regras

aspectRatio:

```text
9:16
```

---

O prompt deve conter contexto suficiente para representar:

* protagonista;
* companion;
* ambiente;
* ação principal;
* estilo visual.

---

## Campos Obrigatórios

```text
schemaVersion
sceneNumber
aspectRatio
visualStyle
prompt
```

---

## Validações

```text
sceneNumber entre 1 e 5
aspectRatio = 9:16
prompt não vazio
visualStyle não vazio
```

---

# Contract 4 — NarrationContract

## Responsabilidade

Representar o texto enviado ao mecanismo de TTS.

---

## Estrutura

```json
{
  "schemaVersion": "1.0",

  "sceneNumber": 1,

  "narrationText": ""
}
```

---

## Campos Obrigatórios

```text
schemaVersion
sceneNumber
narrationText
```

---

## Validações

```text
sceneNumber entre 1 e 5
narrationText não vazio
```

---

# Fluxo de Consumo

## StoryBibleContract

Consumido por:

```text
Story Generator
Image Prompt Generator
Narration Generator
```

---

## StoryContract

Consumido por:

```text
Image Prompt Generator
Narration Generator
Persistência
Player
```

---

## ImagePromptContract

Consumido por:

```text
Image Generation Service
```

---

## NarrationContract

Consumido por:

```text
Text To Speech Service
```

---

# Error Handling

Quando um contrato for inválido:

```text
Reject
Log
Retry
```

---

## Regras

O dado inválido:

* não deve ser persistido;
* não deve ser enviado para o próximo estágio;
* deve ser registrado em log.

---

# Compatibilidade Futura

Todos os contratos são versionados.

Exemplo:

```json
{
  "schemaVersion": "1.0"
}
```

Versões futuras podem adicionar novos campos sem quebrar consumidores existentes.

---

# Contratos Planejados para V2

Possíveis contratos futuros:

```text
CharacterContract
CharacterBibleContract
StoryUniverseContract
MusicProfileContract
VisualReferenceContract
```

---

# Decisão Principal

Os componentes de IA do SleepScene AI comunicam-se através de contratos versionados em JSON válido.

O StoryContract é o contrato central do pipeline e contém a história completa já estruturada em cinco cenas.

Não existe SceneContract nem Scene Generator no MVP.

A validação contratual é obrigatória antes da persistência ou do consumo por qualquer componente do sistema.
