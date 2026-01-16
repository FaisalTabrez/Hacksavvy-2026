'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { TRACKS_THEMES } from '@/lib/constants'

export default function TracksGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {TRACKS_THEMES.map((track, index) => (
        <motion.div
          key={track.title}
          whileHover={{ y: -10 }}
          className={`
            relative p-6 rounded-2xl 
            bg-white/5 backdrop-blur-lg border border-white/10
            overflow-hidden group h-64 flex flex-col justify-end
          `}
        >
          {/* Background Image (Darkened) */}
          <div className="absolute inset-0 z-0">
             {/* Note: In a real app, use the actual image path. Using placeholder logic if invalid */}
             <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors z-10" />
             <Image 
               src={track.image} 
               alt={track.title}
               fill
               className="object-cover opacity-50 group-hover:scale-110 transition-transform duration-500"
             />
          </div>
          
          {/* Red Glow Border */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-neon-red/50 transition-all duration-300 z-20 pointer-events-none" />
          
          {/* Content */}
          <div className="relative z-20">
             <h3 className="text-2xl font-bold font-heading mb-2 text-white group-hover:text-neon-red transition-colors">
                 {track.title}
             </h3>
             <p className="text-gray-300 text-sm line-clamp-2">
                 {track.description}
             </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
