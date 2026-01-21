'use server'

import { createClient } from '@/utils/supabase/server'
import { sendEmail, verifyConnection } from '@/lib/mail'
import { revalidatePath } from 'next/cache'

export async function verifyTeamPayment(teamId: string) {
  console.log(`🚀 Action Started for Team ID: ${teamId}`)

  try {
    const supabase = await createClient()

    // Step 2: Fetch the team
    const { data: team, error: fetchError } = await supabase
      .from('teams')
      .select('*')
      .eq('id', teamId)
      .single()

    if (fetchError || !team) {
      console.error(`❌ Team fetch failed: ${fetchError?.message}`)
      throw new Error(`Team not found: ${fetchError?.message}`)
    }

    // Extract Leader Email
    // Structure: members_data is an array of objects
    let leaderEmail = ''
    let leaderName = 'Hacker'
    
    if (Array.isArray(team.members_data)) {
      const leader = team.members_data.find((m: any) => m.role === 'leader') || team.members_data[0]
      leaderEmail = leader?.email
      leaderName = leader?.name || 'Hacker'
    }

    console.log(`👤 Team found: ${team.team_name}, Email: ${leaderEmail || 'UNKNOWN'}`)

    if (!leaderEmail) {
      console.error('❌ No leader email found in members_data')
      throw new Error('Critical: No leader email found for this team.')
    }

    // Step 3: Update payment_status in Supabase
    const { error: updateError } = await supabase
      .from('teams')
      .update({ payment_status: 'verified' })
      .eq('id', teamId)

    if (updateError) {
      console.error(`❌ DB Update Failed: ${updateError.message}`)
      throw new Error(`Database update failed: ${updateError.message}`)
    }

    console.log('✅ DB Update Success: payment_status set to "verified"')

    // Step 3.5: Revalidate Cache (Optional but recommended)
    revalidatePath('/dashboard')
    revalidatePath('/admin/dashboard')

    // Step 4: Send Email
    try {
      // Optional: Check connection first
      // await verifyConnection() 

      await sendEmail({
        to: leaderEmail,
        subject: 'Registration Confirmed! - Hacksavvy 2026',
        html: `
          <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #ef4444; padding: 20px; text-align: center;">
               <h1 style="color: #fff; margin: 0;">Welcome to Hacksavvy 2026</h1>
            </div>
            <div style="padding: 24px;">
              <p style="font-size: 16px;">Hello <strong>${leaderName}</strong>,</p>
              <p>Great news! Your payment has been verified.</p>
              <p>Your team <strong>${team.team_name}</strong> has been officially confirmed for the <strong>${team.track}</strong> track.</p>
              
              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                  <p style="margin: 5px 0;"><strong>Event Date:</strong> February 13th, 2026</p>
                  <p style="margin: 5px 0;"><strong>Venue:</strong> MGIT, Hyderabad</p>
              </div>

              <div style="margin-top: 20px; border-top: 1px solid #333; padding-top: 20px;">
                <h3 style="color: #00f0ff;">Join Your Track's WhatsApp Group</h3>
                <p>Please join the group specific to your registered track for updates:</p>
                
                <ul style="list-style: none; padding: 0;">
                  <li style="margin-bottom: 10px;">
                    <strong>🤖 AI, Automation & Robotics:</strong><br>
                    <a href="https://chat.whatsapp.com/BopdwIlZKqH76c2q2EGvLc">Join Group</a>
                  </li>
                  <li style="margin-bottom: 10px;">
                    <strong>🔐 Cybersecurity & Blockchain:</strong><br>
                    <a href="https://chat.whatsapp.com/BdDt0Sw6RMG2d7SQK13qCz">Join Group</a>
                  </li>
                  <li style="margin-bottom: 10px;">
                    <strong>📡 IoT, VLSI & Embedded:</strong><br>
                    <a href="https://chat.whatsapp.com/JAQff8TYhUeDxq6xgr8gHT">Join Group</a>
                  </li>
                  <li style="margin-bottom: 10px;">
                    <strong>🌱 Sustainability & Environment:</strong><br>
                    <a href="https://chat.whatsapp.com/K1aK0nSucjaBPiBB75U3Ik">Join Group</a>
                  </li>
                  <li style="margin-bottom: 10px;">
                    <strong>💡 Open Innovation:</strong><br>
                    <a href="https://chat.whatsapp.com/FoW9wbUlzuhFmopoUJKm23">Join Group</a>
                  </li>
                </ul>
              </div>

              <p>You can now access the <strong>Hacker Kit</strong> on your dashboard.</p>
              
              <a href="https://hacksavvy-2026.vercel.app/dashboard" style="display: inline-block; background-color: #000; color: #00f0ff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Go to Dashboard</a>
              
              <p style="margin-top: 30px; font-size: 14px; color: #666;">The Hacksavvy Team</p>
            </div>
          </div>
        `
      })
      
    } catch (emailError: any) {
       console.error(`⚠️ Email Warning: Database updated but email failed: ${emailError.message}`)
       // We return success true because the core action (approval) worked, but with a warning message
       return { 
         success: true, 
         message: `Team verified, but email failed: ${emailError.message}` 
       }
    }

    return { success: true, message: 'Team verified and email sent successfully!' }

  } catch (error: any) {
    console.error('❌ Action Failed:', error.message)
    return { success: false, message: error.message }
  }
}
