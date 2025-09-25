import React, { useEffect, useState, useRef } from 'react';

const SecondaryAcademics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [curriculumVisible, setCurriculumVisible] = useState(false);
  const [examPrepVisible, setExamPrepVisible] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Staggered animations on page load
    const timer1 = setTimeout(() => setHeaderVisible(true), 100);
    const timer2 = setTimeout(() => setCurriculumVisible(true), 300);
    const timer3 = setTimeout(() => setExamPrepVisible(true), 500);
    const timer4 = setTimeout(() => setFeaturesVisible(true), 700);
    
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

  const keyFeatures = [
    {
      title: "Detailed Curriculum",
      description: "Comprehensive coverage of the ICSE syllabus."
    },
    {
      title: "Rigorous Exam Prep",
      description: "Regular assessments and mock tests."
    },
    {
      title: "Expert Faculty",
      description: "Experienced and dedicated teaching staff."
    },
    {
      title: "Individual Attention",
      description: "Personalized support and guidance for all."
    },
    {
      title: "Holistic Development",
      description: "Focus on practical application and critical thinking."
    },
    {
      title: "Modern Labs",
      description: "Well-equipped science and computer labs."
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className={`text-center mb-12 transition-all duration-1000 ease-out transform ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <span className="text-2xl">🎓</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
              Secondary Academics
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Our program for Classes 9 & 10, meticulously designed to excel in the ICSE examinations and build a strong foundation for future success.
            </p>
          </div>

          <div className="space-y-12">
            {/* ICSE Curriculum Section */}
            <div className={`transition-all duration-1000 ease-out transform ${
              curriculumVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="p-8 rounded-xl bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                  <span className="text-xl">📖</span>
                </div>
                <h2 className="text-2xl font-bold text-primary mb-4">ICSE Curriculum</h2>
                <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                  The ICSE curriculum for Classes 9 and 10 includes a range of subjects aimed at fostering critical thinking, problem-solving skills, and a deep understanding of core concepts. Our experienced faculty employs innovative teaching methods to make learning engaging and effective. Subjects include English, Hindi, Mathematics, Science (Physics, Chemistry, Biology), History & Civics, Geography, and Computer Applications.
                </p>
              </div>
            </div>

            {/* Exam Preparation Section */}
            <div className={`transition-all duration-1000 ease-out transform ${
              examPrepVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="p-8 rounded-xl bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gold/10 rounded-full mb-4">
                  <span className="text-xl">🎯</span>
                </div>
                <h2 className="text-2xl font-bold text-primary mb-4">Exam Preparation</h2>
                <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                  We provide rigorous exam preparation to ensure students are well-prepared for the ICSE board examinations. This includes regular assessments, mock tests, and personalized support to address individual learning needs. Our goal is to help students achieve their full potential and excel in their board exams.
                </p>
              </div>
            </div>

            {/* Key Features Section */}
            <div 
              ref={sectionRef}
              className={`transition-all duration-1000 ease-out transform ${
                featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                  <span className="text-2xl">⭐</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  Key Features
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {keyFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="group p-6 rounded-xl bg-primary/10 dark:bg-primary/20 text-center hover:bg-primary/20 dark:hover:bg-primary/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-primary text-xl">🎨</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-primary group-hover:text-primary/80 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
                      {feature.description}
                    </p>
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

export default SecondaryAcademics;
