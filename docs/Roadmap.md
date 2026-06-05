# SleepScene AI — Roadmap

## Objetivo

Este documento define a ordem de implementação do MVP do SleepScene AI.

O objetivo é entregar valor o mais cedo possível, reduzindo risco técnico e validando rapidamente a proposta do produto.

---

# Princípios

## Princípio 1

Entregar experiências completas.

Sempre priorizar funcionalidades que aproximem o produto de uma história reproduzível.

---

## Princípio 2

Evitar overengineering.

Não implementar soluções de escala antes da necessidade.

---

## Princípio 3

Validar a experiência principal antes de funcionalidades secundárias.

---

# Visão Geral

```text
Phase 0
Foundation
↓
Phase 1
Child Profiles
↓
Phase 2
Story Generation
↓
Phase 3
Player
↓
Phase 4
History
↓
Phase 5
PWA
↓
MVP Ready
```

---

# Phase 0 — Foundation

## Objetivo

Preparar a infraestrutura básica.

---

## Entregas

### Projeto

* Next.js
* TypeScript
* Tailwind

### Backend

* Supabase
* OpenAI

### Configuração

* variáveis de ambiente
* autenticação básica
* estrutura inicial de pastas

---

## Critério de Conclusão

```text
Projeto executando localmente
Supabase conectado
OpenAI conectado
```

---

# Phase 1 — Child Profiles

## Objetivo

Permitir cadastro de crianças.

---

## Funcionalidades

### Cadastro

* nome
* idade
* interesses

### Gestão

* listar crianças
* editar criança
* arquivar criança

---

## Tabelas

```text
child_profiles
```

---

## Critério de Conclusão

O usuário consegue cadastrar e gerenciar crianças.

---

# Phase 2 — Story Generation

## Objetivo

Gerar histórias completas.

---

## Funcionalidades

### Story Request

Criar solicitação de geração.

---

### Story Bible

Gerar:

* protagonista
* companion
* visual style
* narrative style

---

### Story

Gerar:

* título
* resumo
* 5 cenas

---

### Imagens

Gerar:

* 5 imagens
* formato 9:16

---

### Narração

Gerar:

* 5 áudios

---

### Trilha Sonora

Selecionar:

```text
1 de 3 trilhas
```

---

### Estados

```text
pending
processing
completed
failed
```

---

## Tabelas

```text
story_sessions
temporary_story_bibles
story_requests
stories
scenes
soundtracks
```

---

## Critério de Conclusão

Uma história completa pode ser gerada e armazenada.

---

# Phase 3 — Player

## Objetivo

Consumir a experiência.

---

## Funcionalidades

### Modo Imersivo

* fullscreen
* mobile-first

---

### Reprodução

* imagem
* texto
* narração

---

### Trilha Sonora

* reprodução contínua
* volume reduzido

---

### Navegação

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

### Continuação

Permitir:

```text
Continuar Aventura
```

até o limite de:

```text
3 histórias
```

---

## Critério de Conclusão

Uma criança consegue consumir uma aventura completa.

---

# Phase 4 — Histórico

## Objetivo

Permitir acesso a histórias anteriores.

---

## Funcionalidades

### Lista

* título
* criança
* tema
* data

---

### Visualização

Reabrir história já gerada.

---

## Critério de Conclusão

Histórias anteriores podem ser acessadas novamente.

---

# Phase 5 — PWA

## Objetivo

Transformar o produto em experiência próxima a aplicativo.

---

## Funcionalidades

### Add to Home Screen

Android

iOS

---

### Offline Assets

* ícones
* splash screen
* manifest

---

## Critério de Conclusão

O usuário consegue instalar o SleepScene AI na tela inicial do dispositivo.

---

# MVP Ready

O MVP será considerado pronto quando o usuário conseguir:

```text
Cadastrar criança
↓
Escolher tema
↓
Gerar aventura
↓
Aguardar preparação
↓
Consumir história
↓
Continuar aventura
↓
Consultar histórico
```

---

# Itens Explicitamente Fora do MVP

Não implementar:

```text
Assinaturas
Pagamentos
Gamificação
Comunidade
Comentários
Ranking
Character Bible Persistente
Story Universe Persistente
Memória entre dias
Trilhas temáticas
Geração musical por IA
Aplicativo nativo
```

---

# Ordem Recomendada de Desenvolvimento

## Sprint 1

```text
Foundation
Child Profiles
```

---

## Sprint 2

```text
Story Generation
```

---

## Sprint 3

```text
Player
```

---

## Sprint 4

```text
Histórico
PWA
```

---

# Definição de MVP Validado

O MVP é considerado validado quando uma criança consegue iniciar e concluir uma aventura personalizada de aproximadamente cinco minutos utilizando:

* narrativa;
* imagens;
* narração;
* trilha sonora;

em um dispositivo móvel, através de uma experiência imersiva e contínua.
