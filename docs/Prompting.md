# SleepScene AI — Prompting Document

## Objetivo

Este documento define a arquitetura de prompting do SleepScene AI.

O objetivo é garantir consistência entre:

* narrativa;
* imagens;
* narração;
* continuidade da aventura.

Os prompts descritos neste documento representam a cadeia oficial de geração do MVP.

---

# Princípios

## Princípio 1

A criança é sempre a protagonista.

Toda geração deve posicionar a criança como personagem principal da história.

---

## Princípio 2

A Story Bible é a fonte de verdade narrativa.

Todos os prompts posteriores devem utilizar a Story Bible como contexto.

---

## Princípio 3

Narrativa, imagem e narração devem representar exatamente o mesmo momento da história.

---

## Princípio 4

A experiência é otimizada para crianças em momento de descanso.

O tom deve ser:

* acolhedor;
* seguro;
* positivo;
* imaginativo.

---

## Princípio 5

O objetivo não é gerar histórias épicas.

O objetivo é criar experiências agradáveis para aproximadamente cinco minutos antes de dormir.

---

## Princípio 6

Todos os retornos estruturados devem obedecer aos contratos definidos em AIContracts.md.

---

## Princípio 7

Todos os retornos estruturados devem ser JSON válido.

Não é permitido retornar texto livre em etapas estruturais do pipeline.

---

# Política de Exemplos

Todos os exemplos deste documento devem ser estruturais.

A documentação não deve utilizar:

* nomes específicos;
* personagens específicos;
* interesses específicos;
* temas específicos;
* universos específicos;
* locais específicos.

Devem ser utilizados placeholders representando dados reais fornecidos pelo sistema.

---

# Pipeline Oficial do MVP

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

# Visão Geral do Pipeline

## Story Bible Generator

Responsável por criar o contexto narrativo da sessão.

Produz:

```text
StoryBibleContract
```

---

## Story Generator

Responsável por criar a história completa.

Produz:

```text
StoryContract
```

A Story já contém:

```text
Título
Resumo
5 cenas completas
```

Não existe Scene Generator no MVP.

---

## Image Prompt Generator

Responsável por gerar os prompts utilizados pela IA de imagem.

Produz:

```text
ImagePromptContract
```

---

## Narration Generator

Responsável por gerar o texto otimizado para TTS.

Produz:

```text
NarrationContract
```

---

# Prompt 1 — Story Bible Generator

## Objetivo

Criar o contexto narrativo da StorySession.

---

## Entrada

```json
{
  "childName": "<childName>",
  "childAge": "<childAge>",
  "interests": [
    "<interest1>",
    "<interest2>"
  ],
  "theme": "<selectedTheme>"
}
```

---

## Saída

```text
StoryBibleContract
```

---

## Responsabilidades

Definir:

* protagonista;
* companion;
* estilo visual;
* estilo narrativo;
* elementos recorrentes;
* locais importantes.

---

## Regras

O companion:

* deve ser amigável;
* deve apoiar a criança;
* não deve substituir o protagonismo da criança.

---

## Critérios de Qualidade

A Story Bible deve fornecer contexto suficiente para que:

* todas as cenas sejam coerentes;
* todas as imagens sejam coerentes;
* todas as continuações mantenham consistência.

---

# Prompt 2 — Story Generator

## Objetivo

Gerar a história completa.

---

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

## Responsabilidades

Gerar:

* título;
* resumo;
* duração total;
* cinco cenas completas.

---

## Estrutura Narrativa Recomendada

### Cena 1

Apresentação.

---

### Cena 2

Exploração.

---

### Cena 3

Descoberta.

---

### Cena 4

Resolução.

---

### Cena 5

Encerramento tranquilo.

---

## Regras

A história deve:

* conter exatamente 5 cenas;
* durar aproximadamente 5 minutos;
* possuir início;
* possuir desenvolvimento;
* possuir encerramento adequado.

---

## Critérios de Qualidade

As cinco cenas devem formar uma única narrativa contínua.

Não devem parecer histórias independentes.

---

# Prompt 3 — Image Prompt Generator

## Objetivo

Gerar prompts visuais para cada cena.

---

## Entrada

```text
StoryBibleContract
+
Scene
```

Onde Scene representa uma das cenas já existentes dentro do StoryContract.

---

## Saída

```text
ImagePromptContract
```

---

## Responsabilidades

Transformar a cena em uma descrição visual consistente.

---

## Regras de Consistência

A imagem deve utilizar:

* protagonista da Story Bible;
* companion da Story Bible;
* estilo visual da Story Bible;
* contexto da cena atual.

---

## Regras Visuais

Formato obrigatório:

```text
9:16
```

---

Estilo base:

```text
Children Book Illustration
Bedtime Story Style
Warm Colors
Friendly Atmosphere
```

---

## Regras de Segurança

Nunca gerar:

* violência gráfica;
* terror;
* sangue;
* armas realistas;
* conteúdo inadequado para crianças.

---

## Critérios de Qualidade

A imagem deve permitir que a criança reconheça claramente o momento narrativo representado.

---

# Prompt 4 — Narration Generator

## Objetivo

Transformar o texto da cena em uma versão otimizada para TTS.

---

## Entrada

```text
Scene
```

Onde Scene representa uma das cenas existentes no StoryContract.

---

## Saída

```text
NarrationContract
```

---

## Responsabilidades

Melhorar:

* ritmo;
* pausas;
* naturalidade da leitura;
* clareza.

---

## Regras

A narração deve:

* soar natural;
* ser fácil de compreender;
* evitar frases excessivamente longas;
* manter o mesmo significado da cena original.

---

## Critérios de Qualidade

A narração deve parecer uma leitura agradável feita para uma criança antes de dormir.

---

# Estratégia de Contexto

Todos os geradores posteriores devem receber a Story Bible como contexto obrigatório.

---

## Fluxo Correto

```text
StoryBibleContract
+
Scene
↓
Image Prompt Generator
```

---

```text
StoryBibleContract
+
Scene
↓
Narration Generator
```

---

## Fluxo Incorreto

```text
Scene
↓
Image Prompt Generator
```

---

```text
Scene
↓
Narration Generator
```

---

## Justificativa

A Story Bible garante:

* consistência visual;
* consistência narrativa;
* consistência do protagonista;
* consistência do companion.

---

# Consistência Visual

## MVP

A consistência visual será baseada em:

```text
StoryBibleContract
+
Visual Style
+
Descrição Recorrente
```

---

## V2

Poderá utilizar:

```text
Character Bible
+
Reference Images
+
Persistent Visual Memory
```

---

# Continuidade Narrativa

## Dentro da StorySession

Os prompts devem reutilizar:

* protagonista;
* companion;
* locais;
* elementos recorrentes.

---

## Fora da StorySession

Nenhum contexto é reutilizado.

O MVP não possui memória persistente entre dias.

---

# Soundtrack Strategy

## MVP

A trilha sonora não participa da geração narrativa.

Fluxo:

```text
Story Completed
↓
Random Soundtrack Selection
```

Biblioteca:

```text
3 trilhas
```

Seleção:

```text
Aleatória
```

---

## V2

Possível fluxo:

```text
Theme
↓
Music Profile
↓
Soundtrack Selection
```

---

# Critérios Gerais de Qualidade

Uma geração é considerada válida quando:

* possui exatamente 5 cenas;
* mantém a criança como protagonista;
* mantém consistência visual;
* mantém consistência narrativa;
* possui encerramento adequado;
* é apropriada para crianças;
* pode ser ilustrada em formato 9:16.

---

# Decisão Principal

A Story Bible é a fonte de verdade da geração.

O Story Generator produz a história completa já contendo as cinco cenas detalhadas.

Narrativa, imagem e narração são derivações da Story Bible e devem permanecer consistentes durante toda a StorySession.

Não existe Scene Generator no MVP.
