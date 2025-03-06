import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    toast.success('Logged out successfully!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setTimeout(() => window.location.href = '/', 2000);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Organize", path: "/organize" },
    { name: "Community", path: "/community" },
    { name: "Feedback", path: "/feedback" },
    { name: "Contact Us", path: "/contact-us" },
    { name: "About Us", path: "/about-us" },
  ];

  // Variants for mobile menu container
  const mobileMenuVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: { when: "beforeChildren", staggerChildren: 0.1 },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: { when: "afterChildren" },
    },
  };

  // Variants for individual links in mobile menu
  const linkVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -20 },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed w-full bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur-lg z-50 shadow-xl"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent"
            >
              Promises & Pearls
            </motion.span>
            <span className="text-white text-xl">✨</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={link.path}
                  className="text-gray-200 hover:text-white transition-colors font-medium text-lg relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
            {/* Auth Buttons */}
            <div className="flex space-x-4 ml-8">
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    className="dropdown-toggle flex items-center space-x-2 px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800 transition-colors"
                    onClick={toggleMenu}
                  >
                    <span className="sr-only">Open dropdown menu</span>
                    <User className="w-6 h-6 text-white" />
                    <span className="hidden sm:block">
                      Hi, {user?.first_name || 'Sample'} {user?.last_name || 'Customer'}
                    </span>
                  </button>
                  <div
                    className={`dropdown-menu absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg ${
                      isMenuOpen ? '' : 'hidden'
                    }`}
                  >
                    <Link
                      to="/dashboard"
                      className="dropdown-item block px-4 py-2 text-sm text-white hover:bg-gray-800"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/"
                      className="dropdown-item block px-4 py-2 text-sm text-white hover:bg-gray-800"
                      onClick={logout}
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login-register"
                  className="login-button px-4 py-2 rounded-md bg-cyan-500 text-white hover:bg-cyan-600 transition-colors"
                >
                  Login/Signup
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          variants={mobileMenuVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          className="md:hidden overflow-hidden"
        >
          <div className="flex flex-col space-y-4 mt-4">
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                variants={linkVariants}
                className="border-b border-purple-800/50"
              >
                <Link
                  to={link.path}
                  className="block py-3 text-gray-200 hover:text-white text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}

            <div className="pt-4">
              {!isLoggedIn ? (
                <motion.button
                  variants={linkVariants}
                  className="w-full py-3 rounded-lg bg-purple-600 text-white focus:outline-none"
                >
                  Get Started
                </motion.button>
              ) : (
                <motion.button
                  variants={linkVariants}
                  className="w-full py-3 rounded-lg bg-rose-600 text-white focus:outline-none"
                  onClick={logout}
                >
                  Logout
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

