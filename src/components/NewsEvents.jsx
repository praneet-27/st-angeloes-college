import React, { useEffect, useState, useRef } from 'react';
import Card from './Common/Card';
import SectionTitle from './Common/SectionTitle';

const NewsEvents = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const newsItems = [
    {
      id: 1,
      title: "School Reopening",
      description: "Important dates and guidelines for the new session.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxU92XyR5K7e-gU1_vYjB9uT2K_3Q6a4c_e8t4O1yP3z_mBw5p8s3t3_f9i-xQkZgP-zX_k8d0tB_z_rG-a-P1_u-r-P-q-T-s-y-R-g-F-y-L-k-D-c-A-b-J-h-G-f-E-d-C-b-A-0-x-w-Y-v-U-t-S-r-Q-p-O-n-M-l-K-j-I-h-G-f-E-d-C-b-A-9-8-7-6-5-4-3-2-1-0"
    },
    {
      id: 2,
      title: "Parent-Teacher Meeting",
      description: "Scheduled for the upcoming weekend. Details inside.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2d-9F-7b4k_kH_gP_k3l4j8fG-t3o_u2v9_m7O-z-y-x-w-v-u-t-s-r-q-p-o-n-m-l-k-j-i-h-g-f-e-d-c-b-a-A-B-C-D-E-F-G-H-I-J-K-L-M-N-O-P-Q-R-S-T-U-V-W-X-Y-Z-0-1-2-3-4-5-6-7-8-9"
    },
    {
      id: 3,
      title: "Holiday Notice",
      description: "School will be closed on the occasion of the festival.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7tY8oP-z9i-q8f_l2g_h5e_d4c_b3a_X-W-V-U-T-S-R-Q-P-O-N-M-L-K-J-I-H-G-F-E-D-C-B-A-a-b-c-d-e-f-g-h-i-j-k-l-m-n-o-p-q-r-s-t-u-v-w-x-y-z-0-1-2-3-4-5-6-7-8-9"
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
        <SectionTitle>News & Announcements</SectionTitle>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {newsItems.map((item, index) => (
          <div
            key={item.id}
            className={`transition-all duration-700 ease-out transform ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
            style={{
              transitionDelay: `${index * 150}ms`
            }}
          >
            <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
              <div 
                className="w-full h-40 bg-center bg-cover transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage: `url("${item.imageUrl}")`
                }}
              ></div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsEvents;
