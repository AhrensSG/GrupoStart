-- 008_wa_media.sql
-- Guarda los adjuntos (imagen, audio, video, documento) intercambiados por
-- WhatsApp para poder mostrarlos en la bandeja de entrada web.
-- Los bytes viven acá (bytea) y wa_messages.media_url apunta a
-- /api/tools/whatsapp/media/<id> para que el front los renderice.

CREATE TABLE IF NOT EXISTS wa_media (
  id SERIAL PRIMARY KEY,
  mime_type VARCHAR(150) DEFAULT '',
  filename TEXT DEFAULT '',
  bytes INTEGER DEFAULT 0,
  data BYTEA NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE wa_messages ADD COLUMN IF NOT EXISTS media_id INTEGER;

CREATE INDEX IF NOT EXISTS idx_wa_messages_media_id ON wa_messages(media_id);
