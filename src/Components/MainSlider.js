"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "./Loading";
import Link from "next/link";
const FALLBACK_SLIDES = [
  {
    headerimage:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=80",
    title: "Minimalist Living Room",
    description:
      "An elegant blend of dark tones, cozy furniture, and natural elements.",
  },
  {
    headerimage:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=2000&q=80",
    title: "Modern Premium Studio",
    description:
      "Luxurious leather accents, ambient lighting, and bespoke herringbone floors.",
  },
  {
    headerimage:
      "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=2000&q=80",
    title: "Elegant Contemporary Office",
    description:
      "Deep charcoal walls and minimalist custom shelving for an inspiring environment.",
  },
];

export default function MainSlider() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Typewriter effect state
  const words = ["aesthetic", "spaces", "lifestyle", "homes", "vision"];
  const [wordIdx, setWordIdx] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect implementation
  useEffect(() => {
    let timer;
    const currentWord = words[wordIdx];
    const typingSpeed = isDeleting ? 60 : 120;

    if (!isDeleting && typedText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setWordIdx((prev) => (prev + 1) % words.length);
    } else {
      timer = setTimeout(() => {
        setTypedText(
          isDeleting
            ? currentWord.substring(0, typedText.length - 1)
            : currentWord.substring(0, typedText.length + 1),
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, wordIdx]);

  // Fetch slides from API with fallback
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch("/api/projects");
        const data = await response.json();

        if (data.success) {
          const featuredProjects =
            data?.data?.filter((project) => project.markforhomepage === true) ||
            [];
          if (featuredProjects.length > 0) {
            console.log("featuredProjects", featuredProjects);
            setSlides(featuredProjects);
          } else {
            setSlides(FALLBACK_SLIDES);
          }
        } else {
          setSlides(FALLBACK_SLIDES);
        }
      } catch (error) {
        console.error("Error fetching slides:", error);
        setSlides(FALLBACK_SLIDES);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  // Slide duration timing (8 seconds per slide)
  useEffect(() => {
    if (slides.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 100 / (8000 / 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentSlide, slides.length, isPaused]);

  // Transition to next slide when progress reaches 100%
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

  const goToSlide = useCallback(
    (index) => {
      if (slides.length === 0) return;
      setDirection(index > currentSlide ? 0 : 1);
      setCurrentSlide(index);
      setProgress(0);
    },
    [currentSlide, slides.length],
  );

  const slideVariants = {
    enter: (direction) => ({
      x: direction === 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "linear",
      },
    },
    exit: (direction) => ({
      x: direction === 0 ? "-100%" : "100%",
      opacity: 0,
      transition: {
        duration: 1.5,
        ease: "linear",
      },
    }),
  };

  const imageVariants = {
    initial: { scale: 1.15 },
    animate: {
      scale: 1,
      transition: {
        duration: 8,
        ease: "linear",
      },
    },
  };

  if (loading) {
    return (
      <LoadingScreen
        isLoading={loading}
        onLoadingComplete={() => console.log("Loading complete!")}
        logo="ZENVORA"
        backgroundColor="#0c0d0b"
        duration={2500}
      />
    );
  }

  return (
    <div
      className="relative w-full h-screen bg-[#090a09] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Slides Carousel */}
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
          dragElastic={0.15}
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
          <div className="relative w-full h-full select-none pointer-events-none">
            {/* The Image */}
            <motion.img
              src={slides[currentSlide]?.headerimage}
              alt={slides[currentSlide]?.title || "Zenvora Spaces"}
              className="w-full h-full object-cover object-center brightness-[0.55]"
              variants={imageVariants}
              initial="initial"
              animate="animate"
              key={currentSlide}
            />
            {/* Soft Ambient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Main Centered Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-6 md:px-12 select-text">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Main Headline */}
          {/* <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-white text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[1.1] mb-6 font-[Satoshi]"
          >
            We design your{" "}
            <span className="text-[#587255] font-light font-sans">|</span>
            <br />
            <span className="text-white relative inline-block">
              {typedText}
              <span className="inline-block w-[3px] h-10 md:h-16 ml-1 bg-white/70 animate-pulse align-middle"></span>
            </span>
          </motion.h1> */}

          {/* Subtitle Description */}
          {/* <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10 font-[Switzer] font-light"
          >
            A young studio with bold ideas. We design minimalist, modern
            interiors that feel lived-in from day one.
          </motion.p> */}

          {/* Action CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex flex-row items-center justify-center space-x-6"
          >
            {/* Outlined Project Pill */}
            <Link
              href={
                slides[currentSlide]?._id
                  ? `/Projects/${slides[currentSlide]._id}`
                  : "/Projects"
              }
              className="border border-white/40 hover:border-white text-white rounded-full px-6 py-3 text-[10px] md:text-xs font-semibold tracking-[0.2em] transition-all duration-300 hover:bg-white/10 uppercase font-[Satoshi]"
            >
              View Project
            </Link>

            {/* Link Text */}
            <Link
              href="/Contact"
              className="text-white hover:text-gray-300 text-[10px] md:text-xs font-semibold tracking-[0.15em] transition-all duration-300 flex items-center gap-1.5 uppercase font-[Satoshi]"
            >
              Start a project
              <ChevronRight size={14} className="text-[#587255]" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Swipe Down Vertical Indicator on the Left Margin */}
      <div className="absolute left-8 bottom-24 z-30 hidden md:flex flex-col items-center space-y-4">
        <span className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-[Satoshi] select-none [writing-mode:vertical-lr] rotate-180">
          Swipe Down
        </span>
        <div className="w-[1px] h-14 bg-white/15 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 right-0 w-full h-1/2 bg-[#587255]"
            animate={{
              top: ["-50%", "100%"],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>

      {/* Bottom Minimal Slider Navigation / Progress Indicators */}
      <div className="absolute bottom-12 left-0 right-0 z-30 px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Project Metadata (Year, Title, Status) */}
        <div className="flex flex-col text-left select-none max-w-xs md:max-w-md">
          <div className="flex items-center gap-2.5 text-[10px] md:text-xs tracking-[0.2em] text-[#587255] uppercase font-semibold mb-1">
            <span>{slides[currentSlide]?.year || "2025"}</span>
            <span className="w-1 h-1 rounded-full bg-white/30"></span>
            <span className="text-white/60">
              {slides[currentSlide]?.status || "Active"}
            </span>
          </div>
          <h3 className="text-white text-xs md:text-sm font-bold tracking-[0.1em] uppercase font-[Satoshi] line-clamp-1">
            {slides[currentSlide]?.title}
          </h3>
        </div>

        {/* Slide Controls: Progress Indicators & Counter */}
        <div className="flex items-center space-x-6 md:space-x-8 w-full md:w-auto justify-between md:justify-end">
          {/* Progress bars that acts as slide triggers */}
          <div className="flex gap-2 w-28 md:w-40">
            {slides.map((_, idx) => (
              <button
                key={idx}
                className="relative flex-1 h-[2px] rounded-full overflow-hidden group focus:outline-none"
                onClick={() => goToSlide(idx)}
              >
                <div className="absolute inset-0 bg-white/20 rounded-full transition-colors group-hover:bg-white/30"></div>
                <motion.div
                  className="absolute left-0 top-0 h-full bg-white rounded-full"
                  initial={{ width: "0%" }}
                  animate={{
                    width:
                      idx === currentSlide
                        ? `${progress}%`
                        : idx < currentSlide
                          ? "100%"
                          : "0%",
                  }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </button>
            ))}
          </div>

          {/* Slide Counter (e.g. 01 / 03) */}
          {slides.length > 1 && (
            <div className="flex items-center gap-3 text-[10px] md:text-xs font-semibold tracking-widest text-white/50 font-[Satoshi]">
              <span className="text-white font-bold">
                {(currentSlide + 1).toString().padStart(2, "0")}
              </span>
              <span className="mx-1 text-white/20">/</span>
              <span>{slides.length.toString().padStart(2, "0")}</span>
            </div>
          )}
        </div>
      </div>

      {/* Elegant Arrow Nav Overlays (Visible on Hover / Left-Right) */}
      {slides.length > 1 && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6 pointer-events-none z-30">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-black/20 hover:bg-black/50 border border-white/10 text-white/60 hover:text-white flex items-center justify-center pointer-events-auto transition-all focus:outline-none"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-black/20 hover:bg-black/50 border border-white/10 text-white/60 hover:text-white flex items-center justify-center pointer-events-auto transition-all focus:outline-none"
            aria-label="Next Slide"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
