"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Heading from "./Heading";

export default function About() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const textVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.section
            ref={sectionRef}
            id="about"
            className="w-[95%] max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 py-20 lg:py-32 relative"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                {/* Subtle Grid */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `
                            linear-gradient(#000 1px, transparent 1px),
                            linear-gradient(90deg, #000 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px',
                    }}
                />
                {/* Accent Line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ delay: 0.5, duration: 1.2, ease: "easeInOut" }}
                    className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
                />
            </div>

            {/* Heading Section */}
            <motion.div
                className="w-full lg:w-[45%] flex items-start"
                variants={itemVariants}
            >
                <Heading>About</Heading>
            </motion.div>

            {/* Content Section */}
            <motion.div
                className="w-full lg:w-[55%] flex flex-col lg:flex-row gap-12 lg:gap-16"
                variants={itemVariants}
            >
                {/* First Paragraph */}
                <motion.div
                    className="w-full lg:w-[48%]"
                    variants={textVariants}
                >
                    <div className="relative">
                        {/* Paragraph Number */}
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ delay: 1, duration: 0.6 }}
                            className="absolute -left-8 -top-2 text-2xl font-light text-gray-400"
                        >
                            01
                        </motion.span>

                        <p className="text-lg lg:text-xl text-gray-700 leading-relaxed font-light tracking-wide">
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ delay: 1.2, duration: 0.6 }}
                                className="block mb-4"
                            >
                                Dera Consultants was founded by Ar. Mayank Garg in 2011, later it was converted to Private Limited in 2014 and in 2016, Anand J Thakkar join the company as one of the Directors.
                            </motion.span>
                        </p>
                    </div>
                </motion.div>

                {/* Second Paragraph */}
                <motion.div
                    className="w-full lg:w-[48%]"
                    variants={textVariants}
                >
                    <div className="relative">
                        {/* Paragraph Number */}
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ delay: 1.4, duration: 0.6 }}
                            className="absolute -left-8 -top-2 text-2xl font-light text-gray-400"
                        >
                            02
                        </motion.span>

                        <p className="text-lg lg:text-xl text-gray-700 leading-relaxed font-light tracking-wide">
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ delay: 1.6, duration: 0.6 }}
                                className="block mb-4"
                            >
                                We are a multidisciplinary practice that provides professional services in Architectural design, interior design, Engineering, Urban planning, Project management and construction management.
                            </motion.span>

                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ delay: 1.8, duration: 0.6 }}
                                className="block"
                            >
                                We believe that design is essentially problem-solving. The objective is to find simple and elegant solutions to practical problems, within the unique constraints faced by each project.
                            </motion.span>
                        </p>
                    </div>
                </motion.div>
            </motion.div>

            {/* Floating decorative elements */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
                className="absolute right-10 bottom-10 w-20 h-20 border border-gray-200 opacity-10 pointer-events-none"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 2.2, duration: 0.8 }}
                className="absolute left-10 top-1/4 w-3 h-3 bg-gray-300 opacity-20 rounded-full pointer-events-none"
            />
        </motion.section>
    );
}