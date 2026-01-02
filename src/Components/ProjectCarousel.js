// components/ProjectCarousel.js
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function ProjectCarousel({ projects }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  if (!projects.length) return null;

  const currentProject = projects[currentIndex];

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
      }
    })
  };

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Main Carousel Container */}
      <div 
        className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl"
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => setAutoPlay(true)}
      >
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentProject._id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${currentProject.headerimage || currentProject.images[0]})`,
                filter: 'brightness(0.7)'
              }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Project Info - Center Aligned like image */}
            <div className="relative h-full flex flex-col items-center justify-center p-8 md:p-12">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-white text-center max-w-2xl mx-auto"
              >
                <div className="mb-6 flex justify-center items-center gap-4 flex-wrap">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                    {currentProject.type}
                  </span>
                  <span className="text-white/80">
                    • {currentProject.year}
                  </span>
                  <span className="text-white/80">
                    • {currentProject.location}
                  </span>
                </div>
                
               <Link href={`/Projects/${currentProject._id}`}>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 cursor-pointer hover:underline">
                    {currentProject.title}
                  </h2>
               </Link>
                
                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  {currentProject.description}
                </p>
                
                <div className="flex justify-center items-center text-white/80">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-lg">{currentProject.location}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-20 group"
        >
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-20 group"
        >
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Progress Bar */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-1 bg-white/20 rounded-full overflow-hidden z-20">
          <motion.div
            key={currentProject._id}
            className="h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
          />
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${index === currentIndex 
                  ? 'w-8 bg-white' 
                  : 'bg-white/50 hover:bg-white/80'
                }
              `}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="mt-12 overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 min-w-max px-4">
          {projects.map((project, index) => (
            <button
              key={project._id}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className="group relative flex-shrink-0"
            >
              <div className={`
                relative w-40 h-24 rounded-xl overflow-hidden transition-all duration-300
                ${index === currentIndex 
                  ? 'ring-2 ring-gray-900 ring-offset-2 scale-105' 
                  : 'group-hover:scale-105'
                }
              `}>
                <img
                  src={project.images[0] || project.headerimage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className={`
                  absolute inset-0 bg-gradient-to-t from-black/60 to-transparent
                  transition-opacity duration-300
                  ${index === currentIndex ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}
                `} />
                <div className="absolute bottom-2 left-2 right-2 cursor-pointer">
                  <p className={`
                    text-xs font-medium truncate text-white
                    ${index === currentIndex ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                    transition-opacity duration-300 cursor-pointer
                  `}>
                    {project.title}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}