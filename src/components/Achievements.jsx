import React, { useEffect, useState, useRef } from 'react';
import Card from './Common/Card';
import SectionTitle from './Common/SectionTitle';

const Achievements = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const achievements = [
    {
      id: 1,
      title: "Academic Excellence Award",
      description: "Recognizing outstanding academic performance",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBc8Iym7H4xwawEE33rUwpjgVyloExCWRbOtJFB1wztK2RgcTS2kIdEBM-NMqZrDymgZr-ewbGUUQJoJRwHVe2RAmj5erVTrUvnvbyxcDDJkZJccmiOzNfXVJnwWAKcY1lRr30KTH3YsflqVpJL7DhdlysnxGpSFBc3SU_3l6vZFz2vy8AW54GtujFh_ri2_sJpdI-fUaxKTmgSXvufxuDBBC46d_yCxJIPhewjkuFQBWr6E_6JJJY3ZLNbXwpnYJXjlATKMHOmPX-W"
    },
    {
      id: 2,
      title: "Inter-School Debate Championship",
      description: "Celebrating victory in the debate competition",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5hgswf4FcDHUxv4UXjyJ_ICz0jAT9Onne5ZSqDO412JRZVU02JYzMltEs9x3XnFek2Y12jyvywWQTMHgOJSAkMuSxjwdP1EPQKliPSPagucP8l1t7-XmvYxCVQqipL41KHwgBjN8gH4tpwhkbIqx-PuF2CN89oiQ4HiTC-fJSZFjtV92NCuYQtPlCZE0qWLJGUw3Qn3Xw-pPGPu4GfzjaiZJ7aX18EVJhomG6PILM3wBHNt39REdUWhnJG4e7yHWtcB5OBx5Eomol"
    },
    {
      id: 3,
      title: "Annual Sports Day",
      description: "Highlights from our annual sports event",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCItuav0eKLwMC8YxRU4ZrWlji1zI1GeDjDSuqCDEve_BCauq3PJVBWDCgOOO4Ve19W4A6_Tp7woMvKkrsONVM2zUMnlHMm86Ru4BD4wKD7oTRK5XYiFjnLZtSXX0F9ScORWg5fG6Hb2k0gKeXJjN62iQ9i_yLz5_BT7G0R6cSBHLOLxznkDuqTpxdPF4S2_8TwcoHN1GvrIBbxw_scKv1D4aPPxVvfMvOrOahzFGI3v5TDSU4DsjzJ1hwjGlscaLp28Sh0ESArn6Xg"
    }
  ];

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
      <div className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <SectionTitle>Achievements & Awards</SectionTitle>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <div
            key={achievement.id}
            className={`transition-all duration-700 ease-out transform ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
            style={{
              transitionDelay: `${index * 200}ms`
            }}
          >
            <Card hover className="group overflow-hidden">
              <div 
                className="w-full h-48 bg-center bg-cover transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url("${achievement.imageUrl}")`
                }}
              ></div>
              <div className="p-4">
                <p className="text-lg font-semibold text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-primary">
                  {achievement.title}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {achievement.description}
                </p>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
