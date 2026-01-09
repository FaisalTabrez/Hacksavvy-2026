'use client'

import { useState } from 'react'
import { 
  LayoutDashboard, 
  Users, 
  Files, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Code2
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignOutButton, UserButton } from '@clerk/nextjs'
import { NAV_ITEMS, ADMIN_EMAILS } from '@/lib/constants'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Note: We can't easily check admin status here without props or async calls, 
  // but the Command Center link is protected by page logic mostly.
  // Visual consistency: The sidebar is static.

  return (
    <div className="min-h-screen bg-[#050505] flex text-gray-200 font-sans selection:bg-[#00f0ff] selection:text-black">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-white/10 bg-black/50 backdrop-blur-xl fixed h-full z-40">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#00f0ff] rounded-lg shadow-[0_0_15px_#00f0ff] flex items-center justify-center text-black font-bold text-xl">
             H
          </div>
          <span className="font-bold text-xl tracking-wider text-white">HACKSAVVY</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
           {NAV_ITEMS.map((item) => {
             const isActive = pathname === item.href
             const Icon = getIcon(item.icon)
             return (
               <Link 
                 key={item.href}
                 href={item.href}
                 className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative
                    ${isActive ? 'bg-[#00f0ff]/10 text-[#00f0ff]' : 'hover:bg-white/5 text-gray-400 hover:text-white'}
                 `}
               >
                 {isActive && <div className="absolute left-0 w-1 h-6 bg-[#00f0ff] rounded-r-full" />}
                 <Icon className={`w-5 h-5 ${isActive ? 'text-[#00f0ff] drop-shadow-[0_0_5px_#00f0ff]' : ''}`} />
                 <span className="font-medium">{item.label}</span>
               </Link>
             )
           })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition">
             <UserButton />
             <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate text-white">My Account</p>
                <p className="text-xs text-gray-500 truncate">Manage Profile</p>
             </div>
          </div>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 w-full z-40 bg-black/80 backdrop-blur-md border-b border-white/10 p-4 flex justify-between items-center">
         <div className="font-bold text-[#00f0ff]">HACKSAVVY</div>
         <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
         </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 min-h-screen relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#00f0ff]/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-6xl mx-auto animate-in fade-in duration-500 slide-in-from-bottom-4">
            {children}
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/95 pt-20 px-6 space-y-4 md:hidden">
            {NAV_ITEMS.map((item) => (
               <Link 
                 key={item.href} 
                 href={item.href}
                 onClick={() => setIsMobileMenuOpen(false)}
                 className="block text-2xl font-bold py-4 border-b border-white/10 text-gray-300 active:text-[#00f0ff]"
               >
                 {item.label}
               </Link>
            ))}
            <div className="pt-8">
                <UserButton showName />
            </div>
        </div>
      )}

    </div>
  )
}

function getIcon(name: string) {
    switch(name) {
        case 'LayoutDashboard': return LayoutDashboard;
        case 'Users': return Users;
        case 'Files': return Files; 
        default: return Code2;
    }
}
