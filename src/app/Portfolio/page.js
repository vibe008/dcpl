"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { 
  X, ChevronLeft, ChevronRight, ZoomIn, Grid, List, 
  Filter, ArrowRight, ArrowLeft, Play, Pause
} from "lucide-react";
import renderProjects from "../../Components/renderProjects";
import Navbar from "@/<@>/Components/Navbar";

const Page = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  // Get unique categories from renderProjects
  const categories = ["all", ...new Set(renderProjects
    .filter(project => project.images && project.images.length > 0)
    .map(project => project.category.toLowerCase())
  )];

  // Transform renderProjects data to match the gallery format
  const images = renderProjects
    .filter(project => project.images && project.images.length > 0)
    .map(project => ({
      id: project.id,
      title: project.title,
      category: project.category.toLowerCase(),
      description: project.description || project.content,
      image: project.images[0], // Use first image from images array
      year: project.year,
      projectData: project // Include full project data for reference
    }));

  const filteredImages = activeCategory === "all" 
    ? images 
    : images.filter(image => image.category === activeCategory.toLowerCase());

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && filteredImages.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => 
          prevIndex === filteredImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, filteredImages.length]);

  const nextImage = () => {
    if (filteredImages.length === 0) return;
    setCurrentIndex(currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1);
  };

  const prevImage = () => {
    if (filteredImages.length === 0) return;
    setCurrentIndex(currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1);
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
   <>
   <Navbar />
   <div className="min-h-screen bg-white text-gray-900 w-[95%] mx-auto">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>
          <div 
            className="h-full w-full bg-cover bg-center"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80')` 
            }}
          ></div>
        </div>
        
        <motion.div 
          className="text-center z-10 px-4 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Project Gallery
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-10 text-gray-200 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore our collection of architectural achievements and innovative designs
          </motion.p>
        </motion.div>
      </section>

      {/* Gallery Controls */}
      <section className="py-8 px-4 border-b border-gray-200 sticky top-0 bg-white z-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setCurrentIndex(0); // Reset to first image when category changes
                  }}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    activeCategory === category 
                      ? 'bg-black text-white' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium">View:</span>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg ${
                viewMode === "grid" 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg ${
                viewMode === "list" 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Image Slider - Only show if there are images */}
      {filteredImages.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Featured Projects</h2>
            
            <div className="relative h-96 rounded-xl overflow-hidden bg-black">
              <motion.div 
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${filteredImages[currentIndex]?.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{filteredImages[currentIndex]?.title}</h3>
                    <p className="mb-2">{filteredImages[currentIndex]?.description}</p>
                    <div className="flex items-center gap-4 text-gray-300">
                      <span className="capitalize">{filteredImages[currentIndex]?.category}</span>
                      <span>•</span>
                      <span>{filteredImages[currentIndex]?.year}</span>
                      <span>•</span>
                      <span>{filteredImages[currentIndex]?.projectData?.status}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {filteredImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-3 h-3 rounded-full ${
                      currentIndex === index ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>

              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Gallery Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {filteredImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No projects found in this category.</p>
            </div>
          ) : (
            <motion.div 
              className={
                viewMode === "grid" 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                  : "flex flex-col gap-6"
              }
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  variants={itemVariants}
                  className={`group relative overflow-hidden cursor-pointer ${
                    viewMode === "list" ? "flex h-40" : "aspect-square"
                  }`}
                  onClick={() => setSelectedImage(image)}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <motion.div 
                    className={`bg-gray-200 ${
                      viewMode === "list" ? "w-40 flex-shrink-0" : "w-full h-full"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div 
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${image.image})` }}
                    />
                  </motion.div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <h3 className="font-bold">{image.title}</h3>
                      <p className="text-sm text-gray-300 capitalize">{image.category}</p>
                      <p className="text-xs text-gray-400 mt-1">{image.year} • {image.projectData?.status}</p>
                    </div>
                  </div>
                  
                  <div className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-4xl w-full max-h-full bg-black rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6" />
              </button>

              <div className="h-96 md:h-[500px] bg-gray-800">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedImage.image})` }}
                />
              </div>

              <div className="p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">{selectedImage.title}</h2>
                <div className="flex items-center gap-4 text-gray-300 mb-4">
                  <span className="capitalize">{selectedImage.category}</span>
                  <span>•</span>
                  <span>{selectedImage.year}</span>
                  <span>•</span>
                  <span>{selectedImage.projectData?.status}</span>
                  {selectedImage.projectData?.cost && (
                    <>
                      <span>•</span>
                      <span>{selectedImage.projectData.cost}</span>
                    </>
                  )}
                </div>
                <p className="text-gray-200 mb-4">{selectedImage.description}</p>
                {selectedImage.projectData?.features && selectedImage.projectData.features.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Features:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedImage.projectData.features.map((feature, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-gray-700 rounded text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {selectedImage.projectData?.city && (
                  <p className="text-gray-300">
                    <span className="font-semibold">Location:</span> {selectedImage.projectData.city}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
   </>
  );
}

export default Page;
