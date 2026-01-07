import Link from 'next/link'

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-12 max-w-lg">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
          Registration Complete!
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          You&apos;re all set for Hacksavvy 2026. Check your email for confirmation details.
        </p>
        <Link 
          href="/"
          className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </main>
  )
}
