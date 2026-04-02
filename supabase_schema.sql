-- =============================================================
--  COLÉGIO PLENUS – Schema Supabase
--  Execute este arquivo no SQL Editor do Supabase
-- =============================================================

-- Tabela de solicitações de vagas
CREATE TABLE IF NOT EXISTS interesse_vagas (
  id                        UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id                UUID        REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  motivo_transferencia      TEXT,
  motivo_escolha_plenus     TEXT,
  valor_mensalidade_anterior NUMERIC(10, 2),
  tem_desconto              BOOLEAN     DEFAULT FALSE,
  descricao_desconto        TEXT,
  taxa_desconto_almejada    NUMERIC(5, 2),
  tipo_permuta              TEXT        DEFAULT 'nao'
                              CHECK (tipo_permuta IN ('nao', 'parcial', 'completa')),
  descricao_permuta         TEXT,
  status                    TEXT        DEFAULT 'pendente'
                              CHECK (status IN ('pendente', 'em_analise', 'aprovado', 'reprovado')),
  created_at                TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de alunos vinculados às solicitações
CREATE TABLE IF NOT EXISTS alunos (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  interesse_id UUID REFERENCES interesse_vagas(id) ON DELETE CASCADE NOT NULL,
  nome_aluno   TEXT NOT NULL,
  segmento     TEXT NOT NULL
                 CHECK (segmento IN ('educacao_infantil', 'fundamental1', 'fundamental2', 'ensino_medio')),
  turma        TEXT NOT NULL,
  turno        TEXT NOT NULL
                 CHECK (turno IN ('manha', 'tarde', 'tanto_faz')),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================
--  ROW LEVEL SECURITY
-- =============================================================

ALTER TABLE interesse_vagas ENABLE ROW LEVEL SECURITY;
ALTER TABLE alunos           ENABLE ROW LEVEL SECURITY;

-- Políticas para interesse_vagas
CREATE POLICY "Ver próprias solicitações"
  ON interesse_vagas FOR SELECT
  USING (auth.uid() = usuario_id);

CREATE POLICY "Criar próprias solicitações"
  ON interesse_vagas FOR INSERT
  WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Atualizar próprias solicitações"
  ON interesse_vagas FOR UPDATE
  USING (auth.uid() = usuario_id);

-- Políticas para alunos
CREATE POLICY "Ver alunos das próprias solicitações"
  ON alunos FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM interesse_vagas
      WHERE id = alunos.interesse_id AND usuario_id = auth.uid()
    )
  );

CREATE POLICY "Inserir alunos nas próprias solicitações"
  ON alunos FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM interesse_vagas
      WHERE id = alunos.interesse_id AND usuario_id = auth.uid()
    )
  );

CREATE POLICY "Deletar alunos das próprias solicitações"
  ON alunos FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM interesse_vagas
      WHERE id = alunos.interesse_id AND usuario_id = auth.uid()
    )
  );

-- =============================================================
--  TABELA USUARIOS (caso ainda não exista)
--  Se já existir, execute apenas o ALTER TABLE abaixo
-- =============================================================

CREATE TABLE IF NOT EXISTS usuarios (
  id        UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome      TEXT,
  telefone  TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Ver próprio perfil"
  ON usuarios FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Criar próprio perfil"
  ON usuarios FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Atualizar próprio perfil"
  ON usuarios FOR UPDATE
  USING (auth.uid() = id);

-- Se a tabela usuarios já existia e faltava a coluna telefone, execute:
-- ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS telefone TEXT;
