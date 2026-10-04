-- 001_menu_grupo_start.sql
-- Menú de ejemplo del bot. Es solo el contenido de arranque: los textos y las
-- opciones se editan desde la base (o desde el panel) sin tocar código.
--
-- Los cuerpos de texto admiten placeholders {{clave}}, que se reemplazan con lo
-- que el cliente respondió antes (ej: {{nombre}}).

INSERT INTO bot_steps (step_key, kind, body, button_text, next_step_key, collect_key, notify_handoff, is_entry, is_terminal, position)
VALUES
  -- is_entry FALSE: el nodo de entrada es 'n1' del chat definitivo (002_chat_definitivo).
  ('menu', 'buttons',
   '¡Hola! 👋 Soy el bot de Grupo Start, agencia de marketing de Formosa. ¿Qué necesitás?',
   NULL, NULL, NULL, FALSE, FALSE, FALSE, 0),

  ('info', 'buttons',
   'Grupo Start nació en febrero de 2023 en la ciudad de Formosa. Somos una agencia de marketing completa: estrategia, contenidos profesionales y publicidad efectiva, desde emprendedores hasta empresas corporativas. 🌐grupostart.com.ar',
   NULL, 'menu', NULL, FALSE, FALSE, FALSE, 1),

  ('servicios', 'list',
   'Estos son los servicios con los que trabajamos. ¿Sobre cuál querés saber más?',
   'Ver servicios', 'menu', NULL, FALSE, FALSE, FALSE, 2),

  ('interes', 'buttons',
   '¡Genial! Dejame tu nombre y te contactamos con la información.',
   NULL, 'asesor_nombre', NULL, FALSE, FALSE, FALSE, 3),

  ('asesor_nombre', 'input',
   '¿Cómo te llamás?',
   NULL, 'asesor_mensaje', 'nombre', FALSE, FALSE, FALSE, 4),

  ('asesor_mensaje', 'input',
   'Perfecto {{nombre}}. Escribinos brevemente qué necesitás y te responde un asesor.',
   NULL, 'asesor_cierre', 'mensaje', FALSE, FALSE, FALSE, 5),

  ('asesor_cierre', 'buttons',
   '¡Gracias {{nombre}}! Ya le pasamos tu consulta al equipo 👌',
   NULL, 'menu', NULL, TRUE, FALSE, FALSE, 6),

  ('asesor', 'buttons',
   'Dejame tus datos y te escribimos nosotros.',
   NULL, 'asesor_nombre', NULL, FALSE, FALSE, FALSE, 7),

  ('despedida', 'text',
   '¡Gracias por escribirnos! Te esperamos en grupostart.com.ar 👋',
   NULL, NULL, NULL, FALSE, FALSE, TRUE, 8)
ON CONFLICT (step_key) DO UPDATE SET
  kind = EXCLUDED.kind,
  body = EXCLUDED.body,
  button_text = EXCLUDED.button_text,
  next_step_key = EXCLUDED.next_step_key,
  collect_key = EXCLUDED.collect_key,
  notify_handoff = EXCLUDED.notify_handoff,
  is_entry = EXCLUDED.is_entry,
  is_terminal = EXCLUDED.is_terminal,
  position = EXCLUDED.position,
  updated_at = NOW();

INSERT INTO bot_options (step_key, option_key, title, description, next_step_key, position)
VALUES
  ('menu', 'info', 'Conoce Grupo Start', 'Quiénes somos y cómo trabajamos', 'info', 0),
  ('menu', 'servicios', 'Ver servicios', 'Identidad de marca, redes, diseño, más', 'servicios', 1),
  ('menu', 'asesor', 'Hablar con un asesor', 'Dejá tu consulta y te escribimos', 'asesor', 2),

  ('info', 'volver', 'Volver al menú', NULL, 'menu', 0),
  ('info', 'asesor', 'Hablar con un asesor', NULL, 'asesor', 1),

  ('servicios', 'brandidentity', 'Identidad de marca', 'Logo, colores y tipografías de tu marca', 'interes', 0),
  ('servicios', 'communitymanager', 'Gestión de redes', 'Contenido, campañas y soporte permanente', 'interes', 1),
  ('servicios', 'media', 'Producción de contenido', 'Imágenes profesionales y edición de videos', 'interes', 2),
  ('servicios', 'graphicpieces', 'Diseño gráfico', 'Piezas para campañas, redes y promociones', 'interes', 3),
  ('servicios', 'audiovisual', 'Edición audiovisual', 'Videos y material para redes y publicidad', 'interes', 4),
  ('servicios', 'businessanalysis', 'Análisis de negocio', 'Diagnóstico y plan de marketing a medida', 'interes', 5),
  ('servicios', 'customplan', 'Plan personalizado', 'Combinamos los servicios que necesitás', 'interes', 6),
  ('servicios', 'volver', 'Volver al menú', NULL, 'menu', 7),

  ('interes', 'asesor', 'Sí, quiero que me contacten', 'Te contactamos con la información', 'asesor_nombre', 0),
  ('interes', 'volver', 'Volver al menú', NULL, 'menu', 1),

  ('asesor', 'nombre', 'Dejar mi consulta', 'Te contactamos por WhatsApp', 'asesor_nombre', 0),
  ('asesor', 'volver', 'Volver al menú', NULL, 'menu', 1),

  ('asesor_cierre', 'volver', 'Volver al menú', NULL, 'menu', 0),
  ('asesor_cierre', 'despedida', 'Chau', NULL, 'despedida', 1)
ON CONFLICT (step_key, option_key) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  next_step_key = EXCLUDED.next_step_key,
  position = EXCLUDED.position;
