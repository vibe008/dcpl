"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  X,
  ChevronRight,
  MessageSquare,
  Briefcase,
  Phone,
  BookOpen,
  Layers,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [services, setServices] = useState([]);
  const pathname = usePathname();
  const dropdownRef = useRef(null);
  const servicesDropdownRef = useRef(null);

  // Track scroll to apply subtle styling changes
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        if (data.success) {
          setServices(data.data);
        }
      } catch (error) {
        console.error("Error fetching services for navbar:", error);
      }
    };
    fetchServices();
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
        setIsServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { name: "About", path: "/About" },
    { name: "Services", path: "/Services" },
    { name: "Careers", path: "/Careers" },
    { name: "Contact", path: "/Contact" },
  ];

  return (
    <>
      {/* Top Fixed Floating Container */}
      <header
        className={`fixed top-6 left-0 right-0 z-50 px-4 w-full transition-all duration-500 transform ${
          isScrolled ? "translate-y-[-4px]" : "translate-y-0"
        }`}
      >
        <div className="max-w-5xl mx-auto">
          {/* Floating Pill Navbar */}
          <div className="bg-[#121411]/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2.5 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-white/15">
            {/* Logo & Geometric Emblem */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#4e6149]/40 to-[#2c3829]/60 border border-white/10 group-hover:border-white/20 transition-all duration-300">
                {/* Elegant Geometric Leaf/Emblem */}
                {/* <svg className="w-4 h-4 text-white/90 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M5.315 7.685l13.37 13.37m0-13.37L5.315 21.055" />
                                </svg> */}
                <img
                  src="/assets/logo.png"
                  alt="DERA Logo"
                  className="w-full h-full object-contain rounded-[50%] "
                />
              </div>
              <span className="derahading text-white font-bold tracking-[0.25em] text-xs md:text-sm uppercase font-[Satoshi]">
                DERA
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              {/* Projects Dropdown Trigger */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`text-gray-300 hover:text-white transition-colors duration-200 text-xs font-medium uppercase tracking-[0.15em] flex items-center gap-1.5 focus:outline-none py-1.5 ${
                    pathname.startsWith("/Projects") ? "text-white" : ""
                  }`}
                >
                  Projects
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${
                      isDropdownOpen ? "rotate-180 text-white" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      onMouseLeave={() => setIsDropdownOpen(false)}
                      className="absolute left-1/2 transform -translate-x-1/2 mt-3 w-56 bg-[#161815] border border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-2xl z-50"
                    >
                      <Link
                        href="/Projects"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center justify-between px-4 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 text-xs font-medium tracking-wider transition-all duration-150 border-b border-white/5"
                      >
                        All Projects
                      </Link>
                      {services.map((service) => (
                        <Link
                          key={service._id}
                          href={`/Projects?service=${encodeURIComponent(service.title)}`}
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center justify-between px-4 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 text-xs font-medium tracking-wider transition-all duration-150"
                        >
                          {service.title}
                          <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Standard Nav Links */}
              {menuItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`text-gray-300 hover:text-white transition-colors duration-200 text-xs font-medium uppercase tracking-[0.15em] py-1.5 ${
                      isActive ? "text-white border-b border-white/20" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* CTA button (Desktop) & Hamburger menu (Mobile) */}
            <div className="flex items-center space-x-4">
              {/* Get Quote button (Desktop) */}
              <Link
                href="/Contact"
                className="hidden lg:inline-flex items-center justify-center bg-[#6455D1] hover:bg-[#5143c6] text-white rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(100,85,209,0.3)]"
              >
                Get Quote
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all focus:outline-none"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? (
                  <X size={16} />
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu Slide-over */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 h-full w-full max-w-sm bg-[#121411] border-l border-white/10 flex flex-col justify-between shadow-2xl p-8"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-lg overflow-hidden bg-gradient-to-br from-[#6455D1]/40 to-[#4e3fa3]/60 border border-white/10 flex items-center justify-center">
                      <img
                        src="/assets/logo.png"
                        alt="DERA Logo"
                        className="w-full h-full object-contain rounded-[50%]"
                      />
                    </div>
                    <span className="derahading text-white font-bold tracking-[0.2em] text-xs uppercase">
                      DERA
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Main Links */}
                <nav className="mt-8 space-y-6">
                  <div className="space-y-3">
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.25em] font-semibold">
                      Projects by Service
                    </p>
                    <div className="grid grid-cols-1 gap-2 pl-2 border-l border-white/5">
                      <Link
                        href="/Projects"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors py-1"
                      >
                        <Layers className="w-3.5 h-3.5 text-[#6455D1]" />
                        All Projects
                      </Link>
                      {services.map((service, i) => (
                        <Link
                          key={i}
                          href={`/Projects?service=${encodeURIComponent(service.title)}`}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors py-1"
                        >
                          <Layers className="w-3.5 h-3.5 text-[#6455D1]" />
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.25em] font-semibold">
                      Pages
                    </p>
                    <div className="space-y-1">
                      {menuItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.path}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center justify-between text-base text-gray-300 hover:text-white py-3 border-b border-white/5"
                        >
                          {item.name}
                          <ChevronRight size={16} className="text-gray-600" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </nav>
              </div>

              {/* Bottom CTA Block */}
              <div className="space-y-4">
                <Link
                  href="/Contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center bg-[#6455D1] hover:bg-[#5143c6] text-white rounded-full py-3 text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-300"
                >
                  Get Quote
                </Link>

                <div className="flex justify-between items-center text-[10px] text-gray-600 uppercase tracking-widest pt-4 border-t border-white/5">
                  <span>© {new Date().getFullYear()} Dera Consultants</span>
                  <Link
                    href="/admin/login"
                    className="hover:text-white transition-colors"
                  >
                    Admin
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
