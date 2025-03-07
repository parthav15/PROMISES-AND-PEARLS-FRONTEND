import { motion, AnimatePresence } from "framer-motion";
import { Gem, Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight, Sparkles } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: <Facebook />, color: "#1877F2", name: "Facebook" },
    { icon: <Twitter />, color: "#1DA1F2", name: "Twitter" },
    { icon: <Instagram />, color: "#E1306C", name: "Instagram" },
    { icon: <Linkedin />, color: "#0A66C2", name: "LinkedIn" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12 overflow-hidden border-t border-purple-900/50">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10 mix-blend-soft-light" 
        />
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 group">
              <div className="p-2 rounded-xl bg-gradient-to-br from-rose-500 to-purple-600 shadow-lg">
                <Gem className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent">
                Promises & Pearls
              </span>
              <Sparkles className="h-5 w-5 text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Crafting unforgettable experiences where dreams meet reality. Join our vibrant community of visionaries and creators.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href="#"
                  whileHover={{ y: -4 }}
                  className="p-2 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 hover:border-purple-400/30 transition-all"
                  style={{ color: link.color }}>
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">Explore</h3>
            <div className="grid grid-cols-2 gap-4">
              {['Events', 'Organize', 'Community', 'Blog', 'FAQs', 'Support'].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-gray-300 hover:text-purple-300 text-sm group">
                  <ArrowRight className="h-4 w-4 text-transparent group-hover:text-purple-400 transition-colors" />
                  {item}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
            <div className="space-y-4">
              <motion.div whileHover={{ x: 5 }} className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-900/30">
                  <MapPin className="h-5 w-5 text-purple-400" />
                </div>
                <span className="text-gray-300 text-sm">123 Innovation Blvd</span>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-rose-900/30">
                  <Phone className="h-5 w-5 text-rose-400" />
                </div>
                <span className="text-gray-300 text-sm">+1 (800) 987-6543</span>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-900/30">
                  <Mail className="h-5 w-5 text-amber-400" />
                </div>
                <span className="text-gray-300 text-sm">hello@promisespearls.com</span>
              </motion.div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-300 text-sm">
              Join our newsletter for exclusive updates and early access to premium experiences.
            </p>
            <motion.form 
              whileHover={{ scale: 1.02 }}
              className="relative group">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 text-gray-200 placeholder-gray-400 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-2 top-2 bg-gradient-to-br from-rose-500 to-purple-600 p-2 rounded-lg shadow-lg hover:shadow-purple-500/20 transition-all">
                <ArrowRight className="h-5 w-5 text-white" />
              </motion.button>
            </motion.form>
          </div>
        </div>

        {/* Copyright Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border-t border-white/10 pt-8 text-center">
          <p className="text-gray-400 text-xs font-light">
            © {new Date().getFullYear()} Promises & Pearls. Crafted with passion in New York.<br />
            <span className="opacity-70">Part of the Visionary Experiences Group</span>
          </p>
        </motion.div>

        {/* Floating Particles */}
        <AnimatePresence>
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 0.3, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2 + Math.random() * 5,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut'
              }}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </AnimatePresence>
      </div>
    </footer>
  );
};

export default Footer;