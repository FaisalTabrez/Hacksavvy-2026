'use client'

import { motion } from 'framer-motion'

const faculty = [
  { name: 'Faculty Coordinator 1', role: 'Faculty, MGIT' },
  { name: 'Faculty Coordinator 2', role: 'Faculty, MGIT' }
]

export default function MeetTheTeam() {
  return (
    <section id="team" className="container mx-auto px-4 py-20 relative z-10 scroll-mt-20">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold font-heading text-white"
        >
          Meet The Team
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div>
          <h3 className="text-2xl font-semibold mb-4">Faculty Coordinators</h3>
          <div className="space-y-4">
            {faculty.map((f, i) => (
              <div key={i} className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="text-white font-bold">{f.name}</div>
                <div className="text-gray-400 text-sm">{f.role}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Student Organizers</h3>
          <p className="text-gray-400">A dedicated team of students from MGIT organizing and running HackSavvy 2026. Contact details and full bios available on the team page.</p>
        </div>
      </div>
    </section>
  )
}
