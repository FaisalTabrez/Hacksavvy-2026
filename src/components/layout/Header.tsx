'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, Ticket } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '#about' },
  { label: 'Tracks', href: '#tracks' },
  { label: 'Prizes', href: '#prizes' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'Team', href: '#team' },
]

export default function Header() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    setScrolled(latest > 50)
  })

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: -100 }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative h-12 w-48 shrink-0">
          <Image 
            src="/assets/mgitwhitelogo.png" 
            alt="MGIT Logo" 
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.label}
              href={link.href} 
              className="text-sm font-medium text-gray-300 hover:text-neon-red transition-colors uppercase tracking-wider"
            >
              {link.label}
            </Link>
          ))}
          
          <Link 
            href="/register"
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-neon-red to-deep-crimson text-white rounded-full text-sm font-bold hover:shadow-[0_0_20px_rgba(255,42,42,0.4)] transition-all border border-red-500/50"
          >
            <Ticket size={16} />
            REGISTER
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 inset-x-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-6">
           {NAV_LINKS.map((link) => (
            <Link 
              key={link.label}
              href={link.href} 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-bold text-white hover:text-neon-red"
            >
              {link.label}
            </Link>
          ))}
           <Link 
            href="/register"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-neon-red text-white rounded-lg font-bold"
          >
            REGISTER NOW
          </Link>
        </div>
      )}
    </motion.header>
  )
}