import { useState, useRef, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import { motion } from 'framer-motion';
import { Scan, Upload, Ticket, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { BASE_URL } from '../../config';

const TicketVerify = () => {
  const [scanMode, setScanMode] = useState('camera');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileRef = useRef(null);

  const handleScan = async (ticketId) => {
    if (!ticketId) return;
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('ticket_id', ticketId);
      const response = await fetch(`${BASE_URL}bookings/verify_ticket/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.message || 'Ticket verification failed');
      }
    } catch (err) {
      setError('Failed to verify ticket. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const qr = await window.qrcode.decode(e.target.result);
        handleScan(qr);
      } catch (err) {
        setError('Invalid QR code format');
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent">
          <Ticket className="inline-block w-8 h-8 mr-2" />
          Ticket Verification
        </h2>
        <p className="text-purple-300 mt-2">Scan or upload ticket QR code for verification</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Scan Mode Selection */}
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setScanMode('camera')}
              className={`flex-1 py-2 rounded-xl transition-all ${
                scanMode === 'camera' 
                  ? 'bg-amber-500/20 border border-amber-400/30 text-amber-400'
                  : 'bg-white/5 hover:bg-white/10 text-gray-300'
              }`}
            >
              <Scan className="inline-block w-5 h-5 mr-2" />
              Camera Scan
            </button>
            <button
              onClick={() => setScanMode('upload')}
              className={`flex-1 py-2 rounded-xl transition-all ${
                scanMode === 'upload' 
                  ? 'bg-purple-500/20 border border-purple-400/30 text-purple-400'
                  : 'bg-white/5 hover:bg-white/10 text-gray-300'
              }`}
            >
              <Upload className="inline-block w-5 h-5 mr-2" />
              Upload QR
            </button>
          </div>

          {/* Scanner/Upload Area */}
          {scanMode === 'camera' ? (
            <div className="aspect-square bg-black/20 rounded-xl overflow-hidden">
              <QrReader
                constraints={{ facingMode: 'environment' }}
                onResult={(result) => {
                  if (result?.text) handleScan(result.text);
                }}
                className="w-full h-full"
                videoStyle={{ objectFit: 'cover' }}
              />
            </div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer"
              onClick={() => fileRef.current.click()}
            >
              <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <p className="text-purple-300">Click to upload QR code</p>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files[0])}
              />
            </motion.div>
          )}
        </div>

        {/* Results Display */}
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
          {loading ? (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 text-amber-400 animate-spin mx-auto" />
              <p className="mt-4 text-purple-300">Verifying ticket...</p>
            </div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl text-red-400 mb-2">Verification Failed</h3>
              <p className="text-purple-300">{error}</p>
            </motion.div>
          ) : result ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="text-center">
                <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl text-green-400 mb-2">Ticket Verified</h3>
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-xl">
                  <h4 className="text-amber-400 mb-2">Event Details</h4>
                  <p className="text-purple-300">{result.event.title}</p>
                  <p className="text-purple-300">{result.event.location}</p>
                  <p className="text-purple-300 text-sm">
                    {result.event.start_date} - {result.event.end_date}
                  </p>
                </div>

                <div className="bg-white/5 p-4 rounded-xl">
                  <h4 className="text-amber-400 mb-2">Attendee Information</h4>
                  <p className="text-purple-300">
                    {result.lead_user.first_name} {result.lead_user.last_name}
                  </p>
                  <p className="text-purple-300 text-sm">{result.lead_user.email}</p>
                  <p className="text-purple-300 mt-2">
                    Tickets: {result.ticket_quantity}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-8 text-purple-300">
              <Ticket className="w-12 h-12 mx-auto mb-4" />
              <p>Scan or upload a ticket QR code to verify</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketVerify;