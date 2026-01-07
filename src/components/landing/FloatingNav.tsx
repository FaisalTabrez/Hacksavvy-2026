'use client'

import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { Home, Trophy, Layers, Ticket } from 'lucide-react'

export default function FloatingNav() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('home') // Simplified active state

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    // Hide nav on scroll down, show on scroll up
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }

    // Simple scroll spy logic (approximate positions)
    if (latest < 500) setActiveSection('home')
    else if (latest < 1500) setActiveSection('tracks')
    else setActiveSection('prizes')
  })

  return (
    <motion.div
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: 100, opacity: 0 }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transform"
    >
      <div className="flex items-center gap-2 px-3 py-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/50 ring-1 ring-white/5">
        
        <NavButton href="/" icon={<Home size={18} />} label="Home" active={activeSection === 'home'} />
        <NavButton href="#tracks" icon={<Layers size={18} />} label="Tracks" active={activeSection === 'tracks'} />
        <NavButton href="#prizes" icon={<Trophy size={18} />} label="Prizes" active={activeSection === 'prizes'} />
        
        <div className="w-px h-6 bg-white/20 mx-2" />
        
        <Link 
          href="/register"
          className="flex items-center gap-2 px-4 py-2 bg-[#00f0ff] text-black rounded-full text-sm font-bold hover:bg-[#00f0ff]/80 transition-colors shadow-[0_0_15px_rgba(0,240,255,0.4)]"
        >
          <Ticket size={16} />
          Register
        </Link>
      </div>
    </motion.div>
  )
}

function NavButton({ href, icon, label, active }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <Link 
      href={href}
      className={`p-3 rounded-full transition-all ${
        active 
          ? "bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]" 
          : "text-gray-400 hover:text-white hover:bg-white/5"
      }`}
      aria-label={label}
    >
      {icon}
    </Link>
  )
}
