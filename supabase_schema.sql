-- Create the registrations table
create table public.registrations (
  id uuid not null default gen_random_uuid(),
  user_id text not null, -- Links to Clerk user ID
  email text not null,
  full_name text not null,
  team_name text null,
  github_url text not null,
  created_at timestamp with time zone not null default now(),
  constraint registrations_pkey primary key (id)
);

-- Enable Row Level Security (RLS)
alter table public.registrations enable row level security;

-- Policy: Allow anyone to insert (since we handle auth in the app, or better, use a custom JWT from Clerk)
-- If using Clerk JWT with Supabase:
-- create policy "Users can insert their own registration" on public.registrations for insert with check (auth.uid()::text = user_id);
-- create policy "Users can view their own registration" on public.registrations for select using (auth.uid()::text = user_id);

-- For now, if not using Supabase Auth integration, you might need to use the Service Role key in the backend to write, 
-- or allow public insert (not recommended without checks).
-- Assuming backend (API route) handles the write with Service Role or proper RLS setup.
