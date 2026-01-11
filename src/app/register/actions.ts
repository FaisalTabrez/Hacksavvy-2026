'use server'

import { createClient } from '@/utils/supabase/server'
import nodemailer from 'nodemailer'

// Server Action to handle registration
export async function registerTeam(formData: FormData) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, error: 'Unauthorized' }
    }
    const userId = user.id

    const rawData = formData.get('data')
    const screenshot = formData.get('screenshot') as File

    if (!rawData || !screenshot) {
      return { success: false, error: 'Missing data or screenshot' }
    }

    const data = JSON.parse(rawData as string)
    // Structure: { teamName, track, leader, members, transactionId, accommodation }
    
    // Validate Team Size (Leader + Members) -> Min 2, Max 5
    const teamSize = 1 + (data.members?.length || 0);
    if (teamSize < 2 || teamSize > 5) {
        return { success: false, error: 'Team size must be 2-5 members' }
    }

    let screenshotUrl = null

    // 0. Upload Screenshot to Supabase Storage
    if (screenshot && screenshot.size > 0) {
      const fileExt = screenshot.name.split('.').pop()
      const fileName = `teams/${userId}-${Date.now()}.${fileExt}` // Changed folder structure slightly

      const { error: uploadError } = await supabase.storage
        .from('payment_proofs')
        .upload(fileName, screenshot) // Note: confirm bucket exists. 'payment_proofs' was used in old code.

      if (uploadError) {
        console.error('Upload Error:', uploadError)
        return { success: false, error: 'Screenshot upload failed' }
      } else {
        const { data: { publicUrl } } = supabase.storage
          .from('payment_proofs')
          .getPublicUrl(fileName)
        screenshotUrl = publicUrl
      }
    }

    // 1. Save to Supabase 'teams' table
    // Transform data to match Database Schema (snake_case)
    const allMembers = [data.leader, ...data.members].map((member: any) => ({
        name: member.name,
        email: member.email,
        phone: member.phone,
        college: member.college,
        roll_no: member.rollNo,
        diet_preference: member.dietPreference
    }));

    const { error: dbError } = await supabase
      .from('teams')
      .insert({
        leader_user_id: userId, // Auth ID
        team_name: data.teamName,
        track: data.track,
        members_data: allMembers, // Store structured JSON of everyone
        payment_status: 'pending',
        payment_screenshot_url: screenshotUrl,
        transaction_id: data.transactionId,
        accommodation_needed: data.accommodation
      })

    if (dbError) {
      console.error('Supabase error:', dbError)
      // Check for unique constraint on team_name
      if (dbError.code === '23505') return { success: false, error: 'Team Name already exists' }
      return { success: false, error: 'Failed to save registration: ' + dbError.message }
    }

    // 2. Send Emails via Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    // Send to ALL members
    const emailPromises = allMembers.map((member: any) => {
        return transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: member.email,
            subject: 'Registration Confirmed - Hacksavvy 2026',
            html: `
            <div style="font-family: sans-serif; color: #333;">
                <h1>Welcome to Hacksavvy 2026!</h1>
                <p>Hi ${member.name},</p>
                <p>Your team <strong>${data.teamName}</strong> has been successfully registered.</p>
                <p><strong>Track:</strong> ${data.track}</p>
                <p><strong>Status:</strong> Payment Pending Verification</p>
                <br/>
                <p>We will notify you once your payment is verified.</p>
                <p>The Hacksavvy Team</p>
            </div>
            `,
        })
    })

    await Promise.allSettled(emailPromises)

    return { success: true }
  } catch (error) {
    console.error('Registration error:', error)
    return { success: false, error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error)) }
  }
}
