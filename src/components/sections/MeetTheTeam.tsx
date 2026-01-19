'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Phone } from 'lucide-react'

const STUDENT_COORDINATORS = [
  { 
    name: "Junaid Ahmed Khan", 
    role: "Student Co-ordinator", 
    phone: "+91 8008800401", 
    img: "/student/1.jpg" 
  },
  { 
    name: "Sai Amrutha Polu", 
    role: "Student Co-ordinator", 
    phone: "+91 8464085246", 
    img: "/student/2.jpg" 
  },
  { 
    name: "Maneesha Kallepalli", 
    role: "Student Co-ordinator", 
    phone: "+91 9393005221", 
    img: "/student/3.jpg" 
  },
  { 
    name: "Shreya Reddy Thangella", 
    role: "Student Co-ordinator", 
    phone: "+91 8919290101", 
    img: "/student/4.jpg" 
  },
  { 
    name: "Vrundha Reddy Panga", 
    role: "Student Co-ordinator", 
    phone: "+91 9133199706", 
    img: "/student/5.jpg" 
  }
];

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
    <section className="container mx-auto px-4 py-20 relative z-10 scroll-mt-20 overflow-hidden">
      <h2 className="mb-16 text-center text-5xl font-bold font-grotesk text-white md:text-6xl">
        MEET THE <span className="text-red-500">TEAM</span>
      </h2>

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

      {/* Student Coordinators */}
      <div className="mt-20">
        <h3 className="text-3xl md:text-4xl font-bold font-grotesk text-center text-red-500 mb-10 uppercase tracking-widest">
            Student Coordinators
        </h3>
        
        <div className="flex flex-wrap justify-center gap-8">
          {STUDENT_COORDINATORS.map((student, index) => (
            <motion.div
              key={student.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center w-72 bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:border-red-600 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] group"
            >
              {/* Circular Avatar */}
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-red-600/50 group-hover:border-red-500 transition-colors">
                 <Image
                    src={student.img}
                    alt={student.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                 />
              </div>

              {/* Content */}
              <h4 className="text-xl font-bold text-white mt-6 text-center">
                {student.name}
              </h4>
              <p className="text-sm text-gray-400 font-mono text-center uppercase mt-1">
                {student.role}
              </p>
              
              <a 
                href={`tel:${student.phone}`} 
                className="flex items-center gap-2 mt-3 text-red-500 hover:text-red-400 font-mono text-sm transition-colors"
              >
                  <Phone className="w-4 h-4" />
                  {student.phone}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
