require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const { requireAdminAuth, supabaseAdmin } = require('./utils/auth');

// Try both old and new environment variable names
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const { limit = 5, admin } = req.query;

      let query = supabase
        .from('news_events')
        .select('*')
        .order('created_at', { ascending: false });

      // For admin requests, don't filter by is_active
      if (admin !== 'true') {
        query = query.eq('is_active', true);
      }

      if (limit && admin !== 'true') {
        query = query.limit(parseInt(limit));
      }

      const { data, error } = await query;

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      res.status(200).json({
        success: true,
        data: data || []
      });

    } catch (error) {
      console.error('API error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'POST') {
    // Require admin authentication for POST operations
    const isAuthenticated = await requireAdminAuth(req, res);
    if (!isAuthenticated) return;

    try {
      const { title, type, content, image_url, event_date, location, imageData } = req.body;

      if (!title || !type || !content) {
        return res.status(400).json({
          error: 'Missing required fields: title, type, and content are required'
        });
      }

      let finalImageUrl = image_url;

      // Handle image upload if imageData is provided
      if (imageData) {
        try {
          const timestamp = Date.now();
          const filename = `news-${timestamp}.jpg`;

          // Convert base64 data URL to buffer
          const base64Data = imageData.split(',')[1]; // Remove data:image/jpeg;base64, prefix
          const buffer = Buffer.from(base64Data, 'base64');

          // Upload to Supabase Storage using admin client
          const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
            .from('news-images')
            .upload(filename, buffer, {
              contentType: 'image/jpeg',
              upsert: false
            });

          if (uploadError) {
            console.error('Storage upload error:', uploadError);
            throw uploadError;
          }

          const { data: { publicUrl } } = supabaseAdmin.storage
            .from('news-images')
            .getPublicUrl(filename);

          finalImageUrl = publicUrl;
        } catch (uploadError) {
          console.error('Image upload error:', uploadError);
          return res.status(500).json({ error: 'Failed to upload image' });
        }
      }

      const { data, error } = await supabase
        .from('news_events')
        .insert([
          {
            title,
            type,
            content,
            image_url: finalImageUrl,
            event_date,
            location,
            is_active: true,
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      res.status(200).json({
        success: true,
        message: 'News/Event added successfully',
        data: data[0]
      });

    } catch (error) {
      console.error('API error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'DELETE') {
    // Require admin authentication for DELETE operations
    const isAuthenticated = await requireAdminAuth(req, res);
    if (!isAuthenticated) return;

    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'News/Event ID is required' });
      }

      // First, get the news item to check if it has an image
      const { data: newsItem, error: fetchError } = await supabase
        .from('news_events')
        .select('image_url')
        .eq('id', id)
        .single();

      if (fetchError) {
        console.error('Error fetching news item:', fetchError);
        throw fetchError;
      }

      // Delete the news item from database
      const { error } = await supabase
        .from('news_events')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Database delete error:', error);
        throw error;
      }

      // If there's an image, try to delete it from storage
      if (newsItem.image_url) {
        try {
          // Extract filename from the public URL
          const urlParts = newsItem.image_url.split('/');
          const filename = urlParts[urlParts.length - 1];
          
          // Delete from Supabase Storage using admin client
          const { error: storageError } = await supabaseAdmin.storage
            .from('news-images')
            .remove([filename]);

          if (storageError) {
            console.error('Storage delete error:', storageError);
            // Don't throw error here, as the database record is already deleted
          }
        } catch (storageError) {
          console.error('Error deleting image from storage:', storageError);
          // Don't throw error here, as the database record is already deleted
        }
      }

      res.status(200).json({ success: true, message: 'News/Event and associated image deleted successfully' });
    } catch (error) {
      console.error('Failed to delete news/event:', error);
      res.status(500).json({ error: 'Failed to delete news/event' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
