import React from 'react';
import Projects from '../components/homeComponents/projects';
import pic1 from '../assets/pic-1.webp';
import pic2 from '../assets/pic-2.webp';
import pic3 from '../assets/pic-3.jpg';

const HomePage = () => {
  return (
    <div className="home-page" id="home-page">
      <h2>Project List</h2>
      <Projects picAssets={pic1} projectName="Project 1" />
      <Projects picAssets={pic2} projectName="Project 2" />
      <Projects picAssets={pic3} projectName="Project 3" />
    </div>
  );
};

export default HomePage;