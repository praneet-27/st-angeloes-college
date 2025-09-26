require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const { requireAdminAuth, supabaseAdmin } = require('../utils/auth');

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
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    // Require admin authentication for image upload
    const isAuthenticated = await requireAdminAuth(req, res);
    if (!isAuthenticated) return;

    try {
      const { imageUrl, filename } = req.body;

      if (!imageUrl) {
        return res.status(400).json({
          error: 'Missing required field: imageUrl is required'
        });
      }

      const timestamp = Date.now();
      const finalFilename = filename || `news-${timestamp}.jpg`;

      // Convert base64 data URL to buffer
      const base64Data = imageUrl.split(',')[1]; // Remove data:image/jpeg;base64, prefix
      const buffer = Buffer.from(base64Data, 'base64');

      // Upload to Supabase Storage using admin client
      const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
        .from('news-images')
        .upload(finalFilename, buffer, {
          contentType: 'image/jpeg',
          upsert: false
        });

      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        throw uploadError;
      }

      const { data: { publicUrl } } = supabaseAdmin.storage
        .from('news-images')
        .getPublicUrl(finalFilename);

      res.status(200).json({
        success: true,
        message: 'Image uploaded successfully',
        data: {
          imageUrl: publicUrl,
          storagePath: uploadData.path
        }
      });

    } catch (error) {
      console.error('API error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
