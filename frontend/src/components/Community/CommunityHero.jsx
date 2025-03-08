import { motion } from "framer-motion";
import { Gem, Sparkles } from "lucide-react";

export default function CommunityHero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-br from-slate-900 to-purple-900 min-h-[60vh] flex items-center justify-center px-6 relative overflow-hidden"
    >
      {/* Floating Pearls Animation */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-amber-400 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 15px rgba(245, 158, 11, 0.3)'
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl text-center mt-20 relative z-10"
      >
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-amber-400/20 rounded-2xl">
            <Gem className="h-16 w-16 text-amber-400" strokeWidth={1.5} />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Welcome To The
          <br />
          <span className="bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent">
            Promises & Pearls
          </span>{" "}
          Circle
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto"
        >
          Join our exclusive community of luxury event curators and fine jewelry connoisseurs. 
          Experience unparalleled access to VIP events and bespoke collections.
        </motion.p>
      </motion.div>
    </motion.section>
  );
}