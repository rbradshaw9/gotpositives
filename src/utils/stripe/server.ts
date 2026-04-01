import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
    _stripe = new Stripe(key, {
      // @ts-ignore
      apiVersion: '2023-10-16',
      appInfo: {
        name: 'Positives Platform',
        version: '0.1.0',
      },
    })
  }
  return _stripe
}

// Backward-compat: lazily-evaluated proxy so existing `stripe.xxx` calls still work
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as unknown as Record<string | symbol, unknown>)[prop]
  },
})
