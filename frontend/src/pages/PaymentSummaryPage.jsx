import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { BASE_URL } from '../config';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';

const PaymentSummaryPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const bookingId = location.state?.bookingId;
    const [bookingDetails, setBookingDetails] = useState(null);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: ''
    });
    const [errors, setErrors] = useState({});
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [paymentError, setPaymentError] = useState('');
    const [priceDetails, setPriceDetails] = useState({
        amount: 0,
        gst: 0,
        otherCharges: 50,
        total: 0
    });

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token || !bookingId) {
                    navigate('/events');
                    return;
                }

                const response = await axios.get(`${BASE_URL}bookings/get_booking_detail/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params: {
                        booking_id: bookingId
                    }
                });

                if (response.data.success) {
                    setBookingDetails(response.data.data);
                }
            } catch (error) {
                setError('Failed to load booking details');
            }
        };

        fetchBookingDetails();
    }, [bookingId, navigate]);

    useEffect(() => {
        if (!bookingDetails) return;

        const amount = parseFloat(bookingDetails.total_price);
        const gst = amount * 0.18;
        setPriceDetails({
            amount,
            gst,
            otherCharges: 50,
            total: amount + gst + 50
        });
    }, [bookingDetails]);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {

            document.body.removeChild(script);
        };
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = 'Invalid phone number';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        if (!termsAccepted) {
            setPaymentError('You must accept the terms & conditions');
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('booking_id', bookingDetails.id);

            const orderResponse = await axios.post(`${BASE_URL}payments/create_order/`, formData, {
                headers: {
                }
            });

            const { order_id, amount, currency, payment_id } = orderResponse.data;

            const options = {
                key: "rzp_test_ew74Ktx27rLLPC",
                amount,
                currency,
                name: 'Promises & Pearls',
                description: `Booking for ${bookingDetails.event_title}`,
                order_id,
                payment_id,
                handler: async (response) => {
                    try {
                        const verificationFormData = new FormData();
                        verificationFormData.append('razorpay_payment_id', response.razorpay_payment_id);
                        verificationFormData.append('razorpay_order_id', response.razorpay_order_id);
                        verificationFormData.append('razorpay_signature', response.razorpay_signature);

                        const verificationResponse = await axios.post(`${BASE_URL}payments/verify_order/`, verificationFormData, {
                            headers: {
                            }
                        });

                        setLoading(false);

                        if (verificationResponse.data.success) {
                            navigate('/booking-confirmed', {
                                state: {
                                    bookingId: bookingDetails.id,
                                    transactionId: verificationResponse.data.transaction_id
                                }
                            });
                        }
                    } catch (error) {
                        console.error('Payment verification failed:', error);
                        setPaymentError('Payment verification failed. Please contact support.');
                    }
                },
                prefill: {
                    name: `${formData.firstName} ${formData.lastName}`,
                    contact: formData.phone,
                    email: formData.email
                },
                theme: {
                    color: '#6366f1'
                }
            };

            const razorpay = new Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error('Payment processing failed:', error);
            setPaymentError(error.response?.data?.message || 'Payment processing failed');
            setLoading(false);
        }
    };

    if (!bookingDetails) return null;

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 pt-24 pb-24">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-white mb-8">Complete Your Booking</h1>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* User Details Form */}
                        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                            <h2 className="text-2xl font-semibold text-white mb-6">Your Details</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-300 mb-2">First Name</label>
                                        <input
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:border-purple-400"
                                        />
                                        {errors.firstName && <p className="text-rose-400 text-sm mt-1">{errors.firstName}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-gray-300 mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:border-purple-400"
                                        />
                                        {errors.lastName && <p className="text-rose-400 text-sm mt-1">{errors.lastName}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-300 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:border-purple-400"
                                    />
                                    {errors.email && <p className="text-rose-400 text-sm mt-1">{errors.email}</p>}
                                </div>


                                <div>
                                    <label className="block text-gray-300 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:border-purple-400"
                                    />
                                    {errors.phone && <p className="text-rose-400 text-sm mt-1">{errors.phone}</p>}
                                </div>

                                <div>
                                    <label className="block text-gray-300 mb-2">Address</label>
                                    <textarea
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:border-purple-400 h-32"
                                    />
                                    {errors.address && <p className="text-rose-400 text-sm mt-1">{errors.address}</p>}
                                </div>

                                <div className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        checked={termsAccepted}
                                        onChange={(e) => setTermsAccepted(e.target.checked)}
                                        className="w-5 h-5 text-purple-500 rounded focus:ring-purple-400"
                                    />
                                    <span className="text-gray-300">
                                        I agree to the{' '}
                                        <a href="/terms" className="text-purple-400 hover:underline">
                                            Terms & Conditions
                                        </a>
                                    </span>
                                </div>
                            </form>
                        </div>

                        {/* Payment Summary */}
                        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 h-fit">
                            <h2 className="text-2xl font-semibold text-white mb-6">Payment Summary</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-300">
                                    <span>Event Price</span>
                                    <span>₹{priceDetails.amount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-300">
                                    <span>GST (18%)</span>
                                    <span>₹{priceDetails.gst.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-300">
                                    <span>Processing Fee</span>
                                    <span>₹{priceDetails.otherCharges.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-white/20 pt-4 flex justify-between text-lg font-semibold text-white">
                                    <span>Total</span>
                                    <span>₹{priceDetails.total.toFixed(2)}</span>
                                </div>
                            </div>

                            {paymentError && (
                                <div className="flex items-center gap-2 text-rose-400 mb-4">
                                    <XCircle className="w-5 h-5" />
                                    <span>{paymentError}</span>
                                </div>
                            )}

                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 rounded-xl text-white font-semibold transition-all disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    'Proceed to Payment'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PaymentSummaryPage;