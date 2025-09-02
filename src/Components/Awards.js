'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Awards = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const awardsData = [
    {
      id: 1,
      title: "Best Architectural Design 2023",
      organization: "International Design Awards",
      year: "2023",
      category: "Architecture",
      image: "/awards/design-award.jpg"
    },
    {
      id: 2,
      title: "Sustainable Design Excellence",
      organization: "Green Building Council",
      year: "2022",
      category: "Sustainability",
      image: "/awards/sustainability-award.jpg"
    },
    {
      id: 3,
      title: "Heritage Conservation Award",
      organization: "Cultural Heritage Society",
      year: "2022",
      category: "Conservation",
      image: "/awards/heritage-award.jpg"
    },
    {
      id: 4,
      title: "Innovation in Urban Planning",
      organization: "Urban Development Institute",
      year: "2021",
      category: "Urban Planning",
      image: "/awards/innovation-award.jpg"
    },
    {
      id: 5,
      title: "Commercial Excellence Award",
      organization: "Builders Association",
      year: "2021",
      category: "Commercial",
      image: "/awards/commercial-award.jpg"
    },
    {
      id: 6,
      title: "Residential Project of the Year",
      organization: "National Housing Board",
      year: "2020",
      category: "Residential",
      image: "/awards/residential-award.jpg"
    }
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="w-[95%] max-w-7xl mx-auto relative z-10">
        {/* Section Header with Animated SVG Background */}
        <div className="text-center mb-16 md:mb-20 relative">
          {/* Animated SVG Background */}
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <svg 
              className="w-full max-w-2xl h-32 md:h-40 text-gray-100" 
              viewBox="0 0 600 120"
            >
              {/* Animated Trophy */}
              <motion.path
                d="M300,20 L320,50 L340,30 L360,50 L380,30 L400,50 L420,30 L440,50 L460,30 L480,50 L500,30 L520,50 L540,30 L560,50 L580,30 L600,50 L580,70 L560,90 L540,70 L520,90 L500,70 L480,90 L460,70 L440,90 L420,70 L400,90 L380,70 L360,90 L340,70 L320,90 L300,70 L280,90 L260,70 L240,90 L220,70 L200,90 L180,70 L160,90 L140,70 L120,90 L100,70 L80,90 L60,70 L40,90 L20,70 L0,50 L20,30 L40,50 L60,30 L80,50 L100,30 L120,50 L140,30 L160,50 L180,30 L200,50 L220,30 L240,50 L260,30 L280,50 L300,20 Z"
                fill="currentColor"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              
              {/* Animated Stars */}
              {[50, 150, 250, 350, 450, 550].map((x, index) => (
                <motion.path
                  key={index}
                  d="M{x},100 L{x+5},90 L{x+10},100 L{x+5},110 Z"
                  fill="currentColor"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2,
                    ease: "easeOut"
                  }}
                />
              ))}
              
              {/* Animated Medals */}
              <motion.circle
                cx="100"
                cy="40"
                r="8"
                fill="gold"
                stroke="currentColor"
                strokeWidth="2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              />
              <motion.circle
                cx="500"
                cy="40"
                r="8"
                fill="silver"
                stroke="currentColor"
                strokeWidth="2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
              />
            </svg>
          </div>

          {/* Text Content */}
          <motion.h2 
            className="text-sm md:text-base font-medium uppercase tracking-widest text-gray-500 mb-3 relative z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            RECOGNITION & AWARDS
          </motion.h2>
          <motion.h3 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 relative z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Awards
          </motion.h3>
          <motion.div 
            className="w-16 h-0.5 bg-gray-800 mx-auto relative z-20"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {awardsData.map((award, index) => (
            <motion.div
              key={award.id}
              className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-500 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Award Image */}
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                <div 
                  className="w-full h-full bg-gray-200 transition-transform duration-700 group-hover:scale-110"
                  style={{ 
                    backgroundImage: `url(${award.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                ></div>
                
                {/* Year Badge */}
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-sm">
                  <span className="text-sm font-medium text-gray-700">{award.year}</span>
                </div>
              </div>
              
              {/* Award Content */}
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                  {award.title}
                </h4>
                <p className="text-gray-600 text-sm mb-3">{award.organization}</p>
                
                {/* Category Tag */}
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                  {award.category}
                </span>
                
                {/* Hover Effect Line */}
                <div className="w-0 group-hover:w-12 h-0.5 bg-gray-800 mt-4 transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300 font-medium">
            View All Awards
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Awards;