-- 006_chat_definitivo.sql
-- Soporte para el flujo "chat definitivo" (Motor de Ventas, sin IA).
--
-- Qué agrega sobre 005_bot_flow.sql:
--   * kind = 'template'   -> nodo que envía una plantilla de WhatsApp (ej: video).
--   * trigger_texts       -> textos exactos que abren el flujo. Si el primer mensaje
--                            del cliente no coincide con ninguno, el bot no responde.
--   * auto_advance        -> al enviar este nodo, pasa al siguiente sin esperar que
--                            el cliente escriba (encadena mensaje -> plantilla -> botones).
--   * also_send_step_key  -> segundo mensaje que sale junto con el nodo (los 2
--                            mensajes apilados de N9), para llegar al límite de 3
--                            botones sin paginación.
--   * kind = 'agenda'     -> nodo que ofrece horarios libres de Calendarly. Las
--                            opciones no están en bot_options: se piden a la API al
--                            momento de llegar al nodo, porque los horarios libres
--                            cambian todo el tiempo.
--   * validation / invalid_body / max_attempts -> validación de los nodos input.
-- Los nodos con opciones largas (>20 caracteres, el tope de un botón de WhatsApp)
-- se cargan como kind = 'list': título corto + description con el texto completo.

ALTER TABLE bot_steps DROP CONSTRAINT IF EXISTS bot_steps_kind_check;

ALTER TABLE bot_steps
  ADD CONSTRAINT bot_steps_kind_check
  CHECK (kind IN ('text', 'buttons', 'list', 'input', 'template', 'agenda'));

-- Nodos agenda: contra qué evento de Calendarly se buscan horarios, cuántos días
-- hábiles de margen se exigen y cuántos horarios se ofrecen (tope 3 botones).
ALTER TABLE bot_steps
  ADD COLUMN IF NOT EXISTS calendar_event_uri TEXT;
ALTER TABLE bot_steps ADD COLUMN IF NOT EXISTS calendar_min_business_days INT NOT NULL DEFAULT 5;
ALTER TABLE bot_steps ADD COLUMN IF NOT EXISTS calendar_slot_count INT NOT NULL DEFAULT 3;
-- A dónde va el cliente si elige un horario, y si no hay horarios disponibles.
ALTER TABLE bot_steps ADD COLUMN IF NOT EXISTS agenda_booked_step_key TEXT;
ALTER TABLE bot_steps ADD COLUMN IF NOT EXISTS agenda_empty_step_key TEXT;

-- Mensajes exactos que abren el flujo. Solo el nodo de entrada los tiene: si el primer
-- mensaje del cliente no coincide con ninguno, el bot no contesta.
ALTER TABLE bot_steps ADD COLUMN IF NOT EXISTS trigger_texts TEXT[] NOT NULL DEFAULT '{}';

-- Al enviar este nodo, pasa al siguiente solo (sin esperar respuesta del cliente).
ALTER TABLE bot_steps ADD COLUMN IF NOT EXISTS auto_advance BOOLEAN NOT NULL DEFAULT FALSE;

-- Nodo cuyo mensaje se manda junto con este, sin esperar respuesta (2 opciones
-- apiladas en 2 mensajes). El engine guarda el estado del nodo actual para que los
-- botones del segundo mensaje también se puedan responder.
ALTER TABLE bot_steps ADD COLUMN IF NOT EXISTS also_send_step_key TEXT;

-- Regex para validar lo que escribe el cliente en nodos input, el texto de reintento,
-- cuántos intentos se permiten y a dónde cae si se agotan.
ALTER TABLE bot_steps ADD COLUMN IF NOT EXISTS validation TEXT;
ALTER TABLE bot_steps ADD COLUMN IF NOT EXISTS invalid_body TEXT;
ALTER TABLE bot_steps ADD COLUMN IF NOT EXISTS max_attempts INT NOT NULL DEFAULT 3;
ALTER TABLE bot_steps ADD COLUMN IF NOT EXISTS on_fail_step_key TEXT;

-- Nombre de la plantilla a enviar en nodos kind = 'template'.
ALTER TABLE bot_steps ADD COLUMN IF NOT EXISTS template_name TEXT;