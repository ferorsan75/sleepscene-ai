# SleepScene AI — Schema Document

## Objetivo

Este documento define o modelo inicial de persistência do MVP do SleepScene AI.

O objetivo é transformar o domínio aprovado em uma estrutura de dados simples, coerente e preparada para evolução futura.

Banco alvo:

```text
Supabase PostgreSQL
```

---

# Princípios do Schema

## Princípio 1

O schema do MVP deve ser simples.

Não serão modeladas entidades futuras como Character Bible persistente, Story Universe persistente ou memória entre dias.

---

## Princípio 2

A unidade principal do domínio é a Scene.

A Story organiza uma sequência de cinco Scenes.

---

## Princípio 3

A geração é assíncrona.

Por isso, StoryRequest precisa possuir status de processamento.

---

## Princípio 4

As imagens do MVP usam proporção 9:16.

Essa decisão deve ser refletida nos campos de imagem e nos prompts visuais.

---

## Princípio 5

A trilha sonora é associada à Story, não à Scene.

---

# Tabelas do MVP

## child_profiles

Representa uma criança cadastrada pelo responsável.

### Campos

```text
id uuid primary key
name text not null
age integer not null
interests text[] not null default '{}'
is_archived boolean not null default false
created_at timestamp with time zone not null default now()
updated_at timestamp with time zone not null default now()
```

### Regras

* uma criança pode ter várias StorySessions;
* crianças arquivadas não aparecem no fluxo principal;
* a criança é sempre protagonista das histórias.

---

## story_sessions

Representa uma sessão contínua de histórias.

### Campos

```text
id uuid primary key
child_profile_id uuid not null references child_profiles(id)
story_count integer not null default 0
status text not null default 'active'
created_at timestamp with time zone not null default now()
ended_at timestamp with time zone
```

### Status possíveis

```text
active
completed
abandoned
```

### Regras

* uma sessão pertence a uma criança;
* uma sessão pode conter no máximo 3 histórias;
* a continuidade narrativa existe apenas dentro da sessão.

---

## temporary_story_bibles

Representa o contexto narrativo temporário da sessão.

### Campos

```text
id uuid primary key
story_session_id uuid not null references story_sessions(id)
protagonist jsonb not null
theme text not null
companion jsonb
locations jsonb not null default '[]'
visual_style text not null
narrative_style text not null
created_at timestamp with time zone not null default now()
updated_at timestamp with time zone not null default now()
```

### Regras

* uma StorySession possui uma TemporaryStoryBible;
* a TemporaryStoryBible pode evoluir durante a sessão;
* não é usada como memória permanente entre dias.

---

## story_requests

Controla o processo assíncrono de geração.

### Campos

```text
id uuid primary key
story_session_id uuid not null references story_sessions(id)
child_profile_id uuid not null references child_profiles(id)
theme text not null
status text not null default 'pending'
error_message text
created_at timestamp with time zone not null default now()
started_at timestamp with time zone
completed_at timestamp with time zone
failed_at timestamp with time zone
```

### Status possíveis

```text
pending
processing
completed
failed
```

### Regras

* cada StoryRequest gera uma Story;
* a Tela de Preparação acompanha este status;
* erros técnicos devem ser registrados em error_message.

---

## soundtracks

Representa as trilhas sonoras disponíveis no MVP.

### Campos

```text
id uuid primary key
name text not null
audio_url text not null
duration_seconds integer
is_active boolean not null default true
created_at timestamp with time zone not null default now()
```

### Regras

* o MVP possui 3 trilhas ativas;
* a seleção é aleatória;
* não existe associação temática no MVP;
* não existe geração de música por IA no MVP.

---

## stories

Representa uma história completa.

### Campos

```text
id uuid primary key
story_session_id uuid not null references story_sessions(id)
story_request_id uuid not null references story_requests(id)
child_profile_id uuid not null references child_profiles(id)
soundtrack_id uuid not null references soundtracks(id)
title text not null
summary text
duration_seconds integer not null default 300
created_at timestamp with time zone not null default now()
```

### Regras

* uma Story possui exatamente 5 Scenes;
* duração alvo: 300 segundos;
* uma Story possui exatamente uma Soundtrack.

---

## scenes

Representa uma cena da história.

### Campos

```text
id uuid primary key
story_id uuid not null references stories(id)
scene_order integer not null
title text not null
narrative_text text not null
narration_text text not null
image_prompt text not null
image_url text
image_aspect_ratio text not null default '9:16'
audio_url text
duration_seconds integer not null default 60
created_at timestamp with time zone not null default now()
```

### Regras

* cada Story possui exatamente 5 Scenes;
* scene_order deve variar de 1 a 5;
* cada Scene representa aproximadamente 60 segundos;
* cada imagem deve seguir proporção 9:16;
* narrativa, imagem e narração devem representar o mesmo momento da história.

---

# Relacionamentos

```text
child_profiles
    │
    └── story_sessions
            │
            ├── temporary_story_bibles
            │
            ├── story_requests
            │
            └── stories
                    │
                    ├── soundtracks
                    │
                    └── scenes
```

---

# Constraints Recomendadas

## scenes.scene_order

```sql
check (scene_order >= 1 and scene_order <= 5)
```

## stories.duration_seconds

```sql
check (duration_seconds = 300)
```

## scenes.duration_seconds

```sql
check (duration_seconds >= 45 and duration_seconds <= 75)
```

## story_requests.status

```sql
check (status in ('pending', 'processing', 'completed', 'failed'))
```

## story_sessions.status

```sql
check (status in ('active', 'completed', 'abandoned'))
```

## scenes.image_aspect_ratio

```sql
check (image_aspect_ratio = '9:16')
```

---

# Índices Recomendados

```sql
create index idx_child_profiles_archived
on child_profiles(is_archived);

create index idx_story_sessions_child_profile
on story_sessions(child_profile_id);

create index idx_story_requests_status
on story_requests(status);

create index idx_stories_child_profile
on stories(child_profile_id);

create index idx_stories_story_session
on stories(story_session_id);

create index idx_scenes_story_order
on scenes(story_id, scene_order);
```

---

# Dados Iniciais

A tabela `soundtracks` deve ser populada com 3 trilhas iniciais.

Exemplo:

```text
Sleep Theme 01
Sleep Theme 02
Sleep Theme 03
```

Arquivos sugeridos:

```text
soundtrack-01.mp3
soundtrack-02.mp3
soundtrack-03.mp3
```

---

# Fora do Escopo do Schema do MVP

Não serão criadas no MVP:

* tabela de usuários avançada;
* billing;
* subscriptions;
* character_bibles persistentes;
* story_universes persistentes;
* character_versions;
* daily_contexts;
* thematic_music_profiles;
* music_tags;
* app_store_devices.

---

# Decisão Principal do Schema

A Story organiza a experiência.

A Scene é a unidade principal de conteúdo.

A Soundtrack pertence à Story.

A TemporaryStoryBible pertence à StorySession e existe apenas para manter coerência durante a sessão atual.
