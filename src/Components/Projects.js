"use client";

import Heading from "./Heading";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight, Calendar, MapPin, Building } from "lucide-react";
import renderProjects from "../Components/renderProjects";

export default function Projects() {
    const router = useRouter();
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.9]);

    const projectsData = [
        {
            id: 1,
            title: "Double Basement Car Parking",
            content: "Complete redevelopment of Mathura's iconic park with modern amenities while preserving its cultural significance.",
            image: "/assets/ProjectImages/dbca/bdcaHome.jpg",
            year: "2022",
            type: "Architecture",
            city: "Alwar",
            category: "Commercial",
            features: ["Modern Design", "Efficient Space Utilization", "Advanced Safety Systems"]
        },
        {
            id: 2,
            title: "Akshay Vat, Patalpuri and Saraswati Koop",
            content: "Heritage conservation project preserving this important historical monument using traditional techniques.",
            image: "/assets/ProjectImages/Akshayvat/asvtvHome.jpg",
            year: "2022",
            type: "Heritage",
            city: "Mathura",
            category: "Conservation",
            features: ["Traditional Techniques", "Cultural Preservation", "Historical Accuracy"]
        },
        {
            id: 3,
            title: "Hanumant Vihar Colony",
            content: "Sustainable residential development incorporating smart city principles and green building technologies.",
            image: "/assets/ProjectImages/Hv/hvHome.jpg",
            year: "2022",
            type: "Residential",
            city: "Mathura",
            category: "Development",
            features: ["Sustainable Design", "Smart City Integration", "Green Technology"]
        },
        {
            id: 4,
            title: "Govind Vihar Colony",
            content: "Sustainable residential development incorporating smart city principles and green building technologies.",
            image: "/assets/ProjectImages/gv/gvHome.jpg",
            year: "2022",
            type: "Residential",
            city: "Mathura",
            category: "Development",
            features: ["Modern Amenities", "Community Spaces", "Eco-Friendly Design"]
        },
    ];

    const random  = [...renderProjects].sort(() => Math.random() - 0.5).slice(0, 5);
    return (
        <section 
            ref={sectionRef}
            className="w-[95%] mx-auto mt-20 lg:mt-32 relative overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-20 left-10 w-px h-32 bg-gray-200/50" />
                <div className="absolute bottom-20 right-10 w-px h-24 bg-gray-200/50" />
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
            </div>

            {/* Header */}
            <motion.div 
                className="w-full lg:w-[50%] mb-16 lg:mb-24"
                style={{ opacity, scale }}
            >
                <div className="">
                    <Heading>
                    FEATURED PROJECTS
                    </Heading>
                    <p className="text-gray-600 text-lg font-light mt-4 max-w-md">
                        A showcase of our architectural excellence and innovative design solutions
                    </p>
                </div>
            </motion.div>

            {/* Projects Grid */}
            <div className="space-y-32 lg:space-y-48">
                {random.map((project, index) => {
                    const shownitem = project.images.length !== 0 

                    return (
                        shownitem && (
                        <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                        className={`relative flex flex-col lg:flex-row items-start gap-12 lg:gap-16 ${
                            index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                        }`}
                    >
                        {/* Image Container - Full width without content overlay */}
                        <motion.div 
                            className="relative w-full lg:w-[65%] h-[400px] lg:h-[600px] overflow-hidden group"
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                                initial={{ scale: 1.1 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                            />
                            
                            {/* Image Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                            
                            {/* Category Badge */}
                            <div className="absolute top-6 left-6">
                                <span className="bg-white/95 backdrop-blur-sm px-4 py-2 text-sm font-light text-black uppercase tracking-wider">
                                    {project.category}
                                </span>
                            </div>

                            {/* View Project Button */}
                            <motion.div
                                className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500"
                            >
                                <Link href={`/projects/${project.id}`}>
                                    <motion.button
                                        className="bg-white/95 backdrop-blur-sm px-6 py-4 text-black font-light hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-3 group/btn"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Explore Project
                                        <ArrowUpRight size={18} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                    </motion.button>
                                </Link>
                            </motion.div>

                            {/* Project Number on Image */}
                            {/* <div className="absolute top-6 right-6">
                                <span className="text-6xl font-light text-white/20">
                                    {String(project.id).padStart(2, '0')}
                                </span>
                            </div> */}
                        </motion.div>

                        {/* Content Container - Separate from image */}
                        <motion.div
                            className="w-full lg:w-[35%] bg-white p-8 lg:p-12 flex flex-col justify-center"
                            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: index * 0.3 }}
                        >
                            {/* Title */}
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.4 }}
                                className="text-3xl lg:text-4xl font-normal text-black mb-8 leading-tight tracking-wide"
                            >
                                {project.title}
                            </motion.h3>

                            {/* Metadata */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: index * 0.5 }}
                                className="flex flex-wrap gap-6 mb-8 border-b border-gray-100 pb-8"
                            >
                                <div className="flex items-center gap-3 text-gray-600">
                                    <div className="p-2 bg-gray-100 rounded-sm">
                                        <Calendar size={18} className="text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-light text-gray-500 uppercase tracking-wider">Year</p>
                                        <p className="text-sm font-normal">{project.year}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <div className="p-2 bg-gray-100 rounded-sm">
                                        <Building size={18} className="text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-light text-gray-500 uppercase tracking-wider">Type</p>
                                        <p className="text-sm font-normal">{project.type}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <div className="p-2 bg-gray-100 rounded-sm">
                                        <MapPin size={18} className="text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-light text-gray-500 uppercase tracking-wider">Location</p>
                                        <p className="text-sm font-normal">{project.city}</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.6 }}
                                className="text-gray-600 leading-relaxed font-light tracking-wide mb-8 text-lg"
                            >
                                {project.content}
                            </motion.p>

                            {/* Project Features */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: index * 0.7 }}
                                className="space-y-4 mb-8"
                            >
                                <h4 className="text-sm font-light text-gray-500 uppercase tracking-wider">Key Features</h4>
                                <div className="space-y-3">
                                    {project.features.map((feature, featureIndex) => (
                                        <div key={featureIndex} className="flex items-center gap-4 text-gray-700 group/feature">
                                            <div className="w-2 h-2 bg-black rounded-full group-hover/feature:scale-150 transition-transform duration-300" />
                                            <span className="font-light group-hover/feature:text-black transition-colors duration-300">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Detailed View Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.8 }}
                            >
                                <Link href={`/projects/${project.id}`}>
                                    <motion.button
                                        className="w-full lg:w-auto px-8 py-4 border border-black text-black font-light hover:bg-black hover:text-white transition-all duration-300 group/btn flex items-center justify-center gap-3"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        View Case Study
                                        <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                                    </motion.button>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                        )
                    )
                })}
            </div>

            {/* View All Projects Button */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex justify-center mt-20 lg:mt-32 border-t border-gray-100 pt-16"
            >
                <Link href="/Projects">
                    <motion.button
                        className="px-16 py-5 border border-black text-black font-light hover:bg-black hover:text-white transition-all duration-300 group flex items-center gap-4 text-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Explore All Projects
                        <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </motion.button>
                </Link>
            </motion.div>
        </section>
    );
}