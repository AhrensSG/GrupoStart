# CHAT DEFINITIVO — Bot WhatsApp "Motor de Ventas"

> Documento maestro de lógica y nodos. **Sin IA.** Todo es determinístico y guiado por botones.

## 0. Principios

- **Ultra cerrado:** el bot solo reconoce los 4 mensajes disparadores definidos abajo + los botones que él mismo envía.
- **Cero IA:** no hay NLU, no hay interpretación de texto libre, no hay respuestas generadas.
- **Todo por botones:** cada pregunta se responde con botones (oSí/No, opciones cerradas, o captura de un dato puntual tipeado).
- **Si el usuario escribe algo no reconocido** → nodo `mensaje_no_reconocido`.
- Un solo camino activo por conversación. El bot recuerda en qué nodo está (`estado actual`).
- Estados posibles de un lead: `iniciando`, `en_curso`, `calificado`, `descalificado`, `derivado`, `finalizado`.

## 1. Mensajes disparadores (entrada)

Los posibles clientes mandan **exactamente** uno de estos 4 mensajes por WhatsApp. Cualquier otro texto no dispara el bot.

| # | ID | Mensaje exacto |
|---|----|----------------|
| 1 | `trigger_info` | Hola quiero más información del programa "Motor de Ventas" |
| 2 | `trigger_instalacion` | Hola, en cuanto tiempo instalan el programa ¿motor de ventas? |
| 3 | `trigger_contratar` | Hola, quiero contratar el "Motor de ventas" |
| 4 | `trigger_costo` | Hola, qué costo tiene el sistema "Motor de ventas" |

> Nota de implementación: normalizar antes de comparar (strip, minúsculas, sin tildes, comillas `“ ” " "` unificadas, espacios colapsados). Los 4 triggers **no** generan respuestas distintas: los 4 devuelven **siempre el mismo mensaje** (nodo `N1`) y luego entran al mismo flujo de calificación.

## 2. Variables del lead

| Variable | Origen | Ejemplo |
|----------|--------|---------|
| `origen` | trigger que|match| `trigger_costo` |
| `email` | input tipeado | `juan@mail.com` |
| `equipo_comercial` | botón | `1` / `2` / `5+` |
| `figura_legal` | botón | `SRL` |
| `facturacion_mensual` | botón | `USD 1.000 a 5.000` |
| `objetivo_marketing` | botón | `Aumentar la facturación` |
| `inversion_inicial` | botón | `Menos de $100.000` |
| `disposicion` | botón | `tibio` / `caliente` / `frio` |

## 3. Flujo principal (grafo)

```
[4 TRIGGERS]
      │
      ▼
  N1 respuesta_directa
      │
      ▼
  N2 botones_comenzamos  (Sí / No)
      ├── No ─────────────► N_fin_no
      └── Sí ─────────────► N3 input_correo
                              ├── inválido ─► N3 (reintento, máx 3)
                              └── válido ───► N4
  N4  botones_equipo_comercial
      ├── "Soy solo yo" ──► N5
      └── "2" / "5+" ─────► N6 botones_figura_legal
      N5  botones_otros_cargos  (Sí / No)
          ├── No ─► fin_descalificado
          └── Sí ─► N6
  N6  botones_figura_legal ──► N7
  N7  botones_facturacion
      ├── "Menos de usd 1.000" ──► N8_alt
      │        ├── No ──────────► fin_alternativa_no
      │        └── Sí ──────────► N9_objetivo (2 msgs apilados, 3+1)
      │                              └──► N10_inversion (varía según objetivo)
      │                                    └──► 3 montos, cada uno con nodo propio
      │                                          (N10a_m1/m2/m3, N10b_m1/m2/m3, N10c_m1/m2/m3)
      └── "USD 1.000-5.000" / "Más de USD 5.000" ─► N8_meeting (¿agendar?)
                                        ├── No ─► fin_no
                                        └── Sí ─► N10_inversion + fin_si

REGLA: cada botón tiene su propio nodo destino.
Nunca fusionar dos botones en un mismo nodo por compartir texto o lógica.
Si dos botones realmente van al mismo nodo, se declara explícitamente.
```

> Los textos y botones exactos de cada nodo se completan en §4 a medida que se definan.

## 4. Detalle de nodos

### N1 — `respuesta_inicial`

- **Disparador:** cualquiera de los 4 triggers.
- **Tipo:** mensaje de texto (sin botones).
- **Acción:** los 4 triggers escriben este mismo texto, byte por byte. Es una respuesta única, no hay variantes por trigger.

```
Hola 👋🏻

Mucho gusto, somos Grupo Start 🚀


Más de 10 años de experiencia y  +100 clientes satisfechos en Argentina y Europa nos respaldan.


Para que nos conozcas te cuento un poco sobre nosotros:


🏁 Somos una agencia de marketing completa 


📲 Integamos todos los procesos importantes en un solo lugar 


🧩 Contenidos, publicidad en meta ads, Chat Bot, e-comerce 




🔍 Primero te conocemos, luego proponemos 👉🏻 Vení a visitarnos📍Hipólito Yrigoyen 342, ciudad de Formosa 👉🏻 o agendemos una reunión por videollamada 👨🏻‍💻
```

**Siguiente:** `N1B`.

---

### N1B — `plantilla_video`

- **Disparador:** inmediatamente después de que se entregó `N1`.
- **Tipo:** plantilla de WhatsApp (WhatsApp Business API).
- **Nombre de la plantilla:** `video`
- **ID de la plantilla (Meta):** `1816918976166541`
- **Idioma:** `es`
- **Cuerpo del mensaje:** `Conocenos un poco más.`
- **Header:** video ya subido como asset de la plantilla en Meta (no se envía `link`; el header resuelve solo contra el asset guardado).
- **Sin componentes dinámicos:** el cuerpo es fijo, no recibe variables.
- **Retorno:** al confirmarse el envío de la plantilla, sigue a `N2`.

Payload de referencia:

```json
{
  "messaging_product": "whatsapp",
  "to": "{{phone}}",
  "type": "template",
  "template": {
    "name": "video",
    "language": { "code": "es" }
  }
}
```

> El video vive como asset dentro de la plantilla en Meta, así que el envío no lleva `components` ni URL. Si la plantilla de Meta lo definiera con `{{1}}` u otro parámetro, habría que mandar el array `components` con ese valor.

**Siguiente:** `N2`.

---

### N2 — `comenzamos`

- **Disparador:** luego de entregado `N1B`.
- **Tipo:** botones interactivos (2 opciones).
- **Texto:** `¿Comenzamos?`
- **Límite de WhatsApp:** 2 opciones ✓ (el máximo es 3).

| Botón | Valor | Siguiente |
|-------|-------|-----------|
| `Sí` | `si` | `N3` |
| `No` | `no` | `N_fin_no` |

> Si el usuario responde cualquier otra cosa (texto libre, otro botón) → `mensaje_no_reconocido` con opción de reintentar este nodo.

---

---

### N_fin_no — `respuesta_no`

- **Disparador:** botón `No` en `N2`.
- **Tipo:** mensaje de texto.
- **Texto:**

```
Comprendo, si necesitas algo mas no dudes en decírmelo, mientras voy a avisar a un representante humano para que pronto se ponga en contacto contigo
```

- **Acciones:** `handoff.representante_humano` (notifica al equipo; el lead queda como derivado).
- **Fin del flujo:** sí. El bot deja de responder ese número.

---

---

### N3 — `capturar_correo`

- **Disparador:** botón `Sí` en `N2`.
- **Tipo:** mensaje de texto + captura de texto libre (único input libre del bot).

**Mensaje:**

```
Excelente! 😊

Para comenzar podrías escribir tu correo en el chat?
```

- **Variable:** `email`
- **Validación:** formato email. Regex sugerida: `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`
- **Si es válido** → guarda `email` y sigue a `N4`.
- **Si no es válido** → reenvía `N3` con el mensaje de error, hasta 3 intentos. Al 3er fallo → `N_fin_email_invalido`.
- **Si el usuario no manda nada** → sin timeout definido (queda esperando).

---

### N4 — `equipo_comercial`

- **Disparador:** correo válido en `N3`.
- **Tipo:** mensaje de texto + 3 botones.
- **Límite de WhatsApp:** 3 opciones ✓ (el máximo permitido).

**Texto:**

```
Muchas gracias! seguro vamos a estar en contacto por ahí.


Te cuento, nuestra agencia instala "Motor de Ventas" únicamente en empresas que tienen capacidad para atender y convertir las oportunidades que generamos. 🔍


Actualmente cuantas personas forman parte de tu equipo comercial?  🤔
```

| Botón | Valor guardado | Siguiente |
|-------|----------------|-----------|
| `Soy solo yo` | `1` | `N5` |
| `2 personas` | `2` | `N6` |
| `5 personas o más` | `5+` | `N6` |

> Si el usuario responde cualquier otra cosa → `mensaje_no_reconocido` con opción de reintentar este nodo.

---

---

### N5 — `otros_cargos`

- **Disparador:** botón `Soy solo yo` en `N4`.
- **Tipo:** mensaje de texto + 2 botones.
- **Variable:** guarda `equipo_comercial = "1"`.

**Texto:**

```
Muy bien, instalar un motor de ventas que funcione siempre requerirá de un agente humano al final del camino. 👤

Tenes personas que se ocupen de otras áreas "clave de tu empresa" y vos estas encargado de la parte comercial? 🤔
```

| Botón | Valor | Siguiente |
|-------|-------|-----------|
| `Sí, somos varios` | `si_somos_varios` | `N6` |
| `NO, soy solo yo` | `no_solo_yo` | `N_fin_solo_yo` |

---

### N_fin_solo_yo — `descalificado_solo`

- **Disparador:** botón `NO, soy solo yo` en `N5`.
- **Tipo:** mensaje de texto.
- **Estado del lead:** `descalificado`.

**Texto:**

```
Comprendo, instalar un motor de ventas que funcione siempre requerirá de un agente humano al final del camino. 


no podremos instalar nuestro sistema ya que no podrá funcionar sin una estructura que lo respalde, pero vamos a estar en contacto a través del correo que nos brindaste, tal vez un poco mas adelante si podamos trabajar juntos ✈️
```

- **Acciones:** no hay handoff. Se conserva `email` para contacto futuro.
- **Fin del flujo:** sí.

---

### N6 — `figura_legal`

- **Disparador:** `Sí, somos varios` (N5) · `2 personas` (N4) · `5 personas o más` (N4).
- **Tipo:** mensaje de texto + 3 botones.
- **Decisión de diseño:** se muestran solo las 3 figuras legales más frecuentes. WhatsApp limita a 3 botones por mensaje y no hay paginación, así que el resto queda fuera del bot.
- **Descartadas:** `Persona humana`, `SAS`, `Negocio sin inscripción formal`, `Otras sociedades`, `Sociedad Anónima (SA)`.

**Texto:**

```
Ahora permíteme preguntarte 

¿Cual es la figura legal de tu empresa? 🤔
```

| Botón | Valor guardado | Siguiente |
|-------|----------------|-----------|
| `Monotributista` | `Monotributista` | `N7` |
| `Responsable inscripto` | `Responsable inscripto` | `N7` |
| `SRL` | `Sociedad de Responsabilidad Limitada (SRL)` | `N7` |

- **Guardado:** `figura_legal` = valor de la tabla (no el texto del botón).
- Si el usuario escribe algo no reconocido → `mensaje_no_reconocido` con reintento de este nodo.

---

### N7 — `facturacion_mensual`

- **Disparador:** cualquier botón de `N6`.
- **Tipo:** mensaje de texto + 3 botones.
- **Límite de WhatsApp:** 3 opciones ✓.

**Texto:**

```
Super!🚀

Actualmente aproximadamente cuando factura tu empresa al mes 🤔
```

| Botón | Valor guardado | Siguiente |
|-------|----------------|-----------|
| `Menos de usd 1.000` | `Menos de usd 1.000 al mes` | `N8_alt` |
| `Entre usd 1.000 a usd 5.000` | `Entre usd 1.000 a usd 5.000 al mes` | `N8_prioridades` |
| `Más de usd 5000` | `Más de usd 5.000 al mes` | `N8_meeting` |

- **Guardado:** `facturacion_mensual` = valor de la tabla.
- Si el usuario escribe algo no reconocido → `mensaje_no_reconocido` con reintento de este nodo.

---

### N8_meeting — `presentar_programa_completo`

- **Disparador:** botón `Más de usd 5000` en `N7`.
- **Tipo:** lista.

**Texto:**

```
Muy bien, el programa "Motor de ventas" sin lugar a dudas puede ayudarte a alcanzar el siguiente nivel. 📈

La pauta publicitaría intensiva será una maquina de traerte oportunidades de ventas 
La implementación de un agente que "precalifique a tus leads" hará mas eficiente el proceso 
El ecomerce te va a ayudar a tener el control 
y el marketing de redes va a posiciónar a tu marca.


te voy a agendar una reunión con un representante, por ultimo podrías elegir una de las siguientes opciones (con la que te sientas mas comodo/a, claro) 🤔
```

| Botón | Título en el menú | Siguiente |
|-------|-------------------|-----------|
| `Solo quiero información, aun no estoy listo para contratar` | Solo información | `N8_meeting_agenda` |
| `Estoy ligeramente listo para contratar` | Ligeramente listo | `N8_meeting_agenda_tibio` |
| `Estoy listo para contratar, solo quiero mas precisiones` | Listo + precisiones | `N8_meeting_agenda_caliente` |

> Las opciones van como lista porque el texto completo no entra en un botón de 20 caracteres.
>
> Cada opción tiene su propio nodo de agenda, con un margen distinto según lo cerca que esté de contratar.

#### N8_meeting_agenda

- **Disparador:** botón `Solo quiero información, aun no estoy listo para contratar` en `N8_meeting`.
- **Tipo:** nodo de agenda. Mismo texto que las otras agendas, nodo aparte.
- **Margen:** mínimo 5 días hábiles desde hoy.

**Texto:**

```
Bien , lo comprendo, tengo estas fechas disponibles para la reunión con uno de nuestros representantes ¿cual te queda mejor? 🤔
```

| Botón | Qué guarda | Siguiente |
|-------|------------|-----------|
| Horario 1 | `horario`, `horario_texto`, `fecha`, `hora`, `saludo` | `N10a_m2_agendando` |
| Horario 2 | `horario`, `horario_texto`, `fecha`, `hora`, `saludo` | `N10a_m2_agendando` |
| Horario 3 | `horario`, `horario_texto`, `fecha`, `hora`, `saludo` | `N10a_m2_agendando` |

> Comparte la confirmación con el resto de las agendas. Nodo aparte por la regla de que cada botón tenga su destino.

#### N8_meeting_agenda_tibio

- **Disparador:** botón `Estoy ligeramente listo para contratar` en `N8_meeting`.
- **Tipo:** nodo de agenda. Mismo texto, nodo aparte, **3 días hábiles** de margen.

**Texto:**

```
Bien , lo comprendo, tengo estas fechas disponibles para la reunión con uno de nuestros representantes ¿cual te queda mejor? 🤔
```

| Botón | Qué guarda | Siguiente |
|-------|------------|-----------|
| Horario 1 | `horario`, `horario_texto`, `fecha`, `hora`, `saludo` | `N10a_m2_agendando` |
| Horario 2 | `horario`, `horario_texto`, `fecha`, `hora`, `saludo` | `N10a_m2_agendando` |
| Horario 3 | `horario`, `horario_texto`, `fecha`, `hora`, `saludo` | `N10a_m2_agendando` |

> Los caminos tibio de ambas ramas de facturación (`N8_meeting_agenda_tibio` y `N10a_m2_agenda_tibio`) tienen 3 días hábiles. Los frios, 5.

#### N8_meeting_agenda_caliente

- **Disparador:** botón `Estoy listo para contratar, solo quiero mas precisiones` en `N8_meeting`.
- **Tipo:** nodo de agenda. Mismo texto, nodo aparte, **1 día hábil** de margen: el
  cliente ya está listo para contratar y puede agendar al día siguiente.

**Texto:**

```
Bien , lo comprendo, tengo estas fechas disponibles para la reunión con uno de nuestros representantes ¿cual te queda mejor? 🤔
```

| Botón | Qué guarda | Siguiente |
|-------|------------|-----------|
| Horario 1 | `horario`, `horario_texto`, `fecha`, `hora`, `saludo` | `N10a_m2_agendando` |
| Horario 2 | `horario`, `horario_texto`, `fecha`, `hora`, `saludo` | `N10a_m2_agendando` |
| Horario 3 | `horario`, `horario_texto`, `fecha`, `hora`, `saludo` | `N10a_m2_agendando` |

> **Margenes de la rama de facturación alta:** frío 5 días hábiles, tibio 3, caliente 1. Cuanto más cerca de contratar, antes puede agendar.

---

### N8_prioridades — `preguntar_prioridad`

- **Disparador:** botón `Entre usd 1.000 a 5.000` en `N7`.
- **Tipo:** texto. Las 2 frases van en el mensaje apilado.

**Texto:**

```
Muy bien, estoy pensando que instalar "Motor de ventas" en tu negocio puede ser algo apresurado 🤔

🗓️ Sin embargo ayúdame a entender un poco mas sobre tus prioridades hoy. 

Elegí la frase con la que mas te identifiques:
```

#### N8_prioridades_frases

- **Tipo:** lista, mandada apilada detrás de `N8_prioridades`.

**Texto:**

```
1️⃣ Estoy buscando escalar mi negocio, comprendo que debo hacer esfuerzos para alcanzar el siguiente nivel en mi negocio

2️⃣ Quiero vender mas, pero no puedo permitirme grandes esfuerzos económicos por mi situación personal, puedo atender a leads calificados resignando las automatizaciones
```

| Botón | Título en el menú | Siguiente |
|-------|-------------------|-----------|
| Opción 1 | Opción 1 | `N8_prioridades_agenda` |
| Opción 2 | Opción 2 | `N8_prioridades_objetivos` |

> **Por qué van numeradas y no como descripción:** la descripción de una fila de lista la corta WhatsApp a 72 caracteres, y las frases miden 116 y 165. Se cortaban a la mitad y el cliente leía una frase incompleta. Por eso el texto completo va en el cuerpo del mensaje y el botón es el número de la frase.

---

### N8_prioridades_agenda — `agendar_prioridad_escalar`

- **Disparador:** botón `Opción 1` en `N8_prioridades_frases` (el cliente se identificó con “estoy buscando escalar mi negocio”).
- **Tipo:** nodo de agenda. Pide los horarios a Calendly al llegar y ofrece hasta 3.
- **Margen:** 1 día hábil, el más corto de todo el bot. Es el plazo mínimo pedido para este camino: el cliente ya está con disposición de contratar y espera agendar enseguida.

**Texto:**

```
Tenes un espíritu de Guerrero 💪🏻

veo viable que podamos trabajar juntos, te voy a agendar una reunión con un representante 🗓️ ¿cual de estas opciones te queda mejor para la reunión?
```

Al elegir un horario sigue la confirmación común (`N10_a_m2_agendando` → `N10_a_m2_agendado`) y avisa a los administradores.

---

### N8_prioridades_objetivos — `preguntar_objetivo_marketing`

- **Disparador:** botón `Opción 2` en `N8_prioridades_frases` (el cliente se identificó con “quiero vender mas, pero no puedo permitirme grandes esfuerzos económicos”).
- **Tipo:** mensaje de texto + 3 botones, con un 4º objetivo apilado en `N8_prioridades_objetivos_b`.
- Mismo texto y mismos destinos que `N9`, pero es un nodo aparte por la regla de un destino por botón.

**Texto:**

```
Muy bien, puedo armarte un plan de marketing que te impulse contemplando tu facturación actual para que pronto podamos instalar "motor de ventas" en tu proyecto. 🚀

¿Cual de estos objetivos asociado al marketing de redes sociales es el que mas te interesa en este momento? 🤔
```

| Botón | Título en el menú | Siguiente |
|-------|-------------------|-----------|
| Aumentar la facturación | Aumentar la facturación | `N10_a` |
| Crecer en seguidores | Crecer en seguidores | `N10_b` |
| Mejorar la interacción | Mejorar la interacción | `N10_c` |

#### N8_prioridades_objetivos_b

- **Tipo:** botones, mandada apilada detrás de `N8_prioridades_objetivos`.

**Texto:**

```
Y esta también es una buena opción 🤔
```

| Botón | Título en el menú | Siguiente |
|-------|-------------------|-----------|
| Marca personal | Marca personal | `N10_d_profesion` |

---

### N8_alt — `ofrecer_alternativa`

- **Disparador:** botón `Menos de usd 1.000` en `N7`.
- **Tipo:** mensaje de texto + 2 botones.

**Texto:**

```
Muy bien 🔍

ganando menos de usd 1.000 al mes tu prioridad hoy no será la implementación de un sistema como esta pensado "motor de ventas"  


ya que este busca atraer oportunidades de ventas a gran escala. 📈


sin embargo creo que podemos intentar algo alternativo pero a menor escala de complejidad


Te gustaría que te ofrezca una solución alternativa? 🤔
```

| Botón | Valor | Siguiente |
|-------|-------|-----------|
| `Sí` | `si` | `N9_objetivo` |
| `No` | `no` | `N_fin_alternativa_no` |

---

### N9_objetivo_a — `objetivo_marketing_1`

- **Disparador:** botón `Sí` en `N8_alt`.
- **Tipo:** mensaje de texto + 3 botones.
- **Decisión de diseño:** 4 opciones no entran en un mensaje. Van 2 mensajes interactivos apilados (3 + 1). El usuario toca en el que quiera; ambos escriben la misma variable.

**Texto:**

```
Muy bien, puedo armarte un plan de marketing que te impulse contemplando tu facturación actual para que pronto podamos instalar "motor de ventas" en tu proyecto. 🚀

¿Cual de estos objetivos asociado al marketing de redes sociales es el que mas te interesa en este momento? 🤔
```

**Botones (mensaje 1 de 2):**

| Botón | Valor guardado | Siguiente |
|-------|----------------|-----------|
| `Aumentar la facturación` | `Aumentar la facturación` | `N10_inversion_a` |
| `Crecer en seguidores` | `Crecer en seguidores` | `N10_inversion_b` |
| `Mejorar la interacción con mi comunidad` | `Mejorar la interacción con mi comunidad` | `N10_inversion_c` |

---

### N9_objetivo_b — `objetivo_marketing_2`

- **Disparador:** se envía inmediatamente después de `N9_objetivo_a`.
- **Tipo:** mensaje de texto + 1 botón.

**Botón (mensaje 2 de 2):**

| Botón | Valor guardado | Siguiente |
|-------|----------------|-----------|
| `Desarrollar mi marca personal` | `Desarrollar mi marca personal` | `N9d_profesion` |

> El texto de la pregunta no se repite: va solo el botón, para que se lea como continuación del mensaje anterior.

**Riesgo:** si el usuario toca antes de que se envíe el segundo mensaje, se pierde la opción de marca personal. Mitigación: throttle de ~1s entre envíos y Validation API para detectar taps fuera de ventana.

---

### N9d_profesion — `profesion`

- **Disparador:** botón `Desarrollar mi marca personal` (N9_b).
- **Tipo:** mensaje de texto + 3 botones.
- **Guardado:** `profesion` = valor del botón.
- **Nota:** este objetivo pide un dato extra (profesión) antes de llegar a la pregunta de inversión, a diferencia de los otros tres.

**Texto:**

```
Muy bien, excelente objetivo 😊
hacerlo te permitirá ofrecer todo tipo de productos/servicios asociados a tu nombre 🚀 


¿cual es tu profesión? 👤
```

| Botón | Valor guardado | Siguiente |
|-------|----------------|-----------|
| `Legal y contable` | `Legal y contable` | `N9d_agendar` |
| `Escritor literario` | `Escritor literario` | `N9d_agendar` |
| `Otros` | `Otros` | `N9d_agendar` |

**Excepción declarada:** las 3 profesiones convergen en un mismo nodo, `N9d_agendar`. A diferencia del resto, acá la lógica es idéntica para las 3 y el texto es el mismo.

---

### N9d_agendar — `agendar_marca_personal`

- **Disparador:** cualquiera de los 3 botones de `N9d_profesion`.
- **Tipo:** mensaje de texto + 3 botones.
- **Nodo nuevo:** no reutiliza el nodo de agendar reunión de la rama de facturación alta.

**Texto:**

```
Super, voy a agendar una reunión con un representante humano, les encantará conocerte. 😊

🗓️ Voy a agendarte una reunión para que uno de nuestros representantes te pueda armar un plan a medida.


por ultimo, podrías elegir una de las siguientes opciones (con la que te sientas mas comodo/a, claro) 🤔
```

**Botones (3):**

| Botón | Valor guardado | Siguiente |
|-------|----------------|-----------|
| `Solo quiero información, aun no estoy listo para contratar` | `Solo quiero información, aun no estoy listo para contratar` | `N9d_frio` |
| `Estoy ligeramente listo para contratar` | `Estoy ligeramente listo para contratar` | `N9d_tibio` |
| `Estoy listo para contratar, solo quiero más precisiones` | `Estoy listo para contratar, solo quiero más precisiones` | `N9d_caliente` |

> La tercera opción es un solo botón con las dos frases unidas: "Estoy listo para contratar, solo quiero más precisiones". Así entra en el límite de 3 de WhatsApp.

**Cada botón tiene su propio nodo destino.**

#### `N9d_frio` — pendiente de definir
#### `N9d_tibio` — pendiente de definir
#### `N9d_caliente` — pendiente de definir

---

### N10_inversion_a — `inversion_aumentar_facturacion`

- **Disparador:** botón `Aumentar la facturación` (N9_a o N9_b).
- **Tipo:** mensaje de texto + 3 botones.

**Texto:**

```
Muy bien 🚀

para ello necesitaremos apalancarnos principalmente de "anuncios" para que puedas obtener resultados a corto plazo que luego te permitan adquirir mas recursos de marketing para seguir posicionando tu marca, dime con cual de estos montos de inversión inicial te sentís mas comodo? 🤔
```

| Botón | Valor guardado | Siguiente |
|-------|----------------|-----------|
| `Menos de $100.000` | `Menos de $100.000 (pesos argentinos)` | `N_fin_bajo_inversion` |
| `Entre $200.000 a $300.000` | `Entre $200.000 a $300.000 (Pesos Argentinos)` | `N10a_m2` |
| `Algo más de $300.000` | `Algo más de $300.000 (Pesos Argentinos)` | `N10a_m3` |

**Cada botón tiene su propio nodo destino.** No se fusionan por compartir contenido.

---

### N10a_m2 — `prueba_campana_200k`

- **Disparador:** botón `Entre $200.000 a $300.000` en `N10_inversion_a`.
- **Tipo:** mensaje de texto + 3 opciones de disposición (lista, por el largo del texto).
- **Guardado:** `inversion_inicial` = `Entre $200.000 a $300.000 (Pesos Argentinos)`.

**Texto:**

```
Muy bien 😊

Estoy pensando que podemos hacer una primera prueba, podemos configurar una campaña publicitaría full que salaría exactamente $200.000 pesos argentinos.


Te voy a agendar una reunión con un agente humano, por ultimo podrías elegir una de las siguientes opciones (con la que te sientas mas comodo/a, claro) 🤔
```

| Botón | Valor guardado | Siguiente |
|-------|----------------|-----------|
| `Solo quiero información, aun no estoy listo para contratar` | `Solo quiero información, aun no estoy listo para contratar` | `N10a_m2_frio` |
| `Estoy ligeramente listo para contratar` | `Estoy ligeramente listo para contratar` | `N10a_m2_tibio` |
| `Estoy listo para contratar, solo quiero más precisiones` | `Estoy listo para contratar, solo quiero más precisiones` | `N10a_m2_agenda_caliente` |

> Es un solo nodo: el texto ya anuncia la reunión con un agente humano, así que no hace falta un nodo intermedio de agendar.
> Las opciones van como lista porque no entran en botones de 20 caracteres.

#### N10a_m2_frio — `agendar_reunion`

- **Disparador:** botón `Solo quiero información, aun no estoy listo para contratar` en `N10a_m2`.
- **Tipo:** nodo de agenda. Ofrece 3 horarios libres de Calendarly.
- **Margen:** mínimo 5 días hábiles desde hoy (excluye sábados y domingos; feriados aún no contemplados).

**Texto:**

```
Bien , lo comprendo, tengo estas fechas disponibles para la reunión con uno de nuestros representantes ¿cual te queda mejor? 🤔
```

| Botón | Qué guarda | Siguiente |
|-------|------------|-----------|
| Horario 1 | `horario`, `horario_texto`, `fecha`, `hora`, `saludo` | `N10a_m2_agendando` |
| Horario 2 | `horario`, `horario_texto`, `fecha`, `hora`, `saludo` | `N10a_m2_agendando` |
| Horario 3 | `horario`, `horario_texto`, `fecha`, `hora`, `saludo` | `N10a_m2_agendando` |

> Las etiquetas de los botones son los horarios reales de Calendarly, en hora de Argentina. Ej: `Mar 03/11 11:00`. El motor las arma al llegar al nodo, no están cargadas en la base.
>
> **Calendarly todavía no está integrado.** Hasta conectarlo, este nodo avisa al asesor y cierra (`agenda_sin_horarios`) en vez de ofrecer fechas, para no dejar al cliente esperando. Cuando se conecte, el flujo sigue solo.
>
> Falta la reserva real: hoy el bot muestra el horario y avisa a los administradores, pero la reunión no queda creada en Calendarly. Eso requiere llamar al endpoint de booking, pasando el email que el cliente ya dejó en `n3`.
>
> **Al integrar la API** hacen falta dos variables de entorno: `CALENDLY_TOKEN` y `CALENDLY_EVENT_URI` (el uri del tipo de evento, no el link personal). El margen de 5 días y la cantidad de horarios se editan en la fila del nodo.

#### N10a_m2_agendando

- **Disparador:** el cliente elige un horario en `N10a_m2_frio`.
- **Tipo:** texto. Sale solo y a continuación manda la confirmación.

**Texto:**

```
🗓️Muy bien, voy a agendar la reunión, dame un minuto... 
```

#### N10a_m2_agendado

- **Disparador:** automático desde `N10a_m2_agendando`.
- **Tipo:** texto, cierre. Avisa a los administradores.

**Texto:**

```
Reunión confirmada el {{fecha}} a las {{hora}} uno de nuestros representantes se conectará contigo. Que tengas {{saludo}} 😊
```

| Placeholder | Ejemplo | De dónde sale |
|-------------|---------|--------------|
| `{{fecha}}` | `03/11/2026` | Del horario elegido |
| `{{hora}}` | `11:00` | Del horario elegido |
| `{{saludo}}` | `muy buen día` | Según la hora: antes de las 12, `muy buena tarde` hasta las 19, `muy buena noche` después |

> Cuando se integre la reserva real, este es el nodo que confirma. El texto no dice "quedó agendado" en Calendarly todavía, así que conviene conectarlo antes de mandarlo a producción.

#### N10a_m2_tibio — `agendar_reunion`

- **Disparador:** botón `Estoy ligeramente listo para contratar` en `N10a_m2`.
- **Tipo:** nodo de agenda. Mismo texto que `N10a_m2_frio`, pero nodo aparte.
- **Margen:** mínimo 3 días hábiles desde hoy, no 5 como el camino frío. Al estar
  más cerca de contratar, puede agendar antes.

**Texto:**

```
Bien , lo comprendo, tengo estas fechas disponibles para la reunión con uno de nuestros representantes ¿cual te queda mejor? 🤔
```

| Botón | Qué guarda | Siguiente |
|-------|------------|-----------|
| Horario 1 | `horario`, `horario_texto`, `fecha`, `hora`, `saludo` | `N10a_m2_agendando` |
| Horario 2 | `horario`, `horario_texto`, `fecha`, `hora`, `saludo` | `N10a_m2_agendando` |
| Horario 3 | `horario`, `horario_texto`, `fecha`, `hora`, `saludo` | `N10a_m2_agendando` |

> El margen de días hábiles se configura por nodo, en la columna `calendar_min_business_days`. Hoy `N10a_m2_agenda` tiene 5, `N10a_m2_agenda_tibio` tiene 3 y `N10a_m2_agenda_caliente` tiene 1.
>
> Comparte la confirmación con el camino frío (`N10a_m2_agendando` → `N10a_m2_agendado`). Si más adelante el tibio necesita otro texto, se le crea su propio nodo de confirmación.

#### N10a_m2_agenda_caliente — `agendar_reunion`

- **Disparador:** botón `Listo + precisiones` en `N10a_m2`.
- **Tipo:** nodo de agenda. Mismo texto que los otros dos caminos, nodo aparte.
- **Margen:** mínimo 1 día hábil desde hoy. Es el plazo mínimo de todo el bot: el
  cliente ya está listo para contratar y espera agendar enseguida.

**Texto:**

```
Bien , lo comprendo, tengo estas fechas disponibles para la reunión con uno de nuestros representantes ¿cual te queda mejor? 🤔
```

| Botón | Qué guarda | Siguiente |
|-------|------------|-----------|
| Horario 1 | `horario`, `horario_texto`, `fecha`, `hora`, `saludo` | `N10a_m2_agendando` |
| Horario 2 | `horario`, `horario_texto`, `fecha`, `hora`, `saludo` | `N10a_m2_agendando` |
| Horario 3 | `horario`, `horario_texto`, `fecha`, `hora`, `saludo` | `N10a_m2_agendando` |

> Los 3 caminos de esta inversión ($200.000) ofrecen el mismo texto y sus márgenes
> son 5, 3 y 1 día hábil según la disposición que eligió el cliente.

---

### N10a_m3 — `plan_marketing_300k`

- **Disparador:** botón `Algo más de $300.000 (Pesos Argentinos)` en `N10a`.
- **Tipo:** lista con las 3 opciones de disposición.

**Texto:**

```
Muy bien 😊

estoy pensando que podemos hacer una primera prueba, podemos hacer trazar un plan de marketing para redes sociales que tenga 👇🏻

- campaña publicitaría full por 10 días
- 4 posteos para el feed
- 2 videos para el feed 


👉🏻 Te voy a agendar una reunión con un agente humano, para que pueda explicarte mas detalles.


por ultimo podrías elegir una de las siguientes opciones (con la que te sientas mas comodo/a, claro) 🤔
```

| Botón | Texto en el menú | Siguiente |
|-------|-------------------|-----------|
| Solo información | Solo quiero información, aun no estoy listo para contratar | `N10a_m3_agenda` |
| Ligeramente listo | Estoy ligeramente listo para contratar | `N10a_m3_agenda_tibio` |
| Listo + precisiones | Estoy listo para contratar, solo quiero mas precisiones | `N10a_m3_agenda_caliente` |

> Los 3 destinos son nodos de agenda aparte, con el mismo texto que las demás agendas. Los márgenes van por camino: el frío ofrece desde 5 días hábiles, el tibio desde 3 y el caliente desde 1.

---

### N_fin_bajo_inversion — `sin_solucion_menor_100k`

- **Disparador:** botón `Menos de $100.000` en `N10_inversion_a`.
- **Tipo:** mensaje de texto.
- **Estado del lead:** `descalificado`.
- **Guardado:** `inversion_inicial` = `Menos de $100.000 (pesos argentinos)`.

**Texto:**

```
Muy bien 😊

Gracias por tus respuestas sinceras a lo largo de tu interacción conmigo, he buscado en las soluciones que ofrece mi agencia pero no encontré una solución que nos permita avanzar juntos en este recorrido 😪


sin embargo nos mantendremos en contacto a través del correo que nos brindaste, tal vez en un tiempo podamos trabajar juntos 
```

- **Acciones:** sin handoff. Se conserva el `email` para contacto futuro.
- **Fin del flujo:** sí.

---

### N10_inversion_b — `inversion_crecer_seguidores`

- **Disparador:** botón `Crecer en seguidores` (N9_a o N9_b).
- **Tipo:** mensaje de texto + 3 botones.

**Texto:**

```
Muy bien, hagámoslo!  🚀

Para que crezcas en seguidores requerirás un plan en el que podamos publicar la mayor cantidad de videos posibles a la semana, y campañas publicitarias con objetivo de trafico a tu perfil de Instagram para aumentar tu alcance. 📈


dime con cual de estos montos de inversión inicial te sentís mas comodo? 🤔
```

| Botón | Valor guardado | Siguiente |
|-------|----------------|-----------|
| `Menos de $100.000` | `Menos de $100.000 (pesos argentinos)` | `N10b_monto_bajo` |
| `Entre $200.000 a $300.000` | `Entre $200.000 a $300.000 (Pesos Argentinos)` | `N10b_m2` |
| `Algo más de $300.000` | `Algo más de $300.000 (Pesos Argentinos)` | `N10b_m3` |

**Cada botón tiene su propio nodo destino.**

#### `N10b_m2` — pendiente de definir
#### `N10b_m3` — pendiente de definir

---

### N10b_monto_bajo — `ofrecer_descuento`

- **Disparador:** botón `Menos de $100.000` en `N10_inversion_b`.
- **Tipo:** mensaje de texto + 2 botones.

**Texto:**

```
Muy bien, revise en el sistema, encontré algo 🔍

podemos hacer un plan de 1 videos al mes + publicidad básica en meta ads por 10 días por $106.125, creo que un asesor comercial humano podría autorizar un descuento y que lo dejemos en $100.000 fijos al mes ✅


Te gustaría que intente conseguirte el descuento y que un agente humano tome tu caso? 🤔
```

| Botón | Valor | Siguiente |
|-------|-------|-----------|
| `Sí` | `si` | `N11_disposicion` |
| `No` | `no` | `N_fin_no` |

> El `No` reutiliza `N_fin_no` tal cual está definido en §4.

---

### N11_disposicion — `disposicion_contratacion`

- **Disparador:** botón `Sí` en `N10b_monto_bajo`.
- **Tipo:** mensaje de texto + botones de disposición.

**Texto:**

```
Cuenta con ello, intentaré conseguirte un descuento. 💪🏻


por ultimo podrías elegir una de las siguientes opciones (con la que te sientas mas comodo/a, claro) 🤔
```

**Botones (3):**

| Botón | Valor guardado | Siguiente |
|-------|----------------|-----------|
| `Solo quiero información, aun no estoy listo para contratar` | `Solo quiero información, aun no estoy listo para contratar` | `N_fin_frio` |
| `Estoy ligeramente listo para contratar` | `Estoy ligeramente listo para contratar` | `N_fin_tibio` |
| `Estoy listo para contratar, solo quiero más precisiones` | `Estoy listo para contratar, solo quiero más precisiones` | `N_fin_caliente` |

> La tercera opción es un solo botón con las dos frases unidas: "Estoy listo para contratar, solo quiero más precisiones". Así entra en el límite de 3.

---

### N10_inversion_c — `inversion_mejorar_interaccion`

- **Disparador:** botón `Mejorar la interacción con mi comunidad` (N9_a).
- **Tipo:** mensaje de texto + 3 botones.

**Texto:**

```
Muy bien, para ello necesitaremos crear una estrategia que despierte el deseo de interactuar con tu marca.

Eso se logra publicando con frecuencia contenido que humanice tu perfil variando formatos.


dime con cual de estos montos de inversión inicial te sentís mas comodo? 🤔
```

| Botón | Valor guardado | Siguiente |
|-------|----------------|-----------|
| `Menos de $100.000` | `Menos de $100.000 (pesos argentinos)` | `N10c_m1` |
| `Entre $200.000 a $300.000` | `Entre $200.000 a $300.000 (Pesos Argentinos)` | `N10c_m2` |
| `Algo más de $300.000` | `Algo más de $300.000 (Pesos Argentinos)` | `N10c_m3` |

**Cada botón tiene su propio nodo destino.** Para este objetivo los 3 están pendientes, incluido el monto bajo (no asumo que va a `N_fin_bajo_inversion`).

#### N10c_m1 — `ofrecer_plan_2_videos`

- **Disparador:** botón `Menos de $100.000` en `N10_inversion_c`.
- **Tipo:** mensaje de texto + 2 botones.

**Texto:**

```
Muy bien, revise en el sistema, encontré algo.. 💪🏻



podemos hacer un plan de 2 videos al mes + 2 carruseles de 3 imagenes por solo $106.750 


creo que un asesor comercial humano podría autorizar un descuento y que lo dejemos en $100.000 fijos al mes 👈🏻


Te gustaría que intente conseguirte el descuento y que un agente humano tome tu caso? 🤔
```

| Botón | Valor | Siguiente |
|-------|-------|-----------|
| `Sí` | `si` | `N10c_m1_disposicion` |
| `No` | `no` | `N10c_m1_no` |

> Nodo nuevo, independiente de `N10b_monto_bajo`. Mismo patrón de pregunta pero otra oferta: acá son 2 videos + 2 carruseles por $106.750, en el otro 1 video + publicidad por $106.125.

---

#### N10c_m1_no — `sin_descuento_2_videos`

- **Tipo:** mensaje de texto.
- **Fin del flujo:** sí.

**Texto:**

```
Comprendo, si necesitas algo mas no dudes en decírmelo, mientras voy a avisar a un representante humano para que pronto se ponga en contacto contigo
```

> Nodo nuevo. El texto coincide con `N_fin_no` pero no se reutiliza: cada camino tiene su propio nodo final.

---

#### N10c_m1_disposicion — `disposicion_plan_2_videos`

- **Disparador:** botón `Sí` en `N10c_m1`.
- **Tipo:** mensaje de texto + 3 botones.

**Texto:**

```
Cuenta con ello, intentaré conseguirte un descuento. 💪🏻


por ultimo podrías elegir una de las siguientes opciones (con la que te sientas mas comodo/a, claro) 🤔
```

| Botón | Valor guardado | Siguiente |
|-------|----------------|-----------|
| `Solo quiero información, aun no estoy listo para contratar` | `Solo quiero información, aun no estoy listo para contratar` | `N10c_m1_frio` |
| `Estoy ligeramente listo para contratar` | `Estoy ligeramente listo para contratar` | `N10c_m1_tibio` |
| `Estoy listo para contratar, solo quiero más precisiones` | `Estoy listo para contratar, solo quiero más precisiones` | `N10c_m1_caliente` |

> Nodo nuevo, no reutiliza `N11_disposicion` aunque tenga texto y botones idénticos.

#### `N10c_m1_frio` — pendiente de definir
#### `N10c_m1_tibio` — pendiente de definir
#### `N10c_m1_caliente` — pendiente de definir

---

#### `N10c_m2` — pendiente de definir
#### `N10c_m3` — pendiente de definir

---

_(los demás nodos se completan a medida que se definan)_

## 5. Persistencia y handoff

- Collection: `clientes` — un documento por número de WhatsApp.
- Al derivar a humano: `handoff.representante_humano` + resumen de variables + `origen`.

## 6. Implementación

El flujo vive en la base, no en `bots/motor-ventas.json` (ese JSON no lo lee ningún
código: el motor lee `bot_steps` + `bot_options`).

| Pieza | Rol |
|-------|-----|
| `db/chat-definitivo.md` | Este documento. Fuente de verdad de la lógica. |
| `db/migrations/006_chat_definitivo.sql` | Columnas nuevas: `trigger_texts`, `auto_advance`, `also_send_step_key`, `validation`, `invalid_body`, `max_attempts`, `on_fail_step_key`, `template_name`, y `kind = 'template'`. |
| `db/seeds/002_chat_definitivo.sql` | El flujo en SQL. Idempotente: `npm run seed` lo recarga. |
| `lib/bot/engine.js` | Motor. Valida disparadores, encadena envíos, reintenta inputs inválidos. |
| `lib/tools/whatsapp-cloud.js` | `sendTemplateByName` para los nodos de plantilla. |
| `scripts/test-bot.js` | Prueba de humo del flujo completo. |

Mapeo de nodos: N1→`n1`, N1B→`n1b`, N2→`n2`, N3→`n3`, N4→`n4`, N5→`n5`, N6→`n6`,
N7→`n7`, N8_alt→`n8_alt`, N9_a→`n9`, N9_objetivo_b→`n9b`, N10_inversion_a→`n10_a`,
N10_inversion_b→`n10_b`, N10_inversion_c→`n10_c`, N10b_monto_bajo→`n10_b_m1`,
N10c_m1→`n10_c_m1`, N11_disposicion→`n11_disposicion`.

### Límites de WhatsApp y cómo se resolvieron

| Límite | Qué se hizo |
|--------|-------------|
| 3 botones por mensaje | 4 objetivos de marketing → 2 mensajes apilados (`also_send_step_key`). |
| 20 caracteres por botón | Las 3 opciones de disposición son largas → se mandan como lista (`kind = 'list'`), con título corto + `description` con el texto completo. |
| 4 figuras legales | Se muestran solo las 3 más frecuentes. |
| 1 cuerpo obligatorio | El nodo apilado `n9b` lleva una línea de texto propia. |

### Nodos pendientes

Los nodos cuya lógica todavía no está definida apuntan a `pendiente_definir`, que avisa
al asesor y cierra. **Ningún camino queda trabado.** Para completar uno: definí el texto
en este documento, cargá el nodo en `002_chat_definitivo.sql` y apuntá el botón a él.

- [ ] `fin_alternativa_no` — cierre cuando no quiere la solución alternativa (texto provisorio).
- [x] `n7` → `mas_5000` — texto cargado con sus 3 opciones de disposición.
- [x] `n7` → `1000_5000` — texto y 2 frases cargados (`N8_prioridades`).
- [x] `n8_prioridades_frases` → `opcion_1` (nodo `N8_prioridades_agenda`, margen de 1 día hábil).
- [x] `n8_prioridades_frases` → `opcion_2` (nodos `N8_prioridades_objetivos` + `N8_prioridades_objetivos_b`, 4 objetivos de marketing). Rama de facturación media completa.
- [x] `n8_meeting` → `frio` (nodo `N8_meeting_agenda`, margen de 5 días hábiles).
- [x] `n8_meeting` → `tibio` (nodo `N8_meeting_agenda_tibio`, margen de 3 días hábiles).
- [x] `n8_meeting` → `caliente` (nodo `N8_meeting_agenda_caliente`, margen de 1 día hábil). Rama de facturación alta completa.
- [x] `n10_a` monto `alto_300k` — texto, 3 opciones de disposición y las 3 agendas (`N10a_m3_agenda` 5 días hábiles, `_tibio` 3, `_caliente` 1). Rama de "Aumentar la facturación" completa salvo el destino `caliente` de `n10_a_m2`.
- [ ] `n10_b` montos `medio_300k` y `alto_300k`.
- [ ] `n10_c` montos `medio_300k` y `alto_300k`.
- [x] `n10_a_m2` → `tibio` (nodo `N10a_m2_agenda_tibio`, margen de 3 días hábiles).
- [x] `n10_a_m2` → `caliente` (nodo `N10a_m2_agenda_caliente`, margen de 1 día hábil). Rama de la inversión de $200.000 completa con sus 3 agendas.
- [x] `n10_a_m2_agendado` — confirmación de la reunión con fecha, hora y saludo.
- [ ] **Reservar de verdad en Calendarly** — el bot muestra el horario y avisa a los administradores, pero la reunión todavía no se crea en Calendarly. Necesita el endpoint de booking con el email de `n3`.
- [ ] **Integrar Calendarly** — `CALENDLY_TOKEN` + `CALENDLY_EVENT_URI`. Mientras tanto el nodo de agenda avisa al asesor.
- [ ] `n11_disposicion` → `frio`, `tibio`, `caliente` (3 finales distintos).
- [ ] `n10_c_m1_disposicion` → `frio`, `tibio`, `caliente` (3 finales distintos).
- [ ] `n10_d_agendar` → `frio`, `tibio`, `caliente` (3 finales distintos).
- [ ] `n3` email inválido 3 veces → `on_fail_step_key`.
