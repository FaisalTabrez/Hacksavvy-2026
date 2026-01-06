'use server'

import { auth, currentUser } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'
import nodemailer from 'nodemailer'
import { revalidatePath } from 'next/cache'

// Hardcoded admin email (as requested)
// In a real app, use Clerk public metadata or roles
const ADMIN_EMAILS = ['faisaltabrez01@gmail.com'] // Replace with your actual email if different

export async function verifyPayment(registrationId: string) {
  try {
    const user = await currentUser()
    
    // Security Check
    if (!user || !user.primaryEmailAddress || !ADMIN_EMAILS.includes(user.primaryEmailAddress.emailAddress)) {
      return { success: false, error: 'Unauthorized: Admin access required' }
    }

    // Setup Admin Client
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
        return { success: false, error: 'Configuration Error: Missing Service Role Key' }
    }

    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    // 1. Update Supabase
    const { data: registration, error: dbError } = await supabaseAdmin
      .from('registrations')
      .update({ 
        payment_status: 'verified',
        payment_verified_at: new Date().toISOString()
      })
      .eq('id', registrationId)
      .select('email, full_name, team_name, track') // return the updated record to get email
      .single()

    if (dbError || !registration) {
      console.error('Supabase update error:', dbError)
      return { success: false, error: 'Failed to update payment status' }
    }

    // 2. Send "Payment Confirmed" Email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: registration.email,
      subject: 'Payment Verified & Seat Reserved - Hacksavvy 2026',
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h1 style="color: #4ade80;">Payment Confirmed!</h1>
          <p>Hi ${registration.full_name},</p>
          <p>Great news! We have verified your payment and your seat is officially reserved for Hacksavvy 2026.</p>
          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
             <p><strong>Team:</strong> ${registration.team_name || 'Individual'}</p>
             <p><strong>Track:</strong> ${registration.track}</p>
             <p><strong>Status:</strong> <span style="color: green; font-weight: bold;">VERIFIED</span></p>
          </div>
          <p>Get your laptop ready!</p>
          <p>The Hacksavvy Team</p>
        </div>
      `,
    })

    // 3. Revalidate the admin page so the UI updates
    revalidatePath('/admin')

    return { success: true }
    
  } catch (error) {
    console.error('Verification error:', error)
    return { success: false, error: 'Internal server error during verification' }
  }
}
