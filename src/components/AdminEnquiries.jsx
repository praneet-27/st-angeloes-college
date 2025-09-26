import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const AdminEnquiries = ({ onLogout }) => {
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // Load enquiries
  const loadEnquiries = useCallback(async () => {
    setLoading(true);
    try {
      const token = await getAuthToken();
      const response = await fetch('/api/admin/enquiries', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setEnquiries(result.data || []);
        } else {
          showError('Failed to load enquiries');
          setEnquiries([]);
        }
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (apiError) {
      showError('Error loading enquiries');
      setEnquiries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Download enquiries as Excel
  const downloadEnquiries = async () => {
    try {
      const token = await getAuthToken();
      const response = await fetch('/api/admin/enquiries?download=excel', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const blob = await response.blob();
        
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'enquiries.xlsx';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        showSuccess('Enquiries exported successfully!');
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (apiError) {
      showError('Error downloading enquiries');
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, [loadEnquiries]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-gold to-yellow-500 text-white py-6 mb-8">
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
                <span className="text-2xl">📧</span>
                <h1 className="text-2xl font-bold">Enquiries Management</h1>
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
              <div className="w-16 h-16 bg-gold/20 rounded-xl flex items-center justify-center">
                <span className="text-3xl">📊</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">{enquiries.length}</h2>
                <p className="text-slate-600">Total Enquiries</p>
              </div>
            </div>
            <button 
              onClick={downloadEnquiries}
              className="bg-gradient-to-r from-gold to-yellow-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition-all duration-300 hover:from-yellow-500 hover:to-gold"
            >
              <span className="text-lg">📊</span>
              Download Excel
            </button>
          </div>
        </div>

        {/* Enquiries Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">All Enquiries</h2>
            <button 
              onClick={loadEnquiries}
              className="bg-royal-blue/10 text-royal-blue px-4 py-2 rounded-xl font-semibold flex items-center gap-2 hover:bg-royal-blue/20 transition-all duration-300"
            >
              <span className="text-lg">🔄</span>
              Refresh
            </button>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal-blue"></div>
              <span className="ml-3 text-slate-600">Loading enquiries...</span>
            </div>
          ) : enquiries.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full bg-white/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-royal-blue to-blue-800 text-white">
                    <th className="px-6 py-4 text-left font-semibold">Name</th>
                    <th className="px-6 py-4 text-left font-semibold">Email</th>
                    <th className="px-6 py-4 text-left font-semibold">Phone</th>
                    <th className="px-6 py-4 text-left font-semibold">Class Interested</th>
                    <th className="px-6 py-4 text-left font-semibold">Message</th>
                    <th className="px-6 py-4 text-left font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((item, index) => (
                    <tr 
                      key={item.id} 
                      className="border-b border-slate-200 hover:bg-white/70 transition-all duration-300" 
                    >
                      <td className="px-6 py-4 font-medium text-slate-800">{item.name}</td>
                      <td className="px-6 py-4 text-slate-600">
                        <a href={`mailto:${item.email}`} className="text-royal-blue hover:underline">
                          {item.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        <a href={`tel:${item.phone}`} className="text-royal-blue hover:underline">
                          {item.phone}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-royal-blue/10 text-royal-blue px-3 py-1 rounded-full text-sm font-medium">
                          {item.class_interested}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 max-w-xs truncate" title={item.message}>
                        {item.message}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📧</div>
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No enquiries found</h3>
              <p className="text-slate-500">No enquiries have been submitted yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEnquiries;
