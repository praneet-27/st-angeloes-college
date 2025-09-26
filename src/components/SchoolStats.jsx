import React, { useEffect, useState, useRef, useMemo } from 'react';

const SchoolStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    students: 0,
    teachers: 0,
    alumni: 0,
    years: 0
  });
  const sectionRef = useRef(null);

  const stats = useMemo(() => [
    { key: 'students', target: 2500, suffix: '+', label: 'Current Students' },
    { key: 'teachers', target: 150, suffix: '+', label: 'Dedicated Teachers' },
    { key: 'alumni', target: 10000, suffix: '+', label: 'Alumni Network' },
    { key: 'years', target: 35, suffix: '+', label: 'Years of Excellence' }
  ], []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Start counting animation
            stats.forEach((stat) => {
              animateCount(stat.key, stat.target);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [stats]);

  const animateCount = (key, target) => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCounts(prev => ({ ...prev, [key]: target }));
        clearInterval(timer);
      } else {
        setCounts(prev => ({ ...prev, [key]: Math.floor(current) }));
      }
    }, duration / steps);
  };

  return (
    <section ref={sectionRef} className="mb-16">
      <div className={`bg-primary/10 dark:bg-primary/20 py-12 rounded-xl transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div 
                key={stat.key}
                className="transition-all duration-700 ease-out transform"
                style={{
                  transitionDelay: `${index * 200}ms`,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isVisible ? 1 : 0
                }}
              >
                <h3 className="text-4xl font-bold text-primary dark:text-white mb-2">
                  {counts[stat.key].toLocaleString()}{stat.suffix}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolStats;
