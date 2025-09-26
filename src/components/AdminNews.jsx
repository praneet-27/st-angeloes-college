import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const AdminNews = ({ onLogout }) => {
  const navigate = useNavigate();
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // News form state
  const [newsForm, setNewsForm] = useState({
    title: '',
    content: '',
    type: 'news'
  });
  const [showNewsForm, setShowNewsForm] = useState(false);

  // Helper function to get auth token
  const getAuthToken = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token;
  };

  // Show success notification
  const showSuccess = (message) => {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-slideInRight';
    notification.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="text-lg">✅</span>
        <span>${message}</span>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  // Show error notification
  const showError = (message) => {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-slideInRight';
    notification.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="text-lg">❌</span>
        <span>${message}</span>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  // Load news items
  const loadNewsItems = useCallback(async () => {
    setLoading(true);
    try {
      const token = await getAuthToken();
      const response = await fetch('/api/news?admin=true', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setNewsItems(result.data || []);
        } else {
          showError('Failed to load news items');
          setNewsItems([]);
        }
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (apiError) {
      showError('Error loading news items');
      setNewsItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create news item
  const createNewsItem = async () => {
    if (!newsForm.title.trim() || !newsForm.content.trim()) {
      showError('Please fill in all fields');
      return;
    }

    try {
      const token = await getAuthToken();
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newsForm)
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          showSuccess('News item created successfully!');
          setNewsForm({ title: '', content: '', type: 'news' });
          setShowNewsForm(false);
          loadNewsItems();
        } else {
          showError('Error: ' + result.error);
        }
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (apiError) {
      showError('Error creating news item');
    }
  };

  // Delete news item
  const deleteNewsItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this news item?')) {
      return;
    }
    
    try {
      const token = await getAuthToken();
      const response = await fetch(`/api/news?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          showSuccess('News item deleted successfully!');
          loadNewsItems();
        } else {
          showError('Error: ' + result.error);
        }
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (apiError) {
      showError('Error deleting news item');
    }
  };

  useEffect(() => {
    loadNewsItems();
  }, [loadNewsItems]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-6 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin')}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105"
              >
                <span className="text-lg">←</span>
                <span>Back to Dashboard</span>
              </button>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📰</span>
                <h1 className="text-2xl font-bold">News & Events Management</h1>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105"
            >
              <span className="text-lg">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 pb-12">
        {/* Stats Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center">
                <span className="text-3xl">📊</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">{newsItems.length}</h2>
                <p className="text-slate-600">Total News Items</p>
              </div>
            </div>
            <button 
              onClick={() => setShowNewsForm(!showNewsForm)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition-all duration-300 hover:from-emerald-600 hover:to-green-500"
            >
              <span className="text-lg">➕</span>
              Add News Item
            </button>
          </div>
        </div>

        {/* News Form */}
        {showNewsForm && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-lg animate-fadeIn">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Create New News Item</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Title:</label>
                <input
                  type="text"
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({...newsForm, title: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  placeholder="Enter news title"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Type:</label>
                <select
                  value={newsForm.type}
                  onChange={(e) => setNewsForm({...newsForm, type: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                >
                  <option value="news">📰 News</option>
                  <option value="event">🎉 Event</option>
                  <option value="announcement">📢 Announcement</option>
                </select>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Content:</label>
              <textarea
                value={newsForm.content}
                onChange={(e) => setNewsForm({...newsForm, content: e.target.value})}
                rows={6}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                placeholder="Enter news content"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={createNewsItem}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition-all duration-300 hover:from-emerald-600 hover:to-green-500"
              >
                <span className="text-lg">💾</span>
                Save News Item
              </button>
              <button
                onClick={() => {
                  setShowNewsForm(false);
                  setNewsForm({ title: '', content: '', type: 'news' });
                }}
                className="bg-slate-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-600 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* News Items Display */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">All News Items</h2>
            <button 
              onClick={loadNewsItems}
              className="bg-green-500/10 text-green-500 px-4 py-2 rounded-xl font-semibold flex items-center gap-2 hover:bg-green-500/20 transition-all duration-300"
            >
              <span className="text-lg">🔄</span>
              Refresh
            </button>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              <span className="ml-3 text-slate-600">Loading news items...</span>
            </div>
          ) : newsItems.length > 0 ? (
            <div className="space-y-6">
              {newsItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.type === 'news' ? 'bg-blue-100 text-blue-700' :
                          item.type === 'event' ? 'bg-green-100 text-green-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {item.type === 'news' ? '📰 News' : 
                           item.type === 'event' ? '🎉 Event' : '📢 Announcement'}
                        </span>
                        <span className="text-sm text-slate-500">
                          {new Date(item.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">{item.title}</h3>
                      <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{item.content}</p>
                    </div>
                    <button 
                      onClick={() => deleteNewsItem(item.id)}
                      className="ml-4 bg-red-500/80 hover:bg-red-500 text-white rounded-full w-10 h-10 text-sm flex items-center justify-center hover:scale-110 transition-all duration-300"
                    >
                      <span className="text-lg">×</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No news items found</h3>
              <p className="text-slate-500">No news items have been created yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNews;
