'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function LoginPage() {
  const [supabase] = useState(() => createClient())

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-white/10 bg-white/5 p-8 shadow-[0_0_50px_-12px_rgba(0,240,255,0.25)] backdrop-blur-md">
        <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              <span className="text-[#00f0ff]">Hacksavvy</span> Void
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Sign in to access your terminal
            </p>
        </div>

        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#00f0ff',
                  brandAccent: '#00c0cc',
                  inputText: 'white',
                  inputLabelText: '#9ca3af',
                  inputPlaceholder: '#6b7280',
                },
              },
            },
            className: {
                button: 'text-black font-bold hover:bg-[#00c0cc] transition-colors',
                container: 'gap-4'
            }
          }}
          providers={['google']}
          onlyThirdPartyProviders={true}
          theme="dark"
          redirectTo={typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : ''}
        />
      </div>
    </div>
  )
}
