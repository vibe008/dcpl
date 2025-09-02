import { MapPin, Phone, Mail } from "lucide-react";

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
    <footer className="bg-white mt-20 pb-10 pt-16 w-[95%] lg:w-full mx-auto">
      <div className="px-6 lg:px-12">
        {/* Main Footer Content */}
        <div className="flex flex-wrap lg:flex-nowrap justify-between gap-10 mb-16">
          {/* Company Info */}
          <div className="w-full sm:w-[50%] lg:w-[25%]">
            <h3
              style={{ fontWeight: 500, lineHeight: "120%" }}
              className="text-lg lg:text-2xl font-semibold text-black mb-6"
            >
              DCPL
            </h3>
            <p
              style={{ fontWeight: 500, lineHeight: "150%" }}
              className="text-gray-500 text-sm lg:text-base mb-6"
            >
              Architecture shaped by context, culture & craft. Creating timeless
              spaces that honor heritage while embracing innovation since 2011.
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-3 flex-shrink-0" />
                <span>Head Office: Mathura, UP</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-3 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-3 flex-shrink-0" />
                <span>info@dcpl.co.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full sm:w-[50%] lg:w-[25%] text-center lg:text-left">
            <h4
              style={{ fontSize: "1.25rem", fontWeight: 500, lineHeight: "120%" }}
              className="text-lg font-semibold text-black mb-6"
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <a
                    style={{ fontSize: ".875rem", fontWeight: 500 }}
                    href={link.href}
                    className="text-gray-500 hover:text-black transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="w-full sm:w-[50%] lg:w-[25%]">
            <h4
              style={{ fontSize: "1.25rem", fontWeight: 500, lineHeight: "120%" }}
              className="text-lg font-semibold text-black mb-6 text-center lg:text-left"
            >
              Our Services
            </h4>
            <ul className="space-y-3 text-center lg:text-left">
              {services.map((service) => (
                <li
                  style={{ fontSize: ".875rem", fontWeight: 500 }}
                  key={service}
                  className="text-gray-500"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Office Locations */}
        <div className="border-t border-gray-200 pt-12 mb-12">
          <h4 className="text-lg font-semibold text-black mb-6 text-center">
            Our Locations
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { city: "Mathura", state: "Uttar Pradesh" },
              { city: "Ahmedabad", state: "Gujarat" },
              { city: "Prayagraj", state: "Uttar Pradesh" },
              { city: "Jabalpur", state: "Madhya Pradesh" },
            ].map((location, index) => (
              <div key={index} className="text-sm">
                <div className="font-medium text-gray-600">{location.city}</div>
                <div className="text-gray-500">{location.state}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              © 2024 Dera Consultants Pvt. Ltd. (DCPL). All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="hover:text-black transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-black transition-colors duration-300"
              >
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
