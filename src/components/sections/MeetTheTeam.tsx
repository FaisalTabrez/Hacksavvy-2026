'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { STUDENT_COORDINATORS } from '@/lib/constants'

const FACULTY_MEMBERS = [
  { name: "Dr. Ch. Ramesh Babu", role: "Faculty Co-Ordinator", img: "/faculty/1.jpg" },
  { name: "Dr. V. Subba Ramaiah", role: "Faculty Co-Ordinator", img: "/faculty/2.jpg" },
  { name: "Dr. A. Ratna Raju", role: "Faculty Co-Ordinator", img: "/faculty/3.jpg" },
  { name: "Dr. K. Madubabu", role: "Faculty Co-Ordinator", img: "/faculty/4.jpg" },
  { name: "Dr. Meera Alphy", role: "Faculty Co-Ordinator", img: "/faculty/5.jpg" },
  { name: "Mr. R. Srinivas", role: "Faculty Co-Ordinator", img: "/faculty/6.jpg" },
  { name: "Dr. B. Yadaiah", role: "Faculty Co-Ordinator", img: "/faculty/7.jpg" },
  { name: "Ms. J Hima Bindu", role: "Faculty Co-Ordinator", img: "/faculty/8.jpg" },
  { name: "Mrs. V Veena", role: "Faculty Co-Ordinator", img: "/faculty/9.jpg" },
  { name: "A. Bal Raju", role: "Faculty Co-Ordinator", img: "/faculty/10.jpg" },
  { name: "Dr. S Siva Reddy", role: "Faculty Co-Ordinator", img: "/faculty/11.jpg" },
  { name: "Mr. Sheri Abhishek", role: "Faculty Co-Ordinator", img: "/faculty/12.jpg" },
  { name: "Mr. P. Shankar Kumar", role: "Faculty Co-Ordinator", img: "/faculty/13.jpg" },
  { name: "Dr. Asheesh Kumar", role: "Faculty Co-Ordinator", img: "/faculty/14.jpg" },
  { name: "Mr. Bhoomik Ketari", role: "Faculty Co-Ordinator", img: "/faculty/15.jpg" },
];

export default function MeetTheTeam() {
  return (
    <section id="team" className="container mx-auto px-4 py-20 relative z-10 scroll-mt-20 overflow-hidden">
      <div className="text-center mb-16 mt-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black font-grotesk text-center text-white mb-4 uppercase tracking-tighter"
        >
          MEET THE <span className="text-neon-red">TEAM</span>
        </motion.h2>
      </div>

      {/* Faculty Coordinators Marquee */}
      <div className="mb-24 mt-12">
        <h3 className="text-2xl font-bold font-heading text-neon-red mb-12 text-center">
            Faculty Coordinators
        </h3>
        
        <div className="relative w-full -mx-4 md:-mx-0">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

            <div className="flex overflow-hidden group/marquee">
                <motion.div 
                    className="flex gap-8 px-4"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ 
                        repeat: Infinity, 
                        ease: "linear", 
                        duration: 40
                    }}
                    style={{ 
                        width: "max-content",
                    }}
                >
                    {[...FACULTY_MEMBERS, ...FACULTY_MEMBERS].map((member, index) => (
                        <div 
                            key={`${member.name}-${index}`} 
                            className="flex-shrink-0 w-64 bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-red-500/50 transition-colors group relative"
                        >
                            <div className="h-64 w-full relative overflow-hidden bg-neutral-900">
                                <div className="absolute inset-0 flex items-center justify-center text-neutral-800">
                                    <span className="text-6xl font-black opacity-20">{member.name[0]}</span>
                                </div>
                                <Image 
                                    src={member.img} 
                                    alt={member.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                                />
                            </div>
                            <div className="p-4 text-center bg-black/50 backdrop-blur-sm">
                                <h4 className="text-lg font-bold text-white truncate px-2">{member.name}</h4>
                                <p className="text-red-500 text-xs font-mono uppercase mt-1 font-bold">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

        </div>
      </div>

      {/* Students */}
      <div>
        <h3 className="text-2xl font-bold font-heading text-neon-red mb-8 text-center border-b border-white/10 pb-4 max-w-xl mx-auto">
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
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-neon-red/50 transition-colors group"
            >
              <div className="relative h-16 w-16 rounded-full overflow-hidden border border-white/20 group-hover:border-red-500/50 transition-colors">
                <Image
                  src={student.image}
                  alt={student.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-white group-hover:text-red-400 transition-colors">{student.name}</h4>
                <p className="text-sm text-gray-400">{student.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
