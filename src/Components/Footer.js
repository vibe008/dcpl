"use client";
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Send,
  ArrowRight,
  LogIn,
  Shield,
  Building,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const navigationLinks = [
    { label: "About", href: "/About" },
    { label: "Services", href: "/Services" },
    { label: "Projects", href: "/Projects" },
    { label: "Careers", href: "/Careers" },
    { label: "Contact", href: "/Contact" },
  ];

  const socialLinks = [
    {
      Icon: Facebook,
      href: "https://www.facebook.com/share/1C8xXVWiaV/",
      label: "Facebook",
    },
    {
      Icon: Instagram,
      href: "https://www.instagram.com/dera_consultants/?utm_source=qr&r=nametag",
      label: "Instagram",
    },
    {
      Icon: Linkedin,
      href: "https://linkedin.com/company/dera-consultants",
      label: "LinkedIn",
    },
  ];

  const officeAddresses = [
    {
      city: "Mathura",
      state: "Uttar Pradesh",
      address: "30-B Geeta Enclave, Krishna Nagar , Mathura  , Up",
      pincode: "281004",
      phone: "+91 7351077666",
      email: "office@dera.co.in",
    },
    {
      city: "Ahmedabad",
      state: "Gujarat",
      address: "508 Ganesh Glory, Jagatpur Road",
      pincode: "382481",
      phone: "+91 9876543210",
      email: "office@dera.co.in",
    },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3500);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white mt-20 pt-16 w-full border-t border-gray-200">
      <div className="px-6  max-w-7xl mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Company Info - Takes 5 columns */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-[#6455D1]/10 border border-[#6455D1]/20 flex items-center justify-center p-1.5 shadow-sm group-hover:bg-[#6455D1]/20 transition-all duration-300">
                <img
                  src="/assets/logo.png"
                  alt="DERA Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-light text-gray-900 tracking-wide font-[Satoshi]">
                  Dera Consultants Private Limited
                </h3>
              </div>
            </Link>

            <p className="text-gray-600 text-sm leading-relaxed max-w-lg">
              Creating timeless spaces that honor heritage while embracing
              innovation through thoughtful design and sustainable practices.
            </p>

            {/* Contact Info - Horizontal Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-[#6455D1]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-[#6455D1]" />
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium text-sm">Address</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm pl-10 leading-snug">
                  30-B Geeta Enclave, Krishna Nagar, Mathura 281004 UP
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-[#6455D1]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-[#6455D1]" />
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium text-sm">Phone</p>
                  </div>
                </div>
                <a
                  href="tel:+917351077666"
                  className="text-gray-600 text-sm pl-10 hover:text-[#6455D1] hover:underline block font-medium"
                >
                  +91 7351077666
                </a>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-[#6455D1]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-[#6455D1]" />
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium text-sm">Email</p>
                  </div>
                </div>
                <a
                  href="mailto:office@dera.co.in"
                  className="text-gray-600 text-sm pl-10 hover:text-[#6455D1] hover:underline block font-medium truncate"
                >
                  office@dera.co.in
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-4">
              <p className="text-gray-700 font-medium text-sm mb-3">
                Follow Us
              </p>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-[#6455D1] hover:text-white hover:border-[#6455D1] transition-all duration-300 shadow-sm"
                    aria-label={social.label}
                  >
                    <social.Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links - Takes 3 columns */}
          <div className="lg:col-span-3">
            <div className="rounded-xl p-6 h-full">
              <h4 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
                Quick Links
              </h4>
              <ul className="space-y-3.5">
                {navigationLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="flex items-center text-gray-600 hover:text-[#6455D1] transition-colors duration-300 group"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-3 group-hover:bg-[#6455D1] transition-colors"></div>
                      <span className="group-hover:font-medium">
                        {link.label}
                      </span>
                      <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Admin & Newsletter - Takes 4 columns */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm h-full">
              <h4 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
                Admin & Newsletter
              </h4>

              <div className="space-y-4 mb-8">
                {/* Login Button */}
                <Link
                  href="/login"
                  className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-[#6455D1] hover:bg-[#6455D1]/5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6455D1] to-[#8B5CF6] flex items-center justify-center mr-3">
                    <LogIn className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 group-hover:text-[#6455D1]">
                      Login
                    </div>
                    <div className="text-sm text-gray-500">
                      Access your account
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#6455D1] group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Admin Button */}
                <Link
                  href="/admin/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-gray-800 hover:bg-gray-800/5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center mr-3">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 group-hover:text-gray-800">
                      Admin Panel
                    </div>
                    <div className="text-sm text-gray-500">
                      Manage website content
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-800 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Newsletter */}
              <div className="pt-4 border-t border-gray-100">
                <h5 className="text-gray-700 font-semibold text-sm mb-3">
                  Get Project Updates
                </h5>
                {isSubscribed ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <p className="text-green-700 text-sm font-medium">
                      ✓ Subscribed Successfully!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-3">
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#6455D1] focus:ring-2 focus:ring-[#6455D1]/20"
                        required
                      />
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#6455D1] to-[#8B5CF6] text-white px-4 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium text-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      Subscribe to Newsletter
                    </button>
                  </form>
                )}
                <p className="text-gray-500 text-xs mt-3 text-center">
                  Stay updated with our latest architectural projects
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Offices Section - Bottom with Flex */}
        <div className="border-t border-gray-200 pt-8 pb-8">
          <div className="flex items-center mb-6">
            <Building className="w-5 h-5 text-[#6455D1] mr-2" />
            <h4 className="text-lg font-semibold text-gray-900">Our Offices</h4>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {officeAddresses.map((office, index) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex-1 bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-[#6455D1]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#6455D1]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-lg font-semibold text-gray-900">
                        {office.city}
                      </h5>
                      <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
                        {office.state}
                      </span>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-start">
                        <div className="min-w-16 text-gray-500 font-medium">
                          Address:
                        </div>
                        <div className="text-gray-600">
                          {office.address}, {office.pincode}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="min-w-16 text-gray-500 font-medium">
                          Phone:
                        </div>
                        <a
                          href={`tel:${office.phone}`}
                          className="text-gray-600 hover:text-[#6455D1] hover:underline"
                        >
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <div className="min-w-16 text-gray-500 font-medium">
                          Email:
                        </div>
                        <a
                          href={`mailto:${office.email}`}
                          className="text-gray-600 hover:text-[#6455D1] hover:underline"
                        >
                          {office.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="border-t border-gray-200 pt-8 pb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Dera Consultants Pvt. Ltd. All rights
              reserved.
            </div>

            <div className="text-gray-500 text-sm flex items-center">
              <div className="w-1.5 h-1.5 bg-[#6455D1] rounded-full mr-2"></div>
              Crafting architectural excellence since 2011
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
