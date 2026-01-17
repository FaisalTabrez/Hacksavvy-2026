import React from "react";
import { BadgeCheck, Clock, Layers, Users, LogOut, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";
import { createClient } from "@/utils/supabase/client"; // For logout button if client-side or use server action
import { redirect } from "next/navigation";
import Image from "next/image";

// Define the Team Data Interface based on your DB Schema
interface TeamData {
  id: string;
  team_name: string;
  track: string;
  payment_status: "pending" | "verified" | "rejected";
  members_data: Array<{
    name: string;
    email: string;
    phone: string;
    role?: string; // If you have roles
  }>;
  // Add other fields if needed
}

interface MyTeamViewProps {
  team: TeamData;
  currentUserEmail?: string; 
}

export default function MyTeamView({ team }: MyTeamViewProps) {
  
  const isVerified = team.payment_status === "verified";
  const isRejected = team.payment_status === "rejected";
  const isPending = team.payment_status === "pending";

  let statusColor = "text-yellow-400 border-yellow-400/20 bg-yellow-400/10";
  let StatusIcon = Clock;
  let statusText = "Pending Verification";

  if (isVerified) {
    statusColor = "text-green-400 border-green-400/20 bg-green-400/10";
    StatusIcon = BadgeCheck;
    statusText = "Registration Verified";
  } else if (isRejected) {
    statusColor = "text-red-500 border-red-500/20 bg-red-500/10";
    StatusIcon = AlertTriangle;
    statusText = "Registration Rejected";
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* HEADER CARD */}
      <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
            <ShieldCheck className="w-32 h-32 text-red-500 rotate-12" />
        </div>
        
        <div className="relative z-10">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${statusColor} mb-6`}>
                <StatusIcon className="w-4 h-4" />
                <span className="text-sm font-bold uppercase tracking-wider">{statusText}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white mb-2 uppercase tracking-tight">
                My Team: <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">{team.team_name}</span>
            </h1>
            <p className="text-gray-400 font-mono text-sm max-w-xl">
               ID: <span className="text-white/60 select-all">{team.id}</span>
            </p>
        </div>
      </div>

      {/* DETAILS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* TRACK INFO */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-red-500/30 transition-colors group">
              <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-red-500/10 rounded-lg text-red-500 group-hover:scale-110 transition-transform">
                      <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Selected Track</h3>
              </div>
              <p className="text-2xl font-mono text-gray-200">{team.track}</p>
          </div>

          {/* PROJECT INFO (Placeholder if not in DB yet) */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-red-500/30 transition-colors group">
              <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Project Status</h3>
              </div>
              <p className="text-2xl font-mono text-gray-200">
                  {/* Assuming project title might be added later or part of registration? Using placeholder based on context */}
                  TBD / Active
              </p>
          </div>
      </div>

      {/* MEMBERS LIST */}
      <div className="bg-black/20 border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-3">
                  <Users className="text-red-500 w-5 h-5" />
                  <h3 className="text-xl font-bold text-white">Squad Members</h3>
              </div>
              <span className="text-xs font-mono text-gray-500">{team.members_data.length} / 5</span>
          </div>
          
          <div className="p-2">
            {team.members_data.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center text-gray-400 font-bold">
                            {index + 1}
                        </div>
                        <div>
                            <p className="text-white font-medium">{member.name}</p>
                            <p className="text-sm text-gray-500">{member.email}</p>
                        </div>
                    </div>
                    {/* Leader Badge - Assuming first member is leader or handle logic */}
                    {index === 0 && (
                        <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/20">
                            LEADER
                        </span>
                    )}
                </div>
            ))}
          </div>
      </div>

      {/* COORDINATORS INFO */}
      <div className="bg-gradient-to-r from-gray-900 to-black border border-white/10 p-6 rounded-2xl">
         <h4 className="text-gray-400 uppercase text-xs font-bold tracking-widest mb-4">Event Coordinators</h4>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                 <div>
                     <p className="text-white text-sm font-medium">Dr. Alan Grant</p>
                     <p className="text-xs text-gray-500">Faculty Coordinator</p>
                 </div>
             </div>
             <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                 <div>
                     <p className="text-white text-sm font-medium">Ellie Sattler</p>
                     <p className="text-xs text-gray-500">Student Lead</p>
                 </div>
             </div>
         </div>
      </div>

      {/* LOGOUT BUTTON - Server Action Form */}
      <form action="/auth/signout" method="post" className="flex justify-center pt-8 pb-4">
          <button 
            type="submit"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 px-6 py-2 rounded-full hover:bg-white/5"
          >
              <LogOut className="w-4 h-4" />
              Sign Out
          </button>
      </form>

    </div>
  );
}
