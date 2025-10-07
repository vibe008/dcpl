'use client'
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";

const NewHero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Letter animation variants
  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      rotateX: -45
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: 0.8 + i * 0.15,
        duration: 1.2,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };

  const letters = ["D", "C", "P", "L"];

  return (
    <div className="relative">
      <Navbar/>
      
      {/* Decorative Border Frame */}
      <div className="fixed inset-4 pointer-events-none border border-white/20 z-50 lg:inset-8" />
      
      <section className="relative h-screen w-[95%] mx-auto overflow-hidden bg-neutral-50">
        
        {/* Background Image with Parallax Effect */}
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src="/assets/hero.jpg"
            alt="Townhall Building"
            className="h-full w-full object-cover brightness-[0.9]"
          />
        </motion.div>

        {/* Sophisticated Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
        
        {/* Animated Grid Pattern */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="absolute inset-0 grid grid-cols-12"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-l border-r border-white/30" />
          ))}
        </motion.div>

        {/* Corner Accents */}
        <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-white/40 pointer-events-none" />
        <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-white/40 pointer-events-none" />
        <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-white/40 pointer-events-none" />
        <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-white/40 pointer-events-none" />

        {/* Main Content */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
          
          {/* Top Accent Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
            className="absolute top-20 w-24 h-px bg-white/50"
          />

          {/* Main Title with Enhanced Animation */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-[11vw] font-serif font-light text-white tracking-tight leading-none relative">
              
              {/* Subtle Text Shadow */}
              <div className="absolute inset-0 text-black/20 transform translate-x-1 translate-y-1 -z-10">
                {letters.map((letter, index) => (
                  <span key={index} className="inline-block">
                    {letter}
                  </span>
                ))}
              </div>

              {/* Animated Letters */}
              <div className="flex justify-center space-x-1 lg:space-x-2">
                {letters.map((letter, index) => (
                  <motion.span
                    key={index}
                    custom={index}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block relative cursor-default"
                    whileHover={{ 
                      y: -8,
                      scale: 1.05,
                      transition: { 
                        duration: 0.4,
                        ease: "easeOut"
                      }
                    }}
                  >
                    {letter}
                    
                    {/* Animated Underline */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 1.8 + index * 0.1, duration: 0.8 }}
                      className="absolute bottom-2 left-0 w-full h-0.5 bg-white/50 transform origin-left"
                    />
                  </motion.span>
                ))}
              </div>
            </h1>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 1 }}
              className="mt-8"
            >
              <div className="relative inline-block">
                <p className="text-white/90 font-sans text-sm lg:text-base tracking-[0.3em] uppercase font-light">
                  Architecture & Design Studio
                </p>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 2, duration: 1.2 }}
                  className="absolute -bottom-3 left-0 h-px bg-white/40"
                />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="text-white/80 font-light text-sm lg:text-base tracking-normal max-w-md mx-auto mt-6 leading-relaxed"
            >
              Crafting timeless spaces where modern innovation meets classical elegance
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.4, duration: 0.6 }}
              className="mt-8"
            >
              <motion.button
                whileHover={{ 
                  backgroundColor: "white",
                  color: "black",
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-white/60 text-white bg-transparent backdrop-blur-sm text-sm tracking-widest uppercase font-light"
              >
                Explore Our Work
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Bottom Accent Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
            className="absolute bottom-20 w-24 h-px bg-white/50"
          />

          {/* Enhanced Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center space-y-3">
              <motion.div
                animate={{ 
                  y: [0, 8, 0],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-px h-12 bg-white/60"
              />
              <motion.span
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-white/70 text-xs tracking-widest uppercase font-light"
              >
                Scroll to Discover
              </motion.span>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-6 text-white/50 text-xs uppercase tracking-widest font-light"
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0 }}
          >
            Modern
          </motion.span>
          <span>•</span>
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          >
            Classical
          </motion.span>
          <span>•</span>
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          >
            Timeless
          </motion.span>
        </motion.div>

      </section>
    </div>
  );
};

export default NewHero;