import { getUserState } from '@/lib/data'
import { createClient } from '@/utils/supabase/server'
import RegistrationForm from '@/components/RegistrationForm' // Need to update this to handle optional create/edit prop
import CommandCenter from '@/components/dashboard/CommandCenter'
import { Clock, Ticket, CheckCircle2, ShieldAlert } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const { isAuthenticated, user, team, isAdmin, state } = await getUserState()

  if (!isAuthenticated) {
     return <div>Redirecting to login...</div> // Middleware usually handles this
  }

  // --- STATE D: ADMIN MODE ---
  if (isAdmin) {
    const supabase = await createClient()
    // Fetch pending teams for admin
    const { data: pendingTeams } = await supabase
       .from('teams')
       .select('*')
       .eq('payment_status', 'pending')
    
    return (
       <div className="space-y-8">
           <div className="bg-gradient-to-r from-red-900/20 to-black border border-red-500/20 p-6 rounded-2xl relative overflow-hidden">
               <div className="relative z-10">
                   <h1 className="text-3xl font-bold text-white mb-2">Admin Command Center</h1>
                   <p className="text-gray-400">Manage registrations, verify payments, and oversee the void.</p>
               </div>
               <ShieldAlert className="absolute right-[-20px] top-[-20px] w-40 h-40 text-red-500/10 rotate-12" />
           </div>

           <CommandCenter teams={pendingTeams || []} />
       </div>
    )
  }

  // --- STATE A: NEW USER (No Registration) ---
  if (state === 'NEW') {
    return (
      <div className="space-y-6">
         <div className="bg-gradient-to-r from-[#00f0ff]/10 to-purple-500/10 border border-[#00f0ff]/20 p-8 rounded-2xl text-center">
             <h1 className="text-3xl font-bold text-white mb-4">Welcome to <span className="text-[#00f0ff]">Hacksavvy 2.0</span></h1>
             <p className="text-gray-400 max-w-lg mx-auto mb-8">
                Your journey into the Liquid Void begins here. Assemble your team and register to secure your spot.
             </p>
         </div>

         {/* Render Registration Form directly or a CTA to open it */}
         <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
             <RegistrationForm user={user} />
         </div>
      </div>
    )
  }

  // --- STATE E: REJECTED ---
  if (state === 'REJECTED') {
      return (
          <div className="space-y-6">
             <div className="bg-red-900/20 border border-red-500/50 p-6 rounded-2xl flex items-start gap-4">
                 <ShieldAlert className="w-8 h-8 text-red-500 shrink-0" />
                 <div>
                     <h2 className="text-xl font-bold text-white mb-2">Registration Issue</h2>
                     <p className="text-gray-300 mb-4">
                         Your payment verification was rejected or there was an issue with your application.
                         Please review your details and re-upload the payment screenshot.
                     </p>
                 </div>
             </div>

             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                 <h3 className="text-lg font-bold text-[#00f0ff] mb-4">Update Application</h3>
                 <RegistrationForm user={user} initialData={team} />
             </div>
          </div>
      )
  }

  // --- STATE B: PENDING ---
  if (state === 'PENDING') {
      return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
              <div className="w-24 h-24 rounded-full bg-yellow-500/10 flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full border border-yellow-500/30 animate-ping opacity-20" />
                  <Clock className="w-10 h-10 text-yellow-500" />
              </div>
              
              <div className="max-w-md space-y-2">
                  <h1 className="text-2xl font-bold text-white">Application Received</h1>
                  <p className="text-gray-400">
                      We are currently verifying your payment of <span className="text-white font-mono">₹{team?.transaction_id}</span> for team <span className="text-[#00f0ff]">{team?.team_name}</span>.
                  </p>
                  <p className="text-sm text-gray-500 pt-4">
                      This usually takes 24-48 hours. Watch your email.
                  </p>
              </div>

              {/* Edit Application Button (Optional - implementation complex with current form structure, skipping for simplicity unless requested) */}
              <button className="px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 text-sm transition">
                  Contact Support if urgent
              </button>
          </div>
      )
  }

  // --- STATE C: VERIFIED ---
  if (state === 'VERIFIED') {
      return (
          <div className="space-y-8">
              {/* Status Header */}
              <div className="bg-gradient-to-r from-green-900/20 to-black border border-green-500/20 p-8 rounded-2xl relative overflow-hidden group">
                   <div className="relative z-10 flex items-center gap-6">
                       <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                           <CheckCircle2 className="w-8 h-8 text-green-400" />
                       </div>
                       <div>
                           <h1 className="text-3xl font-bold text-white mb-1">System Verified</h1>
                           <p className="text-green-400/80 font-mono">ACCESS_GRANTED: TEAM_{team?.team_name?.toUpperCase()}</p>
                       </div>
                   </div>
                   {/* Decorative glow */}
                   <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-green-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              </div>

              {/* Hacker Kit Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  {/* Ticket Card */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#00f0ff]/30 transition group">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                          <Ticket className="w-6 h-6 text-purple-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Event Ticket</h3>
                      <p className="text-sm text-gray-400 mb-4">You are confirmed for the {team?.track} track.</p>
                      <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded text-sm transition">
                          Download Ticket
                      </button>
                  </div>

                  {/* Discord Card */}
                  <div className="bg-[#5865F2]/10 border border-[#5865F2]/20 rounded-xl p-6 hover:border-[#5865F2]/50 transition group">
                      <div className="w-12 h-12 bg-[#5865F2]/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                          <svg className="w-6 h-6 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor">
                             <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037 12.12 12.12 0 0 0-1.01 2.053 19.827 19.827 0 0 0-4.685 0 12.14 12.14 0 0 0-1.016-2.053.076.076 0 0 0-.078-.035 19.794 19.794 0 0 0-4.885 1.515.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                          </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Join Discord</h3>
                      <p className="text-sm text-gray-400 mb-4">Connect with other hackers and mentors.</p>
                      <Link href="#" className="block w-full text-center py-2 bg-[#5865F2] hover:bg-[#4752c4] text-white rounded text-sm transition font-bold">
                          Join Server
                      </Link>
                  </div>
              </div>
          </div>
      )
  }

  return <div>State Unknown</div>
}
