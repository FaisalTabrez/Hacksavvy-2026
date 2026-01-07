'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
// Components
import FloatingNav from '@/components/landing/FloatingNav'
import TracksGrid from '@/components/landing/TracksGrid'
import PrizesBento from '@/components/landing/PrizesBento'
import Timeline from '@/components/landing/Timeline'
import SponsorsMarquee from '@/components/landing/SponsorsMarquee'
import FaqAccordion from '@/components/landing/FaqAccordion'
import Link from 'next/link'
import About from '@/components/sections/About'

// Dynamic import for Heavy 3D component with explicit loading state to prevent hydration mismatch
const FluidBackground = dynamic(() => import('@/components/FluidBackground'), { 
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-[#0a0a0a] z-0" /> 
})

const SectionTitle = ({ children, id }: { children: React.ReactNode, id?: string }) => (
  <motion.h2 
    id={id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-4xl md:text-6xl font-black font-heading text-center mb-16 pt-20"
  >
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#00f0ff] to-[#7c3aed]">
      {children}
    </span>
  </motion.h2>
)

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#00f0ff]/30 pb-32 overflow-hidden">
      
      <FloatingNav />
      <FluidBackground />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Overlay Content */}
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block px-4 py-1 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-mono text-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.3)]">
              ⚡ 400+ Hackers Registered
            </span>
            <h1 className="text-6xl md:text-9xl font-black font-heading tracking-tighter text-white mb-6 drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
              HACKSAVVY
              <br />
              <span className="text-transparent bg-stroke text-white/90 drop-shadow-md">2026</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-gray-200 max-w-2xl mx-auto drop-shadow-lg font-sans">
              Enter the <span className="text-[#00f0ff] font-bold drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">Liquid Void</span>. 
              Build the future on February 12-13.
            </p>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-gray-500"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[#00f0ff] to-transparent" />
        </motion.div>
      </section>

      {/* About Section */}
      <About />

      {/* Tracks Section */}
      <section id="tracks" className="container mx-auto px-4 relative z-10">
        <SectionTitle>THE HOLO-DECK</SectionTitle>
        <TracksGrid />
      </section>

      {/* Prizes Section */}
      <section id="prizes" className="container mx-auto px-4 relative z-10">
        <SectionTitle>TROPHY CASE</SectionTitle>
        <PrizesBento />
      </section>

      {/* Timeline Section */}
      <section className="container mx-auto px-4 relative z-10">
        <SectionTitle>JOURNEY</SectionTitle>
        <Timeline />
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="relative z-10">
         <SectionTitle>ALLIES</SectionTitle>
         <SponsorsMarquee />
      </section>

      {/* FAQ Section */}
      <section id="faq" className="container mx-auto px-4 py-20 relative z-10">
        <SectionTitle>PROTOCOL</SectionTitle>
        <FaqAccordion />
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/50 backdrop-blur-xl mt-20">
        <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-bold font-heading">
            HACKSAVVY <span className="text-[#00f0ff]">2026</span>
          </div>
          <div className="flex gap-8 text-sm text-gray-500 font-mono">
            <Link href="/coc" className="hover:text-[#00f0ff] transition-colors">CODE OF CONDUCT</Link>
            <a href="#" className="hover:text-[#00f0ff] transition-colors">TERMS</a>
            <a href="#" className="hover:text-[#00f0ff] transition-colors">PRIVACY</a>
          </div>
          <div className="text-gray-600 text-sm">
            © 2026 Hacksavvy Inc.
          </div>
        </div>
      </footer>

    </main>
  )
}