import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || !user.email) {
    redirect('/login')
  }

  // Check against the database
  const { data: admin, error } = await supabase
    .from('admins')
    .select('email')
    .eq('email', user.email)
    .single()

  if (error || !admin) {
    // Not an admin -> Redirect to user dashboard
    redirect('/dashboard')
  }

  // If authorized, render the admin pages
  return (
    <>
      {children}
    </>
  )
}
