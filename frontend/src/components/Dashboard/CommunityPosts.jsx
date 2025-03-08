import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Gem, Sparkles, Edit3, Trash2 } from 'lucide-react';

const CommunityPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}community/list_posts_by_user/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setPosts(response.data.posts);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Error retrieving posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDeleteConfirmation = (postId) => {
    setPostToDelete(postId);
    setShowModal(true);
  };

  const handleDeletePost = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication required. Please log in.');
      return;
    }

    try {
      const response = await axios.delete(`${BASE_URL}community/delete_post/${postToDelete}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setPosts(posts.filter(post => post.id !== postToDelete));
        toast.success(response.data.message);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Error deleting post.');
    } finally {
      setShowModal(false);
    }
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication required. Please log in.');
      return;
    }
    try {
      const response = await axios.post(
        `${BASE_URL}community/edit_post/${editingPost.id}/`,
        {
          title: editingPost.title,
          content: editingPost.content,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        setPosts(posts.map(post => post.id === editingPost.id ? response.data.post : post));
        setEditingPost(null);
        toast.success(response.data.message);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Error updating post.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent">
        <Gem className="inline-block w-8 h-8 mr-2" />
        My Community Posts
      </h2>

      <AnimatePresence>
        {editingPost ? (
          <motion.div
            key="editForm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white/5 p-6 rounded-xl border border-white/20 shadow-lg space-y-6"
          >
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <Edit3 className="w-6 h-6 text-amber-400" />
              Edit Post
            </h3>
            <form onSubmit={handleUpdatePost} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                    placeholder="POST TITLE"
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-5 py-3.5 text-purple-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 placeholder-purple-300/50 transition-all"
                    required
                  />
                  <Sparkles className="absolute right-5 top-3.5 w-5 h-5 text-amber-400/50" />
                </div>
                <div className="relative">
                  <textarea
                    value={editingPost.content}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    placeholder="POST CONTENT"
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-5 py-3.5 text-purple-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 placeholder-purple-300/50 transition-all h-32"
                    required
                  />
                  <Sparkles className="absolute right-5 top-5 w-5 h-5 text-amber-400/50" />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/20 hover:bg-white/10 transition-colors text-purple-200"
                  onClick={() => setEditingPost(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-purple-600 hover:from-amber-700 hover:to-purple-700 text-white transition-all relative overflow-hidden"
                >
                  <Sparkles className="w-5 h-5 absolute left-4 top-3 animate-pulse" />
                  Save Changes
                  <Sparkles className="w-5 h-5 absolute right-4 top-3 animate-pulse" />
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="postsList"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {posts.length === 0 && (
              <motion.div
                className="bg-white/5 p-8 rounded-xl border border-white/20 shadow-lg text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  Nothing Posted by you yet
                </h3>
                <p className="text-purple-300 mb-6">
                  Start sharing your thoughts with the community
                </p>
                <Link to="/community/new-post">
                  <motion.button
                    className="bg-gradient-to-r from-amber-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-amber-700 hover:to-purple-700 transition-all relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Sparkles className="w-5 h-5 absolute left-4 top-3.5 animate-pulse" />
                    Create New Post
                    <Sparkles className="w-5 h-5 absolute right-4 top-3.5 animate-pulse" />
                  </motion.button>
                </Link>
              </motion.div>
            )}
            {posts.map(post => (
              <div key={post.id} className="bg-white/5 p-6 rounded-xl border border-white/20 shadow-lg">
                <h3 className="text-white font-semibold text-lg">{post.title}</h3>
                <p className="text-purple-300 mt-2 text-sm">{post.content}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-purple-400 text-xs">{post.created_at}</span>
                  <div className="flex gap-3">
                    <button
                      className="text-amber-400 hover:text-amber-300 flex items-center gap-1 text-sm"
                      onClick={() => setEditingPost(post)}
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      className="text-red-400 hover:text-red-300 flex items-center gap-1 text-sm"
                      onClick={() => handleDeleteConfirmation(post.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/5 p-8 rounded-xl border border-white/20 shadow-lg max-w-md w-full"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
            >
              <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
                <Trash2 className="w-6 h-6 text-red-400" />
                Confirm Deletion
              </h3>
              <p className="text-purple-300">Are you sure you want to delete this post?</p>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/20 hover:bg-white/10 transition-colors text-purple-200"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white transition-all"
                  onClick={handleDeletePost}
                >
                  Delete Post
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <ToastContainer />
    </div>
  );
};

export default CommunityPosts;
