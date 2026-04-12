export type SentimentLabel = "positive" | "negative" | "neutral";
export type ArticleStatus = "draft" | "published" | "archived";
export type UserRole = "user" | "admin";
export type SubscriptionStatus = "active" | "trialing" | "canceled" | "past_due" | "incomplete";
export type AdPosition = "article_between" | "sidebar" | "header" | "footer";
export type ContactStatus = "new" | "in_progress" | "resolved" | "closed";
export type NotificationType = "info" | "alert" | "update" | "promotion";
export type AnalyticsEventType = "page_view" | "article_read" | "search" | "share" | "bookmark";
export type FeedbackType = "general" | "article" | "bug_report" | "feature_request";

// ---- Table 1: media_sources ----
export interface MediaSource {
  id: string;
  name: string;
  country_code: string;
  url: string;
  reliability_score: number;
  is_active: boolean;
  created_at: string;
}

// ---- Table 2: articles ----
export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  sentiment_score: number;
  sentiment_label: SentimentLabel;
  source_id: string;
  country_code: string;
  published_at: string;
  status: ArticleStatus;
  is_premium: boolean;
  created_at: string;
  image_url: string | null;
}

export interface ArticleWithSource extends Article {
  media_sources: MediaSource;
}

// ---- Table 3: profiles ----
export interface Profile {
  id: string;
  display_name: string | null;
  role: UserRole;
  subscription_status: SubscriptionStatus | null;
  trial_ends_at: string | null;
  daily_article_count: number;
  last_article_date: string | null;
  created_at: string;
}

// ---- Table 4: subscriptions ----
export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  status: SubscriptionStatus;
  current_period_end: string;
  created_at: string;
}

// ---- Table 5: ad_placements ----
export interface AdPlacement {
  id: string;
  slot_name: string;
  ad_code: string;
  is_active: boolean;
  position: AdPosition;
}

// ---- Table 6: topics ----
export interface Topic {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
}

// ---- Table 7: article_topics (join table) ----
export interface ArticleTopic {
  article_id: string;
  topic_id: string;
}

// ---- Table 8: article_perspectives ----
export interface ArticlePerspective {
  id: string;
  article_id: string;
  source_id: string | null;
  perspective_label: string;
  summary: string;
  sentiment_score: number;
  sentiment_label: SentimentLabel;
  source_url: string | null;
  created_at: string;
}

export interface ArticlePerspectiveWithSource extends ArticlePerspective {
  media_sources: MediaSource | null;
}

// ---- Table 9: bookmarks ----
export interface Bookmark {
  id: string;
  user_id: string;
  article_id: string;
  created_at: string;
}

// ---- Table 10: reading_history ----
export interface ReadingHistory {
  id: string;
  user_id: string;
  article_id: string;
  read_at: string;
  read_duration_seconds: number;
}

// ---- Table 11: user_preferences ----
export interface UserPreferences {
  id: string;
  user_id: string;
  preferred_countries: string[];
  preferred_topics: string[];
  email_notifications: boolean;
  push_notifications: boolean;
  dark_mode: boolean;
  language: string;
  updated_at: string;
}

// ---- Table 12: contact_submissions ----
export interface ContactSubmission {
  id: string;
  user_id: string | null;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: ContactStatus;
  created_at: string;
}

// ---- Table 13: comments ----
export interface Comment {
  id: string;
  article_id: string;
  user_id: string;
  content: string;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface CommentWithProfile extends Comment {
  profiles: Pick<Profile, "id" | "display_name">;
}

// ---- Table 14: notifications ----
export interface Notification {
  id: string;
  user_id: string;
  title: string;
  body: string;
  type: NotificationType;
  is_read: boolean;
  link: string | null;
  created_at: string;
}

// ---- Table 15: analytics_events ----
export interface AnalyticsEvent {
  id: string;
  user_id: string | null;
  event_type: AnalyticsEventType;
  page_path: string;
  article_id: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

// ---- Table 16: feedback ----
export interface Feedback {
  id: string;
  user_id: string;
  article_id: string | null;
  rating: number | null;
  comment: string;
  feedback_type: FeedbackType;
  created_at: string;
}

// ---- Supabase Database type mapping ----
export interface Database {
  public: {
    Tables: {
      articles: {
        Row: Article;
        Insert: Omit<Article, "id" | "created_at">;
        Update: Partial<Omit<Article, "id" | "created_at">>;
      };
      media_sources: {
        Row: MediaSource;
        Insert: Omit<MediaSource, "id" | "created_at">;
        Update: Partial<Omit<MediaSource, "id" | "created_at">>;
      };
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "created_at">;
        Update: Partial<Omit<Profile, "id" | "created_at">>;
      };
      subscriptions: {
        Row: Subscription;
        Insert: Omit<Subscription, "id" | "created_at">;
        Update: Partial<Omit<Subscription, "id" | "created_at">>;
      };
      ad_placements: {
        Row: AdPlacement;
        Insert: Omit<AdPlacement, "id">;
        Update: Partial<Omit<AdPlacement, "id">>;
      };
      topics: {
        Row: Topic;
        Insert: Omit<Topic, "id" | "created_at">;
        Update: Partial<Omit<Topic, "id" | "created_at">>;
      };
      article_topics: {
        Row: ArticleTopic;
        Insert: ArticleTopic;
        Update: Partial<ArticleTopic>;
      };
      article_perspectives: {
        Row: ArticlePerspective;
        Insert: Omit<ArticlePerspective, "id" | "created_at">;
        Update: Partial<Omit<ArticlePerspective, "id" | "created_at">>;
      };
      bookmarks: {
        Row: Bookmark;
        Insert: Omit<Bookmark, "id" | "created_at">;
        Update: Partial<Omit<Bookmark, "id" | "created_at">>;
      };
      reading_history: {
        Row: ReadingHistory;
        Insert: Omit<ReadingHistory, "id">;
        Update: Partial<Omit<ReadingHistory, "id">>;
      };
      user_preferences: {
        Row: UserPreferences;
        Insert: Omit<UserPreferences, "id" | "updated_at">;
        Update: Partial<Omit<UserPreferences, "id">>;
      };
      contact_submissions: {
        Row: ContactSubmission;
        Insert: Omit<ContactSubmission, "id" | "created_at">;
        Update: Partial<Omit<ContactSubmission, "id" | "created_at">>;
      };
      comments: {
        Row: Comment;
        Insert: Omit<Comment, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Comment, "id" | "created_at">>;
      };
      notifications: {
        Row: Notification;
        Insert: Omit<Notification, "id" | "created_at">;
        Update: Partial<Omit<Notification, "id" | "created_at">>;
      };
      analytics_events: {
        Row: AnalyticsEvent;
        Insert: Omit<AnalyticsEvent, "id" | "created_at">;
        Update: Partial<Omit<AnalyticsEvent, "id" | "created_at">>;
      };
      feedback: {
        Row: Feedback;
        Insert: Omit<Feedback, "id" | "created_at">;
        Update: Partial<Omit<Feedback, "id" | "created_at">>;
      };
    };
  };
}
