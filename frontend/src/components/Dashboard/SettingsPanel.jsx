import React, { useState } from 'react';
import { Gem, Sparkles, Lock, Mail } from 'lucide-react';
import { BASE_URL } from '../../config';
import axios from 'axios';
import { toast } from 'react-toastify';

const SettingsPanel = () => {
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [emailData, setEmailData] = useState({
    current: '',
    new: ''
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmailData({ ...emailData, [name]: value });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm) {
      toast.error('New passwords do not match');
      return;
    }
    toast.success('Password updated successfully');
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    toast.success('Email updated successfully');
    setEmailData({ current: '', new: '' });
  };

  return (
    <div className="space-y-12">
      {/* Change Password Panel */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
          <Lock className="w-7 h-7 text-amber-400" />
          Security Settings
        </h3>
        <form onSubmit={handlePasswordSubmit} className="space-y-5">
          {['current', 'new', 'confirm'].map((field) => (
            <div key={field} className="relative">
              <input
                type="password"
                name={field}
                placeholder={`${field.replace(/([A-Z])/g, ' $1').toUpperCase()} PASSWORD`}
                value={passwordData[field]}
                onChange={handlePasswordChange}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-5 py-3.5 text-purple-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 placeholder-purple-300/50 transition-all"
                required
              />
              <Lock className="absolute right-5 top-3.5 w-5 h-5 text-amber-400/50" />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-600 to-purple-600 text-white px-8 py-3.5 rounded-xl hover:from-amber-700 hover:to-purple-700 transition-all relative overflow-hidden"
          >
            <Sparkles className="w-5 h-5 absolute left-6 top-3.5 animate-pulse" />
            Update Security
            <Sparkles className="w-5 h-5 absolute right-6 top-3.5 animate-pulse" />
          </button>
        </form>
      </div>

      {/* Change Email Panel */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
          <Mail className="w-7 h-7 text-amber-400" />
          Email Preferences
        </h3>
        <form onSubmit={handleEmailSubmit} className="space-y-5">
          {['current', 'new'].map((field) => (
            <div key={field} className="relative">
              <input
                type="email"
                name={field}
                placeholder={`${field.toUpperCase()} EMAIL`}
                value={emailData[field]}
                onChange={handleEmailChange}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-5 py-3.5 text-purple-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 placeholder-purple-300/50 transition-all"
                required
              />
              <Mail className="absolute right-5 top-3.5 w-5 h-5 text-amber-400/50" />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-600 to-purple-600 text-white px-8 py-3.5 rounded-xl hover:from-amber-700 hover:to-purple-700 transition-all relative overflow-hidden"
          >
            <Sparkles className="w-5 h-5 absolute left-6 top-3.5 animate-pulse" />
            Update Contact
            <Sparkles className="w-5 h-5 absolute right-6 top-3.5 animate-pulse" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPanel;