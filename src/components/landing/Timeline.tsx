'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Calendar, Code, Rocket, Flag } from 'lucide-react'

const events = [
  {
    date: "Feb 1, 2026",
    title: "Registration Opens",
    description: "Secure your spot on the waitlist.",
    icon: <Calendar className="text-[#00f0ff]" />
  },
  {
    date: "Feb 12, 10:00 AM",
    title: "Hacking Starts",
    description: "Opening ceremony and team formation.",
    icon: <Code className="text-[#7c3aed]" />
  },
  {
    date: "Feb 13, 10:00 AM",
    title: "Submission Deadline",
    description: "Code freeze. Upload to Devfolio.",
    icon: <Flag className="text-[#00f0ff]" />
  },
  {
    date: "Feb 13, 04:00 PM",
    title: "Winners Announced",
    description: "Closing ceremony and prize distribution.",
    icon: <Rocket className="text-[#7c3aed]" />
  }
]

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Create a fill effect for the line
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <div ref={containerRef} className="relative max-w-3xl mx-auto py-20 px-4">
      
      {/* Central Line Background */}
      <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2" />
      
      {/* Animated Fill Line */}
      <motion.div 
        style={{ height: lineHeight }}
        className="absolute left-[20px] md:left-1/2 top-0 w-1 bg-gradient-to-b from-[#00f0ff] via-[#7c3aed] to-[#00f0ff] -translate-x-1/2 origin-top"
      />

      <div className="relative space-y-24">
        {events.map((event, index) => (
          <div 
            key={index} 
            className={`flex flex-col md:flex-row items-center gap-8 ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Card Content */}
            <motion.div 
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex-1 w-full pl-12 md:pl-0"
            >
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-[#00f0ff]/30 transition-colors">
                <span className="text-[#00f0ff] font-mono text-sm mb-2 block">{event.date}</span>
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-400 text-sm">{event.description}</p>
              </div>
            </motion.div>

            {/* Icon Marker */}
            <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-[#0a0a0a] border border-white/20 z-10 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
              {event.icon}
            </div>

            {/* Spacer for the other side */}
            <div className="hidden md:block flex-1" />
          </div>
        ))}
      </div>
    </div>
  )
}
