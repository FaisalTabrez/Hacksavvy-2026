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
         if (!user) {
             router.replace('/login')
             return
         }
         setUser(user)
         setLoading(false)
    }
    getUser()
  }, [supabase, router])

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-neon-red">Loading...</div>
  }

  // Double check (though useEffect handles redirect)
  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen bg-black text-white py-20 px-4">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-red-900/10 via-black to-black pointer-events-none z-0" />
      
      <div className="relative z-10 container mx-auto max-w-4xl">
        <div className="text-center mb-12">
            <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter text-white">
                Team <span className="text-neon-red">Registration</span>
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
