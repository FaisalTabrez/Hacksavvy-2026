-- 1. Add new columns to the registrations table
alter table public.registrations 
add column if not exists payment_status text default 'pending',
add column if not exists payment_verified_at timestamp with time zone,
add column if not exists screenshot_url text;

-- 2. Create a Storage Bucket for Payment Proofs
-- Note: You might need to create this manually in the Supabase Dashboard if this SQL fails due to permissions.
insert into storage.buckets (id, name, public)
values ('payment_proofs', 'payment_proofs', true)
on conflict (id) do nothing;

-- 3. Policy to allow authenticated users (or anyone with the anon key for now, handled by app logic) to upload
create policy "Allow public uploads"
on storage.objects for insert
with check ( bucket_id = 'payment_proofs' );

-- 4. Policy to allow reading the screenshots
create policy "Allow public read access"
on storage.objects for select
using ( bucket_id = 'payment_proofs' );
