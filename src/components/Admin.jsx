import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import AdminGallery from './AdminGallery';
import AdminEnquiries from './AdminEnquiries';
import AdminNews from './AdminNews';
import AdminJobOpenings from './AdminJobOpenings';

const Admin = ({ onLogout }) => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard onLogout={onLogout} />} />
      <Route path="/gallery" element={<AdminGallery onLogout={onLogout} />} />
      <Route path="/enquiries" element={<AdminEnquiries onLogout={onLogout} />} />
      <Route path="/news" element={<AdminNews onLogout={onLogout} />} />
      <Route path="/jobs" element={<AdminJobOpenings onLogout={onLogout} />} />
    </Routes>
  );
};

export default Admin;
