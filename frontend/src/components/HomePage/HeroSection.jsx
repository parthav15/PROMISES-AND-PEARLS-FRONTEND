import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  // Animation variants for text elements
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover brightness-75"
        src="https://www.w3schools.com/howto/rain.mp4" // Replace with your video URL
        autoPlay
        loop
        muted
      />

      {/* Dynamic Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 mix-blend-multiply" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-7xl font-extrabold bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg"
          >
            Discover Promises & Pearls
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200 drop-shadow-md"
          >
            Dive into a universe of inspiring events, creative collaborations, and memorable experiences that transform communities.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              to="/get-started"
              className="inline-block px-10 py-4 mt-4 text-lg font-semibold text-white bg-purple-600 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 ease-out"
            >
              Get Started
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center items-start p-1"
        >
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
