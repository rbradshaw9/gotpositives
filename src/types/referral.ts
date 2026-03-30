// src/types/referral.ts
// ============================================================
// Rewardful Referral Data Contract
// Verified against Rewardful API v1 documentation (March 2026)
// ============================================================

export interface FaqItem {
  question: string
  answer: string
}

// ─── OUR INTERNAL UI CONTRACT ────────────────────────────────
// This is the shape flowing through the Referral Center UI.
// The data adapter in src/lib/adapters/rewardful.ts maps
// live Rewardful API data → this shape.

export interface ReferralDashboardData {
  referralLink: string
  clicks: number
  leads: number
  paidConversions: number
  commissionsEarned: number
  commissionsPaid: number
  recruiterOverrideEarned: number
  payoutStatus: 'configured' | 'pending_setup' | 'processing'
  lastPayoutDate: string | null
  affiliateStatus: 'active' | 'pending' | 'not_joined'
  faqItems: FaqItem[]
}

// ─── REWARDFUL RAW API SHAPES ────────────────────────────────
// Source: https://www.rewardful.com/docs/api
// Verified March 2026. Do not alter without re-verifying docs.

/**
 * Rewardful SSO response shape.
 * GET /v1/affiliates/:id/sso
 * Response: { sso: { url: string, expires: string } }
 * Note: url expires after 1 minute. Redirect immediately.
 */
export interface RewardfulSSOResponse {
  sso: {
    url: string
    expires: string // ISO timestamp
  }
}

/**
 * Rewardful webhook payload shape.
 * Header: X-Rewardful-Signature (HMAC-SHA256 of raw body with Signing Secret)
 * Root keys: object, event, request
 */
export interface RewardfulWebhookPayload {
  object: Record<string, unknown> // the record that triggered the event (affiliate, commission, etc.)
  event: {
    name: string    // e.g. 'affiliate.confirmed', 'commission.created', 'payout.paid'
    created_at: string
  }
  request: {
    id: string
    idempotency_key: string | null
  }
}
