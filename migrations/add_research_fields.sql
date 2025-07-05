-- Add new fields to research_works table
ALTER TABLE research_works 
  ADD COLUMN IF NOT EXISTS link_url TEXT,
  ADD COLUMN IF NOT EXISTS is_recent BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- Update any existing records to have default values
UPDATE research_works 
SET 
  is_recent = false,
  is_featured = false
WHERE 
  is_recent IS NULL OR is_featured IS NULL;

-- Add comment explaining the purpose of these fields
COMMENT ON COLUMN research_works.link_url IS 'Optional URL linking to the full research work';
COMMENT ON COLUMN research_works.is_recent IS 'Flag to mark recent research works';
COMMENT ON COLUMN research_works.is_featured IS 'Flag to mark featured research works for homepage display';
