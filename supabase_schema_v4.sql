-- ============================================================
--  COLÉGIO PLENUS – Schema v4 (Histórico de Alterações)
--  Execute no SQL Editor do Supabase
-- ============================================================

CREATE TABLE IF NOT EXISTS historico_solicitacoes (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  interesse_id UUID REFERENCES interesse_vagas(id) ON DELETE CASCADE NOT NULL,
  descricao    TEXT NOT NULL,
  autor_nome   TEXT NOT NULL,
  autor_tipo   TEXT CHECK (autor_tipo IN ('responsavel', 'colaborador')) NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE historico_solicitacoes ENABLE ROW LEVEL SECURITY;

-- Responsável vê histórico apenas das próprias solicitações
CREATE POLICY "hist_ver_proprio"
  ON historico_solicitacoes FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM interesse_vagas
      WHERE id = historico_solicitacoes.interesse_id
        AND usuario_id = auth.uid()
    )
  );

-- Colaboradores veem todos os históricos
CREATE POLICY "hist_colab_select"
  ON historico_solicitacoes FOR SELECT
  USING (is_colaborador());

-- Qualquer usuário autenticado pode inserir registros
CREATE POLICY "hist_inserir"
  ON historico_solicitacoes FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);
