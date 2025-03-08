import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MessageCircle, Heart, Gem, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../HomePage/Navbar";
import Footer from "../HomePage/Footer";
import { BASE_URL } from "../../config";

const PostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState("");
    const [reply, setReply] = useState({});
    const [showReplyInput, setShowReplyInput] = useState({});
    const [token, setToken] = useState(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    useEffect(() => {
        const tokenFromStorage = localStorage.getItem("token");
        if (tokenFromStorage) {
            setToken(tokenFromStorage);
        }
    }, []);

    useEffect(() => {
        if (token) {
            axios
                .get(`${BASE_URL}community/posts/${id}/`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    if (response.data.success) {
                        setPost(response.data.post);
                    }
                })
                .catch((error) => console.error("Error fetching post:", error))
                .finally(() => setLoading(false));
        }
    }, [id, token]);

    const handleCommentSubmit = async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}community/create_comment/${id}/`,
                { content: comment },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                setComment("");
                window.location.reload();
            }
        } catch (error) {
            console.error("Error creating comment:", error);
        }
    };

    const handleReplySubmit = async (commentId) => {
        try {
            const response = await axios.post(
                `${BASE_URL}community/create_reply/${commentId}/`,
                { content: reply[commentId] },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                window.location.reload();
            }
        } catch (error) {
            console.error("Error creating reply:", error);
        }
    };

    const toggleReplyInput = (commentId) => {
        setShowReplyInput(prev => ({ ...prev, [commentId]: !prev[commentId] }));
        setReply(prev => ({ ...prev, [commentId]: "" }));
    };

    if (loading) return <p className="text-center mt-5 text-purple-300">Curating post...</p>;
    if (!post) return <p className="text-center mt-5 text-purple-300">Experience not found</p>;

    return (
        <>
            <Navbar />
            <main className="flex-grow min-h-screen w-full px-4 md:px-10 py-6 bg-gradient-to-br from-slate-900 to-purple-900 overflow-auto relative">
                {/* Floating Gems */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-amber-400 rounded-full"
                            animate={{
                                x: [0, 100, 0],
                                y: [0, 50, 0],
                                opacity: [0, 0.5, 0],
                                scale: [0, 1, 0]
                            }}
                            transition={{
                                duration: Math.random() * 10 + 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                boxShadow: '0 0 15px rgba(245, 158, 11, 0.3)'
                            }}
                        />
                    ))}
                </div>

                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-amber-400 mb-4 hover:text-amber-300 flex items-center gap-2"
                    onClick={() => navigate("/community")}
                >
                    <ArrowLeft className="w-5 h-5" />
                    Return to Collective
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 mt-10"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-amber-400/20 rounded-lg">
                            <Gem className="h-8 w-8 text-amber-400" strokeWidth={1.5} />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent">
                            {post.post.title}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4 text-purple-300">
                        <span className="text-sm">
                            {new Date(post.post.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                        <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm">
                            VIP Experience
                        </span>
                    </div>

                    <motion.div
                        className="p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 relative overflow-hidden"
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-amber-500/10 opacity-0 hover:opacity-20 transition-opacity" />
                        <p className="text-purple-200 leading-relaxed">{post.post.content}</p>
                        {post.post.image && (
                            <motion.div
                                className="mt-6 overflow-hidden rounded-xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <img
                                    src={`${BASE_URL}${post.post.image}`}
                                    alt="Post"
                                    className="w-full max-w-2xl h-96 object-cover rounded-xl transform transition-transform hover:scale-105"
                                />
                            </motion.div>
                        )}
                    </motion.div>

                    {post.post.user && (
                        <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-lg rounded-lg border border-white/10">
                            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-amber-400" />
                            </div>
                            <p className="text-purple-300">Shared by {post.post.user}</p>
                        </div>
                    )}
                </motion.div>

                {/* Comments Section */}
                <motion.div
                    className="mt-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                        <Gem className="w-6 h-6 text-amber-400" />
                        Collective Insights
                    </h2>

                    <motion.div className="space-y-4" variants={containerVariants}>
                        <motion.div
                            className="p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 relative"
                            variants={itemVariants}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-amber-500/10 opacity-0 hover:opacity-20 transition-opacity" />
                            <textarea
                                className="w-full p-3 bg-white/5 text-purple-200 rounded-lg focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 placeholder-purple-300/50"
                                rows="3"
                                placeholder="Share your refined perspective..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleCommentSubmit}
                                className="mt-3 px-6 py-2 bg-gradient-to-r from-amber-600 to-purple-600 text-white rounded-lg hover:from-amber-700 hover:to-purple-700 transition-all relative"
                            >
                                <Sparkles className="w-4 h-4 absolute left-4 top-3 animate-pulse" />
                                Share Perspective
                                <Sparkles className="w-4 h-4 absolute right-4 top-3 animate-pulse" />
                            </motion.button>
                        </motion.div>

                        <AnimatePresence>
                            {post.comments.length > 0 ? (
                                post.comments.map((c) => (
                                    <motion.div
                                        key={c.id}
                                        className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 group relative overflow-hidden"
                                        variants={itemVariants}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-amber-500/10 opacity-0 group-hover:opacity-20 transition-opacity" />
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                                                <Gem className="w-5 h-5 text-amber-400" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="font-medium text-amber-400">{c.user}</p>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        onClick={() => toggleReplyInput(c.id)}
                                                        className="text-purple-300 hover:text-amber-400 flex items-center gap-1"
                                                    >
                                                        <ArrowLeft className="w-5 h-5 rotate-180" />
                                                        <span className="text-sm">Respond</span>
                                                    </motion.button>
                                                </div>
                                                <p className="mt-1 text-purple-200">{c.content}</p>

                                                {/* Reply Input */}
                                                <AnimatePresence>
                                                    {showReplyInput[c.id] && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="mt-4 pl-8 border-l-2 border-white/10"
                                                        >
                                                            <textarea
                                                                className="w-full p-2 bg-white/5 text-purple-200 rounded-lg focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 placeholder-purple-300/50"
                                                                rows="2"
                                                                placeholder="Craft your response..."
                                                                value={reply[c.id] || ""}
                                                                onChange={(e) => setReply(prev => ({ ...prev, [c.id]: e.target.value }))}
                                                            />
                                                            <div className="flex gap-2 mt-2">
                                                                <motion.button
                                                                    whileHover={{ scale: 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                    onClick={() => handleReplySubmit(c.id)}
                                                                    className="px-4 py-2 bg-gradient-to-r from-amber-600 to-purple-600 text-white rounded-lg"
                                                                >
                                                                    Post Response
                                                                </motion.button>
                                                                <motion.button
                                                                    whileHover={{ scale: 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                    onClick={() => toggleReplyInput(c.id)}
                                                                    className="px-4 py-2 border border-white/20 text-purple-300 rounded-lg"
                                                                >
                                                                    Cancel
                                                                </motion.button>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                                {/* Replies List */}
                                                {c.replies?.length > 0 && (
                                                    <div className="mt-4 pl-8 border-l-2 border-white/10 space-y-4">
                                                        {c.replies.map((reply) => (
                                                            <motion.div
                                                                key={reply.id}
                                                                className="pt-4 flex gap-3"
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                            >
                                                                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                                                                    <Sparkles className="w-5 h-5 text-purple-400" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-medium text-amber-400">
                                                                        {reply.user}
                                                                    </p>
                                                                    <p className="text-purple-300 text-sm">{reply.content}</p>
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.p
                                    className="text-purple-300 text-center py-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    No insights yet. Illuminate the conversation!
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </main>
            <Footer />
        </>
    );
};

export default PostDetail;