import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const AdminAuth = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Use Supabase authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.username, // Using username field as email
        password: credentials.password
      });

      if (error) {
        setError('Invalid email or password');
        console.error('Login error:', error);
      } else if (data.user) {
        // Check if user has admin role (we'll add this to user metadata)
        const userRole = data.user.user_metadata?.role;
        if (userRole === 'admin') {
          onLogin(true);
        } else {
          // Sign out if not admin
          await supabase.auth.signOut();
          setError('Access denied. Admin privileges required.');
        }
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-blue via-blue-800 to-royal-blue flex items-center justify-center p-4">
      {/* Floating Background Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gold/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
      <div className="absolute bottom-20 right-10 w-12 h-12 bg-gold/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>

      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl animate-fadeIn">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-royal-blue/10 px-6 py-3 rounded-full mb-6 animate-scaleIn">
              <span className="text-2xl">🔐</span>
              <span className="font-semibold text-lg text-royal-blue">Admin Portal</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2 animate-slideInUp" style={{ fontFamily: "'Playfair Display', serif" }}>
              St. Angeloes College
            </h1>
            <p className="text-slate-600 animate-slideInUp" style={{ animationDelay: '0.2s' }}>
              Management Dashboard Access
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="animate-slideInUp" style={{ animationDelay: '0.3s' }}>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                placeholder="Enter admin email"
              />
            </div>

            <div className="animate-slideInUp" style={{ animationDelay: '0.4s' }}>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                placeholder="Enter password"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl animate-fadeIn">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚠️</span>
                  <span className="text-sm">{error}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-royal-blue to-blue-800 text-white px-8 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-800 hover:to-royal-blue animate-slideInUp"
              style={{ animationDelay: '0.5s' }}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  Signing In...
                </>
              ) : (
                <>
                  <span className="text-lg">🚀</span>
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center animate-fadeIn" style={{ animationDelay: '0.6s' }}>
            <p className="text-xs text-slate-500">
              Authorized personnel only
            </p>
          </div>
        </div>

        {/* Back to Website Link */}
        <div className="text-center mt-6 animate-fadeIn" style={{ animationDelay: '0.7s' }}>
          <a
            href="/"
            className="text-white/80 hover:text-white transition-colors duration-300 text-sm flex items-center justify-center gap-2"
          >
            <span>←</span>
            <span>Back to Website</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
