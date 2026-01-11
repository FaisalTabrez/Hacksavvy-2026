'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { ShieldCheck, User } from 'lucide-react'

export default function LoginPage() {
  const [mode, setMode] = useState<'participant' | 'admin'>('participant')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleLogin = async () => {
    setLoading(true)
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined,
      },
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4 text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${mode === 'admin' ? 'bg-red-900/10' : 'bg-[#00f0ff]/5'}`} />
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px] transition-colors duration-1000 ${mode === 'admin' ? 'bg-red-600/20' : 'bg-[#00f0ff]/20'}`} />

      <div className="w-full max-w-md space-y-8 rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md relative z-10 transition-all duration-300">
        <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              <span className={`transition-colors duration-300 ${mode === 'admin' ? 'text-red-500' : 'text-[#00f0ff]'}`}>Hacksavvy</span> Void
            </h1>
            <p className="text-sm text-gray-400">
              {mode === 'admin' ? 'Restricted Access: Coordinators Only' : 'Sign in to access your terminal'}
            </p>
        </div>

        {/* Toggle / Tabs */}
        <div className="grid grid-cols-2 p-1 bg-black/40 rounded-xl border border-white/5">
            <button
                onClick={() => setMode('participant')}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'participant' ? 'bg-[#00f0ff]/20 text-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.2)]' : 'text-gray-500 hover:text-gray-300'}`}
            >
                <User size={16} />
                Participant
            </button>
            <button
                 onClick={() => setMode('admin')}
                 className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'admin' ? 'bg-red-500/20 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'text-gray-500 hover:text-gray-300'}`}
            >
                <ShieldCheck size={16} />
                Admin
            </button>
        </div>

        <div className="space-y-4 pt-4">
            <button
                onClick={handleLogin}
                disabled={loading}
                className={`w-full py-3 rounded-xl font-bold text-black transition-all flex items-center justify-center gap-3
                    ${mode === 'admin' 
                        ? 'bg-red-500 hover:bg-red-600 shadow-[0_0_20px_rgba(239,68,68,0.4)]' 
                        : 'bg-[#00f0ff] hover:bg-[#00c0cc] shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                    }
                    ${loading ? 'opacity-70 cursor-not-allowed' : ''}
                `}
            >
                {/* Google Icon */}
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#000000" fillOpacity="0.2"/>
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor"/>
                </svg>
                {loading ? 'Connecting...' : `Sign in with Google`}
            </button>
        </div>

        {mode === 'admin' && (
            <div className="text-center text-xs text-neutral-500 border-t border-white/5 pt-4">
                Warning: Unauthorized access attempts are monitored.
            </div>
        )}
      </div>
    </div>
  )
}
