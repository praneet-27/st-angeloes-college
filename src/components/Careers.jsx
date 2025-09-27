import React, { useEffect, useState, useRef } from 'react';

const Careers = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [openingsVisible, setOpeningsVisible] = useState(false);
  const [applyVisible, setApplyVisible] = useState(false);
  const [jobOpenings, setJobOpenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const sectionRef = useRef(null);

  // Fetch job openings from API
  const fetchJobOpenings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/job-openings');
      const result = await response.json();
      
      if (response.ok && result.success) {
        setJobOpenings(result.data || []);
      } else {
        console.error('Failed to fetch job openings:', result.error);
        setJobOpenings([]);
      }
    } catch (error) {
      console.error('Error fetching job openings:', error);
      setJobOpenings([]);
    } finally {
      setLoading(false);
    }
  };

  // Show job details modal
  const showJobModal = (job) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  };

  // Close job details modal
  const closeJobModal = () => {
    setShowJobDetails(false);
    setSelectedJob(null);
  };

  useEffect(() => {
    // Fetch job openings on component mount
    fetchJobOpenings();

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
            
            {loading ? (
              // Loading skeleton
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm p-6 animate-pulse"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div className="flex-1">
                        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-2 w-3/4"></div>
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2 w-1/2"></div>
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-1 w-full"></div>
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-lg w-24"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : jobOpenings.length > 0 ? (
              <div className="space-y-4">
                {jobOpenings.map((job, index) => (
                  <div
                    key={job.id}
                    className={`group rounded-xl border border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                      job.is_featured ? 'ring-2 ring-primary/20 bg-primary/5' : ''
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors duration-300">
                            {job.title}
                          </h3>
                          {job.is_featured && (
                            <span className="px-2 py-1 text-xs font-semibold bg-primary text-white rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          {job.job_type} • {job.department}
                        </p>
                        {job.salary_range && (
                          <p className="text-sm font-medium text-primary mb-2">
                            💰 {job.salary_range}
                          </p>
                        )}
                        <p className="text-sm text-slate-500 dark:text-slate-500 leading-relaxed line-clamp-2">
                          {job.description}
                        </p>
                        {job.experience_level && (
                          <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                            Experience: {job.experience_level}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <button 
                          onClick={() => showJobModal(job)}
                          className="flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 transition-all duration-300 hover:bg-slate-200 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transform hover:scale-105 active:scale-95"
                        >
                          View Details
                        </button>
                        <button className="flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // No job openings available
              <div className="text-center py-12">
                <div className="text-6xl mb-4">💼</div>
                <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">
                  No Current Openings
                </h3>
                <p className="text-slate-500 dark:text-slate-500">
                  We don't have any job openings at the moment. Please check back later.
                </p>
              </div>
            )}
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

      {/* Job Details Modal */}
      {showJobDetails && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeJobModal}
          ></div>
          <div className="relative bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scaleIn">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedJob.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {selectedJob.job_type} • {selectedJob.department}
                </p>
              </div>
              <button
                onClick={closeJobModal}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
              >
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">close</span>
              </button>
            </div>
            <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              <div className="space-y-6">
                {/* Job Overview */}
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Job Overview</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{selectedJob.description}</p>
                </div>

                {/* Job Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedJob.salary_range && (
                    <div>
                      <h5 className="font-semibold text-slate-900 dark:text-white mb-2">💰 Salary Range</h5>
                      <p className="text-slate-600 dark:text-slate-400">{selectedJob.salary_range}</p>
                    </div>
                  )}
                  {selectedJob.experience_level && (
                    <div>
                      <h5 className="font-semibold text-slate-900 dark:text-white mb-2">📈 Experience Level</h5>
                      <p className="text-slate-600 dark:text-slate-400">{selectedJob.experience_level}</p>
                    </div>
                  )}
                  {selectedJob.education_required && (
                    <div>
                      <h5 className="font-semibold text-slate-900 dark:text-white mb-2">🎓 Education Required</h5>
                      <p className="text-slate-600 dark:text-slate-400">{selectedJob.education_required}</p>
                    </div>
                  )}
                  {selectedJob.location && (
                    <div>
                      <h5 className="font-semibold text-slate-900 dark:text-white mb-2">📍 Location</h5>
                      <p className="text-slate-600 dark:text-slate-400">{selectedJob.location}</p>
                    </div>
                  )}
                </div>

                {/* Requirements */}
                {selectedJob.requirements && (
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Requirements</h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{selectedJob.requirements}</p>
                  </div>
                )}

                {/* Responsibilities */}
                {selectedJob.responsibilities && (
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Key Responsibilities</h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{selectedJob.responsibilities}</p>
                  </div>
                )}

                {/* Benefits */}
                {selectedJob.benefits && (
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Benefits & Perks</h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{selectedJob.benefits}</p>
                  </div>
                )}

                {/* Application Deadline */}
                {selectedJob.application_deadline && (
                  <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg">
                    <h5 className="font-semibold text-slate-900 dark:text-white mb-2">⏰ Application Deadline</h5>
                    <p className="text-slate-600 dark:text-slate-400">
                      {new Date(selectedJob.application_deadline).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
              <button
                onClick={closeJobModal}
                className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const subject = `Application for ${selectedJob.title}`;
                  const body = `Dear Hiring Manager,\n\nI am writing to express my interest in the ${selectedJob.title} position at St. Angeloes College. Please find my application materials attached.\n\nBest regards,\n[Your Name]`;
                  window.open(`mailto:careers@stangeloescollege.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
                }}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;
