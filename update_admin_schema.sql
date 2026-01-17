-- 1. Create the admins table
create table if not exists admins (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (Security best practice)
alter table admins enable row level security;

-- 3. Create Policy for Read Access
-- This allows checking "Am I an admin?" by trying to select your own email
create policy "Allow read access for own admin record"
on admins for select
to authenticated
using ( auth.email() = email );

-- 4. INSERT INITIAL ADMIN (Optional - you can also add manually via dashboard)
-- Replace with the actual admin email
-- insert into admins (email) values ('admin@hacksavvy.ovh');
