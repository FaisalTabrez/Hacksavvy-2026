'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X } from 'lucide-react'

const FAQ_DATA = [
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
    <section className="w-full max-w-4xl mx-auto">
      <div className="space-y-4">
        {FAQ_DATA.map((item, index) => {
          const isOpen = openIndex === index

          return (
            <motion.div
              key={index}
              initial={false}
              className={`group rounded-xl border backdrop-blur-md overflow-hidden transition-all duration-300 ${
                isOpen 
                  ? 'bg-red-950/10 border-red-500/50 shadow-[0_0_15px_-5px_rgba(239,68,68,0.3)]' 
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className={`text-lg font-grotesk font-semibold transition-colors ${
                  isOpen ? 'text-white' : 'text-gray-200 group-hover:text-white'
                }`}>
                  {item.question}
                </span>
                <span className={`p-2 rounded-full border transition-all duration-300 ${
                    isOpen 
                        ? 'bg-red-500 border-red-500 text-white rotate-180' 
                        : 'bg-transparent border-white/20 text-gray-400 group-hover:border-white/50 group-hover:text-white'
                }`}>
                    {isOpen ? <X size={18} /> : <Plus size={18} />}
                </span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-0 text-neutral-400 leading-relaxed border-t border-transparent">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
