"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  Building2,
  Upload,
  Image as ImageIcon,
  MapPin,
  Plus,
  Trash2,
  Check,
  RefreshCw,
  Sparkles,
  Info,
} from "lucide-react";

export default function AboutPageManagement() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form states
  const [aboutData, setAboutData] = useState({
    title: "Dera Consultants Pvt. Ltd.",
    foundedText: "",
    directorsText: "",
    teamText: "",
    servicesText: "",
    philosophyText: "",
    offices: [],
    sideImage: "/assets/aboutimg.png",
  });

  // Local file upload states
  const [newImageFile, setNewImageFile] = useState(null);
  const [newImagePreview, setNewImagePreview] = useState(null);

  // New office input states
  const [newOffice, setNewOffice] = useState({ city: "", state: "" });

  const fileInputRef = useRef(null);

  const glass = "bg-white/80 backdrop-blur-xl border border-white/30 shadow-sm";
  const cardGlass = "bg-white/70 backdrop-blur-lg border border-white/20 shadow-lg";

  // Fetch current about page data
  const fetchAboutData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/about");
      const data = await res.json();
      if (data.success && data.data) {
        setAboutData(data.data);
      } else {
        toast.error("Failed to fetch About page details");
      }
    } catch (error) {
      console.error("Error fetching about data:", error);
      toast.error("Error loading About page details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image is too large (max 5MB)");
      return;
    }

    // Validate format
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      toast.error("Unsupported file type. Please upload JPG, PNG, WebP, or SVG.");
      return;
    }

    setNewImageFile(file);
    setNewImagePreview(URL.createObjectURL(file));
  };

  // Upload image to Cloudinary using existing batch route
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("files", file);
    formData.append("folder", "about");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data && data.success && data.urls && data.urls.length > 0) {
        return data.urls[0];
      }
      throw new Error(data.message || "Upload failed");
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      toast.error("Failed to upload the image to server");
      throw error;
    }
  };

  // Office additions
  const handleAddOffice = () => {
    if (!newOffice.city.trim()) {
      toast.error("City name is required");
      return;
    }
    if (!newOffice.state.trim()) {
      toast.error("State or region info is required");
      return;
    }

    setAboutData((prev) => ({
      ...prev,
      offices: [...prev.offices, { city: newOffice.city.trim(), state: newOffice.state.trim() }],
    }));
    setNewOffice({ city: "", state: "" });
    toast.success("Office added to list");
  };

  // Office deletion
  const handleRemoveOffice = (index) => {
    const updatedOffices = [...aboutData.offices];
    updatedOffices.splice(index, 1);
    setAboutData((prev) => ({
      ...prev,
      offices: updatedOffices,
    }));
    toast.success("Office removed from list");
  };

  // Save the entire about config
  const handleSaveAll = async () => {
    setSaving(true);
    const saveToastId = toast.loading("Saving About page changes...");

    try {
      let finalImageUrl = aboutData.sideImage;

      // If a new image was chosen, upload it first
      if (newImageFile) {
        finalImageUrl = await uploadImageToCloudinary(newImageFile);
      }

      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...aboutData,
          sideImage: finalImageUrl,
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setAboutData(data.data);
        // Clean up preview
        if (newImagePreview) {
          URL.revokeObjectURL(newImagePreview);
        }
        setNewImageFile(null);
        setNewImagePreview(null);
        toast.success("About page updated successfully!", { id: saveToastId });
      } else {
        toast.error(data.message || "Failed to update About details", { id: saveToastId });
      }
    } catch (error) {
      console.error("Error saving about data:", error);
      toast.error("Error saving details", { id: saveToastId });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-16 h-16 border-4 border-gray-200/80 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin absolute top-0"></div>
          </div>
          <p className="mt-6 text-gray-600 font-medium tracking-tight">Loading About details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 pb-16">
      <Toaster position="top-right" />
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className={`${glass} rounded-3xl p-6 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">About Page Management</h1>
              <p className="text-gray-600 text-sm mt-0.5">Customize the values, offices, and side image on the About page</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSaveAll}
            disabled={saving}
            className="px-6 py-3 bg-[#6455D2] text-white font-semibold rounded-xl hover:bg-[#5244b7] shadow-lg shadow-indigo-600/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {saving ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Check className="w-5 h-5" />
            )}
            Save Changes
          </motion.button>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Form Fields Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className={`${cardGlass} rounded-2xl p-6 space-y-6`}>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 pb-3 border-b border-gray-200/50">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                Text Values
              </h2>

              {/* Title field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Company Name (Title)</label>
                <input
                  type="text"
                  value={aboutData.title}
                  onChange={(e) => setAboutData({ ...aboutData, title: e.target.value })}
                  placeholder="e.g. Dera Consultants Pvt. Ltd."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 bg-white outline-none"
                />
              </div>

              {/* Founded paragraph */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Founded Section Text</label>
                <textarea
                  value={aboutData.foundedText}
                  onChange={(e) => setAboutData({ ...aboutData, foundedText: e.target.value })}
                  placeholder="Describe when and by whom the company was founded..."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 bg-white outline-none resize-none text-sm"
                />
              </div>

              {/* Directors text */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Directors / Decision Makers Text</label>
                <textarea
                  value={aboutData.directorsText}
                  onChange={(e) => setAboutData({ ...aboutData, directorsText: e.target.value })}
                  placeholder="Describe the directors or key decision makers..."
                  rows={2}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 bg-white outline-none resize-none text-sm"
                />
              </div>

              {/* Team introductory text */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Team / Offices Introduction Text</label>
                <textarea
                  value={aboutData.teamText}
                  onChange={(e) => setAboutData({ ...aboutData, teamText: e.target.value })}
                  placeholder="Introductory text before listing office branches..."
                  rows={2}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 bg-white outline-none resize-none text-sm"
                />
              </div>

              {/* Services text */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Services Description Text</label>
                <textarea
                  value={aboutData.servicesText}
                  onChange={(e) => setAboutData({ ...aboutData, servicesText: e.target.value })}
                  placeholder="Briefly describe the multidisciplinary services offered..."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 bg-white outline-none resize-none text-sm"
                />
              </div>

              {/* Philosophy text */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Philosophy / Design Principle Text</label>
                <textarea
                  value={aboutData.philosophyText}
                  onChange={(e) => setAboutData({ ...aboutData, philosophyText: e.target.value })}
                  placeholder="State the core design belief or problem-solving mindset..."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 bg-white outline-none resize-none text-sm"
                />
              </div>

            </div>
          </div>

          {/* Right Column: Office Manager & Image Upload */}
          <div className="space-y-6">
            
            {/* Side Image Upload Box */}
            <div className={`${cardGlass} rounded-2xl p-6 space-y-4`}>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 pb-3 border-b border-gray-200/50">
                <ImageIcon className="w-5 h-5 text-indigo-500" />
                About Side Image
              </h2>
              
              <div className="space-y-3">
                <div className="relative aspect-video sm:aspect-square rounded-xl overflow-hidden bg-gray-950 border border-gray-200 shadow-inner group">
                  <img
                    src={newImagePreview || aboutData.sideImage}
                    alt="About side preview"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label
                      htmlFor="about-side-image-upload"
                      className="px-4 py-2 bg-white/95 text-gray-800 text-xs font-semibold rounded-lg shadow-md hover:bg-white cursor-pointer transition-colors"
                    >
                      Change Image
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                    id="about-side-image-upload"
                  />
                  <label
                    htmlFor="about-side-image-upload"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer bg-white text-sm font-medium"
                  >
                    <Upload className="w-4 h-4 text-gray-500" />
                    Upload Image file
                  </label>
                  <span className="text-[10px] text-gray-500 text-center leading-relaxed">
                    Vertical orientation matches the frontend best.<br />
                    Supported: JPG, PNG, WebP (Max 5MB)
                  </span>
                </div>
              </div>
            </div>

            {/* Office Branch List Manager */}
            <div className={`${cardGlass} rounded-2xl p-6 space-y-4`}>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 pb-3 border-b border-gray-200/50">
                <MapPin className="w-5 h-5 text-indigo-500" />
                Office Branches
              </h2>

              {/* Office Add Inline Form */}
              <div className="space-y-3 bg-white/50 p-3 rounded-xl border border-gray-200/30">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Add Office Branch</p>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="City (e.g. Mathura)"
                    value={newOffice.city}
                    onChange={(e) => setNewOffice({ ...newOffice, city: e.target.value })}
                    className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs bg-white focus:ring-1 focus:ring-indigo-500/20"
                  />
                  <input
                    type="text"
                    placeholder="State (e.g. Uttar Pradesh)"
                    value={newOffice.state}
                    onChange={(e) => setNewOffice({ ...newOffice, state: e.target.value })}
                    className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs bg-white focus:ring-1 focus:ring-indigo-500/20"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddOffice}
                  className="w-full py-1.5 bg-gray-900 text-white rounded-lg text-xs font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Office
                </button>
              </div>

              {/* Offices List */}
              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {aboutData.offices.length === 0 ? (
                  <div className="text-center py-6 border border-dashed border-gray-200 rounded-xl">
                    <MapPin className="w-6 h-6 mx-auto text-gray-400 mb-1" />
                    <p className="text-xs text-gray-500">No offices added yet</p>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {aboutData.offices.map((office, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl hover:shadow-sm transition-all"
                      >
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-gray-800">{office.city}</p>
                            <p className="text-[10px] text-gray-500">{office.state}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveOffice(idx)}
                          className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors"
                          title="Remove office"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
