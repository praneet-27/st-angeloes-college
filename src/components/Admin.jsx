import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import AdminGallery from './AdminGallery';
import AdminEnquiries from './AdminEnquiries';
import AdminNews from './AdminNews';

const Admin = ({ onLogout }) => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard onLogout={onLogout} />} />
      <Route path="/gallery" element={<AdminGallery onLogout={onLogout} />} />
      <Route path="/enquiries" element={<AdminEnquiries onLogout={onLogout} />} />
      <Route path="/news" element={<AdminNews onLogout={onLogout} />} />
    </Routes>
  );
};

export default Admin;
