'use client';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';

const UltraMinimalLoading = ({ isLoading, onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [text, setText] = useState('');
  const fullText = 'DCPL';
  const typingSpeed = 150;
  const pauseBeforeExit = 400;

  useEffect(() => {
    let timeout;
    
    if (isLoading && text.length < fullText.length) {
      timeout = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, typingSpeed);
    } else if (text.length === fullText.length) {
      timeout = setTimeout(() => {
        setIsVisible(false);
        onLoadingComplete?.();
      }, pauseBeforeExit);
    }
    
    return () => clearTimeout(timeout);
  }, [isLoading, text, onLoadingComplete]);

  // Reset when loading starts
  useEffect(() => {
    if (isLoading) {
      setText('');
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
          exit={{ 
            opacity: 0,
            transition: { duration: 0.3, ease: "easeInOut" }
          }}
        >
          {/* Animated text with cursor */}
          <div className="relative">
            <motion.div
              className="text-6xl md:text-7xl font-light tracking-wider text-gray-900"
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {text}
              
              {/* Blinking cursor */}
              <motion.span
                className="ml-1 inline-block w-[1px] h-16 bg-gradient-to-b from-gray-900 to-gray-600"
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
            
            {/* Subtle progress line */}
            <motion.div
              className="h-[1px] w-0 mt-8 bg-gradient-to-r from-transparent via-gray-400 to-transparent"
              animate={{
                width: `${(text.length / fullText.length) * 100}px`
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut"
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UltraMinimalLoading;