'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Users, 
  IndianRupee, 
  IdCard, 
  Terminal, 
  Laptop, 
  Coffee, 
  Gavel, 
  Trophy,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const guidelines = [
  {
    title: "Team Formation",
    description: "2-4 members per team. Collaboration and diversity in skill sets are encouraged.",
    icon: Users
  },
  {
    title: "Registration Fee",
    description: "Rs. 2500 per team (Non-refundable). Payment details provided upon registration.",
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
    <section className="relative py-10 px-4 z-10 w-full max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-2">
        {/* Simple Header */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-neon-red tracking-[0.3em] text-sm font-bold font-mono"
        >
          IDEATE. INNOVATE. INSPIRE.
        </motion.p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
      >
        {guidelines.map((guide, idx) => (
          <motion.div
            key={idx}
            variants={item}
            className="group relative p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-neon-red/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,42,42,0.15)] flex flex-col items-start gap-4"
          >
            <div className="p-3 rounded-xl bg-neon-red/10 group-hover:bg-neon-red group-hover:text-white text-neon-red transition-all duration-300">
              <guide.icon size={24} />
            </div>
            
            <div>
              <h3 className="text-xl font-bold font-heading text-white mb-2 group-hover:text-neon-red transition-colors">
                {guide.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {guide.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Ready to Register CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-2xl bg-red-950/10 border border-dashed border-red-500/30 backdrop-blur-xl p-8"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-left w-full md:w-auto">
            <h3 className="text-2xl font-bold text-white font-heading mb-2">
              Ready to Register?
            </h3>
            <p className="text-gray-400 mb-6">Ensure you have the following:</p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-neon-red" />
                <span>Team details (names, emails, IDs)</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-neon-red" />
                <span>Payment Screenshot (₹2500 per team)</span>
              </div>
            </div>
          </div>
          
          <Link 
            href="/login" 
            className="group whitespace-nowrap px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-full transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:shadow-[0_0_25px_rgba(220,38,38,0.6)]"
          >
            Register Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
