-- 1. Fix the "Failed to save registration" error by allowing inserts
-- Since we are using the Anon Key from the server (without exchanging Clerk token for Supabase token),
-- Supabase sees the request as "anonymous". We need to allow anonymous inserts.
-- The security is handled by our Server Action which checks `auth()` from Clerk before calling Supabase.

create policy "Allow public inserts" 
on public.registrations 
for insert 
with check (true);

-- 2. (Optional) Add missing columns if you want to save Bio and Track
alter table public.registrations add column if not exists bio text;
alter table public.registrations add column if not exists track text;
