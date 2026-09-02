/*
# DigiCon Core Schema — Part 1: Profiles, Cards, Contacts

## Overview
Creates foundational tables: profiles, digital_cards, card_templates, contacts.

## New Tables
- profiles: extends auth.users with professional identity + role + plan
- digital_cards: user business cards with social links, services, theme
- card_templates: reusable card layout templates
- contacts: people you've met with tags, category, where_met

## Security
- RLS enabled on all tables, owner-scoped CRUD policies
- Card templates readable by all authenticated users
- Published cards readable by anon+authenticated (public sharing)
- Admins can read all profiles
*/

-- PROFILES
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  job_title text,
  company text,
  bio text,
  phone text,
  email text,
  website text,
  avatar_url text,
  company_logo_url text,
  role text NOT NULL DEFAULT 'user',
  plan text NOT NULL DEFAULT 'free',
  networking_goal text,
  onboarding_completed boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_profile" ON profiles;
CREATE POLICY "select_own_profile" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "admin_read_all_profiles" ON profiles;
CREATE POLICY "admin_read_all_profiles" ON profiles FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role IN ('admin', 'super_admin'))
  );

-- CARD TEMPLATES
CREATE TABLE IF NOT EXISTS card_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text NOT NULL DEFAULT 'professional',
  orientation text NOT NULL DEFAULT 'portrait',
  preview_config jsonb DEFAULT '{}',
  is_premium boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE card_templates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read_active_templates" ON card_templates;
CREATE POLICY "read_active_templates" ON card_templates FOR SELECT
  TO authenticated USING (is_active = true);

-- DIGITAL CARDS
CREATE TABLE IF NOT EXISTS digital_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  job_title text,
  company text,
  bio text,
  phone text,
  email text,
  website text,
  avatar_url text,
  company_logo_url text,
  social_links jsonb DEFAULT '[]',
  services jsonb DEFAULT '[]',
  portfolio_links jsonb DEFAULT '[]',
  booking_link text,
  template_id uuid REFERENCES card_templates(id),
  theme jsonb DEFAULT '{}',
  orientation text NOT NULL DEFAULT 'portrait',
  is_published boolean NOT NULL DEFAULT false,
  is_primary boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE digital_cards ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_cards" ON digital_cards;
CREATE POLICY "select_own_cards" ON digital_cards FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_cards" ON digital_cards;
CREATE POLICY "insert_own_cards" ON digital_cards FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_cards" ON digital_cards;
CREATE POLICY "update_own_cards" ON digital_cards FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_cards" ON digital_cards;
CREATE POLICY "delete_own_cards" ON digital_cards FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "public_read_published_cards" ON digital_cards;
CREATE POLICY "public_read_published_cards" ON digital_cards FOR SELECT
  TO anon, authenticated USING (is_published = true);

-- CONTACTS
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  company text,
  position text,
  email text,
  phone text,
  website text,
  avatar_url text,
  social_links jsonb DEFAULT '[]',
  where_met text,
  event_name text,
  date_met date,
  tags text[] DEFAULT '{}',
  category text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_contacts" ON contacts;
CREATE POLICY "select_own_contacts" ON contacts FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_contacts" ON contacts;
CREATE POLICY "insert_own_contacts" ON contacts FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_contacts" ON contacts;
CREATE POLICY "update_own_contacts" ON contacts FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_contacts" ON contacts;
CREATE POLICY "delete_own_contacts" ON contacts FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_digital_cards_user_id ON digital_cards(user_id);
CREATE INDEX IF NOT EXISTS idx_digital_cards_slug ON digital_cards(slug);
CREATE INDEX IF NOT EXISTS idx_contacts_user_id ON contacts(user_id);
