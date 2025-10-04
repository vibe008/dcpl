"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Eye, ArrowRight, Search, Filter, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Nav from "@/<@>/Components/ui/Nav";
import renderProjects from "../../Components/renderProjects";
import Navbar from "@/<@>/Components/Navbar";
const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const projects = [
    {
      id: "1",
      title: "Jubilee Park Heritage Complex",
      location: "Mathura, UP",
      year: "2023",
      status: "completed",
      category: "tourism",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "A magnificent heritage complex celebrating Mathura's cultural legacy with modern amenities.",
      cost: "₹50 Cr",
      area: "25 acres"
    },
    {
      id: "2", 
      title: "Goverdhan Bus Terminal",
      location: "Goverdhan, UP",
      year: "2024",
      status: "ongoing",
      category: "institutional",
      image: "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Modern transit hub designed to serve pilgrims and locals with sustainable architecture.",
      cost: "₹35 Cr",
      area: "12 acres"
    },
    {
      id: "3",
      title: "Ras Khan Samadhi Restoration",
      location: "Mathura, UP", 
      year: "2022",
      status: "completed",
      category: "temples",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Careful restoration of historic monument preserving architectural authenticity.",
      cost: "₹15 Cr",
      area: "2 acres"
    },
    {
      id: "4",
      title: "Vrindavan Township",
      location: "Vrindavan, UP",
      year: "2025",
      status: "upcoming", 
      category: "townships",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Integrated township development combining residential, commercial and spiritual spaces.",
      cost: "₹200 Cr",
      area: "100 acres"
    },
    {
      id: "5",
      title: "Yamuna Ghat Development",
      location: "Mathura, UP",
      year: "2023",
      status: "completed",
      category: "ghats",
      image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
      description: "Revitalization of sacred ghats with improved accessibility and amenities.",
      cost: "₹80 Cr",
      area: "15 km"
    },
    {
      id: "6",
      title: "Affordable Housing Complex",
      location: "Prayagraj, UP",
      year: "2024",
      status: "ongoing",
      category: "housing",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Sustainable housing solutions for urban communities with modern amenities.",
      cost: "₹120 Cr",
      area: "50 acres"
    },
    {
      id: "7",
      title: "Heritage Temple Corridor",
      location: "Varanasi, UP",
      year: "2023",
      status: "completed",
      category: "temples",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Development of spiritual corridor connecting ancient temples along the riverfront.",
      cost: "₹95 Cr",
      area: "8 km"
    },
    {
      id: "8",
      title: "Smart City Road Network",
      location: "Lucknow, UP",
      year: "2024",
      status: "ongoing",
      category: "roads",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Intelligent transportation system with smart traffic management and sustainable materials.",
      cost: "₹180 Cr",
      area: "45 km"
    }
  ];
  console.log("renderProjects",renderProjects)
  const statusFilters = [
    { label: "All", value: "all" },
    { label: "Completed", value: "Completed" },
    { label: "Ongoing", value: "Ongoing" },
    { label: "Proposed", value: "Proposed" }
  ];

  const categoryFilters = [
    { label: "All", value: "all" },
    { label: "Housing", value: "housing" },
    { label: "Temples", value: "temples" },
    { label: "Ghats", value: "ghats" },
    { label: "Institutional", value: "institutional" },
    { label: "Tourism", value: "tourism" },
    { label: "Roads", value: "roads" },
    { label: "Townships", value: "townships" }
  ];

  const filteredProjects = renderProjects.filter(project => {
    const statusMatch = activeFilter === 'all' || project.status === activeFilter;
    const categoryMatch = activeCategory === 'all' || project.category === activeCategory;
    const searchMatch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return statusMatch && categoryMatch && searchMatch;
  });

  useEffect(() => {
    setVisibleProjects([]);
    const timer = setTimeout(() => {
      setVisibleProjects(filteredProjects);
    }, 100);
    return () => clearTimeout(timer);
  }, [activeFilter, activeCategory, searchQuery]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-white text-black border border-black';
      case 'Ongoing': 
        return 'bg-gray-700 text-white';
      case 'Upcoming':
        return 'bg-gray-400 text-black';
      default:
        return 'bg-gray-100 text-black';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const clearAllFilters = () => {
    setActiveFilter('all');
    setActiveCategory('all');
    setSearchQuery('');
    setIsFiltersOpen(false);
  };

  const hasActiveFilters = activeFilter !== 'all' || activeCategory !== 'all' || searchQuery !== '';

  return (
    <>
      <Navbar />
      <div className="min-h-screen text-black w-[95%] m-auto">
        {/* Hero Section */}
        <section className="relative pt-40 pb-32 px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/30"></div>
            <div 
              className="h-full w-full bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
              }}
            ></div>
          </div>
          
          <motion.div 
            className="relative z-10 max-w-7xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our <span className="text-white border-b-4 border-white">Projects</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-200 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover our portfolio of architectural excellence spanning heritage conservation, 
              modern infrastructure, and sustainable development across India.
            </motion.p>
          </motion.div>

          {/* Scrolling Indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <div className="animate-bounce flex flex-col items-center">
              <span className="text-white text-sm mb-2">Explore Projects</span>
              <ChevronDown className="w-6 h-6 text-white animate-pulse" />
            </div>
          </motion.div>
        </section>

        {/* Compact Search and Filter Bar */}
        <section className="py-8 px-6 lg:px-8 bg-white sticky top-0 z-40 border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between gap-4">
              {/* Results Count */}
              <motion.div 
                className="text-sm text-gray-600 font-medium hidden lg:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
              </motion.div>

              {/* Search Bar - Compact */}
              <motion.div 
                className="relative flex-1 max-w-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all bg-white"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>

              {/* Filter Button with Badge */}
              <motion.button
                onClick={() => setIsFiltersOpen(true)}
                className="relative flex items-center gap-2 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors group"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="w-5 h-5" />
                <span className="hidden sm:inline">Filters</span>
                
                {/* Active Filters Badge */}
                {hasActiveFilters && (
                  <motion.span 
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    {[activeFilter !== 'all', activeCategory !== 'all', searchQuery !== ''].filter(Boolean).length}
                  </motion.span>
                )}
              </motion.button>
            </div>

            {/* Mobile Results Count */}
            <motion.div 
              className="text-sm text-gray-600 font-medium mt-3 lg:hidden text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
            </motion.div>
          </div>
        </section>

        {/* Animated Filter Modal */}
        <AnimatePresence>
          {isFiltersOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFiltersOpen(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              />
              
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-2xl max-h-[80vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-black">Filter Projects</h2>
                  <button
                    onClick={() => setIsFiltersOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Filters Content */}
                <div className="p-6 space-y-8">
                  {/* Status Filters */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Status</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {statusFilters.map((filter) => (
                        <motion.button
                          key={filter.value}
                          onClick={() => setActiveFilter(filter.value)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border-2 ${
                            activeFilter === filter.value 
                              ? 'bg-black text-white border-black shadow-lg' 
                              : 'bg-white text-gray-700 border-gray-300 hover:border-black hover:bg-gray-50'
                          }`}
                        >
                          {filter.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Category Filters */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Category</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {categoryFilters.map((filter) => (
                        <motion.button
                          key={filter.value}
                          onClick={() => setActiveCategory(filter.value)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border-2 ${
                            activeCategory === filter.value 
                              ? 'bg-black text-white border-black shadow-lg' 
                              : 'bg-white text-gray-700 border-gray-300 hover:border-black hover:bg-gray-50'
                          }`}
                        >
                          {filter.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                  <motion.button
                    onClick={clearAllFilters}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 text-gray-600 hover:text-black font-medium transition-colors"
                  >
                    Clear All
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setIsFiltersOpen(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 font-medium transition-colors"
                  >
                    Apply Filters
                  </motion.button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Projects Grid */}
        <section className="py-16 px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              {filteredProjects.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  key={`${activeFilter}-${activeCategory}-${searchQuery}`}
                >
                  {visibleProjects.map((project)=>{

                    const showitem = project.images.length !== 0;
                    console.log("showitem",showitem)
                    return(
                      showitem && (
                      <motion.div
                      key={project.id}
                      variants={itemVariants}
                      whileHover={{ 
                        y: -8,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                      className="group cursor-pointer"
                    >
                      <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 bg-white h-full flex flex-col border border-gray-200">
                        <div className="relative overflow-hidden h-64">
                          <motion.img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            style={{ filter: "grayscale(30%)" }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute top-4 right-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(project.status)}`}>
                              {project.status}
                            </span>
                          </div>
                          <motion.div 
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                            initial={{ scale: 0.8 }}
                            whileHover={{ scale: 1 }}
                            transition={{ duration: 0.4 }}
                          >
                            <Link href={`/Projects/${project.id}`}>
                              <button className="flex items-center px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </button>
                            </Link>
                          </motion.div>
                        </div>
                        
                        <div className="p-5 flex-1 flex flex-col">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300 line-clamp-2">
                            {project.title}
                          </h3>
                          <div className="flex items-center text-gray-600 mb-3 space-x-3">
                            <div className="flex items-center text-sm">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span>{project.location}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>{project.year}</span>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-4 flex-1 leading-relaxed line-clamp-3">
                            {project.description}
                          </p>
                          {(project.cost || project.area) && (
                            <div className="flex items-center justify-between text-sm mt-auto pt-4 border-t border-gray-200">
                              {project.cost && (
                                <span className="font-bold text-black">{project.cost}</span>
                              )}
                              {project.area && (
                                <span className="text-gray-600">{project.area}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                      )
                    )
                  })}
                </motion.div>
              ) : (
                <motion.div 
                  className="text-center py-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="text-gray-500 mb-4 text-lg">No projects found matching your criteria</div>
                  <motion.button 
                    onClick={clearAllFilters}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    Clear all filters
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProjectsPage;