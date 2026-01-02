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
  Clock as ClockIcon
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
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    } else if (statusLower === 'active' || statusLower === 'published') {
      return 'bg-blue-100 text-blue-800 border-blue-200';
    } else if (statusLower === 'pending' || statusLower === 'draft') {
      return 'bg-amber-100 text-amber-800 border-amber-200';
    } else if (statusLower === 'rejected' || statusLower === 'closed') {
      return 'bg-rose-100 text-rose-800 border-rose-200';
    } else {
      return 'bg-gray-100 text-gray-800 border-gray-200';
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
      icon: <Layers className="w-6 h-6" />,
      color: 'from-[#6556D5] to-[#8B5CF6]',
      link: '/admin/projects'
    },
    {
      label: 'Active Jobs',
      value: jobsData.filter(job => job.isActive).length,
      icon: <Briefcase className="w-6 h-6" />,
      color: 'from-[#50B873] to-[#10B981]',
      link: '/admin/careers'
    },
    {
      label: 'New Inquiries',
      value: statsData.totalInquiries,
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'from-[#F59E0B] to-[#F97316]',
      link: '/admin/inquiries'
    },
    {
      label: 'Applications',
      value: statsData.totalApplications,
      icon: <FileCheck className="w-6 h-6" />,
      color: 'from-[#EC4899] to-[#D946EF]',
      link: '/admin/applications'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-[#6556D5]/20 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-[#6556D5] border-t-transparent rounded-full animate-spin absolute top-0"></div>
          </div>
          <p className="mt-6 text-gray-600 font-medium">Loading Dashboard</p>
          <p className="text-sm text-gray-400 mt-2">Fetching latest data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 w-full">
      {/* Header with Glass Effect */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200/60"
      >
        <div className="px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#50B873] to-[#6556D5] p-0.5">
                    <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                      <img
                        src="/assets/logo.png"
                        alt="Logo"
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Dashboard Overview
                  </h1>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    Real-time data • Updated just now
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchAllData}
                disabled={isRefreshing}
                className="relative group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all"
              >
                <RefreshCw className={`w-4 h-4 text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="text-sm font-medium text-gray-700">Refresh</span>
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#50B873] to-[#6556D5] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.button>
              
              <button className="relative p-2.5 rounded-xl bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
              </button>
              
              <div className="relative group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#50B873] to-[#6556D5] p-0.5">
                  <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                    <span className="font-semibold bg-gradient-to-r from-[#50B873] to-[#6556D5] bg-clip-text text-transparent">
                      A
                    </span>
                  </div>
                </div>
                <div className="absolute top-12 right-0 w-48 bg-white rounded-xl shadow-xl border border-gray-200 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="px-3 py-2">
                    <p className="font-semibold text-gray-900">Admin User</p>
                    <p className="text-xs text-gray-500">Super Administrator</p>
                  </div>
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                      Profile Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex">
        {/* Main Container - Fixed full width */}
        <main className="w-full">
          <div className="px-8 py-8">
            {/* Stats Overview with Glass Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="group relative"
                >
                  <Link href={stat.link}>
                    <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-6 hover:border-gray-300 hover:shadow-xl transition-all duration-300 overflow-hidden">
                      {/* Gradient Background */}
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500`}></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-6">
                          <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10`}>
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-20`}>
                              <div className={`bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                                {stat.icon}
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-transform" />
                        </div>
                        
                        <div>
                          <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                          <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="mt-6">
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min(100, (stat.value / 50) * 100)}%` }}
                              transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                              className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Navigation Tabs with Modern Style */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/60 p-1.5">
                  {[
                    { id: 'projects', label: 'Projects', icon: <Layers className="w-4 h-4" /> },
                    { id: 'jobs', label: 'Jobs', icon: <Briefcase className="w-4 h-4" /> },
                    { id: 'inquiries', label: 'Inquiries', icon: <MessageSquare className="w-4 h-4" /> },
                    { id: 'applications', label: 'Applications', icon: <FileCheck className="w-4 h-4" /> }
                  ].map((tab) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveSection(tab.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
                        activeSection === tab.id
                          ? 'text-white'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                      }`}
                    >
                      {activeSection === tab.id && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-[#50B873] to-[#6556D5] rounded-lg"
                          transition={{ type: "spring", bounce: 0.2 }}
                        />
                      )}
                      <span className="relative z-10">{tab.icon}</span>
                      <span className="relative z-10">{tab.label}</span>
                      <span className="relative z-10 text-xs px-2 py-1 bg-white/20 rounded-full">
                        {eval(`${tab.id}Data`).length}
                      </span>
                    </motion.button>
                  ))}
                </div>
                
                <Link 
                  href={
                    activeSection === 'projects' ? "/admin/projects" : 
                    activeSection === 'jobs' ? "/admin/careers" :
                    activeSection === 'inquiries' ? "/admin/inquiries" :
                    "/admin/applications"
                  }
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative bg-gradient-to-r from-[#50B873] to-[#6556D5] text-white px-5 py-3 rounded-xl font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#6556D5] to-[#50B873] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      {activeSection === 'projects' ? 'New Project' :
                       activeSection === 'jobs' ? 'Post Job' :
                       activeSection === 'inquiries' ? 'View All' :
                       'Manage All'}
                    </span>
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* Content Section - Fixed full width */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-lg overflow-hidden w-full"
              >
                {/* Section Header */}
                <div className="px-8 py-6 border-b border-gray-200/60 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Management
                      </h2>
                      <div className="flex items-center gap-4 mt-2">
                        <p className="text-sm text-gray-500">
                          Total {eval(`${activeSection}Data`).length} records • 
                          <span className="text-emerald-600 font-medium ml-1">
                            Last updated: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </span>
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-emerald-600 font-medium">Live</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 bg-white text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                        <BarChart3 className="w-4 h-4" />
                        Analytics
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 bg-white text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        Export
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Projects Section */}
                  {activeSection === 'projects' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {projectsData.map((project, index) => (
                        <motion.div
                          key={project._id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ y: -8 }}
                          className="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl hover:border-gray-300 transition-all duration-300"
                        >
                          {/* Project Image */}
                          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                            {project.headerimage ? (
                              <img
                                src={project.headerimage}
                                alt={project.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Building className="w-12 h-12 text-gray-400" />
                              </div>
                            )}
                            <div className="absolute top-4 right-4">
                              <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                                {project.status}
                              </span>
                            </div>
                          </div>
                          
                          {/* Project Details */}
                          <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#6556D5] transition-colors">
                                {project.title}
                              </h3>
                            </div>
                            
                            <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                              {project.description}
                            </p>

                            {/* Project Meta */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-700">{project.location || 'N/A'}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-700 font-medium">{formatCurrency(project.cost)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-700">{project.year || 'N/A'}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Layers className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-700 capitalize">{project.type || 'N/A'}</span>
                              </div>
                            </div>

                            {/* Last Updated */}
                            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                              <span className="text-xs text-gray-500">
                                Updated {formatDate(project.updatedAt)}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Jobs Section */}
                  {activeSection === 'jobs' && (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Job Title</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Department</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Applications</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {jobsData.map((job, index) => (
                            <motion.tr
                              key={job._id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-6 py-4">
                                <div className="flex items-center">
                                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#50B873]/10 to-[#6556D5]/10 flex items-center justify-center mr-3">
                                    <Briefcase className="w-5 h-5 text-[#6556D5]" />
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900">{job.title}</div>
                                    <div className="text-sm text-gray-500">{formatDate(job.createdAt)}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-gray-900">{job.department || 'N/A'}</span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-900">{job.location || 'N/A'}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-gray-900 capitalize">{job.type || 'N/A'}</span>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                                  job.isActive ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-rose-100 text-rose-800 border-rose-200'
                                } border`}>
                                  {job.isActive ? (
                                    <>
                                      <CheckCircle className="w-3 h-3" />
                                      Active
                                    </>
                                  ) : (
                                    <>
                                      <XCircle className="w-3 h-3" />
                                      Inactive
                                    </>
                                  )}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-gray-900 font-medium">
                                  {applicationsData.filter(app => app.position?.title === job.title).length}
                                </span>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Inquiries Section */}
                  {activeSection === 'inquiries' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {inquiriesData.map((inquiry, index) => (
                        <motion.div
                          key={inquiry._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#50B873]/10 to-[#6556D5]/10 flex items-center justify-center">
                                <User className="w-6 h-6 text-[#6556D5]" />
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-900">{inquiry.name}</h3>
                                <p className="text-sm text-gray-500">{inquiry.email}</p>
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">{formatDate(inquiry.date)}</span>
                          </div>
                          
                          <div className="mb-4">
                            <h4 className="font-semibold text-gray-900 mb-2">{inquiry.subject}</h4>
                            <p className="text-gray-600 text-sm line-clamp-3">{inquiry.message}</p>
                          </div>
                          
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="w-4 h-4" />
                              <span>{inquiry.phone || 'N/A'}</span>
                            </div>
                            <span className="text-xs text-gray-500">
                              Received {formatDate(inquiry.date)}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Applications Section */}
                  {activeSection === 'applications' && (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Candidate</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Position</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Applied</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">CV</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {applicationsData.map((application, index) => {
                            const statusColor = getStatusColor(application.status);
                            return (
                              <motion.tr
                                key={application._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="hover:bg-gray-50 transition-colors"
                              >
                                <td className="px-6 py-4">
                                  <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#50B873]/10 to-[#6556D5]/10 flex items-center justify-center mr-3">
                                      <User className="w-5 h-5 text-[#6556D5]" />
                                    </div>
                                    <div>
                                      <div className="font-medium text-gray-900">{application.name}</div>
                                      <div className="text-sm text-gray-500">{application.email}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="text-gray-900">{application.position?.title || 'N/A'}</div>
                                  <div className="text-sm text-gray-500 capitalize">{application.position?.type || 'N/A'}</div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="text-gray-900">{application.phone || 'N/A'}</div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="text-gray-900">{formatDate(application.createdAt)}</div>
                                </td>
                                <td className="px-6 py-4">
                                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${statusColor}`}>
                                    {getStatusIcon(application.status)}
                                    {application.status?.charAt(0).toUpperCase() + application.status?.slice(1) || 'Pending'}
                                  </span>
                                </td>
                                <td className="px-6 py-4">
                                  {application.resumeUrl ? (
                                    <a
                                      href={application.resumeUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 hover:text-gray-900 hover:from-gray-200 hover:to-gray-100 text-sm font-medium transition-all"
                                    >
                                      <Download className="w-4 h-4" />
                                      Download
                                    </a>
                                  ) : (
                                    <span className="text-sm text-gray-500">No CV</span>
                                  )}
                                </td>
                              </motion.tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Empty State */}
                  {eval(`${activeSection}Data`).length === 0 && (
                    <div className="text-center py-20">
                      <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        {activeSection === 'projects' && <Layers className="w-12 h-12 text-gray-400" />}
                        {activeSection === 'jobs' && <Briefcase className="w-12 h-12 text-gray-400" />}
                        {activeSection === 'inquiries' && <MessageSquare className="w-12 h-12 text-gray-400" />}
                        {activeSection === 'applications' && <FileCheck className="w-12 h-12 text-gray-400" />}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        No {activeSection} found
                      </h3>
                      <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        Get started by creating your first {activeSection.slice(0, -1)}. 
                        Your data will appear here once added.
                      </p>
                      <Link href={
                        activeSection === 'projects' ? "/admin/projects" : 
                        activeSection === 'jobs' ? "/admin/careers" :
                        activeSection === 'inquiries' ? "/admin/inquiries" :
                        "/admin/applications"
                      }>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#50B873] to-[#6556D5] text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
                        >
                          <Plus className="w-5 h-5 inline mr-3" />
                          Create {activeSection.slice(0, -1)}
                        </motion.button>
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;