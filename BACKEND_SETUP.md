# St. Angeloes College - Backend Setup Guide

## 🚀 Quick Setup Instructions

### 1. Supabase Setup

1. **Create Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up and create a new project
   - Choose **Asia Pacific (Mumbai)** region for low latency

2. **Set up Database**
   - Go to SQL Editor in your Supabase dashboard
   - Copy and paste the contents of `database/schema.sql`
   - Run the SQL script to create all tables

3. **Get API Keys**
   - Go to Settings > API
   - Copy your Project URL and anon public key

### 2. Environment Variables

Create a `.env.local` file in your project root:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# YouTube API Key (optional - for video gallery)
YOUTUBE_API_KEY=your_youtube_api_key

# Admin Authentication
ADMIN_EMAIL=admin@stangeloescollege.edu
ADMIN_PASSWORD=your_secure_password
```

### 3. YouTube API Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable YouTube Data API v3
4. Create credentials (API Key)
5. Add the key to your `.env.local` file

### 4. Run the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Or continue with React (current setup)
npm run react-start
```

## 📊 API Endpoints

### Enquiry Form
- **POST** `/api/enquiry` - Submit enquiry form
- **GET** `/api/admin/enquiries` - Get all enquiries (admin)
- **GET** `/api/admin/enquiries?format=excel` - Download Excel

### Gallery
- **GET** `/api/gallery?section=campus` - Get gallery images by section
- **POST** `/api/gallery` - Add new gallery item (admin)

### News & Events
- **GET** `/api/news` - Get all news and events
- **GET** `/api/news?type=news` - Get only news
- **GET** `/api/news?type=events` - Get only events
- **POST** `/api/news` - Add news/event (admin)
- **DELETE** `/api/news?id=123` - Delete news/event (admin)

## 🎯 Admin Portal

Access the admin portal at: `http://localhost:3000/admin`

Features:
- ✅ View all enquiries
- ✅ Download enquiries as Excel
- ✅ Manage gallery images
- ✅ Manage news and events

## 🗄️ Database Tables

### enquiries
- `id` - Primary key
- `name` - Student/parent name
- `email` - Email address
- `phone` - Phone number
- `class_interested` - Class they're interested in
- `message` - Additional message
- `status` - new/contacted/closed
- `created_at` - Submission timestamp

### gallery
- `id` - Primary key
- `section` - campus/events/activities/sports
- `title` - Image title
- `description` - Image description
- `image_url` - Image URL
- `alt_text` - Alt text for accessibility
- `is_active` - Show/hide image

### news_events
- `id` - Primary key
- `title` - News/event title
- `content` - Full content
- `type` - news/events
- `image_url` - Featured image
- `event_date` - Event date (for events)
- `location` - Event location
- `is_active` - Show/hide

## 🔧 Frontend Integration

### Update Contact Form
```javascript
const handleSubmit = async (e) => {
  e.preventDefault()
  const response = await fetch('/api/enquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  const result = await response.json()
  // Handle response
}
```

### Update Gallery Component
```javascript
const fetchGallery = async (section) => {
  const response = await fetch(`/api/gallery?section=${section}`)
  const data = await response.json()
  if (data.success) {
    setGalleryItems(data.data)
  }
}
```

### Update News Component
```javascript
const fetchNews = async () => {
  const response = await fetch('/api/news?limit=6')
  const data = await response.json()
  if (data.success) {
    setNews(data.data)
  }
}
```

## 🚀 Deployment

### Vercel Deployment
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production
Add these in your Vercel dashboard:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `YOUTUBE_API_KEY` (optional)

## 📱 Features Implemented

✅ **Enquiry Form API** - Store form submissions in database
✅ **Gallery API** - Dynamic gallery with section filtering
✅ **News & Events API** - Manage homepage content
✅ **Admin Portal** - View enquiries and manage content
✅ **Excel Export** - Download enquiry data
✅ **YouTube Integration** - Video gallery from YouTube
✅ **Database Schema** - Complete table structure
✅ **CORS Support** - Cross-origin requests enabled
✅ **Error Handling** - Proper error responses
✅ **Data Validation** - Input validation and sanitization

## 🎯 Next Steps

1. Set up Supabase project
2. Run database schema
3. Add environment variables
4. Test API endpoints
5. Update frontend components
6. Deploy to production

## 📞 Support

If you need help with setup, check:
- Supabase documentation
- Next.js API routes guide
- Vercel deployment guide
