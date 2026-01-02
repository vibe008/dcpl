// app/careers/page.js
'use client';
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
    ArrowRight,
    Send,
    MapPin,
    Clock,
    Award,
    Users,
    Sparkles,
    X,
    Briefcase,
    Heart,
    Upload,
    Paperclip,
    Building,
    Calendar,
    CheckCircle,
    Loader2
} from "lucide-react";
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';

const CareersPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);
    // Brand Colors
    const primaryColor = '#6556D5';
    const secondaryColor = '#51B873';
    const primaryLight = '#6556D5/10';
    const secondaryLight = '#51B873/10';

    // Fetch careers from API
    useEffect(() => {
        fetchCareers();
    }, []);

    const fetchCareers = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/careers');
            const data = await response.json();

            if (data.success) {
                const activeJobs = data.data.filter(job => job.isActive);
                setJobs(activeJobs);
            }
        } catch (error) {
            console.error('Error fetching careers:', error);
            toast.error('Failed to load career opportunities');
        } finally {
            setIsLoading(false);
        }
    };

  async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append('files', file);
    formData.append('folder', 'Application');

    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    if (data && data.success && data.urls && data.urls[0]) return data.urls[0];
    throw new Error((data && data.message) || 'Upload failed');
  }


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                toast.error('File size must be less than 5MB');
                return;
            }

            // Validate file type
            const validTypes = ['application/pdf', 'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!validTypes.includes(file.type)) {
                toast.error('Please upload PDF or DOC files only');
                return;
            }

            setSelectedFile(file);
            toast.success('File selected successfully');
        }
    };

    const handleApplyClick = (job) => {
        if (isExpanded && selectedJob?._id === job._id) {
            setIsExpanded(false);
            setSelectedJob(null);
        } else {
            setSelectedJob(job);
            setIsExpanded(true);
            // Scroll to expanded section
            setTimeout(() => {
                document.getElementById(`job-${job._id}`)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 100);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedJob || !selectedFile) {
            toast.error('Please upload your resume');
            return;
        }

        setIsSubmitting(true);
        const submitToast = toast.loading('Submitting application...');

        try {
            // Upload resume to Cloudinary
            const resumeUrl = await uploadToCloudinary(selectedFile);
            toast.success('Resume uploaded successfully', { id: submitToast });

            // Prepare application data
            const formData = new FormData(e.target);
            const applicationData = {
                position: selectedJob._id,
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone') || '',
                coverLetter: formData.get('coverLetter') || '',
                resumeUrl: resumeUrl
            };

            // Submit application
            const response = await fetch('/api/appliction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(applicationData),
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Application submitted successfully!', {
                    id: submitToast,
                    duration: 5000
                });

                // Reset form
                setSelectedFile(null);
                setIsExpanded(false);
                setSelectedJob(null);
                if (formRef.current) {
                    formRef.current.reset();
                }
            } else {
                toast.error(data.message || 'Error submitting application', {
                    id: submitToast
                });
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            toast.error('Failed to submit application. Please try again.', {
                id: submitToast
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="rounded-full h-12 w-12 border-3 border-gray-200 border-t-[#6556D5] mx-auto mb-4"
                    />
                    <p className="text-gray-600 font-light">Loading opportunities...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: '#fff',
                        color: '#374151',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px',
                    },
                    success: {
                        iconTheme: {
                            primary: '#51B873',
                            secondary: '#fff',
                        },
                        style: {
                            borderLeft: `4px solid ${secondaryColor}`,
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#fff',
                        },
                        style: {
                            borderLeft: '4px solid #ef4444',
                        },
                    },
                }}
            />


            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="relative h-[85vh] overflow-hidden">
                    <motion.div
                        className="absolute inset-0"
                        style={{ y, scale }}
                    >
                        <img
                            src="/assets/career.jpg"
                            alt="Projects Header"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
                    </motion.div>

                    <motion.div
                        className="absolute inset-0 flex items-center"
                        style={{ opacity }}
                    >
                        <div className="max-w-7xl mx-auto px-8 w-full">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                            >
                                <motion.div
                                    className="inline-flex items-center space-x-3 mb-8 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className="w-8 h-0.5 bg-gradient-to-r from-[#6455D1] to-white"></div>
                                    <span className="text-white/90 font-light tracking-[0.2em] text-sm">SERVICES</span>
                                </motion.div>
                                <h1 className="text-7xl lg:text-8xl font-light text-white mb-6 tracking-tight">
                                    Design Your <br />
                                    <span className="font-normal text-white bg-clip-text">
                                        Architectural Future
                                    </span>
                                </h1>

                                <motion.p
                                    className="text-white/80 font-light text-lg max-w-2xl leading-relaxed mb-10"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    Join a team of visionary architects and designers committed to creating spaces that inspire, endure, and transform communities.
                                </motion.p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                    >
                        <div className="flex flex-col items-center">
                            <span className="text-white/60 font-light text-sm mb-2 tracking-wider">EXPLORE</span>
                            <motion.div
                                className="w-[1px] h-16 bg-gradient-to-b from-white/80 to-transparent"
                                animate={{ height: [16, 32, 16] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Open Positions */}
                <section id="open-positions" className="py-24 px-4 max-w-6xl mx-auto">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="mb-16 text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 tracking-tight">
                            Open Positions
                        </h2>
                        <div className="w-20 h-px bg-gray-300 mx-auto mb-6 relative">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="absolute h-full bg-gradient-to-r from-[#6556D5] to-[#51B873]"
                            />
                        </div>
                        <p className="text-gray-600 max-w-2xl mx-auto font-light">
                            Explore current opportunities to contribute to our award-winning architectural practice.
                        </p>
                    </motion.div>

                    {/* Jobs Grid */}
                    <div className="space-y-6">
                        {jobs.map((job, i) => (
                            <motion.div
                                key={job._id}
                                id={`job-${job._id}`}
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                layout
                            >
                                {/* Job Card */}
                                <motion.div
                                    layoutId={`job-card-${job._id}`}
                                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 overflow-hidden"
                                    whileHover={{
                                        y: -2,
                                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)"
                                    }}
                                >
                                    {/* Job Header */}
                                    <div className="p-8 border-b border-gray-100">
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <motion.span
                                                        whileHover={{ scale: 1.05 }}
                                                        className="text-xs font-medium px-3 py-1 rounded-full"
                                                        style={{
                                                            background: primaryLight,
                                                            color: primaryColor
                                                        }}
                                                    >
                                                        {job.type}
                                                    </motion.span>
                                                    <span className="text-xs text-gray-500 font-light flex items-center gap-1">
                                                        <Building className="w-3 h-3" />
                                                        {job.department}
                                                    </span>
                                                </div>

                                                <h3 className="text-xl font-light text-gray-900 mb-2">
                                                    {job.title}
                                                </h3>

                                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                                    <span className="flex items-center gap-1 font-light">
                                                        <MapPin className="w-4 h-4" />
                                                        {job.location}
                                                    </span>
                                                    <span className="flex items-center gap-1 font-light">
                                                        <Calendar className="w-4 h-4" />
                                                        Full-time
                                                    </span>
                                                </div>
                                            </div>

                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleApplyClick(job)}
                                                className="px-6 py-3 text-sm font-medium rounded-lg flex items-center gap-2 whitespace-nowrap transition-all"
                                                style={{
                                                    background: selectedJob?._id === job._id && isExpanded ? '#f3f4f6' : 'transparent',
                                                    color: selectedJob?._id === job._id && isExpanded ? primaryColor : '#fff',
                                                    backgroundColor: selectedJob?._id === job._id && isExpanded ? '#f3f4f6' : primaryColor,
                                                    border: `1px solid ${selectedJob?._id === job._id && isExpanded ? primaryLight : primaryColor}`
                                                }}
                                            >
                                                {selectedJob?._id === job._id && isExpanded ? 'Close' : 'Apply Now'}
                                                <ArrowRight className={`w-4 h-4 transition-transform ${selectedJob?._id === job._id && isExpanded ? 'rotate-180' : ''}`} />
                                            </motion.button>
                                        </div>
                                    </div>

                                    {/* Expanded Job Details */}
                                    <AnimatePresence>
                                        {isExpanded && selectedJob?._id === job._id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                                className="border-t border-gray-100"
                                            >
                                                <div className="p-8">
                                                    <div className="grid md:grid-cols-2 gap-12">
                                                        {/* Job Description */}
                                                        <div>
                                                            <h4 className="text-sm font-medium text-gray-900 mb-4 tracking-wider uppercase flex items-center gap-2">
                                                                <div className="w-2 h-2 rounded-full" style={{ background: secondaryColor }}></div>
                                                                Job Description
                                                            </h4>
                                                            <p className="text-gray-600 font-light leading-relaxed">
                                                                {job.description}
                                                            </p>
                                                        </div>

                                                        {/* Requirements & Responsibilities */}
                                                        <div className="space-y-8">
                                                            {/* Requirements */}
                                                            {job.requirements && job.requirements.length > 0 && (
                                                                <div>
                                                                    <h4 className="text-sm font-medium text-gray-900 mb-4 tracking-wider uppercase flex items-center gap-2">
                                                                        <CheckCircle className="w-4 h-4" style={{ color: primaryColor }} />
                                                                        Requirements
                                                                    </h4>
                                                                    <ul className="space-y-3">
                                                                        {job.requirements.map((req, idx) => (
                                                                            <motion.li
                                                                                key={idx}
                                                                                initial={{ opacity: 0, x: -10 }}
                                                                                animate={{ opacity: 1, x: 0 }}
                                                                                transition={{ delay: idx * 0.05 }}
                                                                                className="flex items-start gap-3"
                                                                            >
                                                                                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: primaryColor }}></div>
                                                                                <span className="text-gray-600 font-light">{req}</span>
                                                                            </motion.li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}

                                                            {/* Responsibilities */}
                                                            {job.responsibilities && job.responsibilities.length > 0 && (
                                                                <div>
                                                                    <h4 className="text-sm font-medium text-gray-900 mb-4 tracking-wider uppercase flex items-center gap-2">
                                                                        <div className="w-2 h-2 rounded-full" style={{ background: secondaryColor }}></div>
                                                                        Responsibilities
                                                                    </h4>
                                                                    <ul className="space-y-3">
                                                                        {job.responsibilities.map((resp, idx) => (
                                                                            <motion.li
                                                                                key={idx}
                                                                                initial={{ opacity: 0, x: -10 }}
                                                                                animate={{ opacity: 1, x: 0 }}
                                                                                transition={{ delay: idx * 0.05 + 0.1 }}
                                                                                className="flex items-start gap-3"
                                                                            >
                                                                                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: secondaryColor }}></div>
                                                                                <span className="text-gray-600 font-light">{resp}</span>
                                                                            </motion.li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Application Form */}
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.2 }}
                                                        className="mt-12 pt-8 border-t border-gray-200"
                                                    >
                                                        <h4 className="text-lg font-light text-gray-900 mb-6">
                                                            Apply for this Position
                                                        </h4>

                                                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                                                            <input type="hidden" name="position" value={selectedJob?._id} />

                                                            <div className="grid md:grid-cols-2 gap-6">
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                        Full Name *
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        name="name"
                                                                        required
                                                                        className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-gray-500 transition-colors"
                                                                        placeholder="John Smith"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                        Email Address *
                                                                    </label>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        required
                                                                        className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-gray-500 transition-colors"
                                                                        placeholder="john@example.com"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                    Phone Number
                                                                </label>
                                                                <input
                                                                    type="tel"
                                                                    name="phone"
                                                                    className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-gray-500 transition-colors"
                                                                    placeholder="+1 (555) 123-4567"
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                    Cover Letter
                                                                </label>
                                                                <textarea
                                                                    name="coverLetter"
                                                                    rows="4"
                                                                    className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-gray-500 transition-colors"
                                                                    placeholder="Tell us about your interest in this position and relevant experience..."
                                                                ></textarea>
                                                            </div>

                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                    Resume/CV *
                                                                </label>
                                                                <div className="relative">
                                                                    <input
                                                                        type="file"
                                                                        id="resume-file"
                                                                        onChange={handleFileChange}
                                                                        accept=".pdf,.doc,.docx"
                                                                        required
                                                                        className="hidden"
                                                                    />
                                                                    <motion.label
                                                                        htmlFor="resume-file"
                                                                        whileHover={{ scale: 1.005 }}
                                                                        className="block w-full border-2 border-dashed border-gray-300 p-6 rounded cursor-pointer hover:border-gray-400 transition-colors text-center"
                                                                    >
                                                                        {selectedFile ? (
                                                                            <motion.div
                                                                                initial={{ opacity: 0 }}
                                                                                animate={{ opacity: 1 }}
                                                                                className="flex items-center justify-center gap-3"
                                                                            >
                                                                                <Paperclip className="w-5 h-5" style={{ color: primaryColor }} />
                                                                                <span className="font-medium text-gray-700">{selectedFile.name}</span>
                                                                            </motion.div>
                                                                        ) : (
                                                                            <div className="space-y-2">
                                                                                <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                                                                                <div>
                                                                                    <span className="font-medium text-gray-700">Upload your resume</span>
                                                                                    <p className="text-sm text-gray-500 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </motion.label>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-4">
                                                                <motion.button
                                                                    whileHover={{ scale: 1.02 }}
                                                                    whileTap={{ scale: 0.98 }}
                                                                    type="submit"
                                                                    disabled={isSubmitting}
                                                                    className="px-8 py-3 font-medium rounded flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                                                    style={{
                                                                        background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                                                                        color: '#fff'
                                                                    }}
                                                                >
                                                                    {isSubmitting ? (
                                                                        <>
                                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                                            Submitting...
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            Submit Application
                                                                            <Send className="w-4 h-4" />
                                                                        </>
                                                                    )}
                                                                </motion.button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setIsExpanded(false);
                                                                        setSelectedJob(null);
                                                                        setSelectedFile(null);
                                                                        toast('Application cancelled', {
                                                                            icon: 'ℹ️',
                                                                            style: {
                                                                                borderLeft: `4px solid ${primaryColor}`,
                                                                            }
                                                                        });
                                                                    }}
                                                                    className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </motion.div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>

                    {/* No Jobs Message */}
                    {jobs.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="text-center py-20"
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    repeatDelay: 1
                                }}
                                className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full"
                                style={{ background: primaryLight }}
                            >
                                <Briefcase className="w-10 h-10" style={{ color: primaryColor }} />
                            </motion.div>
                            <h3 className="text-xl font-light text-gray-900 mb-2">
                                No Current Openings
                            </h3>
                            <p className="text-gray-600 max-w-md mx-auto font-light">
                                We don't have any open positions at the moment. Please check back later or submit your portfolio for future opportunities.
                            </p>
                        </motion.div>
                    )}
                </section>

                {/* Why Join Us */}
                <section className="py-24 bg-white">
                    <div className="max-w-6xl mx-auto px-4">
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-20"
                        >
                            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 tracking-tight">
                                Why Join Our Team
                            </h2>
                            <div className="w-20 h-px bg-gray-300 mx-auto mb-6 relative overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                    className="absolute h-full"
                                    style={{
                                        background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`
                                    }}
                                />
                            </div>
                            <p className="text-gray-600 max-w-2xl mx-auto font-light">
                                We cultivate an environment where architectural excellence and creative innovation converge.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                {
                                    icon: <Award className="w-8 h-8" />,
                                    title: "Award-Winning Practice",
                                    description: "Contribute to recognized architectural excellence and industry-leading design"
                                },
                                {
                                    icon: <Users className="w-8 h-8" />,
                                    title: "Collaborative Culture",
                                    description: "Work alongside passionate professionals in a supportive, creative environment"
                                },
                                {
                                    icon: <Sparkles className="w-8 h-8" />,
                                    title: "Iconic Projects",
                                    description: "Shape city skylines and create lasting impact through landmark designs"
                                },
                                {
                                    icon: <Clock className="w-8 h-8" />,
                                    title: "Professional Growth",
                                    description: "Continuous learning opportunities and clear career progression paths"
                                }
                            ].map((perk, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ y: 30, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.6 }}
                                    whileHover={{ y: -5 }}
                                    className="text-center group"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all"
                                        style={{
                                            background: `linear-gradient(135deg, ${primaryLight}, ${secondaryLight})`
                                        }}
                                    >
                                        <div style={{ color: primaryColor }}>
                                            {perk.icon}
                                        </div>
                                    </motion.div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                                        {perk.title}
                                    </h3>
                                    <p className="text-gray-600 font-light text-sm leading-relaxed">
                                        {perk.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-6 tracking-tight">
                            Interested in Joining Our Team?
                        </h3>
                        <p className="text-gray-600 mb-8 max-w-2xl mx-auto font-light">
                            Even if you don't see the perfect role, we're always looking for talented individuals who share our passion for architectural excellence.
                        </p>
                        <div className="w-20 h-px bg-gray-300 mx-auto mb-8 relative">
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="absolute h-full w-full origin-left"
                                style={{
                                    background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`
                                }}
                            />
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: `0 10px 30px ${primaryColor}20` }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                if (jobs.length > 0) {
                                    const firstJob = document.getElementById(`job-${jobs[0]._id}`);
                                    if (firstJob) {
                                        firstJob.scrollIntoView({ behavior: "smooth" });
                                    }
                                } else {
                                    toast('Please check back later for opportunities', {
                                        icon: '📧',
                                        style: {
                                            borderLeft: `4px solid ${secondaryColor}`,
                                        }
                                    });
                                }
                            }}
                            className="px-8 py-4 font-medium rounded-lg inline-flex items-center gap-3 transition-all"
                            style={{
                                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                                color: '#fff'
                            }}
                        >
                            <Heart className="w-5 h-5" />
                            {jobs.length > 0 ? 'Browse Positions' : 'Contact Us'}
                        </motion.button>
                    </motion.div>
                </section>
            </div>
        </>
    );
};

export default CareersPage;