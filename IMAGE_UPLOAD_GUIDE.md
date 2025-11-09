# 📸 Image Upload Guide for Pinterest Grid

## Setup Steps

### 1. Create Storage Bucket in Supabase

1. Go to [Supabase Dashboard](https://app.supabase.com/project/ajfonpzetlpmenxemofe/storage/buckets)
2. Click **"New bucket"**
3. Enter name: `grid-images`
4. Check **"Public bucket"** ✅
5. Click **"Create bucket"**

### 2. Set Storage Policies (Optional - for security)

Go to the SQL Editor and run:

```sql
-- Allow public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'grid-images' );

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'grid-images' AND auth.role() = 'authenticated' );
```

## How to Upload Images

### Method 1: Using the App (Easiest!)

1. **Open your app**
2. **Go to Grid tab**
3. **Tap the + icon** in the top right
4. **Select images** from your device
5. **For each image, add**:
   - Title (required)
   - Description (optional)
   - Category (Fashion, Food, Travel, etc.)
6. **Tap the upload button** (cloud icon)
7. **Done!** Images will appear in your grid

### Method 2: Direct Upload via Supabase Dashboard

1. Go to [Storage](https://app.supabase.com/project/ajfonpzetlpmenxemofe/storage/buckets/grid-images)
2. Click **"Upload file"**
3. Select your images
4. Copy the public URL of each uploaded image
5. Go to [SQL Editor](https://app.supabase.com/project/ajfonpzetlpmenxemofe/sql/new)
6. Run:

```sql
-- Insert pin with your image URL
INSERT INTO pins (title, description, image_url, category_id, image_height, likes_count, is_published)
VALUES (
  'Your Image Title',
  'Your description',
  'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/public/grid-images/your-image.jpg',
  1,  -- category_id: 1=Fashion, 2=Food, 3=Travel, etc.
  250,  -- height in pixels (200-300)
  100,  -- likes count
  true
);
```

## Image Requirements

- **Format**: JPG, PNG, WEBP
- **Size**: Recommended max 2MB per image
- **Dimensions**: Any size (will be optimized for display)
- **Height**: Will use random heights between 200-300px for masonry layout

## Categories

Your images can be tagged with these categories:
1. Fashion
2. Food
3. Travel
4. Home
5. Art
6. Beauty
7. Fitness
8. Tech

## Tips

✅ **Use descriptive titles** - They help users find your pins
✅ **Add descriptions** - Provides context and improves searchability
✅ **Choose the right category** - Makes filtering easier
✅ **High-quality images** - Look better in the grid

## Troubleshooting

**Images not showing?**
- Check if the bucket is set to **public**
- Verify the image URL is correct
- Make sure `is_published = true` in the database

**Upload failed?**
- Check your internet connection
- Verify Supabase project is active
- Make sure bucket exists and is accessible

## Your Grid

After uploading, your images will automatically appear in:
- **Grid Tab** - Beautiful Pinterest-style layout
- **Filtered by category** - Use category chips to filter
- **Interactive likes** - Users can like your pins

Enjoy your beautiful Pinterest-style grid! 🎨✨


