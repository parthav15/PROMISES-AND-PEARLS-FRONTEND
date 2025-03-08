import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, User, Gem, Ticket, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const userString = localStorage.getItem('user');
      const userObj = JSON.parse(userString);
      setUser(userObj);
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    toast.success('Logged out successfully!');
    setTimeout(() => window.location.href = '/', 2000);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const navLinks = [
    { name: "Home", path: "/", icon: <Gem size={18} /> },
    { name: "Events", path: "/events", icon: <Ticket size={18} /> },
    { name: "Organize Request", path: "/organize", icon: <Gem size={18} /> },
    { name: "Community", path: "/community", icon: <User size={18} /> },
    { name: "Feedback", path: "/feedback", icon: <Moon size={18} /> },
    { name: "Contact", path: "/contact-us", icon: <Gem size={18} /> },
    { name: "About", path: "/about-us", icon: <Sun size={18} /> },
  ];

  const menuVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -20 },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-purple-900/50 backdrop-blur-xl z-50 shadow-2xl shadow-purple-900/30">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: [0, -15, 15, 0] }}
              className="p-2 rounded-full bg-gradient-to-br from-rose-500 to-purple-600 shadow-lg">
              <Gem className="text-white w-6 h-6" />
            </motion.div>
            <motion.span
              className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent relative">
              Promises & Pearls
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12" />
            </motion.span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.div key={link.name} whileHover={{ scale: 1.05 }}>
                <Link
                  to={link.path}
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-all font-medium relative group">
                  {link.icon && React.cloneElement(link.icon, { className: "text-purple-400" })}
                  {link.name}
                  <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-rose-400 to-purple-400 group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={toggleMenu}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-br from-purple-900/40 to-rose-900/30 hover:from-purple-800/50 hover:to-rose-800/40 transition-all group">
                  <User className="w-5 h-5 text-purple-300 group-hover:text-white" />
                  <span className="text-gray-200 group-hover:text-white">
                    Hi, {user?.first_name} {user?.last_name || 'Guest'}
                  </span>
                </button>

                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={menuVariants}
                      className="absolute right-0 mt-2 w-48 bg-slate-900/95 backdrop-blur-lg rounded-xl shadow-xl border border-purple-900/50">
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-slate-800/50 transition-colors border-b border-purple-900/30">
                        <User className="w-4 h-4 text-purple-400" />
                        Dashboard
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-slate-800/50 transition-colors">
                        <X className="w-4 h-4 text-rose-400" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login-register"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-br from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-medium shadow-lg shadow-purple-900/30 hover:shadow-rose-900/40 transition-all">
                Join Now
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-purple-300 hover:text-white transition-colors">
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden mt-4 pb-4 border-t border-purple-900/50">
              <div className="flex flex-col gap-2 pt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-purple-900/30 transition-colors">
                    {link.icon && React.cloneElement(link.icon, { className: "text-purple-400" })}
                    {link.name}
                  </Link>
                ))}

                <div className="mt-4 pt-4 border-t border-purple-900/50">
                  {isLoggedIn ? (
                    <button
                      onClick={logout}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-rose-600/90 hover:bg-rose-600 text-white transition-colors">
                      <X className="w-5 h-5" />
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/login-register"
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white transition-colors">
                      <User className="w-5 h-5" />
                      Get Started
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;