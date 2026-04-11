// =============================================================
// MIKATA Database Types — aligned with 20260411000001 migration
// =============================================================

// ENUM types
export type UserRole = 'visitor' | 'free_user' | 'premium_user' | 'admin'
export type ArticleStatus = 'draft' | 'queued' | 'published' | 'archived'
export type SubscriptionPlan = 'monthly' | 'yearly'
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing'
export type AdStatus = 'pending' | 'approved' | 'active' | 'completed' | 'rejected'
export type SentimentLabel = 'positive' | 'negative' | 'neutral'
export type MediaReliability = 'A' | 'B' | 'C'
export type FeedType = 'rss' | 'api' | 'playwright'

// Article source entry (JSONB)
export interface ArticleSource {
  country: string
  country_code: string
  media_name: string
  url: string
  summary_80chars: string
  sentiment: SentimentLabel
}

// Sentiment summary (JSONB)
export interface SentimentSummary {
  positive: number
  negative: number
  neutral: number
}

// Supabase Database type (for createClient<Database>)
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          display_name: string | null
          role: UserRole
          free_trial_started_at: string | null
          free_trial_ends_at: string | null
          stripe_customer_id: string | null
          subscription_status: SubscriptionStatus | null
          preferred_genres: string[]
          push_enabled: boolean
          articles_read_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          display_name?: string | null
          role?: UserRole
          free_trial_started_at?: string | null
          free_trial_ends_at?: string | null
          stripe_customer_id?: string | null
          subscription_status?: SubscriptionStatus | null
          preferred_genres?: string[]
          push_enabled?: boolean
          articles_read_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          display_name?: string | null
          role?: UserRole
          free_trial_started_at?: string | null
          free_trial_ends_at?: string | null
          stripe_customer_id?: string | null
          subscription_status?: SubscriptionStatus | null
          preferred_genres?: string[]
          push_enabled?: boolean
          articles_read_count?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      articles: {
        Row: {
          id: string
          slug: string
          title: string
          genre: string
          sub_genre: string | null
          analysis_text: string | null
          sources: ArticleSource[]
          sentiment_summary: SentimentSummary | null
          status: ArticleStatus
          published_at: string | null
          free_until: string | null
          ai_model: string | null
          ai_prompt_hash: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          genre?: string
          sub_genre?: string | null
          analysis_text?: string | null
          sources?: ArticleSource[]
          sentiment_summary?: SentimentSummary | null
          status?: ArticleStatus
          published_at?: string | null
          free_until?: string | null
          ai_model?: string | null
          ai_prompt_hash?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          genre?: string
          sub_genre?: string | null
          analysis_text?: string | null
          sources?: ArticleSource[]
          sentiment_summary?: SentimentSummary | null
          status?: ArticleStatus
          published_at?: string | null
          free_until?: string | null
          ai_model?: string | null
          ai_prompt_hash?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      media_sources: {
        Row: {
          id: string
          country: string
          country_code: string
          name: string
          genre: string | null
          sub_genre: string | null
          feed_url: string | null
          feed_type: FeedType
          language: string
          reliability: MediaReliability
          check_interval_minutes: number
          commercial_use_allowed: boolean
          terms_url: string | null
          active: boolean
          last_checked_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          country: string
          country_code: string
          name: string
          genre?: string | null
          sub_genre?: string | null
          feed_url?: string | null
          feed_type?: FeedType
          language?: string
          reliability?: MediaReliability
          check_interval_minutes?: number
          commercial_use_allowed?: boolean
          terms_url?: string | null
          active?: boolean
          last_checked_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          country?: string
          country_code?: string
          name?: string
          genre?: string | null
          sub_genre?: string | null
          feed_url?: string | null
          feed_type?: FeedType
          language?: string
          reliability?: MediaReliability
          check_interval_minutes?: number
          commercial_use_allowed?: boolean
          terms_url?: string | null
          active?: boolean
          last_checked_at?: string | null
          created_at?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          stripe_subscription_id: string
          plan: SubscriptionPlan
          amount: number
          status: SubscriptionStatus
          current_period_start: string
          current_period_end: string
          cancel_at_period_end: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stripe_subscription_id: string
          plan?: SubscriptionPlan
          amount: number
          status?: SubscriptionStatus
          current_period_start: string
          current_period_end: string
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          stripe_subscription_id?: string
          plan?: SubscriptionPlan
          amount?: number
          status?: SubscriptionStatus
          current_period_start?: string
          current_period_end?: string
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'subscriptions_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      article_perspectives: {
        Row: {
          id: string
          article_id: string
          country: string
          country_code: string
          media_name: string
          source_url: string
          summary_80chars: string
          sentiment_label: SentimentLabel
          created_at: string
        }
        Insert: {
          id?: string
          article_id: string
          country: string
          country_code: string
          media_name: string
          source_url: string
          summary_80chars: string
          sentiment_label?: SentimentLabel
          created_at?: string
        }
        Update: {
          id?: string
          article_id?: string
          country?: string
          country_code?: string
          media_name?: string
          source_url?: string
          summary_80chars?: string
          sentiment_label?: SentimentLabel
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'article_perspectives_article_id_fkey'
            columns: ['article_id']
            isOneToOne: false
            referencedRelation: 'articles'
            referencedColumns: ['id']
          },
        ]
      }
      ad_placements: {
        Row: {
          id: string
          advertiser_name: string
          advertiser_email: string
          genre_target: string | null
          budget_monthly: number | null
          duration_months: number | null
          creative_url: string | null
          creative_text: string | null
          status: AdStatus
          approved_by: string | null
          approved_at: string | null
          stripe_payment_id: string | null
          impressions: number
          clicks: number
          created_at: string
        }
        Insert: {
          id?: string
          advertiser_name: string
          advertiser_email: string
          genre_target?: string | null
          budget_monthly?: number | null
          duration_months?: number | null
          creative_url?: string | null
          creative_text?: string | null
          status?: AdStatus
          approved_by?: string | null
          approved_at?: string | null
          stripe_payment_id?: string | null
          impressions?: number
          clicks?: number
          created_at?: string
        }
        Update: {
          id?: string
          advertiser_name?: string
          advertiser_email?: string
          genre_target?: string | null
          budget_monthly?: number | null
          duration_months?: number | null
          creative_url?: string | null
          creative_text?: string | null
          status?: AdStatus
          approved_by?: string | null
          approved_at?: string | null
          stripe_payment_id?: string | null
          impressions?: number
          clicks?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'ad_placements_approved_by_fkey'
            columns: ['approved_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      user_role: UserRole
      article_status: ArticleStatus
      subscription_plan: SubscriptionPlan
      subscription_status: SubscriptionStatus
      ad_status: AdStatus
      sentiment_label: SentimentLabel
      media_reliability: MediaReliability
      feed_type: FeedType
    }
    CompositeTypes: Record<string, never>
  }
}

// Convenience type aliases for direct row usage
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Article = Database['public']['Tables']['articles']['Row']
export type ArticlePerspective = Database['public']['Tables']['article_perspectives']['Row']
export type MediaSource = Database['public']['Tables']['media_sources']['Row']
export type Subscription = Database['public']['Tables']['subscriptions']['Row']
export type AdPlacement = Database['public']['Tables']['ad_placements']['Row']
