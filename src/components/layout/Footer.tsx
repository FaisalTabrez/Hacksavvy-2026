import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/50 backdrop-blur-xl mt-32">
        <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="text-2xl font-bold font-heading">
            HACKSAVVY <span className="text-neon-red">2026</span>
          </div>

          {/* Links */}
          <div className="flex gap-8 text-sm text-gray-500 font-mono">
            <Link href="/coc" className="hover:text-neon-red transition-colors">CODE OF CONDUCT</Link>
            <a href="#" className="hover:text-neon-red transition-colors">TERMS</a>
            <a href="#" className="hover:text-neon-red transition-colors">PRIVACY</a>
          </div>

          {/* Copyright & Dev Credit */}
          <div className="text-gray-600 text-sm flex flex-col items-center md:items-end gap-2">
            <span>© 2026 Hacksavvy Inc.</span>
            <a 
              href="https://github.com/FaisalTabrez" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-neutral-500 hover:text-red-500 transition-colors duration-200"
            >
              Developed by Md. Faisal
            </a>
          </div>
        </div>
      </footer>
  )
}
