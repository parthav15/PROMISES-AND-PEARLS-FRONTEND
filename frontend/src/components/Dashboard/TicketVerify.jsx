import { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { motion, AnimatePresence } from 'framer-motion';
import { Scan, Upload, Ticket, Loader2, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { BASE_URL } from '../../config';

const TicketVerify = () => {
  const [scanMode, setScanMode] = useState('camera');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const scannerRef = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => {
    if (scanMode === 'camera') {
      scannerRef.current = new Html5QrcodeScanner(
        'qr-scanner',
        { fps: 10, qrbox: 250 },
        false
      );

      scannerRef.current.render(
        (decodedText) => handleScan(decodedText),
        (errorMessage) => console.log(errorMessage)
      );
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    };
  }, [scanMode]);

  const handleScan = async (ticketId) => {
    if (!ticketId) return;
    setLoading(true);
    setError(null);
    setPreviewImage(null);

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

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(file);

    try {
      const html5QrCode = new Html5Qrcode('qr-reader-temp');
      const qrCodeMessage = await html5QrCode.scanFile(file, false);
      handleScan(qrCodeMessage);
    } catch (err) {
      setError('Invalid QR code image');
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center gap-2 bg-white/5 px-6 py-3 rounded-full border border-white/20 mb-4"
        >
          <Ticket className="w-8 h-8 text-amber-400" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent">
            Ticket Verification
          </h2>
        </motion.div>
        <p className="text-purple-300">Scan or upload ticket QR code to verify authenticity</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Panel */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 shadow-2xl">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setScanMode('camera')}
              className={`flex-1 py-3 rounded-xl transition-all ${
                scanMode === 'camera'
                  ? 'bg-gradient-to-r from-amber-600/30 to-purple-600/30 border border-amber-400/30 text-amber-400'
                  : 'bg-white/5 hover:bg-white/10 text-gray-300'
              }`}
            >
              <Scan className="inline-block w-5 h-5 mr-2" />
              Camera Scan
            </button>
            <button
              onClick={() => setScanMode('upload')}
              className={`flex-1 py-3 rounded-xl transition-all ${
                scanMode === 'upload'
                  ? 'bg-gradient-to-r from-purple-600/30 to-amber-600/30 border border-purple-400/30 text-purple-400'
                  : 'bg-white/5 hover:bg-white/10 text-gray-300'
              }`}
            >
              <Upload className="inline-block w-5 h-5 mr-2" />
              Upload QR
            </button>
          </div>

          {/* Scanner/Upload Area */}
          <div className="relative aspect-square">
            {scanMode === 'camera' ? (
              <>
                <div
                  id="qr-scanner"
                  className="w-full h-full rounded-xl overflow-hidden bg-black/20 relative"
                >
                  {!scannerRef.current && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
                      <Loader2 className="w-12 h-12 text-amber-400 animate-spin" />
                      <p className="mt-4 text-purple-300">Initializing camera...</p>
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 pointer-events-none border-2 border-amber-400/30 rounded-xl shadow-lg" />
              </>
            ) : (
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="w-full h-full border-2 border-dashed border-white/20 rounded-xl cursor-pointer relative overflow-hidden group"
                onClick={() => fileRef.current.click()}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="QR Preview"
                    className="w-full h-full object-contain p-4"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8">
                    <Upload className="w-16 h-16 text-purple-400 mb-4" />
                    <p className="text-purple-300 text-center">
                      Click to upload QR code image
                    </p>
                    <p className="text-sm text-purple-400/70 mt-2">
                      Supported formats: PNG, JPG, JPEG
                    </p>
                  </div>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <Sparkles className="absolute top-2 right-2 w-5 h-5 text-amber-400 animate-pulse" />
              </motion.div>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 shadow-2xl">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <Loader2 className="w-12 h-12 text-amber-400 animate-spin mx-auto" />
                <p className="mt-4 text-purple-300">Verifying ticket...</p>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-400/20 rounded-full mb-4">
                  <XCircle className="w-12 h-12 text-red-400" />
                </div>
                <h3 className="text-xl text-red-400 mb-2">Verification Failed</h3>
                <p className="text-purple-300">{error}</p>
              </motion.div>
            ) : result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-400/20 rounded-full mb-4">
                    <CheckCircle2 className="w-12 h-12 text-green-400" />
                  </div>
                  <h3 className="text-xl text-green-400 mb-2">Ticket Verified</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-xl">
                    <h4 className="text-amber-400 mb-3 flex items-center gap-2">
                      <Ticket className="w-5 h-5" />
                      Event Details
                    </h4>
                    <div className="space-y-2 text-purple-300">
                      <p className="font-medium">{result.event.title}</p>
                      <p className="text-sm">{result.event.location}</p>
                      <p className="text-xs text-purple-400/70">
                        {result.event.start_date} - {result.event.end_date}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/5 p-4 rounded-xl">
                    <h4 className="text-amber-400 mb-3 flex items-center gap-2">
                      <Scan className="w-5 h-5" />
                      Attendee Info
                    </h4>
                    <div className="space-y-2 text-purple-300">
                      <p>{result.lead_user.first_name} {result.lead_user.last_name}</p>
                      <p className="text-sm">{result.lead_user.email}</p>
                      <p className="text-xs text-purple-400/70">
                        {result.ticket_quantity} ticket(s)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl">
                  <h4 className="text-amber-400 mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Ticket Status
                  </h4>
                  <div className="flex items-center justify-between text-purple-300">
                    <span>Booking Status:</span>
                    <span className="bg-green-400/20 px-3 py-1 rounded-full text-green-400 text-sm">
                      {result.booking_status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-400/20 rounded-full mb-4">
                  <Ticket className="w-12 h-12 text-purple-400" />
                </div>
                <p className="text-purple-300">Awaiting QR code scan or upload</p>
                <p className="text-sm text-purple-400/70 mt-2">
                  Verified tickets will appear here
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TicketVerify;