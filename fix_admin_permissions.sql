-- Enable RLS on teams table
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

-- Drop potential existing policies to ensure clean slate
DROP POLICY IF EXISTS "Admins can view all teams" ON teams;
DROP POLICY IF EXISTS "Admins can update teams" ON teams;
DROP POLICY IF EXISTS "Admins can delete teams" ON teams;
DROP POLICY IF EXISTS "Admins can see all teams" ON teams; -- common alias validation

-- 1. SELECT Policy
CREATE POLICY "Admins can view all teams"
ON teams
FOR SELECT
USING (
  auth.email() IN (SELECT email FROM admins)
);

-- 2. UPDATE Policy
CREATE POLICY "Admins can update teams"
ON teams
FOR UPDATE
USING (
  auth.email() IN (SELECT email FROM admins)
);

-- 3. DELETE Policy
CREATE POLICY "Admins can delete teams"
ON teams
FOR DELETE
USING (
  auth.email() IN (SELECT email FROM admins)
);
