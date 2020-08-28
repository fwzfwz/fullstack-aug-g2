import React from 'react';
import Education from './education';
import Skills from './skills';

const LeftSide = () => {
  return (
    <div className="left">
      <div className="edu">
        <h2>Education</h2>
        <Education startYear="2020" endYear="2026" school="SD" />
        <Education startYear="2026" endYear="2029" school="SMP" />
        <Education startYear="2029" endYear="2032" school="SMA" />
      </div>
      <hr />
      <div className="skill">
        <h2>Skills</h2>
        <Skills skillName="HTML" skillPercentage="100" />
        <Skills skillName="CSS" skillPercentage="25" />
        <Skills skillName="JS" skillPercentage="50" />
      </div>
    </div>
  );
};

export default LeftSide;
