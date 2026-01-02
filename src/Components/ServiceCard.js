// components/ServiceCard.js
'use client';

import { motion } from 'framer-motion';

export default function ServiceCard({ service, isSelected, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative p-6 rounded-xl cursor-pointer transition-all duration-300
        ${isSelected 
          ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-2xl' 
          : 'bg-gradient-to-br from-gray-50 to-white text-gray-900 shadow-lg hover:shadow-xl'
        }
        overflow-hidden group
      `}
      onClick={onClick}
    >
      {/* Background decorative element */}
      <div className={`
        absolute -right-8 -top-8 w-24 h-24 rounded-full
        ${isSelected ? 'bg-white/10' : 'bg-gray-900/5'} 
        transition-all duration-500 group-hover:scale-125
      `}></div>

      <div className="relative z-10">
        <h3 className="text-xl font-serif font-bold mb-3">
          {service.title}
        </h3>
        <p className={`
          text-sm mb-4 line-clamp-3
          ${isSelected ? 'text-gray-200' : 'text-gray-600'}
        `}>
          {service.description}
        </p>
        
        <div className="flex items-center">
          <span className={`
            text-sm font-medium
            ${isSelected ? 'text-white' : 'text-gray-900'}
          `}>
            View Details
          </span>
          <motion.div
            animate={{ x: isSelected ? 10 : 0 }}
            transition={{ duration: 0.3 }}
            className={`
              ml-2 w-6 h-6 rounded-full flex items-center justify-center
              ${isSelected ? 'bg-white/20' : 'bg-gray-900/10'}
            `}
          >
            <svg 
              className={`
                w-4 h-4 ${isSelected ? 'text-white' : 'text-gray-900'}
              `} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Border animation */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 border-2 border-white/20 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
}