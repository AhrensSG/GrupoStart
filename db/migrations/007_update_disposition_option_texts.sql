-- 007_update_disposition_option_texts.sql
-- Actualiza los textos de las opciones de disposición (frio/tibio/caliente)
-- en los nodos donde se ofrecen como lista.

UPDATE bot_options
SET title = 'Solo información',
    description = 'aún no estoy listo para contratar'
WHERE option_key = 'frio'
  AND step_key IN ('n8_meeting', 'n10_a_m2', 'n10_a_m3');

UPDATE bot_options
SET title = 'Ligeramente listo',
    description = 'Busco un poco mas de detalles'
WHERE option_key = 'tibio'
  AND step_key IN ('n8_meeting', 'n10_a_m2', 'n10_a_m3');

UPDATE bot_options
SET title = 'Listo para contratar',
    description = 'Busco mas precisiones'
WHERE option_key = 'caliente'
  AND step_key IN ('n8_meeting', 'n10_a_m2', 'n10_a_m3');
