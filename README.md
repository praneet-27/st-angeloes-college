# St. Angeloes College Website

A modern, responsive website for St. Angeloes College built with React.js and TailwindCSS, featuring a comprehensive admin portal for content management.

## 🚀 Features

### Frontend
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Modern UI**: Beautiful animations and smooth transitions
- **Multiple Pages**: Home, About, Academics, Admissions, Facilities, Contact, Gallery, Careers
- **Interactive Components**: Enquiry forms, image galleries, testimonials
- **SEO Optimized**: Semantic HTML and proper meta tags

### Admin Portal
- **Authentication**: Secure admin login with Supabase
- **Gallery Management**: Upload and organize images by sections
- **News & Events**: Create and manage news articles, events, and announcements
- **Enquiries Management**: View and export student enquiries
- **Image Upload**: Integrated with Supabase Storage
- **Excel Export**: Download enquiry data as Excel files

## 🛠️ Tech Stack

- **Frontend**: React.js, TailwindCSS, React Router
- **Backend**: Vercel Serverless Functions
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Authentication**: Supabase Auth
- **Deployment**: Vercel

## 📁 Project Structure

```
├── api/                    # Vercel serverless functions
│   ├── admin/             # Admin-specific APIs
│   ├── utils/             # Utility functions
│   ├── enquiry.js         # Enquiry form API
│   ├── gallery.js         # Gallery management API
│   └── news.js            # News & events API
├── database/              # Database schema
├── public/                # Static assets
│   ├── images/           # Image assets
│   └── index.html        # Main HTML file
├── src/                   # React source code
│   ├── components/        # React components
│   │   ├── Common/       # Reusable components
│   │   ├── Admin*        # Admin portal components
│   │   └── *.jsx         # Page components
│   ├── lib/              # Utility libraries
│   └── index.js          # App entry point
└── vercel.json           # Vercel configuration
```

## 🔧 Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd st_angeloes_college
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file with:
   ```
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   REACT_APP_SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_key
   ```

4. **Database Setup**
   - Run the SQL commands from `database/schema.sql` in your Supabase project
   - Create storage buckets: `gallery-images` and `news-images`

5. **Run locally**
   ```bash
   npm start
   ```

## 🚀 Deployment

The project is configured for Vercel deployment:

1. **Connect to Vercel**
2. **Set environment variables** in Vercel dashboard
3. **Deploy automatically** on git push

## 📱 Pages

- **Home**: Hero section, school stats, founder message, achievements, news & events
- **About**: School history, mission, vision, values
- **Academics**: Academic programs with detailed pages
- **Admissions**: Admission process, fee structure, enquiry form
- **Facilities**: School facilities and infrastructure
- **Contact**: Contact information, map, enquiry form
- **Gallery**: Photo and video galleries
- **Careers**: Job opportunities and application process

## 🔐 Admin Portal

Access: `/admin`

**Features:**
- Gallery management with image upload
- News & events creation with image support
- Enquiry management with Excel export
- Secure authentication
- Responsive admin interface

## 🎨 Design System

- **Colors**: Royal Blue (#1a3e72), Gold (#d4af37), White (#ffffff)
- **Typography**: Poppins, Roboto, Open Sans, Playfair Display
- **Animations**: Fade-in, slide, scale, float effects
- **Components**: Consistent button styles, cards, forms

## 📊 Database Schema

- **enquiries**: Student enquiry data
- **gallery**: Image metadata and organization
- **news_events**: News articles, events, and announcements
- **admin_users**: Admin authentication (if using custom auth)

## 🔧 API Endpoints

- `POST /api/enquiry` - Submit enquiry form
- `GET /api/gallery?section=<section>` - Get gallery images
- `POST /api/gallery` - Upload gallery image (admin)
- `DELETE /api/gallery?id=<id>` - Delete gallery image (admin)
- `GET /api/news` - Get news items
- `POST /api/news` - Create news item (admin)
- `DELETE /api/news?id=<id>` - Delete news item (admin)
- `GET /api/admin/enquiries` - Get all enquiries (admin)
- `GET /api/admin/enquiries?download=excel` - Export enquiries (admin)

## 📝 License

This project is proprietary to St. Angeloes College.

## 🤝 Support

For technical support or questions, please contact the development team.