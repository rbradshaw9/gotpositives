export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import type { RewardfulSSOResponse } from '@/types/referral'

/**
 * GET /api/rewardful/sso
 *
 * Verified against Rewardful API v1 (March 2026):
 *   GET https://api.getrewardful.com/v1/affiliates/:id/sso
 *   Response: { sso: { url: string, expires: string } }
 *   Note: url expires after 1 minute. Redirect immediately.
 *
 * PENDING CONNECTION: Requires REWARDFUL_API_KEY to be set.
 */
export async function GET() {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { data: member } = await supabase
    .from('member')
    .select('rewardful_affiliate_id, email')
    .eq('id', user.id)
    .single()

  if (!member?.rewardful_affiliate_id) {
    return NextResponse.json(
      { error: 'No affiliate account found. Please sign up via the affiliate program first.' },
      { status: 404 }
    )
  }

  const apiKey = process.env.REWARDFUL_API_KEY
  if (!apiKey) {
    console.warn('[Rewardful SSO] REWARDFUL_API_KEY not set — returning placeholder.')
    return NextResponse.json(
      { error: 'Affiliate portal not yet connected. Please check back soon.' },
      { status: 503 }
    )
  }

  // Call Rewardful API to get SSO magic link
  const response = await fetch(
    `https://api.getrewardful.com/v1/affiliates/${member.rewardful_affiliate_id}/sso`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  )

  if (!response.ok) {
    const err = await response.text()
    console.error('[Rewardful SSO] API error:', response.status, err)
    return NextResponse.json({ error: 'Failed to generate affiliate login link.' }, { status: 502 })
  }

  const data: RewardfulSSOResponse = await response.json()
  // Redirect immediately — url expires in 1 minute
  return NextResponse.redirect(data.sso.url)
}
