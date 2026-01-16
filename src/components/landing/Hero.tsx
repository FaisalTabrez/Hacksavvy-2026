'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Ticket, ArrowRight, Calendar, MapPin } from 'lucide-react'
import RetroGrid from '@/components/ui/RetroGrid'

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black">
      
      {/* Background Grid */}
      <RetroGrid />

      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 opacity-50">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-red/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-deep-crimson/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neon-red/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1 mb-8 rounded-full bg-red-950/30 border border-red-500/20 text-sm font-mono text-neon-red shadow-[0_0_15px_rgba(255,42,42,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Registration Ends Soon
          </span>

          {/* Main Title */}
          <h1 className="text-6xl md:text-9xl font-black font-heading tracking-tighter text-white mb-6 leading-none">
            HACK<span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-red to-deep-crimson drop-shadow-[0_0_20px_rgba(220,38,38,0.5)]">SAVVY</span>
            <br />
            <span className="text-4xl md:text-8xl text-white/10 absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 blur-sm select-none">
              -26
            </span>
            <span className="text-white text-5xl md:text-8xl">-26</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl font-light text-gray-300 max-w-2xl mx-auto mb-10 font-sans leading-relaxed">
            <span className="text-neon-red font-bold">Ideate. Innovate. Inspire.</span> <br/>
            Step into the void and build the future of technology.
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-gray-400 font-mono text-sm">
             <div className="flex items-center gap-2">
                 <Calendar className="w-4 h-4 text-neon-red" />
                 <span>Feb 12-13, 2026</span>
             </div>
             <div className="w-px h-4 bg-white/20 hidden md:block" />
             <div className="flex items-center gap-2">
                 <MapPin className="w-4 h-4 text-neon-red" />
                 <span>MGIT, Hyderabad</span>
             </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link 
              href="/register"
              className="group relative px-8 py-4 bg-neon-red text-white font-bold rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,42,42,0.5)]"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center gap-2">
                 Register Team <ArrowRight size={18} />
              </span>
            </Link>
            
            <Link 
              href="#about"
              className="px-8 py-4 bg-white/5 border border-white/10 text-white hover:bg-white/10 font-bold rounded-xl transition-all"
            >
              Learn More
            </Link>
          </div>

        </motion.div>
      </div>

      {/* Grid Floor Effect - REMOVED, Replaced by RetroGrid component above */}
      {/* <div className="absolute bottom-0 w-full h-[300px] ..." /> */}

    </section>
  )
}