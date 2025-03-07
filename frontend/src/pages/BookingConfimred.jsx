import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../config';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';
import { 
  CheckCircle, Ticket, MapPin, Calendar, User, Download, 
  ArrowRight, Loader2, XCircle, QrCode 
} from 'lucide-react';
import Confetti from 'react-confetti';

const BookingConfirmed = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { bookingId, transactionId } = location.state || {};
    const [bookingDetails, setBookingDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                if (!bookingId) {
                    navigate('/events');
                    return;
                }

                const token = localStorage.getItem('token');
                const response = await axios.get(`${BASE_URL}bookings/get_booking_detail/`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { booking_id: bookingId }
                });

                if (response.data.success) {
                    setBookingDetails(response.data.data);
                }
                setLoading(false);
            } catch (err) {
                setError('Failed to load booking details');
                setLoading(false);
            }
        };

        fetchBookingDetails();
    }, [bookingId, navigate]);

    const handleDownloadTicket = (ticketPath, ticketId) => {
        const downloadLink = `${BASE_URL}${ticketPath}`;
        const link = document.createElement('a');
        link.href = downloadLink;
        link.setAttribute('download', `ticket_${ticketId}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-purple-400" />
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
            <div className="text-center">
                <XCircle className="h-16 w-16 text-rose-400 mx-auto mb-4" />
                <p className="text-xl text-white">{error}</p>
            </div>
        </div>
    );

    return (
        <>
            <Confetti recycle={false} numberOfPieces={400} />
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Celebration Header */}
                    <div className="text-center mb-12 mt-20 animate-bounce">
                        <CheckCircle className="h-24 w-24 text-emerald-400 mx-auto mb-6" />
                        <h1 className="text-4xl font-bold text-white mb-4">
                            Booking Confirmed! 🎉
                        </h1>
                        <p className="text-purple-200 text-lg">
                            Your tickets for {bookingDetails.event.title} are ready
                        </p>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-2 gap-8 mb-12">
                        {/* Event Details Card */}
                        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                                <Ticket className="text-purple-400" />
                                Event Details
                            </h2>

                            <div className="space-y-5">
                                <DetailItem 
                                    icon={<Calendar className="text-rose-400" />}
                                    label="Event Date"
                                    value={bookingDetails.event.start_date}
                                />
                                <DetailItem
                                    icon={<MapPin className="text-amber-400" />}
                                    label="Location"
                                    value={bookingDetails.event.location}
                                />
                                <DetailItem
                                    icon={<User className="text-emerald-400" />}
                                    label="Booked By"
                                    value={`${bookingDetails.lead_user.first_name} ${bookingDetails.lead_user.last_name}`}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <DetailItem
                                        label="Total Tickets"
                                        value={bookingDetails.ticket_quantity}
                                    />
                                    <DetailItem
                                        label="Total Amount"
                                        value={`₹${parseFloat(bookingDetails.total_price).toFixed(2)}`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Tickets & Download Section */}
                        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                                <Download className="text-purple-400" />
                                Your Tickets
                            </h2>

                            <div className="space-y-4">
                                {bookingDetails.tickets.map((ticket, index) => (
                                    <div key={ticket.id} className="group bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex-1">
                                                <h3 className="text-lg text-purple-300 mb-1">
                                                    Ticket #{index + 1}
                                                </h3>
                                                <p className="text-gray-300 text-sm mb-2">
                                                    Attendee: {ticket.attendee.firstName} {ticket.attendee.lastName}
                                                </p>
                                                {ticket.qr_code_url && (
                                                    <div className="flex items-center gap-2 text-sm text-amber-300">
                                                        <QrCode className="w-4 h-4" />
                                                        <span>QR Code Available</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <button 
                                                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm transition-colors"
                                                    onClick={() => handleDownloadTicket(ticket.ticket_path, ticket.ticket_id)}
                                                >
                                                    <Download className="w-4 h-4" />
                                                    Download PDF
                                                </button>
                                                {ticket.qr_code_url && (
                                                    <img 
                                                        src={`${BASE_URL}${ticket.qr_code_url}`} 
                                                        alt="QR Code"
                                                        className="w-20 h-20 rounded-lg border border-white/20"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Interactive Map Section */}
                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10">
                        <div className="p-8">
                            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                                <MapPin className="text-rose-400" />
                                Event Location
                            </h2>
                            <div className="h-96 w-full rounded-xl overflow-hidden">
                                <iframe
                                    className="w-full h-full"
                                    title="Event Location"
                                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDIIydfxdqoslmjtw_tdYjO4Fo4zRp1DwE&q=${bookingDetails.event.location}`}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Next Steps Card */}
                    <div className="mt-12 bg-emerald-500/10 backdrop-blur-lg rounded-2xl p-8 border border-emerald-500/30 text-center">
                        <h3 className="text-xl font-semibold text-emerald-400 mb-4">
                            What's Next?
                        </h3>
                        <p className="text-gray-200 mb-6">
                            We've sent your tickets to {bookingDetails.lead_user.email}.<br />
                            Add the event to your calendar and get ready for an amazing experience!
                        </p>
                        <div className="flex justify-center gap-4">
                            <button className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-white">
                                <Calendar className="w-5 h-5" />
                                Add to Calendar
                            </button>
                            <button 
                                className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white"
                                onClick={() => navigate('/events')}
                            >
                                <ArrowRight className="w-5 h-5" />
                                Explore More Events
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-start gap-4">
        {icon && <div className="mt-1">{icon}</div>}
        <div className="flex-1">
            <p className="text-sm text-purple-300">{label}</p>
            <p className="text-white">{value}</p>
        </div>
    </div>
);

export default BookingConfirmed;