"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Plus, X, ArrowRight } from "lucide-react";

const faqData = [
  {
    id: 1,
    title: "ARCHITECTURAL SERVICES",
    content: "Purposeful and context-driven building designs that blend form and function seamlessly.",
    points: [
      "Concept Design",
      "Architectural Planning",
      "3D Visualization",
      "Construction Docs",
    ],
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 2,
    title: "PROJECT MANAGEMENT & SUPERVISION",
    content: "Efficient execution with timely delivery and precision oversight.",
    points: [
      "Scheduling",
      "Quality Checks",
      "Budget Control",
      "Site Supervision",
    ],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 3,
    title: "HERITAGE CONSERVATION",
    content: "Preserving heritage with modern expertise and respectful restoration.",
    points: [
      "Restoration Plans",
      "Material Conservation",
      "Adaptive Reuse",
      "Cultural Integration",
    ],
    image: "/assets/heritage.jpg",
  },
  {
    id: 4,
    title: "MASTER PLANNING",
    content: "Holistic layouts for sustainable growth and community development.",
    points: [
      "Urban Design",
      "Infrastructure",
      "Green Planning",
      "Zoning Strategies",
    ],
    image: "/assets/master.jpg",
  },
  {
    id: 5,
    title: "INTERIOR DESIGNING",
    content: "Functional spaces with modern aesthetics and personalized touch.",
    points: [
      "Space Planning",
      "Material Selection",
      "Lighting Design",
      "Furniture Setup",
    ],
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2058&q=80",
  },
  {
    id: 6,
    title: "DEVELOPMENT & CONSULTING",
    content: "Strategic guidance for smart growth and sustainable development.",
    points: [
      "Feasibility Studies",
      "Project Advisory",
      "Sustainability Plans",
      "Design Consulting",
    ],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
];

// Enhanced Parallax Background
function ParallaxBackground() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 0]);

  return (
    <div ref={ref} className="absolute inset-0 -z-10 overflow-hidden">
      {/* Subtle Grain Texture */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      
      {/* Minimal Grid Pattern */}
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
      
      {/* Floating Geometric Elements */}
      <motion.div 
        className="absolute top-20 left-10 w-24 h-24 border border-gray-200 opacity-5"
        style={{ y }}
      />
      <motion.div 
        className="absolute bottom-20 right-16 w-20 h-20 border border-gray-200 opacity-5 rotate-12"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "25%"]) }}
      />
      <motion.div 
        className="absolute top-1/2 right-1/4 w-12 h-12 border border-gray-200 opacity-5 rounded-full"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "35%"]) }}
      />
    </div>
  );
}

// Enhanced Image Loader Component
function ImageWithFallback({ src, alt, className, isOpen }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fallbackImage = "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center z-10">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
        </div>
      )}
      <motion.img
        src={hasError ? fallbackImage : src}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-700 ${
          isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
        } ${isOpen ? 'grayscale-0' : 'grayscale-50'}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
      />
      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
    </div>
  );
}

export default function ServicesSection() {
  const [openItem, setOpenItem] = useState(1);
  const containerRef = useRef(null);

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-white overflow-hidden">
      <ParallaxBackground />
      
      <div className="relative w-full mx-auto md:px-8 lg:px-12 px-6 py-24">
        {/* Section Header */}
        {/* Enhanced Services Items */}
        <div className="max-w-7xl mx-auto space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openItem === item.id;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="relative"
              >
                {/* Service Item Container */}
                <motion.div
                  className={`relative bg-white ${
                    isOpen 
                      ? " shadow-2xl bg-gradient-to-r from-white to-gray-50/30" 
                      : "border-transparent hover:border-gray-300 shadow-sm"
                  } transition-all duration-500 cursor-pointer group`}
                  onClick={() => toggleItem(item.id)}
                  whileHover={{ 
                    y: -4,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-8 lg:p-10">
                    <div className="flex items-center gap-8">
                      <motion.span
                        className={`text-2xl md:text-3xl font-light transition-colors duration-300 ${
                          isOpen ? "text-black" : "text-gray-400 group-hover:text-gray-600"
                        }`}
                        animate={{ scale: isOpen ? 1.2 : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {String(item.id).padStart(2, "0")}
                      </motion.span>
                      <h3 className={`text-xl md:text-2xl lg:text-3xl font-normal uppercase tracking-wider transition-colors duration-300 ${
                        isOpen ? "text-black" : "text-gray-700 group-hover:text-black"
                      }`}>
                        {item.title}
                      </h3>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className={`flex items-center justify-center w-12 h-12 border transition-all duration-300 ${
                        isOpen 
                          ? " bg-black text-white shadow-lg" 
                          : "border-gray-300 text-gray-500 group-hover:border-black group-hover:text-black group-hover:shadow-md"
                      }`}
                    >
                      {isOpen ? (
                        <X size={22} className="stroke-1" />
                      ) : (
                        <Plus size={22} className="stroke-1" />
                      )}
                    </motion.div>
                  </div>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="grid lg:grid-cols-2 gap-16 px-8 lg:px-10 pb-10">
                          {/* Text Content */}
                          <div className="space-y-8">
                            <motion.p
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 }}
                              className="text-lg text-gray-600 leading-relaxed font-light tracking-wide"
                            >
                              {item.content}
                            </motion.p>
                            
                            <ul className="space-y-4">
                              {item.points.map((point, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.3 + i * 0.1 }}
                                  className="flex items-center gap-4 text-gray-700 group"
                                >
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                    className="w-1.5 h-1.5 bg-black rounded-full flex-shrink-0"
                                  />
                                  <span className="font-light group-hover:text-black transition-all duration-300 tracking-wide text-lg">
                                    {point}
                                  </span>
                                </motion.li>
                              ))}
                            </ul>
                            
                            <motion.button
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.8 }}
                              whileHover={{ 
                                scale: 1.02, 
                                x: 8,
                                backgroundColor: "#000",
                                color: "#fff"
                              }}
                              whileTap={{ scale: 0.98 }}
                              className="flex items-center gap-4 px-10 py-5 border-2 border-black text-black font-light tracking-wide transition-all duration-300 group"
                            >
                              <span>Discover More</span>
                              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                            </motion.button>
                          </div>

                          {/* Enhanced Image Section */}
                          <motion.div
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative"
                          >
                            <div className="absolute -inset-6 border border-gray-100 pointer-events-none" />
                            <div className="relative overflow-hidden">
                              <ImageWithFallback 
                                src={item.image}
                                alt={item.title}
                                className="w-full h-72 md:h-96"
                                isOpen={isOpen}
                              />
                            </div>
                            {/* Subtle Frame Effect */}
                            <div className="absolute inset-0 border border-white/20 pointer-events-none" />
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>


      </div>
    </div>
  );
}