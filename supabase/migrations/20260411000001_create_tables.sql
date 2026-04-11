-- =============================================================
-- MIKATA Database Schema — Wave 1 Foundation
-- Created: 2026-04-11
-- =============================================================

-- 1. ENUM Types
-- =============================================================

CREATE TYPE user_role AS ENUM ('visitor', 'free_user', 'premium_user', 'admin');
CREATE TYPE article_status AS ENUM ('draft', 'queued', 'published', 'archived');
CREATE TYPE subscription_plan AS ENUM ('monthly', 'yearly');
CREATE TYPE subscription_status AS ENUM ('active', 'canceled', 'past_due', 'trialing');
CREATE TYPE ad_status AS ENUM ('pending', 'approved', 'active', 'completed', 'rejected');
CREATE TYPE sentiment_label AS ENUM ('positive', 'negative', 'neutral');
CREATE TYPE media_reliability AS ENUM ('A', 'B', 'C');
CREATE TYPE feed_type AS ENUM ('rss', 'api', 'playwright');

-- 2. Tables
-- =============================================================

-- profiles (extends auth.users)
CREATE TABLE profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT NOT NULL,
  display_name TEXT,
  role        user_role NOT NULL DEFAULT 'free_user',
  free_trial_started_at TIMESTAMPTZ,
  free_trial_ends_at    TIMESTAMPTZ,
  stripe_customer_id    TEXT,
  subscription_status   subscription_status,
  preferred_genres      JSONB NOT NULL DEFAULT '[]',
  push_enabled          BOOLEAN NOT NULL DEFAULT false,
  articles_read_count   INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- media_sources
CREATE TABLE media_sources (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country                 TEXT NOT NULL,
  country_code            TEXT NOT NULL,
  name                    TEXT NOT NULL,
  genre                   TEXT,
  sub_genre               TEXT,
  feed_url                TEXT,
  feed_type               feed_type NOT NULL DEFAULT 'rss',
  language                TEXT NOT NULL DEFAULT 'ja',
  reliability             media_reliability NOT NULL DEFAULT 'B',
  check_interval_minutes  INTEGER NOT NULL DEFAULT 15,
  commercial_use_allowed  BOOLEAN NOT NULL DEFAULT false,
  terms_url               TEXT,
  active                  BOOLEAN NOT NULL DEFAULT true,
  last_checked_at         TIMESTAMPTZ,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- articles
CREATE TABLE articles (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug              TEXT UNIQUE NOT NULL,
  title             TEXT NOT NULL,
  genre             TEXT NOT NULL DEFAULT 'sports',
  sub_genre         TEXT,
  analysis_text     TEXT,
  sources           JSONB NOT NULL DEFAULT '[]',
  sentiment_summary JSONB,
  status            article_status NOT NULL DEFAULT 'draft',
  published_at      TIMESTAMPTZ,
  free_until        TIMESTAMPTZ,
  ai_model          TEXT,
  ai_prompt_hash    TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- subscriptions (Stripe-linked)
CREATE TABLE subscriptions (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                 UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  stripe_subscription_id  TEXT UNIQUE NOT NULL,
  plan                    subscription_plan NOT NULL DEFAULT 'monthly',
  amount                  INTEGER NOT NULL,
  status                  subscription_status NOT NULL DEFAULT 'active',
  current_period_start    TIMESTAMPTZ NOT NULL,
  current_period_end      TIMESTAMPTZ NOT NULL,
  cancel_at_period_end    BOOLEAN NOT NULL DEFAULT false,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ad_placements (Phase 2 — direct ads)
CREATE TABLE ad_placements (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  advertiser_name   TEXT NOT NULL,
  advertiser_email  TEXT NOT NULL,
  genre_target      TEXT,
  budget_monthly    INTEGER,
  duration_months   INTEGER,
  creative_url      TEXT,
  creative_text     TEXT,
  status            ad_status NOT NULL DEFAULT 'pending',
  approved_by       UUID REFERENCES profiles(id),
  approved_at       TIMESTAMPTZ,
  stripe_payment_id TEXT,
  impressions       INTEGER NOT NULL DEFAULT 0,
  clicks            INTEGER NOT NULL DEFAULT 0,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Indexes
-- =============================================================

CREATE INDEX idx_articles_genre ON articles (genre);
CREATE INDEX idx_articles_status ON articles (status);
CREATE INDEX idx_articles_published_at ON articles (published_at DESC);
CREATE INDEX idx_articles_slug ON articles (slug);
CREATE INDEX idx_media_sources_country ON media_sources (country_code);
CREATE INDEX idx_media_sources_active ON media_sources (active) WHERE active = true;
CREATE INDEX idx_subscriptions_user ON subscriptions (user_id);
CREATE INDEX idx_subscriptions_stripe ON subscriptions (stripe_subscription_id);
CREATE INDEX idx_profiles_stripe ON profiles (stripe_customer_id) WHERE stripe_customer_id IS NOT NULL;
CREATE INDEX idx_profiles_role ON profiles (role);

-- 4. updated_at trigger function
-- =============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 5. handle_new_user trigger (on auth.users INSERT)
-- =============================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, free_trial_started_at, free_trial_ends_at)
  VALUES (
    NEW.id,
    NEW.email,
    'free_user',
    now(),
    now() + INTERVAL '90 days'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 6. RLS Policies
-- =============================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_placements ENABLE ROW LEVEL SECURITY;

-- profiles policies
CREATE POLICY profiles_select_own ON profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY profiles_update_own ON profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY profiles_admin_all ON profiles
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- articles policies
CREATE POLICY articles_select_published ON articles
  FOR SELECT
  USING (status = 'published');

CREATE POLICY articles_admin_all ON articles
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- media_sources policies
CREATE POLICY media_sources_select_all ON media_sources
  FOR SELECT
  USING (true);

CREATE POLICY media_sources_admin_all ON media_sources
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- subscriptions policies
CREATE POLICY subscriptions_select_own ON subscriptions
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY subscriptions_admin_select ON subscriptions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY subscriptions_service_insert ON subscriptions
  FOR INSERT
  WITH CHECK (false);

CREATE POLICY subscriptions_service_update ON subscriptions
  FOR UPDATE
  USING (false)
  WITH CHECK (false);

-- ad_placements policies
CREATE POLICY ad_placements_admin_all ON ad_placements
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY ad_placements_select_active ON ad_placements
  FOR SELECT
  USING (status = 'active');

-- 7. Seed data — media_sources
-- =============================================================

INSERT INTO media_sources (country, country_code, name, genre, feed_url, feed_type, language, reliability, commercial_use_allowed) VALUES
  ('Spain', 'ES', 'Marca', 'sports', 'https://e00-marca.uecdn.es/rss/futbol/futbol-internacional.xml', 'rss', 'es', 'A', false),
  ('United Kingdom', 'GB', 'BBC Sport', 'sports', 'https://feeds.bbci.co.uk/sport/rss.xml', 'rss', 'en', 'A', false),
  ('France', 'FR', 'L''Equipe', 'sports', 'https://www.lequipe.fr/rss/actu_rss.xml', 'rss', 'fr', 'A', false),
  ('Japan', 'JP', 'Sports Hochi', 'sports', 'https://hochi.news/rss/sports.xml', 'rss', 'ja', 'B', false),
  ('United States', 'US', 'ESPN', 'sports', 'https://www.espn.com/espn/rss/news', 'rss', 'en', 'A', false),
  ('United States', 'US', 'Bloomberg', 'economy', 'https://feeds.bloomberg.com/markets/news.rss', 'rss', 'en', 'A', false),
  ('United Kingdom', 'GB', 'Financial Times', 'economy', 'https://www.ft.com/rss/home', 'rss', 'en', 'A', false),
  ('Japan', 'JP', 'Nikkei', 'economy', 'https://www.nikkei.com/rss/economy.xml', 'rss', 'ja', 'A', false),
  ('United States', 'US', 'IGN', 'gaming', 'https://feeds.feedburner.com/ign/all', 'rss', 'en', 'B', false),
  ('Japan', 'JP', 'Famitsu', 'gaming', 'https://www.famitsu.com/feed/', 'rss', 'ja', 'A', false),
  ('United States', 'US', 'Kotaku', 'gaming', 'https://kotaku.com/rss', 'rss', 'en', 'B', false),
  ('Germany', 'DE', 'Kicker', 'sports', 'https://rss.kicker.de/news/aktuell', 'rss', 'de', 'A', false);
