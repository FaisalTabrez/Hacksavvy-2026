
'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import RegistrationForm from '@/components/RegistrationForm'
import MyTeamView from '@/components/dashboard/MyTeamView'

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createClient()

  // 1. Get Current User
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/login')
  }

  // 2. Query Database for Team
  // Check if user is a leader
  const { data: team, error: teamError } = await supabase
    .from('teams')
    .select('*')
    .eq('leader_user_id', user.id)
    .single()

  // Note: To handle members who are NOT leaders, we would need to search the 'members_data' JSONB column 
  // or a separate 'members' junction table. For this version, we assume Leader logic or extend later.

  // 3. Conditional Rendering
  
  // If Team Found
  if (team) {
    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
             <MyTeamView team={team} />
        </div>
    )
  }

  // If No Team -> Render Registration Form
  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
       <div className="bg-gradient-to-r from-red-500/10 to-purple-500/10 border border-red-500/20 p-8 rounded-2xl text-center backdrop-blur-sm">
           <h1 className="text-3xl font-bold text-white mb-4">Welcome to <span className="text-neon-red">Hacksavvy 2026</span></h1>
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

