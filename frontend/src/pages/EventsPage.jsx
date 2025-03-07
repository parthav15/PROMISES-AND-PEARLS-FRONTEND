import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';
import EventHero from '../components/Events/EventHero';
import RecentEvents from '../components/Events/RecentEvents';

const EventsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login-register');
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <EventHero />
      <RecentEvents />
      <Footer />
    </>
  );
};

export default EventsPage;

