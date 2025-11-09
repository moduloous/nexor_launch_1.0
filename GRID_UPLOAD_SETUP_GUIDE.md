# 📸 Complete Guide: Upload Images from PC to Supabase Grid

This guide will walk you through setting up the complete image upload system for your Pinterest-style grid.

---

## 🎯 Quick Overview

You'll be able to:
1. ✅ Upload images directly from your phone/PC
2. ✅ Add titles, descriptions, and categories
3. ✅ Store images in Supabase Storage
4. ✅ Display them in a beautiful Pinterest-style grid
5. ✅ Like and interact with pins

---

## 📋 Setup Steps

### Step 1: Set Up Supabase Database Tables

1. **Go to your Supabase Dashboard**
   - Open: https://app.supabase.com/project/ajfonpzetlpmenxemofe

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query"

3. **Run the Setup SQL**
   - Open the file `supabase-setup.sql` in this project
   - Copy ALL the content
   - Paste it into the SQL Editor
   - Click **"Run"** (or press Ctrl+Enter)

4. **Verify Tables Created**
   - Go to "Table Editor" in the sidebar
   - You should see two new tables: `categories` and `pins`
   - Categories table should have 8 categories pre-populated

---

### Step 2: Create Storage Bucket

1. **Go to Storage**
   - Click "Storage" in the left sidebar
   - Click "New bucket"

2. **Create the Bucket**
   - Name: `grid-images`
   - ✅ Check "Public bucket" (important!)
   - Click "Create bucket"

3. **Set Storage Policies** (Optional but recommended)
   - Click on the `grid-images` bucket
   - Go to "Policies" tab
   - Click "New policy"
   - Choose "For full customization"
   - Paste this for SELECT (read access):

   ```sql
   CREATE POLICY "Public Access to Grid Images"
   ON storage.objects FOR SELECT
   USING ( bucket_id = 'grid-images' );
   ```

   - Create another policy for INSERT (upload access):

   ```sql
   CREATE POLICY "Anyone can upload grid images"
   ON storage.objects FOR INSERT
   WITH CHECK ( bucket_id = 'grid-images' );
   ```

---

### Step 3: Test the Upload Feature

1. **Run your app**
   ```bash
   npm start
   ```

2. **Go to the Grid tab**
   - You should see mock images (fallback data)

3. **Click the + icon** (top right)
   - This opens the upload screen

4. **Select images**
   - Click "Select Images"
   - Choose 1 or more images from your device

5. **Add details for each image**
   - Click on each image thumbnail
   - Add a **Title** (required)
   - Add a **Description** (optional)
   - Select a **Category**

6. **Upload**
   - Click the cloud upload icon (top right)
   - Wait for the success message
   - Click "View Grid" to see your uploaded images

---

## 🖼️ How It Works

### Data Flow

```
Your Device → Pick Images → Add Details → Upload to Supabase Storage
                                                    ↓
                                          Get Public URL
                                                    ↓
                                    Insert record to 'pins' table
                                                    ↓
                                    Display in Grid Tab (auto-refresh)
```

### Database Structure

**Categories Table:**
```
- id (auto-generated)
- name (Fashion, Food, Travel, etc.)
- color (hex color for category badge)
```

**Pins Table:**
```
- id (auto-generated)
- title (your image title)
- description (optional description)
- image_url (Supabase storage URL)
- image_height (for masonry layout)
- category_id (links to categories)
- likes_count (number of likes)
- is_published (show/hide pin)
- created_at (timestamp)
```

---

## 📱 Using the Upload Feature

### From Mobile App (React Native)

1. Open app on your phone
2. Navigate to Grid tab
3. Tap + icon
4. Select images from camera roll
5. Fill in details
6. Upload!

### From Web/PC (if running web version)

1. Run: `npm run web`
2. Open in browser
3. Navigate to Grid tab
4. Click + icon
5. Select images from your computer
6. Fill in details
7. Upload!

---

## 🎨 Image Guidelines

**Recommended:**
- Format: JPG, PNG, WEBP
- Size: Under 2MB per image
- Dimensions: Any size (automatically optimized)
- Quality: High resolution for best results

**Categories Available:**
1. 🎨 Fashion - Clothing, style, outfits
2. 🍕 Food - Recipes, restaurants, cooking
3. ✈️ Travel - Destinations, adventures, places
4. 🏠 Home - Interior design, decor, DIY
5. 🎭 Art - Paintings, drawings, creative works
6. 💄 Beauty - Makeup, skincare, hair
7. 💪 Fitness - Workouts, yoga, health
8. 💻 Tech - Gadgets, apps, technology

---

## 🔧 Troubleshooting

### Images not appearing in grid?

**Check these:**
1. ✅ Storage bucket `grid-images` is created and **public**
2. ✅ Database tables are created (run SQL setup again)
3. ✅ Images have `is_published = true` in database
4. ✅ Category is correctly assigned

**Verify in Supabase:**
```sql
-- Check your uploaded pins
SELECT 
  p.id,
  p.title,
  p.image_url,
  c.name as category,
  p.is_published
FROM pins p
LEFT JOIN categories c ON p.category_id = c.id
ORDER BY p.created_at DESC
LIMIT 10;
```

### Upload fails?

**Common fixes:**
1. Check internet connection
2. Verify Supabase project is active
3. Check bucket permissions (should be public)
4. Make sure all required fields are filled (title is required)
5. Check console logs for specific error messages

### Mock images still showing?

This is normal! The app shows mock data as fallback when:
- Database is empty (no pins uploaded yet)
- Supabase connection fails
- Tables don't exist yet

**To show only your images:**
- Upload at least one image
- The grid will automatically switch to showing Supabase data

---

## 🚀 Advanced Features

### Bulk Upload

The upload screen supports multiple images:
1. Select multiple images at once
2. Click through each thumbnail to add details
3. Upload all at once

### Edit Pin Details Later

Currently not supported in the app, but you can edit via Supabase Dashboard:
1. Go to Table Editor → pins
2. Find your pin
3. Click to edit any field
4. Changes appear instantly in the app (after refresh)

### Delete Pins

Via Supabase Dashboard:
1. Go to Table Editor → pins
2. Find the pin you want to delete
3. Click the trash icon
4. Or set `is_published = false` to hide it

### View Storage Usage

1. Go to Settings → Storage
2. See how much space you're using
3. Supabase free tier includes 1GB storage

---

## 📊 What's Already Set Up

✅ Upload screen (`app/upload-images.tsx`)
✅ Grid display (`app/(tabs)/grid.tsx`)
✅ Supabase client (`lib/supabase.ts`)
✅ Database setup SQL (`supabase-setup.sql`)
✅ Mock data fallback (`app/data/gridPins.ts`)
✅ Category filtering
✅ Like functionality
✅ Masonry layout
✅ Urbanist font styling

---

## 🎉 You're Ready!

Follow the 3 setup steps above, and you'll be uploading and displaying images in minutes!

**Quick Checklist:**
- [ ] Run SQL setup in Supabase
- [ ] Create `grid-images` storage bucket (make it public)
- [ ] Test upload from your app
- [ ] View your images in the Grid tab

Need help? Check the console logs or Supabase logs for detailed error messages.

---

## 📸 Example Upload Workflow

```
1. User taps + icon in Grid tab
2. Opens upload screen
3. Selects 5 fashion photos
4. For each photo:
   - Title: "Summer Beach Outfit"
   - Description: "Casual summer vibes"
   - Category: Fashion
5. Taps cloud upload icon
6. App uploads to Supabase:
   - Uploads image to storage/grid-images/
   - Gets public URL
   - Finds Fashion category ID
   - Inserts record to pins table
7. Success! Navigate to Grid tab
8. See uploaded images in Pinterest layout
```

Happy uploading! 🎨✨


