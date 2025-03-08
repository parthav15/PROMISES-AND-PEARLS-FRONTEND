import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';
import { Gem, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

const ContactusPage = () => {
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login-register');
      }
    }, [navigate]);
    
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill out all fields!');
      return;
    }

    console.log('Contact form submitted:', formData);
    toast.success('Your message has been received!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const infoVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      <Navbar />

      <div className="my-12" />

      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
        toastStyle={{ backgroundColor: '#1e293b' }}
      />

      <div className="flex-grow flex flex-col lg:flex-row items-center justify-center p-8 space-y-8 lg:space-y-0 lg:space-x-12">
        {/* Contact Form */}
        <motion.div
          className="w-full lg:w-1/2 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 relative overflow-hidden"
          variants={formVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-400/20 rounded-full blur-3xl" />
          <div className="text-center mb-8">
            <div className="inline-block p-4 mb-4 bg-amber-400/20 rounded-2xl">
              <Gem className="h-12 w-12 text-amber-400 mx-auto" strokeWidth={1.5} />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent">
              Enquire About Excellence
            </h2>
            <p className="mt-2 text-purple-200">
              Let's create unforgettable moments together
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-purple-300 mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Elizabeth Windsor"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 text-white placeholder-purple-300/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-purple-300 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="elizabeth@royal.uk"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 text-white placeholder-purple-300/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-purple-300 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Regarding Your Grand Event"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 text-white placeholder-purple-300/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-purple-300 mb-2">Message</label>
                <textarea
                  name="message"
                  placeholder="Describe your vision of perfection..."
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 text-white placeholder-purple-300/50 resize-none transition-all"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-purple-600 text-white rounded-lg font-semibold hover:from-amber-600 hover:to-purple-700 transition-all relative overflow-hidden"
            >
              <Sparkles className="w-5 h-5 absolute top-2 left-4 animate-pulse" />
              Send Enquiry
              <Sparkles className="w-5 h-5 absolute top-2 right-4 animate-pulse" />
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          className="w-full lg:w-1/2 space-y-6"
          variants={infoVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 group relative overflow-hidden">
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-amber-400" />
              Global Ateliers
            </h3>
            <div className="space-y-3 text-purple-200">
              <p>16 Place Vendôme, 75001 Paris</p>
              <p>5th Avenue, New York, NY 10018</p>
              <p>Jewelers Lane, Jaipur 302001</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 group relative overflow-hidden">
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-amber-400/20 rounded-full blur-3xl" />
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Phone className="w-6 h-6 text-amber-400" />
              Concierge Services
            </h3>
            <div className="space-y-2 text-purple-200">
              <p>VIP Line: +33 1 40 20 90 90</p>
              <p>WhatsApp: +1 (212) 555-0199</p>
              <p>Fax: +91 141 123 4567</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 group relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Mail className="w-6 h-6 text-amber-400" />
              Correspondence
            </h3>
            <div className="space-y-2 text-purple-200">
              <p>Enquiries: pearl@promises.co</p>
              <p>Events: moments@promises.co</p>
              <p>Mon-Sun: 24/7 Availability</p>
              <p>By Appointment Only</p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactusPage;