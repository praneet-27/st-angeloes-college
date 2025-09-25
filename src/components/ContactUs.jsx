import React, { useEffect, useState, useRef } from 'react';

const ContactUs = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Page load animations
    const timer1 = setTimeout(() => setHeaderVisible(true), 100);
    const timer2 = setTimeout(() => setFormVisible(true), 300);
    const timer3 = setTimeout(() => setInfoVisible(true), 500);

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
      observer.disconnect();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      // Reset form fields
      const form = e.target;
      form.reset();
    }, 3000);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-200 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/5 rounded-full animate-float"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gold/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-primary/5 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
      <div className="absolute bottom-20 right-10 w-12 h-12 bg-gold/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div 
            className={`text-center mb-16 transition-all duration-1000 ease-out transform ${
              headerVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-full mb-6">
              <span className="text-primary text-lg">📞</span>
              <span className="text-primary font-semibold text-sm">Contact Us</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
              Get in Touch
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              We're here to help! Reach out to us with any questions or inquiries. Our team is dedicated to providing prompt and helpful assistance.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">
            {/* Contact Form */}
            <div 
              className={`bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 transition-all duration-1000 ease-out transform ${
                formVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium leading-6 text-slate-900 dark:text-white mb-2" htmlFor="name">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    placeholder="Enter your name"
                    className="block w-full rounded-lg border-0 bg-white dark:bg-slate-700/50 py-3 px-4 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-600 focus:ring-2 focus:ring-inset focus:ring-primary transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium leading-6 text-slate-900 dark:text-white mb-2" htmlFor="email">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    className="block w-full rounded-lg border-0 bg-white dark:bg-slate-700/50 py-3 px-4 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-600 focus:ring-2 focus:ring-inset focus:ring-primary transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium leading-6 text-slate-900 dark:text-white mb-2" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    placeholder="Enter your phone number"
                    className="block w-full rounded-lg border-0 bg-white dark:bg-slate-700/50 py-3 px-4 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-600 focus:ring-2 focus:ring-inset focus:ring-primary transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium leading-6 text-slate-900 dark:text-white mb-2" htmlFor="class">
                    Class Interested
                  </label>
                  <select
                    id="class"
                    name="class"
                    className="block w-full rounded-lg border-0 bg-white dark:bg-slate-700/50 py-3 px-4 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-600 focus:ring-2 focus:ring-inset focus:ring-primary transition-all duration-300"
                  >
                    <option value="">Select a class</option>
                    <option value="playgroup">Playgroup</option>
                    <option value="nursery">Nursery</option>
                    <option value="kindergarten">Kindergarten</option>
                    <option value="1">Class 1</option>
                    <option value="2">Class 2</option>
                    <option value="3">Class 3</option>
                    <option value="4">Class 4</option>
                    <option value="5">Class 5</option>
                    <option value="6">Class 6</option>
                    <option value="7">Class 7</option>
                    <option value="8">Class 8</option>
                    <option value="9">Class 9</option>
                    <option value="10">Class 10</option>
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium leading-6 text-slate-900 dark:text-white mb-2" htmlFor="message">
                    Any Queries/Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="Enter your queries or message"
                    className="block w-full rounded-lg border-0 bg-white dark:bg-slate-700/50 py-3 px-4 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-600 focus:ring-2 focus:ring-inset focus:ring-primary transition-all duration-300 resize-none"
                  ></textarea>
                </div>

                <div>
                  {!isSubmitted ? (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex w-full justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Submitting...</span>
                        </div>
                      ) : (
                        'Submit Message'
                      )}
                    </button>
                  ) : (
                    <div className="text-center py-4">
                      <div className="relative">
                        {/* Success Icon Animation */}
                        <div className="w-16 h-16 mx-auto mb-4 relative">
                          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center animate-pulse">
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                          </div>
                          
                          {/* Floating particles */}
                          <div className="absolute inset-0">
                            <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping"></div>
                            <div className="absolute top-3 right-2 w-1 h-1 bg-green-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                            <div className="absolute bottom-2 left-3 w-1 h-1 bg-green-500 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                            <div className="absolute bottom-1 right-1 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-bold text-green-600 dark:text-green-400 mb-2 animate-fadeInUp">
                          Message Sent!
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                          Thank you for contacting us. We'll get back to you soon!
                        </p>
                        
                        {/* Progress bar */}
                        <div className="mt-4 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-progress"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>

            {/* Contact Information */}
            <div 
              className={`space-y-8 transition-all duration-1000 ease-out transform ${
                infoVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              ref={sectionRef}
            >
              {/* Map */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700">
                <iframe
                  className="w-full h-80 rounded-xl"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.61391741743!2d80.9461656150444!3d26.85176198315486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd0813089e03%3A0x729221190e38b335!2sLucknow%2C%20Uttar%20Pradesh%2C%20India!5e0!3m2!1sen!2sus!4v1684321567890!5m2!1sen!2sus"
                  title="St. Angelo's College Location Map"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Contact Details */}
              <div className="space-y-6 text-base text-slate-600 dark:text-slate-400">
                <div className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 group">
                  <span className="text-primary text-xl mt-1 group-hover:scale-110 transition-transform duration-300">📍</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">St. Angeloes College</strong><br/>
                    123 Education Lane, Lucknow, Uttar Pradesh, India
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 group">
                  <span className="text-primary text-xl mt-1 group-hover:scale-110 transition-transform duration-300">📞</span>
                  <div>+91-987-654-3210, +91-987-654-3211</div>
                </div>

                <div className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 group">
                  <span className="text-primary text-xl mt-1 group-hover:scale-110 transition-transform duration-300">✉️</span>
                  <div>info@stangelos.edu.in</div>
                </div>

                <div className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 group">
                  <span className="text-primary text-xl mt-1 group-hover:scale-110 transition-transform duration-300">🕒</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Office Hours:</strong><br/>
                    Monday - Friday, 9 AM - 5 PM
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Connect With Us</h3>
                <div className="flex gap-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 text-primary dark:text-white/80 transition-all duration-300 transform hover:scale-110"
                    aria-label="Facebook"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 text-primary dark:text-white/80 transition-all duration-300 transform hover:scale-110"
                    aria-label="Instagram"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 012.153 1.252A4.902 4.902 0 0121.47 6.08c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.252 2.153 4.902 4.902 0 01-2.153 1.252c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-2.153-1.252A4.902 4.902 0 013.12 17.92c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.252-2.153A4.902 4.902 0 016.08 3.12c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm6.406-11.845a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z"/>
                    </svg>
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 text-primary dark:text-white/80 transition-all duration-300 transform hover:scale-110"
                    aria-label="YouTube"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.812 5.418c.861.23 1.54 1.025 1.762 1.886C21.992 8.71 22 12.014 22 12.014s-.008 3.304-.226 4.71c-.222.861-.901 1.656-1.762 1.886-1.488.426-7.774.426-7.774.426s-6.286 0-7.774-.426a2.585 2.585 0 01-1.762-1.886C2.008 15.318 2 12.014 2 12.014s.008-3.304.226-4.71a2.585 2.585 0 011.762-1.886C5.474 5 11.76 5 11.76 5s6.286 0 7.774.426l.278-.008zM9.75 15.02V9.008l4.822 3.006-4.822 3.006z"/>
                    </svg>
                  </a>
                  <a
                    href="https://whatsapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 text-primary dark:text-white/80 transition-all duration-300 transform hover:scale-110"
                    aria-label="WhatsApp"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16.64 13.56c-.23.13-.8.39-.93.45-.13.07-.22.09-.39.09-.22 0-.4-.05-.56-.23-.17-.18-.68-2.09-.82-2.31-.14-.23-.28-.26-.39-.26-.11 0-.23.04-.33.11-.1.07-1.12 1.34-1.3 1.56-.18.23-.36.26-.53.23-.17-.02-.73-.26-1.39-.82-.51-.43-.85-.96-1-1.3-.15-.34-.05-.51.05-.66.09-.13.21-.21.28-.28.08-.08.11-.13.18-.23s.02-.18-.02-.34c-.05-.17-.48-1.16-.66-1.58-.17-.41-.34-.34-.48-.35-.12 0-.28 0-.43 0-.15 0-.39.04-.6.23-.2.18-.78.75-.78 1.82 0 1.07.8 2.11.91 2.26.11.15 1.56 2.4 3.78 3.34.55.24 1.02.39 1.38.49.6.17 1.15.14 1.58.09.48-.07 1.44-.59 1.64-.81.2-.23.2-.41.15-.48-.05-.07-.17-.11-.34-.2zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
