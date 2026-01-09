'use client';

import { motion } from 'framer-motion';
import { 
  Users, 
  IndianRupee, 
  IdCard, 
  Terminal, 
  Laptop, 
  Coffee, 
  Gavel, 
  Trophy,
  CheckCircle2
} from 'lucide-react';

const guidelines = [
  {
    title: "Team Formation",
    description: "2-4 members per team. Collaboration and diversity in skill sets are encouraged.",
    icon: Users
  },
  {
    title: "Registration Fee",
    description: "Rs. 1500 per team (Non-refundable). Payment details provided upon registration.",
    icon: IndianRupee
  },
  {
    title: "Eligibility",
    description: "Open to all college students. Valid College ID + Gov ID mandatory for entry.",
    icon: IdCard
  },
  {
    title: "The Code",
    description: "Fresh code only. All dev must happen during hackathon hours. Plagiarism = Disqualification.",
    icon: Terminal
  },
  {
    title: "Equipment",
    description: "Bring laptops, chargers, and hardware. Wi-Fi is provided.",
    icon: Laptop
  },
  {
    title: "Food & Fuel",
    description: "Breakfast, Lunch, Dinner, and Snacks/Coffee provided to keep you energized.",
    icon: Coffee
  },
  {
    title: "Judging",
    description: "Evaluated on: Creativity, Technical Difficulty, Impact, and Presentation.",
    icon: Gavel
  },
  {
    title: "Awards",
    description: "Certificates for all. Special prizes for top teams.",
    icon: Trophy
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Guidelines() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 z-10 w-full max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold font-space-grotesk text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4"
        >
          GUIDELINES
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-cyan-400/80 tracking-widest text-sm uppercase font-mono"
        >
          Ideate. Innovate. Inspire.
        </motion.p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
      >
        {guidelines.map((rule, index) => (
          <motion.div
            key={index}
            variants={item}
            className="group relative bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md hover:border-purple-500/50 transition-all duration-300 hover:bg-white/[0.07]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              <div className="p-3 bg-white/5 w-fit rounded-xl mb-4 text-cyan-400 group-hover:text-purple-400 group-hover:bg-purple-500/10 transition-colors">
                <rule.icon className="w-6 h-6" />
              </div>
              
              <h3 className="text-xl font-bold font-space-grotesk text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {rule.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed font-geist">
                {rule.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-900/10 to-purple-900/10 border border-dashed border-cyan-500/30 backdrop-blur-xl p-8 md:p-12"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white font-space-grotesk mb-2">
              Ready to Register?
            </h3>
            <p className="text-gray-400 mb-6">Please ensure you have the following ready:</p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                <span>Team details (names, emails, IDs)</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-purple-400" />
                <span>Proof of payment screenshot (Rs. 1500) — details in the registration form</span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <button className="w-full md:w-auto px-8 py-4 bg-white text-black font-bold font-space-grotesk hover:bg-cyan-400 transition-colors rounded-xl">
              REGISTER NOW
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
