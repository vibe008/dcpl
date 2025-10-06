'use client';
import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Calendar, Shield, Clock, MapPin, Building2 } from "lucide-react";

const empanelments = [
  {
    name: "Mathura Vrindavan Development Authority, Mathura",
    category: "B",
    date: "02.02.2021",
    validity: "01.02.2024",
    logo: "/assets/Partners/mathura.png",
    location: "Uttar Pradesh",
    type: "Development Authority"
  },
  {
    name: "Agra Development Authority, Agra",
    category: "--",
    date: "02.12.2015",
    validity: "--",
    logo: "/assets/Partners/aagra.png",
    location: "Uttar Pradesh",
    type: "Development Authority"
  },
  {
    name: "Rajasthan Housing Board, Rajasthan",
    category: "C",
    date: "29.07.2020",
    validity: "28.07.2022",
    logo: "/assets/Partners/rajasthan.png",
    location: "Rajasthan",
    type: "Housing Board"
  },
  {
    name: "Public Works Department, Hamirpur, Himachal Pradesh",
    category: "--",
    date: "18.08.2020",
    validity: "31.08.2022",
    logo: "/assets/Partners/himachal.png",
    location: "Himachal Pradesh",
    type: "Government Department"
  },
  {
    name: "Central Mine Planning & Design Institute Limited, Ranchi",
    category: "Group II",
    date: "06.05.2021",
    validity: "05.05.2024",
    logo: "/assets/Partners/ranchi.png",
    location: "Jharkhand",
    type: "Central Government"
  },
  {
    name: "Department of Tourism, Govt. of Uttar Pradesh, Lucknow",
    category: "C",
    date: "10.06.2022",
    validity: "10.06.2024",
    logo: "/assets/Partners/lucknow.png",
    location: "Uttar Pradesh",
    type: "Tourism Department"
  },
  {
    name: "Uttar Pradesh Rajya Nirman Sahkari Sangh",
    category: "--",
    date: "05.02.2022",
    validity: "04.02.2024",
    logo: "/assets/Partners/up.jpeg",
    location: "Uttar Pradesh",
    type: "Cooperative Society"
  },
  {
    name: "Madhya Pradesh Public Works Department",
    category: "--",
    date: "18.05.2022",
    validity: "17.05.2027",
    logo: "/assets/Partners/mp.png",
    location: "Madhya Pradesh",
    type: "Government Department"
  },
  {
    name: "Hindustan Shipyard Limited, Vishakapatnam",
    category: "---",
    date: "10.01.2023",
    validity: "09.01.2025",
    logo: "/assets/Partners/vishakhapatnnam.jpeg",
    location: "Andhra Pradesh",
    type: "Defense PSU"
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

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 80,
    rotateX: 15
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
      duration: 1.2
    }
  }
};

const hoverVariants = {
  rest: { 
    scale: 1,
    y: 0,
    rotateZ: 0,
    boxShadow: "0 4px 20px -4px rgba(0, 0, 0, 0.08)"
  },
  hover: { 
    scale: 1.02,
    y: -12,
    rotateZ: -0.5,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  }
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: { 
    scale: 1, 
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15
    }
  }
};

export default function EnhancedEmpanelmentList() {
  const getStatus = (validity) => {
    if (validity === '--') return { status: 'Not Specified', color: 'bg-gray-400' };
    
    const validUntil = new Date(validity.split('.').reverse().join('-'));
    const today = new Date();
    const monthsUntilExpiry = (validUntil - today) / (1000 * 60 * 60 * 24 * 30);
    
    if (monthsUntilExpiry < 0) return { status: 'Expired', color: 'bg-red-500' };
    if (monthsUntilExpiry < 6) return { status: 'Expiring Soon', color: 'bg-amber-500' };
    return { status: 'Active', color: 'bg-emerald-500' };
  };

  return (
    <div className=" py-24  relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/10 rounded-full -translate-x-36 -translate-y-36"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-200/10 rounded-full translate-x-48 translate-y-48"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-200/5 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-4 text-slate-600 text-sm font-medium uppercase tracking-widest mb-8"
          >
            <div className="w-12 h-px bg-slate-400"></div>
            <Award className="w-5 h-5" />
            Government Empanelments
            <div className="w-12 h-px bg-slate-400"></div>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-800 mb-6 tracking-tight">
            Official <span className="font-semibold text-blue-600">Accreditations</span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Recognized and empaneled by prestigious government authorities and development bodies 
            across multiple states in India
          </motion.p>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 mt-12"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{empanelments.length}+</div>
              <div className="text-sm text-slate-500 uppercase tracking-wide">Empanelments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">8+</div>
              <div className="text-sm text-slate-500 uppercase tracking-wide">States</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">6+</div>
              <div className="text-sm text-slate-500 uppercase tracking-wide">Years</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Empanelment Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {empanelments.map((item, index) => {
            const status = getStatus(item.validity);
            
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-8 hover:border-blue-300/50 transition-all duration-500 flex flex-col h-full overflow-hidden"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Status Ribbon */}
                <motion.div 
                  className={`absolute top-0 right-0 ${status.color} text-white px-3 py-1 text-xs font-medium rounded-bl-lg rounded-tr-2xl`}
                  initial={{ x: 20, y: -20 }}
                  whileInView={{ x: 0, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {status.status}
                </motion.div>

                {/* Logo Container */}
                <motion.div 
                  className="flex justify-center mb-6 relative z-10"
                  variants={iconVariants}
                >
                  <div className="w-24 h-24 relative bg-white rounded-2xl p-4 border border-slate-200 shadow-sm group-hover:shadow-md transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Image
                      src={item.logo}
                      alt={item.name}
                      fill
                      className="object-contain p-3"
                    />
                  </div>
                </motion.div>

                {/* Content */}
                <div className="flex-1 flex flex-col relative z-10">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center leading-tight group-hover:text-blue-700 transition-colors duration-300">
                    {item.name}
                  </h3>
                  
                  {/* Type and Location */}
                  <div className="flex items-center justify-center gap-4 mb-6 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      {item.type}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {item.location}
                    </div>
                  </div>
                  
                  <div className="mt-auto space-y-3 bg-slate-50/50 rounded-xl p-4 border border-slate-100">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Shield className="w-4 h-4" />
                        Category:
                      </div>
                      <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {item.category}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="w-4 h-4" />
                        Empanelment:
                      </div>
                      <span className="text-sm font-medium text-slate-800">{item.date}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock className="w-4 h-4" />
                        Valid Until:
                      </div>
                      <span className={`text-sm font-medium ${
                        item.validity === '--' ? 'text-slate-500' : 
                        status.status === 'Active' ? 'text-emerald-600' :
                        status.status === 'Expiring Soon' ? 'text-amber-600' : 'text-red-600'
                      }`}>
                        {item.validity}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200/50 transition-all duration-500 pointer-events-none"></div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Enhanced Footer */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          {/* <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 border border-slate-200/60 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-light text-slate-800 mb-4">
              Building Trust Through Official Recognition
            </h3>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Our empanelments with government authorities reflect our commitment to quality, 
              compliance, and excellence in architectural services across diverse sectors and regions.
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-slate-800 text-white px-8 py-4 rounded-xl font-medium hover:bg-slate-900 transition-all duration-300 cursor-pointer"
            >
              <Shield className="w-5 h-5" />
              View Accreditation Documents
            </motion.div>
          </div> */}
        </motion.div>
      </div>
    </div>
  );
}