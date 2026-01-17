'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronDown, Flag, Target, Box } from 'lucide-react'
import { useState } from 'react'
import { THEME_DETAILS } from '@/lib/problem-statements'

export default function TrackDetailsPage() {
  const params = useParams()
  const slug = params.slug as string
  const themeData = THEME_DETAILS[slug as keyof typeof THEME_DETAILS]

  if (!themeData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Track Not Found</h1>
            <Link href="/#tracks" className="text-neon-red hover:underline">
                Return to Tracks
            </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-white relative selection:bg-neon-red selection:text-black">
       
       {/* Global Background Layer */}
       <div className="fixed inset-0 z-[-1]">
        <Image
          src="/assets/redlines.jpg"
          alt="redlines background"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

       {/* Background Ambience */}
       <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black pointer-events-none z-0" />
       
       <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-20">
          
          {/* Navigation */}
          <Link 
            href="/#tracks" 
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-neon-red transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to All Tracks
          </Link>

          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 space-y-4"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-neon-red text-xs font-mono uppercase tracking-widest">
                Problem Statements
            </span>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight max-w-4xl bg-clip-text text-transparent bg-gradient-to-r from-white via-red-100 to-white">
                {themeData.title}
            </h1>
          </motion.div>

          {/* Problem Cards Grid */}
          <div className="grid gap-6">
            {themeData.problems.map((problem: any, index: number) => (
                <ProblemCard key={problem.id} problem={problem} index={index} />
            ))}
          </div>

        </div>
    </div>
  )
}

function ProblemCard({ problem, index }: { problem: any, index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`
            group relative w-full rounded-2xl border transition-all duration-300 overflow-hidden
            ${isExpanded 
                ? 'bg-white/10 border-red-500/50 shadow-[0_0_30px_-5px_rgba(220,38,38,0.2)]' 
                : 'bg-white/5 border-white/10 hover:border-red-500/30 hover:bg-white/5'
            }
        `}
    >
        {/* Card Header (Always Visible) */}
        <div 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-6 md:p-8 cursor-pointer flex flex-col md:flex-row md:items-start gap-6"
        >
            {/* ID Badge */}
            <div className="flex-shrink-0">
                <span className={`
                    font-mono font-bold text-lg px-4 py-2 rounded-lg border transition-colors
                    ${isExpanded 
                        ? 'bg-neon-red text-black border-neon-red' 
                        : 'bg-black/30 text-neon-red border-red-500/30 group-hover:border-neon-red'
                    }
                `}>
                    {problem.id}
                </span>
            </div>

            {/* Main Content */}
            <div className="flex-grow space-y-3">
                <h3 className="text-2xl md:text-3xl font-bold font-heading text-white">
                    {problem.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed text-sm md:text-base max-w-4xl">
                    {problem.statement}
                </p>

                {/* Expand Toggle Text */}
                <div className="flex items-center gap-2 text-sm font-medium text-neon-red mt-4 select-none">
                    <span>{isExpanded ? 'Hide Details' : 'View Objectives & Deliverables'}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
            </div>
        </div>

        {/* Expanded Content (Objectives & Deliverables) */}
        <AnimatePresence>
            {isExpanded && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="px-6 md:px-8 pb-8 pt-0 border-t border-white/5 grid md:grid-cols-2 gap-8 mt-6">
                        
                        {/* Objectives */}
                        <div className="space-y-4">
                            <h4 className="flex items-center gap-2 text-white font-bold uppercase tracking-wider text-sm">
                                <Target className="w-4 h-4 text-neon-red" />
                                Objectives
                            </h4>
                            <ul className="space-y-2">
                                {problem.objectives.map((obj: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-neutral-300">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                                        {obj}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Deliverables */}
                        <div className="space-y-4">
                            <h4 className="flex items-center gap-2 text-white font-bold uppercase tracking-wider text-sm">
                                <Box className="w-4 h-4 text-neon-red" />
                                Deliverables
                            </h4>
                            <ul className="space-y-2">
                                {problem.deliverables.map((del: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-neutral-300">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                                        {del}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
  )
}
