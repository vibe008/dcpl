"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export default function Heading({ children, delay = 0 }) {
    const [isMobile, setIsMobile] = useState(false);
    const headingRef = useRef(null);
    const isInView = useInView(headingRef, { once: true, margin: "-50px" });
    
    const { scrollYProgress } = useScroll({
        target: headingRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.3, 1, 1, 0.3]);
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.9]);
    const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [30, 0, 0, -20]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.2,
                ease: [0.25, 0.1, 0.25, 1], // Custom ease curve
                delay: delay
            }
        }
    };

    const textVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: delay + (i * 0.1)
            }
        })
    };

    // Split text into words for individual animation
    const words = children ? children.toString().split(" ") : [];

    return (
        <motion.div
            ref={headingRef}
            className="relative"
            style={{ opacity, scale, y }}
        >
            <motion.h2
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{
                    color: "var(--black)",
                    letterSpacing: "-3px",
                    textTransform: "uppercase",
                    marginTop: "-5px",
                    marginBottom: "10px",
                    fontSize: isMobile ? "4rem" : "4.5rem",
                    fontWeight: "700",
                    lineHeight: "110%",
                    position: "relative",
                    display: "inline-block"
                }}
            >
                {/* Animated Background Effect */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ delay: delay + 0.5, duration: 1, ease: "easeInOut" }}
                    className="absolute bottom-0 left-0 w-full h-1 bg-black origin-left"
                    style={{ y: 10 }}
                />
                
                {/* Word-by-word animation */}
                {words.map((word, i) => (
                    <motion.span
                        key={i}
                        custom={i}
                        variants={textVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="inline-block mr-2 last:mr-0"
                        whileHover={{
                            y: -5,
                            transition: { duration: 0.3, ease: "easeOut" }
                        }}
                    >
                        {word}
                    </motion.span>
                ))}
                
                {/* Decorative Elements */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ delay: delay + 1, duration: 0.6 }}
                    className="absolute -top-2 -right-4 w-3 h-3 bg-gray-400 rounded-full"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ delay: delay + 1.2, duration: 0.6 }}
                    className="absolute -bottom-1 -left-4 w-2 h-2 bg-gray-300 rounded-full"
                />
            </motion.h2>
            
            {/* Subtle Shadow/Glow Effect */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.1 } : { opacity: 0 }}
                transition={{ delay: delay + 0.8, duration: 0.8 }}
                className="absolute inset-0 blur-md"
                style={{
                    background: "linear-gradient(45deg, transparent 30%, #000 50%, transparent 70%)",
                    zIndex: -1
                }}
            />
        </motion.div>
    );
}