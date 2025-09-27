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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // GET - Public access to active job openings
  if (req.method === 'GET') {
    try {
      const { department, job_type, featured } = req.query;

      let query = supabase
        .from('job_openings')
        .select('*')
        .eq('is_active', true)
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      // Apply filters if provided
      if (department) {
        query = query.eq('department', department);
      }
      if (job_type) {
        query = query.eq('job_type', job_type);
      }
      if (featured === 'true') {
        query = query.eq('is_featured', true);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      res.status(200).json({
        success: true,
        data: data || [],
        count: data?.length || 0
      });

    } catch (error) {
      console.error('API error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // POST - Admin only: Create new job opening
  if (req.method === 'POST') {
    // Require admin authentication for POST operations
    const isAuthenticated = await requireAdminAuth(req, res);
    if (!isAuthenticated) return;

    try {
      const {
        title,
        department,
        job_type,
        location,
        description,
        requirements,
        responsibilities,
        benefits,
        salary_range,
        experience_level,
        education_required,
        application_deadline,
        is_featured
      } = req.body;

      // Validate required fields
      if (!title || !department || !job_type || !description) {
        return res.status(400).json({
          error: 'Missing required fields: title, department, job_type, and description are required'
        });
      }

      const { data, error } = await supabase
        .from('job_openings')
        .insert([
          {
            title,
            department,
            job_type,
            location: location || 'St. Angeloes College, Lucknow',
            description,
            requirements,
            responsibilities,
            benefits,
            salary_range,
            experience_level,
            education_required,
            application_deadline,
            is_featured: is_featured || false,
            is_active: true
          }
        ])
        .select();

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      res.status(201).json({
        success: true,
        message: 'Job opening created successfully',
        data: data[0]
      });

    } catch (error) {
      console.error('API error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // PUT - Admin only: Update existing job opening
  if (req.method === 'PUT') {
    // Require admin authentication for PUT operations
    const isAuthenticated = await requireAdminAuth(req, res);
    if (!isAuthenticated) return;

    try {
      const { id } = req.query;
      const updateData = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Job opening ID is required' });
      }

      // Remove id from update data to prevent conflicts
      delete updateData.id;
      delete updateData.created_at;

      const { data, error } = await supabase
        .from('job_openings')
        .update(updateData)
        .eq('id', id)
        .select();

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      if (data.length === 0) {
        return res.status(404).json({ error: 'Job opening not found' });
      }

      res.status(200).json({
        success: true,
        message: 'Job opening updated successfully',
        data: data[0]
      });

    } catch (error) {
      console.error('API error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // DELETE - Admin only: Delete job opening (soft delete by setting is_active to false)
  if (req.method === 'DELETE') {
    // Require admin authentication for DELETE operations
    const isAuthenticated = await requireAdminAuth(req, res);
    if (!isAuthenticated) return;

    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'Job opening ID is required' });
      }

      const { data, error } = await supabase
        .from('job_openings')
        .update({ is_active: false })
        .eq('id', id)
        .select();

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      if (data.length === 0) {
        return res.status(404).json({ error: 'Job opening not found' });
      }

      res.status(200).json({
        success: true,
        message: 'Job opening deleted successfully',
        data: data[0]
      });

    } catch (error) {
      console.error('API error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Method not allowed
  res.status(405).json({ error: 'Method not allowed' });
}
