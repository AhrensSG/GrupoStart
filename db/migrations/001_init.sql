-- 001_init.sql
-- Esquema base del proyecto (idempotente).
-- Reemplaza el DDL que antes ejecutaban setupDatabase() y connection.sync({ alter: true }).

-- ============================================================
-- Tablas de herramientas (lib/tools/db.js)
-- ============================================================

CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  celular VARCHAR(100) DEFAULT '',
  email VARCHAR(255) DEFAULT '',
  red_social VARCHAR(50) DEFAULT '',
  nombre_usuario VARCHAR(255) DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  pinned BOOLEAN DEFAULT FALSE,
  user_id VARCHAR(255) DEFAULT '',
  deleted_at TIMESTAMPTZ DEFAULT NULL
);

-- Columnas que se fueron agregando con ALTER (belt & suspenders por si la tabla
-- existía en un estado anterior).
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS pinned BOOLEAN DEFAULT FALSE;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS user_id VARCHAR(255) DEFAULT '';
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ DEFAULT NULL;

CREATE TABLE IF NOT EXISTS contact_rounds (
  id SERIAL PRIMARY KEY,
  contact_id INTEGER NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  round_index INTEGER NOT NULL,
  clasificacion VARCHAR(100) DEFAULT '',
  fecha VARCHAR(20) DEFAULT '',
  estado TEXT DEFAULT '',
  proxima_fecha VARCHAR(20) DEFAULT '',
  hora_proximo_contacto VARCHAR(10) DEFAULT '',
  upcoming_notified_date VARCHAR(20) DEFAULT '',
  due_notified_date VARCHAR(20) DEFAULT '',
  overdue_notified_date VARCHAR(20) DEFAULT '',
  UNIQUE(contact_id, round_index)
);

ALTER TABLE contact_rounds ADD COLUMN IF NOT EXISTS upcoming_notified_date VARCHAR(20) DEFAULT '';
ALTER TABLE contact_rounds ADD COLUMN IF NOT EXISTS due_notified_date VARCHAR(20) DEFAULT '';
ALTER TABLE contact_rounds ADD COLUMN IF NOT EXISTS overdue_notified_date VARCHAR(20) DEFAULT '';

CREATE TABLE IF NOT EXISTS user_profile (
  id SERIAL PRIMARY KEY,
  hora_ingreso VARCHAR(10) DEFAULT '09:00',
  hora_salida VARCHAR(10) DEFAULT '18:00',
  whatsapp_api_url TEXT DEFAULT '',
  whatsapp_api_token TEXT DEFAULT '',
  company_name VARCHAR(255) DEFAULT '',
  company_logo TEXT DEFAULT '',
  user_id VARCHAR(255) DEFAULT '',
  horario_ranges TEXT DEFAULT '',
  user_phone VARCHAR(100) DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE user_profile ADD COLUMN IF NOT EXISTS company_name VARCHAR(255) DEFAULT '';
ALTER TABLE user_profile ADD COLUMN IF NOT EXISTS company_logo TEXT DEFAULT '';
ALTER TABLE user_profile ADD COLUMN IF NOT EXISTS user_id VARCHAR(255) DEFAULT '';
ALTER TABLE user_profile ADD COLUMN IF NOT EXISTS horario_ranges TEXT DEFAULT '';
ALTER TABLE user_profile ADD COLUMN IF NOT EXISTS user_phone VARCHAR(100) DEFAULT '';

-- Rellenar horario_ranges para perfiles que no lo tengan (mismo comportamiento que setupDatabase).
UPDATE user_profile SET horario_ranges = '[{"ingreso":"' || hora_ingreso || '","salida":"' || hora_salida || '"}]'
WHERE (horario_ranges IS NULL OR horario_ranges = '') AND hora_ingreso IS NOT NULL AND hora_salida IS NOT NULL;

CREATE TABLE IF NOT EXISTS subscriptions (
  id SERIAL PRIMARY KEY,
  uid VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) DEFAULT '',
  status VARCHAR(50) DEFAULT 'active',
  preapproval_id VARCHAR(255) DEFAULT '',
  expires_at TIMESTAMPTZ DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS preapproval_id VARCHAR(255) DEFAULT '';
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ DEFAULT NULL;

CREATE TABLE IF NOT EXISTS wa_conversations (
  id SERIAL PRIMARY KEY,
  phone VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(255) DEFAULT '',
  unread_count INTEGER DEFAULT 0,
  last_message_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS wa_messages (
  id SERIAL PRIMARY KEY,
  conversation_phone VARCHAR(50) NOT NULL,
  direction VARCHAR(10) NOT NULL DEFAULT 'in',
  body TEXT DEFAULT '',
  type VARCHAR(30) DEFAULT 'text',
  media_url TEXT DEFAULT '',
  wa_message_id VARCHAR(255) DEFAULT '',
  status VARCHAR(20) DEFAULT 'sent',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contacts_user_id ON contacts(user_id);
CREATE INDEX IF NOT EXISTS idx_contacts_deleted_at ON contacts(deleted_at);
CREATE INDEX IF NOT EXISTS idx_subscriptions_uid ON subscriptions(uid);
CREATE INDEX IF NOT EXISTS idx_wa_messages_phone ON wa_messages(conversation_phone);
CREATE INDEX IF NOT EXISTS idx_wa_messages_created ON wa_messages(created_at);

-- ============================================================
-- Constraints únicos (idempotencia y unicidad)
-- ============================================================

-- user_profile: un solo perfil por usuario. Se eliminan duplicados
-- conservando el registro más antiguo (menor id).
DELETE FROM user_profile a USING user_profile b
WHERE a.id > b.id AND a.user_id = b.user_id AND a.user_id <> '';

CREATE UNIQUE INDEX IF NOT EXISTS idx_user_profile_user_id ON user_profile(user_id) WHERE user_id <> '';

-- wa_messages: un solo registro por wa_message_id (solo no vacíos).
-- Se eliminan duplicados conservando el más reciente (mayor id).
DELETE FROM wa_messages a USING wa_messages b
WHERE a.id < b.id AND a.wa_message_id = b.wa_message_id AND a.wa_message_id <> '';

CREATE UNIQUE INDEX IF NOT EXISTS idx_wa_messages_wa_id ON wa_messages(wa_message_id) WHERE wa_message_id <> '';

-- ============================================================
-- Tablas Sequelize (db/models) creadas antes por sync({alter:true})
-- ============================================================

CREATE TABLE IF NOT EXISTS "User" (
  id TEXT PRIMARY KEY,
  name VARCHAR(255),
  surname VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(255),
  country VARCHAR(255),
  birthday VARCHAR(255),
  role VARCHAR(255) NOT NULL DEFAULT 'user',
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Order" (
  id SERIAL PRIMARY KEY,
  "orderId" BIGINT,
  status VARCHAR(255),
  "totalPrice" DECIMAL(10, 2),
  "deliveryCost" DECIMAL(10, 2),
  "cartPrice" DECIMAL(10, 2),
  delivered BOOLEAN DEFAULT FALSE,
  email TEXT,
  name VARCHAR(255),
  surname VARCHAR(255),
  "postalCode" VARCHAR(255),
  country VARCHAR(255),
  province VARCHAR(255),
  "fullAddress" TEXT,
  phone BIGINT,
  "trackingId" VARCHAR(255),
  "UserId" TEXT REFERENCES "User"(id),
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "OrderProducts" (
  id SERIAL PRIMARY KEY,
  status VARCHAR(255),
  name VARCHAR(255),
  price DECIMAL(10, 2),
  items INTEGER,
  data JSON,
  "OrderId" INTEGER REFERENCES "Order"(id),
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Company" (
  id SERIAL PRIMARY KEY,
  "companyName" VARCHAR(255) NOT NULL,
  industry VARCHAR(255) NOT NULL,
  "phoneNumber" VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  "buildingNumber" VARCHAR(255) NOT NULL,
  apartment VARCHAR(255),
  "facebookUser" VARCHAR(255),
  "instagramUser" VARCHAR(255),
  "tiktokUser" VARCHAR(255),
  "directCompetitor" VARCHAR(255),
  "customerAgeRangeMin" INTEGER,
  "customerAgeRangeMax" INTEGER,
  "morningOpeningTime" TIME,
  "morningClosingTime" TIME,
  "afternoonOpeningTime" TIME,
  "afternoonClosingTime" TIME,
  "UserId" TEXT REFERENCES "User"(id),
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
