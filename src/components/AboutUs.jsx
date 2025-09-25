import React, { useEffect, useState, useRef } from 'react';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [principalVisible, setPrincipalVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Staggered animations on page load
    const timer1 = setTimeout(() => setHeaderVisible(true), 100);
    const timer2 = setTimeout(() => setCardsVisible(true), 300);
    const timer3 = setTimeout(() => setPrincipalVisible(true), 500);
    
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
      observer.disconnect();
    };
  }, []);

  const managementTeam = [
    {
      id: 1,
      name: "Mr. Rajesh Verma",
      position: "Chairman",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuByHMXMsKKw4ZJIgJbb0vrrxiJrNck7nkQfL8h0yiATH0ik6u_UOmgxEFGK_qOa1lzOwNV_-NA6R-ALsrqusVf0run9ERKESE7uCFACJs5WQyiJGfkfvorGS-rywAeIvgb4N85R1ViGhCTBwF25BcKvn3PtqZoawAbjWh2Yrmwf8f-lRVCGM7IvobNLTfRAWCcaxQkDBSXRrbvfhMTz6Tcnjff5RtD7jH92QKXdqz_2jG0QupZzJF3fM9oK2i_GEMubCgkqCpG7Wezd"
    },
    {
      id: 2,
      name: "Mrs. Priya Kapoor",
      position: "Vice Principal",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuApkH7vE1XZmajB7afE93_GwVZIeBT0GG_eSTKJbnQStCHWua9oAtobeGtBrGK71_AUXWBjPPvU65NizZX6lcowP4fAtiI6QvuMoTmTyb3hZFYSDe3GMcAEgBD_TTxGwgMJGrAXdlh6LuK0mD2HsbtiQ9zFf4GH0hZCbYG1FO81GoAz9Nwg6QCj8vpB1uFZvf3zEB6SqeFd_jzweEUnoohis73wlt7-lvvs0wlvkXvohEI8E6pje_S8rwxsDTbIhYyfDaNbkXwBZxmx"
    },
    {
      id: 3,
      name: "Mr. Vikram Singh",
      position: "Head of Academics",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAB64NSKPCPpVBXPsVrHCdWI4rPa3NnO6vZdFfloMm-9QXkl1rh6jDBaGbqJH0BXPdb2VOuADu05NpCkwAcKkwW7lGp4-NB_kx9y07EcDg9VT1YTP19Tx66ry8aC2AhuC1mo-k0pqDsz_iG4qf-akNkwfNA6ui2abHmycfUaHdQS9w0-MCbbiKhODsvDL44zFAF9MTcfZL3xNo5vPh9N-pyHom423TXFv9oQ17WtOp5mc_OXNPlSP0d_TkioZxLcJ8wmCAC3MUU4iZS"
    },
    {
      id: 4,
      name: "Ms. Neha Sharma",
      position: "Senior Teacher",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiy4nNmlsGewj8HgW_r8TrMCU6fQCJFcUlbaHkwvIn_rLOBHlSU93tbDAGtsm2bYgxR_1AMJQ4ucmv8v-G8AKeBxJGL-ANLddFrHCupOl-OBIHS-6KZrAGXyLZkx1BKJ1xX0-hUXbnyOV9fSERe_cJp_dsaiqiT9bZyN6xGzegTakpqVe41r3_lo8549FKTRaul3JAbCeCBa3Vd7i1nUA90Om01XiPBEMoQ4uQ1PDqOlq_QeTgCtC0211LKSvoixQIx40S7YI6Reo9"
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
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {/* Header Section */}
              <div className={`text-center transition-all duration-1000 ease-out transform ${
                headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="relative">
                  <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl relative z-10">
                    About Us
                  </h2>
                  <div className={`absolute -top-2 -left-2 w-16 h-16 bg-gold/20 rounded-full transition-all duration-1000 ease-out transform ${
                    headerVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`} style={{ transitionDelay: '200ms' }}></div>
                  <div className={`absolute -bottom-2 -right-2 w-12 h-12 bg-primary/20 rounded-full transition-all duration-1000 ease-out transform ${
                    headerVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`} style={{ transitionDelay: '400ms' }}></div>
                </div>
                <p className={`mt-4 text-lg text-slate-600 dark:text-slate-400 transition-all duration-1000 ease-out transform ${
                  headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`} style={{ transitionDelay: '300ms' }}>
                  Learn more about our history, vision, mission, and the people who make St. Angeloes College a vibrant learning community.
                </p>
              </div>

              {/* History and Vision Mission Grid */}
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                {/* History Card */}
                <div className={`space-y-6 rounded-lg bg-white p-6 shadow-md dark:bg-slate-800 transition-all duration-1000 ease-out transform hover:shadow-xl hover:-translate-y-2 group ${
                  cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`} style={{ transitionDelay: '200ms' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <span className="text-primary text-lg">📚</span>
                    </div>
                    <h3 className="text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors duration-300">History</h3>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    Established in 1995, St. Angeloes College, Lucknow, has been a beacon of academic excellence and holistic development. Founded by Mrs. Anjali Sharma, the college began with a vision to provide quality education rooted in values and discipline. Over the years, it has grown from a small institution to a renowned educational institution, nurturing thousands of students and shaping future leaders. Our journey is marked by continuous improvement, adapting to modern educational needs while preserving our core principles.
                  </p>
                </div>

                {/* Vision & Mission Card */}
                <div className={`space-y-6 rounded-lg bg-white p-6 shadow-md dark:bg-slate-800 transition-all duration-1000 ease-out transform hover:shadow-xl hover:-translate-y-2 group ${
                  cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`} style={{ transitionDelay: '400ms' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                      <span className="text-gold text-lg">🎯</span>
                    </div>
                    <h3 className="text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors duration-300">Vision & Mission</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-primary/5 rounded-lg border-l-4 border-primary group-hover:bg-primary/10 transition-colors duration-300">
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        <strong className="text-primary">Our Vision:</strong> To be a leading educational institution that fosters intellectual curiosity, creativity, and character development, preparing students to excel in a globalized world.
                      </p>
                    </div>
                    <div className="p-4 bg-gold/5 rounded-lg border-l-4 border-gold group-hover:bg-gold/10 transition-colors duration-300">
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        <strong className="text-primary">Our Mission:</strong> To provide a nurturing and stimulating environment that encourages academic rigor, personal growth, and social responsibility. We aim to instill values of integrity, empathy, and lifelong learning in our students, empowering them to become responsible and contributing members of society.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Principal's Message */}
              <div className={`space-y-8 rounded-lg bg-white p-8 shadow-md dark:bg-slate-800 transition-all duration-1000 ease-out transform hover:shadow-xl hover:-translate-y-1 group ${
                principalVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: '600ms' }}>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <span className="text-primary text-lg">👩‍🏫</span>
                    </div>
                    <h3 className="text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors duration-300">Principal's Message</h3>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-8 md:flex-row">
                  <div className="relative h-48 w-48 flex-shrink-0 group">
                    <div 
                      className="h-full w-full rounded-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{
                        backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCs-inp9pSnsu80xHb0WbpkBJgKCmedYLjz5AIEySbT46reuWmu9PkuwPjs4y_ft4nBxelGi8i-Nbx6oAbPkeUmZADSsxeou9e3vrISwDgr-GkI8ARUEjCAxkmljMmVkv-JzOGEX0Y6mYoLbbS7ZRMxwxGatHK3PMt2Bwx42BROPsuJuZVNFH0LB7C0SQbkkQUL3Mb0eJrcWUnk6FpajR0Yn0SYWlEBYDGfgjyB7mkPyPspXzy_JZDVMVcr_QPyAioVG4LeUr331936")`
                      }}
                    ></div>
                    <div className="absolute inset-0 rounded-full ring-4 ring-primary/20 transition-all duration-300 group-hover:ring-primary/40"></div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gold rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-center md:text-left">
                    <div className="space-y-2">
                      <p className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors duration-300">Mrs. Anjali Sharma</p>
                      <p className="text-md text-primary font-semibold">Principal</p>
                    </div>
                    <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border-l-4 border-primary group-hover:bg-slate-100 dark:group-hover:bg-slate-700 transition-colors duration-300">
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic">
                        "It is with great pleasure that I welcome you to St. Angeloes College. Our commitment to excellence in education is unwavering. We believe in fostering an environment where every student can thrive academically, socially, and emotionally. Our dedicated faculty and staff work tirelessly to ensure that our students receive the best possible education, preparing them for future success. Together, we create a community that values respect, integrity, and a passion for learning."
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Management & Faculty */}
              <div ref={sectionRef} className="space-y-8">
                <h3 className={`text-center text-3xl font-bold text-slate-900 dark:text-white transition-all duration-1000 ease-out transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`} style={{ transitionDelay: '800ms' }}>
                  Management & Faculty
                </h3>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {managementTeam.map((member, index) => (
                    <div
                      key={member.id}
                      className={`flex flex-col items-center text-center transition-all duration-700 ease-out transform hover:scale-105 ${
                        isVisible 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-12'
                      }`}
                      style={{
                        transitionDelay: `${1000 + (index * 150)}ms`
                      }}
                    >
                      <div className="relative h-32 w-32 group">
                        <div 
                          className="h-full w-full rounded-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                          style={{
                            backgroundImage: `url("${member.imageUrl}")`
                          }}
                        ></div>
                        <div className="absolute inset-0 rounded-full ring-2 ring-primary/20 transition-all duration-300 group-hover:ring-primary/40"></div>
                      </div>
                      <p className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                        {member.name}
                      </p>
                      <p className="text-sm text-primary">
                        {member.position}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AboutUs;
