"use client"
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Eye } from 'lucide-react'
import renderProjects from "../Components/renderProjects"

function Gallery() {
  const galleryRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [activeImage, setActiveImage] = useState(null)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start center", "end center"],
  })

  // Enhanced animations
  const leftX = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -40 : -150])
  const rightX = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 40 : 150])
  const bottomY1 = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 80 : 180])
  const bottomY2 = useTransform(scrollYProgress, [0, 1], [100, isMobile ? -80 : 250])
  const scaleCenter = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

  // Filter projects that have images array with at least one image
  const projectsWithImages = renderProjects.filter(project => 
    project.images && project.images.length > 0
  )

  // Select first 5 projects with images for the gallery
  const galleryProjects = projectsWithImages.slice(0, 5)

  return (
    <section
      id="gallery"
      ref={galleryRef}
      className="mt-20 w-[95%] mx-auto h-[100vh] lg:h-[200vh] bg-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-10 w-px h-32 bg-gray-200/50" />
        <div className="absolute bottom-1/4 right-10 w-px h-24 bg-gray-200/50" />
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
      </div>

      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm py-8 border-b border-gray-100">
        <div className="text-center">
          <motion.div 
            className="inline-block mb-4"
            style={{ scale: titleScale }}
          >
            <div className="w-16 h-px bg-gray-400 mx-auto mb-3" />
            <h2 className="text-sm font-light text-gray-600 uppercase tracking-widest mb-2">
              Featured Works
            </h2>
            <h2 className="text-6xl lg:text-8xl font-light text-black uppercase tracking-tight">
              Gallery
            </h2>
            <div className="w-16 h-px bg-gray-400 mx-auto mt-3" />
          </motion.div>
          <motion.p 
            className="text-gray-500 text-lg font-light max-w-2xl mx-auto mt-4"
            style={{ opacity }}
          >
            A curated collection of our architectural achievements and design innovations
          </motion.p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-h-[90vh] mt-12 lg:mt-20">
        <div className="
          grid
          w-full 
          max-w-[90vw] sm:max-w-[85vw] md:max-w-[75vw] lg:max-w-[65vw]
          h-[350px] sm:h-[450px] md:h-[1100px] lg:h-[600px] 
          mx-auto 
          gap-3 sm:gap-6
        "
          style={{
            gridTemplateRows: 'auto auto',
            gridTemplateColumns: '1fr 1fr 1fr',
            placeItems: 'center',
          }}
        >
          {/* Left Image */}
          {galleryProjects[0] && (
            <motion.div
              className="relative group left-[-20px] md:left-[-60px] lg:left-[-10px] w-[85%] lg:w-full md:w-[160%] h-[110%] md:h-[110%]"
              onMouseEnter={() => setActiveImage(0)}
              onMouseLeave={() => setActiveImage(null)}
            >
              <Link href={`/projects/${galleryProjects[0].id}`}>
                <motion.div
                  className="relative w-full h-full overflow-hidden rounded-sm"
                  style={{ x: leftX }}
                >
                  <motion.img
                    src={galleryProjects[0].images[0]}
                    alt={galleryProjects[0].title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    whileHover={{ scale: 1.02 }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                  
                  {/* Overlay Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-white/95 backdrop-blur-sm p-4 rounded-sm">
                      <span className="text-xs font-light text-gray-500 uppercase tracking-wider">{galleryProjects[0].category}</span>
                      <h3 className="text-sm font-normal text-black mt-1">{galleryProjects[0].title}</h3>
                    </div>
                  </div>

                  {/* View Icon */}
                  <div className="absolute top-4 right-4 transform translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                    <Eye size={20} className="text-white drop-shadow-lg" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          )}

          {/* Center Image - Main Focus */}
          {galleryProjects[1] && (
            <motion.div
              className="relative group w-[170%] md:w-[240%] lg:w-full h-[120%] lg:h-full"
              style={{ gridArea: '1 / 2 / 3 / 3' }}
              onMouseEnter={() => setActiveImage(1)}
              onMouseLeave={() => setActiveImage(null)}
            >
              <Link href={`/projects/${galleryProjects[1].id}`}>
                <motion.div className="relative w-full h-full overflow-hidden rounded-sm">
                  <motion.img
                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                    src={galleryProjects[1].images[0]}
                    alt={galleryProjects[1].title}
                    style={{ scale: scaleCenter }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                  
                  {/* Featured Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/95 backdrop-blur-sm px-3 py-1 text-xs font-light text-black uppercase tracking-wider rounded-sm">
                      Featured
                    </span>
                  </div>

                  {/* Overlay Content */}
                  <div className="absolute bottom-6 left-6 right-6 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-white/95 backdrop-blur-sm p-6 rounded-sm">
                      <span className="text-sm font-light text-gray-500 uppercase tracking-wider">{galleryProjects[1].category}</span>
                      <h3 className="text-xl font-normal text-black mt-2 mb-3">{galleryProjects[1].title}</h3>
                      <div className="flex items-center gap-2 text-black group-hover:gap-3 transition-all duration-300">
                        <span className="text-sm font-light">View Project</span>
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          )}

          {/* Right Image */}
          {galleryProjects[2] && (
            <motion.div
              className="relative group right-[-10px] md:right-[-60px] lg:right-[-10px] w-[95%] md:w-[160%] lg:w-full h-[95%] md:h-[135%]"
              onMouseEnter={() => setActiveImage(2)}
              onMouseLeave={() => setActiveImage(null)}
            >
              <Link href={`/projects/${galleryProjects[2].id}`}>
                <motion.div
                  className="relative w-full h-full overflow-hidden rounded-sm"
                  style={{ x: rightX }}
                >
                  <motion.img
                    src={galleryProjects[2].images[0]}
                    alt={galleryProjects[2].title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    whileHover={{ scale: 1.02 }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                  
                  {/* Overlay Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-white/95 backdrop-blur-sm p-4 rounded-sm">
                      <span className="text-xs font-light text-gray-500 uppercase tracking-wider">{galleryProjects[2].category}</span>
                      <h3 className="text-sm font-normal text-black mt-1">{galleryProjects[2].title}</h3>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          )}

          {/* Bottom Left */}
          {galleryProjects[3] && (
            <motion.div
              className="relative group left-[-15px] md:left-[-10px] md:w-[210%] lg:w-full h-[125%] md:h-[85%] lg:h-[110%]"
              onMouseEnter={() => setActiveImage(3)}
              onMouseLeave={() => setActiveImage(null)}
            >
              <Link href={`/projects/${galleryProjects[3].id}`}>
                <motion.div
                  className="relative w-full h-full overflow-hidden rounded-sm"
                  style={{ y: bottomY1 }}
                >
                  <motion.img
                    src={galleryProjects[3].images[0]}
                    alt={galleryProjects[3].title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    whileHover={{ scale: 1.02 }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                  
                  {/* Overlay Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-white/95 backdrop-blur-sm p-4 rounded-sm">
                      <span className="text-xs font-light text-gray-500 uppercase tracking-wider">{galleryProjects[3].category}</span>
                      <h3 className="text-sm font-normal text-black mt-1">{galleryProjects[3].title}</h3>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          )}

          {/* Bottom Right */}
          {galleryProjects[4] && (
            <motion.div
              className="relative group w-[125%] md:w-[190%] lg:w-full h-[65%] md:h-[85%] lg:h-[110%]"
              onMouseEnter={() => setActiveImage(4)}
              onMouseLeave={() => setActiveImage(null)}
            >
              <Link href={`/projects/${galleryProjects[4].id}`}>
                <motion.div
                  className="relative w-full h-full overflow-hidden rounded-sm"
                  style={{ y: bottomY2 }}
                >
                  <motion.img
                    src={galleryProjects[4].images[0]}
                    alt={galleryProjects[4].title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    whileHover={{ scale: 1.02 }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                  
                  {/* Overlay Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-white/95 backdrop-blur-sm p-4 rounded-sm">
                      <span className="text-xs font-light text-gray-500 uppercase tracking-wider">{galleryProjects[4].category}</span>
                      <h3 className="text-sm font-normal text-black mt-1">{galleryProjects[4].title}</h3>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          )}
        </div>
      </div>

      {/* View All Projects Button */}
      <motion.div 
        className="sticky bottom-8 text-center mt-12 lg:mt-20"
        style={{ opacity }}
      >
        <Link href="/projects">
          <motion.button
            className="px-8 py-4 border border-black text-black font-light hover:bg-black hover:text-white transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-3">
              View All Projects
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </span>
          </motion.button>
        </Link>
      </motion.div>
    </section>
  )
}

export default Gallery