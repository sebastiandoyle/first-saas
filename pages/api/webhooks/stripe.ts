import { buffer } from 'micro'
import Stripe from 'stripe'
import { supabaseAdmin } from '../../../lib/supabase/admin'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const buf = await buffer(req)
  const sig = req.headers['stripe-signature']

  try {
    const event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )

    // Handle the event
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        // Update user's subscription status
        break
    }

    res.status(200).json({ received: true })
  } catch (error) {
    console.error('Error:', error)
    res.status(400).json({ message: 'Webhook error' })
  }
}