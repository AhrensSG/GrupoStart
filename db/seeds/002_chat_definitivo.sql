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
   E'Hola 👋🏻\n\nMucho gusto, somos Grupo Start 🚀\n\nMás de 10 años de experiencia y +100 clientes satisfechos en Argentina y Europa nos respaldan.\n\nPara que nos conozcas te cuento un poco sobre nosotros:\n\n🏁 Somos una agencia de marketing completa\n\n📲 Integramos todos los procesos importantes en un solo lugar\n\n🧩 Contenidos, publicidad en Meta Ads, Chatbot y eCommerce\n\n🔍 Primero te conocemos, luego proponemos 👉🏻 Vení a visitarnos: 📍Hipólito Yrigoyen 342, Formosa 👉🏻 o agendemos una videollamada 👨🏻‍💻',
   NULL, 'n1b', NULL, FALSE, TRUE, FALSE, 0,
   ARRAY[
     'Hola quiero más información del programa "Motor de Ventas"',
     'Hola, en cuanto tiempo instalan el programa ¿motor de ventas?',
     'Hola, quiero contratar el "Motor de ventas"',
     'Hola, qué costo tiene el sistema "Motor de ventas"'
   ],
   TRUE, NULL, NULL, NULL, 3, NULL, NULL),

  -- N1B: plantilla de video (asset ya subido en Meta, sin link ni componentes).
  ('n1b', 'template',
   '',
   NULL, 'n2', NULL, FALSE, FALSE, FALSE, 1,
   '{}', TRUE, NULL, NULL, NULL, 3, NULL, 'video'),

  -- N2: ¿comenzamos?
  ('n2', 'buttons',
   '¿Comenzamos?',
   NULL, NULL, NULL, FALSE, FALSE, FALSE, 2,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  ('fin_no', 'text',
   'Comprendo, si necesitas algo mas no dudes en decírmelo, mientras voy a avisar a un representante humano para que pronto se ponga en contacto contigo',
   NULL, NULL, NULL, TRUE, FALSE, TRUE, 3,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  -- N3: captura del email, único input libre del bot.
  ('n3', 'input',
   E'Excelente! 😊\n\nPara comenzar podrías escribir tu correo en el chat?',
   NULL, 'n4', 'email', FALSE, FALSE, FALSE, 4,
   '{}', FALSE, NULL,
   '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$',
   E'Parece que el correo no tiene un formato válido. ¿Podrías revisarlo y escribirlo nuevamente?',
   3, 'pendiente_definir', NULL),

  -- N4: equipo comercial.
  ('n4', 'buttons',
   E'Muchas gracias! seguro vamos a estar en contacto por ahí.\n\n\nTe cuento, nuestra agencia instala "Motor de Ventas" únicamente en empresas que tienen capacidad para atender y convertir las oportunidades que generamos. 🔍\n\n\nActualmente cuantas personas forman parte de tu equipo comercial?  🤔',
   NULL, NULL, 'equipo_comercial', FALSE, FALSE, FALSE, 5,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  -- N5: otros cargos (solo para "Soy solo yo").
  ('n5', 'buttons',
   E'Muy bien, instalar un motor de ventas que funcione siempre requerirá de un agente humano al final del camino. 👤\n\nTenes personas que se ocupen de otras áreas "clave de tu empresa" y vos estas encargado de la parte comercial? 🤔',
   NULL, NULL, 'tiene_otros_cargos', FALSE, FALSE, FALSE, 6,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  ('fin_solo_yo', 'text',
   E'Comprendo, instalar un motor de ventas que funcione siempre requerirá de un agente humano al final del camino. \n\n\nno podremos instalar nuestro sistema ya que no podrá funcionar sin una estructura que lo respalde, pero vamos a estar en contacto a través del correo que nos brindaste, tal vez un poco mas adelante si podamos trabajar juntos ✈️',
   NULL, NULL, NULL, TRUE, FALSE, TRUE, 7,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  -- N6: figura legal. Solo las 3 más frecuentes (WhatsApp tops los botones en 3).
  ('n6', 'buttons',
   E'Ahora permíteme preguntarte \n\n¿Cual es la figura legal de tu empresa? 🤔',
   NULL, NULL, 'figura_legal', FALSE, FALSE, FALSE, 8,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  -- N7: facturación mensual. Bifurca el flujo.
  ('n7', 'buttons',
   E'Super!🚀\n\nActualmente aproximadamente cuando factura tu empresa al mes 🤔',
   NULL, NULL, 'facturacion_mensual', FALSE, FALSE, FALSE, 9,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  -- N8_alt: facturación < USD 1.000.
  -- N8_meeting: facturación alta. Ofrece el programa completo y deriva a la
  -- disposición. kind='list' porque las 3 opciones no entran en botones.
  -- Los destinos de las opciones todavía no están definidos: van al nodo
  -- pendiente, que avisa a un asesor en vez de dejar el chat colgado.
  ('n8_meeting', 'list',
   E'Muy bien, el programa "Motor de ventas" sin lugar a dudas puede ayudarte a alcanzar el siguiente nivel. 📈\n\nLa pauta publicitaría intensiva será una maquina de traerte oportunidades de ventas \nLa implementación de un agente que "precalifique a tus leads" hará mas eficiente el proceso \nEl ecomerce te va a ayudar a tener el control \ny el marketing de redes va a posiciónar a tu marca.\n\n\nte voy a agendar una reunión con un representante, por ultimo podrías elegir una de las siguientes opciones (con la que te sientas mas comodo/a, claro) 🤔',
   'Elegí una opción', NULL, 'disposicion', FALSE, FALSE, FALSE, 11,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  -- N8_meeting_agenda: agenda del camino "frío" de la rama de facturación alta.
  -- Mismo texto que las otras agendas, nodo aparte por la regla de un destino por
  -- botón. Margen de 5 días hábiles.
  ('n8_meeting_agenda', 'agenda',
   E'Bien , lo comprendo, tengo estas fechas disponibles para la reunión con uno de nuestros representantes ¿cual te queda mejor? 🤔',
   NULL, NULL, NULL, FALSE, FALSE, FALSE, 12,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  -- N8_meeting_agenda_tibio: agenda del camino "tibio" de la rama de facturación
  -- alta. Margen de 3 días hábiles, más corto que el del frío porque el cliente
  -- está más cerca de contratar.
  ('n8_meeting_agenda_tibio', 'agenda',
   E'Bien , lo comprendo, tengo estas fechas disponibles para la reunión con uno de nuestros representantes ¿cual te queda mejor? 🤔',
   NULL, NULL, NULL, FALSE, FALSE, FALSE, 13,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  -- N8_meeting_agenda_caliente: agenda del camino "caliente" de la rama de
  -- facturación alta. Margen de 1 día hábil: el cliente está listo para contratar
  -- y puede agendar al día siguiente.
  ('n8_meeting_agenda_caliente', 'agenda',
   E'Bien , lo comprendo, tengo estas fechas disponibles para la reunión con uno de nuestros representantes ¿cual te queda mejor? 🤔',
   NULL, NULL, NULL, FALSE, FALSE, FALSE, 14,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  -- N8_prioridades: facturación media. Antes de ofrecer nada, pregunta la prioridad.
  -- kind='text' sin opciones: el texto termina pidiendo elegir una frase, así que
  -- las 2 frases van en el mensaje apilado de abajo.
  -- N8_prioridades_frases lleva las frases completas numeradas en el cuerpo y las
  -- opciones como "Opción 1" / "Opción 2". No pueden ir como descripción de la
  -- lista porque WhatsApp corta ese campo a 72 caracteres y las frases miden
  -- 116 y 165; el botón que corresponde a cada una es el de su número.
  ('n8_prioridades', 'text',
   E'Muy bien, estoy pensando que instalar "Motor de ventas" en tu negocio puede ser algo apresurado 🤔\n\n\n🗓️ Sin embargo ayúdame a entender un poco mas sobre tus prioridades hoy. \n\n\nElegí la frase con la que mas te identifiques:',
   NULL, NULL, 'prioridad', FALSE, FALSE, FALSE, 12,
   '{}', FALSE, 'n8_prioridades_frases', NULL, NULL, 3, NULL, NULL),

  ('n8_prioridades_frases', 'list',
   E'1️⃣ Estoy buscando escalar mi negocio, comprendo que debo hacer esfuerzos para alcanzar el siguiente nivel en mi negocio\n\n\n2️⃣ Quiero vender mas, pero no puedo permitirme grandes esfuerzos económicos por mi situación personal, puedo atender a leads calificados resignando las automatizaciones',
   'Elegí una opción', NULL, 'prioridad', FALSE, FALSE, FALSE, 13,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  -- N8_prioridades_agenda: el cliente eligió "Opción 1" (escalar). Margen de 1 día
  -- hábil, el más corto: está con disposición de contratar.
  ('n8_prioridades_agenda', 'agenda',
   E'Tenes un espíritu de Guerrero 💪🏻\n\nveo viable que podamos trabajar juntos, te voy a agendar una reunión con un representante 🗓️ ¿cual de estas opciones te queda mejor para la reunión?',
   NULL, NULL, NULL, FALSE, FALSE, FALSE, 14,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  -- N8_prioridades_objetivos: el cliente eligió "Opción 2" (vender más sin grandes
  -- esfuerzos económicos). Mismo texto y mismas 4 opciones que N9, pero es un nodo
  -- aparte por la regla de un destino por botón. Las 4 no entran en un solo
  -- mensaje (WhatsApp permite 3), así que la 4ª sale apilada en N8_prioridades_objetivos_b.
  ('n8_prioridades_objetivos', 'buttons',
   E'Muy bien, puedo armarte un plan de marketing que te impulse contemplando tu facturación actual para que pronto podamos instalar "motor de ventas" en tu proyecto. 🚀\n\n¿Cual de estos objetivos asociado al marketing de redes sociales es el que mas te interesa en este momento? 🤔',
   NULL, NULL, 'objetivo_marketing', FALSE, FALSE, FALSE, 15,
   '{}', FALSE, 'n8_prioridades_objetivos_b', NULL, NULL, 3, NULL, NULL),

  -- Continuación apilada: el objetivo que sobraba, solo.
  ('n8_prioridades_objetivos_b', 'buttons',
   'Y esta también es una buena opción 🤔',
   NULL, 'n10_d_profesion', 'objetivo_marketing', FALSE, FALSE, FALSE, 16,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  ('n8_alt', 'buttons',
   E'Muy bien 🔍\n\nganando menos de usd 1.000 al mes tu prioridad hoy no será la implementación de un sistema como esta pensado "motor de ventas"  \n\n\nya que este busca atraer oportunidades de ventas a gran escala. 📈\n\n\nsin embargo creo que podemos intentar algo alternativo pero a menor escala de complejidad\n\n\nTe gustaría que te ofrezca una solución alternativa? 🤔',
   NULL, NULL, 'quiere_alternativa', FALSE, FALSE, FALSE, 10,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  ('fin_alternativa_no', 'text',
   'PENDIENTE: mensaje de cierre cuando el cliente no quiere la solución alternativa.',
   NULL, NULL, NULL, TRUE, FALSE, TRUE, 11,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  -- N9: objetivos de marketing. 4 opciones: 3 en un mensaje + 1 apilado.
  ('n9', 'buttons',
   E'Muy bien, puedo armarte un plan de marketing que te impulse contemplando tu facturación actual para que pronto podamos instalar "motor de ventas" en tu proyecto. 🚀\n\n¿Cual de estos objetivos asociado al marketing de redes sociales es el que mas te interesa en este momento? 🤔',
   NULL, NULL, 'objetivo_marketing', FALSE, FALSE, FALSE, 12,
   '{}', FALSE, 'n9b', NULL, NULL, 3, NULL, NULL),

  -- Sin cuerpo no se puede mandar un mensaje de botones, así que va una línea corta
  -- para que se lea como continuación del mensaje anterior.
  ('n9b', 'buttons',
   'Y esta también es una buena opción 🤔',
   NULL, 'n10_d_profesion', 'objetivo_marketing', FALSE, FALSE, FALSE, 13,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  -- N10_a: inversión para "Aumentar la facturación".
  ('n10_a', 'buttons',
   E'Muy bien 🚀\n\npara ello necesitaremos apalancarnos principalmente de "anuncios" para que puedas obtener resultados a corto plazo que luego te permitan adquirir mas recursos de marketing para seguir posicionando tu marca, dime con cual de estos montos de inversión inicial te sentís mas comodo? 🤔',
   NULL, NULL, 'inversion_inicial', FALSE, FALSE, FALSE, 14,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  -- N10_a_m2: primera prueba, campaña full por $200.000 y agendar reunión.
  ('n10_a_m2', 'list',
   E'Muy bien 😊\n\nEstoy pensando que podemos hacer una primera prueba, podemos configurar una campaña publicitaría full que salaría exactamente $200.000 pesos argentinos.\n\n\nTe voy a agendar una reunión con un agente humano, por ultimo podrías elegir una de las siguientes opciones (con la que te sientas mas comodo/a, claro) 🤔',
   'Elegí una opción', NULL, 'disposicion', FALSE, FALSE, FALSE, 16,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  -- N10_a_m3: inversión de más de $300.000. Plan de marketing para redes + reunión
  -- con agente humano. kind='list' con las opciones sin cargar todavía: el usuario
  -- tiene que mandar el mensaje con las opciones. Sin opciones, el engine manda el
  -- texto solo en vez de una lista vacía.
  ('n10_a_m3', 'list',
   E'Muy bien 😊\n\nestoy pensando que podemos hacer una primera prueba, podemos hacer trazar un plan de marketing para redes sociales que tenga 👇🏻\n\n- campaña publicitaría full por 10 días\n- 4 posteos para el feed\n- 2 videos para el feed \n\n\n👉🏻 Te voy a agendar una reunión con un agente humano, para que pueda explicarte mas detalles.\n\n\npor ultimo podrías elegir una de las siguientes opciones (con la que te sientas mas comodo/a, claro) 🤔',
   'Elegí una opción', NULL, 'disposicion', FALSE, FALSE, FALSE, 15,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  ('fin_bajo_inversion', 'text',
   E'Muy bien 😊\n\nGracias por tus respuestas sinceras a lo largo de tu interacción conmigo, he buscado en las soluciones que ofrece mi agencia pero no encontré una solución que nos permita avanzar juntos en este recorrido 😪\n\n\nsin embargo nos mantendremos en contacto a través del correo que nos brindaste, tal vez en un tiempo podamos trabajar juntos ',
   NULL, NULL, NULL, FALSE, FALSE, TRUE, 15,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  -- N10_a_m3_agenda: agenda del camino "frío" de la inversión de más de $300.000.
  -- Mismo texto que las otras agendas, nodo aparte por la regla de un destino por
  -- botón. Margen de 5 días hábiles.
  ('n10_a_m3_agenda', 'agenda',
   E'Bien , lo comprendo, tengo estas fechas disponibles para la reunión con uno de nuestros representantes ¿cual te queda mejor? 🤔',
   NULL, NULL, NULL, FALSE, FALSE, FALSE, 17,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  -- N10_a_m3_agenda_tibio: margen de 3 días hábiles, el cliente está más cerca.
  ('n10_a_m3_agenda_tibio', 'agenda',
   E'Bien , lo comprendo, tengo estas fechas disponibles para la reunión con uno de nuestros representantes ¿cual te queda mejor? 🤔',
   NULL, NULL, NULL, FALSE, FALSE, FALSE, 18,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  -- N10_a_m3_agenda_caliente: 1 día hábil, ya quiere contratar.
  ('n10_a_m3_agenda_caliente', 'agenda',
   E'Bien , lo comprendo, tengo estas fechas disponibles para la reunión con uno de nuestros representantes ¿cual te queda mejor? 🤔',
   NULL, NULL, NULL, FALSE, FALSE, FALSE, 19,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  -- N10_a_m2_agenda_caliente: "Listo + precisiones". Margen de 1 día hábil: el
  -- cliente ya está listo para contratar y no tiene sentido pedirle que espere.
  ('n10_a_m2_agenda_caliente', 'agenda',
   E'Bien , lo comprendo, tengo estas fechas disponibles para la reunión con uno de nuestros representantes ¿cual te queda mejor? 🤔',
   NULL, NULL, NULL, FALSE, FALSE, FALSE, 17,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  -- N10_b_m2: entre $200k y $300k. Texto de oferta para crecer en seguidores.
  ('n10_b_m2', 'list',
   E'Excelente, encontré una excelente opción para tí en el sistema 🔍\n\n4 videos al mes (uno a la semana)\ny campañas publicitarias basicas por 20 días (es decir, 2 tercios del mes) por solo $274.500 👈\n\n\nCreo que esta alternativa es muy buena para empezar. Te voy a agendar una reunión con un agente humano, para que pueda explicarte mas detalles.\n\n\npor ultimo podrías elegir una de las siguientes opciones (con la que te sientas mas comodo/a, claro) 🤔',
   'Elegí una opción', NULL, 'disposicion', FALSE, FALSE, FALSE, 15,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  -- Agendas para n10_b_m2
  ('n10_b_m2_agenda', 'agenda',
   E'Bien , lo comprendo, tengo estas fechas disponibles para la reunión con uno de nuestros representantes ¿cual te queda mejor? 🤔',
   NULL, NULL, NULL, FALSE, FALSE, FALSE, 16, '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),
  ('n10_b_m2_agenda_tibio', 'agenda',
   E'Bien , lo comprendo, tengo estas fechas disponibles para la reunión con uno de nuestros representantes ¿cual te queda mejor? 🤔',
   NULL, NULL, NULL, FALSE, FALSE, FALSE, 17, '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),
  ('n10_b_m2_agenda_caliente', 'agenda',
   E'Bien , lo comprendo, tengo estas fechas disponibles para la reunión con uno de nuestros representantes ¿cual te queda mejor? 🤔',
   NULL, NULL, NULL, FALSE, FALSE, FALSE, 18, '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  -- Agendas para n10_b_m3
  ('n10_b_m3_agenda', 'agenda',
   E'Bien , lo comprendo, tengo estas fechas disponibles para la reunión con uno de nuestros representantes ¿cual te queda mejor? 🤔',
   NULL, NULL, NULL, FALSE, FALSE, FALSE, 19, '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),
  ('n10_b_m3_agenda_tibio', 'agenda',
   E'Bien , lo comprendo, tengo estas fechas disponibles para la reunión con uno de nuestros representantes ¿cual te queda mejor? 🤔',
   NULL, NULL, NULL, FALSE, FALSE, FALSE, 20, '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),
  ('n10_b_m3_agenda_caliente', 'agenda',
   E'Bien , lo comprendo, tengo estas fechas disponibles para la reunión con uno de nuestros representantes ¿cual te queda mejor? 🤔',
   NULL, NULL, NULL, FALSE, FALSE, FALSE, 21, '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  -- N10_b_m3: más de $300.000. Usa la misma disposición para no duplicar pasos.
  ('n10_b_m3', 'list',
   E'Muy bien 😊\n\nEncontré una alternativa potente para escalar tu cuenta: 8 videos al mes (dos a la semana) + campañas publicitarias con objetivo de alcance por 30 días, por solo $374.250 💪🏻\n\n\nTe voy a agendar una reunión con un agente humano, para que pueda explicarte mas detalles.\n\n\npor ultimo podrías elegir una de las siguientes opciones (con la que te sientas mas comodo/a, claro) 🤔',
   'Elegí una opción', NULL, 'disposicion', FALSE, FALSE, FALSE, 20,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  -- N10_b: inversión para "Crecer en seguidores".
  ('n10_b', 'buttons',
   E'Muy bien, hagámoslo!  🚀\n\nPara que crezcas en seguidores requerirás un plan en el que podamos publicar la mayor cantidad de videos posibles a la semana, y campañas publicitarias con objetivo de trafico a tu perfil de Instagram para aumentar tu alcance. 📈\n\n\ndime con cual de estos montos de inversión inicial te sentís mas comodo? 🤔',
   NULL, NULL, 'inversion_inicial', FALSE, FALSE, FALSE, 16,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  -- N10_b_m1: oferta de 1 video + publicidad por $106.125, con descuento a $100.000.
  ('n10_b_m1', 'buttons',
   E'Muy bien, revise en el sistema, encontré algo 🔍\n\npodemos hacer un plan de 1 videos al mes + publicidad básica en meta ads por 10 días por $106.125, creo que un asesor comercial humano podría autorizar un descuento y que lo dejemos en $100.000 fijos al mes ✅\n\n\nTe gustaría que intente conseguirte el descuento y que un agente humano tome tu caso? 🤔',
   NULL, NULL, 'acepta_descuento', FALSE, FALSE, FALSE, 17,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  ('n11_disposicion', 'list',
   E'Cuenta con ello, intentaré conseguirte un descuento. 💪🏻\n\n\npor ultimo podrías elegir una de las siguientes opciones (con la que te sientas mas comodo/a, claro) 🤔',
   'Elegí una opción', NULL, 'disposicion', FALSE, FALSE, FALSE, 18,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  -- N10_c: inversión para "Mejorar la interacción con mi comunidad".
  ('n10_c', 'buttons',
   E'Muy bien, para ello necesitaremos crear una estrategia que despierte el deseo de interactuar con tu marca.\n\nEso se logra publicando con frecuencia contenido que humanice tu perfil variando formatos.\n\n\ndime con cual de estos montos de inversión inicial te sentís mas comodo? 🤔',
   NULL, NULL, 'inversion_inicial', FALSE, FALSE, FALSE, 19,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  -- N10_c_m1: oferta de 2 videos + 2 carruseles por $106.750.
  ('n10_c_m1', 'buttons',
   E'Muy bien, revise en el sistema, encontré algo.. 💪🏻\n\n\npodemos hacer un plan de 2 videos al mes + 2 carruseles de 3 imagenes por solo $106.750 \n\n\ncreo que un asesor comercial humano podría autorizar un descuento y que lo dejemos en $100.000 fijos al mes 👈🏻\n\n\nTe gustaría que intente conseguirte el descuento y que un agente humano tome tu caso? 🤔',
   NULL, NULL, 'acepta_descuento', FALSE, FALSE, FALSE, 20,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  ('n10_c_m1_no', 'text',
   'Comprendo, si necesitas algo mas no dudes en decírmelo, mientras voy a avisar a un representante humano para que pronto se ponga en contacto contigo',
   NULL, NULL, NULL, TRUE, FALSE, TRUE, 21,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  ('n10_c_m1_disposicion', 'list',
   E'Cuenta con ello, intentaré conseguirte un descuento. 💪🏻\n\n\npor ultimo podrías elegir una de las siguientes opciones (con la que te sientas mas comodo/a, claro) 🤔',
   'Elegí una opción', NULL, 'disposicion', FALSE, FALSE, FALSE, 22,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  -- N9d: marca personal pide la profesión antes de la inversión.
  ('n10_d_profesion', 'buttons',
   E'Muy bien, excelente objetivo 😊\nhacerlo te permitirá ofrecer todo tipo de productos/servicios asociados a tu nombre 🚀 \n\n\n¿cual es tu profesión? 👤',
   NULL, 'n10_d_agendar', 'profesion', FALSE, FALSE, FALSE, 23,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  ('n10_d_agendar', 'list',
   E'Super, voy a agendar una reunión con un representante humano, les encantará conocerte. 😊\n\n🗓️ Voy a agendarte una reunión para que uno de nuestros representantes te pueda armar un plan a medida.\n\n\npor ultimo, podrías elegir una de las siguientes opciones (con la que te sientas mas comodo/a, claro) 🤔',
   'Elegí una opción', NULL, 'disposicion', FALSE, FALSE, FALSE, 24,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  -- N10_a_m2_agenda: nodo de agenda del camino "frío". kind='agenda': las opciones
  -- salen de la API de Calendarly, no de bot_options.
  -- Mientras la API no esté conectada cae en agenda_sin_horarios y avisa al asesor.
  ('n10_a_m2_agenda', 'agenda',
   E'Bien , lo comprendo, tengo estas fechas disponibles para la reunión con uno de nuestros representantes ¿cual te queda mejor? 🤔',
   NULL, NULL, NULL, FALSE, FALSE, FALSE, 17,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  -- N10_a_m2_agenda_tibio: mismo texto que el de arriba, pero nodo aparte porque el
  -- botón "Estoy ligeramente listo" tiene su propio destino. El margen es más corto
  -- (3 días hábiles en vez de 5): está más cerca de contratar y puede agendar antes.
  ('n10_a_m2_agenda_tibio', 'agenda',
   E'Bien , lo comprendo, tengo estas fechas disponibles para la reunión con uno de nuestros representantes ¿cual te queda mejor? 🤔',
   NULL, NULL, NULL, FALSE, FALSE, FALSE, 18,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  -- N10_a_m2_agendado: confirmación al cliente. Los placeholders se completan con
  -- la fecha, la hora y el saludo que dependen del horario que eligió.
  -- auto_advance: primero sale el "dame un minuto" y enseguida la confirmación.
  -- notify_handoff: los administradores reciben el resumen con el horario elegido.
  ('n10_a_m2_agendando', 'text',
   '🗓️Muy bien, voy a agendar la reunión, dame un minuto... ',
   NULL, 'n10_a_m2_agendado', NULL, FALSE, FALSE, FALSE, 19,
   '{}', TRUE, NULL, NULL, NULL, 3, NULL, NULL),

  ('n10_a_m2_agendado', 'text',
   'Reunión confirmada el {{fecha}} a las {{hora}} uno de nuestros representantes se conectará contigo. Que tengas {{saludo}} 😊',
   NULL, NULL, NULL, TRUE, FALSE, TRUE, 20,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  ('agenda_sin_horarios', 'text',
   'Estoy armando la agenda de reuniones, en un rato te escribo con los horarios disponibles. 🙏',
   NULL, NULL, NULL, TRUE, FALSE, TRUE, 98,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL),

  -- Red de seguridad: destino de todos los nodos PENDIENTE.
  ('pendiente_definir', 'text',
   'PENDIENTE: este paso del chat todavía no está definido. Ya le avisamos a un asesor para que te contacte.',
   NULL, NULL, NULL, TRUE, FALSE, TRUE, 99,
   '{}', FALSE, NULL, NULL, NULL, 3, NULL, NULL)
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
  trigger_texts = EXCLUDED.trigger_texts,
  auto_advance = EXCLUDED.auto_advance,
  also_send_step_key = EXCLUDED.also_send_step_key,
  validation = EXCLUDED.validation,
  invalid_body = EXCLUDED.invalid_body,
  max_attempts = EXCLUDED.max_attempts,
  on_fail_step_key = EXCLUDED.on_fail_step_key,
  template_name = EXCLUDED.template_name,
  calendar_event_uri = EXCLUDED.calendar_event_uri,
  calendar_min_business_days = EXCLUDED.calendar_min_business_days,
  calendar_slot_count = EXCLUDED.calendar_slot_count,
  agenda_booked_step_key = EXCLUDED.agenda_booked_step_key,
  agenda_empty_step_key = EXCLUDED.agenda_empty_step_key,
  updated_at = NOW();

-- Los nodos de agenda se configuran aparte: el resto de las columnas ya quedaron
-- arriba con sus valores por defecto.
UPDATE bot_steps SET
  calendar_min_business_days = 5,
  calendar_slot_count = 3,
  agenda_empty_step_key = 'agenda_sin_horarios',
  agenda_booked_step_key = 'n10_a_m2_agendando',
  updated_at = NOW()
WHERE kind = 'agenda';

-- Los caminos "tibio" ofrecen menos margen: al estar más cerca de contratar,
-- pueden agendar con 3 días hábiles en lugar de 5.
UPDATE bot_steps SET
  calendar_min_business_days = 3,
  updated_at = NOW()
WHERE step_key IN (
  'n10_a_m2_agenda_tibio',
  'n8_meeting_agenda_tibio',
  'n10_a_m3_agenda_tibio',
  'n10_b_m2_agenda_tibio',
  'n10_b_m3_agenda_tibio'
);

-- El camino "caliente" puede agendar al día hábil siguiente: ya está listo para
-- contratar y no tiene sentido pedirle que espere.
UPDATE bot_steps SET
  calendar_min_business_days = 1,
  updated_at = NOW()
WHERE step_key IN (
  'n8_meeting_agenda_caliente',
  'n8_prioridades_agenda',
  'n10_a_m3_agenda_caliente',
  'n10_a_m2_agenda_caliente',
  'n10_b_m2_agenda_caliente',
  'n10_b_m3_agenda_caliente'
);

-- Opciones de una versión anterior: N8_prioridades quedó como nodo de texto y sus
-- botones se movieron a N8_prioridades_frases. Si quedan cargadas, el motor las
-- busca también al recibir texto libre y puede mandar al cliente al nodo pendiente.
DELETE FROM bot_options WHERE step_key = 'n8_prioridades';

INSERT INTO bot_options (step_key, option_key, title, description, next_step_key, position)
VALUES
  -- N2: ¿comenzamos?
  ('n2', 'si', 'Sí', NULL, 'n3', 0),
  ('n2', 'no', 'No', NULL, 'fin_no', 1),

  -- N4: equipo comercial.
  ('n4', 'solo_yo', 'Soy solo yo', NULL, 'n5', 0),
  ('n4', 'dos', '2 personas', NULL, 'n6', 1),
  ('n4', 'cinco_mas', '5 personas o más', NULL, 'n6', 2),

  -- N5: otros cargos.
  ('n5', 'si_somos_varios', 'Sí, somos varios', NULL, 'n6', 0),
  ('n5', 'no_solo_yo', 'NO, soy solo yo', NULL, 'fin_solo_yo', 1),

  -- N6: figura legal.
  ('n6', 'monotributista', 'Monotributista', NULL, 'n7', 0),
  ('n6', 'responsable_inscripto', 'Responsable inscripto', NULL, 'n7', 1),
  ('n6', 'srl', 'SRL', 'Sociedad de Responsabilidad Limitada (SRL)', 'n7', 2),

  -- N7: facturación mensual.
  ('n7', 'bajo_1000', 'Menos de usd 1.000', NULL, 'n8_alt', 0),
  ('n7', '1000_5000', 'Entre usd 1.000 a 5.000', NULL, 'n8_prioridades', 1),
  ('n7', 'mas_5000', 'Más de usd 5000', NULL, 'n8_meeting', 2),

  -- N8_meeting: disposición de la rama de facturación alta. Los 3 destinos todavía
  -- no están definidos: cada botón tiene su propia fila igual, y van al nodo
  -- pendiente, que avisa a un asesor.
  ('n8_meeting', 'frio', 'Solo información', 'Solo quiero información, aun no estoy listo para contratar', 'n8_meeting_agenda', 0),
  ('n8_meeting', 'tibio', 'Ligeramente listo', 'Estoy ligeramente listo para contratar', 'n8_meeting_agenda_tibio', 1),
  ('n8_meeting', 'caliente', 'Listo + precisiones', 'Estoy listo para contratar, solo quiero mas precisiones', 'n8_meeting_agenda_caliente', 2),

  -- N8_prioridades: las 2 frases de prioridad. Los destinos todavía no están
  -- definidos: cada una tiene su propia fila y va al nodo pendiente, que avisa a
  -- un asesor en vez de dejar el chat colgado.
  ('n8_prioridades_frases', 'opcion_1', 'Opción 1', NULL, 'n8_prioridades_agenda', 0),
  ('n8_prioridades_frases', 'opcion_2', 'Opción 2', NULL, 'n8_prioridades_objetivos', 1),

  -- N8_prioridades_objetivos: mismos destinos que N9, nodo aparte.
  ('n8_prioridades_objetivos', 'aumentar_facturacion', 'Aumentar la facturación', NULL, 'n10_a', 0),
  ('n8_prioridades_objetivos', 'crecer_seguidores', 'Crecer en seguidores', NULL, 'n10_b', 1),
  ('n8_prioridades_objetivos', 'mejorar_interaccion', 'Mejorar la interacción', 'Mejorar la interacción con mi comunidad', 'n10_c', 2),
  ('n8_prioridades_objetivos_b', 'marca_personal', 'Marca personal', 'Desarrollar mi marca personal', 'n10_d_profesion', 0),

  -- N10_a_m3: disposición después de la inversión de más de $300.000.
  ('n10_a_m3', 'frio', 'Solo información', 'Solo quiero información, aun no estoy listo para contratar', 'n10_a_m3_agenda', 0),
  ('n10_a_m3', 'tibio', 'Ligeramente listo', 'Estoy ligeramente listo para contratar', 'n10_a_m3_agenda_tibio', 1),
  ('n10_a_m3', 'caliente', 'Listo + precisiones', 'Estoy listo para contratar, solo quiero mas precisiones', 'n10_a_m3_agenda_caliente', 2),

  -- N8_alt: solución alternativa.
  ('n8_alt', 'si', 'Sí', NULL, 'n9', 0),
  ('n8_alt', 'no', 'No', NULL, 'fin_alternativa_no', 1),

  -- N9: objetivos (mensaje 1).
  ('n9', 'aumentar_facturacion', 'Aumentar la facturación', NULL, 'n10_a', 0),
  ('n9', 'crecer_seguidores', 'Crecer en seguidores', NULL, 'n10_b', 1),
  ('n9', 'mejorar_interaccion', 'Mejorar la interacción', 'Mejorar la interacción con mi comunidad', 'n10_c', 2),

  -- N9b: objetivos (mensaje apilado).
  ('n9b', 'marca_personal', 'Marca personal', 'Desarrollar mi marca personal', 'n10_d_profesion', 0),

  -- N10_a: montos.
  ('n10_a', 'bajo_100k', 'Menos de $100.000', 'Menos de $100.000 (pesos argentinos)', 'fin_bajo_inversion', 0),
  ('n10_a', 'medio_300k', 'Entre $200k y $300k', 'Entre $200.000 a $300.000 (Pesos Argentinos)', 'n10_a_m2', 1),
  ('n10_a', 'alto_300k', 'Más de $300.000', 'Algo más de $300.000 (Pesos Argentinos)', 'n10_a_m3', 2),

  -- N10_b: montos.
  -- N10_a_m2: disposición después de la primera prueba de $200.000.
  -- N10_a_m2: disposición. El "frío" igual quiere agendar reunión, así que ofrece
  -- horarios de Calendarly; los otros dos finales todavía no están definidos.
  ('n10_a_m2', 'frio', 'Solo información', 'Solo quiero información, aun no estoy listo para contratar', 'n10_a_m2_agenda', 0),
  ('n10_a_m2', 'tibio', 'Ligeramente listo', 'Estoy ligeramente listo para contratar', 'n10_a_m2_agenda_tibio', 1),
  ('n10_a_m2', 'caliente', 'Listo + precisiones', 'Estoy listo para contratar, solo quiero más precisiones', 'n10_a_m2_agenda_caliente', 2),

  -- N10_b: montos.
  ('n10_b', 'bajo_100k', 'Menos de $100.000', 'Menos de $100.000 (pesos argentinos)', 'n10_b_m1', 0),
  ('n10_b', 'medio_300k', 'Entre $200k y $300k', 'Entre $200.000 a $300.000 (Pesos Argentinos)', 'n10_b_m2', 1),
  ('n10_b', 'alto_300k', 'Más de $300.000', 'Algo más de $300.000 (Pesos Argentinos)', 'n10_b_m3', 2),

  -- N10_b_m1: oferta con descuento.
  ('n10_b_m1', 'si', 'Sí', NULL, 'n11_disposicion', 0),
  ('n10_b_m1', 'no', 'No', NULL, 'fin_no', 1),

  -- N10_b_m2 y N10_b_m3: disposición que deriva a agendas con distinto margen.
  ('n10_b_m2', 'frio', 'Solo información', 'Solo quiero información, aun no estoy listo para contratar', 'n10_b_m2_agenda', 0),
  ('n10_b_m2', 'tibio', 'Ligeramente listo', 'Estoy ligeramente listo para contratar', 'n10_b_m2_agenda_tibio', 1),
  ('n10_b_m2', 'caliente', 'Listo + precisiones', 'Estoy listo para contratar, solo quiero más precisiones', 'n10_b_m2_agenda_caliente', 2),
  ('n10_b_m3', 'frio', 'Solo información', 'Solo quiero información, aun no estoy listo para contratar', 'n10_b_m3_agenda', 0),
  ('n10_b_m3', 'tibio', 'Ligeramente listo', 'Estoy ligeramente listo para contratar', 'n10_b_m3_agenda_tibio', 1),
  ('n10_b_m3', 'caliente', 'Listo + precisiones', 'Estoy listo para contratar, solo quiero más precisiones', 'n10_b_m3_agenda_caliente', 2),

  -- N11_disposicion: 3 opciones, títulos cortos + texto completo en description.
  ('n11_disposicion', 'frio', 'Solo información', 'Solo quiero información, aun no estoy listo para contratar', 'pendiente_definir', 0),
  ('n11_disposicion', 'tibio', 'Ligeramente listo', 'Estoy ligeramente listo para contratar', 'pendiente_definir', 1),
  ('n11_disposicion', 'caliente', 'Listo + precisiones', 'Estoy listo para contratar, solo quiero más precisiones', 'pendiente_definir', 2),

  -- N10_c: montos.
  ('n10_c', 'bajo_100k', 'Menos de $100.000', 'Menos de $100.000 (pesos argentinos)', 'n10_c_m1', 0),
  ('n10_c', 'medio_300k', 'Entre $200k y $300k', 'Entre $200.000 a $300.000 (Pesos Argentinos)', 'pendiente_definir', 1),
  ('n10_c', 'alto_300k', 'Más de $300.000', 'Algo más de $300.000 (Pesos Argentinos)', 'pendiente_definir', 2),

  -- N10_c_m1: oferta con descuento.
  ('n10_c_m1', 'si', 'Sí', NULL, 'n10_c_m1_disposicion', 0),
  ('n10_c_m1', 'no', 'No', NULL, 'n10_c_m1_no', 1),

  -- N10_c_m1_disposicion: 3 opciones.
  ('n10_c_m1_disposicion', 'frio', 'Solo información', 'Solo quiero información, aun no estoy listo para contratar', 'pendiente_definir', 0),
  ('n10_c_m1_disposicion', 'tibio', 'Ligeramente listo', 'Estoy ligeramente listo para contratar', 'pendiente_definir', 1),
  ('n10_c_m1_disposicion', 'caliente', 'Listo + precisiones', 'Estoy listo para contratar, solo quiero más precisiones', 'pendiente_definir', 2),

  -- Marca personal: profesión.
  ('n10_d_profesion', 'legal_contable', 'Legal y contable', NULL, 'n10_d_agendar', 0),
  ('n10_d_profesion', 'escritor', 'Escritor literario', NULL, 'n10_d_agendar', 1),
  ('n10_d_profesion', 'otros', 'Otros', NULL, 'n10_d_agendar', 2),

  -- N10_d_agendar: disposición.
  ('n10_d_agendar', 'frio', 'Solo información', 'Solo quiero información, aun no estoy listo para contratar', 'pendiente_definir', 0),
  ('n10_d_agendar', 'tibio', 'Ligeramente listo', 'Estoy ligeramente listo para contratar', 'pendiente_definir', 1),
  ('n10_d_agendar', 'caliente', 'Listo + precisiones', 'Estoy listo para contratar, solo quiero más precisiones', 'pendiente_definir', 2)
ON CONFLICT (step_key, option_key) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  next_step_key = EXCLUDED.next_step_key,
  position = EXCLUDED.position;
