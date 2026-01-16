'use client'

import { motion } from 'framer-motion'

import Image from 'next/image'
import { SPONSORS } from '@/lib/constants'

// Duplicate for continuous loop
const marqueeSponsors = [...SPONSORS, ...SPONSORS, ...SPONSORS, ...SPONSORS]

export default function SponsorsMarquee() {
  return (
    <div className="relative w-full py-10 overflow-hidden bg-black/50 border-y border-white/5">
      {/* Edges Fade */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

      <motion.div
        animate={{ x: "-50%" }}
        transition={{ 
          duration: 30, 
          ease: "linear", 
          repeat: Infinity 
        }}
        className="flex gap-16 items-center w-max px-16"
      >
        {marqueeSponsors.map((src, i) => {
            // Fix path if it starts with /public (common user mistake when defining constants)
            const cleanSrc = src.replace('/public', '')
            return (
                <div key={i} className="relative w-32 h-16 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                    <Image
                        src={cleanSrc} 
                        alt={`Sponsor ${i}`}
                        fill
                        className="object-contain"
                    />
                </div>
            )
        })}
      </motion.div>
    </div>
  )
}
