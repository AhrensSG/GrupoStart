-- 002_ai_whatsapp.sql
-- Bot de WhatsApp con IA: pausa automática cuando un admin responde a mano
-- y marcado de mensajes enviados por el bot.

ALTER TABLE wa_conversations ADD COLUMN IF NOT EXISTS ai_paused_until TIMESTAMPTZ DEFAULT NULL;
ALTER TABLE wa_messages ADD COLUMN IF NOT EXISTS is_bot BOOLEAN NOT NULL DEFAULT FALSE;
