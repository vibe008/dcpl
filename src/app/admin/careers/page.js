// app/careers/CareersManagement.js
'use client';

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export default function CareersManagement() {
    const positionTypes = ["full-time", "part-time", "contract", "internship", "temp"];

    const [positions, setPositions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    
    // Form state
    const [formData, setFormData] = useState({
        title: "",
        department: "",
        location: "",
        type: "full-time",
        description: "",
        requirements: [""],
        responsibilities: [""],
        isActive: true
    });
    const [errors, setErrors] = useState({});

    const glass = "bg-white/80 backdrop-blur-xl border border-white/30 shadow-sm";
    const cardGlass = "bg-white/70 backdrop-blur-lg border border-white/20 shadow-lg";

    // Fetch positions
    const fetchPositions = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/careers");
            const data = await res.json();

            if (data.success) {
                setPositions(data.data);
            } else {
                toast.error("Failed to fetch career positions");
            }
        } catch (error) {
            console.error("Error fetching positions:", error);
            toast.error("Error loading positions");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPositions();
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    // Handle array field changes (requirements, responsibilities)
    const handleArrayFieldChange = (fieldName, index, value) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: prev[fieldName].map((item, i) => 
                i === index ? value : item
            )
        }));
    };

    // Add new item to array field
    const addArrayItem = (fieldName) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: [...prev[fieldName], ""]
        }));
    };

    // Remove item from array field
    const removeArrayItem = (fieldName, index) => {
        if (formData[fieldName].length > 1) {
            setFormData(prev => ({
                ...prev,
                [fieldName]: prev[fieldName].filter((_, i) => i !== index)
            }));
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.title.trim()) {
            newErrors.title = "Title is required";
        }
        
        if (!formData.department.trim()) {
            newErrors.department = "Department is required";
        }
        
        if (!formData.location.trim()) {
            newErrors.location = "Location is required";
        }
        
        if (!formData.description.trim()) {
            newErrors.description = "Description is required";
        }
        
        // Validate array fields
        const hasEmptyRequirements = formData.requirements.some(req => !req.trim());
        if (hasEmptyRequirements) {
            newErrors.requirements = "All requirements must be filled";
        }
        
        const hasEmptyResponsibilities = formData.responsibilities.some(resp => !resp.trim());
        if (hasEmptyResponsibilities) {
            newErrors.responsibilities = "All responsibilities must be filled";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Generate slug from title
    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-')     // Replace spaces with hyphens
            .replace(/-+/g, '-')      // Replace multiple hyphens with single
            .trim();
    };

    // Add new position
    const handleAddPosition = async () => {
        if (!validateForm()) {
            toast.error("Please fill all required fields correctly");
            return;
        }

        try {
            const positionData = {
                ...formData,
                slug: generateSlug(formData.title)
            };

            const res = await fetch("/api/careers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(positionData)
            });

            const data  = await res.json();
                 console.log('data',data)
            if (data.success) {
                toast.success("Position added successfully!");
                resetForm();
                setShowAddForm(false);
                fetchPositions();
            } else {
                toast.error(data.message || "Failed to add position");
            }
        } catch (error) {
            console.error("Error adding position:", error);
            toast.error("Error adding position");
        }
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            title: "",
            department: "",
            location: "",
            type: "full-time",
            description: "",
            requirements: [""],
            responsibilities: [""],
            isActive: true
        });
        setErrors({});
    };

    // Start editing
    const startEdit = (position) => {
        setEditingId(position._id);
        setFormData({
            title: position.title,
            department: position.department,
            location: position.location,
            type: position.type,
            description: position.description,
            requirements: position.requirements.length > 0 ? position.requirements : [""],
            responsibilities: position.responsibilities.length > 0 ? position.responsibilities : [""],
            isActive: position.isActive
        });
    };

    // Save edit
    const handleSaveEdit = async (id) => {
        if (!validateForm()) {
            toast.error("Please fill all required fields correctly");
            return;
        }

        try {
            const res = await fetch(`/api/careers/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    slug: generateSlug(formData.title)
                })
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Position updated successfully!");
                setEditingId(null);
                resetForm();
                fetchPositions();
            } else {
                toast.error(data.message || "Failed to update position");
            }
        } catch (error) {
            console.error("Error updating position:", error);
            toast.error("Error updating position");
        }
    };

    // Cancel edit
    const cancelEdit = () => {
        setEditingId(null);
        resetForm();
    };

    // Delete position
    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this position?")) return;

        try {
            const res = await fetch(`/api/careers/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Position deleted successfully!");
                fetchPositions();
            } else {
                toast.error(data.message || "Failed to delete position");
            }
        } catch (error) {
            console.error("Error deleting position:", error);
            toast.error("Error deleting position");
        }
    };

    // Toggle active status
    const toggleActive = async (id, currentStatus) => {
        try {
            const res = await fetch(`/api/careers/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive: !currentStatus })
            });

            const data = await res.json();

            if (data.success) {
                toast.success(`Position ${!currentStatus ? 'activated' : 'deactivated'}!`);
                fetchPositions();
            } else {
                toast.error(data.message || "Failed to update status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Error updating status");
        }
    };

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Get badge color based on type
    const getTypeColor = (type) => {
        const colors = {
            'full-time': 'bg-green-100 text-green-800',
            'part-time': 'bg-blue-100 text-blue-800',
            'contract': 'bg-purple-100 text-purple-800',
            'internship': 'bg-yellow-100 text-yellow-800',
            'temp': 'bg-gray-100 text-gray-800'
        };
        return colors[type] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
            <Toaster position="top-right" />
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className={`${glass} rounded-3xl p-6 mb-6`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Career Positions</h1>
                                <p className="text-gray-600 mt-1">Manage job openings and career opportunities</p>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                resetForm();
                                setShowAddForm(!showAddForm);
                            }}
                            className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 shadow-lg shadow-gray-900/25 transition-all duration-300 flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            {showAddForm ? "Cancel" : "Add New Position"}
                        </motion.button>
                    </div>
                </div>

                {/* Add/Edit Form */}
                <AnimatePresence>
                    {(showAddForm || editingId) && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className={`${cardGlass} rounded-2xl p-6 mb-6 overflow-hidden`}
                        >
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                {editingId ? "Edit Position" : "Add New Position"}
                            </h2>
                            
                            <div className="space-y-6">
                                {/* Basic Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Job Title *
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border ${errors.title ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200 bg-white/50`}
                                            placeholder="e.g., Senior Architect"
                                        />
                                        {errors.title && (
                                            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Department *
                                        </label>
                                        <input
                                            type="text"
                                            name="department"
                                            value={formData.department}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border ${errors.department ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200 bg-white/50`}
                                            placeholder="e.g., Architecture"
                                        />
                                        {errors.department && (
                                            <p className="mt-1 text-sm text-red-600">{errors.department}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Location *
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border ${errors.location ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200 bg-white/50`}
                                            placeholder="e.g., New York, NY"
                                        />
                                        {errors.location && (
                                            <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Employment Type *
                                        </label>
                                        <select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200 bg-white/50"
                                        >
                                            {positionTypes.map(type => (
                                                <option key={type} value={type}>
                                                    {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Job Description *
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className={`w-full px-4 py-3 border ${errors.description ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200 bg-white/50 resize-none`}
                                        placeholder="Describe the role, responsibilities, and what makes it exciting..."
                                    />
                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                    )}
                                </div>

                                {/* Requirements */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Requirements *
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => addArrayItem('requirements')}
                                            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Add Requirement
                                        </button>
                                    </div>
                                    {errors.requirements && (
                                        <p className="mb-2 text-sm text-red-600">{errors.requirements}</p>
                                    )}
                                    <div className="space-y-2">
                                        {formData.requirements.map((req, index) => (
                                            <div key={index} className="flex gap-2">
                                                <div className="flex-1 flex items-center gap-3">
                                                    <div className="w-2 h-2 rounded-full bg-gray-400" />
                                                    <input
                                                        type="text"
                                                        value={req}
                                                        onChange={(e) => handleArrayFieldChange('requirements', index, e.target.value)}
                                                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-500/20 focus:border-gray-500"
                                                        placeholder={`Requirement ${index + 1}`}
                                                    />
                                                </div>
                                                {formData.requirements.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeArrayItem('requirements', index)}
                                                        className="px-2 text-gray-400 hover:text-red-500"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Responsibilities */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Responsibilities *
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => addArrayItem('responsibilities')}
                                            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Add Responsibility
                                        </button>
                                    </div>
                                    {errors.responsibilities && (
                                        <p className="mb-2 text-sm text-red-600">{errors.responsibilities}</p>
                                    )}
                                    <div className="space-y-2">
                                        {formData.responsibilities.map((resp, index) => (
                                            <div key={index} className="flex gap-2">
                                                <div className="flex-1 flex items-center gap-3">
                                                    <div className="w-2 h-2 rounded-full bg-gray-400" />
                                                    <input
                                                        type="text"
                                                        value={resp}
                                                        onChange={(e) => handleArrayFieldChange('responsibilities', index, e.target.value)}
                                                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-500/20 focus:border-gray-500"
                                                        placeholder={`Responsibility ${index + 1}`}
                                                    />
                                                </div>
                                                {formData.responsibilities.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeArrayItem('responsibilities', index)}
                                                        className="px-2 text-gray-400 hover:text-red-500"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        name="isActive"
                                        checked={formData.isActive}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-gray-900 rounded focus:ring-gray-500/20 border-gray-300"
                                    />
                                    <label htmlFor="isActive" className="text-sm text-gray-700">
                                        Active (Visible to candidates)
                                    </label>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4 pt-4 border-t border-gray-200">
                                    <button
                                        onClick={editingId ? () => handleSaveEdit(editingId) : handleAddPosition}
                                        className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors flex-1"
                                    >
                                        {editingId ? "Update Position" : "Add Position"}
                                    </button>
                                    <button
                                        onClick={editingId ? cancelEdit : () => {
                                            resetForm();
                                            setShowAddForm(false);
                                        }}
                                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors flex-1"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Positions List */}
                <div className={`${cardGlass} rounded-2xl p-6`}>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">Current Openings</h2>
                        <span className="text-sm text-gray-500">
                            {positions.length} position{positions.length !== 1 ? 's' : ''} found
                        </span>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="w-8 h-8 border-3 border-gray-900 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : positions.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Positions Found</h3>
                            <p className="text-gray-600">Add your first career position to get started</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {positions.map((position) => (
                                <motion.div
                                    key={position._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-start gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <h3 className="text-lg font-semibold text-gray-900">
                                                            {position.title}
                                                        </h3>
                                                        <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(position.type)}`}>
                                                            {position.type.charAt(0).toUpperCase() + position.type.slice(1).replace('-', ' ')}
                                                        </span>
                                                        <span className={`px-2 py-1 text-xs rounded-full ${position.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                            {position.isActive ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </div>
                                                    
                                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                                                        <span className="flex items-center gap-1">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                            </svg>
                                                            {position.department}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            {position.location}
                                                        </span>
                                                        <span className="text-gray-400">
                                                            Added: {formatDate(position.createdAt)}
                                                        </span>
                                                    </div>

                                                    {position.description && (
                                                        <p className="text-gray-600 text-sm line-clamp-2">
                                                            {position.description}
                                                        </p>
                                                    )}

                                                    <div className="flex flex-wrap gap-2 mt-3">
                                                        <div className="text-xs text-gray-500">
                                                            <span className="font-medium">Requirements:</span> {position.requirements?.length || 0}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            <span className="font-medium">Responsibilities:</span> {position.responsibilities?.length || 0}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-2">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => toggleActive(position._id, position.isActive)}
                                                className={`px-4 py-2 rounded-lg transition-colors text-sm flex items-center gap-1 ${
                                                    position.isActive 
                                                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                                                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                                                }`}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    {position.isActive ? (
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    ) : (
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    )}
                                                </svg>
                                                {position.isActive ? 'Deactivate' : 'Activate'}
                                            </motion.button>

                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => startEdit(position)}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-1"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Edit
                                            </motion.button>

                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleDelete(position._id)}
                                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center gap-1"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Delete
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Stats Card */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                    <div className={`${cardGlass} rounded-2xl p-4`}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Positions</p>
                                <p className="text-2xl font-bold text-gray-900">{positions.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className={`${cardGlass} rounded-2xl p-4`}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Active Positions</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {positions.filter(p => p.isActive).length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={`${cardGlass} rounded-2xl p-4`}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Full-time Jobs</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {positions.filter(p => p.type === 'full-time').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={`${cardGlass} rounded-2xl p-4`}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
                                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Departments</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {[...new Set(positions.map(p => p.department))].length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}