require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const { requireAdminAuth, supabaseAdmin } = require('./utils/auth');

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Client for public operations
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const { section } = req.query;

      if (!section) {
        return res.status(400).json({ error: 'Section parameter is required' });
      }

      // Fetch from database
      const { data: dbImages, error: dbError } = await supabase
        .from('gallery')
        .select('*')
        .eq('section', section)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (dbError) {
        console.error('Database error:', dbError);
        throw dbError;
      }

      // For Videos section, also fetch from YouTube
      let youtubeVideos = [];
      if (section === 'Videos') {
        // You can add YouTube API integration here if needed
        // For now, we'll just return the database images
      }

      res.status(200).json({
        success: true,
        data: dbImages || [],
        type: 'images'
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
      const { section, imageUrl, videoUrl } = req.body;

      if (!section || (!imageUrl && !videoUrl)) {
        return res.status(400).json({
          error: 'Missing required fields: section and either imageUrl or videoUrl are required'
        });
      }

      let finalImageUrl = imageUrl;
      let storagePath = null;

      if (imageUrl) {
        // Handle image upload
        const timestamp = Date.now();
        const filename = `gallery-${section}-${timestamp}.jpg`;

        // Convert base64 data URL to buffer
        const base64Data = imageUrl.split(',')[1]; // Remove data:image/jpeg;base64, prefix
        const buffer = Buffer.from(base64Data, 'base64');

        // Upload to Supabase Storage using admin client
        const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
          .from('gallery-images')
          .upload(filename, buffer, {
            contentType: 'image/jpeg',
            upsert: false
          });

        if (uploadError) {
          console.error('Storage upload error:', uploadError);
          throw uploadError;
        }

        const { data: { publicUrl } } = supabaseAdmin.storage
          .from('gallery-images')
          .getPublicUrl(filename);

        finalImageUrl = publicUrl;
        storagePath = uploadData.path;
      } else if (videoUrl) {
        // Handle video URL - store the URL directly
        finalImageUrl = videoUrl;
      }

      const { data, error } = await supabase
        .from('gallery')
        .insert([
          {
            section,
            image_url: finalImageUrl,
            storage_path: storagePath,
            is_active: true,
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (error) {
        console.error('Database error:', error);
        // If database insert fails and we uploaded a file, clean it up
        if (storagePath) {
          await supabaseAdmin.storage.from('gallery-images').remove([storagePath]);
        }
        throw error;
      }

      res.status(200).json({
        success: true,
        message: imageUrl ? 'Gallery item added successfully' : 'Video added successfully',
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
        return res.status(400).json({ error: 'Gallery item ID is required' });
      }

      const { data: galleryItem, error: fetchError } = await supabase
        .from('gallery')
        .select('storage_path')
        .eq('id', id)
        .single();

      if (fetchError) {
        console.error('Error fetching gallery item:', fetchError);
        throw fetchError;
      }

      if (galleryItem.storage_path) {
        const { error: storageError } = await supabaseAdmin.storage
          .from('gallery-images')
          .remove([galleryItem.storage_path]);

        if (storageError) {
          console.error('Storage delete error:', storageError);
        }
      }

      const { error: deleteError } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

      if (deleteError) {
        console.error('Database delete error:', deleteError);
        throw deleteError;
      }

      res.status(200).json({ success: true, message: 'Gallery item deleted successfully' });
    } catch (error) {
      console.error('Failed to delete gallery item:', error);
      res.status(500).json({ error: 'Failed to delete gallery item' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
