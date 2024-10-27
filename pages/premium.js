import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'

export default function Premium() {
  const user = useUser()
  const router = useRouter()
  const supabase = useSupabaseClient()

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user, router])

  const handleSubscribe = async () => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    const response = await fetch('/api/create-checkout', {
      method: 'POST'
    })
    const data = await response.json()
    if (data.id) {
      stripe?.redirectToCheckout({ sessionId: data.id })
    }
  }

  if (!user) return null

  return (
    <div style={{ padding: '50px' }}>
      <h1>Premium Page</h1>
      <button onClick={handleSubscribe}>Subscribe Now</button>
    </div>
  )
}