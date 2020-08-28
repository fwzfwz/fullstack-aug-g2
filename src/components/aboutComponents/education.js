import React from 'react';

const Education = props => {
  return (
    <div className="section">
      <h3>
        {props.startYear}-{props.endYear}
      </h3>
      <h5>Bersekolah Di {props.school} Republik Indonesia</h5>
    </div>
  );
};

export default Education;
