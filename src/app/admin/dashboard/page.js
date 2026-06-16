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
      icon: <Layers className="w-5 h-5 text-indigo-600" />,
      link: '/admin/projects',
      iconBg: 'bg-indigo-50',
      borderHover: 'hover:border-indigo-300'
    },
    {
      label: 'Active Jobs',
      value: jobsData.filter(job => job.isActive).length,
      icon: <Briefcase className="w-5 h-5 text-emerald-600" />,
      link: '/admin/careers',
      iconBg: 'bg-emerald-50',
      borderHover: 'hover:border-emerald-300'
    },
    {
      label: 'New Inquiries',
      value: statsData.totalInquiries,
      icon: <MessageSquare className="w-5 h-5 text-amber-600" />,
      link: '/admin/inquiries',
      iconBg: 'bg-amber-50',
      borderHover: 'hover:border-amber-300'
    },
    {
      label: 'Applications',
      value: statsData.totalApplications,
      icon: <FileCheck className="w-5 h-5 text-violet-600" />,
      link: '/admin/applications',
      iconBg: 'bg-violet-50',
      borderHover: 'hover:border-violet-300'
    }
  ];

  const getTabCount = (tabId) => {
    switch (tabId) {
      case 'projects': return projectsData.length;
      case 'jobs': return jobsData.length;
      case 'inquiries': return inquiriesData.length;
      case 'applications': return applicationsData.length;
      default: return 0;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-16 h-16 border-4 border-gray-200/80 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-gray-900 border-t-transparent rounded-full animate-spin absolute top-0"></div>
          </div>
          <p className="mt-6 text-gray-600 font-medium tracking-tight">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-white/20">
        <div className="px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-500/20">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 tracking-tight">
                  Dashboard Overview
                </h1>
                <p className="text-xs text-gray-500 font-light">
                  Last updated just now
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={fetchAllData}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white/50 hover:bg-white text-sm text-gray-700 transition-colors shadow-sm disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 text-gray-500 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="font-semibold">Refresh</span>
              </button>
              
              <button className="p-2.5 rounded-xl border border-gray-200 bg-white/50 hover:bg-white transition-colors shadow-sm relative">
                <Bell className="w-4 h-4 text-gray-500" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full"></span>
              </button>
              
              <div className="relative">
                <div className="w-8.5 h-8.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-medium text-sm flex items-center justify-center shadow-md shadow-indigo-500/20">
                  <span>A</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
 
      {/* Main Content */}
      <main className="px-6 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, type: "spring", stiffness: 300, damping: 24 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="group"
            >
              <Link href={stat.link}>
                <div className={`bg-white/60 backdrop-blur-lg border border-white/20 shadow-sm rounded-2xl p-6 transition-all duration-300 hover:bg-white/80 hover:shadow-md ${stat.borderHover}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.iconBg} shadow-inner`}>
                      {stat.icon}
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-700 transition-colors" />
                  </div>
                  
                  <div>
                    <p className="text-3xl font-semibold text-gray-900 mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
 
        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-px">
            <div className="flex overflow-x-auto space-x-1 custom-scrollbar">
              {[
                { id: 'projects', label: 'Projects', icon: <Layers className="w-4 h-4" /> },
                { id: 'jobs', label: 'Jobs', icon: <Briefcase className="w-4 h-4" /> },
                { id: 'inquiries', label: 'Inquiries', icon: <MessageSquare className="w-4 h-4" /> },
                { id: 'applications', label: 'Applications', icon: <FileCheck className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`relative flex items-center gap-2 px-5 py-3.5 font-semibold text-sm transition-colors cursor-pointer outline-none ${
                    activeSection === tab.id
                      ? 'text-gray-900 font-bold'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span className="z-10">{tab.icon}</span>
                  <span className="z-10">{tab.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full z-10 font-bold ${activeSection === tab.id ? 'bg-gray-950 text-white' : 'bg-gray-150 text-gray-600'}`}>
                    {getTabCount(tab.id)}
                  </span>
                  
                  {activeSection === tab.id && (
                    <motion.div
                      layoutId="active-dashboard-tab"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-950 rounded-full z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-3 pb-2 sm:pb-0">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white/50 hover:bg-white text-sm font-semibold text-gray-700 transition-colors shadow-sm">
                <Filter className="w-4 h-4 text-gray-500" />
                Filter
              </button>
              <Link href={
                activeSection === 'projects' ? "/admin/projects" : 
                activeSection === 'jobs' ? "/admin/careers" :
                activeSection === 'inquiries' ? "/admin/inquiries" :
                "/admin/applications"
              }>
                <button className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-800 transition-all shadow-md shadow-gray-900/10 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
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
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="bg-white/60 backdrop-blur-lg border border-white/20 rounded-3xl shadow-xl overflow-hidden"
          >
            {/* Section Header */}
            <div className="px-6 py-5 border-b border-white/20 bg-white/20 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
                  </h2>
                  <p className="text-sm text-gray-500 font-light mt-0.5">
                    Total {getTabCount(activeSection)} records
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder={`Search ${activeSection}...`}
                      className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200 outline-none text-sm w-full sm:w-64"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#1e293b]/10 bg-white/50 hover:bg-white text-sm font-semibold text-gray-700 transition-colors shadow-sm">
                    <ExternalLink className="w-4 h-4 text-gray-500" />
                    Export
                  </button>
                </div>
              </div>
            </div>
 
            {/* Content */}
            <div className="p-6">
              {/* Projects Section */}
              {activeSection === 'projects' && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {projectsData.map((project, index) => (
                    <motion.div
                      key={project._id}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.04 }}
                      whileHover={{ y: -4 }}
                      className="bg-white/60 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
                    >
                      {/* Project Image */}
                      <div className="relative h-44 bg-gray-100 overflow-hidden">
                        {project.headerimage ? (
                          <img
                            src={project.headerimage}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Building className="w-10 h-10 text-gray-300" />
                          </div>
                        )}
                        <div className="absolute top-3 right-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm ${
                            project.status === 'Active' ? 'bg-green-150 text-green-800' :
                            project.status === 'Completed' ? 'bg-blue-150 text-blue-800' :
                            'bg-gray-150 text-gray-800'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                      </div>
                      
                      {/* Project Details */}
                      <div className="p-5">
                        <h3 className="font-semibold text-gray-950 text-base mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                          {project.title}
                        </h3>
                        
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2 font-light">
                          {project.description}
                        </p>
 
                        {/* Project Meta */}
                        <div className="grid grid-cols-2 gap-3 mb-4 pt-3 border-t border-gray-100/50">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-gray-400" />
                            <span className="text-xs text-gray-600 truncate">{project.location || 'N/A'}</span>
                          </div>
                          <div className="flex items-center gap-2 justify-end">
                            <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                            <span className="text-xs text-gray-600 truncate">{formatCurrency(project.cost)}</span>
                          </div>
                        </div>
 
                        {/* Last Updated */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100/50">
                          <span className="text-xs text-gray-400">
                            {formatDate(project.updatedAt)}
                          </span>
                          <Link href="/admin/projects" className="text-xs font-semibold text-gray-700 hover:text-gray-950 flex items-center gap-0.5">
                            Edit Details
                            <ChevronRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
 
              {/* Jobs Section */}
              {activeSection === 'jobs' && (
                <div className="overflow-x-auto rounded-2xl border border-gray-100">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-gray-50/50 border-b border-gray-250/50">
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Job Title</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white/20">
                      {jobsData.map((job) => (
                        <tr key={job._id} className="hover:bg-white/40 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mr-3 shadow-inner">
                                <Briefcase className="w-4 h-4 text-gray-600" />
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900 text-sm">{job.title}</div>
                                <div className="text-xs text-gray-400 mt-0.5">{formatDate(job.createdAt)}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-600">{job.department || 'N/A'}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-1.5 text-sm text-gray-600">
                              <MapPin className="w-3.5 h-3.5 text-gray-400" />
                              <span>{job.location || 'N/A'}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-xs font-medium bg-gray-100/80 text-gray-700 px-2.5 py-1 rounded-full capitalize border border-gray-200/50">
                              {job.type || 'N/A'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                              job.isActive ? 'bg-green-50 text-green-700 border border-green-200/50' : 'bg-red-50 text-red-700 border border-red-200/50'
                            }`}>
                              {job.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link href="/admin/careers" className="text-indigo-600 hover:text-indigo-900 font-semibold">
                              Manage
                            </Link>
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
                  {inquiriesData.map((inquiry) => (
                    <div
                      key={inquiry._id}
                      className="border border-gray-100 bg-white/40 hover:bg-white/80 rounded-2xl p-5 hover:shadow-sm transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shadow-inner">
                            <User className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm">{inquiry.name}</h3>
                            <p className="text-xs text-gray-500 font-light mt-0.5">{inquiry.email}</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 font-medium sm:text-right">{formatDate(inquiry.date)}</span>
                      </div>
                      
                      <div className="mb-4 bg-white/30 rounded-xl p-3 border border-white/20">
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">{inquiry.subject}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed font-light">{inquiry.message}</p>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100/50">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                          <span className="font-medium">{inquiry.phone || 'N/A'}</span>
                        </div>
                        <Link href="/admin/inquiries" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5">
                          Reply Inquiry
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
 
              {/* Applications Section */}
              {activeSection === 'applications' && (
                <div className="overflow-x-auto rounded-2xl border border-gray-100">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-gray-50/50 border-b border-gray-250/50">
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Candidate</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Position</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Applied Date</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white/20">
                      {applicationsData.map((application) => {
                        const statusColor = getStatusColor(application.status);
                        return (
                          <tr key={application._id} className="hover:bg-white/40 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mr-3 shadow-inner">
                                  <User className="w-4 h-4 text-gray-600" />
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-900 text-sm">{application.name}</div>
                                  <div className="text-xs text-gray-400 mt-0.5">{application.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-semibold text-gray-900 text-sm">{application.position?.title || 'N/A'}</div>
                              <div className="text-xs text-gray-400 mt-0.5 capitalize">{application.position?.type || 'N/A'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {formatDate(application.createdAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
                                {application.status?.charAt(0).toUpperCase() + application.status?.slice(1) || 'Pending'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex items-center justify-end gap-3">
                                {application.resumeUrl ? (
                                  <a
                                    href={application.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors shadow-sm"
                                  >
                                    <Download className="w-3.5 h-3.5 text-gray-500" />
                                    Resume
                                  </a>
                                ) : (
                                  <span className="text-xs text-gray-400">No CV</span>
                                )}
                                <Link href="/admin/applications" className="text-indigo-600 hover:text-indigo-900 font-semibold">
                                  View
                                </Link>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
 
              {/* Empty State */}
              {getTabCount(activeSection) === 0 && (
                <div className="text-center py-16 bg-white/20 rounded-2xl border border-dashed border-gray-200/50">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shadow-inner">
                    {activeSection === 'projects' && <Layers className="w-6 h-6 text-gray-400" />}
                    {activeSection === 'jobs' && <Briefcase className="w-6 h-6 text-gray-400" />}
                    {activeSection === 'inquiries' && <MessageSquare className="w-6 h-6 text-gray-400" />}
                    {activeSection === 'applications' && <FileCheck className="w-6 h-6 text-gray-400" />}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    No {activeSection} found
                  </h3>
                  <p className="text-gray-500 mb-6 max-w-sm mx-auto font-light text-sm">
                    Get started by creating or managing your first {activeSection.slice(0, -1)}.
                  </p>
                  <Link href={
                    activeSection === 'projects' ? "/admin/projects" : 
                    activeSection === 'jobs' ? "/admin/careers" :
                    activeSection === 'inquiries' ? "/admin/inquiries" :
                    "/admin/applications"
                  }>
                    <button className="bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-800 transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
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