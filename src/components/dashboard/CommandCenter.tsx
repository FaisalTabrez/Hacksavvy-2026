'use client'

import { useState, useMemo } from 'react'
import { Check, X, Eye, Loader2, ExternalLink, FileSpreadsheet, Users, Clock, CheckCircle, XCircle } from 'lucide-react'
import { downloadTeamsCSV } from '@/utils/csv-exporter'
import { createClient } from '@/utils/supabase/client'

interface Team {
  id: string
  team_id?: string // Custom ID
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
  const [isExporting, setIsExporting] = useState(false)
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'PENDING' | 'VERIFIED' | 'REJECTED'>('ALL')

  const stats = useMemo(() => {
    return {
      all: teams.length,
      pending: teams.filter(t => (t.payment_status || 'pending').toLowerCase() === 'pending').length,
      verified: teams.filter(t => t.payment_status === 'verified').length,
      rejected: teams.filter(t => t.payment_status === 'rejected').length
    }
  }, [teams])

  const filteredTeams = useMemo(() => {
    if (activeFilter === 'ALL') return teams;
    return teams.filter(t => (t.payment_status || 'pending').toLowerCase() === activeFilter.toLowerCase())
  }, [teams, activeFilter])

  const handleExport = async () => {
      setIsExporting(true)
      try {
          // Fetch complete dataset for export, not just what's in view (which might be filtered)
          const supabase = createClient()
          const { data: allTeams, error } = await supabase
            .from('teams')
            .select('*')
            .order('created_at', { ascending: false })
          
          if (error) {
              alert('Export failed: ' + error.message)
          } else if (allTeams) {
              downloadTeamsCSV(allTeams)
          }
      } catch (err) {
          console.error(err)
          alert('Export error occurred')
      } finally {
          setIsExporting(false)
      }
  }

  const handleUpdateStatus = async (teamId: string, newStatus: string) => {
    setProcessing(teamId)
    // 1. Optimistic Update
    const previousTeams = [...teams]
    setTeams(prev => prev.map(t => t.id === teamId ? { ...t, payment_status: newStatus } : t))

    try {
      const supabase = createClient()
      // 2. Database Update
      const { error } = await supabase
        .from('teams')
        .update({ payment_status: newStatus })
        .eq('id', teamId)

      if (error) throw error
      
      // Close modal if currently inspecting this team
      if (selectedTeam?.id === teamId) {
        setSelectedTeam(null)
      }

    } catch (error: any) {
      console.error('Update failed:', error)
      alert('Failed to update status: ' + error.message)
      // Revert optimistic update
      setTeams(previousTeams)
    } finally {
      setProcessing(null)
    }
  }

  const handleApprove = (team: Team) => {
    if(!confirm(`Approve team "${team.team_name}"?`)) return;
    handleUpdateStatus(team.id, 'verified')
  }

  const handleReject = (team: Team) => {
    if(!confirm(`Reject team "${team.team_name}"?`)) return;
    handleUpdateStatus(team.id, 'rejected')
  }

  const FilterCard = ({ type, count, icon: Icon, colorClass, activeClass }: any) => (
    <div 
      onClick={() => setActiveFilter(type)}
      className={`
        p-4 rounded-xl border cursor-pointer transition-all duration-200
        ${activeFilter === type 
          ? `bg-white/10 ${activeClass} translate-y-[-2px] shadow-lg` 
          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
        }
      `}
    >
      <div className="flex items-center justify-between mb-2">
        <span className={`text-sm font-medium ${activeFilter === type ? 'text-white' : 'text-gray-400'}`}>
          {type === 'ALL' ? 'Total Teams' : type}
        </span>
        <Icon className={`w-4 h-4 ${colorClass}`} />
      </div>
      <div className="text-2xl font-bold text-white">{count}</div>
      <div className={`h-1 w-full rounded-full mt-2 bg-gray-800 overflow-hidden`}>
          <div className={`h-full ${colorClass.replace('text-', 'bg-')} opacity-50`} style={{ width: stats.all ? `${(count / stats.all) * 100}%` : '0%' }}></div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Command Center
            </h2>
            <div className="flex items-center gap-3 mt-1">
                <span className="bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-xs font-mono border border-red-500/20">
                    ADMIN ACCESS ONLY
                </span>
                <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">
                   {filteredTeams.length} teams shown
                </span>
            </div>
         </div>

         <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-green-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
         >
             {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileSpreadsheet className="w-4 h-4" />}
             {isExporting ? 'Exporting...' : 'Export CSV'}
         </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <FilterCard 
            type="ALL" 
            count={stats.all} 
            icon={Users} 
            colorClass="text-blue-400"
            activeClass="border-blue-500/50 shadow-blue-500/10"
        />
        <FilterCard 
            type="PENDING" 
            count={stats.pending} 
            icon={Clock} 
            colorClass="text-yellow-400"
            activeClass="border-yellow-500/50 shadow-yellow-500/10"
        />
        <FilterCard 
            type="VERIFIED" 
            count={stats.verified} 
            icon={CheckCircle} 
            colorClass="text-green-400"
            activeClass="border-green-500/50 shadow-green-500/10"
        />
        <FilterCard 
            type="REJECTED" 
            count={stats.rejected} 
            icon={XCircle} 
            colorClass="text-red-400"
            activeClass="border-red-500/50 shadow-red-500/10"
        />
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm min-h-[400px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-black/40 text-gray-200 uppercase font-mono text-xs">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Team</th>
                <th className="p-4">Track</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredTeams.length === 0 ? (
                <tr>
                    <td colSpan={5} className="p-12 text-center text-gray-500">
                        No teams found for filter: <span className="text-white font-mono">{activeFilter}</span>
                    </td>
                </tr>
              ) : (
                filteredTeams.map((team) => (
                  <tr key={team.id} className="hover:bg-white/5 transition group">
                    <td className="p-4 font-mono text-neon-red font-bold group-hover:text-white transition-colors">
                        {team.team_id || '-'}
                    </td>
                    <td className="p-4">
                        <div className="font-medium text-white">{team.team_name}</div>
                        <div className="text-xs text-gray-500 leading-none mt-1">{team.leader_user_id.split('-')[0]}...</div>
                    </td>
                    <td className="p-4">
                        <span className="px-2 py-1 rounded-md bg-white/5 text-gray-300 text-xs border border-white/10 whitespace-nowrap">
                            {team.track}
                        </span>
                    </td>
                    <td className="p-4">
                         <span className={`
                            px-2 py-1 rounded text-xs font-bold uppercase tracking-wider
                            ${team.payment_status === 'verified' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                              team.payment_status === 'rejected' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                              'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}
                         `}>
                            {team.payment_status || 'PENDING'}
                         </span>
                    </td>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
           <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl shadow-[#00f0ff]/10">
              
              {/* Left: Screenshot */}
              <div className="md:w-1/2 p-6 bg-black/50 border-r border-white/10 flex flex-col items-center justify-center min-h-[300px]">
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
                          className="absolute bottom-4 right-4 p-2 bg-black text-white rounded-full opacity-0 group-hover:opacity-100 transition duration-200 transform translate-y-2 group-hover:translate-y-0"
                        >
                            <ExternalLink className="w-4 h-4" />
                        </a>
                     </div>
                  ) : (
                      <div className="text-red-500 border border-red-500/20 p-4 rounded bg-red-500/10">No Image Uploaded</div>
                  )}
              </div>

              {/* Right: Details & Actions */}
              <div className="md:w-1/2 p-6 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                             <h2 className="text-xl md:text-2xl font-bold text-white">{selectedTeam.team_name}</h2>
                             {selectedTeam.team_id && (
                                <span className="bg-red-500/20 text-red-500 text-xs px-2 py-1 rounded font-mono border border-red-500/30">
                                    {selectedTeam.team_id}
                                </span>
                             )}
                        </div>
                        <p className="text-gray-400 text-sm">Track: <span className="text-[#00f0ff]">{selectedTeam.track}</span></p>
                        <p className="text-xs text-gray-500 mt-1">
                            Status: <span className="uppercase text-white">{selectedTeam.payment_status || 'PENDING'}</span>
                        </p>
                      </div>
                      <button onClick={() => setSelectedTeam(null)} className="text-gray-500 hover:text-white transition">
                        <X className="w-6 h-6" />
                      </button>
                  </div>

                  <div className="space-y-4 flex-1 overflow-y-auto mb-6 pr-2">
                       <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                          <p className="text-xs text-gray-500 uppercase mb-3 font-semibold tracking-wider">Team Roster</p>
                          {selectedTeam.members_data.map((m:any, i:number) => (
                             <div key={i} className="mb-3 last:mb-0 text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0">
                                <div className="flex justify-between">
                                    <span className={i===0 ? "text-[#00f0ff] font-bold" : "text-gray-300"}>
                                        {m.name} {i===0 && '👑'}
                                    </span>
                                    <span className="text-gray-600 text-xs">{m.role || (i===0 ? 'Leader' : 'Member')}</span>
                                </div>
                                <div className="text-xs text-gray-500 mt-1 flex flex-col gap-0.5">
                                    <span>{m.college}</span>
                                    <span>{m.phone}</span>
                                    <span>{m.email}</span>
                                </div>
                             </div>
                          ))}
                      </div>

                       <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                          <p className="text-xs text-gray-500 uppercase mb-2 font-semibold tracking-wider">Transaction ID</p>
                          <div className="flex items-center gap-2">
                              <p className="font-mono text-lg text-yellow-400 truncate">{selectedTeam.transaction_id || 'N/A'}</p>
                          </div>
                      </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-auto">
                     <button 
                       onClick={() => handleReject(selectedTeam)}
                       disabled={!!processing || selectedTeam.payment_status === 'rejected'}
                       className="py-3 rounded-lg border border-red-500/50 text-red-500 hover:bg-red-500/10 font-bold transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                        <X className="w-4 h-4" /> Reject
                     </button>
                     <button 
                       onClick={() => handleApprove(selectedTeam)}
                       disabled={!!processing || selectedTeam.payment_status === 'verified'}
                       className="py-3 rounded-lg bg-[#00f0ff] text-black font-bold hover:bg-[#00c0cc] hover:shadow-lg hover:shadow-[#00f0ff]/20 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
