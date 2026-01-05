'use server'

import { auth, currentUser } from '@clerk/nextjs/server'
import { supabase } from '@/lib/supabase'
import nodemailer from 'nodemailer'

// Server Action to handle registration
export async function registerTeam(formData: FormData) {
  try {
    const { userId } = await auth()
    const user = await currentUser()

    if (!userId || !user) {
      return { success: false, error: 'Unauthorized' }
    }

    const fullName = formData.get('fullName') as string
    const email = user.primaryEmailAddress?.emailAddress
    const teamName = formData.get('teamName') as string
    const githubUrl = formData.get('githubUrl') as string
    const bio = formData.get('bio') as string
    const track = formData.get('track') as string

    if (!fullName || !email || !githubUrl) {
      return { success: false, error: 'Missing required fields' }
    }

    // 1. Save to Supabase
    const { error: dbError } = await supabase
      .from('registrations')
      .insert({
        user_id: userId,
        email,
        full_name: fullName,
        team_name: teamName || null,
        github_url: githubUrl,
        bio: bio,
        track: track,
      })

    if (dbError) {
      console.error('Supabase error:', dbError)
      return { success: false, error: 'Failed to save registration: ' + dbError.message }
    }

    // 2. Send Email via Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Application Received - Hacksavvy 2026',
      html: \`
        <div style="font-family: sans-serif; color: #333;">
          <h1>Application Received!</h1>
          <p>Hi \${fullName},</p>
          <p>Thanks for registering for Hacksavvy 2026. We've received your application.</p>
          <p><strong>Team:</strong> \${teamName || 'N/A'}</p>
          <p><strong>Track:</strong> \${track}</p>
          <br/>
          <p>See you there!</p>
          <p>The Hacksavvy Team</p>
        </div>
      \`,
    })

    return { success: true }
  } catch (error) {
    console.error('Registration error:', error)
    return { success: false, error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error)) }
  }
}
