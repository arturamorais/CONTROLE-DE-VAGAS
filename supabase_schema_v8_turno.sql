-- ============================================================
--  COLÉGIO PLENUS – Schema v8 (Adiciona coluna turno em turmas)
--  Execute no SQL Editor do Supabase
-- ============================================================

ALTER TABLE turmas
  ADD COLUMN IF NOT EXISTS turno TEXT DEFAULT 'manha'
    CHECK (turno IN ('manha', 'tarde', 'integral'));

-- Recarrega schema cache
NOTIFY pgrst, 'reload schema';
