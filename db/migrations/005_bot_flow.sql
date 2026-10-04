-- 005_bot_flow.sql
-- Motor de conversación determinista (sin IA): el flujo vive en la base de
-- datos para poder editar textos y opciones sin deploy.
--
-- bot_steps   = nodos del flujo (qué muestra el bot)
-- bot_options = botones / filas de lista que ofrece cada nodo
--
-- El estado de cada conversación vive en wa_conversations.bot_step_key (nodo
-- actual) y bot_state (respuestas acumuladas: { "nombre": "...", ... }).

CREATE TABLE IF NOT EXISTS bot_steps (
  step_key TEXT PRIMARY KEY,
  kind TEXT NOT NULL DEFAULT 'buttons' CHECK (kind IN ('text', 'buttons', 'list', 'input')),
  body TEXT NOT NULL,
  button_text TEXT,
  next_step_key TEXT,
  collect_key TEXT,
  -- Al entrar a este nodo se avisa a los asesores con lo juntado hasta acá.
  notify_handoff BOOLEAN NOT NULL DEFAULT FALSE,
  is_entry BOOLEAN NOT NULL DEFAULT FALSE,
  is_terminal BOOLEAN NOT NULL DEFAULT FALSE,
  position INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS bot_steps_single_entry ON bot_steps (is_entry) WHERE is_entry;

CREATE TABLE IF NOT EXISTS bot_options (
  id SERIAL PRIMARY KEY,
  step_key TEXT NOT NULL REFERENCES bot_steps(step_key) ON DELETE CASCADE,
  option_key TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  next_step_key TEXT,
  position INT NOT NULL DEFAULT 0,
  UNIQUE (step_key, option_key)
);

CREATE INDEX IF NOT EXISTS bot_options_step_idx ON bot_options (step_key, position);

ALTER TABLE wa_conversations ADD COLUMN IF NOT EXISTS bot_step_key TEXT;
ALTER TABLE wa_conversations ADD COLUMN IF NOT EXISTS bot_state JSONB NOT NULL DEFAULT '{}'::jsonb;
