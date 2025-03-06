import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alice Johnson",
    feedback:
      "This platform changed the way I connect with others. Absolutely amazing experience!",
    rating: 5,
  },
  {
    name: "Mark Thompson",
    feedback:
      "A community that truly listens and evolves with your needs. Highly recommended!",
    rating: 5,
  },
  {
    name: "Sarah Williams",
    feedback:
      "Innovative and engaging. The user experience is top-notch and very intuitive.",
    rating: 4,
  },
  {
    name: "Emily Davis",
    feedback:
      "I've never felt so connected to a community before. Promises & Pearls is a game-changer!",
    rating: 5,
  },
  {
    name: "Michael Brown",
    feedback:
      "I was skeptical at first, but the community is so supportive and helpful. I'm hooked!",
    rating: 4,
  },
  {
    name: "Olivia Martin",
    feedback:
      "I've made so many new friends and connections through this platform. It's amazing!",
    rating: 5,
  },
];

const Feature_4 = () => {
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
          What Our Users Say
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
        >
          We value every piece of feedback from our users. Here’s what they have to say about their experience with Promises & Pearls.
        </motion.p>

        {/* Testimonial Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.3 },
            },
          }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              className="bg-slate-800/70 border border-slate-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">
                {/* Optional Avatar using initials */}
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {testimonial.name.charAt(0)}
                </div>
              </div>
              <p className="text-gray-300 italic mb-4">"{testimonial.feedback}"</p>
              <div className="flex justify-center items-center space-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400" />
                ))}
                {testimonial.rating < 5 &&
                  [...Array(5 - testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-gray-500" />
                  ))}
              </div>
              <p className="mt-4 text-white font-semibold">{testimonial.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Feature_4;

