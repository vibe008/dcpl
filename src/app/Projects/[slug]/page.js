"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Calendar, Clock, ArrowLeft, Share, Download, 
  ZoomIn, ChevronLeft, ChevronRight, X, Building, 
  Ruler, Users, Target, Award 
} from "lucide-react";
import Link from "next/link";
import renderProjects from "../../../Components/renderProjects";
import Navbar from "@/<@>/Components/Navbar";

const page = ({ params }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [project, setProject] = useState(null);
  
  useEffect(() => {
    const projectId = parseInt(params.slug, 10);
    const foundProject = renderProjects.find(p => p.id === projectId);
    setProject(foundProject);
  }, [params.slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">Project Not Found</div>
          <Link href="/projects" className="text-blue-600 hover:underline">
            Return to Projects
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setActiveImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const openLightbox = (index) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  // Helper function to get status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'proposed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to get category display name
  const getCategoryDisplay = (category) => {
    const categoryMap = {
      'housing': 'Housing',
      'infrastructure': 'Infrastructure',
      'religious': 'Religious',
      'cultural': 'Cultural',
      'institutional': 'Institutional',
      'commercial': 'Commercial',
      'tourism': 'Tourism',
      'heritage': 'Heritage Conservation',
      'general': 'General'
    };
    return categoryMap[category.toLowerCase()] || category;
  };
console.log("project",project?.image)
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header with Back Navigation */}
        <Navbar />
      {/* <header className="sticky top-0 z-30 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={() => router.back()}
              whileHover={{ x: -5 }}
              className="flex items-center text-gray-700 hover:text-black font-medium"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Projects
            </motion.button>
          </div>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="relative h-96 w-[95%] mx-auto overflow-hidden">
        <motion.div 
          className="h-full w-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${project.image})`,
            filter: "grayscale(30%)"
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <motion.span 
              className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${getStatusColor(project.status)}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </motion.span>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {project.title}
            </motion.h1>
            
            <motion.div 
              className="flex items-center gap-6 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{project.city !== "Unknown" ? project.city : project.location || "Multiple Locations"}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{project.year}</span>
              </div>
              {project.cost && (
                <div className="flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  <span>{project.cost}</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div 
              className="prose prose-lg max-w-none mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6">Project Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {project.description || project.content}
              </p>
              
              {/* Project Features */}
              {project.features && project.features.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-2xl font-bold mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Image Gallery */}
            {project.images && project.images.length > 0 && (
              <motion.div 
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-2xl font-bold mb-6">Project Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.images.map((image, index) => (
                    <motion.div
                      key={index}
                      className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => openLightbox(index)}
                    >
                      <img
                        src={image}
                        alt={`${project.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                        style={{ filter: "grayscale(30%)" }}
                      />
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Additional Project Information */}
            <motion.div 
              className="grid grid-cols-1 gap-8 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {/* Project Scope */}
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <Target className="w-6 h-6 mr-2 text-gray-700" />
                  Project Scope
                </h3>
                <p className="text-gray-700">
                  {project.description || "Comprehensive design and development services including architectural planning, structural engineering, and project management."}
                </p>
              </div>

              {/* Project Type */}
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <Building className="w-6 h-6 mr-2 text-gray-700" />
                  Project Type
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {getCategoryDisplay(project.category)}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {project.type}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div 
              className="sticky top-24 bg-gray-50 rounded-2xl p-6 shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-6 border-b border-gray-200 pb-4">Project Details</h3>
              
              <div className="space-y-5">
                {/* Project Status */}
                <div className="flex items-start">
                  <div className="w-5 h-5 mr-3 mt-0.5 text-gray-700">
                    <div className={`w-3 h-3 rounded-full mt-1 ${
                      project.status === 'completed' ? 'bg-green-500' :
                      project.status === 'ongoing' ? 'bg-blue-500' : 'bg-purple-500'
                    }`} />
                  </div>
                  <div>
                    <p className="font-semibold">Status</p>
                    <p className="text-gray-700 capitalize">{project.status}</p>
                  </div>
                </div>

                {/* Project Cost */}
                {project.cost && (
                  <div className="flex items-start">
                    <Building className="w-5 h-5 mr-3 mt-0.5 text-gray-700" />
                    <div>
                      <p className="font-semibold">Project Cost</p>
                      <p className="text-gray-700">{project.cost}</p>
                    </div>
                  </div>
                )}
                
                {/* Location */}
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 mt-0.5 text-gray-700" />
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-gray-700">{project.city !== "Unknown" ? project.city : "Multiple Locations"}</p>
                  </div>
                </div>
                
                {/* Year */}
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 mr-3 mt-0.5 text-gray-700" />
                  <div>
                    <p className="font-semibold">Year</p>
                    <p className="text-gray-700">{project.year}</p>
                  </div>
                </div>
                
                {/* Category */}
                <div className="flex items-start">
                  <div className="w-5 h-5 mr-3 mt-0.5 text-gray-700" />
                  <div>
                    <p className="font-semibold">Category</p>
                    <p className="text-gray-700 capitalize">{getCategoryDisplay(project.category)}</p>
                  </div>
                </div>

                {/* Project Type */}
                <div className="flex items-start">
                  <div className="w-5 h-5 mr-3 mt-0.5 text-gray-700" />
                  <div>
                    <p className="font-semibold">Project Type</p>
                    <p className="text-gray-700">{project.type}</p>
                  </div>
                </div>
              </div>

              {/* Additional Info for Specific Project Types */}
              {(project.category === 'housing' || project.title.includes('Housing') || project.title.includes('PMAY')) && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Housing Project</h4>
                  <p className="text-blue-700 text-sm">
                    {project.title.includes('PMAY') 
                      ? 'Pradhan Mantri Awas Yojna - Affordable Housing Initiative'
                      : 'Residential Development Project'
                    }
                  </p>
                </div>
              )}

              {project.category === 'religious' && (
                <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Religious Site</h4>
                  <p className="text-purple-700 text-sm">
                    Heritage conservation and development of sacred spaces
                  </p>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                onClick={() => window.print()}
              >
                Download Project Details
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && project.images && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-4 right-4 text-white p-2 z-10"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="relative max-w-5xl w-full max-h-full">
              <motion.img
                key={activeImageIndex}
                src={project.images[activeImageIndex]}
                alt={`${project.title} - Image ${activeImageIndex + 1}`}
                className="w-full h-auto max-h-[80vh] object-contain"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              />
              
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {project.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => { e.stopPropagation(); setActiveImageIndex(index); }}
                        className={`w-3 h-3 rounded-full ${activeImageIndex === index ? 'bg-white' : 'bg-white/50'}`}
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

export default page;