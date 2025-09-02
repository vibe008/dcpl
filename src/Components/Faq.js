"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";

const faqData = [
  {
    id: 1,
    title: "ARCHITECTURAL SERVICES",
    content: "Purposeful and context-driven building designs.",
    points: [
      "Concept Design",
      "Architectural Planning",
      "3D Visualization",
      "Construction Docs",
    ],
    image: "/assets/Architecture.jpg",
  },
  {
    id: 2,
    title: "PROJECT MANAGEMENT & SUPERVISION",
    content: "Efficient execution with timely delivery.",
    points: [
      "Scheduling",
      "Quality Checks",
      "Budget Control",
      "Site Supervision",
    ],
    image: "/assets/interior.jpg",
  },
  {
    id: 3,
    title: "HERITAGE CONSERVATION",
    content: "Preserving heritage with modern expertise.",
    points: [
      "Restoration Plans",
      "Material Conservation",
      "Adaptive Reuse",
      "Cultural Integration",
    ],
    image: "/assets/heritage.jpg",
  },
  {
    id: 4,
    title: "MASTER PLANNING",
    content: "Holistic layouts for sustainable growth.",
    points: [
      "Urban Design",
      "Infrastructure",
      "Green Planning",
      "Zoning Strategies",
    ],
    image: "/assets/planing.jpg",
  },
  {
    id: 5,
    title: "INTERIOR DESIGNING",
    content: "Functional spaces with modern aesthetics.",
    points: [
      "Space Planning",
      "Material Selection",
      "Lighting Design",
      "Furniture Setup",
    ],
    image: "/assets/intirior.jpg",
  },
  {
    id: 6,
    title: "DEVELOPMENT & CONSULTING",
    content: "Strategic guidance for smart growth.",
    points: [
      "Feasibility Studies",
      "Project Advisory",
      "Sustainability Plans",
      "Design Consulting",
    ],
    image: "/assets/projects.jpg",
  },
];


export default function Faq() {
  const [openItems, setOpenItems] = useState(faqData.map((item) => item.id));

  const toggleItem = (id) => {
    setOpenItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };
  
  return (
    <div className="w-full mx-auto px-4 md:px-8 ">
      {faqData.map((item) => {
        const isOpen = openItems.includes(item.id);
        return (
          <div
            key={item.id}
            className="py-16 lg:py-6 border-t border-gray-200 lg:mt-10 sm:mt-6"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleItem(item.id)}
            >
              <h3
                className="text-xl md:text-3xl lg:text-4xl font-semibold flex items-center gap-3 uppercase"
                style={{ lineHeight: "120%" }}
              >
                <span className="text-gray-400 text-lg md:text-2xl lg:text-3xl">
                  {String(item.id).padStart(2, "0")}
                </span>
                {item.title}
              </h3>
              {isOpen ? <X size={20} /> : <Plus size={20} />}
            </div>

            {/* Expandable Content */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="grid lg:grid-cols-2 gap-6 mt-6">
                    {/* Text */}
                    <div className="flex flex-col justify-between w-full">
                      <p className="text-sm md:text-base lg:text-lg font-medium leading-relaxed">
                        {item.content}
                      </p>
                      <ul className="space-y-2 text-gray-600 text-sm md:text-base mt-4">
                        {item.points.map((point, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-3 text-gray-700"
                          >
                            <span>•</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Image */}
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="rounded-lg shadow-md w-full h-64 md:h-80 object-cover"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
