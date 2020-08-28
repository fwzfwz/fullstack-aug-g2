import React from 'react';

const Company = props => {
  return (
    <div className="section">
      <h4 className="year">
        <p>
          {props.startYear} {props.endYear}
        </p>
      </h4>
      <div className="company">
        <h4>{props.companyName} Company</h4>
        <h5>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere, ad
          deleniti odio, quibusdam natus rerum debitis distinctio odit,
          molestiae nemo fugit. Explicabo, quaerat iure aut magnam perferendis
          expedita ducimus numquam.
        </h5>
      </div>
    </div>
  );
};

export default Company;
