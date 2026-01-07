import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-9xl font-black text-[#00f0ff] animate-pulse">404</h1>
      <h2 className="text-2xl font-bold font-heading text-white mt-4 mb-2">Lost in the Void?</h2>
      <p className="text-gray-400 mb-8 max-w-md">
        The coordinates you entered don't exist in this dimension.
      </p>
      <Link 
        href="/"
        className="px-8 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors text-white font-mono"
      >
        Return to Base
      </Link>
    </div>
  )
}
