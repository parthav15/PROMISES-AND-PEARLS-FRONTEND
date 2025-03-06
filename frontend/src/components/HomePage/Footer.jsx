import { motion } from "framer-motion";
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-800 to-purple-800 pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Diagonal Lines */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-30"
            initial={{ x: -200 }}
            animate={{ x: 200 }}
            transition={{
              duration: 15 + i,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "linear",
            }}
            style={{
              left: `${i * 10}%`,
              transform: "rotate(45deg)",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* About Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-rose-500" />
              <span className="text-2xl font-bold text-white">
                Promises & Pearls<span className="text-purple-300"> ✨</span>
              </span>
            </div>
            <p className="text-gray-300 text-sm">
              We connect hearts and minds to foster a vibrant community of innovators and dreamers. Explore experiences that inspire.
            </p>
            <div className="flex space-x-3">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-purple-300 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-purple-300 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-purple-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-purple-300 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Resources Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-purple-300 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-purple-300 transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-purple-300 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-purple-300 transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-purple-300" />
                <span className="text-gray-300">1234 Innovation Drive, Suite 100</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-rose-400" />
                <span className="text-gray-300">+1 (800) 987-6543</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-yellow-400" />
                <span className="text-gray-300">info@promisesandpearls.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Newsletter</h3>
            <p className="text-gray-300 text-sm">
              Stay updated with the latest news and exclusive offers from our community.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-white/10 border border-white/20 rounded-md px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-purple-300 focus:ring-1 focus:ring-purple-300"
              />
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-3 py-2 rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/20 pt-6 text-center">
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} Promises & Pearls. All rights reserved. Crafted with passion for a connected future.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
