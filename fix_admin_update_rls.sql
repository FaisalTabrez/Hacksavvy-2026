-- Fix RLS to allow Admins to UPDATE all data in the 'teams' table

-- Create Policy allows Admins (listed in 'admins' table) to UPDATE all rows in 'teams'
create policy "Admins can update teams"
on teams
for update
to authenticated
using (
  auth.email() in (select email from admins)
);
