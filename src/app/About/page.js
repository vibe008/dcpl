"use client";

import ClientsSection from "@/<@>/Components/ClientsSection";
import EmpanelmentList from "@/<@>/Components/EmpanelmentList";
import Navbar from "@/<@>/Components/Navbar";
import { motion } from "framer-motion";
import Image from "next/image";

const awards = [
  {
    // img: "https://images.unsplash.com/photo-1595526114035-9eeb07a0e18e?q=80&w=2070&auto=format&fit=crop",
    img:"/assets/awards.jpg",
    text: "Our Director 'Ar. Mayank Garg' awarded with the Hon. Membership from Braj Kala Kendra – a body who works on the cultural aspects in Braj Region.",
  },
  {
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop",
    text: "Award given for Conserving Braj Culture & Historic Buildings in Braj Region.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const cardHoverVariants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div style={{width:"95%",margin:"auto"}}>
      <Navbar/>
      <div className="relative h-96 md:h-[500px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop"
          alt="Modern Architecture"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white text-center px-4"
          >
            About DCPL
          </motion.h1>
        </div>
      </div>

      <div className=" mx-auto px-6 py-16">
        {/* Company Intro */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="space-y-8">
            <p className="text-xl md:text-2xl leading-relaxed text-gray-700 max-w-4xl mx-auto">
              <span className="font-semibold text-gray-900">
                DCPL - Dera Consultants Private Limited
              </span>{" "}
              was founded by{" "}
              <span className="font-semibold text-gray-900">
                Ar. Mayank Garg
              </span>{" "}
              in 2011. Later in 2014, it was converted to Dera Consultants Private Limited.
            </p>
            
            <p className="text-xl md:text-2xl leading-relaxed text-gray-700 max-w-4xl mx-auto">
              DCPL currently has{" "}
              <span className="font-semibold text-gray-900">
                02 appointed Directors
              </span>{" "}
              — Mayank Garg & Anand Thakkar. Today, with 25 staff as an in-house team, we operate
              from four locations across India.
            </p>
          </motion.div>
        </motion.div>

        {/* DCPL Meaning */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-16"
        >
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
              What DCPL Means
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl font-bold text-blue-600 mb-2">D</div>
                <p className="text-lg font-medium text-gray-800">DERA</p>
                <p className="text-sm text-gray-600 mt-2">Design, Expression, Radical, Art-Deco</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl font-bold text-blue-600 mb-2">C</div>
                <p className="text-lg font-medium text-gray-800">Consultants</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl font-bold text-blue-600 mb-2">P</div>
                <p className="text-lg font-medium text-gray-800">Private</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl font-bold text-blue-600 mb-2">L</div>
                <p className="text-lg font-medium text-gray-800">Limited</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
              Our Mission
            </h2>
            <p className="text-xl leading-relaxed text-black">
              We are a multidisciplinary practice that provides professional services in
              Architectural Design, Interior Design, Engineering, Urban Planning, Project
              Management, and Construction Management. We believe design is problem-solving,
              aiming to find simple and elegant solutions to practical problems within the
              unique constraints of each project.
            </p>
          </motion.div>
        </motion.div>

        {/* Awards Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Awards & Recognition
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {awards.map((a, i) => (
              <motion.div
                key={i}
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={cardHoverVariants}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={a.img}
                    alt={`Award ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <p className="text-lg leading-relaxed text-gray-700">
                    {a.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
       <EmpanelmentList/>
       <ClientsSection/>
        {/* Stats Section */}
        {/* <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-blue-600 rounded-2xl p-8 md:p-12 text-white"
        >
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              Our Presence
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">4</div>
                <p className="text-lg">Office Locations</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">25+</div>
                <p className="text-lg">Team Members</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">2</div>
                <p className="text-lg">Directors</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">13+</div>
                <p className="text-lg">Years Experience</p>
              </div>
            </div>
          </motion.div>
        </motion.div> */}
      </div>
      </div>
    </div>
  );
}