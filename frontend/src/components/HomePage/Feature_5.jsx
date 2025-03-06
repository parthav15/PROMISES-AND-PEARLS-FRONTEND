import { motion } from "framer-motion";
import { Calendar, CreditCard, UserPlus } from "lucide-react";

const features = [
  {
    icon: <Calendar size={40} className="text-rose-400" />,
    title: "Easy Event Booking",
    description:
      "Quickly browse and book events with our intuitive interface—planning your next experience has never been simpler.",
  },
  {
    icon: <CreditCard size={40} className="text-purple-400" />,
    title: "Secure Payments",
    description:
      "Seamlessly complete your transactions using Razorpay integration, ensuring a safe and hassle-free payment experience.",
  },
  {
    icon: <UserPlus size={40} className="text-yellow-400" />,
    title: "Organize Your Own Events",
    description:
      "Plan Public or Private events by contacting our Admin. Customize your event details and make your vision a reality.",
  },
];

const Feature_5 = () => {
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
          Core Functionalities
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
        >
          Our platform is designed to make event planning effortless. Whether you're booking an event, making secure payments via Razorpay, or organizing your own event by connecting with our admin, we've got you covered.
        </motion.p>

        {/* Feature Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.25 } },
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
              className="bg-slate-800/70 border border-slate-700 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Feature_5;
