import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { 
  Facebook, Twitter, Linkedin, Instagram, 
  Mail, Phone, Calendar, MapPin, 
  CreditCard, User, Ticket, ArrowRight, Link2
} from "lucide-react";
import { BASE_URL } from "../../config";

const EventDetail = () => {
  const location = useLocation();
  const eventId = location.state?.eventId;
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        if (!eventId) throw new Error("No event ID provided.");
        const response = await axios.get(
          `${BASE_URL}events/get_specific_public_event/?event_id=${eventId}`
        );
        if (!response.data.success) throw new Error(response.data.message);
        setEventData(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (loading) return <LoadingSpinner />;
  if (error || !eventData) return <ErrorDisplay error={error} />;
  const {
    id,
    title,
    description,
    event_type,
    start_date,
    end_date,
    event_price,
    max_attendees,
    organizer,
    images,
    videos,
  } = eventData;
  const mediaItems = [
    ...images.map((image) => `${BASE_URL}${image.url}`),
    ...videos.map((video) => `${BASE_URL}${video.url}`),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mt-20 grid lg:grid-cols-2 gap-8">
            {/* Media Carousel */}
            <div className="relative group rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-rose-500/20 z-10" />
              <Carousel
                showThumbs={false}
                autoPlay
                infiniteLoop
                interval={5000}
                showStatus={false}
                className="rounded-3xl"
              >
                {mediaItems.map((media, index) => (
                  <MediaItem key={index} media={media} title={eventData.title} />
                ))}
              </Carousel>
            </div>

            {/* Event Header & Pricing */}
            <div className="flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl font-bold text-white">{eventData.title}</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-purple-200">
                    <User className="w-6 h-6" />
                    <span className="text-xl">
                      {eventData.organizer.first_name} {eventData.organizer.last_name}
                    </span>
                  </div>
                  <div className="h-6 w-px bg-white/20" />
                  <div className="flex items-center space-x-2 text-rose-200">
                    <Ticket className="w-6 h-6" />
                    <span className="text-xl">{eventData.tickets_available} Tickets Left</span>
                  </div>
                </div>
              </div>

              {/* Pricing Card */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 transform transition hover:scale-[1.01]">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-2xl text-gray-300 mb-2">Starting at</div>
                    <div className="flex items-baseline space-x-3">
                      <span className="text-6xl font-bold bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent">
                        {new Intl.NumberFormat('en-IN').format(eventData.event_price)} Rs
                      </span>
                      <span className="text-gray-400">/ person</span>
                    </div>
                  </div>
                  <Link 
                    to="/pre-book" 
                    state={{ eventId: id }}
                    className="group relative px-8 py-4 bg-gradient-to-r from-rose-500 to-purple-500 rounded-xl flex items-center space-x-2 hover:from-rose-600 hover:to-purple-600 transition-all"
                  >
                    <span className="text-white font-semibold text-lg">Book Now</span>
                    <ArrowRight className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 shadow-lg shadow-rose-500/30 rounded-xl" />
                  </Link>
                </div>
                <div className="mt-4 flex items-center space-x-2 text-sm text-gray-400">
                  <CreditCard className="w-4 h-4" />
                  <span>Secure payment with RazorPay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Social Sharing Card */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-semibold text-white mb-6">Share the Experience</h3>
            <div className="grid grid-cols-3 gap-4">
              <SocialIcon platform="Facebook" icon={<Facebook />} color="#1877F2" />
              <SocialIcon platform="Twitter" icon={<Twitter />} color="#1DA1F2" />
              <SocialIcon platform="Instagram" icon={<Instagram />} color="#E1306C" />
              <SocialIcon platform="LinkedIn" icon={<Linkedin />} color="#0A66C2" />
              <SocialIcon platform="Email" icon={<Mail />} color="#EA4335" />
              <SocialIcon platform="Copy Link" icon={<Link2 />} color="#8B5CF6" />
            </div>
          </div>

          {/* Event Details Card */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 space-y-8">
            <DetailItem icon={<Calendar className="text-purple-400" />}
              title="Date & Time"
              content={`${new Date(eventData.start_date).toLocaleString()} - ${new Date(eventData.end_date).toLocaleString()}`}
            />
            
            <DetailItem icon={<MapPin className="text-rose-400" />}
              title="Location"
              content={eventData.location}
              extra={<MiniMap location={eventData.location} />}
            />

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-white">About the Event</h4>
              <p className="text-gray-300 leading-relaxed">
                {eventData.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Full-width Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10">
          <h3 className="text-2xl font-semibold text-white p-8">Event Location</h3>
          <div className="h-96 w-full">
            <iframe
              className="w-full h-full"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDIIydfxdqoslmjtw_tdYjO4Fo4zRp1DwE&q=${eventData.location}`}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper Components
const MediaItem = ({ media, title }) => {
  if (media.match(/\.(mp4|webm)$/i)) {
    return (
      <video autoPlay loop muted className="aspect-video object-cover">
        <source src={media} type="video/mp4" />
      </video>
    );
  }
  return <img src={media} alt={title} className="aspect-video object-cover" />;
};

const SocialIcon = ({ platform, icon, color }) => (
  <button className={`flex flex-col items-center p-4 rounded-xl hover:bg-white/5 transition-all`}
    style={{ border: `1px solid ${color}20` }}>
    <div className="mb-2" style={{ color }}>{icon}</div>
    <span className="text-sm" style={{ color }}>{platform}</span>
  </button>
);

const DetailItem = ({ icon, title, content, extra }) => (
  <div className="border-b border-white/10 pb-6 last:border-0">
    <div className="flex items-start space-x-4">
      <div className="pt-1">{icon}</div>
      <div className="flex-1">
        <h4 className="text-lg font-medium text-white mb-2">{title}</h4>
        <p className="text-gray-300">{content}</p>
        {extra && <div className="mt-4">{extra}</div>}
      </div>
    </div>
  </div>
);

const MiniMap = ({ location }) => (
  <div className="mt-4 h-32 rounded-lg overflow-hidden">
    <iframe
      className="w-full h-full"
      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDIIydfxdqoslmjtw_tdYjO4Fo4zRp1DwE&q=${location}&zoom=15`}
    />
  </div>
);

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent" />
  </div>
);

const ErrorDisplay = ({ error }) => (
  <div className="min-h-screen flex items-center justify-center text-red-400 text-xl">
    ⚠️ {error || "Failed to load event details"}
  </div>
);

export default EventDetail;