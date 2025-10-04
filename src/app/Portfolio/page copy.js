"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { 
  ArrowRight, Award, Building, Calendar, ChevronDown, 
  Clock, Compass, MapPin, Send, Users, X, 
  Star, Trophy, Heart, Lightbulb, Sparkles 
} from "lucide-react";
import Nav from "@/<@>/Components/ui/Nav";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  
  const projectCategories = ["all", "residential", "commercial", "institutional", "landscape"];

  const projects = [
    {
      id: 1,
      title: "Skyline Towers",
      type: "Residential",
      location: "New York, NY",
      year: "2023",
      image: "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "residential",
      description: "Luxury high-rise apartments with panoramic city views and sustainable design features.",
      awards: ["AIA Design Excellence", "Green Building Award"]
    },
    {
      id: 2,
      title: "TechHub Campus",
      type: "Commercial",
      location: "San Francisco, CA",
      year: "2022",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "commercial",
      description: "Innovative workspace designed to foster collaboration and creativity in the heart of Silicon Valley.",
      awards: ["Innovation in Design", "Sustainable Architecture Award"]
    },
    {
      id: 3,
      title: "Harmony Museum",
      type: "Institutional",
      location: "Chicago, IL",
      year: "2022",
      image: "https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "institutional",
      description: "Cultural institution celebrating art and community with flowing architectural forms.",
      awards: ["AIA National Honor Award", "Public Space Excellence"]
    },
    {
      id: 4,
      title: "Oceanview Residences",
      type: "Residential",
      location: "Miami, FL",
      year: "2021",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "residential",
      description: "Beachfront luxury homes designed for seamless indoor-outdoor living.",
      awards: ["Coastal Architecture Award", "Luxury Design Award"]
    },
    {
      id: 5,
      title: "Central Park Pavilion",
      type: "Landscape",
      location: "New York, NY",
      year: "2021",
      image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "landscape",
      description: "Community gathering space that blends seamlessly with its natural surroundings.",
      awards: ["Landscape Architecture Award", "Community Design Prize"]
    },
    {
      id: 6,
      title: "Urban Renewal Project",
      type: "Commercial",
      location: "Detroit, MI",
      year: "2020",
      image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "commercial",
      description: "Revitalization of historic district with mixed-use spaces and community facilities.",
      awards: ["Urban Design Excellence", "Historic Preservation Award"]
    }
  ];

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const stats = [
    { value: "150+", label: "Projects Completed" },
    { value: "25", label: "Years Experience" },
    { value: "50+", label: "Awards Won" },
    { value: "40", label: "Team Members" }
  ];

  const awards = [
    { name: "AIA Firm Award", year: "2023", description: "Highest honor for an architecture firm" },
    { name: "Global Sustainable Architecture Award", year: "2022", description: "Excellence in eco-friendly design" },
    { name: "National Design Award", year: "2021", description: "Recognition for innovation in design" },
    { name: "Urban Design Excellence", year: "2020", description: "Contributions to city planning" },
    { name: "International Architecture Prize", year: "2019", description: "Global recognition of design excellence" }
  ];

  const team = [
    { name: "Sarah Johnson", role: "Principal Architect", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Michael Chen", role: "Design Director", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Elena Rodriguez", role: "Project Manager", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "David Kim", role: "Senior Designer", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" }
  ];

  return (
   <>
   <Nav />
   <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/40"></div>
          <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80')] bg-cover bg-center"></div>
        </div>
        
        <motion.div 
          className="text-center z-10 px-4 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Architecture That Inspires
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-10 text-gray-200 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Creating spaces that transform communities and elevate human experience through innovative design.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-white text-black px-8 py-4 rounded-full font-medium shadow-lg flex items-center justify-center mx-auto gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            View Our Work <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="animate-bounce flex flex-col items-center">
            <span className="text-white text-sm mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-3xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6">
                Founded in 1998, our architecture firm has been at the forefront of innovative design 
                that responds to the needs of people and the environment. We believe that architecture 
                has the power to transform communities and improve quality of life.
              </p>
              <p className="text-gray-600 mb-6">
                Our approach combines creative vision with technical expertise, resulting in spaces 
                that are not only beautiful but also functional, sustainable, and meaningful to those 
                who inhabit them.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gray-200 h-80 w-full rounded-2xl overflow-hidden">
                <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-lg w-3/4">
                <h3 className="font-bold mb-2">Our Philosophy</h3>
                <p className="text-sm text-gray-600">
                  We believe in creating architecture that responds to its context, respects the environment, 
                  and enhances the human experience.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Featured Projects
          </motion.h2>
          <motion.p 
            className="text-gray-600 mb-12 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore our portfolio of innovative designs that have transformed skylines and communities.
          </motion.p>

          {/* Category Filters */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {projectCategories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category ? 'bg-black text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="h-60 overflow-hidden">
                  <div className="h-full w-full bg-gray-200">
                    <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${project.image})` }}></div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <div className="flex items-center gap-3 text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      <span className="text-sm">{project.type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{project.location}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{project.year}</span>
                    <button className="text-black font-medium flex items-center">
                      View Details <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Recognition & Awards
          </motion.h2>
          <motion.p 
            className="text-gray-400 mb-12 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our work has been recognized by prestigious institutions and organizations worldwide.
          </motion.p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {awards.map((award, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-600 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                  <span className="text-yellow-400 font-semibold">{award.year}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{award.name}</h3>
                <p className="text-gray-400 text-sm">{award.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Team
          </motion.h2>
          <motion.p 
            className="text-gray-600 mb-12 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Talented professionals dedicated to creating exceptional architecture.
          </motion.p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${member.image})` }}></div>
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center bg-black text-white rounded-2xl p-12"
        >
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">
            Ready to Start Your Project?
          </h3>
          <p className="mb-8 max-w-2xl mx-auto text-gray-300">
            Let's collaborate to create something extraordinary. Get in touch with our team to discuss your vision.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#333" }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black px-8 py-4 rounded-full font-medium flex items-center justify-center mx-auto gap-2"
          >
            Contact Us <Send className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", damping: 25 }}
              className="bg-white rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-6 right-6 text-gray-500 hover:text-black transition-colors"
                onClick={() => setSelectedProject(null)}
              >
                <X className="w-6 h-6" />
              </button>

              <div className="h-80 mb-6 rounded-xl overflow-hidden bg-gray-200">
                <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${selectedProject.image})` }}></div>
              </div>

              <h2 className="text-3xl font-bold mb-4">{selectedProject.title}</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Project Type</h3>
                  <p className="flex items-center gap-2"><Building className="w-4 h-4" /> {selectedProject.type}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Location</h3>
                  <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {selectedProject.location}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Year Completed</h3>
                  <p className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {selectedProject.year}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Category</h3>
                  <p className="capitalize">{selectedProject.category}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Project Description</h3>
                <p className="text-gray-600">{selectedProject.description}</p>
              </div>

              {selectedProject.awards && selectedProject.awards.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Awards & Recognition</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {selectedProject.awards.map((award, i) => (
                      <li key={i}>{award}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
   </>
  );
}