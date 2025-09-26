# Create Favicon Files from School Logo

To use your school logo as the browser tab icon, you need to create the following favicon files from your existing `public/images/logo.png`:

## Required Files:

1. **favicon-16x16.png** (16x16 pixels)
2. **favicon-32x32.png** (32x32 pixels) 
3. **apple-touch-icon.png** (180x180 pixels)
4. **android-chrome-192x192.png** (192x192 pixels)
5. **android-chrome-512x512.png** (512x512 pixels)

## How to Create:

### Option 1: Online Favicon Generator
1. Go to https://favicon.io/favicon-converter/
2. Upload your `public/images/logo.png`
3. Download the generated favicon package
4. Extract and copy the files to your `public/` directory

### Option 2: Using Image Editing Software
1. Open your logo in Photoshop, GIMP, or any image editor
2. Resize to each required size (16x16, 32x32, 180x180, 192x192, 512x512)
3. Save as PNG files with the exact names listed above
4. Place all files in the `public/` directory

### Option 3: Using Command Line (if you have ImageMagick)
```bash
# Navigate to your project directory
cd /Users/praneet/Work/st_angeloes_college

# Create favicon files from your logo
convert public/images/logo.png -resize 16x16 public/favicon-16x16.png
convert public/images/logo.png -resize 32x32 public/favicon-32x32.png
convert public/images/logo.png -resize 180x180 public/apple-touch-icon.png
convert public/images/logo.png -resize 192x192 public/android-chrome-192x192.png
convert public/images/logo.png -resize 512x512 public/android-chrome-512x512.png
```

## After Creating the Files:

1. Delete this `create-favicons.md` file
2. The HTML and manifest.json are already updated to use your logo
3. Your school logo will now appear in:
   - Browser tabs
   - Bookmarks
   - Mobile home screen (when saved as PWA)
   - Browser history

## File Structure After Setup:
```
public/
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
├── android-chrome-192x192.png
├── android-chrome-512x512.png
├── images/
│   └── logo.png (your original logo)
└── index.html (already updated)
```
