'use client'

import { useState } from 'react'
import { Check, X, Eye, Loader2, ExternalLink } from 'lucide-react'
import { approvePayment, rejectPayment } from '@/app/dashboard/actions'

interface Team {
  id: string
  team_name: string
  leader_user_id: string 
  track: string
  payment_screenshot_url: string
  transaction_id: string
  created_at: string
  payment_status: string
  members_data: any[] // JSON
}

export default function CommandCenter({ teams: initialTeams }: { teams: Team[] }) {
  const [teams, setTeams] = useState<Team[]>(initialTeams)
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [processing, setProcessing] = useState<string | null>(null) // teamId being processed

  const handleApprove = async (team: Team) => {
    if(!confirm(`Approve team "${team.team_name}"? This will send a confirmation email.`)) return;
    
    setProcessing(team.id)
    try {
      // Need leader email/name. We stored it in members_data[0] (Leader is usually first)
      const leader = team.members_data.find((m: any) => m.role === 'leader') || team.members_data[0] // Fallback
      
      const res = await approvePayment(
          team.id, 
          team.team_name, 
          team.track, 
          leader?.email || "unknown@example.com", // Fallback if data structure varies
          leader?.name || "Hacker"
      )

      if (res.success) {
        setTeams(teams.filter(t => t.id !== team.id)) // Remove from list
        setSelectedTeam(null)
      } else {
        alert("Error approving: " + res.error)
      }
    } finally {
      setProcessing(null)
    }
  }

  const handleReject = async (team: Team) => {
     if(!confirm(`Reject team "${team.team_name}"? This will notify them to re-upload.`)) return;
      
     setProcessing(team.id)
     try {
       const leader = team.members_data?.find((m: any) => m.role === 'leader') || team.members_data?.[0]
       
       const res = await rejectPayment(
           team.id,
           leader?.email || "unknown@example.com",
           leader?.name || "Hacker",
           "Payment screenshot was unclear or transaction ID could not be verified." 
       )
 
       if (res.success) {
         setTeams(teams.filter(t => t.id !== team.id))
         setSelectedTeam(null)
       } else {
         alert("Error rejecting: " + res.error)
       }
     } finally {
       setProcessing(null)
     }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Command Center
         </h2>
         <span className="bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-xs font-mono border border-red-500/20">
            ADMIN ACCESS ONLY
         </span>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-black/40 text-gray-200 uppercase font-mono text-xs">
              <tr>
                <th className="p-4">Team</th>
                <th className="p-4">Track</th>
                <th className="p-4">Transaction ID</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {teams.length === 0 ? (
                <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500">
                        No pending approvals. The Void is quiet.
                    </td>
                </tr>
              ) : (
                teams.map((team) => (
                  <tr key={team.id} className="hover:bg-white/5 transition">
                    <td className="p-4 font-medium text-white">{team.team_name}</td>
                    <td className="p-4">
                        <span className="px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs border border-blue-500/20">
                            {team.track}
                        </span>
                    </td>
                    <td className="p-4 font-mono">{team.transaction_id}</td>
                    <td className="p-4 text-right">
                       <button 
                         onClick={() => setSelectedTeam(team)}
                         className="p-2 hover:bg-[#00f0ff]/10 text-[#00f0ff] rounded transition"
                         title="Inspect"
                       >
                         <Eye className="w-4 h-4" />
                       </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal / Dialog */}
      {selectedTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
           <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl shadow-[#00f0ff]/10">
              
              {/* Left: Screenshot */}
              <div className="md:w-1/2 p-6 bg-black/50 border-r border-white/10 flex flex-col items-center justify-center">
                  <h3 className="text-gray-400 text-xs uppercase tracking-widest mb-4">Payment Proof</h3>
                  {selectedTeam.payment_screenshot_url ? (
                     <div className="relative w-full aspect-[9/16] md:aspect-square bg-gray-900 rounded-lg overflow-hidden border border-white/5 group">
                        <img 
                          src={selectedTeam.payment_screenshot_url} 
                          alt="Proof" 
                          className="w-full h-full object-contain"
                        />
                        <a 
                          href={selectedTeam.payment_screenshot_url} 
                          target="_blank"
                          rel="noreferrer"
                          className="absolute bottom-4 right-4 p-2 bg-black text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                        >
                            <ExternalLink className="w-4 h-4" />
                        </a>
                     </div>
                  ) : (
                      <div className="text-red-500">No Image Uploaded</div>
                  )}
              </div>

              {/* Right: Details & Actions */}
              <div className="md:w-1/2 p-6 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-1">{selectedTeam.team_name}</h2>
                        <p className="text-gray-400 text-sm">Track: <span className="text-[#00f0ff]">{selectedTeam.track}</span></p>
                      </div>
                      <button onClick={() => setSelectedTeam(null)} className="text-gray-500 hover:text-white">
                        <X className="w-6 h-6" />
                      </button>
                  </div>

                  <div className="space-y-4 flex-1 overflow-y-auto mb-6">
                      <div className="p-4 bg-white/5 rounded-lg">
                          <p className="text-xs text-gray-500 uppercase mb-2">Team Details</p>
                          {selectedTeam.members_data.map((m:any, i:number) => (
                             <div key={i} className="mb-2 text-sm">
                                <span className={i===0 ? "text-[#00f0ff] font-bold" : "text-gray-300"}>
                                    {m.name}
                                </span>
                                <span className="text-gray-500 text-xs ml-2">({m.role || (i===0 ? 'Leader' : 'Member')})</span>
                                <div className="text-xs text-gray-600 pl-2">
                                    {m.college} • {m.phone}
                                </div>
                             </div>
                          ))}
                      </div>

                       <div className="p-4 bg-white/5 rounded-lg">
                          <p className="text-xs text-gray-500 uppercase mb-2">Transaction</p>
                          <p className="font-mono text-lg text-yellow-400">{selectedTeam.transaction_id}</p>
                      </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-auto">
                     <button 
                       onClick={() => handleReject(selectedTeam)}
                       className="py-3 rounded-lg border border-red-500/50 text-red-500 hover:bg-red-500/10 font-bold transition flex items-center justify-center gap-2"
                     >
                        <X className="w-4 h-4" /> Reject
                     </button>
                     <button 
                       onClick={() => handleApprove(selectedTeam)}
                       disabled={!!processing}
                       className="py-3 rounded-lg bg-[#00f0ff] text-black font-bold hover:bg-[#00c0cc] transition flex items-center justify-center gap-2 disabled:opacity-50"
                     >
                        {processing === selectedTeam.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Check className="w-4 h-4" /> 
                        )}
                        Approve
                     </button>
                  </div>
              </div>
           </div>
        </div>
      )}
    </div>
  )
}
