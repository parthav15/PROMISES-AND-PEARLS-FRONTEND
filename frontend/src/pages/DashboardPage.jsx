import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MessageSquare, AlertCircle, Settings, LogOut, Gem, Sparkles, Stars, Ticket } from 'lucide-react';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';
import Profile from '../components/Dashboard/Profile';
import CommunityPosts from '../components/Dashboard/CommunityPosts';
import SubmittedFeedbacks from '../components/Dashboard/SubmittedFeedbacks';
import TicketVerify from '../components/Dashboard/TicketVerify';
import SettingsPanel from '../components/Dashboard/SettingsPanel';
import { BASE_URL } from '../config';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const userString = localStorage.getItem('user');
  const userObj = JSON.parse(userString);
  const [profileData, setProfileData] = useState(userObj);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login-register';
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'profile': return <Profile user={profileData} />;
      case 'posts': return <CommunityPosts />;
      case 'feedbacks': return <SubmittedFeedbacks />;
      case 'verify': return <TicketVerify />;
      case 'settings': return <SettingsPanel />;
      default: return <Profile user={profileData} />;
    }
  };

  const navItems = [
    { id: 'profile', icon: <User size={20} />, label: 'Profile' },
    { id: 'posts', icon: <MessageSquare size={20} />, label: 'Community Posts' },
    { id: 'feedbacks', icon: <AlertCircle size={20} />, label: 'My Feedbacks' },
    { id: 'verify', icon: <Ticket size={20} />, label: 'Ticket Verification' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Account Settings' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 flex flex-col">
      <Navbar />
      
      {/* Floating Particles Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400 rounded-full"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              scale: 0
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Grid Layout Container */}
      <div className="mt-20 grid grid-cols-[auto_1fr] flex-1 relative z-10">
        {/* Stellar Sidebar */}
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          className="w-72 bg-slate-900/80 backdrop-blur-xl border-r border-white/10 h-[calc(100vh-5rem)] sticky top-20 overflow-y-auto shadow-2xl"
        >
          <div className="p-6">
            {/* Profile Card */}
            <motion.div 
              className="group relative mb-8"
              whileHover="hover"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/30 to-purple-400/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity" />
              <div className="relative flex items-center gap-4 p-4 bg-slate-800/50 rounded-2xl border border-white/10 hover:border-amber-400/30 transition-colors">
                <div className="relative">
                  <motion.img
                    src={`${BASE_URL}media/${profileData.profile_picture}`}
                    alt="Profile"
                    className="w-14 h-14 rounded-full object-cover border-2 border-amber-400/30 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                  />
                  <motion.div 
                    className="absolute -bottom-2 -right-2 bg-gradient-to-br from-amber-400 to-purple-400 p-1 rounded-full"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <Stars className="h-5 w-5 text-white" fill="currentColor" />
                  </motion.div>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">{profileData.first_name} {profileData.last_name}</h3>
                  <p className="text-sm text-purple-300">{profileData.email}</p>
                </div>
              </div>
            </motion.div>

            {/* Navigation */}
            <nav className="space-y-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative overflow-hidden group ${
                    activeTab === item.id 
                      ? 'bg-gradient-to-r from-amber-600/30 to-purple-600/30 text-amber-400 border border-amber-400/30'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <span className={`transition-colors ${activeTab === item.id ? 'text-amber-400' : 'text-purple-400'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  <Sparkles className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5 text-amber-400 animate-pulse" />
                </motion.button>
              ))}

              {/* Logout Button */}
              <motion.button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl mt-8 group bg-red-600/20 hover:bg-red-600/30 transition-colors relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <LogOut size={20} className="text-red-400" />
                <span className="text-red-300">Logout</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </nav>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <main className="h-[calc(100vh-5rem)] overflow-y-auto">
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-white/10 m-8 shadow-2xl"
            >
              <div className="relative p-1">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-purple-400/10 rounded-3xl opacity-30" />
                <div className="relative p-8">
                  {renderContent()}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <Footer className="mt-auto relative z-10" />
    </div>
  );
};

export default DashboardPage;