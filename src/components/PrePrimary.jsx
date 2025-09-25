import React, { useEffect, useState, useRef } from 'react';

const PrePrimary = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [subjectsVisible, setSubjectsVisible] = useState(false);
  const [approachVisible, setApproachVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Staggered animations on page load
    const timer1 = setTimeout(() => setHeaderVisible(true), 100);
    const timer2 = setTimeout(() => setSubjectsVisible(true), 300);
    const timer3 = setTimeout(() => setApproachVisible(true), 500);
    
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

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      observer.disconnect();
    };
  }, []);

  const subjects = [
    { name: "English", icon: "📚" },
    { name: "Mathematics", icon: "🔢" },
    { name: "Science", icon: "🔬" },
    { name: "Social Studies", icon: "🌍" },
    { name: "Music", icon: "🎵" },
    { name: "Art", icon: "🎨" },
    { name: "Physical Ed.", icon: "⚽" },
    { name: "Computers", icon: "💻" }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/5 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gold/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-primary/5 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-10 w-18 h-18 bg-gold/10 rounded-full animate-float" style={{ animationDelay: '6s' }}></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className={`text-center mb-12 transition-all duration-1000 ease-out transform ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <span className="text-2xl">🎓</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              Primary Academics (Classes 1-5)
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              At St. Angeloes College, we believe in nurturing young minds through a comprehensive and engaging curriculum designed to foster curiosity, creativity, and a love for learning. Our primary academics program for Classes 1-5 focuses on building a strong foundation in core subjects while encouraging holistic development.
            </p>
          </div>

          {/* Subjects Section */}
          <div className={`mb-16 transition-all duration-1000 ease-out transform ${
            subjectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 rounded-full mb-6">
                <span className="text-2xl">📖</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Subjects Taught
              </h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {subjects.map((subject, index) => (
                <div
                  key={index}
                  className="group flex flex-col items-center text-center p-6 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg hover:bg-primary/5 dark:hover:bg-primary/20 transition-all duration-300 hover:-translate-y-2"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 dark:bg-primary/20 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{subject.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-primary transition-colors duration-300">
                    {subject.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Teaching Approach Section */}
          <div 
            ref={sectionRef}
            className={`transition-all duration-1000 ease-out transform ${
              approachVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Our Teaching Approach
              </h2>
            </div>
            
            <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                Our teaching approach in the primary classes is centered around interactive and experiential learning. We use a blend of traditional and modern teaching methods to cater to diverse learning styles. Our classrooms are equipped with smart boards and other technological aids to make learning more engaging and effective. We also emphasize project-based learning, field trips, and extracurricular activities to provide a well-rounded educational experience. Our dedicated faculty members are committed to creating a supportive and stimulating environment where each child can thrive academically and personally.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrePrimary;
