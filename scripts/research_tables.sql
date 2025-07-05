-- Research Categories Table
CREATE TABLE IF NOT EXISTS research_categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  
  -- Add constraint to ensure slug is URL-friendly
  CONSTRAINT valid_slug CHECK (slug ~* '^[a-z0-9]+(-[a-z0-9]+)*$')
);

-- Research Publication Status Enum
CREATE TYPE research_status AS ENUM ('published', 'in_review', 'ongoing');

-- Research Type Enum
CREATE TYPE research_type AS ENUM ('publication', 'book_chapter', 'article', 'conference_presentation');

-- Research Works Table
CREATE TABLE IF NOT EXISTS research_works (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  abstract TEXT,
  year INTEGER NOT NULL,
  co_authors TEXT[], -- Array of co-author names
  status research_status NOT NULL DEFAULT 'ongoing',
  research_type research_type NOT NULL,
  category_id INTEGER REFERENCES research_categories(id),
  featured_image TEXT, -- URL to featured image
  presentation_images TEXT[], -- Array of image URLs for conference presentations
  author_id UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE,
  meta_description TEXT,
  tags TEXT[],
  
  -- Add constraint to ensure slug is URL-friendly
  CONSTRAINT valid_slug CHECK (slug ~* '^[a-z0-9]+(-[a-z0-9]+)*$')
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS research_works_category_id_idx ON research_works(category_id);
CREATE INDEX IF NOT EXISTS research_works_status_idx ON research_works(status);
CREATE INDEX IF NOT EXISTS research_works_research_type_idx ON research_works(research_type);
CREATE INDEX IF NOT EXISTS research_works_year_idx ON research_works(year);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update the updated_at column
DROP TRIGGER IF EXISTS update_research_works_updated_at ON research_works;
CREATE TRIGGER update_research_works_updated_at
BEFORE UPDATE ON research_works
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Insert some initial research categories
INSERT INTO research_categories (name, slug)
VALUES 
  ('Academic Journals', 'academic-journals'),
  ('Book Chapters', 'book-chapters'),
  ('Conference Papers', 'conference-papers'),
  ('Presentations', 'presentations'),
  ('Research Projects', 'research-projects')
ON CONFLICT (slug) DO NOTHING;

-- Add RLS (Row Level Security) policies
ALTER TABLE research_works ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_categories ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to read all research works
CREATE POLICY "Authenticated users can read all research works"
  ON research_works FOR SELECT
  USING (auth.role() = 'authenticated');

-- Policy for authenticated users to insert their own research works
CREATE POLICY "Authenticated users can insert their own research works"
  ON research_works FOR INSERT
  WITH CHECK (auth.uid() = author_id);

-- Policy for authenticated users to update their own research works
CREATE POLICY "Authenticated users can update their own research works"
  ON research_works FOR UPDATE
  USING (auth.uid() = author_id);

-- Policy for authenticated users to delete their own research works
CREATE POLICY "Authenticated users can delete their own research works"
  ON research_works FOR DELETE
  USING (auth.uid() = author_id);

-- Policy for authenticated users to read all research categories
CREATE POLICY "Authenticated users can read all research categories"
  ON research_categories FOR SELECT
  USING (auth.role() = 'authenticated');

-- Policy for authenticated users to manage research categories
CREATE POLICY "Authenticated users can manage research categories"
  ON research_categories FOR ALL
  USING (auth.role() = 'authenticated');
