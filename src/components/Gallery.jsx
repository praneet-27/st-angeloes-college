import React, { useEffect, useState, useRef, useCallback } from 'react';

// Move galleryTabs outside component to avoid dependency issues
const GALLERY_TABS = ['Photos', 'Videos', 'Annual Day', 'Sports', 'Cultural Events', 'Classroom'];

const Gallery = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [tabsVisible, setTabsVisible] = useState(false);
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Photos');
  const [galleryData, setGalleryData] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const sectionRef = useRef(null);

  // Helper function to get video thumbnail
  const getVideoThumbnail = (videoUrl) => {
    if (!videoUrl) return '/images/placeholder-video.jpg';
    
    // YouTube thumbnail
    if (videoUrl.includes('youtube.com/watch') || videoUrl.includes('youtu.be/')) {
      let videoId = '';
      if (videoUrl.includes('youtube.com/watch')) {
        videoId = videoUrl.split('v=')[1]?.split('&')[0];
      } else if (videoUrl.includes('youtu.be/')) {
        videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0];
      }
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
    }
    
    // Instagram thumbnail using multiple fallback methods
    if (videoUrl.includes('instagram.com/')) {
      // Try to extract Instagram post ID
      const instagramMatch = videoUrl.match(/instagram\.com\/(p|reel)\/([^/?]+)/);
      if (instagramMatch) {
        // For now, let's use a beautiful Instagram-style placeholder
        // In the future, we could implement a backend service to fetch Instagram thumbnails
        // const postId = instagramMatch[2]; // Will be used when implementing real thumbnail fetching
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImlnR3JhZCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRjYwODU7c3RvcC1vcGFjaXR5OjEiIC8+CjxzdG9wIG9mZnNldD0iMjUlIiBzdHlsZT0ic3RvcC1jb2xvcjojRkZDNDUzO3N0b3Atb3BhY2l0eToxIiAvPgo8c3RvcCBvZmZzZXQ9IjUwJSIgc3R5bGU9InN0b3AtY29sb3I6I0YzNDk1NTtzdG9wLW9wYWNpdHk6MSIgLz4KPHN0b3Agb2Zmc2V0PSI3NSUiIHN0eWxlPSJzdG9wLWNvbG9yOiNFMTMwQjU7c3RvcC1vcGFjaXR5OjEiIC8+CjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I0M4MzJBNTtzdG9wLW9wYWNpdHk6MSIgLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNpZ0dyYWQpIi8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjEyMCIgcj0iNDAiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuOSIvPgo8Y2lyY2xlIGN4PSIxNTAiIGN5PSIxMzAiIHI9IjE1IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjkiLz4KPHN2ZyB4PSIxMjAiIHk9IjE2MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjciPgo8cGF0aCBkPSJNMzAgMTBMMjAgMjBMMTAgMTBMMjAgMEwzMCAxMFoiLz4KPC9zdmc+Cjx0ZXh0IHg9IjE1MCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsLW9wYWNpdHk9IjAuOCIgZHk9Ii4zZW0iPkluc3RhZ3JhbTwvdGV4dD4KPC9zdmc+';
      }
      
      // Generic Instagram placeholder if URL doesn't match expected pattern
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjM0OTU1Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW5zdGFncmFtPC90ZXh0Pgo8L3N2Zz4K';
    }
    
    // Vimeo thumbnail (if needed in future)
    if (videoUrl.includes('vimeo.com/')) {
      const vimeoMatch = videoUrl.match(/vimeo\.com\/(\d+)/);
      if (vimeoMatch) {
        const videoId = vimeoMatch[1];
        return `https://vumbnail.com/${videoId}.jpg`;
      }
    }
    
    // Default thumbnail
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNjY2Ii8+CjxwYXRoIGQ9Ik0xMjAgMTMwSDE4MFYxNzBIMTIwVjEzMFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xNDAgMTMwTDE3MCAxNTBMMTQwIDE3MFYxMzBaIiBmaWxsPSIjNjY2Ii8+Cjwvc3ZnPgo=';
  };

  // Helper function to get video platform icon
  const getVideoPlatformIcon = (videoUrl) => {
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be/')) {
      return '🎥'; // YouTube icon
    } else if (videoUrl.includes('instagram.com')) {
      return '📷'; // Instagram icon
    } else if (videoUrl.includes('vimeo.com')) {
      return '🎬'; // Vimeo icon
    }
    return '🎥'; // Default video icon
  };

  // Open image modal
  const openImageModal = (imageUrl, title) => {
    setSelectedImage({ url: imageUrl, title: title });
    setIsImageModalOpen(true);
  };

  // Close image modal
  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImage(null);
  };

  // Fetch gallery data for a specific section
  const fetchGallerySection = useCallback(async (section) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/gallery?section=${section}`);
      const result = await response.json();
      
      if (response.ok && result.success) {
        setGalleryData(prev => ({
          ...prev,
          [section]: result.data || []
        }));
      } else {
        console.error(`Failed to fetch ${section}:`, result.error);
        setGalleryData(prev => ({
          ...prev,
          [section]: []
        }));
      }
    } catch (error) {
      console.error(`Error fetching ${section}:`, error);
      setGalleryData(prev => ({
        ...prev,
        [section]: []
      }));
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch all gallery sections on component mount
  useEffect(() => {
    GALLERY_TABS.forEach(section => {
      fetchGallerySection(section);
    });
  }, [fetchGallerySection]);

  // Fetch data when tab changes
  useEffect(() => {
    if (!galleryData[activeTab]) {
      fetchGallerySection(activeTab);
    }
  }, [activeTab, fetchGallerySection, galleryData]);

  useEffect(() => {
    // Page load animations
    const timer1 = setTimeout(() => setHeaderVisible(true), 100);
    const timer2 = setTimeout(() => setTabsVisible(true), 300);
    const timer3 = setTimeout(() => setGalleryVisible(true), 500);

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animation triggered when section is visible
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-200 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/5 rounded-full animate-float"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gold/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-primary/5 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
      <div className="absolute bottom-20 right-10 w-12 h-12 bg-gold/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div 
            className={`text-center mb-12 transition-all duration-1000 ease-out transform ${
              headerVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-full mb-6">
              <span className="text-primary text-lg">📸</span>
              <span className="text-primary font-semibold text-sm">Gallery</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
              Our Gallery
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              A glimpse into the life at St. Angeloes College.
            </p>
          </div>

          {/* Gallery Tabs */}
          <div 
            className={`mb-12 transition-all duration-1000 ease-out transform ${
              tabsVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex flex-wrap justify-center border-b border-primary/20 dark:border-primary/30">
              {GALLERY_TABS.map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 font-semibold transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-slate-300'
                  }`}
                  style={{
                    transitionDelay: `${400 + (index * 50)}ms`
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div 
            className={`transition-all duration-1000 ease-out transform ${
              galleryVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            ref={sectionRef}
          >
            {loading ? (
              // Loading skeleton
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse"
                  ></div>
                ))}
              </div>
            ) : galleryData[activeTab] && galleryData[activeTab].length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                {galleryData[activeTab].map((item, index) => (
                  <div
                    key={item.id}
                    className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
                    style={{
                      transitionDelay: `${600 + (index * 50)}ms`
                    }}
                  >
                    {activeTab === 'Videos' ? (
                      // Video thumbnail with click functionality
                      <div className="relative w-full h-full">
                        <img
                          src={getVideoThumbnail(item.image_url)}
                          alt={`${activeTab} video`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.target.src = '/images/placeholder-video.jpg';
                          }}
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Platform icon overlay */}
                        <div className="absolute top-2 left-2 bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">
                          {getVideoPlatformIcon(item.image_url)}
                        </div>
                        
                        {/* Clickable overlay for video */}
                        <div 
                          className="absolute inset-0 cursor-pointer z-10"
                          onClick={() => {
                            console.log('Video clicked:', item.image_url);
                            window.open(item.image_url, '_blank');
                          }}
                          title="Click to open video"
                        >
                          {/* Play button overlay */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                          </div>
                          
                          {/* Click hint */}
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div className="bg-blue-500/80 text-white text-xs px-2 py-1 rounded-full">
                              🔗 Open
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Regular image with click functionality
                      <div
                        className="w-full h-full bg-center bg-no-repeat aspect-square bg-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                        style={{ backgroundImage: `url("${item.image_url}")` }}
                        onClick={() => openImageModal(item.image_url, `${activeTab} Image`)}
                        title="Click to view full size"
                      ></div>
                    )}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Hover overlay with icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <span className="text-white text-xl">{activeTab === 'Videos' ? '▶️' : '🔍'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // No content available
              <div className="text-center py-12 mb-12">
                <div className="text-6xl mb-4">{activeTab === 'Videos' ? '🎥' : '📷'}</div>
                <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">
                  No {activeTab.toLowerCase()} available
                </h3>
                <p className="text-slate-500 dark:text-slate-500">
                  Check back later for {activeTab.toLowerCase()} content.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeImageModal}
          ></div>
          <div className="relative bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scaleIn">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{selectedImage.title}</h3>
              <button
                onClick={closeImageModal}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
              >
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">close</span>
              </button>
            </div>
            <div className="p-2 max-h-[calc(90vh-60px)] overflow-y-auto">
              <img src={selectedImage.url} alt={selectedImage.title} className="max-w-full h-auto rounded-md mx-auto" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
