require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

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
      const { limit = 5 } = req.query;

      const { data, error } = await supabase
        .from('news_events')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(parseInt(limit));

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
    try {
      const { title, type, content, image_url, event_date, location } = req.body;

      if (!title || !type || !content) {
        return res.status(400).json({
          error: 'Missing required fields: title, type, and content are required'
        });
      }

      const { data, error } = await supabase
        .from('news_events')
        .insert([
          {
            title,
            type,
            content,
            image_url,
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
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'News/Event ID is required' });
      }

      const { error } = await supabase
        .from('news_events')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Database delete error:', error);
        throw error;
      }

      res.status(200).json({ success: true, message: 'News/Event deleted successfully' });
    } catch (error) {
      console.error('Failed to delete news/event:', error);
      res.status(500).json({ error: 'Failed to delete news/event' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
