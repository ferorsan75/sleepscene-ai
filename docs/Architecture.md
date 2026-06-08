# SleepScene AI — Architecture Document

## Objetivo

Este documento define a arquitetura técnica do MVP do SleepScene AI.

O objetivo é entregar uma primeira versão funcional, simples de operar, de baixo custo e fácil de evoluir.

A arquitetura prioriza:

* simplicidade;
* velocidade de desenvolvimento;
* baixo custo operacional;
* facilidade de manutenção;
* evolução futura para V2.

---

# Princípios Arquiteturais

## Princípio 1

O MVP deve ser simples.

Não serão introduzidas tecnologias de escala que ainda não sejam necessárias.

---

## Princípio 2

Toda geração de aventura é assíncrona.

O usuário nunca fica bloqueado aguardando uma única requisição longa.

---

## Princípio 3

A experiência mobile é prioritária.

Desktop é suportado, mas não é o foco principal.

---

## Princípio 4

A arquitetura deve permitir evolução futura para:

* Character Bible;
* Story Universe;
* memória persistente;
* personagens recorrentes;
* trilhas contextuais;
* aplicativos nativos.

---

# Stack Tecnológica

## Frontend

```text
Next.js
TypeScript
Tailwind CSS
```

Motivos:

* produtividade;
* ecossistema maduro;
* excelente suporte mobile;
* integração simples com backend;
* suporte natural para PWA.

---

## Backend

```text
Next.js Server Actions
Next.js Route Handlers
```

Não haverá backend separado no MVP.

---

## Banco de Dados

```text
Nenhum banco de dados no MVP
```

O MVP não terá:

* login;
* cadastro;
* histórico;
* persistência de histórias;
* persistência de StoryBible.

Motivos:

* reduzir escopo;
* validar a experiência principal;
* evitar infraestrutura prematura.

---

## Storage

```text
Sem storage persistente no MVP
```

O MVP não persiste assets gerados.

As trilhas sonoras do MVP são arquivos MP3 fixos disponibilizados no projeto.

---

## IA de Texto

```text
OpenAI
```

Responsável por:

* Temporary Story Bible;
* Story;
* Scenes;
* prompts visuais;
* texto da narração.

---

## IA de Imagem

```text
OpenAI
```

Responsável pela geração das imagens.

As imagens do MVP devem ser geradas em proporção:

```text
9:16
```

Motivo:

* mobile-first;
* player imersivo;
* melhor aproveitamento da tela vertical em smartphones.

---

## Narração

```text
OpenAI TTS
```

Responsável pela geração dos áudios narrados.

---

## Música

```text
Biblioteca Local
```

O MVP não utiliza IA para geração musical.

As trilhas são 3 arquivos MP3 fixos.

A seleção da música de fundo será aleatória.

---

# Arquitetura de Alto Nível

```text
Mobile Browser
        │
        ▼
Next.js Frontend
        │
        ▼
Next.js Backend
        │
 ┌──────┴──────────────┐
 ▼                     ▼
OpenAI        Biblioteca Local
```

---

# Fluxo de Geração

## Passo 1

Usuário inicia aventura.

```text
Selecionar Criança
↓
Escolher Tema
↓
Gerar História
```

---

## Passo 2

Criar Story Request.

```text
status = pending
```

---

## Passo 3

Iniciar processamento.

```text
status = processing
```

---

## Passo 4

Gerar Temporary Story Bible.

No MVP, a Temporary Story Bible existe apenas em runtime durante a geração.

Exemplo:

```text
Protagonista
Tema
Companion
Visual Style
Narrative Style
```

---

## Passo 5

Gerar Story.

Resultado:

```text
5 cenas
```

---

## Passo 6

Gerar prompts visuais.

```text
Scene 1 → Prompt
Scene 2 → Prompt
Scene 3 → Prompt
Scene 4 → Prompt
Scene 5 → Prompt
```

Os prompts visuais devem orientar a geração para imagens verticais em proporção 9:16.

---

## Passo 7

Gerar imagens.

```text
4 a 5 imagens
```

Todas as imagens da história devem seguir a proporção 9:16.

---

## Passo 8

Gerar narrações.

```text
5 áudios
```

---

## Passo 9

Selecionar trilha sonora.

```text
Track 1
ou
Track 2
ou
Track 3
```

Seleção aleatória.

---

## Passo 10

Concluir resultado em memória para consumo imediato.

```text
status = completed
```

---

## Passo 11

Redirecionar para o Player.

---

# Estados da Geração

Cada Story Request possui:

```text
pending
processing
completed
failed
```

---

# Tela de Preparação

Enquanto o status estiver:

```text
processing
```

o usuário permanece na Tela de Preparação.

A tela apresenta:

* mensagens narrativas;
* animações leves;
* feedback visual.

Não exibe detalhes técnicos.

---

# Player

## Objetivo

Consumir a experiência gerada.

---

## Estrutura

Cada cena apresenta:

```text
Imagem
+
Texto
+
Narração
```

A história também possui:

```text
Música de fundo
```

executada durante toda a experiência.

A interface do MVP deve ser simples, mas lúdica, convidativa e adequada para a hora de dormir.

Ela deve priorizar clareza, acolhimento e baixo atrito, sem parecer uma ferramenta técnica.

---

## Navegação

```text
Cena 1
↓
Cena 2
↓
Cena 3
↓
Cena 4
↓
Cena 5
```

---

## Modo Imersivo

O Player deve operar em modo tela cheia.

A imagem é o elemento principal da interface.

Elementos de navegação devem ser discretos.

A experiência deve ocupar toda a tela disponível.

Em smartphones e tablets, o modo imersivo é a experiência padrão.

---

## Proporção Visual

O Player deve ser otimizado para imagens verticais em proporção:

```text
9:16
```

A imagem da cena deve preencher a maior área possível da tela sem comprometer a leitura do texto e os controles essenciais.

A experiência não deve parecer um card centralizado dentro de uma página tradicional.

---

# Engine de Áudio

## Componentes

```text
Narration Audio
+
Background Music
```

---

## Regras

Narration:

```text
Volume: 100%
```

Background Music:

```text
Volume: 15% a 20%
```

A música nunca deve competir com a narração.

---

## Sincronização

A trilha sonora inicia junto com a história.

A reprodução continua durante toda a experiência.

Mudanças de cena não reiniciam a música.

---

# Soundtrack Engine

## Biblioteca do MVP

```text
soundtrack-01.mp3
soundtrack-02.mp3
soundtrack-03.mp3
```

---

## Seleção

```text
Seleção aleatória
```

---

## Regras

* uma trilha por história;
* sem geração por IA;
* sem associação temática;
* reprodução contínua.

---

## Evolução V2

Possível arquitetura futura:

```text
Theme
↓
Music Profile
↓
Soundtrack Selection
```

Exemplos:

```text
Piratas
↓
Adventure Music

Espaço
↓
Cosmic Ambient

Fazenda
↓
Country Ambient

Fundo do Mar
↓
Ocean Ambient
```

---

# PWA

O MVP deve ser preparado para:

```text
Add to Home Screen
```

em smartphones e tablets.

Não haverá necessidade inicial de publicação em lojas.

---

# Modelo de Persistência

Não existe modelo de persistência no MVP.

Os modelos abaixo ficam reservados para uma versão futura.

## ChildProfile

Dados da criança.

---

## StorySession

Sessão atual.

Máximo:

```text
3 histórias
```

---

## StoryRequest

Controle da geração.

---

## TemporaryStoryBible

Contexto compartilhado da sessão.

---

## Story

História completa.

---

## Scene

Unidade principal do domínio.

Campos relacionados à imagem devem preservar a expectativa de proporção 9:16.

---

## Soundtrack

Trilha sonora associada à Story.

---

# Estratégia de Escalabilidade

Não será implementada no MVP.

Tecnologias como:

* Redis;
* BullMQ;
* Event Bus;
* Workers dedicados;

ficam reservadas para futura necessidade de escala.

---

# Observabilidade

O MVP deve registrar:

* início da geração;
* falhas;
* duração da geração;
* conclusão.

Logs simples são suficientes.

---

# Segurança

As chaves da OpenAI nunca devem ficar expostas no frontend.

Toda comunicação com OpenAI ocorre exclusivamente no backend.

---

# Decisão Arquitetural Principal

A geração da experiência é assíncrona.

A unidade principal do domínio é a Scene.

A experiência é composta por:

* narrativa;
* 4 a 5 imagens 9:16;
* narração;
* texto;
* música de fundo.

O produto é construído para criar experiências completas para a hora de dormir, consumidas em modo imersivo e prioritariamente em dispositivos móveis.

No MVP, não há banco de dados, login, cadastro, histórico ou persistência de StoryBible.
