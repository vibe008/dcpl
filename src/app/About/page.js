'use client';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, MapPin, Calendar, Users, Award, Target, Eye, Lightbulb, ChevronRight, ChevronLeft, BookOpen, Compass, Layers, Palette, Building, Globe, Leaf, Sparkles, TargetIcon, Zap, Shield, Clock, Star, Briefcase, Building2, Landmark, Factory, Mail, Phone, Linkedin, ExternalLink } from 'lucide-react';

function Page() {
  const containerRef = useRef(null);
  const aboutContentRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const leftImageY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rightContentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 0, 0, 1]);

  // State for API data
  const [teamMembers, setTeamMembers] = useState([]);
  const [clients, setClients] = useState([]);
  const [empanelments, setEmpanelments] = useState([]);
  const [loading, setLoading] = useState({
    team: true,
    clients: true,
    empanelments: true
  });
  const [hoveredMember, setHoveredMember] = useState(null);
  const [activeClientIndex, setActiveClientIndex] = useState(0);
  const [activeEmpanelmentIndex, setActiveEmpanelmentIndex] = useState(0);
  const [teamSliderIndex, setTeamSliderIndex] = useState(0);
  const [autoRotateTeam, setAutoRotateTeam] = useState(true);
  const [slidesPerView, setSlidesPerView] = useState(4);

  // Brand colors
  const primaryColor = '#6455D2';
  const secondaryColor = '#51B873';

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

  // Fetch APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch team data
        const teamResponse = await fetch('/api/team');
        const teamData = await teamResponse.json();
        if (teamData.success) {
          setTeamMembers(teamData.data);
        }

        // Fetch clients data
        const clientsResponse = await fetch('/api/client');
        const clientsData = await clientsResponse.json();
        if (clientsData.success) {
          setClients(clientsData.data);
        }

        // Fetch empanelments data
        const empanelmentsResponse = await fetch('/api/empanelments');
        const empanelmentsData = await empanelmentsResponse.json();
        if (empanelmentsData.success) {
          setEmpanelments(empanelmentsData.data);
        }

        setLoading({ team: false, clients: false, empanelments: false });
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading({ team: false, clients: false, empanelments: false });
      }
    };

    fetchData();
  }, []);

  // Separate leadership team and expert team
  const leadershipTeam = teamMembers.filter(member => member.isLeaderShip);
  const expertTeam = teamMembers.filter(member => !member.isLeaderShip);

  // Enhanced animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

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
      if (autoRotateTeam && expertTeam.length > 0) {
        setTeamSliderIndex((prev) => 
          (prev + 1) % Math.ceil(expertTeam.length / slidesPerView)
        );
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [autoRotateTeam, slidesPerView, expertTeam.length]);

  const nextSlide = () => {
    setTeamSliderIndex((prev) => 
      (prev + 1) % Math.ceil(expertTeam.length / slidesPerView)
    );
  };

  const prevSlide = () => {
    setTeamSliderIndex((prev) => 
      (prev - 1 + Math.ceil(expertTeam.length / slidesPerView)) % 
      Math.ceil(expertTeam.length / slidesPerView)
    );
  };

  // Loading skeletons
  const TeamMemberSkeleton = () => (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 animate-pulse">
      <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 mx-auto"></div>
      <div className="h-4 bg-gray-300 rounded mb-2 w-3/4 mx-auto"></div>
      <div className="h-3 bg-gray-200 rounded mb-3 w-1/2 mx-auto"></div>
      <div className="h-3 bg-gray-200 rounded mb-2 w-full"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
    </div>
  );

  const ClientSkeleton = () => (
    <div className="aspect-square bg-gray-100 rounded-2xl animate-pulse"></div>
  );

  return (
    <div className="bg-white">
      <div ref={containerRef} className="bg-white">
        {/* Enhanced Hero Section */}
        <div className='w-full flex flex-col lg:flex-row h-auto lg:h-[150vh] justify-between relative overflow-hidden bg-gradient-to-br from-[#6455D2]/5 via-white to-[#51B873]/5'>
          {/* Animated Background */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-1/4 left-1/4 w-32 md:w-64 h-32 md:h-64 rounded-full bg-gradient-to-r from-[#6455D2]/10 to-[#51B873]/10 blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, -30, 0]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-48 md:w-96 h-48 md:h-96 rounded-full bg-gradient-to-r from-[#51B873]/10 to-[#6455D2]/10 blur-3xl"
              animate={{ 
                scale: [1.2, 1, 1.2],
                x: [0, -30, 0],
                y: [0, 20, 0]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
          </div>

          {/* Left Image Section */}
          <div className='w-full lg:w-[45%] h-96 md:h-screen lg:h-full lg:sticky lg:top-0 z-10 order-1 lg:order-1'>
            <motion.div
              style={{ y: leftImageY }}
              className='h-full w-full relative overflow-hidden group'
            >
              <motion.img
                src='https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                className='h-full w-full object-cover group-hover:scale-110 transition-transform duration-[10000ms]'
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 1.5, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
              />
              <div className='absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent' />
              <div className='absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent' />
              
              <motion.div
                className="absolute inset-0 border-[8px] md:border-[12px] border-white/10"
                animate={{ 
                  borderColor: [
                    'rgba(255,255,255,0.1)', 
                    'rgba(100,85,210,0.3)', 
                    'rgba(81,184,115,0.2)',
                    'rgba(255,255,255,0.1)'
                  ] 
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "linear" 
                }}
              />

              {/* Floating elements */}
              <motion.div
                className="absolute top-10 left-10 w-6 h-6 rounded-full bg-gradient-to-r from-[#6455D2] to-[#51B873]"
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 0.5
                }}
              />
              <motion.div
                className="absolute bottom-10 right-10 w-4 h-4 rounded-full bg-gradient-to-r from-[#51B873] to-[#6455D2]"
                animate={{
                  y: [0, 20, 0],
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: 1
                }}
              />
            </motion.div>
          </div>

          {/* Right Content Section */}
          <motion.div
            style={{ y: rightContentY }}
            className='w-full lg:w-[50%] mx-auto h-auto lg:h-full flex flex-col py-0 relative z-20 order-2 lg:order-2'
          >
            <div ref={aboutContentRef} className='w-full px-4 sm:px-6 md:px-8 mx-auto py-8 md:py-16 lg:py-32'>
              <motion.div
                className='space-y-6 md:space-y-8 lg:space-y-12'
                initial="initial"
                animate="animate"
                variants={staggerContainer}
              >
                {/* Title with animated gradient */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.2,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="mb-6 md:mb-8 lg:mb-12"
                >
                  <div className="flex flex-col items-center sm:items-start gap-4 md:gap-6 mb-6 md:mb-8">
                    <motion.div
                      className="relative mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 0.3,
                        type: "spring",
                        stiffness: 100 
                      }}
                    >
                      <motion.h1 
                        className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6455D2] via-[#51B873] to-[#6455D2] bg-[size:200%_auto]'
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        Dera Consultants
                      </motion.h1>
                      <div className="h-1 w-32 md:w-48 bg-gradient-to-r from-[#6455D2] to-[#51B873] rounded-full mt-2"></div>
                    </motion.div>
                    <p className='text-base md:text-lg lg:text-xl text-gray-600 font-light text-center sm:text-left'>
                      Private Limited
                    </p>
                  </div>
                </motion.div>

                {/* About DCPL Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.4,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className='space-y-4 md:space-y-6 lg:space-y-8'
                >
                  <motion.div
                    className="space-y-3 md:space-y-4 lg:space-y-6"
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                  >
                    <motion.p 
                      className='text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed'
                      variants={fadeInUp}
                    >
                      <span className="font-semibold text-[#6455D2]">Dera Consultants Private Limited (DCPL)</span> is a multidisciplinary design and planning practice committed to creating environments that are purposeful, contextual, and future-ready.
                    </motion.p>
                    
                    <motion.div 
                      className="bg-gradient-to-r from-[#6455D2]/5 to-[#51B873]/5 p-4 md:p-6 rounded-2xl border-l-4 border-[#6455D2]"
                      variants={fadeInUp}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <p className='text-gray-700 leading-relaxed italic text-sm md:text-base'>
                        Our approach is guided by three core principles: <span className="font-semibold text-[#6455D2]">sustainability</span>, <span className="font-semibold text-[#51B873]">accessibility</span>, and <span className="font-semibold text-gray-700">economic efficiency</span>.
                      </p>
                    </motion.div>

                    <motion.p 
                      className='text-gray-700 leading-relaxed text-sm md:text-base'
                      variants={fadeInUp}
                    >
                      While we value innovation, we also celebrate the creative spark that brings character and delight into each space. Context—whether cultural, environmental, or social—remains central to our work.
                    </motion.p>

                    <motion.div 
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-4 md:mt-6"
                      variants={staggerContainer}
                    >
                      {[
                        "Modern Digital Technologies",
                        "Traditional Wisdom",
                        "Craftsmanship",
                        "Contemporary & Enduring Designs"
                      ].map((item, index) => (
                        <motion.div 
                          key={index}
                          className="flex items-center gap-2 md:gap-3"
                          variants={fadeInUp}
                          whileHover={{ x: 5 }}
                        >
                          <motion.div 
                            className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${index % 2 === 0 ? 'bg-[#6455D2]' : 'bg-[#51B873]'}`}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, delay: index * 0.2, repeat: Infinity }}
                          />
                          <span className="text-gray-700 font-medium text-sm md:text-base">{item}</span>
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.div 
                      className="bg-gradient-to-r from-[#51B873]/10 to-[#6455D2]/10 p-4 md:p-6 rounded-2xl mt-4 md:mt-6"
                      variants={fadeInUp}
                      whileHover={{ 
                        boxShadow: "0 20px 40px rgba(100, 85, 210, 0.1)",
                        y: -2
                      }}
                    >
                      <p className='text-gray-700 leading-relaxed font-medium text-center text-sm md:text-base'>
                        At DCPL, we see design as a partnership—an opportunity to bring together vision, expertise, and imagination to create spaces that inspire and endure.
                      </p>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Core Values Section */}
        <div className="w-full py-12 md:py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 25px 25px, ${primaryColor} 2px, transparent 0)`,
                backgroundSize: '50px 50px'
              }}
              animate={{ backgroundPosition: ['0px 0px', '25px 25px'] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
            <motion.div
              className="text-center mb-8 md:mb-12 lg:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div
                className="inline-flex items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative">
                  <motion.div
                    className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#6455D2] to-[#51B873] flex items-center justify-center shadow-xl"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity }
                    }}
                  >
                    <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </motion.div>
                </div>
              </motion.div>

              <motion.h3
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Our <motion.span 
                  className="text-[#6455D2]"
                  animate={{ textShadow: ["0 0 0px #6455D2", "0 0 20px #6455D2", "0 0 0px #6455D2"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >Core</motion.span>{" "}
                <motion.span 
                  className="text-[#51B873]"
                  animate={{ textShadow: ["0 0 0px #51B873", "0 0 20px #51B873", "0 0 0px #51B873"] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                >Values</motion.span>
              </motion.h3>
              <motion.p 
                className="text-gray-600 text-sm md:text-base lg:text-lg max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Guiding principles that shape our approach to every project
              </motion.p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
            >
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  className="group"
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-white rounded-2xl p-4 md:p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-[#6455D2]/30 h-full relative overflow-hidden">
                    {/* Animated background effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#6455D2]/0 to-[#51B873]/0 group-hover:from-[#6455D2]/5 group-hover:to-[#51B873]/5 transition-all duration-500" />
                    
                    <div className="relative z-10">
                      <motion.div
                        className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br from-[#6455D2]/10 to-[#51B873]/10 mb-4 md:mb-6"
                        whileHover={{ 
                          scale: 1.1,
                          rotate: 360 
                        }}
                        transition={{ 
                          scale: { type: "spring", stiffness: 300 },
                          rotate: { duration: 0.5 }
                        }}
                      >
                        <value.icon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-[#6455D2]" />
                      </motion.div>
                      <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-4">
                        {value.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                        {value.description}
                      </p>
                      <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-100 group-hover:border-[#6455D2]/30 transition-colors">
                        <motion.div 
                          className="w-0 group-hover:w-full h-1 bg-gradient-to-r from-[#6455D2] to-[#51B873]"
                          transition={{ duration: 0.5, delay: 0.1 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Leadership Team Section */}
        <div className="w-full py-12 md:py-16 lg:py-24 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <motion.div
              className="text-center mb-8 md:mb-12 lg:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8">
                <motion.div 
                  className="relative"
                  animate={{ 
                    y: [0, -10, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#6455D2] to-[#51B873] flex items-center justify-center shadow-xl">
                    <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                </motion.div>
                <div>
                  <motion.div 
                    className="h-1 w-16 md:w-24 bg-gradient-to-r from-[#6455D2] to-[#51B873] mb-2 md:mb-3 mx-auto sm:mx-0"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                    Leadership <span className="text-[#6455D2]">Team</span>
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
                Visionary leaders guiding our mission and driving innovation
              </p>
            </motion.div>

            {loading.team ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                {[1, 2].map(i => <TeamMemberSkeleton key={i} />)}
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
              >
                {leadershipTeam.map((member, index) => (
                  <motion.div
                    key={member._id}
                    className="group"
                    variants={fadeInUp}
                    onMouseEnter={() => setHoveredMember(member._id)}
                    onMouseLeave={() => setHoveredMember(null)}
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-[#6455D2]/30 h-auto min-h-[400px] md:min-h-[480px] flex flex-col relative">
                      {/* Animated background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#6455D2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative h-48 md:h-64 overflow-hidden flex-shrink-0">
                        <motion.img
                          src={member.profile}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.7 }}
                        />
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div className="absolute bottom-4 left-4 right-4">
                          <motion.div 
                            className="w-full bg-gradient-to-r from-[#6455D2] to-[#51B873] h-1 rounded-full"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                      </div>
                      <div className="p-4 md:p-6 flex-1 flex flex-col relative z-10">
                        <div className="flex-1">
                          <motion.h4 
                            className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            {member.name}
                          </motion.h4>
                          <p className="text-[#6455D2] font-semibold text-sm md:text-base mb-2 md:mb-3">
                            {member.position}
                          </p>
                          <div className="text-gray-500 text-xs md:text-sm mt-2">
                            {member.isLeaderShip ? "Leadership Team" : "Team Member"}
                          </div>
                        </div>
                        <div className="pt-3 md:pt-4 border-t border-gray-100">
                          <a
                            href={`mailto:${member.email}`}
                            className="text-gray-600 hover:text-[#6455D2] transition-colors text-xs md:text-sm font-medium flex items-center gap-1 md:gap-2"
                          >
                            <Mail className="w-3 h-3 md:w-4 md:h-4" />
                            <span className="truncate">{member.email || `${member.name.toLowerCase().replace(/\s+/g, '')}@archstudio.com`}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
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
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h3
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Our <motion.span 
                  className="text-[#51B873]"
                  animate={{ 
                    textShadow: ["0 0 0px #51B873", "0 0 20px #51B873", "0 0 0px #51B873"] 
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >Expert</motion.span> Team
              </motion.h3>
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
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-[#6455D2]" />
                </motion.button>
                <motion.button
                  onClick={nextSlide}
                  onMouseEnter={() => setAutoRotateTeam(false)}
                  onMouseLeave={() => setAutoRotateTeam(true)}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-300 hover:border-[#6455D2] hover:bg-[#6455D2]/10 transition-all flex items-center justify-center group"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-[#6455D2]" />
                </motion.button>
              </div>
              <div className="flex gap-1 md:gap-2 order-1 sm:order-2 mb-4 sm:mb-0">
                {Array.from({ length: Math.ceil(expertTeam.length / slidesPerView) }).map((_, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => {
                      setTeamSliderIndex(idx);
                      setAutoRotateTeam(false);
                    }}
                    className={`relative overflow-hidden rounded-full ${idx === teamSliderIndex
                      ? 'bg-gradient-to-r from-[#6455D2] to-[#51B873]'
                      : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div
                      className={`w-2 h-2 md:w-3 md:h-3 ${idx === teamSliderIndex ? 'w-6 md:w-8' : ''}`}
                      animate={idx === teamSliderIndex ? {
                        scale: [1, 1.2, 1],
                      } : {}}
                      transition={idx === teamSliderIndex ? {
                        duration: 2,
                        repeat: Infinity
                      } : {}}
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Expert Team Slider */}
            {loading.team ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {[1, 2, 3, 4].map(i => <TeamMemberSkeleton key={i} />)}
              </div>
            ) : (
              <div className="relative overflow-hidden">
                <motion.div
                  className="flex gap-4 md:gap-6 lg:gap-8"
                  animate={{ x: `-${teamSliderIndex * 100}%` }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30 
                  }}
                >
                  {expertTeam.map((member, index) => (
                    <motion.div
                      key={member._id}
                      className={`flex-shrink-0 ${slidesPerView === 1 ? 'w-full' : slidesPerView === 2 ? 'w-[calc(50%-8px)] md:w-[calc(50%-12px)]' : slidesPerView === 3 ? 'w-[calc(33.333%-11px)] md:w-[calc(33.333%-16px)]' : 'w-[calc(25%-18px)] md:w-[calc(25%-24px)]'} group`}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      onMouseEnter={() => setHoveredMember(member._id)}
                      onMouseLeave={() => setHoveredMember(null)}
                      whileHover={{ 
                        y: -10,
                        transition: { type: "spring", stiffness: 400 }
                      }}
                    >
                      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-[#51B873]/30 h-full relative">
                        {/* Hover gradient effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#51B873]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className="relative h-36 md:h-40 lg:h-48 overflow-hidden">
                          <motion.img
                            src={member.profile}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                          />
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        <div className="p-4 md:p-6 relative z-10">
                          <motion.h5 
                            className="font-bold text-gray-900 text-sm md:text-base mb-1 md:mb-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {member.name}
                          </motion.h5>
                          <p className="text-[#51B873] font-semibold text-xs md:text-sm mb-2 md:mb-3">
                            {member.position}
                          </p>
                          <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-100">
                            <motion.div 
                              className="flex items-center gap-2"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.1 }}
                            >
                              <Mail className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                              <span className="text-xs text-gray-500 truncate">
                                {`${member.name.toLowerCase().replace(/\s+/g, '')}@archstudio.com`}
                              </span>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}
          </div>
        </div>

        {/* Government Empanelments Section */}
        <div className="w-full py-12 md:py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <motion.div
              className="text-center mb-8 md:mb-12 lg:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
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
              {loading.empanelments ? (
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl p-8 border border-gray-100 animate-pulse">
                  <div className="h-64 bg-gray-200 rounded-lg"></div>
                </div>
              ) : empanelments.length > 0 && (
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl overflow-hidden border border-gray-100 relative">
                  {/* Animated border */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none"
                    style={{
                      background: `linear-gradient(90deg, transparent, transparent)`,
                      padding: '2px',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    }}
                    animate={{
                      background: [
                        `linear-gradient(90deg, transparent, ${primaryColor}, transparent)`,
                        `linear-gradient(180deg, transparent, ${secondaryColor}, transparent)`,
                        `linear-gradient(270deg, transparent, ${primaryColor}, transparent)`,
                        `linear-gradient(360deg, transparent, ${secondaryColor}, transparent)`,
                        `linear-gradient(90deg, transparent, ${primaryColor}, transparent)`,
                      ]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                  
                  <div className="p-4 md:p-6 lg:p-8 relative z-10 bg-white rounded-2xl md:rounded-3xl">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-8">
                      <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
                        <motion.div 
                          className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl bg-white flex items-center justify-center shadow-lg overflow-hidden border border-gray-200"
                          whileHover={{ rotate: 5, scale: 1.05 }}
                        >
                          <img
                            src={empanelments[activeEmpanelmentIndex].image}
                            alt={empanelments[activeEmpanelmentIndex].title}
                            className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain p-2"
                          />
                        </motion.div>
                        <div className="text-center sm:text-left">
                          <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-1 md:mb-2">
                            {empanelments[activeEmpanelmentIndex].title}
                          </h4>
                          <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4">
                            <motion.span 
                              className="px-3 py-1 bg-gradient-to-r from-[#6455D2] to-[#51B873] text-white rounded-full text-xs md:text-sm font-medium inline-block"
                              whileHover={{ scale: 1.05 }}
                            >
                              {empanelments[activeEmpanelmentIndex].category}
                            </motion.span>
                            <span className="text-gray-600 text-sm md:text-base">
                              {empanelments[activeEmpanelmentIndex].city}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-center lg:text-right">
                        <div className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2">Valid Until</div>
                        <motion.div 
                          className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900"
                          key={activeEmpanelmentIndex}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {new Date(empanelments[activeEmpanelmentIndex].validity).toLocaleDateString()}
                        </motion.div>
                      </div>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-6">
                      <div className="flex flex-wrap items-center gap-4 md:gap-8">
                        <div className="text-center">
                          <div className="text-xs md:text-sm text-gray-500">Department</div>
                          <div className="text-base md:text-lg font-semibold text-gray-900">
                            {empanelments[activeEmpanelmentIndex].department}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs md:text-sm text-gray-500">Empanelled Date</div>
                          <div className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
                            {new Date(empanelments[activeEmpanelmentIndex].empanelledDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex gap-1 md:gap-2">
                          {empanelments.map((_, idx) => (
                            <motion.button
                              key={idx}
                              onClick={() => setActiveEmpanelmentIndex(idx)}
                              className={`relative overflow-hidden rounded-full ${idx === activeEmpanelmentIndex
                                ? 'bg-gradient-to-r from-[#6455D2] to-[#51B873]'
                                : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <motion.div
                                className={`w-2 h-2 md:w-3 md:h-3 ${idx === activeEmpanelmentIndex ? 'w-6 md:w-8' : ''}`}
                                animate={idx === activeEmpanelmentIndex ? {
                                  scale: [1, 1.2, 1],
                                } : {}}
                                transition={idx === activeEmpanelmentIndex ? {
                                  duration: 2,
                                  repeat: Infinity
                                } : {}}
                              />
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Empanelments Grid */}
            {loading.empanelments ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200 animate-pulse">
                    <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
              >
                {empanelments.slice(0, 6).map((emp, index) => (
                  <motion.div
                    key={emp._id}
                    className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 hover:border-[#6455D2] transition-all duration-300 group cursor-pointer relative overflow-hidden"
                    variants={fadeInUp}
                    whileHover={{ 
                      scale: 1.02, 
                      y: -5,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                  >
                    {/* Hover gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#6455D2]/0 to-[#51B873]/0 group-hover:from-[#6455D2]/5 group-hover:to-[#51B873]/5 transition-all duration-300" />
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3 md:mb-4">
                        <motion.div 
                          className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-[#6455D2]/10 to-[#51B873]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <img
                            src={emp.image}
                            alt={emp.title}
                            className="w-8 h-8 md:w-12 md:h-12 object-contain p-1"
                          />
                        </motion.div>
                        <motion.span 
                          className="px-2 py-1 bg-gradient-to-r from-[#6455D2]/10 to-[#51B873]/10 text-[#6455D2] rounded-full text-xs md:text-sm font-semibold border border-[#6455D2]/20"
                          whileHover={{ scale: 1.1 }}
                        >
                          {emp.category}
                        </motion.span>
                      </div>

                      <h4 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-3 line-clamp-2">
                        {emp.title}
                      </h4>

                      <div className="flex items-center justify-between mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-100">
                        <div>
                          <div className="text-xs md:text-sm text-gray-500">City</div>
                          <div className="font-semibold text-gray-900 text-sm md:text-base">{emp.city}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs md:text-sm text-gray-500">Department</div>
                          <div className="font-semibold text-gray-900 text-sm md:text-base line-clamp-1">
                            {emp.department}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
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
              viewport={{ once: true, margin: "-100px" }}
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
              {loading.clients ? (
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl md:rounded-3xl p-8 shadow-xl border border-gray-200 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg"></div>
                </div>
              ) : clients.length > 0 && (
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-xl border border-gray-200 relative overflow-hidden">
                  {/* Animated background */}
                  <div className="absolute inset-0 opacity-5">
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, ${primaryColor} 1px, transparent 0)`,
                        backgroundSize: '50px 50px'
                      }}
                      animate={{ backgroundPosition: ['0px 0px', '25px 25px'] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                  </div>

                  <div className="relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-8">
                      <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
                        <motion.div 
                          className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl bg-white flex items-center justify-center shadow-lg overflow-hidden border border-gray-200"
                          whileHover={{ 
                            rotate: [0, 10, -10, 0],
                            transition: { duration: 0.5 }
                          }}
                        >
                          <img
                            src={clients[activeClientIndex].logo}
                            alt={clients[activeClientIndex].name}
                            className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain p-2"
                          />
                        </motion.div>
                        <div className="text-center sm:text-left">
                          <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-1 md:mb-2 line-clamp-2">
                            {clients[activeClientIndex].name}
                          </h4>
                          <div className="flex items-center justify-center sm:justify-start gap-4">
                            <motion.span 
                              className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium ${clients[activeClientIndex].sector === 'Government'
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-green-100 text-green-600'
                              }`}
                              whileHover={{ scale: 1.05 }}
                            >
                              {clients[activeClientIndex].sector}
                            </motion.span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex gap-1 md:gap-2">
                        {clients.slice(0, 6).map((_, idx) => (
                          <motion.button
                            key={idx}
                            onClick={() => setActiveClientIndex(idx)}
                            className={`relative overflow-hidden rounded-full ${idx === activeClientIndex
                              ? 'bg-gradient-to-r from-[#6455D2] to-[#51B873]'
                              : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <motion.div
                              className={`w-2 h-2 md:w-3 md:h-3 ${idx === activeClientIndex ? 'w-6 md:w-8' : ''}`}
                              animate={idx === activeClientIndex ? {
                                scale: [1, 1.2, 1],
                              } : {}}
                              transition={idx === activeClientIndex ? {
                                duration: 2,
                                repeat: Infinity
                              } : {}}
                            />
                          </motion.button>
                        ))}
                      </div>

                      <div className="flex gap-2 md:gap-4">
                        <motion.button
                          onClick={() => setActiveClientIndex((prev) => (prev - 1 + clients.length) % clients.length)}
                          className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#6455D2] hover:bg-[#6455D2]/10 transition-colors"
                          whileHover={{ 
                            scale: 1.1,
                            rotate: -5 
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                        </motion.button>
                        <motion.button
                          onClick={() => setActiveClientIndex((prev) => (prev + 1) % clients.length)}
                          className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#6455D2] hover:bg-[#6455D2]/10 transition-colors"
                          whileHover={{ 
                            scale: 1.1,
                            rotate: 5 
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Clients Grid */}
            {loading.clients ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => <ClientSkeleton key={i} />)}
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-6"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
              >
                {clients.slice(0, 15).map((client, index) => (
                  <motion.div
                    key={client._id}
                    className="group cursor-pointer"
                    variants={fadeInUp}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    onClick={() => {
                      const idx = clients.findIndex(c => c._id === client._id);
                      if (idx >= 0) setActiveClientIndex(idx);
                    }}
                  >
                    <div className="aspect-square bg-gradient-to-br from-gray-50 to-white rounded-xl md:rounded-2xl flex items-center justify-center p-3 md:p-4 border border-gray-200 group-hover:border-[#51B873] group-hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                      {/* Hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#6455D2]/0 to-[#51B873]/0 group-hover:from-[#6455D2]/5 group-hover:to-[#51B873]/5 transition-all duration-300" />
                      
                      <div className="relative w-full h-full flex items-center justify-center">
                        <motion.img
                          src={client.logo}
                          alt={client.name}
                          className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                    <div className="mt-2 md:mt-4 text-center">
                      <div className={`text-xs px-2 py-1 rounded-full font-medium inline-block ${client.sector === 'Government'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-green-100 text-green-600'
                      }`}>
                        {client.sector}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Vision Section */}
        <div className="w-full py-12 md:py-16 lg:py-24 bg-gradient-to-br from-[#6455D2]/10 via-[#51B873]/10 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
            <motion.div
              className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 border border-gray-100 shadow-xl relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-5">
                <motion.div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, ${primaryColor} 1px, transparent 0)`,
                    backgroundSize: '30px 30px'
                  }}
                  animate={{ backgroundPosition: ['0px 0px', '15px 15px'] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
              </div>

              <div className="flex flex-col lg:flex-row items-start gap-6 md:gap-8 relative z-10">
                <div className="flex-shrink-0">
                  <motion.div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#6455D2] to-[#51B873] flex items-center justify-center shadow-xl"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity }
                    }}
                  >
                    <Eye className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </motion.div>
                </div>
                <div className="space-y-4 md:space-y-6">
                  <motion.h3 
                    className="text-2xl md:text-3xl font-bold text-gray-900"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Our <span className="text-[#6455D2]">Vision</span>
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 md:space-y-4"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                  >
                    <motion.p 
                      className="text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed"
                      variants={fadeInUp}
                    >
                      At DCPL, our approach is guided by clarity, rigor, and purpose. We blend technology, tradition, and creative insight to deliver solutions that are efficient, sustainable, and contextually responsive.
                    </motion.p>
                    <motion.p 
                      className="text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed"
                      variants={fadeInUp}
                    >
                      The principles of <span className="font-semibold text-[#6455D2]">Firmness</span>, <span className="font-semibold text-[#51B873]">Utility</span>, and <span className="font-semibold text-gray-700">Beauty</span> anchor our process—ensuring that every project is robust in quality, functional in performance, and refined in its architectural expression.
                    </motion.p>
                  </motion.div>
                  <motion.div 
                    className="flex flex-wrap items-center gap-3 md:gap-4 lg:gap-6 pt-4 md:pt-6 border-t border-gray-200"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                  >
                    {["Firmness", "Utility", "Beauty"].map((item, index) => (
                      <motion.div 
                        key={item}
                        className="flex items-center gap-2 md:gap-3"
                        variants={fadeInUp}
                        whileHover={{ scale: 1.05 }}
                      >
                        <motion.div 
                          className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${index === 0 ? 'bg-[#6455D2]' : index === 1 ? 'bg-[#51B873]' : 'bg-gray-600'}`}
                          animate={{ 
                            scale: [1, 1.3, 1],
                            rotate: [0, 180, 360]
                          }}
                          transition={{ 
                            duration: 3, 
                            delay: index * 0.5,
                            repeat: Infinity 
                          }}
                        />
                        <span className="font-medium text-gray-700 text-sm md:text-base">{item}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;