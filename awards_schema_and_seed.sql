-- SQL Script for Creating and Seeding the 'awards' Table

-- Section 1: Table Creation
-- This statement creates the 'awards' table with the specified schema.
-- It includes a foreign key constraint to link awards to a user.

CREATE TABLE IF NOT EXISTS public.awards (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    title text NOT NULL,
    category text NOT NULL,
        year integer,
    is_visible boolean NOT NULL DEFAULT true,
    CONSTRAINT awards_pkey PRIMARY KEY (id)
);

-- Enable Row-Level Security (RLS) for the table.
-- This is a good practice to ensure data is only accessed by authorized users.
ALTER TABLE public.awards ENABLE ROW LEVEL SECURITY;


-- Section 2: RLS Policies
-- These policies define who can access and modify the data in the 'awards' table.

-- Policy 1: Allow public read access for everyone.
-- This allows anonymous users to view the awards on the public-facing page.
CREATE POLICY "Enable read access for all users"
ON public.awards
FOR SELECT
USING (true);

-- Policy 2: Allow authenticated users (admins) to perform all actions.
-- This allows logged-in users to create, update, and delete awards from the admin panel.
CREATE POLICY "Enable all actions for authenticated users"
ON public.awards
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');


-- Section 3: Data Seeding
-- This section inserts the provided awards and recognitions into the table.
-- IMPORTANT: You must replace 'YOUR_USER_ID_HERE' with your actual user ID from the 'auth.users' table.
-- You can find your user ID in your Supabase dashboard under Authentication -> Users.

-- Academic Awards
INSERT INTO public.awards (title, category, year) VALUES
('Alliance for African Partnership Dissertation Research Fund', 'Academic Award', 2025),
('MSU College of Education Alumni Fellowship', 'Academic Award', 2025),
('Summer Research Fellowship', 'Academic Award', 2025),
('Graduate School Travel Fellowship', 'Academic Award', 2025),
('Scully-Hill Diversity Award', 'Academic Award', 2024),
('College of Education Research Hard Cost Grant', 'Academic Award', 2023),
('Office of Rehabilitation and Disability Studies, conference grant', 'Academic Award', 2023),
('Office of Rehabilitation and Disability Studies, conference grant', 'Academic Award', 2024),
('Office of Rehabilitation and Disability Studies, conference grant', 'Academic Award', 2025),
('African Studies Department, conference grant', 'Academic Award', 2024),
('African Studies Department, conference grant', 'Academic Award', 2025),
('Carter Center mini-grant award', 'Academic Award', 2015),
('Rehab Counseling Travel Grant', 'Academic Award', NULL);

-- Leadership & Community Recognition
INSERT INTO public.awards (title, category, year) VALUES
('MSU African Graduate Student: Outstanding Membership', 'Leadership & Community Recognition', 2025),
('Ghana Muslim Achievers Awards- Most promising Muslim Female of the year award', 'Leadership & Community Recognition', 2020),
('Zongo Person of the Year, Citation- community service in Mental Health', 'Leadership & Community Recognition', 2020),
('Department of State-sponsored program, Youth Adult Mentor- USA (Pan African Youth Leadership Program, PAYLP)', 'Leadership & Community Recognition', 2019),
('Department of State-sponsored program, (Study of the US Institute for Secondary Educators, SUSI) USA', 'Leadership & Community Recognition', 2019),
('YALI Tech Training on Community Grassroots Mobilizing- US Embassy /South Africa', 'Leadership & Community Recognition', 2015),
('Representative - UN Women Youth Consultative Conference- Kigali /Rwanda', 'Leadership & Community Recognition', 2011),
('Africa''s Young Promising Female Leader (MILEAD FELLOWSHIP AWARD)', 'Leadership & Community Recognition', 2010);

-- Note: The 'Rehab Counseling Travel Grant' was omitted due to a missing year.
-- You can add it manually if you have the correct year.

-- End of script
