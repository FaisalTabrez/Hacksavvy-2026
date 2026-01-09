import { auth, currentUser } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';
import { ADMIN_EMAILS } from '@/lib/constants';

export async function getUserState() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    return {
      isAuthenticated: false,
      user: null,
      team: null,
      isAdmin: false,
      state: 'GUEST' as const, // GUEST
    };
  }

  const email = user.primaryEmailAddress?.emailAddress || '';
  const isAdmin = ADMIN_EMAILS.includes(email);

  // Fetch team registration where the user is the leader OR a member
  // Note: Current schema only stores 'leader_user_id'. 
  // If we want to find members, we'd need to parse the JSONB or have a separate junction table.
  // For now, assuming the user viewing the dashboard is the Leader who registered.
  // If need to support members viewing, we would check 'members_data' using JSON containment or similar.
  // Simplified for this task: Check if user is a leader.
  
  const { data: team, error } = await supabase
    .from('teams')
    .select('*')
    .eq('leader_user_id', userId)
    .single();

  // Determine State
  let state: 'NEW' | 'PENDING' | 'VERIFIED' | 'REJECTED' = 'NEW';

  if (team) {
    if (team.payment_status === 'verified') {
      state = 'VERIFIED';
    } else if (team.payment_status === 'rejected') {
      state = 'REJECTED';
    } else {
      state = 'PENDING';
    }
  }

  return {
    isAuthenticated: true,
    user,
    team,
    isAdmin,
    state,
  };
}
