import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const navigationLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Gallery", href: "#gallery" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ];

  const services = [
    "Architecture",
    "Interior Design",
    "Urban Planning",
    "Heritage Conservation",
    "Project Management",
  ];

  return (
    <footer className="bg-gray-50 mt-20 pt-16 w-[95%] lg:w-full mx-auto rounded-t-2xl shadow-inner">
      <div className="px-6 lg:px-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-black mb-6 tracking-tight">
              DCPL
            </h3>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              Architecture shaped by context, culture & craft. Creating timeless
              spaces that honor heritage while embracing innovation since 2011.
            </p>

            <div className="space-y-4 text-sm">
              <div className="flex items-center text-gray-600 hover:text-black transition-colors">
                <MapPin className="w-4 h-4 mr-3 flex-shrink-0" />
                <span>Head Office: Mathura, UP</span>
              </div>
              <div className="flex items-center text-gray-600 hover:text-black transition-colors">
                <Phone className="w-4 h-4 mr-3 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center text-gray-600 hover:text-black transition-colors">
                <Mail className="w-4 h-4 mr-3 flex-shrink-0" />
                <span>info@dcpl.co.in</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-6">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-full bg-gray-200 hover:bg-black hover:text-white transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold text-black mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-black hover:pl-1 transition-all duration-300 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-semibold text-black mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li
                  key={service}
                  className="text-gray-600 hover:text-black hover:translate-x-1 transition-transform duration-300"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-semibold text-black mb-6">Stay Connected</h4>
            <p className="text-gray-600 text-sm mb-4">
              Get updates on our latest projects and architectural insights.
            </p>
            <form className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Office Locations */}
        <div className="border-t border-gray-300 pt-12 mb-12">
          <h4 className="text-lg font-semibold text-black mb-6 text-center">
            Our Locations
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { city: "Mathura", state: "Uttar Pradesh" },
              { city: "Ahmedabad", state: "Gujarat" },
              { city: "Prayagraj", state: "Uttar Pradesh" },
              { city: "Jabalpur", state: "Madhya Pradesh" },
            ].map((location, index) => (
              <div key={index} className="text-sm">
                <div className="font-medium text-gray-800">{location.city}</div>
                <div className="text-gray-500">{location.state}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 pt-6 text-center text-sm text-gray-500">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              © {new Date().getFullYear()} Dera Consultants Pvt. Ltd. (DCPL). All
              rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-black transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-black transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
