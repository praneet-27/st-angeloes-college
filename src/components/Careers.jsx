import React, { useEffect, useState, useRef } from 'react';

const Careers = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [openingsVisible, setOpeningsVisible] = useState(false);
  const [applyVisible, setApplyVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Staggered animations on page load
    const timer1 = setTimeout(() => setHeaderVisible(true), 100);
    const timer2 = setTimeout(() => setOpeningsVisible(true), 300);
    const timer3 = setTimeout(() => setApplyVisible(true), 500);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animation triggered when section is visible
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

  const jobOpenings = [
    {
      id: 1,
      title: "High School Math Teacher",
      department: "Mathematics Department",
      type: "Full-time",
      description: "We are seeking an experienced and passionate Mathematics teacher to join our high school faculty."
    },
    {
      id: 2,
      title: "Middle School Science Teacher",
      department: "Science Department", 
      type: "Full-time",
      description: "Join our science department to inspire young minds with hands-on experiments and scientific discovery."
    },
    {
      id: 3,
      title: "Elementary School Art Instructor",
      department: "Arts Department",
      type: "Part-time",
      description: "Bring creativity to life in our elementary classrooms with engaging art projects and activities."
    },
    {
      id: 4,
      title: "School Counselor",
      department: "Student Support Services",
      type: "Full-time", 
      description: "Provide guidance and support to students, helping them navigate academic and personal challenges."
    },
    {
      id: 5,
      title: "Administrative Assistant",
      department: "Administration",
      type: "Part-time",
      description: "Support our administrative team with various office tasks and student services."
    }
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
      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className={`text-center mb-16 transition-all duration-1000 ease-out transform ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <span className="text-2xl">💼</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-4">
              Work With Us
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Join our passionate team of educators and staff dedicated to fostering a love for learning and shaping the future of education.
            </p>
          </div>

          {/* Current Openings Section */}
          <div className={`mb-16 transition-all duration-1000 ease-out transform ${
            openingsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gold/10 rounded-full mb-4">
                <span className="text-xl">🎯</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
                Current Openings
              </h2>
            </div>
            
            <div className="space-y-4">
              {jobOpenings.map((job, index) => (
                <div
                  key={job.id}
                  className="group rounded-xl border border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors duration-300 mb-2">
                        {job.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        {job.type} • {job.department}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-500 leading-relaxed">
                        {job.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <button className="flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How to Apply Section */}
          <div 
            ref={sectionRef}
            className={`transition-all duration-1000 ease-out transform ${
              applyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="rounded-xl bg-primary/10 dark:bg-primary/20 p-8 text-center hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/20 rounded-full mb-4">
                <span className="text-xl">📧</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
                How to Apply
              </h2>
              <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400 leading-relaxed">
                To apply for any of the open positions, please submit your resume, cover letter, and a brief statement of your educational philosophy to{' '}
                <a 
                  className="font-medium text-primary hover:underline transition-colors duration-300" 
                  href="mailto:careers@stangeloescollege.edu"
                >
                  careers@stangeloescollege.edu
                </a>
                . Please indicate the position you are applying for in the subject line of your email. We look forward to hearing from you!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
