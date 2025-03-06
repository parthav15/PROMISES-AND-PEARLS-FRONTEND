import { motion } from "framer-motion";
import { CheckCircle, ShieldCheck, Sparkles, Users, Timer, Globe } from "lucide-react";

const features = [
  {
    icon: <CheckCircle size={40} className="text-purple-400" />,
    title: "Unmatched Quality",
    description: "We ensure top-tier experiences with a seamless and premium approach to every interaction.",
  },
  {
    icon: <ShieldCheck size={40} className="text-blue-400" />,
    title: "Secure & Reliable",
    description: "Your data and privacy are our priority. We implement robust security measures to keep you safe.",
  },
  {
    icon: <Sparkles size={40} className="text-rose-400" />,
    title: "Innovative Approach",
    description: "Our cutting-edge solutions blend technology and creativity to bring unique experiences.",
  },
  {
    icon: <Users size={40} className="text-green-400" />,
    title: "Community-Driven",
    description: "We thrive on collaboration and inclusivity, fostering a vibrant, connected community.",
  },
  {
    icon: <Timer size={40} className="text-yellow-400" />,
    title: "Fast & Efficient",
    description: "We value your time, offering lightning-fast services without compromising quality.",
  },
  {
    icon: <Globe size={40} className="text-cyan-400" />,
    title: "Global Reach",
    description: "Connecting people across borders, we make interactions meaningful and impactful.",
  },
];

const Feature_2 = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg"
        >
          Why Customers Choose Us? ✨
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
        >
          We are committed to delivering exceptional experiences that empower and inspire. 
          Here's what sets us apart from the rest.
        </motion.p>

        {/* Feature Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              className="relative bg-slate-800/70 border border-slate-700 shadow-xl rounded-2xl p-6 transition-transform transform hover:scale-105 hover:border-purple-500"
            >
              <div className="flex items-center space-x-4">
                {feature.icon}
                <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
              </div>
              <p className="mt-3 text-gray-300 text-md">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Feature_2;
