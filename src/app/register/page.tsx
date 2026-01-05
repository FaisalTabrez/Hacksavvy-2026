'use client'

import { useUser, SignInButton } from '@clerk/nextjs'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { registerTeam } from '@/app/register/actions'

export default function RegisterPage() {
  const { isLoaded, isSignedIn, user } = useUser()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Sign in Required</h1>
        <p className="mb-6 text-gray-400">Please sign in to register for Hacksavvy 2026.</p>
        <SignInButton mode="modal">
          <button className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors">
            Sign In
          </button>
        </SignInButton>
      </div>
    )
  }

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setError(null)

    try {
      const result = await registerTeam(formData)
      if (result.success) {
        router.push('/register/success')
      } else {
        setError(result.error || 'Something went wrong')
      }
    } catch (e) {
      console.error('Submission error:', e)
      setError('An unexpected error occurred: ' + (e instanceof Error ? e.message : String(e)))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Register for Hacksavvy
        </h1>
        
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <form action={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium mb-2 text-gray-300">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                defaultValue={user.fullName || ''}
                required
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={user.primaryEmailAddress?.emailAddress || ''}
                readOnly
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-gray-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label htmlFor="teamName" className="block text-sm font-medium mb-2 text-gray-300">Team Name (Optional)</label>
              <input
                type="text"
                id="teamName"
                name="teamName"
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                placeholder="The Hackers"
              />
            </div>

            <div>
              <label htmlFor="githubUrl" className="block text-sm font-medium mb-2 text-gray-300">GitHub Profile URL</label>
              <input
                type="url"
                id="githubUrl"
                name="githubUrl"
                required
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                placeholder="https://github.com/username"
              />
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium mb-2 text-gray-300">Short Bio</label>
              <textarea
                id="bio"
                name="bio"
                rows={3}
                required
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                placeholder="Tell us a bit about yourself..."
              />
            </div>

            <div>
              <label htmlFor="track" className="block text-sm font-medium mb-2 text-gray-300">Preferred Track</label>
              <select
                id="track"
                name="track"
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
              >
                <option value="general">General</option>
                <option value="ai">AI / Machine Learning</option>
                <option value="web3">Web3 / Blockchain</option>
                <option value="sustainability">Sustainability</option>
              </select>
            </div>

            {error && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Registering...' : 'Complete Registration'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
