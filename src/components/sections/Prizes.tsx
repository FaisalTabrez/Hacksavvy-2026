'use client'

import { motion } from 'framer-motion'
import { Trophy, Medal, Crown } from 'lucide-react'

// Data Configuration
const PRIZES = [
  {
    id: 2,
    rank: "Runner Up",
    place: "2ND PLACE",
    amount: "₹30,000",
    desc: "Silver Medalist",
    icon: Medal,
    color: "text-gray-300",
    glow: "group-hover:shadow-[0_0_30px_-5px_rgba(200,200,200,0.3)]",
    delay: 0.2
  },
  {
    id: 1,
    rank: "Grand Winner",
    place: "1ST PLACE",
    amount: "₹50,000",
    desc: "The Grand Winner + Trophy",
    icon: Trophy,
    color: "text-amber-400",
    glow: "shadow-[0_0_50px_-10px_rgba(239,68,68,0.4)]",
    isHero: true,
    delay: 0
  },
  {
    id: 3,
    rank: "Second Runner Up",
    place: "3RD PLACE",
    amount: "₹20,000",
    desc: "Bronze Medalist",
    icon: Medal,
    color: "text-amber-700",
    glow: "group-hover:shadow-[0_0_30px_-5px_rgba(180,83,9,0.3)]",
    delay: 0.3
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
}

export default function Prizes() {
  return (
    <section className="relative w-full py-24 bg-black overflow-hidden" id="prizes">
      {/* Background Ambience - Subtle Grid or Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-red-950/20 via-black to-black pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 space-y-16">
        
        {/* 1. Section Header */}
        <div className="text-center space-y-6">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter"
          >
            Prizes
          </motion.h2>

          {/* Corrected Pill Banner */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center"
          >
            <div className="bg-red-900/10 border border-red-500/30 rounded-full px-8 py-3 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(220,38,38,0.2)]">
                <span className="text-xl md:text-2xl font-bold text-red-200 tracking-tight flex items-center gap-2">
                   <Crown className="w-5 h-5 text-neon-red fill-red-500/20" />
                   Total Pool: ₹2.5 Lakhs+
                </span>
            </div>
          </motion.div>
        </div>

        {/* 2. Glass Cards Layout (Podium Style) */}
        <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end"
        >
            {/* Logic: We map through PRIZES array. 
                For Desktop Podium (2-1-3), we can just use order classes if we want simple mapping, 
                or manually place them. Let's manually place to ensure styling accuracy.
            */}
            
            {/* --- 2nd Place (Left) --- */}
            <Card 
                data={PRIZES[0]} 
                order="order-2 md:order-1" 
                height="h-[380px]"
            />

            {/* --- 1st Place (Center - Hero) --- */}
            <Card 
                data={PRIZES[1]} 
                order="order-1 md:order-2" 
                height="h-[440px]" 
                isHero={true}
            />

            {/* --- 3rd Place (Right) --- */}
            <Card 
                data={PRIZES[2]} 
                order="order-3 md:order-3" 
                height="h-[380px]"
            />
        </motion.div>
      </div>
    </section>
  )
}

// Reusable Glass Card Component
function Card({ data, order, height, isHero = false }: { data: any, order: string, height: string, isHero?: boolean }) {
    const Icon = data.icon

    return (
        <motion.div 
            variants={item}
            className={`
                relative ${order} col-span-1 w-full rounded-3xl overflow-hidden group transition-all duration-500
                ${isHero 
                    ? 'bg-gradient-to-b from-red-950/40 via-neutral-950/80 to-black border border-red-500/40 shadow-[0_0_40px_-5px_rgba(220,38,38,0.3)] z-10' 
                    : 'bg-white/5 backdrop-blur-sm border border-white/5 hover:border-red-500/40 hover:-translate-y-2 hover:shadow-[0_0_30px_-10px_rgba(220,38,38,0.2)]'
                }
                ${height} flex flex-col items-center justify-between p-8
            `}
        >
            {/* Inner Glow for Hero */}
            {isHero && (
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-red-600/10 to-transparent pointer-events-none" />
            )}

            {/* Top Badge */}
            <div className="relative z-10 mt-2">
                <span className={`
                    inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg
                    ${isHero 
                        ? 'bg-neon-red text-black shadow-red-500/20' 
                        : 'bg-neutral-800 text-neutral-400 border border-white/10 group-hover:bg-red-950/30 group-hover:text-red-400 transition-colors'
                    }
                `}>
                   {isHero && <Trophy className="w-3 h-3 mr-2" />}
                   {data.place}
                </span>
            </div>

            {/* Floating Icon Container */}
            <div className={`
                relative z-10 p-6 rounded-full border flex items-center justify-center transition-transform duration-500 group-hover:scale-110
                ${isHero
                    ? 'bg-gradient-to-b from-red-900/20 to-black border-red-500/30 shadow-[0_0_30px_rgba(220,38,38,0.2)]'
                    : 'bg-white/5 border-white/10 group-hover:border-red-500/20 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.15)]'
                }
            `}>
                <Icon 
                    className={`
                        ${isHero ? 'w-16 h-16 text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.6)]' : `w-12 h-12 ${data.color} opacity-80 group-hover:opacity-100`}
                    `} 
                    strokeWidth={1.5}
                />
            </div>

            {/* Content Info */}
            <div className="relative z-10 text-center space-y-2 mb-4">
                <h3 className={`
                    font-black tracking-tighter text-white
                    ${isHero ? 'text-5xl md:text-6xl drop-shadow-xl' : 'text-4xl md:text-5xl opacity-90'}
                `}>
                    {data.amount}
                </h3>
                <p className={`
                    font-medium text-sm tracking-widest uppercase
                    ${isHero ? 'text-red-200' : 'text-neutral-500 group-hover:text-red-200/70 transition-colors'}
                `}>
                    {data.desc}
                </p>
            </div>
            
        </motion.div>
    )
}
