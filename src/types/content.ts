// src/types/content.ts
// Types for content, audio, and member data

export type ContentType = 'daily_audio' | 'weekly_principle' | 'monthly_theme' | 'library' | 'workshop'

export interface Content {
  id: string
  title: string
  type: ContentType
  description: string | null
  duration_seconds: number | null
  mux_asset_id: string | null
  castos_episode_url: string | null
  published_at: string
  month_theme: string | null
  tags: string[] | null
  is_active: boolean
}

export interface MemberProfile {
  id: string
  email: string
  name: string | null
  avatar_url: string | null
  subscription_status: 'active' | 'canceled' | 'past_due' | 'trialing' | null
  subscription_tier: 'monthly' | 'annual' | 'coaching' | null
  subscription_end_date: string | null
  practice_streak: number
  last_practiced_at: string | null
  affiliate_status: 'active' | 'pending' | 'not_joined' | null
  rewardful_referral_link: string | null
}
