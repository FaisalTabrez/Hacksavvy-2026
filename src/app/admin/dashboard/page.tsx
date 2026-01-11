import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { ADMIN_EMAILS } from '@/lib/constants'
import CommandCenter from '@/components/dashboard/CommandCenter'
import { ShieldAlert, Activity, Users, CreditCard } from 'lucide-react'

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || !user.email || !ADMIN_EMAILS.includes(user.email)) {
    redirect('/dashboard')
  }

  // Fetch all teams
  const { data: teams, error } = await supabase.from('teams').select('*').order('created_at', { ascending: false })

  if (error) {
    return <div className="p-8 text-red-500">Failed to load teams: {error.message}</div>
  }

  const stats = {
    total: teams?.length || 0,
    pending: teams?.filter(t => t.payment_status === 'pending').length || 0,
    verified: teams?.filter(t => t.payment_status === 'verified').length || 0,
    rejected: teams?.filter(t => t.payment_status === 'rejected').length || 0,
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-900/40 to-black border border-red-500/20 p-8 rounded-3xl relative overflow-hidden">
            <div className="relative z-10">
                <h1 className="text-4xl font-bold text-white mb-2">Command Center</h1>
                <p className="text-gray-400">Oversee the application influx. Verify payments. Maintain order.</p>
            </div>
            <ShieldAlert className="absolute right-[-20px] top-[-20px] w-64 h-64 text-red-500/10 rotate-12" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-between hover:bg-white/10 transition">
                <Users className="w-8 h-8 text-purple-400 mb-4" />
                <div>
                   <div className="text-3xl font-bold text-white">{stats.total}</div>
                   <div className="text-xs text-gray-400 uppercase tracking-widest">Total Teams</div>
                </div>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 p-6 rounded-2xl flex flex-col justify-between">
                <Activity className="w-8 h-8 text-yellow-400 mb-4" />
                <div>
                   <div className="text-3xl font-bold text-white">{stats.pending}</div>
                   <div className="text-xs text-yellow-200/60 uppercase tracking-widest">Pending Review</div>
                </div>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-2xl flex flex-col justify-between">
                <CreditCard className="w-8 h-8 text-green-400 mb-4" />
                <div>
                   <div className="text-3xl font-bold text-white">{stats.verified}</div>
                   <div className="text-xs text-green-200/60 uppercase tracking-widest">Verified Paid</div>
                </div>
            </div>
             <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl flex flex-col justify-between">
                <ShieldAlert className="w-8 h-8 text-red-400 mb-4" />
                <div>
                   <div className="text-3xl font-bold text-white">{stats.rejected}</div>
                   <div className="text-xs text-red-200/60 uppercase tracking-widest">Rejected</div>
                </div>
            </div>
        </div>

        {/* Main Interface */}
        <div className="bg-black border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-red-500" />
                Latest Applications
            </h2>
            <CommandCenter teams={teams || []} />
        </div>
    </div>
  )
}