import React from 'react';
import Profile from '../components/aboutComponents/profile';
import Contact from '../components/aboutComponents/contact';
import History from '../components/aboutComponents/history';

const AboutPage = () => {
  return (
    <div className="about-page">
      <Profile />
      <Contact />
      <History />
    </div>
  );
};

export default AboutPage;
