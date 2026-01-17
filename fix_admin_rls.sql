-- Fix RLS to allow Admins to view ALL data in the 'teams' table

-- 1. Create a Policy on the 'teams' table
-- This policy checks if the current user's email exists in the 'admins' table.
-- If it does, they get full SELECT access to all rows in 'teams'.

create policy "Admins can view all teams"
on teams
for select
to authenticated
using (
  auth.email() in (select email from admins)
);

-- Note: Ensure that the 'admins' table has RLS enabled and a policy allowing read access 
-- (which we did in the previous step), otherwise the subquery might return empty for RLS checks.
