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
    image: "/assets/Architecture.jpg",
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
    image: "/assets/interior.jpg",
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
    image: "/assets/planing.jpg",
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
    image: "/assets/intirior.jpg",
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
    image: "/assets/projects.jpg",
  },
];

// Elegant Parallax Background
function ParallaxBackground() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 0]);

  return (
    <div ref={ref} className="absolute inset-0 -z-10 overflow-hidden">
      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(#000 1px, transparent 1px),
            linear-gradient(90deg, #000 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Floating Geometric Shapes */}
      <motion.div 
        className="absolute top-1/4 left-10 w-32 h-32 border border-gray-300 opacity-10"
        style={{ y }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-20 w-24 h-24 border border-gray-300 opacity-10 rotate-45"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]) }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/3 w-16 h-16 border border-gray-300 opacity-10 rounded-full"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "40%"]) }}
      />
    </div>
  );
}

export default function Faq() {
  const [openItem, setOpenItem] = useState(1);
  const containerRef = useRef(null);

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-white overflow-hidden">
      <ParallaxBackground />
      
      <div className="relative w-full mx-auto px-4 md:px-8 py-20">
        {/* Elegant Header */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-4">
            <div className="w-20 h-px bg-gray-300 mx-auto mb-4" />
            <h2 className="text-5xl md:text-6xl font-light text-black tracking-tight mb-4">
              Our Services
            </h2>
            <div className="w-20 h-px bg-gray-300 mx-auto" />
          </div>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Comprehensive architectural solutions tailored to your vision and needs
          </p>
        </motion.div> */}

        {/* Enhanced FAQ Items */}
        <div className="max-w-6xl mx-auto space-y-6">
          {faqData.map((item, index) => {
            const isOpen = openItem === item.id;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* FAQ Item */}
                <motion.div
                  className={`relative bg-white border border-gray-200 rounded-none p-8 cursor-pointer transition-all duration-500 hover:border-gray-400 ${
                    isOpen ? "shadow-lg bg-gray-50 border-gray-400" : "hover:shadow-md"
                  }`}
                  onClick={() => toggleItem(item.id)}
                  whileHover={{ y: -2 }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <motion.span
                        className="text-2xl md:text-3xl font-light text-gray-400"
                        animate={{ scale: isOpen ? 1.1 : 1 }}
                      >
                        {String(item.id).padStart(2, "0")}
                      </motion.span>
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-normal text-black uppercase tracking-wider">
                        {item.title}
                      </h3>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex items-center justify-center w-10 h-10 border transition-all duration-300 ${
                        isOpen ? "border-black bg-black text-white" : "border-gray-300 text-gray-500 hover:border-black hover:text-black"
                      }`}
                    >
                      {isOpen ? (
                        <X size={20} />
                      ) : (
                        <Plus size={20} />
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
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="grid lg:grid-cols-2 gap-12 mt-8">
                          {/* Text Content */}
                          <div className="space-y-6">
                            <p className="text-lg text-gray-600 leading-relaxed font-light tracking-wide">
                              {item.content}
                            </p>
                            
                            <ul className="space-y-3">
                              {item.points.map((point, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.1 + i * 0.1 }}
                                  className="flex items-center gap-4 text-gray-700 group"
                                >
                                  <div className="w-1 h-1 bg-black rounded-full" />
                                  <span className="font-light group-hover:text-black transition-colors duration-300 tracking-wide">
                                    {point}
                                  </span>
                                </motion.li>
                              ))}
                            </ul>
                            
                            <motion.button
                              whileHover={{ scale: 1.02, x: 5 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex items-center gap-3 px-8 py-4 border border-black text-black font-light hover:bg-black hover:text-white transition-all duration-300 group"
                            >
                              Learn More
                              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                            </motion.button>
                          </div>

                          {/* Image with Elegant Frame */}
                          <div className="relative">
                            <div className="absolute -inset-4 border border-gray-200 pointer-events-none" />
                            <motion.img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-64 md:h-80 object-cover relative z-10"
                              initial={{ opacity: 0, scale: 1.1 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.7 }}
                              whileHover={{ scale: 1.02 }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 pointer-events-none" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Minimal Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-20 pt-8 border-t border-gray-200"
        >
          <p className="text-gray-500 font-light tracking-wide">
            Crafting timeless architecture since 2024
          </p>
        </motion.div>
      </div>
    </div>
  );
}