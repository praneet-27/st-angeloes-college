import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminJobOpenings = ({ onLogout }) => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    department: '',
    job_type: 'Full-time',
    description: '',
    requirements: '',
    responsibilities: '',
    benefits: '',
    salary_range: '',
    experience_level: '',
    education_required: '',
    location: '',
    application_deadline: '',
    is_featured: false
  });

  // Fetch job openings
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/job-openings');
      const result = await response.json();
      
      if (result.success) {
        setJobs(result.data);
      } else {
        console.error('Failed to fetch jobs:', result.error);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem('admin_token');
      const url = editingJob ? `/api/job-openings?id=${editingJob.id}` : '/api/job-openings';
      const method = editingJob ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        setShowForm(false);
        setEditingJob(null);
        resetForm();
        fetchJobs();
        alert(editingJob ? 'Job updated successfully!' : 'Job created successfully!');
      } else {
        alert(result.error || 'Failed to save job');
      }
    } catch (error) {
      console.error('Error saving job:', error);
      alert('Failed to save job');
    } finally {
      setSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      department: '',
      job_type: 'Full-time',
      description: '',
      requirements: '',
      responsibilities: '',
      benefits: '',
      salary_range: '',
      experience_level: '',
      education_required: '',
      location: '',
      application_deadline: '',
      is_featured: false
    });
  };

  // Handle edit
  const handleEdit = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title || '',
      department: job.department || '',
      job_type: job.job_type || 'Full-time',
      description: job.description || '',
      requirements: job.requirements || '',
      responsibilities: job.responsibilities || '',
      benefits: job.benefits || '',
      salary_range: job.salary_range || '',
      experience_level: job.experience_level || '',
      education_required: job.education_required || '',
      location: job.location || '',
      application_deadline: job.application_deadline ? job.application_deadline.split('T')[0] : '',
      is_featured: job.is_featured || false
    });
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job opening?')) return;

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/job-openings?id=${jobId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();

      if (result.success) {
        fetchJobs();
        alert('Job opening deleted successfully!');
      } else {
        alert(result.error || 'Failed to delete job');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete job');
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Floating Background Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/5 rounded-full animate-float"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-indigo-500/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-purple-500/5 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
      <div className="absolute bottom-20 right-10 w-12 h-12 bg-indigo-500/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>

      {/* Header */}
      <header className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-8 mb-8 animate-fadeIn">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="text-center flex-1">
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-4 animate-scaleIn">
                <span className="text-2xl">💼</span>
                <span className="font-semibold text-lg">Job Openings Management</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 animate-slideInUp" style={{ fontFamily: "'Playfair Display', serif" }}>
                Career Opportunities
              </h1>
              <p className="text-xl opacity-90 animate-slideInUp" style={{ animationDelay: '0.2s' }}>
                Manage job openings and career listings
              </p>
            </div>
            <div className="flex gap-4 animate-slideInRight" style={{ animationDelay: '0.3s' }}>
              <button
                onClick={() => navigate('/admin')}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105"
              >
                <span className="text-lg">🏠</span>
                <span>Dashboard</span>
              </button>
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
        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-8 animate-fadeInUp">
          <h2 className="text-2xl font-bold text-slate-800">Job Openings</h2>
          <button
            onClick={() => {
              resetForm();
              setEditingJob(null);
              setShowForm(true);
            }}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2"
          >
            <span className="text-lg">➕</span>
            <span>Add New Job</span>
          </button>
        </div>

        {/* Jobs List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg animate-pulse">
                <div className="h-4 bg-slate-200 rounded mb-3"></div>
                <div className="h-3 bg-slate-200 rounded mb-2"></div>
                <div className="h-3 bg-slate-200 rounded mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-8 bg-slate-200 rounded flex-1"></div>
                  <div className="h-8 bg-slate-200 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg animate-fadeInUp">
            <div className="text-6xl mb-4">💼</div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No Job Openings Yet</h3>
            <p className="text-slate-600 mb-6">Start by adding your first job opening to attract talented candidates.</p>
            <button
              onClick={() => {
                resetForm();
                setEditingJob(null);
                setShowForm(true);
              }}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Add First Job Opening
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job, index) => (
              <div
                key={job.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-slideInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {job.is_featured && (
                  <div className="bg-gradient-to-r from-gold to-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 inline-block">
                    ⭐ Featured
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-slate-800 mb-2">{job.title}</h3>
                <p className="text-slate-600 text-sm mb-2">{job.department} • {job.job_type}</p>
                
                {job.description && (
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">{job.description}</p>
                )}
                
                <div className="space-y-2 mb-4 text-sm">
                  {job.salary_range && (
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">💰</span>
                      <span className="text-slate-600">{job.salary_range}</span>
                    </div>
                  )}
                  {job.experience_level && (
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">📈</span>
                      <span className="text-slate-600">{job.experience_level}</span>
                    </div>
                  )}
                  {job.location && (
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">📍</span>
                      <span className="text-slate-600">{job.location}</span>
                    </div>
                  )}
                  {job.application_deadline && (
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">⏰</span>
                      <span className="text-slate-600">Deadline: {formatDate(job.application_deadline)}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(job)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Job Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => {
                setShowForm(false);
                setEditingJob(null);
                resetForm();
              }}
            ></div>
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scaleIn">
              <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-slate-800">
                  {editingJob ? 'Edit Job Opening' : 'Add New Job Opening'}
                </h3>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingJob(null);
                    resetForm();
                  }}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <span className="material-symbols-outlined text-slate-500">close</span>
                </button>
              </div>
              
              <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Job Title *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="e.g., High School Math Teacher"
                        required
                      />
                    </div>

                    {/* Department */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Department *
                      </label>
                      <input
                        type="text"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="e.g., Mathematics Department"
                        required
                      />
                    </div>

                    {/* Job Type */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Job Type *
                      </label>
                      <select
                        value={formData.job_type}
                        onChange={(e) => setFormData({ ...formData, job_type: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="e.g., Lucknow, Uttar Pradesh"
                      />
                    </div>

                    {/* Application Deadline */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Application Deadline
                      </label>
                      <input
                        type="date"
                        value={formData.application_deadline}
                        onChange={(e) => setFormData({ ...formData, application_deadline: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    {/* Salary Range */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Salary Range
                      </label>
                      <input
                        type="text"
                        value={formData.salary_range}
                        onChange={(e) => setFormData({ ...formData, salary_range: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="e.g., ₹50,000 - ₹70,000 per month"
                      />
                    </div>

                    {/* Experience Level */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Experience Level
                      </label>
                      <select
                        value={formData.experience_level}
                        onChange={(e) => setFormData({ ...formData, experience_level: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select Experience Level</option>
                        <option value="Entry-Level">Entry-Level</option>
                        <option value="Mid-Level">Mid-Level</option>
                        <option value="Mid-Senior Level">Mid-Senior Level</option>
                        <option value="Senior Level">Senior Level</option>
                      </select>
                    </div>

                    {/* Education Required */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Education Required
                      </label>
                      <input
                        type="text"
                        value={formData.education_required}
                        onChange={(e) => setFormData({ ...formData, education_required: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="e.g., Master's Degree"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Job Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Describe the role and what the candidate will be doing..."
                      required
                    />
                  </div>

                  {/* Requirements */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Requirements
                    </label>
                    <textarea
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="List the required qualifications and skills..."
                    />
                  </div>

                  {/* Responsibilities */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Key Responsibilities
                    </label>
                    <textarea
                      value={formData.responsibilities}
                      onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="List the main responsibilities and duties..."
                    />
                  </div>

                  {/* Benefits */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Benefits & Perks
                    </label>
                    <textarea
                      value={formData.benefits}
                      onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="List the benefits and perks offered..."
                    />
                  </div>

                  {/* Featured Checkbox */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="is_featured"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                      className="w-5 h-5 text-purple-600 border-slate-300 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="is_featured" className="text-sm font-semibold text-slate-700">
                      Mark as Featured Job (will appear prominently on careers page)
                    </label>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditingJob(null);
                        resetForm();
                      }}
                      className="px-6 py-3 text-slate-600 hover:text-slate-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>{editingJob ? 'Updating...' : 'Creating...'}</span>
                        </>
                      ) : (
                        <span>{editingJob ? 'Update Job' : 'Create Job'}</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminJobOpenings;
