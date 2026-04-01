export const dynamic = 'force-dynamic'

import { stripe } from '@/utils/stripe/server'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseAdmin } from '@/utils/supabase/admin'

// Map Stripe subscription status → our MEMBER table status + tier
// Note: current_period_end is in Stripe.Subscription but may not be typed in all SDK versions
function resolveSubscriptionMeta(subscription: Stripe.Subscription): {
  status: string
  tier: string | null
  end_date: string
} {
  const interval = subscription.items.data[0]?.plan?.interval
  const tier = interval === 'year' ? 'annual' : interval === 'month' ? 'monthly' : null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const periodEnd = (subscription as any).current_period_end as number
  return {
    status: subscription.status,
    tier,
    end_date: new Date(periodEnd * 1000).toISOString(),
  }
}

export async function POST(req: Request) {
  const body = await req.text()
  const headerPayload = await headers()
  const signature = headerPayload.get('stripe-signature') as string
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  let event: Stripe.Event

  try {
    if (!signature || !webhookSecret) {
      return new NextResponse('Webhook secret not configured.', { status: 400 })
    }
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error(`[Stripe Webhook] Signature verification failed: ${message}`)
    return new NextResponse(`Webhook Error: ${message}`, { status: 400 })
  }

  // Log every event to the audit table for debugging
  await supabaseAdmin.from('webhook_event_log').insert({
    provider: 'stripe',
    event_type: event.type,
    payload: event,
  })

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string
      const meta = resolveSubscriptionMeta(subscription)

      const { error } = await supabaseAdmin
        .from('member')
        .update({
          subscription_status: meta.status,
          subscription_tier: meta.tier,
          subscription_end_date: meta.end_date,
        })
        .eq('stripe_customer_id', customerId)

      if (error) {
        console.error(`[Stripe] Failed to update member for customer ${customerId}:`, error)
      } else {
        console.log(`[Stripe] ${event.type}: updated member for customer ${customerId} → ${meta.status}`)
      }
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string

      const { error } = await supabaseAdmin
        .from('member')
        .update({
          subscription_status: 'canceled',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          subscription_end_date: new Date(((subscription as any).current_period_end as number) * 1000).toISOString(),
        })
        .eq('stripe_customer_id', customerId)

      if (error) {
        console.error(`[Stripe] Failed to cancel member for customer ${customerId}:`, error)
      } else {
        console.log(`[Stripe] Subscription deleted: member ${customerId} set to canceled`)
      }
      break
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice
      const customerId = invoice.customer as string

      // Mark as past_due. Access revocation happens via customer.subscription.updated
      const { error } = await supabaseAdmin
        .from('member')
        .update({ subscription_status: 'past_due' })
        .eq('stripe_customer_id', customerId)

      if (error) {
        console.error(`[Stripe] Failed to mark past_due for ${customerId}:`, error)
      } else {
        console.log(`[Stripe] Payment failed: member ${customerId} marked past_due`)
      }
      break
    }

    default:
      console.log(`[Stripe Webhook] Unhandled event: ${event.type}`)
  }

  return new NextResponse('ok', { status: 200 })
}
