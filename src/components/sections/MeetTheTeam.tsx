'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FACULTY_LEADERS, STUDENT_COORDINATORS } from '@/lib/constants'

export default function MeetTheTeam() {
  return (
    <section id="team" className="container mx-auto px-4 py-20 relative z-10 scroll-mt-20">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold font-heading text-white"
        >
          Leadership & Team
        </motion.h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          The driving force behind HackSavvy 2026.
        </p>
      </div>

      {/* Faculty */}
      <div className="mb-20">
        <h3 className="text-2xl font-bold font-heading text-neon-red mb-8 text-center border-b border-white/10 pb-4">
            Faculty Guide
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center max-w-5xl mx-auto">
          {FACULTY_LEADERS.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative h-64 w-full overflow-hidden rounded-xl border border-white/10 bg-white/5">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                />
              </div>
              <div className="mt-4 text-center">
                <h4 className="text-xl font-bold text-white">{leader.name}</h4>
                <p className="text-neon-red font-medium">{leader.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Students */}
      <div>
        <h3 className="text-2xl font-bold font-heading text-neon-red mb-8 text-center border-b border-white/10 pb-4">
            Student Coordinators
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center max-w-5xl mx-auto">
          {STUDENT_COORDINATORS.map((student, index) => (
            <motion.div
              key={student.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-neon-red/50 transition-colors"
            >
              <div className="relative h-16 w-16 rounded-full overflow-hidden border border-white/20">
                <Image
                  src={student.image}
                  alt={student.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-white">{student.name}</h4>
                <p className="text-sm text-gray-400">{student.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
