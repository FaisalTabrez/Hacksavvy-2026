'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
// Components
import Preloader from '@/components/ui/Preloader'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/landing/Hero'
import TracksGrid from '@/components/landing/TracksGrid'
// Newly upgraded Prizes section
import Timeline from '@/components/sections/Timeline'
import About from '@/components/sections/About'
import FAQ from '@/components/sections/FAQ'
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
    <main className="min-h-screen text-white selection:bg-neon-red/30 pb-32 overflow-hidden relative">
      
      {/* Global Background Layer */}
      <div className="fixed inset-0 z-[-10]">
        <Image
          src="/assets/redlines.jpg"
          alt="redlines background"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-black/60" /> {/* Dark Overlay */}
      </div>

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

        <div id="faq" className="container mx-auto px-4 max-w-6xl">
          <SectionTitle>FAQ</SectionTitle>
          <FAQ />
        </div>

      </div>

      <Footer />
    </main>
  )
}