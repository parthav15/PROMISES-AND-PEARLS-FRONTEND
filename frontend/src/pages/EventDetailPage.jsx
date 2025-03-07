import React from 'react';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';
import EventDetail from '../components/Events/EventDetail';

const EventDetailPage = () => {
  return (
    <>
      <Navbar />
      <EventDetail />
      <Footer />
    </>
  );
};

export default EventDetailPage;