# Colégio Plenus — Sistema de Controle de Vagas

Sistema web completo para gerenciamento de solicitações de vagas escolares. Permite que responsáveis solicitem vagas para seus filhos e que a equipe administrativa avalie, aprove ou efetive cada matrícula.

---

## Funcionalidades

### Portal do Responsável
- Cadastro e login com e-mail e senha
- Recuperação e redefinição de senha por e-mail
- Solicitação de vagas com dados dos alunos (segmento, série, turno)
- Informações financeiras: mensalidade atual, desconto almejado, permuta
- Acompanhamento de status em tempo real
- Histórico de atualizações por solicitação
- Edição de solicitações pendentes
- Perfil com nome, telefone e alteração de e-mail

### Painel de Gestão (Colaboradores)
- Visão geral com totais por status e ações rápidas
- Página com todas as solicitações: busca por nome, e-mail ou aluno e filtro por status
- Fluxo de status controlado por etapas (veja fluxo abaixo)
- Badge de SLA — indica há quantos dias cada solicitação está sem resposta
- Confirmação SweetAlert ao alterar status que impacta todos os alunos
- Avaliação individual de cada aluno dentro da solicitação
- Indicação de enturmação no modal de detalhe de cada aluno
- Notas internas no histórico de cada solicitação
- Guias de orientação contextuais por status
- Enturmar: criação de turmas, alocação de alunos aprovados e visualização dos alunos por turma
- Impressão da lista de alunos por turma
- Relatório analítico com KPIs e gráficos (status, segmentos, séries, turnos, evolução mensal, enturmação, motivos)
- Exportação de dados em CSV
- Registro de atividade completo (logs com filtros)
- Gerenciamento de colaboradores (adicionar, ativar/desativar, alterar cargo) — apenas admins
- Seção de exclusão de dados com confirmação — apenas admins
- Notificação automática de solicitações pendentes ao abrir o painel

---

## Estrutura de Arquivos

```
├── index.html          # Tela de login
├── cadastro.html       # Cadastro de novo usuário
├── inicio.html         # Portal do responsável
├── admin.html          # Painel de gestão (colaboradores)
├── dashboard.html      # Página de apresentação
├── reset-senha.html    # Redefinição de senha
├── manifest.json       # PWA manifest
├── sw.js               # Service Worker (cache offline) — deve ficar na raiz
├── css/
│   ├── dashboard.css   # Estilos do painel e portal
│   └── estilo.css      # Estilos da tela de login/cadastro
└── js/
    ├── supabase.js     # Configuração do cliente Supabase
    ├── auth.js         # Login, cadastro e recuperação de senha
    ├── dashboard.js    # Lógica do portal do responsável
    └── admin.js        # Lógica do painel de gestão
```

> O `sw.js` precisa ficar na raiz. O Service Worker só controla páginas no mesmo nível ou abaixo — mover para `js/` quebraria o PWA.

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML / CSS / JavaScript | Frontend puro, sem frameworks |
| [Supabase](https://supabase.com) | Banco de dados (PostgreSQL), autenticação e API REST |
| [SweetAlert2](https://sweetalert2.github.io) | Modais e notificações |
| [Chart.js](https://www.chartjs.org) | Gráficos do relatório analítico |
| [Inter](https://fonts.google.com/specimen/Inter) | Tipografia (Google Fonts) |
| PWA | Service Worker + manifest para instalação no celular |

---

## Estrutura do Banco (Supabase)

| Tabela | Descrição |
|---|---|
| `usuarios` | Responsáveis cadastrados |
| `colaboradores` | Membros da equipe com acesso ao painel |
| `interesse_vagas` | Solicitações de vaga |
| `alunos` | Alunos vinculados a cada solicitação |
| `turmas` | Turmas criadas pela equipe |
| `anos_letivos` | Ano letivo ativo |
| `alocacoes` | Vínculo aluno ↔ turma (inclui colaborador_id) |
| `historico_solicitacoes` | Timeline de cada solicitação |
| `logs` | Registro de todas as ações do sistema |

### RLS (Row Level Security)
O sistema depende de políticas RLS configuradas no Supabase:
- Responsáveis só acessam suas próprias solicitações
- Colaboradores acessam todos os dados
- Nenhuma operação de escrita crítica é possível sem autenticação

### Constraint de status
A tabela `interesse_vagas` possui uma check constraint no campo `status`. Ao criar o projeto, execute:

```sql
ALTER TABLE public.interesse_vagas
  DROP CONSTRAINT IF EXISTS interesse_vagas_status_check;

ALTER TABLE public.interesse_vagas
  ADD CONSTRAINT interesse_vagas_status_check
  CHECK (status IN ('pendente', 'em_analise', 'aprovado', 'reprovado', 'cancelado', 'matriculado'));
```

---

## Como executar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/arturamorais/CONTROLE-DE-VAGAS.git
   cd CONTROLE-DE-VAGAS
   ```

2. Abra com um servidor local (necessário para o Service Worker funcionar):
   ```bash
   # Com Node.js
   npx serve .

   # Ou com Python
   python -m http.server 8080
   ```

3. Acesse `http://localhost:8080`

> **Não abra diretamente pelo `file://`** — o Service Worker e algumas APIs do Supabase não funcionam sem servidor HTTP.

Para acessar pelo celular na mesma rede Wi-Fi, descubra seu IP local (`ipconfig` no Windows) e acesse `http://SEU_IP:PORTA`.

---

## Configuração do Supabase

### 1. Criar projeto
Crie um projeto em [supabase.com](https://supabase.com) e copie a URL e a `anon key` para `js/supabase.js`.

> A `anon key` é pública por design — o que protege os dados são as políticas RLS. Nunca exponha a `service_role key` no código.

### 2. Criar as tabelas

```sql
create table public.usuarios (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text not null, email text, telefone text,
  created_at timestamptz default now()
);

create table public.colaboradores (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text not null, cargo text not null default 'colaborador',
  ativo boolean not null default true, telefone text
);

create table public.interesse_vagas (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid references public.usuarios(id) on delete cascade,
  status text not null default 'pendente',
  motivo_transferencia text, motivo_escolha_plenus text,
  valor_mensalidade_anterior numeric, taxa_desconto_almejada numeric,
  tem_desconto boolean default false, descricao_desconto text,
  tipo_permuta text default 'nao', descricao_permuta text,
  created_at timestamptz default now(), updated_at timestamptz default now()
);

create table public.alunos (
  id uuid primary key default gen_random_uuid(),
  interesse_id uuid references public.interesse_vagas(id) on delete cascade,
  nome_aluno text not null, segmento text, turma text, turno text,
  status_aluno text default 'pendente', alocado boolean default false,
  motivo_reprovacao text
);

create table public.anos_letivos (
  id uuid primary key default gen_random_uuid(),
  ano integer not null, ativo boolean default false
);

create table public.turmas (
  id uuid primary key default gen_random_uuid(),
  ano_letivo_id uuid references public.anos_letivos(id) on delete cascade,
  segmento text not null, serie text not null,
  nome_turma text not null, turno text not null, capacidade integer default 30
);

create table public.alocacoes (
  id uuid primary key default gen_random_uuid(),
  aluno_id uuid references public.alunos(id) on delete cascade,
  turma_id uuid references public.turmas(id) on delete cascade,
  colaborador_id uuid references public.colaboradores(id)
);

create table public.historico_solicitacoes (
  id uuid primary key default gen_random_uuid(),
  interesse_id uuid references public.interesse_vagas(id) on delete cascade,
  descricao text, autor_nome text, autor_tipo text,
  created_at timestamptz default now()
);

create table public.logs (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid, nome_usuario text, tipo_usuario text,
  acao text, entidade text, entidade_id text, descricao text,
  created_at timestamptz default now()
);
```

### 3. Configurar RLS

```sql
alter table public.usuarios               enable row level security;
alter table public.colaboradores          enable row level security;
alter table public.interesse_vagas        enable row level security;
alter table public.alunos                 enable row level security;
alter table public.historico_solicitacoes enable row level security;
alter table public.turmas                 enable row level security;
alter table public.alocacoes              enable row level security;
alter table public.anos_letivos           enable row level security;
alter table public.logs                   enable row level security;

create or replace function public.is_colaborador()
returns boolean language sql security definer stable as $$
  select exists (
    select 1 from public.colaboradores where id = auth.uid() and ativo = true
  );
$$;
```

### 4. Configurar Authentication
- **Email confirmations**: Habilitar em Authentication → Settings
- **Redirect URLs**: Adicionar `https://seudominio.com/reset-senha.html`
- **Senha mínima**: 8+ caracteres recomendado

### 5. Criar primeiro administrador
```sql
insert into public.colaboradores (id, nome, cargo, ativo)
values ('<UUID_DO_USUARIO>', 'Seu Nome', 'admin', true);
```

---

## PWA — Instalar no celular

O sistema é instalável como app:
- **Android**: Abra no Chrome → menu (⋮) → "Adicionar à tela inicial"
- **iOS**: Abra no Safari → compartilhar → "Adicionar à Tela de Início"

---

## Fluxo de status de uma solicitação

```
Responsável cria solicitação
        ↓
   [PENDENTE] ←─────────────────────────┐
        ↓                               │
  [EM ANÁLISE] ────── pode voltar ──────┘
        ↓
  [APROVADO] ou [REPROVADO] ── pode voltar para Pendente
        ↓ (se aprovado)
  Colaborador enturma o(s) aluno(s)
        ↓
  [MATRICULADO] ── confirma matrícula com nota de turma
        ↓
  [CANCELADO] ── pode reabrir para Pendente
```

### Status disponíveis

| Status | Badge | Transições permitidas |
|---|---|---|
| Pendente | amarelo | → Em Análise, → Aprovado |
| Em Análise | azul | → Pendente, → Aprovado, → Reprovado |
| Aprovado | verde | → Matriculado, → Cancelado |
| Reprovado | vermelho | → Pendente |
| Matriculado | ciano | → Cancelado |
| Cancelado | roxo | → Pendente (reabrir) |

---

## Papéis de usuário

| Papel | Acesso |
|---|---|
| **Responsável** | Portal `inicio.html` — criar e acompanhar solicitações |
| **Colaborador** | Painel `admin.html` — gerenciar solicitações, turmas e relatórios |
| **Administrador** | Tudo do colaborador + gerenciar equipe e excluir dados |

---

## Licença

Projeto desenvolvido para uso interno do **Colégio Plenus**.
