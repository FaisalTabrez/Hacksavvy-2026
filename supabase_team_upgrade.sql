-- Migration to upgrade Registrations to Teams

-- 1. Rename table
ALTER TABLE IF EXISTS public.registrations RENAME TO teams;

-- 2. Create table if it didn't exist (safety check)
CREATE TABLE IF NOT EXISTS public.teams (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Fix Legacy Constraints (CRITICAL FIX for "null value in column user_id")
-- The old table had 'user_id' as NOT NULL. We strictly use 'leader_user_id' now or need to relax this.
ALTER TABLE public.teams ALTER COLUMN user_id DROP NOT NULL;

-- 4. Add/Update Columns
ALTER TABLE public.teams 
  ADD COLUMN IF NOT EXISTS team_name text UNIQUE,
  ADD COLUMN IF NOT EXISTS track text,
  ADD COLUMN IF NOT EXISTS leader_user_id text,
  ADD COLUMN IF NOT EXISTS members_data jsonb,
  ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS payment_screenshot_url text,
  ADD COLUMN IF NOT EXISTS transaction_id text,
  ADD COLUMN IF NOT EXISTS accommodation_needed boolean DEFAULT false;

-- JSON Schema Documentation for 'members_data':
-- Array of Objects:
-- [
--   {
--     "name": "string",
--     "email": "string",
--     "phone": "string",
--     "college": "string",
--     "roll_no": "string",
--     "diet_preference": "Vegetarian" | "Non-Vegetarian"
--   }
-- ]

-- 4. Clean up old columns if they exist (optional, but requested schema is specific)
-- We keep them if we want to preserve old data, but for this task we focus on the new structure.
