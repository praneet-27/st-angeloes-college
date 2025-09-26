import React, { useState, useEffect, useCallback } from 'react';

const Admin = ({ onLogout }) => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSection, setSelectedSection] = useState('Photos');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

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
        const response = await fetch('/api/admin/enquiries');
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

    setUploading(true);
    
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Data = e.target.result; // Keep the full data URL with prefix
        
        try {
          const response = await fetch('/api/gallery', {
            method: 'POST',
            headers: {
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
              showSuccess('Image uploaded successfully!');
              setSelectedFile(null);
              document.getElementById('galleryImage').value = '';
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
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      showError('Error uploading image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  // Delete gallery image
  const deleteImage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/gallery?id=${id}`, {
        method: 'DELETE'
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
      const response = await fetch('/api/admin/enquiries?download=excel');
      
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

  // Load data on component mount and when section changes
  useEffect(() => {
    loadGalleryImages();
    loadEnquiries();
  }, [selectedSection, loadGalleryImages, loadEnquiries]);

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
                <h3 className="text-2xl font-bold text-slate-800">0</h3>
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
            </div>
          </div>
          
          <button 
            onClick={uploadGalleryImage}
            disabled={uploading}
            className="bg-gradient-to-r from-royal-blue to-blue-800 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-800 hover:to-royal-blue"
          >
            {uploading ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                Uploading...
              </>
            ) : (
              <>
                <span className="text-lg">⬆️</span>
                Upload Image
              </>
            )}
          </button>
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
      </div>
    </div>
  );
};

export default Admin;
