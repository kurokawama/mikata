-- MIKATA Schema Migration #2
-- Adds 11 additional tables to reach 16 total, all with RLS

-- ============================================
-- 6. topics (article categories/themes)
-- ============================================
CREATE TABLE public.topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "topics_select_active" ON public.topics
  FOR SELECT USING (is_active = true);

CREATE POLICY "topics_admin_all" ON public.topics
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- ============================================
-- 7. article_topics (many-to-many)
-- ============================================
CREATE TABLE public.article_topics (
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  topic_id UUID NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, topic_id)
);

CREATE INDEX idx_article_topics_topic ON public.article_topics(topic_id);

ALTER TABLE public.article_topics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "article_topics_select_published" ON public.article_topics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.articles
      WHERE articles.id = article_id AND articles.status = 'published'
    )
  );

CREATE POLICY "article_topics_admin_all" ON public.article_topics
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- ============================================
-- 8. article_perspectives (multi-perspective views per article)
-- ============================================
CREATE TABLE public.article_perspectives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  source_id UUID REFERENCES public.media_sources(id) ON DELETE SET NULL,
  perspective_label TEXT NOT NULL,
  summary TEXT NOT NULL DEFAULT '',
  sentiment_score NUMERIC(4,2) NOT NULL DEFAULT 0.0 CHECK (sentiment_score >= -1 AND sentiment_score <= 1),
  sentiment_label public.sentiment_label NOT NULL DEFAULT 'neutral',
  source_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_perspectives_article ON public.article_perspectives(article_id);

ALTER TABLE public.article_perspectives ENABLE ROW LEVEL SECURITY;

CREATE POLICY "perspectives_select_published" ON public.article_perspectives
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.articles
      WHERE articles.id = article_id AND articles.status = 'published'
    )
  );

CREATE POLICY "perspectives_admin_all" ON public.article_perspectives
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- ============================================
-- 9. bookmarks (user saved articles)
-- ============================================
CREATE TABLE public.bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, article_id)
);

CREATE INDEX idx_bookmarks_user ON public.bookmarks(user_id);

ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "bookmarks_select_own" ON public.bookmarks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "bookmarks_insert_own" ON public.bookmarks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "bookmarks_delete_own" ON public.bookmarks
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- 10. reading_history (freemium metering)
-- ============================================
CREATE TABLE public.reading_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  read_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  read_duration_seconds INTEGER DEFAULT 0
);

CREATE INDEX idx_reading_history_user ON public.reading_history(user_id, read_at DESC);
CREATE INDEX idx_reading_history_article ON public.reading_history(article_id);

ALTER TABLE public.reading_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "reading_history_select_own" ON public.reading_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "reading_history_insert_own" ON public.reading_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================
-- 11. user_preferences (notification/display settings)
-- ============================================
CREATE TABLE public.user_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  preferred_countries TEXT[] DEFAULT '{}',
  preferred_topics UUID[] DEFAULT '{}',
  email_notifications BOOLEAN NOT NULL DEFAULT true,
  push_notifications BOOLEAN NOT NULL DEFAULT false,
  dark_mode BOOLEAN NOT NULL DEFAULT false,
  language TEXT NOT NULL DEFAULT 'ja',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_preferences_select_own" ON public.user_preferences
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "user_preferences_insert_own" ON public.user_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_preferences_update_own" ON public.user_preferences
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- 12. contact_submissions
-- ============================================
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_contact_submissions_status ON public.contact_submissions(status);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Users can insert contact submissions
CREATE POLICY "contact_insert_authenticated" ON public.contact_submissions
  FOR INSERT WITH CHECK (true);

-- Users can view their own submissions
CREATE POLICY "contact_select_own" ON public.contact_submissions
  FOR SELECT USING (auth.uid() = user_id);

-- Admins can view and manage all
CREATE POLICY "contact_admin_all" ON public.contact_submissions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- ============================================
-- 13. comments (user comments on articles)
-- ============================================
CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_comments_article ON public.comments(article_id, created_at DESC);
CREATE INDEX idx_comments_user ON public.comments(user_id);

ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Visible comments on published articles are publicly readable
CREATE POLICY "comments_select_visible" ON public.comments
  FOR SELECT USING (
    is_visible = true AND EXISTS (
      SELECT 1 FROM public.articles
      WHERE articles.id = article_id AND articles.status = 'published'
    )
  );

-- Authenticated users can insert comments
CREATE POLICY "comments_insert_own" ON public.comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own comments
CREATE POLICY "comments_update_own" ON public.comments
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own comments
CREATE POLICY "comments_delete_own" ON public.comments
  FOR DELETE USING (auth.uid() = user_id);

-- Admins can manage all comments
CREATE POLICY "comments_admin_all" ON public.comments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- ============================================
-- 14. notifications
-- ============================================
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL DEFAULT '',
  type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'alert', 'update', 'promotion')),
  is_read BOOLEAN NOT NULL DEFAULT false,
  link TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_notifications_user ON public.notifications(user_id, is_read, created_at DESC);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "notifications_select_own" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "notifications_update_own" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Admins can insert notifications for any user
CREATE POLICY "notifications_admin_insert" ON public.notifications
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- ============================================
-- 15. analytics_events (page view tracking)
-- ============================================
CREATE TABLE public.analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('page_view', 'article_read', 'search', 'share', 'bookmark')),
  page_path TEXT NOT NULL DEFAULT '',
  article_id UUID REFERENCES public.articles(id) ON DELETE SET NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_analytics_events_type ON public.analytics_events(event_type, created_at DESC);
CREATE INDEX idx_analytics_events_user ON public.analytics_events(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX idx_analytics_events_article ON public.analytics_events(article_id) WHERE article_id IS NOT NULL;

ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Authenticated users can insert their own events
CREATE POLICY "analytics_insert_own" ON public.analytics_events
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Admins can read all analytics
CREATE POLICY "analytics_admin_select" ON public.analytics_events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- ============================================
-- 16. feedback (user ratings/feedback)
-- ============================================
CREATE TABLE public.feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT DEFAULT '',
  feedback_type TEXT NOT NULL DEFAULT 'general' CHECK (feedback_type IN ('general', 'article', 'bug_report', 'feature_request')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_feedback_article ON public.feedback(article_id) WHERE article_id IS NOT NULL;
CREATE INDEX idx_feedback_user ON public.feedback(user_id);

ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "feedback_select_own" ON public.feedback
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "feedback_insert_own" ON public.feedback
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admins can read all feedback
CREATE POLICY "feedback_admin_select" ON public.feedback
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- ============================================
-- Seed data: sample topics
-- ============================================
INSERT INTO public.topics (name, slug, description) VALUES
  ('政治', 'politics', '国内外の政治ニュース'),
  ('経済', 'economy', '経済・金融・ビジネスニュース'),
  ('テクノロジー', 'technology', 'IT・テクノロジー・AI関連ニュース'),
  ('国際', 'international', '国際関係・外交ニュース'),
  ('社会', 'society', '社会問題・文化・教育ニュース'),
  ('環境', 'environment', '環境・気候変動関連ニュース'),
  ('科学', 'science', '科学・医療・研究ニュース'),
  ('スポーツ', 'sports', 'スポーツニュース');
