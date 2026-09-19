# GrupoStart

Plataforma web de una agencia de marketing 360° que combina un sitio institucional con e-commerce de servicios digitales, un **SaaS de seguimiento de leads** y un **bot conversacional con IA en WhatsApp**. Producto en producción con pagos reales, suscripciones recurrentes y automatización de notificaciones.

## Módulos

- **Sitio institucional** — landing estática de la agencia (Next.js App Router) con secciones de servicios y catálogo de productos digitales.
- **E-commerce de servicios** — pedidos y checkout con **Mercado Pago** (preference + webhook), envíos **Andreani** y confirmación por email (SendGrid).
- **SaaS “Sistema de Seguimiento de Leads”** — mini-CRM de contactos: clasificación por nivel de interés, cálculo automático de la próxima fecha de contacto en días hábiles y recordatorios por WhatsApp. Suscripción mensual recurrente vía Mercado Pago PreApproval.
- **Bot IA “Sofi” en WhatsApp** — flujo comercial por etapas (calificación, catálogo, agenda de reuniones) usando OpenAI, con pausa automática cuando interviene un humano.
- **Panel de WhatsApp inbox** — conversaciones persistidas, mensajes entrantes/salientes y notificaciones de reunión para admins.

## Stack

| Área | Tecnologías |
| --- | --- |
| Frontend | Next.js 14 (App Router), React 18, Tailwind CSS, Framer Motion, Recharts |
| Backend | Route Handlers en `app/api/*`, middleware de sesión |
| Datos | PostgreSQL, Sequelize (modelado) + SQL directo, migraciones versionadas en `db/migrations/` |
| Autenticación | Firebase Auth (email, Google, Facebook) con validación server-side de ID tokens (JWKS) y cookie `httpOnly` |
| Pagos | Mercado Pago (`@mercadopago/sdk-react`), pago único y suscripciones PreApproval |
| Mensajería | WhatsApp Cloud API (plantillas e interactivos), SendGrid para email |
| IA | OpenAI (GPT) para el flujo conversacional de WhatsApp |
| Infra | Vercel (cron horario de recordatorios) y VPS con PM2 vía GitHub Actions |

## Puesta en marcha

```bash
npm install        # Node 20.x
npm run dev        # http://localhost:3000
npm run build      # build de producción
npm run lint       # lint
npm run migrate    # aplica db/migrations/*.sql
npm run test-ai    # prueba el bot IA de WhatsApp
```

Las variables de entorno (DB, Firebase, Mercado Pago, WhatsApp Cloud, OpenAI, SendGrid, cron) se configuran en `.env`; no se incluyen en el repositorio.

## Deploy

- **Web preview / Vercel**: `grupo-start.vercel.app` con cron diario para notificar.
- **Producción**: al pushear a `master`, GitHub Actions hace SSH al VPS, `npm install`, `npm run build`, `npm run migrate` y `pm2 restart`.