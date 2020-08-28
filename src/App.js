import React from 'react';
import './assets/reset.css';
import './assets/style.css';
import Navbar from './layouts/navbar';
import AboutPage from './pages/aboutPage';
import HomePage from './pages/homePage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <HomePage />
      <AboutPage />
    </div>
  );
}

export default App;
