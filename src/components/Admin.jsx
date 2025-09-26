import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const Admin = ({ onLogout }) => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSection, setSelectedSection] = useState('Photos');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
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

  // Load gallery images
  const loadGalleryImages = useCallback(async () => {
    setLoading(true);
    try {
      // Try to fetch from API
      let result;
      try {
        const response = await fetch(`/api/gallery?section=${selectedSection}`);
        if (response.ok) {
          result = await response.json();
        } else {
          throw new Error('API not available');
        }
      } catch (apiError) {
        console.log('API not available:', apiError.message);
        // Return empty data when API is not available
        result = {
          success: true,
          data: []
        };
      }
      
      if (result.success) {
        setGalleryImages(result.data || []);
      } else {
        showError('Failed to load gallery images');
        setGalleryImages([]);
      }
    } catch (error) {
      showError('Error loading gallery images');
      setGalleryImages([]);
    } finally {
      setLoading(false);
    }
  }, [selectedSection]);

  // Load enquiries
  const loadEnquiries = useCallback(async () => {
    try {
      // Try to fetch from API
      let result;
      try {
        const token = await getAuthToken();
        const response = await fetch('/api/admin/enquiries', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          result = await response.json();
        } else {
          throw new Error('API not available');
        }
      } catch (apiError) {
        console.log('API not available:', apiError.message);
        // Return empty data when API is not available
        result = {
          success: true,
          data: []
        };
      }
      
      if (result.success) {
        setEnquiries(result.data || []);
      } else {
        showError('Failed to load enquiries');
        setEnquiries([]);
      }
    } catch (error) {
      showError('Error loading enquiries');
      setEnquiries([]);
    }
  }, []);

  // Upload gallery image
  const uploadGalleryImage = async () => {
    if (!selectedFile) {
      showError('Please select an image file');
      return;
    }

    // Check file size (4MB = 4 * 1024 * 1024 bytes)
    const maxSize = 4 * 1024 * 1024; // 4MB
    if (selectedFile.size > maxSize) {
      showError('File size too large. Please select an image smaller than 4MB.');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 200);
    
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Data = e.target.result; // Keep the full data URL with prefix
        
        try {
          const token = await getAuthToken();
          const response = await fetch('/api/gallery', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              section: selectedSection,
              imageUrl: base64Data
            })
          });
          
          if (response.ok) {
            const result = await response.json();
            if (result.success) {
              clearInterval(progressInterval);
              setUploadProgress(100);
              setTimeout(() => {
                showSuccess('Image uploaded successfully!');
                setSelectedFile(null);
                document.getElementById('galleryImage').value = '';
                loadGalleryImages();
                setUploading(false);
                setUploadProgress(0);
              }, 500);
            } else {
              clearInterval(progressInterval);
              showError('Error: ' + result.error);
              setUploading(false);
              setUploadProgress(0);
            }
          } else {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
        } catch (apiError) {
          console.log('API not available:', apiError.message);
          clearInterval(progressInterval);
          showError('API not available. Please try again later.');
          setUploading(false);
          setUploadProgress(0);
        }
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      clearInterval(progressInterval);
      showError('Error uploading image: ' + error.message);
      setUploading(false);
      setUploadProgress(0);
    }
  };

  // Delete gallery image
  const deleteImage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) {
      return;
    }
    
    try {
      const token = await getAuthToken();
      const response = await fetch(`/api/gallery?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          showSuccess('Image deleted successfully!');
          loadGalleryImages();
        } else {
          showError('Error: ' + result.error);
        }
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (apiError) {
      console.log('API not available:', apiError.message);
      showError('API not available. Please try again later.');
    }
  };

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
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (apiError) {
      console.log('API not available:', apiError.message);
      showError('API not available. Please try again later.');
    }
  };

  // Load news items
  const loadNewsItems = useCallback(async () => {
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
      console.log('API not available:', apiError.message);
      setNewsItems([]);
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
      console.log('API not available:', apiError.message);
      showError('API not available. Please try again later.');
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
      console.log('API not available:', apiError.message);
      showError('API not available. Please try again later.');
    }
  };

  // Load data on component mount and when section changes
  useEffect(() => {
    loadGalleryImages();
    loadEnquiries();
    loadNewsItems();
  }, [selectedSection, loadGalleryImages, loadEnquiries, loadNewsItems]);

  return (
    <div className="min-h-screen">
      {/* Floating Background Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-royal-blue/5 rounded-full animate-float"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gold/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-royal-blue/5 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
      <div className="absolute bottom-20 right-10 w-12 h-12 bg-gold/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>

      {/* Header Section */}
      <header className="bg-gradient-to-r from-royal-blue to-blue-800 text-white py-8 mb-12 animate-fadeIn">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="text-center flex-1">
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6 animate-scaleIn">
                <span className="text-2xl">🎛️</span>
                <span className="font-semibold text-lg">Admin Portal</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slideInUp" style={{ fontFamily: "'Playfair Display', serif" }}>
                St. Angeloes College
              </h1>
              <p className="text-xl opacity-90 animate-slideInUp" style={{ animationDelay: '0.2s' }}>
                Management Dashboard
              </p>
            </div>
            <div className="animate-slideInRight" style={{ animationDelay: '0.3s' }}>
              <button
                onClick={onLogout}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105"
              >
                <span className="text-lg">🚪</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 pb-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slideInLeft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-royal-blue/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📸</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">{galleryImages.length}</h3>
                <p className="text-slate-600">Gallery Images</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slideInUp" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📧</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">{enquiries.length}</h3>
                <p className="text-slate-600">Enquiries</p>
              </div>
            </div>
          </div>
          
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slideInRight" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-royal-blue/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">📰</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">{newsItems.length}</h3>
                    <p className="text-slate-600">News & Events</p>
                  </div>
                </div>
              </div>
        </div>
        
        {/* Gallery Management */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slideInUp" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-royal-blue/20 rounded-xl flex items-center justify-center">
              <span className="text-xl">🖼️</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Gallery Management</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Section:</label>
              <select 
                value={selectedSection} 
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
              >
                <option value="Photos">📷 Photos</option>
                <option value="Videos">🎥 Videos</option>
                <option value="Annual Day">🎉 Annual Day</option>
                <option value="Sports">⚽ Sports</option>
                <option value="Cultural Events">🎭 Cultural Events</option>
                <option value="Classroom">🏫 Classroom</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Image File:</label>
              <input 
                type="file" 
                id="galleryImage"
                accept="image/*" 
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-royal-blue/10 file:text-royal-blue hover:file:bg-royal-blue/20"
              />
              {selectedFile && (
                <div className="mt-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-700">📁 {selectedFile.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                        selectedFile.size > 4 * 1024 * 1024 
                          ? 'bg-red-100 text-red-700' 
                          : selectedFile.size > 2 * 1024 * 1024 
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                      }`}>
                        {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
                      </span>
                    </div>
                  </div>
                  {selectedFile.size > 4 * 1024 * 1024 && (
                    <div className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <span>⚠️</span>
                      <span>File size exceeds 4MB limit</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <button 
            onClick={uploadGalleryImage}
            disabled={uploading || (selectedFile && selectedFile.size > 4 * 1024 * 1024)}
            className={`px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 ${
              uploading || (selectedFile && selectedFile.size > 4 * 1024 * 1024)
                ? 'bg-gray-400 text-white cursor-not-allowed opacity-50'
                : 'bg-gradient-to-r from-royal-blue to-blue-800 text-white hover:scale-105 hover:from-blue-800 hover:to-royal-blue'
            }`}
          >
            {uploading ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  <span>Uploading...</span>
                </div>
                <div className="ml-2 text-xs opacity-75">
                  Processing image...
                </div>
              </>
            ) : selectedFile && selectedFile.size > 4 * 1024 * 1024 ? (
              <>
                <span className="text-lg">⚠️</span>
                File Too Large
              </>
            ) : (
              <>
                <span className="text-lg">⬆️</span>
                Upload Image
              </>
            )}
          </button>
          
          {/* Upload Progress Bar */}
          {uploading && (
            <div className="mt-4 animate-fadeIn">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Upload Progress</span>
                <span className="text-sm text-slate-600">{Math.round(uploadProgress)}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-royal-blue to-blue-800 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <div className="mt-2 text-xs text-slate-500 text-center">
                {uploadProgress < 30 ? 'Reading file...' : 
                 uploadProgress < 60 ? 'Processing image...' : 
                 uploadProgress < 90 ? 'Uploading to server...' : 
                 uploadProgress < 100 ? 'Finalizing...' : 'Complete!'}
              </div>
            </div>
          )}
        </div>
        
        {/* Gallery Images Display */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slideInUp" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold/20 rounded-xl flex items-center justify-center">
                <span className="text-xl">🖼️</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Current Gallery Images</h2>
            </div>
            <div className="text-sm text-slate-600 bg-white/50 px-3 py-1 rounded-full">
              {galleryImages.length} images
            </div>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal-blue"></div>
              <span className="ml-3 text-slate-600">Loading images...</span>
            </div>
          ) : galleryImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {galleryImages.map((item, index) => (
                <div 
                  key={item.id} 
                  className="relative group animate-scaleIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <img src={item.image_url} alt={item.section} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                    <button 
                      onClick={() => deleteImage(item.id)}
                      className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full w-8 h-8 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center hover:scale-110"
                    >
                      <span className="text-lg">×</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 animate-fadeIn">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No images found</h3>
              <p className="text-slate-500">No images available for {selectedSection} section yet.</p>
            </div>
          )}
        </div>
        
        {/* Enquiries */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slideInUp" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold/20 rounded-xl flex items-center justify-center">
                <span className="text-xl">📧</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Enquiries</h2>
            </div>
            <button 
              onClick={downloadEnquiries}
              className="bg-gradient-to-r from-gold to-yellow-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition-all duration-300 hover:from-yellow-500 hover:to-gold"
            >
              <span className="text-lg">📊</span>
              Download Excel
            </button>
          </div>
          
          <div className="overflow-x-auto">
            {enquiries.length > 0 ? (
              <table className="w-full bg-white/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-royal-blue to-blue-800 text-white">
                    <th className="px-6 py-4 text-left font-semibold">Name</th>
                    <th className="px-6 py-4 text-left font-semibold">Email</th>
                    <th className="px-6 py-4 text-left font-semibold">Phone</th>
                    <th className="px-6 py-4 text-left font-semibold">Class Interested</th>
                    <th className="px-6 py-4 text-left font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((item, index) => (
                    <tr 
                      key={item.id}
                      className="border-b border-slate-200 hover:bg-white/70 transition-all duration-300 animate-fadeIn" 
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <td className="px-6 py-4 font-medium text-slate-800">{item.name}</td>
                      <td className="px-6 py-4 text-slate-600">{item.email}</td>
                      <td className="px-6 py-4 text-slate-600">{item.phone}</td>
                      <td className="px-6 py-4">
                        <span className="bg-royal-blue/10 text-royal-blue px-3 py-1 rounded-full text-sm font-medium">
                          {item.class_interested}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{new Date(item.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12 animate-fadeIn">
                <div className="text-6xl mb-4">📧</div>
                <h3 className="text-xl font-semibold text-slate-600 mb-2">No enquiries found</h3>
                <p className="text-slate-500">No enquiries have been submitted yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* News Management */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slideInUp" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-royal-blue/20 rounded-xl flex items-center justify-center">
                <span className="text-xl">📰</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">News & Events Management</h2>
            </div>
            <button 
              onClick={() => setShowNewsForm(!showNewsForm)}
              className="bg-gradient-to-r from-royal-blue to-blue-800 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition-all duration-300 hover:from-blue-800 hover:to-royal-blue"
            >
              <span className="text-lg">➕</span>
              Add News
            </button>
          </div>

          {/* News Form */}
          {showNewsForm && (
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 mb-6 border border-slate-200 animate-fadeIn">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Create New News Item</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Title:</label>
                  <input
                    type="text"
                    value={newsForm.title}
                    onChange={(e) => setNewsForm({...newsForm, title: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    placeholder="Enter news title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Type:</label>
                  <select
                    value={newsForm.type}
                    onChange={(e) => setNewsForm({...newsForm, type: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  >
                    <option value="news">📰 News</option>
                    <option value="event">🎉 Event</option>
                    <option value="announcement">📢 Announcement</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Content:</label>
                <textarea
                  value={newsForm.content}
                  onChange={(e) => setNewsForm({...newsForm, content: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  placeholder="Enter news content"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={createNewsItem}
                  className="bg-gradient-to-r from-royal-blue to-blue-800 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition-all duration-300 hover:from-blue-800 hover:to-royal-blue"
                >
                  <span className="text-lg">💾</span>
                  Save News
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
          <div className="overflow-x-auto">
            {newsItems.length > 0 ? (
              <div className="space-y-4">
                {newsItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all duration-300 animate-fadeIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
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
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">{item.title}</h3>
                        <p className="text-slate-600 line-clamp-3">{item.content}</p>
                      </div>
                      <button 
                        onClick={() => deleteNewsItem(item.id)}
                        className="ml-4 bg-red-500/80 hover:bg-red-500 text-white rounded-full w-8 h-8 text-sm flex items-center justify-center hover:scale-110 transition-all duration-300"
                      >
                        <span className="text-lg">×</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 animate-fadeIn">
                <div className="text-6xl mb-4">📰</div>
                <h3 className="text-xl font-semibold text-slate-600 mb-2">No news items found</h3>
                <p className="text-slate-500">No news items have been created yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
