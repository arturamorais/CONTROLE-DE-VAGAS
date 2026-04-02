-- ============================================================
--  COLÉGIO PLENUS – Schema v3 (Página de Gestão)
--  Execute no SQL Editor do Supabase
-- ============================================================

-- Novos campos na tabela de solicitações
ALTER TABLE interesse_vagas
  ADD COLUMN IF NOT EXISTS observacao_interna TEXT,
  ADD COLUMN IF NOT EXISTS updated_at         TIMESTAMPTZ DEFAULT NOW();

-- Trigger: atualiza updated_at automaticamente a cada UPDATE
CREATE OR REPLACE FUNCTION fn_update_timestamp()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_interesse_vagas_updated_at ON interesse_vagas;
CREATE TRIGGER trg_interesse_vagas_updated_at
BEFORE UPDATE ON interesse_vagas
FOR EACH ROW EXECUTE FUNCTION fn_update_timestamp();

-- Políticas adicionais para colaboradores em alunos (necessário para realocações futuras)
DROP POLICY IF EXISTS "colab_atualizar_alunos"     ON alunos;
DROP POLICY IF EXISTS "colab_deletar_alunos_admin" ON alunos;

CREATE POLICY "colab_atualizar_alunos"
  ON alunos FOR UPDATE USING (is_colaborador());

CREATE POLICY "colab_deletar_alunos_admin"
  ON alunos FOR DELETE USING (is_colaborador());

-- Política: colaboradores podem ver e atualizar observação_interna
-- (já coberta pela política colab_editar_status do schema v2)

-- ============================================================
--  RESUMO DAS ALTERAÇÕES
--  - interesse_vagas.observacao_interna TEXT  → notas internas do admin
--  - interesse_vagas.updated_at TIMESTAMPTZ  → data da última alteração
--  - Trigger trg_interesse_vagas_updated_at  → auto-preenche updated_at
--  - Policy colab_atualizar_alunos           → colaboradores editam alunos
--  - Policy colab_deletar_alunos_admin       → colaboradores deletam alunos
-- ============================================================
