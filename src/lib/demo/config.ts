// src/lib/demo/config.ts
// ============================================================
// Demo Mode System
// 
// Controls the app's UX state during preview/review sessions.
// Activated via URL query param: ?demo=<state>
// 
// States:
//   subscribed      - logged in, active member (default demo)
//   unsubscribed    - logged in, no subscription
//   affiliate       - logged in, active affiliate
//   logged-out      - not authenticated
//
// Usage: http://localhost:3000/app?demo=subscribed
// ============================================================

export const DEMO_STATES = [
  'subscribed',
  'unsubscribed',
  'affiliate',
  'logged-out',
] as const

export type DemoState = typeof DEMO_STATES[number]

export interface DemoContext {
  active: boolean
  state: DemoState
  member: {
    name: string
    email: string
    avatarInitials: string
    subscriptionStatus: 'active' | 'canceled' | 'past_due' | 'trialing' | null
    subscriptionTier: 'monthly' | 'annual' | 'coaching' | null
    practiceStreak: number
    affiliateStatus: 'active' | 'pending' | 'not_joined' | null
    rewardfulReferralLink: string | null
  }
}

const BASE_MEMBER = {
  name: 'Jane Positives',
  email: 'jane@example.com',
  avatarInitials: 'JP',
  practiceStreak: 7,
}

export const DEMO_CONTEXTS: Record<DemoState, DemoContext> = {
  'subscribed': {
    active: true,
    state: 'subscribed',
    member: {
      ...BASE_MEMBER,
      subscriptionStatus: 'active',
      subscriptionTier: 'monthly',
      affiliateStatus: 'not_joined',
      rewardfulReferralLink: null,
    },
  },
  'affiliate': {
    active: true,
    state: 'affiliate',
    member: {
      ...BASE_MEMBER,
      subscriptionStatus: 'active',
      subscriptionTier: 'annual',
      affiliateStatus: 'active',
      rewardfulReferralLink: 'https://gotpositives.com/?via=jpositives',
    },
  },
  'unsubscribed': {
    active: true,
    state: 'unsubscribed',
    member: {
      ...BASE_MEMBER,
      subscriptionStatus: 'canceled',
      subscriptionTier: null,
      affiliateStatus: 'not_joined',
      rewardfulReferralLink: null,
    },
  },
  'logged-out': {
    active: true,
    state: 'logged-out',
    member: {
      name: '',
      email: '',
      avatarInitials: '',
      subscriptionStatus: null,
      subscriptionTier: null,
      practiceStreak: 0,
      affiliateStatus: null,
      rewardfulReferralLink: null,
    },
  },
}

export function getDemoContext(demoParam: string | null | undefined): DemoContext | null {
  if (!demoParam) return null
  const state = DEMO_STATES.find(s => s === demoParam)
  if (!state) return null
  return DEMO_CONTEXTS[state]
}
