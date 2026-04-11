import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod/v4'
import { getUser, createClient } from '@/lib/supabase/server'
import { getStripe, getMonthlyPriceId, getAnnualPriceId } from '@/lib/stripe'

const checkoutSchema = z.object({
  plan: z.enum(['monthly', 'annual']),
})

export async function POST(request: NextRequest) {
  const user = await getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const result = checkoutSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  }

  const priceId = result.data.plan === 'monthly' ? getMonthlyPriceId() : getAnnualPriceId()

  // Check if user already has a stripe_customer_id
  const supabase = await createClient()
  const { data: profile } = await supabase
    .from('profiles')
    .select('stripe_customer_id, email')
    .eq('id', user.id)
    .single()

  const stripe = getStripe()
  let customerId = profile?.stripe_customer_id

  // Create Stripe customer if none exists
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: profile?.email ?? user.email,
      metadata: { supabase_user_id: user.id },
    })
    customerId = customer.id
  }

  const origin = request.nextUrl.origin

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: `${origin}/subscribe?success=true`,
    cancel_url: `${origin}/subscribe?canceled=true`,
    subscription_data: {
      metadata: { supabase_user_id: user.id },
    },
  })

  return NextResponse.json({ url: session.url })
}
