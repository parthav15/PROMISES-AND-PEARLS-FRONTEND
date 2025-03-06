import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactUs = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
            Contact Us
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We love hearing from you! Whether you have a question, feedback, or just want to say hello, our team is ready to assist you.
          </p>
        </motion.div>

        {/* Two Column Layout: Contact Form & Details */}
        <div className="flex flex-col md:flex-row gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="md:w-1/2 bg-slate-800/70 border border-slate-700 rounded-2xl p-8 shadow-xl"
          >
            <form className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  className="w-full p-3 rounded-lg bg-slate-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className="w-full p-3 rounded-lg bg-slate-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Your Message..."
                  className="w-full p-3 rounded-lg bg-slate-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                type="submit"
                className="w-full py-3 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition-all duration-300"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="md:w-1/2 flex flex-col justify-center text-gray-300 space-y-8 bg-slate-800/70 border border-slate-700 rounded-2xl p-8 shadow-xl"
          >
            <div className="flex items-center space-x-4">
              <Mail size={32} className="text-rose-400" />
              <div>
                <h3 className="text-xl font-bold">Email Us</h3>
                <p className="text-base">
                  We're always happy to help. If you have any questions or concerns, feel free to drop us an email. We'll get back to you as soon as possible.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Phone size={32} className="text-purple-400" />
              <div>
                <h3 className="text-xl font-bold">Call Us</h3>
                <p className="text-base">
                  Ready to talk? Call us at +1 (800) 123-4567 and a member of our team will be happy to assist you.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin size={32} className="text-yellow-400" />
              <div>
                <h3 className="text-xl font-bold">Visit Us</h3>
                <p className="text-base">
                  If you're in the area, feel free to stop by our office at 1234 Main Street, Anytown, USA. We'd love to say hello!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
