-- St. Angeloes College Database Schema
-- Run these commands in your Supabase SQL editor

-- Create enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    class_interested VARCHAR(50),
    message TEXT,
    status VARCHAR(20) DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
    id BIGSERIAL PRIMARY KEY,
    section VARCHAR(50) NOT NULL, -- 'Photos', 'Videos', 'Annual Day', 'Sports', 'Cultural Events', 'Classroom'
    title VARCHAR(255),
    description TEXT,
    image_url TEXT NOT NULL,
    storage_path TEXT, -- Path in Supabase storage
    alt_text VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create news_events table
CREATE TABLE IF NOT EXISTS news_events (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('news', 'events')),
    image_url TEXT,
    event_date DATE,
    location VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table for authentication
CREATE TABLE IF NOT EXISTS admin_users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_gallery_section ON gallery(section);
CREATE INDEX IF NOT EXISTS idx_gallery_active ON gallery(is_active);
CREATE INDEX IF NOT EXISTS idx_news_events_type ON news_events(type);
CREATE INDEX IF NOT EXISTS idx_news_events_active ON news_events(is_active);
CREATE INDEX IF NOT EXISTS idx_news_events_created_at ON news_events(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (read-only for most tables)
CREATE POLICY "Allow public read access to gallery" ON gallery
    FOR SELECT USING (is_active = true);

CREATE POLICY "Allow public read access to news_events" ON news_events
    FOR SELECT USING (is_active = true);

-- Create policies for admin access
CREATE POLICY "Allow admin full access to enquiries" ON enquiries
    FOR ALL USING (true);

CREATE POLICY "Allow admin full access to gallery" ON gallery
    FOR ALL USING (true);

CREATE POLICY "Allow admin full access to news_events" ON news_events
    FOR ALL USING (true);

-- Insert sample data
INSERT INTO gallery (section, title, description, image_url, alt_text) VALUES
('campus', 'Main Building', 'Beautiful main building of St. Angeloes College', '/images/campus/main-building.jpg', 'Main Building'),
('campus', 'Library', 'Well-stocked library with modern facilities', '/images/campus/library.jpg', 'Library'),
('events', 'Annual Day', 'Students performing at Annual Day celebration', '/images/events/annual-day.jpg', 'Annual Day'),
('activities', 'Science Fair', 'Students showcasing their science projects', '/images/activities/science-fair.jpg', 'Science Fair'),
('sports', 'Cricket Match', 'Inter-school cricket tournament', '/images/sports/cricket.jpg', 'Cricket Match');

INSERT INTO news_events (title, content, type, image_url, event_date, location) VALUES
('New Academic Year Begins', 'St. Angeloes College welcomes all students for the new academic year 2024-25. Classes will commence from April 1st, 2024.', 'news', '/images/news/new-academic-year.jpg', NULL, NULL),
('Annual Sports Day', 'Join us for our Annual Sports Day on March 15th, 2024. Various competitions and activities for all students.', 'events', '/images/events/sports-day.jpg', '2024-03-15', 'School Ground'),
('Science Exhibition', 'Our students will showcase innovative science projects in the annual science exhibition.', 'events', '/images/events/science-exhibition.jpg', '2024-03-20', 'Science Lab'),
('Parent-Teacher Meeting', 'Scheduled parent-teacher meetings for all classes. Please check the notice board for your class timings.', 'news', '/images/news/ptm.jpg', NULL, NULL);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_enquiries_updated_at BEFORE UPDATE ON enquiries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_updated_at BEFORE UPDATE ON gallery
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_events_updated_at BEFORE UPDATE ON news_events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
