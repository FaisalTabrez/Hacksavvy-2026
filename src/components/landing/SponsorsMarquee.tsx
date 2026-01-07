'use client'

import { motion } from 'framer-motion'

const sponsors = [
  "Google", "Microsoft", "GitHub", "Vercel", "Supabase", "Clerk", 
  "Notion", "Figma", "OpenAI", "Anthropic", "Polygon" // Placeholders
]

export default function SponsorsMarquee() {
  return (
    <div className="relative w-full overflow-hidden py-10 bg-black/20 backdrop-blur-sm border-y border-white/5">
      
      {/* Fade Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

      <div className="flex">
        <motion.div
          animate={{ x: "-100%" }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex gap-16 pr-16 whitespace-nowrap"
        >
          {[...sponsors, ...sponsors].map((sponsor, idx) => (
            <div 
              key={`${sponsor}-${idx}`} 
              className="text-2xl font-bold text-gray-600 hover:text-white transition-colors cursor-pointer grayscale hover:grayscale-0"
            >
              {sponsor.toUpperCase()}
            </div>
          ))}
        </motion.div>
        
        {/* Duplicate for seamless loop (if needed by width, usually handled by map) */}
        <motion.div
          animate={{ x: "-100%" }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex gap-16 pr-16 whitespace-nowrap absolute left-full top-10"
        >
           {/* Secondary track handled by first flex if big enough, simple layout here */}
        </motion.div>
      </div>
    </div>
  )
}
