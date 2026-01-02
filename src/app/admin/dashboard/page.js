'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  FolderKanban,
  Mail,
  FileText,
  Users,
  RefreshCw,
  Bell,
  ChevronRight,
  Building,
  Clock,
  DollarSign,
  MapPin,
  Calendar,
  User,
  Phone,
  Download,
  Eye,
  Edit,
  ExternalLink,
  TrendingUp,
  BarChart3,
  Layers,
  Briefcase,
  MessageSquare,
  FileCheck,
  Plus,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  Search,
  Filter,
  MoreVertical
} from 'lucide-react';

function DashboardPage() {
  const [activeSection, setActiveSection] = useState('projects');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const [statsData, setStatsData] = useState({
    totalProjects: 0,
    totalInquiries: 0,
    totalApplications: 0,
    pendingTasks: 0
  });
  
  const [projectsData, setProjectsData] = useState([]);
  const [jobsData, setJobsData] = useState([]);
  const [inquiriesData, setInquiriesData] = useState([]);
  const [applicationsData, setApplicationsData] = useState([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setIsRefreshing(true);
    setError(null);
    
    try {
      const [projectsRes, applicationsRes, inquiriesRes] = await Promise.allSettled([
        fetch('/api/projects'),
        fetch('/api/appliction'),
        fetch('/api/contact')
      ]);

      let totalProjects = 0;
      let totalApplications = 0;
      let totalInquiries = 0;
      let pendingTasks = 0;

      if (projectsRes.status === 'fulfilled') {
        const projectsData = await projectsRes.value.json();
        if (projectsData.success) {
          setProjectsData(projectsData.data || []);
          totalProjects = (projectsData.data || []).length;
        }
      }

      if (applicationsRes.status === 'fulfilled') {
        const applicationsData = await applicationsRes.value.json();
        if (applicationsData.success) {
          setApplicationsData(applicationsData.data || []);
          totalApplications = (applicationsData.data || []).length;
        }
      }

      if (inquiriesRes.status === 'fulfilled') {
        const inquiriesData = await inquiriesRes.value.json();
        if (inquiriesData.success) {
          setInquiriesData(inquiriesData.data || []);
          totalInquiries = (inquiriesData.data || []).length;
        }
      }

      setStatsData({
        totalProjects,
        totalInquiries,
        totalApplications,
        pendingTasks
      });

      const jobsRes = await fetch('/api/careers');
      if (jobsRes.ok) {
        const jobsData = await jobsRes.json();
        if (jobsData.success) {
          setJobsData(jobsData.data || []);
        }
      }

    } catch (err) {
      setError('Failed to fetch dashboard data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return 'N/A';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase();
    if (statusLower === 'completed' || statusLower === 'accepted') {
      return 'bg-gray-100 text-gray-800 border border-gray-300';
    } else if (statusLower === 'active' || statusLower === 'published') {
      return 'bg-gray-50 text-gray-800 border border-gray-300';
    } else if (statusLower === 'pending' || statusLower === 'draft') {
      return 'bg-gray-50 text-gray-800 border border-gray-300';
    } else if (statusLower === 'rejected' || statusLower === 'closed') {
      return 'bg-gray-100 text-gray-800 border border-gray-300';
    } else {
      return 'bg-gray-50 text-gray-800 border border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    const statusLower = status?.toLowerCase();
    if (statusLower === 'completed' || statusLower === 'accepted') {
      return <CheckCircle className="w-3 h-3" />;
    } else if (statusLower === 'active' || statusLower === 'published') {
      return <ClockIcon className="w-3 h-3" />;
    } else if (statusLower === 'pending' || statusLower === 'draft') {
      return <ClockIcon className="w-3 h-3" />;
    } else if (statusLower === 'rejected' || statusLower === 'closed') {
      return <XCircle className="w-3 h-3" />;
    } else {
      return <ClockIcon className="w-3 h-3" />;
    }
  };

  const stats = [
    {
      label: 'Total Projects',
      value: statsData.totalProjects,
      icon: <Layers className="w-5 h-5" />,
      link: '/admin/projects'
    },
    {
      label: 'Active Jobs',
      value: jobsData.filter(job => job.isActive).length,
      icon: <Briefcase className="w-5 h-5" />,
      link: '/admin/careers'
    },
    {
      label: 'New Inquiries',
      value: statsData.totalInquiries,
      icon: <MessageSquare className="w-5 h-5" />,
      link: '/admin/inquiries'
    },
    {
      label: 'Applications',
      value: statsData.totalApplications,
      icon: <FileCheck className="w-5 h-5" />,
      link: '/admin/applications'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-2 border-gray-300 rounded-full"></div>
            <div className="w-16 h-16 border-2 border-gray-800 border-t-transparent rounded-full animate-spin absolute top-0"></div>
          </div>
          <p className="mt-6 text-gray-700 font-medium">Loading Dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
                <span className="text-white font-semibold">A</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Dashboard Overview
                </h1>
                <p className="text-sm text-gray-500">
                  Last updated just now
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={fetchAllData}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="text-sm text-gray-700">Refresh</span>
              </button>
              
              <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="relative">
                <div className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center">
                  <span className="font-medium text-gray-700">A</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={stat.link}>
                <div className="bg-white border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg border border-gray-200">
                      <div className="text-gray-700">
                        {stat.icon}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                  </div>
                  
                  <div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex border-b border-gray-200">
              {[
                { id: 'projects', label: 'Projects', icon: <Layers className="w-4 h-4" /> },
                { id: 'jobs', label: 'Jobs', icon: <Briefcase className="w-4 h-4" /> },
                { id: 'inquiries', label: 'Inquiries', icon: <MessageSquare className="w-4 h-4" /> },
                { id: 'applications', label: 'Applications', icon: <FileCheck className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`relative flex items-center gap-2 px-5 py-3 font-medium text-sm transition-colors ${
                    activeSection === tab.id
                      ? 'text-gray-900 border-b-2 border-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                    {eval(`${tab.id}Data`).length}
                  </span>
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-sm text-gray-700">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <Link href={
                activeSection === 'projects' ? "/admin/projects" : 
                activeSection === 'jobs' ? "/admin/careers" :
                activeSection === 'inquiries' ? "/admin/inquiries" :
                "/admin/applications"
              }>
                <button className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-800">
                  {activeSection === 'projects' ? 'New Project' :
                   activeSection === 'jobs' ? 'Post Job' :
                   activeSection === 'inquiries' ? 'View All' :
                   'Manage All'}
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white border border-gray-200 rounded-lg"
          >
            {/* Section Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Total {eval(`${activeSection}Data`).length} records
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 text-sm w-64"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-sm text-gray-700">
                    <ExternalLink className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Projects Section */}
              {activeSection === 'projects' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {projectsData.map((project, index) => (
                    <div
                      key={project._id}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow"
                    >
                      {/* Project Image */}
                      <div className="relative h-40 bg-gray-100">
                        {project.headerimage ? (
                          <img
                            src={project.headerimage}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Building className="w-10 h-10 text-gray-400" />
                          </div>
                        )}
                        <div className="absolute top-3 right-3">
                          <span className={`px-2 py-1 rounded text-xs ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                        </div>
                      </div>
                      
                      {/* Project Details */}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {project.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Project Meta */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-700">{project.location || 'N/A'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-700">{formatCurrency(project.cost)}</span>
                          </div>
                        </div>

                        {/* Last Updated */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <span className="text-xs text-gray-500">
                            {formatDate(project.updatedAt)}
                          </span>
                          <button className="text-xs text-gray-600 hover:text-gray-900">
                            View Details →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Jobs Section */}
              {activeSection === 'jobs' && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Job Title</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Department</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Location</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {jobsData.map((job, index) => (
                        <tr key={job._id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center mr-3">
                                <Briefcase className="w-4 h-4 text-gray-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{job.title}</div>
                                <div className="text-xs text-gray-500">{formatDate(job.createdAt)}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-gray-900">{job.department || 'N/A'}</span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-900">{job.location || 'N/A'}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-gray-900 capitalize">{job.type || 'N/A'}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                              job.isActive ? 'bg-gray-100 text-gray-800' : 'bg-gray-50 text-gray-800'
                            }`}>
                              {job.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Inquiries Section */}
              {activeSection === 'inquiries' && (
                <div className="space-y-4">
                  {inquiriesData.map((inquiry, index) => (
                    <div
                      key={inquiry._id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{inquiry.name}</h3>
                            <p className="text-sm text-gray-500">{inquiry.email}</p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{formatDate(inquiry.date)}</span>
                      </div>
                      
                      <div className="mb-3">
                        <h4 className="font-medium text-gray-900 mb-1">{inquiry.subject}</h4>
                        <p className="text-gray-600 text-sm line-clamp-2">{inquiry.message}</p>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-3 h-3" />
                          <span>{inquiry.phone || 'N/A'}</span>
                        </div>
                        <button className="text-sm text-gray-600 hover:text-gray-900">
                          View →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Applications Section */}
              {activeSection === 'applications' && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Candidate</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Position</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Applied</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {applicationsData.map((application, index) => {
                        const statusColor = getStatusColor(application.status);
                        return (
                          <tr key={application._id} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center mr-3">
                                  <User className="w-4 h-4 text-gray-600" />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">{application.name}</div>
                                  <div className="text-xs text-gray-500">{application.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="text-gray-900">{application.position?.title || 'N/A'}</div>
                              <div className="text-xs text-gray-500 capitalize">{application.position?.type || 'N/A'}</div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="text-gray-900">{formatDate(application.createdAt)}</div>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${statusColor}`}>
                                {application.status?.charAt(0).toUpperCase() + application.status?.slice(1) || 'Pending'}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              {application.resumeUrl ? (
                                <a
                                  href={application.resumeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 text-sm text-gray-700"
                                >
                                  <Download className="w-3 h-3" />
                                  CV
                                </a>
                              ) : (
                                <span className="text-sm text-gray-500">No CV</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Empty State */}
              {eval(`${activeSection}Data`).length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-lg border border-gray-200 flex items-center justify-center">
                    {activeSection === 'projects' && <Layers className="w-8 h-8 text-gray-400" />}
                    {activeSection === 'jobs' && <Briefcase className="w-8 h-8 text-gray-400" />}
                    {activeSection === 'inquiries' && <MessageSquare className="w-8 h-8 text-gray-400" />}
                    {activeSection === 'applications' && <FileCheck className="w-8 h-8 text-gray-400" />}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No {activeSection} found
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Get started by creating your first {activeSection.slice(0, -1)}.
                  </p>
                  <Link href={
                    activeSection === 'projects' ? "/admin/projects" : 
                    activeSection === 'jobs' ? "/admin/careers" :
                    activeSection === 'inquiries' ? "/admin/inquiries" :
                    "/admin/applications"
                  }>
                    <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800">
                      Create {activeSection.slice(0, -1)}
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default DashboardPage;