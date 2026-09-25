-- 004_wa_media_cache.sql
-- Cache de media_id de WhatsApp. Meta borra los archivos subidos a los 30 días,
-- así que guardamos cuándo se subió cada uno para re-subirlo antes de que expire.

CREATE TABLE IF NOT EXISTS wa_media_cache (
  key TEXT PRIMARY KEY,
  media_id TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  bytes BIGINT NOT NULL,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
