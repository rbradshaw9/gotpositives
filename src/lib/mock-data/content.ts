// src/lib/mock-data/content.ts
import type { Content } from '@/types/content'

export const mockDailyAudios: Content[] = [
  {
    id: 'daily-001',
    title: 'Morning Ground',
    type: 'daily_audio',
    description: 'Start your day rooted. A calm 7-minute practice to anchor your awareness before the day pulls at you.',
    duration_seconds: 420,
    mux_asset_id: null,
    castos_episode_url: null,
    published_at: new Date().toISOString(),
    month_theme: 'Stillness',
    tags: ['grounding', 'morning', 'breath'],
    is_active: true,
  },
  {
    id: 'daily-002',
    title: 'The Reset',
    type: 'daily_audio',
    description: 'A midday practice to clear the noise and come back to yourself.',
    duration_seconds: 360,
    mux_asset_id: null,
    castos_episode_url: null,
    published_at: new Date(Date.now() - 86400000).toISOString(),
    month_theme: 'Stillness',
    tags: ['reset', 'midday', 'clarity'],
    is_active: true,
  },
]

export const mockWeeklyPrinciple: Content = {
  id: 'weekly-001',
  title: 'You Don\'t Need to Earn Rest',
  type: 'weekly_principle',
  description: 'This week\'s principle is a permission slip. Rest is not a reward — it is a requirement.',
  duration_seconds: null,
  mux_asset_id: null,
  castos_episode_url: null,
  published_at: new Date().toISOString(),
  month_theme: 'Stillness',
  tags: ['rest', 'permission', 'self-compassion'],
  is_active: true,
}

export const mockMonthlyTheme: Content = {
  id: 'monthly-001',
  title: 'March: Stillness',
  type: 'monthly_theme',
  description: 'This month we explore the practice of intentional stillness — not emptiness, but presence. Each daily audio and weekly principle is anchored to this theme.',
  duration_seconds: null,
  mux_asset_id: null,
  castos_episode_url: null,
  published_at: new Date().toISOString(),
  month_theme: 'Stillness',
  tags: ['theme', 'stillness', 'presence'],
  is_active: true,
}
