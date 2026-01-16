'use client'

import { motion } from 'framer-motion'
import { Trophy, Medal } from 'lucide-react'

// Data Configuration
const PRIZES = [
  {
    rank: "Grand Winner",
    place: "1ST PLACE",
    amount: "₹50,000",
    desc: "The Grand Winner",
    icon: Trophy,
    isGrand: true
  },
  {
    rank: "Runner Up",
    place: "2ND PLACE",
    amount: "₹30,000",
    desc: "Silver Medalist",
    icon: Medal,
    isGrand: false
  },
  {
    rank: "Second Runner Up",
    place: "3RD PLACE",
    amount: "₹20,000",
    desc: "Bronze Medalist",
    icon: Medal,
    isGrand: false
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
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Prizes() {
  return (
    <section className="relative w-full py-24 bg-black overflow-hidden" id="prizes">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-black to-black pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 space-y-12">
        
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

          {/* New Pill Banner */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center"
          >
            <div className="bg-white/5 border border-white/10 rounded-full px-6 py-2 backdrop-blur-sm">
                <span className="text-lg md:text-xl font-bold text-white tracking-tight">
                    Total Pool: <span className="text-neon-red">₹2.5 Lakhs+</span>
                </span>
            </div>
          </motion.div>
        </div>

        {/* 2. Bento Grid Layout */}
        <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
            {/* --- Grand Winner (Spans 3 cols) --- */}
            <motion.div 
                variants={item}
                className="col-span-1 md:col-span-3 relative h-[300px] md:h-[400px] overflow-hidden rounded-3xl group"
            >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-900/40 via-neutral-950 to-black" />
                
                {/* Content */}
                <div className="relative z-10 w-full h-full p-8 md:p-12 flex flex-col justify-between">
                    {/* Top Badge */}
                    <div>
                        <span className="inline-block bg-neon-red text-black font-bold text-xs md:text-sm px-3 py-1 rounded-full uppercase tracking-widest">
                            1ST PLACE
                        </span>
                    </div>

                    {/* Amount & Label */}
                    <div>
                        <h3 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-2">
                            ₹50,000
                        </h3>
                        <p className="text-neutral-400 font-medium uppercase tracking-widest text-sm md:text-base">
                            The Grand Winner
                        </p>
                    </div>
                </div>

                {/* Watermark Icon */}
                <Trophy 
                    strokeWidth={1}
                    className="absolute -bottom-4 -right-4 size-64 md:size-96 text-red-900/20 rotate-[-12deg] group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
            </motion.div>

            {/* --- Runner Up (2nd) --- */}
            <motion.div 
                variants={item}
                className="col-span-1 md:col-span-1.5 relative h-[250px] overflow-hidden rounded-3xl bg-neutral-900/50 group"
            >
                <div className="relative z-10 w-full h-full p-8 flex flex-col justify-between">
                     <span className="text-neutral-500 font-bold text-xs uppercase tracking-widest">
                        2ND PLACE
                    </span>
                    <div>
                        <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-1">
                            ₹30,000
                        </h3>
                        <p className="text-neutral-500 font-medium uppercase tracking-tight text-sm">
                            Runner Up
                        </p>
                    </div>
                </div>
                {/* Watermark */}
                <Medal 
                     strokeWidth={1}
                     className="absolute -bottom-8 -right-8 size-48 text-white/5 rotate-[-12deg] group-hover:rotate-0 transition-transform duration-500" 
                />
            </motion.div>

               {/* --- Runner Up (3rd) --- */}
               <motion.div 
                variants={item}
                className="col-span-1 md:col-span-1.5 relative h-[250px] overflow-hidden rounded-3xl bg-neutral-900/50 group"
            >
                <div className="relative z-10 w-full h-full p-8 flex flex-col justify-between">
                     <span className="text-neutral-500 font-bold text-xs uppercase tracking-widest">
                        3RD PLACE
                    </span>
                    <div>
                        <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-1">
                            ₹20,000
                        </h3>
                        <p className="text-neutral-500 font-medium uppercase tracking-tight text-sm">
                            Second Runner Up
                        </p>
                    </div>
                </div>
                {/* Watermark */}
                <Medal 
                     strokeWidth={1}
                     className="absolute -bottom-8 -right-8 size-48 text-white/5 rotate-[-12deg] group-hover:rotate-0 transition-transform duration-500" 
                />
            </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
