import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">St. Angeloes College</h3>
            <p className="text-sm text-slate-300">To Love and To Serve.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="hover:text-white transition-colors text-slate-300" to="/about" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  About Us
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors text-slate-300" to="/academics" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Academics
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors text-slate-300" to="/admissions" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Admissions
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors text-slate-300" to="/facilities" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Facilities
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors text-slate-300" to="/gallery" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Gallery
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors text-slate-300" to="/careers" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Careers
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors text-slate-300" to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">location_on</span>
                <span>SHANTI NAGAR, SAROJINI NAGAR, LUCKNOW</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">call</span>
                <span>+91 8840246549,+91 8090097847</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">mail</span>
                <span>st.angeloes2013@gmail.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a className="hover:text-white transition-colors text-slate-300" href="https://www.facebook.com/stangeloes/" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path>
                </svg>
              </a>
              <a className="hover:text-white transition-colors text-slate-300" href="https://www.instagram.com/stangeloescollege/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-primary/20 pt-8 text-center text-sm text-slate-300">
          <p>© 2025 St. Angeloes College. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
