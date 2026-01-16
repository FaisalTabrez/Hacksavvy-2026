'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import { KeyRound, ShieldAlert, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [isAdmin, setIsAdmin] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?type=${isAdmin ? 'admin' : 'participant'}`,
      },
    })
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-20" />

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_-10px_rgba(220,38,38,0.3)]">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 mb-4 animate-pulse">
            <KeyRound className="w-8 h-8 text-neon-red" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
            Hacksavvy Portal
          </h1>
          <p className="text-neutral-400 text-sm">
            Access your dashboard to manage registration
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="participant" onValueChange={(val: string) => setIsAdmin(val === 'admin')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-black/40 p-1 rounded-xl mb-8 border border-white/5">
            <TabsTrigger 
              value="participant"
              className="rounded-lg data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg text-neutral-400 font-medium transition-all"
            >
              Participant
            </TabsTrigger>
            <TabsTrigger 
              value="admin"
              className="rounded-lg data-[state=active]:bg-neutral-800 data-[state=active]:text-white data-[state=active]:border-white/20 text-neutral-400 font-medium transition-all"
            >
              Admin
            </TabsTrigger>
          </TabsList>

          <TabsContent value="participant" className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
             <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl text-center">
                <p className="text-red-200 text-sm font-medium">
                  Register your team or check status
                </p>
             </div>
             
             <button
              onClick={handleGoogleLogin}
              className="w-full group relative flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-red-500/25"
            >
              <Image src="/google.svg" alt="Google" width={20} height={20} className="filter brightness-0 invert" />
              <span>Sign in with Google</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
          </TabsContent>

          <TabsContent value="admin" className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
             <div className="p-4 bg-neutral-900/50 border border-neutral-700/50 rounded-xl text-center flex items-center justify-center gap-2 text-neutral-400">
                <ShieldAlert className="w-4 h-4" />
                <span className="text-sm">Restricted Access</span>
             </div>

             <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white text-black hover:bg-neutral-200 font-bold py-4 rounded-xl transition-all"
            >
              <Image src="/google.svg" alt="Google" width={20} height={20} />
              <span>Admin Login</span>
            </button>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-8 text-center">
            <p className="text-xs text-neutral-600">
                By signing in, you agree to our Terms & Guidelines.
            </p>
        </div>

      </div>
    </div>
  )
}
