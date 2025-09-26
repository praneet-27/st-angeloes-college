require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { name, email, phone, classInterested, message } = req.body;

      if (!name || !email || !phone || !classInterested || !message) {
        return res.status(400).json({
          error: 'Missing required fields: name, email, phone, classInterested, and message are required'
        });
      }

      const { data, error } = await supabase
        .from('enquiries')
        .insert([
          {
            name,
            email,
            phone,
            class_interested: classInterested,
            message,
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
        message: 'Enquiry submitted successfully',
        data: data[0]
      });

    } catch (error) {
      console.error('API error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
