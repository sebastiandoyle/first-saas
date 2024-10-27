import { useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Calculator() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const supabase = useSupabaseClient()

  async function calculate() {
    try {
      const res = eval(input)
      setResult(res)
      
      // Save to history if user is premium
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('calculations').insert({
          user_id: user.id,
          expression: input,
          result: res
        })
      }
    } catch (error) {
      setResult('Error')
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={calculate}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded"
      >
        Calculate
      </button>
      {result && (
        <div className="mt-4 text-xl text-center">{result}</div>
      )}
    </div>
  )
}