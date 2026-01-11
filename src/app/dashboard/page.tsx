import { getUserState } from '@/lib/data'
import { redirect } from 'next/navigation'
import RegistrationForm from '@/components/RegistrationForm'
import { Clock, Ticket, CheckCircle2, ShieldAlert, User, Users, MessageSquare } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const { isAuthenticated, user, team, isAdmin, state } = await getUserState()

  if (!isAuthenticated) {
     redirect('/login')
  }

  // Strict separation: Admins go to Admin Dashboard
  if (isAdmin) {
    redirect('/admin/dashboard')
  }

  // --- STATE A: NEW USER (No Registration) ---
  if (state === 'NEW') {
    return (
      <div className="space-y-6 animate-in fade-in zoom-in duration-500">
         <div className="bg-gradient-to-r from-[#00f0ff]/10 to-purple-500/10 border border-[#00f0ff]/20 p-8 rounded-2xl text-center backdrop-blur-sm">
             <h1 className="text-3xl font-bold text-white mb-4">Welcome to <span className="text-[#00f0ff]">Hacksavvy 2.0</span></h1>
             <p className="text-gray-400 max-w-lg mx-auto mb-8">
                Your journey into the Liquid Void begins here. Assemble your team and register to secure your spot.
             </p>
         </div>

         <div className="bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
             <RegistrationForm user={user} />
         </div>
      </div>
    )
  }

  // --- HACKER HUD (SHARED LAYOUT FOR PENDING/VERIFIED/REJECTED) ---
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
        {/* HUD Header */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00f0ff] to-purple-600 flex items-center justify-center text-black font-bold text-xl">
                    {user?.user_metadata?.full_name?.[0] || 'H'}
                </div>
                <div>
                   <h1 className="text-xl font-bold text-white leading-tight">
                       {user?.user_metadata?.full_name || 'Hacker'}
                   </h1>
                   <p className="text-sm text-gray-400 font-mono">
                       ID: {user?.id?.slice(0, 8)}...
                   </p>
                </div>
            </div>
            
            <div className="px-4 py-2 rounded-full bg-black/50 border border-white/10 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full animate-pulse ${
                    state === 'VERIFIED' ? 'bg-green-500' : 
                    state === 'REJECTED' ? 'bg-red-500' : 'bg-yellow-500'
                }`} />
                <span className="text-sm font-bold tracking-wider text-gray-300">
                    STATUS: <span className={
                        state === 'VERIFIED' ? 'text-green-400' : 
                        state === 'REJECTED' ? 'text-red-400' : 'text-yellow-400'
                    }>{state}</span>
                </span>
            </div>
        </div>

        {/* Status Banner */}
        {state === 'PENDING' && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex items-center gap-4 text-yellow-200">
                <Clock className="w-5 h-5 shrink-0" />
                <p>Your application is under review. Verifying payment of ₹{team?.transaction_id}.</p>
            </div>
        )}

        {state === 'REJECTED' && (
             <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl space-y-4">
                <div className="flex items-center gap-4 text-red-200">
                    <ShieldAlert className="w-6 h-6 shrink-0" />
                    <div>
                        <h3 className="font-bold">Application Issue</h3>
                        <p className="text-sm text-red-300/80">Payment verification failed. Please check your details.</p>
                    </div>
                </div>
                <div className="bg-black/20 p-4 rounded-lg">
                    <RegistrationForm user={user} initialData={team} />
                </div>
             </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* CARD 1: My Application */}
            <div className="md:col-span-2 bg-black/40 border border-white/5 p-6 rounded-2xl hover:border-[#00f0ff]/30 transition group">
                <div className="flex items-center gap-3 mb-6">
                    <Users className="w-5 h-5 text-[#00f0ff]" />
                    <h2 className="text-lg font-bold text-white">Squad Data</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="bg-white/5 p-4 rounded-xl">
                         <span className="text-xs text-gray-500 uppercase tracking-wider">Team Name</span>
                         <div className="text-lg font-bold text-white mt-1">{team?.team_name}</div>
                     </div>
                     <div className="bg-white/5 p-4 rounded-xl">
                         <span className="text-xs text-gray-500 uppercase tracking-wider">Selected Track</span>
                         <div className="text-lg font-bold text-purple-400 mt-1">{team?.track}</div>
                     </div>
                </div>

                {state === 'VERIFIED' && (
                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 bg-green-500/10 border border-green-500/20 p-4 rounded-xl flex items-center justify-between">
                             <div className="flex items-center gap-3">
                                 <Ticket className="w-5 h-5 text-green-400" />
                                 <div>
                                     <div className="font-bold text-green-100">Event Pass</div>
                                     <div className="text-xs text-green-300/60">Confirmed</div>
                                 </div>
                             </div>
                        </div>
                        <a href="#" className="flex-1 bg-[#5865F2] hover:bg-[#4752c4] text-white p-4 rounded-xl flex items-center justify-center gap-2 font-bold transition">
                             <MessageSquare className="w-5 h-5" />
                             Join Discord
                        </a>
                    </div>
                )}
            </div>

            {/* CARD 2: Coordinator Info */}
            <div className="bg-black/40 border border-white/5 p-6 rounded-2xl hover:border-purple-500/30 transition">
                <div className="flex items-center gap-3 mb-6">
                    <User className="w-5 h-5 text-purple-400" />
                    <h2 className="text-lg font-bold text-white">Coordinator</h2>
                </div>
                
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/10" />
                        <div>
                            <div className="font-bold text-white">Nexis Support</div>
                            <div className="text-xs text-gray-400">Event Coordinator</div>
                        </div>
                    </div>
                    
                    <div className="pt-4 border-t border-white/5 space-y-3">
                         <div className="text-sm">
                             <span className="text-gray-500 block text-xs mb-1">EMAIL</span>
                             <span className="text-gray-300 select-all">support@hacksavvy.ovh</span>
                         </div>
                         <div className="text-sm">
                             <span className="text-gray-500 block text-xs mb-1">EMERGENCY</span>
                             <span className="text-gray-300 select-all">#help-desk (Discord)</span>
                         </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}
