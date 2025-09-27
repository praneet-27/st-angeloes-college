import React, { useEffect, useState, useRef } from 'react';
import Card from './Common/Card';
import SectionTitle from './Common/SectionTitle';

const NewsEvents = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/news?limit=3');
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          // Loading skeleton
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse"
            >
              <Card className="overflow-hidden">
                <div className="w-full h-40 bg-slate-200 dark:bg-slate-700"></div>
                <div className="p-4">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </div>
              </Card>
            </div>
          ))
        ) : newsItems.length > 0 ? (
          newsItems.map((item, index) => (
            <div
              key={item.id}
              className={`transition-all duration-700 ease-out transform ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`
              }}
            >
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                <div 
                  className="w-full h-40 bg-center bg-cover transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url("${item.image_url || '/images/placeholder-news.jpg'}")`
                  }}
                ></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      item.type === 'news' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                      item.type === 'events' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                      'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                    }`}>
                      {item.type?.toUpperCase() || 'NEWS'}
                    </span>
                    {item.event_date && (
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {new Date(item.event_date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3">
                    {item.content}
                  </p>
                  {item.location && (
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 flex items-center gap-1">
                      <span>📍</span>
                      {item.location}
                    </p>
                  )}
                </div>
              </Card>
            </div>
          ))
        ) : (
          // No news available
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">No News Available</h3>
            <p className="text-slate-500 dark:text-slate-500">Check back later for the latest updates.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsEvents;
