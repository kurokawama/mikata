-- =============================================================
-- MIKATA Database Schema — Wave 2 Content Engine
-- Created: 2026-04-11
-- =============================================================

-- article_perspectives (per-country perspective summaries)
CREATE TABLE article_perspectives (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id      UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  country         TEXT NOT NULL,
  country_code    TEXT NOT NULL,
  media_name      TEXT NOT NULL,
  source_url      TEXT NOT NULL,
  summary_80chars TEXT NOT NULL,
  sentiment_label sentiment_label NOT NULL DEFAULT 'neutral',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_article_perspectives_article ON article_perspectives (article_id);
CREATE INDEX idx_article_perspectives_country ON article_perspectives (country_code);

-- RLS
ALTER TABLE article_perspectives ENABLE ROW LEVEL SECURITY;

-- SELECT: everyone can read perspectives for published articles
CREATE POLICY article_perspectives_select_published ON article_perspectives
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM articles a
      WHERE a.id = article_perspectives.article_id
      AND a.status = 'published'
    )
  );

-- Admin: full access
CREATE POLICY article_perspectives_admin_all ON article_perspectives
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

-- Add prompt_hash index for dedup
CREATE INDEX idx_articles_prompt_hash ON articles (ai_prompt_hash) WHERE ai_prompt_hash IS NOT NULL;
