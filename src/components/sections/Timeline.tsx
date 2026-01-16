'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock } from 'lucide-react';

const SCHEDULE = {
  day1: [
    { time: "08:00 AM", title: "Registration", desc: "Main registration opens, marking the beginning of an exciting journey." },
    { time: "09:00 AM", title: "Hacking Starts!", desc: "Participants start coding, bringing their innovative ideas to life." },
    { time: "11:00 AM", title: "1st Checkpoint", desc: "Teams present their progress and receive valuable feedback from mentors." },
    { time: "01:30 PM", title: "Lunch", desc: "A well-deserved break where participants can recharge in batches until 2 PM." },
    { time: "03:00 PM", title: "2nd Checkpoint", desc: "Teams showcase their advancements and tackle any challenges with mentor guidance." },
    { time: "05:00 PM", title: "Snacks", desc: "A quick refreshment break to boost energy levels for continued coding." },
    { time: "07:30 PM", title: "Dinner", desc: "Another opportunity for participants to enjoy a meal in batches until 9:30 PM." },
    { time: "09:30 PM", title: "1st Round", desc: "Initial presentations where teams preview their projects to judges for early feedback." },
  ],
  day2: [
    { time: "12:00 AM", title: "Fun Games", desc: "A leisurely break from coding with engaging activities to relax and have fun." },
    { time: "02:00 AM", title: "Midnight Snack", desc: "Coffee, tea, and biscuits served to help maintain focus during the late-night coding sprint." },
    { time: "06:00 AM", title: "3rd Checkpoint", desc: "A crucial time for teams to finalize their projects and prepare for the final presentation." },
    { time: "07:30 AM", title: "Breakfast", desc: "Energizing breakfast served to fuel participants for the final push of the hackathon." },
    { time: "09:00 AM", title: "Final Round", desc: "Teams present their completed projects to judges and peers." },
    { time: "10:00 AM", title: "Closing Ceremony", desc: "Winners announcement, prize distribution, and acknowledgments." },
  ]
};

export default function Timeline() {
  const [activeTab, setActiveTab] = useState<'day1' | 'day2'>('day1');

  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 py-10">
      {/* Tabs */}
      <div className="flex justify-center mb-12">
        <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl backdrop-blur-sm">
          {(['day1', 'day2'] as const).map((day) => (
            <button
              key={day}
              onClick={() => setActiveTab(day)}
              className="relative px-8 py-3 rounded-lg text-sm font-bold font-mono transition-all duration-300 focus:outline-none"
            >
              {activeTab === day && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-neon-red shadow-[0_0_20px_rgba(255,42,42,0.4)] rounded-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className={`relative z-10 ${activeTab === day ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                {day === 'day1' ? 'FEB 12 (DAY 1)' : 'FEB 13 (DAY 2)'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Scroll / Grid Layout */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SCHEDULE[activeTab].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-6 bg-white/5 border border-white/10 hover:border-neon-red/50 rounded-2xl backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,0,0,0.1)]"
            >
              {/* Connector Line (Desktop) */}
              <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[1px] bg-white/10 group-last:hidden" />
              
              <div className="flex flex-col h-full">
                 <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-neon-red/10 rounded-lg text-neon-red group-hover:bg-neon-red group-hover:text-white transition-colors">
                        <Clock className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-neon-red font-bold text-sm tracking-wide">
                        {item.time}
                    </span>
                 </div>
                 
                 <h3 className="text-xl font-bold text-white mb-2 font-heading group-hover:text-neon-red transition-colors">
                     {item.title}
                 </h3>
                 
                 <p className="text-gray-400 text-sm leading-relaxed">
                     {item.desc}
                 </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
