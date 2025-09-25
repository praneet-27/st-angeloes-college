import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const Academics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Staggered animations on page load
    const timer1 = setTimeout(() => setHeaderVisible(true), 100);
    const timer2 = setTimeout(() => setCardsVisible(true), 300);
    
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
      observer.disconnect();
    };
  }, []);

  const academicPrograms = [
    {
      id: 1,
      title: "Kindergarten",
      description: "Our program (Nursery, LKG, UKG) provides a nurturing environment for young learners to develop foundational skills through play-based activities.",
      icon: "🎨",
      color: "primary"
    },
    {
      id: 2,
      title: "Primary School",
      description: "Focusing on Classes 1-5, we build a strong academic base, integrating core subjects with creative arts and physical education.",
      icon: "📚",
      color: "primary"
    },
    {
      id: 3,
      title: "Middle School",
      description: "For Classes 6-8, we develop critical thinking and problem-solving skills through interactive and engaging learning methods.",
      icon: "🧠",
      color: "primary"
    },
    {
      id: 4,
      title: "Secondary School",
      description: "Our curriculum for Classes 9-10 prepares students for ICSE examinations with rigorous academics and personalized support.",
      icon: "🎓",
      color: "primary"
    },
    {
      id: 5,
      title: "Senior Secondary",
      description: "For Classes 11-12, we offer specialized streams in Science, Commerce, and Humanities to prepare students for their future careers.",
      icon: "🚀",
      color: "primary"
    }
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-200 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/5 rounded-full animate-float"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gold/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-primary/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-60 left-1/2 w-8 h-8 bg-gold/15 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
      
      <div className="relative min-h-screen w-full flex-col overflow-x-hidden">
        <main className="flex-1 relative z-10">
          {/* Hero Section */}
          <div className="bg-primary/10 dark:bg-primary/20">
            <div className="container mx-auto px-6 py-12 md:py-20">
              <div className="max-w-4xl mx-auto text-center">
                <div className={`transition-all duration-1000 ease-out transform ${
                  headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  <div className="relative">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-4 relative z-10">
                      Academics Overview
                    </h1>
                    <div className={`absolute -top-2 -left-2 w-16 h-16 bg-gold/20 rounded-full transition-all duration-1000 ease-out transform ${
                      headerVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                    }`} style={{ transitionDelay: '200ms' }}></div>
                    <div className={`absolute -bottom-2 -right-2 w-12 h-12 bg-primary/20 rounded-full transition-all duration-1000 ease-out transform ${
                      headerVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                    }`} style={{ transitionDelay: '400ms' }}></div>
                  </div>
                  <p className={`text-lg text-slate-600 dark:text-slate-300 transition-all duration-1000 ease-out transform ${
                    headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`} style={{ transitionDelay: '300ms' }}>
                    Explore our comprehensive academic programs designed to foster intellectual curiosity and personal growth from Kindergarten to Grade 12.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Programs Grid */}
          <div className="container mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {academicPrograms.map((program, index) => (
                <div
                  key={program.id}
                  className={`bg-white dark:bg-slate-800/50 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-1000 ease-out transform hover:-translate-y-2 group overflow-hidden ${
                    cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: `${500 + (index * 150)}ms`
                  }}
                >
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                        program.color === 'primary' 
                          ? 'bg-primary/10 group-hover:bg-primary/20' 
                          : 'bg-gold/10 group-hover:bg-gold/20'
                      }`}>
                        <span className="text-2xl">{program.icon}</span>
                      </div>
                      <h2 className={`text-2xl font-bold transition-colors duration-300 group-hover:text-primary/80 ${
                        program.color === 'primary' 
                          ? 'text-primary dark:text-purple-300' 
                          : 'text-gold'
                      }`}>
                        {program.title}
                      </h2>
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                      {program.description}
                    </p>
                    
                    {program.title === "Kindergarten" ? (
                      <Link 
                        to="/kindergarten"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="w-full inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-105 active:scale-95 bg-primary text-white hover:bg-primary/90 focus:ring-primary shadow-lg hover:shadow-xl h-10 px-6 text-sm rounded-full group-hover:scale-105"
                      >
                        Learn More
                      </Link>
                    ) : program.title === "Primary School" ? (
                      <Link 
                        to="/pre-primary"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="w-full inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-105 active:scale-95 bg-primary text-white hover:bg-primary/90 focus:ring-primary shadow-lg hover:shadow-xl h-10 px-6 text-sm rounded-full group-hover:scale-105"
                      >
                        Learn More
                      </Link>
                    ) : program.title === "Middle School" ? (
                      <Link 
                        to="/middle-academics"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="w-full inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-105 active:scale-95 bg-primary text-white hover:bg-primary/90 focus:ring-primary shadow-lg hover:shadow-xl h-10 px-6 text-sm rounded-full group-hover:scale-105"
                      >
                        Learn More
                      </Link>
                    ) : program.title === "Secondary School" ? (
                      <Link 
                        to="/secondary-academics"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="w-full inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-105 active:scale-95 bg-primary text-white hover:bg-primary/90 focus:ring-primary shadow-lg hover:shadow-xl h-10 px-6 text-sm rounded-full group-hover:scale-105"
                      >
                        Learn More
                      </Link>
                    ) : program.title === "Senior Secondary" ? (
                      <Link 
                        to="/senior-secondary-academics"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="w-full inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-105 active:scale-95 bg-primary text-white hover:bg-primary/90 focus:ring-primary shadow-lg hover:shadow-xl h-10 px-6 text-sm rounded-full group-hover:scale-105"
                      >
                        Learn More
                      </Link>
                    ) : (
                      <button 
                        type="button"
                        className="w-full inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-105 active:scale-95 bg-primary text-white hover:bg-primary/90 focus:ring-primary shadow-lg hover:shadow-xl h-10 px-6 text-sm rounded-full group-hover:scale-105"
                      >
                        Learn More
                      </button>
                    )}
                  </div>
                  
                  {/* Decorative border */}
                  <div className={`h-1 w-full transition-all duration-500 ${
                    program.color === 'primary' 
                      ? 'bg-gradient-to-r from-primary to-primary/50' 
                      : 'bg-gradient-to-r from-gold to-gold/50'
                  }`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information Section */}
          <div ref={sectionRef} className="bg-white dark:bg-slate-800/30 py-16">
            <div className="container mx-auto px-6">
              <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ease-out transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary text-lg">⭐</span>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Academic Excellence
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <span className="text-primary text-2xl">📊</span>
                    </div>
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">ICSE Curriculum</h4>
                    <p className="text-slate-600 dark:text-slate-300">Following the prestigious ICSE board curriculum for comprehensive education</p>
                  </div>
                  
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                      <span className="text-gold text-2xl">👨‍🏫</span>
                    </div>
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Expert Faculty</h4>
                    <p className="text-slate-600 dark:text-slate-300">Experienced and qualified teachers dedicated to student success</p>
                  </div>
                  
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <span className="text-primary text-2xl">🎯</span>
                    </div>
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Holistic Development</h4>
                    <p className="text-slate-600 dark:text-slate-300">Balancing academics with extracurricular activities and life skills</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Academics;
