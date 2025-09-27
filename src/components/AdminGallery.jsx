import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const AdminGallery = ({ onLogout }) => {
  const navigate = useNavigate();
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSection, setSelectedSection] = useState('Photos');
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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
      const response = await fetch(`/api/gallery?section=${selectedSection}`);
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setGalleryImages(result.data || []);
        } else {
          showError('Failed to load gallery images');
          setGalleryImages([]);
        }
      } else {
        throw new Error('API not available');
      }
    } catch (error) {
      showError('Error loading gallery images');
      setGalleryImages([]);
    } finally {
      setLoading(false);
    }
  }, [selectedSection]);

  // Upload gallery item (image or video)
  const uploadGalleryItem = async () => {
    // Check if it's a video section
    if (selectedSection === 'Videos') {
      if (!videoUrl.trim()) {
        showError('Please enter a video URL');
        return;
      }
      
      // Validate URL format
      const urlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|instagram\.com|vimeo\.com)/;
      if (!urlPattern.test(videoUrl.trim())) {
        showError('Please enter a valid YouTube, Instagram, or Vimeo URL');
        return;
      }
    } else {
      if (!selectedFile) {
        showError('Please select an image file');
        return;
      }

      console.log('Selected file:', selectedFile.name, 'Size:', (selectedFile.size / (1024 * 1024)).toFixed(2), 'MB');
      
      const maxSize = 4 * 1024 * 1024; // 4MB
      if (selectedFile.size > maxSize) {
        showError('File size too large. Please select an image smaller than 4MB.');
        return;
      }
    }

    setUploading(true);
    setUploadProgress(0);
    
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 200);
    
    try {
      if (selectedSection === 'Videos') {
        // For videos, send the URL directly
        const requestBody = {
          section: selectedSection,
          videoUrl: videoUrl.trim()
        };
        await submitToAPI(requestBody, progressInterval);
      } else {
        // For images, convert to base64
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            console.log('FileReader onload - starting base64 conversion');
            const base64Data = e.target.result;
            console.log('Base64 data length:', base64Data.length);
            const requestBody = {
              section: selectedSection,
              imageUrl: base64Data
            };
            console.log('Calling submitToAPI for image');
            await submitToAPI(requestBody, progressInterval);
          } catch (error) {
            console.error('Error in FileReader onload:', error);
            clearInterval(progressInterval);
            showError('Error uploading item: ' + error.message);
            setUploading(false);
            setUploadProgress(0);
          }
        };
        reader.onerror = (error) => {
          console.error('FileReader error:', error);
          clearInterval(progressInterval);
          showError('Error reading file');
          setUploading(false);
          setUploadProgress(0);
        };
        reader.onloadstart = () => {
          console.log('FileReader started reading file');
        };
        reader.onloadend = () => {
          console.log('FileReader finished reading file');
        };
        console.log('Starting FileReader.readAsDataURL');
        reader.readAsDataURL(selectedFile);
      }
    } catch (error) {
      clearInterval(progressInterval);
      showError('Error uploading item: ' + error.message);
      setUploading(false);
      setUploadProgress(0);
    }
  };

  // Submit to API
  const submitToAPI = async (requestBody, progressInterval) => {
    try {
      console.log('Submitting to API:', requestBody);
      const token = await getAuthToken();
      console.log('Auth token:', token ? 'Present' : 'Missing');
      
      if (!token) {
        clearInterval(progressInterval);
        showError('Authentication required. Please login again.');
        setUploading(false);
        setUploadProgress(0);
        return;
      }
      
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });
      
      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Response result:', result);
      
      if (response.ok && result.success) {
        clearInterval(progressInterval);
        setUploadProgress(100);
        
        // For videos, don't delay - immediate response
        if (selectedSection === 'Videos') {
          showSuccess('Video added successfully!');
          setVideoUrl('');
          loadGalleryImages(); // Immediate refresh for videos
          setUploading(false);
          setUploadProgress(0);
        } else {
          // For images, keep the delay for UX
          setTimeout(() => {
            showSuccess('Image uploaded successfully!');
            setSelectedFile(null);
            document.getElementById('galleryImage').value = '';
            loadGalleryImages();
            setUploading(false);
            setUploadProgress(0);
          }, 500);
        }
      } else {
        clearInterval(progressInterval);
        showError(`Error: ${result.error || response.statusText || 'Unknown error'}`);
        setUploading(false);
        setUploadProgress(0);
      }
    } catch (apiError) {
      console.error('API Error:', apiError);
      clearInterval(progressInterval);
      showError('API not available. Please try again later.');
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
      showError('API not available. Please try again later.');
    }
  };

  useEffect(() => {
    loadGalleryImages();
  }, [loadGalleryImages]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-royal-blue to-blue-800 text-white py-6 mb-8">
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
                <span className="text-2xl">🖼️</span>
                <h1 className="text-2xl font-bold">Gallery Management</h1>
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
        {/* Upload Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            {selectedSection === 'Videos' ? 'Add New Video' : 'Upload New Image'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Section:</label>
              <select 
                value={selectedSection} 
                onChange={(e) => {
                  setSelectedSection(e.target.value);
                  setSelectedFile(null);
                  setVideoUrl('');
                  document.getElementById('galleryImage').value = '';
                }}
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
              {selectedSection === 'Videos' ? (
                <>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Video URL:</label>
                  <input 
                    type="url" 
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... or https://www.instagram.com/p/..."
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  />
                  <div className="mt-2 text-xs text-slate-500">
                    Supported: YouTube, Instagram, Vimeo links
                  </div>
                  {videoUrl && (
                    <div className="mt-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-700">🔗 {videoUrl}</span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
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
                        <span className="text-sm font-medium text-slate-700">📁 {selectedFile.name}</span>
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
                      {selectedFile.size > 4 * 1024 * 1024 && (
                        <div className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <span>⚠️</span>
                          <span>File size exceeds 4MB limit</span>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          
          <button 
            onClick={uploadGalleryItem}
            disabled={uploading || 
              (selectedSection === 'Videos' ? !videoUrl.trim() : !selectedFile) ||
              (selectedFile && selectedFile.size > 4 * 1024 * 1024)
            }
            className={`px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 ${
              uploading || 
              (selectedSection === 'Videos' ? !videoUrl.trim() : !selectedFile) ||
              (selectedFile && selectedFile.size > 4 * 1024 * 1024)
                ? 'bg-gray-400 text-white cursor-not-allowed opacity-50'
                : 'bg-gradient-to-r from-royal-blue to-blue-800 text-white hover:scale-105 hover:from-blue-800 hover:to-royal-blue'
            }`}
          >
            {uploading ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  <span>{selectedSection === 'Videos' ? 'Adding...' : 'Uploading...'}</span>
                </div>
              </>
            ) : selectedFile && selectedFile.size > 4 * 1024 * 1024 ? (
              <>
                <span className="text-lg">⚠️</span>
                File Too Large
              </>
            ) : (
              <>
                <span className="text-lg">{selectedSection === 'Videos' ? '🎥' : '⬆️'}</span>
                {selectedSection === 'Videos' ? 'Add Video' : 'Upload Image'}
              </>
            )}
          </button>
          
          {/* Upload Progress Bar */}
          {uploading && (
            <div className="mt-4">
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
            </div>
          )}
        </div>
        
        {/* Gallery Images Display */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Current Gallery Images</h2>
            <div className="text-sm text-slate-600 bg-white/50 px-3 py-1 rounded-full">
              {galleryImages.length} images in {selectedSection}
            </div>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal-blue"></div>
              <span className="ml-3 text-slate-600">Loading images...</span>
            </div>
          ) : galleryImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {galleryImages.map((item) => (
                <div key={item.id} className="relative group">
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
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No images found</h3>
              <p className="text-slate-500">No images available for {selectedSection} section yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminGallery;
