# PLAN DE ESTUDIO COBOL + MAINFRAME — 4 MESES

> Documento para decidir si invertimos 4 meses en especializarnos en COBOL.

---

## 1. ¿POR QUÉ COBOL? EL DATO CLAVE

COBOL es el lenguaje más antiguo que sigue en producción (creado en 1959).

**Datos reales de la industria:**

| Dato | Valor |
|------|-------|
| Líneas de código COBOL en producción hoy | ~200,000 millones (aproximadamente) |
| % de transacciones financieras mundiales que pasan por COBOL | ~70-80% |
| % de sistemas de banca que usan mainframe | ~43-70% según estudios del sector |
| Saldo diario operado por sistemas legacy en EEUU | ~3 billones de USD |
| Edad media del desarrollador COBOL actual | 50-60 años |
| Nuevos desarrolladores COBOL entrando al mercado | Muy pocos (el número baja cada año) |

**La crisis de talento es real:** la generación que creó estos sistemas se jubila en masa y hay casi nadie esperando para reemplazarlos. Bancos, aseguradoras y gobiernos migran sus sistemas más rápido de lo que forman personal.

Resultado: **competencia mínima, demanda estable, sueldos al alza.**

---

## 2. FACILIDAD DE ENTRADA vs OTRAS TECNOLOGÍAS

| Tecnología | Ofertas de trabajo | Candidatos por oferta | Probabilidad de entrar |
|-----------|-------------------|----------------------|------------------------|
| COBOL / Mainframe | Media | ~15 | **Muy alta** |
| SQL / Bases de datos | Muy alta | Media | Alta |
| Go | Alta | Media | Alta |
| Java Spring | Muy alta | ~500 | Media |
| Python / Data | Muy alta | ~500 | Media |
| React / Frontend | Muy alta | ~1000+ | Baja |

**En COBOL:** te pueden llamar a ti.
**En React:** compites contra miles por cada puesto.

---

## 3. SUELDOS (estimación real)

| Rol | Sueldo anual España (junior) | Sueldo anual España (3+ años) |
|-----|------------------------------|------------------------------|
| COBOL freelancer | 30-40k € | 50-80k € |
| COBOL empleado (banca) | 28-38k € | 40-60k € |
| Mainframe en EEUU (referencia) | 80-120k USD | 120-180k USD |

Condiciones típicas: **100% remoto**, proyectos de larga duración (años, no meses).

---

## 4. EL PLAN DE 4 MESES (4h/día × 2 personas)

Con 4 horas diarias por 4 meses = ~480 horas de estudio.
Con ayuda de IA (ChatGPT/Claude para resolver dudas al instante) es realista.

### Mes 1 — COBOL base + JCL
| Semana | Tema | Objetivo |
|--------|------|----------|
| 1-2 | COBOL básico (Divisiones, PIC, operaciones) | Escribir programas básicos |
| 3 | Ficheros + COPYBOOKS + SORT | Manejar ficheros secuenciales |
| 4 | Subprogramas + JCL (DD, IEBGENER, SORT) | Ejecutar un programa en mainframe |

**Práctica:** 5 programas completos con su JCL.

### Mes 2 — DB2 (SQL embebido) + Proyecto 1
| Semana | Tema | Objetivo |
|--------|------|----------|
| 5-6 | Embedded SQL, CURSORS, SQLCA | Leer/escribir en DB2 desde COBOL |
| 7 | JOINs, índices, COMMIT/ROLLBACK | Consultas reales |
| 8 | Proyecto 1: Sistema de consulta de cuentas | Programa que consulte saldos por cliente |

### Mes 3 — CICS + Proyecto 2
| Semana | Tema | Objetivo |
|--------|------|----------|
| 9-10 | CICS básico (SEND/RECEIVE/RETURN, BMS maps) | Transacciones online |
| 11 | CICS + DB2 en línea + manejo de errores | Transacción que consulte una cuenta en pantalla |
| 12 | Proyecto 2: Mini aplicación online estilo banca | Alta/consulta/baja en pantallas 3270 |

### Mes 4 — Repaso, entrevistas y simulacro
| Semana | Tema | Objetivo |
|--------|------|----------|
| 13 | Repaso SQL / JCL / abends (S0C7, S322) | Solucionar errores clásicos |
| 14 | Debug con XPEDITER + herramientas (FileAID) | Depurar como en producción |
| 15 | Preguntas tipo entrevista + pair programming | Simular entrevista real |
| 16 | Postular a ofertas + refinar portfolio | Enviar CV a consultoras y empresas |

**Tiempo total:** ~480 horas. **Ritmo:** 100 horas/mes, 25 horas/semana, ~4h/día.

---

## 5. ¿DESPUÉS DE 4 MESES CONSEGUIMOS TRABAJO?

**La respuesta honesta:** probablemente sí, pero no en BBVA de entrada.

### Por qué sí
- El mercado tiene hambre real de perfiles junior COBOL
- Con proyectos demostrables + entrevista técnica superada, entras
- Las consultoras medianas necesitan cubrir plazas mainframe constantemente

### El filtro de BBVA
La oferta pide "experiencia previa en proyectos de BBVA" — eso es filtro para seniors. **La ruta realista:**

1. **4 meses:** estudio + portfolio (este plan)
2. **1-3 meses** buscando: consultoras (NTT DATA, Logicalis, entre otras), banca secundaria, seguros, administración pública, logística — todas usan mainframe
3. **6-12 meses** trabajando: ganar experiencia real en banca
4. **Después:** las ofertas tipo BBVA ya están a nuestro alcance

### El plan B (si en 4 meses no sale)
- Seguir 2 meses más reforzando
- Aceptar trabajo con sueldo inicial más modesto (prácticas/primera experiencia)
- La inversión sigue siendo rentable: es de las pocas tecnologías donde faltan candidatos

---

## 6. QUÉ NECESITAMOS PARA EMPEZAR (GRATIS o CASI)

| Recurso | Coste | Uso |
|---------|-------|-----|
| IBM Z Xplore (entorno mainframe real gratuito) | Gratis | Practicar de verdad |
| IBMMainFrame.com / TutorialsPoint | Gratis | Teoría y ejercicios |
| Documentación IBM (COBOL, DB2, CICS) | Gratis | Consulta |
| IA (Claude, GPT) | Gratis/bajo | Resolver dudas al instante |
| Entorno local (VSCode + extensión COBOL) | Gratis | Escribir código sin conexión |

**Presupuesto total: ~0 €.** Solo el tiempo.

---

## 7. CONCLUSIÓN

- Ha habido poca inversión en formar COBOL developers — nosotros podemos ser esa escasez.
- En 4 meses a 4h/día con ayuda de IA, el plan es realista.
- La recompensa: empleo estable, remoto, sueldo competitivo y de los pocos mercados donde **te buscan a ti**.

**¿Vamos?**