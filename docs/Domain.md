# SleepScene AI — Domain Model

## Objetivo

Este documento define o domínio do SleepScene AI.

O objetivo é garantir que a evolução do sistema aconteça sobre um modelo de negócio consistente, independentemente de tecnologias, frameworks ou provedores de IA.

---

# Visão do Domínio

SleepScene AI é uma plataforma de experiências narrativas personalizadas para a hora de dormir.

Cada experiência é composta por:

* uma criança protagonista;
* um tema;
* uma história;
* cinco cenas;
* uma imagem por cena;
* uma narração por cena;
* uma trilha sonora de fundo.

O produto não é um gerador de histórias isoladas.

O produto é uma experiência narrativa multimodal composta por texto, imagem, áudio narrado e trilha sonora.

---

# Fluxo Principal

```text
Story Request
↓
Story Session
↓
Temporary Story Bible
↓
Story
↓
5 Scenes
↓
5 Images
↓
Narration
↓
Soundtrack
↓
Player
```

---

# Entidades do MVP

## ChildProfile

Representa a criança para quem a experiência será criada.

### Responsabilidades

* definir o protagonista;
* fornecer contexto para geração;
* armazenar interesses da criança.

### Campos

```text
id
name
age
interests[]
createdAt
updatedAt
```

### Regras

* a criança é sempre a protagonista da história;
* toda Story deve possuir exatamente um ChildProfile.

---

## StoryRequest

Representa a solicitação de geração de uma nova experiência.

### Responsabilidades

* iniciar uma nova história;
* definir o tema da aventura.

### Campos

```text
id
childProfileId
theme
status
createdAt
```

### Regras

* um StoryRequest gera exatamente uma Story;
* status possíveis:

  * pending
  * processing
  * completed
  * failed

---

## StorySession

Representa uma sessão contínua de histórias.

### Objetivo

Permitir continuidade narrativa sem exigir memória permanente entre dias diferentes.

### Campos

```text
id
childProfileId
storyCount
createdAt
```

### Regras

* uma sessão pode conter até 3 histórias;
* a continuidade existe apenas dentro da sessão atual;
* após a terceira história a sessão é encerrada.

---

## TemporaryStoryBible

Representa o contexto narrativo compartilhado por todas as histórias da sessão.

### Objetivo

Garantir coerência entre:

* personagens;
* estilo visual;
* tom narrativo;
* elementos da aventura.

### Campos

```text
protagonist
theme
companion
locations[]
visualStyle
narrativeStyle
```

### Regras

* existe apenas durante a sessão;
* não é persistida como memória permanente do produto;
* pode evoluir entre as histórias da mesma sessão.

---

## Story

Representa uma experiência completa de aproximadamente cinco minutos.

### Responsabilidades

* agrupar cenas;
* controlar duração;
* manter coerência narrativa;
* associar trilha sonora.

### Campos

```text
id
storySessionId
soundtrackId
title
summary
duration
createdAt
```

### Regras

* uma Story possui exatamente 5 Scenes;
* uma Story possui exatamente 1 Soundtrack;
* duração alvo de aproximadamente 5 minutos;
* uma Story pertence a uma StorySession.

---

## Scene

Representa a unidade principal do MVP.

### Responsabilidades

* conter narrativa;
* conter imagem;
* conter narração.

### Campos

```text
id
storyId
order
title
narrativeText
narrationText
imagePrompt
imageUrl
duration
```

### Regras

* toda Story possui exatamente 5 Scenes;
* cada Scene representa aproximadamente 1 minuto;
* ordem obrigatória de 1 a 5.

---

## Soundtrack

Representa a trilha sonora utilizada durante a reprodução da história.

### Responsabilidades

* aumentar a imersão;
* reforçar a experiência de hora de dormir;
* acompanhar toda a duração da história.

### Campos

```text
id
name
audioUrl
duration
```

### Regras

* uma Story utiliza exatamente uma Soundtrack;
* a Soundtrack é selecionada aleatoriamente;
* o MVP possui exatamente 3 trilhas disponíveis;
* a seleção não depende do tema da história;
* não existe geração de música por IA no MVP;
* a trilha acompanha toda a experiência, não cenas individuais.

---

# Relacionamentos

```text
ChildProfile
    │
    └── StorySession
            │
            ├── TemporaryStoryBible
            │
            └── Story
                    │
                    ├── Soundtrack
                    │
                    └── Scene (1..5)
```

---

# Regras de Negócio

## Regra 1

A criança é sempre a protagonista.

Não existe modo observador no MVP.

---

## Regra 2

Toda história possui exatamente 5 cenas.

Não existe quantidade variável de cenas no MVP.

---

## Regra 3

Cada cena possui:

* narrativa;
* imagem;
* narração.

Os três elementos devem representar o mesmo momento da história.

---

## Regra 4

Cada cena deve possuir duração aproximada de um minuto.

Variações pequenas são aceitáveis.

---

## Regra 5

Uma sessão pode conter no máximo três histórias consecutivas.

---

## Regra 6

A continuidade narrativa existe apenas dentro da StorySession.

Não existe memória persistente entre dias diferentes no MVP.

---

## Regra 7

Toda Story deve possuir uma Soundtrack.

---

## Regra 8

A Soundtrack é reproduzida durante toda a experiência.

---

## Regra 9

A Soundtrack deve possuir volume inferior à narração.

---

## Regra 10

Interesses da criança influenciam a geração.

Não limitam os temas disponíveis.

---

# Entidades Planejadas para V2

Estas entidades não fazem parte do MVP, mas o domínio foi preparado para acomodá-las futuramente.

## Character

Representa personagens recorrentes.

---

## CharacterBible

Define:

* aparência;
* personalidade;
* estilo narrativo;
* estilo visual.

---

## StoryUniverse

Representa o universo persistente da criança.

---

## DailyContext

Permite adaptar histórias ao momento atual da criança.

---

## Persistent Narrative Memory

Permite continuidade entre diferentes dias de uso.

---

## Thematic Soundtrack System

Permite seleção de trilhas baseada no contexto da história.

Exemplos:

* Piratas
* Espaço
* Fazenda
* Fundo do Mar
* Floresta Encantada

A trilha passa a refletir o universo narrativo da aventura.

---

# Decisão Arquitetural de Domínio

A unidade principal do SleepScene AI não é a Story.

A unidade principal é a Scene.

A Story existe para organizar uma sequência coerente de cinco cenas que formam uma experiência completa para a hora de dormir.

A Soundtrack atua como elemento transversal da experiência, acompanhando todas as cenas e aumentando a imersão do usuário.
