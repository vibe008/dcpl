'use client';
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import {
  ArrowRight,
  Send,
  MapPin,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  User,
  Building,
  Map,
  Calendar,
  CheckCircle,
  Loader2,
  Heart,
  Sparkles,
  Users,
  Award,
  Briefcase
} from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);

  // Brand Colors (same as CareersPage)
  const primaryColor = '#6556D5';
  const secondaryColor = '#51B873';
  const primaryLight = 'rgba(101, 86, 213, 0.1)';
  const secondaryLight = 'rgba(81, 184, 115, 0.1)';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    const submitToast = toast.loading('Sending message...');

    try {
      // Send data to your API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "", // Optional field
          subject: formData.subject,
          message: formData.message
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Message sent successfully! We\'ll get back to you soon.', {
          id: submitToast,
          duration: 5000
        });

        setIsSubmitted(true);
        
        // Reset form after submission
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: ""
          });
          if (formRef.current) {
            formRef.current.reset();
          }
        }, 3000);
      } else {
        toast.error(data.message || 'Failed to send message. Please try again.', {
          id: submitToast
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Network error. Please check your connection and try again.', {
        id: submitToast
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      details: ["30-B Geeta enclave, Krishna nagar, Mathura, 281001", "508 Ganesh Glory, Jagatpur Road Gota Ahmedabad, Gujarat"],
      link: "https://www.google.com/maps/place/DERA+CONSULTANTS+PRIVATE+LIMITED/@27.4983124,77.6516774,13z/data=!4m6!3m5!1s0x397371537d90b05b:0xa6bfe506ff5bbe22!8m2!3d27.5034704!4d77.663168!16s%2Fg%2F11fqc87ztq?entry=ttu&g_ep=EgoyMDI1MTAwMS4wIKXMDSoASAFQAw%3D%3D",
      linkText: "View on Map"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: ["+917351077666"],
      link: "tel:+917351077666",
      linkText: "Call Now"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: ["office@dera.co.in"],
      link: "mailto:office@dera.co.in",
      linkText: "Send Email"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Working Hours",
      details: ["Mon - Fri: 9:00 - 18:00", "Sat: 10:00 - 16:00", "Sun: Closed"],
      link: null,
      linkText: null
    }
  ];

  const whyChooseUs = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Award-Winning Designs",
      description: "Recognized architectural excellence and industry-leading innovation"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaborative Approach",
      description: "Work directly with our passionate team of architects and designers"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Personalized Solutions",
      description: "Tailored architectural designs that reflect your unique vision"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Timely Delivery",
      description: "Efficient project management ensuring on-time completion"
    }
  ];

  const faqItems = [
    {
      question: "How long does a typical architectural project take?",
      answer: "Project timelines vary based on scope and complexity, but most architectural projects take between 6-18 months from concept to completion, with clear milestones throughout."
    },
    {
      question: "Do you work on residential and commercial projects?",
      answer: "Yes, we specialize in both residential and commercial architecture, with expertise in modern, sustainable, and functional designs for various project types."
    },
    {
      question: "What is your design process?",
      answer: "Our process involves discovery and consultation, conceptual design, design development, detailed documentation, and construction administration to ensure your vision is perfectly realized."
    },
    {
      question: "Can you work within our budget constraints?",
      answer: "Absolutely. We provide transparent cost estimation and work creatively to deliver exceptional architectural solutions that align with your budgetary requirements."
    }
  ];

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#374151',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: '#51B873',
              secondary: '#fff',
            },
            style: {
              borderLeft: `4px solid ${secondaryColor}`,
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
            style: {
              borderLeft: '4px solid #ef4444',
            },
          },
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative h-[85vh] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{ y, scale }}
          >
            <img
              src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop"
              alt="Contact Header"
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
                  <div className="w-8 h-0.5 bg-gradient-to-r from-[#6556D5] to-white"></div>
                  <span className="text-white/90 font-light tracking-[0.2em] text-sm">CONNECT</span>
                </motion.div>
                <h1 className="text-7xl lg:text-8xl font-light text-white mb-6 tracking-tight">
                  Let&apos;s Design <br />
                  <span className="font-normal text-white bg-clip-text">
                    Together
                  </span>
                </h1>

                <motion.p
                  className="text-white/80 font-light text-lg max-w-2xl leading-relaxed mb-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Connect with our team of visionary architects to transform your ideas into remarkable architectural realities.
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
              <span className="text-white/60 font-light text-sm mb-2 tracking-wider">CONTACT</span>
              <motion.div
                className="w-[1px] h-16 bg-gradient-to-b from-white/80 to-transparent"
                animate={{ height: [16, 32, 16] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </div>
          </motion.div>
        </div>

        {/* Contact Information */}
        <section id="contact-info" className="py-24 px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 tracking-tight">
              Get in Touch
            </h2>
            <div className="w-20 h-px bg-gray-300 mx-auto mb-6 relative">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute h-full bg-gradient-to-r from-[#6556D5] to-[#51B873]"
              />
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto font-light">
              Reach out to our team through any of these channels. We&apos;re here to help bring your architectural vision to life.
            </p>
          </motion.div>

          {/* Contact Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 p-6 text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${primaryLight}, ${secondaryLight})`
                  }}
                >
                  <div style={{ color: primaryColor }}>
                    {item.icon}
                  </div>
                </motion.div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  {item.title}
                </h3>
                <div className="space-y-2 mb-4">
                  {item.details.map((detail, i) => (
                    <p key={i} className="text-gray-600 font-light text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
                {item.link && (
                  <motion.a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all"
                    style={{
                      background: primaryLight,
                      color: primaryColor
                    }}
                  >
                    {item.linkText} <ArrowRight className="w-3 h-3" />
                  </motion.a>
                )}
              </motion.div>
            ))}
          </div>

          {/* Contact Form Section */}
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
            >
              <h3 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
                Send Us a Message
              </h3>
              <div className="w-16 h-0.5 bg-gradient-to-r from-[#6556D5] to-[#51B873] mb-8"></div>

              <AnimatePresence>
                {isSubmitted ? (
                  <motion.div
                    className="p-8 rounded-lg text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      background: secondaryLight
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                      className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full"
                      style={{ background: primaryLight }}
                    >
                      <CheckCircle className="w-10 h-10" style={{ color: secondaryColor }} />
                    </motion.div>
                    <div className="text-xl font-light text-gray-900 mb-2">Thank You!</div>
                    <p className="text-gray-600 font-light">
                      Your message has been sent successfully. We&apos;ll get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="pl-10 w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-gray-500 transition-colors font-light"
                            placeholder="John Smith"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="pl-10 w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-gray-500 transition-colors font-light"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="pl-10 w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-gray-500 transition-colors font-light"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-gray-500 transition-colors font-light"
                        placeholder="Project Inquiry"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 left-3 pointer-events-none">
                          <MessageCircle className="h-5 w-5 text-gray-400" />
                        </div>
                        <textarea
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className="pl-10 w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-gray-500 transition-colors font-light"
                          placeholder="Tell us about your architectural vision..."
                        />
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                      className="w-full py-4 font-medium rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                        color: '#fff'
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h3 className="text-2xl font-light text-gray-900 mb-8 tracking-tight">
                Frequently Asked Questions
              </h3>
              <div className="w-16 h-0.5 bg-gradient-to-r from-[#6556D5] to-[#51B873] mb-6"></div>

              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: primaryColor }}></div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">{item.question}</h4>
                        <p className="text-gray-600 font-light leading-relaxed">{item.answer}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map Section */}
              <motion.div
                className="mt-12 rounded-xl overflow-hidden shadow-lg border border-gray-200"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="h-64 bg-gray-100 flex flex-col items-center justify-center p-6 text-center">
                  <Map className="w-12 h-12 mb-4" style={{ color: primaryColor }} />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Visit Our Studio</h4>
                  <p className="text-gray-600 font-light mb-4 text-sm">
                    30-B Geeta enclave, Krishna nagar, Mathura, 281001
                  </p>
                  <motion.a
                    href="https://www.google.com/maps/place/DERA+CONSULTANTS+PRIVATE+LIMITED/@27.4983124,77.6516774,13z/data=!4m6!3m5!1s0x397371537d90b05b:0xa6bfe506ff5bbe22!8m2!3d27.5034704!4d77.663168!16s%2Fg%2F11fqc87ztq?entry=ttu&g_ep=EgoyMDI1MTAwISoAINABQA%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="px-5 py-2.5 text-sm font-medium rounded-lg flex items-center gap-2 transition-all"
                    style={{
                      background: primaryLight,
                      color: primaryColor
                    }}
                  >
                    View on Google Maps <ArrowRight className="w-3 h-3" />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 tracking-tight">
                Why Choose Dera Consultants
              </h2>
              <div className="w-20 h-px bg-gray-300 mx-auto mb-6 relative overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="absolute h-full"
                  style={{
                    background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`
                  }}
                />
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto font-light">
                We combine architectural expertise with innovative design thinking to create spaces that inspire and endure.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChooseUs.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all"
                    style={{
                      background: `linear-gradient(135deg, ${primaryLight}, ${secondaryLight})`
                    }}
                  >
                    <div style={{ color: primaryColor }}>
                      {item.icon}
                    </div>
                  </motion.div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 font-light text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 bg-gray-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-6 tracking-tight">
              Ready to Start Your Architectural Journey?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto font-light">
              Schedule a complimentary consultation with our team to discuss your vision and explore how we can transform it into reality.
            </p>
            <div className="w-20 h-px bg-gray-300 mx-auto mb-8 relative">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute h-full w-full origin-left"
                style={{
                  background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`
                }}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: `0 10px 30px ${primaryColor}20` }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const formSection = document.getElementById('contact-info');
                if (formSection) {
                  formSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="px-8 py-4 font-medium rounded-lg inline-flex items-center gap-3 transition-all"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                color: '#fff'
              }}
            >
              <Heart className="w-5 h-5" />
              Schedule a Consultation
            </motion.button>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;