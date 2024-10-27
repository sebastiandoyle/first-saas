import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'next/link'

export default function Home() {
  const supabase = useSupabaseClient()

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github'
    })
  }

  return (
    <div style={{ padding: '50px' }}>
      <h1>Welcome to SaaS</h1>
      <button onClick={handleLogin}>Login with GitHub</button>
      <br />
      <Link href="/premium">Go to Premium</Link>
    </div>
  )
}