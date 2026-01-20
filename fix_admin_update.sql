-- Enable Admins to UPDATE teams (e.g. approve/reject payment)
CREATE POLICY "Admins can update teams"
ON teams
FOR UPDATE
USING (
  auth.email() IN (SELECT email FROM admins)
);
