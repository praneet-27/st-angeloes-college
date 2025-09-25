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
                <span>Vibutikhand, Gomti Nagar, Lucknow</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">call</span>
                <span>+91-522-1234567</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">mail</span>
                <span>info@stangeloslucknow.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a className="hover:text-white transition-colors text-slate-300" href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path>
                </svg>
              </a>
              <a className="hover:text-white transition-colors text-slate-300" href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"></path>
                </svg>
              </a>
              <a className="hover:text-white transition-colors text-slate-300" href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
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
