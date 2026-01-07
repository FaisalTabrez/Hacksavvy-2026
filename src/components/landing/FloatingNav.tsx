'use client'

import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { Home, Trophy, Layers, Ticket } from 'lucide-react'

export default function FloatingNav() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
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
      <div className="flex items-center gap-2 px-3 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/50">
        
        <NavButton href="/" icon={<Home size={18} />} label="Home" />
        <NavButton href="#tracks" icon={<Layers size={18} />} label="Tracks" />
        <NavButton href="#prizes" icon={<Trophy size={18} />} label="Prizes" />
        
        <div className="w-px h-6 bg-white/20 mx-2" />
        
        <Link 
          href="/register"
          className="flex items-center gap-2 px-4 py-2 bg-[#00f0ff] text-black rounded-full text-sm font-bold hover:bg-[#00f0ff]/80 transition-colors"
        >
          <Ticket size={16} />
          Register
        </Link>
      </div>
    </motion.div>
  )
}

function NavButton({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <Link 
      href={href}
      className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
      aria-label={label}
    >
      {icon}
    </Link>
  )
}
