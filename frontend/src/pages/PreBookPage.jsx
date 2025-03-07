import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';
import { Loader2, Ticket, ArrowRight, User, Mail, Phone, MapPin, Calendar, CreditCard } from 'lucide-react';
import { BASE_URL } from '../config';

const PreBookPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const eventId = location.state?.eventId;
    const [ticketQuantity, setTicketQuantity] = useState(1);
    const [userDetails, setUserDetails] = useState([{
        firstName: '', lastName: '', email: '', 
        phone: '', address1: '', address2: '', 
        state: '', pincode: ''
    }]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [eventDetails, setEventDetails] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(
                    `${BASE_URL}events/get_specific_public_event/?event_id=${eventId}`
                );
                response.data.success && setEventDetails(response.data.data);
            } catch (err) {
                setError('Failed to load event details');
            }
        };

        eventId ? fetchEventDetails() : navigate('/events');
    }, [eventId, navigate]);

    useEffect(() => {
        const newDetails = Array(ticketQuantity).fill().map((_, i) => 
            userDetails[i] || { 
                firstName: '', lastName: '', email: '', 
                phone: '', address1: '', address2: '', 
                state: '', pincode: '' 
            }
        );
        setUserDetails(newDetails);
    }, [ticketQuantity]);

    const handleDetailChange = (index, field, value) => {
        const updatedDetails = userDetails.map((detail, i) => 
            i === index ? { ...detail, [field]: value } : detail
        );
        setUserDetails(updatedDetails);
    };

    const validateDetails = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/;
        const pincodeRegex = /^\d{6}$/;

        for (let i = 0; i < userDetails.length; i++) {
            const detail = userDetails[i];
            if (!detail.firstName.trim() || !detail.lastName.trim() || 
                !detail.email || !detail.phone || !detail.address1 || 
                !detail.state || !detail.pincode) {
                setError(`All fields are required for attendee ${i + 1}`);
                return false;
            }
            if (!emailRegex.test(detail.email)) {
                setError(`Invalid email format for attendee ${i + 1}`);
                return false;
            }
            if (!phoneRegex.test(detail.phone)) {
                setError(`Invalid phone number (10 digits) for attendee ${i + 1}`);
                return false;
            }
            if (!pincodeRegex.test(detail.pincode)) {
                setError(`Invalid pincode (6 digits) for attendee ${i + 1}`);
                return false;
            }
        }
        return true;
    };

    const handleBooking = async () => {
        if (!validateDetails()) return;
        
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login-register', { state: { from: location.pathname } });
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                `${BASE_URL}bookings/create_booking/`,
                {
                    event_id: eventId,
                    ticket_quantity: ticketQuantity,
                    user_details: userDetails
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            response.data.success && navigate('/payment', { 
                state: { bookingId: response.data.data.id } 
            });
        } catch (error) {
            setError(error.response?.data?.message || 'Booking creation failed');
        } finally {
            setLoading(false);
        }
    };

    if (!eventDetails) return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-purple-400" />
        </div>
    );

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 md:py-25">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="text-4xl font-bold text-white mb-8 md:mb-12 text-center">Complete Your Reservation</h1>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                            <h2 className="text-2xl font-semibold text-white mb-6">Event Details</h2>
                            <div className="space-y-4">
                                <DetailItem icon={<Ticket className="text-purple-400" />} 
                                    label="Event" value={eventDetails.title} />
                                <DetailItem icon={<Calendar className="text-rose-400" />}
                                    label="Date" value={new Date(eventDetails.start_date).toLocaleDateString()} />
                                <DetailItem icon={<MapPin className="text-amber-400" />}
                                    label="Location" value={eventDetails.location} />
                                <DetailItem icon={<CreditCard className="text-emerald-400" />}
                                    label="Price per ticket" value={`₹${eventDetails.event_price}`} />
                            </div>
                            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                            <div className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10">
                                <h3 className="text-2xl font-semibold text-white p-8">Event Location</h3>
                                <div className="h-96 w-full">
                                    <iframe
                                        className="w-full h-full"
                                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDIIydfxdqoslmjtw_tdYjO4Fo4zRp1DwE&q=${eventDetails.location}`}
                                    />
                                </div>
                            </div>
                        </section>
                        </div>

                        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-semibold text-white">Attendee Details</h2>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                                        className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                                        -
                                    </button>
                                    <span className="text-white w-8 text-center">{ticketQuantity}</span>
                                    <button
                                        onClick={() => setTicketQuantity(ticketQuantity + 1)}
                                        className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {userDetails.map((detail, index) => (
                                    <div key={index} className="border-b border-white/10 pb-6 last:border-0">
                                        <h3 className="text-lg text-purple-300 mb-4">Attendee {index + 1}</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <InputField
                                                label="First Name"
                                                value={detail.firstName}
                                                onChange={(e) => handleDetailChange(index, 'firstName', e.target.value)}
                                                icon={<User className="text-purple-400" />}
                                            />
                                            <InputField
                                                label="Last Name"
                                                value={detail.lastName}
                                                onChange={(e) => handleDetailChange(index, 'lastName', e.target.value)}
                                            />
                                            <InputField
                                                label="Email"
                                                type="email"
                                                value={detail.email}
                                                onChange={(e) => handleDetailChange(index, 'email', e.target.value)}
                                                icon={<Mail className="text-rose-400" />}
                                                className="col-span-2"
                                            />
                                            <InputField
                                                label="Phone"
                                                type="tel"
                                                value={detail.phone}
                                                onChange={(e) => handleDetailChange(index, 'phone', e.target.value)}
                                                icon={<Phone className="text-amber-400" />}
                                                className="col-span-2"
                                            />
                                            <InputField
                                                label="Address Line 1"
                                                value={detail.address1}
                                                onChange={(e) => handleDetailChange(index, 'address1', e.target.value)}
                                                className="col-span-2"
                                            />
                                            <InputField
                                                label="Address Line 2"
                                                value={detail.address2}
                                                onChange={(e) => handleDetailChange(index, 'address2', e.target.value)}
                                                className="col-span-2"
                                            />
                                            <InputField
                                                label="State"
                                                value={detail.state}
                                                onChange={(e) => handleDetailChange(index, 'state', e.target.value)}
                                            />
                                            <InputField
                                                label="Pincode"
                                                type="number"
                                                value={detail.pincode}
                                                onChange={(e) => handleDetailChange(index, 'pincode', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                ))}

                                {error && (
                                    <div className="flex items-center gap-2 text-rose-400">
                                        <XCircle className="w-5 h-5" />
                                        <span>{error}</span>
                                    </div>
                                )}

                                <button
                                    onClick={handleBooking}
                                    disabled={loading}
                                    className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 rounded-xl text-white font-semibold transition-all disabled:opacity-50">
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Ticket className="w-5 h-5" />
                                            Proceed to Payment
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-center gap-3 text-gray-300">
        {icon}
        <div className="flex-1">
            <span className="block text-sm">{label}</span>
            <span className="block text-white">{value}</span>
        </div>
    </div>
);

const InputField = ({ label, icon, type = 'text', value, onChange, className = '' }) => (
    <div className={`relative ${className}`}>
        <label className="block text-sm text-gray-300 mb-1">{label}</label>
        <div className="relative">
            {icon && <div className="absolute left-3 top-3 text-purple-400">{icon}</div>}
            <input
                type={type}
                value={value}
                onChange={onChange}
                className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-gray-200 focus:outline-none focus:border-purple-400 ${icon ? 'pl-10' : ''}`}
            />
        </div>
    </div>
);

export default PreBookPage;