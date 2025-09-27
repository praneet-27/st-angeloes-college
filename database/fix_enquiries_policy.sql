-- Fix enquiries table RLS policy to allow public INSERT
-- Run this in your Supabase SQL editor

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Allow public insert access to enquiries" ON enquiries;

-- Create policy to allow public users to insert enquiries
CREATE POLICY "Allow public insert access to enquiries" ON enquiries
    FOR INSERT WITH CHECK (true);

-- Also ensure admin can still do everything
DROP POLICY IF EXISTS "Allow admin full access to enquiries" ON enquiries;
CREATE POLICY "Allow admin full access to enquiries" ON enquiries
    FOR ALL USING (true);
