'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MainSlider() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Fetch slides from API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();

        console.log("get project data ", data);
        if (data.success) {
          const featuredProjects = data?.data?.filter(project => project.markforhomepage === true) || [];
          setSlides(featuredProjects);
        } else {
          setSlides([]);
        }
      } catch (error) {
        console.error('Error fetching slides:', error);
        setSlides([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  // Progress bar animation - Increased slide duration to 8 seconds
  useEffect(() => {
    if (slides.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        // 8000ms total duration (8 seconds per slide)
        return prev + (100 / (8000 / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentSlide, slides.length, isPaused]);

  // Auto-slide when progress reaches 100%
  useEffect(() => {
    if (progress >= 100 && slides.length > 0 && !isPaused) {
      setDirection(0);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setProgress(0);
    }
  }, [progress, slides.length, isPaused]);

  const nextSlide = useCallback(() => {
    if (slides.length === 0) return;
    setDirection(0);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    if (slides.length === 0) return;
    setDirection(1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const goToSlide = useCallback((index) => {
    if (slides.length === 0) return;
    setDirection(index > currentSlide ? 0 : 1);
    setCurrentSlide(index);
    setProgress(0);
  }, [currentSlide, slides.length]);

  // Elegant animation variants with even slower transitions
  const slideVariants = {
    enter: (direction) => ({
      x: direction === 0 ? "100%" : "-100%",
    }),
    center: {
      x: 0,
      transition: {
        duration: 1,
        ease: [0.76, 0, 0.24, 1]
      }
    },
    exit: (direction) => ({
      x: direction === 0 ? "-100%" : "100%",
      transition: {
        duration: 1,
        ease: [0.76, 0, 0.24, 1]
      }
    })
  };


  // Image parallax and zoom effect - Slower zoom (15 seconds)
  const imageVariants = {
    initial: { scale: 1.1 },
    animate: {
      scale: 1,
      transition: {
        duration: 8,
        ease: "linear"
      }
    }
  };


  // Content animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1, // Slightly slower content reveal
        ease: [0.83, 0, 0.17, 1],
        staggerChildren: 0.15
      }
    }
  };

  const sectorVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 }
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full border-2 border-white/20"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-2 border-transparent border-t-white border-r-white/30 mx-auto"></div>
          </div>
          <p className="mt-6 text-white/70 font-light tracking-wider">LOADING ELEGANCE</p>
        </div>
      </div>
    );
  }

  if (!slides || slides.length === 0) {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-white/30 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-white/50 text-lg mb-2 tracking-wide">NO FEATURED PROJECTS</p>
          <p className="text-white/30 text-sm tracking-wider">
            Mark projects as "Feature on Homepage" to display them here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-screen bg-[#010100]  overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides Container */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
          onDragEnd={(e, { offset, velocity }) => {
            const swipeThreshold = 10000;
            const swipe = Math.abs(offset.x) * velocity.x;

            if (swipe < -swipeThreshold) {
              nextSlide();
            } else if (swipe > swipeThreshold) {
              prevSlide();
            }
          }}
        >
          <div className="relative w-full h-full">
            <motion.img
              src={slides[currentSlide]?.headerimage}
              alt={slides[currentSlide]?.title || 'Slider image'}
              className="w-full h-full object-cover object-center"
              variants={imageVariants}
              initial="initial"
              animate="animate"
              key={currentSlide}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>

          </div>
          <motion.div
            className="absolute inset-0 z-20 flex flex-col justify-end pb-32 px-12"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >

          </motion.div>
          <div className="absolute bottom-5 left-0 right-0 z-30 ">
            <div className="px-12 ">
              {slides[currentSlide]?.sectors && slides[currentSlide].sectors.length > 0 && (
                <motion.div
                  className="flex flex-wrap gap-3 mb-2"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {slides[currentSlide].sectors.map((sector, sectorIndex) => (
                    <motion.div
                      key={sectorIndex}
                      variants={sectorVariants}
                      className="bg-white/15 text-white px-3 py-0.5 rounded-full backdrop-blur-md border border-white/25"
                    >
                      <span className="text-xs font-light tracking-widest uppercase">
                        {sector}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
              
              <div className="mb-0 max-w-2xl">
                <motion.h3
                  className="font-[Archivo-Medium] text-[1.5rem] text-base text-white font-light leading-tight tracking-tight capitalize"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 1.2 }}
                >
                  {slides[currentSlide]?.title}
                </motion.h3>
              </div>
              <div className="flex items-center justify-between">
                {/* Progress Bars */}
                <div className="flex-1 max-w-2xl">
                  <div className="flex gap-2">
                    {slides.map((_, progressIndex) => (
                      <motion.button
                        key={progressIndex}
                        className="relative lg:w-[70px] w-full h-0.5 rounded-full overflow-hidden group "
                        onClick={() => goToSlide(progressIndex)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + progressIndex * 0.05 }}
                      >
                        <div className="absolute inset-0 bg-white/20 rounded-full"></div>
                        <motion.div
                          className="absolute left-0 top-0 h-full bg-white rounded-full"
                          initial={{ width: "0%" }}
                          animate={{
                            width: progressIndex === currentSlide ? `${progress}%` :
                              progressIndex < currentSlide ? "100%" : "0%"
                          }}
                          transition={{ duration: 0.1, ease: "linear" }}
                        />
                        <div className="absolute inset-0 group-hover:bg-white/10 transition-colors"></div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Slide counter with elegant divider - Moved to bottom */}
                {slides.length > 1 && (
                  <motion.div
                    className="flex items-center gap-4 ml-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="w-6 h-px bg-white/40"></div>
                    <div className="text-white/80 text-sm font-light tracking-widest min-w-[60px] text-right">
                      <span className="text-white">{(currentSlide + 1).toString().padStart(2, '0')}</span>
                      <span className="mx-1 text-white/40">/</span>
                      <span className="text-white/60">{slides.length.toString().padStart(2, '0')}</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons - Elegant Design */}
      {slides.length > 1 && (
        <>
          <motion.button
            onClick={prevSlide}
            className="absolute left-8 top-1/2 -translate-y-1/2 z-30 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 rounded-full blur-md group-hover:bg-white/20 transition-all"></div>
              <div className="relative w-14 h-14 rounded-full bg-black/40 border border-white/25 backdrop-blur-sm flex items-center justify-center group-hover:bg-black/60 transition-all duration-300">
                <ChevronLeft className="text-white" size={24} />
              </div>
            </div>
          </motion.button>

          <motion.button
            onClick={nextSlide}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-30 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 rounded-full blur-md group-hover:bg-white/20 transition-all"></div>
              <div className="relative w-14 h-14 rounded-full bg-black/40 border border-white/25 backdrop-blur-sm flex items-center justify-center group-hover:bg-black/60 transition-all duration-300">
                <ChevronRight className="text-white" size={24} />
              </div>
            </div>
          </motion.button>
        </>
      )}

      {/* Pause indicator */}
      {isPaused && (
        <motion.div
          className="absolute top-8 right-8 z-20"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="flex items-center gap-2 text-white/50 text-xs tracking-widest uppercase font-light">
            <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse"></div>
            Paused
          </div>
        </motion.div>
      )}

      {/* Subtle bottom gradient for better readability */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
    </div>
  );
}