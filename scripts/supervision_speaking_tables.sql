-- Create tables for supervision and speaking engagements

-- Supervision Table
CREATE TABLE IF NOT EXISTS public.supervisions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  supervisee_name TEXT NOT NULL,
  organization TEXT,
  start_date DATE,
  end_date DATE,
  is_ongoing BOOLEAN DEFAULT false,
  description TEXT,
  supervision_type TEXT NOT NULL, -- e.g., 'Clinical', 'Academic', 'Research'
  hours INTEGER,
  location TEXT,
  outcomes TEXT,
  is_featured BOOLEAN DEFAULT false,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Speaking Engagements Table
CREATE TABLE IF NOT EXISTS public.speaking_engagements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  event_name TEXT NOT NULL,
  organization TEXT NOT NULL,
  date DATE,
  location TEXT,
  description TEXT,
  audience_size TEXT, -- e.g., '50-100', '100-500'
  audience_type TEXT, -- e.g., 'Academic', 'Professional', 'Community'
  engagement_type TEXT NOT NULL, -- e.g., 'Keynote', 'Workshop', 'Panel'
  topics TEXT[],
  feedback TEXT,
  is_featured BOOLEAN DEFAULT false,
  featured_image TEXT, -- URL to image
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS supervisions_user_id_idx ON public.supervisions(user_id);
CREATE INDEX IF NOT EXISTS supervisions_supervision_type_idx ON public.supervisions(supervision_type);
CREATE INDEX IF NOT EXISTS supervisions_is_featured_idx ON public.supervisions(is_featured);

CREATE INDEX IF NOT EXISTS speaking_engagements_user_id_idx ON public.speaking_engagements(user_id);
CREATE INDEX IF NOT EXISTS speaking_engagements_engagement_type_idx ON public.speaking_engagements(engagement_type);
CREATE INDEX IF NOT EXISTS speaking_engagements_is_featured_idx ON public.speaking_engagements(is_featured);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to automatically update the updated_at column
DROP TRIGGER IF EXISTS update_supervisions_updated_at ON public.supervisions;
CREATE TRIGGER update_supervisions_updated_at
BEFORE UPDATE ON public.supervisions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_speaking_engagements_updated_at ON public.speaking_engagements;
CREATE TRIGGER update_speaking_engagements_updated_at
BEFORE UPDATE ON public.speaking_engagements
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Add RLS (Row Level Security) policies
ALTER TABLE public.supervisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.speaking_engagements ENABLE ROW LEVEL SECURITY;

-- Policies for supervisions
CREATE POLICY "Public can view supervisions"
  ON public.supervisions FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert their own supervisions"
  ON public.supervisions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update their own supervisions"
  ON public.supervisions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can delete their own supervisions"
  ON public.supervisions FOR DELETE
  USING (auth.uid() = user_id);

-- Policies for speaking engagements
CREATE POLICY "Public can view speaking engagements"
  ON public.speaking_engagements FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert their own speaking engagements"
  ON public.speaking_engagements FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update their own speaking engagements"
  ON public.speaking_engagements FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can delete their own speaking engagements"
  ON public.speaking_engagements FOR DELETE
  USING (auth.uid() = user_id);
