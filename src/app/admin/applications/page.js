'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Download, Eye, CheckCircle, XCircle, Clock, 
  ChevronDown, ChevronUp, Mail, Phone, Calendar, Building, 
  MapPin, User, FileText, AlertCircle, ExternalLink, Users
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function ApplicationsAdminPage() {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedApplication, setExpandedApplication] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  // Fetch applications
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/appliction');
      const data = await response.json();
      if (data.success) {
        const sortedData = data.data.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setApplications(sortedData);
        setFilteredApplications(sortedData);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  // Filter and search
  useEffect(() => {
    let result = applications;

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(app => app.status === statusFilter);
    }

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(app =>
        app.name?.toLowerCase().includes(term) ||
        app.email?.toLowerCase().includes(term) ||
        app.position?.title?.toLowerCase().includes(term) ||
        app.position?.department?.toLowerCase().includes(term)
      );
    }

    setFilteredApplications(result);
  }, [searchTerm, statusFilter, applications]);

  // Update application status
  const updateStatus = async (applicationId, status, applicationName) => {
    setUpdatingStatus(applicationId);
    try {
      const response = await fetch(`/api/appliction/${applicationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Update local state
        setApplications(prev => prev.map(app => 
          app._id === applicationId ? { ...app, status } : app
        ));
        
        // Show success toast
        toast.success(`Application from ${applicationName} marked as ${status}`);
      } else {
        toast.error('Failed to update status: ' + data.message);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Error updating status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get relative time
  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return `${Math.floor(diffInHours / 24)} days ago`;
    }
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'rejected': return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'reviewed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'reviewed': return <Eye className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  // Toggle application details
  const toggleApplicationDetails = (id) => {
    setExpandedApplication(expandedApplication === id ? null : id);
  };

  // View PDF in new tab
  const viewResume = (url, name) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      toast.error('Resume URL not available');
    }
  };

  // Download PDF
  const downloadResume = (url, name) => {
    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.download = `Resume_${name.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      toast.error('Resume URL not available');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Applications Management</h1>
              <p className="text-gray-600 mt-1">Review and manage job applications</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={fetchApplications}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{applications.length}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-gray-700" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {applications.filter(a => a.status === 'pending').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-700" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reviewed</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {applications.filter(a => a.status === 'reviewed').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-700" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Accepted</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {applications.filter(a => a.status === 'accepted').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-700" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {applications.filter(a => a.status === 'rejected').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                <XCircle className="w-6 h-6 text-rose-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, email, or position..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-400 focus:outline-none"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-gray-200 focus:border-gray-400 focus:outline-none"
              >
                <option value="all">All Applications</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <div className="flex flex-col items-center justify-center">
                <AlertCircle className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
                <p className="text-gray-600">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your search criteria' 
                    : 'No applications submitted yet'}
                </p>
              </div>
            </div>
          ) : (
            filteredApplications.map((application) => (
              <motion.div
                key={application._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                {/* Application Header */}
                <div 
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-150"
                  onClick={() => toggleApplicationDetails(application._id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(application.status)}`}>
                          {getStatusIcon(application.status)}
                          {application.status?.charAt(0).toUpperCase() + application.status?.slice(1) || 'Pending'}
                        </span>
                        <span className="text-sm text-gray-500">
                          {getRelativeTime(application.createdAt)}
                        </span>
                      </div>
                      
                      <div className="flex items-start gap-4 mb-3">
                        <div className="flex-shrink-0 h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-gray-700 font-medium text-lg">
                            {application.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {application.name}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              {application.email}
                            </span>
                            {application.phone && (
                              <span className="flex items-center gap-1">
                                <Phone className="w-4 h-4" />
                                {application.phone}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
                        <span className="font-medium text-blue-600">
                          {application.position?.title || 'Position not specified'}
                        </span>
                        {application.position?.department && (
                          <span className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            {application.position.department}
                          </span>
                        )}
                        {application.position?.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {application.position.location}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center">
                      {expandedApplication === application._id ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Application Details (Expanded) */}
                <AnimatePresence>
                  {expandedApplication === application._id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-200"
                    >
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          {/* Position Details */}
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                              <Building className="w-4 h-4" />
                              Position Details
                            </h4>
                            <div className="space-y-3">
                              {application.position?.title && (
                                <div>
                                  <p className="text-xs font-medium text-gray-500">Title</p>
                                  <p className="text-gray-900">{application.position.title}</p>
                                </div>
                              )}
                              {application.position?.department && (
                                <div>
                                  <p className="text-xs font-medium text-gray-500">Department</p>
                                  <p className="text-gray-900">{application.position.department}</p>
                                </div>
                              )}
                              {application.position?.type && (
                                <div>
                                  <p className="text-xs font-medium text-gray-500">Type</p>
                                  <p className="text-gray-900">{application.position.type}</p>
                                </div>
                              )}
                              {application.position?.location && (
                                <div>
                                  <p className="text-xs font-medium text-gray-500">Location</p>
                                  <p className="text-gray-900">{application.position.location}</p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Application Info */}
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              Application Info
                            </h4>
                            <div className="space-y-3">
                              <div>
                                <p className="text-xs font-medium text-gray-500">Applied Date</p>
                                <p className="text-gray-900">{formatDate(application.createdAt)}</p>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-500">Status</p>
                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getStatusColor(application.status)}`}>
                                  {getStatusIcon(application.status)}
                                  {application.status?.charAt(0).toUpperCase() + application.status?.slice(1)}
                                </span>
                              </div>
                              {application.coverLetter && (
                                <div>
                                  <p className="text-xs font-medium text-gray-500">Cover Letter</p>
                                  <p className="text-gray-900 text-sm line-clamp-2">{application.coverLetter}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Cover Letter (Full) */}
                        {application.coverLetter && (
                          <div className="mb-6">
                            <h4 className="font-medium text-gray-900 mb-3">Cover Letter</h4>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <p className="text-gray-700 whitespace-pre-line">{application.coverLetter}</p>
                            </div>
                          </div>
                        )}

                        {/* Resume Actions */}
                        <div className="mb-6">
                          <h4 className="font-medium text-gray-900 mb-3">Resume</h4>
                          <div className="flex flex-wrap gap-3">
                            {application.resumeUrl ? (
                              <>
                                <button
                                  onClick={() => viewResume(application.resumeUrl, application.name)}
                                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                                >
                                  <Eye className="w-4 h-4" />
                                  View Resume
                                </button>
                                <button
                                  onClick={() => downloadResume(application.resumeUrl, application.name)}
                                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                >
                                  <Download className="w-4 h-4" />
                                  Download Resume
                                </button>
                              </>
                            ) : (
                              <p className="text-gray-500 text-sm">No resume uploaded</p>
                            )}
                            <a
                              href={`mailto:${application.email}`}
                              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                            >
                              <Mail className="w-4 h-4" />
                              Send Email
                            </a>
                          </div>
                        </div>

                        {/* Status Actions */}
                        <div className="border-t border-gray-200 pt-6">
                          <h4 className="font-medium text-gray-900 mb-4">Update Status</h4>
                          <div className="flex flex-wrap gap-3">
                            {application.status === 'pending' && (
                              <button
                                onClick={() => updateStatus(application._id, 'reviewed', application.name)}
                                disabled={updatingStatus === application._id}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {updatingStatus === application._id ? (
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                                Mark as Reviewed
                              </button>
                            )}

                            {(application.status === 'pending' || application.status === 'reviewed') && (
                              <>
                                <button
                                  onClick={() => updateStatus(application._id, 'accepted', application.name)}
                                  disabled={updatingStatus === application._id}
                                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {updatingStatus === application._id ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                  ) : (
                                    <CheckCircle className="w-4 h-4" />
                                  )}
                                  Accept Application
                                </button>

                                <button
                                  onClick={() => updateStatus(application._id, 'rejected', application.name)}
                                  disabled={updatingStatus === application._id}
                                  className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {updatingStatus === application._id ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                  ) : (
                                    <XCircle className="w-4 h-4" />
                                  )}
                                  Reject Application
                                </button>
                              </>
                            )}

                            {application.status === 'accepted' && (
                              <div className="text-sm text-gray-600">
                                <span className="font-medium">Application accepted.</span> The applicant has been notified.
                              </div>
                            )}

                            {application.status === 'rejected' && (
                              <div className="text-sm text-gray-600">
                                <span className="font-medium">Application rejected.</span> The applicant has been notified.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>
            Total Applications: {applications.length} | 
            Showing: {filteredApplications.length} | 
            Last Updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </main>
    </div>
  );
}