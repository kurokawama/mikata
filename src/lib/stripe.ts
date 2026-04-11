import 'server-only'

import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) {
      throw new Error('Missing STRIPE_SECRET_KEY')
    }
    _stripe = new Stripe(key, {
      apiVersion: '2026-03-25.dahlia',
      typescript: true,
    })
  }
  return _stripe
}

// Price IDs from environment — no trial period (3-month free is app-side logic)
export function getMonthlyPriceId(): string {
  const id = process.env.STRIPE_MONTHLY_PRICE_ID
  if (!id) throw new Error('Missing STRIPE_MONTHLY_PRICE_ID')
  return id
}

export function getAnnualPriceId(): string {
  const id = process.env.STRIPE_ANNUAL_PRICE_ID
  if (!id) throw new Error('Missing STRIPE_ANNUAL_PRICE_ID')
  return id
}
