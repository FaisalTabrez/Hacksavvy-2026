import { createClient as createServerClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js' // Import createClient directly
import VerifyButton from './VerifyButton'
import Link from 'next/link'

// Hardcoded admin email (must match the one in actions.ts)
const ADMIN_EMAILS = ['faisaltabrez01@gmail.com']

export default async function AdminPage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  // 1. Security Check
  if (!user || !user.email || !ADMIN_EMAILS.includes(user.email)) {
    redirect('/')
  }

  // 2. Setup Admin Client with Service Role Key
  // This bypasses RLS policies
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return (
      <div className="p-8 text-red-500 bg-red-900/10 border border-red-500/20 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Configuration Error</h2>
        <p>The <code>SUPABASE_SERVICE_ROLE_KEY</code> is missing from your <code>.env.local</code> file.</p>
        <p className="mt-2 text-sm text-gray-400">Please go to your Supabase Dashboard {'>'} Project Settings {'>'} API, copy the &quot;service_role&quot; secret, and add it to your environment variables.</p>
      </div>
    )
  }

  // 3. Fetch all registrations using the admin client
  const { data: registrations, error } = await supabaseAdmin
    .from('registrations')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return <div className="p-8 text-red-500">Error fetching data: {error.message}</div>
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <div className="text-gray-400">
            Welcome, {user.user_metadata?.full_name || user.email}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/10 text-gray-300">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Track</th>
                <th className="p-4">Proof</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {registrations?.map((reg) => (
                <tr key={reg.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4">{reg.full_name}</td>
                  <td className="p-4 text-gray-400">{reg.email}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs">
                      {reg.track}
                    </span>
                  </td>
                  <td className="p-4">
                    {reg.screenshot_url ? (
                      <a 
                        href={reg.screenshot_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 underline text-sm"
                      >
                        View Screenshot
                      </a>
                    ) : (
                      <span className="text-gray-600 italic">No Upload</span>
                    )}
                  </td>
                  <td className="p-4">
                     <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                       reg.payment_status === 'verified' 
                         ? 'bg-green-500/20 text-green-400' 
                         : 'bg-yellow-500/20 text-yellow-500'
                     }`}>
                       {(reg.payment_status || 'pending').toUpperCase()}
                     </span>
                  </td>
                  <td className="p-4">
                    {reg.payment_status !== 'verified' && (
                      <VerifyButton id={reg.id} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {(!registrations || registrations.length === 0) && (
            <div className="p-8 text-center text-gray-500">
              No registrations found.
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
