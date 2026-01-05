-- Create the registrations table
create table if not exists public.registrations (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id text not null,
  email text not null,
  full_name text not null,
  team_name text,
  github_url text,
  bio text,
  track text
);

-- Enable Row Level Security
alter table public.registrations enable row level security;

-- Create a policy to allow inserts from the application
-- Since we are using the anon key in the server action, we need to allow public inserts.
-- Authentication is handled by Clerk in the Next.js Server Action before this insert happens.
create policy "Allow public inserts" 
on public.registrations 
for insert 
with check (true);

-- Create a policy to allow users to read their own registrations (optional, but good practice)
create policy "Allow users to read own data"
on public.registrations
for select
using (user_id = auth.uid()::text); 
-- Note: auth.uid() works if we sync Clerk with Supabase Auth, but here we are storing Clerk ID as text.
-- If we aren't using Supabase Auth integration, the select policy might need adjustment or be omitted if we don't read from client.
-- For now, the insert policy is the critical one for the registration flow.
