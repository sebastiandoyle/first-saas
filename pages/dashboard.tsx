import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [history, setHistory] = useState([])
  const supabase = useSupabaseClient()

  useEffect(() => {
    loadHistory()
  }, [])

  async function loadHistory() {
    const { data } = await supabase
      .from('calculations')
      .select('*')
      .order('created_at', { ascending: false })
    setHistory(data || [])
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mt-8 mb-4">Calculation History</h1>
      <div className="space-y-4">
        {history.map((calc) => (
          <div key={calc.id} className="p-4 border rounded">
            {calc.expression} = {calc.result}
          </div>
        ))}
      </div>
    </div>
  )
}