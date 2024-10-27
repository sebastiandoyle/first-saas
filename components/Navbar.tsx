import Link from 'next/link'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Navbar() {
  const supabase = useSupabaseClient()

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              Home
            </Link>
            <Link href="/dashboard" className="flex items-center ml-8">
              Dashboard
            </Link>
            <Link href="/pricing" className="flex items-center ml-8">
              Pricing
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}