import React from 'react';
import phone from '../../assets/phone.png';
import mail from '../../assets/mail.png'
import pin from '../../assets/pin.png';

const Contact = () => {
  return (
    <div className="contact-banner">
      <div className="contact-section">
        <img src={phone} alt="phone-pic" />
        <p>0812-3456-7890</p>
      </div>
      <div className="contact-section">
        <img src={mail} alt="mail-pic" />
        <p>email@email.com</p>
      </div>
      <div className="contact-section">
        <img src={pin} alt="pin-pic" />
        <p>Jakarta, Indonesia</p>
      </div>
    </div>
  );
};

export default Contact;
