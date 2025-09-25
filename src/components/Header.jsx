import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Common/Button';
import EnquiryModal from './EnquiryModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openEnquiryModal = () => {
    setIsEnquiryModalOpen(true);
  };

  const closeEnquiryModal = () => {
    setIsEnquiryModalOpen(false);
  };

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-primary/10 dark:bg-primary/20 text-sm text-primary dark:text-slate-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-3">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <a 
                className="flex items-center gap-2 hover:text-primary/80 dark:hover:text-white transition-colors" 
                href="tel:+91-522-1234567"
              >
                <span className="material-symbols-outlined text-base">call</span>
                <span className="font-medium">+91-522-1234567</span>
              </a>
              <a 
                className="flex items-center gap-2 hover:text-primary/80 dark:hover:text-white transition-colors" 
                href="mailto:info@stangeloslucknow.com"
              >
                <span className="material-symbols-outlined text-base">mail</span>
                <span className="font-medium">info@stangeloslucknow.com</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base">location_on</span>
              <span className="font-medium text-center">Vibutikhand, Gomti Nagar, Lucknow, UP 226010</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-8">
              <Link className="flex items-center gap-3" to="/">
                <div className="w-10 h-10 text-primary">
                  <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
                  </svg>
                </div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">St. Angeloes College</h1>
              </Link>
              
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-6">
                <Link className="text-sm font-medium hover:text-primary dark:hover:text-primary transition-all duration-300 hover:scale-105 relative group" to="/about" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  About Us
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link className="text-sm font-medium hover:text-primary dark:hover:text-primary transition-all duration-300 hover:scale-105 relative group" to="/academics" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Academics
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link className="text-sm font-medium hover:text-primary dark:hover:text-primary transition-all duration-300 hover:scale-105 relative group" to="/admissions" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Admissions
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link className="text-sm font-medium hover:text-primary dark:hover:text-primary transition-all duration-300 hover:scale-105 relative group" to="/facilities" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Facilities
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link className="text-sm font-medium hover:text-primary dark:hover:text-primary transition-all duration-300 hover:scale-105 relative group" to="/gallery" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Gallery
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link className="text-sm font-medium hover:text-primary dark:hover:text-primary transition-all duration-300 hover:scale-105 relative group" to="/careers" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Careers
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link className="text-sm font-medium hover:text-primary dark:hover:text-primary transition-all duration-300 hover:scale-105 relative group" to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Contact
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button 
                  variant="primary" 
                  className="hidden sm:inline-flex"
                  onClick={openEnquiryModal}
                >
                  Enquire Now
                </Button>
              </div>
              
              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={toggleMenu}
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 py-4">
              <nav className="flex flex-col gap-4">
                <Link className="text-sm font-medium hover:text-primary dark:hover:text-primary transition-colors" to="/about" onClick={() => { setIsMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>About Us</Link>
                <Link className="text-sm font-medium hover:text-primary dark:hover:text-primary transition-colors" to="/academics" onClick={() => { setIsMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Academics</Link>
                <Link className="text-sm font-medium hover:text-primary dark:hover:text-primary transition-colors" to="/admissions" onClick={() => { setIsMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Admissions</Link>
                <Link className="text-sm font-medium hover:text-primary dark:hover:text-primary transition-colors" to="/facilities" onClick={() => { setIsMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Facilities</Link>
                <Link className="text-sm font-medium hover:text-primary dark:hover:text-primary transition-colors" to="/gallery" onClick={() => { setIsMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Gallery</Link>
                <Link className="text-sm font-medium hover:text-primary dark:hover:text-primary transition-colors" to="/careers" onClick={() => { setIsMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Careers</Link>
                <Link className="text-sm font-medium hover:text-primary dark:hover:text-primary transition-colors" to="/contact" onClick={() => { setIsMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Contact</Link>
              </nav>
            </div>
          )}
        </div>
      </header>
      
      {/* Enquiry Modal */}
      <EnquiryModal 
        isOpen={isEnquiryModalOpen} 
        onClose={closeEnquiryModal} 
      />
    </>
  );
};

export default Header;
