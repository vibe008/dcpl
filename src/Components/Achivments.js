"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function Achievements() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const stats = [
    { value: 100, label: "Projects Completed", suffix: "+", icon: "📊" },
    { value: 15, label: "Years of Experience", suffix: "+", icon: "⏳" },
    { value: 50, label: "Happy Clients", suffix: "+", icon: "👥" },
    { value: 12, label: "Awards Won", suffix: "", icon: "🏆" }
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
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
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
        delay: i * 0.2,
        duration: 1.2,
        ease: "easeOut"
      }
    })
  };

  return (
    <section 
      ref={containerRef} 
      className="w-[95%] max-w-7xl mx-auto my-16 md:my-24 py-20 px-4 md:px-8 relative overflow-hidden bg-white"
    >
      {/* Enhanced Grid Background with Wave Animation */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Base Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(#000 1px, transparent 1px),
              linear-gradient(90deg, #000 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Wave Layer - Moves with cursor */}
        <motion.div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(#000 1px, transparent 1px),
              linear-gradient(90deg, #000 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
        
        {/* Ripple Effect Layer */}
        <motion.div 
          className="absolute inset-0 opacity-[0.01]"
          style={{
            backgroundImage: `
              linear-gradient(#000 1px, transparent 1px),
              linear-gradient(90deg, #000 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            clipPath: `circle(100px at ${mousePosition.x}px ${mousePosition.y}px)`,
          }}
          animate={{
            clipPath: [
              `circle(80px at ${mousePosition.x}px ${mousePosition.y}px)`,
              `circle(120px at ${mousePosition.x}px ${mousePosition.y}px)`,
              `circle(80px at ${mousePosition.x}px ${mousePosition.y}px)`,
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Gradient Orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full opacity-10 blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full opacity-10 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Header Section */}
      <div ref={ref} className="w-full md:w-2/3 lg:w-1/2 mb-16 md:mb-24">
        <motion.div 
          className="pl-6"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <motion.h2 
            className="text-sm font-light uppercase tracking-widest text-gray-500 mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            BY THE NUMBERS
          </motion.h2>
          <motion.h3 
            className="text-4xl md:text-5xl lg:text-6xl font-light text-black tracking-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our Journey in Figures
          </motion.h3>
          {/* <motion.div 
            className="h-px w-16 bg-gray-400"
            initial={{ width: 0 }}
            animate={isInView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          /> */}
        </motion.div>
      </div>
      
      {/* Stats Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            className="text-center p-8 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-none hover:shadow-xl transition-all duration-500 group relative overflow-hidden"
            variants={itemVariants}
            whileHover={{ 
              y: -8, 
              transition: { duration: 0.3 }
            }}
          >
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            
            {/* Animated border on hover */}
            <div className="absolute inset-0 border border-transparent group-hover:border-gray-300 transition-all duration-500" />
            
            <motion.div 
              className="text-4xl md:text-5xl lg:text-6xl font-light text-black mb-3 flex justify-center items-end"
              custom={index}
              variants={counterVariants}
            >
              {isInView ? (
                <CountUp start={0} end={stat.value} duration={2} delay={index * 0.3} />
              ) : (
                0
              )}
              <span className="text-gray-600 ml-1 text-3xl md:text-4xl">{stat.suffix}</span>
            </motion.div>
            
            <motion.p 
              className="text-gray-600 text-base font-light tracking-wide mt-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              {stat.label}
            </motion.p>
            
            {/* Animated underline */}
            <motion.div 
              className="h-px bg-black mx-auto mt-6"
              initial={{ width: 0 }}
              whileHover={{ width: "40px" }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom CTA */}
      <motion.div 
        className="text-center mt-16 md:mt-24 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <p className="text-gray-600 text-lg font-light mb-6">
          Ready to start your next project with us?
        </p>
        <motion.button 
          className="px-8 py-4 border border-black text-black font-light hover:bg-black hover:text-white transition-all duration-300 relative overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">Get In Touch</span>
          <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </motion.button>
      </motion.div>
    </section>
  );
}

// CountUp Component
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
        const easeOutBack = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeOutBack * (end - start) + start);
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
  
  return <span ref={ref}>{count}</span>;
};