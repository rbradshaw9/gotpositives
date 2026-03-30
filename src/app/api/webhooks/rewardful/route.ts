import { NextResponse } from 'next/server'
import { createHmac, timingSafeEqual } from 'crypto'
import { supabaseAdmin } from '@/utils/supabase/admin'
import type { RewardfulWebhookPayload } from '@/types/referral'

/**
 * POST /api/webhooks/rewardful
 *
 * Verified Rewardful webhook contract (March 2026):
 *   - Signature header: X-Rewardful-Signature (HMAC-SHA256 of raw body)
 *   - Payload shape: { object: {...}, event: { name, created_at }, request: { id, idempotency_key } }
 *   - Event names: affiliate.confirmed, affiliate.created, commission.created, payout.paid, etc.
 *
 * Register this URL in Rewardful dashboard → Webhooks.
 * Use the "Signing Secret" shown per-endpoint as REWARDFUL_WEBHOOK_SECRET.
 */
export async function POST(req: Request) {
  const rawBody = await req.text()
  const signatureHeader = req.headers.get('x-rewardful-signature')
  const secret = process.env.REWARDFUL_WEBHOOK_SECRET

  // Signature verification (active once secret is set)
  if (secret) {
    if (!signatureHeader) {
      return new NextResponse('Missing X-Rewardful-Signature header', { status: 400 })
    }
    const expected = createHmac('sha256', secret).update(rawBody).digest('hex')
    const received = Buffer.from(signatureHeader, 'hex')
    const expectedBuf = Buffer.from(expected, 'hex')
    if (received.length !== expectedBuf.length || !timingSafeEqual(received, expectedBuf)) {
      return new NextResponse('Invalid webhook signature', { status: 401 })
    }
  } else {
    console.warn('[Rewardful Webhook] REWARDFUL_WEBHOOK_SECRET not set — skipping signature verification.')
  }

  let payload: RewardfulWebhookPayload
  try {
    payload = JSON.parse(rawBody)
  } catch {
    return new NextResponse('Invalid JSON payload', { status: 400 })
  }

  const eventName = payload.event?.name

  // Log to audit table
  await supabaseAdmin.from('webhook_event_log').insert({
    provider: 'rewardful',
    event_type: eventName,
    payload: payload,
  })

  // Process events
  switch (eventName) {
    case 'affiliate.confirmed':
    case 'affiliate.created': {
      // The `object` here is a Rewardful affiliate
      // TODO: find the member by email, update rewardful_affiliate_id and affiliate_status
      const affiliate = payload.object as { id?: string; email?: string; state?: string }
      console.log(`[Rewardful] ${eventName}: affiliate ${affiliate.id} (${affiliate.email})`)
      break
    }
    case 'commission.created':
    case 'commission.approved': {
      // TODO: Update affiliate_stats_cache.commissions_earned
      console.log(`[Rewardful] ${eventName}:`, payload.object)
      break
    }
    case 'payout.paid': {
      // TODO: Update affiliate_stats_cache.commissions_paid and last_synced_at
      console.log(`[Rewardful] payout.paid:`, payload.object)
      break
    }
    default:
      console.log(`[Rewardful] Unhandled event: ${eventName}`)
  }

  return new NextResponse('ok', { status: 200 })
}
