'use client'

import { motion } from 'framer-motion'
import { Brain, Globe, Cpu, Lightbulb } from 'lucide-react'

const tracks = [
  {
    title: "AI & Machine Learning",
    description: "Build the next generation of intelligent systems.",
    icon: <Brain className="w-8 h-8 text-[#00f0ff]" />,
    gradient: "from-[#00f0ff]/20 to-transparent"
  },
  {
    title: "Web3 & Blockchain",
    description: "Decentralized applications and smart contracts.",
    icon: <Globe className="w-8 h-8 text-[#7c3aed]" />,
    gradient: "from-[#7c3aed]/20 to-transparent"
  },
  {
    title: "Internet of Things",
    description: "Connect the physical world with the digital.",
    icon: <Cpu className="w-8 h-8 text-[#00f0ff]" />,
    gradient: "from-[#00f0ff]/20 to-transparent"
  },
  {
    title: "Open Innovation",
    description: "Solve problems that matter to you.",
    icon: <Lightbulb className="w-8 h-8 text-[#7c3aed]" />,
    gradient: "from-[#7c3aed]/20 to-transparent"
  }
]

export default function TracksGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {tracks.map((track, index) => (
        <motion.div
          key={track.title}
          whileHover={{ y: -10 }}
          className={`
            relative p-6 rounded-2xl 
            bg-white/5 backdrop-blur-lg border border-white/10
            overflow-hidden group
          `}
        >
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${track.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          
          {/* Glowing Border Effect */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-[#00f0ff]/50 transition-all duration-300" />

          <div className="relative z-10 flex flex-col items-start gap-4">
            <div className="p-3 rounded-xl bg-black/50 border border-white/5">
              {track.icon}
            </div>
            
            <div>
              <h3 className="text-xl font-bold font-heading mb-2">{track.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {track.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
