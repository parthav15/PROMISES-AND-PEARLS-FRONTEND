import { motion } from "framer-motion";

const Feature_1 = () => {
  // Animation variants for container and its children
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -40 },
    show: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 40 },
    show: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between relative z-10"
        >
          {/* Left Column: Detailed Description */}
          <motion.div
            variants={slideInLeft}
            className="md:w-1/2 text-gray-200 space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold drop-shadow-lg">
              Innovating the Future of Connection
            </h2>
            <p className="text-base md:text-lg leading-relaxed drop-shadow-sm">
              Promises & Pearls is a dynamic platform where creativity meets technology.
              We empower communities to share innovative ideas and create memorable experiences.
              Explore events, collaboration, and inspiration designed to bring people closer.
            </p>
            <p className="text-base md:text-lg leading-relaxed drop-shadow-sm">
              Our mission is to foster a vibrant ecosystem that celebrates diversity,
              creativity, and the beauty of shared experiences. Join us on a journey that
              redefines digital connection and transforms everyday moments into timeless stories.
            </p>
          </motion.div>

          {/* Right Column: Project Name and Accent Content */}
          <motion.div
            variants={slideInRight}
            className="md:w-1/2 mt-10 md:mt-0 flex flex-col items-center"
          >
            <div className="flex items-center space-x-2">
              <motion.h1
                whileHover={{ scale: 1.05 }}
                className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent drop-shadow-md"
              >
                Promises & Pearls
              </motion.h1>
              <span className="text-3xl md:text-4xl">✨</span>
            </div>
            <motion.div
              className="mt-6 max-w-md text-center text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <p>
                Where every promise shines and every pearl tells a story. Experience the
                fusion of innovation and tradition, crafted to inspire and empower your digital journey.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Feature_1;
