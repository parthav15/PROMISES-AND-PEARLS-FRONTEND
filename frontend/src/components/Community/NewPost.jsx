import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../HomePage/Navbar";
import Footer from "../HomePage/Footer";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../../config";
import { Gem, Sparkles, ImageIcon } from "lucide-react";

const API_URL = `${BASE_URL}/community/create_post/`;

export default function NewPost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login-register", { replace: true });
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Authentication required. Please log in.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (image) formData.append("image", image);

        try {
            const response = await axios.post(API_URL, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.success) {
                toast.success("Post shared successfully!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setTimeout(() => navigate("/community"), 2000);
            } else {
                setError(response.data.message || "Failed to create post.");
            }
        } catch (err) {
            setError("Error submitting post. Please try again.");
        }
    };

    return (
        <>
            <Navbar />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex flex-col justify-center items-center py-12 relative overflow-hidden"
            >
                {/* Floating Gems Background */}
                <div className="absolute inset-0 opacity-20">
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-amber-400 rounded-full"
                            animate={{
                                x: [0, 100, 0],
                                y: [0, 50, 0],
                                opacity: [0, 0.5, 0],
                                scale: [0, 1, 0],
                            }}
                            transition={{
                                duration: Math.random() * 10 + 8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                boxShadow: '0 0 15px rgba(245, 158, 11, 0.3)',
                            }}
                        />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full max-w-2xl bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-white/10 shadow-lg relative z-10"
                >
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center mb-8"
                    >
                        <div className="p-3 bg-amber-400/20 rounded-xl mb-4">
                            <Gem className="h-10 w-10 text-amber-400" strokeWidth={1.5} />
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent">
                            Craft Your Story
                        </h1>
                        <p className="text-purple-200 mt-2">Share exquisite moments with the P&P Collective</p>
                    </motion.div>

                    {/* Form */}
                    <motion.form
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-rose-400 text-sm text-center"
                            >
                                {error}
                            </motion.p>
                        )}

                        {/* Title Input */}
                        <div>
                            <label className="block text-purple-300 text-sm font-medium mb-2">Title</label>
                            <input
                                type="text"
                                placeholder="A Night to Remember..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 text-white placeholder-purple-300/50 transition-all"
                            />
                        </div>

                        {/* Content Input */}
                        <div>
                            <label className="block text-purple-300 text-sm font-medium mb-2">Narrative</label>
                            <textarea
                                placeholder="Describe your unforgettable experience..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                                rows="6"
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 text-white placeholder-purple-300/50 transition-all"
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-purple-300 text-sm font-medium mb-2">Capture the Moment</label>
                            <div className="flex items-center justify-center w-full bg-white/5 border border-white/20 rounded-lg p-4 hover:border-amber-400/30 transition-all">
                                <ImageIcon className="h-6 w-6 text-amber-400 mr-2" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    className="w-full text-purple-200 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-700"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-amber-600 to-purple-600 rounded-lg text-white font-semibold hover:from-amber-700 hover:to-purple-700 transition-all relative overflow-hidden"
                        >
                            <Sparkles className="w-5 h-5 absolute top-1/2 left-6 -translate-y-1/2 animate-pulse" />
                            Publish Memory
                            <Sparkles className="w-5 h-5 absolute top-1/2 right-6 -translate-y-1/2 animate-pulse" />
                        </motion.button>
                    </motion.form>
                </motion.div>
            </motion.div>
            <Footer />
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastStyle={{ backgroundColor: "#F59E0B", color: "white" }}
            />
        </>
    );
}

