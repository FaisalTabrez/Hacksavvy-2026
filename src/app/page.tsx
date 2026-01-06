'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const FluidBackground = dynamic(() => import('@/components/FluidBackground'), { ssr: false })

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

export default function Home() {
  return (
    <main className="min-h-screen text-white font-sans selection:bg-purple-500/30">
      <FluidBackground />
      
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-md"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Hacksavvy 2026
          </div>
          <div className="hidden md:flex gap-6 text-sm text-gray-300">
            <Link href="#about" className="hover:text-white transition-colors">About</Link>
            <Link href="#tracks" className="hover:text-white transition-colors">Tracks</Link>
            <Link href="#prizes" className="hover:text-white transition-colors">Prizes</Link>
            <Link href="#sponsors" className="hover:text-white transition-colors">Sponsors</Link>
            <Link href="#faq" className="hover:text-white transition-colors">FAQ</Link>
          </div>
          <Link 
            href="/register"
            className="px-4 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-200 transition-colors"
          >
            Register Now
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 min-h-screen flex flex-col items-center justify-center text-center relative z-10">
        
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Future</span>
          </motion.h1>
          <motion.p variants={fadeIn} className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join us for 24 hours of innovation, coding, and breakthrough ideas.
            <br />
            January 24-25, 2026
          </motion.p>
          <motion.div variants={fadeIn} className="flex gap-4 justify-center">
            <Link 
              href="/register"
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Register for Hacksavvy
            </Link>
            <Link 
              href="#about"
              className="px-8 py-3 border border-white/20 rounded-full font-medium hover:bg-white/5 transition-colors"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 border-t border-white/5 relative z-10 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">About The Event</h2>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-gray-300 leading-relaxed">
                Hacksavvy 2026 is the premier hackathon for builders, dreamers, and innovators. 
                Whether you're a seasoned developer or just starting out, this is your platform 
                to create something extraordinary.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tracks Section */}
      <section id="tracks" className="py-20 px-4 border-t border-white/5 relative z-10 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto">
          <motion.h2  
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 text-center"
          >
            Tracks
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-6 rounded-xl bg-black border border-white/10 hover:border-purple-500/50 transition-colors"
              >
                <h3 className="text-xl font-bold mb-2">Track {i}</h3>
                <p className="text-gray-400 text-sm">Description for track {i} goes here.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section id="prizes" className="py-20 px-4 border-t border-white/5 relative z-10 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 text-center"
          >
            Prizes
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Placeholders */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="h-64 rounded-xl bg-gradient-to-b from-yellow-500/10 to-transparent border border-yellow-500/20 flex items-center justify-center"
            >
              <span className="text-2xl font-bold text-yellow-500">1st Place</span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="h-64 rounded-xl bg-gradient-to-b from-gray-400/10 to-transparent border border-gray-400/20 flex items-center justify-center"
            >
              <span className="text-2xl font-bold text-gray-400">2nd Place</span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="h-64 rounded-xl bg-gradient-to-b from-orange-700/10 to-transparent border border-orange-700/20 flex items-center justify-center"
            >
              <span className="text-2xl font-bold text-orange-700">3rd Place</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="py-20 px-4 border-t border-white/5 relative z-10 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12"
          >
            Our Sponsors
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50">
            {/* Logo Placeholders */}
            {[1, 2, 3, 4].map((i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="h-20 bg-white/10 rounded-lg flex items-center justify-center"
              >
                Logo {i}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 border-t border-white/5 relative z-10 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 text-center"
          >
            FAQ
          </motion.h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-4 rounded-lg bg-white/5 border border-white/10"
              >
                <h3 className="font-medium mb-2">Question {i}?</h3>
                <p className="text-sm text-gray-400">Answer to question {i}.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10 bg-black text-center text-gray-500 text-sm relative z-10">
        <p>© 2026 Hacksavvy. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-4">
          <Link href="/coc" className="hover:text-white">Code of Conduct</Link>
          <a href="#" className="hover:text-white">Twitter</a>
          <a href="#" className="hover:text-white">Instagram</a>
        </div>
      </footer>
    </main>
  )
}
