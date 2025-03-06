import { motion } from "framer-motion";
import { MessageCircle, Heart, Edit, Share2 } from "lucide-react";

const communityFeatures = [
  {
    icon: <MessageCircle size={32} className="text-purple-400" />,
    title: "Start Discussions",
    description: "Engage with thought-provoking topics and spark conversations with like-minded community members.",
  },
  {
    icon: <Edit size={32} className="text-rose-400" />,
    title: "Share Experiences",
    description: "Tell your story, share your insights, and inspire others with your personal experiences.",
  },
  {
    icon: <Heart size={32} className="text-yellow-400" />,
    title: "Like & React",
    description: "Show appreciation for posts and replies with our intuitive like and reaction system.",
  },
  {
    icon: <Share2 size={32} className="text-green-400" />,
    title: "Comment & Reply",
    description: "Join the conversation by commenting and replying, and build a network of vibrant discussions.",
  },
];

const Feature_3 = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg"
        >
          Build Your Community
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
        >
          Connect, collaborate, and converse. Our platform empowers you to start meaningful discussions, share your experiences, and interact through likes, comments, and replies—fueling a thriving community.
        </motion.p>

        {/* Community Feature Cards */}
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
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {communityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              className="bg-slate-800/70 border border-slate-700 rounded-2xl p-6 shadow-xl transition-transform transform hover:scale-105 hover:border-purple-500"
            >
              <div className="flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Feature_3;
