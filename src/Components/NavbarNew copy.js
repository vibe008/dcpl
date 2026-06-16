'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { usePathname } from "next/navigation";
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [animateItems, setAnimateItems] = useState(false);
    const pathname = usePathname();
    let colour = pathname === "/" ? "white" : "#6455D1"
    // Handle scroll for sticky effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle menu animation
    useEffect(() => {
        if (isOpen) {
            // Start animation after menu opens
            setTimeout(() => {
                setAnimateItems(true);
            }, 300);
        } else {
            setAnimateItems(false);
        }
    }, [isOpen]);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && !event.target.closest('.navbar-container') && !event.target.closest('.mobile-menu')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const menuItems = [
        { name: 'About', delay: 0, nav: '/About' },
        { name: 'Services', delay: 200, nav: '/Services' },
        { name: 'Projects', delay: 400, nav: '/Projects' },
        { name: 'Careers', delay: 600, nav: '/Careers' },
        { name: 'Contact', delay: 800, nav: '/Contact' },
        { name: 'Admin', delay: 800, nav: '/admin/login' },
    ];

    return (
        <>
            {/* Navigation Bar */}
            <nav className={`navbar-container absolute top-0 left-0 w-full z-50 transition-all duration-500 bg-transparent`}>
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-28">
                        {/* Logo - Even Bigger Size */}
                        <div className="flex-shrink-0 flex items-center">
                            <div className={`transition-all duration-500 ${isScrolled ? 'text-gray-900' : 'text-white'
                                }`}>
                                <div className="flex items-center ">
                                    {/* Massive Logo Image */}
                                    <div className='w-28 h-28 flex items-center justify-center'>
                                        <img
                                            src='/assets/logo.png'
                                            alt="DERA Logo"
                                            className="w-full h-full object-contain rounded-2xl"
                                        />
                                    </div>

                                    {/* Text Content - Modern & Elegant */}
                                    {/* <div className="flex flex-col text-white">
                                        <span className="font-[TrajanPro-Bold] text-[28px] leading-[30px] tracking-[0]">
                                            DERA
                                        </span>
                                        <span className="font-[TrajanPro-Bold] text-[20px] leading-[30px] tracking-[0]">
                                            DCPL
                                        </span>
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        {/* Animated Menu Items Container with Background - DESKTOP */}
                        <div className={`hidden md:flex items-center space-x-1 transition-all duration-500 ${isOpen && animateItems ? 'opacity-100' : 'opacity-0'
                            } bg-black/20 backdrop-blur-sm px-8 py-4 rounded-2xl border border-white/10`}>
                            {menuItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.nav || '/'}
                                    className="nav-link px-6 py-3 text-lg font-semibold relative group transition-all duration-500"
                                    style={{
                                        transitionDelay: `${item.delay}ms`
                                    }}
                                >
                                    {/* Text with Slide Animation - RIGHT TO LEFT */}
                                    <span className={`relative z-10 text-white ${animateItems
                                        ? 'translate-x-0 opacity-100'
                                        : 'translate-x-10 opacity-0'
                                        } transition-all duration-700 block group-hover:text-gray-200`}>
                                        {item.name}
                                    </span>

                                    {/* Underline Animation */}
                                    <div className="absolute bottom-1 left-0 w-full h-0.5 bg-transparent overflow-hidden">
                                        <div className={`absolute bottom-0 left-0 w-0 h-full bg-white transition-all duration-500 group-hover:w-full ${isScrolled ? 'bg-white' : 'bg-white'
                                            } transform group-hover:scale-100 scale-90`}></div>
                                    </div>
                                </a>
                            ))}

                            {/* Login Button */}
                            <a
                                href="#"
                                className="nav-link px-6 py-3 text-lg font-semibold relative group transition-all duration-500"
                                style={{
                                    transitionDelay: '1000ms'
                                }}
                            >
                                <span className={`relative z-10 text-white ${animateItems
                                    ? 'translate-x-0 opacity-100'
                                    : 'translate-x-10 opacity-0'
                                    } transition-all duration-700 block group-hover:text-gray-200`}>
                                    @ Login
                                </span>

                                {/* Underline Animation */}
                                <div className="absolute bottom-1 left-0 w-full h-0.5 bg-transparent overflow-hidden">
                                    <div className={`absolute bottom-0 left-0 w-0 h-full bg-white transition-all duration-500 group-hover:w-full ${isScrolled ? 'bg-white' : 'bg-white'
                                        } transform group-hover:scale-100 scale-90`}></div>
                                </div>
                            </a>
                        </div>

                        {/* Menu Button */}
                        <div className="flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className={`relative w-14 h-14 flex flex-col items-center justify-center transition-all duration-500 `} style={{ color: colour }}
                            >
                                {/* Hamburger to Cross Animation */}
                                <span className={`absolute w-10 h-1 bg-current transition-all duration-500 ${isOpen ? 'rotate-45' : '-translate-y-2'
                                    }`}></span>
                                <span className={`absolute w-10 h-1 bg-current transition-all duration-500 ${isOpen ? 'opacity-0' : 'opacity-100'
                                    }`}></span>
                                <span className={`absolute w-10 h-1 bg-current transition-all duration-500 ${isOpen ? '-rotate-45' : 'translate-y-2'
                                    }`}></span>

                                {/* Menu Text */}
                                <span className={`absolute -bottom-8 text-base font-medium transition-all duration-500 ${isOpen ? 'opacity-0' : 'opacity-100'
                                    }`} style={{ color: colour }}>
                                    MENU
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu - Half Screen with Cross Button */}
                {isOpen && (
                    <div className="fixed inset-0 z-40 md:hidden">
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu Panel - Right Half */}
                        <div className="mobile-menu absolute right-0 top-0 h-full w-4/5 max-w-sm bg-black/95 backdrop-blur-lg border-l border-white/10">
                            {/* Close Button */}
                            <div className="flex justify-end p-6">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-all duration-300"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Menu Items */}
                            <div className="flex flex-col px-8 space-y-6 mt-8">
                                {menuItems.map((item, index) => (
                                    <a
                                        key={item.name}
                                        href="#"
                                        className={`text-2xl font-light text-white transition-all duration-700 transform font-serif py-3 ${animateItems
                                            ? 'translate-x-0 opacity-100'
                                            : 'translate-x-10 opacity-0'
                                            }`}
                                        style={{
                                            transitionDelay: `${item.delay}ms`
                                        }}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </a>
                                ))}

                                {/* Login Button in Mobile Menu */}
                                <a
                                    href="#"
                                    className={`text-2xl font-light text-white transition-all duration-700 transform font-serif py-3 ${animateItems
                                        ? 'translate-x-0 opacity-100'
                                        : 'translate-x-10 opacity-0'
                                        }`}
                                    style={{
                                        transitionDelay: '1000ms'
                                    }}
                                    onClick={() => setIsOpen(false)}
                                >
                                    @ Login
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Custom Styles */}
            <style jsx global>{`
                .nav-link {
                    position: relative;
                    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }

                .nav-link:hover {
                    transform: translateY(-1px);
                }
                
                html {
                    scroll-behavior: smooth;
                }

                /* Smooth font rendering */
                .font-serif {
                    font-family: 'Times New Roman', Times, serif;
                    font-weight: 300;
                    letter-spacing: 2px;
                }
                
                .font-sans {
                    font-family: Arial, Helvetica, sans-serif;
                    font-weight: 300;
                }
                                    ::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                
                ::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                
                ::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #6556D5, #51B873);
                    border-radius: 10px;
                }
                
                ::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, #5a4bc4, #46a668);
                }
                
            `}</style>
        </>
    );
}