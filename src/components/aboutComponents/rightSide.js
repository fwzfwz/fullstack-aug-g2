import React from 'react';
import Company from './company';

const RightSide = () => {
  return (
    <div className="right">
      <div className="biography">
        <h2>BIOGRAPHY</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas nisi
          corrupti reiciendis ea est minus blanditiis veniam, cupiditate debitis
          quas fugit maxime iusto corporis perspiciatis modi doloremque et ipsam
          consequatur! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Ipsa atque optio blanditiis quasi, molestias libero ad eos cumque
          neque cum, iste qui doloribus illum voluptate corrupti minus, facilis
          ipsam iusto? Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Nostrum alias pariatur voluptates eaque ea dolorem minima sapiente
          repellendus ut exercitationem explicabo, delectus atque tempora? Velit
          nemo rem debitis hic obcaecati? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Magnam tenetur, amet quasi sit, aperiam veniam a
          pariatur nulla labore omnis obcaecati consequuntur quas eaque quaerat
          distinctio eligendi? Possimus, a eius.
        </p>
      </div>
      <hr />
      <div className="experience">
        <h2>JOB EXPERIENCE</h2>
        <Company startYear="2033" endYear="2035" companyName="ABC" />
        <Company startYear="2035" endYear="2037" companyName="DEF" />
        <Company startYear="2037" endYear="2039" companyName="GHI" />
      </div>
    </div>
  );
};

export default RightSide;
