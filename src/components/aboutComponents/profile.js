import React from 'react';
import profile from '../../assets/profile.png';

const Profile = () => {
  return (
    <div className="top">
      <div className="left">
        <img className="profile-pic" src={profile} alt="profile-pic" />
      </div>
      <div className="right">
        <div className="details">
          <h2 className="fullname">Fawwaazrahman Arandhana</h2>
          <h3 className="title">Fullstack Developer</h3>
        </div>
      </div>
    </div>
  );
};

export default Profile;
