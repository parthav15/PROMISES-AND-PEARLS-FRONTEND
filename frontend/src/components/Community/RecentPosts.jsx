import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { BASE_URL } from "../../config";
import { Gem, Plus, Sparkles } from "lucide-react";

const API_URL = `${BASE_URL}/community/posts/`;

export default function RecentPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data.success) {
            setPosts(response.data.posts);
          }
        })
        .catch((error) => console.error("Error fetching posts:", error))
        .finally(() => setLoading(false));
    }
  }, [token]);

  return (
    <motion.section
      className="bg-gradient-to-br from-slate-900 to-purple-900 min-h-screen px-6 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-amber-400/20 rounded-lg">
              <Gem className="h-8 w-8 text-amber-400" strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent">
              Exclusive Collective
            </h2>
          </div>
          <Link to="/community/new-post">
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-amber-600 to-purple-600 rounded-full text-white hover:from-amber-700 hover:to-purple-700 flex items-center gap-2 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <Plus className="h-5 w-5" />
              Share Experience
            </motion.button>
          </Link>
        </div>

        {/* Search Input */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search experiences..."
            className="w-full px-4 py-3 border border-white/20 rounded-lg focus:outline-none text-white bg-white/5 backdrop-blur-sm placeholder-purple-300/50 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all"
          />
          <Sparkles className="h-5 w-5 text-amber-400 absolute right-4 top-3.5" />
        </div>

        {/* Posts List */}
        {loading ? (
          <p className="text-purple-300 text-center">Curating moments...</p>
        ) : posts.length === 0 ? (
          <div className="text-center p-8 bg-white/5 rounded-xl border border-white/10">
            <p className="text-purple-300">Be the first to share your exquisite experience</p>
          </div>
        ) : (
          posts.map((post) => (
            <Link key={post.id} to={`/community/posts/${post.id}`}>
              <motion.div
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 mb-6 hover:border-amber-400/30 transition-all group relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="h-5 w-5 text-amber-400" />
                      <h3 className="text-xl font-semibold text-white">
                        {post.title}
                      </h3>
                    </div>
                    <p className="text-purple-200">
                      {post.content.length > 200 ? (
                        <span>
                          {post.content.slice(0, 200)}...
                          <span className="text-amber-400 hover:underline ml-1">
                            Continue Reading
                          </span>
                        </span>
                      ) : (
                        post.content
                      )}
                    </p>

                    {/* Author & Date */}
                    <div className="mt-4 text-sm text-purple-300 flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Gem className="h-4 w-4 text-amber-400" />
                        <span>{post.user}</span>
                      </div>
                      <span className="opacity-50">•</span>
                      <span>
                        {new Date(post.created_at).toLocaleString("en-US", {
                          dateStyle: "long",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Image */}
                  {post.image && (
                    <div className="relative overflow-hidden rounded-lg w-48 h-48">
                      <img
                        src={`${BASE_URL}${post.image}`}
                        alt="Post"
                        className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                  )}
                </div>
              </motion.div>
            </Link>
          ))
        )}
      </div>
    </motion.section>
  );
}