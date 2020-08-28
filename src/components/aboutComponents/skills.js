import React from 'react';

const Skills = props => {
  return (
    <div className="section">
      <h4 className="skillset">{props.skillName}</h4>
      <h4 className="skill-percentage">{props.skillPercentage}%</h4>
    </div>
  );
};

export default Skills;
