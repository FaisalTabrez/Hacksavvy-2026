'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin } from 'lucide-react'

const themes = [
  "AI", "Cybersecurity", "IoT", "Machine Learning", 
  "Blockchain", "Drone Tech", "Robotics", "Sustainable Infrastructure"
]

export default function About() {
  return (
    <section id="about" className="container mx-auto px-4 py-20 relative z-10 scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Text & Themes */}
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
           className="space-y-8"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              About <span className="text-[#00f0ff]">HackSavvy</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed font-light">
              Join us at HackSavvy, exclusively hosted by the <strong className="text-white font-medium">Mahatma Gandhi Institute of Technology (MGIT)</strong>, 
              for a premier national-level 24-hour hackathon. This event is dedicated to students passionate about 
              advancing the frontiers of innovation.
            </p>
          </div>

          <div>
             <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
               <span className="w-8 h-[1px] bg-[#00f0ff]"></span> 
               Themes
             </h3>
             <div className="flex flex-wrap gap-3">
               {themes.map((theme, idx) => (
                 <span 
                   key={idx}
                   className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-[#00f0ff] font-mono hover:bg-[#00f0ff]/10 transition-colors"
                 >
                   {theme}
                 </span>
               ))}
             </div>
          </div>

          <div>
            <p className="text-gray-400 italic border-l-2 border-[#7c3aed] pl-4">
              &quot;A unique platform for deep collaboration, guided by industry experts, to turn innovative ideas into practical solutions. 
              Challenge the status quo and make a tangible difference.&quot;
            </p>
          </div>
        </motion.div>

        {/* Right Column: Info Cards */}
        <div className="flex flex-col gap-6 lg:mt-12">
          <InfoCard 
            icon={<Calendar className="w-6 h-6 text-[#00f0ff]" />}
            title="Date & Duration"
            content="13th - 14th February 2025"
            subContent="Thursday - Friday (24 Hours)"
            delay={0.2}
          />
          <InfoCard 
            icon={<MapPin className="w-6 h-6 text-[#7c3aed]" />}
            title="Location"
            content="MGIT, Hyderabad"
            subContent="Mahatma Gandhi Institute of Technology"
            delay={0.4}
            link="https://maps.app.goo.gl/1386am23xjFuRRG16"
          />
        </div>
      </div>
    </section>
  )
}

function InfoCard({ icon, title, content, subContent, delay, link }: any) {
  const CardContent = () => (
    <div className="flex items-start gap-5">
      <div className="p-3 rounded-xl bg-white/5 group-hover:bg-[#00f0ff]/20 transition-colors shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="text-gray-400 text-sm font-mono mb-2 uppercase tracking-wide">{title}</h4>
        <p className="text-xl md:text-2xl font-bold text-white mb-2 font-heading">{content}</p>
        <p className="text-[#00f0ff] text-sm">{subContent}</p>
      </div>
    </div>
  )

  const containerClasses = "block p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#00f0ff]/30 transition-all group w-full text-left"

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
    >
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className={containerClasses}>
          <CardContent />
        </a>
      ) : (
        <div className={containerClasses}>
          <CardContent />
        </div>
      )}
    </motion.div>
  )
}
