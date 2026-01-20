'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MoveRight } from 'lucide-react'
import { TRACKS_THEMES } from '@/lib/constants'

// Helper to map track titles to slugs
const getSlug = (title: string) => {
    switch (title) {
        case 'AI, Automation, Robotics & Drone Technology': return 'ai-automation';
        case 'Cybersecurity & Blockchain': return 'cybersecurity-blockchain';
        case 'IoT, VLSI & Embedded Systems': return 'iot-embedded';
        case 'Sustainability & Environment': return 'sustainability';
        case 'Open Innovation': return 'open-innovation';
        default: return '#';
    }
}

export default function TracksGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {TRACKS_THEMES.map((track, index) => {
        const slug = getSlug(track.title)
        
        return (
            <Link key={track.title} href={slug === '#' ? '#' : `/tracks/${slug}`} className="block h-full relative group">
                <motion.div
                whileHover={{ y: -10 }}
                className={`
                    relative p-6 rounded-2xl 
                    bg-white/5 backdrop-blur-lg border border-white/10
                    overflow-hidden group h-64 flex flex-col justify-end
                    cursor-pointer
                `}
                >
                {/* Background Image (Darkened) */}
                <div className="absolute inset-0 z-0">
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
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out border border-red-500/50 rounded-2xl">
                     <MoveRight className="w-6 h-6 mb-2 text-white" />
                     <p className="text-red-500 font-bold font-grotesk text-center px-4">
                        Click here to view Problem Statements
                     </p>
                </div>

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
            </Link>
        )
      })}
    </div>
  )
}
