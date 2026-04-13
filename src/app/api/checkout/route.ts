import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod/v4'
import { getUser, createClient } from '@/lib/supabase/server'
import { getStripe, getMonthlyPriceId, getAnnualPriceId } from '@/lib/stripe'

const planSchema = z.enum(['monthly', 'yearly', 'annual'])

async function createCheckoutSession(request: NextRequest, plan: 'monthly' | 'annual') {
  const user = await getUser()
  if (!user) {
    return null
  }

  const priceId = plan === 'monthly' ? getMonthlyPriceId() : getAnnualPriceId()

  const supabase = await createClient()
  const { data: profile } = await supabase
    .from('profiles')
    .select('stripe_customer_id, email')
    .eq('id', user.id)
    .single()

  const stripe = getStripe()
  let customerId = profile?.stripe_customer_id

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: profile?.email ?? user.email,
      metadata: { supabase_user_id: user.id },
    })
    customerId = customer.id

    await supabase
      .from('profiles')
      .update({ stripe_customer_id: customerId })
      .eq('id', user.id)
  }

  const origin = request.nextUrl.origin

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    metadata: { supabase_user_id: user.id },
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: `${origin}/subscribe?success=true`,
    cancel_url: `${origin}/subscribe?canceled=true`,
    subscription_data: {
      metadata: { supabase_user_id: user.id },
    },
  })

  return session
}

// GET handler: used by pricing-cards.tsx <a href="/api/checkout?plan=...">
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const rawPlan = searchParams.get('plan')

  const planResult = planSchema.safeParse(rawPlan)
  if (!planResult.success) {
    return NextResponse.redirect(new URL('/subscribe', request.url))
  }

  // Normalize 'yearly' → 'annual'
  const plan = planResult.data === 'yearly' ? 'annual' : planResult.data

  const user = await getUser()
  if (!user) {
    return NextResponse.redirect(new URL(`/login?redirect=/subscribe`, request.url))
  }

  try {
    const session = await createCheckoutSession(request, plan)
    if (!session?.url) {
      return NextResponse.redirect(new URL('/subscribe?error=checkout', request.url))
    }
    return NextResponse.redirect(session.url)
  } catch {
    return NextResponse.redirect(new URL('/subscribe?error=checkout', request.url))
  }
}

// POST handler: kept for API compatibility
export async function POST(request: NextRequest) {
  const user = await getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const result = z.object({ plan: z.enum(['monthly', 'annual']) }).safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  }

  try {
    const session = await createCheckoutSession(request, result.data.plan)
    if (!session?.url) {
      return NextResponse.json({ error: 'Failed to create session' }, { status: 500 })
    }
    return NextResponse.json({ url: session.url })
  } catch {
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
