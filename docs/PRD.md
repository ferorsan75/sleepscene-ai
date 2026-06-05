# SleepScene AI — Product Requirements Document (PRD)

## Objetivo

SleepScene AI é uma plataforma de experiências narrativas infantis para a hora de dormir.

O produto utiliza IA para criar histórias personalizadas compostas por narrativa, imagens, narração e trilha sonora, apresentadas em formato de cenas.

O objetivo do MVP é validar se pais e responsáveis percebem valor em uma experiência personalizada de aproximadamente cinco minutos para seus filhos.

---

# Público-Alvo

## Usuário Responsável

Pais e responsáveis.

São eles que:

* cadastram crianças;
* iniciam aventuras;
* escolhem temas;
* controlam a experiência.

## Usuário Consumidor

Crianças.

São elas que:

* acompanham as histórias;
* observam as imagens;
* escutam a narração;
* vivenciam a aventura.

---

# Problema

Pais frequentemente desejam proporcionar momentos de conexão antes de dormir, mas nem sempre possuem tempo ou criatividade para inventar histórias novas diariamente.

As soluções atuais normalmente oferecem histórias genéricas ou geração de texto isolada.

SleepScene AI busca transformar esse momento em uma experiência personalizada.

---

# Objetivos do MVP

Permitir que um responsável:

1. Cadastre uma ou mais crianças.
2. Escolha uma criança.
3. Inicie uma aventura.
4. Escolha ou informe um tema.
5. Gere uma história personalizada.
6. Consuma a experiência em formato visual e narrado.
7. Continue a aventura por até três histórias consecutivas.
8. Consulte aventuras anteriores.

---

# Fluxo Principal

## Primeiro Acesso

```text
Abertura
↓
Cadastro da primeira criança
↓
Entrada no sistema
```

Campos:

* Nome
* Idade
* Interesses

Após o primeiro acesso o responsável poderá cadastrar outras crianças através da área de gerenciamento.

---

## Dashboard

Opções disponíveis:

* Nova Aventura
* Histórico
* Gerenciar Crianças

---

## Gerenciar Crianças

Funcionalidades:

* Adicionar criança
* Editar criança
* Arquivar criança

---

## Nova Aventura

Fluxo:

```text
Selecionar Criança
↓
Escolher Tema
↓
Gerar História
↓
Tela de Preparação
↓
Player
```

---

## Seleção de Tema

O responsável poderá:

### Escolher uma sugestão

Exemplos:

* Espaço
* Dinossauros
* Animais
* Minecraft

As sugestões podem ser influenciadas pelos interesses cadastrados.

### Informar tema livre

Exemplos:

* Piratas
* Dragões
* Castelo Encantado
* Fundo do Mar

---

# Geração da História

Ao iniciar uma aventura o sistema cria:

```text
Story Session
↓
Temporary Story Bible
↓
Story
```

A criança cadastrada é sempre a protagonista.

A geração da aventura acontece de forma assíncrona.

---

# Tela de Preparação

Após solicitar uma nova aventura, o usuário é direcionado para uma tela de preparação.

O objetivo desta tela é:

* informar que a aventura está sendo criada;
* entreter a criança durante a espera;
* evitar sensação de travamento ou erro;
* permitir processamento assíncrono da geração.

## Comportamento

Enquanto a aventura é preparada, a interface apresenta mensagens narrativas relacionadas ao processo de criação.

Exemplos:

* ✨ Criando sua aventura...
* 🚀 Preparando os cenários...
* 🎨 Desenhando as imagens...
* 🎙️ Preparando a narração...
* 📖 Sua aventura está quase pronta...

Não é necessário exibir percentuais reais de progresso.

---

## Experiência Visual

A tela deve apresentar animações leves e apropriadas para o contexto infantil.

Exemplos:

* estrelas;
* lua;
* nuvens;
* partículas suaves;
* livro se abrindo.

As animações não dependem de IA e não fazem parte da geração da história.

---

## Finalização

Quando a geração da aventura termina:

```text
Tela de Preparação
↓
Player
```

A transição para o Player ocorre automaticamente.

Não é necessário que o usuário pressione nenhum botão para continuar.

---

## Tratamento de Falhas

Caso algum componente da geração precise ser reprocessado, a tela de preparação permanece ativa exibindo mensagens apropriadas.

O objetivo é evitar exposição de erros técnicos para a criança e para o responsável.

---

# Estrutura da História

Cada história possui:

* duração aproximada de 5 minutos;
* exatamente 5 cenas;
* aproximadamente 1 minuto por cena;
* uma trilha sonora de fundo.

Cada cena possui:

* narrativa;
* imagem;
* narração.

---

# Player

Cada cena apresenta:

* imagem principal;
* reprodução da narração;
* texto da cena.

A transição entre cenas deve respeitar a progressão narrativa.

O Player deve ser otimizado para smartphones e tablets.

---

## Modo Imersivo

O Player deve oferecer modo tela cheia.

Neste modo:

* a experiência ocupa toda a tela do dispositivo;
* a imagem torna-se o elemento principal;
* a narração continua sendo reproduzida normalmente;
* as transições entre cenas permanecem automáticas;
* elementos de navegação devem ser minimizados.

O objetivo é transformar o consumo da história em uma experiência mais próxima de um livro ilustrado animado do que de uma página tradicional de website.

A experiência não deve ficar limitada a um card ou box centralizado dentro da interface.

O modo imersivo deve ser a experiência padrão em smartphones e tablets.

---

## Trilha Sonora

Durante a reprodução da história o sistema deve reproduzir uma trilha sonora de fundo.

Objetivos:

* aumentar a imersão;
* tornar a experiência mais acolhedora;
* reforçar o momento de relaxamento antes de dormir.

Regras:

* uma trilha por história;
* seleção aleatória;
* biblioteca inicial com 3 trilhas;
* reprodução contínua durante toda a história;
* volume inferior ao da narração.

A trilha sonora não deve competir com a voz narradora.

Não haverá geração de música por IA no MVP.

---

# Continuação da Aventura

Ao final da história:

```text
Continuar Aventura
```

fica disponível.

Limite:

* até 3 histórias por sessão.

A continuidade utiliza a mesma Temporary Story Bible.

---

# Histórico

O usuário pode visualizar histórias anteriores.

Informações mínimas:

* título;
* criança;
* tema;
* data de geração.

---

# Regras de Produto

## Regra 1

A criança é sempre a protagonista.

---

## Regra 2

Toda história possui exatamente 5 cenas.

---

## Regra 3

Cada cena possui texto, imagem e narração.

---

## Regra 4

A continuidade existe apenas dentro da StorySession.

---

## Regra 5

Uma sessão pode conter no máximo 3 histórias.

---

## Regra 6

Interesses da criança influenciam a geração.

Não limitam os temas disponíveis.

---

## Regra 7

Toda geração de aventura é assíncrona.

---

## Regra 8

Toda aventura passa obrigatoriamente pela Tela de Preparação antes de chegar ao Player.

---

## Regra 9

O Player deve suportar modo imersivo em tela cheia.

---

## Regra 10

Toda história deve possuir uma trilha sonora de fundo.

---

## Regra 11

A trilha sonora deve ser reproduzida com volume inferior ao da narração.

---

# Critérios de Sucesso do MVP

O MVP será considerado validado se o usuário conseguir:

* cadastrar crianças;
* gerar histórias personalizadas;
* consumir a experiência completa;
* continuar aventuras dentro da mesma sessão;
* acessar o histórico de histórias.

---

# Fora do Escopo do MVP

Não fazem parte da primeira versão:

* assinatura;
* pagamento;
* rede social;
* gamificação;
* ranking;
* comunidade;
* personagens persistentes;
* Character Bible permanente;
* Story Universe persistente;
* memória entre dias;
* geração de música por IA;
* trilhas temáticas por universo narrativo;
* aplicativo nativo;
* publicação em App Store;
* publicação em Google Play.

---

# Evolução Planejada para V2

A trilha sonora poderá evoluir para um sistema contextual.

Exemplos:

* histórias espaciais → atmosfera cósmica;
* histórias de piratas → aventura leve;
* histórias de fazenda → ambiente rural;
* histórias submarinas → ambientação aquática.

A seleção da trilha poderá passar a considerar o universo narrativo da história.

---

# Plataforma

* Web Application
* Mobile First
* PWA Ready

O produto deve funcionar prioritariamente em smartphones e tablets.
