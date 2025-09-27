import React, { useEffect, useState, useRef } from 'react';
import Card from './Common/Card';
import SectionTitle from './Common/SectionTitle';

const NewsEvents = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedItems, setExpandedItems] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const sectionRef = useRef(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/news?limit=5'); // Increased to 5 for list view
      const result = await response.json();
      
      if (response.ok && result.success) {
        setNewsItems(result.data || []);
      } else {
        console.error('Failed to fetch news:', result.error);
        setNewsItems([]);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setNewsItems([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const openImageModal = (imageUrl, title) => {
    setSelectedImage({ url: imageUrl, title });
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  useEffect(() => {
    // Fetch news on component mount
    fetchNews();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="mb-16">
      <div className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <SectionTitle>News & Announcements</SectionTitle>
      </div>
      
      <div className="space-y-4">
        {loading ? (
          // Loading skeleton for list view
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <Card className="p-6">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-slate-200 dark:bg-slate-700 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded mb-2 w-3/4"></div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                  </div>
                </div>
              </Card>
            </div>
          ))
        ) : newsItems.length > 0 ? (
          newsItems.map((item, index) => {
            const isExpanded = expandedItems[item.id];
            const shouldTruncate = item.content.length > 150;
            const displayContent = isExpanded ? item.content : truncateText(item.content);
            
            return (
              <div
                key={item.id}
                className={`transition-all duration-700 ease-out transform ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="md:w-48 w-full h-48 md:h-auto flex-shrink-0">
                      <div 
                        className="w-full h-full bg-center bg-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                        style={{
                          backgroundImage: `url("${item.image_url || '/images/placeholder-news.jpg'}")`
                        }}
                        onClick={() => openImageModal(item.image_url, item.title)}
                      >
                        <div className="w-full h-full bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-white/90 dark:bg-slate-800/90 rounded-full p-3">
                              <svg className="w-6 h-6 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          item.type === 'news' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                          item.type === 'events' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                          'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                        }`}>
                          {item.type?.toUpperCase() || 'NEWS'}
                        </span>
                        {item.event_date && (
                          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            <span>📅</span>
                            {new Date(item.event_date).toLocaleDateString()}
                          </span>
                        )}
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                          {new Date(item.created_at).toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h3>

                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                        {displayContent}
                      </p>

                      {item.location && (
                        <p className="text-sm text-slate-500 dark:text-slate-500 mb-4 flex items-center gap-2">
                          <span>📍</span>
                          <span>{item.location}</span>
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {shouldTruncate && (
                            <button
                              onClick={() => toggleExpanded(item.id)}
                              className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1 transition-colors duration-200"
                            >
                              {isExpanded ? (
                                <>
                                  <span>Read Less</span>
                                  <svg className="w-4 h-4 transform rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                  </svg>
                                </>
                              ) : (
                                <>
                                  <span>Read More</span>
                                  <svg className="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                  </svg>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                        
                        <button
                          onClick={() => openImageModal(item.image_url, item.title)}
                          className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors duration-200 flex items-center gap-1 text-sm"
                        >
                          <span>View Image</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })
        ) : (
          // No news available
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">No News Available</h3>
            <p className="text-slate-500 dark:text-slate-500">Check back later for the latest updates.</p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeImageModal}
        >
          <div className="relative max-w-4xl max-h-[90vh] mx-4">
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-2xl">
              <img
                src={selectedImage.url || '/images/placeholder-news.jpg'}
                alt={selectedImage.title}
                className="max-w-full max-h-[70vh] object-contain"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {selectedImage.title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default NewsEvents;