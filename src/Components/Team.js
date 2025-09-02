'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "AR. MAYANK GARG",
      role: " MANAGING DIRECTOR/ CHIEF ARCHITECt",
      image: "../assets/team1.jpg",
      description: "B.ARCH / M.PLAN ",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#"
      }
    },
    {
      id: 2,
      name: " AR. ANAND THAKKAR",
      role: "DIRECTOR/ HEAD PLANNING CELL",
      image: "../assets/team2.jpg",
      description: "B.ARCH / M.PLAN ",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#"
      }
    },
    {
      id: 3,
      name: "SHRUTI GAUTAM",
      role: "SENIOR ARCHITECT",
      image: "../assets/team3.jpg",
      description: "B.ARCH / M.PLAN,  + 8 YRS EXP",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#"
      }
    },
    {
      id: 4,
      name: "ABHISHEK ARORA",
      role: "STRUCTURAL CONSULTANT",
      image: "../assets/team1.jpg",
      description: "B.TECH / M.TECH +7 YRS EXP",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#"
      }
    },
    {
      id: 5,
      name: "HIRDESH SHARMA",
      role: "ASSOCIATE ARCHITECT/LEED GRIHA EXPERT",
      image: "../assets/team2.jpg",
      description: "B.ARCH +15 YRS EXP",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#"
      }
    },
    {
      id: 6,
      name: "AKSHAY KUMAR",
      role: "ARCHITECT PLANNER",
      image: "../assets/team1.jpg",
      description: "B.ARCH / M.PLAN+ 3 YRS EXP",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#"
      }
    },
    {
      id: 7,
      name: "RIDHI ACHARAYA",
      role: "JUNIOR ARCHITECT",
      image: "../assets/team3.jpg",
      description: "B.ARCH +1 YR EXP",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#"
      }
    },
    {
      id: 8,
      name: "DEENDAYAL SHARMA",
      role: "SENIOR MANAGER",
      image: "../assets/team2.jpg",
      description: "BE +10 YRS EXP",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#"
      }
    },
    {
      id: 9,
      name: "HRITIKA",
      role: "JUNIOR ARCHITECT",
      image: "../assets/team3.jpg",
      description: "B.ARCH +1 YR EXP",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#"
      }
    }
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background elements for visual interest */}
      {/* <div className="absolute top-0 left-0 w-72 h-72 bg-gray-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-30"></div> */}
      
      <div className="w-[95%] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-sm md:text-base font-medium uppercase tracking-widest text-gray-500 mb-3">
            OUR TEAM
          </h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Experts
          </h3>
          <div className="w-16 h-0.5 bg-gray-800 mx-auto"></div>
        </div>

        {/* Team Members Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay, EffectCoverflow]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 30
              }
            }}
            autoplay={{
              delay: 3000,
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
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            loop={true}
            centeredSlides={true}
            className="pb-8"
          >
            {teamMembers.map((member) => (
              <SwiperSlide key={member.id}>
                <div className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-500 h-full mx-auto max-w-sm">
                  {/* Image Container with Parallax Effect */}
                  <div className="h-72 overflow-hidden relative">
                    <div 
                      className="w-full h-full bg-gray-200 transition-transform duration-700 group-hover:scale-110"
                      style={{ 
                        backgroundImage: `url(${member.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    ></div>
                    {/* Social Links - Appear on Hover */}
                    <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-500 flex items-end justify-center pb-4">
                      <div className="flex space-x-3 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                        {Object.entries(member.social).map(([platform, url]) => (
                          <a
                            key={platform}
                            href={url}
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-gray-100"
                            aria-label={`${member.name} ${platform}`}
                          >
                            <span className="text-gray-800 text-lg">
                              {platform === 'linkedin' ? 'in' : platform === 'twitter' ? '𝕏' : 'ig'}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 text-center">
                    <h4 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h4>
                    <p className="text-gray-600 text-sm mb-3">{member.role}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{member.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button className="team-swiper-prev w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-300 shadow-md">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button className="team-swiper-next w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-300 shadow-md">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;