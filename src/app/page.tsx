'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
// Components
import Preloader from '@/components/ui/Preloader'
import Header from '@/components/layout/Header'
import Hero from '@/components/landing/Hero'
import TracksGrid from '@/components/landing/TracksGrid'
import PrizesBento from '@/components/landing/PrizesBento'
import Timeline from '@/components/sections/Timeline'
import SponsorsMarquee from '@/components/landing/SponsorsMarquee'
import FaqAccordion from '@/components/landing/FaqAccordion'
import About from '@/components/sections/About'
import Guidelines from '@/components/sections/Guidelines'
import MeetTheTeam from '@/components/sections/MeetTheTeam'
import Link from 'next/link'

const SectionTitle = ({ children, id }: { children: React.ReactNode, id?: string }) => (
  <motion.h2 
    id={id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-4xl md:text-6xl font-black font-heading text-center mb-16 pt-20"
  >
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-neon-red to-deep-crimson">
      {children}
    </span>
  </motion.h2>
)

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // Lock scroll when preloader is active
    if (showPreloader) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showPreloader]);

  return (
    <main className="min-h-screen text-white selection:bg-neon-red/30 pb-32 overflow-hidden bg-black">
      
      <AnimatePresence>
        {showPreloader && (
          <Preloader onComplete={() => setShowPreloader(false)} />
        )}
      </AnimatePresence>

      <Header />
      
      <Hero />

      {/* Content Sections */}
      <div className="relative z-20 space-y-32">
        
        <div id="about" className="container mx-auto px-4">
          <SectionTitle>THE MISSION</SectionTitle>
          <About />
        </div>

        <div id="tracks" className="container mx-auto px-4">
          <SectionTitle>TRACKS & THEMES</SectionTitle>
          <TracksGrid />
        </div>

        <div id="prizes" className="container mx-auto px-4">
           <SectionTitle>PRIZE POOL</SectionTitle>
           <PrizesBento />
        </div>

        <div id="timeline" className="container mx-auto px-4">
          <SectionTitle>TIMELINE</SectionTitle>
          <Timeline />
        </div>
        
        <div className="container mx-auto px-4">
           <SectionTitle>GUIDELINES</SectionTitle>
           <Guidelines />
        </div>

        <div id="team" className="container mx-auto px-4">
          <SectionTitle>THE SQUAD</SectionTitle>
          <MeetTheTeam />
        </div>

        <div id="sponsors" className="container mx-auto px-4">
          <SectionTitle>OUR PARTNERS</SectionTitle>
          <SponsorsMarquee />
        </div>

        <div className="container mx-auto px-4 max-w-3xl">
          <SectionTitle>FAQ</SectionTitle>
          <FaqAccordion />
        </div>

      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/50 backdrop-blur-xl mt-32">
        <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-bold font-heading">
            HACKSAVVY <span className="text-neon-red">2.0</span>
          </div>
          <div className="flex gap-8 text-sm text-gray-500 font-mono">
            <Link href="/coc" className="hover:text-neon-red transition-colors">CODE OF CONDUCT</Link>
            <a href="#" className="hover:text-neon-red transition-colors">TERMS</a>
            <a href="#" className="hover:text-neon-red transition-colors">PRIVACY</a>
          </div>
          <div className="text-gray-600 text-sm">
            © 2026 Hacksavvy Inc.
          </div>
        </div>
      </footer>
    </main>
  )
}