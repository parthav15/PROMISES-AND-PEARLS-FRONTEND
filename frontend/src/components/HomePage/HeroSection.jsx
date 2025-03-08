import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, ChevronDown, Rocket } from 'lucide-react';
import video from '../../assets/firework_video.mp4';

const HeroSection = () => {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.3 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const floating = {
    float: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover brightness-75"
        src={video}
        autoPlay
        loop
        muted
      />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-purple-900/50 to-slate-900 mix-blend-multiply" />
      <div className="absolute inset-0 bg-radial-gradient from-purple-400/20 via-transparent to-transparent mix-blend-screen" />

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-400 rounded-full"
          initial={{ scale: 0, x: Math.random() * 100 + '%', y: Math.random() * 100 + '%' }}
          animate={{ scale: [0, 1, 0], opacity: [0, 0.4, 0] }}
          transition={{ duration: Math.random() * 4 + 3, repeat: Infinity }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <motion.div variants={fadeUp} className="relative inline-block">
            <Sparkles className="absolute -top-6 -right-8 w-12 h-12 text-amber-400 animate-pulse" />
            <h1 className="text-4xl md:text-7xl font-extrabold bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl">
              Craft Unforgettable Moments
            </h1>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="max-w-2xl mx-auto text-lg md:text-2xl text-purple-100 drop-shadow-lg font-medium"
          >
            Transform your vision into extraordinary events that resonate and inspire
          </motion.p>

          <motion.div variants={fadeUp} className="relative">
            <Link
              to="/get-started"
              className="inline-flex items-center gap-2 px-12 py-5 mt-4 text-xl font-bold text-white bg-gradient-to-br from-amber-500 to-purple-600 rounded-full shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 group"
            >
              <Rocket className="w-6 h-6 group-hover:animate-bounce" />
              Start Your Journey
              <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated Scroll Prompt */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-purple-200 animate-bounce" />
        <span className="text-purple-200 font-medium tracking-wider">Explore More</span>
      </motion.div>

      {/* Floating Highlights */}
      <motion.div 
        variants={floating}
        animate="float"
        className="absolute top-1/4 left-1/4 w-24 h-24 bg-purple-400/20 rounded-full blur-xl"
      />
      <motion.div 
        variants={floating}
        animate="float"
        className="absolute top-1/3 right-1/4 w-32 h-32 bg-amber-400/20 rounded-full blur-xl"
        style={{ y: 0 }}
      />
    </section>
  );
};

export default HeroSection;