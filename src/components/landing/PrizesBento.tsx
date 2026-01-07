'use client'

import { motion } from 'framer-motion'
import { Trophy, Gift, Briefcase, Award } from 'lucide-react'

export default function PrizesBento() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto p-4">
      
      {/* Main Prize Pool - Spans 2 cols */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="md:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-[#00f0ff]/10 to-purple-900/20 border border-white/10 backdrop-blur-xl flex flex-col justify-between min-h-[300px]"
      >
        <div>
          <div className="flex items-center gap-2 text-[#00f0ff] mb-2">
            <Trophy className="w-5 h-5" />
            <span className="font-mono text-sm uppercase tracking-wider">Grand Prize Pool</span>
          </div>
          <h3 className="text-4xl md:text-6xl font-black font-heading text-white mb-4">
            ₹200,000
          </h3>
          <p className="text-gray-400 max-w-md">
            Cash prizes distributed across top 3 teams and category winners. 
            Take your project to the moon.
          </p>
        </div>
        <div className="mt-8 flex gap-2">
             <div className="h-1 w-20 bg-[#00f0ff]" />
             <div className="h-1 w-10 bg-[#7c3aed]" />
        </div>
      </motion.div>

      {/* Swag Kits */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col gap-4"
      >
        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
          <Gift size={24} />
        </div>
        <h4 className="text-xl font-bold">Premium Swag</h4>
        <p className="text-gray-400 text-sm">Hoodies, tees, and stickers for all participants.</p>
      </motion.div>

      {/* Internships */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col gap-4"
      >
        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
          <Briefcase size={24} />
        </div>
        <h4 className="text-xl font-bold">Career Growth</h4>
        <p className="text-gray-400 text-sm">Internship interviews with top sponsor companies.</p>
      </motion.div>

      {/* Certificates */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="md:col-span-2 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center gap-6"
      >
        <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#00f0ff]/10 flex items-center justify-center text-[#00f0ff]">
          <Award size={32} />
        </div>
        <div>
            <h4 className="text-xl font-bold mb-1">Blockchain Certificate</h4>
            <p className="text-gray-400 text-sm">Verifiable NFT certificates for every submitter.</p>
        </div>
      </motion.div>

    </div>
  )
}
