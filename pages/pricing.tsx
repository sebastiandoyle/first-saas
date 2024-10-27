import { loadStripe } from '@stripe/stripe-js'

export default function Pricing() {
  async function handleSubscribe() {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
    })
    const session = await response.json()
    await stripe.redirectToCheckout({ sessionId: session.id })
  }

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-md mx-auto mt-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Premium Plan</h2>
          <p className="mb-4">Save your calculation history</p>
          <button
            onClick={handleSubscribe}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  )
}