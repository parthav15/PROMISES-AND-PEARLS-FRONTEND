import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import {
    Gem, Sparkles, Calendar, MapPin, Users, Wallet, PenLine, PartyPopper, Loader, AlertCircle
} from 'lucide-react';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';
import { BASE_URL } from '../config';

const OrganizeRequest = () => {
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const formatDate = (date) => {
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}T${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setSuccess(false);
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(`${BASE_URL}events/create_eventrequest/`, {
                ...data,
                expected_start_date: formatDate(data.expected_start_date),
                expected_end_date: formatDate(data.expected_end_date),
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                setSuccess(true);
                reset();
                toast.success(
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-2"
                    >
                        <PartyPopper className="w-5 h-5 text-amber-400" />
                        <span>Event request created successfully!</span>
                    </motion.div>
                );
            }
        } catch (error) {
            toast.error(
                <motion.div
                    initial={{ x: 20 }}
                    animate={{ x: 0 }}
                    className="flex items-center gap-2"
                >
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span>{error.response?.data?.message || 'Error creating event request'}</span>
                </motion.div>
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900">
            <Navbar />
            <div className="h-16" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto px-4 py-12"
            >
                <div className="text-center mb-12">
                    <motion.div
                        className="inline-flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/20 mb-6"
                        animate={success ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Gem className="w-6 h-6 text-amber-400" />
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent">
                            Organize Your Event
                        </h1>
                        <Sparkles className="w-6 h-6 text-purple-400" />
                    </motion.div>
                    <p className="text-purple-300 max-w-xl mx-auto">
                        Fill in the details below to create your perfect event. Our team will review
                        your request and get back to you within 24 hours.
                    </p>
                </div>

                <motion.div
                    className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 shadow-2xl"
                    animate={success ? { borderColor: ['#FFD700', '#A855F7', '#FFD700'] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="relative">
                                    <Gem className="absolute left-4 top-3.5 w-5 h-5 text-amber-400/70" />
                                    <input
                                        {...register("title", { required: "Title is required" })}
                                        placeholder="Event Title"
                                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 rounded-xl border border-white/20 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 placeholder-purple-300/50 text-white transition-all disabled:opacity-50"
                                        disabled={isSubmitting}
                                    />
                                    {errors.title && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-400 text-sm mt-1 flex items-center gap-1"
                                        >
                                            <AlertCircle className="w-4 h-4" /> {errors.title.message}
                                        </motion.p>
                                    )}
                                </div>

                                <div className="relative">
                                    <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-amber-400/70" />
                                    <input
                                        type="datetime-local"
                                        {...register("expected_start_date", {
                                            required: "Start date is required",
                                            validate: value => new Date(value) > new Date() || "Start date must be in future"
                                        })}
                                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 rounded-xl border border-white/20 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 placeholder-purple-300/50 text-white transition-all disabled:opacity-50"
                                        disabled={isSubmitting}
                                    />
                                    {errors.expected_start_date && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-400 text-sm mt-1 flex items-center gap-1"
                                        >
                                            <AlertCircle className="w-4 h-4" /> {errors.expected_start_date.message}
                                        </motion.p>
                                    )}
                                </div>

                                <div className="relative">
                                    <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-amber-400/70" />
                                    <input
                                        type="datetime-local"
                                        {...register("expected_end_date", {
                                            required: "End date is required",
                                            validate: value => new Date(value) > new Date(watch('expected_start_date')) || "End date must be after start date"
                                        })}
                                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 rounded-xl border border-white/20 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 placeholder-purple-300/50 text-white transition-all disabled:opacity-50"
                                        disabled={isSubmitting}
                                    />
                                    {errors.expected_end_date && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-400 text-sm mt-1 flex items-center gap-1"
                                        >
                                            <AlertCircle className="w-4 h-4" /> {errors.expected_end_date.message}
                                        </motion.p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-amber-400/70" />
                                    <input
                                        {...register("location", { required: "Location is required" })}
                                        placeholder="Event Location"
                                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 rounded-xl border border-white/20 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 placeholder-purple-300/50 text-white transition-all disabled:opacity-50"
                                        disabled={isSubmitting}
                                    />
                                    {errors.location && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-400 text-sm mt-1 flex items-center gap-1"
                                        >
                                            <AlertCircle className="w-4 h-4" /> {errors.location.message}
                                        </motion.p>
                                    )}
                                </div>

                                <div className="relative">
                                    <Users className="absolute left-4 top-3.5 w-5 h-5 text-amber-400/70" />
                                    <input
                                        type="number"
                                        {...register("expected_guests", {
                                            required: "Guest count is required",
                                            min: { value: 1, message: "Minimum 1 guest" }
                                        })}
                                        placeholder="Expected Guests"
                                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 rounded-xl border border-white/20 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 placeholder-purple-300/50 text-white transition-all disabled:opacity-50"
                                        disabled={isSubmitting}
                                    />
                                    {errors.expected_guests && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-400 text-sm mt-1 flex items-center gap-1"
                                        >
                                            <AlertCircle className="w-4 h-4" /> {errors.expected_guests.message}
                                        </motion.p>
                                    )}
                                </div>

                                <div className="relative">
                                    <Wallet className="absolute left-4 top-3.5 w-5 h-5 text-amber-400/70" />
                                    <input
                                        type="number"
                                        {...register("budget", {
                                            required: "Budget is required",
                                            min: { value: 1, message: "Minimum budget ₹1" }
                                        })}
                                        placeholder="Estimated Budget (INR)"
                                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 rounded-xl border border-white/20 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 placeholder-purple-300/50 text-white transition-all disabled:opacity-50"
                                        disabled={isSubmitting}
                                    />
                                    {errors.budget && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-400 text-sm mt-1 flex items-center gap-1"
                                        >
                                            <AlertCircle className="w-4 h-4" /> {errors.budget.message}
                                        </motion.p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <PenLine className="absolute left-4 top-4 w-5 h-5 text-amber-400/70" />
                            <textarea
                                {...register("description", { required: "Description is required" })}
                                placeholder="Event Description"
                                rows="4"
                                className="w-full pl-12 pr-4 py-3.5 bg-white/5 rounded-xl border border-white/20 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 placeholder-purple-300/50 text-white transition-all disabled:opacity-50"
                                disabled={isSubmitting}
                            />
                            {errors.description && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-400 text-sm mt-1 flex items-center gap-1"
                                >
                                    <AlertCircle className="w-4 h-4" /> {errors.description.message}
                                </motion.p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-amber-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-amber-700 hover:to-purple-700 transition-all relative overflow-hidden group disabled:opacity-75"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <AnimatePresence mode='wait'>
                                {isSubmitting ? (
                                    <motion.div
                                        key="loading"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center justify-center gap-2"
                                    >
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                        >
                                            <Loader className="w-5 h-5" />
                                        </motion.div>
                                        Submitting...
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="text"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex items-center justify-center gap-2"
                                    >
                                        <Sparkles className="w-5 h-5 animate-pulse" />
                                        Create Event Request
                                        <Sparkles className="w-5 h-5 animate-pulse" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </form>
                </motion.div>
            </motion.div>

            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-amber-400 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1, 0], opacity: [0, 0.3, 0] }}
                        transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
                    />
                ))}
            </div>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                toastStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)' }}
            />
            <Footer />
        </div>
    );
};

export default OrganizeRequest;