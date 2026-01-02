// app/services/ServicesClient.js
'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup, useScroll, useTransform } from 'framer-motion';
import ServiceCard from '../../Components/ServiceCard';
import ProjectCarousel from '../../Components/ProjectCarousel';
import Image from 'next/image';
import Link from 'next/link';

export default function ServicesClient() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const detailsSectionRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);

  // Service images mapping
  const serviceImages = {
    'Architecture': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop',
    'Urban Design': 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w-1200&auto=format&fit=crop',
    'Interior Design': 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&auto=format&fit=crop',
    'Landscape Design': 'https://images.unsplash.com/photo-1573497161163-c293a4b3f8e2?w=1200&auto=format&fit=crop',
    'Master Planning': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop',
    'Sustainable Design': 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&auto=format&fit=crop',
    'Heritage Conservation': 'https://images.unsplash.com/photo-1641803189124-91775ae91171?q=80&w=1133&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Project Management': 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/services');
      const data = await response.json();

      if (data.success) {
        // Add images to services
        const servicesWithImages = data.data.map(service => ({
          ...service,
          image: serviceImages[service.title] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop'
        }));
        setServices(servicesWithImages);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleServiceClick = async (service) => {
    if (isAnimating || selectedService?._id === service._id) return;

    setIsAnimating(true);

    // Set the new selected service
    setSelectedService(service);

    // Scroll to details section with smooth animation
    setTimeout(() => {
      if (detailsSectionRef.current) {
        const yOffset = -100; // Adjust this value as needed
        const y = detailsSectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    }, 100); // Small delay to ensure DOM is updated

    // Reset animation state
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleCloseDetails = () => {
    setIsAnimating(true);
    setSelectedService(null);

    // Scroll back to services grid
    const servicesGrid = document.querySelector('#services-grid');
    if (servicesGrid) {
      window.scrollTo({
        top: servicesGrid.offsetTop - 100,
        behavior: 'smooth'
      });
    }

    setTimeout(() => setIsAnimating(false), 400);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6556D5]/5 to-[#51B873]/5">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-16 w-16 border-4 border-[#6556D5]/30 border-t-[#6556D5] border-r-[#51B873]"
        />
      </div>
    );
  }

  return (
    <LayoutGroup>
      <div className="min-h-screen bg-white">
        {/* === BANNER IMAGE SECTION - 80vh Height === */}
        <div className="relative h-[85vh] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{ y, scale }}
          >
            <img
              src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop"
              alt="Projects Header"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center"
            style={{ opacity }}
          >
            <div className="max-w-7xl mx-auto px-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              >
                <motion.div
                  className="inline-flex items-center space-x-3 mb-8 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="w-8 h-0.5 bg-gradient-to-r from-[#6455D1] to-white"></div>
                  <span className="text-white/90 font-light tracking-[0.2em] text-sm">SERVICES</span>
                </motion.div>
                <h1 className="text-7xl lg:text-8xl font-light text-white mb-6 tracking-tight">
                  Design <br />
                  <span className="font-normal text-white bg-clip-text">
                    Services
                  </span>
                </h1>

                <motion.p
                  className="text-white/80 font-light text-lg max-w-2xl leading-relaxed mb-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Comprehensive architectural solutions that blend innovation, functionality, and aesthetic excellence.
                </motion.p>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <div className="flex flex-col items-center">
              <span className="text-white/60 font-light text-sm mb-2 tracking-wider">EXPLORE</span>
              <motion.div
                className="w-[1px] h-16 bg-gradient-to-b from-white/80 to-transparent"
                animate={{ height: [16, 32, 16] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </div>
          </motion.div>
        </div>
        {/* === END BANNER SECTION === */}

        {/* Services Section - Always visible */}
        <section id="services-grid" className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#6556D5] to-[#51B873] mx-auto"></div>
          </motion.div>

          {/* Services Grid - Always shown */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                layoutId={`service-${service._id}`}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="cursor-pointer relative"
                onClick={() => handleServiceClick(service)}
              >
                {/* Highlight border for selected service */}
                {selectedService?._id === service._id && (
                  <motion.div
                    layoutId="selected-border"
                    className="absolute inset-0 rounded-2xl border-2 border-[#6556D5] z-10"
                    initial={false}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                )}

                <ServiceCard
                  service={service}
                  isSelected={selectedService?._id === service._id}
                  brandColors={{ primary: '#6556D5', secondary: '#51B873' }}
                />
              </motion.div>
            ))}
          </div>

          {/* Details Section - Shows expanded view below grid */}
          <AnimatePresence mode="wait">
            {selectedService && (
              <motion.div
                key={`details-${selectedService._id}`}
                ref={detailsSectionRef}
                initial={{ opacity: 0, y: 50 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                  transition: { duration: 0.3 }
                }}
                className="relative"
              >
                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={handleCloseDetails}
                  className="flex items-center gap-3 mb-8 group sticky top-20 z-10 bg-white/80 backdrop-blur-sm py-2 px-4 rounded-lg w-fit"
                  whileHover={{ x: -5 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6556D5]/10 to-[#51B873]/10 flex items-center justify-center group-hover:from-[#6556D5]/20 group-hover:to-[#51B873]/20 transition-all"
                  >
                    <svg
                      className="w-6 h-6 text-[#6556D5] group-hover:text-[#6556D5]/80"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.div>
                  <span className="text-gray-600 group-hover:text-gray-900 font-medium transition-colors">
                    Back to All Services
                  </span>
                </motion.button>

                {/* Selected Service Details Card */}
                <motion.div
                  layoutId={`details-${selectedService._id}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 280,
                      damping: 20
                    }
                  }}
                  className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
                >
                  {/* Brand Color Gradient Header */}
                  <div className="h-2 bg-gradient-to-r from-[#6556D5] via-[#6556D5]/80 to-[#51B873]"></div>

                  <div className="p-8 md:p-12 relative">
                    {/* Animated Background Elements */}
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{
                        scale: 1,
                        rotate: 0,
                        transition: {
                          type: "spring",
                          stiffness: 200,
                          delay: 0.3
                        }
                      }}
                      className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-bl from-[#6556D5]/5 to-transparent rounded-full blur-xl"
                    />

                    <div className="relative z-10">
                      <div className="flex flex-col lg:flex-row gap-10 items-start">
                        {/* Service Image with Brand Colors - Replaces letter icon */}
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{
                            scale: 1,
                            rotate: 0,
                            transition: {
                              type: "spring",
                              stiffness: 200,
                              damping: 15,
                              delay: 0.4
                            }
                          }}
                          className="flex-shrink-0 w-full lg:w-1/3"
                        >
                          <div className="relative group">
                            {/* Service Image */}
                            <div className="relative w-full h-64 lg:h-80 rounded-2xl overflow-hidden shadow-xl">
                              <img
                                src={selectedService.image}
                                alt={selectedService.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                              {/* Service Title Overlay */}
                              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                                <div className="text-white">
                                  <motion.h3
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="text-2xl font-bold mb-2"
                                  >
                                    {selectedService.title}
                                  </motion.h3>
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-1 bg-gradient-to-r from-[#6556D5] to-[#51B873]"></div>
                                    <span className="text-sm text-white/80">Expert Service</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Decorative Border */}
                            {/* <motion.div
                              animate={{
                                rotate: 360,
                                scale: [1, 1.05, 1]
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear"
                              }}
                              className="absolute inset-0 rounded-2xl border-2 border-[#6556D5]/30"
                            /> */}
                          </div>

                          {/* Quick Stats */}
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="mt-6 grid grid-cols-2 gap-4"
                          >
                            <div className="bg-gradient-to-br from-[#6556D5]/5 to-[#51B873]/5 p-4 rounded-xl">
                              <div className="text-2xl font-bold text-[#6556D5]">25+</div>
                              <div className="text-sm text-gray-600">Projects</div>
                            </div>
                            <div className="bg-gradient-to-br from-[#6556D5]/5 to-[#51B873]/5 p-4 rounded-xl">
                              <div className="text-2xl font-bold text-[#51B873]">15+</div>
                              <div className="text-sm text-gray-600">Years Exp</div>
                            </div>
                          </motion.div>
                        </motion.div>

                        {/* Service Details */}
                        <div className="flex-1">
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mb-8"
                          >
                            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-[#6556D5]/10 to-[#51B873]/10">
                              <div className="w-2 h-2 rounded-full bg-[#6556D5]"></div>
                              <span className="text-sm font-medium text-[#6556D5]">Specialized Service</span>
                            </div>

                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                              {selectedService.title}
                            </h3>
                          </motion.div>

                          <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-lg text-gray-700 mb-8 leading-relaxed bg-gradient-to-r from-gray-50 to-transparent p-6 rounded-xl border-l-4 border-[#6556D5]"
                          >
                            {selectedService.description}
                          </motion.p>

                          {/* Features/Highlights with Brand Accents */}
                          {selectedService.features && selectedService.features.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.7, staggerChildren: 0.1 }}
                              className="mt-10"
                            >
                              <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                                <div className="w-8 h-1 bg-gradient-to-r from-[#6556D5] to-[#51B873]"></div>
                                Key Features & Benefits
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {selectedService.features.map((feature, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.8 + index * 0.1 }}
                                    className="group"
                                  >
                                    <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gradient-to-r hover:from-[#6556D5]/5 hover:to-[#51B873]/5 transition-all duration-300 border border-gray-100 hover:border-[#6556D5]/20">
                                      <div className="flex-shrink-0 mt-1">
                                        <motion.div
                                          whileHover={{ scale: 1.2, rotate: 5 }}
                                          className="w-8 h-8 rounded-full bg-gradient-to-r from-[#6556D5] to-[#51B873] flex items-center justify-center shadow-sm"
                                        >
                                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                          </svg>
                                        </motion.div>
                                      </div>
                                      <div>
                                        <span className="text-gray-700 group-hover:text-gray-900 transition-colors font-medium">
                                          {feature}
                                        </span>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}

                          {/* Service Process */}
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="mt-12 pt-8 border-t border-gray-100"
                          >
                            <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                              <div className="w-8 h-1 bg-gradient-to-r from-[#6556D5] to-[#51B873]"></div>
                              Our Process
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              {['Consultation', 'Design', 'Development', 'Delivery'].map((step, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 1.1 + index * 0.1 }}
                                  whileHover={{ y: -5 }}
                                  className="text-center p-4 rounded-lg bg-gradient-to-b from-white to-gray-50 border border-gray-100 hover:border-[#6556D5]/30 transition-all"
                                >
                                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#6556D5]/10 to-[#51B873]/10 flex items-center justify-center mx-auto mb-3">
                                    <span className="text-lg font-bold text-[#6556D5]">{index + 1}</span>
                                  </div>
                                  <div className="font-medium text-gray-900">{step}</div>
                                  <div className="text-sm text-gray-600 mt-1">Phase {index + 1}</div>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Related Projects Section */}
                {selectedService.projects && selectedService.projects.length > 0 && (
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2, type: "spring", stiffness: 100 }}
                    className="mt-20"
                  >
                    <motion.h4
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.3 }}
                      className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 mb-8 flex items-center gap-3"
                    >
                      <div className="w-8 h-1 bg-gradient-to-r from-[#6556D5] to-[#51B873]"></div>
                      Related Projects
                    </motion.h4>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 }}
                    >
                      <ProjectCarousel
                        projects={selectedService.projects}
                        brandColors={{ primary: '#6556D5', secondary: '#51B873' }}
                      />
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA Section */}
          {!selectedService && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-24 text-center"
            >
              <div className="bg-gradient-to-br from-[#6556D5]/5 via-white to-[#51B873]/5 rounded-3xl p-12 border border-gray-100">
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
                  Ready to Start Your Project?
                </h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Let&apos;s discuss how our services can bring your vision to life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-[#6556D5] to-[#51B873] text-white rounded-xl font-semibold hover:shadow-xl transition-shadow"
                  >
                    Get in Touch
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-[#6556D5] hover:text-[#6556D5] transition-colors"
                  >
                    <Link href="/Projects">
                      View All Projects
                    </Link>

                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </section>
      </div>
    </LayoutGroup>
  );
}