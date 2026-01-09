'use server'

import { supabase } from '@/lib/supabase'
import nodemailer from 'nodemailer'

export async function approvePayment(teamId: string, teamName: string, track: string, leaderEmail: string, leaderName: string) {
  try {
    // 1. Update DB
    const { error } = await supabase
      .from('teams')
      .update({ payment_status: 'verified' })
      .eq('id', teamId)

    if (error) throw new Error(error.message)

    // 2. Send Confirmation Email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: leaderEmail,
      subject: 'Registration Confirmed! - Hacksavvy 2026',
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #00f0ff; padding: 20px; text-align: center;">
             <h1 style="color: #000; margin: 0;">Welcome to Hacksavvy 2.0</h1>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px;">Hello <strong>${leaderName}</strong>,</p>
            <p>Great news! Your payment has been verified.</p>
            <p>Your team <strong>${teamName}</strong> has been officially confirmed for the <strong>${track}</strong> track.</p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>Event Date:</strong> February 13th, 2026</p>
                <p style="margin: 5px 0;"><strong>Venue:</strong> MGIT, Hyderabad</p>
            </div>

            <p>You can now access the <strong>Hacker Kit</strong> on your dashboard, which includes your Discord invite and WiFi credentials.</p>

            <a href="https://hacksavvy-2026.vercel.app/dashboard" style="display: inline-block; background-color: #000; color: #00f0ff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Go to Dashboard</a>
            
            <p style="margin-top: 30px; font-size: 14px; color: #666;">See you at the Liquid Void!</p>
            <p style="font-size: 14px; color: #666;">The Hacksavvy Team</p>
          </div>
        </div>
      `,
    })

    return { success: true }
  } catch (error: any) {
    console.error("Approval error:", error)
    return { success: false, error: error.message }
  }
}

export async function rejectPayment(teamId: string, leaderEmail: string) {
    // Implementation for rejection if needed
     try {
        // 1. Update DB to 'rejected' if you want, or just leave pending/delete.
        // Let's assume we allow re-upload, so maybe set status to 'rejected' or delete current proof.
        // For simplicity: Update status to 'rejected'
        
        const { error } = await supabase
        .from('teams')
        .update({ payment_status: 'rejected' })
        .eq('id', teamId)

        if (error) throw new Error(error.message)

        // Email logic...
        return { success: true }
     } catch(e:any) {
         return { success: false, error: e.message }
     }
}
