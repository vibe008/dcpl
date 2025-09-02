"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const stats = [
    { value: 100, label: "Projects Completed", suffix: "+", icon: "📊" },
    { value: 15, label: "Years of Experience", suffix: "+", icon: "⏳" },
    { value: 50, label: "Happy Clients", suffix: "+", icon: "👥" },
    { value: 12, label: "Awards Won", suffix: "", icon: "🏆" }
  ];

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
    <section ref={ref} className="w-[95%] max-w-7xl mx-auto my-16 md:my-24 py-12 px-4 md:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64  rounded-full opacity-40 blur-3xl -z-10"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64  rounded-full opacity-30 blur-3xl -z-10"></div>
      
      <div className="w-full md:w-2/3 lg:w-1/2 mb-12 md:mb-20">
        <motion.h2 
          className="text-lg md:text-xl font-medium uppercase tracking-widest text-gray-500 mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          BY THE NUMBERS
        </motion.h2>
        <motion.h3 
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Our Journey in Figures
        </motion.h3>
        <motion.div 
          className="h-0.5 w-16 bg-gray-800 mt-4"
          initial={{ width: 0 }}
          animate={isInView ? { width: 64 } : { width: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </div>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            className="text-center p-6 md:p-8 bg-white rounded-xl  hover:shadow-lg transition-all duration-500 border border-gray-100 group relative overflow-hidden"
            variants={itemVariants}
            whileHover={{ 
              y: -8, 
              transition: { duration: 0.3 }
            }}
          >
            {/* Hover effect background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            
            {/* Icon container */}
            {/* <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-200 transition-colors duration-500">
              <span className="text-2xl md:text-3xl">{stat.icon}</span>
            </div> */}
            
            <motion.div 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 flex justify-center items-end"
              custom={index}
              variants={counterVariants}
            >
              {isInView ? (
                <CountUp start={0} end={stat.value} duration={1.5} delay={index * 0.3} />
              ) : (
                0
              )}
              <span className="text-gray-700 ml-1">{stat.suffix}</span>
            </motion.div>
            
            <p className="text-gray-600 text-sm md:text-base font-medium mt-2">{stat.label}</p>
            
            {/* Animated underline on hover */}
            <div className="w-0 group-hover:w-12 h-0.5 bg-gray-800 mx-auto mt-4 transition-all duration-500"></div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// Enhanced CountUp component
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
        // Use easing function for smoother animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeOutQuart * (end - start) + start);
        setCount(currentCount);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      
      // Add delay
      setTimeout(() => {
        window.requestAnimationFrame(step);
      }, delay * 1000);
    }
  }, [isInView, end, start, duration, delay]);
  
  return <span ref={ref}>{count}</span>;
};