import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Calculator from '../components/Calculator'

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mt-8 mb-4">Simple Calculator</h1>
      <Calculator />
    </div>
  )
}