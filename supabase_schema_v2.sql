-- ============================================================
--  COLÉGIO PLENUS – Schema v2
--  Execute no SQL Editor do Supabase
-- ============================================================

-- ---- Helper: verifica se o usuário logado é colaborador ativo ----
CREATE OR REPLACE FUNCTION is_colaborador()
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM colaboradores WHERE id = auth.uid() AND ativo = TRUE
  );
$$;

-- ---- Helper: busca usuário pelo e-mail (acessa auth.users) --------
CREATE OR REPLACE FUNCTION lookup_user_by_email(p_email TEXT)
RETURNS TABLE (user_id UUID, user_nome TEXT, user_telefone TEXT)
LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT u.id, usr.nome, usr.telefone
  FROM auth.users u
  LEFT JOIN usuarios usr ON usr.id = u.id
  WHERE u.email = p_email
  LIMIT 1;
$$;

-- ============================================================
--  COLABORADORES
-- ============================================================
CREATE TABLE IF NOT EXISTS colaboradores (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome       TEXT NOT NULL,
  cargo      TEXT NOT NULL DEFAULT 'colaborador',
  ativo      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE colaboradores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "col_ver_proprio"    ON colaboradores FOR SELECT USING (auth.uid() = id);
CREATE POLICY "col_ver_todos"      ON colaboradores FOR SELECT USING (is_colaborador());
CREATE POLICY "col_inserir"        ON colaboradores FOR INSERT WITH CHECK (is_colaborador());
CREATE POLICY "col_atualizar"      ON colaboradores FOR UPDATE USING (is_colaborador());

-- ============================================================
--  ANOS LETIVOS
-- ============================================================
CREATE TABLE IF NOT EXISTS anos_letivos (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ano        INTEGER NOT NULL UNIQUE,
  ativo      BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE anos_letivos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "al_select"    ON anos_letivos FOR SELECT USING (TRUE);
CREATE POLICY "al_colab_all" ON anos_letivos FOR ALL
  USING (is_colaborador()) WITH CHECK (is_colaborador());

-- Apenas um ano ativo por vez
CREATE OR REPLACE FUNCTION fn_single_active_ano()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.ativo = TRUE THEN
    UPDATE anos_letivos SET ativo = FALSE WHERE id <> NEW.id;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_single_active_ano ON anos_letivos;
CREATE TRIGGER trg_single_active_ano
BEFORE INSERT OR UPDATE ON anos_letivos
FOR EACH ROW EXECUTE FUNCTION fn_single_active_ano();

-- ============================================================
--  TURMAS
-- ============================================================
CREATE TABLE IF NOT EXISTS turmas (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ano_letivo_id UUID REFERENCES anos_letivos(id) ON DELETE CASCADE NOT NULL,
  segmento      TEXT NOT NULL
    CHECK (segmento IN ('educacao_infantil','fundamental1','fundamental2','ensino_medio')),
  serie         TEXT NOT NULL,
  nome_turma    TEXT NOT NULL,
  capacidade    INTEGER NOT NULL DEFAULT 30 CHECK (capacidade > 0),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (ano_letivo_id, segmento, serie, nome_turma)
);

ALTER TABLE turmas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "turmas_select"    ON turmas FOR SELECT USING (TRUE);
CREATE POLICY "turmas_colab_all" ON turmas FOR ALL
  USING (is_colaborador()) WITH CHECK (is_colaborador());

-- ============================================================
--  ALOCAÇÕES
-- ============================================================
CREATE TABLE IF NOT EXISTS alocacoes (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  aluno_id       UUID REFERENCES alunos(id) ON DELETE CASCADE NOT NULL UNIQUE,
  turma_id       UUID REFERENCES turmas(id) ON DELETE CASCADE NOT NULL,
  colaborador_id UUID REFERENCES colaboradores(id) NOT NULL,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE alocacoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "aloc_select"    ON alocacoes FOR SELECT USING (TRUE);
CREATE POLICY "aloc_colab_all" ON alocacoes FOR ALL
  USING (is_colaborador()) WITH CHECK (is_colaborador());

-- ============================================================
--  LOGS
-- ============================================================
CREATE TABLE IF NOT EXISTS logs (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id   UUID,
  nome_usuario TEXT,
  tipo_usuario TEXT CHECK (tipo_usuario IN ('responsavel','colaborador')),
  acao         TEXT NOT NULL,
  entidade     TEXT,
  entidade_id  TEXT,
  descricao    TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "logs_inserir"       ON logs FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "logs_colab_select"  ON logs FOR SELECT  USING (is_colaborador());

-- ============================================================
--  RLS ADICIONAIS EM TABELAS EXISTENTES (para colaboradores)
-- ============================================================
CREATE POLICY "colab_ver_solicitacoes"  ON interesse_vagas FOR SELECT USING (is_colaborador());
CREATE POLICY "colab_editar_status"     ON interesse_vagas FOR UPDATE USING (is_colaborador());
CREATE POLICY "colab_ver_alunos"        ON alunos          FOR SELECT USING (is_colaborador());
CREATE POLICY "colab_ver_usuarios"      ON usuarios        FOR SELECT USING (is_colaborador());

-- Adiciona coluna e-mail à tabela usuarios (se não existir)
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS email TEXT;

-- ============================================================
--  BOOTSTRAP DO PRIMEIRO ADMIN
--  Após rodar este SQL, vá em Table Editor → colaboradores e
--  insira manualmente:
--    id     = UUID do usuário criado via cadastro.html
--    nome   = seu nome
--    cargo  = 'admin'
--    ativo  = true
-- ============================================================
