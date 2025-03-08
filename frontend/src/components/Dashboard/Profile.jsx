import React, { useState } from 'react';
import { Gem, Sparkles, Lock, Mail } from 'lucide-react';
import { BASE_URL } from '../../config';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = ({ user }) => {
  const [profileData, setProfileData] = useState(user);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const { data } = await axios.post(`${BASE_URL}users/edit_user_details/`, new FormData(e.target), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data.success) {
      localStorage.setItem('user', JSON.stringify(data.user_details));
      setProfileData(data.user_details);
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const formData = new FormData();
      formData.append('profile_picture', file);

      const token = localStorage.getItem('token');
      const { data } = await axios.post(`${BASE_URL}users/edit_profile_picture/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user_details));
        setProfileData(data.user_details);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent">
        <Gem className="inline-block w-8 h-8 mr-2" />
        Profile Settings
      </h2>
      
      <div className="flex items-center gap-8">
        <div className="relative group group">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-slate-900 to-purple-900 p-1.5">
            <div className="w-full h-full bg-slate-900/20 rounded-full overflow-hidden relative">
              <img
                src={`${BASE_URL}media/${profileData.profile_picture}`}
                alt="Profile"
                className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
          </div>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleProfilePictureChange} 
            className="absolute inset-0 opacity-0 cursor-pointer" 
          />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-white">{profileData.name}</h3>
          <div className="flex items-center gap-2 text-purple-300">
            <Mail className="w-5 h-5 text-amber-400" />
            <span>{profileData.email}</span>
          </div>
          <div className="flex items-center gap-2 text-purple-300">
            <Gem className="w-5 h-5 text-amber-400" />
            <span>@{profileData.username}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleUpdateProfile} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {['first_name', 'last_name', 'username', 'phone_number'].map((field) => (
            <div key={field} className="relative">
              <input
                type="text"
                placeholder={field.replace('_', ' ').toUpperCase()}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-5 py-3 text-purple-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 placeholder-purple-300/50 transition-all"
                name={field}
                value={profileData[field]}
                onChange={(e) => setProfileData({...profileData, [field]: e.target.value})}
              />
              <Sparkles className="absolute right-4 top-3.5 w-5 h-5 text-amber-400/50" />
            </div>
          ))}
        </div>
        <button className="w-full bg-gradient-to-r from-amber-600 to-purple-600 text-white px-8 py-3.5 rounded-xl hover:from-amber-700 hover:to-purple-700 transition-all relative overflow-hidden">
          <Sparkles className="w-5 h-5 absolute left-6 top-3.5 animate-pulse" />
          Update Profile
          <Sparkles className="w-5 h-5 absolute right-6 top-3.5 animate-pulse" />
        </button>
      </form>
    </div>
  );
};

export default Profile;