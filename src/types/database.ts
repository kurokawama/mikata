export type SentimentLabel = "positive" | "negative" | "neutral";
export type ArticleStatus = "draft" | "published" | "archived";
export type UserRole = "user" | "admin";
export type SubscriptionStatus = "active" | "trialing" | "canceled" | "past_due" | "incomplete";
export type AdPosition = "article_between" | "sidebar" | "header" | "footer";

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
  created_at: string;
  image_url: string | null;
}

export interface ArticleWithSource extends Article {
  media_sources: MediaSource;
}

export interface MediaSource {
  id: string;
  name: string;
  country_code: string;
  url: string;
  reliability_score: number;
  is_active: boolean;
}

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

export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  status: SubscriptionStatus;
  current_period_end: string;
  created_at: string;
}

export interface AdPlacement {
  id: string;
  slot_name: string;
  ad_code: string;
  is_active: boolean;
  position: AdPosition;
}

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
        Insert: Omit<MediaSource, "id">;
        Update: Partial<Omit<MediaSource, "id">>;
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
    };
  };
}
