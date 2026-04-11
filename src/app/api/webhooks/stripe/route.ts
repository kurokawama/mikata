import { NextResponse, type NextRequest } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/admin'
import type Stripe from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  const stripe = getStripe()
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error(`Webhook signature verification failed: ${message}`)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const admin = createAdminClient()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      let userId = session.metadata?.supabase_user_id ?? null

      // Fallback: retrieve user_id from subscription metadata
      if (!userId && session.subscription) {
        const sub = await stripe.subscriptions.retrieve(
          session.subscription as string,
        )
        userId = sub.metadata?.supabase_user_id ?? null
      }

      if (userId && session.customer) {
        await admin
          .from('profiles')
          .update({
            stripe_customer_id: session.customer as string,
            role: 'premium_user' as const,
            subscription_status: 'active' as const,
          })
          .eq('id', userId)
      }
      break
    }

    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      const userId = subscription.metadata?.supabase_user_id

      if (userId) {
        const isActive = subscription.status === 'active' || subscription.status === 'trialing'

        await admin
          .from('profiles')
          .update({
            role: isActive ? 'premium_user' as const : 'free_user' as const,
            subscription_status: subscription.status as 'active' | 'canceled' | 'past_due',
          })
          .eq('id', userId)

        // Get period dates from the first subscription item
        const item = subscription.items.data[0]
        const plan = item?.price?.recurring?.interval === 'year'
          ? 'yearly' as const
          : 'monthly' as const

        await admin
          .from('subscriptions')
          .upsert({
            user_id: userId,
            stripe_subscription_id: subscription.id,
            plan,
            amount: item?.price?.unit_amount ?? 0,
            status: subscription.status as 'active' | 'canceled' | 'past_due',
            current_period_start: new Date(item.current_period_start * 1000).toISOString(),
            current_period_end: new Date(item.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
          }, {
            onConflict: 'stripe_subscription_id',
          })
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
