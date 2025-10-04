"use client";
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [ "Projects", "Gallery", "Careers",  "Contact"];

  return (
    <header className="w-full z-50 bg-white  ">
      <div className="w-[95%] m-auto flex items-center justify-between py-4">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold text-black cursor-pointer"><Link href="/">DCPL</Link></h1>
        </div>

        {/* Desktop Nav Links - Hidden on mobile */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link}
              href={link === "Careers" ? "/Careers" : link === "Projects" ? "/Projects" : link === "Gallery" ? "/Portfolio" : link === "Contact" ? "/Contact" : link === "About" ? "/About" : `#${link}`}
              className="text-sm font-medium text-gray-700 hover:text-black transition cursor-pointer"
            >
              {link}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button - Visible only on mobile */}
        <button
          className="md:hidden flex flex-col space-y-1.5 z-50"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-black transition duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-black transition duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`w-6 h-0.5 bg-black transition duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={toggleMenu}></div>

        {/* Mobile Menu Content */}
        <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full pt-20 px-6">
            {navLinks.map((link) => (
              <Link
                key={link}
                href={link === "Careers" ? "/Careers" : link === "Projects" ? "/Projects" : link === "Gallery" ? "/Portfolio" : link === "Contact" ? "/Contact" : link === "About" ? "/About" : `#${link}`}
                className="py-4 text-lg font-medium text-gray-700 hover:text-black transition border-b border-gray-100"
                onClick={toggleMenu}
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}