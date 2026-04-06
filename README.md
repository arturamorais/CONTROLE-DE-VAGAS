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
- Perfil com nome, telefone, alteração de e-mail e alteração de senha

### Painel de Gestão (Colaboradores)
- Visão geral com totais por status e ações rápidas
- Listagem de todas as solicitações com busca e filtro por status
- Fluxo de status controlado por etapas (veja fluxo abaixo)
- Badge de SLA — indica há quantos dias cada solicitação está sem resposta
- Avaliação individual de cada aluno dentro da solicitação
- Matrícula individual por aluno quando há múltiplos alunos na solicitação
- Indicação de enturmação no modal de detalhe de cada aluno
- Notas internas no histórico de cada solicitação
- Guias de orientação contextuais por status
- Enturmar: criação de turmas, alocação de alunos aprovados e visualização por turma
- Relatório analítico com KPIs e gráficos (status, segmentos, séries, turnos, evolução mensal, enturmação, motivos)
- Relatório rápido por turma com lista de alunos e impressão
- Exportação de dados em CSV
- Registro de atividade completo (logs com filtros)
- Notificação automática de solicitações pendentes ao abrir o painel

### Cadastros
- **Responsáveis**: listagem, edição de nome/e-mail/telefone, exclusão permanente, links de acesso
- **Alunos**: listagem vinculada ao responsável, edição, exclusão

### Gerenciamento de Colaboradores (Master/Admin)
- Cadastro de colaboradores feito exclusivamente pelo Master
- Criação cria a conta diretamente (sem necessidade de cadastro prévio)
- Senha temporária gerada automaticamente e exibida para o Master compartilhar
- Alteração de nome, e-mail e cargo
- Geração de nova senha temporária pelo painel
- Ativar/desativar colaborador
- Exclusão permanente (remove de `auth.users` e todas as tabelas vinculadas)
- Perfil do colaborador: nome, telefone, e-mail e senha alteráveis

---

## Papéis de usuário

| Papel | Acesso |
|---|---|
| **Responsável** | Portal `inicio.html` — criar e acompanhar solicitações |
| **Colaborador** | Painel `admin.html` — gerenciar solicitações, turmas e relatórios |
| **Admin** | Tudo do colaborador + gerenciar equipe e cadastros |
| **Master** | Tudo do admin + cadastrar/excluir colaboradores |

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
  [MATRICULADO] ── matrícula individual por aluno
        ↓
  [CANCELADO] ── motivo obrigatório ── pode reabrir para Pendente
```

### Status disponíveis

| Status | Badge | Transições permitidas |
|---|---|---|
| Pendente | amarelo | → Em Análise, → Aprovado |
| Em Análise | azul | → Pendente, → Aprovado, → Reprovado |
| Aprovado | verde | → Matriculado (individual), → Cancelado |
| Aprovado com Ressalvas | verde claro | Quando parte dos alunos foi matriculada |
| Reprovado | vermelho | → Pendente |
| Matriculado | ciano | → Cancelado (motivo obrigatório) |
| Cancelado | roxo | → Pendente (reabrir) |

---

## Estrutura de Arquivos

```
├── index.html          # Tela de login
├── cadastro.html       # Cadastro de novo usuário
├── inicio.html         # Portal do responsável
├── admin.html          # Painel de gestão (colaboradores)
├── reset-senha.html    # Redefinição de senha
├── manifest.json       # PWA manifest
├── sw.js               # Service Worker (cache offline) — deve ficar na raiz
├── css/
│   ├── dashboard.css   # Estilos do painel e portal
│   └── estilo.css      # Estilos da tela de login/cadastro
└── js/
    ├── supabase.js     # Configuração do cliente Supabase + utilitários globais
    ├── auth.js         # Login, cadastro e recuperação de senha
    ├── dashboard.js    # Lógica do portal do responsável
    └── admin.js        # Lógica do painel de gestão
```

> O `sw.js` precisa ficar na raiz. O Service Worker só controla páginas no mesmo nível ou abaixo.

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
| `usuarios` | Responsáveis cadastrados (nome, email, telefone) |
| `colaboradores` | Membros da equipe com acesso ao painel |
| `interesse_vagas` | Solicitações de vaga |
| `alunos` | Alunos vinculados a cada solicitação |
| `turmas` | Turmas criadas pela equipe |
| `anos_letivos` | Ano letivo ativo |
| `alocacoes` | Vínculo aluno ↔ turma |
| `historico_solicitacoes` | Timeline de cada solicitação |
| `logs` | Registro de todas as ações do sistema |

### Constraints de status

```sql
-- interesse_vagas
ALTER TABLE public.interesse_vagas
  DROP CONSTRAINT IF EXISTS interesse_vagas_status_check;
ALTER TABLE public.interesse_vagas
  ADD CONSTRAINT interesse_vagas_status_check
  CHECK (status IN ('pendente','em_analise','aprovado','reprovado','cancelado','matriculado'));

-- alunos
ALTER TABLE public.alunos
  DROP CONSTRAINT IF EXISTS alunos_status_aluno_check;
ALTER TABLE public.alunos
  ADD CONSTRAINT alunos_status_aluno_check
  CHECK (status_aluno IN ('pendente','aprovado','reprovado','matriculado'));
```

### Funções RPC (SECURITY DEFINER)

```sql
-- Excluir usuário permanentemente (public.usuarios → auth.users)
CREATE OR REPLACE FUNCTION excluir_usuario_permanente(user_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  DELETE FROM public.usuarios WHERE id = user_id;
  DELETE FROM auth.users WHERE id = user_id;
END;
$$;

-- Alterar e-mail em auth.users e public.usuarios
CREATE OR REPLACE FUNCTION alterar_email_usuario(p_user_id uuid, p_novo_email text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE auth.users SET email = p_novo_email, email_confirmed_at = now() WHERE id = p_user_id;
  UPDATE public.usuarios SET email = p_novo_email WHERE id = p_user_id;
END;
$$;

-- Criar colaborador com senha temporária
CREATE OR REPLACE FUNCTION criar_colaborador(p_email text, p_nome text, p_cargo text)
RETURNS json LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_user_id uuid;
  v_temp_senha text;
BEGIN
  SELECT id INTO v_user_id FROM auth.users WHERE email = p_email;
  IF v_user_id IS NOT NULL THEN
    RAISE EXCEPTION 'E-mail já cadastrado no sistema';
  END IF;

  v_temp_senha := 'Plenus@' || upper(substring(gen_random_uuid()::text, 1, 6));

  INSERT INTO auth.users (
    id, instance_id, aud, role,
    email, encrypted_password, email_confirmed_at,
    created_at, updated_at,
    raw_app_meta_data, raw_user_meta_data, is_super_admin,
    confirmation_token, recovery_token, email_change_token_new, email_change
  ) VALUES (
    gen_random_uuid(), '00000000-0000-0000-0000-000000000000',
    'authenticated', 'authenticated',
    p_email, extensions.crypt(v_temp_senha, extensions.gen_salt('bf', 10)),
    now(), now(), now(),
    '{"provider":"email","providers":["email"]}', '{}', false,
    '', '', '', ''
  )
  RETURNING id INTO v_user_id;

  INSERT INTO public.usuarios (id, nome, email, criado_em) VALUES (v_user_id, p_nome, p_email, now());
  INSERT INTO public.colaboradores (id, nome, cargo, ativo) VALUES (v_user_id, p_nome, p_cargo, true);

  RETURN json_build_object('id', v_user_id, 'senha_temporaria', v_temp_senha);
END;
$$;

-- Redefinir senha de colaborador (gera nova senha temporária)
CREATE OR REPLACE FUNCTION redefinir_senha_colaborador(p_user_id uuid)
RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_temp_senha text;
BEGIN
  v_temp_senha := 'Plenus@' || upper(substring(gen_random_uuid()::text, 1, 6));
  UPDATE auth.users
    SET encrypted_password = extensions.crypt(v_temp_senha, extensions.gen_salt('bf', 10)),
        updated_at = now()
  WHERE id = p_user_id;
  RETURN v_temp_senha;
END;
$$;
```

### RLS (Row Level Security)

```sql
ALTER TABLE public.usuarios               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.colaboradores          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interesse_vagas        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alunos                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.historico_solicitacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.turmas                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alocacoes              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anos_letivos           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.logs                   ENABLE ROW LEVEL SECURITY;

-- Função auxiliar
CREATE OR REPLACE FUNCTION public.is_colaborador()
RETURNS boolean LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (SELECT 1 FROM public.colaboradores WHERE id = auth.uid() AND ativo = true);
$$;
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

---

## PWA — Instalar no celular

- **Android**: Chrome → menu (⋮) → "Adicionar à tela inicial"
- **iOS**: Safari → compartilhar → "Adicionar à Tela de Início"

---

## Licença

Projeto desenvolvido para uso interno do **Colégio Plenus**.
