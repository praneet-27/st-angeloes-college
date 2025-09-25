import React, { useState, useEffect } from 'react';
import EnquiryModal from './EnquiryModal';

const FloatingEnquiryButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const toggleVisibility = () => {
      // On mobile: always visible, on desktop: show when scrolled 300px
      if (isMobile) {
        setIsVisible(true);
      } else if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Initial check
    toggleVisibility();

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  const openEnquiryModal = () => {
    setIsEnquiryModalOpen(true);
  };

  const closeEnquiryModal = () => {
    setIsEnquiryModalOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <div
        className={`fixed bottom-6 right-6 z-40 transition-all duration-300 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <button
          onClick={openEnquiryModal}
          className="bg-primary text-white px-4 py-3 md:px-6 rounded-full shadow-lg hover:shadow-xl hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 font-semibold text-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
          <span className="hidden sm:inline">Enquire Now</span>
          <span className="sm:hidden">Enquire</span>
        </button>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal 
        isOpen={isEnquiryModalOpen} 
        onClose={closeEnquiryModal} 
      />
    </>
  );
};

export default FloatingEnquiryButton;
