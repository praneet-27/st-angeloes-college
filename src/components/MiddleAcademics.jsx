import React, { useEffect, useState, useRef } from 'react';

const MiddleAcademics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [curriculumVisible, setCurriculumVisible] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [teachingVisible, setTeachingVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Staggered animations on page load
    const timer1 = setTimeout(() => setHeaderVisible(true), 100);
    const timer2 = setTimeout(() => setCurriculumVisible(true), 300);
    const timer3 = setTimeout(() => setSkillsVisible(true), 500);
    const timer4 = setTimeout(() => setTeachingVisible(true), 700);
    
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
      observer.disconnect();
    };
  }, []);

  const curriculumSubjects = [
    "English",
    "Mathematics", 
    "Science (Physics, Chemistry, Biology)",
    "Social Studies (History, Geography, Civics)",
    "Hindi/Sanskrit",
    "Computer Applications",
    "Art & Music",
    "Physical Education"
  ];

  const skillDevelopment = [
    "Critical Thinking",
    "Problem-Solving",
    "Communication",
    "Collaboration",
    "Creativity",
    "Leadership",
    "Digital Literacy"
  ];

  const teachingMethods = [
    "Project-Based Learning",
    "Hands-On Activities",
    "Continuous Assessment",
    "Projects & Quizzes",
    "Field Trips",
    "Examinations"
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className={`text-center mb-12 transition-all duration-1000 ease-out transform ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <span className="text-2xl">🎓</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
              Middle School Academics
            </h1>
            <p className="text-lg text-primary font-semibold mb-4">(Classes 6-8)</p>
            <p className="max-w-2xl mx-auto text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Our Middle School program builds on foundational skills, preparing students for the rigors of higher education with a comprehensive curriculum and holistic development activities.
            </p>
          </div>

          <div className="space-y-12">
            {/* Curriculum Section */}
            <div className={`grid grid-cols-1 md:grid-cols-5 gap-8 items-start transition-all duration-1000 ease-out transform ${
              curriculumVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="md:col-span-2">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gold/10 rounded-full mb-4">
                  <span className="text-xl">📚</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Curriculum</h3>
                <p className="text-slate-600 dark:text-slate-400">Our balanced curriculum provides a strong academic foundation across a wide range of subjects.</p>
              </div>
              <div className="md:col-span-3 grid grid-cols-2 gap-x-6 gap-y-4">
                {curriculumSubjects.map((subject, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 group"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors duration-300">{subject}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Development Section */}
            <div className={`grid grid-cols-1 md:grid-cols-5 gap-8 items-start transition-all duration-1000 ease-out transform ${
              skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="md:col-span-2">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                  <span className="text-xl">🚀</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Skill Development</h3>
                <p className="text-slate-600 dark:text-slate-400">We emphasize essential skills for future success, fostering well-rounded individuals.</p>
              </div>
              <div className="md:col-span-3 grid grid-cols-2 gap-x-6 gap-y-4">
                {skillDevelopment.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 group"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors duration-300">{skill}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Teaching & Assessment Section */}
            <div 
              ref={sectionRef}
              className={`grid grid-cols-1 md:grid-cols-5 gap-8 items-start transition-all duration-1000 ease-out transform ${
                teachingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="md:col-span-2">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gold/10 rounded-full mb-4">
                  <span className="text-xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Teaching & Assessment</h3>
                <p className="text-slate-600 dark:text-slate-400">Our student-centered approach uses interactive learning and comprehensive, continuous assessment.</p>
              </div>
              <div className="md:col-span-3 grid grid-cols-2 gap-x-6 gap-y-4">
                {teachingMethods.map((method, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 group"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors duration-300">{method}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiddleAcademics;
