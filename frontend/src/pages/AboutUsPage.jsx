import { motion } from 'framer-motion';
import { Sparkles, Ticket, Heart, Users, Gem } from 'lucide-react';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';

const AboutUs = () => {
  const teamMembers = [
    { name: 'Aarav Sharma', role: 'Creative Director', exp: '10+ years in luxury events' },
    { name: 'Priya Kapoor', role: 'Lead Designer', exp: 'Expert in thematic storytelling' },
    { name: 'Rohan Mehra', role: 'Client Relations', exp: '5-star hospitality background' },
    { name: 'Ananya Reddy', role: 'Master Jeweler', exp: '3rd generation craftsman' },
  ];

  const stats = [
    { number: '1K+', label: 'Events Curated' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '50+', label: 'Award Wins' },
    { number: '5M', label: 'Memories Created' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative py-28 px-6 text-center overflow-hidden"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-block mb-8"
          >
            <Sparkles className="h-24 w-24 text-amber-400 mx-auto animate-pulse" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent mb-6"
          >
            Crafting Unforgettable Moments
          </motion.h1>
          
          <motion.p
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="text-xl text-purple-200 max-w-3xl mx-auto mb-12"
          >
            At Promises & Pearls, we transform dreams into reality through exquisite event curation and bespoke jewelry design, creating timeless memories that glitter through generations.
          </motion.p>

          {/* Floating Pearls Animation */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: Math.random() * 100 - 50 + '%',
                  y: Math.random() * 100 - 50 + '%'
                }}
                animate={{
                  opacity: [0, 0.5, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                style={{
                  boxShadow: '0 0 15px rgba(245, 158, 11, 0.5)'
                }}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Craftsmanship Section */}
      <section className="py-20 px-6 bg-white/5 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ x: -50 }}
            whileInView={{ x: 0 }}
            className="space-y-6 relative"
          >
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-purple-500/20 rounded-full blur-xl" />
            <h2 className="text-3xl font-bold text-white mb-6">Our Artistry</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Every event and jewelry piece is a symphony of precision and passion. We blend traditional craftsmanship with modern innovation to create experiences that resonate with elegance and emotion.
            </p>
            <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl border border-white/10">
              <Gem className="h-12 w-12 text-amber-400" />
              <p className="text-gray-300">
                500+ hours of meticulous planning in every flagship event
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 50 }}
            whileInView={{ x: 0 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <div key={index} className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-amber-400/30 transition-colors">
                <div className="text-3xl font-bold text-amber-400 mb-2">{stat.number}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Master Craftsmen</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              A collective of visionaries, artisans, and perfectionists dedicated to exceeding your expectations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ y: 50 }}
                whileInView={{ y: 0 }}
                className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-amber-400/30 transition-all group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                <div className="h-48 w-full bg-amber-900/30 rounded-lg mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-purple-400 mb-2">{member.role}</p>
                <p className="text-gray-300 text-sm">{member.exp}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-white/5 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <Heart className="h-12 w-12 text-rose-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Our Promise</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-purple-400/30 transition-colors"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Uncompromised Quality</h3>
              <p className="text-gray-300">
                From venue selection to gemstone sourcing, we accept nothing less than perfection
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-amber-400/30 transition-colors"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Bespoke Experiences</h3>
              <p className="text-gray-300">
                Every detail tailored to reflect your unique story and personality
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-rose-400/30 transition-colors"
            >
              <h3 className="text-xl font-semibold text-white mb-4">End-to-End Excellence</h3>
              <p className="text-gray-300">
                Seamless execution from first consultation to final curtain call
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <Ticket className="h-12 w-12 text-amber-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Our Process</h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 h-full w-0.5 bg-gradient-to-b from-purple-500 to-amber-500" />
            {['Vision Casting', 'Design Alchemy', 'Precision Crafting', 'Grand Revelation'].map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center mb-16`}
              >
                <div className="w-1/2 p-6">
                  <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-amber-400 text-lg font-semibold mb-2">Phase 0{index + 1}</div>
                    <h3 className="text-xl text-white mb-2">{step}</h3>
                    <p className="text-gray-300">Detailed description of {step.toLowerCase()} phase...</p>
                  </div>
                </div>
                <div className="w-1/2 flex justify-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-amber-500 border-2 border-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
