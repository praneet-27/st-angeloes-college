import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Academics from './components/Academics';
import Kindergarten from './components/Kindergarten';
import PrePrimary from './components/PrePrimary';
import MiddleAcademics from './components/MiddleAcademics';
import SecondaryAcademics from './components/SecondaryAcademics';
import SeniorSecondaryAcademics from './components/SeniorSecondaryAcademics';
import Admissions from './components/Admissions';
import Facilities from './components/Facilities';
import ContactUs from './components/ContactUs';
import Gallery from './components/Gallery';
import Careers from './components/Careers';
import AdminLayout from './components/AdminLayout';
import ProtectedAdmin from './components/ProtectedAdmin';
import Footer from './components/Footer';
import FloatingEnquiryButton from './components/FloatingEnquiryButton';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes - No Header/Footer */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<ProtectedAdmin />} />
        </Route>
        
        {/* Main Website Routes - With Header/Footer */}
        <Route path="/*" element={
          <div className="bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-200">
            <div className="relative min-h-screen w-full flex-col overflow-x-hidden">
              <Header />
              
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/academics" element={<Academics />} />
                <Route path="/kindergarten" element={<Kindergarten />} />
                <Route path="/pre-primary" element={<PrePrimary />} />
                <Route path="/middle-academics" element={<MiddleAcademics />} />
                <Route path="/secondary-academics" element={<SecondaryAcademics />} />
                <Route path="/senior-secondary-academics" element={<SeniorSecondaryAcademics />} />
                <Route path="/admissions" element={<Admissions />} />
                <Route path="/facilities" element={<Facilities />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/careers" element={<Careers />} />
              </Routes>
              
              <Footer />
              
              {/* Floating Enquiry Button */}
              <FloatingEnquiryButton />
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
