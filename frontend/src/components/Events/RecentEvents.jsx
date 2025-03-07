import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, CreditCard } from 'lucide-react';
import { BASE_URL } from '../../config';
import { useNavigate } from 'react-router-dom';

const RecentEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}events/get_public_events/`);
        const result = await response.json();
        if (response.ok && result.success) {
          setEvents(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch events.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-300">
        <p>Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center text-red-400">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent text-center drop-shadow-lg"
        >
          Recent Public Events
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-4 text-center max-w-2xl mx-auto text-lg text-gray-300"
        >
          Discover our latest events and join the experience. Browse through a curated list of public events designed to inspire and engage.
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {events.map((event) => (
            <motion.div
              key={event.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
              }}
              className="bg-slate-800/70 border border-slate-700 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
              onClick={() => navigate('/event_detail', { state: { eventId: event.id } })}
            >
              {/* Event Image */}
              {event.images && event.images.length > 0 ? (
                <img src={`${BASE_URL}${event.images[0].url}`} alt={event.title} className="w-full h-48 object-cover" />
              ) : (
                <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
                  <span className="text-white">No Image</span>
                </div>
              )}

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-white">{event.title}</h3>
                <div className="flex items-center gap-2 text-sm mb-2">
                  <Calendar size={16} className="text-purple-400" />
                  <span className="text-white">{new Date(event.start_date).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm mb-4">
                  <MapPin size={16} className="text-rose-400" />
                  <span className="text-white">{event.location}</span>
                </div>
                <p className="text-white text-sm mb-4 line-clamp-1">{event.description}</p>
                <div className="flex items-center gap-2 text-sm">
                  <CreditCard size={16} className="text-yellow-400" />
                  <span className="text-white">INR {event.event_price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RecentEvents;

