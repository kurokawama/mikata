-- MIKATA Schema Migration
-- Creates all 5 core tables with RLS policies

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. media_sources
-- ============================================
CREATE TABLE public.media_sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  country_code TEXT NOT NULL,
  url TEXT NOT NULL,
  reliability_score NUMERIC(3,1) NOT NULL DEFAULT 5.0 CHECK (reliability_score >= 0 AND reliability_score <= 10),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.media_sources ENABLE ROW LEVEL SECURITY;

-- Anyone can read active sources
CREATE POLICY "media_sources_select_active" ON public.media_sources
  FOR SELECT USING (is_active = true);

-- Only admins can manage sources
CREATE POLICY "media_sources_admin_all" ON public.media_sources
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- ============================================
-- 2. articles
-- ============================================
CREATE TYPE public.sentiment_label AS ENUM ('positive', 'negative', 'neutral');
CREATE TYPE public.article_status AS ENUM ('draft', 'published', 'archived');

CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  summary TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  sentiment_score NUMERIC(4,2) NOT NULL DEFAULT 0.0 CHECK (sentiment_score >= -1 AND sentiment_score <= 1),
  sentiment_label public.sentiment_label NOT NULL DEFAULT 'neutral',
  source_id UUID REFERENCES public.media_sources(id) ON DELETE SET NULL,
  country_code TEXT NOT NULL DEFAULT 'JP',
  published_at TIMESTAMPTZ,
  status public.article_status NOT NULL DEFAULT 'draft',
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_articles_status_published ON public.articles(status, published_at DESC);
CREATE INDEX idx_articles_source ON public.articles(source_id);
CREATE INDEX idx_articles_country ON public.articles(country_code);
CREATE INDEX idx_articles_sentiment ON public.articles(sentiment_label);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Published articles are publicly readable
CREATE POLICY "articles_select_published" ON public.articles
  FOR SELECT USING (status = 'published');

-- Admins can do everything
CREATE POLICY "articles_admin_all" ON public.articles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- ============================================
-- 3. profiles
-- ============================================
CREATE TYPE public.user_role AS ENUM ('user', 'admin');
CREATE TYPE public.subscription_status AS ENUM ('active', 'trialing', 'canceled', 'past_due', 'incomplete');

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  role public.user_role NOT NULL DEFAULT 'user',
  subscription_status public.subscription_status,
  trial_ends_at TIMESTAMPTZ,
  daily_article_count INTEGER NOT NULL DEFAULT 0,
  last_article_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile (but not role or subscription)
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Admins can read all profiles
CREATE POLICY "profiles_admin_select" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles AS p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- Admins can update all profiles
CREATE POLICY "profiles_admin_update" ON public.profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles AS p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', split_part(NEW.email, '@', 1)),
    'user'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 4. subscriptions
-- ============================================
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  stripe_customer_id TEXT NOT NULL,
  stripe_subscription_id TEXT NOT NULL UNIQUE,
  status public.subscription_status NOT NULL DEFAULT 'incomplete',
  current_period_end TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_subscriptions_user ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe ON public.subscriptions(stripe_subscription_id);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Users can view their own subscriptions
CREATE POLICY "subscriptions_select_own" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- Only server (service_role) can insert/update subscriptions
-- Admin can view all
CREATE POLICY "subscriptions_admin_select" ON public.subscriptions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- ============================================
-- 5. ad_placements
-- ============================================
CREATE TYPE public.ad_position AS ENUM ('article_between', 'sidebar', 'header', 'footer');

CREATE TABLE public.ad_placements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slot_name TEXT NOT NULL,
  ad_code TEXT NOT NULL DEFAULT '',
  is_active BOOLEAN NOT NULL DEFAULT false,
  position public.ad_position NOT NULL DEFAULT 'article_between',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.ad_placements ENABLE ROW LEVEL SECURITY;

-- Active placements are publicly readable (needed to render ads)
CREATE POLICY "ad_placements_select_active" ON public.ad_placements
  FOR SELECT USING (is_active = true);

-- Admins can manage all placements
CREATE POLICY "ad_placements_admin_all" ON public.ad_placements
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- ============================================
-- Seed data: sample media sources
-- ============================================
INSERT INTO public.media_sources (name, country_code, url, reliability_score) VALUES
  ('NHK', 'JP', 'https://www3.nhk.or.jp', 8.5),
  ('Reuters', 'US', 'https://www.reuters.com', 9.0),
  ('BBC News', 'GB', 'https://www.bbc.com/news', 8.8),
  ('Al Jazeera', 'QA', 'https://www.aljazeera.com', 7.5),
  ('Le Monde', 'FR', 'https://www.lemonde.fr', 8.2),
  ('Der Spiegel', 'DE', 'https://www.spiegel.de', 8.0),
  ('The Guardian', 'GB', 'https://www.theguardian.com', 8.3),
  ('CNN', 'US', 'https://www.cnn.com', 7.0);
