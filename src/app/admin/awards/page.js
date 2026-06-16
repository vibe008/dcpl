"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  Trophy,
  Plus,
  X,
  Check,
  Upload,
  Image as ImageIcon,
  Edit2,
  Trash2,
  Calendar,
  Search,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function AwardsManagement() {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Add state
  const [newAward, setNewAward] = useState({
    title: "",
    description: "",
    year: new Date().getFullYear().toString(),
    imagesFiles: [], // Array of File objects
    imagesPreviews: [], // Array of local blob URLs
  });

  // Edit state
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    year: "",
    existingImages: [], // Array of Cloudinary URLs
    newImagesFiles: [], // Array of new File objects
    newImagesPreviews: [], // Array of new blob URLs
  });

  const fileInputRef = useRef(null);
  const editFileInputRef = useRef(null);

  const glass = "bg-white/80 backdrop-blur-xl border border-white/30 shadow-sm";
  const cardGlass = "bg-white/70 backdrop-blur-lg border border-white/20 shadow-lg";

  // Fetch all awards
  const fetchAwards = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/awards");
      const data = await res.json();
      if (data.success) {
        setAwards(data.data);
      } else {
        toast.error("Failed to fetch awards");
      }
    } catch (error) {
      console.error("Error fetching awards:", error);
      toast.error("Error loading awards");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAwards();
  }, []);

  // Upload multiple files to Cloudinary in a single batch request
  const uploadBatchToCloudinary = async (files, folder = "awards") => {
    if (!files || files.length === 0) return [];
    
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("folder", folder);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data && data.success && data.urls) {
        return data.urls;
      }
      throw new Error(data.message || "Batch upload failed");
    } catch (error) {
      console.error("Batch upload error:", error);
      toast.error("Failed to upload images");
      throw error;
    }
  };

  // Handle file selection for new award
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = [];
    const previews = [];

    selectedFiles.forEach((file) => {
      // Validate file size (5MB max per image)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 5MB)`);
        return;
      }

      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
      if (!validTypes.includes(file.type)) {
        toast.error(`${file.name} has an invalid format`);
        return;
      }

      validFiles.push(file);
      previews.push(URL.createObjectURL(file));
    });

    setNewAward((prev) => ({
      ...prev,
      imagesFiles: [...prev.imagesFiles, ...validFiles],
      imagesPreviews: [...prev.imagesPreviews, ...previews],
    }));
  };

  // Handle file selection for editing award
  const handleEditFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = [];
    const previews = [];

    selectedFiles.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 5MB)`);
        return;
      }

      const validTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
      if (!validTypes.includes(file.type)) {
        toast.error(`${file.name} has an invalid format`);
        return;
      }

      validFiles.push(file);
      previews.push(URL.createObjectURL(file));
    });

    setEditData((prev) => ({
      ...prev,
      newImagesFiles: [...prev.newImagesFiles, ...validFiles],
      newImagesPreviews: [...prev.newImagesPreviews, ...previews],
    }));
  };

  // Remove logo preview/file for new award
  const removeImagePreview = (index) => {
    const previews = [...newAward.imagesPreviews];
    const files = [...newAward.imagesFiles];

    // Revoke the blob URL to avoid memory leak
    URL.revokeObjectURL(previews[index]);

    previews.splice(index, 1);
    files.splice(index, 1);

    setNewAward((prev) => ({
      ...prev,
      imagesFiles: files,
      imagesPreviews: previews,
    }));
  };

  // Remove preview/file during edit
  const removeEditNewImagePreview = (index) => {
    const previews = [...editData.newImagesPreviews];
    const files = [...editData.newImagesFiles];

    URL.revokeObjectURL(previews[index]);

    previews.splice(index, 1);
    files.splice(index, 1);

    setEditData((prev) => ({
      ...prev,
      newImagesFiles: files,
      newImagesPreviews: previews,
    }));
  };

  // Remove existing saved image from editing state
  const removeEditExistingImage = (index) => {
    const existing = [...editData.existingImages];
    existing.splice(index, 1);
    setEditData((prev) => ({
      ...prev,
      existingImages: existing,
    }));
  };

  // Add award
  const handleAddAward = async () => {
    if (!newAward.title.trim()) {
      toast.error("Award title is required");
      return;
    }
    if (!newAward.description.trim()) {
      toast.error("Description is required");
      return;
    }
    if (!newAward.year.trim()) {
      toast.error("Year is required");
      return;
    }

    const submitToast = toast.loading("Creating award...");

    try {
      let uploadedUrls = [];
      if (newAward.imagesFiles.length > 0) {
        uploadedUrls = await uploadBatchToCloudinary(newAward.imagesFiles);
      }

      const res = await fetch("/api/awards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newAward.title.trim(),
          description: newAward.description.trim(),
          year: newAward.year.trim(),
          images: uploadedUrls,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Award added successfully!", { id: submitToast });
        
        // Clean up previews
        newAward.imagesPreviews.forEach((url) => URL.revokeObjectURL(url));

        // Reset state
        setNewAward({
          title: "",
          description: "",
          year: new Date().getFullYear().toString(),
          imagesFiles: [],
          imagesPreviews: [],
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setShowAddForm(false);
        fetchAwards();
      } else {
        toast.error(data.message || "Failed to create award", { id: submitToast });
      }
    } catch (error) {
      console.error("Error creating award:", error);
      toast.error("Error saving award details", { id: submitToast });
    }
  };

  // Start editing
  const startEdit = (award) => {
    setEditingId(award._id);
    setEditData({
      title: award.title,
      description: award.description,
      year: award.year.toString(),
      existingImages: award.images || [],
      newImagesFiles: [],
      newImagesPreviews: [],
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    // Clean up previews
    editData.newImagesPreviews.forEach((url) => URL.revokeObjectURL(url));

    setEditingId(null);
    setEditData({
      title: "",
      description: "",
      year: "",
      existingImages: [],
      newImagesFiles: [],
      newImagesPreviews: [],
    });
  };

  // Save edited award
  const handleSaveEdit = async (id) => {
    if (!editData.title.trim()) {
      toast.error("Award title is required");
      return;
    }
    if (!editData.description.trim()) {
      toast.error("Description is required");
      return;
    }
    if (!editData.year.trim()) {
      toast.error("Year is required");
      return;
    }

    const submitToast = toast.loading("Updating award details...");

    try {
      let uploadedUrls = [];
      if (editData.newImagesFiles.length > 0) {
        uploadedUrls = await uploadBatchToCloudinary(editData.newImagesFiles);
      }

      const finalImages = [...editData.existingImages, ...uploadedUrls];

      const res = await fetch(`/api/awards/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editData.title.trim(),
          description: editData.description.trim(),
          year: editData.year.trim(),
          images: finalImages,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Award updated successfully!", { id: submitToast });
        
        editData.newImagesPreviews.forEach((url) => URL.revokeObjectURL(url));
        setEditingId(null);
        fetchAwards();
      } else {
        toast.error(data.message || "Failed to update award", { id: submitToast });
      }
    } catch (error) {
      console.error("Error updating award:", error);
      toast.error("Error updating award", { id: submitToast });
    }
  };

  // Delete award
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this award?")) return;

    const deleteToast = toast.loading("Deleting award...");

    try {
      const res = await fetch(`/api/awards/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Award deleted successfully!", { id: deleteToast });
        fetchAwards();
      } else {
        toast.error(data.message || "Failed to delete award", { id: deleteToast });
      }
    } catch (error) {
      console.error("Error deleting award:", error);
      toast.error("Error deleting award", { id: deleteToast });
    }
  };

  // Filter awards by search query
  const filteredAwards = awards.filter((award) => {
    const query = searchTerm.toLowerCase();
    return (
      award.title.toLowerCase().includes(query) ||
      award.description.toLowerCase().includes(query) ||
      award.year.toString().includes(query)
    );
  });

  // Slider component for mini card carousels
  const CardCarousel = ({ images }) => {
    const [index, setIndex] = useState(0);

    if (!images || images.length === 0) {
      return (
        <div className="w-full h-32 bg-gray-100 flex items-center justify-center text-gray-400">
          <ImageIcon className="w-8 h-8" />
        </div>
      );
    }

    return (
      <div className="relative w-full h-32 bg-gray-900 rounded-lg overflow-hidden group">
        <img
          src={images[index]}
          alt="Award showcase"
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
        />
        
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIndex((prev) => (prev - 1 + images.length) % images.length);
              }}
              className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIndex((prev) => (prev + 1) % images.length);
              }}
              className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <div className="absolute bottom-1 right-2 bg-black/50 text-[9px] text-white px-1.5 py-0.5 rounded">
              {index + 1}/{images.length}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto">
        
        {/* Header Block */}
        <div className={`${glass} rounded-3xl p-6 mb-6`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Awards Management</h1>
                <p className="text-gray-600 mt-1">Manage office accomplishments, awards, and credentials</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 shadow-lg shadow-gray-900/25 transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              {showAddForm ? "Cancel" : "Add New Award"}
            </motion.button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className={`${cardGlass} rounded-2xl p-4 flex items-center gap-3`}>
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Total Awards</p>
              <p className="text-2xl font-bold text-gray-900">{awards.length}</p>
            </div>
          </div>
          <div className={`${cardGlass} rounded-2xl p-4 flex items-center gap-3`}>
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Awards Showcase</p>
              <p className="text-2xl font-bold text-gray-900">
                {awards.filter((a) => a.images && a.images.length > 0).length} with Images
              </p>
            </div>
          </div>
        </div>

        {/* Add Award Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`${cardGlass} rounded-2xl p-6 mb-6 overflow-hidden`}
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Award</h2>
              <div className="space-y-6">
                
                {/* Text fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Award Title *</label>
                    <input
                      type="text"
                      value={newAward.title}
                      onChange={(e) => setNewAward({ ...newAward, title: e.target.value })}
                      placeholder="e.g., Best Commercial Design of the Year"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500/20 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year *</label>
                    <input
                      type="text"
                      value={newAward.year}
                      onChange={(e) => setNewAward({ ...newAward, year: e.target.value })}
                      placeholder="e.g., 2024"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500/20 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea
                    value={newAward.description}
                    onChange={(e) => setNewAward({ ...newAward, description: e.target.value })}
                    placeholder="Provide a detailed description of the award..."
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500/20 bg-white resize-none"
                  />
                </div>

                {/* Multiple Images Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Showcase Images (Select multiple)
                  </label>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        multiple
                        className="hidden"
                        id="award-upload-files"
                      />
                      <label
                        htmlFor="award-upload-files"
                        className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer bg-white"
                      >
                        <Upload className="w-5 h-5 text-gray-500" />
                        Choose Images
                      </label>
                      <span className="text-xs text-gray-500">Supports JPG, PNG, WebP (Max 5MB each)</span>
                    </div>

                    {/* Image Previews */}
                    {newAward.imagesPreviews.length > 0 && (
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 pt-2">
                        {newAward.imagesPreviews.map((url, index) => (
                          <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                            <img src={url} alt="preview" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removeImagePreview(index)}
                              className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t border-gray-200/50">
                  <button
                    onClick={handleAddAward}
                    disabled={!newAward.title.trim() || !newAward.description.trim() || !newAward.year.trim()}
                    className="px-6 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex-1 flex items-center justify-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Save Award
                  </button>
                  <button
                    onClick={() => {
                      newAward.imagesPreviews.forEach((url) => URL.revokeObjectURL(url));
                      setNewAward({
                        title: "",
                        description: "",
                        year: new Date().getFullYear().toString(),
                        imagesFiles: [],
                        imagesPreviews: [],
                      });
                      if (fileInputRef.current) fileInputRef.current.value = "";
                      setShowAddForm(false);
                    }}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 bg-white transition-colors flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter Bar */}
        <div className={`${glass} rounded-2xl p-4 mb-6 flex items-center gap-3`}>
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, description or year..."
            className="w-full bg-transparent outline-none text-gray-700 text-sm"
          />
        </div>

        {/* Main Grid List */}
        <div className={`${cardGlass} rounded-2xl p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Awards Showcase</h2>
            <span className="text-sm text-gray-500">
              Showing {filteredAwards.length} of {awards.length} accomplishments
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-3 border-gray-900 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredAwards.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No awards found</h3>
              <p className="text-gray-500">Click Add New Award or try adjusting your search terms.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAwards.map((award) => (
                <motion.div
                  key={award._id}
                  layout
                  className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 bg-white flex flex-col justify-between"
                >
                  {editingId === award._id ? (
                    // Edit Form Mode
                    <div className="p-6 space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Title</label>
                        <input
                          type="text"
                          value={editData.title}
                          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gray-500/20"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1">Year</label>
                          <input
                            type="text"
                            value={editData.year}
                            onChange={(e) => setEditData({ ...editData, year: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Description</label>
                        <textarea
                          value={editData.description}
                          onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none"
                        />
                      </div>

                      {/* Edit Image Upload */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Manage Images</label>
                        <div className="space-y-3">
                          
                          {/* Existing Images */}
                          {editData.existingImages.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {editData.existingImages.map((url, idx) => (
                                <div key={idx} className="relative w-12 h-12 rounded border border-gray-200 overflow-hidden bg-gray-50">
                                  <img src={url} alt="existing" className="w-full h-full object-cover" />
                                  <button
                                    type="button"
                                    onClick={() => removeEditExistingImage(idx)}
                                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center hover:bg-red-600 scale-75"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Choose more new files */}
                          <div className="flex items-center gap-2">
                            <input
                              type="file"
                              ref={editFileInputRef}
                              onChange={handleEditFileChange}
                              accept="image/*"
                              multiple
                              className="hidden"
                              id={`edit-upload-${award._id}`}
                            />
                            <label
                              htmlFor={`edit-upload-${award._id}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold hover:bg-gray-50 cursor-pointer bg-white"
                            >
                              <Upload className="w-3.5 h-3.5 text-gray-500" />
                              Add New Images
                            </label>
                          </div>

                          {/* Previews for new files */}
                          {editData.newImagesPreviews.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {editData.newImagesPreviews.map((url, idx) => (
                                <div key={idx} className="relative w-12 h-12 rounded border border-gray-200 overflow-hidden bg-gray-50">
                                  <img src={url} alt="new-preview" className="w-full h-full object-cover" />
                                  <button
                                    type="button"
                                    onClick={() => removeEditNewImagePreview(idx)}
                                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center hover:bg-red-600 scale-75"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => handleSaveEdit(award._id)}
                          className="flex-1 bg-gray-900 text-white py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex-1 border border-gray-300 text-gray-700 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Display Mode
                    <>
                      <div>
                        {/* Mini Image Carousel */}
                        <CardCarousel images={award.images} />
                        
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full px-2.5 py-1">
                              <Calendar className="w-3 h-3" />
                              {award.year}
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{award.title}</h3>
                          <p className="text-gray-600 text-sm font-light leading-relaxed line-clamp-3">
                            {award.description}
                          </p>
                        </div>
                      </div>

                      {/* Admin Actions footer */}
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3 rounded-b-2xl">
                        <button
                          onClick={() => startEdit(award)}
                          className="flex items-center gap-1 text-xs text-gray-600 hover:text-indigo-600 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(award._id)}
                          className="flex items-center gap-1 text-xs text-gray-600 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
