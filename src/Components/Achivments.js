"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Heading from "./Heading";

export default function Achievements() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const stats = [
    { value: 100, label: "Projects Completed", suffix: "+", icon: "🏗️" },
    { value: 15, label: "Years of Excellence", suffix: "+", icon: "⭐" },
    { value: 90, label: "Satisfied Clients", suffix: "+", icon: "🙏" },
    { value: 12, label: "Awards Received", suffix: "", icon: "🏆" }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  const counterVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.25,
        duration: 1.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <section 
      ref={containerRef} 
      className="w-[95%] max-w-7xl mx-auto my-20 md:my-32 py-24 px-6 md:px-12 relative overflow-hidden bg-white"
    >
      {/* Enhanced Classic Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Subtle Paper Texture */}
        <div className="absolute inset-0 bg-[#fefefe]" />
        
        {/* Classic Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(#000 1px, transparent 1px),
              linear-gradient(90deg, #000 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
        
        {/* Hand-drawn Line Accents */}
        <motion.div 
          className="absolute top-20 left-0 right-0 h-px bg-gray-200/50"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
        <motion.div 
          className="absolute bottom-20 left-0 right-0 h-px bg-gray-200/50"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.5, delay: 0.7 }}
        />
        
        {/* Floating Architectural Elements */}
        <motion.div 
          className="absolute top-1/4 -left-4 w-8 h-8 border border-gray-300/30 rotate-45"
          animate={{
            y: [0, -10, 0],
            rotate: [45, 50, 45],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 -right-4 w-6 h-6 border border-gray-300/20"
          animate={{
            y: [0, 8, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Subtle Cursor-aware Glow */}
        <motion.div 
          className="absolute w-64 h-64 bg-gradient-to-r from-gray-100/10 to-gray-200/10 rounded-full blur-2xl"
          style={{
            x: mousePosition.x - 128,
            y: mousePosition.y - 128,
          }}
          animate={{
            scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
          transition: {
            duration: 3,
            repeat: Infinity,
          }
          }}
        />
      </div>
      
      {/* Elegant Header Section */}
      <div ref={ref} className="w-full md:w-2/3 lg:w-1/2 mb-20 md:mb-28">
        <motion.div 
          className="relative"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Section Number */}
          {/* <motion.div 
            className="absolute -left-8 -top-4 text-8xl font-serif text-gray-100/80 z-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            04
          </motion.div>
          
          <motion.h2 
            className="text-xs font-light uppercase tracking-[0.3em] text-gray-500 mb-4 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            OUR LEGACY
          </motion.h2> */}
          
       <Heading>Years of Excellence</Heading>
          
          <motion.div 
            className="h-px w-20 bg-gray-400/60"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 1.2, delay: 0.7 }}
          />
        </motion.div>
      </div>
      
      {/* Classic Stats Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            className="text-center p-10 bg-transparent group relative"
            variants={itemVariants}
            whileHover={{ 
              y: -6,
              transition: { duration: 0.4, ease: "easeOut" }
            }}
          >
            {/* Hover Border Effect */}
            <div className="absolute inset-0 border border-gray-200/0 group-hover:border-gray-300/50 transition-all duration-500 rounded-sm" />
            
            {/* Icon Container */}
            <motion.div 
              className="w-16 h-16 mx-auto mb-8 flex items-center justify-center text-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              {stat.icon}
            </motion.div>
            
            {/* Animated Counter */}
            <motion.div 
              className="text-5xl md:text-6xl font-light text-black mb-4 flex justify-center items-baseline font-serif"
              custom={index}
              variants={counterVariants}
            >
              {isInView ? (
                <CountUp start={0} end={stat.value} duration={2.5} delay={index * 0.3} />
              ) : (
                0
              )}
              <span className="text-3xl md:text-4xl text-gray-600/80 ml-1">{stat.suffix}</span>
            </motion.div>
            
            {/* Label with Enhanced Typography */}
            <motion.p 
              className="text-gray-600 text-lg font-light tracking-wider mt-6 uppercase letter-spacing-wider relative"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1 + index * 0.15, duration: 0.8 }}
            >
              {stat.label}
              {/* Subtle underline on hover */}
              <span className="absolute bottom-0 left-1/2 w-0 h-px bg-gray-400 group-hover:w-8 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-500" />
            </motion.p>
            
            {/* Decorative Corner Elements */}
            <div className="absolute top-3 left-3 w-2 h-2 border-t border-l border-gray-300/0 group-hover:border-gray-300/50 transition-all duration-500" />
            <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-gray-300/0 group-hover:border-gray-300/50 transition-all duration-500" />
            <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-gray-300/0 group-hover:border-gray-300/50 transition-all duration-500" />
            <div className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-gray-300/0 group-hover:border-gray-300/50 transition-all duration-500" />
          </motion.div>
        ))}
      </motion.div>

      {/* Elegant Bottom Section */}
      <motion.div 
        className="text-center mt-24 md:mt-32 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <motion.p 
          className="text-gray-600 text-xl font-light mb-8 tracking-wide max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.4 }}
        >
          "Architecture is the thoughtful making of space." — Louis Kahn
        </motion.p>
        
        <motion.button 
          className="px-12 py-5 border border-black text-black font-light tracking-wider hover:bg-black hover:text-white transition-all duration-500 relative overflow-hidden group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10 flex items-center gap-3">
            Begin Your Project
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3 }}
            >
              ↗
            </motion.span>
          </span>
          
          {/* Button Hover Effect */}
          <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          
          {/* Button Border Animation */}
          <div className="absolute inset-0 border border-black group-hover:border-transparent transition-all duration-500" />
        </motion.button>
        
        {/* Signature Line */}
        <motion.div 
          className="h-px w-32 bg-gray-300/40 mx-auto mt-16"
          initial={{ width: 0 }}
          animate={isInView ? { width: 128 } : { width: 0 }}
          transition={{ duration: 1.5, delay: 1.6 }}
        />
      </motion.div>
    </section>
  );
}

// Enhanced CountUp Component
const CountUp = ({ start, end, duration, delay = 0 }) => {
  const [count, setCount] = useState(start);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  useEffect(() => {
    if (isInView) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        
        // Elegant ease-out quint curve
        const easeOutQuint = 1 - Math.pow(1 - progress, 5);
        const currentCount = Math.floor(easeOutQuint * (end - start) + start);
        
        setCount(currentCount);
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      
      setTimeout(() => {
        window.requestAnimationFrame(step);
      }, delay * 1000);
    }
  }, [isInView, end, start, duration, delay]);
  
  return <span ref={ref} className="font-serif">{count}</span>;
};