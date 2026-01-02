'use client';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, MapPin, Calendar, Users, Award, Target, Eye, Lightbulb, ChevronRight, ChevronLeft, BookOpen, Compass, Layers, Palette, Building, Globe, Leaf, Sparkles, TargetIcon, Zap, Shield, Clock, Star, Briefcase, Building2, Landmark, Factory } from 'lucide-react';

function Page() {
  const containerRef = useRef(null);
  const aboutContentRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "AR. MAYANK GARG",
      role: "Founding Managing Director / Chief Architect",
      image: "../assets/mayankGarg.jpg",
      description: "B.ARCH / M.PLAN",
      email: "mayank@archstudio.com",
      social: { linkedin: "#", email: "mailto:mayank@archstudio.com" },
      leader: true,
      expertise: "Urban Planning & Sustainable Design"
    },
    {
      id: 2,
      name: "AR. ANAND THAKKAR",
      role: "DIRECTOR/ HEAD PLANNING CELL",
      image: "../assets/anand.jpg",
      description: "B.ARCH + M.PLAN",
      email: "anand@archstudio.com",
      social: { linkedin: "#", email: "mailto:anand@archstudio.com" },
      leader: true,
      expertise: "Master Planning & Infrastructure"
    },
    {
      id: 3,
      name: "ARUN KUMAR SINGH",
      role: "SENIOR ESTIMATOR CUM ENGINEER",
      image: "../assets/arun.jpg",
      description: "DIPLOMA IN ARCHITECTURE",
      email: "arun@archstudio.com",
      social: { linkedin: "#", email: "mailto:arun@archstudio.com" },
      leader: false,
      expertise: "Cost Estimation & Project Engineering"
    },
    {
      id: 4,
      name: "MUKESH KUMAR CHAUHAN",
      role: "3D VISUALIZER",
      image: "../assets/mukesh.jpg",
      description: "B.TECH CIVIL",
      email: "mukesh@archstudio.com",
      social: { linkedin: "#", email: "mailto:mukesh@archstudio.com" },
      leader: false,
      expertise: "3D Visualization & Rendering"
    },
    {
      id: 5,
      name: "DEENDAYAL",
      role: "MANAGER",
      image: "../assets/deendayal.jpg",
      description: "B.A + DIPLOMA IN CIVIL",
      email: "deendayal@archstudio.com",
      social: { linkedin: "#", email: "mailto:deendayal@archstudio.com" },
      leader: false,
      expertise: "Project Management & Coordination"
    },
    {
      id: 6,
      name: "AJAY SINGH RAJAWAT",
      role: "ARCHITECT",
      image: "../assets/ajay.jpg",
      description: "B.ARCH",
      email: "ajay@archstudio.com",
      social: { linkedin: "#", email: "mailto:ajay@archstudio.com" },
      leader: false,
      expertise: "Architectural Design & Detailing"
    },
    {
      id: 7,
      name: "SHIVAM BHATNAGAR",
      role: "ARCHITECT",
      image: "../assets/shivam.jpg",
      description: "B.ARCH",
      email: "shivam@archstudio.com",
      social: { linkedin: "#", email: "mailto:shivam@archstudio.com" },
      leader: false,
      expertise: "Contemporary Architecture"
    },
    {
      id: 8,
      name: "DEEPAK SHARMA",
      role: "SENIOR PROJECT ASSISTANT",
      image: "../assets/deepak.jpg",
      description: "B.TECH CIVIL",
      email: "deepak@archstudio.com",
      social: { linkedin: "#", email: "mailto:deepak@archstudio.com" },
      leader: false,
      expertise: "Civil Engineering & Site Supervision"
    },
    {
      id: 9,
      name: "LALU PRASAD YADAV",
      role: "ARCHITECT",
      image: "../assets/lalu.jpg",
      description: "B.ARCH",
      email: "lalu@archstudio.com",
      social: { linkedin: "#", email: "mailto:lalu@archstudio.com" },
      leader: false,
      expertise: "Residential Architecture"
    },
    {
      id: 10,
      name: "KALYANI GANDHI",
      role: "ARCHITECT",
      image: "../assets/kalyani.jpg",
      description: "B.ARCH",
      email: "kalyani@archstudio.com",
      social: { linkedin: "#", email: "mailto:kalyani@archstudio.com" },
      leader: false,
      expertise: "Interior Design & Space Planning"
    },
    {
      id: 11,
      name: "MADHAV CHATURVEDI",
      role: "BD MANAGER",
      image: "../assets/madhav.jpg",
      description: "B.COM + M.B.A",
      email: "madhav@archstudio.com",
      social: { linkedin: "#", email: "mailto:madhav@archstudio.com" },
      leader: false,
      expertise: "Business Development & Client Relations"
    },
    {
      id: 12,
      name: "RAJENDRA KUMAR PAL",
      role: "MEP ENGINEER",
      image: "../assets/rajendra.png",
      description: "B.TECH CIVIL",
      email: "rajendra@archstudio.com",
      social: { linkedin: "#", email: "mailto:rajendra@archstudio.com" },
      leader: false,
      expertise: "MEP Systems & Engineering"
    }
  ];

  const leftImageY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rightContentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 0, 0, 1]);

  const [hoveredMember, setHoveredMember] = useState(null);
  const [activeClientIndex, setActiveClientIndex] = useState(0);
  const [activeEmpanelmentIndex, setActiveEmpanelmentIndex] = useState(0);
  const [teamSliderIndex, setTeamSliderIndex] = useState(0);
  const [autoRotateTeam, setAutoRotateTeam] = useState(true);
  const [slidesPerView, setSlidesPerView] = useState(4);

  // Brand colors
  const primaryColor = '#6455D2';
  const secondaryColor = '#51B873';

  // Empanelments data
  const empanelments = [
    {
      name: "Mathura Vrindavan Development Authority, Mathura",
      category: "B",
      date: "02.02.2021",
      validity: "01.02.2024",
      logo: "/assets/Partners/mathura.png",
      location: "Uttar Pradesh",
      type: "Development Authority",
      icon: Landmark
    },
    {
      name: "Agra Development Authority, Agra",
      category: "--",
      date: "02.12.2015",
      validity: "--",
      logo: "/assets/Partners/aagra.png",
      location: "Uttar Pradesh",
      type: "Development Authority",
      icon: Landmark
    },
    {
      name: "Rajasthan Housing Board, Rajasthan",
      category: "C",
      date: "29.07.2020",
      validity: "28.07.2022",
      logo: "/assets/Partners/rajasthan.png",
      location: "Rajasthan",
      type: "Housing Board",
      icon: Building2
    },
    {
      name: "Public Works Department, Hamirpur, Himachal Pradesh",
      category: "--",
      date: "18.08.2020",
      validity: "31.08.2022",
      logo: "/assets/Partners/himachal.png",
      location: "Himachal Pradesh",
      type: "Government Department",
      icon: Briefcase
    },
    {
      name: "Central Mine Planning & Design Institute Limited, Ranchi",
      category: "Group II",
      date: "06.05.2021",
      validity: "05.05.2024",
      logo: "/assets/Partners/ranchi.png",
      location: "Jharkhand",
      type: "Central Government",
      icon: Factory
    },
    {
      name: "Department of Tourism, Govt. of Uttar Pradesh, Lucknow",
      category: "C",
      date: "10.06.2022",
      validity: "10.06.2024",
      logo: "/assets/Partners/lucknow.png",
      location: "Uttar Pradesh",
      type: "Tourism Department",
      icon: Globe
    },
    {
      name: "Uttar Pradesh Rajya Nirman Sahkari Sangh",
      category: "--",
      date: "05.02.2022",
      validity: "04.02.2024",
      logo: "/assets/Partners/up.jpeg",
      location: "Uttar Pradesh",
      type: "Cooperative Society",
      icon: Users
    },
    {
      name: "Madhya Pradesh Public Works Department",
      category: "--",
      date: "18.05.2022",
      validity: "17.05.2027",
      logo: "/assets/Partners/mp.png",
      location: "Madhya Pradesh",
      type: "Government Department",
      icon: Briefcase
    },
    {
      name: "Hindustan Shipyard Limited, Vishakapatnam",
      category: "---",
      date: "10.01.2023",
      validity: "09.01.2025",
      logo: "/assets/Partners/vishakhapatnnam.jpeg",
      location: "Andhra Pradesh",
      type: "Defense PSU",
      icon: Factory
    },
  ];

  // Clients data - Featured (for slider)
  const featuredClients = [
    { id: 1, name: "MADHYA PRADESH HOUSING & INFRASTRUCTURE DEVELOPMENT BOARD", image: "/assets/clients/mphousing.jpg", type: "Government" },
    { id: 4, name: "NATIONAL PROJECTS CONSTRUCTION CORPORATION LIMITED", image: "/assets/clients/npcc.gif", type: "Government" },
    { id: 8, name: 'NATIONAL HIGH SPEED RAIL CORPORATION LIMITED', image: "/assets/clients/nhsrcl_logo.gif", type: "Government" },
    { id: 11, name: 'UTTAR PRADESH TOURISM', image: "/assets/clients/upt.png", type: "Government" },
    { id: 17, name: 'MATHURA VRINDAVAN DEVELOPMENT AUTHORITY', image: "/assets/clients/mvda.png", type: "Development Authority" },
    { id: 31, name: 'MADHAV AGRAWAL (TATA MOTORS)', image: "/assets/clients/tata.jpeg", type: "Corporate" },
  ];

  // All clients (for grid)
  const allClients = [
    { id: 1, name: "MADHYA PRADESH HOUSING & INFRASTRUCTURE DEVELOPMENT BOARD", image: "/assets/clients/mphousing.jpg", type: "Government" },
    { id: 2, name: "NAGAR PARISHAD DHOLPUR", image: "/assets/clients/nparishadr.jpg", type: "Government" },
    { id: 3, name: "ARCHAEOLOGY AND MUSEUMS DEPARTMENT RAJASTHAN", image: "/assets/clients/aamdr.jpg", type: "Government" },
    { id: 4, name: "NATIONAL PROJECTS CONSTRUCTION CORPORATION LIMITED", image: "/assets/clients/npcc.gif", type: "Government" },
    { id: 5, name: 'AJMER DEVELOPMENT AUTHORITY', image: "/assets/clients/ada.jpg", type: "Development Authority" },
    { id: 6, name: 'URBAN IMPROVEMENT TRUST', image: "/assets/clients/uitb.jpg", type: "Government" },
    { id: 7, name: 'RAJASTHAN URBAN DRINKING WATER SEWERAGE & INFRASTRUCTURE CORPORATION', image: "/assets/clients/ada.jpg", type: "Government" },
    { id: 8, name: 'NATIONAL HIGH SPEED RAIL CORPORATION LIMITED', image: "/assets/clients/nhsrcl_logo.gif", type: "Government" },
    { id: 9, name: 'WESTERN RAILWAY VADODARA DIVISION', image: "/assets/clients/wrvd.jpg", type: "Government" },
    { id: 10, name: 'GUJARAT STATE ROAD TRANSPORT CORPORATION', image: "/assets/clients/gsrt.png", type: "Government" },
    { id: 11, name: 'UTTAR PRADESH TOURISM', image: "/assets/clients/upt.png", type: "Government" },
    { id: 12, name: 'U.P. BRAJ TEERTH VIKAS PARISHAD', image: "/assets/clients/upbtp.png", type: "Development Authority" },
    { id: 13, name: 'CONSTRUCTION & DESIGN SERVICES', image: "/assets/clients/cnds.png", type: "Private" },
    { id: 14, name: 'U P PROJECTS CORPORATION LTD', image: "/assets/clients/upcl.png", type: "Government" },
    { id: 15, name: 'UTTAR PRADESH STATE TOURISM DEVELOPMENT CORPORATION LTD.', image: "/assets/clients/upst.gif", type: "Government" },
    { id: 16, name: 'UTTAR PRADESH RAJKIYA NIRMAN NIGAM LTD.', image: "/assets/clients/uprnnpng", type: "Government" },
    { id: 17, name: 'MATHURA VRINDAVAN DEVELOPMENT AUTHORITY', image: "/assets/clients/mvda.png", type: "Development Authority" },
    { id: 18, name: 'PUBLIC WORKS DEPARTMENT', image: "/assets/clients/pwd.jpg", type: "Government" },
    { id: 19, name: 'NAGAR NIGAM MATHURA VRINDAVAN', image: "/assets/clients/nnmv.png", type: "Government" },
    { id: 20, name: '32BN ITBP KANPUR', image: "/assets/clients/32bnitbpk.jpg", type: "Government" },
    { id: 21, name: 'PRAYAGRAJ DEVELOPMENT AUTHORITY', image: "/assets/clients/pda.jpg", type: "Development Authority" },
    { id: 22, name: 'URBAN IMPROVEMENT TRUST BHILWARA', image: "/assets/clients/uit.jpg", type: "Government" },
    { id: 23, name: 'NAGAR PARISHAD BHILWARA', image: "/assets/clients/ada.png", type: "Government" },
    { id: 24, name: 'CREATIVE GROUP LLP', image: "/assets/clients/cgllp.png", type: "Private" },
    { id: 25, name: 'KRISHNA BHUMI- INFINITY GROUP', image: "/assets/clients/kbig.png", type: "Private" },
    { id: 26, name: 'DESIGN ASSOCIATES INC', image: "/assets/clients/dai.png", type: "Private" },
    { id: 27, name: 'J.K TRUST', image: "/assets/clients/jkt.png", type: "Private" },
    { id: 28, name: 'BASERA GROUP', image: "/assets/clients/bg.png", type: "Private" },
    { id: 29, name: 'SHRI GROUP MATHURA', image: "/assets/clients/sgm.png", type: "Private" },
    { id: 30, name: 'VASUDEV ELEMENTS VRINDAVAN', image: "/assets/clients/vev.png", type: "Private" },
    { id: 31, name: 'MADHAV AGRAWAL (TATA MOTORS)', image: "/assets/clients/tata.jpeg", type: "Corporate" },
  ];

  // Core values
  const coreValues = [
    { icon: Sparkles, title: "Sustainability", description: "Creating environmentally responsible designs that stand the test of time" },
    { icon: TargetIcon, title: "Accessibility", description: "Designing inclusive spaces that serve all users with dignity and ease" },
    { icon: Shield, title: "Economic Efficiency", description: "Delivering optimal value through smart design and resource management" }
  ];

  // Company stats
  const companyStats = [
    { label: "Years of Excellence", value: "25+", icon: Calendar },
    { label: "Projects Completed", value: "500+", icon: Award },
    { label: "Team Members", value: "50+", icon: Users },
    { label: "Client Satisfaction", value: "98%", icon: Target },
  ];

  // Expert team members for slider (non-leaders)
  const expertTeamMembers = teamMembers.filter(member => !member.leader);

  // Responsive slides per view
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2);
      } else if (window.innerWidth < 1280) {
        setSlidesPerView(3);
      } else {
        setSlidesPerView(4);
      }
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  // Auto rotate functions
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoRotateTeam) {
        setTeamSliderIndex((prev) => (prev + 1) % Math.ceil(expertTeamMembers.length / slidesPerView));
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [autoRotateTeam, slidesPerView]);

  const nextSlide = () => {
    setTeamSliderIndex((prev) => (prev + 1) % Math.ceil(expertTeamMembers.length / slidesPerView));
  };

  const prevSlide = () => {
    setTeamSliderIndex((prev) => (prev - 1 + Math.ceil(expertTeamMembers.length / slidesPerView)) % Math.ceil(expertTeamMembers.length / slidesPerView));
  };

  return (
    <div className="bg-white">
      <div ref={containerRef} className="bg-white">
        {/* Enhanced Hero Section - Responsive */}
        <div className='w-full flex flex-col lg:flex-row h-auto lg:h-[300vh] justify-between relative overflow-hidden bg-gradient-to-br from-[#6455D2]/5 via-white to-[#51B873]/5'>
          {/* Animated Background */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-1/4 left-1/4 w-32 md:w-64 h-32 md:h-64 rounded-full bg-gradient-to-r from-[#6455D2]/10 to-[#51B873]/10 blur-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-48 md:w-96 h-48 md:h-96 rounded-full bg-gradient-to-r from-[#51B873]/10 to-[#6455D2]/10 blur-3xl"
              animate={{ scale: [1.2, 1, 1.2] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
          </div>

          {/* Left Image Section - Mobile: Full width, Desktop: Half width */}
          <div className='w-full lg:w-1/2 h-96 md:h-screen lg:h-full lg:sticky lg:top-0 z-10 order-1 lg:order-1'>
            <motion.div
              style={{ y: leftImageY }}
              className='h-full w-full relative overflow-hidden group'
            >
              <motion.img
                src='https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                className='h-full w-full object-cover group-hover:scale-110 transition-transform duration-[10000ms]'
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <div className='absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent' />
              <div className='absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent' />
              
              <motion.div
                className="absolute inset-0 border-[8px] md:border-[12px] border-white/10"
                animate={{ borderColor: ['rgba(255,255,255,0.1)', 'rgba(100,85,210,0.3)', 'rgba(255,255,255,0.1)'] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>
          </div>

          {/* Right Content Section - Mobile: Full width, Desktop: 45% width */}
          <motion.div
            style={{ y: rightContentY }}
            className='w-full lg:w-[45%] mx-auto h-auto lg:h-full flex flex-col justify-center py-0 relative z-20 order-2 lg:order-2'
          >
            <div ref={aboutContentRef} className='w-full px-4 sm:px-6 md:px-8 lg:w-[80%] mx-auto py-8 md:py-16 lg:py-32'>
              <motion.div
                className='space-y-6 md:space-y-8 lg:space-y-12'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Logo and Title */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-6 md:mb-8 lg:mb-12"
                >
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 mb-6 md:mb-8">
                    <motion.div
                      className="relative"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#6455D2] to-[#51B873] flex items-center justify-center shadow-2xl">
                        <span className="text-white text-xl md:text-2xl font-bold tracking-wider">DCPL</span>
                      </div>
                      <motion.div
                        className="absolute -inset-3 md:-inset-4 rounded-2xl border-2 border-[#6455D2]/30"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>
                    <div className="text-center sm:text-left">
                      <div className="h-1 w-16 md:w-24 bg-gradient-to-r from-[#6455D2] to-[#51B873] mb-2 md:mb-3 mx-auto sm:mx-0" />
                      <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900'>
                        Dera Consultants
                      </h1>
                      <p className='text-base md:text-lg lg:text-xl text-gray-600 mt-1 md:mt-2 font-light'>
                        Private Limited
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* About DCPL Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className='space-y-4 md:space-y-6 lg:space-y-8'
                >
                  <div className="space-y-3 md:space-y-4 lg:space-y-6">
                    <p className='text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed'>
                      <span className="font-semibold text-[#6455D2]">Dera Consultants Private Limited (DCPL)</span> is a multidisciplinary design and planning practice committed to creating environments that are purposeful, contextual, and future-ready.
                    </p>
                    
                    <div className="bg-gradient-to-r from-[#6455D2]/5 to-[#51B873]/5 p-4 md:p-6 rounded-2xl border-l-4 border-[#6455D2]">
                      <p className='text-gray-700 leading-relaxed italic text-sm md:text-base'>
                        Our approach is guided by three core principles: <span className="font-semibold text-[#6455D2]">sustainability</span>, <span className="font-semibold text-[#51B873]">accessibility</span>, and <span className="font-semibold text-gray-700">economic efficiency</span>.
                      </p>
                    </div>

                    <p className='text-gray-700 leading-relaxed text-sm md:text-base'>
                      While we value innovation, we also celebrate the creative spark that brings character and delight into each space. Context—whether cultural, environmental, or social—remains central to our work.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-4 md:mt-6">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#6455D2]" />
                        <span className="text-gray-700 font-medium text-sm md:text-base">Modern Digital Technologies</span>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#51B873]" />
                        <span className="text-gray-700 font-medium text-sm md:text-base">Traditional Wisdom</span>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#6455D2]" />
                        <span className="text-gray-700 font-medium text-sm md:text-base">Craftsmanship</span>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#51B873]" />
                        <span className="text-gray-700 font-medium text-sm md:text-base">Contemporary & Enduring Designs</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-[#51B873]/10 to-[#6455D2]/10 p-4 md:p-6 rounded-2xl mt-4 md:mt-6">
                      <p className='text-gray-700 leading-relaxed font-medium text-center text-sm md:text-base'>
                        At DCPL, we see design as a partnership—an opportunity to bring together vision, expertise, and imagination to create spaces that inspire and endure.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-8 pt-4 md:pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-2 md:gap-3">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#6455D2]" />
                      <span className="text-gray-700 font-medium text-sm md:text-base">Based in Mathura, India</span>
                    </div>
                    {/* <div className="flex items-center gap-2 md:gap-3">
                      <Calendar className="w-4 h-4 md:w-5 md:h-5 text-[#51B873]" />
                      <span className="text-gray-700 font-medium text-sm md:text-base">Est. 1998</span>
                    </div> */}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Core Values Section */}
        <div className="w-full py-12 md:py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, ${primaryColor} 2px, transparent 0)`,
              backgroundSize: '50px 50px'
            }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
            <motion.div
              className="text-center mb-8 md:mb-12 lg:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="inline-flex items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#6455D2] to-[#51B873] flex items-center justify-center shadow-xl">
                    <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <motion.div
                    className="absolute -inset-3 md:-inset-4 rounded-2xl border-2 border-[#6455D2]/30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </motion.div>

              <motion.h3
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Our <span className="text-[#6455D2]">Core</span>{" "}
                <span className="text-[#51B873]">Values</span>
              </motion.h3>
              <p className="text-gray-600 text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
                Guiding principles that shape our approach to every project
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  className="group"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-white rounded-2xl p-4 md:p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-[#6455D2]/30 h-full">
                    <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br from-[#6455D2]/10 to-[#51B873]/10 mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-[#6455D2]" />
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-4">
                      {value.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      {value.description}
                    </p>
                    <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-100 group-hover:border-[#6455D2]/30 transition-colors">
                      <div className="w-0 group-hover:w-full h-1 bg-gradient-to-r from-[#6455D2] to-[#51B873] transition-all duration-500" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Leadership Team Section */}
        <div className="w-full py-12 md:py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <motion.div
              className="text-center mb-8 md:mb-12 lg:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="relative">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#6455D2] to-[#51B873] flex items-center justify-center shadow-xl">
                    <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                </div>
                <div>
                  <div className="h-1 w-16 md:w-24 bg-gradient-to-r from-[#6455D2] to-[#51B873] mb-2 md:mb-3 mx-auto sm:mx-0" />
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                    Leadership <span className="text-[#6455D2]">Team</span>
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
                Visionary leaders guiding our mission and driving innovation
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
              {teamMembers.filter(member => member.leader).map((member, index) => (
                <motion.div
                  key={member.id}
                  className="group"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setHoveredMember(member.id)}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-[#6455D2]/30 h-auto min-h-[400px] md:min-h-[480px] flex flex-col">
                    <div className="relative h-48 md:h-64 overflow-hidden flex-shrink-0">
                      <motion.img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-4 md:p-6 flex-1 flex flex-col">
                      <div className="flex-1">
                        <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">{member.name}</h4>
                        <p className="text-[#6455D2] font-semibold text-sm md:text-base mb-2 md:mb-3">{member.role}</p>
                        <p className="text-gray-600 text-xs md:text-sm mb-2">{member.description}</p>
                        <div className="text-gray-500 text-xs md:text-sm mt-2">{member.expertise}</div>
                      </div>
                      <div className="pt-3 md:pt-4 border-t border-gray-100">
                        <a
                          href={member.social.email}
                          className="text-gray-600 hover:text-[#6455D2] transition-colors text-xs md:text-sm font-medium flex items-center gap-1 md:gap-2"
                        >
                          <span className="truncate">{member.email}</span>
                          <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Expert Team Slider Section */}
        <div className="w-full py-12 md:py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <motion.div
              className="text-center mb-8 md:mb-12 lg:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                Our <span className="text-[#51B873]">Expert</span> Team
              </h3>
              <p className="text-gray-600 text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
                Talented professionals bringing diverse expertise to every project
              </p>
            </motion.div>

            {/* Slider Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 md:mb-8">
              <div className="flex items-center gap-2 md:gap-4 order-2 sm:order-1">
                <motion.button
                  onClick={prevSlide}
                  onMouseEnter={() => setAutoRotateTeam(false)}
                  onMouseLeave={() => setAutoRotateTeam(true)}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-300 hover:border-[#6455D2] hover:bg-[#6455D2]/10 transition-all flex items-center justify-center group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-[#6455D2]" />
                </motion.button>
                <motion.button
                  onClick={nextSlide}
                  onMouseEnter={() => setAutoRotateTeam(false)}
                  onMouseLeave={() => setAutoRotateTeam(true)}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-300 hover:border-[#6455D2] hover:bg-[#6455D2]/10 transition-all flex items-center justify-center group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-[#6455D2]" />
                </motion.button>
              </div>
              <div className="flex gap-1 md:gap-2 order-1 sm:order-2 mb-4 sm:mb-0">
                {Array.from({ length: Math.ceil(expertTeamMembers.length / slidesPerView) }).map((_, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => {
                      setTeamSliderIndex(idx);
                      setAutoRotateTeam(false);
                    }}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${idx === teamSliderIndex
                      ? 'bg-gradient-to-r from-[#6455D2] to-[#51B873] w-6 md:w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
            </div>

            {/* Expert Team Slider */}
            <div className="relative overflow-hidden">
              <motion.div
                className="flex gap-4 md:gap-6 lg:gap-8"
                animate={{ x: `-${teamSliderIndex * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {expertTeamMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    className={`flex-shrink-0 ${slidesPerView === 1 ? 'w-full' : slidesPerView === 2 ? 'w-[calc(50%-8px)] md:w-[calc(50%-12px)]' : slidesPerView === 3 ? 'w-[calc(33.333%-11px)] md:w-[calc(33.333%-16px)]' : 'w-[calc(25%-18px)] md:w-[calc(25%-24px)]'} group`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    onMouseEnter={() => setHoveredMember(member.id)}
                    onMouseLeave={() => setHoveredMember(null)}
                    whileHover={{ y: -10 }}
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-[#51B873]/30 h-full">
                      <div className="relative h-36 md:h-40 lg:h-48 overflow-hidden">
                        <motion.img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-4 md:p-6">
                        <h5 className="font-bold text-gray-900 text-sm md:text-base mb-1 md:mb-2">{member.name}</h5>
                        <p className="text-[#51B873] font-semibold text-xs md:text-sm mb-2 md:mb-3">{member.role}</p>
                        <p className="text-gray-600 text-xs">{member.description}</p>
                        <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-100">
                          <div className="text-xs text-gray-500">{member.expertise}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        {/* <div className="w-full py-12 md:py-16 lg:py-24 bg-gradient-to-br from-[#6455D2]/5 via-white to-[#51B873]/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
            >
              {companyStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 border border-gray-100"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-[#6455D2]" />
                  </motion.div>
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 md:mb-3">{stat.value}</div>
                  <div className="text-gray-600 font-medium text-sm md:text-base">{stat.label}</div>
                  <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-200">
                    <div className="w-0 group-hover:w-full h-1 bg-gradient-to-r from-[#6455D2] to-[#51B873] transition-all duration-500 mx-auto" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div> */}

        {/* Government Empanelments Section */}
        <div className="w-full py-12 md:py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <motion.div
              className="text-center mb-8 md:mb-12 lg:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                Government <span className="text-[#6455D2]">Empanelments</span>
              </h3>
              <p className="text-gray-600 text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
                Officially empaneled with leading government bodies and development authorities across India
              </p>
            </motion.div>

            {/* Featured Empanelment Slider */}
            <motion.div
              className="mb-8 md:mb-12 lg:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl overflow-hidden border border-gray-100">
                <div className="p-4 md:p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-8">
                    <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
                      <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl bg-white flex items-center justify-center shadow-lg overflow-hidden border border-gray-200">
                        <img
                          src={empanelments[activeEmpanelmentIndex].logo}
                          alt={empanelments[activeEmpanelmentIndex].name}
                          className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain"
                        />
                      </div>
                      <div className="text-center sm:text-left">
                        <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-1 md:mb-2">
                          {empanelments[activeEmpanelmentIndex].name}
                        </h4>
                        <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4">
                          <span className="px-3 py-1 bg-gradient-to-r from-[#6455D2] to-[#51B873] text-white rounded-full text-xs md:text-sm font-medium">
                            Category {empanelments[activeEmpanelmentIndex].category}
                          </span>
                          <span className="text-gray-600 text-sm md:text-base">
                            {empanelments[activeEmpanelmentIndex].location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-center lg:text-right">
                      <div className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2">Valid Until</div>
                      <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                        {empanelments[activeEmpanelmentIndex].validity}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-6">
                    <div className="flex flex-wrap items-center gap-4 md:gap-8">
                      <div className="text-center">
                        <div className="text-xs md:text-sm text-gray-500">Empanelled Since</div>
                        <div className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
                          {empanelments[activeEmpanelmentIndex].date}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs md:text-sm text-gray-500">Type</div>
                        <div className="text-base md:text-lg font-semibold text-gray-900">{empanelments[activeEmpanelmentIndex].type}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex gap-1 md:gap-2">
                        {empanelments.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveEmpanelmentIndex(idx)}
                            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${idx === activeEmpanelmentIndex
                              ? 'bg-gradient-to-r from-[#6455D2] to-[#51B873] w-6 md:w-8'
                              : 'bg-gray-300 hover:bg-gray-400'
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Empanelments Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {empanelments.slice(0, 6).map((emp, index) => (
                <motion.div
                  key={emp.name}
                  className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 hover:border-[#6455D2] transition-all duration-300 group cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex items-start justify-between mb-3 md:mb-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-[#6455D2]/10 to-[#51B873]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={emp.logo}
                        alt={emp.name}
                        className="w-8 h-8 md:w-12 md:h-12 object-contain"
                      />
                    </div>
                    <span className="px-2 py-1 bg-gradient-to-r from-[#6455D2]/10 to-[#51B873]/10 text-[#6455D2] rounded-full text-xs md:text-sm font-semibold border border-[#6455D2]/20">
                      Cat. {emp.category}
                    </span>
                  </div>

                  <h4 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-3 line-clamp-2">
                    {emp.name}
                  </h4>

                  <div className="flex items-center justify-between mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-100">
                    <div>
                      <div className="text-xs md:text-sm text-gray-500">Location</div>
                      <div className="font-semibold text-gray-900 text-sm md:text-base">{emp.location}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs md:text-sm text-gray-500">Valid Until</div>
                      <div className="font-semibold text-gray-900 text-sm md:text-base">{emp.validity}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Clients Section */}
        <div className="w-full py-12 md:py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <motion.div
              className="text-center mb-8 md:mb-12 lg:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                Our <span className="text-[#51B873]">Clients</span>
              </h3>
              <p className="text-gray-600 text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
                Trusted by industry leaders across government, private, and corporate sectors
              </p>
            </motion.div>

            {/* Featured Client Slider */}
            <motion.div
              className="mb-8 md:mb-12 lg:mb-16"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-xl border border-gray-200">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-8">
                  <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl bg-white flex items-center justify-center shadow-lg overflow-hidden">
                      <img
                        src={featuredClients[activeClientIndex].image}
                        alt={featuredClients[activeClientIndex].name}
                        className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain"
                      />
                    </div>
                    <div className="text-center sm:text-left">
                      <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-1 md:mb-2">
                        {featuredClients[activeClientIndex].name}
                      </h4>
                      <div className="flex items-center justify-center sm:justify-start gap-4">
                        <span className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium ${featuredClients[activeClientIndex].type === 'Government'
                          ? 'bg-blue-100 text-blue-600'
                          : featuredClients[activeClientIndex].type === 'Development Authority'
                            ? 'bg-purple-100 text-purple-600'
                            : featuredClients[activeClientIndex].type === 'Private'
                              ? 'bg-green-100 text-green-600'
                              : 'bg-orange-100 text-orange-600'
                          }`}>
                          {featuredClients[activeClientIndex].type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex gap-1 md:gap-2">
                    {featuredClients.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveClientIndex(idx)}
                        className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${idx === activeClientIndex
                          ? 'bg-gradient-to-r from-[#6455D2] to-[#51B873] w-6 md:w-8'
                          : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                      />
                    ))}
                  </div>

                  <div className="flex gap-2 md:gap-4">
                    <motion.button
                      onClick={() => setActiveClientIndex((prev) => (prev - 1 + featuredClients.length) % featuredClients.length)}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#6455D2] hover:bg-[#6455D2]/10 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                    </motion.button>
                    <motion.button
                      onClick={() => setActiveClientIndex((prev) => (prev + 1) % featuredClients.length)}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#6455D2] hover:bg-[#6455D2]/10 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Clients Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-6">
              {allClients.slice(0, 15).map((client, index) => (
                <motion.div
                  key={client.id}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onClick={() => {
                    const idx = featuredClients.findIndex(c => c.id === client.id);
                    if (idx >= 0) setActiveClientIndex(idx);
                  }}
                >
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-white rounded-xl md:rounded-2xl flex items-center justify-center p-3 md:p-4 border border-gray-200 group-hover:border-[#51B873] group-hover:shadow-xl transition-all duration-300">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src={client.image}
                        alt={client.name}
                        className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-[#6455D2]/0 to-[#51B873]/0 group-hover:from-[#6455D2]/5 group-hover:to-[#51B873]/5 rounded-xl md:rounded-2xl transition-all duration-300" />
                    </div>
                  </div>
                  <div className="mt-2 md:mt-4 text-center">
                    <div className={`text-xs px-2 py-1 rounded-full font-medium inline-block ${client.type === 'Government'
                      ? 'bg-blue-100 text-blue-600'
                      : client.type === 'Development Authority'
                        ? 'bg-purple-100 text-purple-600'
                        : client.type === 'Private'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-orange-100 text-orange-600'
                      }`}>
                      {client.type}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="w-full py-12 md:py-16 lg:py-24 bg-gradient-to-br from-[#6455D2]/10 via-[#51B873]/10 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
            <motion.div
              className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 border border-gray-100 shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col lg:flex-row items-start gap-6 md:gap-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#6455D2] to-[#51B873] flex items-center justify-center shadow-xl">
                    <Eye className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                </div>
                <div className="space-y-4 md:space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Our <span className="text-[#6455D2]">Vision</span>
                  </h3>
                  <div className="space-y-3 md:space-y-4">
                    <p className="text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed">
                      At DCPL, our approach is guided by clarity, rigor, and purpose. We blend technology, tradition, and creative insight to deliver solutions that are efficient, sustainable, and contextually responsive.
                    </p>
                    <p className="text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed">
                      The principles of <span className="font-semibold text-[#6455D2]">Firmness</span>, <span className="font-semibold text-[#51B873]">Utility</span>, and <span className="font-semibold text-gray-700">Beauty</span> anchor our process—ensuring that every project is robust in quality, functional in performance, and refined in its architectural expression.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 lg:gap-6 pt-4 md:pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#6455D2]" />
                      <span className="font-medium text-gray-700 text-sm md:text-base">Firmness</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#51B873]" />
                      <span className="font-medium text-gray-700 text-sm md:text-base">Utility</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-gray-600" />
                      <span className="font-medium text-gray-700 text-sm md:text-base">Beauty</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        {/* <div className="w-full py-12 md:py-16 lg:py-24 bg-gradient-to-br from-[#6455D2] via-[#51B873] to-[#6455D2] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <motion.div
              className="absolute top-0 left-0 w-32 h-32 md:w-64 md:h-64 rounded-full bg-white/10"
              animate={{ y: [0, 100, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-48 h-48 md:w-96 md:h-96 rounded-full bg-white/10"
              animate={{ y: [0, -100, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl bg-white/10 backdrop-blur-sm mb-6 md:mb-8 mx-auto"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Compass className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" />
              </motion.div>

              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
                Ready to Transform Your Vision into Reality?
              </h3>
              <p className="text-white/90 text-base md:text-lg lg:text-xl mb-8 md:mb-12 max-w-2xl mx-auto">
                Let's collaborate on creating spaces that inspire, function, and endure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
                <motion.button
                  className="px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 bg-white text-gray-900 rounded-lg md:rounded-xl font-bold hover:shadow-2xl transition-all duration-300 flex items-center gap-2 md:gap-3 justify-center group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start a Project
                  <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </motion.button>
                <motion.button
                  className="px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 border-2 border-white/30 text-white rounded-lg md:rounded-xl font-bold hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Our Work
                </motion.button>
              </div>
              
              <motion.div
                className="mt-8 md:mt-12 lg:mt-16 pt-6 md:pt-8 border-t border-white/20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 lg:gap-8">
                  <div className="flex items-center gap-2 md:gap-3">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-white/70" />
                    <span className="text-white/70 font-medium text-sm md:text-base">Mathura, India</span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3">
                    <Users className="w-4 h-4 md:w-5 md:h-5 text-white/70" />
                    <span className="text-white/70 font-medium text-sm md:text-base">50+ Experts</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Page;