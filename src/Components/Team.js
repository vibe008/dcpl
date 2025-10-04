'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { motion } from 'framer-motion';
import { Linkedin, Mail, ArrowRight, ArrowLeft } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "AR. MAYANK GARG",
      role: "MANAGING DIRECTOR/ CHIEF ARCHITECT",
      image: "../assets/mayankGarg.jpg",
      description: "B.ARCH / M.PLAN",
      email: "mayank@archstudio.com",
      social: {
        linkedin: "#",
        email: "mailto:mayank@archstudio.com"
      }
    },
    {
      id: 2,
      name: "AR. ANAND THAKKAR",
      role: "DIRECTOR/ HEAD PLANNING CELL",
      image: "../assets/anand.jpg",
      description: "B.ARCH + M.PLAN",
      email: "anand@archstudio.com",
      social: {
        linkedin: "#",
        email: "mailto:anand@archstudio.com"
      }
    },
    {
      id: 3,
      name: "ARUN KUMAR SINGH",
      role: "SENIOR ESTIMATOR CUM ENGINEER",
      image: "../assets/arun.jpg",
      description: "B.A + DIPLOMA IN ARCHITECTURE",
      email: "arun@archstudio.com",
      social: {
        linkedin: "#",
        email: "mailto:arun@archstudio.com"
      }
    },
    {
      id: 4,
      name: "MUKESH KUMAR CHAUHAN",
      role: "3D VISUALIZER",
      image: "../assets/mukesh.jpg",
      description: "B.TECH CIVIL",
      email: "mukesh@archstudio.com",
      social: {
        linkedin: "#",
        email: "mailto:mukesh@archstudio.com"
      }
    },
    {
      id: 5,
      name: "DEENDAYAL",
      role: "MANAGER",
      image: "../assets/deendayal.jpg",
      description: "B.A + DIPLOMA IN CIVIL",
      email: "deendayal@archstudio.com",
      social: {
        linkedin: "#",
        email: "mailto:deendayal@archstudio.com"
      }
    },
    {
      id: 6,
      name: "AJAY SINGH RAJAWAT",
      role: "ARCHITECT",
      image: "../assets/ajay.jpg",
      description: "B.ARCH",
      email: "ajay@archstudio.com",
      social: {
        linkedin: "#",
        email: "mailto:ajay@archstudio.com"
      }
    },
    {
      id: 7,
      name: "SHIVAM BHATNAGAR",
      role: "ARCHITECT",
      image: "../assets/shivam.jpg",
      description: "B.ARCH",
      email: "shivam@archstudio.com",
      social: {
        linkedin: "#",
        email: "mailto:shivam@archstudio.com"
      }
    },
    {
      id: 8,
      name: "DEEPAK SHARMA",
      role: "SENIOR PROJECT ASSISTANT",
      image: "../assets/deepak.jpg",
      description: "B.TECH CIVIL",
      email: "deepak@archstudio.com",
      social: {
        linkedin: "#",
        email: "mailto:deepak@archstudio.com"
      }
    },
    {
      id: 9,
      name: "LALU PRASAD YADAV",
      role: "ARCHITECT",
      image: "../assets/lalu.jpg",
      description: "B.ARCH",
      email: "lalu@archstudio.com",
      social: {
        linkedin: "#",
        email: "mailto:lalu@archstudio.com"
      }
    },
    {
      id: 10,
      name: "KALYANI GANDHI",
      role: "ARCHITECT",
      image: "../assets/kalyani.jpg",
      description: "B.ARCH",
      email: "kalyani@archstudio.com",
      social: {
        linkedin: "#",
        email: "mailto:kalyani@archstudio.com"
      }
    },
    {
      id: 11,
      name: "MADHAV CHATURVEDI",
      role: "BD MANAGER",
      image: "../assets/madhav.jpg",
      description: "B.COM + M.B.A",
      email: "madhav@archstudio.com",
      social: {
        linkedin: "#",
        email: "mailto:madhav@archstudio.com"
      }
    },
    {
      id: 12,
      name: "RAJENDRA KUMAR PAL",
      role: "MEP ENGINEER",
      image: "../assets/rajendra.jpg",
      description: "B.TECH CIVIL",
      email: "rajendra@archstudio.com",
      social: {
        linkedin: "#",
        email: "mailto:rajendra@archstudio.com"
      }
    }
  ];

  return (
    <section className="w-full py-20 md:py-32 bg-white relative overflow-hidden">
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
      
      <div className="w-[95%] mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-block mb-6">
            <div className="w-16 h-px bg-gray-400 mx-auto mb-4" />
            <h2 className="text-sm font-light uppercase tracking-widest text-gray-500 mb-3">
              Our Team
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-light text-black tracking-tight mb-4">
              Meet Our Experts
            </h3>
            <div className="w-16 h-px bg-gray-400 mx-auto" />
          </div>
          <motion.p 
            className="text-gray-600 text-lg font-light max-w-2xl mx-auto mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            A collective of passionate architects, designers, and engineers dedicated to creating exceptional spaces.
          </motion.p>
        </motion.div>

        {/* Team Members Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay, EffectCoverflow]}
            spaceBetween={40}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 30
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 40
              }
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: '.team-swiper-next',
              prevEl: '.team-swiper-prev',
            }}
            effect={'coverflow'}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 0,
              modifier: 1,
              slideShadows: false,
            }}
            loop={true}
            centeredSlides={false}
            className="pb-12"
          >
            {teamMembers.map((member, index) => (
              <SwiperSlide key={member.id}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer h-full"
                >
                  <div className="bg-white border border-gray-200 rounded-none shadow-sm hover:shadow-xl transition-all duration-500 h-full mx-auto max-w-sm overflow-hidden">
                    {/* Image Container */}
                    <div className="h-80 overflow-hidden relative">
                      <motion.div 
                        className="w-full h-full bg-gray-200"
                        style={{ 
                          backgroundImage: `url(${member.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.7 }}
                      />
                      
                      {/* Overlay with Social Links */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-end justify-center pb-6">
                        <motion.div 
                          className="flex space-x-3 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                          initial={{ scale: 0.8 }}
                          whileHover={{ scale: 1 }}
                        >
                          {Object.entries(member.social).map(([platform, url]) => (
                            <motion.a
                              key={platform}
                              href={url}
                              className="w-10 h-10 bg-white/95 backdrop-blur-sm rounded-sm flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 border border-gray-300"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              aria-label={`Connect with ${member.name} on ${platform}`}
                            >
                              {platform === 'linkedin' ? (
                                <Linkedin size={16} />
                              ) : (
                                <Mail size={16} />
                              )}
                            </motion.a>
                          ))}
                        </motion.div>
                      </div>

                      {/* Member Number */}
                      <div className="absolute top-4 left-4">
                        <span className="text-6xl font-light text-black/10">
                          {String(member.id).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 text-center">
                      <motion.h4 
                        className="text-xl font-normal text-black mb-2 tracking-wide"
                        whileHover={{ color: "#666" }}
                        transition={{ duration: 0.3 }}
                      >
                        {member.name}
                      </motion.h4>
                      <p className="text-gray-600 text-sm mb-3 font-light tracking-wide leading-relaxed">
                        {member.role}
                      </p>
                      <div className="w-8 h-px bg-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm font-light tracking-wide">
                        {member.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Enhanced Navigation Buttons */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <motion.button 
              className="team-swiper-prev w-12 h-12 bg-white border border-gray-300 rounded-sm flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300 shadow-sm group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
            </motion.button>
            
            <motion.button 
              className="team-swiper-next w-12 h-12 bg-white border border-gray-300 rounded-sm flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300 shadow-sm group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          </div>
        </div>

        {/* Team Stats */}

      </div>
    </section>
  );
};

export default Team;