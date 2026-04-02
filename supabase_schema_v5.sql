-- ============================================================
--  COLÉGIO PLENUS – Schema v5 (Status individual por aluno)
--  Execute no SQL Editor do Supabase
-- ============================================================

ALTER TABLE alunos
  ADD COLUMN IF NOT EXISTS status_aluno      TEXT DEFAULT 'pendente'
    CHECK (status_aluno IN ('pendente', 'aprovado', 'reprovado')),
  ADD COLUMN IF NOT EXISTS motivo_reprovacao TEXT;
