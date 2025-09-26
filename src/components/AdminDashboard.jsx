import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  const dashboardCards = [
    {
      id: 'gallery',
      title: 'Gallery Management',
      description: 'Manage photos, videos, and events in the gallery',
      icon: '🖼️',
      color: 'from-royal-blue to-blue-800',
      hoverColor: 'hover:from-blue-800 hover:to-royal-blue',
      stats: 'Upload & organize images',
      path: '/admin/gallery'
    },
    {
      id: 'enquiries',
      title: 'Enquiries Management',
      description: 'View and manage student enquiries and applications',
      icon: '📧',
      color: 'from-gold to-yellow-500',
      hoverColor: 'hover:from-yellow-500 hover:to-gold',
      stats: 'Track & export enquiries',
      path: '/admin/enquiries'
    },
    {
      id: 'news',
      title: 'News & Events',
      description: 'Create and manage news articles and events',
      icon: '📰',
      color: 'from-green-500 to-emerald-600',
      hoverColor: 'hover:from-emerald-600 hover:to-green-500',
      stats: 'Publish & manage content',
      path: '/admin/news'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Floating Background Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-royal-blue/5 rounded-full animate-float"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gold/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-royal-blue/5 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
      <div className="absolute bottom-20 right-10 w-12 h-12 bg-gold/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>

      {/* Header Section */}
      <header className="bg-gradient-to-r from-royal-blue to-blue-800 text-white py-8 mb-12 animate-fadeIn">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="text-center flex-1">
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6 animate-scaleIn">
                <span className="text-2xl">🎛️</span>
                <span className="font-semibold text-lg">Admin Portal</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slideInUp" style={{ fontFamily: "'Playfair Display', serif" }}>
                St. Angeloes College
              </h1>
              <p className="text-xl opacity-90 animate-slideInUp" style={{ animationDelay: '0.2s' }}>
                Management Dashboard
              </p>
            </div>
            <div className="animate-slideInRight" style={{ animationDelay: '0.3s' }}>
              <button
                onClick={onLogout}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105"
              >
                <span className="text-lg">🚪</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 pb-12">
        {/* Welcome Section */}
        <div className="text-center mb-12 animate-fadeInUp">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Welcome to Admin Portal</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Manage your school's content, enquiries, and communications from one central dashboard
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {dashboardCards.map((card, index) => (
            <div
              key={card.id}
              onClick={() => navigate(card.path)}
              className="group cursor-pointer animate-slideInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/20 group-hover:border-royal-blue/20">
                {/* Card Header */}
                <div className="text-center mb-6">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-all duration-300`}>
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-royal-blue transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 text-sm font-medium">
                    {card.stats}
                  </p>
                </div>

                {/* Card Content */}
                <div className="text-center">
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {card.description}
                  </p>
                  
                  {/* Action Button */}
                  <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${card.color} text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 group-hover:scale-105 ${card.hoverColor} shadow-lg`}>
                    <span>Manage</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-royal-blue/5 to-gold/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Quick Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-royal-blue/20 flex items-center justify-center">
                <span className="text-2xl">🖼️</span>
              </div>
              <h4 className="font-semibold text-slate-800">Gallery</h4>
              <p className="text-sm text-slate-600">Manage visual content</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-gold/20 flex items-center justify-center">
                <span className="text-2xl">📧</span>
              </div>
              <h4 className="font-semibold text-slate-800">Enquiries</h4>
              <p className="text-sm text-slate-600">Track applications</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-green-500/20 flex items-center justify-center">
                <span className="text-2xl">📰</span>
              </div>
              <h4 className="font-semibold text-slate-800">News</h4>
              <p className="text-sm text-slate-600">Publish updates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
