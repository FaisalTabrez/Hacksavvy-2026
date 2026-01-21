'use client'

import { useState } from 'react'
import { LogOut, X, Menu } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => createClient())
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-red-600 selection:text-black flex flex-col">
      
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-600 rounded-lg shadow-[0_0_15px_#ff0033] flex items-center justify-center text-black font-bold text-xl">
                H
              </div>
              <span className="font-bold text-xl tracking-wider text-white">HACKSAVVY</span>
            </Link>

            <div className="hidden md:flex items-center gap-4">
               <button 
                  onClick={handleSignOut} 
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 transition group text-sm font-medium"
               >
                  <LogOut className="w-4 h-4 text-gray-400 group-hover:text-red-400" />
                  <span className="text-gray-300 group-hover:text-red-300">Sign Out</span>
               </button>
            </div>

            {/* Mobile Menu Toggle */}
             <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X /> : <Menu />}
             </button>
        </div>
      </header>

       {/* Mobile Menu Dropdown */}
       {isMobileMenuOpen && (
          <div className="md:hidden border-b border-white/10 bg-black/95 p-4">
             <button 
                onClick={handleSignOut}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20"
             >
                <LogOut className="w-4 h-4" /> Sign Out
             </button>
          </div>
       )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 min-h-screen relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#00f0ff]/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto animate-in fade-in duration-500">
            {children}
        </div>
      </main>
    </div>
  )
}

