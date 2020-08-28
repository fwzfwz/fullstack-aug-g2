import React from 'react';

const Project = props => {
  return (
    <div className="project">
      <img src={props.picAssets} alt="pic" />
      <h1>Landing Page {props.projectName}</h1>
    </div>
  );
};

export default Project;