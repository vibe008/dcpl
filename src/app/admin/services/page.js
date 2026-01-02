"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export default function ServicesManagement() {
    const availableServices = [
        "Architecture",
        "Interior Design",
        "Urban Planning",
        "Heritage Conservation",
        "Project Management",
    ];

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);

    // New service state
    const [newService, setNewService] = useState({
        title: "",
        description: "",
        type: "" // Dropdown selected value
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [customTitleInput, setCustomTitleInput] = useState("");
    const dropdownRef = useRef(null);

    const glass = "bg-white/80 backdrop-blur-xl border border-white/30 shadow-sm";
    const cardGlass = "bg-white/70 backdrop-blur-lg border border-white/20 shadow-lg";

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Fetch services
    const fetchServices = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/services");
            const data = await res.json();

            if (data.success) {
                setServices(data.data);
            } else {
                toast.error("Failed to fetch services");
            }
        } catch (error) {
            console.error("Error fetching services:", error);
            toast.error("Error loading services");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    // Handle service type selection
    const handleServiceTypeSelect = (serviceType) => {
        setNewService({ ...newService, type: serviceType });
        setIsDropdownOpen(false);
        setCustomTitleInput(""); // Clear custom input when selecting from dropdown
    };

    // Add custom title
    const addCustomTitle = () => {
        if (customTitleInput.trim()) {
            setNewService({ ...newService, type: customTitleInput.trim() });
            setCustomTitleInput("");
            setIsDropdownOpen(false);
        }
    };

    // Clear service type selection
    const clearServiceType = () => {
        setNewService({ ...newService, type: "" });
        setCustomTitleInput("");
    };

    // Add new service
    const handleAddService = async () => {
        if (!newService.type.trim()) {
            toast.error("Please select or enter a service type");
            return;
        }

        if (newService.type.length > 100) {
            toast.error("Service type must be less than 100 characters");
            return;
        }

        try {
            const res = await fetch("/api/services", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: newService.type, // Using type as title
                    description: newService.description
                })
            });

            const data = await res.json();
            console.log("data", data)
            if (data.success) {
                toast.success("Service added successfully!");
                setNewService({ title: "", description: "", type: "" });
                setCustomTitleInput("");
                setShowAddForm(false);
                fetchServices();
            } else {
                toast.error(data.message || "Failed to add service");
            }
        } catch (error) {
            console.error("Error adding service:", error);
            toast.error("Error adding service");
        }
    };

    // Start editing
    const startEdit = (service) => {
        setEditingId(service._id);
        setEditTitle(service.title);
        setEditDescription(service.description);
    };

    // Save edit
    const handleSaveEdit = async (id) => {
        if (!editTitle.trim()) {
            toast.error("Service type is required");
            return;
        }

        try {
            const res = await fetch(`/api/services/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: editTitle,
                    description: editDescription
                })
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Service updated successfully!");
                setEditingId(null);
                setEditTitle("");
                setEditDescription("");
                fetchServices();
            } else {
                toast.error(data.message || "Failed to update service");
            }
        } catch (error) {
            console.error("Error updating service:", error);
            toast.error("Error updating service");
        }
    };

    // Cancel edit
    const cancelEdit = () => {
        setEditingId(null);
        setEditTitle("");
        setEditDescription("");
    };

    // Delete service
    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this service?")) return;

        try {
            const res = await fetch(`/api/services/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();
            console.log('data',data)
            if (data.success) {
                toast.success("Service deleted successfully!");
                fetchServices();
            } else {
                toast.error(data.message || "Failed to delete service");
            }
        } catch (error) {
            console.error("Error deleting service:", error);
            toast.error("Error deleting service");
        }
    };

    // Project count for each service
    const getProjectCount = (service) => {
        return service.projects?.length || 0;
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
                                <h1 className="text-3xl font-bold text-gray-900">Services Management</h1>
                                <p className="text-gray-600 mt-1">Manage your services and their details</p>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowAddForm(!showAddForm)}
                            className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 shadow-lg shadow-gray-900/25 transition-all duration-300 flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            {showAddForm ? "Cancel" : "Add New Service"}
                        </motion.button>
                    </div>
                </div>

                {/* Add New Service Form */}
                <AnimatePresence>
                    {showAddForm && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className={`${cardGlass} rounded-2xl p-6 mb-6 overflow-hidden`}
                        >
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Service</h2>
                            <div className="space-y-6">
                                {/* Service Type Dropdown */}
                                <div className="relative" ref={dropdownRef}>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Service Type *
                                    </label>

                                    {/* Selected Service Display */}
                                    {newService.type && (
                                        <div className="mb-3">
                                            <div className="inline-flex items-center gap-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg">
                                                {newService.type}
                                                <button
                                                    type="button"
                                                    onClick={clearServiceType}
                                                    className="hover:text-gray-300 transition-colors"
                                                >
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Dropdown Button */}
                                    <button
                                        type="button"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200 bg-white/50 text-left flex items-center justify-between hover:bg-white/70"
                                    >
                                        <span className="text-gray-700">
                                            {newService.type || "Select or enter service type"}
                                        </span>
                                        <svg
                                            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {/* Dropdown Menu */}
                                    <AnimatePresence>
                                        {isDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                className="absolute z-50 mt-2 w-full max-h-60 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                            >
                                                <div className="p-2">
                                                    {/* Predefined Services List */}
                                                    <div className="mb-2">
                                                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-2">Select from list</p>
                                                        <div className="space-y-1">
                                                            {availableServices.map((service) => (
                                                                <button
                                                                    key={service}
                                                                    type="button"
                                                                    onClick={() => handleServiceTypeSelect(service)}
                                                                    className={`w-full text-left px-4 py-2.5 text-sm rounded-lg transition-all duration-200 flex items-center justify-between ${newService.type === service
                                                                        ? 'bg-gray-900 text-white'
                                                                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                                                        }`}
                                                                >
                                                                    <span>{service}</span>
                                                                    {newService.type === service && (
                                                                        <svg
                                                                            className="w-4 h-4 text-white"
                                                                            fill="none"
                                                                            stroke="currentColor"
                                                                            viewBox="0 0 24 24"
                                                                        >
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                        </svg>
                                                                    )}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Custom Service Input */}
                                                    <div className="pt-4 border-t border-gray-200">
                                                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-2">Or enter custom</p>
                                                        <div className="flex gap-2 px-2">
                                                            <input
                                                                type="text"
                                                                value={customTitleInput}
                                                                onChange={(e) => setCustomTitleInput(e.target.value)}
                                                                onKeyPress={(e) => e.key === 'Enter' && addCustomTitle()}
                                                                placeholder="Enter custom service type"
                                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 text-sm"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={addCustomTitle}
                                                                disabled={!customTitleInput.trim()}
                                                                className="px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm"
                                                            >
                                                                Add
                                                            </button>
                                                        </div>
                                                        <p className="text-xs text-gray-500 mt-2 px-2">
                                                            Press Enter or click Add to use custom service
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {!newService.type && (
                                        <p className="text-sm text-gray-500 mt-2">
                                            Select from list or enter custom service type
                                        </p>
                                    )}
                                </div>

                                {/* Description Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        value={newService.description}
                                        onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200 bg-white/50 resize-none"
                                        placeholder="Enter service description (optional)"
                                        maxLength={500}
                                    />
                                    <div className="flex justify-between mt-2">
                                        <div />
                                        <span className="text-sm text-gray-500">
                                            {newService.description.length}/500
                                        </span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4 pt-4 border-t border-gray-200">
                                    <button
                                        onClick={handleAddService}
                                        disabled={!newService.type.trim()}
                                        className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex-1"
                                    >
                                        Add Service
                                    </button>
                                    <button
                                        onClick={() => {
                                            setNewService({ title: "", description: "", type: "" });
                                            setCustomTitleInput("");
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

                {/* Services List */}
                <div className={`${cardGlass} rounded-2xl p-6`}>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">Existing Services</h2>
                        <span className="text-sm text-gray-500">
                            {services.length} service{services.length !== 1 ? 's' : ''} found
                        </span>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="w-8 h-8 border-3 border-gray-900 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : services.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Services Found</h3>
                            <p className="text-gray-600">Add your first service to get started</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {services.map((service) => (
                                <motion.div
                                    key={service._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors"
                                >
                                    {editingId === service._id ? (
                                        // Edit Mode
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Service Type *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={editTitle}
                                                    onChange={(e) => setEditTitle(e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500"
                                                    placeholder="Enter service type"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Description
                                                </label>
                                                <textarea
                                                    value={editDescription}
                                                    onChange={(e) => setEditDescription(e.target.value)}
                                                    rows={3}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 resize-none"
                                                    placeholder="Enter service description"
                                                />
                                            </div>

                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleSaveEdit(service._id)}
                                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={cancelEdit}
                                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        // View Mode
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {service.title}
                                                    </h3>
                                                </div>

                                                {service.description && (
                                                    <p className="text-gray-600 text-sm mb-3 ml-13">
                                                        {service.description}
                                                    </p>
                                                )}

                                                <div className="flex items-center gap-4 text-sm text-gray-500 ml-13">
                                                    <span className="flex items-center gap-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                        </svg>
                                                        {getProjectCount(service)} project{getProjectCount(service) !== 1 ? 's' : ''}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                                        </svg>
                                                        {availableServices.includes(service.title) ? "Predefined" : "Custom"}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => startEdit(service)}
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
                                                    onClick={() => handleDelete(service._id)}
                                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center gap-1"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    Delete
                                                </motion.button>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Stats Card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className={`${cardGlass} rounded-2xl p-4`}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Services</p>
                                <p className="text-2xl font-bold text-gray-900">{services.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className={`${cardGlass} rounded-2xl p-4`}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Projects</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {services.reduce((total, service) => total + getProjectCount(service), 0)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={`${cardGlass} rounded-2xl p-4`}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Custom Services</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {services.filter(s => !availableServices.includes(s.title)).length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}