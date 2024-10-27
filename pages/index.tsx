import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import Link from 'next/link'

export default function Home() {
  const supabaseClient = useSupabaseClient()
  const user = useUser()

  async function signIn() {
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'github'
    })
    if (error) console.log('Error:', error.message)
  }

  async function signOut() {
    const { error } = await supabaseClient.auth.signOut()
    if (error) console.log('Error:', error.message)
  }

  return (
    <div style={{ maxWidth: '520px', margin: '96px auto' }}>
      <h1>Simple SaaS</h1>
      {!user ? (
        <button onClick={signIn}>Sign In</button>
      ) : (
        <div>
          <p>Welcome, {user.email}</p>
          <Link href="/premium">Premium Content</Link>
          <button onClick={signOut}>Sign Out</button>
        </div>
      )}
    </div>
  )
}