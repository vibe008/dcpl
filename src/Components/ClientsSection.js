"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Building2, Crown, Award, Users } from "lucide-react";

const clients = [
    {
        id: 1,
        name: "MADHYA PRADESH HOUSING & INFRASTRUCTURE DEVELOPMENT BOARD",
        image: "/assets/clients/mphousing.jpg",
        type: "Government"
    },
    {
        id: 2,
        name: "NAGAR PARISHAD DHOLPUR",
        image: "/assets/clients/nparishadr.jpg",
        type: "Government"
    },
    {
        id: 3,
        name: "ARCHAEOLOGY AND MUSEUMS DEPARTMENT RAJASTHAN",
        image: "/assets/clients/aamdr.jpg",
        type: "Government"
    },
    {
        id: 4,
        name: "NATIONAL PROJECTS CONSTRUCTION CORPORATION LIMITED",
        image: "/assets/clients/npcc.gif",
        type: "Government"
    },
    {
        id: 5,
        name: 'AJMER DEVELOPMENT AUTHORITY',
        image: "/assets/clients/ada.jpg",
        type: "Development Authority"
    },
    {
        id: 6,
        name: 'URBAN IMPROVEMENT TRUST',
        image: "/assets/clients/uitb.jpg",
        type: "Government"
    },
    {
        id: 7,
        name: 'RAJASTHAN URBAN DRINKING WATER SEWERAGE & INFRASTRUCTURE CORPORATION',
        image: "/assets/clients/ada.jpg",
        type: "Government"
    },
    {
        id: 8,
        name: 'NATIONAL HIGH SPEED RAIL CORPORATION LIMITED',
        image: "/assets/clients/nhsrcl_logo.gif",
        type: "Government"
    },
    {
        id: 9,
        name: 'WESTERN RAILWAY VADODARA DIVISION',
        image: "/assets/clients/wrvd.jpg",
        type: "Government"
    },
    {
        id: 10,
        name: 'GUJARAT STATE ROAD TRANSPORT CORPORATION',
        image: "/assets/clients/gsrt.png",
        type: "Government"
    },
    {
        id: 11,
        name: 'UTTAR PRADESH TOURISM',
        image: "/assets/clients/upt.png",
        type: "Government"
    },
    {
        id: 12,
        name: 'U.P. BRAJ TEERTH VIKAS PARISHAD',
        image: "/assets/clients/upbtp.png",
        type: "Development Authority"
    },
    {
        id: 13,
        name: 'CONSTRUCTION & DESIGN SERVICES',
        image: "/assets/clients/cnds.png",
        type: "Private"
    },
    {
        id: 14,
        name: 'U P PROJECTS CORPORATION LTD',
        image: "/assets/clients/upcl.png",
        type: "Government"
    },
    {
        id: 15,
        name: 'UTTAR PRADESH STATE TOURISM DEVELOPMENT CORPORATION LTD.',
        image: "/assets/clients/upst.gif",
        type: "Government"
    },
    {
        id: 16,
        name: 'UTTAR PRADESH RAJKIYA NIRMAN NIGAM LTD.',
        image: "/assets/clients/uprnnpng",
        type: "Government"
    },
    {
        id: 17,
        name: 'MATHURA VRINDAVAN DEVELOPMENT AUTHORITY',
        image: "/assets/clients/mvda.png",
        type: "Development Authority"
    },
    {
        id: 18,
        name: 'PUBLIC WORKS DEPARTMENT',
        image: "/assets/clients/pwd.jpg",
        type: "Government"
    },
    {
        id: 19,
        name: 'NAGAR NIGAM MATHURA VRINDAVAN',
        image: "/assets/clients/nnmv.png",
        type: "Government"
    },
    {
        id: 20,
        name: '32BN ITBP KANPUR',
        image: "/assets/clients/32bnitbpk.jpg",
        type: "Government"
    },
    {
        id: 21,
        name: 'PRAYAGRAJ DEVELOPMENT AUTHORITY',
        image: "/assets/clients/pda.jpg",
        type: "Development Authority"
    },
    {
        id: 22,
        name: 'URBAN IMPROVEMENT TRUST BHILWARA',
        image: "/assets/clients/uit.jpg",
        type: "Government"
    },
    {
        id: 23,
        name: 'NAGAR PARISHAD BHILWARA',
        image: "/assets/clients/ada.png",
        type: "Government"
    },
    {
        id: 24,
        name: 'CREATIVE GROUP LLP',
        image: "/assets/clients/cgllp.png",
        type: "Private"
    },
    {
        id: 25,
        name: 'KRISHNA BHUMI- INFINITY GROUP',
        image: "/assets/clients/kbig.png",
        type: "Private"
    },
    {
        id: 26,
        name: 'DESIGN ASSOCIATES INC',
        image: "/assets/clients/dai.png",
        type: "Private"
    },
    {
        id: 27,
        name: 'J.K TRUST',
        image: "/assets/clients/jkt.png",
        type: "Private"
    },
    {
        id: 28,
        name: 'BASERA GROUP',
        image: "/assets/clients/bg.png",
        type: "Private"
    },
    {
        id: 29,
        name: 'SHRI GROUP MATHURA',
        image: "/assets/clients/sgm.png",
        type: "Private"
    },
    {
        id: 30,
        name: 'VASUDEV ELEMENTS VRINDAVAN',
        image: "/assets/clients/vev.png",
        type: "Private"
    },
    {
        id: 31,
        name: 'MADHAV AGRAWAL (TATA MOTORS)',
        image: "/assets/clients/tata.jpeg",
        type: "Corporate"
    },
];

function ClassicClientCard({ client, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ 
        duration: 1.2, 
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.6, ease: "easeOut" }
      }}
      className="group relative bg-cream-50 rounded-lg p-8 border border-gold-200 shadow-sm hover:shadow-xl transition-all duration-700 overflow-hidden"
    >
      {/* Elegant background pattern */}
      <div className="absolute inset-0 bg-pattern opacity-[0.03]"></div>
      
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Logo Container */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          className="mb-6 p-4 bg-white rounded-lg shadow-inner border border-gold-100"
        >
          <img
            src={client.image}
            alt={client.name}
            className="h-16 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-700"
            onError={(e) => {
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='80' viewBox='0 0 120 80'%3E%3Crect width='120' height='80' fill='%23f8f8f8' stroke='%23d4af37' stroke-width='0.5'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Georgia' font-size='8' fill='%23d4af37'%3E%3Ctspan x='50%25' dy='-0.6em'%3E" + client.type + "%3C/tspan%3E%3Ctspan x='50%25' dy='1.2em'%3ELOGO%3C/tspan%3E%3C/text%3E%3C/svg%3E";
            }}
          />
        </motion.div>

        {/* Client Name */}
        <motion.h3 
          className="text-lg font-serif text-gray-800 mb-2 leading-tight group-hover:text-gold-600 transition-colors duration-500"
          initial={false}
        >
          {client.name}
        </motion.h3>

        {/* Client Type */}
        <motion.span 
          className="text-xs text-gray-500 font-sans uppercase tracking-wider group-hover:text-gold-500 transition-colors duration-500"
          initial={false}
        >
          {client.type}
        </motion.span>
      </div>

      {/* Subtle hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
    </motion.div>
  );
}

function ElegantInfiniteScroll() {
  const [duplicatedClients] = useState([...clients, ...clients]);

  return (
    <div className="relative overflow-hidden py-12 bg-cream-100 border-y border-gold-200">
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-cream-100 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-cream-100 to-transparent z-10"></div>
      
      <motion.div
        className="flex space-x-16"
        animate={{
          x: [0, -2048],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 80,
            ease: "linear",
          },
        }}
      >
        {duplicatedClients.map((client, index) => (
          <div
            key={`scroll-${client.id}-${index}`}
            className="flex-shrink-0 flex items-center space-x-4 bg-white rounded-lg px-6 py-4 border border-gold-100 shadow-sm"
          >
            <div className="flex-shrink-0">
              <img
                src={client.image}
                alt={client.name}
                className="h-8 w-auto object-contain filter grayscale opacity-80"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='40' viewBox='0 0 80 40'%3E%3Crect width='80' height='40' fill='%23f8f8f8' stroke='%23d4af37' stroke-width='0.5'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Georgia' font-size='6' fill='%23d4af37'%3ELOGO%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
            <span className="text-sm text-gray-600 font-sans whitespace-nowrap">{client.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function ElegantStatCard({ icon: Icon, number, label, delay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 40 }}
      transition={{ duration: 1, delay, ease: "easeOut" }}
      className="text-center group"
    >
      <motion.div
        whileHover={{ scale: 1.05, rotate: -2 }}
        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white border border-gold-200 shadow-lg mb-6 group-hover:shadow-xl transition-all duration-500"
      >
        <Icon className="w-8 h-8 text-gold-600" />
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.8, delay: delay + 0.3, type: "spring" }}
        className="text-4xl font-serif text-gray-800 mb-3"
      >
        {number}
      </motion.div>
      <p className="text-gray-600 font-sans text-sm tracking-wide">{label}</p>
      
      {/* Decorative element */}
      <div className="w-12 h-0.5 bg-gold-400 mx-auto mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </motion.div>
  );
}

export default function ElegantClientsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-cream-50 relative overflow-hidden" ref={ref}>
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold-50 rounded-full -translate-x-32 -translate-y-32 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-50 rounded-full translate-x-48 translate-y-48 opacity-30"></div>
      
      {/* Ornamental borders */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>

      <div className="container mx-auto px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-flex items-center gap-4 text-gold-600 text-sm font-sans uppercase tracking-widest mb-8"
          >
            <div className="w-12 h-px bg-gold-400"></div>
            Trusted Partnerships
            <div className="w-12 h-px bg-gold-400"></div>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-serif text-gray-800 mb-8 tracking-tight">
            Our Esteemed <span className="text-gold-600">Clients</span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto font-sans leading-relaxed"
          >
            Building lasting relationships with distinguished organizations and institutions 
            across India, delivering architectural excellence through trusted collaboration.
          </motion.p>
        </motion.div>

        {/* Infinite Scroll Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mb-20"
        >
          <ElegantInfiniteScroll />
        </motion.div>

        {/* Main Clients Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20"
        >
          {clients.map((client, index) => (
            <ClassicClientCard key={client.id} client={client} index={index} />
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-20"
        >
          <ElegantStatCard 
            icon={Users} 
            number="31+" 
            label="Valued Clients" 
            delay={1.4}
          />
          <ElegantStatCard 
            icon={Building2} 
            number="15+" 
            label="Government Bodies" 
            delay={1.5}
          />
          <ElegantStatCard 
            icon={Award} 
            number="10+" 
            label="Private Corporations" 
            delay={1.6}
          />
          <ElegantStatCard 
            icon={Crown} 
            number="6+" 
            label="Development Authorities" 
            delay={1.7}
          />
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="text-center"
        >
          <div className="bg-white rounded-2xl p-16 border border-gold-200 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-serif text-gray-800 mb-6">
              Begin Your Architectural Journey
            </h3>
            <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-lg font-sans leading-relaxed">
              Join our family of distinguished clients and experience the perfect blend 
              of traditional craftsmanship and modern architectural innovation.
            </p>
            <motion.button
              whileHover={{ 
                scale: 1.02,
                backgroundColor: "#b8860b",
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-gold-600 text-white px-16 py-4 rounded-lg font-sans text-lg hover:shadow-2xl transition-all duration-500 border border-gold-500"
            >
              Start a Conversation
            </motion.button>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .bg-cream-50 { background-color: #fefefe; }
        .bg-cream-100 { background-color: #faf7f2; }
        .bg-gold-50 { background-color: #fffbf0; }
        .bg-gold-100 { background-color: #fef9e7; }
        .bg-gold-200 { background-color: #faf3dc; }
        .border-gold-100 { border-color: #faf3dc; }
        .border-gold-200 { border-color: #f5e8c8; }
        .border-gold-500 { border-color: #d4af37; }
        .text-gold-400 { color: #d4af37; }
        .text-gold-500 { color: #b8860b; }
        .text-gold-600 { color: #daa520; }
        .bg-gold-600 { background-color: #daa520; }
        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23d4af37' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
        }
      `}</style>
    </section>
  );
}