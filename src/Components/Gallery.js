'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

function Gallery() {
  const galleryRef = useRef(null)

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // scroll progress sirf gallery ke andar
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start center", "end center"],
  })

  // Animations
  const leftX = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -20 : -120])
  const rightX = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 20 : 120])
  const bottomY1 = useTransform(scrollYProgress, [0, 1], [0, 120])
  const bottomY2 = useTransform(scrollYProgress, [0, 1], [100, isMobile ? -50 : 200]) // jo pehle top:100px tha
  const scaleCenter = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  return (
    <section
      id="gallery"
      ref={galleryRef}
      className="mt-20 w-[95%] m-auto h-[100vh] lg:h-[200vh]"
    >
      <div className="sticky top-0 z-[-1] bg-white py-2">
        <h2 className="text-[4vw] lg:text-[2vw]  font-bold text-black uppercase tracking-wider text-center">
          as featured in
        </h2>
        <h2 className="text-[12vw] sm:text-[10vw] md:text-[16vw] lg:text-[10vw] font-bold text-black uppercase tracking-wider text-center">
          Gallery
        </h2>
      </div>

      <div className="max-h-[90vh]  mt-20  md:mt-50 lg:mt-20 z-10">
        <div
          className="
        grid
        w-full 
        max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw]
        h-[300px] sm:h-[400px] md:h-[1000px] lg:h-[500px] 
        m-auto 
        gap-2 sm:gap-4
      "
          style={{
            gridTemplateRows: 'auto auto',
            gridTemplateColumns: '1fr 1fr 1fr',
            placeItems: 'center',
          }}
        >
          {/* Left Image */}
          <Link
            href=""
            className="left relative top-2 sm:top-4 left-[-10px] md:left-[-50px] lg:left-0 w-[80%] lg:w-full z-10 md:w-[150%] h-[100%] md:h-[100%]"
          >
            <motion.img
              src="../assets/gallery2.jpg"
              alt=""
              className="w-full h-full object-cover rounded-xl"
              style={{ x: leftX }}
            />
          </Link>

          {/* Center Image */}
          <Link
            href="mid"
            className="center w-[150%] md:w-[220%] lg:w-full h-[110%] lg:h-full"
            style={{ gridArea: '1 / 2 / 3 / 3' }}
          >
            <motion.img
              className="h-full w-full object-cover rounded-xl"
              src="../assets/gallery1.jpg"
              alt=""
              style={{ scale: scaleCenter }}
            />
          </Link>

          {/* Right Image */}
          <Link
            href=""
            className="right-[0px] relative   md:left-[50px] lg:left-[-10px] w-[90%] md:w-[150%] lg:w-[100%] h-[90%] md:h-[130%]"
          >
            <motion.img
              src="../assets/gallery3.jpg"
              alt=""
              className="w-full h-full object-cover rounded-xl"
              style={{ x: rightX }}
            />
          </Link>

          {/* Bottom Left */}
          <Link href="" className="bottom-left relative w-full left-[-10px] md:left-0 md:w-[200%] lg:w-[100%] h-[120%] md:h-[80%] lg:h-[100%]">
            <motion.img
              src="../assets/gallery4.jpg"
              alt=""
              className="w-full h-full object-cover rounded-xl"
              style={{ y: bottomY1 }}
            />
          </Link>

          {/* Bottom Right */}
          <Link href="" className="bottom-left relative w-[120%] left-0 md:top-50 lg:top-0 md:left-0 md:w-[180%] lg:w-[100%] h-[60%] md:h-[80%] lg:h-[100%] sm:w-[40%]">
            <motion.img
              src="../assets/gallery5.jpg"
              alt=""
              className="w-full h-full object-cover rounded-xl"
              style={{ y: bottomY2 }}
            />
          </Link>
        </div>
      </div>
    </section>

  )
}

export default Gallery
