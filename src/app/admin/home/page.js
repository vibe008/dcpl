'use client'

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminSliderPage() {
  const [sliders, setSliders] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [title, setTitle] = useState("")
  const [sectorInput, setSectorInput] = useState('');
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [search, setSearch] = useState('');
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);
  const fileInputRef = useRef(null);
  const sectorInputRef = useRef(null);

  useEffect(() => { fetchSliders(); }, [page, search]);

  async function fetchSliders() {
    setLoading(true);
    try {
      const res = await fetch(`/api/mainslider?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`);
      const data = await res.json();
      if (data && data.success) {
        setSliders(data.data || []);
        setMeta(data.meta || {});
      } else {
        toast.error((data && data.message) || 'Failed to fetch');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error fetching');
    }
    setLoading(false);
  }

  function validateForm({ imageUrl, sectors, title }) {
    const errors = [];
    if (!imageUrl) errors.push('Please upload an image');
    if (!title) errors.push('Please Add Project Title');
    if (!sectors || sectors.length === 0) errors.push('Please add at least one sector');
    return errors;
  }

  function handleFileChange(e) {
    const f = e.target.files && e.target.files[0];
    setFile(f || null);
    if (f) setPreviewUrl(URL.createObjectURL(f));
  }

  function handleDrop(e) {
    e.preventDefault();
    const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) {
      setFile(f);
      setPreviewUrl(URL.createObjectURL(f));
    }
  }
  function handleDragOver(e) { e.preventDefault(); }

  // Sector functions
  function addSector() {
    if (sectorInput.trim() && !sectors.includes(sectorInput.trim())) {
      setSectors([...sectors, sectorInput.trim()]);
      setSectorInput('');
    }
  }

  function removeSector(index) {
    const newSectors = [...sectors];
    newSectors.splice(index, 1);
    setSectors(newSectors);
  }

  function handleSectorKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSector();
    }
  }

  async function uploadToCloudinary() {
    if (!file) return null;
    const formData = new FormData();
    formData.append('files', file);
    formData.append('folder', 'home_slider');

    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    if (data && data.success && data.urls && data.urls[0]) return data.urls[0];
    throw new Error((data && data.message) || 'Upload failed');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setSubmitting(true);
      toast.loading('Saving...', { id: 'saving' });

      let imageUrl = previewUrl;
      if (file) imageUrl = await uploadToCloudinary();

      const errors = validateForm({ imageUrl, sectors, title });
      if (errors.length) {
        toast.dismiss('saving');
        errors.forEach(err => toast.error(err));
        setSubmitting(false);
        return;
      }

      const payload = { mainimageurl: imageUrl, sectors, title };
      const url = editingId ? `/api/mainslider/${editingId}` : '/api/mainslider';
      const method = editingId ? 'PUT' : 'POST';
      console.log('payload', payload)
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (data && data.success) {
        toast.dismiss('saving');
        toast.success(editingId ? 'Updated' : 'Created');
        resetForm();
        fetchSliders();
      } else {
        toast.dismiss('saving');
        toast.error((data && data.message) || 'Failed');
      }
    } catch (err) {
      console.error(err);
      toast.dismiss('saving');
      toast.error(err.message || 'Error');
    } finally { setSubmitting(false); }
  }

  function resetForm() {
    setSectors([]);
    setSectorInput('');
    setFile(null);
    setEditingId(null);
    setPreviewUrl('');
    if (fileInputRef.current) fileInputRef.current.value = null;
  }

  function startEdit(item) {
    setEditingId(item._id);
    setSectors(item.sectors || []);
    setPreviewUrl(item.mainimageurl || '');
    setTitle(item.title)
    setFile(null);
  }

  function confirmDelete(id) {
    setToDeleteId(id); setShowDeleteModal(true);
  }

  async function handleDeleteConfirmed() {
    if (!toDeleteId) return;
    try {
      const res = await fetch(`/api/mainslider/${toDeleteId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data && data.success) { toast.success('Deleted'); fetchSliders(); }
      else toast.error((data && data.message) || 'Delete failed');
    } catch (err) { console.error(err); toast.error('Error deleting'); }
    setShowDeleteModal(false); setToDeleteId(null);
  }

  // Elegant glassmorphism theme
  const glass = "bg-white/70 backdrop-blur-xl border border-white/30 shadow-sm";
  const cardGlass = "bg-white/60 backdrop-blur-lg border border-white/20 shadow-lg";

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-800">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`p-8 rounded-3xl ${glass} shadow-sm`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-light text-gray-900 tracking-tight">Slider Management</h1>
              <p className="mt-2 text-gray-600 font-light">Manage homepage hero images with elegant previews</p>
            </div>

            {/* Prominent Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1); }}
                  placeholder="Search sliders by sectors..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 outline-none"
                />
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Form Section */}
          <motion.section
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`xl:col-span-3 p-8 rounded-3xl ${cardGlass} space-y-6`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingId ? 'Edit Slider' : 'Create New Slider'}
              </h2>
              {editingId && (
                <button
                  onClick={resetForm}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Sectors Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sectors *
                </label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      ref={sectorInputRef}
                      value={sectorInput}
                      onChange={e => setSectorInput(e.target.value)}
                      onKeyPress={handleSectorKeyPress}
                      placeholder="Add a sector and press Enter"
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 outline-none"
                    />
                    <button
                      type="button"
                      onClick={addSector}
                      className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
                    >
                      Add Sector
                    </button>
                  </div>

                  {/* Selected Sectors */}
                  {sectors.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {sectors.map((sector, index) => (
                        <motion.span
                          key={index}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-100 text-blue-800 text-sm"
                        >
                          {sector}
                          <button
                            type="button"
                            onClick={() => removeSector(index)}
                            className="w-4 h-4 rounded-full bg-blue-200 hover:bg-blue-300 text-blue-800 flex items-center justify-center text-xs transition-colors"
                          >
                            ×
                          </button>
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Title *
                </label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      ref={sectorInputRef}
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="Add a sector and press Enter"
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 outline-none"
                    />
                  </div>

                </div>
              </div>
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Image Upload *
                </label>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-blue-400 transition-colors duration-200 bg-white/30"
                >
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                        {previewUrl ? (
                          <motion.img
                            whileHover={{ scale: 1.05 }}
                            src={previewUrl}
                            alt="preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center p-4">
                            <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-xs text-gray-500">No image</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="fileinput" />
                      <label htmlFor="fileinput" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors shadow-sm">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Choose File
                      </label>
                      <p className="text-sm text-gray-500 mt-3">
                        Drag & drop or click to upload. Recommended: 1600×900px JPG/PNG
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {editingId ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    editingId ? 'Update Slider' : 'Create Slider'
                  )}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </form>
          </motion.section>

          {/* Preview & Tips Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Preview Card */}
            <div className={`p-6 rounded-2xl ${cardGlass}`}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
              {previewUrl ? (
                <motion.div
                  initial={{ scale: 0.98 }}
                  whileHover={{ scale: 1.01 }}
                  className="rounded-xl overflow-hidden shadow-md"
                >
                  <img src={previewUrl} alt="preview" className="w-full h-48 object-cover" />
                  <div className="p-3 bg-white/80 backdrop-blur-sm space-y-2">
                    {sectors.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Sectors:</p>
                        <div className="flex flex-wrap gap-1">
                          {sectors.map((sector, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {sector}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <div className="h-48 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center text-gray-500">
                    <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm">No image selected</p>
                  </div>
                </div>
              )}
            </div>

            {/* Tips Card */}
            <div className={`p-6 rounded-2xl ${cardGlass}`}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Best Practices</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-xs">✓</span>
                  </div>
                  <span>Use high-quality, landscape-oriented images (16:9 ratio)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-xs">✓</span>
                  </div>
                  <span>Add relevant sectors for better categorization</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-xs">✓</span>
                  </div>
                  <span>Minimum one sector is required for each slider</span>
                </li>
              </ul>
            </div>
          </motion.aside>
        </div>

        {/* Sliders Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              All Sliders ({meta.total || 0})
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={`rounded-2xl ${cardGlass} p-4 h-64 animate-pulse`}>
                  <div className="w-full h-40 bg-gray-200 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : sliders.length === 0 ? (
            <div className={`p-12 rounded-2xl ${cardGlass} text-center`}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No sliders found</h3>
              <p className="text-gray-600 max-w-sm mx-auto">
                {search ? 'Try adjusting your search terms' : 'Get started by creating your first slider'}
              </p>
            </div>
          ) : (
            <>
              <div className="masonry-grid">
                {sliders.map((item) => (
                  <motion.article
                    key={item._id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -4 }}
                    className={`mb-6 break-inside rounded-2xl overflow-hidden ${cardGlass} transition-all duration-300`}
                    style={{ display: 'inline-block', width: '100%' }}
                  >
                    <div className="relative group">
                      <motion.img
                        src={item.mainimageurl}
                        alt={item.description || 'Slider image'}
                        className="w-full h-auto object-cover"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                        {/* Display sectors if available */}
                        {item.sectors && item.sectors.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {item.sectors.slice(0, 3).map((sector, index) => (
                              <span key={index} className="px-2 py-1 bg-white/20 text-white text-xs rounded-full backdrop-blur-sm">
                                {sector}
                              </span>
                            ))}
                            {item.sectors.length > 3 && (
                              <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full backdrop-blur-sm">
                                +{item.sectors.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                        {item.title  && <div className="flex flex-wrap gap-1 mb-2">
                          <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full backdrop-blur-sm">
                            {item.title}
                          </span>
                        </div>}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                              onClick={() => startEdit(item)}
                              className="p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
                              title="Edit"
                            >
                              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => confirmDelete(item._id)}
                              className="p-2 rounded-full bg-white/20 hover:bg-red-500/80 backdrop-blur-sm transition-colors"
                              title="Delete"
                            >
                              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Pagination */}
              {meta.total > limit && (
                <div className="flex items-center justify-center gap-4 pt-6 border-t border-gray-200/50">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </button>

                  <span className="text-sm text-gray-600 px-4 py-2">
                    Page {meta.page || page} of {Math.ceil((meta.total || 0) / limit)}
                  </span>

                  <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={meta.total && page * limit >= meta.total}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </motion.section>
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`relative p-6 rounded-2xl ${cardGlass} max-w-sm w-full mx-auto`}
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>

              <h3 className="text-lg font-semibold text-center text-gray-900 mb-2">Delete Slider</h3>
              <p className="text-gray-600 text-center text-sm mb-6">
                This action cannot be undone. The slider will be permanently removed.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirmed}
                  className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .masonry-grid { 
          column-count: 1; 
          column-gap: 1.5rem; 
        }
        @media (min-width: 640px) { .masonry-grid { column-count: 2; } }
        @media (min-width: 1024px) { .masonry-grid { column-count: 3; } }
        @media (min-width: 1280px) { .masonry-grid { column-count: 4; } }
        
        .masonry-grid > * { 
          display: inline-block;
          width: 100%; 
          margin-bottom: 1.5rem;
        }
      `}</style>
    </div>
  );
}