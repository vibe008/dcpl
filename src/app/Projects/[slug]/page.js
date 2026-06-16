'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Calendar, Clock, ChevronLeft, 
  ChevronRight, X, Building, Ruler, Target, ExternalLink,
  ArrowLeft, Hammer, Wrench, Construction
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ProjectDetailPage = ({ params }) => {
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [constructionGalleryOpen, setConstructionGalleryOpen] = useState(false);
  const [activeConstructionImageIndex, setActiveConstructionImageIndex] = useState(0);
  const sliderRef = useRef(null);
  const { slug } = React.use(params);
  const projectId = slug;

  // Fetch project details
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/projects/${projectId}`);
        const data = await response.json();
        
        if (data.success) {
          setProject(data.data);
          fetchAllProjects(data.data.sectors);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  // Fetch all projects for slider
  const fetchAllProjects = async (currentSectors) => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      
      if (data.success) {
        // Filter out current project and sort: same sectors first, then others
        const filteredProjects = data.data
          .filter(p => p._id !== projectId)
          .sort((a, b) => {
            const aHasCommonSector = a.sectors?.some(s => currentSectors?.includes(s));
            const bHasCommonSector = b.sectors?.some(s => currentSectors?.includes(s));
            
            if (aHasCommonSector && !bHasCommonSector) return -1;
            if (!aHasCommonSector && bHasCommonSector) return 1;
            return 0;
          });
        
        setAllProjects(filteredProjects);
      }
    } catch (error) {
      console.error('Error fetching all projects:', error);
    }
  };

  // Slider navigation
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const nextImage = () => {
    const images = project?.images || [];
    setActiveImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    const images = project?.images || [];
    setActiveImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextConstructionImage = () => {
    const constructionImages = project?.consturctionimages || [];
    setActiveConstructionImageIndex((prev) => 
      prev === constructionImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevConstructionImage = () => {
    const constructionImages = project?.consturctionimages || [];
    setActiveConstructionImageIndex((prev) => 
      prev === 0 ? constructionImages.length - 1 : prev - 1
    );
  };

  const openLightbox = (index) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  const openConstructionGallery = () => {
    const constructionImages = project?.consturctionimages || [];
    if (constructionImages.length > 0) {
      setActiveConstructionImageIndex(0);
      setConstructionGalleryOpen(true);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'bg-green-500/10 text-green-700 border-green-500/20';
      case 'ongoing': return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
      case 'active': return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20';
      case 'planning': return 'bg-purple-500/10 text-purple-700 border-purple-500/20';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
    }
  };

  const getStatusIcon = (status) => {
    const statusLower = status?.toLowerCase();
    const hasConstructionImages = project?.consturctionimages?.length > 0;
    
    if ((statusLower === 'completed' || statusLower === 'active' || statusLower === 'ongoing') && hasConstructionImages) {
      switch (statusLower) {
        case 'completed': return <Construction className="w-3 h-3 ml-1" />;
        case 'active': return <Wrench className="w-3 h-3 ml-1" />;
        case 'ongoing': return <Hammer className="w-3 h-3 ml-1" />;
        default: return null;
      }
    }
    return null;
  };

  const handleStatusBadgeClick = () => {
    const status = project?.status?.toLowerCase();
    const hasConstructionImages = project?.consturctionimages?.length > 0;
    
    if ((status === 'completed' || status === 'active' || status === 'ongoing') && hasConstructionImages) {
      openConstructionGallery();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block">
            <motion.div
              className="w-16 h-16 rounded-full border-2 border-gray-200"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute top-0 left-0 w-16 h-16 rounded-full border-2 border-[#6455D1] border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <motion.p
            className="mt-6 text-gray-600 font-light tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            LOADING PROJECT
          </motion.p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-light text-gray-700 mb-4">Project Not Found</div>
          <Link href="/Projects" className="text-[#6455D1] hover:underline font-light">
            Return to Projects
          </Link>
        </div>
      </div>
    );
  }

  const allImages = [project.headerimage, ...(project.images || [])].filter(Boolean);
  const constructionImages = project.consturctionimages || [];
  const hasConstructionImages = constructionImages.length > 0;
  const statusLower = project.status?.toLowerCase();
  const isStatusClickable = (statusLower === 'completed' || statusLower === 'active' || statusLower === 'ongoing') && hasConstructionImages;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Banner with Back Button - 85vh height */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        {project.headerimage ? (
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <img
              src={project.headerimage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
          </motion.div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#6455D1] to-[#8B7CFF]" />
        )}

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto w-full px-8 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white"
            >
              <motion.div
                className="inline-flex items-center space-x-3 mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="w-12 h-0.5 bg-white"></div>
                <span className="font-light tracking-widest text-sm">PROJECT DETAILS</span>
              </motion.div>

              <h1 className="text-5xl lg:text-6xl font-light mb-6 leading-tight">
                {project.title}
              </h1>

              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span className="font-light">{project.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span className="font-light">{project.year}</span>
                </div>
                <motion.button
                  onClick={handleStatusBadgeClick}
                  className={`px-4 py-2 rounded-full text-sm font-light backdrop-blur-sm border flex items-center ${getStatusColor(project.status)} ${
                    isStatusClickable ? 'cursor-pointer hover:scale-105 transition-transform duration-200 active:scale-95' : 'cursor-default'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={isStatusClickable ? { scale: 1.05 } : {}}
                  whileTap={isStatusClickable ? { scale: 0.95 } : {}}
                  disabled={!isStatusClickable}
                >
                  {project.status}
                  {getStatusIcon(project.status)}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Project Description */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-light text-gray-900">Project Overview</h2>
                <div className="w-24 h-0.5 bg-gradient-to-r from-[#6455D1] to-transparent"></div>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 font-light leading-relaxed mb-8 text-lg">
                  {project.description}
                </p>
              </div>
            </motion.div>

            {/* Image Gallery */}
            {allImages.length > 1 && (
              <motion.div
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-light text-gray-900">Project Gallery</h2>
                  <div className="w-24 h-0.5 bg-gradient-to-r from-[#6455D1] to-transparent"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allImages.map((image, index) => (
                    <motion.div
                      key={index}
                      className="relative aspect-square overflow-hidden rounded-2xl cursor-pointer group"
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => openLightbox(index)}
                    >
                      <img
                        src={image}
                        alt={`${project.title} - ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <div className="text-white">
                          <div className="text-sm font-light">Image {index + 1}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Information Card */}
          <div className="lg:col-span-1">
            <motion.div
              className="sticky top-24 bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="mb-8">
                <h3 className="text-xl font-light text-gray-900 mb-6 pb-4 border-b border-gray-100">Project Information</h3>
                
                <div className="space-y-6">
                  {/* Status */}
                  <div className="flex items-start">
                    <div className="w-6 h-6 mr-4 mt-0.5">
                      <Clock className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-light mb-1">Status</p>
                      <div className="flex items-center">
                        <p className="text-gray-900 font-medium capitalize mr-2">{project.status}</p>
                        {isStatusClickable && (
                          <button
                            onClick={openConstructionGallery}
                            className="text-xs text-[#6455D1] hover:text-[#8B7CFF] font-light flex items-center transition-colors"
                          >
                            <Construction className="w-3 h-3 mr-1" />
                            View Progress
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start">
                    <div className="w-6 h-6 mr-4 mt-0.5">
                      <MapPin className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-light mb-1">Location</p>
                      <p className="text-gray-900 font-medium">{project.location}</p>
                    </div>
                  </div>

                  {/* Year */}
                  <div className="flex items-start">
                    <div className="w-6 h-6 mr-4 mt-0.5">
                      <Calendar className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-light mb-1">Year</p>
                      <p className="text-gray-900 font-medium">{project.year}</p>
                    </div>
                  </div>

                  {/* Type */}
                  <div className="flex items-start">
                    <div className="w-6 h-6 mr-4 mt-0.5">
                      <Building className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-light mb-1">Type</p>
                      <p className="text-gray-900 font-medium">{project.type}</p>
                    </div>
                  </div>

                  {/* Region */}
                  {project.region && (
                    <div className="flex items-start">
                      <div className="w-6 h-6 mr-4 mt-0.5">
                        <Target className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-light mb-1">Region</p>
                        <p className="text-gray-900 font-medium">{project.region}</p>
                      </div>
                    </div>
                  )}

                  {/* Cost */}
                  {project.cost && (
                    <div className="flex items-start">
                      <div className="w-6 h-6 mr-4 mt-0.5">
                        <Ruler className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-light mb-1">Project Value</p>
                        <p className="text-gray-900 font-medium">₹{project.cost.toLocaleString()}</p>
                      </div>
                    </div>
                  )}

                  {/* Sectors */}
                  {project.sectors && project.sectors.length > 0 && (
                    <div className="pt-6 border-t border-gray-100">
                      <p className="text-sm text-gray-500 font-light mb-3">Sectors</p>
                      <div className="flex flex-wrap gap-2">
                        {project.sectors.map((sector, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-gradient-to-r from-[#6455D1]/10 to-[#8B7CFF]/10 text-[#6455D1] text-sm rounded-lg border border-[#6455D1]/20 font-light"
                          >
                            {sector}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Construction Images Info */}
                  {isStatusClickable && (
                    <div className="pt-6 border-t border-gray-100">
                      <div className="flex items-start">
                        <Construction className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500 font-light mb-1">Construction Progress</p>
                          <p className="text-gray-900 font-medium text-sm">
                            {constructionImages.length} progress {constructionImages.length === 1 ? 'image' : 'images'} available
                          </p>
                          <button
                            onClick={openConstructionGallery}
                            className="text-sm text-[#6455D1] hover:text-[#8B7CFF] font-light mt-2 flex items-center transition-colors"
                          >
                            View all progress photos
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* All Projects Slider Section */}
      {allProjects.length > 0 && (
        <section className="py-16 px-8 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl font-light text-gray-900 mb-4">Explore More Projects</h2>
                  <p className="text-gray-600 font-light">Discover our complete portfolio of work</p>
                </div>
                <div className="w-32 h-0.5 bg-gradient-to-l from-[#6455D1] to-transparent"></div>
              </div>

              {/* Slider Container */}
              <div className="relative group">
                {/* Navigation Arrows */}
                <motion.button
                  onClick={scrollLeft}
                  className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl border border-gray-200 flex items-center justify-center text-gray-700 hover:text-[#6455D1] hover:border-[#6455D1]/30 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>

                <motion.button
                  onClick={scrollRight}
                  className="absolute -right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl border border-gray-200 flex items-center justify-center text-gray-700 hover:text-[#6455D1] hover:border-[#6455D1]/30 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>

                {/* Projects Slider */}
                <div
                  ref={sliderRef}
                  className="flex overflow-x-auto scrollbar-hide space-x-8 pb-6 -mx-4 px-4"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {allProjects.map((otherProject, index) => (
                    <motion.div
                      key={otherProject._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.05 * index }}
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="flex-shrink-0 w-80 cursor-pointer"
                      onClick={() => router.push(`/Projects/${otherProject._id}`)}
                    >
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 h-[420px] group/card">
                        {/* Image */}
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={otherProject.headerimage}
                            alt={otherProject.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          
                          {/* Status Badge */}
                          <div className="absolute top-4 left-4">
                            <span className={`px-3 py-1.5 rounded-full text-xs font-light backdrop-blur-sm border ${getStatusColor(otherProject.status)}`}>
                              {otherProject.status}
                            </span>
                          </div>

                          {/* Same Sector Indicator */}
                          {project.sectors?.some(s => otherProject.sectors?.includes(s)) && (
                            <div className="absolute top-4 right-4">
                              <span className="px-3 py-1.5 rounded-full text-xs font-light backdrop-blur-sm bg-[#6455D1]/20 text-[#6455D1] border border-[#6455D1]/30">
                                Related
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <h3 className="text-xl font-light text-gray-900 mb-2 line-clamp-1 group-hover/card:text-[#6455D1] transition-colors">
                            {otherProject.title}
                          </h3>
                          
                          <div className="flex items-center text-gray-600 font-light mb-4">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span className="text-sm">{otherProject.location}</span>
                          </div>

                          <p className="text-gray-500 font-light text-sm line-clamp-2 mb-6">
                            {otherProject.description?.substring(0, 100)}...
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-400 font-light text-sm">
                                {otherProject.year}
                              </span>
                              {otherProject.type && (
                                <>
                                  <span className="text-gray-300">•</span>
                                  <span className="text-gray-500 font-light text-sm">
                                    {otherProject.type}
                                  </span>
                                </>
                              )}
                            </div>
                            <motion.div
                              className="flex items-center text-[#6455D1]"
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <span className="text-sm font-light mr-2">View</span>
                              <ExternalLink className="w-4 h-4" />
                            </motion.div>
                          </div>

                          {/* Sectors */}
                          {otherProject.sectors && otherProject.sectors.length > 0 && (
                            <div className="mt-6 pt-6 border-t border-gray-100">
                              <div className="flex flex-wrap gap-2">
                                {otherProject.sectors.slice(0, 2).map((sector, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-light"
                                  >
                                    {sector}
                                  </span>
                                ))}
                                {otherProject.sectors.length > 2 && (
                                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-light">
                                    +{otherProject.sectors.length - 2}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Hover Effect */}
                        <div className="absolute inset-0 border-2 border-transparent group-hover/card:border-[#6455D1]/20 rounded-2xl pointer-events-none transition-colors duration-300" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* View All Projects Button */}
              <div className="text-center mt-12">
                <motion.button
                  onClick={() => router.push('/Projects')}
                  className="inline-flex items-center text-[#6455D1] hover:text-[#8B7CFF] font-light transition-colors group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg mr-2">View All Projects</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Regular Images Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-6 right-6 text-white/80 hover:text-white p-2 z-10 transition-colors"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="relative max-w-6xl w-full max-h-[85vh]">
              <motion.img
                key={activeImageIndex}
                src={allImages[activeImageIndex]}
                alt={`${project.title} - Image ${activeImageIndex + 1}`}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              />
              
              {allImages.length > 1 && (
                <>
                  <motion.button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full backdrop-blur-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>
                  
                  <motion.button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full backdrop-blur-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>
                  
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {allImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => { e.stopPropagation(); setActiveImageIndex(index); }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === activeImageIndex 
                            ? 'w-8 bg-white' 
                            : 'bg-white/50 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Construction Images Gallery Modal */}
      <AnimatePresence>
        {constructionGalleryOpen && constructionImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setConstructionGalleryOpen(false)}
          >
            <button
              className="absolute top-6 right-6 text-white/80 hover:text-white p-2 z-10 transition-colors"
              onClick={() => setConstructionGalleryOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="relative max-w-6xl w-full max-h-[85vh]">
              <motion.img
                key={activeConstructionImageIndex}
                src={constructionImages[activeConstructionImageIndex]}
                alt={`${project.title} - Construction ${activeConstructionImageIndex + 1}`}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              />
              
              {/* Construction Gallery Header */}
              <div className="absolute top-6 left-6">
                <div className="px-4 py-2 rounded-full text-sm font-light backdrop-blur-lg bg-yellow-500/20 text-yellow-200 border border-yellow-500/30 flex items-center">
                  <Construction className="w-4 h-4 mr-2" />
                  Construction Progress Gallery
                  <span className="ml-2 px-2 py-0.5 bg-yellow-500/30 rounded-full text-xs">
                    {activeConstructionImageIndex + 1} / {constructionImages.length}
                  </span>
                </div>
              </div>

              {constructionImages.length > 1 && (
                <>
                  <motion.button
                    onClick={(e) => { e.stopPropagation(); prevConstructionImage(); }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full backdrop-blur-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>
                  
                  <motion.button
                    onClick={(e) => { e.stopPropagation(); nextConstructionImage(); }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full backdrop-blur-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>
                  
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {constructionImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          setActiveConstructionImageIndex(index);
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === activeConstructionImageIndex 
                            ? 'w-8 bg-yellow-500' 
                            : 'bg-white/50 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectDetailPage;

// Add custom scrollbar hide styles
const styles = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}