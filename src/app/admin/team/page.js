"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  UserPlus,
  Users,
  Award,
  Briefcase,
  Edit2,
  Trash2,
  Plus,
  X,
  Check,
  Upload,
  User,
  Star,
  BriefcaseBusiness,
  Crown
} from "lucide-react";

export default function TeamManagement() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Edit state
  const [editData, setEditData] = useState({
    name: "",
    position: "",
    isLeaderShip: false,
    profile: "",
    description: "",
    email: ""
  });

  // Add state
  const [newMember, setNewMember] = useState({
    name: "",
    position: "",
    isLeaderShip: false,
    profileFile: null,
    profilePreview: "",
    profileUrl: "",
    description: "",
    email: ""
  });

  const fileInputRef = useRef(null);
  const glass = "bg-white/80 backdrop-blur-xl border border-white/30 shadow-sm";
  const cardGlass = "bg-white/70 backdrop-blur-lg border border-white/20 shadow-lg";

  // Available positions suggestions
  const positionSuggestions = [
    "Principal Architect",
    "Senior Architect",
    "Project Architect",
    "Design Architect",
    "Urban Planner",
    "Interior Designer",
    "Project Manager",
    "Design Director",
    "Landscape Architect",
    "Sustainability Consultant",
    "BIM Manager",
    "Technical Director",
    "Junior Architect",
    "Intern Architect"
  ];

  // Fetch team members
  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/team");
      const data = await res.json();

      if (data.success) {
        setTeamMembers(data.data);
      } else {
        toast.error("Failed to fetch team members");
      }
    } catch (error) {
      console.error("Error fetching team members:", error);
      toast.error("Error loading team members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  // Upload profile image to Cloudinary
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('files', file);
    formData.append('folder', 'team');

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

  // Handle file selection for new member
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size must be less than 2MB");
        return;
      }

      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload JPG, PNG, or WebP images only");
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setNewMember({
        ...newMember,
        profileFile: file,
        profilePreview: previewUrl
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
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload JPG, PNG, or WebP images only");
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setEditData({
        ...editData,
        profile: previewUrl
      });
    }
  };

  // Remove profile image for new member
  const removeProfileImage = () => {
    if (newMember.profilePreview) {
      URL.revokeObjectURL(newMember.profilePreview);
    }
    setNewMember({
      ...newMember,
      profileFile: null,
      profilePreview: "",
      profileUrl: ""
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Add new team member
  const handleAddMember = async () => {
    // Validation
    if (!newMember.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!newMember.position.trim()) {
      toast.error("Position is required");
      return;
    }
    if (newMember.name.length > 100) {
      toast.error("Name must be less than 100 characters");
      return;
    }
    if (newMember.position.length > 100) {
      toast.error("Position must be less than 100 characters");
      return;
    }

    try {
      let profileUrl = "";
      
      // Upload image if selected
      if (newMember.profileFile) {
        const submitToast = toast.loading("Uploading profile image...");
        try {
          profileUrl = await uploadToCloudinary(newMember.profileFile);
          toast.success("Image uploaded successfully!", { id: submitToast });
        } catch (uploadError) {
          toast.error("Failed to upload image", { id: submitToast });
          return;
        }
      }

      // Add team member via API
      const res = await fetch("/api/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newMember.name.trim(),
          position: newMember.position.trim(),
          isLeaderShip: newMember.isLeaderShip,
          profile: profileUrl,
          description: (newMember.description || "").trim(),
          email: (newMember.email || "").trim()
        })
      });

      const data = await res.json();
      
      if (data.success) {
        toast.success("Team member added successfully!");
        
        // Reset form
        setNewMember({
          name: "",
          position: "",
          isLeaderShip: false,
          profileFile: null,
          profilePreview: "",
          profileUrl: "",
          description: "",
          email: ""
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setShowAddForm(false);
        
        // Refresh list
        fetchTeamMembers();
      } else {
        toast.error(data.message || "Failed to add team member");
      }
    } catch (error) {
      console.error("Error adding team member:", error);
      toast.error("Error adding team member");
    }
  };

  // Start editing
  const startEdit = (member) => {
    setEditingId(member._id);
    setEditData({
      name: member.name,
      position: member.position,
      isLeaderShip: member.isLeaderShip || false,
      profile: member.profile || "",
      description: member.description || "",
      email: member.email || ""
    });
  };

  // Save edit
  const handleSaveEdit = async (id) => {
    if (!editData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!editData.position.trim()) {
      toast.error("Position is required");
      return;
    }

    try {
      let profileUrl = editData.profile;
      
      // If profile is a blob URL (new image uploaded), upload it
      if (editData.profile && editData.profile.startsWith('blob:')) {
        const submitToast = toast.loading("Uploading new profile image...");
        try {
          // Convert blob URL to file
          const response = await fetch(editData.profile);
          const blob = await response.blob();
          const file = new File([blob], 'profile.jpg', { type: 'image/jpeg' });
          profileUrl = await uploadToCloudinary(file);
          toast.success("Image uploaded successfully!", { id: submitToast });
        } catch (uploadError) {
          toast.error("Failed to upload image", { id: submitToast });
          return;
        }
      }

      // Update team member via API
      const res = await fetch(`/api/team/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editData.name.trim(),
          position: editData.position.trim(),
          isLeaderShip: editData.isLeaderShip,
          profile: profileUrl,
          description: (editData.description || "").trim(),
          email: (editData.email || "").trim()
        })
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Team member updated successfully!");
        setEditingId(null);
        setEditData({
          name: "",
          position: "",
          isLeaderShip: false,
          profile: "",
          description: "",
          email: ""
        });
        fetchTeamMembers();
      } else {
        toast.error(data.message || "Failed to update team member");
      }
    } catch (error) {
      console.error("Error updating team member:", error);
      toast.error("Error updating team member");
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditData({
      name: "",
      position: "",
      isLeaderShip: false,
      profile: "",
      description: "",
      email: ""
    });
  };

  // Delete team member
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;

    try {
      const res = await fetch(`/api/team/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      
      if (data.success) {
        toast.success("Team member deleted successfully!");
        fetchTeamMembers();
      } else {
        toast.error(data.message || "Failed to delete team member");
      }
    } catch (error) {
      console.error("Error deleting team member:", error);
      toast.error("Error deleting team member");
    }
  };

  // Stats calculations
  const getLeadershipCount = () => {
    return teamMembers.filter(member => member.isLeaderShip).length;
  };

  const getTotalTeamMembers = () => {
    return teamMembers.length;
  };

  const getUniquePositions = () => {
    const positions = teamMembers.map(member => member.position);
    return [...new Set(positions)].length;
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
                <Users className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
                <p className="text-gray-600 mt-1">Manage your team members and their profiles</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 shadow-lg shadow-gray-900/25 transition-all duration-300 flex items-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              {showAddForm ? "Cancel" : "Add New Member"}
            </motion.button>
          </div>
        </div>

        {/* Add New Member Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`${cardGlass} rounded-2xl p-6 mb-6 overflow-hidden`}
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Team Member</h2>
              <div className="space-y-6">
                {/* Profile Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Profile Image (Optional)
                  </label>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    {/* Image Preview */}
                    <div className="relative">
                      <div className="w-32 h-32 rounded-xl border-2 border-dashed border-gray-300 overflow-hidden bg-gray-50 flex items-center justify-center">
                        {newMember.profilePreview ? (
                          <div className="relative">
                            <img
                              src={newMember.profilePreview}
                              alt="Profile preview"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={removeProfileImage}
                              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="text-center p-4">
                            <User className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-xs text-gray-500">No image</p>
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
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        id="profile-upload"
                      />
                      <label
                        htmlFor="profile-upload"
                        className="inline-flex items-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <Upload className="w-5 h-5" />
                        Choose Profile Image
                      </label>
                      
                      <div className="text-sm text-gray-500 space-y-1">
                        <p>• JPG, PNG, or WebP</p>
                        <p>• Max size: 2MB</p>
                        <p>• Recommended: 400×400 pixels</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200 bg-white/50"
                    placeholder="Enter full name"
                    maxLength={100}
                  />
                  <div className="flex justify-between mt-2">
                    <div />
                    <span className="text-sm text-gray-500">
                      {newMember.name.length}/100
                    </span>
                  </div>
                </div>

                {/* Position Input with Suggestions */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position / Role *
                  </label>
                  <input
                    type="text"
                    value={newMember.position}
                    onChange={(e) => setNewMember({ ...newMember, position: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200 bg-white/50"
                    placeholder="e.g., Senior Architect"
                    maxLength={100}
                    list="position-suggestions"
                  />
                  <datalist id="position-suggestions">
                    {positionSuggestions.map((pos, idx) => (
                      <option key={idx} value={pos} />
                    ))}
                  </datalist>
                  <div className="flex justify-between mt-2">
                    <div className="text-sm text-gray-500">
                      Select from suggestions or type custom
                    </div>
                    <span className="text-sm text-gray-500">
                      {newMember.position.length}/100
                    </span>
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={newMember.email || ""}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200 bg-white/50 text-sm outline-none"
                    placeholder="Enter email address"
                  />
                </div>

                {/* Description Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description / Bio (Optional)
                  </label>
                  <textarea
                    value={newMember.description || ""}
                    onChange={(e) => setNewMember({ ...newMember, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200 bg-white/50 resize-none text-sm outline-none"
                    placeholder="Enter a short bio or description..."
                    rows={3}
                  />
                </div>

                {/* Leadership Toggle */}
                <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl bg-white/50">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${newMember.isLeaderShip ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-400'}`}>
                      <Crown className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Leadership Role</p>
                      <p className="text-sm text-gray-600">Mark this member as part of leadership team</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNewMember({ ...newMember, isLeaderShip: !newMember.isLeaderShip })}
                    className={`ml-auto relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${newMember.isLeaderShip ? 'bg-amber-500' : 'bg-gray-300'}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${newMember.isLeaderShip ? 'translate-x-6' : 'translate-x-1'}`}
                    />
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleAddMember}
                    disabled={!newMember.name.trim() || !newMember.position.trim()}
                    className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex-1 flex items-center justify-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Add Team Member
                  </button>
                  <button
                    onClick={() => {
                      setNewMember({
                        name: "",
                        position: "",
                        isLeaderShip: false,
                        profileFile: null,
                        profilePreview: "",
                        profileUrl: ""
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

        {/* Team Members List */}
        <div className={`${cardGlass} rounded-2xl p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
            <span className="text-sm text-gray-500">
              {teamMembers.length} member{teamMembers.length !== 1 ? 's' : ''} found
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-3 border-gray-900 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Team Members Found</h3>
              <p className="text-gray-600">Add your first team member to get started</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <motion.div
                  key={member._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-all duration-300 hover:shadow-lg"
                >
                  {editingId === member._id ? (
                    // Edit Mode
                    <div className="p-6 space-y-4">
                      {/* Profile Image Edit */}
                      <div className="text-center">
                        <div className="relative inline-block">
                          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 mx-auto">
                            {editData.profile ? (
                              <img
                                src={editData.profile}
                                alt="Profile preview"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                <User className="w-12 h-12 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <input
                            type="file"
                            onChange={handleEditFileChange}
                            accept="image/jpeg,image/png,image/webp"
                            className="hidden"
                            id={`edit-profile-${member._id}`}
                          />
                          <label
                            htmlFor={`edit-profile-${member._id}`}
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
                            Name *
                          </label>
                          <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="Full name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Position *
                          </label>
                          <input
                            type="text"
                            value={editData.position}
                            onChange={(e) => setEditData({ ...editData, position: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="Position"
                            list="edit-position-suggestions"
                          />
                          <datalist id="edit-position-suggestions">
                            {positionSuggestions.map((pos, idx) => (
                              <option key={idx} value={pos} />
                            ))}
                          </datalist>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email (Optional)
                          </label>
                          <input
                            type="email"
                            value={editData.email || ""}
                            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none"
                            placeholder="Email address"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description (Optional)
                          </label>
                          <textarea
                            value={editData.description || ""}
                            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none outline-none"
                            placeholder="Description / Bio"
                            rows={2}
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`leadership-${member._id}`}
                            checked={editData.isLeaderShip}
                            onChange={(e) => setEditData({ ...editData, isLeaderShip: e.target.checked })}
                            className="rounded border-gray-300"
                          />
                          <label htmlFor={`leadership-${member._id}`} className="text-sm text-gray-700">
                            Leadership Role
                          </label>
                        </div>
                      </div>

                      {/* Edit Action Buttons */}
                      <div className="flex gap-2 pt-4">
                        <button
                          onClick={() => handleSaveEdit(member._id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex-1 flex items-center justify-center gap-1"
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
                          {/* Profile Image */}
                          <div className="relative mb-4">
                            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-100">
                              {member.profile ? (
                                <img
                                  src={member.profile}
                                  alt={member.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                  <User className="w-10 h-10 text-gray-400" />
                                </div>
                              )}
                            </div>
                            {member.isLeaderShip && (
                              <div className="absolute -top-1 -right-1 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shadow-sm">
                                <Crown className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>

                          {/* Member Info */}
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {member.name}
                          </h3>
                          <p className="text-gray-600 mb-1">{member.position}</p>
                          
                          {member.email && (
                            <p className="text-xs text-indigo-600 font-medium mb-2 break-all">{member.email}</p>
                          )}

                          {member.description && (
                            <p className="text-xs text-gray-500 font-light leading-relaxed mb-3 max-w-xs px-2 line-clamp-3">
                              {member.description}
                            </p>
                          )}
                          
                          {/* Leadership Badge */}
                          {member.isLeaderShip && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                              <Star className="w-3 h-3" />
                              Leadership Team
                            </span>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => startEdit(member)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center gap-1 flex-1"
                          >
                            <Edit2 className="w-4 h-4" />
                            Edit
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(member._id)}
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

        {/* Stats Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className={`${cardGlass} rounded-2xl p-4`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Members</p>
                <p className="text-2xl font-bold text-gray-900">{getTotalTeamMembers()}</p>
              </div>
            </div>
          </div>

          <div className={`${cardGlass} rounded-2xl p-4`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <Crown className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Leadership Team</p>
                <p className="text-2xl font-bold text-gray-900">{getLeadershipCount()}</p>
              </div>
            </div>
          </div>

          <div className={`${cardGlass} rounded-2xl p-4`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <BriefcaseBusiness className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Unique Positions</p>
                <p className="text-2xl font-bold text-gray-900">{getUniquePositions()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}