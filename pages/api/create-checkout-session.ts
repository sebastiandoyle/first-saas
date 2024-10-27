import { stripe } from '../../lib/stripe'
import { supabaseAdmin } from '../../lib/supabase/admin'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing?canceled=true`,
    })

    return res.status(200).json({ id: session.id })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}