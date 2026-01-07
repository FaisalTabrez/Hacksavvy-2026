'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search } from 'lucide-react'

const faqs = [
  {
    question: "Who can participate?",
    answer: "Hacksavvy is open to all university students. You don't need to be a CS major! We welcome designers, developers, and visionaries from any background."
  },
  {
    question: "How much does it cost?",
    answer: "Zero. Hacksavvy is completely free for all admitted participants. We provide meals, swag, and resources throughout the event."
  },
  {
    question: "Do I need a team?",
    answer: "You can hack solo or in a team of up to 4 members. If you don't have a team, don't worry! We'll have team formation activities at the start of the event."
  },
  {
    question: "What if I've never hacked before?",
    answer: "Perfect! We have a dedicated 'Open Innovation' track and mentors to guide beginners. It's the best place to learn."
  },
  {
    question: "Can I start working before the event?",
    answer: "No. All code must be written during the 24-hour hacking period. You can brainstorm ideas and prepare designs beforehand, but no coding allowed!"
  }
]

export default function FaqAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [search, setSearch] = useState("")

  const filteredFaqs = faqs.filter(f => 
    f.question.toLowerCase().includes(search.toLowerCase()) || 
    f.answer.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search questions..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00f0ff] focus:outline-none transition-colors text-white placeholder:text-gray-600"
        />
      </div>

      <div className="space-y-4">
        {filteredFaqs.map((faq, index) => (
          <div 
            key={index}
            className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
          >
            <button
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
            >
              <span className="font-bold text-lg">{faq.question}</span>
              <Plus 
                className={`text-[#00f0ff] transition-transform duration-300 ${activeIndex === index ? "rotate-45" : ""}`} 
              />
            </button>
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
        {filteredFaqs.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No questions found. Try a different search term.
          </div>
        )}
      </div>
    </div>
  )
}
