"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useRef } from "react";
import { Building, Lightbulb, Ruler, Palette, X, ArrowRight, Send, MapPin, Clock, Award, Users, Sparkles } from "lucide-react";
import Nav from "@/<@>/Components/ui/Nav";
import Navbar from "@/<@>/Components/Navbar";

export default function page() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [activeCategory, setActiveCategory] = useState("all");
    const formRef = useRef(null);

    const jobCategories = ["all", "design", "technology", "management", "consulting"];

    const jobs = [
        { id: 1, title: "Senior Architect", location: "Bhopal, MP", type: "Full-time", category: "design", level: "Senior" },
        { id: 2, title: "3D Visualizer", location: "Remote", type: "Contract", category: "technology", level: "Mid-level" },
        { id: 3, title: "Interior Designer", location: "Bhopal, MP", type: "Full-time", category: "design", level: "Mid-level" },
        { id: 4, title: "Project Manager", location: "Indore, MP", type: "Full-time", category: "management", level: "Senior" },
        { id: 5, title: "Landscape Architect", location: "Bhopal, MP", type: "Full-time", category: "design", level: "Junior" },
        { id: 6, title: "BIM Specialist", location: "Remote", type: "Part-time", category: "technology", level: "Mid-level" },
        { id: 7, title: "Urban Planner", location: "Bhopal, MP", type: "Full-time", category: "consulting", level: "Senior" },
        { id: 8, title: "Architectural Drafter", location: "Indore, MP", type: "Full-time", category: "design", level: "Junior" },
    ];

    const perks = [
        { id: 1, icon: <Sparkles className="w-6 h-6" />, text: "Iconic Projects", description: "Work on landmark designs that shape city skylines" },
        { id: 2, icon: <Award className="w-6 h-6" />, text: "Award-Winning Team", description: "Join a recognized leader in architecture and design" },
        { id: 3, icon: <Ruler className="w-6 h-6" />, text: "Cutting-Edge Tools", description: "Access to latest technology and software" },
        { id: 4, icon: <Users className="w-6 h-6" />, text: "Collaborative Culture", description: "Thrive in an environment that values innovation" },
    ];

    const filteredJobs = activeCategory === "all" 
        ? jobs 
        : jobs.filter(job => job.category === activeCategory);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file.name);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Form submission logic here
        setModalOpen(false);
        setSelectedFile(null);
        if (formRef.current) {
            formRef.current.reset();
        }
    };

    return (
        <>
        <Navbar />
        <div className="min-h-screen bg-white text-gray-900">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden w-[95%] m-auto">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>
                    <div style={{backgroundImage: "url('/assets/career.jpg')"}} className="h-full w-full bg-cover bg-center"></div>
                </div>
                
                <motion.div 
                    className="text-center z-10 px-4 max-w-4xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h1 
                        className="text-5xl md:text-7xl font-bold mb-6 text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Design Your Career
                    </motion.h1>
                    <motion.p 
                        className="text-xl md:text-2xl mb-10 text-gray-200 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Join our team of visionaries shaping the future of architecture and design.
                    </motion.p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            document.getElementById("open-positions").scrollIntoView({ behavior: "smooth" });
                        }}
                        className="bg-white text-black px-8 py-4 rounded-full font-medium shadow-lg flex items-center justify-center mx-auto gap-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        View Open Positions <ArrowRight className="w-5 h-5" />
                    </motion.button>
                </motion.div>

                <motion.div 
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                >
                    <div className="animate-bounce flex flex-col items-center">
                        <span className="text-white text-sm mb-2">Scroll to explore</span>
                        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Open Positions */}
            <section id="open-positions" className="py-20 px-4 max-w-6xl mx-auto">
                <motion.h2 
                    className="text-3xl md:text-4xl font-bold mb-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Open Positions
                </motion.h2>
                <motion.p 
                    className="text-gray-600 mb-12 text-center max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Explore opportunities to join our award-winning team of architects and designers.
                </motion.p>

                {/* Category Filters */}
                <motion.div 
                    className="flex flex-wrap justify-center gap-3 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    {jobCategories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category ? 'bg-black text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </motion.div>

                {/* Jobs Grid */}
                <motion.div 
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {filteredJobs.map((job, i) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="p-6 border border-gray-200 rounded-xl bg-white hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden"
                        >
                            {/* <div className="absolute top-0 left-0 w-full h-1 bg-black"></div> */}
                            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                {job.level}
                            </span>
                            <h3 className="text-xl font-bold mt-4 mb-3 group-hover:text-gray-700 transition-colors">{job.title}</h3>
                            
                            <div className="flex items-center gap-3 text-gray-600 mb-4">
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm">{job.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-sm">{job.type}</span>
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-center mt-6">
                                <span className="text-xs font-medium px-3 py-1 bg-gray-100 rounded-full">
                                    {job.category}
                                </span>
                                <Link
                                    href={`/careers/${job.id}`}
                                    className="inline-flex items-center text-black font-medium group-hover:underline"
                                >
                                    Details <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Perks Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.h2 
                        className="text-3xl md:text-4xl font-bold mb-4 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Why Join Our Team
                    </motion.h2>
                    <motion.p 
                        className="text-gray-600 mb-16 text-center max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        We believe in creating an environment where creativity and innovation thrive.
                    </motion.p>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {perks.map((perk, i) => (
                            <motion.div
                                key={perk.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="p-6 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-all flex flex-col items-center text-center"
                            >
                                <div className="mb-5 p-3 bg-black rounded-full text-white">{perk.icon}</div>
                                <h3 className="text-lg font-semibold mb-2">{perk.text}</h3>
                                <p className="text-gray-600 text-sm">{perk.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center bg-black text-white rounded-2xl p-12"
                >
                    <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                        Ready to Design the Future With Us?
                    </h3>
                    <p className="mb-8 max-w-2xl mx-auto text-gray-300">
                        Even if you don't see the perfect role, we're always interested in connecting with talented individuals.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "#333" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setModalOpen(true)}
                        className="bg-white text-black px-8 py-4 rounded-full font-medium flex items-center justify-center mx-auto gap-2"
                    >
                        Submit Your Portfolio <Send className="w-5 h-5" />
                    </motion.button>
                </motion.div>
            </section>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                        onClick={() => setModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3, type: "spring", damping: 25 }}
                            className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                className="absolute top-6 right-6 text-gray-500 hover:text-black transition-colors"
                                onClick={() => setModalOpen(false)}
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <h2 className="text-2xl font-bold mb-6">Submit Your Portfolio</h2>
                            <form ref={formRef} className="flex flex-col gap-5" onSubmit={handleSubmit}>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <textarea
                                        placeholder="Tell us about yourself and your design philosophy..."
                                        className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                        rows="3"
                                        required
                                    ></textarea>
                                </div>
                                <div className="relative">
                                    <input
                                        type="file"
                                        id="portfolio-file"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        accept=".pdf,.doc,.docx,.jpg,.png"
                                        required
                                    />
                                    <label 
                                        htmlFor="portfolio-file" 
                                        className="block w-full border border-gray-300 p-4 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors text-gray-500"
                                    >
                                        {selectedFile ? selectedFile : "Upload your portfolio (PDF, DOC, images)"}
                                    </label>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="bg-black text-white py-4 rounded-xl font-semibold mt-2 flex items-center justify-center gap-2"
                                >
                                    Submit Portfolio <Send className="w-5 h-5" />
                                </motion.button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
        </>
    );
}