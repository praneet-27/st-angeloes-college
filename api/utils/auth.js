const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseServiceKey = process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY;

console.log('Auth utility - Environment check:', {
  hasUrl: !!supabaseUrl,
  hasServiceKey: !!supabaseServiceKey,
  urlLength: supabaseUrl?.length || 0,
  serviceKeyLength: supabaseServiceKey?.length || 0
});

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables:', {
    REACT_APP_SUPABASE_URL: !!process.env.REACT_APP_SUPABASE_URL,
    REACT_APP_SUPABASE_SERVICE_ROLE_KEY: !!process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY
  });
  throw new Error('Missing Supabase environment variables');
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

/**
 * Verify if the user is authenticated and has admin role
 * @param {string} authToken - The JWT token from Authorization header
 * @returns {Promise<{isValid: boolean, user: object|null, error: string|null}>}
 */
async function verifyAdminAuth(authToken) {
  try {
    if (!authToken) {
      return { isValid: false, user: null, error: 'No authentication token provided' };
    }

    // Remove 'Bearer ' prefix if present
    const token = authToken.replace(/^Bearer\s+/i, '');

    // Verify the JWT token with Supabase
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error) {
      console.error('Token verification error:', error);
      return { isValid: false, user: null, error: 'Invalid or expired token' };
    }

    if (!user) {
      return { isValid: false, user: null, error: 'User not found' };
    }

    // Check if user has admin role
    const userRole = user.user_metadata?.role;
    if (userRole !== 'admin') {
      return { isValid: false, user: null, error: 'Admin privileges required' };
    }

    return { isValid: true, user, error: null };
  } catch (err) {
    console.error('Auth verification error:', err);
    return { isValid: false, user: null, error: 'Authentication verification failed' };
  }
}

/**
 * Middleware function to check admin authentication
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @returns {Promise<boolean>} - Returns true if authenticated, false otherwise
 */
async function requireAdminAuth(req, res) {
  const authHeader = req.headers.authorization;
  
  const { isValid, user, error } = await verifyAdminAuth(authHeader);
  
  if (!isValid) {
    res.status(401).json({
      success: false,
      error: error || 'Authentication required',
      code: 'UNAUTHORIZED'
    });
    return false;
  }

  // Add user to request object for use in route handlers
  req.user = user;
  return true;
}

module.exports = {
  verifyAdminAuth,
  requireAdminAuth,
  supabaseAdmin
};
