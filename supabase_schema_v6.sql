-- ============================================================
--  COLÉGIO PLENUS – Schema v6 (Corrige coluna email em usuarios)
--  Execute no SQL Editor do Supabase
-- ============================================================

-- Adiciona coluna email na tabela usuarios (caso não exista)
ALTER TABLE usuarios
  ADD COLUMN IF NOT EXISTS email TEXT;

-- Recarrega o schema cache do PostgREST para refletir a alteração
NOTIFY pgrst, 'reload schema';
