'use client'
import { useState } from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Twitter, Send } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const navigationLinks = [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
  ];

  const services = [
    "Architecture",
    "Interior Design",
    "Urban Planning",
    "Heritage Conservation",
    "Project Management",
  ];

  const socialLinks = [
    { Icon: Facebook, href: "https://www.facebook.com/DeraConsultants", label: "Facebook" },
    { Icon: Instagram, href: "https://instagram.com/dera.consultants", label: "Instagram" },
    { Icon: Linkedin, href: "https://linkedin.com/company/dera-consultants", label: "LinkedIn" },
    { Icon: Twitter, href: "https://twitter.com/deraconsultants", label: "Twitter" },
  ];

  const locations = [
    { 
      city: "Mathura", 
      state: "Uttar Pradesh",
      address: "30-B Geeta Enclave, Krishna Nagar, Mathura, 281001"
    },
    { 
      city: "Ahmedabad", 
      state: "Gujarat",
      address: "Coming Soon"
    }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the email to your backend
      console.log('Subscribing email:', email);
      setIsSubscribed(true);
      setEmail('');
      // Reset subscription message after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 mt-20 pt-16 w-[95%] lg:w-full mx-auto rounded-t-2xl shadow-lg">
      <div className="px-6 lg:px-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <h3 className="text-2xl font-bold text-black tracking-tight">
                DCPL
              </h3>
            </div>
            
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              Architecture shaped by context, culture & craft. Creating timeless
              spaces that honor heritage while embracing innovation since 2011.
            </p>

            <div className="space-y-4 text-sm mb-6">
              <a 
                href="https://maps.google.com/?q=30-B Geeta Enclave, Krishna Nagar, Mathura, 281001" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start text-gray-600 hover:text-black transition-colors group"
              >
                <MapPin className="w-4 h-4 mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span>30-B Geeta Enclave, Krishna Nagar, Mathura, 281001</span>
              </a>
              <a 
                href="tel:+917351077666"
                className="flex items-center text-gray-600 hover:text-black transition-colors group"
              >
                <Phone className="w-4 h-4 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>+91 7351077666</span>
              </a>
              <a 
                href="mailto:office@dera.co.in"
                className="flex items-center text-gray-600 hover:text-black transition-colors group"
              >
                <Mail className="w-4 h-4 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>office@dera.co.in</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white shadow-sm hover:bg-black hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label={`Visit our ${social.label}`}
                >
                  <social.Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-black mb-6 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-black transform translate-y-1"></span>
            </h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-black hover:pl-2 transition-all duration-300 inline-block group"
                  >
                    <span className="group-hover:underline">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-black mb-6 relative inline-block">
              Our Services
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-black transform translate-y-1"></span>
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <div className="text-gray-600 hover:text-black hover:translate-x-2 transition-all duration-300 cursor-default flex items-center">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                    {service}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-black mb-6 relative inline-block">
              Stay Connected
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-black transform translate-y-1"></span>
            </h4>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              Get updates on our latest projects and architectural insights. No spam, just inspiration.
            </p>
            
            {isSubscribed ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-green-700 text-sm font-medium">
                  Thank you for subscribing!
                </p>
                <p className="text-green-600 text-xs mt-1">
                  Welcome to the DCPL community.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <Send className="w-4 h-4" />
                  Subscribe
                </button>
              </form>
            )}
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-xs text-blue-700 text-center">
                Join 5,000+ architects and design enthusiasts
              </p>
            </div>
          </div>
        </div>

        {/* Office Locations */}
        <div className="border-t border-gray-300 pt-12 mb-12">
          <h4 className="text-lg font-semibold text-black mb-8 text-center">
            Our Office Locations
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {locations.map((location, index) => (
              <div 
                key={index} 
                className="group cursor-pointer p-6 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 border border-gray-200 bg-white/50"
              >
                <div className="text-center">
                  <div className="font-semibold text-gray-800 group-hover:text-black text-lg mb-2">
                    {location.city}
                  </div>
                  <div className="text-gray-500 text-sm group-hover:text-gray-700 mb-3">
                    {location.state}
                  </div>
                  <div className={`text-xs ${location.address === 'Coming Soon' ? 'text-gray-400 italic' : 'text-gray-600'} group-hover:text-gray-700 leading-relaxed`}>
                    {location.address}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 pt-6 pb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div className="text-gray-600 text-center md:text-left">
              © {new Date().getFullYear()} Dera Consultants Pvt. Ltd. (DCPL). All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <a 
                href="/privacy" 
                className="text-gray-500 hover:text-black transition-colors hover:underline"
              >
                Privacy Policy
              </a>
              <a 
                href="/terms" 
                className="text-gray-500 hover:text-black transition-colors hover:underline"
              >
                Terms of Service
              </a>
              <a 
                href="/sitemap" 
                className="text-gray-500 hover:text-black transition-colors hover:underline"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;