import React, { useEffect, useState, useRef } from 'react';

const Facilities = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [hostelVisible, setHostelVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Page load animations
    const timer1 = setTimeout(() => setHeaderVisible(true), 100);
    const timer2 = setTimeout(() => setCardsVisible(true), 300);
    const timer3 = setTimeout(() => setHostelVisible(true), 500);

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

  const facilities = [
    {
      id: 1,
      title: "Library",
      description: "A vast collection of books, journals, and digital resources to foster a love for reading and research.",
      icon: "📚",
      color: "primary"
    },
    {
      id: 2,
      title: "Science Labs",
      description: "Well-equipped labs for Physics, Chemistry, and Biology to encourage hands-on learning and experimentation.",
      icon: "🔬",
      color: "primary"
    },
    {
      id: 3,
      title: "Computer Lab",
      description: "Modern computer lab with high-speed internet access to enhance digital literacy skills.",
      icon: "💻",
      color: "primary"
    },
    {
      id: 4,
      title: "Sports & Playground",
      description: "A large playground and dedicated courts for various sports, promoting physical fitness and teamwork.",
      icon: "⚽",
      color: "primary"
    },
    {
      id: 5,
      title: "Transport",
      description: "A fleet of buses providing safe and reliable transport services for students across the city.",
      icon: "🚌",
      color: "primary"
    },
    {
      id: 6,
      title: "Co-curricular Activities",
      description: "Dedicated spaces for Music, Dance, Arts, and various clubs to nurture creativity and talent.",
      icon: "🎵",
      color: "primary"
    }
  ];

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
              <span className="text-primary text-lg">🏢</span>
              <span className="text-primary font-semibold text-sm">Facilities</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
              Our <span className="text-primary">World-Class</span> Facilities
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              We provide a nurturing environment with state-of-the-art facilities to support holistic development and academic excellence.
            </p>
          </div>

          {/* Facilities Grid */}
          <div 
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 transition-all duration-1000 ease-out transform ${
              cardsVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            {facilities.map((facility, index) => (
              <div
                key={facility.id}
                className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group border border-slate-200 dark:border-slate-700"
                style={{
                  transitionDelay: `${400 + (index * 100)}ms`
                }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{facility.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 group-hover:text-primary transition-colors duration-300">
                    {facility.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    {facility.description}
                  </p>
                </div>
                
                {/* Decorative border */}
                <div className="h-1 w-full bg-gradient-to-r from-primary via-gold to-primary rounded-full mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          {/* Hostel & Boarding Section */}
          <div 
            className={`bg-white dark:bg-slate-800 rounded-2xl p-8 lg:p-12 text-center shadow-xl transition-all duration-1000 ease-out transform ${
              hostelVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            ref={sectionRef}
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gold/10 dark:bg-gold/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🏠</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Hostel & Boarding
              </h2>
            </div>
            
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Information about our comfortable and secure hostel/boarding facilities will be available soon. We are working on creating a home away from home for our students. Please check back later for updates.
            </p>
            
            {/* Coming Soon Badge */}
            <div className="inline-flex items-center gap-2 bg-gold/10 dark:bg-gold/20 px-4 py-2 rounded-full mt-6">
              <span className="text-gold text-sm">⏳</span>
              <span className="text-gold font-semibold text-sm">Coming Soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facilities;
