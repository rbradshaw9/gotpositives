import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  // @ts-ignore
  apiVersion: '2023-10-16',
  appInfo: {
    name: 'Positives Platform',
    version: '0.1.0',
  },
})
