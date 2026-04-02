-- ============================================================
--  COLÉGIO PLENUS – Schema v7 (Enturmar: anos_letivos, turmas, alocacoes)
--  Execute no SQL Editor do Supabase
--  Este script é idempotente: pode rodar várias vezes sem erro.
-- ============================================================

-- ============================================================
--  COLABORADORES (recria se necessário)
-- ============================================================
CREATE TABLE IF NOT EXISTS colaboradores (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome       TEXT NOT NULL,
  cargo      TEXT NOT NULL DEFAULT 'colaborador',
  ativo      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE colaboradores ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "col_ver_proprio"   ON colaboradores;
DROP POLICY IF EXISTS "col_ver_todos"     ON colaboradores;
DROP POLICY IF EXISTS "col_inserir"       ON colaboradores;
DROP POLICY IF EXISTS "col_atualizar"     ON colaboradores;

CREATE POLICY "col_ver_proprio" ON colaboradores FOR SELECT USING (auth.uid() = id);
CREATE POLICY "col_ver_todos"   ON colaboradores FOR SELECT USING (is_colaborador());
CREATE POLICY "col_inserir"     ON colaboradores FOR INSERT  WITH CHECK (is_colaborador());
CREATE POLICY "col_atualizar"   ON colaboradores FOR UPDATE  USING (is_colaborador());

-- ============================================================
--  FUNÇÃO is_colaborador (deve vir DEPOIS da tabela colaboradores)
-- ============================================================
CREATE OR REPLACE FUNCTION is_colaborador()
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM colaboradores WHERE id = auth.uid() AND ativo = TRUE
  );
$$;

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

DROP POLICY IF EXISTS "al_select"    ON anos_letivos;
DROP POLICY IF EXISTS "al_colab_all" ON anos_letivos;

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

DROP POLICY IF EXISTS "turmas_select"    ON turmas;
DROP POLICY IF EXISTS "turmas_colab_all" ON turmas;

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

DROP POLICY IF EXISTS "aloc_select"    ON alocacoes;
DROP POLICY IF EXISTS "aloc_colab_all" ON alocacoes;

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

DROP POLICY IF EXISTS "logs_inserir"      ON logs;
DROP POLICY IF EXISTS "logs_colab_select" ON logs;

CREATE POLICY "logs_inserir"      ON logs FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "logs_colab_select" ON logs FOR SELECT  USING (is_colaborador());

-- ============================================================
--  RLS ADICIONAIS EM TABELAS EXISTENTES
-- ============================================================
DROP POLICY IF EXISTS "colab_ver_solicitacoes"  ON interesse_vagas;
DROP POLICY IF EXISTS "colab_editar_status"     ON interesse_vagas;
DROP POLICY IF EXISTS "colab_ver_alunos"        ON alunos;
DROP POLICY IF EXISTS "colab_atualizar_alunos"  ON alunos;
DROP POLICY IF EXISTS "colab_ver_usuarios"      ON usuarios;

CREATE POLICY "colab_ver_solicitacoes" ON interesse_vagas FOR SELECT USING (is_colaborador());
CREATE POLICY "colab_editar_status"    ON interesse_vagas FOR UPDATE USING (is_colaborador());
CREATE POLICY "colab_ver_alunos"       ON alunos          FOR SELECT USING (is_colaborador());
CREATE POLICY "colab_atualizar_alunos" ON alunos          FOR UPDATE USING (is_colaborador());
CREATE POLICY "colab_ver_usuarios"     ON usuarios        FOR SELECT USING (is_colaborador());

-- Coluna email na tabela usuarios
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS email TEXT;

-- Colunas de status individual nos alunos
ALTER TABLE alunos
  ADD COLUMN IF NOT EXISTS status_aluno      TEXT DEFAULT 'pendente'
    CHECK (status_aluno IN ('pendente', 'aprovado', 'reprovado')),
  ADD COLUMN IF NOT EXISTS motivo_reprovacao TEXT;

-- Recarrega schema cache
NOTIFY pgrst, 'reload schema';
