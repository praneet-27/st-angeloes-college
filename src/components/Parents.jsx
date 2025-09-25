import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const Parents = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setTimeout(() => setCardsVisible(true), 300);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const parentTestimonials = [
    {
      name: "Mrs. Priya Sharma",
      child: "Parent of Arjun Sharma (Class 10)",
      rating: 5,
      feedback: "St. Angeloes College has been a blessing for our family. The teachers are dedicated, the facilities are excellent, and most importantly, my son has grown both academically and personally. The school's focus on holistic development is truly commendable.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Mr. Rajesh Kumar",
      child: "Parent of Sneha Kumar (Class 8)",
      rating: 5,
      feedback: "The academic excellence and the caring environment at St. Angeloes is unmatched. My daughter has developed confidence and critical thinking skills that will serve her well in life. The school's commitment to character building is evident in every interaction.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Mrs. Sunita Patel",
      child: "Parent of Rohan Patel (Class 6)",
      rating: 5,
      feedback: "As a working parent, I appreciate the school's excellent communication and support system. The teachers are always available to discuss my child's progress, and the school events keep us connected with the community. Highly recommended!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Mr. Amit Singh",
      child: "Parent of Kavya Singh (Class 12)",
      rating: 5,
      feedback: "The guidance and support my daughter received during her board exams was exceptional. The teachers went above and beyond to ensure every student's success. St. Angeloes has prepared her not just for exams, but for life ahead.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full mb-4">
            <svg className="w-8 h-8 text-primary dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            What Parents Say
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Hear from our parent community about their experiences and the positive impact St. Angeloes College has had on their children's lives.
          </p>
        </div>

        {/* Parent Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {parentTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`group bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`
              }}
            >
              {/* Rating Stars */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 italic">
                "{testimonial.feedback}"
              </blockquote>

              {/* Parent Info */}
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {testimonial.child}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-12 transition-all duration-1000 ease-out transform ${
          cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '600ms' }}>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Join Our Community
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Be part of the St. Angeloes family and give your child the best educational experience. 
              Schedule a visit or apply for admission today.
            </p>
            <div className="flex justify-center">
              <Link 
                to="/admissions"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 font-semibold"
              >
                Admissions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Parents;
