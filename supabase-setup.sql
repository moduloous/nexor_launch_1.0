-- =====================================================
-- SUPABASE DATABASE SETUP FOR PINTEREST GRID
-- =====================================================
-- Copy and paste this entire file into Supabase SQL Editor
-- Then run it to set up your database tables

-- 1. Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  color TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create pins table
CREATE TABLE IF NOT EXISTS pins (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  image_height INTEGER DEFAULT 250,
  category_id BIGINT REFERENCES categories(id),
  likes_count INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Insert default categories
INSERT INTO categories (name, color) VALUES
  ('Fashion', '#FF6B9D'),
  ('Food', '#FFA94D'),
  ('Travel', '#4ECDC4'),
  ('Home', '#95E1D3'),
  ('Art', '#C492B1'),
  ('Beauty', '#FFB6B9'),
  ('Fitness', '#8FD14F'),
  ('Tech', '#74B9FF')
ON CONFLICT (name) DO NOTHING;

-- 4. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_pins_category ON pins(category_id);
CREATE INDEX IF NOT EXISTS idx_pins_published ON pins(is_published);
CREATE INDEX IF NOT EXISTS idx_pins_created ON pins(created_at DESC);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE pins ENABLE ROW LEVEL SECURITY;

-- 6. Create policies for public read access
CREATE POLICY "Public can view categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Public can view published pins"
  ON pins FOR SELECT
  USING (is_published = true);

-- 7. Create policies for authenticated users (for uploads)
CREATE POLICY "Authenticated users can insert pins"
  ON pins FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'anon');

CREATE POLICY "Authenticated users can update their pins"
  ON pins FOR UPDATE
  USING (auth.role() = 'authenticated' OR auth.role() = 'anon');

-- 8. Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 9. Create trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_pins_updated_at ON pins;
CREATE TRIGGER update_pins_updated_at
  BEFORE UPDATE ON pins
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- STORAGE BUCKET POLICIES (Run these separately if needed)
-- =====================================================
-- Note: You should create the 'grid-images' bucket first via the Supabase Dashboard
-- Then run these policies:

-- Allow public read access to grid-images bucket
-- CREATE POLICY "Public Access to Grid Images"
-- ON storage.objects FOR SELECT
-- USING ( bucket_id = 'grid-images' );

-- Allow anyone to upload to grid-images bucket
-- CREATE POLICY "Anyone can upload grid images"
-- ON storage.objects FOR INSERT
-- WITH CHECK ( bucket_id = 'grid-images' );

-- =====================================================
-- VERIFICATION QUERIES (Run these to check setup)
-- =====================================================

-- Check categories
-- SELECT * FROM categories;

-- Check pins count
-- SELECT COUNT(*) as total_pins FROM pins;

-- Check pins with categories
-- SELECT 
--   p.id,
--   p.title,
--   p.image_url,
--   c.name as category_name,
--   c.color as category_color,
--   p.likes_count
-- FROM pins p
-- LEFT JOIN categories c ON p.category_id = c.id
-- WHERE p.is_published = true
-- ORDER BY p.created_at DESC
-- LIMIT 10;


