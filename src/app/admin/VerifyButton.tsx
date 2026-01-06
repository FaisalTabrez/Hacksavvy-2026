'use client'

import { verifyPayment } from './actions'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function VerifyButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)
  const [complete, setComplete] = useState(false)

  async function handleVerify() {
    if (!confirm('Are you sure you want to verify this payment?')) return

    setLoading(true)
    const result = await verifyPayment(id)
    setLoading(false)

    if (result.success) {
      setComplete(true)
      // Optional: Refresh page to update list if needed, 
      // though revalidatePath in action might handle it on next visit/refresh
    } else {
      alert('Error: ' + result.error)
    }
  }

  if (complete) {
    return <span className="text-green-400 font-bold">Verified</span>
  }

  return (
    <button
      onClick={handleVerify}
      disabled={loading}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm disabled:opacity-50 transition-colors"
    >
      {loading ? 'Verifying...' : 'Verify Payment'}
    </button>
  )
}
