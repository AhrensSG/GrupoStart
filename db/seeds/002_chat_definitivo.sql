-- 002_chat_definitivo.sql
-- Flujo "chat definitivo" del bot de WhatsApp de Grupo Start (Motor de Ventas).
-- Documento fuente: db/chat-definitivo.md
--
-- Es determinístico, sin IA. Los 4 disparadores de trigger_texts abren el flujo; si
-- el cliente escribe cualquier otra cosa como primer mensaje, el bot no responde.
--
-- Estructura:
--   n1  -> mensaje de presentación        (auto_advance)
--   n1b -> plantilla de video             (auto_advance)
--   n2  -> "¿Comenzamos?" Sí / No
--   n3  -> captura el email               (input con validación)
--   n4  -> equipo comercial (3 opciones)
--   n5  -> otros cargos (2 opciones)      [solo si "Soy solo yo"]
--   n6  -> figura legal (3 opciones)
--   n7  -> facturación mensual (3 opciones)
--   ...rama de facturación baja -> n8_alt -> n9 (objetivos) -> n10 (inversión)
--   ...rama de facturación alta -> n8_meeting (PENDIENTE)
--
-- Nodos marcados PENDIENTE: falta definirlos. while el texto no exista, el bot cae
-- al nodo `pendiente_definir` y se lo avisa al equipo, en vez de quedar trabado.

-- El chat definitivo es el único flujo: se baja el menú genérico y sus opciones, que
-- también estaba marcado como nodo de entrada.
UPDATE bot_steps SET is_entry = FALSE WHERE step_key <> 'n1';

DELETE FROM bot_steps WHERE step_key IN ('menu', 'info', 'servicios', 'interes', 'asesor_nombre', 'asesor_mensaje', 'asesor_cierre', 'asesor', 'despedida');

INSERT INTO bot_steps (step_key, kind, body, button_text, next_step_key, collect_key, notify_handoff, is_entry, is_terminal, position, trigger_texts, auto_advance, also_send_step_key, validation, invalid_body, max_attempts, on_fail_step_key, template_name)
VALUES
  -- N1: presentación. Los 4 disparadores devuelven este mismo texto.
  ('n1', 'text',
   E'Hola 👋🏻\n\nMucho gusto, somos Grupo Start 🚀\n\n\nMás de 10 años de experiencia y  +100 clientes satisfechos en Argentina y Europa nos respaldan.\n\n\nPara que nos conozcas te cuento un poco sobre nosotros:\n\n\n🏁 Somos una agencia de marketing completa \n\n\n📲 Integramos todos los procesos importantes en un solo lugar \n\n\n🧩 Contenidos, publicidad en meta ads, Chat Bot, e-comerce \n\n\n\n🔍 Primero te conocemos, luego proponemos 👉🏻 Vení a visitarnos📍Hipólito Yrigoyen 342, ciudad de Formosa 👉🏻 o agendemos una reunión por videollamada 👨🏻‍💻',
   NULL, 'n1b', NULL, FALSE, TRUE, FALSE, 0,
   ARRAY[
     'Hola quiero más información del programa "Motor de Ventas"',
     'Hola, en cuanto tiempo instalan el programa ¿motor de ventas?',
     'Hola, quiero contratar el "Motor de ventas"',
     'Hola, qué costo tiene el sistema "Motor de ventas"'
   ],
   TRUE, NULL, NULL, NULL, 3, NULL, NULL),
