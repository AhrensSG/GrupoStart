-- 003_ai_prospect_state.sql
-- Estado del prospecto para el flujo comercial de Sofi IA.

ALTER TABLE wa_conversations ADD COLUMN IF NOT EXISTS ai_state JSONB DEFAULT NULL;
