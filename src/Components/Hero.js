"use client";
import { motion } from "framer-motion";
const heroImage = "assets/hero-architecture.jpg"
export default function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <motion.img
                src="/assets/hero-architecture.jpg"
                alt="Modern House"
                className="fixed inset-0 w-full h-full object-cover z-0"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
            />

            {/* Large WOODLAND text */}
            <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 0.3, y: 0 }}
                transition={{ duration: 1.5 }}
                className="text-[15vw] font-bold text-white uppercase tracking-wide relative z-10"
            >
                Woodland
            </motion.h1>

            {/* Overlay for dark contrast */}
            <div className="absolute inset-0 bg-black/20" />
        </section>
    );
}
