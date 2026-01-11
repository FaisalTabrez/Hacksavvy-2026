'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import RegistrationForm from '@/components/RegistrationForm'
import { useEffect, useState } from 'react'

export default function RegisterPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [supabase] = useState(() => createClient())

  useEffect(() => {
    const getUser = async () => {
         const { data: { user } } = await supabase.auth.getUser()
         setUser(user)
         setLoading(false)
    }
    getUser()
  }, [supabase])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-[#00f0ff]">Loading...</div>
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-black/90">
        <h1 className="text-2xl font-bold mb-4 text-white">Sign in Required</h1>
        <p className="mb-6 text-gray-400">Please sign in to register for Hacksavvy 2026.</p>
        <button onClick={() => router.push('/login')} className="px-8 py-3 bg-[#00f0ff] text-black rounded-full font-bold hover:bg-[#00c0cc] transition-colors">
            Sign In with Google
        </button>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#00f0ff] to-purple-500 bg-clip-text text-transparent transform hover:scale-105 transition duration-500">
            Team Registration
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
                Assemble your squad. Minimum 2, Maximum 5 members. 
                Ensure you have your payment screenshot ready.
            </p>
        </div>
        
        <RegistrationForm user={user} />
      </div>
    </main>
  )
}
