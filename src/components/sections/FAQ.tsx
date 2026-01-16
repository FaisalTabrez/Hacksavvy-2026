'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X } from 'lucide-react'

const FAQS = [
  {
    question: "What is the team size requirement?",
    answer: "Teams must consist of 2 to 5 members. We encourage interdisciplinary teams with diverse skill sets."
  },
  {
    question: "Is there a registration fee?",
    answer: "Yes, there is a registration fee of ₹2,500 per team. This covers food, swag kits, and participation rights for the 36-hour event."
  },
  {
    question: "Will food and accommodation be provided?",
    answer: "We provide breakfast, lunch, dinner, and snacks/coffee throughout the 36-hour hackathon. Accommodation is available for out-station participants upon request in the registration form."
  },
  {
    question: "Who owns the intellectual property (IP) of the project?",
    answer: "The team that builds the project retains all rights to their code and IP. We just want to see you build something cool!"
  },
  {
    question: "I am a beginner, can I participate?",
    answer: "Absolutely! HackSavvy is about learning. We will have mentors and industry experts present to guide you through roadblocks."
  },
  {
    question: "What should I bring to the venue?",
    answer: "Bring your laptops, chargers, extension cords (recommended), college ID, government ID, and any hardware components you need for your project."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="relative w-full py-24 bg-black overflow-hidden scroll-mt-20">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-red-950/20 via-black to-black pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter"
          >
            F.A.Q
          </motion.h2>
          <div className="w-24 h-1 bg-neon-red mx-auto mt-4 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FAQS.map((faq, index) => (
            <FollowupCard 
              key={index} 
              index={index} 
              faq={faq} 
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)} 
            />
          ))}
        </div>

      </div>
    </section>
  )
}

function FollowupCard({ index, faq, isOpen, onClick }: { index: number, faq: any, isOpen: boolean, onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div 
        onClick={onClick}
        className={`
            group relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300
            ${isOpen 
              ? 'bg-white/10 border-red-500 shadow-[0_0_20px_-5px_rgba(239,68,68,0.4)]' 
              : 'bg-white/5 border-white/10 hover:border-white/20'
            }
        `}
      >
        <div className="p-6 flex items-start justify-between gap-4">
            <h3 className={`font-semibold text-lg pr-4 transition-colors ${isOpen ? 'text-white' : 'text-neutral-200 group-hover:text-white'}`}>
                {faq.question}
            </h3>
            
            {/* Icon Wrapper */}
            <div className={`
                flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300
                ${isOpen ? 'bg-red-500 border-red-500' : 'bg-transparent border-white/20 group-hover:border-white/50'}
            `}>
                <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <Plus className={`w-5 h-5 ${isOpen ? 'text-white' : 'text-neutral-400 group-hover:text-white'}`} />
                </motion.div>
            </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-6 pb-6 pt-0">
                <p className="text-neutral-400 leading-relaxed text-sm md:text-base border-t border-white/10 pt-4">
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  )
}
