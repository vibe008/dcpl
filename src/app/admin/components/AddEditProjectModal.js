'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import Cropper from 'react-easy-crop';
import PropTypes from 'prop-types';

// Helper function to get cropped image
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
function rotateSize(width, height, rotation) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
async function getCroppedImg(
  imageSrc,
  pixelCrop,
  rotation = 0,
  flip = { horizontal: false, vertical: false }
) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return null;
  }

  const rotRad = getRadianAngle(rotation);

  // calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  // draw rotated image
  ctx.drawImage(image, 0, 0);

  // croppedAreaPixels values are bounding box relative
  // extract the cropped image using these values
  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  );

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image at the top left corner
  ctx.putImageData(data, 0, 0);

  // As Base64 string
  // return canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      resolve(URL.createObjectURL(file));
    }, 'image/jpeg');
  });
}

const AddEditProjectModal = ({ project, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: new Date().getFullYear(),
    location: '',
    cost: '',
    type: '',
    region: '',
    sectors: [],
    images: [],
    headerimage: '',
    status: 'Active',
    markforhomepage: false,
    services: [],
    consturctionimages: []
  });

  const [servicesList, setServicesList] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [headerFile, setHeaderFile] = useState(null);
  const [headerPreviewUrl, setHeaderPreviewUrl] = useState('');
  const [newSector, setNewSector] = useState('');
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [loadingServices, setLoadingServices] = useState(false);
  const [constructionFiles, setConstructionFiles] = useState([]);
  const [constructionPreviewUrls, setConstructionPreviewUrls] = useState([]);
  const [showConstructionImages, setShowConstructionImages] = useState(false);
  
  // Crop states
  const [showCropModal, setShowCropModal] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  
  // Aspect ratio for header image (100vw : 100vh = 16:9 ratio for full screen slider)
  const ASPECT_RATIO = 16 / 9;
  const MIN_ZOOM = 1;
  const MAX_ZOOM = 3;

  const fileInputRef = useRef(null);
  const headerFileInputRef = useRef(null);
  const constructionFileInputRef = useRef(null);
  const yearPickerRef = useRef(null);
  const servicesDropdownRef = useRef(null);

  const glass = "bg-white/80 backdrop-blur-xl border border-white/30 shadow-sm";
  const cardGlass = "bg-white/70 backdrop-blur-lg border border-white/20 shadow-lg";

  // Predefined sectors
  const predefinedSectors = [
    'Healthcare',
    'Urban Design',
    'Key Government Buildings',
    'Commercial & Offices',
    'Heritage & Tourism',
    'Housing & Residential',
    'Educational',
    'Paramilitary',
    'Monuments'
  ];

  // Predefined regions
  const regions = [
    'South',
    'East',
    'North',
    'West',
    'International',
    'Central'
  ];

  // Fetch services from API
  const fetchServices = async () => {
    try {
      setLoadingServices(true);
      const res = await fetch('/api/services');
      const data = await res.json();
      
      if (data.success) {
        setServicesList(data.data);
      } else {
        toast.error('Failed to fetch services');
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Error loading services');
    } finally {
      setLoadingServices(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Close year picker and services dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (yearPickerRef.current && !yearPickerRef.current.contains(event.target)) {
        setShowYearPicker(false);
      }
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
        setIsServicesDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Set form data when editing
  useEffect(() => {
    if (project) {
      const projectServiceIds = project.services || [];
      
      setFormData({
        title: project.title || '',
        description: project.description || '',
        year: project.year || new Date().getFullYear(),
        location: project.location || '',
        cost: project.cost || '',
        type: project.type || '',
        region: project.region || '',
        sectors: project.sectors || [],
        images: project.images || [],
        headerimage: project.headerimage || '',
        status: project.status || 'Active',
        markforhomepage: project.markforhomepage || false,
        services: projectServiceIds,
        consturctionimages: project.consturctionimages || []
      });
      
      setPreviewUrls(project.images || []);
      setHeaderPreviewUrl(project.headerimage || '');
      setConstructionPreviewUrls(project.consturctionimages || []);
      
      // Show construction images section if status is active or complete
      setShowConstructionImages(project.status === 'Active' || project.status === 'Completed');
    } else {
      resetForm();
    }
  }, [project]);

  // Toggle construction images section based on status
  useEffect(() => {
    setShowConstructionImages(formData.status === 'Active' || formData.status === 'Completed');
  }, [formData.status]);

  // Crop handlers
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      setIsCropping(true);
      const croppedImage = await getCroppedImg(
        imageToCrop,
        croppedAreaPixels
      );
      
      setHeaderFile(null);
      setHeaderPreviewUrl(croppedImage);
      setShowCropModal(false);
      
      // Create a File object from the cropped image
      const response = await fetch(croppedImage);
      const blob = await response.blob();
      const file = new File([blob], 'header-image-cropped.jpg', { type: 'image/jpeg' });
      setHeaderFile(file);
      
      toast.success('Image cropped successfully');
    } catch (e) {
      console.error(e);
      toast.error('Error cropping image');
    } finally {
      setIsCropping(false);
    }
  }, [croppedAreaPixels, imageToCrop]);

  const handleCropCancel = () => {
    setShowCropModal(false);
    setImageToCrop(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  };

  // Header image functions
  const handleHeaderFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      
      // Check file type
      if (!file.type.match('image.*')) {
        toast.error('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setImageToCrop(event.target.result);
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
      
      if (errors.headerimage) {
        setErrors(prev => ({ ...prev, headerimage: '' }));
      }
    }
  };

  const removeHeaderFile = () => {
    setHeaderFile(null);
    setHeaderPreviewUrl('');
    setFormData(prev => ({ ...prev, headerimage: '' }));
    if (headerFileInputRef.current) {
      headerFileInputRef.current.value = null;
    }
  };

  const handleHeaderDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      
      // Check file type
      if (!file.type.match('image.*')) {
        toast.error('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setImageToCrop(event.target.result);
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
      
      if (errors.headerimage) {
        setErrors(prev => ({ ...prev, headerimage: '' }));
      }
    }
  };

  const handleHeaderDragOver = (e) => {
    e.preventDefault();
  };

  // Services management functions
  const toggleService = (serviceId) => {
    setFormData(prev => {
      const newServices = prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId];
      return { ...prev, services: newServices };
    });
  };

  const selectAllServices = () => {
    const allServiceIds = servicesList.map(service => service._id);
    setFormData(prev => ({
      ...prev,
      services: allServiceIds
    }));
  };

  const clearServices = () => {
    setFormData(prev => ({ ...prev, services: [] }));
  };

  // Sectors management functions
  const toggleSector = (sector) => {
    setFormData(prev => {
      const newSectors = prev.sectors.includes(sector)
        ? prev.sectors.filter(s => s !== sector)
        : [...prev.sectors, sector];
      return { ...prev, sectors: newSectors };
    });
  };

  const addCustomSector = () => {
    if (newSector.trim() && !formData.sectors.includes(newSector.trim())) {
      setFormData(prev => ({
        ...prev,
        sectors: [...prev.sectors, newSector.trim()]
      }));
      setNewSector('');
    }
  };

  const removeSector = (sectorToRemove) => {
    setFormData(prev => ({
      ...prev,
      sectors: prev.sectors.filter(sector => sector !== sectorToRemove)
    }));
  };

  const handleSectorKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomSector();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cost') {
      // Remove non-numeric characters except decimal point
      const numericValue = value.replace(/[^0-9.]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }));
    } else if (name === 'status') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Format cost display
  const formatCostDisplay = (cost) => {
    if (!cost) return '';
    const num = parseFloat(cost);
    if (isNaN(num)) return cost;
    
    // Format in lakhs
    if (num >= 100000) {
      const lakhs = (num / 100000).toFixed(2);
      return `${lakhs} lakh`;
    }
    return new Intl.NumberFormat('en-IN').format(num);
  };

  // Project images functions
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles]);

    const newFileUrls = newFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...newFileUrls]);

    if (errors.images && (files.length + newFiles.length + formData.images.length) > 0) {
      setErrors(prev => ({ ...prev, images: '' }));
    }
  };

  const removeFile = (index) => {
    const isExistingImage = index < formData.images.length;

    if (isExistingImage) {
      const updatedImages = formData.images.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, images: updatedImages }));
      setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    } else {
      const fileIndex = index - formData.images.length;
      setFiles(prev => prev.filter((_, i) => i !== fileIndex));
      setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    }
  };

  // Construction images functions
  const handleConstructionFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setConstructionFiles(prev => [...prev, ...newFiles]);

    const newFileUrls = newFiles.map(file => URL.createObjectURL(file));
    setConstructionPreviewUrls(prev => [...prev, ...newFileUrls]);

    if (errors.consturctionimages && (constructionFiles.length + newFiles.length + formData.consturctionimages.length) > 0) {
      setErrors(prev => ({ ...prev, consturctionimages: '' }));
    }
  };

  const removeConstructionFile = (index) => {
    const isExistingImage = index < formData.consturctionimages.length;

    if (isExistingImage) {
      const updatedImages = formData.consturctionimages.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, consturctionimages: updatedImages }));
      setConstructionPreviewUrls(prev => prev.filter((_, i) => i !== index));
    } else {
      const fileIndex = index - formData.consturctionimages.length;
      setConstructionFiles(prev => prev.filter((_, i) => i !== fileIndex));
      setConstructionPreviewUrls(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);

    const droppedFileUrls = droppedFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...droppedFileUrls]);

    if (errors.images && (files.length + droppedFiles.length + formData.images.length) > 0) {
      setErrors(prev => ({ ...prev, images: '' }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append('files', file);
    formData.append('folder', 'projects');

    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    if (data && data.success && data.urls && data.urls[0]) return data.urls[0];
    throw new Error((data && data.message) || 'Upload failed');
  }

  // Year picker functions
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  const handleYearSelect = (selectedYear) => {
    setFormData(prev => ({ ...prev, year: selectedYear }));
    setShowYearPicker(false);
    if (errors.year) {
      setErrors(prev => ({ ...prev, year: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }

    // Year validation
    if (!formData.year) {
      newErrors.year = 'Year is required';
    } else if (formData.year < 1900 || formData.year > new Date().getFullYear()) {
      newErrors.year = 'Please enter a valid year between 1900 and current year';
    }

    // Cost validation
    if (formData.cost) {
      const costValue = parseFloat(formData.cost);
      if (isNaN(costValue) || costValue < 0) {
        newErrors.cost = 'Cost must be a positive number';
      } else if (costValue > 1000000000) {
        newErrors.cost = 'Cost seems too high. Please verify the amount.';
      }
    }

    // Description validation
    if (formData.description && formData.description.length > 1000) {
      newErrors.description = 'Description must be less than 1000 characters';
    }

    // Location validation
    if (formData.location && formData.location.length > 100) {
      newErrors.location = 'Location must be less than 100 characters';
    }

    // Region validation
    if (formData.region && formData.region.length > 50) {
      newErrors.region = 'Region must be less than 50 characters';
    }

    // Sectors validation
    if (formData.sectors.length > 0) {
      const invalidSector = formData.sectors.find(sector => sector.length > 50);
      if (invalidSector) {
        newErrors.sectors = 'Each sector must be less than 50 characters';
      }
    }

    // Images validation
    const totalImages = previewUrls.length;
    if (totalImages === 0) {
      newErrors.images = 'At least one project image is required';
    } else if (totalImages > 20) {
      newErrors.images = 'Maximum 20 images allowed';
    }

    // Header image validation
    if (!headerFile && !formData.headerimage) {
      newErrors.headerimage = 'Header image is required';
    }

    // Construction images validation for active/complete projects
    if (showConstructionImages && constructionPreviewUrls.length === 0) {
      newErrors.consturctionimages = 'Construction images are required for active or completed projects';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    const toastId = toast.loading(project ? 'Updating project...' : 'Creating project...');

    try {
      let headerImageUrl = formData.headerimage;

      if (headerFile) {
        headerImageUrl = await uploadToCloudinary(headerFile);
      }

      let uploadedImageUrls = [...formData.images];

      if (files.length > 0) {
        for (const file of files) {
          const imageUrl = await uploadToCloudinary(file);
          uploadedImageUrls.push(imageUrl);
        }
      }

      let uploadedConstructionImageUrls = [...formData.consturctionimages];

      if (constructionFiles.length > 0) {
        for (const file of constructionFiles) {
          const imageUrl = await uploadToCloudinary(file);
          uploadedConstructionImageUrls.push(imageUrl);
        }
      }

      const submitData = {
        ...formData,
        cost: formData.cost ? parseFloat(formData.cost) : 0,
        headerimage: headerImageUrl,
        images: uploadedImageUrls,
        consturctionimages: uploadedConstructionImageUrls
      };

      const url = project ? `/api/projects/${project.id}` : '/api/projects';
      const method = project ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      const data = await res.json();

      if (data.success) {
        toast.dismiss(toastId);
        toast.success(project ? 'Project updated successfully!' : 'Project created successfully!');
        resetForm();
        onSuccess();
      } else {
        toast.dismiss(toastId);
        if (data.data?.errors) {
          data.data.errors.forEach(error => toast.error(error));
        } else {
          toast.error(data.message || `Failed to ${project ? 'update' : 'create'} project`);
        }
      }

    } catch (error) {
      console.error('Error submitting project:', error);
      toast.dismiss(toastId);
      toast.error(`Error ${project ? 'updating' : 'creating'} project`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      year: new Date().getFullYear(),
      location: '',
      cost: '',
      type: '',
      region: '',
      sectors: [],
      images: [],
      headerimage: '',
      status: 'Active',
      markforhomepage: false,
      services: [],
      consturctionimages: []
    });
    setFiles([]);
    setPreviewUrls([]);
    setConstructionFiles([]);
    setConstructionPreviewUrls([]);
    setHeaderFile(null);
    setHeaderPreviewUrl('');
    setNewSector('');
    setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = null;
    if (headerFileInputRef.current) headerFileInputRef.current.value = null;
    if (constructionFileInputRef.current) constructionFileInputRef.current.value = null;
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      {/* Crop Modal */}
      <AnimatePresence>
        {showCropModal && imageToCrop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Crop Modal Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Crop Header Image
                      </h2>
                      <p className="text-gray-600">
                        Adjust the image for full-screen display (16:9 aspect ratio)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Crop Modal Content */}
              <div className="flex-1 p-6 overflow-auto">
                <div className="space-y-6">
                  {/* Crop Container */}
                  <div className="relative w-full h-[400px] bg-gray-100 rounded-xl overflow-hidden">
                    <Cropper
                      image={imageToCrop}
                      crop={crop}
                      zoom={zoom}
                      aspect={ASPECT_RATIO}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                      minZoom={MIN_ZOOM}
                      maxZoom={MAX_ZOOM}
                      showGrid={true}
                      cropShape="rect"
                      style={{
                        containerStyle: {
                          width: '100%',
                          height: '100%',
                          position: 'relative',
                        },
                        cropAreaStyle: {
                          border: '2px solid rgba(255,255,255,0.8)',
                          boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)',
                        },
                      }}
                    />
                  </div>

                  {/* Zoom Controls */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Zoom</span>
                        <span className="text-sm text-gray-600">{zoom.toFixed(2)}x</span>
                      </div>
                      <input
                        type="range"
                        value={zoom}
                        min={MIN_ZOOM}
                        max={MAX_ZOOM}
                        step={0.1}
                        aria-labelledby="Zoom"
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>1x</span>
                        <span>{MAX_ZOOM.toFixed(1)}x</span>
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="text-sm text-blue-700 font-medium">Important:</p>
                          <p className="text-xs text-blue-600 mt-1">
                            • Header image will be displayed in full-screen slider (16:9 aspect ratio)
                            <br />
                            • Use zoom to adjust image size, drag to position
                            <br />
                            • The white grid shows the cropping area
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Crop Modal Actions */}
              <div className="p-6 border-t border-gray-200 flex gap-4">
                <button
                  type="button"
                  onClick={handleCropCancel}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  disabled={isCropping}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={showCroppedImage}
                  disabled={isCropping}
                  className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {isCropping ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Cropping...
                    </>
                  ) : (
                    'Apply Crop'
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Modal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className={`${glass} rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col`}
        >
          {/* Header */}
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {project ? 'Edit Project' : 'Create New Project'}
                  </h2>
                  <p className="text-gray-600">
                    {project ? 'Update project details' : 'Add a new project to your portfolio'}
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="p-2 hover:bg-white/50 rounded-xl transition-colors"
              >
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ... Rest of your form components remain the same ... */}
              {/* Basic Information Card */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className={`${cardGlass} rounded-2xl p-6`}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Project Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200 bg-white/50 ${errors.title ? 'border-red-300 bg-red-50/50' : 'border-gray-200'
                        }`}
                      placeholder="Enter project title"
                      maxLength={100}
                    />
                    {errors.title && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-1 text-sm text-red-600 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.title}
                      </motion.p>
                    )}
                  </div>

                  {/* Year Picker */}
                  <div className="relative" ref={yearPickerRef}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Year *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.year}
                        readOnly
                        onClick={() => setShowYearPicker(!showYearPicker)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200 bg-white/50 cursor-pointer ${errors.year ? 'border-red-300 bg-red-50/50' : 'border-gray-200'
                          }`}
                        placeholder="Select year"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>

                      <AnimatePresence>
                        {showYearPicker && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            <div className="p-2">
                              <div className="grid grid-cols-3 gap-1">
                                {years.map((yr) => (
                                  <button
                                    key={yr}
                                    type="button"
                                    onClick={() => handleYearSelect(yr)}
                                    className={`p-3 text-sm rounded-lg transition-all duration-200 ${formData.year === yr
                                        ? 'bg-gray-900 text-white shadow-md'
                                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                      }`}
                                  >
                                    {yr}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {errors.year && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-1 text-sm text-red-600 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.year}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200 bg-white/50 resize-none ${errors.description ? 'border-red-300 bg-red-50/50' : 'border-gray-200'
                      }`}
                    placeholder="Describe the project..."
                    maxLength={1000}
                  />
                  <div className="flex justify-between mt-1">
                    {errors.description ? (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-red-600 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.description}
                      </motion.p>
                    ) : (
                      <div />
                    )}
                    <span className="text-sm text-gray-500">
                      {formData.description.length}/1000
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Header Image Card - Updated */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className={`${cardGlass} rounded-2xl p-6`}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  Header Image *
                </h3>

                <div
                  onDrop={handleHeaderDrop}
                  onDragOver={handleHeaderDragOver}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-gray-400 transition-colors duration-200 bg-white/30"
                >
                  {headerPreviewUrl ? (
                    <div className="text-center">
                      <div className="relative inline-block">
                        <div className="relative">
                          <img
                            src={headerPreviewUrl}
                            alt="Header preview"
                            className="w-64 h-36 object-cover rounded-lg shadow-md mx-auto"
                          />
                          {/* Aspect ratio indicator */}
                          <div className="absolute inset-0 border-2 border-white/50 rounded-lg pointer-events-none">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xs bg-black/50 text-white px-2 py-1 rounded">
                                16:9
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center gap-2 mt-4">
                          <motion.button
                            type="button"
                            onClick={() => {
                              setImageToCrop(headerPreviewUrl);
                              setShowCropModal(true);
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Recrop
                          </motion.button>
                          <motion.button
                            type="button"
                            onClick={removeHeaderFile}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Remove
                          </motion.button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-4">Header image cropped for full-screen display</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <input
                        ref={headerFileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleHeaderFileChange}
                        className="hidden"
                        id="headerfileinput"
                      />
                      <label htmlFor="headerfileinput" className="cursor-pointer">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-gray-600 mb-2">Drag & drop header image or click to browse</p>
                        <div className="inline-flex items-center justify-center bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-full mb-2">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Image will be cropped to 16:9 ratio
                        </div>
                        <p className="text-sm text-gray-500">Recommended: Landscape orientation, high resolution</p>
                      </label>
                    </div>
                  )}
                </div>

                {errors.headerimage && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 text-sm text-red-600 flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.headerimage}
                  </motion.p>
                )}
              </motion.div>

              {/* ... Rest of your form components (Project Images, Services, etc.) remain the same ... */}
              {/* Project Images Card */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className={`${cardGlass} rounded-2xl p-6`}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  Project Images *
                </h3>

                {/* File Upload Area */}
                <div className="mb-6">
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gray-400 transition-colors duration-200 bg-white/30"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="fileinput"
                    />
                    <label htmlFor="fileinput" className="cursor-pointer">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <p className="text-gray-600 mb-2">Drag & drop images here or click to browse</p>
                      <p className="text-sm text-gray-500">Supports JPG, PNG, WEBP - Max 10MB per image</p>
                    </label>
                  </div>

                  {errors.images && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-3 text-sm text-red-600 flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.images}
                    </motion.p>
                  )}
                </div>

                {/* Image Previews */}
                {previewUrls.length > 0 && (
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">
                      Selected Images ({previewUrls.length})
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {previewUrls.map((url, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="relative group"
                        >
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg shadow-sm"
                          />
                          <motion.button
                            type="button"
                            onClick={() => removeFile(index)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Construction Images Card - Conditionally shown */}
              {showConstructionImages && (
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className={`${cardGlass} rounded-2xl p-6`}
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    Construction Images *
                    <span className="ml-2 text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      Required for {formData.status} projects
                    </span>
                  </h3>

                  {/* File Upload Area */}
                  <div className="mb-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gray-400 transition-colors duration-200 bg-white/30">
                      <input
                        ref={constructionFileInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleConstructionFileChange}
                        className="hidden"
                        id="constructionfileinput"
                      />
                      <label htmlFor="constructionfileinput" className="cursor-pointer">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                        <p className="text-gray-600 mb-2">Drag & drop construction images here or click to browse</p>
                        <p className="text-sm text-gray-500">Document construction progress and completion</p>
                      </label>
                    </div>

                    {errors.consturctionimages && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-3 text-sm text-red-600 flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.consturctionimages}
                      </motion.p>
                    )}
                  </div>

                  {/* Construction Image Previews */}
                  {constructionPreviewUrls.length > 0 && (
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">
                        Selected Construction Images ({constructionPreviewUrls.length})
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {constructionPreviewUrls.map((url, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative group"
                          >
                            <img
                              src={url}
                              alt={`Construction preview ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg shadow-sm"
                            />
                            <motion.button
                              type="button"
                              onClick={() => removeConstructionFile(index)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </motion.button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Services Card */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className={`${cardGlass} rounded-2xl p-6 overflow-visible`}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  Services
                </h3>
                
                <div className="relative" ref={servicesDropdownRef}>
                  {/* Selected Services Display */}
                  {formData.services.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {servicesList
                        .filter(service => formData.services.includes(service._id))
                        .map((service) => (
                          <span
                            key={service._id}
                            className="inline-flex items-center gap-1 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg"
                          >
                            {service.title}
                            <button
                              type="button"
                              onClick={() => toggleService(service._id)}
                              className="hover:text-gray-300 transition-colors"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </span>
                        ))}
                    </div>
                  )}

                  {/* Services Dropdown Button */}
                  <button
                    type="button"
                    onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                    disabled={loadingServices}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200 bg-white/50 text-left flex items-center justify-between hover:bg-white/70 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="text-gray-700">
                      {loadingServices ? 'Loading services...' : 
                       formData.services.length > 0 
                        ? `${formData.services.length} service${formData.services.length !== 1 ? 's' : ''} selected` 
                        : 'Select services'
                      }
                    </span>
                    {!loadingServices && (
                      <svg 
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isServicesDropdownOpen ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>

                  {/* Services Dropdown Menu */}
                  <AnimatePresence>
                    {isServicesDropdownOpen && !loadingServices && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute z-50 mt-2 w-full max-h-60 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <div className="p-2">
                          {/* Quick Select Buttons */}
                          {servicesList.length > 0 && (
                            <div className="mb-3">
                              <div className="flex gap-2 mb-2">
                                <button
                                  type="button"
                                  onClick={selectAllServices}
                                  className="px-3 py-1.5 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                                >
                                  Select All
                                </button>
                                <button
                                  type="button"
                                  onClick={clearServices}
                                  className="px-3 py-1.5 text-xs bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                                >
                                  Clear All
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Services List */}
                          <div className="space-y-1">
                            {servicesList.length === 0 ? (
                              <div className="text-center py-4 text-gray-500">
                                No services available. Add services first.
                              </div>
                            ) : (
                              servicesList.map((service) => (
                                <button
                                  key={service._id}
                                  type="button"
                                  onClick={() => toggleService(service._id)}
                                  className={`w-full text-left px-4 py-2.5 text-sm rounded-lg transition-all duration-200 flex items-center justify-between ${
                                    formData.services.includes(service._id)
                                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                  }`}
                                >
                                  <span>{service.title}</span>
                                  {formData.services.includes(service._id) && (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </button>
                              ))
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Error Message */}
                  {errors.services && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 text-sm text-red-600 flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.services}
                    </motion.p>
                  )}

                  {/* Services Count */}
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {formData.services.length} of {servicesList.length} services selected
                    </span>
                    {formData.services.length > 0 && (
                      <button
                        type="button"
                        onClick={clearServices}
                        className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Clear all
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* ... Rest of your form components (Project Details, Sectors, Mark for Homepage, etc.) ... */}
              {/* Project Details Card */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className={`${cardGlass} rounded-2xl p-6`}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  Project Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200 bg-white/50 ${errors.location ? 'border-red-300 bg-red-50/50' : 'border-gray-200'
                        }`}
                      placeholder="Project location"
                      maxLength={100}
                    />
                    {errors.location && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-1 text-sm text-red-600"
                      >
                        {errors.location}
                      </motion.p>
                    )}
                  </div>

                  {/* Cost */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cost (₹)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cost"
                        value={formData.cost}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 pl-10 border rounded-xl focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200 bg-white/50 ${errors.cost ? 'border-red-300 bg-red-50/50' : 'border-gray-200'
                          }`}
                        placeholder="0.00"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">₹</span>
                      </div>
                      {formData.cost && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-sm text-gray-500">
                            ({formatCostDisplay(formData.cost)})
                          </span>
                        </div>
                      )}
                    </div>
                    {errors.cost && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-1 text-sm text-red-600 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.cost}
                      </motion.p>
                    )}
                  </div>

                  {/* Region */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Region
                    </label>
                    <select
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200 bg-white/50"
                    >
                      <option value="">Select Region</option>
                      {regions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                    {errors.region && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-1 text-sm text-red-600"
                      >
                        {errors.region}
                      </motion.p>
                    )}
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200 bg-white/50"
                    >
                      <option value="Active">Active</option>
                      <option value="Completed">Completed</option>
                      <option value="Planning">Planning</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Sectors Input */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sectors
                  </label>
                  
                  {/* Predefined Sectors */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {predefinedSectors.map((sector) => (
                      <button
                        key={sector}
                        type="button"
                        onClick={() => toggleSector(sector)}
                        className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                          formData.sectors.includes(sector)
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {sector}
                      </button>
                    ))}
                  </div>

                  {/* Custom Sector Input */}
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newSector}
                      onChange={(e) => setNewSector(e.target.value)}
                      onKeyPress={handleSectorKeyPress}
                      placeholder="Add custom sector"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200 bg-white/50"
                    />
                    <button
                      type="button"
                      onClick={addCustomSector}
                      disabled={!newSector.trim()}
                      className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      Add
                    </button>
                  </div>

                  {/* Display selected sectors */}
                  {formData.sectors.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Selected Sectors:</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.sectors.map((sector, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg"
                          >
                            {sector}
                            <button
                              type="button"
                              onClick={() => removeSector(sector)}
                              className="hover:text-gray-300 transition-colors"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {errors.sectors && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 text-sm text-red-600 flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.sectors}
                    </motion.p>
                  )}
                </div>
              </motion.div>

              {/* Mark for Homepage Toggle */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className={`${cardGlass} rounded-2xl p-6`}
              >
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white/50">
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-900 block">
                      Feature on Homepage
                    </label>
                    <p className="text-sm text-gray-500 mt-1">
                      Display this project in the featured section on the homepage
                    </p>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={formData.markforhomepage}
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      markforhomepage: !prev.markforhomepage
                    }))}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${formData.markforhomepage ? 'bg-gray-900' : 'bg-gray-200'
                      }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${formData.markforhomepage ? 'translate-x-5' : 'translate-x-0'
                        }`}
                    />
                  </button>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-white/20">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>

                <div className="flex-1" />

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gray-900 hover:bg-gray-800 shadow-lg shadow-gray-900/25'
                    } text-white`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {project ? 'Updating...' : 'Creating...'}
                    </div>
                  ) : (
                    project ? 'Update Project' : 'Create Project'
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

AddEditProjectModal.propTypes = {
  project: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired
};

export default AddEditProjectModal;