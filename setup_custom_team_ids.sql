-- 1. Add the column to the teams table
ALTER TABLE teams 
ADD COLUMN IF NOT EXISTS team_id TEXT UNIQUE;

-- 2. Create the counters table to track numbers for each category
CREATE TABLE IF NOT EXISTS track_counters (
    prefix TEXT PRIMARY KEY,
    current_count INTEGER DEFAULT 0
);

-- 3. Seed the counters table (using the prefixes we defined)
INSERT INTO track_counters (prefix, current_count) VALUES
    ('AIRD', 0),
    ('CB', 0),
    ('IVE', 0),
    ('SE', 0),
    ('OI', 0)
ON CONFLICT (prefix) DO NOTHING;

-- 4. Create the function to generate the ID
CREATE OR REPLACE FUNCTION generate_team_id()
RETURNS TRIGGER AS $$
DECLARE
    track_prefix TEXT;
    next_val INTEGER;
BEGIN
    -- Map full track names to prefixes
    CASE NEW.track
        WHEN 'AI, Automation, Robotics & Drone Technology' THEN track_prefix := 'AIRD';
        WHEN 'Cyber Security & Blockchain' THEN track_prefix := 'CB';
        WHEN 'IoT, VLSI & Embedded Systems' THEN track_prefix := 'IVE';
        WHEN 'Sustainability & Environment' THEN track_prefix := 'SE';
        WHEN 'Open Innovation' THEN track_prefix := 'OI';
        ELSE 
            -- Fallback if track doesn't match known categories
            track_prefix := 'GEN'; 
            -- Ensure GEN exists in counters if hit
            INSERT INTO track_counters (prefix, current_count) VALUES ('GEN', 0) ON CONFLICT DO NOTHING;
    END CASE;

    -- Atomically increment the counter and get the new value
    UPDATE track_counters
    SET current_count = current_count + 1
    WHERE prefix = track_prefix
    RETURNING current_count INTO next_val;

    -- Format the ID: Prefix + 3 digits (padded with zeros)
    NEW.team_id := track_prefix || LPAD(next_val::TEXT, 3, '0');

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5. Create the Trigger
CREATE OR REPLACE TRIGGER set_team_id_trigger
BEFORE INSERT ON teams
FOR EACH ROW
EXECUTE FUNCTION generate_team_id();
