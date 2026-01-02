'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronLeft, ChevronRight, Filter, X, MapPin, Calendar, ChevronDown, ArrowRight, Eye, Clock, Building2, Map, Layers, ExternalLink, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [filters, setFilters] = useState({
    sectors: [],
    regions: [],
    status: [],
    types: []
  });
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // Check for mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Parallax scroll effect for header - only on desktop
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, isMobile ? 0 : 100]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, isMobile ? 1 : 1.1]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        
        if (data.success) {
          const transformedProjects = data.data.map(project => ({
            id: project._id,
            title: project.title,
            location: project.location,
            year: project.year.toString(),
            description: project.description,
            status: project.status,
            type: project.type,
            sectors: project.sectors && project.sectors.length > 0 ? project.sectors : 
                    project.sector ? [project.sector] : [],
            region: project.region,
            headerimage: project.headerimage,
            images: project.images || [],
            markforhomepage: project.markforhomepage,
            client: project.client || "Confidential",
            area: project.area || "N/A",
            budget: project.budget || "Confidential"
          }));
          
          setProjects(transformedProjects);
          setFilteredProjects(transformedProjects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        const sampleProjects = getSampleProjects();
        setProjects(sampleProjects);
        setFilteredProjects(sampleProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Sample data fallback
  const getSampleProjects = () => [
    {
      id: "1",
      title: "ESIC 300 Bedded Hospital",
      location: "Noida, Uttar Pradesh",
      year: "2023",
      description: "A state-of-the-art 300 bedded hospital with advanced medical facilities.",
      status: "Completed",
      type: "Hospital",
      sectors: ["Healthcare", "Infrastructure"],
      region: "North",
      headerimage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200",
      images: [
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200",
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200"
      ],
      markforhomepage: true,
      client: "ESIC",
      area: "50,000 sq ft",
      budget: "₹150 Crore"
    },
    {
      id: "2",
      title: "Tech Innovation Hub",
      location: "Bangalore, Karnataka",
      year: "2024",
      description: "Modern innovation center for technology startups and research facilities.",
      status: "Active",
      type: "Commercial",
      sectors: ["Technology", "Commercial"],
      region: "South",
      headerimage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200",
      images: [
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200",
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200"
      ],
      markforhomepage: true,
      client: "Tech Corp",
      area: "75,000 sq ft",
      budget: "₹200 Crore"
    },
    {
      id: "3",
      title: "Luxury Residential Towers",
      location: "Mumbai, Maharashtra",
      year: "2023",
      description: "Premium residential complex with panoramic sea views.",
      status: "Completed",
      type: "Residential",
      sectors: ["Residential", "Real Estate"],
      region: "West",
      headerimage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=1200"
      ],
      markforhomepage: false,
      client: "Elite Developers",
      area: "2,00,000 sq ft",
      budget: "₹500 Crore"
    }
  ];

  // Extract unique values for filters
  const allSectors = [...new Set(projects.flatMap(project => project.sectors || []))].filter(Boolean);
  const allRegions = [...new Set(projects.map(project => project.region).filter(Boolean))];
  const allStatus = [...new Set(projects.map(project => project.status).filter(Boolean))];
  const allTypes = [...new Set(projects.map(project => project.type).filter(Boolean))];

  // Apply filters
  useEffect(() => {
    let result = projects;

    if (filters.sectors.length > 0) {
      result = result.filter(project => 
        project.sectors?.some(sector => filters.sectors.includes(sector))
      );
    }

    if (filters.regions.length > 0) {
      result = result.filter(project => 
        filters.regions.includes(project.region)
      );
    }

    if (filters.status.length > 0) {
      result = result.filter(project => 
        filters.status.includes(project.status)
      );
    }

    if (filters.types.length > 0) {
      result = result.filter(project => 
        filters.types.includes(project.type)
      );
    }

    setFilteredProjects(result);
  }, [filters, projects]);

  const toggleFilter = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value]
    }));
    setActiveDropdown(null);
  };

  const clearFilters = () => {
    setFilters({
      sectors: [],
      regions: [],
      status: [],
      types: []
    });
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleProjectClick = (projectId) => {
    router.push(`/Projects/${projectId}`);
  };

  const handleMouseEnter = (projectId) => {
    setHoveredCard(projectId);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block">
            <motion.div
              className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-gray-200"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute top-0 left-0 w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-[#6455D1] border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <motion.p
            className="mt-4 md:mt-6 text-gray-600 font-light tracking-wider text-sm md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            CURATING PROJECTS
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Premium Header with Parallax */}
      <div className="relative h-[60vh] md:h-[75vh] lg:h-[85vh] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ y, scale }}
        >
          <img
            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop"
            alt="Projects Header"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        </motion.div>
        
        <motion.div 
          className="absolute inset-0 flex items-center"
          style={{ opacity }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            >
              <motion.div 
                className="inline-flex items-center space-x-2 md:space-x-3 mb-4 md:mb-6 lg:mb-8 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-4 md:w-6 lg:w-8 h-0.5 bg-gradient-to-r from-[#6455D1] to-white"></div>
                <span className="text-white/90 font-light tracking-[0.1em] md:tracking-[0.2em] text-xs md:text-sm">PORTFOLIO</span>
              </motion.div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light text-white mb-4 md:mb-6 tracking-tight">
                Architectural <br className="hidden sm:block" />
                <span className="font-normal bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Excellence
                </span>
              </h1>
              
              <motion.p
                className="text-white/80 font-light text-sm md:text-base lg:text-lg max-w-2xl leading-relaxed mb-6 md:mb-8 lg:mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Discover our portfolio of transformative projects that redefine spaces and experiences.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator - Hide on mobile */}
        {!isMobile && (
          <motion.div
            className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <div className="flex flex-col items-center">
              <span className="text-white/60 font-light text-xs md:text-sm mb-1 md:mb-2 tracking-wider">EXPLORE</span>
              <motion.div
                className="w-[1px] h-8 md:h-12 lg:h-16 bg-gradient-to-b from-white/80 to-transparent"
                animate={{ height: [8, 16, 8] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Premium Filters Section - Mobile optimized */}
      <motion.div 
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 20 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 md:py-6 gap-4 sm:gap-0">
            {/* Mobile: Filters header */}
            <div className="sm:hidden w-full flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Filter Projects</h2>
              <motion.button
                onClick={() => toggleDropdown('advanced')}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#6455D1] to-[#8B7CFF] text-white rounded-lg"
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filters</span>
              </motion.button>
            </div>

            {/* Desktop: Advanced Filter Button */}
            <motion.div
              className="hidden sm:flex items-center space-x-3"
              ref={dropdownRef}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={() => toggleDropdown('advanced')}
                  className="flex items-center space-x-2 px-4 md:px-5 py-2.5 md:py-3 bg-gradient-to-r from-[#6455D1] to-[#8B7CFF] text-white rounded-lg md:rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  <Layers className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="font-medium text-sm md:text-base">Filters</span>
                  <ChevronDown className={`w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 ${activeDropdown === 'advanced' ? 'rotate-180' : ''}`} />
                </button>
              </motion.div>

              {/* Active Filters Display */}
              <AnimatePresence>
                {(filters.sectors.length > 0 || filters.regions.length > 0 || filters.status.length > 0 || filters.types.length > 0) && (
                  <motion.div
                    className="flex items-center space-x-2 overflow-x-auto max-w-[200px] md:max-w-none"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                  >
                    <div className="flex items-center space-x-2">
                      {[...filters.sectors, ...filters.regions, ...filters.status, ...filters.types].slice(0, 2).map((filter, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="px-2 py-1 bg-gradient-to-r from-[#6455D1]/10 to-[#8B7CFF]/10 text-[#6455D1] text-xs md:text-sm rounded border border-[#6455D1]/20 whitespace-nowrap"
                        >
                          {filter}
                        </motion.span>
                      ))}
                      {[...filters.sectors, ...filters.regions, ...filters.status, ...filters.types].length > 2 && (
                        <span className="text-xs text-gray-500">
                          +{[...filters.sectors, ...filters.regions, ...filters.status, ...filters.types].length - 2} more
                        </span>
                      )}
                    </div>
                    <button
                      onClick={clearFilters}
                      className="flex-shrink-0 text-gray-500 hover:text-[#6455D1] transition-colors duration-300 p-1.5 hover:bg-gray-100 rounded-lg"
                    >
                      <X className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Projects Count */}
            <motion.div
              className="flex items-center space-x-3 md:space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="text-gray-600 font-light text-sm md:text-base">
                {filteredProjects.length} <span className="text-gray-400">projects</span>
              </span>
              <motion.div 
                className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full bg-gradient-to-r from-[#6455D1] to-[#8B7CFF] flex items-center justify-center text-white text-xs md:text-sm font-medium"
                whileHover={{ scale: 1.1, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                {filteredProjects.length}
              </motion.div>
            </motion.div>
          </div>

          {/* Advanced Filter Panel - Responsive */}
          <AnimatePresence>
            {activeDropdown === 'advanced' && (
              <motion.div
                className={`pb-4 md:pb-6 ${isMobile ? 'overflow-y-auto max-h-[60vh]' : ''}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-4'} gap-4 md:gap-6`}>
                  {[
                    { type: 'sectors', label: 'Sectors', icon: <Building2 className="w-3 h-3 md:w-4 md:h-4" />, items: allSectors },
                    { type: 'regions', label: 'Regions', icon: <Map className="w-3 h-3 md:w-4 md:h-4" />, items: allRegions },
                    { type: 'status', label: 'Status', icon: <Clock className="w-3 h-3 md:w-4 md:h-4" />, items: allStatus },
                    { type: 'types', label: 'Types', icon: <Layers className="w-3 h-3 md:w-4 md:h-4" />, items: allTypes }
                  ].map(({ type, label, icon, items }) => (
                    <div key={type} className="space-y-2 md:space-y-3">
                      <div className="flex items-center space-x-1.5 md:space-x-2 text-gray-600">
                        {icon}
                        <span className="font-medium text-sm md:text-base">{label}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 md:gap-2">
                        {items.map(item => (
                          <motion.button
                            key={item}
                            onClick={() => toggleFilter(type, item)}
                            className={`px-2.5 py-1 md:px-3 md:py-1.5 text-xs md:text-sm rounded-lg transition-all duration-300 ${
                              filters[type].includes(item)
                                ? 'bg-gradient-to-r from-[#6455D1] to-[#8B7CFF] text-white shadow-lg'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {item}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Mobile Filter Actions */}
                {isMobile && (
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-[#6455D1] transition-colors"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={() => setActiveDropdown(null)}
                      className="px-4 py-2 bg-gradient-to-r from-[#6455D1] to-[#8B7CFF] text-white text-sm rounded-lg"
                    >
                      Apply Filters
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Premium Projects Grid - Responsive */}
      <div className="w-full mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12 lg:py-16 xl:py-20">
        {filteredProjects.length === 0 ? (
          <motion.div
            className="text-center py-16 md:py-24 lg:py-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 md:mb-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Eye className="w-10 h-10 md:w-16 md:h-16 text-gray-400" />
            </motion.div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-600 mb-3 md:mb-4">No projects found</h3>
            <p className="text-gray-400 font-light text-sm md:text-base">Try adjusting your filters or browse all projects.</p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.1
                }
              }
            }}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
                isHovered={hoveredCard === project.id}
                onMouseEnter={() => handleMouseEnter(project.id)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleProjectClick(project.id)}
                isMobile={isMobile}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Floating Action Button - Mobile optimized */}
      <motion.div
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 z-40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.button
          onClick={clearFilters}
          className={`flex items-center space-x-2 md:space-x-3 ${isMobile ? 'px-4 py-3' : 'px-5 md:px-6 py-3 md:py-4'} bg-gradient-to-r from-[#6455D1] to-[#8B7CFF] text-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-300`}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw className="w-4 h-4 md:w-5 md:h-5" />
          {!isMobile && <span className="font-medium text-sm md:text-base">Reset Filters</span>}
        </motion.button>
      </motion.div>
    </div>
  );
}

// Premium Project Card Component - Responsive
const ProjectCard = ({ project, index, isHovered, onMouseEnter, onMouseLeave, onClick, isMobile }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [direction, setDirection] = useState(0);
  const cardRef = useRef(null);

  const images = [project.headerimage, ...(project.images || [])].filter(Boolean);

  const nextImage = () => {
    setDirection(0);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setDirection(1);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto-play functionality - disable on mobile for performance
  useEffect(() => {
    if (!autoPlay || images.length <= 1 || isMobile) return;

    const interval = setInterval(() => {
      setDirection(0);
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, images.length, isMobile]);

  // Elegant card animations
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 40,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.19, 1, 0.22, 1],
        delay: index * 0.1
      }
    },
    hover: {
      y: isMobile ? 0 : -12,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  // Refined slide animation
  const slideVariants = {
    enter: (direction) => ({
      x: direction === 0 ? 300 : -300,
      opacity: 0,
      scale: 1.08,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 350, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }
    },
    exit: (direction) => ({
      x: direction === 0 ? -300 : 300,
      opacity: 0,
      scale: 1.08,
      transition: {
        duration: 0.3
      }
    })
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className="relative cursor-pointer group"
    >
      {/* Card Container */}
      <div className={`relative ${isMobile ? 'h-[300px]' : 'h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px]'} overflow-hidden rounded-xl md:rounded-2xl bg-white shadow-lg hover:shadow-xl md:hover:shadow-2xl transition-all duration-500`}>
        
        {/* Image Container */}
        <div className="absolute inset-0">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt={project.title}
              className="w-full h-full object-cover absolute inset-0"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            />
          </AnimatePresence>
          
          {/* Elegant Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          
          {/* Subtle Glow on Hover */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-[#6455D1]/10 via-transparent to-[#8B7CFF]/10"
            animate={{ 
              opacity: isHovered && !isMobile ? 0.2 : 0,
            }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Content Overlay - Responsive positioning */}
        <div className={`absolute bottom-0 left-0 right-0 ${isMobile ? 'p-4' : 'p-5 md:p-6'} text-white`}>
          {/* Title and Location Container */}
          <motion.div 
            className="mb-3 md:mb-4"
            animate={{ 
              y: isHovered && !isMobile ? -10 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Project Title - Capitalized */}
            <motion.h3
              className={`font-light mb-1.5 md:mb-2 leading-snug capitalize ${isMobile ? 'text-lg' : 'text-xl md:text-2xl'}`}
              animate={{ 
                scale: isHovered && !isMobile ? 1.02 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {project.title.toLowerCase().split(' ').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </motion.h3>
            
            {/* Location with Elegant Icon - Capitalized */}
            <div className="flex items-center text-white/80 font-light">
              <MapPin className={`${isMobile ? 'w-3 h-3' : 'w-3 h-3 md:w-4 md:h-4'} mr-1.5 md:mr-2 opacity-80`} />
              <span className={`tracking-wide capitalize ${isMobile ? 'text-xs' : 'text-sm md:text-base'}`}>
                {project.location.toLowerCase().split(', ').map(part => 
                  part.split(' ').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')
                ).join(', ')}
              </span>
            </div>
          </motion.div>

          {/* Bottom Slide Navigation - Mobile optimized */}
          {images.length > 1 && (
            <motion.div 
              className={`flex items-center justify-between ${isMobile ? 'mt-4' : 'mt-4 md:mt-6'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Image Indicators - Elegant Design */}
              <div className="flex space-x-1">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setDirection(idx > currentImageIndex ? 0 : 1);
                      setCurrentImageIndex(idx);
                    }}
                    className={`rounded-full transition-all duration-300 ${
                      idx === currentImageIndex 
                        ? `bg-white ${isMobile ? 'w-6 h-1' : 'w-7 md:w-8 h-1'}` 
                        : 'bg-white/40 hover:bg-white/60 w-1 h-1'
                    }`}
                  />
                ))}
              </div>
              
              {/* Navigation Arrows - Show only on hover for desktop */}
              {(!isMobile || isHovered) && (
                <div className="flex space-x-1.5 md:space-x-2">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className={`${isMobile ? 'w-7 h-7' : 'w-7 md:w-8 md:h-8'} rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft className={`${isMobile ? 'w-3 h-3' : 'w-3 md:w-4 md:h-4'} text-white`} />
                  </motion.button>
                  
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className={`${isMobile ? 'w-7 h-7' : 'w-7 md:w-8 md:h-8'} rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRight className={`${isMobile ? 'w-3 h-3' : 'w-3 md:w-4 md:h-4'} text-white`} />
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Status Badge - Responsive */}
        <motion.div 
          className={`absolute ${isMobile ? 'top-3 left-3' : 'top-4 left-4'} backdrop-blur`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + index * 0.1 }}
        >
          <span className={`px-2 py-1 md:px-3 md:py-1.5 rounded-full ${isMobile ? 'text-xs' : 'text-xs md:text-sm'} font-medium backdrop-blur-lg bg-white/10 border border-white/20`}>
            {project.status?.charAt(0).toUpperCase() + project.status?.slice(1).toLowerCase()}
          </span>
        </motion.div>

        {/* Explore Project Button - Appears on Hover (desktop only) */}
        {!isMobile && (
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-20 md:bottom-24 left-1/2 transform -translate-x-1/2 z-10"
              >
                <button className="flex items-center bg-white/10 backdrop-blur-lg border border-white/20 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-white/20 transition-all duration-300 group/explore">
                  <span className="text-xs md:text-sm font-medium mr-2">Explore</span>
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                  </motion.div>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Subtle Border Accents - Hide on mobile for performance */}
        {!isMobile && (
          <>
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-white/20 rounded-tl-lg" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-white/20 rounded-tr-lg" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-white/20 rounded-bl-lg" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-white/20 rounded-br-lg" />
          </>
        )}
      </div>

      {/* Subtle Outer Glow - Only on desktop */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#6455D1]/10 to-[#8B7CFF]/10 blur-md -z-10"
          animate={{ 
            opacity: isHovered ? 0.4 : 0,
          }}
          transition={{ duration: 0.4 }}
        />
      )}
    </motion.div>
  );
};