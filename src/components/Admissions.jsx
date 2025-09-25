import React, { useEffect, useState, useRef } from 'react';
import EnquiryModal from './EnquiryModal';

const Admissions = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [guidelinesVisible, setGuidelinesVisible] = useState(false);
  const [timelineVisible, setTimelineVisible] = useState(false);
  const [formsVisible, setFormsVisible] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Page load animations
    const timer1 = setTimeout(() => setHeaderVisible(true), 100);
    const timer2 = setTimeout(() => setGuidelinesVisible(true), 300);
    const timer3 = setTimeout(() => setTimelineVisible(true), 500);
    const timer4 = setTimeout(() => setFormsVisible(true), 700);

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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
      clearTimeout(timer4);
      observer.disconnect();
    };
  }, []);

  const openEnquiryModal = () => {
    setIsEnquiryModalOpen(true);
  };

  const closeEnquiryModal = () => {
    setIsEnquiryModalOpen(false);
  };

  const admissionSteps = [
    {
      id: 1,
      title: "Application Submission",
      description: "Submit the completed application form along with the required documents.",
      icon: "📄",
      position: "left"
    },
    {
      id: 2,
      title: "Entrance Test & Interview",
      description: "Eligible candidates will be invited for an entrance test and an interview.",
      icon: "📝",
      position: "right"
    },
    {
      id: 3,
      title: "Document Verification",
      description: "Original documents will be verified upon selection.",
      icon: "📁",
      position: "left"
    },
    {
      id: 4,
      title: "Admission Confirmation",
      description: "Upon successful verification, admission will be confirmed.",
      icon: "✅",
      position: "right"
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
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div 
            className={`text-center mb-12 transition-all duration-1000 ease-out transform ${
              headerVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-full mb-6">
              <span className="text-primary text-lg">🎓</span>
              <span className="text-primary font-semibold text-sm">Admissions</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
              Admissions Overview
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Welcome to St. Angeloes College, Lucknow. We are delighted that you are considering our school for your child's education. Our admissions process is designed to ensure a smooth transition for new students and their families.
            </p>
          </div>

          {/* Admission Guidelines Section */}
          <div 
            className={`bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 mb-12 transition-all duration-1000 ease-out transform ${
              guidelinesVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">📋</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Admission Guidelines
              </h2>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6 p-6 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-primary text-xl">🏫</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                    Eligibility
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Open to students from Kindergarten to Grade 12. Specific age criteria apply for each grade level. Please refer to the prospectus for detailed eligibility requirements.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-primary text-xl">📅</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                    Admission Dates
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Admissions are open throughout the year, subject to seat availability. The main admission process typically begins in January for the upcoming academic year.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Section */}
          <div 
            className={`mb-12 transition-all duration-1000 ease-out transform ${
              timelineVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gold/10 dark:bg-gold/20 px-4 py-2 rounded-full mb-6">
                <span className="text-gold text-lg">⏰</span>
                <span className="text-gold font-semibold text-sm">Process</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Step-by-Step Admission Process
              </h2>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-gold to-primary rounded-full"></div>
              
              <div className="space-y-12">
                {admissionSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`relative transition-all duration-700 ease-out transform ${
                      timelineVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-8'
                    }`}
                    style={{
                      transitionDelay: `${800 + (index * 200)}ms`
                    }}
                  >
                    {/* Timeline Circle - Always centered */}
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-gold flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform duration-300 relative z-10">
                        <span className="text-2xl font-bold">{step.id}</span>
                      </div>
                    </div>

                    {/* Content Card - Positioned based on step position */}
                    <div className={`flex ${step.position === 'left' ? 'md:justify-start' : 'md:justify-end'}`}>
                      <div className={`bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group max-w-md mx-auto md:mx-0 ${step.position === 'left' ? 'md:mr-8' : 'md:ml-8'}`}>
                        <div className={`flex items-center gap-4 mb-4 ${step.position === 'left' ? 'md:justify-end' : ''}`}>
                          {step.position === 'left' ? (
                            <>
                              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                                {step.title}
                              </h3>
                              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                                <span className="text-xl">{step.icon}</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                                <span className="text-xl">{step.icon}</span>
                              </div>
                              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                                {step.title}
                              </h3>
                            </>
                          )}
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Forms Section */}
          <div 
            className={`bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 text-center transition-all duration-1000 ease-out transform ${
              formsVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            ref={sectionRef}
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gold/10 dark:bg-gold/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">📄</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Fee Structure & Forms
              </h2>
            </div>
            
            <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Our fee structure is designed to provide quality education and facilities. For detailed information, please download our prospectus or access the online forms below.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95">
                <span className="text-xl">📥</span>
                Download Prospectus
              </button>
              <button 
                onClick={openEnquiryModal}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gold/10 dark:bg-gold/20 text-gold font-semibold rounded-xl hover:bg-gold/20 dark:hover:bg-gold/30 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
              >
                <span className="text-xl">❓</span>
                Enquiry Form
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal 
        isOpen={isEnquiryModalOpen} 
        onClose={closeEnquiryModal} 
      />
    </div>
  );
};

export default Admissions;
