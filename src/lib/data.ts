import { createClient } from '@/utils/supabase/server';
import { supabase } from '@/lib/supabase';
import { ADMIN_EMAILS } from '@/lib/constants';

export async function getUserState() {
  const authClient = await createClient();
  const { data: { user } } = await authClient.auth.getUser();

  if (!user) {
    return {
      isAuthenticated: false,
      user: null,
      team: null,
      isAdmin: false,
      state: 'GUEST' as const,
    };
  }

  const email = user.email || '';
  const isAdmin = ADMIN_EMAILS.includes(email);

  // Fetch team registration where the user is the leader OR a member
  const { data: team, error } = await supabase
    .from('teams')
    .select('*')
    .eq('leader_user_id', user.id)
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
