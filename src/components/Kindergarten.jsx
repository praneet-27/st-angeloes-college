import React, { useEffect, useState, useRef } from 'react';

const Kindergarten = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [curriculumVisible, setCurriculumVisible] = useState(false);
  const [activitiesVisible, setActivitiesVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Staggered animations on page load
    const timer1 = setTimeout(() => setHeaderVisible(true), 100);
    const timer2 = setTimeout(() => setCurriculumVisible(true), 300);
    const timer3 = setTimeout(() => setActivitiesVisible(true), 500);
    
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

  const curriculumLevels = [
    {
      id: 1,
      title: "Nursery",
      description: "Focuses on social and emotional skills with storytelling, rhymes, art, and basic letter/number recognition.",
      icon: "child_care",
      color: "primary"
    },
    {
      id: 2,
      title: "LKG",
      description: "Introduces pre-reading/writing, basic math, environmental studies, and creative expression through music.",
      icon: "palette",
      color: "primary"
    },
    {
      id: 3,
      title: "UKG",
      description: "Prepares children for Grade 1 with reading, writing, math, science, and critical thinking skills.",
      icon: "school",
      color: "primary"
    }
  ];

  const activities = [
    { name: "Outdoor Play", icon: "nature_people" },
    { name: "Storytelling", icon: "auto_stories" },
    { name: "Art and Craft", icon: "brush" },
    { name: "Music & Movement", icon: "music_note" },
    { name: "Field Trips", icon: "directions_bus" },
    { name: "Festivals & Events", icon: "celebration" },
    { name: "Simple Science", icon: "science" },
    { name: "Puzzle Solving", icon: "cognition" }
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

      {/* Hero Section */}
      <section className="relative h-64 md:h-80 lg:h-96 w-full bg-cover bg-center flex items-end" 
               style={{ backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBxWw8MZCvYP5y5p16S53Q3GYJ3aj92PtusOqiM-DSUQlwUrhpkvi3Z0Bfo1HpZ86Ab50TfNDfl4JVRovgsSOTjVgj8YarHqrHKkwU-hlerC2rBvpBcTbqSNh4EIiVpc8oIwGxNmwVWy4TT76ydRS7bi2zMUNmdV2p_3Ahx0CGy8V-UzeO-scdj5pywrTYM2IxIzKDoBZtsDtCGOFw-VLzn1Xy62j__7aAsviiwJjWVuc3_FdjZQTKhTS36qGCaLzBqfP4HHH5849cH")' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12">
          <div className={`transition-all duration-1000 ease-out transform ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white">
              Kindergarten
            </h1>
            <p className="mt-2 text-lg md:text-xl font-medium text-white/90">
              In affiliation with
              <span className="font-bold text-white"> Our Little Angels Home</span>
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className={`transition-all duration-1000 ease-out transform ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed text-center">
              St. Angeloes College, Lucknow, is proud to be affiliated with Our Little
              Angels Home preschool, offering a seamless transition from preschool to
              formal schooling. Our Kindergarten program is designed to nurture young
              minds, fostering a love for learning through play-based activities and a
              child-centric curriculum. We provide a safe, stimulating, and supportive
              environment where children can explore, discover, and grow.
            </p>
          </div>

          {/* Curriculum Section */}
          <div className={`mt-12 md:mt-16 transition-all duration-1000 ease-out transform ${
            curriculumVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <span className="text-2xl">📚</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Our Curriculum
              </h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Our Kindergarten program is divided into three levels: Nursery, Lower
                Kindergarten (LKG), and Upper Kindergarten (UKG). Each level is
                tailored to the developmental needs of the children, ensuring a smooth
                progression in their learning journey.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {curriculumLevels.map((level, index) => (
                <div
                  key={level.id}
                  className="group bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* Decorative circle */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-primary/10 rounded-full"></div>
                  
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">🎨</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-primary transition-colors duration-300">
                    {level.title}
                  </h3>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {level.description}
                  </p>
                  
                  {/* Decorative border */}
                  <div className="h-1 w-full bg-gradient-to-r from-primary to-primary/50 mt-6 group-hover:from-gold group-hover:to-gold/50 transition-all duration-300"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Activities Section */}
          <div 
            ref={sectionRef}
            className={`mt-12 md:mt-16 transition-all duration-1000 ease-out transform ${
              activitiesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 rounded-full mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Activities & Engagement
              </h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Our Kindergarten program incorporates a variety of activities to engage
                children and promote holistic development.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-3 p-4 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <span className="text-primary text-lg">🎨</span>
                  </div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors duration-300">
                    {activity.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kindergarten;
