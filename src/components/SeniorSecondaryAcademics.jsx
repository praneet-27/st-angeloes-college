import React, { useEffect, useState, useRef } from 'react';

const SeniorSecondaryAcademics = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [tabsVisible, setTabsVisible] = useState(false);
  const [scienceVisible, setScienceVisible] = useState(false);
  const [subjectsVisible, setSubjectsVisible] = useState(false);
  const [careerVisible, setCareerVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('science');
  const sectionRef = useRef(null);

  useEffect(() => {
    // Staggered animations on page load
    const timer1 = setTimeout(() => setHeaderVisible(true), 100);
    const timer2 = setTimeout(() => setTabsVisible(true), 300);
    const timer3 = setTimeout(() => setScienceVisible(true), 500);
    const timer4 = setTimeout(() => setSubjectsVisible(true), 700);
    const timer5 = setTimeout(() => setCareerVisible(true), 900);
    
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
      clearTimeout(timer4);
      clearTimeout(timer5);
      observer.disconnect();
    };
  }, []);

  const subjects = [
    {
      name: "Physics",
      description: "Study of matter, energy, and the fundamental forces of nature."
    },
    {
      name: "Chemistry", 
      description: "Study of the composition, structure, properties, and reactions of matter."
    },
    {
      name: "Biology",
      description: "Study of living organisms and their interactions with the environment."
    },
    {
      name: "Mathematics",
      description: "Study of numbers, quantities, and shapes, and their relationships."
    }
  ];

  const tabs = [
    { id: 'science', label: 'Science' },
    { id: 'commerce', label: 'Commerce' },
    { id: 'humanities', label: 'Humanities' }
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
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:py-20 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className={`text-center mb-12 transition-all duration-1000 ease-out transform ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <span className="text-2xl">🎓</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-4">
              Senior Secondary Academics
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Guiding our students in Classes 11-12 towards a bright and successful future.
            </p>
          </div>

          {/* Tabs Section */}
          <div className={`mb-12 transition-all duration-1000 ease-out transform ${
            tabsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="border-b border-slate-300 dark:border-slate-700 flex justify-center">
              <div className="flex space-x-4 sm:space-x-8 -mb-px">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-x-2 whitespace-nowrap border-b-2 px-1 py-4 text-base font-semibold transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-10">
            {/* Science Stream Section */}
            {activeTab === 'science' && (
              <div className={`transition-all duration-1000 ease-out transform ${
                scienceVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                    <span className="text-xl">🔬</span>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Science Stream</h2>
                  <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                    The Science stream at St. Angeloes College is designed to provide a strong foundation in scientific principles and prepare students for higher education in various fields of science and technology. The curriculum includes subjects such as Physics, Chemistry, Biology, and Mathematics, with a focus on practical application and research-oriented learning.
                  </p>
                </div>
              </div>
            )}

            {/* Subjects Table Section */}
            {activeTab === 'science' && (
              <div 
                ref={sectionRef}
                className={`transition-all duration-1000 ease-out transform ${
                  subjectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Subjects Offered</h2>
                <div className="mt-6 overflow-x-auto">
                  <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                      <table className="min-w-full divide-y divide-slate-300 dark:divide-slate-700">
                        <thead className="bg-slate-100 dark:bg-slate-800">
                          <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white" scope="col">
                              Subject
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white" scope="col">
                              Description
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-800/50">
                          {subjects.map((subject, index) => (
                            <tr
                              key={index}
                              className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200"
                              style={{ transitionDelay: `${index * 100}ms` }}
                            >
                              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                                {subject.name}
                              </td>
                              <td className="whitespace-normal px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                                {subject.description}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-start">
                  <button className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-base font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 transition-all duration-300 transform hover:scale-105 active:scale-95">
                    View Detailed Curriculum
                  </button>
                </div>
              </div>
            )}

            {/* Career Guidance Section */}
            <div className={`transition-all duration-1000 ease-out transform ${
              careerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="p-8 rounded-xl bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gold/10 rounded-full mb-4">
                  <span className="text-xl">🎯</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Career Guidance</h2>
                <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                  St. Angeloes College offers comprehensive career guidance to students in Classes 11-12 to help them make informed decisions about their future. Our career counselors provide personalized guidance, conduct workshops, and organize sessions with industry experts to help students explore various career options and choose the right path.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeniorSecondaryAcademics;
