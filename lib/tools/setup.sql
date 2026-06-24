-- Run this script to create the tools tables in your PostgreSQL database.
-- psql -h localhost -p 5433 -U postgres -d grupostart -f lib/tools/setup.sql

CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  celular VARCHAR(100) DEFAULT '',
  email VARCHAR(255) DEFAULT '',
  red_social VARCHAR(50) DEFAULT '',
  nombre_usuario VARCHAR(255) DEFAULT '',
  user_id VARCHAR(255) NOT NULL DEFAULT '',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contacts_user_id ON contacts(user_id);

CREATE TABLE IF NOT EXISTS contact_rounds (
  id SERIAL PRIMARY KEY,
  contact_id INTEGER NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  round_index INTEGER NOT NULL,
  clasificacion VARCHAR(100) DEFAULT '',
  fecha VARCHAR(20) DEFAULT '',
  estado TEXT DEFAULT '',
  proxima_fecha VARCHAR(20) DEFAULT '',
  hora_proximo_contacto VARCHAR(10) DEFAULT '',
  UNIQUE(contact_id, round_index)
);

CREATE TABLE IF NOT EXISTS user_profile (
  id SERIAL PRIMARY KEY,
  hora_ingreso VARCHAR(10) DEFAULT '09:00',
  hora_salida VARCHAR(10) DEFAULT '18:00',
  whatsapp_api_url TEXT DEFAULT '',
  whatsapp_api_token TEXT DEFAULT '',
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id SERIAL PRIMARY KEY,
  uid VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) DEFAULT '',
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
