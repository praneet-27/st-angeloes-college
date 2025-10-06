import React, { useEffect, useState, useRef } from 'react';

const FounderMessage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const founderImageUrl = "/images/founder.png";

  useEffect(() => {
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
      <h2 className={`text-3xl font-bold text-slate-900 dark:text-white mb-6 transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>Founder's Message</h2>
      <div className={`flex flex-col md:flex-row items-center gap-8 p-6 bg-white dark:bg-background-dark rounded-xl shadow-md transition-all duration-1000 ease-out transform hover:shadow-xl ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`} style={{ transitionDelay: '200ms' }}>
        <div className="flex-1 md:w-3/5">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 transition-all duration-1000 ease-out transform" style={{ transitionDelay: '400ms' }}>
            Welcome to St. Angeloes College
          </h3>
          <p className="italic text-slate-600 dark:text-slate-400 text-base leading-relaxed transition-all duration-1000 ease-out transform" style={{ transitionDelay: '600ms' }}>
          “Discipline, dedication and determination is the only way to lessen the distance between you and success.”
          </p>
          <br />
          <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed transition-all duration-1000 ease-out transform" style={{ transitionDelay: '600ms' }}>
          At our school, we strongly believe that discipline, dedication, and determination are the keys that bridge the gap between dreams and success. With this vision, we strive to create a nurturing environment where every child is encouraged to explore, learn, and grow with confidence.
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed transition-all duration-1000 ease-out transform" style={{ transitionDelay: '600ms' }}>
          Our aim is not only to impart knowledge but also to instill values that help students become responsible, compassionate, and future-ready individuals. Together with parents and teachers, we aspire to shape young minds who carry the strength of character and the spirit of perseverance into everything they do.
          </p>
          <div className="mt-6 transition-all duration-1000 ease-out transform" style={{ transitionDelay: '800ms' }}>
            <p className="text-lg font-semibold text-primary dark:text-white">
              — Mr. Virendra Upadhyay
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Founder & Director
            </p>
          </div>
        </div>
        <div 
          className={`w-full md:w-1/3 h-48 md:h-64 bg-center bg-cover rounded-lg transition-all duration-1000 ease-out transform hover:scale-105 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}
          style={{
            backgroundImage: `url("${founderImageUrl}")`,
            transitionDelay: '800ms'
          }}
        ></div>
      </div>
    </section>
  );
};

export default FounderMessage;
