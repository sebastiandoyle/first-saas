import { useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

export default function Premium() {
  const user = useUser()
  const router = useRouter()
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user])

  async function handleSubscribe() {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    const response = await fetch('/api/create-checkout', {
      method: 'POST',
    })
    const session = await response.json()
    await stripe.redirectToCheckout({ sessionId: session.id })
  }

  if (!user) return null

  return (
    <div style={{ maxWidth: '520px', margin: '96px auto' }}>
      <h1>Premium Content</h1>
      {!isSubscribed ? (
        <div>
          <p>Subscribe to access premium content</p>
          <button onClick={handleSubscribe}>Subscribe</button>
        </div>
      ) : (
        <div>
          <h2>Welcome to Premium!</h2>
          <p>This is your exclusive content.</p>
        </div>
      )}
    </div>
  )
}