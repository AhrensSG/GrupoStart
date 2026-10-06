# PLAN DE MARKETING TIKKUNKARUNA — 90 DÍAS

> Terapias holísticas online (Inma) · Reiki · Péndulo Hebreo · España · Sesiones 35–333 €

---

## 1. RESUMEN EJECUTIVO

**Objetivo:** llenar la agenda de reservas con clientas que llegan con intención de comprar.

**La estrategia en una frase:** *Google Ads capta la demanda → la web convierte con reserva online → Reels construyen la confianza que falta → retargeting recupera a los indecisos.*

| Canal | Rol | Inversión 90 días |
|---|---|---|
| Google Ads | Captar demanda caliente | 900–1.500 € |
| Reels (orgánico) | Confianza y prueba social | Tiempo de Inma |
| Retargeting Meta | No perder indecisos | 300–450 € |
| Lead magnet + email | Futuras reservas | 0 € |
| **Total** | | **1.200–1.950 €** |

**KPI principal (la única métrica que importa):** € invertidos por reserva conseguida (coste por adquisición).

---

## 2. LA WEB: PREPARATIVOS ANTES DE LANZAR ADS

Nada de esto funciona si la web no mide. Checklist obligatorio (día 1–3):

- [ ] **GA4** instalado (ya está en el proyecto Next.js) con eventos de conversión.
- [ ] **Meta Pixel** instalado en la SPA con eventos:
  - `PageView`, `ViewContent` (en `/terapias` y cada `/reservar/[id]`), `BeginCheckout` (pantalla de pago Stripe), `Purchase` (confirmación de reserva).
- [ ] **Google Ads: conversión de "Reserva completada"** vía tag de Google (Google Ads + Stripe confirman pago → es la conversión real, no el clic).
- [ ] **Formulario de email** en la home y en `/terapias` con el lead magnet (ver sección 6).
- [ ] Comprobar tiempos de carga móvil (Reels y Google premian la web rápida).

> Nota técnica: es una SPA en Next.js. Instalar el pixel/píxeles con `next/script` y disparar eventos en las rutas correctas. Puedo hacerte esta parte.

---

## 3. GOOGLE ADS (mes 1–3)

### 3.1 Estructura

Una campaña **Búsqueda** (Search) al inicio. Simple y medida.

| Grupo de anuncios | Keywords (¡máx. 10 por grupo!) |
|---|---|
| **Reiki online** | `reiki online`, `reiki online españa`, `sesion de reiki online`, `reiki a distancia`, `terapeuta reiki online` |
| **Reiki por necesidad** | `reiki para ansiedad`, `reiki para dormir`, `reiki emocional`, `reiki para estres`, `reiki equilibrio chakras` |
| **Péndulo hebreo** | `pendulo hebreo`, `pendulo hebreo terapia`, `pendulo hebreo online`, `terapia pendulo hebreo` |
| **Terapias holísticas** | `terapia holistica online`, `terapia holistica online españa`, `terapeuta holistica`, `terapias alternativas online` |
| **Limpieza energética** | `limpieza energetica`, `limpieza energetica online`, `limpieza de higado` |

**Palabras negativas globales** (que no venden sesiones):
`curso`, `formacion`, `aprender`, `gratis`, `pdf`, `como hacer`, `tutorial`, `empleo`, `trabajo`, `certificado`, `diplomado`.

### 3.2 Tipo de concordancia

- **Frase** (`"reiki online"`) en el 80% de keywords — precisión sin perder variaciones.
- **Exacta** (`[reiki para ansiedad]`) para las 3 que más conviertan la primera semana.
- **Amplia** NO. Solo si necesitas descubrir y con conversión instalada.

### 3.3 Presupuesto y pujas

- **Día 1–30:** 10 €/día (≈300 €/mes). Manual o puja máxima por clic (CPC máx 0,60–0,80 € al inicio).
- **CPC estimado España (este nicho): 0,40–1,20 €** — bajo, porque nadie está pujando fuerte por "reiki online".
- **Mes 2–3:** subir a 15 €/día si el coste por reserva es saneado (≤ 25 €).
- **Conversión de referencia:** 2–4% de clic → reserva. Con 300 clics/mes ≈ 6–12 reservas.

### 3.4 Textos de anuncios (A/B testing)

**Anuncio 1 — enfocado en resultado:**
- Título 1: Terapia Reiki Online · Sesión 35 €
- Título 2: Reserva en 2 Minutos — Pago Seguro
- Descripción: Terapeuta certificada con +500 sesiones. Reserva online 24/7 y recibe confirmación por WhatsApp. Sin permanencia.

**Anuncio 2 — enfocado en el problema:**
- Título 1: ¿Ansiedad o insomnio? No estás sola
- Título 2: Terapia Holística Online con Inma
- Descripción: Un espacio seguro para soltar lo que llevas dentro. Reiki, Péndulo Hebreo y limpieza energética. Reserva ahora.

**Anuncio 3 — prueba social:**
- Título 1: +500 Sesiones y 5,0 ★ de Valoración
- Título 2: Reserva tu Sesión de Reiki Online
- Descripción: Más de 50 clientas satisfechas en toda España. Pago 100% seguro con Stripe. Cambia o reprograma gratis.

**Extensiones obligatorias:** enlaces de sitio (`Terapias`, `Sobre Inma`, `Contacto`), llamadas (`hola@tikkunkaruna.com`), reseñas (5,0 ★ / 50+), datetime opcional.

### 3.5 Landing

El clic va directo a `/terapias` (ya lista para convertir: precios, duración, CTAs). No crear landing nueva el primer mes — medir primero.

---

## 4. REELS: LOS PRIMEROS 30

**Cada reel: hook (0–3 s) → desarrollo (3–20 s) → CTA (20–30 s) → pie de texto con link a `/terapias`.**

### Distribución de los 30

| Tipo | Cantidad | Objetivo |
|---|---|---|
| Micro-historias de clientas (anónimas) | 10 | Venta emocional |
| Respuesta a mitos y dudas | 5 | Autoridad |
| Explicación de método (péndulo, hígado, chakras) | 5 | Diferenciación |
| Sobre Inma / detrás de escena | 3 | Conexión personal |
| Antes/después emocional | 3 | Expectativa de resultado |
| Packs y ofertas explicadas | 4 | Venta directa |
| **Total** | **30** | |

### Ritmo de publicación
2 reels/semana (lunes + jueves, 12:00 o 20:00 h — hora de España). En 90 días → ~26 reels.

### Ideas concretas (10 micro-historias)

1. *"Me escribió a las 3 a.m. — no sé cómo parar mi cabeza."* → insomnio → Reiki emocional → dormir.
2. *"Tenía el proyecto, el talento... y algo se lo frenaba siempre."* → Limpieza de hígado → lo lanzó.
3. *"Hacía un año que no podía 'soltar'."* → duelo → Pack Reset.
4. *"No tenía motivo exacto. Solo una presión aquí (pecho)."* → Péndulo hebreo → claridad.
5. *"Empecé por curiosidad. Llevo 6 meses acompañándome."* → retención → Pack Tikkun Karuna (333 €).
6. *"Pagué 160 € por lo que yo misma llamé tonterías."* → escepticismo → resultado.
7. *"Venía con 5 cafés encima y el pecho cerrado."* → ansiedad laboral → respiración.
8. *"Mi madre llora cada vez que le cuento lo que pasó en la sesión."* → traba familiar.
9. *"Tenía 33 años y sentía que ya no me reconocía."* → crisis de identidad → chakras.
10. *"El médico dijo que físicamente estaba bien. Yo no me sentía bien."* → lo que no se ve → Reiki.

### Los 3 guiones completos (grabar primeros)

**GUION 1 — "Las 3 de la mañana"** *(ansiedad/insomnio — el que más alcance da)*

- **Hook (0–3s):** Inma a cámara, tono bajo: *"Ayer una mujer me envió un audio a las 3 de la mañana. Solo me decía: 'no puedo más'."*
- **Desarrollo (3–20s):** *"Llevaba semanas sin dormir, con la mente en bucle, agotada pero sin poder parar. No necesitaba otra técnica de respiración. Necesitaba soltar — y sola no podía. En 50 minutos de Reiki emocional, su cuerpo por fin bajó la guardia. El audio que me mandó después decía: 'por fin dormí 8 horas seguidas'."*
- **CTA (20–30s):** *"Si tu cabeza no para por la noche, esto es para ti. Reserva tu sesión en tikkunkaruna.com. Estoy aquí para sostenerte."*
- **Pie de texto:** *3 a. m. y no podía parar su mente. 50 min de Reiki emocional después…* → Link en bio.
- **Audio:** voz de Inma + sonido ambiente suave (sin la música viral típica; ganas autenticidad).

**GUION 2 — "El hígado que me destrabó"** *(limpieza de hígado + materializar)*

- **Hook:** *"Le dije a una clienta que su hígado tenía que ver con que su negocio no despegaba. Se rió de mí."*
- **Desarrollo:** *"En mi método, el hígado es el órgano que te 'atraca al suelo': el que materializa. Ella tenía el proyecto, el talento y el miedo enorme de lanzarse. Tras la limpieza, algo se destrabó. Dos meses después me escribió llorando: 'lo lancé. Lo tengo en marcha'."*
- **CTA:** *"¿Hay algo que llevas años queriendo materializar? Empieza por tu energía. Reserva en tikkunkaruna.com."*

**GUION 3 — "Seca tus lágrimas antes"** *(Pack Reset — conexión emocional)*

- **Hook:** *"Tú no necesitas un reset. Necesitas a alguien que te sostenga mientras sueltas."*
- **Desarrollo:** *"Muchas clientas llegan a su primera sesión pidiéndose disculpas por llorar. Aquí no hace falta. El Pack Reset son 3 sesiones para soltar de verdad y a tu ritmo: dos en las que cae lo que llevas agarrando desde hace años, y una en la que florece lo nuevo. A la tercera sesión, una clienta me dijo: 'ya estoy lista para volver a conocerme'."*
- **CTA:** *"Pack Reset, 3 sesiones, 160 €. Reserva online en tikkunkaruna.com. Aquí es seguro llorar."*

### Reglas de producción
- Grabar con luz natural, Inma sentada, trípode, teléfono en 4K. Nada de estudio perfecto: la autenticidad vende más que la estética.
- Los 3 primeros segundos siempre con texto en pantalla del gancho (muchos ven sin audio).
- Subtítulos automáticos SIEMPRE.
- El CTA siempre es el mismo y siempre enlaza a `/terapias`.

---

## 5. RETARGETING META (mes 1–3)

No es la prioridad del mes 1. Se activa cuando hay más de ~50 visitantes/mes en `/terapias`.

### Configuración
- **Pixel de Meta + CAPI** (API de conversiones, importante porque la web es SPA).
- **Audiencia 1 — Visitors calientes:** quienes vieron `/terapias` o `/reservar` en últimos 14 días y NO reservaron.
- **Audiencia 2 — Comprometidos:** quienes vieron ≥50% de tus reels (engagement bait para futuros lanzamientos).
- **Audiencia 3 — Lookalike (cuando haya ~100 conversiones):** clonar tus reservas existentes.

### Campaña
- Objetivo: **Conversiones** (destino: reserva Stripe). Si aún no hay datos, objetivo *Tráfico* a `/terapias` los primeros 15 días para aprender.
- Formato: reels que ya funcionaron + reel testimonial.
- **Presupuesto:** 3–5 €/día (90–150 €/mes).

---

## 6. LEAD MAGNET + EMAIL (mes 2 en adelante)

**Regalo:** *"5 señales de que tu energía está bloqueada (y 3 ejercicios para desbloquearla en casa)"*. PDF de 5 páginas, en coherencia con la marca (negro/dorado).

### Instalación
- Formulario corto (nombre + email) en home y un banner en `/terapias`.
- El email va a una lista (MailerLite básico, gratis hasta 1.000 suscriptores; o el CRM que ya use la web).

### Secuencia automática (3 correos)

**Email 1 (inmediato):** entrega el PDF + 1 línea de Inma (no venta).

**Email 2 (día +3):** *"¿Cuál de las 5 señales te resonó más?"* → responde y si marca 3+ señales, sugiere un Pack Reset con oferta para suscriptores (p. ej. 10 % en el primer pack).

**Email 3 (día +7):** testimonio de una clienta que empezó con el PDF → CTA a `/terapias`.

### Regla
El lead magnet nunca es "para vender ya". Es para que quien aún no confía, **empiece a recibir de ti** hasta que su momento llegue.

---

## 7. KPIs Y PANEL DE CONTROL (revisar cada lunes)

| Métrica | Objetivo mes 1 | Objetivo mes 3 |
|---|---|---|
| Coste por clic (Google) | ≤ 1,20 € | ≤ 1,00 € |
| CTR anuncios | ≥ 3% | ≥ 4% (optimizar textos) |
| Clics Google / mes | 200–300 | 400–500 |
| Coste por reserva | ≤ 25 € | ≤ 20 € |
| Reservas desde Google | 4–8 | 10–15 |
| Reservas desde retargeting | 0 | 3–5 |
| Suscriptores email | 10–20 | 80–150 |
| Reels publicados | 8 | 26 |
| Alcance medio por reel | 500–1.000 | 2.000–5.000 |

**El lunes se mira UNA cifra:** reservas conseguidas esa semana y cuánto costó cada una. Todo lo demás es secundario.

---

## 8. CALENDARIO DE 90 DÍAS

**Semana 1 — Fundación**
- GA4 con conversiones, Pixel de Meta + CAPI, conversión de Google Ads (reserva Stripe).
- Publicar Reels 1 y 2 (Guiones 1 y 2 de arriba).
- Alta de la cuenta de Google Ads: estructura, keywords, negativas, textos.

**Semana 2 — Encendido**
- Lanzar Google Ads (Search, 10 €/día).
- Reel 3 (Guion 3). Registrar primeros resultados.
- Grabar lote de 8 reels en un día (teoría de grabación por tandas).

**Semana 3**
- Primer A/B de anuncios (anuncio que peor CTR → pausar).
- Publicar Reel 4 y 5.
- Primera revisión de coste por reserva.

**Semanas 4–6**
- Subir presupuesto si coste por reserva ≤ 25 €.
- Crear lead magnet + formulario + secuencia de emails.
- Activación del retargeting de Meta (audiencia de visitantes).

**Semanas 7–12**
- Escalar Google Ads a 15 €/día (si saneado). Probar grupo "Anuncios de productos" con packs.
- Lookalike de Meta si hay ≥ 100 conversiones.
- 2 reels/semana sin fallar. Rotar ganchos viejos en nuevos reels.
- Newsletter mensual a la lista de email.

---

## 9. QUÉ NO HACER (errores que ya se ven venir)

1. **Pujar por "reiki" a secas como exacta** — caro y poco específico.
2. **Crear 5 campañas de Google el día 1** — empieza con una campaña Búsqueda y un solo objetivo.
3. **Preocuparse por el alcance de los reels** — el reel que "llega a 300" sigue funcionando si son las personas adecuadas.
4. **Vender packs de 333 € en el primer toque** — primero la sesión de 35 € o el Pack Reset, después el pack largo.
5. **Parar el email cuando nadie abre** — la lista crece con los que llegan por Google Ads, no al revés.

---

## 10. HERRAMIENTAS NECESARIAS

| Herramienta | Coste | Uso |
|---|---|---|
| Google Ads | € de campaña | Captación |
| Meta Ads (pixel + retargeting) | € de campaña | Retargeting |
| GA4 | Gratis | Medición |
| Canva Pro | ~12 €/mes | Piezas de reels, PDF del lead magnet |
| MailerLite | Gratis (hasta 1.000) | Emails y secuencia |
| CapCut | Gratis | Edición vertical de reels |

---

## 11. PRIMEROS 3 PASOS CONCRETOS (esta semana)

1. **Instalar Pixel de Meta + conversión de reserva en GA4/Google Ads** (te lo hago yo en el proyecto si quieres).
2. **Grabar los 3 reels de los guiones completos** (sección 4) y publicar el 1.
3. **Crear cuenta de Google Ads** con la estructura de la sección 3 (keywords, negativas, 3 anuncios).