"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  Building2,
  Users,
  Briefcase,
  Edit2,
  Trash2,
  Plus,
  X,
  Check,
  Upload,
  Image as ImageIcon,
  Globe,
  Factory,
  Home,
  Store,
  Hotel,
  School,
  Hospital,
  Building,
  Search,
  Filter,
  Banknote
} from "lucide-react";

export default function ClientManagement() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");

  // Edit state
  const [editData, setEditData] = useState({
    name: "",
    sector: "",
    logo: ""
  });

  // Add state
  const [newClient, setNewClient] = useState({
    name: "",
    sector: "",
    logoFile: null,
    logoPreview: "",
    logoUrl: ""
  });

  const fileInputRef = useRef(null);
  const glass = "bg-white/80 backdrop-blur-xl border border-white/30 shadow-sm";
  const cardGlass = "bg-white/70 backdrop-blur-lg border border-white/20 shadow-lg";

  // Available sectors suggestions
  const sectorSuggestions = [
    "Residential",
    "Commercial",
    "Hospitality",
    "Healthcare",
    "Education",
    "Industrial",
    "Government",
    "Retail",
    "Mixed-Use",
    "Cultural",
    "Sports",
    "Infrastructure",
    "Master Planning",
    "Sustainability",
    "Interior Design",
    "Urban Design"
  ];

  // Common sectors with icons
  const commonSectors = [
    { value: "Residential", icon: <Home className="w-4 h-4" />, color: "bg-blue-100 text-blue-600" },
    { value: "Commercial", icon: <Building className="w-4 h-4" />, color: "bg-purple-100 text-purple-600" },
    { value: "Hospitality", icon: <Hotel className="w-4 h-4" />, color: "bg-amber-100 text-amber-600" },
    { value: "Healthcare", icon: <Hospital className="w-4 h-4" />, color: "bg-red-100 text-red-600" },
    { value: "Education", icon: <School className="w-4 h-4" />, color: "bg-green-100 text-green-600" },
    { value: "Industrial", icon: <Factory className="w-4 h-4" />, color: "bg-gray-100 text-gray-600" },
    { value: "Retail", icon: <Store className="w-4 h-4" />, color: "bg-indigo-100 text-indigo-600" },
    { value: "Government", icon: <Banknote className="w-4 h-4" />, color: "bg-yellow-100 text-yellow-600" }
  ];

  // Fetch clients
  const fetchClients = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/client");
      const data = await res.json();

      if (data.success) {
        setClients(data.data);
      } else {
        toast.error("Failed to fetch clients");
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
      toast.error("Error loading clients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Upload logo to Cloudinary
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('files', file);
    formData.append('folder', 'clients');

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
      toast.error("Failed to upload logo");
      throw error;
    }
  };

  // Handle file selection for new client
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size must be less than 2MB");
        return;
      }

      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload JPG, PNG, WebP, or SVG files only");
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setNewClient({
        ...newClient,
        logoFile: file,
        logoPreview: previewUrl
      });
    }
  };

  // Handle file selection for edit
  const handleEditFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size must be less than 2MB");
        return;
      }

      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload JPG, PNG, WebP, or SVG files only");
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setEditData({
        ...editData,
        logo: previewUrl
      });
    }
  };

  // Remove logo for new client
  const removeLogo = () => {
    if (newClient.logoPreview) {
      URL.revokeObjectURL(newClient.logoPreview);
    }
    setNewClient({
      ...newClient,
      logoFile: null,
      logoPreview: "",
      logoUrl: ""
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Add new client
  const handleAddClient = async () => {
    // Validation
    if (!newClient.name.trim()) {
      toast.error("Client name is required");
      return;
    }
    if (!newClient.sector.trim()) {
      toast.error("Sector is required");
      return;
    }
    if (newClient.name.length > 100) {
      toast.error("Client name must be less than 100 characters");
      return;
    }
    if (newClient.sector.length > 50) {
      toast.error("Sector must be less than 50 characters");
      return;
    }

    try {
      let logoUrl = "";
      
      // Upload logo if selected
      if (newClient.logoFile) {
        const submitToast = toast.loading("Uploading logo...");
        try {
          logoUrl = await uploadToCloudinary(newClient.logoFile);
          toast.success("Logo uploaded successfully!", { id: submitToast });
        } catch (uploadError) {
          toast.error("Failed to upload logo", { id: submitToast });
          return;
        }
      }

      // Add client via API
      const res = await fetch("/api/client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newClient.name.trim(),
          sector: newClient.sector.trim(),
          logo: logoUrl
        })
      });

      const data = await res.json();
           console.log('adding data',data)
      if (data.success) {
        toast.success("Client added successfully!");
        
        // Reset form
        setNewClient({
          name: "",
          sector: "",
          logoFile: null,
          logoPreview: "",
          logoUrl: ""
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setShowAddForm(false);
        
        // Refresh list
        fetchClients();
      } else {
        toast.error(data.message || "Failed to add client");
      }
    } catch (error) {
      console.error("Error adding client:", error);
      toast.error("Error adding client");
    }
  };

  // Start editing
  const startEdit = (client) => {
    setEditingId(client._id);
    setEditData({
      name: client.name,
      sector: client.sector,
      logo: client.logo || ""
    });
  };

  // Save edit
  const handleSaveEdit = async (id) => {
    if (!editData.name.trim()) {
      toast.error("Client name is required");
      return;
    }
    if (!editData.sector.trim()) {
      toast.error("Sector is required");
      return;
    }

    try {
      let logoUrl = editData.logo;
      
      // If logo is a blob URL (new logo uploaded), upload it
      if (editData.logo && editData.logo.startsWith('blob:')) {
        const submitToast = toast.loading("Uploading new logo...");
        try {
          // Convert blob URL to file
          const response = await fetch(editData.logo);
          const blob = await response.blob();
          const file = new File([blob], 'logo.jpg', { type: 'image/jpeg' });
          logoUrl = await uploadToCloudinary(file);
          toast.success("Logo uploaded successfully!", { id: submitToast });
        } catch (uploadError) {
          toast.error("Failed to upload logo", { id: submitToast });
          return;
        }
      }

      // Update client via API
      const res = await fetch(`/api/client/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editData.name.trim(),
          sector: editData.sector.trim(),
          logo: logoUrl
        })
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Client updated successfully!");
        setEditingId(null);
        setEditData({
          name: "",
          sector: "",
          logo: ""
        });
        fetchClients();
      } else {
        toast.error(data.message || "Failed to update client");
      }
    } catch (error) {
      console.error("Error updating client:", error);
      toast.error("Error updating client");
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditData({
      name: "",
      sector: "",
      logo: ""
    });
  };

  // Delete client
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this client?")) return;

    try {
      const res = await fetch(`/api/client/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      
      if (data.success) {
        toast.success("Client deleted successfully!");
        fetchClients();
      } else {
        toast.error(data.message || "Failed to delete client");
      }
    } catch (error) {
      console.error("Error deleting client:", error);
      toast.error("Error deleting client");
    }
  };

  // Filter and search clients
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.sector.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = sectorFilter === "all" || client.sector === sectorFilter;
    return matchesSearch && matchesFilter;
  });

  // Stats calculations
  const getTotalClients = () => {
    return clients.length;
  };

  const getUniqueSectors = () => {
    const sectors = clients.map(client => client.sector);
    return [...new Set(sectors)].length;
  };

  const getClientWithLogo = () => {
    return clients.filter(client => client.logo && client.logo.trim() !== "").length;
  };

  // Get all unique sectors for filter dropdown
  const allSectors = [...new Set(clients.map(client => client.sector))].sort();

  // Get sector icon
  const getSectorIcon = (sector) => {
    const commonSector = commonSectors.find(s => s.value === sector);
    return commonSector ? commonSector.icon : <Globe className="w-4 h-4" />;
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
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Client Management</h1>
                <p className="text-gray-600 mt-1">Manage your clients and their information</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 shadow-lg shadow-gray-900/25 transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              {showAddForm ? "Cancel" : "Add New Client"}
            </motion.button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className={`${cardGlass} rounded-2xl p-4`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900">{getTotalClients()}</p>
              </div>
            </div>
          </div>

          <div className={`${cardGlass} rounded-2xl p-4`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Sectors</p>
                <p className="text-2xl font-bold text-gray-900">{getUniqueSectors()}</p>
              </div>
            </div>
          </div>

          <div className={`${cardGlass} rounded-2xl p-4`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">With Logo</p>
                <p className="text-2xl font-bold text-gray-900">{getClientWithLogo()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add New Client Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`${cardGlass} rounded-2xl p-6 mb-6 overflow-hidden`}
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Client</h2>
              <div className="space-y-6">
                {/* Logo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Client Logo (Optional)
                  </label>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    {/* Logo Preview */}
                    <div className="relative">
                      <div className="w-32 h-32 rounded-xl border-2 border-dashed border-gray-300 overflow-hidden bg-gray-50 flex items-center justify-center">
                        {newClient.logoPreview ? (
                          <div className="relative w-full h-full">
                            <img
                              src={newClient.logoPreview}
                              alt="Logo preview"
                              className="w-full h-full object-contain p-4"
                            />
                            <button
                              type="button"
                              onClick={removeLogo}
                              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="text-center p-4">
                            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-xs text-gray-500">No logo</p>
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
                        accept="image/jpeg,image/png,image/webp,image/svg+xml"
                        className="hidden"
                        id="logo-upload"
                      />
                      <label
                        htmlFor="logo-upload"
                        className="inline-flex items-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <Upload className="w-5 h-5" />
                        Choose Logo
                      </label>
                      
                      <div className="text-sm text-gray-500 space-y-1">
                        <p>• JPG, PNG, WebP, or SVG</p>
                        <p>• Max size: 2MB</p>
                        <p>• Recommended: 400×400 pixels</p>
                        <p>• SVG recommended for best quality</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Client Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200 bg-white/50"
                    placeholder="Enter client/company name"
                    maxLength={100}
                  />
                  <div className="flex justify-between mt-2">
                    <div />
                    <span className="text-sm text-gray-500">
                      {newClient.name.length}/100
                    </span>
                  </div>
                </div>

                {/* Sector Input with Suggestions */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sector / Industry *
                  </label>
                  
                  {/* Common Sector Quick Selection */}
                  <div className="mb-3">
                    <p className="text-sm text-gray-600 mb-2">Quick select:</p>
                    <div className="flex flex-wrap gap-2">
                      {commonSectors.map((sector) => (
                        <button
                          key={sector.value}
                          type="button"
                          onClick={() => setNewClient({ ...newClient, sector: sector.value })}
                          className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${newClient.sector === sector.value
                            ? 'ring-2 ring-gray-900 ring-offset-2 ' + sector.color
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {sector.icon}
                          {sector.value}
                        </button>
                      ))}
                    </div>
                  </div>

                  <input
                    type="text"
                    value={newClient.sector}
                    onChange={(e) => setNewClient({ ...newClient, sector: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200 bg-white/50"
                    placeholder="e.g., Commercial, Residential, Healthcare"
                    maxLength={50}
                    list="sector-suggestions"
                  />
                  <datalist id="sector-suggestions">
                    {sectorSuggestions.map((sector, idx) => (
                      <option key={idx} value={sector} />
                    ))}
                  </datalist>
                  <div className="flex justify-between mt-2">
                    <div className="text-sm text-gray-500">
                      Select from quick picks or type custom
                    </div>
                    <span className="text-sm text-gray-500">
                      {newClient.sector.length}/50
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleAddClient}
                    disabled={!newClient.name.trim() || !newClient.sector.trim()}
                    className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex-1 flex items-center justify-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Add Client
                  </button>
                  <button
                    onClick={() => {
                      setNewClient({
                        name: "",
                        sector: "",
                        logoFile: null,
                        logoPreview: "",
                        logoUrl: ""
                      });
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
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

        {/* Search and Filter Bar */}
        <div className={`${glass} rounded-2xl p-4 mb-6`}>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200 bg-white/50"
                placeholder="Search clients by name or sector..."
              />
            </div>

            {/* Sector Filter */}
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value)}
                className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200 bg-white/50 appearance-none"
              >
                <option value="all">All Sectors</option>
                {allSectors.map((sector) => (
                  <option key={sector} value={sector}>
                    {sector}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Clients List */}
        <div className={`${cardGlass} rounded-2xl p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Clients</h2>
            <span className="text-sm text-gray-500">
              Showing {filteredClients.length} of {clients.length} client{clients.length !== 1 ? 's' : ''}
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-3 border-gray-900 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredClients.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || sectorFilter !== "all" ? "No matching clients found" : "No Clients Found"}
              </h3>
              <p className="text-gray-600">
                {searchTerm || sectorFilter !== "all" 
                  ? "Try adjusting your search or filter criteria" 
                  : "Add your first client to get started"}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClients.map((client) => (
                <motion.div
                  key={client._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-all duration-300 hover:shadow-lg bg-white/50"
                >
                  {editingId === client._id ? (
                    // Edit Mode
                    <div className="p-6 space-y-4">
                      {/* Logo Edit */}
                      <div className="text-center">
                        <div className="relative inline-block">
                          <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-gray-200 bg-gray-50 mx-auto flex items-center justify-center">
                            {editData.logo ? (
                              <img
                                src={editData.logo}
                                alt="Logo preview"
                                className="w-full h-full object-contain p-2"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                <ImageIcon className="w-10 h-10 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <input
                            type="file"
                            onChange={handleEditFileChange}
                            accept="image/jpeg,image/png,image/webp,image/svg+xml"
                            className="hidden"
                            id={`edit-logo-${client._id}`}
                          />
                          <label
                            htmlFor={`edit-logo-${client._id}`}
                            className="absolute bottom-0 right-0 bg-gray-900 text-white p-1.5 rounded-full hover:bg-gray-800 cursor-pointer"
                          >
                            <Upload className="w-4 h-4" />
                          </label>
                        </div>
                      </div>

                      {/* Edit Form */}
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Client Name *
                          </label>
                          <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="Client name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Sector *
                          </label>
                          <input
                            type="text"
                            value={editData.sector}
                            onChange={(e) => setEditData({ ...editData, sector: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="Sector"
                            list={`edit-sector-${client._id}`}
                          />
                          <datalist id={`edit-sector-${client._id}`}>
                            {sectorSuggestions.map((sector, idx) => (
                              <option key={idx} value={sector} />
                            ))}
                          </datalist>
                        </div>
                      </div>

                      {/* Edit Action Buttons */}
                      <div className="flex gap-2 pt-4">
                        <button
                          onClick={() => handleSaveEdit(client._id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center justify-center gap-1 flex-1"
                        >
                          <Check className="w-4 h-4" />
                          Save
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
                    <>
                      <div className="p-6">
                        <div className="flex flex-col items-center text-center mb-4">
                          {/* Logo */}
                          <div className="relative mb-4">
                            <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-100 bg-white p-2">
                              {client.logo ? (
                                <img
                                  src={client.logo}
                                  alt={client.name}
                                  className="w-full h-full object-contain"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                                  <Building2 className="w-8 h-8 text-gray-400" />
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Client Info */}
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {client.name}
                          </h3>
                          
                          {/* Sector Badge */}
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-800 rounded-full text-sm font-medium mb-4">
                            {getSectorIcon(client.sector)}
                            {client.sector}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => startEdit(client)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center gap-1 flex-1"
                          >
                            <Edit2 className="w-4 h-4" />
                            Edit
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(client._id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center justify-center gap-1 flex-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </motion.button>
                        </div>
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