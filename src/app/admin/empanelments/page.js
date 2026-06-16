"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  Award,
  BadgeCheck,
  Building2,
  Edit2,
  Trash2,
  Plus,
  X,
  Check,
  Upload,
  Calendar,
  FileText,
  MapPin,
  Shield,
  Search,
  Filter,
  ExternalLink,
  Download,
  Clock,
  Tag
} from "lucide-react";

export default function EmpanelmentsManagement() {
  const [empanelments, setEmpanelments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Edit state
  const [editData, setEditData] = useState({
    title: "",
    image: "",
    category: "",
    department: "",
    city: "",
    empanelledDate: "",
    validity: ""
  });

  // Add state
  const [newEmp, setNewEmp] = useState({
    title: "",
    imageFile: null,
    imagePreview: "",
    category: "",
    department: "",
    city: "",
    empanelledDate: "",
    validity: ""
  });

  const fileInputRef = useRef(null);
  const glass = "bg-white/80 backdrop-blur-xl border border-white/30 shadow-sm";
  const cardGlass = "bg-white/70 backdrop-blur-lg border border-white/20 shadow-lg";

  // Predefined categories
  const categories = [
    "CPWD",
    "State Government",
    "Municipal Corporation",
    "PWD",
    "Smart Cities Mission",
    "PSU",
    "Railways",
    "Airports Authority",
    "Defense",
    "Healthcare Infrastructure",
    "Educational Institutions",
    "Housing Board",
    "Industrial Development",
    "Tourism Development",
    "Environmental Agencies",
    "ISO Certification",
    "NABH Accreditation",
    "GRIHA Certification",
    "LEED Certification",
    "Other"
  ];

  // Predefined departments
  const departments = [
    "Central Public Works Department (CPWD)",
    "Public Works Department (PWD)",
    "Municipal Corporation",
    "Smart Cities Mission",
    "Railway Board",
    "Airports Authority of India",
    "Defense Estates",
    "Health Department",
    "Education Department",
    "Housing & Urban Development",
    "Industrial Development Corporation",
    "Tourism Department",
    "Environment & Forests Department",
    "ISO Certification Body",
    "NABH",
    "GRIHA Council",
    "IGBC",
    "Other"
  ];

  // Indian cities
  const indianCities = [
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
    "Chandigarh",
    "Bhopal",
    "Patna",
    "Guwahati",
    "Thiruvananthapuram",
    "Bhubaneswar",
    "Ranchi",
    "Dehradun",
    "Shimla",
    "Gangtok",
    "Port Blair"
  ];

  // Fetch empanelments
  const fetchEmpanelments = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/empanelments");
      const data = await res.json();

      if (data.success) {
        setEmpanelments(data.data);
      } else {
        toast.error("Failed to fetch empanelments");
      }
    } catch (error) {
      console.error("Error fetching empanelments:", error);
      toast.error("Error loading empanelments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmpanelments();
  }, []);

  // Upload image to Cloudinary
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('files', file);
    formData.append('folder', 'empanelments');

    try {
      const res = await fetch('/api/upload', { 
        method: 'POST', 
        body: formData 
      });
      const data = await res.json();
      if (data && data.success && data.urls && data.urls[0]) {
        return data.urls[0];
      }
      throw new Error((data && data.message) || 'Upload failed');
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
      throw error;
    }
  };

  // Handle file selection for new empanelment
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB max for high-quality logos)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }

      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload JPG, PNG, WebP, SVG, or PDF files only");
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setNewEmp({
        ...newEmp,
        imageFile: file,
        imagePreview: previewUrl
      });
    }
  };

  // Handle file selection for edit
  const handleEditFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }

      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload JPG, PNG, WebP, SVG, or PDF files only");
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setEditData({
        ...editData,
        image: previewUrl
      });
    }
  };

  // Remove image for new empanelment
  const removeImage = () => {
    if (newEmp.imagePreview) {
      URL.revokeObjectURL(newEmp.imagePreview);
    }
    setNewEmp({
      ...newEmp,
      imageFile: null,
      imagePreview: "",
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  // Format date for input
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // Add new empanelment
  const handleAddEmp = async () => {
    // Validation
    if (!newEmp.title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (newEmp.title.length > 200) {
      toast.error("Title must be less than 200 characters");
      return;
    }
    if (newEmp.category && newEmp.category.length > 100) {
      toast.error("Category must be less than 100 characters");
      return;
    }
    if (newEmp.department && newEmp.department.length > 200) {
      toast.error("Department must be less than 200 characters");
      return;
    }

    try {
      let imageUrl = "";
      
      // Upload image if selected
      if (newEmp.imageFile) {
        const submitToast = toast.loading("Uploading image...");
        try {
          imageUrl = await uploadToCloudinary(newEmp.imageFile);
          toast.success("Image uploaded successfully!", { id: submitToast });
        } catch (uploadError) {
          toast.error("Failed to upload image", { id: submitToast });
          return;
        }
      }

      // Add empanelment via API
      const res = await fetch("/api/empanelments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newEmp.title.trim(),
          image: imageUrl,
          category: newEmp.category.trim(),
          department: newEmp.department.trim(),
          city: newEmp.city.trim(),
          empanelledDate: newEmp.empanelledDate || new Date().toISOString().split("T")[0],
          validity: newEmp.validity
        })
      });

      const data = await res.json();
      
      if (data.success) {
        toast.success("Empanelment added successfully!");
        
        // Reset form
        setNewEmp({
          title: "",
          imageFile: null,
          imagePreview: "",
          category: "",
          department: "",
          city: "",
          empanelledDate: "",
          validity: ""
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setShowAddForm(false);
        
        // Refresh list
        fetchEmpanelments();
      } else {
        toast.error(data.message || "Failed to add empanelment");
      }
    } catch (error) {
      console.error("Error adding empanelment:", error);
      toast.error("Error adding empanelment");
    }
  };

  // Start editing
  const startEdit = (emp) => {
    setEditingId(emp._id);
    setEditData({
      title: emp.title,
      image: emp.image || "",
      category: emp.category || "",
      department: emp.department || "",
      city: emp.city || "",
      empanelledDate: emp.empanelledDate || "",
      validity: emp.validity ? formatDateForInput(emp.validity) : ""
    });
  };

  // Save edit
  const handleSaveEdit = async (id) => {
    if (!editData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    try {
      let imageUrl = editData.image;
      
      // If image is a blob URL (new image uploaded), upload it
      if (editData.image && editData.image.startsWith('blob:')) {
        const submitToast = toast.loading("Uploading new image...");
        try {
          // Convert blob URL to file
          const response = await fetch(editData.image);
          const blob = await response.blob();
          const fileType = editData.image.includes('.pdf') ? 'application/pdf' : 'image/jpeg';
          const file = new File([blob], 'empanelment.jpg', { type: fileType });
          imageUrl = await uploadToCloudinary(file);
          toast.success("Image uploaded successfully!", { id: submitToast });
        } catch (uploadError) {
          toast.error("Failed to upload image", { id: submitToast });
          return;
        }
      }

      // Update empanelment via API
      const res = await fetch(`/api/empanelments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editData.title.trim(),
          image: imageUrl,
          category: editData.category.trim(),
          department: editData.department.trim(),
          city: editData.city.trim(),
          empanelledDate: editData.empanelledDate,
          validity: editData.validity
        })
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Empanelment updated successfully!");
        setEditingId(null);
        setEditData({
          title: "",
          image: "",
          category: "",
          department: "",
          city: "",
          empanelledDate: "",
          validity: ""
        });
        fetchEmpanelments();
      } else {
        toast.error(data.message || "Failed to update empanelment");
      }
    } catch (error) {
      console.error("Error updating empanelment:", error);
      toast.error("Error updating empanelment");
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditData({
      title: "",
      image: "",
      category: "",
      department: "",
      city: "",
      empanelledDate: "",
      validity: ""
    });
  };

  // Delete empanelment
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this empanelment?")) return;

    try {
      const res = await fetch(`/api/empanelments/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      
      if (data.success) {
        toast.success("Empanelment deleted successfully!");
        fetchEmpanelments();
      } else {
        toast.error(data.message || "Failed to delete empanelment");
      }
    } catch (error) {
      console.error("Error deleting empanelment:", error);
      toast.error("Error deleting empanelment");
    }
  };

  // Filter and search empanelments
  const filteredEmpanelments = empanelments.filter(emp => {
    const matchesSearch = emp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (emp.category && emp.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (emp.department && emp.department.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (emp.city && emp.city.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = categoryFilter === "all" || emp.category === categoryFilter;
    return matchesSearch && matchesFilter;
  });

  // Get all unique categories for filter dropdown
  const allCategories = ["all", ...new Set(empanelments.map(emp => emp.category).filter(Boolean))].sort();

  // Check if empanelment is valid/active
  const isEmpValid = (validityDate) => {
    if (!validityDate) return true; // If no validity date, assume valid
    const today = new Date();
    const validity = new Date(validityDate);
    return validity > today;
  };

  // Get validity status
  const getValidityStatus = (validityDate) => {
    if (!validityDate) return { status: "no-expiry", label: "No Expiry", color: "bg-gray-100 text-gray-800" };
    
    const today = new Date();
    const validity = new Date(validityDate);
    const diffTime = validity - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { status: "expired", label: "Expired", color: "bg-red-100 text-red-800" };
    } else if (diffDays <= 30) {
      return { status: "expiring-soon", label: `Expires in ${diffDays} days`, color: "bg-yellow-100 text-yellow-800" };
    } else {
      return { status: "active", label: "Valid", color: "bg-green-100 text-green-800" };
    }
  };

  // Get file type icon
  const getFileTypeIcon = (url) => {
    if (!url) return <FileText className="w-4 h-4" />;
    if (url.toLowerCase().endsWith('.pdf')) return <FileText className="w-4 h-4 text-red-500" />;
    if (url.toLowerCase().match(/\.(jpg|jpeg|png|webp|svg)$/)) return <img src={url} alt="Preview" className="w-4 h-4 object-cover" />;
    return <FileText className="w-4 h-4" />;
  };

  // Get all unique cities for filter
  const allCities = ["all", ...new Set(empanelments.map(emp => emp.city).filter(Boolean))].sort();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`${glass} rounded-3xl p-6 mb-6`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Empanelments Management</h1>
                <p className="text-gray-600 mt-1">Manage accreditations, certifications, and government empanelments</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              {showAddForm ? "Cancel" : "Add New Empanelment"}
            </motion.button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className={`${cardGlass} rounded-2xl p-5`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Empanelments</p>
                <p className="text-2xl font-bold text-gray-900">{empanelments.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className={`${cardGlass} rounded-2xl p-5`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active/Valid</p>
                <p className="text-2xl font-bold text-gray-900">
                  {empanelments.filter(emp => isEmpValid(emp.validity)).length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <BadgeCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className={`${cardGlass} rounded-2xl p-5`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(empanelments.map(emp => emp.category).filter(Boolean)).size}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <Tag className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className={`${cardGlass} rounded-2xl p-5`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cities</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(empanelments.map(emp => emp.city).filter(Boolean)).size}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Add New Empanelment Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`${cardGlass} rounded-2xl p-6 mb-6 overflow-hidden`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Add New Empanelment</h2>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-red-500">*</span>
                  <span className="text-gray-600">Required fields</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Basic Information Section */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                    Basic Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Title Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title / Name *
                      </label>
                      <input
                        type="text"
                        value={newEmp.title}
                        onChange={(e) => setNewEmp({ ...newEmp, title: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/50"
                        placeholder="e.g., CPWD Empanelment for Architectural Services"
                        maxLength={200}
                      />
                      <div className="flex justify-between mt-2">
                        <div />
                        <span className="text-sm text-gray-500">
                          {newEmp.title.length}/200
                        </span>
                      </div>
                    </div>

                    {/* Category Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={newEmp.category}
                        onChange={(e) => setNewEmp({ ...newEmp, category: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/50"
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat, index) => (
                          <option key={index} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Department Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Department / Authority
                      </label>
                      <select
                        value={newEmp.department}
                        onChange={(e) => setNewEmp({ ...newEmp, department: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/50"
                      >
                        <option value="">Select Department</option>
                        {departments.map((dept, index) => (
                          <option key={index} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* City Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <select
                        value={newEmp.city}
                        onChange={(e) => setNewEmp({ ...newEmp, city: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/50"
                      >
                        <option value="">Select City</option>
                        {indianCities.map((city, index) => (
                          <option key={index} value={city}>
                            {city}
                          </option>
                        ))}
                        <option value="other">Other</option>
                      </select>
                      {newEmp.city === "other" && (
                        <input
                          type="text"
                          value={newEmp.city}
                          onChange={(e) => setNewEmp({ ...newEmp, city: e.target.value })}
                          className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/50"
                          placeholder="Enter city name"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Dates Section */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-green-600" />
                    </div>
                    Dates
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Empanelled Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Empanelled Date
                      </label>
                      <input
                        type="date"
                        value={newEmp.empanelledDate}
                        onChange={(e) => setNewEmp({ ...newEmp, empanelledDate: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/50"
                      />
                    </div>

                    {/* Validity Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Validity Until (Optional)
                      </label>
                      <input
                        type="date"
                        value={newEmp.validity}
                        onChange={(e) => setNewEmp({ ...newEmp, validity: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/50"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        Leave empty for permanent/no expiry
                      </p>
                    </div>
                  </div>
                </div>

                {/* Document Upload Section */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Upload className="w-4 h-4 text-purple-600" />
                    </div>
                    Document / Logo Upload
                  </h3>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-gray-400 transition-colors duration-200 bg-white/30">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                      {/* Image Preview */}
                      <div className="relative">
                        <div className="w-40 h-40 rounded-xl border-2 border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
                          {newEmp.imagePreview ? (
                            <div className="relative w-full h-full">
                              {newEmp.imagePreview.endsWith('.pdf') ? (
                                <div className="w-full h-full bg-red-50 flex flex-col items-center justify-center p-4">
                                  <FileText className="w-12 h-12 text-red-400 mb-2" />
                                  <p className="text-xs text-gray-600">PDF Document</p>
                                </div>
                              ) : (
                                <img
                                  src={newEmp.imagePreview}
                                  alt="Document preview"
                                  className="w-full h-full object-contain p-4"
                                />
                              )}
                              <button
                                type="button"
                                onClick={removeImage}
                                className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="text-center p-6">
                              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                              <p className="text-sm text-gray-500">No document</p>
                              <p className="text-xs text-gray-400 mt-1">Logo, certificate, or empanelment letter</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Upload Controls */}
                      <div className="flex-1 space-y-4">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/jpeg,image/png,image/webp,image/svg+xml,application/pdf"
                          className="hidden"
                          id="document-upload"
                        />
                        <label
                          htmlFor="document-upload"
                          className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-colors cursor-pointer shadow-md"
                        >
                          <Upload className="w-5 h-5" />
                          Choose Document / Logo
                        </label>
                        
                        <div className="text-sm text-gray-500 space-y-2">
                          <p className="font-medium text-gray-700">Supported formats:</p>
                          <div className="grid grid-cols-2 gap-1">
                            <p>• JPG, PNG, WebP</p>
                            <p>• SVG (for logos)</p>
                            <p>• PDF (documents)</p>
                            <p>• Max size: 5MB</p>
                          </div>
                          <p className="text-xs text-gray-400 mt-3">
                            Upload empanelment letter, certificate, or official logo
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleAddEmp}
                    disabled={!newEmp.title.trim()}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-colors flex-1 flex items-center justify-center gap-3 text-lg font-medium shadow-lg"
                  >
                    <Check className="w-6 h-6" />
                    Add Empanelment
                  </button>
                  <button
                    onClick={() => {
                      setNewEmp({
                        title: "",
                        imageFile: null,
                        imagePreview: "",
                        category: "",
                        department: "",
                        city: "",
                        empanelledDate: "",
                        validity: ""
                      });
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                      setShowAddForm(false);
                    }}
                    className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-colors flex-1 text-lg font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search and Filter Bar */}
        <div className={`${glass} rounded-2xl p-5 mb-6`}>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/50 text-lg"
                placeholder="Search empanelments by title, category, department, or city..."
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="pl-12 w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/50 appearance-none text-lg"
                >
                  <option value="all">All Categories</option>
                  {allCategories.filter(cat => cat !== "all").map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Empanelments List */}
        <div className={`${cardGlass} rounded-2xl overflow-hidden`}>
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-gray-900">Empanelments</h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">
                  {filteredEmpanelments.length} of {empanelments.length} records
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={fetchEmpanelments}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Refresh"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-gray-600">Loading empanelments...</p>
              </div>
            ) : filteredEmpanelments.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <Shield className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {searchTerm || categoryFilter !== "all" ? "No matching empanelments found" : "No Empanelments Yet"}
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  {searchTerm || categoryFilter !== "all" 
                    ? "Try adjusting your search or filter criteria" 
                    : "Add your first empanelment to showcase your accreditations"}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddForm(true)}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 transition-all duration-300 flex items-center gap-2 mx-auto"
                >
                  <Plus className="w-5 h-5" />
                  Add First Empanelment
                </motion.button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEmpanelments.map((emp) => (
                  <motion.div
                    key={emp._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 ${
                      !isEmpValid(emp.validity) ? 'opacity-80 hover:opacity-100' : ''
                    }`}
                  >
                    {editingId === emp._id ? (
                      // Edit Mode
                      <div className="p-6 space-y-4 bg-white">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-gray-900">Edit Empanelment</h4>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getValidityStatus(emp.validity).color}`}>
                            {getValidityStatus(emp.validity).label}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Title *
                            </label>
                            <input
                              type="text"
                              value={editData.title}
                              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                              placeholder="Title"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                              </label>
                              <select
                                value={editData.category}
                                onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                              >
                                <option value="">Select</option>
                                {categories.map((cat, index) => (
                                  <option key={index} value={cat}>
                                    {cat}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Department
                              </label>
                              <input
                                type="text"
                                value={editData.department}
                                onChange={(e) => setEditData({ ...editData, department: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                                placeholder="Department"
                                list="edit-departments"
                              />
                              <datalist id="edit-departments">
                                {departments.map((dept, index) => (
                                  <option key={index} value={dept} />
                                ))}
                              </datalist>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                City
                              </label>
                              <input
                                type="text"
                                value={editData.city}
                                onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                                placeholder="City"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Empanelled Date
                              </label>
                              <input
                                type="date"
                                value={editData.empanelledDate}
                                onChange={(e) => setEditData({ ...editData, empanelledDate: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Validity Until
                            </label>
                            <input
                              type="date"
                              value={editData.validity}
                              onChange={(e) => setEditData({ ...editData, validity: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Document/Logo
                            </label>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg border border-gray-300 overflow-hidden flex items-center justify-center">
                                {editData.image ? (
                                  editData.image.includes('.pdf') ? (
                                    <FileText className="w-5 h-5 text-red-500" />
                                  ) : (
                                    <img src={editData.image} alt="Preview" className="w-full h-full object-cover" />
                                  )
                                ) : (
                                  <FileText className="w-5 h-5 text-gray-400" />
                                )}
                              </div>
                              <input
                                type="file"
                                onChange={handleEditFileChange}
                                accept="image/jpeg,image/png,image/webp,image/svg+xml,application/pdf"
                                className="flex-1 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-4">
                          <button
                            onClick={() => handleSaveEdit(emp._id)}
                            className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-colors text-sm flex items-center justify-center gap-2 flex-1"
                          >
                            <Check className="w-4 h-4" />
                            Save Changes
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm flex-1"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <div className="bg-white">
                        {/* Header with Validity Status */}
                        <div className="p-4 border-b border-gray-100">
                          <div className="flex items-center justify-between">
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${getValidityStatus(emp.validity).color}`}>
                              {getValidityStatus(emp.validity).label}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Calendar className="w-3 h-3" />
                              {formatDate(emp.empanelledDate)}
                            </div>
                          </div>
                        </div>

                        {/* Main Content */}
                        <div className="p-6">
                          {/* Document Preview */}
                          <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 rounded-xl border border-gray-200 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                              {emp.image ? (
                                emp.image.toLowerCase().endsWith('.pdf') ? (
                                  <div className="text-center p-3">
                                    <FileText className="w-8 h-8 text-red-400 mx-auto mb-1" />
                                    <span className="text-xs text-gray-600">PDF</span>
                                  </div>
                                ) : (
                                  <img
                                    src={emp.image}
                                    alt={emp.title}
                                    className="w-full h-full object-contain p-3"
                                  />
                                )
                              ) : (
                                <Shield className="w-8 h-8 text-gray-400" />
                              )}
                            </div>
                          </div>

                          {/* Title and Category */}
                          <h3 className="text-lg font-bold text-gray-900 mb-3 text-center line-clamp-2">
                            {emp.title}
                          </h3>

                          {/* Category Badge */}
                          {emp.category && (
                            <div className="flex justify-center mb-4">
                              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                                <Tag className="w-3 h-3" />
                                {emp.category}
                              </span>
                            </div>
                          )}

                          {/* Details */}
                          <div className="space-y-3 mb-6">
                            {emp.department && (
                              <div className="flex items-start gap-2">
                                <Building2 className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700 line-clamp-2">{emp.department}</span>
                              </div>
                            )}
                            {emp.city && (
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-700">{emp.city}</span>
                              </div>
                            )}
                          </div>

                          {/* Dates */}
                          <div className="border-t border-gray-100 pt-4">
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <p className="text-xs text-gray-500 mb-1">Empanelled</p>
                                <p className="font-medium text-gray-900">{formatDate(emp.empanelledDate)}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 mb-1">Valid Until</p>
                                <p className={`font-medium ${emp.validity ? 'text-gray-900' : 'text-gray-400'}`}>
                                  {emp.validity ? formatDate(emp.validity) : 'No expiry'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="p-4 border-t border-gray-100 bg-gray-50">
                          <div className="flex gap-2">
                            {/* View/Download Document */}
                            {emp.image && (
                              <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href={emp.image}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center gap-2 flex-1"
                              >
                                <Download className="w-4 h-4" />
                                View
                              </motion.a>
                            )}

                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => startEdit(emp)}
                              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm flex items-center justify-center gap-2 flex-1"
                            >
                              <Edit2 className="w-4 h-4" />
                              Edit
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDelete(emp._id)}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center justify-center gap-2 flex-1"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}