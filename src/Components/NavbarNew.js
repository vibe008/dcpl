'use client';

import { useState, useEffect } from 'react';
import { X, ChevronRight, LogIn, Shield } from 'lucide-react';
import { usePathname } from "next/navigation";
import Link from 'next/link';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    const menuItems = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/About' },
        { name: 'Services', path: '/Services' },
        { name: 'Projects', path: '/Projects' },
        { name: 'Careers', path: '/Careers' },
        { name: 'Contact', path: '/Contact' },
    ];

    return (
        <>
            {/* Navbar - Only Logo & Menu Icon */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-5' : 'py-6'
                }`}>
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <Link href="/" className="group">
                            <div className="flex items-center space-x-3  w-[80px] h-[80px] rounded-[50%]">
                                <img
                                    src='/assets/logo.png'
                                    alt="DERA Logo"
                                    className="w-full h-full object-contain rounded-[50%] "
                                />
                            </div>
                        </Link>

                        {/* Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="group relative"
                            aria-label="Toggle menu"
                        >
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${isScrolled
                                ? 'bg-white shadow-sm'
                                : 'bg-white/95 backdrop-blur-sm'
                                } group-hover:shadow-md`}>
                                <div className="relative w-6 h-6">
                                    <span className={`absolute top-0 left-0 w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-2.5' : ''
                                        }`}></span>
                                    <span className={`absolute top-2.5 left-0 w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'
                                        }`}></span>
                                    <span className={`absolute top-5 left-0 w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-2.5' : ''
                                        }`}></span>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Sidebar Menu */}
            <div className={`fixed inset-0 z-[60] transition-all duration-500 ${isMenuOpen
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
                }`}>
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-all duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                    onClick={() => setIsMenuOpen(false)}
                />

                {/* Sidebar Panel - FIXED HEIGHT WITH SCROLL */}
                <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-white transform transition-all duration-500 ease-out flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}>
                    {/* Fixed Header */}
                    <div className="flex-shrink-0 p-6 border-b border-gray-100">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Navigation</h2>
                                <p className="text-sm text-gray-500 mt-1">Select a destination</p>
                            </div>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-300"
                            >
                                <X size={20} className="text-gray-600" />
                            </button>
                        </div>
                    </div>

                    {/* Scrollable Content Area */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="p-6">
                            {/* Main Navigation */}
                            <div className="mb-8">
                                {menuItems.map((item, index) => {
                                    const isActive = item.path === '/'
                                        ? pathname === '/'
                                        : pathname.startsWith(item.path);

                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.path}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="group block py-4 px-2 relative"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <span className="text-sm text-gray-400 font-mono">
                                                        0{index + 1}
                                                    </span>
                                                    <span className={`text-base font-medium transition-all duration-300 ${isActive
                                                        ? 'text-[#6556D5]'
                                                        : 'text-gray-700 group-hover:text-[#6556D5]'
                                                        }`}>
                                                        {item.name}
                                                    </span>
                                                </div>
                                                <ChevronRight className={`w-4 h-4 transition-all duration-300 ${isActive
                                                    ? 'text-[#6556D5]'
                                                    : 'text-gray-300 group-hover:text-[#6556D5]'
                                                    }`} />
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden">
                                                <div className={`absolute bottom-0 left-0 h-full transition-all duration-500 ${isActive
                                                    ? 'w-full bg-[#6556D5]'
                                                    : 'w-0 bg-[#6556D5] group-hover:w-full'
                                                    }`}></div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* Divider */}
                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-3 bg-white text-gray-500 uppercase tracking-wider font-medium">
                                        Account Access
                                    </span>
                                </div>
                            </div>

                            {/* LOGIN AND ADMIN SECTION - NOW VISIBLE */}
                            <div className="space-y-4">
                                {/* Login Button */}
                                <Link
                                    href="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="group flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-[#6556D5] hover:shadow-sm transition-all duration-300 bg-gray-50/50"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-gray-200 group-hover:border-[#6556D5] group-hover:bg-[#6556D5]/5 transition-all duration-300">
                                            <LogIn className="w-5 h-5 text-gray-600 group-hover:text-[#6556D5] transition-all duration-300" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">Login</p>
                                            <p className="text-sm text-gray-500">Sign in to your account</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#6556D5] transition-all duration-300" />
                                </Link>

                                {/* Admin Button */}
                                <Link
                                    href="/admin/login"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="group flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-800 hover:shadow-sm transition-all duration-300 bg-gray-50/50"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-gray-200 group-hover:border-gray-800 group-hover:bg-gray-800/5 transition-all duration-300">
                                            <Shield className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-all duration-300" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">Admin Panel</p>
                                            <p className="text-sm text-gray-500">Administrative dashboard</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-800 transition-all duration-300" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Fixed Footer */}
                    <div className="flex-shrink-0 p-6 border-t border-gray-100 bg-white">
                        <div className="text-center">
                            <p className="text-sm text-gray-600">© {new Date().getFullYear()} DERA Digital</p>
                            <p className="text-xs text-gray-400 mt-1">All rights reserved</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Styles for Scrollbar */}
            <style jsx global>{`
                /* Custom scrollbar for sidebar */
                .overflow-y-auto {
                    scrollbar-width: thin;
                    scrollbar-color: #cbd5e1 #f1f5f9;
                }

                .overflow-y-auto::-webkit-scrollbar {
                    width: 4px;
                }

                .overflow-y-auto::-webkit-scrollbar-track {
                    background: #f1f5f9;
                    border-radius: 2px;
                }

                .overflow-y-auto::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 2px;
                }

                .overflow-y-auto::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }

                html {
                    scroll-behavior: smooth;
                }

                /* Smooth transitions */
                .transition-all {
                    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                }

                /* Selection */
                ::selection {
                    background-color: rgba(101, 86, 213, 0.2);
                }
            `}</style>
        </>
    );
}